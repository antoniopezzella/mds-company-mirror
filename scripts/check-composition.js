#!/usr/bin/env node
/**
 * check-composition.js — enforces the spacing half of the composition rules.
 *
 * Why this exists
 * ---------------
 * `src/spacing.ts` defines a 15-step scale and `src/docs/30-Spacing.mdx`
 * documents it, but nothing checked that code stayed on it. Tailwind will
 * happily compile `gap-7` (28px) and `p-[13px]`; both look almost right and
 * neither is a DS step. Measured at the time this was written: 5 off-scale
 * steps and 19 redundant arbitrary values had already crept in, including
 * `gap-[8px]` five times — which is just `gap-2` spelled in a way that
 * bypasses the scale.
 *
 * Two rules, both mechanical:
 *
 *   1. No spacing utility may use an arbitrary value (`p-[16px]`), unless it
 *      resolves a CSS variable (`p-[var(--x)]`) or is annotated.
 *   2. No spacing utility may use a step that is not on the DS scale.
 *
 * A third check is advisory only: physical properties (`ml-`/`pr-`) over
 * logical ones (`ms-`/`pe-`). It is reported with a count and never fails,
 * because the RTL retrofit is a separate piece of work — the point here is
 * that the number should shrink, not grow.
 *
 * Escape hatches, matching the house convention in check-role-usage.js:
 *   `spacing-allow`       on the same line
 *   `spacing-allow-file`  anywhere in the file
 *
 * Usage:
 *   node scripts/check-composition.js [--strict] [--json]
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const asJson = process.argv.includes('--json');

const ROOTS = ['src'];
const EXT = /\.(tsx|ts)$/;
const SKIP_DIR = /node_modules|__snapshots__|\.stories\.|\.test\./;

/**
 * Tailwind steps that correspond to a step in src/spacing.ts, plus the
 * sanctioned 2px half-steps (0.5/1.5/2.5/3.5) documented in 30-Spacing.mdx.
 *
 * Deliberately absent: 7 (28px), 9 (36px), 11, 13, 15 … Those compile, but
 * they are not design system values.
 */
const ON_SCALE = new Set([
  '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6',
  '8', '10', '12', '14', '16', '20', '24', '28', '32',
  'px', 'auto', 'full',
]);

const SPACING_PREFIX =
  '(?:gap|gap-x|gap-y|space-x|space-y|p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me)';

// The leading `.` in the lookbehind matters: prose and CSS-selector syntax
// (`.gap-9 (36px)` in GridShowcase's description of the legacy scale) is not
// a utility class, and reporting it trains people to ignore the checker.
const ARBITRARY = new RegExp(`(?<![\\w.-])-?${SPACING_PREFIX}-\\[([^\\]]+)\\]`, 'g');
const STEP = new RegExp(`(?<![\\w.-])-?(${SPACING_PREFIX})-([0-9]+(?:\\.[0-9]+)?|px|auto|full)(?![\\w.-])`, 'g');
const PHYSICAL = new RegExp(`(?<![\\w.-])-?(?:ml|mr|pl|pr)-(?:[0-9]+(?:\\.[0-9]+)?|px|\\[[^\\]]+\\])(?![\\w-])`, 'g');

/**
 * Remove comments while preserving line numbering, so a class-shaped string
 * in prose is not reported. This is not hypothetical: stack.tsx's own comment
 * explaining why `gap-7` is rejected contains the literal `gap-7`.
 */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => '\n'.repeat((m.match(/\n/g) || []).length))
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIR.test(full)) walk(full, out);
    } else if (EXT.test(entry.name) && !SKIP_DIR.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const arbitrary = [];
const offScale = [];
const physical = new Map();

for (const rootDir of ROOTS) {
  const abs = path.join(root, rootDir);
  if (!fs.existsSync(abs)) continue;

  for (const file of walk(abs)) {
    const raw = fs.readFileSync(file, 'utf8');
    if (raw.includes('spacing-allow-file')) continue;

    const lines = stripComments(raw).split('\n');
    const rawLines = raw.split('\n');
    const rel = path.relative(root, file);

    lines.forEach((line, i) => {
      if (/spacing-allow/.test(rawLines[i] ?? '')) return;

      for (const m of line.matchAll(ARBITRARY)) {
        // A CSS variable is the sanctioned use of an arbitrary value — it is
        // how a component reads a design token, not a magic number.
        if (m[1].includes('var(')) continue;
        arbitrary.push({ file: rel, line: i + 1, value: m[0] });
      }

      for (const m of line.matchAll(STEP)) {
        if (!ON_SCALE.has(m[2])) {
          offScale.push({ file: rel, line: i + 1, value: m[0], step: m[2] });
        }
      }

      const hits = [...line.matchAll(PHYSICAL)].length;
      if (hits) physical.set(rel, (physical.get(rel) ?? 0) + hits);
    });
  }
}

const physicalTotal = [...physical.values()].reduce((a, b) => a + b, 0);
const summary = {
  arbitrary: arbitrary.length,
  offScale: offScale.length,
  physicalProperties: physicalTotal,
  violations: [...arbitrary, ...offScale],
};

if (asJson) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log('Composition check — spacing scale conformance\n');

  if (arbitrary.length) {
    console.log(`✗ ${arbitrary.length} arbitrary spacing value(s) — use a scale step instead:`);
    for (const a of arbitrary) console.log(`  ${a.file}:${a.line}  ${a.value}`);
    console.log('');
  }

  if (offScale.length) {
    console.log(`✗ ${offScale.length} off-scale spacing step(s) — not a value in src/spacing.ts:`);
    for (const o of offScale) console.log(`  ${o.file}:${o.line}  ${o.value}  (step ${o.step})`);
    console.log('');
  }

  if (!arbitrary.length && !offScale.length) {
    console.log('✓ Every spacing utility sits on the DS scale.\n');
  }

  // Advisory. Never fails — see the header comment.
  if (physicalTotal) {
    console.log(
      `ℹ ${physicalTotal} physical spacing propert${physicalTotal === 1 ? 'y' : 'ies'} ` +
        `(ml-/mr-/pl-/pr-) across ${physical.size} file(s).`
    );
    console.log('  Prefer logical properties (ms-/me-/ps-/pe-) in new code — RTL readiness.');
    console.log('  Advisory only; this number should shrink over time, not grow.');
  }

  if ((arbitrary.length || offScale.length) && !strict) {
    console.log('\n  (advisory — run with --strict to fail)');
  }
}

if (strict && (arbitrary.length || offScale.length)) process.exit(1);
