import{j as e}from"./iframe-B7__wHsY.js";import{useMDXComponents as d}from"./index-B5YtEhlm.js";import{l as h,g as o}from"./roles-DDzdIcSm.js";import"./preload-helper-PPVm8Dsz.js";const j={title:"Foundations/Roles"};function c(t){const n={code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...d(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"roles-layer",children:"Roles Layer"}),`
`,e.jsxs(n.p,{children:["Roles are an intent-focused abstraction above semantic tokens. Components should prefer roles instead of referencing ",e.jsx(n.code,{children:"semanticColors"})," or primitive tokens directly. This improves resilience when refactoring themes, adding new modes, or adjusting accessibility constraints."]}),`
`,e.jsx(n.h2,{id:"why-roles",children:"Why Roles?"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Decouples component styling from raw semantic token names"}),`
`,e.jsx(n.li,{children:"Enables alternative mode mappings (e.g. high-contrast) without component churn"}),`
`,e.jsx(n.li,{children:"Provides a vocabulary aligning design + engineering (text.primary, surface.subtle, status.success)"}),`
`,e.jsx(n.li,{children:"Simplifies validation: we can test role → color resolution instead of every component path"}),`
`]}),`
`,e.jsx(n.h2,{id:"role-directory",children:"Role Directory"}),`
`,e.jsx(n.p,{children:"Below is the current role map. Dark mode values are derived automatically via semantic dark overrides (if defined for the underlying semantic color)."}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{textAlign:"left"},children:"Role"}),e.jsx("th",{style:{textAlign:"left"},children:"Semantic Token"}),e.jsx("th",{style:{textAlign:"left"},children:"Description"}),e.jsx("th",{style:{textAlign:"center"},children:"Light"}),e.jsx("th",{style:{textAlign:"center"},children:"Dark"})]})}),e.jsx("tbody",{children:h().map(r=>{const i=o(r.role,{mode:"light"}),s=o(r.role,{mode:"dark"}),l=a=>({background:a,border:"1px solid #e2e2e4",borderRadius:4,width:52,height:22,fontSize:10,fontFamily:"system-ui, sans-serif",display:"flex",alignItems:"center",justifyContent:"center"});return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:r.role})}),e.jsx("td",{children:e.jsx("code",{children:r.semantic})}),e.jsx("td",{style:{fontSize:12},children:r.description}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("div",{style:l(i),children:i})}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("div",{style:l(s),children:s})})]},r.role)})})]}),`
`,e.jsx(n.h2,{id:"usage-example",children:"Usage Example"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { getRoleColor } from 'src/theme/roles';

const Chip = ({ children }) => (
  <span style={{
    color: getRoleColor('text.secondary'),
    background: getRoleColor('surface.subtle'),
    border: \`1px solid \${getRoleColor('border.default')}\`,
    padding: '4px 8px',
    borderRadius: 8,
    fontSize: 12,
  }}>{children}</span>
);
`})}),`
`,e.jsx(n.h2,{id:"guidelines",children:"Guidelines"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Introduce a new role only when multiple components share the intent and a semantic token name would leak implementation."}),`
`,e.jsxs(n.li,{children:["Avoid duplicating semantic names as roles (e.g. no ",e.jsx(n.code,{children:"textPrimary"})," role) — prefer ",e.jsx(n.code,{children:"text.primary"})," pattern."]}),`
`,e.jsx(n.li,{children:"Mark deprecated roles in future via metadata and surface during validation."}),`
`]}),`
`,e.jsx(n.h2,{id:"next-steps",children:"Next Steps"}),`
`,e.jsx(n.p,{children:"Planned enhancements:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Snapshot test of role resolutions"}),`
`,e.jsx(n.li,{children:"Lint rule preventing direct primitive / semantic usage in components"}),`
`,e.jsx(n.li,{children:"High-contrast / alternative mode mapping demonstration"}),`
`]}),`
`,e.jsx(n.h2,{id:"enforcement-ladder",children:"Enforcement Ladder"}),`
`,e.jsx(n.p,{children:"Governance phases and current status:"}),`
`,e.jsxs(n.p,{children:[`| Phase | Mechanism | Status |
|-------|-----------|--------|
| 1 | Warn-only script (`,e.jsx(n.code,{children:"npm run roles:check"}),`) | Complete |
| 2 | Strict mode opt-in (`,e.jsx(n.code,{children:"npm run roles:check:strict"}),`) | Complete |
| 3 | Full CI gate (`,e.jsx(n.code,{children:"governance:ci"}),` in workflow) | Active |
| 4 | ESLint rule (auto-fix suggestions) | Planned |`]}),`
`,e.jsxs(n.p,{children:["All components now use roles (0 direct primitive/semantic references). CI fails on regressions via ",e.jsx(n.code,{children:"governance:ci"}),"."]}),`
`,e.jsx(n.h2,{id:"contrast-governance",children:"Contrast Governance"}),`
`,e.jsx(n.p,{children:"All role foreground/background pairs are enforced in contrast tests. There is no monitored backlog. Introducing a new role pair should include an enforced contrast entry from day one unless there is a clearly documented incremental plan."}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"Last updated: full role contrast enforcement & CI gate active."})})]})}function g(t={}){const{wrapper:n}={...d(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(c,{...t})}):c(t)}export{g as default,j as meta};
