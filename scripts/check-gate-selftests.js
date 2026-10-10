#!/usr/bin/env node
/**
 * Self-tests for the governance gates.
 *
 * WHY THIS EXISTS
 * ---------------
 * This repo has 15 gates. Every one that has ever been wrong was wrong the
 * same way: it measured something *adjacent* to what it claimed to measure,
 * and stayed green while doing it.
 *
 *   - the a11y gate ran ZERO checks while reporting green on every story
 *   - the role gate parsed 6 of 55 roles
 *   - the registry gate checked index entries, not dependency edges
 *   - a block shipped four wrong numbers because its story matched a
 *     currency *substring*
 *   - a published release had an index.d.ts that did not compile, with all
 *     eight gates green
 *
 * A green gate is indistinguishable from a disabled gate unless something
 * asserts otherwise. `scripts/check-a11y-gate.js` was the only gate in the
 * repo that asserted it — it writes a deliberate violation, runs the real
 * suite, and FAILS if the suite passes. This file generalises that to the
 * static gates.
 *
 * HOW IT WORKS
 * ------------
 * For each gate: write a probe file containing one violation that gate must
 * catch, run the real npm script, and require that it
 *
 *   1. exits non-zero, AND
 *   2. names the probe file in its output.
 *
 * Condition 2 is the whole point. Matching only "it failed" makes every
 * failure mode look like a healthy gate: a syntax error in the probe, a
 * missing dependency, a crashed script, an unrelated pre-existing violation
 * in the repo. All of those print "the gate caught it" while the gate itself
 * could be dead — which is precisely the ambiguity this file exists to
 * remove, reproduced one level up. check-a11y-gate.js learned this the hard
 * way; it now greps for axe's `button-name` rule rather than /\d+ failed/.
 *
 * Probes are generated and deleted rather than committed, because a
 * permanently-violating file would make `npm run governance:ci` permanently
 * red. They are written under paths each gate already scans — a probe
 * outside the scan root would simply never be read, and the gate would
 * "pass" for the wrong reason.
 *
 * Usage:  node scripts/check-gate-selftests.js [--only <gate>] [--verbose]
 * Exit:   0 every gate caught its violation
 *         1 at least one gate did NOT catch it (that gate is not working)
 *         2 harness error (probe could not be written/removed, bad --only)
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const argv = process.argv.slice(2);
const verbose = argv.includes('--verbose');
const onlyIdx = argv.indexOf('--only');
const only = onlyIdx !== -1 ? argv[onlyIdx + 1] : null;

/**
 * One entry per gate.
 *
 *   script   the npm script a human/CI actually runs — not the bare node
 *            command, so a broken `--strict` flag in package.json is caught
 *            too. check-composition and check-prop-vocab only exit non-zero
 *            in strict mode, which is why those point at the :strict scripts.
 *   probe    path (repo-relative) INSIDE that gate's scan root.
 *   content  the violating file. One violation per probe, so a failure is
 *            attributable to one rule rather than to "something in here".
 *   expect   OPTIONAL. The string the gate's output must contain, beyond
 *            exiting non-zero. Defaults to the probe's basename (WITH
 *            extension) — right for gates that print a file path/line. Set
 *            this explicitly when the gate reports by a different name than
 *            its own filename — e.g. check-registry.js prints component
 *            NAMES with the extension stripped (`• my-component`, not
 *            `my-component.tsx`), so the default basename would never
 *            appear even when the gate is working correctly.
 */
const GATES = [
  {
    name: 'roles',
    script: 'roles:check:strict',
    probe: 'src/components/ui/__gate_probe_roles.tsx',
    // Direct `tokens.*` reference — the hard failure this gate exists for.
    // NOT a hex literal: those are deliberately advisory here, so a probe
    // using one would pass and look like a dead gate.
    content: `import { tokens } from '../../tokens';\nexport const GateProbe = () => <div style={{ color: tokens.blue1000 }} />;\n`,
  },
  {
    name: 'roles-hex',
    script: 'roles:check:strict',
    probe: 'src/components/ui/__gate_probe_roles_hex.tsx',
    // A separate rule inside the same gate, so it gets its own probe: hex is
    // a hard failure in src/components/ui/ SOURCE and advisory everywhere
    // else. The path matters more than the content here — the same literal in
    // a `.stories.tsx` or under src/components/[A-Z]* must NOT fail, and a
    // probe in the wrong place would quietly certify nothing.
    content: `export const GateProbe = () => <div style={{ color: '#ff0000' }} />;\n`,
  },
  {
    name: 'roles-palette',
    script: 'roles:check:strict',
    probe: 'src/components/ui/__gate_probe_roles_palette.tsx',
    // Third rule in the role gate: a Tailwind DEFAULT-palette class
    // (bg-red-500) is a hard failure in src/components/ui/ SOURCE — it renders
    // Tailwind's colour, not Marsh's, and bypasses the role system. Advisory in
    // stories/tests and legacy, so again the PATH is the real assertion.
    content: `export const GateProbe = () => <div className="bg-red-500" />;\n`,
  },
  {
    name: 'composition',
    script: 'composition:check:strict',
    probe: 'src/components/ui/__gate_probe_composition.tsx',
    // p-[13px] is an arbitrary value; gap-7 (28px) is off the spacing scale.
    content: `export const GateProbe = () => <div className="p-[13px] gap-7" />;\n`,
  },
  {
    name: 'radius',
    script: 'radius:check',
    probe: 'src/components/ui/__gate_probe_radius.tsx',
    // rounded-3xl is off the sanctioned four-step scale; rounded-[2px] is
    // an arbitrary radius.
    content: `export const GateProbe = () => <div className="rounded-3xl rounded-[2px]" />;\n`,
  },
  {
    name: 'zindex',
    script: 'zindex:check',
    probe: 'src/components/ui/__gate_probe_zindex.tsx',
    // 999 is on no layer of the stacking scale in ui/z-index.ts.
    content: `export const GateProbe = () => <div className="z-[999]" style={{ zIndex: 999 }} />;\n`,
  },
  {
    name: 'props',
    script: 'props:check:strict',
    probe: 'src/components/ui/__gate_probe_props.tsx',
    // A legacy size spelling, in a file that imports from components/ui —
    // which is the condition this gate scopes itself to.
    //
    // It must be a value in SIZE_ALIASES/TONE_ALIASES (prop-compat.ts):
    // small|medium|large|xlarge|Small|Medium|Large. This probe first used
    // `size="default"`, which is NOT tracked, so the gate correctly exited 0
    // and the harness reported it broken. The harness was right to refuse to
    // certify it — but the defect was the probe, not the gate. If you change
    // this value, check it against prop-compat.ts first.
    content: `import { Button } from './button';\nexport const GateProbe = () => <Button size="small">x</Button>;\n`,
  },
  {
    name: 'props-declaration',
    script: 'props:check:strict',
    probe: 'src/components/ui/__gate_probe_props_decl.tsx',
    // The declaration half of the SAME gate/script as `props` above, added
    // because the usage probe only proves the gate reads CALL SITES. It
    // would stay green forever against a component whose Props interface
    // itself declares an off-vocabulary size value that nobody ever calls
    // with — which is exactly how attachment.tsx (`'default' | 'sm' | 'xs'`)
    // and toggle.tsx (`'default' | 'sm' | 'lg'`) shipped an eighth size
    // vocabulary while this gate printed green. `'huge'` is neither
    // canonical (sm|md|lg|xl|fullscreen) nor a tracked legacy alias in
    // prop-compat.ts — check it there first if you change this value.
    content: `export interface GateProbeDeclProps {\n  size?: 'huge';\n}\nexport const GateProbeDecl = () => null;\n`,
  },
  {
    name: 'docs-sprawl',
    script: 'docs:check-sprawl',
    // The gate's scan root is the repo root itself (non-recursive), so the
    // probe lives there too — nowhere else is read.
    probe: '__gate_probe_docs_sprawl.md',
    // Any .md at root outside the closed allowlist in CLAUDE.md §"Documentation
    // Governance" — the literal failure mode ~70 one-off reports once caused.
    content: `# Gate probe\n\nShould never exist at repo root.\n`,
  },
  {
    name: 'deprecations',
    script: 'deprecations:check',
    probe: 'src/components/ui/__gate_probe_deprecations.tsx',
    // A bare @deprecated with no removal-window header attached — exactly the
    // defect this gate exists to prevent (prop-compat.ts's deprecation once
    // pointed at a CONTRIBUTING.md section that did not exist).
    content: `/** @deprecated no removal window attached. */\nexport const GateProbe = 1;\n`,
  },
  {
    name: 'registry',
    script: 'registry:check',
    probe: 'src/components/ui/__gate_probe_registry.tsx',
    // A new component on disk with no registry.json entry — the omission that
    // let 23 real components (the DataGrid family, PageShell, Stack, …) go
    // unlisted for 82 commits while `npx shadcn add` had nothing to give.
    content: `export const GateProbe = () => null;\n`,
    // check-registry.js prints bare component NAMES, extension stripped
    // (`• my-component`) — see the `expect` doc above.
    expect: '__gate_probe_registry',
  },
];

if (only && !GATES.some((g) => g.name === only)) {
  console.error(`check-gate-selftests: no gate named "${only}".`);
  console.error(`Available: ${GATES.map((g) => g.name).join(', ')}`);
  process.exit(2);
}

const selected = only ? GATES.filter((g) => g.name === only) : GATES;

/** Remove every probe, whatever happened. A leftover turns the suite red. */
const cleanup = () => {
  let failed = false;
  for (const g of GATES) {
    const p = path.join(root, g.probe);
    try {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    } catch (err) {
      failed = true;
      console.error(`check-gate-selftests: could not remove ${g.probe}: ${err.message}`);
    }
  }
  if (failed) {
    console.error('Delete the leftover __gate_probe_* file(s) by hand — they will fail CI.');
  }
};

process.on('SIGINT', () => { cleanup(); process.exit(2); });
process.on('SIGTERM', () => { cleanup(); process.exit(2); });

const results = [];

try {
  for (const gate of selected) {
    const probePath = path.join(root, gate.probe);
    const probeName = path.basename(gate.probe);

    try {
      fs.writeFileSync(
        probePath,
        `// GENERATED by scripts/check-gate-selftests.js — deleted immediately.\n` +
          `// If you are reading this in a commit, the harness crashed; delete the file.\n` +
          gate.content
      );
    } catch (err) {
      console.error(`check-gate-selftests: cannot write ${gate.probe} — ${err.message}`);
      cleanup();
      process.exit(2);
    }

    let exitCode = 0;
    let out = '';
    try {
      out = execSync(`npm run --silent ${gate.script}`, {
        cwd: root,
        stdio: 'pipe',
        encoding: 'utf8',
      });
    } catch (err) {
      exitCode = typeof err.status === 'number' ? err.status : -1;
      out = `${err.stdout ?? ''}${err.stderr ?? ''}`;
    }

    fs.unlinkSync(probePath);

    const named = out.includes(gate.expect ?? probeName);
    const caught = exitCode !== 0 && named;

    results.push({ ...gate, exitCode, named, caught, out });

    if (verbose && !caught) {
      console.log(`\n--- ${gate.name}: raw output ---\n${out.slice(-1500)}`);
    }
  }
} catch (err) {
  console.error(`check-gate-selftests: harness error — ${err.message}`);
  cleanup();
  process.exit(2);
} finally {
  cleanup();
}

// ── report ────────────────────────────────────────────────────────────────
console.log('\nGate self-tests — does each gate actually catch its violation?\n');

const pad = Math.max(...results.map((r) => r.name.length));
for (const r of results) {
  const mark = r.caught ? '✓' : '✗';
  let why = '';
  if (!r.caught) {
    if (r.exitCode === 0) why = 'exited 0 — THE VIOLATION WAS NOT CAUGHT';
    else if (!r.named) why = `exited ${r.exitCode} but never named ${r.expect ?? path.basename(r.probe)} — cannot attribute`;
  }
  console.log(`  ${mark} ${r.name.padEnd(pad)}  ${r.script.padEnd(26)} ${why}`);
}

const broken = results.filter((r) => !r.caught);

if (broken.length === 0) {
  console.log(`\n✓ ${results.length} gate(s) each caught a deliberate violation and named the probe.`);
  console.log('  Their green results mean something.');
  process.exit(0);
}

console.error(`\n✗ ${broken.length} of ${results.length} gate(s) are NOT working as claimed.\n`);
for (const r of broken) {
  console.error(`  ${r.name}:`);
  if (r.exitCode === 0) {
    console.error(`    A file containing a violation it is supposed to reject passed cleanly.`);
    console.error(`    Every green \`npm run ${r.script}\` result is currently meaningless.`);
    console.error(`    Check the scan root: if ${path.dirname(r.probe)} is no longer walked,`);
    console.error(`    the gate silently stopped seeing most of the repo.`);
  } else {
    console.error(`    Exited ${r.exitCode} but did not mention ${r.expect ?? path.basename(r.probe)}.`);
    console.error(`    That is NOT evidence the gate works — it may have crashed, or failed`);
    console.error(`    on a pre-existing violation elsewhere. Re-run with --verbose.`);
  }
}
console.error('\nFix the gate, not this harness. Reference implementation: scripts/check-a11y-gate.js');
process.exit(1);
