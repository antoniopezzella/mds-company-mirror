import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{i,n as a}from"./roles-DNqHlq35.js";import{n as o,t as s}from"./utils-BGgJixJd.js";import{n as c,t as l}from"./badge-BJRi19uA.js";import{n as u,t as d}from"./createLucideIcon-DC6xoXt7.js";import{n as ee,t as f}from"./check-D0zZFjjg.js";import{n as te,t as p}from"./credit-card-Bt5qQxhP.js";import{n as m,t as h}from"./loader-circle-DE3kxHUM.js";import{n as g,t as _}from"./x-CT1Lp-Vd.js";import{n as v,t as y}from"./button-DatWLSj0.js";var b,x;function S(){return(S=t((()=>{u(),b=[[`path`,{d:`M15 13a3 3 0 1 0-6 0`,key:`10j68g`}],[`path`,{d:`M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20`,key:`k3hazp`}],[`circle`,{cx:`12`,cy:`8`,r:`2`,key:`1822b1`}]],x=d(`book-user`,b)})))()}var C,w;function T(){return(T=t((()=>{u(),C=[[`rect`,{width:`18`,height:`11`,x:`3`,y:`11`,rx:`2`,ry:`2`,key:`1w4ew1`}],[`path`,{d:`M7 11V7a5 5 0 0 1 10 0v4`,key:`fwvmzm`}]],w=d(`lock`,C)})))()}function ne(e,t,n){if(e.status)return e.status;if(n!==void 0)return t<n?`completed`:t===n?`active`:`pending`}function re(e){switch(e){case`completed`:case`active`:return`fg.primary`;case`error`:return`fg.critical`;default:return`fg.neutral.subtle`}}function ie(e,t){let n=`var(--role-interactive-primary)`;switch(e){case`completed`:{let e=t===`success`?`var(--role-fg-success)`:n;return{bg:e,fg:`var(--role-fg-on-dark)`,border:e}}case`active`:return{bg:n,fg:`var(--role-fg-on-interactive)`,border:n};case`error`:{let e=`var(--role-fg-critical)`;return{bg:e,fg:`var(--role-fg-on-critical)`,border:e}}default:return{bg:`var(--role-bg-disabled)`,fg:`var(--role-fg-neutral-subtle)`,border:`var(--role-border-default)`}}}function ae({step:e,index:t,status:n,indicator:r,completedTone:i}){let a=ie(n,i);if(r===`bar`)return(0,E.jsx)(`div`,{className:`h-1 w-full shrink-0 rounded-full`,style:{backgroundColor:n===`error`?`var(--role-fg-critical)`:n===`completed`||n===`active`?a.bg:`var(--role-border-default)`},children:(0,E.jsx)(`span`,{className:`sr-only`,children:e.label})});let o=le[r],s=r===`outlined`,c=s&&n!==`completed`&&n!==`error`?`transparent`:a.bg,l=s&&n!==`completed`&&n!==`error`?a.border:a.fg,u=e.loading?(0,E.jsx)(h,{className:`animate-spin`,style:{width:o*.58,height:o*.58}}):n===`error`?(0,E.jsx)(_,{style:{width:o*.58,height:o*.58},strokeWidth:3}):n===`completed`?(0,E.jsx)(f,{style:{width:o*.58,height:o*.58},strokeWidth:3}):r===`icon`?e.icon??(0,E.jsx)(`span`,{className:`text-xs font-medium`,children:t+1}):s?n===`active`?(0,E.jsx)(`span`,{className:`block size-1.5 rounded-full`,style:{backgroundColor:a.bg}}):null:(0,E.jsx)(`span`,{className:`text-xs font-medium`,children:t+1});return(0,E.jsx)(`div`,{className:`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full`,style:{width:o,height:o,backgroundColor:c,color:l,border:s||r===`icon`?`2px solid ${a.border}`:void 0},children:u})}function oe(e){return e===`completed`?`success`:e===`error`?`danger`:`default`}function se(e){switch(e){case`completed`:return`Completed`;case`active`:return`In Progress`;case`error`:return`Error`;default:return`Pending`}}var ce,E,le,D;function O(){return(O=t((()=>{ce=e(n(),1),ee(),m(),g(),o(),a(),c(),E=r(),le={numbered:24,outlined:20,icon:32},D=ce.forwardRef(({steps:e,activeStep:t,orientation:n=`vertical`,variant:r=`default`,onStepClick:a,contentMode:o=`inline`,indicator:c=`numbered`,labelPlacement:u,labelAlign:d=`center`,showSeparator:ee=!0,showStatusBadge:f=!1,showStepEyebrow:te=!1,completedTone:p=`primary`,className:m},h)=>{let g=n===`horizontal`,_=c===`bar`,v=_?`below`:u??(g?`below`:`inline`),y=!!a,b=ce.useRef([]),x=e.map((e,n)=>ne(e,n,t)),S=t??x.findIndex(e=>e===`active`),C=e.reduce((e,t,n)=>(t.disabled||e.push(n),e),[]),w=e=>b.current[e]?.focus(),T=(e,t)=>{if(C.length===0)return;let n=C.indexOf(e),r=(n===-1?0:n+t+C.length)%C.length;w(C[r])},ie=(e,t)=>{switch(e.key){case`ArrowRight`:case`ArrowDown`:e.preventDefault(),T(t,1);break;case`ArrowLeft`:case`ArrowUp`:e.preventDefault(),T(t,-1);break;case`Home`:e.preventDefault(),C.length&&w(C[0]);break;case`End`:e.preventDefault(),C.length&&w(C[C.length-1]);break;case`Enter`:case` `:e.preventDefault(),a?.(t)}},D=p===`success`?`var(--role-fg-success)`:`var(--role-interactive-primary)`,O=_?0:le[c],k=r===`compact`?8:12,A=o===`active-only`&&S>=0?e[S]:void 0,j=(e,t,n,a)=>v===`none`?null:(0,E.jsxs)(`div`,{className:s(`flex flex-col`,a===`center`?`items-center text-center`:`items-start text-left`,e.description||f?`gap-1`:`gap-0.5`),children:[te&&(0,E.jsxs)(`span`,{className:`text-[10px] font-semibold uppercase leading-none`,style:{color:`var(--role-fg-neutral-subtle)`},children:[`Step `,t+1]}),(0,E.jsx)(`span`,{className:s(`font-medium`,r===`compact`?`text-xs`:`text-sm`),style:{color:i(re(n)),lineHeight:1},children:e.label}),e.description&&(0,E.jsx)(`span`,{className:s(`leading-snug`,r===`compact`?`text-[11px]`:`text-sm`),style:{color:`var(--role-fg-neutral-subtle)`},children:e.description}),f&&n&&(0,E.jsx)(`span`,{className:`mt-0.5`,children:(0,E.jsx)(l,{tone:oe(n),soft:!0,size:`sm`,children:se(n)})})]});return(0,E.jsxs)(`div`,{ref:h,className:s(`flex w-full flex-col`,m),style:{gap:r===`compact`?16:24},children:[(0,E.jsx)(`div`,{role:y?`tablist`:void 0,"aria-orientation":y?n:void 0,className:s(`flex`,g?`w-full flex-row items-start`:`flex-col`),style:g&&v===`below`?{gap:k}:void 0,children:e.map((t,n)=>{let i=n===e.length-1,l=x[n],u=n===S,f=!!t.disabled,te=o===`active-only`&&!!t.content,m=l===`completed`?D:`var(--role-border-default)`,h=ee&&!i&&!_,C={role:y?`tab`:void 0,id:y?`stepper-tab-${t.id}`:void 0,"aria-selected":y?u:void 0,"aria-disabled":y&&f?!0:void 0,"aria-controls":y&&te?`stepper-panel-${t.id}`:void 0,tabIndex:y?f?-1:u||S===-1&&n===0?0:-1:void 0,onClick:y&&!f?()=>a?.(n):void 0,onKeyDown:y&&!f?e=>ie(e,n):void 0,ref:e=>{b.current[n]=e}},w=s(y&&!f&&`cursor-pointer rounded-md focus-visible:outline-hidden focus-visible:ring-2`,y&&f&&`cursor-not-allowed opacity-50`),T=y?{"--tw-ring-color":`var(--role-border-focus)`}:void 0;if(g&&v===`below`){let e=O/2,r=d===`center`?`calc(50% + ${e+4}px)`:`${O+8}px`,i=`calc(100% - ${O+8}px)`;return(0,E.jsxs)(`div`,{className:`relative flex flex-1 flex-col`,children:[(0,E.jsxs)(`div`,{...C,className:s(`flex flex-col`,d===`center`?`items-center`:`items-start`,_?`gap-3.5`:`gap-2.5`,w),style:T,children:[(0,E.jsx)(`div`,{className:s(_?`w-full`:`flex justify-center`),style:_?void 0:{width:O},children:(0,E.jsx)(ae,{step:t,index:n,status:l,indicator:c,completedTone:p})}),j(t,n,l,d)]}),h&&(0,E.jsx)(`div`,{"aria-hidden":!0,className:`absolute h-0.5 rounded-md`,style:{top:e-1,left:r,width:i,backgroundColor:m}})]},t.id)}return g?(0,E.jsxs)(`div`,{className:s(`flex items-center`,!i&&`flex-1`),children:[(0,E.jsxs)(`div`,{...C,className:s(`inline-flex items-center gap-2.5`,w),style:T,children:[(0,E.jsx)(ae,{step:t,index:n,status:l,indicator:c,completedTone:p}),j(t,n,l,`start`)]}),h&&(0,E.jsx)(`div`,{"aria-hidden":!0,className:`mx-2.5 h-0.5 flex-1 rounded-md`,style:{backgroundColor:m}})]},t.id):v===`none`?(0,E.jsxs)(`div`,{className:`flex flex-col items-center`,children:[(0,E.jsx)(`div`,{...C,className:s(`inline-flex`,w),style:T,children:(0,E.jsx)(ae,{step:t,index:n,status:l,indicator:c,completedTone:p})}),h&&(0,E.jsx)(`div`,{"aria-hidden":!0,className:`my-1.5 w-0.5 rounded-md`,style:{height:48,backgroundColor:m}})]},t.id):(0,E.jsxs)(`div`,{className:s(`relative flex`,!i&&`flex-1`),children:[(0,E.jsxs)(`div`,{...C,className:s(`inline-flex items-start gap-2.5`,w,!i&&(r===`compact`?`pb-6`:`pb-10`)),style:T,children:[(0,E.jsx)(ae,{step:t,index:n,status:l,indicator:c,completedTone:p}),(0,E.jsxs)(`div`,{className:`mt-0.5 flex flex-col gap-2`,children:[j(t,n,l,`start`),t.content&&o===`inline`&&(0,E.jsx)(`div`,{className:`text-sm`,style:{color:`var(--role-fg-primary)`},children:t.content})]})]}),h&&(0,E.jsx)(`div`,{"aria-hidden":!0,className:`absolute w-0.5 rounded-md`,style:{left:O/2-1,top:O+4,height:`calc(100% - ${O+8}px)`,backgroundColor:m}})]},t.id)})}),A?.content&&(0,E.jsx)(`div`,{role:y?`tabpanel`:void 0,id:`stepper-panel-${A.id}`,"aria-labelledby":y?`stepper-tab-${A.id}`:void 0,className:`text-sm`,style:{color:`var(--role-fg-primary)`},children:A.content})]})}),D.displayName=`Stepper`,D.__docgenInfo={description:"Forwards to the outer wrapper `<div>` — individual step triggers already\nmanage their own focus internally (see `triggerRefs` below); this ref is\nfor measuring/scrolling the whole stepper, e.g. into view on step change.",methods:[],displayName:`Stepper`,props:{steps:{required:!0,tsType:{name:`Array`,elements:[{name:`StepConfig`}],raw:`StepConfig[]`},description:``},activeStep:{required:!1,tsType:{name:`number`},description:`Index of the active step (MUI-parity API). When provided, drives each
step's completed/active/pending status by position — a step's own
explicit \`status\` still wins if set, so both APIs compose.`},orientation:{required:!1,tsType:{name:`union`,raw:`'vertical' | 'horizontal'`,elements:[{name:`literal`,value:`'vertical'`},{name:`literal`,value:`'horizontal'`}]},description:``,defaultValue:{value:`'vertical'`,computed:!1}},variant:{required:!1,tsType:{name:`union`,raw:`'default' | 'compact'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'compact'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}},onStepClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(stepIndex: number) => void`,signature:{arguments:[{type:{name:`number`},name:`stepIndex`}],return:{name:`void`}}},description:``},contentMode:{required:!1,tsType:{name:`union`,raw:`'inline' | 'active-only'`,elements:[{name:`literal`,value:`'inline'`},{name:`literal`,value:`'active-only'`}]},description:"How step `content` is displayed. `'inline'` (default) renders every\nstep's content under that step. `'active-only'` renders a single shared\npanel below the step row showing just the active step's content\n(reui's `StepperPanel`/`StepperContent` pattern), in either orientation.",defaultValue:{value:`'inline'`,computed:!1}},indicator:{required:!1,tsType:{name:`union`,raw:`| 'numbered'
/** 20px 2px-bordered circle, filled dot when active (reui demo 3). */
| 'outlined'
/** 32px circle holding the step's own \`icon\` (reui demo 7). */
| 'icon'
/** Full-width progress bar segment instead of a circle (reui demos 11/12). */
| 'bar'`,elements:[{name:`literal`,value:`'numbered'`},{name:`literal`,value:`'outlined'`},{name:`literal`,value:`'icon'`},{name:`literal`,value:`'bar'`}]},description:"Indicator shape — see `StepIndicatorStyle`. Defaults to `'numbered'`.",defaultValue:{value:`'numbered'`,computed:!1}},labelPlacement:{required:!1,tsType:{name:`union`,raw:`| 'none'
/** Beside the indicator (reui demos 9/10/13/15). */
| 'inline'
/** Stacked under the indicator (reui demos 5/6/8/11). */
| 'below'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'inline'`},{name:`literal`,value:`'below'`}]},description:"Label position. Defaults to `'below'` for horizontal and `'inline'` for\nvertical — the two layouts reui's demos actually use per orientation.\n`indicator=\"bar\"` always stacks labels below the bar."},labelAlign:{required:!1,tsType:{name:`union`,raw:`'center' | 'start'`,elements:[{name:`literal`,value:`'center'`},{name:`literal`,value:`'start'`}]},description:"Label alignment for `labelPlacement=\"below\"`. Defaults to `'center'`.",defaultValue:{value:`'center'`,computed:!1}},showSeparator:{required:!1,tsType:{name:`boolean`},description:`Draws the connector between steps. On by default; reui demos 6/11/12 turn it off.`,defaultValue:{value:`true`,computed:!1}},showStatusBadge:{required:!1,tsType:{name:`boolean`},description:`Renders a status pill per step (reui demo 7's In Progress/Completed/Pending). Off by default.`,defaultValue:{value:`false`,computed:!1}},showStepEyebrow:{required:!1,tsType:{name:`boolean`},description:`Renders a small uppercase "STEP N" eyebrow above the title (reui demo 7). Off by default.`,defaultValue:{value:`false`,computed:!1}},completedTone:{required:!1,tsType:{name:`union`,raw:`'primary' | 'success'`,elements:[{name:`literal`,value:`'primary'`},{name:`literal`,value:`'success'`}]},description:"Fill color for completed steps. reui's demos use both. Defaults to `'primary'`.",defaultValue:{value:`'primary'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}}}})))()}var k,A,j,M,ue,de,fe,pe,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,me;function he(){return(he=t((()=>{k=n(),S(),te(),T(),O(),v(),A=r(),j={title:`Components/Stepper`,component:D,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"# Stepper\n\n`getRoleColor()`-driven counterpart to the MUI `Stepper`. Built against\nthe real `steps: StepConfig[]` API (per-step `status`) — the\n`Stepper.figma.tsx` mapping's `steps: string[]` example doesn't match\nany prop the actual MUI component accepts.\n\nVisual language is ported from reui's Stepper\n([reui.io/components/stepper](https://reui.io/components/stepper)) — 24px\nfilled numbered indicators, 2px separators, `text-sm leading-none\nfont-medium` titles — with their raw upstream CSS vars mapped onto this\nrepo's role tokens. The stories below reproduce all 15 of reui's demos\nthrough this component's `indicator` / `labelPlacement` / `labelAlign` /\n`showSeparator` / `showStatusBadge` / `showStepEyebrow` / `completedTone`\nprops, and are labelled with the reui demo they mirror."}}},argTypes:{orientation:{control:`select`,options:[`vertical`,`horizontal`]},variant:{control:`select`,options:[`default`,`compact`]},indicator:{control:`select`,options:[`numbered`,`outlined`,`icon`,`bar`],description:`Indicator shape: filled numbered circle, hollow ring with an active dot, icon circle, or a progress-bar segment.`},labelPlacement:{control:`select`,options:[`none`,`inline`,`below`],description:"Label position relative to the indicator. Defaults to `below` for horizontal, `inline` for vertical."},labelAlign:{control:`select`,options:[`center`,`start`],description:'Label alignment when `labelPlacement="below"`.'},contentMode:{control:`select`,options:[`inline`,`active-only`],description:"How step `content` is displayed: per-step inline blocks, or a single shared tabpanel for just the active step."},completedTone:{control:`select`,options:[`primary`,`success`],description:`Fill color for completed steps and their separators.`},showSeparator:{control:`boolean`,description:`Draws the connector between steps.`},showStatusBadge:{control:`boolean`,description:`Renders a status pill per step (reui demo 7).`},showStepEyebrow:{control:`boolean`,description:`Renders a small uppercase "STEP N" eyebrow above the title (reui demo 7).`}}},M=[{id:`1`,label:`Step 1`,content:`Step 1 content`},{id:`2`,label:`Step 2`,content:`Step 2 content`},{id:`3`,label:`Step 3`,content:`Step 3 content`},{id:`4`,label:`Step 4`,content:`Step 4 content`}],ue=[{id:`account`,label:`Account`,description:`Create your account`},{id:`profile`,label:`Profile`,description:`Set up your profile`},{id:`review`,label:`Review`,description:`Confirm your details`}],de=[{id:`user`,label:`User Details`},{id:`payment`,label:`Payment Info`},{id:`otp`,label:`Auth OTP`},{id:`preview`,label:`Preview Form`}],fe=[{id:`user`,label:`User Details`,icon:(0,A.jsx)(x,{className:`size-4`})},{id:`payment`,label:`Payment Info`,icon:(0,A.jsx)(p,{className:`size-4`})},{id:`otp`,label:`Auth OTP`,icon:(0,A.jsx)(w,{className:`size-4`})}],pe=[{id:`1`,label:`Claim submitted`,description:`Jan 3, 2026`,status:`completed`},{id:`2`,label:`Under review`,description:`Adjuster assigned`,status:`active`},{id:`3`,label:`Decision`,status:`pending`},{id:`4`,label:`Payout`,status:`pending`}],N=(e,t)=>({docs:{description:{story:`Mirrors [reui stepper demo ${e}](https://reui.io/components/stepper) — ${t}`}}}),P={parameters:N(1,`numbered indicators with connecting separators, no labels.`),args:{steps:M,activeStep:1,orientation:`horizontal`,labelPlacement:`none`,contentMode:`active-only`}},F={parameters:N(2,`the same layout with completed steps and separators in the success tone instead of brand primary.`),args:{...P.args,completedTone:`success`}},I={parameters:N(3,"small 20px hollow ring indicators — the active step shows a filled dot, and step 2 is mid-flight (`loading`)."),args:{steps:[{id:`1`,label:`Step 1`,content:`Step 1 content`},{id:`2`,label:`Step 2`,content:`Step 2 content`,loading:!0},{id:`3`,label:`Step 3`,content:`Step 3 content`}],activeStep:1,orientation:`horizontal`,labelPlacement:`none`,indicator:`outlined`,completedTone:`success`,contentMode:`active-only`}},L={parameters:N(4,`driven by external Previous/Next buttons rather than clicking the steps themselves.`),render:e=>{let[t,n]=(0,k.useState)(1);return(0,A.jsxs)(`div`,{className:`flex w-full max-w-md flex-col gap-8`,children:[(0,A.jsx)(D,{...e,activeStep:t,onStepClick:n}),(0,A.jsxs)(`div`,{className:`flex items-center justify-between gap-2.5`,children:[(0,A.jsx)(y,{variant:`outline`,onClick:()=>n(e=>e-1),disabled:t===0,children:`Previous`}),(0,A.jsx)(y,{variant:`outline`,onClick:()=>n(e=>e+1),disabled:t===M.length-1,children:`Next`})]})]})},args:{steps:M,orientation:`horizontal`,labelPlacement:`none`,completedTone:`success`,contentMode:`active-only`}},R={parameters:N(5,`titles stacked under centered indicators, separators spanning the gap between them.`),args:{steps:[{id:`1`,label:`Step 1`,content:`Step 1 content`},{id:`2`,label:`Step 2`,content:`Step 2 content`},{id:`3`,label:`Step 3`,content:`Step 3 content`}],activeStep:1,orientation:`horizontal`,labelPlacement:`below`,contentMode:`active-only`}},z={parameters:N(6,`left-aligned titles under the indicators with no separators.`),args:{steps:de,activeStep:1,orientation:`horizontal`,labelPlacement:`below`,labelAlign:`start`,showSeparator:!1}},B={parameters:N(7,`the fullest variant: 32px icon indicators, a "STEP N" eyebrow, per-step status pills, success-toned completion, and external navigation.`),render:e=>{let[t,n]=(0,k.useState)(1);return(0,A.jsxs)(`div`,{className:`flex w-full max-w-xl flex-col gap-8`,children:[(0,A.jsx)(D,{...e,activeStep:t,onStepClick:n}),(0,A.jsxs)(`div`,{className:`flex items-center justify-between gap-2.5`,children:[(0,A.jsx)(y,{variant:`outline`,onClick:()=>n(e=>e-1),disabled:t===0,children:`Previous`}),(0,A.jsx)(y,{variant:`outline`,onClick:()=>n(e=>e+1),disabled:t===fe.length-1,children:`Next`})]})]})},args:{steps:fe,orientation:`horizontal`,indicator:`icon`,labelPlacement:`below`,labelAlign:`start`,showStepEyebrow:!0,showStatusBadge:!0,completedTone:`success`}},V={parameters:N(8,`title plus description stacked under centered indicators.`),args:{steps:ue,activeStep:1,orientation:`horizontal`,labelPlacement:`below`}},H={parameters:N(9,`indicator and title side by side, separators filling the space between steps.`),args:{steps:[{id:`account`,label:`Account`},{id:`profile`,label:`Profile`},{id:`review`,label:`Review`}],activeStep:1,orientation:`horizontal`,labelPlacement:`inline`}},U={parameters:N(10,`inline layout carrying a description under each title.`),args:{steps:[{id:`1`,label:`Step 1`,description:`Description`},{id:`2`,label:`Step 2`,description:`Description`},{id:`3`,label:`Step 3`,description:`Description`}],activeStep:1,orientation:`horizontal`,labelPlacement:`inline`}},W={parameters:N(11,`the circle is replaced by a full-width progress bar per step, with the title underneath.`),args:{steps:de,activeStep:1,orientation:`horizontal`,indicator:`bar`,labelAlign:`start`}},G={parameters:N(12,`bare segmented progress bar with a Back control and an "N / total" counter — no per-step labels.`),render:e=>{let[t,n]=(0,k.useState)(0);return(0,A.jsxs)(`div`,{className:`flex w-full max-w-md flex-col gap-4`,children:[(0,A.jsx)(D,{...e,activeStep:t}),(0,A.jsxs)(`div`,{className:`flex items-center justify-between gap-2.5`,children:[(0,A.jsx)(y,{variant:`ghost`,onClick:()=>n(e=>e-1),disabled:t===0,children:`Back`}),(0,A.jsxs)(`div`,{className:`text-sm font-medium`,children:[t+1,` `,(0,A.jsxs)(`span`,{className:`opacity-60`,children:[`/ `,M.length]})]}),(0,A.jsx)(y,{variant:`outline`,onClick:()=>n(e=>e+1),disabled:t===M.length-1,children:`Next`})]})]})},args:{steps:M.map(({content:e,...t})=>t),orientation:`horizontal`,indicator:`bar`,labelPlacement:`none`}},K={parameters:N(13,`vertical rail with title and description beside each indicator.`),args:{steps:ue,activeStep:1,orientation:`vertical`,completedTone:`success`}},q={parameters:N(14,"vertical rail of bare indicators, step 2 mid-flight (`loading`)."),args:{steps:[{id:`1`,label:`Step 1`},{id:`2`,label:`Step 2`,loading:!0},{id:`3`,label:`Step 3`}],activeStep:1,orientation:`vertical`,labelPlacement:`none`,completedTone:`success`}},J={parameters:N(15,`vertical rail with titles only, no descriptions.`),args:{steps:[{id:`account`,label:`Account`},{id:`profile`,label:`Profile`},{id:`review`,label:`Review`}],activeStep:1,orientation:`vertical`,completedTone:`success`}},Y={parameters:{docs:{description:{story:'MDS `variant="compact"` — tighter gaps and smaller type for dense layouts.'}}},args:{steps:pe,variant:`compact`}},X={parameters:{docs:{description:{story:'MDS extension — reui has no error state; a step with `status: "error"` renders a danger-toned ✕ indicator.'}}},args:{steps:[{id:`1`,label:`Application submitted`,status:`completed`},{id:`2`,label:`Document verification`,status:`error`,description:`Missing required document`},{id:`3`,label:`Approval`,status:`pending`}]}},Z={parameters:{docs:{description:{story:"A `disabled` step is skipped by both clicks and keyboard navigation (Arrow/Home/End step over it), matching native disabled-tab behavior."}}},args:{steps:[{id:`1`,label:`Account details`,status:`completed`},{id:`2`,label:`Payment method`,status:`active`},{id:`3`,label:`Two-factor setup`,status:`pending`,disabled:!0,description:`Unavailable until payment is confirmed`},{id:`4`,label:`Review & submit`,status:`pending`}],onStepClick:()=>{}}},Q={parameters:{docs:{description:{story:`Interactive steps follow the WAI-ARIA tablist pattern: click a step, or focus one and use Arrow keys/Home/End to move between steps and Enter/Space to activate — same keyboard model as reui.`}}},render:e=>{let[t,n]=(0,k.useState)(1);return(0,A.jsx)(D,{...e,activeStep:t,onStepClick:n})},args:{steps:pe.map(({status:e,...t})=>t),orientation:`horizontal`}},$={parameters:{docs:{description:{story:'`contentMode="active-only"` renders a single shared tabpanel below the step row showing just the active step\'s content — reui\'s `StepperPanel`/`StepperContent` pattern — instead of `"inline"`\'s per-step content blocks. Click a step to switch panels.'}}},render:e=>{let[t,n]=(0,k.useState)(1);return(0,A.jsx)(D,{...e,activeStep:t,onStepClick:n})},args:{steps:[{id:`1`,label:`Account details`,content:`Jane Doe · jane@company.com`},{id:`2`,label:`Coverage selection`,content:`Select which policies to include: General Liability, Cyber, Property.`},{id:`3`,label:`Review & submit`,content:`Review your selections before submitting.`}],orientation:`horizontal`,contentMode:`active-only`}},me=[`HorizontalNumbered`,`SuccessTone`,`OutlinedIndicators`,`WithPreviousNextButtons`,`LabelBelowCentered`,`LabelBelowStart`,`RichWithBadges`,`LabelAndDescriptionBelow`,`InlineLabels`,`InlineLabelsWithDescription`,`BarIndicators`,`BarProgressWithCounter`,`VerticalWithDescription`,`VerticalIndicatorsOnly`,`VerticalTitlesOnly`,`Compact`,`WithError`,`WithDisabledStep`,`Clickable`,`ActiveOnlyContent`],P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: demo(1, 'numbered indicators with connecting separators, no labels.'),
  args: {
    steps: numberedSteps,
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'none',
    contentMode: 'active-only'
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: demo(2, 'the same layout with completed steps and separators in the success tone instead of brand primary.'),
  args: {
    ...HorizontalNumbered.args,
    completedTone: 'success'
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  parameters: demo(6, 'left-aligned titles under the indicators with no separators.'),
  args: {
    steps: formSteps,
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'below',
    labelAlign: 'start',
    showSeparator: false
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: demo(8, 'title plus description stacked under centered indicators.'),
  args: {
    steps: onboardingSteps,
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'below'
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: demo(11, 'the circle is replaced by a full-width progress bar per step, with the title underneath.'),
  args: {
    steps: formSteps,
    activeStep: 1,
    orientation: 'horizontal',
    indicator: 'bar',
    labelAlign: 'start'
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: demo(13, 'vertical rail with title and description beside each indicator.'),
  args: {
    steps: onboardingSteps,
    activeStep: 1,
    orientation: 'vertical',
    completedTone: 'success'
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
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
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
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
}`,...$.parameters?.docs?.source}}}})))()}he();export{$ as ActiveOnlyContent,W as BarIndicators,G as BarProgressWithCounter,Q as Clickable,Y as Compact,P as HorizontalNumbered,H as InlineLabels,U as InlineLabelsWithDescription,V as LabelAndDescriptionBelow,R as LabelBelowCentered,z as LabelBelowStart,I as OutlinedIndicators,B as RichWithBadges,F as SuccessTone,q as VerticalIndicatorsOnly,J as VerticalTitlesOnly,K as VerticalWithDescription,Z as WithDisabledStep,X as WithError,L as WithPreviousNextButtons,me as __namedExportsOrder,j as default};