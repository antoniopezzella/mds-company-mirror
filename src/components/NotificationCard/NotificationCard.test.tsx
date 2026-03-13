import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationCard from './NotificationCard';

describe('NotificationCard', () => {
  it('renders with default props', () => {
    render(<NotificationCard title="Hurricane Milton" message="10 insured locations affected" />);
    expect(screen.getByText('Hurricane Milton')).toBeInTheDocument();
    expect(screen.getByText('10 insured locations affected')).toBeInTheDocument();
  });

  it('renders affected area', () => {
    render(
      <NotificationCard
        title="Alert"
        message="Details"
        affectedArea="Butte County, CA"
      />
    );
    expect(screen.getByText('Butte County, CA')).toBeInTheDocument();
  });

  it('renders link text', () => {
    render(
      <NotificationCard
        title="Alert"
        message="Details"
        linkText="View Details"
        linkHref="/details"
      />
    );
    const link = screen.getByText('View Details');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/details');
  });

  it('renders timestamp', () => {
    render(<NotificationCard title="Alert" message="Msg" timestamp="5m ago" />);
    expect(screen.getByText('5m ago')).toBeInTheDocument();
  });

  it('renders with different alert types', () => {
    const { rerender } = render(<NotificationCard title="T" message="M" alertType="error" />);
    expect(screen.getByText('T')).toBeInTheDocument();
    rerender(<NotificationCard title="T" message="M" alertType="success" />);
    expect(screen.getByText('T')).toBeInTheDocument();
  });
});
