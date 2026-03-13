import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';
import type { BreadcrumbItem } from './Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Separator between breadcrumbs',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of items before collapsing',
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const sampleItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Policies', href: '/policies' },
  { label: 'Active Policies', href: '/policies/active' },
  { label: 'Policy Detail', isCurrentPage: true },
];

const simplePath: BreadcrumbItem[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Claims', isCurrentPage: true },
];

// Basic Breadcrumbs
export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

// Simple two-level path
export const SimplePath: Story = {
  args: {
    items: simplePath,
  },
};

// With custom separator
export const CustomSeparator: Story = {
  args: {
    items: sampleItems,
    separator: '→',
  },
};

// With arrow separator
export const ArrowSeparator: Story = {
  args: {
    items: sampleItems,
    separator: '›',
  },
};

// With many items (demonstrating collapse)
export const ManyItems: Story = {
  args: {
    items: [
      { label: 'Level 1', href: '#' },
      { label: 'Level 2', href: '#' },
      { label: 'Level 3', href: '#' },
      { label: 'Level 4', href: '#' },
      { label: 'Level 5', href: '#' },
      { label: 'Level 6', href: '#' },
      { label: 'Level 7', href: '#' },
      { label: 'Level 8', href: '#' },
      { label: 'Current Level', isCurrentPage: true },
    ],
    maxItems: 4,
  },
};

// Insurance domain example
export const InsurancePath: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Risk Assessment', href: '/risk' },
      { label: 'Acme Corporation', href: '/risk/acme' },
      { label: 'Manufacturing Facility A', isCurrentPage: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world insurance navigation hierarchy showing path through risk assessment workflow.',
      },
    },
  },
};

// Claims processing path
export const ClaimsPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Claims', href: '/claims' },
      { label: 'Pending', href: '/claims/pending' },
      { label: 'CLM-2024-1234', isCurrentPage: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Claims management workflow breadcrumb showing path to specific claim.',
      },
    },
  },
};

// With click handlers (navigating without href)
export const WithClickHandlers: Story = {
  args: {
    items: [
      {
        label: 'Home',
        onClick: () => console.info('Navigate to Home'),
      },
      {
        label: 'Policies',
        onClick: () => console.info('Navigate to Policies'),
      },
      {
        label: 'My Policies',
        onClick: () => console.info('Navigate to My Policies'),
      },
      {
        label: 'Current Policy',
        isCurrentPage: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs with onClick handlers for client-side navigation. Check console for click events.',
      },
    },
  },
};

// Mobile-optimized (shorter)
export const MobileOptimized: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Claims', isCurrentPage: true },
    ],
    maxItems: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Mobile-friendly breadcrumb with fewer items to save space.',
      },
    },
  },
};
