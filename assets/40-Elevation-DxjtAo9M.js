import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{f as n,s as r}from"./blocks-GA0YWl98.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a,r as o}from"./lib-D94nruS1.js";import{n as s,t as c}from"./tokens-msD__O6U.js";import{n as l,t as u}from"./shadows-Da8vIJGS.js";var d,f;function p(){return(p=e((()=>{t(),u(),d=i(),f=()=>(0,d.jsx)(`div`,{style:{display:`grid`,gap:24,gridTemplateColumns:`repeat(auto-fit,minmax(220px,1fr))`},children:l.map(e=>(0,d.jsxs)(`div`,{style:{fontFamily:`system-ui, sans-serif`},children:[(0,d.jsxs)(`div`,{style:{height:100,borderRadius:12,background:`linear-gradient(#fff,#fafafa)`,boxShadow:e.value,display:`flex`,alignItems:`center`,justifyContent:`center`,fontWeight:600,fontSize:14,color:`#002c77`},children:[`L`,e.level]}),(0,d.jsxs)(`div`,{style:{marginTop:8},children:[(0,d.jsxs)(`div`,{style:{fontSize:12,fontWeight:600},children:[`Level `,e.level]}),(0,d.jsx)(`div`,{style:{fontSize:11,opacity:.8,lineHeight:1.3},children:e.usage}),(0,d.jsx)(`code`,{style:{display:`block`,fontSize:10,marginTop:4},children:e.value})]})]},e.level))}),f.__docgenInfo={description:``,methods:[],displayName:`ElevationGrid`}})))()}var m,h,g;function _(){return(_=e((()=>{t(),u(),c(),m=i(),h=()=>(0,m.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,fontFamily:`system-ui, sans-serif`},children:l.map(e=>(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:6},children:[(0,m.jsxs)(`div`,{style:{fontSize:12,fontWeight:600},children:[`Level `,e.level]}),(0,m.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:12},children:[(0,m.jsx)(g,{mode:`light`,label:`Light`,shadow:e.value,bg:s.neutral150,textColor:s.blue1000}),(0,m.jsx)(g,{mode:`dark`,label:`Dark`,shadow:e.value,bg:s.neutral1400,textColor:s.white})]})]},e.level))}),g=({label:e,shadow:t,bg:n,textColor:r})=>(0,m.jsxs)(`div`,{style:{background:n,padding:20,borderRadius:12,minHeight:120,display:`flex`,flexDirection:`column`,gap:8,border:`1px solid rgba(0,0,0,0.05)`},children:[(0,m.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:r},children:e}),(0,m.jsx)(`div`,{style:{background:e===`Dark`?s.neutral1400:`#ffffff`,borderRadius:10,height:60,display:`flex`,alignItems:`center`,justifyContent:`center`,boxShadow:t,color:r,fontSize:12,fontWeight:600},children:t===`none`?`none`:t.split(` rgba`)[0]+` …`}),(0,m.jsx)(`code`,{style:{fontSize:10,opacity:.7,color:r},children:t})]}),h.__docgenInfo={description:`Renders each elevation level side-by-side in light and dark contexts so that
designers/engineers can validate shadow legibility and layering in both modes.
Currently the shadow values are identical; if a dark theme variant set emerges
this component can accept an override prop.`,methods:[],displayName:`ElevationCompare`}})))()}function v(e){let t={em:`em`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,ul:`ul`,...o(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(r,{title:`Foundations/Elevation`}),`
`,(0,b.jsx)(t.h1,{id:`elevation`,children:`Elevation`}),`
`,(0,b.jsx)(t.p,{children:`Elevation communicates layering, interactivity and focus. We keep a compact shadow scale to reduce visual noise.`}),`
`,(0,b.jsx)(`div`,{style:{background:`#fff3e0`,padding:`16px 20px`,borderRadius:`8px`,marginBottom:`24px`,border:`1px solid #ffcc80`},children:(0,b.jsxs)(t.p,{children:[(0,b.jsx)(`strong`,{children:`Is this Tailwind?`}),` No — the scale below is MDS's own (`,(0,b.jsx)(`code`,{children:`src/shadows.ts`}),`, 6 levels, each with a
documented semantic usage), not Tailwind's default shadow scale (`,(0,b.jsx)(`code`,{children:`shadow-sm`}),`, `,(0,b.jsx)(`code`,{children:`shadow-md`}),`,
`,(0,b.jsx)(`code`,{children:`shadow-lg`}),`, `,(0,b.jsx)(`code`,{children:`shadow-xl`}),`, `,(0,b.jsx)(`code`,{children:`shadow-2xl`}),`). Unlike grid, this hasn't
been reconciled yet: several `,(0,b.jsx)(`code`,{children:`src/components/ui`}),` components (button, chart, context-menu, dialog,
dropdown-menu, input, input-group, menubar, message-scroller, questionnaire, select, sheet, stat-card, textarea, toast)
currently reach for Tailwind's bare shadow utilities directly instead of this scale — a real, undocumented
split worth reconciling later, not addressed on this page yet.`]})}),`
`,(0,b.jsx)(t.h2,{id:`scale`,children:`Scale`}),`
`,(0,b.jsx)(f,{}),`
`,(0,b.jsx)(t.h2,{id:`light-vs-dark-comparison`,children:`Light vs Dark Comparison`}),`
`,(0,b.jsx)(t.p,{children:`Visual parity of elevation levels across themes. Future iterations may tune shadow opacity per theme to reduce glow in dark mode.`}),`
`,(0,b.jsx)(h,{}),`
`,(0,b.jsx)(t.h2,{id:`guidelines`,children:`Guidelines`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsx)(t.li,{children:`Prefer the lowest possible level that provides adequate separation.`}),`
`,(0,b.jsx)(t.li,{children:`Use level 0 for nested containers and cards on tinted backgrounds.`}),`
`,(0,b.jsx)(t.li,{children:`Level 1–2 for standard cards and interactive surfaces.`}),`
`,(0,b.jsx)(t.li,{children:`Level 3 for transient layers like menus, popovers.`}),`
`,(0,b.jsx)(t.li,{children:`Level 4 for dialogs and blocking UI.`}),`
`,(0,b.jsx)(t.li,{children:`Level 5 reserved for critical overlays (rare).`}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`accessibility--theming`,children:`Accessibility & Theming`}),`
`,(0,b.jsx)(t.p,{children:`Always ensure sufficient contrast between elevated surface and the background. In dark mode, reduce shadow spread intensity; consider using subtle border + low alpha shadow combination.`}),`
`,(0,b.jsx)(t.hr,{}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.em,{children:`Future: add dark theme preview & motion guidance for elevation transitions.`}),`
`,(0,b.jsx)(t.em,{children:`Done: light/dark comparison added. Motion guidance still pending.`})]})]})}function y(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;function x(){return(x=e((()=>{b=i(),a(),n(),p(),_()})))()}x();export{y as default};