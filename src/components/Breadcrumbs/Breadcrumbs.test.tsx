import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Breadcrumbs } from './Breadcrumbs';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Policies', href: '/policies' },
  { label: 'Policy Detail', isCurrentPage: true },
];

describe('Breadcrumbs', () => {
  it('renders all items', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Policies')).toBeInTheDocument();
    expect(screen.getByText('Policy Detail')).toBeInTheDocument();
  });

  it('renders links for non-current items', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Policies').closest('a')).toHaveAttribute('href', '/policies');
  });

  it('renders current page as text (not link)', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Policy Detail').closest('a')).toBeNull();
  });

  it('renders current page as plain text', () => {
    render(<Breadcrumbs items={items} />);
    // Current page renders as Typography (no link), verify it's a <p> or <span> not <a>
    const currentItem = screen.getByText('Policy Detail');
    expect(currentItem).toBeInTheDocument();
    expect(currentItem.tagName).not.toBe('A');
  });

  it('renders custom separator', () => {
    render(<Breadcrumbs items={items} separator=">" />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders with custom aria label', () => {
    render(<Breadcrumbs items={items} ariaLabel="Navigation path" />);
    expect(screen.getByLabelText('Navigation path')).toBeInTheDocument();
  });

  it('fires onClick callback on breadcrumb click', () => {
    const onClick = vi.fn();
    const clickableItems = [
      { label: 'Home', onClick },
      { label: 'Current', isCurrentPage: true },
    ];
    render(<Breadcrumbs items={clickableItems} />);
    fireEvent.click(screen.getByText('Home'));
    expect(onClick).toHaveBeenCalled();
  });
});
