import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Header from './Header';

// Mock the SVG import
vi.mock('../../assets/images/marsh.svg', () => ({ default: 'marsh-logo.svg' }));

describe('Header', () => {
  const onToggleSidebar = vi.fn();

  beforeEach(() => {
    onToggleSidebar.mockClear();
  });

  it('renders the Marsh logo', () => {
    render(<Header sidebarOpen={false} onToggleSidebar={onToggleSidebar} />);
    expect(screen.getByAltText('Marsh Logo')).toBeInTheDocument();
  });

  it('renders user profile name', () => {
    render(<Header sidebarOpen={false} onToggleSidebar={onToggleSidebar} />);
    expect(screen.getByText('Tolu Adesina')).toBeInTheDocument();
  });

  it('renders user role', () => {
    render(<Header sidebarOpen={false} onToggleSidebar={onToggleSidebar} />);
    expect(screen.getByText('Chief Risk Officer')).toBeInTheDocument();
  });

  it('shows expand label when sidebar is closed', () => {
    render(<Header sidebarOpen={false} onToggleSidebar={onToggleSidebar} />);
    expect(screen.getByLabelText('Expand sidebar')).toBeInTheDocument();
  });

  it('shows collapse label when sidebar is open', () => {
    render(<Header sidebarOpen={true} onToggleSidebar={onToggleSidebar} />);
    expect(screen.getByLabelText('Collapse sidebar')).toBeInTheDocument();
  });

  it('calls onToggleSidebar when menu button is clicked', () => {
    render(<Header sidebarOpen={false} onToggleSidebar={onToggleSidebar} />);
    fireEvent.click(screen.getByLabelText('Expand sidebar'));
    expect(onToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it('renders notification badge', () => {
    render(<Header sidebarOpen={false} onToggleSidebar={onToggleSidebar} />);
    // 4 is the real default (DashboardHeader.tsx and every ui/header.stories.tsx
    // story agree) — this test previously expected a stale '8'.
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
