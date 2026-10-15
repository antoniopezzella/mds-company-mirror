import{a5 as u,Z as m}from"./iframe-CPBTUrEW.js";import{C as p}from"./checkbox-CNQZ_QzY.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";import"./index-D-VHP59e.js";import"./index-B2KxKFY1.js";import"./index-ydzPhmoe.js";import"./index-CQZ-MLQt.js";import"./index-CNxNdWYK.js";import"./index-D0Uu3jyy.js";import"./index-DbquDQCT.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./minus-CnttpEGu.js";import"./createLucideIcon-BnpAccaP.js";import"./check-KuCy08bp.js";import"./info-XF5axP9F.js";const q={title:"Components/Checkbox",component:p,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Selection control for multiple choices. Supports checked, indeterminate, invalid, and disabled states with full keyboard navigation via Radix."}}},argTypes:{invalid:{control:"boolean"},disabled:{control:"boolean"},checked:{control:"boolean"},indeterminate:{control:"boolean"},hideHelperIcon:{control:"boolean"}}},e={args:{label:"Checkbox label"}},r={args:{label:"Checked checkbox",checked:!0}},t={args:{label:"Disabled checkbox",disabled:!0}},a={args:{label:"Disabled & checked",disabled:!0,checked:!0}},s={args:{label:"Indeterminate state",indeterminate:!0}},o={args:{label:"I agree to the Terms of Service",invalid:!0,checked:!0,helperText:"You must accept the terms to continue"}},n={args:{label:"Subscribe to newsletter",checked:!0,helperText:"We'll send at most one email a week"}},c={args:{checked:!1,"aria-label":"Select row"}},l={render:()=>{const[i,b]=u.useState(!1),[h,k]=u.useState(!0);return m.jsxs("div",{className:"flex w-[360px] flex-col gap-4",children:[m.jsx(p,{label:"I agree to the Terms and Conditions",checked:i,onCheckedChange:d=>b(d===!0),invalid:!i,helperText:i?void 0:"Required to continue"}),m.jsx(p,{label:"Subscribe to newsletter",checked:h,onCheckedChange:d=>k(d===!0)})]})}},F=["Default","Checked","Disabled","DisabledChecked","Indeterminate","Invalid","WithHelper","WithoutLabel","FormExample"];e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checkbox label'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checked checkbox',
    checked: true
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled checkbox',
    disabled: true
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled & checked',
    disabled: true,
    checked: true
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Indeterminate state',
    indeterminate: true
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'I agree to the Terms of Service',
    invalid: true,
    checked: true,
    helperText: 'You must accept the terms to continue'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
    helperText: "We'll send at most one email a week"
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    // No *visible* label, but a control still needs an accessible one —
    // "without label" means the text isn't rendered, not that screen-reader
    // users get nothing. This is the pattern to copy for checkbox-in-a-table.
    'aria-label': 'Select row'
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [terms, setTerms] = useState(false);
    const [newsletter, setNewsletter] = useState(true);
    return <div className="flex w-[360px] flex-col gap-4">
        <Checkbox label="I agree to the Terms and Conditions" checked={terms} onCheckedChange={next => setTerms(next === true)} invalid={!terms} helperText={!terms ? 'Required to continue' : undefined} />
        <Checkbox label="Subscribe to newsletter" checked={newsletter} onCheckedChange={next => setNewsletter(next === true)} />
      </div>;
  }
}`,...l.parameters?.docs?.source}}};export{r as Checked,e as Default,t as Disabled,a as DisabledChecked,l as FormExample,s as Indeterminate,o as Invalid,n as WithHelper,c as WithoutLabel,F as __namedExportsOrder,q as default};
