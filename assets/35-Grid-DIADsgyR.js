import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t,s as n}from"./blocks-GA0YWl98.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";import{n as o,t as s}from"./GridHealth-BfTU8vQJ.js";function c(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Foundations/Grid`}),`
`,(0,u.jsx)(t.h1,{id:`grid-system`,children:`Grid System`}),`
`,(0,u.jsxs)(t.p,{children:[`The standard grid for all new work: plain `,(0,u.jsx)(t.a,{href:`https://tailwindcss.com/docs/grid-template-columns`,rel:`nofollow`,children:`Tailwind CSS`}),` grid utilities. No custom classes, no separate import — `,(0,u.jsx)(t.code,{children:`grid`}),`, `,(0,u.jsx)(t.code,{children:`grid-cols-*`}),`, `,(0,u.jsx)(t.code,{children:`gap-*`}),`, and `,(0,u.jsx)(t.code,{children:`col-span-*`}),` are built into Tailwind itself and already available everywhere in this app.`]}),`
`,(0,u.jsxs)(`div`,{style:{background:`linear-gradient(135deg, #000f47 0%, #0b4bff 100%)`,color:`white`,padding:`24px`,borderRadius:`8px`,marginBottom:`32px`},children:[(0,u.jsx)(`h2`,{style:{margin:`0 0 8px 0`,fontSize:`20px`},children:`Which grid do I use?`}),(0,u.jsx)(`p`,{style:{margin:`0 0 16px 0`,opacity:.9},children:(0,u.jsxs)(t.p,{children:[`Building anything new, including any `,(0,u.jsx)(`code`,{children:`src/components/ui`}),` (shadcn) component? Use this page.
Editing one of the existing legacy MUI marketing pages/sections (HeroBanner, MarshCorporate, the
marsh-new-charpter-begins and CorporateLandingPage sections)? Those already use a different,
older grid system — see `,(0,u.jsx)(`a`,{href:`?path=/docs/foundations-⚠️-grid-legacy--docs`,style:{color:`#ceecff`},children:`Foundations/Grid Legacy`}),` instead,
and don't mix the two on the same element.`]})})]}),`
`,`
`,(0,u.jsx)(s,{label:`Grid runtime`,testClassName:`grid grid-cols-12`}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`for-designers`,children:`For Designers`}),`
`,(0,u.jsx)(t.h3,{id:`what-this-gives-you`,children:`What this gives you`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`A 12-column grid at any breakpoint, with `,(0,u.jsx)(t.code,{children:`col-span-*`}),` to size an element across N columns`]}),`
`,(0,u.jsxs)(t.li,{children:[`A spacing scale from 0 to 24rem (`,(0,u.jsx)(t.code,{children:`gap-0`}),` through `,(0,u.jsx)(t.code,{children:`gap-96`}),`, on the same 4px base as the rest of the design system)`]}),`
`,(0,u.jsxs)(t.li,{children:[`Five responsive breakpoints, applied with a prefix (`,(0,u.jsx)(t.code,{children:`md:grid-cols-4`}),`), not a suffix`]}),`
`,(0,u.jsx)(t.li,{children:`Auto-fit/auto-fill columns for card grids where you don't know the count in advance`}),`
`,(0,u.jsxs)(t.li,{children:[`A centered `,(0,u.jsx)(t.code,{children:`container`}),` utility, customized for this brand to cap at 1540px (matching the legacy system's own max width, so pages don't visually jump if they mix eras)`]}),`
`]}),`
`,(0,u.jsx)(t.h3,{id:`design-tokens`,children:`Design tokens`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{children:`Breakpoints (real Tailwind defaults — unmodified in this project):
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
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`for-developers`,children:`For Developers`}),`
`,(0,u.jsx)(t.h3,{id:`nothing-to-install`,children:`Nothing to install`}),`
`,(0,u.jsxs)(t.p,{children:[`Tailwind's grid utilities are generated on demand from whatever classes appear in your JSX — there's no import, no SCSS `,(0,u.jsx)(t.code,{children:`@use`}),`, no separate build step. Just write the class names.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`// No import needed — Tailwind scans src/**/*.{ts,tsx} automatically
<div className="grid grid-cols-12 gap-6">...</div>
`})}),`
`,(0,u.jsx)(t.h3,{id:`the-one-real-customization`,children:`The one real customization`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.code,{children:`tailwind.config.js`}),`'s `,(0,u.jsx)(t.code,{children:`theme.container`}),` is customized so the `,(0,u.jsx)(t.code,{children:`container`}),` utility centers, applies the same 16/24/32px padding steps the rest of this app uses, and caps at exactly `,(0,u.jsx)(t.strong,{children:`1540px`}),` at the `,(0,u.jsx)(t.code,{children:`2xl`}),` tier — everything else (`,(0,u.jsx)(t.code,{children:`grid-cols-*`}),`, `,(0,u.jsx)(t.code,{children:`gap-*`}),`, the `,(0,u.jsx)(t.code,{children:`sm/md/lg/xl/2xl`}),` breakpoints themselves) is stock Tailwind, unmodified.`]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`grid-stack-or-pageshell`,children:`Grid, Stack, or PageShell?`}),`
`,(0,u.jsx)(t.p,{children:`Three tools, and picking the wrong one is the usual cause of layout that
fights back:`}),`
`,(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Situation`}),(0,u.jsx)(t.th,{children:`Use`}),(0,u.jsx)(t.th,{children:`Why`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsxs)(t.td,{children:[`Children in `,(0,u.jsx)(t.strong,{children:`one direction`}),` with even spacing`]}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`<Stack>`}),` / `,(0,u.jsx)(t.code,{children:`<Inline>`})]}),(0,u.jsxs)(t.td,{children:[`The gap is type-checked against the DS scale; `,(0,u.jsx)(t.code,{children:`gap={7}`}),` will not compile`]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.strong,{children:`Two-dimensional`}),` layout — columns that reflow, spans, ordering`]}),(0,u.jsx)(t.td,{children:`Grid utilities on this page`}),(0,u.jsx)(t.td,{children:`A grid is what this is. Three nested stacks faking one is harder to read and to change`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsxs)(t.td,{children:[`The `,(0,u.jsx)(t.strong,{children:`page frame`}),` — header, sidebar, main`]}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`<PageShell>`})}),(0,u.jsxs)(t.td,{children:[`It already handles the responsive sidebar, the mobile scrim, and the `,(0,u.jsx)(t.code,{children:`min-w-0`}),` chain that stops wide tables scrolling the page sideways`]})]})]})]}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.code,{children:`Stack`}),` and grid compose freely: a `,(0,u.jsx)(t.code,{children:`Stack`}),` of sections where one section is a
`,(0,u.jsx)(t.code,{children:`grid grid-cols-3`}),` is the normal shape of a dashboard page.`]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`common-patterns`,children:`Common Patterns`}),`
`,(0,u.jsx)(t.h3,{id:`pattern-1--two-column-layout-main--sidebar`,children:`Pattern 1 — Two-column layout (main + sidebar)`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: main content + sidebar layouts, the most common page shape.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="grid grid-cols-4 gap-4 md:grid-cols-12">
  <div className="col-span-4 md:col-span-8">Main content</div>
  <div className="col-span-4 md:col-span-4">Sidebar</div>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`grid grid-cols-4 gap-4 md:grid-cols-12`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsxs)(`div`,{className:`col-span-4 md:col-span-8`,style:{background:`#e5edf4`,padding:16,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Main Content`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`14px`},children:`66% width from md up, 100% below`})]}),(0,u.jsxs)(`div`,{className:`col-span-4 md:col-span-4`,style:{background:`#c7edff`,padding:16,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Sidebar`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`14px`},children:`33% width from md up, 100% below`})]})]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-2--responsive-card-grid-auto-fit`,children:`Pattern 2 — Responsive card grid, auto-fit`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: product cards, blog posts, image galleries — any count of cards, unknown in advance.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
  {products.map((product) => <ProductCard key={product.id} {...product} />)}
</div>
`})}),`
`,(0,u.jsx)(`div`,{className:`grid gap-4`,style:{gridTemplateColumns:`repeat(auto-fit, minmax(220px, 1fr))`,border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:Array.from({length:6}).map((e,t)=>(0,u.jsxs)(`div`,{style:{background:`#f0faff`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:[(0,u.jsxs)(`strong`,{children:[`Card `,t+1]}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`,color:`#666`},children:`Auto-fits at 220px min`})]},t))}),`
`,(0,u.jsxs)(t.p,{children:[`Tailwind doesn't ship a bare `,(0,u.jsx)(t.code,{children:`auto-fit`}),` utility (the column-min-width is arbitrary per layout), so this is the one pattern that reaches for an inline `,(0,u.jsx)(t.code,{children:`gridTemplateColumns`}),` — everything else on this page is plain classes.`]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-3--dashboard-with-variable-height-widgets`,children:`Pattern 3 — Dashboard with variable-height widgets`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: analytics dashboards, admin panels with widgets of different heights.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="grid grid-cols-3 grid-rows-3 gap-4">
  <div className="row-span-2"><ChartWidget /></div>
  <div><MetricCard title="Revenue" value="$45k" /></div>
  <div className="row-span-3"><ActivityFeed /></div>
  <div><MetricCard title="Users" value="1.2k" /></div>
  <div className="col-span-2"><TableWidget /></div>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`grid grid-cols-3 grid-rows-3 gap-4`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12,minHeight:300},children:[(0,u.jsx)(`div`,{className:`row-span-2`,style:{background:`#0b4bff`,color:`white`,padding:16,borderRadius:4,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,u.jsx)(`strong`,{children:`Tall Widget (2 rows)`})}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:(0,u.jsx)(`strong`,{children:`Metric A`})}),(0,u.jsx)(`div`,{className:`row-span-3`,style:{background:`#2f7d32`,color:`white`,padding:16,borderRadius:4,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,u.jsx)(`strong`,{children:`Full Height (3 rows)`})}),(0,u.jsx)(`div`,{style:{background:`#f0faff`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:(0,u.jsx)(`strong`,{children:`Metric B`})}),(0,u.jsx)(`div`,{className:`col-span-2`,style:{background:`#edf2f7`,padding:16,borderRadius:4,textAlign:`center`,color:`#1a1a1a`},children:(0,u.jsx)(`strong`,{children:`Wide Widget (2 columns)`})})]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-4--sidebar-layout-fixed--flexible`,children:`Pattern 4 — Sidebar layout (fixed + flexible)`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: app shells, documentation sites, admin panels.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="grid grid-cols-1 gap-4 md:grid-cols-[250px_1fr]">
  <aside><Sidebar /></aside>
  <main><Content /></main>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`grid grid-cols-1 gap-4 md:grid-cols-[250px_1fr]`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsxs)(`aside`,{style:{background:`#f7fafc`,padding:16,borderRadius:4,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Sidebar`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`,color:`#666`},children:`Fixed 250px from md up`})]}),(0,u.jsxs)(`main`,{style:{background:`#edf2f7`,padding:16,borderRadius:4,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Main Content`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`,color:`#666`},children:`Flexible width`})]})]}),`
`,(0,u.jsxs)(t.p,{children:[`Tailwind's arbitrary-value syntax (`,(0,u.jsx)(t.code,{children:`grid-cols-[250px_1fr]`}),`) covers the legacy system's `,(0,u.jsx)(t.code,{children:`.grid-cols-sidebar`}),` preset — there's no need for a named utility for a one-off column template.`]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h3,{id:`pattern-5--column-ordering-responsive-reorder`,children:`Pattern 5 — Column ordering (responsive reorder)`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`When to use`}),`: show content first on mobile, sidebar first on desktop, without changing DOM order.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <main className="order-2 md:order-1"><Content /></main>
  <aside className="order-1 md:order-2"><Sidebar /></aside>
</div>
`})}),`
`,(0,u.jsxs)(`div`,{className:`grid grid-cols-1 gap-4 md:grid-cols-2`,style:{border:`1px solid #e5e7eb`,padding:8,borderRadius:6,marginTop:12},children:[(0,u.jsxs)(`main`,{className:`order-2 md:order-1`,style:{background:`#e5edf4`,padding:16,borderRadius:4,color:`#1a1a1a`},children:[(0,u.jsx)(`strong`,{children:`Main Content`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`,color:`#666`},children:`Second on mobile, first from md up`})]}),(0,u.jsxs)(`aside`,{className:`order-1 md:order-2`,style:{background:`#0b4bff`,color:`white`,padding:16,borderRadius:4},children:[(0,u.jsx)(`strong`,{children:`Sidebar`}),(0,u.jsx)(`p`,{style:{margin:`8px 0 0 0`,fontSize:`12px`},children:`First on mobile, second from md up`})]})]}),`
`,(0,u.jsxs)(t.p,{children:[`Note the direction — this example deliberately shows main content ordered `,(0,u.jsx)(t.em,{children:`after`}),` sidebar in source but `,(0,u.jsx)(t.em,{children:`first`}),` visually below `,(0,u.jsx)(t.code,{children:`md`}),`, the opposite of Pattern 1. Reorder visually only; keep source order logical for screen readers.`]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`complete-utility-reference`,children:`Complete Utility Reference`}),`
`,(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{children:`Category`}),(0,u.jsx)(t.th,{children:`Classes`})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Container`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`grid`})})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Columns`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`grid-cols-{1-12}`}),`, `,(0,u.jsx)(t.code,{children:`col-span-{1-12}`}),`, `,(0,u.jsx)(t.code,{children:`col-span-full`}),`, `,(0,u.jsx)(t.code,{children:`col-start-{1-13}`}),`, `,(0,u.jsx)(t.code,{children:`col-end-{1-13}`})]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Rows`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`grid-rows-{1-6}`}),`, `,(0,u.jsx)(t.code,{children:`row-span-{1-6}`}),`, `,(0,u.jsx)(t.code,{children:`row-span-full`}),`, `,(0,u.jsx)(t.code,{children:`row-start-{1-7}`}),`, `,(0,u.jsx)(t.code,{children:`row-end-{1-7}`})]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Gap`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`gap-{N}`}),`, `,(0,u.jsx)(t.code,{children:`gap-x-{N}`}),`, `,(0,u.jsx)(t.code,{children:`gap-y-{N}`}),` (full spacing scale, 0–96)`]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Flow`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`grid-flow-row`}),`, `,(0,u.jsx)(t.code,{children:`grid-flow-col`}),`, `,(0,u.jsx)(t.code,{children:`grid-flow-dense`}),`, `,(0,u.jsx)(t.code,{children:`grid-flow-row-dense`}),`, `,(0,u.jsx)(t.code,{children:`grid-flow-col-dense`})]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Alignment (items)`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`items-start`}),`, `,(0,u.jsx)(t.code,{children:`items-center`}),`, `,(0,u.jsx)(t.code,{children:`items-end`}),`, `,(0,u.jsx)(t.code,{children:`items-baseline`}),`, `,(0,u.jsx)(t.code,{children:`items-stretch`})]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Alignment (content)`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`justify-start`}),`, `,(0,u.jsx)(t.code,{children:`justify-center`}),`, `,(0,u.jsx)(t.code,{children:`justify-end`}),`, `,(0,u.jsx)(t.code,{children:`justify-between`}),`, `,(0,u.jsx)(t.code,{children:`justify-around`}),`, `,(0,u.jsx)(t.code,{children:`justify-evenly`})]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Combined placement`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`place-items-{start|center|end|stretch|baseline}`}),`, `,(0,u.jsx)(t.code,{children:`place-content-{start|center|end|between|around|evenly|stretch}`})]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Ordering`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`order-{1-12}`}),`, `,(0,u.jsx)(t.code,{children:`order-first`}),`, `,(0,u.jsx)(t.code,{children:`order-last`}),`, `,(0,u.jsx)(t.code,{children:`order-none`})]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Aspect ratio`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`aspect-square`}),`, `,(0,u.jsx)(t.code,{children:`aspect-video`}),`, `,(0,u.jsx)(t.code,{children:`aspect-[N/M]`}),` (arbitrary ratios)`]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Container`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`container`}),` (customized max-width, see above)`]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Responsive prefix`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`sm:`}),`, `,(0,u.jsx)(t.code,{children:`md:`}),`, `,(0,u.jsx)(t.code,{children:`lg:`}),`, `,(0,u.jsx)(t.code,{children:`xl:`}),`, `,(0,u.jsx)(t.code,{children:`2xl:`}),` — prepend to any class above`]})]})]})]}),`
`,(0,u.jsxs)(t.p,{children:[`Any class not covered by a named utility (an unusual column template, a one-off ratio) is available via Tailwind's arbitrary-value syntax: `,(0,u.jsx)(t.code,{children:`grid-cols-[200px_1fr_200px]`}),`, `,(0,u.jsx)(t.code,{children:`aspect-[21/9]`}),`.`]}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.h2,{id:`comparison-with-the-legacy-grid`,children:`Comparison with the Legacy Grid`}),`
`,(0,u.jsxs)(t.table,{children:[(0,u.jsx)(t.thead,{children:(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.th,{}),(0,u.jsx)(t.th,{children:`This page (Tailwind)`}),(0,u.jsx)(t.th,{children:(0,u.jsx)(t.a,{href:`?path=/docs/foundations-%E2%9A%A0%EF%B8%8F-grid-legacy--docs`,children:`Foundations/Grid Legacy`})})]})}),(0,u.jsxs)(t.tbody,{children:[(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Use for`}),(0,u.jsxs)(t.td,{children:[`All new work, all `,(0,u.jsx)(t.code,{children:`ui/*`}),` components`]}),(0,u.jsx)(t.td,{children:`Only the ~26 existing legacy MUI marketing pages/sections that already use it`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Breakpoints`}),(0,u.jsx)(t.td,{children:(0,u.jsx)(t.code,{children:`sm:640 md:768 lg:1024 xl:1280 2xl:1536`})}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`sm:576 md:768 lg:1024 xl:1200 xxl:1540`}),` — differs at every tier except md/lg`]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Responsive syntax`}),(0,u.jsxs)(t.td,{children:[`Prefix: `,(0,u.jsx)(t.code,{children:`md:col-span-6`})]}),(0,u.jsxs)(t.td,{children:[`Suffix: `,(0,u.jsx)(t.code,{children:`mds-legacy-col-md-6`})]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Column span`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`col-span-{N}`}),` (of however many `,(0,u.jsx)(t.code,{children:`grid-cols-N`}),` defines)`]}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`mds-legacy-col-{N}`}),` (of 12)`]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Container max-width`}),(0,u.jsx)(t.td,{children:`1540px (customized to match)`}),(0,u.jsx)(t.td,{children:`1540px (native)`})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Gap scale`}),(0,u.jsxs)(t.td,{children:[`Same 4px base, `,(0,u.jsx)(t.code,{children:`gap-{N}`})]}),(0,u.jsxs)(t.td,{children:[`Same 4px base, `,(0,u.jsx)(t.code,{children:`mds-legacy-gap-{N}`})]})]}),(0,u.jsxs)(t.tr,{children:[(0,u.jsx)(t.td,{children:`Import needed`}),(0,u.jsx)(t.td,{children:`None`}),(0,u.jsxs)(t.td,{children:[(0,u.jsx)(t.code,{children:`_grid.scss`}),`, loaded globally via `,(0,u.jsx)(t.code,{children:`global.scss`})]})]})]})]}),`
`,(0,u.jsxs)(t.p,{children:[`Never mix the two systems' classes on the same element — they use CSS Grid differently and their column-span math doesn't reconcile (12-column vs. whatever `,(0,u.jsx)(t.code,{children:`grid-cols-N`}),` you set).`]})]})}function l(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=r(),i(),t(),o()})))()}d();export{l as default};