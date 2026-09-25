# Data Table / Data Grid — audit against the Experience Specification

**Date:** 2026-09-25
**Spec:** *Data Table & Data Grid — Experience Specification* (§1–58)
**Scope:** `src/components/ui/data-grid*`, `data-table*`, `data-state`, `table`, `empty`, `error-state`
**Status:** Audit only. Nothing was rebuilt — per spec §58, *"Do not immediately rebuild the component."*

> **On this file's location.** The spec asks for `docs/data-table/audit.md`. This repo's
> own governance (CLAUDE.md §Documentation Governance) says scoped, in-progress work goes
> under `docs/tasks/`, and that a new top-level category should not be invented for one
> file. `docs/tasks/data-grid-backlog.md` already lives there. If the follow-on documents
> (`architecture.md`, `migration-plan.md`, `accessibility.md`) are commissioned, a
> `docs/tasks/data-table/` subdirectory becomes justified; one file does not.

---

## Executive summary

**The system is in better shape than the component count suggests, and the gaps are
concentrated in one place: enterprise workflow, not table mechanics.**

Of the spec's eight capability groups, **five are substantially complete** (structure,
exploration, customisation, large data, spreadsheet). The two thinnest are **data
management** (§3.03 — bulk actions, row actions, select-all-filtered) and **saved views /
configuration persistence** (§18–19), which the spec calls "a first-class enterprise
capability."

The single most consequential finding is **not** a missing feature. It is that
**`select all` has no filtered-scope semantics** (§9). A user selecting "all" today gets
the current page, with nothing in the API or the UI distinguishing that from "all 12,482
filtered results." The spec calls this out explicitly: *"Never leave the meaning of
'Select all' ambiguous."* Every bulk action built on top of that inherits the ambiguity,
so this blocks §10 rather than sitting alongside it.

Second: **there is no export**, at all. The audit initially recorded one — that was a
false positive on the JavaScript `export` keyword. §32 is entirely unimplemented.

Third, and unlike the above, a *structural* success worth protecting: the
`DataGrid` → `DataTable` → `data-state` → `empty`/`error-state` layering already matches
what §4 and §37 prescribe. `DataTable` is a genuine preset over `DataGrid` (it imports it
at line 18, it does not fork it), and `data-state` is shared by six non-table modules.
**No merge is warranted**, and merging them would break `chart`, `list` and `stat-card`.

---

## Current architecture

```
data-grid.tsx            composable core — context, container, scroll area     245 LOC
  ├─ data-grid-table.tsx     header/body/footer, states, spreadsheet render   1231 LOC
  ├─ data-grid-toolbar.tsx   search, density, column visibility                208 LOC
  ├─ data-grid-pagination.tsx                                                  103 LOC
  ├─ data-grid-features.ts   TanStack v9 feature registration                  211 LOC
  ├─ data-grid-rows.tsx      expand / row-pin column factories                 156 LOC
  ├─ data-grid-cell-selection.ts  clipboard, fill, paste, validation           295 LOC
  ├─ data-grid-cell-edit.tsx      the in-cell editor                           107 LOC
  ├─ data-grid-clipboard.ts       TSV serialise/parse/tile                     142 LOC
  └─ data-grid-filter-fns.ts      filter registry                               40 LOC

data-table.tsx           a PRESET over the above (imports it, line 18)         449 LOC
  ├─ data-table-faceted-filter.tsx                                             159 LOC
  ├─ data-table-sort-list.tsx                                                  121 LOC
  └─ data-table-date-filter.tsx                                                113 LOC

data-state.tsx           the four-state vocabulary — used by 6 UI modules      241 LOC
  ├─ empty.tsx           primitive (shadcn port)                               112 LOC
  └─ error-state.tsx     primitive                                             220 LOC

table.tsx                @deprecated since 0.7.0, remove after 0.8.0           357 LOC
```

**Dependencies:** `@tanstack/react-table@^9`, `@tanstack/table-core@^9`,
`@tanstack/react-virtual@^3.14`. No other table library. Spec §53.1 satisfied — nothing
new was added.

---

## Capability matrix

Legend: **✅ complete** · **◐ partial** · **✗ missing** · **⊘ deliberately excluded**

### 01 Structure (§3)

| Capability | Status | Notes |
|---|---|---|
| Container / viewport | ✅ | `DataGridContainer` + `DataGridScrollArea` |
| Caption / accessible name | ✅ | real `<caption>`; test asserts it |
| Toolbar | ✅ | `DataGridToolbar` |
| Header / column header | ✅ | incl. grouped headers with correct `colspan` |
| Row / cell | ✅ | |
| Footer | ✅ | `showFooter` renders `<tfoot>` from column `footer` |
| Pagination | ✅ | `DataGridPagination` |

### 02 Data exploration (§8)

| Capability | Status | Notes |
|---|---|---|
| Global search | ✅ | `searchKey` on the toolbar |
| Sort | ✅ | |
| Multi-column sort | ✅ | `enableMultiSort: true` (`data-table.tsx:360`) |
| Column filter | ✅ | |
| Faceted filter | ✅ | with counts |
| **Advanced filter** (§8.5) | **✗** | no condition builder, no operator set |
| **Grouping** | **✗** | referenced only in comments as *not* implemented |
| Expand | ✅ | `createExpandColumn` |

### 03 Data management (§9–11) — **the weakest group**

| Capability | Status | Notes |
|---|---|---|
| Row selection / multi-select | ✅ | `createSelectColumn` |
| **Select all FILTERED results** | **✗** | **P0.** No `allFilteredRowsSelected`, no scope UI |
| **Bulk actions** (§10) | **✗** | no selection-context action bar |
| **Row actions** (§11) | **✗** | no primary/contextual/overflow pattern |
| Cell editing | ✅ | commit/discard, validation, rejection reporting |
| **Row editing** (§15.2) | **✗** | |

### 04 Customisation (§7, §18–19)

| Capability | Status | Notes |
|---|---|---|
| Resize | ✅ | |
| Reorder | ✅ | keyboard-first, region-aware |
| Show/hide columns | ✅ | |
| Pin columns | ✅ | start/end |
| Pin rows | ✅ | |
| Density | ✅ | compact / standard / comfortable |
| **Reset configuration** | **✗** | |
| **Saved views** (§18) | **✗** | **the largest single gap**; spec calls it first-class |

### 05 Large data (§20–23)

| Capability | Status | Notes |
|---|---|---|
| Pagination | ✅ | |
| Server operations | ✅ | manual pagination trusting `pageCount`; test-pinned |
| Virtual rows | ✅ | spacer-row approach, preserves sticky/pinned |
| **Virtual columns** | **✗** | |
| **Infinite scroll** | **⊘** | documented exclusion (`data-table.tsx:209`) — pagination judged the more accessible answer |
| **URL state** (§24) | **✗** | no serialisation of filters/sort/page |

### 06 Hierarchy (§13–14)

| Capability | Status | Notes |
|---|---|---|
| Expandable row | ✅ | |
| Detail panel / master-detail | ✅ | `renderDetail`, not counted in `aria-rowcount` |
| Sub-rows | ✅ | |
| **Nested table** | **✗** | |
| **Tree data** | **✗** | |

### 07 Analytics (§25)

| Capability | Status | Notes |
|---|---|---|
| Footer totals | ◐ | `<tfoot>` renders; the consumer computes the value |
| **Aggregation helpers** | **✗** | no sum/avg/min/max |
| **Page vs dataset aggregate distinction** | **✗** | §25's core requirement |

### 08 Spreadsheet (§26) — **complete**

| Capability | Status |
|---|---|
| Cell selection · range selection · copy/paste · keyboard nav · cell editing · fill | ✅ |

### Cross-cutting

| Capability | Status | Notes |
|---|---|---|
| **Export** (§32) | ◐ | CSV export exists (`enableExport`). **No scope choice** — serialises `getFilteredRowModel()`, which is one page in server mode |
| **Permissions** (§31) | ◐ | cell-level `readonly` rejection exists for paste/fill; no table/row/column model |
| **Responsive / column priority** (§27) | **✗** | no `priority: essential\|secondary\|tertiary`, no strategy |
| Loading / empty / no-results / error | ✅ | four-state vocabulary, distinct copy for empty vs filtered-empty |
| Interaction conflict rules (§34) | ◐ | 12 tests in `data-grid-edges.test.tsx` cover row-click vs checkbox, selection vs expansion, cell-selection vs row-click. Not covered: sort vs resize handle, drag vs header menu, bulk selection vs pagination |

---

## Accessibility findings

**Strong, and better than the spec's floor in places.**

- `role="grid"` is applied **only** in cell-selection mode; a read-oriented table stays a
  native `<table>`. This is exactly §2.3, and there is a test named for it.
- Real `<caption>`, per-column alignment on both header and body, `aria-rowcount`
  excluding detail rows.
- Rows stay `role=row` when clickable — an explicit `role="button"` on `<tr>` destroys the
  table's structure, and a test pins it.
- Every story is axe-gated at **error** severity.

**Gaps against §33:**

| Requirement | Status |
|---|---|
| Selection accessible name — "Select Asset 10428", not "Select row" | **✗ not verified** |
| Sort state announced on change | ◐ `aria-sort` present; no live announcement |
| 200% / 400% zoom | **✗ untested** |
| Forced colors / high contrast | **✗ untested** |
| Screen-reader strategy for virtualised rows | **✗** |
| Resize/reorder keyboard alternative | ✅ reorder is keyboard-first; **resize is pointer-only and undocumented as such** |

---

## Storybook gaps (§42)

**24 of ~50 required stories exist.** Present: Default, Loading, Empty, EmptyFiltered,
EmptyCustom, Selectable, ColumnVisibility, ColumnControls, ServerPagination, LargeDataset,
InlineEditing, Virtualized, SpreadsheetSelection, RowExpansionAndPinning,
ConsumerOwnedState, FullFeatured, FullToolbar, plus 4 DataState and 9 legacy `Table`.

**Missing, in spec order:** `Bordered`, `Borderless`, `HorizontalOverflow`, `StickyHeader`,
`DataTypes`, `MultiSort`, `AdvancedFilter`, `SelectAllResults`, `BulkActions`, `RowActions`,
`MasterDetail`, `NestedTable`, `Grouped`, `TreeData`, `ColumnResize`, `ColumnReorder`,
`SavedViews`, `Totals`, `Aggregation`, `RowEditing`, `ValidationError`, `CRUD`,
`VirtualColumns`, `InfiniteScroll`, `Refreshing`, `PartialError`, `ReadOnly`,
`PermissionRestricted`, `Responsive`, `Localization`.

**None of the §40 enterprise reference patterns exist** — no Asset Management, Approval
Workflow, Audit Log, Financial Reporting or Hierarchical Portfolio story. §41's Storybook
IA is not reflected at all: everything sits flat under `Components/DataGrid` and
`Components/DataTable`.

---

## Test gaps

**Existing: ~90 tests across 7 files**, and they are behavioural rather than snapshot —
edge cases, ARIA contracts, keyboard. That is the right shape.

Not covered:
- select-all scope semantics (nothing to test yet)
- saved-view serialisation (§43 names it explicitly)
- aggregation correctness
- formatting/localisation
- three §34 interaction conflicts (listed above)
- performance at 5,000 / 50,000 rows (§43 names these tiers)

---

## UX inconsistencies found

1. **Three ways to render a table.** `table.tsx` is deprecated (*remove after 0.8.0 /
   2026-12-23*) but still has **5 app consumers and a Figma mapping**. The deprecation
   clock is running against code nobody has moved.
2. **`DataTable` has 28 props.** §53.7 says *"prefer composition over dozens of boolean
   props."* `DataGrid` is the answer to this and already exists — but `DataTable` is what
   3 of the 4 app consumers actually use.
3. **Footer totals are the consumer's problem.** The grid renders `<tfoot>` but computes
   nothing, so every product will reimplement sums — §6 and §48 both warn against exactly
   this ("avoid reimplementing currency/date/percentage formatting in individual product
   tables").

---

## Recommended priorities

### P0 — core correctness
1. ~~**Select-all scope semantics** (§9)~~ — **done 2026-09-25**. `useSelectionScope` +
   `DataGridSelectionBanner`, wired into `DataTable`.
2. ~~**Selection accessible names** (§33)~~ — **done**. `createSelectColumn({ getRowLabel })`.
3. **Migrate the 5 `table.tsx` consumers** and delete it on schedule.

> **Found while doing 1–2, and worth recording.** Adding a story that selects rows *and*
> renders status badges made axe fail: `statusSuccessText` measured **4.16:1** on the
> selected-row fill. The cause was a correct fix made earlier in the same session —
> moving the grid's selected row from near-white `surface.accent` to Sky Blue
> `surface.selected`, to stop selected and hovered rows looking identical. It changed the
> backdrop every in-row badge composites against, and status colours had only ever been
> validated against white.
>
> No green fixes it: `green1000` is the darkest anchor in the ramp. And no tint fixes it
> either — every fill light enough for the badge to pass is too close to `surface.subtle`
> to distinguish selected from hovered. **Colour alone could not satisfy both
> constraints.** Resolved with `surface.selected.subtle` (a lighter fill) plus a left
> accent bar carrying the state, and three new contrast pairs so the gate can see it:
> status text on a *selected* row was never checked.

### P1 — enterprise essentials
1. **Bulk actions** (§10) — depends on P0.1.
2. **Row actions** (§11) — primary / contextual / overflow.
3. **Saved views** (§18) — the largest gap; needs a serialisation format and a test.
4. **Export scope** (§32) — the mechanism exists; it needs Current page / Selected rows /
   All filtered results, and must refuse to imply a dataset-wide export it cannot perform.
5. **Responsive column priority** (§27).
6. **Enterprise pattern stories** (§40) — at minimum Asset Management, the §55 milestone.

### P2 — advanced grid
Advanced filter builder (§8.5) · grouping · tree data · virtual columns · aggregation
helpers.

### P3 — enhancements
URL state (§24) · concurrent editing (§17) · shared saved views · permissions model (§31).

---

## Proposed implementation phases

Following §51 Phase 5, adapted to what already exists (phases 1–6 of the spec's ordering
are done):

| Phase | Work | Rationale |
|---|---|---|
| **A** | Select-all scope + accessible names | P0; everything in §10 depends on it |
| **B** | Bulk actions + row actions | the two biggest §3.03 holes |
| **C** | `table.tsx` retirement | a deprecation with a December deadline |
| **D** | Saved views + reset | §18, first-class per the spec |
| **E** | Export + responsive priority | §32, §27 |
| **F** | Asset Management reference story | §55 — proves A–E compose |
| **G** | Advanced filter, grouping, aggregation | P2 |

**Explicitly deferred, with reasons:** infinite scroll (already a documented exclusion);
virtual columns (no dataset in this product is column-wide enough to need it);
concurrent editing (no collaborative surface exists yet).

---

## What NOT to change

Per §53.6 and §53.2, these are working and should be preserved:

- the `DataGrid` → `DataTable` preset relationship — do **not** merge them;
- `data-state` / `empty` / `error-state` layering — shared by 6 non-table modules;
- the `role="grid"`-only-when-interactive decision (§2.3);
- the behavioural test suite in `data-table.test.tsx`, which is the contract the grid must
  keep honouring and is only worth anything while it runs unmodified.
