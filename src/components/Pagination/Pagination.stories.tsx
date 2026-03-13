import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';
import { Box } from '@mui/material';

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

// Basic pagination
export const Default: Story = {
  args: {
    totalPages: 5,
    currentPage: 1,
  },
};

// With many pages
export const ManyPages: Story = {
  args: {
    totalPages: 20,
    currentPage: 10,
  },
};

// Last page
export const LastPage: Story = {
  args: {
    totalPages: 5,
    currentPage: 5,
  },
};

// With page size options
export const WithPageSize: Story = {
  args: {
    totalPages: 50,
    currentPage: 1,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
  },
};

// Compact version
export const Compact: Story = {
  args: {
    totalPages: 10,
    currentPage: 3,
    showFirstLast: false,
  },
};

// Show all details
export const Full: Story = {
  args: {
    totalPages: 25,
    currentPage: 5,
    pageSize: 20,
    pageSizeOptions: [10, 20, 50],
    showFirstLast: true,
  },
};

// Active in middle pages
export const MiddlePage: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
  },
};

// Small dataset
export const SmallDataset: Story = {
  args: {
    totalPages: 3,
    currentPage: 1,
  },
};

// Large dataset
export const LargeDataset: Story = {
  args: {
    totalPages: 100,
    currentPage: 50,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    showFirstLast: true,
  },
};

// Interactive story - users can navigate pages
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

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageSizeChange = (newSize: number) => {
      setPageSize(newSize);
      setCurrentPage(1);
    };

    return (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Claims List</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
            Showing {startIdx + 1}-{endIdx} of {totalItems} claims
          </p>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ marginRight: '12px', fontSize: '14px' }}>
              Items per page:
            </label>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
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
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500,
                    backgroundColor: claim.status === 'Approved' ? '#e8f5e9' : 
                                     claim.status === 'Closed' ? '#f5f5f5' :
                                     claim.status === 'Pending' ? '#fff3e0' : '#e3f2fd',
                    color: claim.status === 'Approved' ? '#2e7d32' :
                           claim.status === 'Closed' ? '#666' :
                           claim.status === 'Pending' ? '#f57f17' : '#1565c0',
                  }}>
                    {claim.status}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{claim.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1,
              backgroundColor: 'white',
              fontWeight: 500,
            }}
          >
            «
          </button>

          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1,
              backgroundColor: 'white',
              fontWeight: 500,
            }}
          >
            ‹
          </button>

          <div style={{ display: 'flex', gap: '4px' }}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: currentPage === pageNum ? 'none' : '1px solid #ddd',
                    backgroundColor: currentPage === pageNum ? '#1976d2' : 'white',
                    color: currentPage === pageNum ? 'white' : '#333',
                    cursor: 'pointer',
                    fontWeight: currentPage === pageNum ? 600 : 400,
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1,
              backgroundColor: 'white',
              fontWeight: 500,
            }}
          >
            ›
          </button>

          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1,
              backgroundColor: 'white',
              fontWeight: 500,
            }}
          >
            »
          </button>

          <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666' }}>
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>
    );
  },
};
