import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Filters } from './filters';
import { FiltersBuilder } from './filters-builder';
import { createFilterGroup, createFilterQuery, createFilterRule } from './filters-query';
import { applyFilterQuery } from './adapters/predicate';
import type { FilterField } from './filters-schema';
import type { FilterQuery } from './filters-types';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { Stack } from '../stack';

const meta: Meta<typeof FiltersBuilder> = {
  title: 'Components/Filters Builder',
  component: FiltersBuilder,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'The **advanced builder** — where the flat filter bar’s refusal lands.',
          '',
          'The bar declines to edit `A AND (B OR C)`, because three conditions in a row read as',
          '`A AND B AND C` — a different query. That refusal is only honest if somewhere can',
          'actually edit it. This is that somewhere, driving **the same query model**, not a second',
          'representation that has to be kept in sync.',
          '',
          '**The combinator belongs to the group, not to each row.** A per-row And/Or dropdown is the',
          'common design and it misrepresents this model: it invites setting row 2 to OR and row 3 to',
          'AND inside one group, which has no single meaning. So the control appears once, on the',
          'second row, where the relationship it describes first exists.',
          '',
          '**Nesting is bounded and the bound is visible.** Indentation runs out of room around four',
          'levels, so `Add group` disables at the limit and says why rather than silently no-oping.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

const FIELDS: FilterField[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Expired', label: 'Expired' },
    ],
  },
  { id: 'premium', label: 'Premium', type: 'number', unit: 'currency' },
  { id: 'tiv', label: 'Total insured value', type: 'number', unit: 'currency', aliases: ['TIV'] },
  { id: 'bound', label: 'Bound', type: 'boolean', trueLabel: 'Bound', falseLabel: 'Unbound' },
  {
    id: 'location',
    label: 'Location',
    type: 'select',
    fields: [
      {
        id: 'country',
        label: 'Country',
        type: 'select',
        options: [
          { value: 'BR', label: 'Brazil' },
          { value: 'MX', label: 'Mexico' },
          { value: 'US', label: 'United States' },
        ],
      },
      { id: 'city', label: 'City', type: 'text' },
    ],
  },
];

/** Nothing set yet: one condition control, one group control. */
export const Default: StoryObj = {
  render: () => <FiltersBuilder fields={FIELDS} />,
};

/**
 * **The query the flat bar cannot draw.** Active policies in Brazil *or*
 * Mexico — the OR is contained, and the containment is visible.
 */
export const NestedGroup: StoryObj = {
  render: () => (
    <FiltersBuilder
      fields={FIELDS}
      defaultQuery={createFilterQuery([
        createFilterRule(['status'], { operator: 'is', value: 'Active' }),
        createFilterGroup('or', [
          createFilterRule(['location', 'country'], { operator: 'is', value: 'BR' }),
          createFilterRule(['location', 'country'], { operator: 'is', value: 'MX' }),
        ]),
      ])}
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('the OR group is nested inside the AND root', async () => {
      const root = canvas.getByRole('group', { name: 'All of the following' });
      await expect(
        within(root).getByRole('group', { name: 'Any of the following' })
      ).toBeInTheDocument();
    });
    await step('the count is conditions, not nodes', async () => {
      await expect(canvas.getByText('3 conditions')).toBeInTheDocument();
    });
  },
};

/**
 * **The same query, both presentations.** The bar states what it cannot safely
 * edit and hands over; the builder edits it. One model underneath.
 */
export const TheRouteFromTheBar: StoryObj = {
  render: function Render() {
    const [advanced, setAdvanced] = React.useState(false);
    const [query, setQuery] = React.useState<FilterQuery>(() =>
      createFilterQuery([
        createFilterRule(['status'], { operator: 'is', value: 'Active' }),
        createFilterGroup('or', [
          createFilterRule(['premium'], { operator: 'gt', value: 20000 }),
          createFilterRule(['tiv'], { operator: 'lt', value: 500000 }),
        ]),
      ])
    );
    return (
      <Stack gap={4}>
        <Card>
          <CardHeader>
            <CardTitle>Filter bar</CardTitle>
          </CardHeader>
          <CardContent>
            <Filters
              fields={FIELDS}
              query={query}
              onQueryChange={setQuery}
              onEditAdvanced={() => setAdvanced(true)}
            />
          </CardContent>
        </Card>
        {advanced && (
          <Card>
            <CardHeader>
              <CardTitle>Advanced builder</CardTitle>
            </CardHeader>
            <CardContent>
              <FiltersBuilder fields={FIELDS} query={query} onQueryChange={setQuery} />
            </CardContent>
          </Card>
        )}
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('the bar refuses, and offers the route', async () => {
      await expect(canvas.getByText(/cannot be edited here/)).toBeInTheDocument();
      await userEvent.click(canvas.getByRole('button', { name: 'Edit in advanced builder' }));
    });
    await step('the builder edits the very same query', async () => {
      await expect(canvas.getByRole('group', { name: 'Any of the following' })).toBeInTheDocument();
    });
  },
};

/** Negation applies to the whole group: *not* (Brazil or Mexico). */
export const NegatedGroup: StoryObj = {
  render: () => (
    <FiltersBuilder
      fields={FIELDS}
      defaultQuery={createFilterQuery([
        createFilterRule(['status'], { operator: 'is', value: 'Active' }),
        {
          ...createFilterGroup('or', [
            createFilterRule(['location', 'country'], { operator: 'is', value: 'BR' }),
            createFilterRule(['location', 'country'], { operator: 'is', value: 'MX' }),
          ]),
          negated: true,
        },
      ])}
    />
  ),
};

/** At the limit, `Add group` is disabled and carries its reason. */
export const DepthLimitReached: StoryObj = {
  render: () => <FiltersBuilder fields={FIELDS} maxDepth={1} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Add group' })).toBeDisabled();
    await expect(canvas.getByText('Groups cannot be nested any deeper.')).toBeInTheDocument();
  },
};

/** The structure stays readable; every mutation control is gone (§39). */
export const ReadOnly: StoryObj = {
  render: () => (
    <FiltersBuilder
      fields={FIELDS}
      readOnly
      defaultQuery={createFilterQuery([
        createFilterRule(['status'], { operator: 'is', value: 'Active' }),
        createFilterGroup('or', [
          createFilterRule(['location', 'country'], { operator: 'is', value: 'BR' }),
          createFilterRule(['location', 'country'], { operator: 'is', value: 'MX' }),
        ]),
      ])}
    />
  ),
};

interface Policy {
  id: number;
  name: string;
  status: string;
  premium: number;
  location: { country: string; city: string };
}
const policies: Policy[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active', premium: 12400, location: { country: 'BR', city: 'Rio' } },
  { id: 2, name: 'General Liability', status: 'Active', premium: 8200, location: { country: 'US', city: 'Boise' } },
  { id: 3, name: 'Cyber Liability', status: 'Pending', premium: 15900, location: { country: 'MX', city: 'Leon' } },
  { id: 4, name: 'Property', status: 'Active', premium: 22000, location: { country: 'BR', city: 'Recife' } },
  { id: 5, name: 'Workers Comp', status: 'Expired', premium: 9600, location: { country: 'US', city: 'Reno' } },
];

/**
 * **Grouping changes the answer, and you can see it.** `Active AND (Brazil OR
 * Mexico)` matches three rows; the same three conditions flattened to all-AND
 * would match none, which is exactly why §24 refuses to flatten.
 */
export const GroupingChangesTheResult: StoryObj = {
  render: function Render() {
    const [query, setQuery] = React.useState<FilterQuery>(() =>
      createFilterQuery([
        createFilterRule(['status'], { operator: 'is', value: 'Active' }),
        createFilterGroup('or', [
          createFilterRule(['location', 'country'], { operator: 'is', value: 'BR' }),
          createFilterRule(['location', 'country'], { operator: 'is', value: 'MX' }),
        ]),
      ])
    );
    const rows = applyFilterQuery(policies, query, FIELDS);
    return (
      <Stack gap={4}>
        <FiltersBuilder fields={FIELDS} query={query} onQueryChange={setQuery} />
        <p className="text-sm text-muted-foreground" data-testid="count">
          {rows.length} of {policies.length} policies
        </p>
        <ul className="text-sm">
          {rows.map((r) => (
            <li key={r.id}>
              {r.name} — {r.location.country}
            </li>
          ))}
        </ul>
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Active AND (BR OR MX): rows 1 and 4 are Active+BR; row 3 is MX but
    // Pending, so it is correctly excluded.
    await expect(canvas.getByTestId('count')).toHaveTextContent('2 of 5 policies');
  },
};
