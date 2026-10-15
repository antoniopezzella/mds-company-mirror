#!/usr/bin/env node
/**
 * check-dark-baseline.js — the dark-mode ratchet.
 *
 * `npm run test:dark` runs every story a SECOND time with colorMode flipped to
 * dark (see vitest.dark.config.ts). 57 of ~695 story tests fail today, almost
 * all axe `color-contrast` in dark mode — real debt, concentrated in legacy
 * `src/components/[A-Z]*` (being deleted), marketing `sections/`/`projects/`,
 * and 5 files in the published `ui/` set. Folding that straight into
 * `governance:ci` would turn every unrelated PR red, which is exactly why
 * vitest.dark.config.ts's own header says to promote it warn-first.
 *
 * This gate is that warm-up rung. It does NOT require dark to be green. It
 * requires it not to get WORSE: it reads the dark run's JSON report, collects
 * the set of story FILES with at least one dark failure, and compares that set
 * against a committed baseline (dark-mode-baseline.json).
 *
 *   - A file that fails and is NOT in the baseline  → REGRESSION → exit 1.
 *     Someone shipped a new dark contrast break; block it.
 *   - A baseline file that now fully passes         → reported as a tighten
 *     opportunity (does NOT fail — a browser suite can flake a file green for
 *     one run, and failing on that would make CI non-deterministic). Remove it
 *     from the baseline to lock the win in.
 *   - Failing set ⊆ baseline                        → exit 0.
 *
 * So the number can only ratchet DOWN (as files are fixed and removed from the
 * baseline) and never silently up. Same shape as the hex/palette gates, which
 * went in at zero and ratchet.
 *
 * Usage:
 *   node scripts/check-dark-baseline.js [path-to-vitest-json]   (default: dark-results.json)
 *   node scripts/check-dark-baseline.js --selftest              (proves it can fail)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = path.join(root, 'scripts', 'dark-mode-baseline.json');

/** Repo-relative, forward-slash path for a vitest report `name`. */
function rel(p) {
  return path.relative(root, path.resolve(root, p)).split(path.sep).join('/');
}

/**
 * The set of story files with >=1 failing test, from a vitest JSON report.
 * Vitest's json reporter emits `testResults: [{ name, status, assertionResults }]`.
 * A file counts as failing if its own status is 'failed' OR any assertion failed
 * — belt and suspenders across reporter versions.
 */
function failingFiles(report) {
  const files = new Set();
  for (const f of report.testResults ?? []) {
    const anyAssertionFailed = (f.assertionResults ?? []).some((a) => a.status === 'failed');
    if (f.status === 'failed' || anyAssertionFailed) files.add(rel(f.name));
  }
  return files;
}

function loadBaseline() {
  if (!fs.existsSync(BASELINE)) {
    console.error(`✗ baseline not found: ${rel(BASELINE)} — generate it first (see the npm script dark:baseline).`);
    process.exit(2);
  }
  const data = JSON.parse(fs.readFileSync(BASELINE, 'utf8'));
  return new Set(data.knownFailingFiles ?? []);
}

/** Core comparison, factored out so --selftest can drive it with a synthetic set. */
function evaluate(failing, baseline) {
  const regressions = [...failing].filter((f) => !baseline.has(f)).sort();
  const fixed = [...baseline].filter((f) => !failing.has(f)).sort();
  return { regressions, fixed };
}

// ── self-test: prove the gate goes red on a new failing file ────────────────
if (process.argv.includes('--selftest')) {
  const baseline = new Set(['src/components/ui/known-bad.stories.tsx']);
  const clean = evaluate(new Set(['src/components/ui/known-bad.stories.tsx']), baseline);
  const regressed = evaluate(
    new Set(['src/components/ui/known-bad.stories.tsx', 'src/components/ui/NEW-break.stories.tsx']),
    baseline
  );
  const ok = clean.regressions.length === 0 && regressed.regressions.length === 1;
  if (!ok) {
    console.error('✗ self-test FAILED — the ratchet did not distinguish a new failing file from the baseline.');
    process.exit(1);
  }
  console.log('✓ self-test: a failing file in the baseline passes; a new one is caught as a regression.');
  process.exit(0);
}

// ── --write: regenerate the baseline from a report (npm run dark:baseline) ──
if (process.argv.includes('--write')) {
  const rp = process.argv[process.argv.indexOf('--write') + 1] || path.join(root, 'dark-results.json');
  if (!fs.existsSync(rp)) {
    console.error(`✗ dark report not found: ${rp}`);
    process.exit(2);
  }
  const failing = [...failingFiles(JSON.parse(fs.readFileSync(rp, 'utf8')))].sort();
  const out = {
    note:
      'Story files that fail `npm run test:dark` (dark-mode axe, mostly color-contrast). ' +
      'The dark ratchet (scripts/check-dark-baseline.js) blocks any failing file NOT listed here. ' +
      'Remove a file once its dark contrast is fixed — the list should only shrink.',
    generatedAt: new Date().toISOString().slice(0, 10),
    knownFailingFiles: failing,
  };
  fs.writeFileSync(BASELINE, JSON.stringify(out, null, 2) + '\n');
  console.log(`✓ wrote ${rel(BASELINE)} — ${failing.length} known-failing file(s).`);
  process.exit(0);
}

const reportPath = process.argv[2] || path.join(root, 'dark-results.json');
if (!fs.existsSync(reportPath)) {
  console.error(`✗ dark report not found: ${reportPath}`);
  console.error(`  run:  npm run test:dark -- --reporter=json --outputFile=dark-results.json`);
  process.exit(2);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const failing = failingFiles(report);
const baseline = loadBaseline();
const { regressions, fixed } = evaluate(failing, baseline);

console.log(`Dark-mode ratchet — ${failing.size} file(s) failing, ${baseline.size} in baseline.`);

if (fixed.length) {
  console.log(`\nℹ ${fixed.length} baseline file(s) now pass in dark mode — tighten the baseline by removing them:`);
  for (const f of fixed) console.log(`  - ${f}`);
  console.log('  (run `npm run dark:baseline` to regenerate from the current run.)');
}

if (regressions.length) {
  console.error(`\n✗ ${regressions.length} NEW dark-mode failure(s) — not in the baseline. A story broke in dark mode:`);
  for (const f of regressions) console.error(`  - ${f}`);
  console.error('\n  Fix the dark contrast, or if this is a story that legitimately cannot pass, add it to');
  console.error('  scripts/dark-mode-baseline.json with a reason in the commit. Do not add it to dodge a real break.');
  process.exit(1);
}

console.log('\n✓ No new dark-mode regressions (failing set is within the baseline).');
