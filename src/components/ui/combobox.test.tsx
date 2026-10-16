import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Combobox, type ComboboxOption } from './combobox';

const options: ComboboxOption[] = [
  { value: 'next', label: 'Next.js' },
  { value: 'svelte', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt', disabled: true },
];

describe('Combobox', () => {
  it('renders a combobox-role trigger showing the placeholder when nothing is selected', () => {
    render(<Combobox options={options} placeholder="Pick a framework" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Pick a framework');
  });

  it('shows the selected option label instead of the placeholder', () => {
    render(<Combobox options={options} value="svelte" placeholder="Pick a framework" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('SvelteKit');
    expect(trigger).not.toHaveTextContent('Pick a framework');
  });

  it('defaults its accessible name to the placeholder (role=combobox gets no name from content)', () => {
    render(<Combobox options={options} placeholder="Pick a framework" />);
    // If the aria-label fell through, getByRole with that name would throw.
    expect(screen.getByRole('combobox', { name: 'Pick a framework' })).toBeInTheDocument();
  });

  it('lets an explicit aria-label override the placeholder-derived name', () => {
    render(<Combobox options={options} placeholder="Pick a framework" aria-label="Framework selector" />);
    expect(screen.getByRole('combobox', { name: 'Framework selector' })).toBeInTheDocument();
  });

  it('starts collapsed (aria-expanded=false)', () => {
    render(<Combobox options={options} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('respects the disabled prop on the trigger', () => {
    render(<Combobox options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('forwards a ref to the trigger button', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Combobox ref={ref} options={options} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('opens the list and fires onChange when an option is selected', () => {
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole('combobox'));
    // Popover + Command now mounted; the option is a cmdk item.
    fireEvent.click(screen.getByText('Next.js'));
    expect(onChange).toHaveBeenCalledWith('next');
  });
});
