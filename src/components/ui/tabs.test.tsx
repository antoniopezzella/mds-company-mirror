import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Tabs, type TabItem } from './tabs';

describe('Tabs', () => {
  const tabs: TabItem[] = [
    { id: 'overview', title: 'Overview', content: 'Overview content' },
    { id: 'claims', title: 'Claims', content: 'Claims content' },
    { id: 'documents', title: 'Documents', content: 'Documents content', disabled: true },
  ];

  it('renders every tab title', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Claims' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Documents' })).toBeInTheDocument();
  });

  it('activates the first non-disabled tab by default', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Overview content')).toBeInTheDocument();
  });

  it('honors defaultActiveId when the referenced tab is not disabled', () => {
    render(<Tabs tabs={tabs} defaultActiveId="claims" />);
    expect(screen.getByRole('tab', { name: 'Claims' })).toHaveAttribute('aria-selected', 'true');
  });

  it('falls back to the first enabled tab when defaultActiveId points at a disabled one', () => {
    render(<Tabs tabs={tabs} defaultActiveId="documents" />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Documents' })).toHaveAttribute('aria-selected', 'false');
  });

  it('switches the active tab and visible content on click', () => {
    render(<Tabs tabs={tabs} />);
    // Radix Tabs activates on mousedown (immediate-activation feel), not
    // click — fireEvent.click alone never fires it in jsdom.
    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Claims' }));
    expect(screen.getByRole('tab', { name: 'Claims' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Claims content')).toBeInTheDocument();
  });

  it('calls onSelect with the newly active tab id', () => {
    const onSelect = vi.fn();
    render(<Tabs tabs={tabs} onSelect={onSelect} />);
    // Radix Tabs activates on mousedown (immediate-activation feel), not
    // click — fireEvent.click alone never fires it in jsdom.
    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Claims' }));
    expect(onSelect).toHaveBeenCalledWith('claims');
  });

  it('disables the tab marked disabled', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tab', { name: 'Documents' })).toBeDisabled();
  });

  it('applies the fullWidth variant class to the tab list', () => {
    const { container } = render(<Tabs tabs={tabs} variant="fullWidth" />);
    const list = container.querySelector('[role="tablist"]');
    expect(list?.className).toMatch(/w-full/);
  });
});
