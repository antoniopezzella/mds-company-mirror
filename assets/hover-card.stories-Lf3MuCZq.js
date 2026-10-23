import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./utils-BGgJixJd.js";import{o,s}from"./dist-rOPzl3gD.js";import{n as c,t as l}from"./calendar-days-D67aCRH5.js";import{n as u,t as d}from"./button-DatWLSj0.js";import{n as f,t as p}from"./dist-rCLRbfw0.js";import{n as m,t as h}from"./dist-CWbjiT1z.js";import{n as ee,t as g}from"./dist-B8vl3dwJ.js";import{n as _,t as v}from"./dist-D3zd1xZy.js";import{r as te,t as ne}from"./dist-DFd1iIkj.js";import{i as re,n as ie}from"./dist-CGC_IZEh.js";import{n as ae,t as oe}from"./dist-zphDIPU1.js";import{a as y,i as se,o as ce,r as le,t as ue}from"./dist-CCsIFdhy.js";function b(e){return t=>t.pointerType===`touch`?void 0:e()}function x(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:w(e=>e.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP,`acceptNode`)});for(;n.nextNode();)t.push(n.currentNode);return t}var S,C,de,w,T,E,D,fe,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W;function pe(){return(pe=t((()=>{S=e(n(),1),m(),f(),g(),o(),ce(),ae(),_(),te(),re(),C=r(),de=Object.defineProperty,w=(e,t)=>de(e,`name`,{value:t,configurable:!0}),E=`HoverCard`,[D,fe]=p(E,[y]),O=y(),[k,A]=D(E),j=w(e=>{let{__scopeHoverCard:t,children:n,open:r,defaultOpen:i,onOpenChange:a,openDelay:o=700,closeDelay:s=300}=e,c=O(t),l=S.useRef(0),u=S.useRef(0),d=S.useRef(!1),f=S.useRef(!1),[p,m]=ee({prop:r,defaultProp:i??!1,onChange:a,caller:E}),h=S.useCallback(()=>{clearTimeout(u.current),l.current=window.setTimeout(()=>m(!0),o)},[o,m]),g=S.useCallback(()=>{clearTimeout(l.current),!d.current&&!f.current&&(u.current=window.setTimeout(()=>m(!1),s))},[s,m]),_=S.useCallback(()=>m(!1),[m]);return S.useEffect(()=>()=>{clearTimeout(l.current),clearTimeout(u.current)},[]),(0,C.jsx)(k,{scope:t,open:p,onOpenChange:m,onOpen:h,onClose:g,onDismiss:_,hasSelectionRef:d,isPointerDownOnContentRef:f,children:(0,C.jsx)(se,{...c,children:n})})},`HoverCard`),M=`HoverCardTrigger`,N=S.forwardRef(w(function(e,t){let{__scopeHoverCard:n,...r}=e,i=A(M,n),a=O(n);return(0,C.jsx)(ue,{asChild:!0,...a,children:(0,C.jsx)(ne.a,{"data-state":i.open?`open`:`closed`,...r,ref:t,onPointerEnter:h(e.onPointerEnter,b(i.onOpen)),onPointerLeave:h(e.onPointerLeave,b(i.onClose)),onFocus:h(e.onFocus,i.onOpen),onBlur:h(e.onBlur,i.onClose),onTouchStart:h(e.onTouchStart,e=>e.preventDefault())})})},`HoverCardTrigger`)),P=`HoverCardPortal`,[F,I]=D(P,{forceMount:void 0}),L=w(e=>{let{__scopeHoverCard:t,forceMount:n,children:r,container:i}=e,a=A(P,t);return(0,C.jsx)(F,{scope:t,forceMount:n,children:(0,C.jsx)(v,{present:n||a.open,children:(0,C.jsx)(oe,{asChild:!0,container:i,children:r})})})},`HoverCardPortal`),R=`HoverCardContent`,z=S.forwardRef(w(function(e,t){let n=I(R,e.__scopeHoverCard),{forceMount:r=n.forceMount,...i}=e,a=A(R,e.__scopeHoverCard);return(0,C.jsx)(v,{present:r||a.open,children:(0,C.jsx)(B,{"data-state":a.open?`open`:`closed`,...i,onPointerEnter:h(e.onPointerEnter,b(a.onOpen)),onPointerLeave:h(e.onPointerLeave,b(a.onClose)),ref:t})})},`HoverCardContent`)),B=S.forwardRef(w(function(e,t){let{__scopeHoverCard:n,onEscapeKeyDown:r,onPointerDownOutside:i,onFocusOutside:a,onInteractOutside:o,...c}=e,l=A(R,n),u=O(n),d=S.useRef(null),f=s(t,d),[p,m]=S.useState(!1);return S.useEffect(()=>{if(p){let e=document.body;return T=e.style.userSelect||e.style.webkitUserSelect,e.style.userSelect=`none`,e.style.webkitUserSelect=`none`,()=>{e.style.userSelect=T,e.style.webkitUserSelect=T}}},[p]),S.useEffect(()=>{if(d.current){let e=w(()=>{m(!1),l.isPointerDownOnContentRef.current=!1,setTimeout(()=>{document.getSelection()?.toString()!==``&&(l.hasSelectionRef.current=!0)})},`handlePointerUp`);return document.addEventListener(`pointerup`,e),()=>{document.removeEventListener(`pointerup`,e),l.hasSelectionRef.current=!1,l.isPointerDownOnContentRef.current=!1}}},[l.isPointerDownOnContentRef,l.hasSelectionRef]),S.useEffect(()=>{d.current&&x(d.current).forEach(e=>e.setAttribute(`tabindex`,`-1`))}),(0,C.jsx)(ie,{asChild:!0,disableOutsidePointerEvents:!1,onInteractOutside:o,onEscapeKeyDown:r,onPointerDownOutside:i,onFocusOutside:h(a,e=>{e.preventDefault()}),onDismiss:l.onDismiss,children:(0,C.jsx)(le,{...u,...c,onPointerDown:h(c.onPointerDown,e=>{e.currentTarget.contains(e.target)&&m(!0),l.hasSelectionRef.current=!1,l.isPointerDownOnContentRef.current=!0}),ref:f,style:{...c.style,userSelect:p?`text`:void 0,WebkitUserSelect:p?`text`:void 0,"--radix-hover-card-content-transform-origin":`var(--radix-popper-transform-origin)`,"--radix-hover-card-content-available-width":`var(--radix-popper-available-width)`,"--radix-hover-card-content-available-height":`var(--radix-popper-available-height)`,"--radix-hover-card-trigger-width":`var(--radix-popper-anchor-width)`,"--radix-hover-card-trigger-height":`var(--radix-popper-anchor-height)`}})})},`HoverCardContentImpl`)),w(b,`excludeTouch`),w(x,`getTabbableNodes`),V=j,H=N,U=L,W=z})))()}var me,G,K,q,J;function he(){return(he=t((()=>{me=e(n(),1),pe(),i(),G=r(),K=V,q=H,J=me.forwardRef(({className:e,align:t=`center`,sideOffset:n=8,...r},i)=>(0,G.jsx)(U,{children:(0,G.jsx)(W,{ref:i,align:t,sideOffset:n,className:a(`z-[1500] w-64 rounded-lg border p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`,e),style:{backgroundColor:`var(--role-bg-default)`,borderColor:`var(--role-border-default)`,color:`var(--role-fg-primary)`},...r})})),J.displayName=W.displayName,J.__docgenInfo={description:``,methods:[],props:{align:{defaultValue:{value:`'center'`,computed:!1},required:!1},sideOffset:{defaultValue:{value:`8`,computed:!1},required:!1}}}})))()}var Y,ge,X,Z,Q,_e;function $(){return($=t((()=>{u(),c(),he(),Y=r(),ge={title:`Components/HoverCard`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`# HoverCard

No MDS/Figma spec exists for this component — built to standard headless-UI conventions, styled with this repo's \`getRoleColor()\`
role tokens. Useful for lightweight, hover-triggered previews (e.g. a
user's profile summary) without committing to a full modal or popover.`}}}},X={render:()=>(0,Y.jsxs)(K,{children:[(0,Y.jsx)(q,{asChild:!0,children:(0,Y.jsx)(`button`,{className:`text-sm font-medium underline underline-offset-4`,children:`@marsh-design`})}),(0,Y.jsx)(J,{children:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,Y.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,Y.jsx)(`div`,{className:`h-10 w-10 rounded-full bg-neutral-300`}),(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(`p`,{className:`text-sm font-semibold`,children:`Marsh Design System`}),(0,Y.jsx)(`p`,{className:`text-xs opacity-70`,children:`@marsh-design`})]})]}),(0,Y.jsx)(`p`,{className:`text-sm`,children:`The design system platform powering Marsh's B2B dashboard applications.`}),(0,Y.jsxs)(`div`,{className:`flex items-center gap-1 text-xs opacity-70`,children:[(0,Y.jsx)(l,{className:`h-3.5 w-3.5`}),`Joined April 2026`]})]})})]})},Z={render:()=>(0,Y.jsxs)(`p`,{className:`text-sm`,children:[`Policy last reviewed by`,` `,(0,Y.jsxs)(K,{children:[(0,Y.jsx)(q,{asChild:!0,children:(0,Y.jsx)(`button`,{className:`font-medium underline underline-offset-4`,children:`Jordan Blake`})}),(0,Y.jsx)(J,{align:`start`,children:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,Y.jsx)(`p`,{className:`text-sm font-semibold`,children:`Jordan Blake`}),(0,Y.jsx)(`p`,{className:`text-xs opacity-70`,children:`Senior Underwriter, Aviation`}),(0,Y.jsx)(`p`,{className:`mt-1 text-sm`,children:`jordan.blake@marsh.com`})]})})]}),` `,`on July 18, 2026.`]})},Q={render:()=>(0,Y.jsxs)(K,{openDelay:100,children:[(0,Y.jsx)(q,{asChild:!0,children:(0,Y.jsx)(d,{variant:`outline`,size:`sm`,children:`Hover for details`})}),(0,Y.jsx)(J,{align:`start`,children:(0,Y.jsx)(`p`,{className:`text-sm`,children:`Content aligned to the start of the trigger, with a short open delay.`})})]})},_e=[`Default`,`UserProfilePreview`,`AlignedStart`],X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="sm">Hover for details</Button>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <p className="text-sm">Content aligned to the start of the trigger, with a short open delay.</p>
      </HoverCardContent>
    </HoverCard>
}`,...Q.parameters?.docs?.source}}}})))()}$();export{Q as AlignedStart,X as Default,Z as UserProfilePreview,_e as __namedExportsOrder,ge as default};