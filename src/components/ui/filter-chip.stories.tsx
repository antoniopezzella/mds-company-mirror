import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Briefcase, Globe } from 'lucide-react';

import { FilterChip, FilterChipSet } from './filter-chip';
import { Badge } from './badge';
import { Button } from './button';
import { Stack } from './stack';

const meta: Meta<typeof FilterChip> = {
  title: 'Components/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'A toggleable control that **filters content**. Selection is its whole purpose —',
          'anything without it is a [`Badge`](/docs/components-badge--docs).',
          '',
          'Material names four chip types and separates them by *purpose*, not appearance:',
          '**assist** (a contextual action), **filter** (filters content), **input** (something',
          'the person entered) and **suggestion** (a system-generated hint). Only filter chips',
          'carry selection state. Collapsing all four into one component is what led eight call',
          'sites in this repo to use a chip as a static label — each shipping a focusable',
          '`<button>` announced as a button with no action behind it.',
          '',
          '**Selection is carried by a checkmark and `aria-pressed`, never by colour alone.**',
          'Group chips in a `FilterChipSet` so the row costs one tab stop rather than one per chip.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    selected: { control: 'boolean', description: 'Whether the filter is applied. Drives the checkmark and `aria-pressed`.' },
    hasMenu: { control: 'boolean', description: 'Trailing chevron for a chip that opens a menu of values.' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterChip>;

const STATUSES = ['Active', 'Pending', 'Expired', 'Cancelled'] as const;

export const Default: Story = {
  args: { label: 'Active', selected: false },
};

/**
 * The canonical case: a row of filters over a dataset, with the applied count
 * and a way out. The whole row is **one tab stop** — arrows move between chips.
 */
export const FilterBar: StoryObj = {
  render: function Render() {
    const [applied, setApplied] = React.useState<string[]>(['Active']);
    const toggle = (s: string, on: boolean) =>
      setApplied((prev) => (on ? [...prev, s] : prev.filter((p) => p !== s)));

    return (
      <Stack gap={3}>
        <FilterChipSet label="Filter policies by status">
          {STATUSES.map((s) => (
            <FilterChip
              key={s}
              label={s}
              selected={applied.includes(s)}
              onSelectedChange={(on) => toggle(s, on)}
            />
          ))}
          <FilterChip label="Region: EMEA" hasMenu icon={<Globe />} />
        </FilterChipSet>
        <p className="text-sm text-muted-foreground">
          {applied.length === 0
            ? 'Showing all 128 policies'
            : `Showing policies matching ${applied.length} filter${applied.length === 1 ? '' : 's'}`}
        </p>
        {applied.length > 0 && (
          <div>
            <Button variant="tertiary" size="sm" onClick={() => setApplied([])}>
              Clear all
            </Button>
          </div>
        )}
      </Stack>
    );
  },
};

/**
 * Selection must survive without colour. A selected chip gains a **checkmark**
 * and `aria-pressed="true"`; the fill is reinforcement, not the signal.
 *
 * This is the story that would have caught the previous implementation, whose
 * selected state was a 2px inset ring — visually indistinguishable from focus,
 * and invisible to assistive technology.
 */
export const SelectionIsObvious: StoryObj = {
  render: () => (
    <Stack gap={4}>
      <div className="flex flex-wrap items-center gap-3">
        <FilterChip label="Unselected" selected={false} />
        <FilterChip label="Selected" selected />
        <FilterChip label="Unselected, icon" icon={<Briefcase />} />
        <FilterChip label="Selected, icon" icon={<Briefcase />} selected />
      </div>
      <p className="max-w-prose text-sm text-muted-foreground">
        The leading icon slot is shared: when a chip is selected the checkmark
        takes it, because the selection state matters more than the category
        icon and two leading glyphs read as clutter.
      </p>
    </Stack>
  ),
};

/** A chip that opens a menu of values rather than toggling on and off. */
export const WithValueMenu: StoryObj = {
  render: () => (
    <FilterChipSet label="Filter by attribute">
      <FilterChip label="Region: EMEA" hasMenu />
      <FilterChip label="Line: Property" hasMenu selected />
      <FilterChip label="Broker: Any" hasMenu />
    </FilterChipSet>
  ),
};

/**
 * The applied-filters row. The `×` is a **sibling** control, not nested —
 * interactive content cannot nest in HTML, and axe flags it as
 * `nested-interactive`.
 */
export const RemovableFilters: StoryObj = {
  render: function Render() {
    const [filters, setFilters] = React.useState([
      { id: 'r', label: 'Region: EMEA' },
      { id: 'l', label: 'Line: Property' },
      { id: 'p', label: 'Premium > $10k' },
    ]);
    return (
      <Stack gap={3}>
        <FilterChipSet label="Applied filters">
          {filters.map((f) => (
            <FilterChip
              key={f.id}
              label={f.label}
              selected
              onRemove={() => setFilters((prev) => prev.filter((p) => p.id !== f.id))}
            />
          ))}
        </FilterChipSet>
        {filters.length === 0 && <p className="text-sm text-muted-foreground">No filters applied.</p>}
      </Stack>
    );
  },
};

/** Every state, in the size scale this system uses. */
export const AllStates: StoryObj = {
  render: () => (
    <Stack gap={5}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Stack gap={2} key={size}>
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{size}</span>
          <div className="flex flex-wrap items-center gap-3">
            <FilterChip size={size} label="Enabled" />
            <FilterChip size={size} label="Selected" selected />
            <FilterChip size={size} label="With menu" hasMenu />
            <FilterChip size={size} label="Removable" selected onRemove={() => {}} />
            <FilterChip size={size} label="Disabled" disabled />
            <FilterChip size={size} label="Disabled selected" selected disabled />
          </div>
        </Stack>
      ))}
    </Stack>
  ),
};

/**
 * **FilterChip is not a Badge.** They look similar and mean opposite things.
 *
 * | | Badge | FilterChip |
 * | --- | --- | --- |
 * | element | `<span>` — never focusable | `<button>` with `aria-pressed` |
 * | job | states a fact | changes what you are looking at |
 * | user can act on it | no | yes |
 *
 * If it does not filter something, it is a Badge. This distinction is the
 * reason this component exists.
 */
export const NotABadge: StoryObj = {
  render: () => (
    <Stack gap={5}>
      <Stack gap={2}>
        <span className="text-sm font-medium">Badge — a fact about a row</span>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="success">Active</Badge>
          <Badge tone="warning">Pending</Badge>
          <Badge tone="danger">Expired</Badge>
        </div>
        <p className="max-w-prose text-sm text-muted-foreground">
          Not focusable, not clickable. A screen reader reads it as text.
        </p>
      </Stack>
      <Stack gap={2}>
        <span className="text-sm font-medium">FilterChip — a control that changes the results</span>
        <FilterChipSet label="Filter by status">
          <FilterChip label="Active" selected />
          <FilterChip label="Pending" />
          <FilterChip label="Expired" />
        </FilterChipSet>
        <p className="max-w-prose text-sm text-muted-foreground">
          Focusable, toggleable, announced as a pressed or unpressed button.
        </p>
      </Stack>
    </Stack>
  ),
};

/**
 * Keyboard-only operation, asserted rather than described.
 *
 * A filter bar with fifteen chips must not cost fifteen Tab presses to skip.
 * `FilterChipSet` is a `role="toolbar"` with roving focus: Tab enters at the
 * active chip, arrows move within, Tab leaves.
 */
export const KeyboardOnly: StoryObj = {
  render: function Render() {
    const [applied, setApplied] = React.useState<string[]>([]);
    return (
      <Stack gap={3}>
        <FilterChipSet label="Filter policies by status">
          {STATUSES.map((s) => (
            <FilterChip
              key={s}
              label={s}
              selected={applied.includes(s)}
              onSelectedChange={(on) =>
                setApplied((prev) => (on ? [...prev, s] : prev.filter((p) => p !== s)))
              }
            />
          ))}
        </FilterChipSet>
        <p data-testid="applied" className="text-sm text-muted-foreground">
          Applied: {applied.length ? applied.join(', ') : 'none'}
        </p>
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const toolbar = canvas.getByRole('toolbar', { name: 'Filter policies by status' });
    const chips = within(toolbar).getAllByRole('button');

    await step('the whole set is a single tab stop', async () => {
      await expect(chips.filter((c) => c.tabIndex === 0)).toHaveLength(1);
    });

    await step('arrows move between chips', async () => {
      chips[0].focus();
      await userEvent.keyboard('{ArrowRight}{ArrowRight}');
      await expect(document.activeElement).toBe(chips[2]);
    });

    await step('Space applies the focused filter', async () => {
      await userEvent.keyboard(' ');
      await expect(canvas.getByTestId('applied')).toHaveTextContent('Applied: Expired');
      await expect(chips[2]).toHaveAttribute('aria-pressed', 'true');
    });
  },
};

/** Filter chips in the place they actually live — above a table they drive. */
export const InAGridToolbar: StoryObj = {
  render: function Render() {
    const rows = [
      { id: 1, policy: 'Commercial Auto', status: 'Active', premium: '$12,400' },
      { id: 2, policy: 'General Liability', status: 'Active', premium: '$8,200' },
      { id: 3, policy: 'Cyber Liability', status: 'Pending', premium: '$15,900' },
      { id: 4, policy: 'Workers Comp', status: 'Expired', premium: '$9,600' },
    ];
    const [applied, setApplied] = React.useState<string[]>([]);
    const visible = applied.length ? rows.filter((r) => applied.includes(r.status)) : rows;

    return (
      <Stack gap={3}>
        <FilterChipSet label="Filter policies by status">
          {['Active', 'Pending', 'Expired'].map((s) => (
            <FilterChip
              key={s}
              label={s}
              selected={applied.includes(s)}
              onSelectedChange={(on) =>
                setApplied((prev) => (on ? [...prev, s] : prev.filter((p) => p !== s)))
              }
            />
          ))}
        </FilterChipSet>
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">Policies</caption>
          <thead>
            <tr className="border-b text-left">
              <th scope="col" className="py-2 font-medium">Policy</th>
              <th scope="col" className="py-2 font-medium">Status</th>
              <th scope="col" className="py-2 text-right font-medium">Premium</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="py-2">{r.policy}</td>
                <td className="py-2">
                  <Badge
                    tone={r.status === 'Active' ? 'success' : r.status === 'Expired' ? 'danger' : 'warning'}
                    size="sm"
                  >
                    {r.status}
                  </Badge>
                </td>
                <td className="py-2 text-right tabular-nums">{r.premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-muted-foreground">
          {visible.length} of {rows.length} policies
        </p>
      </Stack>
    );
  },
};
