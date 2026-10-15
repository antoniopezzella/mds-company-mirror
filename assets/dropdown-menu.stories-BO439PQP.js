import{Z as n}from"./iframe-CPBTUrEW.js";import{B as i}from"./button-_tNb_vhW.js";import{D as d,h as p,b as a,c as e,g as s,d as m}from"./dropdown-menu-B-DEwsfR.js";import{U as u}from"./user-D5NxaQZ-.js";import{S as c}from"./settings-NHNxKTBP.js";import{L as l}from"./log-out-DgeIUkY9.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-ydzPhmoe.js";import"./index-CQZ-MLQt.js";import"./index-DbquDQCT.js";import"./index-VWR8Du3y.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-CDKxNHGJ.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";import"./check-KuCy08bp.js";import"./chevron-right-BXCmPxW2.js";const G={title:"Components/DropdownMenu",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# DropdownMenu\n\nRadix-based menu with proper ARIA semantics, roving tabindex, arrow-key\nnavigation, and type-ahead — the primitive `Header`'s profile menu is\nbuilt on, in place of a hand-rolled `Popover` + `MenuItem` list."}}}},o={render:()=>n.jsxs(d,{children:[n.jsx(p,{asChild:!0,children:n.jsx(i,{variant:"outline",size:"sm",children:"Open menu"})}),n.jsxs(a,{children:[n.jsx(m,{children:"My Account"}),n.jsx(s,{}),n.jsxs(e,{children:[n.jsx(u,{className:"h-4 w-4"})," Profile"]}),n.jsxs(e,{children:[n.jsx(c,{className:"h-4 w-4"})," Settings"]}),n.jsx(s,{}),n.jsxs(e,{tone:"danger",children:[n.jsx(l,{className:"h-4 w-4"})," Sign out"]})]})]})},r={render:()=>n.jsxs(d,{children:[n.jsx(p,{asChild:!0,children:n.jsx(i,{variant:"outline",size:"sm",children:"Options"})}),n.jsxs(a,{align:"end",children:[n.jsx(e,{children:"Edit"}),n.jsx(e,{children:"Duplicate"}),n.jsx(e,{children:"Archive"}),n.jsx(s,{}),n.jsx(e,{tone:"danger",children:"Delete"})]})]})},t={render:()=>n.jsxs(d,{children:[n.jsx(p,{asChild:!0,children:n.jsx(i,{variant:"outline",size:"sm",children:"Actions"})}),n.jsxs(a,{children:[n.jsx(e,{children:"Export CSV"}),n.jsx(e,{disabled:!0,children:"Export PDF (coming soon)"})]})]})},J=["Default","AlignedEnd","WithDisabledItem"];o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="h-4 w-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger">
          <LogOut className="h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Archive</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Export CSV</DropdownMenuItem>
        <DropdownMenuItem disabled>Export PDF (coming soon)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...t.parameters?.docs?.source}}};export{r as AlignedEnd,o as Default,t as WithDisabledItem,J as __namedExportsOrder,G as default};
