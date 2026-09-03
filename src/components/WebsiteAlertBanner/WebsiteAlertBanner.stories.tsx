import type { Meta, StoryObj } from '@storybook/react-vite';
import { WebsiteAlertBanner } from './WebsiteAlertBanner';

const meta: Meta<typeof WebsiteAlertBanner> = {
  title: 'Components/WebsiteAlertBanner',
  component: WebsiteAlertBanner,
  tags: ['!dev'],
  args: {
    brand: 'marsh',
    title: 'Important update',
    message: 'We have updated our terms of service. Please review the changes.',
  },
  argTypes: {
    brand: {
      control: { type: 'select' },
      options: ['oliver-wyman', 'guy-carpenter', 'marsh', 'mercer', 'mma'],
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'prominent'],
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Website-wide alert banner with brand-specific styling for key announcements, using MDS grid system and design system roles for responsive behavior.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof WebsiteAlertBanner>;

export const Marsh: Story = {};

export const OliverWyman: Story = {
  args: {
    brand: 'oliver-wyman',
    title: 'Join our upcoming webinar',
    message: 'Learn about the latest trends in risk management and how they impact your business.',
    ctaText: 'Register now',
  },
};

export const GuyCarpenter: Story = {
  args: {
    brand: 'guy-carpenter',
    title: 'New catastrophe modeling capabilities',
    message: 'Enhanced analytics for better risk assessment and portfolio management.',
    ctaText: 'Learn more',
    onClose: () => console.log('Closed'),
  },
};

export const MMA: Story = {
  args: {
    brand: 'mma',
    variant: 'prominent',
    title: 'Scheduled maintenance',
    message: 'The MMA portal will be unavailable on Saturday from 02:00 to 04:00 UTC for system upgrades.',
    ctaText: 'View schedule',
  },
};

export const Mercer: Story = {
  args: {
    brand: 'mercer',
    title: 'Benefits enrollment period',
    message: 'Annual benefits enrollment closes on December 15th. Review your options today.',
    ctaText: 'Enroll now',
    onClose: () => console.log('Dismissed'),
  },
};

export const WithDismiss: Story = {
  args: {
    brand: 'marsh',
    title: 'Cookie preferences',
    message: 'We use cookies to enhance your experience. You can manage your preferences anytime.',
    ctaText: 'Accept all',
    onClose: () => console.log('Dismissed'),
  },
};

export const ProminentAnnouncement: Story = {
  args: {
    variant: 'prominent',
    brand: 'marsh',
    title: 'We\'re building a new, expanded Marsh brand',
    message: 'Discover our evolved capabilities and enhanced services designed to meet your changing needs.',
    ctaText: 'Discover new Marsh',
    fullWidth: true,
  },
};

export const FullWidth: Story = {
  args: {
    brand: 'oliver-wyman',
    title: 'Global announcement',
    message: 'Important information about our services across all regions.',
    ctaText: 'Read more',
    fullWidth: true,
    onClose: () => console.log('Closed'),
  },
};
