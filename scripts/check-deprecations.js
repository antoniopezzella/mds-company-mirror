#!/usr/bin/env node
/**
 * check-deprecations.js — enforces the deprecation window.
 *
 * Why this exists
 * ---------------
 * `prop-compat.ts` told consumers that legacy values "are removed at 1.0 per
 * the deprecation window in docs/CONTRIBUTING.md". **That section did not
 * exist.** The code was making a support commitment on behalf of a policy
 * nobody had written, and a reader following the pointer found nothing.
 *
 * A window that is only prose is the one rule in this repo with no gate —
 * next to tokens, roles, spacing and prop vocabulary, all of which fail CI.
 * It would be the one that rots. So the window is machine-checked:
 *
 *   @deprecated since 0.6.0; remove after 0.7.0 / 2026-12-23.
 *               Use `size`.
 *
 * Both conditions must pass before removal — one further minor AND 90 days.
 * The date floor is what makes it real: this project shipped 0.5.0 and 0.6.0
 * two days apart, so a release-count rule alone would have meant a window of
 * about a week.
 *
 * What it checks
 * --------------
 * 1. Every `@deprecated` carries the full header. A bare `@deprecated` is a
 *    deprecation with no promise attached, which is how the original one got
 *    away with pointing at a section that was never written.
 * 2. The versions are semver and the date is a real ISO date.
 * 3. `remove after` is a later version than `since`.
 * 4. Reports anything now past BOTH conditions as removable — the window is
 *    a floor, not an alarm, so this is informational unless --strict.
 *
 * Usage: node scripts/check-deprecations.js [--strict] [--json]
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const asJson = process.argv.includes('--json');

const ROOTS = ['src'];
const EXT = /\.(tsx?|mdx)$/;
const SKIP = /node_modules|\.stories\.|\.test\./;

/** `@deprecated since X.Y.Z; remove after A.B.C / YYYY-MM-DD.` */
const HEADER = /@deprecated\s+since\s+(\d+\.\d+\.\d+);\s*remove\s+after\s+(\d+\.\d+\.\d+)\s*\/\s*(\d{4}-\d{2}-\d{2})\./;
/**
 * A real JSDoc tag, not prose about one. Documentation that discusses
 * deprecation writes it in backticks — `@deprecated` — and matching those
 * would demand a removal promise from a sentence explaining the convention.
 */
const BARE = /(?<!`)@deprecated(?!`)/;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP.test(full)) walk(full, out);
    } else if (EXT.test(e.name) && !SKIP.test(e.name)) {
      out.push(full);
    }
  }
  return out;
}

const cmp = (a, b) => {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
};

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const current = pkg.version;
const today = new Date().toISOString().slice(0, 10);

const malformed = [];
const tracked = [];

for (const rootDir of ROOTS) {
  const abs = path.join(root, rootDir);
  if (!fs.existsSync(abs)) continue;

  for (const file of walk(abs)) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    const rel = path.relative(root, file);

    lines.forEach((line, i) => {
      if (!BARE.test(line)) return;

      // The header may wrap; join the next two lines before matching.
      const window = [line, lines[i + 1] ?? '', lines[i + 2] ?? ''].join(' ');
      const m = HEADER.exec(window);

      if (!m) {
        malformed.push({ file: rel, line: i + 1, text: line.trim().slice(0, 80) });
        return;
      }

      const [, since, removeAfter, date] = m;
      const versionOk = cmp(removeAfter, since) > 0;
      const versionReached = cmp(current, removeAfter) >= 0;
      const dateReached = today >= date;

      tracked.push({
        file: rel,
        line: i + 1,
        since,
        removeAfter,
        date,
        versionOk,
        removable: versionReached && dateReached,
        versionReached,
        dateReached,
      });
    });
  }
}

const badOrder = tracked.filter((t) => !t.versionOk);
const removable = tracked.filter((t) => t.removable);

if (asJson) {
  console.log(JSON.stringify({ current, today, tracked, malformed, removable }, null, 2));
} else {
  console.log(`Deprecation window — package ${current}, today ${today}\n`);

  if (malformed.length) {
    console.log(`✗ ${malformed.length} @deprecated without a removal promise:`);
    for (const m of malformed) console.log(`  ${m.file}:${m.line}  ${m.text}`);
    console.log('\n  Required form:');
    console.log('    @deprecated since 0.6.0; remove after 0.7.0 / 2026-12-23.');
    console.log('                Use `size`.\n');
  }

  if (badOrder.length) {
    console.log(`✗ ${badOrder.length} promise removal at or before the version they were deprecated in:`);
    for (const b of badOrder) console.log(`  ${b.file}:${b.line}  since ${b.since}, remove after ${b.removeAfter}`);
    console.log('');
  }

  if (!malformed.length && !badOrder.length) {
    console.log(`✓ ${tracked.length} deprecation(s), all carrying a well-formed removal promise.\n`);
  }

  if (removable.length) {
    console.log(`ℹ ${removable.length} deprecation(s) are now past both conditions and may be removed:`);
    for (const r of removable) {
      console.log(`  ${r.file}:${r.line}  since ${r.since} · window closed ${r.date}`);
    }
    console.log('  The window is a floor, not a deadline — removing is still a breaking change.\n');
  } else if (tracked.length) {
    const next = tracked.slice().sort((a, b) => a.date.localeCompare(b.date))[0];
    console.log(`  Earliest window closes ${next.date}, after ${next.removeAfter}.`);
  }
}

// Malformed and mis-ordered are defects in the record itself, so they fail
// regardless of --strict: a deprecation with no promise is the exact failure
// this script was written for.
if (malformed.length || badOrder.length) process.exit(1);
if (strict && removable.length) process.exit(0); // informational only
