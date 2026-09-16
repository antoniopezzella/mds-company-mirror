# Button Component Update - Figma V3 Naming Convention

**Date:** May 20, 2026  
**Status:** ✅ Complete

---

## 🎯 Changes Summary

### 1. **Button Variant Renaming**

Renamed `accent` → `primaryAlt` to match Figma naming convention:

| Old Name | New Name | Figma Name | Usage | Color |
|----------|----------|------------|-------|-------|
| `primary` | `primary` | Primary | Dashboards & standard CTAs | Midnight Blue (#002c77) |
| `accent` | **`primaryAlt`** | **Primary Alt** | Hero banners & marketing CTAs | **Gold (#ffb700)** |
| `secondary` | `secondary` | Secondary | Secondary actions | Outline (midnight blue border) |
| `tertiary` | `tertiary` | Tertiary | Minimal actions | Transparent/ghost |

### 2. **Backward Compatibility**

Legacy aliases maintained:
- `variant="accent"` → automatically maps to `primaryAlt`
- `variant="outline"` → automatically maps to `secondary`
- `variant="ghost"` → automatically maps to `tertiary`

### 3. **Updated Files**

#### Button Component (`src/components/Button/Button.tsx`)
- ✅ Updated TypeScript interface with new variant types
- ✅ Updated JSDoc documentation with Figma mapping
- ✅ Updated normalization logic for legacy aliases
- ✅ Renamed switch case `'accent'` → `'primaryAlt'`
- ✅ Fixed destructive state logic for `primaryAlt`

#### Button Stories (`src/components/Button/Button.stories.tsx`)
- ✅ Updated argTypes control options
- ✅ Updated Figma V3 variant documentation
- ✅ Updated Figma mapping table
- ✅ Updated usage examples in MDX
- ✅ Updated all story examples (`AllVariants`, `CompleteShowcase`)
- ✅ Updated all interactive examples (default, destructive, disabled, loading states)

#### Hero Banner (`src/components/sections/HeroBanner/HeroBanner.tsx`)
- ✅ Added CSS Module import (`HeroBanner.module.scss`)
- ✅ Updated secondary button: `variant="outline"` → `variant="secondary"`
- ✅ Updated JSDoc for `primaryCta` prop (recommends `primaryAlt` for hero/marketing)

#### New CSS Module (`src/components/sections/HeroBanner/HeroBanner.module.scss`)
- ✅ Created with Bootstrap grid integration
- ✅ Uses SASS typography mixins (`@include typo.apply-variant()`)
- ✅ Responsive font sizing with `clamp()`
- ✅ Proper gradient overlays for accessibility
- ✅ Mobile-first responsive breakpoints

---

## 📐 Figma Alignment

### Button Type Property Mapping

| Figma Type | React Prop | Description |
|------------|------------|-------------|
| **Primary** | `variant="primary"` | Midnight Blue fill - For dashboards & standard CTAs |
| **Primary Alt** | `variant="primaryAlt"` | Gold fill - For hero banners & marketing CTAs |
| **Secondary** | `variant="secondary"` | Outline with midnight blue border - Secondary actions |
| **Tertiary** | `variant="tertiary"` | Transparent/ghost - Minimal actions |

### Figma Design References

- **Primary Alt (Gold):** [Figma Link](https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo/V3---MDS-COMPONENTS?m=auto&node-id=9749-3234)
- **Primary (Blue):** [Figma Link](https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo/V3---MDS-COMPONENTS?m=auto&node-id=7579-139)

---

## 🧪 Testing Status

### TypeScript
- ✅ No compile errors
- ✅ Type narrowing for `normalizedVariant` works correctly
- ✅ Destructive state logic type-safe

### Storybook
- ✅ Running on `http://localhost:6007/`
- ✅ Hot module replacement (HMR) working
- ✅ All button stories updated
- ✅ Complete showcase includes all variants + states

### Components Using Updated Button

| Component | Current Variant | Status | Notes |
|-----------|----------------|--------|-------|
| `HeroBanner` (primary CTA) | `primary` | ✅ Updated | Can use `primaryAlt` for gold or `primary` for blue |
| `HeroBanner` (secondary CTA) | `secondary` | ✅ Updated | Changed from `outline` (legacy alias still works) |

---

## 🎨 Usage Examples

### Hero/Marketing CTAs (Gold)
```tsx
<DSButton variant="primaryAlt" size="lg">
  Download Report
</DSButton>
```

### Dashboard CTAs (Blue)
```tsx
<DSButton variant="primary" size="lg">
  Save Changes
</DSButton>
```

### Secondary Actions (Outline)
```tsx
<DSButton variant="secondary" size="md">
  Learn More
</DSButton>
```

### Tertiary/Minimal Actions
```tsx
<DSButton variant="tertiary" size="md">
  Cancel
</DSButton>
```

### Destructive Actions
```tsx
<DSButton variant="primary" destructive size="md">
  Delete Account
</DSButton>
```

---

## 📊 Governance Status

### Role Token Usage
- ✅ All colors use `getRoleColor()` 
- ✅ No direct token references (`tokens.*` or `semanticColors.*`)
- ✅ Passes `npm run roles:check`

### Contrast Validation
- ✅ All button variants pass WCAG AA (4.5:1 for normal text)
- ✅ Destructive states use proper red tokens
- ✅ Inverse mode adapts for dark backgrounds

---

## 🚀 Next Steps

### Recommended Actions
1. **Review in Storybook**: Visual inspection of all button variants
2. **Test Hero Banner**: Verify button rendering in hero context
3. **Deploy to Production**: Build Storybook and deploy via Vercel
4. **Update Documentation**: Communicate naming change to team

### Future Enhancements
- Complete HeroBanner refactor to use CSS Module classes
- Replace all MUI Box/Typography with semantic HTML + SASS
- Create grid utility classes in global styles

---

## 📝 Breaking Changes

### None - Fully Backward Compatible

All legacy variant names still work via normalization:
- `variant="accent"` → maps to `primaryAlt`
- `variant="outline"` → maps to `secondary`  
- `variant="ghost"` → maps to `tertiary`

**Migration Timeline:** No action required. Teams can migrate to new names at their convenience.

---

**Storybook:** http://localhost:6007/?path=/docs/components-button--docs  
**Production URL:** https://marsh-design-system.vercel.app/ (pending deployment)
