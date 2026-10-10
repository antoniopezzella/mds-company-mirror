import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';

import { FiltersValueEditor } from './filters-value-editor';
import { findOperator } from './filters-operators';
import type { FilterField } from './filters-schema';

/**
 * The value editor — the control a user actually types into.
 *
 * It sat at 2.89% statement coverage (8 of 276 lines) with no test file at
 * all: the worst-covered non-trivial module in `src/components/ui`, old code
 * or new, while shipping publicly. Its eight covered lines came entirely from
 * being rendered as a child of other components' tests.
 *
 * What that hid is the point — the NaN guard, the range validation §43 is
 * written against, and whether choosing a value closes the popover — are all
 * behaviours a user meets on their first interaction.
 */

const text: FilterField = { id: 'city', label: 'City', type: 'text' };
const number: FilterField = { id: 'premium', label: 'Premium', type: 'number', unit: 'currency' };
const date: FilterField = { id: 'renewal', label: 'Renewal', type: 'date' };
const bool: FilterField = {
  id: 'bound', label: 'Bound', type: 'boolean', trueLabel: 'Bound', falseLabel: 'Unbound',
};
const select: FilterField = {
  id: 'status',
  label: 'Status',
  type: 'select',
  options: [
    { value: 'A', label: 'Active' },
    { value: 'E', label: 'Expired' },
    { value: 'X', label: 'Cancelled', disabled: true },
  ],
};
const many: FilterField = {
  id: 'tags',
  label: 'Tags',
  type: 'multiselect',
  options: Array.from({ length: 12 }, (_, i) => ({ value: `t${i}`, label: `Tag ${i}` })),
};

const op = (type: Parameters<typeof findOperator>[0], v: string) => findOperator(type, v);

describe('single-value input', () => {
  it('commits on submit, not on every keystroke', () => {
    const onChange = vi.fn();
    render(
      <FiltersValueEditor field={text} operator={op('text', 'is')} value={undefined} onChange={onChange} />
    );
    const input = screen.getByRole('textbox', { name: /City value/ });
    fireEvent.change(input, { target: { value: 'Rio' } });
    // A filter re-running per keystroke would re-query on every letter.
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.submit(input.closest('form')!);
    expect(onChange).toHaveBeenCalledWith('Rio');
  });

  it('REFUSES an unparseable number rather than storing NaN', () => {
    const onChange = vi.fn();
    const onDone = vi.fn();
    render(
      <FiltersValueEditor field={number} operator={op('number', 'gt')} value={undefined} onChange={onChange} onDone={onDone} />
    );
    const input = screen.getByRole('textbox', { name: /Premium value/ });
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.submit(input.closest('form')!);
    // NaN would compile into a comparison that silently matches nothing, so
    // the popover stays open with the text visible instead.
    expect(onChange).not.toHaveBeenCalled();
    expect(onDone).not.toHaveBeenCalled();
  });

  it('clears back to undefined, which is not the same as zero', () => {
    const onChange = vi.fn();
    render(
      <FiltersValueEditor field={number} operator={op('number', 'gt')} value={500} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('labels the unit so the number is unambiguous', () => {
    render(
      <FiltersValueEditor field={number} operator={op('number', 'gt')} value={undefined} onChange={vi.fn()} />
    );
    expect(screen.getByText(/\$/)).toBeInTheDocument();
  });
});

describe('numeric range (§43)', () => {
  const range = () => op('number', 'between');

  it('refuses a maximum below the minimum, and SAYS SO', async () => {
    const onChange = vi.fn();
    render(
      <FiltersValueEditor field={number} operator={range()} value={undefined} onChange={onChange} />
    );
    fireEvent.change(screen.getByRole('textbox', { name: /Minimum/ }), { target: { value: '90' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Maximum/ }), { target: { value: '10' } });
    fireEvent.submit(screen.getByRole('textbox', { name: /Minimum/ }).closest('form')!);

    // Accepting it would return an empty table with no explanation — the
    // exact failure §43 exists to prevent.
    expect(onChange).not.toHaveBeenCalled();
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/greater than or equal/i);
  });

  it('marks both inputs invalid and points them at the message', async () => {
    render(
      <FiltersValueEditor field={number} operator={range()} value={undefined} onChange={vi.fn()} />
    );
    const min = screen.getByRole('textbox', { name: /Minimum/ });
    fireEvent.change(min, { target: { value: '90' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Maximum/ }), { target: { value: '10' } });
    fireEvent.submit(min.closest('form')!);
    await screen.findByRole('alert');
    expect(min).toHaveAttribute('aria-invalid', 'true');
    expect(min).toHaveAttribute('aria-describedby');
  });

  /** Each case gets its own render: the editor holds draft state locally, so
   *  a rerender would carry the previous bound over and test nothing. */
  const fillRange = (min: string, max: string) => {
    const onChange = vi.fn();
    render(
      <FiltersValueEditor field={number} operator={range()} value={undefined} onChange={onChange} />
    );
    if (min) fireEvent.change(screen.getByRole('textbox', { name: /Minimum/ }), { target: { value: min } });
    if (max) fireEvent.change(screen.getByRole('textbox', { name: /Maximum/ }), { target: { value: max } });
    fireEvent.submit(screen.getByRole('textbox', { name: /Minimum/ }).closest('form')!);
    return onChange;
  };

  it('accepts an equal pair', () => {
    expect(fillRange('10', '10')).toHaveBeenCalledWith({ min: 10, max: 10 });
  });

  it('accepts a lower bound alone', () => {
    expect(fillRange('10', '')).toHaveBeenCalledWith({ min: 10, max: undefined });
  });

  it('accepts an UPPER bound alone — the case a shared link used to destroy', () => {
    expect(fillRange('', '9')).toHaveBeenCalledWith({ min: undefined, max: 9 });
  });
});

describe('date range', () => {
  it('stores YYYY-MM-DD strings, never Date objects', () => {
    const onChange = vi.fn();
    const { container } = render(
      <FiltersValueEditor field={date} operator={op('date', 'between')} value={undefined} onChange={onChange} />
    );
    const [from, to] = Array.from(container.querySelectorAll('input[type="date"]'));
    fireEvent.change(from, { target: { value: '2026-01-01' } });
    fireEvent.change(to, { target: { value: '2026-03-31' } });
    fireEvent.submit(from.closest('form')!);
    // A Date does not survive a round trip through a URL, and parsing it back
    // invites the UTC-midnight shift.
    expect(onChange).toHaveBeenCalledWith({ from: '2026-01-01', to: '2026-03-31' });
  });
});

describe('boolean', () => {
  it('uses the field’s own words, not Yes and No', () => {
    render(<FiltersValueEditor field={bool} operator={op('boolean', 'is')} value={undefined} onChange={vi.fn()} />);
    expect(screen.getByRole('radio', { name: 'Bound' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Unbound' })).toBeInTheDocument();
  });

  it('marks the selected one and closes on choose', () => {
    const onChange = vi.fn();
    const onDone = vi.fn();
    render(
      <FiltersValueEditor field={bool} operator={op('boolean', 'is')} value={true} onChange={onChange} onDone={onDone} />
    );
    expect(screen.getByRole('radio', { name: 'Bound' })).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(screen.getByRole('radio', { name: 'Unbound' }));
    expect(onChange).toHaveBeenCalledWith(false);
    expect(onDone).toHaveBeenCalled();
  });

  it('is ONE tab stop with arrows inside it, not two tab stops', () => {
    render(<FiltersValueEditor field={bool} operator={op('boolean', 'is')} value={true} onChange={vi.fn()} />);
    const radios = screen.getAllByRole('radio');
    // Every option was a native button with an implicit tabindex of 0.
    expect(radios.map((r) => r.tabIndex).filter((t) => t === 0)).toHaveLength(1);
  });
});

describe('options list', () => {
  it('single-select closes on choose (§26)', () => {
    const onChange = vi.fn();
    const onDone = vi.fn();
    render(
      <FiltersValueEditor field={select} operator={op('select', 'is')} value={undefined} onChange={onChange} onDone={onDone} />
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Active' }));
    expect(onChange).toHaveBeenCalledWith('A');
    expect(onDone).toHaveBeenCalled();
  });

  it('multi-select STAYS OPEN, so three values are not three reopens (§27)', () => {
    const onChange = vi.fn();
    const onDone = vi.fn();
    render(
      <FiltersValueEditor field={select} operator={op('select', 'any_of')} value={undefined} onChange={onChange} onDone={onDone} />
    );
    fireEvent.click(screen.getByRole('checkbox', { name: 'Active' }));
    expect(onChange).toHaveBeenCalledWith(['A']);
    expect(onDone).not.toHaveBeenCalled();
  });

  it('toggles a value back off, and empties to undefined', () => {
    const onChange = vi.fn();
    render(
      <FiltersValueEditor field={select} operator={op('select', 'any_of')} value={['A'] as never} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole('checkbox', { name: 'Active' }));
    // Not `[]` — an empty array is a rule that can never execute.
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('refuses a disabled option', () => {
    const onChange = vi.fn();
    render(
      <FiltersValueEditor field={select} operator={op('select', 'is')} value={undefined} onChange={onChange} />
    );
    const cancelled = screen.getByRole('radio', { name: 'Cancelled' });
    expect(cancelled).toBeDisabled();
    fireEvent.click(cancelled);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('offers a search box only once the list is long enough to need one', () => {
    render(
      <FiltersValueEditor field={select} operator={op('select', 'is')} value={undefined} onChange={vi.fn()} />
    );
    expect(screen.queryByRole('textbox', { name: /Search/ })).toBeNull();
  });

  it('filters a long list, and says so when nothing matches', async () => {
    render(
      <FiltersValueEditor field={many} operator={op('multiselect', 'contains_any')} value={undefined} onChange={vi.fn()} />
    );
    const search = screen.getByRole('textbox', { name: /Search Tags options/ });
    fireEvent.change(search, { target: { value: 'Tag 1' } });
    await waitFor(() => {
      // Tag 1, Tag 10, Tag 11
      expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    });
    fireEvent.change(search, { target: { value: 'zzz' } });
    expect(await screen.findByText('No options')).toBeInTheDocument();
  });

  it('is one tab stop, with arrows moving inside it', () => {
    render(
      <FiltersValueEditor field={select} operator={op('select', 'is')} value={'A' as never} onChange={vi.fn()} />
    );
    const radios = screen.getAllByRole('radio');
    expect(radios.map((r) => r.tabIndex).filter((t) => t === 0)).toHaveLength(1);
    fireEvent.keyDown(radios[0], { key: 'ArrowDown' });
    // The roving index moved; focus follows on the next frame.
    expect(radios.map((r) => r.tabIndex).filter((t) => t === 0)).toHaveLength(1);
  });
});

describe('custom editors (§11)', () => {
  it('a registered editor wins over the built-in control', () => {
    const Custom = () => <div data-testid="custom">custom</div>;
    render(
      <FiltersValueEditor
        field={{ ...text, editor: 'mine' }}
        operator={op('text', 'is')}
        value={undefined}
        onChange={vi.fn()}
        editors={{ mine: Custom }}
      />
    );
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });

  it('falls back when the named editor is not registered', () => {
    render(
      <FiltersValueEditor
        field={{ ...text, editor: 'missing' }}
        operator={op('text', 'is')}
        value={undefined}
        onChange={vi.fn()}
        editors={{}}
      />
    );
    expect(screen.getByRole('textbox', { name: /City value/ })).toBeInTheDocument();
  });
});
