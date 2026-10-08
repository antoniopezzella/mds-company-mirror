"use client"

import * as React from 'react';
import type { Row, RowData } from '@tanstack/react-table';
import { ChevronRight, Pin, PinOff } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { DataGridColumnDef, DataGridFeatures } from './data-grid-features';

/**
 * Row-level controls: expansion and pinning.
 *
 * Both are ready-made columns in the shape of `createSelectColumn` — a column
 * def you drop into your `columns` array — because both need a cell of their
 * own and neither should force every consumer to rebuild the same toggle.
 */

export interface ExpandColumnOptions {
  /** Indent per nesting level, in px. Only affects sub-rows. */
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
 * Expand/collapse toggle column.
 *
 * Serves both shapes of expansion:
 *  - **sub-rows** (`getSubRows` on the table) render as ordinary rows, indented
 *    by depth;
 *  - **detail panels** (`renderDetail` on DataGridTable) render as one extra
 *    row beneath.
 *
 * `aria-expanded` goes on the button and `aria-controls` is deliberately NOT
 * set: for sub-rows the controlled content is several sibling `<tr>`s with no
 * single id to point at, and a broken idref is worse than none.
 */
export function createExpandColumn<TData extends RowData>({
  indent = 20,
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
      const expanded = row.getIsExpanded();
      return (
        <button
          type="button"
          onClick={row.getToggleExpandedHandler()}
          aria-expanded={expanded}
          aria-label={label.replace('{row}', String(row.index + 1))}
          className="flex size-6 items-center justify-center rounded-md transition-transform focus-visible:outline-hidden focus-visible:ring-2"
          style={
            {
              marginLeft: row.depth * indent,
              '--tw-ring-color': 'var(--role-focus-ring)',
            } as React.CSSProperties
          }
        >
          <ChevronRight
            className={cn('size-4 opacity-70 transition-transform', expanded && 'rotate-90')}
            aria-hidden="true"
          />
        </button>
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 40,
  };
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
          className="flex size-6 items-center justify-center rounded-md opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-hidden focus-visible:ring-2"
          style={{ '--tw-ring-color': 'var(--role-focus-ring)' } as React.CSSProperties}
        >
          {pinned ? <PinOff className="size-4" aria-hidden="true" /> : <Pin className="size-4" aria-hidden="true" />}
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
  className?: string;
}

/**
 * Standard padding/background for a master-detail panel, so every consumer's
 * `renderDetail` doesn't re-invent the same frame.
 */
export function DataGridDetailPanel({ children, className }: DataGridDetailPanelProps) {
  return (
    <div
      className={cn('px-6 py-4 text-sm', className)}
      style={{ backgroundColor: 'var(--role-surface-subtle)', color: 'var(--role-text-primary)' }}
    >
      {children}
    </div>
  );
}

/** Narrow helper so consumers can type a `renderDetail` without naming the feature set. */
export type DataGridRow<TData extends RowData> = Row<DataGridFeatures, TData>;
