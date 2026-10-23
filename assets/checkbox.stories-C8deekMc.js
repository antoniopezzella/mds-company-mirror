import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{r,t as i}from"./checkbox-DdklOp-r.js";var a,o,s,c,l,u,d,f,p,m,h,g,_;function v(){return(v=e((()=>{a=t(),r(),o=n(),s={title:`Components/Checkbox`,component:i,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`Selection control for multiple choices. Supports checked, indeterminate, invalid, and disabled states with full keyboard navigation via Radix.`}}},argTypes:{invalid:{control:`boolean`},disabled:{control:`boolean`},checked:{control:`boolean`},indeterminate:{control:`boolean`},hideHelperIcon:{control:`boolean`}}},c={args:{label:`Checkbox label`}},l={args:{label:`Checked checkbox`,checked:!0}},u={args:{label:`Disabled checkbox`,disabled:!0}},d={args:{label:`Disabled & checked`,disabled:!0,checked:!0}},f={args:{label:`Indeterminate state`,indeterminate:!0}},p={args:{label:`I agree to the Terms of Service`,invalid:!0,checked:!0,helperText:`You must accept the terms to continue`}},m={args:{label:`Subscribe to newsletter`,checked:!0,helperText:`We'll send at most one email a week`}},h={args:{checked:!1,"aria-label":`Select row`}},g={render:()=>{let[e,t]=(0,a.useState)(!1),[n,r]=(0,a.useState)(!0);return(0,o.jsxs)(`div`,{className:`flex w-[360px] flex-col gap-4`,children:[(0,o.jsx)(i,{label:`I agree to the Terms and Conditions`,checked:e,onCheckedChange:e=>t(e===!0),invalid:!e,helperText:e?void 0:`Required to continue`}),(0,o.jsx)(i,{label:`Subscribe to newsletter`,checked:n,onCheckedChange:e=>r(e===!0)})]})}},_=[`Default`,`Checked`,`Disabled`,`DisabledChecked`,`Indeterminate`,`Invalid`,`WithHelper`,`WithoutLabel`,`FormExample`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checkbox label'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checked checkbox',
    checked: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled checkbox',
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
    label: 'Indeterminate state',
    indeterminate: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'I agree to the Terms of Service',
    invalid: true,
    checked: true,
    helperText: 'You must accept the terms to continue'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
    helperText: "We'll send at most one email a week"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    // No *visible* label, but a control still needs an accessible one —
    // "without label" means the text isn't rendered, not that screen-reader
    // users get nothing. This is the pattern to copy for checkbox-in-a-table.
    'aria-label': 'Select row'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [terms, setTerms] = useState(false);
    const [newsletter, setNewsletter] = useState(true);
    return <div className="flex w-[360px] flex-col gap-4">
        <Checkbox label="I agree to the Terms and Conditions" checked={terms} onCheckedChange={next => setTerms(next === true)} invalid={!terms} helperText={!terms ? 'Required to continue' : undefined} />
        <Checkbox label="Subscribe to newsletter" checked={newsletter} onCheckedChange={next => setNewsletter(next === true)} />
      </div>;
  }
}`,...g.parameters?.docs?.source}}}})))()}v();export{l as Checked,c as Default,u as Disabled,d as DisabledChecked,g as FormExample,f as Indeterminate,p as Invalid,m as WithHelper,h as WithoutLabel,_ as __namedExportsOrder,s as default};