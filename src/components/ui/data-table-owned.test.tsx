import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import * as React from 'react';

import { DataTable, createSelectColumn } from './data-table';
import { useDataGridTable } from './use-data-grid-table';
import type { DataGridColumnDef } from './data-grid-features';

interface Row { id: string; name: string; qty: number }
const rows: Row[] = [
  { id: 'a', name: 'Alpha', qty: 3 },
  { id: 'b', name: 'Bravo', qty: 7 },
];
const columns: DataGridColumnDef<Row>[] = [
  createSelectColumn<Row>({ getRowLabel: (r) => r.name }),
  { accessorKey: 'name', header: 'Item' },
  { accessorKey: 'qty', header: 'Qty' },
];

/** The case the escape hatch exists for: state read OUTSIDE the table. */
function Owned() {
  const table = useDataGridTable({ columns, data: rows, enableRowSelection: true, pinFirstColumn: false });
  const picked = table.getSelectedRowModel().rows.map((r) => r.original.name);
  return (
    <div>
      <p data-testid="outside">Reviewing: {picked.join(', ') || 'nothing'}</p>
      <DataTable
        table={table}
        columns={columns}
        data={rows}
        enableRowSelection
        searchKey="name"
        pinFirstColumn={false}
      />
    </div>
  );
}

describe('DataTable with a caller-owned instance', () => {
  it('lets something OUTSIDE the table read its selection', () => {
    // Previously this meant abandoning the preset and hand-assembling
    // DataGrid's four children — a steep price for wanting the state rather
    // than a different layout.
    render(<Owned />);
    expect(screen.getByTestId('outside')).toHaveTextContent('Reviewing: nothing');
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select Bravo' }));
    expect(screen.getByTestId('outside')).toHaveTextContent('Reviewing: Bravo');
  });

  it('keeps every other prop working — no silent no-ops', () => {
    // The reason this is a `table` prop and NOT `children`: with children
    // replacing the render, 37 of the 51 props would quietly stop working.
    render(<Owned />);
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(3);
  });

  it('still builds its own instance when none is given', () => {
    render(<DataTable columns={columns} data={rows} enableRowSelection pinFirstColumn={false} />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select Alpha' }));
    expect(screen.getByRole('checkbox', { name: 'Select Alpha' })).toBeChecked();
  });
});
