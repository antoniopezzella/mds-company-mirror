import{ar as i,Z as e,c as r}from"./iframe-CPBTUrEW.js";import{G as a}from"./GridHealth-Bac4pX-N.js";import"./preload-helper-PPVm8Dsz.js";function c(n){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Foundations/⚠️ Grid Legacy"}),`
`,e.jsx(s.h1,{id:"grid-system--legacy",children:"Grid System — Legacy"}),`
`,e.jsxs(s.p,{children:[`A Bootstrap-inspired 12-column grid system built with CSS Grid. This is the
`,e.jsx(s.strong,{children:"older"}),` of the two grid systems in this codebase, kept for the existing
pages/sections that already depend on it.`]}),`
`,e.jsxs("div",{style:{background:"linear-gradient(135deg, #595959 0%, #303c37 100%)",color:"white",padding:"24px",borderRadius:"8px",marginBottom:"32px"},children:[e.jsx("h2",{style:{margin:"0 0 8px 0",fontSize:"20px"},children:"⚠️ Not for new work"}),e.jsx("p",{style:{margin:"0 0 16px 0",opacity:.9},children:e.jsxs(s.p,{children:["All new components (including everything in ",e.jsx("code",{children:"src/components/ui"}),`) use plain Tailwind grid
utilities instead — see `,e.jsx("a",{href:"?path=/docs/foundations-grid--docs",style:{color:"#ceecff"},children:"Foundations/Grid"}),`.
This page documents the older, Bootstrap-style system still used by ~26 existing legacy MUI marketing
pages/sections (`,e.jsx("code",{children:"HeroBanner"}),", ",e.jsx("code",{children:"MarshCorporate"}),", the ",e.jsx("code",{children:"marsh-new-charpter-begins"}),`
and `,e.jsx("code",{children:"CorporateLandingPage"}),` sections, and a few others). Every class below carries an
`,e.jsx("code",{children:"mds-legacy-"}),` prefix — added when these names were found to collide with identically-named
Tailwind utilities, since both systems load globally in the same app. Never mix the two systems'
classes on the same element.`]})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:"16px",marginTop:"16px"},children:[e.jsx("div",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Columns:"})," 12 (+ custom 1-12)"]})}),e.jsx("div",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Base Unit:"})," 4px"]})}),e.jsx("div",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Gutters:"})," 8px-128px"]})}),e.jsx("div",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Breakpoints:"})," xs→xxl (1540px)"]})}),e.jsx("div",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Aspect Ratios:"})," 6 utilities"]})}),e.jsx("div",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Subgrid:"})," Future-ready"]})})]})]}),`
`,`
`,e.jsx(a,{label:"Grid runtime"}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"-for-designers",children:"👥 For Designers"}),`
`,e.jsx(s.h3,{id:"what-you-can-do",children:"What You Can Do"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["✅ ",e.jsx(s.strong,{children:"Create responsive layouts"})," that adapt from mobile to ultra-wide (4K+)"]}),`
`,e.jsxs(s.li,{children:["✅ ",e.jsx(s.strong,{children:"Build dashboard widgets"})," with different heights and aspect ratios"]}),`
`,e.jsxs(s.li,{children:["✅ ",e.jsx(s.strong,{children:"Design card grids"})," that auto-fit to any screen size"]}),`
`,e.jsxs(s.li,{children:["✅ ",e.jsx(s.strong,{children:"Control spacing"})," from 4px to 128px (enterprise-scale)"]}),`
`,e.jsxs(s.li,{children:["✅ ",e.jsx(s.strong,{children:"Align content"})," horizontally and vertically with subgrid"]}),`
`,e.jsxs(s.li,{children:["✅ ",e.jsx(s.strong,{children:"Reorder elements"})," visually without changing HTML"]}),`
`,e.jsxs(s.li,{children:["🆕 ",e.jsx(s.strong,{children:"Ultra-wide layouts"})," for the xxl (1540px+) breakpoint"]}),`
`,e.jsxs(s.li,{children:["🆕 ",e.jsx(s.strong,{children:"Consistent aspect ratios"})," across all components"]}),`
`,e.jsxs(s.li,{children:["🆕 ",e.jsx(s.strong,{children:"Future-proof alignment"})," with subgrid utilities"]}),`
`]}),`
`,e.jsx(s.h3,{id:"design-tokens",children:"Design Tokens"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{children:`Breakpoints:
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
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"-for-developers",children:"👨‍💻 For Developers"}),`
`,e.jsx(s.h3,{id:"installation",children:"Installation"}),`
`,e.jsx(s.p,{children:"The grid is already wired globally. Just use the classes in your HTML/JSX:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`// Grid is imported in src/global.scss
// No additional imports needed!
`})}),`
`,e.jsx(s.h3,{id:"import-in-custom-scss-optional",children:"Import in Custom SCSS (Optional)"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-scss",children:`@use '../styles/grid' as *;
`})}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"-common-patterns-copy--paste",children:"📚 Common Patterns (Copy & Paste)"}),`
`,e.jsx(s.h3,{id:"pattern-1-basic-two-column-layout",children:"Pattern 1: Basic Two-Column Layout"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": Main content + sidebar layouts"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"HTML:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-container">
  <div class="mds-legacy-row mds-legacy-gap-4">
    <div class="mds-legacy-col-12 mds-legacy-col-md-8">Main content</div>
    <div class="mds-legacy-col-12 mds-legacy-col-md-4">Sidebar</div>
  </div>
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"React/JSX:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="mds-legacy-container">
  <div className="mds-legacy-row mds-legacy-gap-4">
    <div className="mds-legacy-col-12 mds-legacy-col-md-8">Main content</div>
    <div className="mds-legacy-col-12 mds-legacy-col-md-4">Sidebar</div>
  </div>
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Live Example:"})}),`
`,e.jsx("div",{className:"mds-legacy-container",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-4",children:[e.jsxs("div",{className:"mds-legacy-col-12 mds-legacy-col-md-8",style:{background:"#e5edf4",padding:16,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Main Content"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"14px"},children:"66% width on desktop, 100% on mobile"})]}),e.jsxs("div",{className:"mds-legacy-col-12 mds-legacy-col-md-4",style:{background:"#c7edff",padding:16,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Sidebar"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"14px"},children:"33% width on desktop, 100% on mobile"})]})]})}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-2-responsive-card-grid",children:"Pattern 2: Responsive Card Grid"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": Product cards, blog posts, image galleries"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"HTML:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<!-- Auto-fits cards at 300px minimum width -->
<div class="mds-legacy-grid-auto-fit-md mds-legacy-gap-4">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"React/JSX:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="mds-legacy-grid-auto-fit-md mds-legacy-gap-4">
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Live Example:"})}),`
`,e.jsx("div",{className:"mds-legacy-grid-auto-fit-md mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:Array.from({length:6}).map((l,d)=>e.jsxs("div",{style:{background:"#f0faff",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:[e.jsxs("strong",{children:["Card ",d+1]}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"Auto-fits at 300px min"})]},d))}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-3-dashboard-with-widgets",children:"Pattern 3: Dashboard with Widgets"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": Analytics dashboards, admin panels with varying widget heights"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"HTML:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-grid-cols-3 mds-legacy-grid-rows-3 mds-legacy-gap-4">
  <div class="mds-legacy-row-span-2">Tall Chart Widget</div>
  <div>Metric A</div>
  <div class="mds-legacy-row-span-3">Activity Feed (Full Height)</div>
  <div>Metric B</div>
  <div class="mds-legacy-col-span-2">Wide Widget</div>
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"React/JSX:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="mds-legacy-grid-cols-3 mds-legacy-grid-rows-3 mds-legacy-gap-4">
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
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Live Example:"})}),`
`,e.jsxs("div",{className:"mds-legacy-grid-cols-3 mds-legacy-grid-rows-3 mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12,minHeight:300},children:[e.jsx("div",{className:"mds-legacy-row-span-2",style:{background:"#667eea",color:"white",padding:16,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("strong",{children:"Tall Widget (2 rows)"})}),e.jsx("div",{style:{background:"#f0faff",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:e.jsx("strong",{children:"Metric A"})}),e.jsx("div",{className:"mds-legacy-row-span-3",style:{background:"#48bb78",color:"white",padding:16,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("strong",{children:"Full Height (3 rows)"})}),e.jsx("div",{style:{background:"#f0faff",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:e.jsx("strong",{children:"Metric B"})}),e.jsx("div",{className:"mds-legacy-col-span-2",style:{background:"#edf2f7",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:e.jsx("strong",{children:"Wide Widget (2 columns)"})})]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-4-equal-width-columns",children:"Pattern 4: Equal-Width Columns"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": When you want columns to automatically share space equally"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"HTML:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<!-- No numbers needed! All columns are equal width -->
<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col">Column 1</div>
  <div class="mds-legacy-col">Column 2</div>
  <div class="mds-legacy-col">Column 3</div>
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"React/JSX:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="mds-legacy-row mds-legacy-gap-4">
  {features.map(feature => (
    <div key={feature.id} className="mds-legacy-col">
      <FeatureCard {...feature} />
    </div>
  ))}
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Live Example:"})}),`
`,e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("div",{className:"mds-legacy-col",style:{background:"#e5edf4",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:[e.jsx("strong",{children:"Auto"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px"},children:"Equal width"})]}),e.jsxs("div",{className:"mds-legacy-col",style:{background:"#c7edff",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:[e.jsx("strong",{children:"Auto"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px"},children:"Equal width"})]}),e.jsxs("div",{className:"mds-legacy-col",style:{background:"#e5edf4",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:[e.jsx("strong",{children:"Auto"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px"},children:"Equal width"})]})]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"-enhanced-patterns-2024-updates",children:"🆕 Enhanced Patterns (2024 Updates)"}),`
`,e.jsx(s.h3,{id:"pattern-41-ultra-wide-enterprise-layout",children:"Pattern 4.1: Ultra-Wide Enterprise Layout"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": Financial dashboards, data visualization, ultra-wide monitors (1540px+)"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"HTML:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-container">
  <div class="mds-legacy-row mds-legacy-gap-xxl-32 mds-legacy-gap-xl-24 mds-legacy-gap-lg-16 mds-legacy-gap-md-12 mds-legacy-gap-6">
    <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric A</div>
    <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric B</div>
    <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric C</div>
    <div class="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">Metric D</div>
  </div>
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"React/JSX:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="mds-legacy-container">
  <div className="mds-legacy-row mds-legacy-gap-xxl-32 mds-legacy-gap-xl-24 mds-legacy-gap-lg-16 mds-legacy-gap-md-12 mds-legacy-gap-6">
    {metrics.map(metric => (
      <div key={metric.id} className="mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12">
        <MetricCard {...metric} />
      </div>
    ))}
  </div>
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Live Example:"})}),`
`,e.jsx("div",{className:"mds-legacy-container",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-xxl-32 mds-legacy-gap-xl-24 mds-legacy-gap-lg-16 mds-legacy-gap-md-12 mds-legacy-gap-6",children:[e.jsxs("div",{className:"mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12",style:{background:"#e1f5fe",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a",minHeight:100},children:[e.jsx("strong",{children:"Revenue"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"20px",color:"#0277bd"},children:"$2.4M"}),e.jsx("small",{style:{color:"#666"},children:"XXL: 4 cols | XL: 3 cols | LG: 2 cols | MD+: 1 col"})]}),e.jsxs("div",{className:"mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12",style:{background:"#e8f5e8",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a",minHeight:100},children:[e.jsx("strong",{children:"Growth"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"20px",color:"#2e7d32"},children:"+12%"}),e.jsx("small",{style:{color:"#666"},children:"Progressive spacing from 24px to 128px"})]}),e.jsxs("div",{className:"mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12",style:{background:"#fff3e0",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a",minHeight:100},children:[e.jsx("strong",{children:"Users"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"20px",color:"#f57c00"},children:"1.2k"}),e.jsx("small",{style:{color:"#666"},children:"Ultra-wide responsive breakpoints"})]}),e.jsxs("div",{className:"mds-legacy-col-xxl-3 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-12",style:{background:"#fce4ec",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a",minHeight:100},children:[e.jsx("strong",{children:"Conversion"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"20px",color:"#c2185b"},children:"3.8%"}),e.jsx("small",{style:{color:"#666"},children:"Perfect for enterprise dashboards"})]})]})}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-42-aspect-ratio-media-grid",children:"Pattern 4.2: Aspect Ratio Media Grid"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": Image galleries, video grids, consistent media presentation"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"HTML:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-row mds-legacy-gap-4 mds-legacy-gap-xxl-8">
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
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"React/JSX:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="mds-legacy-row mds-legacy-gap-4 mds-legacy-gap-xxl-8">
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
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Live Example:"})}),`
`,e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-4 mds-legacy-gap-xxl-8",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12",children:e.jsx("div",{className:"mds-legacy-aspect-video",style:{background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:"bold"},children:e.jsx(s.p,{children:"📺 16:9 Video"})})}),e.jsx("div",{className:"mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12",children:e.jsx("div",{className:"mds-legacy-aspect-square",style:{background:"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:"bold"},children:e.jsx(s.p,{children:"🎯 1:1 Square"})})}),e.jsx("div",{className:"mds-legacy-col-xxl-4 mds-legacy-col-xl-4 mds-legacy-col-lg-6 mds-legacy-col-md-6 mds-legacy-col-12",children:e.jsx("div",{className:"mds-legacy-aspect-4-3",style:{background:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:"bold"},children:e.jsx(s.p,{children:"📷 4:3 Classic"})})})]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-43-subgrid-card-alignment-future-ready",children:"Pattern 4.3: Subgrid Card Alignment (Future-Ready)"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": Card grids where headers and footers need perfect alignment"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"HTML:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<!-- Parent defines row structure -->
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
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"React/JSX:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="mds-legacy-row mds-legacy-gap-6" style={{gridTemplateRows: 'auto 1fr auto'}}>
  {products.map(product => (
    <div key={product.id} className="mds-legacy-col-4 mds-legacy-subgrid-rows">
      <h4>{product.title}</h4>
      <p>{product.description}</p>
      <button>Buy Now</button>
    </div>
  ))}
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Live Example (Firefox/Safari):"})}),`
`,e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-6",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12,gridTemplateRows:"auto 1fr auto"},children:[e.jsxs("div",{className:"mds-legacy-col-4",style:{display:"grid",gridRow:"1 / -1",background:"#f8f9fa",borderRadius:8,padding:16},children:[e.jsx("h5",{style:{margin:"0 0 8px 0",background:"#e3f2fd",padding:8,borderRadius:4,textAlign:"center"},children:"Product A"}),e.jsx("div",{style:{background:"white",padding:12,borderRadius:4,flexGrow:1},children:e.jsx(s.p,{children:"Variable content length. This product has a detailed description that can be quite long and detailed."})}),e.jsx("button",{style:{marginTop:8,background:"#1976d2",color:"white",border:0,padding:"8px 16px",borderRadius:4},children:"Buy Now"})]}),e.jsxs("div",{className:"mds-legacy-col-4",style:{display:"grid",gridRow:"1 / -1",background:"#f8f9fa",borderRadius:8,padding:16},children:[e.jsx("h5",{style:{margin:"0 0 8px 0",background:"#e3f2fd",padding:8,borderRadius:4,textAlign:"center"},children:"Product B"}),e.jsx("div",{style:{background:"white",padding:12,borderRadius:4,flexGrow:1},children:e.jsx(s.p,{children:"Short description."})}),e.jsx("button",{style:{marginTop:8,background:"#1976d2",color:"white",border:0,padding:"8px 16px",borderRadius:4},children:"Buy Now"})]}),e.jsxs("div",{className:"mds-legacy-col-4",style:{display:"grid",gridRow:"1 / -1",background:"#f8f9fa",borderRadius:8,padding:16},children:[e.jsx("h5",{style:{margin:"0 0 8px 0",background:"#e3f2fd",padding:8,borderRadius:4,textAlign:"center"},children:"Product C"}),e.jsx("div",{style:{background:"white",padding:12,borderRadius:4,flexGrow:1},children:e.jsx(s.p,{children:"Medium length content that demonstrates subgrid alignment."})}),e.jsx("button",{style:{marginTop:8,background:"#1976d2",color:"white",border:0,padding:"8px 16px",borderRadius:4},children:"Buy Now"})]})]}),`
`,e.jsx("div",{style:{background:"#fff3e0",padding:"12px",borderRadius:"4px",marginTop:"12px",fontSize:"14px"},children:e.jsxs(s.p,{children:["💡 ",e.jsx("strong",{children:"Note:"})," Subgrid is currently supported in Firefox and Safari. Chrome support coming soon. Headers and footers will align perfectly when supported."]})}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-44-container-fluid--container-mix",children:"Pattern 4.4: Container Fluid + Container Mix"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": Full-width sections with centered content"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"HTML:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<!-- Full-width background with centered content -->
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
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"React/JSX:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<section className="mds-legacy-container-fluid" style={{background: '#f8f9fa', padding: '40px 0'}}>
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
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Live Example:"})}),`
`,e.jsx("section",{className:"mds-legacy-container-fluid",style:{background:"#f8f9fa",padding:"40px 16px",border:"1px solid #e5e7eb",borderRadius:8,marginTop:12},children:e.jsx("div",{className:"mds-legacy-container",children:e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-6 mds-legacy-gap-xxl-12",children:[e.jsxs("div",{className:"mds-legacy-col-xxl-6 mds-legacy-col-xl-6 mds-legacy-col-lg-6 mds-legacy-col-12",children:[e.jsx("h3",{style:{margin:"0 0 16px 0",color:"#1976d2"},children:"Full-Width Hero Section"}),e.jsx("p",{style:{margin:"0 0 16px 0",lineHeight:1.6,color:"#444"},children:e.jsx(s.p,{children:`The container-fluid provides full viewport width with consistent padding,
while the inner container centers content and respects max-width constraints.`})}),e.jsx("p",{style:{margin:0,fontSize:"14px",color:"#666"},children:e.jsx(s.p,{children:"Perfect for hero sections, testimonials, and feature showcases."})})]}),e.jsx("div",{className:"mds-legacy-col-xxl-6 mds-legacy-col-xl-6 mds-legacy-col-lg-6 mds-legacy-col-12",children:e.jsx("div",{className:"mds-legacy-aspect-video",style:{background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:"bold"},children:e.jsx(s.p,{children:"🎬 Media Content"})})})]})})}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-5-sidebar-layout",children:"Pattern 5: Sidebar Layout"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": App shells, documentation sites, admin panels"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"HTML:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<!-- Fixed 250px sidebar + flexible content -->
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
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"React/JSX:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="mds-legacy-grid-cols-1 mds-legacy-grid-cols-md-sidebar mds-legacy-gap-4">
  <aside><Sidebar /></aside>
  <main><Content /></main>
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Live Example:"})}),`
`,e.jsxs("div",{className:"mds-legacy-grid-cols-sidebar mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("aside",{style:{background:"#f7fafc",padding:16,borderRadius:4,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Sidebar"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"Fixed 250px width"})]}),e.jsxs("main",{style:{background:"#edf2f7",padding:16,borderRadius:4,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Main Content"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"Flexible width (takes remaining space)"})]})]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-6-column-ordering-mobile-first",children:"Pattern 6: Column Ordering (Mobile-First)"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": Reorder content for different screen sizes (sidebar-first on desktop, content-first on mobile)"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"HTML:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <!-- Shows first on mobile, second on desktop -->
  <main class="mds-legacy-col-12 mds-legacy-col-md-8 mds-legacy-order-md-2">Main Content</main>
  
  <!-- Shows second on mobile, first on desktop -->
  <aside class="mds-legacy-col-12 mds-legacy-col-md-4 mds-legacy-order-md-1">Sidebar</aside>
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"React/JSX:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="mds-legacy-row mds-legacy-gap-4">
  <main className="mds-legacy-col-12 mds-legacy-col-md-8 mds-legacy-order-md-2">
    <Content />
  </main>
  <aside className="mds-legacy-col-12 mds-legacy-col-md-4 mds-legacy-order-md-1">
    <Sidebar />
  </aside>
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Live Example:"})}),`
`,e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("main",{className:"mds-legacy-col-12 mds-legacy-col-md-8 mds-legacy-order-md-2",style:{background:"#e5edf4",padding:16,borderRadius:4,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Main Content"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"First on mobile, second on desktop"})]}),e.jsxs("aside",{className:"mds-legacy-col-12 mds-legacy-col-md-4 mds-legacy-order-md-1",style:{background:"#667eea",color:"white",padding:16,borderRadius:4},children:[e.jsx("strong",{children:"Sidebar"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px"},children:"Second on mobile, first on desktop ←"})]})]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-7-custom-column-count-non-12",children:"Pattern 7: Custom Column Count (Non-12)"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": Unique layouts like 5-column product grids, 7-column week calendars"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"HTML:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<!-- 5-column grid -->
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
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"React/JSX:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="mds-legacy-grid-cols-5 mds-legacy-gap-4">
  {weekdays.map(day => (
    <DayCard key={day} date={day} />
  ))}
</div>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Live Example:"})}),`
`,e.jsx("div",{className:"mds-legacy-grid-cols-5 mds-legacy-gap-3",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:["Mon","Tue","Wed","Thu","Fri"].map(l=>e.jsx("div",{style:{background:"#f0faff",padding:12,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:e.jsx("strong",{children:l})},l))}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"-grid-fundamentals",children:"📐 Grid Fundamentals"}),`
`,e.jsx(s.h3,{id:"column-span-variations",children:"Column span variations"}),`
`,e.jsx(s.p,{children:"Common span patterns across 12 columns."}),`
`,e.jsx(s.p,{children:"Live preview"}),`
`,e.jsxs("div",{className:"mds-legacy-container",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-row mds-legacy-gap-2",children:e.jsx("div",{className:"mds-legacy-col-12",style:{background:"#f4f4f4",padding:8,textAlign:"center",color:"#1a1a1a"},children:"12"})}),e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-2",style:{marginTop:8},children:[e.jsx("div",{className:"mds-legacy-col-6",style:{background:"#e5edf4",padding:8,textAlign:"center",color:"#1a1a1a"},children:"6"}),e.jsx("div",{className:"mds-legacy-col-6",style:{background:"#e5edf4",padding:8,textAlign:"center",color:"#1a1a1a"},children:"6"})]}),e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-2",style:{marginTop:8},children:[e.jsx("div",{className:"mds-legacy-col-4",style:{background:"#c7edff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"4"}),e.jsx("div",{className:"mds-legacy-col-4",style:{background:"#c7edff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"4"}),e.jsx("div",{className:"mds-legacy-col-4",style:{background:"#c7edff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"4"})]}),e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-2",style:{marginTop:8},children:[e.jsx("div",{className:"mds-legacy-col-3",style:{background:"#f0faff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"3"}),e.jsx("div",{className:"mds-legacy-col-3",style:{background:"#f0faff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"3"}),e.jsx("div",{className:"mds-legacy-col-3",style:{background:"#f0faff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"3"}),e.jsx("div",{className:"mds-legacy-col-3",style:{background:"#f0faff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"3"})]}),e.jsx("div",{className:"mds-legacy-row mds-legacy-gap-2",style:{marginTop:8},children:Array.from({length:6}).map((l,d)=>e.jsx("div",{className:"mds-legacy-col-2",style:{background:"#ebebeb",padding:8,textAlign:"center",color:"#1a1a1a"},children:"2"},d))})]}),`
`,e.jsx(s.h3,{id:"alignment-grid--flex",children:"Alignment (grid + flex)"}),`
`,e.jsx(s.p,{children:"Grid item alignment via utilities, and inner-cell flex alignment when needed."}),`
`,e.jsx(s.p,{children:"Live preview"}),`
`,e.jsxs("div",{className:"mds-legacy-container",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-2 mds-legacy-align-center mds-legacy-justify-center",style:{minHeight:120},children:[e.jsx("div",{className:"mds-legacy-col-4",style:{background:"#e9f3ff",padding:8,color:"#1a1a1a"},children:"Center items (grid)"}),e.jsx("div",{className:"mds-legacy-col-4",style:{background:"#e9f3ff",padding:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#1a1a1a"},children:"Flex center in cell"})]}),e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-2 mds-legacy-content-justify-between mds-legacy-content-align-center",style:{minHeight:120,marginTop:8},children:[e.jsx("div",{className:"mds-legacy-col-3",style:{background:"#f9f7fb",padding:8,textAlign:"center",color:"#1a1a1a"},children:"A"}),e.jsx("div",{className:"mds-legacy-col-3",style:{background:"#f9f7fb",padding:8,textAlign:"center",color:"#1a1a1a"},children:"B"}),e.jsx("div",{className:"mds-legacy-col-3",style:{background:"#f9f7fb",padding:8,textAlign:"center",color:"#1a1a1a"},children:"C"})]})]}),`
`,e.jsx(s.h3,{id:"responsive-cards",children:"Responsive cards"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-container">
  <div class="mds-legacy-row mds-legacy-gap-2">
    <div class="mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
    <div class="mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
    <div class="mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
    <div class="mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
  </div>
</div>
`})}),`
`,e.jsx(s.p,{children:"Live preview"}),`
`,e.jsx("div",{className:"mds-legacy-container",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6},children:e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-2",children:[e.jsx("div",{className:"mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3",style:{background:"#f9f7fb",padding:12,color:"#1a1a1a"},children:"Card"}),e.jsx("div",{className:"mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3",style:{background:"#f9f7fb",padding:12,color:"#1a1a1a"},children:"Card"}),e.jsx("div",{className:"mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3",style:{background:"#f9f7fb",padding:12,color:"#1a1a1a"},children:"Card"}),e.jsx("div",{className:"mds-legacy-col-12 mds-legacy-col-md-6 mds-legacy-col-lg-4 mds-legacy-col-xl-3",style:{background:"#f9f7fb",padding:12,color:"#1a1a1a"},children:"Card"})]})}),`
`,e.jsx(s.h3,{id:"bootstrap-style-helpers-familiarity",children:"Bootstrap-style helpers (familiarity)"}),`
`,e.jsx(s.p,{children:"We provide optional aliases inspired by Bootstrap for easier migration:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Equal-width columns per row: ",e.jsx(s.code,{children:".mds-legacy-row-cols-N"})," (N=1..6), with responsive variants ",e.jsx(s.code,{children:".mds-legacy-row-cols-sm-N"}),", ",e.jsx(s.code,{children:".mds-legacy-row-cols-md-N"}),", etc."]}),`
`,e.jsxs(s.li,{children:["Gap aliases: ",e.jsx(s.code,{children:".mds-legacy-g-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gx-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gy-*"})," mirroring our ",e.jsx(s.code,{children:".mds-legacy-gap-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-x-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-y-*"}),"."]}),`
`]}),`
`,e.jsx(s.p,{children:"Live preview"}),`
`,e.jsxs("div",{className:"mds-legacy-container",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-row mds-legacy-row-cols-3 mds-legacy-g-3",children:Array.from({length:6}).map((l,d)=>e.jsx("div",{style:{background:"#f4fbff",padding:12,textAlign:"center",borderRadius:4,color:"#1a1a1a"},children:"Col"},d))}),e.jsx("div",{className:"mds-legacy-row mds-legacy-row-cols-1 mds-legacy-row-cols-md-2 mds-legacy-row-cols-lg-4 mds-legacy-gx-4 mds-legacy-gy-2",style:{marginTop:8},children:Array.from({length:8}).map((l,d)=>e.jsx("div",{style:{background:"#f7f7ff",padding:12,textAlign:"center",borderRadius:4,color:"#1a1a1a"},children:"Col"},d))})]}),`
`,e.jsxs(s.p,{children:["Note: Our canonical API is the ",e.jsx(s.code,{children:".mds-legacy-col-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-x-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-y-*"})," set. The aliases are provided for familiarity and smoother adoption."]}),`
`,e.jsx(s.h2,{id:"enhanced-utilities-reference",children:"Enhanced Utilities Reference"}),`
`,e.jsx(s.h3,{id:"columns--responsive",children:"Columns & Responsive"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Columns"}),": ",e.jsx(s.code,{children:".mds-legacy-col-1"}),"..",e.jsx(s.code,{children:".mds-legacy-col-12"}),", responsive: ",e.jsx(s.code,{children:".mds-legacy-col-sm-6"}),", ",e.jsx(s.code,{children:".mds-legacy-col-md-4"}),", ",e.jsx(s.code,{children:".mds-legacy-col-lg-3"}),", ",e.jsx(s.code,{children:".mds-legacy-col-xl-2"}),", ",e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-col-xxl-*"})})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Auto columns"}),": ",e.jsx(s.code,{children:".mds-legacy-col"})," (equal width), ",e.jsx(s.code,{children:".mds-legacy-col-auto"})," (content-based)"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Custom grids"}),": ",e.jsx(s.code,{children:".mds-legacy-grid-cols-1"})," to ",e.jsx(s.code,{children:".mds-legacy-grid-cols-12"}),", responsive: ",e.jsx(s.code,{children:".mds-legacy-grid-cols-{bp}-{n}"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Presets"}),": ",e.jsx(s.code,{children:".mds-legacy-grid-auto-fit-{xs|sm|md|lg}"}),", ",e.jsx(s.code,{children:".mds-legacy-grid-cols-sidebar"}),", ",e.jsx(s.code,{children:".mds-legacy-grid-cols-two-thirds"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"spacing-enhanced-scale",children:"Spacing (Enhanced Scale)"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Standard"}),": ",e.jsx(s.code,{children:".mds-legacy-gap-1"})," (4px), ",e.jsx(s.code,{children:".mds-legacy-gap-2"})," (8px), ",e.jsx(s.code,{children:".mds-legacy-gap-3"})," (12px), ",e.jsx(s.code,{children:".mds-legacy-gap-4"})," (16px), ",e.jsx(s.code,{children:".mds-legacy-gap-6"})," (24px), ",e.jsx(s.code,{children:".mds-legacy-gap-8"})," (32px)"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Extended"}),": ",e.jsx(s.code,{children:".mds-legacy-gap-9"})," (36px), ",e.jsx(s.code,{children:".mds-legacy-gap-10"})," (40px), ",e.jsx(s.code,{children:".mds-legacy-gap-12"})," (48px), ",e.jsx(s.code,{children:".mds-legacy-gap-16"})," (64px), ",e.jsx(s.code,{children:".mds-legacy-gap-20"})," (80px), ",e.jsx(s.code,{children:".mds-legacy-gap-24"})," (96px)"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"🆕 Enterprise"}),": ",e.jsxs(s.strong,{children:[e.jsx(s.code,{children:".mds-legacy-gap-28"})," (112px)"]}),", ",e.jsxs(s.strong,{children:[e.jsx(s.code,{children:".mds-legacy-gap-32"})," (128px)"]})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Directional"}),": ",e.jsx(s.code,{children:".mds-legacy-gap-x-*"})," (column-gap) and ",e.jsx(s.code,{children:".mds-legacy-gap-y-*"})," (row-gap)"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Responsive"}),": All gaps support ",e.jsx(s.code,{children:".mds-legacy-gap-{bp}-{n}"})," (including ",e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-gap-xxl-*"})}),")"]}),`
`]}),`
`,e.jsx(s.h3,{id:"-aspect-ratios",children:"🆕 Aspect Ratios"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-aspect-square"})})," (1:1) - Perfect for profile images, icons"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-aspect-video"})})," (16:9) - Video players, hero images"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-aspect-4-3"})})," (4:3) - Traditional photography"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-aspect-3-2"})})," (3:2) - Modern photography"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-aspect-21-9"})})," (21:9) - Ultra-wide content"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-aspect-auto"})})," - Reset to natural ratio"]}),`
`]}),`
`,e.jsx(s.h3,{id:"-subgrid-future-ready",children:"🆕 Subgrid (Future-Ready)"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-subgrid-cols"})})," - Inherit parent's column tracks"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-subgrid-rows"})})," - Inherit parent's row tracks"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-subgrid-both"})})," - Inherit both column and row tracks"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Responsive"}),": All subgrid utilities support ",e.jsx(s.code,{children:".mds-legacy-subgrid-{type}-{bp}"})," variants"]}),`
`]}),`
`,e.jsx(s.h3,{id:"containers",children:"Containers"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-container"})})," - Responsive centered container (540px → 1800px max-width)"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-container-fluid"})})," - Full-width container with consistent padding"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"🆕 Container queries"}),": ",e.jsx(s.code,{children:".mds-legacy-container-query"}),", ",e.jsx(s.code,{children:".mds-legacy-container-query-size"})," (future-ready)"]}),`
`]}),`
`,e.jsx(s.h3,{id:"alignment--layout",children:"Alignment & Layout"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Item alignment"}),": ",e.jsx(s.code,{children:".mds-legacy-align-{start|center|end}"}),", ",e.jsx(s.code,{children:".mds-legacy-justify-{start|center|end}"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Content alignment"}),": ",e.jsx(s.code,{children:".mds-legacy-content-justify-*"})," / ",e.jsx(s.code,{children:".mds-legacy-content-align-*"})," for grid tracks"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Row spanning"}),": ",e.jsx(s.code,{children:".mds-legacy-row-span-1"})," to ",e.jsx(s.code,{children:".mds-legacy-row-span-6"}),", ",e.jsx(s.code,{children:".mds-legacy-row-span-full"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Column spanning"}),": ",e.jsx(s.code,{children:".mds-legacy-col-span-1"})," to ",e.jsx(s.code,{children:".mds-legacy-col-span-12"}),", ",e.jsx(s.code,{children:".mds-legacy-col-span-full"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Grid flow"}),": ",e.jsx(s.code,{children:".mds-legacy-grid-flow-{row|col|dense}"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"offsets--positioning",children:"Offsets & Positioning"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Offsets"}),": ",e.jsx(s.code,{children:".mds-legacy-offset-1"}),"..",e.jsx(s.code,{children:".mds-legacy-offset-11"}),", responsive: ",e.jsx(s.code,{children:".mds-legacy-offset-{bp}-{n}"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Start position"}),": ",e.jsx(s.code,{children:".mds-legacy-start-{n}"})," to place item at specific grid track"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Responsive variants"}),": All positioning supports breakpoint variants"]}),`
`]}),`
`,e.jsx(s.h3,{id:"visibility--ordering",children:"Visibility & Ordering"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Hide/Show"}),": ",e.jsx(s.code,{children:".mds-legacy-hidden-{bp}"}),", ",e.jsx(s.code,{children:".mds-legacy-visible-{bp}"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Ordering"}),": ",e.jsx(s.code,{children:".mds-legacy-order-0"})," to ",e.jsx(s.code,{children:".mds-legacy-order-12"}),", ",e.jsx(s.code,{children:".mds-legacy-order-first"}),", ",e.jsx(s.code,{children:".mds-legacy-order-last"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Responsive ordering"}),": ",e.jsx(s.code,{children:".mds-legacy-order-{bp}-{n}"}),", ",e.jsx(s.code,{children:".mds-legacy-order-{bp}-first"}),", ",e.jsx(s.code,{children:".mds-legacy-order-{bp}-last"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"breakpoints-enhanced",children:"Breakpoints (Enhanced)"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"xs"})}),": 0px (mobile-first baseline)"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"sm"})}),": 600px → ",e.jsx(s.code,{children:".mds-legacy-col-sm-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-sm-*"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"md"})}),": 900px → ",e.jsx(s.code,{children:".mds-legacy-col-md-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-md-*"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"lg"})}),": 1024px → ",e.jsx(s.code,{children:".mds-legacy-col-lg-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-lg-*"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"xl"})}),": 1200px → ",e.jsx(s.code,{children:".mds-legacy-col-xl-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-xl-*"})]}),`
`,e.jsxs(s.li,{children:[e.jsxs(s.strong,{children:["🆕 ",e.jsx(s.code,{children:"xxl"})]}),": ",e.jsxs(s.strong,{children:["1540px → ",e.jsx(s.code,{children:".mds-legacy-col-xxl-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-xxl-*"})]})]}),`
`,e.jsxs(s.li,{children:["Fluid container: ",e.jsx(s.code,{children:".mds-legacy-container-fluid"})," uses full width with consistent horizontal padding"]}),`
`]}),`
`,e.jsx(s.h3,{id:"auto-fit-cards-grid",children:"Auto-fit cards grid"}),`
`,e.jsx(s.p,{children:"When you don’t know how many cards fit per row, use the auto grid:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-row-auto" style="--mds-grid-col-min: 220px">
  <div class="card">A</div>
  <div class="card">B</div>
  <div class="card">C</div>
  <div class="card">D</div>
  <div class="card">E</div>
  <div class="card">F</div>
  <!-- more cards -->
  </div>
`})}),`
`,e.jsx(s.p,{children:"Live preview"}),`
`,e.jsx("div",{className:"mds-legacy-row-auto",style:{"--mds-grid-col-min":"220px",border:"1px solid #e5e7eb",padding:8,borderRadius:6},children:Array.from({length:9}).map((l,d)=>e.jsxs("div",{className:"card",style:{background:"#f9f7fb",padding:12,textAlign:"center",borderRadius:4,color:"#1a1a1a"},children:["Card ",d+1]},d))}),`
`,e.jsx(s.h3,{id:"fluid-container",children:"Fluid container"}),`
`,e.jsxs(s.p,{children:["Use ",e.jsx(s.code,{children:".mds-legacy-container-fluid"})," for full-width sections that still need consistent side padding."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-container-fluid">
  <div class="mds-legacy-row mds-legacy-gap-x-4 mds-legacy-gap-y-3">
    <div class="mds-legacy-col-12 mds-legacy-col-md-6" style="background:#eef6ff; padding:8px">Half</div>
    <div class="mds-legacy-col-12 mds-legacy-col-md-6" style="background:#eef6ff; padding:8px">Half</div>
  </div>
</div>
`})}),`
`,e.jsx(s.p,{children:"Live preview"}),`
`,e.jsx("div",{className:"mds-legacy-container-fluid",style:{border:"1px dashed #cdd6e1",paddingBlock:8,borderRadius:6},children:e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-x-4 mds-legacy-gap-y-3",children:[e.jsx("div",{className:"mds-legacy-col-12 mds-legacy-col-md-6",style:{background:"#eef6ff",padding:8},children:"Half"}),e.jsx("div",{className:"mds-legacy-col-12 mds-legacy-col-md-6",style:{background:"#eef6ff",padding:8},children:"Half"})]})}),`
`,e.jsx(s.h2,{id:"customize",children:"Customize"}),`
`,e.jsx(s.p,{children:"Override defaults before importing:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-scss",children:`$base-unit: 0.25rem; // 4px at 16px root
$gutter: 0.5rem;     // 8px at 16px root
$columns: 12;
@use '../styles/grid' as *;
`})}),`
`,e.jsxs(s.p,{children:["Adjust ",e.jsx(s.code,{children:"$breakpoints"})," and ",e.jsx(s.code,{children:"$container-max"})," for different responsive behavior."]}),`
`,e.jsx(s.h3,{id:"runtime-tuning-via-css-variables",children:"Runtime tuning via CSS variables"}),`
`,e.jsx(s.p,{children:"You can tune grid gaps and min column width at runtime per section without recompiling Sass:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-row" style="--mds-grid-gap: 12px">…</div>
<div class="mds-legacy-row-auto" style="--mds-grid-col-min: 240px">…</div>
`})}),`
`,e.jsx(s.p,{children:"This is helpful for special layouts (e.g., tighter gaps on dense dashboards) while keeping defaults aligned to the design tokens."}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"phase-1-enhancements-advanced-grid-features",children:"Phase 1 Enhancements: Advanced Grid Features"}),`
`,e.jsx(s.h3,{id:"non-12-column-grids",children:"Non-12-Column Grids"}),`
`,e.jsxs(s.p,{children:["Use ",e.jsx(s.code,{children:".mds-legacy-grid-cols-{N}"})," to create grids with any column count (not just 12):"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-grid-cols-5 mds-legacy-gap-4">
  <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
</div>
`})}),`
`,e.jsxs("div",{className:"mds-legacy-grid-cols-5 mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6},children:[e.jsx("div",{style:{background:"#e5edf4",padding:8,textAlign:"center"},children:"1"}),e.jsx("div",{style:{background:"#c7edff",padding:8,textAlign:"center"},children:"2"}),e.jsx("div",{style:{background:"#e5edf4",padding:8,textAlign:"center"},children:"3"}),e.jsx("div",{style:{background:"#c7edff",padding:8,textAlign:"center"},children:"4"}),e.jsx("div",{style:{background:"#e5edf4",padding:8,textAlign:"center"},children:"5"})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"7-Column Dashboard Example"}),":"]}),`
`,e.jsx("div",{className:"mds-legacy-grid-cols-7 mds-legacy-gap-3",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:Array.from({length:7}).map((l,d)=>e.jsxs("div",{style:{background:"#f0faff",padding:8,textAlign:"center",borderRadius:4},children:["Col ",d+1]},d))}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Responsive"}),": ",e.jsx(s.code,{children:".mds-legacy-grid-cols-1 .mds-legacy-grid-cols-md-3 .mds-legacy-grid-cols-lg-5"})," stacks on mobile, 3 cols on tablet, 5 cols on desktop."]}),`
`,e.jsx(s.h3,{id:"row-spanning-dashboard-widgets",children:"Row Spanning (Dashboard Widgets)"}),`
`,e.jsxs(s.p,{children:["Use ",e.jsx(s.code,{children:".mds-legacy-row-span-{N}"})," to span multiple rows:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-grid-cols-3 mds-legacy-grid-rows-3 mds-legacy-gap-4">
  <div class="mds-legacy-row-span-2">Tall widget</div>
  <div>Widget A</div>
  <div class="mds-legacy-row-span-3">Full height</div>
  <div>Widget B</div>
  <div>Widget C</div>
  <div>Widget D</div>
</div>
`})}),`
`,e.jsxs("div",{className:"mds-legacy-grid-cols-3 mds-legacy-grid-rows-3 mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-row-span-2",style:{background:"#e5edf4",padding:12,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4},children:e.jsxs(s.p,{children:["Tall Widget",e.jsx("br",{}),"(2 rows)"]})}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"Widget A"}),e.jsx("div",{className:"mds-legacy-row-span-3",style:{background:"#c7edff",padding:12,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4},children:e.jsxs(s.p,{children:["Full Height",e.jsx("br",{}),"(3 rows)"]})}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"Widget B"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"Widget C"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"Widget D"})]}),`
`,e.jsx(s.h3,{id:"extended-gap-scale",children:"Extended Gap Scale"}),`
`,e.jsxs(s.p,{children:["Larger gaps for spacious layouts (",e.jsx(s.code,{children:".mds-legacy-gap-9"})," through ",e.jsx(s.code,{children:".mds-legacy-gap-24"}),"):"]}),`
`,e.jsxs("div",{className:"mds-legacy-grid-cols-3 mds-legacy-gap-16",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{style:{background:"#e5edf4",padding:12,textAlign:"center",borderRadius:4},children:"64px gap"}),e.jsx("div",{style:{background:"#c7edff",padding:12,textAlign:"center",borderRadius:4},children:"(.gap-16)"}),e.jsx("div",{style:{background:"#e5edf4",padding:12,textAlign:"center",borderRadius:4},children:"Spacious!"})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Available"}),": ",e.jsx(s.code,{children:".mds-legacy-gap-9"})," (36px), ",e.jsx(s.code,{children:".mds-legacy-gap-10"})," (40px), ",e.jsx(s.code,{children:".mds-legacy-gap-12"})," (48px), ",e.jsx(s.code,{children:".mds-legacy-gap-16"})," (64px), ",e.jsx(s.code,{children:".mds-legacy-gap-20"})," (80px), ",e.jsx(s.code,{children:".mds-legacy-gap-24"})," (96px)"]}),`
`,e.jsx(s.h3,{id:"dense-grid-packing",children:"Dense Grid Packing"}),`
`,e.jsxs(s.p,{children:["Use ",e.jsx(s.code,{children:".mds-legacy-grid-flow-dense"})," for masonry-like layouts that fill gaps:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-grid-cols-4 mds-legacy-gap-3 mds-legacy-grid-flow-dense">
  <div class="mds-legacy-col-span-2 mds-legacy-row-span-2">Large</div>
  <div>1</div><div>2</div><div>3</div><div>4</div>
</div>
`})}),`
`,e.jsxs("div",{className:"mds-legacy-grid-cols-4 mds-legacy-gap-3 mds-legacy-grid-flow-dense",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-col-span-2 mds-legacy-row-span-2",style:{background:"#c7edff",padding:12,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,minHeight:120},children:e.jsx(s.p,{children:"Large Item"})}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"1"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"2"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"3"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"4"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"5"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"6"})]}),`
`,e.jsx(s.h3,{id:"asymmetric-presets",children:"Asymmetric Presets"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Sidebar Layout"}),": ",e.jsx(s.code,{children:".mds-legacy-grid-cols-sidebar"})," (250px + 1fr)"]}),`
`,e.jsxs("div",{className:"mds-legacy-grid-cols-sidebar mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("div",{style:{background:"#e5edf4",padding:12,textAlign:"center",borderRadius:4},children:["Sidebar",e.jsx("br",{}),"250px"]}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"Main Content (flexible)"})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Two-Thirds Layout"}),": ",e.jsx(s.code,{children:".mds-legacy-grid-cols-two-thirds"})," (2fr + 1fr)"]}),`
`,e.jsxs("div",{className:"mds-legacy-grid-cols-two-thirds mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{style:{background:"#e5edf4",padding:12,textAlign:"center",borderRadius:4},children:"Main (2/3)"}),e.jsx("div",{style:{background:"#c7edff",padding:12,textAlign:"center",borderRadius:4},children:"Aside (1/3)"})]}),`
`,e.jsx(s.h3,{id:"auto-fit-presets",children:"Auto-Fit Presets"}),`
`,e.jsx(s.p,{children:"Pre-configured auto-fit grids with common minimum widths:"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-grid-auto-fit-sm"})})," (200px min):"]}),`
`,e.jsx("div",{className:"mds-legacy-grid-auto-fit-sm mds-legacy-gap-3",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:Array.from({length:6}).map((l,d)=>e.jsxs("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:["Card ",d+1]},d))}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-grid-auto-fit-md"})})," (300px min):"]}),`
`,e.jsx("div",{className:"mds-legacy-grid-auto-fit-md mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:Array.from({length:4}).map((l,d)=>e.jsxs("div",{style:{background:"#e5edf4",padding:16,textAlign:"center",borderRadius:4},children:["Product ",d+1]},d))}),`
`,e.jsx(s.h3,{id:"auto-sized-columns",children:"Auto-Sized Columns"}),`
`,e.jsxs(s.p,{children:["Use ",e.jsx(s.code,{children:".mds-legacy-col-auto"})," for content-based sizing:"]}),`
`,e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-col-auto",style:{background:"#e5edf4",padding:12,borderRadius:4},children:e.jsx("button",{style:{padding:"8px 16px",background:"#1976d2",color:"white",border:"none",borderRadius:4,cursor:"pointer"},children:"Action"})}),e.jsx("div",{className:"mds-legacy-col",style:{background:"#f0faff",padding:12,borderRadius:4},children:"Flexible content area (takes remaining space)"}),e.jsx("div",{className:"mds-legacy-col-auto",style:{background:"#e5edf4",padding:12,borderRadius:4},children:e.jsx("button",{style:{padding:"8px 16px",background:"#d32f2f",color:"white",border:"none",borderRadius:4,cursor:"pointer"},children:"Delete"})})]}),`
`,e.jsx(s.h3,{id:"responsive-visibility",children:"Responsive Visibility"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Hide at specific breakpoints"}),": ",e.jsx(s.code,{children:".mds-legacy-hidden-xs"}),", ",e.jsx(s.code,{children:".mds-legacy-hidden-md"}),", ",e.jsx(s.code,{children:".mds-legacy-hidden-lg"})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Show only at breakpoints"}),": ",e.jsx(s.code,{children:".mds-legacy-visible-md"})," (only visible on tablets)"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-hidden-xs">Hidden on mobile</div>
<div class="mds-legacy-visible-lg">Only visible on large screens</div>
`})}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"complete-utility-reference",children:"Complete Utility Reference"}),`
`,e.jsx(s.h3,{id:"column-spanning",children:"Column Spanning"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:".mds-legacy-col-1"})," to ",e.jsx(s.code,{children:".mds-legacy-col-12"})," • ",e.jsx(s.code,{children:".mds-legacy-col-{bp}-{N}"})," • ",e.jsx(s.code,{children:".mds-legacy-col-auto"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"grid-template-columns",children:"Grid Template Columns"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:".mds-legacy-grid-cols-1"})," to ",e.jsx(s.code,{children:".mds-legacy-grid-cols-12"})," • ",e.jsx(s.code,{children:".mds-legacy-grid-cols-{bp}-{N}"})]}),`
`,e.jsxs(s.li,{children:["Presets: ",e.jsx(s.code,{children:".mds-legacy-grid-auto-fit-{xs|sm|md|lg}"}),", ",e.jsx(s.code,{children:".mds-legacy-grid-cols-sidebar"}),", ",e.jsx(s.code,{children:".mds-legacy-grid-cols-two-thirds"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"row-spanning",children:"Row Spanning"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:".mds-legacy-row-span-1"})," to ",e.jsx(s.code,{children:".mds-legacy-row-span-6"})," • ",e.jsx(s.code,{children:".mds-legacy-row-span-full"})," • ",e.jsx(s.code,{children:".mds-legacy-row-span-{bp}-{N}"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"grid-rows",children:"Grid Rows"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:".mds-legacy-grid-rows-1"})," to ",e.jsx(s.code,{children:".mds-legacy-grid-rows-6"})," • ",e.jsx(s.code,{children:".mds-legacy-grid-rows-{bp}-{N}"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"gaps",children:"Gaps"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Standard: ",e.jsx(s.code,{children:".mds-legacy-gap-0"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-1"})," (4px), ",e.jsx(s.code,{children:".mds-legacy-gap-2"})," (8px), ",e.jsx(s.code,{children:".mds-legacy-gap-4"})," (16px), ",e.jsx(s.code,{children:".mds-legacy-gap-8"})," (32px)"]}),`
`,e.jsxs(s.li,{children:["Extended: ",e.jsx(s.code,{children:".mds-legacy-gap-9"})," (36px), ",e.jsx(s.code,{children:".mds-legacy-gap-12"})," (48px), ",e.jsx(s.code,{children:".mds-legacy-gap-16"})," (64px), ",e.jsx(s.code,{children:".mds-legacy-gap-20"})," (80px), ",e.jsx(s.code,{children:".mds-legacy-gap-24"})," (96px)"]}),`
`,e.jsxs(s.li,{children:["Directional: ",e.jsx(s.code,{children:".mds-legacy-gap-x-{N}"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-y-{N}"}),", ",e.jsx(s.code,{children:".mds-legacy-gx-{N}"}),", ",e.jsx(s.code,{children:".mds-legacy-gy-{N}"})]}),`
`,e.jsxs(s.li,{children:["Responsive: ",e.jsx(s.code,{children:".mds-legacy-gap-{bp}-{N}"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"alignment",children:"Alignment"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Items: ",e.jsx(s.code,{children:".mds-legacy-align-{start|center|end}"}),", ",e.jsx(s.code,{children:".mds-legacy-justify-{start|center|end}"})]}),`
`,e.jsxs(s.li,{children:["Content: ",e.jsx(s.code,{children:".mds-legacy-content-align-{start|center|end|between|around|evenly}"})]}),`
`,e.jsxs(s.li,{children:["Place: ",e.jsx(s.code,{children:".mds-legacy-place-items-{start|center|end|stretch}"}),", ",e.jsx(s.code,{children:".mds-legacy-place-content-{start|center|end|between}"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"grid-flow",children:"Grid Flow"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:".mds-legacy-grid-flow-row"}),", ",e.jsx(s.code,{children:".mds-legacy-grid-flow-col"}),", ",e.jsx(s.code,{children:".mds-legacy-grid-flow-dense"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"visibility",children:"Visibility"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:".mds-legacy-hidden-{xs|sm|md|lg|xl}"})," • ",e.jsx(s.code,{children:".mds-legacy-visible-{xs|sm|md|lg|xl}"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"offsets",children:"Offsets"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:".mds-legacy-offset-1"})," to ",e.jsx(s.code,{children:".mds-legacy-offset-11"})," • ",e.jsx(s.code,{children:".mds-legacy-offset-{bp}-{N}"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"ordering-bootstrap-inspired",children:"Ordering (Bootstrap-inspired)"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:".mds-legacy-order-0"})," to ",e.jsx(s.code,{children:".mds-legacy-order-12"})," • ",e.jsx(s.code,{children:".mds-legacy-order-first"})," • ",e.jsx(s.code,{children:".mds-legacy-order-last"})]}),`
`,e.jsxs(s.li,{children:["Responsive: ",e.jsx(s.code,{children:".mds-legacy-order-{bp}-{N}"}),", ",e.jsx(s.code,{children:".mds-legacy-order-{bp}-first"}),", ",e.jsx(s.code,{children:".mds-legacy-order-{bp}-last"})]}),`
`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"bootstrap-inspired-patterns",children:"Bootstrap-Inspired Patterns"}),`
`,e.jsx(s.h3,{id:"equal-width-columns-auto-layout",children:"Equal-Width Columns (Auto-Layout)"}),`
`,e.jsxs(s.p,{children:["Use ",e.jsx(s.code,{children:".mds-legacy-col"})," (no number) for equal-width columns:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col">1 of 2</div>
  <div class="mds-legacy-col">2 of 2</div>
</div>

<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col">1 of 3</div>
  <div class="mds-legacy-col">2 of 3</div>
  <div class="mds-legacy-col">3 of 3</div>
</div>
`})}),`
`,e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-col",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:"1 of 2"}),e.jsx("div",{className:"mds-legacy-col",style:{background:"#c7edff",padding:12,textAlign:"center"},children:"2 of 2"})]}),`
`,e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-col",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:"1 of 3"}),e.jsx("div",{className:"mds-legacy-col",style:{background:"#f0faff",padding:12,textAlign:"center"},children:"2 of 3"}),e.jsx("div",{className:"mds-legacy-col",style:{background:"#c7edff",padding:12,textAlign:"center"},children:"3 of 3"})]}),`
`,e.jsx(s.h3,{id:"column-ordering",children:"Column Ordering"}),`
`,e.jsx(s.p,{children:"Reorder columns visually without changing HTML:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col mds-legacy-order-3">First in DOM (order: 3)</div>
  <div class="mds-legacy-col mds-legacy-order-1">Second in DOM (order: 1)</div>
  <div class="mds-legacy-col mds-legacy-order-2">Third in DOM (order: 2)</div>
</div>
`})}),`
`,e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-col mds-legacy-order-3",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:e.jsxs(s.p,{children:["First in DOM",e.jsx("br",{}),e.jsx("small",{children:"(order: 3)"})]})}),e.jsx("div",{className:"mds-legacy-col mds-legacy-order-1",style:{background:"#c7edff",padding:12,textAlign:"center"},children:e.jsxs(s.p,{children:["Second in DOM",e.jsx("br",{}),e.jsx("small",{children:"(order: 1) ← Shows first"})]})}),e.jsx("div",{className:"mds-legacy-col mds-legacy-order-2",style:{background:"#f0faff",padding:12,textAlign:"center"},children:e.jsxs(s.p,{children:["Third in DOM",e.jsx("br",{}),e.jsx("small",{children:"(order: 2)"})]})})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Responsive ordering"})," (mobile-first):"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col-12 mds-legacy-col-md mds-legacy-order-md-2">Main content (first on mobile, second on desktop)</div>
  <div class="mds-legacy-col-12 mds-legacy-col-md mds-legacy-order-md-1">Sidebar (second on mobile, first on desktop)</div>
</div>
`})}),`
`,e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-col-12 mds-legacy-col-md mds-legacy-order-md-2",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:e.jsxs(s.p,{children:["Main content",e.jsx("br",{}),e.jsx("small",{children:"(first on mobile, second on desktop)"})]})}),e.jsx("div",{className:"mds-legacy-col-12 mds-legacy-col-md mds-legacy-order-md-1",style:{background:"#c7edff",padding:12,textAlign:"center"},children:e.jsxs(s.p,{children:["Sidebar",e.jsx("br",{}),e.jsx("small",{children:"(second on mobile, first on desktop)"})]})})]}),`
`,e.jsx(s.h3,{id:"mix-fixed-and-auto-columns",children:"Mix Fixed and Auto Columns"}),`
`,e.jsx(s.p,{children:"Set one column width, others auto-fill:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col">Auto-width</div>
  <div class="mds-legacy-col-6">Fixed 6 columns</div>
  <div class="mds-legacy-col">Auto-width</div>
</div>
`})}),`
`,e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-col",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:"Auto"}),e.jsx("div",{className:"mds-legacy-col-6",style:{background:"#c7edff",padding:12,textAlign:"center"},children:"Fixed 50%"}),e.jsx("div",{className:"mds-legacy-col",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:"Auto"})]}),`
`,e.jsx(s.h3,{id:"responsive-equal-width",children:"Responsive Equal-Width"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="mds-legacy-row mds-legacy-gap-4">
  <div class="mds-legacy-col-12 mds-legacy-col-md">Stacked mobile, equal desktop</div>
  <div class="mds-legacy-col-12 mds-legacy-col-md">Stacked mobile, equal desktop</div>
  <div class="mds-legacy-col-12 mds-legacy-col-md">Stacked mobile, equal desktop</div>
</div>
`})}),`
`,e.jsxs("div",{className:"mds-legacy-row mds-legacy-gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"mds-legacy-col-12 mds-legacy-col-md",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:"Stacked → Equal"}),e.jsx("div",{className:"mds-legacy-col-12 mds-legacy-col-md",style:{background:"#f0faff",padding:12,textAlign:"center"},children:"Stacked → Equal"}),e.jsx("div",{className:"mds-legacy-col-12 mds-legacy-col-md",style:{background:"#c7edff",padding:12,textAlign:"center"},children:"Stacked → Equal"})]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"complete-utility-reference-1",children:"Complete Utility Reference"}),`
`,e.jsxs("div",{style:{color:"#1a1a1a",background:"transparent"},children:[e.jsx(s.h3,{id:"column-classes",children:"Column Classes"}),e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Class"}),e.jsx(s.th,{children:"Description"}),e.jsx(s.th,{children:"Responsive Variants"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-{1-12}"})}),e.jsx(s.td,{children:"Span N columns out of 12"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-{bp}-{1-12}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col"})}),e.jsx(s.td,{children:"Equal-width auto column (Bootstrap-style)"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-{bp}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-auto"})}),e.jsx(s.td,{children:"Size to content"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-{bp}-auto"})})]})]})]}),e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Example:"})," ",e.jsx(s.code,{children:".mds-legacy-col-6 .mds-legacy-col-md-4 .mds-legacy-col-lg-3"})," → 50% mobile → 33% tablet → 25% desktop"]}),e.jsx(s.h3,{id:"grid-layout-classes",children:"Grid Layout Classes"}),e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Class"}),e.jsx(s.th,{children:"Description"}),e.jsx(s.th,{children:"Responsive Variants"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-cols-{1-12}"})}),e.jsx(s.td,{children:"Create N-column grid"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-cols-{bp}-{1-12}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-rows-{1-6}"})}),e.jsx(s.td,{children:"Create N-row grid"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-rows-{bp}-{1-6}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-auto-fit-{xs|sm|md|lg}"})}),e.jsx(s.td,{children:"Auto-fit columns at min size (150/200/300/400px)"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-auto-fit-{bp}-{size}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-cols-sidebar"})}),e.jsx(s.td,{children:"Fixed 250px + flexible column"}),e.jsx(s.td,{children:"—"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-cols-two-thirds"})}),e.jsx(s.td,{children:"2fr + 1fr asymmetric layout"}),e.jsx(s.td,{children:"—"})]})]})]}),e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Example:"})," ",e.jsx(s.code,{children:".mds-legacy-grid-cols-2 .mds-legacy-grid-cols-md-4"})," → 2 columns mobile → 4 columns tablet"]}),e.jsx(s.h3,{id:"row--column-spanning",children:"Row & Column Spanning"}),e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Class"}),e.jsx(s.th,{children:"Description"}),e.jsx(s.th,{children:"Responsive Variants"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-row-span-{1-6}"})}),e.jsx(s.td,{children:"Span N rows"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-row-span-{bp}-{1-6}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-row-span-full"})}),e.jsx(s.td,{children:"Span all rows"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-row-span-{bp}-full"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-span-{1-12}"})}),e.jsx(s.td,{children:"Span N columns"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-span-{bp}-{1-12}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-span-full"})}),e.jsx(s.td,{children:"Span all columns"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-span-{bp}-full"})})]})]})]}),e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Example:"})," ",e.jsx(s.code,{children:".mds-legacy-row-span-2"})," makes a widget span 2 rows in dashboard layouts"]}),e.jsx(s.h3,{id:"gap--spacing",children:"Gap & Spacing"}),e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Class"}),e.jsx(s.th,{children:"Description"}),e.jsx(s.th,{children:"Responsive Variants"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-{0-8}"})}),e.jsx(s.td,{children:"Gap from 0-32px (4px scale)"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-{bp}-{0-8}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-{9-24}"})}),e.jsx(s.td,{children:"Extended gaps 36-96px"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-{bp}-{9-24}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-x-{0-24}"})}),e.jsx(s.td,{children:"Horizontal gap only"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-x-{bp}-{0-24}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-y-{0-24}"})}),e.jsx(s.td,{children:"Vertical gap only"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-y-{bp}-{0-24}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-no-gutters"})}),e.jsx(s.td,{children:"Remove all gaps"}),e.jsx(s.td,{children:"—"})]})]})]}),e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Gap Scale:"})," 0, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 56px, 64px, 72px, 80px, 88px, 96px"]}),e.jsx(s.h3,{id:"ordering",children:"Ordering"}),e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Class"}),e.jsx(s.th,{children:"Description"}),e.jsx(s.th,{children:"Responsive Variants"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-order-{0-12}"})}),e.jsx(s.td,{children:"Set explicit order"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-order-{bp}-{0-12}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-order-first"})}),e.jsx(s.td,{children:"Move to start (-1)"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-order-{bp}-first"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-order-last"})}),e.jsx(s.td,{children:"Move to end (13)"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-order-{bp}-last"})})]})]})]}),e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Example:"})," ",e.jsx(s.code,{children:".mds-legacy-order-2 .mds-legacy-order-md-1"})," → Order 2 on mobile → Order 1 on tablet"]}),e.jsx(s.h3,{id:"alignment--justification",children:"Alignment & Justification"}),e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Class"}),e.jsx(s.th,{children:"Description"}),e.jsx(s.th,{children:"Responsive Variants"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-items-start|center|end|baseline|stretch"})}),e.jsx(s.td,{children:"Align items (cross-axis)"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-items-{bp}-{value}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-justify-start|center|end|between|around|evenly"})}),e.jsx(s.td,{children:"Justify content (main-axis)"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-justify-{bp}-{value}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-place-items-{start|center|end|stretch}"})}),e.jsx(s.td,{children:"Combined item placement"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-place-items-{bp}-{value}"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-place-content-{start|center|end|between|around|evenly}"})}),e.jsx(s.td,{children:"Combined content placement"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-place-content-{bp}-{value}"})})]})]})]}),e.jsx(s.h3,{id:"grid-flow-1",children:"Grid Flow"}),e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Class"}),e.jsx(s.th,{children:"Description"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-flow-row"})}),e.jsx(s.td,{children:"Fill row by row (default)"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-flow-col"})}),e.jsx(s.td,{children:"Fill column by column"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-flow-dense"})}),e.jsx(s.td,{children:"Auto-fill gaps (masonry)"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-grid-flow-row-dense"})}),e.jsx(s.td,{children:"Row fill with gap packing"})]})]})]}),e.jsx(s.h3,{id:"visibility-1",children:"Visibility"}),e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Class"}),e.jsx(s.th,{children:"Description"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-hidden-{bp}"})}),e.jsx(s.td,{children:"Hide at breakpoint and up"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-visible-{bp}"})}),e.jsx(s.td,{children:"Show at breakpoint and up"})]})]})]}),e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Example:"})," ",e.jsx(s.code,{children:".mds-legacy-hidden-md"})," hides element on tablet and desktop"]}),e.jsx(s.h3,{id:"breakpoints",children:"Breakpoints"}),e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Name"}),e.jsx(s.th,{children:"Min Width"}),e.jsx(s.th,{children:"Usage"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"xs"})}),e.jsx(s.td,{children:"0px"}),e.jsx(s.td,{children:"Default (mobile-first)"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"sm"})}),e.jsx(s.td,{children:"576px"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-sm-6"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"md"})}),e.jsx(s.td,{children:"768px"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-md-4"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"lg"})}),e.jsx(s.td,{children:"1024px"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-lg-3"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"xl"})}),e.jsx(s.td,{children:"1200px"}),e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-col-xl-2"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.strong,{children:e.jsx(s.code,{children:"xxl"})})}),e.jsx(s.td,{children:e.jsx(s.strong,{children:"1540px"})}),e.jsx(s.td,{children:e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-col-xxl-*"})})})]})]})]})]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"-enhanced-features-2024",children:"🆕 Enhanced Features (2024)"}),`
`,e.jsx(s.p,{children:"The grid system has been significantly enhanced with modern enterprise features:"}),`
`,e.jsx(s.h3,{id:"-new-in-grid-20",children:"⭐ New in Grid 2.0"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"XXL Breakpoint"})," (1540px): Ultra-wide screen support"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Extended Spacing"}),": ",e.jsx(s.code,{children:".mds-legacy-gap-28"})," (112px), ",e.jsx(s.code,{children:".mds-legacy-gap-32"})," (128px) for enterprise layouts"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Aspect Ratio Utilities"}),": ",e.jsx(s.code,{children:".mds-legacy-aspect-video"}),", ",e.jsx(s.code,{children:".mds-legacy-aspect-square"}),", ",e.jsx(s.code,{children:".mds-legacy-aspect-4-3"}),", etc."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Subgrid Support"}),": Future-ready alignment with ",e.jsx(s.code,{children:".mds-legacy-subgrid-cols"}),", ",e.jsx(s.code,{children:".mds-legacy-subgrid-rows"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Container Queries"}),": Prepared for element-based responsive design"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"XXL-Specific Utilities"}),": Full responsive support for ultra-wide screens"]}),`
`]}),`
`,e.jsx(s.p,{children:"The sections below (Enterprise Dashboard examples, Subgrid alignment, browser support matrix, migration notes) cover all of the above — this page is the single source now, no separate enhancement guide."}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(s.h3,{id:"scss-variables",children:"SCSS Variables"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-scss",children:`// Override in your styles
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
`,e.jsx(s.h3,{id:"css-custom-properties",children:"CSS Custom Properties"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-css",children:`/* Runtime customization */
.custom-grid {
  --mds-grid-gap: 24px;  /* Custom gap per instance */
}
`})}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"tips--best-practices",children:"Tips & Best Practices"}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Mobile-First Approach"})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Start with mobile layout (",e.jsx(s.code,{children:".mds-legacy-col-12"}),"), then add breakpoints"]}),`
`,e.jsxs(s.li,{children:["Example: ",e.jsx(s.code,{children:".mds-legacy-col-12 .mds-legacy-col-md-6 .mds-legacy-col-lg-4"})," → Stack → 2 cols → 3 cols"]}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Performance"})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.code,{children:".mds-legacy-grid-auto-fit-md"})," for responsive cards instead of multiple breakpoints"]}),`
`,e.jsxs(s.li,{children:["Prefer ",e.jsx(s.code,{children:".mds-legacy-col"})," for equal-width layouts (simpler than ",e.jsx(s.code,{children:".mds-legacy-col-{1-12}"}),")"]}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Accessibility"})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.code,{children:".mds-legacy-order-*"})," to reorder visually, but keep DOM order logical for screen readers"]}),`
`,e.jsx(s.li,{children:"Ensure sufficient color contrast in custom backgrounds"}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Debugging"})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Add borders temporarily: ",e.jsx(s.code,{children:".mds-legacy-row { border: 2px solid red; } .mds-legacy-col { border: 1px solid blue; }"})]}),`
`,e.jsx(s.li,{children:"Use browser DevTools Grid Inspector to visualize layout"}),`
`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"-complete-quick-reference",children:"📖 Complete Quick Reference"}),`
`,e.jsx(s.h3,{id:"-most-common-classes-copy--paste",children:"🏗 Most Common Classes (Copy & Paste)"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<!-- Responsive containers -->
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
`,e.jsx(s.h3,{id:"-breakpoint-decision-tree",children:"🎯 Breakpoint Decision Tree"}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Which breakpoint to use?"})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"xs"})," (0px): ",e.jsx(s.strong,{children:"Always start here"})," - mobile-first"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"sm"})," (600px): Large phones in landscape, small tablets"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"md"})," (900px): Tablets in portrait, small laptops"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"lg"})," (1024px): Laptops, desktops"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"xl"})," (1200px): Large desktops, external monitors"]}),`
`,e.jsx(s.li,{children:e.jsxs(s.strong,{children:[e.jsx(s.code,{children:"xxl"})," (1540px): Ultra-wide monitors, enterprise dashboards"]})}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Common responsive patterns:"})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Two-column"}),": ",e.jsx(s.code,{children:".mds-legacy-col-12 .mds-legacy-col-md-8"})," + ",e.jsx(s.code,{children:".mds-legacy-col-12 .mds-legacy-col-md-4"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Three-column"}),": ",e.jsx(s.code,{children:".mds-legacy-col-12 .mds-legacy-col-md-6 .mds-legacy-col-lg-4"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Four-column"}),": ",e.jsx(s.code,{children:".mds-legacy-col-12 .mds-legacy-col-md-6 .mds-legacy-col-lg-4 .mds-legacy-col-xl-3"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"🆕 Ultra-wide"}),": ",e.jsx(s.code,{children:".mds-legacy-col-xxl-3 .mds-legacy-col-xl-4 .mds-legacy-col-lg-6 .mds-legacy-col-md-12"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"-spacing-scale-quick-reference",children:"📏 Spacing Scale Quick Reference"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Class"}),e.jsx(s.th,{children:"Value"}),e.jsx(s.th,{children:"When to Use"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-1"})}),e.jsx(s.td,{children:"4px"}),e.jsx(s.td,{children:"Tight content, buttons"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-2"})}),e.jsx(s.td,{children:"8px"}),e.jsx(s.td,{children:"Form fields, list items"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-3"})}),e.jsx(s.td,{children:"12px"}),e.jsx(s.td,{children:"Card padding, small gaps"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-4"})}),e.jsx(s.td,{children:"16px"}),e.jsx(s.td,{children:e.jsx(s.strong,{children:"Most common - general spacing"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-6"})}),e.jsx(s.td,{children:"24px"}),e.jsx(s.td,{children:"Section spacing, large cards"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-8"})}),e.jsx(s.td,{children:"32px"}),e.jsx(s.td,{children:"Component spacing"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-12"})}),e.jsx(s.td,{children:"48px"}),e.jsx(s.td,{children:"Large section gaps"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-16"})}),e.jsx(s.td,{children:"64px"}),e.jsx(s.td,{children:"Major section divisions"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-gap-24"})}),e.jsx(s.td,{children:"96px"}),e.jsx(s.td,{children:"Page-level spacing"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsxs(s.strong,{children:["🆕 ",e.jsx(s.code,{children:".mds-legacy-gap-28"})]})}),e.jsx(s.td,{children:e.jsx(s.strong,{children:"112px"})}),e.jsx(s.td,{children:e.jsx(s.strong,{children:"Enterprise section spacing"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsxs(s.strong,{children:["🆕 ",e.jsx(s.code,{children:".mds-legacy-gap-32"})]})}),e.jsx(s.td,{children:e.jsx(s.strong,{children:"128px"})}),e.jsx(s.td,{children:e.jsx(s.strong,{children:"Maximum ultra-wide spacing"})})]})]})]}),`
`,e.jsx(s.h3,{id:"-aspect-ratios-by-use-case",children:"🖼 Aspect Ratios by Use Case"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Class"}),e.jsx(s.th,{children:"Ratio"}),e.jsx(s.th,{children:"Perfect For"}),e.jsx(s.th,{children:"Example"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-aspect-square"})}),e.jsx(s.td,{children:"1:1"}),e.jsx(s.td,{children:"Profile images, avatars, icons"}),e.jsx(s.td,{children:e.jsx(s.code,{children:'<div class="mds-legacy-aspect-square"><img src="avatar.jpg"></div>'})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-aspect-video"})}),e.jsx(s.td,{children:"16:9"}),e.jsx(s.td,{children:"Videos, hero images"}),e.jsx(s.td,{children:e.jsx(s.code,{children:'<div class="mds-legacy-aspect-video"><video>...</video></div>'})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-aspect-4-3"})}),e.jsx(s.td,{children:"4:3"}),e.jsx(s.td,{children:"Traditional photos"}),e.jsx(s.td,{children:e.jsx(s.code,{children:'<div class="mds-legacy-aspect-4-3"><img src="photo.jpg"></div>'})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-aspect-3-2"})}),e.jsx(s.td,{children:"3:2"}),e.jsx(s.td,{children:"Modern photography"}),e.jsx(s.td,{children:e.jsx(s.code,{children:'<div class="mds-legacy-aspect-3-2"><img src="landscape.jpg"></div>'})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-aspect-21-9"})}),e.jsx(s.td,{children:"21:9"}),e.jsx(s.td,{children:"Ultra-wide content"}),e.jsx(s.td,{children:e.jsx(s.code,{children:'<div class="mds-legacy-aspect-21-9">Ultra-wide banner</div>'})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:".mds-legacy-aspect-auto"})}),e.jsx(s.td,{children:"auto"}),e.jsx(s.td,{children:"Reset to natural size"}),e.jsx(s.td,{children:e.jsx(s.code,{children:'<div class="mds-legacy-aspect-auto">Natural dimensions</div>'})})]})]})]}),`
`,e.jsx(s.h3,{id:"-responsive-variants-cheat-sheet",children:"🔄 Responsive Variants Cheat Sheet"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Pattern"}),": ",e.jsx(s.code,{children:".{utility}-{breakpoint}-{value}"})]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<!-- Responsive columns -->
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
`,e.jsx(s.h3,{id:"-performance-tips",children:"⚡ Performance Tips"}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Fastest Grid Patterns:"})}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsxs(s.strong,{children:[e.jsx(s.code,{children:".mds-legacy-container"})," + ",e.jsx(s.code,{children:".mds-legacy-row"})," + ",e.jsx(s.code,{children:".mds-legacy-col-*"})]})," - Most optimized"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:".mds-legacy-grid-auto-fit-md"})})," - Auto-responsive without media queries"]}),`
`,e.jsxs(s.li,{children:[e.jsxs(s.strong,{children:[e.jsx(s.code,{children:".mds-legacy-col"})," (no number)"]})," - Equal-width, minimal CSS"]}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Avoid These:"})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["❌ Nested ",e.jsx(s.code,{children:".mds-legacy-container"})," inside ",e.jsx(s.code,{children:".mds-legacy-container"})]}),`
`,e.jsxs(s.li,{children:["❌ Using ",e.jsx(s.code,{children:".mds-legacy-row"})," without ",e.jsx(s.code,{children:".mds-legacy-col-*"})," children"]}),`
`,e.jsx(s.li,{children:"❌ Mixing flexbox and grid utilities on same element"}),`
`]}),`
`,e.jsx(s.h3,{id:"-design-system-integration",children:"🎨 Design System Integration"}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"With MUI Components:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`// Use sx prop for MUI + grid classes
<Box className="mds-legacy-container">
  <Box className="mds-legacy-row mds-legacy-gap-4">
    <Box className="mds-legacy-col-12 mds-legacy-col-md-6" sx={{ p: 2 }}>
      <Card>Content</Card>
    </Box>
  </Box>
</Box>
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"With Design Tokens:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-scss",children:`.custom-grid {
  // Use theme.spacing() with grid
  padding: theme.spacing(4); // Aligns with .gap-4
  
  // Use role colors
  background: getRoleColor('surface.accent');
}
`})}),`
`,e.jsx(s.h3,{id:"-troubleshooting-common-issues",children:"🔧 Troubleshooting Common Issues"}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Grid Not Working?"})}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["✅ Check if ",e.jsx(s.code,{children:".mds-legacy-row"})," has ",e.jsx(s.code,{children:".mds-legacy-col-*"})," children"]}),`
`,e.jsx(s.li,{children:"✅ Verify total columns don't exceed 12"}),`
`,e.jsx(s.li,{children:"✅ Ensure no typos in class names"}),`
`,e.jsx(s.li,{children:"✅ Check responsive order with DevTools"}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Layout Breaking on Mobile?"})}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["✅ Use ",e.jsx(s.code,{children:".mds-legacy-col-12"})," for mobile-first"]}),`
`,e.jsx(s.li,{children:"✅ Test with DevTools mobile view"}),`
`,e.jsx(s.li,{children:"✅ Check if content overflow is hidden"}),`
`,e.jsx(s.li,{children:"✅ Verify touch-friendly tap targets (44px minimum)"}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"XXL Not Working?"})}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"✅ Check viewport is actually 1540px+"}),`
`,e.jsx(s.li,{children:"✅ Verify no conflicting CSS"}),`
`,e.jsx(s.li,{children:"✅ Test with browser zoom at 100%"}),`
`,e.jsx(s.li,{children:"✅ Check if other utilities override"}),`
`]}),`
`,e.jsx(s.h3,{id:"-browser-support-matrix",children:"📱 Browser Support Matrix"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Feature"}),e.jsx(s.th,{children:"Chrome"}),e.jsx(s.th,{children:"Firefox"}),e.jsx(s.th,{children:"Safari"}),e.jsx(s.th,{children:"Edge"}),e.jsx(s.th,{children:"Mobile"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Grid System"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"XXL Breakpoint"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Aspect Ratios"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.strong,{children:"Subgrid"})}),e.jsx(s.td,{children:"🔄"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"🔄"}),e.jsx(s.td,{children:"🔄"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Container Queries"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"🔄"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"}),e.jsx(s.td,{children:"✅"})]})]})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Legend:"})," ✅ Full support, 🔄 Partial/Coming soon"]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"-migration--upgrade-path",children:"🚀 Migration & Upgrade Path"}),`
`,e.jsx(s.h3,{id:"from-previous-grid-version",children:"From Previous Grid Version"}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"✅ Backward Compatible:"})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["All existing ",e.jsx(s.code,{children:".mds-legacy-col-*"}),", ",e.jsx(s.code,{children:".mds-legacy-gap-*"})," classes work unchanged"]}),`
`,e.jsxs(s.li,{children:["All breakpoints ",e.jsx(s.code,{children:"xs"})," through ",e.jsx(s.code,{children:"xl"})," unchanged"]}),`
`,e.jsx(s.li,{children:"Container behavior identical"}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"🆕 New Features to Adopt:"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-scss",children:`// 1. Add XXL breakpoint support
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
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.p,{children:["Building something new instead of editing one of the legacy pages that already use this system? Use ",e.jsx(s.a,{href:"?path=/docs/foundations-grid--docs",children:"Foundations/Grid"})," — plain Tailwind grid utilities — instead of anything on this page."]})]})}function x(n={}){const{wrapper:s}={...i(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(c,{...n})}):c(n)}export{x as default};
