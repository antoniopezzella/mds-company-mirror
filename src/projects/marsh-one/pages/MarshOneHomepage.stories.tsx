import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarshOneHomepage } from './MarshOneHomepage';
import '../../../index.css';
import '../../../styles/_typography.scss';

const meta: Meta<typeof MarshOneHomepage> = {
  title: 'Projects/Marsh One/Pages/Homepage',
  component: MarshOneHomepage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Marsh One Homepage

Complete implementation of the Marsh One landing page from Figma design.

## Design System Integration

All components use the Marsh Design System tokens:

- **Colors:** Midnight-1000 (#000F47), Gold-750 (#FFBF00), Sky-250 (#CEECFF)
- **Typography:** System font stack with responsive sizing
- **Spacing:** Theme spacing function (4px grid)
- **Shadows:** Consistent elevation system

## Sections

1. **Hero** - AI-powered search with dark overlay
2. **Expertise Cards** - 3-column grid with star badges
3. **Stats** - Key metrics on dark background
4. **Content Cards** - Large imagery with overlays

## Responsive Behavior

- **Desktop (1200px+):** Full 3-column layouts
- **Tablet (768-1199px):** 2-column or stacked
- **Mobile (<768px):** Single column, optimized touch targets

## Accessibility

- ✅ WCAG 2.2 AA color contrast
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MarshOneHomepage>;

/**
 * The complete Marsh One homepage as seen in the Figma design.
 * Combines Hero, Expertise Cards, Stats, and Content Cards sections.
 */
export const Default: Story = {};

/**
 * Homepage view optimized for mobile devices.
 * All sections stack vertically with appropriate touch targets.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Homepage view on tablet devices.
 * Sections adapt to 2-column layouts where appropriate.
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
