import { describe, it, expect } from 'vitest';

import { serializeTsv, parseTsv, tileToFit } from './data-grid-clipboard';

/**
 * The clipboard API is permission-gated in browsers and absent in jsdom, so
 * this tests the serialiser and parser as pure functions. The key bindings
 * that call them are covered separately.
 */

describe('serializeTsv', () => {
  it('joins cells with tabs and rows with newlines', () => {
    expect(serializeTsv([['a', 'b'], ['c', 'd']])).toBe('a\tb\nc\td');
  });

  it('renders null and undefined as empty, not as "null"', () => {
    expect(serializeTsv([[null, undefined, 0, '']])).toBe('\t\t0\t');
  });

  it('quotes only the cells that need it', () => {
    // Quoting everything would work, but it makes a paste into a plain text
    // editor unreadable.
    expect(serializeTsv([['plain', 'has\ttab']])).toBe('plain\t"has\ttab"');
    expect(serializeTsv([['has\nnewline']])).toBe('"has\nnewline"');
    expect(serializeTsv([['has "quote"']])).toBe('"has ""quote"""');
  });

  it('stringifies numbers and booleans', () => {
    expect(serializeTsv([[1, true, 2.5]])).toBe('1\ttrue\t2.5');
  });
});

describe('parseTsv', () => {
  it('splits on tabs and newlines', () => {
    expect(parseTsv('a\tb\nc\td')).toEqual([['a', 'b'], ['c', 'd']]);
  });

  it('keeps tabs and newlines that were inside a quoted cell', () => {
    // The reason this is hand-written rather than split().map(split()):
    // splitting first destroys exactly the values that were quoted because
    // they needed protecting.
    expect(parseTsv('a\t"has\ttab"\nb\tc')).toEqual([['a', 'has\ttab'], ['b', 'c']]);
    expect(parseTsv('"line1\nline2"\tb')).toEqual([['line1\nline2', 'b']]);
  });

  it('unescapes doubled quotes', () => {
    expect(parseTsv('"has ""quote"""')).toEqual([['has "quote"']]);
  });

  it('treats a quote mid-value as literal, the way a spreadsheet does', () => {
    // 6" pipe should survive a round trip as typed.
    expect(parseTsv('6" pipe')).toEqual([['6" pipe']]);
  });

  it('normalises CRLF and lone CR', () => {
    expect(parseTsv('a\tb\r\nc\td')).toEqual([['a', 'b'], ['c', 'd']]);
    expect(parseTsv('a\rb')).toEqual([['a'], ['b']]);
  });

  it('does not turn a trailing newline into an empty row', () => {
    // Spreadsheets append one, and counting it would paste a blank line on
    // every round trip.
    expect(parseTsv('a\tb\n')).toEqual([['a', 'b']]);
  });

  it('keeps genuinely empty cells', () => {
    expect(parseTsv('a\t\tc')).toEqual([['a', '', 'c']]);
    expect(parseTsv('')).toEqual([]);
  });

  it('round-trips everything the serialiser can produce', () => {
    const original = [
      ['plain', 'has\ttab', ''],
      ['has\nnewline', 'has "quote"', '6" pipe'],
    ];
    expect(parseTsv(serializeTsv(original))).toEqual(original);
  });
});

describe('tileToFit', () => {
  it('repeats a single cell across the target', () => {
    expect(tileToFit([['x']], 2, 3)).toEqual([
      ['x', 'x', 'x'],
      ['x', 'x', 'x'],
    ]);
  });

  it('repeats a row down and a column across', () => {
    expect(tileToFit([['a', 'b']], 2, 4)).toEqual([
      ['a', 'b', 'a', 'b'],
      ['a', 'b', 'a', 'b'],
    ]);
  });

  it('leaves the block alone when the target is not a whole multiple', () => {
    // Anchor top-left and ignore the overflow, which is what spreadsheets do
    // rather than tiling a partial copy.
    const block = [['a', 'b']];
    expect(tileToFit(block, 2, 3)).toBe(block);
  });

  it('handles an empty block without throwing', () => {
    expect(tileToFit([], 2, 2)).toEqual([]);
    expect(tileToFit([[]], 2, 2)).toEqual([[]]);
  });
});
