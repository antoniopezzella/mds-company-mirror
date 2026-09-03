import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './breadcrumbs';

/**
 * # Breadcrumbs (shadcn/ui)
 *
 * Radix-free, `getRoleColor()`-driven counterpart to the MUI `Breadcrumbs`.
 * Same `items`/`separator`/`maxItems`/`ariaLabel` API as the MUI twin,
 * including first/last + ellipsis collapse when items exceed `maxItems`.
 */
const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Policies', href: '/policies' },
      { label: 'Policy Detail', isCurrentPage: true },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'Claims', href: '/claims' },
      { label: 'CLM-40213', isCurrentPage: true },
    ],
    separator: '›',
  },
};

export const WithOnClick: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => alert('Navigate home') },
      { label: 'Reports', onClick: () => alert('Navigate reports') },
      { label: 'Q4 Summary', isCurrentPage: true },
    ],
  },
};

export const CollapsedLongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Clients', href: '/clients' },
      { label: 'Beacon Capital', href: '/clients/beacon' },
      { label: 'Policies', href: '/clients/beacon/policies' },
      { label: 'Auto', href: '/clients/beacon/policies/auto' },
      { label: 'POL-40213', isCurrentPage: true },
    ],
    maxItems: 4,
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings', isCurrentPage: true },
    ],
  },
};
