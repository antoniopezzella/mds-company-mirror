import{Z as r}from"./iframe-CPBTUrEW.js";import{M as o,a as n,b as s}from"./marker-QLQD5vmK.js";import{I as m}from"./info-XF5axP9F.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dk2lMVn3.js";import"./index-DTX6ga2Q.js";import"./utils-CURkPv3a.js";import"./createLucideIcon-BnpAccaP.js";const M={title:"Components/Marker",component:o,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`# Marker

In-transcript status updates, system notes, and date/thread separators —
the smallest of the chat-components family. Pre-existing in this repo,
had no Storybook story until now.`}}},argTypes:{variant:{control:"select",options:["default","separator","border"]}}},e={render:()=>r.jsxs(o,{className:"max-w-md",children:[r.jsx(s,{children:r.jsx(m,{})}),r.jsx(n,{children:"Antonio Pezzella joined the conversation."})]})},a={name:"Separator variant",render:()=>r.jsx(o,{variant:"separator",className:"max-w-md",children:r.jsx(n,{children:"Today"})})},t={name:"Border variant",render:()=>r.jsxs("div",{className:"max-w-md",children:[r.jsx(o,{variant:"border",children:r.jsx(n,{children:"Claim CLM-1042 — Property"})}),r.jsx("p",{className:"pt-3 text-sm text-muted-foreground",children:"Content following the bordered section marker."})]})},h=["SystemNote","DateSeparator","SectionBorder"];e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <Marker className="max-w-md">
      <MarkerIcon>
        <InfoIcon />
      </MarkerIcon>
      <MarkerContent>Antonio Pezzella joined the conversation.</MarkerContent>
    </Marker>
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Separator variant',
  render: () => <Marker variant="separator" className="max-w-md">
      <MarkerContent>Today</MarkerContent>
    </Marker>
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Border variant',
  render: () => <div className="max-w-md">
      <Marker variant="border">
        <MarkerContent>Claim CLM-1042 — Property</MarkerContent>
      </Marker>
      <p className="pt-3 text-sm text-muted-foreground">Content following the bordered section marker.</p>
    </div>
}`,...t.parameters?.docs?.source}}};export{a as DateSeparator,t as SectionBorder,e as SystemNote,h as __namedExportsOrder,M as default};
