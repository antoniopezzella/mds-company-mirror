import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Filters } from './filters';
import { FiltersBuilder } from './filters-builder';
import {
  __resetFilterIds,
  createFilterGroup,
  createFilterQuery,
  createFilterRule,
} from './filters-query';
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
  { id: 'tiv', label: 'Total insured value', type: 'number', unit: 'currency' },
];

/** Popover opens on CLICK; DropdownMenu opens on POINTERDOWN. */
const openMenu = (name: string | RegExp) =>
  fireEvent.pointerDown(screen.getByRole('button', { name }), {
    button: 0,
    ctrlKey: false,
    pointerType: 'mouse',
  });

const rule = (path: string[], operator: string, value: unknown) =>
  createFilterRule(path, { operator, value: value as never });

/** `A AND (B OR C)` — the query the flat bar refuses to edit. */
const nested = (): FilterQuery =>
  createFilterQuery([
    rule(['status'], 'is', 'active'),
    createFilterGroup('or', [rule(['tiv'], 'gt', 1_000_000), rule(['tiv'], 'lt', 100)]),
  ]);

describe('the builder edits what the flat bar refuses to (§21, §24)', () => {
  it('renders a nested group as a nested group, not a flat row', () => {
    render(<FiltersBuilder fields={FIELDS} defaultQuery={nested()} />);
    const root = screen.getByRole('group', { name: 'All of the following' });
    // The OR group is INSIDE the AND root — the structure the bar could not
    // draw without changing the query's meaning.
    expect(within(root).getByRole('group', { name: 'Any of the following' })).toBeInTheDocument();
  });

  it('gives the flat bar a route here instead of a dead end', () => {
    const onEditAdvanced = vi.fn();
    render(<Filters fields={FIELDS} defaultQuery={nested()} onEditAdvanced={onEditAdvanced} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit in advanced builder' }));
    expect(onEditAdvanced).toHaveBeenCalled();
  });

  it('states the limitation with no route when none is supplied', () => {
    render(<Filters fields={FIELDS} defaultQuery={nested()} />);
    expect(screen.getByText(/cannot be edited here/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Edit in advanced builder' })).toBeNull();
  });
});

describe('the combinator belongs to the GROUP, not to each row (§21)', () => {
  const threeRules = () =>
    createFilterQuery([
      rule(['status'], 'is', 'active'),
      rule(['tiv'], 'gt', 1),
      rule(['tiv'], 'lt', 9),
    ]);

  it('renders exactly one combinator control for three conditions', () => {
    render(<FiltersBuilder fields={FIELDS} defaultQuery={threeRules()} />);
    // Three dropdowns showing the same value would imply three independent
    // choices the model cannot represent.
    expect(screen.getAllByRole('button', { name: /How these conditions combine/ })).toHaveLength(1);
  });

  it('announces its CURRENT VALUE, not just what it is for', () => {
    render(<FiltersBuilder fields={FIELDS} defaultQuery={threeRules()} />);
    // A bare "How these conditions combine" overrode the visible "And", so a
    // screen-reader user could not tell which way the group was set — and a
    // nested query announced two controls with the identical name.
    expect(
      screen.getByRole('button', { name: 'How these conditions combine: And' })
    ).toBeInTheDocument();
  });

  it('marks the current choice in the menu', () => {
    render(<FiltersBuilder fields={FIELDS} defaultQuery={threeRules()} />);
    openMenu(/How these conditions combine/);
    // Plain `menuitem` marked neither option as the one in effect.
    const items = screen.getAllByRole('menuitemradio');
    expect(items.map((i) => i.getAttribute('aria-checked'))).toEqual(['true', 'false']);
  });

  it('labels the first row "Where" and repeats the word as inert text after', () => {
    render(<FiltersBuilder fields={FIELDS} defaultQuery={threeRules()} />);
    expect(screen.getByText('Where')).toBeInTheDocument();

    // Three rows produce two "And"s: the row-2 control, and row 3 as text.
    const ands = screen.getAllByText('And');
    expect(ands).toHaveLength(2);
    // The repeat is hidden from screen readers — the group's own label already
    // says "All of the following", so hearing "And" per row is noise.
    const repeats = ands.filter((el) => el.getAttribute('aria-hidden') === 'true');
    expect(repeats).toHaveLength(1);
  });

  it('switching it changes the whole group at once', () => {
    const onQueryChange = vi.fn();
    render(
      <FiltersBuilder fields={FIELDS} defaultQuery={threeRules()} onQueryChange={onQueryChange} />
    );
    openMenu(/How these conditions combine/);
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Or' }));

    const [query, meta] = onQueryChange.mock.calls.at(-1)!;
    expect(meta.reason).toBe('combinator');
    expect((query as FilterQuery).combinator).toBe('or');
  });
});

describe('nesting is bounded, and the bound is stated (§22)', () => {
  it('disables Add group at the limit and says why', () => {
    render(<FiltersBuilder fields={FIELDS} maxDepth={1} />);
    const addGroup = screen.getByRole('button', { name: 'Add group' });
    expect(addGroup).toBeDisabled();
    // A disabled control with no reason reads as broken, not as bounded.
    expect(screen.getByText('Groups cannot be nested any deeper.')).toBeInTheDocument();
  });

  it('allows it below the limit', () => {
    render(<FiltersBuilder fields={FIELDS} maxDepth={3} />);
    expect(screen.getByRole('button', { name: 'Add group' })).toBeEnabled();
  });

  it('adds an OR group, because a nested AND inside AND would mean nothing new', () => {
    const onQueryChange = vi.fn();
    render(<FiltersBuilder fields={FIELDS} onQueryChange={onQueryChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add group' }));

    const [query, meta] = onQueryChange.mock.calls.at(-1)!;
    expect(meta.reason).toBe('group-add');
    expect((query as FilterQuery).rules[0]).toMatchObject({ type: 'group', combinator: 'or' });
  });
});

describe('ungroup is offered only where it cannot change meaning (§24)', () => {
  it('is hidden for an OR group inside an AND parent', () => {
    render(<FiltersBuilder fields={FIELDS} defaultQuery={nested()} />);
    openMenu('Group actions');
    // Lifting (B OR C) into an AND parent yields B AND C — a different query.
    expect(screen.queryByRole('menuitem', { name: 'Ungroup' })).toBeNull();
    expect(screen.getByRole('menuitem', { name: 'Remove group' })).toBeInTheDocument();
  });

  it('is offered when the combinators match', () => {
    render(
      <FiltersBuilder
        fields={FIELDS}
        defaultQuery={createFilterQuery([
          rule(['status'], 'is', 'active'),
          createFilterGroup('and', [rule(['tiv'], 'gt', 1), rule(['tiv'], 'lt', 9)]),
        ])}
      />
    );
    openMenu('Group actions');
    expect(screen.getByRole('menuitem', { name: 'Ungroup' })).toBeInTheDocument();
  });
});

describe('building a group from an existing condition (§22)', () => {
  it('wraps the rule without making the user retype it', () => {
    const onQueryChange = vi.fn();
    render(
      <FiltersBuilder
        fields={FIELDS}
        defaultQuery={createFilterQuery([rule(['status'], 'is', 'active')])}
        onQueryChange={onQueryChange}
      />
    );
    openMenu(/More actions/);
    fireEvent.click(screen.getByRole('menuitem', { name: 'Group with another condition' }));

    const [query] = onQueryChange.mock.calls.at(-1)!;
    const group = (query as FilterQuery).rules[0];
    expect(group).toMatchObject({ type: 'group', combinator: 'or' });
    // The operator and value survived the move.
    expect((group as { rules: unknown[] }).rules[0]).toMatchObject({
      path: ['status'],
      operator: 'is',
      value: 'active',
    });
  });
});

describe('a group being built survives an unrelated removal', () => {
  it('does not silently delete an empty group when another rule goes', () => {
    const onQueryChange = vi.fn();
    const empty = createFilterGroup('or', []);
    render(
      <FiltersBuilder
        fields={FIELDS}
        defaultQuery={createFilterQuery([rule(['status'], 'is', 'active'), empty])}
        onQueryChange={onQueryChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Remove Status filter' }));

    const [query] = onQueryChange.mock.calls.at(-1)!;
    // Pruning EVERY empty group would destroy the group the user just made
    // and had not filled in yet.
    expect((query as FilterQuery).rules).toHaveLength(1);
    expect((query as FilterQuery).rules[0].id).toBe(empty.id);
  });
});

describe('read-only (§39)', () => {
  it('shows the structure and no mutation controls', () => {
    render(<FiltersBuilder fields={FIELDS} readOnly defaultQuery={nested()} />);
    expect(screen.getByRole('group', { name: 'Any of the following' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add condition' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Add group' })).toBeNull();
    expect(screen.queryByRole('button', { name: /How these conditions combine/ })).toBeNull();
  });
});

describe('the count is conditions, not nodes (§25)', () => {
  it('reports 3 for A AND (B OR C)', () => {
    render(<FiltersBuilder fields={FIELDS} defaultQuery={nested()} />);
    // The group is structure, not a filter the user set.
    expect(screen.getByText('3 conditions')).toBeInTheDocument();
  });
});

describe('focus never falls to the document body', () => {
  it('restores focus after removing a rule', async () => {
    render(
      <FiltersBuilder
        fields={FIELDS}
        defaultQuery={createFilterQuery([rule(['status'], 'is', 'Active')])}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Remove Status filter' }));
    // The builder restored nothing, so a keyboard user restarted from the top
    // of the document and a screen-reader user was dropped out entirely.
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Add condition' })).toHaveFocus()
    );
  });

  it('restores focus after Clear all', async () => {
    render(
      <FiltersBuilder
        fields={FIELDS}
        defaultQuery={createFilterQuery([rule(['status'], 'is', 'Active')])}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Add condition' })).toHaveFocus()
    );
  });

  it('names its region with a role that can carry a label', () => {
    render(<FiltersBuilder fields={FIELDS} />);
    expect(screen.getByRole('search', { name: 'Advanced filters' })).toBeInTheDocument();
  });
});
