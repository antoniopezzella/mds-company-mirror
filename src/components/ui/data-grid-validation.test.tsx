import { render, screen, fireEvent, within, act } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { DataTable } from './data-table';
import type { DataGridCellError, DataGridColumnDef } from './data-grid-features';
import type { CellsChangeDetails } from './data-grid-cell-selection';
import { DataGridValidationSummary } from './data-grid-toolbar';
import { SUCCESS_MS } from './data-grid-table';

/**
 * Inline editing + the agreed validation flow (hand-off §5, §5c, §9; Figma
 * 17245:97636 and 17261:110599): the dropdown editor, the three moments, the
 * editing keys and the editor's accessible name.
 */

interface Asset {
  id: string;
  asset: string;
  type: string;
  qty: number;
}

const data: Asset[] = [
  { id: 'a', asset: 'Alpha Commercial Complex', type: 'Commercial', qty: 10 },
  { id: 'b', asset: 'Beta Industrial Park', type: 'Industrial', qty: 20 },
  { id: 'c', asset: 'Gamma Residential Tower', type: 'Residential', qty: 30 },
];

const columns: DataGridColumnDef<Asset>[] = [
  { accessorKey: 'asset', header: 'Asset' },
  {
    accessorKey: 'type',
    header: 'Property type',
    meta: {
      cellEdit: { editable: true, control: 'select', options: ['Residential', 'Commercial', 'Industrial', 'Mixed use'] },
    },
  },
  {
    accessorKey: 'qty',
    header: 'Qty',
    meta: {
      cellEdit: {
        editable: true,
        parse: (raw: string) => (raw.trim() !== '' && Number.isFinite(Number(raw)) ? Number(raw) : undefined),
        invalidMessage: 'Enter a number',
      },
    },
  },
];

function Harness({
  onCellsChange,
  defaultCellErrors,
  withSummary = false,
}: {
  onCellsChange?: (d: CellsChangeDetails<Asset>) => void;
  defaultCellErrors?: DataGridCellError[];
  withSummary?: boolean;
}) {
  return (
    <DataTable
      columns={columns}
      data={data}
      pinFirstColumn={false}
      enableCellSelection
      onCellsChange={onCellsChange ?? (() => {})}
      defaultCellErrors={defaultCellErrors}
      notice={withSummary ? <DataGridValidationSummary /> : undefined}
      footer={false}
    />
  );
}

const cellAt = (rowIndex: number, colIndex: number) => {
  const rows = within(screen.getByRole('grid')).getAllByRole('row');
  return within(rows[rowIndex + 1]).getAllByRole('gridcell')[colIndex];
};

const openAt = (rowIndex: number, colIndex: number) => {
  fireEvent.mouseDown(cellAt(rowIndex, colIndex));
  fireEvent.keyDown(cellAt(rowIndex, colIndex), { key: 'Enter' });
};

afterEach(() => vi.useRealTimers());

describe('editor accessible name (hand-off §9)', () => {
  it('names the editor with the column header and the row, not the column id', () => {
    render(<Harness />);
    openAt(1, 2);
    expect(screen.getByRole('textbox', { name: 'Edit Qty, Beta Industrial Park' })).toBeInTheDocument();
  });
});

describe("select editor (Figma Content/Editable, Dropdown)", () => {
  it('shows the value with a 16px keyboard_arrow_down in read mode', () => {
    render(<Harness />);
    const td = cellAt(0, 1);
    expect(td).toHaveTextContent('Commercial');
    expect(td.querySelector('[data-glyph="keyboard_arrow_down"]')).toBeInTheDocument();
  });

  it('opens a labelled listbox on Enter, and choosing an option commits it', () => {
    const onCellsChange = vi.fn();
    render(<Harness onCellsChange={onCellsChange} />);
    openAt(0, 1);
    const combo = screen.getByRole('combobox', { name: 'Edit Property type, Alpha Commercial Complex' });
    expect(combo).toHaveAttribute('aria-expanded', 'true');
    const list = screen.getByRole('listbox', { name: 'Edit Property type, Alpha Commercial Complex' });
    expect(combo).toHaveAttribute('aria-controls', list.id);
    // The arrow turns up while the list is open.
    expect(cellAt(0, 1).querySelector('[data-glyph="keyboard_arrow_up"]')).toBeInTheDocument();

    fireEvent.mouseDown(within(list).getByRole('option', { name: 'Mixed use' }));
    const details = onCellsChange.mock.calls.at(-1)![0] as CellsChangeDetails<Asset>;
    expect(details.changes).toEqual([
      expect.objectContaining({ columnId: 'type', previousValue: 'Commercial', value: 'Mixed use' }),
    ]);
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('picks the highlighted option with the arrow keys and Enter', () => {
    const onCellsChange = vi.fn();
    render(<Harness onCellsChange={onCellsChange} />);
    openAt(0, 1); // Commercial (index 1) is highlighted
    const combo = screen.getByRole('combobox');
    fireEvent.keyDown(combo, { key: 'ArrowDown' });
    fireEvent.keyDown(combo, { key: 'Enter' });
    expect((onCellsChange.mock.calls.at(-1)![0] as CellsChangeDetails<Asset>).changes[0].value).toBe('Industrial');
  });

  it('cancels on Escape without committing', () => {
    const onCellsChange = vi.fn();
    render(<Harness onCellsChange={onCellsChange} />);
    openAt(0, 1);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onCellsChange).not.toHaveBeenCalled();
  });

  it('pastes through the same rule: an option is written, anything else rejected', () => {
    const onCellsChange = vi.fn();
    const readText = vi.fn();
    Object.assign(navigator, { clipboard: { readText, writeText: vi.fn() } });
    render(<Harness onCellsChange={onCellsChange} />);
    fireEvent.mouseDown(cellAt(0, 1));

    return (async () => {
      readText.mockResolvedValueOnce('industrial');
      await act(async () => {
        fireEvent.keyDown(cellAt(0, 1), { key: 'v', ctrlKey: true });
      });
      expect((onCellsChange.mock.calls.at(-1)![0] as CellsChangeDetails<Asset>).changes[0].value).toBe('Industrial');

      readText.mockResolvedValueOnce('Castle');
      await act(async () => {
        fireEvent.keyDown(cellAt(0, 1), { key: 'v', ctrlKey: true });
      });
      const last = onCellsChange.mock.calls.at(-1)![0] as CellsChangeDetails<Asset>;
      expect(last.changes).toHaveLength(0);
      expect(last.rejected).toEqual([expect.objectContaining({ raw: 'Castle', reason: 'invalid' })]);
      // A bulk edit's invalid cell stays red with its text (§5c).
      expect(cellAt(0, 1)).toHaveAttribute('data-cell-state', 'error');
      expect(cellAt(0, 1)).toHaveTextContent('Castle');
    })();
  });
});

describe('moment 1 — while typing', () => {
  const typeInvalid = () => {
    openAt(0, 1);
    const combo = screen.getByRole('combobox');
    fireEvent.change(combo, { target: { value: 'Residental' } });
    fireEvent.keyDown(combo, { key: 'Enter' });
    return combo;
  };

  it('marks the input invalid and describes it with the tooltip text', () => {
    render(<Harness />);
    const combo = typeInvalid();
    expect(combo).toHaveAttribute('aria-invalid', 'true');
    const tip = screen.getByRole('tooltip');
    expect(tip).toHaveTextContent('Choose a value from the list.');
    expect(combo).toHaveAttribute('aria-describedby', tip.id);
    expect(cellAt(0, 1)).toHaveAttribute('data-cell-state', 'error');
    expect(cellAt(0, 1).querySelector('[data-glyph="cancel"]')).toBeInTheDocument();
  });

  it('Escape closes the message but stays in the cell; the next Escape cancels', () => {
    render(<Harness />);
    const combo = typeInvalid();
    expect(combo).toHaveFocus();
    fireEvent.keyDown(combo, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(combo).toBeInTheDocument();
    expect(combo).toHaveFocus();
    expect(combo).toHaveAttribute('aria-invalid', 'true');

    fireEvent.keyDown(combo, { key: 'Escape' });
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(cellAt(0, 1)).not.toHaveAttribute('data-cell-state');
  });

  it('flips the tooltip above the cell on the last row', () => {
    render(<Harness />);
    openAt(2, 2);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'x' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-placement', 'above');
  });
});

describe('moment 2 — after leaving the cell', () => {
  it('stays red with the kept text; the tooltip only on focus or hover', () => {
    render(<Harness />);
    openAt(0, 1);
    const combo = screen.getByRole('combobox');
    fireEvent.change(combo, { target: { value: 'Residental' } });
    fireEvent.blur(combo);

    const td = cellAt(0, 1);
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(td).toHaveAttribute('data-cell-state', 'error');
    expect(td).toHaveTextContent('Residental');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.focus(td);
    const tip = screen.getByRole('tooltip');
    expect(tip).toHaveTextContent('Choose a value from the list.');
    expect(td).toHaveAttribute('aria-describedby', tip.id);
    fireEvent.blur(td);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.mouseEnter(td);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.mouseLeave(td);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('reopens on the rejected text, and a valid value clears the Error', () => {
    const onCellsChange = vi.fn();
    render(<Harness onCellsChange={onCellsChange} />);
    openAt(0, 2);
    let input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ten' } });
    fireEvent.blur(input);
    expect(cellAt(0, 2)).toHaveAttribute('data-cell-state', 'error');

    openAt(0, 2);
    input = screen.getByRole('textbox');
    expect(input).toHaveValue('ten');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    fireEvent.change(input, { target: { value: '11' } });
    expect(input).not.toHaveAttribute('aria-invalid');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(cellAt(0, 2)).toHaveAttribute('data-cell-state', 'success');
  });
});

describe('moment 3 — on save: the Notice summary', () => {
  const errors: DataGridCellError[] = [
    { rowId: '2', columnId: 'type', raw: 'Resdential', message: 'Choose a value from the list.' },
    { rowId: '0', columnId: 'type', raw: 'Residental', message: 'Choose a value from the list.' },
  ];

  it('announces "N cells need fixing" in a polite live region', () => {
    render(<Harness defaultCellErrors={errors} withSummary />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('2 cells need fixing');
    expect(cellAt(0, 1)).toHaveAttribute('data-cell-state', 'error');
    expect(cellAt(2, 1)).toHaveAttribute('data-cell-state', 'error');
  });

  it('says "1 cell needs fixing" for one, and renders nothing for none', () => {
    const { unmount } = render(<Harness defaultCellErrors={[errors[0]]} withSummary />);
    expect(screen.getByRole('status')).toHaveTextContent('1 cell needs fixing');
    unmount();
    render(<Harness withSummary />);
    expect(screen.queryByText(/need(s)? fixing/)).not.toBeInTheDocument();
  });

  it('"Go to first error" focuses the first invalid cell in row order', () => {
    render(<Harness defaultCellErrors={errors} withSummary />);
    fireEvent.click(screen.getByRole('button', { name: 'Go to first error' }));
    expect(cellAt(0, 1)).toHaveFocus();
  });
});

describe('moment 3 — on bulk edit: the summary raises itself', () => {
  // "On save OR bulk edit": a paste that leaves invalid cells shows the
  // Notice summary with no consumer wiring — the Harness passes no `notice`
  // and no toolbar props, so the toolbar itself only exists because of it.
  const paste = async (text: string, rowIndex = 0, colIndex = 1) => {
    const readText = vi.fn().mockResolvedValue(text);
    Object.assign(navigator, { clipboard: { readText, writeText: vi.fn() } });
    fireEvent.mouseDown(cellAt(rowIndex, colIndex));
    await act(async () => {
      fireEvent.keyDown(cellAt(rowIndex, colIndex), { key: 'v', ctrlKey: true });
    });
  };

  it('a paste with invalid cells announces "N cells need fixing" and Go to first error focuses the first', async () => {
    render(<Harness />);
    expect(screen.queryByText(/need(s)? fixing/)).not.toBeInTheDocument();

    await paste('Castle\nIndustrial\nResdential');

    const summary = screen.getByText('2 cells need fixing').closest('[role="status"]');
    expect(summary).toHaveAttribute('aria-live', 'polite');
    expect(summary?.closest('[data-slot="data-grid-toolbar-notice"]')).toBeInTheDocument();
    expect(cellAt(0, 1)).toHaveAttribute('data-cell-state', 'error');
    expect(cellAt(2, 1)).toHaveAttribute('data-cell-state', 'error');

    fireEvent.click(screen.getByRole('button', { name: 'Go to first error' }));
    expect(cellAt(0, 1)).toHaveFocus();
  });

  it('goes away once the cells are fixed, and a later typed error does not bring it back', async () => {
    render(<Harness />);
    await paste('Castle');
    expect(screen.getByText('1 cell needs fixing')).toBeInTheDocument();

    await paste('Industrial');
    expect(screen.queryByText(/need(s)? fixing/)).not.toBeInTheDocument();

    // A single typed edit reports in place (moment 1's tooltip), not here.
    openAt(1, 2);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(cellAt(1, 2)).toHaveAttribute('data-cell-state', 'error');
    expect(screen.queryByText(/need(s)? fixing/)).not.toBeInTheDocument();
  });

  it('its close button dismisses it while the cells stay red', async () => {
    render(<Harness />);
    await paste('Castle');
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText(/need(s)? fixing/)).not.toBeInTheDocument();
    expect(cellAt(0, 1)).toHaveAttribute('data-cell-state', 'error');
  });
});

describe('editing keys (hand-off §5, Cell (editable))', () => {
  it('Enter commits and moves focus to the cell below', () => {
    render(<Harness />);
    openAt(0, 2);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '15' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(cellAt(1, 2)).toHaveFocus();
  });

  it('Tab commits and moves focus to the next cell; Shift+Tab to the previous', () => {
    const onCellsChange = vi.fn();
    render(<Harness onCellsChange={onCellsChange} />);
    openAt(0, 1);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
    openAt(0, 2);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '12' } });
    fireEvent.keyDown(input, { key: 'Tab', shiftKey: true });
    expect(onCellsChange.mock.calls.at(-1)![0].changes[0]).toMatchObject({ columnId: 'qty', value: 12 });
    expect(cellAt(0, 1)).toHaveFocus();

    openAt(1, 1);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Tab' });
    expect(cellAt(1, 2)).toHaveFocus();
  });

  it('a printable key opens the editor seeded with that character', () => {
    render(<Harness />);
    fireEvent.mouseDown(cellAt(0, 2));
    fireEvent.keyDown(cellAt(0, 2), { key: '7' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('7');
    expect(input).toHaveFocus();
    // Not selected: the next keystroke appends instead of replacing.
    expect((input as HTMLInputElement).selectionStart).toBe(1);
  });

  it('a printable key with a modifier is a shortcut, not text', () => {
    render(<Harness />);
    fireEvent.mouseDown(cellAt(0, 2));
    fireEvent.keyDown(cellAt(0, 2), { key: 'b', ctrlKey: true });
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('a resolved save shows Success for about 2 s, then None', () => {
    vi.useFakeTimers();
    render(<Harness />);
    openAt(0, 2);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '44' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(cellAt(0, 2)).toHaveAttribute('data-cell-state', 'success');
    act(() => vi.advanceTimersByTime(SUCCESS_MS - 1));
    expect(cellAt(0, 2)).toHaveAttribute('data-cell-state', 'success');
    act(() => vi.advanceTimersByTime(1));
    expect(cellAt(0, 2)).not.toHaveAttribute('data-cell-state');
  });
});
