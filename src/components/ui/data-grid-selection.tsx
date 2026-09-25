"use client"

import * as React from 'react';
import type { RowData } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Button } from './button';
import type { DataGridTableInstance } from './data-grid-features';

/**
 * Select-all SCOPE — the difference between "these 25" and "all 12,482".
 *
 * The problem
 * -----------
 * `createSelectColumn`'s header checkbox called `toggleAllPageRowsSelected`
 * while announcing itself as "Select all rows". It selects the PAGE and says
 * ALL, which is the ambiguity the experience spec calls out by name: never
 * leave the meaning of "Select all" unclear. Every bulk action built on top
 * inherits it — "Delete" against an ambiguous scope is a data-loss bug, not a
 * copy problem.
 *
 * Why a separate flag, rather than just selecting every row
 * ---------------------------------------------------------
 * In server mode the client holds ONE PAGE. `getFilteredSelectedRowModel()`
 * can only ever report rows the client has, so "all 12,482 filtered results"
 * is not expressible as row-selection state at all — there are no row objects
 * for the other 12,457. It has to be a separate assertion about the QUERY:
 * "everything the current filters match", resolved server-side when the action
 * runs.
 *
 * That is why this is a scope, not a bigger selection.
 */

export type SelectionScope = 'page' | 'all-filtered';

export interface SelectionState {
  /** Ids the user picked individually, or by selecting the page. */
  selectedRowIds: string[];
  /** Of those, the ones on the current page — what the checkboxes reflect. */
  selectedVisibleRows: number;
  /**
   * True when the user escalated to "everything matching the filters".
   *
   * Consumers MUST branch on this: with it set, `selectedRowIds` describes
   * only the page and is the wrong thing to send to a bulk endpoint. Send the
   * filter state instead.
   */
  allFilteredRowsSelected: boolean;
  /** How many records the escalation covers. Server-supplied in server mode. */
  totalFilteredCount: number;
}

export interface UseSelectionScopeOptions {
  /**
   * Total rows matching the current filters across the whole dataset — NOT
   * just the loaded page. In client mode this is the filtered row count; in
   * server mode the server must supply it, because the client cannot know it.
   */
  totalFilteredCount: number;
}

export interface UseSelectionScopeResult extends SelectionState {
  /** Escalate to every filtered record. */
  selectAllFiltered: () => void;
  /** Drop back to per-row selection, clearing everything. */
  clearSelection: () => void;
  /**
   * True when the page is fully selected AND more records match the filters —
   * the only moment the escalation is worth offering.
   */
  canEscalate: boolean;
}

export function useSelectionScope<TData extends RowData>(
  table: DataGridTableInstance<TData>,
  { totalFilteredCount }: UseSelectionScopeOptions
): UseSelectionScopeResult {
  const [allFilteredRowsSelected, setAll] = React.useState(false);

  const selectedRowIds = Object.entries(table.state.rowSelection ?? {})
    .filter(([, v]) => v)
    .map(([k]) => k);
  const selectedVisibleRows = table.getSelectedRowModel().rows.length;
  const pageFullySelected = table.getIsAllPageRowsSelected();

  // Any change to the selection itself retreats from the escalation: the user
  // has gone back to picking rows, so a stale "all results" flag would make
  // the next bulk action operate on far more than they can see.
  const lastIds = React.useRef(selectedRowIds.join(','));
  const nowIds = selectedRowIds.join(',');
  React.useEffect(() => {
    if (lastIds.current !== nowIds) {
      lastIds.current = nowIds;
      setAll(false);
    }
  }, [nowIds]);

  return {
    selectedRowIds,
    selectedVisibleRows,
    allFilteredRowsSelected,
    totalFilteredCount,
    canEscalate: pageFullySelected && totalFilteredCount > selectedVisibleRows,
    selectAllFiltered: () => setAll(true),
    clearSelection: () => {
      setAll(false);
      table.resetRowSelection();
    },
  };
}

export interface DataGridSelectionBannerProps extends UseSelectionScopeResult {
  /** Noun for the records, e.g. "policy". */
  itemNoun?: string;
  /**
   * Plural form. Defaults to `itemNoun + "s"`, which is wrong for "policy",
   * "match", "party" and most of the world's languages — the spec requires
   * i18n support (§45), and a design system guessing English morphology is
   * how "7 policys" ships. Pass it whenever the default does not apply.
   */
  itemNounPlural?: string;
  className?: string;
}

/**
 * States the selection's scope, and offers the escalation.
 *
 * Deliberately a `role="status"` with `aria-live="polite"`: the scope changing
 * from "25 selected" to "all 1,284 selected" is the single most important
 * thing a user can fail to notice before pressing Delete, and it happens
 * without focus moving.
 */
export function DataGridSelectionBanner({
  selectedVisibleRows,
  allFilteredRowsSelected,
  totalFilteredCount,
  canEscalate,
  selectAllFiltered,
  clearSelection,
  itemNoun = 'row',
  itemNounPlural,
  className,
}: DataGridSelectionBannerProps) {
  if (selectedVisibleRows === 0 && !allFilteredRowsSelected) return null;

  const many = itemNounPlural ?? `${itemNoun}s`;
  const plural = (n: number) => `${n.toLocaleString()} ${n === 1 ? itemNoun : many}`;

  return (
    <div
      data-slot="data-grid-selection-banner"
      role="status"
      aria-live="polite"
      className={cn('flex flex-wrap items-center gap-3 rounded-lg px-3 py-2 text-sm', className)}
      style={{
        backgroundColor: getRoleColor('surface.subtle'),
        color: getRoleColor('text.primary'),
        border: `1px solid ${getRoleColor('border.subtle')}`,
      }}
    >
      {allFilteredRowsSelected ? (
        <>
          <span>
            <strong>All {plural(totalFilteredCount)}</strong> matching the current filters are
            selected.
          </span>
          <Button variant="tertiary" size="sm" onClick={clearSelection}>
            Clear selection
          </Button>
        </>
      ) : (
        <>
          <span>
            <strong>{plural(selectedVisibleRows)}</strong> selected on this page.
          </span>
          {canEscalate && (
            <Button variant="tertiary" size="sm" onClick={selectAllFiltered}>
              Select all {totalFilteredCount.toLocaleString()} results
            </Button>
          )}
          <Button variant="tertiary" size="sm" onClick={clearSelection}>
            Clear selection
          </Button>
        </>
      )}
    </div>
  );
}
