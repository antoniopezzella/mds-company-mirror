import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { FiltersValueEditor } from './filters-value-editor';
import { findOperator } from './filters-operators';
import { Stack } from './../stack';
import type { FilterField } from './filters-schema';
import type { FilterValue } from './filters-types';

const meta: Meta<typeof FiltersValueEditor> = {
  title: 'Components/Filters Value Editor',
  component: FiltersValueEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'The third segment of a condition — the control a user actually types into.',
          '',
          'Which control renders is decided by the **field type and the operator together**, not',
          'the type alone: `is` on a select is one option, `is any of` is several, and `between`',
          'on a number is two bounds rather than one. That is why this cannot be a lookup table',
          'keyed on type.',
          '',
          'These states had no visual surface at all until now — the editor was reachable only',
          'by opening a popover inside another story, so its error and empty states were never',
          'reviewable.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

const money: FilterField = { id: 'premium', label: 'Premium', type: 'number', unit: 'currency' };
const city: FilterField = { id: 'city', label: 'City', type: 'text', placeholder: 'e.g. Rio' };
const renewal: FilterField = { id: 'renewal', label: 'Renewal', type: 'date' };
const bound: FilterField = {
  id: 'bound', label: 'Bound', type: 'boolean', trueLabel: 'Bound', falseLabel: 'Unbound',
};
const status: FilterField = {
  id: 'status',
  label: 'Status',
  type: 'select',
  options: [
    { value: 'A', label: 'Active' },
    { value: 'P', label: 'Pending' },
    { value: 'E', label: 'Expired' },
    { value: 'X', label: 'Cancelled', disabled: true },
  ],
};
const tags: FilterField = {
  id: 'tags',
  label: 'Tags',
  type: 'multiselect',
  options: ['Flood', 'Wind', 'Quake', 'Fire', 'Theft', 'Cyber', 'Marine', 'Aviation', 'Motor'].map(
    (t) => ({ value: t.toLowerCase(), label: t })
  ),
};

/** Renders one editor with live state, so the stories are interactive. */
function Live({ field, operator }: { field: FilterField; operator?: string }) {
  const [value, setValue] = React.useState<FilterValue | undefined>(undefined);
  return (
    <div className="w-fit rounded-lg border p-3">
      <FiltersValueEditor
        field={field}
        operator={operator ? findOperator(field.type, operator) : undefined}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

/** Free text. Commits on Apply, never per keystroke. */
export const Text: StoryObj = { render: () => <Live field={city} operator="is" /> };

/** The unit is stated, so "over 500000" cannot be read as anything else. */
export const Currency: StoryObj = { render: () => <Live field={money} operator="gt" /> };

/**
 * **Two bounds, not one** — chosen by the operator, not the type. Either bound
 * may be left blank.
 */
export const NumericRange: StoryObj = { render: () => <Live field={money} operator="between" /> };

/**
 * **§43 in practice.** A range whose maximum is below its minimum matches
 * nothing, and saying so beats returning an empty table with no explanation.
 */
export const RangeValidationError: StoryObj = {
  render: () => <Live field={money} operator="between" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox', { name: /Minimum/ }), '90');
    await userEvent.type(canvas.getByRole('textbox', { name: /Maximum/ }), '10');
    await userEvent.click(canvas.getByRole('button', { name: 'Apply' }));
    const alert = await canvas.findByRole('alert');
    await expect(alert).toHaveTextContent(/greater than or equal/i);
  },
};

/** Stored as `YYYY-MM-DD`, never a `Date` — a Date does not survive a URL. */
export const DateRange: StoryObj = { render: () => <Live field={renewal} operator="between" /> };

/** Domain words, not Yes and No. One tab stop; arrows move within it. */
export const Boolean: StoryObj = { render: () => <Live field={bound} operator="is" /> };

/** Single select closes on choose (§26). A disabled option is shown, not hidden. */
export const SingleSelect: StoryObj = { render: () => <Live field={status} operator="is" /> };

/** Multi-select stays open, so picking three values is not three reopens (§27). */
export const MultiSelect: StoryObj = { render: () => <Live field={status} operator="any_of" /> };

/** Past eight options a search box appears — below that it would be clutter. */
export const LongListWithSearch: StoryObj = {
  render: () => <Live field={tags} operator="contains_any" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox', { name: /Search Tags options/ })).toBeInTheDocument();
  },
};

/** Every control side by side, for comparing density and alignment. */
export const AllControls: StoryObj = {
  render: () => (
    <Stack gap={4}>
      <Live field={city} operator="is" />
      <Live field={money} operator="between" />
      <Live field={status} operator="any_of" />
      <Live field={bound} operator="is" />
    </Stack>
  ),
};
