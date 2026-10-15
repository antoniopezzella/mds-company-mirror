import{Z as e}from"./iframe-CPBTUrEW.js";import{B as t}from"./button-_tNb_vhW.js";import{S as o,g as a,b as h,e as l,f as d,c,d as m,a as p}from"./sheet-Cxy80Rhz.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./index-BiNW7bVc.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-ydzPhmoe.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./x-Bk_wSNf2.js";const k={title:"Components/Sheet",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# Sheet\n\nNo MDS/Figma spec exists for this component — built directly on a side-anchored Dialog variant, reusing\n`@radix-ui/react-dialog` and styled with `getRoleColor()`."}}}},r={render:()=>e.jsxs(o,{children:[e.jsx(a,{asChild:!0,children:e.jsx(t,{variant:"outline",size:"sm",children:"Open (right)"})}),e.jsxs(h,{side:"right",children:[e.jsxs(l,{children:[e.jsx(d,{children:"Edit filters"}),e.jsx(c,{children:"Adjust the filters applied to the policy list."})]}),e.jsx("p",{className:"text-sm",children:"Sheet body content goes here."}),e.jsxs(m,{children:[e.jsx(p,{asChild:!0,children:e.jsx(t,{variant:"outline",size:"sm",children:"Cancel"})}),e.jsx(t,{variant:"primary",size:"sm",children:"Apply"})]})]})]})},n={render:()=>e.jsxs(o,{children:[e.jsx(a,{asChild:!0,children:e.jsx(t,{variant:"outline",size:"sm",children:"Open (left)"})}),e.jsxs(h,{side:"left",children:[e.jsx(l,{children:e.jsx(d,{children:"Navigation"})}),e.jsx("p",{className:"text-sm",children:"Useful for a mobile nav drawer."})]})]})},s={render:()=>e.jsxs(o,{children:[e.jsx(a,{asChild:!0,children:e.jsx(t,{variant:"outline",size:"sm",children:"Open (top)"})}),e.jsxs(h,{side:"top",children:[e.jsx(l,{children:e.jsx(d,{children:"Announcement"})}),e.jsx("p",{className:"text-sm",children:"Slides down from the top."})]})]})},i={render:()=>e.jsxs(o,{children:[e.jsx(a,{asChild:!0,children:e.jsx(t,{variant:"outline",size:"sm",children:"Open (bottom)"})}),e.jsxs(h,{side:"bottom",children:[e.jsx(l,{children:e.jsx(d,{children:"Quick actions"})}),e.jsx("p",{className:"text-sm",children:"Slides up from the bottom — useful for mobile action sheets."})]})]})},L=["Right","Left","Top","Bottom"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Open (right)</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit filters</SheetTitle>
          <SheetDescription>Adjust the filters applied to the policy list.</SheetDescription>
        </SheetHeader>
        <p className="text-sm">Sheet body content goes here.</p>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </SheetClose>
          <Button variant="primary" size="sm">Apply</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Open (left)</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <p className="text-sm">Useful for a mobile nav drawer.</p>
      </SheetContent>
    </Sheet>
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Open (top)</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Announcement</SheetTitle>
        </SheetHeader>
        <p className="text-sm">Slides down from the top.</p>
      </SheetContent>
    </Sheet>
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Open (bottom)</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick actions</SheetTitle>
        </SheetHeader>
        <p className="text-sm">Slides up from the bottom — useful for mobile action sheets.</p>
      </SheetContent>
    </Sheet>
}`,...i.parameters?.docs?.source}}};export{i as Bottom,n as Left,r as Right,s as Top,L as __namedExportsOrder,k as default};
