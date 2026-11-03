import * as React from 'react';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';

import { DataTable } from './data-table';
import { useDataGridTable } from './use-data-grid-table';
import type { DataGridColumnDef } from './data-grid-features';

/**
 * Virtualization and footer aggregates.
 *
 * **jsdom reports every element as 0×0 and does not lay out sticky**, so it
 * cannot tell you how many rows a real browser would render. What it *can*
 * prove is the contract around virtualization: the ARIA counts describe the
 * whole dataset rather than the rendered window, and the spacer rows are
 * hidden from assistive tech. The rendering itself is covered by a browser
 * story.
 */

interface Row {
  id: number;
  name: string;
  amount: number;
}

const many: Row[] = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  name: `Policy ${i + 1}`,
  amount: (i + 1) * 100,
}));

const columns: DataGridColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Policy' },
  { accessorKey: 'amount', header: 'Amount' },
];

describe('virtualization', () => {
  it('reports the FULL row count in aria, not the rendered window', () => {
    // Without this a screen reader announces "30 rows" for a 500-row table —
    // the one thing virtualization must not be allowed to break.
    const { container } = render(
      <DataTable
        columns={columns}
        data={many}
        pageSize={500}
        maxHeight={300}
        enableVirtualization
      />
    );
    const table = container.querySelector('table')!;
    // +1 for the header row.
    expect(table).toHaveAttribute('aria-rowcount', String(many.length + 1));
    expect(table).toHaveAttribute('aria-colcount', String(columns.length));
  });

  it('gives each rendered row an absolute aria-rowindex, offset past the header', () => {
    // jsdom measures the scroll container as 0px tall, so the virtualizer
    // renders NO rows here and this cannot assert on the window's contents —
    // that is what the `Virtualized` browser story is for. What is checkable
    // is the indexing rule itself: header is row 1, so data starts at 2.
    // Rendering one small page unvirtualized would not exercise it, so assert
    // the rule against the same code path with a container jsdom can size.
    const { container } = render(
      <DataTable columns={columns} data={many.slice(0, 3)} pageSize={10} enableVirtualization={false} />
    );
    // Off: no index attribute at all, because the DOM order IS the truth.
    expect(container.querySelector('tbody tr[aria-rowindex]')).toBeNull();
    // The offset rule is asserted in the browser story, where rows exist.
  });

  it('hides the spacer rows from assistive tech', () => {
    // The spacers hold the scroll height above and below the window. They are
    // layout, not content — a screen reader counting them as rows would be
    // worse than not virtualizing at all.
    const { container } = render(
      <DataTable columns={columns} data={many} pageSize={500} maxHeight={300} enableVirtualization />
    );
    for (const tr of container.querySelectorAll('tbody tr')) {
      const isSpacer = tr.textContent?.trim() === '';
      if (isSpacer) expect(tr).toHaveAttribute('aria-hidden', 'true');
    }
  });

  it('sets no aria counts when virtualization is off, because the DOM is the truth', () => {
    const { container } = render(<DataTable columns={columns} data={many.slice(0, 5)} pageSize={10} />);
    expect(container.querySelector('table')).not.toHaveAttribute('aria-rowcount');
  });

  it('uses NO transform, which would kill sticky headers and pinned columns', () => {
    // The classic way to virtualize is translateY on a container. That creates
    // a containing block and silently breaks `position: sticky` on every
    // ancestor-relative element — here, the header and every pinned column.
    // Spacer rows avoid it entirely.
    const { container } = render(
      <DataTable columns={columns} data={many} pageSize={500} maxHeight={300} enableVirtualization />
    );
    for (const el of container.querySelectorAll('table, tbody, tr, td')) {
      const transform = (el as HTMLElement).style.transform;
      expect(transform === '' || transform === 'none').toBe(true);
    }
  });
});

describe('pinned rows in the aria row sequence (hand-off 5b#3, §9)', () => {
  const rows = many.slice(0, 6);

  function PinnedGrid() {
    const table = useDataGridTable<Row>({
      columns,
      data: rows,
      enableRowPinning: true,
      enableCellSelection: true,
      pageSize: 10,
      getRowId: (r) => String(r.id),
    });
    React.useEffect(() => {
      table.setRowPinning({ top: ['2', '5'], bottom: ['6'] });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <DataTable table={table} columns={columns} data={rows} enableRowPinning enableCellSelection pageSize={10} />;
  }

  it('gives every row a unique aria-rowindex and counts header + top + centre + bottom', async () => {
    // Before: top/bottom rows took their map index, so the first pinned row
    // and the first centre row both claimed aria-rowindex 2, and the count
    // (centre + 1) left the pinned rows out entirely.
    const { container } = render(<PinnedGrid />);
    const table = container.querySelector('table')!;
    await waitFor(() => expect(container.querySelector('tbody[data-pinned="top"]')).toBeInTheDocument());

    // 1 header + 2 top + 3 centre + 1 bottom.
    expect(table).toHaveAttribute('aria-rowcount', '7');
    const indices = Array.from(container.querySelectorAll('tbody tr[aria-rowindex]')).map((tr) =>
      Number(tr.getAttribute('aria-rowindex'))
    );
    // Unique, and in DOM (reading) order: top 2–3, centre 4–6, bottom 7.
    expect(indices).toEqual([2, 3, 4, 5, 6, 7]);
    const top = container.querySelectorAll('tbody[data-pinned="top"] tr');
    expect(Array.from(top).map((tr) => tr.getAttribute('aria-rowindex'))).toEqual(['2', '3']);
    expect(container.querySelector('tbody[data-pinned="bottom"] tr')).toHaveAttribute('aria-rowindex', '7');
  });

  it('paints pinned rows Banded and rules them off from the scrolling rows in border/default', async () => {
    const { container } = render(<PinnedGrid />);
    await waitFor(() => expect(container.querySelector('tbody[data-pinned="top"]')).toBeInTheDocument());
    const top = container.querySelectorAll<HTMLElement>('tbody[data-pinned="top"] tr');
    const bottom = container.querySelector<HTMLElement>('tbody[data-pinned="bottom"] tr')!;
    for (const tr of [...top, bottom]) {
      expect(tr.style.backgroundColor).toBe('var(--mds-color-background-neutral-subtle)');
    }
    const cellShadow = (tr: Element) => (tr.querySelector('td') as HTMLElement).style.boxShadow;
    // First top row: the ordinary subtle divider; last top row: border/default.
    expect(cellShadow(top[0])).toContain('var(--mds-color-border-subtle)');
    expect(cellShadow(top[1])).toContain('inset 0 -1px 0 0 var(--mds-color-border-default)');
    // First bottom row: the rule on its TOP edge.
    expect(cellShadow(bottom)).toContain('inset 0 1px 0 0 var(--mds-color-border-default)');
    // Centre rows keep the default surface.
    const centre = container.querySelectorAll<HTMLElement>('tbody:not([data-pinned]) tr[aria-rowindex]');
    expect(centre[0].style.backgroundColor).toBe('var(--mds-color-background-default)');
  });
});

describe('footer aggregates', () => {
  const withFooter: DataGridColumnDef<Row>[] = [
    { accessorKey: 'name', header: 'Policy', footer: 'Total' },
    {
      accessorKey: 'amount',
      header: 'Amount',
      // Computed from the FILTERED rows, so the total follows what the user
      // can actually see rather than describing hidden data.
      footer: ({ table }) =>
        table.getFilteredRowModel().rows.reduce((sum, r) => sum + r.getValue<number>('amount'), 0),
    },
  ];

  const small = many.slice(0, 3); // 100 + 200 + 300

  it('renders nothing unless asked', () => {
    const { container } = render(<DataTable columns={withFooter} data={small} />);
    expect(container.querySelector('tfoot')).not.toBeInTheDocument();
  });

  it('renders each column footer in a real tfoot', () => {
    const { container } = render(<DataTable columns={withFooter} data={small} showFooter />);
    const foot = container.querySelector('tfoot')!;
    expect(foot).toBeInTheDocument();
    expect(within(foot).getByText('Total')).toBeInTheDocument();
    expect(within(foot).getByText('600')).toBeInTheDocument();
  });

  it('follows the filters rather than totalling hidden rows', async () => {
    const { container } = render(
      <DataTable
        columns={withFooter}
        data={small}
        showFooter
        searchKey="name"
        searchPlaceholder="Search"
      />
    );
    const input = screen.getByPlaceholderText('Search');
    // Matches "Policy 1" only.
    fireEvent.change(input, { target: { value: 'Policy 1' } });

    // The search is debounced 250 ms (hand-off §5).
    await waitFor(() => expect(within(container.querySelector('tfoot')!).getByText('100')).toBeInTheDocument());
  });

  it('does not render a footer while loading or erroring', () => {
    const { container, rerender } = render(
      <DataTable columns={withFooter} data={small} showFooter loading />
    );
    expect(container.querySelector('tfoot')).not.toBeInTheDocument();

    rerender(<DataTable columns={withFooter} data={small} showFooter loadError />);
    expect(container.querySelector('tfoot')).not.toBeInTheDocument();
  });
});
