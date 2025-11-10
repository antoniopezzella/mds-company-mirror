import{j as e,r as D}from"./iframe-B7__wHsY.js";import{g as t}from"./roles-DDzdIcSm.js";import{C as F}from"./Checkbox-CBWVQCl4.js";import{F as P}from"./FormControlLabel-cucsLgUh.js";import{F as E,a as G}from"./FormLabel-DBcfuOWG.js";import{F as N}from"./FormGroup-CLZGS34F.js";import{F as M}from"./FormHelperText-Zi790KQb.js";import{S as L}from"./Stack-eFt3eo5g.js";import"./preload-helper-PPVm8Dsz.js";import"./createSvgIcon-DOVj1Oe1.js";import"./SvgIcon-BoXwKfVN.js";import"./memoTheme-DLuuOUa1.js";import"./styled-D_MMOKXd.js";import"./generateUtilityClasses-CoM_PQv9.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./useSlot-BhRWapFU.js";import"./mergeSlotProps-ylSDTTjz.js";import"./useForkRef-jYvpDqFw.js";import"./mergeSlotProps-DVKQRSnB.js";import"./useFormControl-ywqeIzOr.js";import"./useControlled-BJ55XI38.js";import"./ButtonBase-H0aG7E_M.js";import"./useTimeout-BMcW_4Fv.js";import"./useEventCallback-CFw1AcSY.js";import"./isFocusVisible-B8k4qzLc.js";import"./Typography-CuZGjVfN.js";import"./isMuiElement-BZKvC-j1.js";const d=({label:r,tone:a="default",sx:n,...l})=>{const c=a==="danger"?t("interactive.danger"):t("interactive.primary"),i=a==="danger"?t("interactive.danger.hover"):t("interactive.primary.hover"),s=t("text.primary"),u=e.jsx(F,{sx:{color:t("border.default"),"&.Mui-checked":{color:c},"&:hover":{backgroundColor:"transparent"},"&.Mui-checked:hover":{color:i},"&.Mui-disabled":{opacity:.5},...n},...l});return r?e.jsx(P,{control:u,label:r,sx:{color:s,fontFamily:"var(--typo-body-font-family)","& .MuiFormControlLabel-label":{fontSize:"var(--typo-body-font-size)",lineHeight:"var(--typo-body-line-height)"}}}):u},m=({options:r,value:a=[],onChange:n,label:l,helperText:c,error:i,row:s=!1,disabled:u=!1})=>{const w=o=>T=>{if(!n)return;const j=T.target.checked?[...a,o]:a.filter(I=>I!==o);n(j)};return e.jsxs(E,{error:i,disabled:u,children:[l&&e.jsx(G,{sx:{color:t("text.primary"),fontFamily:"var(--typo-body-font-family)",fontWeight:600,mb:1,"&.Mui-focused":{color:t("text.primary")}},children:l}),e.jsx(N,{row:s,children:r.map(o=>e.jsx(d,{label:o.label,checked:a.includes(o.value),onChange:w(o.value),disabled:u||o.disabled},o.value))}),c&&e.jsx(M,{sx:{fontFamily:"var(--typo-caption-font-family)",fontSize:"var(--typo-caption-font-size)"},children:c})]})};d.__docgenInfo={description:`Design System Checkbox component built on MUI Checkbox.
- Uses role-based colors via getRoleColor
- Supports checked, unchecked, and indeterminate states`,methods:[],displayName:"DSCheckbox",props:{tone:{defaultValue:{value:"'default'",computed:!1},required:!1}}};m.__docgenInfo={description:"",methods:[],displayName:"DSCheckboxGroup",props:{value:{defaultValue:{value:"[]",computed:!1},required:!1},row:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};const ie={title:"Components/Checkbox",component:d,parameters:{layout:"centered",docs:{description:{component:"Design System Checkbox built on MUI. Uses role-based colors with support for checked, unchecked, and indeterminate states."}}},argTypes:{tone:{control:"radio",options:["default","danger"]},disabled:{control:"boolean"},checked:{control:"boolean"},indeterminate:{control:"boolean"}}},p={args:{label:"Checkbox Label"}},h={args:{label:"Checked Checkbox",checked:!0}},b={args:{label:"Disabled Checkbox",disabled:!0}},g={args:{label:"Disabled & Checked",disabled:!0,checked:!0}},f={args:{label:"Indeterminate State",indeterminate:!0}},k={args:{label:"Delete Account",tone:"danger",checked:!0}},x={args:{checked:!1}},v={render:r=>e.jsx(m,{...r}),args:{label:"Interests",options:[{value:"tech",label:"Technology"},{value:"business",label:"Business"},{value:"health",label:"Healthcare"},{value:"education",label:"Education"}],value:["tech"],helperText:"Select all that apply"}},C={render:r=>e.jsx(m,{...r}),args:{label:"Communication Preferences",options:[{value:"email",label:"Email"},{value:"sms",label:"SMS"},{value:"phone",label:"Phone"}],value:["email","sms"],row:!0}},S={render:r=>e.jsx(m,{...r}),args:{label:"Terms & Conditions",options:[{value:"terms",label:"I agree to the Terms of Service"},{value:"privacy",label:"I agree to the Privacy Policy"}],error:!0,helperText:"You must accept all terms to continue"}},y={render:()=>{const[r,a]=D.useState(["email"]),[n,l]=D.useState(!1),[c,i]=D.useState(!0);return e.jsxs(L,{spacing:3,sx:{width:400},children:[e.jsx(m,{label:"Notification Preferences",options:[{value:"email",label:"Email Notifications"},{value:"sms",label:"SMS Notifications"},{value:"push",label:"Push Notifications"}],value:r,onChange:a,helperText:"Select how you want to receive updates"}),e.jsx(d,{label:"I agree to the Terms and Conditions",checked:n,onChange:s=>l(s.target.checked)}),e.jsx(d,{label:"Subscribe to newsletter",checked:c,onChange:s=>i(s.target.checked)})]})}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checkbox Label'
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checked Checkbox',
    checked: true
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Checkbox',
    disabled: true
  }
}`,...b.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled & Checked',
    disabled: true,
    checked: true
  }
}`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Indeterminate State',
    indeterminate: true
  }
}`,...f.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Delete Account',
    tone: 'danger',
    checked: true
  }
}`,...k.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false
  }
}`,...x.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <DSCheckboxGroup {...args} />,
  args: {
    label: 'Interests',
    options: [{
      value: 'tech',
      label: 'Technology'
    }, {
      value: 'business',
      label: 'Business'
    }, {
      value: 'health',
      label: 'Healthcare'
    }, {
      value: 'education',
      label: 'Education'
    }],
    value: ['tech'],
    helperText: 'Select all that apply'
  }
}`,...v.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <DSCheckboxGroup {...args} />,
  args: {
    label: 'Communication Preferences',
    options: [{
      value: 'email',
      label: 'Email'
    }, {
      value: 'sms',
      label: 'SMS'
    }, {
      value: 'phone',
      label: 'Phone'
    }],
    value: ['email', 'sms'],
    row: true
  }
}`,...C.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <DSCheckboxGroup {...args} />,
  args: {
    label: 'Terms & Conditions',
    options: [{
      value: 'terms',
      label: 'I agree to the Terms of Service'
    }, {
      value: 'privacy',
      label: 'I agree to the Privacy Policy'
    }],
    error: true,
    helperText: 'You must accept all terms to continue'
  }
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [preferences, setPreferences] = useState<string[]>(['email']);
    const [terms, setTerms] = useState(false);
    const [newsletter, setNewsletter] = useState(true);
    return <Stack spacing={3} sx={{
      width: 400
    }}>
        <DSCheckboxGroup label="Notification Preferences" options={[{
        value: 'email',
        label: 'Email Notifications'
      }, {
        value: 'sms',
        label: 'SMS Notifications'
      }, {
        value: 'push',
        label: 'Push Notifications'
      }]} value={preferences} onChange={setPreferences} helperText="Select how you want to receive updates" />
        
        <DSCheckbox label="I agree to the Terms and Conditions" checked={terms} onChange={e => setTerms(e.target.checked)} />
        
        <DSCheckbox label="Subscribe to newsletter" checked={newsletter} onChange={e => setNewsletter(e.target.checked)} />
      </Stack>;
  }
}`,...y.parameters?.docs?.source}}};const ue=["Default","Checked","Disabled","DisabledChecked","Indeterminate","DangerTone","WithoutLabel","CheckboxGroup","CheckboxGroupRow","CheckboxGroupError","FormExample"];export{v as CheckboxGroup,S as CheckboxGroupError,C as CheckboxGroupRow,h as Checked,k as DangerTone,p as Default,b as Disabled,g as DisabledChecked,y as FormExample,f as Indeterminate,x as WithoutLabel,ue as __namedExportsOrder,ie as default};
