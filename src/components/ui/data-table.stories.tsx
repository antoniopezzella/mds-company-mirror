import type { DataGridColumnDef, DataGridTableInstance } from './data-grid-features';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDataGridTable } from './use-data-grid-table';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DataTable, createSelectColumn } from './data-table';
import { createActionsColumn } from './data-grid-row-actions';
import type { SelectionState } from './data-grid-selection';
import { Badge } from './badge';
import { formatCurrency } from '@/lib/format';
import { Button } from './button';

/**
 * # DataTable
 *
 * The docs page is `src/docs/46-DataTable.mdx` (attached to this file with
 * `<Meta of>`), so this meta carries no `autodocs` tag — the two would
 * collide on the same Docs entry.
 *
 * ~~"No MDS/Figma spec exists … reach for `Table` for the common case"~~ —
 * said until 2026-11-03. Neither was true by then: DataTable is built to the
 * MDS V3 Figma table, and `Table` is deprecated (see Choosing a table).
 */
const meta: Meta = {
  title: 'Components/DataTable',
  // For the Docs page's Controls block (prop names, types and JSDoc from
  // docgen). Every story but Playground has its own `render`, so this does
  // not change what they show.
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: { description: { component: [
      '**The default table.** Pass props, get a table.',
      '',
      '`DataTable` is a *preset* over [`DataGrid`](/docs/components-datagrid--docs) — it imports',
      'and renders it. The two have **identical capabilities**; every grid feature is reachable',
      'here through an `enable*` prop. Neither is the more powerful tier.',
      '',
      'Reach for `DataGrid` only when something outside the table must read or drive its state.',
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
  premium: number;
  renewalDate: string;
}

const policyData: Policy[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active', premium: 12400, renewalDate: '2026-03-14' },
  { id: 2, name: 'General Liability', status: 'Active', premium: 8200, renewalDate: '2026-05-01' },
  { id: 3, name: 'Cyber Liability', status: 'Pending', premium: 15900, renewalDate: '2026-01-22' },
  { id: 4, name: 'Property', status: 'Active', premium: 22000, renewalDate: '2026-07-09' },
  { id: 5, name: 'Workers Comp', status: 'Expired', premium: 9600, renewalDate: '2025-11-30' },
  { id: 6, name: 'Umbrella', status: 'Active', premium: 4100, renewalDate: '2026-04-18' },
  { id: 7, name: 'Marine Cargo', status: 'Pending', premium: 11750, renewalDate: '2026-02-27' },
];

const baseColumns: DataGridColumnDef<Policy>[] = [
  { accessorKey: 'name', header: 'Policy', enableSorting: true },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      // `soft` so the badge carries its own background — see the note in
      // data-grid.stories.tsx: row hover is Sky Blue and a transparent
      // outline badge's success green is 4.16:1 on it.
      return (
        <Badge variant="soft" tone={value === 'Active' ? 'success' : value === 'Expired' ? 'danger' : 'default'}>
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'premium',
    header: 'Premium',
    enableSorting: true,
    // `meta.type` does two jobs: it right-aligns the column (numbers only line
    // up when their last digit does), and it is the hook the filter schema
    // reads to say "over $500,000" rather than "over 500000".
    meta: { type: 'currency' },
    // decimals: 0 — whole premiums, so a column of ".00" is noise in a
    // scan-heavy table. Precision stays available where it matters (§48).
    cell: ({ getValue }) => formatCurrency(getValue<number>(), { decimals: 0 }),
  },
  { accessorKey: 'renewalDate', header: 'Renewal Date', enableSorting: true },
];

export const Default: StoryObj = {
  render: () => <DataTable columns={baseColumns} data={policyData} searchKey="name" searchPlaceholder="Search policies..." pageSize={5} />,
};

/**
 * Every control below drives this table live. Columns and data are fixed —
 * see the Columns section of the Docs page for how to declare your own.
 */
export const Playground: StoryObj<typeof DataTable<Policy, unknown>> = {
  // Shown once, in the Docs page's Playground section — not again in Examples.
  tags: ['!autodocs'],
  args: {
    title: 'Policies',
    meta: '5 policies • 2 renewing this quarter',
    searchKey: 'name',
    searchPlaceholder: 'Search policies...',
    pageSize: 5,
    paginationVariant: 'compact',
    striped: false,
    defaultDensity: 'standard',
    enableColumnVisibility: true,
    enableDensityToggle: true,
    enableExport: false,
    enableSortList: false,
    enableColumnResizing: false,
    enableColumnPinning: false,
    enableColumnReorder: false,
    pinFirstColumn: true,
    loading: false,
    fetching: false,
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
    table: { control: false },
    paginationVariant: { control: 'inline-radio', options: ['compact', 'pages', 'jump'] },
    defaultDensity: { control: 'inline-radio', options: ['compact', 'standard', 'comfortable'] },
  },
  render: (args) => <DataTable {...args} columns={baseColumns} data={policyData} />,
};

export const WithRowSelection: StoryObj = {
  render: () => (
    <DataTable
      columns={[createSelectColumn<Policy>(), ...baseColumns]}
      data={policyData}
      enableRowSelection
      pageSize={5}
    />
  ),
};

/**
 * **"Select all" must never be ambiguous.**
 *
 * The header checkbox selects the PAGE — it says so, because that is what it
 * does. Selecting every record matching the current filters is a separate,
 * explicit act, and the banner states which scope is in force at all times.
 *
 * This matters most in server mode: the client holds one page, so "all 1,284"
 * cannot be a set of selected rows — there are no row objects for the other
 * 1,279. It is a flag about the QUERY. A bulk action must branch on
 * `allFilteredRowsSelected` and send the filter state, not `selectedRowIds`.
 *
 * Note each checkbox is named after its record ("Select Commercial Auto"),
 * not its position: position changes under sorting and filtering.
 */
export const SelectAllResults: StoryObj = {
  render: function Render() {
    const [selection, setSelection] = useState<SelectionState | null>(null);
    return (
      <div className="flex flex-col gap-3">
        <DataTable
          columns={[createSelectColumn<Policy>({ getRowLabel: (p) => p.name }), ...baseColumns]}
          data={policyData}
          enableRowSelection
          selectionNoun="policy"
          selectionNounPlural="policies"
          pageSize={3}
          onSelectionChange={setSelection}
        />
        <pre className="rounded-lg p-3 text-xs" style={{ background: 'var(--role-bg-neutral-subtle)' }}>
{JSON.stringify(
  {
    selectedRowIds: selection?.selectedRowIds ?? [],
    selectedVisibleRows: selection?.selectedVisibleRows ?? 0,
    allFilteredRowsSelected: selection?.allFilteredRowsSelected ?? false,
    totalFilteredCount: selection?.totalFilteredCount ?? 0,
  },
  null,
  2
)}
        </pre>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('the header checkbox says it selects the page', async () => {
      await expect(
        canvas.getByRole('checkbox', { name: 'Select all rows on this page' })
      ).toBeInTheDocument();
    });
    await step('each row is named after its record, not its position', async () => {
      await expect(
        canvas.getByRole('checkbox', { name: 'Select Commercial Auto' })
      ).toBeInTheDocument();
    });
    await step('escalating states the wider scope', async () => {
      await userEvent.click(canvas.getByRole('checkbox', { name: 'Select all rows on this page' }));
      const escalate = await canvas.findByRole('button', { name: /Select all \d+ results/ });
      await userEvent.click(escalate);
      await expect(canvas.getByRole('status')).toHaveTextContent(/All \d+ policies matching/);
    });
  },
};

/**
 * **Bulk actions (§10).** Selection exists to enable an operation; until this
 * landed, it enabled reporting that one *could* happen.
 *
 * The actions live inside the selection banner rather than a bar of their own,
 * because the first requirement is that the count context is not hidden from
 * the button that acts on it.
 *
 * Three things here are easy to leave out and are why this is a component:
 *
 * - **Scope in the confirmation.** Escalate to "all results" and the dialog
 *   changes from "Delete 3 selected policies?" to "Delete all N policies
 *   matching the current filters?". The copy is generated from the live
 *   selection, so it cannot drift from what the handler receives.
 * - **Partial success.** "Assign" here fails one record on purpose. Bulk
 *   operations half-fail routinely, and a success toast after that is a lie.
 * - **Permissions.** "Delete" is disabled with a reason, rather than absent.
 */
export const BulkActions: StoryObj = {
  render: function Render() {
    const [log, setLog] = useState<string>('No action run yet.');
    return (
      <div className="flex flex-col gap-3">
        <DataTable
          columns={[createSelectColumn<Policy>({ getRowLabel: (p) => p.name }), ...baseColumns]}
          data={policyData}
          enableRowSelection
          selectionNoun="policy"
          selectionNounPlural="policies"
          pageSize={3}
          bulkActions={[
            {
              id: 'export',
              label: 'Export',
              onAction: (s) =>
                setLog(
                  s.allFilteredRowsSelected
                    ? `Export requested for all ${s.totalFilteredCount} filtered policies (send the FILTERS to the server, not the ids).`
                    : `Export requested for ${s.selectedRowIds.length} ids: ${s.selectedRowIds.join(', ')}`
                ),
            },
            {
              id: 'assign',
              label: 'Assign',
              onAction: (s) => {
                setLog(`Assign ran against ${s.selectedRowIds.length} policies.`);
                return { succeeded: Math.max(s.selectedRowIds.length - 1, 0), failed: [{ id: 'POL-2', reason: 'Locked by another user' }] };
              },
            },
            {
              id: 'delete',
              label: 'Delete',
              destructive: true,
              disabled: true,
              disabledReason: 'You cannot delete bound policies',
              onAction: () => {},
            },
          ]}
        />
        <p className="text-sm text-muted-foreground" data-testid="log">{log}</p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('actions appear only once something is selected', async () => {
      await expect(canvas.queryByRole('button', { name: 'Export' })).toBeNull();
      await userEvent.click(canvas.getByRole('checkbox', { name: 'Select all rows on this page' }));
      await expect(canvas.getByRole('button', { name: 'Export' })).toBeInTheDocument();
    });
    await step('a disabled action explains itself instead of vanishing', async () => {
      const del = canvas.getByRole('button', { name: 'Delete' });
      await expect(del).toBeDisabled();
      await expect(del).toHaveAttribute('title', 'You cannot delete bound policies');
    });
    await step('the handler receives the scope', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Export' }));
      await expect(canvas.getByTestId('log')).toHaveTextContent(/Export requested for 3 ids/);
    });
  },
};

/**
 * **Row actions (§11).** Most of that section is about restraint: do not
 * overload every row with visible buttons, promote at most one common action,
 * and move the rest into overflow.
 *
 * So: one `View` button, everything else behind the menu, destructive items
 * separated and confirmed.
 *
 * Each control is named after its record — "More actions for Commercial
 * Auto", not forty buttons called "More actions". And acting on a row does not
 * fire `onRowClick`: §34 lists that conflict explicitly, and this column is the
 * case that breaks it if the markup drifts.
 */
export const RowActions: StoryObj = {
  render: function Render() {
    const [log, setLog] = useState('No action run yet.');
    return (
      <div className="flex flex-col gap-3">
        <DataTable
          columns={[
            ...baseColumns,
            createActionsColumn<Policy>({
              getRowLabel: (p) => p.name,
              primary: { label: 'View', onAction: (p) => setLog(`Viewing ${p.name}`) },
              actions: [
                { id: 'edit', label: 'Edit', onAction: (p) => setLog(`Editing ${p.name}`) },
                {
                  id: 'renew',
                  label: 'Renew',
                  disabled: (p) => p.status !== 'Active',
                  disabledReason: 'Only active policies can be renewed',
                  onAction: (p) => setLog(`Renewing ${p.name}`),
                },
                {
                  id: 'delete',
                  label: 'Delete',
                  destructive: true,
                  onAction: (p) => setLog(`Deleted ${p.name}`),
                },
              ],
            }),
          ]}
          data={policyData}
          pageSize={4}
          onRowClick={(row) => setLog(`Row opened: ${row.original.name} (NOT fired by the action buttons)`)}
        />
        <p className="text-sm text-muted-foreground" data-testid="log">{log}</p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('controls are named after their record', async () => {
      await expect(canvas.getByRole('button', { name: 'View Commercial Auto' })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'More actions for Commercial Auto' })).toBeInTheDocument();
    });
    await step('acting on a row does not also open the row', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'View Commercial Auto' }));
      await expect(canvas.getByTestId('log')).toHaveTextContent('Viewing Commercial Auto');
    });
  },
};

export const WithColumnVisibility: StoryObj = {
  render: () => (
    <DataTable columns={baseColumns} data={policyData} searchKey="name" enableColumnVisibility pageSize={5} />
  ),
};

function FullFeaturedDemo() {
  // The row menu pins through the table instance, so the story owns it
  // (`table` prop) — every other prop keeps working on an owned table.
  const tableRef = useRef<DataGridTableInstance<Policy> | null>(null);
  const columns = useMemo<DataGridColumnDef<Policy>[]>(() => {
    const rowOf = (p: Policy) => tableRef.current?.getRow(String(p.id), true);
    return [
      createSelectColumn<Policy>({ getRowLabel: (p) => p.name }),
      ...baseColumns,
      createActionsColumn<Policy>({
        getRowLabel: (p) => p.name,
        actions: [
          { id: 'open', label: 'Open policy', onAction: () => undefined },
          // Hand-off 5b#3: "Pin to top" from the row menu.
          { id: 'pin', label: 'Pin to top', hidden: (p) => !!rowOf(p)?.getIsPinned(), onAction: (p) => rowOf(p)?.pin('top') },
          { id: 'unpin', label: 'Unpin', hidden: (p) => !rowOf(p)?.getIsPinned(), onAction: (p) => rowOf(p)?.pin(false) },
        ],
      }),
    ];
  }, []);
  const table = useDataGridTable<Policy>({
    columns,
    data: largePolicyData,
    facetedColumnIds: ['status'],
    dateColumnIds: ['renewalDate'],
    enableRowSelection: true,
    enableColumnPinning: true,
    enableRowPinning: true,
    pageSize: 8,
    getRowId: (p) => String(p.id),
  });
  tableRef.current = table;
  useEffect(() => {
    // Policy opens pinned (edge + keep_off in its header) and one row opens
    // pinned, so the Banded pinned region and its rule show.
    table.setColumnPinning({ start: ['select', 'name'], end: [] });
    table.setRowPinning({ top: ['4'], bottom: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DataTable
      table={table}
      columns={columns}
      data={largePolicyData}
      searchKey="name"
      searchPlaceholder="Search policies..."
      enableRowSelection
      selectionNoun="policy"
      selectionNounPlural="policies"
      bulkActions={[
        { id: 'assign', label: 'Assign', onAction: async (sel) => ({ succeeded: sel.selectedRowIds.length }) },
        { id: 'delete', label: 'Delete', destructive: true, onAction: async (sel) => ({ succeeded: sel.selectedRowIds.length }) },
      ]}
      facetedFilters={[{ columnId: 'status', title: 'Status' }]}
      dateFilters={[{ columnId: 'renewalDate', title: 'Renewal' }]}
      enableSortList
      enableColumnVisibility
      enableColumnPinning
      enableRowPinning
      enableDensityToggle
      enableExport
      exportFilename="policies"
      pageSize={8}
      pageSizeOptions={[8, 25, 50]}
      maxHeight={480}
    />
  );
}

export const FullFeatured: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'Hand-off T10: every 5b feature on at once — column pinning (Policy pinned; the header menu offers **Pin column** / Unpin, the end side only for Actions), row pinning (the row menu\'s **Pin to top**; pinned rows take the Banded fill above a 1px `border/default` rule), the Table settings gear (columns + density), Export, the Sort list, the Status facet and Renewal date filter, the select-all-filtered scope ("Select all 150") and bulk actions. The play function walks the controls with **Tab only** and checks each one shows a focus ring.',
      },
    },
  },
  render: () => <FullFeaturedDemo />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await canvas.findByRole('button', { name: 'More actions for Property #4' });
    const nameOf = (el: Element) =>
      el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.textContent?.trim() || '';
    /** Tabs once round the page, recording each stop's name and whether it shows a ring. */
    const walk = async () => {
      (document.activeElement as HTMLElement | null)?.blur();
      const stops = new Map<string, boolean>();
      for (let i = 0; i < 80; i++) {
        await userEvent.tab();
        const el = document.activeElement;
        if (!el || el === document.body || !canvasElement.contains(el)) break;
        const name = nameOf(el);
        if (stops.has(name)) break;
        // Rings that fade in (transition-shadow) start transparent: give
        // them up to 300 ms before calling one missing.
        let ring = focusRingVisible(el);
        for (let t = 0; !ring && t < 6; t++) {
          await new Promise((r) => setTimeout(r, 50));
          ring = focusRingVisible(el);
        }
        stops.set(name, ring);
      }
      return stops;
    };

    await step('Tab alone reaches every feature control, each with a visible focus ring', async () => {
      const stops = await walk();
      for (const name of [
        'Search policies',
        'Filter by Status',
        'Filter by Renewal',
        'Unpin all',
        'Sort',
        'Table settings',
        'Export CSV',
        'Select all rows on this page',
        'Policy',
        'Unpin Policy',
        'Column options for Policy',
        'Column options for Premium',
        'Select Property #4',
        'More actions for Property #4',
        'Next page',
      ]) {
        await expect(stops.has(name), `reached "${name}" — stops: ${[...stops.keys()].join(' | ')}`).toBe(true);
        await expect(stops.get(name), `focus ring on "${name}"`).toBe(true);
      }
    });

    await step('the ring check can fail: an unfocused control has none', async () => {
      await expect(focusRingVisible(canvas.getByRole('button', { name: 'Export CSV' }))).toBe(false);
    });

    await step('Space selects the page; the select-all-filtered scope and bulk actions follow by Tab', async () => {
      const selectAll = canvas.getByRole('checkbox', { name: 'Select all rows on this page' });
      selectAll.focus();
      await userEvent.keyboard(' ');
      await canvas.findByRole('button', { name: /^Select all \d+$/ });
      const stops = await walk();
      const escalate = [...stops.keys()].find((n) => /^Select all \d+$/.test(n));
      await expect(escalate, 'reached Select all N').toBeDefined();
      await expect(stops.get(escalate!)).toBe(true);
      for (const name of ['Assign', 'Delete', 'Clear selection']) {
        await expect(stops.has(name), `reached "${name}" — stops: ${[...stops.keys()].join(' | ')}`).toBe(true);
        await expect(stops.get(name), `focus ring on "${name}"`).toBe(true);
      }
    });

    await step('the row menu offers Pin to top from the keyboard', async () => {
      const more = canvas.getByRole('button', { name: 'More actions for Commercial Auto #1' });
      more.focus();
      await userEvent.keyboard('{Enter}');
      const menu = await within(document.body).findByRole('menu');
      await expect(within(menu).getByRole('menuitem', { name: 'Pin to top' })).toBeInTheDocument();
      await userEvent.keyboard('{Escape}');
      // Closed before axe runs: an open Radix menu aria-hides the rest.
      await waitFor(() => expect(within(document.body).queryByRole('menu')).toBeNull());
      await expect(more).toHaveFocus();
    });
  },
};

/**
 * True when `el` paints a focus indicator: an outline, a non-transparent box
 * shadow, or the 2px `::after` frame the grid's header buttons draw. The
 * search field's ring is on its wrapping label (`focus-within`).
 */
function focusRingVisible(el: Element): boolean {
  const host = el.closest('[data-slot="data-grid-toolbar-search"]') ?? el;
  const cs = getComputedStyle(host);
  const after = getComputedStyle(el, '::after');
  const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
  const shadow =
    cs.boxShadow !== 'none' &&
    cs.boxShadow.split(/,(?![^(]*\))/).some((part) => !/rgba\([^)]*,\s*0\)/.test(part));
  const frame = after.content !== 'none' && after.display !== 'none' && parseFloat(after.borderTopWidth) > 0;
  return outline || shadow || frame;
}

export const Loading: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Data has not arrived yet — renders skeleton rows matching the column count. Mirrors DataGrid\'s LoadingState story for parity.',
      },
    },
  },
  render: () => <DataTable columns={baseColumns} data={[]} loading pageSize={5} />,
};

export const Empty: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'Data has arrived and there\'s genuinely nothing to show — rendered with the shared `Empty` component rather than a bare line of text. Mirrors DataGrid\'s EmptyState story for parity.',
      },
    },
  },
  render: () => <DataTable columns={baseColumns} data={[]} pageSize={5} />,
};

export const EmptyFiltered: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'The other empty state: rows exist, but the current search excludes all of them. DataTable tells the two apart, so this one gets a different icon and message plus a "Clear search" action — offering that when nothing was searched would just be noise. The play function types a non-matching term to reach this state.',
      },
    },
  },
  render: () => <DataTable columns={baseColumns} data={policyData} searchKey="name" searchPlaceholder="Search policies..." pageSize={5} />,
  play: async ({ canvasElement }) => {
    const search = canvasElement.querySelector('input') as HTMLInputElement;
    await userEvent.type(search, 'zzzzz');
  },
};

export const EmptyCustom: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Pass `emptyState` to replace the built-in block entirely — for cases where the table sits in a flow with its own call to action.',
      },
    },
  },
  render: () => (
    <DataTable
      columns={baseColumns}
      data={[]}
      pageSize={5}
      emptyState={
        <div className="flex flex-col items-center gap-2 p-10 text-center">
          <span className="text-base font-medium">No policies bound yet</span>
          <span className="text-sm opacity-70">Once a quote is bound it will appear in this table.</span>
        </div>
      }
    />
  ),
};

export const FullToolbar: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'Every toolbar option turned on: search plus per-column filters on the left; on the right the optional Sort list (multi-column sort — off by default, since headers sort on click), the gear (**Table settings**: columns, arrange, density, reset), Export and page actions. Every trigger shares one compact dashed shape at `text-xs`, half a step tighter than a stock `sm` button — a row of filters should read as filters, not as a row of buttons — while keeping the `h-8` control height so it still lines up with the search field. Selecting a value only appends a chip: the leading icon never changes and there is no separator, so the first click does not shove the rest of the row sideways. **Status** is a faceted multi-select with per-value counts derived from the column itself, collapsing to a count past two selections. **Renewal** is a date range — a facet would list every distinct date in the data, which stops being usable the moment there are more than a handful. Reset appears whenever any filter is active and clears all of them.',
      },
    },
  },
  render: () => (
    <DataTable
      columns={baseColumns}
      data={largePolicyData}
      searchKey="name"
      searchPlaceholder="Search policies..."
      pageSize={8}
      facetedFilters={[{ columnId: 'status', title: 'Status' }]}
      dateFilters={[{ columnId: 'renewalDate', title: 'Renewal' }]}
      enableSortList
      enableColumnVisibility
      enableDensityToggle
      enableExport
      exportFilename="policies"
      toolbarActions={
        <Button variant="outline" size="sm" className="px-2 text-xs font-normal">
          New policy
        </Button>
      }
    />
  ),
};

function InlineEditDemo() {
  const [rows, setRows] = useState<Policy[]>(policyData);
  const [log, setLog] = useState<string[]>([]);

  const editableColumns: DataGridColumnDef<Policy>[] = [
    { accessorKey: 'name', header: 'Policy', enableSorting: true, meta: { editable: true } },
    baseColumns[1],
    { accessorKey: 'premium', header: 'Premium', enableSorting: true, meta: { editable: true } },
    { accessorKey: 'renewalDate', header: 'Renewal Date', enableSorting: true, meta: { editable: true } },
  ];

  return (
    <div className="flex flex-col gap-3">
      <DataTable
        columns={editableColumns}
        data={rows}
        pageSize={5}
        onCellEdit={({ rowIndex, columnId, value, previousValue }) => {
          setRows((prev) => prev.map((r, i) => (i === rowIndex ? { ...r, [columnId]: value } : r)));
          setLog((l) => [`${columnId}: "${previousValue}" → "${value}"`, ...l].slice(0, 4));
        }}
      />
      <div className="text-xs opacity-70">
        {log.length ? log.map((l, i) => <div key={i}>{l}</div>) : 'Double-click a Policy, Premium or Renewal Date cell — or focus one and press Enter.'}
      </div>
    </div>
  );
}

export const InlineEditing: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'Columns marked `meta: { editable: true }` become editable in place: double-click, or focus the cell and press Enter/F2. Enter or blur commits, Escape discards. `onCellEdit` fires only when the value actually changed — DataTable keeps no copy of your data, so the handler owns persisting it (here, story state). The Status column is left non-editable to show the two side by side.',
      },
    },
  },
  render: () => <InlineEditDemo />,
};

// ── Large dataset — feature-parity showcase ──────────────────────────────────
// ~150 generated rows (deterministic, not Math.random — keeps this story
// reproducible across runs/snapshots) exercising every opt-in feature added
// in the MUI DataGrid feature-parity pass: column resizing, sticky header
// (bounded via maxHeight), CSV export, and the density toggle.

const POLICY_TYPES = ['Commercial Auto', 'General Liability', 'Cyber Liability', 'Property', 'Workers Comp', 'Umbrella', 'Marine Cargo', 'Professional Liability'];

function generatePolicies(count: number): Policy[] {
  return Array.from({ length: count }, (_, i) => {
    const type = POLICY_TYPES[i % POLICY_TYPES.length];
    const status = ['Active', 'Active', 'Active', 'Pending', 'Expired'][i % 5]; // weighted toward Active, like real data
    const premium = 3000 + ((i * 733) % 40000);
    const month = String((i % 12) + 1).padStart(2, '0');
    const day = String((i % 27) + 1).padStart(2, '0');
    return {
      id: i + 1,
      name: `${type} #${i + 1}`,
      status,
      premium,
      renewalDate: `2026-${month}-${day}`,
    };
  });
}

const largePolicyData = generatePolicies(150);

export const LargeDataset: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          '150 rows exercising the full MUI-DataGrid feature-parity set at once: drag a column border to resize (keyboard: focus the border, Left/Right, Shift for a bigger step), scroll the body to see the sticky header, switch Density, and Export CSV (exports every filtered row\'s raw values, not just the current page).',
      },
    },
  },
  render: () => (
    <DataTable
      columns={baseColumns}
      data={largePolicyData}
      searchKey="name"
      searchPlaceholder="Search policies..."
      pageSize={10}
      enableColumnResizing
      enableExport
      exportFilename="policies"
      enableDensityToggle
      maxHeight={420}
    />
  ),
};

// ── Server-side (manual) pagination ──────────────────────────────────────────
// Demonstrates wiring DataTable to a real paginated API: `data` is only ever
// the current page's rows, `manualPagination`/`pageCount`/`rowCount` come
// from the "server", and `onPaginationChange` re-fetches. The setTimeout
// below stands in for a real network call.

const SERVER_PAGE_SIZE = 10;
const serverDataset = generatePolicies(87); // deliberately not a round multiple of the page size, to exercise a partial last page

function fakeFetchPage(pageIndex: number, pageSize: number): Promise<{ rows: Policy[]; rowCount: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = pageIndex * pageSize;
      resolve({ rows: serverDataset.slice(start, start + pageSize), rowCount: serverDataset.length });
    }, 400);
  });
}

function ServerSidePaginationDemo() {
  const [pageSize, setPageSize] = useState(SERVER_PAGE_SIZE);
  const [rows, setRows] = useState<Policy[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(true);
  // After the first page, a page change keeps the current rows on screen and
  // dims them (`fetching`) rather than swapping them for skeletons (hand-off
  // 5b#26) — the layout does not jump while the next page is in flight.
  const [fetching, setFetching] = useState(false);

  const fetchPage = (nextPageIndex: number, nextPageSize: number, first = false) => {
    if (first) setLoading(true);
    else setFetching(true);
    fakeFetchPage(nextPageIndex, nextPageSize).then(({ rows: newRows, rowCount: newRowCount }) => {
      setRows(newRows);
      setRowCount(newRowCount);
      setLoading(false);
      setFetching(false);
    });
  };

  useEffect(() => {
    fetchPage(0, SERVER_PAGE_SIZE, true);
  }, []);

  return (
    <DataTable
      columns={baseColumns}
      data={rows}
      loading={loading}
      fetching={fetching}
      pageSize={pageSize}
      manualPagination
      pageCount={Math.ceil(rowCount / pageSize)}
      rowCount={rowCount}
      onPaginationChange={(nextPageIndex, nextPageSize) => {
        setPageSize(nextPageSize);
        fetchPage(nextPageIndex, nextPageSize);
      }}
    />
  );
}

export const ServerSidePagination: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'DataTable wired to a simulated server API — `data` is only ever the current page (87 total rows, fetched 10 at a time with a 400ms delay standing in for the network round-trip). The first page loads with skeletons (`loading`); every later page keeps the current rows dimmed to 60% while it fetches (`fetching`), and focus moves to the new page\'s first row. `manualPagination` + `pageCount` + `rowCount` tell DataTable to trust the server\'s page count rather than slicing `data` itself; `onPaginationChange` is where a real app would call its API.',
      },
    },
  },
  render: () => <ServerSidePaginationDemo />,
};
