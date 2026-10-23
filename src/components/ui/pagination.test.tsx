import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Pagination } from './pagination';

describe('Pagination', () => {
  it('renders the total item count, pluralized', () => {
    render(<Pagination currentPage={1} totalItems={50} pageSize={10} onPageChange={() => {}} />);
    expect(screen.getByText(/of 50 items/)).toBeInTheDocument();
  });

  it('uses the singular item label when there is exactly one item', () => {
    render(<Pagination currentPage={1} totalItems={1} pageSize={10} onPageChange={() => {}} />);
    expect(screen.getByText(/of 1 item$/)).toBeInTheDocument();
  });

  it('disables the Previous button on the first page', () => {
    render(<Pagination currentPage={1} totalItems={50} pageSize={10} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  });

  it('calls onPageChange with the next page when Next is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} totalItems={50} pageSize={10} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('renders numbered page buttons in the advanced variant and navigates on click', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalItems={50} pageSize={10} variant="advanced" onPageChange={onPageChange} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Page 3' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('marks the current page with aria-current', () => {
    render(
      <Pagination currentPage={2} totalItems={50} pageSize={10} variant="advanced" onPageChange={() => {}} />
    );
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
  });

  it('shows a textual page position in the compact variant with no numbered buttons', () => {
    render(
      <Pagination currentPage={2} totalItems={50} pageSize={10} variant="compact" onPageChange={() => {}} />
    );
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Page 2' })).not.toBeInTheDocument();
  });

  it('omits First and Last buttons in the simple variant', () => {
    render(<Pagination currentPage={1} totalItems={50} pageSize={10} variant="simple" onPageChange={() => {}} />);
    expect(screen.queryByRole('button', { name: 'First page' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Last page' })).not.toBeInTheDocument();
  });
});
