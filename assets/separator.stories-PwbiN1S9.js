import{Z as e}from"./iframe-CPBTUrEW.js";import{D as s,S as p}from"./separator-Cz9zTVn9.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DbquDQCT.js";import"./index-DTX6ga2Q.js";import"./utils-CURkPv3a.js";const u={title:"Components/Separator",component:s,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"# Separator / Divider\n\n`Separator` (built on `@radix-ui/react-separator`) is the primary\nprimitive. `Divider` is a convenience wrapper matching the MUI `Divider`'s\n`orientation`/`variant`/`label`/`labelPosition`/`dashed` API, including\nan optional centered/start/end label the raw Separator doesn't support."}}}},r={render:a=>e.jsxs("div",{className:"w-[320px]",children:[e.jsx("p",{className:"text-sm",children:"Section one"}),e.jsx(s,{...a}),e.jsx("p",{className:"text-sm",children:"Section two"})]})},t={render:a=>e.jsxs("div",{className:"w-[320px]",children:[e.jsx("p",{className:"text-sm",children:"Section one"}),e.jsx(s,{...a,label:"OR"}),e.jsx("p",{className:"text-sm",children:"Section two"})]})},n={render:a=>e.jsx("div",{className:"w-[320px]",children:e.jsx(s,{...a,label:"Recent",labelPosition:"start"})})},o={render:a=>e.jsx("div",{className:"w-[320px]",children:e.jsx(s,{...a,dashed:!0})})},i={render:()=>e.jsxs("div",{className:"flex h-10 items-center gap-3",children:[e.jsx("span",{className:"text-sm",children:"Home"}),e.jsx(s,{orientation:"vertical"}),e.jsx("span",{className:"text-sm",children:"Policies"}),e.jsx(s,{orientation:"vertical"}),e.jsx("span",{className:"text-sm",children:"Claims"})]})},c={render:()=>e.jsxs("div",{className:"w-[320px] space-y-4",children:[e.jsx("p",{className:"text-sm",children:"Composable Separator (no label support)"}),e.jsx(p,{}),e.jsx("p",{className:"text-sm",children:"Second block"})]})},S=["Horizontal","WithLabel","LabelStart","Dashed","Vertical","RawSeparator"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <p className="text-sm">Section one</p>
      <Divider {...args} />
      <p className="text-sm">Section two</p>
    </div>
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <p className="text-sm">Section one</p>
      <Divider {...args} label="OR" />
      <p className="text-sm">Section two</p>
    </div>
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <Divider {...args} label="Recent" labelPosition="start" />
    </div>
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <Divider {...args} dashed />
    </div>
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex h-10 items-center gap-3">
      <span className="text-sm">Home</span>
      <Divider orientation="vertical" />
      <span className="text-sm">Policies</span>
      <Divider orientation="vertical" />
      <span className="text-sm">Claims</span>
    </div>
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[320px] space-y-4">
      <p className="text-sm">Composable Separator (no label support)</p>
      <Separator />
      <p className="text-sm">Second block</p>
    </div>
}`,...c.parameters?.docs?.source}}};export{o as Dashed,r as Horizontal,n as LabelStart,c as RawSeparator,i as Vertical,t as WithLabel,S as __namedExportsOrder,u as default};
