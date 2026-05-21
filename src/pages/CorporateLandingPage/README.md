# Corporate Landing Page - Future State

Implementation of the new Marsh corporate landing page based on the Figma design.

## 📍 Design Reference

- **Figma File**: Marsh Website New Concepts (future state)
- **Node ID**: 2897-45711
- **URL**: [View in Figma](https://www.figma.com/design/ULnjmsLeldESKVrCDn4tRA/Marsh-Website-New-Concepts--future-state-?node-id=2897-45711)

## 🏗️ Architecture

Built following MDS Platform guidelines:

### Design Tokens
- ✅ **Colors**: Role-based colors via `getRoleColor()` from `theme/roles.ts`
- ✅ **Spacing**: MDS spacing scale via `theme.spacing(n)` from `spacing.ts`
- ✅ **Typography**: MUI Typography with MDS font families
- ✅ **Grid**: MUI Grid2 with 12-column foundation

### Components Used
- **MUI Components**: Box, Container, Grid2, Typography, AppBar, Toolbar, Link
- **MDS Components**: DSButton (with proper role colors)
- **Icons**: MUI Icons (KeyboardArrowDown for scroll indicator)

## 📐 Layout Specifications

### Header
- **Position**: Sticky with backdrop blur
- **Background**: `rgba(206, 236, 255, 0.7)` (light blue with transparency)
- **Padding**: 48px horizontal (grid margin), 24px vertical
- **Height**: 92px (desktop)
- **Components**: Logo + Navigation links + Contact CTA button

### Hero Section
- **Height**: 980px (full viewport)
- **Background**: `#CEECFF` (secondary light blue)
- **Layout**: 6 columns / 6 columns split
  - **Left (6 cols)**: Content area with eyebrow, headline, CTA
  - **Right (6 cols)**: Empty space for hero image
- **Scroll Indicator**: Bottom center, gold button (#FFBF0D)

## 🎨 Typography

Following Figma design specs:

### Eyebrow Text
- Font: Marsh Serif
- Size: 24px
- Line Height: 32px
- Color: #3D3C37 (neutral)

### Main Headline
- Font: Marsh Serif
- Size: 56px (desktop), 40px (mobile)
- Line Height: 72px (desktop), 48px (mobile)
- Color: Primary blue (via role token)
- Max Width: 874px

## 🚀 Usage

```tsx
import { CorporateLandingPage } from './pages/CorporateLandingPage';

function App() {
  return <CorporateLandingPage />;
}
```

### Individual Components

```tsx
import { CorporateHeader } from './pages/CorporateLandingPage/Header';
import { HeroSection } from './pages/CorporateLandingPage/HeroSection';

// Use separately if needed
<CorporateHeader />
<HeroSection />
```

## 📋 Implementation Status

### ✅ Completed
- [x] Header component with navigation
- [x] Hero section with 6/6 grid layout and video
- [x] Scroll indicator button with smooth scroll
- [x] Four Brands Section with GSAP animations
- [x] Metrics Section with animated counters
- [x] Journey Section with image cards
- [x] M Arrow Animation test section
- [x] Video Section with Vimeo integration
- [x] FAQ Section with accordions
- [x] Talk to Experts CTA section
- [x] Footer with multi-column layout
- [x] MDS component integration
- [x] Role-based colors throughout
- [x] Proper spacing tokens
- [x] Background color transitions with GSAP

### 🚧 TODO - Refinements
- [ ] Remove debug markers from GSAP animations (set to false for production)
- [ ] Optimize hero video loading
- [ ] Add hero background image fallback
- [ ] Mobile responsive refinements (test on real devices)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance audit (Lighthouse)
- [ ] Cross-browser testing (Safari, Firefox, Edge)
- [ ] Add loading states for video sections
- [ ] Optimize GSAP ScrollTrigger instances
- [ ] Add error boundaries
- [ ] SEO meta tags and OpenGraph
- [ ] Analytics integration

### 🎯 Next Priorities
1. **Remove Debug Markers** - Clean up GSAP markers for production
2. **Performance Optimization** - Lazy load images, optimize videos
3. **Mobile Testing** - Ensure all sections work on mobile
4. **Accessibility Audit** - Run aXe, test with screen readers
5. **Deploy to Staging** - Test in production-like environment

## 🎯 Design Principles

1. **Atomic Design**: Composable, reusable components
2. **Token-First**: All colors via `getRoleColor()`, spacing via `theme.spacing()`
3. **Grid Foundation**: MUI Grid2 with 12-column system
4. **Responsive**: Mobile-first with breakpoint variants
5. **Accessibility**: Proper semantic HTML, ARIA labels

## 🔍 Quality Checks

Run these commands to validate:

```bash
# Check for token violations (no direct tokens.* usage)
npm run roles:check

# Run governance checks
npm run governance:ci

# Check contrast ratios
npm run tokens:contrast

# Run tests
npm test
```

## 📝 Notes

- Header uses backdrop blur for glassmorphism effect
- Hero section height is fixed at 980px per design
- Grid uses 48px margin on both sides
- Button uses MDS DSButton component with proper role colors
- Scroll indicator has smooth scroll behavior
- All measurements follow the MDS spacing scale

## 🤝 Contributing

When adding new sections:
1. Follow the same pattern (separate component files)
2. Use role-based colors exclusively
3. Apply MDS spacing tokens
4. Add proper TypeScript types
5. Document in this README
