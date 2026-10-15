import{Z as e,a5 as d}from"./iframe-CPBTUrEW.js";import{B as s}from"./button-_tNb_vhW.js";import{D as p,g as m,b as u,e as g,f as h,c as D,d as C,a as f,M as x}from"./dialog-C1dHRi-6.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./index-BiNW7bVc.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-ydzPhmoe.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./x-Bk_wSNf2.js";const Z={title:"Components/Dialog",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# Dialog / Modal\n\nRadix `Dialog` is composable by design — you assemble header/body/footer\nyourself via `DialogHeader`/`DialogTitle`/`DialogDescription`/`DialogFooter`,\nrather than being locked into MUI's fixed title/content/actions slots.\nThat's the primary, recommended API here.\n\n`Modal` (bottom of this file) is a thin convenience wrapper over the same\nprimitives for teams migrating from the MUI `Modal`'s\n`open`/`onClose`/`title`/`footer` prop shape."}}}},t={render:()=>e.jsxs(p,{children:[e.jsx(m,{asChild:!0,children:e.jsx(s,{variant:"outline",size:"sm",children:"Open dialog"})}),e.jsxs(u,{children:[e.jsxs(g,{children:[e.jsx(h,{children:"Edit policy details"}),e.jsx(D,{children:"Make changes to the policy here. Click save when done."})]}),e.jsx("p",{className:"text-sm",children:"Composable body content goes here — any layout you want."}),e.jsxs(C,{children:[e.jsx(f,{asChild:!0,children:e.jsx(s,{variant:"outline",size:"sm",children:"Cancel"})}),e.jsx(s,{variant:"primary",size:"sm",children:"Save changes"})]})]})]})},a={render:()=>e.jsxs(p,{children:[e.jsx(m,{asChild:!0,children:e.jsx(s,{variant:"outline",size:"sm",children:"Open dialog"})}),e.jsxs(u,{children:[e.jsx(g,{children:e.jsx(h,{children:"Heads up"})}),e.jsx("p",{className:"text-sm",children:"A simple informational dialog with no footer actions."})]})]})},r={render:()=>e.jsx("div",{className:"flex gap-2",children:["sm","md","lg"].map(n=>e.jsxs(p,{children:[e.jsx(m,{asChild:!0,children:e.jsx(s,{variant:"outline",size:"sm",className:"capitalize",children:n})}),e.jsxs(u,{size:n,children:[e.jsx(g,{children:e.jsxs(h,{children:[n.toUpperCase()," dialog"]})}),e.jsxs("p",{className:"text-sm",children:['Content sized to the "',n,'" preset.']})]})]},n))})},i={render:()=>{const[n,o]=d.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"outline",size:"sm",onClick:()=>o(!0),children:"Open modal"}),e.jsx(x,{open:n,onClose:()=>o(!1),title:"Delete policy",description:"This action cannot be undone.",footer:e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"outline",size:"sm",onClick:()=>o(!1),children:"Cancel"}),e.jsx(s,{variant:"primary",destructive:!0,size:"sm",onClick:()=>o(!1),children:"Delete"})]}),children:e.jsx("p",{className:"text-sm",children:"Are you sure you want to delete this policy? This cannot be undone."})})]})}},l={render:()=>{const[n,o]=d.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"outline",size:"sm",onClick:()=>o(!0),children:"Open fullscreen modal"}),e.jsx(x,{open:n,onClose:()=>o(!1),title:"Fullscreen review",size:"FullScreen",children:e.jsx("p",{className:"text-sm",children:"Fullscreen modals are useful for document review or complex forms."})})]})}},c={render:()=>{const[n,o]=d.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"outline",size:"sm",onClick:()=>o(!0),children:"Open modal"}),e.jsx(x,{open:n,onClose:()=>o(!1),hasHeader:!1,children:e.jsx("p",{className:"text-sm",children:"A modal with no header — just body content."})})]})}},q=["Composable","NoFooter","Sizes","ModalDefault","ModalFullScreen","ModalNoHeader"];t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open fullscreen modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Fullscreen review" size="FullScreen">
          <p className="text-sm">Fullscreen modals are useful for document review or complex forms.</p>
        </Modal>
      </>;
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} hasHeader={false}>
          <p className="text-sm">A modal with no header — just body content.</p>
        </Modal>
      </>;
  }
}`,...c.parameters?.docs?.source}}};export{t as Composable,i as ModalDefault,l as ModalFullScreen,c as ModalNoHeader,a as NoFooter,r as Sizes,q as __namedExportsOrder,Z as default};
