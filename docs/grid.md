## Grid system

Purpose: A lightweight, responsive 12-column grid aligned to the 4px base, with 8px gutters and simple utilities. Built with Sass and CSS Grid to work with React + CSS Modules.

Key specs:
- Columns: 12
- Base unit: 4px (overrideable)
- Gutters: 8px
- Breakpoints: xs, sm (600px), md (900px), lg (1200px), xl (1536px)
- Container max widths: sm 580px, md 860px, lg 1140px, xl 1440px

### Usage
1) Import the grid styles once in your app (e.g., in your root or a layout component):
```scss
@use '../styles/grid' as *;
```
If you are using CSS Modules, import in the component where needed:
```tsx
import styles from './Page.module.scss';
```

2) Structure your layout
```html
<div class="container">
  <div class="row gap-4">
    <div class="col-12 col-md-8">Main</div>
    <div class="col-12 col-md-4">Sidebar</div>
  </div>
  <div class="row gap-2">
    <div class="col-6 col-lg-3">A</div>
    <div class="col-6 col-lg-3">B</div>
    <div class="col-6 col-lg-3">C</div>
    <div class="col-6 col-lg-3">D</div>
  </div>
  <div class="row gap-3">
    <div class="col-10 offset-1">Centered content</div>
  </div>
  <div class="row gap-2 align-center">
    <div class="col-4">Left</div>
    <div class="col-8">Center-aligned items</div>
  </div>
  <div class="row gap-2 justify-center">
    <div class="col-3">Card</div>
  </div>
  <div class="row gap-2">
    <div class="col-4 col-md-3 col-lg-2">1</div>
    <div class="col-4 col-md-6 col-lg-8">2</div>
    <div class="col-4 col-md-3 col-lg-2">3</div>
  </div>
  <div class="row gap-2">
    <div class="col-12 col-md-6 col-lg-4 col-xl-3">Responsive card</div>
    <div class="col-12 col-md-6 col-lg-4 col-xl-3">Responsive card</div>
    <div class="col-12 col-md-6 col-lg-4 col-xl-3">Responsive card</div>
    <div class="col-12 col-md-6 col-lg-4 col-xl-3">Responsive card</div>
  </div>
  <div class="row gap-2">
    <div class="col-8 col-lg-9">Content</div>
    <div class="col-4 col-lg-3">Aside</div>
  </div>
</div>
```

### Utilities

#### Column Spanning
- **Base**: `.col-1` through `.col-12` (span N columns in a 12-column grid)
- **Responsive**: `.col-sm-6`, `.col-md-4`, `.col-lg-3`, `.col-xl-2`
- **Auto-sized**: `.col-auto` (fits content, responsive: `.col-md-auto`)

#### Grid Template Columns (Define column count)
- **Base**: `.grid-cols-1` through `.grid-cols-12` (creates N-column grid)
- **Responsive**: `.grid-cols-md-5`, `.grid-cols-lg-7` (non-12-column layouts)
- **Presets**: 
  - `.grid-auto-fit-xs` (150px min), `.grid-auto-fit-sm` (200px min)
  - `.grid-auto-fit-md` (300px min), `.grid-auto-fit-lg` (400px min)
  - `.grid-cols-sidebar` (250px + 1fr), `.grid-cols-sidebar-right`
  - `.grid-cols-two-thirds` (2fr + 1fr)

#### Row Spanning
- **Base**: `.row-span-1` through `.row-span-6` (span N rows)
- **Full height**: `.row-span-full` (span all rows)
- **Responsive**: `.row-span-md-2`, `.row-span-lg-3`

#### Grid Rows
- **Base**: `.grid-rows-1` through `.grid-rows-6` (creates N-row grid)
- **Responsive**: `.grid-rows-md-3`, `.grid-rows-lg-4`

#### Offsets
- **Base**: `.offset-1` through `.offset-11`
- **Responsive**: `.offset-sm-2`, `.offset-md-3`

#### Gaps
- **Standard**: `.gap-1` (4px), `.gap-2` (8px), `.gap-3` (12px), `.gap-4` (16px), `.gap-6` (24px), `.gap-8` (32px)
- **Extended**: `.gap-9` (36px), `.gap-10` (40px), `.gap-12` (48px), `.gap-16` (64px), `.gap-20` (80px), `.gap-24` (96px)
- **Directional**: `.gap-x-4`, `.gap-y-8`, `.gx-4`, `.gy-8`
- **Responsive**: `.gap-md-12`, `.gap-lg-16`
- **Bootstrap aliases**: `.g-0` through `.g-16`

#### Alignment
- **Items**: `.align-{start|center|end}`, `.justify-{start|center|end}`
- **Content**: `.content-align-{start|center|end|between|around|evenly}`
- **Place shortcuts**: `.place-items-{start|center|end|stretch}`, `.place-content-{start|center|end|between}`

#### Grid Flow
- **Direction**: `.grid-flow-row`, `.grid-flow-col`
- **Dense packing**: `.grid-flow-dense`, `.grid-flow-row-dense`

#### Responsive Visibility
- **Hidden**: `.hidden-xs`, `.hidden-sm`, `.hidden-md`, `.hidden-lg`, `.hidden-xl`
- **Visible**: `.visible-xs`, `.visible-sm`, `.visible-md`, `.visible-lg`, `.visible-xl`

#### Modifiers
- **No gap**: `.row-no-gap`
- **Flush (negative margin)**: `.row-flush`

### Customization
Override defaults by setting Sass variables before importing:
```scss
$base-unit: 0.25rem; // use rem, equals 4px at 16px root
$gutter: 0.5rem;     // 8px at 16px root
$columns: 12;
@use '../styles/grid' as *;
```

Adjust breakpoints and container max widths by overriding `$breakpoints` and `$container-max` prior to `@use`.

### Notes
- The grid is mobile-first; responsive classes apply at min-width of each breakpoint.
- Prefer component-level CSS Modules so grid utilities don’t leak globally.
- Works alongside MUI; use this for non-component layout scaffolding, while MUI handles component-level spacing.
