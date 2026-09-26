import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

import { FilterBoolean, FilterNumberRange } from './filter-controls';
import { FilterChipMenu, FilterChipSet } from './filter-chip';
import { Badge } from './badge';
import { Button } from './button';
import { DataTable } from './data-table';
import { Stack } from './stack';
import { collectApplied, type FilterField } from './filter-schema';
import { formatCurrency } from '@/lib/format';
import type { DataGridColumnDef } from './data-grid-features';

const meta: Meta = {
  title: 'Components/Filter controls',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'The two filter controls the system was missing: **number range** and **boolean**.',
          '',
          '`inNumberRange` had been registered on the grid the whole time with no UI able to',
          'produce a value for it, and every product that needed a yes/no filter invented its own',
          'two-option select.',
          '',
          'Both are driven by a [`FilterField`](/docs/foundations-choosing-a-table--docs) from the',
          'filter schema, so the control, the chip label and the row matcher cannot disagree.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

interface Policy {
  id: number;
  name: string;
  status: string;
  premium: number;
  bound: boolean;
}

const policies: Policy[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active', premium: 12400, bound: true },
  { id: 2, name: 'General Liability', status: 'Active', premium: 8200, bound: true },
  { id: 3, name: 'Cyber Liability', status: 'Pending', premium: 15900, bound: false },
  { id: 4, name: 'Property', status: 'Active', premium: 22000, bound: true },
  { id: 5, name: 'Workers Comp', status: 'Expired', premium: 9600, bound: false },
  { id: 6, name: 'Marine Cargo', status: 'Pending', premium: 4100, bound: false },
];

const FIELDS: FilterField[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'multi',
    options: [
      { value: 'Active', label: 'Active', count: 3 },
      { value: 'Pending', label: 'Pending', count: 2 },
      { value: 'Expired', label: 'Expired', count: 1 },
    ],
  },
  { id: 'premium', label: 'Premium', type: 'numberRange', unit: 'currency' },
  { id: 'bound', label: 'Bound', type: 'boolean', trueLabel: 'Bound', falseLabel: 'Unbound' },
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
    // decimals: 0 — whole premiums, so a column of ".00" is noise in a
    // scan-heavy table. Precision stays available where it matters (§48).
    cell: ({ getValue }) => formatCurrency(getValue<number>(), { decimals: 0 }),
  },
  {
    accessorKey: 'bound',
    header: 'Bound',
    meta: { type: 'boolean' },
    cell: ({ getValue }) => (getValue<boolean>() ? 'Yes' : 'No'),
  },
];

export const NumberRange: StoryObj = {
  render: function Render() {
    const [value, setValue] = React.useState<{ min?: number; max?: number } | undefined>();
    return (
      <Stack gap={3}>
        <FilterNumberRange
          field={FIELDS[1] as Extract<FilterField, { type: 'numberRange' }>}
          value={value}
          onValueChange={setValue}
        />
        <p className="text-sm text-muted-foreground" data-testid="value">
          {value ? JSON.stringify(value) : 'No range applied'}
        </p>
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('the unit is in the label, not only a placeholder', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Premium' }));
      // `screen`, not `canvas`: the popover is portalled to document.body, so
      // it is outside canvasElement entirely. A placeholder would also
      // disappear the moment the user types, taking the only statement of
      // what the number means with it — hence a real label.
      await expect(await screen.findByLabelText('Minimum Premium')).toBeInTheDocument();
    });
    await step('leave the UI at rest', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(screen.queryByLabelText('Minimum Premium')).toBeNull());
    });
  },
};

export const Boolean_: StoryObj = {
  name: 'Boolean (tri-state)',
  render: function Render() {
    const [value, setValue] = React.useState<boolean | undefined>();
    return (
      <Stack gap={3}>
        <FilterBoolean
          field={FIELDS[2] as Extract<FilterField, { type: 'boolean' }>}
          value={value}
          onValueChange={setValue}
        />
        <p className="text-sm text-muted-foreground">
          {value === undefined ? 'Any' : value ? 'Bound only' : 'Unbound only'}
        </p>
        <p className="max-w-prose text-sm text-muted-foreground">
          Three states, not two. A toggle that only turns <em>on</em> cannot ask for the
          rows where the value is <code>false</code> — and “show unbound policies” is a
          real question. <code>undefined</code> is not the same as <code>false</code>.
        </p>
      </Stack>
    );
  },
};

/**
 * **The whole filter row, driving a real table.**
 *
 * One `FilterField[]` produces the controls, the applied-filter summary and the
 * row matching — so the chip that says “Premium: over $10,000” and the rows you
 * are looking at cannot disagree.
 *
 * Note the summary line: chips tell you *what* is filtered, a count tells you
 * whether it did anything.
 */
export const WithATable: StoryObj = {
  render: function Render() {
    const [values, setValues] = React.useState<Record<string, unknown>>({});
    const set = (id: string, v: unknown) => setValues((prev) => ({ ...prev, [id]: v }));

    const applied = collectApplied(FIELDS, values);

    const rows = policies.filter((p) => {
      const status = values.status as string[] | undefined;
      if (status?.length && !status.includes(p.status)) return false;
      const premium = values.premium as { min?: number; max?: number } | undefined;
      if (premium?.min !== undefined && p.premium < premium.min) return false;
      if (premium?.max !== undefined && p.premium > premium.max) return false;
      if (values.bound !== undefined && p.bound !== values.bound) return false;
      return true;
    });

    return (
      <Stack gap={4}>
        <FilterChipSet label="Filter policies">
          <FilterChipMenu
            label="Status"
            value={(values.status as string[]) ?? []}
            onValueChange={(v) => set('status', v)}
            options={(FIELDS[0] as Extract<FilterField, { type: 'multi' }>).options}
          />
          <FilterNumberRange
            field={FIELDS[1] as Extract<FilterField, { type: 'numberRange' }>}
            value={values.premium as { min?: number; max?: number } | undefined}
            onValueChange={(v) => set('premium', v)}
          />
          <FilterBoolean
            field={FIELDS[2] as Extract<FilterField, { type: 'boolean' }>}
            value={values.bound as boolean | undefined}
            onValueChange={(v) => set('bound', v)}
          />
        </FilterChipSet>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span data-testid="summary">
            {applied.length === 0 ? (
              <>Showing all <strong>{policies.length}</strong> policies</>
            ) : (
              <>
                <strong>{rows.length}</strong> of {policies.length} policies —{' '}
                {applied.map((a) => `${a.field.label}: ${a.description}`).join(' · ')}
              </>
            )}
          </span>
          {applied.length > 0 && (
            <Button variant="tertiary" size="sm" onClick={() => setValues({})}>
              Clear all
            </Button>
          )}
        </div>

        <DataTable columns={columns} data={rows} pageSize={6} pinFirstColumn={false} />
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('the summary counts, it does not only list', async () => {
      await expect(canvas.getByTestId('summary')).toHaveTextContent('Showing all 6 policies');
    });
    await step('a boolean filter can ask for the FALSE rows', async () => {
      const { screen } = await import('storybook/test');
      // Scoped: the table's own "Bound" column header is a button too.
      const bar = canvas.getByRole('toolbar', { name: 'Filter policies' });
      await userEvent.click(within(bar).getByRole('button', { name: 'Bound' }));
      await userEvent.click(await screen.findByRole('menuitemradio', { name: 'Unbound' }));
      await expect(canvas.getByTestId('summary')).toHaveTextContent('3 of 6 policies');
      await expect(canvas.getByTestId('summary')).toHaveTextContent('Bound: Unbound');
    });
    await step('leave the UI at rest', async () => {
      // axe runs after the play function. While a Radix menu is open it marks
      // the rest of the page aria-hidden, and hidden content containing
      // focusable buttons is an aria-hidden-focus violation — a true
      // statement about a transient state, not a defect in the page. Waiting
      // for the overlay to clear is the play function's job.
      await waitFor(() =>
        expect(canvas.getByRole('toolbar', { name: 'Filter policies' })).not.toHaveAttribute('aria-hidden')
      );
    });
  },
};
