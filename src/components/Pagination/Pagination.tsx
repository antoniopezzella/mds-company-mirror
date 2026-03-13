import React from 'react';
import './Pagination.css';

export type PaginationVariant = 'simple' | 'advanced';

export interface PaginationProps {
  /** Current page number (1-based) */
  currentPage: number;
  /** Total number of items */
  totalItems: number;
  /** Number of items per page */
  pageSize: number;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Variant of pagination */
  variant?: PaginationVariant;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Custom class name */
  className?: string;
  /** Show items range text */
  showItemsRange?: boolean;
  /** Show total items count */
  showTotalItems?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  variant = 'advanced',
  onPageChange,
  onPageSizeChange,
  className = '',
  showItemsRange = true,
  showTotalItems = true,
  disabled = false,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePageChange = (page: number) => {
    if (disabled) return;
    if (page < 1 || page > totalPages) return;
    if (page === currentPage) return;
    onPageChange(page);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (disabled || !onPageSizeChange) return;
    const newSize = parseInt(e.target.value, 10);
    onPageSizeChange(newSize);
    // Reset to page 1 when changing page size
    if (currentPage > Math.ceil(totalItems / newSize)) {
      onPageChange(1);
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const value = e.target.value;
    if (value === '') return;
    const page = parseInt(value, 10);
    if (!isNaN(page)) {
      handlePageChange(page);
    }
  };

  // Generate page numbers to show (with ellipsis logic)
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Show max 7 page buttons

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const paginationClasses = [
    'mds-pagination',
    `mds-pagination--${variant}`,
    disabled && 'mds-pagination--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={paginationClasses}>
      {/* Items range and count */}
      {(showItemsRange || showTotalItems) && (
        <div className="mds-pagination__info">
          {showItemsRange && totalItems > 0 && (
            <span className="mds-pagination__range">
              {startItem}–{endItem}
            </span>
          )}
          {showTotalItems && (
            <span className="mds-pagination__total">
              {showItemsRange && ' of '}
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>
      )}

      {/* Page size selector (advanced only) */}
      {variant === 'advanced' && onPageSizeChange && (
        <div className="mds-pagination__page-size">
          <label htmlFor="page-size-select" className="mds-pagination__label">
            Items per page:
          </label>
          <select
            id="page-size-select"
            className="mds-pagination__select"
            value={pageSize}
            onChange={handlePageSizeChange}
            disabled={disabled}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Navigation controls */}
      <div className="mds-pagination__controls">
        {/* First page button (advanced only) */}
        {variant === 'advanced' && (
          <button
            className="mds-pagination__button mds-pagination__button--first"
            onClick={() => handlePageChange(1)}
            disabled={disabled || currentPage === 1}
            aria-label="First page"
            title="First page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 2h2v12H3V2zm3 5.5L12 3v10l-6-4.5z" />
            </svg>
          </button>
        )}

        {/* Previous page button */}
        <button
          className="mds-pagination__button mds-pagination__button--prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label="Previous page"
          title="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 3L5 8l5 5V3z" />
          </svg>
        </button>

        {/* Page numbers (advanced only) */}
        {variant === 'advanced' && (
          <div className="mds-pagination__pages">
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`ellipsis-${index}`} className="mds-pagination__ellipsis">
                    …
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  className={`mds-pagination__page ${
                    page === currentPage ? 'mds-pagination__page--active' : ''
                  }`}
                  onClick={() => handlePageChange(page as number)}
                  disabled={disabled}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}

        {/* Page indicator (simple variant) */}
        {variant === 'simple' && (
          <div className="mds-pagination__indicator">
            <span className="mds-pagination__current">{currentPage}</span>
            <span className="mds-pagination__separator">/</span>
            <span className="mds-pagination__total-pages">{totalPages}</span>
          </div>
        )}

        {/* Next page button */}
        <button
          className="mds-pagination__button mds-pagination__button--next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          aria-label="Next page"
          title="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 3l5 5-5 5V3z" />
          </svg>
        </button>

        {/* Last page button (advanced only) */}
        {variant === 'advanced' && (
          <button
            className="mds-pagination__button mds-pagination__button--last"
            onClick={() => handlePageChange(totalPages)}
            disabled={disabled || currentPage === totalPages}
            aria-label="Last page"
            title="Last page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11 2h2v12h-2V2zM4 3l6 4.5L4 13V3z" />
            </svg>
          </button>
        )}

        {/* Page jump input (advanced only) */}
        {variant === 'advanced' && totalPages > 1 && (
          <div className="mds-pagination__jump">
            <label htmlFor="page-jump-input" className="mds-pagination__label">
              Page
            </label>
            <input
              id="page-jump-input"
              type="number"
              className="mds-pagination__input"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={handlePageInputChange}
              disabled={disabled}
              aria-label="Jump to page"
            />
            <span className="mds-pagination__label">of {totalPages}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
