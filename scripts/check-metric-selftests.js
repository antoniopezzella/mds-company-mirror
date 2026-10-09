#!/usr/bin/env node
/**
 * Self-tests for the ds:score metrics.
 *
 * WHY THIS EXISTS
 * ---------------
 * `check-gate-selftests.js` proves the GATES can fail. Nothing proved the same
 * about the 14 metrics in `ds-health-score.js`, and on 2026-10-08 two of them
 * failed in the same way within hours of each other:
 *
 *   prop_docs          tested for `/**` anywhere inside a Props declaration.
 *                      An agent satisfied it with 14 docblocks sitting in EMPTY
 *                      interface bodies — documenting nothing react-docgen can
 *                      surface. Metric 44 -> 80; the thing it names, unmoved.
 *
 *   contracts_emitted  read a config flag. Setting the flag emitted a manifest
 *                      in which 72 of 77 ui components had NO props, because
 *                      react-docgen could not resolve `@/`. Metric 0 -> 100;
 *                      the thing it names, barely moved.
 *
 * Both are the repo's signature failure — measuring something *adjacent* — and
 * both were caught by hand. A metric that can be satisfied without moving what
 * it names will be satisfied that way, so each one needs a probe.
 *
 * WHAT MAKES THIS DIFFERENT FROM THE GATE HARNESS
 * -----------------------------------------------
 * A gate is binary: it fires or it does not, so one violating probe is enough.
 * A metric is a number, and a number can move for the wrong reason. So every
 * metric is probed in BOTH directions:
 *
 *   up    a change that SHOULD move it must move it
 *   flat  a change that should NOT move it must leave it alone
 *
 * The `flat` probe is the one that earns this file. Without it, `prop_docs` v3
 * would pass its own self-test: the hollow docblock moves the number, which
 * looks like a working metric.
 *
 * Usage:  node scripts/check-metric-selftests.js [--only <metric>] [--verbose]
 * Exit:   0 every probed metric discriminated correctly
 *         1 at least one metric did not (that metric is not measuring what it says)
 *         2 harness error, or a probe could not be cleaned up
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const verbose = argv.includes('--verbose');
const onlyIdx = argv.indexOf('--only');
const only = onlyIdx !== -1 ? argv[onlyIdx + 1] : null;

const UI = 'src/components/ui';

/**
 * Read a metric's RAW measurement, not its 0-100 score.
 *
 * Scores are unusable for this. Most metrics are ratios over ~118 modules, so
 * a one-module probe moves the score by less than a point and rounds away:
 * `ref_paths` went 41/118 -> 42/119, which is 34.7 -> 35.3, and BOTH round to
 * 35. The first version of this harness compared scores and reported
 * `ref_paths` as blind to its own subject when the numerator had moved
 * correctly. Raw values are exact.
 *
 * `rawFor` names the field in `metrics` that the metric is built from. Where a
 * metric is a ratio, the field is the NUMERATOR only — adding a probe module
 * also moves the denominator, which is a real effect but not the one under
 * test.
 */
const RAW_FIELD = {
  prop_docs: 'withPropDocs',
  ref_paths: 'withRef',
  test_coverage: 'withTest',
  story_coverage: 'withStory',
  colour_discipline: 'hexLiterals',
  rtl_readiness: 'logicalProps',
  code_connect_coverage: 'codeConnect',
  typo_scope_free: 'typoScopeRefs',
  doc_sprawl: 'rootDocs',
  contracts_emitted: 'contractsEmitted',
  contract_coverage: 'contractsWritten',
  expression_reach: 'expressionInPackage',
  token_doc_accuracy: 'tokenDocDrift',
  gate_selftests: 'gatesSelfTested',
  a11y_enforcement: 'a11yGate',
};

function measure(metricId) {
  const out = execFileSync('node', ['scripts/ds-health-score.js', '--json'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  const run = JSON.parse(out);
  const part = run.parts.find((p) => p.id === metricId);
  if (!part) throw new Error(`metric "${metricId}" is not in the rubric`);
  const field = RAW_FIELD[metricId];
  if (!field) throw new Error(`no RAW_FIELD mapping for "${metricId}" — add one`);
  if (!(field in run.metrics)) throw new Error(`metrics.${field} is missing — the rubric changed`);
  return { raw: run.metrics[field], score: part.score };
}

/** Did the raw value move in the stated direction? Handles the string case. */
const moved = (before, after, dir) => {
  if (typeof before === 'string') return before !== after;
  return dir === 'up' ? after > before : after < before;
};

// ── probe primitives ───────────────────────────────────────────────────────
// `create` writes new files and deletes them. `patch` backs the file up
// verbatim and restores from the backup — never from a reverse string
// replacement, which silently fails when the text moved.

const created = new Set();
const backups = new Map();

const create = (rel, body) => {
  const abs = path.join(root, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, body);
  created.add(abs);
};

const prepend = (rel, body) => {
  const abs = path.join(root, rel);
  const before = fs.readFileSync(abs, 'utf8');
  if (!backups.has(abs)) backups.set(abs, before);
  fs.writeFileSync(abs, body + before);
};

const patch = (rel, find, replace) => {
  const abs = path.join(root, rel);
  const before = fs.readFileSync(abs, 'utf8');
  if (!backups.has(abs)) backups.set(abs, before);
  if (!before.includes(find)) throw new Error(`probe anchor not found in ${rel}: ${find.slice(0, 48)}`);
  fs.writeFileSync(abs, before.replace(find, replace));
};

function restore() {
  let failed = [];
  for (const abs of created) {
    try {
      if (fs.existsSync(abs)) fs.unlinkSync(abs);
    } catch {
      failed.push(path.relative(root, abs));
    }
  }
  for (const [abs, body] of backups) {
    try {
      fs.writeFileSync(abs, body);
    } catch {
      failed.push(path.relative(root, abs));
    }
  }
  created.clear();
  backups.clear();
  return failed;
}

process.on('SIGINT', () => { restore(); process.exit(2); });
process.on('SIGTERM', () => { restore(); process.exit(2); });

// ── the probe table ────────────────────────────────────────────────────────
//
// `dir`  the direction the RAW value moves, which is NOT always the direction
//        the score moves. `hexLiterals`, `rootDocs` and `tokenDocDrift` all
//        rise as the score falls — they count bad things. Conflating the two
//        made this harness report three healthy metrics as broken.
// `up`   the probe that must move the raw value in `dir`
// `flat` the probe that must leave it EXACTLY unchanged. Omit only when no
//        plausible wrong-reason satisfaction exists, and say why in `flatWhy`.

const METRICS = [
  {
    id: 'prop_docs',
    dir: 'up',
    up: () => create(`${UI}/__mprobe_props.tsx`, 'export interface MProbeProps {\n  /** What this does. */\n  tone?: string;\n}\nexport const MProbe = () => <div />;\n'),
    // The exact shape that fooled v3.
    flat: () => create(`${UI}/__mprobe_props.tsx`, 'export interface MProbeProps extends React.ComponentProps<"div"> {\n  /** A docblock attached to nothing. */\n}\nexport const MProbe = () => <div />;\n'),
    flatWhy: 'a docblock in an empty interface body documents no prop',
  },
  {
    id: 'ref_paths',
    dir: 'up',
    up: () => create(`${UI}/__mprobe_ref.tsx`, 'import * as React from "react";\nexport const MProbe = React.forwardRef<HTMLDivElement>((p, ref) => <div ref={ref} {...p} />);\n'),
    flat: () => create(`${UI}/__mprobe_ref.tsx`, 'export const MProbe = () => <div />;\n'),
    flatWhy: 'a module with no ref path must not count toward ref coverage',
  },
  {
    id: 'test_coverage',
    dir: 'up',
    up: () => {
      create(`${UI}/__mprobe_t.tsx`, 'export const MProbeT = () => <div />;\n');
      create(`${UI}/__mprobe_t.test.tsx`, 'import { it, expect } from "vitest";\nit("x", () => expect(1).toBe(1));\n');
    },
    flat: () => create(`${UI}/__mprobe_t.tsx`, 'export const MProbeT = () => <div />;\n'),
    flatWhy: 'a module with no dedicated test must not count as tested',
  },
  {
    id: 'story_coverage',
    dir: 'up',
    up: () => {
      create(`${UI}/__mprobe_s.tsx`, 'export const MProbeS = () => <div />;\n');
      create(`${UI}/__mprobe_s.stories.tsx`, 'export default { title: "_probe/MProbeS" };\nexport const Default = {};\n');
    },
    flat: () => create(`${UI}/__mprobe_s.tsx`, 'export const MProbeS = () => <div />;\n'),
    flatWhy: 'a module with no story must not count as having one',
  },
  {
    id: 'colour_discipline',
    dir: 'up',
    up: () => create(`${UI}/__mprobe_hex.tsx`, 'export const MProbe = () => <div style={{ color: "#ff0000" }} />;\n'),
    // Two things that must NOT move it: hex in a comment, and an exempted file.
    flat: () => create(`${UI}/__mprobe_hex.tsx`, '// a note mentioning #ff0000 for contrast, not a colour\n/* roles-allow-hex-file */\nexport const MProbe = () => <div style={{ color: "#00ff00" }} />;\n'),
    flatWhy: 'hex in a comment, and hex in a roles-allow-hex-file file, are both deliberate',
  },
  {
    id: 'typo_scope_free',
    dir: 'up',
    // Raw field counts BAD things (refs), so it rises as the score falls.
    up: () => create(`${UI}/__mprobe_typo.tsx`, 'export const MProbe = () => <div className="font-[family-name:var(--typo-h1-font-family,_Noto_Sans,_sans-serif)]" />;\n'),
    // A comment mentioning the variable is a migration note, not a use.
    flat: () => create(`${UI}/__mprobe_typo.tsx`, '// migration note: this used to read --typo-h1-font-family\nexport const MProbe = () => <div />;\n'),
    flatWhy: 'a comment mentioning --typo-* is a migration note, not a dependency',
  },
  {
    id: 'rtl_readiness',
    dir: 'up',
    up: () => create(`${UI}/__mprobe_rtl.tsx`, 'export const MProbe = () => <div className="ms-4 me-4 ps-2 pe-2" />;\n'),
    flat: () => create(`${UI}/__mprobe_rtl.tsx`, 'export const MProbe = () => <div />;\n'),
    flatWhy: 'a module using no directional spacing must not shift the logical ratio',
  },
  {
    id: 'code_connect_coverage',
    dir: 'up',
    // The numerator is DISTINCT MAPPABLE components a .figma.tsx points at. The
    // up probe maps `hover-card` (mappable, currently unmapped) → +1. The flat
    // probe maps `stack` (CODE_ONLY: a layout primitive with no Figma node) —
    // a real .figma.tsx, so the old extension-only probe would have been
    // fooled, but it must NOT count, because coverage is measured against the
    // mappable set. That is the whole point of the denominator fix.
    //
    // NOTE: the up probe's component must be in the mappable set AND not yet
    // mapped. It was `combobox` until 2026-10-09, when combobox got a real
    // mapping and the probe stopped moving the count — repoint it to any
    // still-unmapped mappable component if `hover-card` ever gets mapped.
    up: () =>
      create('src/figma/__MProbe.figma.tsx', "import { HoverCard } from '../components/ui/hover-card';\nexport { HoverCard };\n"),
    flat: () =>
      create('src/figma/__MProbe.figma.tsx', "import { Stack } from '../components/ui/stack';\nexport { Stack };\n"),
    flatWhy: 'a mapping to a code-only component (stack) must not raise coverage over the mappable set',
  },
  {
    id: 'doc_sprawl',
    dir: 'up',
    up: () => create('__mprobe-sprawl.md', '# probe\n'),
    flat: () => create('docs/__mprobe-sprawl.md', '# probe\n'),
    flatWhy: 'a doc placed correctly under docs/ is not sprawl',
  },
  {
    id: 'contracts_emitted',
    dir: 'down',
    up: () => patch('.storybook/main.ts', 'componentsManifest: true', 'componentsManifest: false'),
    flat: () => patch('.storybook/main.ts', 'staticDirs:', 'staticDirs /* probe comment */:'),
    flatWhy: 'an unrelated edit to the same file must not move a config-flag metric',
  },
  {
    id: 'contract_coverage',
    dir: 'up',
    // The metric counts `purpose:` fields INSIDE the CONTRACTS block. The up
    // probe adds a real contract entry (one more 4-space `purpose:`); the flat
    // probe adds a comment that merely mentions the word, which must not count
    // — the failure mode here is a substring match, exactly how a sibling block
    // once shipped four wrong numbers off a currency substring.
    up: () =>
      patch(
        'src/components/ui/taxonomy.ts',
        'export const CONTRACTS: Record<string, ComponentContract> = {',
        'export const CONTRACTS: Record<string, ComponentContract> = {\n  __mprobe: {\n    purpose: "probe contract, reverted immediately",\n    whenToUse: ["probe"],\n  },'
      ),
    flat: () =>
      patch(
        'src/components/ui/taxonomy.ts',
        'export const CONTRACTS: Record<string, ComponentContract> = {',
        'export const CONTRACTS: Record<string, ComponentContract> = {\n    // purpose: this is a comment, not a contract field'
      ),
    flatWhy: 'a comment mentioning "purpose:" must not count as a written contract',
  },
  {
    id: 'expression_reach',
    dir: 'down',
    // The metric now follows a CHAIN: styles.package.css must import
    // component-utilities.css, and that file must define both expressions. So
    // the down-probe breaks one link, and the flat-probe breaks neither while
    // looking like it does.
    //
    // Direction is 'down' because the chain is currently intact: it can only
    // be broken, not improved.
    // Breaks the IMPORT link, which is a single unambiguous edit. A first
    // version renamed `@utility text-productive-h1`, which did nothing: the
    // metric matches the `text-productive-` PREFIX, and h2-h4 still matched.
    // A probe has to break the thing the metric actually tests.
    up: () =>
      patch(
        'src/styles.package.css',
        "@import './styles/component-utilities.css';",
        "/* probe: import removed */"
      ),
    // Mentions both expressions, but only inside a comment, and imports
    // nothing. Previously this exact shape scored 100.
    flat: () =>
      prepend(
        'src/styles.package.css',
        '/* a comment naming text-serif-h1 and text-h1 and component-utilities.css */\n'
      ),
    flatWhy: 'expressions named only in a comment, with no import, reach no consumer',
  },
  {
    id: 'token_doc_accuracy',
    dir: 'up',
    up: () => patch('.claude/rules/tokens.md', '**Count:** 74 semantic tokens', '**Count:** 999 semantic tokens'),
    flatWhy: 'no plausible wrong-reason satisfaction — it is a numeric diff against source',
  },
  {
    id: 'gate_selftests',
    dir: 'up',
    // Points a new entry at a gate that is real but not yet covered.
    up: () =>
      patch(
        'scripts/check-gate-selftests.js',
        'const GATES = [',
        "const GATES = [\n  { name: '__mprobe', script: 'deprecations:check', probe: 'src/components/ui/__mprobe_gate.tsx', content: 'export {};\\n' },"
      ),
    flatWhy: 'it counts gate files against a self-test table; a wrong-reason pass would be a bug in that resolution, covered by check-gate-selftests itself',
  },
  {
    id: 'a11y_enforcement',
    dir: 'change',
    up: () => patch('.storybook/preview.tsx', "test: 'error'", "test: 'todo'"),
    flatWhy: 'it reads one enum out of preview.tsx; the KNOWN weakness is that it cannot see dark-mode or reduced-motion failures at all, which a probe cannot express — see GOV-3',
  },
  {
    id: 'gate_reach',
    skip: 'Probing this means making a gate stop walking subdirectories, i.e. breaking a gate to test a metric. The metric is also already at 4/4 with a FIXED denominator, so it can only fall. Left unprobed deliberately rather than faked.',
  },
];

if (only && !METRICS.some((m) => m.id === only)) {
  console.error(`check-metric-selftests: no metric named "${only}".`);
  console.error(`Available: ${METRICS.map((m) => m.id).join(', ')}`);
  process.exit(2);
}

const selected = (only ? METRICS.filter((m) => m.id === only) : METRICS).filter((m) => !m.skip);
const skipped = (only ? [] : METRICS).filter((m) => m.skip);

const results = [];
let harnessError = null;

try {
  for (const m of selected) {
    const base = measure(m.id);
    const row = { id: m.id, base: base.raw, baseScore: base.score, dir: m.dir };

    // ── up probe
    try {
      m.up();
      const after = measure(m.id);
      row.up = after.raw;
      row.upScore = after.score;
    } catch (err) {
      row.upErr = err.message;
    } finally {
      const f = restore();
      if (f.length) throw new Error(`could not restore after ${m.id} up-probe: ${f.join(', ')}`);
    }
    row.upOk = row.upErr ? false : moved(base.raw, row.up, m.dir);

    // ── flat probe
    if (m.flat) {
      try {
        m.flat();
        row.flatScore = measure(m.id).raw;
      } catch (err) {
        row.flatErr = err.message;
      } finally {
        const f = restore();
        if (f.length) throw new Error(`could not restore after ${m.id} flat-probe: ${f.join(', ')}`);
      }
      row.flatOk = row.flatErr ? false : row.flatScore === base.raw;
    } else {
      row.flatOk = null;
      row.flatWhy = m.flatWhy;
    }

    results.push(row);
    if (verbose) console.log(`  ${m.id}: raw base=${base.raw} up=${row.up ?? row.upErr} flat=${row.flatScore ?? '-'} (score ${base.score})`);
  }
} catch (err) {
  harnessError = err.message;
} finally {
  const f = restore();
  if (f.length) {
    console.error(`check-metric-selftests: COULD NOT RESTORE: ${f.join(', ')}`);
    console.error('Run `git status` and revert by hand before committing.');
    process.exit(2);
  }
}

if (harnessError) {
  console.error(`check-metric-selftests: harness error — ${harnessError}`);
  process.exit(2);
}

// ── report ─────────────────────────────────────────────────────────────────
console.log('\nMetric self-tests — does each metric move for the right reason?');
console.log('Raw measurements, not scores: a one-module probe rounds away in a 118-module ratio.\n');
const pad = Math.max(...results.map((r) => r.id.length));
for (const r of results) {
  const ok = r.upOk && r.flatOk !== false;
  const upCell = r.upErr ? 'probe failed' : `${r.base} -> ${r.up}`;
  const flatCell = r.flatOk === null ? 'n/a' : r.flatErr ? 'probe failed' : `${r.flatScore}`;
  console.log(
    `  ${ok ? '✓' : '✗'} ${r.id.padEnd(pad)}  ${r.dir === 'up' ? 'raw rises' : r.dir === 'down' ? 'raw falls' : 'raw changes'}: ${upCell.padEnd(14)} unchanged-probe: ${flatCell}`
  );
  if (!r.upOk) console.log(`      ${r.upErr ?? `did NOT ${r.dir === 'up' ? 'rise' : r.dir === 'down' ? 'fall' : 'change'} — the metric cannot see its own subject`}`);
  if (r.flatOk === false) console.log(`      ${r.flatErr ?? `moved to ${r.flatScore} on a change that should not count: ${r.flatWhy ?? ''}`}`);
}

if (skipped.length) {
  console.log('\n  not probed, deliberately:');
  for (const m of skipped) console.log(`    ${m.id} — ${m.skip}`);
}

const unprobedFlat = results.filter((r) => r.flatOk === null);
if (unprobedFlat.length) {
  console.log('\n  no unchanged-probe (stated reason):');
  for (const r of unprobedFlat) console.log(`    ${r.id} — ${r.flatWhy}`);
}

const broken = results.filter((r) => !r.upOk || r.flatOk === false);
if (broken.length === 0) {
  console.log(`\n✓ ${results.length} metric(s) discriminate correctly.`);
  process.exit(0);
}
console.error(`\n✗ ${broken.length} of ${results.length} metric(s) do not measure what they claim.`);
console.error('  Fix the metric in scripts/ds-health-score.js, not this harness.');
process.exit(1);
