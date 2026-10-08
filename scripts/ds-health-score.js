#!/usr/bin/env node
/**
 * Design-system health, as a FIXED set of mechanical measurements.
 *
 * Why this exists
 * ---------------
 * Three health reports have been written for this repo by hand. Each one
 * measured whatever it thought to measure that day, so no two runs were
 * comparable: the 2026-09-26 run could not say whether its 82/100 was better
 * or worse than the run before it, because the run before it had no score —
 * and the run before THAT had counted different things again. A number you
 * cannot compare to the previous number is decoration.
 *
 * So the rubric is frozen here, in code:
 *
 *  - every metric is computed the same way every time, from the repo itself;
 *  - every metric can be read at ANY git revision, so history is backfillable
 *    rather than starting at n=1;
 *  - the weights are declared, not chosen per run;
 *  - `RUBRIC_VERSION` changes whenever the definitions change, so a reader can
 *    tell "the score moved" from "we moved the goalposts".
 *
 * Everything here is cheap and static: no build, no test run, no network.
 * That is deliberate — it is what makes backfilling 7 historical revisions
 * take seconds, and what stops a flaky suite from moving a health score.
 * Test and coverage numbers are recorded ALONGSIDE, via --with-tests, because
 * they are the one thing worth the wait; they are not required.
 *
 * Usage
 * -----
 *   node scripts/ds-health-score.js                 measure the working tree
 *   node scripts/ds-health-score.js --rev v0.5.0    measure a past revision
 *   node scripts/ds-health-score.js --json          machine-readable
 *   node scripts/ds-health-score.js --record        append to the history file
 *   node scripts/ds-health-score.js --backfill      every tag, oldest first
 *   node scripts/ds-health-score.js --compare       table of every recorded run
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HISTORY = path.join(root, 'docs/ds-health-history.json');

/**
 * Bump on ANY change to what a metric means or how it is weighted.
 * A score is only comparable to another score of the same rubric version.
 *
 * v2 — `colour_discipline` now ignores hex inside comments and files carrying
 * `roles-allow-hex-file`, matching `check-role-usage.js`. v1 scored 8/100 on
 * that axis by counting documentation and one file of formally tracked debt,
 * so v1 and v2 numbers are NOT comparable. History is re-derived rather than
 * migrated — which is the reason every run keeps its raw metrics.
 */
export const RUBRIC_VERSION = 2;

// ---------------------------------------------------------------------------
// Reading the repo — at HEAD, or at any revision, without touching the tree
// ---------------------------------------------------------------------------

const git = (args) =>
  execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

/** A file's contents at `rev`, or null when it did not exist there. */
function read(rev, rel) {
  if (!rev) {
    const full = path.join(root, rel);
    return fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null;
  }
  try {
    return git(['show', `${rev}:${rel}`]);
  } catch {
    return null;
  }
}

/** Every tracked path under `dir` at `rev`. Never checks anything out. */
function list(rev, dir) {
  if (!rev) {
    const out = [];
    const walk = (d) => {
      if (!fs.existsSync(d)) return;
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, e.name);
        if (e.isDirectory()) walk(full);
        else out.push(path.relative(root, full));
      }
    };
    walk(path.join(root, dir));
    return out;
  }
  try {
    return git(['ls-tree', '-r', '--name-only', rev, '--', dir]).split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

const count = (text, re) => (text ? (text.match(re) ?? []).length : 0);

// ---------------------------------------------------------------------------
// The metrics
// ---------------------------------------------------------------------------

const UI = 'src/components/ui';
/** The gate set a healthy revision is expected to have, all walking subdirs. */
const EXPECTED_GATES = 4;
const IMPL = /\.tsx?$/;
const NOT_IMPL = /\.(test|stories|spec)\.|\/index\.tsx?$|\.d\.ts$/;

function measure(rev) {
  const files = list(rev, UI);
  const impl = files.filter((f) => IMPL.test(f) && !NOT_IMPL.test(f));

  // A module "has a test" when a file names it — its own `.test.tsx`, or a
  // test in the same directory that imports it. Incidental coverage from a
  // parent's test is real coverage but not a dedicated test, and the point of
  // this metric is whether the module is pinned on purpose.
  const tests = files.filter((f) => /\.test\.tsx?$/.test(f));
  const stories = files.filter((f) => /\.stories\.tsx?$/.test(f));
  const base = (f) => path.basename(f).replace(/\.(test|stories)?\.tsx?$/, '').replace(/\.tsx?$/, '');
  const testNames = new Set(tests.map(base));
  const storyNames = new Set(stories.map(base));

  const withTest = impl.filter((f) => testNames.has(base(f))).length;
  const withStory = impl.filter((f) => storyNames.has(base(f))).length;

  /*
   * Hardcoded colour literals — DRIFT only, honouring the same annotations
   * `check-role-usage.js` does.
   *
   * The first version counted every `#rrggbb` in the file. That scored 8/100
   * and was measuring the wrong thing twice over: it counted hex inside
   * COMMENTS (a note reading "on white this is 3.2:1" is documentation, not a
   * colour), and it counted `button.tsx`, which carries a
   * `roles-allow-hex-file` marker and a comment explaining that its
   * hover/active states have no roles yet and are tracked debt awaiting a
   * token request. Scoring a deliberate, documented, already-dispositioned
   * decision as a failure makes the metric an argument against following the
   * repo's own governance process.
   */
  let hex = 0;
  for (const f of impl) {
    const src = read(rev, f);
    if (!src || /roles-allow-hex-file/.test(src)) continue;
    let inBlock = false;
    const lines = src.split('\n');
    lines.forEach((line, i) => {
      let code = '';
      for (let c = 0; c < line.length; c += 1) {
        if (inBlock) {
          if (line.startsWith('*/', c)) {
            inBlock = false;
            c += 1;
          }
          continue;
        }
        if (line.startsWith('/*', c)) {
          inBlock = true;
          c += 1;
          continue;
        }
        if (line.startsWith('//', c)) break;
        code += line[c];
      }
      if (/roles-allow-hex/.test(line) || /roles-allow-hex/.test(lines[i - 1] ?? '')) return;
      hex += (code.match(/#[0-9a-fA-F]{6}\b/g) ?? []).length;
    });
  }

  // Token-system size, counted from the source of truth rather than any doc.
  const primitives = count(read(rev, 'src/tokens.ts'), /^\s+[a-zA-Z][a-zA-Z0-9]*:\s*'/gm);
  const semantics = count(read(rev, 'src/semantic-tokens.ts'), /^\s+[a-zA-Z][a-zA-Z0-9]*:\s*ref\(/gm);
  const roles = count(read(rev, 'src/theme/roles.ts'), /^\s+\|\s*'[a-z]/gm);

  // ...and what the agent instructions CLAIM they are. The gap is the
  // doc-drift metric: a design system whose own documentation misstates its
  // size is one nobody can trust the rest of.
  //
  // Read BOTH files. The token-tier section lived in CLAUDE.md until
  // 2026-10-07, when that file was split into a ~166-line core plus
  // path-scoped `.claude/rules/`; the counts moved to rules/tokens.md and this
  // metric silently went to 0/100 reporting "305 off" — a false zero caused by
  // the split, not by any drift. Concatenating is deliberate rather than
  // choosing one: it keeps scoring old revisions correct (`rev` can be any
  // commit, and before the split the counts really were in CLAUDE.md), and it
  // keeps working if they move again.
  const claude =
    (read(rev, 'CLAUDE.md') ?? '') + '\n' + (read(rev, '.claude/rules/tokens.md') ?? '');
  const claimed = {
    primitives: Number(/([0-9]+) color tokens/.exec(claude)?.[1] ?? 0),
    semantics: Number(/([0-9]+) semantic tokens/.exec(claude)?.[1] ?? 0),
    roles: Number(/([0-9]+) roles/.exec(claude)?.[1] ?? 0),
  };
  const drift =
    Math.abs(primitives - claimed.primitives) +
    Math.abs(semantics - claimed.semantics) +
    Math.abs(roles - claimed.roles);

  // Loose .md files at the repo root — the sprawl the docs gate exists for.
  const rootDocs = list(rev, '.').filter((f) => /^[^/]+\.md$/.test(f)).length;

  // Accessibility: enforced, advisory, or absent.
  const preview = read(rev, '.storybook/preview.tsx') ?? '';
  const a11yBlock = /a11y:\s*\{[^}]*\}/s.exec(preview)?.[0] ?? '';
  const a11y = /test:\s*'error'/.test(a11yBlock)
    ? 'error'
    : /test:\s*'todo'/.test(a11yBlock)
      ? 'todo'
      : a11yBlock
        ? 'configured'
        : 'none';

  // Do the file-walking gates actually reach subdirectories? Two of them did
  // not until 2026-09-26, so a whole directory-shaped component was invisible
  // to them while they reported green.
  const gateFiles = ['check-radius.js', 'check-z-index.js', 'check-composition.js', 'check-role-usage.js'];
  const recursive = gateFiles.filter((g) => {
    const src = read(rev, `scripts/${g}`);
    return src ? /withFileTypes|isDirectory\(\)/.test(src) : false;
  }).length;
  const gatesPresent = gateFiles.filter((g) => read(rev, `scripts/${g}`) !== null).length;
  // NOTE the denominator below is the FIXED expected set, not `gatesPresent`.
  // Scoring "of the gates you have, how many recurse" rewarded a revision for
  // having fewer gates — v0.0.0 scored 100/100 on one gate that happened to
  // recurse, beating a later revision that had four.

  // Deprecations carrying a dated removal promise, and the public surface.
  let deprecations = 0;
  for (const f of files.filter((f) => IMPL.test(f))) {
    deprecations += count(read(rev, f), /@deprecated since [0-9]/g);
  }
  const exports = count(read(rev, 'src/index.ts'), /^export /gm);

  return {
    uiModules: impl.length,
    withTest,
    withStory,
    hexLiterals: hex,
    primitives,
    semantics,
    roles,
    tokenDocDrift: drift,
    rootDocs,
    a11yGate: a11y,
    gatesRecursive: recursive,
    gatesPresent,
    deprecations,
    publicExports: exports,
  };
}

// ---------------------------------------------------------------------------
// Scoring — every formula declared once, here
// ---------------------------------------------------------------------------

const clamp = (n) => Math.max(0, Math.min(100, n));
const pct = (n, d) => (d ? (n / d) * 100 : 0);

/**
 * Each entry: how a raw measurement becomes 0–100, and what it is worth.
 * Weights sum to 100 within the whole score. Kept flat on purpose — nested
 * category weights were how the last report ended up with a number nobody
 * could reproduce.
 */
const RUBRIC = [
  {
    id: 'test_coverage',
    label: 'Modules with a dedicated test',
    weight: 22,
    score: (m) => pct(m.withTest, m.uiModules),
    format: (m) => `${m.withTest}/${m.uiModules}`,
  },
  {
    id: 'story_coverage',
    label: 'Modules with a story',
    weight: 18,
    score: (m) => pct(m.withStory, m.uiModules),
    format: (m) => `${m.withStory}/${m.uiModules}`,
  },
  {
    id: 'a11y_enforcement',
    label: 'Accessibility gate',
    weight: 15,
    // Advisory scores well below half: a gate that reports and never fails is
    // most of the work for none of the protection.
    score: (m) => ({ error: 100, todo: 35, configured: 20, none: 0 })[m.a11yGate] ?? 0,
    format: (m) => m.a11yGate,
  },
  {
    id: 'gate_reach',
    label: 'Gates that walk subdirectories',
    weight: 12,
    score: (m) => pct(m.gatesRecursive, EXPECTED_GATES),
    format: (m) => `${m.gatesRecursive}/${EXPECTED_GATES}`,
  },
  {
    id: 'colour_discipline',
    label: 'Hardcoded hex in components',
    weight: 13,
    // 0 literals is 100; one per module is 0. Density, not raw count, so the
    // score does not fall simply because the library grew. A revision with no
    // components scores 0, not 100 — "no hex because no code" is not
    // discipline, and treating it as such made the pre-library history look
    // perfect on this axis.
    score: (m) => (m.uiModules === 0 ? 0 : clamp(100 - pct(m.hexLiterals, m.uiModules))),
    format: (m) => `${m.hexLiterals} across ${m.uiModules}`,
  },
  {
    id: 'token_doc_accuracy',
    label: 'Documented token counts match reality',
    weight: 12,
    // Every token of drift costs 4 points; 25 off is a zero.
    score: (m) => clamp(100 - m.tokenDocDrift * 4),
    format: (m) => `${m.tokenDocDrift} off`,
  },
  {
    id: 'doc_sprawl',
    label: 'Loose .md files at the repo root',
    weight: 8,
    // 6 are allowlisted; each extra costs 12.
    score: (m) => clamp(100 - Math.max(0, m.rootDocs - 6) * 12),
    format: (m) => `${m.rootDocs}`,
  },
];

function scoreOf(m) {
  const parts = RUBRIC.map((r) => {
    const raw = clamp(r.score(m));
    return { id: r.id, label: r.label, weight: r.weight, score: Math.round(raw), detail: r.format(m) };
  });
  const total = parts.reduce((s, p) => s + p.score * p.weight, 0) / 100;
  return { total: Math.round(total), parts };
}

// ---------------------------------------------------------------------------
// History
// ---------------------------------------------------------------------------

const loadHistory = () =>
  fs.existsSync(HISTORY) ? JSON.parse(fs.readFileSync(HISTORY, 'utf8')) : { rubricVersion: RUBRIC_VERSION, runs: [] };

function saveHistory(h) {
  h.runs.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  fs.writeFileSync(HISTORY, `${JSON.stringify(h, null, 2)}\n`);
}

function runFor(rev) {
  const m = measure(rev);
  const s = scoreOf(m);
  const sha = git(['rev-parse', '--short', rev ?? 'HEAD']).trim();
  const date = git(['log', '-1', '--format=%cs', rev ?? 'HEAD']).trim();
  return { rev: rev ?? 'HEAD', sha, date, rubricVersion: RUBRIC_VERSION, score: s.total, parts: s.parts, metrics: m };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const value = (n) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : undefined);

function printRun(r) {
  console.log(`\nDesign-system health — rubric v${r.rubricVersion}`);
  console.log(`${r.rev}  ${r.sha}  ${r.date}\n`);
  console.log(`  OVERALL  ${r.score}/100\n`);
  for (const p of r.parts) {
    const bar = '█'.repeat(Math.round(p.score / 5)).padEnd(20, '·');
    console.log(
      `  ${String(p.score).padStart(3)}  ${bar}  ${p.label.padEnd(38)} ${p.detail}  (w${p.weight})`
    );
  }
  console.log('');
}

function compare(h) {
  const runs = h.runs.filter((r) => r.rubricVersion === RUBRIC_VERSION);
  if (!runs.length) return console.log('No runs recorded on the current rubric.');
  const ids = RUBRIC.map((r) => r.id);
  const head = ['date', 'rev', 'score', ...ids];
  const rows = runs.map((r) => [
    r.date,
    r.rev,
    String(r.score),
    ...ids.map((id) => String(r.parts.find((p) => p.id === id)?.score ?? '-')),
  ]);
  const w = head.map((_, i) => Math.max(head[i].length, ...rows.map((x) => x[i].length)));
  const line = (cells) => cells.map((c, i) => c.padEnd(w[i])).join('  ');
  console.log(`\nrubric v${RUBRIC_VERSION} — every column measured identically at every revision\n`);
  console.log(line(head));
  console.log(w.map((n) => '-'.repeat(n)).join('  '));
  for (const r of rows) console.log(line(r));
  const first = runs[0];
  const last = runs[runs.length - 1];
  if (runs.length > 1) {
    const d = last.score - first.score;
    console.log(`\n${first.date} → ${last.date}:  ${first.score} → ${last.score}  (${d >= 0 ? '+' : ''}${d})\n`);
  }
}

if (flag('--compare')) {
  compare(loadHistory());
} else if (flag('--backfill')) {
  /*
   * Samples HEAD's OWN first-parent ancestry, one commit per month, not the
   * release tags. The tags sit on `main` while this work happens 65 commits
   * down a feature branch, so a tag-based series silently compares two
   * different lineages — a module count can drop between "consecutive" points
   * because they are not consecutive at all. That is precisely the
   * comparing-different-things problem this file exists to end.
   */
  const weeks = Number(value('--weeks') ?? 26);
  /*
   * FULL ancestry, not --first-parent. The shadcn component library was built
   * on side branches and only joins this branch's first-parent line on
   * 2026-09-22, so a first-parent series hides the entire migration and plots
   * a single point. Every commit reachable from HEAD is a genuine prior state
   * of this lineage, which is what makes it a fair sample.
   */
  const log = git([
    'log', '--format=%H|%cs', `--since=${weeks} weeks ago`, 'HEAD',
  ]).split('\n').filter(Boolean);

  // One sample per ISO week. Monthly left four-month gaps across a period in
  // which the whole component library was rewritten, so the series showed a
  // flat line and then a cliff rather than the shape of the work.
  const isoWeek = (d) => {
    const t = new Date(`${d}T00:00:00Z`);
    const day = (t.getUTCDay() + 6) % 7;
    t.setUTCDate(t.getUTCDate() - day + 3);
    const first = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
    const week = 1 + Math.round(((t - first) / 86400000 - 3 + ((first.getUTCDay() + 6) % 7)) / 7);
    return `${t.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
  };
  const byWeek = new Map();
  for (const line of log) {
    const [sha, date] = line.split('|');
    // newest-first, so the FIRST seen in a week is that week's last commit
    if (!byWeek.has(isoWeek(date))) byWeek.set(isoWeek(date), sha);
  }
  const revs = [...byWeek.values()].reverse();
  const history = loadHistory();
  history.rubricVersion = RUBRIC_VERSION;
  history.runs = history.runs.filter((r) => r.rubricVersion === RUBRIC_VERSION && r.lineage === 'ancestry');
  for (const rev of revs) {
    const r = { ...runFor(rev), lineage: 'ancestry' };
    r.rev = r.sha;
    // A revision with no component library cannot be scored on component
    // health; including it would plot a meaningless zero.
    if (r.metrics.uiModules === 0) continue;
    history.runs = history.runs.filter((x) => !(x.sha === r.sha && x.rubricVersion === r.rubricVersion));
    history.runs.push(r);
    console.log(`  ${r.date}  ${r.sha.padEnd(10)} ${String(r.score).padStart(3)}/100`);
  }
  saveHistory(history);
  console.log(`\nRecorded ${history.runs.length} run(s) → ${path.relative(root, HISTORY)}`);
} else {
  const r = runFor(value('--rev'));
  if (flag('--json')) console.log(JSON.stringify(r, null, 2));
  else printRun(r);
  if (flag('--record')) {
    const history = loadHistory();
    history.rubricVersion = RUBRIC_VERSION;
    history.runs = history.runs.filter((x) => !(x.rev === r.rev && x.rubricVersion === r.rubricVersion));
    history.runs.push(r);
    saveHistory(history);
    console.log(`Recorded → ${path.relative(root, HISTORY)}`);
  }
}
