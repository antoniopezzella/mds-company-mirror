import type { Meta, StoryObj } from '@storybook/react-vite';
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Chip } from '../Chip/Chip';
import { MDSDataGrid } from './DataGrid';

const meta = {
  title: 'Legacy MUI/DataGrid',
  component: MDSDataGrid,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**MDSDataGrid** is a themed wrapper around [\`@mui/x-data-grid\`](https://mui.com/x/react-data-grid/)
that applies MDS role-based colours automatically.

All standard DataGrid props are supported. Columns use \`GridColDef\` and rows use \`GridRowsProp\`.

\`\`\`tsx
import { MDSDataGrid } from 'components/DataGrid';
import type { GridColDef } from 'components/DataGrid';
\`\`\`
`,
      },
    },
  },
} satisfies Meta<typeof MDSDataGrid>;

export default meta;
type Story = StoryObj<typeof MDSDataGrid>;

// ── Shared column helpers ─────────────────────────────────────────────────────

const statusChipCell = (value: string) => {
  const tone =
    value === 'Active' ? 'success' :
    value === 'Pending' || value === 'Under Review' ? 'warning' :
    value === 'Expired' || value === 'Rejected' ? 'danger' as const :
    'default';
  return <Chip label={value} tone={tone} size="sm" />;
};

// ── Policy data ───────────────────────────────────────────────────────────────

const policyRows: GridRowsProp = [
  { id: 1, policyNumber: 'POL-2024-001', client: 'Acme Corporation',        type: 'Commercial Property',   premium: 125000, status: 'Active',  renewalDate: '2025-06-15', broker: 'John Smith'      },
  { id: 2, policyNumber: 'POL-2024-002', client: 'Global Tech Industries',  type: 'Cyber Liability',       premium: 85000,  status: 'Active',  renewalDate: '2025-03-22', broker: 'Sarah Johnson'   },
  { id: 3, policyNumber: 'POL-2024-003', client: 'Midwest Manufacturing',   type: 'Workers Compensation',  premium: 210000, status: 'Pending', renewalDate: '2025-08-10', broker: 'Michael Chen'    },
  { id: 4, policyNumber: 'POL-2024-004', client: 'Healthcare Partners',     type: 'Professional Liability',premium: 310000, status: 'Active',  renewalDate: '2025-05-18', broker: 'Emily Rodriguez' },
  { id: 5, policyNumber: 'POL-2024-005', client: 'Oceanic Shipping Co.',    type: 'Marine Cargo',          premium: 520000, status: 'Active',  renewalDate: '2025-04-30', broker: 'David Park'      },
  { id: 6, policyNumber: 'POL-2024-006', client: 'Retail Ventures LLC',     type: 'Business Interruption', premium: 195000, status: 'Expired', renewalDate: '2024-12-01', broker: 'Robert Martinez' },
  { id: 7, policyNumber: 'POL-2024-007', client: 'Metro Construction Ltd.', type: 'General Liability',     premium: 275000, status: 'Pending', renewalDate: '2025-07-14', broker: 'Lisa Thompson'   },
  { id: 8, policyNumber: 'POL-2024-008', client: 'TechCorp Solutions',      type: 'Cyber Liability',       premium: 185000, status: 'Active',  renewalDate: '2025-03-22', broker: 'James Wilson'    },
];

const policyColumns: GridColDef[] = [
  { field: 'policyNumber', headerName: 'Policy Number', width: 140 },
  { field: 'client',       headerName: 'Client Name',   flex: 1,    minWidth: 180 },
  { field: 'type',         headerName: 'Coverage Type', flex: 1,    minWidth: 180 },
  {
    field: 'premium',
    headerName: 'Annual Premium',
    width: 150,
    type: 'number',
    align: 'right',
    headerAlign: 'right',
    valueFormatter: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => statusChipCell(params.value as string),
  },
  { field: 'renewalDate', headerName: 'Renewal Date',    width: 130 },
  { field: 'broker',      headerName: 'Account Manager', flex: 1,    minWidth: 150 },
];

// ── Asset data (RESG use-case) ────────────────────────────────────────────────

const assetRows: GridRowsProp = [
  { id: 1, assetName: 'Manhattan Office Tower',  location: 'New York, NY',   lob: 'Commercial Property', program: 'Primary Coverage', status: 'Active',       tiv: 125000000, effectiveDate: '2024-01-01' },
  { id: 2, assetName: 'Boston Medical Center',   location: 'Boston, MA',     lob: 'Healthcare',          program: 'Master Policy',    status: 'Under Review', tiv: 89500000,  effectiveDate: '2024-03-15' },
  { id: 3, assetName: 'Chicago Retail Complex',  location: 'Chicago, IL',    lob: 'Retail Property',     program: 'Umbrella Coverage',status: 'Pending',      tiv: 67200000,  effectiveDate: '2024-02-01' },
  { id: 4, assetName: 'Seattle Tech Campus',     location: 'Seattle, WA',    lob: 'Technology',          program: 'Primary Coverage', status: 'Active',       tiv: 156800000, effectiveDate: '2024-01-15' },
  { id: 5, assetName: 'Miami Warehouse District',location: 'Miami, FL',      lob: 'Industrial',          program: 'Excess Coverage',  status: 'Expired',      tiv: 45300000,  effectiveDate: '2023-12-31' },
  { id: 6, assetName: 'Dallas Energy Hub',       location: 'Dallas, TX',     lob: 'Energy',              program: 'Primary Coverage', status: 'Active',       tiv: 210000000, effectiveDate: '2024-04-01' },
];

const assetColumns: GridColDef[] = [
  { field: 'assetName',     headerName: 'Asset Name',          flex: 1, minWidth: 200 },
  { field: 'location',      headerName: 'Location',            width: 160 },
  { field: 'lob',           headerName: 'Line of Business',    flex: 1, minWidth: 160 },
  { field: 'program',       headerName: 'Program',             width: 160 },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: (params) => statusChipCell(params.value as string),
  },
  {
    field: 'tiv',
    headerName: 'Total Insured Value',
    width: 170,
    type: 'number',
    align: 'right',
    headerAlign: 'right',
    valueFormatter: (value: number) =>
      `$${(value / 1_000_000).toFixed(1)}M`,
  },
  { field: 'effectiveDate', headerName: 'Effective Date', width: 130 },
];

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Active Policies',
  args: {
    rows: policyRows,
    columns: policyColumns,
    autoHeight: true,
    initialState: {
      pagination: { paginationModel: { pageSize: 5 } },
    },
    pageSizeOptions: [5, 10, 25],
  },
};

export const WithCheckboxSelection: Story = {
  args: {
    rows: policyRows,
    columns: policyColumns,
    checkboxSelection: true,
    disableRowSelectionOnClick: false,
    autoHeight: true,
    initialState: {
      pagination: { paginationModel: { pageSize: 5 } },
    },
    pageSizeOptions: [5, 10],
  },
};

export const WithColumnFiltering: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Built-in column filters. Click the column header kebab menu → Filter.',
      },
    },
  },
  args: {
    rows: policyRows,
    columns: policyColumns,
    autoHeight: true,
    initialState: {
      pagination: { paginationModel: { pageSize: 5 } },
    },
    pageSizeOptions: [5, 10],
  },
};

export const LoadingState: Story = {
  args: {
    rows: [],
    columns: policyColumns,
    loading: true,
    autoHeight: true,
  },
};

export const EmptyState: Story = {
  args: {
    rows: [],
    columns: policyColumns,
    autoHeight: true,
  },
};

export const RESGAssetList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real estate asset management table — replicates the RESG Asset List page use case.',
      },
    },
  },
  args: {
    rows: assetRows,
    columns: assetColumns,
    checkboxSelection: true,
    disableRowSelectionOnClick: false,
    autoHeight: true,
    initialState: {
      pagination: { paginationModel: { pageSize: 5 } },
    },
    pageSizeOptions: [5, 10, 25],
  },
};

export const FullFeatures: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All features enabled: sorting, filtering, selection, pagination, column reordering.',
      },
    },
  },
  args: {
    rows: policyRows,
    columns: policyColumns,
    checkboxSelection: true,
    disableRowSelectionOnClick: false,
    autoHeight: true,
    initialState: {
      pagination: { paginationModel: { pageSize: 5 } },
      sorting: { sortModel: [{ field: 'premium', sort: 'desc' }] },
    },
    pageSizeOptions: [5, 10, 25],
  },
};
