# Marsh One Project

Implementation of the Marsh One homepage design from Figma.

## 📁 Structure

```
src/projects/marsh-one/
├── components/          # Reusable section components
│   ├── Hero.tsx        # AI-powered search hero section
│   ├── ExpertiseCards.tsx  # Service area showcase cards
│   ├── Stats.tsx       # Company metrics section
│   └── ContentCards.tsx    # Large content/report cards
├── pages/              # Complete page compositions
│   └── MarshOneHomepage.tsx  # Full landing page
└── README.md
```

## 🎨 Design System Integration

All components leverage the Marsh Design System:

### Color Tokens
- **Midnight-1000** (`#000F47`) - Primary dark, hero backgrounds
- **Gold-750** (`#FFBF00`) - Primary accent, CTAs, highlights
- **Sky-250** (`#CEECFF`) - Light accents
- **Neutral scales** - Borders, subtle backgrounds

### Component Usage
- Uses MUI base components (Box, Container, Typography, Grid, Card)
- Custom styling via `sx` prop and theme spacing
- Role-based colors via `getRoleColor()` helper

## 📊 Components

### Hero
AI-powered search interface with:
- Full-width background image with overlay
- Prominent headline and search bar
- Suggested search chips
- "MARSH AI" branded input

**Props:**
- `headline` - Main hero text
- `subheadline` - Supporting text
- `backgroundImage` - Hero image URL
- `searchPlaceholder` - Search input placeholder
- `suggestions` - Array of chip labels

### ExpertiseCards
Three-column card grid featuring:
- Large imagery with aspect ratio preservation
- Gold star badge overlay
- Hover scale animation
- Responsive stacking

**Props:**
- `title` - Section headline
- `subtitle` - Section description
- `cards` - Array of `{ title, description, image, imageAlt }`

### Stats
Company metrics with large numbers:
- Dark blue background
- Gold-colored statistics
- Tabular number formatting
- Responsive 3-column layout

**Props:**
- `headline` - Section headline
- `description` - Descriptive text
- `stats` - Array of `{ value, label, suffix }`

### ContentCards
Large content/report cards:
- Background images with gradient overlays
- Text positioned at bottom
- Hover brightness effect
- Clickable with href support

**Props:**
- `headline` - Section headline
- `description` - Section description
- `cards` - Array of `{ title, description, image, href }`

## 🚀 Usage

### In Storybook
```bash
npm run storybook
```
Navigate to: **Projects > Marsh One**

### In Your App
```tsx
import MarshOneHomepage from './projects/marsh-one/pages/MarshOneHomepage';

function App() {
  return <MarshOneHomepage />;
}
```

### Individual Components
```tsx
import Hero from './projects/marsh-one/components/Hero';

function MyPage() {
  return (
    <Hero
      headline="Custom headline"
      suggestions={['Option 1', 'Option 2']}
    />
  );
}
```

## 🎯 Figma Design Reference

**File:** OneWeb - Design Concepts - Flows  
**Node ID:** 148:1837  
**URL:** https://www.figma.com/design/NlOtqWmmgMyHdxB0T8bR7d/OneWeb---Design-Concepts---Flows?node-id=148-1837

## ✅ Status

- [x] Hero section component
- [x] Expertise Cards component
- [x] Stats section component
- [x] Content Cards component
- [x] Complete homepage composition
- [x] Storybook stories for all components
- [x] Responsive behavior
- [x] Design system token integration

## 📝 Notes

- All components are fully typed with TypeScript
- Uses existing design system tokens (no hardcoded colors)
- Follows accessibility best practices (WCAG 2.2 AA)
- Placeholder images from Unsplash (replace with real assets)
- Components are composable and can be used independently

## 🔄 Next Steps

1. Replace placeholder images with actual Marsh assets
2. Add FAQ accordion section (visible in Figma)
3. Add footer navigation
4. Implement actual search functionality
5. Connect to backend APIs for dynamic content
6. Add animation/transitions with GSAP (if desired)
7. Set up routing for clickable card links
