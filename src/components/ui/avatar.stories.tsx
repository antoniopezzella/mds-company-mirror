import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './avatar';

/**
 * # Avatar (shadcn/ui)
 *
 * Radix-based counterpart to the MUI `Avatar`, styled with `getRoleColor()`
 * role tokens rather than hardcoded hex. Uses Radix's automatic
 * image-load-failure fallback to initials.
 *
 * ## API parity with MUI
 * Same `src`/`initials`/`size`/`variant`/`tone`/`status`/`badge` props as
 * the MUI twin.
 */
const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'User profile image with initials fallback and an optional status indicator.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large', 'xlarge'] },
    variant: { control: 'select', options: ['circular', 'rounded', 'square'] },
    tone: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] },
    status: { control: 'select', options: [undefined, 'online', 'offline', 'away', 'busy'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  args: {
    initials: 'AP',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    alt: 'Jane Doe',
  },
};

export const BrokenImageFallsBackToInitials: Story = {
  args: {
    src: 'https://example.invalid/nonexistent.jpg',
    initials: 'JD',
    alt: 'Jane Doe',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar initials="S" size="small" />
      <Avatar initials="M" size="medium" />
      <Avatar initials="L" size="large" />
      <Avatar initials="XL" size="xlarge" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar initials="D" tone="default" />
      <Avatar initials="P" tone="primary" />
      <Avatar initials="S" tone="secondary" />
      <Avatar initials="OK" tone="success" />
      <Avatar initials="!" tone="warning" />
      <Avatar initials="X" tone="danger" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar initials="C" variant="circular" />
      <Avatar initials="R" variant="rounded" />
      <Avatar initials="S" variant="square" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar initials="ON" status="online" />
      <Avatar initials="AW" status="away" />
      <Avatar initials="BU" status="busy" />
      <Avatar initials="OF" status="offline" />
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    initials: 'AP',
    onClick: () => alert('Avatar clicked'),
  },
};
