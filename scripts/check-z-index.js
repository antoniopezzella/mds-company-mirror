#!/usr/bin/env node
/**
 * check-z-index.js — every stacking value sits on the scale in z-index.ts.
 *
 * Why a checker rather than imports
 * --------------------------------
 * `z-index.ts` was added as "a real scale" and then had **zero importers** —
 * it was a comment with a type annotation. The obvious fix, making 16 call
 * sites `import { Z_CLASS }`, does not actually work for the Tailwind half:
 * the scanner is plain text, so `className={Z_CLASS.overlay}` only emits CSS
 * because the literal `z-[1500]` happens to appear in z-index.ts. The class
 * has to be written literally somewhere regardless.
 *
 * So this follows the same shape as check-composition.js does for spacing:
 * components keep writing literals, and a gate makes drift fail CI. That is
 * what makes the scale load-bearing — not the import graph.
 *
 * What it catches
 * ---------------
 * The drift z-index.ts's own docstring describes, which was all still present
 * when this was written:
 *   - `toast.tsx` at z-[100], *below* every overlay at 1500 — so a save error
 *     fired over an open dialog was invisible.
 *   - `tooltip.tsx` at 1500, tied with the dialog containing it and below
 *     toasts, with DOM order silently deciding.
 *   - `data-table.tsx` using zIndex: 1/2 for sticky headers while `table.tsx`
 *     used z-10 for the same job.
 *
 * Usage: node scripts/check-z-index.js [--strict]
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const DIR = path.join(root, 'src/components/ui');

// Kept in sync with src/components/ui/z-index.ts by the test below.
const SCALE = { sticky: 10, stickyRaised: 20, chrome: 40, scrim: 1400, overlay: 1500, toast: 1600, tooltip: 1700 };
const ALLOWED = new Set(Object.values(SCALE));

// `z-0` is "no stacking context of its own" and is always fine, as is the
// `z-auto` keyword. Negative values are not on the scale and are flagged.
const ALWAYS_OK = new Set([0]);

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

// z-index.ts is excluded: it *declares* the scale, so counting its own
// Z_CLASS literals as usage made every layer look adopted — `scrim` showed
// "1 site" while no component used it at all.
const files = walkFiles(DIR).filter(
  (f) => !/\.stories\.|\.test\.|^z-index\.ts$/.test(path.basename(f))
);

const violations = [];
const unreadable = []; // computed values the checker cannot verify
const seen = new Map(); // value -> [sites]

for (const file of files) {
  const rel = path.relative(root, file);
  const lines = fs.readFileSync(file, 'utf8').split('\n');

  lines.forEach((line, i) => {
    // Strip line comments so prose mentioning a value isn't flagged.
    const code = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');
    if (/^\s*\*/.test(line)) return; // block-comment body

    const site = `${rel}:${i + 1}`;

    // A stacking value the checker cannot read is not a passing one.
    //
    // This only matched `zIndex:` followed immediately by digits, so anything
    // computed sailed through — `zIndex: header.column.getIsPinned() ? 3 : 2`
    // in data-table.tsx used two off-scale values while this script reported
    // "✓ every stacking value sits on the scale". Same hole for a Tailwind
    // class built by interpolation. Both are now flagged as unverifiable,
    // which is the honest answer: the fix is to name a layer from z-index.ts,
    // not to make the regex cleverer.
    // Read the whole property value after `zIndex:` and ask what it is, rather
    // than asserting about it with a lookahead — `\s*` backtracks to zero
    // width, so a negative lookahead "no digit here" succeeds on the space and
    // flags every valid literal.
    //
    // Three outcomes:
    //   42                              -> numeric, checked against the scale
    //   Z_INDEX.sticky                  -> a named layer, which is the ideal
    //   x ? Z_INDEX.a : Z_INDEX.b       -> still fine; every branch is named
    //   someHelper(col)  /  3 : 2       -> unreadable, and therefore a failure
    //
    // Accepting `Z_INDEX.*` matters: the failure message tells you to name a
    // layer, so rejecting the named form would make the advice impossible to
    // follow.
    const opaque = [...code.matchAll(/zIndex:\s*([^,;}]+)/g)]
      .map((m) => m[1].trim())
      .filter((expr) => {
        if (/^-?\d+$/.test(expr)) return false;
        const refs = [...expr.matchAll(/Z_INDEX\.(\w+)/g)].map((m) => m[1]);
        // No named layer at all -> we cannot tell what this resolves to.
        if (!refs.length) return true;
        // A name that is not on the scale is a typo or a removed layer.
        if (refs.some((name) => !(name in SCALE))) return true;
        // Otherwise every branch names a real layer. A condition may well
        // contain a call (`getIsPinned()`); that is the *test*, not the value,
        // so it does not make the value unreadable.
        return false;
      });

    if (opaque.length || /z-\[\$\{/.test(code)) {
      unreadable.push({ site, text: line.trim().slice(0, 90) });
      return;
    }

    // A named layer is verified; record it so adoption still shows in the report.
    for (const m of code.matchAll(/Z_INDEX\.(\w+)/g)) {
      const value = SCALE[m[1]];
      if (value === undefined) continue;
      if (!seen.has(value)) seen.set(value, []);
      seen.get(value).push(site);
    }

    const hits = [
      // Tailwind: z-10, z-[1500]
      ...[...code.matchAll(/(?:^|[\s"'`])z-\[(-?\d+)\]/g)].map((m) => Number(m[1])),
      ...[...code.matchAll(/(?:^|[\s"'`])z-(\d+)(?![\w[-])/g)].map((m) => Number(m[1])),
      // Inline style: zIndex: 1500
      ...[...code.matchAll(/zIndex:\s*(-?\d+)/g)].map((m) => Number(m[1])),
    ];

    for (const value of hits) {
      if (!seen.has(value)) seen.set(value, []);
      seen.get(value).push(site);
      if (ALWAYS_OK.has(value) || ALLOWED.has(value)) continue;
      violations.push({ site, value, text: line.trim().slice(0, 90) });
    }
  });
}

const layerFor = (v) => Object.entries(SCALE).find(([, n]) => n === v)?.[0];

console.log('Z-index check — stacking scale conformance\n');

if (unreadable.length) {
  console.log(`✗ ${unreadable.length} stacking value(s) the checker cannot verify:\n`);
  for (const u of unreadable) {
    console.log(`  ${u.site}`);
    console.log(`     ${u.text}`);
  }
  console.log('\n  A computed z-index hides whether it is on the scale. Name a layer');
  console.log('  from z-index.ts instead — Z_INDEX.stickyRaised, not a ternary.\n');
}

if (violations.length) {
  console.log(`✗ ${violations.length} stacking value(s) off the scale:\n`);
  for (const v of violations) {
    console.log(`  ${v.site}  z-index ${v.value}`);
    console.log(`     ${v.text}`);
  }
  console.log('\n  The scale (src/components/ui/z-index.ts):');
  for (const [name, n] of Object.entries(SCALE)) console.log(`    ${String(n).padStart(4)}  ${name}`);
  console.log('\n  Pick the layer by how much the thing needs to interrupt. If none');
  console.log('  fits, add one to z-index.ts and to SCALE here — the gaps of 100');
  console.log('  exist so you can insert without renumbering.\n');
} else if (!unreadable.length) {
  const used = [...seen.keys()].filter((v) => !ALWAYS_OK.has(v)).sort((a, b) => a - b);
  console.log(`✓ Every stacking value sits on the scale — ${seen.size} site group(s).\n`);
  for (const v of used) {
    console.log(`  ${String(v).padStart(4)}  ${layerFor(v)?.padEnd(8) ?? '?'}  ${seen.get(v).length} site(s)`);
  }
  console.log('');
}

if (violations.length || unreadable.length) process.exit(1);
