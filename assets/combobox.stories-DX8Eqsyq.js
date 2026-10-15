import{a5 as p,Z as e}from"./iframe-CPBTUrEW.js";import{C as r}from"./combobox-CPJGQGpX.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./control-size-rvCN7ZpI.js";import"./command-ChJErH62.js";import"./index-BiNW7bVc.js";import"./index-B2KxKFY1.js";import"./index-DTX6ga2Q.js";import"./index-D-VHP59e.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-ydzPhmoe.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./dialog-C1dHRi-6.js";import"./x-Bk_wSNf2.js";import"./createLucideIcon-BnpAccaP.js";import"./search-DRVimkv9.js";import"./popover-B1Y9L4uz.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./chevrons-up-down-DNeGP8GW.js";import"./check-KuCy08bp.js";const F={title:"Components/Combobox",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# Combobox\n\nNo MDS/Figma spec exists for this component — built directly on Popover + Command combined, styled with\n`getRoleColor()`. Unlike `Select`, this lets users type to filter a long\noption list rather than scrolling through it."}}}},i=[{value:"beacon",label:"Beacon Capital Partners"},{value:"northwind",label:"Northwind Insurance"},{value:"globex",label:"Globex Corporation"},{value:"initech",label:"Initech"},{value:"umbrella",label:"Umbrella Holdings"}],t={render:o=>e.jsx("div",{className:"w-[280px]",children:e.jsx(r,{...o})}),args:{options:i,placeholder:"Select a client..."}},a={render:()=>{const[o,l]=p.useState("northwind");return e.jsx("div",{className:"w-[280px]",children:e.jsx(r,{options:i,value:o,onChange:l,placeholder:"Select a client..."})})}},s={render:o=>e.jsx("div",{className:"w-[280px]",children:e.jsx(r,{...o})}),args:{options:i,disabled:!0}},n={render:o=>e.jsx("div",{className:"w-[280px]",children:e.jsx(r,{...o})}),args:{options:[...i,{value:"legacy",label:"Legacy Corp (archived)",disabled:!0}]}},G=["Default","Controlled","Disabled","WithDisabledOption"];t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[280px]">
      <Combobox {...args} />
    </div>,
  args: {
    options: clientOptions,
    placeholder: 'Select a client...'
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('northwind');
    return <div className="w-[280px]">
        <Combobox options={clientOptions} value={value} onChange={setValue} placeholder="Select a client..." />
      </div>;
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[280px]">
      <Combobox {...args} />
    </div>,
  args: {
    options: clientOptions,
    disabled: true
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[280px]">
      <Combobox {...args} />
    </div>,
  args: {
    options: [...clientOptions, {
      value: 'legacy',
      label: 'Legacy Corp (archived)',
      disabled: true
    }]
  }
}`,...n.parameters?.docs?.source}}};export{a as Controlled,t as Default,s as Disabled,n as WithDisabledOption,G as __namedExportsOrder,F as default};
