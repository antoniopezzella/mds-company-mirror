import {
  tableFeatures,
  cellSelectionFeature,
  columnFacetingFeature,
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowPinningFeature,
  rowSelectionFeature,
  rowSortingFeature,
  createExpandedRowModel,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
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
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowPinningFeature,
  rowSelectionFeature,
  rowSortingFeature,

  expandedRowModel: createExpandedRowModel(),
  filteredRowModel: createFilteredRowModel(),
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
  columnMeta: {} as {
    /** Opts a column into inline editing. Requires `onCellEdit` on the table. */
    editable?: boolean;
    /**
     * Cell and header alignment. Numeric columns read far better right-aligned
     * — this is `table.tsx`'s `align`, which the grid had no equivalent for.
     */
    align?: 'left' | 'center' | 'right';
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
      /** Editor control. `textarea` for multi-line values. */
      control?: 'text' | 'textarea';
    };
  },
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
