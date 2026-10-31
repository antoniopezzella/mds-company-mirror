import * as React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { DataTable, createSelectColumn } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';
import { createActionsColumn } from './data-grid-row-actions';
import { SUCCESS_MS } from './data-grid-table';
import { useDataGridTable } from './use-data-grid-table';
import { DataGridCellDate, DataGridCellNumber, DataGridCellTrend, DataGridCount } from './data-grid-cells';

/**
 * The V3 component parts that are behaviour, not just markup (Figma component
 * sets 17224:2211): cell states, row states, the header's separate sort / menu
 * controls, the column divider, two inline row actions, the toolbar notice and
 * the Jump pagination.
 */

interface Row {
  id: string;
  name: string;
  qty: number;
}

const data: Row[] = [
  { id: 'a', name: 'Alpha', qty: 10 },
  { id: 'b', name: 'Bravo', qty: 20 },
  { id: 'c', name: 'Charlie', qty: 30 },
];

const qtyParse = (raw: string) => {
  const n = Number(raw);
  return raw.trim() !== '' && Number.isFinite(n) ? n : undefined;
};

const editable: DataGridColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'qty',
    header: 'Qty',
    meta: { cellEdit: { editable: true, parse: qtyParse, invalidMessage: 'Enter a number' } },
  },
];

const gridCell = (rowIndex: number, colIndex: number) => {
  const rows = within(screen.getByRole('grid')).getAllByRole('row');
  return within(rows[rowIndex + 1]).getAllByRole('gridcell')[colIndex];
};

afterEach(() => vi.useRealTimers());

describe('cell states (Figma Data table/Cell, Cell state)', () => {
  const setup = () =>
    render(<DataTable columns={editable} data={data} pinFirstColumn={false} enableCellSelection onCellsChange={() => {}} />);

  it('Editing paints the input fill and a 1px inside stroke in border/input/hover', () => {
    setup();
    fireEvent.keyDown(gridCell(0, 1), { key: 'Enter' });
    const td = gridCell(0, 1);
    expect(td).toHaveAttribute('data-cell-state', 'editing');
    expect(td.style.backgroundColor).toBe('var(--mds-color-background-input-default)');
    // The stroke REPLACES the divider — no border/subtle rule left on it.
    expect(td.style.boxShadow).toContain('inset 0 0 0 1px var(--mds-color-border-input-hover)');
    expect(td.style.boxShadow).not.toContain('var(--mds-color-border-subtle)');
  });

  it('Error: critical fill + stroke, a status icon, and a tooltip the input is described by', () => {
    setup();
    fireEvent.keyDown(gridCell(0, 1), { key: 'Enter' });
    const input = screen.getByRole('textbox', { name: 'Edit Qty, Alpha' });
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const td = gridCell(0, 1);
    expect(td).toHaveAttribute('data-cell-state', 'error');
    expect(td.style.backgroundColor).toBe('var(--mds-color-background-critical-subtle)');
    expect(td.style.boxShadow).toContain('inset 0 0 0 1px var(--mds-color-border-critical-default)');
    expect(td.querySelector('[data-glyph="cancel"]')).toBeInTheDocument();

    const tip = screen.getByRole('tooltip');
    expect(tip).toHaveTextContent('Enter a number');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', tip.id);
  });

  it('Success shows after a save and returns to None after about 2 s', () => {
    vi.useFakeTimers();
    setup();
    fireEvent.keyDown(gridCell(0, 1), { key: 'Enter' });
    const input = screen.getByRole('textbox', { name: 'Edit Qty, Alpha' });
    fireEvent.change(input, { target: { value: '99' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const td = gridCell(0, 1);
    expect(td).toHaveAttribute('data-cell-state', 'success');
    expect(td.style.backgroundColor).toBe('var(--mds-color-background-success-subtle)');
    expect(td.style.boxShadow).toContain('var(--mds-color-border-success-default)');
    expect(td.querySelector('[data-glyph="check_circle"]')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(SUCCESS_MS));
    expect(gridCell(0, 1)).not.toHaveAttribute('data-cell-state');
  });
});

describe('row states (Figma Data table/Row, State)', () => {
  const columns: DataGridColumnDef<Row>[] = [createSelectColumn<Row>(), { accessorKey: 'name', header: 'Name' }];
  const getRowState = (r: Row) => (r.id === 'a' ? 'error' : r.id === 'b' ? 'disabled' : undefined);

  const bodyRows = () => within(screen.getByRole('table')).getAllByRole('row').slice(1);

  it('paints an Error row background/critical/subtle', () => {
    render(<DataTable columns={columns} data={data} enableRowSelection getRowState={getRowState} pinFirstColumn={false} />);
    expect(bodyRows()[0]).toHaveAttribute('data-row-state', 'error');
    expect(bodyRows()[0].style.backgroundColor).toBe('var(--mds-color-background-critical-subtle)');
  });

  it('greys a Disabled row, disables its checkbox and leaves it out of select-all', () => {
    render(<DataTable columns={columns} data={data} enableRowSelection getRowState={getRowState} pinFirstColumn={false} />);
    const disabled = bodyRows()[1];
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    expect(disabled.style.color).toBe('var(--mds-color-foreground-disabled)');
    expect(within(disabled).getByRole('checkbox')).toBeDisabled();

    fireEvent.click(screen.getByRole('checkbox', { name: 'Select all rows on this page' }));
    const checked = bodyRows().map((r) => within(r).getByRole('checkbox').getAttribute('data-state'));
    expect(checked).toEqual(['checked', 'unchecked', 'checked']);
    // ...and with every SELECTABLE row picked, the header reads "all".
    expect(screen.getByRole('checkbox', { name: 'Select all rows on this page' })).toHaveAttribute('data-state', 'checked');
  });

  it('disables the row actions of a Disabled row', () => {
    const withActions = [
      ...columns,
      createActionsColumn<Row>({ getRowLabel: (r) => r.name, actions: [{ id: 'x', label: 'Archive', onAction: vi.fn() }] }),
    ];
    render(<DataTable columns={withActions} data={data} getRowState={getRowState} pinFirstColumn={false} />);
    expect(screen.getByRole('button', { name: 'More actions for Bravo' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'More actions for Charlie' })).toBeEnabled();
  });
});

describe('header cell: sort label and a separate menu', () => {
  const columns: DataGridColumnDef<Row>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'qty', header: 'Qty' },
  ];

  it('clicking the label sorts (aria-sort) instead of opening a menu', () => {
    render(<DataTable columns={columns} data={data} pinFirstColumn={false} />);
    const th = within(screen.getByRole('table')).getAllByRole('columnheader')[0];
    const label = within(th).getByRole('button', { name: 'Name' });
    expect(label).not.toHaveAttribute('aria-haspopup');
    fireEvent.click(label);
    expect(th).toHaveAttribute('aria-sort', 'ascending');
    fireEvent.click(label);
    expect(th).toHaveAttribute('aria-sort', 'descending');
    expect(th.querySelector('[data-glyph="arrow_downward"]')).toBeInTheDocument();
  });

  it('opens the column menu from more_vert, with the hand-off wording', () => {
    render(<DataTable columns={columns} data={data} pinFirstColumn={false} />);
    const trigger = screen.getByRole('button', { name: 'Column options for Qty' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: 'mouse' });
    const menu = screen.getByRole('menu');
    expect(within(menu).getByRole('menuitemcheckbox', { name: 'Sort ascending' })).toBeInTheDocument();
    expect(within(menu).getByRole('menuitemcheckbox', { name: 'Sort descending' })).toBeInTheDocument();
    expect(within(menu).getByRole('menuitem', { name: 'Hide column' })).toBeInTheDocument();
  });

  it('draws the header icons without adding text to the cell', () => {
    render(<DataTable columns={columns} data={data} pinFirstColumn={false} />);
    const th = within(screen.getByRole('table')).getAllByRole('columnheader')[0];
    expect(th.textContent).toBe('Name');
  });
});

describe('column divider', () => {
  it('draws a 1px border/subtle rule on the right of header, body and footer cells', () => {
    const columns: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Name', footer: 'Total', meta: { columnDivider: true } },
      { accessorKey: 'qty', header: 'Qty', footer: '60' },
    ];
    render(<DataTable columns={columns} data={data} pinFirstColumn={false} showFooter />);
    const table = screen.getByRole('table');
    const rule = 'inset -1px 0 0 0 var(--mds-color-border-subtle)';
    const [nameTh, qtyTh] = within(table).getAllByRole('columnheader');
    expect(nameTh.style.boxShadow).toContain(rule);
    expect(qtyTh.style.boxShadow).not.toContain(rule);
    const firstBody = within(within(table).getAllByRole('row')[1]).getAllByRole('cell');
    expect(firstBody[0].style.boxShadow).toContain(rule);
    expect(firstBody[1].style.boxShadow).not.toContain(rule);
    expect(screen.getByText('Total').style.boxShadow).toContain(rule);
  });

  it('gives way to the pinned edge on a pinned column', () => {
    const columns: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Name', meta: { columnDivider: true } },
      { accessorKey: 'qty', header: 'Qty' },
    ];
    render(<DataTable columns={columns} data={data} />);
    const th = within(screen.getByRole('table')).getAllByRole('columnheader')[0];
    expect(th.style.boxShadow).toContain('var(--mds-color-border-default)');
    expect(th.style.boxShadow).not.toContain('var(--mds-color-border-subtle)');
  });
});

describe('pinned edge', () => {
  const columns: DataGridColumnDef<Row>[] = [
    createSelectColumn<Row>(),
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'qty', header: 'Qty' },
    { id: 'a', header: 'A', cell: () => 'a' },
    { id: 'b', header: 'B', cell: () => 'b' },
  ];
  function Pinned({ pinning }: { pinning: { start: string[]; end: string[] } }) {
    const table = useDataGridTable<Row>({ columns, data, enableRowSelection: true, enableColumnPinning: true });
    React.useEffect(() => {
      table.setColumnPinning(pinning);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <DataTable table={table} columns={columns} data={data} enableRowSelection />;
  }

  it('draws once per pinned region, on the column that meets the scrolling area', () => {
    render(<Pinned pinning={{ start: ['select', 'name'], end: ['a', 'b'] }} />);
    const table = screen.getByRole('table');
    const startEdge = 'inset -1px 0 0 0 var(--mds-color-border-default)';
    const endEdge = 'inset 1px 0 0 0 var(--mds-color-border-default)';
    const ths = within(table).getAllByRole('columnheader');
    const body = within(within(table).getAllByRole('row')[1]).getAllByRole('cell');
    for (const cells of [ths, body]) {
      const [select, name, qty, a, b] = cells;
      // Directory 17992:15767: checkbox + Name are one pinned area, ruled once.
      expect(select.style.position).toBe('sticky');
      expect(select.style.boxShadow).not.toContain(startEdge);
      expect(name.style.boxShadow).toContain(startEdge);
      expect(qty.style.boxShadow ?? '').not.toContain('border-default');
      expect(a.style.boxShadow).toContain(endEdge);
      expect(b.style.position).toBe('sticky');
      expect(b.style.boxShadow).not.toContain(endEdge);
    }
  });
});

describe('Content/Actions: two inline actions', () => {
  it('renders both before More, each named for the record', () => {
    const columns: DataGridColumnDef<Row>[] = [
      { accessorKey: 'name', header: 'Name' },
      createActionsColumn<Row>({
        getRowLabel: (r) => r.name,
        inline: [
          { label: 'Edit', iconOnly: true, icon: <span />, onAction: vi.fn() },
          { label: 'Duplicate', iconOnly: true, icon: <span />, onAction: vi.fn() },
          { label: 'Ignored third', iconOnly: true, icon: <span />, onAction: vi.fn() },
        ],
        actions: [{ id: 'del', label: 'Delete', onAction: vi.fn() }],
      }),
    ];
    render(<DataTable columns={columns} data={data.slice(0, 1)} pinFirstColumn={false} />);
    const cell = within(screen.getByRole('table')).getAllByRole('cell')[1];
    const names = within(cell).getAllByRole('button').map((b) => b.getAttribute('aria-label'));
    expect(names).toEqual(['Edit Alpha', 'Duplicate Alpha', 'More actions for Alpha']);
  });
});

describe('toolbar notice slot', () => {
  it('renders the notice under the toolbar bar, inside the shell, above the table', () => {
    const { container } = render(
      <DataTable
        columns={[{ accessorKey: 'name', header: 'Name' }]}
        data={data}
        pinFirstColumn={false}
        notice={<div role="alert">Couldn't load the latest rows</div>}
      />
    );
    const slot = container.querySelector('[data-slot="data-grid-toolbar-notice"]');
    expect(slot).toHaveTextContent("Couldn't load the latest rows");
    expect(slot?.previousElementSibling).toHaveAttribute('data-slot', 'data-grid-toolbar');
    // Before the table in document order.
    expect(slot!.compareDocumentPosition(screen.getByRole('table')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

describe('Pagination Type=Jump', () => {
  const many: Row[] = Array.from({ length: 50 }, (_, i) => ({ id: String(i), name: `Row ${i + 1}`, qty: i }));
  const setup = () =>
    render(
      <DataTable
        columns={[{ accessorKey: 'name', header: 'Name' }]}
        data={many}
        pageSize={10}
        pinFirstColumn={false}
        paginationVariant="jump"
      />
    );

  it('jumps to the typed page on Enter', () => {
    setup();
    const input = screen.getByRole('textbox', { name: 'Page' });
    expect(input).toHaveValue('1');
    expect(screen.getByText('of 5')).toBeInTheDocument();
    fireEvent.change(input, { target: { value: '4' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('Row 31')).toBeInTheDocument();
    expect(input).toHaveValue('4');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('marks out-of-range input invalid with "Enter 1–N" and stays put', () => {
    setup();
    const input = screen.getByRole('textbox', { name: 'Page' });
    fireEvent.change(input, { target: { value: '9' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const msg = screen.getByText('Enter 1–5');
    expect(input).toHaveAttribute('aria-describedby', msg.id);
    expect(screen.getByText('Row 1')).toBeInTheDocument();
  });
});

describe('content parts', () => {
  it('Number: caption above, value, trend below — End-aligned, tabular', () => {
    const { container } = render(
      <DataGridCellNumber caption="End of month" strong trend={<DataGridCellTrend direction="up">+5.2%</DataGridCellTrend>}>
        $5,143.03
      </DataGridCellNumber>
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('items-end');
    const [caption, value, trend] = Array.from(root.children) as HTMLElement[];
    expect(caption).toHaveTextContent('End of month');
    expect(value).toHaveTextContent('$5,143.03');
    expect(value.className).toContain('tabular-nums');
    expect(value.className).toContain('font-bold');
    expect(trend).toHaveAttribute('data-slot', 'data-grid-cell-trend');
    expect(trend.querySelector('[data-glyph="trending_up"]')).toBeInTheDocument();
  });

  it('Date: optional decorative calendar icon', () => {
    const { container, rerender } = render(<DataGridCellDate>Mar 10, 2026</DataGridCellDate>);
    expect(container.querySelector('[data-glyph="calendar_month"]')).toBeNull();
    rerender(<DataGridCellDate showIcon>Mar 10, 2026</DataGridCellDate>);
    const icon = container.querySelector('[data-glyph="calendar_month"]');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('Count: Default muted, Strong bold neutral/default', () => {
    render(
      <>
        <DataGridCount>5 groups</DataGridCount>
        <DataGridCount strong>3 selected</DataGridCount>
      </>
    );
    expect(screen.getByText('5 groups').className).toContain('foreground-neutral-subtle');
    expect(screen.getByText('3 selected').className).toContain('font-bold');
    expect(screen.getByText('3 selected').className).toContain('foreground-neutral-default');
  });
});
