import{Z as e,am as s,ar as r,c as u}from"./iframe-CPBTUrEW.js";import{s as o}from"./shadows-BSmH5Lxe.js";import"./preload-helper-PPVm8Dsz.js";const d=()=>e.jsx("div",{style:{display:"grid",gap:24,gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))"},children:o.map(i=>e.jsxs("div",{style:{fontFamily:"system-ui, sans-serif"},children:[e.jsxs("div",{style:{height:100,borderRadius:12,background:"linear-gradient(#fff,#fafafa)",boxShadow:i.value,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:600,fontSize:14,color:"#002c77"},children:["L",i.level]}),e.jsxs("div",{style:{marginTop:8},children:[e.jsxs("div",{style:{fontSize:12,fontWeight:600},children:["Level ",i.level]}),e.jsx("div",{style:{fontSize:11,opacity:.8,lineHeight:1.3},children:i.usage}),e.jsx("code",{style:{display:"block",fontSize:10,marginTop:4},children:i.value})]})]},i.level))});d.__docgenInfo={description:"",methods:[],displayName:"ElevationGrid"};const c=()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16,fontFamily:"system-ui, sans-serif"},children:o.map(i=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[e.jsxs("div",{style:{fontSize:12,fontWeight:600},children:["Level ",i.level]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsx(a,{mode:"light",label:"Light",shadow:i.value,bg:s.neutral50,textColor:s.blue1000}),e.jsx(a,{mode:"dark",label:"Dark",shadow:i.value,bg:s.neutral950,textColor:s.white})]})]},i.level))}),a=({label:i,shadow:n,bg:h,textColor:t})=>e.jsxs("div",{style:{background:h,padding:20,borderRadius:12,minHeight:120,display:"flex",flexDirection:"column",gap:8,border:"1px solid rgba(0,0,0,0.05)"},children:[e.jsx("div",{style:{fontSize:11,fontWeight:600,color:t},children:i}),e.jsx("div",{style:{background:i==="Dark"?s.neutral950:"#ffffff",borderRadius:10,height:60,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:n,color:t,fontSize:12,fontWeight:600},children:n==="none"?"none":n.split(" rgba")[0]+" …"}),e.jsx("code",{style:{fontSize:10,opacity:.7,color:t},children:n})]});c.__docgenInfo={description:`Renders each elevation level side-by-side in light and dark contexts so that
designers/engineers can validate shadow legibility and layering in both modes.
Currently the shadow values are identical; if a dark theme variant set emerges
this component can accept an override prop.`,methods:[],displayName:"ElevationCompare"};function l(i){const n={em:"em",h1:"h1",h2:"h2",hr:"hr",li:"li",p:"p",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(u,{title:"Foundations/Elevation"}),`
`,e.jsx(n.h1,{id:"elevation",children:"Elevation"}),`
`,e.jsx(n.p,{children:"Elevation communicates layering, interactivity and focus. We keep a compact shadow scale to reduce visual noise."}),`
`,e.jsx("div",{style:{background:"#fff3e0",padding:"16px 20px",borderRadius:"8px",marginBottom:"24px",border:"1px solid #ffcc80"},children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Is this Tailwind?"})," No — the scale below is MDS's own (",e.jsx("code",{children:"src/shadows.ts"}),`, 6 levels, each with a
documented semantic usage), not Tailwind's default shadow scale (`,e.jsx("code",{children:"shadow-sm"}),", ",e.jsx("code",{children:"shadow-md"}),`,
`,e.jsx("code",{children:"shadow-lg"}),", ",e.jsx("code",{children:"shadow-xl"}),", ",e.jsx("code",{children:"shadow-2xl"}),`). Unlike grid, this hasn't
been reconciled yet: several `,e.jsx("code",{children:"src/components/ui"}),` components (button, chart, context-menu, dialog,
dropdown-menu, input, input-group, menubar, message-scroller, questionnaire, select, sheet, stat-card, textarea, toast)
currently reach for Tailwind's bare shadow utilities directly instead of this scale — a real, undocumented
split worth reconciling later, not addressed on this page yet.`]})}),`
`,e.jsx(n.h2,{id:"scale",children:"Scale"}),`
`,e.jsx(d,{}),`
`,e.jsx(n.h2,{id:"light-vs-dark-comparison",children:"Light vs Dark Comparison"}),`
`,e.jsx(n.p,{children:"Visual parity of elevation levels across themes. Future iterations may tune shadow opacity per theme to reduce glow in dark mode."}),`
`,e.jsx(c,{}),`
`,e.jsx(n.h2,{id:"guidelines",children:"Guidelines"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Prefer the lowest possible level that provides adequate separation."}),`
`,e.jsx(n.li,{children:"Use level 0 for nested containers and cards on tinted backgrounds."}),`
`,e.jsx(n.li,{children:"Level 1–2 for standard cards and interactive surfaces."}),`
`,e.jsx(n.li,{children:"Level 3 for transient layers like menus, popovers."}),`
`,e.jsx(n.li,{children:"Level 4 for dialogs and blocking UI."}),`
`,e.jsx(n.li,{children:"Level 5 reserved for critical overlays (rare)."}),`
`]}),`
`,e.jsx(n.h2,{id:"accessibility--theming",children:"Accessibility & Theming"}),`
`,e.jsx(n.p,{children:"Always ensure sufficient contrast between elevated surface and the background. In dark mode, reduce shadow spread intensity; consider using subtle border + low alpha shadow combination."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Future: add dark theme preview & motion guidance for elevation transitions."}),`
`,e.jsx(n.em,{children:"Done: light/dark comparison added. Motion guidance still pending."})]})]})}function f(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}export{f as default};
