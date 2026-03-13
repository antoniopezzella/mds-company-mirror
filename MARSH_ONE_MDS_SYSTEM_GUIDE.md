# Marsh One Homepage - MDS Design System Implementation Guide

## ✅ YES - We ARE Using MDS Components!

This guide ensures the new Marsh One homepage uses proper MDS components, spacing, grid, and typography following the new Marsh brand guidelines from Figma.

---

## 🎨 **Typography System**

### **Current MDS Fonts**
- **Display (Headings)**: `MMC Display` - Used globally in MDS for h1-h6
- **Body (Text)**: `Noto Sans` - Used for paragraphs, UI, buttons

### **New Marsh Brand Fonts (From Figma)**
- **Display**: `Marsh Serif` - For large hero headings, section titles, metrics
- **Body**: `Noto Sans` - Continues for body text and UI (✅ Already correct)

### **🔧 REQUIRED UPDATES: Typography Scale for New Marsh Brand**

The current h1-h6 scale is too small for the new Marsh One design. Here's what we need:

#### **Current Scale (Too Small)**
```scss
h1: fluid(36px → 56px)  // ❌ Figma hero is 96px!
h2: fluid(41px → 46px)  // ❌ Figma sections are 80px, 56px
h3: fluid(33px → 36px)
h4: fluid(27px → 30px)
h5: fluid(22px → 24px)
h6: fluid(18px → 20px)
```

#### **New Marsh Brand Scale (From Figma Design)**

**Update `/src/styles/_typography.scss`:**

```scss
// New Marsh Brand Scale - Marketing Website
$font-family-body: 'Noto Sans', sans-serif;
$font-family-display: 'MMC Display', sans-serif; // Global MDS display font

:root {
  /* Headings - New Marsh Brand Scale */
  --typo-h1-font-family: #{$font-family-display};
  --typo-h1-font-weight: 400; // Marsh Serif Regular
  --typo-h1-font-size: #{fluid(48, 96)}; // Hero headlines (min 48, max 96)
  --typo-h1-line-height: 1.0;
  --typo-h1-letter-spacing: -0.02em;

  --typo-h2-font-family: #{$font-family-display};
  --typo-h2-font-weight: 400;
  --typo-h2-font-size: #{fluid(40, 80)}; // Section headlines (min 40, max 80)
  --typo-h2-line-height: 1.1;
  --typo-h2-letter-spacing: -0.015em;

  --typo-h3-font-family: #{$font-family-display};
  --typo-h3-font-weight: 400;
  --typo-h3-font-size: #{fluid(32, 56)}; // Sub-section headlines (min 32, max 56)
  --typo-h3-line-height: 1.15;
  --typo-h3-letter-spacing: -0.01em;

  --typo-h4-font-family: #{$font-family-display};
  --typo-h4-font-weight: 400;
  --typo-h4-font-size: #{fluid(24, 40)}; // Card titles (min 24, max 40)
  --typo-h4-line-height: 1.2;
  --typo-h4-letter-spacing: -0.005em;

  --typo-h5-font-family: #{$font-family-body}; // Body font for smaller headings
  --typo-h5-font-weight: 600; // Semibold
  --typo-h5-font-size: #{fluid(18, 24)}; // Subheadings
  --typo-h5-line-height: 1.3;
  --typo-h5-letter-spacing: 0em;

  --typo-h6-font-family: #{$font-family-body};
  --typo-h6-font-weight: 600;
  --typo-h6-font-size: #{fluid(16, 20)}; // Small headings
  --typo-h6-line-height: 1.4;
  --typo-h6-letter-spacing: 0em;

  /* Body text sizes - Marketing focused */
  --typo-body-xl: #{fluid(20, 28)}; // Large body text
  --typo-body-lg: #{fluid(18, 22)}; // Medium body text
  --typo-body-md: #{fluid(16, 18)}; // Base body text
  --typo-body-sm: #{fluid(14, 16)}; // Small text
  --typo-body-xs: #{fluid(12, 14)}; // Extra small (legal, captions)
}
```

#### **Special Typography Sizes from Figma**
```typescript
// Use these for specific Marsh One sections:
- Hero headline: variant="h1" // 96px max
- Section headlines: variant="h2" // 80px max  
- Sub-sections: variant="h3" // 56px max
- Card titles: variant="h4" // 40px max
- Metrics numbers: Custom 104px (use sx={{ fontSize: '104px' }})
- Body large: variant="body1" with fontSize override to 20-28px
- Legal text: variant="caption" // 14px
```

---

## 📐 **Spacing System (Already Perfect!)**

**✅ Use `theme.spacing(n)` everywhere - NO hardcoded pixels!**

### **MDS Spacing Scale**
```typescript
spacing[0] = 4px   → theme.spacing(0.5) or spacing(1/2)
spacing[1] = 8px   → theme.spacing(1)
spacing[2] = 16px  → theme.spacing(2)
spacing[3] = 24px  → theme.spacing(3) // Most common
spacing[4] = 32px  → theme.spacing(4)
spacing[5] = 40px  → theme.spacing(5)
spacing[6] = 48px  → theme.spacing(6)
spacing[7] = 56px  → theme.spacing(7)
spacing[8] = 64px  → theme.spacing(8)
spacing[9] = 80px  → theme.spacing(10)
spacing[10] = 96px → theme.spacing(12)
```

### **Marsh One Design Spacing Mapping**
```typescript
// From Figma design:
- Page margins: theme.spacing(6)       // 48px
- Section padding: theme.spacing(12)   // 96px
- Card gaps: theme.spacing(4)          // 32px
- Content gaps: theme.spacing(3)       // 24px  
- Element gaps: theme.spacing(2)       // 16px
- Tight spacing: theme.spacing(1)      // 8px
```

**Example Usage:**
```tsx
<Box sx={{ 
  p: (theme) => theme.spacing(6),  // padding: 48px
  gap: (theme) => theme.spacing(4), // gap: 32px
  mb: (theme) => theme.spacing(3)   // margin-bottom: 24px
}}>
```

---

## 🎨 **Color System - Use `getRoleColor()` Only!**

**✅ NEVER use hardcoded hex colors - Always use semantic roles**

### **Marsh One Color Mapping**

```typescript
import { getRoleColor } from 'src/theme/roles';

// Figma → MDS Role Mapping:
#000F47 (dark blue)   → getRoleColor('surface.navigation')  // Header after scroll, Footer
#CEECFF (light blue)  → getRoleColor('surface.secondary')   // Hero background, nav text  
#D2EBFE (sky blue)    → getRoleColor('surface.accent')      // Expertise section
#FFBF0D (gold)        → getRoleColor('interactive.warning') // Primary buttons, metrics
#77D3FF (bright blue) → getRoleColor('text.link')           // Hover states, links
#F7F3EE (beige)       → getRoleColor('surface.default')     // FAQ background
white                 → getRoleColor('text.onPrimary')      // Text on dark backgrounds
#3D3C37 (dark gray)   → getRoleColor('text.primary')        // Body text on light
```

**Example Usage:**
```tsx
<Box sx={{ 
  backgroundColor: getRoleColor('surface.navigation'),
  color: getRoleColor('text.onPrimary'),
  '&:hover': {
    backgroundColor: getRoleColor('surface.navigation.hover')
  }
}}>
```

---

## 📱 **Responsive Grid System**

**✅ Use MUI Grid2 or Box with responsive breakpoints**

### **MDS Breakpoints**
```typescript
xs: 0px      // Mobile portrait
sm: 600px    // Mobile landscape  
md: 900px    // Tablet
lg: 1200px   // Desktop
xl: 1536px   // Large desktop
```

### **Marsh One Responsive Layout**

```tsx
import { Container, Box, Grid2 } from '@mui/material';

// Full-width sections with max-width container
<Box sx={{ width: '100%', backgroundColor: getRoleColor('surface.accent') }}>
  <Container 
    maxWidth="xl" // 1536px max (or "lg" for 1200px)
    sx={{ 
      px: { xs: 2, sm: 3, md: 6 }, // Responsive padding: 16px → 24px → 48px
      py: { xs: 4, md: 12 }         // Responsive padding: 32px → 96px
    }}
  >
    {/* Content here */}
  </Container>
</Box>

// Responsive card grid
<Grid2 container spacing={{ xs: 2, md: 4 }}> {/* 16px → 32px gap */}
  <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
    {/* Full width mobile, 2-col tablet, 3-col desktop */}
  </Grid2>
</Grid2>

// Or using Box with flexbox
<Box sx={{ 
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' }, // Stack mobile, row desktop
  gap: (theme) => ({ xs: theme.spacing(2), md: theme.spacing(4) })
}}>
```

---

## 🧩 **MDS Components to Use**

### **✅ Always Use These MDS Components:**

#### **1. Layout Components**
```tsx
import { Container, Box, Stack } from '@mui/material';

// Container for max-width sections
<Container maxWidth="xl" />

// Box for custom layouts
<Box sx={{ display: 'flex', gap: 3 }} />

// Stack for vertical/horizontal layouts
<Stack direction="row" spacing={3} />
```

#### **2. Typography Components**
```tsx
import { Typography } from '@mui/material';

// Headings
<Typography variant="h1">Hero Headline</Typography>
<Typography variant="h2">Section Title</Typography>
<Typography variant="h4">Card Title</Typography>

// Body text
<Typography variant="body1">Paragraph text</Typography>
<Typography variant="caption">Legal text</Typography>
```

#### **3. Existing MDS Components**
```tsx
import { Button } from 'src/components/Button/Button';
import { Accordion } from 'src/components/Accordion/Accordion';
import { Header } from 'src/components/Header/Header';

// Button with variants
<Button variant="primary" size="lg">Sign in</Button>
<Button variant="secondary" size="md">Contact Sales</Button>

// Accordion for FAQ
<Accordion 
  items={faqItems}
  variant="default"
  allowMultiple={false}
/>
```

---

## 🚀 **Marsh One Implementation Pattern**

### **✅ Correct Pattern (Using MDS System)**

```tsx
import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { getRoleColor } from 'src/theme/roles';
import { Button } from 'src/components/Button/Button';

export const HeroSection: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '1000px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: getRoleColor('surface.secondary'),
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container 
        maxWidth="xl"
        sx={{ 
          px: { xs: 2, md: 6 }, // theme.spacing(2) → theme.spacing(6)
          py: { xs: 6, md: 12 }  // 48px → 96px
        }}
      >
        <Stack spacing={3} alignItems="center">
          {/* Overline */}
          <Typography 
            variant="h5" 
            sx={{ 
              color: getRoleColor('text.onPrimary'),
              textTransform: 'none'
            }}
          >
            Clarity for the risks that matter most.
          </Typography>

          {/* Hero Headline */}
          <Typography 
            variant="h1"
            align="center"
            sx={{ 
              color: getRoleColor('text.onPrimary'),
              maxWidth: '1200px'
            }}
          >
            AI-powered insights, backed by Marsh's global expertise.
          </Typography>

          {/* AI Search Input */}
          <Box sx={{ 
            backgroundColor: 'white',
            borderRadius: '4px',
            p: (theme) => theme.spacing(2),
            width: '100%',
            maxWidth: '971px'
          }}>
            {/* Search implementation */}
          </Box>

          {/* Suggestion Chips */}
          <Stack direction="row" spacing={2}>
            <Button variant="tertiary" size="md">
              Personalized question?
            </Button>
            <Button variant="tertiary" size="md">
              What is right solution for my company?
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
```

### **❌ AVOID - Don't Use Tailwind Classes**

```tsx
// ❌ DON'T DO THIS:
<div className="bg-[#CEECFF] p-[48px] w-[1920px]">
  <p className="text-[96px] font-['Marsh_Serif']">Headline</p>
</div>

// ✅ DO THIS INSTEAD:
<Box sx={{ 
  backgroundColor: getRoleColor('surface.secondary'),
  p: (theme) => theme.spacing(6),
  width: '100%'
}}>
  <Typography variant="h1">Headline</Typography>
</Box>
```

---

## 📋 **Implementation Checklist for Marsh One**

### **Typography**
- [ ] Update `_typography.scss` with new Marsh Serif display scale (h1: 96px, h2: 80px, etc.)
- [ ] Test font loading for Marsh Serif
- [ ] Use `variant="h1"` through `variant="h6"` consistently
- [ ] Never hardcode `fontSize` unless for special cases (104px metrics)

### **Spacing**
- [ ] Use `theme.spacing(n)` everywhere
- [ ] Map Figma spacing to MDS scale (48px = 6, 96px = 12, etc.)
- [ ] Use responsive spacing objects: `{ xs: 2, md: 6 }`
- [ ] NO hardcoded pixel values in sx prop

### **Colors**
- [ ] Use `getRoleColor()` for all colors
- [ ] Map Figma colors to semantic roles
- [ ] Test light/dark mode support
- [ ] Use hover/active state roles

### **Grid/Layout**
- [ ] Use `Container maxWidth="xl"` for page sections
- [ ] Use `Grid2` or `Stack` for card layouts
- [ ] Add responsive breakpoints: `{ xs: 12, sm: 6, lg: 4 }`
- [ ] Test on mobile (375px), tablet (768px), desktop (1440px+)

### **Components**
- [ ] Use existing Button component
- [ ] Use existing Accordion for FAQ
- [ ] Use existing Header (customize for Marsh One)
- [ ] Use MUI Typography, Box, Container, Stack
- [ ] NO custom styled-components unless absolutely necessary

---

## 🎯 **Action Items**

1. **Update Typography** - Modify `_typography.scss` with new Marsh Serif scale
2. **Create Typography Demo** - Test page showing all h1-h6 variants
3. **Document Color Mapping** - Complete Figma → getRoleColor() mapping table
4. **Build Component Library** - Marsh One specific components following MDS patterns
5. **Responsive Testing** - Test all breakpoints on real devices

---

## 📚 **Key Files to Reference**

- **Typography**: `/src/styles/_typography.scss`
- **Theme**: `/src/theme.ts`
- **Spacing**: `/src/spacing.ts`
- **Colors**: `/src/theme/roles.ts`
- **Components**: `/src/components/*/`
- **Examples**: `/src/pages/CorporateLandingPage/`

---

## 💡 **Pro Tips**

1. **Typography**: Marsh One uses `fontFamily: 'Marsh Serif', sans-serif` while the global MDS uses `MMC Display`
2. **Fluid Typography**: Our `fluid()` function auto-scales between mobile and desktop - use it!
3. **Spacing Shortcuts**: `p: 3` = `padding: theme.spacing(3)` = 24px
4. **Color IntelliSense**: VSCode autocomplete works with `getRoleColor('surface.` ← shows all options
5. **Responsive Props**: Most MUI props accept `{ xs, sm, md, lg, xl }` objects

---

**✅ Following this guide ensures pixel-perfect Marsh One homepage implementation using proper MDS components, spacing, grid, and the new Marsh brand typography!**
