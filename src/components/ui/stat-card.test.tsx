import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { StatCard } from './stat-card';

describe('StatCard', () => {
  it('renders the label and a string value as-is', () => {
    render(<StatCard label="Active policies" value="1,250" />);
    expect(screen.getByText('Active policies')).toBeInTheDocument();
    expect(screen.getByText('1,250')).toBeInTheDocument();
  });

  it('renders the label as a non-heading by default, so it is safe at any depth', () => {
    // A KPI label is not a section heading — it defaults to <p> deliberately,
    // because a hardcoded <h3> used to break heading order under a page <h1>.
    render(<StatCard label="Open claims" value={42} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByText('Open claims')).toBeInTheDocument();
  });

  it('renders a positive delta with its sign and percent', () => {
    render(<StatCard label="Growth" value={100} delta={12.5} />);
    expect(screen.getByText(/\+?12\.5\s*%/)).toBeInTheDocument();
  });

  it('exposes aria-busy on the card while loading', () => {
    const { container } = render(<StatCard label="Loading" value={0} loading />);
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });

  it('forwards a ref to the card root element', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<StatCard ref={ref} label="X" value={1} />);
    expect(ref.current?.tagName.toLowerCase()).toBe('div');
  });
});
