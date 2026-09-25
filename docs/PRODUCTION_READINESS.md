# Production readiness audit

**Last audited:** 2026-09-25 · **Commit:** `9dcc73a` · **Run:** 3 (see Score history) · **Auditor:** staff-level design-systems review
**Audience:** IT Development Lead, deciding whether other teams adopt this system
**Method:** three independent parallel sub-agents (areas 1/2/10, 3/4/5/7, 6/8/9), consolidated; every P0 re-verified first-hand against HEAD
**Re-run with:** `/audit` (see `.claude/commands/audit.md`)

> **Scope note.** This audits the **shadcn/Radix component set** in `src/components/ui/`
> (**79** modules — runs 1–2 used a stale denominator of 73/75) and the package
> built from it — the half that is published and intended for reuse. The repo
> also contains an older MUI track and marketing-site components; those are
> called out only where they collide with the reusable half.

> **Run-3 method note.** Run 2 was single-threaded — a verification pass rather
> than an independent re-audit, as that run's own §(e) recorded. Run 3 restores
> the parallel-subagent method `audit.md` prescribes, and it mattered: the
> independent agents found **three P0s in work completed during run 2**, none of
> which the eight green CI gates reported, and corrected four numbers run 2
> stated too favourably.

---

## Score history

| Run | Date | Commit | Overall | Notes |
|---|---|---|---|---|
| 1 | 2026-09-23 | `847ceec` | **1.9 / 3** | Baseline. Packaging repaired same-day (6 blocking defects fixed). |
| 2 | 2026-09-24 | `1481270` | **2.1 / 3** | Tailwind v4 migration; composition layer added; control sizes unified. 2 of 6 P0s closed, 1 narrowed. Two P0s were *found and fixed* in this window that did not exist at run 1. |
| 3 | 2026-09-25 | `9dcc73a` | **2.2 / 3** | Dashboard foundations shipped (formatters, four-state contract, FilterBar). 5 of run-2's P0s closed. **But three new P0s were introduced in the same window**, all in the same blind spot: nothing validated the published artifact. See below. |

**Movement since run 2:** area 8 (dashboard readiness) +0 despite substantial
work — the components were built but not adopted, which is a different failure
than "missing" and is why the score did not move. Areas 4 and 5 each +1. Area 1
dropped from 3 to 2 on the packaging regression described next.

### The run-3 headline: every gate was green and the package was broken

Three independent agents converged on one structural finding. Quoting agent A:

> A team running `npm install` gets a library whose JavaScript works, whose
> types do not compile, and whose theme provider crashes their server render —
> none of which any of the eight green gates would report.

All three had the same root cause: **every gate validated the source; nothing
validated the artifact.**

| | What was green | What was actually true |
|---|---|---|
| `npx tsc -b` | ✓ | checks `src/`, never `dist-pkg/` |
| `npm test` | ✓ 1,200 passing | runs source through Vite; never imports the build |
| `npm run build:package` | ✓ | Rollup resolves JS fine; says nothing about types |
| `check-package-css.js` | ✓ | checks CSS, not types |

`dist-pkg/index.d.ts` referenced five modules with no `.d.ts` emitted
(`lib/format`, `lib/format-context`, `lib/utils`, `tokens`, `semantic-tokens`),
so `import { Button }` raised TS2307 for every TypeScript consumer. Introduced
in `81c95b0` by adding `src/lib/format.ts` to `src/index.ts` without extending
the dts `include` list in `vite.lib.config.ts` — a list whose own comment at
`:105-109` describes precisely this failure mode.

**All three are now closed**, along with the lint failures at HEAD, and each is
guarded by a gate that was verified to fail on the original bug rather than
assumed to work:

| Fix | Guard | Failure proven? |
|---|---|---|
| dts `include` extended | `scripts/check-package-types.js`, chained into `build:package` | yes — deleted `lib/format.d.ts`, exit 1 with the right message; restored, exit 0 |
| `ThemeModeProvider` SSR crash | `ThemeModeContext.ssr.test.tsx` (`@vitest-environment node`) | yes — old implementation throws `ReferenceError: localStorage is not defined`; new passes |
| `FormatProvider` inert | `format-context.test.tsx` | yes — 4 of 5 StatCard assertions fail without the wiring |
| `publish-package.yml` ungated | lint + tsc + tests + governance added before `npm publish` | n/a (workflow) |

#### Run 2's own movement notes, kept for provenance

**Movement since run 1:** areas 3 (API quality) and 7 (type safety & DX) each
+1. Everything else held. The two areas that did not move — 4 (Radix/z-index)
and 8 (dashboard readiness) — are now the binding constraints, and both are
concentrated in a small number of specific, cheap fixes rather than anything
architectural.

**Two defects were introduced and fixed inside run 2's window.** Neither
existed at run 1, and both are worth recording because neither would have been
caught by any gate that existed then — the same pattern that produced run 3's
three P0s:

- The **published stylesheet shipped with zero padding, margin and gap rules**
  after the Tailwind v4 migration. `styles.package.css` imported
  `tailwindcss/utilities` without `tailwindcss/theme`; v4 derives the spacing
  scale from `--spacing` at build time, so Tailwind silently *dropped* every
  rule it could not resolve rather than erroring. Build exit 0, file still
  71 kB, still contained `.flex-col`. Now fixed and guarded by
  `scripts/check-package-css.js`, chained into `build:css`.
- **Message bubbles rendered at 80% of their own content width**, because a
  v4-only variant (`*:data-slot:self-end`) started compiling and collapsed a
  flex parent to shrink-to-fit, changing what `max-w-[80%]` was a percentage
  *of*. Found by the visual baseline, which is the tool run 1 recorded as
  "scaffolded but not running".

---

## (a) Executive summary

**Verdict at run 3: ready for internal dashboard adoption.** All eleven P0s
raised across three runs are closed and verified at HEAD, and the package now
validates its own published artifact. **Do not yet position it as the
cross-brand foundation** — one architectural decision (§2) makes multi-brand
theming impossible without a large refactor, and that should be decided before
more teams build on it.

> **Read the P1 list before quoting the verdict.** Run 3's three P0s were all
> introduced *after* run 2 declared the same areas healthy, and none were
> visible to CI. The system is in good shape; the evidence that it stays in
> good shape is thinner than the number of green checks implies.

The system is **stronger than its component count suggests in the places that are
hard to fake, and weaker in the places that are easy to defer.**

**What is genuinely good, and better than a typical shadcn port:**

- **Accessibility automation is exemplary.** `.storybook/preview.tsx:120` sets
  `a11y: { test: 'error' }`, so an axe violation in any of 630 story entries
  **fails the build**. The contrast gate (`scripts/check-contrast.js`) checks 20
  pairs across **both** light and dark, and has demonstrably been strengthened in
  response to a real escape (`check-contrast.js:75-84`). Most systems claim this;
  this one enforces it.
- **The token pipeline is real.** `npm run tokens:validate-dtcg` →
  *413 tokens, 215 aliases, 198 literals, DTCG-conformant*. Aliases outnumbering
  literals proves the primitive→semantic→role chain survives export rather than
  flattening.
- **The data table is close to MUI X Community parity** — multi-sort with a
  management UI, faceted filters with derived counts, server-side pagination,
  keyboard-accessible column resizing, CSV export, inline cell editing, and a
  two-mode empty state that distinguishes "no data" from "no matches".
- **Packaging now matches or beats all four benchmark systems** (MUI 9.4.0,
  Carbon 1.116.0, Polaris 13.9.5, Primer 38.40.0) on every structural dimension
  measured — after six blocking defects were found and fixed on the audit date.

**What blocked production at runs 1–2, and where each stands now:**

| # | Blocker | Status at run 3 |
|---|---|---|
| 1 | No formatting utilities (§8) | **closed** — `src/lib/format.ts`, and as of run 3 actually consumed by `StatCard` via `FormatProvider` |
| 2 | No data-error state (§8) | **closed** — `data-state.tsx` / `error-state.tsx`, four-state contract across 5 surfaces |
| 3 | Toasts behind every overlay (§4) | **closed** — `toast.tsx:31` `z-[1600]`; the whole stacking scale is now CI-enforced |
| 4 | CSS-var layer drifted (§2) | **closed** — 34/34 self-consistent, and now checked against the role layer too |
| 5 | Unevidenced a11y claims (§5) | **closed** — all four remaining claims corrected; the "3px offset ring" one was disprovable from source |

**What run 3 added and closed inside its own window:** broken published types,
an SSR crash in `ThemeModeProvider`, an ungated publish workflow, an inert
`FormatProvider`, and six lint errors at HEAD. See the headline above.

**A caution about the accessibility green light.** The axe gate is the best thing
in this repo and it is being read as broader assurance than it provides. It now
covers **630 stories** — but 628 of them render light mode only, so *dark-mode
component contrast is effectively unverified*; the suite forces reduced motion,
so the animated path is never sampled; and axe cannot check focus visibility at
all. Automated coverage is roughly a third of WCAG at the best of times. Green
here means "no detectable violation in a static, light-mode, reduced-motion
render" — which is worth having, and is not the same as accessible.

*Run 2:* the 451 excluded lines now execute (P0-6 closed), and the gate earned
its keep twice this window — catching a heading-order break and a Select with
no accessible name, both in newly written code, before either merged.

**The strategic question, separate from the P0s:** most components resolve
colour by calling `getRoleColor()`, which returns a **hex string** computed at
render. Only 2 use `var(--role-*)`. That decision makes brand-switching a
re-render rather than a cascade change, makes `className` unable to override
component colour, and makes SSR always paint light mode. It is not a defect —
it works — but it is the single thing standing between this and a multi-brand
platform, and unwinding it touches 133 files.

---

## (b) Scorecard

Run 3 scores. `(2→3)` marks movement since run 2. Denominator is **79**
modules; figures re-derived at HEAD, not carried forward.

| # | Area | Score | One-line justification |
|---|---|:---:|---|
| 1 | Architecture & packaging | **2** `(3→2)` | Deps and tree-shaking still clean, but the package **shipped with a broken `index.d.ts`** — five re-exported modules had no `.d.ts` emitted, so every TS consumer got TS2307 while all gates stayed green. Fixed and now gated by `check-package-types.js`; the score reflects that nothing validated the artifact for a full release cycle. |
| 2 | Tokens & theming | **2** | DTCG pipeline good. The hand-written CSS-var layer is now self-consistent (34/34) **and** checked against the role layer it claims to project — a check that did not exist before and immediately found 4 divergences, 2 of them plain typos (now fixed), 2 a recorded brand migration. Still no multi-brand mechanism. |
| 3 | Component API quality | **2** | Shared control scale used by **9** modules with a working cascade, 79/79 taxonomy, CI-gated `size` deprecation record. But `forwardRef` on 39/79, public `asChild` on **6/79** (run 2 said 15 — that counted files containing the string, 9 of which only pass it to an internal Radix trigger), and 5/6/3/4/3 competing prop names for primary text, secondary text, icons, empty and error. Only `loading` is genuinely unified. |
| 4 | Radix usage | **2** `(1→2)` | Toast-above-overlay fixed and real. z-index went from "scale with zero importers" to an **enforced** scale: `scripts/check-z-index.js` fails on any off-scale value, all six layers now have real adoption, tooltips moved 1500→1700 (they were below toasts and tied with the dialogs containing them), scrims 1500→1400. `TooltipContent` still cannot be composed — no Radix `Root` is exported. |
| 5 | Accessibility | **2** | Axe gate verified real end-to-end across **630** story entries and running in CI. Portfolio's four remaining unevidenced claims corrected — including a "3px offset ring" the code disproves (43 × `ring-2`; `focusRing.ts` is 2px + 2px). Still: **45/79** components have no focus styling, `getFocusRingSx` has 0 `ui/` consumers, 2/630 stories render dark, and the gate has no self-test after silently no-op'ing once. |
| 6 | Testing | **2** | **1,295 tests / 185 files** in a real browser with axe gating. Coverage block now configured — but **no workflow runs it**, so the thresholds are inert. No test file is type-checked (`tsconfig.app.json` excludes them all). Interaction tests ~5/103. |
| 7 | Type safety & DX | **3** | `strict: true`, `tsc -b` clean, **0 `any`** and **0 `as any`** in `ui/`, `gap` compile-time enforced to the DS scale with a CI gate covering the `className` escape hatch. 5 agent skills, tested 79-entry taxonomy. 0/79 maturity labels remain. |
| 8 | **Dashboard readiness** ⭐ | **2** | Formatters, the four-state contract, StatCard delta/polarity/sparkline and FilterBar all shipped — the run-2 P0s are closed. The score does not move because the state changed from *missing* to **built but not adopted**: `FormatProvider` reached zero components until this run wired it, and `PageShell` has 2 consumers. |
| 9 | Performance | **2** | Small bundles (median 3.6 kB), verified tree-shaking; still no virtualization and no memoization in either table. Unchanged. |
| 10 | Governance & CI | **2** | Now **7** gates on every PR (z-index and role-agreement added) plus a package-types guard, and `publish-package.yml` no longer goes from `npm ci` straight to `npm publish`. Bus factor of **1** remains. The deprecation window is now machine-checked. |

**Overall: 2.2 / 3** (simple mean). ⭐ = weighted heaviest per the brief.

---

## (c) Prioritised gaps

### Status at run 3 (2026-09-25, `9dcc73a`)

Verified individually against HEAD, not carried forward on trust. **Run 2's own
status table was stale** — it listed P0-1, P0-2 and P0-3 as open when all three
were closed at HEAD, which would have sent a reader to re-do finished work.

| Gap | Status | Evidence |
|---|---|---|
| P0-1 formatters | **CLOSED** | `src/lib/format.ts` + `format-context.tsx` + `format.test.ts`; **and now actually consumed** — see P0-11 |
| P0-2 data-error state | **CLOSED** | `data-state.tsx`, `error-state.tsx`; four-state contract across 5 surfaces |
| P0-3 toasts behind overlays | **CLOSED** | `toast.tsx:31` is `z-[1600]` vs 12 overlay sites at 1500 |
| P0-4 CSS-var drift | **CLOSED** | 34/34 self-consistent, **plus** a new role-agreement check that found 4 more |
| P0-5 unsubstantiated a11y claims | **CLOSED** | all four remaining claims corrected this run; see below |
| P0-6 451 excluded a11y tests | **CLOSED** | exclusion removed; both files run |
| **P0-8 broken published types** | **CLOSED** | *new in run 3*; `check-package-types.js`, proven to fail on the bug |
| **P0-9 SSR crash in ThemeModeProvider** | **CLOSED** | *new in run 3*; `useSyncExternalStore`, node-environment regression test |
| **P0-10 publish workflow ungated** | **CLOSED** | *new in run 3*; lint + tsc + tests + governance now precede `npm publish` |
| **P0-11 FormatProvider inert** | **CLOSED** | *new in run 3*; StatCard reads ambient config, 9 tests |
| **P1-13 HEAD fails `npm run lint`** | **CLOSED** | *new in run 3*; 6 errors, now 0 |
| P1-12 coverage misconfigured | **half-closed** | config exists; **no workflow runs `--coverage`**, so thresholds are inert |
| P1-3 TooltipContent unusable | **open** | styled, but no Radix `Root` exported — cannot be composed |
| P2-4 density/size vocabulary | **mostly closed** | one control scale, 9 modules, group cascade |

#### Corrections to run 2's own claims

Run 3's agents disputed four figures. All four checks were re-run first-hand
and the agents were right:

| Run 2 said | Actually |
|---|---|
| "`asChild` 5→15" | **6** components declare it as a public prop; the other 9 only pass it to an internal Radix trigger |
| "Adds `z-index.ts` — a real scale" | the file had **zero importers** and was not exported; two comments referenced it |
| "Tooltips sit above toasts" | tooltips were at **1500**, toasts at 1600 — the opposite |
| "75 modules" | **79** |

A fifth is about a gate I wrote: `check-token-variables.js` compared each HSL
triplet to **the hex in its own comment**, never to `roles.ts`. It reported
"✓ every triplet decodes to its stated hex" while four variables rendered a
different colour than the role they named. It now checks both, and the
distinction is documented in the script.

#### Correction: P0-5 was overstated at run 1

Run 1 claimed "**zero** focus-trap implementations, **zero** skip links". Both
halves are wrong, and the audit's own method says to report the narrower
version:

- **Focus trapping is real.** `dialog.tsx` and `sheet.tsx` build on
  `@radix-ui/react-dialog`, which traps focus natively. Run 1 grepped for
  hand-rolled traps and missed that the library provides it. That part of the
  product-page claim is substantiated.
- **Skip links exist**, in `CarouselSection.tsx` and `GoToMarket.tsx:553`.

What survives is narrower but still real: "skip-links implemented
**throughout**" is false for the dashboard product the page advertises —
`PageShell`, the template every new dashboard page now uses, has **none**. And
"Tested with axe-core and VoiceOver" is half-substantiated: axe-core
demonstrably gates 630 stories; the only VoiceOver evidence is a *claim* in an
archived doc (`docs/archive/HEADER_ACCESSIBILITY_REPORT.md:142`), not a test
artefact — no dated session, no findings, no tooling output.

It stays P0 because a public page making accessibility claims the repo cannot
evidence is a compliance exposure regardless of how many sub-claims are true.
The fix is now smaller than run 1 implied: correct one sentence, and add a
skip link to `PageShell`.

### P0 — open at run 3

**None.** All eleven P0s raised across runs 1–3 are closed and verified at
HEAD. That is a real milestone, and it is also the point at which the
interesting question stops being "what is broken" and becomes "what would tell
us if it broke again" — which is what the P1 list below is mostly about.

### P1 — open at run 3

Ranked. Every row re-verified first-hand at `9dcc73a`.

| # | Gap | Evidence | Effort |
|---|---|---|:---:|
| P1-14 | **`TooltipContent` cannot be composed.** The name `Tooltip` is taken by the opinionated `title`-taking wrapper, so no Radix `Root` is exported. The idiomatic `<Tooltip><TooltipTrigger/><TooltipContent/></Tooltip>` hands two children to a Slot and throws `React.Children.only`. Exported publicly, exercised by zero tests and zero stories. | `tooltip.tsx:86,104,135-136`; `tooltip.test.tsx` has 0 matches for `TooltipContent` | **S** |
| P1-15 | **Focus visibility is largely absent and entirely unmeasured.** 45/79 components have no focus styling and fall back to the UA outline; `getFocusRingSx` has **0** consumers in `ui/`. Axe does not check WCAG 2.4.7 at all, so the green gate is silent on it. | counts at HEAD; `src/theme/focusRing.ts` | **M** |
| P1-16 | **The axe gate has no self-test.** It silently ran zero checks once already — a `setProjectAnnotations()` call made addon-vitest skip provisioning, and a story with deliberate contrast and button-name violations **passed**. The only evidence it works today is a prose comment. One probe story would close it. | `vitest.config.ts:~119-128`; `ls src/stories/_health/` has no violation probe | **S** |
| P1-17 | **Coverage thresholds are configured and never enforced.** Four thresholds set; no workflow invokes `--coverage`. | `vitest.config.ts:41-46` vs `ci.yml:57` (`npm test`) | **S** |
| P1-18 | **No test file is type-checked.** `tsconfig.app.json:32-41` excludes every `*.test.*`/`*.spec.*`, and no other project includes them — ~1,295 tests transpile unchecked. A test passing a prop that does not exist compiles, runs and passes. | `tsconfig.app.json`, `tsconfig.json` | **S** |
| P1-19 | **Four components hardcode heading levels with no escape.** `card.tsx:74` `<h3>`, `mega-menu.tsx:89` `<h4>`, `side-navigation.tsx:370` `<h3>`, `status-card.tsx:67` `<h3>`. A `<Card>` inside a `PageShell` skips `h1`→`h3`. `stat-card.tsx:98` already demonstrates the fix. | grep at HEAD | **S** |
| P1-20 | **`asChild` on 6/79, `forwardRef` on 39/79.** `Badge`, `Card`, `Chip`, `Breadcrumbs` — the four the 60-day plan names — have neither. Consumers cannot render a Card as a link or measure a DataTable. | counts at HEAD | **M** |
| P1-21 | **Prop vocabulary is ungated outside legacy `size` spellings.** `TONE_ALIASES = {}` by design; the gate checks call sites, not declarations, so a new component declaring `size?: 'xs' \| 'cozy'` passes green. 5 names for primary text, 6 for secondary, 4 for empty, 3 for error, ≥8 for "the value changed". | `check-prop-vocab.js:106`; table in §Area 3 | **M** |
| P1-22 | **Two CSS variables render a different brand blue than the role they cite.** `--primary` and `--accent-foreground` are `#002c77` (blue1100) while `interactive.primary` resolves to `#000f47` (blue1000). This is now *visible* — the gate reports it every run — but it is an unmade brand decision, not a fixed bug. | `check-token-variables.js` ROLE_EXCEPTIONS | **S** (decision) |
| P1-23 | **Dark mode is 2 of 630 stories.** The axe suite also runs `reducedMotion: 'reduce'` throughout, so the animated path is never sampled either. | `stat-card.stories.tsx:295`, `metric-card.stories.tsx:165` | **M** |

Carried forward from earlier runs and still open: P1-1 (multi-brand), P1-4
(virtualization), P1-5 (uncontrolled-only), P1-7 (undeclared SCSS palette),
P1-8 (hex-checker blind spot), P1-9 (bus factor of 1).

---

### Historical: the run-1 P0 set (all closed)

Kept for provenance. Status against HEAD is in the run-3 table above.

| # | Gap | Evidence | Effort |
|---|---|---|:---:|
| P0-1 | **No formatting utilities.** No currency/number/percent/compact/date formatter, no locale handling. `StatCard.value` is typed `string`, so consumers hand-concatenate — stories already do: `` `$${premium.toLocaleString()}` ``. | `src/lib/` contains only `utils.ts` (13 lines, `cn()` alone); `data-table.stories.tsx:248` | **M** |
| P0-2 | **No data-error state.** 0 of 73 components accept a data-fetch `error` prop (the 3 that exist are form validation). A failed API call is indistinguishable from an empty result. | no `error-state.tsx`; `data-table.tsx` has no error branch | **S** |
| P0-3 | **Toasts render behind every overlay.** | `toast.tsx:27` `z-[100]` vs `dialog.tsx:29,58`, `sheet.tsx:30`, `popover.tsx:30` all `z-[1500]` | **S** |
| P0-4 | **The shadcn CSS-var layer has drifted from the tokens.** 26 of 34 variables decode to a different hex than they state. Material cases: `--foreground` decodes `#00174c`, states `#000f47`; `--primary` decodes `#00337a`, states `#002c77`. A shadcn component and an MUI component show different navies side by side. | `src/styles/token-variables.css` — independently verified by decoding each HSL triplet | **S** |
| P0-5 | **The product page makes accessibility claims the codebase does not substantiate.** `Portfolio.tsx:600` states *"Focus order, focus trapping in modals, and skip-links implemented throughout"* and `:615` *"Tested with axe-core and VoiceOver"*. There are **zero focus-trap implementations**, **zero skip links** — the only match for "skip-link" in all of `src/` is that sentence — and no artefact of any screen-reader testing. | verified by exhaustive grep across `src/` | **S** |
| P0-6 | **451 lines of accessibility tests exist and never run.** `vitest.config.ts:42` excludes `src/**/*.accessibility.test.tsx`, silently disabling `Header.accessibility.test.tsx` (259 lines) and `SideNavigation.accessibility.test.tsx` (192 lines). | both files present, neither in the 169 that execute | **S** |

> **Severity note, stated honestly.** P0-4 is a *consistency and trust* defect, not an
> accessibility one — `#00174c` and `#000f47` are both ~18:1 on white, and no
> contrast threshold breaks. It is P0 because it is the seam between the governed
> token system and what users actually see, and because it is the one link in the
> chain with no build step: `token-variables.css` is transcribed by hand into a
> different colour space, guarded by a test covering exactly **one** variable
> (`src/__tests__/ring-css-var.sync.test.ts`) — written after this precise failure
> had already shipped once.

### Historical: the run-1 P1 set

Kept for provenance. P1-2, P1-3, P1-6, P1-10 and P1-11 have since moved —
see the run-3 list above for their current state.

| # | Gap | Evidence | Effort |
|---|---|---|:---:|
| P1-1 | **No multi-brand mechanism.** A second brand requires a fork today. Blocked by `getRoleColor()` returning resolved hex with no brand parameter, across 133 caller files. | `src/theme/roles.ts:172`; `ResolveRoleOptions` carries only `mode` | **L** |
| P1-2 | **No z-index scale.** `1500` hardcoded 16× across 3 syntaxes; `data-table` uses `zIndex:1/2/3` for sticky headers while `table.tsx:187` uses `z-10` for the same job. | zero z-index tokens in `tailwind.config.js` or `src/theme/` | **S** |
| P1-3 | **`TooltipContent` is exported raw and unstyled** — no background, no radius, no z-index. Composing the standard shadcn shape yields an invisible tooltip. | `tooltip.tsx:136` | **S** |
| P1-4 | **No virtualization, and the hand-rolled `Table` renders everything by default.** Pagination is opt-in there; 1,000 rows → 1,000 `<tr>`. No windowing library installed. | measured: 166 ms / 1000 rows; `table.tsx:118` | **M** |
| P1-5 | **Six components are uncontrolled-only** — `tabs`, `accordion`, `list`, `table`, `side-navigation`, `notifications-drawer`. `table.tsx` fires `onSort` *after* sorting locally, so server-side sort is impossible through it. | `tabs.tsx:57`, `table.tsx:91-95` | **M** |
| P1-6 | **38 of 73 components lack `forwardRef`; 7 reject `className`; only 5 support `asChild`.** `breadcrumbs.tsx:65` hardcodes `<a href>`, so every breadcrumb full-page-navigates despite `react-router-dom` being a dependency. | counts across `src/components/ui/` | **M** |
| P1-7 | **A second, undeclared palette.** `src/styles/_tokens.scss` defines 143 colours, **122 of which (85%) exist nowhere in `src/tokens.ts`** — turquoise, teal, pink, orange, crimson families with no MDS counterpart. Consumed by 19 SCSS files, invisible to every governance script. | `src/styles/_tokens.scss` | **M** |
| P1-8 | **The hex checker has a blind spot.** `button.tsx` carries `roles-allow-hex-file`, so its **81 hex literals report as 0**. The scan is also limited to `src/components`, leaving ~617 literals in `src/pages`/`src/projects` unscanned. Reported total 125; actual repo-wide ~823. | `check-role-usage.js:17,79`; `button.tsx:3` | **S** |
| P1-9 | **Bus factor of 1.** `CODEOWNERS` names one owner on all 8 paths — its own comment calls this "a bus factor, not a review process". No deprecation window, no support commitment. | `.github/CODEOWNERS` | **S** |
| P1-10 | **No composed filter bar; no date-range presets.** The toolbar is welded inside `DataTable` with no slot, so it cannot host a date filter. No "Last 7 days / MTD / YTD". | `data-table.tsx:370-473`; `date-picker.tsx:90-129` | **M** |
| P1-11 | **No app shell or layout primitive.** The shell is hand-assembled by each consumer — no `AppShell`/`DashboardLayout`, no responsive grid component. | no such export in `src/components/` | **M** |
| P1-12 | **Coverage is misconfigured.** `vitest.config.ts` has no coverage block — no include/exclude, no thresholds — so the headline number instruments Storybook's own built bundles. | reported **4.6%**; scoped to `src/components/ui/**/*.tsx` it is **45.25%** | **S** |

### P2 — quality and scale

| # | Gap | Effort |
|---|---|:---:|
| P2-1 | Two incompatible table APIs both exported (`ColumnDef` vs `TableColumn`), plus a third MUI DataGrid lineage. | **L** |
| P2-2 | Grouped headers render structurally wrong — the `<th>` never emits `colSpan={header.colSpan}` (`data-table.tsx:495-506`). Latent until nested columns are used. | **S** |
| P2-3 | Prop vocabulary unguarded beyond `size`/`tone`: 3 names for primary text, 5 for secondary, **8 for change handlers**, 3 for icons; `error` vs `invalid` both declared in `select.tsx` and `radio-group.tsx`. | **M** |
| P2-4 | No density tokens. The only density control is uncontrolled internal state in one component. 15/73 expose a size-ish prop under 4 names and 4 scales. | **M** |
| P2-5 | Chart palette is CSS-only (unreachable from TS), categorical-only, and **silently recycles hue 1 at series 6** against its own documented intent. No sequential or diverging scale. | **M** |
| P2-6 | Typography sits entirely outside the token pipeline — no DTCG export, no drift check. Tailwind never extends `spacing`/`fontSize`, so the MDS spacing scale never reaches the Tailwind track. | **M** |
| P2-7 | 0 of 73 components carry a maturity label; no per-component subpath exports (MUI ships 156). | **M** |
| P2-8 | `src/styles/_semantic-tokens.scss` and `_theme-dark.scss` are imported by nothing but read as authoritative. | **S** |

---

## (d) 30 / 60 / 90-day plan

### What to do next — run 3 recommendation

With the P0 list empty, the theme of the next block of work changes. Run 3's
lesson was not that a particular thing was broken — it was that **the repo
could not tell the difference between "green" and "correct"** for anything it
did not directly check. Four of the five items below are about closing that
gap, not about features.

| # | Do this | Why now | Effort |
|---|---|---|:---:|
| 1 | **Give the axe gate a self-test** (P1-16) | The single highest-leverage item on the list. This gate is the evidence behind the accessibility claim on a public page, it guards 630 stories, and it has *already* silently run zero checks once. Everything else in area 5 is asserted on top of it. | **S** |
| 2 | **Run coverage in CI, and type-check the tests** (P1-17, P1-18) | Same shape as the published-types defect: configuration that exists and is never executed. Both are one workflow line and one tsconfig change. | **S** |
| 3 | **Export a composable `Tooltip` root** (P1-14) | The only *functional* break left: a publicly exported component that throws when used the documented way. | **S** |
| 4 | **Focus-ring pass across the 45 components that have none** (P1-15) | The largest genuine accessibility gap, and the one the green gate cannot see. Also what makes the corrected Portfolio claim true rather than merely accurate. | **M** |
| 5 | **Decide `--primary`: blue1000 or blue1100** (P1-22) | Not a bug — an unmade decision that is currently rendering two different brand blues depending on whether a component reads the CSS var or the role. Needs an owner, not a commit. | **S** |

After those, the two structural decisions that still need an owner rather than
a commit: **multi-brand theming** (P1-1 — `getRoleColor()` returns resolved hex
with no brand parameter, 133 caller files) and **bus factor 1** (P1-9).

Deliberately *not* recommended next: virtualization (P1-4). `DataTable`
paginates by default, so it only bites the hand-rolled `Table`, and the two
table APIs should be reconciled (P2-1) before either is optimised.

> **A note on how run 3's P0s were found.** None came from the CI gates; all
> three came from independent agents told to verify the previous run's claims
> rather than extend them. The gates were not wrong — they were answering
> narrower questions than anyone reading "8 green checks" would assume. That
> is worth remembering when this document is next used to argue the system is
> ready.

---

Sequenced by dependency, not effort. Each stage unblocks the next.

### 30 days — close the P0s and stop the bleeding

0. **Correct or substantiate the accessibility claims on `Portfolio.tsx`**
   (P0-5). Either implement skip links and focus traps, or amend the copy today.
   Advertising conformance you cannot evidence is the one item here that carries
   legal rather than engineering risk. **Un-exclude the 451 lines of a11y tests**
   at `vitest.config.ts:42` in the same change (P0-6), and find out why they were
   excluded — if they fail, that is itself the finding.
1. **Generate `token-variables.css` from `roles.ts`** in `build-tokens.js` (P0-4).
   The emitter and the data both already exist; this is the highest
   value-to-effort item in the document and it also removes a whole class of
   future drift.
2. **Ship a formatting module** — `formatCurrency`, `formatNumber`,
   `formatPercent`, `formatCompact`, `formatDate`, with an `Intl` locale context
   and an explicit null convention (P0-1). Change `StatCard.value` to accept
   `number | string`.
3. **Add an `ErrorState` component** and an `error` prop to `DataTable`,
   `Table` and the KPI cards (P0-2).
4. **Add a z-index scale** to the Tailwind theme and move all 16 hardcoded
   `1500`s onto it; put the toast viewport above overlays (P0-3, P1-2).
5. **Add a second `CODEOWNERS` owner** and a deprecation window to
   `docs/CONTRIBUTING.md` §Releases (P1-9) — hours of work, highest
   organisational risk in the document.
6. **Configure coverage** (`include`/`exclude`/thresholds) so the number means
   something and can gate (P1-12).

### 60 days — make it safe for a second team

7. **Decide the theming architecture.** Either commit to `var(--role-*)` and
   migrate components off `getRoleColor()`, or accept single-brand and say so
   explicitly in the docs. **This is a decision, not a task** — and it should be
   made before more teams build on the current model, because the migration cost
   grows with every consumer (P1-1).
8. **Composition pass:** `forwardRef` everywhere, `className` on all 73,
   `asChild` on `Badge`/`Card`/`Chip`/`Breadcrumbs`, and controlled props for the
   six uncontrolled-only components (P1-5, P1-6).
9. **Fix `TooltipContent`** and audit the other raw re-exports (P1-3).
10. **Retire or absorb `_tokens.scss`** — 122 orphan colours is a second design
    system hiding in the repo (P1-7). Delete the two dead SCSS token files.
11. **Extract the DataTable toolbar** into a composable filter bar and add
    date-range presets (P1-10).
12. **Widen the hex checker** to the whole `src/` tree and convert `button.tsx`'s
    file-level opt-out into tracked, line-level annotations (P1-8).

### 90 days — make it a platform

13. **Virtualization** for both tables, or a documented row-count ceiling (P1-4).
14. **App shell + layout primitives** (P1-11) — an `AppShell`/`DashboardLayout`
    and a responsive grid component, so each consumer stops hand-assembling one.
15. **Component maturity ladder** (experimental/beta/stable) with objective
    criteria, surfaced in Storybook and a generated status page (P2-7).
16. **Consolidate the table story** — one table API, not three (P2-1).
17. **Visual regression** actually running, and **interaction tests** using
    `@testing-library/user-event` (not yet a dependency).
18. **Density tokens** and a provider, so a dashboard can be set compact globally
    (P2-4).

---

## (e) Checks that could not be run

These are findings in their own right — each is a gap in the tooling, not in the
audit.

| Check | Why it could not run |
|---|---|
| **Visual regression** | A local baseline tool exists (`scripts/visual-baseline.js`) and has caught one real defect, but there is **no npm script and no CI step**, so nothing diffs on a PR. Run 2 described this as "now genuinely runs", which overstated it: it runs when a human runs it. |
| **Cross-browser** | The story suite runs **chromium only** (`vitest.config.ts` browser instances). No Firefox or WebKit coverage, so no Safari-specific layout or focus behaviour is verified. |
| **Animated-path accessibility** | The suite forces reduced motion globally for a documented and correct reason (axe mis-reads mid-flight opacity as contrast failures). The consequence is that **the non-reduced-motion path is never axe-tested**. |
| **Screen-reader behaviour** | No NVDA/JAWS/VoiceOver pass is possible here. Automated axe covers roughly a third of WCAG; focus order, meaningful sequence and error identification remain unverified. The unsubstantiated VoiceOver/"screen reader validated" claims in `Portfolio.tsx` were corrected at run 3. |
| **Dark-mode rendered contrast** | Only **2 of 630** axe-checked stories opt into dark mode (`stat-card.stories.tsx:295`, `metric-card.stories.tsx:165`) — and both exist *because* dark contrast bugs were found there. Token-level dark contrast is enforced; rendered dark contrast is not. |
| **Focus visibility (WCAG 2.4.7)** | Axe does not check focus indication at all, so the gate gives zero signal. `getFocusRingSx` (`src/theme/focusRing.ts`) is used by **0 of 79** `ui/` components; **45** have no focus styling and fall back to the UA outline. |
| **ARIA semantic truthfulness** | Axe validates ARIA syntax, not whether it is true. `MegaMenu.tsx:117` declares `aria-modal="true"` with no focus trap and no accessible name — syntactically valid, semantically false. No tool here can catch that class of defect. |
| **Accessibility conformance record** | No VPAT or ACR exists, so there is nothing to hand to procurement. |
| **Real-browser render performance** | The 1k-row figures below are **jsdom**, not a real browser. Treat the DOM node counts as the reliable signal and the milliseconds as indicative only. No Lighthouse or React Profiler run. |
| **Multi-brand** | Untestable — no second brand exists to test with. The blockers in P1-1 are derived from source, not from an attempted migration. |
| **SSR / Next.js App Router** | Partly closed, and this row was **wrong at run 2**. "Derived from source, not observed" was doing real damage here: `ThemeModeProvider` read `localStorage` in a `useState` initializer and threw `ReferenceError` on any server render — the crash was in the source the claim was derived *from*. Run 3 added `ThemeModeContext.ssr.test.tsx` under `@vitest-environment node`, which is the only environment in the repo where `typeof window === 'undefined'`, so provider-level SSR is now observed rather than assumed. Still **no Next.js app stood up** end-to-end, and no other component has an SSR test. |
| **Consumer upgrade path** | No real downstream consumer exists, so nothing validates that a version bump is non-breaking in practice. |

---

## (f) Evidence appendix

Every number above is reproducible. Commands as run:

```bash
# Packaging
npm pack --dry-run                       # tarball contents, LICENSE inclusion
npm run build:package                    # 74 modules, median 3.6 kB, styles.css 11.4 kB gz
npm audit --omit=dev                     # 0 production vulnerabilities

# Tokens
npm run tokens:validate-dtcg             # 413 tokens, 215 aliases — DTCG conformant
npm run tokens:contrast:all              # 20 pairs × light+dark; 18 enforced, 1 WARN
npm run roles:check                      # 0 role violations; 125 hex reported (see P1-8)
npm run tokens:check-vars                # 34/34 self-consistent; 2 role divergences, both recorded
npm run zindex:check                     # all 8 site groups on the scale (new at run 3)

# The published artifact — the gap that produced run 3's P0s
npm run build:package                    # now ends with check-package-types.js
npm run pkg:types:check                  # 93 re-exports resolve; consumer compiles clean

# Testing
npm test                                 # 1,295 tests / 185 files, incl. axe on 630 story entries
npx vitest run --project unit --coverage \
  --coverage.include='src/components/ui/**/*.tsx' \
  --coverage.exclude='**/*.stories.tsx'  # 45.25% stmts / 79.52% branches / 46.83% funcs

# Type safety
npx tsc -b --force                       # clean
grep -rhoE ':\s*any\b' src/components/ui/*.tsx | wc -l   # 0
```

**1k-row render performance** (jsdom; DOM counts are the reliable signal):

| Path | Time | `<tr>` in DOM |
|---|---:|---:|
| `DataTable` default (paginates) | 50 ms | 10 |
| `DataTable` `pageSize={1000}` | 251 ms | 1000 |
| `Table` — pagination **not** enabled (the default) | 166 ms | 1000 |
| `Table` — pagination enabled | 17 ms | 25 |

Neither table uses `React.memo` or `useCallback`; `data-table.tsx` has 3 `useMemo`,
`table.tsx` has 2.

**Component-set counts** (denominator 73, excluding `.stories`/`.test`):

| Metric | Count |
|---|---|
| Use `cva` | 23 |
| Hand-rolled variants (3 idioms) | 18 |
| Use `cn()` | 65 |
| Accept `className` | 66 |
| Use `forwardRef` | 35 |
| Support `asChild` | 5 |
| Call `getRoleColor()` | 58 (518 call sites) |
| Use `var(--role-*)` | 2 |
| Use inline `style={{}}` | 54 (246 literals) |
| Have a `loading` prop | 4 |
| Have a data-`error` prop | 0 |
| Carry a maturity label | 0 |

---

## Findings that did not survive verification

A sub-agent reported that `table.tsx` row selection breaks across pages because
indices are page-relative. **Checked and dropped:** selection *is* cleared on page
change (`table.tsx:304,309`), so the indices stay consistent. The real limitation
is narrower — selection cannot be *accumulated* across pages — which is a feature
gap, not a defect.

**A stale code comment became a finding.** P1-11 originally claimed a live
cascade collision — that `_grid.scss` defined unprefixed `.grid-cols-1..12`
which beat Tailwind's. The evidence was a warning comment in
`DashboardDemo.tsx`. Re-checking the source found **zero** unprefixed
`.grid-cols-N` rules in the SCSS and **zero** in the built app CSS: the legacy
utilities were namespaced to `.mds-legacy-grid-cols-*` at some point, and the
comment outlived the problem. The comment has since been corrected. P1-11 stands
on the missing app shell alone.

Recorded deliberately. Every P0 in this document was re-verified against source
or command output before publication, and these are what that process caught. A
warning comment is evidence that something was once true, not that it still is.

---

## See also

- [`DS_HEALTH_REPORT.md`](./DS_HEALTH_REPORT.md) — the recurring internal health
  report and its DEFERRED register. Findings here that need tracking over time
  belong there too.
- [`MAINSTREAM_REUSE_ASSESSMENT.md`](./MAINSTREAM_REUSE_ASSESSMENT.md) — the
  earlier cross-project readiness view; overlaps §1 and §10.
- [`GOVERNANCE.md`](./GOVERNANCE.md) — the four governance systems referenced in §10.
