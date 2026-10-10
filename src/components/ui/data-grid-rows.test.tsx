import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';

import { DataTable } from './data-table';
import { createExpandColumn, createRowPinColumn, DataGridDetailPanel } from './data-grid-rows';
import type { DataGridColumnDef } from './data-grid-features';

interface Claim {
  id: string;
  client: string;
  amount: string;
  lines?: Claim[];
}

const flat: Claim[] = [
  { id: 'CLM-1', client: 'Beacon', amount: '$100' },
  { id: 'CLM-2', client: 'Harrow', amount: '$200' },
  { id: 'CLM-3', client: 'Vantage', amount: '$300' },
];

const nested: Claim[] = [
  {
    id: 'CLM-1',
    client: 'Beacon',
    amount: '$100',
    lines: [
      { id: 'CLM-1-a', client: 'Beacon / property', amount: '$60' },
      { id: 'CLM-1-b', client: 'Beacon / liability', amount: '$40' },
    ],
  },
  { id: 'CLM-2', client: 'Harrow', amount: '$200' },
];

const base: DataGridColumnDef<Claim>[] = [
  { accessorKey: 'id', header: 'Claim' },
  { accessorKey: 'client', header: 'Client' },
  { accessorKey: 'amount', header: 'Amount' },
];

const rowText = () =>
  within(screen.getByRole('table'))
    .getAllByRole('row')
    .slice(1)
    .map((r) => r.textContent?.replace(/\s+/g, ' ').trim() ?? '');

describe('master-detail expansion', () => {
  const columns = [createExpandColumn<Claim>(), ...base];

  const setup = () =>
    render(
      <DataTable
        columns={columns}
        data={flat}
        pinFirstColumn={false}
        getSubRows={() => undefined}
        renderDetail={(row) => (
          <DataGridDetailPanel>Adjuster notes for {row.original.id}</DataGridDetailPanel>
        )}
      />
    );

  it('renders no detail panel until the row is expanded', () => {
    setup();
    expect(screen.queryByText(/Adjuster notes/)).not.toBeInTheDocument();
  });

  it('expands and collapses, and reports state on the toggle', () => {
    setup();
    const toggle = screen.getByRole('button', { name: 'Toggle row 1' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Adjuster notes for CLM-1')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(/Adjuster notes/)).not.toBeInTheDocument();
  });

  it('makes flat rows expandable on its own, because the panel is otherwise unreachable', () => {
    // TanStack's default `getCanExpand()` is "this row has subRows". For
    // master-detail over flat data that is always false, so the toggle never
    // renders and `renderDetail` can never fire. Supplying `renderDetail`
    // has to imply expandability.
    setup();
    expect(screen.getAllByRole('button', { name: /Toggle row/ })).toHaveLength(flat.length);
  });

  it('narrows which rows can expand via canExpandRow', () => {
    render(
      <DataTable
        columns={columns}
        data={flat}
        pinFirstColumn={false}
        canExpandRow={(c) => c.id === 'CLM-2'}
        renderDetail={(row) => <DataGridDetailPanel>Notes for {row.original.id}</DataGridDetailPanel>}
      />
    );
    expect(screen.getAllByRole('button', { name: /Toggle row/ })).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Toggle row 2' })).toBeInTheDocument();
  });

  it('puts the panel in a real row of the table, not outside it', () => {
    // A detail panel rendered outside the <table> loses its association with
    // the row it belongs to — a screen reader would read it as unrelated
    // content following the grid.
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle row 1' }));

    const panel = screen.getByText('Adjuster notes for CLM-1');
    expect(panel.closest('table')).toBe(screen.getByRole('table'));
    const cell = panel.closest('td');
    expect(cell).toHaveAttribute('colspan', String(columns.length));
  });
});

describe('sub-rows', () => {
  const columns = [createExpandColumn<Claim>(), ...base];

  it('renders nested rows inline, not as a detail panel', () => {
    render(
      <DataTable columns={columns} data={nested} pinFirstColumn={false} getSubRows={(r) => r.lines} />
    );
    expect(rowText().some((t) => t.includes('CLM-1-a'))).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle row 1' }));

    const text = rowText();
    expect(text.some((t) => t.includes('CLM-1-a'))).toBe(true);
    expect(text.some((t) => t.includes('CLM-1-b'))).toBe(true);
    // Sub-rows are ordinary rows, so they sit between their parent and the
    // next top-level row.
    expect(text.findIndex((t) => t.includes('CLM-1-a'))).toBeLessThan(
      text.findIndex((t) => t.includes('CLM-2'))
    );
  });

  it('offers no toggle on a leaf row, but keeps the cell for alignment', () => {
    render(
      <DataTable columns={columns} data={nested} pinFirstColumn={false} getSubRows={(r) => r.lines} />
    );
    // CLM-2 has no lines.
    expect(screen.queryByRole('button', { name: 'Toggle row 2' })).not.toBeInTheDocument();
    // Every row still has the same number of cells.
    const counts = within(screen.getByRole('table'))
      .getAllByRole('row')
      .slice(1)
      .map((r) => within(r).getAllByRole('cell').length);
    expect(new Set(counts).size).toBe(1);
  });
});

describe('row pinning', () => {
  const columns = [createRowPinColumn<Claim>(), ...base];

  it('renders no pin control unless enabled', () => {
    render(<DataTable columns={columns} data={flat} pinFirstColumn={false} />);
    expect(screen.queryByRole('button', { name: /Pin row/ })).not.toBeInTheDocument();
  });

  it('pins a row to the top, out of its sorted position', () => {
    render(<DataTable columns={columns} data={flat} pinFirstColumn={false} enableRowPinning />);
    expect(rowText()[0]).toContain('CLM-1');

    // Pin the third row.
    fireEvent.click(screen.getByRole('button', { name: 'Pin row 3' }));

    expect(rowText()[0]).toContain('CLM-3');
    expect(screen.getByRole('button', { name: 'Unpin row 3' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('unpins back to its original position', () => {
    render(<DataTable columns={columns} data={flat} pinFirstColumn={false} enableRowPinning />);
    fireEvent.click(screen.getByRole('button', { name: 'Pin row 3' }));
    fireEvent.click(screen.getByRole('button', { name: 'Unpin row 3' }));

    expect(rowText()[0]).toContain('CLM-1');
    expect(rowText()[2]).toContain('CLM-3');
  });

  it('keeps pinned rows in their own tbody so they can stick', () => {
    const { container } = render(
      <DataTable columns={columns} data={flat} pinFirstColumn={false} enableRowPinning maxHeight={200} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Pin row 2' }));

    const pinned = container.querySelector('tbody[data-pinned="top"]');
    expect(pinned).toBeInTheDocument();
    expect(pinned).toHaveStyle({ position: 'sticky' });
    expect(within(pinned as HTMLElement).getByText('CLM-2')).toBeInTheDocument();
  });
});
