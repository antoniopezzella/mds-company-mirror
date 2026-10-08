"use client"

import * as React from 'react';
import type { RowData } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { shadows } from '@/shadows';
import { resolveDataStatus, type DataStatus } from './data-state';
import type { DataGridTableInstance } from './data-grid-features';

/**
 * DataGrid — the composable grid.
 *
 * `DataTable` is one component with 28 props; every capability added to it has
 * to become another boolean, and all of its state is private (a consumer
 * cannot even read which rows are selected). This is the other shape: the
 * consumer owns the `table` instance, and the parts compose.
 *
 *     const table = useTable({ features: dataGridFeatures, columns, data })
 *
 *     <DataGrid table={table} recordCount={rows.length}>
 *       <DataGridToolbar searchKey="name" />
 *       <DataGridContainer>
 *         <DataGridScrollArea>
 *           <DataGridTable />
 *         </DataGridScrollArea>
 *         <DataGridPagination />
 *       </DataGridContainer>
 *     </DataGrid>
 *
 * `DataTable` is now a preset over exactly this — see data-table.tsx. Keeping
 * it is deliberate: its test suite asserts behavioural contracts (the two
 * empty states, edit commit/discard, manual pagination trusting `pageCount`)
 * that this layer has to keep honouring, and those tests are only worth
 * anything while they run unmodified.
 */

export type DataGridDensity = 'compact' | 'standard' | 'comfortable';

export const DENSITY_PADDING: Record<DataGridDensity, string> = {
  compact: 'py-1',
  standard: 'py-2.5',
  comfortable: 'py-4',
};

export const DENSITY_LABEL: Record<DataGridDensity, string> = {
  compact: 'Compact',
  standard: 'Standard',
  comfortable: 'Comfortable',
};

export interface DataGridContextValue<TData extends RowData = RowData> {
  table: DataGridTableInstance<TData>;
  /**
   * Total rows behind the grid. In server mode `table` only holds the current
   * page, so this cannot be derived — it is what the footer counts.
   */
  recordCount: number;
  status: DataStatus;
  loading: boolean;
  loadError?: React.ReactNode | Error | boolean | null;
  onRetry?: () => void;
  emptyState?: React.ReactNode;
  /** True when rows exist but the active filters exclude all of them. */
  isFilteredEmpty: boolean;
  density: DataGridDensity;
  setDensity: (d: DataGridDensity) => void;
  /** Bounds the scroll area and makes the header sticky within it. */
  maxHeight?: string | number;
  /** Column id the toolbar search filters, if any. */
  searchKey?: string;
  /**
   * The scroll container, for anything that has to measure it — virtualization
   * in particular. Attached by DataGridScrollArea, so a virtualized table does
   * not need the consumer to thread a ref through.
   *
   * State, not a ref, deliberately: a ref's assignment does not re-render, so
   * a virtualizer reading `ref.current` during the first render sees null,
   * measures nothing, and is never told to look again. Holding the element in
   * state means the table re-renders the moment it exists.
   */
  scrollElement: HTMLDivElement | null;
  setScrollElement: (el: HTMLDivElement | null) => void;
}

// Deliberately not defaulted: a sub-component rendered outside DataGrid is a
// programming error, and a silent default would render an empty grid instead
// of saying so.
const DataGridContext = React.createContext<DataGridContextValue<never> | null>(null);

export function useDataGrid<TData extends RowData = RowData>(): DataGridContextValue<TData> {
  const ctx = React.useContext(DataGridContext);
  if (!ctx) {
    throw new Error(
      'useDataGrid must be used inside <DataGrid>. DataGridTable, DataGridToolbar and ' +
        'DataGridPagination all read the table instance from that context.'
    );
  }
  return ctx as unknown as DataGridContextValue<TData>;
}

export interface DataGridProps<TData extends RowData> {
  table: DataGridTableInstance<TData>;
  recordCount: number;
  /** Data has not arrived — the table renders skeleton rows. */
  loading?: boolean;
  /**
   * The fetch failed. Named `loadError`, not `error`, to stay clearly separate
   * from form validation's `error`/`invalid` — see data-state.tsx.
   */
  loadError?: React.ReactNode | Error | boolean | null;
  onRetry?: () => void;
  /** Replaces the built-in empty block entirely. */
  emptyState?: React.ReactNode;
  /** Initial row density. Uncontrolled; the toolbar's Density control drives it. */
  defaultDensity?: DataGridDensity;
  maxHeight?: string | number;
  searchKey?: string;
  className?: string;
  children?: React.ReactNode;
}

export function DataGrid<TData extends RowData>({
  table,
  recordCount,
  loading = false,
  loadError,
  onRetry,
  emptyState,
  defaultDensity = 'standard',
  maxHeight,
  searchKey,
  className,
  children,
}: DataGridProps<TData>) {
  const [density, setDensity] = React.useState<DataGridDensity>(defaultDensity);
  const [scrollElement, setScrollElement] = React.useState<HTMLDivElement | null>(null);

  const rows = table.getRowModel().rows;
  const columnFilters = table.state.columnFilters;

  // "Rows exist, the filters exclude them" is a different answer from "there
  // is nothing here", and the empty state says so. Derived rather than passed:
  // only the grid can see both the filter state and the row model.
  const isFilteredEmpty =
    rows.length === 0 && recordCount > 0 && columnFilters.some((f) => f.value !== undefined && f.value !== '');

  const status = resolveDataStatus(
    { loading, loadError, isEmpty: rows.length === 0 },
    'DataGrid'
  );

  const value = React.useMemo<DataGridContextValue<TData>>(
    () => ({
      table,
      recordCount,
      status,
      loading,
      loadError,
      onRetry,
      emptyState,
      isFilteredEmpty,
      density,
      setDensity,
      maxHeight,
      searchKey,
      scrollElement,
      setScrollElement,
    }),
    [table, recordCount, status, loading, loadError, onRetry, emptyState, isFilteredEmpty, density, maxHeight, searchKey, scrollElement]
  );

  return (
    <DataGridContext.Provider value={value as unknown as DataGridContextValue<never>}>
      <div className={cn('flex flex-col gap-3', className)}>{children}</div>
    </DataGridContext.Provider>
  );
}

export interface DataGridContainerProps {
  children: React.ReactNode;
  /** Draws the shell border. On by default. */
  border?: boolean;
  className?: string;
}

/**
 * The bordered, rounded shell around the table and its footer.
 *
 * `overflow-hidden` here is what clips the table's top corners to the shell's
 * radius. The scroll container is DataGridScrollArea *inside* this, so sticky
 * headers and pinned columns resolve against that and are unaffected — a
 * scrolling ancestor here would break both.
 */
export function DataGridContainer({ children, border = true, className }: DataGridContainerProps) {
  return (
    <div
      // rounded-xl (12px), matching Card — the two disagreed before, so a grid
      // and a card sitting side by side had visibly different corners.
      className={cn('overflow-hidden rounded-xl', border && 'border', className)}
      style={{
        // border.subtle, not border.default. This is the edge of a surface the
        // user reads inside, not the outline of a control they operate; the
        // mid-grey #878787 drew a cage around the data. In dark it is
        // translucent white, so it composites over the panel rather than
        // sitting on it as a hard grey line.
        borderColor: border ? 'var(--role-border-subtle)' : undefined,
        // surface.raised: identical to the page in light (the border does the
        // work), genuinely lighter in dark, so the grid reads as a panel on
        // the page instead of a hole cut into it.
        backgroundColor: 'var(--role-surface-raised)',
        // Level 1 only, and only a hint. shadows.ts is fixed black alpha with
        // no dark variant — a black shadow on a near-black page is invisible
        // rather than wrong, so dark leans on the border and the surface lift
        // instead. Deliberately not a deeper level: this is a panel, not a
        // dialog.
        boxShadow: border ? shadows[1].value : undefined,
      }}
    >
      {children}
    </div>
  );
}

export interface DataGridScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The scroll container. Bounded by the grid's `maxHeight`, which is also what
 * gives `position: sticky` on the header something to stick within — without a
 * bounded height the page scrolls instead of the table.
 */
export function DataGridScrollArea({ children, className }: DataGridScrollAreaProps) {
  const { maxHeight, setScrollElement } = useDataGrid();
  return (
    <div ref={setScrollElement} className={cn('overflow-auto', className)} style={{ maxHeight }}>
      {children}
    </div>
  );
}

export default DataGrid;
