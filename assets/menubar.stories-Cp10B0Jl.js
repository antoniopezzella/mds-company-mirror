import{a5 as u,Z as e,ad as z}from"./iframe-CPBTUrEW.js";import{c as fe}from"./index-D8r7tS0H.js";import{u as Me}from"./index-COhu0uIO.js";import{c as S}from"./index-B2KxKFY1.js";import{u as ge}from"./index-DTX6ga2Q.js";import{c as he}from"./index-D-VHP59e.js";import{u as B}from"./index-209NtBVq.js";import{A as xe,P as ve,a as ye,I as Ie,S as Se,C as we,b as je,L as Ce,c as Re,g as _e,f as Ne,h as Te,d as Pe,R as ke,e as Oe}from"./index-VWR8Du3y.js";import{I as Ee,c as H,R as Ae}from"./index-Cq_iRV-a.js";import{P as J}from"./index-DbquDQCT.js";import{u as Q}from"./index-ydzPhmoe.js";import{c as v}from"./utils-CURkPv3a.js";import{C as Fe}from"./check-KuCy08bp.js";import{C as Be}from"./circle-gG6A41nI.js";import{C as De}from"./chevron-right-BXCmPxW2.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CQZ-MLQt.js";import"./index-CDKxNHGJ.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./createLucideIcon-BnpAccaP.js";var Ge=Object.defineProperty,l=(t,r)=>Ge(t,"name",{value:r,configurable:!0}),E="Menubar",[D,Le,Ke]=fe(E),[X,Vr]=he(E,[Ke,H]),p=Te(),ee=H(),[Ve,G]=X(E),$e=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,value:o,onValueChange:s,defaultValue:h,loop:f=!0,dir:c,...i}=r,M=Me(c),d=ee(n),[y,g]=Q({prop:o,onChange:s,defaultProp:h??"",caller:E}),[x,m]=u.useState(null);return e.jsx(Ve,{scope:n,value:y,onMenuOpen:u.useCallback(I=>{g(I),m(I)},[g]),onMenuClose:u.useCallback(()=>g(""),[g]),onMenuToggle:u.useCallback(I=>{g($=>$?"":I),m(I)},[g]),dir:M,loop:f,children:e.jsx(D.Provider,{scope:n,children:e.jsx(D.Slot,{scope:n,children:e.jsx(Ae,{asChild:!0,...d,orientation:"horizontal",loop:f,dir:M,currentTabStopId:x,onCurrentTabStopIdChange:m,children:e.jsx(J.div,{role:"menubar",...i,ref:a})})})})})},"Menubar")),re="MenubarMenu",[We,ne]=X(re),Ue=l(t=>{const{__scopeMenubar:r,value:a,...n}=t,o=B(),s=a||o||"LEGACY_REACT_AUTO_VALUE",h=G(re,r),f=p(r),c=u.useRef(null),i=u.useRef(!1),M=h.value===s;return u.useEffect(()=>{M||(i.current=!1)},[M]),e.jsx(We,{scope:r,value:s,triggerId:B(),triggerRef:c,contentId:B(),wasKeyboardTriggerOpenRef:i,children:e.jsx(Pe,{...f,open:M,onOpenChange:d=>{d||h.onMenuClose()},modal:!1,dir:h.dir,...n})})},"MenubarMenu"),q="MenubarTrigger",ze=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,disabled:o=!1,...s}=r,h=ee(n),f=p(n),c=G(q,n),i=ne(q,n),M=u.useRef(null),d=ge(a,M,i.triggerRef),[y,g]=u.useState(!1),x=c.value===i.value;return e.jsx(D.ItemSlot,{scope:n,value:i.value,disabled:o,children:e.jsx(Ee,{asChild:!0,...h,focusable:!o,tabStopId:i.value,children:e.jsx(xe,{asChild:!0,...f,children:e.jsx(J.button,{type:"button",role:"menuitem",id:i.triggerId,"aria-haspopup":"menu","aria-expanded":x,"aria-controls":x?i.contentId:void 0,"data-highlighted":y?"":void 0,"data-state":x?"open":"closed","data-disabled":o?"":void 0,disabled:o,...s,ref:d,onPointerDown:S(r.onPointerDown,m=>{!o&&m.button===0&&m.ctrlKey===!1&&(c.onMenuOpen(i.value),x||m.preventDefault())}),onPointerEnter:S(r.onPointerEnter,()=>{c.value&&!x&&(c.onMenuOpen(i.value),M.current?.focus())}),onKeyDown:S(r.onKeyDown,m=>{o||(["Enter"," "].includes(m.key)&&c.onMenuToggle(i.value),m.key==="ArrowDown"&&c.onMenuOpen(i.value),["Enter"," ","ArrowDown"].includes(m.key)&&(i.wasKeyboardTriggerOpenRef.current=!0,m.preventDefault()))}),onFocus:S(r.onFocus,()=>g(!0)),onBlur:S(r.onBlur,()=>g(!1))})})})})},"MenubarTrigger")),qe=l(t=>{const{__scopeMenubar:r,...a}=t,n=p(r);return e.jsx(ve,{...n,...a})},"MenubarPortal"),Z="MenubarContent",Ze=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,align:o="start",...s}=r,h=p(n),f=G(Z,n),c=ne(Z,n),i=Le(n),M=u.useRef(!1);return e.jsx(ye,{id:c.contentId,"aria-labelledby":c.triggerId,"data-radix-menubar-content":"",...h,...s,ref:a,align:o,onCloseAutoFocus:S(r.onCloseAutoFocus,d=>{!f.value&&!M.current&&c.triggerRef.current?.focus(),M.current=!1,d.preventDefault()}),onFocusOutside:S(r.onFocusOutside,d=>{const y=d.target;i().some(x=>x.ref.current?.contains(y))&&d.preventDefault()}),onInteractOutside:S(r.onInteractOutside,()=>{M.current=!0}),onEntryFocus:d=>{c.wasKeyboardTriggerOpenRef.current||d.preventDefault()},onKeyDown:S(r.onKeyDown,d=>{if(["ArrowRight","ArrowLeft"].includes(d.key)){const y=d.target,g=y.hasAttribute("data-radix-menubar-subtrigger"),x=y.closest("[data-radix-menubar-content]")!==d.currentTarget,I=(f.dir==="rtl"?"ArrowRight":"ArrowLeft")===d.key;if(!I&&g||x&&I)return;let C=i().filter(F=>!F.disabled).map(F=>F.value);I&&C.reverse();const W=C.indexOf(c.value);C=f.loop?ae(C,W+1):C.slice(W+1);const[U]=C;U&&f.onMenuOpen(U)}},{checkForDefaultPrevented:!1}),style:{...r.style,"--radix-menubar-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-menubar-content-available-width":"var(--radix-popper-available-width)","--radix-menubar-content-available-height":"var(--radix-popper-available-height)","--radix-menubar-trigger-width":"var(--radix-popper-anchor-width)","--radix-menubar-trigger-height":"var(--radix-popper-anchor-height)"}})},"MenubarContent")),Ye=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,...o}=r,s=p(n);return e.jsx(Ce,{...s,...o,ref:a})},"MenubarLabel")),He=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,...o}=r,s=p(n);return e.jsx(Ie,{...s,...o,ref:a})},"MenubarItem")),Je=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,...o}=r,s=p(n);return e.jsx(we,{...s,...o,ref:a})},"MenubarCheckboxItem")),Qe=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,...o}=r,s=p(n);return e.jsx(ke,{...s,...o,ref:a})},"MenubarRadioGroup")),Xe=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,...o}=r,s=p(n);return e.jsx(Re,{...s,...o,ref:a})},"MenubarRadioItem")),er=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,...o}=r,s=p(n);return e.jsx(je,{...s,...o,ref:a})},"MenubarItemIndicator")),rr=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,...o}=r,s=p(n);return e.jsx(Se,{...s,...o,ref:a})},"MenubarSeparator")),nr="MenubarSub",ar=l(t=>{const{__scopeMenubar:r,children:a,open:n,onOpenChange:o,defaultOpen:s}=t,h=p(r),[f,c]=Q({prop:n,defaultProp:s??!1,onChange:o,caller:nr});return e.jsx(Oe,{...h,open:f,onOpenChange:c,children:a})},"MenubarSub"),tr=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,...o}=r,s=p(n);return e.jsx(_e,{"data-radix-menubar-subtrigger":"",...s,...o,ref:a})},"MenubarSubTrigger")),or=u.forwardRef(l(function(r,a){const{__scopeMenubar:n,...o}=r,s=p(n);return e.jsx(Ne,{...s,"data-radix-menubar-content":"",...o,ref:a,style:{...r.style,"--radix-menubar-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-menubar-content-available-width":"var(--radix-popper-available-width)","--radix-menubar-content-available-height":"var(--radix-popper-available-height)","--radix-menubar-trigger-width":"var(--radix-popper-anchor-width)","--radix-menubar-trigger-height":"var(--radix-popper-anchor-height)"}})},"MenubarSubContent"));function ae(t,r){return t.map((a,n)=>t[(r+n)%t.length])}l(ae,"wrapArray");var te=$e,sr=Ue,oe=ze,ur=qe,se=Ze,ue=Ye,ie=He,ce=Je,ir=Qe,de=Xe,le=er,be=rr,cr=ar,me=tr,pe=or;const A=u.forwardRef(({className:t,...r},a)=>e.jsx(te,{ref:a,className:v("flex items-center gap-1 rounded-md border p-1",t),style:{backgroundColor:"var(--role-surface-default)",borderColor:"var(--role-border-default)"},...r}));A.displayName=te.displayName;const k=sr,dr=cr,lr=ir,R=u.forwardRef(({className:t,...r},a)=>e.jsx(oe,{ref:a,className:v("flex cursor-pointer select-none items-center rounded-md px-3 py-1.5 text-sm font-medium outline-hidden data-[state=open]:bg-[var(--menubar-trigger-active-bg)]",t),style:{color:"var(--role-text-primary)","--menubar-trigger-active-bg":"var(--role-surface-subtle)"},...r}));R.displayName=oe.displayName;const L=u.forwardRef(({className:t,inset:r,children:a,...n},o)=>e.jsxs(me,{ref:o,className:v("flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden data-[state=open]:bg-[var(--menubar-hover-bg)]",r&&"pl-8",t),style:{color:"var(--role-text-primary)","--menubar-hover-bg":"var(--role-surface-subtle)"},...n,children:[a,e.jsx(De,{className:"ml-auto h-4 w-4"})]}));L.displayName=me.displayName;const K=u.forwardRef(({className:t,...r},a)=>e.jsx(pe,{ref:a,className:v("z-[1500] min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",t),style:{backgroundColor:"var(--role-surface-default)",borderColor:"var(--role-border-default)"},...r}));K.displayName=pe.displayName;const _=u.forwardRef(({className:t,align:r="start",alignOffset:a=-4,sideOffset:n=8,...o},s)=>e.jsx(ur,{children:e.jsx(se,{ref:s,align:r,alignOffset:a,sideOffset:n,className:v("z-[1500] min-w-[12rem] overflow-hidden rounded-lg border p-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",t),style:{backgroundColor:"var(--role-surface-default)",borderColor:"var(--role-border-default)"},...o})}));_.displayName=se.displayName;const b=u.forwardRef(({className:t,inset:r,tone:a="default",...n},o)=>e.jsx(ie,{ref:o,className:v("relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",r&&"pl-8",t),style:{color:z(a==="danger"?"status.danger.fg":"text.primary")},...n,onFocus:s=>{s.currentTarget.style.backgroundColor=z(a==="danger"?"status.danger.bg":"surface.subtle"),n.onFocus?.(s)},onBlur:s=>{s.currentTarget.style.backgroundColor="transparent",n.onBlur?.(s)}}));b.displayName=ie.displayName;const O=u.forwardRef(({className:t,children:r,checked:a,...n},o)=>e.jsxs(ce,{ref:o,className:v("relative flex cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-sm outline-hidden data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),style:{color:"var(--role-text-primary)"},checked:a,...n,children:[e.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:e.jsx(le,{children:e.jsx(Fe,{className:"h-4 w-4",style:{color:"var(--role-interactive-primary)"}})})}),r]}));O.displayName=ce.displayName;const N=u.forwardRef(({className:t,children:r,...a},n)=>e.jsxs(de,{ref:n,className:v("relative flex cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-sm outline-hidden data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),style:{color:"var(--role-text-primary)"},...a,children:[e.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:e.jsx(le,{children:e.jsx(Be,{className:"h-2 w-2 fill-current",style:{color:"var(--role-interactive-primary)"}})})}),r]}));N.displayName=de.displayName;const V=u.forwardRef(({className:t,inset:r,...a},n)=>e.jsx(ue,{ref:n,className:v("px-2 py-1.5 text-xs font-semibold",r&&"pl-8",t),style:{color:"var(--role-text-secondary)"},...a}));V.displayName=ue.displayName;const w=u.forwardRef(({className:t,...r},a)=>e.jsx(be,{ref:a,className:v("-mx-1 my-1 h-px",t),style:{backgroundColor:"var(--role-border-default)"},...r}));w.displayName=be.displayName;const j=({className:t,...r})=>e.jsx("span",{className:v("ml-auto text-xs tracking-widest opacity-60",t),...r});j.displayName="MenubarShortcut";A.__docgenInfo={description:"",methods:[]};R.__docgenInfo={description:"",methods:[]};_.__docgenInfo={description:"",methods:[],props:{align:{defaultValue:{value:"'start'",computed:!1},required:!1},alignOffset:{defaultValue:{value:"-4",computed:!1},required:!1},sideOffset:{defaultValue:{value:"8",computed:!1},required:!1}}};b.__docgenInfo={description:"",methods:[],props:{inset:{required:!1,tsType:{name:"boolean"},description:""},tone:{required:!1,tsType:{name:"union",raw:"'default' | 'danger'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'danger'"}]},description:"",defaultValue:{value:"'default'",computed:!1}}}};O.__docgenInfo={description:"",methods:[]};N.__docgenInfo={description:"",methods:[]};V.__docgenInfo={description:"",methods:[],props:{inset:{required:!1,tsType:{name:"boolean"},description:""}}};w.__docgenInfo={description:"",methods:[]};j.__docgenInfo={description:"",methods:[],displayName:"MenubarShortcut"};K.__docgenInfo={description:"",methods:[]};L.__docgenInfo={description:"",methods:[],props:{inset:{required:!1,tsType:{name:"boolean"},description:"Adds a fixed left-aligned indent so this item's label lines up with sibling items that carry a checkmark or icon."}}};const{expect:br,screen:mr,userEvent:pr,within:Y}=__STORYBOOK_MODULE_TEST__,$r={title:"Components/Menubar",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`# Menubar

Radix-based horizontal application menu bar — File/Edit/View style — with
the same real menu semantics as \`DropdownMenu\` (roving tabindex, arrow-key
navigation between top-level menus, submenu support), just laid out as a
row of menus instead of a single trigger.`}}}},T={render:()=>e.jsxs(A,{children:[e.jsxs(k,{children:[e.jsx(R,{children:"File"}),e.jsxs(_,{children:[e.jsxs(b,{children:["New Tab ",e.jsx(j,{children:"⌘T"})]}),e.jsxs(b,{children:["New Window ",e.jsx(j,{children:"⌘N"})]}),e.jsx(w,{}),e.jsx(b,{children:"Share"}),e.jsx(w,{}),e.jsxs(b,{tone:"danger",children:["Close Window ",e.jsx(j,{children:"⌘W"})]})]})]}),e.jsxs(k,{children:[e.jsx(R,{children:"Edit"}),e.jsxs(_,{children:[e.jsxs(b,{children:["Undo ",e.jsx(j,{children:"⌘Z"})]}),e.jsxs(b,{children:["Redo ",e.jsx(j,{children:"⇧⌘Z"})]}),e.jsx(w,{}),e.jsx(b,{children:"Cut"}),e.jsx(b,{children:"Copy"}),e.jsx(b,{children:"Paste"})]})]}),e.jsxs(k,{children:[e.jsx(R,{children:"View"}),e.jsxs(_,{children:[e.jsx(O,{checked:!0,children:"Show Bookmarks Bar"}),e.jsx(O,{children:"Show Full URLs"}),e.jsx(w,{}),e.jsx(b,{disabled:!0,children:"Toggle Fullscreen"})]})]})]}),play:async({canvasElement:t,step:r})=>{const a=Y(t);await r("open the File menu",async()=>{await pr.click(a.getByRole("menuitem",{name:"File"}))}),await r("its items render",async()=>{const n=await mr.findByRole("menu");await br(Y(n).getAllByRole("menuitem").length).toBeGreaterThan(0)})}},P={render:()=>e.jsx(A,{children:e.jsxs(k,{children:[e.jsx(R,{children:"Profiles"}),e.jsxs(_,{children:[e.jsx(V,{children:"Workspace"}),e.jsx(w,{}),e.jsxs(lr,{value:"benedict",children:[e.jsx(N,{value:"andy",children:"Andy"}),e.jsx(N,{value:"benedict",children:"Benedict"}),e.jsx(N,{value:"luis",children:"Luis"})]}),e.jsx(w,{}),e.jsxs(dr,{children:[e.jsx(L,{children:"More Tools"}),e.jsxs(K,{children:[e.jsx(b,{children:"Save Page As…"}),e.jsx(b,{children:"Create Shortcut…"}),e.jsx(b,{children:"Name Window…"})]})]})]})]})})},Wr=["Default","WithSubmenuAndRadioGroup"];T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem tone="danger">
            Close Window <MenubarShortcut>⌘W</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show Full URLs</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem disabled>Toggle Fullscreen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>,
  /*
  * OPENS a menu. Without this the story rendered only the bar of triggers,
  * so the component measured 50% statements and 0% FUNCTIONS — no item,
  * separator, shortcut or submenu was ever executed, and axe only ever saw
  * the closed state.
  */
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('open the File menu', async () => {
      await userEvent.click(canvas.getByRole('menuitem', {
        name: 'File'
      }));
    });
    await step('its items render', async () => {
      const open = await screen.findByRole('menu');
      await expect(within(open).getAllByRole('menuitem').length).toBeGreaterThan(0);
    });
  }
}`,...T.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Workspace</MenubarLabel>
          <MenubarSeparator />
          <MenubarRadioGroup value="benedict">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benedict">Benedict</MenubarRadioItem>
            <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>More Tools</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Save Page As…</MenubarItem>
              <MenubarItem>Create Shortcut…</MenubarItem>
              <MenubarItem>Name Window…</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
}`,...P.parameters?.docs?.source}}};export{T as Default,P as WithSubmenuAndRadioGroup,Wr as __namedExportsOrder,$r as default};
