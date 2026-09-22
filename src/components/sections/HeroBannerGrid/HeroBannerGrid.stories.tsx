import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Download } from 'lucide-react';
import { HeroBannerGrid } from './HeroBannerGrid';

const meta: Meta<typeof HeroBannerGrid> = {
  title: 'Website/HeroBannerGrid',
  component: HeroBannerGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Hero Banner (Grid build)

MUI/Emotion-free rebuild of \`HeroBanner\` — same spec, same behavior, styled
entirely through the MDS Grid (\`src/styles/_grid.scss\`, Bootstrap-class-
compatible) plus a standalone \`HeroBannerGrid.module.scss\`. Built for review
against the original and for handoff as a portable component + stylesheet.

Compare directly against \`Website/HeroBanner\`'s equivalent stories, and via
\`/hero-banner-test\` vs \`/hero-banner-grid-test\` for the full media-type toggle
matrix (Vimeo, self-hosted video, image, broken-Vimeo fallback).

### What's identical to \`HeroBanner\`
- Props, layouts (\`split\`/\`background\`), GSAP entrance + parallax animation
- Vimeo Player.js wiring: container-query (cqw/cqh) iframe sizing, the 3-layer
  failure detector (error event → ready()+getDuration() → 6s timeout), and the
  \`imageSrc\` fallback on failure
- Split+Vimeo parallax exclusion (see the component's \`skipParallax\` comment)

### What's deliberately different
- Zero MUI/Emotion in this component's own source (DSButton is the one
  transitive MUI dependency, kept for the canonical DS button styling)
- A single \`HERO_BREAKPOINT_LG\` constant (1024px, matching the grid's real
  \`lg\`) replaces six independently-hardcoded 992px breakpoints in the MUI
  version — see the exported constant's doc comment for why
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'Background color variant',
      table: { defaultValue: { summary: 'dark' } },
    },
    layout: {
      control: 'select',
      options: ['split', 'background'],
      description: '50/50 split or full-bleed background',
      table: { defaultValue: { summary: 'split' } },
    },
    height: {
      control: 'text',
      description: 'Section height (CSS value)',
      table: { defaultValue: { summary: '100vh' } },
    },
    imagePosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Image/Video column position (split layout only)',
      table: { defaultValue: { summary: 'right' } },
    },
    disableAnimations: {
      control: 'boolean',
      description: 'Disable GSAP animations (for accessibility/testing)',
      table: { defaultValue: { summary: 'false' } },
    },
    eyebrow: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'text' },
    vimeoId: {
      control: 'text',
      description: 'Vimeo video ID — takes priority over videoSrc',
      table: { category: 'Media' },
    },
    videoSrc: {
      control: 'text',
      description: 'Hero video URL — takes priority over imageSrc',
      table: { category: 'Media' },
    },
    videoPoster: { control: 'text', table: { category: 'Media' } },
    imageSrc: { control: 'text', table: { category: 'Media' } },
    imageAlt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof HeroBannerGrid>;

export const Corporate: Story = {
  args: {
    eyebrow: 'Eyebrow',
    title: 'Whatever risk, workforce, or capital challenge your business faces',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    primaryCta: {
      text: 'Download Report',
      onClick: () => console.debug('Download clicked'),
      icon: <Download size={18} />,
    },
    secondaryCta: {
      text: 'Talk to Our Experts',
      onClick: () => console.debug('Contact clicked'),
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Aerial view of city intersection',
    variant: 'dark',
    height: '600px',
    imagePosition: 'right',
    disableAnimations: false,
  },
};

// Corporate with Vimeo Background — the priority-one behavior to verify.
export const CorporateWithVimeo: Story = {
  args: {
    ...Corporate.args,
    vimeoId: '1146072483', // Canonical demo asset — see project memory / test harness
    imageSrc: '/images/journey-aviation.jpg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vimeo background via Player.js. Verify: no white gaps at any viewport width, play/pause actually controls the player, and the container-query (cqw/cqh) sizing fills the split column correctly (not the viewport-relative oversizing the old vw/vh approach had).',
      },
    },
  },
};

// Vimeo landscape HD — the second canonical test asset, verified reliable
// across repeated loads (see project memory on the two canonical Vimeo IDs).
export const CorporateWithVimeoLandscape: Story = {
  args: {
    ...Corporate.args,
    vimeoId: '863362136',
    imageSrc: '/images/journey-aviation.jpg',
  },
};

// Deliberately broken Vimeo ID — proves the 3-layer failure detector falls
// back to imageSrc instead of showing Vimeo's own error page.
export const VimeoFallback: Story = {
  args: {
    ...Corporate.args,
    vimeoId: '999999999999',
    imageSrc: '/images/journey-aviation.jpg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Invalid Vimeo ID. Should fall back to `imageSrc` within ~6s (timeout backstop) or sooner (error event) — never a raw Vimeo error page.',
      },
    },
  },
};

export const CorporateWithVideo: Story = {
  args: {
    ...Corporate.args,
    videoSrc: '/video/WebsiteHeaderVideo-960x900_V1 (1).mp4',
    videoPoster: '/images/journey-aviation.jpg',
  },
};

export const BackgroundLayout: Story = {
  args: {
    ...Corporate.args,
    layout: 'background',
    vimeoId: '1146072483',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-bleed background layout with Vimeo — the MUI HeroBanner has no Storybook story for this layout at all today; included here for parity coverage.',
      },
    },
  },
};

export const FullHeight: Story = {
  args: {
    ...Corporate.args,
    height: '100vh',
    title: 'Four powerful brand legacies united as Marsh McLennan',
    subtitle: 'Risk, Strategy & People',
  },
};

export const LightVariant: Story = {
  args: {
    eyebrow: 'Solutions',
    title: 'Innovative risk solutions for modern businesses',
    subtitle: 'Protecting what matters most',
    description: 'Our comprehensive suite of risk management solutions helps businesses navigate uncertainty with confidence.',
    primaryCta: {
      text: 'Get Started',
      onClick: () => console.debug('Get Started clicked'),
      icon: <ArrowRight size={18} />,
    },
    secondaryCta: {
      text: 'Learn More',
      onClick: () => console.debug('Learn More clicked'),
    },
    imageSrc: '/journey-aviation.jpg',
    imageAlt: 'Business professionals collaborating',
    variant: 'light',
    height: '100vh',
    imagePosition: 'right',
    disableAnimations: false,
  },
};

export const ImageLeft: Story = {
  args: {
    ...Corporate.args,
    imagePosition: 'left',
    vimeoId: '1146072483',
    title: 'Innovation meets expertise in insurance solutions',
  },
  parameters: {
    docs: {
      description: {
        story: 'Media on the left with Vimeo — exercises the content column\'s "start at column 7" grid placement (needed because split media is absolutely positioned outside `.row`, so `.col-lg-6` alone would default to the left half regardless of imagePosition).',
      },
    },
  },
};

export const FiftyFiftySplit: Story = {
  args: {
    eyebrow: 'Corporate Solutions',
    title: 'Whatever risk, workforce, or capital challenge your business faces',
    subtitle: 'Risk, Strategy & People',
    description: 'We bring together the best of Marsh, Guy Carpenter, Mercer, and Oliver Wyman to help organizations navigate an uncertain world with confidence and expertise.',
    primaryCta: {
      text: 'Download Report',
      onClick: () => console.debug('Download clicked'),
      icon: <Download size={18} />,
    },
    secondaryCta: {
      text: 'Talk to Our Experts',
      onClick: () => console.debug('Contact clicked'),
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Aerial city view',
    variant: 'dark',
    height: '700px',
    imagePosition: 'right',
  },
};

export const AnimationsDisabled: Story = {
  args: {
    eyebrow: 'Accessible',
    title: 'Hero banner with animations disabled',
    subtitle: 'For users with motion sensitivity',
    description: 'This variant demonstrates the hero banner with the disableAnimations prop set to true.',
    primaryCta: {
      text: 'Learn More',
      onClick: () => console.debug('Learn More clicked'),
      icon: <ArrowRight size={18} />,
    },
    videoSrc: '/video/WebsiteHeaderVideo-960x900_V1 (1).mp4',
    imageSrc: '/journey-aviation.jpg',
    imageAlt: 'Accessible hero banner',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right',
    disableAnimations: true,
  },
};
