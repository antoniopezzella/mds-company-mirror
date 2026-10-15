import{Z as e}from"./iframe-CPBTUrEW.js";import{T as i,B as a,I as c,U as d}from"./toggle-BsRKwtYP.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-BnpAccaP.js";import"./index-B2KxKFY1.js";import"./index-ydzPhmoe.js";import"./index-CQZ-MLQt.js";import"./index-DbquDQCT.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";const T={title:"Components/Toggle",component:i,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# Toggle\n\nNo MDS/Figma spec exists for this component — built to standard headless-UI conventions, styled with `getRoleColor()`."}}},argTypes:{variant:{control:"select",options:["default","outline"]},size:{control:"select",options:["sm","md","lg"]}}},s={args:{"aria-label":"Bold",children:e.jsx(a,{className:"h-4 w-4"})}},r={args:{variant:"outline","aria-label":"Italic",children:e.jsx(c,{className:"h-4 w-4"})}},l={args:{defaultPressed:!0,"aria-label":"Underline",children:e.jsx(d,{className:"h-4 w-4"})}},o={args:{children:"Bold"}},n={args:{disabled:!0,"aria-label":"Bold",children:e.jsx(a,{className:"h-4 w-4"})}},t={render:()=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(i,{size:"sm","aria-label":"Bold (small)",children:e.jsx(a,{className:"h-3.5 w-3.5"})}),e.jsx(i,{size:"md","aria-label":"Bold (medium)",children:e.jsx(a,{className:"h-4 w-4"})}),e.jsx(i,{size:"lg","aria-label":"Bold (large)",children:e.jsx(a,{className:"h-5 w-5"})})]})},j=["Default","Outline","Pressed","WithText","Disabled","Sizes"];s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  // Icon-only toggles carry no text, so they need an explicit accessible
  // name — these stories are the reference consumers copy from.
  args: {
    'aria-label': 'Bold',
    children: <Bold className="h-4 w-4" />
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    'aria-label': 'Italic',
    children: <Italic className="h-4 w-4" />
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    defaultPressed: true,
    'aria-label': 'Underline',
    children: <Underline className="h-4 w-4" />
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Bold'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    'aria-label': 'Bold',
    children: <Bold className="h-4 w-4" />
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Bold (small)"><Bold className="h-3.5 w-3.5" /></Toggle>
      <Toggle size="md" aria-label="Bold (medium)"><Bold className="h-4 w-4" /></Toggle>
      <Toggle size="lg" aria-label="Bold (large)"><Bold className="h-5 w-5" /></Toggle>
    </div>
}`,...t.parameters?.docs?.source}}};export{s as Default,n as Disabled,r as Outline,l as Pressed,t as Sizes,o as WithText,j as __namedExportsOrder,T as default};
