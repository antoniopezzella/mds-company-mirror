# MDS Grid System — Quick Reference Guide

## 🎯 Where to Find Everything

### 📱 Interactive Test Pages

| Page | URL | What It Shows |
|------|-----|---------------|
| **Grid Showcase** | http://localhost:5173/grid | Complete feature demonstration (9 sections) |
| **Components Showcase** | http://localhost:5173/components | MDS components using grid |
| **Storybook Grid Docs** | Run `npm run storybook` → Foundations → Grid | Live editable examples |

### 📚 Documentation Files

| File | Purpose | Best For |
|------|---------|----------|
| `src/docs/35-Grid.mdx` | Storybook documentation with live demos | Interactive learning |
| `docs/grid.md` | Markdown reference | Quick copy-paste patterns |
| `GRID_ENHANCEMENTS.md` | Implementation details | Understanding what was added |
| `GRID_REFERENCE.md` | This file! | Quick navigation |

---

## 🚀 Quick Start

### View the Grid Showcase

```bash
# Make sure dev server is running
npm run dev

# Open in browser:
# http://localhost:5173/grid
```

### View Storybook Documentation

```bash
# Start Storybook
npm run storybook

# Navigate to: Foundations > Grid
```

---

## 📖 Grid Showcase Sections

The `/grid` page contains these interactive examples:

### 1. Non-12-Column Grids
- 5-column grid
- 7-column dashboard
- Responsive 1→3→5 columns

### 2. Row Spanning (Dashboard Widgets)
- Widgets spanning 2, 3, 4 rows
- Mixed height layouts
- Full-height columns

### 3. Extended Gap Scale
- .gap-16 (64px spacing)
- .gap-24 (96px spacing)
- Spacious layouts

### 4. Dense Grid Packing
- Masonry-like auto-fill
- Large items with small items
- Automatic gap filling

### 5. Asymmetric Layout Presets
- Sidebar layouts (250px + flexible)
- Two-thirds layouts (2fr + 1fr)
- Responsive variants

### 6. Auto-Fit Grid Presets
- .grid-auto-fit-sm (200px min)
- .grid-auto-fit-md (300px min)
- Responsive card grids

### 7. Auto-Sized Columns
- Content-based sizing
- Action bar layouts
- Mixed fixed + flexible

### 8. Complex Dashboard Layout
- 6-column grid with spanning
- Mixed row heights
- Dense packing

### 9. Bootstrap-Inspired Patterns
- Equal-width columns (.col)
- Column ordering (.order-*)
- Mixed fixed + auto
- Responsive ordering

---

## 🔥 Most Common Patterns

### Pattern 1: Responsive Card Grid
```html
<!-- Automatically responsive, no breakpoints needed -->
<div class="grid-auto-fit-md gap-4">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```
**See it at**: `/grid` → Section 6

---

### Pattern 2: Dashboard with Widgets
```html
<!-- 3-column grid with varying heights -->
<div class="grid-cols-3 grid-rows-4 gap-4">
  <div class="row-span-2">Tall widget</div>
  <div>Metric A</div>
  <div class="row-span-4">Full-height feed</div>
  <div>Metric B</div>
</div>
```
**See it at**: `/grid` → Section 2

---

### Pattern 3: Sidebar Layout
```html
<!-- Fixed sidebar + flexible content -->
<div class="grid-cols-sidebar gap-4">
  <aside>250px sidebar</aside>
  <main>Flexible content</main>
</div>

<!-- Responsive: stacks on mobile, sidebar on desktop -->
<div class="grid-cols-1 grid-cols-md-sidebar gap-4">
  <aside>Sidebar</aside>
  <main>Content</main>
</div>
```
**See it at**: `/grid` → Section 5

---

### Pattern 4: Equal-Width Columns
```html
<!-- No numbers needed, all equal width -->
<div class="row gap-4">
  <div class="col">Product 1</div>
  <div class="col">Product 2</div>
  <div class="col">Product 3</div>
</div>
```
**See it at**: `/grid` → Section 9

---

### Pattern 5: Column Reordering
```html
<!-- Sidebar first on desktop, content first on mobile -->
<div class="row gap-4">
  <main class="col-12 col-md-8 order-md-2">Content</main>
  <aside class="col-12 col-md-4 order-md-1">Sidebar</aside>
</div>
```
**See it at**: `/grid` → Section 9

---

### Pattern 6: Custom Column Count
```html
<!-- 5-column grid (not just 12) -->
<div class="grid-cols-5 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</div>

<!-- 7-column dashboard -->
<div class="grid-cols-7 gap-3">
  <div>Col 1</div>
  <!-- ... -->
</div>
```
**See it at**: `/grid` → Section 1

---

### Pattern 7: Dense Packing (Masonry)
```html
<!-- Fills gaps automatically -->
<div class="grid-cols-4 gap-3 grid-flow-dense">
  <div class="col-span-2 row-span-2">Large featured</div>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```
**See it at**: `/grid` → Section 4

---

### Pattern 8: Action Bar
```html
<!-- Auto-sized buttons + flexible content -->
<div class="row gap-4">
  <div class="col-auto"><button>Save</button></div>
  <div class="col">Status message area</div>
  <div class="col-auto"><button>Cancel</button></div>
</div>
```
**See it at**: `/grid` → Section 7

---

## 📋 Complete Utility Reference

### Basic Grid Classes
```scss
.row                    // 12-column grid container
.row-auto               // Auto-fit card grid
.container              // Centered max-width container
.container-fluid        // Full-width container
```

### Column Spanning
```scss
.col-1 to .col-12       // Span N columns
.col                    // Auto-width (equal)
.col-auto               // Content-sized
.col-{bp}-{N}           // Responsive column span
.col-{bp}               // Responsive auto-width
```

### Grid Template Columns
```scss
.grid-cols-1 to .grid-cols-12   // Create N-column grid
.grid-cols-{bp}-{N}             // Responsive
.grid-auto-fit-{xs|sm|md|lg}    // Auto-fit presets
.grid-cols-sidebar              // 250px + 1fr
.grid-cols-two-thirds           // 2fr + 1fr
```

### Row Spanning
```scss
.row-span-1 to .row-span-6      // Span N rows
.row-span-full                  // Span all rows
.row-span-{bp}-{N}              // Responsive
```

### Gaps
```scss
.gap-0, .gap-1, .gap-2, .gap-3, .gap-4, .gap-6, .gap-8
.gap-9, .gap-10, .gap-12, .gap-16, .gap-20, .gap-24
.gap-x-{N}, .gap-y-{N}          // Directional
.gap-{bp}-{N}                   // Responsive
.g-{N}, .gx-{N}, .gy-{N}        // Bootstrap aliases
```

### Alignment
```scss
.align-{start|center|end}           // Align items
.justify-{start|center|end}         // Justify items
.place-items-{start|center|end}     // Combined
.place-content-{start|center|end}   // Content alignment
```

### Ordering
```scss
.order-0 to .order-12           // Visual order
.order-first                    // order: -1
.order-last                     // order: 13
.order-{bp}-{N}                 // Responsive
```

### Visibility
```scss
.hidden-{xs|sm|md|lg|xl}        // Hide at breakpoint
.visible-{xs|sm|md|lg|xl}       // Show only at breakpoint
```

### Grid Flow
```scss
.grid-flow-row                  // Row direction
.grid-flow-col                  // Column direction
.grid-flow-dense                // Fill gaps (masonry)
```

### Offsets
```scss
.offset-1 to .offset-11         // Offset by N columns
.offset-{bp}-{N}                // Responsive
```

### Modifiers
```scss
.row-no-gap, .no-gutters        // Zero gap
.row-flush                      // Negative margins
```

---

## 🎨 Storybook Examples

The `src/docs/35-Grid.mdx` file contains these live examples:

1. **Two-column layout** — Main + Sidebar
2. **Responsive cards** — 4 cards at different breakpoints
3. **12px grid spacing** — Custom gap demonstration
4. **Vertical alignment** — Center-aligned items
5. **Offset columns** — Centered content
6. **Auto-fit card grid** — Runtime customizable
7. **Fluid container** — Full-width layouts
8. **Non-12-column grids** — 5-col and 7-col examples
9. **Row spanning** — Dashboard widgets
10. **Extended gaps** — 64px and 96px spacing
11. **Dense packing** — Masonry layout
12. **Asymmetric presets** — Sidebar layouts
13. **Auto-fit presets** — 200px and 300px min
14. **Auto-sized columns** — Content-based sizing
15. **Responsive visibility** — Breakpoint-specific display
16. **Bootstrap patterns** — Equal-width, ordering, mixed

---

## 🧪 Testing Your Layout

### Method 1: Use Grid Showcase Page

1. Navigate to http://localhost:5173/grid
2. Resize browser to see responsive behavior
3. Inspect elements to see applied classes
4. Copy patterns that match your needs

### Method 2: Use Storybook

```bash
npm run storybook
```

1. Navigate to "Foundations" → "Grid"
2. Edit examples live in the Canvas
3. View code in the "Docs" tab
4. Test responsive breakpoints with device toolbar

### Method 3: Create Custom Test

Add to `src/pages/GridShowcase.tsx`:

```tsx
<Paper sx={{ p: 3, mb: 4 }}>
  <Typography variant="h5" sx={{ mb: 2 }}>
    My Custom Test
  </Typography>
  
  <div className="YOUR-GRID-CLASSES-HERE">
    {/* Your content */}
  </div>
</Paper>
```

---

## 🐛 Troubleshooting

### Grid not displaying?

1. **Check if grid class is applied**:
   ```html
   <!-- Must have a grid class -->
   <div class="row gap-4">...</div>
   <!-- OR -->
   <div class="grid-cols-3 gap-4">...</div>
   ```

2. **Check display property** (inspect in DevTools):
   ```css
   /* Should show: */
   display: grid;
   ```

3. **Verify grid styles are imported**:
   - Check `src/global.scss` imports `_grid.scss`
   - Check browser DevTools → Sources → see compiled CSS

### Columns not aligning?

1. **Ensure parent has grid display**:
   ```html
   <div class="row">          ← Must be on parent
     <div class="col-6">...</div>
   </div>
   ```

2. **Check for conflicting styles**:
   - MUI `sx` props might override
   - Use browser DevTools to inspect computed styles

### Responsive not working?

1. **Verify breakpoint syntax**:
   ```html
   <!-- Correct -->
   <div class="col-12 col-md-6 col-lg-4">...</div>
   
   <!-- Incorrect -->
   <div class="col-12-md-6">...</div>
   ```

2. **Check browser width**:
   - sm: 600px+
   - md: 900px+
   - lg: 1200px+
   - xl: 1536px+

---

## 📞 Quick Links

| Resource | Link/Command |
|----------|--------------|
| **Test Page** | http://localhost:5173/grid |
| **Components** | http://localhost:5173/components |
| **Storybook** | `npm run storybook` |
| **Dev Server** | `npm run dev` |
| **SCSS Source** | `src/styles/_grid.scss` |
| **MDX Docs** | `src/docs/35-Grid.mdx` |
| **Markdown Docs** | `docs/grid.md` |

---

## 🎓 Learning Path

1. **Start here**: http://localhost:5173/grid (Visual examples)
2. **Deep dive**: `npm run storybook` → Foundations → Grid (Interactive)
3. **Copy patterns**: `docs/grid.md` (Code snippets)
4. **Understand internals**: `GRID_ENHANCEMENTS.md` (Implementation)
5. **Customize**: `src/styles/_grid.scss` (Source code)

---

**Last Updated**: November 9, 2025  
**Grid Version**: Phase 1 Complete + Bootstrap-Inspired  
**Scalability Score**: 9.5/10
