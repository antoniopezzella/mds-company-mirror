import type { Meta, StoryObj } from '@storybook/react-vite';

import { Inline, Stack } from './stack';
import { Button } from './button';
import { Badge } from './badge';
import { Card, CardContent } from './card';

/**
 * # Stack / Inline
 *
 * The layout atoms. `Stack` is vertical, `Inline` is horizontal and wraps.
 *
 * Their job is to make the spacing scale a **type**. `gap` accepts only steps
 * that exist in `src/spacing.ts`, so `gap={7}` (28px — off-scale) is a
 * TypeScript error instead of a silently slightly-wrong layout. That is the
 * whole reason to prefer them over hand-writing `flex flex-col gap-6`.
 *
 * For two-dimensional layout, use the grid utilities in **Foundations →
 * Grid System** instead — a Stack is one-dimensional by design.
 */
const meta: Meta<typeof Stack> = {
  title: 'Components/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Layout atoms that lock spacing to the DS scale. `Stack` (vertical) and `Inline` (horizontal, wrapping) add nothing but flex + gap, so they compose with anything and never fight a child\'s styling.',
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32],
      description: 'Spacing between children, on the DS scale. Off-scale values are a type error.',
    },
    align: {
      control: 'select',
      options: [undefined, 'start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: [undefined, 'start', 'center', 'end', 'between', 'around', 'evenly'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Swatch = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md border border-dashed px-3 py-2 text-sm">{children}</div>
);

export const Default: Story = {
  args: { gap: 4 },
  render: (args) => (
    <Stack {...args}>
      <Swatch>First</Swatch>
      <Swatch>Second</Swatch>
      <Swatch>Third</Swatch>
    </Stack>
  ),
};

/** Every gap step, so the scale is visible rather than described. */
export const GapScale: Story = {
  render: () => (
    <Stack gap={6}>
      {([1, 2, 3, 4, 5, 6, 8] as const).map((g) => (
        <Stack key={g} gap={1}>
          <span className="text-xs text-muted-foreground">
            gap={g} · {g * 4}px
          </span>
          <Inline gap={g}>
            <Swatch>A</Swatch>
            <Swatch>B</Swatch>
            <Swatch>C</Swatch>
          </Inline>
        </Stack>
      ))}
    </Stack>
  ),
};

/** `Inline` wraps by default — a row of filters must survive a narrow viewport. */
export const InlineWrapping: Story = {
  render: () => (
    <div className="max-w-sm rounded-md border p-3">
      <Inline gap={2}>
        {['Property', 'Liability', 'Cyber', 'Marine', 'Aviation', 'Casualty', 'Motor'].map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </Inline>
    </div>
  ),
};

/** `justify="between"` is the idiomatic title-row layout. */
export const JustifyBetween: Story = {
  render: () => (
    <Inline gap={4} justify="between" className="w-full rounded-md border p-3">
      <span className="text-sm font-semibold">Active policies</span>
      <Button variant="outline" size="sm">
        View all
      </Button>
    </Inline>
  ),
};

/** Nesting is the normal case: a Stack of Cards, each an Inline of controls. */
export const Composed: Story = {
  render: () => (
    <Stack gap={4}>
      {['Beacon Capital', 'Northwind Logistics'].map((name) => (
        <Card key={name}>
          <CardContent className="p-4">
            <Inline gap={4} justify="between">
              <Stack gap={1}>
                <span className="text-sm font-semibold">{name}</span>
                <span className="text-xs text-muted-foreground">Renewal in 30 days</span>
              </Stack>
              <Inline gap={2}>
                <Button variant="ghost" size="sm">
                  Details
                </Button>
                <Button variant="primary" size="sm">
                  Renew
                </Button>
              </Inline>
            </Inline>
          </CardContent>
        </Card>
      ))}
    </Stack>
  ),
};
