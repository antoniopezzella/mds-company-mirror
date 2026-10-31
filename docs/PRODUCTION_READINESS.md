# Production readiness audit

**Last audited:** 2026-10-29 · **Commit:** `a7a6c61` (branch `feature/mui-removal-and-ds-hardening`) · **Run:** 6 (see Score history) · **Auditor:** staff-level design-systems review
**Audience:** IT Development Lead, deciding whether other teams adopt this system
**Method:** three parallel read-only sub-agents (areas 1/2/10, 3/4/5/7, 6/8/9), consolidated. Every gate, test, build and the 1k-row benchmark was run first-hand. Every score-driving finding was re-checked first-hand, and the findings that did not survive are listed at the end.
**Re-run with:** `/audit` (see `.claude/commands/audit.md`)

> **Run 6 covers 174 commits since Run 5.** Four of Run 5's five P0s are closed and
> verified in code. But checking whether the gates *execute* turned up a bigger
> fact than any of them: **no GitHub Actions workflow on the source repository has
> started since 2026-04-11.** Every "runs in CI" claim in this repo, including the
> ones Run 5 credited, describes a workflow that has never executed on the code it
> describes. The gates are real and they pass, but only when a person runs them locally.

## Score history

| Run | Date | Commit | Overall | Notes |
|---|---|---|---|---|
| 1 | 2026-09-23 | `847ceec` | **1.9 / 3** | Baseline. Packaging repaired same-day (6 blocking defects fixed). |
| 2 | 2026-09-24 | `1481270` | **2.1 / 3** | Tailwind v4 migration; composition layer; control sizes unified. 2 of 6 P0s closed. |
| 3 | 2026-09-25 | `9dcc73a` | **2.2 / 3** | Dashboard foundations shipped. 5 of run-2's P0s closed, 3 new P0s introduced, all artifact-validation. |
| 4 | 2026-10-06 | `3840fc2` | **2.0 / 3** | 82 commits. Real gains (virtualization, interaction tests). Area 7 fell 3 → 2 on documentation defects. |
| 5 | 2026-10-06 | `d06b80b` | **2.0 / 3** | Six same-day commits verified rather than trusted. No area moved; 2 Run-4 findings withdrawn. |
| 6 | 2026-10-29 | `a7a6c61` | **2.0 / 3** | 174 commits. **P0s 5 → 1**: P0-12, P0-13, P0-R and P0-T closed, P0-B narrowed to one digit. Large measured gains in areas 2, 3 and 5. **No area reaches 3**, for cited reasons. **New P0: CI has not executed since April.** |

### Why the score holds at 2.0 while the P0 count fell from 5 to 1

The mean is the wrong lens for this run. These moved, all measured at HEAD:

| Measure | Run 5 | Run 6 |
|---|---:|---:|
| `getRoleColor()` calls in `ui/` (hex resolved in JS) | 515 in 71 modules | **7 in 1 module** |
| `ui/` modules using `var(--role-*)` | 2 | **68** |
| Hardcoded colour literals in `ui/` source | 15 in 2 modules | **4 in 1** (`button.tsx`, file-exempted) |
| `ui/` modules with a ref path (`forwardRef`) | 41 / 99 | **87 / 100** |
| `ui/` story files failing dark-mode axe | 14 entries | **0** (baseline 12, all legacy/projects) |
| Registry `registry:ui` items vs modules | 71 / 93 | **95 / 94**, graph-checked |
| Test files type-checked | 0 of 112 | **all 135** (`typecheck:tests` in `governance:ci`) |
| Commands chained in `governance:ci` | 8 | **28** (13 are self-tests) |
| Tests passing | 1,835 | **1,997** (250 files) |

Each area still stops at 2 because what is left is the *exemplary* half: a brand
mechanism (area 2), a consistent controlled/uncontrolled contract (3), collision
handling and one overlay vendor (4), reduced motion (5), coverage and visual
regression that run (6), adopter docs that are true (7), governed chart colours and
a safe default for large tables (8), a runtime perf gate (9), and CI that executes
(10). A 3 needs those, and none has landed.

---

## (a) Executive summary

**Verdict, unchanged from Runs 4 and 5: adopt for Marsh-branded dashboards inside
this org's control; do not yet recommend as a shared cross-project dependency.**

The engineering is now substantially stronger than at Run 5. The data grid formats
by column type. Colour flows through CSS variables, so a cascade override, not a
fork, can retheme a scope. 87% of modules forward refs. The `ui/` set is clean in
dark mode, and the governance suite is 28 commands with 13 mutation self-tests, green
in 67 s.

**What it would cost to recommend it cross-project**, in dependency order:

1. **Make CI execute** (P0-CI, **S** once the cause is known). Until then, every gate is advisory.
2. **Move distribution to a Marsh-owned package** (P1-1, **L**, organisational). The
   package is still `@mmctech/MarshDesignSystemOfficial` on a personal private repo.
   The audited code sits on a feature branch 190 commits ahead of `main`, and `main`
   still says 0.7.0. The company mirror (`mmctech/MarshDesignSystemOfficial`) runs
   governance and Storybook but cannot publish.
3. **Close the adopter-facing doc drift** (P1-16/17, **S**). The README omits two required
   peer dependencies, and the publishing doc names a package that does not exist in
   `package.json`.

Items 1 and 3 are days of work. Item 2 is a decision that only the organisation can make.

### P0-CI: no workflow has executed on the source repo since 2026-04-11

```
$ gh run list -L 1000 --json conclusion,createdAt -q '.[]|[.createdAt[:7],.conclusion]|@tsv' | sort | uniq -c
  10 2026-03  failure        4 2026-03  success      6 2026-04  failure
   1 2026-06  startup_failure   4 2026-07  startup_failure   14 2026-08  startup_failure
 110 2026-09  startup_failure 140 2026-10  startup_failure
```

- **269 consecutive runs failed to start.** None executed a step. The last run that
  executed anything was 2026-04-11 (`Deploy Storybook`, `Commitlint`, `NPM Install`,
  all failures).
- `gh run view` reports *"This run likely failed because of a workflow file issue"*
  with `path: BuildFailed` on every run, across every workflow at once. That pattern
  is consistent with an account-level block (Actions billing or spending limit on a
  private repo) rather than YAML. **The cause is unverified.** The account's billing
  page is not reachable from here.
- Branch protection cannot exist on this repo. `gh api …/branches/main/protection`
  returns *"Upgrade to GitHub Pro or make this repository public to enable this
  feature"* (HTTP 403). So no check can be *required* either.

**Consequences, verified:**
- `ci.yml` is the only home for `lint`, `a11y:gate:check` (the axe self-test),
  `size` (the bundle budget), `registry:check` and the Storybook build. None of them
  has run remotely.
- `dark-mode.yml` (the dark ratchet) and `chromatic.yml` have never run.
- What *does* execute:
  - **`npm run governance:ci` when a person runs it.** It passed today: exit 0, 28 commands, 67 s.
  - **The pre-commit hook** (`docs:lint`, `tokens:build`).
  - **The company mirror's `governance.yml`** on MMC's self-hosted runner. It was
    relayed there on 2026-10-23, but its result is not visible from this environment.

This is P0 by the same rule as Run 5's P0-13: governance is the system's main claim,
and the documents an adopter reads (`DEVELOPERS.md`, `GOVERNANCE.md`, `CONTRIBUTING.md`)
describe enforcement that is not happening.

### Run 5's P0s, re-verified

| Run-5 P0 | Status at `a7a6c61` | Evidence |
|---|---|---|
| **P0-12**: grid declares formatting it does not have | **Closed** | `9ee5a6b`. `data-grid-table.tsx:9-10` imports `useFormat`/`FormatKind`. `TYPE_TO_FORMAT` maps currency/number/percent/date (`:541-546`). `renderCellContent` formats default cells (`:566-575`). Gated by `data-grid-format.test.tsx` (6 cases, including percent-not-ratio). **Measured:** a `currency` column with no `cell` renders `$0.00`, not `0`. |
| **P0-13**: quick-start claims CI enforcement for a failing command | **Closed as written, superseded by P0-CI** | `roles:check:strict` is in `governance:ci` (`package.json:124`) and in the self-test harness (`check-gate-selftests.js:84-112`). `DEVELOPERS.md:57` is now true *locally*. "In CI" is P0-CI. |
| **P0-R**: `shadcn add data-table` does not compile | **Closed, on static evidence** | `data-table` declares 17 `registryDependencies`, including the 10 previously missing. `check-registry.js:222-316` checks the dependency graph (under-, un- and over-declared) and fails at `:315-316`. Registry validates: 114 items. **A real `shadcn add` install was not run** (private repo, see §e). |
| **P0-B**: starter block renders four wrong numbers | **Narrowed to one, now P1-18** | `9f4b64d` fixed the percent and date values. **Gross written premium still renders a `+8%` delta for 8.2.** `data.tsx:48` sets `formatOptions: { decimals: 0 }` for the headline, and `stat-card.tsx:185-198` spreads the same `opts` into `formatDelta`. The story asserts the wrong value: `marsh-dashboard.stories.tsx:71` `getByText(/\+8%/)`. |
| **P0-T**: expressions mechanism does not ship | **Closed by a different design** | `67166a7` replaced the ambient `.mds-dashboard` scope with explicit utilities in `component-utilities.css`, imported by both app and package. The shipped `dist-pkg/styles.css` carries `font-sans-productive` ×9 and `font-serif-expressive` ×10. `719e7d1` moved `ui/` onto them, so portals no longer lose typography (Run 5 P1-8). |

---

## (b) Scorecard

Run 6 scores. `(a→b)` marks movement since Run 5; none occurred. Denominator is **100
`ui/` modules** (94 flat + 6 in `filters/`) unless stated.

| # | Area | Score | One-line justification |
|---|---|:---:|---|
| 1 | Architecture & packaging | **2** | ESM+CJS with `preserveModules`, 115 re-exports proven by a consumer compile (`check-package-types`), `shadows.d.ts` now emitted, all 59 role vars plus 99 `--mds-color-*` vars ship in `styles.css`. Held at 2: personal-scope package, `v0.8.0` in the CHANGELOG but **untagged and unmerged** (`main` = 0.7.0, 190 commits behind), only 2 subpath exports, and `roleVar` (the documented preferred API, `roles.ts:293-300`) is not exported. |
| 2 | Tokens & theming | **2** | The biggest single change this run: `getRoleColor()` **515 → 7** calls, `var(--role-*)` in **68** modules. A Figma → DTCG → CSS pipeline emits 92 tokens × light/dark/inverse. Held at 2: **no brand mechanism** (`ResolveRoleOptions` is still `{ mode? }`, `roles.ts:246`); role vars are hex literals that do not chain to `--mds-*`; the role tier's dark block matches `.dark` **only** (`roles.generated.css:81`) while the Figma tier also honours `data-theme`; inverse exists in no role. |
| 3 | Component API quality | **2** | `forwardRef` **87/100** (from 41/99), `cn()` 87/100, and the prop-vocabulary gate now reads *declarations*, closing Run 5 P1-11 (`ac436d0`); `attachment` and `toggle` are on-scale. Held at 2: **no consistent controlled/uncontrolled contract.** `Tabs` and `Accordion` are uncontrolled-only; `Combobox`, `DatePicker` and `Pagination` are controlled-only; grid sort and selection are internal-only (`use-data-grid-table.ts:100-103`). `asChild` is still 6. 47 components in 11 modules get a ref only under React 19, while the peer range says `^18 \|\| ^19`. |
| 4 | Radix usage | **2** | 43 behavioural aliases, 7-layer z-index scale gated in `ui/` (37 raw `z-` uses, all on-scale). `TooltipRoot` exported, so `TooltipContent` composes (`3e3c81e`), and portal typography fixed. Held at 2: `collisionPadding`/`avoidCollisions` **0** times in `src`; `@base-ui/react` remains a second overlay vendor for `drawer.tsx` alone; Tooltip composition has **0** tests; the app breaks the z-scale at `AIAssistantChat.tsx:226` (`99999`). |
| 5 | Accessibility | **2** | `ui/` dark-mode failures **14 → 0**, held by a ratchet whose logic is self-tested. The axe gate has a deliberate-violation self-test. Measured today: 1,997 tests green; dark run 47 failures in 11 files, all legacy/projects, inside baseline. Held at 2: **reduced motion is honoured nowhere** — 0 code uses in `ui/`, `index.css` or `styles.package.css`, while **18** modules animate. Hardcoded IDs duplicate on any page with 2 paginations (`pagination.tsx:119,234`). 18 `ui/` modules have no story, so no axe pass covers them. |
| 6 | Testing | **2** | **1,997 tests / 250 files**, green in 77 s in real Chromium; 135 tracked test files (+26). Held at 2: `npm run test:coverage` **exits 1**: branches 72.9% vs an 82% threshold (lines 79.2%). No workflow runs coverage. Visual regression has never run (`chromatic.yml` is token-gated, `exitZeroOnChanges: true`, 0 baselines). Chromium only. Interaction tests: **64 `play` blocks in 22 files**; in `ui/`, 37 in 13 of 81 story files. |
| 7 | Type safety & DX | **2** | The type layer re-earns a 3: `strict`, `tsc -b --force` exit 0 (570 `src` files), **0** real `any` in `ui/`, test files now type-checked. Held at 2 by adopter-facing docs that are still untrue. `README.package.md:38` lists only react/react-dom as peers (`package.json:29-30` also requires `@tanstack/react-table` + `table-core ^9`). `:246` says pin `~0.4.0` at 0.8.0. `docs/PUBLISHING.md:18` names `@mmctech/marsh-mds`, which is not the package name. `DEVELOPERS.md:158` counts are 2 behind. Lint exits 1 (2 errors, `src/projects/colleague-profile/`). |
| 8 | **Dashboard readiness** ⭐ | **2** | Top of band. The grid now formats by `meta.type`. 13 TanStack features, empty/loading/**error** states through one `resolveDataStatus` path, `DateRangePicker`, per-grid density. **Measured: 175 DOM nodes virtualized vs 5,063 not, at 1,000 rows.** Held at 2 by charts and defaults. `ChartContainer` has **0** consumers; 2 of 5 chart series fail 3:1 and the gate marks them `informational` (`check-contrast.js:198-210`). Virtualization is off by default with no warning (193 ms mount at `pageSize={1000}`). The flagship block ships `+8%` for 8.2. There is no app-wide density. |
| 9 | Performance | **2** | Size budget exists (`.size-limit.cjs`, JS 210.94 / 235 kB gz, CSS 23.09 / 25.5 kB gz; measured today) and is wired in `ci.yml:81-82`, **which does not execute** (P0-CI). `React.memo` 0 and `useCallback` 0 across 16 table files. `React.lazy` 0 in `ui/` (recharts not split). `lighthouse.yml.disabled`. |
| 10 | Governance & CI | **2** | `governance:ci`: **28 commands, 13 self-tests**, exit 0 in 67 s. The self-test harness has 11 probes over 8 gates, each required to fail *and name the probe*. Deprecation policy is machine-checked (18 dated headers). Held at 2, arguably lower: **P0-CI** (no workflow has run since April), branch protection unavailable on the plan, bus factor 1 (174/174 commits since Run 5; 13/13 CODEOWNERS rules one person), and the publish workflow cannot run on the company runner (`docs/PUBLISHING.md:3-6`). |

**Overall: 2.0 / 3** (simple mean). ⭐ = weighted heaviest per the brief. Area 10 holds at 2 rather than
dropping, because the gates themselves are proven by mutation and pass. What fails is
their *scheduling*, which is a single fix, not a design flaw. If P0-CI is still open at
Run 7, area 10 drops to 1.

---

## (c) Prioritised gaps

### P0: blocks production adoption

| # | Finding | Evidence | Effort |
|---|---|---|---|
| **P0-CI** | **No GitHub Actions workflow has executed on the source repo since 2026-04-11.** 269 consecutive `startup_failure` runs, 0 steps executed. Branch protection is unavailable on the plan, so nothing can be required. Every doc that says "in CI" describes enforcement that does not happen. | `gh run list` (§a); `gh api …/protection` → 403; `DEVELOPERS.md:57`, `GOVERNANCE.md:58` | **S** to diagnose; the fix depends on the cause (billing/plan → org decision) |

### P1: fix before recommending cross-project

| # | Finding | Evidence | Effort |
|---|---|---|---|
| P1-1 | **Distribution is a personal account, and the release is not real.** `@mmctech` scope, PAT install. 0.8.0 is in the CHANGELOG with **no tag**, `main` is at 0.7.0, and HEAD is 190 commits ahead of `main`. The `@mmctech/marsh-mds` rescope (`cccbae8`) is not on this branch. | `package.json:2-3,11`; `git tag`; `git rev-list --count main..HEAD` = 190 | **L** (org) |
| P1-2 | **No brand mechanism.** Retheming is now *possible* by overriding `--role-*` in a scope, but there is no brand param, no `[data-brand]`, and role vars are 59 × 2 hex literals with 0 references to the `--mds-*` tier, so a brand must restate 118 values. `RoleVarsProvider` inline styles outrank any brand stylesheet. | `roles.ts:246`; `roles.generated.css` (0 `var(--mds`) | **M** |
| P1-5 | **The coverage gate fails and runs nowhere.** `test:coverage` exits 1: branches 72.9% < 82%. No workflow calls it. | `vitest.config.ts:53-58`; §f | **S** |
| P1-6 | **The slow path is the default.** `enableVirtualization` defaults false and there are 0 dev warnings. `pageSize={1000}` gives 5,063 DOM nodes and a 193 ms mount commit, against 175 nodes and 4.8 ms virtualized. | `data-table.tsx:402`; `data-grid-table.tsx:187`; §f benchmark | **S** |
| P1-7 | **No runtime perf gate.** The size budget exists but sits in a workflow that does not run. Lighthouse is disabled. | `.size-limit.cjs`; `ci.yml:81-82`; `lighthouse.yml.disabled` | **S** |
| P1-9 | **Chart colours are in the pipeline but not governed.** `data.1-5` are roles now, yet contrast pairs are `informational: true`. Chart 3 is ~2.57:1 light and chart 4 ~2.70:1 dark, below 3:1. They are absent from the Figma export, and `ChartContainer` has 0 consumers. | `check-contrast.js:198-210`; `roles.ts:92-96` | **M** |
| P1-10 | **The React 18 ref gap is undocumented.** 47 components in 11 modules (`field`, `drawer`, `empty`, …) take a ref only under React 19; peers say `^18 \|\| ^19`. Nine public components take no ref at all (`DataTable`, `DataGrid`, `Toaster`, …). | `package.json:31-32`; `field.tsx:18`; `data-table.tsx:545` | **M** |
| P1-13 | **A second overlay vendor for one component.** `@base-ui/react` is used only by `drawer.tsx:4`. | `package.json:176` | **M** |
| P1-15 | **Bus factor 1.** 174/174 commits since Run 5 by one person; 13/13 CODEOWNERS rules point at one handle. | `git shortlog`; `.github/CODEOWNERS:4-30` | **L** (org) |
| P1-16 | **The README install omits required peers.** Only react/react-dom are named; `@tanstack/react-table` and `table-core ^9` are also required. | `README.package.md:38` vs `package.json:29-30` | **S** |
| P1-17 | **The publishing docs contradict the package.** `PUBLISHING.md:18` says the name is `@mmctech/marsh-mds` and that the README already documents it; both say `@mmctech/MarshDesignSystemOfficial`. `:8` describes a tag trigger the workflow does not have (`publish-package.yml:7-8`, dispatch only). | as cited | **S** |
| P1-18 | **The flagship block still ships one wrong number, and its story pins it.** GWP shows `+8%` for 8.2 because `formatOptions` leaks into `formatDelta`. | `stat-card.tsx:185-198`; `data.tsx:48`; `marsh-dashboard.stories.tsx:71` | **S** |
| P1-19 | **No controlled/uncontrolled contract.** See area 3. A dashboard that syncs tab or sort state to the URL cannot. | `tabs.tsx:57`; `accordion.tsx:174`; `combobox.tsx:31`; `use-data-grid-table.ts:100-103` | **M** |
| P1-20 | **Reduced motion is honoured nowhere.** 18 animated modules, 0 `motion-reduce:` or media query in code. The test harness forces `reducedMotion: 'reduce'` (`vitest.config.ts:168`), so the suite never sees the animations a user does. | `ui/*.tsx`; `styles.package.css` | **M** |
| P1-21 | **Hardcoded element IDs** duplicate on any page with two `Pagination`s or two filter pickers, breaking label association. | `pagination.tsx:119,234`; `filters/filters-field-picker.tsx:230` | **S** |
| P1-22 | **The role tier and the Figma tier disagree on the dark selector.** `--mds-*` flips on `[data-theme=dark]`, `[data-surface=dark]` and `.dark`; `--role-*` on `.dark` only. Latent while `ThemeModeProvider` sets both, live for any consumer that sets only the attribute. The comment at `roles.generated.css:78-80` says all mechanisms "agree on" `.dark`, which `roles.ts:257` contradicts. | `roles.generated.css:81`; `mds-tokens.css:103-105` | **S** |

Run 5 P1s **closed** this run, verified: P1-3 (dark mode in `ui/`), P1-4 (registry
drift), P1-8 (portal typography), P1-11 (declaration-blind prop gate), P1-12 (axe
self-test). **Narrowed**: P1-14 (Tooltip now composable, untested).

### P2: worth doing, not blocking

`Table` withheld in `src/index.ts:183-188`, citing "0.7.0 has never shipped" (the tag exists) (**S**) ·
`data-table.tsx:38-43` says virtualization is "deliberately NOT included" (it is, at
`:318,402,504`) (**S**) · `marsh-dashboard.tsx:69-72,81-82` still describes P0-12 as open
(**S**) · `roleVar` unexported (`index.ts:11-12`) (**S**) · no `./package.json` subpath (**S**) ·
inverse mode missing from the role tier; 0 `ui/` modules use `data-surface` (**M**) ·
`README.package.md:175-188` still teaches inline `getRoleColor` as the primary API (**S**) ·
4 public modules accept no `className` (`filter-controls`, `filter-field-control`,
`notifications-drawer`, `toaster`) (**S**) · 0 collision tuning (**S**) · z-index and radius
gates scan `ui/` only (**S**) · `tsc -p tsconfig.json` checks 0 files (`"files": []`) (**S**) ·
`stories:audit` in no workflow: 34/81 described, 36/81 argTypes (**M**) · 18 `ui/` modules with
no story (**M**) · Select can render without an accessible name, with no type or dev guard
(`select.tsx:228-248`) (**S**) · 0 `memo`/`useCallback` in `data-grid-table.tsx` (1,353 lines)
(**M**) · CSS size limit raised 22.5 → 25.5 kB on 2026-10-22 with the reduction deferred (**S**) ·
3 `MetricCard`s plus `StatCard` and `ChartMetricCard`; `ui/metric-card.tsx` has 0 importers (**S**) ·
`no-explicit-any` is `warn` though the count is 0 (`eslint.config.js:45`) (**S**) · stale comments:
`dark-mode.yml:6-8` ("57 fail, 5 in ui/"), `GOVERNANCE.md:58` ("9 gates" vs 28 commands) (**S**) ·
the dark baseline can tighten by 1 (`ExpertiseCards.stories.tsx` now passes) (**S**) · lint exits 1
on 2 errors in `src/projects/colleague-profile/` (**S**).

---

## (d) 30 / 60 / 90-day plan

> The plan of record is [`ROADMAP.md`](./ROADMAP.md). This section is the audit's
> recommendation, sequenced by dependency, for the roadmap to absorb.

### 30 days: make the claimed governance real

1. **Diagnose P0-CI.** Open the repo's Actions settings and the account's billing page. If
   it is the private-repo minutes or spending limit, the choice is (a) a paid plan, (b) a
   public repo, or (c) making the **company mirror** the CI home. Option (c) is already half
   built: `governance.yml` and `deploy-storybook.yml` run there on the self-hosted runner.
   *Everything else in this plan assumes gates execute somewhere.*
2. **Port `ci.yml`'s unique checks to the runner that works**: lint, `a11y:gate:check`,
   `size`, `registry:check`, `dark:check`. Use the same Artifactory `.npmrc` pattern as
   `governance.yml`. Then fix the docs that say "in CI" to name *which* repo's CI.
3. **Fix the adopter docs** (P1-16, P1-17, `README.package.md:246`, `DEVELOPERS.md:158`).
   Half a day; these are what a second team reads first.
4. **Fix P1-18 and the block's stale comments.** Split `formatOptions` from the delta's
   options and correct the story assertion to `+8.2%`.
5. **Raise branch coverage or lower the threshold to measured −2 pp**, then wire
   `test:coverage` into the working CI. A threshold nobody can pass gets ignored.

### 60 days: close the dashboard gaps

6. **Dev warning when `pageSize > ~200` without virtualization** (P1-6), then consider making
   `maxHeight` imply virtualization.
7. **Govern chart colours** (P1-9): fix series 3 and 4 to ≥ 3:1, flip `informational` off,
   and route `ChartMetricCard` through `ChartContainer`.
8. **Controlled props on `Tabs`, `Accordion`, `Combobox` and `DatePicker`, plus grid
   `sorting`/`rowSelection`** (P1-19). Follow Radix's `value`/`defaultValue`/`onValueChange` naming.
9. **Reduced motion** (P1-20): one global rule in `styles.package.css`, then remove the
   harness override so tests see what users see.
10. **`useId` for the three hardcoded IDs** (P1-21) and the dark-selector alignment (P1-22).

### 90 days: make it adoptable by another team

11. **Move the repo and package to a Marsh-owned org** (P1-1, P1-15). Merge the feature
    branch, tag 0.8.0 (or 0.9.0), publish through Artifactory, and use a team CODEOWNERS
    handle with required checks. Organisational, and the largest blocker.
12. **Brand layer** (P1-2): chain `--role-*` to `--mds-*` in the generator, then define a
    brand as a scoped override of the `--mds-*` tier only.
13. **Visual regression** on the company runner, once item 1 settles where CI lives.
14. **Document or close the React 18 ref gap** (P1-10).

---

## (e) Checks that could not be run

Per method step 3, a check not run is itself a finding.

| Check | Why |
|---|---|
| **Why CI does not start** | `startup_failure` on all workflows at once points at the account, not YAML. The billing page is not reachable from here. **The outcome is verified; the cause is not.** |
| **Whether the company mirror's `governance.yml` is green** | MMC GitHub Enterprise (EMU) is not reachable from this environment. The relay was made on 2026-10-23; its run result was not observed. |
| **Whether 0.8.0 was ever published** | Private GitHub Packages registry, no read credential here. Absence of a tag suggests not. |
| **Real `shadcn add` / consumer install** | Needs auth against a private repo. P0-R is closed on the *graph check*, not on an install. Tree-shaking is verified at the enabling level (`preserveModules`, `sideEffects`), not from a built consumer app. |
| **Sort re-render time at 1k rows** | The benchmark's synthetic header click did not trigger a commit (0 update commits recorded), so Run 5's sort figures have no Run-6 counterpart. **Not measured** — mount and DOM counts only. |
| **Visual regression** | **Not currently measurable.** `chromatic.yml` has never run (CI blocked, and token-gated). 0 committed baselines for `scripts/visual-baseline.js`. |
| **Cross-browser** | Chromium only (`vitest.config.ts:156`). Safari sticky-header and pinned-column behaviour are unverified. |
| **Screen-reader behaviour** | No automated check and no dated VoiceOver/NVDA artefact in the repo. |
| **VPAT / conformance report** | None exists. |
| **Focus-appearance contrast (WCAG 2.4.7/2.4.13)** | axe does not evaluate it. 10 modules rely on the browser-default outline; their contrast per theme was not computed. |
| **Sustained scroll FPS / long tasks** | Needs a CDP tracing harness; none exists. |
| **Multi-brand in practice** | There is no second brand in the repo to try. P1-2 is derived from source. |

---

## (f) Evidence appendix

Every command used, run at `a7a6c61` on 2026-10-29, so the reviewer can re-run them.

```bash
# Gates
npm run governance:ci            # exit 0, 28 chained commands, 67 s
npx tsc -b --force               # exit 0, 10.9 s
npx tsc -p tsconfig.app.json --listFiles --noEmit | grep -c /src/   # 570 — a real check
npm run typecheck:tests          # exit 0
npm run lint                     # exit 1 — 2 errors, 1 warning, all src/projects/colleague-profile/

# Package
npm run build:package            # exit 0; "published types OK — 115 re-export(s) resolve"
node scripts/check-package-css.js  # 147,383 B; 59 role + 99 --mds-color vars, all resolve
npm run size                     # JS 210.94 kB / 235 kB gz; CSS 23.09 kB / 25.5 kB gz
npx shadcn@latest registry validate   # 114 items valid; 95 registry:ui

# Tests
npm test                         # 250 files, 1,997 tests, exit 0, 77 s
npm run test:coverage            # exit 1 — branches 72.9% < 82%; lines 79.16%, stmts 77.5%, funcs 70.82%
npm run test:dark                # exit 1 — 11 files / 47 tests fail, 0 in src/components/ui/
node scripts/check-dark-baseline.js   # exit 0 — within baseline (12 files); 1 can tighten

# CI reality
gh run list -L 1000 --json conclusion,createdAt -q '.[]|[.createdAt[:7],.conclusion]|@tsv' | sort | uniq -c
gh run view <id>                 # "likely failed because of a workflow file issue", path BuildFailed
gh api repos/mmctech/MarshDesignSystemOfficial/branches/main/protection   # 403 — plan
git rev-list --count main..HEAD  # 190

# Counts re-derived first-hand
ls src/components/ui/*.tsx src/components/ui/filters/*.tsx | grep -vE '\.test\.|\.stories\.' | wc -l   # 100
…| xargs grep -l forwardRef | wc -l          # 87
…| xargs grep -h 'getRoleColor(' (non-comment) # 7, all side-navigation.tsx:184-192
git ls-files '*.stories.tsx' | xargs grep -o -E '\bplay\s*:' | wc -l   # 64 (61 at d06b80b, same method)
git ls-files | grep -cE '\.(test|spec)\.(ts|tsx)$'                   # 135
```

**1k-row render, measured in real Chromium (Playwright, 1400×1000) via `React.Profiler`.**
The harness was a throwaway test outside the repo (scratchpad), with `DataTable` given
4 columns, one `meta.type: 'currency'` and one `'date'`, and no custom `cell`:

| Configuration | Mount commit | DOM nodes | `<tbody><tr>` | Run 5 DOM |
|---|---:|---:|---:|---:|
| `DataTable` default (10/page) | 27.5 ms | 113 | 10 | 112 |
| `pageSize={1000}`, no virtualization | **193.3 ms** | **5,063** | 1,000 | 5,062 |
| `pageSize={1000} maxHeight={600} enableVirtualization` | **4.8 ms** | **175** | 23 | 174 |

DOM counts reproduce Run 5 to ±1, since the formatter adds no nodes. The currency column
rendered `$0.00` for a value of 0, confirming P0-12's fix in a browser, not only in
jsdom. Single-sample timings vary with machine load; the DOM counts are deterministic.

---

## Findings that did not survive verification

Recorded so the reviewer can see what was discarded.

- **"147 `play` interaction tests"** (Runs 4–5). Not reproducible. Counting `play:` keys
  in tracked story files gives **61 at `d06b80b` and 64 at HEAD**, by the same method on
  both commits. The earlier figure likely counted a different unit. Use 64.
- **"Coverage thresholds now sit 3–4 points below actuals"** (a Run-6 sub-agent, from
  the config comment). The run disagrees: **branches 72.9% vs threshold 82%**, and
  `test:coverage` exits 1.
- **"`dist-pkg/` is missing `styles.css`"** (a Run-6 sub-agent). It was observed while
  `governance:ci`'s `pkg:css:selftest` was rebuilding the package. After the build it is
  present (147,383 B).
- **"`src/components/ui/__gate_probe_props.tsx` exists"**. A transient probe written by
  `check-gate-selftests.js` during the concurrent `governance:ci` run, and cleaned up. That
  it cleaned itself up is evidence the harness works.
- **"Run 5 P1-12: the axe gate has no self-test."** Already stale at Run 5: the self-test
  existed at `d06b80b` and Run 5's own §(a) table credits it. Recorded as closed, not as
  new work.
- **Run 5's "223 test files"** was Vitest's file count, which includes story files. This run
  reports both units: 250 Vitest files, 135 test files.

---

## See also

- [`ROADMAP.md`](./ROADMAP.md) — the plan; this audit's §(d) feeds it
- [`DS_HEALTH_REPORT.md`](./DS_HEALTH_REPORT.md) — the internal running health log; distinct from this adoption audit
- [`MAINSTREAM_REUSE_ASSESSMENT.md`](./MAINSTREAM_REUSE_ASSESSMENT.md) — the Atlas/React reuse question (its hex figure is stale; see Run 5)
- [`GOVERNANCE.md`](./GOVERNANCE.md) — the governance systems (its "in CI" claims are subject to P0-CI)
- [`PUBLISHING.md`](./PUBLISHING.md) — publish runbook (see P1-17)
