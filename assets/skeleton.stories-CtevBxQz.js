import{Z as e}from"./iframe-CPBTUrEW.js";import{S as a}from"./skeleton-C-ZAhKi4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";const h={title:"Components/Skeleton",component:a,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"# Skeleton\n\n`getRoleColor()`-driven counterpart to the MUI `Skeleton`. Same\n`variant`/`width`/`height`/`animation` API as the MUI twin."}}},argTypes:{variant:{control:"select",options:["text","rectangular","rounded","circular"]},animation:{control:"select",options:["pulse","wave",!1]}}},r={args:{variant:"text",width:200}},t={args:{variant:"rectangular",width:240,height:120}},n={args:{variant:"rounded",width:240,height:120}},s={args:{variant:"circular",width:48,height:48}},o={args:{variant:"rectangular",width:240,height:80,animation:!1}},i={render:()=>e.jsxs("div",{className:"flex w-[280px] flex-col gap-3",children:[e.jsx(a,{variant:"rounded",height:140}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(a,{variant:"circular",width:40,height:40}),e.jsxs("div",{className:"flex flex-1 flex-col gap-2",children:[e.jsx(a,{variant:"text",width:"60%"}),e.jsx(a,{variant:"text",width:"40%"})]})]})]})},g=["Text","Rectangular","Rounded","Circular","NoAnimation","CardPlaceholder"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'text',
    width: 200
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'rectangular',
    width: 240,
    height: 120
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'rounded',
    width: 240,
    height: 120
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'circular',
    width: 48,
    height: 48
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'rectangular',
    width: 240,
    height: 80,
    animation: false
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};export{i as CardPlaceholder,s as Circular,o as NoAnimation,t as Rectangular,n as Rounded,r as Text,g as __namedExportsOrder,h as default};
