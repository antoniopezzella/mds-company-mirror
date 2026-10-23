import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Stack-DKSlLpCQ.js";import{n as a,t as o}from"./roles-DNqHlq35.js";import{i as s,n as c,r as l,t as u}from"./RadioGroup-pR2Y6zW3.js";import{n as d,t as f}from"./FormControlLabel-DvXYVFVm.js";import{a as p,n as m,o as h,t as g}from"./FormLabel-CiKWq1Jg.js";import{n as _,t as v}from"./FormHelperText-BzzMaa7f.js";var y,b,x;function S(){return(S=e((()=>{s(),c(),d(),h(),m(),_(),a(),y=n(),b=({label:e,tone:t=`default`,sx:n,...r})=>{let i=o(t===`danger`?`interactive.danger`:`interactive.primary`),a=o(t===`danger`?`interactive.danger.hover`:`interactive.primary.hover`),s=o(`fg.primary`),c=(0,y.jsx)(l,{sx:{color:o(`border.default`),"&.Mui-checked":{color:i},"&:hover":{backgroundColor:`transparent`},"&.Mui-checked:hover":{color:a},"&.Mui-disabled":{opacity:.5},...n},inputProps:{"aria-label":r[`aria-label`]},...r});return e?(0,y.jsx)(f,{control:c,label:e,sx:{color:s,fontFamily:`var(--typo-body-font-family)`,"& .MuiFormControlLabel-label":{fontSize:`var(--typo-body-font-size)`,lineHeight:`var(--typo-body-line-height)`}}}):c},x=({options:e,value:t,onChange:n,label:r,helperText:i,error:a,row:s=!1,disabled:c=!1,name:l})=>(0,y.jsxs)(p,{error:a,disabled:c,children:[r&&(0,y.jsx)(g,{sx:{color:o(`fg.primary`),fontFamily:`var(--typo-body-font-family)`,fontWeight:600,mb:1,"&.Mui-focused":{color:o(`fg.primary`)}},children:r}),(0,y.jsx)(u,{row:s,value:t,onChange:e=>{n&&n(e.target.value)},name:l,children:e.map(e=>(0,y.jsx)(b,{value:e.value,label:e.label,disabled:c||e.disabled},e.value))}),i&&(0,y.jsx)(v,{sx:{fontFamily:`var(--typo-caption-font-family)`,fontSize:`var(--typo-caption-font-size)`},children:i})]}),b.__docgenInfo={description:`Design System Radio component built on MUI Radio.
- Uses role-based colors via getRoleColor
- Supports checked and unchecked states`,methods:[],displayName:`DSRadio`,props:{tone:{defaultValue:{value:`'default'`,computed:!1},required:!1}}},x.__docgenInfo={description:``,methods:[],displayName:`DSRadioGroup`,props:{row:{defaultValue:{value:`false`,computed:!1},required:!1},disabled:{defaultValue:{value:`false`,computed:!1},required:!1}}}})))()}var C,w,T,E,D,O,k,A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{S(),r(),C=t(),w=n(),T={title:`Legacy (MUI)/Radio`,component:b,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"**Legacy (MUI).** Not the canonical Radio — new work should use `RadioGroup` from `@/components/ui/radio-group`. Kept because code still imports this one; its stories are also its only test coverage, so they stay rather than being hidden. Single selection control for mutually exclusive options. Supports grouping, disabled states, and keyboard navigation."}}},argTypes:{tone:{control:`radio`,options:[`default`,`danger`]},disabled:{control:`boolean`},checked:{control:`boolean`}}},E={args:{label:`Radio Label`}},D={args:{label:`Checked Radio`,checked:!0}},O={args:{label:`Disabled Radio`,disabled:!0}},k={args:{label:`Disabled & Checked`,disabled:!0,checked:!0}},A={args:{label:`Delete Permanently`,tone:`danger`,checked:!0}},j={args:{checked:!1,"aria-label":`Select option`}},M={render:e=>(0,w.jsx)(x,{...e}),args:{label:`Plan Selection`,options:[{value:`free`,label:`Free Plan`},{value:`pro`,label:`Pro Plan`},{value:`enterprise`,label:`Enterprise Plan`}],value:`pro`,helperText:`Choose your subscription plan`}},N={render:e=>(0,w.jsx)(x,{...e}),args:{label:`Size`,options:[{value:`small`,label:`Small`},{value:`medium`,label:`Medium`},{value:`large`,label:`Large`}],value:`medium`,row:!0}},P={render:e=>(0,w.jsx)(x,{...e}),args:{label:`Shipping Method`,options:[{value:`standard`,label:`Standard (5-7 days)`},{value:`express`,label:`Express (2-3 days)`},{value:`overnight`,label:`Overnight`}],error:!0,helperText:`Please select a shipping method`}},F={render:e=>(0,w.jsx)(x,{...e}),args:{label:`Payment Method`,options:[{value:`card`,label:`Credit Card`},{value:`paypal`,label:`PayPal`},{value:`crypto`,label:`Cryptocurrency`,disabled:!0}],value:`card`,helperText:`Some payment methods may be unavailable`}},I={render:()=>{let[e,t]=(0,C.useState)(`pro`),[n,r]=(0,C.useState)(`monthly`),[a,o]=(0,C.useState)(`standard`);return(0,w.jsxs)(i,{spacing:3,sx:{width:400},children:[(0,w.jsx)(x,{label:`Plan Selection`,options:[{value:`free`,label:`Free - $0/month`},{value:`pro`,label:`Pro - $29/month`},{value:`enterprise`,label:`Enterprise - Custom pricing`}],value:e,onChange:t,helperText:`Choose your subscription tier`}),(0,w.jsx)(x,{label:`Billing Cycle`,options:[{value:`monthly`,label:`Monthly`},{value:`yearly`,label:`Yearly (Save 20%)`}],value:n,onChange:r,row:!0}),(0,w.jsx)(x,{label:`Support Level`,options:[{value:`standard`,label:`Standard Support (Email)`},{value:`priority`,label:`Priority Support (24/7)`}],value:a,onChange:o})]})}},L=[`Default`,`Checked`,`Disabled`,`DisabledChecked`,`DangerTone`,`WithoutLabel`,`RadioGroup`,`RadioGroupRow`,`RadioGroupError`,`RadioGroupWithDisabled`,`FormExample`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Radio Label'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checked Radio',
    checked: true
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Radio',
    disabled: true
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled & Checked',
    disabled: true,
    checked: true
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Delete Permanently',
    tone: 'danger',
    checked: true
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    // No *visible* label, but the control still needs an accessible name.
    'aria-label': 'Select option'
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => <DSRadioGroup {...args} />,
  args: {
    label: 'Plan Selection',
    options: [{
      value: 'free',
      label: 'Free Plan'
    }, {
      value: 'pro',
      label: 'Pro Plan'
    }, {
      value: 'enterprise',
      label: 'Enterprise Plan'
    }],
    value: 'pro',
    helperText: 'Choose your subscription plan'
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => <DSRadioGroup {...args} />,
  args: {
    label: 'Size',
    options: [{
      value: 'small',
      label: 'Small'
    }, {
      value: 'medium',
      label: 'Medium'
    }, {
      value: 'large',
      label: 'Large'
    }],
    value: 'medium',
    row: true
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => <DSRadioGroup {...args} />,
  args: {
    label: 'Shipping Method',
    options: [{
      value: 'standard',
      label: 'Standard (5-7 days)'
    }, {
      value: 'express',
      label: 'Express (2-3 days)'
    }, {
      value: 'overnight',
      label: 'Overnight'
    }],
    error: true,
    helperText: 'Please select a shipping method'
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => <DSRadioGroup {...args} />,
  args: {
    label: 'Payment Method',
    options: [{
      value: 'card',
      label: 'Credit Card'
    }, {
      value: 'paypal',
      label: 'PayPal'
    }, {
      value: 'crypto',
      label: 'Cryptocurrency',
      disabled: true
    }],
    value: 'card',
    helperText: 'Some payment methods may be unavailable'
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [plan, setPlan] = useState('pro');
    const [billing, setBilling] = useState('monthly');
    const [support, setSupport] = useState('standard');
    return <Stack spacing={3} sx={{
      width: 400
    }}>
        <DSRadioGroup label="Plan Selection" options={[{
        value: 'free',
        label: 'Free - $0/month'
      }, {
        value: 'pro',
        label: 'Pro - $29/month'
      }, {
        value: 'enterprise',
        label: 'Enterprise - Custom pricing'
      }]} value={plan} onChange={setPlan} helperText="Choose your subscription tier" />
        
        <DSRadioGroup label="Billing Cycle" options={[{
        value: 'monthly',
        label: 'Monthly'
      }, {
        value: 'yearly',
        label: 'Yearly (Save 20%)'
      }]} value={billing} onChange={setBilling} row />
        
        <DSRadioGroup label="Support Level" options={[{
        value: 'standard',
        label: 'Standard Support (Email)'
      }, {
        value: 'priority',
        label: 'Priority Support (24/7)'
      }]} value={support} onChange={setSupport} />
      </Stack>;
  }
}`,...I.parameters?.docs?.source}}}})))()}R();export{D as Checked,A as DangerTone,E as Default,O as Disabled,k as DisabledChecked,I as FormExample,M as RadioGroup,P as RadioGroupError,N as RadioGroupRow,F as RadioGroupWithDisabled,j as WithoutLabel,L as __namedExportsOrder,T as default};