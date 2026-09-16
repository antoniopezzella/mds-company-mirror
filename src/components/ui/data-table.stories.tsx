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
