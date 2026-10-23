import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./avatar-BzHOf768.js";var i,a,o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{n(),i=t(),a={title:`Components/Avatar`,component:r,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`User profile image with initials fallback and an optional status indicator.`}}},argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`,`xl`]},variant:{control:`select`,options:[`circular`,`rounded`,`square`]},tone:{control:`select`,options:[`default`,`primary`,`secondary`,`success`,`warning`,`danger`]},status:{control:`select`,options:[void 0,`online`,`offline`,`away`,`busy`]}}},o={args:{initials:`AP`}},s={args:{src:`https://i.pravatar.cc/150?img=12`,alt:`Jane Doe`}},c={args:{src:`https://example.invalid/nonexistent.jpg`,initials:`JD`,alt:`Jane Doe`}},l={render:()=>(0,i.jsxs)(`div`,{className:`flex items-end gap-3`,children:[(0,i.jsx)(r,{initials:`S`,size:`sm`}),(0,i.jsx)(r,{initials:`M`,size:`md`}),(0,i.jsx)(r,{initials:`L`,size:`lg`}),(0,i.jsx)(r,{initials:`XL`,size:`xl`})]})},u={render:()=>(0,i.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,i.jsx)(r,{initials:`D`,tone:`default`}),(0,i.jsx)(r,{initials:`P`,tone:`primary`}),(0,i.jsx)(r,{initials:`S`,tone:`secondary`}),(0,i.jsx)(r,{initials:`OK`,tone:`success`}),(0,i.jsx)(r,{initials:`!`,tone:`warning`}),(0,i.jsx)(r,{initials:`X`,tone:`danger`})]})},d={render:()=>(0,i.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,i.jsx)(r,{initials:`C`,variant:`circular`}),(0,i.jsx)(r,{initials:`R`,variant:`rounded`}),(0,i.jsx)(r,{initials:`S`,variant:`square`})]})},f={render:()=>(0,i.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,i.jsx)(r,{initials:`ON`,status:`online`}),(0,i.jsx)(r,{initials:`AW`,status:`away`}),(0,i.jsx)(r,{initials:`BU`,status:`busy`}),(0,i.jsx)(r,{initials:`OF`,status:`offline`})]})},p={args:{initials:`AP`,onClick:()=>alert(`Avatar clicked`)}},m=[`Initials`,`WithImage`,`BrokenImageFallsBackToInitials`,`Sizes`,`Tones`,`Variants`,`WithStatus`,`Clickable`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    initials: 'AP'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    alt: 'Jane Doe'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://example.invalid/nonexistent.jpg',
    initials: 'JD',
    alt: 'Jane Doe'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-3">
      <Avatar initials="S" size="sm" />
      <Avatar initials="M" size="md" />
      <Avatar initials="L" size="lg" />
      <Avatar initials="XL" size="xl" />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Avatar initials="D" tone="default" />
      <Avatar initials="P" tone="primary" />
      <Avatar initials="S" tone="secondary" />
      <Avatar initials="OK" tone="success" />
      <Avatar initials="!" tone="warning" />
      <Avatar initials="X" tone="danger" />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Avatar initials="C" variant="circular" />
      <Avatar initials="R" variant="rounded" />
      <Avatar initials="S" variant="square" />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Avatar initials="ON" status="online" />
      <Avatar initials="AW" status="away" />
      <Avatar initials="BU" status="busy" />
      <Avatar initials="OF" status="offline" />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    initials: 'AP',
    onClick: () => alert('Avatar clicked')
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{c as BrokenImageFallsBackToInitials,p as Clickable,o as Initials,l as Sizes,u as Tones,d as Variants,s as WithImage,f as WithStatus,m as __namedExportsOrder,a as default};