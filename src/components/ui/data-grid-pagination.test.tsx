import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';

import { DataTable, createSelectColumn } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';

/**
 * DataGridPagination: after a page change, focus lands on the new page's
 * first body row (hand-off §5 Pagination).
 */

interface Row {
  id: string;
  name: string;
}

const data: Row[] = Array.from({ length: 7 }, (_, i) => ({ id: `r${i}`, name: `Policy ${i + 1}` }));
const base: DataGridColumnDef<Row>[] = [{ accessorKey: 'name', header: 'Policy' }];

const firstBodyRow = () => within(screen.getByRole('table')).getAllByRole('row')[1];

describe('focus after a page change', () => {
  it('moves to the first focusable control in the first body row', () => {
    render(
      <DataTable
        columns={[createSelectColumn<Row>({ getRowLabel: (r) => r.name }), ...base]}
        data={data}
        enableRowSelection
        pageSize={3}
      />
    );
    const next = screen.getByRole('button', { name: 'Next page' });
    next.focus();
    fireEvent.click(next);

    expect(firstBodyRow()).toHaveTextContent('Policy 4');
    expect(document.activeElement).toBe(within(firstBodyRow()).getByRole('checkbox', { name: 'Select Policy 4' }));
  });

  it('focuses the row itself when it holds nothing focusable, without making it a tab stop', () => {
    render(<DataTable columns={base} data={data} pageSize={3} />);
    fireEvent.click(screen.getByRole('button', { name: 'Last page' }));
    expect(firstBodyRow()).toHaveTextContent('Policy 7');
    expect(document.activeElement).toBe(firstBodyRow());
    expect(firstBodyRow()).toHaveAttribute('tabindex', '-1');

    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(firstBodyRow()).toHaveTextContent('Policy 4');
    expect(firstBodyRow().contains(document.activeElement)).toBe(true);
  });

  it('does the same from a numbered page item', () => {
    render(<DataTable columns={base} data={data} pageSize={3} paginationVariant="pages" />);
    fireEvent.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(firstBodyRow()).toHaveTextContent('Policy 4');
    expect(document.activeElement).toBe(firstBodyRow());
  });

  it('waits for a server page to arrive before moving focus', () => {
    const page = (i: number) => data.slice(i * 3, i * 3 + 3);
    const props = {
      columns: base,
      pageSize: 3,
      manualPagination: true,
      pageCount: 3,
      rowCount: data.length,
    } as const;
    const { rerender } = render(<DataTable {...props} data={page(0)} />);
    const next = screen.getByRole('button', { name: 'Next page' });
    next.focus();
    fireEvent.click(next);
    // The fetch is in flight: the old rows are still up, dimmed.
    rerender(<DataTable {...props} data={page(0)} fetching />);
    expect(document.activeElement).toBe(next);

    rerender(<DataTable {...props} data={page(1)} />);
    expect(firstBodyRow()).toHaveTextContent('Policy 4');
    expect(document.activeElement).toBe(firstBodyRow());
  });

  it('leaves focus alone when nothing changed page', () => {
    render(<DataTable columns={base} data={data} pageSize={3} />);
    const first = screen.getByRole('button', { name: 'First page' });
    expect(first).toBeDisabled();
    const next = screen.getByRole('button', { name: 'Next page' });
    next.focus();
    // Sorting re-renders the body, but it is not a page change.
    fireEvent.click(within(screen.getByRole('columnheader', { name: /^Policy/ })).getByRole('button', { name: /^Policy/ }));
    expect(document.activeElement).not.toBe(firstBodyRow());
  });
});

describe('rows per page', () => {
  it('goes back to page 1 when the page size changes', () => {
    render(<DataTable columns={base} data={data} pageSize={3} pageSizeOptions={[3, 5]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Last page' }));
    expect(firstBodyRow()).toHaveTextContent('Policy 7');

    // Radix Select opens on keyboard in jsdom (it listens for pointerdown,
    // not click), and an item commits on Enter.
    fireEvent.keyDown(screen.getByRole('combobox', { name: /rows per page/i }), { key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('option', { name: '5' }), { key: 'Enter' });

    expect(firstBodyRow()).toHaveTextContent('Policy 1');
    const body = within(screen.getByRole('table')).getAllByRole('row').slice(1);
    expect(body).toHaveLength(5);
    expect(screen.getByText(/1–5 of 7/)).toBeInTheDocument();
  });

  it('shows a page size that is not among the options instead of a blank select', () => {
    // Default options are 10/25/50/100; 3 used to leave the trigger empty.
    render(<DataTable columns={base} data={data} pageSize={3} />);
    const trigger = screen.getByRole('combobox', { name: /rows per page/i });
    expect(trigger).toHaveTextContent('3');

    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual(['3', '10', '25', '50', '100']);
  });
});
