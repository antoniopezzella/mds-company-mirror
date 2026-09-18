import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, type TableColumn } from './table';
import { Badge } from './badge';

/**
 * # Table
 *
 * Radix-free, `getRoleColor()`-driven counterpart to the MUI `Table`. Covers
 * the core feature set — columns, sorting, row selection, loading skeletons,
 * pagination (via the `Pagination`) — matching the MUI twin's API for
 * those props. The more exotic scroll-shadow / sticky-first-column polish
 * from the MUI version isn't ported in this first pass.
 */
const meta: Meta = {
  title: 'Components/Table',
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

const policyColumns: TableColumn<Policy>[] = [
  { key: 'name', header: 'Policy', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (value) => (
      <Badge tone={value === 'Active' ? 'success' : 'default'}>{value as string}</Badge>
    ),
  },
  { key: 'premium', header: 'Premium', align: 'right', sortable: true },
  { key: 'renewalDate', header: 'Renewal Date', sortable: true },
];

const policyData: Policy[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active', premium: '$12,400', renewalDate: '2026-03-14' },
  { id: 2, name: 'General Liability', status: 'Active', premium: '$8,200', renewalDate: '2026-05-01' },
  { id: 3, name: 'Cyber Liability', status: 'Pending', premium: '$15,900', renewalDate: '2026-01-22' },
  { id: 4, name: 'Property', status: 'Active', premium: '$22,000', renewalDate: '2026-07-09' },
  { id: 5, name: 'Workers Comp', status: 'Expired', premium: '$9,600', renewalDate: '2025-11-30' },
];

export const Default: StoryObj = {
  render: () => <Table columns={policyColumns} data={policyData} />,
};

export const Striped: StoryObj = {
  render: () => <Table columns={policyColumns} data={policyData} variant="striped" />,
};

export const Bordered: StoryObj = {
  render: () => <Table columns={policyColumns} data={policyData} variant="bordered" hoverable />,
};

export const Sortable: StoryObj = {
  render: () => <Table columns={policyColumns} data={policyData} sortable hoverable />,
};

export const Selectable: StoryObj = {
  render: () => (
    <Table columns={policyColumns} data={policyData} selectable onRowSelect={(rows) => console.debug('Selected:', rows)} />
  ),
};

const emptyPolicyData: Policy[] = [];

export const Loading: StoryObj = {
  render: () => <Table columns={policyColumns} data={emptyPolicyData} loading />,
};

export const EmptyState: StoryObj = {
  render: () => <Table columns={policyColumns} data={emptyPolicyData} emptyMessage="No policies found" />,
};

export const Compact: StoryObj = {
  render: () => <Table columns={policyColumns} data={policyData} variant="compact" size="sm" />,
};

export const WithPagination: StoryObj = {
  render: () => {
    const bigData: Policy[] = Array.from({ length: 47 }, (_, i) => ({
      id: i + 1,
      name: `Policy ${i + 1}`,
      status: i % 3 === 0 ? 'Pending' : 'Active',
      premium: `$${(1000 + i * 137).toLocaleString()}`,
      renewalDate: '2026-06-01',
    }));
    return (
      <Table
        columns={policyColumns}
        data={bigData}
        hoverable
        pagination={{ enabled: true, pageSize: 10 }}
      />
    );
  },
};
