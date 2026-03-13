import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stats } from './Stats';
import '../../../index.css';
import '../../../styles/_typography.scss';

const meta: Meta<typeof Stats> = {
  title: 'Projects/Marsh One/Stats',
  component: Stats,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stats>;

export const Default: Story = {
  args: {
    headline: 'The reach, experience, and perspective to help you thrive',
    description: 'With more than 130 years of experience, 45,000+ colleagues, and 140+ countries served, we bring global expertise and data-driven insights.',
    stats: [
      { value: '130', label: 'Countries' },
      { value: '90,000', suffix: '+', label: 'Global colleagues' },
      { value: '150', label: 'Years' },
    ],
  },
};

export const Compact: Story = {
  args: {
    headline: 'Global reach, local expertise',
    description: 'Serving clients worldwide with unmatched experience and insight.',
    stats: [
      { value: '130', suffix: '+', label: 'Countries' },
      { value: '150', label: 'Years of experience' },
    ],
  },
};

export const WithMillions: Story = {
  args: {
    headline: 'Impact at scale',
    stats: [
      { value: '2.5', suffix: 'M', label: 'Clients served' },
      { value: '$45', suffix: 'B', label: 'Premium placed' },
      { value: '500', suffix: '+', label: 'Offices globally' },
    ],
  },
};
