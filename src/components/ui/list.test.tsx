import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { List, type ListItemConfig } from './list';

const items: ListItemConfig[] = [
  { id: 'a', primary: 'Commercial Auto', secondary: 'Policy #1' },
  { id: 'b', primary: 'General Liability' },
];

describe('List', () => {
  it('renders each item primary and secondary text', () => {
    render(<List items={items} />);
    expect(screen.getByText('Commercial Auto')).toBeInTheDocument();
    expect(screen.getByText('Policy #1')).toBeInTheDocument();
    expect(screen.getByText('General Liability')).toBeInTheDocument();
  });

  it('fires an item onClick for a non-selectable list', () => {
    const onClick = vi.fn();
    render(<List items={[{ id: 'a', primary: 'Row', onClick }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Row' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('toggles aria-pressed and reports selection on a selectable list', () => {
    const onSelectionChange = vi.fn();
    render(<List items={[{ id: 'a', primary: 'Row' }]} selectable onSelectionChange={onSelectionChange} />);
    const row = screen.getByRole('button', { name: 'Row' });
    expect(row).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(row);
    expect(row).toHaveAttribute('aria-pressed', 'true');
    expect(onSelectionChange).toHaveBeenCalledWith(['a']);
  });

  it('does not fire onClick for a disabled item', () => {
    const onClick = vi.fn();
    render(<List items={[{ id: 'a', primary: 'Row', onClick, disabled: true }]} />);
    const row = screen.getByRole('button', { name: 'Row' });
    expect(row).toBeDisabled();
    fireEvent.click(row);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('supports selecting multiple items when multiSelect is set', () => {
    const onSelectionChange = vi.fn();
    render(<List items={items} selectable multiSelect onSelectionChange={onSelectionChange} />);
    fireEvent.click(screen.getByRole('button', { name: /Commercial Auto/ }));
    fireEvent.click(screen.getByRole('button', { name: /General Liability/ }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(['a', 'b']);
  });

  it('renders a subheader when provided', () => {
    render(<List items={items} subheader="Policies" />);
    expect(screen.getByText('Policies')).toBeInTheDocument();
  });
});
