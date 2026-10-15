import{ar as r,Z as e,c as l}from"./iframe-CPBTUrEW.js";import{G as t}from"./GridHealth-Bac4pX-N.js";import"./preload-helper-PPVm8Dsz.js";function i(d){const s={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Foundations/Grid"}),`
`,e.jsx(s.h1,{id:"grid-system",children:"Grid System"}),`
`,e.jsxs(s.p,{children:["The standard grid for all new work: plain ",e.jsx(s.a,{href:"https://tailwindcss.com/docs/grid-template-columns",rel:"nofollow",children:"Tailwind CSS"})," grid utilities. No custom classes, no separate import — ",e.jsx(s.code,{children:"grid"}),", ",e.jsx(s.code,{children:"grid-cols-*"}),", ",e.jsx(s.code,{children:"gap-*"}),", and ",e.jsx(s.code,{children:"col-span-*"})," are built into Tailwind itself and already available everywhere in this app."]}),`
`,e.jsxs("div",{style:{background:"linear-gradient(135deg, #000f47 0%, #0b4bff 100%)",color:"white",padding:"24px",borderRadius:"8px",marginBottom:"32px"},children:[e.jsx("h2",{style:{margin:"0 0 8px 0",fontSize:"20px"},children:"Which grid do I use?"}),e.jsx("p",{style:{margin:"0 0 16px 0",opacity:.9},children:e.jsxs(s.p,{children:["Building anything new, including any ",e.jsx("code",{children:"src/components/ui"}),` (shadcn) component? Use this page.
Editing one of the existing legacy MUI marketing pages/sections (HeroBanner, MarshCorporate, the
marsh-new-charpter-begins and CorporateLandingPage sections)? Those already use a different,
older grid system — see `,e.jsx("a",{href:"?path=/docs/foundations-⚠️-grid-legacy--docs",style:{color:"#ceecff"},children:"Foundations/Grid Legacy"}),` instead,
and don't mix the two on the same element.`]})})]}),`
`,`
`,e.jsx(t,{label:"Grid runtime",testClassName:"grid grid-cols-12"}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"for-designers",children:"For Designers"}),`
`,e.jsx(s.h3,{id:"what-this-gives-you",children:"What this gives you"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["A 12-column grid at any breakpoint, with ",e.jsx(s.code,{children:"col-span-*"})," to size an element across N columns"]}),`
`,e.jsxs(s.li,{children:["A spacing scale from 0 to 24rem (",e.jsx(s.code,{children:"gap-0"})," through ",e.jsx(s.code,{children:"gap-96"}),", on the same 4px base as the rest of the design system)"]}),`
`,e.jsxs(s.li,{children:["Five responsive breakpoints, applied with a prefix (",e.jsx(s.code,{children:"md:grid-cols-4"}),"), not a suffix"]}),`
`,e.jsx(s.li,{children:"Auto-fit/auto-fill columns for card grids where you don't know the count in advance"}),`
`,e.jsxs(s.li,{children:["A centered ",e.jsx(s.code,{children:"container"})," utility, customized for this brand to cap at 1540px (matching the legacy system's own max width, so pages don't visually jump if they mix eras)"]}),`
`]}),`
`,e.jsx(s.h3,{id:"design-tokens",children:"Design tokens"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{children:`Breakpoints (real Tailwind defaults — unmodified in this project):
  sm:  640px
  md:  768px
  lg:  1024px
  xl:  1280px
  2xl: 1536px

Container (tailwind.config.js — the one customization in this system):
  centered: yes
  padding:  16px (default) → 24px (md) → 32px (lg)
  2xl cap:  1540px  ← note: not 1536px. The container's own max-width
                       is set slightly wider than the bare 2xl breakpoint,
                       to match the legacy grid's 1540px container exactly.

Spacing scale (gap-N — 0.25rem/4px base, same grid as everywhere else in MDS):
  gap-0: 0px      gap-4: 16px     gap-12: 48px    gap-24: 96px
  gap-1: 4px      gap-5: 20px     gap-14: 56px    gap-32: 128px
  gap-2: 8px      gap-6: 24px     gap-16: 64px    gap-40: 160px
  gap-3: 12px     gap-8: 32px     gap-20: 80px    gap-48: 192px
`})}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"for-developers",children:"For Developers"}),`
`,e.jsx(s.h3,{id:"nothing-to-install",children:"Nothing to install"}),`
`,e.jsxs(s.p,{children:["Tailwind's grid utilities are generated on demand from whatever classes appear in your JSX — there's no import, no SCSS ",e.jsx(s.code,{children:"@use"}),", no separate build step. Just write the class names."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`// No import needed — Tailwind scans src/**/*.{ts,tsx} automatically
<div className="grid grid-cols-12 gap-6">...</div>
`})}),`
`,e.jsx(s.h3,{id:"the-one-real-customization",children:"The one real customization"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"tailwind.config.js"}),"'s ",e.jsx(s.code,{children:"theme.container"})," is customized so the ",e.jsx(s.code,{children:"container"})," utility centers, applies the same 16/24/32px padding steps the rest of this app uses, and caps at exactly ",e.jsx(s.strong,{children:"1540px"})," at the ",e.jsx(s.code,{children:"2xl"})," tier — everything else (",e.jsx(s.code,{children:"grid-cols-*"}),", ",e.jsx(s.code,{children:"gap-*"}),", the ",e.jsx(s.code,{children:"sm/md/lg/xl/2xl"})," breakpoints themselves) is stock Tailwind, unmodified."]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"grid-stack-or-pageshell",children:"Grid, Stack, or PageShell?"}),`
`,e.jsx(s.p,{children:`Three tools, and picking the wrong one is the usual cause of layout that
fights back:`}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Situation"}),e.jsx(s.th,{children:"Use"}),e.jsx(s.th,{children:"Why"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:["Children in ",e.jsx(s.strong,{children:"one direction"})," with even spacing"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"<Stack>"})," / ",e.jsx(s.code,{children:"<Inline>"})]}),e.jsxs(s.td,{children:["The gap is type-checked against the DS scale; ",e.jsx(s.code,{children:"gap={7}"})," will not compile"]})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.strong,{children:"Two-dimensional"})," layout — columns that reflow, spans, ordering"]}),e.jsx(s.td,{children:"Grid utilities on this page"}),e.jsx(s.td,{children:"A grid is what this is. Three nested stacks faking one is harder to read and to change"})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:["The ",e.jsx(s.strong,{children:"page frame"})," — header, sidebar, main"]}),e.jsx(s.td,{children:e.jsx(s.code,{children:"<PageShell>"})}),e.jsxs(s.td,{children:["It already handles the responsive sidebar, the mobile scrim, and the ",e.jsx(s.code,{children:"min-w-0"})," chain that stops wide tables scrolling the page sideways"]})]})]})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"Stack"})," and grid compose freely: a ",e.jsx(s.code,{children:"Stack"}),` of sections where one section is a
`,e.jsx(s.code,{children:"grid grid-cols-3"})," is the normal shape of a dashboard page."]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"common-patterns",children:"Common Patterns"}),`
`,e.jsx(s.h3,{id:"pattern-1--two-column-layout-main--sidebar",children:"Pattern 1 — Two-column layout (main + sidebar)"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": main content + sidebar layouts, the most common page shape."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="grid grid-cols-4 gap-4 md:grid-cols-12">
  <div className="col-span-4 md:col-span-8">Main content</div>
  <div className="col-span-4 md:col-span-4">Sidebar</div>
</div>
`})}),`
`,e.jsxs("div",{className:"grid grid-cols-4 gap-4 md:grid-cols-12",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("div",{className:"col-span-4 md:col-span-8",style:{background:"#e5edf4",padding:16,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Main Content"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"14px"},children:"66% width from md up, 100% below"})]}),e.jsxs("div",{className:"col-span-4 md:col-span-4",style:{background:"#c7edff",padding:16,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Sidebar"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"14px"},children:"33% width from md up, 100% below"})]})]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-2--responsive-card-grid-auto-fit",children:"Pattern 2 — Responsive card grid, auto-fit"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": product cards, blog posts, image galleries — any count of cards, unknown in advance."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
  {products.map((product) => <ProductCard key={product.id} {...product} />)}
</div>
`})}),`
`,e.jsx("div",{className:"grid gap-4",style:{gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:Array.from({length:6}).map((c,n)=>e.jsxs("div",{style:{background:"#f0faff",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:[e.jsxs("strong",{children:["Card ",n+1]}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"Auto-fits at 220px min"})]},n))}),`
`,e.jsxs(s.p,{children:["Tailwind doesn't ship a bare ",e.jsx(s.code,{children:"auto-fit"})," utility (the column-min-width is arbitrary per layout), so this is the one pattern that reaches for an inline ",e.jsx(s.code,{children:"gridTemplateColumns"})," — everything else on this page is plain classes."]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-3--dashboard-with-variable-height-widgets",children:"Pattern 3 — Dashboard with variable-height widgets"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": analytics dashboards, admin panels with widgets of different heights."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="grid grid-cols-3 grid-rows-3 gap-4">
  <div className="row-span-2"><ChartWidget /></div>
  <div><MetricCard title="Revenue" value="$45k" /></div>
  <div className="row-span-3"><ActivityFeed /></div>
  <div><MetricCard title="Users" value="1.2k" /></div>
  <div className="col-span-2"><TableWidget /></div>
</div>
`})}),`
`,e.jsxs("div",{className:"grid grid-cols-3 grid-rows-3 gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12,minHeight:300},children:[e.jsx("div",{className:"row-span-2",style:{background:"#0b4bff",color:"white",padding:16,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("strong",{children:"Tall Widget (2 rows)"})}),e.jsx("div",{style:{background:"#f0faff",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:e.jsx("strong",{children:"Metric A"})}),e.jsx("div",{className:"row-span-3",style:{background:"#2f7d32",color:"white",padding:16,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("strong",{children:"Full Height (3 rows)"})}),e.jsx("div",{style:{background:"#f0faff",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:e.jsx("strong",{children:"Metric B"})}),e.jsx("div",{className:"col-span-2",style:{background:"#edf2f7",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:e.jsx("strong",{children:"Wide Widget (2 columns)"})})]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-4--sidebar-layout-fixed--flexible",children:"Pattern 4 — Sidebar layout (fixed + flexible)"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": app shells, documentation sites, admin panels."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="grid grid-cols-1 gap-4 md:grid-cols-[250px_1fr]">
  <aside><Sidebar /></aside>
  <main><Content /></main>
</div>
`})}),`
`,e.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-[250px_1fr]",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("aside",{style:{background:"#f7fafc",padding:16,borderRadius:4,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Sidebar"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"Fixed 250px from md up"})]}),e.jsxs("main",{style:{background:"#edf2f7",padding:16,borderRadius:4,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Main Content"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"Flexible width"})]})]}),`
`,e.jsxs(s.p,{children:["Tailwind's arbitrary-value syntax (",e.jsx(s.code,{children:"grid-cols-[250px_1fr]"}),") covers the legacy system's ",e.jsx(s.code,{children:".grid-cols-sidebar"})," preset — there's no need for a named utility for a one-off column template."]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h3,{id:"pattern-5--column-ordering-responsive-reorder",children:"Pattern 5 — Column ordering (responsive reorder)"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"When to use"}),": show content first on mobile, sidebar first on desktop, without changing DOM order."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <main className="order-2 md:order-1"><Content /></main>
  <aside className="order-1 md:order-2"><Sidebar /></aside>
</div>
`})}),`
`,e.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("main",{className:"order-2 md:order-1",style:{background:"#e5edf4",padding:16,borderRadius:4,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Main Content"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"Second on mobile, first from md up"})]}),e.jsxs("aside",{className:"order-1 md:order-2",style:{background:"#0b4bff",color:"white",padding:16,borderRadius:4},children:[e.jsx("strong",{children:"Sidebar"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px"},children:"First on mobile, second from md up"})]})]}),`
`,e.jsxs(s.p,{children:["Note the direction — this example deliberately shows main content ordered ",e.jsx(s.em,{children:"after"})," sidebar in source but ",e.jsx(s.em,{children:"first"})," visually below ",e.jsx(s.code,{children:"md"}),", the opposite of Pattern 1. Reorder visually only; keep source order logical for screen readers."]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"complete-utility-reference",children:"Complete Utility Reference"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Category"}),e.jsx(s.th,{children:"Classes"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Container"}),e.jsx(s.td,{children:e.jsx(s.code,{children:"grid"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Columns"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"grid-cols-{1-12}"}),", ",e.jsx(s.code,{children:"col-span-{1-12}"}),", ",e.jsx(s.code,{children:"col-span-full"}),", ",e.jsx(s.code,{children:"col-start-{1-13}"}),", ",e.jsx(s.code,{children:"col-end-{1-13}"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Rows"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"grid-rows-{1-6}"}),", ",e.jsx(s.code,{children:"row-span-{1-6}"}),", ",e.jsx(s.code,{children:"row-span-full"}),", ",e.jsx(s.code,{children:"row-start-{1-7}"}),", ",e.jsx(s.code,{children:"row-end-{1-7}"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Gap"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"gap-{N}"}),", ",e.jsx(s.code,{children:"gap-x-{N}"}),", ",e.jsx(s.code,{children:"gap-y-{N}"})," (full spacing scale, 0–96)"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Flow"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"grid-flow-row"}),", ",e.jsx(s.code,{children:"grid-flow-col"}),", ",e.jsx(s.code,{children:"grid-flow-dense"}),", ",e.jsx(s.code,{children:"grid-flow-row-dense"}),", ",e.jsx(s.code,{children:"grid-flow-col-dense"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Alignment (items)"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"items-start"}),", ",e.jsx(s.code,{children:"items-center"}),", ",e.jsx(s.code,{children:"items-end"}),", ",e.jsx(s.code,{children:"items-baseline"}),", ",e.jsx(s.code,{children:"items-stretch"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Alignment (content)"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"justify-start"}),", ",e.jsx(s.code,{children:"justify-center"}),", ",e.jsx(s.code,{children:"justify-end"}),", ",e.jsx(s.code,{children:"justify-between"}),", ",e.jsx(s.code,{children:"justify-around"}),", ",e.jsx(s.code,{children:"justify-evenly"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Combined placement"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"place-items-{start|center|end|stretch|baseline}"}),", ",e.jsx(s.code,{children:"place-content-{start|center|end|between|around|evenly|stretch}"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Ordering"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"order-{1-12}"}),", ",e.jsx(s.code,{children:"order-first"}),", ",e.jsx(s.code,{children:"order-last"}),", ",e.jsx(s.code,{children:"order-none"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Aspect ratio"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"aspect-square"}),", ",e.jsx(s.code,{children:"aspect-video"}),", ",e.jsx(s.code,{children:"aspect-[N/M]"})," (arbitrary ratios)"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Container"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"container"})," (customized max-width, see above)"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Responsive prefix"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"sm:"}),", ",e.jsx(s.code,{children:"md:"}),", ",e.jsx(s.code,{children:"lg:"}),", ",e.jsx(s.code,{children:"xl:"}),", ",e.jsx(s.code,{children:"2xl:"})," — prepend to any class above"]})]})]})]}),`
`,e.jsxs(s.p,{children:["Any class not covered by a named utility (an unusual column template, a one-off ratio) is available via Tailwind's arbitrary-value syntax: ",e.jsx(s.code,{children:"grid-cols-[200px_1fr_200px]"}),", ",e.jsx(s.code,{children:"aspect-[21/9]"}),"."]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"comparison-with-the-legacy-grid",children:"Comparison with the Legacy Grid"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{}),e.jsx(s.th,{children:"This page (Tailwind)"}),e.jsx(s.th,{children:e.jsx(s.a,{href:"?path=/docs/foundations-%E2%9A%A0%EF%B8%8F-grid-legacy--docs",children:"Foundations/Grid Legacy"})})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Use for"}),e.jsxs(s.td,{children:["All new work, all ",e.jsx(s.code,{children:"ui/*"})," components"]}),e.jsx(s.td,{children:"Only the ~26 existing legacy MUI marketing pages/sections that already use it"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Breakpoints"}),e.jsx(s.td,{children:e.jsx(s.code,{children:"sm:640 md:768 lg:1024 xl:1280 2xl:1536"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"sm:576 md:768 lg:1024 xl:1200 xxl:1540"})," — differs at every tier except md/lg"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Responsive syntax"}),e.jsxs(s.td,{children:["Prefix: ",e.jsx(s.code,{children:"md:col-span-6"})]}),e.jsxs(s.td,{children:["Suffix: ",e.jsx(s.code,{children:"mds-legacy-col-md-6"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Column span"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"col-span-{N}"})," (of however many ",e.jsx(s.code,{children:"grid-cols-N"})," defines)"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"mds-legacy-col-{N}"})," (of 12)"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Container max-width"}),e.jsx(s.td,{children:"1540px (customized to match)"}),e.jsx(s.td,{children:"1540px (native)"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Gap scale"}),e.jsxs(s.td,{children:["Same 4px base, ",e.jsx(s.code,{children:"gap-{N}"})]}),e.jsxs(s.td,{children:["Same 4px base, ",e.jsx(s.code,{children:"mds-legacy-gap-{N}"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Import needed"}),e.jsx(s.td,{children:"None"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"_grid.scss"}),", loaded globally via ",e.jsx(s.code,{children:"global.scss"})]})]})]})]}),`
`,e.jsxs(s.p,{children:["Never mix the two systems' classes on the same element — they use CSS Grid differently and their column-span math doesn't reconcile (12-column vs. whatever ",e.jsx(s.code,{children:"grid-cols-N"})," you set)."]})]})}function x(d={}){const{wrapper:s}={...r(),...d.components};return s?e.jsx(s,{...d,children:e.jsx(i,{...d})}):i(d)}export{x as default};
