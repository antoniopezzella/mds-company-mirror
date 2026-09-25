import type { DataGridColumnDef } from './data-grid-features';
import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { DataTable, createSelectColumn } from './data-table';
import type { SelectionState } from './data-grid-selection';
import { Badge } from './badge';
import { Button } from './button';

/**
 * # DataTable
 *
 * No MDS/Figma spec exists for this component — built matching the standard TanStack-Table-based recipe (`@tanstack/react-table`), reusing
 * this repo's own `Checkbox`/`Pagination`/`Input`/`DropdownMenu` atoms
 * rather than duplicating them.
 *
 * This is a separate, more powerful sibling to `table.tsx`'s hand-rolled
 * `Table` — reach for `Table` for the common case, `DataTable` when you
 * need column filtering/visibility toggling on top of sorting/selection/
 * pagination.
 */
const meta: Meta = {
  title: 'Components/DataTable',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
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

const policyData: Policy[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active', premium: '$12,400', renewalDate: '2026-03-14' },
  { id: 2, name: 'General Liability', status: 'Active', premium: '$8,200', renewalDate: '2026-05-01' },
  { id: 3, name: 'Cyber Liability', status: 'Pending', premium: '$15,900', renewalDate: '2026-01-22' },
  { id: 4, name: 'Property', status: 'Active', premium: '$22,000', renewalDate: '2026-07-09' },
  { id: 5, name: 'Workers Comp', status: 'Expired', premium: '$9,600', renewalDate: '2025-11-30' },
  { id: 6, name: 'Umbrella', status: 'Active', premium: '$4,100', renewalDate: '2026-04-18' },
  { id: 7, name: 'Marine Cargo', status: 'Pending', premium: '$11,750', renewalDate: '2026-02-27' },
];

const baseColumns: DataGridColumnDef<Policy>[] = [
  { accessorKey: 'name', header: 'Policy', enableSorting: true },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <Badge tone={value === 'Active' ? 'success' : value === 'Expired' ? 'danger' : 'default'}>{value}</Badge>;
    },
  },
  { accessorKey: 'premium', header: 'Premium', enableSorting: true },
  { accessorKey: 'renewalDate', header: 'Renewal Date', enableSorting: true },
];

export const Default: StoryObj = {
  render: () => <DataTable columns={baseColumns} data={policyData} searchKey="name" searchPlaceholder="Search policies..." pageSize={5} />,
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
        <pre className="rounded-lg p-3 text-xs" style={{ background: 'var(--role-surface-subtle)' }}>
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

export const WithColumnVisibility: StoryObj = {
  render: () => (
    <DataTable columns={baseColumns} data={policyData} searchKey="name" enableColumnVisibility pageSize={5} />
  ),
};

export const FullFeatured: StoryObj = {
  render: () => (
    <DataTable
      columns={[createSelectColumn<Policy>(), ...baseColumns]}
      data={policyData}
      searchKey="name"
      searchPlaceholder="Search policies..."
      enableRowSelection
      enableColumnVisibility
      pageSize={5}
    />
  ),
};

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
          'The tablecn toolbar shape: search plus per-column filters on the left, Sort / Density / Export / Columns and any page actions on the right. Every trigger shares one compact dashed shape at `text-xs`, half a step tighter than a stock `sm` button — a row of filters should read as filters, not as a row of buttons — while keeping the `h-8` control height so it still lines up with the search field. Selecting a value only appends a chip: the leading icon never changes and there is no separator, so the first click does not shove the rest of the row sideways. **Status** is a faceted multi-select with per-value counts derived from the column itself, collapsing to a count past two selections. **Renewal** is a date range — a facet would list every distinct date in the data, which stops being usable the moment there are more than a handful. Reset appears whenever any filter is active and clears all of them.',
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
      premium: `$${premium.toLocaleString()}`,
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

  const fetchPage = (nextPageIndex: number, nextPageSize: number) => {
    setLoading(true);
    fakeFetchPage(nextPageIndex, nextPageSize).then(({ rows: newRows, rowCount: newRowCount }) => {
      setRows(newRows);
      setRowCount(newRowCount);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPage(0, SERVER_PAGE_SIZE);
  }, []);

  return (
    <DataTable
      columns={baseColumns}
      data={rows}
      loading={loading}
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
          'DataTable wired to a simulated server API — `data` is only ever the current page (87 total rows, fetched 10 at a time with a 400ms delay standing in for the network round-trip). `manualPagination` + `pageCount` + `rowCount` tell DataTable to trust the server\'s page count rather than slicing `data` itself; `onPaginationChange` is where a real app would call its API.',
      },
    },
  },
  render: () => <ServerSidePaginationDemo />,
};
