import { useEffect, useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { expect, fireEvent, waitFor, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTable, type SortingState } from '@tanstack/react-table';

import { DataGrid, DataGridContainer, DataGridScrollArea } from './data-grid';
import { DataGridTable } from './data-grid-table';
import { DataGridTitleBar, DataGridToolbar } from './data-grid-toolbar';
import { DataGridPagination } from './data-grid-pagination';
import { dataGridFeatures, type DataGridColumnDef, type DataGridTableInstance } from './data-grid-features';
import { useDataGridTable } from './use-data-grid-table';
import { createExpandColumn, createRowPinColumn, DataGridDetailPanel } from './data-grid-rows';
import { createActionsColumn } from './data-grid-row-actions';
import { Badge } from './badge';
import { Button } from './button';
import { Alert } from './alert';
import { DataTable, createSelectColumn } from './data-table';

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
  parameters: {
    layout: 'padded',
    docs: { description: { component: [
      '**The same table, composed.** Reach for this when **you need the table instance** — not',
      'when you need more features.',
      '',
      '[`DataTable`](/docs/components-datatable--docs) is a preset over this component and has',
      '**identical capabilities**. What `DataGrid` adds is ownership: you hold the instance, so',
      'anything outside the table can read its selection, filters and sorting, drive it, or',
      'reorder and omit its parts.',
      '',
      '`ConsumerOwnedState` is the story that earns this API. Stories that also appear under',
      '`DataTable` show the same behaviour through a different shape, not different behaviour.',
      '',
      'See [Foundations -> Choosing a table](/docs/foundations-choosing-a-table--docs).',
    ].join('\n') } },
  },
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
      // `soft`, not the default `outline`: an outline badge is transparent, so
      // its text composites on the ROW, and row hover is Sky Blue — where
      // success green measures 4.16:1, under AA. A badge that carries its own
      // background is unaffected by whatever the row is doing.
      return (
        <Badge variant="soft" tone={v === 'Active' ? 'success' : v === 'Expired' ? 'danger' : 'warning'}>
          {v}
        </Badge>
      );
    },
  },
  { accessorKey: 'premium', header: 'Premium', enableSorting: true },
  { accessorKey: 'renewalDate', header: 'Renewal Date', enableSorting: true },
];

function Composed({ data = policies, loading = false }: { data?: Policy[]; loading?: boolean }) {
  // Row pinning reads the TABLE, which does not exist when the columns are
  // declared — the row menu reaches it through this ref.
  const tableRef = useRef<DataGridTableInstance<Policy> | null>(null);
  const withActions = useMemo<DataGridColumnDef<Policy>[]>(() => {
    const row = (p: Policy) => tableRef.current?.getRow(String(p.id), true);
    return [
      ...columns,
      createActionsColumn<Policy>({
        getRowLabel: (p) => p.name,
        actions: [
          { id: 'pin', label: 'Pin to top', hidden: (p) => !!row(p)?.getIsPinned(), onAction: (p) => row(p)?.pin('top') },
          { id: 'unpin', label: 'Unpin', hidden: (p) => !row(p)?.getIsPinned(), onAction: (p) => row(p)?.pin(false) },
        ],
      }),
    ];
  }, []);

  // The same setup DataTable uses. Before this hook existed, choosing
  // composition meant hand-rolling the state wiring — which is how a
  // hand-built grid ends up subtly different from the preset.
  // Figma Directory pinning: the first column pinned (edge + header unpin
  // icon), rows pinnable from the row menu, keyed by record so a search does
  // not move a pin onto another policy.
  const table = useDataGridTable({
    columns: withActions,
    data,
    pageSize: 5,
    enableColumnPinning: true,
    enableRowPinning: true,
    getRowId: (p) => String(p.id),
  });
  tableRef.current = table;
  useEffect(() => {
    table.setRowPinning({ top: ['4'], bottom: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataGrid table={table} recordCount={data.length} loading={loading} searchKey="name">
      {/* Figma `Data table`: title bar, toolbar, grid and footer in ONE shell.
          Sort lives on the headers and density in the gear's Table settings
          menu, so the right side is only settings, export and the primary
          action — no separate Sort or Density buttons. */}
      <DataGridContainer>
        <DataGridTitleBar
          title="Policies"
          meta={`${data.length} policies • ${data.filter((p) => p.status === 'Active').length} active • ${table.getTopRows().length} pinned`}
        />
        <DataGridToolbar
          searchPlaceholder="Search policies..."
          facetedFilters={[{ columnId: 'status', title: 'Status' }]}
          enableDensityToggle
          enableColumnVisibility
          enableExport
          exportFilename="policies"
          itemNoun="policy"
          itemNounPlural="policies"
        >
          <Button variant="primary" size="sm" icon={<Plus aria-hidden="true" />}>
            New policy
          </Button>
        </DataGridToolbar>
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
          'The full composition, in the Figma shape: title bar, toolbar, table and footer inside one `DataGridContainer`. They are siblings — none is nested inside another component — so any of them can be omitted, reordered, or replaced. The gear opens **Table settings**: show/hide, arrange and pin columns, density, and Reset table. Policy is pinned (edge + unpin icon in its header); Property opens pinned to the top, the row menu pins and unpins any row, and the toolbar shows "Unpin all | 1 policy pinned" while any row is pinned.',
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
  parameters: {
    docs: {
      description: {
        story:
          'Same four-state vocabulary as `DataTable` — the state layer is shared, not per-API. What composition adds is that the toolbar and footer are siblings of the table, so they keep rendering around an empty body instead of disappearing with it: the user can still clear the filter that emptied it.',
      },
    },
  },
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
          'Every column menu carries Pin column / Unpin (hand-off 5b#1/#2: data columns pin to the start; only the Actions column pins to the end) and Move left / Move right, plus the existing sort and hide items. **Reorder is keyboard-first on purpose**: a drag-only implementation passes axe — it cannot tell whether a div with `onPointerDown` is reachable by keyboard — and fails WCAG 2.1.1. Moves stay inside a column\'s own pinned region, because a start-pinned column renders before the centre ones regardless of column order; allowing the move would reorder the array, change nothing on screen, and announce success. The resize handle is a focusable `role="separator"` with `aria-valuemin`/`max` from the column\'s own bounds.',
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

interface TypedPolicy {
  id: number;
  name: string;
  status: string;
  /** RAW number, not a pre-formatted "$12,400" string. */
  premium: number;
  /** RAW number — a percentage, already expressed as such (12.5, not 0.125). */
  lossRatio: number;
  /** RAW ISO date string straight from an API. */
  renewalDate: string;
}

const typedPolicies: TypedPolicy[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active', premium: 12400, lossRatio: 62.4, renewalDate: '2026-03-14' },
  { id: 2, name: 'General Liability', status: 'Active', premium: 8200, lossRatio: 41.9, renewalDate: '2026-05-01' },
  { id: 3, name: 'Cyber Liability', status: 'Pending', premium: 15900, lossRatio: 78.1, renewalDate: '2026-01-22' },
  { id: 4, name: 'Property', status: 'Active', premium: 22000, lossRatio: 55.0, renewalDate: '2026-07-09' },
  { id: 5, name: 'Workers Comp', status: 'Expired', premium: 9600, lossRatio: 88.7, renewalDate: '2025-11-30' },
];

// The whole point of this story: the numeric and date columns hold RAW values
// and carry NO `cell` renderer — only `meta.type`. The grid runs them through
// `formatValue`, so a currency column shows "$12,400.00" and a date column a
// readable date, with no per-column formatting code. `status` keeps its custom
// `cell` (a Badge), proving a custom renderer always wins over `meta.type`.
const typedColumns: DataGridColumnDef<TypedPolicy>[] = [
  { accessorKey: 'name', header: 'Policy', enableSorting: true },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const v = getValue<string>();
      return (
        <Badge variant="soft" tone={v === 'Active' ? 'success' : v === 'Expired' ? 'danger' : 'warning'}>
          {v}
        </Badge>
      );
    },
  },
  { accessorKey: 'premium', header: 'Premium', enableSorting: true, meta: { type: 'currency' } },
  { accessorKey: 'lossRatio', header: 'Loss ratio', enableSorting: true, meta: { type: 'percent' } },
  { accessorKey: 'renewalDate', header: 'Renewal Date', enableSorting: true, meta: { type: 'date' } },
];

function TypedFormatting() {
  const table = useDataGridTable({ columns: typedColumns, data: typedPolicies, pageSize: 5, pinFirstColumn: false });
  return (
    <DataGrid table={table} recordCount={typedPolicies.length}>
      <DataGridContainer>
        <DataGridScrollArea>
          <DataGridTable />
        </DataGridScrollArea>
      </DataGridContainer>
    </DataGrid>
  );
}

export const TypedColumnFormatting: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          "Columns declare `meta: { type: 'currency' | 'percent' | 'date' }` and hold **raw** numbers and ISO strings — no `cell` renderer. The grid formats the value through `formatValue` (locale/currency from a `FormatProvider`, or `en-US`/`USD` by default), and numeric types align right automatically. The `Status` column keeps its custom `cell`, which always wins over `meta.type`.",
      },
    },
  },
  render: () => <TypedFormatting />,
  play: async ({ canvasElement }) => {
    const table = canvasElement.querySelector('table')!;
    // Raw 12400 rendered as currency, not as "12400".
    await expect(table.textContent).toContain('$12,400.00');
    // Raw 62.4 rendered as a percentage.
    await expect(table.textContent).toContain('62.4%');
    // The ISO date is formatted away.
    await expect(table.textContent).not.toContain('2026-03-14');
    // The custom-cell Status column is untouched.
    await expect(table.textContent).toContain('Active');
  },
};

// ── V3 component parts (Figma component sets 17224:2211) ───────────────────

/**
 * Figma `Data table/Row` State=Error (17234:5179) and State=Disabled
 * (17234:5185), from `getRowState`. Error: background/critical/subtle, hover
 * layer kept. Disabled: text in foreground/disabled, checkbox and row actions
 * disabled, skipped by select-all.
 */
export const RowStates: StoryObj = {
  render: () => (
    <div style={{ width: 760 }}>
      <DataTable<Policy, unknown>
        columns={[
          createSelectColumn<Policy>({ getRowLabel: (p) => p.name }),
          ...columns,
          createActionsColumn<Policy>({
            getRowLabel: (p) => p.name,
            actions: [{ id: 'archive', label: 'Archive', onAction: () => {} }],
          }),
        ]}
        data={policies.slice(0, 5)}
        pinFirstColumn={false}
        enableRowSelection
        footer={false}
        title="Policies"
        getRowState={(p) => (p.id === 3 ? 'error' : p.id === 5 ? 'disabled' : undefined)}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('tbody tr');
    await expect(rows[2]).toHaveAttribute('data-row-state', 'error');
    await expect(rows[4]).toHaveAttribute('aria-disabled', 'true');
  },
};

const manyPolicies: Policy[] = Array.from({ length: 250 }, (_, i) => ({
  ...policies[i % policies.length],
  id: i + 1,
  name: `${policies[i % policies.length].name} ${i + 1}`,
}));

/**
 * Figma `Data table/Pagination` Type=Jump (17278:10901): range, "Page
 * [56px input] of N", then First / Previous / Next / Last. For more than 50
 * pages; Enter jumps, a number outside 1–N shows "Enter 1–N".
 */
export const JumpPagination: StoryObj = {
  render: () => (
    <div style={{ width: 860 }}>
      <DataTable<Policy, unknown>
        columns={columns}
        data={manyPolicies}
        pageSize={10}
        pinFirstColumn={false}
        paginationVariant="jump"
      />
    </div>
  ),
};

/**
 * Figma `Data table/Toolbar` `Has notice` (17279:11510): an inline critical
 * Alert under the toolbar bar, inside the shell — padding 0/16/8/16.
 */
export const ToolbarNotice: StoryObj = {
  render: () => (
    <div style={{ width: 860 }}>
      <DataTable<Policy, unknown>
        columns={columns}
        data={policies}
        pinFirstColumn={false}
        searchKey="name"
        searchPlaceholder="Search policies..."
        footer={false}
        notice={
          <Alert severity="error" title="Couldn't load the latest policies">
            Showing data from 09:42. Try again in a moment.
          </Alert>
        }
      />
    </div>
  ),
};

/**
 * Figma `Header cell` (17228:2623) parts: click the label to sort, the
 * more_vert menu (hover / focus), the pinned column's keep_off as a flex item
 * that truncates a narrow label instead of covering it, the 2×16 resize grip
 * on hover, and the column divider (on by default when resizable).
 */
export const HeaderParts: StoryObj = {
  render: () => (
    // 620 = the four authored widths, so the 120px pinned column stays 120
    // (a resizable table stretches to fill a wider container).
    <div style={{ width: 622 }}>
      <DataTable<Policy, unknown>
        columns={[
          { accessorKey: 'name', header: 'Policy name and line of business', size: 120 },
          { accessorKey: 'status', header: 'Status', size: 160 },
          { accessorKey: 'premium', header: 'Premium', size: 160, meta: { align: 'right' } },
          { accessorKey: 'renewalDate', header: 'Renewal Date', size: 180 },
        ]}
        data={policies}
        enableColumnPinning
        enableColumnResizing
        enableColumnReorder
        footer={false}
      />
    </div>
  ),
  // Geometry the jsdom suite cannot see — this runs in real Chromium. Each
  // check measures the rendered part, so a class change that keeps the
  // behaviour's name but not its shape (a 3×12 grip, a missing focus ring,
  // a menu floating over the sort arrow) fails here.
  play: async ({ canvasElement, step }) => {
    const sortButtons = () =>
      [...canvasElement.querySelectorAll<HTMLButtonElement>('thead [data-slot="data-grid-header-sort"]')].filter(
        (b) => b.getBoundingClientRect().width > 0
      );
    const sortFor = (label: string) => sortButtons().find((b) => b.textContent?.startsWith(label))!;
    const thOf = (el: Element) => el.closest('th')!;
    const handle = (label: string) => within(canvasElement).getByRole('separator', { name: `Resize column ${label}` });

    await step('focus ring: Figma inset double ring on the whole cell (17312:132)', async () => {
      const sort = sortFor('Status');
      sort.focus();
      // Guard: without :focus-visible the ring is legitimately hidden and
      // the checks below would measure nothing.
      await expect(sort.matches(':focus-visible')).toBe(true);
      const ring = getComputedStyle(sort, '::after');
      await expect(ring.display).toBe('block');
      await expect(ring.position).toBe('absolute');
      await expect(ring.top).toBe('2px');
      await expect(ring.left).toBe('2px');
      await expect(ring.borderTopWidth).toBe('2px');
      await expect(ring.borderTopStyle).toBe('solid');
      await expect(ring.boxShadow).toContain('inset');
      // Drawn against the <th>: the button itself must not be positioned.
      await expect(getComputedStyle(sort).position).toBe('static');
      sort.blur();
      await expect(getComputedStyle(sort, '::after').display).toBe('none');
    });

    await step('resize grip: 2×16, 1px in from the cell edge, shown on focus', async () => {
      const h = handle('Status');
      const grip = h.querySelector('[data-slot="data-grid-resize-grip"]') as HTMLElement;
      await expect(getComputedStyle(grip).display).toBe('none');
      h.focus();
      await expect(h.matches(':focus-visible')).toBe(true);
      await expect(getComputedStyle(grip).display).toBe('block');
      const r = grip.getBoundingClientRect();
      await expect(r.width).toBe(2);
      await expect(r.height).toBe(16);
      await expect(thOf(sortFor('Status')).getBoundingClientRect().right - r.right).toBeCloseTo(1, 0);
      h.blur();
    });

    await step('the menu never covers the sort icon while it shows', async () => {
      // Narrow an unpinned start-aligned and an end-aligned column until
      // their labels truncate — the case where the label group reaches the
      // edge the menu floats on. The pinned 120px column truncates already.
      for (const label of ['Status', 'Premium']) {
        for (let i = 0; i < 5; i++) fireEvent.keyDown(handle(label), { key: 'ArrowLeft', shiftKey: true });
      }
      for (const label of ['Policy name and line of business', 'Status', 'Premium', 'Renewal Date']) {
        const sort = sortFor(label);
        sort.click(); // sorted: arrow_upward in the primary colour
        sort.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        sort.focus(); // focus-within shows the menu, as hover does
        const th = thOf(sort);
        const menu = th.querySelector('[data-slot="data-grid-header-menu"]') as HTMLElement;
        await waitFor(() => expect(getComputedStyle(menu).opacity).toBe('1'));
        const icon = sort.querySelector('[data-glyph]')!.getBoundingClientRect();
        const glyph = menu.querySelector('[data-glyph]')!.getBoundingClientRect();
        const apart = icon.right <= glyph.left || icon.left >= glyph.right;
        await expect({ label, apart }).toEqual({ label, apart: true });
        // A click where the arrow is sorts; it must not open the menu.
        const hit = document.elementFromPoint(icon.left + icon.width / 2, icon.top + icon.height / 2);
        await expect({ label, hitSort: !!hit?.closest('[data-slot="data-grid-header-sort"]') }).toEqual({ label, hitSort: true });
        sort.blur();
      }
      // Guard: the truncating case really ran (it is the one that broke).
      const label = (l: string) => sortFor(l).querySelector('.truncate') as HTMLElement;
      for (const l of ['Policy name and line of business', 'Status', 'Premium']) {
        await expect({ l, truncates: label(l).scrollWidth > label(l).clientWidth }).toEqual({ l, truncates: true });
      }
    });
  },
};
