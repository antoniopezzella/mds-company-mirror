import{Z as a}from"./iframe-CPBTUrEW.js";import{A as s}from"./avatar-XjDTizZa.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D-VHP59e.js";import"./index-DGsydKWp.js";import"./index-CQZ-MLQt.js";import"./index-DbquDQCT.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./prop-compat-ClktB6p5.js";const y={title:"Components/Avatar",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"User profile image with initials fallback and an optional status indicator."}}},argTypes:{size:{control:"select",options:["sm","md","lg","xl"]},variant:{control:"select",options:["circular","rounded","square"]},tone:{control:"select",options:["default","primary","secondary","success","warning","danger"]},status:{control:"select",options:[void 0,"online","offline","away","busy"]}}},e={args:{initials:"AP"}},i={args:{src:"https://i.pravatar.cc/150?img=12",alt:"Jane Doe"}},t={args:{src:"https://example.invalid/nonexistent.jpg",initials:"JD",alt:"Jane Doe"}},r={render:()=>a.jsxs("div",{className:"flex items-end gap-3",children:[a.jsx(s,{initials:"S",size:"sm"}),a.jsx(s,{initials:"M",size:"md"}),a.jsx(s,{initials:"L",size:"lg"}),a.jsx(s,{initials:"XL",size:"xl"})]})},n={render:()=>a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsx(s,{initials:"D",tone:"default"}),a.jsx(s,{initials:"P",tone:"primary"}),a.jsx(s,{initials:"S",tone:"secondary"}),a.jsx(s,{initials:"OK",tone:"success"}),a.jsx(s,{initials:"!",tone:"warning"}),a.jsx(s,{initials:"X",tone:"danger"})]})},o={render:()=>a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsx(s,{initials:"C",variant:"circular"}),a.jsx(s,{initials:"R",variant:"rounded"}),a.jsx(s,{initials:"S",variant:"square"})]})},l={render:()=>a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsx(s,{initials:"ON",status:"online"}),a.jsx(s,{initials:"AW",status:"away"}),a.jsx(s,{initials:"BU",status:"busy"}),a.jsx(s,{initials:"OF",status:"offline"})]})},c={args:{initials:"AP",onClick:()=>alert("Avatar clicked")}},h=["Initials","WithImage","BrokenImageFallsBackToInitials","Sizes","Tones","Variants","WithStatus","Clickable"];e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    initials: 'AP'
  }
}`,...e.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    alt: 'Jane Doe'
  }
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://example.invalid/nonexistent.jpg',
    initials: 'JD',
    alt: 'Jane Doe'
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-3">
      <Avatar initials="S" size="sm" />
      <Avatar initials="M" size="md" />
      <Avatar initials="L" size="lg" />
      <Avatar initials="XL" size="xl" />
    </div>
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Avatar initials="D" tone="default" />
      <Avatar initials="P" tone="primary" />
      <Avatar initials="S" tone="secondary" />
      <Avatar initials="OK" tone="success" />
      <Avatar initials="!" tone="warning" />
      <Avatar initials="X" tone="danger" />
    </div>
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Avatar initials="C" variant="circular" />
      <Avatar initials="R" variant="rounded" />
      <Avatar initials="S" variant="square" />
    </div>
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Avatar initials="ON" status="online" />
      <Avatar initials="AW" status="away" />
      <Avatar initials="BU" status="busy" />
      <Avatar initials="OF" status="offline" />
    </div>
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    initials: 'AP',
    onClick: () => alert('Avatar clicked')
  }
}`,...c.parameters?.docs?.source}}};export{t as BrokenImageFallsBackToInitials,c as Clickable,e as Initials,r as Sizes,n as Tones,o as Variants,i as WithImage,l as WithStatus,h as __namedExportsOrder,y as default};
