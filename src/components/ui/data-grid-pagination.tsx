"use client"

import * as React from 'react';
import type { RowData } from '@tanstack/react-table';


import { cn } from '@/lib/utils';

import { Button } from './button';
import { Icon } from './icon';
import { Input } from './input';
import { DSSelect } from './select';
import { useDataGrid } from './data-grid';

export interface DataGridPaginationProps {
  showSelectedCount?: boolean;
  pageSizeOptions?: number[];
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
  /** Label before the page-size select. */
  rowsLabel?: string;
  /**
   * Figma `Data table/Pagination` Type:
   * - `compact` (default): range + first / previous / next / last
   * - `pages`: range + previous, numbered pages, next
   * - `jump`: range + "Page [ n ] of N" + first / previous / next / last —
   *   for more than 50 pages (hand-off §4.11). Enter jumps; a number outside
   *   1–N marks the input invalid with "Enter 1–N".
   */
  variant?: 'compact' | 'pages' | 'jump';
  className?: string;
}

/** 1 … 4 5 [6] 7 8 … 20 — at most 7 slots, both ends always shown. */
function pageWindow(current: number, total: number): (number | 'gap-start' | 'gap-end')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const start = Math.max(2, Math.min(current - 1, total - 4));
  const end = Math.min(total - 1, Math.max(current + 1, 5));
  const out: (number | 'gap-start' | 'gap-end')[] = [1];
  if (start > 2) out.push('gap-start');
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push('gap-end');
  out.push(total);
  return out;
}

// Figma Page item: 32x32, radius V3/Medium (4), Body/Small; Selected is a
// neutral/default fill with a bold label, Hover the neutral overlay.
const pageItemClass = cn(
  'inline-flex size-8 items-center justify-center rounded-sm text-sm text-[var(--mds-color-foreground-neutral-default)]',
  'hover:bg-[var(--mds-color-overlay-neutral-hover)]',
  'aria-[current=page]:bg-[var(--mds-color-background-neutral-default)] aria-[current=page]:font-bold',
  'focus-visible:outline-hidden focus-visible:shadow-[0_0_0_2px_var(--mds-color-background-default),0_0_0_4px_var(--mds-color-border-focus-default)]'
);

/**
 * Figma `Data table/Footer` bar on its own: 1px border/subtle rule on top,
 * density insets, its two halves pushed apart. `DataGridPagination` fills it
 * by default; a summary footer ("5 groups • 11 line items") passes its own
 * content — text in it is Body/Small muted unless the content says otherwise.
 */
/**
 * Focus the first thing in a body row a keyboard user can act on: its first
 * focusable control, else the row or a roving grid cell when those are tab
 * stops, else the row itself made programmatically focusable (tabindex -1, so
 * it does not become a tab stop).
 */
function focusFirstInRow(row: HTMLTableRowElement) {
  const target =
    row.querySelector<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]'
    ) ?? (row.hasAttribute('tabindex') ? row : null);
  if (target) {
    target.focus();
    return;
  }
  row.tabIndex = -1;
  row.focus();
}

export const DataGridFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DataGridFooter({ className, style, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="data-grid-footer"
        className={cn(
          'flex flex-wrap items-center justify-between gap-[var(--dt-gap)] border-t px-[var(--dt-inset-x)] py-[var(--dt-bar-inset-y)]',
          'text-sm text-[var(--mds-color-foreground-neutral-subtle)]',
          className
        )}
        style={{ borderColor: 'var(--mds-color-border-subtle)', ...style }}
        {...props}
      />
    );
  }
);
DataGridFooter.displayName = 'DataGridFooter';

/**
 * Figma `Data table/Footer`: rows-per-page on the left, range and navigation
 * on the right, a 1px border/subtle rule on top, insets from the density mode.
 *
 * This is the grid's own footer rather than the shared `Pagination`: the V3
 * table's page items are neutral (the shared control fills the current page
 * with brand primary) and its nav buttons are the system's tertiary icon
 * buttons, and restyling `Pagination` would change every other screen using it.
 */
export const DataGridPagination = React.forwardRef<HTMLDivElement, DataGridPaginationProps>(
  function DataGridPagination(
    {
      showSelectedCount = false,
      pageSizeOptions = [10, 25, 50, 100],
      onPaginationChange,
      rowsLabel = 'Rows per page',
      variant = 'compact',
      className,
    },
    ref
  ) {
  const { table, recordCount, loading, fetching, status } = useDataGrid<RowData>();
  const labelId = React.useId();
  const footerRef = React.useRef<HTMLDivElement | null>(null);
  const setFooterRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      footerRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    },
    [ref]
  );
  // Hand-off §5 Pagination: after a page change focus moves to the first body
  // row, so a keyboard user lands on the new page instead of on a Next button
  // that may have just become disabled. Deferred until real rows are on
  // screen — in server mode the page arrives after a fetch.
  // Holds the first row on screen when the page was asked for: focus waits
  // until a DIFFERENT row leads the body — in server mode the old page stays
  // up (possibly un-flagged) until the consumer swaps `data`. Compared by
  // element AND content: with index row ids React reuses the same <tr>.
  const focusFirstRowPending = React.useRef<false | { from: Element | null; text: string | null }>(false);
  const firstBodyRow = () =>
    footerRef.current
      ?.closest('[data-slot="data-grid"]')
      ?.querySelector<HTMLTableRowElement>(
        'tbody:not([data-pinned]) > tr:not([aria-hidden="true"]):not([data-detail-row])'
      ) ?? null;
  React.useEffect(() => {
    if (!focusFirstRowPending.current || loading || fetching || status !== 'ready') return;
    const row = firstBodyRow();
    const { from, text } = focusFirstRowPending.current;
    if (!row || (row === from && row.textContent === text)) return;
    focusFirstRowPending.current = false;
    focusFirstInRow(row);
  });

  const { pageIndex, pageSize } = table.state.pagination;
  const manual = !!table.options.manualPagination;

  const filteredCount = table.getFilteredRowModel().rows.length;
  const totalItems = manual ? recordCount : filteredCount;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(pageIndex + 1, totalPages);
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  const mutedText = 'text-[var(--mds-color-foreground-neutral-subtle)]';

  // The current size is always a choice: a `pageSize` outside the options
  // (DataTable `pageSize={3}` with the default 10/25/50/100) would otherwise
  // leave the select blank, since a Select shows nothing for an unknown value.
  const sizeOptions = pageSizeOptions.includes(pageSize)
    ? pageSizeOptions
    : [...pageSizeOptions, pageSize].sort((a, b) => a - b);

  // Jump: the typed page, re-seeded whenever the page changes from elsewhere.
  const [jumpDraft, setJumpDraft] = React.useState(String(currentPage));
  const [jumpInvalid, setJumpInvalid] = React.useState(false);
  React.useEffect(() => {
    setJumpDraft(String(currentPage));
    setJumpInvalid(false);
  }, [currentPage]);
  const jumpMessageId = React.useId();
  const jumpInputId = React.useId();

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    const from = firstBodyRow();
    focusFirstRowPending.current = { from, text: from?.textContent ?? null };
    table.setPageIndex(page - 1);
    if (manual) onPaginationChange?.(page - 1, pageSize);
  };
  const handlePageSizeChange = (size: number) => {
    table.setPageSize(size);
    table.setPageIndex(0);
    if (manual) onPaginationChange?.(0, size);
  };

  // Shared shape for the four arrows: the system's tertiary icon button —
  // 32px, primary icon, disabled grey — exactly what the Figma nav uses.
  // Glyphs are the Marsh/Material set Figma draws (first_page, chevron_left…)
  // at its 20px icon size, not lucide's heavier 16px strokes.
  const nav = (label: string, icon: React.ReactNode, page: number, disabled: boolean) => (
    <Button
      variant="tertiary"
      size="sm"
      iconOnly
      icon={icon}
      aria-label={label}
      disabled={disabled}
      onClick={() => goTo(page)}
    />
  );

  return (
    <DataGridFooter ref={setFooterRef} className={className}>
      <div className="flex flex-wrap items-center gap-[var(--dt-gap)]">
        <span id={labelId} className={cn('text-sm', mutedText)}>
          {rowsLabel}
        </span>
        <DSSelect
          size="sm"
          className="w-20"
          aria-labelledby={labelId}
          options={sizeOptions.map((n) => ({ value: n, label: String(n) }))}
          value={pageSize}
          onChange={(v) => handlePageSizeChange(Number(v))}
        />
        {showSelectedCount && (
          <span className={cn('text-sm', mutedText)}>
            {table.getFilteredSelectedRowModel().rows.length} of {filteredCount} row(s) selected.
          </span>
        )}
      </div>
      {/* Not a <nav> landmark: the controls belong to THIS table, and two
          tables on one page would expose two identical "Pagination"
          landmarks (axe landmark-unique). Each button carries its own name. */}
      <div className="flex flex-wrap items-center gap-[var(--dt-gap)]">
        {/* Figma Range: "1–15 of 48". aria-live so a page change is heard.
            The range alone does not say WHICH page — "Page X of Y" is the
            position contract DataTable's tests hold the footer to, kept for
            assistive tech while the visible design shows only the range. */}
        <span className={cn('text-sm whitespace-nowrap', mutedText)} aria-live="polite">
          {firstItem}–{lastItem} of {totalItems.toLocaleString()}
          <span className="sr-only">
            {' '}
            Page {currentPage} of {totalPages}
          </span>
        </span>
        <div className="flex flex-wrap items-center gap-1">
          {variant === 'jump' && (
            // Figma Pagination Type=Jump (17278:10901): "Page" + Input Small
            // (56 × 32) + "of 25", 8 apart, between the range and the arrows.
            <span className="me-1 flex items-center gap-2">
              <label htmlFor={jumpInputId} className={cn('text-sm', mutedText)}>
                Page
              </label>
              <Input
                id={jumpInputId}
                size="sm"
                inputMode="numeric"
                className="w-14 text-center"
                value={jumpDraft}
                tone={jumpInvalid ? 'error' : 'default'}
                aria-invalid={jumpInvalid || undefined}
                aria-describedby={jumpInvalid ? jumpMessageId : undefined}
                onChange={(e) => {
                  setJumpDraft(e.target.value);
                  setJumpInvalid(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== 'Enter') return;
                  e.preventDefault();
                  const n = Number(jumpDraft.trim());
                  if (!Number.isInteger(n) || n < 1 || n > totalPages) {
                    setJumpInvalid(true);
                    return;
                  }
                  goTo(n);
                }}
              />
              <span className={cn('text-sm whitespace-nowrap', mutedText)}>of {totalPages.toLocaleString()}</span>
              {jumpInvalid && (
                <span id={jumpMessageId} role="alert" className="text-sm whitespace-nowrap text-[var(--mds-color-foreground-critical-default)]">
                  Enter 1–{totalPages.toLocaleString()}
                </span>
              )}
            </span>
          )}
          {variant !== 'pages' && nav('First page', <Icon name="first_page" />, 1, currentPage === 1)}
          {nav('Previous page', <Icon name="chevron_left" />, currentPage - 1, currentPage === 1)}
          {variant === 'pages' &&
            pageWindow(currentPage, totalPages).map((p) =>
              typeof p === 'number' ? (
                <button
                  key={p}
                  type="button"
                  className={pageItemClass}
                  aria-label={`Page ${p}`}
                  aria-current={p === currentPage ? 'page' : undefined}
                  onClick={() => goTo(p)}
                >
                  {p}
                </button>
              ) : (
                // Figma Page item State=Disabled: the "…" is not a control.
                <span
                  key={p}
                  aria-hidden="true"
                  className="inline-flex size-8 items-center justify-center text-sm text-[var(--mds-color-foreground-disabled)]"
                >
                  …
                </span>
              )
            )}
          {nav('Next page', <Icon name="chevron_right" />, currentPage + 1, currentPage === totalPages)}
          {variant !== 'pages' && nav('Last page', <Icon name="last_page" />, totalPages, currentPage === totalPages)}
        </div>
      </div>
    </DataGridFooter>
  );
  }
);
DataGridPagination.displayName = 'DataGridPagination';

export default DataGridPagination;
