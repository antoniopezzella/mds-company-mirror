import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

import { DataTable } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';
import type { CellsChangeDetails } from './data-grid-cell-selection';

interface Row {
  id: number;
  name: string;
  qty: number;
  locked: string;
}

const data: Row[] = [
  { id: 1, name: 'Alpha', qty: 10, locked: 'A' },
  { id: 2, name: 'Bravo', qty: 20, locked: 'B' },
  { id: 3, name: 'Charlie', qty: 30, locked: 'C' },
];

const columns: DataGridColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Name', meta: { cellEdit: { editable: true } } },
  {
    accessorKey: 'qty',
    header: 'Qty',
    meta: {
      cellEdit: {
        editable: true,
        // Rejects anything that is not a number — the paste path must report
        // that rather than writing NaN or silently skipping.
        parse: (raw: string) => {
          const n = Number(raw);
          return raw.trim() !== '' && Number.isFinite(n) ? n : undefined;
        },
      },
    },
  },
  { accessorKey: 'locked', header: 'Locked' }, // no cellEdit -> read-only
];

const setup = (onCellsChange?: (d: CellsChangeDetails<Row>) => void) =>
  render(
    <DataTable
      columns={columns}
      data={data}
      pinFirstColumn={false}
      enableCellSelection
      onCellsChange={onCellsChange}
    />
  );

const cellAt = (rowIndex: number, colIndex: number) => {
  const rows = within(screen.getByRole('grid')).getAllByRole('row');
  return within(rows[rowIndex + 1]).getAllByRole('gridcell')[colIndex];
};

describe('grid semantics', () => {
  it('is a plain table until cell selection is on', () => {
    // `role=grid` promises arrow-key navigation. Making that promise on a
    // static table is worse for assistive tech than staying a table.
    render(<DataTable columns={columns} data={data} pinFirstColumn={false} />);
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.queryAllByRole('gridcell')).toHaveLength(0);
  });

  it('becomes a grid with the full ARIA contract when it is', () => {
    setup();
    const grid = screen.getByRole('grid');
    // The role goes on the <table> itself — on a wrapper it would break axe's
    // aria-required-children chain.
    expect(grid.tagName).toBe('TABLE');
    expect(grid).toHaveAttribute('aria-multiselectable', 'true');
    expect(grid).toHaveAttribute('aria-rowcount', String(data.length + 1));
    expect(grid).toHaveAttribute('aria-colcount', String(columns.length));
    expect(cellAt(0, 0)).toHaveAttribute('aria-colindex', '1');
  });

  it('gives exactly one cell a tab stop — the APG roving pattern', () => {
    // Tab enters the grid at the focused cell and the next Tab leaves it.
    // Every cell being tabbable would make a 3x3 grid nine tab stops.
    setup();
    const tabbable = screen
      .getAllByRole('gridcell')
      .filter((c) => c.getAttribute('tabindex') === '0');
    expect(tabbable).toHaveLength(1);
  });
});

describe('keyboard navigation', () => {
  it('moves the focused cell with the arrow keys', () => {
    setup();
    const first = cellAt(0, 0);
    fireEvent.mouseDown(first);
    expect(first).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(cellAt(1, 0)).toHaveAttribute('aria-selected', 'true');
    expect(cellAt(0, 0)).toHaveAttribute('aria-selected', 'false');

    fireEvent.keyDown(cellAt(1, 0), { key: 'ArrowRight' });
    expect(cellAt(1, 1)).toHaveAttribute('aria-selected', 'true');
  });

  it('extends a range with shift+arrow instead of moving', () => {
    setup();
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'ArrowDown', shiftKey: true });

    // Both ends of the range are now selected, not just the new one.
    expect(cellAt(0, 0)).toHaveAttribute('aria-selected', 'true');
    expect(cellAt(1, 0)).toHaveAttribute('aria-selected', 'true');
  });

  it('selects every cell on ctrl/cmd+A', () => {
    setup();
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'a', ctrlKey: true });
    const selected = screen.getAllByRole('gridcell').filter((c) => c.getAttribute('aria-selected') === 'true');
    expect(selected).toHaveLength(data.length * columns.length);
  });
});

describe('fill handle', () => {
  const withHandle = (onCellsChange?: (d: CellsChangeDetails<Row>) => void) =>
    render(
      <DataTable
        columns={columns}
        data={data}
        pinFirstColumn={false}
        enableCellSelection
        enableFillHandle
        onCellsChange={onCellsChange}
      />
    );

  it('is absent until something is selected', () => {
    withHandle();
    expect(screen.queryByRole('button', { name: /fill selection/i })).not.toBeInTheDocument();
  });

  it('appears once, on the selection\'s bottom-right corner', () => {
    withHandle();
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'ArrowDown', shiftKey: true });

    const handles = screen.getAllByRole('button', { name: /fill selection/i });
    expect(handles).toHaveLength(1);
    // Bottom-right of the range: last row, and the only column selected.
    expect(cellAt(1, 0)).toContainElement(handles[0]);
  });

  it('fills the same way Ctrl+D does — one capability, two affordances', () => {
    const onCellsChange = vi.fn();
    withHandle(onCellsChange);
    fireEvent.mouseDown(cellAt(0, 1)); // qty = 10
    fireEvent.keyDown(cellAt(0, 1), { key: 'ArrowDown', shiftKey: true });

    fireEvent.click(screen.getByRole('button', { name: /fill selection/i }));

    const details = onCellsChange.mock.calls.at(-1)![0] as CellsChangeDetails<Row>;
    expect(details.source).toBe('fill');
    expect(details.changes).toEqual([
      expect.objectContaining({ columnId: 'qty', previousValue: 20, value: 10 }),
    ]);
  });

  it('is a real button, so it is operable without a mouse', () => {
    // A div with onPointerDown here would pass axe and fail WCAG 2.1.1.
    withHandle();
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'ArrowDown', shiftKey: true });
    const handle = screen.getByRole('button', { name: /fill selection/i });
    expect(handle.tagName).toBe('BUTTON');
    expect(handle).toHaveAttribute('type', 'button');
  });

  it('stays hidden unless asked for', () => {
    setup();
    fireEvent.mouseDown(cellAt(0, 0));
    expect(screen.queryByRole('button', { name: /fill selection/i })).not.toBeInTheDocument();
  });
});

describe('Home / End / PageUp / PageDown', () => {
  it('Home and End go to the row edges', () => {
    setup();
    fireEvent.mouseDown(cellAt(0, 1)); // middle column
    fireEvent.keyDown(cellAt(0, 1), { key: 'End' });
    expect(cellAt(0, columns.length - 1)).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(cellAt(0, columns.length - 1), { key: 'Home' });
    expect(cellAt(0, 0)).toHaveAttribute('aria-selected', 'true');
  });

  it('ctrl+End goes to the last cell of the grid', () => {
    setup();
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'End', ctrlKey: true });
    expect(cellAt(data.length - 1, columns.length - 1)).toHaveAttribute('aria-selected', 'true');
  });

  it('stops at the edge instead of wrapping', () => {
    setup();
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'Home' });
    // Already at the start — must stay, not wrap to the far end.
    expect(cellAt(0, 0)).toHaveAttribute('aria-selected', 'true');
  });

  it('PageDown moves down a viewport and shift extends', () => {
    setup();
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'PageDown' });
    // Fewer rows than a page, so it lands on the last one.
    expect(cellAt(data.length - 1, 0)).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(cellAt(data.length - 1, 0), { key: 'PageUp', shiftKey: true });
    expect(cellAt(0, 0)).toHaveAttribute('aria-selected', 'true');
    expect(cellAt(data.length - 1, 0)).toHaveAttribute('aria-selected', 'true');
  });
});

describe('grid-mode editing', () => {
  it('does NOT wrap cell content in a button, unlike the legacy path', () => {
    // The wrapper is an axe `nested-interactive` failure waiting to happen —
    // the moment a cell renders a Button, a link or a Checkbox it is a button
    // inside a button. In grid mode the <td> already carries the roving
    // tabindex and the Enter/F2 handler, so the wrapper is also redundant.
    setup();
    expect(within(cellAt(0, 0)).queryByRole('button')).not.toBeInTheDocument();
  });

  it('opens on Enter and commits the parsed value', () => {
    const onCellsChange = vi.fn();
    setup(onCellsChange);
    fireEvent.mouseDown(cellAt(0, 1)); // qty, has a parse
    fireEvent.keyDown(cellAt(0, 1), { key: 'Enter' });

    const input = screen.getByRole('textbox', { name: /edit qty/i });
    fireEvent.change(input, { target: { value: '99' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const details = onCellsChange.mock.calls.at(-1)![0] as CellsChangeDetails<Row>;
    expect(details.source).toBe('edit');
    // Parsed to a NUMBER, not handed over as the string '99'.
    expect(details.changes).toEqual([
      expect.objectContaining({ columnId: 'qty', previousValue: 10, value: 99 }),
    ]);
  });

  it('keeps the editor open and marks it invalid when parse rejects', () => {
    // Discarding what the user typed would be worse: they lose the input and
    // are told nothing.
    const onCellsChange = vi.fn();
    setup(onCellsChange);
    fireEvent.mouseDown(cellAt(0, 1));
    fireEvent.keyDown(cellAt(0, 1), { key: 'Enter' });

    const input = screen.getByRole('textbox', { name: /edit qty/i });
    fireEvent.change(input, { target: { value: 'not a number' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const still = screen.getByRole('textbox', { name: /edit qty/i });
    expect(still).toBeInTheDocument();
    expect(still).toHaveAttribute('aria-invalid', 'true');

    const details = onCellsChange.mock.calls.at(-1)![0] as CellsChangeDetails<Row>;
    expect(details.changes).toHaveLength(0);
    expect(details.rejected).toEqual([
      expect.objectContaining({ columnId: 'qty', raw: 'not a number', reason: 'invalid' }),
    ]);
  });

  it('discards on Escape without reporting a change', () => {
    const onCellsChange = vi.fn();
    setup(onCellsChange);
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'Enter' });

    const input = screen.getByRole('textbox', { name: /edit name/i });
    fireEvent.change(input, { target: { value: 'Discarded' } });
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(screen.queryByRole('textbox', { name: /edit name/i })).not.toBeInTheDocument();
    expect(onCellsChange).not.toHaveBeenCalled();
  });

  it('will not open an editor on a read-only column', () => {
    setup();
    fireEvent.mouseDown(cellAt(0, 2)); // locked
    fireEvent.keyDown(cellAt(0, 2), { key: 'Enter' });
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('lets arrow keys move the caret, not the selection, while editing', () => {
    // The APG navigation/actionable split: an arrow key inside an editor
    // belongs to the text, not to the grid.
    setup();
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'Enter' });

    const input = screen.getByRole('textbox', { name: /edit name/i });
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    // Selection did not move off the editing cell.
    expect(cellAt(0, 0)).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('textbox', { name: /edit name/i })).toBeInTheDocument();
  });
});

describe('clearing and filling', () => {
  it('clears the selection on Delete, reporting each change', () => {
    const onCellsChange = vi.fn();
    setup(onCellsChange);
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'Delete' });

    expect(onCellsChange).toHaveBeenCalledTimes(1);
    const details = onCellsChange.mock.calls[0][0] as CellsChangeDetails<Row>;
    expect(details.source).toBe('clear');
    expect(details.changes).toEqual([
      expect.objectContaining({ columnId: 'name', previousValue: 'Alpha', value: '' }),
    ]);
  });

  it('reports read-only cells as rejected rather than skipping them silently', () => {
    // The half most grids omit. Without it, clearing a selection that spans a
    // read-only column looks like it fully worked.
    const onCellsChange = vi.fn();
    setup(onCellsChange);
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'a', ctrlKey: true });
    fireEvent.keyDown(cellAt(0, 0), { key: 'Delete' });

    const details = onCellsChange.mock.calls[0][0] as CellsChangeDetails<Row>;
    const rejected = details.rejected.filter((r) => r.columnId === 'locked');
    expect(rejected).toHaveLength(data.length);
    expect(rejected[0].reason).toBe('readonly');
  });

  it('fills down from the first row of the selection on ctrl+D', () => {
    const onCellsChange = vi.fn();
    setup(onCellsChange);
    fireEvent.mouseDown(cellAt(0, 1)); // qty = 10
    fireEvent.keyDown(cellAt(0, 1), { key: 'ArrowDown', shiftKey: true });
    fireEvent.keyDown(cellAt(1, 1), { key: 'ArrowDown', shiftKey: true });
    fireEvent.keyDown(cellAt(2, 1), { key: 'd', ctrlKey: true });

    const details = onCellsChange.mock.calls.at(-1)![0] as CellsChangeDetails<Row>;
    expect(details.source).toBe('fill');
    // Rows 2 and 3 take row 1's value; row 1 is the source and unchanged.
    expect(details.changes).toEqual([
      expect.objectContaining({ columnId: 'qty', previousValue: 20, value: 10 }),
      expect.objectContaining({ columnId: 'qty', previousValue: 30, value: 10 }),
    ]);
  });

  it('announces what happened, since the change is otherwise silent', () => {
    const { container } = setup(() => {});
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'Delete' });
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('Cleared 1 cell.');
  });

  it('names the rejections in the announcement too', () => {
    const { container } = setup(() => {});
    fireEvent.mouseDown(cellAt(0, 0));
    fireEvent.keyDown(cellAt(0, 0), { key: 'a', ctrlKey: true });
    fireEvent.keyDown(cellAt(0, 0), { key: 'Delete' });
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent(/read-only.*skipped/);
  });
});
