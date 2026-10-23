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
  primary: getRoleColor('bg.primary'),
  neutral: getRoleColor('bg.neutral.subtle'),
  sky: getRoleColor('bg.secondary'),
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
  // THE APPROVED CARD. These are the exact props CarouselSection passes in
  // "Real production: Risk Areas Carousel" — which is the signed-off website
  // card experience — taken from Marsh1DER.tsx's RISK_CARDS (first item).
  //
  // The stories previously showed a kitchen-sink configuration that exists
  // nowhere in production: lorem-ipsum title, a category/timestamp header and
  // a description all at once. CardWebsite was rendering that correctly — its
  // defaults are content-driven (`hasHeader = Boolean(category || timestamp)`,
  // `hasDescription = Boolean(description)`) — so the component was never
  // wrong. It just looked wrong, because the demo asked for everything at
  // once and the real section asks for almost none of it.
  //
  // `category` is deliberately absent: the carousel passes `hideCategories`,
  // which strips category and categoryIcon before they reach the card. Adding
  // one here would reintroduce the header row that made these look off.
  title: 'Cyber Risk',
  description: 'Navigate the evolving threat landscape with tailored cyber insurance and risk advisory.',
  imageSrc: '/images/journey-bloomberg.jpg',
  imageAlt: 'Cyber Risk',
  layout: 'vertical' as const,
  aspectRatio: '1:1' as const,
  href: '#',
};

// Kept as a named alias: DEMO_PROPS now IS the production card, so the two
// no longer differ. Retained so existing story references keep working.
const REAL_HERO_PROPS = DEMO_PROPS;

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
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // The scrollable element axe flags here is <body> itself: three
            // skeleton cards side by side make the canvas scroll, and a
            // skeleton is a placeholder — by definition it contains no link,
            // button or control, so the whole story has nothing focusable.
            // That is a property of previewing loading state in isolation,
            // not of the component: the loaded card IS a link (`href`), every
            // other CardWebsite story passes this rule, and on a real page
            // the skeletons sit among a header and nav that make the body
            // scroll keyboard-reachable. Scoped to this story only, so the
            // rule still guards genuinely scrollable containers elsewhere —
            // the same reasoning as BorderContrast.stories.tsx and
            // HeroBanner's no-CTA story.
            id: 'scrollable-region-focusable',
            enabled: false,
          },
        ],
      },
    },
  },
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

// The header row (category + timestamp) is OFF in the approved card, so this
// story shows it ON — the opposite of its name, and the useful direction now.
// `hasHeader` is content-driven (`Boolean(category || timestamp)`), so passing
// the content is what turns it on; the flag alone cannot.
export const WithHeaderRow: Story = {
  name: 'With header row (category + date)',
  args: { ...DEMO_PROPS, category: 'Insurance', timestamp: '03/14/2026' },
};

export const NoCta: Story = {
  args: { ...DEMO_PROPS, hasCtaButton: false },
};
