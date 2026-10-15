import{a5 as d,Z as l}from"./iframe-CPBTUrEW.js";import{S as i}from"./switch-dYPv2PNo.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B2KxKFY1.js";import"./index-DTX6ga2Q.js";import"./index-D-VHP59e.js";import"./index-ydzPhmoe.js";import"./index-CQZ-MLQt.js";import"./index-CNxNdWYK.js";import"./index-DbquDQCT.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";const M={title:"Components/Switch",component:i,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Toggle control for on/off states, with keyboard support and focus-visible ring via Radix."}}},argTypes:{tone:{control:"radio",options:["default","danger"]},labelPlacement:{control:"radio",options:["end","start"]},disabled:{control:"boolean"},checked:{control:"boolean"}}},e={args:{label:"Switch label"}},a={args:{label:"Enabled",checked:!0}},r={args:{label:"Disabled switch",disabled:!0}},t={args:{label:"Disabled & checked",disabled:!0,checked:!0}},s={args:{label:"Danger mode",tone:"danger",checked:!0}},o={args:{label:"Label before switch",labelPlacement:"start",checked:!0}},n={args:{checked:!1,"aria-label":"Enable feature"}},c={render:()=>{const[m,p]=d.useState(!0),[u,b]=d.useState(!1);return l.jsxs("div",{className:"flex w-[320px] flex-col gap-4",children:[l.jsx(i,{label:"Push notifications",checked:m,onCheckedChange:p}),l.jsx(i,{label:"Marketing emails",checked:u,onCheckedChange:b})]})}},N=["Default","Checked","Disabled","DisabledChecked","DangerTone","LabelStart","WithoutLabel","FormExample"];e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Switch label'
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Enabled',
    checked: true
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled switch',
    disabled: true
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled & checked',
    disabled: true,
    checked: true
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Danger mode',
    tone: 'danger',
    checked: true
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label before switch',
    labelPlacement: 'start',
    checked: true
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    // Same rule as Checkbox/WithoutLabel: \`role="switch"\` takes no name from
    // content, so a switch with no visible label still needs a programmatic
    // one. "Without label" means no rendered text, not no accessible name.
    'aria-label': 'Enable feature'
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);
    return <div className="flex w-[320px] flex-col gap-4">
        <Switch label="Push notifications" checked={notifications} onCheckedChange={setNotifications} />
        <Switch label="Marketing emails" checked={marketing} onCheckedChange={setMarketing} />
      </div>;
  }
}`,...c.parameters?.docs?.source}}};export{a as Checked,s as DangerTone,e as Default,r as Disabled,t as DisabledChecked,c as FormExample,o as LabelStart,n as WithoutLabel,N as __namedExportsOrder,M as default};
