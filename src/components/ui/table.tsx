"use client"

import * as React from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Checkbox } from './checkbox';
import { Skeleton } from './skeleton';
import { DataState, resolveDataStatus } from './data-state';
import { Pagination, type PaginationVariant } from './pagination';

/**
 * Design System Table — shadcn/ui counterpart for the MDS Table. Covers the
 * MUI twin's core feature set (columns/sort/select/loading/pagination); the
 * more exotic scroll-shadow / sticky-first-column / scroll-progress /
 * scroll-to-focus polish is left out of this first pass to keep scope sane
 * — sortable/selectable/paginated/striped/bordered/compact tables (the vast
 * majority of real usage) are all covered.
 */

export type TableVariant = 'default' | 'striped' | 'bordered' | 'compact';
export type TableSize = 'sm' | 'md' | 'lg';
export type SortDirection = 'asc' | 'desc' | null;

export interface TablePaginationConfig {
  enabled: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  variant?: PaginationVariant;
  showItemsRange?: boolean;
  showTotalItems?: boolean;
}

export interface TableColumn<T = object> {
  key: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface TableProps<T = object> {
  columns: TableColumn<T>[];
  data: T[];
  variant?: TableVariant;
  size?: TableSize;
  hoverable?: boolean;
  stickyHeader?: boolean;
  maxHeight?: string;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  loading?: boolean;
  /**
   * The fetch failed. Named `loadError`, not `error`, to stay lexically
   * distinct from form validation — see data-state.tsx.
   */
  loadError?: React.ReactNode | Error | boolean | null;
  /** Re-runs the failed load. Renders "Try again"; omitted when absent. */
  onRetry?: () => void;
  /** Replaces the empty state entirely. The canonical name across the system. */
  emptyState?: React.ReactNode;
  /**
   * @deprecated since 0.7.0; remove after 0.8.0 / 2026-12-23.
   *  Use `emptyState`, which takes a ReactNode and is the name
   * every other data surface uses. Still honoured: passing a string here is
   * equivalent to `emptyState={<string>}`.
   */
  emptyMessage?: string;
  caption?: string;
  className?: string;
  sortable?: boolean;
  onSort?: (column: string, direction: SortDirection) => void;
  defaultSortColumn?: string;
  defaultSortDirection?: SortDirection;
  pagination?: TablePaginationConfig;
}

const SIZE_PADDING: Record<TableSize, string> = {
  sm: 'px-2 py-1.5 text-xs',
  md: 'px-3 py-2.5 text-sm',
  lg: 'px-4 py-3.5 text-base',
};

function TableComponent<T extends object>({
  columns,
  data,
  variant = 'default',
  size = 'md',
  hoverable = false,
  stickyHeader = false,
  maxHeight,
  selectable = false,
  onRowSelect,
  loading = false,
  emptyMessage,
  emptyState,
  loadError,
  onRetry,
  caption,
  className,
  sortable = false,
  onSort,
  defaultSortColumn,
  defaultSortDirection = null,
  pagination,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());
  const [sortColumn, setSortColumn] = React.useState<string | null>(defaultSortColumn ?? null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(defaultSortDirection);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(pagination?.pageSize ?? 25);
  const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortable || !sortColumn || !sortDirection) return data;
    const column = columns.find((c) => c.key === sortColumn);
    if (!column) return data;
    return [...data].sort((a, b) => {
      let aVal: unknown = column.accessor ? column.accessor(a) : (a as Record<string, unknown>)[column.key];
      let bVal: unknown = column.accessor ? column.accessor(b) : (b as Record<string, unknown>)[column.key];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      const aComp = aVal as string | number;
      const bComp = bVal as string | number;
      if (aComp < bComp) return sortDirection === 'asc' ? -1 : 1;
      if (aComp > bComp) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection, columns, sortable]);

  const paginatedData = React.useMemo(() => {
    if (!pagination?.enabled) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pagination, currentPage, pageSize]);

  // `emptyMessage` (string) is the deprecated spelling of `emptyState`
  // (ReactNode). ReactNode is a superset of string, so the alias is a straight
  // pass-through — no behaviour change for existing callers.
  const resolvedEmptyState = emptyState ?? emptyMessage;

  // One precedence rule for the whole system: loading > error > empty > ready.
  const status = resolveDataStatus(
    { loading, loadError, isEmpty: sortedData.length === 0 },
    'Table'
  );

  const handleSort = (column: TableColumn<T>) => {
    if (!sortable || !column.sortable) return;
    let next: SortDirection = 'asc';
    if (sortColumn === column.key) {
      if (sortDirection === 'asc') next = 'desc';
      else if (sortDirection === 'desc') next = null;
    }
    setSortColumn(next ? column.key : null);
    setSortDirection(next);
    onSort?.(column.key, next);
  };

  const handleRowSelect = (index: number) => {
    if (!selectable) return;
    const next = new Set(selectedRows);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setSelectedRows(next);
    onRowSelect?.(Array.from(next).map((i) => paginatedData[i]));
  };

  const handleSelectAll = () => {
    if (!selectable) return;
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const all = new Set(paginatedData.map((_, i) => i));
      setSelectedRows(all);
      onRowSelect?.(paginatedData);
    }
  };

  const getCellValue = (row: T, column: TableColumn<T>, index: number): React.ReactNode => {
    const value = column.accessor ? column.accessor(row) : (row as Record<string, unknown>)[column.key];
    return column.render ? column.render(value, row, index) : (value as React.ReactNode);
  };

  const borderColor = 'var(--role-border-default)';
  const headerBg = 'var(--role-surface-subtle)';
  const rowBg = 'var(--role-surface-default)';
  const stripeBg = 'var(--role-surface-subtle)';
  // Sky Blue in light, unchanged in dark. headerBg and stripeBg above keep the
  // neutral lift deliberately — only the hovered row goes brand.
  const hoverBg = 'var(--role-surface-row-hover)';
  const selectedBg = 'var(--role-surface-accent)';
  const textColor = 'var(--role-text-primary)';
  const mutedColor = 'var(--role-text-secondary)';

  const cellPadding = SIZE_PADDING[size];
  const bordered = variant === 'bordered';
  const striped = variant === 'striped';
  const compact = variant === 'compact';

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn('overflow-auto rounded-md', bordered && 'border')}
        style={{ maxHeight, borderColor: bordered ? borderColor : undefined }}
      >
        <table className={cn('w-full border-collapse', className)} aria-busy={loading || undefined}>
          {caption && (
            <caption className="p-2 text-left text-sm" style={{ color: mutedColor }}>
              {caption}
            </caption>
          )}
          <thead className={cn(stickyHeader && 'sticky top-0 z-10')} style={{ backgroundColor: headerBg }}>
            <tr>
              {selectable && (
                <th className={cn(cellPadding, 'w-10')}>
                  <Checkbox
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => {
                const isSorted = sortColumn === column.key;
                const canSort = Boolean(column.sortable && sortable);
                const SortIcon = isSorted ? (sortDirection === 'asc' ? ChevronUp : ChevronDown) : ChevronsUpDown;
                return (
                  // A sortable header is a <th> (implicitly role=columnheader)
                  // containing a real <button> — NOT a <th role="button">.
                  // The previous shape put role="button" on the cell itself,
                  // which invalidated aria-sort (axe: aria-allowed-attr —
                  // aria-sort is only legal on columnheader/rowheader) and
                  // discarded the column-header semantics a screen reader needs
                  // to relate a cell to its column. The native button also
                  // brings keyboard activation for free, so the hand-rolled
                  // Enter/Space handler is gone.
                  <th
                    key={column.key}
                    className={cn(cellPadding, 'font-semibold')}
                    style={{ width: column.width, textAlign: column.align ?? 'left', color: mutedColor }}
                    aria-sort={canSort ? (isSorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none') : undefined}
                  >
                    {canSort ? (
                      <button
                        type="button"
                        onClick={() => handleSort(column)}
                        className="flex cursor-pointer select-none items-center gap-1 border-0 bg-transparent p-0 font-semibold text-inherit"
                      >
                        {column.header}
                        <SortIcon className="h-3.5 w-3.5 opacity-60" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1">{column.header}</div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Skeleton rows are aria-hidden: they are a visual placeholder, not
              // content. Without it a screen reader narrates a grid of empty cells on
              // every load. `aria-busy` on the <table> is what conveys "loading".
              Array.from({ length: pageSize || 5 }).map((_, rowIndex) => (
                <tr aria-hidden="true" key={`skeleton-${rowIndex}`} style={{ borderTop: `1px solid ${borderColor}` }}>
                  {selectable && (
                    <td className={cellPadding}>
                      <Skeleton variant="rectangular" width={16} height={16} />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className={cellPadding}>
                      <Skeleton variant="text" width="80%" />
                    </td>
                  ))}
                </tr>
              ))
            ) : status !== 'ready' ? (
              <tr>
                {/* `p-0`: DataState brings its own padding. */}
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-0">
                  <DataState
                    status={status}
                    loadError={loadError}
                    onRetry={onRetry}
                    emptyState={resolvedEmptyState}
                    name="Table"
                  />
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const isSelected = selectedRows.has(rowIndex);
                const isHovered = hoveredRow === rowIndex;
                const bg = isSelected ? selectedBg : isHovered && hoverable ? hoverBg : striped && rowIndex % 2 === 1 ? stripeBg : rowBg;
                return (
                  <tr
                    key={rowIndex}
                    onMouseEnter={() => setHoveredRow(rowIndex)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{ backgroundColor: bg, borderTop: compact ? undefined : `1px solid ${borderColor}`, color: textColor }}
                  >
                    {selectable && (
                      <td className={cellPadding}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleRowSelect(rowIndex)}
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((column, colIndex) => (
                      <td key={column.key} className={cellPadding} style={{ textAlign: column.align ?? 'left' }}>
                        {getCellValue(row, column, colIndex)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination?.enabled && sortedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={sortedData.length}
          pageSize={pageSize}
          pageSizeOptions={pagination.pageSizeOptions}
          variant={pagination.variant ?? 'advanced'}
          onPageChange={(page) => {
            setCurrentPage(page);
            setSelectedRows(new Set());
          }}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
            setSelectedRows(new Set());
          }}
          showItemsRange={pagination.showItemsRange}
          showTotalItems={pagination.showTotalItems}
        />
      )}
    </div>
  );
}

/**
 * @deprecated since 0.7.0; remove after 0.8.0 / 2026-12-23.
 * Use `DataTable`, which renders the same shapes on the shared grid engine.
 *
 * Why this is going
 * -----------------
 * `Table` is a SECOND implementation. It shares no code with `DataTable` or
 * `DataGrid` — its own sorting, its own pagination, its own selection, and no
 * TanStack. Every fix therefore has to be made twice, and it is already
 * losing that race: the ambiguous `aria-label="Select all rows"` and the
 * positional `Select row N` were both fixed on the grid and both still sit in
 * this file, because nothing connects them. It also has zero tests, against
 * roughly ninety on the grid.
 *
 * There is no bundle argument for keeping it either — fifteen modules in
 * `components/ui` already import TanStack, so any app using this system pays
 * for it regardless.
 *
 * Migrating
 * ---------
 *   variant="bordered"      -> the default; DataGridContainer draws it
 *   variant="borderless"    -> <DataGridContainer border={false}>
 *   variant="striped"       -> striped
 *   variant="compact"       -> defaultDensity="compact"
 *   size                    -> defaultDensity
 *   defaultSortColumn/-Direction -> initialSorting={[{ id, desc }]}
 *   emptyMessage            -> emptyState
 *   onRowSelect             -> enableRowSelection + onSelectionChange
 *
 * Two things do NOT carry over, deliberately:
 *   - `hoverable={false}`. The grid always shows a hover affordance; a row you
 *     can interact with should say so.
 *   - `onSort`. With `DataGrid` the consumer holds the table instance and can
 *     read sorting directly, which is strictly more capable than a callback.
 *
 * See Foundations -> Choosing a table.
 */
export const Table = TableComponent as <T extends object>(props: TableProps<T>) => React.ReactElement;

export default Table;
