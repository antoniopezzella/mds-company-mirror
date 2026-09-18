import * as React from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp, Download, EyeOff, Inbox, SearchX, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { Pagination } from './pagination';
import { Skeleton } from './skeleton';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty';

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
 * to off so the one real consumer (ShadcnDashboard.tsx) is unaffected.
 * Manual/server-side pagination is a genuine new capability, not just a
 * story — previously DataTable could only ever slice `data` client-side.
 */

/** Ready-made row-selection column — drop into a `columns` array. */
export function createSelectColumn<TData>(): ColumnDef<TData, unknown> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select row ${row.index + 1}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

type Density = 'compact' | 'standard' | 'comfortable';

const DENSITY_PADDING: Record<Density, string> = {
  compact: 'py-1',
  standard: 'py-2.5',
  comfortable: 'py-4',
};

const DENSITY_LABEL: Record<Density, string> = {
  compact: 'Compact',
  standard: 'Standard',
  comfortable: 'Comfortable',
};

/**
 * Opts a column into inline editing: `meta: { editable: true }` on its
 * ColumnDef. Declared through TanStack's own ColumnMeta augmentation so it
 * type-checks at the call site rather than being a loose string prop.
 */
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- both params are required by the interface being augmented
  interface ColumnMeta<TData extends RowData, TValue> {
    editable?: boolean;
  }
}

export interface CellEditParams<TData> {
  rowId: string;
  rowIndex: number;
  columnId: string;
  /** The edited text. Cast/parse it in the handler — the input is always a string. */
  value: string;
  previousValue: unknown;
  row: TData;
}

/** Quotes a CSV field per RFC 4180 only when it actually needs it. */
function csvField(value: unknown): string {
  const s = value == null ? '' : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
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
}

export function DataTable<TData, TValue>({
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
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);
  const [density, setDensity] = React.useState<Density>('standard');
  const [editingCell, setEditingCell] = React.useState<{ rowId: string; columnId: string } | null>(null);
  const [draft, setDraft] = React.useState('');

  const firstColumnId = columns[0]?.id ?? (columns[0] as { accessorKey?: string })?.accessorKey;
  const columnPinning = React.useMemo<ColumnPinningState>(
    () => ({ left: pinFirstColumn && firstColumnId ? [firstColumnId] : [] }),
    [pinFirstColumn, firstColumnId]
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // Manual pagination: `data` is already just the current page, so
    // there's nothing for TanStack to slice — computing this model would
    // just re-paginate an already-single-page array.
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    manualPagination,
    pageCount: manualPagination ? pageCount : undefined,
    enableRowSelection,
    enableMultiSort: true,
    enableColumnResizing,
    columnResizeMode: 'onChange',
    state: { sorting, columnFilters, columnVisibility, rowSelection, columnPinning },
    initialState: { pagination: { pageSize } },
  });

  const borderColor = getRoleColor('border.default');
  // tablecn's header is the page surface with a rule under it, not a
  // filled band. Kept explicit rather than transparent because a sticky
  // header has to paint over the rows scrolling beneath it.
  const headerBg = getRoleColor('surface.default');
  const rowBg = getRoleColor('surface.default');
  // Hover is a neutral lift, selection is the brand tint — the usual split
  // (MUI DataGrid, shadcn) that keeps "passing over" visually distinct from
  // "chosen". Selected previously used surface.accent (#f7f8f8), which sat
  // 1.0018 from the hover color and so was effectively invisible.
  const hoverBg = getRoleColor('surface.subtle');
  const selectedBg = getRoleColor('surface.selected');
  const textColor = getRoleColor('text.primary');
  const mutedColor = getRoleColor('text.secondary');
  const activeColor = getRoleColor('interactive.primary');

  const rows = table.getRowModel().rows;
  const { pageIndex, pageSize: currentPageSize } = table.getState().pagination;
  const filteredCount = table.getFilteredRowModel().rows.length;
  // In manual mode the local row model only ever contains the current
  // page, so the footer needs the server's real total instead.
  const totalItemsForFooter = manualPagination ? rowCount ?? data.length : filteredCount;

  const handlePageChange = (page: number) => {
    table.setPageIndex(page - 1);
    if (manualPagination) onPaginationChange?.(page - 1, currentPageSize);
  };
  const handlePageSizeChange = (size: number) => {
    table.setPageSize(size);
    if (manualPagination) onPaginationChange?.(0, size);
  };

  // Empty because a filter excluded everything, vs. genuinely having no data.
  // Worth telling apart: the first is recoverable by the user, the second
  // isn't, and offering "clear search" when nothing was searched is noise.
  const isFilteredEmpty = columnFilters.some((f) => f.value !== '' && f.value != null) && data.length > 0;

  const exportableColumns = React.useMemo(() => table.getAllLeafColumns().filter((c) => c.getCanHide()), [table]);

  const handleExport = () => {
    const header = exportableColumns
      .map((c) => (typeof c.columnDef.header === 'string' ? c.columnDef.header : c.id))
      .map(csvField)
      .join(',');
    const body = table
      .getFilteredRowModel()
      .rows.map((row) => exportableColumns.map((c) => csvField(row.getValue(c.id))).join(','))
      .join('\n');
    const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exportFilename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Sticky cells detach from the row's own background during scroll, so a
  // pinned cell needs its background painted explicitly (it won't inherit
  // through from the <tr>) — `bg` is whatever that specific row/header
  // would otherwise have been. The right-edge shadow marks where the
  // pinned region ends and the scrolling content begins.
  const getPinnedCellStyle = (
    column: { getIsPinned: () => false | 'left' | 'right'; getStart: (side: 'left') => number },
    bg: string,
    extra?: React.CSSProperties
  ): React.CSSProperties =>
    column.getIsPinned() === 'left'
      ? { position: 'sticky', left: column.getStart('left'), zIndex: 1, backgroundColor: bg, boxShadow: `1px 0 0 0 ${borderColor}`, ...extra }
      : extra ?? {};

  const cellPadding = DENSITY_PADDING[density];
  // `minWidth: '100%'` matters when resizing is on: the columns' summed
  // width is often narrower than the container, and without this the table
  // stops short and leaves dead space (with the header band ending
  // mid-shell). The explicit width still wins once columns are resized
  // wider than the container, which is what keeps horizontal scrolling and
  // the pinned-column offsets working.
  const tableStyle: React.CSSProperties | undefined = enableColumnResizing
    ? { width: table.getTotalSize(), minWidth: '100%' }
    : undefined;

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {(searchKey || enableColumnVisibility || enableExport || enableDensityToggle) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {searchKey ? (
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
              onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
              className="max-w-sm"
            />
          ) : (
            <div />
          )}
          <div className="ml-auto flex items-center gap-2">
            {enableDensityToggle && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors"
                    style={{ borderColor, color: textColor, backgroundColor: getRoleColor('surface.default') }}
                  >
                    Density <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {(Object.keys(DENSITY_LABEL) as Density[]).map((option) => (
                    <DropdownMenuItem key={option} onSelect={() => setDensity(option)}>
                      <span style={{ fontWeight: option === density ? 600 : 400 }}>{DENSITY_LABEL[option]}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {enableExport && (
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors"
                style={{ borderColor, color: textColor, backgroundColor: getRoleColor('surface.default') }}
              >
                <Download className="h-4 w-4" /> Export CSV
              </button>
            )}
            {enableColumnVisibility && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors"
                    style={{ borderColor, color: textColor, backgroundColor: getRoleColor('surface.default') }}
                  >
                    Columns <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      )}

      {/* Table and footer share one bordered, rounded shell so the footer
          reads as part of the grid (MUI DataGrid's treatment) rather than a
          detached row floating beneath it. `overflow-hidden` here is what
          clips the table's top corners to the shell's radius; the scroll
          container is the inner div, so sticky headers and pinned columns
          still resolve against that and are unaffected. */}
      <div className="overflow-hidden rounded-md border" style={{ borderColor, backgroundColor: rowBg }}>
        <div className="overflow-auto" style={{ maxHeight }}>
          <table className="w-full border-collapse" style={tableStyle}>
          <thead style={maxHeight ? { position: 'sticky', top: 0, zIndex: 2 } : undefined}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} style={{ backgroundColor: headerBg }}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const canHide = header.column.getCanHide();
                  const sortState = header.column.getIsSorted();
                  const sortIndex = header.column.getSortIndex();
                  const SortIcon = sortState === 'asc' ? ChevronUp : sortState === 'desc' ? ChevronDown : ChevronsUpDown;
                  const headerLabel = header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext());
                  return (
                    <th
                      key={header.id}
                      className={cn('relative h-10 px-3 text-left text-sm font-medium')}
                      // aria-sort is what actually announces sort state to a
                      // screen reader; the icon alone conveys nothing to one.
                      aria-sort={canSort ? (sortState === 'asc' ? 'ascending' : sortState === 'desc' ? 'descending' : 'none') : undefined}
                      style={{
                        color: textColor,
                        width: enableColumnResizing ? header.getSize() : undefined,
                        ...getPinnedCellStyle(header.column, headerBg, maxHeight ? { zIndex: header.column.getIsPinned() ? 3 : 2 } : undefined),
                      }}
                    >
                      {header.isPlaceholder ? null : canSort || canHide ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            {/* A real button, not a click handler on the <th>:
                                the previous version could only be sorted with
                                a mouse — no focus, no keyboard, no ARIA. */}
                            <button
                              type="button"
                              className="-ml-2 inline-flex h-8 max-w-full items-center gap-1.5 rounded-md px-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2"
                              style={{ color: textColor, '--tw-ring-color': getRoleColor('focus.ring') } as React.CSSProperties}
                              // Shift-click keeps its meaning as "add to the
                              // multi-sort" rather than opening the menu —
                              // Radix opens on pointerdown, so it has to be
                              // intercepted here rather than in onClick.
                              onPointerDown={(e) => {
                                if (e.shiftKey && canSort) {
                                  e.preventDefault();
                                  header.column.toggleSorting(undefined, true);
                                }
                              }}
                            >
                              <span className="truncate">{headerLabel}</span>
                              {canSort && (
                                <span className="inline-flex shrink-0 items-center gap-0.5">
                                  <SortIcon className="h-3.5 w-3.5 opacity-60" />
                                  {sortState && sorting.length > 1 && (
                                    <span className="text-[10px] font-bold" style={{ color: activeColor }}>
                                      {sortIndex + 1}
                                    </span>
                                  )}
                                </span>
                              )}
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-36">
                            {canSort && (
                              <>
                                <DropdownMenuCheckboxItem checked={sortState === 'asc'} onCheckedChange={() => header.column.toggleSorting(false)}>
                                  <ChevronUp className="mr-2 h-4 w-4 opacity-60" /> Asc
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={sortState === 'desc'} onCheckedChange={() => header.column.toggleSorting(true)}>
                                  <ChevronDown className="mr-2 h-4 w-4 opacity-60" /> Desc
                                </DropdownMenuCheckboxItem>
                                {sortState && (
                                  <DropdownMenuItem onSelect={() => header.column.clearSorting()}>
                                    <X className="mr-2 h-4 w-4 opacity-60" /> Reset
                                  </DropdownMenuItem>
                                )}
                              </>
                            )}
                            {canHide && (
                              <DropdownMenuItem onSelect={() => header.column.toggleVisibility(false)}>
                                <EyeOff className="mr-2 h-4 w-4 opacity-60" /> Hide
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        headerLabel
                      )}
                      {enableColumnResizing && header.column.getCanResize() && (
                        // This is WAI-ARIA's documented "resizable separator" pattern (a
                        // focusable role="separator" with aria-valuenow + keyboard support) —
                        // jsx-a11y's static rules don't special-case that variant of the role
                        // and flag it as if it were the plain, non-interactive divider use.
                        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
                        <div
                          role="separator"
                          aria-orientation="vertical"
                          aria-label={`Resize column ${header.id}`}
                          aria-valuenow={header.column.getSize()}
                          tabIndex={0}
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          onKeyDown={(e) => {
                            // No pointer to drive TanStack's own resize
                            // handler here — resize the column directly.
                            // shiftKey for a bigger step, matching the
                            // common resizable-pane keyboard convention.
                            const step = e.shiftKey ? 20 : 5;
                            if (e.key === 'ArrowLeft') {
                              e.preventDefault();
                              table.setColumnSizing((old) => ({
                                ...old,
                                [header.column.id]: Math.max(20, header.column.getSize() - step),
                              }));
                            } else if (e.key === 'ArrowRight') {
                              e.preventDefault();
                              table.setColumnSizing((old) => ({
                                ...old,
                                [header.column.id]: header.column.getSize() + step,
                              }));
                            }
                          }}
                          className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize touch-none select-none focus-visible:outline-none focus-visible:ring-2"
                          style={{
                            backgroundColor: header.column.getIsResizing() ? activeColor : 'transparent',
                            '--tw-ring-color': getRoleColor('focus.ring'),
                          } as React.CSSProperties}
                        />
                        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: loadingRowCount ?? pageSize }).map((_, i) => (
                <tr key={`loading-${i}`} style={{ borderTop: `1px solid ${borderColor}` }}>
                  {columns.map((col, colIndex) => (
                    <td key={col.id ?? colIndex} className={cn('px-3', cellPadding)}>
                      <Skeleton height={16} width={colIndex === 0 ? '60%' : '80%'} />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                {/* `p-0`: Empty brings its own padding, so the cell must not
                    add a second layer around it. */}
                <td colSpan={columns.length} className="p-0">
                  {emptyState ?? (
                    // border-0: Empty's default dashed outline would read as a
                    // second box inside the table's own border.
                    <Empty className="border-0">
                      <EmptyHeader>
                        <EmptyMedia variant="icon">{isFilteredEmpty ? <SearchX /> : <Inbox />}</EmptyMedia>
                        <EmptyTitle>{isFilteredEmpty ? 'No matching results' : 'No data yet'}</EmptyTitle>
                        <EmptyDescription>
                          {isFilteredEmpty
                            ? 'No rows match your current search. Try a different term, or clear the search to see everything.'
                            : 'There is nothing to show here yet.'}
                        </EmptyDescription>
                      </EmptyHeader>
                      {isFilteredEmpty && (
                        <EmptyContent>
                          <button
                            type="button"
                            onClick={() => table.resetColumnFilters()}
                            className="rounded-md border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
                            style={{ borderColor, color: textColor, '--tw-ring-color': getRoleColor('focus.ring') } as React.CSSProperties}
                          >
                            Clear search
                          </button>
                        </EmptyContent>
                      )}
                    </Empty>
                  )}
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const rowBackground = row.getIsSelected() ? selectedBg : hoveredRow === row.id ? hoverBg : rowBg;
                return (
                  <tr
                    key={row.id}
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      backgroundColor: rowBackground,
                      borderTop: `1px solid ${borderColor}`,
                      color: textColor,
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isEditable = !!onCellEdit && cell.column.columnDef.meta?.editable;
                      const isEditing = isEditable && editingCell?.rowId === row.id && editingCell?.columnId === cell.column.id;

                      const beginEdit = () => {
                        const current = cell.getValue();
                        setDraft(current == null ? '' : String(current));
                        setEditingCell({ rowId: row.id, columnId: cell.column.id });
                      };
                      const commit = () => {
                        const previousValue = cell.getValue();
                        setEditingCell(null);
                        // Skip the callback when nothing actually changed, so
                        // a stray click into and out of a cell isn't reported
                        // to the consumer as an edit.
                        if (draft !== (previousValue == null ? '' : String(previousValue))) {
                          onCellEdit?.({ rowId: row.id, rowIndex: row.index, columnId: cell.column.id, value: draft, previousValue, row: row.original });
                        }
                      };

                      return (
                        <td
                          key={cell.id}
                          className={cn('px-3 text-sm', isEditing ? 'py-0' : cellPadding)}
                          style={{
                            width: enableColumnResizing ? cell.column.getSize() : undefined,
                            ...getPinnedCellStyle(cell.column, rowBackground),
                          }}
                        >
                          {isEditing ? (
                            <Input
                              // Focus-on-mount via ref rather than autoFocus:
                              // entering edit mode must move focus or a
                              // keyboard user is stranded, but autoFocus is
                              // the blunt version jsx-a11y rightly rejects.
                              // Guarded so re-renders while typing don't
                              // re-steal focus.
                              ref={(el) => {
                                if (el && document.activeElement !== el) el.focus();
                              }}
                              value={draft}
                              aria-label={`Edit ${cell.column.id}`}
                              onChange={(e) => setDraft(e.target.value)}
                              onBlur={commit}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  commit();
                                } else if (e.key === 'Escape') {
                                  e.preventDefault();
                                  // Discard: clear the cell before React can
                                  // fire the blur-commit on unmount.
                                  setEditingCell(null);
                                }
                              }}
                              className="h-8 w-full"
                            />
                          ) : isEditable ? (
                            // A button, not a div with onDoubleClick: editing
                            // has to be reachable by keyboard too (Enter/F2,
                            // the convention spreadsheets use).
                            <button
                              type="button"
                              onDoubleClick={beginEdit}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === 'F2') {
                                  e.preventDefault();
                                  beginEdit();
                                }
                              }}
                              className="-mx-1 flex h-7 w-full items-center rounded px-1 text-left focus-visible:outline-none focus-visible:ring-2"
                              style={{ '--tw-ring-color': getRoleColor('focus.ring') } as React.CSSProperties}
                              title="Double-click or press Enter to edit"
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </button>
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
          </table>
        </div>

        {/* `flex-wrap`: Pagination's own root already wraps internally, but
            that only helps once something forces it into a constrained
            width — this row previously didn't, so on narrow viewports
            Pagination just rendered at its full unwrapped intrinsic width
            instead, overflowing past the table (which cascaded into
            page-wide horizontal scroll for any consumer without its own
            fix upstream). */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t px-3 py-2" style={{ borderColor }}>
          {enableRowSelection && (
            <span className="text-sm" style={{ color: mutedColor }}>
              {table.getFilteredSelectedRowModel().rows.length} of {filteredCount} row(s) selected.
            </span>
          )}
          <Pagination
            // justify-end: Pagination's own content flows left, so as the
            // flex-1 child it used to bunch against the selection count and
            // leave the right half of the footer empty. Right-clustering
            // matches MUI DataGrid and tablecn.
            className="min-w-0 flex-1 justify-end"
            currentPage={pageIndex + 1}
            totalItems={totalItemsForFooter}
            pageSize={currentPageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            // Position is stated once, as "Page X of Y" — the old footer said
            // it four ways at once (range text, numbered buttons, jump-to-page
            // input, and the totals), which read as clutter.
            variant="compact"
            showItemsRange={false}
            showTotalItems={false}
            rowsLabel="Rows per page:"
          />
        </div>
      </div>
    </div>
  );
}

export default DataTable;
