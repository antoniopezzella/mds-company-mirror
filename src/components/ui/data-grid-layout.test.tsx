import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';

import { DataTable, createSelectColumn } from './data-table';
import { createExpandColumn } from './data-grid-rows';
import type { DataGridColumnDef } from './data-grid-features';

/**
 * Column widths and table layout (MDS V3 templates).
 *
 * jsdom does no layout, so these assert the INPUTS the browser lays out
 * from — `table-layout`, the colgroup, and which cells carry a width — not
 * rendered pixels. That is exactly where the regression lived: TanStack
 * merges a default `size: 150` into every columnDef, and treating that as
 * "the author sized this column" fixed every column of every table at 150px.
 * Rendered-pixel checks belong to the template stories.
 */

interface Row {
  id: number;
  name: string;
  status: string;
}

const data: Row[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active' },
  { id: 2, name: 'General Liability', status: 'Pending' },
];

const table = (container: HTMLElement) => container.querySelector('table') as HTMLTableElement;

describe('DataGrid column layout', () => {
  it('leaves a table with no authored widths on automatic layout, with no widths set', () => {
    const columns: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Policy' },
      { accessorKey: 'status', header: 'Status' },
    ];
    const { container } = render(<DataTable columns={columns} data={data} />);

    expect(table(container).style.tableLayout).not.toBe('fixed');
    expect(table(container).querySelector('colgroup')).toBeNull();
    for (const th of table(container).querySelectorAll('th')) {
      expect((th as HTMLElement).style.width).toBe('');
    }
  });

  it('lays the table out fixed with a colgroup when every column has an authored width', () => {
    const columns: DataGridColumnDef<Row>[] = [
      createSelectColumn<Row>(),
      { accessorKey: 'name', header: 'Policy', size: 344 },
      { accessorKey: 'status', header: 'Status', size: 210 },
    ];
    const { container } = render(<DataTable columns={columns} data={data} enableRowSelection />);

    expect(table(container).style.tableLayout).toBe('fixed');
    const cols = [...table(container).querySelectorAll('col')].map((c) => (c as HTMLElement).style.width);
    // The checkbox column is the density inset plus the 20px control, so it
    // tracks Compact / Standard / Comfortable instead of baking in one mode.
    expect(cols).toEqual(['calc(var(--dt-inset-x) + 20px)', '344px', '210px']);
  });

  it('stays automatic when only SOME columns have widths', () => {
    const columns: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Policy', size: 344 },
      { accessorKey: 'status', header: 'Status' },
    ];
    const { container } = render(<DataTable columns={columns} data={data} />);

    expect(table(container).style.tableLayout).not.toBe('fixed');
  });

  it('merges the expand column into the next header, so its label starts at the cell inset', () => {
    const columns: DataGridColumnDef<Row>[] = [
      createExpandColumn<Row>(),
      { accessorKey: 'name', header: 'Request', size: 340 },
      { accessorKey: 'status', header: 'Status', size: 180 },
    ];
    const { container } = render(<DataTable columns={columns} data={data} />);

    const ths = [...table(container).querySelectorAll('thead th')];
    expect(ths.map((th) => th.textContent)).toEqual(['Request', 'Status']);
    expect(ths[0]).toHaveAttribute('colspan', '2');
    // ...and the body still has the toggle column, so 3 cells per row.
    expect(table(container).querySelector('tbody tr')?.children).toHaveLength(3);
  });
});
