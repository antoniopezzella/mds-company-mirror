import{j as e}from"./iframe-B7__wHsY.js";import{useMDXComponents as a}from"./index-B5YtEhlm.js";import{A as r}from"./Alert-DN1elm6Z.js";import"./preload-helper-PPVm8Dsz.js";import"./memoTheme-DLuuOUa1.js";import"./styled-D_MMOKXd.js";import"./useSlot-BhRWapFU.js";import"./mergeSlotProps-ylSDTTjz.js";import"./useForkRef-jYvpDqFw.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./generateUtilityClasses-CoM_PQv9.js";import"./createSvgIcon-DOVj1Oe1.js";import"./SvgIcon-BoXwKfVN.js";import"./Close-BWQq1yq8.js";import"./IconButton-CPcl-lVA.js";import"./ButtonBase-H0aG7E_M.js";import"./useTimeout-BMcW_4Fv.js";import"./useEventCallback-CFw1AcSY.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-buLdZGSf.js";import"./Paper-CIHAuA3e.js";import"./useTheme-CSj_Q00S.js";const B={title:"MUI Reference/Overview"};function t(i){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",ul:"ul",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"mui-reference",children:"MUI Reference"}),`
`,e.jsx(n.p,{children:"Raw Material UI component examples are collected here as a neutral baseline before applying Marsh Design System role-driven theming."}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Purpose: Provide quick visual + usage parity with upstream MUI docs using our ThemeProvider (light/dark) and typography variables. No role color overrides are applied yet beyond existing global theme."}),`
`]}),`
`,e.jsx(n.h2,{id:"scope-phase-1",children:"Scope (Phase 1)"}),`
`,e.jsx(n.p,{children:"Included (Core only): Inputs, Data Display, Feedback, Surface, Navigation, Layout, Utils."}),`
`,e.jsx(n.p,{children:"Deferred (Future): MUI X (Data Grid, Date/Time Pickers, Charts), Lab (Masonry, Timeline), Pro/Paid components."}),`
`,e.jsx(n.h2,{id:"status-legend",children:"Status Legend"}),`
`,e.jsx(n.p,{children:`| Icon | Meaning |
| ---- | ------- |
| ✅ | Example stub present |
| 🚧 | Planned stub not yet added |
| ⏭️ | Deferred to later phase |`}),`
`,e.jsx(n.h2,{id:"category-index",children:"Category Index"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#inputs",children:"Inputs"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#data-display",children:"Data Display"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#feedback",children:"Feedback"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#surface",children:"Surface"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#navigation",children:"Navigation"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#layout",children:"Layout"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#utils",children:"Utils"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"inputs",children:"Inputs"}),`
`,e.jsx(n.p,{children:`| Component | Status | Notes |
| --------- | ------ | ----- |
| Button | ✅ | Already DS-migrated (will show raw + DS variants later) |
| ButtonGroup | 🚧 | Raw example TODO |
| Autocomplete | 🚧 | Requires basic options stub |
| Checkbox | 🚧 | Include controlled + indeterminate |
| FAB | 🚧 | Show primary action variant |
| RadioGroup | 🚧 | Basic value selection |
| Rating | 🚧 | Basic usage |
| Select | 🚧 | Native vs MUI Select |
| Slider | 🚧 | Min/max/step demo |
| Switch | 🚧 | Controlled example |
| TextField | 🚧 | Standard + filled + outlined |
| TransferList | ⏭️ | Lower priority |
| ToggleButton | 🚧 | Exclusive vs multiple |`}),`
`,e.jsx(n.h2,{id:"data-display",children:"Data Display"}),`
`,e.jsx(n.p,{children:`| Component | Status | Notes |
| --------- | ------ | ----- |
| Avatar | 🚧 | Image + initials |
| Badge | 🚧 | Small count |
| Chip | 🚧 | Clickable + deletable |
| Divider | 🚧 | Horizontal + inset |
| Icons | 🚧 | Using @mui/icons-material |
| List | 🚧 | Basic list + nested |
| Table | 🚧 | Simple table (no Data Grid) |
| Tooltip | 🚧 | Placement variants |
| Typography | ✅ | Default scale already provided |`}),`
`,e.jsx(n.h2,{id:"feedback",children:"Feedback"}),`
`,e.jsx(n.p,{children:`| Component | Status | Notes |
| --------- | ------ | ----- |
| Alert | ✅ | Base example below |
| Backdrop | 🚧 | Simple open/close |
| Dialog | 🚧 | Title + actions |
| Progress | 🚧 | Linear + circular |
| Skeleton | 🚧 | Text + avatar variant |
| Snackbar | 🚧 | Auto hide + action |`}),`
`,e.jsx(n.h3,{id:"alert-sample",children:"Alert (Sample)"}),`
`,e.jsx(r,{severity:"info",children:"Informational alert sample (raw MUI)"}),`
`,e.jsx(n.h2,{id:"surface",children:"Surface"}),`
`,e.jsx(n.p,{children:`| Component | Status | Notes |
| --------- | ------ | ----- |
| Accordion | 🚧 | Basic expand/collapse |
| AppBar | 🚧 | Primary bar with title |
| Card | ✅ | Already DS-migrated; raw example TODO |
| Paper | 🚧 | Elevation levels |`}),`
`,e.jsx(n.h2,{id:"navigation",children:"Navigation"}),`
`,e.jsx(n.p,{children:`| Component | Status | Notes |
| --------- | ------ | ----- |
| BottomNavigation | 🚧 | Simple 3 actions |
| Breadcrumbs | 🚧 | Hierarchical path |
| Drawer | 🚧 | Temporary left drawer |
| Link | 🚧 | Inline link styling |
| Menu | 🚧 | Anchor + menu items |
| Pagination | 🚧 | Basic usage |
| SpeedDial | 🚧 | Action icons |
| Stepper | 🚧 | Horizontal stepper |
| Tabs | 🚧 | Basic tabs + controlled |`}),`
`,e.jsx(n.h2,{id:"layout",children:"Layout"}),`
`,e.jsx(n.p,{children:`| Component | Status | Notes |
| --------- | ------ | ----- |
| Box | ✅ | Already used globally |
| Container | 🚧 | Max width examples |
| Grid | 🚧 | Responsive columns |
| GridLegacy | ⏭️ | Skip unless needed |
| Stack | ✅ | Already used |
| ImageList | 🚧 | Standard example |`}),`
`,e.jsx(n.h2,{id:"utils",children:"Utils"}),`
`,e.jsx(n.p,{children:`| Component | Status | Notes |
| --------- | ------ | ----- |
| ClickAwayListener | 🚧 | Close menu on outside click |
| CSS Baseline | ✅ | Applied globally in preview |
| Modal | 🚧 | Basic open/close |
| No SSR | 🚧 | One example with media query |
| Popover | 🚧 | Anchor positioning |
| Popper | 🚧 | Raw positioning (maybe merge with Popover) |
| Portal | 🚧 | Render outside root |
| TextareaAutosize | 🚧 | Simple usage |
| Transitions | 🚧 | Grow/Fade sample |
| useMediaQuery | 🚧 | Responsive text example |`}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"next-steps",children:"Next Steps"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Add minimal raw examples for each component marked 🚧."}),`
`,e.jsx(n.li,{children:"Verify rendering under both light and dark themes."}),`
`,e.jsxs(n.li,{children:["Introduce DS-themed variants (role-based colors, spacing) in a parallel ",e.jsx(n.code,{children:"Components"})," section (not here) to keep reference pure."]}),`
`,e.jsx(n.li,{children:"Add tests for a subset (Button, Alert, Dialog, Tabs, Form Controls) for accessibility and governance."}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"After all stubs exist, convert the status table entries from 🚧 to ✅ and begin the DS skinning pass."}),`
`]})]})}function I(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{I as default,B as meta};
