import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./switch-BoGCquMa.js";var a,o,s,c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{a=t(),r(),o=n(),s={title:`Components/Switch`,component:i,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`Toggle control for on/off states, with keyboard support and focus-visible ring via Radix.`}}},argTypes:{tone:{control:`radio`,options:[`default`,`danger`]},labelPlacement:{control:`radio`,options:[`end`,`start`]},disabled:{control:`boolean`},checked:{control:`boolean`}}},c={args:{label:`Switch label`}},l={args:{label:`Enabled`,checked:!0}},u={args:{label:`Disabled switch`,disabled:!0}},d={args:{label:`Disabled & checked`,disabled:!0,checked:!0}},f={args:{label:`Danger mode`,tone:`danger`,checked:!0}},p={args:{label:`Label before switch`,labelPlacement:`start`,checked:!0}},m={args:{checked:!1,"aria-label":`Enable feature`}},h={render:()=>{let[e,t]=(0,a.useState)(!0),[n,r]=(0,a.useState)(!1);return(0,o.jsxs)(`div`,{className:`flex w-[320px] flex-col gap-4`,children:[(0,o.jsx)(i,{label:`Push notifications`,checked:e,onCheckedChange:t}),(0,o.jsx)(i,{label:`Marketing emails`,checked:n,onCheckedChange:r})]})}},g=[`Default`,`Checked`,`Disabled`,`DisabledChecked`,`DangerTone`,`LabelStart`,`WithoutLabel`,`FormExample`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Switch label'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Enabled',
    checked: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled switch',
    disabled: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled & checked',
    disabled: true,
    checked: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Danger mode',
    tone: 'danger',
    checked: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label before switch',
    labelPlacement: 'start',
    checked: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    // Same rule as Checkbox/WithoutLabel: \`role="switch"\` takes no name from
    // content, so a switch with no visible label still needs a programmatic
    // one. "Without label" means no rendered text, not no accessible name.
    'aria-label': 'Enable feature'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);
    return <div className="flex w-[320px] flex-col gap-4">
        <Switch label="Push notifications" checked={notifications} onCheckedChange={setNotifications} />
        <Switch label="Marketing emails" checked={marketing} onCheckedChange={setMarketing} />
      </div>;
  }
}`,...h.parameters?.docs?.source}}}})))()}_();export{l as Checked,f as DangerTone,c as Default,u as Disabled,d as DisabledChecked,h as FormExample,p as LabelStart,m as WithoutLabel,g as __namedExportsOrder,s as default};