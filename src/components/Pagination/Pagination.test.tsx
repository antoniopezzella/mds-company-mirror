import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalItems: 100,
    pageSize: 10,
    onPageChange: vi.fn(),
  };

  it('renders page buttons', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows items range', () => {
    render(<Pagination {...defaultProps} showItemsRange />);
    expect(screen.getByText(/1\s*–\s*10/)).toBeInTheDocument();
  });

  it('navigates to next page', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    const nextButton = screen.getByLabelText(/next/i);
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const prevButton = screen.getByLabelText(/previous/i);
    expect(prevButton).toBeDisabled();
  });

  it('disables next on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    const nextButton = screen.getByLabelText(/next/i);
    expect(nextButton).toBeDisabled();
  });

  it('supports disabled state', () => {
    const { container } = render(<Pagination {...defaultProps} disabled />);
    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => {
      expect(btn).toBeDisabled();
    });
  });
});
