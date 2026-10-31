import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';

import { DataTable } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';
import { DataGridCellEditor } from './data-grid-cell-edit';

/**
 * Cell editing (hand-off §5 Cell (editable)): Esc cancels, Enter commits.
 * Both are asserted so the Esc test is known to be able to fail — the same
 * harness DOES report a commit.
 */

interface Row {
  id: string;
  name: string;
}

const data: Row[] = [
  { id: 'a', name: 'Alpha' },
  { id: 'b', name: 'Bravo' },
];
const columns: DataGridColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Name', meta: { cellEdit: { editable: true } } },
];

const cellAt = (rowIndex: number) =>
  within(within(screen.getByRole('grid')).getAllByRole('row')[rowIndex + 1]).getAllByRole('gridcell')[0];

const openEditor = (rowIndex: number) => {
  fireEvent.mouseDown(cellAt(rowIndex));
  fireEvent.keyDown(cellAt(rowIndex), { key: 'Enter' });
  return screen.getByRole('textbox', { name: /^Edit Name/ });
};

describe('grid cell editing', () => {
  const setup = (onCellsChange = vi.fn()) => {
    render(
      <DataTable columns={columns} data={data} pinFirstColumn={false} enableCellSelection onCellsChange={onCellsChange} />
    );
    return onCellsChange;
  };

  it('cancels on Esc without calling onCellsChange, and keeps the old value', () => {
    const onCellsChange = setup();
    const input = openEditor(0);
    fireEvent.change(input, { target: { value: 'Discarded' } });
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(screen.queryByRole('textbox', { name: /^Edit Name/ })).not.toBeInTheDocument();
    expect(onCellsChange).not.toHaveBeenCalled();
    expect(cellAt(0)).toHaveTextContent('Alpha');
    // Focus goes back to the cell, so the keyboard user is where they were.
    expect(document.activeElement).toBe(cellAt(0));
  });

  it('commits on Enter through onCellsChange (the control for the Esc test)', () => {
    const onCellsChange = setup();
    const input = openEditor(0);
    fireEvent.change(input, { target: { value: 'Alpha 2' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCellsChange).toHaveBeenCalledTimes(1);
    expect(onCellsChange.mock.calls[0][0]).toMatchObject({
      source: 'edit',
      changes: [expect.objectContaining({ columnId: 'name', value: 'Alpha 2' })],
    });
  });
});

describe('DataGridCellEditor', () => {
  it('reports cancel on Esc and never commit', () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();
    render(<DataGridCellEditor value="Alpha" ariaLabel="Edit Name" onCommit={onCommit} onCancel={onCancel} />);
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Edit Name' }), { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onCommit).not.toHaveBeenCalled();
  });
});
