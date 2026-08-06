import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, type TabItem } from './tabs';

/**
 * # Tabs (shadcn/ui)
 *
 * Radix-based counterpart to the MUI `Tabs`, styled with `getRoleColor()`
 * role tokens rather than hardcoded hex.
 *
 * ## API parity with MUI
 * Same `tabs`/`defaultActiveId`/`onSelect`/`variant` shape as the MUI twin
 * — pass an array of `{ id, title, content, disabled? }`.
 */
const meta: Meta<typeof Tabs> = {
  title: 'shadcn-ui/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Switches between content panels via an underline-indicator tab list, with full keyboard navigation via Radix.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['standard', 'scrollable', 'fullWidth'] },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const basicTabs: TabItem[] = [
  { id: 'overview', title: 'Overview', content: <p>Overview content goes here.</p> },
  { id: 'policies', title: 'Policies', content: <p>Policies content goes here.</p> },
  { id: 'claims', title: 'Claims', content: <p>Claims content goes here.</p> },
];

export const Default: Story = {
  args: {
    tabs: basicTabs,
  },
};

export const DefaultActiveId: Story = {
  args: {
    tabs: basicTabs,
    defaultActiveId: 'claims',
  },
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { id: 'overview', title: 'Overview', content: <p>Overview content.</p> },
      { id: 'policies', title: 'Policies', content: <p>Policies content.</p> },
      { id: 'archived', title: 'Archived', content: <p>Archived content.</p>, disabled: true },
    ],
  },
};

export const FullWidth: Story = {
  args: {
    tabs: basicTabs,
    variant: 'fullWidth',
  },
};

export const ManyTabsScrollable: Story = {
  args: {
    tabs: Array.from({ length: 8 }, (_, i) => ({
      id: `tab-${i}`,
      title: `Section ${i + 1}`,
      content: <p>Content for section {i + 1}.</p>,
    })),
    variant: 'scrollable',
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const OnSelectCallback: Story = {
  args: {
    tabs: basicTabs,
    onSelect: (id: string) => console.log('Selected tab:', id),
  },
};
