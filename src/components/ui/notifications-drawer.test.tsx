import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotificationsDrawer, type RiskNotification } from './notifications-drawer';

const notifications: RiskNotification[] = [
  {
    id: 'a',
    title: 'Hurricane Milton',
    severity: 'warning',
    description: '10 insured locations with total insured value $160M.',
    area: 'Butte County, CA',
    timeAgo: '2m ago',
    unread: true,
    actionRequired: true,
    group: 'Today',
  },
  {
    id: 'b',
    title: 'Flood Watch',
    severity: 'watch',
    description: '7 insured locations with total insured value $55M.',
    area: 'Plumas County, CA',
    timeAgo: '23m ago',
    unread: true,
    actionRequired: false,
    group: 'Today',
  },
  {
    id: 'c',
    title: 'Hail Storm Advisory',
    severity: 'advisory',
    description: 'Hail up to 2 inches expected.',
    area: 'Dallas County, TX',
    timeAgo: '1d ago',
    unread: false,
    actionRequired: false,
    group: 'Yesterday',
  },
];

describe('NotificationsDrawer', () => {
  it('renders nothing while closed', () => {
    render(<NotificationsDrawer open={false} onClose={vi.fn()} notifications={notifications} />);
    expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
  });

  it('renders the drawer title when open', () => {
    render(<NotificationsDrawer open onClose={vi.fn()} notifications={notifications} />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  // The drawer opens on the "unread" filter, not "all" — a deliberate default
  // that decides what a user sees first, so it's worth pinning.
  it('defaults to the unread filter', () => {
    render(<NotificationsDrawer open onClose={vi.fn()} notifications={notifications} />);
    expect(screen.getByText('Hurricane Milton')).toBeInTheDocument();
    expect(screen.getByText('Flood Watch')).toBeInTheDocument();
    // Read item is filtered out initially.
    expect(screen.queryByText('Hail Storm Advisory')).not.toBeInTheDocument();
  });

  it('counts unread, all and action-required in the filter pills', () => {
    render(<NotificationsDrawer open onClose={vi.fn()} notifications={notifications} />);
    expect(screen.getByRole('button', { name: /Unread/ })).toHaveTextContent('2');
    expect(screen.getByRole('button', { name: /All/ })).toHaveTextContent('3');
    expect(screen.getByRole('button', { name: /Action Required/ })).toHaveTextContent('1');
  });

  it('switching to All reveals read notifications', () => {
    render(<NotificationsDrawer open onClose={vi.fn()} notifications={notifications} />);
    fireEvent.click(screen.getByRole('button', { name: /All/ }));
    expect(screen.getByText('Hail Storm Advisory')).toBeInTheDocument();
  });

  it('switching to Action Required narrows to actionable items only', () => {
    render(<NotificationsDrawer open onClose={vi.fn()} notifications={notifications} />);
    fireEvent.click(screen.getByRole('button', { name: /Action Required/ }));
    expect(screen.getByText('Hurricane Milton')).toBeInTheDocument();
    expect(screen.queryByText('Flood Watch')).not.toBeInTheDocument();
  });

  it('groups notifications by day, hiding empty groups', () => {
    render(<NotificationsDrawer open onClose={vi.fn()} notifications={notifications} />);
    // Only "Today" has unread items under the default filter.
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.queryByText('Yesterday')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /All/ }));
    expect(screen.getByText('Yesterday')).toBeInTheDocument();
    // "This Week" has no items in either filter and must never appear.
    expect(screen.queryByText('This Week')).not.toBeInTheDocument();
  });

  it('renders a severity label for each notification', () => {
    render(<NotificationsDrawer open onClose={vi.fn()} notifications={notifications} />);
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Watch')).toBeInTheDocument();
  });

  it('calls onClose when the sheet is dismissed', () => {
    const onClose = vi.fn();
    render(<NotificationsDrawer open onClose={onClose} notifications={notifications} />);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(within(dialog).getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('falls back to its built-in notifications when none are passed', () => {
    render(<NotificationsDrawer open onClose={vi.fn()} />);
    // The default set is what the Storybook demo and dashboard rely on.
    expect(screen.getByText('Hurricane Milton')).toBeInTheDocument();
  });
});
