import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, type IconProps } from './icon';
import { ICON_NAMES, type IconName } from './icon-names';

/**
 * # Icons
 *
 * Google **Material Symbols** (Outlined), self-hosted as a variable font — no
 * CDN, works offline and in the published package. Pick a glyph by its
 * **ligature name** (`info`, `check_circle`, `warning`); browse the full set at
 * [fonts.google.com/icons](https://fonts.google.com/icons).
 *
 * The icon inherits `currentColor`, so colour it on a wrapper (or via a role),
 * not on the icon. It renders decorative (`aria-hidden`) by default; pass
 * `aria-label` for a standalone meaningful icon.
 */
const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icons',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Material Symbols ligature name (from the blessed set)' },
    size: { control: { type: 'range', min: 16, max: 48, step: 2 } },
    fill: { control: 'boolean', description: 'FILL axis — the only variable axis in the subset' },
  },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: { name: 'info', size: 24, fill: false },
};

// ── The status glyphs Toast/Alert use (filled) ─────────────────────────────
const STATUS: { tone: string; name: IconName }[] = [
  { tone: 'informational', name: 'info' },
  { tone: 'success', name: 'check_circle' },
  { tone: 'warning', name: 'warning' },
  { tone: 'error', name: 'error' },
];

export const StatusIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {STATUS.map(({ tone, name }) => (
        <div key={tone} className="flex flex-col items-center gap-1 text-center">
          <Icon name={name} size={32} fill />
          <code className="text-xs">{name}</code>
          <span className="text-xs text-muted-foreground">{tone}</span>
        </div>
      ))}
    </div>
  ),
};

// ── The full blessed set (what the subset ships) ────────────────────────────
export const Gallery: Story = {
  render: (args: IconProps) => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-lg border p-3 text-center"
        >
          <Icon name={name} size={28} fill={args.fill} />
          <code className="truncate text-[11px] w-full" title={name}>{name}</code>
        </div>
      ))}
    </div>
  ),
  args: { name: 'info', fill: false },
};
