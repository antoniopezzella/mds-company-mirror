import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText, Shield, Users } from 'lucide-react';
import { List, type ListItemConfig } from './list';
import { Badge } from './badge';

/**
 * # List
 *
 * `getRoleColor()`-driven counterpart to the MUI `List`. Built against the
 * real `items`-array API — the MDS `List.figma.tsx` mapping's
 * `<List.Item>` compound-component example doesn't match any prop the
 * actual MUI component accepts.
 */
const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof List>;

const basicItems: ListItemConfig[] = [
  { id: '1', primary: 'General Liability', secondary: 'Active · Renews Mar 14' },
  { id: '2', primary: 'Commercial Auto', secondary: 'Active · Renews May 1' },
  { id: '3', primary: 'Cyber Liability', secondary: 'Pending review' },
];

export const Default: Story = {
  args: { items: basicItems },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
};

export const WithSubheader: Story = {
  args: { items: basicItems, subheader: 'Policies' },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
};

export const WithIcons: Story = {
  args: {
    items: [
      { id: '1', primary: 'Property', secondary: 'Building & contents', icon: <FileText className="h-5 w-5" /> },
      { id: '2', primary: 'Liability', secondary: 'General & product', icon: <Shield className="h-5 w-5" /> },
      { id: '3', primary: 'Workers Comp', secondary: '48 employees covered', icon: <Users className="h-5 w-5" /> },
    ],
  },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
};

export const WithBadges: Story = {
  args: {
    items: [
      { id: '1', primary: 'Commercial Auto', badge: <Badge tone="success">Active</Badge> },
      { id: '2', primary: 'Cyber Liability', badge: <Badge tone="warning">Pending</Badge> },
      { id: '3', primary: 'Workers Comp', badge: <Badge tone="danger">Expired</Badge> },
    ],
  },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
};

export const Selectable: Story = {
  args: {
    items: basicItems,
    selectable: true,
    multiSelect: true,
    onSelectionChange: (ids) => console.debug('Selected:', ids),
  },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
};

export const Dense: Story = {
  args: { items: basicItems, dense: true },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
};

export const WithDisabledItem: Story = {
  args: {
    items: [...basicItems, { id: '4', primary: 'Archived Policy', secondary: 'No longer active', disabled: true }],
  },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
};

export const NoDividers: Story = {
  args: { items: basicItems, dividers: false },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
};
