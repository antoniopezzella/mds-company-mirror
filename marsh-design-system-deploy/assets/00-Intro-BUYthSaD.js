import{j as e}from"./iframe-B7__wHsY.js";import{useMDXComponents as r}from"./index-B5YtEhlm.js";import{C as o}from"./ContrastStatus-uIcXJP8o.js";import"./preload-helper-PPVm8Dsz.js";const a={title:"Foundations/Intro"};function i(s){const n={code:"code",em:"em",h1:"h1",h2:"h2",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"design-system-intro",children:"Design System Intro"}),`
`,e.jsx(n.p,{children:"This is a fresh baseline MDX page to validate Storybook MDX indexing in isolation."}),`
`,e.jsx(n.h2,{id:"contrast-status",children:"Contrast Status"}),`
`,e.jsx(o,{}),`
`,e.jsx(n.p,{children:"Refresh after token changes:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run tokens:contrast:badge
`})}),`
`,e.jsx(n.p,{children:"Informational pairs (optional) can be displayed with:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run tokens:contrast:info
`})}),`
`,e.jsx(n.h2,{id:"what-this-page-demonstrates",children:"What This Page Demonstrates"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["MDX v2 syntax with a single ",e.jsx(n.code,{children:"<Meta />"})]}),`
`,e.jsx(n.li,{children:"No custom stories or CSF exports"}),`
`,e.jsx(n.li,{children:"Should appear once in the sidebar under Docs/Intro"}),`
`]}),`
`,e.jsx(n.h2,{id:"next-steps",children:"Next Steps"}),`
`,e.jsx(n.p,{children:"Once this renders correctly we can reintroduce the foundations pages one at a time:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Colors"}),`
`,e.jsx(n.li,{children:"Typography"}),`
`,e.jsx(n.li,{children:"Spacing"}),`
`,e.jsx(n.li,{children:"Elevation"}),`
`,e.jsx(n.li,{children:"Accessibility"}),`
`]}),`
`,e.jsx(n.p,{children:"If a duplication or indexer error reappears after adding a page, that page (or its filename) is the trigger."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"Health note: dynamic timestamp removed temporarily for MDX debug isolation."})}),`
`,e.jsx(n.h2,{id:"troubleshooting-mdx-docs",children:"Troubleshooting MDX Docs"}),`
`,e.jsx(n.h2,{id:"storybook-foundations-grouping-recommendations",children:"Storybook Foundations Grouping: Recommendations"}),`
`,e.jsx(n.p,{children:'To ensure all foundational docs are visually grouped under a "Foundations" section in the Storybook sidebar:'}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Meta Title Consistency:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Every foundational MDX doc must export ",e.jsx(n.code,{children:"export const meta = { title: 'Foundations/<Page>' }"})," at the top."]}),`
`,e.jsxs(n.li,{children:["The prefix must be exactly ",e.jsx(n.code,{children:"Foundations/"})," (no extra spaces, dashes, or typos)."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"No Duplicate Meta/Title:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Only use the ",e.jsx(n.code,{children:"meta"})," export, not ",e.jsx(n.code,{children:"<Meta title=... />"})," tags."]}),`
`,e.jsx(n.li,{children:"Remove any duplicate or conflicting meta/title exports."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Sidebar Ordering:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["In ",e.jsx(n.code,{children:".storybook/preview.tsx"}),", use the ",e.jsx(n.code,{children:"storySort.order"})," array to explicitly order the Foundations section and its children."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Cache and Browser Refresh:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["After making changes, run ",e.jsx(n.code,{children:"npm run storybook:clean"})," and restart Storybook."]}),`
`,e.jsx(n.li,{children:"Hard refresh your browser to clear cached sidebar state."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"No Stray Stories:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Check for any stories with similar but not matching prefixes (e.g., "Foundation", "Foundations -", etc.) and correct them.'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"MDX v2 Syntax:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use only one ",e.jsx(n.code,{children:"meta"})," export per MDX file."]}),`
`,e.jsx(n.li,{children:"Avoid raw HTML tags in prose; use Markdown or code blocks."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Troubleshooting:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If grouping still fails, add a minimal test MDX page (e.g., ",e.jsx(n.code,{children:"ZZ-Debug.mdx"})," with just a meta export and heading) to isolate indexing issues."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:'Following these steps will ensure your sidebar visually groups all foundational docs under "Foundations" as intended.'}),`
`,e.jsx(n.p,{children:"If docs fail to build or pages disappear:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Ensure each MDX file has exactly one ",e.jsx(n.code,{children:"<Meta />"})," at the top."]}),`
`,e.jsxs(n.li,{children:["Look for raw HTML tags (e.g. ",e.jsx(n.code,{children:"<button>"}),") in prose—replace with backticks."]}),`
`,e.jsxs(n.li,{children:["Remove heavy inline logic (large ",e.jsx(n.code,{children:"{array.map(...)}"}),") and move it into a helper component."]}),`
`,e.jsxs(n.li,{children:["Confirm the Storybook config still points ",e.jsx(n.code,{children:"stories"})," to ",e.jsx(n.code,{children:"src/docs/**/*.mdx"})," and component stories."]}),`
`,e.jsxs(n.li,{children:["Verify docs blocks import path (",e.jsx(n.code,{children:"@storybook/blocks"}),") resolves (no alias required)."]}),`
`,e.jsxs(n.li,{children:["Clear caches: ",e.jsx(n.code,{children:"npm run storybook:clean"}),"."]}),`
`,e.jsxs(n.li,{children:["Add a minimal new test page (e.g. ",e.jsx(n.code,{children:"ZZ-Debug.mdx"})," with just ",e.jsx(n.code,{children:"<Meta />"})," + heading) to isolate indexing issues."]}),`
`]}),`
`,e.jsxs(n.p,{children:["If still broken, temporarily add a Vite debug plugin logging MDX IDs (see removed ",e.jsx(n.code,{children:"mdx-inspect"})," pattern in ",e.jsx(n.code,{children:".storybook/main.ts"}),")."]})]})}function h(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{h as default,a as meta};
