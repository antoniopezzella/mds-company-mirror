import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './spinner';

/**
 * # Spinner
 *
 * Minimal loading indicator (lucide `Loader2` + `animate-spin`). It already
 * carries `role="status"` and `aria-label="Loading"`, so it is announced to
 * assistive tech. Resize with a `size-*` utility, **not** width/height —
 * `animate-spin` will not scale an SVG sized by attribute. It inherits
 * `currentColor`, so it tints with the surrounding text colour.
 */
const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

/** The default 16px spinner. */
export const Default: Story = {};

/** Resize via `size-*` utilities. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
};

/** Inherits `currentColor` — set a role colour on the element (or its parent). */
export const Tinted: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="size-6" style={{ color: 'var(--role-interactive-primary)' }} />
      <Spinner className="size-6" style={{ color: 'var(--role-text-secondary)' }} />
    </div>
  ),
};
