# Filters — assessment against reui, and what we should actually build

**Date:** 2026-09-25
**Reference:** [reui.io/components/filters](https://reui.io/components/filters)
**Related:** [`data-table-audit.md`](./data-table-audit.md) §8 · Storybook → Foundations → Choosing a table
**Status:** Assessment. Steps 1–3 built (3 partially — `FilterBar` not yet migrated).

---

## Headline

**We do not need a Filters component. We need a filter *schema*.**

Six of reui's six field types are already implemented here, most of them twice. What
reui has that we do not is the thing underneath: **one declarative field definition** that
every control, the applied-filter chips, the URL serialiser and the server query all read
from. We have five filter components that share no definition, so each one re-states what
a filter *is* in its own shape.

Building a sixth component would make that worse. The work is to unify, then fill two
genuine holes.

---

## What reui's Filters actually is

| | |
|---|---|
| **Field types** | text search · single select · multi-select · date range · number range · boolean |
| **Anatomy** | field schema → type-specific controls → applied chips with remove → clear-all |
| **State** | serialised to the URL (`nuqs`), so a filtered view is shareable and bookmarkable |
| **Validation** | Zod schemas validate values *before* they reach the table or the API |
| **Sizes** | compact / default / large |
| **Server mode** | debounced callbacks instead of local state |
| **i18n** | locale-aware labels, placeholders, date formatting |

The published page does **not** document AND/OR logic, condition grouping, or a keyboard
model. Our own experience spec §8.5 *does* specify a condition builder with a full
operator set — so on that point the spec is more demanding than the reference, and reui
should not be treated as the ceiling.

---

## What we already have

| module | LOC | what it is |
|---|---|---|
| `filter-bar.tsx` | 379 | `FilterBar` + `Search` / `Select` / `DateRange` / `Actions` / `Chips` |
| `filter-chip.tsx` | 432 | `FilterChip`, `FilterChipSet`, `FilterChipMenu` (built today) |
| `data-table-faceted-filter.tsx` | 159 | multi-select with counts, coupled to a TanStack column |
| `data-table-date-filter.tsx` | 113 | date range, coupled to a column |
| `data-grid-filter-fns.ts` | 40 | the matching logic |

Registered filter functions: `includesString`, `inNumberRange`, `inDateRange`, `equals`,
`weakEquals`, `arrIncludes`, `arrHas`, `dateRange`.

### Coverage against reui's six types

| type | UI | matching fn | verdict |
|---|---|---|---|
| Text search | `FilterBarSearch`, toolbar `searchKey` | `includesString` | ✅ **twice** |
| Single select | `FilterBarSelect` | `equals` | ✅ |
| Multi-select | `DataTableFacetedFilter`, `FilterChipMenu` | `arrHas` | ✅ **twice** |
| Date range | `FilterBarDateRange`, `DataTableDateFilter` | `dateRange` | ✅ **twice** |
| Number range | `FilterNumberRange` | `inNumberRange` ✅ | ✅ **2026-09-25** |
| Boolean | `FilterBoolean` (tri-state) | `equals` ✅ | ✅ **2026-09-25** |

So: **two real gaps, and three capabilities implemented twice.**

---

## The actual problem: two filter systems, no shared definition

`FilterBar` and `DataGridToolbar` are separate filter UIs with separate consumers:

```
FilterBar          -> DashboardDemo, design-system demos, registry/categories
DataGridToolbar    -> every DataTable / DataGrid (facetedFilters, dateFilters, searchKey)
```

They do not share a field definition, a value shape, a chip renderer or a clear-all. A
product using both — a page-level filter bar above a grid with its own column filters —
has two places to define "Region", two ways to clear it, and no way to serialise either.

That is the cost reui's field schema avoids, and it is the reason its filters can be
URL-serialised at all: **one definition, many renderers.**

---

## Gaps, ranked by what they cost

### P0 — the unifying schema

Without it everything below is built twice.

```ts
type FilterField<TValue = unknown> =
  | { id: string; label: string; type: 'text' }
  | { id: string; label: string; type: 'select';   options: FilterOption[] }
  | { id: string; label: string; type: 'multi';    options: FilterOption[] }
  | { id: string; label: string; type: 'dateRange'; presets?: DateRangePreset[] }
  | { id: string; label: string; type: 'numberRange'; min?: number; max?: number; format?: 'currency' | 'percent' }
  | { id: string; label: string; type: 'boolean';  trueLabel?: string; falseLabel?: string };

type FilterValue = { fieldId: string; operator?: FilterOperator; value: unknown };
```

One definition drives: the control, the applied chip's label, the TanStack `filterFn`,
the URL parameter, and the server query. Each of those is currently derived
independently.

### P1 — the two missing controls

- **Number range.** `inNumberRange` is registered and unusable — there is no UI. For a
  book of business this is the most-wanted filter after status: *premium > $500k*,
  *TIV between X and Y*.
- **Boolean.** Trivial, but currently every product invents a two-option select.

### P1 — URL persistence (§24)

Already recorded as missing in the data-table audit. It is only cheap **after** the
schema exists, because serialisation needs one canonical value shape. Deep-linking a
filtered view is what makes a filter shareable in a support conversation.

### P2 — the advanced condition builder (§8.5)

Our spec asks for `WHERE … AND …` with fifteen operators. reui does not document this, so
there is no reference to copy — it would be built against our spec. It is also the piece
most likely to be over-built: a condition builder nobody uses is worse than none.
**Defer until a product asks.**

### Not recommended

- **Zod validation.** reui validates filter values with Zod. This repo has no Zod
  dependency, and filter values come from our own controls rather than free text — the
  validation surface is narrow. Adding a schema library for it fails §53.1 ("inspect the
  existing system before adding dependencies").
- **A third filter component.** See above.

---

## UX findings worth carrying regardless

1. **Applied filters need a scope sentence, not just chips.** The same lesson as
   select-all: "Filtering by Region: EMEA" tells you *what*, but a count — "48 of 1,284
   policies" — tells you whether the filter did anything. `FilterBarChips` shows chips
   with no count.
2. **Clear-all must be distinguishable from clear-one.** Both exist in `FilterBarChips`;
   only the per-chip remove is named for its filter (fixed today).
3. **An empty result from filters is not an empty dataset.** Already handled — the grid
   distinguishes them — but a page-level `FilterBar` sitting above a non-grid surface has
   no equivalent.
4. **Number and date filters must state their unit.** "Premium > 500" is ambiguous;
   "Premium > $500,000" is not. This is where `meta.type` from the alignment work pays
   off a second time — the column already declares it is currency.

---

## Recommended sequence

| | work | why |
|---|---|---|
| ~~**1**~~ | ~~`FilterField` schema + `resolveFilterFn(field)`~~ **done 2026-09-25** | everything else doubles without it |
| ~~**2**~~ | ~~Number range + boolean controls~~ **done 2026-09-25** — `FilterNumberRange`, `FilterBoolean` | the only genuinely missing types |
| ~~**3**~~ | ~~Point `DataGridToolbar` at the schema~~ **done 2026-09-25** — `fields` prop + `DataTable`'s `filterFields`; `facetedFilters`/`dateFilters` deprecated. **`FilterBar` still to do.** | removes the duplicate definitions rather than adding a third |
| **4** | URL serialisation (§24) | cheap once the value shape is canonical |
| **5** | Applied-filter summary with a result count | small, and the most visible to a user |
| **6** | *(deferred)* condition builder §8.5 | build when a product needs it |

Steps 1–2 are the ones that pay for themselves immediately. Step 3 is the one that
prevents a third filter system existing in six months.
