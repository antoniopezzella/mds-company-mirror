import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

import { Filters } from './filters';
import { createFilterGroup, createFilterQuery, createFilterRule } from './filters-query';
import { applyFilterQuery } from './adapters/predicate';
import type { FilterField } from './filters-schema';
import type { FilterQuery } from './filters-types';
import { DataTable } from '../data-table';
import { Badge } from '../badge';
import { Stack } from '../stack';
import { formatCurrency } from '@/lib/format';
import type { DataGridColumnDef } from '../data-grid-features';

const meta: Meta<typeof Filters> = {
  title: 'Components/Filters',
  component: Filters,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A **query system**, with the filter bar as one presentation of it.',
          '',
          'Each condition is `FIELD → OPERATOR → VALUE`, rendered as a **segmented button group**',
          'where every segment is independently editable — not a pill. That is what lets a filter',
          'say "is not", "is any of" or "between"; a single chip reading `Status: Active` hides the',
          'operator behind a colon and cannot express any of them.',
          '',
          'The empty state is one `+ Add filter` control and nothing else.',
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
  { id: 'bound', label: 'Bound', type: 'boolean', trueLabel: 'Bound', falseLabel: 'Unbound' },
  { id: 'renewal', label: 'Renewal date', type: 'date' },
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
  {
    id: 'risk',
    label: 'Risk',
    type: 'select',
    fields: [
      {
        id: 'cat',
        label: 'CAT',
        type: 'select',
        fields: [
          { id: 'flood', label: 'Flood', type: 'number' },
          { id: 'wind', label: 'Wind', type: 'number' },
        ],
      },
      { id: 'casualty', label: 'Casualty', type: 'number' },
    ],
  },
  { id: 'tiv', label: 'Total insured value', type: 'number', unit: 'currency', aliases: ['TIV'] },
];

/** The empty state: one control (§51). */
export const Default: StoryObj = {
  render: () => <Filters fields={FIELDS} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: /Add filter/ })).toBeInTheDocument();
    await expect(canvas.queryByRole('group')).toBeNull();
  },
};

/**
 * Each condition is four joined segments. Click the field to change the field,
 * the operator to change the operator, the value to change the value.
 */
export const SegmentedConditions: StoryObj = {
  render: () => (
    <Filters
      fields={FIELDS}
      defaultQuery={createFilterQuery([
        createFilterRule(['status'], { operator: 'is', value: 'Active' }),
        createFilterRule(['premium'], { operator: 'gt', value: 10000 }),
        createFilterRule(['risk', 'cat', 'flood'], { operator: 'between', value: { min: 20, max: 80 } }),
        createFilterRule(['bound'], { operator: 'is', value: false }),
      ])}
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('every segment is its own control', async () => {
      const group = canvas.getAllByRole('group')[0];
      await expect(within(group).getByRole('button', { name: 'Field: Status' })).toBeInTheDocument();
      await expect(within(group).getByRole('button', { name: 'Condition: is' })).toBeInTheDocument();
      await expect(within(group).getByRole('button', { name: 'Value: Active' })).toBeInTheDocument();
    });
    await step('a nested field reads as its full path', async () => {
      // Exact name: the remove control also contains the path.
      await expect(
        canvas.getByRole('button', { name: 'Field: Risk › CAT › Flood' })
      ).toBeInTheDocument();
    });
  },
};

/** A value-less operator renders no value segment at all (§9). */
export const ValuelessOperator: StoryObj = {
  render: () => (
    <Filters
      fields={FIELDS}
      defaultQuery={createFilterQuery([createFilterRule(['tiv'], { operator: 'is_empty' })])}
    />
  ),
};

/** Drafts stay visible and editable, and are never styled as errors (§13). */
export const IncompleteRule: StoryObj = {
  render: () => (
    <Filters
      fields={FIELDS}
      defaultQuery={createFilterQuery([
        createFilterRule(['status'], { operator: 'is', value: 'Active' }),
        createFilterRule(['premium']),
      ])}
    />
  ),
};

/**
 * **The critical semantic guard (§24).** `A AND (B OR C)` shown as a flat row
 * reads as `A AND B AND C` — a different query. Rather than flatten and lie,
 * the bar says so and leaves editing to the advanced builder.
 */
export const ComplexQueryIsNotFlattened: StoryObj = {
  render: () => (
    <Filters
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
};

export const ReadOnly: StoryObj = {
  render: () => (
    <Filters
      fields={FIELDS}
      readOnly
      defaultQuery={createFilterQuery([
        createFilterRule(['status'], { operator: 'is', value: 'Active' }),
      ])}
    />
  ),
};

interface Policy {
  id: number;
  name: string;
  status: string;
  premium: number;
  bound: boolean;
  location: { country: string; city: string };
}
const policies: Policy[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active', premium: 12400, bound: true, location: { country: 'BR', city: 'Rio' } },
  { id: 2, name: 'General Liability', status: 'Active', premium: 8200, bound: true, location: { country: 'US', city: 'Boise' } },
  { id: 3, name: 'Cyber Liability', status: 'Pending', premium: 15900, bound: false, location: { country: 'MX', city: 'Leon' } },
  { id: 4, name: 'Property', status: 'Active', premium: 22000, bound: true, location: { country: 'BR', city: 'Recife' } },
  { id: 5, name: 'Workers Comp', status: 'Expired', premium: 9600, bound: false, location: { country: 'US', city: 'Reno' } },
];

const columns: DataGridColumnDef<Policy>[] = [
  { accessorKey: 'name', header: 'Policy' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const v = getValue<string>();
      return (
        <Badge tone={v === 'Active' ? 'success' : v === 'Expired' ? 'danger' : 'warning'} size="sm">
          {v}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'premium',
    header: 'Premium',
    meta: { type: 'currency' },
    cell: ({ getValue }) => formatCurrency(getValue<number>(), { decimals: 0 }),
  },
  { id: 'country', accessorFn: (r) => r.location.country, header: 'Country' },
];

/**
 * **The whole point.** One query drives the bar and the rows, through the
 * pure predicate adapter (§31) — the visual layer never sees the data.
 */
export const WithADataTable: StoryObj = {
  render: function Render() {
    const [query, setQuery] = React.useState<FilterQuery>(() => createFilterQuery());
    const rows = applyFilterQuery(policies, query, FIELDS);
    return (
      <Stack gap={4}>
        <Filters fields={FIELDS} query={query} onQueryChange={(q) => setQuery(q)} />
        <p className="text-sm text-muted-foreground" data-testid="count">
          {rows.length} of {policies.length} policies
        </p>
        <DataTable columns={columns} data={rows} pageSize={5} pinFirstColumn={false} />
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('starts unfiltered', async () => {
      await expect(canvas.getByTestId('count')).toHaveTextContent('5 of 5 policies');
    });
    await step('add a filter, and the rows follow', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /Add filter/ }));
      await userEvent.click(await screen.findByRole('option', { name: 'Status' }));
      await waitFor(() => expect(canvas.getByRole('group')).toBeInTheDocument());
    });
  },
};
