import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./log-out-CVVypb3K.js";import{n as i,t as a}from"./settings-B6ZPIfMm.js";import{n as o,t as s}from"./user-NoPOQMOw.js";import{n as c,t as l}from"./button-DatWLSj0.js";import{a as u,c as d,d as f,i as p,r as m,t as h,u as g}from"./dropdown-menu-XOwViH9b.js";var _,v,y,b,x,S;function C(){return(C=e((()=>{c(),n(),i(),o(),f(),_=t(),v={title:`Components/DropdownMenu`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# DropdownMenu\n\nRadix-based menu with proper ARIA semantics, roving tabindex, arrow-key\nnavigation, and type-ahead — the primitive `Header`'s profile menu is\nbuilt on, in place of a hand-rolled `Popover` + `MenuItem` list."}}}},y={render:()=>(0,_.jsxs)(h,{children:[(0,_.jsx)(g,{asChild:!0,children:(0,_.jsx)(l,{variant:`outline`,size:`sm`,children:`Open menu`})}),(0,_.jsxs)(m,{children:[(0,_.jsx)(u,{children:`My Account`}),(0,_.jsx)(d,{}),(0,_.jsxs)(p,{children:[(0,_.jsx)(s,{className:`h-4 w-4`}),` Profile`]}),(0,_.jsxs)(p,{children:[(0,_.jsx)(a,{className:`h-4 w-4`}),` Settings`]}),(0,_.jsx)(d,{}),(0,_.jsxs)(p,{tone:`danger`,children:[(0,_.jsx)(r,{className:`h-4 w-4`}),` Sign out`]})]})]})},b={render:()=>(0,_.jsxs)(h,{children:[(0,_.jsx)(g,{asChild:!0,children:(0,_.jsx)(l,{variant:`outline`,size:`sm`,children:`Options`})}),(0,_.jsxs)(m,{align:`end`,children:[(0,_.jsx)(p,{children:`Edit`}),(0,_.jsx)(p,{children:`Duplicate`}),(0,_.jsx)(p,{children:`Archive`}),(0,_.jsx)(d,{}),(0,_.jsx)(p,{tone:`danger`,children:`Delete`})]})]})},x={render:()=>(0,_.jsxs)(h,{children:[(0,_.jsx)(g,{asChild:!0,children:(0,_.jsx)(l,{variant:`outline`,size:`sm`,children:`Actions`})}),(0,_.jsxs)(m,{children:[(0,_.jsx)(p,{children:`Export CSV`}),(0,_.jsx)(p,{disabled:!0,children:`Export PDF (coming soon)`})]})]})},S=[`Default`,`AlignedEnd`,`WithDisabledItem`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Export CSV</DropdownMenuItem>
        <DropdownMenuItem disabled>Export PDF (coming soon)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...x.parameters?.docs?.source}}}})))()}C();export{b as AlignedEnd,y as Default,x as WithDisabledItem,S as __namedExportsOrder,v as default};