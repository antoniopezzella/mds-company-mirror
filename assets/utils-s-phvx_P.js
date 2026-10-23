import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";import{n as o,t as s}from"./Box-BD9Vi1Pp.js";import{n as c,t as l}from"./Button-BlA5xY0Z.js";import{n as u,t as d}from"./Modal-CU_Gx98s.js";function f(){let[e,t]=g.useState(!1);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l,{variant:`outlined`,onClick:()=>t(!0),children:`Open Modal`}),(0,h.jsx)(d,{open:e,onClose:()=>t(!1),children:(0,h.jsx)(s,{p:2,sx:{position:`absolute`,top:`50%`,left:`50%`,transform:`translate(-50%, -50%)`},bgcolor:`background.paper`,children:`Hello from a raw MUI Modal`})})]})}function p(e){let t={h1:`h1`,h2:`h2`,li:`li`,ul:`ul`,...a(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.h1,{id:`utils-raw-mui`,children:`Utils (Raw MUI)`}),`
`,(0,h.jsx)(t.h2,{id:`todo-roadmap`,children:`TODO Roadmap`}),`
`,(0,h.jsxs)(t.ul,{children:[`
`,(0,h.jsx)(t.li,{children:`ClickAwayListener`}),`
`,(0,h.jsx)(t.li,{children:`CSS Baseline (global)`}),`
`,(0,h.jsx)(t.li,{children:`Modal`}),`
`,(0,h.jsx)(t.li,{children:`No SSR`}),`
`,(0,h.jsx)(t.li,{children:`Popover / Popper`}),`
`,(0,h.jsx)(t.li,{children:`Portal`}),`
`,(0,h.jsx)(t.li,{children:`TextareaAutosize`}),`
`,(0,h.jsx)(t.li,{children:`Transitions`}),`
`,(0,h.jsx)(t.li,{children:`useMediaQuery`}),`
`]}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,`
`,(0,h.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h,g,_;function v(){return(v=t((()=>{h=r(),i(),u(),o(),c(),g=e(n()),_={title:`MUI Reference/Utils`}})))()}v();export{f as Example,m as default,_ as meta};