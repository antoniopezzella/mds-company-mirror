import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./header-BY-aah5f.js";var a,o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{a=t(),r(),o=n(),s={title:`Components/Header`,component:i,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:"# Header\n\nRadix-based counterpart to the MUI `DashboardHeader`, styled with\n`getRoleColor()` role tokens rather than hardcoded hex.\n\n## API parity with MUI\nSame `sidebarOpen`/`onToggleSidebar`/`onNotificationsClick`/\n`notificationCount`/`variant` shape as the MUI twin.\n\n## Deliberate improvement over the MUI original\nThe profile menu uses Radix `DropdownMenu` (see Components/DropdownMenu)\ninstead of a `Popover` + hand-styled `MenuItem` list — proper ARIA menu\nsemantics, roving tabindex, and arrow-key navigation for free."}}},argTypes:{variant:{control:`select`,options:[`primary`,`secondary`]}}},c={render:e=>{let[t,n]=(0,a.useState)(!0);return(0,o.jsx)(i,{...e,sidebarOpen:t,onToggleSidebar:()=>n(e=>!e)})},args:{variant:`primary`,notificationCount:4}},l={render:e=>{let[t,n]=(0,a.useState)(!0);return(0,o.jsx)(i,{...e,sidebarOpen:t,onToggleSidebar:()=>n(e=>!e)})},args:{variant:`secondary`,notificationCount:4}},u={render:e=>{let[t,n]=(0,a.useState)(!0);return(0,o.jsx)(i,{...e,sidebarOpen:t,onToggleSidebar:()=>n(e=>!e)})},args:{variant:`primary`,notificationCount:0}},d={render:e=>{let[t,n]=(0,a.useState)(!0);return(0,o.jsx)(i,{...e,sidebarOpen:t,onToggleSidebar:()=>n(e=>!e)})},args:{variant:`primary`,notificationCount:128}},f={render:e=>{let[t,n]=(0,a.useState)(!0);return(0,o.jsx)(i,{...e,sidebarOpen:t,onToggleSidebar:()=>n(e=>!e)})},args:{variant:`primary`,notificationCount:2,user:{name:`Jane Doe`,role:`Underwriter`,organization:`Northwind Insurance`,initials:`JD`}}},p={render:e=>{let[t,n]=(0,a.useState)(!0);return(0,o.jsxs)(`div`,{className:`min-h-screen bg-muted`,children:[(0,o.jsx)(i,{...e,sidebarOpen:t,onToggleSidebar:()=>n(e=>!e)}),(0,o.jsxs)(`div`,{className:`p-8`,children:[(0,o.jsx)(`h1`,{className:`text-2xl font-bold`,children:`Dashboard content`}),(0,o.jsx)(`p`,{className:`mt-2 text-muted-foreground`,children:`The header stays fixed at the top while this scrolls.`})]})]})},args:{variant:`primary`,notificationCount:4}},m=[`Primary`,`Secondary`,`NoNotifications`,`ManyNotifications`,`CustomUser`,`WithDashboardContent`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(v => !v)} />;
  },
  args: {
    variant: 'primary',
    notificationCount: 4
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(v => !v)} />;
  },
  args: {
    variant: 'secondary',
    notificationCount: 4
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(v => !v)} />;
  },
  args: {
    variant: 'primary',
    notificationCount: 0
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(v => !v)} />;
  },
  args: {
    variant: 'primary',
    notificationCount: 128
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(v => !v)} />;
  },
  args: {
    variant: 'primary',
    notificationCount: 2,
    user: {
      name: 'Jane Doe',
      role: 'Underwriter',
      organization: 'Northwind Insurance',
      initials: 'JD'
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return <div className="min-h-screen bg-muted">
        <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(v => !v)} />
        <div className="p-8">
          <h1 className="text-2xl font-bold">Dashboard content</h1>
          <p className="mt-2 text-muted-foreground">The header stays fixed at the top while this scrolls.</p>
        </div>
      </div>;
  },
  args: {
    variant: 'primary',
    notificationCount: 4
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{f as CustomUser,d as ManyNotifications,u as NoNotifications,c as Primary,l as Secondary,p as WithDashboardContent,m as __namedExportsOrder,s as default};