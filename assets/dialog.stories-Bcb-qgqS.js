import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./button-DatWLSj0.js";import{a,c as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p,u as m}from"./dialog-DF47Ek89.js";var h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{r(),h=t(),m(),g=n(),_={title:`Components/Dialog`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# Dialog / Modal\n\nRadix `Dialog` is composable by design — you assemble header/body/footer\nyourself via `DialogHeader`/`DialogTitle`/`DialogDescription`/`DialogFooter`,\nrather than being locked into MUI's fixed title/content/actions slots.\nThat's the primary, recommended API here.\n\n`Modal` (bottom of this file) is a thin convenience wrapper over the same\nprimitives for teams migrating from the MUI `Modal`'s\n`open`/`onClose`/`title`/`footer` prop shape."}}}},v={render:()=>(0,g.jsxs)(p,{children:[(0,g.jsx)(o,{asChild:!0,children:(0,g.jsx)(i,{variant:`outline`,size:`sm`,children:`Open dialog`})}),(0,g.jsxs)(d,{children:[(0,g.jsxs)(u,{children:[(0,g.jsx)(f,{children:`Edit policy details`}),(0,g.jsx)(s,{children:`Make changes to the policy here. Click save when done.`})]}),(0,g.jsx)(`p`,{className:`text-sm`,children:`Composable body content goes here — any layout you want.`}),(0,g.jsxs)(a,{children:[(0,g.jsx)(l,{asChild:!0,children:(0,g.jsx)(i,{variant:`outline`,size:`sm`,children:`Cancel`})}),(0,g.jsx)(i,{variant:`primary`,size:`sm`,children:`Save changes`})]})]})]})},y={render:()=>(0,g.jsxs)(p,{children:[(0,g.jsx)(o,{asChild:!0,children:(0,g.jsx)(i,{variant:`outline`,size:`sm`,children:`Open dialog`})}),(0,g.jsxs)(d,{children:[(0,g.jsx)(u,{children:(0,g.jsx)(f,{children:`Heads up`})}),(0,g.jsx)(`p`,{className:`text-sm`,children:`A simple informational dialog with no footer actions.`})]})]})},b={render:()=>(0,g.jsx)(`div`,{className:`flex gap-2`,children:[`sm`,`md`,`lg`].map(e=>(0,g.jsxs)(p,{children:[(0,g.jsx)(o,{asChild:!0,children:(0,g.jsx)(i,{variant:`outline`,size:`sm`,className:`capitalize`,children:e})}),(0,g.jsxs)(d,{size:e,children:[(0,g.jsx)(u,{children:(0,g.jsxs)(f,{children:[e.toUpperCase(),` dialog`]})}),(0,g.jsxs)(`p`,{className:`text-sm`,children:[`Content sized to the "`,e,`" preset.`]})]})]},e))})},x={render:()=>{let[e,t]=(0,h.useState)(!1);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(i,{variant:`outline`,size:`sm`,onClick:()=>t(!0),children:`Open modal`}),(0,g.jsx)(c,{open:e,onClose:()=>t(!1),title:`Delete policy`,description:`This action cannot be undone.`,footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(i,{variant:`outline`,size:`sm`,onClick:()=>t(!1),children:`Cancel`}),(0,g.jsx)(i,{variant:`primary`,destructive:!0,size:`sm`,onClick:()=>t(!1),children:`Delete`})]}),children:(0,g.jsx)(`p`,{className:`text-sm`,children:`Are you sure you want to delete this policy? This cannot be undone.`})})]})}},S={render:()=>{let[e,t]=(0,h.useState)(!1);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(i,{variant:`outline`,size:`sm`,onClick:()=>t(!0),children:`Open fullscreen modal`}),(0,g.jsx)(c,{open:e,onClose:()=>t(!1),title:`Fullscreen review`,size:`FullScreen`,children:(0,g.jsx)(`p`,{className:`text-sm`,children:`Fullscreen modals are useful for document review or complex forms.`})})]})}},C={render:()=>{let[e,t]=(0,h.useState)(!1);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(i,{variant:`outline`,size:`sm`,onClick:()=>t(!0),children:`Open modal`}),(0,g.jsx)(c,{open:e,onClose:()=>t(!1),hasHeader:!1,children:(0,g.jsx)(`p`,{className:`text-sm`,children:`A modal with no header — just body content.`})})]})}},w=[`Composable`,`NoFooter`,`Sizes`,`ModalDefault`,`ModalFullScreen`,`ModalNoHeader`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit policy details</DialogTitle>
          <DialogDescription>Make changes to the policy here. Click save when done.</DialogDescription>
        </DialogHeader>
        <p className="text-sm">Composable body content goes here — any layout you want.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </DialogClose>
          <Button variant="primary" size="sm">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Heads up</DialogTitle>
        </DialogHeader>
        <p className="text-sm">A simple informational dialog with no footer actions.</p>
      </DialogContent>
    </Dialog>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex gap-2">
      {(['sm', 'md', 'lg'] as const).map(size => <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="capitalize">{size}</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{size.toUpperCase()} dialog</DialogTitle>
            </DialogHeader>
            <p className="text-sm">Content sized to the "{size}" preset.</p>
          </DialogContent>
        </Dialog>)}
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Delete policy" description="This action cannot be undone." footer={<>
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" destructive size="sm" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </>}>
          <p className="text-sm">Are you sure you want to delete this policy? This cannot be undone.</p>
        </Modal>
      </>;
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open fullscreen modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Fullscreen review" size="FullScreen">
          <p className="text-sm">Fullscreen modals are useful for document review or complex forms.</p>
        </Modal>
      </>;
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} hasHeader={false}>
          <p className="text-sm">A modal with no header — just body content.</p>
        </Modal>
      </>;
  }
}`,...C.parameters?.docs?.source}}}})))()}T();export{v as Composable,x as ModalDefault,S as ModalFullScreen,C as ModalNoHeader,y as NoFooter,b as Sizes,w as __namedExportsOrder,_ as default};