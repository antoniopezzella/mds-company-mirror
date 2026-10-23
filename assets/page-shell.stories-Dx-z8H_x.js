import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./createLucideIcon-DC6xoXt7.js";import{n as o,t as s}from"./header-BY-aah5f.js";import{n as c,t as l}from"./side-navigation-C5_t79DI.js";import{n as u,t as d}from"./file-text-CBw0Jc0o.js";import{n as f,t as p}from"./shield-GcEyiOq2.js";import{n as m,t as h}from"./stat-card-D5mE16X2.js";import{n as g,t as _}from"./button-DatWLSj0.js";import{n as v,r as y}from"./stack-BlYcYnw2.js";import{n as b,r as x,t as S}from"./page-shell-DbkBo_3K.js";import{l as C,r as w,t as T}from"./card-tXlEGCFr.js";var E,D;function O(){return(O=t((()=>{i(),E=[[`path`,{d:`M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8`,key:`5wwlr5`}],[`path`,{d:`M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`,key:`r6nss1`}]],D=a(`house`,E)})))()}var k,A,j,M,N,P,F,I,L;function R(){return(R=t((()=>{k=e(n(),1),u(),O(),f(),x(),o(),c(),g(),C(),m(),y(),A=r(),j={title:`Components/PageShell`,component:b,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:"Dashboard page template: full-height frame, header slot, responsive sidebar slot with mobile scrim, and a `min-w-0` main column optionally constrained to the 1540px MDS container."}}}},M=[{id:`overview`,label:`Overview`,path:`/`,icon:(0,A.jsx)(D,{className:`h-5 w-5`})},{id:`policies`,label:`Policies`,path:`/policies`,icon:(0,A.jsx)(p,{className:`h-5 w-5`})},{id:`claims`,label:`Claims`,path:`/claims`,icon:(0,A.jsx)(d,{className:`h-5 w-5`})}],N={render:()=>{let[e,t]=k.useState(!1);return(0,A.jsxs)(b,{sidebarOpen:e,onSidebarClose:()=>t(!1),header:(0,A.jsx)(s,{sidebarOpen:e,onToggleSidebar:()=>t(e=>!e)}),sidebar:(0,A.jsx)(l,{items:M,currentPath:`/`,onClose:()=>t(!1),className:`fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto`}),children:[(0,A.jsx)(S,{title:`Overview`,description:`Your portfolio at a glance.`,actions:(0,A.jsx)(_,{variant:`primary`,size:`sm`,children:`New claim`})}),(0,A.jsxs)(`section`,{className:`mb-8`,children:[(0,A.jsx)(`h2`,{className:`sr-only`,children:`Key metrics`}),(0,A.jsxs)(`div`,{className:`grid gap-4 sm:grid-cols-2 lg:grid-cols-4`,children:[(0,A.jsx)(h,{label:`Active policies`,value:`24`}),(0,A.jsx)(h,{label:`Open claims`,value:`3`}),(0,A.jsx)(h,{label:`Renewals due`,value:`7`}),(0,A.jsx)(h,{label:`Total premium`,value:`$1.2M`})]})]}),(0,A.jsx)(T,{children:(0,A.jsx)(w,{className:`p-6`,children:(0,A.jsxs)(v,{gap:2,children:[(0,A.jsx)(`span`,{className:`text-sm font-semibold`,children:`Recent activity`}),(0,A.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`Content sits inside the shell's contained main column.`})]})})})]})}},P={render:()=>(0,A.jsxs)(b,{header:(0,A.jsx)(s,{sidebarOpen:!1,onToggleSidebar:()=>{}}),children:[(0,A.jsx)(S,{title:`Account settings`,description:`Manage your organisation profile.`}),(0,A.jsx)(T,{children:(0,A.jsx)(w,{className:`p-6 text-sm text-muted-foreground`,children:`A single-column page still gets the container cap and the padding scale.`})})]})},F={render:()=>(0,A.jsxs)(b,{contained:!1,header:(0,A.jsx)(s,{sidebarOpen:!1,onToggleSidebar:()=>{}}),children:[(0,A.jsx)(S,{title:`All policies`,description:`Unconstrained width for wide tables.`}),(0,A.jsx)(T,{children:(0,A.jsx)(w,{className:`p-6 text-sm text-muted-foreground`,children:`This column is not capped at 1540px.`})})]})},I={parameters:{layout:`padded`},render:()=>(0,A.jsxs)(v,{gap:8,children:[(0,A.jsx)(S,{title:`Title only`}),(0,A.jsx)(S,{title:`With description`,description:`A supporting line in text.secondary.`}),(0,A.jsx)(S,{title:`With actions`,description:`Actions sit at the end of the title row and never wrap under it.`,actions:(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(_,{variant:`outline`,size:`sm`,children:`Export`}),(0,A.jsx)(_,{variant:`primary`,size:`sm`,children:`New`})]})})]})},L=[`Default`,`NoSidebar`,`FullBleed`,`Heading`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source},description:{story:`The full arrangement: header, sidebar, heading and content.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <PageShell header={<Header sidebarOpen={false} onToggleSidebar={() => {}} />}>
      <PageHeading title="Account settings" description="Manage your organisation profile." />
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          A single-column page still gets the container cap and the padding scale.
        </CardContent>
      </Card>
    </PageShell>
}`,...P.parameters?.docs?.source},description:{story:`Without a sidebar — a settings or detail page.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <PageShell contained={false} header={<Header sidebarOpen={false} onToggleSidebar={() => {}} />}>
      <PageHeading title="All policies" description="Unconstrained width for wide tables." />
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          This column is not capped at 1540px.
        </CardContent>
      </Card>
    </PageShell>
}`,...F.parameters?.docs?.source},description:{story:"`contained={false}` releases the 1540px cap — for a page whose content\nshould run the full viewport width, such as a full-bleed data table.",...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source},description:{story:"`PageHeading` on its own — title, optional description, optional actions.",...I.parameters?.docs?.description}}}})))()}R();export{N as Default,F as FullBleed,I as Heading,P as NoSidebar,L as __namedExportsOrder,j as default};