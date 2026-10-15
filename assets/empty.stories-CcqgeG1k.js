import{Z as e}from"./iframe-CPBTUrEW.js";import{E as n,c as r,d as a,e as o,b as m,a as i}from"./empty-DcTcGUY7.js";import{B as c}from"./button-_tNb_vhW.js";import{I as p,S as d}from"./search-x-BoD6M5tN.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./index-DTX6ga2Q.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";const v={title:"Components/Empty",component:n,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`# Empty

General-purpose empty-state primitives — not chat-specific, but pulled
in alongside the chat components for cases like "no messages yet".
Fully self-contained, no new dependencies.`}}}},s={name:"No messages (chat use case)",render:()=>e.jsx(n,{className:"max-w-md",children:e.jsxs(r,{children:[e.jsx(a,{variant:"icon",children:e.jsx(p,{})}),e.jsx(o,{children:"No messages yet"}),e.jsx(m,{children:"Start the conversation by sending a message below."})]})})},t={render:()=>e.jsxs(n,{className:"max-w-md",children:[e.jsxs(r,{children:[e.jsx(a,{variant:"icon",children:e.jsx(d,{})}),e.jsx(o,{children:"No results found"}),e.jsx(m,{children:"Try adjusting your filters or search terms."})]}),e.jsx(i,{children:e.jsx(c,{variant:"secondary",size:"sm",children:"Clear filters"})})]})},b=["NoMessages","WithAction"];s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'No messages (chat use case)',
  render: () => <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>Start the conversation by sending a message below.</EmptyDescription>
      </EmptyHeader>
    </Empty>
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try adjusting your filters or search terms.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="secondary" size="sm">
          Clear filters
        </Button>
      </EmptyContent>
    </Empty>
}`,...t.parameters?.docs?.source}}};export{s as NoMessages,t as WithAction,b as __namedExportsOrder,v as default};
