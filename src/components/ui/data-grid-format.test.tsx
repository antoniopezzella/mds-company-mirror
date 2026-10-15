import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';

import { DataTable } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';
import { FormatProvider } from '@/lib/format-context';

/**
 * `meta.type` → cell formatting.
 *
 * `meta.type` used to drive only right-alignment; the raw value still reached
 * the cell, so a currency column read "1234.5" instead of "$1,234.50". These
 * tests pin the wiring that runs the value through `formatValue` when a column
 * declares a formattable type AND defines no custom `cell` — and, just as
 * importantly, that a custom `cell` is left completely alone.
 */

interface Row {
  id: number;
  name: string;
  premium: number;
  renewal: string;
  lossRatio: number;
  note: string;
}

const data: Row[] = [
  {
    id: 1,
    name: 'Commercial Auto',
    premium: 1234.5,
    renewal: '2026-03-14',
    lossRatio: 12.5,
    note: 'raw text',
  },
];

/** The row cell under a given accessible column, as rendered text. */
function cellText(): HTMLElement {
  return within(screen.getByRole('table')).getAllByRole('row')[1];
}

describe('meta.type cell formatting', () => {
  it('formats a currency column through formatValue (USD/en-US default)', () => {
    const columns: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Policy' },
      { accessorKey: 'premium', header: 'Premium', meta: { type: 'currency' } },
    ];
    render(<DataTable columns={columns} data={data} />);
    expect(within(cellText()).getByText('$1,234.50')).toBeInTheDocument();
    // The raw value must not survive anywhere in the row.
    expect(within(cellText()).queryByText('1234.5')).not.toBeInTheDocument();
  });

  it('formats a date column (ISO date-only → short style)', () => {
    const columns: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Policy' },
      { accessorKey: 'renewal', header: 'Renewal', meta: { type: 'date' } },
    ];
    render(<DataTable columns={columns} data={data} />);
    // en-US short style orders month-first ("Mar 14, 2026"). The point is the
    // ISO string is formatted, not that any one locale's order is hardcoded.
    expect(within(cellText()).getByText('Mar 14, 2026')).toBeInTheDocument();
    expect(within(cellText()).queryByText('2026-03-14')).not.toBeInTheDocument();
  });

  it('formats a percent column (value is already a percentage, not a ratio)', () => {
    const columns: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Policy' },
      { accessorKey: 'lossRatio', header: 'Loss ratio', meta: { type: 'percent' } },
    ];
    render(<DataTable columns={columns} data={data} />);
    expect(within(cellText()).getByText('12.5%')).toBeInTheDocument();
  });

  it('leaves a custom cell renderer untouched even when meta.type is set', () => {
    const columns: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Policy' },
      {
        accessorKey: 'premium',
        header: 'Premium',
        meta: { type: 'currency' },
        // A custom cell declares its own formatting — the grid must defer to it.
        cell: ({ getValue }) => <span>CUSTOM {String(getValue())}</span>,
      },
    ];
    render(<DataTable columns={columns} data={data} />);
    expect(within(cellText()).getByText('CUSTOM 1234.5')).toBeInTheDocument();
    expect(within(cellText()).queryByText('$1,234.50')).not.toBeInTheDocument();
  });

  it('leaves a column with no meta.type exactly as before', () => {
    const columns: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Policy' },
      { accessorKey: 'note', header: 'Note' },
    ];
    render(<DataTable columns={columns} data={data} />);
    expect(within(cellText()).getByText('raw text')).toBeInTheDocument();
  });

  it('honours a FormatProvider currency override', () => {
    const columns: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Policy' },
      { accessorKey: 'premium', header: 'Premium', meta: { type: 'currency' } },
    ];
    render(
      <FormatProvider locale="en-US" currency="EUR">
        <DataTable columns={columns} data={data} />
      </FormatProvider>
    );
    expect(within(cellText()).getByText('€1,234.50')).toBeInTheDocument();
  });
});
