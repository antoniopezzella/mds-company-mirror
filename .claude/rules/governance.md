---
paths:
  - "scripts/**"
  - ".github/workflows/**"
  - "package.json"
  - "vite.lib.config.ts"
---

# Governance gates — how they work and how they fail

Loaded when you touch a gate script, a workflow, or the package manifest. The
*command list* is in the always-loaded `CLAUDE.md`; this file is the detail.

## The failure mode to design against

Every gate in this repo that has ever been wrong was wrong the same way: it
measured something **adjacent** to what it claimed to measure, and stayed green.

- the a11y gate ran **zero** checks while reporting green on every story
- the role gate parsed **6 of 55** roles
- the registry gate checked index entries, not dependency edges
- a block shipped four wrong numbers because its story matched a currency *substring*

A green gate is indistinguishable from a disabled gate unless something asserts
otherwise. So: **every gate needs a self-test that proves it can fail.**

- `npm run gates:selftest` (`scripts/check-gate-selftests.js`) does this for
  gates that SCAN A DIRECTORY: it writes a probe containing one violation,
  runs the real npm script, and requires the gate to exit non-zero **and name
  the probe**. Exiting non-zero alone is not enough — a crash, a syntax error
  in the probe, or an unrelated pre-existing violation all look like a
  healthy gate otherwise. Folded into `governance:ci` (~3s). Covered this way:
  roles, roles-hex, roles-palette, composition, radius, zindex, props,
  docs-sprawl, deprecations, registry.
- A gate that compares FIXED files (not a directory a probe can be dropped
  into) instead carries its own `--selftest` flag, mirroring
  `check-token-vars-sync.js`: mutate an in-memory copy, confirm the violation
  is caught, confirm the live file passes clean, exit. Each has its own
  `<area>:selftest` npm script, folded into `governance:ci`. Covered this
  way: contrast, token-variables, figma-drift, figma-semantic-drift. Two more
  check the PUBLISHED ARTIFACT rather than source (`package-css`,
  `package-types`), so their `--selftest` goes further: it mutates SOURCE,
  runs the real build (`build:css` / `vite build`), evaluates the resulting
  artifact, then restores source and rebuilds again either way — a probe that
  skipped the build would test nothing, since the historical bugs both gates
  exist for are build-time regressions invisible in source.
- `scripts/check-a11y-gate.js` does the same for the axe gate, which needs a
  real story and a browser run.
- `check-token-vars-sync.js` carries a real `--selftest` too, but spells the
  marker "selftest" (no hyphen) rather than "self-test", so the
  `gate_selftests` metric's `self-test|GATE NOT WORKING` regex does not see
  it — a known, separate gap, left as-is rather than patched as a side
  effect of this work.

**Adding a gate means adding its probe** — either a `GATES` table entry in
`check-gate-selftests.js`, or a `--selftest` flag on the gate itself. All 17
non-harness gate scripts are covered as of 2026-10-11; only the harness files
themselves (`check-gate-selftests.js`, `check-a11y-gate.js`) are excluded by
definition.

## The dark-mode ratchet — `dark:check` (added 2026-10-11)

`npm run test:dark` re-runs every story with `colorMode: 'dark'`
(`vitest.dark.config.ts`). 57 story tests fail today — almost all axe
`color-contrast` in dark mode, concentrated in legacy `src/components/[A-Z]*`
(being deleted), marketing `sections/`/`projects/`, and 5 files in the
published `ui/` set. Folding that straight into `governance:ci` would turn every
unrelated PR red, so it is gated by a **ratchet** instead, the same shape as the
hex/palette gates: `scripts/check-dark-baseline.js` reads the dark run's JSON
report, collects the story FILES with a dark failure, and compares against
`scripts/dark-mode-baseline.json`.

- A failing file **not** in the baseline → regression → exit 1.
- A baseline file that now passes → reported as a tighten opportunity, does
  **not** fail (a browser suite can flake one file green for a single run).
- Failing set ⊆ baseline → exit 0.

The count can only ratchet **down**: fix a file's dark contrast, then
`npm run dark:baseline` to regenerate the list (it should only shrink). Runs in
`.github/workflows/dark-mode.yml` on every PR — a real browser pass, so it is
NOT in the fast `governance:ci`; only its logic probe (`dark:selftest`, which
proves a new failing file is distinguished from the baseline) is. Promote the
workflow to a required check once the baseline reaches zero — the warn-first
ladder `vitest.dark.config.ts` describes.

## Type-checking the test files — `typecheck:tests` (added 2026-10-10)

`npm run typecheck:tests` → `tsc -p tsconfig.test.json --noEmit`. Folded into
`governance:ci` (runs second, right after `tokens:build`). It type-checks the
~109 `*.test.ts(x)` / `*.spec.ts(x)` / `*.accessibility.test.tsx` files plus
`src/setupTests.ts` — the exact set `tsconfig.app.json` **excludes** (see its
`exclude` list). Before this, a test could assert a prop, element type, or
import that no longer existed and still go green: Vitest runs the files but
never type-checks them. The first run surfaced real rot — `button.test.tsx`
rendered `<Button variant="inverseTertiary">` (an internal cva variant never
exposed as a prop) and `typography.snapshot.test.ts` indexed
`theme.typography` with a key type wide enough to include its non-variant
members.

Story files are **not** in this project: `tsconfig.app.json` does not exclude
`*.stories.tsx`, so `tsc -b` / the app project already type-checks them.

This is a `tsc` compile, not a directory-scanning `check-*.js` gate, so it has
no `check-gate-selftests.js` entry and no `--selftest` flag — the probe would
be adding a type error to a throwaway test and confirming `tsc` exits
non-zero, which it does (verified 2026-10-10: a bogus
`<Button variant="notARealVariant">` made it fail and name the file; removing
it returned clean). If you touch `tsconfig.test.json`, re-run that probe —
the two ways this check could silently stop working are (1) the `include`
globs no longer matching the files (confirm with
`tsc -p tsconfig.test.json --listFiles | grep -c '\.test\.'` — expect ~109),
and (2) a `/// <reference types="jest" />` creeping back in. On (2): every
test registers jest-dom via `@testing-library/jest-dom/vitest`, **never** the
bare `@testing-library/jest-dom`. The bare entry's types do
`/// <reference types="jest" />`, which pulls `@types/jest`'s global `expect`
(single-argument, returning `JestMatchers`) into the program and shadows
Vitest's — silently breaking the `expect(value, message)` overload and
Vitest-only matchers like `toHaveBeenCalledOnce`. A triple-slash reference
bypasses the tsconfig `types` allowlist, so the only defence is not importing
the bare entry. `tsconfig.test.json` sets `types: ["node", "vitest/globals"]`
for the same reason — to keep auto-included `@types/jest` and `@types/chai`
globals from winning.

## Hex literals: enforced in `ui/`, advisory elsewhere

Changed 2026-10-08. Hex was informational everywhere, which left "never
hardcode a colour" toothless exactly where the role layer is complete.

| Where | Hex literal |
|---|---|
| `src/components/ui/**` source | **fails** `roles:check:strict` |
| `src/components/ui/**` `.stories.tsx` / `.test.tsx` | advisory |
| `src/components/[A-Z]*/` (legacy MUI) and elsewhere | advisory |

It cost nothing to switch on: that set had **0** hex literals at the time, so
the gate locks in a clean state rather than demanding a cleanup. It ratchets —
new debt cannot enter the current set, while the 77 legacy and 36 story/test
literals stay as notes. Stories and tests are excluded deliberately: they name
colours for swatch demos and for asserting a component resolved to an expected
value, and forcing roles there would make those assertions tautological.

Escape hatches unchanged: `roles-allow-hex` on the line (or the line above),
`roles-allow-hex-file` anywhere in the file. Use them for a literal that is
genuinely right — a brand asset, a third-party constant — and say why.

## Tailwind default-palette classes: same rule as hex (added 2026-10-09)

`bg-red-500`, `text-gray-100`, `from-indigo-950` — Tailwind's *default* palette
is still reachable because `colors` is merged via `theme.extend`. Those classes
render Tailwind's colours, not Marsh's, bypass the role system, and — being
valid classes — no other gate caught them; several also fail to theme-swap in
dark mode. `check-role-usage.js` now flags them with the **same** policy as hex:
**fails** in `src/components/ui/**` source (`roles:check:strict`), advisory in
legacy / stories / tests. It went in at **0** source violations, so it ratchets
rather than demanding a cleanup (the 9 advisory hits are all in `.stories.tsx`).
MDS's own semantic classes (`bg-primary`, `bg-surface-accent`) never match —
they carry no numeric step. Escapes: `roles-allow-palette` (line or line-above),
`roles-allow-palette-file`. Self-tested as the `roles-palette` probe.

When a probe fails, suspect the probe before the gate. The `props` probe first
used `size="default"`, which `prop-compat.ts` does not track as legacy — the
gate was right to pass, and the harness was right to refuse to certify it.

## 9. Governance & Validation

### Token Build Process

```bash
# 1. Build tokens (compile TS → JSON + CSS)
npm run tokens:build
# Outputs: dist/tokens.json, dist/theme.css

# 2. Validate schema (hex format, structure)
npm run tokens:validate

# 3. Check contrast (WCAG AA 4.5:1 for text, 3:1 for UI)
npm run tokens:contrast:all

# 4. Detect changes vs HEAD
npm run tokens:diff

# 5. Full token check (all of the above)
npm run tokens:check
```

### Role Usage Enforcement

```bash
# Check for direct token usage in components (should use roles)
npm run roles:check

# Strict mode (fails on any violations)
npm run roles:check:strict

# Spacing-scale conformance — arbitrary values and off-scale steps
npm run composition:check
npm run composition:check:strict   # folded into governance:ci

# Stacking-scale conformance — every z-index on the scale in ui/z-index.ts
npm run zindex:check               # folded into governance:ci

# The PUBLISHED artifact, not the source. Run after build:package.
npm run pkg:types:check            # folded into build:package
```

> **On `pkg:types:check` — why it exists.** Everything else above validates
> `src/`. Nothing validated `dist-pkg/`, and the package shipped a release
> whose `index.d.ts` referenced five modules with no `.d.ts` emitted: the
> JavaScript worked, the types did not compile, and **all eight gates stayed
> green**. If you add anything to `src/index.ts` that lives outside
> `src/components/ui/`, you must also add its path to the dts `include` list
> in `vite.lib.config.ts` — the JS build does not need the list, the types do.

**What it checks:**
- Components using `tokens.*` or `semanticColors.*` directly (FAIL)
- Components using deprecated tokens (WARN)
- Hardcoded colour literals — hex in Tailwind arbitrary values (`bg-[#000f47]`)
  or inline styles (**INFORMATIONAL — reported with a per-file count, does not
  fail the build**, because some are documented debt with no role to move to
  yet). Annotate a deliberate one with `roles-allow-hex` on the line, or
  `roles-allow-hex-file` anywhere in the file.

Note the asymmetry: the rule below says never hardcode hex, but the checker
only *reports* it. The hard gate covers direct `tokens.*`/`semanticColors.*`
references. Don't assume CI will catch a stray `bg-[#...]` for you.

### Governance CI Pipeline

```yaml
# .github/workflows/governance.yml
name: Design System Governance
on: [push, pull_request]

jobs:
  governance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run tokens:build
      - run: npm run tokens:diff --ci          # Detect changes
      - run: npm run tokens:contrast:all       # WCAG validation
      - run: npm run roles:check:strict        # Role usage
      - run: npm run governance:ci             # Full report
```

### Contrast Validation Rules

```typescript
// scripts/check-contrast.js validates these pairs
const ENFORCED_PAIRS = [
  // Text on surfaces (WCAG AA: 4.5:1)
  { fg: 'fg.primary', bg: 'bg.default', min: 4.5 },
  { fg: 'fg.neutral.subtle', bg: 'bg.default', min: 4.5 },
  { fg: 'fg.on-accent', bg: 'interactive.primary', min: 4.5 },
  
  // Interactive elements (WCAG AA: 3:1)
  { fg: 'border.default', bg: 'bg.default', min: 3.0 },
  { fg: 'fg.success', bg: 'bg.success.subtle', min: 4.5 },
];
```

**Failure:** Build fails if any enforced pair < minimum ratio  
**Report:** `contrast-report.json` with all measured pairs

### Documentation Governance

This repo has a real history of documentation sprawl: ~70 one-off build
summaries, sprint plans, and status reports accumulated at the repo root
over several months (now moved to `docs/archive/`, see below) because
nothing told anyone — human or AI agent — where a new doc belonged. The
rule below exists to stop that recurring, not to describe a one-time
cleanup. Flowchart version of this same ladder, plus the other two
governance systems (token/role, CI gates): [`docs/GOVERNANCE.md`](../../docs/GOVERNANCE.md).

**Where a new doc goes — work down this list:**

1. **Does an existing doc already cover this topic?** Extend it. A new
   finding, decision, or status update belongs as a dated addition to the
   relevant existing file, not a new one — see how
   `docs/FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md` and
   `docs/FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md` mark resolved recommendations
   inline (`~~struck through~~ — Resolved <date>: ...`) instead of a new
   "resolution summary" doc.
2. **Is this a one-off report of a task just completed** (a build summary, a
   sprint plan, an implementation summary, a "done" report)? **Don't write
   it as a standalone file at all.** That's what commit messages and PR
   descriptions are for. If the user explicitly asks for a written report,
   it still needs a real home per steps 3–4 below — it doesn't default to
   the repo root.
3. **Is this a living reference** (a process, a guide, a how-to, a status
   doc that gets updated over time)? It goes under `docs/`, in whichever of
   these existing categories fits — don't invent a new top-level category
   for one file:
   - `docs/get-started/` — onboarding (developer/designer entry points)
   - `docs/foundations/` — conceptual/design-system foundations
   - `docs/guides/` — task-specific how-tos
   - `docs/tasks/` — a specific, scoped, in-progress piece of work
   - `docs/` itself — cross-cutting reference docs that don't fit the above
     (token process, Figma Code Connect, migration status)
4. **Is this genuinely repo-root material?** Only `README.md`, `CLAUDE.md`,
   `SECURITY.md`, `CHANGELOG.md`, and `DESIGN.md` belong at the repo root —
   this is a short, closed list, not a default. `CONTRIBUTING.md` lives at
   `docs/CONTRIBUTING.md` (GitHub recognizes that location too) — it used to
   be duplicated at root with different, overlapping content; merged
   2026-09-15, don't recreate the root copy.
5. **Has this doc stopped being true?** Move it to `docs/archive/` rather
   than deleting it (unless it's a trivial stub) — don't leave stale docs
   in an active category where someone will trust them as current. A doc
   that still describes a renamed/removed API is worse than no doc.

**Enforced by `npm run docs:check-sprawl`** (folded into `docs:lint`) — fails
if any `.md` file exists at the repo root outside the allowlist in step 4.
It cannot enforce steps 1–3 or 5 (those need judgment); it only catches the
literal, mechanical failure mode ("wrote a new file at root") that caused
the original sprawl.

`docs/README.md` is the map — every doc should be reachable from there,
categorized by what it's for, not just alphabetically dumped.

---

