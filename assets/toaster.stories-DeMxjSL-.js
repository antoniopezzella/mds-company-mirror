import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./button-DatWLSj0.js";import{n as i,r as a,t as o}from"./toaster-B_DJU4uc.js";import{n as s,t as c}from"./use-toast-Ju2Vd23Q.js";var l,u,d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{n(),i(),c(),l=t(),u={title:`Components/Toast`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# Toast\n\nRadix `Toast` is a queue/viewport system — call `toast()` from anywhere\nand it stacks into a shared `<Toaster />`, each with its own auto-dismiss\ntimer and swipe-to-dismiss. That's a materially better architecture than\nMUI's `Snackbar`, which is one controlled instance per call site (no\nstacking, `open` state managed manually everywhere it's used).\n\n`showSnackbar()` is a convenience wrapper matching MUI's\n`message`/`severity`/`actionText`/`onAction`/`autoHideDuration` shape, for\nteams migrating from `DSSnackbar` — but it still fires into the same\nshared queue underneath.\n\n`<Toaster />` should be mounted once near your app root; each story below\nmounts its own copy since Storybook stories are isolated."}}}},d={render:()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`button`,{className:`rounded border px-3 py-1.5 text-sm`,onClick:()=>s({title:`Scheduled: Catch up`,description:`Friday, February 10 at 5:57 PM`}),children:`Show toast`}),(0,l.jsx)(o,{})]})},f={render:()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,l.jsx)(r,{variant:`outline`,size:`sm`,onClick:()=>s({tone:`default`,description:`Default toast`}),children:`Default`}),(0,l.jsx)(r,{variant:`outline`,size:`sm`,onClick:()=>s({tone:`success`,description:`Saved successfully`}),children:`Success`}),(0,l.jsx)(r,{variant:`outline`,size:`sm`,onClick:()=>s({tone:`warning`,description:`Storage almost full`}),children:`Warning`}),(0,l.jsx)(r,{variant:`outline`,size:`sm`,onClick:()=>s({tone:`danger`,description:`Failed to save changes`}),children:`Danger`}),(0,l.jsx)(r,{variant:`outline`,size:`sm`,onClick:()=>s({tone:`info`,description:`A new version is available`}),children:`Info`})]}),(0,l.jsx)(o,{})]})},p={render:()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,l.jsx)(r,{variant:`outline`,size:`sm`,onClick:()=>s({tone:`success`,title:`Policy saved`,description:`Your changes are live for all reviewers.`,timestamp:`May 12, 2025`}),children:`Success`}),(0,l.jsx)(r,{variant:`outline`,size:`sm`,onClick:()=>s({tone:`warning`,title:`Storage almost full`,description:`You are using 92% of your available space.`,timestamp:`May 12, 2025`}),children:`Warning`})]}),(0,l.jsx)(o,{})]})},m={render:()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`button`,{className:`rounded border px-3 py-1.5 text-sm`,onClick:()=>a({message:`Email deleted`,severity:`info`,actionText:`Undo`,onAction:()=>s({description:`Delete undone`})}),children:`Delete email`}),(0,l.jsx)(o,{})]})},h={render:()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`button`,{className:`rounded border px-3 py-1.5 text-sm`,onClick:()=>{a({message:`Upload started`,severity:`info`}),a({message:`Processing image 1 of 3`,severity:`info`}),a({message:`Upload complete`,severity:`success`})},children:`Fire 3 toasts (stacked)`}),(0,l.jsx)(o,{})]})},g={render:()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r,{variant:`outline`,size:`sm`,onClick:()=>a({message:`Policy saved`,severity:`success`}),children:`Save policy`}),(0,l.jsx)(o,{})]})},_={render:()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r,{variant:`outline`,size:`sm`,onClick:()=>a({message:`Failed to save policy`,severity:`error`}),children:`Trigger error`}),(0,l.jsx)(o,{})]})},v=[`Composable`,`Tones`,`WithTimestamp`,`WithAction`,`StackingMultiple`,`SnackbarSuccess`,`SnackbarError`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <button className="rounded border px-3 py-1.5 text-sm" onClick={() => toast({
      title: 'Scheduled: Catch up',
      description: 'Friday, February 10 at 5:57 PM'
    })}>
        Show toast
      </button>
      <Toaster />
    </>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => toast({
        tone: 'default',
        description: 'Default toast'
      })}>
          Default
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast({
        tone: 'success',
        description: 'Saved successfully'
      })}>
          Success
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast({
        tone: 'warning',
        description: 'Storage almost full'
      })}>
          Warning
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast({
        tone: 'danger',
        description: 'Failed to save changes'
      })}>
          Danger
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast({
        tone: 'info',
        description: 'A new version is available'
      })}>
          Info
        </Button>
      </div>
      <Toaster />
    </>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => toast({
        tone: 'success',
        title: 'Policy saved',
        description: 'Your changes are live for all reviewers.',
        timestamp: 'May 12, 2025'
      })}>
          Success
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast({
        tone: 'warning',
        title: 'Storage almost full',
        description: 'You are using 92% of your available space.',
        timestamp: 'May 12, 2025'
      })}>
          Warning
        </Button>
      </div>
      <Toaster />
    </>
}`,...p.parameters?.docs?.source},description:{story:`The full Figma Toast anatomy — leading status icon + bold title + body +
a muted timestamp, with the tone's accent on the icon and the left bar.
\`timestamp\` is opt-in: toasts without it render exactly as before.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <button className="rounded border px-3 py-1.5 text-sm" onClick={() => showSnackbar({
      message: 'Email deleted',
      severity: 'info',
      actionText: 'Undo',
      onAction: () => toast({
        description: 'Delete undone'
      })
    })}>
        Delete email
      </button>
      <Toaster />
    </>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <button className="rounded border px-3 py-1.5 text-sm" onClick={() => {
      showSnackbar({
        message: 'Upload started',
        severity: 'info'
      });
      showSnackbar({
        message: 'Processing image 1 of 3',
        severity: 'info'
      });
      showSnackbar({
        message: 'Upload complete',
        severity: 'success'
      });
    }}>
        Fire 3 toasts (stacked)
      </button>
      <Toaster />
    </>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <Button variant="outline" size="sm" onClick={() => showSnackbar({
      message: 'Policy saved',
      severity: 'success'
    })}>
        Save policy
      </Button>
      <Toaster />
    </>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <Button variant="outline" size="sm" onClick={() => showSnackbar({
      message: 'Failed to save policy',
      severity: 'error'
    })}>
        Trigger error
      </Button>
      <Toaster />
    </>
}`,..._.parameters?.docs?.source}}}})))()}y();export{d as Composable,_ as SnackbarError,g as SnackbarSuccess,h as StackingMultiple,f as Tones,m as WithAction,p as WithTimestamp,v as __namedExportsOrder,u as default};