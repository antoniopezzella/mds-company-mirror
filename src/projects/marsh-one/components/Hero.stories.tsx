import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';
import '../../../index.css';
import '../../../styles/_typography.scss';

const meta: Meta<typeof Hero> = {
  title: 'Projects/Marsh One/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    headline: "AI-powered insights, backed by Marsh's global expertise",
    subheadline: 'Clarity for the risks that matter most',
    searchPlaceholder: "Hi, I'm the Marsh AI Assistant, ask me anything...",
    suggestions: ['Financial crime', 'Cyber security', 'Supply chain risk'],
  },
};

export const CustomBackground: Story = {
  args: {
    ...Default.args,
    backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920',
  },
};

export const ShortHeadline: Story = {
  args: {
    headline: 'Risk management simplified',
    subheadline: 'Expert guidance at your fingertips',
    suggestions: ['Property insurance', 'Employee benefits', 'Risk analytics'],
  },
};
