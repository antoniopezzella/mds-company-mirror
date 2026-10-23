import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t,s as n}from"./blocks-GA0YWl98.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";function o(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,ul:`ul`,...a(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{title:`Foundations/Accessibility`}),`
`,(0,c.jsx)(t.h1,{id:`accessibility`,children:`Accessibility`}),`
`,(0,c.jsx)(t.p,{children:`Accessibility is integral—not an afterthought. These guidelines summarize baseline expectations when building components.`}),`
`,(0,c.jsx)(t.h2,{id:`color--contrast`,children:`Color & Contrast`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Maintain WCAG AA contrast (4.5:1 for body, 3:1 for large text / UI affordances).`}),`
`,(0,c.jsx)(t.li,{children:`Avoid using only color to convey meaning; pair with iconography or text.`}),`
`,(0,c.jsx)(t.li,{children:`Validate themed variants in both light & dark backgrounds.`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`focus-states`,children:`Focus States`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`All interactive elements must show a clearly visible focus ring (minimum 2px contrast outline or equivalent offset shadow).`}),`
`,(0,c.jsx)(t.li,{children:`Don’t remove outlines without providing an accessible replacement.`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Tab order follows DOM order; avoid tabindex greater than 0.`}),`
`,(0,c.jsx)(t.li,{children:`Provide Escape to close modals, menus, popovers.`}),`
`,(0,c.jsx)(t.li,{children:`Use Arrow key patterns for composite widgets (menus, listboxes, tablists).`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`roles--aria`,children:`Roles & ARIA`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Prefer native elements first (`,(0,c.jsx)(t.code,{children:`button`}),`, `,(0,c.jsx)(t.code,{children:`input`}),`, `,(0,c.jsx)(t.code,{children:`select`}),`) before custom roles.`]}),`
`,(0,c.jsxs)(t.li,{children:[`When necessary, apply correct ARIA attributes (`,(0,c.jsx)(t.code,{children:`aria-expanded`}),`, `,(0,c.jsx)(t.code,{children:`aria-selected`}),`, `,(0,c.jsx)(t.code,{children:`aria-live`}),`) and keep them in sync with state.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Avoid redundant roles on native elements (e.g. `,(0,c.jsx)(t.code,{children:`role="button"`}),` on a `,(0,c.jsx)(t.code,{children:`button`}),` element).`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`motion--reduction`,children:`Motion & Reduction`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Respect prefers-reduced-motion: offer non-animated or simplified transitions.`}),`
`,(0,c.jsx)(t.li,{children:`Avoid large parallax / continuous motion in dashboards.`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`testing-checklist`,children:`Testing Checklist`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Can all primary flows be completed with keyboard only?`}),`
`,(0,c.jsx)(t.li,{children:`Do interactive components announce purpose, state, and changes to assistive tech?`}),`
`,(0,c.jsx)(t.li,{children:`Are error messages programmatically associated with inputs?`}),`
`,(0,c.jsx)(t.li,{children:`Are focus traps correctly released when layers close?`}),`
`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.em,{children:`Future: add live contrast checker + keyboard focus demo components.`})}),`
`,(0,c.jsx)(t.h2,{id:`a11y-implementation-checklist`,children:`A11y Implementation Checklist`}),`
`,(0,c.jsx)(t.p,{children:`Track progress when integrating or auditing components (internal use):`})]})}function s(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),i(),t()})))()}l();export{s as default};