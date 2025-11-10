import{j as e,s as l}from"./iframe-B7__wHsY.js";import{useMDXComponents as t}from"./index-B5YtEhlm.js";import"./blocks-Bskvw8pl.js";import{T as d}from"./TokenTable-DGJ2w0F1.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CYaVcYGU.js";import"./index-DcJJ25tP.js";const g={title:"Foundations/Spacing"};function a(i){const n={code:"code",div:"div",em:"em",h1:"h1",h2:"h2",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"spacing",children:"Spacing"}),`
`,e.jsx(n.p,{children:"Consistent spacing ensures rhythm and visual clarity. We use a curated scale mixing 4px micro steps and larger 8px multiples."}),`
`,e.jsx(n.h2,{id:"scale",children:"Scale"}),`
`,e.jsx(d,{columns:[{key:"index",label:"Index",width:60},{key:"value",label:"Value (px)",width:90},{key:"visual",label:"Visual"}],rows:l.map((s,r)=>({index:r,value:s,visual:e.jsx(n.div,{style:{width:s,height:s,background:"#002c77",borderRadius:2}})})),caption:"Spacing scale derived from design tokens; use theme.spacing(index) in components."}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Prefer container padding of 16 / 24 / 32 depending on breakpoint."}),`
`,e.jsx(n.li,{children:"Vertical rhythm in dense panels: multiples of 8."}),`
`,e.jsx(n.li,{children:"Dashboard section gutters: 32–48."}),`
`,e.jsx(n.li,{children:"Avoid ad‑hoc pixel values; add to the scale before use."}),`
`]}),`
`,e.jsx(n.h2,{id:"api-integration",children:"API Integration"}),`
`,e.jsxs(n.p,{children:["The theme ",e.jsx(n.code,{children:"spacing"})," function is overridden. Use:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`sx={{ p: 3, gap: 2 }} // maps to spacing indices -> px
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"Future: add responsive examples & layout patterns."})})]})}function j(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}export{j as default,g as meta};
