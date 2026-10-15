import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { FilterFieldControl } from './filter-field-control';
import type { FilterField } from './filter-schema';
import { Stack } from './stack';

/**
 * One `FilterField` definition in, the right control out.
 *
 * This is the piece that lets a filter be defined **once**. Before it, the two
 * filter systems each decided independently which control a field got:
 * `DataGridToolbar` took `facetedFilters` and `dateFilters` as separate props
 * keyed by column id, and `FilterBar` took hand-placed children. Adding a field
 * meant editing both, in different shapes, and neither could tell you what the
 * complete filter set was.
 *
 * It is deliberately dumb: it holds **no state** and knows nothing about
 * tables. The caller owns the value and decides what a change means — a local
 * `setState`, a column filter, a server query, a URL parameter. That is what
 * makes one definition usable in all four places.
 *
 * ### Choosing between this and `components/ui/filters`
 *
 * This is a **value model**: a field and a value, with no operator. It cannot
 * express "is not", "is any of" or "between", and cannot represent
 * `A AND (B OR C)` at all. Reach for the query system in
 * `components/ui/filters` when you need operators or a nested tree — that is
 * also what lets it serialise to a URL.
 */
const meta: Meta<typeof FilterFieldControl> = {
  title: 'Components/FilterFieldControl',
  component: FilterFieldControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Renders the correct control for a `FilterField` definition — text input, single select,',
          'multi-select, date range, number range or boolean — so a filter is described once and',
          'reused by `DataGridToolbar`, `DataTable`, `FilterBar` and any hand-built toolbar.',
          '',
          '**Stateless by design.** It never stores the value; `value` in, `onValueChange` out.',
          'Every story below owns its own `useState`, which is exactly what a consumer does.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    field: {
      description:
        'The filter definition. Its `type` alone decides which control renders — there is no separate "control" prop to keep in sync.',
      table: { type: { summary: 'FilterField' } },
    },
    value: {
      description:
        'The current value, owned by the caller. Shape follows the field type: `string` for text/select, `string[]` for multi, `{from,to}` for dateRange, `{min,max}` for numberRange, `boolean` for boolean.',
      table: { type: { summary: 'unknown' } },
    },
    onValueChange: {
      description: 'Fired with the next value. The caller decides what it means.',
      table: { type: { summary: '(value: unknown) => void' } },
      action: 'valueChange',
    },
    size: {
      description: 'Control height, shared with Button and Input (sm 32 / md 40 / lg 48).',
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      description: 'Disables the rendered control, whichever type it is.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;

const TEXT: FilterField = { id: 'policy', label: 'Policy number', type: 'text', placeholder: 'e.g. POL-4471' };
const SELECT: FilterField = {
  id: 'status',
  label: 'Status',
  type: 'select',
  options: [
    { value: 'active', label: 'Active', count: 128 },
    { value: 'pending', label: 'Pending', count: 12 },
    { value: 'expired', label: 'Expired', count: 4 },
  ],
};
const MULTI: FilterField = {
  id: 'line',
  label: 'Line of business',
  type: 'multi',
  options: [
    { value: 'property', label: 'Property' },
    { value: 'casualty', label: 'Casualty' },
    { value: 'marine', label: 'Marine' },
    { value: 'cyber', label: 'Cyber' },
  ],
};
const NUMBER: FilterField = { id: 'premium', label: 'Premium', type: 'numberRange', unit: 'currency' };
const BOOLEAN: FilterField = { id: 'renewal', label: 'Up for renewal', type: 'boolean' };
const DATE: FilterField = { id: 'inception', label: 'Inception date', type: 'dateRange' };

/** A controlled wrapper, because the control itself stores nothing. */
function Controlled({ field, initial, ...rest }: { field: FilterField; initial?: unknown; size?: 'sm' | 'md' | 'lg'; disabled?: boolean }) {
  const [value, setValue] = React.useState<unknown>(initial);
  return <FilterFieldControl field={field} value={value} onValueChange={setValue} {...rest} />;
}

type Story = StoryObj<typeof FilterFieldControl>;

/** The default: a text field. Type and the value flows back out to the caller. */
export const Text: Story = {
  render: () => <Controlled field={TEXT} initial="" />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('typing reaches the caller, which feeds it back as the value', async () => {
      const input = canvas.getByRole('textbox');
      await userEvent.type(input, 'POL-4471');
      // Proves the round trip: the control is stateless, so the only reason
      // this reads back is that the caller's state updated and re-rendered it.
      await expect(input).toHaveValue('POL-4471');
    });
  },
};

/** Single select. Counts render right-aligned when the option carries one. */
export const Select: Story = {
  render: () => <Controlled field={SELECT} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('the trigger is named by the field label', async () => {
      await expect(canvas.getByText(/Status/i)).toBeInTheDocument();
    });
  },
};

/** Multi-select. The value is a `string[]`, not a string. */
export const Multi: Story = {
  render: () => <Controlled field={MULTI} initial={['property']} />,
};

/** Number range. `unit: 'currency'` changes how the bounds read. */
export const NumberRange: Story = {
  render: () => <Controlled field={NUMBER} initial={{}} />,
};

/** Boolean. A three-state toggle — true, false, or unset. */
export const Boolean: Story = {
  render: () => <Controlled field={BOOLEAN} />,
};

/** Date range. The value serialises as `{ from, to }` ISO strings. */
export const DateRangeField: Story = {
  name: 'Date range',
  render: () => <Controlled field={DATE} initial={{}} />,
};

/**
 * **Every type at once.** The point of the component: six different controls
 * from six definitions, with no `switch` at the call site.
 */
export const AllTypes: Story = {
  render: () => (
    <Stack gap={4}>
      {[TEXT, SELECT, MULTI, NUMBER, BOOLEAN, DATE].map((field) => (
        <Controlled key={field.id} field={field} initial={field.type === 'multi' ? [] : undefined} />
      ))}
    </Stack>
  ),
};

/** The shared control scale — the same sm/md/lg as Button and Input. */
export const Sizes: Story = {
  render: () => (
    <Stack gap={4}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Controlled key={size} field={SELECT} size={size} />
      ))}
    </Stack>
  ),
};

/** Disabled propagates to whichever control the field type produced. */
export const Disabled: Story = {
  render: () => (
    <Stack gap={4}>
      <Controlled field={TEXT} initial="POL-4471" disabled />
      <Controlled field={SELECT} initial="active" disabled />
    </Stack>
  ),
};
