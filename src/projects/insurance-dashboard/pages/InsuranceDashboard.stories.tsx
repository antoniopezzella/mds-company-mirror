import type { Meta, StoryObj } from '@storybook/react-vite';
import { InsuranceDashboard } from './InsuranceDashboard';
import '../../../index.css';
import '../../../styles/_typography.scss';

const meta: Meta<typeof InsuranceDashboard> = {
  title: 'Projects/Insurance Dashboard/Full Dashboard',
  component: InsuranceDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete insurance dashboard with metrics, claims, risk overview, and quick actions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'Sarah Johnson',
  },
};

export const Anonymous: Story = {
  args: {
    userName: 'User',
  },
};
