import{e as r,j as e}from"./iframe-B7__wHsY.js";import{useMDXComponents as u}from"./index-B5YtEhlm.js";import"./preload-helper-PPVm8Dsz.js";function f(i){const d=r.useRef(null),[s,n]=r.useState("checking"),[o,t]=r.useState("");r.useEffect(()=>{let h=!1,p=0;const b=5,g=()=>{if(h)return;const j=d.current;if(!j)return;const l=getComputedStyle(j),c=l.display,a=l.gridTemplateColumns,y=l.gap;c.includes("grid")&&a&&a!=="none"?(n("ok"),t(`display=${c}, cols=${a}, gap=${y}`)):p<b?(p+=1,requestAnimationFrame(g)):(n("fail"),t(`display=${c||"n/a"}`))};return requestAnimationFrame(g),()=>{h=!0}},[]);const x=s==="ok"?"#1a7f37":s==="fail"?"#c62828":"#6b7280",v=s==="ok"?"#e7f5ec":s==="fail"?"#fdecea":"#f3f4f6";return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:8,borderRadius:6,background:v,border:`1px solid ${x}`},children:[e.jsx("div",{style:{width:10,height:10,borderRadius:"50%",background:x}}),e.jsxs("div",{style:{fontFamily:"monospace",fontSize:12},children:[i.label??"Grid CSS",": ",s.toUpperCase()," ",o?`(${o})`:null]}),e.jsx("div",{ref:d,className:"row",style:{position:"absolute",visibility:"hidden"}})]})}f.__docgenInfo={description:"",methods:[],displayName:"GridHealth",props:{label:{required:!1,tsType:{name:"string"},description:""}}};const A={title:"Foundations/Grid"};function m(i){const d={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...u(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(d.h1,{id:"grid-system",children:"Grid System"}),`
`,e.jsx(d.p,{children:"A powerful, scalable 12-column grid system built with CSS Grid. Perfect for responsive layouts, dashboards, and complex page structures."}),`
`,e.jsxs("div",{style:{background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",padding:"24px",borderRadius:"8px",marginBottom:"32px"},children:[e.jsx("h2",{style:{margin:"0 0 8px 0",fontSize:"24px"},children:"Quick Specs"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"16px",marginTop:"16px"},children:[e.jsx("div",{children:e.jsxs(d.p,{children:[e.jsx("strong",{children:"Columns:"})," 12 (customizable 1-12)"]})}),e.jsx("div",{children:e.jsxs(d.p,{children:[e.jsx("strong",{children:"Base Unit:"})," 4px"]})}),e.jsx("div",{children:e.jsxs(d.p,{children:[e.jsx("strong",{children:"Gutters:"})," 8px default"]})}),e.jsx("div",{children:e.jsxs(d.p,{children:[e.jsx("strong",{children:"Breakpoints:"})," xs, sm(600), md(900), lg(1200), xl(1536)"]})})]})]}),`
`,`
`,e.jsx(f,{label:"Grid runtime"}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h2,{id:"-for-designers",children:"👥 For Designers"}),`
`,e.jsx(d.h3,{id:"what-you-can-do",children:"What You Can Do"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:["✅ ",e.jsx(d.strong,{children:"Create responsive layouts"})," that adapt from mobile to desktop"]}),`
`,e.jsxs(d.li,{children:["✅ ",e.jsx(d.strong,{children:"Build dashboard widgets"})," with different heights"]}),`
`,e.jsxs(d.li,{children:["✅ ",e.jsx(d.strong,{children:"Design card grids"})," that auto-fit to screen size"]}),`
`,e.jsxs(d.li,{children:["✅ ",e.jsx(d.strong,{children:"Control spacing"})," from 4px to 96px"]}),`
`,e.jsxs(d.li,{children:["✅ ",e.jsx(d.strong,{children:"Align content"})," horizontally and vertically"]}),`
`,e.jsxs(d.li,{children:["✅ ",e.jsx(d.strong,{children:"Reorder elements"})," visually without changing HTML"]}),`
`]}),`
`,e.jsx(d.h3,{id:"design-tokens",children:"Design Tokens"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{children:`Breakpoints:
  xs: 0px      (mobile)
  sm: 600px    (tablet portrait)
  md: 900px    (tablet landscape)
  lg: 1200px   (desktop)
  xl: 1536px   (large desktop)

Spacing Scale:
  gap-1: 4px    gap-6: 24px   gap-12: 48px
  gap-2: 8px    gap-8: 32px   gap-16: 64px
  gap-3: 12px   gap-9: 36px   gap-20: 80px
  gap-4: 16px   gap-10: 40px  gap-24: 96px
`})}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h2,{id:"-for-developers",children:"👨‍💻 For Developers"}),`
`,e.jsx(d.h3,{id:"installation",children:"Installation"}),`
`,e.jsx(d.p,{children:"The grid is already wired globally. Just use the classes in your HTML/JSX:"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`// Grid is imported in src/global.scss
// No additional imports needed!
`})}),`
`,e.jsx(d.h3,{id:"import-in-custom-scss-optional",children:"Import in Custom SCSS (Optional)"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-scss",children:`@use '../styles/grid' as *;
`})}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h2,{id:"-common-patterns-copy--paste",children:"📚 Common Patterns (Copy & Paste)"}),`
`,e.jsx(d.h3,{id:"pattern-1-basic-two-column-layout",children:"Pattern 1: Basic Two-Column Layout"}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"When to use"}),": Main content + sidebar layouts"]}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"HTML:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="container">
  <div class="row gap-4">
    <div class="col-12 col-md-8">Main content</div>
    <div class="col-12 col-md-4">Sidebar</div>
  </div>
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"React/JSX:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<div className="container">
  <div className="row gap-4">
    <div className="col-12 col-md-8">Main content</div>
    <div className="col-12 col-md-4">Sidebar</div>
  </div>
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"Live Example:"})}),`
`,e.jsx("div",{className:"container",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:e.jsxs("div",{className:"row gap-4",children:[e.jsxs("div",{className:"col-12 col-md-8",style:{background:"#e5edf4",padding:16,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Main Content"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"14px"},children:"66% width on desktop, 100% on mobile"})]}),e.jsxs("div",{className:"col-12 col-md-4",style:{background:"#c7edff",padding:16,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Sidebar"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"14px"},children:"33% width on desktop, 100% on mobile"})]})]})}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h3,{id:"pattern-2-responsive-card-grid",children:"Pattern 2: Responsive Card Grid"}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"When to use"}),": Product cards, blog posts, image galleries"]}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"HTML:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<!-- Auto-fits cards at 300px minimum width -->
<div class="grid-auto-fit-md gap-4">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"React/JSX:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<div className="grid-auto-fit-md gap-4">
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"Live Example:"})}),`
`,e.jsx("div",{className:"grid-auto-fit-md gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:Array.from({length:6}).map((s,n)=>e.jsxs("div",{style:{background:"#f0faff",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:[e.jsxs("strong",{children:["Card ",n+1]}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"Auto-fits at 300px min"})]},n))}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h3,{id:"pattern-3-dashboard-with-widgets",children:"Pattern 3: Dashboard with Widgets"}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"When to use"}),": Analytics dashboards, admin panels with varying widget heights"]}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"HTML:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="grid-cols-3 grid-rows-3 gap-4">
  <div class="row-span-2">Tall Chart Widget</div>
  <div>Metric A</div>
  <div class="row-span-3">Activity Feed (Full Height)</div>
  <div>Metric B</div>
  <div class="col-span-2">Wide Widget</div>
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"React/JSX:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<div className="grid-cols-3 grid-rows-3 gap-4">
  <div className="row-span-2">
    <ChartWidget data={data} />
  </div>
  <div><MetricCard title="Revenue" value="$45k" /></div>
  <div className="row-span-3">
    <ActivityFeed />
  </div>
  <div><MetricCard title="Users" value="1.2k" /></div>
  <div className="col-span-2">
    <TableWidget />
  </div>
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"Live Example:"})}),`
`,e.jsxs("div",{className:"grid-cols-3 grid-rows-3 gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12,minHeight:300},children:[e.jsx("div",{className:"row-span-2",style:{background:"#667eea",color:"white",padding:16,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("strong",{children:"Tall Widget (2 rows)"})}),e.jsx("div",{style:{background:"#f0faff",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:e.jsx("strong",{children:"Metric A"})}),e.jsx("div",{className:"row-span-3",style:{background:"#48bb78",color:"white",padding:16,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("strong",{children:"Full Height (3 rows)"})}),e.jsx("div",{style:{background:"#f0faff",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:e.jsx("strong",{children:"Metric B"})}),e.jsx("div",{className:"col-span-2",style:{background:"#edf2f7",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:e.jsx("strong",{children:"Wide Widget (2 columns)"})})]}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h3,{id:"pattern-4-equal-width-columns",children:"Pattern 4: Equal-Width Columns"}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"When to use"}),": When you want columns to automatically share space equally"]}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"HTML:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<!-- No numbers needed! All columns are equal width -->
<div class="row gap-4">
  <div class="col">Column 1</div>
  <div class="col">Column 2</div>
  <div class="col">Column 3</div>
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"React/JSX:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<div className="row gap-4">
  {features.map(feature => (
    <div key={feature.id} className="col">
      <FeatureCard {...feature} />
    </div>
  ))}
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"Live Example:"})}),`
`,e.jsxs("div",{className:"row gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("div",{className:"col",style:{background:"#e5edf4",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:[e.jsx("strong",{children:"Auto"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px"},children:"Equal width"})]}),e.jsxs("div",{className:"col",style:{background:"#c7edff",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:[e.jsx("strong",{children:"Auto"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px"},children:"Equal width"})]}),e.jsxs("div",{className:"col",style:{background:"#e5edf4",padding:16,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:[e.jsx("strong",{children:"Auto"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px"},children:"Equal width"})]})]}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h3,{id:"pattern-5-sidebar-layout",children:"Pattern 5: Sidebar Layout"}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"When to use"}),": App shells, documentation sites, admin panels"]}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"HTML:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<!-- Fixed 250px sidebar + flexible content -->
<div class="grid-cols-sidebar gap-4">
  <aside>Navigation</aside>
  <main>Content Area</main>
</div>

<!-- Responsive: stacks on mobile, sidebar on desktop -->
<div class="grid-cols-1 grid-cols-md-sidebar gap-4">
  <aside>Navigation</aside>
  <main>Content Area</main>
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"React/JSX:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<div className="grid-cols-1 grid-cols-md-sidebar gap-4">
  <aside><Sidebar /></aside>
  <main><Content /></main>
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"Live Example:"})}),`
`,e.jsxs("div",{className:"grid-cols-sidebar gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("aside",{style:{background:"#f7fafc",padding:16,borderRadius:4,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Sidebar"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"Fixed 250px width"})]}),e.jsxs("main",{style:{background:"#edf2f7",padding:16,borderRadius:4,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Main Content"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"Flexible width (takes remaining space)"})]})]}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h3,{id:"pattern-6-column-ordering-mobile-first",children:"Pattern 6: Column Ordering (Mobile-First)"}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"When to use"}),": Reorder content for different screen sizes (sidebar-first on desktop, content-first on mobile)"]}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"HTML:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="row gap-4">
  <!-- Shows first on mobile, second on desktop -->
  <main class="col-12 col-md-8 order-md-2">Main Content</main>
  
  <!-- Shows second on mobile, first on desktop -->
  <aside class="col-12 col-md-4 order-md-1">Sidebar</aside>
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"React/JSX:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<div className="row gap-4">
  <main className="col-12 col-md-8 order-md-2">
    <Content />
  </main>
  <aside className="col-12 col-md-4 order-md-1">
    <Sidebar />
  </aside>
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"Live Example:"})}),`
`,e.jsxs("div",{className:"row gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("main",{className:"col-12 col-md-8 order-md-2",style:{background:"#e5edf4",padding:16,borderRadius:4,color:"#1a1a1a"},children:[e.jsx("strong",{children:"Main Content"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#666"},children:"First on mobile, second on desktop"})]}),e.jsxs("aside",{className:"col-12 col-md-4 order-md-1",style:{background:"#667eea",color:"white",padding:16,borderRadius:4},children:[e.jsx("strong",{children:"Sidebar"}),e.jsx("p",{style:{margin:"8px 0 0 0",fontSize:"12px"},children:"Second on mobile, first on desktop ←"})]})]}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h3,{id:"pattern-7-custom-column-count-non-12",children:"Pattern 7: Custom Column Count (Non-12)"}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"When to use"}),": Unique layouts like 5-column product grids, 7-column week calendars"]}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"HTML:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<!-- 5-column grid -->
<div class="grid-cols-5 gap-4">
  <div>Mon</div>
  <div>Tue</div>
  <div>Wed</div>
  <div>Thu</div>
  <div>Fri</div>
</div>

<!-- 7-column full week -->
<div class="grid-cols-7 gap-3">
  <div>Sun</div>...<div>Sat</div>
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"React/JSX:"})}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<div className="grid-cols-5 gap-4">
  {weekdays.map(day => (
    <DayCard key={day} date={day} />
  ))}
</div>
`})}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"Live Example:"})}),`
`,e.jsx("div",{className:"grid-cols-5 gap-3",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:["Mon","Tue","Wed","Thu","Fri"].map(s=>e.jsx("div",{style:{background:"#f0faff",padding:12,borderRadius:4,textAlign:"center",color:"#1a1a1a"},children:e.jsx("strong",{children:s})},s))}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h2,{id:"-grid-fundamentals",children:"📐 Grid Fundamentals"}),`
`,e.jsx(d.h3,{id:"column-span-variations",children:"Column span variations"}),`
`,e.jsx(d.p,{children:"Common span patterns across 12 columns."}),`
`,e.jsx(d.p,{children:"Live preview"}),`
`,e.jsxs("div",{className:"container",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"row gap-2",children:e.jsx("div",{className:"col-12",style:{background:"#f4f4f4",padding:8,textAlign:"center",color:"#1a1a1a"},children:"12"})}),e.jsxs("div",{className:"row gap-2",style:{marginTop:8},children:[e.jsx("div",{className:"col-6",style:{background:"#e5edf4",padding:8,textAlign:"center",color:"#1a1a1a"},children:"6"}),e.jsx("div",{className:"col-6",style:{background:"#e5edf4",padding:8,textAlign:"center",color:"#1a1a1a"},children:"6"})]}),e.jsxs("div",{className:"row gap-2",style:{marginTop:8},children:[e.jsx("div",{className:"col-4",style:{background:"#c7edff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"4"}),e.jsx("div",{className:"col-4",style:{background:"#c7edff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"4"}),e.jsx("div",{className:"col-4",style:{background:"#c7edff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"4"})]}),e.jsxs("div",{className:"row gap-2",style:{marginTop:8},children:[e.jsx("div",{className:"col-3",style:{background:"#f0faff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"3"}),e.jsx("div",{className:"col-3",style:{background:"#f0faff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"3"}),e.jsx("div",{className:"col-3",style:{background:"#f0faff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"3"}),e.jsx("div",{className:"col-3",style:{background:"#f0faff",padding:8,textAlign:"center",color:"#1a1a1a"},children:"3"})]}),e.jsx("div",{className:"row gap-2",style:{marginTop:8},children:Array.from({length:6}).map((s,n)=>e.jsx("div",{className:"col-2",style:{background:"#ebebeb",padding:8,textAlign:"center",color:"#1a1a1a"},children:"2"},n))})]}),`
`,e.jsx(d.h3,{id:"alignment-grid--flex",children:"Alignment (grid + flex)"}),`
`,e.jsx(d.p,{children:"Grid item alignment via utilities, and inner-cell flex alignment when needed."}),`
`,e.jsx(d.p,{children:"Live preview"}),`
`,e.jsxs("div",{className:"container",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("div",{className:"row gap-2 align-center justify-center",style:{minHeight:120},children:[e.jsx("div",{className:"col-4",style:{background:"#e9f3ff",padding:8,color:"#1a1a1a"},children:"Center items (grid)"}),e.jsx("div",{className:"col-4",style:{background:"#e9f3ff",padding:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#1a1a1a"},children:"Flex center in cell"})]}),e.jsxs("div",{className:"row gap-2 content-justify-between content-align-center",style:{minHeight:120,marginTop:8},children:[e.jsx("div",{className:"col-3",style:{background:"#f9f7fb",padding:8,textAlign:"center",color:"#1a1a1a"},children:"A"}),e.jsx("div",{className:"col-3",style:{background:"#f9f7fb",padding:8,textAlign:"center",color:"#1a1a1a"},children:"B"}),e.jsx("div",{className:"col-3",style:{background:"#f9f7fb",padding:8,textAlign:"center",color:"#1a1a1a"},children:"C"})]})]}),`
`,e.jsx(d.h3,{id:"responsive-cards",children:"Responsive cards"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="container">
  <div class="row gap-2">
    <div class="col-12 col-md-6 col-lg-4 col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
    <div class="col-12 col-md-6 col-lg-4 col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
    <div class="col-12 col-md-6 col-lg-4 col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
    <div class="col-12 col-md-6 col-lg-4 col-xl-3" style="background:#f9f7fb; padding:12px;">Card</div>
  </div>
</div>
`})}),`
`,e.jsx(d.p,{children:"Live preview"}),`
`,e.jsx("div",{className:"container",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6},children:e.jsxs("div",{className:"row gap-2",children:[e.jsx("div",{className:"col-12 col-md-6 col-lg-4 col-xl-3",style:{background:"#f9f7fb",padding:12,color:"#1a1a1a"},children:"Card"}),e.jsx("div",{className:"col-12 col-md-6 col-lg-4 col-xl-3",style:{background:"#f9f7fb",padding:12,color:"#1a1a1a"},children:"Card"}),e.jsx("div",{className:"col-12 col-md-6 col-lg-4 col-xl-3",style:{background:"#f9f7fb",padding:12,color:"#1a1a1a"},children:"Card"}),e.jsx("div",{className:"col-12 col-md-6 col-lg-4 col-xl-3",style:{background:"#f9f7fb",padding:12,color:"#1a1a1a"},children:"Card"})]})}),`
`,e.jsx(d.h3,{id:"bootstrap-style-helpers-familiarity",children:"Bootstrap-style helpers (familiarity)"}),`
`,e.jsx(d.p,{children:"We provide optional aliases inspired by Bootstrap for easier migration:"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:["Equal-width columns per row: ",e.jsx(d.code,{children:".row-cols-N"})," (N=1..6), with responsive variants ",e.jsx(d.code,{children:".row-cols-sm-N"}),", ",e.jsx(d.code,{children:".row-cols-md-N"}),", etc."]}),`
`,e.jsxs(d.li,{children:["Gap aliases: ",e.jsx(d.code,{children:".g-*"}),", ",e.jsx(d.code,{children:".gx-*"}),", ",e.jsx(d.code,{children:".gy-*"})," mirroring our ",e.jsx(d.code,{children:".gap-*"}),", ",e.jsx(d.code,{children:".gap-x-*"}),", ",e.jsx(d.code,{children:".gap-y-*"}),"."]}),`
`]}),`
`,e.jsx(d.p,{children:"Live preview"}),`
`,e.jsxs("div",{className:"container",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"row row-cols-3 g-3",children:Array.from({length:6}).map((s,n)=>e.jsx("div",{style:{background:"#f4fbff",padding:12,textAlign:"center",borderRadius:4,color:"#1a1a1a"},children:"Col"},n))}),e.jsx("div",{className:"row row-cols-1 row-cols-md-2 row-cols-lg-4 gx-4 gy-2",style:{marginTop:8},children:Array.from({length:8}).map((s,n)=>e.jsx("div",{style:{background:"#f7f7ff",padding:12,textAlign:"center",borderRadius:4,color:"#1a1a1a"},children:"Col"},n))})]}),`
`,e.jsxs(d.p,{children:["Note: Our canonical API is the ",e.jsx(d.code,{children:".col-*"}),", ",e.jsx(d.code,{children:".gap-*"}),", ",e.jsx(d.code,{children:".gap-x-*"}),", ",e.jsx(d.code,{children:".gap-y-*"})," set. The aliases are provided for familiarity and smoother adoption."]}),`
`,e.jsx(d.h2,{id:"utilities",children:"Utilities"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:["Columns: ",e.jsx(d.code,{children:".col-1"}),"..",e.jsx(d.code,{children:".col-12"}),", responsive: ",e.jsx(d.code,{children:".col-sm-6"}),", ",e.jsx(d.code,{children:".col-md-4"}),", ",e.jsx(d.code,{children:".col-lg-3"}),", ",e.jsx(d.code,{children:".col-xl-2"})]}),`
`,e.jsxs(d.li,{children:["Offsets: ",e.jsx(d.code,{children:".offset-1"}),"..",e.jsx(d.code,{children:".offset-11"}),", responsive equivalents"]}),`
`,e.jsxs(d.li,{children:["Gaps: ",e.jsx(d.code,{children:".gap-1"})," (4px), ",e.jsx(d.code,{children:".gap-2"})," (8px), ",e.jsx(d.code,{children:".gap-3"})," (12px), ",e.jsx(d.code,{children:".gap-4"})," (16px), ",e.jsx(d.code,{children:".gap-6"})," (24px), ",e.jsx(d.code,{children:".gap-8"})," (32px)"]}),`
`,e.jsxs(d.li,{children:["Directional gaps: ",e.jsx(d.code,{children:".gap-x-*"})," (column-gap) and ",e.jsx(d.code,{children:".gap-y-*"})," (row-gap)"]}),`
`,e.jsxs(d.li,{children:["Alignment: ",e.jsx(d.code,{children:".align-{start|center|end}"}),", ",e.jsx(d.code,{children:".justify-{start|center|end}"})," for items, and ",e.jsx(d.code,{children:".content-justify-*"})," / ",e.jsx(d.code,{children:".content-align-*"})," for grid tracks"]}),`
`,e.jsxs(d.li,{children:["Start position: ",e.jsx(d.code,{children:".start-N"})," to place an item at a specific grid track (with responsive variants)"]}),`
`,e.jsxs(d.li,{children:["Fluid container: ",e.jsx(d.code,{children:".container-fluid"})," uses full width with consistent horizontal padding"]}),`
`]}),`
`,e.jsx(d.h3,{id:"auto-fit-cards-grid",children:"Auto-fit cards grid"}),`
`,e.jsx(d.p,{children:"When you don’t know how many cards fit per row, use the auto grid:"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="row-auto" style="--mds-grid-col-min: 220px">
  <div class="card">A</div>
  <div class="card">B</div>
  <div class="card">C</div>
  <div class="card">D</div>
  <div class="card">E</div>
  <div class="card">F</div>
  <!-- more cards -->
  </div>
`})}),`
`,e.jsx(d.p,{children:"Live preview"}),`
`,e.jsx("div",{className:"row-auto",style:{"--mds-grid-col-min":"220px",border:"1px solid #e5e7eb",padding:8,borderRadius:6},children:Array.from({length:9}).map((s,n)=>e.jsxs("div",{className:"card",style:{background:"#f9f7fb",padding:12,textAlign:"center",borderRadius:4,color:"#1a1a1a"},children:["Card ",n+1]},n))}),`
`,e.jsx(d.h3,{id:"fluid-container",children:"Fluid container"}),`
`,e.jsxs(d.p,{children:["Use ",e.jsx(d.code,{children:".container-fluid"})," for full-width sections that still need consistent side padding."]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="container-fluid">
  <div class="row gap-x-4 gap-y-3">
    <div class="col-12 col-md-6" style="background:#eef6ff; padding:8px">Half</div>
    <div class="col-12 col-md-6" style="background:#eef6ff; padding:8px">Half</div>
  </div>
</div>
`})}),`
`,e.jsx(d.p,{children:"Live preview"}),`
`,e.jsx("div",{className:"container-fluid",style:{border:"1px dashed #cdd6e1",paddingBlock:8,borderRadius:6},children:e.jsxs("div",{className:"row gap-x-4 gap-y-3",children:[e.jsx("div",{className:"col-12 col-md-6",style:{background:"#eef6ff",padding:8},children:"Half"}),e.jsx("div",{className:"col-12 col-md-6",style:{background:"#eef6ff",padding:8},children:"Half"})]})}),`
`,e.jsx(d.h2,{id:"customize",children:"Customize"}),`
`,e.jsx(d.p,{children:"Override defaults before importing:"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-scss",children:`$base-unit: 0.25rem; // 4px at 16px root
$gutter: 0.5rem;     // 8px at 16px root
$columns: 12;
@use '../styles/grid' as *;
`})}),`
`,e.jsxs(d.p,{children:["Adjust ",e.jsx(d.code,{children:"$breakpoints"})," and ",e.jsx(d.code,{children:"$container-max"})," for different responsive behavior."]}),`
`,e.jsx(d.h3,{id:"runtime-tuning-via-css-variables",children:"Runtime tuning via CSS variables"}),`
`,e.jsx(d.p,{children:"You can tune grid gaps and min column width at runtime per section without recompiling Sass:"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="row" style="--mds-grid-gap: 12px">…</div>
<div class="row-auto" style="--mds-grid-col-min: 240px">…</div>
`})}),`
`,e.jsx(d.p,{children:"This is helpful for special layouts (e.g., tighter gaps on dense dashboards) while keeping defaults aligned to the design tokens."}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h2,{id:"phase-1-enhancements-advanced-grid-features",children:"Phase 1 Enhancements: Advanced Grid Features"}),`
`,e.jsx(d.h3,{id:"non-12-column-grids",children:"Non-12-Column Grids"}),`
`,e.jsxs(d.p,{children:["Use ",e.jsx(d.code,{children:".grid-cols-{N}"})," to create grids with any column count (not just 12):"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="grid-cols-5 gap-4">
  <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
</div>
`})}),`
`,e.jsxs("div",{className:"grid-cols-5 gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6},children:[e.jsx("div",{style:{background:"#e5edf4",padding:8,textAlign:"center"},children:"1"}),e.jsx("div",{style:{background:"#c7edff",padding:8,textAlign:"center"},children:"2"}),e.jsx("div",{style:{background:"#e5edf4",padding:8,textAlign:"center"},children:"3"}),e.jsx("div",{style:{background:"#c7edff",padding:8,textAlign:"center"},children:"4"}),e.jsx("div",{style:{background:"#e5edf4",padding:8,textAlign:"center"},children:"5"})]}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"7-Column Dashboard Example"}),":"]}),`
`,e.jsx("div",{className:"grid-cols-7 gap-3",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:Array.from({length:7}).map((s,n)=>e.jsxs("div",{style:{background:"#f0faff",padding:8,textAlign:"center",borderRadius:4},children:["Col ",n+1]},n))}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Responsive"}),": ",e.jsx(d.code,{children:".grid-cols-1 .grid-cols-md-3 .grid-cols-lg-5"})," stacks on mobile, 3 cols on tablet, 5 cols on desktop."]}),`
`,e.jsx(d.h3,{id:"row-spanning-dashboard-widgets",children:"Row Spanning (Dashboard Widgets)"}),`
`,e.jsxs(d.p,{children:["Use ",e.jsx(d.code,{children:".row-span-{N}"})," to span multiple rows:"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="grid-cols-3 grid-rows-3 gap-4">
  <div class="row-span-2">Tall widget</div>
  <div>Widget A</div>
  <div class="row-span-3">Full height</div>
  <div>Widget B</div>
  <div>Widget C</div>
  <div>Widget D</div>
</div>
`})}),`
`,e.jsxs("div",{className:"grid-cols-3 grid-rows-3 gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"row-span-2",style:{background:"#e5edf4",padding:12,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4},children:e.jsxs(d.p,{children:["Tall Widget",e.jsx("br",{}),"(2 rows)"]})}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"Widget A"}),e.jsx("div",{className:"row-span-3",style:{background:"#c7edff",padding:12,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4},children:e.jsxs(d.p,{children:["Full Height",e.jsx("br",{}),"(3 rows)"]})}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"Widget B"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"Widget C"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"Widget D"})]}),`
`,e.jsx(d.h3,{id:"extended-gap-scale",children:"Extended Gap Scale"}),`
`,e.jsxs(d.p,{children:["Larger gaps for spacious layouts (",e.jsx(d.code,{children:".gap-9"})," through ",e.jsx(d.code,{children:".gap-24"}),"):"]}),`
`,e.jsxs("div",{className:"grid-cols-3 gap-16",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{style:{background:"#e5edf4",padding:12,textAlign:"center",borderRadius:4},children:"64px gap"}),e.jsx("div",{style:{background:"#c7edff",padding:12,textAlign:"center",borderRadius:4},children:"(.gap-16)"}),e.jsx("div",{style:{background:"#e5edf4",padding:12,textAlign:"center",borderRadius:4},children:"Spacious!"})]}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Available"}),": ",e.jsx(d.code,{children:".gap-9"})," (36px), ",e.jsx(d.code,{children:".gap-10"})," (40px), ",e.jsx(d.code,{children:".gap-12"})," (48px), ",e.jsx(d.code,{children:".gap-16"})," (64px), ",e.jsx(d.code,{children:".gap-20"})," (80px), ",e.jsx(d.code,{children:".gap-24"})," (96px)"]}),`
`,e.jsx(d.h3,{id:"dense-grid-packing",children:"Dense Grid Packing"}),`
`,e.jsxs(d.p,{children:["Use ",e.jsx(d.code,{children:".grid-flow-dense"})," for masonry-like layouts that fill gaps:"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="grid-cols-4 gap-3 grid-flow-dense">
  <div class="col-span-2 row-span-2">Large</div>
  <div>1</div><div>2</div><div>3</div><div>4</div>
</div>
`})}),`
`,e.jsxs("div",{className:"grid-cols-4 gap-3 grid-flow-dense",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"col-span-2 row-span-2",style:{background:"#c7edff",padding:12,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,minHeight:120},children:e.jsx(d.p,{children:"Large Item"})}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"1"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"2"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"3"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"4"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"5"}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"6"})]}),`
`,e.jsx(d.h3,{id:"asymmetric-presets",children:"Asymmetric Presets"}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Sidebar Layout"}),": ",e.jsx(d.code,{children:".grid-cols-sidebar"})," (250px + 1fr)"]}),`
`,e.jsxs("div",{className:"grid-cols-sidebar gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsxs("div",{style:{background:"#e5edf4",padding:12,textAlign:"center",borderRadius:4},children:["Sidebar",e.jsx("br",{}),"250px"]}),e.jsx("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:"Main Content (flexible)"})]}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Two-Thirds Layout"}),": ",e.jsx(d.code,{children:".grid-cols-two-thirds"})," (2fr + 1fr)"]}),`
`,e.jsxs("div",{className:"grid-cols-two-thirds gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{style:{background:"#e5edf4",padding:12,textAlign:"center",borderRadius:4},children:"Main (2/3)"}),e.jsx("div",{style:{background:"#c7edff",padding:12,textAlign:"center",borderRadius:4},children:"Aside (1/3)"})]}),`
`,e.jsx(d.h3,{id:"auto-fit-presets",children:"Auto-Fit Presets"}),`
`,e.jsx(d.p,{children:"Pre-configured auto-fit grids with common minimum widths:"}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:e.jsx(d.code,{children:".grid-auto-fit-sm"})})," (200px min):"]}),`
`,e.jsx("div",{className:"grid-auto-fit-sm gap-3",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:Array.from({length:6}).map((s,n)=>e.jsxs("div",{style:{background:"#f0faff",padding:12,textAlign:"center",borderRadius:4},children:["Card ",n+1]},n))}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:e.jsx(d.code,{children:".grid-auto-fit-md"})})," (300px min):"]}),`
`,e.jsx("div",{className:"grid-auto-fit-md gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:Array.from({length:4}).map((s,n)=>e.jsxs("div",{style:{background:"#e5edf4",padding:16,textAlign:"center",borderRadius:4},children:["Product ",n+1]},n))}),`
`,e.jsx(d.h3,{id:"auto-sized-columns",children:"Auto-Sized Columns"}),`
`,e.jsxs(d.p,{children:["Use ",e.jsx(d.code,{children:".col-auto"})," for content-based sizing:"]}),`
`,e.jsxs("div",{className:"row gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"col-auto",style:{background:"#e5edf4",padding:12,borderRadius:4},children:e.jsx("button",{style:{padding:"8px 16px",background:"#1976d2",color:"white",border:"none",borderRadius:4,cursor:"pointer"},children:"Action"})}),e.jsx("div",{className:"col",style:{background:"#f0faff",padding:12,borderRadius:4},children:"Flexible content area (takes remaining space)"}),e.jsx("div",{className:"col-auto",style:{background:"#e5edf4",padding:12,borderRadius:4},children:e.jsx("button",{style:{padding:"8px 16px",background:"#d32f2f",color:"white",border:"none",borderRadius:4,cursor:"pointer"},children:"Delete"})})]}),`
`,e.jsx(d.h3,{id:"responsive-visibility",children:"Responsive Visibility"}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Hide at specific breakpoints"}),": ",e.jsx(d.code,{children:".hidden-xs"}),", ",e.jsx(d.code,{children:".hidden-md"}),", ",e.jsx(d.code,{children:".hidden-lg"})]}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Show only at breakpoints"}),": ",e.jsx(d.code,{children:".visible-md"})," (only visible on tablets)"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="hidden-xs">Hidden on mobile</div>
<div class="visible-lg">Only visible on large screens</div>
`})}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h2,{id:"complete-utility-reference",children:"Complete Utility Reference"}),`
`,e.jsx(d.h3,{id:"column-spanning",children:"Column Spanning"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.code,{children:".col-1"})," to ",e.jsx(d.code,{children:".col-12"})," • ",e.jsx(d.code,{children:".col-{bp}-{N}"})," • ",e.jsx(d.code,{children:".col-auto"})]}),`
`]}),`
`,e.jsx(d.h3,{id:"grid-template-columns",children:"Grid Template Columns"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.code,{children:".grid-cols-1"})," to ",e.jsx(d.code,{children:".grid-cols-12"})," • ",e.jsx(d.code,{children:".grid-cols-{bp}-{N}"})]}),`
`,e.jsxs(d.li,{children:["Presets: ",e.jsx(d.code,{children:".grid-auto-fit-{xs|sm|md|lg}"}),", ",e.jsx(d.code,{children:".grid-cols-sidebar"}),", ",e.jsx(d.code,{children:".grid-cols-two-thirds"})]}),`
`]}),`
`,e.jsx(d.h3,{id:"row-spanning",children:"Row Spanning"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.code,{children:".row-span-1"})," to ",e.jsx(d.code,{children:".row-span-6"})," • ",e.jsx(d.code,{children:".row-span-full"})," • ",e.jsx(d.code,{children:".row-span-{bp}-{N}"})]}),`
`]}),`
`,e.jsx(d.h3,{id:"grid-rows",children:"Grid Rows"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.code,{children:".grid-rows-1"})," to ",e.jsx(d.code,{children:".grid-rows-6"})," • ",e.jsx(d.code,{children:".grid-rows-{bp}-{N}"})]}),`
`]}),`
`,e.jsx(d.h3,{id:"gaps",children:"Gaps"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:["Standard: ",e.jsx(d.code,{children:".gap-0"}),", ",e.jsx(d.code,{children:".gap-1"})," (4px), ",e.jsx(d.code,{children:".gap-2"})," (8px), ",e.jsx(d.code,{children:".gap-4"})," (16px), ",e.jsx(d.code,{children:".gap-8"})," (32px)"]}),`
`,e.jsxs(d.li,{children:["Extended: ",e.jsx(d.code,{children:".gap-9"})," (36px), ",e.jsx(d.code,{children:".gap-12"})," (48px), ",e.jsx(d.code,{children:".gap-16"})," (64px), ",e.jsx(d.code,{children:".gap-20"})," (80px), ",e.jsx(d.code,{children:".gap-24"})," (96px)"]}),`
`,e.jsxs(d.li,{children:["Directional: ",e.jsx(d.code,{children:".gap-x-{N}"}),", ",e.jsx(d.code,{children:".gap-y-{N}"}),", ",e.jsx(d.code,{children:".gx-{N}"}),", ",e.jsx(d.code,{children:".gy-{N}"})]}),`
`,e.jsxs(d.li,{children:["Responsive: ",e.jsx(d.code,{children:".gap-{bp}-{N}"})]}),`
`]}),`
`,e.jsx(d.h3,{id:"alignment",children:"Alignment"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:["Items: ",e.jsx(d.code,{children:".align-{start|center|end}"}),", ",e.jsx(d.code,{children:".justify-{start|center|end}"})]}),`
`,e.jsxs(d.li,{children:["Content: ",e.jsx(d.code,{children:".content-align-{start|center|end|between|around|evenly}"})]}),`
`,e.jsxs(d.li,{children:["Place: ",e.jsx(d.code,{children:".place-items-{start|center|end|stretch}"}),", ",e.jsx(d.code,{children:".place-content-{start|center|end|between}"})]}),`
`]}),`
`,e.jsx(d.h3,{id:"grid-flow",children:"Grid Flow"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.code,{children:".grid-flow-row"}),", ",e.jsx(d.code,{children:".grid-flow-col"}),", ",e.jsx(d.code,{children:".grid-flow-dense"})]}),`
`]}),`
`,e.jsx(d.h3,{id:"visibility",children:"Visibility"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.code,{children:".hidden-{xs|sm|md|lg|xl}"})," • ",e.jsx(d.code,{children:".visible-{xs|sm|md|lg|xl}"})]}),`
`]}),`
`,e.jsx(d.h3,{id:"offsets",children:"Offsets"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.code,{children:".offset-1"})," to ",e.jsx(d.code,{children:".offset-11"})," • ",e.jsx(d.code,{children:".offset-{bp}-{N}"})]}),`
`]}),`
`,e.jsx(d.h3,{id:"ordering-bootstrap-inspired",children:"Ordering (Bootstrap-inspired)"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.code,{children:".order-0"})," to ",e.jsx(d.code,{children:".order-12"})," • ",e.jsx(d.code,{children:".order-first"})," • ",e.jsx(d.code,{children:".order-last"})]}),`
`,e.jsxs(d.li,{children:["Responsive: ",e.jsx(d.code,{children:".order-{bp}-{N}"}),", ",e.jsx(d.code,{children:".order-{bp}-first"}),", ",e.jsx(d.code,{children:".order-{bp}-last"})]}),`
`]}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h2,{id:"bootstrap-inspired-patterns",children:"Bootstrap-Inspired Patterns"}),`
`,e.jsx(d.h3,{id:"equal-width-columns-auto-layout",children:"Equal-Width Columns (Auto-Layout)"}),`
`,e.jsxs(d.p,{children:["Use ",e.jsx(d.code,{children:".col"})," (no number) for equal-width columns:"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="row gap-4">
  <div class="col">1 of 2</div>
  <div class="col">2 of 2</div>
</div>

<div class="row gap-4">
  <div class="col">1 of 3</div>
  <div class="col">2 of 3</div>
  <div class="col">3 of 3</div>
</div>
`})}),`
`,e.jsxs("div",{className:"row gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"col",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:"1 of 2"}),e.jsx("div",{className:"col",style:{background:"#c7edff",padding:12,textAlign:"center"},children:"2 of 2"})]}),`
`,e.jsxs("div",{className:"row gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"col",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:"1 of 3"}),e.jsx("div",{className:"col",style:{background:"#f0faff",padding:12,textAlign:"center"},children:"2 of 3"}),e.jsx("div",{className:"col",style:{background:"#c7edff",padding:12,textAlign:"center"},children:"3 of 3"})]}),`
`,e.jsx(d.h3,{id:"column-ordering",children:"Column Ordering"}),`
`,e.jsx(d.p,{children:"Reorder columns visually without changing HTML:"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="row gap-4">
  <div class="col order-3">First in DOM (order: 3)</div>
  <div class="col order-1">Second in DOM (order: 1)</div>
  <div class="col order-2">Third in DOM (order: 2)</div>
</div>
`})}),`
`,e.jsxs("div",{className:"row gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"col order-3",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:e.jsxs(d.p,{children:["First in DOM",e.jsx("br",{}),e.jsx("small",{children:"(order: 3)"})]})}),e.jsx("div",{className:"col order-1",style:{background:"#c7edff",padding:12,textAlign:"center"},children:e.jsxs(d.p,{children:["Second in DOM",e.jsx("br",{}),e.jsx("small",{children:"(order: 1) ← Shows first"})]})}),e.jsx("div",{className:"col order-2",style:{background:"#f0faff",padding:12,textAlign:"center"},children:e.jsxs(d.p,{children:["Third in DOM",e.jsx("br",{}),e.jsx("small",{children:"(order: 2)"})]})})]}),`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Responsive ordering"})," (mobile-first):"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="row gap-4">
  <div class="col-12 col-md order-md-2">Main content (first on mobile, second on desktop)</div>
  <div class="col-12 col-md order-md-1">Sidebar (second on mobile, first on desktop)</div>
</div>
`})}),`
`,e.jsxs("div",{className:"row gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"col-12 col-md order-md-2",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:e.jsxs(d.p,{children:["Main content",e.jsx("br",{}),e.jsx("small",{children:"(first on mobile, second on desktop)"})]})}),e.jsx("div",{className:"col-12 col-md order-md-1",style:{background:"#c7edff",padding:12,textAlign:"center"},children:e.jsxs(d.p,{children:["Sidebar",e.jsx("br",{}),e.jsx("small",{children:"(second on mobile, first on desktop)"})]})})]}),`
`,e.jsx(d.h3,{id:"mix-fixed-and-auto-columns",children:"Mix Fixed and Auto Columns"}),`
`,e.jsx(d.p,{children:"Set one column width, others auto-fill:"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="row gap-4">
  <div class="col">Auto-width</div>
  <div class="col-6">Fixed 6 columns</div>
  <div class="col">Auto-width</div>
</div>
`})}),`
`,e.jsxs("div",{className:"row gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"col",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:"Auto"}),e.jsx("div",{className:"col-6",style:{background:"#c7edff",padding:12,textAlign:"center"},children:"Fixed 50%"}),e.jsx("div",{className:"col",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:"Auto"})]}),`
`,e.jsx(d.h3,{id:"responsive-equal-width",children:"Responsive Equal-Width"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="row gap-4">
  <div class="col-12 col-md">Stacked mobile, equal desktop</div>
  <div class="col-12 col-md">Stacked mobile, equal desktop</div>
  <div class="col-12 col-md">Stacked mobile, equal desktop</div>
</div>
`})}),`
`,e.jsxs("div",{className:"row gap-4",style:{border:"1px solid #e5e7eb",padding:8,borderRadius:6,marginTop:12},children:[e.jsx("div",{className:"col-12 col-md",style:{background:"#e5edf4",padding:12,textAlign:"center"},children:"Stacked → Equal"}),e.jsx("div",{className:"col-12 col-md",style:{background:"#f0faff",padding:12,textAlign:"center"},children:"Stacked → Equal"}),e.jsx("div",{className:"col-12 col-md",style:{background:"#c7edff",padding:12,textAlign:"center"},children:"Stacked → Equal"})]}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h2,{id:"complete-utility-reference-1",children:"Complete Utility Reference"}),`
`,e.jsxs("div",{style:{color:"#1a1a1a",background:"transparent"},children:[e.jsx(d.h3,{id:"column-classes",children:"Column Classes"}),e.jsxs(d.p,{children:[`| Class | Description | Responsive Variants |
|-------|-------------|---------------------|
| `,e.jsx(d.code,{children:".col-{1-12}"})," | Span N columns out of 12 | ",e.jsx(d.code,{children:".col-{bp}-{1-12}"}),` |
| `,e.jsx(d.code,{children:".col"})," | Equal-width auto column (Bootstrap-style) | ",e.jsx(d.code,{children:".col-{bp}"}),` |
| `,e.jsx(d.code,{children:".col-auto"})," | Size to content | ",e.jsx(d.code,{children:".col-{bp}-auto"})," |"]}),e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Example:"})," ",e.jsx(d.code,{children:".col-6 .col-md-4 .col-lg-3"})," → 50% mobile → 33% tablet → 25% desktop"]}),e.jsx(d.h3,{id:"grid-layout-classes",children:"Grid Layout Classes"}),e.jsxs(d.p,{children:[`| Class | Description | Responsive Variants |
|-------|-------------|---------------------|
| `,e.jsx(d.code,{children:".grid-cols-{1-12}"})," | Create N-column grid | ",e.jsx(d.code,{children:".grid-cols-{bp}-{1-12}"}),` |
| `,e.jsx(d.code,{children:".grid-rows-{1-6}"})," | Create N-row grid | ",e.jsx(d.code,{children:".grid-rows-{bp}-{1-6}"}),` |
| `,e.jsx(d.code,{children:".grid-auto-fit-{xs\\|sm\\|md\\|lg}"})," | Auto-fit columns at min size (150/200/300/400px) | ",e.jsx(d.code,{children:".grid-auto-fit-{bp}-{size}"}),` |
| `,e.jsx(d.code,{children:".grid-cols-sidebar"}),` | Fixed 250px + flexible column | — |
| `,e.jsx(d.code,{children:".grid-cols-two-thirds"})," | 2fr + 1fr asymmetric layout | — |"]}),e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Example:"})," ",e.jsx(d.code,{children:".grid-cols-2 .grid-cols-md-4"})," → 2 columns mobile → 4 columns tablet"]}),e.jsx(d.h3,{id:"row--column-spanning",children:"Row & Column Spanning"}),e.jsxs(d.p,{children:[`| Class | Description | Responsive Variants |
|-------|-------------|---------------------|
| `,e.jsx(d.code,{children:".row-span-{1-6}"})," | Span N rows | ",e.jsx(d.code,{children:".row-span-{bp}-{1-6}"}),` |
| `,e.jsx(d.code,{children:".row-span-full"})," | Span all rows | ",e.jsx(d.code,{children:".row-span-{bp}-full"}),` |
| `,e.jsx(d.code,{children:".col-span-{1-12}"})," | Span N columns | ",e.jsx(d.code,{children:".col-span-{bp}-{1-12}"}),` |
| `,e.jsx(d.code,{children:".col-span-full"})," | Span all columns | ",e.jsx(d.code,{children:".col-span-{bp}-full"})," |"]}),e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Example:"})," ",e.jsx(d.code,{children:".row-span-2"})," makes a widget span 2 rows in dashboard layouts"]}),e.jsx(d.h3,{id:"gap--spacing",children:"Gap & Spacing"}),e.jsxs(d.p,{children:[`| Class | Description | Responsive Variants |
|-------|-------------|---------------------|
| `,e.jsx(d.code,{children:".gap-{0-8}"})," | Gap from 0-32px (4px scale) | ",e.jsx(d.code,{children:".gap-{bp}-{0-8}"}),` |
| `,e.jsx(d.code,{children:".gap-{9-24}"})," | Extended gaps 36-96px | ",e.jsx(d.code,{children:".gap-{bp}-{9-24}"}),` |
| `,e.jsx(d.code,{children:".gap-x-{0-24}"})," | Horizontal gap only | ",e.jsx(d.code,{children:".gap-x-{bp}-{0-24}"}),` |
| `,e.jsx(d.code,{children:".gap-y-{0-24}"})," | Vertical gap only | ",e.jsx(d.code,{children:".gap-y-{bp}-{0-24}"}),` |
| `,e.jsx(d.code,{children:".no-gutters"})," | Remove all gaps | — |"]}),e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Gap Scale:"})," 0, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 56px, 64px, 72px, 80px, 88px, 96px"]}),e.jsx(d.h3,{id:"ordering",children:"Ordering"}),e.jsxs(d.p,{children:[`| Class | Description | Responsive Variants |
|-------|-------------|---------------------|
| `,e.jsx(d.code,{children:".order-{0-12}"})," | Set explicit order | ",e.jsx(d.code,{children:".order-{bp}-{0-12}"}),` |
| `,e.jsx(d.code,{children:".order-first"})," | Move to start (-1) | ",e.jsx(d.code,{children:".order-{bp}-first"}),` |
| `,e.jsx(d.code,{children:".order-last"})," | Move to end (13) | ",e.jsx(d.code,{children:".order-{bp}-last"})," |"]}),e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Example:"})," ",e.jsx(d.code,{children:".order-2 .order-md-1"})," → Order 2 on mobile → Order 1 on tablet"]}),e.jsx(d.h3,{id:"alignment--justification",children:"Alignment & Justification"}),e.jsxs(d.p,{children:[`| Class | Description | Responsive Variants |
|-------|-------------|---------------------|
| `,e.jsx(d.code,{children:".items-start\\|center\\|end\\|baseline\\|stretch"})," | Align items (cross-axis) | ",e.jsx(d.code,{children:".items-{bp}-{value}"}),` |
| `,e.jsx(d.code,{children:".justify-start\\|center\\|end\\|between\\|around\\|evenly"})," | Justify content (main-axis) | ",e.jsx(d.code,{children:".justify-{bp}-{value}"}),` |
| `,e.jsx(d.code,{children:".place-items-{start\\|center\\|end\\|stretch}"})," | Combined item placement | ",e.jsx(d.code,{children:".place-items-{bp}-{value}"}),` |
| `,e.jsx(d.code,{children:".place-content-{start\\|center\\|end\\|between\\|around\\|evenly}"})," | Combined content placement | ",e.jsx(d.code,{children:".place-content-{bp}-{value}"})," |"]}),e.jsx(d.h3,{id:"grid-flow-1",children:"Grid Flow"}),e.jsxs(d.p,{children:[`| Class | Description |
|-------|-------------|
| `,e.jsx(d.code,{children:".grid-flow-row"}),` | Fill row by row (default) |
| `,e.jsx(d.code,{children:".grid-flow-col"}),` | Fill column by column |
| `,e.jsx(d.code,{children:".grid-flow-dense"}),` | Auto-fill gaps (masonry) |
| `,e.jsx(d.code,{children:".grid-flow-row-dense"})," | Row fill with gap packing |"]}),e.jsx(d.h3,{id:"visibility-1",children:"Visibility"}),e.jsxs(d.p,{children:[`| Class | Description |
|-------|-------------|
| `,e.jsx(d.code,{children:".hidden-{bp}"}),` | Hide at breakpoint and up |
| `,e.jsx(d.code,{children:".visible-{bp}"})," | Show at breakpoint and up |"]}),e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Example:"})," ",e.jsx(d.code,{children:".hidden-md"})," hides element on tablet and desktop"]}),e.jsx(d.h3,{id:"breakpoints",children:"Breakpoints"}),e.jsxs(d.p,{children:[`| Name | Min Width | Usage |
|------|-----------|-------|
| `,e.jsx(d.code,{children:"xs"}),` | 0px | Default (mobile-first) |
| `,e.jsx(d.code,{children:"sm"})," | 600px | ",e.jsx(d.code,{children:".col-sm-6"}),` |
| `,e.jsx(d.code,{children:"md"})," | 900px | ",e.jsx(d.code,{children:".col-md-4"}),` |
| `,e.jsx(d.code,{children:"lg"})," | 1200px | ",e.jsx(d.code,{children:".col-lg-3"}),` |
| `,e.jsx(d.code,{children:"xl"})," | 1536px | ",e.jsx(d.code,{children:".col-xl-2"})," |"]})]}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(d.h3,{id:"scss-variables",children:"SCSS Variables"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-scss",children:`// Override in your styles
$grid-columns: 12;        // Total columns
$gutter: 8px;             // Default gap
$grid-breakpoints: (
  xs: 0,
  sm: 600px,
  md: 900px,
  lg: 1200px,
  xl: 1536px
);
`})}),`
`,e.jsx(d.h3,{id:"css-custom-properties",children:"CSS Custom Properties"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-css",children:`/* Runtime customization */
.custom-grid {
  --mds-grid-gap: 24px;  /* Custom gap per instance */
}
`})}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.h2,{id:"tips--best-practices",children:"Tips & Best Practices"}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"Mobile-First Approach"})}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:["Start with mobile layout (",e.jsx(d.code,{children:".col-12"}),"), then add breakpoints"]}),`
`,e.jsxs(d.li,{children:["Example: ",e.jsx(d.code,{children:".col-12 .col-md-6 .col-lg-4"})," → Stack → 2 cols → 3 cols"]}),`
`]}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"Performance"})}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:["Use ",e.jsx(d.code,{children:".grid-auto-fit-md"})," for responsive cards instead of multiple breakpoints"]}),`
`,e.jsxs(d.li,{children:["Prefer ",e.jsx(d.code,{children:".col"})," for equal-width layouts (simpler than ",e.jsx(d.code,{children:".col-{1-12}"}),")"]}),`
`]}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"Accessibility"})}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:["Use ",e.jsx(d.code,{children:".order-*"})," to reorder visually, but keep DOM order logical for screen readers"]}),`
`,e.jsx(d.li,{children:"Ensure sufficient color contrast in custom backgrounds"}),`
`]}),`
`,e.jsx(d.p,{children:e.jsx(d.strong,{children:"Debugging"})}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:["Add borders temporarily: ",e.jsx(d.code,{children:".row { border: 2px solid red; } .col { border: 1px solid blue; }"})]}),`
`,e.jsx(d.li,{children:"Use browser DevTools Grid Inspector to visualize layout"}),`
`]}),`
`,e.jsx(d.hr,{}),`
`,e.jsx(d.p,{children:"Need more examples? Check out:"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Test Page:"})," ",e.jsx(d.a,{href:"/grid",children:"/grid"})," — Interactive showcase of all features"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Quick Reference:"})," ",e.jsx(d.code,{children:"GRID_REFERENCE.md"})," in repo"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Implementation Details:"})," ",e.jsx(d.code,{children:"GRID_ENHANCEMENTS.md"})]}),`
`]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{children:`</div>
`})})]})}function R(i={}){const{wrapper:d}={...u(),...i.components};return d?e.jsx(d,{...i,children:e.jsx(m,{...i})}):m(i)}export{R as default,A as meta};
