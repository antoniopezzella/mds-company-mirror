import{j as r}from"./iframe-B7__wHsY.js";import{g as i}from"./roles-DDzdIcSm.js";import{B as l}from"./Box-O8CNm5l6.js";import"./preload-helper-PPVm8Dsz.js";import"./generateUtilityClasses-CoM_PQv9.js";const v=e=>e==="error"||e==="warning"?"alert":"status",w=e=>e==="success"?"status.success.fg":e==="warning"?"status.warning.fg":e==="error"?"status.danger.fg":"text.primary",S=e=>e==="success"?"status.success.bg":e==="warning"?"status.warning.bg":e==="error"?"status.danger.bg":"surface.subtle",m=({severity:e,title:c,outlined:u,children:p,onClose:d,className:g="",...f})=>{const y=i(w(e)),h=u?"transparent":i(S(e)),b=u?`1px solid ${i("border.default")}`:"none",x={display:"flex",alignItems:"flex-start",gap:1.5,borderRadius:"8px",p:2,color:y,bgcolor:h,border:b};return r.jsxs(l,{role:v(e),className:g,sx:x,...f,children:[r.jsxs(l,{sx:{flex:1,minWidth:0},children:[c?r.jsx(l,{component:"div",sx:{fontWeight:"bold",mb:1},children:c}):null,r.jsx("div",{children:p})]}),d?r.jsx("button",{type:"button","aria-label":"Close",onClick:d,style:{marginLeft:8,flexShrink:0,color:"inherit",opacity:.8,borderRadius:4},className:void 0,children:"×"}):null]})};m.__docgenInfo={description:"",methods:[],displayName:"Alert",props:{severity:{required:!0,tsType:{name:"union",raw:"'error' | 'warning' | 'info' | 'success'",elements:[{name:"literal",value:"'error'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'info'"},{name:"literal",value:"'success'"}]},description:""},title:{required:!1,tsType:{name:"string"},description:""},outlined:{required:!1,tsType:{name:"boolean"},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{defaultValue:{value:"''",computed:!1},required:!1}},composes:["Omit"]};const j={title:"Components/Alert",component:m,args:{severity:"info",children:"Informational message"},parameters:{layout:"padded"}},s={},t={args:{title:"Informative"}},a={args:{severity:"warning",outlined:!0,title:"Heads up",children:"Something needs your attention soon."}},n={args:{severity:"error",title:"Request Failed",children:"We were unable to process your request. Try again later.",onClose:()=>{}}},o={args:{severity:"success",title:"Changes Saved",children:"Your updates are now live."}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Informative'
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    outlined: true,
    title: 'Heads up',
    children: 'Something needs your attention soon.'
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'error',
    title: 'Request Failed',
    children: 'We were unable to process your request. Try again later.',
    onClose: () => {}
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    title: 'Changes Saved',
    children: 'Your updates are now live.'
  }
}`,...o.parameters?.docs?.source}}};const I=["Info","WithTitle","WarningOutlined","ErrorClosable","Success"];export{n as ErrorClosable,s as Info,o as Success,a as WarningOutlined,t as WithTitle,I as __namedExportsOrder,j as default};
