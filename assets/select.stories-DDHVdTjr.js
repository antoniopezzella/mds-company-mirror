import{Z as e,a5 as h}from"./iframe-CPBTUrEW.js";import{S as x,f as v,g as f,a as j,b as m,d as S,c as n,e as D,D as a}from"./select-3H9YJY8U.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D17hSi50.js";import"./index-B2KxKFY1.js";import"./index-D8r7tS0H.js";import"./index-D-VHP59e.js";import"./index-DTX6ga2Q.js";import"./index-COhu0uIO.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-ydzPhmoe.js";import"./index-CztXHdXt.js";import"./index-DrK2s9b6.js";import"./utils-CURkPv3a.js";import"./prop-compat-ClktB6p5.js";import"./control-size-rvCN7ZpI.js";import"./chevron-down-122XaqBk.js";import"./createLucideIcon-BnpAccaP.js";import"./check-KuCy08bp.js";import"./chevron-up-CoKqbRsK.js";const X={title:"Components/Select",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# Select\n\nRadix `Select` renders a real custom-styled listbox — not a native\n`<select>` — with proper keyboard nav, typeahead, and viewport-aware\npositioning. That's a materially better foundation than MUI's Select, so\nthe composable primitives are the primary API here.\n\n`DSSelect` (bottom of this file) is a convenience wrapper matching MUI's\n`options`/`label`/`helperText`/`error`/`tone` prop shape for migration."}}}},l={render:()=>e.jsxs(x,{defaultValue:"pro",children:[e.jsx(v,{className:"w-[220px]","aria-label":"Plan",children:e.jsx(f,{placeholder:"Select a plan"})}),e.jsxs(j,{children:[e.jsxs(m,{children:[e.jsx(S,{children:"Plans"}),e.jsx(n,{value:"free",children:"Free"}),e.jsx(n,{value:"pro",children:"Pro"}),e.jsx(n,{value:"enterprise",children:"Enterprise"})]}),e.jsx(D,{}),e.jsxs(m,{children:[e.jsx(S,{children:"Legacy"}),e.jsx(n,{value:"legacy",disabled:!0,children:"Legacy (discontinued)"})]})]})]})},t=[{value:"free",label:"Free plan"},{value:"pro",label:"Pro plan"},{value:"enterprise",label:"Enterprise plan"}],s={render:r=>e.jsx(a,{...r}),args:{label:"Subscription plan",options:t,defaultValue:"pro"}},o={render:r=>e.jsx(a,{...r}),args:{label:"Subscription plan",options:t,helperText:"You can change this anytime"}},p={render:r=>e.jsx(a,{...r}),args:{label:"Shipping method",options:[{value:"standard",label:"Standard"},{value:"express",label:"Express"}],error:!0,helperText:"Selection required to continue"}},i={render:r=>e.jsx(a,{...r}),args:{label:"Subscription plan",options:t,defaultValue:"pro",disabled:!0}},c={render:r=>e.jsx(a,{...r}),args:{label:"Subscription plan",options:[{value:"free",label:"Free plan"},{value:"pro",label:"Pro plan"},{value:"enterprise",label:"Enterprise plan (contact sales)",disabled:!0}]}},d={render:r=>e.jsx("div",{className:"w-[400px]",children:e.jsx(a,{...r})}),args:{label:"Subscription plan",options:t,fullWidth:!0}},u={render:()=>{const[r,b]=h.useState("pro");return e.jsx(a,{label:"Subscription plan",options:t,value:r,onChange:g=>b(String(g)),helperText:`Selected: ${r}`})}},ee=["Composable","Default","WithHelperText","ErrorState","Disabled","WithDisabledOption","FullWidth","ControlledExample"];l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Select defaultValue="pro">
      {/* role="combobox" takes no name from its content, so the trigger needs
          an explicit label even though the plan name is visible inside it. */}
      <SelectTrigger className="w-[220px]" aria-label="Plan">
        <SelectValue placeholder="Select a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Plans</SelectLabel>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Legacy</SelectLabel>
          <SelectItem value="legacy" disabled>
            Legacy (discontinued)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
    options: planOptions,
    defaultValue: 'pro'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
    options: planOptions,
    helperText: 'You can change this anytime'
  }
}`,...o.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <DSSelect {...args} />,
  args: {
    label: 'Shipping method',
    options: [{
      value: 'standard',
      label: 'Standard'
    }, {
      value: 'express',
      label: 'Express'
    }],
    error: true,
    helperText: 'Selection required to continue'
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
    options: planOptions,
    defaultValue: 'pro',
    disabled: true
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
    options: [{
      value: 'free',
      label: 'Free plan'
    }, {
      value: 'pro',
      label: 'Pro plan'
    }, {
      value: 'enterprise',
      label: 'Enterprise plan (contact sales)',
      disabled: true
    }]
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[400px]">
      <DSSelect {...args} />
    </div>,
  args: {
    label: 'Subscription plan',
    options: planOptions,
    fullWidth: true
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [plan, setPlan] = useState('pro');
    return <DSSelect label="Subscription plan" options={planOptions} value={plan} onChange={value => setPlan(String(value))} helperText={\`Selected: \${plan}\`} />;
  }
}`,...u.parameters?.docs?.source}}};export{l as Composable,u as ControlledExample,s as Default,i as Disabled,p as ErrorState,d as FullWidth,c as WithDisabledOption,o as WithHelperText,ee as __namedExportsOrder,X as default};
