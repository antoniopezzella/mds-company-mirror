import{ar as h,Z as e,c as x,a2 as j,N as a}from"./iframe-CPBTUrEW.js";import"./preload-helper-PPVm8Dsz.js";function c(t){const n={code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...h(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(x,{title:"Foundations/Roles"}),`
`,e.jsx(n.h1,{id:"roles-layer",children:"Roles Layer"}),`
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
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{textAlign:"left"},children:"Role"}),e.jsx("th",{style:{textAlign:"left"},children:"Semantic Token"}),e.jsx("th",{style:{textAlign:"left"},children:"Description"}),e.jsx("th",{style:{textAlign:"center"},children:"Light"}),e.jsx("th",{style:{textAlign:"center"},children:"Dark"})]})}),e.jsx("tbody",{children:j().map(s=>{const d=a(s.role,{mode:"light"}),l=a(s.role,{mode:"dark"}),i=r=>/rgba|hsla/i.test(String(r)),o=r=>({background:i(r)?"linear-gradient(90deg, #ffffff 50%, #101010 50%)":r,boxShadow:i(r)?`inset 0 0 0 999px ${r}`:void 0,border:"1px solid #e2e2e4",borderRadius:4,width:52,height:22,fontSize:10,color:i(r)?"#878787":void 0,fontFamily:"system-ui, sans-serif",display:"flex",alignItems:"center",justifyContent:"center"});return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:s.role})}),e.jsx("td",{children:e.jsx("code",{children:s.semantic})}),e.jsx("td",{style:{fontSize:12},children:s.description}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("div",{style:o(d),children:d})}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("div",{style:o(l),children:l})})]},s.role)})})]}),`
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
`,e.jsx(n.h2,{id:"choosing-a-border-role",children:"Choosing a border role"}),`
`,e.jsx(n.p,{children:"Three border roles look interchangeable and are not:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Role"}),e.jsx(n.th,{children:"For"}),e.jsx(n.th,{children:"Contrast obligation"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"border.default"})}),e.jsx(n.td,{children:"The edge of an interactive control — an input outline, a button border, anything a user acts on"}),e.jsxs(n.td,{children:[e.jsx(n.strong,{children:"Gated at 3:1"})," (WCAG 1.4.11). Never swap it for a quieter token to soften a design."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"border.subtle"})}),e.jsxs(n.td,{children:["Hairline rules ",e.jsx(n.em,{children:"inside"})," a surface the user is already in — table row separators, list dividers, the grid shell"]}),e.jsx(n.td,{children:"None. It is decoration, not a boundary. Tracked informationally so it cannot drift so faint it stops separating anything."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"border.strong"})}),e.jsx(n.td,{children:"Deliberate emphasis above the default weight"}),e.jsx(n.td,{children:"—"})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"border.subtle"})," is ",e.jsx(n.strong,{children:"translucent in dark mode"})," (",e.jsx(n.code,{children:"rgba(255,255,255,0.10)"}),`), not a
fixed grey. A hairline has to composite over whatever sits behind it — the page,
a raised panel, a pinned cell — and one fixed value cannot be correct on all
three. Drawing light mode's `,e.jsx(n.code,{children:"#e3e3e3"}),` on a near-black page produces the
brightest line on the screen, which is the bug this replaced.`]}),`
`,e.jsx(n.h2,{id:"choosing-a-surface-role",children:"Choosing a surface role"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"surface.raised"})," is a panel sitting ",e.jsx(n.em,{children:"above"}),` the page. In light it is the same
white as `,e.jsx(n.code,{children:"surface.default"}),` — paper on paper needs no lift, the border does that
work. In dark it is genuinely lighter (`,e.jsx(n.code,{children:"#1a1a1a"})," against the ",e.jsx(n.code,{children:"#101010"}),` page), so
a grid or card reads as a surface rather than a hole cut into the background.`]}),`
`,e.jsxs(n.p,{children:["For a row's state, the roles are not interchangeable either: ",e.jsx(n.strong,{children:"selection"}),` is
`,e.jsx(n.code,{children:"surface.selected"})," (a brand tint — a state the user caused), while ",e.jsx(n.strong,{children:"hover"}),` and
`,e.jsx(n.strong,{children:"striping"})," are ",e.jsx(n.code,{children:"surface.subtle"})," (a neutral lift). Using ",e.jsx(n.code,{children:"surface.accent"}),` for
selection is a mistake this codebase has already made: it is one unit away from
`,e.jsx(n.code,{children:"surface.subtle"})," in light, so selected and hovered rows rendered identically."]}),`
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
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Phase"}),e.jsx(n.th,{children:"Mechanism"}),e.jsx(n.th,{children:"Status"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"1"}),e.jsxs(n.td,{children:["Warn-only script (",e.jsx(n.code,{children:"npm run roles:check"}),")"]}),e.jsx(n.td,{children:"Complete"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"2"}),e.jsxs(n.td,{children:["Strict mode opt-in (",e.jsx(n.code,{children:"npm run roles:check:strict"}),")"]}),e.jsx(n.td,{children:"Complete"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"3"}),e.jsxs(n.td,{children:["Full CI gate (",e.jsx(n.code,{children:"governance:ci"})," in workflow)"]}),e.jsx(n.td,{children:"Active"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"4"}),e.jsx(n.td,{children:"ESLint rule (auto-fix suggestions)"}),e.jsx(n.td,{children:"Planned"})]})]})]}),`
`,e.jsxs(n.p,{children:["All components now use roles (0 direct primitive/semantic references). CI fails on regressions via ",e.jsx(n.code,{children:"governance:ci"}),"."]}),`
`,e.jsx(n.h2,{id:"contrast-governance",children:"Contrast Governance"}),`
`,e.jsx(n.p,{children:"All role foreground/background pairs are enforced in contrast tests. There is no monitored backlog. Introducing a new role pair should include an enforced contrast entry from day one unless there is a clearly documented incremental plan."}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"Last updated: full role contrast enforcement & CI gate active."})})]})}function p(t={}){const{wrapper:n}={...h(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(c,{...t})}):c(t)}export{p as default};
