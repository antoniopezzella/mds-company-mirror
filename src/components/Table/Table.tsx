import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import './Table.scss';
import { Pagination } from '../Pagination';
import type { PaginationVariant } from '../Pagination';
import DSSkeleton from '../Skeleton/Skeleton';

export type TableVariant = 'default' | 'striped' | 'bordered' | 'compact';
export type TableSize = 'sm' | 'md' | 'lg';
export type SortDirection = 'asc' | 'desc' | null;

export interface PaginationConfig {
  enabled: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  variant?: PaginationVariant;
  showItemsRange?: boolean;
  showTotalItems?: boolean;
}

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> {
  /** Array of column definitions */
  columns: TableColumn<T>[];
  /** Array of data rows */
  data: T[];
  /** Visual variant of the table */
  variant?: TableVariant;
  /** Size of the table */
  size?: TableSize;
  /** Enable row hover effect */
  hoverable?: boolean;
  /** Enable sticky header */
  stickyHeader?: boolean;
  /** Maximum height for scrollable table */
  maxHeight?: string;
  /** Enable row selection */
  selectable?: boolean;
  /** Callback when row is selected */
  onRowSelect?: (selectedRows: T[]) => void;
  /** Show loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Caption for accessibility */
  caption?: string;
  /** Custom class name */
  className?: string;
  /** Enable sorting */
  sortable?: boolean;
  /** Callback when sort changes */
  onSort?: (column: string, direction: SortDirection) => void;
  /** Default sort column */
  defaultSortColumn?: string;
  /** Default sort direction */
  defaultSortDirection?: SortDirection;
  /** Pagination configuration */
  pagination?: PaginationConfig;
  /** Enable scroll shadows when content overflows */
  scrollShadows?: boolean;
  /** Enable sticky first column */
  stickyFirstColumn?: boolean;
  /** Enable scroll progress indicator */
  showScrollProgress?: boolean;
  /** Enable auto-scroll to focused cell */
  scrollToFocus?: boolean;
  /**
   * Stretch the table to fill the remaining viewport height so the page
   * itself does not scroll — the table body scrolls internally instead.
   * Pair with `stickyHeader` for the best experience.
   */
  fillHeight?: boolean;
  /**
   * Height of the fixed chrome above the table (e.g. `'64px'` for a nav bar,
   * or `'64px + 48px'` for nav + toolbar). Used only when `fillHeight` is true.
   * Accepts any valid CSS length or calc expression.
   */
  heightOffset?: string;
  /**
   * Minimum width of the inner <table> element. When reached the wrapper
   * starts horizontal scrolling instead of collapsing columns.
   * Falls back to responsive SCSS defaults when omitted.
   */
  minWidth?: string;
}

// Using function declaration instead of arrow function to avoid Babel parsing issues
function TableComponent<T extends Record<string, unknown>>({
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
  className = '',
  sortable = false,
  onSort,
  defaultSortColumn,
  defaultSortDirection = null,
  pagination,
  scrollShadows = true,
  stickyFirstColumn = false,
  showScrollProgress = false,
  scrollToFocus = true,
  fillHeight = false,
  heightOffset = '0px',
  minWidth,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(defaultSortColumn || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSortDirection);
  
  // Scroll state management
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
    canScrollUp: false,
    canScrollDown: false,
    scrollProgress: 0,
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 25);

  // Detect scroll position
  const updateScrollState = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const { scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight } = wrapper;
    
    const canScrollLeft = scrollLeft > 0;
    const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;
    const canScrollUp = scrollTop > 0;
    const canScrollDown = scrollTop < scrollHeight - clientHeight - 1;
    const scrollProgress = scrollHeight > clientHeight 
      ? (scrollTop / (scrollHeight - clientHeight)) * 100 
      : 0;

    setScrollState({
      canScrollLeft,
      canScrollRight,
      canScrollUp,
      canScrollDown,
      scrollProgress,
    });
  }, []);

  // Update scroll state on mount and data change
  useEffect(() => {
    updateScrollState();
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('scroll', updateScrollState);
      return () => wrapper.removeEventListener('scroll', updateScrollState);
    }
  }, [updateScrollState, data.length]);

  // Auto-scroll to focused cell
  useEffect(() => {
    if (!scrollToFocus) return;

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.mds-table__cell')) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('focusin', handleFocus as EventListener);
      return () => wrapper.removeEventListener('focusin', handleFocus as EventListener);
    }
  }, [scrollToFocus]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortable || !sortColumn || !sortDirection) {
      return data;
    }

    const column = columns.find(col => col.key === sortColumn);
    if (!column) return data;

    return [...data].sort((a, b) => {
      let aVal: unknown = column.accessor ? column.accessor(a) : a[column.key];
      let bVal: unknown = column.accessor ? column.accessor(b) : b[column.key];

      // Handle null/undefined
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      // Convert to string for comparison if needed
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      // Type assertion for comparison
      const aComp = aVal as string | number;
      const bComp = bVal as string | number;

      if (aComp < bComp) return sortDirection === 'asc' ? -1 : 1;
      if (aComp > bComp) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection, columns, sortable]);

  // Paginated data
  const paginatedData = useMemo(() => {
    if (!pagination?.enabled) {
      return sortedData;
    }
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, pagination, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Clear selections when changing pages
    setSelectedRows(new Set());
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page
    setSelectedRows(new Set());
  };

  const handleSort = (column: TableColumn<T>) => {
    if (!sortable || !column.sortable) return;

    let newDirection: SortDirection = 'asc';
    
    if (sortColumn === column.key) {
      if (sortDirection === 'asc') newDirection = 'desc';
      else if (sortDirection === 'desc') newDirection = null;
    }

    setSortColumn(newDirection ? column.key : null);
    setSortDirection(newDirection);

    if (onSort) {
      onSort(column.key, newDirection);
    }
  };

  const handleRowSelect = (index: number) => {
    if (!selectable) return;

    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);

    if (onRowSelect) {
      // Map paginated indexes to actual data
      const selectedData = Array.from(newSelected).map(i => {
        if (pagination?.enabled) {
          const dataIndex = (currentPage - 1) * pageSize + i;
          return sortedData[dataIndex];
        }
        return sortedData[i];
      });
      onRowSelect(selectedData);
    }
  };

  const handleSelectAll = () => {
    if (!selectable) return;

    const currentData = pagination?.enabled ? paginatedData : sortedData;
    
    if (selectedRows.size === currentData.length) {
      setSelectedRows(new Set());
      if (onRowSelect) onRowSelect([]);
    } else {
      const allIndexes = new Set(currentData.map((_, i) => i));
      setSelectedRows(allIndexes);
      if (onRowSelect) onRowSelect(currentData);
    }
  };

  const getCellValue = (row: T, column: TableColumn<T>): React.ReactNode => {
    if (column.render) {
      const index = sortedData.indexOf(row);
      const value = column.accessor ? column.accessor(row) : row[column.key];
      return column.render(value, row, index);
    }
    return column.accessor ? column.accessor(row) : (row[column.key] as React.ReactNode);
  };

  const tableClasses = [
    'mds-table',
    `mds-table--${variant}`,
    `mds-table--${size}`,
    hoverable && 'mds-table--hoverable',
    stickyHeader && 'mds-table--sticky-header',
    selectable && 'mds-table--selectable',
    stickyFirstColumn && 'mds-table--sticky-first-column',
    className,
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    'mds-table-wrapper',
    fillHeight && 'mds-table-wrapper--fill-height',
    scrollShadows && scrollState.canScrollLeft && 'mds-table-wrapper--shadow-left',
    scrollShadows && scrollState.canScrollRight && 'mds-table-wrapper--shadow-right',
    scrollShadows && scrollState.canScrollUp && 'mds-table-wrapper--shadow-top',
    scrollShadows && scrollState.canScrollDown && 'mds-table-wrapper--shadow-bottom',
  ].filter(Boolean).join(' ');

  const wrapperStyle: React.CSSProperties = {
    ...(maxHeight ? { maxHeight, overflowY: 'auto' } : {}),
    ...(fillHeight ? { '--mds-table-offset': heightOffset } as React.CSSProperties : {}),
    ...(minWidth ? { '--mds-table-min-width': minWidth } as React.CSSProperties : {}),
  };

  return (
    <>
      {showScrollProgress && scrollState.scrollProgress > 0 && (
        <div 
          className="mds-table__scroll-progress" 
          style={{ width: `${scrollState.scrollProgress}%` }}
          aria-hidden="true"
        />
      )}
      <div className={wrapperClasses} style={wrapperStyle} ref={wrapperRef}>
      <table className={tableClasses}>
        {caption && <caption className="mds-table__caption">{caption}</caption>}
        
        <thead className="mds-table__head">
          <tr className="mds-table__row">
            {selectable && (
              <th className="mds-table__header mds-table__header--checkbox">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((column, colIndex) => {
              const isSorted = sortColumn === column.key;
              const ariaSort = column.sortable && sortable
                ? (isSorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none')
                : undefined;

              return (
                <th
                  key={column.key}
                  className={[
                    'mds-table__header',
                    column.sortable && sortable && 'mds-table__header--sortable',
                    isSorted && 'mds-table__header--sorted',
                    stickyFirstColumn && colIndex === 0 && 'mds-table__header--sticky-left',
                  ].filter(Boolean).join(' ')}
                  style={{
                    width: column.width,
                    textAlign: column.align || 'left',
                  }}
                  onClick={() => column.sortable && sortable && handleSort(column)}
                  aria-sort={ariaSort}
                  role={column.sortable && sortable ? 'button' : undefined}
                  tabIndex={column.sortable && sortable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (column.sortable && sortable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleSort(column);
                    }
                  }}
                >
                  <div className="mds-table__header-content">
                    {column.header}
                    {column.sortable && sortable && (
                      <span className="mds-table__sort-icon" aria-hidden="true">
                        {isSorted ? (
                          sortDirection === 'asc' ? '↑' : '↓'
                        ) : (
                          '↕'
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="mds-table__body">
          {loading ? (
            Array.from({ length: pageSize || 5 }).map((_, rowIndex) => (
              <tr key={`skeleton-${rowIndex}`} className="mds-table__row">
                {selectable && (
                  <td className="mds-table__cell mds-table__cell--checkbox">
                    <DSSkeleton variant="rectangular" width={18} height={18} />
                  </td>
                )}
                {columns.map((column, colIndex) => (
                  <td
                    key={`skeleton-cell-${colIndex}`}
                    className={[
                      'mds-table__cell',
                      stickyFirstColumn && colIndex === 0 && 'mds-table__cell--sticky-left',
                    ].filter(Boolean).join(' ')}
                  >
                    <DSSkeleton variant="text" width="80%" />
                  </td>
                ))}
              </tr>
            ))
          ) : sortedData.length === 0 ? (
            <tr className="mds-table__row">
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="mds-table__cell mds-table__cell--empty"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={[
                  'mds-table__row',
                  selectedRows.has(rowIndex) && 'mds-table__row--selected',
                ].filter(Boolean).join(' ')}
              >
                {selectable && (
                  <td className="mds-table__cell mds-table__cell--checkbox">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(rowIndex)}
                      onChange={() => handleRowSelect(rowIndex)}
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </td>
                )}
                {columns.map((column, colIndex) => (
                  <td
                    key={column.key}
                    className={[
                      'mds-table__cell',
                      stickyFirstColumn && colIndex === 0 && 'mds-table__cell--sticky-left',
                    ].filter(Boolean).join(' ')}
                    style={{ textAlign: column.align || 'left' }}
                  >
                    {getCellValue(row, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination?.enabled && sortedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={sortedData.length}
          pageSize={pageSize}
          pageSizeOptions={pagination.pageSizeOptions}
          variant={pagination.variant || 'advanced'}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          showItemsRange={pagination.showItemsRange}
          showTotalItems={pagination.showTotalItems}
        />
      )}
      </div>
    </>
  );
}

export const Table = TableComponent as <T extends Record<string, unknown>>(
  props: TableProps<T>
) => React.ReactElement;

export default Table;
