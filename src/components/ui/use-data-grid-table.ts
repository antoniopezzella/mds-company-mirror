"use client"

import * as React from 'react';
import {
  useTable,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnVisibilityState,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';

import { dataGridFeatures, type DataGridColumnDef, type DataGridTableInstance } from './data-grid-features';

/**
 * Builds a table instance with this system's defaults.
 *
 * Why this is a hook rather than DataTable's private setup
 * --------------------------------------------------------
 * `DataTable` and `DataGrid` are the same component with two API shapes, but
 * the split was not symmetrical: DataTable held ~166 lines of instance setup
 * that a DataGrid consumer had to reproduce by hand. Choosing composition
 * therefore cost you the state wiring — a bad trade to impose, and the reason
 * every hand-rolled DataGrid drifts from the preset in some small way.
 *
 * Everything here is behaviour the grid needs to be correct, not
 * convenience:
 *
 * - **Filter-fn resolution.** Faceted filters set an ARRAY and date filters a
 *   `{from,to}`; the default string matcher matches neither, so those columns
 *   silently filter to nothing unless they are given the right `filterFn`.
 * - **Column pinning as real state.** This was once a derived `useMemo`
 *   passed as controlled state with no setter, so `column.pin()` could never
 *   apply. Invisible while `pinFirstColumn` was the only way to pin; broken
 *   the moment the column menu offered "Pin to end".
 * - **`getRowCanExpand`.** Defaults to "row has subRows", so a detail panel
 *   on flat data is unreachable — the toggle never renders.
 * - **`enableCellRangeSelection` following `enableCellSelection`.** Two flags
 *   for one user-facing capability is how half of it ends up off.
 *
 * Extracted verbatim from `data-table.tsx`. Its suite asserts the contracts
 * this has to keep honouring and must pass unmodified — if those tests need
 * editing, the extraction changed behaviour and is wrong.
 */
export interface UseDataGridTableOptions<TData extends RowData, TValue = unknown> {
  columns: DataGridColumnDef<TData, TValue>[];
  data: TData[];
  /** Column ids whose filter value is an array of selected values. */
  facetedColumnIds?: string[];
  /** Column ids whose filter value is a `{from,to}` date range. */
  dateColumnIds?: string[];
  /** Pins the leading column to the start. The initial layout, not a lock. */
  pinFirstColumn?: boolean;
  pageSize?: number;
  /**
   * The sort the table opens with — `Table`'s `defaultSortColumn` /
   * `defaultSortDirection`, which had no grid equivalent.
   *
   * Initial, not controlled: the user's first click on a header replaces it.
   */
  initialSorting?: SortingState;
  enableRowSelection?: boolean;
  enableColumnResizing?: boolean;
  enableColumnPinning?: boolean;
  enableRowPinning?: boolean;
  enableCellSelection?: boolean;
  /** Server owns pagination; `pageCount` then drives the footer. */
  manualPagination?: boolean;
  pageCount?: number;
  /** Matches TanStack's signature, which passes the row index as well. */
  getSubRows?: (row: TData, index: number) => TData[] | undefined;
  /** Whether a given row can expand. Required for a detail panel on flat data. */
  canExpandRow?: (row: TData) => boolean;
  /** Present when the grid renders detail panels, so every row can expand. */
  hasDetailPanel?: boolean;
}

export function useDataGridTable<TData extends RowData, TValue = unknown>({
  columns,
  data,
  facetedColumnIds,
  dateColumnIds,
  pinFirstColumn = true,
  pageSize = 10,
  initialSorting,
  enableRowSelection = false,
  enableColumnResizing = false,
  enableColumnPinning = false,
  enableRowPinning = false,
  enableCellSelection = false,
  manualPagination = false,
  pageCount,
  getSubRows,
  canExpandRow,
  hasDetailPanel = false,
}: UseDataGridTableOptions<TData, TValue>): DataGridTableInstance<TData> {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting ?? []);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // Faceted filters set an array of selected values and date filters set a
  // {from,to} object; the default string matcher would match nothing for
  // either, so those columns get the right filterFn unless the consumer
  // already chose one. Both names are registered on the feature set (see
  // data-grid-features.ts) — in v9 an unregistered name is a type error
  // rather than a filter that silently matches nothing.
  const facetKey = facetedColumnIds?.join(',');
  const dateKey = dateColumnIds?.join(',');
  const resolvedColumns = React.useMemo(() => {
    if (!facetedColumnIds?.length && !dateColumnIds?.length) return columns;
    const facetIds = new Set(facetedColumnIds ?? []);
    const dateIds = new Set(dateColumnIds ?? []);
    return columns.map((c): DataGridColumnDef<TData, TValue> => {
      const id = c.id ?? (c as { accessorKey?: string }).accessorKey;
      if (!id || c.filterFn) return c;
      if (facetIds.has(id)) return { ...c, filterFn: 'arrHas' as const };
      if (dateIds.has(id)) return { ...c, filterFn: 'dateRange' as const };
      return c;
    });
    // The id lists are collapsed to strings so a caller passing a fresh array
    // literal each render does not rebuild every column definition.
  }, [columns, facetKey, dateKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const firstColumnId = columns[0]?.id ?? (columns[0] as { accessorKey?: string })?.accessorKey;

  // Real state, not a derived memo.
  //
  // This was `useMemo(() => ({ start: [firstColumnId], end: [] }))` — passed
  // as controlled `state.columnPinning` with no setter, so TanStack could
  // never change it. That was invisible while `pinFirstColumn` was the only
  // way to pin anything; the moment the column menu offers "Pin to end", the
  // control silently does nothing. Same for column order, which was not in
  // state at all.
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(() => ({
    start: pinFirstColumn && firstColumnId ? [firstColumnId] : [],
    end: [],
  }));
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);

  // `pinFirstColumn` is the initial layout, so a change to it re-seeds — but
  // only that leading pin, leaving anything the user pinned themselves alone.
  React.useEffect(() => {
    setColumnPinning((prev) => ({
      ...prev,
      start: pinFirstColumn && firstColumnId ? [firstColumnId] : prev.start.filter((id) => id !== firstColumnId),
    }));
  }, [pinFirstColumn, firstColumnId]);

  return useTable({
    features: dataGridFeatures,
    data,
    // TanStack types a table's `columns` as `ColumnDef<F, TData, unknown>[]`
    // because one array holds columns of differing value types. `TValue` here
    // is the per-column parameter, so the two are the same shape with a
    // different generic position — v8 erased the difference, v9 does not.
    columns: resolvedColumns as DataGridColumnDef<TData>[],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    onColumnPinningChange: setColumnPinning,
    onColumnOrderChange: setColumnOrder,
    manualPagination,
    pageCount: manualPagination ? pageCount : undefined,
    enableRowSelection,
    enableMultiSort: true,
    enableColumnResizing,
    enableColumnPinning,
    enableRowPinning,
    enableCellSelection,
    enableCellRangeSelection: enableCellSelection,
    getSubRows,
    // Without this, a detail panel is unreachable: `getCanExpand()` is
    // "row has subRows" by default, so the toggle never renders for flat data.
    getRowCanExpand: canExpandRow
      ? (row: Row<typeof dataGridFeatures, TData>) => canExpandRow(row.original)
      : hasDetailPanel
        ? () => true
        : undefined,
    columnResizeMode: 'onChange',
    state: { sorting, columnFilters, columnVisibility, rowSelection, columnPinning, columnOrder },
    // v9's PaginationState is required whole; v8 accepted a partial.
    initialState: { pagination: { pageIndex: 0, pageSize } },
  }) as DataGridTableInstance<TData>;
}
