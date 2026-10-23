import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,i as r,n as i,o as a,r as o,t as s}from"./underline-Bqe2shyg.js";import{n as c,t as l}from"./toggle-fhheSpIS.js";var u,d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{a(),r(),i(),c(),u=t(),d={title:`Components/Toggle`,component:l,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`# Toggle

No MDS/Figma spec exists for this component — built to standard headless-UI conventions, styled with \`getRoleColor()\`.`}}},argTypes:{variant:{control:`select`,options:[`default`,`outline`]},size:{control:`select`,options:[`sm`,`md`,`lg`]}}},f={args:{"aria-label":`Bold`,children:(0,u.jsx)(n,{className:`h-4 w-4`})}},p={args:{variant:`outline`,"aria-label":`Italic`,children:(0,u.jsx)(o,{className:`h-4 w-4`})}},m={args:{defaultPressed:!0,"aria-label":`Underline`,children:(0,u.jsx)(s,{className:`h-4 w-4`})}},h={args:{children:`Bold`}},g={args:{disabled:!0,"aria-label":`Bold`,children:(0,u.jsx)(n,{className:`h-4 w-4`})}},_={render:()=>(0,u.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,u.jsx)(l,{size:`sm`,"aria-label":`Bold (small)`,children:(0,u.jsx)(n,{className:`h-3.5 w-3.5`})}),(0,u.jsx)(l,{size:`md`,"aria-label":`Bold (medium)`,children:(0,u.jsx)(n,{className:`h-4 w-4`})}),(0,u.jsx)(l,{size:`lg`,"aria-label":`Bold (large)`,children:(0,u.jsx)(n,{className:`h-5 w-5`})})]})},v=[`Default`,`Outline`,`Pressed`,`WithText`,`Disabled`,`Sizes`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  // Icon-only toggles carry no text, so they need an explicit accessible
  // name — these stories are the reference consumers copy from.
  args: {
    'aria-label': 'Bold',
    children: <Bold className="h-4 w-4" />
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    'aria-label': 'Italic',
    children: <Italic className="h-4 w-4" />
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    defaultPressed: true,
    'aria-label': 'Underline',
    children: <Underline className="h-4 w-4" />
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Bold'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    'aria-label': 'Bold',
    children: <Bold className="h-4 w-4" />
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Bold (small)"><Bold className="h-3.5 w-3.5" /></Toggle>
      <Toggle size="md" aria-label="Bold (medium)"><Bold className="h-4 w-4" /></Toggle>
      <Toggle size="lg" aria-label="Bold (large)"><Bold className="h-5 w-5" /></Toggle>
    </div>
}`,..._.parameters?.docs?.source}}}})))()}y();export{f as Default,g as Disabled,p as Outline,m as Pressed,_ as Sizes,h as WithText,v as __namedExportsOrder,d as default};