import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./button-DatWLSj0.js";import{a as i,c as a,i as o,l as s,n as c,o as l,r as u,s as d,t as f}from"./sheet-CB8WOzxB.js";var p,m,h,g,_,v,y;function b(){return(b=e((()=>{n(),s(),p=t(),m={title:`Components/Sheet`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# Sheet\n\nNo MDS/Figma spec exists for this component — built directly on a side-anchored Dialog variant, reusing\n`@radix-ui/react-dialog` and styled with `getRoleColor()`."}}}},h={render:()=>(0,p.jsxs)(f,{children:[(0,p.jsx)(a,{asChild:!0,children:(0,p.jsx)(r,{variant:`outline`,size:`sm`,children:`Open (right)`})}),(0,p.jsxs)(u,{side:`right`,children:[(0,p.jsxs)(l,{children:[(0,p.jsx)(d,{children:`Edit filters`}),(0,p.jsx)(o,{children:`Adjust the filters applied to the policy list.`})]}),(0,p.jsx)(`p`,{className:`text-sm`,children:`Sheet body content goes here.`}),(0,p.jsxs)(i,{children:[(0,p.jsx)(c,{asChild:!0,children:(0,p.jsx)(r,{variant:`outline`,size:`sm`,children:`Cancel`})}),(0,p.jsx)(r,{variant:`primary`,size:`sm`,children:`Apply`})]})]})]})},g={render:()=>(0,p.jsxs)(f,{children:[(0,p.jsx)(a,{asChild:!0,children:(0,p.jsx)(r,{variant:`outline`,size:`sm`,children:`Open (left)`})}),(0,p.jsxs)(u,{side:`left`,children:[(0,p.jsx)(l,{children:(0,p.jsx)(d,{children:`Navigation`})}),(0,p.jsx)(`p`,{className:`text-sm`,children:`Useful for a mobile nav drawer.`})]})]})},_={render:()=>(0,p.jsxs)(f,{children:[(0,p.jsx)(a,{asChild:!0,children:(0,p.jsx)(r,{variant:`outline`,size:`sm`,children:`Open (top)`})}),(0,p.jsxs)(u,{side:`top`,children:[(0,p.jsx)(l,{children:(0,p.jsx)(d,{children:`Announcement`})}),(0,p.jsx)(`p`,{className:`text-sm`,children:`Slides down from the top.`})]})]})},v={render:()=>(0,p.jsxs)(f,{children:[(0,p.jsx)(a,{asChild:!0,children:(0,p.jsx)(r,{variant:`outline`,size:`sm`,children:`Open (bottom)`})}),(0,p.jsxs)(u,{side:`bottom`,children:[(0,p.jsx)(l,{children:(0,p.jsx)(d,{children:`Quick actions`})}),(0,p.jsx)(`p`,{className:`text-sm`,children:`Slides up from the bottom — useful for mobile action sheets.`})]})]})},y=[`Right`,`Left`,`Top`,`Bottom`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}}})))()}b();export{v as Bottom,g as Left,h as Right,_ as Top,y as __namedExportsOrder,m as default};