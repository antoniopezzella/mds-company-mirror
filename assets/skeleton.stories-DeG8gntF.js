import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./skeleton-BSqvLcKJ.js";var i,a,o,s,c,l,u,d,f;function p(){return(p=e((()=>{n(),i=t(),a={title:`Components/Skeleton`,component:r,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"# Skeleton\n\n`getRoleColor()`-driven counterpart to the MUI `Skeleton`. Same\n`variant`/`width`/`height`/`animation` API as the MUI twin."}}},argTypes:{variant:{control:`select`,options:[`text`,`rectangular`,`rounded`,`circular`]},animation:{control:`select`,options:[`pulse`,`wave`,!1]}}},o={args:{variant:`text`,width:200}},s={args:{variant:`rectangular`,width:240,height:120}},c={args:{variant:`rounded`,width:240,height:120}},l={args:{variant:`circular`,width:48,height:48}},u={args:{variant:`rectangular`,width:240,height:80,animation:!1}},d={render:()=>(0,i.jsxs)(`div`,{className:`flex w-[280px] flex-col gap-3`,children:[(0,i.jsx)(r,{variant:`rounded`,height:140}),(0,i.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,i.jsx)(r,{variant:`circular`,width:40,height:40}),(0,i.jsxs)(`div`,{className:`flex flex-1 flex-col gap-2`,children:[(0,i.jsx)(r,{variant:`text`,width:`60%`}),(0,i.jsx)(r,{variant:`text`,width:`40%`})]})]})]})},f=[`Text`,`Rectangular`,`Rounded`,`Circular`,`NoAnimation`,`CardPlaceholder`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'text',
    width: 200
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'rectangular',
    width: 240,
    height: 120
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'rounded',
    width: 240,
    height: 120
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'circular',
    width: 48,
    height: 48
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'rectangular',
    width: 240,
    height: 80,
    animation: false
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[280px] flex-col gap-3">
      <Skeleton variant="rounded" height={140} />
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
    </div>
}`,...d.parameters?.docs?.source}}}})))()}p();export{d as CardPlaceholder,l as Circular,u as NoAnimation,s as Rectangular,c as Rounded,o as Text,f as __namedExportsOrder,a as default};