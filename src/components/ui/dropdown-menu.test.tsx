import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from './dropdown-menu';

// Same rationale as dialog.test.tsx: Radix DropdownMenu's open state is
// fully controllable via `open`/`onOpenChange`, so these tests render it
// already open rather than simulating a trigger click + pointer sequence.
describe('DropdownMenu', () => {
  it('renders items when open', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
  });

  it('renders nothing when closed', () => {
    render(
      <DropdownMenu open={false}>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Hidden item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.queryByText('Hidden item')).not.toBeInTheDocument();
  });

  it('renders the trigger regardless of open state', () => {
    render(
      <DropdownMenu open={false}>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('calls onSelect when an item is clicked', () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    fireEvent.click(screen.getByText('Delete'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('renders a label and separator', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('does not fire onSelect for a disabled item', () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled onSelect={onSelect}>
            Locked
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    fireEvent.click(screen.getByText('Locked'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders a checkbox item with its checked state', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>View</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Show archived</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.getByRole('menuitemcheckbox')).toHaveAttribute('aria-checked', 'true');
  });
});
