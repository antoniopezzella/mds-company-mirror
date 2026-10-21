# MDS Design System Health Report

**Last updated:** 2026-10-16
**Owner:** mds-health-auditor (recurring, read-only — audit + propose only)
**Branch audited:** `main` trunk is still at `02b636d` (2026-10-02) and has not
merged any of the design-system-hardening work below. This run audited HEAD
(`1b17d1d`, 2026-10-16) on `feature/mui-removal-and-ds-hardening` — now **111
commits / 418 files** diverged from `main` (up from 390 files at the 2026-10-15
measurement, seven commits ago: `0bb4943`, `7d78af9`, `0f8eace`, `b50ecb9`,
`aa20ddd`, `8cee8f9`, `1b17d1d`).

**Process note — this run is explicitly scoped as a delta audit and was told
not to push.** The operator asked for a focused "what moved since the
2026-10-15 run" pass and explicitly instructed: prepare the refresh in a
worktree, do not commit to `main`, do not push. This file is therefore updated
**only inside a local git worktree** (`chore/ds-health-report-2026-10-15`
branch, same branch the 2026-10-15 run used) and has **not** been pushed or
opened as a PR this time — a human needs to decide whether to push that branch
and open its PR. Carrying forward the 2026-10-15 run's own process finding
unchanged, since nothing has resolved it: **PR [#2](https://github.com/antoniopezzella/marsh-design-system/pull/2)**
("MDS Health Report — 2026-09-05") is still open against `main`, now even more
stale; `chore/ds-health-report-2026-09-26` and `chore/ds-health-report-2026-10-08`
remain orphaned branches with no PR; **and now `chore/ds-health-report-2026-10-15`
joins them** — that run's own report update was committed to a branch but never
turned into a PR either, the same gap it flagged in its predecessors. Four
report-refresh branches now exist with zero landed PRs among them except the
single stale #2. This is itself evidence for Top Priority #3 below.

## Changelog since previous run (2026-10-15)

**Both of the previous run's CI-breaking bugs are fixed, verified live rather
than by re-reading the Changelog.** This was a narrow, targeted pass — seven
commits since `91df435` (`0bb4943`, `7d78af9`, `0f8eace`, `b50ecb9`, `aa20ddd`,
`8cee8f9`, `1b17d1d` — six design-system commits plus one unrelated release
script) — so most sections below are confirmed unchanged rather than re-swept
from scratch; anything not explicitly re-verified this run says so.

- **RESOLVED — DEFERRED-018** (`TeamsProvider` decorator crash breaking two CI
  gates at once). `src/projects/colleague-profile/pages/ColleagueProfile.stories.tsx:6,19-21`
  and `.../ManageTeam.stories.tsx:7,21-25` now import `TeamsProvider` from
  `../components/TeamsContext` and wrap the story content in it — both files
  carry an explicit code comment naming exactly what broke
  ("`TeamsProvider` is what broke this story's play test and the dark-mode
  check"). Confirmed via a full fresh `npm test` run: **1936/1936 tests passed,
  242/242 files**, zero failures (was 11/1856 failing across 3 files on
  2026-10-15). Confirmed independently via `npm run dark:check`: **17 files
  failing, 17 in baseline, exit 0** — "No new dark-mode regressions" (was 19
  failing / 2 new / exit 1 on 2026-10-15). Both gates, same root cause, both
  closed by the same fix.
- **RESOLVED — DEFERRED-019** (`Snackbar.stories.tsx`'s `containedWarning`
  button, 3.98:1, failed axe `color-contrast`). Commit `0bb4943` replaces MUI's
  default `color="warning"` with the DS's own dark-text-on-pale pattern via
  `getRoleColor('status.warning.bg')` / `getRoleColor('text.onLight')` — the
  code comment explicitly notes that white-on-`#c25600` would still only be
  4.29:1, so it deliberately takes the same treatment `Snackbar` itself uses
  for the `warning` severity rather than patching the ratio in place. The
  specific role pair this borrows, `textOnLight on statusWarningBg`, measures
  **5.31:1 PASS** in today's fresh `npm run tokens:check` run. Folded into the
  same `npm test` 1936/1936 green count above — the story's own axe assertion
  is part of that suite, not a separate check.
- **Create Team / Team Setup feature is now committed** (`7d78af9`):
  `src/projects/colleague-profile/components/CreateTeamDrawer.tsx`/`.stories.tsx`
  and `TeamSetup.tsx`/`.stories.tsx` are tracked (`git log -1` resolves cleanly
  for both), closing the "previously-uncommitted feature" gap named in this
  run's briefing. Each ships a `.stories.tsx`; neither has a `.test.tsx` — same
  pattern as the rest of `colleague-profile`, which has zero unit test files
  project-wide and relies on stories as its test layer. This directory sits
  outside `src/components/ui`, so it does not feed any `ds:score` metric
  either way.
- **Real, substantive unit tests landed for 15 `ui/` modules, not stubs.**
  Verified by reading each file, not just counting diff lines: `error-state.test.tsx`
  (40 lines), `sparkline.test.tsx`/`spinner.test.tsx` (33 lines each, both
  existing files *extended* rather than created — hence 46 deletions alongside
  77 insertions in `b50ecb9`), `breadcrumbs`/`empty`/`marker`/`aspect-ratio.test.tsx`
  (49/53/32/26 lines, `aa20ddd`), and `collapsible`/`field`/`hover-card`/`list`/`metric-card`/`pagination`/`slider`/`text-field.test.tsx`
  (30–64 lines each, `8cee8f9`). Plus 3 new stories (`spinner`, `error-state`,
  `sparkline`, `0f8eace`, 155 lines).
- **`ds:score` moved 76 → 78/100 (rubric v5, confirmed via a fresh `--json`
  run, not a re-read of the last recorded number — the history file at
  `docs/ds-health-history.json` is still rubric-v2-only and was never updated
  for v5, so there is nothing to `ds:score --compare` against; this report is
  the only place the v5 trend lives).** The move is entirely inside
  **Development readiness: 63 → 67/100** — `test_coverage` 53→64 (raw
  **64/120 → 77/120**, +13 net modules — 15 new test files, 2 of which
  extended already-counted `sparkline`/`spinner` rather than adding new
  coverage) and `story_coverage` 64→67 (raw **77/120 → 80/120**, +3, exactly
  the 3 new stories above). `ref_paths` (56, 67/120), `prop_docs` (82, 98/120)
  and the `a11y_enforcement` component (62, `axe:error dark:wired motion:0/120`)
  are all **unchanged** — confirmed by diffing the full `--json` metrics
  object line by line, not assumed from the goal score alone. **Governance
  98, Scalable global system 78, AI-agent readiness 74 — all three other
  goals are bit-for-bit unchanged** (every one of their 11 constituent metrics
  matches 2026-10-15 exactly). Arithmetic check: 67×0.44 + 98×0.27 + 78×0.17 +
  74×0.12 = 78.08 → 78; the same formula against the 2026-10-15 goal scores
  (63/98/78/74) gives 76.32 → 76, which is where this run's briefing got "76"
  from — confirmed, not just repeated.
- **CORRECTED — DEFERRED-020 was a false alarm, not a real taxonomy gap.** The
  2026-10-15 run's "`taxonomy.ts` is 21% incomplete (95/120 classified)" compared
  two different units of "a module": `ds:score`'s recursive file-walk (120,
  which counts every `.ts`/`.tsx` inside `filters/` as a separate module) against
  `taxonomy.ts`'s own, deliberately different definition in
  `taxonomy.test.ts`'s `componentsOnDisk()` — a top-level `.tsx` file **or a
  directory with an `index`**, which counts the entire `filters/` subtree as
  **one** component, not fourteen. Re-ran the actual gate rather than
  re-deriving the count by hand: `npx vitest run src/components/ui/taxonomy.test.ts`
  — **22/22 passed**, including `'classifies every component that exists on
  disk'`, which is the literal completeness assertion DEFERRED-020 claimed was
  failing. It was never failing; the two sweeps were measuring different
  things and 95/120 was never the right ratio to hold taxonomy.ts to. Not
  repeating this comparison in Top Priorities below, per this run's briefing.
- **Re-ran the full gate stack live, not from memory:** `npm run build`
  (exit 0, `tokens:build` → Style Dictionary → `vite build`, no new warnings),
  `npm run governance:ci` (exit 0, all steps including `gates:selftest` 11/11
  named probes and `metrics:selftest` 17/17 metrics discriminating both
  directions), `npm run tokens:check` (exit 0, "Contrast validation passed",
  449-token DTCG validation clean), `npm run typecheck:tests` (exit 0, silent).
  All four confirmed green, matching 2026-10-15's state with no new drift.
- **Not re-verified this pass** (narrow delta scope; carried forward
  unchanged per the never-silently-drop rule, see Tracked Deferred Items):
  DEFERRED-003 (Checkbox checked+invalid exact ratio), DEFERRED-004 (Badge/
  Chip/Alert/Tooltip tail), DEFERRED-005 (CarouselSection padding), DEFERRED-006
  (mega-menu dark-mode baseline membership), DEFERRED-015 (stale Figma file
  key), DEFERRED-016 (`sumFooter()`/`rowSpan` footer helpers), DEFERRED-021
  (6 named stale Code Connect mappings), DEFERRED-022 (`SHADCN_MIGRATION_STATUS.md`
  staleness), the `.env` secret-rotation item, and the CODEOWNERS bus-factor
  item.

## Changelog since previous run (2026-10-10)

**Two CI gates are newly red** on this branch, both traced to one root cause
plus one unrelated, pre-existing bug — see Top Priorities. Everything else
measured this run is flat-to-improved; no prior RESOLVED item regressed.

- **NEW — `npm test` (`ci.yml`'s "Unit & interaction tests" step) fails: 11/1856
  tests red across 3 files.** `src/projects/colleague-profile/pages/ColleagueProfile.stories.tsx`
  (5 tests) and `.../ManageTeam.stories.tsx` (5 tests) throw
  `useTeams must be used within a <TeamsProvider>` — both stories carry a
  `decorators` array (added in `57f262d`, 2026-10-06) that, unlike the working
  `CreateTeamDrawer.stories.tsx` in the same project, never wraps the story in
  `<TeamsContext>`'s `TeamsProvider`. The 11th failure is unrelated:
  `src/components/Snackbar/Snackbar.stories.tsx > Interactive Example` (legacy
  MUI) fails axe `color-contrast` on `.MuiButton-containedWarning` — measured
  3.98:1, needs 4.5:1 (`foreground #000f47, background #c25600`).
- **NEW — `npm run dark:check` (`dark-mode.yml`'s ratchet) now exits 1: 2 NEW
  failures not in the baseline.** `scripts/dark-mode-baseline.json` (17 files,
  unchanged since 2026-10-11) doesn't include `ColleagueProfile.stories.tsx` or
  `ManageTeam.stories.tsx` — confirmed via a full `npm run test:dark` run that
  these are the *same* `TeamsProvider` crash, not a new dark-mode colour
  regression; the crash happens before axe ever gets to measure a colour. A PR
  from this branch today fails two separate CI workflows from one bug.
- **`npm run build` — re-confirmed PASS, exit 0, 0 `error TS`.** The baseline
  7-file MUI-`sx`-on-shadcn failure list this agent tracks no longer
  reproduces (re-confirmed; same mechanism as the 2026-08-28 resolution).
- **`npm run governance:ci` — full PASS, exit 0**, including every self-test
  step (`gates:selftest`: 11 named probes all catch their violation;
  `metrics:selftest`: 17/17 metrics discriminate correctly in both directions;
  `dark:selftest` logic-probe passes). This is a materially larger, more
  rigorous gate suite than the 2026-10-10 entry describes — `check-metric-selftests.js`
  (proving ds:score's *metrics*, not just its gates, can fail for the right
  reason) exists and is wired in now, closing **GOV-2** (see backlog
  reconciliation below).
- **`npm run tokens:check` — PASS**, "No token changes detected"; DTCG
  validator checks 449 tokens clean; `npm run docs:lint` — PASS, "6 root .md
  file(s), all allowlisted."
- **`npm run test:coverage` (the `unit` project only) — PASS, 110/110 files,
  1152/1152 tests. Coverage: 65.58% statements / 85.64% branches / 71.61%
  functions / 65.58% lines** — up substantially from the 2026-09-05 baseline
  of 32.23%/49.91%/17.04%. (This command doesn't run the `storybook` project,
  so it stays green independent of the `npm test` failures above — see Top
  Priorities for why that split matters.)
- **`ds:score` is now on rubric v5 and reports 76/100** (dev 63 · gov 98 ·
  global 78 · agentic 74). **This is not comparable to the 2026-10-10 entry's
  "73 → 79" (rubric v4)** — `npm run ds:compare` itself reports "No runs
  recorded on the current rubric," confirming today's is the first v5
  measurement. The apparent 6-point dev-score drop (69 → 63) is not a
  regression: `test_coverage` (64/120), `story_coverage` (77/120), `prop_docs`
  (98/120) and `ref_paths` (67/120) are all flat-to-improved vs. the raw counts
  the 2026-10-10 entry cites (`64/118→66/118` ref, `97/118→98/120` prop docs,
  accounting for the denominator growing 118→120). The drop is rubric
  mechanics: commit `64a5ee5` ("make the `a11y_enforcement` metric able to
  fall (rubric v5)", 2026-10-10 09:27) replaced a lenient single-enum read
  with one that can score below 100, landing the same day as the 10-10 report
  and now contributing 62/100 as a 5th dev-goal component, pulling the
  5-metric average down with no change to the underlying counts.
- **Full `docs/tasks/readiness-backlog.json` ↔ live `ds:score` reconciliation**
  run this pass — see the new subsection under Production Readiness below.
  Headline: **GLOBAL-1, AGENT-2, GOV-2 resolved**; **AGENT-3, AGENT-1, DEV-1,
  DEV-3 at or past target** (DEV-3 resolved via `typecheck:tests`, added
  2026-10-10, without the backlog file itself ever being updated to say so —
  a second instance of the same "changelog updated, body/tracking not"
  pattern flagged above, just in a different file); **DEV-2, DEV-4 improved
  but short of target; GLOBAL-2, GLOBAL-3, DEV-6 unchanged/untouched.**
- **`taxonomy.ts` is incomplete: 95 of 120 live `src/components/ui` modules
  classified (79%).** 25 are unclassified, including **5 real rendering
  components** inside the nested `filters/` subdirectory
  (`filters-builder.tsx`, `filters-field-picker.tsx`, `filters-group.tsx`,
  `filters-rule.tsx`, `filters-value-editor.tsx`) that never surface when
  following CLAUDE.md's own decision-ladder step 1 ("check `taxonomy.ts`").
  The remaining 20 are legitimate non-component support files (hooks, schema/
  type modules, `taxonomy.ts` itself) that may not need classifying by
  design, but the 5 real components do. New finding this run — `taxonomy.ts`
  was assumed complete in every prior pass; nobody had diffed it against the
  actual file list. **DEFERRED-020.**
- **RESOLVED — DEFERRED-002** (`Button.tsx` `destructivePrimary` hardcoded,
  no dark-mode variant): source now reads
  `bg-[var(--role-interactive-danger)] text-[var(--role-fg-on-interactive)]`
  with an explanatory comment documenting the exact fix and a subtle
  camelCase-vs-kebab-case CSS-var-name trap caught along the way. Matches
  `governance:report:strict`'s live enforced pair (`text.onInteractive` on
  `interactive.danger`: 5.34:1 light / 6.53:1 dark, both PASS).
- **STILL OPEN, narrowed — DEFERRED-003** (`Checkbox.tsx` checked+invalid):
  source now resolves colour through the same `interactive.danger` role
  (`roleVar(invalid ? 'interactive.danger' : 'interactive.primary')`) as the
  now-fixed Button above, no longer a hardcoded white. Not independently
  re-measured for the specific checked-icon-on-fill ratio this run, so marked
  narrowed rather than resolved — re-verify the exact number next run.
- **STILL OPEN, narrowed — DEFERRED-004**: the `marker.tsx`/`spinner.tsx`
  raw-Tailwind-class sub-item is resolved — `grep` for hex literals or
  `text-gray-*`/`bg-gray-*` classes in both files returns zero, consistent
  with `roles:check:strict`'s and the palette gate's live 0-violation count
  in `ui/` source. The broader Badge/Chip/Alert solid-status-variant and
  Tooltip-info-tone question was not re-swept this run; carried forward.
- **RESOLVED — DEFERRED-014**: `src/components/ui/date-picker.tsx` is tracked
  (`git log -1` → `628fc18`), `git status --short` clean on both the
  component and its story.
- **STILL OPEN (now 4+ runs) — DEFERRED-015**: `scripts/export-figma-variables.js:31`
  still prints the stale Figma file key `NlOtqWmmgMyHdxB0T8bR7d`; the active
  library key in `figma.config.json` is `uWlcofRor5Dik8LBnJbIjo`. Unchanged
  since `fe725d7` (2026-03-13) — over 7 months now.
- **SUBSTANTIALLY RESOLVED — DEFERRED-016**: `data-table.tsx` now has a real
  `showFooter`/`stickyFooter` prop pair that renders a `<tfoot>` (via
  `table-primitives.tsx`'s `TableFoot`) from each column's `footer` — this was
  "zero implementation, only a plain `colSpan`" as of 2026-09-05. Not yet
  found: a named `sumFooter()` helper or `rowSpan`-based grouped-header
  support — `grep` for `sumFooter`/`rowSpan` in `data-table.tsx` returns
  nothing, so that half of the original plan is still outstanding.
- **RESOLVED — DEFERRED-017** (token-count bookkeeping drift): the live
  `token_doc_accuracy` governance metric reports **0 off**, and
  `.claude/rules/tokens.md` states 156 primitives / 79 semantics / 62 roles —
  an exact match to `ds:score`'s live `metrics.primitives/semantics/roles`
  (156/79/62). `CLAUDE.md` itself no longer states specific counts (moved to
  the rules file), removing the three-document drift this item tracked.
- **RESOLVED/SUPERSEDED — DEFERRED-013** (no automated component-coverage
  generator): `ds-health-score.js` (`npm run ds:score`) now computes
  test/story/prop-docs/ref-forwarding/taxonomy coverage automatically on every
  run, backed by `docs/tasks/readiness-backlog.json` and 4 propose-only
  subagents (`ds-backlog-pilot`, `ds-metric-closer`, `ds-gate-author`,
  `ds-code-connect-mapper`) that measure and work the backlog. This supersedes
  the manual `SHADCN_MIGRATION_STATUS.md`-only approach this item originally
  flagged.
- **NEW — DEFERRED-021**: AGENT-1's named defect list ("six legacy Code
  Connect mappings point at deleted or deprecated MUI components") is
  unresolved even though the aggregate `code_connect_coverage` metric has
  cleared its target (65% vs. a 51% target). Confirmed live: `src/figma/MegaMenu.figma.tsx`,
  `Snackbar.figma.tsx`, `SideNavigation.figma.tsx`, `Radio.figma.tsx`,
  `TextField.figma.tsx`, and `ChartMetricCard.figma.tsx` all still exist and
  still reference those legacy MUI components by name — the metric improved
  by mapping other, better-chosen components, not by fixing the ones
  explicitly named as wrong.
- **NEW — DEFERRED-022**: `docs/SHADCN_MIGRATION_STATUS.md` (last touched
  `3b6b49b`, 2026-09-22) is now stale **in the optimistic direction** — it
  describes `Checkbox` and `Divider`/`Modal`/`StatusCard` as still-present
  legacy MUI directories (the first under "kept alongside shadcn", the latter
  three under "retitled 12" as of 2026-09-22), but none of the four exist in
  `src/components/` any more; real cleanup happened that the doc never caught
  up to. Unusual for this report to flag a doc as *behind* good news rather
  than overstating progress, but it's still inaccurate and worth a refresh.
- **Re-confirmed unchanged**: DEFERRED-005 (`CarouselSection.module.scss`
  still hardcodes `$gutter-xs: 16px; $gutter-md: 32px;`, no 48px tier, lines
  59-60 unchanged), DEFERRED-012 (this run was manually triggered, same as
  every prior run — no recurring schedule exists yet).
- **DEFERRED-006 reframed**: the original "`text.inverse`-on-`surface.accent`"
  framing is stale — `text.inverse` no longer appears in `mega-menu.tsx` at
  all (the role was deprecated in the 2026-10-09 pass, per that Changelog
  entry). But the underlying problem persists under new evidence:
  `mega-menu.stories.tsx` is one of the 5 `src/components/ui/**` files still
  in the live dark-mode-ratchet baseline (confirmed via `npm run test:dark`),
  i.e. it fails dark-mode axe contrast today. Keeping this item open under
  the dark-mode-ratchet evidence rather than the old role name.
- **CI workflow count has changed and was stale in this agent's own baseline**:
  **10 active** (`chromatic.yml`, `ci.yml`, `commitlint.yml`, `contrast.yml`,
  `dark-mode.yml`, `deploy-storybook.yml`, `figma-code-connect.yml`,
  `governance.yml`, `npm-install.yml`, `publish-package.yml`) + **3 disabled**
  (`deploy.yml.disabled`, `lighthouse.yml.disabled`, `vercel-deploy.yml.disabled`)
  — up from the "7 active" figure this agent's own standing brief still
  states. `vercel-deploy.yml.disabled`'s trigger block is still fully
  commented out, unchanged.
- **Doc sprawl**: 6 root `.md` files (`CHANGELOG.md`, `CLAUDE.md`,
  `DESIGN.md`, `README.md`, `README.package.md`, `SECURITY.md` — down from 8;
  `CONTRIBUTING.md` and `story-ui-considerations.md` moved/removed since the
  last count), 116 under `docs/` (68 in `docs/archive/`) = 122 total, up from
  99 at the last full count (2026-09-05). `npm run docs:check-sprawl` passes
  clean — growth is within the allowlisted structure, not root sprawl.

## Changelog — 2026-10-10 (backlog pass — governance + dev readiness)

Resolve pass against the readiness backlog, each task verified independently
(not just metric-moved). **`ds:score` 73 → 79.** Goals: governance **98** (was
85), development **69** (was 63), global 78, agentic 75.

- **AGENT-3 — gate self-tests 7/17 → 16/17.** The 9 unproven gates now each
  prove they can go red: file-drop probes for the scanning gates (docs-sprawl,
  deprecations, registry) and built-in `--selftest` for the fixed-file ones
  (contrast, token-variables, figma-drift, figma-semantic-drift) plus two that
  run a real build (package-css, package-types). Re-verified by hand that the
  contrast self-test goes red when its fail-counter is disabled. (16/17 not
  17/17 is a documented heuristic artifact — `varsync`'s marker is "selftest"
  not "self-test", and it serves as the metric-selftest's uncovered-gate fixture.)
- **DEV-2 — ref forwarding 41/118 → 66/118.** 25 load-bearing components now
  forward a ref to the correct element. Caught a real published-`.d.ts` defect
  (`QuestionnaireInput` + forwardRef inlined a `node_modules` path; `tsc` alone
  missed it, `pkg:types:check` caught it). Declined to pad on generics /
  bare-aliases / display-only components.
- **DEV-1 + DEV-4 — prop docs 77/118 → 97/118.** Real per-prop JSDoc + named
  `*Props` types on 20 components; the metric self-test confirms they're real,
  not hollow. No prop API changed.

**Not gamed — metric blind spots found and reported** (for a future
`ds-gate-author` regex fix, not worked around): `prop_docs` can't match
hyphenated `aria-*` props or `*Options`-suffixed type names, so some genuine
docs are invisible to it.

**Still open:** GLOBAL-2 (RTL, 5/100 — needs a product decision on whether Marsh
ships RTL); the generic DataGrid/DataTable ref family (largest remaining
unref'd block, needs a documented generic-forwardRef pattern); DEV-3
(type-check tests) and GLOBAL-3 (i18n strings), both metric-less. **Security:
the leaked `sk-proj-…` key is gitignored/untracked now, but the value remains
in pre-`695d58c` history — revocation (provider dashboard, user action) is the
only real fix; history-rewriting is not advised.**

## Changelog — 2026-10-09 (token-foundation hardening)

An explicit "resolve it" pass, not read-only: items below are landed and
verified, each measurement from a command run in this pass. **`ds:score` 73/100**
(dev 63 · governance 85 · global 78 · agentic 75).

**Token foundation — two legacy ramps retired, drift closed, enforcement completed:**

- **`gray` family removed (178 → 158 primitives).** The warm/green-tinted ramp
  was retired onto the pure R=G=B `neutral` scale; the four live semantics
  (`surfaceAccent`, `surfaceAccentStrong`, `interactiveDisabled` bg/fg) repointed
  to the nearest neutral, lightness preserved. This independently matches the
  Figma DTCG review's "build dark on the neutral scale, not the warm ramp."
- **`crimson` family removed (158 → 156).** The legacy 2-stop destructive ramp
  had nowhere to point for a full state ladder (critical hover == default);
  danger hover/active migrated onto the 14-stop `red` scale (red950/red1000).
- **`on-*` family completed (55 → 57 roles).** Added `text.onSuccess`/
  `text.onWarning`; `badge`'s solid variants stopped borrowing
  `text.onInteractive`/`onLight` proxies. Zero visual change, verified AA.
- **shadcn↔role drift fixed + gated.** `--primary`/`--accent-foreground` were
  `#002c77` while their role `interactive.primary` resolved to `#000f47` — two
  primary blues in one UI. Realigned to `#000f47`; new **`varsync:check`** gate
  (self-proving) asserts every annotated Tailwind var matches its role.
- **Tailwind default-palette leak gated.** `bg-red-500`/`text-gray-100` etc. in
  `ui/` source now fail `roles:check:strict` (`roles-palette` rule + self-test);
  source was clean, so it ratchets. With `varsync`, both colour-edge holes closed.
- **`text.inverse` deprecated** → `text.onAccent` (redundant alias, 0 consumers).

**Governance:** gate self-test harness now proves **7** gates can fail (added
`roles-palette`); `token_doc_accuracy` 0 off (counts corrected to 156/74/57);
1134 unit tests green; `governance:ci` green.

**Investigated, deliberately NOT changed:** the DTCG review's "~105 unreachable
primitives ⇒ delete" is a false lead for the code side — those are the
intentional palette (full colour ramps kept for parity + a documented
alpha/overlay ramp, `shadesWhite10` live in `borderSubtle`). Dark mode is sound
(one clean `semanticDarkOverrides` axis on the neutral ladder). Both recorded in
[`tasks/token-authority-decision.md`](./tasks/token-authority-decision.md).

**Still open (trigger-gated or non-token):** naming convergence + Figma↔code
binding + resolver (await a trigger); the live `sk-proj-…` key in
`agents/design-system-agent/.env` (user action); Code Connect tail (47/71).

## Changelog since previous run (2026-09-05)

Unlike previous runs, this one was **not read-only** — it was an explicit "resolve everything" pass, so the items below are fixes landed and verified, not proposals. Every measurement is from a command run in this pass.

**All three Top Priorities from the 2026-09-05 run are now resolved.**

- **RESOLVED — Priority #1** (`npm test` the sole red CI gate, 4/245 snapshot failures): the full unit suite is green — **421/421 across 63 files**. The `gold750`/`interactiveDanger`/`text.onInteractive` snapshot drift was re-baselined and committed. No gate on this branch is red: `tsc -b`, `lint`, `docs:lint`, `tokens:check`, `roles:check:strict` and `build` all exit 0.
- **RESOLVED — Priority #2** (`test:coverage` couldn't emit a coverage table at all): it runs and reports. Baseline is now a real number instead of "dark": **32.23% statements / 49.91% branches / 17.04% functions**. Low, but measurable and trackable — which it was not for two consecutive runs.
- **RESOLVED — Priority #3, substantially** (test coverage vs story coverage): the previously-reported "8/71 files tested (11.3%)" conflated two things. Stories run as real browser tests via the `storybook` Vitest project, so a component with a story is not untested. Counting components with **neither** a unit test nor a story — the genuine blind spot — the gap was **8**, and is now **2**. New unit tests for `input`, `textarea`, `spinner`, `input-group`, `toast`, `notifications-drawer` (+55 assertions). The remaining 2 (`data-table-faceted-filter`, `data-table-sort-list`) are internal sub-components with no standalone public API and are covered through `DataTable` instead, which is the better seam.

**Newly found and fixed this run:**

- **Branch topology.** `main` had been abandoned since 2026-08-31 while `feature/shadcn-ui-migration` carried 152 commits of real work — so a fresh clone got five months of stale code and CI's `branches: [main]` PR triggers pointed at a dead branch. Merged (one conflict, in this very file, resolved to the newer 2026-09-05 run). `main` is now the trunk and is protected by two rulesets (`main-1`: restrict deletions + block force pushes; `main-2`: require PR + status checks, one bypass actor).
- **Production vulnerabilities: 9 → 0.** Three parts: upgraded the two direct vulnerable deps within their existing semver ranges (dompurify 3.4.5 → 3.4.15, which backs `src/utils/security/sanitizer.ts`, and react-router-dom 7.15.1 → 7.18.4); removed five dependencies imported nowhere (`@toolpad/core` ~10MB, `bootstrap`, `@tanstack/react-virtual`, and the obsolete `@types/dompurify` / `@types/react-router-dom` stubs); and moved `style-dictionary` and `sass` from `dependencies` to `devDependencies`, where they belong — both are build-time only and were the sole source of the last three "production" advisories. Total across dev tooling is 65 (from 70); the remainder are dev-only (`@vitest/browser`, `tar`, `shell-quote`) and reach neither users nor the published package.
- **`npm audit fix` is unusable in this repo** — it crashes with an internal arborist error (`Cannot read properties of null (reading 'edgesOut')`) before mutating anything. This is almost certainly what damaged `node_modules` on an earlier attempt in a prior session. Use targeted upgrades. Worth knowing before anyone reaches for it.
- **Style Dictionary emitted a collision warning on every single build** ("token collisions were found; output may be unexpected") for both `dist/tokens.json` and `dist/theme.css`. Cause: with no name transform configured, token names derive from the last path segment only, collapsing `role.color.text.primary` and `role.color.interactive.primary` to `primary` — 8 collision groups per platform. The names were always discarded (the `legacy/*` formats rebuild from `options.originalValues` and never read `token.name`), so it was cosmetic — but nothing said so, and it was the first thing a new contributor saw. Fixed by making names unique (`name/camel`), not by silencing. Output verified byte-identical to a pinned baseline.
- **`dist/tokens.json` churned on every commit.** `meta.generated` was a wall-clock timestamp and the pre-commit hook runs `tokens:build` every time, so 5 of the last 10 commits touching that tracked artifact changed nothing else. Harmless solo; with several contributors it is a guaranteed merge conflict on every branch, over a value nothing in the repo reads. It now records when the artifact's *content* last changed. Verified: three consecutive builds produce zero git drift, and a real token change still moves it.
- **8 broken internal doc links**, all on the day-one onboarding path (`README.md`, `docs/CONTRIBUTING.md`, the token request process). Every target existed — the links were malformed (a leading `/` makes GitHub resolve against site root, not repo root). Sweep now reports 0.
- **`InputGroupButton` a11y footgun.** It defaulted `iconOnly` to true unconditionally, and `Button` renders `{iconOnly ? iconOnlyNode : children}` — so `<InputGroupButton>Save</InputGroupButton>` silently produced an empty button with no accessible name and no warning. All three existing call sites pass `icon` + `aria-label` and were unaffected, so this was latent rather than live. Now defaults from whether children are present; two regression tests guard both directions.
- **commitlint's `scope-enum` warned on routine work** — `deps`, `release`, `repo` and `security` were all missing, so every dependency commit and every `chore(release)` that `commit-and-tag-version` generates *itself* produced a warning on an otherwise conventional message. Widened; severity stays 1 (warn), so it remains guidance rather than a gate.

**Cold-start verification** (a fresh `git clone` of `main` into a clean directory, to test what a new developer actually experiences): `npm ci` exit 0 · dev server ready in 446ms, HTTP 200 · 366/366 tests at the time · `build-storybook` exit 0 · `build:package` exit 0 (emits `index.mjs` + `index.cjs` + `index.d.ts`). Node engine (`>=22 <23`) matches. Consumption surface: 77 exports from `src/index.ts`, 75 items in `registry.json`.

**Still open, carried forward:**

- **`.env` secrets remain readable in git history** — three commits (`6515c4c9` 2025-10-05, `ff46b8b6` 2026-05-21, `364c5bf1` 2026-06-23) carry live-shaped OpenAI and Figma credentials. `695d58c` stopped tracking the file, but history is intact, and **the keys have not been confirmed rotated**. This is the single highest-severity open item, and it becomes materially worse the moment a collaborator is added — repo access is history access. Rotation is the fix; history scrubbing is optional cleanup afterward and not a substitute.
- **`.github/CODEOWNERS` names a single personal owner on every path**, including `/src/tokens.ts`, `/src/theme/` and `/scripts/`. Its own comment calls this "a bus factor, not a review process". Unchanged, and now the blocking constraint on onboarding a second developer.
- **Branch protection does not actually enforce on this plan** — GitHub gates ruleset enforcement on private repos behind Team/Enterprise. The rulesets are configured and will activate on the move to a Marsh org (see `docs/MAINSTREAM_REUSE_ASSESSMENT.md`); until then CI is advisory, not blocking. Verify enforcement at migration.
- **Accessibility gating — the previous two runs' description of this was wrong, and this run repeated it before checking.** Corrected against the actual config:
  - **Static a11y linting is already enforced in CI.** `eslint-plugin-jsx-a11y` is *not* "absent from `eslint.config.js`" — `jsxA11y.flatConfigs.recommended` is extended at `eslint.config.js:33`, and CI runs `npm run lint`. Verified by probe rather than by reading: a scratch file with `<img>` missing `alt`, a click handler on a `<div>`, and an `<a>` without `href` produces 4 **errors** (`alt-text`, `click-events-have-key-events`, `no-static-element-interactions`, `anchor-is-valid`). The gate exists and bites.
  - **The real gap was runtime (axe) checking, and it was one word.** `@storybook/addon-a11y` is registered *and* wired into the Vitest storybook project, but `.storybook/preview.tsx` set `a11y: { test: 'todo' }` — in addon-a11y's Vitest integration `'todo'` runs the checks and reports them while never failing. That is precisely why this looked like "no gate" for three runs: the machinery was fully assembled and switched to advisory.

  Lesson for future runs: "package installed but not referenced" was inferred from a grep that didn't account for the flat-config `extends` array. Verify a gate by making it fail, not by reading config.
- **DEFERRED-002/003/004/005/006** (Button destructive dark-mode contrast, Checkbox checked+invalid, untested-pairs tail, CarouselSection padding, mega-menu contrast): not re-verified this run; carried forward per the never-silently-drop rule.
- **RESOLVED** — `src/components/ui/date-picker.tsx` is now tracked in git. It had been a complete, working component with zero commit history across two prior runs.
- **STILL OPEN (3 runs)** — `scripts/export-figma-variables.js:31` still references a stale Figma file key (`NlOtqWmmgMyHdxB0T8bR7d`) that doesn't match the actively-used library in `figma.config.json` (`uWlcofRor5Dik8LBnJbIjo`). Unchanged since `fe725d7` (2026-03-13). Cheap to fix; nobody has hit it because the script isn't on the common path — which is also why it will silently mislead whoever runs it first.

## Changelog since previous run (2026-08-28)

This run found the branch in a materially healthier state than the previous run — several hard-blocking gates that were red on 2026-08-28 are now green, verified live rather than assumed. One clean, well-scoped blocker remains and is now the sole thing keeping `ci.yml` from going green.

- **RESOLVED — DEFERRED-001** (`npm run build` fails on 7 files): re-ran `npm run build` (exit 0) and a cache-busting `npx tsc -b --force` (exit 0, 0 `error TS` matches). All 7 previously-failing files still exist and 6 of the 7 still import shadcn `Button`/`Chip`/`List` from `src/components/ui/*`, but the call sites were migrated off the MUI `sx` prop convention (e.g. `src/projects/marsh-one/components/SolutionsGrid.tsx:115` now calls `<DSButton ... style={{ flexShrink: 0 }}>`, a plain `style` prop, not `sx`). `sx={{...}}` still appears in these same files, but only on genuine MUI `Box`/`Typography` elements (e.g. `PortfolioComponentGallery.tsx:484`), which legitimately accept it. **Confirmed with a dedicated repo-wide sweep** (dispatched as a background subagent): of 122 files using `sx=` anywhere in `src`, 23 also import from `components/ui/*`; mapping every locally-imported shadcn name against the specific JSX tag it's used on found zero cases of `sx` landing on an actual shadcn element anywhere in the repo (two regex false-positives were manually verified as `sx` on a *nested* MUI `Box`/`Typography` inside a shadcn component's children/slot, e.g. `src/pages/LoginPage.tsx:251` and `src/projects/marsh-one/pages/MarshOneHomepage.tsx:167` — not on the shadcn tag itself). Also checked for compile-invisible risk: `button.tsx`/`chip.tsx` type props as `Omit<ButtonHTMLAttributes<...>>` spread onto a native `<button>`, and `list.tsx`/`mega-menu.tsx`/`header.tsx`/`website-header.tsx` use closed interfaces with no index signature — none forward to, or import, `@mui/material`, so passing `sx` to any of them would be a genuine `tsc` error today, not a silently-swallowed no-op.
- **RESOLVED — DEFERRED-007** (dark-mode `textOnAccent`/`interactivePrimary` contrast regression, was 1.73:1): fresh `npm run tokens:contrast:all` and `node scripts/check-contrast.js --all --json` (`totalFailed: 0`) both pass. Root cause fix confirmed in source: a new `textOnInteractive` semantic/role pair was introduced specifically for `interactive.primary/secondary/danger` surfaces, which lighten in dark mode (`interactivePrimary` dark = `tokens.blue400`/`#95caff`, `semantic-tokens.ts:160`), instead of reusing `textOnAccent` (which stays white in both modes by design for hero/accent surfaces). `textOnInteractive on interactivePrimary` now measures 18.11:1 light / 10.50:1 dark.
- **RESOLVED — DEFERRED-008** (`tokens:validate` hard-fails on `shadesWhite90` rgba regex bug): `npm run tokens:validate` now passes cleanly ("Token validation passed", with one non-fatal warning about duplicate status semantic values). The rgba-primitive parsing bug is gone from the live gate.
- **RESOLVED — DEFERRED-009 (partially — see STILL OPEN below for the remainder)**: the specific uncommitted `src/tokens.ts`/`src/semantic-tokens.ts` diff flagged last run is no longer present — `git diff HEAD --stat` shows those two files clean; the value changes (`gold750`/`brandAccent` `#ffb700`→`#ffbf00`, `interactiveDanger` `#e53935`→`#d33330`) are now committed (`git log -S"ffbf00" src/tokens.ts` → `48a6695`, 2026-09-01, "fix(tokens): close out pending focus-ring/danger-contrast token updates"). `npm run tokens:check` and `governance:report:strict` both pass clean as a result. **However the underlying vitest-snapshot drift this caused was never re-baselined and is still failing today — see STILL OPEN below, this is not a full resolution.**
- **RESOLVED — DEFERRED-010** (`AIAgentBot.tsx` 2 direct `tokens.*` violations + `check-role-usage.js` WARN/exit-1 wording mismatch): `npm run roles:check:strict` passes clean (0 violations). `grep -n "tokens\.\|semanticColors\." src/components/AIAgentBot/AIAgentBot.tsx` only matches JSDoc comments (`tokens.blue750` mentioned in a header comment describing the Figma reference), not live code. Separately, `scripts/check-role-usage.js:76` now reads `` `Role usage check: ${strict ? 'FAIL' : 'WARN'} — ...` `` — the wording now tracks the `--strict` flag instead of always saying "WARN", so the console message and exit code no longer disagree.
- **RESOLVED — DEFERRED-011** (two governance mechanisms diverged on which role-contrast pairs were enforced vs. monitored): `src/__tests__/roles.contrast.test.ts` now has an empty `MONITORED_ROLE_CONTRAST` array (comment: "none currently — see ENFORCED_ROLE_CONTRAST's history for what graduated here") and moved `text.onInteractive`/`text.onLight` pairs into `ENFORCED_ROLE_CONTRAST`, matching `scripts/report-governance.js`'s treatment of the same pairs. Both `npm test`'s `roles.contrast.test.ts` and `npm run governance:report:strict` are now green on the same pair set (vitest's list is now a strict superset — it also enforces `focus.ring` pairs and `text.primary`/`surface.accent` that governance's rollup doesn't separately list — but there is no longer a pair that's enforced in one and merely monitored in the other).
- **STILL OPEN (2 runs) — DEFERRED-009 (the vitest-snapshot half)**: `npx vitest run` still fails exactly 4/245 tests across 2 files (`roles.snapshot.test.ts`, `tokens.snapshot.test.ts` ×3), unchanged in shape from last run: `gold750`/`brandAccent` `#ffb700`→`#ffbf00`, `interactiveDanger` `#e53935`→`#d33330`, and now also a **new, uncommitted** `text.onInteractive`/`text.onLight` role-pair addition (`git diff HEAD -- src/theme/roles.ts` shows +4 lines, uncommitted, adding these 2 roles to the `RoleName` union and `ROLE_MAP` — this is genuinely new WIP layered on top of the already-committed 2026-09-01 token change). `npm run test:coverage` still does not emit a coverage table or `coverage/` directory while these snapshots fail (re-confirmed this run, same as last time) — coverage reporting remains blocked, not just degraded. **This is now the single thing keeping `ci.yml` from being green** (see Top Priorities).
- **NEW**: `ci.yml`'s `npm test` step is the *only* remaining red gate on this branch. With `tokens:check`, `roles:check:strict`, `governance:report:strict`, `docs:lint`, and `npm run build` all now confirmed passing, a PR opened from this branch today would fail CI solely on the 4 vitest snapshot mismatches above — a narrower, better-understood failure surface than the 4-cause pileup from the last run.
- **STILL OPEN (2 runs) — DEFERRED-002/003/004/005/006** (Button destructive-variant dark-mode contrast gap, Checkbox checked+invalid contrast, the broader untested-pairs tail, CarouselSection padding, mega-menu contrast): not independently re-verified line-by-line this run except CarouselSection (re-confirmed below) and Button's primary-variant hex (re-confirmed below); carried forward unchanged per the "never silently drop" rule. Re-verify each explicitly next run.
- **RESOLVED (re-confirmed)**: `docs/GRID_SYSTEM.md`'s 24px gutter (`$grid-gutter-width: 1.5rem` at `src/styles/_grid.scss:14`) still matches; no contradiction reappeared. Doc sprawl stable: 8 root + 91 `docs/**` = 99 `.md` files total (was 98 last run, +1; 60 of the 91 are still in `docs/archive/`).
- **CONFIRMED STILL OPEN, UNCHANGED**: `src/components/ui/date-picker.tsx` + `date-picker.stories.tsx` remain fully untracked (`git status --short` → `??`) — a complete, working component with zero commit history. `Button.tsx`'s primary-variant hover/active hex (`#082d9e`/`#0b4bff`, `src/components/ui/button.tsx:24,39,44`) is unchanged and still doesn't match any role token. `scripts/export-figma-variables.js` still references a stale Figma file key (`NlOtqWmmgMyHdxB0T8bR7d`, line 31) that doesn't match the actively-used library in `figma.config.json` (`uWlcofRor5Dik8LBnJbIjo`) — unchanged since commit `fe725d7` (2026-03-13). `data-table.tsx` still has zero `<tfoot>`/`showFooter`/`sumFooter()` implementation (only a plain `colSpan` on an empty-state row, `data-table.tsx:246`) — the proposed grouped-header/footer plan remains entirely unimplemented.
- **NEW finding on a claim in this run's briefing** (recount requested): CLAUDE.md's token-count callouts (`src/tokens.ts` 167 / `src/semantic-tokens.ts` 63 / `src/theme/roles.ts` 44 — lines 30, 39, 47, 70, 109, 155, 1084) already match a **precise fresh count** (`npx tsx` import + `Object.keys().length`: 167 primitives, 63 semantics; role count via `RoleName` union parse: 44 in the *working tree*, 42 at committed `HEAD`) — so CLAUDE.md is not stale on this specific claim, contrary to this run's briefing description of it as documenting "141/71/60+". However, CLAUDE.md's number (44 roles) only matches the **uncommitted** `roles.ts` WIP (the same `text.onInteractive`/`text.onLight` addition flagged above) — the actually-committed role count is 42, matching `docs/MAINSTREAM_REUSE_ASSESSMENT.md`'s "167/62/42" figure at the time it was written (2026-08-27), which is itself now one semantic token behind (committed semantics is 63, not 62 — `textOnInteractive` was added to `semanticColors` in the 2026-09-01 commit). Net: three documents, three slightly different numbers, none of them wrong exactly, all measuring the same fast-moving target at different commits. Also stale in CLAUDE.md (unrelated to token counts): the "Frameworks & Libraries" example block's version pins (Vite `^6.3.4`, Storybook `^8.5.3`, Vitest `^3.1.1`, Sass `^1.83.5`) vs. actual `package.json` (Vite `^7.0.0`, Storybook `^10.6.0`, Vitest `^3.2.4`, Sass `^1.93.2`).

## Top Priorities (ranked by impact)

**Both of the previous run's #1 priority items — the TeamsProvider crash
breaking `npm test` + `dark:check`, and the Snackbar contrast failure — are
resolved** (see Changelog above); neither CI gate is red today. The former
#3 (`taxonomy.ts` "21% incomplete") was a false alarm, not a real gap, and
is dropped rather than carried forward (see Changelog's CORRECTED entry).
With no red gate left, the ranking below shifts to the largest remaining
component-quality gaps and one governance-process gap this agent's own
history keeps surfacing.

1. **`ref_paths` (DEV-2) is stuck at 56/100 (67/120) with zero movement this
   cycle**, despite `test_coverage` and `story_coverage` both moving. This is
   now the single metric furthest from its own backlog target (76) with the
   least recent progress of the three component-quality metrics — a consumer
   still cannot focus, measure, or position roughly half of `ui/`'s modules.
   The `DataGrid`/`DataTable` generic family remains the largest unref'd
   block and needs a documented generic-forwardRef pattern before it can move.
2. **`rtl_readiness` (GLOBAL-2) has moved zero points across at least three
   full backlog cycles** — still 4 logical / 73 directional spacing properties,
   unchanged since first measured. The backlog itself says this is blocked on
   a product decision (does Marsh ship RTL at all), not on effort; that
   decision, not more measurement, is the actual next step.
3. **The report-PR pipeline this agent depends on is not closing the loop.**
   Four `chore/ds-health-report-*` branches now exist (`2026-09-05`,
   `2026-09-26`, `2026-10-08`, `2026-10-15`); only the oldest ever became a PR,
   and that PR (#2) is now so stale it would regress `main` backward if merged.
   Three runs' worth of real, verified findings are sitting on branches no
   human has been asked to review. This run's own update continues that
   pattern by explicit operator instruction (see "Process note" above) — which
   makes it four for four, not a one-off.

## 1. Production Readiness

### Build & type-check
`npm run build` (`tsc -b && vite build && tokens:build`) — **PASS**, re-run
fresh this pass (exit 0, Style Dictionary + Vite both completed with no new
warnings). The 7-file MUI-`sx`-on-shadcn failure list this agent's own
standing brief describes as the baseline still doesn't reproduce anywhere in
this repo (last independently confirmed gone on 2026-08-28).

### Governance / token / role gates
Ran every gate live this pass, not just the aggregate:

| Gate | Command | Result |
|---|---|---|
| Full governance suite | `npm run governance:ci` | **PASS**, exit 0 — runs `tokens:build`, `typecheck:tests`, `governance:report:strict`, `roles:check:strict`, `props:check:strict`, `composition:check:strict`, `zindex:check`, `radius:check`, `varsync:check`+selftest, `tokens:check-vars`+selftest, `tokens:contrast:selftest`, `tokens:check-figma(-semantic):selftest`, `pkg:css/types:selftest`, `deprecations:check`, `registry:check`, `gates:selftest`, `metrics:selftest`, `dark:selftest` — 21 steps, all green |
| Token build+diff+validate+contrast | `npm run tokens:check` | **PASS** — "No token changes detected"; `tokens:validate-dtcg` checks 449 tokens clean; `tokens:contrast:all` — every enforced pair passes both modes, 6 informational-only WARN rows (`borderSubtle`, `textOnAccent`/`textDisabled`/`interactiveDisabledFg` on their respective surfaces, 5 `chartSeries*` pairs) |
| Role usage (strict) | `npm run roles:check:strict` | **PASS** — 0 violations. 113 hex literals / 9 Tailwind-palette hits remain, all in legacy `[A-Z]*`/stories/tests (advisory by design, not `ui/` source) |
| Governance rollup (strict) | `npm run governance:report:strict` | **PASS** — `roleUsage.count: 0`, `roleContrast.enforcedFailures: []` (18 enforced pairs, all pass both modes) |
| Docs lint | `npm run docs:lint` | **PASS** — "6 root .md file(s), all allowlisted" |
| Gate self-tests | `npm run gates:selftest` | **PASS** — 11 named probes each catch a deliberate violation (`roles`, `roles-hex`, `roles-palette`, `composition`, `radius`, `zindex`, `props`, `props-declaration`, `docs-sprawl`, `deprecations`, `registry`) |
| Metric self-tests | `npm run metrics:selftest` | **PASS** — 17/17 metrics discriminate in both directions (a real change moves them; an unrelated change doesn't) |
| Dark-mode ratchet self-test | `npm run dark:selftest` | **PASS** (logic probe only — see `npm run dark:check` below for the live run) |
| Full unit+interaction suite | `npm test` (= `vitest run`, all projects) | **PASS** — **1936/1936 tests, 242/242 files** (was 11/1856 failing, 3/226 files, on 2026-10-15 — DEFERRED-018/019 both fixed) |
| Live dark-mode browser run | `npm run dark:check` | **PASS** — 17 files failing, 17 in baseline, exit 0, "No new dark-mode regressions" (was 19 failing / 2 NEW / exit 1 on 2026-10-15) |
| Type-check the test files | `npm run typecheck:tests` | **PASS** — exit 0, silent (no new rot) |

**Spot-checking that a gate can actually fail** (per this agent's own
standing requirement): `gates:selftest`'s 11 probes and `metrics:selftest`'s
17 probes both ran again this pass and both still pass in full. Not
independently re-run this pass: `test:coverage`'s percentage breakdown (the
2026-10-15 figures — 65.58%/85.64%/71.61%/65.58% stmt/branch/fn/line — were
not re-measured live this narrow delta pass; `npm test` above covers the same
1936 tests without the coverage instrumentation, so the pass/fail result is
current but the percentages are carried forward, not re-verified).

### CI & deploy pipeline
**Workflow count has changed since this agent's own standing brief, and
since the last accurate count in this file (2026-09-05): 10 active**
(`chromatic.yml`, `ci.yml`, `commitlint.yml`, `contrast.yml`, `dark-mode.yml`,
`deploy-storybook.yml`, `figma-code-connect.yml`, `governance.yml`,
`npm-install.yml`, `publish-package.yml`) **+ 3 disabled**
(`deploy.yml.disabled`, `lighthouse.yml.disabled`, `vercel-deploy.yml.disabled`).
`vercel-deploy.yml.disabled`'s trigger block (`# on: / #   push: ...`) is
still fully commented out, header still reads "Temporarily disabled until
Vercel secrets are configured" — app deploys still ride on Vercel's own
dashboard git integration, not this repo's CI.

`ci.yml`'s step order (`docs:lint` → `lint` → `tokens:check` → (cache
Storybook/Vite prebundle) → `npm test` → `a11y:gate:check` → `build` →
`build:package` → `size` → `npx shadcn registry validate` → `registry:check`
→ (PR-only) `build-storybook`) was read in full on 2026-10-15 and not
re-read this pass, since the only thing that changed is that `npm test` — the
step that was blocking everything after it — now passes. **A PR opened from
this branch today would clear `ci.yml`'s `npm test` step and, on the strength
of the other live confirmations below, the whole pipeline.**

`governance.yml` (`npm run governance:ci`) — **PASS**, confirmed live above.
`contrast.yml` (path-scoped, fails on `check-contrast.js --all --json`'s
`totalFailed > 0`) — **PASS**, confirmed live (0 failures, re-run this pass).
`dark-mode.yml` (`npm run dark:check`) — **PASS**, confirmed live this pass
(was the other red gate on 2026-10-15; see Changelog).

### Readiness backlog reconciliation (`docs/tasks/readiness-backlog.json` vs. live `ds:score`)
The backlog file was last measured at `04b0bfa` (2026-10-08, rubric v4) and
explicitly warns "v3 and v4 are NOT comparable" and "re-measure rather than
trusting these" — advice this run follows literally, task by task, against
today's rubric-v5 numbers:

| Task | Backlog (current → target) | Live today | Verdict |
|---|---|---|---|
| GLOBAL-1 expression_reach | 0 → 100 | 100 (`yes`) | **RESOLVED** (`74656af`) |
| AGENT-2 contracts_emitted | 0 → 100 | 100 (`emitted`) | **RESOLVED** (`bbd22d6`) |
| GOV-2 metric self-tests | none → n/a | `metrics:selftest` exists, 17/17 pass | **RESOLVED** (`74656af`) |
| AGENT-3 gate_selftests | 40 (6/15) → 100 | 94 (17/18) | **Substantially resolved** — target not hit exactly, but the "1 missing" is `check-metric-selftests.js` itself being counted as an uncovered gate, a categorization artifact, not a real gap (governance.md: "all 17 non-harness gate scripts are covered as of 2026-10-11") |
| DEV-1 prop_docs | 65 → 76 | 82 (98/120) | **RESOLVED**, target cleared |
| DEV-3 typecheck tests | no metric | `typecheck:tests` exists (added 2026-10-10), folded into `governance:ci`, passing | **RESOLVED** — but the backlog file itself was never updated to say so |
| AGENT-1 code_connect_coverage | 25 → 51 | 65 (47/72 mappable) | **Metric target cleared, but the task's own named defect is not** — the 6 explicitly-called-out stale mappings (MegaMenu/Snackbar/SideNavigation/Radio/TextField/ChartMetricCard pointing at deleted/legacy MUI) all still exist unchanged; the metric improved by mapping other components instead. See DEFERRED-021. |
| DEV-2 ref_paths | 35 → 76 | 56 (67/120) | **STILL OPEN** — real progress (+21 pts), well short of target |
| DEV-4 hollow prop docblocks | folded into prop_docs | spot-checked 12 of the original 14 modules now carry a docblock immediately above their `Props` interface (`spinner`, `toggle`, `command`, `empty`, `field`, `popover`, `questionnaire`, `scroll-area`, `sheet`, `table-primitives`, `toaster`, `toggle-group`); `calendar` and `label` still show none. The 3 modules flagged separately as "already hollow before any patch" (`progress`/`select`/`slider`) are only partially fixed — e.g. `slider`'s docblock sits between the interface and the component, documenting the component rather than individual props, which is exactly the placement DEV-1's own acceptance criteria says doesn't count. | **PARTIALLY RESOLVED** |
| GLOBAL-2 rtl_readiness | 5 → 80 | 5 (4/73) | **STILL OPEN, zero movement** |
| GLOBAL-3 i18n metric | no metric (task itself says "add the metric first") | no global-goal metric beyond `expression_reach`/`typo_scope_free`/`rtl_readiness` | **STILL OPEN, unchanged** |
| DEV-6 radius remap | not metric-bound | `radius:check` still enforces the *old* stock scale (confirmed live: "Stock Tailwind scale, no override: md=6px · lg=8px · xl=12px · 2xl=16px") | **STILL OPEN, unstarted**, exactly as the backlog describes |
| DEV-5 toast/alert icon foundation | marked `"status": "done"`, completed 2026-10-12 | not independently re-verified pixel-for-pixel this run; taken on the backlog's own commit citations (`37b5b97`, `625afc0`, `f4a1c34`, `15c56c3`) | **Reported done, not independently re-verified** |

**Not re-measured this pass** — none of today's six commits touched a
backlog-tracked metric (`expression_reach`, `contracts_emitted`, `gate_selftests`,
`prop_docs`, `code_connect_coverage`, `ref_paths`, `rtl_readiness`). The table
above is carried forward unchanged from 2026-10-15; today's movement was
entirely in `test_coverage`/`story_coverage`, which aren't backlog-tracked
tasks at all (see Changelog).

### Spot-check: can the gates actually fail?
Already covered under Governance gates above via `gates:selftest`/`metrics:selftest`
(28 total probes, all passing) and a live `dark:check` failure. This is a
materially stronger answer to "is a green gate meaningful" than any prior
run of this report could give.

## 2. Component Quality

### Test coverage
`ds-health-score.js`'s recursive file-walk (the authoritative count, confirmed
via a fresh `ds:score --json` run this pass) reports:

- **120 implementation modules** in `src/components/ui` — unchanged this pass
  (no new `ui/` module was added or removed by the six commits this run).
- **77 with a dedicated `.test.tsx`/`.test.ts` (64%)** — up from 64/120 (53%)
  on 2026-10-15. **+13 net**: 15 new/extended test files landed
  (`error-state`, `breadcrumbs`, `empty`, `marker`, `aspect-ratio`,
  `collapsible`, `field`, `hover-card`, `list`, `metric-card`, `pagination`,
  `slider`, `text-field`, plus `sparkline` and `spinner`, which already had
  thin test files and were extended rather than net-new — hence 13, not 15,
  moving the `withTest` count).
- **80 with a `.stories.tsx` (67%)** — up from 77/120 (64%). **+3**: `spinner`,
  `error-state`, `sparkline`.
- The 7-file neither-test-nor-story blind spot named on 2026-10-15
  (`data-grid-pagination`, `data-grid-table`, `data-grid-toolbar`,
  `data-table-faceted-filter`, `data-table-sort-list`, `error-state`,
  `table-primitives`) shrinks by one: `error-state` now has both a test and a
  story. Not independently re-swept for the other 6 this pass.

`npm run test:coverage`'s percentage breakdown (65.58% statements / 85.64%
branches / 71.61% functions / 65.58% lines as of 2026-10-15) was **not
re-run this pass** — see the Governance table note above. `npm test`
confirms the 1936 tests (up from 1856 + the 15 new files' worth of
assertions) all pass, but the coverage-instrumented percentage is carried
forward, not re-measured.

### Story coverage
67% (80/120) by the live `ds:score` count, up from 64% (77/120). The
`filters/` subdirectory gap named on 2026-10-15 (10 of ~14 files without a
story — schema/hook/type modules, not yet individually triaged for whether
they need one) is unchanged; none of today's 3 new stories touched `filters/`.

### Accessibility enforcement
**Materially different from every prior run's description, and more real.**
`.storybook/preview.tsx`'s `a11y: { test: 'todo' }` (the finding that made
3 prior runs think the gate was silently disabled) has been fixed — the live
`a11y_enforcement` ds:score metric reads `axe:error` (errors, not advisory),
confirmed by this run's own `npm test` output: the Snackbar axe
`color-contrast` failure above is a real, blocking test failure, not a
logged warning. `ci.yml` has a dedicated `a11y:gate:check` step
(`scripts/check-a11y-gate.js`) specifically to prove the axe gate itself
hasn't gone quietly inert again — the exact failure mode this report has
caught twice before. `dark:wired` confirms dark-mode axe runs too (via
`test:dark`, independently verified failing live above). The one real gap
left in this metric: `motion:0/120` — no component in `ui/` has been checked
against `prefers-reduced-motion`, and nothing enforces it yet.

## 3. Project Organization & Structure

### Status-doc accuracy & staleness
`docs/SHADCN_MIGRATION_STATUS.md` (last touched `3b6b49b`, 2026-09-22, now 23
days old) is stale in an unusual direction — **behind good news, not ahead of
it.** It documents `Checkbox` as one of 3 components deliberately kept
alongside shadcn, and `Divider`/`Modal`/`StatusCard` as 3 of 12 components
"retitled" (not deleted) as of that date. None of the four exist in
`src/components/` today — confirmed via a full directory listing. Real
cleanup landed since 2026-09-22 that this doc never caught up to.
`Checkbox`'s companion `Chip` *is* correctly described in the same doc as
already deleted (zero consumers) — so the doc is only stale on the one
component, not internally contradictory about the pattern.

`docs/MAINSTREAM_REUSE_ASSESSMENT.md` and `CLAUDE.md`'s token-count drift
(tracked for 2 runs as DEFERRED-017) is now resolved — see Changelog. CLAUDE.md
itself no longer states specific primitive/semantic/role counts (moved to
`.claude/rules/tokens.md`, which states 156/79/62 — an exact match to live
`ds:score` metrics), removing the three-document-drift failure mode entirely
rather than just re-syncing the numbers once.

### MUI removal progress
**17 legacy directories remain under `src/components/[A-Z]*`** (`AIAgentBot`,
`AIAssistantChat`, `Button`, `CardWebsite`, `ChartMetricCard`, `DataGrid`,
`ErrorBoundary`, `Header`, `IntroLoader`, `MegaMenu`, `NotificationsDrawer`,
`Paper`, `Radio`, `Section`, `SideNavigation`, `Snackbar`, `TextField`),
**63 files total, of which 27 (43%) still directly `import ... from '@mui'`.**
`AIAgentBot` is a notable exception — 0 of its 3 files import MUI despite
sitting in the legacy-named directory, suggesting it may already be a
migration candidate nobody's re-filed. `Button` is the sole survivor of the
doc's original 3-component "kept deliberately alongside shadcn" list
(`Checkbox`, `Chip` both now fully removed — see above). The 17 directories
do not include `Checkbox`, `Chip`, `Divider`, `Modal`, or `StatusCard`, all 5
of which `SHADCN_MIGRATION_STATUS.md` still describes as present (see above).

### Duplication / contradictions
`src/docs/35-Grid.mdx` (current/live) and `src/docs/36-GridLegacy.mdx`
(explicitly titled and scoped as the superseded system) do not contradict
each other — `36` documents a different, intentionally-retained legacy gap
scale for migration reference, not a second "current" answer. `docs/GRID_SYSTEM.md`
and `docs/grid.md` remain correctly archived (`docs/archive/`), confirmed
absent from the live doc tree. No new doc/doc contradiction found this run.

`CarouselSection.module.scss` — re-confirmed still **not** consolidated onto
the shared 16/24/48px container-padding schedule: `$gutter-xs: 16px;
$gutter-md: 32px;` (no 48px tier) remain hardcoded at lines 59-60, unchanged
since first flagged 2026-08-28. DEFERRED-005, still open.

### Doc sprawl
**6 root `.md` files** (`CHANGELOG.md`, `CLAUDE.md`, `DESIGN.md`, `README.md`,
`README.package.md`, `SECURITY.md`) — down from 8 at the last count;
`CONTRIBUTING.md` moved to `docs/CONTRIBUTING.md` and `story-ui-considerations.md`
is gone. **116 files under `docs/`** (68 in `docs/archive/`, 48 live) = **122
total**, up from 99 at the 2026-09-05 count. `npm run docs:check-sprawl`
passes clean (6/6 root files allowlisted) — the growth is inside the
allowlisted category structure (`docs/tasks/`, `docs/guides/`, etc.), not a
return of root-level sprawl.

## Suggested out-of-scope follow-up

The MUI/shadcn coexistence boundary (whether `Button` — now the sole
remaining "kept deliberately" legacy component — should eventually be
consolidated to one stack) and the broader 43%-still-importing-MUI legacy
footprint touch real architectural/module-coupling questions beyond this
audit's read-only, evidence-citing remit. If a deeper structural
recommendation is wanted, run the `improve-codebase-architecture` skill
separately.

## Tracked Deferred Items (persist until resolved)

| ID | First flagged | Status | Description |
|----|----------------|--------|-------------|
| DEFERRED-001 | 2026-08-28 | **RESOLVED (2026-09-05)** | `npm run build` fails on 7 files (shadcn `Button`/`Chip`/`List` receiving MUI `sx` props). Re-confirmed clean again 2026-10-15 (exit 0, 0 `error TS`). |
| DEFERRED-002 | 2026-08-28 | **RESOLVED (2026-10-15)** | `Button.tsx` `destructivePrimary`: now `bg-[var(--role-interactive-danger)] text-[var(--role-fg-on-interactive)]`, no hardcoded hex, dark-mode-aware. Matches live enforced-pair contrast (5.34:1 light / 6.53:1 dark). |
| DEFERRED-003 | 2026-08-28 | STILL OPEN — narrowed (2026-10-15) | `Checkbox.tsx` checked+invalid: source now routes through the same `interactive.danger` role as the now-fixed Button, no longer hardcoded. Exact checked-icon-on-fill ratio not independently re-measured this run — confirm the number next run before marking resolved. |
| DEFERRED-004 | 2026-08-28 | STILL OPEN — narrowed (2026-10-15) | `marker.tsx`/`spinner.tsx` raw-Tailwind-class sub-item resolved (0 hex/palette violations, confirmed live). Broader Badge/Chip/Alert solid-status-variant and Tooltip-info-tone question not re-swept this run; carried forward. |
| DEFERRED-005 | 2026-08-28 | STILL OPEN (6+ runs) | `CarouselSection.module.scss` still hardcodes `$gutter-xs: 16px; $gutter-md: 32px;` (no 48px tier), lines 59-60, unchanged since first flagged. |
| DEFERRED-006 | 2026-08-28 | STILL OPEN — reframed (2026-10-15) | Original `text.inverse`-on-`surface.accent` framing is stale (role no longer exists in `mega-menu.tsx`, deprecated 2026-10-09), but `mega-menu.stories.tsx` is confirmed live today as one of 5 `ui/**` files still in the dark-mode-ratchet baseline — a real, current dark-mode contrast failure under new evidence. |
| DEFERRED-007 | 2026-08-28 | **RESOLVED (2026-09-05)**, re-confirmed 2026-10-15 | `text.onAccent`/`interactive.primary(.hover)` dark-mode contrast. `governance:report:strict`'s live enforced pairs (18, all pass both modes) re-confirm this holds. |
| DEFERRED-008 | 2026-08-28 | **RESOLVED (2026-09-05)** | `npm run tokens:validate` rgba regex bug. Still clean, re-confirmed 2026-10-15. |
| DEFERRED-009 | 2026-08-28 | **RESOLVED (2026-09-05)** | Vitest snapshot drift (`gold750`/`interactiveDanger`/`text.onInteractive`). Unrelated to today's 11 `npm test` failures (TeamsProvider/Snackbar, DEFERRED-018/019) — confirmed the snapshot test files themselves (`roles.snapshot.test.ts`, `tokens.snapshot.test.ts`) are in today's 1845-passing set, not the 11 failing. |
| DEFERRED-010 | 2026-08-28 | **RESOLVED (2026-09-05)** | `AIAgentBot.tsx` role violations + script wording. Still clean. |
| DEFERRED-011 | 2026-08-28 | **RESOLVED (2026-09-05)** | Divergent enforced/monitored contrast pairs. Still unified. |
| DEFERRED-012 | 2026-08-28 | STILL OPEN (6+ runs, Tier 4, sustaining) | No recurring schedule wired up for this health-audit agent itself — this run was, again, manually triggered. |
| DEFERRED-013 | 2026-08-28 | **RESOLVED/SUPERSEDED (2026-10-15)** | No automated component-coverage generator existed. `ds-health-score.js` + `docs/tasks/readiness-backlog.json` + 4 propose-only subagents now do this automatically every run; superseded the manual-doc-only approach this item tracked. |
| DEFERRED-014 | 2026-09-05 | **RESOLVED (2026-10-15)** | `date-picker.tsx`/`.stories.tsx` untracked in git. Now tracked (`628fc18`), `git status` clean. |
| DEFERRED-015 | 2026-09-05 | STILL OPEN (4+ runs) | `scripts/export-figma-variables.js:31` still prints the stale Figma file key `NlOtqWmmgMyHdxB0T8bR7d`; active library key is `uWlcofRor5Dik8LBnJbIjo` (`figma.config.json`). Unchanged since `fe725d7` (2026-03-13, now 7+ months). |
| DEFERRED-016 | 2026-09-05 | SUBSTANTIALLY RESOLVED (2026-10-15) | `data-table.tsx` now has `showFooter`/`stickyFooter` rendering a real `<tfoot>` per-column. Still missing: a named `sumFooter()` helper and `rowSpan`-based grouped-header support (0 hits for either in source). |
| DEFERRED-017 | 2026-09-05 | **RESOLVED (2026-10-15)** | Token-count drift across 3 docs. Live `token_doc_accuracy` metric reports 0 off; `.claude/rules/tokens.md`'s 156/79/62 matches `ds:score`'s live metrics exactly; `CLAUDE.md` no longer states specific counts, removing the failure mode. |
| DEFERRED-018 | 2026-10-15 | **RESOLVED (2026-10-16)** | `ColleagueProfile.stories.tsx`/`ManageTeam.stories.tsx` lacked the `<TeamsProvider>` wrap, breaking `npm test` + `dark:check` simultaneously. Both files now import and wrap in `TeamsProvider`. Re-verified live: `npm test` 1936/1936 pass; `npm run dark:check` 17 failing/17 baseline, exit 0. |
| DEFERRED-019 | 2026-10-15 | **RESOLVED (2026-10-16)** | `Snackbar.stories.tsx`'s `containedWarning` button measured 3.98:1. Commit `0bb4943` moved it onto the DS's `status.warning.bg`/`text.onLight` role pair (5.31:1 PASS, confirmed live in `tokens:check`'s contrast table). Folded into the same `npm test` 1936/1936 green count. |
| DEFERRED-020 | 2026-10-15 | **CORRECTED (2026-10-16) — false alarm, not a defect** | The "95/120, 21% incomplete" framing compared two different units of "module": `ds:score`'s recursive file-walk (counts `filters/`'s 14 files separately) vs. `taxonomy.test.ts`'s own `componentsOnDisk()` (treats `filters/` as one directory-component). Re-ran the actual gate: `npx vitest run src/components/ui/taxonomy.test.ts` — 22/22 pass, including the literal "classifies every component that exists on disk" assertion this item claimed was failing. It was never failing. No action needed; not a real gap. |
| DEFERRED-021 | 2026-10-15 | STILL OPEN (not re-verified 2026-10-16) | AGENT-1's explicitly-named defect — 6 Figma Code Connect files (`MegaMenu`, `Snackbar`, `SideNavigation`, `Radio`, `TextField`, `ChartMetricCard`) still point at deleted/deprecated MUI components — unresolved even though the aggregate `code_connect_coverage` metric (65%) cleared AGENT-1's 51% target by mapping other components instead. Confirmed unchanged only in the sense that no commit this pass touched `src/figma/*`; not independently re-greped this run. |
| DEFERRED-022 | 2026-10-15 | STILL OPEN (not re-verified 2026-10-16) | `docs/SHADCN_MIGRATION_STATUS.md` (2026-09-22) describes `Checkbox`, `Divider`, `Modal`, and `StatusCard` as still-present legacy MUI components; none exist in `src/components/` today. Not independently re-checked this pass. |
| DEFERRED-023 | 2026-10-16 | NEW | Four `chore/ds-health-report-*` branches now exist (`2026-09-05`, `2026-09-26`, `2026-10-08`, `2026-10-15`) and none of the last three ever became a PR; the oldest's PR (#2) is now stale enough to regress `main` if merged. This run's own update continues the pattern (worktree-only, not pushed, by explicit operator instruction this run) — a human needs to either push `chore/ds-health-report-2026-10-15` and open its PR, or fold this run's findings into a fresh branch/PR, and separately close #2 without merging. |

## Commands run this pass (2026-10-16, delta-focused)

- `npm run ds:score -- --json` — rubric v5, **78/100** (dev 67 · gov 98 ·
  global 78 · agentic 74), up from 76 on 2026-10-15; full per-metric JSON
  captured and diffed field-by-field against the 2026-10-15 numbers
- `npm run build` — **PASS** (exit 0)
- `npm test` (= `vitest run`, all projects, `--reporter=dot`) — **PASS**,
  **1936/1936 tests, 242/242 files** (was 11/1856 failing, 3/226 files)
- `npm run governance:ci` — **PASS** (exit 0, all steps including
  `gates:selftest` 11/11 and `metrics:selftest` 17/17, unchanged from 2026-10-15)
- `npm run dark:check` — **PASS** (exit 0), 17 files failing / 17 in baseline,
  "No new dark-mode regressions" (was exit 1, 19 failing / 2 NEW)
- `npm run typecheck:tests` — **PASS** (exit 0, silent)
- `npm run tokens:check` — **PASS**, "Contrast validation passed", 449-token
  DTCG validation clean; specifically re-checked `textOnLight on
  statusWarningBg` for DEFERRED-019 → 5.31:1 PASS
- `git show <commit>:docs/DS_HEALTH_REPORT.md` on `bc82d65` (the 2026-10-15
  run's actual commit, found on the orphaned `chore/ds-health-report-2026-10-15`
  branch — not on `main` or on `feature/mui-removal-and-ds-hardening`) to
  recover the real prior-run baseline, since the on-disk copy on the feature
  branch is still the older 2026-10-10 version
- `npx vitest run src/components/ui/taxonomy.test.ts` — **22/22 PASS**,
  disproving DEFERRED-020
- `git show --stat` on `0bb4943`, `7d78af9`, `0f8eace`, `b50ecb9`, `aa20ddd`,
  `8cee8f9` — read every diff, not just the commit message, to verify the 15
  "new" test files are real (26–64 lines each) and not stubs, and that 2 of
  them (`sparkline`, `spinner`) were extensions of existing files rather than
  net-new
- `find`/`wc -l` reconciliation of `src/components/ui` top-level-only (.tsx)
  vs. the script's true recursive `.ts`+`.tsx` walk — confirmed the script's
  120 is correct (verified by direct recount) and that the "/94" figure in
  this run's own briefing is the older, now-superseded top-level-only method
- `git log --oneline main..feature/mui-removal-and-ds-hardening` / `git diff --stat main...HEAD`
  — 111 commits / 418 files diverged (was 390 files on 2026-10-15); `gh pr list`
  — confirms PR #2 is still the only open PR against `main`, and no PR exists
  for any of the three newer report branches
- `find src/projects/colleague-profile` — confirmed `CreateTeamDrawer`/`TeamSetup`
  tracked with stories, no test files (project-wide pattern, not a `ui/` metric)
- Dispatched no subagents this run — all checks were direct and narrow enough to
  run inline within budget.
