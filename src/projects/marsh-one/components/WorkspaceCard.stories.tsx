import type { Meta, StoryObj } from '@storybook/react-vite';
import WorkspaceCard, { type WorkspaceCardProps } from './WorkspaceCard';
import '../../../index.css';
import '../../../styles/_typography.scss';

const meta: Meta<typeof WorkspaceCard> = {
  title: 'Projects/Marsh One/WorkspaceCard',
  component: WorkspaceCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkspaceCard>;

const defaultArgs: WorkspaceCardProps = {
  title: 'Workspace for global risk operations',
  description:
    'A modern workspace built for Marsh One teams to collaborate on risk intelligence, claims response, and advisory workflows.',
  category: 'Workspace',
  imageSrc: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400',
  imageAlt: 'Modern digital workspace with strategic dashboards',
  ctaLabel: 'Open workspace',
  ctaHref: '#open-workspace',
  badges: ['AI-enabled', 'Real-time insights', 'Secure'],
  footerNote: 'Built for Marsh One teams and advisors.',
};

export const Default: Story = {
  args: defaultArgs,
};

export const Minimal: Story = {
  args: {
    title: 'Workspace for insights and collaboration',
    imageSrc: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1400',
    ctaHref: '#open-workspace',
  },
};

export const WithBadges: Story = {
  args: {
    ...defaultArgs,
    description: 'Real-time collaboration with intelligence, workflows, and visibility for Marsh One clients.',
    badges: ['Integrated data', 'Secure access', 'Adaptive workflows'],
  },
};
