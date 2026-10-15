import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';

import { FilterBoolean, FilterNumberRange } from './filter-controls';
import type { FilterField } from './filter-schema';

const premium = {
  id: 'premium',
  label: 'Premium',
  type: 'numberRange',
  unit: 'currency',
} satisfies Extract<FilterField, { type: 'numberRange' }>;

const bound = {
  id: 'bound',
  label: 'Bound',
  type: 'boolean',
  trueLabel: 'Bound',
  falseLabel: 'Unbound',
} satisfies Extract<FilterField, { type: 'boolean' }>;

/**
 * The two Radix primitives disagree about what opens them, which is worth
 * knowing before the next person loses twenty minutes to it: DropdownMenu
 * opens on POINTERDOWN, Popover opens on CLICK.
 */
const openMenu = (name: RegExp | string) =>
  fireEvent.pointerDown(screen.getByRole('button', { name }), {
    button: 0,
    ctrlKey: false,
    pointerType: 'mouse',
  });
const openPopover = (name: RegExp | string) =>
  fireEvent.click(screen.getByRole('button', { name }));

describe('FilterNumberRange', () => {
  it('shows the field name until something is applied', () => {
    render(<FilterNumberRange field={premium} onValueChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Premium' })).toBeInTheDocument();
  });

  it('states the UNIT in the chip once applied', () => {
    // "Premium: over 500000" is ambiguous. The column declares it is currency.
    render(<FilterNumberRange field={premium} value={{ min: 500000 }} onValueChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Premium: over \$/ })).toBeInTheDocument();
  });

  it('does NOT filter on every keystroke', async () => {
    // A half-typed "5" would filter to everything over five dollars before the
    // user reaches 500000 — and in server mode fires a request per digit.
    const onValueChange = vi.fn();
    render(<FilterNumberRange field={premium} onValueChange={onValueChange} />);
    openPopover('Premium');
    fireEvent.change(await screen.findByLabelText('Minimum Premium'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('Minimum Premium'), { target: { value: '50' } });
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('commits on Apply', async () => {
    const onValueChange = vi.fn();
    render(<FilterNumberRange field={premium} onValueChange={onValueChange} />);
    openPopover('Premium');
    fireEvent.change(await screen.findByLabelText('Minimum Premium'), { target: { value: '500000' } });
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
    expect(onValueChange).toHaveBeenCalledWith({ min: 500000, max: undefined });
  });

  it('applies on Enter, because a two-field form should submit', async () => {
    const onValueChange = vi.fn();
    render(<FilterNumberRange field={premium} onValueChange={onValueChange} />);
    openPopover('Premium');
    const input = await screen.findByLabelText('Maximum Premium');
    fireEvent.change(input, { target: { value: '9000' } });
    fireEvent.submit(input.closest('form')!);
    expect(onValueChange).toHaveBeenCalledWith({ min: undefined, max: 9000 });
  });

  it('clears to undefined rather than an empty range', async () => {
    // { min: undefined, max: undefined } would read as "applied" to anything
    // checking for the key's presence.
    const onValueChange = vi.fn();
    render(<FilterNumberRange field={premium} value={{ min: 1 }} onValueChange={onValueChange} />);
    openPopover(/Premium/);
    fireEvent.click(await screen.findByRole('button', { name: 'Clear' }));
    expect(onValueChange).toHaveBeenCalledWith(undefined);
  });

  it('refuses a non-numeric entry instead of committing NaN', async () => {
    const onValueChange = vi.fn();
    render(<FilterNumberRange field={premium} onValueChange={onValueChange} />);
    openPopover('Premium');
    fireEvent.change(await screen.findByLabelText('Minimum Premium'), { target: { value: 'abc' } });
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('labels each input for screen readers, not just visually', async () => {
    render(<FilterNumberRange field={premium} onValueChange={vi.fn()} />);
    openPopover('Premium');
    expect(await screen.findByLabelText('Minimum Premium')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximum Premium')).toBeInTheDocument();
  });
});

describe('FilterBoolean is TRI-state', () => {
  it('offers Any as well as the two values', async () => {
    // A two-state toggle cannot ask for the false rows. "Show unbound
    // policies" is a real question.
    render(<FilterBoolean field={bound} onValueChange={vi.fn()} />);
    openMenu('Bound');
    expect(await screen.findByRole('menuitemradio', { name: 'Any' })).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: 'Bound' })).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: 'Unbound' })).toBeInTheDocument();
  });

  it('reports false as a VALUE, not as absence', () => {
    const onValueChange = vi.fn();
    render(<FilterBoolean field={bound} onValueChange={onValueChange} />);
    openMenu('Bound');
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Unbound' }));
    expect(onValueChange).toHaveBeenCalledWith(false);
  });

  it('reports Any as undefined, clearing the filter', () => {
    const onValueChange = vi.fn();
    render(<FilterBoolean field={bound} value={false} onValueChange={onValueChange} />);
    openMenu(/Bound/);
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Any' }));
    expect(onValueChange).toHaveBeenCalledWith(undefined);
  });

  it('shows the field\'s own words in the chip, including for false', () => {
    render(<FilterBoolean field={bound} value={false} onValueChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Bound: Unbound' })).toBeInTheDocument();
  });
});
