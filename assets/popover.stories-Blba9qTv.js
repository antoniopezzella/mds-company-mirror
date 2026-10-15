import{Z as e}from"./iframe-CPBTUrEW.js";import{B as t}from"./button-_tNb_vhW.js";import{P as n,b as s,a as i}from"./popover-B1Y9L4uz.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-ydzPhmoe.js";const A={title:"Components/Popover",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`# Popover

No MDS/Figma spec exists for this component — built to standard headless-UI conventions, styled with this repo's \`getRoleColor()\`
role tokens.`}}}},o={render:()=>e.jsxs(n,{children:[e.jsx(s,{asChild:!0,children:e.jsx(t,{variant:"outline",size:"sm",children:"Open popover"})}),e.jsx(i,{children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h4",{className:"text-sm font-semibold",children:"Dimensions"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Set the dimensions for the layer."})]})})]})},r={render:()=>e.jsxs(n,{children:[e.jsx(s,{asChild:!0,children:e.jsx(t,{variant:"outline",size:"sm",children:"Filters"})}),e.jsx(i,{align:"end",children:e.jsx("p",{className:"text-sm",children:"Aligned to the end of the trigger."})})]})},E=["Default","AlignedEnd"];o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">Filters</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <p className="text-sm">Aligned to the end of the trigger.</p>
      </PopoverContent>
    </Popover>
}`,...r.parameters?.docs?.source}}};export{r as AlignedEnd,o as Default,E as __namedExportsOrder,A as default};
