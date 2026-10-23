import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
} from './context-menu';

// Radix ContextMenu opens on a `contextmenu` event on its trigger, which
// jsdom + fireEvent.contextMenu reproduces. The content is portalled but
// Testing Library queries the whole document, so screen.* finds it.
function Menu({ onSelect }: { onSelect?: () => void } = {}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click me</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={onSelect}>Edit</ContextMenuItem>
        <ContextMenuItem disabled onSelect={onSelect}>Locked</ContextMenuItem>
        <ContextMenuCheckboxItem checked>Show grid</ContextMenuCheckboxItem>
        <ContextMenuItem tone="danger">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

describe('ContextMenu', () => {
  it('renders the trigger and keeps the menu closed initially', () => {
    render(<Menu />);
    expect(screen.getByText('Right click me')).toBeInTheDocument();
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('opens the menu on a context-menu (right click) event', () => {
    render(<Menu />);
    fireEvent.contextMenu(screen.getByText('Right click me'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('fires onSelect when an enabled item is chosen', () => {
    const onSelect = vi.fn();
    render(<Menu onSelect={onSelect} />);
    fireEvent.contextMenu(screen.getByText('Right click me'));
    fireEvent.click(screen.getByText('Edit'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('does not fire onSelect for a disabled item', () => {
    const onSelect = vi.fn();
    render(<Menu onSelect={onSelect} />);
    fireEvent.contextMenu(screen.getByText('Right click me'));
    fireEvent.click(screen.getByText('Locked'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders a label and a separator inside the open menu', () => {
    render(<Menu />);
    fireEvent.contextMenu(screen.getByText('Right click me'));
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders a checkbox item reflecting its checked state', () => {
    render(<Menu />);
    fireEvent.contextMenu(screen.getByText('Right click me'));
    expect(screen.getByRole('menuitemcheckbox')).toHaveAttribute('aria-checked', 'true');
  });
});
