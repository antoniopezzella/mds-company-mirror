import{a5 as i,Z as e}from"./iframe-CPBTUrEW.js";import{c as S}from"./utils-CURkPv3a.js";import{r as _,a as G}from"./data-state-CIGJqc-1.js";import{C as H}from"./check-KuCy08bp.js";import{B as g}from"./badge-J44eyYsr.js";import{F as O}from"./file-text-Cu6blthU.js";import{S as Z}from"./shield-DU2z-vKO.js";import{U as z}from"./users-R74dxwhI.js";import"./preload-helper-PPVm8Dsz.js";import"./empty-DcTcGUY7.js";import"./index-Dk2lMVn3.js";import"./button-_tNb_vhW.js";import"./index-DTX6ga2Q.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./triangle-alert-CBFJXkB-.js";import"./spinner-CUjZIesC.js";import"./search-x-BoD6M5tN.js";const f=i.forwardRef(({items:a,loading:N,loadError:v,onRetry:j,emptyReason:R,onClearFilters:C,emptyState:T,emptyTitle:I,emptyDescription:q,subheader:x,selectable:n=!1,multiSelect:k=!1,dense:A=!1,dividers:L=!0,onSelectionChange:B,className:W,style:D},P)=>{const[b,E]=i.useState(new Set(a.filter(r=>r.selected).map(r=>r.id))),[F,w]=i.useState(null),M=r=>{const s=new Set(b);s.has(r)?s.delete(r):(k||s.clear(),s.add(r)),E(s),B?.(Array.from(s))},U=_({loading:N,loadError:v,isEmpty:a.length===0});return e.jsxs("div",{ref:P,className:S("w-full overflow-hidden rounded-md",W),style:{backgroundColor:"var(--role-surface-default)",...D},children:[x&&e.jsx("div",{className:"px-4 py-2 text-xs font-semibold uppercase tracking-wide",style:{backgroundColor:"var(--role-surface-subtle)",color:"var(--role-text-primary)"},children:x}),e.jsx(G,{status:U,loadError:v,onRetry:j,emptyReason:R,onClearFilters:C,emptyState:T,emptyTitle:I,emptyDescription:q,name:"List",children:e.jsx("ul",{children:a.map((r,s)=>{const o=b.has(r.id),V=F===r.id;return e.jsxs(i.Fragment,{children:[e.jsx("li",{style:{backgroundColor:o||V?"var(--role-surface-subtle)":"transparent"},children:e.jsxs("button",{type:"button",disabled:r.disabled,onClick:()=>n?M(r.id):r.onClick?.(),"aria-pressed":n?o:void 0,onMouseEnter:()=>w(r.id),onMouseLeave:()=>w(null),className:S("flex w-full items-center gap-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50",A?"px-3 py-1.5":"px-4 py-2.5",n?"pl-2":void 0),style:{color:r.disabled?"var(--role-text-disabled)":"var(--role-text-primary)"},children:[n&&e.jsx("span",{"aria-hidden":"true",className:"flex h-4 w-4 shrink-0 items-center justify-center rounded-md border",style:{borderColor:o?"var(--role-interactive-primary)":"var(--role-border-default)",backgroundColor:o?"var(--role-interactive-primary)":"transparent",color:"var(--role-text-onInteractive)"},children:o&&e.jsx(H,{className:"h-3 w-3"})}),r.icon&&e.jsx("span",{className:"flex h-5 w-5 shrink-0 items-center justify-center",children:r.icon}),e.jsxs("span",{className:"min-w-0 flex-1",children:[e.jsx("span",{className:"block truncate text-sm",children:r.primary}),r.secondary&&e.jsx("span",{className:"block truncate text-xs",style:{color:r.disabled?"var(--role-text-disabled)":"var(--role-text-secondary)"},children:r.secondary})]}),r.badge&&e.jsx("span",{className:"shrink-0",children:r.badge})]})}),L&&s<a.length-1&&e.jsx("li",{"aria-hidden":"true",className:"h-px",style:{backgroundColor:"var(--role-border-default)"}})]},r.id)})})})]})});f.displayName="List";f.__docgenInfo={description:"Forwards to the outer `<div>`, so a consumer can scroll the list into view or measure it.",methods:[],displayName:"List",props:{loading:{required:!1,tsType:{name:"boolean"},description:"A request is in flight. Already the repo's only spelling for this."},loadError:{required:!1,tsType:{name:"union",raw:"React.ReactNode | Error | boolean | null",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"Error"},{name:"boolean"},{name:"null"}]},description:`The fetch failed. **Not form validation** — see the note on naming below.
Accepts a boolean, an Error, or a node to render as the description.`},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:'Re-run the failed load. Renders "Try again"; omitted entirely when absent.'},emptyReason:{required:!1,tsType:{name:"union",raw:"'no-data' | 'no-results'",elements:[{name:"literal",value:"'no-data'"},{name:"literal",value:"'no-results'"}]},description:"Why the result is empty. `no-results` means a filter excluded everything,\nwhich is a different message and a different recovery action from having\nno data at all."},onClearFilters:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Clears the filters that produced a `no-results` empty."},emptyState:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Full override of the empty branch. The canonical name across the system."},emptyTitle:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Copy-only overrides, for the common case that just wants different words."},emptyDescription:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},emptyAction:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},loadingState:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Full overrides of the other two branches."},errorState:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},items:{required:!0,tsType:{name:"Array",elements:[{name:"ListItemConfig"}],raw:"ListItemConfig[]"},description:""},subheader:{required:!1,tsType:{name:"string"},description:""},selectable:{required:!1,tsType:{name:"boolean"},description:"Items become clickable/checkable rows with selected-state styling. Required for `onSelectionChange` to do anything.",defaultValue:{value:"false",computed:!1}},multiSelect:{required:!1,tsType:{name:"boolean"},description:"Allow more than one row selected at once. Ignored when `selectable` is false.",defaultValue:{value:"false",computed:!1}},dense:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},dividers:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onSelectionChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(selectedIds: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"selectedIds"}],return:{name:"void"}}},description:"Fires with the full set of selected `id`s on every selection change, not just the item that was toggled."},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""}}};const pe={title:"Components/List",component:f,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"# List\n\n`getRoleColor()`-driven counterpart to the MUI `List`. Built against the\nreal `items`-array API — the MDS `List.figma.tsx` mapping's\n`<List.Item>` compound-component example doesn't match any prop the\nactual MUI component accepts."}}}},t=[{id:"1",primary:"General Liability",secondary:"Active · Renews Mar 14"},{id:"2",primary:"Commercial Auto",secondary:"Active · Renews May 1"},{id:"3",primary:"Cyber Liability",secondary:"Pending review"}],d={args:{items:t},decorators:[a=>e.jsx("div",{className:"w-[360px]",children:e.jsx(a,{})})]},c={args:{items:t,subheader:"Policies"},decorators:[a=>e.jsx("div",{className:"w-[360px]",children:e.jsx(a,{})})]},l={args:{items:[{id:"1",primary:"Property",secondary:"Building & contents",icon:e.jsx(O,{className:"h-5 w-5"})},{id:"2",primary:"Liability",secondary:"General & product",icon:e.jsx(Z,{className:"h-5 w-5"})},{id:"3",primary:"Workers Comp",secondary:"48 employees covered",icon:e.jsx(z,{className:"h-5 w-5"})}]},decorators:[a=>e.jsx("div",{className:"w-[360px]",children:e.jsx(a,{})})]},m={args:{items:[{id:"1",primary:"Commercial Auto",badge:e.jsx(g,{tone:"success",children:"Active"})},{id:"2",primary:"Cyber Liability",badge:e.jsx(g,{tone:"warning",children:"Pending"})},{id:"3",primary:"Workers Comp",badge:e.jsx(g,{tone:"danger",children:"Expired"})}]},decorators:[a=>e.jsx("div",{className:"w-[360px]",children:e.jsx(a,{})})]},p={args:{items:t,selectable:!0,multiSelect:!0,onSelectionChange:a=>console.debug("Selected:",a)},decorators:[a=>e.jsx("div",{className:"w-[360px]",children:e.jsx(a,{})})]},u={args:{items:t,dense:!0},decorators:[a=>e.jsx("div",{className:"w-[360px]",children:e.jsx(a,{})})]},y={args:{items:[...t,{id:"4",primary:"Archived Policy",secondary:"No longer active",disabled:!0}]},decorators:[a=>e.jsx("div",{className:"w-[360px]",children:e.jsx(a,{})})]},h={args:{items:t,dividers:!1},decorators:[a=>e.jsx("div",{className:"w-[360px]",children:e.jsx(a,{})})]},ue=["Default","WithSubheader","WithIcons","WithBadges","Selectable","Dense","WithDisabledItem","NoDividers"];d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    items: basicItems
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    items: basicItems,
    subheader: 'Policies'
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: '1',
      primary: 'Property',
      secondary: 'Building & contents',
      icon: <FileText className="h-5 w-5" />
    }, {
      id: '2',
      primary: 'Liability',
      secondary: 'General & product',
      icon: <Shield className="h-5 w-5" />
    }, {
      id: '3',
      primary: 'Workers Comp',
      secondary: '48 employees covered',
      icon: <Users className="h-5 w-5" />
    }]
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: '1',
      primary: 'Commercial Auto',
      badge: <Badge tone="success">Active</Badge>
    }, {
      id: '2',
      primary: 'Cyber Liability',
      badge: <Badge tone="warning">Pending</Badge>
    }, {
      id: '3',
      primary: 'Workers Comp',
      badge: <Badge tone="danger">Expired</Badge>
    }]
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    items: basicItems,
    selectable: true,
    multiSelect: true,
    onSelectionChange: ids => console.debug('Selected:', ids)
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    items: basicItems,
    dense: true
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...u.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    items: [...basicItems, {
      id: '4',
      primary: 'Archived Policy',
      secondary: 'No longer active',
      disabled: true
    }]
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    items: basicItems,
    dividers: false
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...h.parameters?.docs?.source}}};export{d as Default,u as Dense,h as NoDividers,p as Selectable,m as WithBadges,y as WithDisabledItem,l as WithIcons,c as WithSubheader,ue as __namedExportsOrder,pe as default};
