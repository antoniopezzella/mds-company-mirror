import type { Meta, StoryObj } from '@storybook/react-vite';
import ContentCard from './ContentCard';

const meta: Meta<typeof ContentCard> = {
  title: 'Components/ContentCard',
  component: ContentCard,
  tags: ['autodocs', '!dev'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Rich content card for articles, reports, and media. Supports vertical/horizontal orientations, badges, and metadata.'
      }
    }
  },
  args: {
    title: 'Heading 3',
    description: 'The global insurance market index is our proprietary measure of global commercial insurance premium pricing.',
    categoryLabel: 'Report',
    readingTime: '1 min read',
    date: 'MM/DD/YYYY',
    badges: ['Badge', 'Badge'],
    ctaLabel: 'Read more',
  },
};
export default meta;

type Story = StoryObj<typeof ContentCard>;

export const VerticalWithBorder: Story = {};

export const VerticalNoBorder: Story = {
  args: { withBorder: false, showBottomDecoration: false },
};

export const HorizontalWithBorder: Story = {
  args: { orientation: 'horizontal' },
};

export const HorizontalNoBorder: Story = {
  args: { orientation: 'horizontal', withBorder: false, showBottomDecoration: false },
};
