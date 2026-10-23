import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{i,n as a}from"./roles-DNqHlq35.js";import{n as o,t as s}from"./utils-BGgJixJd.js";import{n as c,t as l}from"./createLucideIcon-DC6xoXt7.js";import{n as u,t as d}from"./check-D0zZFjjg.js";import{n as f,t as ee}from"./chevron-right-D_G3GZnD.js";import{n as te,t as ne}from"./circle-BSUjF2Fn.js";import{n as re,t as ie}from"./copy-0BL8rLRx.js";import{n as ae,t as oe}from"./trash-2-DK4D1wBt.js";import{n as se,t as ce}from"./dist-rCLRbfw0.js";import{n as le,t as p}from"./dist-CWbjiT1z.js";import{n as ue,t as de}from"./dist-B8vl3dwJ.js";import{r as fe,t as pe}from"./dist-DFd1iIkj.js";import{a as me,c as he,d as ge,g as _e,h as ve,i as ye,l as be,m as xe,n as Se,o as Ce,p as we,r as Te,s as Ee,t as De,u as Oe}from"./dist-pYVWAeIw.js";var ke,Ae;function je(){return(je=t((()=>{c(),ke=[[`path`,{d:`M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z`,key:`1a8usu`}],[`path`,{d:`m15 5 4 4`,key:`1mk7zo`}]],Ae=l(`pencil`,ke)})))()}function m(e){return t=>t.pointerType===`mouse`?void 0:e(t)}var h,g,Me,_,v,Ne,Pe,y,Fe,b,Ie,Le,Re,ze,Be,Ve,He,x,S,C,w,T,Ue,We,Ge,Ke,E,qe,D,O,k,A,Je,j,M,N,P,F;function Ye(){return(Ye=t((()=>{h=e(n(),1),le(),se(),fe(),_e(),de(),g=r(),Me=Object.defineProperty,_=(e,t)=>Me(e,`name`,{value:t,configurable:!0}),v=`ContextMenu`,[Ne,Pe]=ce(v,[ve]),y=ve(),[Fe,b]=Ne(v),Ie=_(e=>{let{__scopeContextMenu:t,children:n,onOpenChange:r,open:i,dir:a,modal:o=!0}=e,s=h.useRef(!1),[c,l]=ue({prop:i,defaultProp:!1,onChange:r,caller:v}),u=y(t);return(0,g.jsx)(Fe,{scope:t,open:c,onOpenChange:l,modal:o,hasInteractedRef:s,children:(0,g.jsx)(Oe,{...u,dir:a,open:c,onOpenChange:l,modal:o,children:n})})},`ContextMenu`),Le=`ContextMenuTrigger`,Re=h.forwardRef(_(function(e,t){let{__scopeContextMenu:n,disabled:r=!1,...i}=e,a=b(Le,n),o=y(n),[s,c]=h.useState({x:0,y:0}),l=h.useMemo(()=>({current:{getBoundingClientRect:_(()=>DOMRect.fromRect({width:0,height:0,...s}),`getBoundingClientRect`)}}),[s]),u=h.useRef(0),d=h.useCallback(()=>window.clearTimeout(u.current),[]),f=_(e=>{a.hasInteractedRef.current=!0,c({x:e.clientX,y:e.clientY}),a.onOpenChange(!0)},`handleOpen`);return h.useEffect(()=>d,[d]),h.useEffect(()=>void(r&&d()),[r,d]),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(De,{...o,virtualRef:l}),(0,g.jsx)(pe.span,{"data-state":a.open?`open`:`closed`,"data-disabled":r?``:void 0,...i,ref:t,style:{WebkitTouchCallout:`none`,...e.style},onContextMenu:r?e.onContextMenu:p(e.onContextMenu,e=>{d(),f(e),e.preventDefault()}),onPointerDown:r?e.onPointerDown:p(e.onPointerDown,m(e=>{d(),a.open&&a.onOpenChange(!1),u.current=window.setTimeout(()=>f(e),700)})),onPointerMove:r?e.onPointerMove:p(e.onPointerMove,m(d)),onPointerCancel:r?e.onPointerCancel:p(e.onPointerCancel,m(d)),onPointerUp:r?e.onPointerUp:p(e.onPointerUp,m(d))})]})},`ContextMenuTrigger`)),ze=_(e=>{let{__scopeContextMenu:t,...n}=e,r=y(t);return(0,g.jsx)(Ee,{...r,...n})},`ContextMenuPortal`),Be=`ContextMenuContent`,Ve=h.forwardRef(_(function(e,t){let{__scopeContextMenu:n,...r}=e,i=b(Be,n),a=y(n),o=h.useRef(!1);return(0,g.jsx)(Te,{...a,...r,ref:t,side:`right`,sideOffset:2,align:`start`,onCloseAutoFocus:t=>{e.onCloseAutoFocus?.(t),!t.defaultPrevented&&o.current&&t.preventDefault(),o.current=!1},onInteractOutside:t=>{e.onInteractOutside?.(t),!t.defaultPrevented&&!i.modal&&(o.current=!0)},style:{...e.style,"--radix-context-menu-content-transform-origin":`var(--radix-popper-transform-origin)`,"--radix-context-menu-content-available-width":`var(--radix-popper-available-width)`,"--radix-context-menu-content-available-height":`var(--radix-popper-available-height)`,"--radix-context-menu-trigger-width":`var(--radix-popper-anchor-width)`,"--radix-context-menu-trigger-height":`var(--radix-popper-anchor-height)`}})},`ContextMenuContent`)),He=h.forwardRef(_(function(e,t){let{__scopeContextMenu:n,...r}=e,i=y(n);return(0,g.jsx)(Ce,{...i,...r,ref:t})},`ContextMenuLabel`)),x=h.forwardRef(_(function(e,t){let{__scopeContextMenu:n,...r}=e,i=y(n);return(0,g.jsx)(ye,{...i,...r,ref:t})},`ContextMenuItem`)),S=h.forwardRef(_(function(e,t){let{__scopeContextMenu:n,...r}=e,i=y(n);return(0,g.jsx)(Se,{...i,...r,ref:t})},`ContextMenuCheckboxItem`)),C=h.forwardRef(_(function(e,t){let{__scopeContextMenu:n,...r}=e,i=y(n);return(0,g.jsx)(he,{...i,...r,ref:t})},`ContextMenuRadioGroup`)),w=h.forwardRef(_(function(e,t){let{__scopeContextMenu:n,...r}=e,i=y(n);return(0,g.jsx)(be,{...i,...r,ref:t})},`ContextMenuRadioItem`)),T=h.forwardRef(_(function(e,t){let{__scopeContextMenu:n,...r}=e,i=y(n);return(0,g.jsx)(me,{...i,...r,ref:t})},`ContextMenuItemIndicator`)),Ue=h.forwardRef(_(function(e,t){let{__scopeContextMenu:n,...r}=e,i=y(n);return(0,g.jsx)(ge,{...i,...r,ref:t})},`ContextMenuSeparator`)),We=h.forwardRef(_(function(e,t){let{__scopeContextMenu:n,...r}=e,i=y(n);return(0,g.jsx)(xe,{...i,...r,ref:t})},`ContextMenuSubTrigger`)),Ge=h.forwardRef(_(function(e,t){let{__scopeContextMenu:n,...r}=e,i=y(n);return(0,g.jsx)(we,{...i,...r,ref:t,style:{...e.style,"--radix-context-menu-content-transform-origin":`var(--radix-popper-transform-origin)`,"--radix-context-menu-content-available-width":`var(--radix-popper-available-width)`,"--radix-context-menu-content-available-height":`var(--radix-popper-available-height)`,"--radix-context-menu-trigger-width":`var(--radix-popper-anchor-width)`,"--radix-context-menu-trigger-height":`var(--radix-popper-anchor-height)`}})},`ContextMenuSubContent`)),_(m,`whenTouchOrPen`),Ke=Ie,E=Re,qe=ze,D=Ve,O=He,k=x,A=S,Je=C,j=w,M=T,N=Ue,P=We,F=Ge})))()}var I,L,R,z,Xe,B,V,H,U,W,G,K,q,J;function Ze(){return(Ze=t((()=>{I=e(n(),1),Ye(),u(),f(),te(),o(),a(),L=r(),R=Ke,z=E,Xe=Je,B=I.forwardRef(({className:e,inset:t,children:n,...r},i)=>(0,L.jsxs)(P,{ref:i,className:s(`flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden data-[state=open]:bg-[var(--context-menu-hover-bg)]`,t&&`ps-8`,e),style:{color:`var(--role-fg-primary)`,"--context-menu-hover-bg":`var(--role-bg-neutral-subtle)`},...r,children:[n,(0,L.jsx)(ee,{className:`ms-auto h-4 w-4`})]})),B.displayName=P.displayName,V=I.forwardRef(({className:e,...t},n)=>(0,L.jsx)(F,{ref:n,className:s(`z-[1500] min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`,e),style:{backgroundColor:`var(--role-bg-default)`,borderColor:`var(--role-border-default)`},...t})),V.displayName=F.displayName,H=I.forwardRef(({className:e,...t},n)=>(0,L.jsx)(qe,{children:(0,L.jsx)(D,{ref:n,className:s(`z-[1500] min-w-[10rem] overflow-hidden rounded-lg border p-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`,e),style:{backgroundColor:`var(--role-bg-default)`,borderColor:`var(--role-border-default)`},...t})})),H.displayName=D.displayName,U=I.forwardRef(({className:e,inset:t,tone:n=`default`,...r},a)=>(0,L.jsx)(k,{ref:a,className:s(`relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,t&&`ps-8`,e),style:{color:i(n===`danger`?`fg.critical`:`fg.primary`)},...r,onFocus:e=>{e.currentTarget.style.backgroundColor=i(n===`danger`?`bg.critical.subtle`:`bg.neutral.subtle`),r.onFocus?.(e)},onBlur:e=>{e.currentTarget.style.backgroundColor=`transparent`,r.onBlur?.(e)}})),U.displayName=k.displayName,W=I.forwardRef(({className:e,children:t,checked:n,...r},i)=>(0,L.jsxs)(A,{ref:i,className:s(`relative flex cursor-pointer select-none items-center gap-2 rounded-md py-1.5 ps-8 pe-2 text-sm outline-hidden data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,e),style:{color:`var(--role-fg-primary)`},checked:n,...r,children:[(0,L.jsx)(`span`,{className:`absolute start-2 flex h-3.5 w-3.5 items-center justify-center`,children:(0,L.jsx)(M,{children:(0,L.jsx)(d,{className:`h-4 w-4`,style:{color:`var(--role-interactive-primary)`}})})}),t]})),W.displayName=A.displayName,G=I.forwardRef(({className:e,children:t,...n},r)=>(0,L.jsxs)(j,{ref:r,className:s(`relative flex cursor-pointer select-none items-center gap-2 rounded-md py-1.5 ps-8 pe-2 text-sm outline-hidden data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,e),style:{color:`var(--role-fg-primary)`},...n,children:[(0,L.jsx)(`span`,{className:`absolute start-2 flex h-3.5 w-3.5 items-center justify-center`,children:(0,L.jsx)(M,{children:(0,L.jsx)(ne,{className:`h-2 w-2 fill-current`,style:{color:`var(--role-interactive-primary)`}})})}),t]})),G.displayName=j.displayName,K=I.forwardRef(({className:e,inset:t,...n},r)=>(0,L.jsx)(O,{ref:r,className:s(`px-2 py-1.5 text-xs font-semibold`,t&&`ps-8`,e),style:{color:`var(--role-fg-neutral-subtle)`},...n})),K.displayName=O.displayName,q=I.forwardRef(({className:e,...t},n)=>(0,L.jsx)(N,{ref:n,className:s(`-mx-1 my-1 h-px`,e),style:{backgroundColor:`var(--role-border-default)`},...t})),q.displayName=N.displayName,J=({className:e,...t})=>(0,L.jsx)(`span`,{className:s(`ms-auto text-xs tracking-widest opacity-60`,e),...t}),J.displayName=`ContextMenuShortcut`,H.__docgenInfo={description:``,methods:[]},U.__docgenInfo={description:``,methods:[],props:{inset:{required:!1,tsType:{name:`boolean`},description:`Indents the item to align with items that have a leading icon/checkbox, without adding one itself.`},tone:{required:!1,tsType:{name:`union`,raw:`'default' | 'danger'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'danger'`}]},description:'`danger` tints the text (and its focus highlight) red — use for destructive actions like "Delete".',defaultValue:{value:`'default'`,computed:!1}}}},W.__docgenInfo={description:``,methods:[]},G.__docgenInfo={description:``,methods:[]},K.__docgenInfo={description:``,methods:[],props:{inset:{required:!1,tsType:{name:`boolean`},description:``}}},q.__docgenInfo={description:``,methods:[]},J.__docgenInfo={description:``,methods:[],displayName:`ContextMenuShortcut`},V.__docgenInfo={description:``,methods:[]},B.__docgenInfo={description:``,methods:[],props:{inset:{required:!1,tsType:{name:`boolean`},description:``}}}})))()}var Y,Qe,$e,et,X,tt,Z,Q,$,nt;function rt(){return(rt=t((()=>{re(),je(),ae(),Ze(),Y=r(),{expect:Qe,screen:$e,userEvent:et,within:X}=__STORYBOOK_MODULE_TEST__,tt={title:`Components/ContextMenu`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`# ContextMenu

No MDS/Figma spec exists for this component — built directly on Radix ContextMenu, styled with this
repo's \`getRoleColor()\` role tokens. Mirrors \`DropdownMenu\`'s API shape
since both are Radix menu-family primitives.`}}}},Z={render:()=>(0,Y.jsxs)(R,{children:[(0,Y.jsx)(z,{className:`flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm`,children:`Right-click here`}),(0,Y.jsxs)(H,{children:[(0,Y.jsxs)(U,{children:[`Back `,(0,Y.jsx)(J,{children:`⌘[`})]}),(0,Y.jsxs)(U,{disabled:!0,children:[`Forward `,(0,Y.jsx)(J,{children:`⌘]`})]}),(0,Y.jsxs)(U,{children:[`Reload `,(0,Y.jsx)(J,{children:`⌘R`})]})]})]}),play:async({canvasElement:e,step:t})=>{let n=X(e);await t(`right-click the target`,async()=>{await et.pointer({keys:`[MouseRight]`,target:n.getByText(/Right-click/i)})}),await t(`the menu and its items render`,async()=>{let e=await $e.findByRole(`menu`);await Qe(X(e).getAllByRole(`menuitem`).length).toBeGreaterThan(0)})}},Q={render:()=>(0,Y.jsxs)(R,{children:[(0,Y.jsxs)(z,{className:`flex h-14 w-96 items-center justify-between rounded-md border px-4 text-sm`,children:[(0,Y.jsx)(`span`,{children:`Policy #AVI-2026-0417 — Aviation Liability`}),(0,Y.jsx)(`span`,{className:`text-xs opacity-60`,children:`Right-click for actions`})]}),(0,Y.jsxs)(H,{children:[(0,Y.jsx)(K,{children:`Policy actions`}),(0,Y.jsx)(q,{}),(0,Y.jsxs)(U,{children:[(0,Y.jsx)(Ae,{className:`h-4 w-4`}),` Edit`,(0,Y.jsx)(J,{children:`⌘E`})]}),(0,Y.jsxs)(U,{children:[(0,Y.jsx)(ie,{className:`h-4 w-4`}),` Duplicate`]}),(0,Y.jsx)(q,{}),(0,Y.jsxs)(U,{tone:`danger`,children:[(0,Y.jsx)(oe,{className:`h-4 w-4`}),` Delete`]})]})]})},$={render:()=>(0,Y.jsxs)(R,{children:[(0,Y.jsx)(z,{className:`flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm`,children:`Right-click for view options`}),(0,Y.jsxs)(H,{children:[(0,Y.jsx)(K,{children:`View`}),(0,Y.jsx)(q,{}),(0,Y.jsx)(W,{checked:!0,children:`Show line numbers`}),(0,Y.jsx)(W,{children:`Word wrap`}),(0,Y.jsx)(q,{}),(0,Y.jsx)(K,{children:`Zoom`}),(0,Y.jsxs)(Xe,{value:`100`,children:[(0,Y.jsx)(G,{value:`75`,children:`75%`}),(0,Y.jsx)(G,{value:`100`,children:`100%`}),(0,Y.jsx)(G,{value:`125`,children:`125%`})]})]})]})},nt=[`Default`,`PolicyRowActions`,`WithCheckboxAndRadio`],Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>,
  /*
   * OPENS the menu. Without this the story rendered only the trigger, so the
   * component measured 41% statements and 0% FUNCTIONS — every item, the
   * checkbox and radio groups, the separators and the shortcut rendering were
   * never executed, and axe never saw the surface where the accessibility
   * risk actually lives.
   */
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('right-click the target', async () => {
      await userEvent.pointer({
        keys: '[MouseRight]',
        target: canvas.getByText(/Right-click/i)
      });
    });
    await step('the menu and its items render', async () => {
      const menu = await screen.findByRole('menu');
      await expect(within(menu).getAllByRole('menuitem').length).toBeGreaterThan(0);
    });
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <ContextMenuTrigger className="flex h-14 w-96 items-center justify-between rounded-md border px-4 text-sm">
        <span>Policy #AVI-2026-0417 — Aviation Liability</span>
        <span className="text-xs opacity-60">Right-click for actions</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Policy actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Pencil className="h-4 w-4" /> Edit
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy className="h-4 w-4" /> Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem tone="danger">
          <Trash2 className="h-4 w-4" /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm">
        Right-click for view options
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show line numbers</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Word wrap</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Zoom</ContextMenuLabel>
        <ContextMenuRadioGroup value="100">
          <ContextMenuRadioItem value="75">75%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="125">125%</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
}`,...$.parameters?.docs?.source}}}})))()}rt();export{Z as Default,Q as PolicyRowActions,$ as WithCheckboxAndRadio,nt as __namedExportsOrder,tt as default};