import{j as e,p as o}from"./iframe-B7__wHsY.js";import{useMDXComponents as h}from"./index-B5YtEhlm.js";import"./preload-helper-PPVm8Dsz.js";const p=["h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","caption","overline","button"],y={h1:"Heading One",h2:"Heading Two",h3:"Heading Three",h4:"Heading Four",h5:"Heading Five",h6:"Heading Six",subtitle1:"Subtitle One",subtitle2:"Subtitle Two",body1:"The quick brown fox jumps over the lazy dog.",body2:"The quick brown fox jumps over the lazy dog.",caption:"Caption text",overline:"OVERLINE",button:"Button Text"},c=()=>e.jsxs("table",{style:{borderCollapse:"collapse",width:"100%",fontFamily:"system-ui, sans-serif"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:t,children:"Token"}),e.jsx("th",{style:t,children:"Preview"}),e.jsx("th",{style:t,children:"Font size"}),e.jsx("th",{style:t,children:"Line height"}),e.jsx("th",{style:t,children:"Tracking"}),e.jsx("th",{style:t,children:"Family"}),e.jsx("th",{style:t,children:"Weight"})]})}),e.jsx("tbody",{children:p.map(s=>{const n=o.typography[s];if(!n)return null;const i=n.fontFamily||o.typography.fontFamily;return e.jsxs("tr",{children:[e.jsx("td",{style:r,children:e.jsx("code",{children:s})}),e.jsx("td",{style:r,children:e.jsx("div",{style:n,children:y[s]||String(s)})}),e.jsx("td",{style:r,children:e.jsx("code",{children:n.fontSize||"—"})}),e.jsx("td",{style:r,children:e.jsx("code",{children:n.lineHeight||"—"})}),e.jsx("td",{style:r,children:e.jsx("code",{children:n.letterSpacing||"—"})}),e.jsx("td",{style:r,children:e.jsx("code",{children:i})}),e.jsx("td",{style:r,children:e.jsx("code",{children:n.fontWeight||400})})]},s)})})]}),t={textAlign:"left",fontSize:12,padding:"6px 8px",borderBottom:"1px solid #e0e0e0"},r={fontSize:12,padding:"6px 8px",borderBottom:"1px solid #f0f0f0"};c.__docgenInfo={description:"",methods:[],displayName:"TypographyTable"};const l={flex:1,padding:"12px 14px",borderRadius:10,display:"flex",flexDirection:"column",gap:8,fontFamily:"system-ui, sans-serif",fontSize:12,lineHeight:1.4},x=({do:s,dont:n})=>e.jsxs("div",{style:{display:"flex",gap:20,alignItems:"stretch",flexWrap:"wrap"},children:[e.jsxs("div",{style:{...l,background:"#f2f9f5",border:"1px solid #b6e4c7"},children:[e.jsx("div",{style:{fontSize:12,fontWeight:700,color:"#14723b"},children:"Do"}),s.map((i,d)=>e.jsxs("div",{style:{background:"#ffffff",padding:"8px 10px",borderRadius:6,border:"1px solid #dbeadd"},children:[i.title&&e.jsx("div",{style:{fontWeight:600,marginBottom:4},children:i.title}),e.jsx("div",{children:i.body})]},d))]}),e.jsxs("div",{style:{...l,background:"#fdf4f4",border:"1px solid #f2c5c3"},children:[e.jsx("div",{style:{fontSize:12,fontWeight:700,color:"#b72e2b"},children:"Don't"}),n.map((i,d)=>e.jsxs("div",{style:{background:"#ffffff",padding:"8px 10px",borderRadius:6,border:"1px solid #f3d7d6"},children:[i.title&&e.jsx("div",{style:{fontWeight:600,marginBottom:4},children:i.title}),e.jsx("div",{children:i.body})]},d))]})]});x.__docgenInfo={description:"",methods:[],displayName:"DoDont",props:{do:{required:!0,tsType:{name:"Array",elements:[{name:"DoDontItem"}],raw:"DoDontItem[]"},description:""},dont:{required:!0,tsType:{name:"Array",elements:[{name:"DoDontItem"}],raw:"DoDontItem[]"},description:""}}};const u={title:"Foundations/Typography"};function a(s){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...h(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"typography",children:"Typography"}),`
`,e.jsxs(n.p,{children:["System typography leverages ",e.jsx(n.code,{children:"Noto Sans"})," for body text and ",e.jsx(n.code,{children:"MMC Display"})," for headings & key UI labels."]}),`
`,e.jsx(n.h2,{id:"scale-preview",children:"Scale (Preview)"}),`
`,e.jsx(c,{}),`
`,e.jsx(n.h2,{id:"guidance",children:"Guidance"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use semantic heading levels (",e.jsx(n.code,{children:"<h1>"}),"…",e.jsx(n.code,{children:"<h6>"}),") according to document hierarchy."]}),`
`,e.jsx(n.li,{children:"Keep display (MMC Display) usage purposeful: section titles, dashboards, key metrics."}),`
`,e.jsx(n.li,{children:"Avoid inline font overrides—add a variant to the theme if reused."}),`
`,e.jsx(n.li,{children:"Ensure accessible contrast and sufficient size for readability."}),`
`]}),`
`,e.jsx(n.h3,{id:"when-to-use-which-variant",children:"When to use which variant"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"h1–h3: Page and major section headings. Keep above the fold concise; avoid stacking multiple large headings."}),`
`,e.jsx(n.li,{children:"h4–h6: Subsections and card titles within a page."}),`
`,e.jsx(n.li,{children:"subtitle1/2: Section descriptors, list or panel headers, supporting context."}),`
`,e.jsx(n.li,{children:"body1: Default reading text in dashboards and docs."}),`
`,e.jsx(n.li,{children:"body2: Dense UI copy: labels, secondary text, table meta (keep legible)."}),`
`,e.jsx(n.li,{children:"caption: Tertiary metadata; avoid for persistent or critical UI text."}),`
`,e.jsx(n.li,{children:"overline: Short labels/chips; prefer sentence case elsewhere."}),`
`]}),`
`,e.jsx(n.h3,{id:"readability--rhythm",children:"Readability & rhythm"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Line length: target 60–70ch for reading views."}),`
`,e.jsx(n.li,{children:"Line height: body around 1.55–1.6; headings between 1.1–1.3."}),`
`,e.jsxs(n.li,{children:["Numeric data: consider ",e.jsx(n.code,{children:"font-variant-numeric: tabular-nums"})," in tables."]}),`
`]}),`
`,e.jsx(n.h3,{id:"responsive-behavior",children:"Responsive behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Sizes are clamp-based; headings shrink gracefully on small screens."}),`
`,e.jsx(n.li,{children:"If mobile feels heavy, reduce H1/H2 clamp mins by ~2px."}),`
`]}),`
`,e.jsx(n.h2,{id:"using-typography-from-scss-source-of-truth",children:"Using typography from SCSS (source of truth)"}),`
`,e.jsxs(n.p,{children:["We expose CSS variables and mixins in ",e.jsx(n.code,{children:"src/styles/_typography.scss"}),". These power both CSS Modules and the MUI theme (which now reads the same variables), so React and SCSS always stay in sync."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In a CSS Module"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-scss",children:`@use '../../styles/_typography.scss' as typo;

.cardTitle { @include typo.apply-variant(h4); }
.meta { @include typo.apply-variant(subtitle2); }
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"With utility classes"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<h2 className="typography-h2">Section title</h2>
<p className="typography-body1">Body copy…</p>
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In MUI components (unchanged usage; now backed by CSS vars)"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Typography variant="h4">Title</Typography>
<Box sx={{ typography: 'body2' }}>Dense label</Box>
`})}),`
`,e.jsx(n.p,{children:"Tip: Prefer variants/mixins over raw font-size declarations to keep hierarchy and responsiveness consistent."}),`
`,e.jsx(n.h2,{id:"do--dont",children:"Do & Don’t"}),`
`,e.jsx(x,{do:[{body:e.jsxs(e.Fragment,{children:["Use theme variants (e.g., ",e.jsx(n.code,{children:'variant="h4"'})," or ",e.jsx(n.code,{children:"sx={{ typography: 'body2' }}"}),") instead of hardcoding sizes."]})},{body:e.jsxs(e.Fragment,{children:["Structure content with semantic headings (one ",e.jsx(n.code,{children:"h1"})," per page), then ",e.jsx(n.code,{children:"h2"}),"–",e.jsx(n.code,{children:"h6"})," in order."]})},{body:e.jsxs(e.Fragment,{children:["Keep body text around ",e.jsx(n.strong,{children:"16px"})," with line-height ~",e.jsx(n.strong,{children:"1.55–1.6"})," for readability."]})},{body:e.jsxs(e.Fragment,{children:["Use ",e.jsx(n.code,{children:"body2"}),"/",e.jsx(n.code,{children:"subtitle2"})," for dense UI; consider ",e.jsx(n.code,{children:"font-variant-numeric: tabular-nums"})," in tables."]})},{body:e.jsxs(e.Fragment,{children:["Target line length around ",e.jsx(n.strong,{children:"60–70ch"})," in reading views."]})},{body:e.jsx(e.Fragment,{children:"Rely on clamp-based sizes and verify small-screen typography visually."})}],dont:[{body:e.jsxs(e.Fragment,{children:["Hardcode ",e.jsx(n.code,{children:"font-size"})," values like ",e.jsx(n.code,{children:"0.875rem"})," in components."]})},{body:e.jsx(e.Fragment,{children:"Use display fonts for long paragraphs or dense tables."})},{body:e.jsx(e.Fragment,{children:"Stack multiple large headings above the fold."})},{body:e.jsx(e.Fragment,{children:"Rely on color-only emphasis or tighten tracking on small text."})},{body:e.jsxs(e.Fragment,{children:["Drop persistent UI text below ",e.jsx(n.strong,{children:"14px"})," or use captions for critical information."]})},{body:e.jsx(e.Fragment,{children:"Break hierarchy with random weights/sizes that bypass the theme."})}]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"Enhance later with responsive sizing & custom variants demonstration."})})]})}function b(s={}){const{wrapper:n}={...h(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(a,{...s})}):a(s)}export{b as default,u as meta};
