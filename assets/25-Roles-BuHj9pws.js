import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t,s as n}from"./blocks-GA0YWl98.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";import{n as o,r as s,t as c}from"./roles-DNqHlq35.js";function l(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n,{title:`Foundations/Roles`}),`
`,(0,d.jsx)(t.h1,{id:`roles-layer`,children:`Roles Layer`}),`
`,(0,d.jsxs)(t.p,{children:[`Roles are an intent-focused abstraction above semantic tokens. Components should prefer roles instead of referencing `,(0,d.jsx)(t.code,{children:`semanticColors`}),` or primitive tokens directly. This improves resilience when refactoring themes, adding new modes, or adjusting accessibility constraints.`]}),`
`,(0,d.jsx)(t.h2,{id:`why-roles`,children:`Why Roles?`}),`
`,(0,d.jsxs)(t.ul,{children:[`
`,(0,d.jsx)(t.li,{children:`Decouples component styling from raw semantic token names`}),`
`,(0,d.jsx)(t.li,{children:`Enables alternative mode mappings (e.g. high-contrast) without component churn`}),`
`,(0,d.jsx)(t.li,{children:`Provides a vocabulary aligning design + engineering (fg.primary, bg.neutral.subtle, bg.success.subtle)`}),`
`,(0,d.jsx)(t.li,{children:`Simplifies validation: we can test role → color resolution instead of every component path`}),`
`]}),`
`,(0,d.jsx)(t.h2,{id:`role-directory`,children:`Role Directory`}),`
`,(0,d.jsx)(t.p,{children:`Below is the current role map. Dark mode values are derived automatically via semantic dark overrides (if defined for the underlying semantic color).`}),`
`,(0,d.jsxs)(`table`,{children:[(0,d.jsx)(`thead`,{children:(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`th`,{style:{textAlign:`left`},children:`Role`}),(0,d.jsx)(`th`,{style:{textAlign:`left`},children:`Semantic Token`}),(0,d.jsx)(`th`,{style:{textAlign:`left`},children:`Description`}),(0,d.jsx)(`th`,{style:{textAlign:`center`},children:`Light`}),(0,d.jsx)(`th`,{style:{textAlign:`center`},children:`Dark`})]})}),(0,d.jsx)(`tbody`,{children:s().map(e=>{let t=c(e.role,{mode:`light`}),n=c(e.role,{mode:`dark`}),r=e=>/rgba|hsla/i.test(String(e)),i=e=>({background:r(e)?`linear-gradient(90deg, #ffffff 50%, #131210 50%)`:e,boxShadow:r(e)?`inset 0 0 0 999px ${e}`:void 0,border:`1px solid #e2e2e4`,borderRadius:4,width:52,height:22,fontSize:10,color:r(e)?`#878787`:void 0,fontFamily:`system-ui, sans-serif`,display:`flex`,alignItems:`center`,justifyContent:`center`});return(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`td`,{children:(0,d.jsx)(`code`,{children:e.role})}),(0,d.jsx)(`td`,{children:(0,d.jsx)(`code`,{children:e.semantic})}),(0,d.jsx)(`td`,{style:{fontSize:12},children:e.description}),(0,d.jsx)(`td`,{style:{textAlign:`center`},children:(0,d.jsx)(`div`,{style:i(t),children:t})}),(0,d.jsx)(`td`,{style:{textAlign:`center`},children:(0,d.jsx)(`div`,{style:i(n),children:n})})]},e.role)})})]}),`
`,(0,d.jsx)(t.h2,{id:`usage-example`,children:`Usage Example`}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`import { getRoleColor } from 'src/theme/roles';

const Chip = ({ children }) => (
  <span style={{
    color: getRoleColor('fg.neutral.subtle'),
    background: getRoleColor('bg.neutral.subtle'),
    border: \`1px solid \${getRoleColor('border.default')}\`,
    padding: '4px 8px',
    borderRadius: 8,
    fontSize: 12,
  }}>{children}</span>
);
`})}),`
`,(0,d.jsx)(t.h2,{id:`choosing-a-border-role`,children:`Choosing a border role`}),`
`,(0,d.jsx)(t.p,{children:`Three border roles look interchangeable and are not:`}),`
`,(0,d.jsxs)(t.table,{children:[(0,d.jsx)(t.thead,{children:(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.th,{children:`Role`}),(0,d.jsx)(t.th,{children:`For`}),(0,d.jsx)(t.th,{children:`Contrast obligation`})]})}),(0,d.jsxs)(t.tbody,{children:[(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:(0,d.jsx)(t.code,{children:`border.default`})}),(0,d.jsx)(t.td,{children:`The edge of an interactive control — an input outline, a button border, anything a user acts on`}),(0,d.jsxs)(t.td,{children:[(0,d.jsx)(t.strong,{children:`Gated at 3:1`}),` (WCAG 1.4.11). Never swap it for a quieter token to soften a design.`]})]}),(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:(0,d.jsx)(t.code,{children:`border.subtle`})}),(0,d.jsxs)(t.td,{children:[`Hairline rules `,(0,d.jsx)(t.em,{children:`inside`}),` a surface the user is already in — table row separators, list dividers, the grid shell`]}),(0,d.jsx)(t.td,{children:`None. It is decoration, not a boundary. Tracked informationally so it cannot drift so faint it stops separating anything.`})]}),(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:(0,d.jsx)(t.code,{children:`border.strong`})}),(0,d.jsx)(t.td,{children:`Deliberate emphasis above the default weight`}),(0,d.jsx)(t.td,{children:`—`})]})]})]}),`
`,(0,d.jsxs)(t.p,{children:[(0,d.jsx)(t.code,{children:`border.subtle`}),` is `,(0,d.jsx)(t.strong,{children:`translucent in dark mode`}),` (`,(0,d.jsx)(t.code,{children:`rgba(255,255,255,0.10)`}),`), not a
fixed grey. A hairline has to composite over whatever sits behind it — the page,
a raised panel, a pinned cell — and one fixed value cannot be correct on all
three. Drawing light mode's `,(0,d.jsx)(t.code,{children:`#dedbd6`}),` on a near-black page produces the
brightest line on the screen, which is the bug this replaced.`]}),`
`,(0,d.jsx)(t.h2,{id:`choosing-a-surface-role`,children:`Choosing a surface role`}),`
`,(0,d.jsxs)(t.p,{children:[(0,d.jsx)(t.code,{children:`bg.raised`}),` is a panel sitting `,(0,d.jsx)(t.em,{children:`above`}),` the page. In light it is the same
white as `,(0,d.jsx)(t.code,{children:`bg.default`}),` — paper on paper needs no lift, the border does that
work. In dark it is genuinely lighter (`,(0,d.jsx)(t.code,{children:`#191816`}),` against the `,(0,d.jsx)(t.code,{children:`#131210`}),` page), so
a grid or card reads as a surface rather than a hole cut into the background.`]}),`
`,(0,d.jsxs)(t.p,{children:[`For a row's state, the roles are not interchangeable either: `,(0,d.jsx)(t.strong,{children:`selection`}),` is
`,(0,d.jsx)(t.code,{children:`bg.selected`}),` (a brand tint — a state the user caused), while `,(0,d.jsx)(t.strong,{children:`hover`}),` and
`,(0,d.jsx)(t.strong,{children:`striping`}),` are `,(0,d.jsx)(t.code,{children:`bg.neutral.subtle`}),` (a neutral lift). Reusing the neutral lift
for selection is a mistake this codebase has already made: the old
`,(0,d.jsx)(t.code,{children:`bg.neutral.subtle`}),` sat one step from `,(0,d.jsx)(t.code,{children:`bg.neutral.subtle`}),` in light — so selected and
hovered rows rendered identically — and the two have since collapsed into the
single `,(0,d.jsx)(t.code,{children:`bg.neutral.subtle`}),`. Selection must be `,(0,d.jsx)(t.code,{children:`bg.selected`}),`, never the lift.`]}),`
`,(0,d.jsx)(t.h2,{id:`guidelines`,children:`Guidelines`}),`
`,(0,d.jsxs)(t.ul,{children:[`
`,(0,d.jsx)(t.li,{children:`Introduce a new role only when multiple components share the intent and a semantic token name would leak implementation.`}),`
`,(0,d.jsxs)(t.li,{children:[`Avoid duplicating semantic names as roles (e.g. no `,(0,d.jsx)(t.code,{children:`fgPrimary`}),` role) — prefer `,(0,d.jsx)(t.code,{children:`fg.primary`}),` pattern.`]}),`
`,(0,d.jsx)(t.li,{children:`Mark deprecated roles in future via metadata and surface during validation.`}),`
`]}),`
`,(0,d.jsx)(t.h2,{id:`next-steps`,children:`Next Steps`}),`
`,(0,d.jsx)(t.p,{children:`Planned enhancements:`}),`
`,(0,d.jsxs)(t.ol,{children:[`
`,(0,d.jsx)(t.li,{children:`Snapshot test of role resolutions`}),`
`,(0,d.jsx)(t.li,{children:`Lint rule preventing direct primitive / semantic usage in components`}),`
`,(0,d.jsx)(t.li,{children:`High-contrast / alternative mode mapping demonstration`}),`
`]}),`
`,(0,d.jsx)(t.h2,{id:`enforcement-ladder`,children:`Enforcement Ladder`}),`
`,(0,d.jsx)(t.p,{children:`Governance phases and current status:`}),`
`,(0,d.jsxs)(t.table,{children:[(0,d.jsx)(t.thead,{children:(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.th,{children:`Phase`}),(0,d.jsx)(t.th,{children:`Mechanism`}),(0,d.jsx)(t.th,{children:`Status`})]})}),(0,d.jsxs)(t.tbody,{children:[(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:`1`}),(0,d.jsxs)(t.td,{children:[`Warn-only script (`,(0,d.jsx)(t.code,{children:`npm run roles:check`}),`)`]}),(0,d.jsx)(t.td,{children:`Complete`})]}),(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:`2`}),(0,d.jsxs)(t.td,{children:[`Strict mode opt-in (`,(0,d.jsx)(t.code,{children:`npm run roles:check:strict`}),`)`]}),(0,d.jsx)(t.td,{children:`Complete`})]}),(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:`3`}),(0,d.jsxs)(t.td,{children:[`Full CI gate (`,(0,d.jsx)(t.code,{children:`governance:ci`}),` in workflow)`]}),(0,d.jsx)(t.td,{children:`Active`})]}),(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:`4`}),(0,d.jsx)(t.td,{children:`ESLint rule (auto-fix suggestions)`}),(0,d.jsx)(t.td,{children:`Planned`})]})]})]}),`
`,(0,d.jsxs)(t.p,{children:[`All components now use roles (0 direct primitive/semantic references). CI fails on regressions via `,(0,d.jsx)(t.code,{children:`governance:ci`}),`.`]}),`
`,(0,d.jsx)(t.h2,{id:`contrast-governance`,children:`Contrast Governance`}),`
`,(0,d.jsx)(t.p,{children:`All role foreground/background pairs are enforced in contrast tests. There is no monitored backlog. Introducing a new role pair should include an enforced contrast entry from day one unless there is a clearly documented incremental plan.`}),`
`,(0,d.jsx)(t.p,{children:(0,d.jsx)(t.em,{children:`Last updated: full role contrast enforcement & CI gate active.`})})]})}function u(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(l,{...e})}):l(e)}var d;function f(){return(f=e((()=>{d=r(),i(),t(),o()})))()}f();export{u as default};