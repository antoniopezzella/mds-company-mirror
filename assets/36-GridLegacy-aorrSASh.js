import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t,s as n}from"./blocks-GA0YWl98.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";import{n as o,t as s}from"./GridHealth-BfTU8vQJ.js";function c(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Foundations/⚠️ Grid Legacy`}),`
`,(0,u.jsx)(t.h1,{id:`grid-system--legacy`,children:`Grid System — Legacy`}),`
`,(0,u.jsxs)(t.p,{children:[`A Bootstrap-inspired 12-column grid system built with CSS Grid. This is the
`,(0,u.jsx)(t.strong,{children:`older`}),` of the two grid systems in this codebase, kept for the existing
pages/sections that already depend on it.`]}),`
`,(0,u.jsxs)(`div`,{style:{background:`linear-gradient(135deg, #595959 0%, #303c37 100%)`,color:`white`,padding:`24px`,borderRadius:`8px`,marginBottom:`32px`},children:[(0,u.jsx)(`h2`,{style:{margin:`0 0 8px 0`,fontSize:`20px`},children:`⚠️ Not for new work`}),(0,u.jsx)(`p`,{style:{margin:`0 0 16px 0`,opacity:.9},children:(0,u.jsxs)(t.p,{children:[`All new components (including everything in `,(0,u.jsx)(`code`,{children:`src/components/ui`}),`) use plain Tailwind grid
utilities instead — see `,(0,u.jsx)(`a`,{href:`?path=/docs/foundations-grid--docs`,style:{color:`#ceecff`},children:`Foundations/Grid`}),`.
This page documents the older, Bootstrap-style system still used by ~26 existing legacy MUI marketing
pages/sections (`,(0,u.jsx)(`code`,{children:`HeroBanner`}),`, `,(0,u.jsx)(`code`,{children:`MarshCorporate`}),`, the `,(0,u.jsx)(`code`,{children:`marsh-new-charpter-begins`}),`
and `,(0,u.jsx)(`code`,{children:`CorporateLandingPage`}),` sections, and a few others). Every class below carries an
`,(0,u.jsx)(`code`,{children:`mds-legacy-`}),` prefix — added when these names were found to collide with identically-named
Tailwind utilities, since both systems load globally in the same app. Never mix the two systems'
classes on the same element.`]})}),(0,u.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(180px, 1fr))`,gap:`16px`,marginTop:`16px`},children:[(0,u.jsx)(`div`,{children:(0,u.jsxs)(t.p,{children:[(0,u.jsx)(`strong`,{children:`Columns:`}),` 12 (+ custom 1-12)`]})}),(0,u.jsx)(`div`,{children:(0,u.jsxs)(t.p,{children:[(0,u.jsx)(`strong`,{children:`Base Unit:`}),` 4px`]})}),(0,u.jsx)(`div`,{children:(0,u.jsxs)(t.p,{children:[(0,u.jsx)(`strong`,{children:`Gutters:`}),` 8px-128px`]})}),(0,u.jsx)(`div`,{children:(0,u.jsxs)(t.p,{children:[(0,u.jsx)(`strong`,{children:`Breakpoints:`}),` xs→xxl (1540px)`]})}),(0,u.jsx)(`div`,{children:(0,u.jsxs)(t.p,{children:[(0,u.jsx)(`strong`,{children:`Aspect Ratios:`}),` 6 utilities`]})}),(0,u.jsx)(`div`,{children:(0,u.jsxs)(t.p,{children:[(0,u.jsx)(`strong`,{children:`Subgrid:`}),` Future-ready`]})})]})]}),`
`,`
`,(0,u.jsx)(s,{label:`Grid runtime`}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`-for-designers`,children:`👥 For Designers`}),`
`,(0,u.jsx)(t.h3,{id:`what-you-can-do`,children:`What You Can Do`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`✅ `,(0,u.jsx)(t.strong,{children:`Create responsive layouts`}),` that adapt from mobile to ultra-wide (4K+)`]}),`
`,(0,u.jsxs)(t.li,{children:[`✅ `,(0,u.jsx)(t.strong,{children:`Build dashboard widgets`}),` with different heights and aspect ratios`]}),`
`,(0,u.jsxs)(t.li,{children:[`✅ `,(0,u.jsx)(t.strong,{children:`Design card grids`}),` that auto-fit to any screen size`]}),`
`,(0,u.jsxs)(t.li,{children:[`✅ `,(0,u.jsx)(t.strong,{children:`Control spacing`}),` from 4px to 128px (enterprise-scale)`]}),`
`,(0,u.jsxs)(t.li,{children:[`✅ `,(0,u.jsx)(t.strong,{children:`Align content`}),` horizontally and vertically with subgrid`]}),`
`,(0,u.jsxs)(t.li,{children:[`✅ `,(0,u.jsx)(t.strong,{children:`Reorder elements`}),` visually without changing HTML`]}),`
`,(0,u.jsxs)(t.li,{children:[`🆕 `,(0,u.jsx)(t.strong,{children:`Ultra-wide layouts`}),` for the xxl (1540px+) breakpoint`]}),`
`,(0,u.jsxs)(t.li,{children:[`🆕 `,(0,u.jsx)(t.strong,{children:`Consistent aspect ratios`}),` across all components`]}),`
`,(0,u.jsxs)(t.li,{children:[`🆕 `,(0,u.jsx)(t.strong,{children:`Future-proof alignment`}),` with subgrid utilities`]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`design-tokens`,children:`Design Tokens`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{children:`Breakpoints:
  xs: 0px      (mobile)
  sm: 576px    (tablet portrait)
  md: 768px    (tablet landscape)
  lg: 1024px   (desktop)
  xl: 1200px   (large desktop)
  xxl: 1540px  (ultra-wide)

Containers:
  .container: 100% width up to 1320px max (centered)
  .container-fluid: 100% width (full)

Spacing Scale:
  gap-1: 4px     gap-9: 36px    gap-20: 80px
  gap-2: 8px     gap-10: 40px   gap-24: 96px
  gap-3: 12px    gap-12: 48px   gap-28: 112px (new)
  gap-4: 16px    gap-16: 64px   gap-32: 128px (new)
  gap-6: 24px    gap-8: 32px    + responsive variants
  
Aspect Ratios:
  .aspect-square   (1:1)    .aspect-3-2      (3:2)
  .aspect-video    (16:9)   .aspect-21-9     (21:9)
  .aspect-4-3      (4:3)    .aspect-auto     (reset)
  
Subgrid (Future):
  .subgrid-cols, .subgrid-rows, .subgrid-both
  + responsive variants for all breakpoints
`})}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`-for-developers`,children:`👨‍💻 For Developers`}),`
`,(0,u.jsx)(t.h3,{id:`installation`,children:`Installation`}),`
`,(0,u.jsx)(t.p,{children:`The grid is already wired globally. Just use the classes in your HTML/JSX:`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`// Grid is imported in src/global.scss
// No additional imports needed!
`})}),`
`,(0,u.jsx)(t.h3,{id:`import-in-custom-scss-optional`,children:`Import in Custom SCSS (Optional)`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-scss`,children:`@use '../styles/grid' as *;
`})}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`-common-patterns-copy--paste`,children:`📚 Common Patterns (Copy & Paste)`}),`
`,(0,u.jsx)(t.h3,{id:`pattern-1-basic-two-column-layout`,children:`Pattern 1: Basic Two-Column Layout`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: Main content + sidebar layouts`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`HTML:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-container">
  <div class="mds-legacy-row mds-legacy-gap-4">
    <div class="mds-legacy-col-12 mds-legacy-col-md-8">Main content</div>
    <div class="mds-legacy-col-12 mds-legacy-col-md-4">Sidebar</div>
  </div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`React/JSX:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="mds-legacy-container">
  <div className="mds-legacy-row mds-legacy-gap-4">
    <div className="mds-legacy-col-12 mds-legacy-col-md-8">Main content</div>
    <div className="mds-legacy-col-12 mds-legacy-col-md-4">Sidebar</div>
  </div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Live Example:`})}),`
`,(0,u.jsx)(`div`,{className:`mds-legacy-container`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-4`,children:[(0,u.jsxs)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md-8`,style:{background:`#e5edf4`,padding:16,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Main Content`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`14px`},children:`66% width on desktop, 100% on mobile`})]}),(0,u.jsxs)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md-4`,style:{background:`#c7edff`,padding:16,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Sidebar`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`14px`},children:`33% width on desktop, 100% on mobile`})]})]})}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-2-responsive-card-grid`,children:`Pattern 2: Responsive Card Grid`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: Product cards, blog posts, image galleries`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`HTML:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<!-- Auto-fits cards at 300px minimum width -->
<div class="mds-legacy-grid-auto-fit-md mds-legacy-gap-4">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`React/JSX:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="mds-legacy-grid-auto-fit-md mds-legacy-gap-4">
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Live Example:`})}),`
`,(0,u.jsx)(`div`,{className:`mds-legacy-grid-auto-fit-md mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:Array.from({length:6}).map((e,t)=>(0,u.jsxs)(`div`,{style:{background:`#f0faff`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:[(0,u.jsxs)(`strong`,{children:[`Card `,t+1]}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`,color:`#666`},children:`Auto-fits at 300px min`})]},t))}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-3-dashboard-with-widgets`,children:`Pattern 3: Dashboard with Widgets`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: Analytics dashboards, admin panels with varying widget heights`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`HTML:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-grid-cols-3 mds-legacy-grid-rows-3 mds-legacy-gap-4">
  <div class="mds-legacy-row-span-2">Tall Chart Widget</div>
  <div>Metric A</div>
  <div class="mds-legacy-row-span-3">Activity Feed (Full Height)</div>
  <div>Metric B</div>
  <div class="mds-legacy-col-span-2">Wide Widget</div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`React/JSX:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="mds-legacy-grid-cols-3 mds-legacy-grid-rows-3 mds-legacy-gap-4">
  <div className="mds-legacy-row-span-2">
    <ChartWidget data={data} />
  </div>
  <div><MetricCard title="Revenue" value="$45k" /></div>
  <div className="mds-legacy-row-span-3">
    <ActivityFeed />
  </div>
  <div><MetricCard title="Users" value="1.2k" /></div>
  <div className="mds-legacy-col-span-2">
    <TableWidget />
  </div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Live Example:`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-grid-cols-3 mds-legacy-grid-rows-3 mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12,minHeight:300},children:[(0,u.jsx)(`div`,{className:`mds-legacy-row-span-2`,style:{background:`#667eea`,color:`white`,padding:16,borderRadius:4,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,u.jsx)(`strong`,{children:`Tall Widget (2 rows)`})}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:(0,u.jsx)(`strong`,{children:`Metric A`})}),(0,u.jsx)(`div`,{className:`mds-legacy-row-span-3`,style:{background:`#48bb78`,color:`white`,padding:16,borderRadius:4,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,u.jsx)(`strong`,{children:`Full Height (3 rows)`})}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:(0,u.jsx)(`strong`,{children:`Metric B`})}),(0,u.jsx)(`div`,{className:`mds-legacy-col-span-2`,style:{background:`#edf2f7`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:(0,u.jsx)(`strong`,{children:`Wide Widget (2 columns)`})})]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-4-equal-width-columns`,children:`Pattern 4: Equal-Width Columns`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: When you want columns to automatically share space equally`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`HTML:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<!-- No numbers needed! All columns are equal width -->
<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col">Column 1</div>
  <div class="mds-legacy-col">Column 2</div>
  <div class="mds-legacy-col">Column 3</div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`React/JSX:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="mds-legacy-row mds-legacy-gap-4">
  {features.map(feature => (
    <div key={feature.id} className="mds-legacy-col">
      <FeatureCard {...feature} />
    </div>
  ))}
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Live Example:`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsxs)(`div`,{className:`mds-legacy-col`,style:{background:`#e5edf4`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Auto`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`},children:`Equal width`})]}),(0,u.jsxs)(`div`,{className:`mds-legacy-col`,style:{background:`#c7edff`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Auto`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`},children:`Equal width`})]}),(0,u.jsxs)(`div`,{className:`mds-legacy-col`,style:{background:`#e5edf4`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Auto`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`},children:`Equal width`})]})]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`-enhanced-patterns-2024-updates`,children:`🆕 Enhanced Patterns (2024 Updates)`}),`
`,(0,u.jsx)(t.h3,{id:`pattern-41-ultra-wide-enterprise-layout`,children:`Pattern 4.1: Ultra-Wide Enterprise Layout`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: Financial dashboards, data visualization, ultra-wide monitors (1540px+)`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`HTML:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-container">
  <div class="mds-legacy-row mds-legacy-gap-xxl-32 mds-legacy-gap-xl-24 mds-legacy-gap-lg-16 mds-legacy-gap-md-12 mds-legacy-gap-6">
    <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric A</div>
    <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric B</div>
    <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric C</div>
    <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric D</div>
  </div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`React/JSX:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="mds-legacy-container">
  <div className="mds-legacy-row mds-legacy-gap-xxl-32 mds-legacy-gap-xl-24 mds-legacy-gap-lg-16 mds-legacy-gap-md-12 mds-legacy-gap-6">
    {metrics.map(metric => (
      <div key={metric.id} className="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">
        <MetricCard {...metric} />
      </div>
    ))}
  </div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Live Example:`})}),`
`,(0,u.jsx)(`div`,{className:`mds-legacy-container`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-xxl-32 mds-legacy-gap-xl-24 mds-legacy-gap-lg-16 mds-legacy-gap-md-12 mds-legacy-gap-6`,children:[(0,u.jsxs)(`div`,{className:`mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12`,style:{background:`#e1f5fe`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`,minHeight:100},children:[(0,u.jsx)(`strong`,{children:`Revenue`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`20px`,color:`#0277bd`},children:`$2.4M`}),(0,u.jsx)(`small`,{style:{color:`#666`},children:`XXL: 4 cols | XL: 3 cols | LG: 2 cols | MD+: 1 col`})]}),(0,u.jsxs)(`div`,{className:`mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12`,style:{background:`#e8f5e8`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`,minHeight:100},children:[(0,u.jsx)(`strong`,{children:`Growth`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`20px`,color:`#2e7d32`},children:`+12%`}),(0,u.jsx)(`small`,{style:{color:`#666`},children:`Progressive spacing from 24px to 128px`})]}),(0,u.jsxs)(`div`,{className:`mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12`,style:{background:`#fff3e0`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`,minHeight:100},children:[(0,u.jsx)(`strong`,{children:`Users`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`20px`,color:`#f57c00`},children:`1.2k`}),(0,u.jsx)(`small`,{style:{color:`#666`},children:`Ultra-wide responsive breakpoints`})]}),(0,u.jsxs)(`div`,{className:`mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12`,style:{background:`#fce4ec`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`,minHeight:100},children:[(0,u.jsx)(`strong`,{children:`Conversion`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`20px`,color:`#c2185b`},children:`3.8%`}),(0,u.jsx)(`small`,{style:{color:`#666`},children:`Perfect for enterprise dashboards`})]})]})}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-42-aspect-ratio-media-grid`,children:`Pattern 4.2: Aspect Ratio Media Grid`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: Image galleries, video grids, consistent media presentation`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`HTML:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-row mds-legacy-gap-4 mds-legacy-gap-xxl-8">
  <div class="mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12">
    <div class="mds-legacy-aspect-video">16:9 Video</div>
  </div>
  <div class="mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12">
    <div class="mds-legacy-aspect-square">1:1 Square</div>
  </div>
  <div class="mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12">
    <div class="mds-legacy-aspect-4-3">4:3 Classic</div>
  </div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`React/JSX:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="mds-legacy-row mds-legacy-gap-4 mds-legacy-gap-xxl-8">
  <div className="mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12">
    <div className="mds-legacy-aspect-video">
      <video>...</video>
    </div>
  </div>
  <div className="mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12">
    <div className="mds-legacy-aspect-square">
      <img src="profile.jpg" />
    </div>
  </div>
  <div className="mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12">
    <div className="mds-legacy-aspect-4-3">
      <img src="landscape.jpg" />
    </div>
  </div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Live Example:`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-4 mds-legacy-gap-xxl-8`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12`,children:(0,u.jsx)(`div`,{className:`mds-legacy-aspect-video`,style:{background:`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,borderRadius:8,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`white`,fontWeight:`bold`},children:(0,u.jsx)(t.p,{children:`📺 16:9 Video`})})}),(0,u.jsx)(`div`,{className:`mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12`,children:(0,u.jsx)(`div`,{className:`mds-legacy-aspect-square`,style:{background:`linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`,borderRadius:8,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`white`,fontWeight:`bold`},children:(0,u.jsx)(t.p,{children:`🎯 1:1 Square`})})}),(0,u.jsx)(`div`,{className:`mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12`,children:(0,u.jsx)(`div`,{className:`mds-legacy-aspect-4-3`,style:{background:`linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`,borderRadius:8,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`white`,fontWeight:`bold`},children:(0,u.jsx)(t.p,{children:`📷 4:3 Classic`})})})]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-43-subgrid-card-alignment-future-ready`,children:`Pattern 4.3: Subgrid Card Alignment (Future-Ready)`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: Card grids where headers and footers need perfect alignment`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`HTML:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<!-- Parent defines row structure -->
<div class="mds-legacy-row mds-legacy-gap-6" style="grid-template-rows: auto 1fr auto;">
  <div class="mds-legacy-col-4 mds-legacy-subgrid-rows">
    <h4>Header</h4>
    <p>Variable content length...</p>
    <button>Action</button>
  </div>
  <div class="mds-legacy-col-4 mds-legacy-subgrid-rows">
    <h4>Header</h4>
    <p>Short.</p>
    <button>Action</button>
  </div>
  <div class="mds-legacy-col-4 mds-legacy-subgrid-rows">
    <h4>Header</h4>
    <p>Medium length content.</p>
    <button>Action</button>
  </div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`React/JSX:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="mds-legacy-row mds-legacy-gap-6" style={{gridTemplateRows: 'auto 1fr auto'}}>
  {products.map(product => (
    <div key={product.id} className="mds-legacy-col-4 mds-legacy-subgrid-rows">
      <h4>{product.title}</h4>
      <p>{product.description}</p>
      <button>Buy Now</button>
    </div>
  ))}
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Live Example (Firefox/Safari):`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-6`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12,gridTemplateRows:`auto 1fr auto`},children:[(0,u.jsxs)(`div`,{className:`mds-legacy-col-4`,style:{display:`grid`,gridRow:`1 / -1`,background:`#f8f9fa`,borderRadius:8,padding:16},children:[(0,u.jsx)(`h5`,{style:{margin:`0 0 8px 0`,background:`#e3f2fd`,padding:8,borderRadius:4,textAlign:`center`},children:`Product A`}),(0,u.jsx)(`div`,{style:{background:`white`,padding:12,borderRadius:4,flexGrow:1},children:(0,u.jsx)(t.p,{children:`Variable content length. This product has a detailed description that can be quite long and detailed.`})}),(0,u.jsx)(`button`,{style:{marginTop:8,background:`#1976d2`,color:`white`,border:0,padding:`8px 16px`,borderRadius:4},children:`Buy Now`})]}),(0,u.jsxs)(`div`,{className:`mds-legacy-col-4`,style:{display:`grid`,gridRow:`1 / -1`,background:`#f8f9fa`,borderRadius:8,padding:16},children:[(0,u.jsx)(`h5`,{style:{margin:`0 0 8px 0`,background:`#e3f2fd`,padding:8,borderRadius:4,textAlign:`center`},children:`Product B`}),(0,u.jsx)(`div`,{style:{background:`white`,padding:12,borderRadius:4,flexGrow:1},children:(0,u.jsx)(t.p,{children:`Short description.`})}),(0,u.jsx)(`button`,{style:{marginTop:8,background:`#1976d2`,color:`white`,border:0,padding:`8px 16px`,borderRadius:4},children:`Buy Now`})]}),(0,u.jsxs)(`div`,{className:`mds-legacy-col-4`,style:{display:`grid`,gridRow:`1 / -1`,background:`#f8f9fa`,borderRadius:8,padding:16},children:[(0,u.jsx)(`h5`,{style:{margin:`0 0 8px 0`,background:`#e3f2fd`,padding:8,borderRadius:4,textAlign:`center`},children:`Product C`}),(0,u.jsx)(`div`,{style:{background:`white`,padding:12,borderRadius:4,flexGrow:1},children:(0,u.jsx)(t.p,{children:`Medium length content that demonstrates subgrid alignment.`})}),(0,u.jsx)(`button`,{style:{marginTop:8,background:`#1976d2`,color:`white`,border:0,padding:`8px 16px`,borderRadius:4},children:`Buy Now`})]})]}),`
`,(0,u.jsx)(`div`,{style:{background:`#fff3e0`,padding:`12px`,borderRadius:`4px`,marginTop:`12px`,fontSize:`14px`},children:(0,u.jsxs)(t.p,{children:[`💡 `,(0,u.jsx)(`strong`,{children:`Note:`}),` Subgrid is currently supported in Firefox and Safari. Chrome support coming soon. Headers and footers will align perfectly when supported.`]})}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-44-container-fluid--container-mix`,children:`Pattern 4.4: Container Fluid + Container Mix`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: Full-width sections with centered content`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`HTML:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<!-- Full-width background with centered content -->
<section class="mds-legacy-container-fluid" style="background: #f8f9fa; padding: 40px 0;">
  <div class="mds-legacy-container">
    <div class="mds-legacy-row mds-legacy-gap-6 mds-legacy-gap-xxl-12">
      <div class="mds-legacy-col-xxl-6 mds-legacy-col-xl-6 mds-legacy-col-lg-6 mds-legacy-col-12">
        <h2>Full-width Section</h2>
        <p>Centered content within full-width background</p>
      </div>
      <div class="mds-legacy-col-xxl-6 mds-legacy-col-xl-6 mds-legacy-col-lg-6 mds-legacy-col-12">
        <div class="mds-legacy-aspect-video">Media content</div>
      </div>
    </div>
  </div>
</section>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`React/JSX:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<section className="mds-legacy-container-fluid" style={{background: '#f8f9fa', padding: '40px 0'}}>
  <div className="mds-legacy-container">
    <div className="mds-legacy-row mds-legacy-gap-6 mds-legacy-gap-xxl-12">
      <div className="mds-legacy-col-xxl-6 mds-legacy-col-xl-6 mds-legacy-col-lg-6 mds-legacy-col-12">
        <Hero />
      </div>
      <div className="mds-legacy-col-xxl-6 mds-legacy-col-xl-6 mds-legacy-col-lg-6 mds-legacy-col-12">
        <div className="mds-legacy-aspect-video">
          <VideoPlayer />
        </div>
      </div>
    </div>
  </div>
</section>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Live Example:`})}),`
`,(0,u.jsx)(`section`,{className:`mds-legacy-container-fluid`,style:{background:`#f8f9fa`,padding:`40px 16px`,border:`1px solid #e5e7eb`,borderRadius:8,marginTop:12},children:(0,u.jsx)(`div`,{className:`mds-legacy-container`,children:(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-6 mds-legacy-gap-xxl-12`,children:[(0,u.jsxs)(`div`,{className:`mds-legacy-col-xxl-6 mds-legacy-col-xl-6 mds-legacy-col-lg-6 mds-legacy-col-12`,children:[(0,u.jsx)(`h3`,{style:{margin:`0 0 16px 0`,color:`#1976d2`},children:`Full-Width Hero Section`}),(0,u.jsx)(`p`,{style:{margin:`0 0 16px 0`,lineHeight:1.6,color:`#444`},children:(0,u.jsx)(t.p,{children:`The container-fluid provides full viewport width with consistent padding,
while the inner container centers content and respects max-width constraints.`})}),(0,u.jsx)(`p`,{style:{margin:0,fontSize:`14px`,color:`#666`},children:(0,u.jsx)(t.p,{children:`Perfect for hero sections, testimonials, and feature showcases.`})})]}),(0,u.jsx)(`div`,{className:`mds-legacy-col-xxl-6 mds-legacy-col-xl-6 mds-legacy-col-lg-6 mds-legacy-col-12`,children:(0,u.jsx)(`div`,{className:`mds-legacy-aspect-video`,style:{background:`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,borderRadius:8,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`white`,fontWeight:`bold`},children:(0,u.jsx)(t.p,{children:`🎬 Media Content`})})})]})})}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-5-sidebar-layout`,children:`Pattern 5: Sidebar Layout`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: App shells, documentation sites, admin panels`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`HTML:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<!-- Fixed 250px sidebar + flexible content -->
<div class="mds-legacy-grid-cols-sidebar mds-legacy-gap-4">
  <aside>Navigation</aside>
  <main>Content Area</main>
</div>

<!-- Responsive: stacks on mobile, sidebar on desktop -->
<div class="mds-legacy-grid-cols-1 mds-legacy-grid-cols-md-sidebar mds-legacy-gap-4">
  <aside>Navigation</aside>
  <main>Content Area</main>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`React/JSX:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="mds-legacy-grid-cols-1 mds-legacy-grid-cols-md-sidebar mds-legacy-gap-4">
  <aside><Sidebar /></aside>
  <main><Content /></main>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Live Example:`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-grid-cols-sidebar mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsxs)(`aside`,{style:{background:`#f7fafc`,padding:16,borderRadius:4,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Sidebar`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`,color:`#666`},children:`Fixed 250px width`})]}),(0,u.jsxs)(`main`,{style:{background:`#edf2f7`,padding:16,borderRadius:4,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Main Content`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`,color:`#666`},children:`Flexible width (takes remaining space)`})]})]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-6-column-ordering-mobile-first`,children:`Pattern 6: Column Ordering (Mobile-First)`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: Reorder content for different screen sizes (sidebar-first on desktop, content-first on mobile)`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`HTML:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <!-- Shows first on mobile, second on desktop -->
  <main class="mds-legacy-col-12 mds-legacy-col-md-8 mds-legacy-order-md-2">Main Content</main>
  
  <!-- Shows second on mobile, first on desktop -->
  <aside class="mds-legacy-col-12 mds-legacy-col-md-4 mds-legacy-order-md-1">Sidebar</aside>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`React/JSX:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="mds-legacy-row mds-legacy-gap-4">
  <main className="mds-legacy-col-12 mds-legacy-col-md-8 mds-legacy-order-md-2">
    <Content />
  </main>
  <aside className="mds-legacy-col-12 mds-legacy-col-md-4 mds-legacy-order-md-1">
    <Sidebar />
  </aside>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Live Example:`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsxs)(`main`,{className:`mds-legacy-col-12 mds-legacy-col-md-8 mds-legacy-order-md-2`,style:{background:`#e5edf4`,padding:16,borderRadius:4,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Main Content`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`,color:`#666`},children:`First on mobile, second on desktop`})]}),(0,u.jsxs)(`aside`,{className:`mds-legacy-col-12 mds-legacy-col-md-4 mds-legacy-order-md-1`,style:{background:`#667eea`,color:`white`,padding:16,borderRadius:4},children:[(0,u.jsx)(`strong`,{children:`Sidebar`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`},children:`Second on mobile, first on desktop ←`})]})]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-7-custom-column-count-non-12`,children:`Pattern 7: Custom Column Count (Non-12)`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: Unique layouts like 5-column product grids, 7-column week calendars`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`HTML:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<!-- 5-column grid -->
<div class="mds-legacy-grid-cols-5 mds-legacy-gap-4">
  <div>Mon</div>
  <div>Tue</div>
  <div>Wed</div>
  <div>Thu</div>
  <div>Fri</div>
</div>

<!-- 7-column full week -->
<div class="mds-legacy-grid-cols-7 mds-legacy-gap-3">
  <div>Sun</div>...<div>Sat</div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`React/JSX:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="mds-legacy-grid-cols-5 mds-legacy-gap-4">
  {weekdays.map(day => (
    <DayCard key={day} date={day} />
  ))}
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Live Example:`})}),`
`,(0,u.jsx)(`div`,{className:`mds-legacy-grid-cols-5 mds-legacy-gap-3`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`].map(e=>(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:(0,u.jsx)(`strong`,{children:e})},e))}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`-grid-fundamentals`,children:`📐 Grid Fundamentals`}),`
`,(0,u.jsx)(t.h3,{id:`column-span-variations`,children:`Column span variations`}),`
`,(0,u.jsx)(t.p,{children:`Common span patterns across 12 columns.`}),`
`,(0,u.jsx)(t.p,{children:`Live preview`}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-container`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-row mds-legacy-gap-2`,children:(0,u.jsx)(`div`,{className:`mds-legacy-col-12`,style:{background:`#f4f4f4`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`12`})}),(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-2`,style:{marginTop:8},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-6`,style:{background:`#e5edf4`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`6`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-6`,style:{background:`#e5edf4`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`6`})]}),(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-2`,style:{marginTop:8},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-4`,style:{background:`#c7edff`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`4`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-4`,style:{background:`#c7edff`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`4`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-4`,style:{background:`#c7edff`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`4`})]}),(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-2`,style:{marginTop:8},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-3`,style:{background:`#f0faff`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`3`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-3`,style:{background:`#f0faff`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`3`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-3`,style:{background:`#f0faff`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`3`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-3`,style:{background:`#f0faff`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`3`})]}),(0,u.jsx)(`div`,{className:`mds-legacy-row mds-legacy-gap-2`,style:{marginTop:8},children:Array.from({length:6}).map((e,t)=>(0,u.jsx)(`div`,{className:`mds-legacy-col-2`,style:{background:`#ebebeb`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`2`},t))})]}),`
`,(0,u.jsx)(t.h3,{id:`alignment-grid--flex`,children:`Alignment (grid + flex)`}),`
`,(0,u.jsx)(t.p,{children:`Grid item alignment via utilities, and inner-cell flex alignment when needed.`}),`
`,(0,u.jsx)(t.p,{children:`Live preview`}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-container`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-2 mds-legacy-align-center mds-legacy-justify-center`,style:{minHeight:120},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-4`,style:{background:`#e9f3ff`,padding:8,color:`#1a1a1a`},children:`Center items (grid)`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-4`,style:{background:`#e9f3ff`,padding:8,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#1a1a1a`},children:`Flex center in cell`})]}),(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-2 mds-legacy-content-justify-between mds-legacy-content-align-center`,style:{minHeight:120,marginTop:8},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-3`,style:{background:`#f9f7fb`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`A`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-3`,style:{background:`#f9f7fb`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`B`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-3`,style:{background:`#f9f7fb`,padding:8,textAlign:`center`,color:`#1a1a1a`},children:`C`})]})]}),`
`,(0,u.jsx)(t.h3,{id:`responsive-cards`,children:`Responsive cards`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-container">
  <div class="mds-legacy-row mds-legacy-gap-2">
    <div class="mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
    <div class="mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
    <div class="mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
    <div class="mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
  </div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:`Live preview`}),`
`,(0,u.jsx)(`div`,{className:`mds-legacy-container`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6},children:(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-2`,children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3`,style:{background:`#f9f7fb`,padding:12,color:`#1a1a1a`},children:`Card`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3`,style:{background:`#f9f7fb`,padding:12,color:`#1a1a1a`},children:`Card`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3`,style:{background:`#f9f7fb`,padding:12,color:`#1a1a1a`},children:`Card`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3`,style:{background:`#f9f7fb`,padding:12,color:`#1a1a1a`},children:`Card`})]})}),`
`,(0,u.jsx)(t.h3,{id:`bootstrap-style-helpers-familiarity`,children:`Bootstrap-style helpers (familiarity)`}),`
`,(0,u.jsx)(t.p,{children:`We provide optional aliases inspired by Bootstrap for easier migration:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`Equal-width columns per row: `,(0,u.jsx)(t.code,{children:`.mds-legacy-row-cols-N`}),` (N=1..6), with responsive variants `,(0,u.jsx)(t.code,{children:`.mds-legacy-row-cols-sm-N`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-row-cols-md-N`}),`, etc.`]}),`
`,(0,u.jsxs)(t.li,{children:[`Gap aliases: `,(0,u.jsx)(t.code,{children:`.mds-legacy-g-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gx-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gy-*`}),` mirroring our `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-x-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-y-*`}),`.`]}),`
`]}),`
`,(0,u.jsx)(t.p,{children:`Live preview`}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-container`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-row mds-legacy-row-cols-3 mds-legacy-g-3`,children:Array.from({length:6}).map((e,t)=>(0,u.jsx)(`div`,{style:{background:`#f4fbff`,padding:12,textAlign:`center`,borderRadius:4,color:`#1a1a1a`},children:`Col`},t))}),(0,u.jsx)(`div`,{className:`mds-legacy-row mds-legacy-row-cols-1 mds-legacy-row-cols-md-2 mds-legacy-row-cols-lg-4 mds-legacy-gx-4 mds-legacy-gy-2`,style:{marginTop:8},children:Array.from({length:8}).map((e,t)=>(0,u.jsx)(`div`,{style:{background:`#f7f7ff`,padding:12,textAlign:`center`,borderRadius:4,color:`#1a1a1a`},children:`Col`},t))})]}),`
`,(0,u.jsxs)(t.p,{children:[`Note: Our canonical API is the `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-x-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-y-*`}),` set. The aliases are provided for familiarity and smoother adoption.`]}),`
`,(0,u.jsx)(t.h2,{id:`enhanced-utilities-reference`,children:`Enhanced Utilities Reference`}),`
`,(0,u.jsx)(t.h3,{id:`columns--responsive`,children:`Columns & Responsive`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Columns`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-1`}),`..`,(0,u.jsx)(t.code,{children:`.mds-legacy-col-12`}),`, responsive: `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-sm-6`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-md-4`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-lg-3`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-xl-2`}),`, `,(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-xxl-*`})})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Auto columns`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-col`}),` (equal width), `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-auto`}),` (content-based)`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Custom grids`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-1`}),` to `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-12`}),`, responsive: `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-{bp}-{n}`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Presets`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-auto-fit-{xs|sm|md|lg}`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-sidebar`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-two-thirds`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`spacing-enhanced-scale`,children:`Spacing (Enhanced Scale)`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Standard`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-1`}),` (4px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-2`}),` (8px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-3`}),` (12px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-4`}),` (16px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-6`}),` (24px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-8`}),` (32px)`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Extended`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-9`}),` (36px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-10`}),` (40px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-12`}),` (48px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-16`}),` (64px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-20`}),` (80px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-24`}),` (96px)`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`🆕 Enterprise`}),`: `,(0,u.jsxs)(t.strong,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-gap-28`}),` (112px)`]}),`, `,(0,u.jsxs)(t.strong,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-gap-32`}),` (128px)`]})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Directional`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-x-*`}),` (column-gap) and `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-y-*`}),` (row-gap)`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Responsive`}),`: All gaps support `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-{bp}-{n}`}),` (including `,(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-xxl-*`})}),`)`]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`-aspect-ratios`,children:`🆕 Aspect Ratios`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-square`})}),` (1:1) - Perfect for profile images, icons`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-video`})}),` (16:9) - Video players, hero images`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-4-3`})}),` (4:3) - Traditional photography`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-3-2`})}),` (3:2) - Modern photography`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-21-9`})}),` (21:9) - Ultra-wide content`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-auto`})}),` - Reset to natural ratio`]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`-subgrid-future-ready`,children:`🆕 Subgrid (Future-Ready)`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-subgrid-cols`})}),` - Inherit parent's column tracks`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-subgrid-rows`})}),` - Inherit parent's row tracks`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-subgrid-both`})}),` - Inherit both column and row tracks`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Responsive`}),`: All subgrid utilities support `,(0,u.jsx)(t.code,{children:`.mds-legacy-subgrid-{type}-{bp}`}),` variants`]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`containers`,children:`Containers`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-container`})}),` - Responsive centered container (540px → 1800px max-width)`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-container-fluid`})}),` - Full-width container with consistent padding`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`🆕 Container queries`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-container-query`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-container-query-size`}),` (future-ready)`]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`alignment--layout`,children:`Alignment & Layout`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Item alignment`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-align-{start|center|end}`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-justify-{start|center|end}`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Content alignment`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-content-justify-*`}),` / `,(0,u.jsx)(t.code,{children:`.mds-legacy-content-align-*`}),` for grid tracks`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Row spanning`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-1`}),` to `,(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-6`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-full`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Column spanning`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-span-1`}),` to `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-span-12`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-span-full`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Grid flow`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-flow-{row|col|dense}`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`offsets--positioning`,children:`Offsets & Positioning`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Offsets`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-offset-1`}),`..`,(0,u.jsx)(t.code,{children:`.mds-legacy-offset-11`}),`, responsive: `,(0,u.jsx)(t.code,{children:`.mds-legacy-offset-{bp}-{n}`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Start position`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-start-{n}`}),` to place item at specific grid track`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Responsive variants`}),`: All positioning supports breakpoint variants`]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`visibility--ordering`,children:`Visibility & Ordering`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Hide/Show`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-hidden-{bp}`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-visible-{bp}`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Ordering`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-0`}),` to `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-12`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-first`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-last`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Responsive ordering`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-{bp}-{n}`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-{bp}-first`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-{bp}-last`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`breakpoints-enhanced`,children:`Breakpoints (Enhanced)`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`xs`})}),`: 0px (mobile-first baseline)`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`sm`})}),`: 600px → `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-sm-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-sm-*`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`md`})}),`: 900px → `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-md-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-md-*`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`lg`})}),`: 1024px → `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-lg-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-lg-*`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`xl`})}),`: 1200px → `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-xl-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-xl-*`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsxs)(t.strong,{children:[`🆕 `,(0,u.jsx)(t.code,{children:`xxl`})]}),`: `,(0,u.jsxs)(t.strong,{children:[`1540px → `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-xxl-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-xxl-*`})]})]}),`
`,(0,u.jsxs)(t.li,{children:[`Fluid container: `,(0,u.jsx)(t.code,{children:`.mds-legacy-container-fluid`}),` uses full width with consistent horizontal padding`]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`auto-fit-cards-grid`,children:`Auto-fit cards grid`}),`
`,(0,u.jsx)(t.p,{children:`When you don’t know how many cards fit per row, use the auto grid:`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-row-auto" style="--mds-grid-col-min: 220px">
  <div class="card">A</div>
  <div class="card">B</div>
  <div class="card">C</div>
  <div class="card">D</div>
  <div class="card">E</div>
  <div class="card">F</div>
  <!-- more cards -->
  </div>
`})}),`
`,(0,u.jsx)(t.p,{children:`Live preview`}),`
`,(0,u.jsx)(`div`,{className:`mds-legacy-row-auto`,style:{"--mds-grid-col-min":`220px`,border:`1px solid #e5e7eb`,padding:8,borderRadius:6},children:Array.from({length:9}).map((e,t)=>(0,u.jsxs)(`div`,{className:`card`,style:{background:`#f9f7fb`,padding:12,textAlign:`center`,borderRadius:4,color:`#1a1a1a`},children:[`Card `,t+1]},t))}),`
`,(0,u.jsx)(t.h3,{id:`fluid-container`,children:`Fluid container`}),`
`,(0,u.jsxs)(t.p,{children:[`Use `,(0,u.jsx)(t.code,{children:`.mds-legacy-container-fluid`}),` for full-width sections that still need consistent side padding.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-container-fluid">
  <div class="mds-legacy-row mds-legacy-gap-x-4 mds-legacy-gap-y-3">
    <div class="mds-legacy-col-12 mds-legacy-col-md-6" style="background:#eef6ff; padding:8px">Half</div>
    <div class="mds-legacy-col-12 mds-legacy-col-md-6" style="background:#eef6ff; padding:8px">Half</div>
  </div>
</div>
`})}),`
`,(0,u.jsx)(t.p,{children:`Live preview`}),`
`,(0,u.jsx)(`div`,{className:`mds-legacy-container-fluid`,style:{border:`1px dashed #cdd6e1`,paddingBlock:8,borderRadius:6},children:(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-x-4 mds-legacy-gap-y-3`,children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md-6`,style:{background:`#eef6ff`,padding:8},children:`Half`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md-6`,style:{background:`#eef6ff`,padding:8},children:`Half`})]})}),`
`,(0,u.jsx)(t.h2,{id:`customize`,children:`Customize`}),`
`,(0,u.jsx)(t.p,{children:`Override defaults before importing:`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-scss`,children:`$base-unit: 0.25rem; // 4px at 16px root
$gutter: 0.5rem;     // 8px at 16px root
$columns: 12;
@use '../styles/grid' as *;
`})}),`
`,(0,u.jsxs)(t.p,{children:[`Adjust `,(0,u.jsx)(t.code,{children:`$breakpoints`}),` and `,(0,u.jsx)(t.code,{children:`$container-max`}),` for different responsive behavior.`]}),`
`,(0,u.jsx)(t.h3,{id:`runtime-tuning-via-css-variables`,children:`Runtime tuning via CSS variables`}),`
`,(0,u.jsx)(t.p,{children:`You can tune grid gaps and min column width at runtime per section without recompiling Sass:`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-row" style="--mds-grid-gap: 12px">…</div>
<div class="mds-legacy-row-auto" style="--mds-grid-col-min: 240px">…</div>
`})}),`
`,(0,u.jsx)(t.p,{children:`This is helpful for special layouts (e.g., tighter gaps on dense dashboards) while keeping defaults aligned to the design tokens.`}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`phase-1-enhancements-advanced-grid-features`,children:`Phase 1 Enhancements: Advanced Grid Features`}),`
`,(0,u.jsx)(t.h3,{id:`non-12-column-grids`,children:`Non-12-Column Grids`}),`
`,(0,u.jsxs)(t.p,{children:[`Use `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-{N}`}),` to create grids with any column count (not just 12):`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-grid-cols-5 mds-legacy-gap-4">
  <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-grid-cols-5 mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6},children:[(0,u.jsx)(`div`,{style:{background:`#e5edf4`,padding:8,textAlign:`center`},children:`1`}),(0,u.jsx)(`div`,{style:{background:`#c7edff`,padding:8,textAlign:`center`},children:`2`}),(0,u.jsx)(`div`,{style:{background:`#e5edf4`,padding:8,textAlign:`center`},children:`3`}),(0,u.jsx)(`div`,{style:{background:`#c7edff`,padding:8,textAlign:`center`},children:`4`}),(0,u.jsx)(`div`,{style:{background:`#e5edf4`,padding:8,textAlign:`center`},children:`5`})]}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`7-Column Dashboard Example`}),`:`]}),`
`,(0,u.jsx)(`div`,{className:`mds-legacy-grid-cols-7 mds-legacy-gap-3`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:Array.from({length:7}).map((e,t)=>(0,u.jsxs)(`div`,{style:{background:`#f0faff`,padding:8,textAlign:`center`,borderRadius:4},children:[`Col `,t+1]},t))}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Responsive`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-1 .mds-legacy-grid-cols-md-3 .mds-legacy-grid-cols-lg-5`}),` stacks on mobile, 3 cols on tablet, 5 cols on desktop.`]}),`
`,(0,u.jsx)(t.h3,{id:`row-spanning-dashboard-widgets`,children:`Row Spanning (Dashboard Widgets)`}),`
`,(0,u.jsxs)(t.p,{children:[`Use `,(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-{N}`}),` to span multiple rows:`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-grid-cols-3 mds-legacy-grid-rows-3 mds-legacy-gap-4">
  <div class="mds-legacy-row-span-2">Tall widget</div>
  <div>Widget A</div>
  <div class="mds-legacy-row-span-3">Full height</div>
  <div>Widget B</div>
  <div>Widget C</div>
  <div>Widget D</div>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-grid-cols-3 mds-legacy-grid-rows-3 mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-row-span-2`,style:{background:`#e5edf4`,padding:12,display:`flex`,alignItems:`center`,justifyContent:`center`,borderRadius:4},children:(0,u.jsxs)(t.p,{children:[`Tall Widget`,(0,u.jsx)(`br`,{}),`(2 rows)`]})}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:`Widget A`}),(0,u.jsx)(`div`,{className:`mds-legacy-row-span-3`,style:{background:`#c7edff`,padding:12,display:`flex`,alignItems:`center`,justifyContent:`center`,borderRadius:4},children:(0,u.jsxs)(t.p,{children:[`Full Height`,(0,u.jsx)(`br`,{}),`(3 rows)`]})}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:`Widget B`}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:`Widget C`}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:`Widget D`})]}),`
`,(0,u.jsx)(t.h3,{id:`extended-gap-scale`,children:`Extended Gap Scale`}),`
`,(0,u.jsxs)(t.p,{children:[`Larger gaps for spacious layouts (`,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-9`}),` through `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-24`}),`):`]}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-grid-cols-3 mds-legacy-gap-16`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{style:{background:`#e5edf4`,padding:12,textAlign:`center`,borderRadius:4},children:`64px gap`}),(0,u.jsx)(`div`,{style:{background:`#c7edff`,padding:12,textAlign:`center`,borderRadius:4},children:`(.gap-16)`}),(0,u.jsx)(`div`,{style:{background:`#e5edf4`,padding:12,textAlign:`center`,borderRadius:4},children:`Spacious!`})]}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Available`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-9`}),` (36px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-10`}),` (40px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-12`}),` (48px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-16`}),` (64px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-20`}),` (80px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-24`}),` (96px)`]}),`
`,(0,u.jsx)(t.h3,{id:`dense-grid-packing`,children:`Dense Grid Packing`}),`
`,(0,u.jsxs)(t.p,{children:[`Use `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-flow-dense`}),` for masonry-like layouts that fill gaps:`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-grid-cols-4 mds-legacy-gap-3 mds-legacy-grid-flow-dense">
  <div class="mds-legacy-col-span-2 mds-legacy-row-span-2">Large</div>
  <div>1</div><div>2</div><div>3</div><div>4</div>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-grid-cols-4 mds-legacy-gap-3 mds-legacy-grid-flow-dense`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-span-2 mds-legacy-row-span-2`,style:{background:`#c7edff`,padding:12,display:`flex`,alignItems:`center`,justifyContent:`center`,borderRadius:4,minHeight:120},children:(0,u.jsx)(t.p,{children:`Large Item`})}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:`1`}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:`2`}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:`3`}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:`4`}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:`5`}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:`6`})]}),`
`,(0,u.jsx)(t.h3,{id:`asymmetric-presets`,children:`Asymmetric Presets`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Sidebar Layout`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-sidebar`}),` (250px + 1fr)`]}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-grid-cols-sidebar mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsxs)(`div`,{style:{background:`#e5edf4`,padding:12,textAlign:`center`,borderRadius:4},children:[`Sidebar`,(0,u.jsx)(`br`,{}),`250px`]}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:`Main Content (flexible)`})]}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Two-Thirds Layout`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-two-thirds`}),` (2fr + 1fr)`]}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-grid-cols-two-thirds mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{style:{background:`#e5edf4`,padding:12,textAlign:`center`,borderRadius:4},children:`Main (2/3)`}),(0,u.jsx)(`div`,{style:{background:`#c7edff`,padding:12,textAlign:`center`,borderRadius:4},children:`Aside (1/3)`})]}),`
`,(0,u.jsx)(t.h3,{id:`auto-fit-presets`,children:`Auto-Fit Presets`}),`
`,(0,u.jsx)(t.p,{children:`Pre-configured auto-fit grids with common minimum widths:`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-auto-fit-sm`})}),` (200px min):`]}),`
`,(0,u.jsx)(`div`,{className:`mds-legacy-grid-auto-fit-sm mds-legacy-gap-3`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:Array.from({length:6}).map((e,t)=>(0,u.jsxs)(`div`,{style:{background:`#f0faff`,padding:12,textAlign:`center`,borderRadius:4},children:[`Card `,t+1]},t))}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-auto-fit-md`})}),` (300px min):`]}),`
`,(0,u.jsx)(`div`,{className:`mds-legacy-grid-auto-fit-md mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:Array.from({length:4}).map((e,t)=>(0,u.jsxs)(`div`,{style:{background:`#e5edf4`,padding:16,textAlign:`center`,borderRadius:4},children:[`Product `,t+1]},t))}),`
`,(0,u.jsx)(t.h3,{id:`auto-sized-columns`,children:`Auto-Sized Columns`}),`
`,(0,u.jsxs)(t.p,{children:[`Use `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-auto`}),` for content-based sizing:`]}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-auto`,style:{background:`#e5edf4`,padding:12,borderRadius:4},children:(0,u.jsx)(`button`,{style:{padding:`8px 16px`,background:`#1976d2`,color:`white`,border:`none`,borderRadius:4,cursor:`pointer`},children:`Action`})}),(0,u.jsx)(`div`,{className:`mds-legacy-col`,style:{background:`#f0faff`,padding:12,borderRadius:4},children:`Flexible content area (takes remaining space)`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-auto`,style:{background:`#e5edf4`,padding:12,borderRadius:4},children:(0,u.jsx)(`button`,{style:{padding:`8px 16px`,background:`#d32f2f`,color:`white`,border:`none`,borderRadius:4,cursor:`pointer`},children:`Delete`})})]}),`
`,(0,u.jsx)(t.h3,{id:`responsive-visibility`,children:`Responsive Visibility`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Hide at specific breakpoints`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-hidden-xs`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-hidden-md`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-hidden-lg`})]}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Show only at breakpoints`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-visible-md`}),` (only visible on tablets)`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-hidden-xs">Hidden on mobile</div>
<div class="mds-legacy-visible-lg">Only visible on large screens</div>
`})}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`complete-utility-reference`,children:`Complete Utility Reference`}),`
`,(0,u.jsx)(t.h3,{id:`column-spanning`,children:`Column Spanning`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-col-1`}),` to `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-12`}),` • `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-{bp}-{N}`}),` • `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-auto`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`grid-template-columns`,children:`Grid Template Columns`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-1`}),` to `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-12`}),` • `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-{bp}-{N}`})]}),`
`,(0,u.jsxs)(t.li,{children:[`Presets: `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-auto-fit-{xs|sm|md|lg}`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-sidebar`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-two-thirds`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`row-spanning`,children:`Row Spanning`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-1`}),` to `,(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-6`}),` • `,(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-full`}),` • `,(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-{bp}-{N}`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`grid-rows`,children:`Grid Rows`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-grid-rows-1`}),` to `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-rows-6`}),` • `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-rows-{bp}-{N}`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`gaps`,children:`Gaps`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`Standard: `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-0`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-1`}),` (4px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-2`}),` (8px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-4`}),` (16px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-8`}),` (32px)`]}),`
`,(0,u.jsxs)(t.li,{children:[`Extended: `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-9`}),` (36px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-12`}),` (48px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-16`}),` (64px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-20`}),` (80px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-24`}),` (96px)`]}),`
`,(0,u.jsxs)(t.li,{children:[`Directional: `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-x-{N}`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-y-{N}`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gx-{N}`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gy-{N}`})]}),`
`,(0,u.jsxs)(t.li,{children:[`Responsive: `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-{bp}-{N}`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`alignment`,children:`Alignment`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`Items: `,(0,u.jsx)(t.code,{children:`.mds-legacy-align-{start|center|end}`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-justify-{start|center|end}`})]}),`
`,(0,u.jsxs)(t.li,{children:[`Content: `,(0,u.jsx)(t.code,{children:`.mds-legacy-content-align-{start|center|end|between|around|evenly}`})]}),`
`,(0,u.jsxs)(t.li,{children:[`Place: `,(0,u.jsx)(t.code,{children:`.mds-legacy-place-items-{start|center|end|stretch}`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-place-content-{start|center|end|between}`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`grid-flow`,children:`Grid Flow`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-grid-flow-row`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-flow-col`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-flow-dense`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`visibility`,children:`Visibility`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-hidden-{xs|sm|md|lg|xl}`}),` • `,(0,u.jsx)(t.code,{children:`.mds-legacy-visible-{xs|sm|md|lg|xl}`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`offsets`,children:`Offsets`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-offset-1`}),` to `,(0,u.jsx)(t.code,{children:`.mds-legacy-offset-11`}),` • `,(0,u.jsx)(t.code,{children:`.mds-legacy-offset-{bp}-{N}`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`ordering-bootstrap-inspired`,children:`Ordering (Bootstrap-inspired)`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-order-0`}),` to `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-12`}),` • `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-first`}),` • `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-last`})]}),`
`,(0,u.jsxs)(t.li,{children:[`Responsive: `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-{bp}-{N}`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-{bp}-first`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-{bp}-last`})]}),`
`]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`bootstrap-inspired-patterns`,children:`Bootstrap-Inspired Patterns`}),`
`,(0,u.jsx)(t.h3,{id:`equal-width-columns-auto-layout`,children:`Equal-Width Columns (Auto-Layout)`}),`
`,(0,u.jsxs)(t.p,{children:[`Use `,(0,u.jsx)(t.code,{children:`.mds-legacy-col`}),` (no number) for equal-width columns:`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col">1 of 2</div>
  <div class="mds-legacy-col">2 of 2</div>
</div>

<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col">1 of 3</div>
  <div class="mds-legacy-col">2 of 3</div>
  <div class="mds-legacy-col">3 of 3</div>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col`,style:{background:`#e5edf4`,padding:12,textAlign:`center`},children:`1 of 2`}),(0,u.jsx)(`div`,{className:`mds-legacy-col`,style:{background:`#c7edff`,padding:12,textAlign:`center`},children:`2 of 2`})]}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col`,style:{background:`#e5edf4`,padding:12,textAlign:`center`},children:`1 of 3`}),(0,u.jsx)(`div`,{className:`mds-legacy-col`,style:{background:`#f0faff`,padding:12,textAlign:`center`},children:`2 of 3`}),(0,u.jsx)(`div`,{className:`mds-legacy-col`,style:{background:`#c7edff`,padding:12,textAlign:`center`},children:`3 of 3`})]}),`
`,(0,u.jsx)(t.h3,{id:`column-ordering`,children:`Column Ordering`}),`
`,(0,u.jsx)(t.p,{children:`Reorder columns visually without changing HTML:`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col mds-legacy-order-3">First in DOM (order: 3)</div>
  <div class="mds-legacy-col mds-legacy-order-1">Second in DOM (order: 1)</div>
  <div class="mds-legacy-col mds-legacy-order-2">Third in DOM (order: 2)</div>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col mds-legacy-order-3`,style:{background:`#e5edf4`,padding:12,textAlign:`center`},children:(0,u.jsxs)(t.p,{children:[`First in DOM`,(0,u.jsx)(`br`,{}),(0,u.jsx)(`small`,{children:`(order: 3)`})]})}),(0,u.jsx)(`div`,{className:`mds-legacy-col mds-legacy-order-1`,style:{background:`#c7edff`,padding:12,textAlign:`center`},children:(0,u.jsxs)(t.p,{children:[`Second in DOM`,(0,u.jsx)(`br`,{}),(0,u.jsx)(`small`,{children:`(order: 1) ← Shows first`})]})}),(0,u.jsx)(`div`,{className:`mds-legacy-col mds-legacy-order-2`,style:{background:`#f0faff`,padding:12,textAlign:`center`},children:(0,u.jsxs)(t.p,{children:[`Third in DOM`,(0,u.jsx)(`br`,{}),(0,u.jsx)(`small`,{children:`(order: 2)`})]})})]}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Responsive ordering`}),` (mobile-first):`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col-12 mds-legacy-col-md mds-legacy-order-md-2">Main content (first on mobile, second on desktop)</div>
  <div class="mds-legacy-col-12 mds-legacy-col-md mds-legacy-order-md-1">Sidebar (second on mobile, first on desktop)</div>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md mds-legacy-order-md-2`,style:{background:`#e5edf4`,padding:12,textAlign:`center`},children:(0,u.jsxs)(t.p,{children:[`Main content`,(0,u.jsx)(`br`,{}),(0,u.jsx)(`small`,{children:`(first on mobile, second on desktop)`})]})}),(0,u.jsx)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md mds-legacy-order-md-1`,style:{background:`#c7edff`,padding:12,textAlign:`center`},children:(0,u.jsxs)(t.p,{children:[`Sidebar`,(0,u.jsx)(`br`,{}),(0,u.jsx)(`small`,{children:`(second on mobile, first on desktop)`})]})})]}),`
`,(0,u.jsx)(t.h3,{id:`mix-fixed-and-auto-columns`,children:`Mix Fixed and Auto Columns`}),`
`,(0,u.jsx)(t.p,{children:`Set one column width, others auto-fill:`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col">Auto-width</div>
  <div class="mds-legacy-col-6">Fixed 6 columns</div>
  <div class="mds-legacy-col">Auto-width</div>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col`,style:{background:`#e5edf4`,padding:12,textAlign:`center`},children:`Auto`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-6`,style:{background:`#c7edff`,padding:12,textAlign:`center`},children:`Fixed 50%`}),(0,u.jsx)(`div`,{className:`mds-legacy-col`,style:{background:`#e5edf4`,padding:12,textAlign:`center`},children:`Auto`})]}),`
`,(0,u.jsx)(t.h3,{id:`responsive-equal-width`,children:`Responsive Equal-Width`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col-12 mds-legacy-col-md">Stacked mobile, equal desktop</div>
  <div class="mds-legacy-col-12 mds-legacy-col-md">Stacked mobile, equal desktop</div>
  <div class="mds-legacy-col-12 mds-legacy-col-md">Stacked mobile, equal desktop</div>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`mds-legacy-row mds-legacy-gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsx)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md`,style:{background:`#e5edf4`,padding:12,textAlign:`center`},children:`Stacked → Equal`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md`,style:{background:`#f0faff`,padding:12,textAlign:`center`},children:`Stacked → Equal`}),(0,u.jsx)(`div`,{className:`mds-legacy-col-12 mds-legacy-col-md`,style:{background:`#c7edff`,padding:12,textAlign:`center`},children:`Stacked → Equal`})]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`complete-utility-reference-1`,children:`Complete Utility Reference`}),`
`,(0,u.jsxs)(`div`,{style:{color:`#1a1a1a`,background:`transparent`},children:[(0,u.jsx)(t.h3,{id:`column-classes`,children:`Column Classes`}),(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Class`}),(0,u.jsx)(t.th,{children:`Description`}),(0,u.jsx)(t.th,{children:`Responsive Variants`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-{1-12}`})}),(0,u.jsx)(t.td,{children:`Span N columns out of 12`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-{bp}-{1-12}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col`})}),(0,u.jsx)(t.td,{children:`Equal-width auto column (Bootstrap-style)`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-{bp}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-auto`})}),(0,u.jsx)(t.td,{children:`Size to content`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-{bp}-auto`})})]})]})]}),(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Example:`}),` `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-6 .mds-legacy-col-md-4 .mds-legacy-col-lg-3`}),` → 50% mobile → 33% tablet → 25% desktop`]}),(0,u.jsx)(t.h3,{id:`grid-layout-classes`,children:`Grid Layout Classes`}),(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Class`}),(0,u.jsx)(t.th,{children:`Description`}),(0,u.jsx)(t.th,{children:`Responsive Variants`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-{1-12}`})}),(0,u.jsx)(t.td,{children:`Create N-column grid`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-{bp}-{1-12}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-rows-{1-6}`})}),(0,u.jsx)(t.td,{children:`Create N-row grid`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-rows-{bp}-{1-6}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-auto-fit-{xs|sm|md|lg}`})}),(0,u.jsx)(t.td,{children:`Auto-fit columns at min size (150/200/300/400px)`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-auto-fit-{bp}-{size}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-sidebar`})}),(0,u.jsx)(t.td,{children:`Fixed 250px + flexible column`}),(0,u.jsx)(t.td,{children:`—`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-two-thirds`})}),(0,u.jsx)(t.td,{children:`2fr + 1fr asymmetric layout`}),(0,u.jsx)(t.td,{children:`—`})]})]})]}),(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Example:`}),` `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-cols-2 .mds-legacy-grid-cols-md-4`}),` → 2 columns mobile → 4 columns tablet`]}),(0,u.jsx)(t.h3,{id:`row--column-spanning`,children:`Row & Column Spanning`}),(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Class`}),(0,u.jsx)(t.th,{children:`Description`}),(0,u.jsx)(t.th,{children:`Responsive Variants`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-{1-6}`})}),(0,u.jsx)(t.td,{children:`Span N rows`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-{bp}-{1-6}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-full`})}),(0,u.jsx)(t.td,{children:`Span all rows`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-{bp}-full`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-span-{1-12}`})}),(0,u.jsx)(t.td,{children:`Span N columns`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-span-{bp}-{1-12}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-span-full`})}),(0,u.jsx)(t.td,{children:`Span all columns`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-span-{bp}-full`})})]})]})]}),(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Example:`}),` `,(0,u.jsx)(t.code,{children:`.mds-legacy-row-span-2`}),` makes a widget span 2 rows in dashboard layouts`]}),(0,u.jsx)(t.h3,{id:`gap--spacing`,children:`Gap & Spacing`}),(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Class`}),(0,u.jsx)(t.th,{children:`Description`}),(0,u.jsx)(t.th,{children:`Responsive Variants`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-{0-8}`})}),(0,u.jsx)(t.td,{children:`Gap from 0-32px (4px scale)`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-{bp}-{0-8}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-{9-24}`})}),(0,u.jsx)(t.td,{children:`Extended gaps 36-96px`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-{bp}-{9-24}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-x-{0-24}`})}),(0,u.jsx)(t.td,{children:`Horizontal gap only`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-x-{bp}-{0-24}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-y-{0-24}`})}),(0,u.jsx)(t.td,{children:`Vertical gap only`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-y-{bp}-{0-24}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-no-gutters`})}),(0,u.jsx)(t.td,{children:`Remove all gaps`}),(0,u.jsx)(t.td,{children:`—`})]})]})]}),(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Gap Scale:`}),` 0, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 56px, 64px, 72px, 80px, 88px, 96px`]}),(0,u.jsx)(t.h3,{id:`ordering`,children:`Ordering`}),(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Class`}),(0,u.jsx)(t.th,{children:`Description`}),(0,u.jsx)(t.th,{children:`Responsive Variants`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-order-{0-12}`})}),(0,u.jsx)(t.td,{children:`Set explicit order`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-order-{bp}-{0-12}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-order-first`})}),(0,u.jsx)(t.td,{children:`Move to start (-1)`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-order-{bp}-first`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-order-last`})}),(0,u.jsx)(t.td,{children:`Move to end (13)`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-order-{bp}-last`})})]})]})]}),(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Example:`}),` `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-2 .mds-legacy-order-md-1`}),` → Order 2 on mobile → Order 1 on tablet`]}),(0,u.jsx)(t.h3,{id:`alignment--justification`,children:`Alignment & Justification`}),(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Class`}),(0,u.jsx)(t.th,{children:`Description`}),(0,u.jsx)(t.th,{children:`Responsive Variants`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-items-start|center|end|baseline|stretch`})}),(0,u.jsx)(t.td,{children:`Align items (cross-axis)`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-items-{bp}-{value}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-justify-start|center|end|between|around|evenly`})}),(0,u.jsx)(t.td,{children:`Justify content (main-axis)`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-justify-{bp}-{value}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-place-items-{start|center|end|stretch}`})}),(0,u.jsx)(t.td,{children:`Combined item placement`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-place-items-{bp}-{value}`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-place-content-{start|center|end|between|around|evenly}`})}),(0,u.jsx)(t.td,{children:`Combined content placement`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-place-content-{bp}-{value}`})})]})]})]}),(0,u.jsx)(t.h3,{id:`grid-flow-1`,children:`Grid Flow`}),(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Class`}),(0,u.jsx)(t.th,{children:`Description`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-flow-row`})}),(0,u.jsx)(t.td,{children:`Fill row by row (default)`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-flow-col`})}),(0,u.jsx)(t.td,{children:`Fill column by column`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-flow-dense`})}),(0,u.jsx)(t.td,{children:`Auto-fill gaps (masonry)`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-flow-row-dense`})}),(0,u.jsx)(t.td,{children:`Row fill with gap packing`})]})]})]}),(0,u.jsx)(t.h3,{id:`visibility-1`,children:`Visibility`}),(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Class`}),(0,u.jsx)(t.th,{children:`Description`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-hidden-{bp}`})}),(0,u.jsx)(t.td,{children:`Hide at breakpoint and up`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-visible-{bp}`})}),(0,u.jsx)(t.td,{children:`Show at breakpoint and up`})]})]})]}),(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Example:`}),` `,(0,u.jsx)(t.code,{children:`.mds-legacy-hidden-md`}),` hides element on tablet and desktop`]}),(0,u.jsx)(t.h3,{id:`breakpoints`,children:`Breakpoints`}),(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Name`}),(0,u.jsx)(t.th,{children:`Min Width`}),(0,u.jsx)(t.th,{children:`Usage`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`xs`})}),(0,u.jsx)(t.td,{children:`0px`}),(0,u.jsx)(t.td,{children:`Default (mobile-first)`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`sm`})}),(0,u.jsx)(t.td,{children:`576px`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-sm-6`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`md`})}),(0,u.jsx)(t.td,{children:`768px`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-md-4`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`lg`})}),(0,u.jsx)(t.td,{children:`1024px`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-lg-3`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`xl`})}),(0,u.jsx)(t.td,{children:`1200px`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-xl-2`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`xxl`})})}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.strong,{children:`1540px`})}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-col-xxl-*`})})})]})]})]})]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`-enhanced-features-2024`,children:`🆕 Enhanced Features (2024)`}),`
`,(0,u.jsx)(t.p,{children:`The grid system has been significantly enhanced with modern enterprise features:`}),`
`,(0,u.jsx)(t.h3,{id:`-new-in-grid-20`,children:`⭐ New in Grid 2.0`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`XXL Breakpoint`}),` (1540px): Ultra-wide screen support`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Extended Spacing`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-28`}),` (112px), `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-32`}),` (128px) for enterprise layouts`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Aspect Ratio Utilities`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-video`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-square`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-4-3`}),`, etc.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Subgrid Support`}),`: Future-ready alignment with `,(0,u.jsx)(t.code,{children:`.mds-legacy-subgrid-cols`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-subgrid-rows`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Container Queries`}),`: Prepared for element-based responsive design`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`XXL-Specific Utilities`}),`: Full responsive support for ultra-wide screens`]}),`
`]}),`
`,(0,u.jsx)(t.p,{children:`The sections below (Enterprise Dashboard examples, Subgrid alignment, browser support matrix, migration notes) cover all of the above — this page is the single source now, no separate enhancement guide.`}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,u.jsx)(t.h3,{id:`scss-variables`,children:`SCSS Variables`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-scss`,children:`// Override in your styles
$grid-columns: 12;        // Total columns
$gutter: 8px;             // Default gap
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 1024px,
  xl: 1200px,
  xxl: 1540px
);
`})}),`
`,(0,u.jsx)(t.h3,{id:`css-custom-properties`,children:`CSS Custom Properties`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-css`,children:`/* Runtime customization */
.custom-grid {
  --mds-grid-gap: 24px;  /* Custom gap per instance */
}
`})}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`tips--best-practices`,children:`Tips & Best Practices`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Mobile-First Approach`})}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`Start with mobile layout (`,(0,u.jsx)(t.code,{children:`.mds-legacy-col-12`}),`), then add breakpoints`]}),`
`,(0,u.jsxs)(t.li,{children:[`Example: `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-12 .mds-legacy-col-md-6 .mds-legacy-col-lg-4`}),` → Stack → 2 cols → 3 cols`]}),`
`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Performance`})}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`Use `,(0,u.jsx)(t.code,{children:`.mds-legacy-grid-auto-fit-md`}),` for responsive cards instead of multiple breakpoints`]}),`
`,(0,u.jsxs)(t.li,{children:[`Prefer `,(0,u.jsx)(t.code,{children:`.mds-legacy-col`}),` for equal-width layouts (simpler than `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-{1-12}`}),`)`]}),`
`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Accessibility`})}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`Use `,(0,u.jsx)(t.code,{children:`.mds-legacy-order-*`}),` to reorder visually, but keep DOM order logical for screen readers`]}),`
`,(0,u.jsx)(t.li,{children:`Ensure sufficient color contrast in custom backgrounds`}),`
`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Debugging`})}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`Add borders temporarily: `,(0,u.jsx)(t.code,{children:`.mds-legacy-row { border: 2px solid red; } .mds-legacy-col { border: 1px solid blue; }`})]}),`
`,(0,u.jsx)(t.li,{children:`Use browser DevTools Grid Inspector to visualize layout`}),`
`]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`-complete-quick-reference`,children:`📖 Complete Quick Reference`}),`
`,(0,u.jsx)(t.h3,{id:`-most-common-classes-copy--paste`,children:`🏗 Most Common Classes (Copy & Paste)`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<!-- Responsive containers -->
<div class="mds-legacy-container">Centered, max-width responsive</div>
<div class="mds-legacy-container-fluid">Full-width with padding</div>

<!-- Basic responsive layout -->
<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col-12 mds-legacy-col-md-8">Main content</div>
  <div class="mds-legacy-col-12 mds-legacy-col-md-4">Sidebar</div>
</div>

<!-- Auto-fit card grid -->
<div class="mds-legacy-grid-auto-fit-md mds-legacy-gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

<!-- Enterprise dashboard with XXL support -->
<div class="mds-legacy-row mds-legacy-gap-xxl-32 mds-legacy-gap-xl-24 mds-legacy-gap-lg-16 mds-legacy-gap-6">
  <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric</div>
  <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric</div>
  <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric</div>
  <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric</div>
</div>

<!-- Aspect ratio media -->
<div class="mds-legacy-aspect-video">16:9 video content</div>
<div class="mds-legacy-aspect-square">1:1 square content</div>
<div class="mds-legacy-aspect-4-3">4:3 classic content</div>

<!-- Subgrid alignment (future) -->
<div class="mds-legacy-row mds-legacy-gap-6" style="grid-template-rows: auto 1fr auto;">
  <div class="mds-legacy-col-4 mds-legacy-subgrid-rows">
    <h4>Header</h4>
    <p>Variable content...</p>
    <button>Action</button>
  </div>
</div>
`})}),`
`,(0,u.jsx)(t.h3,{id:`-breakpoint-decision-tree`,children:`🎯 Breakpoint Decision Tree`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Which breakpoint to use?`})}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`xs`}),` (0px): `,(0,u.jsx)(t.strong,{children:`Always start here`}),` - mobile-first`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`sm`}),` (600px): Large phones in landscape, small tablets`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`md`}),` (900px): Tablets in portrait, small laptops`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`lg`}),` (1024px): Laptops, desktops`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`xl`}),` (1200px): Large desktops, external monitors`]}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsxs)(t.strong,{children:[(0,u.jsx)(t.code,{children:`xxl`}),` (1540px): Ultra-wide monitors, enterprise dashboards`]})}),`
`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Common responsive patterns:`})}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Two-column`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-12 .mds-legacy-col-md-8`}),` + `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-12 .mds-legacy-col-md-4`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Three-column`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-12 .mds-legacy-col-md-6 .mds-legacy-col-lg-4`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Four-column`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-12 .mds-legacy-col-md-6 .mds-legacy-col-lg-4 .mds-legacy-col-xl-3`})]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`🆕 Ultra-wide`}),`: `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-xxl-3 .mds-legacy-col-xl-4 .mds-legacy-col-lg-6 .mds-legacy-col-md-12`})]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`-spacing-scale-quick-reference`,children:`📏 Spacing Scale Quick Reference`}),`
`,(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Class`}),(0,u.jsx)(t.th,{children:`Value`}),(0,u.jsx)(t.th,{children:`When to Use`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-1`})}),(0,u.jsx)(t.td,{children:`4px`}),(0,u.jsx)(t.td,{children:`Tight content, buttons`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-2`})}),(0,u.jsx)(t.td,{children:`8px`}),(0,u.jsx)(t.td,{children:`Form fields, list items`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-3`})}),(0,u.jsx)(t.td,{children:`12px`}),(0,u.jsx)(t.td,{children:`Card padding, small gaps`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-4`})}),(0,u.jsx)(t.td,{children:`16px`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.strong,{children:`Most common - general spacing`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-6`})}),(0,u.jsx)(t.td,{children:`24px`}),(0,u.jsx)(t.td,{children:`Section spacing, large cards`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-8`})}),(0,u.jsx)(t.td,{children:`32px`}),(0,u.jsx)(t.td,{children:`Component spacing`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-12`})}),(0,u.jsx)(t.td,{children:`48px`}),(0,u.jsx)(t.td,{children:`Large section gaps`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-16`})}),(0,u.jsx)(t.td,{children:`64px`}),(0,u.jsx)(t.td,{children:`Major section divisions`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-gap-24`})}),(0,u.jsx)(t.td,{children:`96px`}),(0,u.jsx)(t.td,{children:`Page-level spacing`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsxs)(t.strong,{children:[`🆕 `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-28`})]})}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.strong,{children:`112px`})}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.strong,{children:`Enterprise section spacing`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsxs)(t.strong,{children:[`🆕 `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-32`})]})}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.strong,{children:`128px`})}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.strong,{children:`Maximum ultra-wide spacing`})})]})]})]}),`
`,(0,u.jsx)(t.h3,{id:`-aspect-ratios-by-use-case`,children:`🖼 Aspect Ratios by Use Case`}),`
`,(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Class`}),(0,u.jsx)(t.th,{children:`Ratio`}),(0,u.jsx)(t.th,{children:`Perfect For`}),(0,u.jsx)(t.th,{children:`Example`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-square`})}),(0,u.jsx)(t.td,{children:`1:1`}),(0,u.jsx)(t.td,{children:`Profile images, avatars, icons`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`<div class="mds-legacy-aspect-square"><img src="avatar.jpg"></div>`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-video`})}),(0,u.jsx)(t.td,{children:`16:9`}),(0,u.jsx)(t.td,{children:`Videos, hero images`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`<div class="mds-legacy-aspect-video"><video>...</video></div>`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-4-3`})}),(0,u.jsx)(t.td,{children:`4:3`}),(0,u.jsx)(t.td,{children:`Traditional photos`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`<div class="mds-legacy-aspect-4-3"><img src="photo.jpg"></div>`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-3-2`})}),(0,u.jsx)(t.td,{children:`3:2`}),(0,u.jsx)(t.td,{children:`Modern photography`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`<div class="mds-legacy-aspect-3-2"><img src="landscape.jpg"></div>`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-21-9`})}),(0,u.jsx)(t.td,{children:`21:9`}),(0,u.jsx)(t.td,{children:`Ultra-wide content`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`<div class="mds-legacy-aspect-21-9">Ultra-wide banner</div>`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-aspect-auto`})}),(0,u.jsx)(t.td,{children:`auto`}),(0,u.jsx)(t.td,{children:`Reset to natural size`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`<div class="mds-legacy-aspect-auto">Natural dimensions</div>`})})]})]})]}),`
`,(0,u.jsx)(t.h3,{id:`-responsive-variants-cheat-sheet`,children:`🔄 Responsive Variants Cheat Sheet`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Pattern`}),`: `,(0,u.jsx)(t.code,{children:`.{utility}-{breakpoint}-{value}`})]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<!-- Responsive columns -->
.col-12         <!-- All screens: 12 columns (100%) -->
.col-sm-6       <!-- Small+: 6 columns (50%) -->  
.col-md-4       <!-- Medium+: 4 columns (33%) -->
.col-lg-3       <!-- Large+: 3 columns (25%) -->
.col-xl-2       <!-- XL+: 2 columns (16%) -->
.col-xxl-1      <!-- XXL+: 1 column (8%) -->

<!-- Responsive gaps -->
.gap-4          <!-- All screens: 16px gap -->
.gap-md-6       <!-- Medium+: 24px gap -->
.gap-lg-8       <!-- Large+: 32px gap -->
.gap-xl-12      <!-- XL+: 48px gap -->
.gap-xxl-16     <!-- XXL+: 64px gap -->

<!-- Responsive aspect ratios -->
.aspect-square      <!-- All screens: 1:1 -->
.aspect-md-video    <!-- Medium+: 16:9 -->
.aspect-lg-4-3      <!-- Large+: 4:3 -->

<!-- Responsive subgrid -->
.subgrid-cols          <!-- All screens: inherit columns -->
.subgrid-lg-rows       <!-- Large+: inherit rows -->
.subgrid-xxl-both      <!-- XXL+: inherit both -->
`})}),`
`,(0,u.jsx)(t.h3,{id:`-performance-tips`,children:`⚡ Performance Tips`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Fastest Grid Patterns:`})}),`
`,(0,u.jsxs)(t.ol,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsxs)(t.strong,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-container`}),` + `,(0,u.jsx)(t.code,{children:`.mds-legacy-row`}),` + `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-*`})]}),` - Most optimized`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`.mds-legacy-grid-auto-fit-md`})}),` - Auto-responsive without media queries`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsxs)(t.strong,{children:[(0,u.jsx)(t.code,{children:`.mds-legacy-col`}),` (no number)`]}),` - Equal-width, minimal CSS`]}),`
`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Avoid These:`})}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`❌ Nested `,(0,u.jsx)(t.code,{children:`.mds-legacy-container`}),` inside `,(0,u.jsx)(t.code,{children:`.mds-legacy-container`})]}),`
`,(0,u.jsxs)(t.li,{children:[`❌ Using `,(0,u.jsx)(t.code,{children:`.mds-legacy-row`}),` without `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-*`}),` children`]}),`
`,(0,u.jsx)(t.li,{children:`❌ Mixing flexbox and grid utilities on same element`}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`-design-system-integration`,children:`🎨 Design System Integration`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`With MUI Components:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`// Use sx prop for MUI + grid classes
<Box className="mds-legacy-container">
  <Box className="mds-legacy-row mds-legacy-gap-4">
    <Box className="mds-legacy-col-12 mds-legacy-col-md-6" sx={{ p: 2 }}>
      <Card>Content</Card>
    </Box>
  </Box>
</Box>
`})}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`With Design Tokens:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-scss`,children:`.custom-grid {
  // Use theme.spacing() with grid
  padding: theme.spacing(4); // Aligns with .gap-4
  
  // Use role colors
  background: getRoleColor('bg.neutral.subtle');
}
`})}),`
`,(0,u.jsx)(t.h3,{id:`-troubleshooting-common-issues`,children:`🔧 Troubleshooting Common Issues`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Grid Not Working?`})}),`
`,(0,u.jsxs)(t.ol,{children:[`
`,(0,u.jsxs)(t.li,{children:[`✅ Check if `,(0,u.jsx)(t.code,{children:`.mds-legacy-row`}),` has `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-*`}),` children`]}),`
`,(0,u.jsx)(t.li,{children:`✅ Verify total columns don't exceed 12`}),`
`,(0,u.jsx)(t.li,{children:`✅ Ensure no typos in class names`}),`
`,(0,u.jsx)(t.li,{children:`✅ Check responsive order with DevTools`}),`
`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`Layout Breaking on Mobile?`})}),`
`,(0,u.jsxs)(t.ol,{children:[`
`,(0,u.jsxs)(t.li,{children:[`✅ Use `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-12`}),` for mobile-first`]}),`
`,(0,u.jsx)(t.li,{children:`✅ Test with DevTools mobile view`}),`
`,(0,u.jsx)(t.li,{children:`✅ Check if content overflow is hidden`}),`
`,(0,u.jsx)(t.li,{children:`✅ Verify touch-friendly tap targets (44px minimum)`}),`
`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`XXL Not Working?`})}),`
`,(0,u.jsxs)(t.ol,{children:[`
`,(0,u.jsx)(t.li,{children:`✅ Check viewport is actually 1540px+`}),`
`,(0,u.jsx)(t.li,{children:`✅ Verify no conflicting CSS`}),`
`,(0,u.jsx)(t.li,{children:`✅ Test with browser zoom at 100%`}),`
`,(0,u.jsx)(t.li,{children:`✅ Check if other utilities override`}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`-browser-support-matrix`,children:`📱 Browser Support Matrix`}),`
`,(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Feature`}),(0,u.jsx)(t.th,{children:`Chrome`}),(0,u.jsx)(t.th,{children:`Firefox`}),(0,u.jsx)(t.th,{children:`Safari`}),(0,u.jsx)(t.th,{children:`Edge`}),(0,u.jsx)(t.th,{children:`Mobile`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Grid System`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`XXL Breakpoint`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Aspect Ratios`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:(0,u.jsx)(t.strong,{children:`Subgrid`})}),(0,u.jsx)(t.td,{children:`🔄`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`🔄`}),(0,u.jsx)(t.td,{children:`🔄`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Container Queries`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`🔄`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`}),(0,u.jsx)(t.td,{children:`✅`})]})]})]}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Legend:`}),` ✅ Full support, 🔄 Partial/Coming soon`]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`-migration--upgrade-path`,children:`🚀 Migration & Upgrade Path`}),`
`,(0,u.jsx)(t.h3,{id:`from-previous-grid-version`,children:`From Previous Grid Version`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`✅ Backward Compatible:`})}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`All existing `,(0,u.jsx)(t.code,{children:`.mds-legacy-col-*`}),`, `,(0,u.jsx)(t.code,{children:`.mds-legacy-gap-*`}),` classes work unchanged`]}),`
`,(0,u.jsxs)(t.li,{children:[`All breakpoints `,(0,u.jsx)(t.code,{children:`xs`}),` through `,(0,u.jsx)(t.code,{children:`xl`}),` unchanged`]}),`
`,(0,u.jsx)(t.li,{children:`Container behavior identical`}),`
`]}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.strong,{children:`🆕 New Features to Adopt:`})}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-scss`,children:`// 1. Add XXL breakpoint support
.metric-card {
  @extend .mds-legacy-col-12, .mds-legacy-col-md-6, .mds-legacy-col-lg-4, .mds-legacy-col-xl-3, .mds-legacy-col-xxl-2;
}

// 2. Use extended spacing for enterprise layouts  
.dashboard-section {
  @extend .mds-legacy-gap-xxl-32, .mds-legacy-gap-xl-24, .mds-legacy-gap-lg-16, .mds-legacy-gap-8;
}

// 3. Replace custom aspect ratio CSS
.video-container {
  @extend .mds-legacy-aspect-video; // Instead of padding-bottom: 56.25%
}

// 4. Prepare for subgrid (progressive enhancement)
.card-grid {
  @extend .mds-legacy-row, .mds-legacy-gap-6;
  grid-template-rows: auto 1fr auto; // Ready for subgrid
  
  .card {
    @extend .mds-legacy-col-4, .mds-legacy-subgrid-rows; // Works when supported
  }
}
`})}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsxs)(t.p,{children:[`Building something new instead of editing one of the legacy pages that already use this system? Use `,(0,u.jsx)(t.a,{href:`?path=/docs/foundations-grid--docs`,children:`Foundations/Grid`}),` — plain Tailwind grid utilities — instead of anything on this page.`]})]})}function l(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=r(),i(),t(),o()})))()}d();export{l as default};