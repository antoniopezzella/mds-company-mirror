import{j as e}from"./iframe-B7__wHsY.js";import{useMDXComponents as t}from"./index-B5YtEhlm.js";import"./preload-helper-PPVm8Dsz.js";const l={title:"Debug/Blocks"};function s(n){const o={code:"code",h1:"h1",hr:"hr",li:"li",p:"p",ul:"ul",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o.h1,{id:"blocks-debug",children:"Blocks Debug"}),`
`,e.jsx(o.p,{children:"Minimal verification of core doc blocks (Meta, Story, Controls). Use to isolate addon-docs regressions."}),`
`,e.jsx(o.p,{children:"This page intentionally avoids referencing specific component stories to prevent Storybook from indexing it as a component docs page."}),`
`,e.jsx(o.hr,{}),`
`,e.jsx(o.p,{children:"If failure persists:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Ensure ",e.jsx(o.code,{children:"@storybook/addon-docs"})," version matches ",e.jsx(o.code,{children:"@storybook/react-vite"}),"."]}),`
`,e.jsxs(o.li,{children:["Temporarily remove the alias in ",e.jsx(o.code,{children:".storybook/main.ts"})," to test direct import."]}),`
`,e.jsxs(o.li,{children:["Clear cache: ",e.jsx(o.code,{children:"npm run storybook:clean"}),"."]}),`
`,e.jsxs(o.li,{children:["Remove all but this MDX file from ",e.jsx(o.code,{children:"stories"})," globs to isolate."]}),`
`]})]})}function d(n={}){const{wrapper:o}={...t(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(s,{...n})}):s(n)}export{d as default,l as meta};
