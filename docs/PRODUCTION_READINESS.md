# Production readiness audit

**Last audited:** 2026-10-06 · **Commit:** `3840fc2` · **Run:** 4 (see Score history) · **Auditor:** staff-level design-systems review
**Audience:** IT Development Lead, deciding whether other teams adopt this system
**Method:** three independent parallel sub-agents (areas 1/2/10, 3/4/5/7, 6/8/9), consolidated; every score-driving finding re-verified first-hand against HEAD
**Re-run with:** `/audit` (see `.claude/commands/audit.md`)

> **Scope note.** This audits the **shadcn/Radix component set** in `src/components/ui/`
> and the package built from it — the half that is published and intended for reuse.
> **The denominator moved this run: 79 → 93 modules** (94 taxonomy entries, counting
> the directory-shaped `filters/`). Fourteen modules landed in the 82 commits since
> run 3. Ratios below are therefore not directly comparable to run 3's without
> accounting for that, and where a ratio fell while the absolute count rose, this
> report says so.

---

## Score history

| Run | Date | Commit | Overall | Notes |
|---|---|---|---|---|
| 1 | 2026-09-23 | `847ceec` | **1.9 / 3** | Baseline. Packaging repaired same-day (6 blocking defects fixed). |
| 2 | 2026-09-24 | `1481270` | **2.1 / 3** | Tailwind v4 migration; composition layer added; control sizes unified. 2 of 6 P0s closed, 1 narrowed. |
| 3 | 2026-09-25 | `9dcc73a` | **2.2 / 3** | Dashboard foundations shipped. 5 of run-2's P0s closed. **Three new P0s introduced in the same window**, all because nothing validated the published artifact. |
| 4 | 2026-10-06 | `3840fc2` | **2.0 / 3** | 82 commits. Run-3's artifact P0s verified closed and holding. Substantial real gains (tests 1,295 → 1,835; interaction tests ~5 → 147; row virtualization shipped and measured). **Score fell because area 7 dropped 3 → 2 on verified documentation defects, and nine areas held.** See "Why the score fell while the system improved". |

### Why the score fell while the system improved

This needs stating plainly, because the headline number is misleading on its own.

**What genuinely improved, measured:** test count 1,295 → **1,835** across 223 files;
Storybook interaction tests ~5 → **147 `play` blocks**; axe coverage 630 → **706** story
entries; unit-test line coverage 48.98% → **64.89%**; dark-mode failures 87 → **71**;
and row virtualization now exists and works — **174 DOM nodes vs 5,062** at 1,000 rows,
a 29× reduction with a 24× faster mount.

**Why no area rose anyway.** Each held for a cited, specific reason, not inertia. The
recurring shape: *a capability was built but not adopted, or a gate exists but does not
run.* Area 8 is the clearest case — it did not move at run 3 for exactly this reason, and
the reason is **unchanged**: `FormatProvider` still has 1 consumer, `PageShell` still 2.

**Why area 7 fell.** Its 3 rested on the type layer, which re-earns a 3 on every measure
(`strict`, `tsc -b --force` clean in 42s, **0** real `any`/`as any`, 113 published
re-exports proven to resolve). But the DX half tells an adopting team things that are
not true — see P0-13 and P1-4. A quick-start that misstates what CI enforces is not
exemplary, and the adoption decision rests on that document.

### The run-4 headline: three independent agents, one dead gate

All three sub-agents converged, unprompted, on the same root cause — the same pattern
run 3 produced. Verified first-hand:

```
$ node -e "…slice roles.ts from 'export type RoleName' to first ';'…"
names parsed by first-semicolon slice: 6
actual union members:                 55
terminating text: "the label ON a primary\n  // fill (Sky, flipping to Midnight);"

$ node scripts/check-role-usage.js --strict ; echo $?
1
$ grep -rln "roles:check\|check-role-usage" .github/workflows/ .husky/ | wc -l
0
```

`scripts/check-role-usage.js:142-145` derives the valid role set by slicing
`src/theme/roles.ts` from `export type RoleName` to **the first `;`**. Commit `6364c6b`
(after run 3) added a prose comment *inside* the union containing a semicolon —
*"(Sky, flipping to Midnight);"* — truncating the slice. The parser reads **6 of 55**
role names and flags the other 49 as unknown.

| commit | names parsed | actual union members |
|---|---:|---:|
| `9dcc73a` (run 3) | 47 | 46 |
| `6364c6b` | **6** | 53 |
| `3840fc2` (HEAD) | **6** | 55 |

It therefore **exits 1 at HEAD**, reports ~172 findings of which **0 are actionable**,
and **appears in no workflow or hook**. Meanwhile `docs/GOVERNANCE.md:58` states
*"`npm run governance:ci` | `roles:check` + contrast … this is what `governance.yml` runs
in CI"*, and `docs/get-started/DEVELOPERS.md:57` tells adopting teams
*"enforced by `npm run roles:check` (`roles:check:strict` in CI)"*. Verified: `governance:ci`
chains eight commands and `roles:check` is not among them.

The gate's own header says it exists because this bug class "shipped three times" and was
"found by an accessibility audit, not by any gate." **It cannot find a fourth.** The fix
is one line.

---

## (a) Executive summary

**Verdict: adopt for Marsh-branded React dashboards inside this org's control; do not yet
recommend as a shared cross-project dependency.** The engineering is better than a
typical shadcn port — the artifact-level type gate, the package-stylesheet gate, the
dual-window deprecation check and the honest self-assessment in
`MAINSTREAM_REUSE_ASSESSMENT.md` are all real and all stronger than claimed-but-unenforced.
The blockers to cross-project adoption are **two structural items and one documentation
class**, none of which is component quality.

**1. Distribution is personal, not organisational.** The package publishes to GitHub
Packages under the `@antoniopezzella` scope from a private repo. `README.package.md:11-14`
states it: *"there is no anonymous install path today."* Every consuming team needs a PAT
and a per-project `.npmrc`. All 11 `CODEOWNERS` entries are one person; 352 of 353 commits
are one author. **No other team can adopt this durably until it moves to a Marsh-owned org.**

**2. Multi-brand is not a configuration away.** `ResolveRoleOptions` (`src/theme/roles.ts:219`)
carries only `mode` — no brand parameter — and `getRoleColor()` returns **resolved hex**.
There are **515 calls across 71 of 104 shipped modules**, feeding **272 inline `style={{}}`
sites** that no consumer stylesheet can override. Only 2 modules use the overridable
`var(--role-*)` path, which the role tier already publishes statically for all 55 roles in
both modes. A non-Marsh-branded team forks the source, not a config. `button.tsx` is the
proven template for unwinding this; it has been applied to 2 of 104 modules.

**3. The documents an adopting team reads first are wrong in three places.** The
quick-start misstates CI enforcement (P0-13), claims registry coverage of "all 71
components" when the registry holds 71 of 93 and silently omits `PageShell`, `Stack` and
the entire DataGrid and filter families (P1-4), and `CLAUDE.md:148` documents a
`getRoleColor` signature that does not compile. These are all **S**.

**The one P0 in the component surface** is that the data grid declares a formatting system
it does not have: `meta.type` accepts `currency | date | percent | number`, and the only
functional use of it maps to **text alignment**. A consumer declares a column `currency`
and renders `137000`, right-aligned. For a system whose stated primary use case is
data-dense dashboards, every adopting team hand-rolls the formatting a design system
exists to standardise.

**The cross-cutting lesson, third run running:** the gates validate something *adjacent*
to what matters. Run 3's P0 was green gates over a broken artifact. This run: a gate that
parses 6 of 55 inputs and runs nowhere; a `meta.type` test that supplies its own
`cell: () => '$12,400'` so it structurally cannot observe that the system does not format;
a coverage gate whose thresholds have never been evaluated because the run fails and
writes no report. **The highest-leverage investment here is not more tests — it is a small
set of self-tests that deliberately break a thing and assert the gate goes red.** The repo
already has this instinct (`vitest.config.ts:96-110` records proving the axe gate with a
deliberate-violation probe); it is not automated.

---

## (b) Scorecard

Run 4 scores. `(3→2)` marks movement since run 3. Denominator is **93 modules** (94
taxonomy entries) unless stated; run 3 used 79.

| # | Area | Score | One-line justification |
|---|---|:---:|---|
| 1 | Architecture & packaging | **2** | Run 3's cause is **closed and verified** — `check-package-types.js` runs in CI *and* before publish, passes, and would still catch that bug. Held at 2 because the package is installable only via a PAT against a personal account on a private repo, and `src/shadows.ts` ships `.mjs`/`.cjs` with **no `.d.ts`** — latent, since nothing in `dist-pkg` references it in a type position. |
| 2 | Tokens & theming | **2** | DTCG pipeline sound (**445** tokens, 244 aliases) and the shipped stylesheet now statically defines all **55** role vars, gated. Held by the dangling-var detector regressing to **6/55** names, and multi-brand unchanged at **515** hex-resolving call sites in 71 modules. Hardcoded colour is far better than the repo's own docs claim: **15 literals in 2 modules**, not "111 in 11". |
| 3 | Component API quality | **2** | Taxonomy **94/94** test-gated, `cn()` clean (**0/99** concatenate `className`), control scale at 10 modules, `Card`/`Badge`/`Chip` gained `forwardRef`. But the ratio fell **49% → 41%** as 20 modules landed without it, **33** public modules expose no ref path on any React version, `asChild` is still **6**, and the prop-vocab gate's declaration blindness now has two live instances (`attachment.tsx:24-29`, `toggle.tsx:23-27`). |
| 4 | Radix usage | **2** | Enforced 7-layer z-index scale (40 sites, subdirectory-aware) and a correct wrap/alias split — **40** behavioural aliases, **0** raw visual primitives. But `TooltipContent` still cannot be composed (no `Root` exported, **0** tests), Base UI entered as a **second overlay vendor** for one component (`drawer.tsx:4`), and `collisionPadding`/`avoidCollisions` appear **0** times repo-wide. |
| 5 | Accessibility | **2** | axe gates **706** story entries in CI, and `d5255f5` added a dark pass that measures a real backlog: **71** failing entries, of which **14 are in `ui/`** — the published-surface backlog is 14, not 71. But that pass exits 1 and is **in no workflow**, `getFocusRingSx` has **0** `ui/` consumers and is unexported, **25** interactive modules have no focus styling, the gate still has no self-test, and **0** lines in `ui/` or `dist-pkg/styles.css` honour `prefers-reduced-motion` while 11 modules animate. |
| 6 | Testing | **2** | **1,835 tests / 223 files** in a real browser, interaction tests **~5 → 147 `play` blocks**, coverage 48.98% → **64.89%**. But `npm run test:coverage` **fails 2 tests and writes no report at all**, so thresholds have never been evaluated; visual regression has two dormant mechanisms and no baseline; chromium only. |
| 7 | Type safety & DX | **2** `(3→2)` | The type layer re-earns a 3 — `strict`, `tsc -b --force` clean in 42s, **0** real `any`/`as any`, `gap` compile-time enforced, 113 re-exports proven. The DX half does not: the quick-start misstates CI enforcement for a command that **exits 1**, claims "all 71 components" when the registry covers 71 of 93, and **112 test files are type-checked by nothing**. |
| 8 | **Dashboard readiness** ⭐ | **2** | The table is now near-exemplary — 13 TanStack v9 features and **real virtualization: 174 DOM nodes vs 5,062 at 1k rows**. The score does not move because run 3's exact crux is **unchanged**: `FormatProvider` **1** consumer, `PageShell` **2**, and the grid **does not format at all** — `meta.type` declares `currency` and is used only to right-align. |
| 9 | Performance | **2** | Median chunk **3,621 B** across 130, CSS **19,316 B gzipped**, and run 3's "no virtualization" is **false at HEAD**. But `React.memo`/`useCallback` are **0 across all 7 table files**, virtualization is **off by default** and silently so, and there is **no perf gate of any kind** (`lighthouse.yml.disabled` since Nov 2025). |
| 10 | Governance & CI | **2** | `governance:ci` green across **8** commands, publish workflow gated, deprecation window machine-checked (14 entries, dual version+date). Held by a gate that fails and runs nowhere, a **false claim** in `GOVERNANCE.md:58`, and bus factor **1**. |

**Overall: 2.0 / 3** (simple mean). ⭐ = weighted heaviest per the brief.

---

## (c) Prioritised gaps

### P0 — blocks production adoption

| # | Finding | Evidence | Effort |
|---|---|---|---|
| **P0-12** | **The data grid declares a formatting system it does not have.** `meta.type` accepts `'text' \| 'number' \| 'currency' \| 'percent' \| 'date' \| 'status' \| 'boolean'`, described in-comment as *"the data-type/formatting system the experience spec describes (§6)"*. The **only** functional use maps it to text alignment. The table family never imports a formatter — `lib/format.ts`'s 9 formatters reach `stat-card`, `filter-schema` and `filters-describe` only. A column declared `currency` renders `137000`, right-aligned. **No gate catches it**: the single test touching `meta.type` (`data-grid-edges.test.tsx:262`) passes `cell: () => '$12,400'`, so it formats the value itself and structurally cannot observe that the system does not. | `data-grid-features.ts:153` (declaration), `data-grid-table.tsx:514` (sole use, alignment) | **M** |
| **P0-13** | **The quick-start states a CI enforcement that does not exist, for a command that fails.** `DEVELOPERS.md:57`: *"enforced by `npm run roles:check` (`roles:check:strict` in CI)"*; `GOVERNANCE.md:58` repeats it. Verified: `roles:check` is in **no** workflow or hook, and exits **1** at HEAD because `check-role-usage.js:142-145` parses **6 of 55** roles (a `;` inside a prose comment terminates the slice). This is P0 not for severity but for position: it is the document an adopting team reads first, and it misdescribes the governance that is the system's main claim. | `check-role-usage.js:142-145`; `roles.ts:62`; `DEVELOPERS.md:57`; `GOVERNANCE.md:58` | **S** |

### P1 — fix before recommending cross-project

| # | Finding | Evidence | Effort |
|---|---|---|---|
| P1-1 | **Distribution is a personal account.** PAT-only install, private repo, `@antoniopezzella` scope, 11/11 CODEOWNERS one person, 352/353 commits one author. | `package.json:2,11`; `README.package.md:11-14`; `.github/CODEOWNERS` | **L** (org) |
| P1-2 | **Multi-brand impossible without a fork.** `ResolveRoleOptions` has no brand param; **515** `getRoleColor()` calls in **71 of 104** shipped modules resolve to hex inside **272** inline styles. Only 2 modules use `var(--role-*)`. | `roles.ts:219,230-243` | **L** |
| P1-3 | **Dark mode measured, not gated.** `test:dark` exits 1 — 71 failing entries, **14 in `ui/`** across 9 modules. In no workflow. `header.tsx:125-126` pairs `surface.secondary` with `text.primary` → **1.72:1** in dark. | `vitest.dark.config.ts:43,67`; `roles.generated.css` dark block | **M** |
| P1-4 | **Registry drifted 22 modules behind and the doc says otherwise.** `DEVELOPERS.md:158` claims "all 71 components"; registry holds 71 `registry:ui` items against **93** modules. Absent: the whole DataGrid family, the whole filter system, `page-shell`, `stack`, `data-state`, `error-state`, `sparkline`. All landed since run 3; nothing noticed. `registry validate` checks schema only. | `registry.json`; `DEVELOPERS.md:158` | **S** |
| P1-5 | **Coverage gate cannot be switched on as-is.** `npm run test:coverage` **fails** — 2 instrumentation-induced 5s timeouts — so **no report is written** and thresholds have never been evaluated. Thresholds also sit ~20 points below actuals. | `vitest.config.ts:46-51`; `tabs.test.tsx`, `WorkspaceCard.test.tsx` | **S** |
| P1-6 | **The fast path is opt-in; the slow path is the accidental one.** `enableVirtualization` defaults **false** and requires `maxHeight`. `<DataTable data={rows} pageSize={1000} />` gives **5,062 DOM nodes and a 222 ms sort**, with no warning. | `data-grid-table.tsx:185`; `data-table.tsx:387` | **S** (dev warn) |
| P1-7 | **No performance gate of any kind.** No size-limit, no bundle budget; `lighthouse.yml.disabled` since 2025-11-13. Every number in area 9 can regress silently. | `.github/workflows/` | **S** |
| P1-8 | **Dashboard typography lost in 11 of 12 portalled surfaces.** `.mds-dashboard` is a CSS-var scope; 12 components portal to `document.body`, **1** re-applies it. A dialog opened from a dashboard renders its heading in Marsh Serif 400, not Noto Sans 700. `CLAUDE.md:271-272` already prescribes the fix. | `notifications-drawer.tsx:104` (the only one); `_typography.scss:136-154` | **S** |
| P1-9 | **Chart colours ship ungoverned.** 10 hand-written values outside the token pipeline — `grep -c chart dist/tokens.json` → **0**; absent from `build-tokens.js`, `check-contrast.js`, `check-token-variables.js`. Series colours are exactly what needs contrast and colour-blind validation. `ChartContainer` has **0** consumers; `ChartMetricCard.tsx:2` imports recharts directly. | `token-variables.css:103-107,152-156` | **M** |
| P1-10 | **33 public modules expose no ref path**, including `data-table`, `data-grid`, `tabs`, `pagination`, `combobox`, `date-picker`. A further 14 forward a ref **only under React 19**, while `package.json` declares `^18 || ^19` with nothing documenting the difference. | `package.json` peer range; 41/99 use `forwardRef` | **M** |
| P1-11 | **The prop-vocab gate is declaration-blind**, with two live instances: `attachment.tsx` declares `size: {default, sm, xs}`; `toggle.tsx` declares `size: {default, sm, lg}` with `h-9` — off the 32/40/48 scale. `props:check` reports green against both. | `check-prop-vocab.js:217-237`; `control-size.ts:36-40` | **M** |
| P1-12 | **The axe gate still has no self-test**, one run after a silent no-op was discovered. Collateral evidence is now stronger (the dark pass produced 418+ findings through the identical plugin path), but a regression confined to the light config stays silent. | `src/stories/_health/` — 4 stories, none a deliberate violation | **S** |
| P1-13 | **A second overlay primitive vendor shipped for one component.** `@base-ui/react` is a runtime dependency; consumers get two focus traps, two portals, two dismiss stacks alongside 27 Radix packages. Documented and coherent — but it is a maintenance inheritance. | `drawer.tsx:4`; `package.json` | **M** |
| P1-14 | **`TooltipContent` still cannot be composed** — no Radix `Root` exported, `Tooltip` is taken by the opinionated wrapper, **0** tests reference it. Unchanged from run 3. | `tooltip.tsx:141-142,161-185` | **S** |
| P1-15 | **Bus factor 1**, in code and process. `CODEOWNERS:5-6` is candid: *"A single personal owner is a bus factor, not a review process."* | `.github/CODEOWNERS` | **L** (org) |

### P2 — worth doing, not blocking

`shadows.ts` ships untyped (`vite.lib.config.ts:101-121`, **S**) · `src/index.ts:181-184`
withholds `Table` citing "0.7.0 has never shipped" — it shipped 2026-10-01 (**S**) ·
`dist/theme.css` not in the published tarball, so non-React consumers cannot reach the
role vars (**S**) · health score reports **0 hardcoded hex** while 15 literals ship,
because a whole-file exemption scores as zero (`ds-health-score.js:147`, **S**) ·
`CLAUDE.md:148` documents a `getRoleColor` signature that does not compile (**S**) ·
3 competing `MetricCard` implementations, the DS one unused (**S**) · `data-table.tsx:38-44`
says virtualization is "deliberately NOT included" — it is, at `:299-307` (**S**) ·
`prefers-reduced-motion` absent from `ui/` and the shipped stylesheet while 11 modules
animate (**M**) · 4 public modules accept no `className` (**S**) · **0** collision tuning
repo-wide (**S**) · z-index and radius gates scan `ui/` only — the app breaks the scale at
`zIndex: 999999` (**S**) · 112 test files type-checked by nothing (**S**) · `tsc -p tsconfig.json`
checks **0 files** (`"files": []`), a trap for anyone typing the obvious command (**S**) ·
`stories:audit` run by no workflow: 27/93 have descriptions, 33/93 argTypes (**M**) ·
`README.package.md:239,246` names 2 unexported internals (there are 3) and recommends
pinning `~0.4.0` at version 0.7.0 (**S**) · pre-commit covers 2 of 8 gates, no pre-push (**S**).

---

## (d) 30 / 60 / 90-day plan

> **Superseded 2026-10-06 by [`ROADMAP.md`](./ROADMAP.md).** Every open item
> below is now mapped to one of four goals there, against the strategic target
> of Carbon's *one core, several expressions* model. This document stays the
> **audit** — what is true, scored, with evidence. The roadmap is the **plan**.
> Two competing plans is one too many, so changes go there.
>
> The list below is kept as the record of what run 4 recommended at the time.
> Items 1, 3 and 5 landed the same day; see the roadmap's "Done since the
> audit" for what changed.

Sequenced by dependency, not effort.

### 30 days — restore the governance that is claimed, and stop the bleeding

1. **Fix `check-role-usage.js:144`** — terminate the slice at the union's real end, not the
   first `;`. One line. Then triage whatever it finds for real, and add
   `roles:check:strict` to `governance:ci`. **Until this lands, every claim the repo makes
   about role governance is unbacked.**
2. **Correct the three documents an adopter reads first** — `DEVELOPERS.md:57,144,158`,
   `GOVERNANCE.md:58`, `CLAUDE.md:148`, `README.package.md:239,246`.
3. **Add a `registry.json` completeness test** mirroring `taxonomy.test.ts:38-55`. The
   drift to 71-of-93 happened silently over 82 commits; one test prevents the next one.
4. **Make `test:coverage` runnable** (raise the instrumented timeout), then wire it to CI
   with thresholds moved up to near current actuals.
5. **Add one deliberate-violation probe story** so the axe gate has a self-test.
6. **Add a dev-mode warning** when `pageSize` is large and `maxHeight` is absent.

### 60 days — close the P0s and the adoption gap

7. **Wire `formatValue` into the grid's default cell renderer behind `meta.type`**, reading
   `FormatProvider`. This closes P0-12 *and* gives `FormatProvider` its adoption — the two
   reasons area 8 has not moved in two runs.
8. **Apply `.mds-dashboard` to the 11 portalled surfaces** and add a
   `check-typography-context.js` gate.
9. **Clear the 14 `ui/` dark-mode failures**, then gate `test:dark` on the `ui/` subset via
   an allowlist so the backlog cannot grow while the legacy MUI tail is worked off.
10. **Bring chart colours into the token pipeline** and under contrast validation.
11. **Add a byte-size gate** so area 9's numbers stop being unprotected.

### 90 days — make it genuinely adoptable by another team

12. **Move the repo and package to a Marsh-owned org**, with a team CODEOWNERS handle and
    branch protection that requires the gates. This is the single largest blocker and it is
    organisational, not technical.
13. **Begin the `getRoleColor()` → `var(--role-*)` conversion**, `button.tsx` as the
    template. The role tier already publishes all 55 roles statically in both modes, so
    this converts brand from a fork into a cascade override. ~71 modules; do the
    highest-traffic first and measure the inline-style count down from 272.
14. **Add `forwardRef` to the named load-bearing modules** (`data-table`, `data-grid`,
    `tabs`, `pagination`, `combobox`, `date-picker`), and document the React 18 vs 19 ref
    difference for the 14 that rely on React 19 behaviour.
15. **Stand up visual regression** — both mechanisms are already installed and dormant.

---

## (e) Checks that could not be run

Per method step 3. A check not run is itself a finding.

| Check | Why |
|---|---|
| **Branch protection / required status checks** | `gh` is not installed in this environment. `CODEOWNERS:3` implies it may not be configured (*"once branch protection requires owner review"*). **Whether any green gate is actually required to merge is unverified** — with a single author committing directly, the gates may be advisory in practice. This is material to area 10's score. |
| **Whether 0.7.0 is on the registry** | Private registry, no credentials. |
| **Real consumer install / bundle impact** | `npm install` and `shadcn add` both need GitHub auth against a private repo. Tree-shaking is verified at the *enabling* level (`preserveModules`, `sideEffects`, a 2-module import closure for `button.mjs`) — not from a built consumer app. |
| **Whether multi-brand is achievable in practice** | There is no second brand in the repo to migrate. Every figure in P1-2 is derived from source; no migration was attempted. |
| **Exact dark-mode violation total** | Vitest truncates at 50 of 71 failure blocks. 418 `color-contrast` findings is a **floor**, not a total. The failing-test (71) and failing-file (22) counts are exact, reproduced twice. |
| **Combined coverage** | Not obtainable at HEAD — `test:coverage` fails and writes no report. 64.89% is the **unit project only**. |
| **Visual regression** | **Not currently measurable.** `scripts/visual-baseline.js` has no npm script; `@chromatic-com/storybook` is installed but unregistered, unconfigured and absent from CI. No baseline exists to diff against. |
| **Cross-browser** | chromium only. Safari sticky-header and pinned-column behaviour — the two things most likely to differ — are unverified. |
| **Screen-reader behaviour** | No automated check; no dated VoiceOver/NVDA artefact in the repo. |
| **Focus-appearance contrast (WCAG 2.4.7)** | axe does not evaluate it. Modules were measured for whether they *declare* a governed ring colour, not whether each resolved ring passes 3:1. The one case computed by hand (`header.tsx:204`, dark) fails at **1.72:1**. |
| **Sustained scroll performance** | Mount and a single sort commit were measured. Sustained FPS and long-task distribution need a CDP tracing harness. |

---

## (f) Evidence appendix

Every command used, so the reviewer can re-run them.

```bash
# Gates — all green at HEAD
npm run governance:ci          # exit 0, 8 commands
npm run build:package          # → check-package-types.js: 113 re-exports resolve
node scripts/check-package-css.js   # 117705 bytes, 55 role vars, all resolve
npm run tokens:validate-dtcg   # 445 tokens, 244 aliases, 201 literals
npx shadcn@latest registry validate # valid, 76 items

# The dead gate
node scripts/check-role-usage.js --strict ; echo $?        # 1
grep -rln "roles:check" .github/workflows/ .husky/ | wc -l # 0

# Tests
npm test                       # 223 files, 1835 tests
npx vitest run --project unit --coverage  # 64.89% lines; full run fails
npm run test:dark              # exit 1 — 22 files / 71 tests failed
npm run stories:audit          # 93 modules; 72 storied, 27 described, 33 argTypes, 9 play

# Types
npx tsc -b --force             # exit 0, 42.0s — a real check
npx tsc -p tsconfig.json --listFiles --noEmit | wc -l   # 0 files — the trap

# Counts re-derived at HEAD
ls src/components/ui/*.tsx | grep -v '\.test\.\|\.stories\.' | wc -l   # 93
find src api -name "*.test.*" -o -name "*.spec.*" | wc -l              # 112
node -e "const r=require('./registry.json');console.log(r.items.filter(i=>i.type==='registry:ui').length)"  # 71

# The P0, demonstrated
grep -rn "meta\.type" src/components/ui/*.tsx | grep -v test  # sole use: alignment
```

**1k-row render, measured in real Chromium 1400×1000 via `React.Profiler`:**

| Configuration | Mount | DOM nodes | Sort re-render |
|---|---:|---:|---:|
| `DataTable` default (10/page) | 14.3 ms | 112 | 37.7 ms |
| `pageSize={1000}`, no virtualization | 144.9 ms | **5,062** | **221.7 ms** |
| `pageSize={1000} maxHeight={600} enableVirtualization` | **6.1 ms** | **174** | **30.7 ms** |

---

## Findings that did not survive verification

Recorded so the reviewer can see what was discarded, per the method's instruction to drop
anything unprovable.

- **"111 hardcoded hex literals in 11 shipped modules"** (`MAINSTREAM_REUSE_ASSESSMENT.md:296-298`).
  Re-derived at HEAD with comments stripped: **15 literals in 2 modules** — `button.tsx`
  (3 hex + 8 `rgba`) and `side-navigation.tsx` (4 `rgba`). Stale by ~10×. **Do not quote the
  old figure.**
- **"No virtualization in either table"** (run 3, area 9). False at HEAD — `data-grid-table.tsx:466`,
  measured at 174 vs 5,062 DOM nodes.
- **"No test file is type-checked"** (run 3, area 6). True only of `.test.tsx`. The **147 `play`
  interaction tests are all type-checked**, because they live in `.stories.tsx`, which
  `tsconfig.app.json` includes. The uncovered surface is the 112 unit-test files.
- **"29 modules render a focus ring in `currentcolor`."** Did not survive checking: 26 of 30
  ring-bearing modules do set the governed colour, most via inline style rather than a class.
  The real figure is **4 modules / 5 sites**.
- **A cva-adoption finding (24/99)** was dropped: the 75 non-cva modules are overwhelmingly
  raw Radix aliases or pure composition. Only 3 hand-roll a class map where cva would fit.
- **A legacy-`Table` pagination regression** was dropped — it was the auditing agent's own
  error (`pagination` takes a config object, not a boolean).

---

## See also

- [`DS_HEALTH_REPORT.md`](./DS_HEALTH_REPORT.md) — the internal running health log; distinct from this adoption audit
- [`MAINSTREAM_REUSE_ASSESSMENT.md`](./MAINSTREAM_REUSE_ASSESSMENT.md) — the Atlas/React reuse question (note the stale hex figure above)
- [`GOVERNANCE.md`](./GOVERNANCE.md) — the four governance systems (note the false claim at `:58`)
- [`SHADCN_MIGRATION_STATUS.md`](./SHADCN_MIGRATION_STATUS.md) — per-component migration state
