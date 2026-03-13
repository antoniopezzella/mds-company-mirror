import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { List } from './List';
import type { ListItemConfig } from './List';

const items: ListItemConfig[] = [
  { id: 'auto', primary: 'Auto Insurance', secondary: 'Vehicle coverage' },
  { id: 'home', primary: 'Home Insurance', secondary: 'Property protection' },
  { id: 'life', primary: 'Life Insurance', secondary: 'Family security' },
];

describe('List', () => {
  it('renders all items', () => {
    render(<List items={items} />);
    expect(screen.getByText('Auto Insurance')).toBeInTheDocument();
    expect(screen.getByText('Home Insurance')).toBeInTheDocument();
    expect(screen.getByText('Life Insurance')).toBeInTheDocument();
  });

  it('renders secondary text', () => {
    render(<List items={items} />);
    expect(screen.getByText('Vehicle coverage')).toBeInTheDocument();
    expect(screen.getByText('Property protection')).toBeInTheDocument();
  });

  it('renders subheader', () => {
    render(<List items={items} subheader="Insurance Plans" />);
    expect(screen.getByText('Insurance Plans')).toBeInTheDocument();
  });

  it('fires onClick when item is clicked', () => {
    const onClick = vi.fn();
    const clickableItems = [
      { id: 'item', primary: 'Clickable Item', onClick },
    ];
    render(<List items={clickableItems} />);
    fireEvent.click(screen.getByText('Clickable Item'));
    expect(onClick).toHaveBeenCalled();
  });

  it('supports selectable mode', () => {
    const onSelectionChange = vi.fn();
    render(<List items={items} selectable onSelectionChange={onSelectionChange} />);
    fireEvent.click(screen.getByText('Auto Insurance'));
    expect(onSelectionChange).toHaveBeenCalled();
  });

  it('renders disabled items', () => {
    const disabledItems: ListItemConfig[] = [
      { id: 'disabled', primary: 'Disabled Item', disabled: true },
    ];
    const { container } = render(<List items={disabledItems} />);
    expect(container.querySelector('.Mui-disabled')).toBeInTheDocument();
  });
});
