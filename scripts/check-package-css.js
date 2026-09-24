#!/usr/bin/env node
/**
 * check-package-css.js — asserts the published stylesheet is actually usable.
 *
 * Why this exists
 * ---------------
 * `src/styles.package.css` once imported `tailwindcss/utilities` without
 * `tailwindcss/theme`. In v4 the spacing scale is derived at build time from
 * `--spacing`, which lives in the theme layer — so Tailwind could not resolve
 * `p-4`/`gap-2`/`mb-3` and **dropped those rules instead of erroring**.
 *
 * The build exited 0. The file was still 71 kB. It still contained
 * `.flex-col` and `.items-center`. And it shipped to consumers with every
 * padding, margin and gap missing.
 *
 * Nothing in the toolchain catches that, because nothing failed. So this
 * script asserts that a handful of load-bearing rules are present, and runs
 * as part of `build:css`. It is deliberately dumb: presence checks on real
 * class names, not a CSS parse.
 */
import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'dist-pkg', 'styles.css');

if (!fs.existsSync(file)) {
  console.error('check-package-css: dist-pkg/styles.css not found — did build:css run?');
  process.exit(1);
}

const css = fs.readFileSync(file, 'utf8');
const bytes = Buffer.byteLength(css);

/**
 * Each entry is a rule that must exist, plus what its absence means. The
 * spacing entries are the ones that actually regressed; the others are here
 * so a broader breakage is named precisely rather than generically.
 */
const REQUIRED = [
  { sel: '.p-4{', why: 'padding utilities — theme layer missing from styles.package.css' },
  { sel: '.gap-2{', why: 'gap utilities — theme layer missing from styles.package.css' },
  { sel: '.mb-2{', why: 'margin utilities — theme layer missing from styles.package.css' },
  { sel: '.flex-col{', why: 'static layout utilities — utilities layer missing' },
  { sel: '--spacing:', why: 'the spacing scale variable — theme layer missing' },
  { sel: '.animate-in{', why: 'tw-animate-css — its @import was dropped (must precede @config)' },
];

const missing = REQUIRED.filter((r) => !css.includes(r.sel));

// The theme layer roughly doubles the file. A sharp drop is the signature of
// the exact regression this script exists to catch, so treat it as a warning
// even when the presence checks somehow pass.
const MIN_BYTES = 90_000;

if (missing.length) {
  console.error(`\n✗ check-package-css: dist-pkg/styles.css is incomplete (${bytes} bytes)\n`);
  for (const m of missing) console.error(`  missing ${m.sel.padEnd(14)} → ${m.why}`);
  console.error('\n  The build did NOT fail — Tailwind drops rules it cannot resolve.');
  console.error('  See .claude/skills/tailwind/SKILL.md → "The package build".\n');
  process.exit(1);
}

if (bytes < MIN_BYTES) {
  console.error(
    `\n✗ check-package-css: stylesheet is ${bytes} bytes, expected >= ${MIN_BYTES}.` +
      '\n  A sharp drop usually means a layer or @import was silently dropped.\n'
  );
  process.exit(1);
}

console.log(`✓ package stylesheet OK — ${bytes} bytes, all load-bearing rules present.`);
