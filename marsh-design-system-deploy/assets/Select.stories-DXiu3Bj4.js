import{j as r,r as D}from"./iframe-B7__wHsY.js";import{g as e}from"./roles-DDzdIcSm.js";import{F as A}from"./FormLabel-DBcfuOWG.js";import{I as B,S as K}from"./Select-B3zGEVwW.js";import{M as L}from"./MenuItem-Bc7ktFn4.js";import{F as Y}from"./FormHelperText-Zi790KQb.js";import{S as G}from"./Stack-eFt3eo5g.js";import"./preload-helper-PPVm8Dsz.js";import"./useFormControl-ywqeIzOr.js";import"./generateUtilityClasses-CoM_PQv9.js";import"./isMuiElement-BZKvC-j1.js";import"./styled-D_MMOKXd.js";import"./memoTheme-DLuuOUa1.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./useSlot-BhRWapFU.js";import"./mergeSlotProps-ylSDTTjz.js";import"./useForkRef-jYvpDqFw.js";import"./useSlotProps-g2YZln53.js";import"./Paper-CIHAuA3e.js";import"./useTheme-CSj_Q00S.js";import"./ownerDocument-DW-IO8s5.js";import"./ownerWindow-HkKU3E4x.js";import"./debounce-Be36O1Ab.js";import"./Grow-CjO2AY3x.js";import"./utils-C_qPr39N.js";import"./useTimeout-BMcW_4Fv.js";import"./index-CYaVcYGU.js";import"./index-DcJJ25tP.js";import"./getReactElementRef-BSyJ60__.js";import"./mergeSlotProps-DVKQRSnB.js";import"./Modal-40zeYunu.js";import"./useEventCallback-CFw1AcSY.js";import"./createChainedFunction-BO_9K8Jh.js";import"./Portal-DHVtkd39.js";import"./Backdrop-DuUbLev3.js";import"./List-nQP6RQ_4.js";import"./useControlled-BJ55XI38.js";import"./createSvgIcon-DOVj1Oe1.js";import"./SvgIcon-BoXwKfVN.js";import"./ButtonBase-H0aG7E_M.js";import"./isFocusVisible-B8k4qzLc.js";import"./listItemIconClasses-B8O87iOu.js";import"./listItemTextClasses-Bvxa1hv0.js";import"./dividerClasses-DWExi19l.js";const c=({variant:i="outlined",options:W=[],label:n,helperText:d,error:w,tone:u="default",size:o="medium",fullWidth:U=!1,sx:H,...R})=>{const a=w||u==="error",F=u==="success",j=u==="warning",q=e("focus.ring"),s=e("status.danger.fg"),k=e("status.success.fg"),I=e("status.warning.fg"),O=e("border.default"),E=e("text.primary"),z=e("text.secondary"),_={color:E,fontFamily:"var(--typo-body-font-family)",fontSize:"var(--typo-body-font-size)",lineHeight:"var(--typo-body-line-height)","& .MuiOutlinedInput-notchedOutline":{borderColor:a?s:F?k:j?I:O,borderWidth:"1px"},"&:hover .MuiOutlinedInput-notchedOutline":{borderColor:a?s:F?k:j?I:e("border.strong")},"&.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:a?s:q,borderWidth:"2px"},"&.Mui-disabled .MuiOutlinedInput-notchedOutline":{borderColor:O,opacity:.5},...H};return r.jsxs(A,{variant:i,error:a,fullWidth:U,size:o,children:[n&&r.jsx(B,{sx:{color:z,fontFamily:"var(--typo-body-font-family)","&.Mui-focused":{color:a?s:q},"&.Mui-error":{color:s}},children:n}),r.jsx(K,{label:n,sx:_,...R,children:W.map(p=>r.jsx(L,{value:p.value,disabled:p.disabled,sx:{color:E,fontFamily:"var(--typo-body-font-family)","&:hover":{backgroundColor:e("surface.subtle")},"&.Mui-selected":{backgroundColor:e("surface.accent"),"&:hover":{backgroundColor:e("surface.accent"),opacity:.9}}},children:p.label},p.value))}),d&&r.jsx(Y,{sx:{fontFamily:"var(--typo-caption-font-family)",fontSize:"var(--typo-caption-font-size)",color:a?s:z},children:d})]})};c.__docgenInfo={description:`Design System Select component built on MUI Select.
- Uses role-based colors via getRoleColor
- Supports single and multiple selection
- Includes error states and helper text`,methods:[],displayName:"DSSelect",props:{variant:{defaultValue:{value:"'outlined'",computed:!1},required:!1},options:{defaultValue:{value:"[]",computed:!1},required:!1},tone:{defaultValue:{value:"'default'",computed:!1},required:!1},size:{defaultValue:{value:"'medium'",computed:!1},required:!1},fullWidth:{defaultValue:{value:"false",computed:!1},required:!1}}};const t=[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"},{value:"au",label:"Australia"},{value:"de",label:"Germany"},{value:"fr",label:"France"}],l=[{value:"low",label:"Low"},{value:"medium",label:"Medium"},{value:"high",label:"High"},{value:"critical",label:"Critical"}],Ue={title:"Components/Select",component:c,parameters:{layout:"centered",docs:{description:{component:"Design System Select built on MUI. Supports single and multiple selection with role-based colors."}}},argTypes:{variant:{control:"radio",options:["outlined","filled","standard"]},tone:{control:"radio",options:["default","error","success","warning"]},size:{control:"radio",options:["small","medium"]},disabled:{control:"boolean"},fullWidth:{control:"boolean"},multiple:{control:"boolean"}},args:{variant:"outlined",tone:"default",size:"medium",fullWidth:!1,disabled:!1,options:t}},m={args:{label:"Country",options:t,defaultValue:"us"}},g={args:{label:"Priority",options:l,helperText:"Select the priority level",defaultValue:"medium"}},b={args:{label:"Country",options:t,required:!0,helperText:"This field is required"}},f={args:{label:"Country",options:t,tone:"error",helperText:"Please select a country"}},h={args:{label:"Priority",options:l,value:"high",tone:"success",helperText:"Priority level confirmed"}},y={args:{label:"Priority",options:l,value:"critical",tone:"warning",helperText:"Critical priority selected"}},v={args:{label:"Disabled Select",options:t,value:"us",disabled:!0}},S={args:{label:"Countries",options:t,multiple:!0,defaultValue:["us","uk"],helperText:"You can select multiple countries"}},x={args:{label:"Priority",options:l,size:"small",defaultValue:"low"}},C={args:{label:"Country",options:t,fullWidth:!0,defaultValue:"us"},decorators:[i=>r.jsx("div",{style:{width:"400px"},children:r.jsx(i,{})})]},T={args:{label:"Country",options:t,variant:"filled",defaultValue:"ca"}},V={args:{label:"Priority",options:l,variant:"standard",defaultValue:"medium"}},P={args:{label:"Country",options:[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom",disabled:!0},{value:"ca",label:"Canada"},{value:"au",label:"Australia",disabled:!0}],helperText:"Some options are disabled"}},M={render:()=>{const[i,W]=D.useState("us"),[n,d]=D.useState("medium"),[w,u]=D.useState(["tech"]);return r.jsxs(G,{spacing:3,sx:{width:400},children:[r.jsx(c,{label:"Country",options:t,value:i,onChange:o=>W(o.target.value),required:!0,helperText:"Select your country"}),r.jsx(c,{label:"Priority",options:l,value:n,onChange:o=>d(o.target.value),helperText:"Choose priority level"}),r.jsx(c,{label:"Categories",options:[{value:"tech",label:"Technology"},{value:"business",label:"Business"},{value:"health",label:"Healthcare"},{value:"education",label:"Education"}],value:w,onChange:o=>u(o.target.value),multiple:!0,helperText:"Select one or more categories"})]})}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Country',
    options: countries,
    defaultValue: 'us'
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Priority',
    options: priorities,
    helperText: 'Select the priority level',
    defaultValue: 'medium'
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Country',
    options: countries,
    required: true,
    helperText: 'This field is required'
  }
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Country',
    options: countries,
    tone: 'error',
    helperText: 'Please select a country'
  }
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Priority',
    options: priorities,
    value: 'high',
    tone: 'success',
    helperText: 'Priority level confirmed'
  }
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Priority',
    options: priorities,
    value: 'critical',
    tone: 'warning',
    helperText: 'Critical priority selected'
  }
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Select',
    options: countries,
    value: 'us',
    disabled: true
  }
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Countries',
    options: countries,
    multiple: true,
    defaultValue: ['us', 'uk'],
    helperText: 'You can select multiple countries'
  }
}`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Priority',
    options: priorities,
    size: 'small',
    defaultValue: 'low'
  }
}`,...x.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Country',
    options: countries,
    fullWidth: true,
    defaultValue: 'us'
  },
  decorators: [Story => <div style={{
    width: '400px'
  }}>
        <Story />
      </div>]
}`,...C.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Country',
    options: countries,
    variant: 'filled',
    defaultValue: 'ca'
  }
}`,...T.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Priority',
    options: priorities,
    variant: 'standard',
    defaultValue: 'medium'
  }
}`,...V.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Country',
    options: [{
      value: 'us',
      label: 'United States'
    }, {
      value: 'uk',
      label: 'United Kingdom',
      disabled: true
    }, {
      value: 'ca',
      label: 'Canada'
    }, {
      value: 'au',
      label: 'Australia',
      disabled: true
    }],
    helperText: 'Some options are disabled'
  }
}`,...P.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [country, setCountry] = useState('us');
    const [priority, setPriority] = useState('medium');
    const [categories, setCategories] = useState<string[]>(['tech']);
    return <Stack spacing={3} sx={{
      width: 400
    }}>
        <DSSelect label="Country" options={countries} value={country} onChange={e => setCountry(e.target.value as string)} required helperText="Select your country" />
        <DSSelect label="Priority" options={priorities} value={priority} onChange={e => setPriority(e.target.value as string)} helperText="Choose priority level" />
        <DSSelect label="Categories" options={[{
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
      }]} value={categories} onChange={e => setCategories(e.target.value as string[])} multiple helperText="Select one or more categories" />
      </Stack>;
  }
}`,...M.parameters?.docs?.source}}};const He=["Default","WithHelperText","Required","Error","Success","Warning","Disabled","Multiple","Small","FullWidth","FilledVariant","StandardVariant","WithDisabledOptions","FormExample"];export{m as Default,v as Disabled,f as Error,T as FilledVariant,M as FormExample,C as FullWidth,S as Multiple,b as Required,x as Small,V as StandardVariant,h as Success,y as Warning,P as WithDisabledOptions,g as WithHelperText,He as __namedExportsOrder,Ue as default};
