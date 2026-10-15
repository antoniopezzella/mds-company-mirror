import{a5 as x,Z as e}from"./iframe-CPBTUrEW.js";import{a as o,P as t}from"./page-shell-DhFzgmVo.js";import{H as c}from"./header-Dxix_HjH.js";import{S as f}from"./side-navigation-atQBsduT.js";import{B as d}from"./button-_tNb_vhW.js";import{C as p,b as m}from"./card-DdSDVEd-.js";import{S as r}from"./stat-card-C72rmxDN.js";import{S as h}from"./stack-C88a0npI.js";import{c as b}from"./createLucideIcon-BnpAccaP.js";import{S as v}from"./shield-DU2z-vKO.js";import{F as S}from"./file-text-Cu6blthU.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./marsh-RNu6knWE.js";import"./avatar-XjDTizZa.js";import"./index-D-VHP59e.js";import"./index-DGsydKWp.js";import"./index-CQZ-MLQt.js";import"./index-DbquDQCT.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./prop-compat-ClktB6p5.js";import"./tooltip-BTPUOBKh.js";import"./index-B2KxKFY1.js";import"./index-CDKxNHGJ.js";import"./index-209NtBVq.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-ydzPhmoe.js";import"./index-DrK2s9b6.js";import"./z-index-CsvJFlOP.js";import"./dropdown-menu-B-DEwsfR.js";import"./index-VWR8Du3y.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-U0y7uecN.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";import"./check-KuCy08bp.js";import"./chevron-right-BXCmPxW2.js";import"./globe-oRqhZ2w4.js";import"./chevron-down-122XaqBk.js";import"./user-D5NxaQZ-.js";import"./settings-NHNxKTBP.js";import"./circle-question-mark-FVsLlTwq.js";import"./log-out-DgeIUkY9.js";import"./control-size-rvCN7ZpI.js";import"./format-B1LeFV3Y.js";import"./format-context-Caqi-Gt1.js";import"./data-state-CIGJqc-1.js";import"./empty-DcTcGUY7.js";import"./triangle-alert-CBFJXkB-.js";import"./spinner-CUjZIesC.js";import"./search-x-BoD6M5tN.js";import"./skeleton-C-ZAhKi4.js";import"./arrow-right-DRUl2urG.js";const j=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],w=b("house",j),Te={title:"Components/PageShell",component:o,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:"Dashboard page template: full-height frame, header slot, responsive sidebar slot with mobile scrim, and a `min-w-0` main column optionally constrained to the 1540px MDS container."}}}},C=[{id:"overview",label:"Overview",path:"/",icon:e.jsx(w,{className:"h-5 w-5"})},{id:"policies",label:"Policies",path:"/policies",icon:e.jsx(v,{className:"h-5 w-5"})},{id:"claims",label:"Claims",path:"/claims",icon:e.jsx(S,{className:"h-5 w-5"})}],a={render:()=>{const[g,l]=x.useState(!1);return e.jsxs(o,{sidebarOpen:g,onSidebarClose:()=>l(!1),header:e.jsx(c,{sidebarOpen:g,onToggleSidebar:()=>l(u=>!u)}),sidebar:e.jsx(f,{items:C,currentPath:"/",onClose:()=>l(!1),className:"fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto"}),children:[e.jsx(t,{title:"Overview",description:"Your portfolio at a glance.",actions:e.jsx(d,{variant:"primary",size:"sm",children:"New claim"})}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h2",{className:"sr-only",children:"Key metrics"}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-4",children:[e.jsx(r,{label:"Active policies",value:"24"}),e.jsx(r,{label:"Open claims",value:"3"}),e.jsx(r,{label:"Renewals due",value:"7"}),e.jsx(r,{label:"Total premium",value:"$1.2M"})]})]}),e.jsx(p,{children:e.jsx(m,{className:"p-6",children:e.jsxs(h,{gap:2,children:[e.jsx("span",{className:"text-sm font-semibold",children:"Recent activity"}),e.jsx("span",{className:"text-sm text-muted-foreground",children:"Content sits inside the shell's contained main column."})]})})})]})}},s={render:()=>e.jsxs(o,{header:e.jsx(c,{sidebarOpen:!1,onToggleSidebar:()=>{}}),children:[e.jsx(t,{title:"Account settings",description:"Manage your organisation profile."}),e.jsx(p,{children:e.jsx(m,{className:"p-6 text-sm text-muted-foreground",children:"A single-column page still gets the container cap and the padding scale."})})]})},i={render:()=>e.jsxs(o,{contained:!1,header:e.jsx(c,{sidebarOpen:!1,onToggleSidebar:()=>{}}),children:[e.jsx(t,{title:"All policies",description:"Unconstrained width for wide tables."}),e.jsx(p,{children:e.jsx(m,{className:"p-6 text-sm text-muted-foreground",children:"This column is not capped at 1540px."})})]})},n={parameters:{layout:"padded"},render:()=>e.jsxs(h,{gap:8,children:[e.jsx(t,{title:"Title only"}),e.jsx(t,{title:"With description",description:"A supporting line in text.secondary."}),e.jsx(t,{title:"With actions",description:"Actions sit at the end of the title row and never wrap under it.",actions:e.jsxs(e.Fragment,{children:[e.jsx(d,{variant:"outline",size:"sm",children:"Export"}),e.jsx(d,{variant:"primary",size:"sm",children:"New"})]})})]})},Ae=["Default","NoSidebar","FullBleed","Heading"];a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = React.useState(false);
    return <PageShell sidebarOpen={open} onSidebarClose={() => setOpen(false)} header={<Header sidebarOpen={open} onToggleSidebar={() => setOpen(v => !v)} />} sidebar={<SideNavigation items={NAV_ITEMS} currentPath="/" onClose={() => setOpen(false)} className="fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto" />}>
        <PageHeading title="Overview" description="Your portfolio at a glance." actions={<Button variant="primary" size="sm">
              New claim
            </Button>} />
        {/*
          The sr-only <h2> is load-bearing, not decoration. \`StatCard\` renders
          its label as an <h3> and offers no way to change that, so placing a
          stats grid directly under the <h1> from PageHeading skips a level
          and fails the axe heading-order rule — which is exactly how this
          story failed the first time it ran.
           A visually hidden section heading fixes the document outline without
          touching the visual design, and gives screen-reader users a real
          landmark to navigate to. Model this on any page that groups cards.
         */}
        <section className="mb-8">
          <h2 className="sr-only">Key metrics</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Active policies" value="24" />
            <StatCard label="Open claims" value="3" />
            <StatCard label="Renewals due" value="7" />
            <StatCard label="Total premium" value="$1.2M" />
          </div>
        </section>
        <Card>
          <CardContent className="p-6">
            <Stack gap={2}>
              <span className="text-sm font-semibold">Recent activity</span>
              <span className="text-sm text-muted-foreground">
                Content sits inside the shell&apos;s contained main column.
              </span>
            </Stack>
          </CardContent>
        </Card>
      </PageShell>;
  }
}`,...a.parameters?.docs?.source},description:{story:"The full arrangement: header, sidebar, heading and content.",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <PageShell header={<Header sidebarOpen={false} onToggleSidebar={() => {}} />}>
      <PageHeading title="Account settings" description="Manage your organisation profile." />
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          A single-column page still gets the container cap and the padding scale.
        </CardContent>
      </Card>
    </PageShell>
}`,...s.parameters?.docs?.source},description:{story:"Without a sidebar — a settings or detail page.",...s.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <PageShell contained={false} header={<Header sidebarOpen={false} onToggleSidebar={() => {}} />}>
      <PageHeading title="All policies" description="Unconstrained width for wide tables." />
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          This column is not capped at 1540px.
        </CardContent>
      </Card>
    </PageShell>
}`,...i.parameters?.docs?.source},description:{story:"`contained={false}` releases the 1540px cap — for a page whose content\nshould run the full viewport width, such as a full-bleed data table.",...i.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <Stack gap={8}>
      <PageHeading title="Title only" />
      <PageHeading title="With description" description="A supporting line in text.secondary." />
      <PageHeading title="With actions" description="Actions sit at the end of the title row and never wrap under it." actions={<>
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="primary" size="sm">
              New
            </Button>
          </>} />
    </Stack>
}`,...n.parameters?.docs?.source},description:{story:"`PageHeading` on its own — title, optional description, optional actions.",...n.parameters?.docs?.description}}};export{a as Default,i as FullBleed,n as Heading,s as NoSidebar,Ae as __namedExportsOrder,Te as default};
