import type { Meta, StoryObj } from '@storybook/react-vite';
import CardWebsite from './CardWebsite';
import { Box } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import { getRoleColor } from '../../theme/roles';
import CarouselSection from '../sections/CarouselSection/CarouselSection';
import type { InsightItem } from '../sections/CarouselSection/CarouselSection';

// Real production surfaces — 'primary' is only ever used on a navy hero
// background (see Marsh1DER.tsx's CarouselSection surface="hero"), never on
// the plain Storybook canvas. 'neutral'/'sky'/'white' use dark text and read
// fine on a light canvas, so only 'primary' needs a colored wrapper.
const SURFACE_BG: Record<string, string | undefined> = {
  primary: getRoleColor('surface.hero'),
  neutral: getRoleColor('surface.accent'),
  sky: getRoleColor('surface.secondary'),
  white: undefined, // plain canvas
};

// CardWebsite's vertical layout renders `display:grid; grid-template-rows:
// subgrid` on its own root (see CardWebsite.tsx) — it passes through row
// tracks from a real CSS Grid ancestor (CarouselSection.module.scss's
// `.cardList { grid-template-rows: auto auto }` in production). Without that
// ancestor, `subgrid` is invalid and the card collapses to a sliver, with the
// image visually overflowing on top of the (now-invisible-looking) title and
// description. Every story below needs a wrapper reproducing those same two
// row tracks, or the isolated story won't match how the card actually renders
// on the site.
const cardGrid = (bg?: string, width = 340) => ({
  display: 'grid',
  gridTemplateRows: 'auto auto',
  width,
  ...(bg && { backgroundColor: bg, p: 3 }),
});

const meta: Meta<typeof CardWebsite> = {
  title: 'Components/CardWebsite',
  component: CardWebsite,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Editorial card for the Marsh One website. Supports three surface variants (Neutral, Sky Blue, Primary Blue), optional image, category header, brand icon, and a CTA arrow. Interactive states (hover wash, focus ring, active title) are CSS-driven. Vertical layout relies on a CSS Grid ancestor supplying two row tracks (image + content) via `subgrid` — matched here in each story via a wrapping grid `Box`, mirroring `CarouselSection.module.scss`\'s real `.cardList` grid.',
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
  // Applies to every story below — see cardGrid() comment for why this is
  // required, not just cosmetic padding.
  decorators: [(Story) => <Box sx={cardGrid()}><Story /></Box>],
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

// Real production content for the primary/hero card — matches Marsh1DER.tsx's
// RISK_CARDS exactly (first item, "Cyber Risk"), rendered with hideCategories
// the same way the real "Find the risks that matter to your business" section
// does, so this story matches production rather than generic placeholder copy.
const REAL_HERO_PROPS = {
  title: 'Cyber Risk',
  description: 'Navigate the evolving threat landscape with tailored cyber insurance and risk advisory.',
  imageSrc: '/images/journey-bloomberg.jpg',
  imageAlt: 'Cyber Risk',
  href: '#',
  hasHeader: false, // hideCategories in production
};

// ─── Surfaces ────────────────────────────────────────────────────────────────

export const Neutral: Story = {
  args: { ...DEMO_PROPS, surface: 'neutral' },
  decorators: [(Story) => <Box sx={cardGrid(SURFACE_BG.neutral)}><Story /></Box>],
};

export const SkyBlue: Story = {
  args: { ...DEMO_PROPS, surface: 'sky' },
  decorators: [(Story) => <Box sx={cardGrid(SURFACE_BG.sky)}><Story /></Box>],
};

export const PrimaryBlue: Story = {
  args: { ...REAL_HERO_PROPS, surface: 'primary' },
  decorators: [(Story) => <Box sx={cardGrid(SURFACE_BG.primary)}><Story /></Box>],
};

// Matches the highlighted "Cyber Risk" card from the real card-deck carousel
// screenshot — that blue fill is the primary surface's hover/state-layer
// treatment (see CardWebsite.tsx's forceState="hover"), not a separate static variant.
export const PrimaryBlueHover: Story = {
  name: 'Primary Blue (hover state)',
  args: { ...REAL_HERO_PROPS, surface: 'primary', forceState: 'hover' },
  decorators: [(Story) => <Box sx={cardGrid(SURFACE_BG.primary)}><Story /></Box>],
};

// ─── Section carousel (real production) ──────────────────────────────────────

// Same real content as Marsh1DER.tsx's RISK_CARDS — the exact "Find the risks
// that matter to your business" card-deck carousel from /marsh-1der. Placed
// here, alongside the card variants, so the full assembled section is visible
// in the same story group as the cards it's built from (also mirrored in
// CarouselSection.stories.tsx as the canonical section-level story).
const CAROUSEL_CARDS: InsightItem[] = [
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

export const SectionCarousel: Story = {
  name: 'Section Carousel (real production)',
  decorators: [], // full section, not a single card — no grid wrapper needed
  parameters: { layout: 'fullscreen' },
  render: () => (
    <CarouselSection
      surface="hero"
      style="top"
      title="Find the risks that matter to your business"
      description="Explore Marsh solutions by risk area and sector with guidance from our specialists."
      ctaLabel="Browse all risk areas"
      items={CAROUSEL_CARDS}
      hideCategories
    />
  ),
};

// ─── All surfaces side-by-side ───────────────────────────────────────────────

export const AllSurfaces: Story = {
  decorators: [], // override meta-level single-card wrapper — this story lays out its own grid per card
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', maxWidth: 1300 }}>
      {(['neutral', 'sky', 'primary'] as const).map((surface) => (
        <Box key={surface} sx={cardGrid(SURFACE_BG[surface])}>
          <CardWebsite {...(surface === 'primary' ? REAL_HERO_PROPS : DEMO_PROPS)} surface={surface} />
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
  decorators: [],
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', maxWidth: 1200 }}>
      {(['neutral', 'sky', 'primary'] as const).map((surface) => (
        <Box key={surface} sx={cardGrid(SURFACE_BG[surface])}>
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
