/**
 * TSV serialisation for grid cell ranges.
 *
 * Tab-separated, not CSV, because that is what Excel, Numbers and Google
 * Sheets put on the clipboard and expect back. Pasting CSV into a spreadsheet
 * drops everything into one column.
 *
 * Pure on purpose: the clipboard API is permission-gated in browsers and
 * absent in jsdom, so the only way to test this properly is to test the
 * serialiser and parser as functions and test the key bindings separately.
 */

/** A cell value on its way to the clipboard. */
export type ClipboardValue = unknown;

const NEEDS_QUOTING = /[\t\n\r"]/;

/**
 * One cell, quoted only when it has to be.
 *
 * The rules are the spreadsheet dialect of RFC 4180: wrap in double quotes if
 * the value contains a tab, newline or quote, and double any internal quote.
 * Quoting unconditionally would work too, but it makes a plain paste into a
 * text editor unreadable.
 */
function serializeCell(value: ClipboardValue): string {
  if (value === null || value === undefined) return '';
  const s = String(value);
  return NEEDS_QUOTING.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/**
 * A rectangular block of values to a TSV string.
 *
 * Takes the shape `getSelectedCellRangesData()` returns for a single range:
 * rows of cells.
 */
export function serializeTsv(rows: ClipboardValue[][]): string {
  return rows.map((row) => row.map(serializeCell).join('\t')).join('\n');
}

/**
 * TSV back to a rectangular block of strings.
 *
 * Hand-written rather than split('\n').map(split('\t')): a quoted cell may
 * legitimately contain both, and splitting first destroys exactly the values
 * that were quoted because they needed protecting. Anything pasted from a
 * spreadsheet with a multi-line note in a cell hits this.
 *
 * Returns rows of strings — coercion to the column's own type is the caller's
 * job, via the column's `parse`.
 */
export function parseTsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  let i = 0;

  const endCell = () => {
    row.push(cell);
    cell = '';
  };
  const endRow = () => {
    endCell();
    rows.push(row);
    row = [];
  };

  while (i < text.length) {
    const ch = text[i];

    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          // An escaped quote inside a quoted cell.
          cell += '"';
          i += 2;
          continue;
        }
        quoted = false;
        i += 1;
        continue;
      }
      cell += ch;
      i += 1;
      continue;
    }

    if (ch === '"' && cell === '') {
      // Only opens a quoted cell at the start of one — a quote mid-value is
      // literal, which is what a spreadsheet does with 6" pipe.
      quoted = true;
      i += 1;
      continue;
    }
    if (ch === '\t') {
      endCell();
      i += 1;
      continue;
    }
    if (ch === '\r') {
      // Normalise CRLF; a lone CR is treated as a row break too.
      if (text[i + 1] === '\n') i += 1;
      endRow();
      i += 1;
      continue;
    }
    if (ch === '\n') {
      endRow();
      i += 1;
      continue;
    }
    cell += ch;
    i += 1;
  }

  // A trailing newline is a terminator, not an empty final row — spreadsheets
  // add one, and treating it as a row pastes a blank line every round trip.
  if (cell !== '' || row.length > 0) endRow();

  return rows;
}

/**
 * Pads a pasted block out to the target rectangle by repeating it.
 *
 * Copying one cell and pasting over ten is the single most common spreadsheet
 * gesture, and tiling is what every spreadsheet does. Only tiles when the
 * target is a whole multiple of the source; otherwise the paste is anchored
 * at the top-left and the overflow is ignored, which is also what they do.
 */
export function tileToFit(block: string[][], rowCount: number, columnCount: number): string[][] {
  if (!block.length || !block[0]?.length) return block;
  const srcRows = block.length;
  const srcCols = block[0].length;
  if (rowCount % srcRows !== 0 || columnCount % srcCols !== 0) return block;

  return Array.from({ length: rowCount }, (_, r) =>
    Array.from({ length: columnCount }, (_, c) => block[r % srcRows][c % srcCols])
  );
}
