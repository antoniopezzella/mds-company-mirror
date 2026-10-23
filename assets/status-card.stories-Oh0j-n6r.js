import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{i,n as a}from"./roles-DNqHlq35.js";import{n as o,t as s}from"./createLucideIcon-DC6xoXt7.js";import{n as c,t as l}from"./circle-check-CD8CSUqo.js";import{n as u,t as d}from"./info-BDKpeUaU.js";import{n as f,t as p}from"./triangle-alert-xZt0RFPN.js";var m,h;function g(){return(g=t((()=>{o(),m=[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m15 9-6 6`,key:`1uzhvr`}],[`path`,{d:`m9 9 6 6`,key:`z0biqf`}]],h=s(`circle-x`,m)})))()}function _(e){switch(e){case`success`:return{bg:`bg.success.subtle`,fg:`fg.success`,border:`border.success`};case`warning`:return{bg:`bg.warning.subtle`,fg:`fg.warning`,border:`border.warning`};case`error`:return{bg:`bg.critical.subtle`,fg:`fg.critical`,border:`border.critical`};default:return{bg:`bg.info.subtle`,fg:`fg.info`,border:`border.info`}}}var v,y,b,x;function S(){return(S=t((()=>{v=e(n(),1),f(),c(),u(),g(),a(),y=r(),b={success:l,warning:p,error:h,info:d},x=v.forwardRef(({status:e,title:t,message:n,icon:r,className:a},o)=>{let{bg:s,fg:c,border:l}=_(e),u=b[e];return(0,y.jsxs)(`div`,{ref:o,role:`alert`,"aria-live":`polite`,className:a,style:{width:360,minHeight:110,borderRadius:8,border:`1px solid ${i(l)}`,backgroundColor:i(s),padding:20,display:`flex`,flexDirection:`column`,gap:12},children:[(0,y.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,y.jsx)(`span`,{className:`flex h-6 w-6 shrink-0 items-center justify-center`,style:{color:i(c)},children:r??(0,y.jsx)(u,{className:`h-6 w-6`})}),(0,y.jsx)(`h3`,{className:`m-0 font-sans-productive text-base font-semibold leading-normal`,style:{color:i(c)},children:t})]}),(0,y.jsx)(`p`,{className:`m-0 font-sans-productive text-sm leading-5`,style:{color:i(c)},children:n})]})}),x.displayName=`StatusCard`,x.__docgenInfo={description:"Design System StatusCard — shadcn/ui counterpart for the MDS StatusCard.\nSame `status`/`title`/`message`/`icon` API as the MUI twin.",methods:[],displayName:`StatusCard`,props:{status:{required:!0,tsType:{name:`union`,raw:`'success' | 'warning' | 'error' | 'info'`,elements:[{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'info'`}]},description:`Drives the border/background colour and the default icon.`},title:{required:!0,tsType:{name:`string`},description:``},message:{required:!0,tsType:{name:`string`},description:``},icon:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Overrides the status's default icon.`},className:{required:!1,tsType:{name:`string`},description:``}}}})))()}var C,w,T,E,D,O,k,A;function j(){return(j=t((()=>{S(),C=r(),w={title:`Components/StatusCard`,component:x,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# StatusCard\n\n`getRoleColor()`-driven counterpart to the MUI `StatusCard`. Same\n`status`/`title`/`message`/`icon` API as the MUI twin."}}},argTypes:{status:{control:`select`,options:[`success`,`warning`,`error`,`info`]}}},T={args:{status:`success`,title:`Success Status`,message:`Operation completed successfully!`}},E={args:{status:`warning`,title:`Renewal approaching`,message:`This policy renews in 14 days.`}},D={args:{status:`error`,title:`Payment failed`,message:`We could not process your last payment.`}},O={args:{status:`info`,title:`New feature available`,message:`Check out the new claims dashboard.`}},k={render:()=>(0,C.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,C.jsx)(x,{status:`success`,title:`Success`,message:`Operation completed successfully!`}),(0,C.jsx)(x,{status:`warning`,title:`Warning`,message:`Something needs your attention.`}),(0,C.jsx)(x,{status:`error`,title:`Error`,message:`Something went wrong.`}),(0,C.jsx)(x,{status:`info`,title:`Info`,message:`Here's something you should know.`})]})},A=[`Success`,`Warning`,`Error`,`Info`,`AllStatuses`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'success',
    title: 'Success Status',
    message: 'Operation completed successfully!'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'warning',
    title: 'Renewal approaching',
    message: 'This policy renews in 14 days.'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error',
    title: 'Payment failed',
    message: 'We could not process your last payment.'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'info',
    title: 'New feature available',
    message: 'Check out the new claims dashboard.'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <StatusCard status="success" title="Success" message="Operation completed successfully!" />
      <StatusCard status="warning" title="Warning" message="Something needs your attention." />
      <StatusCard status="error" title="Error" message="Something went wrong." />
      <StatusCard status="info" title="Info" message="Here's something you should know." />
    </div>
}`,...k.parameters?.docs?.source}}}})))()}j();export{k as AllStatuses,D as Error,O as Info,T as Success,E as Warning,A as __namedExportsOrder,w as default};