"use client"

import * as React from 'react';
import { flexRender, type Row, type RowData } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowLeftToLine, ArrowRightToLine, ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp, EyeOff, PinOff, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { DataState } from './data-state';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import { Input } from './input';
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
import { DENSITY_PADDING, useDataGrid } from './data-grid';
import type { DataGridFeatures } from './data-grid-features';
import {
  applyClear,
  applyFill,
  applyPaste,
  describeChanges,
  formatCellValue,
  isColumnEditable,
  parseCellValue,
  selectionToTsv,
  type CellsChangeDetails,
} from './data-grid-cell-selection';
import { DataGridCellEditor } from './data-grid-cell-edit';

/** Payload for an inline cell edit. */
export interface CellEditParams<TData> {
  rowId: string;
  rowIndex: number;
  columnId: string;
  /** The edited text. Cast/parse it in the handler — the input is always a string. */
  value: string;
  previousValue: unknown;
  row: TData;
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
  /** Estimated row height in px. Rows are measured after first paint. */
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

/**
 * The `<table>` itself: header (sort menu, resize handle, pinning), body
 * (rows, skeletons, the four data states) — everything between the toolbar and
 * the pagination footer.
 *
 * Extracted from `data-table.tsx` unchanged in behaviour. Every decision
 * recorded in the comments below survived the move deliberately; they are all
 * things that were got wrong once.
 */
export function DataGridTable<TData extends RowData>({
  loadingRowCount,
  enableColumnReorder = false,
  renderDetail,
  enableVirtualization = false,
  estimateRowSize = 44,
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
}: DataGridTableProps<TData>) {
  const {
    table,
    scrollElement,
    status,
    loading,
    loadError,
    onRetry,
    emptyState,
    isFilteredEmpty,
    density,
    maxHeight,
  } = useDataGrid<TData>();

  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);
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

  // Called in the render body, never memoised: getRoleColor reads the `dark`
  // class off documentElement at call time, so a value cached in a useMemo
  // with an empty dep array freezes at whatever mode first rendered.
  // border.subtle, not border.default. This colour is drawn once per row — at
  // 40 rows, #878787 stops reading as structure and starts reading as a cage.
  // border.default remains correct for the edge of a control; these are rules
  // separating content the user is already inside. In dark it is translucent
  // white, so it composites over the row beneath rather than sitting on it.
  const borderColor = getRoleColor('border.subtle');
  const textColor = getRoleColor('text.primary');
  const activeColor = getRoleColor('interactive.primary');
  const rowBg = getRoleColor('surface.raised');
  // Sky Blue in light (#ceecff), unchanged #252525 in dark. Its own role, not
  // surface.subtle, because stripeBg and headerBg below still want the neutral
  // lift and must NOT follow hover into brand blue.
  const hoverBg = getRoleColor('surface.row.hover');
  // surface.selected, not surface.accent: accent (#f7f8f8) is one unit from
  // surface.subtle (#f8f8f8) in light, so a selected row and a hovered row
  // were indistinguishable. surface.selected is the role whose own
  // description names this exact job.
  // surface.selected.subtle, not surface.selected. Everything in a row
  // composites against this: a success badge on Sky Blue measures 4.16:1,
  // under AA, and green1000 is the darkest green there is. The lighter tint
  // restores that; the left accent bar below is what keeps selected
  // distinguishable from hovered, since no tint satisfies both.
  const selectedBg = getRoleColor('surface.selected.subtle');
  const selectedEdge = getRoleColor('interactive.primary');
  // The header band. It used to equal the row background exactly, so the
  // column row floated with nothing anchoring it. surface.subtle is one step
  // off the panel in both modes (#f8f8f8 on white, #252525 on #1a1a1a).
  //
  // This is also why surface.raised is NOT neutral900: surface.subtle already
  // is #252525 in dark, and a band the same colour as its panel is not a band.
  const headerBg = getRoleColor('surface.subtle');
  const stripeBg = getRoleColor('surface.subtle');
  const selectionBg = getRoleColor('surface.selected.subtle');

  // Before anything is focused, TanStack reports tabIndex -1 for every cell —
  // correct for "there is no roving position yet", but it leaves the grid
  // unreachable by Tab. APG requires the grid to be in the tab order from the
  // start, so the first cell takes the stop until focus moves.
  const hasFocusedCell = enableCellSelection && !!table.getFocusedCell();
  const selectionEdge = getRoleColor('interactive.primary');

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
  // The right-edge shadow marks where the pinned region ends.
  const getPinnedCellStyle = (
    column: {
      getIsPinned: () => false | 'start' | 'end';
      getStart: (side: 'start') => number;
      getAfter: (side: 'end') => number;
    },
    bg: string,
    extra?: React.CSSProperties
  ): React.CSSProperties => {
    const pinned = column.getIsPinned();
    if (!pinned) return extra ?? {};
    // The divider faces the scrolling content, so it is on the inner edge:
    // right of a start-pinned column, left of an end-pinned one.
    return {
      position: 'sticky',
      ...(pinned === 'start'
        ? { left: column.getStart('start'), boxShadow: `1px 0 0 0 ${borderColor}` }
        : { right: column.getAfter('end'), boxShadow: `-1px 0 0 0 ${borderColor}` }),
      zIndex: Z_INDEX.sticky,
      backgroundColor: bg,
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
        setDraft(formatCellValue(cell.column, cell.getValue(), cell.row.original));
        setEditInvalid(false);
        setEditingCell({ rowId: cell.row.id, columnId: cell.column.id });
        return;
      }
      case 'Delete':
      case 'Backspace':
        e.preventDefault();
        report(applyClear(table));
        return;
      default:
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

  // Top-pinned rows stick *below* the sticky header rather than under it.
  // 40px is the header row's fixed `h-10`; measuring it would need a ref and
  // a layout effect for a value the header itself hardcodes.
  const headerHeight = maxHeight ? 40 : 0;

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
   * Sampled from the first row rather than every row: a column is one type,
   * and scanning the page on every render to re-learn that is wasted work.
   */
  const NUMERIC_TYPES = new Set(['number', 'currency', 'percent']);
  const sampleRow = rows[0];
  const resolveAlign = (column: { id: string; columnDef: { meta?: { align?: 'left' | 'center' | 'right'; type?: string } } }) => {
    const meta = column.columnDef.meta;
    if (meta?.align) return meta.align;
    if (meta?.type) return NUMERIC_TYPES.has(meta.type) ? 'right' : 'left';
    if (sampleRow && typeof sampleRow.getValue(column.id) === 'number') return 'right';
    return 'left';
  };

  // Literal class strings, never `text-${align}`: Tailwind's scanner is plain
  // text, so an interpolated class generates no CSS at all.
  const alignClass = (align?: 'left' | 'center' | 'right') =>
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';

  const cellPadding = DENSITY_PADDING[density];

  // Reorder happens WITHIN a column's own pinned region.
  //
  // A start-pinned column always renders before the centre ones no matter what
  // columnOrder says, so treating the visible leaves as one flat list means
  // "Move left" on the first centre column reorders the array, changes
  // nothing on screen, and still announces a successful move. The announcement
  // would be lying. v9 exposes per-region indices for exactly this.
  const regionColumns = (region: false | 'start' | 'end') =>
    region === 'start'
      ? table.getStartVisibleLeafColumns()
      : region === 'end'
        ? table.getEndVisibleLeafColumns()
        : table.getCenterVisibleLeafColumns();

  const moveColumn = (columnId: string, delta: -1 | 1) => {
    const column = table.getColumn(columnId);
    if (!column) return;

    const siblings = regionColumns(column.getIsPinned()).map((c) => c.id);
    const from = siblings.indexOf(columnId);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= siblings.length) return;

    // columnOrder is a FULL ordering and starts empty (meaning "definition
    // order"). Seed it from the current leaf order, or the first move drops
    // every column not named in it.
    const next = table.getAllLeafColumns().map((c) => c.id);
    const fromAll = next.indexOf(columnId);
    const toAll = next.indexOf(siblings[to]);
    next.splice(fromAll, 1);
    next.splice(toAll, 0, columnId);
    table.setColumnOrder(next);

    const label = column.columnDef.header;
    setAnnouncement(
      `${typeof label === 'string' ? label : columnId} moved to position ${to + 1} of ${siblings.length}`
    );
  };

  // `minWidth: 100%` matters when resizing is on: the columns' summed width is
  // often narrower than the container, and without it the table stops short
  // and leaves dead space with the header band ending mid-shell.
  const tableStyle: React.CSSProperties | undefined = enableColumnResizing
    ? { width: table.getTotalSize(), minWidth: '100%' }
    : undefined;

  const skeletonRowCount = loadingRowCount ?? table.state.pagination.pageSize;

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

  const renderRow = (row: (typeof rows)[number], index?: number): React.ReactNode => {
    // Striping sits below hover and selection: those are states the user
    // caused, and they have to win over decoration.
    const stripe = striped && row.index % 2 === 1 ? stripeBg : rowBg;
    const rowBackground = row.getIsSelected() ? selectedBg : hoveredRow === row.id ? hoverBg : stripe;
    const detail = renderDetail && row.getIsExpanded() ? renderDetail(row) : null;
    return (
      <React.Fragment key={row.id}>
            <TableRow
              key={row.id}
              // 1-based, header counts as row 1. Required once virtualization
              // means the DOM holds ~30 rows of a much larger set — without it
              // a screen reader announces the rendered count as the total.
              aria-rowindex={
                (enableVirtualization || enableCellSelection) && index !== undefined ? index + 2 : undefined
              }
              onMouseEnter={() => setHoveredRow(row.id)}
              onMouseLeave={() => setHoveredRow(null)}
              // A tab stop, but NOT `role="button"`.
              //
              // An explicit role on a <TableRow> overrides its implicit `row`, which
              // removes it from the table's structure: `aria-required-children`
              // wants `row` children, `getAllByRole('row')` stops finding it,
              // and a screen reader loses the row/cell relationship entirely.
              // The row stays a row; it just becomes focusable and responds to
              // Enter/Space. Only when something is actually listening —
              // otherwise every row is a tab stop for no behaviour.
              tabIndex={rowClickable ? 0 : undefined}
              onClick={
                rowClickable
                  ? (e) => {
                      if (fromInteractive(e.target)) return;
                      onRowClick?.(row);
                    }
                  : undefined
              }
              onKeyDown={
                rowClickable
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
              className={cn(rowClickable && 'cursor-pointer')}
              style={{
                backgroundColor: rowBackground,
                borderTop: `1px solid ${borderColor}`,
                color: textColor,
                // A left accent bar carries selection, because the tint alone
                // cannot: any fill light enough to keep an in-row status badge
                // above 4.5:1 is too close to the hover tint to distinguish.
                // An inset shadow rather than a border so it adds no width and
                // cannot shift the columns.
                boxShadow: row.getIsSelected() ? `inset 3px 0 0 0 ${selectedEdge}` : undefined,
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
                const gridEditable =
                  enableCellSelection && isColumnEditable(cell.column, row.original);
                const isEditable = gridEditable || (!!onCellEdit && cell.column.columnDef.meta?.editable);
                const isEditing =
                  isEditable && editingCell?.rowId === row.id && editingCell?.columnId === cell.column.id;

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
                      'px-3 text-sm',
                      isEditing ? 'py-0' : cellPadding,
                      alignClass(resolveAlign(cell.column))
                    )}
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
                    onDoubleClick={
                      gridEditable && !isEditing
                        ? () => {
                            setDraft(formatCellValue(cell.column, cell.getValue(), row.original));
                            setEditInvalid(false);
                            setEditingCell({ rowId: row.id, columnId: cell.column.id });
                          }
                        : undefined
                    }
                    onMouseEnter={
                      enableCellSelection
                        ? (cell.getSelectionExtendHandler() as React.MouseEventHandler<HTMLTableCellElement>)
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
                            if (el && document.activeElement !== el) el.focus();
                          }
                        : undefined
                    }
                    style={{
                      width: enableColumnResizing ? cell.column.getSize() : undefined,
                      ...getPinnedCellStyle(cell.column, rowBackground),
                      ...(enableCellSelection && cell.getIsSelected()
                        ? { backgroundColor: selectionBg }
                        : null),
                      ...(enableCellSelection ? selectionOutline(cell) : null),
                      outline: 'none',
                      // Only when it is NOT already positioned. Spreading a
                      // `position: undefined` after the pinned style removes
                      // the `sticky` it just set — React treats an explicit
                      // undefined as "remove this property", so the pinned
                      // column silently stopped sticking.
                      ...(enableCellSelection && cell.getIsSelected() && !cell.column.getIsPinned()
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
                          }}
                          className="absolute -bottom-1 -right-1 size-2 cursor-crosshair rounded-md focus-visible:outline-hidden focus-visible:ring-2"
                          style={
                            {
                              backgroundColor: selectionEdge,
                              zIndex: Z_INDEX.stickyRaised,
                              '--tw-ring-color': getRoleColor('focus.ring'),
                            } as React.CSSProperties
                          }
                        />
                      )}
                    {isEditing && gridEditable ? (
                      // Grid mode: the typed editor, committing through the
                      // SAME parse/format rules a paste uses. Two code paths
                      // disagreeing about what a column accepts is how "it
                      // worked when I typed it" bugs start.
                      <DataGridCellEditor
                        value={draft}
                        control={cell.column.columnDef.meta?.cellEdit?.control}
                        ariaLabel={`Edit ${cell.column.id}`}
                        invalid={editInvalid}
                        onCancel={() => {
                          setEditingCell(null);
                          setEditInvalid(false);
                        }}
                        onCommit={(raw) => {
                          const previousValue = cell.getValue();
                          const parsed = parseCellValue(cell.column, raw, row.original);
                          if (!parsed.ok) {
                            // Rejected: keep the editor open and marked
                            // rather than discarding what was typed.
                            setDraft(raw);
                            setEditInvalid(true);
                            onCellsChange?.({
                              source: 'edit',
                              changes: [],
                              rejected: [
                                { rowId: row.id, columnId: cell.column.id, raw, reason: 'invalid' },
                              ],
                            });
                            return;
                          }
                          setEditingCell(null);
                          setEditInvalid(false);
                          if (parsed.value === previousValue) return;
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
                        }}
                      />
                    ) : isEditing ? (
                      <Input
                        // Focus-on-mount via ref rather than autoFocus:
                        // entering edit mode must move focus or a keyboard
                        // user is stranded, but autoFocus is the blunt
                        // version jsx-a11y rightly rejects. Guarded so
                        // re-renders while typing don't re-steal focus.
                        ref={(el) => {
                          if (el && document.activeElement !== el) el.focus();
                        }}
                        value={draft}
                        aria-label={`Edit ${cell.column.id}`}
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
                        className="h-8 w-full"
                      />
                    ) : gridEditable ? (
                      // No wrapper in grid mode. The <TableCell> already carries the
                      // roving tabindex and the Enter/F2 handler, so wrapping
                      // the content in a button would add a second focus stop
                      // AND nest interactives when the cell renders a control
                      // of its own — an axe error-severity failure.
                      flexRender(cell.column.columnDef.cell, cell.getContext())
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
                        className="-mx-1 flex h-7 w-full items-center rounded-lg px-1 text-left focus-visible:outline-hidden focus-visible:ring-2"
                        style={{ '--tw-ring-color': getRoleColor('focus.ring') } as React.CSSProperties}
                        title="Double-click or press Enter to edit"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </button>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
        {detail !== null && detail !== undefined && (
          // A real <TableRow>/<TableCell colSpan>, not a rowgroup trick: the detail panel
          // has to stay inside the table's own row structure or a screen
          // reader loses its association with the row it belongs to.
          <TableRow
            data-detail-row=""
            style={{ backgroundColor: rowBg, borderTop: `1px solid ${borderColor}`, color: textColor }}
          >
            <TableCell colSpan={visibleColumnCount} className="p-0">
              {detail}
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  };

  return (
    <>
      {/* Announces a reorder, which happens in a menu that closes on select
          and so is otherwise silent to assistive tech. Rendered even when
          empty: a live region has to be in the DOM before the text changes,
          or the change is not announced. */}
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
      <Table
        className={cn('w-full border-collapse', className)}
        style={tableStyle}
        aria-busy={loading || undefined}
        // The TRUE totals, not the rendered ones. Without these a screen
        // reader announces the ~30 rows in the window as the whole table.
        // On the <table> itself, never a wrapper div: `role=grid` requires
        // `row`/`rowgroup` children, and a wrapper would hand it a `table`
        // child instead — an aria-required-children violation.
        role={enableCellSelection ? 'grid' : undefined}
        aria-multiselectable={enableCellSelection ? true : undefined}
        aria-rowcount={
          enableVirtualization || enableCellSelection ? centerRows.length + 1 : undefined
        }
        aria-colcount={
          enableVirtualization || enableCellSelection ? visibleColumnCount : undefined
        }
      >
        {/* The table's accessible name. A <TableCaption> is announced reliably
            where an aria-label on a <table> is not, and it is visible, which
            helps everyone rather than only screen-reader users. */}
        {caption && (
          <TableCaption className="p-2 text-left text-sm" style={{ color: getRoleColor('text.secondary') }}>
            {caption}
          </TableCaption>
        )}
      <TableHeader style={maxHeight ? { position: 'sticky', top: 0, zIndex: Z_INDEX.stickyRaised } : undefined}>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} style={{ backgroundColor: headerBg }}>
            {headerGroup.headers.map((header) => {
              const canSort = header.column.getCanSort();
              const canHide = header.column.getCanHide();
              const sortState = header.column.getIsSorted();
              const sortIndex = header.column.getSortIndex();
              const SortIcon = sortState === 'asc' ? ChevronUp : sortState === 'desc' ? ChevronDown : ChevronsUpDown;
              const headerLabel = header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext());
              const pinnedRegion = header.column.getIsPinned();
              const canMoveEarlier = !header.column.getIsFirstColumn(pinnedRegion || 'center');
              const canMoveLater = !header.column.getIsLastColumn(pinnedRegion || 'center');
              return (
                <TableHead
                  key={header.id}
                  // colSpan matters for grouped headers: without it a group
                  // header sits over one column instead of spanning its leaves.
                  colSpan={header.colSpan > 1 ? header.colSpan : undefined}
                  className={cn(
                    // h-10/px-3/text-sm/font-medium come from TableHead now.
                    // `relative` is the grid's own: the resize handle is
                    // absolutely positioned against this cell.
                    'relative',
                    alignClass(resolveAlign(header.column))
                  )}
                  // aria-sort is what actually announces sort state to a screen
                  // reader; the icon alone conveys nothing to one.
                  aria-sort={canSort ? (sortState === 'asc' ? 'ascending' : sortState === 'desc' ? 'descending' : 'none') : undefined}
                  style={{
                    color: textColor,
                    width: enableColumnResizing ? header.getSize() : undefined,
                    // Ordered within the sticky <TableHeader>'s own stacking context,
                    // so only the relative order matters — but naming the
                    // scale's layers keeps the values checkable.
                    ...getPinnedCellStyle(
                      header.column,
                      headerBg,
                      maxHeight
                        ? { zIndex: header.column.getIsPinned() ? Z_INDEX.stickyRaised : Z_INDEX.sticky }
                        : undefined
                    ),
                  }}
                >
                  {header.isPlaceholder ? null : canSort || canHide ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {/* A real button, not a click handler on the <th>: the
                            original could only be sorted with a mouse — no
                            focus, no keyboard, no ARIA. */}
                        <button
                          type="button"
                          className="-ml-2 inline-flex h-8 max-w-full items-center gap-1.5 rounded-md px-2 font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2"
                          style={{ color: textColor, '--tw-ring-color': getRoleColor('focus.ring') } as React.CSSProperties}
                          // Shift-click keeps its meaning as "add to the
                          // multi-sort" rather than opening the menu — Radix
                          // opens on pointerdown, so it has to be intercepted
                          // here rather than in onClick.
                          onPointerDown={(e) => {
                            if (e.shiftKey && canSort) {
                              e.preventDefault();
                              header.column.toggleSorting(undefined, true);
                            }
                          }}
                        >
                          <span className="truncate">{headerLabel}</span>
                          {canSort && (
                            <span className="inline-flex shrink-0 items-center gap-0.5">
                              <SortIcon className="h-3.5 w-3.5 opacity-60" />
                              {sortState && sorting.length > 1 && (
                                <span className="text-[10px] font-bold" style={{ color: activeColor }}>
                                  {sortIndex + 1}
                                </span>
                              )}
                            </span>
                          )}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-36">
                        {canSort && (
                          <>
                            <DropdownMenuCheckboxItem checked={sortState === 'asc'} onCheckedChange={() => header.column.toggleSorting(false)}>
                              <ChevronUp className="mr-2 h-4 w-4 opacity-60" /> Asc
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={sortState === 'desc'} onCheckedChange={() => header.column.toggleSorting(true)}>
                              <ChevronDown className="mr-2 h-4 w-4 opacity-60" /> Desc
                            </DropdownMenuCheckboxItem>
                            {sortState && (
                              <DropdownMenuItem onSelect={() => header.column.clearSorting()}>
                                <X className="mr-2 h-4 w-4 opacity-60" /> Reset
                              </DropdownMenuItem>
                            )}
                          </>
                        )}
                        {canHide && (
                          <DropdownMenuItem onSelect={() => header.column.toggleVisibility(false)}>
                            <EyeOff className="mr-2 h-4 w-4 opacity-60" /> Hide
                          </DropdownMenuItem>
                        )}

                        {/* Pinning. v9 renamed the positions left/right ->
                            start/end, which is also the right vocabulary for
                            an RTL-capable system. */}
                        {enableColumnPinning && header.column.getCanPin() && (
                          <>
                            <DropdownMenuSeparator />
                            {header.column.getIsPinned() !== 'start' && (
                              <DropdownMenuItem onSelect={() => header.column.pin('start')}>
                                <ArrowLeftToLine className="mr-2 h-4 w-4 opacity-60" /> Pin to start
                              </DropdownMenuItem>
                            )}
                            {header.column.getIsPinned() !== 'end' && (
                              <DropdownMenuItem onSelect={() => header.column.pin('end')}>
                                <ArrowRightToLine className="mr-2 h-4 w-4 opacity-60" /> Pin to end
                              </DropdownMenuItem>
                            )}
                            {header.column.getIsPinned() && (
                              <DropdownMenuItem onSelect={() => header.column.pin(false)}>
                                <PinOff className="mr-2 h-4 w-4 opacity-60" /> Unpin
                              </DropdownMenuItem>
                            )}
                          </>
                        )}

                        {/* Reordering, KEYBOARD FIRST.
                            A drag-only reorder is a WCAG 2.1.1 failure that
                            axe does not catch — it has no way to know whether
                            a div with onPointerDown is reachable by keyboard.
                            So the menu path exists before any pointer path
                            does, and it is the one that is tested. */}
                        {enableColumnReorder && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              disabled={!canMoveEarlier}
                              onSelect={() => moveColumn(header.column.id, -1)}
                            >
                              <ChevronLeft className="mr-2 h-4 w-4 opacity-60" /> Move left
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={!canMoveLater}
                              onSelect={() => moveColumn(header.column.id, 1)}
                            >
                              <ChevronRight className="mr-2 h-4 w-4 opacity-60" /> Move right
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    headerLabel
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
                      aria-label={`Resize column ${header.id}`}
                      aria-valuenow={header.column.getSize()}
                      aria-valuemin={header.column.columnDef.minSize ?? 20}
                      aria-valuemax={header.column.columnDef.maxSize ?? undefined}
                      tabIndex={0}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      onKeyDown={(e) => {
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
                      className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize touch-none select-none focus-visible:outline-hidden focus-visible:ring-2"
                      style={{
                        backgroundColor: header.column.getIsResizing() ? activeColor : 'transparent',
                        '--tw-ring-color': getRoleColor('focus.ring'),
                      } as React.CSSProperties}
                    />
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
          {topRows.map(renderRow)}
        </TableBody>
      )}
      <TableBody>
        {loading ? (
          // Skeleton rows are aria-hidden: a visual placeholder, not content.
          // Without it a screen reader narrates a grid of empty cells on every
          // load. `aria-busy` on the <table> is what conveys "loading".
          Array.from({ length: skeletonRowCount }).map((_, i) => (
            <TableRow aria-hidden="true" key={`loading-${i}`} style={{ borderTop: `1px solid ${borderColor}` }}>
              {Array.from({ length: visibleColumnCount }).map((__, colIndex) => (
                <TableCell key={colIndex} className={cellPadding}>
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
              {virtualItems.map((vi) => renderRow(centerRows[vi.index], vi.index))}
              {padBottom > 0 && (
                <TableRow aria-hidden="true" style={{ height: padBottom }}>
                  <TableCell colSpan={visibleColumnCount} className="p-0" />
                </TableRow>
              )}
            </>
          ) : (
            centerRows.map((row, i) => renderRow(row, i))
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
            <TableRow key={group.id} style={{ backgroundColor: headerBg, borderTop: `1px solid ${borderColor}` }}>
              {group.headers.map((header) => (
                <TableCell
                  key={header.id}
                  className={cn(
                    'px-3 text-sm font-medium',
                    cellPadding,
                    alignClass(resolveAlign(header.column))
                  )}
                  style={{
                    color: textColor,
                    width: enableColumnResizing ? header.getSize() : undefined,
                    ...getPinnedCellStyle(header.column, headerBg),
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
          {bottomRows.map(renderRow)}
        </TableBody>
      )}
      </Table>
    </>
  );
}

export default DataGridTable;
