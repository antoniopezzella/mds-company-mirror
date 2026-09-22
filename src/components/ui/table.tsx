import * as React from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Checkbox } from './checkbox';
import { Skeleton } from './skeleton';
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
  emptyMessage = 'No data available',
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

  const borderColor = getRoleColor('border.default');
  const headerBg = getRoleColor('surface.subtle');
  const rowBg = getRoleColor('surface.default');
  const stripeBg = getRoleColor('surface.subtle');
  const hoverBg = getRoleColor('surface.subtle');
  const selectedBg = getRoleColor('surface.accent');
  const textColor = getRoleColor('text.primary');
  const mutedColor = getRoleColor('text.secondary');

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
        <table className={cn('w-full border-collapse', className)}>
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
              Array.from({ length: pageSize || 5 }).map((_, rowIndex) => (
                <tr key={`skeleton-${rowIndex}`} style={{ borderTop: `1px solid ${borderColor}` }}>
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
            ) : sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={cn(cellPadding, 'text-center')}
                  style={{ color: mutedColor }}
                >
                  {emptyMessage}
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

export const Table = TableComponent as <T extends object>(props: TableProps<T>) => React.ReactElement;

export default Table;
