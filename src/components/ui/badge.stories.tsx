import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

/**
 * # Badge (shadcn/ui)
 *
 * A standalone tone-colored label pill — matches what the MDS "Text Badge"
 * Figma node actually describes (see the note in badge.tsx about the
 * existing MUI `Badge.tsx` only supporting the overlay-indicator pattern).
 */
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Standalone tone-colored label pill — matches the MDS "Text Badge" Figma node (7584:27300). `default` (Neutral) and `disabled` each have one fixed visual treatment; every other tone supports both a solid fill (`soft=false`) and a light tint + border (`soft=true`).',
      },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'danger', 'disabled'],
      description: 'Figma "Type" property. Maps Neutral→default, Informative→info, Positive→success, Notice→warning, Negative→danger.',
    },
    soft: {
      control: 'boolean',
      description: 'Figma "Soft background" property. No effect on `default` or `disabled`, which have a single fixed treatment.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'Default', tone: 'default' },
};

/** `soft=false` (the default): solid, saturated fill — Figma's "Soft background = No". */
export const Solid: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone="default">Neutral</Badge>
      <Badge tone="info">Informative</Badge>
      <Badge tone="success">Positive</Badge>
      <Badge tone="warning">Notice</Badge>
      <Badge tone="danger">Negative</Badge>
      <Badge tone="disabled">Disabled</Badge>
    </div>
  ),
};

/** `soft=true`: light tint + colored border + dark text — Figma's "Soft background = Yes". Neutral and Disabled have no soft variant in Figma, so they're identical to Solid above. */
export const Soft: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone="default" soft>Neutral</Badge>
      <Badge tone="info" soft>Informative</Badge>
      <Badge tone="success" soft>Positive</Badge>
      <Badge tone="warning" soft>Notice</Badge>
      <Badge tone="danger" soft>Negative</Badge>
      <Badge tone="disabled" soft>Disabled</Badge>
    </div>
  ),
};

export const InContext: StoryObj = {
  render: () => (
    <div className="flex items-center gap-2 text-sm">
      <span>Policy #POL-40213</span>
      <Badge tone="success">Active</Badge>
    </div>
  ),
};
