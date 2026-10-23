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

  const errors = []; // problems that are not a missing/forbidden selector
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
  // --mds-color-* became load-bearing on 2026-10-22: step 3 of the token
  // pipeline migration removed the 19 hand-written shadcn colours from
  // tailwind.config.js, so `bg-card`/`text-muted-foreground`/`border-border`
  // on a shipped component now resolve through these. A dangling one is the
  // same class of bug as a dangling --role-* (correct in the repo, invisible
  // in the consumer's app), so it fails the gate rather than being reported
  // as informational.
  const MDS_PREFIX = '--mds-color-';
  const danglingRoles = dangling.filter((n) => n.startsWith(ROLE_PREFIX));
  const danglingMds = dangling.filter((n) => n.startsWith(MDS_PREFIX));
  const danglingOther = dangling.filter((n) => !n.startsWith(ROLE_PREFIX) && !n.startsWith(MDS_PREFIX));
  const roleCount = [...defined].filter((n) => n.startsWith(ROLE_PREFIX)).length;
  const mdsCount = [...defined].filter((n) => n.startsWith(MDS_PREFIX)).length;

  // The dark MDS values must be reachable by the mechanism the package's
  // contract names: the `.dark` CLASS (darkMode:['class'], and the
  // `:is(.dark *)` variant REQUIRED above). The generated layer binds the
  // [data-theme]/[data-surface] attributes as well, and a consumer who sets
  // only the class would otherwise get LIGHT values for every colour class —
  // in the artifact, silently, while this repo's own app looked right because
  // it writes both. Substring checks cannot see this; it needs the selector
  // of the block that actually sets the variable.
  const darkMechanism = [];
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/--mds-color-background-default\s*:/.test(m[2])) continue;
    if (/data-theme=["']?dark|data-surface=["']?dark|\.dark/.test(m[1])) darkMechanism.push(m[1].trim());
  }
  const darkBound = darkMechanism.some((sel) => /\.dark/.test(sel));
  const mdsShipped = mdsCount > 0;
  if (mdsShipped && !darkMechanism.length) errors.push('no rule sets the dark --mds-color-* values — dark mode is absent from the published stylesheet');
  else if (mdsShipped && !darkBound) {
    errors.push(
      `the dark --mds-color-* values are bound only to ${darkMechanism.join(' / ')} — a consumer setting the \`.dark\` CLASS ` +
        '(this package\'s documented contract) would get LIGHT colours for every class. Add `.dark` to the dark block in generate-token-css.mjs.'
    );
  }

  const ok = !missing.length && !forbidden.length && !tooSmall && !danglingRoles.length && !danglingMds.length && !errors.length;
  return { ok, bytes, missing, forbidden, tooSmall, MIN_BYTES, danglingRoles, danglingMds, danglingOther, roleCount, mdsCount, referenced, errors, darkMechanism };
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

  // The generated Figma token layer, imported by styles.package.css since
  // step 3. Both halves are asserted because they arrive by two separate
  // @imports and either can be dropped on its own: the variables
  // (mds-tokens.css) and the utility classes (tailwind.tokens.css). Without
  // the first, every shipped colour class resolves to nothing; without the
  // second, the class names vanish entirely — and with the hand-written
  // colours now gone from tailwind.config.js, nothing else defines them.
  { sel: '--mds-color-background-default:', why: 'the generated token variables — mds-tokens.css not imported by styles.package.css' },
  { sel: '.bg-critical-subtle{', why: 'the generated colour utilities — tailwind.tokens.css not imported by styles.package.css' },
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
  const COMPILE = BUILD_CMD.replace(' && node scripts/check-package-css.js', '');

  // One case per @import that can be lost on its own. Each names the string to
  // remove from the entry stylesheet and the REQUIRED selector whose absence
  // must then be reported — i.e. the mutation and the expected verdict, so a
  // check that silently stops checking is caught.
  const CASES = [
    {
      remove: '@import "tailwindcss/theme" layer(theme);',
      expect: '.p-4{',
      what: 'the theme layer (the historical regression: every numeric spacing utility vanished)',
    },
    {
      remove: "@import './styles/generated/mds-tokens.css';",
      expect: '--mds-color-background-default:',
      what: 'the generated token variables (every shipped colour class would resolve to nothing)',
    },
    {
      remove: "@import './styles/generated/tailwind.tokens.css';",
      expect: '.bg-critical-subtle{',
      what: 'the generated colour utilities (the class names would not exist at all)',
    },
  ];

  let exitCode = 0;
  try {
    for (const c of CASES) {
      if (!backup.includes(c.remove)) {
        console.error(`✗ self-test: ${c.remove} not found in src/styles.package.css — cannot certify this gate.`);
        exitCode = 1;
        continue;
      }
      fs.writeFileSync(ENTRY, backup.replace(c.remove, `/* GATE SELFTEST: removed */`));
      execSync(COMPILE, { cwd: root, stdio: 'pipe' });
      const brokenResult = evaluate(fs.readFileSync(file, 'utf8'));
      if (brokenResult.missing.some((m) => m.sel === c.expect)) {
        console.log(`✓ removing ${c.what} is caught as missing ${c.expect}`);
      } else {
        console.error(`✗ self-test: removed ${c.remove}, rebuilt, and the gate did NOT flag missing ${c.expect} — the gate is broken.`);
        exitCode = 1;
      }
    }
  } catch (err) {
    console.error(`✗ self-test: build/evaluate step threw — ${err.message}`);
    exitCode = 1;
  } finally {
    // Restore source and rebuild a valid artifact regardless of outcome.
    fs.writeFileSync(ENTRY, backup);
    try {
      execSync(COMPILE, { cwd: root, stdio: 'pipe' });
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
      // The three cases above all trip a REQUIRED check, which exits before
      // the dangling-var pass ever runs — so that branch needs its own proof.
      // Real artifact, one appended rule referencing a token that does not
      // exist: exactly what shipping a utility for a deleted Figma variable
      // would look like.
      const artifact = fs.readFileSync(file, 'utf8');
      const planted = artifact + '\n.selftest-dangling{color:var(--mds-color-does-not-exist)}\n';
      const plantedResult = evaluate(planted);
      const danglingCaught = plantedResult.danglingMds.includes('--mds-color-does-not-exist') && !plantedResult.ok;
      if (danglingCaught) console.log('✓ a utility pointing at a non-existent --mds-color-* token is caught as dangling');
      else { console.error('✗ self-test: a dangling --mds-color-* reference was NOT reported — the dangling pass is broken.'); exitCode = 1; }

      // Unbind the dark values from the class the package's contract names.
      // Same shape as the real regression: the attribute selectors stay, so
      // every presence check still passes and only a consumer notices.
      const unbound = artifact.replace(/,\.dark(\{[^{}]*--mds-color-background-default)/, '$1');
      const unboundResult = evaluate(unbound);
      const unboundCaught = unbound !== artifact && !unboundResult.ok &&
        unboundResult.errors.some((e) => e.includes('`.dark` CLASS'));
      if (unboundCaught) console.log('✓ dark values bound only to the attributes, not the .dark class, is caught');
      else { console.error('✗ self-test: unbinding the dark values from .dark was NOT reported — the dark-mechanism check is broken.'); exitCode = 1; }

      if (!exitCode) console.log(`✓ package-css self-test: ${CASES.length + 2} mutation(s) caught; the restored build passes clean.`);
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
if (result.errors.length) {
  console.error(`\n✗ check-package-css: ${result.errors.length} problem(s) in dist-pkg/styles.css\n`);
  for (const e of result.errors) console.error(`  ${e}`);
  console.error('');
  process.exit(1);
}

if (result.danglingMds.length) {
  console.error(`\n✗ check-package-css: ${result.danglingMds.length} --mds-color-* variable(s) referenced but never defined\n`);
  for (const n of result.danglingMds) console.error(`  ${n}  (referenced ${result.referenced.get(n)}x)`);
  console.error('\n  The generated token layer must be SHIPPED, not just present in the repo:');
  console.error('  check that src/styles.package.css still imports styles/generated/mds-tokens.css,');
  console.error('  and that the export still carries the token the utility points at.\n');
  process.exit(1);
}

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
    `${result.roleCount} role var(s) + ${result.mdsCount} --mds-color-* var(s) defined, every --role-* and --mds-color-* reference resolves, ` +
      `dark bound to ${result.darkMechanism.length ? result.darkMechanism[0].replace(/\s+/g, ' ') : 'NOTHING'}.`
);
if (result.danglingOther.length) {
  console.log(
    `  ℹ ${result.danglingOther.length} non-role var(s) are set at runtime or by the content scanner ` +
      '(informational, not a failure).'
  );
}
