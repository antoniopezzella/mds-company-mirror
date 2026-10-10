#!/usr/bin/env node
/**
 * check-token-variables.js — verifies `src/styles/token-variables.css` says
 * what it means.
 *
 * Why this exists
 * ---------------
 * That file is the CSS-variable projection of the role layer, and it is the
 * one link in the token chain with **no build step**: the HSL triplets are
 * transcribed by hand from hex, into a different colour space. At the time
 * this was written, **26 of its 34 documented variables decoded to a
 * different colour than the hex in their own comment**:
 *
 *     --foreground: 222 100% 15%   /​* #000f47 *​/   decodes to #00174d
 *     --primary:    215 100% 24%   /​* #002c77 *​/   decodes to #00337a
 *
 * Nothing broke — both navies are ~18:1 on white, so no contrast gate fired.
 * But it means a shadcn component and an MUI component render *different
 * navies side by side*, which is precisely the drift a governed token system
 * exists to prevent. It was guarded by a test covering exactly one variable.
 *
 * What this checks
 * ----------------
 * Two separate things, and the distinction matters:
 *
 * 1. **Internal consistency.** For every `--var: H S% L%;  /​* #hex ... *​/`
 *    line: decode the HSL and compare it to the stated hex. A mismatch means
 *    either the triplet is wrong or the comment is lying. Fails the build.
 *
 * 2. **Agreement with the role layer.** Most of these comments also name an
 *    MDS role (`/​* #000f47 - MDS: text.primary *​/`). Check 1 alone never
 *    reads `roles.ts`, so a variable could be perfectly self-consistent and
 *    still render a different colour than the role it claims to project —
 *    which is exactly the drift this file exists to prevent, and exactly what
 *    check 1 reported as "✓ every triplet decodes to its stated hex" while
 *    four variables disagreed with their own named role.
 *
 * Check 2 is **advisory by default**. Three of the four known divergences look
 * deliberate rather than accidental — `--primary` is #002c77 (blue1100, marked
 * "MODE Primary (future)" in CLAUDE.md) while `interactive.primary` is still
 * #000f47 (blue1000, "Midnight (legacy)"), so the CSS layer has moved to the
 * next brand and the role layer has not. Failing the build on that would force
 * a brand decision as a side effect of running a linter. Listing it every run,
 * with the numbers, is the useful behaviour. `--strict` makes it fail, for
 * once the divergences are resolved or explicitly recorded in ROLE_EXCEPTIONS.
 *
 * Usage: node scripts/check-token-variables.js [--fix] [--strict]
 *
 * `--fix` rewrites the triplets from the stated hex, which is the direction
 * that preserves intent: the comment records what the value is *meant* to be.
 * It does NOT touch check-2 divergences — those need a human decision about
 * which layer is right.
 */
import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src/styles/token-variables.css');
const fix = process.argv.includes('--fix');
const strict = process.argv.includes('--strict');

/** `--name: H S% L%;  /* #rrggbb ... *​/` */
const LINE = /^(\s*--([a-z0-9-]+):\s*)([\d.]+) ([\d.]+)% ([\d.]+)%(;\s*\/\*\s*)(#[0-9a-fA-F]{3,6})/;

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return (
    '#' +
    [f(0), f(8), f(4)]
      .map((x) => Math.round(255 * x).toString(16).padStart(2, '0'))
      .join('')
  );
}

function hexToHsl(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let hue = 0;
  let sat = 0;
  if (max !== min) {
    const d = max - min;
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) hue = ((b - r) / d + 2) * 60;
    else hue = ((r - g) / d + 4) * 60;
  }
  // One decimal is enough to round-trip every 8-bit hex exactly; integers are
  // what produced the original drift.
  const round = (n) => Math.round(n * 10) / 10;
  return [round(hue), round(sat * 100), round(l * 100)];
}

if (!fs.existsSync(FILE)) {
  console.error('check-token-variables: src/styles/token-variables.css not found.');
  process.exit(1);
}

/** One line's verdict, or null if the line carries no HSL/hex triplet. */
function detectLineDrift(line) {
  const m = LINE.exec(line);
  if (!m) return null;
  const [, prefix, name, hs, ss, ls, mid, statedHex] = m;
  const decoded = hslToHex(Number(hs), Number(ss), Number(ls));
  if (decoded.toLowerCase() === statedHex.toLowerCase()) return null;
  return { prefix, name, hs, ss, ls, mid, statedHex, decoded };
}

/** Every drifting line in an arbitrary block of text — used by both the real
 * scan below and --selftest, so the two can never disagree about what counts
 * as drift. */
function scanAllDrift(text) {
  return text
    .split('\n')
    .map((line, i) => ({ line: i + 1, d: detectLineDrift(line) }))
    .filter((x) => x.d)
    .map((x) => ({ line: x.line, name: x.d.name, stated: x.d.statedHex, decoded: x.d.decoded }));
}

// --selftest: prove check 1 (HSL decodes to its stated hex) can actually go
// red. No file-drop probe fits this gate — it reads exactly ONE fixed file,
// not a directory — so the proof mutates an in-memory copy of that file's
// text and never touches disk, same category as check-token-vars-sync.js's
// --selftest.
if (process.argv.includes('--selftest')) {
  const liveText = fs.readFileSync(FILE, 'utf8');
  const liveDrift = scanAllDrift(liveText);
  if (liveDrift.length) {
    console.error(`✗ self-test: the live file already has ${liveDrift.length} undecoded drift(s) — fix those first (see --fix).`);
    process.exit(1);
  }

  const lines = liveText.split('\n');
  const idx = lines.findIndex((l) => LINE.test(l));
  if (idx === -1) {
    console.error('✗ self-test: no HSL-triplet line found to mutate — cannot certify this gate.');
    process.exit(1);
  }
  const m = LINE.exec(lines[idx]);
  const [, , name, hs, ss, ls] = m;
  // Corrupt the lightness so the triplet decodes to something other than the
  // hex stated in its own comment — the exact defect this check exists for
  // (26 of 34 variables were found in exactly this state).
  const brokenLs = (parseFloat(ls) + 11) % 100;
  const brokenLine = lines[idx].replace(`${hs} ${ss}% ${ls}%`, `${hs} ${ss}% ${brokenLs}%`);
  const brokenText = [...lines.slice(0, idx), brokenLine, ...lines.slice(idx + 1)].join('\n');

  const caught = scanAllDrift(brokenText);
  if (!caught.some((d) => d.name === name)) {
    console.error(`✗ self-test: corrupted --${name}'s lightness and the gate did NOT catch it — the gate is broken.`);
    process.exit(1);
  }
  console.log(`✓ token-variables self-test: clean file passes check 1; corrupting --${name}'s HSL triplet is caught.`);
  process.exit(0);
}

const lines = fs.readFileSync(FILE, 'utf8').split('\n');
const drift = [];
let fixed = 0;

const out = lines.map((line, i) => {
  const d = detectLineDrift(line);
  if (!d) return line;

  drift.push({ line: i + 1, name: d.name, stated: d.statedHex, decoded: d.decoded });

  if (fix) {
    const [h, s, l] = hexToHsl(d.statedHex);
    fixed++;
    return line.replace(`${d.hs} ${d.ss}% ${d.ls}%`, `${h} ${s}% ${l}%`);
  }
  return line;
});

if (fix && fixed) {
  fs.writeFileSync(FILE, out.join('\n'));
  console.log(`✓ Rewrote ${fixed} HSL triplet(s) from their stated hex.\n`);
  for (const d of drift) console.log(`  --${d.name.padEnd(24)} ${d.decoded} -> ${d.stated}`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Check 2 — does each variable agree with the ROLE it names?
//
// Reads dist/theme.css, the generated role projection (`--color-text-primary:
// #000f47`). governance:ci runs `tokens:build` before this script, so it is
// always current. If it is absent we say so rather than silently skipping —
// a check that quietly does nothing is what produced this finding.
// ---------------------------------------------------------------------------

/** Divergences that are a recorded decision, not a mistake. */
const ROLE_EXCEPTIONS = {
  // Deliberate, pending a brand decision: the CSS layer has adopted blue1100
  // (#002c77, "MODE Primary (future)") while the role layer still resolves to
  // blue1000 (#000f47, "Midnight (legacy)"). Note `--color-text-primary-mode`
  // already exists in the generated theme, so the future brand IS modelled —
  // these two vars point at it ahead of the roles they cite.
  // Remove these once interactive.primary moves, or once the vars cite the
  // -mode role instead.
  primary: 'brand migration blue1000 -> blue1100 (see CLAUDE.md §1)',
  'accent-foreground': 'brand migration blue1000 -> blue1100 (see CLAUDE.md §1)',
};

const THEME = path.join(process.cwd(), 'dist/theme.css');
const roleDrift = [];
const unknownRoles = [];
let rolesChecked = 0;
let themeAvailable = false;

if (fs.existsSync(THEME)) {
  themeAvailable = true;
  const themeCss = fs.readFileSync(THEME, 'utf8');

  // theme.css carries BOTH modes — `:root` then `[data-theme="dark"]`. Reading
  // it into one map lets the dark block overwrite the light one, which made
  // every light variable look like it disagreed with its role (`text.primary`
  // reported as #ffffff). token-variables.css is likewise split, `:root` then
  // `.dark`, so both sides must be compared mode for mode.
  const darkStart = themeCss.search(/\[data-theme="dark"\]\s*\{/);
  const themeLight = darkStart === -1 ? themeCss : themeCss.slice(0, darkStart);
  const themeDark = darkStart === -1 ? '' : themeCss.slice(darkStart);

  const mapOf = (css) => {
    const m = new Map();
    for (const hit of css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})/g)) {
      m.set(hit[1], hit[2].toLowerCase());
    }
    return m;
  };
  const roleHexLight = mapOf(themeLight);
  // Dark inherits every role it does not override.
  const roleHexDark = new Map([...roleHexLight, ...mapOf(themeDark)]);

  // `/* #hex <anything> MDS: some.role.name */`
  const ROLE_LINE = /--([a-z0-9-]+):[^;]+;\s*\/\*\s*[^*]*?(#[0-9a-fA-F]{6})[^*]*?MDS:\s*([A-Za-z][A-Za-z.]*)/;

  let inDark = false;
  lines.forEach((line, i) => {
    if (/^\s*\.dark\s*\{/.test(line)) inDark = true;
    const m = ROLE_LINE.exec(line);
    if (!m) return;
    const [, name, statedHex, role] = m;

    // 'text.primary' -> 'text-primary'
    const key = role.replace(/\./g, '-').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    const actual = (inDark ? roleHexDark : roleHexLight).get(key);

    if (!actual) {
      unknownRoles.push({ line: i + 1, name, role, mode: inDark ? 'dark' : 'light' });
      return;
    }
    rolesChecked++;
    if (actual !== statedHex.toLowerCase()) {
      roleDrift.push({
        line: i + 1,
        name,
        role,
        mode: inDark ? 'dark' : 'light',
        stated: statedHex.toLowerCase(),
        actual,
      });
    }
  });
}

const unexpectedRoleDrift = roleDrift.filter((d) => !ROLE_EXCEPTIONS[d.name]);

function reportRoles() {
  if (!themeAvailable) {
    console.log('\nℹ role agreement NOT checked — dist/theme.css is missing.');
    console.log('  Run `npm run tokens:build` first; governance:ci does this automatically.\n');
    return;
  }

  if (unknownRoles.length) {
    console.log(`\nℹ ${unknownRoles.length} variable(s) name a role that does not exist:`);
    for (const u of unknownRoles) console.log(`  --${u.name.padEnd(22)} cites '${u.role}'`);
  }

  if (!roleDrift.length) {
    console.log(`\n✓ all ${rolesChecked} role-bearing variable(s) match the role they name.`);
    return;
  }

  console.log(`\n${unexpectedRoleDrift.length ? '✗' : 'ℹ'} ${roleDrift.length} of ${rolesChecked} variable(s) differ from the role they name:`);
  for (const d of roleDrift) {
    const note = ROLE_EXCEPTIONS[d.name];
    console.log(`  --${d.name.padEnd(22)} (${d.mode}) is ${d.stated}, role '${d.role}' is ${d.actual}${note ? `  [recorded: ${note}]` : ''}`);
  }
  if (unexpectedRoleDrift.length) {
    console.log('\n  These are NOT recorded decisions. Either fix the variable, move the');
    console.log('  role, or add it to ROLE_EXCEPTIONS in this script with a reason.');
  }
  console.log('');
}

if (drift.length === 0) {
  console.log('✓ token-variables.css — every HSL triplet decodes to its stated hex.');
  reportRoles();
  process.exit(strict && unexpectedRoleDrift.length ? 1 : 0);
}

console.log(`✗ ${drift.length} variable(s) decode to a different colour than they state:\n`);
for (const d of drift) {
  console.log(`  ${FILE.split('/').pop()}:${d.line}  --${d.name.padEnd(24)} states ${d.stated}  decodes ${d.decoded}`);
}
console.log('\n  Run with --fix to rewrite the triplets from the stated hex.');
console.log('  This is the seam between the governed tokens and what users see.\n');
reportRoles();

process.exit(strict ? 1 : 0);
