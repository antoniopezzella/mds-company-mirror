import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table } from './Table';
import type { TableColumn } from './Table';

interface TestRow {
  id: number;
  name: string;
  status: string;
  amount: number;
}

const columns: TableColumn<TestRow>[] = [
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status' },
  { key: 'amount', header: 'Amount', align: 'right' },
];

const data: TestRow[] = [
  { id: 1, name: 'Policy A', status: 'Active', amount: 1000 },
  { id: 2, name: 'Policy B', status: 'Expired', amount: 2500 },
  { id: 3, name: 'Policy C', status: 'Active', amount: 750 },
];

describe('Table', () => {
  it('renders column headers', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Policy A')).toBeInTheDocument();
    expect(screen.getByText('Policy B')).toBeInTheDocument();
    expect(screen.getByText('Policy C')).toBeInTheDocument();
  });

  it('renders empty message when data is empty', () => {
    render(<Table columns={columns} data={[]} emptyMessage="No policies found" />);
    expect(screen.getByText('No policies found')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    const { container } = render(<Table columns={columns} data={[]} loading />);
    // Skeleton elements should be present
    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);
  });

  it('renders caption for accessibility', () => {
    render(<Table columns={columns} data={data} caption="Insurance policies" />);
    expect(screen.getByText('Insurance policies')).toBeInTheDocument();
  });

  it('supports sortable columns', () => {
    const sortableColumns: TableColumn<TestRow>[] = [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'status', header: 'Status' },
    ];
    const onSort = vi.fn();
    render(<Table columns={sortableColumns} data={data} sortable onSort={onSort} />);
    fireEvent.click(screen.getByText('Name'));
    expect(onSort).toHaveBeenCalledWith('name', expect.any(String));
  });

  it('renders striped variant', () => {
    const { container } = render(<Table columns={columns} data={data} variant="striped" />);
    expect(container.querySelector('.mds-table--striped')).toBeInTheDocument();
  });

  it('renders compact variant', () => {
    const { container } = render(<Table columns={columns} data={data} variant="compact" />);
    expect(container.querySelector('.mds-table--compact')).toBeInTheDocument();
  });
});
