import{j as e,r as R}from"./iframe-B7__wHsY.js";import{g as r}from"./roles-DDzdIcSm.js";import{a as G,R as j}from"./RadioGroup-B_Kil8MB.js";import{F}from"./FormControlLabel-cucsLgUh.js";import{F as E,a as M}from"./FormLabel-DBcfuOWG.js";import{F as L}from"./FormHelperText-Zi790KQb.js";import{S as T}from"./Stack-eFt3eo5g.js";import"./preload-helper-PPVm8Dsz.js";import"./createSvgIcon-DOVj1Oe1.js";import"./SvgIcon-BoXwKfVN.js";import"./memoTheme-DLuuOUa1.js";import"./styled-D_MMOKXd.js";import"./generateUtilityClasses-CoM_PQv9.js";import"./useFormControl-ywqeIzOr.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./useSlot-BhRWapFU.js";import"./mergeSlotProps-ylSDTTjz.js";import"./useForkRef-jYvpDqFw.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useControlled-BJ55XI38.js";import"./FormGroup-CLZGS34F.js";import"./ButtonBase-H0aG7E_M.js";import"./useTimeout-BMcW_4Fv.js";import"./useEventCallback-CFw1AcSY.js";import"./isFocusVisible-B8k4qzLc.js";import"./Typography-CuZGjVfN.js";import"./isMuiElement-BZKvC-j1.js";const D=({label:a,tone:l="default",sx:t,...n})=>{const s=l==="danger"?r("interactive.danger"):r("interactive.primary"),p=l==="danger"?r("interactive.danger.hover"):r("interactive.primary.hover"),C=r("text.primary"),d=e.jsx(G,{sx:{color:r("border.default"),"&.Mui-checked":{color:s},"&:hover":{backgroundColor:"transparent"},"&.Mui-checked:hover":{color:p},"&.Mui-disabled":{opacity:.5},...t},...n});return a?e.jsx(F,{control:d,label:a,sx:{color:C,fontFamily:"var(--typo-body-font-family)","& .MuiFormControlLabel-label":{fontSize:"var(--typo-body-font-size)",lineHeight:"var(--typo-body-line-height)"}}}):d},o=({options:a,value:l,onChange:t,label:n,helperText:s,error:p,row:C=!1,disabled:d=!1,name:P})=>{const k=i=>{t&&t(i.target.value)};return e.jsxs(E,{error:p,disabled:d,children:[n&&e.jsx(M,{sx:{color:r("text.primary"),fontFamily:"var(--typo-body-font-family)",fontWeight:600,mb:1,"&.Mui-focused":{color:r("text.primary")}},children:n}),e.jsx(j,{row:C,value:l,onChange:k,name:P,children:a.map(i=>e.jsx(D,{value:i.value,label:i.label,disabled:d||i.disabled},i.value))}),s&&e.jsx(L,{sx:{fontFamily:"var(--typo-caption-font-family)",fontSize:"var(--typo-caption-font-size)"},children:s})]})};D.__docgenInfo={description:`Design System Radio component built on MUI Radio.
- Uses role-based colors via getRoleColor
- Supports checked and unchecked states`,methods:[],displayName:"DSRadio",props:{tone:{defaultValue:{value:"'default'",computed:!1},required:!1}}};o.__docgenInfo={description:"",methods:[],displayName:"DSRadioGroup",props:{row:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};const se={title:"Components/Radio",component:D,parameters:{layout:"centered",docs:{description:{component:"Design System Radio button built on MUI. Uses role-based colors for single-choice selection."}}},argTypes:{tone:{control:"radio",options:["default","danger"]},disabled:{control:"boolean"},checked:{control:"boolean"}}},u={args:{label:"Radio Label"}},c={args:{label:"Checked Radio",checked:!0}},m={args:{label:"Disabled Radio",disabled:!0}},b={args:{label:"Disabled & Checked",disabled:!0,checked:!0}},g={args:{label:"Delete Permanently",tone:"danger",checked:!0}},h={args:{checked:!1}},v={render:a=>e.jsx(o,{...a}),args:{label:"Plan Selection",options:[{value:"free",label:"Free Plan"},{value:"pro",label:"Pro Plan"},{value:"enterprise",label:"Enterprise Plan"}],value:"pro",helperText:"Choose your subscription plan"}},y={render:a=>e.jsx(o,{...a}),args:{label:"Size",options:[{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"}],value:"medium",row:!0}},S={render:a=>e.jsx(o,{...a}),args:{label:"Shipping Method",options:[{value:"standard",label:"Standard (5-7 days)"},{value:"express",label:"Express (2-3 days)"},{value:"overnight",label:"Overnight"}],error:!0,helperText:"Please select a shipping method"}},f={render:a=>e.jsx(o,{...a}),args:{label:"Payment Method",options:[{value:"card",label:"Credit Card"},{value:"paypal",label:"PayPal"},{value:"crypto",label:"Cryptocurrency",disabled:!0}],value:"card",helperText:"Some payment methods may be unavailable"}},x={render:()=>{const[a,l]=R.useState("pro"),[t,n]=R.useState("monthly"),[s,p]=R.useState("standard");return e.jsxs(T,{spacing:3,sx:{width:400},children:[e.jsx(o,{label:"Plan Selection",options:[{value:"free",label:"Free - $0/month"},{value:"pro",label:"Pro - $29/month"},{value:"enterprise",label:"Enterprise - Custom pricing"}],value:a,onChange:l,helperText:"Choose your subscription tier"}),e.jsx(o,{label:"Billing Cycle",options:[{value:"monthly",label:"Monthly"},{value:"yearly",label:"Yearly (Save 20%)"}],value:t,onChange:n,row:!0}),e.jsx(o,{label:"Support Level",options:[{value:"standard",label:"Standard Support (Email)"},{value:"priority",label:"Priority Support (24/7)"}],value:s,onChange:p})]})}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Radio Label'
  }
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checked Radio',
    checked: true
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
    checked: false
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
}`,...x.parameters?.docs?.source}}};const ie=["Default","Checked","Disabled","DisabledChecked","DangerTone","WithoutLabel","RadioGroup","RadioGroupRow","RadioGroupError","RadioGroupWithDisabled","FormExample"];export{c as Checked,g as DangerTone,u as Default,m as Disabled,b as DisabledChecked,x as FormExample,v as RadioGroup,S as RadioGroupError,y as RadioGroupRow,f as RadioGroupWithDisabled,h as WithoutLabel,ie as __namedExportsOrder,se as default};
