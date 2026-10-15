import{a5 as f,Z as e}from"./iframe-CPBTUrEW.js";import{C as a}from"./chip-DBjgF8eT.js";import{c as x}from"./createLucideIcon-BnpAccaP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./x-Bk_wSNf2.js";const y=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],h=x("star",y),A={title:"Components/Chip",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# Chip\n\nRadix-free, `getRoleColor()`-driven counterpart to the MUI `Chip`. Same\n`label`/`variant`/`tone`/`size`/`selectable`/`selected`/`onDelete`/`icon`\nAPI as the MUI twin."}}},argTypes:{variant:{control:"select",options:["filled","outlined"]},tone:{control:"select",options:["default","primary","secondary","success","warning","danger","info"]},size:{control:"select",options:["sm","md","lg"]}}},l={args:{label:"Available",tone:"success"}},n={args:{label:"Filter Active",tone:"primary",variant:"outlined"}},s={args:{label:"Auto Insurance",tone:"secondary",onDelete:()=>alert("removed")}},t={args:{label:"Featured",tone:"warning",icon:e.jsx(h,{className:"h-full w-full"})}},o={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{label:"Default",tone:"default"}),e.jsx(a,{label:"Primary",tone:"primary"}),e.jsx(a,{label:"Secondary",tone:"secondary"}),e.jsx(a,{label:"Success",tone:"success"}),e.jsx(a,{label:"Warning",tone:"warning"}),e.jsx(a,{label:"Danger",tone:"danger"}),e.jsx(a,{label:"Info",tone:"info"})]})},c={render:()=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{label:"Small",size:"sm",tone:"primary"}),e.jsx(a,{label:"Medium",size:"md",tone:"primary"}),e.jsx(a,{label:"Large",size:"lg",tone:"primary"})]})},i={args:{label:"Unavailable",tone:"secondary",disabled:!0}},d={render:()=>{const[u,m]=f.useState(["auto"]),b=[{value:"auto",label:"Auto"},{value:"home",label:"Home"},{value:"life",label:"Life"},{value:"travel",label:"Travel"}],g=r=>m(p=>p.includes(r)?p.filter(v=>v!==r):[...p,r]);return e.jsx("div",{className:"flex flex-wrap gap-2",children:b.map(r=>e.jsx(a,{label:r.label,tone:"primary",selectable:!0,selected:u.includes(r.value),onClick:()=>g(r.value)},r.value))})}},N=["Default","Outlined","Removable","WithIcon","Tones","Sizes","Disabled","SelectableGroup"];l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Available',
    tone: 'success'
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Filter Active',
    tone: 'primary',
    variant: 'outlined'
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Auto Insurance',
    tone: 'secondary',
    onDelete: () => alert('removed')
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Featured',
    tone: 'warning',
    icon: <Star className="h-full w-full" />
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Chip label="Default" tone="default" />
      <Chip label="Primary" tone="primary" />
      <Chip label="Secondary" tone="secondary" />
      <Chip label="Success" tone="success" />
      <Chip label="Warning" tone="warning" />
      <Chip label="Danger" tone="danger" />
      <Chip label="Info" tone="info" />
    </div>
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <Chip label="Small" size="sm" tone="primary" />
      <Chip label="Medium" size="md" tone="primary" />
      <Chip label="Large" size="lg" tone="primary" />
    </div>
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Unavailable',
    tone: 'secondary',
    disabled: true
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};export{l as Default,i as Disabled,n as Outlined,s as Removable,d as SelectableGroup,c as Sizes,o as Tones,t as WithIcon,N as __namedExportsOrder,A as default};
