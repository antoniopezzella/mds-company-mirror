"use client"

import * as React from 'react';
import type { RowData } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { resolveDataStatus, type DataStatus } from './data-state';
import type { DataGridCellError, DataGridTableInstance } from './data-grid-features';

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

/**
 * @deprecated since 0.9.0; remove after 0.10.0 / 2027-01-28.
 *             Use `DENSITY_VARS` — the grid no longer pads rows to a height;
 *             row and header heights are fixed per density.
 */
export const DENSITY_PADDING: Record<DataGridDensity, string> = {
  compact: 'py-1',
  standard: 'py-2.5',
  comfortable: 'py-4',
};

/**
 * Figma's `DENSITY` collection (MDS V3), as CSS custom properties.
 *
 * Emitted under the names Figma Dev Mode shows (`--mds-size-table-*`,
 * `--mds-space-table-*`), so a value copied from Dev Mode resolves in the
 * browser. The short `--dt-*` names the table's classes use are aliases of
 * them. Every value aliases a `Space-N` primitive and sits on the spacing
 * scale. Set on the grid root so the toolbar, header, rows and footer all read
 * the same mode.
 *
 *   --mds-size-table-row-height       --dt-row-h        (a minimum: a <td>'s height never clips)
 *   --mds-size-table-header-height    --dt-header-h
 *   --mds-space-table-cell-inset-x    --dt-inset-x      (cells AND the bars' sides)
 *   --mds-space-table-cell-inset-y    --dt-inset-y
 *   --mds-space-table-cell-gap        --dt-gap
 *   --mds-space-table-cell-gap-sm     --dt-gap-sm
 *   --mds-space-table-bar-inset-y     --dt-bar-inset-y  (toolbar / footer top+bottom)
 */
const DENSITY_TOKENS = {
  compact: { row: 40, header: 32, insetX: 12, insetY: 4, gap: 8, gapSm: 4, barInsetY: 4 },
  standard: { row: 48, header: 40, insetX: 16, insetY: 4, gap: 8, gapSm: 4, barInsetY: 8 },
  comfortable: { row: 64, header: 48, insetX: 20, insetY: 12, gap: 12, gapSm: 4, barInsetY: 12 },
} satisfies Record<DataGridDensity, Record<string, number>>;

function densityVars(t: (typeof DENSITY_TOKENS)[DataGridDensity]): Record<`--${string}`, string> {
  return {
    '--mds-size-table-row-height': `${t.row}px`,
    '--mds-size-table-header-height': `${t.header}px`,
    '--mds-space-table-cell-inset-x': `${t.insetX}px`,
    '--mds-space-table-cell-inset-y': `${t.insetY}px`,
    '--mds-space-table-cell-gap': `${t.gap}px`,
    '--mds-space-table-cell-gap-sm': `${t.gapSm}px`,
    '--mds-space-table-bar-inset-y': `${t.barInsetY}px`,
    '--dt-row-h': 'var(--mds-size-table-row-height)',
    '--dt-header-h': 'var(--mds-size-table-header-height)',
    '--dt-inset-x': 'var(--mds-space-table-cell-inset-x)',
    '--dt-inset-y': 'var(--mds-space-table-cell-inset-y)',
    '--dt-gap': 'var(--mds-space-table-cell-gap)',
    '--dt-gap-sm': 'var(--mds-space-table-cell-gap-sm)',
    '--dt-bar-inset-y': 'var(--mds-space-table-bar-inset-y)',
  };
}

export const DENSITY_VARS: Record<DataGridDensity, Record<`--${string}`, string>> = {
  compact: densityVars(DENSITY_TOKENS.compact),
  standard: densityVars(DENSITY_TOKENS.standard),
  comfortable: densityVars(DENSITY_TOKENS.comfortable),
};

/** Row height in px per density (the minimum) — the virtualiser's row estimate. */
export const DENSITY_ROW_HEIGHT: Record<DataGridDensity, number> = {
  compact: DENSITY_TOKENS.compact.row,
  standard: DENSITY_TOKENS.standard.row,
  comfortable: DENSITY_TOKENS.comfortable.row,
};

/** Header height in px per density — for offsets that must be numbers (sticky top). */
export const DENSITY_HEADER_HEIGHT: Record<DataGridDensity, number> = {
  compact: DENSITY_TOKENS.compact.header,
  standard: DENSITY_TOKENS.standard.header,
  comfortable: DENSITY_TOKENS.comfortable.header,
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
  /**
   * A refetch is in flight while the current rows stay on screen (hand-off
   * 5b#26): the body dims to 60% and the table is `aria-busy`, but nothing is
   * swapped for skeletons. Ignored while `loading`.
   */
  fetching: boolean;
  loadError?: React.ReactNode | Error | boolean | null;
  onRetry?: () => void;
  emptyState?: React.ReactNode;
  /** True when rows exist but the active filters exclude all of them. */
  isFilteredEmpty: boolean;
  density: DataGridDensity;
  setDensity: (d: DataGridDensity) => void;
  /** The density the grid started at — what the settings menu's "Reset table" returns to. */
  defaultDensity: DataGridDensity;
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
  /**
   * Cells holding rejected text (hand-off §5c). Lives here, not in the table,
   * because the toolbar's Notice slot summarises them — two parts reading one
   * list, rather than each keeping its own.
   */
  cellErrors: DataGridCellError[];
  setCellErrors: React.Dispatch<React.SetStateAction<DataGridCellError[]>>;
  /**
   * Hand-off §5c moment 3, "on save OR bulk edit": a paste / fill / cut that
   * leaves cells holding rejected text raises the Notice summary on its own —
   * no consumer wiring — and DataGridToolbar renders
   * `<DataGridValidationSummary />` while this is true and the consumer has
   * not passed a `notice` of its own. Clears itself when the last error is
   * fixed, and on the summary's close button. A single typed edit does not
   * raise it: moment 1's tooltip already says what is wrong, in place.
   */
  validationSummaryOpen: boolean;
  setValidationSummaryOpen: (open: boolean) => void;
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
   * New data is being fetched for rows already shown (server paging, sorting,
   * filtering). Keeps the current rows, dims the body to 60% and sets
   * `aria-busy` — use it instead of `loading` once a first page has arrived.
   */
  fetching?: boolean;
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
  /**
   * Cells whose text was rejected (hand-off §5c validation flow). Controlled
   * when given — pass the errors a server save returned; omit it and the grid
   * keeps its own list, seeded from `defaultCellErrors`.
   */
  cellErrors?: DataGridCellError[];
  defaultCellErrors?: DataGridCellError[];
  /** Every change to the list: a rejected edit or paste adds; a valid value clears. */
  onCellErrorsChange?: (errors: DataGridCellError[]) => void;
  className?: string;
  children?: React.ReactNode;
}

export function DataGrid<TData extends RowData>({
  table,
  recordCount,
  loading = false,
  fetching = false,
  loadError,
  onRetry,
  emptyState,
  defaultDensity = 'standard',
  maxHeight,
  searchKey,
  cellErrors: cellErrorsProp,
  defaultCellErrors,
  onCellErrorsChange,
  className,
  children,
}: DataGridProps<TData>) {
  const [density, setDensity] = React.useState<DataGridDensity>(defaultDensity);
  const [scrollElement, setScrollElement] = React.useState<HTMLDivElement | null>(null);
  const [ownCellErrors, setOwnCellErrors] = React.useState<DataGridCellError[]>(defaultCellErrors ?? []);
  const cellErrors = cellErrorsProp ?? ownCellErrors;
  const [validationSummaryRequested, setValidationSummaryOpen] = React.useState(false);
  // Derived, not reset in an effect: once every cell is fixed the summary is
  // gone, and the next single typed error must not bring it back.
  const validationSummaryOpen = validationSummaryRequested && cellErrors.length > 0;
  if (validationSummaryRequested && cellErrors.length === 0) setValidationSummaryOpen(false);
  // Read through refs so the setter keeps one identity: it is called from
  // event handlers, and a fresh function each render would re-memo the
  // whole context value.
  const cellErrorsRef = React.useRef(cellErrors);
  cellErrorsRef.current = cellErrors;
  const onCellErrorsChangeRef = React.useRef(onCellErrorsChange);
  onCellErrorsChangeRef.current = onCellErrorsChange;
  const controlled = cellErrorsProp !== undefined;
  const setCellErrors = React.useCallback<React.Dispatch<React.SetStateAction<DataGridCellError[]>>>(
    (update) => {
      const next = typeof update === 'function' ? update(cellErrorsRef.current) : update;
      if (next === cellErrorsRef.current) return;
      cellErrorsRef.current = next;
      if (!controlled) setOwnCellErrors(next);
      onCellErrorsChangeRef.current?.(next);
    },
    [controlled]
  );

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
      fetching: fetching && !loading,
      loadError,
      onRetry,
      emptyState,
      isFilteredEmpty,
      density,
      setDensity,
      defaultDensity,
      maxHeight,
      searchKey,
      scrollElement,
      setScrollElement,
      cellErrors,
      setCellErrors,
      validationSummaryOpen,
      setValidationSummaryOpen,
    }),
    [table, recordCount, status, loading, fetching, loadError, onRetry, emptyState, isFilteredEmpty, density, defaultDensity, maxHeight, searchKey, scrollElement, cellErrors, setCellErrors, validationSummaryOpen]
  );

  return (
    <DataGridContext.Provider value={value as unknown as DataGridContextValue<never>}>
      <div
        data-slot="data-grid"
        data-density={density}
        className={cn('flex flex-col gap-3', className)}
        style={DENSITY_VARS[density] as React.CSSProperties}
      >
        {children}
      </div>
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
 * The bordered, rounded shell — Figma `Data table`. Title bar, toolbar, grid
 * and footer all sit INSIDE it, as one surface.
 *
 * `overflow-hidden` here is what clips the table's top corners to the shell's
 * radius. The scroll container is DataGridScrollArea *inside* this, so sticky
 * headers and pinned columns resolve against that and are unaffected — a
 * scrolling ancestor here would break both. Menus and dialogs portal out, so
 * the clip never cuts them.
 */
export function DataGridContainer({ children, border = true, className }: DataGridContainerProps) {
  return (
    <div
      data-slot="data-grid-container"
      // Figma V3/Large = 8px. Was rounded-xl (12) to match Card; the V3 table
      // is a flatter surface than a card and the design says 8.
      className={cn('overflow-hidden rounded-lg', border && 'border', className)}
      style={{
        // border/subtle: the edge of a surface the user reads inside, not the
        // outline of a control they operate.
        borderColor: border ? 'var(--mds-color-border-subtle)' : undefined,
        // background/default — the same surface the rows paint, so a short
        // table has no seam between the last row and the footer. No shadow:
        // the V3 table is flat, the border carries the edge in both themes.
        backgroundColor: 'var(--mds-color-background-default)',
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
 *
 * `relative` makes it the containing block for the cells' absolutely
 * positioned descendants (`sr-only` labels, header buttons). Without it they
 * resolve against an ancestor outside the overflow, escape the clip, and on a
 * narrow screen push the PAGE sideways (~370px at 390 wide, 2026-11-03).
 *
 * It is also an inline-size container: pinned columns cap their width in
 * `cqw` of it (see `widthFor` in data-grid-table.tsx).
 */
export function DataGridScrollArea({ children, className }: DataGridScrollAreaProps) {
  const { maxHeight, setScrollElement } = useDataGrid();
  return (
    <div ref={setScrollElement} className={cn('relative overflow-auto [container-type:inline-size]', className)} style={{ maxHeight }}>
      {children}
    </div>
  );
}

export default DataGrid;
