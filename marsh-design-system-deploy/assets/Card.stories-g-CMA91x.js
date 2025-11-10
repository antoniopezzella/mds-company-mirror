import{j as e}from"./iframe-B7__wHsY.js";import{g as t}from"./roles-DDzdIcSm.js";import{B as s}from"./Box-O8CNm5l6.js";import{D as h}from"./Divider-IBFW-1Ah.js";import"./preload-helper-PPVm8Dsz.js";import"./generateUtilityClasses-CoM_PQv9.js";import"./memoTheme-DLuuOUa1.js";import"./styled-D_MMOKXd.js";import"./dividerClasses-DWExi19l.js";const u=()=>e.jsxs("svg",{"aria-hidden":!0,viewBox:"0 0 24 24",width:"14",height:"14",style:{display:"inline-block",verticalAlign:"-2px"},children:[e.jsx("circle",{cx:"12",cy:"12",r:"10",fill:"currentColor",opacity:"0.15"}),e.jsx("path",{d:"M11 10h2v7h-2zM11 7h2v2h-2z",fill:"currentColor"})]}),m=()=>e.jsx("svg",{"aria-hidden":!0,viewBox:"0 0 24 24",width:"16",height:"16",style:{display:"inline-block"},children:e.jsx("path",{d:"M12 4l6 6h-4v10h-4V10H6l6-6z",fill:"currentColor"})}),g=()=>e.jsx("svg",{"aria-hidden":!0,viewBox:"0 0 24 24",width:"18",height:"18",style:{display:"inline-block"},children:e.jsx("path",{d:"M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.5-1.5z",fill:"currentColor"})}),x=({label:i,value:c,change:n})=>e.jsxs(s,{sx:{textAlign:"left",minWidth:0},children:[e.jsxs(s,{sx:{color:t("text.secondary"),fontSize:12,display:"flex",alignItems:"center",gap:.5,mb:.5,minWidth:0},children:[e.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:i,children:i}),e.jsx("span",{style:{opacity:.8},children:e.jsx(u,{})})]}),e.jsxs(s,{sx:{display:"flex",alignItems:"baseline",gap:1},children:[e.jsx("span",{style:{fontWeight:700,fontSize:24},children:c}),n&&e.jsxs("span",{style:{color:t("status.success.fg"),fontWeight:700,display:"flex",alignItems:"center"},children:[e.jsx("span",{style:{marginRight:4},children:e.jsx(m,{})})," ",n]})]})]}),f=({children:i})=>e.jsxs(s,{sx:{display:"flex",alignItems:"flex-start",gap:1,mt:2,color:t("text.secondary")},children:[e.jsx("span",{style:{color:t("status.success.fg"),marginTop:2},children:e.jsx(g,{})}),e.jsx("div",{style:{fontSize:14},children:i})]}),p=({title:i,stats:c,insight:n})=>e.jsx(s,{sx:{p:2,borderRadius:"8px",border:`1px solid ${t("border.default")}`,bgcolor:t("surface.default"),height:"100%",display:"flex",flexDirection:"column"},children:e.jsxs(s,{sx:{flex:1},children:[e.jsx("h3",{style:{fontWeight:700,fontSize:18,margin:0,marginBottom:8},children:i}),e.jsx(s,{sx:{display:"flex",justifyContent:"space-between",gap:2,mb:1.5,flexWrap:"wrap"},children:c.map(d=>e.jsx(x,{...d},d.label))}),e.jsx(h,{sx:{borderColor:t("border.default")}}),e.jsx(f,{children:n})]})});p.__docgenInfo={description:"",methods:[],displayName:"Card",props:{title:{required:!0,tsType:{name:"string"},description:""},stats:{required:!0,tsType:{name:"Array",elements:[{name:"Stat"}],raw:"Stat[]"},description:""},insight:{required:!0,tsType:{name:"string"},description:""}}};const v=[{label:"Total Policies",value:"1,240",change:"+8%"},{label:"Active Claims",value:"32",change:"+2%"},{label:"Satisfaction",value:"94%"}],z={title:"Components/Card",component:p,parameters:{layout:"centered"},args:{title:"Portfolio Performance",stats:v,insight:"Overall portfolio metrics are trending upward week over week with stable satisfaction."}},a={},r={args:{stats:[{label:"Active Policies",value:"820"},{label:"Open Tickets",value:"14"},{label:"Net Growth",value:"+3%"}],insight:"Growth remains positive; monitor ticket backlog to ensure SLA compliance."}},o={args:{stats:[{label:"Quote Volume",value:"5,420",change:"+11%"},{label:"Bound Rate",value:"37%",change:"+1%"},{label:"Churn",value:"4.2%"}],insight:"Increased quote volume is converting effectively; churn stable inside target band."}},l={args:{insight:"Momentum continues after last quarter’s optimization initiatives. Focus next on reducing churn below 4%. Maintain monitoring of growth levers and validate model calibration in the next review cycle."}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    stats: [{
      label: 'Active Policies',
      value: '820'
    }, {
      label: 'Open Tickets',
      value: '14'
    }, {
      label: 'Net Growth',
      value: '+3%'
    }],
    insight: 'Growth remains positive; monitor ticket backlog to ensure SLA compliance.'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    stats: [{
      label: 'Quote Volume',
      value: '5,420',
      change: '+11%'
    }, {
      label: 'Bound Rate',
      value: '37%',
      change: '+1%'
    }, {
      label: 'Churn',
      value: '4.2%'
    }],
    insight: 'Increased quote volume is converting effectively; churn stable inside target band.'
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    insight: 'Momentum continues after last quarter’s optimization initiatives. Focus next on reducing churn below 4%. Maintain monitoring of growth levers and validate model calibration in the next review cycle.'
  }
}`,...l.parameters?.docs?.source}}};const A=["Default","Minimal","WithMixedChanges","LongInsight"];export{a as Default,l as LongInsight,r as Minimal,o as WithMixedChanges,A as __namedExportsOrder,z as default};
