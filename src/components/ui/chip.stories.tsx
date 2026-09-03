import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Chip } from './chip';

/**
 * # Chip (shadcn/ui)
 *
 * Radix-free, `getRoleColor()`-driven counterpart to the MUI `Chip`. Same
 * `label`/`variant`/`tone`/`size`/`selectable`/`selected`/`onDelete`/`icon`
 * API as the MUI twin.
 */
const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined'] },
    tone: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { label: 'Available', tone: 'success' },
};

export const Outlined: Story = {
  args: { label: 'Filter Active', tone: 'primary', variant: 'outlined' },
};

export const Removable: Story = {
  args: { label: 'Auto Insurance', tone: 'secondary', onDelete: () => alert('removed') },
};

export const WithIcon: Story = {
  args: { label: 'Featured', tone: 'warning', icon: <Star className="h-full w-full" /> },
};

export const Tones: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Default" tone="default" />
      <Chip label="Primary" tone="primary" />
      <Chip label="Secondary" tone="secondary" />
      <Chip label="Success" tone="success" />
      <Chip label="Warning" tone="warning" />
      <Chip label="Danger" tone="danger" />
      <Chip label="Info" tone="info" />
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-center gap-2">
      <Chip label="Small" size="sm" tone="primary" />
      <Chip label="Medium" size="md" tone="primary" />
      <Chip label="Large" size="lg" tone="primary" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { label: 'Unavailable', tone: 'secondary', disabled: true },
};

export const SelectableGroup: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['auto']);
    const options = [
      { value: 'auto', label: 'Auto' },
      { value: 'home', label: 'Home' },
      { value: 'life', label: 'Life' },
      { value: 'travel', label: 'Travel' },
    ];
    const toggle = (value: string) =>
      setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

    return (
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Chip
            key={opt.value}
            label={opt.label}
            tone="primary"
            selectable
            selected={selected.includes(opt.value)}
            onClick={() => toggle(opt.value)}
          />
        ))}
      </div>
    );
  },
};
