import type { Meta, StoryObj } from '@storybook/react-vite';
import CardWebsite from './CardWebsite';
import { Box } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';

const meta: Meta<typeof CardWebsite> = {
  title: 'Components/CardWebsite',
  component: CardWebsite,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Editorial card for the Marsh One website. Supports three surface variants (Neutral, Sky Blue, Primary Blue), optional image, category header, brand icon, and a CTA arrow. Interactive states (hover wash, focus ring, active title) are CSS-driven.',
      },
    },
  },
  argTypes: {
    surface: {
      control: 'select',
      options: ['neutral', 'sky', 'primary'],
      description: 'Background surface: Neutral (white), Sky Blue, or Primary Blue (navy)',
    },
    skeleton: { control: 'boolean' },
    hasImage: { control: 'boolean' },
    hasHeader: { control: 'boolean' },
    hasIcon: { control: 'boolean' },
    hasTitle: { control: 'boolean' },
    hasDescription: { control: 'boolean' },
    hasCtaButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CardWebsite>;

const DEMO_PROPS = {
  title: 'Lorem ipsum dolor sit amet consectetur. Dolor nec tincidunt tortor magna habitant nec nam.',
  description:
    'The global insurance market index is our proprietary measure of global commercial insurance premium pricing.',
  category: 'Category',
  timestamp: 'MM/DD/YYYY',
  imageSrc: '/images/insight-card.jpg',
  imageAlt: 'Marsh insight image',
  href: '#',
};

// ─── Surfaces ────────────────────────────────────────────────────────────────

export const Neutral: Story = {
  args: { ...DEMO_PROPS, surface: 'neutral' },
};

export const SkyBlue: Story = {
  args: { ...DEMO_PROPS, surface: 'sky' },
};

export const PrimaryBlue: Story = {
  args: { ...DEMO_PROPS, surface: 'primary' },
};

// ─── All surfaces side-by-side ───────────────────────────────────────────────

export const AllSurfaces: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', maxWidth: 1200 }}>
      {(['neutral', 'sky', 'primary'] as const).map((surface) => (
        <Box key={surface} sx={{ width: 380 }}>
          <CardWebsite {...DEMO_PROPS} surface={surface} />
        </Box>
      ))}
    </Box>
  ),
};

// ─── Skeleton ────────────────────────────────────────────────────────────────

export const Skeleton: Story = {
  args: { ...DEMO_PROPS, skeleton: true },
};

export const SkeletonAllSurfaces: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', maxWidth: 1200 }}>
      {(['neutral', 'sky', 'primary'] as const).map((surface) => (
        <Box key={surface} sx={{ width: 380 }}>
          <CardWebsite {...DEMO_PROPS} surface={surface} skeleton />
        </Box>
      ))}
    </Box>
  ),
};

// ─── Slot variants ───────────────────────────────────────────────────────────

export const WithBrandIcon: Story = {
  args: {
    ...DEMO_PROPS,
    surface: 'neutral',
    icon: <InsightsIcon sx={{ fontSize: 48 }} />,
    hasImage: false,
  },
};

export const NoImage: Story = {
  args: { ...DEMO_PROPS, hasImage: false },
};

export const NoDescription: Story = {
  args: { ...DEMO_PROPS, hasDescription: false },
};

export const NoHeader: Story = {
  args: { ...DEMO_PROPS, hasHeader: false },
};

export const NoCta: Story = {
  args: { ...DEMO_PROPS, hasCtaButton: false },
};
