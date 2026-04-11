import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Table } from './Table';
import type { TableColumn } from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered', 'compact'],
      description: 'Visual style variant of the table',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of table cells and text',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effect on rows',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Keep header visible while scrolling vertically',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes',
    },
    sortable: {
      control: 'boolean',
      description: 'Enable column sorting',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    scrollShadows: {
      control: 'boolean',
      description: 'Show visual shadows when content is scrollable',
      defaultValue: true,
    },
    stickyFirstColumn: {
      control: 'boolean',
      description: 'Keep first column fixed while scrolling horizontally',
    },
    showScrollProgress: {
      control: 'boolean',
      description: 'Show scroll progress indicator at the top',
    },
    scrollToFocus: {
      control: 'boolean',
      description: 'Auto-scroll to bring focused cells into view',
      defaultValue: true,
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

// Sample data types
interface PolicyData {
  policyNumber: string;
  client: string;
  type: string;
  premium: number;
  status: string;
  renewalDate: string;
  broker: string;
}

interface ClaimData {
  claimId: string;
  policyNumber: string;
  claimant: string;
  amount: number;
  status: string;
  dateSubmitted: string;
  assignedTo: string;
}

interface RiskAssessment {
  id: string;
  company: string;
  industry: string;
  riskScore: number;
  category: string;
  lastReview: string;
  reviewer: string;
}

// Helper component for status badges
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'approved':
      case 'paid':
        return 'mds-table-badge--success';
      case 'pending':
      case 'under review':
        return 'mds-table-badge--warning';
      case 'expired':
      case 'rejected':
      case 'cancelled':
        return 'mds-table-badge--danger';
      default:
        return 'mds-table-badge--neutral';
    }
  };

  return <span className={`mds-table-badge ${getStatusClass()}`}>{status}</span>;
};

// Sample data
const policyData: PolicyData[] = [
  {
    policyNumber: 'POL-2024-001',
    client: 'Acme Corporation',
    type: 'Commercial Property',
    premium: 125000,
    status: 'Active',
    renewalDate: '2025-06-15',
    broker: 'John Smith',
  },
  {
    policyNumber: 'POL-2024-002',
    client: 'Global Tech Industries',
    type: 'Cyber Liability',
    premium: 85000,
    status: 'Active',
    renewalDate: '2025-03-22',
    broker: 'Sarah Johnson',
  },
  {
    policyNumber: 'POL-2024-003',
    client: 'Midwest Manufacturing',
    type: 'Workers Compensation',
    premium: 210000,
    status: 'Pending',
    renewalDate: '2025-08-10',
    broker: 'Michael Chen',
  },
  {
    policyNumber: 'POL-2024-004',
    client: 'Coastal Shipping Co',
    type: 'Marine Insurance',
    premium: 340000,
    status: 'Active',
    renewalDate: '2025-12-01',
    broker: 'Emily Rodriguez',
  },
  {
    policyNumber: 'POL-2023-089',
    client: 'Heritage Builders',
    type: 'General Liability',
    premium: 67500,
    status: 'Expired',
    renewalDate: '2024-11-30',
    broker: 'David Park',
  },
];

const claimData: ClaimData[] = [
  {
    claimId: 'CLM-2024-1234',
    policyNumber: 'POL-2024-001',
    claimant: 'Acme Corporation',
    amount: 45000,
    status: 'Under Review',
    dateSubmitted: '2024-12-01',
    assignedTo: 'Claims Team A',
  },
  {
    claimId: 'CLM-2024-1235',
    policyNumber: 'POL-2024-002',
    claimant: 'Global Tech Industries',
    amount: 12500,
    status: 'Approved',
    dateSubmitted: '2024-11-28',
    assignedTo: 'Claims Team B',
  },
  {
    claimId: 'CLM-2024-1236',
    policyNumber: 'POL-2023-089',
    claimant: 'Heritage Builders',
    amount: 89000,
    status: 'Paid',
    dateSubmitted: '2024-11-15',
    assignedTo: 'Claims Team A',
  },
];

const riskData: RiskAssessment[] = [
  {
    id: 'RISK-001',
    company: 'Acme Corporation',
    industry: 'Manufacturing',
    riskScore: 72,
    category: 'Medium',
    lastReview: '2024-11-15',
    reviewer: 'Alice Thompson',
  },
  {
    id: 'RISK-002',
    company: 'Global Tech Industries',
    industry: 'Technology',
    riskScore: 45,
    category: 'Low',
    lastReview: '2024-12-01',
    reviewer: 'Bob Williams',
  },
  {
    id: 'RISK-003',
    company: 'Coastal Shipping Co',
    industry: 'Maritime',
    riskScore: 88,
    category: 'High',
    lastReview: '2024-10-20',
    reviewer: 'Alice Thompson',
  },
];

// Policy Table Columns
const policyColumns: TableColumn<PolicyData>[] = [
  {
    key: 'policyNumber',
    header: 'Policy Number',
    sortable: true,
    width: '140px',
  },
  {
    key: 'client',
    header: 'Client',
    sortable: true,
  },
  {
    key: 'type',
    header: 'Policy Type',
    sortable: true,
  },
  {
    key: 'premium',
    header: 'Premium',
    sortable: true,
    align: 'right',
    render: (value) => `$${(value as number).toLocaleString()}`,
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (value) => <StatusBadge status={value as string} />,
  },
  {
    key: 'renewalDate',
    header: 'Renewal Date',
    sortable: true,
  },
  {
    key: 'broker',
    header: 'Broker',
    sortable: true,
  },
];

// ---------- Shared story helpers ----------

const FeatureHeader = ({
  label,
  code,
  desc,
}: {
  label: string;
  code: string;
  desc: string;
}) => (
  <div style={{ marginBottom: 12 }}>
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: '#6b7280',
      }}
    >
      {label}
    </span>
    <p style={{ margin: '3px 0 5px', fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
      {desc}
    </p>
    <code
      style={{
        display: 'inline-block',
        marginBottom: 10,
        fontSize: 11,
        fontFamily: 'monospace',
        color: '#374151',
        background: '#f3f4f6',
        border: '1px solid #e5e7eb',
        borderRadius: 4,
        padding: '2px 8px',
      }}
    >
      {code}
    </code>
  </div>
);

type ShowcaseTab = 'variants' | 'sizes' | 'features' | 'states' | 'scroll';

const SHOWCASE_TABS: { id: ShowcaseTab; label: string }[] = [
  { id: 'variants', label: 'Visual Variants' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'features', label: 'Features' },
  { id: 'states', label: 'States' },
  { id: 'scroll', label: 'Scroll & Pagination' },
];

// ============= ALL VARIANTS SHOWCASE =============
export const Showcase: Story = {
  name: '◈ All Variants',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interactive gallery of all Table variants, sizes, and features — use the tabs to explore each category.',
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tab, setTab] = useState<ShowcaseTab>('variants');

    const colsShort = policyColumns.slice(0, 4) as unknown as TableColumn<Record<string, unknown>>[];
    const dataShort = policyData.slice(0, 3) as unknown as Record<string, unknown>[];
    const dataFull  = policyData as unknown as Record<string, unknown>[];
    const colsFull  = policyColumns as unknown as TableColumn<Record<string, unknown>>[];

    return (
      <div style={{ fontFamily: 'inherit' }}>

        {/* ---- Tab Bar ---- */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            padding: 4,
            background: '#f3f4f6',
            borderRadius: 10,
            marginBottom: 32,
            flexWrap: 'wrap',
          }}
        >
          {SHOWCASE_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                padding: '7px 18px',
                border: 'none',
                borderRadius: 7,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: tab === id ? 600 : 400,
                background: tab === id ? '#ffffff' : 'transparent',
                color: tab === id ? '#111827' : '#6b7280',
                boxShadow: tab === id ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ---- Visual Variants ---- */}
        {tab === 'variants' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
            {(['default', 'striped', 'bordered', 'compact'] as const).map((variant) => (
              <div key={variant}>
                <FeatureHeader
                  label={variant}
                  code={`variant="${variant}"`}
                  desc={
                    variant === 'default'
                      ? 'Clean rows with a subtle bottom border — the baseline style for most tables.'
                      : variant === 'striped'
                      ? 'Alternating row backgrounds improve readability in dense, data-heavy views.'
                      : variant === 'bordered'
                      ? 'Full cell borders create a structured, spreadsheet-like layout.'
                      : 'Reduced row padding maximises data density on smaller viewports.'
                  }
                />
                <Table
                  columns={colsShort}
                  data={dataShort}
                  variant={variant}
                  size={variant === 'compact' ? 'sm' : 'md'}
                  hoverable
                />
              </div>
            ))}
          </div>
        )}

        {/* ---- Sizes ---- */}
        {tab === 'sizes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {(
              [
                { size: 'sm' as const, label: 'Small',           desc: 'Compact rows — ideal for dense data dashboards and secondary tables.' },
                { size: 'md' as const, label: 'Medium (default)', desc: 'Balanced density — recommended for the majority of use cases.' },
                { size: 'lg' as const, label: 'Large',           desc: 'Spacious rows for touch-friendly or accessibility-focused layouts.' },
              ]
            ).map(({ size, label, desc }) => (
              <div key={size}>
                <FeatureHeader label={label} code={`size="${size}"`} desc={desc} />
                <Table
                  columns={colsShort}
                  data={dataShort}
                  variant="default"
                  size={size}
                  hoverable
                />
              </div>
            ))}
          </div>
        )}

        {/* ---- Features ---- */}
        {tab === 'features' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <div>
              <FeatureHeader
                label="Hoverable"
                code="hoverable"
                desc="Rows highlight on mouse hover — improves scannability across wide tables."
              />
              <Table columns={colsFull} data={dataFull} variant="default" size="md" hoverable />
            </div>

            <div>
              <FeatureHeader
                label="Sortable"
                code="sortable  defaultSortColumn  defaultSortDirection"
                desc="Click any column header to toggle ascending ↑ / descending ↓. An arrow indicator marks the active column."
              />
              <Table
                columns={colsFull}
                data={dataFull}
                variant="default"
                size="md"
                sortable
                hoverable
                defaultSortColumn="premium"
                defaultSortDirection="desc"
              />
            </div>

            <div>
              <FeatureHeader
                label="Selectable"
                code="selectable  onRowSelect"
                desc="Checkbox column enables row selection. The header checkbox selects or deselects all rows on the current page."
              />
              <Table
                columns={colsFull}
                data={dataFull}
                variant="striped"
                size="md"
                selectable
                hoverable
                onRowSelect={(rows) => console.info('Selected:', rows.length, 'rows')}
              />
            </div>
          </div>
        )}

        {/* ---- States ---- */}
        {tab === 'states' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <div>
              <FeatureHeader
                label="Loading State"
                code="loading"
                desc="Skeleton rows replace data during async fetch — prevents layout shift and communicates progress."
              />
              <Table columns={colsShort} data={[]} variant="default" size="md" loading />
            </div>

            <div>
              <FeatureHeader
                label="Empty State"
                code='emptyMessage="..."'
                desc="Shown when the dataset is empty. Provide a message that guides users toward their next action."
              />
              <Table
                columns={colsShort}
                data={[]}
                variant="default"
                size="md"
                emptyMessage="No policies found. Adjust your filters or create a new policy."
              />
            </div>

            <div>
              <FeatureHeader
                label="With Actions Column"
                code="column.render: (_v, row) => <ActionButtons />"
                desc="Use the column render prop to inject per-row controls — view, edit, delete, or any custom action."
              />
              <Table
                columns={([
                  ...policyColumns.slice(0, 4),
                  {
                    key: 'actions',
                    header: 'Actions',
                    align: 'center' as const,
                    render: (_v: unknown, row: unknown) => (
                      <div className="mds-table-actions">
                        <button
                          className="mds-table-action-btn"
                          onClick={() => console.info('View', row)}
                        >
                          View
                        </button>
                        <button
                          className="mds-table-action-btn"
                          onClick={() => console.info('Edit', row)}
                        >
                          Edit
                        </button>
                      </div>
                    ),
                  },
                ] as unknown as TableColumn<Record<string, unknown>>[])}
                data={dataFull}
                variant="striped"
                size="md"
                hoverable
              />
            </div>
          </div>
        )}

        {/* ---- Scroll & Pagination ---- */}
        {tab === 'scroll' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <div>
              <FeatureHeader
                label="Sticky Header"
                code='stickyHeader  maxHeight="300px"  scrollShadows'
                desc="Header row stays fixed at the top while scrolling. Shadow indicators appear when content overflows the container."
              />
              <Table
                columns={colsFull}
                data={[...policyData, ...policyData, ...policyData] as unknown as Record<string, unknown>[]}
                variant="striped"
                size="md"
                stickyHeader
                maxHeight="300px"
                hoverable
                scrollShadows
              />
            </div>

            <div>
              <FeatureHeader
                label="Pagination — Simple"
                code='pagination={{ enabled: true, variant: "simple", pageSize: 10 }}'
                desc="Prev/next navigation for datasets that don't need fine-grained page control."
              />
              <Table
                columns={colsFull}
                data={largePolicyData as unknown as Record<string, unknown>[]}
                variant="striped"
                size="md"
                hoverable
                sortable
                pagination={{ enabled: true, pageSize: 10, variant: 'simple' }}
              />
            </div>

            <div>
              <FeatureHeader
                label="Pagination — Advanced"
                code='pagination={{ variant: "advanced", showItemsRange: true, showTotalItems: true }}'
                desc="Full control: page-size selector, item range, total count, and keyboard-accessible navigation."
              />
              <Table
                columns={colsFull}
                data={largePolicyData as unknown as Record<string, unknown>[]}
                variant="striped"
                size="md"
                hoverable
                sortable
                selectable
                pagination={{
                  enabled: true,
                  pageSize: 10,
                  pageSizeOptions: [5, 10, 25, 50],
                  variant: 'advanced',
                  showItemsRange: true,
                  showTotalItems: true,
                }}
              />
            </div>
          </div>
        )}

      </div>
    );
  },
};

// Basic Table
export const Default: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: policyData as unknown as Record<string, unknown>[],
    variant: 'default',
    size: 'md',
  },
};

// Striped Table
export const Striped: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: policyData as unknown as Record<string, unknown>[],
    variant: 'striped',
    size: 'md',
  },
};

// Bordered Table
export const Bordered: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: policyData as unknown as Record<string, unknown>[],
    variant: 'bordered',
    size: 'md',
  },
};

// Hoverable Table
export const Hoverable: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: policyData as unknown as Record<string, unknown>[],
    variant: 'default',
    size: 'md',
    hoverable: true,
  },
};

// Compact Table
export const Compact: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: policyData as unknown as Record<string, unknown>[],
    variant: 'compact',
    size: 'sm',
  },
};

// Sortable Table
export const Sortable: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: policyData as unknown as Record<string, unknown>[],
    variant: 'default',
    size: 'md',
    sortable: true,
    defaultSortColumn: 'premium',
    defaultSortDirection: 'desc',
  },
};

// Selectable Table
export const Selectable: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: policyData as unknown as Record<string, unknown>[],
    variant: 'striped',
    size: 'md',
    selectable: true,
    onRowSelect: (selectedRows) => {
      console.info('Selected rows:', selectedRows);
    },
  },
};

// With Sticky Header
export const StickyHeader: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: [...policyData, ...policyData, ...policyData] as unknown as Record<string, unknown>[],  // Triple the data
    variant: 'striped',
    size: 'md',
    stickyHeader: true,
    maxHeight: '400px',
  },
};

// Claims Management Table
export const ClaimsManagement: Story = {
  args: {
    columns: ([
      {
        key: 'claimId',
        header: 'Claim ID',
        sortable: true,
        width: '140px',
      },
      {
        key: 'policyNumber',
        header: 'Policy',
        sortable: true,
      },
      {
        key: 'claimant',
        header: 'Claimant',
        sortable: true,
      },
      {
        key: 'amount',
        header: 'Amount',
        sortable: true,
        align: 'right',
        render: (value: unknown) => `$${(value as number).toLocaleString()}`,
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (value: unknown) => <StatusBadge status={value as string} />,
      },
      {
        key: 'dateSubmitted',
        header: 'Submitted',
        sortable: true,
      },
      {
        key: 'assignedTo',
        header: 'Assigned To',
      },
    ] as unknown as TableColumn<Record<string, unknown>>[]),
    data: claimData as unknown as Record<string, unknown>[],
    variant: 'striped',
    size: 'md',
    sortable: true,
    hoverable: true,
    caption: 'Claims Management Dashboard',
  },
};

// Risk Assessment Table
export const RiskAssessment: Story = {
  args: {
    columns: ([
      {
        key: 'id',
        header: 'Risk ID',
        sortable: true,
        width: '120px',
      },
      {
        key: 'company',
        header: 'Company',
        sortable: true,
      },
      {
        key: 'industry',
        header: 'Industry',
        sortable: true,
      },
      {
        key: 'riskScore',
        header: 'Risk Score',
        sortable: true,
        align: 'center',
        render: (value: unknown) => {
          const numValue = value as number;
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '100px',
                  height: '8px',
                  backgroundColor: '#E9ECEF',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${numValue}%`,
                    height: '100%',
                    backgroundColor: numValue >= 70 ? '#dc3545' : numValue >= 50 ? '#ffc107' : '#28a745',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <span style={{ fontWeight: 600, minWidth: '30px' }}>{numValue}</span>
            </div>
          );
        },
      },
      {
        key: 'category',
        header: 'Category',
        sortable: true,
        render: (value: unknown) => {
          const cat = value as string;
          const getCategoryBadge = (category: string) => {
            switch (category) {
              case 'High':
                return <span className="mds-table-badge mds-table-badge--danger">{category}</span>;
              case 'Medium':
                return <span className="mds-table-badge mds-table-badge--warning">{category}</span>;
              case 'Low':
                return <span className="mds-table-badge mds-table-badge--success">{category}</span>;
              default:
                return <span className="mds-table-badge mds-table-badge--neutral">{category}</span>;
            }
          };
          return getCategoryBadge(cat);
        },
      },
      {
        key: 'lastReview',
        header: 'Last Review',
        sortable: true,
      },
      {
        key: 'reviewer',
        header: 'Reviewer',
        sortable: true,
      },
    ] as unknown as TableColumn<Record<string, unknown>>[]),
    data: riskData as unknown as Record<string, unknown>[],
    variant: 'bordered',
    size: 'md',
    sortable: true,
    hoverable: true,
    caption: 'Risk Assessment Overview',
  },
};

// With Actions Column
export const WithActions: Story = {
  args: {
    columns: ([
      ...policyColumns,
      {
        key: 'actions',
        header: 'Actions',
        align: 'center',
        render: (_value: unknown, row: unknown) => (
          <div className="mds-table-actions">
            <button
              className="mds-table-action-btn"
              onClick={() => console.info('View', row)}
            >
              View
            </button>
            <button
              className="mds-table-action-btn"
              onClick={() => console.info('Edit', row)}
            >
              Edit
            </button>
            <button
              className="mds-table-action-btn"
              onClick={() => console.info('Delete', row)}
              style={{ color: '#dc3545' }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ] as unknown as TableColumn<Record<string, unknown>>[]),
    data: policyData as unknown as Record<string, unknown>[],
    variant: 'striped',
    size: 'md',
    hoverable: true,
  },
};

// Loading State
export const Loading: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: [],
    loading: true,
    variant: 'default',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'The loading state uses **Skeleton Rows** that match the column structure, preventing layout shifts and improving perceived performance in enterprise dashboards.',
      },
    },
  },
};

// Empty State
export const Empty: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: [],
    emptyMessage: 'No policies found. Create your first policy to get started.',
    variant: 'default',
    size: 'md',
  },
};

// Full Featured Table
export const FullFeatured: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: policyData as unknown as Record<string, unknown>[],
    variant: 'striped',
    size: 'md',
    hoverable: true,
    sortable: true,
    selectable: true,
    caption: 'Active Insurance Policies',
    defaultSortColumn: 'premium',
    defaultSortDirection: 'desc',
  },
};

// Generate large dataset for pagination testing
const generateLargeDataset = (count: number): PolicyData[] => {
  const types = ['Property', 'Casualty', 'Liability', 'Auto', 'Workers Comp'];
  const statuses = ['Active', 'Pending', 'Expired'];
  const brokers = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'Robert Wilson'];

  return Array.from({ length: count }, (_, i) => ({
    policyNumber: `POL-2024-${String(i + 1).padStart(4, '0')}`,
    client: `Client ${i + 1}`,
    type: types[i % types.length],
    premium: Math.floor(Math.random() * 90000) + 10000,
    status: statuses[i % statuses.length],
    renewalDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      .toISOString()
      .split('T')[0],
    broker: brokers[i % brokers.length],
  }));
};

const largePolicyData = generateLargeDataset(103);

// With Simple Pagination
export const WithSimplePagination: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: largePolicyData as unknown as Record<string, unknown>[],
    variant: 'striped',
    size: 'md',
    hoverable: true,
    sortable: true,
    pagination: {
      enabled: true,
      pageSize: 25,
      variant: 'simple',
    },
  },
};

// With Advanced Pagination
export const WithAdvancedPagination: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: largePolicyData as unknown as Record<string, unknown>[],
    variant: 'striped',
    size: 'md',
    hoverable: true,
    sortable: true,
    selectable: true,
    pagination: {
      enabled: true,
      pageSize: 25,
      pageSizeOptions: [10, 25, 50, 100],
      variant: 'advanced',
      showItemsRange: true,
      showTotalItems: true,
    },
  },
};

// Small Page Size
export const SmallPageSize: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: largePolicyData as unknown as Record<string, unknown>[],
    variant: 'striped',
    size: 'md',
    hoverable: true,
    sortable: true,
    pagination: {
      enabled: true,
      pageSize: 10,
      pageSizeOptions: [5, 10, 20],
      variant: 'advanced',
      showItemsRange: true,
    },
  },
};

// Large Dataset (500+ items)
export const LargeDataset: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: generateLargeDataset(537) as unknown as Record<string, unknown>[],
    variant: 'default',
    size: 'md',
    hoverable: true,
    sortable: true,
    pagination: {
      enabled: true,
      pageSize: 50,
      pageSizeOptions: [25, 50, 100, 200],
      variant: 'advanced',
      showItemsRange: true,
      showTotalItems: true,
    },
  },
};

// Pagination with Selection
export const PaginationWithSelection: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: largePolicyData as unknown as Record<string, unknown>[],
    variant: 'striped',
    size: 'md',
    hoverable: true,
    sortable: true,
    selectable: true,
    pagination: {
      enabled: true,
      pageSize: 15,
      pageSizeOptions: [10, 15, 25, 50],
      variant: 'advanced',
      showItemsRange: true,
      showTotalItems: true,
    },
  },
};

// ============= NEW: SCROLL UX ENHANCEMENTS =============

// Scroll Shadows Demo - Wide Table
export const ScrollShadows: Story = {
  args: {
    columns: ([
      ...policyColumns,
      { key: 'underwriter', header: 'Underwriter', sortable: true },
      { key: 'region', header: 'Region', sortable: true },
      { key: 'revenue', header: 'Annual Revenue', sortable: true, align: 'right', render: (value: unknown) => `$${(value as number).toLocaleString()}` },
      { key: 'employees', header: 'Employees', sortable: true, align: 'right' },
      { key: 'industry', header: 'Industry', sortable: true },
      { key: 'notes', header: 'Notes', width: '200px' },
    ] as unknown as TableColumn<Record<string, unknown>>[]),
    data: policyData.map((policy, i) => ({
      ...policy,
      underwriter: ['John Smith', 'Jane Doe', 'Bob Wilson'][i % 3],
      region: ['North America', 'Europe', 'Asia Pacific'][i % 3],
      revenue: [500000, 1200000, 850000, 2100000][i % 4],
      employees: [50, 150, 300, 1200][i % 4],
      industry: ['Technology', 'Healthcare', 'Manufacturing', 'Finance'][i % 4],
      notes: 'Additional policy information and details',
    })) as unknown as Record<string, unknown>[],
    variant: 'default',
    size: 'md',
    hoverable: true,
    sortable: true,
    scrollShadows: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Scroll Shadows** - Visual indicators appear when content is scrollable horizontally or vertically. Scroll left/right to see shadow effects.',
      },
    },
  },
};

// Sticky First Column Demo
export const StickyFirstColumn: Story = {
  args: {
    columns: ([
      { key: 'policyNumber', header: 'Policy #', sortable: true, width: '140px' },
      { key: 'client', header: 'Client Name', sortable: true, width: '180px' },
      { key: 'type', header: 'Type', sortable: true, width: '150px' },
      { key: 'premium', header: 'Premium', sortable: true, align: 'right', width: '120px', render: (value: unknown) => `$${(value as number).toLocaleString()}` },
      { key: 'status', header: 'Status', sortable: true, width: '120px', render: (value: unknown) => <StatusBadge status={value as string} /> },
      { key: 'renewalDate', header: 'Renewal', sortable: true, width: '120px' },
      { key: 'broker', header: 'Broker', sortable: true, width: '150px' },
      { key: 'underwriter', header: 'Underwriter', sortable: true, width: '150px' },
      { key: 'region', header: 'Region', sortable: true, width: '130px' },
      { key: 'industry', header: 'Industry', sortable: true, width: '130px' },
    ] as unknown as TableColumn<Record<string, unknown>>[]),
    data: policyData.map((policy, i) => ({
      ...policy,
      underwriter: ['John Smith', 'Jane Doe', 'Bob Wilson'][i % 3],
      region: ['North America', 'Europe', 'Asia Pacific'][i % 3],
      industry: ['Technology', 'Healthcare', 'Manufacturing'][i % 3],
    })) as unknown as Record<string, unknown>[],
    variant: 'striped',
    size: 'md',
    hoverable: true,
    sortable: true,
    stickyFirstColumn: true,
    scrollShadows: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Sticky First Column** - The first column stays fixed while scrolling horizontally, keeping the identifier visible. Try scrolling right to see the policy number column remain in place.',
      },
    },
  },
};

// Scroll Progress Indicator Demo
export const ScrollProgressIndicator: Story = {
  args: {
    columns: policyColumns as unknown as TableColumn<Record<string, unknown>>[],
    data: largePolicyData as unknown as Record<string, unknown>[],
    variant: 'default',
    size: 'md',
    hoverable: true,
    sortable: true,
    maxHeight: '400px',
    showScrollProgress: true,
    scrollShadows: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Scroll Progress Indicator** - A colored bar at the top shows how far you\'ve scrolled through the table. Scroll down to see the progress bar grow.',
      },
    },
  },
};

// Scroll to Focus (Keyboard Navigation) Demo
export const KeyboardNavigation: Story = {
  args: {
    columns: ([
      ...policyColumns,
      { key: 'underwriter', header: 'Underwriter', sortable: true },
      { key: 'region', header: 'Region', sortable: true },
    ] as unknown as TableColumn<Record<string, unknown>>[]),
    data: policyData.map((policy, i) => ({
      ...policy,
      underwriter: ['John Smith', 'Jane Doe', 'Bob Wilson'][i % 3],
      region: ['North America', 'Europe', 'Asia Pacific'][i % 3],
    })) as unknown as Record<string, unknown>[],
    variant: 'bordered',
    size: 'md',
    hoverable: true,
    sortable: true,
    maxHeight: '300px',
    scrollShadows: true,
    scrollToFocus: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Keyboard Navigation & Scroll to Focus** - Use Tab key to navigate through cells. The table automatically scrolls to keep focused cells visible. Try tabbing through the table to see auto-scrolling in action.',
      },
    },
  },
};

// Complete Scroll Experience - All Features Combined
export const CompleteScrollExperience: Story = {
  args: {
    columns: ([
      { key: 'policyNumber', header: 'Policy #', sortable: true, width: '140px' },
      { key: 'client', header: 'Client Name', sortable: true, width: '200px' },
      { key: 'type', header: 'Type', sortable: true, width: '160px' },
      { key: 'premium', header: 'Premium', sortable: true, align: 'right', width: '130px', render: (value: unknown) => `$${(value as number).toLocaleString()}` },
      { key: 'status', header: 'Status', sortable: true, width: '130px', render: (value: unknown) => <StatusBadge status={value as string} /> },
      { key: 'renewalDate', header: 'Renewal', sortable: true, width: '130px' },
      { key: 'broker', header: 'Broker', sortable: true, width: '160px' },
      { key: 'underwriter', header: 'Underwriter', sortable: true, width: '160px' },
      { key: 'region', header: 'Region', sortable: true, width: '150px' },
      { key: 'industry', header: 'Industry', sortable: true, width: '150px' },
    ] as unknown as TableColumn<Record<string, unknown>>[]),
    data: largePolicyData.map((policy, i) => ({
      ...policy,
      underwriter: ['John Smith', 'Jane Doe', 'Bob Wilson', 'Alice Chen'][i % 4],
      region: ['North America', 'Europe', 'Asia Pacific', 'Latin America'][i % 4],
      industry: ['Technology', 'Healthcare', 'Manufacturing', 'Finance'][i % 4],
    })) as unknown as Record<string, unknown>[],
    variant: 'striped',
    size: 'md',
    hoverable: true,
    sortable: true,
    stickyHeader: true,
    stickyFirstColumn: true,
    maxHeight: '500px',
    scrollShadows: true,
    showScrollProgress: true,
    scrollToFocus: true,
    pagination: {
      enabled: true,
      pageSize: 20,
      pageSizeOptions: [10, 20, 50],
      variant: 'advanced',
      showItemsRange: true,
      showTotalItems: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '**Complete Scroll Experience** - All scroll enhancements enabled: sticky header & first column, scroll shadows, progress indicator, scroll-to-focus, and pagination. This is the recommended setup for large, wide tables.',
      },
    },
  },
};

