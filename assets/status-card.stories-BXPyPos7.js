import{Z as e,ad as t}from"./iframe-CPBTUrEW.js";import{I as S}from"./info-XF5axP9F.js";import{c as u}from"./createLucideIcon-BnpAccaP.js";import{T as w}from"./triangle-alert-CBFJXkB-.js";import"./preload-helper-PPVm8Dsz.js";const b=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],x=u("circle-check",b);const C=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],v=u("circle-x",C),N={success:x,warning:w,error:v,info:S};function I(r){switch(r){case"success":return{bg:"status.success.bg",fg:"status.success.fg",border:"status.success.border"};case"warning":return{bg:"status.warning.bg",fg:"text.onLight",border:"status.warning.border"};case"error":return{bg:"status.danger.bg",fg:"status.danger.fg",border:"status.danger.border"};default:return{bg:"status.info.bg",fg:"status.info.fg",border:"status.info.border"}}}const s=({status:r,title:d,message:m,icon:g,className:p})=>{const{bg:f,fg:l,border:h}=I(r),y=N[r];return e.jsxs("div",{role:"alert","aria-live":"polite",className:p,style:{width:360,minHeight:110,borderRadius:8,border:`1px solid ${t(h)}`,backgroundColor:t(f),padding:20,display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"flex h-6 w-6 shrink-0 items-center justify-center",style:{color:t(l)},children:g??e.jsx(y,{className:"h-6 w-6"})}),e.jsx("h3",{className:"m-0 font-sans-productive text-base font-semibold leading-normal",style:{color:t(l)},children:d})]}),e.jsx("p",{className:"m-0 font-sans-productive text-sm leading-5",style:{color:t(l)},children:m})]})};s.__docgenInfo={description:"Design System StatusCard — shadcn/ui counterpart for the MDS StatusCard.\nSame `status`/`title`/`message`/`icon` API as the MUI twin.",methods:[],displayName:"StatusCard",props:{status:{required:!0,tsType:{name:"union",raw:"'success' | 'warning' | 'error' | 'info'",elements:[{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"},{name:"literal",value:"'info'"}]},description:"Drives the border/background colour and the default icon."},title:{required:!0,tsType:{name:"string"},description:""},message:{required:!0,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Overrides the status's default icon."},className:{required:!1,tsType:{name:"string"},description:""}}};const O={title:"Components/StatusCard",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# StatusCard\n\n`getRoleColor()`-driven counterpart to the MUI `StatusCard`. Same\n`status`/`title`/`message`/`icon` API as the MUI twin."}}},argTypes:{status:{control:"select",options:["success","warning","error","info"]}}},a={args:{status:"success",title:"Success Status",message:"Operation completed successfully!"}},n={args:{status:"warning",title:"Renewal approaching",message:"This policy renews in 14 days."}},o={args:{status:"error",title:"Payment failed",message:"We could not process your last payment."}},c={args:{status:"info",title:"New feature available",message:"Check out the new claims dashboard."}},i={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(s,{status:"success",title:"Success",message:"Operation completed successfully!"}),e.jsx(s,{status:"warning",title:"Warning",message:"Something needs your attention."}),e.jsx(s,{status:"error",title:"Error",message:"Something went wrong."}),e.jsx(s,{status:"info",title:"Info",message:"Here's something you should know."})]})},q=["Success","Warning","Error","Info","AllStatuses"];a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'success',
    title: 'Success Status',
    message: 'Operation completed successfully!'
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'warning',
    title: 'Renewal approaching',
    message: 'This policy renews in 14 days.'
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error',
    title: 'Payment failed',
    message: 'We could not process your last payment.'
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'info',
    title: 'New feature available',
    message: 'Check out the new claims dashboard.'
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <StatusCard status="success" title="Success" message="Operation completed successfully!" />
      <StatusCard status="warning" title="Warning" message="Something needs your attention." />
      <StatusCard status="error" title="Error" message="Something went wrong." />
      <StatusCard status="info" title="Info" message="Here's something you should know." />
    </div>
}`,...i.parameters?.docs?.source}}};export{i as AllStatuses,o as Error,c as Info,a as Success,n as Warning,q as __namedExportsOrder,O as default};
