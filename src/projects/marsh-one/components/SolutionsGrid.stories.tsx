import type { Meta, StoryObj } from '@storybook/react-vite';
import { SolutionsGrid } from './SolutionsGrid';
import '../../../index.css';
import '../../../styles/_typography.scss';

const meta: Meta<typeof SolutionsGrid> = {
  title: 'Projects/Marsh One/SolutionsGrid',
  component: SolutionsGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SolutionsGrid>;

export const Default: Story = {
  args: {
    headline: "Whatever risk you're managing, we've handled it before.",
    ctaLabel: 'Find right solution',
    topics: [
      {
        title: 'Risk & Insurance',
        description: 'Property, casualty, cyber and specialty coverage, claims advocacy and risk consulting.',
        linkLabel: 'Risk & insurance',
      },
      {
        title: 'Workforce & Benefits',
        description: 'Health and benefits, talent and rewards, and workforce strategy.',
        linkLabel: 'Workforce & benefits',
      },
      {
        title: 'Investments & Retirement',
        description: 'OCIO, pension investments, portfolio strategy and retirement solutions.',
        linkLabel: 'Investments & retirement',
      },
      {
        title: 'Reinsurance & Capital',
        description: 'Treaty and facultative reinsurance, catastrophe modelling and capital advisory.',
        linkLabel: 'Reinsurance & capital',
      },
      {
        title: 'Strategy & Transformation',
        description: 'Corporate strategy, operating model design and organisational performance.',
        linkLabel: 'Strategy & transformation',
      },
      {
        title: 'SME Products',
        description: 'Packaged cover for smaller businesses, online quote and bind.',
        linkLabel: 'SME products',
      },
    ],
  },
};
