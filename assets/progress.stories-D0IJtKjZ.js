import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{i,n as a}from"./roles-DNqHlq35.js";import{n as o,t as s}from"./utils-BGgJixJd.js";import{n as c,t as l}from"./dist-rCLRbfw0.js";import{r as u,t as d}from"./dist-DFd1iIkj.js";function f(e,t){return`${Math.round(e/t*100)}%`}function p(e,t){return e==null?`indeterminate`:e===t?`complete`:`loading`}function m(e){return typeof e==`number`}function h(e){return m(e)&&!isNaN(e)&&e>0}function g(e,t){return m(e)&&!isNaN(e)&&e<=t&&e>=0}function _(e,t){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${w}\`.`}function v(e,t){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${w} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}var y,b,x,S,C,w,T,E,D,O,k,A,j,M,N;function P(){return(P=t((()=>{y=e(n(),1),c(),u(),b=r(),x=Object.defineProperty,S=(e,t)=>x(e,`name`,{value:t,configurable:!0}),C=`Progress`,w=100,[T,E]=l(C),[D,O]=T(C),k=y.forwardRef(S(function(e,t){let{__scopeProgress:n,value:r=null,max:i,getValueLabel:a=f,...o}=e;(i||i===0)&&!h(i)&&console.error(_(`${i}`,`Progress`));let s=h(i)?i:w;r!==null&&!g(r,s)&&console.error(v(`${r}`,`Progress`));let c=g(r,s)?r:null,l=m(c)?a(c,s):void 0;return(0,b.jsx)(D,{scope:n,value:c,max:s,children:(0,b.jsx)(d.div,{"aria-valuemax":s,"aria-valuemin":0,"aria-valuenow":m(c)?c:void 0,"aria-valuetext":l,role:`progressbar`,"data-state":p(c,s),"data-value":c??void 0,"data-max":s,...o,ref:t})})},`Progress`)),A=`ProgressIndicator`,j=y.forwardRef(S(function(e,t){let{__scopeProgress:n,...r}=e,i=O(A,n);return(0,b.jsx)(d.div,{"data-state":p(i.value,i.max),"data-value":i.value??void 0,"data-max":i.max,...r,ref:t})},`ProgressIndicator`)),S(f,`defaultGetValueLabel`),S(p,`getProgressState`),S(m,`isNumber`),S(h,`isValidMaxNumber`),S(g,`isValidValueNumber`),S(_,`getInvalidMaxError`),S(v,`getInvalidValueError`),M=k,N=j})))()}function F(e){switch(e){case`danger`:return`interactive.danger`;case`success`:return`fg.success`;default:return`interactive.primary`}}var I,L,R,z;function B(){return(B=t((()=>{I=e(n(),1),P(),o(),a(),L=r(),R=I.forwardRef(({size:e=40,thickness:t=3.6,tone:n=`default`,value:r=0,variant:a=`indeterminate`,className:o,...c},l)=>{let u=i(F(n)),d=(e-t*2)/2,f=2*Math.PI*d,p=Math.min(Math.max(r,0),100),m=a===`determinate`?f-p/100*f:f*.75;return(0,L.jsx)(`svg`,{ref:l,className:s(`shrink-0`,a===`indeterminate`&&`animate-spin`,o),width:e,height:e,viewBox:`0 0 ${e} ${e}`,role:`progressbar`,"aria-label":`Loading`,"aria-valuenow":a===`determinate`?p:void 0,"aria-valuemin":0,"aria-valuemax":100,...c,children:(0,L.jsx)(`circle`,{cx:e/2,cy:e/2,r:d,fill:`none`,stroke:u,strokeWidth:t,strokeLinecap:`round`,strokeDasharray:f,strokeDashoffset:m,transform:`rotate(-90 ${e/2} ${e/2})`})})}),R.displayName=`CircularProgress`,z=({value:e=0,variant:t=`determinate`,tone:n=`default`,className:r,"aria-label":a,"aria-labelledby":o})=>{let c=i(F(n)),l=Math.min(Math.max(e,0),100);return(0,L.jsx)(M,{className:s(`relative h-2 w-full overflow-hidden rounded-full`,r),style:{backgroundColor:`var(--role-bg-neutral-subtle)`},value:t===`determinate`?l:void 0,"aria-label":o?void 0:a??`Loading`,"aria-labelledby":o,children:(0,L.jsx)(N,{className:s(`h-full rounded-full transition-transform duration-300 ease-out`,t===`indeterminate`?`w-1/3 animate-linear-indeterminate`:`w-full`),style:{backgroundColor:c,transform:t===`determinate`?`translateX(-${100-l}%)`:void 0}})})},R.__docgenInfo={description:``,methods:[],displayName:`CircularProgress`,props:{size:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`40`,computed:!1}},thickness:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`3.6`,computed:!1}},tone:{required:!1,tsType:{name:`union`,raw:`'default' | 'success' | 'danger'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'danger'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}},value:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`0`,computed:!1}},variant:{required:!1,tsType:{name:`union`,raw:`'determinate' | 'indeterminate'`,elements:[{name:`literal`,value:`'determinate'`},{name:`literal`,value:`'indeterminate'`}]},description:``,defaultValue:{value:`'indeterminate'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}},composes:[`Omit`]},z.__docgenInfo={description:``,methods:[],displayName:`LinearProgress`,props:{value:{required:!1,tsType:{name:`number`},description:"Fill percentage (0–100). Ignored when `variant` is `'indeterminate'`.",defaultValue:{value:`0`,computed:!1}},variant:{required:!1,tsType:{name:`union`,raw:`'determinate' | 'indeterminate'`,elements:[{name:`literal`,value:`'determinate'`},{name:`literal`,value:`'indeterminate'`}]},description:"`'determinate'` fills to `value`; `'indeterminate'` plays a looping scan animation for an unknown-length wait.",defaultValue:{value:`'determinate'`,computed:!1}},tone:{required:!1,tsType:{name:`union`,raw:`'default' | 'success' | 'danger'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'danger'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},"aria-label":{required:!1,tsType:{name:`string`},description:`Accessible name for the progress bar. Radix renders the root with
\`role="progressbar"\`, which obliges a name; defaults to "Loading" since
there is no visible text to derive one from. Pass something specific
("Upload progress") where the context warrants it.`},"aria-labelledby":{required:!1,tsType:{name:`string`},description:``}}}})))()}var V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{V=n(),B(),H=r(),U={title:`Components/Progress`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# Progress\n\n`CircularProgress` (hand-rolled SVG — Radix has no circular primitive) and\n`LinearProgress` (built on `@radix-ui/react-progress`), both styled with\n`getRoleColor()` role tokens rather than hardcoded hex.\n\n## API parity with MUI\nSame `value`/`variant`/`tone` props as the MUI `DSCircularProgress` /\n`DSLinearProgress` twins."}}}},W={render:e=>(0,H.jsx)(R,{...e}),args:{variant:`indeterminate`}},G={render:e=>(0,H.jsx)(R,{...e}),args:{variant:`determinate`,value:65}},K={render:()=>(0,H.jsxs)(`div`,{className:`flex items-center gap-6`,children:[(0,H.jsx)(R,{variant:`determinate`,value:70,tone:`default`}),(0,H.jsx)(R,{variant:`determinate`,value:70,tone:`success`}),(0,H.jsx)(R,{variant:`determinate`,value:70,tone:`danger`})]})},q={render:()=>(0,H.jsxs)(`div`,{className:`flex items-end gap-6`,children:[(0,H.jsx)(R,{size:24,variant:`determinate`,value:50}),(0,H.jsx)(R,{size:40,variant:`determinate`,value:50}),(0,H.jsx)(R,{size:64,variant:`determinate`,value:50})]})},J={render:e=>(0,H.jsx)(`div`,{className:`w-[320px]`,children:(0,H.jsx)(z,{...e})}),args:{variant:`determinate`,value:40}},Y={render:e=>(0,H.jsx)(`div`,{className:`w-[320px]`,children:(0,H.jsx)(z,{...e})}),args:{variant:`indeterminate`}},X={render:()=>(0,H.jsxs)(`div`,{className:`flex w-[320px] flex-col gap-4`,children:[(0,H.jsx)(z,{variant:`determinate`,value:60,tone:`default`}),(0,H.jsx)(z,{variant:`determinate`,value:60,tone:`success`}),(0,H.jsx)(z,{variant:`determinate`,value:60,tone:`danger`})]})},Z={render:()=>{let[e,t]=(0,V.useState)(0);return(0,V.useEffect)(()=>{let e=setInterval(()=>t(e=>e>=100?0:e+5),300);return()=>clearInterval(e)},[]),(0,H.jsxs)(`div`,{className:`flex w-[320px] flex-col items-center gap-4`,children:[(0,H.jsx)(z,{variant:`determinate`,value:e}),(0,H.jsx)(R,{variant:`determinate`,value:e})]})}},Q=[`CircularIndeterminate`,`CircularDeterminate`,`CircularTones`,`CircularSizes`,`LinearDeterminate`,`LinearIndeterminate`,`LinearTones`,`AnimatedUpload`],W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: args => <CircularProgress {...args} />,
  args: {
    variant: 'indeterminate'
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => <CircularProgress {...args} />,
  args: {
    variant: 'determinate',
    value: 65
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-6">
      <CircularProgress variant="determinate" value={70} tone="default" />
      <CircularProgress variant="determinate" value={70} tone="success" />
      <CircularProgress variant="determinate" value={70} tone="danger" />
    </div>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-6">
      <CircularProgress size={24} variant="determinate" value={50} />
      <CircularProgress size={40} variant="determinate" value={50} />
      <CircularProgress size={64} variant="determinate" value={50} />
    </div>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <LinearProgress {...args} />
    </div>,
  args: {
    variant: 'determinate',
    value: 40
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <LinearProgress {...args} />
    </div>,
  args: {
    variant: 'indeterminate'
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[320px] flex-col gap-4">
      <LinearProgress variant="determinate" value={60} tone="default" />
      <LinearProgress variant="determinate" value={60} tone="success" />
      <LinearProgress variant="determinate" value={60} tone="danger" />
    </div>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setValue(v => v >= 100 ? 0 : v + 5), 300);
      return () => clearInterval(id);
    }, []);
    return <div className="flex w-[320px] flex-col items-center gap-4">
        <LinearProgress variant="determinate" value={value} />
        <CircularProgress variant="determinate" value={value} />
      </div>;
  }
}`,...Z.parameters?.docs?.source}}}})))()}$();export{Z as AnimatedUpload,G as CircularDeterminate,W as CircularIndeterminate,q as CircularSizes,K as CircularTones,J as LinearDeterminate,Y as LinearIndeterminate,X as LinearTones,Q as __namedExportsOrder,U as default};