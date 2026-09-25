"use client"

import * as React from 'react';
import {
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnVisibilityState,
  type RowData,
  type RowSelectionState,
  type SortingState,
  useTable,
} from '@tanstack/react-table';

import { Checkbox } from './checkbox';
import type { FacetOption } from './data-table-faceted-filter';
import { dataGridFeatures, type DataGridColumnDef } from './data-grid-features';
import { DataGrid, DataGridContainer, DataGridScrollArea } from './data-grid';
import { DataGridTable, type CellEditParams, type DataGridTableProps } from './data-grid-table';
import { DataGridToolbar } from './data-grid-toolbar';
import { DataGridPagination } from './data-grid-pagination';

// Re-exported so the preset stays a single import site for its own payload
// type, even though the editor now lives in data-grid-table.tsx.
export type { CellEditParams };

/**
 * DataTable — no MDS/Figma spec exists for this yet; built matching real
 * shadcn/ui's TanStack-Table-based recipe, reusing this repo's own atoms
 * (`Checkbox`, `Pagination`, `Input`, `DropdownMenu`, `Skeleton`) rather
 * than duplicating them. This is a separate, more powerful sibling to
 * `table.tsx`'s hand-rolled `Table` — reach for `Table` for the common
 * case, `DataTable` when you need column filtering/visibility toggling on
 * top of sorting/selection/pagination.
 *
 * Responsive strategy (deliberate choice, not MUI DataGrid's default):
 * horizontal scroll with the leading column(s) pinned via TanStack Table's
 * native column-pinning API, not a hardcoded "position: sticky on column
 * index 0" hack — that would break the moment row-selection adds its own
 * checkbox column in front. `pinFirstColumn` (on by default) pins the
 * select column when present, otherwise the first real data column.
 *
 * Row virtualization is deliberately NOT included here — react-virtual's
 * absolute-positioned rows don't compose cleanly with a semantic <table>;
 * doing it properly means moving to a div/grid layout, which is a bigger,
 * separate change. Current real usage (client-paginated, 10-100 rows/page)
 * doesn't need it yet; scope it as its own pass if/when a consumer
 * genuinely needs thousands of unpaginated rows.
 *
 * Feature parity pass vs. MUI X DataGrid (Community edition — Pro/Premium
 * features like row grouping aren't a fair comparison target): column
 * resizing, multi-column sort (shift-click, same as MUI), sticky header,
 * CSV export, and a density toggle are all opt-in props below, defaulting
 * to off so the one real consumer (DashboardDemo.tsx) is unaffected.
 * Manual/server-side pagination is a genuine new capability, not just a
 * story — previously DataTable could only ever slice `data` client-side.
 */

/** Ready-made row-selection column — drop into a `columns` array. */
export interface SelectColumnOptions<TData> {
  /**
   * Builds each checkbox's accessible name from the record — "Select Asset
   * 10428", not "Select row 3".
   *
   * Strongly recommended. The default is positional, and position is the
   * wrong identity for a row: it changes under sorting, filtering and
   * pagination, so a screen-reader user gets a name that means something
   * different every time the table reorders, and nothing that identifies the
   * record they are about to act on.
   */
  getRowLabel?: (row: TData) => string;
}

export function createSelectColumn<TData extends RowData>(
  { getRowLabel }: SelectColumnOptions<TData> = {}
): DataGridColumnDef<TData> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        // "on this page", not "all rows". This control calls
        // toggleAllPageRowsSelected — it selects the PAGE — and announcing it
        // as "all" is precisely the ambiguity that makes a subsequent bulk
        // delete dangerous. Escalating to every filtered record is a separate,
        // explicit action: see data-grid-selection.tsx.
        aria-label="Select all rows on this page"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={
          getRowLabel
            ? `Select ${getRowLabel(row.original as TData)}`
            : `Select row ${row.index + 1}`
        }
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

/**
 * Opting a column into inline editing is `meta: { editable: true }` on its
 * column def. That used to be a `declare module` augmentation of TanStack's
 * `ColumnMeta`, which leaked onto every table in every consuming app; it is
 * now a scoped `columnMeta` slot on the feature set — see data-grid-features.ts.
 */

export interface DataTableProps<TData extends RowData, TValue> {
  columns: DataGridColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  pageSize?: number;
  className?: string;
  /** Data hasn't arrived yet — renders skeleton rows matching the column count instead of `data`. */
  loading?: boolean;
  /** How many skeleton rows to show while `loading`. Defaults to `pageSize`. */
  loadingRowCount?: number;
  /**
   * Pins the leading column (the select checkbox column when
   * `enableRowSelection` is on, otherwise the first entry in `columns`) so
   * it stays visible while the rest of the table scrolls horizontally on
   * narrow viewports. On by default — pass `false` to opt out for tables
   * where a pinned leading column doesn't make sense.
   */
  pinFirstColumn?: boolean;
  /** Lets users drag column borders to resize (TanStack's native column-sizing API). Off by default. */
  enableColumnResizing?: boolean;
  /**
   * Bounds the table's scroll container to this height and makes the
   * header sticky within it. Without a bounded height, `position: sticky`
   * on the header has nothing to stick within — the whole page scrolls
   * instead of just the table body.
   */
  maxHeight?: string | number;
  /** Adds an "Export CSV" button to the toolbar row, exporting every filtered row's raw values (not rendered JSX). Off by default. */
  enableExport?: boolean;
  /** Filename for the CSV export (without extension). */
  exportFilename?: string;
  /** Adds a Density control (compact/standard/comfortable row height) to the toolbar row. Off by default. */
  enableDensityToggle?: boolean;
  /**
   * Server-side pagination: `data` is assumed to already be just the
   * current page's rows, and `pageCount` (from the server) drives page
   * navigation instead of TanStack slicing `data` itself. Pass
   * `onPaginationChange` to fetch the next page; pass `rowCount` (the
   * server's total row count) so the footer's "X–Y of Z" text is correct
   * — `data.length` alone only describes the current page.
   */
  manualPagination?: boolean;
  pageCount?: number;
  rowCount?: number;
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
  /**
   * Replaces the built-in empty state entirely. Leave unset to get the
   * default `Empty` block, which already distinguishes "no data at all"
   * from "the current search matched nothing" and offers to clear the
   * search in the latter case.
   */
  emptyState?: React.ReactNode;
  /**
   * Enables inline editing for columns marked `meta: { editable: true }`.
   * Called on commit (Enter or blur), never on cancel (Escape). DataTable
   * holds no copy of the data, so the handler owns persisting the change.
   */
  onCellEdit?: (params: CellEditParams<TData>) => void;
  /**
   * Multi-select filter controls in the toolbar, one per entry. Omit
   * `options` to derive them (with counts) from the column's own values.
   * DataTable injects an `arrIncludesSome` filterFn for these columns, since
   * the default string matcher can't handle an array of selected values.
   */
  facetedFilters?: { columnId: string; title: string; options?: FacetOption[] }[];
  /**
   * Date-range filter controls in the toolbar, one per entry — the same dashed
   * trigger shape as `facetedFilters`, for columns a multi-select cannot serve.
   *
   * A date column's unique values are every distinct date in the data, so a
   * faceted list of them is useless the moment there is more than a handful.
   * DataTable injects a range `filterFn` for these columns.
   */
  dateFilters?: { columnId: string; title: string }[];
  /**
   * Page-level actions for the right of the toolbar — Refresh, New, and the
   * like. They sit with Sort/Density/Export/Columns rather than in a separate
   * row above the table, which is the shape this repo kept hand-rolling: four
   * different pages each grew their own filter strip that shared nothing with
   * the table it controlled, and could drift out of sync with it.
   */
  toolbarActions?: React.ReactNode;
  /** Adds a Sort control listing active sorts, with add/remove/direction. */
  enableSortList?: boolean;
  /**
   * Lets the user pin any column to the start or end from its column menu.
   *
   * Separate from `pinFirstColumn`, which is the layout default (keep the
   * identity column visible while the rest scrolls). This is the user's
   * control over it.
   */
  enableColumnPinning?: boolean;
  /** Adds "Move left" / "Move right" to each column menu. Keyboard-operable. */
  enableColumnReorder?: boolean;
  /**
   * Renders a master-detail panel under an expanded row. Pair with
   * `createExpandColumn()` in `columns`.
   *
   * Supplying this also makes every row expandable: TanStack's default is
   * "expandable if it has subRows", which is wrong for master-detail — the
   * toggle would never render and the panel would be unreachable. Pass
   * `canExpandRow` to narrow it.
   */
  renderDetail?: DataGridTableProps<TData>['renderDetail'];
  /**
   * Which rows can expand. Defaults to "has sub-rows, or `renderDetail` is
   * set". Use it when only some rows have detail to show.
   */
  canExpandRow?: (row: TData) => boolean;
  /** Nested rows. Returning undefined for a row makes it a leaf. */
  getSubRows?: (row: TData, index: number) => TData[] | undefined;
  /** Lets rows be pinned to the top. Pair with `createRowPinColumn()`. */
  enableRowPinning?: boolean;
  /**
   * Renders only the rows in view. Requires `maxHeight`.
   *
   * Use it past roughly a thousand unpaginated rows; below that the DOM is
   * not the bottleneck and pagination is the more accessible answer (infinite
   * lists strand keyboard users above an unreachable footer).
   */
  enableVirtualization?: boolean;
  /** Estimated row height for the virtualizer, in px. */
  estimateRowSize?: number;
  /** Renders a `<tfoot>` from each column's `footer`. */
  showFooter?: boolean;
  /** Sticks that footer to the bottom of the scroll area. Needs `maxHeight`. */
  stickyFooter?: boolean;
  /**
   * Spreadsheet mode: cell/range selection, keyboard grid navigation and
   * clipboard. Switches the table's ARIA from `table` to `grid`.
   */
  enableCellSelection?: boolean;
  /** Every batch of cell changes, including what could not be applied. */
  onCellsChange?: DataGridTableProps<TData>['onCellsChange'];
  /** Row activation — click, or Enter/Space. Ignored in cell-selection mode. */
  onRowClick?: DataGridTableProps<TData>['onRowClick'];
  /** Shows the draggable fill square. Ctrl/Cmd+D and +R already fill without it. */
  enableFillHandle?: boolean;
  /** Zebra striping on alternate rows. */
  striped?: boolean;
  /** A `<caption>` — the table's accessible name, and visible to everyone. */
  caption?: string;
  /**
   * The fetch failed. Renders the error branch instead of the rows.
   *
   * Named `loadError`, not `error`, to keep it clearly separate from form
   * validation's `error`/`invalid` — see data-state.tsx. Before this prop
   * existed a failed request rendered as "No data yet", which looks like an
   * answer rather than a failure.
   */
  loadError?: React.ReactNode | Error | boolean | null;
  /** Re-runs the failed load. Renders "Try again"; omitted when absent. */
  onRetry?: () => void;
}

export function DataTable<TData extends RowData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search...',
  enableRowSelection = false,
  enableColumnVisibility = false,
  pageSize = 10,
  className,
  loading = false,
  loadingRowCount,
  pinFirstColumn = true,
  enableColumnResizing = false,
  maxHeight,
  enableExport = false,
  exportFilename = 'export',
  enableDensityToggle = false,
  manualPagination = false,
  pageCount,
  rowCount,
  onPaginationChange,
  emptyState,
  onCellEdit,
  facetedFilters,
  dateFilters,
  toolbarActions,
  enableSortList = false,
  enableColumnPinning = false,
  enableColumnReorder = false,
  renderDetail,
  canExpandRow,
  getSubRows,
  enableRowPinning = false,
  enableVirtualization = false,
  estimateRowSize,
  showFooter = false,
  stickyFooter = false,
  enableCellSelection = false,
  enableFillHandle = false,
  striped = false,
  caption,
  onCellsChange,
  onRowClick,
  loadError,
  onRetry,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // Faceted filters set an array of selected values and date filters set a
  // {from,to} object; the default string matcher would match nothing for
  // either, so those columns get the right filterFn unless the consumer
  // already chose one. Both names are registered on the feature set (see
  // data-grid-features.ts) — in v9 an unregistered name is a type error
  // rather than a filter that silently matches nothing.
  const resolvedColumns = React.useMemo(() => {
    if (!facetedFilters?.length && !dateFilters?.length) return columns;
    const facetIds = new Set(facetedFilters?.map((f) => f.columnId) ?? []);
    const dateIds = new Set(dateFilters?.map((f) => f.columnId) ?? []);
    return columns.map((c): DataGridColumnDef<TData, TValue> => {
      const id = c.id ?? (c as { accessorKey?: string }).accessorKey;
      if (!id || c.filterFn) return c;
      if (facetIds.has(id)) return { ...c, filterFn: 'arrHas' as const };
      if (dateIds.has(id)) return { ...c, filterFn: 'dateRange' as const };
      return c;
    });
  }, [columns, facetedFilters, dateFilters]);

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

  const table = useTable({
    features: dataGridFeatures,
    data,
    // TanStack types a table's `columns` as `ColumnDef<F, TData, unknown>[]`
    // because one array holds columns of differing value types. `TValue` on
    // DataTableProps is the per-column parameter, so the two are the same
    // shape with a different generic position — v8 erased the difference,
    // v9 does not.
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
      ? (row) => canExpandRow(row.original)
      : renderDetail
        ? () => true
        : undefined,
    columnResizeMode: 'onChange',
    state: { sorting, columnFilters, columnVisibility, rowSelection, columnPinning, columnOrder },
    // v9's PaginationState is required whole; v8 accepted a partial.
    initialState: { pagination: { pageIndex: 0, pageSize } },
  });

  // The footer's total: the server's count in manual mode, where the local
  // row model only ever holds one page.
  const recordCount = manualPagination ? (rowCount ?? data.length) : data.length;

  return (
    <DataGrid
      table={table}
      recordCount={recordCount}
      loading={loading}
      loadError={loadError}
      onRetry={onRetry}
      emptyState={emptyState}
      maxHeight={maxHeight}
      searchKey={searchKey}
      className={className}
    >
      {(searchKey ||
        enableColumnVisibility ||
        enableExport ||
        enableDensityToggle ||
        facetedFilters?.length ||
        dateFilters?.length ||
        toolbarActions ||
        enableSortList) && (
        <DataGridToolbar
          facetedFilters={facetedFilters}
          dateFilters={dateFilters}
          searchPlaceholder={searchPlaceholder}
          enableSortList={enableSortList}
          enableDensityToggle={enableDensityToggle}
          enableColumnVisibility={enableColumnVisibility}
          enableExport={enableExport}
          exportFilename={exportFilename}
        >
          {toolbarActions}
        </DataGridToolbar>
      )}

      {/* Table and footer share one bordered, rounded shell so the footer
          reads as part of the grid (MUI DataGrid's treatment) rather than a
          detached row floating beneath it. */}
      <DataGridContainer>
        <DataGridScrollArea>
          <DataGridTable
            loadingRowCount={loadingRowCount}
            enableColumnReorder={enableColumnReorder}
            renderDetail={renderDetail}
            enableVirtualization={enableVirtualization}
            estimateRowSize={estimateRowSize}
            showFooter={showFooter}
            stickyFooter={stickyFooter}
            enableCellSelection={enableCellSelection}
            onCellsChange={onCellsChange}
            enableFillHandle={enableFillHandle}
            striped={striped}
            caption={caption}
            onRowClick={onRowClick}
            onCellEdit={onCellEdit}
          />
        </DataGridScrollArea>
        <DataGridPagination
          showSelectedCount={enableRowSelection}
          onPaginationChange={onPaginationChange}
        />
      </DataGridContainer>
    </DataGrid>
  );
}

export default DataTable;
