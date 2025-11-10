import{j as e}from"./iframe-B7__wHsY.js";import{useMDXComponents as i}from"./index-B5YtEhlm.js";import{C as s}from"./ContrastStatus-uIcXJP8o.js";import"./preload-helper-PPVm8Dsz.js";const c={title:"Foundations/Contrast-Quality"};function t(r){const n={code:"code",h1:"h1",h2:"h2",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"contrast-quality",children:"Contrast Quality"}),`
`,e.jsx(s,{}),`
`,e.jsx(n.p,{children:"This page centralizes the automated contrast governance for the design system."}),`
`,e.jsx(n.h2,{id:"what-the-badge-means",children:"What The Badge Means"}),`
`,e.jsx(n.p,{children:"The badge reflects the current result of the local WCAG contrast audit across both light and dark modes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"PASS: All required (non-informational) token pairs meet or exceed their ratio thresholds."}),`
`,e.jsx(n.li,{children:"FAIL: One or more required pairs fall below threshold (investigate before merging)."}),`
`,e.jsx(n.li,{children:"INFO: One or more informational pairs were included (optional) and may not meet ratios; these do not fail CI unless explicitly enforced."}),`
`]}),`
`,e.jsx(n.p,{children:"Informational pairs are intentionally unrealistic or context-dependent (e.g., accent-on-surface where that combination is never directly rendered as text/background in a real component) but tracked for visibility."}),`
`,e.jsx(n.h2,{id:"regenerating-the-badge",children:"Regenerating The Badge"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run tokens:contrast:badge
`})}),`
`,e.jsx(n.p,{children:"Generates / updates two artifacts at repo root:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"contrast-badge.svg"})," (display asset)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"contrast-badge.json"})," (structured badge payload)"]}),`
`]}),`
`,e.jsx(n.h2,{id:"full-contrast-report",children:"Full Contrast Report"}),`
`,e.jsx(n.p,{children:"Produce a structured JSON report of every pair in all modes:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run tokens:contrast:json > contrast-report.json
`})}),`
`,e.jsx(n.p,{children:"Or with informational pairs expanded in terminal output:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run tokens:contrast:info
`})}),`
`,e.jsx(n.h2,{id:"typical-workflow",children:"Typical Workflow"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Adjust primitive or semantic tokens."}),`
`,e.jsxs(n.li,{children:["Run ",e.jsx(n.code,{children:"npm run tokens:check"})," (builds, validates, contrast checks)."]}),`
`,e.jsx(n.li,{children:"If a contrast failure appears, tweak semantic dark overrides (preferred) or primitives (only if widely beneficial)."}),`
`,e.jsx(n.li,{children:"Regenerate badge if merging a meaningful change."}),`
`]}),`
`,e.jsx(n.h2,{id:"ci-behavior",children:"CI Behavior"}),`
`,e.jsxs(n.p,{children:["The GitHub Action consumes the JSON report and annotates failures. Informational pairs are excluded unless the flag ",e.jsx(n.code,{children:"--include-informational"})," is added. The workflow can be extended later to comment on PRs with a diff summary."]}),`
`,e.jsx(n.h2,{id:"future-enhancements-planned",children:"Future Enhancements (Planned)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Per-token historical trend (sparkline) by persisting past reports."}),`
`,e.jsx(n.li,{children:"PR comment summarizing changed contrast statuses."}),`
`,e.jsx(n.li,{children:"Live interactive contrast playground (token picker + backgrounds)."}),`
`]}),`
`,e.jsx(n.h2,{id:"role-level-contrast-full-enforcement",children:"Role-Level Contrast (Full Enforcement)"}),`
`,e.jsxs(n.p,{children:["Role contrast is validated in ",e.jsx(n.code,{children:"roles.contrast.test.ts"}),". All tracked role foreground/background pairs now meet or exceed required ratios in both light and dark modes."]}),`
`,e.jsx(n.p,{children:"Current status:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"100% of role pairs enforced (0 monitored)"}),`
`,e.jsx(n.li,{children:"Interactive primary (onAccent text) and all status pairs were the final items promoted after dark mode adjustments"}),`
`]}),`
`,e.jsx(n.p,{children:"Governance implications:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Any regression in required contrast now fails tests, the governance script (",e.jsx(n.code,{children:"npm run governance:ci"}),"), and CI."]}),`
`,e.jsx(n.li,{children:"To introduce a new pair iteratively, you can temporarily reintroduce a monitored section in the test and governance script—but the default expectation is full enforcement."}),`
`]}),`
`,e.jsx(n.p,{children:"If future visual refinements create temporary contrast dips, prefer adjusting dark overrides rapidly rather than reclassifying pairs as monitored."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.p,{children:"_Last updated: role contrast fully enforced (no monitored pairs)."})]})}function h(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{h as default,c as meta};
