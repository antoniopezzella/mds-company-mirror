import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroBanner } from './HeroBanner';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';

const meta: Meta<typeof HeroBanner> = {
  title: 'Website/HeroBanner',
  component: HeroBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Hero Banner Component

Full-width, full-height hero section with content and image/video split layout.

### Features
- ✅ Full viewport height (100vh) section
- ✅ Two-column responsive layout (50/50 split)
- ✅ **Video background support** (native MP4 or **Vimeo**)
- ✅ **GSAP entrance animations** (fade up + stagger)
- ✅ **Parallax scroll effect** on video/image (desktop only)
- ✅ Supports eyebrow text, headline, subtitle, description
- ✅ Primary and secondary CTA buttons
- ✅ Dark and light variants
- ✅ Configurable image/video position (left/right)
- ✅ Accessibility: \`disableAnimations\` prop
- ✅ Mobile responsive (stacks vertically)
- ✅ Role token integration for theming

### Video Support
**Native Video (MP4):** Use \`videoSrc\` prop with path to .mp4 file  
**Vimeo:** Use \`vimeoId\` prop with Vimeo video ID (e.g., "123456789")  
**Priority:** \`vimeoId\` → \`videoSrc\` → \`imageSrc\`

Both video options include:
- Autoplay + loop + muted (for accessibility compliance)
- Same gradient overlays for text readability
- Parallax scroll effect
- Responsive behavior

### Animation Details
- **Entrance**: Content elements fade up with 0.15s stagger (eyebrow → title → subtitle → description → CTAs)
- **Scroll**: Parallax effect on media column (subtle vertical movement)
- **Performance**: Uses GSAP's useGSAP hook with proper cleanup
- **Accessibility**: Animations can be disabled via prop

### Design Pattern
Based on Marsh Corporate landing page hero section from Figma:
- Dark variant uses Midnight Blue (#000f47) background
- Typography: Marsh Serif for marketing headlines, Noto Sans for body
- Primary CTA: Gold filled button
- Secondary CTA: Outline button

### Accessibility
- Semantic HTML (\`<section>\`, \`<h1>\`, \`<h2>\`)
- Proper heading hierarchy
- ARIA labels on buttons and video
- Alt text for images
- Keyboard navigation support
- Videos auto-play muted for accessibility
- \`disableAnimations\` prop for motion-sensitive users
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'Background color variant',
      table: {
        defaultValue: { summary: 'dark' },
      },
    },
    height: {
      control: 'text',
      description: 'Section height (CSS value)',
      table: {
        defaultValue: { summary: '100vh' },
      },
    },
    imagePosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Image/Video column position',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
    disableAnimations: {
      control: 'boolean',
      description: 'Disable GSAP animations (for accessibility/testing)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    eyebrow: {
      control: 'text',
      description: 'Small uppercase text above headline',
    },
    title: {
      control: 'text',
      description: 'Main H1 headline',
    },
    subtitle: {
      control: 'text',
      description: 'H2 subtitle below headline',
    },
    description: {
      control: 'text',
      description: 'Body paragraph text',
    },
    vimeoId: {
      control: 'text',
      description: 'Vimeo video ID (e.g., "123456789") - takes priority over videoSrc. Extract from vimeo.com/123456789',
      table: {
        category: 'Media',
      },
    },
    videoSrc: {
      control: 'text',
      description: 'Hero video URL (takes priority over imageSrc)',
      table: {
        category: 'Media',
      },
    },
    videoPoster: {
      control: 'text',
      description: 'Video poster image (shown before video loads)',
      table: {
        category: 'Media',
      },
    },
    imageSrc: {
      control: 'text',
      description: 'Hero image URL (fallback when no video)',
      table: {
        category: 'Media',
      },
    },
    imageAlt: {
      control: 'text',
      description: 'Image alt text for accessibility',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroBanner>;

// Default Corporate Hero (matches Figma screenshot exactly)
export const Corporate: Story = {
  args: {
    eyebrow: 'Eyebrow',
    title: 'Whatever risk, workforce, or capital challenge your business faces',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    primaryCta: {
      text: 'Download Report',
      onClick: () => console.debug('Download clicked'),
      icon: <DownloadIcon />,
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
  parameters: {
    docs: {
      description: {
        story: 'Primary corporate hero design with gold eyebrow dash, 50/50 split layout, and dual CTAs. Matches Figma design specifications exactly.',
      },
    },
  },
};

// Corporate with Video Background
export const CorporateWithVideo: Story = {
  args: {
    ...Corporate.args,
    videoSrc: '/video/WebsiteHeaderVideo-960x900_V1 (1).mp4',
    videoPoster: '/images/journey-aviation.jpg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero banner with video background. Video autoplays muted with poster image. Falls back to static image if video fails to load. Includes subtle parallax scroll effect.',
      },
    },
  },
};

// Corporate with Vimeo Background
export const CorporateWithVimeo: Story = {
  args: {
    ...Corporate.args,
    vimeoId: '1146072483', // Public demo video - replace with your actual video ID
    imageSrc: '/images/journey-aviation.jpg',
  },
  parameters: {
    docs: {
      description: {
        story: `Hero banner with **Vimeo video background**. Uses Vimeo's background mode for seamless autoplay with no controls. 
        
**How to use:**
1. Upload your video to Vimeo
2. Extract the video ID from the URL (e.g., \`vimeo.com/123456789\` → \`123456789\`)
3. Pass the ID to the \`vimeoId\` prop

**Features:**
- ✅ Autoplay + Loop + Muted (background mode)
- ✅ No player controls or Vimeo branding
- ✅ Same gradient overlays as native video
- ✅ Parallax scroll effect included
- ✅ Fallback to \`imageSrc\` if needed

**Priority:** \`vimeoId\` → \`videoSrc\` → \`imageSrc\``,
      },
    },
  },
};

// Full Height Variant (100vh)
export const FullHeight: Story = {
  args: {
    ...Corporate.args,
    height: '100vh',
    title: 'Four powerful brand legacies united as Marsh McLennan',
    subtitle: 'Risk, Strategy & People',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full viewport height (100vh) hero banner. Ideal for landing pages and homepage heroes.',
      },
    },
  },
};

// Medium Height Variant
export const MediumHeight: Story = {
  args: {
    ...Corporate.args,
    height: '80vh',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium height (80vh) variant. Good balance between impact and content visibility below the fold.',
      },
    },
  },
};

// Compact Variant
export const Compact: Story = {
  args: {
    ...Corporate.args,
    height: '500px',
    subtitle: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact 500px height variant without subtitle. Suitable for secondary pages or sections.',
      },
    },
  },
};

// Animations Disabled (Accessibility)
export const AnimationsDisabled: Story = {
  args: {
    eyebrow: 'Accessible',
    title: 'Hero banner with animations disabled',
    subtitle: 'For users with motion sensitivity',
    description: 'This variant demonstrates the hero banner with the disableAnimations prop set to true. Content appears immediately without fade-up or parallax effects.',
    primaryCta: {
      text: 'Learn More',
      onClick: () => console.debug('Learn More clicked'),
      icon: <ArrowForwardIcon />,
    },
    videoSrc: '/video/WebsiteHeaderVideo-960x900_V1 (1).mp4',
    videoPoster: '/images/journey-aviation.jpg',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Accessible hero banner',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right',
    disableAnimations: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility support with animations disabled. Use this for users who prefer reduced motion or for testing static layouts.',
      },
    },
  },
};

// High Quality Video (4K)
export const HighQualityVideo: Story = {
  args: {
    eyebrow: 'Premium',
    title: 'Experience ultra-high definition',
    subtitle: '4K video background',
    description: 'This variant uses a 4K UHD video for maximum visual impact on high-resolution displays.',
    primaryCta: {
      text: 'Watch Demo',
      onClick: () => console.debug('Watch Demo clicked'),
      icon: <ArrowForwardIcon />,
    },
    videoSrc: '/video/2818546-uhd_3840_2160_24fps.mp4',
    videoPoster: '/images/journey-aviation.jpg',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'High quality 4K video background',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right',
    disableAnimations: false,
  },
  parameters: {
    docs: {
      description: {
        story: '4K UHD video variant (3840x2160, 24fps). Best for high-resolution displays and premium experiences. Note: Larger file size.',
      },
    },
  },
};

// Light Variant
export const LightVariant: Story = {
  args: {
    eyebrow: 'Solutions',
    title: 'Innovative risk solutions for modern businesses',
    subtitle: 'Protecting what matters most',
    description: 'Our comprehensive suite of risk management solutions helps businesses navigate uncertainty with confidence.',
    primaryCta: {
      text: 'Get Started',
      onClick: () => console.debug('Get Started clicked'),
      icon: <ArrowForwardIcon />,
    },
    secondaryCta: {
      text: 'Learn More',
      onClick: () => console.debug('Learn More clicked'),
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Business professionals collaborating',
    variant: 'light',
    height: '100vh',
    imagePosition: 'right',
    disableAnimations: false,
  },
};

// Minimal (No Eyebrow or Subtitle)
export const Minimal: Story = {
  args: {
    title: 'Simple, powerful, effective',
    description: 'Everything you need to protect and grow your business, all in one place.',
    primaryCta: {
      text: 'Explore Solutions',
      onClick: () => console.debug('Explore clicked'),
      icon: <ArrowForwardIcon />,
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Modern office building',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right',
  },
};

// Image Left
export const ImageLeft: Story = {
  args: {
    eyebrow: 'Innovation',
    title: 'Leading the future of insurance technology',
    subtitle: 'Technology meets expertise',
    description: 'Combining cutting-edge technology with deep industry expertise to deliver exceptional outcomes.',
    primaryCta: {
      text: 'See Our Platform',
      onClick: () => console.debug('Platform clicked'),
      icon: <ArrowForwardIcon />,
    },
    secondaryCta: {
      text: 'Schedule Demo',
      onClick: () => console.debug('Demo clicked'),
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Technology dashboard interface',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'left',
  },
};

// Single CTA
export const SingleCTA: Story = {
  args: {
    eyebrow: 'Get Started',
    title: 'Your journey to better protection starts here',
    description: 'Join thousands of businesses who trust Marsh to protect their future.',
    primaryCta: {
      text: 'Request a Quote',
      onClick: () => console.debug('Quote clicked'),
      icon: <ArrowForwardIcon />,
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Handshake between business partners',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right',
  },
};

// Custom Height
export const CustomHeight: Story = {
  args: {
    eyebrow: 'About Us',
    title: 'A legacy of trust and innovation',
    subtitle: 'Since 1871',
    description: 'Over 150 years of experience protecting businesses and helping them thrive.',
    primaryCta: {
      text: 'Our Story',
      onClick: () => console.debug('Story clicked'),
      icon: <ArrowForwardIcon />,
    },
    secondaryCta: {
      text: 'Meet the Team',
      onClick: () => console.debug('Team clicked'),
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Historic Marsh building',
    variant: 'dark',
    height: '80vh',
    imagePosition: 'right',
  },
};

// No CTAs (Content Only)
export const ContentOnly: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // The scrollable element axe flags is <body>: this story is a
            // full-height hero rendered deliberately WITHOUT CTAs, so by
            // definition it contains nothing focusable, and the canvas scrolls.
            // "No focusable content" is the story's whole subject.
            //
            // Scoped to this one story, not the file — every other HeroBanner
            // story has CTAs and is still checked. On a real page this hero
            // sits among headers, links and buttons.
            id: 'scrollable-region-focusable',
            enabled: false,
          },
        ],
      },
    },
  },
  args: {
    eyebrow: 'Announcement',
    title: 'Introducing Marsh One Platform',
    subtitle: 'A new era of insurance technology',
    description: 'Experience seamless integration across all your insurance needs with our revolutionary new platform.',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Marsh One Platform interface',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right',
  },
};

// 50/50 Split with Subtitle (Figma Desktop variant)
export const FiftyFiftySplit: Story = {
  args: {
    eyebrow: 'Corporate Solutions',
    title: 'Whatever risk, workforce, or capital challenge your business faces',
    subtitle: 'Risk, Strategy & People',
    description: 'We bring together the best of Marsh, Guy Carpenter, Mercer, and Oliver Wyman to help organizations navigate an uncertain world with confidence and expertise.',
    primaryCta: {
      text: 'Download Report',
      onClick: () => console.debug('Download clicked'),
      icon: <DownloadIcon />,
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
  parameters: {
    docs: {
      description: {
        story: '50/50 split layout with subtitle. This matches the Figma "Desktop - Split - Medium" variant with full content hierarchy.',
      },
    },
  },
};

// Image on Left (Alternative Layout)
export const AlternateLayout: Story = {
  args: {
    ...Corporate.args,
    imagePosition: 'left',
    title: 'Innovation meets expertise in insurance solutions',
  },
  parameters: {
    docs: {
      description: {
        story: 'Alternative layout with image/video on the left side. Useful for creating visual variety across multiple hero sections.',
      },
    },
  },
};

// All Props
export const AllProps: Story = {
  args: {
    eyebrow: 'Featured',
    title: 'This hero banner showcases all available props',
    subtitle: 'With every configuration option',
    description: 'This variant demonstrates eyebrow text, headline, subtitle, description, primary and secondary CTAs, video background, custom height, image positioning, and animation controls.',
    primaryCta: {
      text: 'Primary Action',
      onClick: () => console.debug('Primary clicked'),
      icon: <DownloadIcon />,
    },
    secondaryCta: {
      text: 'Secondary Action',
      onClick: () => console.debug('Secondary clicked'),
      icon: <ArrowForwardIcon />,
    },
    videoSrc: '/video/hero-video.mp4',
    videoPoster: '/images/journey-aviation.jpg',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Full-featured hero banner example',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right',
    disableAnimations: false,
  },
};
