import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable, createSelectColumn } from './data-table';
import { Badge } from './badge';

/**
 * # DataTable (shadcn/ui)
 *
 * No MDS/Figma spec exists for this component — built matching real
 * shadcn/ui's TanStack-Table-based recipe (`@tanstack/react-table`), reusing
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

const baseColumns: ColumnDef<Policy>[] = [
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
        story: 'Data has arrived and there\'s genuinely nothing to show. Mirrors DataGrid\'s EmptyState story for parity.',
      },
    },
  },
  render: () => <DataTable columns={baseColumns} data={[]} pageSize={5} />,
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
