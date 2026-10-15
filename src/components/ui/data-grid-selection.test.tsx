import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { useTable } from '@tanstack/react-table';

import { dataGridFeatures, type DataGridColumnDef } from './data-grid-features';
import { DataTable, createSelectColumn } from './data-table';
import { DataGridSelectionBanner, useSelectionScope } from './data-grid-selection';

interface Asset {
  id: string;
  name: string;
}

const rows: Asset[] = Array.from({ length: 5 }, (_, i) => ({
  id: `a${i + 1}`,
  name: `Asset 104${28 + i}`,
}));

describe('accessible names identify the RECORD, not the position', () => {
  const columns: DataGridColumnDef<Asset>[] = [
    createSelectColumn<Asset>({ getRowLabel: (r) => r.name }),
    { accessorKey: 'name', header: 'Asset' },
  ];

  it('names each checkbox after the row it selects', () => {
    // "Select row 3" changes meaning when the table sorts, and identifies
    // nothing. The spec asks for "Select Asset 10428".
    render(<DataTable columns={columns} data={rows} pinFirstColumn={false} enableRowSelection />);
    expect(screen.getByRole('checkbox', { name: 'Select Asset 10428' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: /Select row \d/ })).toBeNull();
  });

  it('says the header checkbox selects the PAGE, not everything', () => {
    // It calls toggleAllPageRowsSelected. Announcing that as "Select all
    // rows" is the ambiguity that makes a following bulk delete dangerous.
    render(<DataTable columns={columns} data={rows} pinFirstColumn={false} enableRowSelection />);
    expect(
      screen.getByRole('checkbox', { name: 'Select all rows on this page' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Select all rows' })).toBeNull();
  });

  it('falls back to a positional name only when no label builder is given', () => {
    render(
      <DataTable
        columns={[createSelectColumn<Asset>(), { accessorKey: 'name', header: 'Asset' }]}
        data={rows}
        pinFirstColumn={false}
        enableRowSelection
      />
    );
    expect(screen.getByRole('checkbox', { name: 'Select row 1' })).toBeInTheDocument();
  });
});

/** A harness that wires the scope hook to a real table instance. */
function Harness({ total, onScope }: { total: number; onScope?: (s: unknown) => void }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useTable({
    features: dataGridFeatures,
    columns: [createSelectColumn<Asset>({ getRowLabel: (r) => r.name }), { accessorKey: 'name', header: 'Asset' }],
    data: rows,
    getRowId: (r) => r.id,
    enableRowSelection: true,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
  });
  const scope = useSelectionScope(table, { totalFilteredCount: total });
  onScope?.(scope);
  return (
    <div>
      <DataGridSelectionBanner {...scope} itemNoun="asset" />
      <button type="button" onClick={() => table.toggleAllPageRowsSelected(true)}>
        select page
      </button>
      <button type="button" onClick={() => table.getRowModel().rows[0].toggleSelected(true)}>
        select one
      </button>
      <button type="button" onClick={() => table.getRowModel().rows[0].toggleSelected(false)}>
        deselect one
      </button>
    </div>
  );
}

describe('select-all scope', () => {
  it('shows nothing until something is selected', () => {
    render(<Harness total={1284} />);
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('offers the escalation only when the page is full AND more records match', () => {
    render(<Harness total={1284} />);
    fireEvent.click(screen.getByText('select one'));
    // One row selected: the page is not full, so "select all 1,284" would be
    // a non-sequitur.
    expect(screen.queryByRole('button', { name: /Select all 1,284/ })).toBeNull();

    fireEvent.click(screen.getByText('select page'));
    expect(screen.getByRole('button', { name: 'Select all 1,284 results' })).toBeInTheDocument();
  });

  it('does not offer it when the page IS the whole result set', () => {
    // 5 rows, 5 results. "Select all 5" after selecting 5 is noise.
    render(<Harness total={5} />);
    fireEvent.click(screen.getByText('select page'));
    expect(screen.queryByRole('button', { name: /Select all/ })).toBeNull();
  });

  it('states the scope differently once escalated', () => {
    render(<Harness total={1284} />);
    fireEvent.click(screen.getByText('select page'));
    expect(screen.getByRole('status')).toHaveTextContent('5 assets selected on this page');

    fireEvent.click(screen.getByRole('button', { name: 'Select all 1,284 results' }));
    expect(screen.getByRole('status')).toHaveTextContent(
      'All 1,284 assets matching the current filters are selected'
    );
  });

  it('exposes allFilteredRowsSelected so a bulk action can branch on it', () => {
    // The flag is the whole point: with it set, selectedRowIds describes only
    // the loaded page and is the WRONG thing to send to a bulk endpoint.
    const seen: Array<{ allFilteredRowsSelected: boolean; selectedRowIds: string[] }> = [];
    render(<Harness total={1284} onScope={(s) => seen.push(s as never)} />);
    fireEvent.click(screen.getByText('select page'));
    fireEvent.click(screen.getByRole('button', { name: 'Select all 1,284 results' }));
    const last = seen[seen.length - 1];
    expect(last.allFilteredRowsSelected).toBe(true);
    // Still only the page's ids — deliberately. There are no row objects for
    // the other 1,279 in server mode.
    expect(last.selectedRowIds).toHaveLength(5);
  });

  it('retreats from the escalation when the user changes the selection', () => {
    // Otherwise a stale "all results" flag makes the NEXT bulk action operate
    // on far more than the user can see.
    render(<Harness total={1284} />);
    fireEvent.click(screen.getByText('select page'));
    fireEvent.click(screen.getByRole('button', { name: 'Select all 1,284 results' }));
    expect(screen.getByRole('status')).toHaveTextContent('All 1,284');

    // Unticking one row is a retreat to per-row selection.
    fireEvent.click(screen.getByText('deselect one'));
    expect(screen.getByRole('status')).not.toHaveTextContent('All 1,284');
  });

  it('announces the scope politely, because it changes without focus moving', () => {
    render(<Harness total={1284} />);
    fireEvent.click(screen.getByText('select page'));
    const banner = screen.getByRole('status');
    expect(banner).toHaveAttribute('aria-live', 'polite');
  });

  it('clears both the rows and the escalation', () => {
    render(<Harness total={1284} />);
    fireEvent.click(screen.getByText('select page'));
    fireEvent.click(screen.getByRole('button', { name: 'Select all 1,284 results' }));
    fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(screen.queryByRole('status')).toBeNull();
  });
});
