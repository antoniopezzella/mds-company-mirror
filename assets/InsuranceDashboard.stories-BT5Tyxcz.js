import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Box-BD9Vi1Pp.js";import{n as a,t as o}from"./Container-C3qt7Ns3.js";import{n as s,t as c}from"./Grid-CCaV841I.js";import{n as l,t as u}from"./roles-DNqHlq35.js";import"./iframe-7XuuvGJO.js";import{n as d,t as f}from"./createSvgIcon-B9dc8nbu.js";import{n as ee,t as te}from"./Button-BlA5xY0Z.js";import{n as p,t as m}from"./Paper-ZV50H5HY.js";import{n as h,t as g}from"./Typography-anuSUXG9.js";import{n as ne,t as re}from"./Chip-ac-x4NKM.js";import{n as ie,t as ae}from"./Avatar-_-26AXpm.js";import{n as oe,t as se}from"./LinearProgress-CWCrRP1U.js";import{n as ce,t as le}from"./Add-Dor6jD5M.js";import{n as ue,t as de}from"./Description-JzLfd6pv.js";var _,v;function y(){return(y=e((()=>{d(),_=n(),v=f((0,_.jsx)(`path`,{d:`m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z`}),`TrendingUp`)})))()}var b,x;function S(){return(S=e((()=>{d(),b=n(),x=f((0,b.jsx)(`path`,{d:`m16 18 2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z`}),`TrendingDown`)})))()}var C,w,T;function E(){return(E=e((()=>{t(),r(),s(),p(),h(),y(),S(),l(),C=n(),w=({title:e,value:t,change:n,changeLabel:r,icon:a})=>{let o=n>=0;return(0,C.jsxs)(m,{elevation:1,sx:{p:3,height:`100%`,transition:`all 0.3s ease`,"&:hover":{elevation:3,transform:`translateY(-4px)`}},children:[(0,C.jsxs)(i,{sx:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,mb:2},children:[(0,C.jsx)(g,{variant:`body2`,sx:{color:u(`fg.neutral.subtle`),fontWeight:500},children:e}),a&&(0,C.jsx)(i,{sx:{color:u(`interactive.primary`),opacity:.7},children:a})]}),(0,C.jsx)(g,{variant:`h3`,component:`p`,sx:{color:u(`fg.primary`),fontWeight:700,mb:1,fontSize:{xs:`1.75rem`,md:`2.5rem`}},children:t}),(0,C.jsxs)(i,{sx:{display:`flex`,alignItems:`center`,gap:1},children:[o?(0,C.jsx)(v,{sx:{fontSize:18,color:u(`fg.success`)}}):(0,C.jsx)(x,{sx:{fontSize:18,color:u(`fg.critical`)}}),(0,C.jsxs)(g,{variant:`body2`,sx:{color:u(o?`fg.success`:`fg.critical`),fontWeight:600},children:[Math.abs(n),`% `,r]})]})]})},T=({metrics:e={totalPremiums:`$2.4M`,premiumsChange:12.5,activePolicies:`1,247`,policiesChange:8.3,openClaims:`34`,claimsChange:-15.2,riskScore:`72/100`,riskChange:5.1}})=>(0,C.jsxs)(c,{container:!0,spacing:3,children:[(0,C.jsx)(c,{size:{xs:12,sm:6,lg:3},children:(0,C.jsx)(w,{title:`Total Premiums`,value:e.totalPremiums||`$0`,change:e.premiumsChange||0,changeLabel:`vs last month`})}),(0,C.jsx)(c,{size:{xs:12,sm:6,lg:3},children:(0,C.jsx)(w,{title:`Active Policies`,value:e.activePolicies||`0`,change:e.policiesChange||0,changeLabel:`vs last month`})}),(0,C.jsx)(c,{size:{xs:12,sm:6,lg:3},children:(0,C.jsx)(w,{title:`Open Claims`,value:e.openClaims||`0`,change:e.claimsChange||0,changeLabel:`vs last month`})}),(0,C.jsx)(c,{size:{xs:12,sm:6,lg:3},children:(0,C.jsx)(w,{title:`Risk Score`,value:e.riskScore||`0/100`,change:e.riskChange||0,changeLabel:`vs last month`})})]}),T.__docgenInfo={description:``,methods:[],displayName:`DashboardMetrics`,props:{metrics:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  totalPremiums?: string;
  premiumsChange?: number;
  activePolicies?: string;
  policiesChange?: number;
  openClaims?: string;
  claimsChange?: number;
  riskScore?: string;
  riskChange?: number;
}`,signature:{properties:[{key:`totalPremiums`,value:{name:`string`,required:!1}},{key:`premiumsChange`,value:{name:`number`,required:!1}},{key:`activePolicies`,value:{name:`string`,required:!1}},{key:`policiesChange`,value:{name:`number`,required:!1}},{key:`openClaims`,value:{name:`string`,required:!1}},{key:`claimsChange`,value:{name:`number`,required:!1}},{key:`riskScore`,value:{name:`string`,required:!1}},{key:`riskChange`,value:{name:`number`,required:!1}}]}},description:``,defaultValue:{value:`{
  totalPremiums: '$2.4M',
  premiumsChange: 12.5,
  activePolicies: '1,247',
  policiesChange: 8.3,
  openClaims: '34',
  claimsChange: -15.2,
  riskScore: '72/100',
  riskChange: 5.1,
}`,computed:!1}}}}})))()}var D,O,k,A,j;function M(){return(M=e((()=>{t(),r(),p(),h(),ne(),ie(),l(),D=n(),O=e=>{switch(e){case`approved`:return u(`fg.success`);case`rejected`:return u(`fg.critical`);case`investigating`:return u(`fg.warning`);default:return u(`fg.info`)}},k=e=>{switch(e){case`approved`:return u(`bg.success.subtle`);case`rejected`:return u(`bg.critical.subtle`);case`investigating`:return u(`bg.warning.subtle`);default:return u(`bg.info.subtle`)}},A=e=>{switch(e){case`high`:return u(`fg.critical`);case`medium`:return u(`fg.warning`);default:return u(`fg.info`)}},j=({claims:e=[{id:`CLM-2024-001`,policyHolder:`Acme Corporation`,type:`Property Damage`,amount:`$45,000`,status:`investigating`,date:`2024-01-28`,priority:`high`},{id:`CLM-2024-002`,policyHolder:`Global Logistics Inc`,type:`Liability`,amount:`$120,000`,status:`pending`,date:`2024-01-27`,priority:`high`},{id:`CLM-2024-003`,policyHolder:`Tech Startup LLC`,type:`Cyber Security`,amount:`$85,000`,status:`approved`,date:`2024-01-26`,priority:`medium`},{id:`CLM-2024-004`,policyHolder:`Manufacturing Co`,type:`Workers Comp`,amount:`$32,000`,status:`approved`,date:`2024-01-25`,priority:`low`}],maxDisplay:t=5})=>{let n=e.slice(0,t);return(0,D.jsxs)(m,{elevation:1,sx:{p:3},children:[(0,D.jsxs)(i,{sx:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,mb:3},children:[(0,D.jsx)(g,{variant:`h6`,component:`h2`,sx:{color:u(`fg.primary`),fontWeight:600},children:`Recent Claims`}),(0,D.jsx)(g,{variant:`body2`,sx:{color:u(`interactive.primary`),cursor:`pointer`,"&:hover":{textDecoration:`underline`}},children:`View All`})]}),(0,D.jsx)(i,{sx:{display:`flex`,flexDirection:`column`,gap:2},children:n.map(e=>(0,D.jsxs)(i,{sx:{p:2,border:`1px solid ${u(`border.default`)}`,borderRadius:2,transition:`all 0.2s ease`,"&:hover":{borderColor:u(`interactive.primary`),backgroundColor:u(`bg.neutral.subtle`)}},children:[(0,D.jsxs)(i,{sx:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,mb:1.5},children:[(0,D.jsxs)(i,{sx:{display:`flex`,alignItems:`center`,gap:2},children:[(0,D.jsx)(ae,{sx:{width:40,height:40,backgroundColor:A(e.priority),fontSize:`0.875rem`},children:e.policyHolder.charAt(0)}),(0,D.jsxs)(i,{children:[(0,D.jsx)(g,{variant:`body1`,sx:{fontWeight:600,color:u(`fg.primary`)},children:e.policyHolder}),(0,D.jsxs)(g,{variant:`body2`,sx:{color:u(`fg.neutral.subtle`),fontSize:`0.875rem`},children:[e.id,` • `,e.type]})]})]}),(0,D.jsx)(re,{label:e.status.charAt(0).toUpperCase()+e.status.slice(1),size:`small`,sx:{backgroundColor:k(e.status),color:O(e.status),fontWeight:600,fontSize:`0.75rem`}})]}),(0,D.jsxs)(i,{sx:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,mt:1},children:[(0,D.jsx)(g,{variant:`h6`,component:`h2`,sx:{color:u(`interactive.primary`),fontWeight:700},children:e.amount}),(0,D.jsx)(g,{variant:`body2`,sx:{color:u(`fg.neutral.subtle`)},children:new Date(e.date).toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`})})]})]},e.id))})]})},j.__docgenInfo={description:``,methods:[],displayName:`RecentClaims`,props:{claims:{required:!1,tsType:{name:`Array`,elements:[{name:`Claim`}],raw:`Claim[]`},description:``,defaultValue:{value:`[
  {
    id: 'CLM-2024-001',
    policyHolder: 'Acme Corporation',
    type: 'Property Damage',
    amount: '$45,000',
    status: 'investigating',
    date: '2024-01-28',
    priority: 'high',
  },
  {
    id: 'CLM-2024-002',
    policyHolder: 'Global Logistics Inc',
    type: 'Liability',
    amount: '$120,000',
    status: 'pending',
    date: '2024-01-27',
    priority: 'high',
  },
  {
    id: 'CLM-2024-003',
    policyHolder: 'Tech Startup LLC',
    type: 'Cyber Security',
    amount: '$85,000',
    status: 'approved',
    date: '2024-01-26',
    priority: 'medium',
  },
  {
    id: 'CLM-2024-004',
    policyHolder: 'Manufacturing Co',
    type: 'Workers Comp',
    amount: '$32,000',
    status: 'approved',
    date: '2024-01-25',
    priority: 'low',
  },
]`,computed:!1}},maxDisplay:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`5`,computed:!1}}}}})))()}var N,P;function fe(){return(fe=e((()=>{d(),N=n(),P=f([(0,N.jsx)(`path`,{d:`M12 5.99 19.53 19H4.47zM12 2 1 21h22z`},`0`),(0,N.jsx)(`path`,{d:`M13 16h-2v2h2zm0-6h-2v5h2z`},`1`)],`WarningAmber`)})))()}var F,I,L;function R(){return(R=e((()=>{t(),r(),p(),h(),oe(),fe(),l(),F=n(),I=e=>e>=80?{label:`High Risk`,color:u(`fg.critical`)}:e>=50?{label:`Medium Risk`,color:u(`fg.warning`)}:{label:`Low Risk`,color:u(`fg.success`)},L=({categories:e=[{name:`Property Risk`,score:68,trend:`up`,description:`Weather-related exposure increasing`},{name:`Cyber Risk`,score:82,trend:`up`,description:`Recent vulnerability detected`},{name:`Liability Risk`,score:45,trend:`down`,description:`Improved safety protocols`},{name:`Financial Risk`,score:35,trend:`stable`,description:`Stable market conditions`}]})=>(0,F.jsxs)(m,{elevation:1,sx:{p:3},children:[(0,F.jsxs)(i,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:3},children:[(0,F.jsx)(P,{sx:{color:u(`fg.warning`)}}),(0,F.jsx)(g,{variant:`h6`,component:`h2`,sx:{color:u(`fg.primary`),fontWeight:600},children:`Risk Overview`})]}),(0,F.jsx)(i,{sx:{display:`flex`,flexDirection:`column`,gap:3},children:e.map(e=>{let t=I(e.score);return(0,F.jsxs)(i,{children:[(0,F.jsxs)(i,{sx:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,mb:1},children:[(0,F.jsx)(g,{variant:`body1`,sx:{fontWeight:600,color:u(`fg.primary`)},children:e.name}),(0,F.jsxs)(g,{variant:`body2`,sx:{fontWeight:700,color:t.color},children:[e.score,`/100`]})]}),(0,F.jsx)(se,{variant:`determinate`,value:e.score,"aria-label":`${e.name} risk score`,sx:{height:8,borderRadius:4,backgroundColor:u(`bg.neutral.subtle`),mb:1,"& .MuiLinearProgress-bar":{backgroundColor:t.color,borderRadius:4}}}),(0,F.jsxs)(i,{sx:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,F.jsx)(g,{variant:`body2`,sx:{color:u(`fg.neutral.subtle`),fontSize:`0.875rem`},children:e.description}),(0,F.jsx)(g,{variant:`caption`,sx:{color:t.color,fontWeight:600,textTransform:`uppercase`,fontSize:`0.75rem`},children:t.label})]})]},e.name)})})]}),L.__docgenInfo={description:``,methods:[],displayName:`RiskOverview`,props:{categories:{required:!1,tsType:{name:`Array`,elements:[{name:`RiskCategory`}],raw:`RiskCategory[]`},description:``,defaultValue:{value:`[
  {
    name: 'Property Risk',
    score: 68,
    trend: 'up',
    description: 'Weather-related exposure increasing',
  },
  {
    name: 'Cyber Risk',
    score: 82,
    trend: 'up',
    description: 'Recent vulnerability detected',
  },
  {
    name: 'Liability Risk',
    score: 45,
    trend: 'down',
    description: 'Improved safety protocols',
  },
  {
    name: 'Financial Risk',
    score: 35,
    trend: 'stable',
    description: 'Stable market conditions',
  },
]`,computed:!1}}}}})))()}var z,B;function V(){return(V=e((()=>{d(),z=n(),B=f((0,z.jsx)(`path`,{d:`M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z`}),`Assessment`)})))()}var H,U;function W(){return(W=e((()=>{d(),H=n(),U=f((0,H.jsx)(`path`,{d:`M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m-9-2V7H4v3H1v2h3v3h2v-3h3v-2zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4`}),`PersonAdd`)})))()}var G,K;function q(){return(q=e((()=>{t(),r(),p(),h(),ee(),ce(),V(),ue(),W(),l(),G=n(),K=({actions:e=[{label:`New Policy`,icon:(0,G.jsx)(le,{}),description:`Create a new insurance policy`,onClick:()=>console.info(`New Policy clicked`)},{label:`File Claim`,icon:(0,G.jsx)(de,{}),description:`Submit a new claim`,onClick:()=>console.info(`File Claim clicked`)},{label:`Risk Assessment`,icon:(0,G.jsx)(B,{}),description:`Run risk analysis`,onClick:()=>console.info(`Risk Assessment clicked`)},{label:`Add Client`,icon:(0,G.jsx)(U,{}),description:`Register new client`,onClick:()=>console.info(`Add Client clicked`)}]})=>(0,G.jsxs)(m,{elevation:1,sx:{p:3},children:[(0,G.jsx)(g,{variant:`h6`,component:`h2`,sx:{color:u(`fg.primary`),fontWeight:600,mb:3},children:`Quick Actions`}),(0,G.jsx)(i,{sx:{display:`grid`,gridTemplateColumns:{xs:`1fr`,sm:`1fr 1fr`},gap:2},children:e.map(e=>(0,G.jsx)(te,{variant:`outlined`,startIcon:e.icon,onClick:e.onClick,sx:{justifyContent:`flex-start`,p:2,textAlign:`left`,borderColor:u(`border.default`),color:u(`fg.primary`),transition:`all 0.2s ease`,"&:hover":{borderColor:u(`interactive.primary`),backgroundColor:u(`bg.neutral.subtle`),transform:`translateY(-2px)`}},children:(0,G.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`flex-start`,flex:1},children:[(0,G.jsx)(g,{variant:`body1`,sx:{fontWeight:600,mb:.5},children:e.label}),(0,G.jsx)(g,{variant:`caption`,sx:{color:u(`fg.neutral.subtle`)},children:e.description})]})},e.label))})]}),K.__docgenInfo={description:``,methods:[],displayName:`QuickActions`,props:{actions:{required:!1,tsType:{name:`Array`,elements:[{name:`Action`}],raw:`Action[]`},description:``,defaultValue:{value:`[
  {
    label: 'New Policy',
    icon: <AddIcon />,
    description: 'Create a new insurance policy',
    onClick: () => console.info('New Policy clicked'),
  },
  {
    label: 'File Claim',
    icon: <DescriptionIcon />,
    description: 'Submit a new claim',
    onClick: () => console.info('File Claim clicked'),
  },
  {
    label: 'Risk Assessment',
    icon: <AssessmentIcon />,
    description: 'Run risk analysis',
    onClick: () => console.info('Risk Assessment clicked'),
  },
  {
    label: 'Add Client',
    icon: <PersonAddIcon />,
    description: 'Register new client',
    onClick: () => console.info('Add Client clicked'),
  },
]`,computed:!1}}}}})))()}var J,Y;function X(){return(X=e((()=>{t(),r(),a(),s(),h(),E(),M(),R(),q(),l(),J=n(),Y=({userName:e=`User`})=>(0,J.jsx)(i,{className:`mds-dashboard`,sx:{backgroundColor:u(`bg.default`),minHeight:`100vh`,py:4},children:(0,J.jsxs)(o,{maxWidth:`xl`,children:[(0,J.jsxs)(i,{sx:{mb:4},children:[(0,J.jsxs)(g,{variant:`h3`,component:`h1`,sx:{color:u(`fg.primary`),fontWeight:700,mb:1},children:[`Welcome back, `,e]}),(0,J.jsx)(g,{variant:`body1`,sx:{color:u(`fg.neutral.subtle`)},children:`Here's what's happening with your insurance portfolio today`})]}),(0,J.jsx)(i,{sx:{mb:4},children:(0,J.jsx)(T,{})}),(0,J.jsxs)(c,{container:!0,spacing:3,children:[(0,J.jsx)(c,{size:{xs:12,lg:8},children:(0,J.jsx)(j,{})}),(0,J.jsx)(c,{size:{xs:12,lg:4},children:(0,J.jsx)(K,{})}),(0,J.jsx)(c,{size:{xs:12},children:(0,J.jsx)(L,{})})]})]})}),Y.__docgenInfo={description:``,methods:[],displayName:`InsuranceDashboard`,props:{userName:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'User'`,computed:!1}}}}})))()}var Z,Q,$,pe;function me(){return(me=e((()=>{X(),Z={title:`Projects/Insurance Dashboard/Full Dashboard`,component:Y,parameters:{layout:`fullscreen`,docs:{description:{component:`Complete insurance dashboard with metrics, claims, risk overview, and quick actions.`}}},tags:[`autodocs`]},Q={args:{userName:`Sarah Johnson`}},$={args:{userName:`User`}},pe=[`Default`,`Anonymous`],Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    userName: 'Sarah Johnson'
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    userName: 'User'
  }
}`,...$.parameters?.docs?.source}}}})))()}me();export{$ as Anonymous,Q as Default,pe as __namedExportsOrder,Z as default};