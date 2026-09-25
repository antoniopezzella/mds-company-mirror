import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

/**
 * # Badge
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
          'Standalone tone-colored label pill — tones map to the MDS "Text Badge" Figma node (7584:27300). `default` (Neutral) and `disabled` each have one fixed visual treatment; every other tone offers three: `outline` (the default — transparent with a tonal border and tonal text), `soft` (light tint + border, Figma\'s "Soft background = Yes") and `solid` (saturated fill, Figma\'s "Soft background = No").\n\n**The default moved from `solid` to `outline`.** A solid pill repeated down every row of a table shouts; an outline annotates. Figma still documents solid as the "Soft background = No" treatment, so the Figma component needs the matching variant added — raise it before treating Figma as the source of truth for this prop.',
      },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'danger', 'disabled'],
      description: 'Figma "Type" property. Maps Neutral→default, Informative→info, Positive→success, Notice→warning, Negative→danger.',
    },
    variant: {
      control: 'select',
      options: ['outline', 'soft', 'solid'],
      description: 'Visual treatment. No effect on `default` or `disabled`, which have a single fixed treatment.',
    },
    soft: {
      control: 'boolean',
      description: 'Deprecated (removed after 0.7.0) — use `variant`. `soft` maps to `variant="soft"`, `soft={false}` to `variant="solid"`.',
      table: { category: 'Deprecated' },
    },
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: '`md` (default) is the Figma spec (24px). `sm` (20px) is a non-Figma dense variant for tight rows — e.g. Stepper\'s per-step status pills.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'Default', tone: 'default' },
};

/**
 * `outline` — the default. Transparent, so the badge sits on whatever surface
 * it lands on (a table row, a striped row, a card) without fighting it; the
 * border carries the tone.
 *
 * Note `warning`'s label is not gold. `status.warning.fg` measures 3.41:1 on
 * white — under AA — and the gold ramp has no darker step, so the text falls
 * back to `text.primary` and the gold border carries the tone instead.
 */
export const Outline: StoryObj = {
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

/** `variant="solid"`: solid, saturated fill — Figma's "Soft background = No". */
export const Solid: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="solid" tone="default">Neutral</Badge>
      <Badge variant="solid" tone="info">Informative</Badge>
      <Badge variant="solid" tone="success">Positive</Badge>
      <Badge variant="solid" tone="warning">Notice</Badge>
      <Badge variant="solid" tone="danger">Negative</Badge>
      <Badge variant="solid" tone="disabled">Disabled</Badge>
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

export const Sizes: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          '`md` (default) is the Figma spec — 24px tall, 8px padding, 8px radius, 14px text. `sm` is a non-Figma dense variant (20px / 12px text) for tight rows, such as `Stepper`\'s per-step status pills; raise a Figma-side variant request before leaning on it widely.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="info" soft>Informative</Badge>
        <Badge tone="success" soft>Positive</Badge>
        <Badge tone="danger" soft>Negative</Badge>
        <span className="text-xs opacity-60">md (Figma spec)</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="info" soft size="sm">Informative</Badge>
        <Badge tone="success" soft size="sm">Positive</Badge>
        <Badge tone="danger" soft size="sm">Negative</Badge>
        <span className="text-xs opacity-60">sm (dense)</span>
      </div>
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
