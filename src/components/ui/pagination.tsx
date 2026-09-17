import * as React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

export type PaginationVariant = 'simple' | 'advanced';

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  pageSizeOptions?: number[];
  variant?: PaginationVariant;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
  showItemsRange?: boolean;
  showTotalItems?: boolean;
  disabled?: boolean;
  /**
   * Word appended after the total count, auto-pluralized ('item'/'items').
   * Defaults to 'item' (current behavior: "1–5 of 8 items"). Pass '' for
   * MUI TablePagination's bare convention instead: "1–5 of 8".
   */
  itemLabel?: string;
  /** Label before the page-size selector. Defaults to 'Items per page:' — pass 'Rows per page:' to match MUI's TablePagination wording. */
  rowsLabel?: string;
}

function getPageNumbers(currentPage: number, totalPages: number): (number | '...')[] {
  const maxVisible = 7;
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | '...')[] = [1];
  if (currentPage > 3) pages.push('...');
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (currentPage < totalPages - 2) pages.push('...');
  pages.push(totalPages);
  return pages;
}

const navButtonClass =
  'flex h-8 w-8 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

/**
 * Design System Pagination — shadcn/ui counterpart for the MDS Pagination.
 * Same `currentPage`/`totalItems`/`pageSize`/`pageSizeOptions`/`variant`/
 * `onPageChange`/`onPageSizeChange` API as the MUI twin.
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  variant = 'advanced',
  onPageChange,
  onPageSizeChange,
  className,
  showItemsRange = true,
  showTotalItems = true,
  disabled = false,
  itemLabel = 'item',
  rowsLabel = 'Items per page:',
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const [hoveredPage, setHoveredPage] = React.useState<number | null>(null);

  const goTo = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const focusRing = getRoleColor('focus.ring');
  const hoverBg = getRoleColor('surface.subtle');
  const activeBg = getRoleColor('interactive.primary');
  const activeFg = getRoleColor('text.onInteractive');
  const textColor = getRoleColor('text.primary');
  const mutedColor = getRoleColor('text.secondary');

  const pluralizedItemLabel = itemLabel && (totalItems === 1 ? itemLabel : `${itemLabel}s`);

  return (
    <div className={cn('flex flex-wrap items-center gap-x-6 gap-y-2', className)} style={{ color: textColor }}>
      {(showItemsRange || showTotalItems) && (
        <div className="text-sm" style={{ color: mutedColor }}>
          {showItemsRange && totalItems > 0 && <span>{startItem}–{endItem}</span>}
          {showTotalItems && (
            <span>
              {showItemsRange && ' of '}
              {totalItems}
              {pluralizedItemLabel && ` ${pluralizedItemLabel}`}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {variant === 'advanced' && onPageSizeChange && (
          <div className="flex items-center gap-1.5 text-sm">
            <label htmlFor="pagination-page-size" style={{ color: mutedColor }}>
              {rowsLabel}
            </label>
            <select
              id="pagination-page-size"
              value={pageSize}
              disabled={disabled}
              onChange={(e) => {
                const newSize = parseInt(e.target.value, 10);
                onPageSizeChange(newSize);
                if (currentPage > Math.ceil(totalItems / newSize)) onPageChange(1);
              }}
              className="rounded-md border px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2"
              style={{ borderColor: getRoleColor('border.default'), backgroundColor: getRoleColor('surface.default'), color: textColor, '--tw-ring-color': focusRing } as React.CSSProperties}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-1">
          {variant === 'advanced' && (
            <button
              type="button"
              aria-label="First page"
              disabled={disabled || currentPage === 1}
              onClick={() => goTo(1)}
              className={navButtonClass}
              style={{ color: textColor, '--tw-ring-color': focusRing } as React.CSSProperties}
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            aria-label="Previous page"
            disabled={disabled || currentPage === 1}
            onClick={() => goTo(currentPage - 1)}
            className={navButtonClass}
            style={{ color: textColor, '--tw-ring-color': focusRing } as React.CSSProperties}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {variant === 'advanced' ? (
            <div className="flex items-center gap-1">
              {getPageNumbers(currentPage, totalPages).map((page, index) =>
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-1 text-sm" style={{ color: mutedColor }}>
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                    disabled={disabled}
                    onClick={() => goTo(page)}
                    onMouseEnter={() => setHoveredPage(page)}
                    onMouseLeave={() => setHoveredPage(null)}
                    className={cn(navButtonClass, 'text-sm font-medium')}
                    style={{
                      backgroundColor: page === currentPage ? activeBg : hoveredPage === page ? hoverBg : 'transparent',
                      color: page === currentPage ? activeFg : textColor,
                      '--tw-ring-color': focusRing,
                    } as React.CSSProperties}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 text-sm">
              <span className="font-medium">{currentPage}</span>
              <span style={{ color: mutedColor }}>/</span>
              <span style={{ color: mutedColor }}>{totalPages}</span>
            </div>
          )}

          <button
            type="button"
            aria-label="Next page"
            disabled={disabled || currentPage === totalPages}
            onClick={() => goTo(currentPage + 1)}
            className={navButtonClass}
            style={{ color: textColor, '--tw-ring-color': focusRing } as React.CSSProperties}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          {variant === 'advanced' && (
            <button
              type="button"
              aria-label="Last page"
              disabled={disabled || currentPage === totalPages}
              onClick={() => goTo(totalPages)}
              className={navButtonClass}
              style={{ color: textColor, '--tw-ring-color': focusRing } as React.CSSProperties}
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {variant === 'advanced' && totalPages > 1 && (
          <div className="flex items-center gap-1.5 text-sm">
            <label htmlFor="pagination-jump" style={{ color: mutedColor }}>
              Page
            </label>
            <input
              id="pagination-jump"
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              disabled={disabled}
              onChange={(e) => {
                if (e.target.value === '') return;
                const page = parseInt(e.target.value, 10);
                if (!Number.isNaN(page)) goTo(page);
              }}
              aria-label="Jump to page"
              className="w-14 rounded-md border px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2"
              style={{ borderColor: getRoleColor('border.default'), backgroundColor: getRoleColor('surface.default'), color: textColor, '--tw-ring-color': focusRing } as React.CSSProperties}
            />
            <span style={{ color: mutedColor }}>of {totalPages}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
