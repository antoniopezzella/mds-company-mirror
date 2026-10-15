import{a5 as i,Z as a}from"./iframe-CPBTUrEW.js";import{H as o}from"./header-Dxix_HjH.js";import"./preload-helper-PPVm8Dsz.js";import"./marsh-RNu6knWE.js";import"./utils-CURkPv3a.js";import"./avatar-XjDTizZa.js";import"./index-D-VHP59e.js";import"./index-DGsydKWp.js";import"./index-CQZ-MLQt.js";import"./index-DbquDQCT.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./prop-compat-ClktB6p5.js";import"./tooltip-BTPUOBKh.js";import"./index-B2KxKFY1.js";import"./index-CDKxNHGJ.js";import"./index-209NtBVq.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-ydzPhmoe.js";import"./index-DrK2s9b6.js";import"./z-index-CsvJFlOP.js";import"./dropdown-menu-B-DEwsfR.js";import"./index-VWR8Du3y.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-U0y7uecN.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";import"./createLucideIcon-BnpAccaP.js";import"./check-KuCy08bp.js";import"./chevron-right-BXCmPxW2.js";import"./globe-oRqhZ2w4.js";import"./chevron-down-122XaqBk.js";import"./user-D5NxaQZ-.js";import"./settings-NHNxKTBP.js";import"./circle-question-mark-FVsLlTwq.js";import"./log-out-DgeIUkY9.js";const ee={title:"Components/Header",component:o,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:"# Header\n\nRadix-based counterpart to the MUI `DashboardHeader`, styled with\n`getRoleColor()` role tokens rather than hardcoded hex.\n\n## API parity with MUI\nSame `sidebarOpen`/`onToggleSidebar`/`onNotificationsClick`/\n`notificationCount`/`variant` shape as the MUI twin.\n\n## Deliberate improvement over the MUI original\nThe profile menu uses Radix `DropdownMenu` (see Components/DropdownMenu)\ninstead of a `Popover` + hand-styled `MenuItem` list — proper ARIA menu\nsemantics, roving tabindex, and arrow-key navigation for free."}}},argTypes:{variant:{control:"select",options:["primary","secondary"]}}},s={render:e=>{const[r,n]=i.useState(!0);return a.jsx(o,{...e,sidebarOpen:r,onToggleSidebar:()=>n(t=>!t)})},args:{variant:"primary",notificationCount:4}},d={render:e=>{const[r,n]=i.useState(!0);return a.jsx(o,{...e,sidebarOpen:r,onToggleSidebar:()=>n(t=>!t)})},args:{variant:"secondary",notificationCount:4}},p={render:e=>{const[r,n]=i.useState(!0);return a.jsx(o,{...e,sidebarOpen:r,onToggleSidebar:()=>n(t=>!t)})},args:{variant:"primary",notificationCount:0}},m={render:e=>{const[r,n]=i.useState(!0);return a.jsx(o,{...e,sidebarOpen:r,onToggleSidebar:()=>n(t=>!t)})},args:{variant:"primary",notificationCount:128}},c={render:e=>{const[r,n]=i.useState(!0);return a.jsx(o,{...e,sidebarOpen:r,onToggleSidebar:()=>n(t=>!t)})},args:{variant:"primary",notificationCount:2,user:{name:"Jane Doe",role:"Underwriter",organization:"Northwind Insurance",initials:"JD"}}},u={render:e=>{const[r,n]=i.useState(!0);return a.jsxs("div",{className:"min-h-screen bg-muted",children:[a.jsx(o,{...e,sidebarOpen:r,onToggleSidebar:()=>n(t=>!t)}),a.jsxs("div",{className:"p-8",children:[a.jsx("h1",{className:"text-2xl font-bold",children:"Dashboard content"}),a.jsx("p",{className:"mt-2 text-muted-foreground",children:"The header stays fixed at the top while this scrolls."})]})]})},args:{variant:"primary",notificationCount:4}},re=["Primary","Secondary","NoNotifications","ManyNotifications","CustomUser","WithDashboardContent"];s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(v => !v)} />;
  },
  args: {
    variant: 'primary',
    notificationCount: 4
  }
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(v => !v)} />;
  },
  args: {
    variant: 'secondary',
    notificationCount: 4
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(v => !v)} />;
  },
  args: {
    variant: 'primary',
    notificationCount: 0
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(v => !v)} />;
  },
  args: {
    variant: 'primary',
    notificationCount: 128
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};export{c as CustomUser,m as ManyNotifications,p as NoNotifications,s as Primary,d as Secondary,u as WithDashboardContent,re as __namedExportsOrder,ee as default};
