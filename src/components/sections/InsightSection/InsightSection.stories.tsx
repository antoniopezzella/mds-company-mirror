import type { Meta, StoryObj } from '@storybook/react';
import InsuranceIcon from '@mui/icons-material/Business';
import InsightSection from './InsightSection';
import type { InsightItem } from './InsightSection';

const meta: Meta<typeof InsightSection> = {
  title: 'Sections/InsightSection',
  component: InsightSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    surface: {
      control: 'select',
      options: ['default', 'accent', 'hero'],
      description: 'Section background surface',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InsightSection>;

// ── Sample card data ───────────────────────────────────────────────────────────

const ITEMS: InsightItem[] = [
  {
    id: 'card-1',
    title: 'Global Insurance Market Index — Q2 2026 Update',
    description:
      'Our proprietary measure of global commercial insurance premium pricing shows a moderation in rate increases across most lines.',
    category: 'Report',
    timestamp: '10 Jun 2026',
    datetime: '2026-06-10',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Aerial view of a commercial aircraft over clouds',
    surface: 'neutral',
    href: '#card-1',
  },
  {
    id: 'card-2',
    title: 'Cyber Risk Landscape: What Boards Need to Know in 2026',
    description:
      'As ransomware attacks continue to evolve, organisations need to align board governance with operational cyber resilience.',
    category: 'Insight',
    timestamp: '5 Jun 2026',
    datetime: '2026-06-05',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Abstract digital network visualization',
    surface: 'neutral',
    href: '#card-2',
  },
  {
    id: 'card-3',
    title: 'Climate Transition Risk: Building a Framework for Corporate Resilience',
    description:
      'Physical and transition climate risks are converging. We outline a structured approach for embedding resilience into enterprise strategy.',
    category: 'Research',
    timestamp: '28 May 2026',
    datetime: '2026-05-28',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Wind turbines in a field at sunset',
    surface: 'neutral',
    href: '#card-3',
  },
  {
    id: 'card-4',
    title: 'Supply Chain Disruption: New Approaches to Risk Transfer',
    description:
      'Multi-tier supply chain exposures require innovative insurance structures. This report examines emerging parametric and index-linked solutions.',
    category: 'Report',
    timestamp: '20 May 2026',
    datetime: '2026-05-20',
    surface: 'neutral',
    href: '#card-4',
    hasImage: false,
    icon: <InsuranceIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: 'card-5',
    title: 'Directors & Officers Liability: Navigating a Hardening Market',
    description:
      'D&O premiums continue to firm across sectors. We examine the drivers and key coverage enhancements available to clients.',
    category: 'Market Update',
    timestamp: '15 May 2026',
    datetime: '2026-05-15',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Modern corporate office building facade',
    surface: 'neutral',
    href: '#card-5',
  },
  {
    id: 'card-6',
    title: 'Political Risk Monitor: Emerging Market Exposures in Focus',
    description:
      'Trade policy volatility and geopolitical instability are reshaping risk profiles for companies with international operations.',
    category: 'Monitor',
    timestamp: '8 May 2026',
    datetime: '2026-05-08',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'World map with highlighted risk regions',
    surface: 'neutral',
    href: '#card-6',
  },
];

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: 'Insights shaping what matters most globally',
    description:
      "Our research and analysis on the world's most influential risks and the factors defining the coming landscape.",
    items: ITEMS,
    ctaLabel: 'Explore all insights',
    ctaHref: '/insights',
    surface: 'default',
  },
};

export const AccentBackground: Story = {
  args: {
    ...Default.args,
    surface: 'accent',
  },
};

export const HeroBackground: Story = {
  args: {
    ...Default.args,
    surface: 'hero',
    items: ITEMS.map((item) => ({ ...item, surface: 'primary' as const })),
  },
};

export const NoDescription: Story = {
  args: {
    title: 'Insights shaping what matters most globally',
    items: ITEMS.slice(0, 4),
    ctaLabel: 'Explore all insights',
    ctaHref: '/insights',
  },
};

export const NoCta: Story = {
  args: {
    title: 'Insights shaping what matters most globally',
    description: "Our research and analysis on the world's most influential risks.",
    items: ITEMS.slice(0, 3),
  },
};

export const FewCards: Story = {
  name: 'Two Cards (no overflow)',
  args: {
    title: 'Featured Insights',
    items: ITEMS.slice(0, 2),
    ctaLabel: 'View more',
    ctaHref: '/insights',
  },
};

export const SkeletonItems: Story = {
  args: {
    title: 'Loading insights…',
    items: Array.from({ length: 4 }, (_, i) => ({
      id: `skeleton-${i}`,
      title: 'Placeholder',
      skeleton: true,
      hasImage: true,
    })),
  },
};
