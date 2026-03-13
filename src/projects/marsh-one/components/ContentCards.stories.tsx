import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentCards } from './ContentCards';
import '../../../index.css';
import '../../../styles/_typography.scss';

const meta: Meta<typeof ContentCards> = {
  title: 'Projects/Marsh One/ContentCards',
  component: ContentCards,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentCards>;

const defaultCards = [
  {
    title: 'Marsh at Davos: World Economic Forum Annual Meeting',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    href: '#davos',
  },
  {
    title: 'Global Risk Knowledge Collaboration',
    description: 'Leading insights from industry experts',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    href: '#knowledge',
  },
  {
    title: 'The Global Risks Report with the World Economic Forum',
    image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800',
    href: '#report',
  },
];

export const Default: Story = {
  args: {
    headline: 'Perspective that shapes the global agenda',
    description: 'Our research and presence at the center of the most influential global conversations help leaders navigate a world coming – and prepare for it.',
    cards: defaultCards,
  },
};

export const TwoCards: Story = {
  args: {
    headline: 'Latest insights',
    description: 'Expert perspectives on evolving risks',
    cards: defaultCards.slice(0, 2),
  },
};

export const WithDescriptions: Story = {
  args: {
    headline: 'Featured reports',
    cards: [
      {
        title: 'Climate Risk Report 2024',
        description: 'Understanding the financial impact of climate change on global markets',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
        href: '#climate',
      },
      {
        title: 'Cyber Threat Landscape',
        description: 'Emerging threats and mitigation strategies for enterprises',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
        href: '#cyber',
      },
      {
        title: 'Supply Chain Resilience',
        description: 'Building agile and robust supply networks',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
        href: '#supply-chain',
      },
    ],
  },
};
