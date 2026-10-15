import{a5 as f,Z as e,ad as Ae}from"./iframe-CPBTUrEW.js";import{c as p}from"./utils-CURkPv3a.js";import{B as Ie}from"./badge-J44eyYsr.js";import{L as ze,B as k}from"./button-_tNb_vhW.js";import{X as Be}from"./x-Bk_wSNf2.js";import{C as De}from"./check-KuCy08bp.js";import{c as me}from"./createLucideIcon-BnpAccaP.js";import{C as Te}from"./credit-card-CwI8B8IA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dk2lMVn3.js";import"./index-DTX6ga2Q.js";import"./control-size-rvCN7ZpI.js";const Re=[["path",{d:"M15 13a3 3 0 1 0-6 0",key:"10j68g"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}]],Le=me("book-user",Re);const Me=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Ee=me("lock",Me);function We(r,a,n){if(r.status)return r.status;if(n!==void 0)return a<n?"completed":a===n?"active":"pending"}function Oe(r){switch(r){case"completed":case"active":return"text.primary";case"error":return"status.danger.fg";default:return"text.secondary"}}const be={numbered:24,outlined:20,icon:32};function Ve(r,a){const n="var(--role-interactive-primary)",o="var(--role-text-onInteractive)";switch(r){case"completed":{const m=a==="success"?"var(--role-status-success-fg)":n;return{bg:m,fg:"var(--role-text-inverse)",border:m}}case"active":return{bg:n,fg:o,border:n};case"error":{const m="var(--role-status-danger-fg)";return{bg:m,fg:"var(--role-text-onDanger)",border:m}}default:return{bg:"var(--role-surface-disabled)",fg:"var(--role-text-secondary)",border:"var(--role-border-default)"}}}function W({step:r,index:a,status:n,indicator:o,completedTone:m}){const b=Ve(n,m);if(o==="bar"){const se=n==="completed"||n==="active";return e.jsx("div",{className:"h-1 w-full shrink-0 rounded-full",style:{backgroundColor:n==="error"?"var(--role-status-danger-fg)":se?b.bg:"var(--role-border-default)"},children:e.jsx("span",{className:"sr-only",children:r.label})})}const i=be[o],w=o==="outlined",j=w&&n!=="completed"&&n!=="error"?"transparent":b.bg,ae=w&&n!=="completed"&&n!=="error"?b.border:b.fg,I=r.loading?e.jsx(ze,{className:"animate-spin",style:{width:i*.58,height:i*.58}}):n==="error"?e.jsx(Be,{style:{width:i*.58,height:i*.58},strokeWidth:3}):n==="completed"?e.jsx(De,{style:{width:i*.58,height:i*.58},strokeWidth:3}):o==="icon"?r.icon??e.jsx("span",{className:"text-xs font-medium",children:a+1}):w?n==="active"?e.jsx("span",{className:"block size-1.5 rounded-full",style:{backgroundColor:b.bg}}):null:e.jsx("span",{className:"text-xs font-medium",children:a+1});return e.jsx("div",{className:"relative flex shrink-0 items-center justify-center overflow-hidden rounded-full",style:{width:i,height:i,backgroundColor:j,color:ae,border:w||o==="icon"?`2px solid ${b.border}`:void 0},children:I})}function qe(r){return r==="completed"?"success":r==="error"?"danger":"default"}function He(r){switch(r){case"completed":return"Completed";case"active":return"In Progress";case"error":return"Error";default:return"Pending"}}const v=f.forwardRef(({steps:r,activeStep:a,orientation:n="vertical",variant:o="default",onStepClick:m,contentMode:b="inline",indicator:i="numbered",labelPlacement:w,labelAlign:j="center",showSeparator:ae=!0,showStatusBadge:I=!1,showStepEyebrow:se=!1,completedTone:N="primary",className:fe},we)=>{const P=n==="horizontal",S=i==="bar",z=S?"below":w??(P?"below":"inline"),l=!!m,le=f.useRef([]),ce=r.map((t,s)=>We(t,s,a)),B=a??ce.findIndex(t=>t==="active"),h=r.reduce((t,s,d)=>(s.disabled||t.push(d),t),[]),oe=t=>le.current[t]?.focus(),de=(t,s)=>{if(h.length===0)return;const d=h.indexOf(t),u=(d===-1?0:d+s+h.length)%h.length;oe(h[u])},Se=(t,s)=>{switch(t.key){case"ArrowRight":case"ArrowDown":t.preventDefault(),de(s,1);break;case"ArrowLeft":case"ArrowUp":t.preventDefault(),de(s,-1);break;case"Home":t.preventDefault(),h.length&&oe(h[0]);break;case"End":t.preventDefault(),h.length&&oe(h[h.length-1]);break;case"Enter":case" ":t.preventDefault(),m?.(s);break}},ye="var(--role-border-default)",xe=N==="success"?"var(--role-status-success-fg)":"var(--role-interactive-primary)",g=S?0:be[i],Ce=o==="compact"?8:12,D=b==="active-only"&&B>=0?r[B]:void 0,ie=(t,s,d,u)=>z==="none"?null:e.jsxs("div",{className:p("flex flex-col",u==="center"?"items-center text-center":"items-start text-left",t.description||I?"gap-1":"gap-0.5"),children:[se&&e.jsxs("span",{className:"text-[10px] font-semibold uppercase leading-none",style:{color:"var(--role-text-secondary)"},children:["Step ",s+1]}),e.jsx("span",{className:p("font-medium",o==="compact"?"text-xs":"text-sm"),style:{color:Ae(Oe(d)),lineHeight:1},children:t.label}),t.description&&e.jsx("span",{className:p("leading-snug",o==="compact"?"text-[11px]":"text-sm"),style:{color:"var(--role-text-secondary)"},children:t.description}),I&&d&&e.jsx("span",{className:"mt-0.5",children:e.jsx(Ie,{tone:qe(d),soft:!0,size:"sm",children:He(d)})})]}),ke=(t,s)=>{const d=s===r.length-1,u=ce[s],pe=s===B,y=!!t.disabled,je=b==="active-only"&&!!t.content,T=u==="completed"?xe:ye,R=ae&&!d&&!S,L={role:l?"tab":void 0,id:l?`stepper-tab-${t.id}`:void 0,"aria-selected":l?pe:void 0,"aria-disabled":l&&y?!0:void 0,"aria-controls":l&&je?`stepper-panel-${t.id}`:void 0,tabIndex:l?y?-1:pe||B===-1&&s===0?0:-1:void 0,onClick:l&&!y?()=>m?.(s):void 0,onKeyDown:l&&!y?x=>Se(x,s):void 0,ref:x=>{le.current[s]=x}},M=p(l&&!y&&"cursor-pointer rounded-md focus-visible:outline-hidden focus-visible:ring-2",l&&y&&"cursor-not-allowed opacity-50"),E=l?{"--tw-ring-color":"var(--role-focus-ring)"}:void 0;if(P&&z==="below"){const x=g/2,Ne=j==="center"?`calc(50% + ${x+4}px)`:`${g+8}px`,Pe=`calc(100% - ${g+8}px)`;return e.jsxs("div",{className:"relative flex flex-1 flex-col",children:[e.jsxs("div",{...L,className:p("flex flex-col",j==="center"?"items-center":"items-start",S?"gap-3.5":"gap-2.5",M),style:E,children:[e.jsx("div",{className:p(S?"w-full":"flex justify-center"),style:S?void 0:{width:g},children:e.jsx(W,{step:t,index:s,status:u,indicator:i,completedTone:N})}),ie(t,s,u,j)]}),R&&e.jsx("div",{"aria-hidden":!0,className:"absolute h-0.5 rounded-md",style:{top:x-1,left:Ne,width:Pe,backgroundColor:T}})]},t.id)}return P?e.jsxs("div",{className:p("flex items-center",!d&&"flex-1"),children:[e.jsxs("div",{...L,className:p("inline-flex items-center gap-2.5",M),style:E,children:[e.jsx(W,{step:t,index:s,status:u,indicator:i,completedTone:N}),ie(t,s,u,"start")]}),R&&e.jsx("div",{"aria-hidden":!0,className:"mx-2.5 h-0.5 flex-1 rounded-md",style:{backgroundColor:T}})]},t.id):z==="none"?e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{...L,className:p("inline-flex",M),style:E,children:e.jsx(W,{step:t,index:s,status:u,indicator:i,completedTone:N})}),R&&e.jsx("div",{"aria-hidden":!0,className:"my-1.5 w-0.5 rounded-md",style:{height:48,backgroundColor:T}})]},t.id):e.jsxs("div",{className:p("relative flex",!d&&"flex-1"),children:[e.jsxs("div",{...L,className:p("inline-flex items-start gap-2.5",M,!d&&(o==="compact"?"pb-6":"pb-10")),style:E,children:[e.jsx(W,{step:t,index:s,status:u,indicator:i,completedTone:N}),e.jsxs("div",{className:"mt-0.5 flex flex-col gap-2",children:[ie(t,s,u,"start"),t.content&&b==="inline"&&e.jsx("div",{className:"text-sm",style:{color:"var(--role-text-primary)"},children:t.content})]})]}),R&&e.jsx("div",{"aria-hidden":!0,className:"absolute w-0.5 rounded-md",style:{left:g/2-1,top:g+4,height:`calc(100% - ${g+8}px)`,backgroundColor:T}})]},t.id)};return e.jsxs("div",{ref:we,className:p("flex w-full flex-col",fe),style:{gap:o==="compact"?16:24},children:[e.jsx("div",{role:l?"tablist":void 0,"aria-orientation":l?n:void 0,className:p("flex",P?"w-full flex-row items-start":"flex-col"),style:P&&z==="below"?{gap:Ce}:void 0,children:r.map(ke)}),D?.content&&e.jsx("div",{role:l?"tabpanel":void 0,id:`stepper-panel-${D.id}`,"aria-labelledby":l?`stepper-tab-${D.id}`:void 0,className:"text-sm",style:{color:"var(--role-text-primary)"},children:D.content})]})});v.displayName="Stepper";v.__docgenInfo={description:"Forwards to the outer wrapper `<div>` — individual step triggers already\nmanage their own focus internally (see `triggerRefs` below); this ref is\nfor measuring/scrolling the whole stepper, e.g. into view on step change.",methods:[],displayName:"Stepper",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"StepConfig"}],raw:"StepConfig[]"},description:""},activeStep:{required:!1,tsType:{name:"number"},description:"Index of the active step (MUI-parity API). When provided, drives each\nstep's completed/active/pending status by position — a step's own\nexplicit `status` still wins if set, so both APIs compose."},orientation:{required:!1,tsType:{name:"union",raw:"'vertical' | 'horizontal'",elements:[{name:"literal",value:"'vertical'"},{name:"literal",value:"'horizontal'"}]},description:"",defaultValue:{value:"'vertical'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'compact'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'compact'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},onStepClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(stepIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"stepIndex"}],return:{name:"void"}}},description:""},contentMode:{required:!1,tsType:{name:"union",raw:"'inline' | 'active-only'",elements:[{name:"literal",value:"'inline'"},{name:"literal",value:"'active-only'"}]},description:"How step `content` is displayed. `'inline'` (default) renders every\nstep's content under that step. `'active-only'` renders a single shared\npanel below the step row showing just the active step's content\n(reui's `StepperPanel`/`StepperContent` pattern), in either orientation.",defaultValue:{value:"'inline'",computed:!1}},indicator:{required:!1,tsType:{name:"union",raw:`| 'numbered'
/** 20px 2px-bordered circle, filled dot when active (reui demo 3). */
| 'outlined'
/** 32px circle holding the step's own \`icon\` (reui demo 7). */
| 'icon'
/** Full-width progress bar segment instead of a circle (reui demos 11/12). */
| 'bar'`,elements:[{name:"literal",value:"'numbered'"},{name:"literal",value:"'outlined'"},{name:"literal",value:"'icon'"},{name:"literal",value:"'bar'"}]},description:"Indicator shape — see `StepIndicatorStyle`. Defaults to `'numbered'`.",defaultValue:{value:"'numbered'",computed:!1}},labelPlacement:{required:!1,tsType:{name:"union",raw:`| 'none'
/** Beside the indicator (reui demos 9/10/13/15). */
| 'inline'
/** Stacked under the indicator (reui demos 5/6/8/11). */
| 'below'`,elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'inline'"},{name:"literal",value:"'below'"}]},description:"Label position. Defaults to `'below'` for horizontal and `'inline'` for\nvertical — the two layouts reui's demos actually use per orientation.\n`indicator=\"bar\"` always stacks labels below the bar."},labelAlign:{required:!1,tsType:{name:"union",raw:"'center' | 'start'",elements:[{name:"literal",value:"'center'"},{name:"literal",value:"'start'"}]},description:"Label alignment for `labelPlacement=\"below\"`. Defaults to `'center'`.",defaultValue:{value:"'center'",computed:!1}},showSeparator:{required:!1,tsType:{name:"boolean"},description:"Draws the connector between steps. On by default; reui demos 6/11/12 turn it off.",defaultValue:{value:"true",computed:!1}},showStatusBadge:{required:!1,tsType:{name:"boolean"},description:"Renders a status pill per step (reui demo 7's In Progress/Completed/Pending). Off by default.",defaultValue:{value:"false",computed:!1}},showStepEyebrow:{required:!1,tsType:{name:"boolean"},description:'Renders a small uppercase "STEP N" eyebrow above the title (reui demo 7). Off by default.',defaultValue:{value:"false",computed:!1}},completedTone:{required:!1,tsType:{name:"union",raw:"'primary' | 'success'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'success'"}]},description:"Fill color for completed steps. reui's demos use both. Defaults to `'primary'`.",defaultValue:{value:"'primary'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const tt={title:"Components/Stepper",component:v,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"# Stepper\n\n`getRoleColor()`-driven counterpart to the MUI `Stepper`. Built against\nthe real `steps: StepConfig[]` API (per-step `status`) — the\n`Stepper.figma.tsx` mapping's `steps: string[]` example doesn't match\nany prop the actual MUI component accepts.\n\nVisual language is ported from reui's Stepper\n([reui.io/components/stepper](https://reui.io/components/stepper)) — 24px\nfilled numbered indicators, 2px separators, `text-sm leading-none\nfont-medium` titles — with their raw upstream CSS vars mapped onto this\nrepo's role tokens. The stories below reproduce all 15 of reui's demos\nthrough this component's `indicator` / `labelPlacement` / `labelAlign` /\n`showSeparator` / `showStatusBadge` / `showStepEyebrow` / `completedTone`\nprops, and are labelled with the reui demo they mirror."}}},argTypes:{orientation:{control:"select",options:["vertical","horizontal"]},variant:{control:"select",options:["default","compact"]},indicator:{control:"select",options:["numbered","outlined","icon","bar"],description:"Indicator shape: filled numbered circle, hollow ring with an active dot, icon circle, or a progress-bar segment."},labelPlacement:{control:"select",options:["none","inline","below"],description:"Label position relative to the indicator. Defaults to `below` for horizontal, `inline` for vertical."},labelAlign:{control:"select",options:["center","start"],description:'Label alignment when `labelPlacement="below"`.'},contentMode:{control:"select",options:["inline","active-only"],description:"How step `content` is displayed: per-step inline blocks, or a single shared tabpanel for just the active step."},completedTone:{control:"select",options:["primary","success"],description:"Fill color for completed steps and their separators."},showSeparator:{control:"boolean",description:"Draws the connector between steps."},showStatusBadge:{control:"boolean",description:"Renders a status pill per step (reui demo 7)."},showStepEyebrow:{control:"boolean",description:'Renders a small uppercase "STEP N" eyebrow above the title (reui demo 7).'}}},C=[{id:"1",label:"Step 1",content:"Step 1 content"},{id:"2",label:"Step 2",content:"Step 2 content"},{id:"3",label:"Step 3",content:"Step 3 content"},{id:"4",label:"Step 4",content:"Step 4 content"}],he=[{id:"account",label:"Account",description:"Create your account"},{id:"profile",label:"Profile",description:"Set up your profile"},{id:"review",label:"Review",description:"Confirm your details"}],ve=[{id:"user",label:"User Details"},{id:"payment",label:"Payment Info"},{id:"otp",label:"Auth OTP"},{id:"preview",label:"Preview Form"}],ue=[{id:"user",label:"User Details",icon:e.jsx(Le,{className:"size-4"})},{id:"payment",label:"Payment Info",icon:e.jsx(Te,{className:"size-4"})},{id:"otp",label:"Auth OTP",icon:e.jsx(Ee,{className:"size-4"})}],ge=[{id:"1",label:"Claim submitted",description:"Jan 3, 2026",status:"completed"},{id:"2",label:"Under review",description:"Adjuster assigned",status:"active"},{id:"3",label:"Decision",status:"pending"},{id:"4",label:"Payout",status:"pending"}],c=(r,a)=>({docs:{description:{story:`Mirrors [reui stepper demo ${r}](https://reui.io/components/stepper) — ${a}`}}}),A={parameters:c(1,"numbered indicators with connecting separators, no labels."),args:{steps:C,activeStep:1,orientation:"horizontal",labelPlacement:"none",contentMode:"active-only"}},O={parameters:c(2,"the same layout with completed steps and separators in the success tone instead of brand primary."),args:{...A.args,completedTone:"success"}},V={parameters:c(3,"small 20px hollow ring indicators — the active step shows a filled dot, and step 2 is mid-flight (`loading`)."),args:{steps:[{id:"1",label:"Step 1",content:"Step 1 content"},{id:"2",label:"Step 2",content:"Step 2 content",loading:!0},{id:"3",label:"Step 3",content:"Step 3 content"}],activeStep:1,orientation:"horizontal",labelPlacement:"none",indicator:"outlined",completedTone:"success",contentMode:"active-only"}},q={parameters:c(4,"driven by external Previous/Next buttons rather than clicking the steps themselves."),render:r=>{const[a,n]=f.useState(1);return e.jsxs("div",{className:"flex w-full max-w-md flex-col gap-8",children:[e.jsx(v,{...r,activeStep:a,onStepClick:n}),e.jsxs("div",{className:"flex items-center justify-between gap-2.5",children:[e.jsx(k,{variant:"outline",onClick:()=>n(o=>o-1),disabled:a===0,children:"Previous"}),e.jsx(k,{variant:"outline",onClick:()=>n(o=>o+1),disabled:a===C.length-1,children:"Next"})]})]})},args:{steps:C,orientation:"horizontal",labelPlacement:"none",completedTone:"success",contentMode:"active-only"}},H={parameters:c(5,"titles stacked under centered indicators, separators spanning the gap between them."),args:{steps:[{id:"1",label:"Step 1",content:"Step 1 content"},{id:"2",label:"Step 2",content:"Step 2 content"},{id:"3",label:"Step 3",content:"Step 3 content"}],activeStep:1,orientation:"horizontal",labelPlacement:"below",contentMode:"active-only"}},_={parameters:c(6,"left-aligned titles under the indicators with no separators."),args:{steps:ve,activeStep:1,orientation:"horizontal",labelPlacement:"below",labelAlign:"start",showSeparator:!1}},$={parameters:c(7,'the fullest variant: 32px icon indicators, a "STEP N" eyebrow, per-step status pills, success-toned completion, and external navigation.'),render:r=>{const[a,n]=f.useState(1);return e.jsxs("div",{className:"flex w-full max-w-xl flex-col gap-8",children:[e.jsx(v,{...r,activeStep:a,onStepClick:n}),e.jsxs("div",{className:"flex items-center justify-between gap-2.5",children:[e.jsx(k,{variant:"outline",onClick:()=>n(o=>o-1),disabled:a===0,children:"Previous"}),e.jsx(k,{variant:"outline",onClick:()=>n(o=>o+1),disabled:a===ue.length-1,children:"Next"})]})]})},args:{steps:ue,orientation:"horizontal",indicator:"icon",labelPlacement:"below",labelAlign:"start",showStepEyebrow:!0,showStatusBadge:!0,completedTone:"success"}},U={parameters:c(8,"title plus description stacked under centered indicators."),args:{steps:he,activeStep:1,orientation:"horizontal",labelPlacement:"below"}},F={parameters:c(9,"indicator and title side by side, separators filling the space between steps."),args:{steps:[{id:"account",label:"Account"},{id:"profile",label:"Profile"},{id:"review",label:"Review"}],activeStep:1,orientation:"horizontal",labelPlacement:"inline"}},G={parameters:c(10,"inline layout carrying a description under each title."),args:{steps:[{id:"1",label:"Step 1",description:"Description"},{id:"2",label:"Step 2",description:"Description"},{id:"3",label:"Step 3",description:"Description"}],activeStep:1,orientation:"horizontal",labelPlacement:"inline"}},J={parameters:c(11,"the circle is replaced by a full-width progress bar per step, with the title underneath."),args:{steps:ve,activeStep:1,orientation:"horizontal",indicator:"bar",labelAlign:"start"}},K={parameters:c(12,'bare segmented progress bar with a Back control and an "N / total" counter — no per-step labels.'),render:r=>{const[a,n]=f.useState(0);return e.jsxs("div",{className:"flex w-full max-w-md flex-col gap-4",children:[e.jsx(v,{...r,activeStep:a}),e.jsxs("div",{className:"flex items-center justify-between gap-2.5",children:[e.jsx(k,{variant:"ghost",onClick:()=>n(o=>o-1),disabled:a===0,children:"Back"}),e.jsxs("div",{className:"text-sm font-medium",children:[a+1," ",e.jsxs("span",{className:"opacity-60",children:["/ ",C.length]})]}),e.jsx(k,{variant:"outline",onClick:()=>n(o=>o+1),disabled:a===C.length-1,children:"Next"})]})]})},args:{steps:C.map(({content:r,...a})=>a),orientation:"horizontal",indicator:"bar",labelPlacement:"none"}},Z={parameters:c(13,"vertical rail with title and description beside each indicator."),args:{steps:he,activeStep:1,orientation:"vertical",completedTone:"success"}},X={parameters:c(14,"vertical rail of bare indicators, step 2 mid-flight (`loading`)."),args:{steps:[{id:"1",label:"Step 1"},{id:"2",label:"Step 2",loading:!0},{id:"3",label:"Step 3"}],activeStep:1,orientation:"vertical",labelPlacement:"none",completedTone:"success"}},Q={parameters:c(15,"vertical rail with titles only, no descriptions."),args:{steps:[{id:"account",label:"Account"},{id:"profile",label:"Profile"},{id:"review",label:"Review"}],activeStep:1,orientation:"vertical",completedTone:"success"}},Y={parameters:{docs:{description:{story:'MDS `variant="compact"` — tighter gaps and smaller type for dense layouts.'}}},args:{steps:ge,variant:"compact"}},ee={parameters:{docs:{description:{story:'MDS extension — reui has no error state; a step with `status: "error"` renders a danger-toned ✕ indicator.'}}},args:{steps:[{id:"1",label:"Application submitted",status:"completed"},{id:"2",label:"Document verification",status:"error",description:"Missing required document"},{id:"3",label:"Approval",status:"pending"}]}},te={parameters:{docs:{description:{story:"A `disabled` step is skipped by both clicks and keyboard navigation (Arrow/Home/End step over it), matching native disabled-tab behavior."}}},args:{steps:[{id:"1",label:"Account details",status:"completed"},{id:"2",label:"Payment method",status:"active"},{id:"3",label:"Two-factor setup",status:"pending",disabled:!0,description:"Unavailable until payment is confirmed"},{id:"4",label:"Review & submit",status:"pending"}],onStepClick:()=>{}}},ne={parameters:{docs:{description:{story:"Interactive steps follow the WAI-ARIA tablist pattern: click a step, or focus one and use Arrow keys/Home/End to move between steps and Enter/Space to activate — same keyboard model as reui."}}},render:r=>{const[a,n]=f.useState(1);return e.jsx(v,{...r,activeStep:a,onStepClick:n})},args:{steps:ge.map(({status:r,...a})=>a),orientation:"horizontal"}},re={parameters:{docs:{description:{story:'`contentMode="active-only"` renders a single shared tabpanel below the step row showing just the active step\'s content — reui\'s `StepperPanel`/`StepperContent` pattern — instead of `"inline"`\'s per-step content blocks. Click a step to switch panels.'}}},render:r=>{const[a,n]=f.useState(1);return e.jsx(v,{...r,activeStep:a,onStepClick:n})},args:{steps:[{id:"1",label:"Account details",content:"Jane Doe · jane@company.com"},{id:"2",label:"Coverage selection",content:"Select which policies to include: General Liability, Cyber, Property."},{id:"3",label:"Review & submit",content:"Review your selections before submitting."}],orientation:"horizontal",contentMode:"active-only"}},nt=["HorizontalNumbered","SuccessTone","OutlinedIndicators","WithPreviousNextButtons","LabelBelowCentered","LabelBelowStart","RichWithBadges","LabelAndDescriptionBelow","InlineLabels","InlineLabelsWithDescription","BarIndicators","BarProgressWithCounter","VerticalWithDescription","VerticalIndicatorsOnly","VerticalTitlesOnly","Compact","WithError","WithDisabledStep","Clickable","ActiveOnlyContent"];A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: demo(1, 'numbered indicators with connecting separators, no labels.'),
  args: {
    steps: numberedSteps,
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'none',
    contentMode: 'active-only'
  }
}`,...A.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: demo(2, 'the same layout with completed steps and separators in the success tone instead of brand primary.'),
  args: {
    ...HorizontalNumbered.args,
    completedTone: 'success'
  }
}`,...O.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: demo(3, 'small 20px hollow ring indicators — the active step shows a filled dot, and step 2 is mid-flight (\`loading\`).'),
  args: {
    steps: [{
      id: '1',
      label: 'Step 1',
      content: 'Step 1 content'
    }, {
      id: '2',
      label: 'Step 2',
      content: 'Step 2 content',
      loading: true
    }, {
      id: '3',
      label: 'Step 3',
      content: 'Step 3 content'
    }],
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'none',
    indicator: 'outlined',
    completedTone: 'success',
    contentMode: 'active-only'
  }
}`,...V.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  parameters: demo(4, 'driven by external Previous/Next buttons rather than clicking the steps themselves.'),
  render: args => {
    const [current, setCurrent] = useState(1);
    return <div className="flex w-full max-w-md flex-col gap-8">
        <Stepper {...args} activeStep={current} onStepClick={setCurrent} />
        <div className="flex items-center justify-between gap-2.5">
          <Button variant="outline" onClick={() => setCurrent(p => p - 1)} disabled={current === 0}>
            Previous
          </Button>
          <Button variant="outline" onClick={() => setCurrent(p => p + 1)} disabled={current === numberedSteps.length - 1}>
            Next
          </Button>
        </div>
      </div>;
  },
  args: {
    steps: numberedSteps,
    orientation: 'horizontal',
    labelPlacement: 'none',
    completedTone: 'success',
    contentMode: 'active-only'
  }
}`,...q.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: demo(5, 'titles stacked under centered indicators, separators spanning the gap between them.'),
  args: {
    steps: [{
      id: '1',
      label: 'Step 1',
      content: 'Step 1 content'
    }, {
      id: '2',
      label: 'Step 2',
      content: 'Step 2 content'
    }, {
      id: '3',
      label: 'Step 3',
      content: 'Step 3 content'
    }],
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'below',
    contentMode: 'active-only'
  }
}`,...H.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: demo(6, 'left-aligned titles under the indicators with no separators.'),
  args: {
    steps: formSteps,
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'below',
    labelAlign: 'start',
    showSeparator: false
  }
}`,..._.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  parameters: demo(7, 'the fullest variant: 32px icon indicators, a "STEP N" eyebrow, per-step status pills, success-toned completion, and external navigation.'),
  render: args => {
    const [current, setCurrent] = useState(1);
    return <div className="flex w-full max-w-xl flex-col gap-8">
        <Stepper {...args} activeStep={current} onStepClick={setCurrent} />
        <div className="flex items-center justify-between gap-2.5">
          <Button variant="outline" onClick={() => setCurrent(p => p - 1)} disabled={current === 0}>
            Previous
          </Button>
          <Button variant="outline" onClick={() => setCurrent(p => p + 1)} disabled={current === iconSteps.length - 1}>
            Next
          </Button>
        </div>
      </div>;
  },
  args: {
    steps: iconSteps,
    orientation: 'horizontal',
    indicator: 'icon',
    labelPlacement: 'below',
    labelAlign: 'start',
    showStepEyebrow: true,
    showStatusBadge: true,
    completedTone: 'success'
  }
}`,...$.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: demo(8, 'title plus description stacked under centered indicators.'),
  args: {
    steps: onboardingSteps,
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'below'
  }
}`,...U.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: demo(9, 'indicator and title side by side, separators filling the space between steps.'),
  args: {
    steps: [{
      id: 'account',
      label: 'Account'
    }, {
      id: 'profile',
      label: 'Profile'
    }, {
      id: 'review',
      label: 'Review'
    }],
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'inline'
  }
}`,...F.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  parameters: demo(10, 'inline layout carrying a description under each title.'),
  args: {
    steps: [{
      id: '1',
      label: 'Step 1',
      description: 'Description'
    }, {
      id: '2',
      label: 'Step 2',
      description: 'Description'
    }, {
      id: '3',
      label: 'Step 3',
      description: 'Description'
    }],
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'inline'
  }
}`,...G.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  parameters: demo(11, 'the circle is replaced by a full-width progress bar per step, with the title underneath.'),
  args: {
    steps: formSteps,
    activeStep: 1,
    orientation: 'horizontal',
    indicator: 'bar',
    labelAlign: 'start'
  }
}`,...J.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: demo(12, 'bare segmented progress bar with a Back control and an "N / total" counter — no per-step labels.'),
  render: args => {
    const [current, setCurrent] = useState(0);
    return <div className="flex w-full max-w-md flex-col gap-4">
        <Stepper {...args} activeStep={current} />
        <div className="flex items-center justify-between gap-2.5">
          <Button variant="ghost" onClick={() => setCurrent(p => p - 1)} disabled={current === 0}>
            Back
          </Button>
          <div className="text-sm font-medium">
            {current + 1} <span className="opacity-60">/ {numberedSteps.length}</span>
          </div>
          <Button variant="outline" onClick={() => setCurrent(p => p + 1)} disabled={current === numberedSteps.length - 1}>
            Next
          </Button>
        </div>
      </div>;
  },
  args: {
    steps: numberedSteps.map(({
      content: _content,
      ...s
    }) => s),
    orientation: 'horizontal',
    indicator: 'bar',
    labelPlacement: 'none'
  }
}`,...K.parameters?.docs?.source}}};Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: demo(13, 'vertical rail with title and description beside each indicator.'),
  args: {
    steps: onboardingSteps,
    activeStep: 1,
    orientation: 'vertical',
    completedTone: 'success'
  }
}`,...Z.parameters?.docs?.source}}};X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  parameters: demo(14, 'vertical rail of bare indicators, step 2 mid-flight (\`loading\`).'),
  args: {
    steps: [{
      id: '1',
      label: 'Step 1'
    }, {
      id: '2',
      label: 'Step 2',
      loading: true
    }, {
      id: '3',
      label: 'Step 3'
    }],
    activeStep: 1,
    orientation: 'vertical',
    labelPlacement: 'none',
    completedTone: 'success'
  }
}`,...X.parameters?.docs?.source}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  parameters: demo(15, 'vertical rail with titles only, no descriptions.'),
  args: {
    steps: [{
      id: 'account',
      label: 'Account'
    }, {
      id: 'profile',
      label: 'Profile'
    }, {
      id: 'review',
      label: 'Review'
    }],
    activeStep: 1,
    orientation: 'vertical',
    completedTone: 'success'
  }
}`,...Q.parameters?.docs?.source}}};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'MDS \`variant="compact"\` — tighter gaps and smaller type for dense layouts.'
      }
    }
  },
  args: {
    steps: claimSteps,
    variant: 'compact'
  }
}`,...Y.parameters?.docs?.source}}};ee.parameters={...ee.parameters,docs:{...ee.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'MDS extension — reui has no error state; a step with \`status: "error"\` renders a danger-toned ✕ indicator.'
      }
    }
  },
  args: {
    steps: [{
      id: '1',
      label: 'Application submitted',
      status: 'completed'
    }, {
      id: '2',
      label: 'Document verification',
      status: 'error',
      description: 'Missing required document'
    }, {
      id: '3',
      label: 'Approval',
      status: 'pending'
    }]
  }
}`,...ee.parameters?.docs?.source}}};te.parameters={...te.parameters,docs:{...te.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'A \`disabled\` step is skipped by both clicks and keyboard navigation (Arrow/Home/End step over it), matching native disabled-tab behavior.'
      }
    }
  },
  args: {
    steps: [{
      id: '1',
      label: 'Account details',
      status: 'completed'
    }, {
      id: '2',
      label: 'Payment method',
      status: 'active'
    }, {
      id: '3',
      label: 'Two-factor setup',
      status: 'pending',
      disabled: true,
      description: 'Unavailable until payment is confirmed'
    }, {
      id: '4',
      label: 'Review & submit',
      status: 'pending'
    }],
    onStepClick: () => {}
  }
}`,...te.parameters?.docs?.source}}};ne.parameters={...ne.parameters,docs:{...ne.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Interactive steps follow the WAI-ARIA tablist pattern: click a step, or focus one and use Arrow keys/Home/End to move between steps and Enter/Space to activate — same keyboard model as reui.'
      }
    }
  },
  render: args => {
    const [current, setCurrent] = useState(1);
    return <Stepper {...args} activeStep={current} onStepClick={setCurrent} />;
  },
  args: {
    steps: claimSteps.map(({
      status: _status,
      ...s
    }) => s),
    orientation: 'horizontal'
  }
}`,...ne.parameters?.docs?.source}}};re.parameters={...re.parameters,docs:{...re.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`contentMode="active-only"\` renders a single shared tabpanel below the step row showing just the active step\\'s content — reui\\'s \`StepperPanel\`/\`StepperContent\` pattern — instead of \`"inline"\`\\'s per-step content blocks. Click a step to switch panels.'
      }
    }
  },
  render: args => {
    const [current, setCurrent] = useState(1);
    return <Stepper {...args} activeStep={current} onStepClick={setCurrent} />;
  },
  args: {
    steps: [{
      id: '1',
      label: 'Account details',
      content: 'Jane Doe · jane@company.com'
    }, {
      id: '2',
      label: 'Coverage selection',
      content: 'Select which policies to include: General Liability, Cyber, Property.'
    }, {
      id: '3',
      label: 'Review & submit',
      content: 'Review your selections before submitting.'
    }],
    orientation: 'horizontal',
    contentMode: 'active-only'
  }
}`,...re.parameters?.docs?.source}}};export{re as ActiveOnlyContent,J as BarIndicators,K as BarProgressWithCounter,ne as Clickable,Y as Compact,A as HorizontalNumbered,F as InlineLabels,G as InlineLabelsWithDescription,U as LabelAndDescriptionBelow,H as LabelBelowCentered,_ as LabelBelowStart,V as OutlinedIndicators,$ as RichWithBadges,O as SuccessTone,X as VerticalIndicatorsOnly,Q as VerticalTitlesOnly,Z as VerticalWithDescription,te as WithDisabledStep,ee as WithError,q as WithPreviousNextButtons,nt as __namedExportsOrder,tt as default};
