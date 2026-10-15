import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';

import { FiltersFieldPicker, type FieldPickerHandle } from './filters-field-picker';
import type { FilterField } from './filters-schema';

/**
 * Choosing a field, by keyboard.
 *
 * §47.1 calls keyboard the primary interaction here, and none of it was
 * tested: replacing the whole `onKeyDown` with an immediate `return` left the
 * suite green. Arrow navigation, the drill-in/drill-out pair, and the
 * highlight reset are all things a mouse user never notices and a keyboard
 * user cannot work without.
 */

const FIELDS: FilterField[] = [
  { id: 'status', label: 'Status', type: 'select' },
  { id: 'premium', label: 'Premium', type: 'number' },
  {
    id: 'risk',
    label: 'Risk',
    type: 'select',
    fields: [
      { id: 'flood', label: 'Flood', type: 'number' },
      { id: 'wind', label: 'Wind', type: 'number' },
    ],
  },
  { id: 'tiv', label: 'Total insured value', type: 'number', aliases: ['TIV'] },
  { id: 'gone', label: 'Withdrawn', type: 'text', hidden: true },
  { id: 'off', label: 'Unavailable', type: 'text', disabled: true },
];

const setup = (onSelect = vi.fn()) => {
  const handleRef = React.createRef<FieldPickerHandle>() as React.MutableRefObject<FieldPickerHandle | null>;
  render(<FiltersFieldPicker fields={FIELDS} onSelect={onSelect} handleRef={handleRef} />);
  const input = screen.getByRole('combobox');
  return { onSelect, input, handleRef };
};

const activeLabel = () => {
  const id = screen.getByRole('combobox').getAttribute('aria-activedescendant');
  return id ? document.getElementById(id)?.textContent?.trim() : undefined;
};
const labels = () => screen.getAllByRole('option').map((o) => o.textContent?.trim());

describe('what the list offers', () => {
  it('hides a withdrawn field entirely', () => {
    setup();
    expect(labels()).not.toContain('Withdrawn');
  });

  it('shows a disabled field but marks it unavailable', () => {
    setup();
    const off = screen.getByRole('option', { name: 'Unavailable' });
    expect(off).toHaveAttribute('aria-disabled', 'true');
  });

  it('follows the APG combobox pattern', () => {
    const { input } = setup();
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    const listId = input.getAttribute('aria-controls')!;
    expect(document.getElementById(listId)).toHaveAttribute('role', 'listbox');
    // activedescendant must resolve to a real option, or it announces nothing.
    expect(document.getElementById(input.getAttribute('aria-activedescendant')!)).toHaveAttribute(
      'role',
      'option'
    );
  });
});

describe('arrow navigation', () => {
  it('moves down and up, and wraps at both ends', () => {
    const { input } = setup();
    expect(activeLabel()).toBe('Status');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(activeLabel()).toBe('Premium');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(activeLabel()).toBe('Status');
    // Wrapping means End is always one keystroke away from Home.
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(activeLabel()).toBe('Unavailable');
  });

  it('jumps to the ends with Home and End', () => {
    const { input } = setup();
    fireEvent.keyDown(input, { key: 'End' });
    expect(activeLabel()).toBe('Unavailable');
    fireEvent.keyDown(input, { key: 'Home' });
    expect(activeLabel()).toBe('Status');
  });

  it('Enter selects the HIGHLIGHTED field, not the first one', () => {
    const { input, onSelect } = setup();
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith(['premium']);
  });
});

describe('drilling in and out', () => {
  it('ArrowRight enters a branch and ArrowLeft returns', () => {
    const { input } = setup();
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(activeLabel()).toBe('Risk');
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    expect(labels()).toEqual(['Flood', 'Wind']);
    fireEvent.keyDown(input, { key: 'ArrowLeft' });
    expect(labels()).toContain('Status');
  });

  it('refuses to drill into a leaf', () => {
    const { input } = setup();
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    // Status is a leaf; the list must not change.
    expect(labels()).toContain('Premium');
  });

  it('selects the FULL PATH from inside a branch', () => {
    const { input, onSelect } = setup();
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'Enter' });
    // A bare 'flood' would not resolve back to a field.
    expect(onSelect).toHaveBeenCalledWith(['risk', 'flood']);
  });

  it('RESETS the highlight when the level changes', () => {
    const { input } = setup();
    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'Home' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    // Leaving it pointing at row 5 of a 2-row list is how Enter selects the
    // wrong field — or nothing at all.
    expect(activeLabel()).toBe('Flood');
  });
});

describe('search', () => {
  it('finds a DEEPLY nested field from the top level', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'flood' } });
    expect(labels()?.[0]).toContain('Flood');
  });

  it('finds a field by alias', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'TIV' } });
    expect(labels()?.[0]).toContain('Total insured value');
  });

  it('resets the highlight when the term changes', () => {
    const { input } = setup();
    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.change(input, { target: { value: 'risk' } });
    expect(activeLabel()).toBeTruthy();
  });

  it('says so when nothing matches', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'zzzz' } });
    expect(screen.getByText(/No filters found/)).toBeInTheDocument();
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });

  it('Enter on an empty result set does nothing rather than throwing', () => {
    const { input, onSelect } = setup();
    fireEvent.change(input, { target: { value: 'zzzz' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe('the Escape ladder', () => {
  it('backs out one level, then clears the term, then declines', () => {
    const { input, handleRef } = setup();
    // Escape is handled through this handle rather than the picker's own
    // keydown: Radix listens on `document`, so only `onEscapeKeyDown` on the
    // popover can veto a dismiss.
    // Wrapped in act(): the handle is invoked from outside React's batching,
    // so the state change would not have flushed before the assertion.
    let consumed: boolean | undefined;
    act(() => {
      consumed = handleRef.current?.handleEscape();
    });
    expect(consumed).toBe(false);

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    expect(labels()).toEqual(['Flood', 'Wind']);

    act(() => {
      consumed = handleRef.current?.handleEscape();
    });
    expect(consumed).toBe(true);
    expect(labels()).toContain('Status');

    fireEvent.change(input, { target: { value: 'flood' } });
    act(() => {
      consumed = handleRef.current?.handleEscape();
    });
    expect(consumed).toBe(true);
    // Cleared the term rather than closing.
    expect(labels()).toContain('Status');

    // Nothing left to back out of: the popover may now close.
    act(() => {
      consumed = handleRef.current?.handleEscape();
    });
    expect(consumed).toBe(false);
  });
});

describe('mouse', () => {
  it('selects on mousedown, so the popover does not close first', () => {
    const { onSelect } = setup();
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Premium' }));
    expect(onSelect).toHaveBeenCalledWith(['premium']);
  });

  it('refuses a disabled option', () => {
    const { onSelect } = setup();
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Unavailable' }));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
