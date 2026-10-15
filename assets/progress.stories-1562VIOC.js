import{a5 as g,Z as r,ad as _}from"./iframe-CPBTUrEW.js";import{c as A}from"./index-D-VHP59e.js";import{P as M}from"./index-DbquDQCT.js";import{c as y}from"./utils-CURkPv3a.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";var O=Object.defineProperty,u=(e,a)=>O(e,"name",{value:a,configurable:!0}),$="Progress",V=100,[U,re]=A($),[G,F]=U($),X=g.forwardRef(u(function(a,l){const{__scopeProgress:i,value:n=null,max:t,getValueLabel:p=E,...m}=a;(t||t===0)&&!I(t)&&console.error(q(`${t}`,"Progress"));const d=I(t)?t:V;n!==null&&!L(n,d)&&console.error(D(`${n}`,"Progress"));const o=L(n,d)?n:null,v=f(o)?p(o,d):void 0;return r.jsx(G,{scope:i,value:o,max:d,children:r.jsx(M.div,{"aria-valuemax":d,"aria-valuemin":0,"aria-valuenow":f(o)?o:void 0,"aria-valuetext":v,role:"progressbar","data-state":S(o,d),"data-value":o??void 0,"data-max":d,...m,ref:l})})},"Progress")),z="ProgressIndicator",W=g.forwardRef(u(function(a,l){const{__scopeProgress:i,...n}=a,t=F(z,i);return r.jsx(M.div,{"data-state":S(t.value,t.max),"data-value":t.value??void 0,"data-max":t.max,...n,ref:l})},"ProgressIndicator"));function E(e,a){return`${Math.round(e/a*100)}%`}u(E,"defaultGetValueLabel");function S(e,a){return e==null?"indeterminate":e===a?"complete":"loading"}u(S,"getProgressState");function f(e){return typeof e=="number"}u(f,"isNumber");function I(e){return f(e)&&!isNaN(e)&&e>0}u(I,"isValidMaxNumber");function L(e,a){return f(e)&&!isNaN(e)&&e<=a&&e>=0}u(L,"isValidValueNumber");function q(e,a){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${V}\`.`}u(q,"getInvalidMaxError");function D(e,a){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${V} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}u(D,"getInvalidValueError");var Z=X,B=W;function R(e){switch(e){case"danger":return"interactive.danger";case"success":return"status.success.fg";default:return"interactive.primary"}}const s=g.forwardRef(({size:e=40,thickness:a=3.6,tone:l="default",value:i=0,variant:n="indeterminate",className:t,...p},m)=>{const d=_(R(l)),o=(e-a*2)/2,v=2*Math.PI*o,T=Math.min(Math.max(i,0),100),k=n==="determinate"?v-T/100*v:v*.75;return r.jsx("svg",{ref:m,className:y("shrink-0",n==="indeterminate"&&"animate-spin",t),width:e,height:e,viewBox:`0 0 ${e} ${e}`,role:"progressbar","aria-label":"Loading","aria-valuenow":n==="determinate"?T:void 0,"aria-valuemin":0,"aria-valuemax":100,...p,children:r.jsx("circle",{cx:e/2,cy:e/2,r:o,fill:"none",stroke:d,strokeWidth:a,strokeLinecap:"round",strokeDasharray:v,strokeDashoffset:k,transform:`rotate(-90 ${e/2} ${e/2})`})})});s.displayName="CircularProgress";const c=({value:e=0,variant:a="determinate",tone:l="default",className:i,"aria-label":n,"aria-labelledby":t})=>{const p=_(R(l)),m=Math.min(Math.max(e,0),100);return r.jsx(Z,{className:y("relative h-2 w-full overflow-hidden rounded-full",i),style:{backgroundColor:"var(--role-surface-subtle)"},value:a==="determinate"?m:void 0,"aria-label":t?void 0:n??"Loading","aria-labelledby":t,children:r.jsx(B,{className:y("h-full rounded-full transition-transform duration-300 ease-out",a==="indeterminate"?"w-1/3 animate-linear-indeterminate":"w-full"),style:{backgroundColor:p,transform:a==="determinate"?`translateX(-${100-m}%)`:void 0}})})};s.__docgenInfo={description:"",methods:[],displayName:"CircularProgress",props:{size:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"40",computed:!1}},thickness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"3.6",computed:!1}},tone:{required:!1,tsType:{name:"union",raw:"'default' | 'success' | 'danger'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'success'"},{name:"literal",value:"'danger'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},value:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'determinate' | 'indeterminate'",elements:[{name:"literal",value:"'determinate'"},{name:"literal",value:"'indeterminate'"}]},description:"",defaultValue:{value:"'indeterminate'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}},composes:["Omit"]};c.__docgenInfo={description:"",methods:[],displayName:"LinearProgress",props:{value:{required:!1,tsType:{name:"number"},description:"Fill percentage (0–100). Ignored when `variant` is `'indeterminate'`.",defaultValue:{value:"0",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'determinate' | 'indeterminate'",elements:[{name:"literal",value:"'determinate'"},{name:"literal",value:"'indeterminate'"}]},description:"`'determinate'` fills to `value`; `'indeterminate'` plays a looping scan animation for an unknown-length wait.",defaultValue:{value:"'determinate'",computed:!1}},tone:{required:!1,tsType:{name:"union",raw:"'default' | 'success' | 'danger'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'success'"},{name:"literal",value:"'danger'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},"aria-label":{required:!1,tsType:{name:"string"},description:`Accessible name for the progress bar. Radix renders the root with
\`role="progressbar"\`, which obliges a name; defaults to "Loading" since
there is no visible text to derive one from. Pass something specific
("Upload progress") where the context warrants it.`},"aria-labelledby":{required:!1,tsType:{name:"string"},description:""}}};const ae={title:"Components/Progress",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# Progress\n\n`CircularProgress` (hand-rolled SVG — Radix has no circular primitive) and\n`LinearProgress` (built on `@radix-ui/react-progress`), both styled with\n`getRoleColor()` role tokens rather than hardcoded hex.\n\n## API parity with MUI\nSame `value`/`variant`/`tone` props as the MUI `DSCircularProgress` /\n`DSLinearProgress` twins."}}}},x={render:e=>r.jsx(s,{...e}),args:{variant:"indeterminate"}},P={render:e=>r.jsx(s,{...e}),args:{variant:"determinate",value:65}},h={render:()=>r.jsxs("div",{className:"flex items-center gap-6",children:[r.jsx(s,{variant:"determinate",value:70,tone:"default"}),r.jsx(s,{variant:"determinate",value:70,tone:"success"}),r.jsx(s,{variant:"determinate",value:70,tone:"danger"})]})},b={render:()=>r.jsxs("div",{className:"flex items-end gap-6",children:[r.jsx(s,{size:24,variant:"determinate",value:50}),r.jsx(s,{size:40,variant:"determinate",value:50}),r.jsx(s,{size:64,variant:"determinate",value:50})]})},w={render:e=>r.jsx("div",{className:"w-[320px]",children:r.jsx(c,{...e})}),args:{variant:"determinate",value:40}},N={render:e=>r.jsx("div",{className:"w-[320px]",children:r.jsx(c,{...e})}),args:{variant:"indeterminate"}},C={render:()=>r.jsxs("div",{className:"flex w-[320px] flex-col gap-4",children:[r.jsx(c,{variant:"determinate",value:60,tone:"default"}),r.jsx(c,{variant:"determinate",value:60,tone:"success"}),r.jsx(c,{variant:"determinate",value:60,tone:"danger"})]})},j={render:()=>{const[e,a]=g.useState(0);return g.useEffect(()=>{const l=setInterval(()=>a(i=>i>=100?0:i+5),300);return()=>clearInterval(l)},[]),r.jsxs("div",{className:"flex w-[320px] flex-col items-center gap-4",children:[r.jsx(c,{variant:"determinate",value:e}),r.jsx(s,{variant:"determinate",value:e})]})}},te=["CircularIndeterminate","CircularDeterminate","CircularTones","CircularSizes","LinearDeterminate","LinearIndeterminate","LinearTones","AnimatedUpload"];x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <CircularProgress {...args} />,
  args: {
    variant: 'indeterminate'
  }
}`,...x.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => <CircularProgress {...args} />,
  args: {
    variant: 'determinate',
    value: 65
  }
}`,...P.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-6">
      <CircularProgress variant="determinate" value={70} tone="default" />
      <CircularProgress variant="determinate" value={70} tone="success" />
      <CircularProgress variant="determinate" value={70} tone="danger" />
    </div>
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-6">
      <CircularProgress size={24} variant="determinate" value={50} />
      <CircularProgress size={40} variant="determinate" value={50} />
      <CircularProgress size={64} variant="determinate" value={50} />
    </div>
}`,...b.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <LinearProgress {...args} />
    </div>,
  args: {
    variant: 'determinate',
    value: 40
  }
}`,...w.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <LinearProgress {...args} />
    </div>,
  args: {
    variant: 'indeterminate'
  }
}`,...N.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[320px] flex-col gap-4">
      <LinearProgress variant="determinate" value={60} tone="default" />
      <LinearProgress variant="determinate" value={60} tone="success" />
      <LinearProgress variant="determinate" value={60} tone="danger" />
    </div>
}`,...C.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};export{j as AnimatedUpload,P as CircularDeterminate,x as CircularIndeterminate,b as CircularSizes,h as CircularTones,w as LinearDeterminate,N as LinearIndeterminate,C as LinearTones,te as __namedExportsOrder,ae as default};
