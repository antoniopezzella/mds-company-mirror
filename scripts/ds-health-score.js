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
 *
 * v3 — scores the three stated goals instead of only tidiness.
 *
 * v2's seven metrics put **40 of 100** on tests plus stories and **zero** on
 * anything about multi-brand, global readiness, or agent-readiness. It
 * answered "is this a tidy component library" well and could not answer "is
 * this a scalable global system with AI agents embedded" at all. Searching v2
 * for the things that actually block adoption returned nothing: expressions,
 * locale, Code Connect coverage, contract emission.
 *
 * So v3 keeps every v2 metric, reweights tests+stories 40 -> 24, and adds
 * seven metrics across three goals (tagged `goal`, with per-goal subtotals in
 * the output). Each new metric is computable from `git show` alone — no build,
 * no network — so the whole history stays backfillable, which is the property
 * that makes this instrument worth having.
 *
 * v2 and v3 numbers are NOT comparable. `--compare` filters by rubric version
 * for exactly this reason; re-record history to see a v3 trend.
 *
 * v4 — `prop_docs` now requires a JSDoc block immediately preceding an actual
 * prop, not merely present somewhere in the declaration.
 *
 * Bumped the same day v3 shipped, because v3's definition was wrong rather
 * than merely imprecise. It counted a docblock sitting in an empty interface
 * body, which react-docgen cannot turn into a Controls description — so the
 * metric could move a long way while the thing it names got no closer. An
 * agent working the backlog found this within hours by satisfying the metric
 * exactly as written: 44 -> 80, of which 14 modules were hollow.
 *
 * v3 and v4 are not comparable either. v3's recorded run is left in history
 * rather than migrated, which is the point of keeping raw metrics per run.
 */
export const RUBRIC_VERSION = 4;

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

  // ── v3: the three stated goals ──────────────────────────────────────────

  // DEV — can a consumer read the API, and hold a ref to it?
  //
  // `withPropDocs` requires a JSDoc block **immediately preceding an actual
  // prop declaration**, not merely present somewhere inside the Props block.
  //
  // v3 tested only for `/**` anywhere in the declaration, and that was wrong
  // in the way this repo keeps being wrong: it measured something adjacent.
  // An agent given the v3 metric and told "a JSDoc block inside the exported
  // *Props declaration is what makes Storybook Controls show a description"
  // did exactly that, and produced 14 modules shaped like this:
  //
  //     export interface SpinnerProps extends React.ComponentProps<"svg"> {
  //       /** Any standard SVG prop passes through... */
  //     }
  //
  // The comment is attached to NOTHING. react-docgen builds Controls
  // descriptions per prop, so an empty interface body cannot produce one — the
  // metric moved 44 -> 80 while the thing it names got no closer. The claim in
  // the v3 comment was the root cause: a docblock inside the declaration is
  // not sufficient, it has to document a prop.
  //
  // Still deliberately coarse in the other direction: ONE documented prop
  // counts the module. "Is every prop documented" would move for reasons
  // unrelated to effort — adding an undocumented prop to a documented
  // interface would score as a regression.
  let withPropDocs = 0;
  let withRef = 0;
  let logicalProps = 0;
  let physicalProps = 0;
  let reducedMotion = 0;
  for (const f of impl) {
    const src = read(rev, f);
    if (!src) continue;
    const propBlocks = [...src.matchAll(/export (?:interface|type) \w*Props\b[\s\S]*?\n(?:\}|\);)/g)].map((m) => m[0]);
    // A closing `*/`, then a prop name, then `:` / `?:` / `(`. That last part
    // is what distinguishes a documented prop from a docblock sitting in an
    // empty body.
    const DOCUMENTED_PROP = /\/\*\*[\s\S]*?\*\/\s*\n\s*(?:readonly\s+)?['"]?[a-zA-Z_$][\w$]*['"]?\??\s*[:?(]/;
    if (propBlocks.some((b) => DOCUMENTED_PROP.test(b))) withPropDocs += 1;
    if (/forwardRef/.test(src)) withRef += 1;
    // GLOBAL — RTL readiness. Logical properties flip with `dir`; physical
    // ones do not, so a right-to-left locale breaks the layout rather than
    // mirroring it.
    logicalProps += (src.match(/\b(?:ms|me|ps|pe)-[0-9]/g) ?? []).length;
    physicalProps += (src.match(/\b(?:ml|mr|pl|pr)-[0-9]/g) ?? []).length;
    if (/prefers-reduced-motion|motion-reduce/.test(src)) reducedMotion += 1;
  }

  // GLOBAL — does an expression scope reach the PUBLISHED stylesheet? The
  // mechanism exists in src/styles/_typography.scss and the package entry
  // imports a flat unscoped file, so `--typo-h1-font-family` resolves to a
  // different face in the app than in the package. dist-pkg/ is not committed,
  // so the committed package entry is the only thing measurable at a rev.
  const pkgCss = read(rev, 'src/styles.package.css') ?? '';
  // Strip CSS comments first. A bare regex over the file matched the scope
  // NAMED IN A COMMENT, which scopes nothing — found 2026-10-08 by
  // check-metric-selftests.js, whose unchanged-probe put `mds-dashboard` in a
  // comment and watched this metric jump 0 -> 100. Exactly the class of bug
  // the harness exists for, in the metric that is worth the most weight.
  const pkgCssCode = pkgCss.replace(/\/\*[\s\S]*?\*\//g, ' ');
  const expressionInPackage = /mds-dashboard|mds-marketing|data-typography-context/.test(pkgCssCode) ? 1 : 0;

  // AGENTIC — Code Connect coverage. Figma's own eval names coverage, not
  // component count, as what drives the measured token and time savings.
  const codeConnect = list(rev, 'src/figma').filter((f) => /\.figma\.tsx$/.test(f)).length;

  // AGENTIC — are machine-readable component contracts emitted at all?
  const sbMain = read(rev, '.storybook/main.ts') ?? '';
  const contractsEmitted = /componentsManifest\s*:\s*true/.test(sbMain) ? 1 : 0;

  // AGENTIC/GOVERNANCE — gates that prove they can fail.
  //
  // A gate is self-tested when either it carries its own self-test (the axe
  // gate does) or its npm script appears in the self-test harness. Resolving
  // npm script -> file via package.json keeps this honest: naming a script
  // that does not exist would not count.
  const selfTestHarness = read(rev, 'scripts/check-gate-selftests.js') ?? '';
  const pkgJson = read(rev, 'package.json') ?? '{}';
  let npmScripts = {};
  try {
    npmScripts = JSON.parse(pkgJson).scripts ?? {};
  } catch {
    npmScripts = {};
  }
  const harnessScripts = new Set([...selfTestHarness.matchAll(/script:\s*'([^']+)'/g)].map((m) => m[1]));
  const coveredFiles = new Set();
  for (const s of harnessScripts) {
    const cmd = npmScripts[s] ?? '';
    const file = /scripts\/(check-[a-z0-9-]+\.js)/.exec(cmd)?.[1];
    if (file) coveredFiles.add(file);
  }
  // The harnesses themselves are not gates, so they are out of both halves.
  const HARNESSES = new Set(['check-gate-selftests.js', 'check-a11y-gate.js']);
  const allGates = list(rev, 'scripts')
    .map((f) => path.basename(f))
    .filter((f) => /^check-.*\.js$/.test(f) && !HARNESSES.has(f));
  for (const g of allGates) {
    const src = read(rev, `scripts/${g}`);
    if (src && /self-test|GATE NOT WORKING/.test(src)) coveredFiles.add(g);
  }
  const gatesSelfTested = allGates.filter((g) => coveredFiles.has(g)).length;
  // The axe gate is not a scripts/check-*.js file but is self-tested by
  // check-a11y-gate.js, so it counts in both halves.
  const axeSelfTested = /check-a11y-gate/.test(pkgJson) ? 1 : 0;

  return {
    uiModules: impl.length,
    withTest,
    withStory,
    hexLiterals: hex,
    hexExemptFiles: impl.filter((f) => /roles-allow-hex-file/.test(read(rev, f) ?? '')).length,
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
    // v3
    withPropDocs,
    withRef,
    logicalProps,
    physicalProps,
    reducedMotion,
    expressionInPackage,
    codeConnect,
    contractsEmitted,
    gatesSelfTested: gatesSelfTested + axeSelfTested,
    gatesTotal: allGates.length + 1,
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
    goal: 'dev',
    weight: 14,
    score: (m) => pct(m.withTest, m.uiModules),
    format: (m) => `${m.withTest}/${m.uiModules}`,
  },
  {
    id: 'story_coverage',
    label: 'Modules with a story',
    goal: 'dev',
    weight: 10,
    score: (m) => pct(m.withStory, m.uiModules),
    format: (m) => `${m.withStory}/${m.uiModules}`,
  },
  {
    id: 'prop_docs',
    label: 'Modules with documented props',
    goal: 'dev',
    weight: 8,
    // What makes Storybook Controls usable, and what a consumer reads instead
    // of the source. Reading the source works inside this building and
    // nowhere else.
    score: (m) => pct(m.withPropDocs, m.uiModules),
    format: (m) => `${m.withPropDocs}/${m.uiModules}`,
  },
  {
    id: 'ref_paths',
    label: 'Modules that forward a ref',
    goal: 'dev',
    weight: 5,
    // No ref path means a consumer cannot focus it, measure it, or hand it to
    // a positioning library — and cannot work around a gap without a fork.
    score: (m) => pct(m.withRef, m.uiModules),
    format: (m) => `${m.withRef}/${m.uiModules}`,
  },
  {
    id: 'a11y_enforcement',
    label: 'Accessibility gate',
    goal: 'dev',
    weight: 10,
    // Advisory scores well below half: a gate that reports and never fails is
    // most of the work for none of the protection.
    score: (m) => ({ error: 100, todo: 35, configured: 20, none: 0 })[m.a11yGate] ?? 0,
    format: (m) => m.a11yGate,
  },
  {
    id: 'gate_reach',
    label: 'Gates that walk subdirectories',
    goal: 'gov',
    weight: 5,
    score: (m) => pct(m.gatesRecursive, EXPECTED_GATES),
    format: (m) => `${m.gatesRecursive}/${EXPECTED_GATES}`,
  },
  {
    id: 'gate_selftests',
    label: 'Gates that prove they can fail',
    goal: 'gov',
    weight: 7,
    // The highest-value metric in this rubric, because it is the one that
    // makes every other green result mean something. Every gate in this repo
    // that was ever wrong measured something ADJACENT and stayed green: the
    // axe gate ran zero checks across every story; the role gate parsed 6 of
    // 55 roles; the registry gate checked index entries rather than
    // dependency edges.
    score: (m) => pct(m.gatesSelfTested, m.gatesTotal),
    format: (m) => `${m.gatesSelfTested}/${m.gatesTotal}`,
  },
  {
    id: 'colour_discipline',
    label: 'Hardcoded hex in components',
    goal: 'gov',
    weight: 8,
    // 0 literals is 100; one per module is 0. Density, not raw count, so the
    // score does not fall simply because the library grew. A revision with no
    // components scores 0, not 100 — "no hex because no code" is not
    // discipline, and treating it as such made the pre-library history look
    // perfect on this axis.
    score: (m) => (m.uiModules === 0 ? 0 : clamp(100 - pct(m.hexLiterals, m.uiModules))),
    // v3 surfaces the exemption count. v2 printed a bare "0 across 118",
    // which read as "no literals ship" when one file carries a
    // `roles-allow-hex-file` marker and 14 literals inside it. The score
    // still excludes exempted files on purpose — scoring a documented,
    // dispositioned decision as a failure makes the metric an argument
    // against following the repo's own governance process — but the reader
    // now sees that an exemption is doing work.
    format: (m) =>
      `${m.hexLiterals} across ${m.uiModules}` +
      (m.hexExemptFiles ? ` (+${m.hexExemptFiles} file exempt)` : ''),
  },
  {
    id: 'token_doc_accuracy',
    label: 'Documented token counts match reality',
    goal: 'gov',
    weight: 4,
    // Every token of drift costs 4 points; 25 off is a zero.
    score: (m) => clamp(100 - m.tokenDocDrift * 4),
    format: (m) => `${m.tokenDocDrift} off`,
  },
  {
    id: 'doc_sprawl',
    label: 'Loose .md files at the repo root',
    goal: 'gov',
    weight: 3,
    // 6 are allowlisted; each extra costs 12.
    score: (m) => clamp(100 - Math.max(0, m.rootDocs - 6) * 12),
    format: (m) => `${m.rootDocs}`,
  },

  // ── GLOBAL — one core, several expressions, in any locale ───────────────
  {
    id: 'expression_reach',
    label: 'Expression scope reaches the package',
    goal: 'global',
    weight: 10,
    // The strategic blocker, and v2 could not see it at all. The typography
    // expression mechanism exists in src/styles but the package entry imports
    // a flat unscoped file, so the same CSS variable resolves to a different
    // face in the app than in the published package. Binary on purpose: a
    // partial expression mechanism is not a partial score, it is a bug.
    score: (m) => (m.expressionInPackage ? 100 : 0),
    format: (m) => (m.expressionInPackage ? 'yes' : 'no — package is unscoped'),
  },
  {
    id: 'rtl_readiness',
    label: 'Logical spacing properties (RTL)',
    goal: 'global',
    weight: 4,
    // Logical properties (ms-/me-/ps-/pe-) mirror with `dir`; physical ones
    // (ml-/mr-/pl-/pr-) do not, so an RTL locale breaks the layout instead of
    // flipping it. Ratio, not count, so it does not move as the library grows.
    score: (m) => pct(m.logicalProps, m.logicalProps + m.physicalProps),
    format: (m) => `${m.logicalProps} logical / ${m.logicalProps + m.physicalProps} directional`,
  },

  // ── AGENTIC — can a coding agent use this without guessing? ─────────────
  {
    id: 'code_connect_coverage',
    label: 'Components mapped to Figma (Code Connect)',
    goal: 'agentic',
    weight: 8,
    // Figma's own eval attributes its measured token and time savings to
    // COVERAGE rather than to having Code Connect at all, which is why this
    // is a ratio and not a yes/no.
    score: (m) => pct(m.codeConnect, m.uiModules),
    format: (m) => `${m.codeConnect}/${m.uiModules}`,
  },
  {
    id: 'contracts_emitted',
    label: 'Machine-readable component contracts',
    goal: 'agentic',
    weight: 4,
    // `features: { componentsManifest: true }` emits manifests/components.json
    // — props, variants and types an agent can read instead of inferring.
    // Available off the shelf from Storybook 10.1; this repo is on 10.6.
    score: (m) => (m.contractsEmitted ? 100 : 0),
    format: (m) => (m.contractsEmitted ? 'emitted' : 'not emitted'),
  },
];

function scoreOf(m) {
  const parts = RUBRIC.map((r) => {
    const raw = clamp(r.score(m));
    return { id: r.id, label: r.label, goal: r.goal, weight: r.weight, score: Math.round(raw), detail: r.format(m) };
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

/** Goal labels, in reading order. v2 had no grouping — the whole point of v3. */
const GOALS = {
  dev: 'Development readiness',
  gov: 'Governance & verification',
  global: 'Scalable global system',
  agentic: 'AI-agent readiness',
};

function printRun(r) {
  console.log(`\nDesign-system health — rubric v${r.rubricVersion}`);
  console.log(`${r.rev}  ${r.sha}  ${r.date}\n`);
  console.log(`  OVERALL  ${r.score}/100\n`);

  for (const [key, title] of Object.entries(GOALS)) {
    const parts = r.parts.filter((p) => p.goal === key);
    if (!parts.length) continue;
    // Weighted subtotal within the goal, plus what the goal is worth overall,
    // so a reader can see both "how are we doing here" and "how much does
    // this axis move the headline number".
    const w = parts.reduce((s, p) => s + p.weight, 0);
    const sub = Math.round(parts.reduce((s, p) => s + p.score * p.weight, 0) / w);
    console.log(`  ${title}  —  ${sub}/100   (${w}% of the score)`);
    for (const p of parts) {
      const bar = '█'.repeat(Math.round(p.score / 5)).padEnd(20, '·');
      console.log(
        `    ${String(p.score).padStart(3)}  ${bar}  ${p.label.padEnd(40)} ${p.detail}  (w${p.weight})`
      );
    }
    console.log('');
  }
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
