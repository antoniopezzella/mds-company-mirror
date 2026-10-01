import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { DataGridCellEditor } from './data-grid-cell-edit';
import { Stack } from './stack';

/**
 * The in-cell editor used by DataGrid's spreadsheet mode.
 *
 * Deliberately dumb: it holds draft text and reports it. Parsing, validation
 * and "is this actually a change?" all belong to the caller, which is the only
 * thing that knows the column's type.
 *
 * Only `text` and `textarea` exist, matching the `cellEdit.control` contract.
 * A number or date column does not need a different *control* — it needs a
 * different *parse* on commit, which is the caller's job.
 *
 * Exported so a consumer can build a custom grid cell with the same keyboard
 * contract. Inside `DataGrid` you never render it directly.
 */
const meta: Meta<typeof DataGridCellEditor> = {
  title: 'Components/DataGrid/CellEditor',
  component: DataGridCellEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'The editor that appears inside a grid cell in spreadsheet mode.',
          '',
          '**The keyboard contract is the whole point:** Enter commits, Escape cancels and',
          'restores, and neither key is allowed to reach the grid behind it — otherwise Enter',
          'would also move the cursor down and Escape would clear the selection.',
          '',
          'It stores draft text only. `onCommit` hands you the raw string; parsing a number,',
          'a date or a currency is yours, because only you know the column.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    value: {
      description: 'The committed value the editor opens with. It is copied into a draft, not mutated.',
      control: 'text',
    },
    control: {
      description: '`text` for a single line, `textarea` for multi-line. There is no number or date control by design — see the note above.',
      control: 'inline-radio',
      options: ['text', 'textarea'],
      table: { defaultValue: { summary: 'text' } },
    },
    ariaLabel: {
      description:
        'Required. The editor is a bare input inside a cell, so without this a screen reader announces an unnamed textbox. Name it for the row AND column ("Premium for Commercial Auto").',
      control: 'text',
    },
    onCommit: {
      description: 'Fired with the RAW draft string on Enter or blur. Parse and validate here.',
      table: { type: { summary: '(raw: string) => void' } },
      action: 'commit',
    },
    onCancel: {
      description: 'Fired on Escape. The caller restores the previous value.',
      table: { type: { summary: '() => void' } },
      action: 'cancel',
    },
    invalid: {
      description:
        'Marks the draft as failing validation. The caller decides what invalid means and keeps the editor open.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DataGridCellEditor>;

/** A caller, since the editor reports rather than stores. */
function Host({
  initial = '12400',
  control = 'text' as 'text' | 'textarea',
  invalid = false,
}) {
  const [committed, setCommitted] = React.useState(initial);
  const [editing, setEditing] = React.useState(true);
  return (
    <Stack gap={3}>
      {editing ? (
        <DataGridCellEditor
          value={committed}
          control={control}
          invalid={invalid}
          ariaLabel="Premium for Commercial Auto"
          onCommit={(raw) => {
            setCommitted(raw);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <button type="button" onClick={() => setEditing(true)}>
          {committed} (click to edit again)
        </button>
      )}
      <p className="text-sm" data-testid="committed">
        committed: {committed}
      </p>
    </Stack>
  );
}

/** Single-line. Enter commits. */
export const Text: Story = {
  render: () => <Host />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Enter commits the draft to the caller', async () => {
      const input = canvas.getByRole('textbox', { name: 'Premium for Commercial Auto' });
      await userEvent.clear(input);
      await userEvent.type(input, '15900{Enter}');
      await expect(canvas.getByTestId('committed')).toHaveTextContent('committed: 15900');
    });
  },
};

/** Escape restores — the draft is discarded, not committed. */
export const CancelOnEscape: Story = {
  name: 'Escape cancels',
  render: () => <Host />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('typing then Escape leaves the committed value untouched', async () => {
      const input = canvas.getByRole('textbox', { name: 'Premium for Commercial Auto' });
      await userEvent.clear(input);
      await userEvent.type(input, '99999');
      await userEvent.keyboard('{Escape}');
      // The value the caller holds never changed — that is the contract.
      await expect(canvas.getByTestId('committed')).toHaveTextContent('committed: 12400');
    });
  },
};

/** Multi-line, for a notes column. */
export const Textarea: Story = {
  render: () => <Host initial={'Renewal pending\nawaiting broker'} control="textarea" />,
};

/** `invalid` marks the draft without closing the editor. */
export const Invalid: Story = {
  render: () => <Host initial="not-a-number" invalid />,
};
