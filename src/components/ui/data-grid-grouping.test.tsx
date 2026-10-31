import { act, render, renderHook, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';

import { DataTable } from './data-table';
import type { DataGridColumnDef, DataGridTableInstance } from './data-grid-features';
import { useDataGridTable } from './use-data-grid-table';

/**
 * Grouping + aggregation (hand-off §5b#21, task T8).
 *
 * The engine half asserts the arithmetic the hand-off promises — a subtotal
 * is the sum of its leaves, and it follows a filter — because the failure
 * this replaces was exactly that: hand-authored group totals that stayed put
 * while the search narrowed the rows under them.
 */

interface Line {
  id: string;
  group: string;
  name: string;
  amount: number;
}

const lines: Line[] = [
  { id: 'a1', group: 'Cash', name: 'Opening balance', amount: 290 },
  { id: 'a2', group: 'Cash', name: 'Operating movement', amount: -47 },
  { id: 'a3', group: 'Cash', name: 'Capital inflow', amount: 10 },
  { id: 'b1', group: 'Burn', name: 'Collections', amount: 72 },
  { id: 'b2', group: 'Burn', name: 'Operating outflow', amount: -119 },
];

const columns: DataGridColumnDef<Line>[] = [
  {
    id: 'line',
    accessorKey: 'name',
    header: 'Line item',
    // Group by category, but keep the line's own name in the same column.
    getGroupingValue: (r) => r.group,
  },
  { id: 'amount', accessorKey: 'amount', header: 'Amount', aggregationFn: 'sum', meta: { align: 'right' } },
];

const groupRow = (table: DataGridTableInstance<Line>, id: string) =>
  table.getRowModel().rows.find((r) => r.id === id)!;

describe('useDataGridTable grouping', () => {
  it('groups flat rows and aggregates each group to the sum of its leaves', () => {
    const { result } = renderHook(() =>
      useDataGridTable<Line>({ columns, data: lines, grouping: ['line'], getRowId: (r) => r.id })
    );
    const rows = result.current.getRowModel().rows;
    expect(rows.map((r) => r.id)).toEqual(['line:Cash', 'line:Burn']);

    const cash = groupRow(result.current, 'line:Cash');
    expect(cash.getIsGrouped()).toBe(true);
    const leafSum = cash.getLeafRows().reduce((n, r) => n + (r.getValue('amount') as number), 0);
    expect(leafSum).toBe(253);
    expect(cash.getValue('amount')).toBe(leafSum);
    expect(groupRow(result.current, 'line:Burn').getValue('amount')).toBe(-47);
  });

  it('recomputes subtotals (and the grand total) after a column filter', () => {
    const { result } = renderHook(() =>
      useDataGridTable<Line>({ columns, data: lines, grouping: ['line'], getRowId: (r) => r.id })
    );
    expect(result.current.getColumn('amount')!.getAggregationValue()).toBe(206);

    act(() => result.current.getColumn('line')!.setFilterValue('operating'));

    const cash = groupRow(result.current, 'line:Cash');
    expect(cash.getLeafRows().map((r) => r.id)).toEqual(['a2']);
    expect(cash.getValue('amount')).toBe(-47);
    expect(groupRow(result.current, 'line:Burn').getValue('amount')).toBe(-119);
    // Grand total over the filtered rows.
    expect(result.current.getColumn('amount')!.getAggregationValue()).toBe(-166);
  });

  it('is off without `grouping` — the same flat rows as before', () => {
    const { result } = renderHook(() => useDataGridTable<Line>({ columns, data: lines }));
    expect(result.current.getRowModel().rows).toHaveLength(5);
    expect(result.current.getRowModel().rows.some((r) => r.getIsGrouped())).toBe(false);
  });
});

function Grouped() {
  const table = useDataGridTable<Line>({
    columns,
    data: lines,
    grouping: ['line'],
    getRowId: (r) => r.id,
    pinFirstColumn: false,
  });
  return <DataTable table={table} columns={columns} data={lines} searchKey="line" />;
}

describe('DataGrid group rows', () => {
  it('renders toggle, Strong label, Muted item count and Number Strong aggregate', () => {
    render(<Grouped />);
    const toggle = screen.getByRole('button', { name: 'Toggle Cash' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    const row = toggle.closest('tr')!;
    expect(row).toHaveAttribute('data-grouped', 'true');
    expect(within(row).getByText('Cash')).toHaveClass('font-bold');
    const count = within(row).getByText('3 items');
    expect(count.className).toMatch(/foreground-neutral-subtle/);
    expect(count).not.toHaveClass('font-bold');
    const total = within(row).getByText('253');
    expect(total).toHaveClass('font-bold');
    // Collapsed: no leaf of Cash is in the DOM.
    expect(screen.queryByText('Opening balance')).not.toBeInTheDocument();
  });

  it('expands with Enter and collapses with Space on the toggle', async () => {
    const user = userEvent.setup();
    render(<Grouped />);
    const toggle = screen.getByRole('button', { name: 'Toggle Cash' });

    toggle.focus();
    await user.keyboard('{Enter}');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Opening balance')).toBeInTheDocument();

    await user.keyboard(' ');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Opening balance')).not.toBeInTheDocument();
  });

  it('keeps an open group open while the search narrows its subtotal', async () => {
    const user = userEvent.setup();
    render(<Grouped />);
    await user.click(screen.getByRole('button', { name: 'Toggle Cash' }));
    await user.type(screen.getByRole('textbox', { name: /search/i }), 'operating');
    // The search is debounced 250 ms (hand-off §5).
    await waitFor(() => expect(screen.queryByText('Opening balance')).not.toBeInTheDocument());

    const toggle = screen.getByRole('button', { name: 'Toggle Cash' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const row = toggle.closest('tr')!;
    expect(within(row).getByText('1 item')).toBeInTheDocument();
    expect(within(row).getByText('-47')).toBeInTheDocument();
    expect(screen.queryByText('Opening balance')).not.toBeInTheDocument();
  });
});
