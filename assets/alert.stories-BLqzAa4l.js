import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{i as n,n as r,r as i,t as a}from"./alert-Dms5_sIZ.js";var o,s,c,l,u,d,f,p,m,h,g,_;function v(){return(v=e((()=>{n(),o=t(),s={title:`Components/Alert`,component:a,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"# Alert\n\nRadix-free, `getRoleColor()`-driven counterpart to the MUI `Alert`. Same\n`severity`/`title`/`outlined`/`onClose` API as the MUI twin; `AlertTitle`/\n`AlertDescription` are also exported for fully composable usage."}}},argTypes:{severity:{control:`select`,options:[`info`,`success`,`warning`,`error`]}}},c={args:{severity:`info`,title:`Heads up`,children:`A new version of the platform is available.`},decorators:[e=>(0,o.jsx)(`div`,{className:`w-[420px]`,children:(0,o.jsx)(e,{})})]},l={args:{severity:`success`,title:`Policy saved`,children:`Your changes have been saved successfully.`},decorators:[e=>(0,o.jsx)(`div`,{className:`w-[420px]`,children:(0,o.jsx)(e,{})})]},u={args:{severity:`info`,title:`Message title`,timestamp:`May 12, 2025`,children:`Lorem ipsum dolor sit amet consectetur convallis tincidunt imperdiet pellentesque enim euismod arcu tristique.`},decorators:[e=>(0,o.jsx)(`div`,{className:`w-[640px]`,children:(0,o.jsx)(e,{})})]},d={args:{severity:`warning`,title:`Renewal approaching`,children:`This policy renews in 14 days.`},decorators:[e=>(0,o.jsx)(`div`,{className:`w-[420px]`,children:(0,o.jsx)(e,{})})]},f={args:{severity:`error`,title:`Failed to save`,children:`Check the required fields and try again.`},decorators:[e=>(0,o.jsx)(`div`,{className:`w-[420px]`,children:(0,o.jsx)(e,{})})]},p={args:{severity:`warning`,title:`Outlined variant`,outlined:!0,children:`Transparent background with a border instead of a tinted fill.`},decorators:[e=>(0,o.jsx)(`div`,{className:`w-[420px]`,children:(0,o.jsx)(e,{})})]},m={args:{severity:`info`,title:`Dismissible alert`,onClose:()=>alert(`closed`),children:`Click the X to dismiss this alert.`},decorators:[e=>(0,o.jsx)(`div`,{className:`w-[420px]`,children:(0,o.jsx)(e,{})})]},h={args:{severity:`success`,children:`A simple alert with no title, just body text.`},decorators:[e=>(0,o.jsx)(`div`,{className:`w-[420px]`,children:(0,o.jsx)(e,{})})]},g={render:()=>(0,o.jsx)(`div`,{className:`w-[420px]`,children:(0,o.jsxs)(a,{severity:`info`,hideIcon:!0,children:[(0,o.jsx)(i,{children:`Composable usage`}),(0,o.jsx)(r,{children:`AlertTitle and AlertDescription can be used directly as children too.`})]})})},_=[`Info`,`Success`,`WithTimestamp`,`Warning`,`Error`,`Outlined`,`Dismissible`,`NoTitle`,`Composable`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    title: 'Heads up',
    children: 'A new version of the platform is available.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    title: 'Policy saved',
    children: 'Your changes have been saved successfully.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    title: 'Message title',
    timestamp: 'May 12, 2025',
    children: 'Lorem ipsum dolor sit amet consectetur convallis tincidunt imperdiet pellentesque enim euismod arcu tristique.'
  },
  decorators: [Story => <div className="w-[640px]"><Story /></div>]
}`,...u.parameters?.docs?.source},description:{story:`Optional timestamp, rendered inline next to the title — the Figma Alert's date.`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    title: 'Renewal approaching',
    children: 'This policy renews in 14 days.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'error',
    title: 'Failed to save',
    children: 'Check the required fields and try again.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    title: 'Outlined variant',
    outlined: true,
    children: 'Transparent background with a border instead of a tinted fill.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    title: 'Dismissible alert',
    onClose: () => alert('closed'),
    children: 'Click the X to dismiss this alert.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    children: 'A simple alert with no title, just body text.'
  },
  decorators: [Story => <div className="w-[420px]"><Story /></div>]
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]">
      <Alert severity="info" hideIcon>
        <AlertTitle>Composable usage</AlertTitle>
        <AlertDescription>AlertTitle and AlertDescription can be used directly as children too.</AlertDescription>
      </Alert>
    </div>
}`,...g.parameters?.docs?.source}}}})))()}v();export{g as Composable,m as Dismissible,f as Error,c as Info,h as NoTitle,p as Outlined,l as Success,d as Warning,u as WithTimestamp,_ as __namedExportsOrder,s as default};