import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from './Card';

// Sample data used across stories
const sampleStats = [
  { label: 'Total Policies', value: '1,240', change: '+8%' },
  { label: 'Active Claims', value: '32', change: '+2%' },
  { label: 'Satisfaction', value: '94%' }
] as const;

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Metric card displaying stats with trend indicators and insights. Built with role-based colors for consistent theming.'
      }
    }
  },
  args: {
    title: 'Portfolio Performance',
    stats: sampleStats as any,
    insight: 'Overall portfolio metrics are trending upward week over week with stable satisfaction.'
  }
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const Minimal: Story = {
  args: {
    stats: [
      { label: 'Active Policies', value: '820' },
      { label: 'Open Tickets', value: '14' },
      { label: 'Net Growth', value: '+3%' }
    ],
    insight: 'Growth remains positive; monitor ticket backlog to ensure SLA compliance.'
  }
};

export const WithMixedChanges: Story = {
  args: {
    stats: [
      { label: 'Quote Volume', value: '5,420', change: '+11%' },
      { label: 'Bound Rate', value: '37%', change: '+1%' },
      { label: 'Churn', value: '4.2%' }
    ],
    insight: 'Increased quote volume is converting effectively; churn stable inside target band.'
  }
};

export const LongInsight: Story = {
  args: {
    insight:
      'Momentum continues after last quarter’s optimization initiatives. Focus next on reducing churn below 4%. Maintain monitoring of growth levers and validate model calibration in the next review cycle.'
  }
};
