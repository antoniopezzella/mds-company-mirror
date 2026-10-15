import{N as r,Z as e,a5 as R}from"./iframe-CPBTUrEW.js";import{R as G,a as F}from"./RadioGroup-DZgTakjq.js";import{F as j}from"./FormControlLabel-DM4BElVW.js";import{F as E,a as M}from"./FormLabel-DBirrJdj.js";import{F as L}from"./FormHelperText-D-o75MZp.js";import{S as w}from"./Stack-DNM9s3rh.js";import"./preload-helper-PPVm8Dsz.js";import"./createSvgIcon-sccWia23.js";import"./SvgIcon-B0F0eofH.js";import"./memoTheme-BVzAl7br.js";import"./styled-CijOp1BY.js";import"./useFormControl-CYcVT8Qz.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./useSlot-BywkIHtH.js";import"./mergeSlotProps-Cno6lv60.js";import"./useForkRef-DKrbSgSS.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useControlled-DxV8kwvS.js";import"./ButtonBase-bvGWYjN8.js";import"./useTimeout-BkF-taVW.js";import"./useEventCallback-BK5EjOzt.js";import"./isFocusVisible-B8k4qzLc.js";import"./Typography-B8Azb_EI.js";import"./isMuiElement-B1lq7zGm.js";import"./getThemeProps-D9sgPYYa.js";import"./useThemeProps-Cv2CqOcg.js";const P=({label:a,tone:n="default",sx:t,...l})=>{const s=n==="danger"?r("interactive.danger"):r("interactive.primary"),p=n==="danger"?r("interactive.danger.hover"):r("interactive.primary.hover"),C=r("text.primary"),d=e.jsx(G,{sx:{color:r("border.default"),"&.Mui-checked":{color:s},"&:hover":{backgroundColor:"transparent"},"&.Mui-checked:hover":{color:p},"&.Mui-disabled":{opacity:.5},...t},inputProps:{"aria-label":l["aria-label"]},...l});return a?e.jsx(j,{control:d,label:a,sx:{color:C,fontFamily:"var(--typo-body-font-family)","& .MuiFormControlLabel-label":{fontSize:"var(--typo-body-font-size)",lineHeight:"var(--typo-body-line-height)"}}}):d},o=({options:a,value:n,onChange:t,label:l,helperText:s,error:p,row:C=!1,disabled:d=!1,name:k})=>{const D=i=>{t&&t(i.target.value)};return e.jsxs(E,{error:p,disabled:d,children:[l&&e.jsx(M,{sx:{color:r("text.primary"),fontFamily:"var(--typo-body-font-family)",fontWeight:600,mb:1,"&.Mui-focused":{color:r("text.primary")}},children:l}),e.jsx(F,{row:C,value:n,onChange:D,name:k,children:a.map(i=>e.jsx(P,{value:i.value,label:i.label,disabled:d||i.disabled},i.value))}),s&&e.jsx(L,{sx:{fontFamily:"var(--typo-caption-font-family)",fontSize:"var(--typo-caption-font-size)"},children:s})]})};P.__docgenInfo={description:`Design System Radio component built on MUI Radio.
- Uses role-based colors via getRoleColor
- Supports checked and unchecked states`,methods:[],displayName:"DSRadio",props:{tone:{defaultValue:{value:"'default'",computed:!1},required:!1}}};o.__docgenInfo={description:"",methods:[],displayName:"DSRadioGroup",props:{row:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};const te={title:"Legacy (MUI)/Radio",component:P,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"**Legacy (MUI).** Not the canonical Radio — new work should use `RadioGroup` from `@/components/ui/radio-group`. Kept because code still imports this one; its stories are also its only test coverage, so they stay rather than being hidden. Single selection control for mutually exclusive options. Supports grouping, disabled states, and keyboard navigation."}}},argTypes:{tone:{control:"radio",options:["default","danger"]},disabled:{control:"boolean"},checked:{control:"boolean"}}},c={args:{label:"Radio Label"}},u={args:{label:"Checked Radio",checked:!0}},m={args:{label:"Disabled Radio",disabled:!0}},b={args:{label:"Disabled & Checked",disabled:!0,checked:!0}},g={args:{label:"Delete Permanently",tone:"danger",checked:!0}},h={args:{checked:!1,"aria-label":"Select option"}},v={render:a=>e.jsx(o,{...a}),args:{label:"Plan Selection",options:[{value:"free",label:"Free Plan"},{value:"pro",label:"Pro Plan"},{value:"enterprise",label:"Enterprise Plan"}],value:"pro",helperText:"Choose your subscription plan"}},y={render:a=>e.jsx(o,{...a}),args:{label:"Size",options:[{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"}],value:"medium",row:!0}},S={render:a=>e.jsx(o,{...a}),args:{label:"Shipping Method",options:[{value:"standard",label:"Standard (5-7 days)"},{value:"express",label:"Express (2-3 days)"},{value:"overnight",label:"Overnight"}],error:!0,helperText:"Please select a shipping method"}},f={render:a=>e.jsx(o,{...a}),args:{label:"Payment Method",options:[{value:"card",label:"Credit Card"},{value:"paypal",label:"PayPal"},{value:"crypto",label:"Cryptocurrency",disabled:!0}],value:"card",helperText:"Some payment methods may be unavailable"}},x={render:()=>{const[a,n]=R.useState("pro"),[t,l]=R.useState("monthly"),[s,p]=R.useState("standard");return e.jsxs(w,{spacing:3,sx:{width:400},children:[e.jsx(o,{label:"Plan Selection",options:[{value:"free",label:"Free - $0/month"},{value:"pro",label:"Pro - $29/month"},{value:"enterprise",label:"Enterprise - Custom pricing"}],value:a,onChange:n,helperText:"Choose your subscription tier"}),e.jsx(o,{label:"Billing Cycle",options:[{value:"monthly",label:"Monthly"},{value:"yearly",label:"Yearly (Save 20%)"}],value:t,onChange:l,row:!0}),e.jsx(o,{label:"Support Level",options:[{value:"standard",label:"Standard Support (Email)"},{value:"priority",label:"Priority Support (24/7)"}],value:s,onChange:p})]})}},se=["Default","Checked","Disabled","DisabledChecked","DangerTone","WithoutLabel","RadioGroup","RadioGroupRow","RadioGroupError","RadioGroupWithDisabled","FormExample"];c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Radio Label'
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checked Radio',
    checked: true
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Radio',
    disabled: true
  }
}`,...m.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled & Checked',
    disabled: true,
    checked: true
  }
}`,...b.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Delete Permanently',
    tone: 'danger',
    checked: true
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    // No *visible* label, but the control still needs an accessible name.
    'aria-label': 'Select option'
  }
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};export{u as Checked,g as DangerTone,c as Default,m as Disabled,b as DisabledChecked,x as FormExample,v as RadioGroup,S as RadioGroupError,y as RadioGroupRow,f as RadioGroupWithDisabled,h as WithoutLabel,se as __namedExportsOrder,te as default};
