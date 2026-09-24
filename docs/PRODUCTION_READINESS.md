# Production readiness audit

**Audited:** 2026-09-23 · **Commit:** `847ceec` · **Auditor:** staff-level design-systems review
**Audience:** IT Development Lead, deciding whether other teams adopt this system
**Method:** parallel sub-agent audits per area, consolidated; every P0 re-verified first-hand
**Re-run with:** `/audit` (see `.claude/commands/audit.md`)

> **Scope note.** This audits the **shadcn/Radix component set** in `src/components/ui/`
> (73 components) and the package built from it — the half that is published and
> intended for reuse. The repo also contains an older MUI track and marketing-site
> components; those are called out only where they collide with the reusable half.

---

## Score history

| Run | Date | Commit | Overall | Notes |
|---|---|---|---|---|
| 1 | 2026-09-23 | `847ceec` | **1.9 / 3** | Baseline. Packaging repaired same-day (6 blocking defects fixed). |

---

## (a) Executive summary

**Verdict: conditionally ready.** Adopt for internal dashboard projects once the
six P0s below are closed. **Do not yet position it as the cross-brand foundation** —
one architectural decision (§2) makes multi-brand theming impossible without a
large refactor, and that should be decided before more teams build on it.

The system is **stronger than its component count suggests in the places that are
hard to fake, and weaker in the places that are easy to defer.**

**What is genuinely good, and better than a typical shadcn port:**

- **Accessibility automation is exemplary.** `.storybook/preview.tsx:120` sets
  `a11y: { test: 'error' }`, so an axe violation in any of 736 story entries
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

**What blocks production:**

1. **No formatting utilities exist at all** (§8). `src/lib/` contains one file:
   `cn()`. Zero currency, number, percent, compact, or date formatters; the only
   `Intl.` usage repo-wide is in a story. For an insurance/financial product this
   guarantees inconsistent currency and thousands separators across every screen.
2. **No data-error state** (§8). A failed fetch renders as "No data yet".
3. **Toasts render behind every overlay** (§4). `toast.tsx:27` is `z-[100]`;
   dialogs, sheets, popovers and selects are all `z-[1500]`.
4. **The CSS-variable layer that shadcn components actually render is
   hand-maintained and has drifted** (§2). 26 of 34 variables decode to a
   different colour than they claim.
5. **The product page claims accessibility features that do not exist** (§5) —
   focus trapping and skip links are advertised "throughout"; there are zero of
   each. This is a disclosure problem, not a code problem, and it is the one
   finding here with compliance rather than engineering consequences.

**A caution about the accessibility green light.** The axe gate is the best thing
in this repo and it is being read as broader assurance than it provides. It covers
603 stories — but ~601 of them render light mode only, so *dark-mode component
contrast is effectively unverified*; the suite forces reduced motion, so the
animated path is never sampled; axe cannot check focus visibility at all, and
39 of 73 components have no focus styling; and 451 lines of hand-written a11y
tests are excluded from the runner. Automated coverage is roughly a third of
WCAG at the best of times. Green here means "no detectable violation in a static,
light-mode, reduced-motion render" — which is worth having, and is not the same
as accessible.

**The strategic question, separate from the P0s:** 58 of 73 components resolve
colour by calling `getRoleColor()`, which returns a **hex string** computed at
render. Only 2 use `var(--role-*)`. That decision makes brand-switching a
re-render rather than a cascade change, makes `className` unable to override
component colour, and makes SSR always paint light mode. It is not a defect —
it works — but it is the single thing standing between this and a multi-brand
platform, and unwinding it touches 133 files.

---

## (b) Scorecard

| # | Area | Score | One-line justification |
|---|---|:---:|---|
| 1 | Architecture & packaging | **3** | Matches/beats all four benchmarks structurally; 41 deps with 0 extraneous and 0 undeclared; Button tree-shakes to 12 kB gz. |
| 2 | Tokens & theming | **2** | DTCG-conformant generated pipeline, but the hand-written CSS-var layer has 26/34 drifts and there is no multi-brand mechanism. |
| 3 | Component API quality | **1** | 38/73 lack `forwardRef`, 7 reject `className`, 5 support `asChild`, **8 vocabularies** for "value changed". Ad hoc across the set. |
| 4 | Radix usage | **1** | Wrapping and portals are mostly right, but there is **no z-index scale**, `1500` is copied 16×, and toasts render behind overlays. |
| 5 | Accessibility | **2** | Axe gates **603 stories** at error severity — genuinely exemplary. But ~601 of them run light-mode only, 451 lines of a11y tests are excluded from the runner, there are zero focus traps, and the product page claims otherwise. |
| 6 | Testing | **2** | 1,135 tests in a real browser with axe gating; coverage is misconfigured, 3/62 interaction tests, visual regression scaffolded but not running. |
| 7 | Type safety & DX | **2** | `strict: true` and **zero `any`** in the component set; but onboarding docs omit the required stylesheet import and 0/73 components carry a maturity label. |
| 8 | **Dashboard readiness** ⭐ | **2** | Strong table, CVD-validated chart palette, real date-range picker — against **zero formatters**, no error state, no virtualization, no app shell. |
| 9 | Performance | **2** | Small bundles (median 3.6 kB) and verified tree-shaking; no virtualization, no memoization in either table. |
| 10 | Governance & CI | **2** | Four gates run on every PR; bus factor of **1**, no deprecation window, and the hex checker has a blind spot hiding 81 literals. |

**Overall: 1.9 / 3.** ⭐ = weighted heaviest per the brief.

---

## (c) Prioritised gaps

### P0 — blocks production

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

### P1 — fix before broad adoption

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
| **Visual regression** | `@chromatic-com/storybook` is installed but there is **no chromatic script and no baseline**. Nothing has ever been visually diffed, so none of the colour drift in P0-4 can be confirmed as perceptible in situ. |
| **Cross-browser** | The story suite runs **chromium only** (`vitest.config.ts` browser instances). No Firefox or WebKit coverage, so no Safari-specific layout or focus behaviour is verified. |
| **Animated-path accessibility** | The suite forces reduced motion globally for a documented and correct reason (axe mis-reads mid-flight opacity as contrast failures). The consequence is that **the non-reduced-motion path is never axe-tested**. |
| **Screen-reader behaviour** | No NVDA/JAWS/VoiceOver pass is possible here. Automated axe covers roughly a third of WCAG; focus order, meaningful sequence and error identification remain unverified. Note `Portfolio.tsx:615` claims VoiceOver testing — no artefact, log or test substantiates it. |
| **Dark-mode rendered contrast** | Only **2 of ~603** axe-checked stories opt into dark mode (`stat-card.stories.tsx:295`, `metric-card.stories.tsx:165`) — and both exist *because* dark contrast bugs were found there. Token-level dark contrast is enforced; rendered dark contrast is not. |
| **Focus visibility (WCAG 2.4.7)** | Axe does not check focus indication at all, so the gate gives zero signal. `getFocusRingSx` (`src/theme/focusRing.ts`) is used by **0 of 73** `ui/` components; 39 have no focus styling and fall back to the UA outline. |
| **ARIA semantic truthfulness** | Axe validates ARIA syntax, not whether it is true. `MegaMenu.tsx:117` declares `aria-modal="true"` with no focus trap and no accessible name — syntactically valid, semantically false. No tool here can catch that class of defect. |
| **Accessibility conformance record** | No VPAT or ACR exists, so there is nothing to hand to procurement. |
| **Real-browser render performance** | The 1k-row figures below are **jsdom**, not a real browser. Treat the DOM node counts as the reliable signal and the milliseconds as indicative only. No Lighthouse or React Profiler run. |
| **Multi-brand** | Untestable — no second brand exists to test with. The blockers in P1-1 are derived from source, not from an attempted migration. |
| **SSR / Next.js App Router** | `"use client"` directives were added and verified present in the built output, but **no Next.js app was stood up** to confirm end-to-end. The SSR light-mode claim is derived from `roles.ts:167-170`, not observed. |
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

# Testing
npm test                                 # 1,135 tests / 169 files, incl. axe on 736 story entries
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
