import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";var i,a,o;function s(){return(s=t((()=>{i=e(n(),1),a=r(),o=i.forwardRef(({items:e,separator:t=`/`,maxItems:n=8,className:r,ariaLabel:o=`Breadcrumbs`},s)=>{let c=`var(--role-interactive-primary)`,l=`var(--role-fg-neutral-subtle)`,u=e.length>n&&n>=2?[e[0],`ellipsis`,...e.slice(e.length-(n-1))]:e;return(0,a.jsx)(`nav`,{ref:s,"aria-label":o,className:r,children:(0,a.jsx)(`ol`,{className:`flex flex-wrap items-center gap-1.5 text-sm`,children:u.map((e,n)=>{let r=n===u.length-1;return(0,a.jsxs)(i.Fragment,{children:[n>0&&(0,a.jsx)(`li`,{"aria-hidden":`true`,className:`select-none`,style:{color:l},children:t}),(0,a.jsx)(`li`,{className:`flex items-center`,children:e===`ellipsis`?(0,a.jsx)(`span`,{style:{color:l},children:`…`}):e.isCurrentPage||r?(0,a.jsx)(`span`,{"aria-current":`page`,className:`font-medium`,style:{color:`var(--role-fg-primary)`},children:e.label}):(0,a.jsx)(`a`,{href:e.href||`#`,onClick:t=>{e.onClick&&(t.preventDefault(),e.onClick(t))},className:`rounded-lg transition-opacity hover:underline hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2`,style:{color:c,"--tw-ring-color":c},children:e.label})})]},e===`ellipsis`?`ellipsis-${n}`:`${e.label}-${n}`)})})})}),o.displayName=`Breadcrumbs`,o.__docgenInfo={description:"Forwards to the `<nav>` landmark, so a consumer can scroll it into view or measure it.",methods:[],displayName:`Breadcrumbs`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`BreadcrumbItem`}],raw:`BreadcrumbItem[]`},description:``},separator:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:"Rendered between each item. Defaults to `/`.",defaultValue:{value:`'/'`,computed:!1}},maxItems:{required:!1,tsType:{name:`number`},description:"Collapses the middle items into an ellipsis once `items.length` exceeds this, keeping the first and last entries visible.",defaultValue:{value:`8`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},ariaLabel:{required:!1,tsType:{name:`string`},description:"Overrides the `<nav>`'s `aria-label` — localize it when the surrounding page isn't in English.",defaultValue:{value:`'Breadcrumbs'`,computed:!1}}}}})))()}var c,l,u,d,f,p,m;function h(){return(h=t((()=>{s(),c={title:`Components/Breadcrumbs`,component:o,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"# Breadcrumbs\n\nRadix-free, `getRoleColor()`-driven counterpart to the MUI `Breadcrumbs`.\nSame `items`/`separator`/`maxItems`/`ariaLabel` API as the MUI twin,\nincluding first/last + ellipsis collapse when items exceed `maxItems`."}}}},l={args:{items:[{label:`Home`,href:`/`},{label:`Policies`,href:`/policies`},{label:`Policy Detail`,isCurrentPage:!0}]}},u={args:{items:[{label:`Dashboard`,href:`/`},{label:`Claims`,href:`/claims`},{label:`CLM-40213`,isCurrentPage:!0}],separator:`›`}},d={args:{items:[{label:`Home`,onClick:()=>alert(`Navigate home`)},{label:`Reports`,onClick:()=>alert(`Navigate reports`)},{label:`Q4 Summary`,isCurrentPage:!0}]}},f={args:{items:[{label:`Home`,href:`/`},{label:`Clients`,href:`/clients`},{label:`Beacon Capital`,href:`/clients/beacon`},{label:`Policies`,href:`/clients/beacon/policies`},{label:`Auto`,href:`/clients/beacon/policies/auto`},{label:`POL-40213`,isCurrentPage:!0}],maxItems:4}},p={args:{items:[{label:`Home`,href:`/`},{label:`Settings`,isCurrentPage:!0}]}},m=[`Default`,`CustomSeparator`,`WithOnClick`,`CollapsedLongPath`,`TwoLevels`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '/'
    }, {
      label: 'Settings',
      isCurrentPage: true
    }]
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{f as CollapsedLongPath,u as CustomSeparator,l as Default,p as TwoLevels,d as WithOnClick,m as __namedExportsOrder,c as default};