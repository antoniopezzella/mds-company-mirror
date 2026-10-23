import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./createLucideIcon-DC6xoXt7.js";import{n as a,t as o}from"./chip-CG3gaiJI.js";var s,c;function l(){return(l=e((()=>{r(),s=[[`path`,{d:`M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z`,key:`r04s7s`}]],c=i(`star`,s)})))()}var u,d,f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{u=t(),l(),a(),d=n(),f={title:`Components/Chip`,component:o,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# Chip\n\nRadix-free, `getRoleColor()`-driven counterpart to the MUI `Chip`. Same\n`label`/`variant`/`tone`/`size`/`selectable`/`selected`/`onDelete`/`icon`\nAPI as the MUI twin."}}},argTypes:{variant:{control:`select`,options:[`filled`,`outlined`]},tone:{control:`select`,options:[`default`,`primary`,`secondary`,`success`,`warning`,`danger`,`info`]},size:{control:`select`,options:[`sm`,`md`,`lg`]}}},p={args:{label:`Available`,tone:`success`}},m={args:{label:`Filter Active`,tone:`primary`,variant:`outlined`}},h={args:{label:`Auto Insurance`,tone:`secondary`,onDelete:()=>alert(`removed`)}},g={args:{label:`Featured`,tone:`warning`,icon:(0,d.jsx)(c,{className:`h-full w-full`})}},_={render:()=>(0,d.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,d.jsx)(o,{label:`Default`,tone:`default`}),(0,d.jsx)(o,{label:`Primary`,tone:`primary`}),(0,d.jsx)(o,{label:`Secondary`,tone:`secondary`}),(0,d.jsx)(o,{label:`Success`,tone:`success`}),(0,d.jsx)(o,{label:`Warning`,tone:`warning`}),(0,d.jsx)(o,{label:`Danger`,tone:`danger`}),(0,d.jsx)(o,{label:`Info`,tone:`info`})]})},v={render:()=>(0,d.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,d.jsx)(o,{label:`Small`,size:`sm`,tone:`primary`}),(0,d.jsx)(o,{label:`Medium`,size:`md`,tone:`primary`}),(0,d.jsx)(o,{label:`Large`,size:`lg`,tone:`primary`})]})},y={args:{label:`Unavailable`,tone:`secondary`,disabled:!0}},b={render:()=>{let[e,t]=(0,u.useState)([`auto`]),n=[{value:`auto`,label:`Auto`},{value:`home`,label:`Home`},{value:`life`,label:`Life`},{value:`travel`,label:`Travel`}],r=e=>t(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);return(0,d.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:n.map(t=>(0,d.jsx)(o,{label:t.label,tone:`primary`,selectable:!0,selected:e.includes(t.value),onClick:()=>r(t.value)},t.value))})}},x=[`Default`,`Outlined`,`Removable`,`WithIcon`,`Tones`,`Sizes`,`Disabled`,`SelectableGroup`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Available',
    tone: 'success'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Filter Active',
    tone: 'primary',
    variant: 'outlined'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Auto Insurance',
    tone: 'secondary',
    onDelete: () => alert('removed')
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Featured',
    tone: 'warning',
    icon: <Star className="h-full w-full" />
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Chip label="Default" tone="default" />
      <Chip label="Primary" tone="primary" />
      <Chip label="Secondary" tone="secondary" />
      <Chip label="Success" tone="success" />
      <Chip label="Warning" tone="warning" />
      <Chip label="Danger" tone="danger" />
      <Chip label="Info" tone="info" />
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <Chip label="Small" size="sm" tone="primary" />
      <Chip label="Medium" size="md" tone="primary" />
      <Chip label="Large" size="lg" tone="primary" />
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Unavailable',
    tone: 'secondary',
    disabled: true
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>(['auto']);
    const options = [{
      value: 'auto',
      label: 'Auto'
    }, {
      value: 'home',
      label: 'Home'
    }, {
      value: 'life',
      label: 'Life'
    }, {
      value: 'travel',
      label: 'Travel'
    }];
    const toggle = (value: string) => setSelected(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    return <div className="flex flex-wrap gap-2">
        {options.map(opt => <Chip key={opt.value} label={opt.label} tone="primary" selectable selected={selected.includes(opt.value)} onClick={() => toggle(opt.value)} />)}
      </div>;
  }
}`,...b.parameters?.docs?.source}}}})))()}S();export{p as Default,y as Disabled,m as Outlined,h as Removable,b as SelectableGroup,v as Sizes,_ as Tones,g as WithIcon,x as __namedExportsOrder,f as default};