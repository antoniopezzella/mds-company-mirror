import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

import { DataTable } from './data-table';
import { createExpandColumn, createRowPinColumn, DataGridDetailPanel } from './data-grid-rows';
import { createSelectColumn } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';

/**
 * The interactions nothing exercised: grouped headers, virtualization crossed
 * with expansion, and row activation.
 *
 * Each of these was listed as a known rough edge rather than a bug — which is
 * exactly the state where a regression lands unnoticed.
 */

interface Row {
  id: number;
  name: string;
  qty: number;
  price: number;
}

const rows: Row[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  qty: i + 1,
  price: (i + 1) * 10,
}));

describe('grouped headers', () => {
  // A group over two leaves. The <th> must span both, or the group label sits
  // over one column and every header after it is misaligned (audit P2-2).
  const grouped: DataGridColumnDef<Row>[] = [
    { accessorKey: 'name', header: 'Item' },
    {
      id: 'amounts',
      header: 'Amounts',
      columns: [
        { accessorKey: 'qty', header: 'Qty' },
        { accessorKey: 'price', header: 'Price' },
      ],
    },
  ];

  it('spans the group header across its leaf columns', () => {
    render(<DataTable columns={grouped} data={rows.slice(0, 2)} pinFirstColumn={false} />);
    const headerRows = within(screen.getByRole('table')).getAllByRole('row');
    // Two header rows: the group band, then the leaves.
    const groupCell = within(headerRows[0]).getByText('Amounts').closest('th');
    expect(groupCell).toHaveAttribute('colspan', '2');
  });

  it('still renders every leaf header and the right number of body cells', () => {
    render(<DataTable columns={grouped} data={rows.slice(0, 2)} pinFirstColumn={false} />);
    expect(screen.getByText('Qty')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();

    const body = within(screen.getByRole('table')).getAllByRole('row').slice(2);
    expect(within(body[0]).getAllByRole('cell')).toHaveLength(3);
  });
});

describe('virtualization crossed with expansion', () => {
  const columns = [createExpandColumn<Row>(), { accessorKey: 'name', header: 'Item' } as DataGridColumnDef<Row>];

  it('does not double-count a detail row in the aria totals', () => {
    // A detail row is a second <tr> for one virtual index. If it were counted
    // as a row, aria-rowcount would drift every time something expanded.
    const { container } = render(
      <DataTable
        columns={columns}
        data={rows}
        pageSize={rows.length}
        maxHeight={300}
        enableVirtualization
        pinFirstColumn={false}
        renderDetail={(row) => <DataGridDetailPanel>Detail {row.original.id}</DataGridDetailPanel>}
      />
    );
    const table = container.querySelector('table')!;
    expect(table).toHaveAttribute('aria-rowcount', String(rows.length + 1));
  });

  it('marks the detail row so it is distinguishable from a data row', () => {
    render(
      <DataTable
        columns={columns}
        data={rows.slice(0, 3)}
        pinFirstColumn={false}
        renderDetail={(row) => <DataGridDetailPanel>Detail {row.original.id}</DataGridDetailPanel>}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Toggle row 1' }));
    const detail = screen.getByText('Detail 1').closest('tr');
    expect(detail).toHaveAttribute('data-detail-row');
    // And it carries no aria-rowindex, so it is not counted in the sequence.
    expect(detail).not.toHaveAttribute('aria-rowindex');
  });
});

describe('row activation', () => {
  const columns: DataGridColumnDef<Row>[] = [
    createSelectColumn<Row>(),
    { accessorKey: 'name', header: 'Item' },
  ];

  it('fires on click and on Enter/Space', () => {
    const onRowClick = vi.fn();
    render(
      <DataTable columns={columns} data={rows.slice(0, 2)} pinFirstColumn={false} onRowClick={onRowClick} />
    );
    const body = within(screen.getByRole('table')).getAllByRole('row').slice(1);

    fireEvent.click(body[0]);
    expect(onRowClick).toHaveBeenCalledTimes(1);

    // A click handler with no keyboard equivalent is a WCAG 2.1.1 failure
    // that axe cannot see on a <tr>.
    fireEvent.keyDown(body[1], { key: 'Enter' });
    expect(onRowClick).toHaveBeenCalledTimes(2);
    fireEvent.keyDown(body[1], { key: ' ' });
    expect(onRowClick).toHaveBeenCalledTimes(3);
  });

  it('ignores clicks that came from an interactive cell', () => {
    // Otherwise ticking a row's checkbox would also "open" the row.
    const onRowClick = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={rows.slice(0, 2)}
        pinFirstColumn={false}
        enableRowSelection
        onRowClick={onRowClick}
      />
    );
    const checkbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(checkbox);
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('gives no tab stop when nothing is listening', () => {
    // Every row being focusable would add a tab stop per row for no behaviour.
    render(<DataTable columns={columns} data={rows.slice(0, 2)} pinFirstColumn={false} />);
    const body = within(screen.getByRole('table')).getAllByRole('row').slice(1);
    expect(body[0]).not.toHaveAttribute('tabindex');
  });

  it('keeps the row a ROW, never role=button', () => {
    // An explicit role on a <tr> overrides its implicit `row`: the table
    // loses its required children, and a screen reader loses the row/cell
    // relationship. Caught by this suite the first time — the rows simply
    // disappeared from `getAllByRole('row')`.
    const onRowClick = vi.fn();
    render(
      <DataTable columns={columns} data={rows.slice(0, 2)} pinFirstColumn={false} onRowClick={onRowClick} />
    );
    const body = within(screen.getByRole('table')).getAllByRole('row').slice(1);
    expect(body).toHaveLength(2);
    expect(body[0]).not.toHaveAttribute('role');
    expect(body[0]).toHaveAttribute('tabindex', '0');
  });

  it('stays inert in cell-selection mode, where click and Enter already mean something', () => {
    const onRowClick = vi.fn();
    render(
      <DataTable
        columns={[{ accessorKey: 'name', header: 'Item' }]}
        data={rows.slice(0, 2)}
        pinFirstColumn={false}
        enableCellSelection
        onRowClick={onRowClick}
      />
    );
    const body = within(screen.getByRole('grid')).getAllByRole('row').slice(1);
    fireEvent.click(body[0]);
    expect(onRowClick).not.toHaveBeenCalled();
  });
});

describe('capabilities ported from table.tsx', () => {
  // These had to exist on the grid before `Table` could be deprecated —
  // otherwise the deprecation points somewhere that cannot do the job.
  const aligned: DataGridColumnDef<Row>[] = [
    { accessorKey: 'name', header: 'Item' },
    { accessorKey: 'qty', header: 'Qty', meta: { align: 'right' } },
    { accessorKey: 'price', header: 'Price', meta: { align: 'center' } },
  ];

  it('gives the table an accessible name via a real <caption>', () => {
    // `aria-label` on a <table> is far less reliably announced, and a caption
    // is visible — it helps everyone, not only screen-reader users.
    render(<DataTable columns={aligned} data={rows.slice(0, 2)} caption="Open claims" pinFirstColumn={false} />);
    expect(screen.getByRole('table', { name: 'Open claims' })).toBeInTheDocument();
    expect(screen.getByText('Open claims').tagName).toBe('CAPTION');
  });

  it('aligns header and body cells together, per column', () => {
    // Numbers read far better right-aligned, and a header that does not
    // follow its column looks broken.
    render(<DataTable columns={aligned} data={rows.slice(0, 2)} pinFirstColumn={false} />);
    const table = screen.getByRole('table');
    const headers = within(table).getAllByRole('columnheader');
    expect(headers[1].className).toContain('text-right');
    expect(headers[2].className).toContain('text-center');

    const firstBody = within(table).getAllByRole('row')[1];
    const cells = within(firstBody).getAllByRole('cell');
    expect(cells[1].className).toContain('text-right');
    expect(cells[2].className).toContain('text-center');
    expect(cells[0].className).toContain('text-left');
  });

  it('stripes alternate rows, but lets selection win over the stripe', () => {
    // Striping is decoration; selection is a state the user caused, so it has
    // to be the one that shows.
    const { container } = render(
      <DataTable
        columns={[createSelectColumn<Row>(), ...aligned]}
        data={rows.slice(0, 4)}
        striped
        enableRowSelection
        pinFirstColumn={false}
      />
    );
    const body = within(screen.getByRole('table')).getAllByRole('row').slice(1);
    const bg = (el: Element) => (el as HTMLElement).style.backgroundColor;
    expect(bg(body[0])).not.toBe(bg(body[1]));

    const before = bg(body[1]);
    fireEvent.click(within(body[1]).getByRole('checkbox'));
    expect(bg(body[1])).not.toBe(before);
    expect(container).toBeTruthy();
  });
});

describe('row pinning crossed with selection', () => {
  const columns = [createRowPinColumn<Row>(), createSelectColumn<Row>(), { accessorKey: 'name', header: 'Item' } as DataGridColumnDef<Row>];

  it('keeps a pinned row selectable, and counts it once', () => {
    render(
      <DataTable
        columns={columns}
        data={rows.slice(0, 3)}
        pinFirstColumn={false}
        enableRowPinning
        enableRowSelection
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Pin row 2' }));

    // Three data rows total, not four — the pinned one moved region, it was
    // not duplicated into both.
    const body = within(screen.getByRole('table')).getAllByRole('row').slice(1);
    expect(body).toHaveLength(3);

    fireEvent.click(within(body[0]).getByRole('checkbox'));
    expect(screen.getByText(/1 of 3 row\(s\) selected/)).toBeInTheDocument();
  });
});
