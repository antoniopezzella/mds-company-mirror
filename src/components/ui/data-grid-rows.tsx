"use client"

import * as React from 'react';
import type { Row, RowData } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Icon } from './icon';
import type { DataGridColumnDef, DataGridFeatures } from './data-grid-features';

/**
 * Row-level controls: expansion and pinning.
 *
 * Both are ready-made columns in the shape of `createSelectColumn` — a column
 * def you drop into your `columns` array — because both need a cell of their
 * own and neither should force every consumer to rebuild the same toggle.
 */

export interface ExpandColumnOptions {
  /**
   * Indent per nesting level, in px. Only affects sub-rows. Defaults to 32 —
   * Figma `Content/Tree`: each level is a 24px step plus the 8px gap.
   */
  indent?: number;
  /** Accessible label for the toggle. `{row}` is replaced with the row index. */
  label?: string;
  /**
   * Visually-hidden header text.
   *
   * A control column still needs one: an empty `<th>` is an axe
   * `empty-table-header` violation, and a screen reader announces the column
   * as unnamed when navigating cells. `createSelectColumn` only escapes this
   * because its checkbox carries an aria-label.
   */
  headerLabel?: string;
}

/**
 * Set by `DataGridTable` when it renders detail panels (`renderDetail`): the
 * id it gives each row's detail `<tr>`, so the expand toggle can point
 * `aria-controls` at it. Null for sub-rows only.
 */
export const DataGridDetailContext = React.createContext<{ detailIdFor: (rowId: string) => string } | null>(null);

/**
 * Expand/collapse toggle column.
 *
 * Serves both shapes of expansion:
 *  - **sub-rows** (`getSubRows` on the table) render as ordinary rows, indented
 *    by depth;
 *  - **detail panels** (`renderDetail` on DataGridTable) render as one extra
 *    row beneath.
 *
 * `aria-expanded` goes on the button. `aria-controls` is set for detail
 * panels only, and only while expanded — the one moment the detail `<tr>`
 * exists to point at. For sub-rows the controlled content is several sibling
 * `<tr>`s with no single id, and a broken idref is worse than none.
 *
 * Keys (hand-off §5): Enter/Space toggle, → expands, ← collapses.
 */
export function createExpandColumn<TData extends RowData>({
  indent = 32,
  label = 'Toggle row {row}',
  headerLabel = 'Expand',
}: ExpandColumnOptions = {}): DataGridColumnDef<TData> {
  return {
    id: 'expand',
    header: () => <span className="sr-only">{headerLabel}</span>,
    cell: ({ row }) => {
      if (!row.getCanExpand()) {
        // Keep the cell, drop the control: an empty cell holds the column's
        // width so leaf rows line up with expandable ones.
        return <span style={{ paddingLeft: row.depth * indent }} aria-hidden="true" />;
      }
      return <ExpandToggle row={row} indent={indent} label={label} />;
    },
    enableSorting: false,
    enableHiding: false,
    // The control's own width; as a `leading` column the grid adds the cell
    // inset and joins it to the next cell — the toggle sits INSIDE the first
    // cell in Figma, 8px before the label.
    size: 24,
    meta: { leading: true, mergeHeader: true },
  };
}

function ExpandToggle<TData extends RowData>({
  row,
  indent,
  label,
}: {
  row: Row<DataGridFeatures, TData>;
  indent: number;
  label: string;
}) {
  const detail = React.useContext(DataGridDetailContext);
  const expanded = row.getIsExpanded();
  return (
        <button
          type="button"
          onClick={row.getToggleExpandedHandler()}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' && !expanded) {
              e.preventDefault();
              e.stopPropagation();
              row.toggleExpanded(true);
            } else if (e.key === 'ArrowLeft' && expanded) {
              e.preventDefault();
              e.stopPropagation();
              row.toggleExpanded(false);
            }
          }}
          aria-expanded={expanded}
          aria-controls={detail && expanded ? detail.detailIdFor(row.id) : undefined}
          aria-label={label.replace('{row}', String(row.index + 1))}
          // Figma `Control/Expand`: 24px, 16px chevron in neutral/subtle,
          // right when collapsed and down when expanded; 2px focus ring
          // outside the control.
          className={cn(
            'flex size-6 items-center justify-center rounded-sm text-[var(--mds-color-foreground-neutral-subtle)]',
            'hover:bg-[var(--mds-color-overlay-neutral-hover)]',
            'focus-visible:outline-hidden focus-visible:shadow-[0_0_0_2px_var(--mds-color-border-focus-default)]'
          )}
          style={{ marginLeft: row.depth * indent }}
        >
          {/* Figma Control/Expand: a 16px Marsh chevron in a 24px target. */}
          {/* Hand-off §5 Motion: rotate 90° in 150 ms ease-out. */}
          <Icon
            name="chevron_right"
            size={16}
            className={cn(
              'transition-transform duration-150 ease-out motion-reduce:transition-none motion-reduce:duration-0',
              expanded && 'rotate-90'
            )}
          />
        </button>
  );
}

export interface PinColumnOptions {
  pinLabel?: string;
  unpinLabel?: string;
  /** Visually-hidden header text — see ExpandColumnOptions.headerLabel. */
  headerLabel?: string;
}

/**
 * Pin/unpin toggle column for row pinning.
 *
 * Pins to `top`. Bottom pinning exists in TanStack but is rarely what a table
 * of records wants — the reason to pin a row is to keep it in view while you
 * scroll past it, which is the top.
 */
export function createRowPinColumn<TData extends RowData>({
  pinLabel = 'Pin row {row}',
  unpinLabel = 'Unpin row {row}',
  headerLabel = 'Pin',
}: PinColumnOptions = {}): DataGridColumnDef<TData> {
  return {
    id: 'pin',
    header: () => <span className="sr-only">{headerLabel}</span>,
    cell: ({ row }) => {
      if (!row.getCanPin()) return null;
      const pinned = row.getIsPinned();
      const n = String(row.index + 1);
      return (
        <button
          type="button"
          onClick={() => row.pin(pinned ? false : 'top')}
          aria-pressed={!!pinned}
          aria-label={(pinned ? unpinLabel : pinLabel).replace('{row}', n)}
          className="flex size-6 items-center justify-center rounded-md opacity-60 transition-opacity motion-reduce:transition-none hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-hidden focus-visible:ring-2"
          style={{ '--tw-ring-color': 'var(--mds-color-border-focus-default)' } as React.CSSProperties}
        >
          {/* Material keep / keep_off — the set Figma's pin icons use. */}
          <Icon pseudo name={pinned ? 'keep_off' : 'keep'} size={16} />
        </button>
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 40,
  };
}

export interface DataGridDetailPanelProps {
  /** The expanded row's detail content — usually a `renderDetail` result passed straight through. */
  children: React.ReactNode;
  /** Figma Detail row header: a bold title… */
  title?: React.ReactNode;
  /** …and a muted summary after it — "3 of 5 items • 3 open • +2 more". */
  summary?: React.ReactNode;
  className?: string;
}

/**
 * Standard padding/background for a master-detail panel, so every consumer's
 * `renderDetail` doesn't re-invent the same frame.
 *
 * The one real component in this file — the `create*Column` helpers above are
 * column-definition factories that return a plain object for TanStack and
 * never mount a DOM root to attach a ref to.
 */
export const DataGridDetailPanel = React.forwardRef<HTMLDivElement, DataGridDetailPanelProps>(
  function DataGridDetailPanel({ children, title, summary, className }, ref) {
  // Figma `Data table/Detail row`: insets and the header-to-content gap are
  // the density's cell inset (16 standard); the surface is the row's own, so
  // the expansion reads as part of the row it opened rather than a well.
  return (
    <div
      ref={ref}
      data-slot="data-grid-detail-panel"
      className={cn(
        'flex flex-col gap-[var(--dt-inset-x,1rem)] p-[var(--dt-inset-x,1rem)] text-sm',
        'text-[var(--mds-color-foreground-primary-default)]',
        className
      )}
    >
      {(title != null || summary != null) && (
        <div className="flex flex-wrap items-center gap-[var(--dt-gap,0.5rem)]">
          {title != null && <span className="font-bold">{title}</span>}
          {summary != null && (
            <span className="text-[var(--mds-color-foreground-neutral-subtle)]">{summary}</span>
          )}
        </div>
      )}
      {children}
    </div>
  );
  }
);
DataGridDetailPanel.displayName = 'DataGridDetailPanel';

/** Narrow helper so consumers can type a `renderDetail` without naming the feature set. */
export type DataGridRow<TData extends RowData> = Row<DataGridFeatures, TData>;
