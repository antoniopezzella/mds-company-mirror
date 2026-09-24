import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Input } from './input';
import { Textarea } from './textarea';
import { DSSelect } from './select';
import { Combobox } from './combobox';
import { DatePicker } from './date-picker';
import { Button } from './button';
import { ButtonGroup } from './button-group';
import { DSCheckbox } from './checkbox';
import { Switch } from './switch';
import { Stack, Inline } from './stack';

/**
 * # Form Controls
 *
 * Every text-entry control in the system, side by side, at every size.
 *
 * This page exists to make inconsistency *visible*. A design system's form
 * controls have one hard requirement that is easy to break and hard to spot
 * one component at a time: **a control and a button of the same declared size
 * must be the same height**, because they constantly sit next to each other
 * in a row. Nothing enforces that automatically, so it is checked here by eye
 * and by the rendered measurement under each control.
 */
const meta: Meta = {
  title: 'Components/Form Controls',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'All text-entry controls at every size, with measured heights, so cross-component inconsistency is visible rather than something you discover in a layout.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const SELECT_OPTIONS = [
  { value: 'property', label: 'Property' },
  { value: 'liability', label: 'Liability' },
  { value: 'cyber', label: 'Cyber' },
];

const COMBOBOX_OPTIONS = [
  { value: 'beacon', label: 'Beacon Capital' },
  { value: 'northwind', label: 'Northwind Logistics' },
];

/** Measures and labels its child's rendered height, so claims are checkable. */
function Measured({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [h, setH] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    const el = ref.current?.firstElementChild;
    if (!el) return;
    // The control itself, not the wrapper — a wrapper may include a label.
    const target = el.querySelector('input,textarea,button,[role=combobox]') ?? el;
    setH(Math.round(target.getBoundingClientRect().height));
  }, []);

  return (
    <Stack gap={1}>
      <span className="text-xs font-medium text-muted-foreground">
        {label}
        {h !== null && <span className="ml-2 font-mono">{h}px</span>}
      </span>
      <div ref={ref}>{children}</div>
    </Stack>
  );
}

const SIZES = ['sm', 'md', 'lg'] as const;

/**
 * The core check: each control beside a Button of the same declared size.
 * Any height mismatch shows immediately as a step in the row.
 */
export const AgainstButton: Story = {
  render: () => (
    <Stack gap={8}>
      {SIZES.map((size) => (
        <Stack key={size} gap={3}>
          <h3 className="text-sm font-semibold">
            size=&quot;{size}&quot;
          </h3>
          <Inline gap={3} align="end" wrap={false} className="overflow-x-auto pb-2">
            <Measured label="Input">
              <Input size={size} placeholder="Policy number" aria-label="Policy number" />
            </Measured>
            <Measured label="Select">
              <DSSelect options={SELECT_OPTIONS} size={size} placeholder="Coverage" aria-label="Coverage type" />
            </Measured>
            <Measured label="Button">
              <Button size={size} variant="primary">
                Search
              </Button>
            </Measured>
          </Inline>
        </Stack>
      ))}
    </Stack>
  ),
};

/** Every text-entry control at every size, to compare padding and type scale. */
export const AllControls: Story = {
  render: () => (
    <Stack gap={8}>
      {SIZES.map((size) => (
        <Stack key={size} gap={3}>
          <h3 className="text-sm font-semibold">size=&quot;{size}&quot;</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Measured label="Input">
              <Input size={size} placeholder="Policy number" aria-label="Policy number" />
            </Measured>
            <Measured label="Select">
              <DSSelect options={SELECT_OPTIONS} size={size} placeholder="Coverage" aria-label="Coverage type" />
            </Measured>
            <Measured label="Combobox">
              <Combobox options={COMBOBOX_OPTIONS} size={size} placeholder="Client" aria-label="Client" />
            </Measured>
            <Measured label="DatePicker">
              <DatePicker size={size} placeholder="Effective date" />
            </Measured>
            <Measured label="Textarea">
              <Textarea size={size} placeholder="Loss description" rows={2} aria-label="Loss description" />
            </Measured>
          </div>
        </Stack>
      ))}
    </Stack>
  ),
};

/**
 * Grouped controls. `ButtonGroup` and `InputGroup` take a `size` and cascade
 * it through context, so every child matches without the author repeating it
 * — and a group with a mismatched child is not expressible by accident.
 *
 * This is where a height mismatch is unmissable, because the controls share
 * edges: before the shared scale, a 40px Input beside a 48px Button left a
 * visible step in something meant to read as one unit. `items-stretch` could
 * not save it, since both children set explicit heights.
 */
export const GroupedControls: Story = {
  render: () => (
    <Stack gap={8}>
      {SIZES.map((size) => (
        <Stack key={size} gap={3}>
          <h3 className="text-sm font-semibold">
            &lt;ButtonGroup size=&quot;{size}&quot;&gt; — children inherit
          </h3>
          <ButtonGroup size={size} aria-label={`Policy search, ${size}`}>
            <Input placeholder="Policy number" aria-label="Policy number" />
            <DSSelect options={SELECT_OPTIONS} placeholder="Coverage" aria-label="Coverage type" />
            <Button variant="primary">Search</Button>
          </ButtonGroup>
        </Stack>
      ))}

      <Stack gap={3}>
        <h3 className="text-sm font-semibold">
          A child&apos;s own size still wins
        </h3>
        <ButtonGroup size="sm" aria-label="Override example">
          <Input placeholder="Inherits sm" aria-label="Inherits sm" />
          <Button variant="primary" size="lg">
            Explicit lg
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  ),
};

/**
 * Boolean controls sit on their own scale — they are glyphs, not text boxes,
 * so they do not take the text-control heights. Shown for completeness.
 */
export const BooleanControls: Story = {
  render: () => (
    <Inline gap={6} align="center">
      <DSCheckbox label="Include expired" />
      <Switch label="Auto-renew" />
    </Inline>
  ),
};
