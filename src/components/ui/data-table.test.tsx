import type { DataGridColumnDef } from './data-grid-features';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { DataTable, createSelectColumn } from './data-table';

/**
 * Unit coverage for the behaviour that isn't obvious from the stories:
 * filtering semantics, the two distinct empty states, export value extraction,
 * manual pagination, and inline editing's commit/discard contract.
 *
 * The stories already exercise rendering in a real browser via the Storybook
 * Vitest project; these assert the logic underneath, which stories can't
 * easily pin down.
 */

interface Row {
  id: number;
  name: string;
  status: string;
  premium: string;
}

const data: Row[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active', premium: '$12,400' },
  { id: 2, name: 'General Liability', status: 'Active', premium: '$8,200' },
  { id: 3, name: 'Cyber Liability', status: 'Pending', premium: '$15,900' },
  { id: 4, name: 'Property', status: 'Expired', premium: '$22,000' },
];

const columns: DataGridColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Policy', enableSorting: true },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'premium', header: 'Premium', enableSorting: true },
];

const bodyRows = () => within(screen.getByRole('table')).getAllByRole('row').slice(1);

describe('DataTable', () => {
  it('renders one row per record plus a header row', () => {
    render(<DataTable columns={columns} data={data} pageSize={10} />);
    expect(bodyRows()).toHaveLength(data.length);
  });

  it('paginates and reports position as "Page X of Y"', () => {
    render(<DataTable columns={columns} data={data} pageSize={2} />);
    expect(bodyRows()).toHaveLength(2);
    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
  });

  it('filters rows by the search key', () => {
    render(<DataTable columns={columns} data={data} searchKey="name" pageSize={10} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Cyber' } });
    const rows = bodyRows();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent('Cyber Liability');
  });

  it('clears the search from inside the field and restores every row', () => {
    render(<DataTable columns={columns} data={data} searchKey="name" pageSize={10} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Cyber' } });
    expect(bodyRows()).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: 'Clear search field' }));
    expect(bodyRows()).toHaveLength(data.length);
    // The affordance only exists while there's something to clear.
    expect(screen.queryByRole('button', { name: 'Clear search field' })).not.toBeInTheDocument();
  });

  describe('empty states', () => {
    it('says there is no data when the table is genuinely empty', () => {
      render(<DataTable columns={columns} data={[]} pageSize={5} />);
      expect(screen.getByText('No data yet')).toBeInTheDocument();
      // Offering to clear a search nobody ran would be noise.
      expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
    });

    it('distinguishes "the search matched nothing" and offers to clear it', () => {
      render(<DataTable columns={columns} data={data} searchKey="name" pageSize={5} />);
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'zzzzz' } });

      expect(screen.getByText('No matching results')).toBeInTheDocument();
      // "Clear filters", not "Clear search": DataTable now renders the shared
      // empty state from data-state.tsx, so every data surface offers the same
      // recovery action with the same words. The action is unchanged —
      // `table.resetColumnFilters()`, which is what the search box drives.
      const clear = screen.getByRole('button', { name: 'Clear filters' });
      fireEvent.click(clear);
      expect(bodyRows()).toHaveLength(data.length);
    });

    it('lets a consumer replace the empty state entirely', () => {
      render(<DataTable columns={columns} data={[]} emptyState={<p>Nothing bound yet</p>} />);
      expect(screen.getByText('Nothing bound yet')).toBeInTheDocument();
      expect(screen.queryByText('No data yet')).not.toBeInTheDocument();
    });
  });

  describe('inline editing', () => {
    const editable: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Policy', meta: { editable: true } },
      { accessorKey: 'status', header: 'Status' },
    ];

    it('only offers an edit affordance on columns marked editable', () => {
      render(<DataTable columns={editable} data={data} onCellEdit={vi.fn()} pageSize={10} />);
      const cells = within(bodyRows()[0]).getAllByRole('cell');
      expect(within(cells[0]).queryByRole('button')).toBeInTheDocument();
      expect(within(cells[1]).queryByRole('button')).not.toBeInTheDocument();
    });

    it('does nothing without an onCellEdit handler', () => {
      render(<DataTable columns={editable} data={data} pageSize={10} />);
      const cells = within(bodyRows()[0]).getAllByRole('cell');
      expect(within(cells[0]).queryByRole('button')).not.toBeInTheDocument();
    });

    it('commits on Enter and reports the previous value', () => {
      const onCellEdit = vi.fn();
      render(<DataTable columns={editable} data={data} onCellEdit={onCellEdit} pageSize={10} />);

      const trigger = within(within(bodyRows()[0]).getAllByRole('cell')[0]).getByRole('button');
      fireEvent.doubleClick(trigger);
      const input = screen.getByRole('textbox', { name: /edit name/i });
      fireEvent.change(input, { target: { value: 'Renamed' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onCellEdit).toHaveBeenCalledTimes(1);
      expect(onCellEdit.mock.calls[0][0]).toMatchObject({
        columnId: 'name',
        value: 'Renamed',
        previousValue: 'Commercial Auto',
        rowIndex: 0,
      });
    });

    it('discards on Escape', () => {
      const onCellEdit = vi.fn();
      render(<DataTable columns={editable} data={data} onCellEdit={onCellEdit} pageSize={10} />);

      const trigger = within(within(bodyRows()[0]).getAllByRole('cell')[0]).getByRole('button');
      fireEvent.doubleClick(trigger);
      const input = screen.getByRole('textbox', { name: /edit name/i });
      fireEvent.change(input, { target: { value: 'Discarded' } });
      fireEvent.keyDown(input, { key: 'Escape' });

      expect(onCellEdit).not.toHaveBeenCalled();
    });

    it('does not report an edit when the value is unchanged', () => {
      const onCellEdit = vi.fn();
      render(<DataTable columns={editable} data={data} onCellEdit={onCellEdit} pageSize={10} />);

      const trigger = within(within(bodyRows()[0]).getAllByRole('cell')[0]).getByRole('button');
      fireEvent.doubleClick(trigger);
      fireEvent.blur(screen.getByRole('textbox', { name: /edit name/i }));

      expect(onCellEdit).not.toHaveBeenCalled();
    });
  });

  describe('manual pagination', () => {
    it('trusts the server pageCount instead of slicing data itself', () => {
      render(
        <DataTable columns={columns} data={data} pageSize={2} manualPagination pageCount={9} rowCount={17} />
      );
      // data is already "the current page", so all of it renders...
      expect(bodyRows()).toHaveLength(data.length);
      // ...and the footer reflects the server's totals, not data.length.
      expect(screen.getByText(/Page 1 of 9/)).toBeInTheDocument();
    });

    it('asks the consumer to fetch when the page changes', () => {
      const onPaginationChange = vi.fn();
      render(
        <DataTable
          columns={columns}
          data={data}
          pageSize={2}
          manualPagination
          pageCount={9}
          rowCount={17}
          onPaginationChange={onPaginationChange}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
      expect(onPaginationChange).toHaveBeenCalledWith(1, 2);
    });
  });

  describe('row selection', () => {
    it('reports the selected count against the filtered total', () => {
      render(
        <DataTable columns={[createSelectColumn<Row>(), ...columns]} data={data} enableRowSelection pageSize={10} />
      );
      expect(screen.getByText(`0 of ${data.length} row(s) selected.`)).toBeInTheDocument();

      const firstRowCheckbox = within(bodyRows()[0]).getByRole('checkbox');
      fireEvent.click(firstRowCheckbox);
      expect(screen.getByText(`1 of ${data.length} row(s) selected.`)).toBeInTheDocument();
    });
  });

  describe('faceted filters', () => {
    it('narrows to the selected value and restores via Reset', () => {
      render(
        <DataTable
          columns={columns}
          data={data}
          pageSize={10}
          facetedFilters={[{ columnId: 'status', title: 'Status' }]}
        />
      );
      // Reset is only meaningful once a facet is active.
      expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument();
      // "Status" also names the column header's sort menu, so match on the
      // toolbar control specifically: facets are Popovers (haspopup=dialog),
      // column headers are DropdownMenus (haspopup=menu).
      const facetTriggers = screen
        .getAllByRole('button', { name: /Status/ })
        .filter((b) => b.getAttribute('aria-haspopup') === 'dialog');
      expect(facetTriggers).toHaveLength(1);

      expect(screen.getByText('Commercial Auto')).toBeInTheDocument();
      expect(screen.getByText('Cyber Liability')).toBeInTheDocument();

      // Actually select a value. These assertions are the point of the test
      // and were missing: the body only checked that the trigger existed, so
      // the name promised behaviour nothing verified.
      fireEvent.click(facetTriggers[0]);
      fireEvent.click(screen.getByRole('option', { name: /Active/ }));

      // Assert on CONTENT, not on a row count. When nothing matches, the table
      // renders an empty-state <tr>, so "more than zero rows" is still true
      // with the filter completely broken — which is exactly how a first
      // attempt at this test passed against a filter matching nothing.
      //
      // What it now catches: TanStack v9 narrowed `arrIncludesSome` to
      // array-valued columns (it early-returns false unless
      // `Array.isArray(dataValue)`), while v8 called `dataValue.includes(...)`
      // and so happened to work on strings. Every faceted filter here was
      // relying on that accident; under v9 they matched zero rows.
      expect(screen.getByText('Commercial Auto')).toBeInTheDocument();
      expect(screen.getByText('General Liability')).toBeInTheDocument();
      expect(screen.queryByText('Cyber Liability')).not.toBeInTheDocument(); // Pending
      expect(screen.queryByText('Property')).not.toBeInTheDocument(); // Expired

      // ...and Reset restores them.
      fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
      expect(screen.getByText('Cyber Liability')).toBeInTheDocument();
      expect(screen.getByText('Property')).toBeInTheDocument();
    });
  });

  // DataTableSortList is an internal sub-component with no standalone public
  // API, so it's exercised through the prop that mounts it rather than in
  // isolation — the same way the faceted filter is covered above.
  describe('sort list', () => {
    it('is absent unless enableSortList is set', () => {
      render(<DataTable columns={columns} data={data} pageSize={10} />);
      expect(screen.queryByRole('button', { name: 'Sort' })).not.toBeInTheDocument();
    });

    it('renders a Sort trigger when enabled', () => {
      render(<DataTable columns={columns} data={data} pageSize={10} enableSortList />);
      expect(screen.getByRole('button', { name: 'Sort' })).toBeInTheDocument();
    });

    it('opens to an empty state and can add a sort', () => {
      render(<DataTable columns={columns} data={data} pageSize={10} enableSortList />);
      fireEvent.click(screen.getByRole('button', { name: 'Sort' }));
      const addSort = screen.getByRole('button', { name: /Add sort/i });
      fireEvent.click(addSort);
      // Adding a sort surfaces the per-row controls for that sort entry.
      expect(screen.getByLabelText('Sort column')).toBeInTheDocument();
    });
  });
});
