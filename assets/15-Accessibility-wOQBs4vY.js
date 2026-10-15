import{ar as t,Z as e,c as r}from"./iframe-CPBTUrEW.js";import"./preload-helper-PPVm8Dsz.js";function s(i){const n={code:"code",em:"em",h1:"h1",h2:"h2",hr:"hr",li:"li",p:"p",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Foundations/Accessibility"}),`
`,e.jsx(n.h1,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:"Accessibility is integral—not an afterthought. These guidelines summarize baseline expectations when building components."}),`
`,e.jsx(n.h2,{id:"color--contrast",children:"Color & Contrast"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Maintain WCAG AA contrast (4.5:1 for body, 3:1 for large text / UI affordances)."}),`
`,e.jsx(n.li,{children:"Avoid using only color to convey meaning; pair with iconography or text."}),`
`,e.jsx(n.li,{children:"Validate themed variants in both light & dark backgrounds."}),`
`]}),`
`,e.jsx(n.h2,{id:"focus-states",children:"Focus States"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"All interactive elements must show a clearly visible focus ring (minimum 2px contrast outline or equivalent offset shadow)."}),`
`,e.jsx(n.li,{children:"Don’t remove outlines without providing an accessible replacement."}),`
`]}),`
`,e.jsx(n.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Tab order follows DOM order; avoid tabindex greater than 0."}),`
`,e.jsx(n.li,{children:"Provide Escape to close modals, menus, popovers."}),`
`,e.jsx(n.li,{children:"Use Arrow key patterns for composite widgets (menus, listboxes, tablists)."}),`
`]}),`
`,e.jsx(n.h2,{id:"roles--aria",children:"Roles & ARIA"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Prefer native elements first (",e.jsx(n.code,{children:"button"}),", ",e.jsx(n.code,{children:"input"}),", ",e.jsx(n.code,{children:"select"}),") before custom roles."]}),`
`,e.jsxs(n.li,{children:["When necessary, apply correct ARIA attributes (",e.jsx(n.code,{children:"aria-expanded"}),", ",e.jsx(n.code,{children:"aria-selected"}),", ",e.jsx(n.code,{children:"aria-live"}),") and keep them in sync with state."]}),`
`,e.jsxs(n.li,{children:["Avoid redundant roles on native elements (e.g. ",e.jsx(n.code,{children:'role="button"'})," on a ",e.jsx(n.code,{children:"button"})," element)."]}),`
`]}),`
`,e.jsx(n.h2,{id:"motion--reduction",children:"Motion & Reduction"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Respect prefers-reduced-motion: offer non-animated or simplified transitions."}),`
`,e.jsx(n.li,{children:"Avoid large parallax / continuous motion in dashboards."}),`
`]}),`
`,e.jsx(n.h2,{id:"testing-checklist",children:"Testing Checklist"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Can all primary flows be completed with keyboard only?"}),`
`,e.jsx(n.li,{children:"Do interactive components announce purpose, state, and changes to assistive tech?"}),`
`,e.jsx(n.li,{children:"Are error messages programmatically associated with inputs?"}),`
`,e.jsx(n.li,{children:"Are focus traps correctly released when layers close?"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"Future: add live contrast checker + keyboard focus demo components."})}),`
`,e.jsx(n.h2,{id:"a11y-implementation-checklist",children:"A11y Implementation Checklist"}),`
`,e.jsx(n.p,{children:"Track progress when integrating or auditing components (internal use):"})]})}function c(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{c as default};
