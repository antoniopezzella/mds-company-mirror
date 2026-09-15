# MDS Grid System - Epic Documentation

## Overview

The Marsh Design System (MDS) Grid is a Bootstrap 5.3-compatible, CSS Grid-based layout system that provides a robust, accessible, and scalable foundation for responsive layouts.

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Getting Started](#getting-started)
3. [Basic Usage](#basic-usage)
4. [Advanced Features](#advanced-features)
5. [Responsive Design](#responsive-design)
6. [Accessibility](#accessibility)
7. [API Reference](#api-reference)
8. [Best Practices](#best-practices)
9. [Migration Guide](#migration-guide)

---

## Core Concepts

### Foundation
- **12-Column Grid System**: Standard Bootstrap-compatible 12-column layout
- **CSS Grid-Based**: Modern CSS Grid implementation for better performance and flexibility
- **Bootstrap 5.3 Compatible**: Drop-in replacement with identical class names
- **WCAG 2.1 AA Compliant**: Rem-based spacing scales with user font-size preferences

### Key Variables
```scss
$grid-columns: 12              // Standard 12-column grid
$grid-gutter-width: 1.5rem     // 24px at 16px base, scales with user font-size
$base-unit: 0.25rem            // 4px at 16px base, foundation for spacing scale
```

### Breakpoints
```scss
xs:  0px      // Mobile (default)
sm:  576px    // Small devices
md:  768px    // Tablets
lg:  992px    // Desktops
xl:  1200px   // Large desktops
xxl: 1400px   // Extra large displays
```

### Container Max Widths
```scss
sm:  540px
md:  720px
lg:  960px
xl:  1140px
xxl: 1320px
```

---

## Getting Started

### Installation

The grid system is pre-installed in MDS. Import it in your SCSS:

```scss
@use 'src/styles/_grid' as grid;
```

### Basic HTML Structure

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6">Column 1</div>
    <div class="col-12 col-md-6">Column 2</div>
  </div>
</div>
```

### React/TSX Example

```tsx
<div className="container">
  <div className="row">
    <div className="col-12 col-lg-6">
      <h1>Content</h1>
    </div>
    <div className="col-12 col-lg-6">
      <img src="image.jpg" alt="Visual" />
    </div>
  </div>
</div>
```

---

## Basic Usage

### 1. Containers

#### Standard Container
Centered content with max-width constraints:
```html
<div class="container">
  <!-- Content -->
</div>
```

#### Fluid Container
Full-width with consistent padding:
```html
<div class="container-fluid">
  <!-- Content -->
</div>
```

### 2. Rows

Create a grid row with automatic gutter spacing:
```html
<div class="row">
  <!-- Columns -->
</div>
```

#### Custom Gap
```html
<div class="row gap-8">
  <!-- 32px gap between columns -->
</div>
```

### 3. Columns

#### Fixed Width Columns
```html
<div class="col-6">50% width</div>
<div class="col-4">33.33% width</div>
<div class="col-3">25% width</div>
```

#### Auto Width Columns
```html
<div class="col">Equal width, flexible</div>
<div class="col-auto">Fits content width</div>
```

#### Responsive Columns
```html
<!-- Full width on mobile, half on tablets, third on desktops -->
<div class="col-12 col-md-6 col-lg-4">
  Content
</div>
```

---

## Advanced Features

### 1. Grid Template Columns

Define custom column counts (not Bootstrap-compatible):

```html
<!-- 3-column grid -->
<div class="grid-cols-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Responsive: 1 column mobile, 3 desktop -->
<div class="grid-cols-1 grid-cols-lg-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### 2. Row Spanning

Make items span multiple rows:

```html
<div class="grid-cols-3 grid-rows-3">
  <div class="row-span-2">Tall item</div>
  <div>Normal</div>
  <div>Normal</div>
</div>
```

### 3. Offset Columns

Push columns to the right:

```html
<!-- Center a 6-column item -->
<div class="col-6 offset-3">
  Centered content
</div>

<!-- Responsive offset -->
<div class="col-12 col-md-6 offset-md-3">
  Centered on desktop only
</div>
```

### 4. Column Ordering

Change visual order without changing HTML:

```html
<div class="row">
  <div class="col order-2">Appears second</div>
  <div class="col order-1">Appears first</div>
</div>
```

### 5. Auto-Fit Grid

Automatically fill space with items of minimum width:

```html
<!-- Cards that automatically wrap -->
<div class="grid-auto-fit-md">
  <!-- min-width: 300px, fills available space -->
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

Variants:
- `grid-auto-fit`: 150px minimum
- `grid-auto-fit-sm`: 200px minimum
- `grid-auto-fit-md`: 300px minimum
- `grid-auto-fit-lg`: 400px minimum

### 6. Asymmetric Layouts

Pre-built layouts for common patterns:

```html
<!-- Sidebar + content -->
<div class="grid-cols-sidebar">
  <aside>Sidebar (250px)</aside>
  <main>Main content (flexible)</main>
</div>

<!-- 2/3 + 1/3 split -->
<div class="grid-cols-two-thirds">
  <main>Main (2/3)</main>
  <aside>Sidebar (1/3)</aside>
</div>
```

---

## Responsive Design

### Mobile-First Approach

Start with mobile styles, add complexity with breakpoints:

```html
<div class="col-12 col-sm-6 col-md-4 col-lg-3">
  <!-- 
    Mobile (xs): Full width (12/12)
    Small (sm): Half width (6/12)
    Medium (md): Third width (4/12)
    Large (lg): Quarter width (3/12)
  -->
</div>
```

### Responsive Gaps

```html
<!-- Small gap on mobile, large on desktop -->
<div class="row gap-2 gap-lg-8">
  <div class="col">Item</div>
</div>
```

### Responsive Visibility

```html
<!-- Hide on mobile, show on desktop -->
<div class="hidden-xs visible-lg">
  Desktop only content
</div>

<!-- Show on mobile, hide on desktop -->
<div class="visible-xs hidden-lg">
  Mobile only content
</div>
```

---

## Accessibility

### WCAG 2.1 AA Compliance

1. **Rem-Based Spacing**: All sizing uses `rem` units that scale with user's browser font-size setting
2. **Touch Targets**: Minimum 44x44px touch targets in grid spacing
3. **Responsive Zoom**: Grid adapts to 200% zoom without horizontal scrolling
4. **Semantic HTML**: Use proper heading hierarchy and landmark elements

### Best Practices

```html
<!-- ✅ Good: Semantic landmarks with grid -->
<header class="container">
  <div class="row">...</div>
</header>

<main class="container">
  <section class="row">...</section>
</main>

<!-- ❌ Bad: Grid without semantic structure -->
<div class="container">
  <div class="row">
    <div class="col">heading text</div>
  </div>
</div>
```

---

## API Reference

### Container Classes

| Class | Description |
|-------|-------------|
| `.container` | Centered container with responsive max-width |
| `.container-fluid` | Full-width container with padding |

### Row Classes

| Class | Description |
|-------|-------------|
| `.row` | 12-column grid row with default gutter |
| `.row-auto` | Auto-fit grid with customizable min-width |
| `.row-cols-N` | Equal-width columns (N = 1-6) |
| `.row-flush` | Negative margins to extend to edge |
| `.row-no-gap` | Remove all gaps |
| `.no-gutters` | Bootstrap-style alias for no gaps |

### Column Classes

| Pattern | Description | Example |
|---------|-------------|---------|
| `.col` | Auto-width, equal flex | `<div class="col">` |
| `.col-N` | Span N columns (1-12) | `<div class="col-6">` |
| `.col-{bp}-N` | Responsive column span | `<div class="col-md-6">` |
| `.col-auto` | Fit content width | `<div class="col-auto">` |
| `.offset-N` | Offset by N columns | `<div class="offset-3">` |
| `.offset-{bp}-N` | Responsive offset | `<div class="offset-md-3">` |

### Gap Utilities

| Class | Size | Use Case |
|-------|------|----------|
| `.gap-0` | 0px | No spacing |
| `.gap-1` | 4px | Minimal spacing |
| `.gap-2` | 8px | Compact layouts |
| `.gap-3` | 12px | Small spacing |
| `.gap-4` | 16px | Default spacing |
| `.gap-6` | 24px | Medium spacing |
| `.gap-8` | 32px | Large spacing |
| `.gap-12` | 48px | Extra large spacing |
| `.gap-16` | 64px | Section spacing |
| `.gap-20` | 80px | Major section spacing |
| `.gap-24` | 96px | Hero spacing |

Directional gaps: `.gap-x-N`, `.gap-y-N`, `.gx-N`, `.gy-N`

### Grid Template Classes

| Class | Description |
|-------|-------------|
| `.grid-cols-N` | N-column grid template (1-12) |
| `.grid-rows-N` | N-row grid template (1-6) |
| `.grid-cols-{bp}-N` | Responsive column template |
| `.row-span-N` | Span N rows (1-6) |
| `.row-span-full` | Span all rows |

### Alignment Utilities

| Class | Description |
|-------|-------------|
| `.align-start` | Align items to start |
| `.align-center` | Align items to center |
| `.align-end` | Align items to end |
| `.justify-start` | Justify items to start |
| `.justify-center` | Justify items to center |
| `.justify-end` | Justify items to end |
| `.place-items-center` | Center items both axes |
| `.place-content-center` | Center content both axes |

### Ordering Utilities

| Class | Description |
|-------|-------------|
| `.order-N` | Set order (0-12) |
| `.order-first` | Move to first position |
| `.order-last` | Move to last position |
| `.order-{bp}-N` | Responsive ordering |

---

## Best Practices

### 1. Use Semantic HTML

```html
<!-- ✅ Good -->
<article class="row">
  <header class="col-12">
    <h2>Article Title</h2>
  </header>
  <section class="col-12 col-lg-8">
    <p>Content...</p>
  </section>
  <aside class="col-12 col-lg-4">
    <nav>Related links</nav>
  </aside>
</article>

<!-- ❌ Avoid -->
<div class="row">
  <div class="col-12">Article Title</div>
  <div class="col-12 col-lg-8">Content...</div>
  <div class="col-12 col-lg-4">Related</div>
</div>
```

### 2. Mobile-First Design

Always start with mobile layout, enhance for larger screens:

```html
<!-- ✅ Good: Mobile-first -->
<div class="col-12 col-md-6 col-lg-4">
  <!-- Stacks on mobile, 2 columns tablet, 3 columns desktop -->
</div>

<!-- ❌ Avoid: Desktop-first thinking -->
<div class="col-lg-4">
  <!-- Will be 4 columns on all screen sizes -->
</div>
```

### 3. Consistent Spacing

Use the spacing scale consistently:

```html
<!-- ✅ Good: Consistent scale -->
<div class="row gap-6">  <!-- 24px -->
  <div class="col gap-4"> <!-- 16px internal -->
    ...
  </div>
</div>

<!-- ❌ Avoid: Arbitrary values -->
<div class="row" style="gap: 23px">
  ...
</div>
```

### 4. Avoid Over-Nesting

```html
<!-- ✅ Good: Flat structure -->
<div class="container">
  <div class="row">
    <div class="col-6">A</div>
    <div class="col-6">B</div>
  </div>
</div>

<!-- ❌ Avoid: Unnecessary nesting -->
<div class="container">
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-6">A</div>
        <div class="col-6">B</div>
      </div>
    </div>
  </div>
</div>
```

### 5. Use Grid Template for Complex Layouts

For non-12-column layouts, use grid templates:

```html
<!-- ✅ Good: Grid template for 5 columns -->
<div class="grid-cols-5 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</div>

<!-- ❌ Avoid: Fighting the 12-column grid -->
<div class="row">
  <div class="col-2-4">1</div> <!-- Not standard -->
</div>
```

---

## Migration Guide

### From Bootstrap 4/5

The MDS Grid is a drop-in replacement:

```html
<!-- Bootstrap code works as-is -->
<div class="container">
  <div class="row">
    <div class="col-md-8">Main</div>
    <div class="col-md-4">Sidebar</div>
  </div>
</div>
```

**Differences:**
- Uses CSS Grid instead of Flexbox (better performance)
- Additional utilities not in Bootstrap (grid-cols, row-span, etc.)
- Subgrid support for perfect alignment

### From Material-UI Grid

Replace MUI Grid with MDS classes:

```tsx
// Before (Material-UI)
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    <Box>Content</Box>
  </Grid>
</Grid>

// After (MDS Grid)
<div className="row gap-3">
  <div className="col-12 col-md-6">
    <Box>Content</Box>
  </div>
</div>
```

**Benefits:**
- Lighter weight (no JS required)
- Faster rendering (native CSS Grid)
- Better accessibility (proper HTML structure)

### From Custom CSS Grid

```css
/* Before: Custom CSS */
.custom-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .custom-grid {
    grid-template-columns: 1fr;
  }
}
```

```html
<!-- After: MDS Classes -->
<div class="grid-cols-1 grid-cols-md-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## Examples

### Example 1: Hero Section

```html
<section class="container-fluid">
  <div class="row align-center" style="min-height: calc(100vh - 92px);">
    <div class="col-12 col-lg-6">
      <h1>Headline Text</h1>
      <p>Description</p>
      <button>CTA Button</button>
    </div>
    <div class="col-12 col-lg-6">
      <img src="hero.jpg" alt="Hero image" />
    </div>
  </div>
</section>
```

### Example 2: Card Grid

```html
<div class="container">
  <div class="grid-auto-fit-md gap-6">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
  </div>
</div>
```

### Example 3: Dashboard Layout

```html
<div class="container-fluid">
  <div class="grid-cols-sidebar gap-6">
    <aside>
      <nav>Navigation</nav>
    </aside>
    <main>
      <div class="grid-cols-1 grid-cols-md-2 grid-cols-xl-3 gap-4">
        <div class="widget">Widget 1</div>
        <div class="widget">Widget 2</div>
        <div class="widget">Widget 3</div>
      </div>
    </main>
  </div>
</div>
```

### Example 4: Responsive Form

```html
<form class="container">
  <div class="row gap-4">
    <div class="col-12 col-md-6">
      <label>First Name</label>
      <input type="text" />
    </div>
    <div class="col-12 col-md-6">
      <label>Last Name</label>
      <input type="text" />
    </div>
    <div class="col-12">
      <label>Email</label>
      <input type="email" />
    </div>
    <div class="col-12">
      <button type="submit">Submit</button>
    </div>
  </div>
</form>
```

---

## Troubleshooting

### Issue: Columns not aligning properly

**Cause**: Nested rows without proper structure

**Solution**: Ensure each `.row` is a direct child of a container:
```html
<!-- ✅ Correct -->
<div class="container">
  <div class="row">
    <div class="col-6">...</div>
  </div>
</div>

<!-- ❌ Incorrect -->
<div class="container">
  <div>
    <div class="row">...</div>
  </div>
</div>
```

### Issue: Gaps not appearing

**Cause**: CSS specificity override

**Solution**: Use `!important` or increase specificity:
```scss
.custom-row {
  gap: 2rem !important;
}
```

### Issue: Responsive breakpoints not working

**Cause**: Missing media query or wrong breakpoint

**Solution**: Check breakpoint values and order:
```html
<!-- ✅ Correct: Ascending order -->
<div class="col-12 col-sm-6 col-md-4 col-lg-3">

<!-- ❌ Incorrect: Wrong order -->
<div class="col-lg-3 col-12 col-md-4">
```

---

## Performance Tips

1. **Minimize nesting**: Keep grid structure flat (max 2-3 levels)
2. **Use native gaps**: Prefer `gap` utilities over margin/padding
3. **Leverage auto-fit**: Let the grid calculate column counts
4. **Batch responsive classes**: Group by breakpoint for readability
5. **Avoid inline styles**: Use utility classes instead

---

## Related Documentation

- [GRID_REFERENCE.md](./archive/GRID_REFERENCE.md) - Quick reference guide (archived, historical)
- [GRID_ENHANCEMENTS.md](./archive/GRID_ENHANCEMENTS.md) - Advanced features (archived, historical)
- [CLAUDE.md](../CLAUDE.md) - Current design system integration rules

---

## Support

For questions or issues:
- Check existing documentation in `/docs`
- Review example implementations in `/src/pages`
- Contact the MDS team

---

**Last Updated**: December 10, 2025  
**Version**: 2.0 (Bootstrap 5.3 Compatible)  
**Maintained By**: Marsh Design System Team
