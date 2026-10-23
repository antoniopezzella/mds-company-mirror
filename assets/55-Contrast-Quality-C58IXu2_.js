import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t,s as n}from"./blocks-GA0YWl98.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";import{n as o,t as s}from"./ContrastStatus-Dai9DGmX.js";function c(e){let t={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Foundations/Contrast`}),`
`,(0,u.jsx)(t.h1,{id:`contrast-quality`,children:`Contrast Quality`}),`
`,(0,u.jsx)(s,{}),`
`,(0,u.jsx)(t.p,{children:`This page centralizes the automated contrast governance for the design system.`}),`
`,(0,u.jsx)(t.h2,{id:`what-the-badge-means`,children:`What The Badge Means`}),`
`,(0,u.jsx)(t.p,{children:`The badge reflects the current result of the local WCAG contrast audit across both light and dark modes:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:`PASS: All required (non-informational) token pairs meet or exceed their ratio thresholds.`}),`
`,(0,u.jsx)(t.li,{children:`FAIL: One or more required pairs fall below threshold (investigate before merging).`}),`
`,(0,u.jsx)(t.li,{children:`INFO: One or more informational pairs were included (optional) and may not meet ratios; these do not fail CI unless explicitly enforced.`}),`
`]}),`
`,(0,u.jsx)(t.p,{children:`Informational pairs are intentionally unrealistic or context-dependent (e.g., accent-on-surface where that combination is never directly rendered as text/background in a real component) but tracked for visibility.`}),`
`,(0,u.jsx)(t.h2,{id:`regenerating-the-badge`,children:`Regenerating The Badge`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-bash`,children:`npm run tokens:contrast:badge
`})}),`
`,(0,u.jsx)(t.p,{children:`Generates / updates two artifacts at repo root:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`contrast-badge.svg`}),` (display asset)`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`contrast-badge.json`}),` (structured badge payload)`]}),`
`]}),`
`,(0,u.jsx)(t.h2,{id:`full-contrast-report`,children:`Full Contrast Report`}),`
`,(0,u.jsx)(t.p,{children:`Produce a structured JSON report of every pair in all modes:`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-bash`,children:`npm run tokens:contrast:json > contrast-report.json
`})}),`
`,(0,u.jsx)(t.p,{children:`Or with informational pairs expanded in terminal output:`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-bash`,children:`npm run tokens:contrast:info
`})}),`
`,(0,u.jsx)(t.h2,{id:`typical-workflow`,children:`Typical Workflow`}),`
`,(0,u.jsxs)(t.ol,{children:[`
`,(0,u.jsx)(t.li,{children:`Adjust primitive or semantic tokens.`}),`
`,(0,u.jsxs)(t.li,{children:[`Run `,(0,u.jsx)(t.code,{children:`npm run tokens:check`}),` (builds, validates, contrast checks).`]}),`
`,(0,u.jsx)(t.li,{children:`If a contrast failure appears, tweak semantic dark overrides (preferred) or primitives (only if widely beneficial).`}),`
`,(0,u.jsx)(t.li,{children:`Regenerate badge if merging a meaningful change.`}),`
`]}),`
`,(0,u.jsx)(t.h2,{id:`ci-behavior`,children:`CI Behavior`}),`
`,(0,u.jsxs)(t.p,{children:[`The GitHub Action consumes the JSON report and annotates failures. Informational pairs are excluded unless the flag `,(0,u.jsx)(t.code,{children:`--include-informational`}),` is added. The workflow can be extended later to comment on PRs with a diff summary.`]}),`
`,(0,u.jsx)(t.h2,{id:`future-enhancements-planned`,children:`Future Enhancements (Planned)`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:`Per-token historical trend (sparkline) by persisting past reports.`}),`
`,(0,u.jsx)(t.li,{children:`PR comment summarizing changed contrast statuses.`}),`
`,(0,u.jsx)(t.li,{children:`Live interactive contrast playground (token picker + backgrounds).`}),`
`]}),`
`,(0,u.jsx)(t.h2,{id:`role-level-contrast-full-enforcement`,children:`Role-Level Contrast (Full Enforcement)`}),`
`,(0,u.jsxs)(t.p,{children:[`Role contrast is validated in `,(0,u.jsx)(t.code,{children:`roles.contrast.test.ts`}),`. All tracked role foreground/background pairs now meet or exceed required ratios in both light and dark modes.`]}),`
`,(0,u.jsx)(t.p,{children:`Current status:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:`100% of role pairs enforced (0 monitored)`}),`
`,(0,u.jsx)(t.li,{children:`Interactive primary (onAccent text) and all status pairs were the final items promoted after dark mode adjustments`}),`
`]}),`
`,(0,u.jsx)(t.p,{children:`Governance implications:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`Any regression in required contrast now fails tests, the governance script (`,(0,u.jsx)(t.code,{children:`npm run governance:ci`}),`), and CI.`]}),`
`,(0,u.jsx)(t.li,{children:`To introduce a new pair iteratively, you can temporarily reintroduce a monitored section in the test and governance script—but the default expectation is full enforcement.`}),`
`]}),`
`,(0,u.jsx)(t.p,{children:`If future visual refinements create temporary contrast dips, prefer adjusting dark overrides rapidly rather than reclassifying pairs as monitored.`}),`
`,(0,u.jsx)(t.hr,{}),`
`,(0,u.jsx)(t.p,{children:`_Last updated: role contrast fully enforced (no monitored pairs).`})]})}function l(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=r(),i(),t(),o()})))()}d();export{l as default};