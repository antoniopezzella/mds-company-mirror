import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Breadcrumbs } from './breadcrumbs';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Claims', href: '/claims' },
  { label: 'POL-2024-006' },
];

describe('Breadcrumbs', () => {
  it('renders a navigation landmark with a default accessible name', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumbs' })).toBeInTheDocument();
  });

  it('accepts a localized aria-label', () => {
    render(<Breadcrumbs items={items} ariaLabel="Fil d'Ariane" />);
    expect(screen.getByRole('navigation', { name: "Fil d'Ariane" })).toBeInTheDocument();
  });

  it('marks the last item as the current page, not a link', () => {
    render(<Breadcrumbs items={items} />);
    const current = screen.getByText('POL-2024-006');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.closest('a')).toBeNull();
  });

  it('renders intermediate items as links carrying their href', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('link', { name: 'Claims' })).toHaveAttribute('href', '/claims');
  });

  it('fires an item onClick and prevents default navigation', () => {
    const onClick = vi.fn();
    render(<Breadcrumbs items={[{ label: 'Home', href: '/', onClick }, { label: 'Here' }]} />);
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('collapses the middle into an ellipsis past maxItems, keeping first and last', () => {
    const many = Array.from({ length: 6 }, (_, i) => ({ label: `L${i}`, href: `/${i}` }));
    render(<Breadcrumbs items={many} maxItems={3} />);
    expect(screen.getByText('…')).toBeInTheDocument();
    expect(screen.getByText('L0')).toBeInTheDocument(); // first kept
    expect(screen.getByText('L5')).toBeInTheDocument(); // last kept
    expect(screen.queryByText('L2')).not.toBeInTheDocument(); // middle collapsed
  });
});
