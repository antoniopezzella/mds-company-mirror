import{Z as e}from"./iframe-CPBTUrEW.js";import{A as p,b as m,a as u}from"./alert-BjWl-T_P.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./icon-DHMG4hzi.js";const w={title:"Components/Alert",component:p,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"# Alert\n\nRadix-free, `getRoleColor()`-driven counterpart to the MUI `Alert`. Same\n`severity`/`title`/`outlined`/`onClose` API as the MUI twin; `AlertTitle`/\n`AlertDescription` are also exported for fully composable usage."}}},argTypes:{severity:{control:"select",options:["info","success","warning","error"]}}},t={args:{severity:"info",title:"Heads up",children:"A new version of the platform is available."},decorators:[r=>e.jsx("div",{className:"w-[420px]",children:e.jsx(r,{})})]},a={args:{severity:"success",title:"Policy saved",children:"Your changes have been saved successfully."},decorators:[r=>e.jsx("div",{className:"w-[420px]",children:e.jsx(r,{})})]},s={args:{severity:"info",title:"Message title",timestamp:"May 12, 2025",children:"Lorem ipsum dolor sit amet consectetur convallis tincidunt imperdiet pellentesque enim euismod arcu tristique."},decorators:[r=>e.jsx("div",{className:"w-[640px]",children:e.jsx(r,{})})]},i={args:{severity:"warning",title:"Renewal approaching",children:"This policy renews in 14 days."},decorators:[r=>e.jsx("div",{className:"w-[420px]",children:e.jsx(r,{})})]},o={args:{severity:"error",title:"Failed to save",children:"Check the required fields and try again."},decorators:[r=>e.jsx("div",{className:"w-[420px]",children:e.jsx(r,{})})]},n={args:{severity:"warning",title:"Outlined variant",outlined:!0,children:"Transparent background with a border instead of a tinted fill."},decorators:[r=>e.jsx("div",{className:"w-[420px]",children:e.jsx(r,{})})]},c={args:{severity:"info",title:"Dismissible alert",onClose:()=>alert("closed"),children:"Click the X to dismiss this alert."},decorators:[r=>e.jsx("div",{className:"w-[420px]",children:e.jsx(r,{})})]},l={args:{severity:"success",children:"A simple alert with no title, just body text."},decorators:[r=>e.jsx("div",{className:"w-[420px]",children:e.jsx(r,{})})]},d={render:()=>e.jsx("div",{className:"w-[420px]",children:e.jsxs(p,{severity:"info",hideIcon:!0,children:[e.jsx(m,{children:"Composable usage"}),e.jsx(u,{children:"AlertTitle and AlertDescription can be used directly as children too."})]})})},f=["Info","Success","WithTimestamp","Warning","Error","Outlined","Dismissible","NoTitle","Composable"];t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    title: 'Heads up',
    children: 'A new version of the platform is available.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    title: 'Policy saved',
    children: 'Your changes have been saved successfully.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    title: 'Message title',
    timestamp: 'May 12, 2025',
    children: 'Lorem ipsum dolor sit amet consectetur convallis tincidunt imperdiet pellentesque enim euismod arcu tristique.'
  },
  decorators: [Story => <div className="w-[640px]"><Story /></div>]
}`,...s.parameters?.docs?.source},description:{story:"Optional timestamp, rendered inline next to the title — the Figma Alert's date.",...s.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    title: 'Renewal approaching',
    children: 'This policy renews in 14 days.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'error',
    title: 'Failed to save',
    children: 'Check the required fields and try again.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    title: 'Outlined variant',
    outlined: true,
    children: 'Transparent background with a border instead of a tinted fill.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    title: 'Dismissible alert',
    onClose: () => alert('closed'),
    children: 'Click the X to dismiss this alert.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    children: 'A simple alert with no title, just body text.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]">
      <Alert severity="info" hideIcon>
        <AlertTitle>Composable usage</AlertTitle>
        <AlertDescription>AlertTitle and AlertDescription can be used directly as children too.</AlertDescription>
      </Alert>
    </div>
}`,...d.parameters?.docs?.source}}};export{d as Composable,c as Dismissible,o as Error,t as Info,l as NoTitle,n as Outlined,a as Success,i as Warning,s as WithTimestamp,f as __namedExportsOrder,w as default};
