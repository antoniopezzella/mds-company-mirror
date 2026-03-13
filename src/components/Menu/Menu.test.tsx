import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Menu } from './Menu';

const items = [
  { id: 'edit', label: 'Edit' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'delete', label: 'Delete', tone: 'danger' as const },
];

describe('Menu', () => {
  it('renders trigger element', () => {
    render(<Menu trigger={<button>Open Menu</button>} items={items} />);
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('opens menu when trigger is clicked', () => {
    render(<Menu trigger={<button>Open Menu</button>} items={items} />);
    fireEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onClick callback when item is clicked', () => {
    const onClick = vi.fn();
    const itemsWithClick = [
      { id: 'action', label: 'Do Something', onClick },
    ];
    render(<Menu trigger={<button>Open</button>} items={itemsWithClick} />);
    fireEvent.click(screen.getByText('Open'));
    fireEvent.click(screen.getByText('Do Something'));
    expect(onClick).toHaveBeenCalled();
  });

  it('closes menu after item click', () => {
    render(<Menu trigger={<button>Open</button>} items={items} />);
    fireEvent.click(screen.getByText('Open'));
    fireEvent.click(screen.getByText('Edit'));
    // Menu should be closed, items should not be visible
    expect(screen.queryByText('Edit')).not.toBeVisible();
  });

  it('renders disabled item', () => {
    const disabledItems = [
      { id: 'disabled', label: 'Cannot Click', disabled: true },
    ];
    render(<Menu trigger={<button>Open</button>} items={disabledItems} />);
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Cannot Click').closest('li')).toHaveAttribute('aria-disabled', 'true');
  });
});
