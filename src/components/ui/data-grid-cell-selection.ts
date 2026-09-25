import type { RowData } from '@tanstack/react-table';

import { serializeTsv, parseTsv, tileToFit } from './data-grid-clipboard';
import type { DataGridTableInstance } from './data-grid-features';

/**
 * The spreadsheet layer's logic, kept out of the renderer.
 *
 * TanStack v9 supplies the selection *model* — ranges, focus, edges, and
 * `moveCellSelection`/`extendCellSelection`. It explicitly does not supply
 * clipboard, fill, the keyboard map, or editing. That is what this is.
 */

/** Why a set of cells changed. Mirrors reui's vocabulary. */
export type CellChangeSource = 'edit' | 'paste' | 'cut' | 'clear' | 'fill';

export interface CellChange<TData> {
  rowId: string;
  columnId: string;
  row: TData;
  previousValue: unknown;
  value: unknown;
}

export interface CellRejection {
  rowId: string;
  columnId: string;
  /** The text that could not be applied. */
  raw: string;
  reason: 'readonly' | 'invalid';
}

/**
 * One batch of cell changes.
 *
 * `rejected` is the half that matters and that most grids omit: pasting a
 * block across a read-only column, or text into a number column, must be
 * reportable. Dropping those silently means the user believes the paste
 * worked.
 */
export interface CellsChangeDetails<TData> {
  source: CellChangeSource;
  changes: CellChange<TData>[];
  rejected: CellRejection[];
}

type Meta = {
  cellEdit?: {
    editable?: boolean | ((row: unknown) => boolean);
    parse?: (raw: string, row: unknown) => unknown;
    format?: (value: unknown, row: unknown) => string;
    clearValue?: unknown;
    control?: 'text' | 'textarea';
  };
  editable?: boolean;
};

function metaOf(column: { columnDef: { meta?: unknown } }): Meta {
  return (column.columnDef.meta ?? {}) as Meta;
}

/** Whether a column accepts writes at all. */
export function isColumnEditable(column: { columnDef: { meta?: unknown } }, row: unknown): boolean {
  const meta = metaOf(column);
  const editable = meta.cellEdit?.editable ?? meta.editable;
  if (typeof editable === 'function') return editable(row);
  return !!editable;
}

/** Value -> display text, for copy and for seeding an editor. */
export function formatCellValue(
  column: { columnDef: { meta?: unknown } },
  value: unknown,
  row: unknown
): string {
  const format = metaOf(column).cellEdit?.format;
  if (format) return format(value, row);
  return value === null || value === undefined ? '' : String(value);
}

/**
 * Text -> value, or `undefined` when the column rejects it.
 *
 * Columns without a `parse` accept anything as a string — the permissive
 * default, matching the old text-only editor.
 */
export function parseCellValue(
  column: { columnDef: { meta?: unknown } },
  raw: string,
  row: unknown
): { ok: true; value: unknown } | { ok: false } {
  const parse = metaOf(column).cellEdit?.parse;
  if (!parse) return { ok: true, value: raw };
  const parsed = parse(raw, row);
  return parsed === undefined ? { ok: false } : { ok: true, value: parsed };
}

/** What Delete writes into a cell. */
export function clearValueFor(column: { columnDef: { meta?: unknown } }): unknown {
  return metaOf(column).cellEdit?.clearValue ?? '';
}

/**
 * The selected cells as a rectangle of row/column ids, in visual order.
 *
 * `getSelectedCellIds()` returns ids with no geometry, which is no use for
 * writing a pasted block back. This reconstructs the rectangle from the
 * selection bounds against the current visible order — so it follows column
 * reordering and hiding rather than the definition order.
 */
export function selectionRect<TData extends RowData>(
  table: DataGridTableInstance<TData>
): { rowIds: string[]; columnIds: string[] } {
  const bounds = table.getCellSelectionBounds();
  if (!bounds.length) return { rowIds: [], columnIds: [] };

  const rows = table.getRowModel().rows;
  const columns = table.getVisibleLeafColumns();

  // Union of every range's bounds: a multi-range selection still pastes into
  // one rectangle, which is what a spreadsheet does.
  const minRow = Math.min(...bounds.map((b) => b.minRowIndex));
  const maxRow = Math.max(...bounds.map((b) => b.maxRowIndex));
  const minCol = Math.min(...bounds.map((b) => b.minColumnIndex));
  const maxCol = Math.max(...bounds.map((b) => b.maxColumnIndex));

  return {
    rowIds: rows.slice(minRow, maxRow + 1).map((r) => r.id),
    columnIds: columns.slice(minCol, maxCol + 1).map((c) => c.id),
  };
}

/** The selection as TSV, for the clipboard. */
export function selectionToTsv<TData extends RowData>(table: DataGridTableInstance<TData>): string {
  const { rowIds, columnIds } = selectionRect(table);
  if (!rowIds.length) return '';

  const block = rowIds.map((rowId) => {
    const row = table.getRow(rowId);
    return columnIds.map((columnId) => {
      const column = table.getColumn(columnId);
      const value = row.getValue(columnId);
      return column ? formatCellValue(column, value, row.original) : value;
    });
  });
  return serializeTsv(block);
}

/**
 * Applies pasted text over the selection, reporting what would not go in.
 *
 * Does not mutate anything — the grid holds no copy of the data. It returns
 * the changes for the consumer to apply, which is the same contract as
 * `onCellEdit`.
 */
export function applyPaste<TData extends RowData>(
  table: DataGridTableInstance<TData>,
  text: string,
  source: CellChangeSource = 'paste'
): CellsChangeDetails<TData> {
  const { rowIds, columnIds } = selectionRect(table);
  const changes: CellChange<TData>[] = [];
  const rejected: CellRejection[] = [];
  if (!rowIds.length) return { source, changes, rejected };

  const parsedBlock = parseTsv(text);
  if (!parsedBlock.length) return { source, changes, rejected };

  // A paste larger than the selection extends past it — anchor at the
  // top-left and grow, which is what a spreadsheet does. Smaller blocks tile
  // when they divide evenly.
  const rows = table.getRowModel().rows;
  const columns = table.getVisibleLeafColumns();
  const anchorRow = rows.findIndex((r) => r.id === rowIds[0]);
  const anchorCol = columns.findIndex((c) => c.id === columnIds[0]);

  const height = Math.max(rowIds.length, parsedBlock.length);
  const width = Math.max(columnIds.length, Math.max(...parsedBlock.map((r) => r.length)));
  const block = tileToFit(parsedBlock, height, width);

  for (let r = 0; r < height; r++) {
    const row = rows[anchorRow + r];
    if (!row) break; // past the end of the data — ignore rather than invent rows
    for (let c = 0; c < width; c++) {
      const column = columns[anchorCol + c];
      if (!column) break;
      const raw = block[r]?.[c];
      if (raw === undefined) continue;

      if (!isColumnEditable(column, row.original)) {
        rejected.push({ rowId: row.id, columnId: column.id, raw, reason: 'readonly' });
        continue;
      }
      const parsed = parseCellValue(column, raw, row.original);
      if (!parsed.ok) {
        rejected.push({ rowId: row.id, columnId: column.id, raw, reason: 'invalid' });
        continue;
      }
      const previousValue = row.getValue(column.id);
      // Skip no-ops so a paste of identical values is not reported as edits.
      if (parsed.value === previousValue) continue;
      changes.push({
        rowId: row.id,
        columnId: column.id,
        row: row.original,
        previousValue,
        value: parsed.value,
      });
    }
  }

  return { source, changes, rejected };
}

/** Clears every selected cell that accepts writes. */
export function applyClear<TData extends RowData>(
  table: DataGridTableInstance<TData>
): CellsChangeDetails<TData> {
  const { rowIds, columnIds } = selectionRect(table);
  const changes: CellChange<TData>[] = [];
  const rejected: CellRejection[] = [];

  for (const rowId of rowIds) {
    const row = table.getRow(rowId);
    for (const columnId of columnIds) {
      const column = table.getColumn(columnId);
      if (!column) continue;
      if (!isColumnEditable(column, row.original)) {
        rejected.push({ rowId, columnId, raw: '', reason: 'readonly' });
        continue;
      }
      const previousValue = row.getValue(columnId);
      const value = clearValueFor(column);
      if (value === previousValue) continue;
      changes.push({ rowId, columnId, row: row.original, previousValue, value });
    }
  }
  return { source: 'clear', changes, rejected };
}

/**
 * Fills the selection from its first row (down) or first column (right).
 *
 * The keyboard half of the fill handle — Ctrl/Cmd+D and Ctrl/Cmd+R. Without
 * these, fill is mouse-only: axe passes and WCAG 2.1.1 fails.
 */
export function applyFill<TData extends RowData>(
  table: DataGridTableInstance<TData>,
  direction: 'down' | 'right'
): CellsChangeDetails<TData> {
  const { rowIds, columnIds } = selectionRect(table);
  const changes: CellChange<TData>[] = [];
  const rejected: CellRejection[] = [];
  if (rowIds.length === 0 || columnIds.length === 0) return { source: 'fill', changes, rejected };

  for (const rowId of rowIds) {
    const row = table.getRow(rowId);
    for (const columnId of columnIds) {
      const column = table.getColumn(columnId);
      if (!column) continue;

      // The source cell: top of the column for a fill down, start of the row
      // for a fill right.
      const sourceRowId = direction === 'down' ? rowIds[0] : rowId;
      const sourceColumnId = direction === 'down' ? columnId : columnIds[0];
      if (sourceRowId === rowId && sourceColumnId === columnId) continue;

      if (!isColumnEditable(column, row.original)) {
        rejected.push({ rowId, columnId, raw: '', reason: 'readonly' });
        continue;
      }
      const value = table.getRow(sourceRowId).getValue(sourceColumnId);
      const previousValue = row.getValue(columnId);
      if (value === previousValue) continue;
      changes.push({ rowId, columnId, row: row.original, previousValue, value });
    }
  }
  return { source: 'fill', changes, rejected };
}

/** Human-readable summary of a batch, for the grid's live region. */
export function describeChanges<TData>(details: CellsChangeDetails<TData>): string {
  const { source, changes, rejected } = details;
  const verb =
    source === 'paste' ? 'Pasted' : source === 'fill' ? 'Filled' : source === 'clear' ? 'Cleared' : 'Changed';
  const parts = [`${verb} ${changes.length} cell${changes.length === 1 ? '' : 's'}`];
  if (rejected.length) {
    const readonly = rejected.filter((r) => r.reason === 'readonly').length;
    const invalid = rejected.length - readonly;
    if (readonly) parts.push(`${readonly} read-only`);
    if (invalid) parts.push(`${invalid} invalid`);
    parts.push('skipped');
  }
  return `${parts.join(', ')}.`;
}
