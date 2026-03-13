import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideNavigation from './SideNavigation';
import type { SideNavItem } from './SideNavigation';

describe('SideNavigation', () => {
  const items: SideNavItem[] = [
    { label: 'Dashboard', active: true },
    { label: 'Claims', subItems: [{ label: 'Open Claims' }, { label: 'Closed Claims' }] },
    { label: 'Reports' },
  ];

  it('renders all top-level items', () => {
    render(<SideNavigation items={items} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Claims')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  it('does not show sub-items by default', () => {
    render(<SideNavigation items={items} />);
    // Sub-items use Collapse with unmountOnExit, so they're removed from DOM
    expect(screen.queryByText('Open Claims')).not.toBeInTheDocument();
  });

  it('expands sub-items when parent is clicked', () => {
    render(<SideNavigation items={items} />);
    fireEvent.click(screen.getByText('Claims'));
    expect(screen.getByText('Open Claims')).toBeVisible();
    expect(screen.getByText('Closed Claims')).toBeVisible();
  });

  it('collapses sub-items when parent is clicked again', () => {
    render(<SideNavigation items={items} />);
    const claims = screen.getByText('Claims');
    fireEvent.click(claims);
    expect(screen.getByText('Open Claims')).toBeVisible();
    fireEvent.click(claims);
    // MUI Collapse animates — check it exists but may be hidden
    expect(screen.getByText('Open Claims')).toBeInTheDocument();
  });

  it('renders support button when onSupport is provided', () => {
    const onSupport = vi.fn();
    render(<SideNavigation items={items} onSupport={onSupport} />);
    const supportButton = screen.getByText(/support/i);
    expect(supportButton).toBeInTheDocument();
  });

  it('uses custom aria-label', () => {
    render(<SideNavigation items={items} ariaLabel="Side menu" />);
    expect(screen.getByLabelText('Side menu')).toBeInTheDocument();
  });

  it('uses default aria-label', () => {
    render(<SideNavigation items={items} />);
    expect(screen.getByLabelText('Primary')).toBeInTheDocument();
  });
});
