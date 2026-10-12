#!/usr/bin/env node
/**
 * subset-icons.mjs — ship only the blessed glyphs, not all 3,700.
 *
 * The full Material Symbols Outlined variable font is ~4 MB. We self-host a
 * SUBSET containing only the ligatures listed in
 * `src/components/ui/icon-names.ts` (a few tens of KB). harfbuzz (via
 * subset-font) retains the icon glyphs reachable by shaping those ligature
 * names, the letter glyphs that feed them, and the GSUB `liga` rules that do
 * the substitution — so `<Icon name="check_circle">` still resolves — while
 * keeping the variable axes (FILL / wght / GRAD / opsz).
 *
 * Run after editing the allowlist: `npm run icons:subset`, then commit the
 * regenerated woff2.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'node_modules/material-symbols/material-symbols-outlined.woff2');
const OUT = path.join(root, 'public/fonts/material-symbols-outlined-subset.woff2');
const NAMES_TS = path.join(root, 'src/components/ui/icon-names.ts');

if (!fs.existsSync(SRC)) {
  console.error(`✗ source font missing: ${SRC}\n  run \`npm install material-symbols\` first.`);
  process.exit(1);
}

// Read the allowlist from its .ts source of truth (simple quoted-string array).
const tsText = fs.readFileSync(NAMES_TS, 'utf8');
const block = tsText.slice(tsText.indexOf('ICON_NAMES = ['), tsText.indexOf('] as const'));
const names = [...block.matchAll(/'([a-z0-9_]+)'/g)].map((m) => m[1]);
if (!names.length) {
  console.error('✗ no icon names parsed from icon-names.ts');
  process.exit(1);
}

// Space-separate the ligature names so harfbuzz shapes and retains each one.
const text = names.join(' ');
const full = fs.readFileSync(SRC);
// Partial instancing is the real size lever: a variable font's bulk is the
// per-glyph variation data (`gvar`). We pin the axes we don't vary at runtime —
// weight 400, grade 0, optical-size 24 — which prunes that data, and KEEP only
// FILL (0↔1) so the <Icon fill> toggle still works. ~4 MB → ~30 KB. Text
// subsetting alone (no pinning) leaves it near 200 KB+ and keeping all axes
// leaves it in the megabytes.
const subset = await subsetFont(full, text, {
  targetFormat: 'woff2',
  variationAxes: { wght: 400, GRAD: 0, opsz: 24 },
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, subset);
console.log(
  `✓ subset ${names.length} icons: ${(full.length / 1048576).toFixed(1)} MB → ` +
    `${(subset.length / 1024).toFixed(1)} KB  (${path.relative(root, OUT)})`
);
