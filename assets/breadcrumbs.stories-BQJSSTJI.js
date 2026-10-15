import{a5 as h,Z as a}from"./iframe-CPBTUrEW.js";import"./preload-helper-PPVm8Dsz.js";const m=h.forwardRef(({items:r,separator:g="/",maxItems:c=8,className:f,ariaLabel:C="Breadcrumbs"},v)=>{const u="var(--role-interactive-primary)",x="var(--role-text-primary)",p="var(--role-text-secondary)",d=r.length>c&&c>=2?[r[0],"ellipsis",...r.slice(r.length-(c-1))]:r;return a.jsx("nav",{ref:v,"aria-label":C,className:f,children:a.jsx("ol",{className:"flex flex-wrap items-center gap-1.5 text-sm",children:d.map((e,s)=>{const y=s===d.length-1;return a.jsxs(h.Fragment,{children:[s>0&&a.jsx("li",{"aria-hidden":"true",className:"select-none",style:{color:p},children:g}),a.jsx("li",{className:"flex items-center",children:e==="ellipsis"?a.jsx("span",{style:{color:p},children:"…"}):e.isCurrentPage||y?a.jsx("span",{"aria-current":"page",className:"font-medium",style:{color:x},children:e.label}):a.jsx("a",{href:e.href||"#",onClick:b=>{e.onClick&&(b.preventDefault(),e.onClick(b))},className:"rounded-lg transition-opacity hover:underline hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2",style:{color:u,"--tw-ring-color":u},children:e.label})})]},e==="ellipsis"?`ellipsis-${s}`:`${e.label}-${s}`)})})})});m.displayName="Breadcrumbs";m.__docgenInfo={description:"Forwards to the `<nav>` landmark, so a consumer can scroll it into view or measure it.",methods:[],displayName:"Breadcrumbs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"BreadcrumbItem"}],raw:"BreadcrumbItem[]"},description:""},separator:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Rendered between each item. Defaults to `/`.",defaultValue:{value:"'/'",computed:!1}},maxItems:{required:!1,tsType:{name:"number"},description:"Collapses the middle items into an ellipsis once `items.length` exceeds this, keeping the first and last entries visible.",defaultValue:{value:"8",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:"Overrides the `<nav>`'s `aria-label` — localize it when the surrounding page isn't in English.",defaultValue:{value:"'Breadcrumbs'",computed:!1}}}};const w={title:"Components/Breadcrumbs",component:m,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"# Breadcrumbs\n\nRadix-free, `getRoleColor()`-driven counterpart to the MUI `Breadcrumbs`.\nSame `items`/`separator`/`maxItems`/`ariaLabel` API as the MUI twin,\nincluding first/last + ellipsis collapse when items exceed `maxItems`."}}}},l={args:{items:[{label:"Home",href:"/"},{label:"Policies",href:"/policies"},{label:"Policy Detail",isCurrentPage:!0}]}},n={args:{items:[{label:"Dashboard",href:"/"},{label:"Claims",href:"/claims"},{label:"CLM-40213",isCurrentPage:!0}],separator:"›"}},t={args:{items:[{label:"Home",onClick:()=>alert("Navigate home")},{label:"Reports",onClick:()=>alert("Navigate reports")},{label:"Q4 Summary",isCurrentPage:!0}]}},o={args:{items:[{label:"Home",href:"/"},{label:"Clients",href:"/clients"},{label:"Beacon Capital",href:"/clients/beacon"},{label:"Policies",href:"/clients/beacon/policies"},{label:"Auto",href:"/clients/beacon/policies/auto"},{label:"POL-40213",isCurrentPage:!0}],maxItems:4}},i={args:{items:[{label:"Home",href:"/"},{label:"Settings",isCurrentPage:!0}]}},k=["Default","CustomSeparator","WithOnClick","CollapsedLongPath","TwoLevels"];l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '/'
    }, {
      label: 'Policies',
      href: '/policies'
    }, {
      label: 'Policy Detail',
      isCurrentPage: true
    }]
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Dashboard',
      href: '/'
    }, {
      label: 'Claims',
      href: '/claims'
    }, {
      label: 'CLM-40213',
      isCurrentPage: true
    }],
    separator: '›'
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      onClick: () => alert('Navigate home')
    }, {
      label: 'Reports',
      onClick: () => alert('Navigate reports')
    }, {
      label: 'Q4 Summary',
      isCurrentPage: true
    }]
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '/'
    }, {
      label: 'Clients',
      href: '/clients'
    }, {
      label: 'Beacon Capital',
      href: '/clients/beacon'
    }, {
      label: 'Policies',
      href: '/clients/beacon/policies'
    }, {
      label: 'Auto',
      href: '/clients/beacon/policies/auto'
    }, {
      label: 'POL-40213',
      isCurrentPage: true
    }],
    maxItems: 4
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '/'
    }, {
      label: 'Settings',
      isCurrentPage: true
    }]
  }
}`,...i.parameters?.docs?.source}}};export{o as CollapsedLongPath,n as CustomSeparator,l as Default,i as TwoLevels,t as WithOnClick,k as __namedExportsOrder,w as default};
