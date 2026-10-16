import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarCheckboxItem,
} from './menubar';

// Radix Menubar.Root is controllable via `value` / the menu's `value`, so a
// menu can be rendered already-open without simulating a click sequence.
function Bar({ open, onSelect }: { open?: boolean; onSelect?: () => void } = {}) {
  return (
    <Menubar value={open ? 'file' : undefined}>
      <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>File actions</MenubarLabel>
          <MenubarSeparator />
          <MenubarItem onSelect={onSelect}>New Tab</MenubarItem>
          <MenubarItem disabled onSelect={onSelect}>Print</MenubarItem>
          <MenubarCheckboxItem checked>Autosave</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

describe('Menubar', () => {
  it('renders the top-level trigger', () => {
    render(<Bar />);
    expect(screen.getByText('File')).toBeInTheDocument();
  });

  it('keeps menu content hidden while the menu is closed', () => {
    render(<Bar open={false} />);
    expect(screen.queryByText('New Tab')).not.toBeInTheDocument();
  });

  it('shows the menu content when the menu is open', () => {
    render(<Bar open />);
    expect(screen.getByText('New Tab')).toBeInTheDocument();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('fires onSelect when an enabled item is clicked', () => {
    const onSelect = vi.fn();
    render(<Bar open onSelect={onSelect} />);
    fireEvent.click(screen.getByText('New Tab'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('does not fire onSelect for a disabled item', () => {
    const onSelect = vi.fn();
    render(<Bar open onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Print'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders a label, a separator and a checked checkbox item', () => {
    render(<Bar open />);
    expect(screen.getByText('File actions')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByRole('menuitemcheckbox')).toHaveAttribute('aria-checked', 'true');
  });
});
