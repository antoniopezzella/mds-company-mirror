import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Navigation control for paginated content. Keyboard accessible with configurable page boundaries and jump controls.'
      }
    }
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalItems: 50,
    pageSize: 10,
    currentPage: 1,
    onPageChange: () => {},
  },
};

export const ManyPages: Story = {
  args: {
    totalItems: 200,
    pageSize: 10,
    currentPage: 10,
    onPageChange: () => {},
  },
};

export const LastPage: Story = {
  args: {
    totalItems: 50,
    pageSize: 10,
    currentPage: 5,
    onPageChange: () => {},
  },
};

export const WithPageSize: Story = {
  args: {
    totalItems: 500,
    pageSize: 10,
    currentPage: 1,
    pageSizeOptions: [5, 10, 25, 50],
    onPageChange: () => {},
  },
};

export const Compact: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 3,
    onPageChange: () => {},
  },
};

export const Full: Story = {
  args: {
    totalItems: 500,
    pageSize: 20,
    currentPage: 5,
    pageSizeOptions: [10, 20, 50],
    onPageChange: () => {},
  },
};

export const MiddlePage: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 5,
    onPageChange: () => {},
  },
};

export const SmallDataset: Story = {
  args: {
    totalItems: 30,
    pageSize: 10,
    currentPage: 1,
    onPageChange: () => {},
  },
};

export const LargeDataset: Story = {
  args: {
    totalItems: 2500,
    pageSize: 25,
    currentPage: 50,
    pageSizeOptions: [10, 25, 50, 100],
    onPageChange: () => {},
  },
};

export const InteractivePagination: Story = {
  render: function InteractivePaginationDemo() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);

    const totalItems = 250;
    const totalPages = Math.ceil(totalItems / pageSize);

    const claimsList = Array.from({ length: totalItems }, (_, i) => ({
      id: `CLM-2024-${String(i + 1).padStart(3, '0')}`,
      type: i % 3 === 0 ? 'Property' : i % 3 === 1 ? 'Liability' : 'Workers Comp',
      status: i % 4 === 0 ? 'Approved' : i % 4 === 1 ? 'Pending' : i % 4 === 2 ? 'Under Review' : 'Closed',
      amount: `$${((i + 1) * 1500).toLocaleString()}`,
    }));

    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, totalItems);
    const currentItems = claimsList.slice(startIdx, endIdx);

    return (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Claims List</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
            Showing {startIdx + 1}-{endIdx} of {totalItems} claims
          </p>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Claim ID</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'right', fontWeight: 600 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((claim, idx) => (
              <tr key={claim.id} style={{ borderBottom: idx < currentItems.length - 1 ? '1px solid #ddd' : 'none' }}>
                <td style={{ padding: '12px', color: '#1976d2', fontWeight: 500 }}>{claim.id}</td>
                <td style={{ padding: '12px' }}>{claim.type}</td>
                <td style={{ padding: '12px' }}>{claim.status}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{claim.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            totalItems={totalItems}
            pageSize={pageSize}
            currentPage={currentPage}
            pageSizeOptions={[5, 10, 25, 50]}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
            showItemsRange
            showTotalItems
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '8px', color: '#666', fontSize: '14px' }}>
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  },
};
