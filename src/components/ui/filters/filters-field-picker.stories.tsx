import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { FiltersFieldPicker } from './filters-field-picker';
import type { FilterField } from './filters-schema';

const meta: Meta<typeof FiltersFieldPicker> = {
  title: 'Components/Filters Field Picker',
  component: FiltersFieldPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Choosing a field — two modes in one surface, because a schema can be four fields or',
          'four hundred.',
          '',
          '**Browse** drills through the tree a level at a time. **Typing switches to search**,',
          'which returns deeply nested matches without the user having to know that Flood lives',
          'under Risk › CAT.',
          '',
          '**Keyboard is the primary interaction, not an afterthought** (§47.1): arrows move,',
          'Right enters a branch, Left returns to the parent, Enter selects. Escape backs out one',
          'level before closing — handled through a `handleEscape` handle the surrounding popover',
          'consults, because Radix listens for Escape on `document` and a React handler cannot',
          'veto a dismiss on its own.',
          '',
          'Rendered bare here. In use it sits inside a Popover, which is why none of these states',
          'were reviewable before.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

const FIELDS: FilterField[] = [
  { id: 'status', label: 'Status', type: 'select' },
  { id: 'premium', label: 'Premium', type: 'number', unit: 'currency' },
  { id: 'bound', label: 'Bound', type: 'boolean' },
  { id: 'renewal', label: 'Renewal date', type: 'date' },
  {
    id: 'location',
    label: 'Location',
    type: 'select',
    fields: [
      { id: 'country', label: 'Country', type: 'select' },
      { id: 'city', label: 'City', type: 'text' },
      { id: 'postcode', label: 'Postcode', type: 'text' },
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
          { id: 'quake', label: 'Earthquake', type: 'number' },
        ],
      },
      { id: 'casualty', label: 'Casualty', type: 'number' },
    ],
  },
  { id: 'tiv', label: 'Total insured value', type: 'number', unit: 'currency', aliases: ['TIV'] },
  { id: 'legacy', label: 'Legacy code', type: 'text', disabled: true },
  { id: 'internal', label: 'Internal score', type: 'number', hidden: true },
];

function Framed({ fields = FIELDS }: { fields?: FilterField[] }) {
  const [picked, setPicked] = React.useState<string[] | null>(null);
  return (
    <div className="flex flex-col gap-3">
      <div className="w-fit rounded-lg border p-2">
        <FiltersFieldPicker fields={fields} onSelect={setPicked} />
      </div>
      <p className="text-sm text-muted-foreground" data-testid="picked">
        {picked ? `Selected: ${picked.join(' › ')}` : 'Nothing selected yet'}
      </p>
    </div>
  );
}

/**
 * Browsing. `Legacy code` is disabled and shown; `Internal score` is hidden
 * and absent entirely — a withdrawn field should not be advertised.
 */
export const Browse: StoryObj = {
  render: () => <Framed />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('option', { name: 'Internal score' })).toBeNull();
    await expect(canvas.getByRole('option', { name: 'Legacy code' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  },
};

/**
 * **Search reaches three levels down.** Typing "flood" finds it without the
 * user knowing it lives under Risk › CAT, and the ancestors are shown so three
 * branches each holding an "Amount" stay distinguishable.
 */
export const DeepSearch: StoryObj = {
  render: () => <Framed />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('combobox'), 'flood');
    const hit = await canvas.findByRole('option', { name: /Flood/ });
    await expect(hit).toHaveTextContent('Risk');
  },
};

/** An alias finds a field whose label contains no such word. */
export const SearchByAlias: StoryObj = {
  render: () => <Framed />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('combobox'), 'TIV');
    await expect(await canvas.findByRole('option', { name: /Total insured value/ })).toBeInTheDocument();
  },
};

/** Drilled in by keyboard, with the breadcrumb showing where you are. */
export const DrilledIn: StoryObj = {
  render: () => <Framed />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    input.focus();
    // Right enters a branch; five downs lands on Location.
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowRight}');
    await expect(await canvas.findByRole('option', { name: 'Postcode' })).toBeInTheDocument();
  },
};

/** Nothing matched — said plainly, rather than an empty box. */
export const NoMatches: StoryObj = {
  render: () => <Framed />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('combobox'), 'zzzz');
    await expect(await canvas.findByText(/No filters found/)).toBeInTheDocument();
  },
};

/** A schema small enough that search would be ceremony. */
export const SmallSchema: StoryObj = {
  render: () => (
    <Framed
      fields={[
        { id: 'status', label: 'Status', type: 'select' },
        { id: 'premium', label: 'Premium', type: 'number' },
      ]}
    />
  ),
};
