import { useState } from 'react';
import { expect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTable, type SortingState, type ColumnFiltersState } from '@tanstack/react-table';

import { DataGrid, DataGridContainer, DataGridScrollArea } from './data-grid';
import { DataGridTable } from './data-grid-table';
import { DataGridToolbar } from './data-grid-toolbar';
import { DataGridPagination } from './data-grid-pagination';
import { dataGridFeatures, type DataGridColumnDef } from './data-grid-features';
import { createExpandColumn, createRowPinColumn, DataGridDetailPanel } from './data-grid-rows';
import { Badge } from './badge';
import { Button } from './button';

/**
 * # DataGrid
 *
 * The composable grid. `DataTable` is the batteries-included preset over
 * exactly these parts — reach for these directly when you need to own the
 * table instance, read its state, or arrange the pieces differently.
 *
 * The consumer builds the table with `useTable` and the repo's own
 * `dataGridFeatures`, so every slice of state (sorting, filters, selection) is
 * theirs to read and control. That is the thing `DataTable` cannot do: its
 * state is private, so a consumer literally cannot find out which rows are
 * selected.
 */
const meta: Meta = {
  title: 'Components/DataGrid',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

interface Policy {
  id: number;
  name: string;
  status: string;
  premium: string;
  renewalDate: string;
}

const policies: Policy[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active', premium: '$12,400', renewalDate: '2026-03-14' },
  { id: 2, name: 'General Liability', status: 'Active', premium: '$8,200', renewalDate: '2026-05-01' },
  { id: 3, name: 'Cyber Liability', status: 'Pending', premium: '$15,900', renewalDate: '2026-01-22' },
  { id: 4, name: 'Property', status: 'Active', premium: '$22,000', renewalDate: '2026-07-09' },
  { id: 5, name: 'Workers Comp', status: 'Expired', premium: '$9,600', renewalDate: '2025-11-30' },
  { id: 6, name: 'Umbrella', status: 'Active', premium: '$4,100', renewalDate: '2026-04-18' },
  { id: 7, name: 'Marine Cargo', status: 'Pending', premium: '$11,750', renewalDate: '2026-02-27' },
];

const columns: DataGridColumnDef<Policy>[] = [
  { accessorKey: 'name', header: 'Policy', enableSorting: true },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const v = getValue<string>();
      // Pending is a caution, not a neutral label — and it is the only tone
      // that exercises the warning path, whose outline text deliberately is NOT
      // gold (see badge.tsx: status.warning.fg measures 3.41:1 on white).
      return <Badge tone={v === 'Active' ? 'success' : v === 'Expired' ? 'danger' : 'warning'}>{v}</Badge>;
    },
  },
  { accessorKey: 'premium', header: 'Premium', enableSorting: true },
  { accessorKey: 'renewalDate', header: 'Renewal Date', enableSorting: true },
];

function Composed({ data = policies, loading = false }: { data?: Policy[]; loading?: boolean }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  });

  return (
    <DataGrid table={table} recordCount={data.length} loading={loading} searchKey="name">
      <DataGridToolbar
        searchPlaceholder="Search policies..."
        facetedFilters={[{ columnId: 'status', title: 'Status' }]}
        enableSortList
        enableDensityToggle
        enableColumnVisibility
        enableExport
        exportFilename="policies"
      >
        <Button variant="outline" size="sm" className="px-2 text-xs font-normal">
          New policy
        </Button>
      </DataGridToolbar>
      <DataGridContainer>
        <DataGridScrollArea>
          <DataGridTable />
        </DataGridScrollArea>
        <DataGridPagination pageSizeOptions={[5, 10, 25]} />
      </DataGridContainer>
    </DataGrid>
  );
}

export const Default: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'The full composition. Note the toolbar, table and footer are siblings — nothing is nested inside a single component, so any of them can be omitted, reordered, or replaced.',
      },
    },
  },
  render: () => <Composed />,
};

export const Loading: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'The grid resolves one status for the whole tree (loading > error > empty > ready), so the table renders skeletons without the toolbar needing to know.',
      },
    },
  },
  render: () => <Composed loading />,
};

export const Empty: StoryObj = {
  render: () => <Composed data={[]} />,
};

/**
 * State the consumer owns — which is the entire reason this API exists.
 */
function OwnedState() {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'premium', desc: true }]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: policies,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  });

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm">
        Sorted by <strong>{sorting.map((s) => `${s.id} ${s.desc ? 'desc' : 'asc'}`).join(', ') || 'nothing'}</strong>
        {' · '}
        <strong>{Object.keys(rowSelection).length}</strong> selected
      </p>
      <DataGrid table={table} recordCount={policies.length}>
        <DataGridToolbar enableSortList />
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
          <DataGridPagination showSelectedCount />
        </DataGridContainer>
      </DataGrid>
    </div>
  );
}

function ColumnControl() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: policies,
    state: { sorting },
    onSortingChange: setSorting,
    enableColumnPinning: true,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  });

  return (
    <DataGrid table={table} recordCount={policies.length}>
      <DataGridToolbar enableColumnVisibility enableDensityToggle />
      <DataGridContainer>
        <DataGridScrollArea>
          <DataGridTable enableColumnReorder />
        </DataGridScrollArea>
        <DataGridPagination />
      </DataGridContainer>
    </DataGrid>
  );
}

export const ColumnControls: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'Every column menu carries Pin to start / Pin to end / Unpin and Move left / Move right, plus the existing sort and hide items. **Reorder is keyboard-first on purpose**: a drag-only implementation passes axe — it cannot tell whether a div with `onPointerDown` is reachable by keyboard — and fails WCAG 2.1.1. Moves stay inside a column\'s own pinned region, because a start-pinned column renders before the centre ones regardless of column order; allowing the move would reorder the array, change nothing on screen, and announce success. The resize handle is a focusable `role="separator"` with `aria-valuemin`/`max` from the column\'s own bounds.',
      },
    },
  },
  render: () => <ColumnControl />,
};

function Rows() {
  const table = useTable({
    features: dataGridFeatures,
    columns: [createExpandColumn<Policy>(), createRowPinColumn<Policy>(), ...columns],
    data: policies,
    enableRowPinning: true,
    getRowCanExpand: () => true,
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  });

  return (
    <DataGrid table={table} recordCount={policies.length} maxHeight={320}>
      <DataGridContainer>
        <DataGridScrollArea>
          {/* Explicit generic: TData cannot be inferred from context, only
              from props, and `renderDetail` is the only prop that mentions it. */}
          <DataGridTable<Policy>
            renderDetail={(row) => (
              <DataGridDetailPanel>
                <strong>{row.original.name}</strong> renews {row.original.renewalDate} at{' '}
                {row.original.premium}. Detail panels are a real &lt;tr&gt; inside the table, so the
                panel stays associated with its row for assistive tech.
              </DataGridDetailPanel>
            )}
          />
        </DataGridScrollArea>
        <DataGridPagination />
      </DataGridContainer>
    </DataGrid>
  );
}

export const RowExpansionAndPinning: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'Expansion and row pinning. The chevron opens a master-detail panel; the pin keeps a row in view while the rest scrolls (the grid is height-bounded here so the sticky section has something to stick within). Pinned rows render in their own `<tbody>` rather than being reordered into the main one, which is what lets them stick without leaving the table\'s row structure. `renderDetail` also implies expandability — TanStack\'s default is "expandable if it has subRows", which for flat master-detail data is always false, so the toggle would never appear.',
      },
    },
  },
  render: () => <Rows />,
};

const bulk: Policy[] = Array.from({ length: 2000 }, (_, i) => ({
  id: i + 1,
  name: `Policy ${i + 1}`,
  status: ['Active', 'Pending', 'Expired'][i % 3],
  premium: `$${((i + 1) * 137).toLocaleString()}`,
  renewalDate: `2026-${String((i % 12) + 1).padStart(2, '0')}-14`,
}));

function Virtual() {
  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: bulk,
    initialState: { pagination: { pageIndex: 0, pageSize: bulk.length } },
  });

  return (
    <DataGrid table={table} recordCount={bulk.length} maxHeight={360}>
      <DataGridContainer>
        <DataGridScrollArea>
          <DataGridTable enableVirtualization estimateRowSize={45} showFooter stickyFooter />
        </DataGridScrollArea>
      </DataGridContainer>
    </DataGrid>
  );
}

export const Virtualized: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          '2,000 unpaginated rows, ~20 in the DOM. Implemented with **spacer rows, not a transform** — a `transform` on any ancestor creates a containing block and silently kills `position: sticky` on the header and every pinned column, which is the single most likely way to break this table. `aria-rowcount` and `aria-rowindex` carry the real totals, because otherwise a screen reader would announce the rendered window as the whole table. Capped at 2,000 rather than 50,000 deliberately: every story is axe-gated, and axe walks the rendered DOM.',
      },
    },
  },
  render: () => <Virtual />,
  play: async ({ canvasElement }) => {
    const table = canvasElement.querySelector('table')!;
    const scroller = canvasElement.querySelector('.overflow-auto') as HTMLElement;

    // The virtualizer measures the scroll element in an effect, so nothing is
    // rendered on the first paint — wait for the window to populate rather
    // than asserting into the gap.
    await new Promise((r) => setTimeout(r, 400));

    // The whole point: the DOM holds a fraction of the data.
    const rendered = table.querySelectorAll('tbody tr:not([aria-hidden])').length;
    await expect(rendered).toBeGreaterThan(0);
    await expect(rendered).toBeLessThan(100);

    // ...while ARIA still describes all of it.
    await expect(table.getAttribute('aria-rowcount')).toBe(String(bulk.length + 1));
    await expect(table.querySelector('tbody tr[aria-rowindex]')?.getAttribute('aria-rowindex')).toBe('2');

    // Scrolling swaps the window and the indices follow the absolute position.
    scroller.scrollTop = 4000;
    await new Promise((r) => setTimeout(r, 300));
    const firstIndex = Number(
      table.querySelector('tbody tr[aria-rowindex]')?.getAttribute('aria-rowindex')
    );
    await expect(firstIndex).toBeGreaterThan(50);

    // The header is still stuck — proving no ancestor transform crept in.
    const thead = table.querySelector('thead') as HTMLElement;
    await expect(getComputedStyle(thead).position).toBe('sticky');
  },
};

const sheetColumns: DataGridColumnDef<Policy>[] = [
  { accessorKey: 'name', header: 'Policy', meta: { cellEdit: { editable: true } } },
  { accessorKey: 'status', header: 'Status', meta: { cellEdit: { editable: true } } },
  { accessorKey: 'premium', header: 'Premium', meta: { cellEdit: { editable: true } } },
  { accessorKey: 'renewalDate', header: 'Renewal Date' }, // read-only
];

function Spreadsheet() {
  const [log, setLog] = useState<string>('Select cells, then try arrows, Shift+arrows, Ctrl+A, Ctrl+C, Ctrl+D, Delete.');

  const table = useTable({
    features: dataGridFeatures,
    columns: sheetColumns,
    data: policies,
    enableCellSelection: true,
    enableCellRangeSelection: true,
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  });

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm">{log}</p>
      <DataGrid table={table} recordCount={policies.length}>
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable<Policy>
              enableCellSelection
              enableFillHandle
              onCellsChange={(d) =>
                setLog(
                  `${d.source}: ${d.changes.length} changed, ${d.rejected.length} rejected` +
                    (d.rejected.length ? ` (${d.rejected[0].reason})` : '')
                )
              }
            />
          </DataGridScrollArea>
        </DataGridContainer>
      </DataGrid>
    </div>
  );
}

export const SpreadsheetSelection: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'Cell and range selection, keyboard grid navigation, and clipboard. TanStack v9 supplies the selection *model* — ranges, focus, edges, roving tabindex — and this layer adds what it deliberately does not: clipboard, fill, the keyboard map and editing.\n\n**Arrows** move · **Shift+arrows** extend · **Ctrl/Cmd+A** select all · **Ctrl/Cmd+C/X/V** copy/cut/paste · **Ctrl/Cmd+D / R** fill down/right · **Delete** clear.\n\nCtrl+D and Ctrl+R matter: without them the fill handle is mouse-only, which axe passes and WCAG 2.1.1 fails. Renewal Date is read-only, so writes across it are *reported as rejected* rather than silently skipped — otherwise a paste over a read-only column looks like it worked.\n\nThe table switches from `role="table"` to `role="grid"` only in this mode. `role=grid` promises arrow-key navigation, so claiming it on a static table is a lie to assistive tech.',
      },
    },
  },
  render: () => <Spreadsheet />,
  play: async ({ canvasElement }) => {
    const grid = canvasElement.querySelector('[role="grid"]') as HTMLElement;
    await expect(grid.tagName).toBe('TABLE');

    // Reachable by Tab before anything is focused — otherwise a keyboard user
    // can never enter the grid.
    const tabbable = [...grid.querySelectorAll('[role="gridcell"]')].filter(
      (c) => c.getAttribute('tabindex') === '0'
    );
    await expect(tabbable).toHaveLength(1);

    // ...and exactly one stop after focus moves, too.
    const cells = grid.querySelectorAll('[role="gridcell"]');
    (cells[0] as HTMLElement).dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 150));
    const after = [...grid.querySelectorAll('[role="gridcell"]')].filter(
      (c) => c.getAttribute('tabindex') === '0'
    );
    await expect(after).toHaveLength(1);
  },
};

export const ConsumerOwnedState: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'The sorting and selection state live in the story, not in the grid — so the page can render them above the table. `DataTable` keeps that state private, which is tracked as P1-5 in the production-readiness audit; this closes it.',
      },
    },
  },
  render: () => <OwnedState />,
};
