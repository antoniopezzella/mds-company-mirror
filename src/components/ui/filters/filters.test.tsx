import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Filters } from './filters';
import { __resetFilterIds, createFilterGroup, createFilterQuery, createFilterRule } from './filters-query';
import type { FilterField } from './filters-schema';
import type { FilterQuery } from './filters-types';

beforeEach(__resetFilterIds);

const FIELDS: FilterField[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'expired', label: 'Expired' },
    ],
  },
  { id: 'tiv', label: 'Total insured value', type: 'number', unit: 'currency', aliases: ['TIV'] },
  {
    id: 'risk',
    label: 'Risk',
    type: 'select',
    fields: [
      { id: 'cat', label: 'CAT', type: 'select', fields: [{ id: 'flood', label: 'Flood', type: 'number' }] },
    ],
  },
];

/** Popover opens on CLICK; DropdownMenu opens on POINTERDOWN. */
const openPopover = (name: string | RegExp) => fireEvent.click(screen.getByRole('button', { name }));
const openMenu = (name: string | RegExp) =>
  fireEvent.pointerDown(screen.getByRole('button', { name }), {
    button: 0,
    ctrlKey: false,
    pointerType: 'mouse',
  });

describe('the empty state is just "+ Add filter" (§51)', () => {
  it('renders one control and no decorative container', () => {
    render(<Filters fields={FIELDS} />);
    expect(screen.getByRole('button', { name: /Add filter/ })).toBeInTheDocument();
    // Nothing to clear yet, so no Clear all competing for attention.
    expect(screen.queryByRole('button', { name: 'Clear all' })).toBeNull();
    expect(screen.queryByRole('group')).toBeNull();
  });
});

describe('a rule is a SEGMENTED GROUP, not one chip (§3, §14)', () => {
  const withRule = () =>
    render(
      <Filters
        fields={FIELDS}
        defaultQuery={createFilterQuery([
          createFilterRule(['status'], { operator: 'is', value: 'active' }),
        ])}
      />
    );

  it('renders field, operator and value as separate controls', () => {
    // A single chip reading "Status: Active" cannot offer this, which is why
    // the earlier version could not express "is not" at all.
    withRule();
    const group = screen.getByRole('group');
    expect(within(group).getByRole('button', { name: 'Field: Status' })).toBeInTheDocument();
    expect(within(group).getByRole('button', { name: 'Condition: is' })).toBeInTheDocument();
    expect(within(group).getByRole('button', { name: 'Value: Active' })).toBeInTheDocument();
  });

  it('names the group as one readable condition', () => {
    withRule();
    expect(screen.getByRole('group', { name: 'Status is Active' })).toBeInTheDocument();
  });

  it('names the remove control after its condition, not just "Remove" (§47.3)', () => {
    withRule();
    expect(screen.getByRole('button', { name: 'Remove Status filter' })).toBeInTheDocument();
  });

  it('offers only operators valid for the field (§9)', () => {
    withRule();
    openMenu('Condition: is');
    const items = screen.getAllByRole('menuitem').map((i) => i.textContent);
    expect(items).toContain('is any of');
    // `greater than` belongs to numbers, not a select.
    expect(items).not.toContain('greater than');
  });
});

describe('the value segment disappears for a value-less operator (§9)', () => {
  it('renders no value control for "is empty"', () => {
    render(
      <Filters
        fields={FIELDS}
        defaultQuery={createFilterQuery([createFilterRule(['tiv'], { operator: 'is_empty' })])}
      />
    );
    // An empty input beside a complete rule reads as unfinished work.
    expect(screen.queryByRole('button', { name: /Select value/ })).toBeNull();
    expect(screen.getByRole('button', { name: 'Condition: is empty' })).toBeInTheDocument();
  });
});

describe('adding a filter (§12)', () => {
  it('walks Add filter → field → draft rule', () => {
    const onQueryChange = vi.fn();
    render(<Filters fields={FIELDS} onQueryChange={onQueryChange} />);
    openPopover(/Add filter/);
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Status' }));

    expect(onQueryChange).toHaveBeenCalled();
    const [query, meta] = onQueryChange.mock.calls.at(-1)!;
    expect(meta.reason).toBe('add');
    expect((query as FilterQuery).rules).toHaveLength(1);
  });

  it('finds a DEEPLY nested field by search (§8)', () => {
    const onQueryChange = vi.fn();
    render(<Filters fields={FIELDS} onQueryChange={onQueryChange} />);
    openPopover(/Add filter/);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'flood' } });
    fireEvent.mouseDown(screen.getByRole('option', { name: /Flood/ }));

    const [query] = onQueryChange.mock.calls.at(-1)!;
    expect((query as FilterQuery).rules[0]).toMatchObject({ path: ['risk', 'cat', 'flood'] });
  });

  it('shows a draft as unfinished rather than as an error (§13)', () => {
    render(
      <Filters fields={FIELDS} defaultQuery={createFilterQuery([createFilterRule(['status'])])} />
    );
    expect(screen.getByRole('button', { name: 'Select condition' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
  });
});

describe('changing a field invalidates what no longer applies (§14)', () => {
  it('drops an operator the new field cannot support', () => {
    const onQueryChange = vi.fn();
    render(
      <Filters
        fields={FIELDS}
        defaultQuery={createFilterQuery([createFilterRule(['tiv'], { operator: 'gt', value: 100 })])}
        onQueryChange={onQueryChange}
      />
    );
    openPopover(/^Field:/);
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Status' }));

    const [query] = onQueryChange.mock.calls.at(-1)!;
    // `greater than` on a Status field is nonsense; §14 forbids silently
    // translating it into something plausible.
    expect((query as FilterQuery).rules[0]).toMatchObject({ operator: undefined, value: undefined });
  });
});

describe('the critical semantic guard (§24)', () => {
  it('refuses to render A AND (B OR C) as a flat row of conditions', () => {
    // Three groups side by side would read as A AND B AND C — a different
    // query. Saying so beats misrepresenting it.
    render(
      <Filters
        fields={FIELDS}
        defaultQuery={createFilterQuery([
          createFilterRule(['status'], { operator: 'is', value: 'active' }),
          createFilterGroup('or', [
            createFilterRule(['tiv'], { operator: 'gt', value: 1 }),
            createFilterRule(['tiv'], { operator: 'lt', value: 9 }),
          ]),
        ])}
      />
    );
    expect(screen.queryByRole('group')).toBeNull();
    expect(screen.getByText(/cannot be edited here without changing its meaning/)).toBeInTheDocument();
  });
});

describe('controlled vs uncontrolled (§32, §33)', () => {
  it('follows the controlled query exactly, keeping no competing copy', () => {
    const query = createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'active' })]);
    const onQueryChange = vi.fn();
    render(<Filters fields={FIELDS} query={query} onQueryChange={onQueryChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Remove Status filter' }));
    // The parent was told; the view did NOT change itself.
    expect(onQueryChange).toHaveBeenCalled();
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('owns its state when uncontrolled', () => {
    render(
      <Filters
        fields={FIELDS}
        defaultQuery={createFilterQuery([
          createFilterRule(['status'], { operator: 'is', value: 'active' }),
        ])}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Remove Status filter' }));
    expect(screen.queryByRole('group')).toBeNull();
  });
});

describe('clear all (§19)', () => {
  it('appears only when there is something to clear, and empties the query', () => {
    const onQueryChange = vi.fn();
    render(
      <Filters
        fields={FIELDS}
        defaultQuery={createFilterQuery([
          createFilterRule(['status'], { operator: 'is', value: 'active' }),
        ])}
        onQueryChange={onQueryChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    const [query, meta] = onQueryChange.mock.calls.at(-1)!;
    expect(meta.reason).toBe('clear');
    expect((query as FilterQuery).rules).toHaveLength(0);
    expect(screen.queryByRole('button', { name: 'Clear all' })).toBeNull();
  });
});

describe('read-only and disabled (§39, §40)', () => {
  it('read-only hides every mutation control', () => {
    render(
      <Filters
        fields={FIELDS}
        readOnly
        defaultQuery={createFilterQuery([
          createFilterRule(['status'], { operator: 'is', value: 'active' }),
        ])}
      />
    );
    expect(screen.queryByRole('button', { name: /Add filter/ })).toBeNull();
    expect(screen.queryByRole('button', { name: /^Remove/ })).toBeNull();
    // The condition is still READ, which is the difference from disabled.
    expect(screen.getByRole('group', { name: 'Status is Active' })).toBeInTheDocument();
  });

  it('disabled keeps the controls but makes them inert', () => {
    render(<Filters fields={FIELDS} disabled />);
    expect(screen.getByRole('button', { name: /Add filter/ })).toBeDisabled();
  });
});

describe('announcements (§47.4)', () => {
  it('has a polite live region, not an assertive one', () => {
    render(<Filters fields={FIELDS} />);
    const live = screen.getByRole('status');
    expect(live).toHaveAttribute('aria-live', 'polite');
  });
});

describe('accessibility the axe gate cannot see', () => {
  const oneRule = () =>
    createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'active' })]);

  it('names its region with a role that can actually carry a label', () => {
    // An aria-label on a bare div is dropped: the implicit role is `generic`,
    // which prohibits naming, so AT skipped the whole filter area.
    render(<Filters fields={FIELDS} />);
    expect(screen.getByRole('search', { name: 'Filters' })).toBeInTheDocument();
  });

  it('puts focus somewhere real after Clear all unmounts itself', async () => {
    render(<Filters fields={FIELDS} defaultQuery={oneRule()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    // Otherwise focus falls to <body> and the next Tab restarts from the top
    // of the document.
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Add filter/ })).toHaveFocus()
    );
  });

  it('announces additions by LABEL, not by raw field id', async () => {
    render(<Filters fields={FIELDS} />);
    fireEvent.click(screen.getByRole('button', { name: /Add filter/ }));
    // Nested, so reach it by search — the case where the raw id is least
    // informative, since it announces "flood" for "Risk › CAT › Flood".
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'flood' } });
    fireEvent.mouseDown(screen.getByRole('option', { name: /Flood/ }));
    // Was "Filter added: flood." — the bare leaf id, while the rule it created
    // was labelled "Risk › CAT › Flood".
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent('Risk › CAT › Flood')
    );
  });

  it('announces an operator change, which is otherwise silent', async () => {
    render(<Filters fields={FIELDS} defaultQuery={oneRule()} />);
    openMenu('Condition: is');
    fireEvent.click(screen.getByRole('menuitem', { name: 'is not' }));
    // The focused button's own label changes under the user, and a changed
    // label does not re-announce.
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('is not'));
  });
});
