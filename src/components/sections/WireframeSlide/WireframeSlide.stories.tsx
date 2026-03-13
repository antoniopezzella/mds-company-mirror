import type { Meta, StoryObj } from '@storybook/react';
import { WireframeSlide } from './WireframeSlide';

const meta: Meta<typeof WireframeSlide> = {
  title: 'Sections/WireframeSlide',
  component: WireframeSlide,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark', 'hero'],
    },
    backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof WireframeSlide>;

export const Default: Story = {
  args: {
    title: 'Wireframe Presentation Slide',
    description: 'This layout is designed to present conceptual wireframes alongside supporting text details.',
    variant: 'light',
  },
};

export const Dark: Story = {
  args: {
    title: 'Dark Mode Concept',
    description: 'Experience the same structured information in our optimized dark UI role-set.',
    variant: 'dark',
  },
};

export const Hero: Story = {
  args: {
    title: 'Strategic Vision Wireframe',
    description: 'A higher-impact hero-style layout for strategic conceptual presentations.',
    variant: 'hero',
  },
};

export const CustomContent: Story = {
  args: {
    title: 'Dashboard MVP B2B',
    description: 'Property Risk Management - Data completeness and CAT Modeling insights.',
    placeholders: [
      'Property Inventory Overview',
      'CAT Modeling Insights',
      'Renewal Readiness Evaluation',
      'Market Readiness assessment'
    ],
    variant: 'light',
  },
};
