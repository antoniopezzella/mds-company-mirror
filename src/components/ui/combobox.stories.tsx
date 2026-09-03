import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Combobox } from './combobox';

/**
 * # Combobox (shadcn/ui)
 *
 * No MDS/Figma spec exists for this component — built matching real
 * shadcn/ui conventions directly (Popover + Command combined), styled with
 * `getRoleColor()`. Unlike `Select`, this lets users type to filter a long
 * option list rather than scrolling through it.
 */
const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const clientOptions = [
  { value: 'beacon', label: 'Beacon Capital Partners' },
  { value: 'northwind', label: 'Northwind Insurance' },
  { value: 'globex', label: 'Globex Corporation' },
  { value: 'initech', label: 'Initech' },
  { value: 'umbrella', label: 'Umbrella Holdings' },
];

export const Default: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <Combobox {...args} />
    </div>
  ),
  args: {
    options: clientOptions,
    placeholder: 'Select a client...',
  },
};

export const Controlled: StoryObj = {
  render: () => {
    const [value, setValue] = useState('northwind');
    return (
      <div className="w-[280px]">
        <Combobox options={clientOptions} value={value} onChange={setValue} placeholder="Select a client..." />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <Combobox {...args} />
    </div>
  ),
  args: {
    options: clientOptions,
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <Combobox {...args} />
    </div>
  ),
  args: {
    options: [...clientOptions, { value: 'legacy', label: 'Legacy Corp (archived)', disabled: true }],
  },
};
