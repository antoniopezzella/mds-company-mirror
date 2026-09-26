#!/usr/bin/env node
/**
 * check-radius.js — every corner radius sits on the scale.
 *
 * Why this exists
 * ---------------
 * Until this script, **nothing in this repo inspected radius**. Not a test,
 * not a governance gate — `grep -i "radius\|rounded" scripts/ src/__tests__/`
 * returned zero. `governance:ci` would have stayed green through a total
 * radius regression.
 *
 * That was survivable while the value never moved. It stopped being
 * survivable the moment the scale was raised globally (2px -> 6px and up),
 * because that change is invisible to every other gate and lands on ~124
 * `rounded-xs` sites at once.
 *
 * The history this protects against is real and documented in
 * src/docs/30-Spacing.mdx: a previous `borderRadius` override in the Tailwind
 * config computed `rounded-md` as `calc(2px - 2px)` = **0** and drove
 * `rounded-sm` negative, so roughly **110 components silently rendered
 * square** while their class names said otherwise. Nothing caught it.
 *
 * What it checks
 * --------------
 * 1. **Only the four sanctioned steps.** The repo is on Tailwind's STOCK
 *    radius scale — nothing is overridden — so the gate no longer polices
 *    values. It polices *intent*: inside `src/components/ui`, only the four
 *    steps this system actually assigns a meaning to are allowed.
 *
 *      rounded-md   6px  controls: inputs, buttons, chips, cells
 *      rounded-lg   8px  badges, menu items, small surfaces
 *      rounded-xl  12px  cards, the data-grid shell, dialogs
 *      rounded-2xl 16px  large feature surfaces
 *
 *    `rounded-xs`/`sm`/`3xl`/`4xl` are rejected — not because they are
 *    broken, but because a fifth and sixth corner size is how a scale stops
 *    being a scale. `rounded-none` and `rounded-full` are keywords, allowed.
 * 2. **No arbitrary values, and no bare `rounded`.** Both inline a literal,
 *    so they sit outside the scale entirely and answer to nothing.
 * 3. **Neither entrypoint reintroduces an override.** `src/index.css` and
 *    `src/styles.package.css` must NOT declare `--radius-*` in `@theme`.
 *    Doing so in the package silently changes what `rounded-*` means inside
 *    a consumer's own application.
 *
 * Usage: node scripts/check-radius.js [--strict]
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const strict = process.argv.includes('--strict');

const UI_DIR = path.join(root, 'src/components/ui');
const ENTRYPOINTS = ['src/index.css', 'src/styles.package.css'];
const DOCS = 'src/docs/30-Spacing.mdx';

/**
 * The steps this design system assigns a meaning to, plus the two keywords.
 *
 * Deliberately NOT every step Tailwind ships: `xs`, `sm`, `3xl` and `4xl` are
 * valid Tailwind and invalid here. Allowing them would let a sixth corner size
 * in without anyone deciding it should exist.
 */
const INTENT = {
  md: 'controls: inputs, buttons, chips, cells',
  lg: 'badges, menu items, small surfaces',
  xl: 'cards, the data-grid shell, dialogs',
  '2xl': 'large feature surfaces',
};
const KEYWORDS = ['none', 'full'];
const SCALE = [...Object.keys(INTENT), ...KEYWORDS];

// ---------------------------------------------------------------------------
// 1. Off-scale radius in the component set
// ---------------------------------------------------------------------------
/**
 * Walks SUBDIRECTORIES too.
 *
 * This was a flat `readdirSync`, and `components/ui/filters/` — the first
 * subdirectory ever added under `components/ui/` — was therefore invisible to
 * it. The gate reported "104 modules checked" and passed while a banned class
 * sat in a file it had never opened. A directory-shaped component is now the
 * normal way to build a larger one here, so flat is simply wrong.
 */
function walkFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

const files = walkFiles(UI_DIR).filter((f) => !/\.stories\.|\.test\./.test(path.basename(f)));

const offScale = [];

for (const file of files) {
  const rel = path.relative(root, file);
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let inBlockComment = false;

  lines.forEach((line, i) => {
    // Block-comment state has to be tracked across lines, not guessed per
    // line: a multi-line JSX comment `{/* … rounded shell … */}` opens on one
    // line and the word sits on another, which a per-line strip cannot see.
    let code = line;
    if (inBlockComment) {
      const end = code.indexOf('*/');
      if (end === -1) return;
      code = code.slice(end + 2);
      inBlockComment = false;
    }
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    const open = code.lastIndexOf('/*');
    if (open !== -1) {
      inBlockComment = true;
      code = code.slice(0, open);
    }
    code = code.replace(/\/\/.*$/, '');
    if (/^\s*\*/.test(line)) return;

    // A type union or a type alias mentions `'rounded'` as a NAME, not a
    // class — `type AvatarVariant = 'circular' | 'rounded' | 'square'`.
    // A cva variant map (`text: 'rounded'`) is a real class and must still
    // be caught, so key off the type syntax rather than the quotes.
    if (/^\s*(export\s+)?type\b/.test(code) || /^\s*\|/.test(code)) return;

    const site = `${rel}:${i + 1}`;

    // Arbitrary values: rounded-[2px], rounded-[8px]. `[inherit]` is benign.
    for (const m of code.matchAll(/rounded(?:-[a-z]+)?-\[([^\]]+)\]/g)) {
      if (m[1] === 'inherit') continue;
      offScale.push({ site, text: line.trim().slice(0, 88), why: `arbitrary \`${m[0]}\`` });
    }

    // The bare `rounded` utility. Tailwind inlines it at 0.25rem, so it does
    // NOT follow --radius-sm and silently stays behind on a scale change.
    for (const m of code.matchAll(/(?:^|[\s"'`{])(rounded)(?=[\s"'`}]|$)/g)) {
      if (!m) continue;
      offScale.push({ site, text: line.trim().slice(0, 88), why: 'bare `rounded` (inlined 4px, ignores the scale)' });
    }

    // A named step that does not exist.
    for (const m of code.matchAll(/(?:^|[\s"'`{])rounded-(?:[trbl]{1,2}-)?([a-z0-9]+)(?![\w[-])/g)) {
      const step = m[1];
      if (!SCALE.includes(step)) {
        offScale.push({ site, text: line.trim().slice(0, 88), why: `unknown step \`${step}\`` });
      }
    }
  });
}

// ---------------------------------------------------------------------------
// 2. Neither entrypoint may reintroduce a --radius-* override
// ---------------------------------------------------------------------------
// This is the inverse of what this section used to do. It used to REQUIRE the
// two entrypoints to declare the same scale; now it requires them to declare
// none at all. An override in styles.package.css does not just change this
// repo — it redefines `rounded-*` inside every consuming application.
const overrides = [];
for (const rel of ENTRYPOINTS) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) continue;
  const css = fs.readFileSync(abs, 'utf8');
  for (const block of css.matchAll(/@theme\s*\{([\s\S]*?)\}/g)) {
    for (const m of block[1].matchAll(/--radius-([a-z0-9]+)\s*:\s*([^;]+);/g)) {
      overrides.push({ file: rel, step: m[1], value: m[2].trim() });
    }
  }
}


// ---------------------------------------------------------------------------
// 3. The docs still state the right pixel values
// ---------------------------------------------------------------------------
// The docs win arguments with whoever reads them next — including agents. If
// 30-Spacing.mdx says a step is one size and the stock scale says another,
// someone will "fix" working code to match the table.
const PX = { md: 6, lg: 8, xl: 12, '2xl': 16 };
const docsDrift = [];
const docsAbs = path.join(root, DOCS);
if (fs.existsSync(docsAbs)) {
  const md = fs.readFileSync(docsAbs, 'utf8');
  for (const [step, px] of Object.entries(PX)) {
    const row = new RegExp(
      `\`rounded-${step}\`[^\\n|]*\\|[^\\d\\n|]*(\\d+)\\s*(?:px)?[^\\n|]*\\|`,
      'i'
    ).exec(md);
    if (!row) {
      docsDrift.push({ step, css: `${px}px`, docs: '(no row found)' });
    } else if (Number(row[1]) !== px) {
      docsDrift.push({ step, css: `${px}px`, docs: `${row[1]}px` });
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
console.log('Radius check — corner radius scale conformance\n');

if (offScale.length) {
  console.log(`✗ ${offScale.length} off-scale radius value(s):\n`);
  for (const v of offScale) {
    console.log(`  ${v.site}  — ${v.why}`);
    console.log(`     ${v.text}`);
  }
  console.log('\n  Allowed steps and what each one means:\n');
  for (const [step, meaning] of Object.entries(INTENT)) {
    console.log(`    rounded-${step.padEnd(4)} ${meaning}`);
  }
  console.log(`    rounded-none / rounded-full  (keywords)\n`);
}

if (overrides.length) {
  console.log(`✗ ${overrides.length} --radius-* override(s) reintroduced:\n`);
  for (const o of overrides) console.log(`  ${o.file}: --radius-${o.step}: ${o.value}`);
  console.log('\n  The repo is on Tailwind\'s stock scale by design. Redefining these');
  console.log('  makes `rounded-lg` mean one thing here and another everywhere else —');
  console.log('  and styles.package.css ships that redefinition into consumers\' own');
  console.log('  code. Pick a different stock step instead.\n');
}

if (docsDrift.length) {
  console.log(`✗ ${docsDrift.length} step(s) where ${DOCS} disagrees with the CSS:\n`);
  for (const d of docsDrift) console.log(`  rounded-${d.step}: CSS says ${d.css}, docs say ${d.docs}`);
  console.log('\n  The docs win arguments with whoever reads them next — including');
  console.log('  agents. Update the table when the scale moves.\n');
}

const failures = offScale.length + overrides.length + docsDrift.length;

if (!failures) {
  console.log(`✓ Every radius sits on the scale — ${files.length} modules checked.`);
  console.log('  Stock Tailwind scale, no override: md=6px · lg=8px · xl=12px · 2xl=16px\n');
}

if (failures) process.exit(1);
if (strict) process.exit(0);
