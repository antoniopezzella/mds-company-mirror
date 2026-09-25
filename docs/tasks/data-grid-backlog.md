# DataGrid — backlog

**Status:** open · **Last updated:** 2026-09-26
**Context:** the DataGrid rework, benchmarked against [reui.io/components/data-grid](https://reui.io/components/data-grid).

This is what is **deliberately not built yet**, with enough context to pick any
item up cold. Everything here was a conscious decision, not an oversight — the
reasoning is recorded per item so nobody re-litigates it from scratch or, worse,
quietly builds something that was cut on purpose.

## Where the work got to

| Phase | Scope | State |
|---|---|---|
| 0 | Stacking gate (`check-z-index.js`) | **done** |
| 1 | TanStack v9 migration | **done** |
| 2 | Composable core — `DataGrid` / `DataGridTable` / `DataGridToolbar` / `DataGridPagination` | **done** |
| 3 | Column control — pinning, resize bounds, keyboard reorder | **done** |
| 4 | Rows — expansion, sub-rows, detail panels, row pinning | **done** |
| 5 | Scale — virtualization, footer aggregates | **done** |
| 6 | Spreadsheet — selection, clipboard, fill, keyboard nav, typed editors | **done bar the fill handle** — see §1 |

`DataTable` is now a ~330-line preset over the composable parts. Its 19 tests
run unmodified and are the regression harness for the layer beneath — **do not
rewrite them to fit a change**; if they fail, the change is wrong or the
contract genuinely moved and that needs saying out loud.

---

## 1. Spreadsheet layer — what is left

**Built:** `cellSelectionFeature` registered; `role="grid"` / `gridcell` +
`aria-rowindex`/`colindex`/`rowcount`/`colcount`/`multiselectable`/`selected`;
roving tabindex; range outline via `getSelectionEdges()`; the APG keyboard map
(arrows, Shift+arrows, Ctrl/Cmd+A/C/X/V, Ctrl/Cmd+D/R, Delete); TSV
clipboard (`data-grid-clipboard.ts`, pure + 16 tests); paste/clear/fill with
`{ source, changes, rejected }`; live-region announcements.

**Not built:**

### ~~1a. The fill handle~~ — done (click only)

A real `<button aria-label="Fill selection down">` on the selection's
bottom-right cell, firing the same `applyFill()` as Ctrl+D. **Drag-to-extend
is not implemented** — clicking fills the existing selection. Dragging the
handle to *grow* the range first is the remaining half, and it is pointer-only
sugar over a capability that is already keyboard-complete.

### ~~1b. Typed cell editors~~ — done

`data-grid-cell-edit.tsx` renders per `cellEdit.control` and commits through
`onCellsChange` with `source: 'edit'`, sharing `parse`/`format` with the paste
path so a typed edit and a paste cannot disagree about what a column accepts.
A rejected parse keeps the editor open and `aria-invalid` rather than
discarding what was typed.

**The `<button>` trap is fixed in grid mode**, where the `<td>` is the roving
focus target and no wrapper is rendered. It remains on the **legacy**
`meta.editable` + `onCellEdit` path, which `data-table.test.tsx` pins. That is
deliberate — those tests are the regression harness — but it means the hazard
is still reachable for a consumer using the legacy props with an interactive
cell. Retiring the legacy path is the real fix, and it needs a deprecation
window.

Only `text` and `textarea` controls exist, matching the declared contract. A
number or date column needs a `parse`, not a different input — and
`<input type="number">` would quietly reject paste-friendly formats like
"1,200".

### ~~1c. Home / End / PageUp / PageDown~~ — done

Including Ctrl+Home/End for grid start/end and Shift variants for extending.

### 1d. Multi-range selection

`enableMultiCellRangeSelection` and the `include`/`exclude` range operations
exist in v9 and are not exposed. `selectionRect()` deliberately unions all
ranges into one rectangle for paste — revisit if genuine multi-range lands.

## 2. Drag-and-drop reorder

**Keyboard reorder for columns is done** (Move left / Move right in the column
menu, region-aware, announced). What remains:

- **Pointer drag for columns** — the keyboard path exists, so this is purely
  additive.
- **Rows, both paths** — nothing built. Needs the same treatment: Space to
  lift, arrows to move, Space to drop, Escape to cancel, plus
  `aria-roledescription="sortable row"` and live-region position announcements.

**Do not add `@dnd-kit`.** 1.07 MB + 234 kB unpacked to reorder a 1-D list
inside one known container. What dnd-kit buys — nested droppables, collision
strategies, sensor abstraction, sortable strategies — none of it applies here.
~150 lines of Pointer Events in a shared `data-grid-reorder.ts` covers columns
and rows both, and the keyboard path has to be hand-written either way (dnd-kit's
`KeyboardSensor` still needs wiring and `announcements` supplied).

**Build the keyboard path first, always.** A drag-only reorder passes axe — it
cannot tell whether a `div` with `onPointerDown` is keyboard-reachable — and
fails WCAG 2.1.1.

---

## 3. Table convergence (audit P2-1)

Three table APIs are still exported:

| | |
|---|---|
| `src/components/ui/data-table.tsx` | the preset — canonical |
| `src/components/ui/table.tsx` | hand-rolled `Table`, `TableColumn` API |
| `src/components/DataGrid/` | MUI lineage, `MDSDataGrid`, **not in `src/index.ts`** |

**Correction to an earlier claim in this file.** It said the MUI grid "should
go before anything ships under the `DataGrid` name in Storybook, or the
sidebar has two". That is wrong on both counts, checked since:

- There is **no collision**: the MUI one is titled `Legacy (MUI)/DataGrid`,
  the new one `Components/DataGrid`. Different sidebar sections.
- It is unreachable from the *package* (not in `src/index.ts`), but it has
  **two live app consumers** — `src/App.tsx:18` and
  `src/pages/RESGAssetListPage/RESGAssetListPage.tsx:5`. Deleting it means
  porting both pages off `@mui/x-data-grid`, which is real work with real
  regression risk on pages nothing tests.

So this is not urgent, and it is not free. Port the two pages first, or leave
it where it is.

`table.tsx`'s capability gap is now **mostly closed** — a deprecation has to
point somewhere that can actually do the job:

| `table.tsx` | grid |
|---|---|
| `caption` | **done** — `caption` on DataGridTable, a real `<caption>` |
| per-column `align` | **done** — `meta.align` |
| `variant="striped"` | **done** — `striped` |
| `pageSizeOptions` | **done** — on `DataGridPagination` |
| `variant="bordered"` | `DataGridContainer` has `border`; per-cell borders do not exist |
| `size` sm/md/lg | the grid has *density* instead. Reconcile the vocabulary before deprecating — do not ship both. |
| tri-state sort (asc → desc → **none**) | still missing; the grid's header click has no "off", only the menu's Reset |

Deprecating it costs compliant `@deprecated` tags — `check-deprecations.js`
enforces `@deprecated since X.Y.Z; remove after A.B.C / YYYY-MM-DD.` and
`docs/CONTRIBUTING.md` requires one further minor **and** 90 days.

---

## 3b. Infinite scroll

Not built. Virtualization landed; infinite scroll did not.

Ship it as `onFetchMore` / `hasMore` / `isFetchingMore` props on
`DataGridTable` — an IntersectionObserver on a sentinel near the bottom
spacer, ~20 lines, **no data-fetching dependency**. Same shape as the existing
`manualPagination` / `onPaginationChange` pair.

Note the accessibility trade-off before choosing it over pagination: an
infinite list strands keyboard users above a footer they can never reach.
Pagination is the better default; infinite scroll is for feeds.

## 4. Known rough edges

| | |
|---|---|
| **`DataGridTable` cannot infer `TData` from context** | React cannot flow a generic through context, so `renderDetail` needs `<DataGridTable<Policy> …>` or a typed parameter, or `row.original` lands as `RowData`. Documented on the prop. A `createDataGrid<TData>()` factory returning pre-bound components would fix it properly. |
| **`headerHeight` is hardcoded to 40** | `data-grid-table.tsx` needs the header's height to offset top-pinned rows. Measuring it needs a ref + layout effect for a value the header itself hardcodes as `h-10`. Fine until the header becomes configurable. |
| **Grouped headers are untested** | `colSpan={header.colSpan}` was fixed (audit P2-2) but nothing exercises a grouped-header column def. |
| **Selection is page-scoped** | `createSelectColumn` uses `getIsAllPageRowsSelected` / `toggleAllPageRowsSelected`, so "select all" means the page, not the filtered set. Deliberate, but there is no affordance to select all matches. |
| **`estimateRowSize` is a guess until measured** | The virtualizer estimates at 44px and never calls `measureElement`, so rows of wildly varying height (a wrapped cell, an expanded detail panel) make the scrollbar drift. Wire `virtualizer.measureElement` as a row ref if that shows up. |
| **Virtualization + expansion untested together** | A detail row inside a virtual window is two `<tr>`s for one virtual index. Nothing exercises it. |
| **No `onRowClick`** | reui has it. Easy, but think about how it coexists with cell selection and interactive cells before adding it. |

---

## 5. Cut on purpose — do not build these without a reason to reopen

| Cut | Why |
|---|---|
| **reui's 38 Pro Blocks** | Paid tier, not MIT. The data-grid component itself **is** MIT and legitimately reusable with attribution; the blocks are not. |
| **Base UI flavour** | reui ships Radix *and* Base UI variants. This repo is Radix. One flavour. |
| **`sonner`** | `toast.tsx` already exists with a documented z-index decision (toasts deliberately above overlays). A second toast system would undo it. |
| **SWR / React Query for infinite scroll** | A design system should not pick a consumer's data layer. Ship `onFetchMore` / `hasMore` / `isFetchingMore` and let them bring a fetcher — the same shape `manualPagination` / `onPaginationChange` already uses. |
| **Tree rows (`role="treegrid"`)** | Different ARIA (`aria-level`/`posinset`/`setsize`) and a keyboard map that **conflicts** with grid navigation (left/right collapse/expand vs. cell movement). Sub-rows + detail panels cover the actual demand. No consumer here has hierarchical data. |
| **Row grouping with grouped headers** | "Footer aggregates" is served by `rowAggregationFeature` alone. Grouping brings grouped headers, which have their own untested surface (see above). |
| **`stockFeatures`** | Registers all 17 features and kills v9's tree-shaking. Register explicitly in `data-grid-features.ts`. |
| **reui's `i18n` prop bag** | No i18n layer in this repo. A grid-local string bag is a new unowned API that will diverge from whatever arrives later. Plain label props on the ~6 strings that need them. |
| **`onRowCreate` / `appendRow`** | The grid holds no copy of the data, so an "add row" affordance cannot add a row — it is a button that fires a callback, and `toolbarActions` already takes one. |
| **`getRowStatus: 'deleted'`** | `'new'` and `'dirty'` are grid state (the grid caused them). Soft-delete is domain logic. |
| **`cellFillHandleVariant`** | A variant prop for a 6×6px square is API for API's sake. |

---

## Ground rules for whoever picks this up

1. **Run `npm run lint`.** Not just `tsc` and the custom gates — a release
   already shipped broken because lint was never run locally.
2. **Prove a new gate fails** on the bug it is meant to catch before trusting
   it. Two gates in this repo passed while the defect they targeted was live.
3. **Assert on content, not counts.** A row count of "more than zero" stays
   true when the table renders its empty-state row, so a filter test can pass
   against a filter matching nothing.
4. **jsdom cannot do sticky layout** and reports every element as 0×0. Pinning,
   virtualization and anything measured belong in a browser story.
5. **Anything re-exported from `src/index.ts`** outside `src/components/ui/`
   must be added to the dts `include` in `vite.lib.config.ts`, and any package
   its *types* reference must be a declared dependency — `check-package-types.js`
   gates both.

## See also

- [`docs/PRODUCTION_READINESS.md`](../PRODUCTION_READINESS.md) — P1-4 (virtualization), P2-1 (table convergence), P2-2 (grouped headers)
- [`docs/CONTRIBUTING.md`](../CONTRIBUTING.md) — the deprecation window
- `src/components/ui/data-grid-features.ts` — the single TanStack registration site
