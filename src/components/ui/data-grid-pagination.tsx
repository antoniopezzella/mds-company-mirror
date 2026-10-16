"use client"

import * as React from 'react';
import type { RowData } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Pagination } from './pagination';
import { useDataGrid } from './data-grid';

export interface DataGridPaginationProps {
  /**
   * Shows "N of M row(s) selected" on the left. Only meaningful when the
   * table was built with row selection.
   */
  showSelectedCount?: boolean;
  /** Page sizes offered in the picker. Falls through to Pagination's own default. */
  pageSizeOptions?: number[];
  /** Fires on page or page-size change. Required for server-side pagination. */
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
  rowsLabel?: string;
  className?: string;
}

/**
 * The footer: selection count and pagination.
 *
 * Wraps the existing `Pagination` rather than reimplementing it — including
 * `pageSizeOptions`, which `Pagination` has always supported and which
 * `DataTable` simply never forwarded.
 *
 * Server mode is inferred from the table's own `manualPagination` option, not
 * a prop here: the table instance already knows, and asking the consumer to
 * say it twice is how the two get out of step.
 */
export const DataGridPagination = React.forwardRef<HTMLDivElement, DataGridPaginationProps>(
  function DataGridPagination(
    { showSelectedCount = false, pageSizeOptions, onPaginationChange, rowsLabel = 'Rows per page:', className },
    ref
  ) {
  // `TData` was a dead generic here — nothing in `DataGridPaginationProps`
  // ever supplied it, so a caller could never have set it to anything but
  // its own constraint. `useDataGrid<RowData>()` is exactly what that
  // resolved to; naming it explicitly is what let this become a plain
  // (non-generic) forwardRef component, which a generic function component
  // cannot be without a cast.
  const { table, recordCount } = useDataGrid<RowData>();

  const { pageIndex, pageSize } = table.state.pagination;
  const manual = !!table.options.manualPagination;

  // In manual mode the local row model only ever holds the current page, so
  // the footer needs the caller's real total instead of counting rows.
  const filteredCount = table.getFilteredRowModel().rows.length;
  const totalItems = manual ? recordCount : filteredCount;

  const borderColor = 'var(--role-border-default)';
  const mutedColor = 'var(--role-text-secondary)';

  const handlePageChange = (page: number) => {
    table.setPageIndex(page - 1);
    if (manual) onPaginationChange?.(page - 1, pageSize);
  };
  const handlePageSizeChange = (size: number) => {
    table.setPageSize(size);
    if (manual) onPaginationChange?.(0, size);
  };

  return (
    // `flex-wrap`: Pagination's own root wraps internally, but that only helps
    // once something forces it into a constrained width — this row previously
    // didn't, so on narrow viewports Pagination rendered at its full intrinsic
    // width and overflowed past the table, cascading into page-wide horizontal
    // scroll for any consumer without its own fix upstream.
    <div
      ref={ref}
      className={cn('flex flex-wrap items-center justify-between gap-4 border-t px-3 py-2', className)}
      style={{ borderColor }}
    >
      {showSelectedCount && (
        <span className="text-sm" style={{ color: mutedColor }}>
          {table.getFilteredSelectedRowModel().rows.length} of {filteredCount} row(s) selected.
        </span>
      )}
      <Pagination
        // justify-end: Pagination's content flows left, so as the flex-1 child
        // it used to bunch against the selection count and leave the right
        // half of the footer empty. Right-clustering matches MUI DataGrid.
        className="min-w-0 flex-1 justify-end"
        currentPage={pageIndex + 1}
        totalItems={totalItems}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        // Position is stated once, as "Page X of Y" — the old footer said it
        // four ways at once (range text, numbered buttons, jump-to-page input
        // and totals), which read as clutter.
        variant="compact"
        showItemsRange={false}
        showTotalItems={false}
        rowsLabel={rowsLabel}
      />
    </div>
  );
  }
);
DataGridPagination.displayName = 'DataGridPagination';

export default DataGridPagination;
