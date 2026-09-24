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
 * For every `--var: H S% L%;  /​* #hex ... *​/` line: decode the HSL and
 * compare it to the stated hex. Any mismatch is a defect — either the triplet
 * is wrong, or the comment is lying about what the triplet means. Both are
 * worth failing on.
 *
 * Usage: node scripts/check-token-variables.js [--fix] [--strict]
 *
 * `--fix` rewrites the triplets from the stated hex, which is the direction
 * that preserves intent: the comment records what the value is *meant* to be.
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

const lines = fs.readFileSync(FILE, 'utf8').split('\n');
const drift = [];
let fixed = 0;

const out = lines.map((line, i) => {
  const m = LINE.exec(line);
  if (!m) return line;

  const [, prefix, name, hs, ss, ls, mid, statedHex] = m;
  const decoded = hslToHex(Number(hs), Number(ss), Number(ls));

  if (decoded.toLowerCase() === statedHex.toLowerCase()) return line;

  drift.push({ line: i + 1, name, stated: statedHex, decoded });

  if (fix) {
    const [h, s, l] = hexToHsl(statedHex);
    fixed++;
    return line.replace(`${hs} ${ss}% ${ls}%`, `${h} ${s}% ${l}%`);
  }
  return line;
});

if (fix && fixed) {
  fs.writeFileSync(FILE, out.join('\n'));
  console.log(`✓ Rewrote ${fixed} HSL triplet(s) from their stated hex.\n`);
  for (const d of drift) console.log(`  --${d.name.padEnd(24)} ${d.decoded} -> ${d.stated}`);
  process.exit(0);
}

if (drift.length === 0) {
  console.log('✓ token-variables.css — every HSL triplet decodes to its stated hex.');
  process.exit(0);
}

console.log(`✗ ${drift.length} variable(s) decode to a different colour than they state:\n`);
for (const d of drift) {
  console.log(`  ${FILE.split('/').pop()}:${d.line}  --${d.name.padEnd(24)} states ${d.stated}  decodes ${d.decoded}`);
}
console.log('\n  Run with --fix to rewrite the triplets from the stated hex.');
console.log('  This is the seam between the governed tokens and what users see.\n');

process.exit(strict ? 1 : 0);
