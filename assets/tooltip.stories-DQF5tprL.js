import{Z as e}from"./iframe-CPBTUrEW.js";import{B as t}from"./button-_tNb_vhW.js";import{T as m}from"./tooltip-BTPUOBKh.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-ydzPhmoe.js";import"./index-DrK2s9b6.js";import"./z-index-CsvJFlOP.js";const R={title:"Components/Tooltip",component:m,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Displays contextual information on hover or focus, positioned via Radix Popper with collision-aware placement."}}},argTypes:{placement:{control:"select",options:["top","top-start","top-end","bottom","bottom-start","bottom-end","left","left-start","left-end","right","right-start","right-end"]},size:{control:"select",options:["sm","md","lg"]},tone:{control:"select",options:["default","dark","info","warning","danger","success"]},arrow:{control:"boolean"}}},r={args:{title:"Save your changes",children:e.jsx(t,{variant:"outline",size:"sm",children:"Hover me"})}},n={args:{title:"This action cannot be undone",tone:"danger",arrow:!0,children:e.jsx(t,{variant:"outline",size:"sm",children:"Delete"})}},s={args:{title:"Saved successfully",tone:"success",children:e.jsx(t,{variant:"outline",size:"sm",children:"Save"})}},a={args:{title:"Appears below the trigger",placement:"bottom",children:e.jsx(t,{variant:"outline",size:"sm",children:"Hover me"})}},i={args:{title:"No arrow pointer",arrow:!1,children:e.jsx(t,{variant:"outline",size:"sm",children:"Hover me"})}},c={args:{title:"A larger tooltip for more prominent hints",size:"lg",children:e.jsx(t,{variant:"outline",size:"sm",children:"Hover me"})}},l={render:()=>e.jsx("div",{className:"grid grid-cols-3 gap-8 p-16",children:["top-start","top","top-end","left","right","bottom-start","bottom","bottom-end"].map(o=>e.jsx(m,{title:o,placement:o,children:e.jsx(t,{variant:"outline",size:"sm",children:o})},o))})},W=["Default","DangerTone","SuccessTone","BottomPlacement","WithoutArrow","LargeSize","AllPlacements"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Save your changes',
    children: <Button variant="outline" size="sm">Hover me</Button>
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'This action cannot be undone',
    tone: 'danger',
    arrow: true,
    children: <Button variant="outline" size="sm">Delete</Button>
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Saved successfully',
    tone: 'success',
    children: <Button variant="outline" size="sm">Save</Button>
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Appears below the trigger',
    placement: 'bottom',
    children: <Button variant="outline" size="sm">Hover me</Button>
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'No arrow pointer',
    arrow: false,
    children: <Button variant="outline" size="sm">Hover me</Button>
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'A larger tooltip for more prominent hints',
    size: 'lg',
    children: <Button variant="outline" size="sm">Hover me</Button>
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-3 gap-8 p-16">
      {(['top-start', 'top', 'top-end', 'left', 'right', 'bottom-start', 'bottom', 'bottom-end'] as const).map(placement => <Tooltip key={placement} title={placement} placement={placement}>
            <Button variant="outline" size="sm">{placement}</Button>
          </Tooltip>)}
    </div>
}`,...l.parameters?.docs?.source}}};export{l as AllPlacements,a as BottomPlacement,n as DangerTone,r as Default,c as LargeSize,s as SuccessTone,i as WithoutArrow,W as __namedExportsOrder,R as default};
