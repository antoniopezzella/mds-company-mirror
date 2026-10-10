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
import { execSync } from 'child_process';

const root = process.cwd();
const file = path.join(root, 'dist-pkg', 'styles.css');
const ENTRY = path.join(root, 'src', 'styles.package.css');
const BUILD_CMD = 'npx tailwindcss -c tailwind.package.config.js -i src/styles.package.css -o dist-pkg/styles.css --minify';

/**
 * Everything below was a straight-line script operating on module-level
 * `css`/`bytes`. Wrapped in `evaluate()` so --selftest can run it against a
 * deliberately broken BUILD OUTPUT without that output being dist-pkg's real
 * file — the mutation and the read both have to go through a real build (see
 * --selftest below), but the verdict logic itself is one pure function.
 */
function evaluate(css) {
  const bytes = Buffer.byteLength(css);
  const forbidden = FORBIDDEN.filter((r) => css.includes(r.sel));
  const missing = REQUIRED.filter((r) => !css.includes(r.sel));
  const MIN_BYTES = 90_000;
  const tooSmall = bytes < MIN_BYTES && !missing.length && !forbidden.length;

  const defined = new Set([...css.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)].map((m) => m[1]));
  const referenced = new Map();
  for (const m of css.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)\s*(?:,|\))/g)) {
    referenced.set(m[1], (referenced.get(m[1]) ?? 0) + 1);
  }
  const dangling = [...referenced.keys()].filter((name) => {
    if (defined.has(name)) return false;
    const withFallback = new RegExp(`var\\(\\s*${name}\\s*,`);
    return !withFallback.test(css);
  });
  const ROLE_PREFIX = '--role-';
  const danglingRoles = dangling.filter((n) => n.startsWith(ROLE_PREFIX));
  const danglingOther = dangling.filter((n) => !n.startsWith(ROLE_PREFIX));
  const roleCount = [...defined].filter((n) => n.startsWith(ROLE_PREFIX)).length;

  const ok = !missing.length && !forbidden.length && !tooSmall && !danglingRoles.length;
  return { ok, bytes, missing, forbidden, tooSmall, MIN_BYTES, danglingRoles, danglingOther, roleCount, referenced };
}

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

  // The custom utilities from src/styles/component-utilities.css. These were
  // defined only in src/index.css — the APP stylesheet, which this package
  // never imports — so message-scroller's edge fade and attachment's shimmer
  // shipped as class names with no CSS behind them, while looking correct in
  // Storybook and the dev app. Nothing caught it: every gate validated the
  // source, and the source was fine.
  { sel: '.scroll-fade-b{', why: 'scroll-fade-b — component-utilities.css not imported by styles.package.css' },
  { sel: '.scroll-fade-x{', why: 'scroll-fade-x — component-utilities.css not imported by styles.package.css' },
  { sel: '.shimmer{', why: 'shimmer — component-utilities.css not imported by styles.package.css' },
  { sel: '@keyframes shimmer{', why: 'the shimmer animation — keyframes must sit OUTSIDE @utility' },

  // Dark mode must stay bound to the `.dark` CLASS. If `@config` (or the
  // `@custom-variant dark` that backs it up) is ever lost, `dark:` utilities
  // do not fail — they silently rebind to `prefers-color-scheme`, which for a
  // published stylesheet means consumers' dark styles start following their
  // users' OS setting instead of the consumer's own theme class. Verified by
  // compiling all three forms at v4.3.3. Asserted both ways round, because the
  // failure replaces one selector with the other rather than removing it.
  { sel: ':is(.dark *)', why: 'class-based dark mode — @custom-variant dark / @config lost' },
];

/**
 * The inverse of the dark-mode entry above: its presence, not its absence, is
 * the defect. A media-query-driven dark mode in a LIBRARY stylesheet overrides
 * the host app's own theming and cannot be turned off by the consumer.
 */
const FORBIDDEN = [
  {
    sel: 'prefers-color-scheme',
    why: 'dark: utilities rebound to the OS preference — `@custom-variant dark (&:is(.dark *))` is missing',
  },
];

// --selftest: prove the gate can actually go red — against a REAL build, not
// a hand-written artifact. The historical bug (missing `tailwindcss/theme`)
// was a SOURCE defect that only manifests after Tailwind compiles it, so a
// probe that skips the build would test nothing. This comments out the exact
// import that regressed, runs the real `build:css` compiler, evaluates the
// resulting (broken) CSS, then restores the source and rebuilds again so a
// valid dist-pkg/styles.css is left behind either way.
if (process.argv.includes('--selftest')) {
  const backup = fs.readFileSync(ENTRY, 'utf8');
  const THEME_IMPORT = '@import "tailwindcss/theme" layer(theme);';
  if (!backup.includes(THEME_IMPORT)) {
    console.error(`✗ self-test: ${THEME_IMPORT} not found in src/styles.package.css — cannot certify this gate.`);
    process.exit(1);
  }
  const broken = backup.replace(THEME_IMPORT, '/* GATE SELFTEST: theme import removed */');

  let exitCode = 0;
  try {
    fs.writeFileSync(ENTRY, broken);
    execSync(BUILD_CMD.replace(' && node scripts/check-package-css.js', ''), { cwd: root, stdio: 'pipe' });
    const brokenCss = fs.readFileSync(file, 'utf8');
    const brokenResult = evaluate(brokenCss);
    const caughtIt = brokenResult.missing.some((m) => m.sel === '.p-4{');
    if (!caughtIt) {
      console.error('✗ self-test: removed the theme import, rebuilt, and the gate did NOT flag missing .p-4{ — the gate is broken.');
      exitCode = 1;
    }
  } catch (err) {
    console.error(`✗ self-test: build/evaluate step threw — ${err.message}`);
    exitCode = 1;
  } finally {
    // Restore source and rebuild a valid artifact regardless of outcome.
    fs.writeFileSync(ENTRY, backup);
    try {
      execSync(BUILD_CMD.replace(' && node scripts/check-package-css.js', ''), { cwd: root, stdio: 'pipe' });
    } catch (err) {
      console.error(`✗ self-test: could not rebuild a clean artifact after restoring source — ${err.message}`);
      exitCode = 1;
    }
  }

  if (exitCode === 0) {
    const cleanResult = evaluate(fs.readFileSync(file, 'utf8'));
    if (!cleanResult.ok) {
      console.error('✗ self-test: restored source still fails evaluate() after rebuild — investigate before trusting this gate.');
      exitCode = 1;
    } else {
      console.log('✓ package-css self-test: removing the theme import is caught as missing .p-4{; the restored build passes clean.');
    }
  }
  process.exit(exitCode);
}

if (!fs.existsSync(file)) {
  console.error('check-package-css: dist-pkg/styles.css not found — did build:css run?');
  process.exit(1);
}

const result = evaluate(fs.readFileSync(file, 'utf8'));

if (result.missing.length || result.forbidden.length) {
  console.error(`\n✗ check-package-css: dist-pkg/styles.css is incorrect (${result.bytes} bytes)\n`);
  for (const m of result.missing) console.error(`  missing   ${m.sel.padEnd(22)} → ${m.why}`);
  for (const f of result.forbidden) console.error(`  forbidden ${f.sel.padEnd(22)} → ${f.why}`);
  console.error('\n  The build did NOT fail — Tailwind drops rules it cannot resolve,');
  console.error('  and rebinds variants it cannot bind, without erroring.');
  console.error('  See .claude/skills/tailwind/SKILL.md → "The package build".\n');
  process.exit(1);
}

if (result.tooSmall) {
  console.error(
    `\n✗ check-package-css: stylesheet is ${result.bytes} bytes, expected >= ${result.MIN_BYTES}.` +
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
if (result.danglingRoles.length) {
  console.error(`\n✗ check-package-css: ${result.danglingRoles.length} role variable(s) referenced but never defined\n`);
  for (const name of result.danglingRoles.sort()) {
    console.error(`  ${name.padEnd(40)} ${result.referenced.get(name)} reference(s), 0 definitions`);
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

console.log(
  `✓ package stylesheet OK — ${result.bytes} bytes, all load-bearing rules present, ` +
    `${result.roleCount} role var(s) defined, every --role-* reference resolves.`
);
if (result.danglingOther.length) {
  console.log(
    `  ℹ ${result.danglingOther.length} non-role var(s) are set at runtime or by the content scanner ` +
      '(informational, not a failure).'
  );
}
