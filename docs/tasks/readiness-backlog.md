# Readiness backlog — the nine metric-bound tasks

**Status:** Open · **Raised:** 2026-10-08 · **Measured at:** `62347d3`
**Rubric:** `npm run ds:score` v3 · **Machine-readable:** [`readiness-backlog.json`](./readiness-backlog.json)

---

## Why these nine and not others

Every task here **moves a specific `ds:score` v3 metric**, so "done" is a
number that changed rather than a judgement someone made. That is the whole
point: this repo's recurring failure is work that reports green while the
thing it claims to fix is still broken.

Rubric v3 scores four goals. Two of them were invisible to v2 and score
badly now that they are measured:

| Goal | Score | Weight |
|---|---|---|
| Development readiness | 62/100 | 47% |
| Governance & verification | 84/100 | 27% |
| **Scalable global system** | **1/100** | 14% |
| **AI-agent readiness** | **17/100** | 12% |

## The agents that work this backlog

Four Claude Code subagents in `.claude/agents/`. All are **propose-only**:
each applies a change, measures whether the metric actually moved, reverts,
and leaves a patch in `.agent-proposals/` (gitignored) for a human to apply
with `git apply`. None of them commits.

| Agent | Drives | Writes |
|---|---|---|
| `ds-backlog-pilot` | triage + dispatch | measured values in `readiness-backlog.json`, nothing else |
| `ds-metric-closer` | DEV-1, DEV-2, GLOBAL-2 | `src/components/ui/**` → patch |
| `ds-gate-author` | AGENT-3, new metrics | `scripts/check-gate-selftests.js`, `ds-health-score.js` → patch |
| `ds-code-connect-mapper` | AGENT-1 | `src/figma/*.figma.tsx` → patch |

Start with `ds-backlog-pilot`: it reconciles the recorded numbers against a
live `ds:score` run, reports regressions first, picks the next unblocked task
and dispatches it.

**Verification is the contract.** A task is done when the metric moved,
measured independently — never because an agent said so. If the metric did
not move, the task is not done; check whether the *metric* is measuring the
right thing before assuming the work failed. (That is not hypothetical: the
`props` gate probe was wrong, not the gate.)

> **`agents/design-system-agent` is a different thing and does not drive
> this.** It does exactly one job — turn one Figma node into an MDS component
> (`--component <Name> --figma-url <url>`) via token-mapper →
> component-builder → a11y-auditor → code-connect-publisher — and it has never
> been run end-to-end. Only **AGENT-1** is near its shape, and
> `ds-code-connect-mapper` covers that case without needing an API key or a
> Figma token.

---

## AI-agent readiness — 17/100

### AGENT-1 · Raise Code Connect coverage
`code_connect_coverage` · **30/118 → 60/118** · M · P1

Figma's own evaluation attributes its measured savings (−29.5% tokens,
−19.6% time) to *coverage*, not to having Code Connect at all. Coverage is
therefore the metric, not the number of mapping files.

**Requirements**
- Pick targets by **Figma library analytics usage**, not alphabetically. The
  top 10 by instance count are worth more than the next 40 by name.
- Six legacy mappings still point at deleted or deprecated MUI components:
  `MegaMenu`, `Snackbar`, `SideNavigation`, `Radio`, `TextField`,
  `ChartMetricCard`. Expect some to be **deletions**, not rewrites —
  `ui/mega-menu` is data-driven (`items[]`) against the legacy overlay's
  `isOpen`/`onClose`, so its example cannot be ported.
- Every new mapping must pass `npx figma connect parse
  --exit-on-unreadable-files`.
- Do **not** publish. `npm run figma:publish` pushes to Dev Mode and changes
  what every designer sees; it runs from the `Figma Code Connect` workflow
  with a repository secret, never a local token.

**Acceptance** — `ds:score --json` shows `code_connect_coverage` ≥ 51, and
`npx figma connect parse --exit-on-unreadable-files` exits 0.

### AGENT-2 · Emit machine-readable component contracts
`contracts_emitted` · **no → yes** · S · P1

The research is consistent that contracts are where every measured agent gain
sits, and that they are now a commodity rather than something to build.

**Requirements**
- Add `features: { componentsManifest: true }` to `.storybook/main.ts` (it has
  `addons`, `framework`, `docs: {}` and no `features` block).
- Verified available: the flag landed in Storybook 10.1 as
  `experimentalComponentsManifest` and was renamed in 10.3. **This repo is on
  10.6.**
- Record in the commit that the manifest schema is explicitly *not stable and
  not a public API* — consume it, never fork it.
- Confirm `manifests/components.json` appears in a `storybook build` and that
  a known component's props are present. A flag that emits an empty manifest
  is the failure mode this task exists to avoid.

**Acceptance** — `ds:score --json` shows `contracts_emitted: 100`, and the
built manifest contains props for at least `button` and `data-table`.

### AGENT-3 · Give every gate a self-test
`gate_selftests` · **6/15 → 15/15** · M · P1

Nine gates still have no proof they can fail. This is the metric that makes
every other green result mean something.

**Requirements**
- Extend the `GATES` table in `scripts/check-gate-selftests.js`. Remaining:
  `contrast`, `deprecations`, `docs-sprawl`, `figma-drift`,
  `figma-semantic-drift`, `package-css`, `package-types`, `registry`,
  `token-variables`.
- Each probe must make the gate exit non-zero **and name the probe** in its
  output. Exiting non-zero alone is not evidence — a crash, a malformed probe
  or an unrelated pre-existing violation all look like a healthy gate.
- Write the probe inside the gate's own scan root. A probe outside it is never
  read and the gate "passes" for the wrong reason.
- **Suspect the probe before the gate.** The `props` probe first used
  `size="default"`, which `prop-compat.ts` does not track, so the gate was
  right to pass and the harness was right to withhold the tick.

**Acceptance** — `node scripts/check-gate-selftests.js` exits 0 with 15 gates
listed, and neutering any one gate's failure branch takes the harness to
exit 1 naming that gate.

---

## Scalable global system — 1/100

### GLOBAL-1 · Make the expression scope reach the package
`expression_reach` · **no → yes** · M · P0

The strategic blocker, and v2 could not see it. The typography expression
mechanism exists in `src/styles/_typography.scss`, but the package entry
imports a flat unscoped file — so `--typo-h1-font-family` resolves to Marsh
Serif in the app and Noto Sans in the published package. Same variable,
opposite defaults.

**Requirements**
- `src/styles.package.css` currently has **zero** references to
  `mds-dashboard`, `mds-marketing` or `data-typography-context`.
- Fix the three known typography holes first, on 15 variables and 8 call
  sites, before betting 110 role variables on the same mechanism: absent from
  the published artifact, no neutral core, does not survive a portal.
- Radix portals render to `document.body` and do not inherit a page wrapper's
  scope — `notifications-drawer.tsx` re-applies it deliberately. Any new
  portalled surface needs the same.
- `:root` is currently the *marketing* expression, so every unscoped surface
  is silently opted into it. Give the core a neutral default rather than
  making one expression the fallback.

**Acceptance** — `ds:score --json` shows `expression_reach: 100`, and
`--typo-h1-font-family` resolves to the same face in the app and in
`dist-pkg`.

### GLOBAL-2 · Convert directional spacing to logical properties
`rtl_readiness` · **4/73 → 60/73** · M · P1

Logical properties (`ms-`/`me-`/`ps-`/`pe-`) mirror with `dir`; physical ones
(`ml-`/`mr-`/`pl-`/`pr-`) do not. An RTL locale currently breaks the layout
instead of flipping it.

**Requirements**
- 69 physical against 4 logical across `src/components/ui/`.
- Mechanical but not blind: a few are genuinely physical — an icon that must
  stay on the left regardless of direction. Leave those and comment why.
- `composition:check` already reports this as advisory. Consider promoting it
  to a failure for `src/components/ui/` once the ratio is high, the same
  ratchet used for hex: cheap to hold, expensive to regain.

**Acceptance** — `ds:score --json` shows `rtl_readiness` ≥ 80, and a story
rendered under `dir="rtl"` mirrors rather than breaking.

### GLOBAL-3 · Make user-facing strings translatable
no metric yet · S (metric) + L (conversion) · P1

**There is no i18n library in the repo at all**, and component defaults are
hardcoded English: `'Rows per page:'`, `'Select an option'`, `'Search...'`,
`'User Avatar'`, `'Toggle row {row}'`.

**Requirements**
- **Add the metric first.** This is the one listed task with no `ds:score`
  entry, so there is nothing to verify against. Count translatable vs
  hardcoded user-facing defaults in `ui/` and add it under the `global` goal.
- Count only **user-facing** strings. A first pass at this counted
  `displayName` assignments (`'CardHeader'`, `'ChartContainer'`) as hardcoded
  copy; those are not user-visible and must not inflate the number.
- `src/lib/format.ts` already takes `locale?` and caches `Intl` formatters —
  the locale foundation exists and nothing consumes it. Reuse it rather than
  adding a second mechanism.
- Choose the mechanism deliberately: a full i18n runtime is a large dependency
  for a component library. Accepting strings as props with English defaults
  may be the right answer, and is cheaper to ship.

**Acceptance** — a new `global` metric exists, can fall (proven by mutation),
and reports the real ratio.

---

## Development readiness — 62/100

### DEV-1 · Document props on the most-used components
`prop_docs` · **52/118 → 90/118** · M · P1

A developer who cannot read the API reads the source. That works inside this
building and nowhere else.

**Requirements**
- A JSDoc block inside the exported `*Props` declaration is what makes
  Storybook Controls show a description.
- Prioritise by usage, not by file order. `avatar` is 19 of 19 props
  undocumented.
- Document the three known API traps rather than leaving them for a round
  trip each: `Button iconOnly` silently discards children and renders an empty
  box; `Input` has no adornment prop; `Tooltip` takes `title`, not `content`.

**Acceptance** — `ds:score --json` shows `prop_docs` ≥ 76.

### DEV-2 · Forward refs from load-bearing modules
`ref_paths` · **41/118 → 90/118** · M · P1

Without a ref path a consumer cannot focus it, measure it, or hand it to a
positioning library — and cannot work around a gap without forking.

**Requirements**
- The peer range is `^18 || ^19`, so a React-19-only ref path is not enough.
- Prioritise form controls, overlays and anything a consumer might need to
  focus or measure.
- Adding `forwardRef` changes the public type surface. Run
  `npm run build:package && npm run pkg:types:check` — the published
  `index.d.ts` has shipped broken before while all gates stayed green.

**Acceptance** — `ds:score --json` shows `ref_paths` ≥ 76, and
`pkg:types:check` passes.

### DEV-3 · Type-check the test files
no metric yet · S · P1

**109 test files are checked by nothing.** A test can assert a signature that
no longer exists and still pass.

**Requirements**
- Add the test files to a tsconfig that `npx tsc -b` reaches, or add a
  dedicated project for them.
- Expect existing errors. Fix them rather than loosening the config — a test
  asserting a dead signature is the defect this surfaces, not noise.
- Add a `dev`-goal metric for it so it cannot silently regress.

**Acceptance** — `npx tsc -b` covers all test files and exits 0, confirmed via
`--listFiles` rather than assumed. (A `tsc` run that silently excludes them
exits 0 too — that is the trap.)

---

## What is not a task here

- **The adoption audit's 2.0/3** is not in this list. It is judgement-scored
  by review, not mechanically, so no task can "move" it directly.
- **First-pass agent conformance** — the metric no design system in financial
  services publishes — needs a no-context baseline captured *before* more
  context ships. It is sequencing-sensitive and lives in the plan, not here.
