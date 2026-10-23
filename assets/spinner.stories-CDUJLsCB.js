import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./spinner-Ay242hMn.js";var i,a,o,s,c,l;function u(){return(u=e((()=>{n(),i=t(),a={title:`Components/Spinner`,component:r,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:'# Spinner\n\nMinimal loading indicator (lucide `Loader2` + `animate-spin`). It already\ncarries `role="status"` and `aria-label="Loading"`, so it is announced to\nassistive tech. Resize with a `size-*` utility, **not** width/height —\n`animate-spin` will not scale an SVG sized by attribute. It inherits\n`currentColor`, so it tints with the surrounding text colour.'}}}},o={},s={render:()=>(0,i.jsxs)(`div`,{className:`flex items-center gap-6`,children:[(0,i.jsx)(r,{className:`size-4`}),(0,i.jsx)(r,{className:`size-6`}),(0,i.jsx)(r,{className:`size-8`})]})},c={render:()=>(0,i.jsxs)(`div`,{className:`flex items-center gap-6`,children:[(0,i.jsx)(r,{className:`size-6`,style:{color:`var(--role-interactive-primary)`}}),(0,i.jsx)(r,{className:`size-6`,style:{color:`var(--role-fg-neutral-subtle)`}})]})},l=[`Default`,`Sizes`,`Tinted`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source},description:{story:`The default 16px spinner.`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-6">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
}`,...s.parameters?.docs?.source},description:{story:"Resize via `size-*` utilities.",...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-6">
      <Spinner className="size-6" style={{
      color: 'var(--role-interactive-primary)'
    }} />
      <Spinner className="size-6" style={{
      color: 'var(--role-fg-neutral-subtle)'
    }} />
    </div>
}`,...c.parameters?.docs?.source},description:{story:"Inherits `currentColor` — set a role colour on the element (or its parent).",...c.parameters?.docs?.description}}}})))()}u();export{o as Default,s as Sizes,c as Tinted,l as __namedExportsOrder,a as default};