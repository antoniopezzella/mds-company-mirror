import{j as n}from"./iframe-B7__wHsY.js";import{useMDXComponents as i}from"./index-B5YtEhlm.js";import"./preload-helper-PPVm8Dsz.js";const a={title:"Debug/Blocks Canary"};function t(o){const e={code:"code",h1:"h1",hr:"hr",p:"p",...i(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"blocks-canary",children:"Blocks Canary"}),`
`,n.jsxs(e.p,{children:["This minimal page contains only a single ",n.jsx(e.code,{children:"<Meta />"}),` and a heading. It is used to confirm
that MDX compilation and the docs blocks import path is functioning before
introducing `,n.jsx(e.code,{children:"<Story />"})," or other advanced blocks (e.g., ",n.jsx(e.code,{children:"<Controls />"}),")."]}),`
`,n.jsx(e.p,{children:"If this page fails to load, the issue is unrelated to advanced Doc Blocks usage."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.p,{children:"This page intentionally contains no story references to avoid interfering with the indexer while debugging."})]})}function d(o={}){const{wrapper:e}={...i(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(t,{...o})}):t(o)}export{d as default,a as meta};
