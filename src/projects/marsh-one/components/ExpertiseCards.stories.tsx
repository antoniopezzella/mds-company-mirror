import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExpertiseCards } from './ExpertiseCards';
import '../../../index.css';
import '../../../styles/_typography.scss';

const meta: Meta<typeof ExpertiseCards> = {
  title: 'Projects/Marsh One/ExpertiseCards',
  component: ExpertiseCards,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExpertiseCards>;

const defaultCards = [
  {
    title: 'Risk & Insurance',
    description: 'Advisory and placement strategies for risk and insurance coverage',
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800',
    imageAlt: 'Aerial view of cargo ship',
  },
  {
    title: 'People & Workforce',
    description: 'Health, benefits, wellbeing, and talent risk solutions',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    imageAlt: 'Team collaboration',
  },
  {
    title: 'Climate & Property',
    description: 'Physical risk, resilience, and mitigation strategies',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
    imageAlt: 'Industrial building',
  },
];

export const Default: Story = {
  args: {
    title: 'Expertise applied where risk matters most',
    subtitle: 'Advisory, risk, brokerage and insight solutions',
    cards: defaultCards,
  },
};

export const TwoCards: Story = {
  args: {
    title: 'Our core services',
    subtitle: 'Comprehensive risk management solutions',
    cards: defaultCards.slice(0, 2),
  },
};

export const CustomContent: Story = {
  args: {
    title: 'Global capabilities',
    subtitle: 'Expertise across industries and regions',
    cards: [
      {
        title: 'Cyber Security',
        description: 'Protect your organization from evolving cyber threats with comprehensive risk assessment and insurance solutions',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
      },
      {
        title: 'Supply Chain',
        description: 'Mitigate supply chain disruptions with predictive analytics and tailored coverage',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      },
      {
        title: 'ESG & Sustainability',
        description: 'Navigate environmental, social, and governance risks with expert guidance',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
      },
    ],
  },
};
