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

// ── Every var() must resolve ───────────────────────────────────────────────
// The presence checks above are deliberately dumb, and that dumbness shipped
// a real bug: `dist-pkg/styles.css` referenced five `--role-*` properties
// (Button's fill colours) and defined none of them, because the only thing
// that ever set `--role-*` was a useEffect in RoleVarsProvider — a React
// component the package does not ship. Every check in this repo validated the
// SOURCE; nothing validated the ARTIFACT, which is the same hole
// check-package-types.js exists to plug for types.
//
// A consumer following README.package.md got a primary button with no
// background, and all nine gates stayed green.
const defined = new Set([...css.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)].map((m) => m[1]));
const referenced = new Map();
for (const m of css.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)\s*(?:,|\))/g)) {
  referenced.set(m[1], (referenced.get(m[1]) ?? 0) + 1);
}

// A `var(--x, fallback)` is legitimately undefined-tolerant, so only consider
// references that would resolve to nothing.
const dangling = [...referenced.keys()].filter((name) => {
  if (defined.has(name)) return false;
  const withFallback = new RegExp(`var\\(\\s*${name}\\s*,`);
  return !withFallback.test(css);
});

// Two tiers, because not every undefined reference is a defect.
//
// HARD FAIL — `--role-*`. These are the design system's own contract and the
// package cannot assume RoleVarsProvider is mounted, so they must be defined
// by a stylesheet we ship. This is the class that actually broke.
//
// REPORT ONLY — everything else. Three legitimate kinds live here:
//   · component-local vars (`--switch-focus-ring`, `--sn-active-bg`), set by
//     the same component's inline style in the same render it is read;
//   · `--radix-*` and `--tw-*`, set on the element at runtime by Radix and
//     Tailwind respectively;
//   · scanner artifacts — Tailwind's content scan is plain text, so a
//     documentation example like `p-[var(--x)]` in src/docs/30-Spacing.mdx
//     becomes a real rule in the output. Harmless bloat, worth seeing.
const ROLE_PREFIX = '--role-';
const danglingRoles = dangling.filter((n) => n.startsWith(ROLE_PREFIX));
const danglingOther = dangling.filter((n) => !n.startsWith(ROLE_PREFIX));

if (danglingRoles.length) {
  console.error(`\n✗ check-package-css: ${danglingRoles.length} role variable(s) referenced but never defined\n`);
  for (const name of danglingRoles.sort()) {
    console.error(`  ${name.padEnd(40)} ${referenced.get(name)} reference(s), 0 definitions`);
  }
  console.error('\n  These resolve to nothing in a consumer app — the property silently does');
  console.error('  not apply, so you get a transparent background rather than an error,');
  console.error('  and every other gate stays green.');
  console.error('\n  Roles must be defined by a stylesheet the package SHIPS');
  console.error('  (src/styles/roles.generated.css, emitted by scripts/build-tokens.js),');
  console.error('  never only by RoleVarsProvider — that is a React component the');
  console.error('  package does not ship, and this is exactly how Button came to render');
  console.error('  with no background for consumers.\n');
  process.exit(1);
}

const roleCount = [...defined].filter((n) => n.startsWith(ROLE_PREFIX)).length;
console.log(
  `✓ package stylesheet OK — ${bytes} bytes, all load-bearing rules present, ` +
    `${roleCount} role var(s) defined, every --role-* reference resolves.`
);
if (danglingOther.length) {
  console.log(
    `  ℹ ${danglingOther.length} non-role var(s) are set at runtime or by the content scanner ` +
      '(informational, not a failure).'
  );
}
