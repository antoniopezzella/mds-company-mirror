import{a5 as o,Z as e}from"./iframe-CPBTUrEW.js";import{B as L}from"./button-_tNb_vhW.js";import{c as u}from"./index-B2KxKFY1.js";import{c as F}from"./index-D-VHP59e.js";import{u as J}from"./index-ydzPhmoe.js";import{u as z}from"./index-DTX6ga2Q.js";import{C as $,c as O,R as V,A as W}from"./index-DRGZLg6p.js";import{P as q}from"./index-DewG4hGn.js";import{P as k}from"./index-D0Uu3jyy.js";import{P as G}from"./index-DbquDQCT.js";import{D as K}from"./index-CDKxNHGJ.js";import{c as Z}from"./utils-CURkPv3a.js";import{C as Q}from"./calendar-days-BsQaueMn.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dk2lMVn3.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./index-CQZ-MLQt.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-DGsydKWp.js";import"./index-CNxNdWYK.js";var X=Object.defineProperty,m=(s,r)=>X(s,"name",{value:r,configurable:!0}),S,R="HoverCard",[A,De]=F(R,[O]),E=O(),[Y,j]=A(R),ee=m(s=>{const{__scopeHoverCard:r,children:n,open:a,defaultOpen:c,onOpenChange:i,openDelay:d=700,closeDelay:v=300}=s,x=E(r),l=o.useRef(0),C=o.useRef(0),f=o.useRef(!1),H=o.useRef(!1),[h,p]=J({prop:a,defaultProp:c??!1,onChange:i,caller:R}),t=o.useCallback(()=>{clearTimeout(C.current),l.current=window.setTimeout(()=>p(!0),d)},[d,p]),N=o.useCallback(()=>{clearTimeout(l.current),!f.current&&!H.current&&(C.current=window.setTimeout(()=>p(!1),v))},[v,p]),I=o.useCallback(()=>p(!1),[p]);return o.useEffect(()=>()=>{clearTimeout(l.current),clearTimeout(C.current)},[]),e.jsx(Y,{scope:r,open:h,onOpenChange:p,onOpen:t,onClose:N,onDismiss:I,hasSelectionRef:f,isPointerDownOnContentRef:H,children:e.jsx(V,{...x,children:n})})},"HoverCard"),re="HoverCardTrigger",te=o.forwardRef(m(function(r,n){const{__scopeHoverCard:a,...c}=r,i=j(re,a),d=E(a);return e.jsx(W,{asChild:!0,...d,children:e.jsx(G.a,{"data-state":i.open?"open":"closed",...c,ref:n,onPointerEnter:u(r.onPointerEnter,g(i.onOpen)),onPointerLeave:u(r.onPointerLeave,g(i.onClose)),onFocus:u(r.onFocus,i.onOpen),onBlur:u(r.onBlur,i.onClose),onTouchStart:u(r.onTouchStart,v=>v.preventDefault())})})},"HoverCardTrigger")),B="HoverCardPortal",[oe,ne]=A(B,{forceMount:void 0}),ae=m(s=>{const{__scopeHoverCard:r,forceMount:n,children:a,container:c}=s,i=j(B,r);return e.jsx(oe,{scope:r,forceMount:n,children:e.jsx(k,{present:n||i.open,children:e.jsx(q,{asChild:!0,container:c,children:a})})})},"HoverCardPortal"),T="HoverCardContent",se=o.forwardRef(m(function(r,n){const a=ne(T,r.__scopeHoverCard),{forceMount:c=a.forceMount,...i}=r,d=j(T,r.__scopeHoverCard);return e.jsx(k,{present:c||d.open,children:e.jsx(ie,{"data-state":d.open?"open":"closed",...i,onPointerEnter:u(r.onPointerEnter,g(d.onOpen)),onPointerLeave:u(r.onPointerLeave,g(d.onClose)),ref:n})})},"HoverCardContent")),ie=o.forwardRef(m(function(r,n){const{__scopeHoverCard:a,onEscapeKeyDown:c,onPointerDownOutside:i,onFocusOutside:d,onInteractOutside:v,...x}=r,l=j(T,a),C=E(a),f=o.useRef(null),H=z(n,f),[h,p]=o.useState(!1);return o.useEffect(()=>{if(h){const t=document.body;return S=t.style.userSelect||t.style.webkitUserSelect,t.style.userSelect="none",t.style.webkitUserSelect="none",()=>{t.style.userSelect=S,t.style.webkitUserSelect=S}}},[h]),o.useEffect(()=>{if(f.current){const t=m(()=>{p(!1),l.isPointerDownOnContentRef.current=!1,setTimeout(()=>{document.getSelection()?.toString()!==""&&(l.hasSelectionRef.current=!0)})},"handlePointerUp");return document.addEventListener("pointerup",t),()=>{document.removeEventListener("pointerup",t),l.hasSelectionRef.current=!1,l.isPointerDownOnContentRef.current=!1}}},[l.isPointerDownOnContentRef,l.hasSelectionRef]),o.useEffect(()=>{f.current&&M(f.current).forEach(N=>N.setAttribute("tabindex","-1"))}),e.jsx(K,{asChild:!0,disableOutsidePointerEvents:!1,onInteractOutside:v,onEscapeKeyDown:c,onPointerDownOutside:i,onFocusOutside:u(d,t=>{t.preventDefault()}),onDismiss:l.onDismiss,children:e.jsx($,{...C,...x,onPointerDown:u(x.onPointerDown,t=>{t.currentTarget.contains(t.target)&&p(!0),l.hasSelectionRef.current=!1,l.isPointerDownOnContentRef.current=!0}),ref:H,style:{...x.style,userSelect:h?"text":void 0,WebkitUserSelect:h?"text":void 0,"--radix-hover-card-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-hover-card-content-available-width":"var(--radix-popper-available-width)","--radix-hover-card-content-available-height":"var(--radix-popper-available-height)","--radix-hover-card-trigger-width":"var(--radix-popper-anchor-width)","--radix-hover-card-trigger-height":"var(--radix-popper-anchor-height)"}})})},"HoverCardContentImpl"));function g(s){return r=>r.pointerType==="touch"?void 0:s()}m(g,"excludeTouch");function M(s){const r=[],n=document.createTreeWalker(s,NodeFilter.SHOW_ELEMENT,{acceptNode:m(a=>a.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP,"acceptNode")});for(;n.nextNode();)r.push(n.currentNode);return r}m(M,"getTabbableNodes");var le=ee,ce=te,de=ae,U=se;const _=le,D=ce,b=o.forwardRef(({className:s,align:r="center",sideOffset:n=8,...a},c)=>e.jsx(de,{children:e.jsx(U,{ref:c,align:r,sideOffset:n,className:Z("z-[1500] w-64 rounded-lg border p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",s),style:{backgroundColor:"var(--role-surface-default)",borderColor:"var(--role-border-default)",color:"var(--role-text-primary)"},...a})}));b.displayName=U.displayName;b.__docgenInfo={description:"",methods:[],props:{align:{defaultValue:{value:"'center'",computed:!1},required:!1},sideOffset:{defaultValue:{value:"8",computed:!1},required:!1}}};const Oe={title:"Components/HoverCard",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`# HoverCard

No MDS/Figma spec exists for this component — built to standard headless-UI conventions, styled with this repo's \`getRoleColor()\`
role tokens. Useful for lightweight, hover-triggered previews (e.g. a
user's profile summary) without committing to a full modal or popover.`}}}},P={render:()=>e.jsxs(_,{children:[e.jsx(D,{asChild:!0,children:e.jsx("button",{className:"text-sm font-medium underline underline-offset-4",children:"@marsh-design"})}),e.jsx(b,{children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"h-10 w-10 rounded-full bg-neutral-300"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold",children:"Marsh Design System"}),e.jsx("p",{className:"text-xs opacity-70",children:"@marsh-design"})]})]}),e.jsx("p",{className:"text-sm",children:"The design system platform powering Marsh's B2B dashboard applications."}),e.jsxs("div",{className:"flex items-center gap-1 text-xs opacity-70",children:[e.jsx(Q,{className:"h-3.5 w-3.5"}),"Joined April 2026"]})]})})]})},w={render:()=>e.jsxs("p",{className:"text-sm",children:["Policy last reviewed by"," ",e.jsxs(_,{children:[e.jsx(D,{asChild:!0,children:e.jsx("button",{className:"font-medium underline underline-offset-4",children:"Jordan Blake"})}),e.jsx(b,{align:"start",children:e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("p",{className:"text-sm font-semibold",children:"Jordan Blake"}),e.jsx("p",{className:"text-xs opacity-70",children:"Senior Underwriter, Aviation"}),e.jsx("p",{className:"mt-1 text-sm",children:"jordan.blake@marsh.com"})]})})]})," ","on July 18, 2026."]})},y={render:()=>e.jsxs(_,{openDelay:100,children:[e.jsx(D,{asChild:!0,children:e.jsx(L,{variant:"outline",size:"sm",children:"Hover for details"})}),e.jsx(b,{align:"start",children:e.jsx("p",{className:"text-sm",children:"Content aligned to the start of the trigger, with a short open delay."})})]})},ke=["Default","UserProfilePreview","AlignedStart"];P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-sm font-medium underline underline-offset-4">@marsh-design</button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-neutral-300" />
            <div>
              <p className="text-sm font-semibold">Marsh Design System</p>
              <p className="text-xs opacity-70">@marsh-design</p>
            </div>
          </div>
          <p className="text-sm">
            The design system platform powering Marsh&apos;s B2B dashboard applications.
          </p>
          <div className="flex items-center gap-1 text-xs opacity-70">
            <CalendarDays className="h-3.5 w-3.5" />
            Joined April 2026
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
}`,...P.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <p className="text-sm">
      Policy last reviewed by{' '}
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="font-medium underline underline-offset-4">Jordan Blake</button>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Jordan Blake</p>
            <p className="text-xs opacity-70">Senior Underwriter, Aviation</p>
            <p className="mt-1 text-sm">jordan.blake@marsh.com</p>
          </div>
        </HoverCardContent>
      </HoverCard>{' '}
      on July 18, 2026.
    </p>
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="sm">Hover for details</Button>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <p className="text-sm">Content aligned to the start of the trigger, with a short open delay.</p>
      </HoverCardContent>
    </HoverCard>
}`,...y.parameters?.docs?.source}}};export{y as AlignedStart,P as Default,w as UserProfilePreview,ke as __namedExportsOrder,Oe as default};
