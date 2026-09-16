import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandFilmSection } from './BrandFilmSection';

const meta: Meta<typeof BrandFilmSection> = {
  title: 'Concepts/Brand Website/BrandFilmSection',
  component: BrandFilmSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Brand Film Section

First entry in a new "future-state brand website" component library
(\`src/projects/Marsh1DER/components/\`), inspired by
[1derlab.com's "component-12-4"](https://1derlab.com/#component-12-4) —
a cinematic, full-bleed brand-film section. Built on \`HeroBanner\`'s
\`layout="background"\` treatment (media reveal, scroll parallax, Vimeo/
video/image fallback chain) rather than reimplementing video playback —
see the \`showPlayButton\`/\`autoPlayVideo\`/\`mediaControlsSlot\`/
\`titleEmphasis\` props added to \`HeroBanner\` specifically to support
this.

Unlike \`HeroBanner\`'s other usages, video here does **not** autoplay —
matching the reference component's explicit "Silent film · Play"
pattern (a deliberate click-to-play moment, not ambient background
video).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BrandFilmSection>;

export const Default: Story = {
  args: {
    title: 'A world in motion.',
    titleEmphasis: 'A different way to see it.',
    description: 'New connections. Different possibilities. Discover the perspectives that move us forward.',
    imageSrc: '/images/journey-global-risks.jpg',
    imageAlt: 'A world in motion',
    videoDurationLabel: '0:29',
    sourceLabel: 'Marsh brand film · Excerpt',
    showSilentFilmBadge: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Placeholder image only (no real footage yet) — shows the decorative, non-interactive play icon alongside the duration/source/"Silent film" meta row.',
      },
    },
  },
};

export const WithRealVideo: Story = {
  args: {
    ...Default.args,
    videoSrc: '/video/WebsiteHeaderVideo-960x900_V1 (1).mp4',
    videoPoster: '/images/journey-global-risks.jpg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Stand-in video asset demonstrating the real, keyboard-operable play/pause control that appears once real footage exists — the decorative icon disappears, HeroBanner\'s own button takes over, and playback does not autoplay.',
      },
    },
  },
};

export const NoEmphasis: Story = {
  args: {
    title: 'A world in motion, seen differently.',
    imageSrc: '/images/journey-global-risks.jpg',
    imageAlt: 'A world in motion',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sanity-checks that titleEmphasis, description, and the meta row are all fully optional.',
      },
    },
  },
};

export const ReducedMotion: Story = {
  args: {
    ...Default.args,
    disableAnimations: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Mirrors HeroBanner\'s own AnimationsDisabled story — content appears immediately at its fully-revealed state, no entrance tween or scroll parallax.',
      },
    },
  },
};
