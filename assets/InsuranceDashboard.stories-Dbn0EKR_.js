import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{l as i,u as a}from"./DefaultPropsProvider-DpSsnPPL.js";import{n as o,t as s}from"./Box-BD9Vi1Pp.js";import{n as c,t as l}from"./Container-C3qt7Ns3.js";import{n as u,t as d}from"./Grid-CCaV841I.js";import{n as f,t as p}from"./Stack-DKSlLpCQ.js";import{n as m,t as h}from"./roles-DNqHlq35.js";import{c as g,l as _,o as v,s as y}from"./iframe-7XuuvGJO.js";import{n as ee,t as te}from"./Header-Ch912wL6.js";import{r as ne,t as b}from"./data-table-BKV54IPo.js";import{n as re,t as x}from"./Button-C8mUln8d.js";import{n as S,t as C}from"./Typography-anuSUXG9.js";import{n as w,t as T}from"./tabs-sotmQBZ-.js";import{At as E,_r as D,b as O,kt as k,n as A,t as j,vr as M,y as N}from"./AreaChart-CDf_Xfj1.js";import{i as P,t as F}from"./alert-Dms5_sIZ.js";var I,L,R,z,B;function V(){return(V=t((()=>{o(),S(),i(),A(),O(),M(),E(),m(),I=r(),L=e=>({up:h(`fg.success`,{mode:e}),down:h(`fg.critical`,{mode:e}),neutral:h(`fg.neutral.subtle`,{mode:e})}),R=e=>({up:h(`bg.success.subtle`,{mode:e}),down:h(`bg.critical.subtle`,{mode:e}),neutral:h(`bg.neutral.subtle`,{mode:e})}),z={up:`↑`,down:`↓`,neutral:`→`},B=({label:e,value:t,change:n,trend:r,data:i,sublabel:o})=>{let c=a().palette.mode,l=L(c),u=R(c),d=h(r===`up`?`fg.success`:r===`down`?`fg.critical`:`interactive.primary`,{mode:c});return(0,I.jsxs)(s,{sx:{bgcolor:h(`bg.neutral.subtle`,{mode:c}),borderRadius:2,border:`1px solid ${h(`border.default`,{mode:c})}`,p:e=>e.spacing(3),display:`flex`,flexDirection:`column`,gap:e=>e.spacing(2),height:`100%`,boxSizing:`border-box`},children:[(0,I.jsxs)(s,{sx:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,I.jsx)(C,{variant:`body2`,sx:{color:h(`fg.neutral.subtle`,{mode:c}),fontWeight:500,textTransform:`uppercase`,letterSpacing:`0.04em`,fontSize:`0.6875rem`},children:e}),(0,I.jsxs)(s,{component:`span`,sx:{px:1,py:.25,borderRadius:1,fontSize:`0.75rem`,fontWeight:600,color:l[r],bgcolor:u[r],lineHeight:1.5},children:[z[r],` `,n]})]}),(0,I.jsxs)(s,{children:[(0,I.jsx)(C,{variant:`h4`,component:`p`,sx:{color:h(`fg.primary`,{mode:c}),fontWeight:700,lineHeight:1.1},children:t}),o&&(0,I.jsx)(C,{variant:`caption`,sx:{color:h(`fg.neutral.subtle`,{mode:c}),mt:.25,display:`block`},children:o})]}),(0,I.jsx)(s,{sx:{height:56,mx:-1},children:(0,I.jsx)(D,{width:`100%`,height:`100%`,children:(0,I.jsxs)(j,{data:i,margin:{top:4,right:4,bottom:0,left:4},children:[(0,I.jsx)(`defs`,{children:(0,I.jsxs)(`linearGradient`,{id:`grad-${e.replace(/\s/g,``)}`,x1:`0`,y1:`0`,x2:`0`,y2:`1`,children:[(0,I.jsx)(`stop`,{offset:`5%`,stopColor:d,stopOpacity:.18}),(0,I.jsx)(`stop`,{offset:`95%`,stopColor:d,stopOpacity:0})]})}),(0,I.jsx)(k,{contentStyle:{fontSize:12,padding:`4px 8px`,border:`1px solid ${h(`border.default`,{mode:c})}`,borderRadius:6,backgroundColor:h(`bg.neutral.subtle`,{mode:c}),color:h(`fg.primary`,{mode:c})},formatter:t=>[t??``,e],labelFormatter:()=>``}),(0,I.jsx)(N,{type:`monotone`,dataKey:`v`,stroke:d,strokeWidth:2,fill:`url(#grad-${e.replace(/\s/g,``)})`,dot:!1,activeDot:{r:3,strokeWidth:0,fill:d}})]})})})]})},B.__docgenInfo={description:``,methods:[],displayName:`ChartMetricCard`}})))()}var H,U,W;function G(){return(G=t((()=>{H=e(n(),1),o(),c(),u(),S(),f(),m(),ee(),w(),V(),ne(),P(),re(),U=r(),W=({title:e=`Insurance Dashboard`,userName:t=`User`,showHeader:n=!0})=>{let[r,i]=(0,H.useState)(`overview`),a=[{label:`Total Premium`,value:`$2.4M`,change:`+12.5%`,trend:`up`,sublabel:`vs. last quarter`,data:[{v:24},{v:27},{v:26},{v:31},{v:34},{v:38}]},{label:`Active Policies`,value:`1,247`,change:`+3.2%`,trend:`up`,sublabel:`Current period`,data:[{v:110},{v:115},{v:117},{v:119},{v:121},{v:124}]},{label:`Claims Pending`,value:`23`,change:`-8.1%`,trend:`down`,sublabel:`Awaiting review`,data:[{v:42},{v:39},{v:34},{v:29},{v:26},{v:23}]},{label:`Renewal Rate`,value:`94.2%`,change:`+1.5%`,trend:`up`,sublabel:`YTD performance`,data:[{v:88},{v:90},{v:89},{v:92},{v:93},{v:94}]}],o=[{accessorKey:`policyNumber`,header:`Policy Number`,size:150},{accessorKey:`clientName`,header:`Client Name`,size:200},{accessorKey:`type`,header:`Type`,size:150},{accessorKey:`premium`,header:`Premium`,size:120},{accessorKey:`status`,header:`Status`,size:120},{accessorKey:`renewalDate`,header:`Renewal Date`,size:150}],c=[{id:1,policyNumber:`POL-2024-1001`,clientName:`Acme Corporation`,type:`Property`,premium:`$125,000`,status:`Active`,renewalDate:`2024-12-15`},{id:2,policyNumber:`POL-2024-1002`,clientName:`Global Industries`,type:`Liability`,premium:`$250,000`,status:`Active`,renewalDate:`2024-11-30`},{id:3,policyNumber:`POL-2024-1003`,clientName:`Tech Solutions Inc`,type:`Cyber`,premium:`$85,000`,status:`Pending`,renewalDate:`2025-01-20`},{id:4,policyNumber:`POL-2024-1004`,clientName:`Manufacturing Co`,type:`Workers Comp`,premium:`$180,000`,status:`Active`,renewalDate:`2024-10-15`},{id:5,policyNumber:`POL-2024-1005`,clientName:`Retail Group LLC`,type:`Property`,premium:`$95,000`,status:`Renewal Due`,renewalDate:`2024-09-30`}];return(0,U.jsxs)(s,{sx:{minHeight:`100vh`,backgroundColor:h(`bg.default`)},children:[n&&(0,U.jsx)(te,{variant:`primary`,sidebarOpen:!1,onToggleSidebar:()=>{}}),(0,U.jsx)(s,{sx:{backgroundColor:h(`bg.neutral.subtle`),borderBottom:`1px solid ${h(`border.default`)}`,py:3},children:(0,U.jsxs)(l,{maxWidth:`xl`,children:[(0,U.jsx)(C,{variant:`h3`,component:`h1`,sx:{color:h(`fg.primary`),fontWeight:600},children:e}),(0,U.jsxs)(C,{variant:`body2`,sx:{color:h(`fg.neutral.subtle`),mt:.5},children:[`Welcome back, `,t]})]})}),(0,U.jsx)(l,{maxWidth:`xl`,sx:{mt:3},children:(0,U.jsx)(F,{severity:`info`,title:`System Maintenance Scheduled`,onClose:()=>{},children:`Our systems will undergo scheduled maintenance on April 28, 2026 from 2:00 AM - 4:00 AM EST.`})}),(0,U.jsxs)(l,{maxWidth:`xl`,sx:{mt:3,pb:6},children:[(0,U.jsx)(s,{sx:{mb:4},children:(0,U.jsx)(T,{tabs:[{id:`overview`,title:`Overview`,content:null},{id:`policies`,title:`Policies`,content:null},{id:`claims`,title:`Claims`,content:null},{id:`analytics`,title:`Analytics`,content:null},{id:`reports`,title:`Reports`,content:null}],defaultActiveId:r,onSelect:e=>i(e)})}),r===`overview`&&(0,U.jsxs)(p,{spacing:4,children:[(0,U.jsxs)(s,{children:[(0,U.jsx)(C,{variant:`h5`,component:`h2`,sx:{color:h(`fg.primary`),mb:3,fontWeight:600},children:`Key Performance Indicators`}),(0,U.jsx)(d,{container:!0,spacing:3,children:a.map(e=>(0,U.jsx)(d,{size:{xs:12,sm:6,lg:3},children:(0,U.jsx)(B,{label:e.label,value:e.value,change:e.change,trend:e.trend,data:e.data,sublabel:e.sublabel})},e.label))})]}),(0,U.jsxs)(d,{container:!0,spacing:3,children:[(0,U.jsx)(d,{size:{xs:12,md:4},children:(0,U.jsxs)(s,{sx:{p:3,border:`1px solid ${h(`border.default`)}`,borderRadius:2,bgcolor:h(`bg.neutral.subtle`)},children:[(0,U.jsx)(C,{variant:`h6`,component:`h2`,children:`Quick Actions`}),(0,U.jsx)(C,{variant:`body2`,sx:{color:h(`fg.neutral.subtle`)},children:`Common tasks and workflows`}),(0,U.jsxs)(p,{spacing:2,sx:{mt:2},children:[(0,U.jsx)(x,{variant:`primary`,fullWidth:!0,children:`Create New Policy`}),(0,U.jsx)(x,{variant:`outline`,fullWidth:!0,children:`Process Claim`}),(0,U.jsx)(x,{variant:`outline`,fullWidth:!0,children:`Generate Report`}),(0,U.jsx)(x,{variant:`ghost`,fullWidth:!0,children:`View All Tasks`})]})]})}),(0,U.jsx)(d,{size:{xs:12,md:8},children:(0,U.jsxs)(s,{sx:{p:3,border:`1px solid ${h(`border.default`)}`,borderRadius:2,bgcolor:h(`bg.neutral.subtle`)},children:[(0,U.jsx)(C,{variant:`h6`,component:`h2`,children:`Recent Policies`}),(0,U.jsx)(C,{variant:`body2`,sx:{color:h(`fg.neutral.subtle`)},children:`Latest policy updates and renewals`}),(0,U.jsx)(s,{sx:{mt:2},children:(0,U.jsx)(b,{columns:o.slice(0,4),data:c.slice(0,3)})})]})})]}),(0,U.jsxs)(s,{children:[(0,U.jsx)(C,{variant:`h5`,component:`h2`,sx:{color:h(`fg.primary`),mb:3,fontWeight:600},children:`Policies Requiring Attention`}),(0,U.jsx)(b,{columns:o,data:c.filter(e=>e.status!==`Active`)})]})]}),r===`policies`&&(0,U.jsxs)(s,{children:[(0,U.jsxs)(p,{direction:`row`,justifyContent:`space-between`,alignItems:`center`,sx:{mb:3},children:[(0,U.jsx)(C,{variant:`h5`,component:`h2`,sx:{color:h(`fg.primary`),fontWeight:600},children:`All Policies`}),(0,U.jsx)(x,{variant:`primary`,children:`Create New Policy`})]}),(0,U.jsx)(b,{columns:o,data:c})]}),r===`claims`&&(0,U.jsxs)(s,{children:[(0,U.jsx)(C,{variant:`h5`,component:`h2`,sx:{color:h(`fg.primary`),mb:3},children:`Claims Management`}),(0,U.jsx)(F,{severity:`warning`,title:`Pending Claims`,children:`You have 23 claims pending review. Average processing time: 3.2 days.`})]}),r===`analytics`&&(0,U.jsxs)(s,{children:[(0,U.jsx)(C,{variant:`h5`,component:`h2`,sx:{color:h(`fg.primary`),mb:3},children:`Analytics & Insights`}),(0,U.jsx)(d,{container:!0,spacing:3,children:a.map(e=>(0,U.jsx)(d,{size:{xs:12,sm:6,lg:3},children:(0,U.jsx)(B,{label:e.label,value:e.value,change:e.change,trend:e.trend,data:e.data})},e.label))})]})]})]})},W.__docgenInfo={description:`InsuranceDashboard - Enterprise insurance dashboard layout

Combines MDS Code Connect components:
- Header for navigation
- Tabs for content organization
- ChartMetricCard for KPIs
- DataTable for policy data
- Panels for quick actions
- Alert for system notifications`,methods:[],displayName:`InsuranceDashboard`,props:{title:{required:!1,tsType:{name:`string`},description:`Dashboard title`,defaultValue:{value:`'Insurance Dashboard'`,computed:!1}},userName:{required:!1,tsType:{name:`string`},description:`User display name`,defaultValue:{value:`'User'`,computed:!1}},showHeader:{required:!1,tsType:{name:`boolean`},description:`Show header navigation`,defaultValue:{value:`true`,computed:!1}}}}})))()}var K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{G(),_(),v(),K=r(),q={title:`Sections/InsuranceDashboard`,component:W,tags:[`autodocs`],decorators:[e=>(0,K.jsx)(g,{theme:y,children:(0,K.jsx)(e,{})})],parameters:{layout:`fullscreen`,docs:{description:{component:`
# Insurance Dashboard

A comprehensive dashboard layout for insurance applications using MDS Code Connect components.

## Features
- **Header Navigation** - Global app header with search and profile
- **Tabbed Interface** - Overview, Policies, Claims, Analytics, Reports
- **KPI Metrics** - Real-time performance indicators with trend arrows
- **Data Tables** - Policy listings with sorting and filtering
- **Quick Actions** - Common workflows (Create Policy, Process Claim, etc.)
- **System Alerts** - Important notifications and updates

## Components Used
- Header (Code Connect)
- Tabs (Code Connect)
- ChartMetricCard (Code Connect)
- Card (Code Connect)
- Table (Code Connect)
- Alert (Code Connect)
- Button (Code Connect)

## Token Usage
All colors use \`getRoleColor()\` from the MDS role token system:
- \`text.primary\` - Main text
- \`text.secondary\` - Muted text
- \`surface.default\` - Page background
- \`surface.subtle\` - Section backgrounds
- \`border.default\` - Dividers
        `}}},argTypes:{title:{control:`text`,description:`Dashboard page title`},userName:{control:`text`,description:`Current user display name`},showHeader:{control:`boolean`,description:`Show global header navigation`}}},J={args:{title:`Insurance Dashboard`,userName:`John Smith`,showHeader:!0}},Y={args:{title:`Insurance Dashboard`,userName:`John Smith`,showHeader:!1}},X={args:{title:`Commercial Lines Dashboard`,userName:`Jane Doe`,showHeader:!0}},Z={args:{title:`Executive Summary`,userName:`Executive User`,showHeader:!0},parameters:{docs:{description:{story:`High-level view for executives focusing on KPIs and trends.`}}}},Q=[`Default`,`WithoutHeader`,`CustomTitle`,`ExecutiveSummary`],J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Insurance Dashboard',
    userName: 'John Smith',
    showHeader: true
  }
}`,...J.parameters?.docs?.source},description:{story:`Default dashboard view showing all sections:
- KPI metrics grid (4 cards)
- Quick actions sidebar
- Recent policies table
- Policies requiring attention`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Insurance Dashboard',
    userName: 'John Smith',
    showHeader: false
  }
}`,...Y.parameters?.docs?.source},description:{story:`Dashboard without header (for embedded use)`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Commercial Lines Dashboard',
    userName: 'Jane Doe',
    showHeader: true
  }
}`,...X.parameters?.docs?.source},description:{story:`Dashboard with custom title`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Executive Summary',
    userName: 'Executive User',
    showHeader: true
  },
  parameters: {
    docs: {
      description: {
        story: 'High-level view for executives focusing on KPIs and trends.'
      }
    }
  }
}`,...Z.parameters?.docs?.source},description:{story:`Dashboard showing executive summary`,...Z.parameters?.docs?.description}}}})))()}$();export{X as CustomTitle,J as Default,Z as ExecutiveSummary,Y as WithoutHeader,Q as __namedExportsOrder,q as default};