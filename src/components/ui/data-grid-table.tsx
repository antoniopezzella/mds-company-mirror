"use client"

import * as React from 'react';
import { flexRender, type Row, type RowData } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import { cn } from '@/lib/utils';
import { useFormat } from '@/lib/format-context';
import type { Formattable, FormatKind } from '@/lib/format';
import { DataState } from './data-state';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import { Icon } from './icon';
import { Skeleton } from './skeleton';
import { Z_INDEX } from './z-index';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table-primitives';
import { DENSITY_HEADER_HEIGHT, DENSITY_ROW_HEIGHT, useDataGrid } from './data-grid';
import type {
  DataGridCellError,
  DataGridColumnMeta,
  DataGridFeatures,
  DataGridRowState,
  DataGridTableInstance,
  DataGridTableMeta,
} from './data-grid-features';
import {
  applyClear,
  applyFill,
  applyPaste,
  describeChanges,
  formatCellValue,
  invalidMessageFor,
  isColumnEditable,
  parseCellValue,
  selectOptionsFor,
  selectionToTsv,
  type CellsChangeDetails,
} from './data-grid-cell-selection';
import { DataGridCellEditor, type DataGridCommitReason } from './data-grid-cell-edit';
import { DataGridCellNumber, DataGridGroupCell } from './data-grid-cells';
import { DataGridDetailContext } from './data-grid-rows';

/** Payload for an inline cell edit. */

/** A column's human name: its string header, else its id. */
export function columnLabel(column: {
  id: string;
  columnDef: { header?: unknown; meta?: { label?: string } };
}): string {
  const header = column.columnDef.header;
  return typeof header === 'string' ? header : (column.columnDef.meta?.label ?? column.id);
}

/**
 * Which side the header menu's "Pin column" pins to. Hand-off 5b#1/#2: data
 * columns pin to the start; the end is for the Actions column only
 * (`createActionsColumn`'s id), with its edge on the left.
 */
function pinSideFor(column: { id: string }): 'start' | 'end' {
  return column.id === 'actions' ? 'end' : 'start';
}

/**
 * A column's place within its own pinned region (start / centre / end).
 *
 * Reorder happens WITHIN a region. A start-pinned column always renders before the centre ones no matter what
 * columnOrder says, so treating the visible leaves as one flat list means
 * "Move left" on the first centre column reorders the array, changes nothing
 * on screen, and still announces a successful move. The announcement would be
 * lying. v9 exposes per-region indices for exactly this. Shared by the header
 * menu and the toolbar's Table settings menu, which must agree.
 */
export function columnRegionPosition<TData extends RowData>(
  table: DataGridTableInstance<TData>,
  columnId: string
): { siblings: string[]; index: number } {
  const region = table.getColumn(columnId)?.getIsPinned();
  const regionColumns =
    region === 'start'
      ? table.getStartVisibleLeafColumns()
      : region === 'end'
        ? table.getEndVisibleLeafColumns()
        : table.getCenterVisibleLeafColumns();
  const siblings = regionColumns.map((c) => c.id);
  return { siblings, index: siblings.indexOf(columnId) };
}

/**
 * Moves a column one place within its region; returns its new 1-based
 * position and the region size, or null when it cannot move.
 */
export function moveColumnInRegion<TData extends RowData>(
  table: DataGridTableInstance<TData>,
  columnId: string,
  delta: -1 | 1
): { position: number; total: number } | null {
  const { siblings, index: from } = columnRegionPosition(table, columnId);
  const to = from + delta;
  if (from < 0 || to < 0 || to >= siblings.length) return null;

  // columnOrder is a FULL ordering and starts empty (meaning "definition
  // order"). Seed it from the current leaf order, or the first move drops
  // every column not named in it.
  const next = table.getAllLeafColumns().map((c) => c.id);
  const fromAll = next.indexOf(columnId);
  const toAll = next.indexOf(siblings[to]);
  next.splice(fromAll, 1);
  next.splice(toAll, 0, columnId);
  table.setColumnOrder(next);
  return { position: to + 1, total: siblings.length };
}

export interface CellEditParams<TData> {
  rowId: string;
  rowIndex: number;
  columnId: string;
  /** The edited text. Cast/parse it in the handler — the input is always a string. */
  value: string;
  previousValue: unknown;
  row: TData;
}

type DetailPhase = 'closed' | 'entering' | 'open' | 'closing';

/** Longest computed transition-duration on `el`, in ms (0 when none runs). */
function transitionMs(el: HTMLElement | null): number {
  if (!el || typeof window === 'undefined') return 0;
  const style = window.getComputedStyle(el);
  if (!style.transitionProperty || style.transitionProperty === 'none') return 0;
  return Math.max(
    0,
    ...(style.transitionDuration || '0s')
      .split(',')
      .map((d) => (d.trim().endsWith('ms') ? parseFloat(d) : parseFloat(d) * 1000) || 0)
  );
}

/**
 * The Detail row under an expanded row. Hand-off §5 Motion: "Detail row |
 * open or close | height plus opacity | 150 ms". A <tr> cannot animate its
 * height, so the cell holds a one-track grid that runs 0fr ↔ 1fr with the
 * opacity. On close the row stays mounted until that transition ends; where
 * no transition runs (prefers-reduced-motion, or no stylesheet) it goes in
 * the same commit. A row that is already open on mount does not animate.
 */
function DataGridDetailRow({
  open,
  render,
  id,
  colSpan,
  style,
  dividerColor,
}: {
  open: boolean;
  render: () => React.ReactNode;
  id: string;
  colSpan: number;
  style: React.CSSProperties;
  dividerColor: string;
}) {
  const [phase, setPhase] = React.useState<DetailPhase>(open ? 'open' : 'closed');
  const [prevOpen, setPrevOpen] = React.useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    setPhase(open ? 'entering' : 'closing');
  }
  const motionRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (phase === 'entering') {
      // Flush the collapsed style so the switch to 1fr transitions from it.
      void motionRef.current?.offsetHeight;
      setPhase('open');
      return;
    }
    if (phase !== 'closing') return;
    const ms = transitionMs(motionRef.current);
    if (ms === 0) {
      setPhase('closed');
      return;
    }
    // transitionend is the signal; the timer covers one that never fires.
    const timer = window.setTimeout(() => setPhase('closed'), ms + 50);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === 'closed') return null;
  const content = render();
  if (content === null || content === undefined) return null;
  const shown = phase === 'open';
  return (
    <TableRow id={id} data-detail-row="" data-state={shown ? 'open' : 'closed'} style={style}>
      <TableCell
        colSpan={colSpan}
        className="p-0 align-top"
        // Figma Detail row: the divider is drawn INSIDE the row's bottom
        // padding, not added below it — so the row is exactly its
        // content's height (218 for the checklist), not one more.
        style={{ boxShadow: `inset 0 -1px 0 0 ${dividerColor}` }}
      >
        <div
          ref={motionRef}
          data-slot="data-grid-detail-motion"
          className="grid transition-[grid-template-rows,opacity] duration-150 ease-out motion-reduce:transition-none motion-reduce:duration-0"
          style={{ gridTemplateRows: shown ? '1fr' : '0fr', opacity: shown ? 1 : 0 }}
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget && phase === 'closing') setPhase('closed');
          }}
        >
          {/* Clips only while animating, so focus rings inside an open
              panel are never cut off. */}
          <div className={cn('min-h-0', !shown && 'overflow-hidden')}>{content}</div>
        </div>
      </TableCell>
    </TableRow>
  );
}

export interface DataGridTableProps<TData extends RowData> {
  /** Skeleton rows to show while loading. Defaults to the current page size. */
  loadingRowCount?: number;
  /**
   * Adds "Move left" / "Move right" to each column menu.
   *
   * Separate from a pointer drag deliberately: the keyboard path is the one
   * that has to exist, and shipping it first means the feature is never
   * briefly mouse-only.
   */
  enableColumnReorder?: boolean;
  /**
   * Renders a master-detail panel under an expanded row.
   *
   * Returns the panel's content; the grid supplies the `<TableRow>`/`<TableCell colSpan>`
   * around it. Pair with `createExpandColumn()` for the toggle.
   *
   * Independent of sub-rows: a row can have `subRows` (rendered as ordinary
   * indented rows), a detail panel, or both.
   *
   * Note `TData` is inferred from props, not from the DataGrid context React
   * cannot flow a generic through context — so write
   * `<DataGridTable<Policy> renderDetail={…} />` or type the parameter, or
   * `row.original` lands as the unhelpful `RowData`.
   */
  renderDetail?: (row: Row<DataGridFeatures, TData>) => React.ReactNode;
  /**
   * Renders only the rows in view.
   *
   * Requires `maxHeight` on the DataGrid — the virtualizer measures the scroll
   * container, and without a bounded one every row is "in view".
   *
   * Implemented with **spacer rows, not a transform**. A `transform` on any
   * ancestor creates a containing block, which silently kills `position:
   * sticky` on the header and on every pinned column — the single most likely
   * way to break this table. Two zero-content `<TableRow>`s holding the height above
   * and below the window keep the layout honest and the table semantic.
   */
  enableVirtualization?: boolean;
  /**
   * Estimated row height in px. Rows are measured after first paint.
   * Defaults to the density's row height (40 / 48 / 64).
   */
  estimateRowSize?: number;
  /** Rows rendered beyond the viewport on each side. */
  overscan?: number;
  /**
   * Renders a `<TableFooter>` from each column's `footer` definition — totals,
   * counts, whatever the column says.
   *
   * Footer content is the consumer's, computed from
   * `table.getFilteredRowModel().rows` so it follows the filters rather than
   * describing data the user cannot see. `<TableFooter>` sits after `<TableBody>` in
   * the DOM regardless of where it is written, which is the correct reading
   * order for a summary.
   */
  showFooter?: boolean;
  /** Sticks the footer to the bottom of the scroll area. Needs `maxHeight`. */
  stickyFooter?: boolean;
  /**
   * Zebra striping. Alternate rows take a subtle background.
   *
   * Ported from `table.tsx`'s `variant="striped"` — one of the capabilities
   * that has to exist here before that component can be deprecated.
   */
  striped?: boolean;
  /**
   * A `<TableCaption>` describing the table.
   *
   * The accessible name for the whole table, and the only one it can have:
   * `aria-label` on a `<table>` is far less reliably announced. `table.tsx`
   * had this; the grid did not, so a grid had no name at all.
   */
  caption?: string;
  /**
   * Spreadsheet mode: cell and range selection, keyboard grid navigation, and
   * clipboard.
   *
   * Requires `enableCellSelection` on the table instance — this prop controls
   * the *rendering and interaction*, TanStack owns the selection model.
   *
   * Switches the table's ARIA from `table` to `grid`. That is deliberate and
   * not cosmetic: `role="grid"` promises arrow-key navigation, so it is only
   * correct once that navigation exists. A static table must stay a table.
   */
  enableCellSelection?: boolean;
  /**
   * Receives every batch of cell changes — edit, paste, cut, clear, fill —
   * with the ones that could not be applied.
   *
   * The grid holds no copy of the data, so this is a report, not a mutation:
   * the handler owns persisting it. `rejected` is the half most grids omit;
   * without it a paste across a read-only column looks like it worked.
   */
  onCellsChange?: (details: CellsChangeDetails<TData>) => void;
  /**
   * Fires when a row is activated — click, or Enter/Space on a focused row.
   *
   * Deliberately inert in cell-selection mode: there, a click sets the
   * selection anchor and Enter opens the editor, so a row-level handler would
   * fight both. A grid is navigated by cell; a table is navigated by row.
   *
   * Clicks originating inside an interactive cell (a button, link, input or
   * checkbox) are ignored — otherwise ticking a row's checkbox would also
   * "open" the row.
   */
  onRowClick?: (row: Row<DataGridFeatures, TData>) => void;
  /**
   * Shows the draggable fill square at the selection's bottom-right corner.
   *
   * Purely an affordance: Ctrl/Cmd+D and Ctrl/Cmd+R already fill, so the
   * capability is keyboard-complete without it. Building the keyboard path
   * first is what stops the feature ever being mouse-only — which axe would
   * pass and WCAG 2.1.1 would not.
   */
  enableFillHandle?: boolean;
  /**
   * Commits an inline edit. Its presence is what enables editing at all — a
   * column additionally needs `meta: { editable: true }`.
   */
  onCellEdit?: (params: CellEditParams<TData>) => void;
  className?: string;
}

/** How long a saved cell shows Figma's Success state before returning to None. */
export const SUCCESS_MS = 2000;

type CellState = 'editing' | 'error' | 'success';

/**
 * Figma `Data table/Cell` Cell state (17228:2516; hand-off §4.6): the fill and
 * the 1px inside stroke — the divider takes the stroke's colour.
 */
const CELL_STATE: Record<CellState, { fill: string; stroke: string }> = {
  editing: { fill: 'var(--mds-color-background-input-default)', stroke: 'var(--mds-color-border-input-hover)' },
  error: { fill: 'var(--mds-color-background-critical-subtle)', stroke: 'var(--mds-color-border-critical-default)' },
  success: { fill: 'var(--mds-color-background-success-subtle)', stroke: 'var(--mds-color-border-success-default)' },
};

/**
 * The content row of a cell in a state: the value (or editor), then the
 * 16px status icon (Error = alert/critical-filled, Success = success-filled)
 * 8px after it, then `trailing` (a dropdown's arrow), as `Content/Editable`
 * lays them out — and, for Error, the Error tooltip.
 *
 * Tooltip (Figma 17245:97636, `Error tooltip`): 3px in from the cell's end
 * edge, 5px under it, its 12×6 caret top-right; p 8, r 4, max-w 288,
 * background/default, Elevation/Small/Bottom (= `shadow-md`). `placement`
 * "above" flips it over the cell — the last visible row, where "below" would
 * be clipped by the scroll area (hand-off §5c). It is always in the DOM when
 * there is a message, so `aria-describedby` resolves; `messageOpen` only
 * shows or hides it. The icons are decorative: aria-invalid and the tooltip
 * carry the meaning.
 */
function CellStateFrame({
  state,
  tooltipId,
  message,
  messageOpen = true,
  placement = 'below',
  hoverable = false,
  trailing,
  children,
}: {
  state?: CellState;
  tooltipId?: string;
  message?: string;
  messageOpen?: boolean;
  placement?: 'below' | 'above';
  /**
   * The message was opened by hovering the cell (moment 2): it must be
   * hoverable itself (WCAG 1.4.13). While typing (moment 1) it is not — it
   * lets clicks through to the cell under it, which it covers.
   */
  hoverable?: boolean;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  const above = placement === 'above';
  return (
    <div className="flex min-w-0 items-center gap-[var(--dt-gap)]">
      <div className="min-w-0 flex-1">{children}</div>
      {state === 'error' && (
        <Icon pseudo name="cancel" fill size={16} className="shrink-0 text-[var(--mds-color-foreground-critical-default)]" />
      )}
      {state === 'success' && (
        <Icon pseudo name="check_circle" fill size={16} className="shrink-0 text-[var(--mds-color-foreground-success-default)]" />
      )}
      {trailing}
      {state === 'error' && message && (
        <div
          id={tooltipId}
          role="tooltip"
          hidden={!messageOpen}
          data-placement={placement}
          className={cn(
            'absolute end-0.75 w-max max-w-72 rounded-sm p-2 text-left text-sm font-normal shadow-md',
            above ? 'bottom-[calc(100%+5px)]' : 'top-[calc(100%+5px)]',
            !hoverable && 'pointer-events-none',
            'bg-[var(--mds-color-background-default)] text-[var(--mds-color-foreground-primary-default)]'
          )}
          style={{ zIndex: Z_INDEX.stickyRaised }}
        >
          {message}
          {/* The caret, pointing back at the cell's end edge. */}
          <svg
            aria-hidden
            width="12"
            height="6"
            viewBox="0 0 12 6"
            className={cn('absolute end-1.5', above ? '-bottom-1.5 rotate-180' : '-top-1.5')}
          >
            <path d="M0 6 6 0l6 6z" fill="currentColor" className="text-[var(--mds-color-background-default)]" />
          </svg>
        </div>
      )}
    </div>
  );
}

/** A DOM-id-safe token for a cell, for per-cell tooltip ids. */
const idSafe = (value: string) => value.replace(/[^\w-]/g, '_');

/** Hand-off §6 Loading: skeleton rows follow the page size, up to this many. */
/**
 * A pre-formatted quantity: money, a percentage, a signed or grouped or
 * decimal number, optionally abbreviated — "$12,400", "€1.2M", "62.5%",
 * "−3", "1,024", "0.75", "(1,200)". It needs at least ONE such marker; a bare
 * run of digits is not enough (see `resolveAlign`).
 */
const QUANTITY = /^\(?[-+−]?\s?(?:[$€£¥₹]|USD|EUR|GBP)?\s?[-+−]?(?:\d{1,3}(?:[,\s.\u202f]\d{3})+|\d+)(?:[.,]\d+)?\s?(?:[kKmMbB]|bn|%|pp|bps|pts)?\s?(?:USD|EUR|GBP)?\)?$/;
const QUANTITY_MARKER = /[$€£¥₹%,.()+\-−]|USD|EUR|GBP|\d[kKmMbB]$|bn$|pp$|bps$|pts$/;
function looksLikeQuantity(value: string) {
  const v = value.trim();
  return QUANTITY.test(v) && QUANTITY_MARKER.test(v) && !/^\d{4}-\d{2}/.test(v);
}

export const MAX_SKELETON_ROWS = 10;

/**
 * The most of the table's visible width (in `cqw`) that a region's pinned data
 * columns may take together. Below that the scrolling columns would have no
 * room to pass under them on a phone.
 */
const PINNED_MAX_SHARE = 50;

/**
 * The row hover layer's colour, as a registered `<color>` custom property so
 * it can transition (an unregistered one swaps instantly, and a gradient never
 * interpolates). Registered once per document; where `CSS.registerProperty`
 * is missing (jsdom, old engines) the variable still paints, just without the
 * fade.
 */
const ROW_HOVER_VAR = '--dt-row-hover';
if (typeof window !== 'undefined' && typeof CSS !== 'undefined' && 'registerProperty' in CSS) {
  try {
    CSS.registerProperty({ name: ROW_HOVER_VAR, syntax: '<color>', inherits: true, initialValue: 'transparent' });
  } catch {
    // Already registered (HMR, a second copy of the package) — nothing to do.
  }
}

/**
 * The `<table>` itself: header (sort menu, resize handle, pinning), body
 * (rows, skeletons, the four data states) — everything between the toolbar and
 * the pagination footer.
 *
 * Extracted from `data-table.tsx` unchanged in behaviour. Every decision
 * recorded in the comments below survived the move deliberately; they are all
 * things that were got wrong once.
 */
function DataGridTableInner<TData extends RowData>(
  {
    loadingRowCount,
    enableColumnReorder = false,
    renderDetail,
    enableVirtualization = false,
    estimateRowSize: estimateRowSizeProp,
    overscan = 8,
    showFooter = false,
    stickyFooter = false,
    striped = false,
    caption,
    enableCellSelection = false,
    enableFillHandle = false,
    onCellsChange,
    onRowClick,
    onCellEdit,
    className,
  }: DataGridTableProps<TData>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  const {
    table,
    scrollElement,
    status,
    loading,
    fetching,
    loadError,
    onRetry,
    emptyState,
    isFilteredEmpty,
    density,
    maxHeight,
    cellErrors,
    setCellErrors,
    setValidationSummaryOpen,
  } = useDataGrid<TData>();
  const estimateRowSize = estimateRowSizeProp ?? DENSITY_ROW_HEIGHT[density];

  // Formatters pre-bound to the ambient locale/currency. useFormat falls back
  // to en-US/USD defaults when no FormatProvider is mounted, so this is safe
  // for a library consumer who never adds one — see format-context.tsx.
  const fmt = useFormat();

  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);
  // The row the pointer just left keeps its (now transparent) hover layer so
  // it can fade OUT as well as in — see ROW_HOVER_VAR. Only that one row: a
  // background-image on every row would leave axe's contrast check unable to
  // compute a background ("incomplete") across the whole table.
  const [hoverTrail, setHoverTrail] = React.useState<string | null>(null);
  // Prefix for detail-row ids, so an expand toggle's aria-controls resolves
  // inside THIS table even with two grids on a page.
  const detailIdPrefix = React.useId();
  const detailIdFor = React.useCallback(
    (rowId: string) => `${detailIdPrefix}-detail-${idSafe(rowId)}`,
    [detailIdPrefix]
  );
  // Reorder happens in a menu that closes on select, so the move is invisible
  // to a screen reader without this. One polite region for the whole table,
  // not one per column — per-element live regions produce an announcement
  // storm the moment two change together.
  const [announcement, setAnnouncement] = React.useState('');
  const [editingCell, setEditingCell] = React.useState<{ rowId: string; columnId: string } | null>(null);
  const [draft, setDraft] = React.useState('');
  // Set when `parse` rejects a commit: the editor stays open, marked invalid,
  // rather than discarding what the user typed.
  const [editInvalid, setEditInvalid] = React.useState(false);
  // The rejected text's message, for the Error tooltip.
  const [editMessage, setEditMessage] = React.useState('');
  // The tooltip is showing while editing. Escape hides it without leaving the
  // cell (hand-off §5c, moment 1); the next rejection shows it again.
  const [editMessageOpen, setEditMessageOpen] = React.useState(true);
  // The edit began from a typed character: seed it, do not select it.
  const [editSeeded, setEditSeeded] = React.useState(false);
  // A select editor's list is open — the cell's arrow points up.
  const [editListOpen, setEditListOpen] = React.useState(false);
  // The error cell under the pointer or holding focus: its tooltip shows
  // only then (moment 2), never on its own over the next row.
  const [hoverErrorCell, setHoverErrorCell] = React.useState<string | null>(null);
  const [focusErrorCell, setFocusErrorCell] = React.useState<string | null>(null);
  // Figma Cell state Success: shown for about 2 s after a save, then back to
  // None (hand-off §5, editable cell). One cell at a time — the last save.
  const [successCell, setSuccessCell] = React.useState<string | null>(null);
  const successTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(() => () => {
    if (successTimer.current) clearTimeout(successTimer.current);
  }, []);
  const flashSuccess = (key: string) => {
    if (successTimer.current) clearTimeout(successTimer.current);
    setSuccessCell(key);
    successTimer.current = setTimeout(() => setSuccessCell(null), SUCCESS_MS);
  };
  const errorTipId = React.useId();
  const errorFor = (rowId: string, columnId: string): DataGridCellError | undefined =>
    cellErrors.find((e) => e.rowId === rowId && e.columnId === columnId);
  // Writes the outcome of a change batch into the error list: a cell that
  // took a value is no longer in error; text a column's parse rejected
  // (typed or pasted) is kept, red, until fixed — hand-off §5c "invalid cells
  // stay red".
  const recordValidation = (
    accepted: { rowId: string; columnId: string }[],
    rejected: DataGridCellError[]
  ) => {
    if (!accepted.length && !rejected.length) return;
    const touched = new Set([...accepted, ...rejected].map((c) => `${c.rowId}\u0000${c.columnId}`));
    setCellErrors((prev) => {
      const kept = prev.filter((e) => !touched.has(`${e.rowId}\u0000${e.columnId}`));
      if (kept.length === prev.length && !rejected.length) return prev;
      return [...kept, ...rejected];
    });
  };
  // A paste / fill / clear batch: written cells leave the error list; text
  // the column rejected as invalid joins it (read-only refusals do not — the
  // cell never accepted input, so there is nothing to fix there).
  const recordRejections = (details: CellsChangeDetails<TData>) => {
    const invalid = details.rejected.filter((r) => r.reason === 'invalid');
    // A bulk edit (paste / fill / cut) that left invalid cells raises the
    // Notice summary — §5c moment 3, "on save or bulk edit". The cells it
    // touched may be off screen, so the count and "Go to first error" are
    // how the user finds them.
    if (details.source !== 'edit' && invalid.length) setValidationSummaryOpen(true);
    recordValidation(
      details.changes,
      invalid
        .map((r) => {
          const column = table.getColumn(r.columnId);
          return { ...r, message: column ? invalidMessageFor(column, r.raw) : '' };
        })
        .map(({ rowId, columnId, raw, message }) => ({ rowId, columnId, raw, message }))
    );
  };
  const getRowLabel = (table.options.meta as DataGridTableMeta | undefined)?.getRowLabel;
  // Hand-off §9: "Label the editor with the column header and row name".
  // The row's name is `getRowLabel`, else its first text value.
  const rowLabelOf = (row: (typeof rows)[number]): string => {
    if (getRowLabel) return getRowLabel(row.original);
    for (const c of row.getVisibleCells()) {
      const v = c.getValue();
      if (typeof v === 'string' && v.trim()) return v;
    }
    return `row ${row.index + 1}`;
  };
  // Enter moves down, Tab right, Shift+Tab left (hand-off §5): the grid's
  // focused cell moves, and the cell's own ref pulls DOM focus after it.
  // An edit that ended by BLUR ended because the user went somewhere else —
  // the toolbar, another app. The focused cell's ref must not pull focus back
  // into the grid (and, for an Error cell, open its tooltip over the next
  // row: §5c moment 2 is "after leaving").
  const skipRefocus = React.useRef(false);
  const moveAfterCommit = (rowId: string, columnId: string, reason: DataGridCommitReason) => {
    if (reason === 'blur') skipRefocus.current = true;
    if (reason === 'blur' || reason === 'option') {
      if (reason === 'option') table.setFocusedCell(rowId, columnId);
      return;
    }
    const rowIds = centerRows.map((r) => r.id);
    const colIds = table.getVisibleLeafColumns().map((c) => c.id);
    let r = rowIds.indexOf(rowId);
    let c = colIds.indexOf(columnId);
    if (reason === 'enter') r = Math.min(rowIds.length - 1, r + 1);
    else if (reason === 'tab') c = Math.min(colIds.length - 1, c + 1);
    else c = Math.max(0, c - 1);
    if (r < 0 || c < 0) return;
    table.setFocusedCell(rowIds[r], colIds[c]);
  };
  // Opens the grid-mode editor. A cell already in error reopens on its
  // rejected text, still marked, so the user fixes rather than retypes.
  const openEditor = (
    cell: ReturnType<(typeof rows)[number]['getVisibleCells']>[number],
    seed?: string
  ) => {
    const existing = errorFor(cell.row.id, cell.column.id);
    setDraft(seed ?? existing?.raw ?? formatCellValue(cell.column, cell.getValue(), cell.row.original));
    setEditSeeded(seed !== undefined);
    setEditInvalid(!!existing && seed === undefined);
    setEditMessage(existing?.message ?? '');
    setEditMessageOpen(true);
    setEditingCell({ rowId: cell.row.id, columnId: cell.column.id });
  };
  const getRowState = (table.options.meta as DataGridTableMeta | undefined)?.getRowState;

  const enableColumnResizing = !!table.options.enableColumnResizing;
  const enableColumnPinning = !!table.options.enableColumnPinning;
  const sorting = table.state.sorting;
  const rows = table.getRowModel().rows;
  // Row pinning splits the row model into three regions. `getTopRows()` is
  // empty unless the feature is on, so this costs nothing when it is off.
  const topRows = table.getTopRows();
  const bottomRows = table.getBottomRows();
  const hasPinnedRows = topRows.length > 0 || bottomRows.length > 0;
  const centerRows = hasPinnedRows ? table.getCenterRows() : rows;
  const visibleColumnCount = table.getVisibleLeafColumns().length;
  // Header rows come first in aria-rowindex / aria-rowcount (grouped headers
  // are two rows, not one).
  const headerRowCount = table.getHeaderGroups().length;

  // Called in the render body, never memoised: getRoleColor reads the `dark`
  // class off documentElement at call time, so a value cached in a useMemo
  // with an empty dep array freezes at whatever mode first rendered.
  // border.subtle, not border.default. This colour is drawn once per row — at
  // 40 rows, #878787 stops reading as structure and starts reading as a cage.
  // border.default remains correct for the edge of a control; these are rules
  // separating content the user is already inside. In dark it is translucent
  // white, so it composites over the row beneath rather than sitting on it.
  // MDS V3 (Figma "Table New Component"): every colour below is the variable
  // the design binds, through the Figma-named `--mds-color-*` layer, so light
  // and dark are the designer's values rather than a role that approximates
  // them. Row states paint the ROW; cells are transparent over it (Figma
  // `Cell`, Row state = Transparent) — except pinned cells, which must repaint
  // the row because sticky detaches them from it.
  //
  // border/subtle for the row dividers — drawn once per row, so the
  // lighter rule reads as structure rather than a cage.
  const borderColor = 'var(--mds-color-border-subtle)';
  // Figma `Cell` Divider: a 1px rule inside the cell's bottom edge.
  const cellDivider = `inset 0 -1px 0 0 ${borderColor}`;
  // border/default for the pinned edge — deliberately darker than a divider:
  // it marks where content starts scrolling under the column.
  const pinnedEdgeColor = 'var(--mds-color-border-default)';
  const textColor = 'var(--mds-color-foreground-primary-default)';
  // Selection indicators (resize bar, range outline, fill handle) use
  // background/primary; text and icons use foreground/primary.
  const activeColor = 'var(--mds-color-background-primary-default)';
  const rowBg = 'var(--mds-color-background-default)';
  // background/hover is opaque light blue in light but WHITE AT 5% in dark —
  // so it is layered over the row surface (as Figma stacks it), never used as
  // the fill on its own, or a dark hovered row would go transparent.
  // Painted through ROW_HOVER_VAR (a registered <color>) rather than the token
  // directly, so the layer can fade 100 ms ease-out (hand-off §5 Motion) — a
  // gradient itself cannot transition, a registered custom property can.
  const hoverLayer = `linear-gradient(var(${ROW_HOVER_VAR}), var(${ROW_HOVER_VAR}))`;
  // background/selected, the design's value (#ceecff light). This was the
  // lighter selected.subtle plus a 3px edge bar, chosen because a success
  // badge on #ceecff measured 4.16:1. The V3 design drops the bar and uses the
  // full tint; contrast of in-row content on it is checked by axe on the
  // template stories — see docs/tasks/data-table-v3.md.
  const selectedBg = 'var(--mds-color-background-selected)';
  // The header band and banded rows: background/neutral/subtle.
  const headerBg = 'var(--mds-color-background-neutral-subtle)';
  const stripeBg = 'var(--mds-color-background-neutral-subtle)';
  const selectionBg = 'var(--mds-color-background-selected)';
  // Figma Row State=Error.
  const errorRowBg = 'var(--mds-color-background-critical-subtle)';

  // Before anything is focused, TanStack reports tabIndex -1 for every cell —
  // correct for "there is no roving position yet", but it leaves the grid
  // unreachable by Tab. APG requires the grid to be in the tab order from the
  // start, so the first cell takes the stop until focus moves.
  const hasFocusedCell = enableCellSelection && !!table.getFocusedCell();
  const selectionEdge = 'var(--mds-color-background-primary-default)';

  /**
   * The range outline, drawn with box-shadow insets on the edge cells.
   *
   * Borders would shift the layout by a pixel per edge as the selection
   * moves; insets paint inside the cell and cost nothing. `getSelectionEdges`
   * tells us which sides of a cell are on the boundary, so a multi-cell range
   * reads as one rectangle rather than a grid of outlined cells.
   */
  const selectionOutline = (cell: {
    getIsSelected: () => boolean;
    getSelectionEdges: () => { top: boolean; right: boolean; bottom: boolean; left: boolean };
  }): React.CSSProperties => {
    if (!cell.getIsSelected()) return {};
    const e = cell.getSelectionEdges();
    const shadows = [
      e.top && `inset 0 1px 0 0 ${selectionEdge}`,
      e.right && `inset -1px 0 0 0 ${selectionEdge}`,
      e.bottom && `inset 0 -1px 0 0 ${selectionEdge}`,
      e.left && `inset 1px 0 0 0 ${selectionEdge}`,
    ].filter(Boolean);
    return shadows.length ? { boxShadow: shadows.join(', ') } : {};
  };

  // Sticky cells detach from the row's own background during scroll, so a
  // pinned cell must paint its own (it won't inherit through from the <TableRow>).
  // `paint` is the row's full background — colour AND the hover layer — so a
  // hovered row stays one colour across the pinned edge.
  const getPinnedCellStyle = (
    column: {
      id: string;
      columnDef: { size?: number; meta?: unknown };
      getSize: () => number;
      getIsPinned: () => false | 'start' | 'end';
      getIsLastColumn?: (position?: 'start' | 'end' | 'center') => boolean;
      getIsFirstColumn?: (position?: 'start' | 'end' | 'center') => boolean;
    },
    paint: React.CSSProperties,
    extra?: React.CSSProperties
  ): React.CSSProperties => {
    const pinned = column.getIsPinned();
    if (!pinned) return extra ?? {};
    // Figma: a 1px border/default rule INSIDE the cell's inner edge, no
    // shadow — right of a start-pinned region, left of an end-pinned one.
    // Drawn ONCE per region, on the column that meets the scrolling area:
    // the select checkbox and the pinned Name sit in one unbroken area
    // (Directory 17992:15767 — the only vertical rule is after Name).
    const atStartEdge = column.getIsLastColumn?.('start') ?? true;
    const atEndEdge = column.getIsFirstColumn?.('end') ?? true;
    // `width` on a cell is only a hint to auto layout; min AND max pin it, so
    // the offsets built from it (`pinnedOffset`) match what is drawn.
    const w = widthFor(column);
    return {
      position: 'sticky',
      ...(w != null ? { minWidth: w, maxWidth: w } : null),
      ...(pinned === 'start'
        ? { left: pinnedOffset(column, 'start'), ...(atStartEdge ? { boxShadow: `inset -1px 0 0 0 ${pinnedEdgeColor}` } : null) }
        : { right: pinnedOffset(column, 'end'), ...(atEndEdge ? { boxShadow: `inset 1px 0 0 0 ${pinnedEdgeColor}` } : null) }),
      zIndex: Z_INDEX.sticky,
      ...paint,
      ...extra,
    };
  };

  /**
   * The APG Data Grid keyboard map.
   *
   * Lives on the cell rather than the table so it only fires while focus is
   * genuinely inside the grid — a table-level listener would swallow arrow
   * keys typed into the toolbar search.
   */
  const onGridKeyDown = (
    e: React.KeyboardEvent<HTMLTableCellElement>,
    cell: ReturnType<(typeof rows)[number]['getVisibleCells']>[number]
  ) => {
    if (!enableCellSelection) return;
    const mod = e.metaKey || e.ctrlKey;

    const report = (details: CellsChangeDetails<TData>) => {
      onCellsChange?.(details);
      setAnnouncement(describeChanges(details));
      recordRejections(details);
    };

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight': {
        const dir = e.key.replace('Arrow', '').toLowerCase() as 'up' | 'down' | 'left' | 'right';
        e.preventDefault();
        // Shift extends the range; plain arrows move the single focused cell.
        if (e.shiftKey) table.extendCellSelection(dir);
        else table.moveCellSelection(dir);
        return;
      }
      case 'Home':
      case 'End': {
        // Row start/end, or grid start/end with the modifier. Expressed as
        // repeated single moves because TanStack's API is directional — there
        // is no "move to edge". Bounded by the counts, so it stops rather
        // than looping.
        e.preventDefault();
        const horizontal = e.key === 'Home' ? 'left' : 'right';
        for (let i = 0; i < visibleColumnCount; i++) {
          if (e.shiftKey) table.extendCellSelection(horizontal);
          else table.moveCellSelection(horizontal);
        }
        if (mod) {
          const vertical = e.key === 'Home' ? 'up' : 'down';
          for (let i = 0; i < centerRows.length; i++) {
            if (e.shiftKey) table.extendCellSelection(vertical);
            else table.moveCellSelection(vertical);
          }
        }
        return;
      }
      case 'PageUp':
      case 'PageDown': {
        e.preventDefault();
        const vertical = e.key === 'PageUp' ? 'up' : 'down';
        // A viewport's worth, estimated from the bounded height. Without a
        // maxHeight there is no viewport, so fall back to ten rows.
        const rowsPerPage = maxHeight
          ? Math.max(1, Math.floor(Number.parseInt(String(maxHeight), 10) / estimateRowSize))
          : 10;
        for (let i = 0; i < rowsPerPage; i++) {
          if (e.shiftKey) table.extendCellSelection(vertical);
          else table.moveCellSelection(vertical);
        }
        return;
      }
      case 'a':
      case 'A':
        if (mod) {
          e.preventDefault();
          table.selectAllCells();
        }
        return;
      case 'c':
      case 'C':
        if (mod) {
          e.preventDefault();
          void navigator.clipboard?.writeText(selectionToTsv(table));
          setAnnouncement(`Copied ${table.getSelectedCellCount()} cells.`);
        }
        return;
      case 'x':
      case 'X':
        if (mod) {
          e.preventDefault();
          void navigator.clipboard?.writeText(selectionToTsv(table));
          report({ ...applyClear(table), source: 'cut' });
        }
        return;
      case 'v':
      case 'V':
        if (mod) {
          e.preventDefault();
          void navigator.clipboard?.readText().then((text) => report(applyPaste(table, text)));
        }
        return;
      case 'd':
      case 'D':
        // Ctrl+D / Ctrl+R are the keyboard half of the fill handle. Without
        // them fill is mouse-only: axe passes, WCAG 2.1.1 fails.
        if (mod) {
          e.preventDefault();
          report(applyFill(table, 'down'));
        }
        return;
      case 'r':
      case 'R':
        if (mod) {
          e.preventDefault();
          report(applyFill(table, 'right'));
        }
        return;
      case 'Enter':
      case 'F2': {
        // The cell the event fired on, not `table.getFocusedCell()`.
        // TanStack's selection-start handler sets the selection range but
        // does not necessarily populate a focused cell, so asking the table
        // returned undefined and the editor never opened. The event already
        // knows which cell it is.
        if (!isColumnEditable(cell.column, cell.row.original)) return;
        e.preventDefault();
        openEditor(cell);
        return;
      }
      case 'Delete':
      case 'Backspace':
        e.preventDefault();
        report(applyClear(table));
        return;
      default:
        // Start typing (hand-off §5): a printable key opens the editor
        // seeded with that character, as a spreadsheet does. Modified keys
        // are shortcuts, not text.
        if (
          e.key.length === 1 &&
          !mod &&
          !e.altKey &&
          !cell.row.getIsGrouped() &&
          getRowState?.(cell.row.original) !== 'disabled' &&
          isColumnEditable(cell.column, cell.row.original)
        ) {
          e.preventDefault();
          openEditor(cell, e.key);
        }
    }
  };

  const virtualizer = useVirtualizer({
    count: centerRows.length,
    getScrollElement: () => scrollElement,
    estimateSize: () => estimateRowSize,
    overscan,
    enabled: enableVirtualization,
  });

  const virtualItems = enableVirtualization ? virtualizer.getVirtualItems() : [];
  const padTop = virtualItems.length ? virtualItems[0].start : 0;
  // When nothing has been measured yet the bottom spacer carries the WHOLE
  // estimated height, not zero.
  //
  // Otherwise this deadlocks: the scroll container is sized by its content,
  // virtualized content starts empty, so the container measures 0px tall, the
  // virtualizer concludes nothing is in view, and no rows ever render. Giving
  // the table its full height on the first paint lets the virtualizer measure
  // a real viewport and fill it on the next.
  const padBottom = virtualItems.length
    ? virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
    : virtualizer.getTotalSize();

  // Top-pinned rows stick *below* the sticky header rather than under it. The
  // header's height is fixed per density (DENSITY_VARS), so the number is
  // known without measuring.
  const headerHeight = maxHeight ? DENSITY_HEADER_HEIGHT[density] : 0;

  /**
   * Numbers align right — automatically, not by per-column discipline.
   *
   * Digits only line up for comparison when their last significant figure
   * does, so "amounts and numbers align right" is a rule of the system rather
   * than a choice each table makes. Left-aligned currency in a column of
   * varying magnitudes is unscannable, and relying on every author to
   * remember `meta.align` guarantees some of them will not.
   *
   * Precedence: an explicit `meta.align` always wins · then `meta.type` ·
   * then the actual value type in the first row. The last is what makes this
   * work for the tables that declare nothing at all.
   *
   * Sampled from the first value on the page rather than every row: a column
   * is one type, and scanning the page on every render to re-learn that is
   * wasted work. Group rows are skipped — they hold aggregates, not values.
   *
   * A pre-formatted STRING counts as a quantity too ("$12,400", "62.5%",
   * "−1.2k"): until 2026-11-03 only a JS number did, so nine DataGrid stories
   * whose data arrived formatted showed Premium left-aligned. A bare digit
   * string ("4821", "2026") stays LEFT — it is as likely an ID, a year or a
   * postal code, which every guideline keeps left because nobody compares
   * them by magnitude. Declare `meta.type: 'number'` to say otherwise.
   */
  const NUMERIC_TYPES = new Set(['number', 'currency', 'percent']);
  const sampleRows = rows.filter((r) => !r.getIsGrouped?.()).slice(0, 5);
  const sampleValue = (columnId: string) => {
    for (const r of sampleRows) {
      const v = r.getValue(columnId);
      if (v != null && v !== '') return v;
    }
    return undefined;
  };
  const resolveAlign = (column: { id: string; columnDef: { meta?: { align?: 'left' | 'center' | 'right'; type?: string } } }) => {
    const meta = column.columnDef.meta;
    if (meta?.align) return meta.align;
    if (meta?.type) return NUMERIC_TYPES.has(meta.type) ? 'right' : 'left';
    const v = sampleValue(column.id);
    if (typeof v === 'number' || typeof v === 'bigint') return 'right';
    if (typeof v === 'string' && looksLikeQuantity(v)) return 'right';
    return 'left';
  };

  // Literal class strings, never `text-${align}`: Tailwind's scanner is plain
  // text, so an interpolated class generates no CSS at all.
  //
  // Right-aligned (numeric) columns also get tabular figures: Noto Sans digits
  // are proportional by default, so "$11,750" over "$8,200" only lines up digit
  // for digit with `tnum` on, right-aligned or not.
  const alignClass = (align?: 'left' | 'center' | 'right') =>
    align === 'right' ? 'text-right tabular-nums' : align === 'center' ? 'text-center' : 'text-left';

  /**
   * `meta.type` → the matching `formatValue` kind, for the types that have one.
   *
   * `text`, `status` and `boolean` are deliberately absent: they carry no
   * numeric/date formatting, so a column of that type renders exactly as it did
   * before. This is the hook `meta.type` always advertised (data-grid-features
   * §columnMeta) but never wired — until now it only drove right-alignment.
   */
  const TYPE_TO_FORMAT: Partial<Record<NonNullable<DataGridColumnMeta['type']>, FormatKind>> = {
    currency: 'currency',
    number: 'number',
    percent: 'percent',
    date: 'date',
  };

  // The table's own fallback cell renderer. Every column's `columnDef.cell` is
  // this exact reference UNLESS the consumer supplied their own — TanStack v9
  // merges `...getDefaultColumnDef()` (which sets
  // `cell: props => props.renderValue()?.toString?.() ?? null`) ahead of the
  // column's def, and memoises it on `[defaultColumn]` so the reference is
  // stable. Comparing against it is how a custom `cell` keeps winning: if the
  // author wrote one, we never touch their output.
  const defaultCellRenderer = table.getDefaultColumnDef().cell;
  // Same trick for a group row's cells: `rowAggregationFeature` merges a
  // default `aggregatedCell` (a bare `String(value)`), so a column only has
  // its OWN group-row rendering when this reference differs.
  const defaultAggregatedCell = table.getDefaultColumnDef().aggregatedCell;

  /**
   * A cell's display content.
   *
   * Formats the raw value through the ambient formatter ONLY when the column
   * declares a formattable `meta.type` AND renders with the default cell (no
   * custom `cell`). Otherwise the column's own renderer runs unchanged, so an
   * explicit `cell` — including one that formats differently — always wins, and
   * a column without `meta.type` is byte-for-byte what it was.
   */
  const renderCellContent = (
    cell: ReturnType<(typeof rows)[number]['getVisibleCells']>[number]
  ): React.ReactNode => {
    const type = (cell.column.columnDef.meta as DataGridColumnMeta | undefined)?.type;
    const kind = type ? TYPE_TO_FORMAT[type] : undefined;
    // Group rows (hand-off §5b#21, T8). A column's own `aggregatedCell` wins
    // for every cell of a group row; otherwise the grouping column shows the
    // toggle + Text Strong label + Text Muted count, aggregated cells their
    // value in Number Strong, and the rest stay empty.
    if (cell.row.getIsGrouped()) {
      const { aggregatedCell } = cell.column.columnDef;
      if (aggregatedCell && aggregatedCell !== defaultAggregatedCell) {
        return flexRender(aggregatedCell, cell.getContext());
      }
      if (cell.getIsGrouped()) return <DataGridGroupCell row={cell.row} />;
      if (cell.getIsAggregated()) {
        const value = cell.getValue();
        return (
          <DataGridCellNumber strong>
            {value == null
              ? null
              : kind
                ? fmt.value(value as Formattable, kind)
                : typeof value === 'number'
                  ? value.toLocaleString()
                  : String(value)}
          </DataGridCellNumber>
        );
      }
      return null;
    }
    // A leaf under a group, in the grouping column: TanStack calls it a
    // placeholder — its value IS the group's, already shown on the group
    // row. Unless the column groups by `getGroupingValue`, in which case the
    // leaf's own value differs (a "Line item" grouped by category) and shows.
    if (cell.getIsPlaceholder() && !cell.column.columnDef.getGroupingValue) return null;
    if (kind && cell.column.columnDef.cell === defaultCellRenderer) {
      return fmt.value(cell.getValue() as Formattable, kind);
    }
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  // Figma `Cell`: min height per density, insets from the same mode. `h-*` on
  // a <td> IS a minimum (CSS tables never clip a cell to its height), so a
  // two-line cell or an inline Cell message grows the row — hand-off D1/T3.
  // `min-h-*` would do nothing here: min-height does not apply to table cells.
  const cellBox = 'h-[var(--dt-row-h)] px-[var(--dt-inset-x)] py-[var(--dt-inset-y)] text-sm';
  // Header Pin / Menu icons: a 16px slot in the Figma layout with a 24px
  // target around it (-m-1), so the hit area meets WCAG 2.5.8 without
  // pushing the label.
  const headerIconButton = cn(
    '-m-1 inline-flex size-6 shrink-0 items-center justify-center rounded-sm',
    'text-[var(--mds-color-foreground-neutral-subtle)] hover:bg-[var(--mds-color-overlay-neutral-hover)]',
    'focus-visible:outline-hidden focus-visible:shadow-[0_0_0_2px_var(--mds-color-border-focus-default)]'
  );

  // `meta.leading` control columns (checkbox, expand) join the cell after
  // them: no trailing inset of their own, and the next column starts 8px
  // later — Figma's checkbox-inside-the-first-cell geometry.
  const visibleLeaves = table.getVisibleLeafColumns();
  const followsLeading = new Set(
    visibleLeaves
      .filter((_, i) => i > 0 && (visibleLeaves[i - 1].columnDef.meta as DataGridColumnMeta | undefined)?.leading)
      .map((c) => c.id)
  );
  const insetFor = (column: { id: string; columnDef: { meta?: unknown } }) =>
    (column.columnDef.meta as DataGridColumnMeta | undefined)?.leading
      ? 'pe-0'
      : followsLeading.has(column.id)
        ? 'ps-2'
        : undefined;

  // A width only when the author fixed one (or resizing owns it). TanStack
  // reports a default 150 for every column, so `getSize()` alone cannot tell
  // "the design says 210" from "nobody said".
  //
  // A leading control column is the inset plus the 20px control, in CSS, so it
  // tracks the density mode rather than baking in one mode's number.
  //
  // TanStack merges its default column def (size 150) into EVERY columnDef,
  // so `columnDef.size != null` is always true — an author's width is one
  // that differs from that default. (Asking for exactly 150 therefore reads as
  // unsized; any other value is honoured.) Getting this wrong fixes every
  // column of every table at 150px.
  const defaultSize = table.getDefaultColumnDef().size ?? 150;
  const authoredSize = (column: { columnDef: { size?: number } }) =>
    column.columnDef.size != null && column.columnDef.size !== defaultSize ? column.columnDef.size : undefined;
  // `size` on a leading column is the CONTROL's width (20 checkbox, 24 toggle).
  //
  // A PINNED column always gets a definite width: its neighbours' sticky
  // offsets are built from it (`pinnedOffset`), so a content-sized pinned
  // column would let the offset and the real width disagree.
  //
  // On a narrow table a pinned column is capped to a share of the VISIBLE
  // width (`cqw` of the scroll area, a size container), so the scrolling
  // columns always have room to pass under it: at 390px the Directory's
  // pinned checkbox + Name took 280 of 308px. The share is split across the
  // region's data columns so two pinned columns can't fill the screen
  // between them. At desktop widths `min()` resolves to the authored width.
  const pinnedShare = (side: 'start' | 'end') => {
    const region = side === 'start' ? table.getStartVisibleLeafColumns() : table.getEndVisibleLeafColumns();
    const data = region.filter((c) => !(c.columnDef.meta as DataGridColumnMeta | undefined)?.leading).length;
    return Math.floor(PINNED_MAX_SHARE / Math.max(1, data));
  };
  const widthFor = (column: {
    columnDef: { size?: number; meta?: unknown };
    getSize: () => number;
    getIsPinned: () => false | 'start' | 'end';
  }): number | string | undefined => {
    if ((column.columnDef.meta as DataGridColumnMeta | undefined)?.leading)
      return `calc(var(--dt-inset-x) + ${authoredSize(column) ?? 20}px)`;
    const pinned = column.getIsPinned();
    if (pinned) {
      const w = enableColumnResizing ? column.getSize() : (authoredSize(column) ?? column.getSize());
      return `min(${w}px, ${pinnedShare(pinned)}cqw)`;
    }
    return enableColumnResizing ? column.getSize() : authoredSize(column);
  };
  // Under auto layout a cell's `width` is only a floor: an unbreakable email
  // in the pinned Name held the column at 242px however narrow the cap. The
  // wrapper's `contain: inline-size` drops the content's intrinsic width out
  // of the column sizing, so the pinned width IS the width and the content
  // wraps or truncates inside it. Leading (checkbox) columns are already exact.
  const clampPinned = (
    column: { getIsPinned: () => false | 'start' | 'end'; columnDef: { meta?: unknown } },
    node: React.ReactNode
  ) =>
    column.getIsPinned() && !(column.columnDef.meta as DataGridColumnMeta | undefined)?.leading ? (
      <div data-slot="data-grid-pinned-clamp" className="[contain:inline-size]">
        {node}
      </div>
    ) : (
      node
    );
  // A sticky offset is the sum of the RENDERED widths before the column in its
  // region — the same `widthFor` values the cells are drawn with, summed in CSS.
  // TanStack's `getStart()` sums its numeric sizes instead, which for a leading
  // column is the bare control (20) while the cell is inset + 20 (36 at
  // default density): the pinned Name stuck at left:20 and slid 16px over the
  // checkbox on every horizontal scroll (2026-11-03, found at 390px wide).
  const pinnedOffset = (column: { id: string }, side: 'start' | 'end') => {
    const region = side === 'start' ? table.getStartVisibleLeafColumns() : [...table.getEndVisibleLeafColumns()].reverse();
    const parts: string[] = [];
    for (const c of region) {
      if (c.id === column.id) break;
      const w = widthFor(c);
      parts.push(typeof w === 'number' ? `${w}px` : (w ?? `${c.getSize()}px`));
    }
    return parts.length === 0 ? 0 : `calc(${parts.join(' + ')})`;
  };
  // When the author sized every column, lay the table out FIXED: the browser's
  // auto layout treats cell widths as hints and redistributes space by
  // content, so a design's 380/210/110 drifts by tens of pixels.
  const allColumnsSized =
    !enableColumnResizing &&
    visibleLeaves.length > 0 &&
    visibleLeaves.every(
      (c) => authoredSize(c) != null || (c.columnDef.meta as DataGridColumnMeta | undefined)?.leading
    );

  // Figma `Column divider`: a 1px border/subtle rule inside the right edge of
  // every cell of the column. On by `meta.columnDivider`, and by default on a
  // resizable table (hand-off §4.10 D) — the rule is where the drag happens.
  // A pinned column draws its border/default edge instead, never both.
  const columnDividerFor = (column: { columnDef: { meta?: unknown }; getIsPinned: () => false | 'start' | 'end' }) => {
    if (column.getIsPinned()) return undefined;
    const meta = column.columnDef.meta as DataGridColumnMeta | undefined;
    return (meta?.columnDivider ?? (enableColumnResizing && !meta?.leading)) ? `inset -1px 0 0 0 ${borderColor}` : undefined;
  };

  const moveColumn = (columnId: string, delta: -1 | 1) => {
    const moved = moveColumnInRegion(table, columnId, delta);
    if (moved) setAnnouncement(`${columnLabel(table.getColumn(columnId)!)} moved to position ${moved.position} of ${moved.total}`);
  };

  // `minWidth: 100%` matters when resizing is on: the columns' summed width is
  // often narrower than the container, and without it the table stops short
  // and leaves dead space with the header band ending mid-shell.
  //
  // FIXED layout when resizing too: under auto layout a column cannot be
  // dragged (or authored) narrower than its nowrap label, so a 120px column
  // with a long label rendered 326 wide and never truncated.
  const tableStyle: React.CSSProperties | undefined = enableColumnResizing
    ? { width: table.getTotalSize(), minWidth: '100%', tableLayout: 'fixed' }
    : allColumnsSized
      ? { tableLayout: 'fixed' }
      : undefined;

  // Hand-off §6 Loading: the page size, at most 10 — a 100-row page of
  // skeletons is a wall of grey, not a hint of what is coming.
  const skeletonRowCount = loadingRowCount ?? Math.min(table.state.pagination.pageSize, MAX_SKELETON_ROWS);

  /**
   * One data row, plus its detail row when expanded.
   *
   * Extracted so pinned rows can reuse it: row pinning renders three separate
   * <TableBody> sections (top / centre / bottom) and each needs identical rows.
   */
  // Row activation is only offered outside grid mode — see the prop's note.
  const rowClickable = !!onRowClick && !enableCellSelection;

  /**
   * True when the event started inside something interactive.
   *
   * Without this, clicking a row's select checkbox or an action button also
   * fires `onRowClick`, so selecting a row would navigate away from it.
   */
  const fromInteractive = (target: EventTarget | null) =>
    target instanceof Element &&
    !!target.closest('button, a, input, select, textarea, [role="button"], [role="checkbox"]');

  /**
   * `position` is the row's 0-based place in the WHOLE body — top-pinned,
   * then centre, then bottom-pinned — so `aria-rowindex` stays unique and in
   * reading order across the three <tbody>s. `region` marks a pinned row.
   */
  const renderRow = (
    row: (typeof rows)[number],
    position?: number,
    region?: 'top' | 'bottom'
  ): React.ReactNode => {
    // Striping sits below hover and selection: those are states the user
    // caused, and they have to win over decoration.
    const rowState: DataGridRowState | undefined = getRowState?.(row.original);
    const disabledRow = rowState === 'disabled';
    // DECISION: pinned rows take the Banded fill — hand-off 5b#3 ("Pinned rows
    // use the Banded fill"). The Figma Directory frame (17992-15767) draws its
    // pinned contacts WITHOUT the band; the hand-off was followed. To overrule,
    // drop `region ? stripeBg :` below — nothing else depends on it.
    const pinnedBand = region ? stripeBg : undefined;
    // Figma Row State=Error: background/critical/subtle replaces the row's
    // surface (and the band), and WINS over Selected — a failed row has to
    // stay visible while it is selected; the checkbox still shows selection.
    const stripe =
      rowState === 'error'
        ? errorRowBg
        : (pinnedBand ?? (striped && row.index % 2 === 1 ? stripeBg : rowBg));
    // Hand-off 5b#3: a 1px border/default rule separates pinned rows from the
    // scrolling ones — under the last top-pinned row, over the first
    // bottom-pinned row. The last centre row drops its own divider when a
    // bottom region follows, so at rest the two never stack into 2px.
    const lastTop = region === 'top' && topRows[topRows.length - 1]?.id === row.id;
    const firstBottom = region === 'bottom' && bottomRows[0]?.id === row.id;
    const lastCentreBeforeBottom =
      !region && bottomRows.length > 0 && centerRows[centerRows.length - 1]?.id === row.id;
    const rowDivider = lastTop
      ? `inset 0 -1px 0 0 ${pinnedEdgeColor}`
      : lastCentreBeforeBottom
        ? undefined
        : cellDivider;
    const pinnedTopRule = firstBottom ? `inset 0 1px 0 0 ${pinnedEdgeColor}` : undefined;
    // Figma Row states: Error > Selected > Hover > Banded > Default. Hover is
    // a layer over the row's own surface, so a hovered banded (or error) row
    // keeps its fill. A disabled row takes no hover — nothing in it responds.
    const rowPaint: React.CSSProperties =
      row.getIsSelected() && rowState !== 'error'
        ? { backgroundColor: selectedBg }
        : (hoveredRow === row.id || hoverTrail === row.id) && !disabledRow
          ? { backgroundColor: stripe, backgroundImage: hoverLayer }
          : { backgroundColor: stripe };
    const rowHovered = hoveredRow === row.id && !disabledRow && !(row.getIsSelected() && rowState !== 'error');
    const clickable = rowClickable && !disabledRow;
    return (
      <React.Fragment key={row.id}>
            <TableRow
              key={row.id}
              // 1-based, header counts as row 1. Required once virtualization
              // means the DOM holds ~30 rows of a much larger set — without it
              // a screen reader announces the rendered count as the total.
              aria-rowindex={
                (enableVirtualization || enableCellSelection) && position !== undefined
                  ? headerRowCount + position + 1
                  : undefined
              }
              data-pinned-row={region}
              onMouseEnter={() => setHoveredRow(row.id)}
              onMouseLeave={() => {
                setHoverTrail(row.id);
                setHoveredRow(null);
              }}
              // A tab stop, but NOT `role="button"`.
              //
              // An explicit role on a <TableRow> overrides its implicit `row`, which
              // removes it from the table's structure: `aria-required-children`
              // wants `row` children, `getAllByRole('row')` stops finding it,
              // and a screen reader loses the row/cell relationship entirely.
              // The row stays a row; it just becomes focusable and responds to
              // Enter/Space. Only when something is actually listening —
              // otherwise every row is a tab stop for no behaviour.
              tabIndex={clickable ? 0 : undefined}
              onClick={
                clickable
                  ? (e) => {
                      if (fromInteractive(e.target)) return;
                      onRowClick?.(row);
                    }
                  : undefined
              }
              onKeyDown={
                clickable
                  ? (e) => {
                      // Enter and Space, the button convention — a click
                      // handler with no keyboard equivalent is a WCAG 2.1.1
                      // failure that axe cannot see on a <TableRow>.
                      if (e.key !== 'Enter' && e.key !== ' ') return;
                      if (fromInteractive(e.target)) return;
                      e.preventDefault();
                      onRowClick?.(row);
                    }
                  : undefined
              }
              data-state={row.getIsSelected() ? 'selected' : undefined}
              data-row-state={rowState}
              data-grouped={row.getIsGrouped() || undefined}
              aria-disabled={disabledRow || undefined}
              className={cn(
                clickable && 'cursor-pointer',
                // Figma Row State=Disabled: ALL text in foreground/disabled —
                // including content parts that set their own colour, which an
                // inherited `color` alone would not reach.
                disabledRow && '**:text-[var(--mds-color-foreground-disabled)]!',
                // Figma Row focus: the double ring, inset across the whole row.
                'focus-visible:outline-hidden focus-visible:shadow-[inset_0_0_0_2px_var(--mds-color-border-focus-default),inset_0_0_0_4px_var(--mds-color-background-default)]',
                // Hand-off §5 Motion: the hover layer fades 100 ms ease-out,
                // in and out; never under prefers-reduced-motion.
                '[transition:--dt-row-hover_100ms_ease-out] motion-reduce:[transition:none]'
              )}
              style={{
                ...rowPaint,
                [ROW_HOVER_VAR as string]: rowHovered ? 'var(--mds-color-background-hover)' : 'transparent',
                // No row border: the divider is each cell's own inset rule
                // (`cellDivider`), as Figma draws it. A collapsed <tr> border
                // splits half a pixel into the NEXT row, which put an
                // expanded detail row half a pixel off the design.
                color: disabledRow ? 'var(--mds-color-foreground-disabled)' : textColor,
              }}
            >
              {row.getVisibleCells().map((cell) => {
                // Two editing paths, deliberately kept apart.
                //
                // Legacy (`meta.editable` + `onCellEdit`) wraps the cell's
                // content in a <button> for the double-click/Enter affordance.
                // In GRID mode that wrapper is an axe `nested-interactive`
                // failure waiting to happen — the moment a cell renders a
                // Button, a link or a Checkbox it is a button inside a button
                // — and it is also unnecessary, because the <TableCell> is already
                // the roving focus target carrying Enter/F2.
                // A group row is computed, not a record: nothing in it edits.
                const groupRow = row.getIsGrouped();
                const gridEditable =
                  !disabledRow && !groupRow && enableCellSelection && isColumnEditable(cell.column, row.original);
                const isEditable =
                  gridEditable ||
                  (!disabledRow && !groupRow && !!onCellEdit && !!cell.column.columnDef.meta?.editable);
                const isEditing =
                  isEditable && editingCell?.rowId === row.id && editingCell?.columnId === cell.column.id;

                const cellKey = `${row.id}\u0000${cell.column.id}`;
                // Text this cell rejected and still holds (hand-off §5c).
                const cellError = gridEditable ? errorFor(row.id, cell.column.id) : undefined;
                // Figma Cell state: Editing / Error while the editor is open
                // (Error once `parse` rejected the text), Error after leaving
                // while the rejected text stays, Success for ~2 s after a
                // save. Independent of the row state.
                const cellState: CellState | undefined = isEditing
                  ? editInvalid && gridEditable
                    ? 'error'
                    : 'editing'
                  : cellError
                    ? 'error'
                    : successCell === cellKey
                      ? 'success'
                      : undefined;
                const tipId = `${errorTipId}-${idSafe(cell.id)}`;
                // The last rendered row has no row under it for the tooltip:
                // it flips above the cell instead of being clipped.
                const lastRow = centerRows[centerRows.length - 1]?.id === row.id;
                const isSelectCell =
                  gridEditable && cell.column.columnDef.meta?.cellEdit?.control === 'select';
                // Figma Content/Editable Dropdown: a 16px keyboard_arrow_down
                // after the value (and the status icon); up while the list is
                // open. Decorative — the editor is a combobox with aria-expanded.
                const dropdownArrow = isSelectCell ? (
                  <Icon
                    pseudo
                    name={isEditing && editListOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                    size={16}
                    className="shrink-0"
                  />
                ) : undefined;
                const statePaint = cellState ? CELL_STATE[cellState] : undefined;

                const beginEdit = () => {
                  const current = cell.getValue();
                  setDraft(current == null ? '' : String(current));
                  setEditingCell({ rowId: row.id, columnId: cell.column.id });
                };
                const commit = () => {
                  const previousValue = cell.getValue();
                  setEditingCell(null);
                  // Skip the callback when nothing actually changed, so a
                  // stray click into and out of a cell isn't reported as an
                  // edit.
                  if (draft !== (previousValue == null ? '' : String(previousValue))) {
                    flashSuccess(cellKey);
                    onCellEdit?.({
                      rowId: row.id,
                      rowIndex: row.index,
                      columnId: cell.column.id,
                      value: draft,
                      previousValue,
                      row: row.original,
                    });
                  }
                };

                return (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      cellBox,
                      insetFor(cell.column),
                      alignClass(resolveAlign(cell.column))
                    )}
                    data-cell-state={cellState}
                    // Moment 2: the kept error describes the cell itself, so
                    // a screen reader hears the message on arrival.
                    aria-describedby={!isEditing && cellError ? tipId : undefined}
                    onFocus={cellError ? () => setFocusErrorCell(cellKey) : undefined}
                    onBlur={cellError ? () => setFocusErrorCell((k) => (k === cellKey ? null : k)) : undefined}
                    onMouseLeave={cellError ? () => setHoverErrorCell((k) => (k === cellKey ? null : k)) : undefined}
                    // Grid semantics ONLY in cell-selection mode. `role=grid`
                    // promises arrow-key navigation; on a static table that
                    // promise is a lie to assistive tech, and a plain `table`
                    // is the better answer.
                    role={enableCellSelection ? 'gridcell' : undefined}
                    aria-colindex={enableCellSelection ? cell.column.getIndex() + 1 : undefined}
                    aria-selected={enableCellSelection ? cell.getIsSelected() : undefined}
                    // Roving tabindex, straight from TanStack: exactly one
                    // cell is tabbable, so Tab enters the grid at the focused
                    // cell and the next Tab leaves it — the APG grid pattern.
                    tabIndex={
                      enableCellSelection
                        ? hasFocusedCell
                          ? cell.getTabIndex()
                          : cell.row.index === 0 && cell.column.getIndex() === 0
                            ? 0
                            : -1
                        : undefined
                    }
                    onKeyDown={enableCellSelection ? (e) => onGridKeyDown(e, cell) : undefined}
                    onMouseDown={
                      enableCellSelection
                        ? (cell.getSelectionStartHandler() as React.MouseEventHandler<HTMLTableCellElement>)
                        : undefined
                    }
                    onDoubleClick={gridEditable && !isEditing ? () => openEditor(cell) : undefined}
                    onMouseEnter={
                      enableCellSelection
                        ? (e) => {
                            if (cellError) setHoverErrorCell(cellKey);
                            (cell.getSelectionExtendHandler() as React.MouseEventHandler<HTMLTableCellElement>)(e);
                          }
                        : undefined
                    }
                    ref={
                      // `&& !isEditing` is load-bearing. Arrow keys move the
                      // selection model and DOM focus has to follow, or the
                      // next keystroke goes to the cell we just left — but
                      // while an editor is open this would yank focus back
                      // out of it, firing the editor's blur-commit and
                      // closing it the instant it opened. The two focus
                      // mechanisms were fighting and the editor lost.
                      enableCellSelection && cell.getIsFocused() && !isEditing
                        ? (el) => {
                            if (!el) return;
                            if (skipRefocus.current) {
                              skipRefocus.current = false;
                              return;
                            }
                            if (document.activeElement !== el) el.focus();
                          }
                        : undefined
                    }
                    style={{
                      width: widthFor(cell.column),
                      ...getPinnedCellStyle(cell.column, rowPaint),
                      ...(enableCellSelection && cell.getIsSelected()
                        ? { backgroundColor: selectionBg }
                        : null),
                      // A cell state paints over the row (and the selection):
                      // it is the one cell being edited or just saved.
                      ...(statePaint ? { backgroundColor: statePaint.fill, backgroundImage: 'none' } : null),
                      // One box-shadow carries the divider, the pinned edge
                      // and the selection outline together — set separately,
                      // the last one would silently erase the others. A cell
                      // state's 1px inside stroke REPLACES the divider: Figma
                      // draws the divider in the stroke's colour.
                      boxShadow: [
                        statePaint ? `inset 0 0 0 1px ${statePaint.stroke}` : rowDivider,
                        pinnedTopRule,
                        getPinnedCellStyle(cell.column, rowPaint).boxShadow ?? columnDividerFor(cell.column),
                        enableCellSelection && !statePaint ? selectionOutline(cell).boxShadow : undefined,
                      ]
                        .filter(Boolean)
                        .join(', '),
                      outline: 'none',
                      // Only when it is NOT already positioned. Spreading a
                      // `position: undefined` after the pinned style removes
                      // the `sticky` it just set — React treats an explicit
                      // undefined as "remove this property", so the pinned
                      // column silently stopped sticking. A cell in a state
                      // anchors its error tooltip.
                      ...(((enableCellSelection && cell.getIsSelected()) || cellState) && !cell.column.getIsPinned()
                        ? { position: 'relative' as const }
                        : null),
                    }}
                  >
                    {/* The fill handle sits on the selection's bottom-right
                        corner — the one cell whose bottom and right edges are
                        both on the boundary. A real <button>, not a div: it
                        has to be reachable and operable, and its Enter/Space
                        does the same fill as Ctrl+D. */}
                    {enableFillHandle &&
                      enableCellSelection &&
                      cell.getIsSelected() &&
                      cell.getSelectionEdges().bottom &&
                      cell.getSelectionEdges().right && (
                        <button
                          type="button"
                          aria-label="Fill selection down"
                          title="Fill down (Ctrl+D)"
                          onClick={(e) => {
                            e.stopPropagation();
                            const details = applyFill(table, 'down');
                            onCellsChange?.(details);
                            setAnnouncement(describeChanges(details));
                            recordRejections(details);
                          }}
                          className="absolute -bottom-1 -right-1 size-2 cursor-crosshair rounded-md focus-visible:outline-hidden focus-visible:ring-2"
                          style={
                            {
                              backgroundColor: selectionEdge,
                              zIndex: Z_INDEX.stickyRaised,
                              '--tw-ring-color': 'var(--mds-color-border-focus-default)',
                            } as React.CSSProperties
                          }
                        />
                      )}
                    {isEditing && gridEditable ? (
                      // Grid mode: the typed editor, committing through the
                      // SAME parse/format rules a paste uses. Two code paths
                      // disagreeing about what a column accepts is how "it
                      // worked when I typed it" bugs start.
                      <CellStateFrame
                        state={cellState}
                        tooltipId={tipId}
                        message={editMessage}
                        messageOpen={editMessageOpen}
                        placement={lastRow ? 'above' : 'below'}
                        trailing={dropdownArrow}
                      >
                      <DataGridCellEditor
                        value={draft}
                        control={cell.column.columnDef.meta?.cellEdit?.control}
                        options={isSelectCell ? selectOptionsFor(cell.column).map((o) => o.label) : undefined}
                        ariaLabel={`Edit ${columnLabel(cell.column)}, ${rowLabelOf(row)}`}
                        invalid={editInvalid}
                        aria-describedby={tipId}
                        messageOpen={editMessageOpen}
                        onDismissMessage={() => setEditMessageOpen(false)}
                        selectOnFocus={!editSeeded}
                        onListOpenChange={setEditListOpen}
                        onDraftChange={(raw) => {
                          // Once rejected, re-check as the user types, so the
                          // Error clears the moment the text is valid.
                          if (!editInvalid) return;
                          const ok = parseCellValue(cell.column, raw, row.original).ok;
                          if (ok) setEditInvalid(false);
                          else {
                            setEditMessage(invalidMessageFor(cell.column, raw));
                            setEditMessageOpen(true);
                          }
                        }}
                        onCancel={() => {
                          setEditingCell(null);
                          setEditInvalid(false);
                          setEditListOpen(false);
                          table.setFocusedCell(row.id, cell.column.id);
                        }}
                        onCommit={(raw, reason) => {
                          const previousValue = cell.getValue();
                          const parsed = parseCellValue(cell.column, raw, row.original);
                          if (!parsed.ok) {
                            const message = invalidMessageFor(cell.column, raw);
                            onCellsChange?.({
                              source: 'edit',
                              changes: [],
                              rejected: [
                                { rowId: row.id, columnId: cell.column.id, raw, reason: 'invalid' },
                              ],
                            });
                            if (reason === 'enter' || reason === 'option') {
                              // Moment 1: keep the editor open and marked,
                              // the message showing, rather than discarding
                              // what was typed.
                              setDraft(raw);
                              setEditMessage(message);
                              setEditInvalid(true);
                              setEditMessageOpen(true);
                              return false;
                            }
                            // Moment 2: leaving (blur / Tab) keeps the text
                            // and the Error; the message waits for hover or
                            // focus.
                            setEditingCell(null);
                            setEditInvalid(false);
                            setEditListOpen(false);
                            recordValidation([], [{ rowId: row.id, columnId: cell.column.id, raw, message }]);
                            moveAfterCommit(row.id, cell.column.id, reason);
                            return true;
                          }
                          setEditingCell(null);
                          setEditInvalid(false);
                          setEditListOpen(false);
                          recordValidation([{ rowId: row.id, columnId: cell.column.id }], []);
                          moveAfterCommit(row.id, cell.column.id, reason);
                          if (parsed.value === previousValue && !cellError) return true;
                          flashSuccess(cellKey);
                          onCellsChange?.({
                            source: 'edit',
                            changes: [
                              {
                                rowId: row.id,
                                columnId: cell.column.id,
                                row: row.original,
                                previousValue,
                                value: parsed.value,
                              },
                            ],
                            rejected: [],
                          });
                          return true;
                        }}
                      />
                      </CellStateFrame>
                    ) : isEditing ? (
                      <CellStateFrame state={cellState}>
                      <input
                        // Focus-on-mount via ref rather than autoFocus:
                        // entering edit mode must move focus or a keyboard
                        // user is stranded, but autoFocus is the blunt
                        // version jsx-a11y rightly rejects. Guarded so
                        // re-renders while typing don't re-steal focus.
                        ref={(el) => {
                          if (el && document.activeElement !== el) el.focus();
                        }}
                        value={draft}
                        aria-label={`Edit ${columnLabel(cell.column)}, ${rowLabelOf(row)}`}
                        onChange={(e) => setDraft(e.target.value)}
                        onBlur={commit}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            commit();
                          } else if (e.key === 'Escape') {
                            e.preventDefault();
                            // Discard: clear the cell before React can fire
                            // the blur-commit on unmount.
                            setEditingCell(null);
                          }
                        }}
                        // Figma Content/Editable — the cell is the field.
                        className="h-5 w-full min-w-0 border-0 bg-transparent p-0 text-sm text-[var(--mds-color-foreground-input-default)] caret-[var(--mds-color-foreground-primary-default)] outline-hidden"
                      />
                      </CellStateFrame>
                    ) : gridEditable ? (
                      // No wrapper in grid mode. The <TableCell> already carries the
                      // roving tabindex and the Enter/F2 handler, so wrapping
                      // the content in a button would add a second focus stop
                      // AND nest interactives when the cell renders a control
                      // of its own — an axe error-severity failure.
                      cellError ? (
                        // Moment 2: still red, still showing the rejected
                        // text; the message only on hover or focus.
                        <CellStateFrame
                          state="error"
                          tooltipId={tipId}
                          message={cellError.message}
                          messageOpen={hoverErrorCell === cellKey || focusErrorCell === cellKey}
                          hoverable
                          placement={lastRow ? 'above' : 'below'}
                          trailing={dropdownArrow}
                        >
                          <span className="block truncate text-sm">{cellError.raw}</span>
                        </CellStateFrame>
                      ) : cellState === 'success' || dropdownArrow ? (
                        <CellStateFrame state={cellState} trailing={dropdownArrow}>
                          {renderCellContent(cell)}
                        </CellStateFrame>
                      ) : (
                        clampPinned(cell.column, renderCellContent(cell))
                      )
                    ) : isEditable ? (
                      // Legacy path: a button, not a div with onDoubleClick,
                      // because editing has to be reachable by keyboard too.
                      <button
                        type="button"
                        onDoubleClick={beginEdit}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === 'F2') {
                            e.preventDefault();
                            beginEdit();
                          }
                        }}
                        // A flex button ignores the cell's text-align, so the
                        // column's alignment is restated as `justify-*` —
                        // without it an editable Premium sat LEFT in a
                        // right-aligned column (2026-11-03). Width is 100%
                        // PLUS the two -mx-1 margins, so px-1 puts the text
                        // box exactly on the cell's: at `w-full` it stopped
                        // 4px short on the right, putting right-aligned text
                        // 8px inside. (Not `box-content` — the unlayered
                        // `.mds-root :where(*)` border-box reset outranks
                        // every layered utility, so it never applies.)
                        className={cn(
                          '-mx-1 flex h-7 w-[calc(100%+--spacing(2))] items-center rounded-lg px-1 focus-visible:outline-hidden focus-visible:ring-2',
                          resolveAlign(cell.column) === 'right'
                            ? 'justify-end text-right'
                            : resolveAlign(cell.column) === 'center'
                              ? 'justify-center text-center'
                              : 'text-left'
                        )}
                        style={{ '--tw-ring-color': 'var(--mds-color-border-focus-default)' } as React.CSSProperties}
                        title="Double-click or press Enter to edit"
                      >
                        {cellState === 'success' ? (
                          <CellStateFrame state="success">{renderCellContent(cell)}</CellStateFrame>
                        ) : (
                          renderCellContent(cell)
                        )}
                      </button>
                    ) : (
                      clampPinned(cell.column, renderCellContent(cell))
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
        {renderDetail && (
          // A real <TableRow>/<TableCell colSpan>, not a rowgroup trick: the detail panel
          // has to stay inside the table's own row structure or a screen
          // reader loses its association with the row it belongs to.
          <DataGridDetailRow
            open={row.getIsExpanded()}
            render={() => renderDetail(row)}
            id={detailIdFor(row.id)}
            colSpan={visibleColumnCount}
            style={{ backgroundColor: rowBg, color: textColor }}
            dividerColor={borderColor}
          />
        )}
      </React.Fragment>
    );
  };

  const detailContext = React.useMemo(
    () => (renderDetail ? { detailIdFor } : null),
    [renderDetail, detailIdFor]
  );

  return (
    <DataGridDetailContext.Provider value={detailContext}>
      {/* Announces a reorder, which happens in a menu that closes on select
          and so is otherwise silent to assistive tech. Rendered even when
          empty: a live region has to be in the DOM before the text changes,
          or the change is not announced. */}
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
      <Table
        ref={ref}
        className={cn('w-full border-collapse', className)}
        style={tableStyle}
        aria-busy={loading || fetching || undefined}
        // The TRUE totals, not the rendered ones. Without these a screen
        // reader announces the ~30 rows in the window as the whole table.
        // On the <table> itself, never a wrapper div: `role=grid` requires
        // `row`/`rowgroup` children, and a wrapper would hand it a `table`
        // child instead — an aria-required-children violation.
        role={enableCellSelection ? 'grid' : undefined}
        aria-multiselectable={enableCellSelection ? true : undefined}
        aria-rowcount={
          enableVirtualization || enableCellSelection
            ? headerRowCount + topRows.length + centerRows.length + bottomRows.length
            : undefined
        }
        aria-colcount={
          enableVirtualization || enableCellSelection ? visibleColumnCount : undefined
        }
      >
        {/* The table's accessible name. A <TableCaption> is announced reliably
            where an aria-label on a <table> is not, and it is visible, which
            helps everyone rather than only screen-reader users. */}
        {caption && (
          <TableCaption className="p-2 text-left text-sm" style={{ color: 'var(--mds-color-foreground-neutral-subtle)' }}>
            {caption}
          </TableCaption>
        )}
        {/* Fixed layout takes column widths from the FIRST row — the header —
            which is wrong as soon as a header spans two columns. A colgroup
            states every width once, independent of any row. */}
        {(allColumnsSized || enableColumnResizing) && (
          <colgroup>
            {visibleLeaves.map((c) => (
              <col key={c.id} style={{ width: widthFor(c) }} />
            ))}
          </colgroup>
        )}
      <TableHeader style={maxHeight ? { position: 'sticky', top: 0, zIndex: Z_INDEX.stickyRaised } : undefined}>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} style={{ backgroundColor: headerBg, borderBottom: `1px solid ${borderColor}` }}>
            {headerGroup.headers.map((header, hi) => {
              const headerMeta = header.column.columnDef.meta as DataGridColumnMeta | undefined;
              // A merged leading column draws no header; the next one spans it.
              if (headerMeta?.leading && headerMeta.mergeHeader) return null;
              const prevMeta = headerGroup.headers[hi - 1]?.column.columnDef.meta as DataGridColumnMeta | undefined;
              const spansLeading = !!(prevMeta?.leading && prevMeta.mergeHeader);
              const span = header.colSpan + (spansLeading ? 1 : 0);
              const canSort = header.column.getCanSort();
              const canHide = header.column.getCanHide();
              const sortState = header.column.getIsSorted();
              const sortIndex = header.column.getSortIndex();
              const headerLabel = header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext());
              const pinnedRegion = header.column.getIsPinned();
              const canMoveEarlier = !header.column.getIsFirstColumn(pinnedRegion || 'center');
              const canMoveLater = !header.column.getIsLastColumn(pinnedRegion || 'center');
              const showUnpin =
                enableColumnPinning && !!pinnedRegion && !headerMeta?.leading && header.column.getCanPin();
              // A leading control column (the select checkbox) has no menu:
              // nothing in it sorts, hides or moves, it is pinned by
              // `pinFirstColumn`, and with column pinning on the floating
              // more_vert landed ON the select-all checkbox and took its clicks.
              const hasMenu =
                !headerMeta?.leading &&
                (canSort || canHide || (enableColumnPinning && header.column.getCanPin()) || enableColumnReorder);
              return (
                <TableHead
                  key={header.id}
                  // colSpan matters for grouped headers: without it a group
                  // header sits over one column instead of spanning its leaves.
                  colSpan={span > 1 ? span : undefined}
                  className={cn(
                    // Figma `Header cell`: height and insets from the density
                    // mode, Body/Small/Bold label. These override TableHead's
                    // h-10/px-3/font-medium through cn()'s merge.
                    // `relative` is the grid's own: the resize handle is
                    // absolutely positioned against this cell.
                    'group/th relative h-[var(--dt-header-h)] px-[var(--dt-inset-x)] py-[var(--dt-inset-y)] font-bold',
                    // While the floating menu shows (hover, focus inside the
                    // cell, menu open, touch), the label group gives up the
                    // menu's slot — Figma lays Content → Pin → Menu out in
                    // flow, so the label and sort icon never sit under it.
                    // See the content wrapper's max-width below.
                    hasMenu && [
                      showUnpin
                        ? '[--dt-menu-slot:calc(2rem+2*var(--dt-gap))]'
                        : '[--dt-menu-slot:calc(1rem+var(--dt-gap))]',
                      'hover:[--dt-menu-reserve:var(--dt-menu-slot)] focus-within:[--dt-menu-reserve:var(--dt-menu-slot)]',
                      'has-[[data-slot=data-grid-header-menu][data-state=open]]:[--dt-menu-reserve:var(--dt-menu-slot)]',
                      'pointer-coarse:[--dt-menu-reserve:var(--dt-menu-slot)]',
                    ],
                    // Hover is an overlay on the band (Figma State=Hover).
                    'hover:[background-image:linear-gradient(var(--mds-color-overlay-neutral-hover),var(--mds-color-overlay-neutral-hover))]',
                    spansLeading ? undefined : insetFor(header.column),
                    alignClass(resolveAlign(header.column))
                  )}
                  // aria-sort is what actually announces sort state to a screen
                  // reader; the icon alone conveys nothing to one.
                  aria-sort={canSort ? (sortState === 'asc' ? 'ascending' : sortState === 'desc' ? 'descending' : 'none') : undefined}
                  style={{
                    color: textColor,
                    width: spansLeading ? undefined : widthFor(header.column),
                    // Ordered within the sticky <TableHeader>'s own stacking context,
                    // so only the relative order matters — but naming the
                    // scale's layers keeps the values checkable.
                    ...getPinnedCellStyle(
                      header.column,
                      { backgroundColor: headerBg },
                      maxHeight
                        ? { zIndex: header.column.getIsPinned() ? Z_INDEX.stickyRaised : Z_INDEX.sticky }
                        : undefined
                    ),
                    ...(columnDividerFor(header.column) ? { boxShadow: columnDividerFor(header.column) } : null),
                  }}
                >
                  {header.isPlaceholder ? null : (
                    // Figma `Header cell` (17228:2623): Content (label group)
                    // → Pin icon 16 → Menu icon 16, 8 apart. The label
                    // truncates before the trailing icons — they take space,
                    // they do not sit on top of it.
                    // `justify-end` for an end-aligned column keeps its label
                    // on the trailing edge when the content gives up the
                    // menu's slot at the leading edge.
                    <div
                      className={cn(
                        'flex min-w-0 items-center gap-[var(--dt-gap)]',
                        resolveAlign(header.column) === 'right' && 'justify-end'
                      )}
                    >
                      <div
                        className={cn(
                          // The reserve is a PERCENTAGE max-width on purpose:
                          // a cyclic percentage does not count towards the
                          // cell's intrinsic width, so an auto-layout column
                          // does not widen on hover — the label truncates
                          // instead. At rest the reserve is 0 (no-op).
                          'flex min-w-0 max-w-[calc(100%-var(--dt-menu-reserve,0px))] flex-1 items-center',
                          resolveAlign(header.column) === 'right'
                            ? 'justify-end'
                            : resolveAlign(header.column) === 'center'
                              ? 'justify-center'
                              : 'justify-start'
                        )}
                      >
                        {canSort ? (
                          // A real button, not a click handler on the <th>.
                          // Click sorts (shift-click adds to a multi-sort);
                          // the column menu is the separate more_vert button.
                          <button
                            type="button"
                            data-slot="data-grid-header-sort"
                            onClick={header.column.getToggleSortingHandler()}
                            // Figma Label group: label then a 16px sort icon,
                            // 4px apart, the icon AFTER the label in every
                            // alignment. No padding, so the label starts on
                            // the cell inset. Focus is Figma's inset double
                            // ring on the WHOLE cell (17312:132): 2px in from
                            // the cell edge, 2px border/focus/default, then a
                            // 2px inner ring — drawn by `after:` against the
                            // <th>, the nearest positioned box.
                            className={cn(
                              'inline-flex max-w-full items-center gap-1 font-bold focus-visible:outline-hidden',
                              'after:pointer-events-none after:absolute after:inset-0.5 after:hidden after:rounded-sm',
                              'after:border-2 after:border-[var(--mds-color-border-focus-default)]',
                              'after:shadow-[inset_0_0_0_2px_var(--mds-color-background-default)]',
                              'focus-visible:after:block'
                            )}
                            style={{ color: textColor }}
                          >
                            <span className="truncate">{headerLabel}</span>
                            <span className="inline-flex shrink-0 items-center gap-0.5">
                              {/* Figma sort icon: unfold_more (None,
                                  neutral/subtle) / arrow_upward /
                                  arrow_downward (primary). */}
                              <Icon
                                pseudo
                                name={sortState === 'asc' ? 'arrow_upward' : sortState === 'desc' ? 'arrow_downward' : 'unfold_more'}
                                size={16}
                                style={{
                                  color: sortState
                                    ? 'var(--mds-color-foreground-primary-default)'
                                    : 'var(--mds-color-foreground-neutral-subtle)',
                                }}
                              />
                              {sortState && sorting.length > 1 && (
                                <span className="text-[10px] font-bold" style={{ color: 'var(--mds-color-foreground-primary-default)' }}>
                                  {sortIndex + 1}
                                </span>
                              )}
                            </span>
                          </button>
                        ) : (
                          <span className="min-w-0 truncate">{headerLabel}</span>
                        )}
                      </div>
                      {/* Figma Header cell, Pinned: keep_off at the cell's
                          end, unpinning in one click (the menu's Unpin is
                          two). Only where the user may pin, never on the
                          select/expand columns the layout pins itself. A
                          24px target over a 16px slot (-m-1). */}
                      {showUnpin && (
                        <button
                          type="button"
                          data-slot="data-grid-header-unpin"
                          onClick={() => header.column.pin(false)}
                          aria-label={`Unpin ${columnLabel(header.column)}`}
                          title="Unpin"
                          className={headerIconButton}
                        >
                          <Icon pseudo name="keep_off" size={16} />
                        </button>
                      )}
                      {hasMenu && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            {/* Figma Menu (more_vert, 16): shown on hover
                                and focus, always on touch (hand-off
                                §4.10 D). Templates draw headers WITHOUT
                                it, so at rest it must not take space — in
                                an auto-width table a reserved 24px slot
                                widens every column. It therefore floats
                                over the cell's trailing edge on the band
                                colour (the leading edge for an
                                end-aligned column, whose label sits at the
                                trailing edge). On a pinned column it
                                floats too, just before keep_off (16px slot
                                + the gap), so keep_off stays reachable —
                                in flow it reserved an invisible 24px slot
                                that cut a 120px pinned label to "P…".
                                Floating must not mean covering: while it
                                shows, the <th> sets --dt-menu-reserve and
                                the label group shrinks out of its way
                                (2026-11-02: it covered a pinned column's
                                sort arrow on hover/focus, and a click on
                                the arrow opened the menu). */}
                            <button
                              type="button"
                              data-slot="data-grid-header-menu"
                              aria-label={`Column options for ${columnLabel(header.column)}`}
                              className={cn(
                                headerIconButton,
                                'absolute top-1/2 m-0 -translate-y-1/2',
                                resolveAlign(header.column) === 'right'
                                  ? 'start-[var(--dt-inset-x)] -ms-1'
                                  : showUnpin
                                    ? 'end-[calc(var(--dt-inset-x)+1rem+var(--dt-gap))] -me-1'
                                    : 'end-[var(--dt-inset-x)] -me-1',
                                'bg-[var(--mds-color-background-neutral-subtle)] [background-image:linear-gradient(var(--mds-color-overlay-neutral-hover),var(--mds-color-overlay-neutral-hover))]',
                                'opacity-0 group-hover/th:opacity-100 group-focus-within/th:opacity-100 data-[state=open]:opacity-100',
                                'pointer-coarse:opacity-100'
                              )}
                            >
                              <Icon pseudo name="more_vert" size={16} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            {canSort && (
                              <>
                                <DropdownMenuCheckboxItem checked={sortState === 'asc'} onCheckedChange={() => header.column.toggleSorting(false)}>
                                  <Icon pseudo name="arrow_upward" size={16} className="me-2 opacity-60" /> Sort ascending
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={sortState === 'desc'} onCheckedChange={() => header.column.toggleSorting(true)}>
                                  <Icon pseudo name="arrow_downward" size={16} className="me-2 opacity-60" /> Sort descending
                                </DropdownMenuCheckboxItem>
                                {sortState && (
                                  <DropdownMenuItem onSelect={() => header.column.clearSorting()}>
                                    <Icon pseudo name="close" size={16} className="me-2 opacity-60" /> Clear sort
                                  </DropdownMenuItem>
                                )}
                              </>
                            )}

                            {/* Pinning — hand-off 4.10 D / 5b#10: "Pin
                                column / Unpin". One item, not a start/end
                                pair: 5b#1 pins data columns to the START
                                only, and 5b#2 allows the END for the Actions
                                column only, so the side follows from the
                                column. Glyphs are Material keep / keep_off
                                (5b#1). */}
                            {enableColumnPinning && header.column.getCanPin() && (
                              <>
                                {canSort && <DropdownMenuSeparator />}
                                {!header.column.getIsPinned() && (
                                  <DropdownMenuItem onSelect={() => header.column.pin(pinSideFor(header.column))}>
                                    <Icon pseudo name="keep" size={16} className="me-2 opacity-60" /> Pin column
                                  </DropdownMenuItem>
                                )}
                                {header.column.getIsPinned() && (
                                  <DropdownMenuItem onSelect={() => header.column.pin(false)}>
                                    <Icon pseudo name="keep_off" size={16} className="me-2 opacity-60" /> Unpin
                                  </DropdownMenuItem>
                                )}
                              </>
                            )}

                            {/* Reordering, KEYBOARD FIRST.
                                A drag-only reorder is a WCAG 2.1.1 failure
                                that axe does not catch — it cannot know
                                whether a div with onPointerDown is reachable
                                by keyboard. So the menu path exists before
                                any pointer path does, and it is tested. */}
                            {enableColumnReorder && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  disabled={!canMoveEarlier}
                                  onSelect={() => moveColumn(header.column.id, -1)}
                                >
                                  <Icon pseudo name="chevron_left" size={16} className="me-2 opacity-60" /> Move left
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  disabled={!canMoveLater}
                                  onSelect={() => moveColumn(header.column.id, 1)}
                                >
                                  <Icon pseudo name="chevron_right" size={16} className="me-2 opacity-60" /> Move right
                                </DropdownMenuItem>
                              </>
                            )}

                            {/* Hide last: the one item that removes the
                                column from view (hand-off item order). */}
                            {canHide && (
                              <>
                                {(canSort || (enableColumnPinning && header.column.getCanPin()) || enableColumnReorder) && (
                                  <DropdownMenuSeparator />
                                )}
                                <DropdownMenuItem onSelect={() => header.column.toggleVisibility(false)}>
                                  <Icon pseudo name="visibility_off" size={16} className="me-2 opacity-60" /> Hide column
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  )}
                  {enableColumnResizing && header.column.getCanResize() && (
                    // WAI-ARIA's documented "resizable separator" pattern (a
                    // focusable role="separator" with aria-valuenow + keyboard
                    // support) — jsx-a11y's static rules don't special-case
                    // that variant and flag it as the plain divider use.
                    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
                    <div
                      role="separator"
                      aria-orientation="vertical"
                      aria-label={`Resize column ${columnLabel(header.column)}`}
                      aria-valuenow={header.column.getSize()}
                      aria-valuemin={header.column.columnDef.minSize ?? 20}
                      aria-valuemax={header.column.columnDef.maxSize ?? undefined}
                      tabIndex={0}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      // Hand-off §5 Resize: double-click (or Enter) auto-fits
                      // — back to the column's own size, which is the width
                      // its content was authored for.
                      onDoubleClick={() => header.column.resetSize()}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          header.column.resetSize();
                          return;
                        }
                        // No pointer to drive TanStack's own resize handler
                        // here — resize the column directly. shiftKey for a
                        // bigger step, matching the resizable-pane convention.
                        const step = e.shiftKey ? 20 : 5;
                        // Clamp to the column's OWN bounds. This used to floor
                        // at a hardcoded 20 and never cap at all, so a column
                        // declaring minSize/maxSize was honoured when dragged
                        // (TanStack clamps) but not when resized by keyboard —
                        // the two paths disagreed.
                        const min = header.column.columnDef.minSize ?? 20;
                        const max = header.column.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER;
                        const clamp = (n: number) => Math.min(max, Math.max(min, n));
                        if (e.key === 'ArrowLeft') {
                          e.preventDefault();
                          table.setColumnSizing((old) => ({
                            ...old,
                            [header.column.id]: clamp(header.column.getSize() - step),
                          }));
                        } else if (e.key === 'ArrowRight') {
                          e.preventDefault();
                          table.setColumnSizing((old) => ({
                            ...old,
                            [header.column.id]: clamp(header.column.getSize() + step),
                          }));
                        }
                      }}
                      // Figma `Resize handle`: an 8px hit area on the column
                      // edge (hand-off §4.4) holding a 2×16 fully rounded
                      // grip in border/default, 1px in from the edge and
                      // centred — visible on hover of the header, on focus,
                      // and (in the active colour) while dragging.
                      className="group/resize absolute end-0 top-0 h-full w-2 cursor-col-resize touch-none select-none focus-visible:outline-hidden"
                    >
                      <span
                        aria-hidden="true"
                        data-slot="data-grid-resize-grip"
                        className={cn(
                          'absolute end-px top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full',
                          header.column.getIsResizing()
                            ? 'block'
                            : 'hidden group-hover/th:block group-focus-visible/resize:block'
                        )}
                        style={{
                          backgroundColor: header.column.getIsResizing()
                            ? activeColor
                            : 'var(--mds-color-border-default)',
                        }}
                      />
                    </div>
                    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      {/* Pinned rows live in their own <TableBody> so they can stick without
          leaving the table's row structure. Sticky needs a bounded scroll
          container to resolve against, which is what `maxHeight` provides —
          without it these render as ordinary leading/trailing rows, which is
          still the correct reading order. */}
      {topRows.length > 0 && status === 'ready' && !loading && (
        <TableBody
          data-pinned="top"
          style={maxHeight ? { position: 'sticky', top: headerHeight, zIndex: Z_INDEX.sticky } : undefined}
        >
          {topRows.map((row, i) => renderRow(row, i, 'top'))}
        </TableBody>
      )}
      <TableBody
        // Hand-off 5b#26: a refetch keeps the rows and dims them to 60%
        // (the table carries aria-busy), fading 150 ms unless reduced motion.
        data-fetching={fetching || undefined}
        className="transition-opacity duration-150 ease-out motion-reduce:transition-none motion-reduce:duration-0"
        style={fetching ? { opacity: 0.6 } : undefined}
      >
        {loading ? (
          // Skeleton rows are aria-hidden: a visual placeholder, not content.
          // Without it a screen reader narrates a grid of empty cells on every
          // load. `aria-busy` on the <table> is what conveys "loading".
          Array.from({ length: skeletonRowCount }).map((_, i) => (
            <TableRow aria-hidden="true" key={`loading-${i}`} style={{ borderBottom: `1px solid ${borderColor}` }}>
              {Array.from({ length: visibleColumnCount }).map((__, colIndex) => (
                <TableCell key={colIndex} className={cellBox}>
                  <Skeleton height={16} width={colIndex === 0 ? '60%' : '80%'} />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : status !== 'ready' ? (
          <TableRow>
            {/* `p-0`: DataState brings its own padding, so the cell must not
                add a second layer around it. */}
            <TableCell colSpan={visibleColumnCount} className="p-0">
              <DataState
                status={status}
                loadError={loadError}
                onRetry={onRetry}
                emptyState={emptyState}
                emptyReason={isFilteredEmpty ? 'no-results' : 'no-data'}
                onClearFilters={() => table.resetColumnFilters()}
                name="DataGridTable"
              />
            </TableCell>
          </TableRow>
        ) : (
          enableVirtualization ? (
            <>
              {/* Spacer rows. `aria-hidden` because they are layout, not
                  content — a screen reader must not count them as rows. */}
              {padTop > 0 && (
                <TableRow aria-hidden="true" style={{ height: padTop }}>
                  <TableCell colSpan={visibleColumnCount} className="p-0" />
                </TableRow>
              )}
              {virtualItems.map((vi) => renderRow(centerRows[vi.index], topRows.length + vi.index))}
              {padBottom > 0 && (
                <TableRow aria-hidden="true" style={{ height: padBottom }}>
                  <TableCell colSpan={visibleColumnCount} className="p-0" />
                </TableRow>
              )}
            </>
          ) : (
            centerRows.map((row, i) => renderRow(row, topRows.length + i))
          )
        )}
        </TableBody>
      {showFooter && status === 'ready' && !loading && (
        <TableFooter
          style={
            stickyFooter && maxHeight
              ? { position: 'sticky', bottom: 0, zIndex: Z_INDEX.stickyRaised }
              : undefined
          }
        >
          {table.getFooterGroups().map((group) => (
            <TableRow key={group.id} style={{ backgroundColor: headerBg, borderBottom: `1px solid ${borderColor}` }}>
              {group.headers.map((header) => (
                <TableCell
                  key={header.id}
                  className={cn(
                    cellBox,
                    'font-bold',
                    alignClass(resolveAlign(header.column))
                  )}
                  style={{
                    color: textColor,
                    width: widthFor(header.column),
                    ...getPinnedCellStyle(header.column, { backgroundColor: headerBg }),
                    ...(columnDividerFor(header.column) ? { boxShadow: columnDividerFor(header.column) } : null),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      )}
      {bottomRows.length > 0 && status === 'ready' && !loading && (
        <TableBody
          data-pinned="bottom"
          style={maxHeight ? { position: 'sticky', bottom: 0, zIndex: Z_INDEX.sticky } : undefined}
        >
          {bottomRows.map((row, i) => renderRow(row, topRows.length + centerRows.length + i, 'bottom'))}
        </TableBody>
      )}
      </Table>
    </DataGridDetailContext.Provider>
  );
}

/**
 * `forwardRef` + a generic component needs this double cast: `forwardRef`
 * itself erases the type parameter, so the exported value is re-typed as the
 * generic function callers actually need (`<DataGridTable<Policy> ... />`),
 * while the real, ref-aware runtime object underneath keeps its
 * `displayName`. Same shape as `DataTableDateFilter` / `DataTableSortList`.
 */
const DataGridTableImpl = React.forwardRef(DataGridTableInner);
DataGridTableImpl.displayName = 'DataGridTable';

export const DataGridTable = DataGridTableImpl as <TData extends RowData>(
  props: DataGridTableProps<TData> & { ref?: React.ForwardedRef<HTMLTableElement> }
) => ReturnType<typeof DataGridTableInner>;

export default DataGridTable;
