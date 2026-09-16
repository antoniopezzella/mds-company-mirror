import type { Meta, StoryObj } from '@storybook/react';
import InsuranceIcon from '@mui/icons-material/Business';
import CarouselSection from './CarouselSection';
import type { InsightItem } from './CarouselSection';

const meta: Meta<typeof CarouselSection> = {
  title: 'Website/CarouselSection',
  component: CarouselSection,
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
type Story = StoryObj<typeof CarouselSection>;

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

// Real production content — matches Marsh1DER.tsx's RISK_CARDS exactly, used
// by the actual "Find the risks that matter to your business" section on
// /marsh-1der (surface="hero", hideCategories). Kept in sync with that page
// rather than generic placeholder copy, so this story matches production.
const RISK_CARDS: InsightItem[] = [
  {
    id: 'cyber',
    title: 'Cyber Risk',
    description: 'Navigate the evolving threat landscape with tailored cyber insurance and risk advisory.',
    imageSrc: '/images/journey-bloomberg.jpg',
    imageAlt: 'Cyber Risk',
    surface: 'primary',
    layout: 'vertical',
    category: 'Insurance',
    aspectRatio: '1:1',
  },
  {
    id: 'casualty',
    title: 'Casualty',
    description: 'Comprehensive liability solutions designed for the risks your business faces today.',
    imageSrc: '/images/journey-davos.jpg',
    imageAlt: 'Casualty',
    surface: 'primary',
    layout: 'vertical',
    category: 'Insurance',
    aspectRatio: '1:1',
  },
  {
    id: 'multinacional',
    title: 'Multinational',
    description: 'Coordinated global programs that protect your operations across every jurisdiction.',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Multinational',
    surface: 'primary',
    layout: 'vertical',
    category: 'Solutions',
    aspectRatio: '1:1',
  },
  {
    id: 'political-risk',
    title: 'Political Risk',
    description: 'Protect your investments and operations against political instability worldwide.',
    imageSrc: '/images/journey-global-risks.jpg',
    imageAlt: 'Political Risk',
    surface: 'primary',
    layout: 'vertical',
    category: 'Insurance',
    aspectRatio: '1:1',
  },
  {
    id: 'risk-consulting',
    title: 'Risk Consulting',
    description: 'Strategic advisory to identify, quantify, and reduce risk across your enterprise.',
    imageSrc: '/images/journey-bloomberg.jpg',
    imageAlt: 'Risk Consulting',
    surface: 'primary',
    layout: 'vertical',
    category: 'Advisory',
    aspectRatio: '1:1',
  },
  {
    id: 'global-report',
    title: 'Global Risk Report 2026',
    description: 'Data and insights from more than 1,300 global experts on the top risks ahead.',
    imageSrc: '/images/journey-global-risks.jpg',
    imageAlt: 'Global Risk Report',
    surface: 'primary',
    layout: 'vertical',
    category: 'Report',
    aspectRatio: '1:1',
  },
];

// ── Stories ───────────────────────────────────────────────────────────────────

// Exact replica of the real "Find the risks that matter to your business"
// card-deck carousel from /marsh-1der (Marsh1DER.tsx) — same data, same props
// (surface="hero", hideCategories). This is the faithful production reference
// story; the other stories below use generic placeholder content instead.
export const RiskAreasCarousel: Story = {
  name: 'Real production: Risk Areas Carousel',
  args: {
    surface: 'hero',
    style: 'top',
    title: 'Find the risks that matter to your business',
    description: 'Explore Marsh solutions by risk area and sector with guidance from our specialists.',
    ctaLabel: 'Browse all risk areas',
    items: RISK_CARDS,
    hideCategories: true,
  },
};

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
