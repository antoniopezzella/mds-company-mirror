import * as React from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
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
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { Pagination } from './pagination';
import { Skeleton } from './skeleton';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu';

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
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);

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
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection, columnPinning },
    initialState: { pagination: { pageSize } },
  });

  const borderColor = getRoleColor('border.default');
  const headerBg = getRoleColor('surface.subtle');
  const rowBg = getRoleColor('surface.default');
  const hoverBg = getRoleColor('surface.subtle');
  const selectedBg = getRoleColor('surface.accent');
  const textColor = getRoleColor('text.primary');
  const mutedColor = getRoleColor('text.secondary');

  const rows = table.getRowModel().rows;
  const { pageIndex, pageSize: currentPageSize } = table.getState().pagination;
  const filteredCount = table.getFilteredRowModel().rows.length;

  // Sticky cells detach from the row's own background during scroll, so a
  // pinned cell needs its background painted explicitly (it won't inherit
  // through from the <tr>) — `bg` is whatever that specific row/header
  // would otherwise have been. The right-edge shadow marks where the
  // pinned region ends and the scrolling content begins.
  const getPinnedCellStyle = (
    column: { getIsPinned: () => false | 'left' | 'right'; getStart: (side: 'left') => number },
    bg: string
  ): React.CSSProperties =>
    column.getIsPinned() === 'left'
      ? { position: 'sticky', left: column.getStart('left'), zIndex: 1, backgroundColor: bg, boxShadow: `1px 0 0 0 ${borderColor}` }
      : {};

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {(searchKey || enableColumnVisibility) && (
        <div className="flex items-center justify-between gap-2">
          {searchKey && (
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
              onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
              className="max-w-sm"
            />
          )}
          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="ml-auto flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors"
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
      )}

      <div className="overflow-auto rounded-md border" style={{ borderColor }}>
        <table className="w-full border-collapse">
          <thead style={{ backgroundColor: headerBg }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortState = header.column.getIsSorted();
                  const SortIcon = sortState === 'asc' ? ArrowUp : sortState === 'desc' ? ArrowDown : ArrowUpDown;
                  return (
                    <th
                      key={header.id}
                      className={cn('px-3 py-2.5 text-left text-sm font-semibold', canSort && 'cursor-pointer select-none')}
                      style={{ color: mutedColor, ...getPinnedCellStyle(header.column, headerBg) }}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-1">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && <SortIcon className="h-3.5 w-3.5 opacity-60" />}
                        </div>
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
                    <td key={col.id ?? colIndex} className="px-3 py-2.5">
                      <Skeleton height={16} width={colIndex === 0 ? '60%' : '80%'} />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-6 text-center text-sm" style={{ color: mutedColor }}>
                  No results.
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
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-3 py-2.5 text-sm"
                        style={getPinnedCellStyle(cell.column, rowBackground)}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        {enableRowSelection && (
          <span className="text-sm" style={{ color: mutedColor }}>
            {table.getFilteredSelectedRowModel().rows.length} of {filteredCount} row(s) selected.
          </span>
        )}
        <Pagination
          className="min-w-0 flex-1"
          currentPage={pageIndex + 1}
          totalItems={filteredCount}
          pageSize={currentPageSize}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          onPageSizeChange={(size) => table.setPageSize(size)}
        />
      </div>
    </div>
  );
}

export default DataTable;
