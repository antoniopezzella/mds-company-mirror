import {
  tableFeatures,
  cellSelectionFeature,
  columnFacetingFeature,
  columnFilteringFeature,
  columnGroupingFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  rowAggregationFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowPinningFeature,
  rowSelectionFeature,
  rowSortingFeature,
  aggregationFn_count,
  aggregationFn_extent,
  aggregationFn_max,
  aggregationFn_mean,
  aggregationFn_median,
  aggregationFn_min,
  aggregationFn_sum,
  aggregationFn_uniqueCount,
  createExpandedRowModel,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createGroupedRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_arrHas,
  filterFn_arrIncludes,
  filterFn_arrIncludesSome,
  filterFn_equals,
  filterFn_inDateRange,
  filterFn_inNumberRange,
  filterFn_includesString,
  filterFn_weakEquals,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  type Column,
  type ColumnDef,
  type RowData,
  type ReactTable,
} from '@tanstack/react-table';

import { dateRangeFilterFn } from './data-grid-filter-fns';

/**
 * Per-column metadata for tables built on {@link dataGridFeatures}.
 *
 * Extracted from the inline `columnMeta` slot below so consumers (and the grid
 * itself) can name the shape — the formatter wiring in data-grid-table.tsx
 * reads `meta.type` through this type rather than re-declaring it.
 */
export interface DataGridColumnMeta {
  /** Opts a column into inline editing. Requires `onCellEdit` on the table. */
  editable?: boolean;
  /**
   * Cell and header alignment. Numeric columns read far better right-aligned
   * — this is `table.tsx`'s `align`, which the grid had no equivalent for.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * A narrow control column — row checkbox, expand toggle — that belongs to
   * the cell after it. Figma draws these controls INSIDE the first cell, 8px
   * before its content; so this column drops its trailing inset and the next
   * column's leading inset becomes the 8px gap. `createSelectColumn` sets it.
   */
  leading?: boolean;
  /**
   * With `leading`: the column has no header of its own — the next column's
   * header spans it, so "Request" starts at the cell inset as in Figma, where
   * the expand toggle lives inside the first BODY cell only.
   * `createExpandColumn` sets it; the select column does not (its header
   * holds the select-all checkbox).
   */
  mergeHeader?: boolean;
  /**
   * What the column holds. Drives alignment AND cell formatting: a column
   * declaring `currency`/`number`/`percent`/`date` and using no custom `cell`
   * renders its value through `formatValue` (see data-grid-table.tsx), so a
   * currency column shows "$1,234.50" rather than "1234.5".
   *
   * Numeric types align RIGHT automatically — digits only line up for
   * comparison when their last significant figure does, which is the whole
   * reason a table exists. Setting `align` explicitly still wins.
   */
  type?: 'text' | 'number' | 'currency' | 'percent' | 'date' | 'status' | 'boolean';
  /**
   * Figma `Header cell` / `Cell` *Column divider*: a 1px `border/subtle` rule
   * inside the right edge of this column's header, body and footer cells.
   * Off by default; hand-off §4.10 D turns it on for resizable tables and for
   * the label column of Grouped summary. A pinned column's `border/default`
   * edge takes its place.
   */
  columnDivider?: boolean;
  /**
   * Spreadsheet-mode editing for this column.
   *
   * Richer than `editable`, which is text-only and hands the consumer a
   * `string` to cast. `parse` turns pasted/typed text into the column's own
   * type and may reject it; `format` is the inverse for copy.
   */
  cellEdit?: {
    /** Editable at all. A function narrows it per row. */
    editable?: boolean | ((row: unknown) => boolean);
    /**
     * Text -> value. Return `undefined` to REJECT the input: a paste of
     * "abc" into a number column should be reported, not silently written
     * or silently dropped.
     */
    parse?: (raw: string, row: unknown) => unknown;
    /** Value -> text, for copy and for seeding the editor. */
    format?: (value: unknown, row: unknown) => string;
    /** What Delete writes. Defaults to an empty string. */
    clearValue?: unknown;
    /**
     * Editor control. `textarea` for multi-line values; `select` for Figma
     * `Content/Editable` *Dropdown* — the value plus a 16px
     * `keyboard_arrow_down`, and a listbox of `options` under the cell while
     * editing. Typing filters the list; text that matches no option is
     * rejected ("Choose a value from the list.") unless the column brings its
     * own `parse`.
     */
    control?: 'text' | 'textarea' | 'select';
    /** The choices for `control: 'select'`. A string is both value and label. */
    options?: ReadonlyArray<DataGridCellEditOption>;
    /**
     * The Error tooltip's text when `parse` rejects the input — say what is
     * accepted ("Enter a whole number"). Default "Enter a valid value" (Figma);
     * "Choose a value from the list." for a `select`.
     */
    invalidMessage?: string | ((raw: string) => string);
  };
}

/** One choice of a `cellEdit.control: 'select'` column. */
export type DataGridCellEditOption = string | { value: unknown; label: string };

/**
 * A cell whose last typed or pasted text was rejected by the column's
 * `parse` (hand-off §5c). The grid keeps it red, showing `raw`, with `message`
 * in its Error tooltip, until a valid value replaces it.
 */
export interface DataGridCellError {
  rowId: string;
  columnId: string;
  /** The rejected text, shown in the cell so the user can fix it. */
  raw: string;
  /** The Error tooltip's text. */
  message: string;
}

/**
 * Figma `Data table/Row` State, for the two states the DATA decides
 * (hover, selected and banded are the table's own):
 * - `error` — row-level validation failed: `background/critical/subtle` fill;
 * - `disabled` — text in `foreground/disabled`, its controls disabled, and the
 *   row cannot be selected (select-all skips it). Hand-off §4.5.
 */
export type DataGridRowState = 'error' | 'disabled';

/** Table-level metadata, read by the grid from `table.options.meta`. */
export interface DataGridTableMeta {
  /**
   * Row state from the record. Set it through `useDataGridTable({ getRowState })`
   * (or DataTable's prop), which also makes `disabled` rows unselectable —
   * one function, so the paint and the selection rule cannot disagree.
   */
  getRowState?: (row: unknown) => DataGridRowState | undefined;
  /**
   * The row's human name, for labels that must say WHICH row ("Edit Premium,
   * Harbor Logistics"). Without it the grid uses the first text column.
   */
  getRowLabel?: (row: unknown) => string;
}

/**
 * The single place this repo registers TanStack Table features.
 *
 * v9 replaced v8's "pass a row model per option" style with one explicit
 * registration object. Deliberately NOT `stockFeatures`: that pulls in every
 * feature (grouping, cell selection, cell spanning, row pinning, expansion,
 * global filtering, worker row models) whether or not a table uses them, which
 * defeats v9's tree-shaking — and bundle size is something this package is
 * measured on. What is listed below is exactly what `DataTable` uses today,
 * nothing more.
 *
 * Adding a capability means adding its feature *and* its row model here, in
 * one place, rather than threading options through a component.
 */
export const dataGridFeatures = tableFeatures({
  cellSelectionFeature,
  columnFacetingFeature,
  columnFilteringFeature,
  /**
   * Grouping + aggregation (hand-off §5b#21, task T8): `grouping` state turns
   * leaf rows into group rows whose numeric cells aggregate their leaves.
   * Grouping runs AFTER filtering (`getPreGroupedRowModel` is the filtered
   * model), so a subtotal is always the sum of the rows the user can see —
   * a search narrows the subtotals with it.
   *
   * ~~Resolved 2026-10-30: consumer sub-rows instead of a grouping engine~~ —
   * reversed 2026-10-31: the hand-off asks for the engine, and hand-authored
   * group totals cannot follow a filter.
   */
  columnGroupingFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  rowAggregationFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowPinningFeature,
  rowSelectionFeature,
  rowSortingFeature,

  expandedRowModel: createExpandedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  groupedRowModel: createGroupedRowModel(),
  sortedRowModel: createSortedRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  paginatedRowModel: createPaginatedRowModel(),

  /**
   * The keys here are the valid string values for a column's `filterFn`.
   *
   * In v8 `filterFn: 'arrIncludesSome'` indexed a *global* built-in registry.
   * In v9 the registry is this object — which makes an unregistered explicit
   * name a type error, but also means **`filterFn: 'auto'` silently stops
   * filtering** if the name it resolves to is missing.
   *
   * `column_getAutoFilterFn` picks a name from the first non-null cell value's
   * type — string -> `includesString`, number -> `inNumberRange`, boolean ->
   * `equals`, array -> `arrIncludes`, Date -> `inDateRange`, object ->
   * `equals`, else `weakEquals` — then looks it up here. A miss logs a dev
   * console warning and returns undefined, so the column just stops filtering.
   *
   * That is not hypothetical: registering only `arrIncludesSome` broke the
   * toolbar search (a string column, so `includesString`) while the faceted
   * filters kept working, because those name their filterFn explicitly. All
   * seven auto-reachable names are registered below for that reason.
   */
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
    inDateRange: filterFn_inDateRange,
    equals: filterFn_equals,
    weakEquals: filterFn_weakEquals,
    arrIncludes: filterFn_arrIncludes,
    /**
     * What a faceted multi-select over a SCALAR column needs: keep the row if
     * its value equals any selected value.
     *
     * Not `arrIncludesSome`, which v9 narrowed to array-valued columns only —
     * it now early-returns false unless `Array.isArray(dataValue)`. v8's
     * version called `dataValue.includes(...)`, which happened to work on
     * strings, so every faceted filter in this repo was relying on that
     * accident. Under v9 they silently matched nothing.
     */
    arrHas: filterFn_arrHas,
    /** Still registered: correct for genuinely array-valued columns. */
    arrIncludesSome: filterFn_arrIncludesSome,
    dateRange: dateRangeFilterFn,
  },

  /**
   * Valid string values for a column's `aggregationFn`. Same trap as
   * `filterFns`: the default `aggregationFn: 'auto'` resolves to `sum`
   * (numbers) or `extent` (dates) by name, so both MUST be registered or a
   * grouped numeric column silently aggregates to nothing.
   */
  aggregationFns: {
    sum: aggregationFn_sum,
    extent: aggregationFn_extent,
    min: aggregationFn_min,
    max: aggregationFn_max,
    mean: aggregationFn_mean,
    median: aggregationFn_median,
    count: aggregationFn_count,
    uniqueCount: aggregationFn_uniqueCount,
  },

  /** Same idea for `sortFn`. v8's `sortingFn` is `sortFn` in v9. */
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },

  /**
   * Per-column metadata, declared as a type-only slot.
   *
   * This replaces the `declare module '@tanstack/react-table'` augmentation
   * that used to live in data-table.tsx. Global declaration merging leaked
   * `editable` onto every table in every consuming app and broke outright in
   * v9, whose `ColumnMeta` takes `TFeatures` as its first parameter. A slot is
   * scoped to this feature set and needs no module augmentation at all.
   */
  columnMeta: {} as DataGridColumnMeta,
  /** Table-level metadata — see {@link DataGridTableMeta}. */
  tableMeta: {} as DataGridTableMeta,
});

/**
 * Column definition for tables built on {@link dataGridFeatures}.
 *
 * **Use this, not TanStack's `ColumnDef`, in consuming code.** v9 made
 * `ColumnDef` a three-parameter generic (`<TFeatures, TData, TValue>`); this
 * alias pins the first, so call sites keep writing the two they always wrote.
 * Without it, the v9 upgrade would be a breaking type change for every column
 * array in every consuming app, for no benefit to them.
 */
export type DataGridColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  typeof dataGridFeatures,
  TData,
  TValue
>;

/** The feature-set type, for anything that needs to name it explicitly. */
export type DataGridFeatures = typeof dataGridFeatures;

/**
 * `Column` and `Table` for this feature set. Same reasoning as
 * {@link DataGridColumnDef}: v9 added `TFeatures` as the first generic
 * parameter to both, so every sub-component that takes a column or a table
 * would otherwise have to name the feature set itself.
 */
export type DataGridColumn<TData extends RowData, TValue = unknown> = Column<
  DataGridFeatures,
  TData,
  TValue
>;

/**
 * The table instance as `useTable` returns it — `ReactTable`, not core
 * `Table`. Only the React type carries `state` (the render-safe snapshot) and
 * `Subscribe`; core `Table` exposes `store` instead.
 *
 * Named `...Instance` because `DataGridTable` is the component that renders
 * the `<table>`. One name for two different things is the kind of collision
 * that only shows up at the barrel export, by which point it is in the
 * published API.
 */
export type DataGridTableInstance<TData extends RowData> = ReactTable<DataGridFeatures, TData>;
