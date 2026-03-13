import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from './Tabs';
import type { TabItem } from './Tabs';

describe('Tabs', () => {
  const tabs: TabItem[] = [
    { id: 'overview', title: 'Overview', content: <p>Overview content</p> },
    { id: 'details', title: 'Details', content: <p>Details content</p> },
    { id: 'disabled', title: 'Disabled Tab', content: <p>Should not show</p>, disabled: true },
  ];

  it('renders all tab labels', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Disabled Tab')).toBeInTheDocument();
  });

  it('shows first tab content by default', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText('Overview content')).toBeVisible();
  });

  it('switches tab content on click', () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.click(screen.getByText('Details'));
    expect(screen.getByText('Details content')).toBeVisible();
  });

  it('respects defaultActiveId', () => {
    render(<Tabs tabs={tabs} defaultActiveId="details" />);
    expect(screen.getByText('Details content')).toBeVisible();
  });

  it('calls onSelect when tab is clicked', () => {
    const onSelect = vi.fn();
    render(<Tabs tabs={tabs} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Details'));
    expect(onSelect).toHaveBeenCalledWith('details');
  });

  it('disables tabs marked as disabled', () => {
    render(<Tabs tabs={tabs} />);
    const disabledTab = screen.getByText('Disabled Tab').closest('button');
    expect(disabledTab).toBeDisabled();
  });
});
