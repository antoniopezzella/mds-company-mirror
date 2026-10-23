import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./utils-BGgJixJd.js";import{n as o,t as s}from"./badge-BJRi19uA.js";import{n as c,t as l}from"./check-D0zZFjjg.js";import{n as u,t as d}from"./file-text-CBw0Jc0o.js";import{n as f,t as p}from"./shield-GcEyiOq2.js";import{n as m,t as h}from"./users-kQ72Zrch.js";import{n as g,r as _,t as v}from"./data-state-BctBXKwB.js";var y,b,x;function S(){return(S=t((()=>{y=e(n(),1),c(),i(),g(),b=r(),x=y.forwardRef(({items:e,loading:t,loadError:n,onRetry:r,emptyReason:i,onClearFilters:o,emptyState:s,emptyTitle:c,emptyDescription:u,subheader:d,selectable:f=!1,multiSelect:p=!1,dense:m=!1,dividers:h=!0,onSelectionChange:g,className:x,style:S},C)=>{let[w,T]=y.useState(new Set(e.filter(e=>e.selected).map(e=>e.id))),[E,D]=y.useState(null),O=e=>{let t=new Set(w);t.has(e)?t.delete(e):(p||t.clear(),t.add(e)),T(t),g?.(Array.from(t))},k=_({loading:t,loadError:n,isEmpty:e.length===0},`List`);return(0,b.jsxs)(`div`,{ref:C,className:a(`w-full overflow-hidden rounded-md`,x),style:{backgroundColor:`var(--role-bg-default)`,...S},children:[d&&(0,b.jsx)(`div`,{className:`px-4 py-2 text-xs font-semibold uppercase tracking-wide`,style:{backgroundColor:`var(--role-bg-neutral-subtle)`,color:`var(--role-fg-primary)`},children:d}),(0,b.jsx)(v,{status:k,loadError:n,onRetry:r,emptyReason:i,onClearFilters:o,emptyState:s,emptyTitle:c,emptyDescription:u,name:`List`,children:(0,b.jsx)(`ul`,{children:e.map((t,n)=>{let r=w.has(t.id),i=E===t.id;return(0,b.jsxs)(y.Fragment,{children:[(0,b.jsx)(`li`,{style:{backgroundColor:r||i?`var(--role-bg-neutral-subtle)`:`transparent`},children:(0,b.jsxs)(`button`,{type:`button`,disabled:t.disabled,onClick:()=>f?O(t.id):t.onClick?.(),"aria-pressed":f?r:void 0,onMouseEnter:()=>D(t.id),onMouseLeave:()=>D(null),className:a(`flex w-full items-center gap-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50`,m?`px-3 py-1.5`:`px-4 py-2.5`,f?`ps-2`:void 0),style:{color:t.disabled?`var(--role-fg-disabled)`:`var(--role-fg-primary)`},children:[f&&(0,b.jsx)(`span`,{"aria-hidden":`true`,className:`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border`,style:{borderColor:r?`var(--role-interactive-primary)`:`var(--role-border-default)`,backgroundColor:r?`var(--role-interactive-primary)`:`transparent`,color:`var(--role-fg-on-interactive)`},children:r&&(0,b.jsx)(l,{className:`h-3 w-3`})}),t.icon&&(0,b.jsx)(`span`,{className:`flex h-5 w-5 shrink-0 items-center justify-center`,children:t.icon}),(0,b.jsxs)(`span`,{className:`min-w-0 flex-1`,children:[(0,b.jsx)(`span`,{className:`block truncate text-sm`,children:t.primary}),t.secondary&&(0,b.jsx)(`span`,{className:`block truncate text-xs`,style:{color:t.disabled?`var(--role-fg-disabled)`:`var(--role-fg-neutral-subtle)`},children:t.secondary})]}),t.badge&&(0,b.jsx)(`span`,{className:`shrink-0`,children:t.badge})]})}),h&&n<e.length-1&&(0,b.jsx)(`li`,{"aria-hidden":`true`,className:`h-px`,style:{backgroundColor:`var(--role-border-default)`}})]},t.id)})})})]})}),x.displayName=`List`,x.__docgenInfo={description:"Forwards to the outer `<div>`, so a consumer can scroll the list into view or measure it.",methods:[],displayName:`List`,props:{loading:{required:!1,tsType:{name:`boolean`},description:`A request is in flight. Already the repo's only spelling for this.`},loadError:{required:!1,tsType:{name:`union`,raw:`React.ReactNode | Error | boolean | null`,elements:[{name:`ReactReactNode`,raw:`React.ReactNode`},{name:`Error`},{name:`boolean`},{name:`null`}]},description:`The fetch failed. **Not form validation** — see the note on naming below.
Accepts a boolean, an Error, or a node to render as the description.`},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Re-run the failed load. Renders "Try again"; omitted entirely when absent.`},emptyReason:{required:!1,tsType:{name:`union`,raw:`'no-data' | 'no-results'`,elements:[{name:`literal`,value:`'no-data'`},{name:`literal`,value:`'no-results'`}]},description:`Why the result is empty. \`no-results\` means a filter excluded everything,
which is a different message and a different recovery action from having
no data at all.`},onClearFilters:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:"Clears the filters that produced a `no-results` empty."},emptyState:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Full override of the empty branch. The canonical name across the system.`},emptyTitle:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Copy-only overrides, for the common case that just wants different words.`},emptyDescription:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},emptyAction:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},loadingState:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Full overrides of the other two branches.`},errorState:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},items:{required:!0,tsType:{name:`Array`,elements:[{name:`ListItemConfig`}],raw:`ListItemConfig[]`},description:``},subheader:{required:!1,tsType:{name:`string`},description:``},selectable:{required:!1,tsType:{name:`boolean`},description:"Items become clickable/checkable rows with selected-state styling. Required for `onSelectionChange` to do anything.",defaultValue:{value:`false`,computed:!1}},multiSelect:{required:!1,tsType:{name:`boolean`},description:"Allow more than one row selected at once. Ignored when `selectable` is false.",defaultValue:{value:`false`,computed:!1}},dense:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},dividers:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},onSelectionChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(selectedIds: string[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`selectedIds`}],return:{name:`void`}}},description:"Fires with the full set of selected `id`s on every selection change, not just the item that was toggled."},className:{required:!1,tsType:{name:`string`},description:``},style:{required:!1,tsType:{name:`ReactCSSProperties`,raw:`React.CSSProperties`},description:``}}}})))()}var C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=t((()=>{u(),f(),m(),S(),o(),C=r(),w={title:`Components/List`,component:x,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"# List\n\n`getRoleColor()`-driven counterpart to the MUI `List`. Built against the\nreal `items`-array API — the MDS `List.figma.tsx` mapping's\n`<List.Item>` compound-component example doesn't match any prop the\nactual MUI component accepts."}}}},T=[{id:`1`,primary:`General Liability`,secondary:`Active · Renews Mar 14`},{id:`2`,primary:`Commercial Auto`,secondary:`Active · Renews May 1`},{id:`3`,primary:`Cyber Liability`,secondary:`Pending review`}],E={args:{items:T},decorators:[e=>(0,C.jsx)(`div`,{className:`w-[360px]`,children:(0,C.jsx)(e,{})})]},D={args:{items:T,subheader:`Policies`},decorators:[e=>(0,C.jsx)(`div`,{className:`w-[360px]`,children:(0,C.jsx)(e,{})})]},O={args:{items:[{id:`1`,primary:`Property`,secondary:`Building & contents`,icon:(0,C.jsx)(d,{className:`h-5 w-5`})},{id:`2`,primary:`Liability`,secondary:`General & product`,icon:(0,C.jsx)(p,{className:`h-5 w-5`})},{id:`3`,primary:`Workers Comp`,secondary:`48 employees covered`,icon:(0,C.jsx)(h,{className:`h-5 w-5`})}]},decorators:[e=>(0,C.jsx)(`div`,{className:`w-[360px]`,children:(0,C.jsx)(e,{})})]},k={args:{items:[{id:`1`,primary:`Commercial Auto`,badge:(0,C.jsx)(s,{tone:`success`,children:`Active`})},{id:`2`,primary:`Cyber Liability`,badge:(0,C.jsx)(s,{tone:`warning`,children:`Pending`})},{id:`3`,primary:`Workers Comp`,badge:(0,C.jsx)(s,{tone:`danger`,children:`Expired`})}]},decorators:[e=>(0,C.jsx)(`div`,{className:`w-[360px]`,children:(0,C.jsx)(e,{})})]},A={args:{items:T,selectable:!0,multiSelect:!0,onSelectionChange:e=>console.debug(`Selected:`,e)},decorators:[e=>(0,C.jsx)(`div`,{className:`w-[360px]`,children:(0,C.jsx)(e,{})})]},j={args:{items:T,dense:!0},decorators:[e=>(0,C.jsx)(`div`,{className:`w-[360px]`,children:(0,C.jsx)(e,{})})]},M={args:{items:[...T,{id:`4`,primary:`Archived Policy`,secondary:`No longer active`,disabled:!0}]},decorators:[e=>(0,C.jsx)(`div`,{className:`w-[360px]`,children:(0,C.jsx)(e,{})})]},N={args:{items:T,dividers:!1},decorators:[e=>(0,C.jsx)(`div`,{className:`w-[360px]`,children:(0,C.jsx)(e,{})})]},P=[`Default`,`WithSubheader`,`WithIcons`,`WithBadges`,`Selectable`,`Dense`,`WithDisabledItem`,`NoDividers`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    items: basicItems
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    items: basicItems,
    subheader: 'Policies'
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    items: basicItems,
    selectable: true,
    multiSelect: true,
    onSelectionChange: ids => console.debug('Selected:', ids)
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    items: basicItems,
    dense: true
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    items: [...basicItems, {
      id: '4',
      primary: 'Archived Policy',
      secondary: 'No longer active',
      disabled: true
    }]
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    items: basicItems,
    dividers: false
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...N.parameters?.docs?.source}}}})))()}F();export{E as Default,j as Dense,N as NoDividers,A as Selectable,k as WithBadges,M as WithDisabledItem,O as WithIcons,D as WithSubheader,P as __namedExportsOrder,w as default};