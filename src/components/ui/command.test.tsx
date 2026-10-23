import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './command';

// cmdk renders inline (not portalled), so filtering and selection all work in jsdom.
function Palette({ onSelect }: { onSelect?: (v: string) => void } = {}) {
  return (
    <Command>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="Calendar" onSelect={onSelect}>Calendar</CommandItem>
          <CommandItem value="Calculator" onSelect={onSelect}>Calculator</CommandItem>
          <CommandSeparator />
          <CommandItem value="Settings" onSelect={onSelect}>
            Settings <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

describe('Command', () => {
  it('renders all items by default', () => {
    render(<Palette />);
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('exposes the input with its placeholder', () => {
    render(<Palette />);
    expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument();
  });

  it('filters items as the query narrows the list', () => {
    render(<Palette />);
    fireEvent.change(screen.getByPlaceholderText('Type a command...'), { target: { value: 'Calc' } });
    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  it('shows the empty state when nothing matches', () => {
    render(<Palette />);
    fireEvent.change(screen.getByPlaceholderText('Type a command...'), { target: { value: 'zzzzz' } });
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('fires onSelect when an item is clicked', () => {
    const onSelect = vi.fn();
    render(<Palette onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Calendar'));
    expect(onSelect).toHaveBeenCalledWith('Calendar');
  });

  it('renders a shortcut hint alongside an item', () => {
    render(<Palette />);
    expect(screen.getByText('⌘S')).toBeInTheDocument();
  });

  it('exposes the list as a listbox with its items as options', () => {
    render(<Palette />);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBeGreaterThanOrEqual(3);
  });
});
