import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./combobox-t_QCX9WS.js";var a,o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{a=t(),r(),o=n(),s={title:`Components/Combobox`,component:i,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`# Combobox

No MDS/Figma spec exists for this component — built directly on Popover + Command combined, styled with
\`getRoleColor()\`. Unlike \`Select\`, this lets users type to filter a long
option list rather than scrolling through it.`}}}},c=[{value:`beacon`,label:`Beacon Capital Partners`},{value:`northwind`,label:`Northwind Insurance`},{value:`globex`,label:`Globex Corporation`},{value:`initech`,label:`Initech`},{value:`umbrella`,label:`Umbrella Holdings`}],l={render:e=>(0,o.jsx)(`div`,{className:`w-[280px]`,children:(0,o.jsx)(i,{...e})}),args:{options:c,placeholder:`Select a client...`}},u={render:()=>{let[e,t]=(0,a.useState)(`northwind`);return(0,o.jsx)(`div`,{className:`w-[280px]`,children:(0,o.jsx)(i,{options:c,value:e,onChange:t,placeholder:`Select a client...`})})}},d={render:e=>(0,o.jsx)(`div`,{className:`w-[280px]`,children:(0,o.jsx)(i,{...e})}),args:{options:c,disabled:!0}},f={render:e=>(0,o.jsx)(`div`,{className:`w-[280px]`,children:(0,o.jsx)(i,{...e})}),args:{options:[...c,{value:`legacy`,label:`Legacy Corp (archived)`,disabled:!0}]}},p=[`Default`,`Controlled`,`Disabled`,`WithDisabledOption`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[280px]">
      <Combobox {...args} />
    </div>,
  args: {
    options: clientOptions,
    placeholder: 'Select a client...'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('northwind');
    return <div className="w-[280px]">
        <Combobox options={clientOptions} value={value} onChange={setValue} placeholder="Select a client..." />
      </div>;
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[280px]">
      <Combobox {...args} />
    </div>,
  args: {
    options: clientOptions,
    disabled: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}}})))()}m();export{u as Controlled,l as Default,d as Disabled,f as WithDisabledOption,p as __namedExportsOrder,s as default};