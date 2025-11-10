import{j as e}from"./iframe-B7__wHsY.js";import{g as r}from"./roles-DDzdIcSm.js";import{T as V}from"./TextField-Di5_dRe-.js";import{S as k}from"./Stack-eFt3eo5g.js";import"./preload-helper-PPVm8Dsz.js";import"./generateUtilityClasses-CoM_PQv9.js";import"./useSlot-BhRWapFU.js";import"./mergeSlotProps-ylSDTTjz.js";import"./useForkRef-jYvpDqFw.js";import"./styled-D_MMOKXd.js";import"./Select-B3zGEVwW.js";import"./useFormControl-ywqeIzOr.js";import"./memoTheme-DLuuOUa1.js";import"./FormLabel-DBcfuOWG.js";import"./isMuiElement-BZKvC-j1.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./useSlotProps-g2YZln53.js";import"./Paper-CIHAuA3e.js";import"./useTheme-CSj_Q00S.js";import"./ownerDocument-DW-IO8s5.js";import"./ownerWindow-HkKU3E4x.js";import"./debounce-Be36O1Ab.js";import"./Grow-CjO2AY3x.js";import"./utils-C_qPr39N.js";import"./useTimeout-BMcW_4Fv.js";import"./index-CYaVcYGU.js";import"./index-DcJJ25tP.js";import"./getReactElementRef-BSyJ60__.js";import"./mergeSlotProps-DVKQRSnB.js";import"./Modal-40zeYunu.js";import"./useEventCallback-CFw1AcSY.js";import"./createChainedFunction-BO_9K8Jh.js";import"./Portal-DHVtkd39.js";import"./Backdrop-DuUbLev3.js";import"./List-nQP6RQ_4.js";import"./useControlled-BJ55XI38.js";import"./createSvgIcon-DOVj1Oe1.js";import"./SvgIcon-BoXwKfVN.js";import"./FormHelperText-Zi790KQb.js";const a=({variant:S="outlined",tone:w="default",size:q="medium",fullWidth:P=!1,error:C,sx:j,...z})=>{const o=C||w==="error",v=w==="success",T=w==="warning",F=r("focus.ring"),l=r("status.danger.fg"),E=r("status.success.fg"),M=r("status.warning.fg"),D=r("border.default"),I=r("text.primary"),W=r("text.secondary"),N={"& .MuiOutlinedInput-root":{color:I,fontFamily:"var(--typo-body-font-family)",fontSize:"var(--typo-body-font-size)",lineHeight:"var(--typo-body-line-height)","& fieldset":{borderColor:o?l:v?E:T?M:D,borderWidth:"1px"},"&:hover fieldset":{borderColor:o?l:v?E:T?M:r("border.strong")},"&.Mui-focused fieldset":{borderColor:o?l:F,borderWidth:"2px"},"&.Mui-disabled fieldset":{borderColor:D,opacity:.5}},"& .MuiInputLabel-root":{color:W,fontFamily:"var(--typo-body-font-family)",fontSize:"var(--typo-body-font-size)","&.Mui-focused":{color:o?l:F},"&.Mui-error":{color:l}},"& .MuiFormHelperText-root":{fontFamily:"var(--typo-caption-font-family)",fontSize:"var(--typo-caption-font-size)",lineHeight:"var(--typo-caption-line-height)","&.Mui-error":{color:l}},"& .MuiInputBase-input::placeholder":{color:W,opacity:1},...j};return e.jsx(V,{variant:S,size:q,fullWidth:P,error:o,sx:N,...z})};a.__docgenInfo={description:`Design System TextField component built on MUI TextField.
- Uses role-based colors via getRoleColor
- Supports all standard input types (text, password, email, number, etc.)
- Includes error states, helper text, and labels`,methods:[],displayName:"DSTextField",props:{variant:{required:!1,tsType:{name:"union",raw:"'outlined' | 'filled' | 'standard'",elements:[{name:"literal",value:"'outlined'"},{name:"literal",value:"'filled'"},{name:"literal",value:"'standard'"}]},description:"Visual variant of the text field",defaultValue:{value:"'outlined'",computed:!1}},tone:{required:!1,tsType:{name:"union",raw:"'default' | 'error' | 'success' | 'warning'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'error'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"}]},description:"Semantic tone for validation states",defaultValue:{value:"'default'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}]},description:"Size of the text field",defaultValue:{value:"'medium'",computed:!1}},fullWidth:{required:!1,tsType:{name:"boolean"},description:"Full width",defaultValue:{value:"false",computed:!1}}},composes:["Omit"]};const Te={title:"Components/TextField",component:a,parameters:{layout:"centered",docs:{description:{component:"Design System TextField built on MUI. Supports all standard input types with role-based colors and validation states."}}},argTypes:{variant:{control:"radio",options:["outlined","filled","standard"]},tone:{control:"radio",options:["default","error","success","warning"]},size:{control:"radio",options:["small","medium"]},type:{control:"select",options:["text","password","email","number","tel","url"]},disabled:{control:"boolean"},fullWidth:{control:"boolean"},required:{control:"boolean"},multiline:{control:"boolean"}},args:{label:"Label",variant:"outlined",tone:"default",size:"medium",fullWidth:!1,disabled:!1}},t={args:{label:"First Name",placeholder:"Enter your first name"}},s={args:{label:"Email",placeholder:"you@example.com",helperText:"We will never share your email",type:"email"}},i={args:{label:"Username",required:!0,helperText:"This field is required"}},n={args:{label:"Email",value:"invalid-email",tone:"error",helperText:"Please enter a valid email address",type:"email"}},d={args:{label:"Password",value:"SecureP@ssw0rd!",tone:"success",helperText:"Strong password",type:"password"}},p={args:{label:"Password",value:"weak",tone:"warning",helperText:"Password is too weak",type:"password"}},c={args:{label:"Disabled Field",value:"Cannot edit this",disabled:!0}},m={args:{label:"Password",type:"password",placeholder:"Enter your password",helperText:"Minimum 8 characters"}},u={args:{label:"Age",type:"number",placeholder:"0",helperText:"Enter your age"}},h={args:{label:"Description",multiline:!0,rows:4,placeholder:"Enter a detailed description...",helperText:"Maximum 500 characters"}},b={args:{label:"Full Width Field",fullWidth:!0,placeholder:"This field spans the full width"},decorators:[S=>e.jsx("div",{style:{width:"400px"},children:e.jsx(S,{})})]},f={args:{label:"Small Size",size:"small",placeholder:"Compact field"}},g={args:{label:"Filled Input",variant:"filled",placeholder:"Filled variant"}},x={args:{label:"Standard Input",variant:"standard",placeholder:"Standard variant"}},y={render:()=>e.jsxs(k,{spacing:3,sx:{width:400},children:[e.jsx(a,{label:"First Name",required:!0,placeholder:"John"}),e.jsx(a,{label:"Last Name",required:!0,placeholder:"Doe"}),e.jsx(a,{label:"Email",type:"email",required:!0,placeholder:"john.doe@example.com",helperText:"We'll never share your email"}),e.jsx(a,{label:"Password",type:"password",required:!0,helperText:"Minimum 8 characters"}),e.jsx(a,{label:"Phone Number",type:"tel",placeholder:"+1 (555) 123-4567"}),e.jsx(a,{label:"Bio",multiline:!0,rows:4,placeholder:"Tell us about yourself...",helperText:"Maximum 500 characters"})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'First Name',
    placeholder: 'Enter your first name'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email',
    type: 'email'
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    required: true,
    helperText: 'This field is required'
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    value: 'invalid-email',
    tone: 'error',
    helperText: 'Please enter a valid email address',
    type: 'email'
  }
}`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    value: 'SecureP@ssw0rd!',
    tone: 'success',
    helperText: 'Strong password',
    type: 'password'
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    value: 'weak',
    tone: 'warning',
    helperText: 'Password is too weak',
    type: 'password'
  }
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit this',
    disabled: true
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Minimum 8 characters'
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '0',
    helperText: 'Enter your age'
  }
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Description',
    multiline: true,
    rows: 4,
    placeholder: 'Enter a detailed description...',
    helperText: 'Maximum 500 characters'
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Full Width Field',
    fullWidth: true,
    placeholder: 'This field spans the full width'
  },
  decorators: [Story => <div style={{
    width: '400px'
  }}>
        <Story />
      </div>]
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Small Size',
    size: 'small',
    placeholder: 'Compact field'
  }
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Filled Input',
    variant: 'filled',
    placeholder: 'Filled variant'
  }
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Standard Input',
    variant: 'standard',
    placeholder: 'Standard variant'
  }
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Stack spacing={3} sx={{
    width: 400
  }}>
      <DSTextField label="First Name" required placeholder="John" />
      <DSTextField label="Last Name" required placeholder="Doe" />
      <DSTextField label="Email" type="email" required placeholder="john.doe@example.com" helperText="We'll never share your email" />
      <DSTextField label="Password" type="password" required helperText="Minimum 8 characters" />
      <DSTextField label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" />
      <DSTextField label="Bio" multiline rows={4} placeholder="Tell us about yourself..." helperText="Maximum 500 characters" />
    </Stack>
}`,...y.parameters?.docs?.source}}};const Fe=["Default","WithHelperText","Required","Error","Success","Warning","Disabled","Password","Number","Multiline","FullWidth","Small","FilledVariant","StandardVariant","FormExample"];export{t as Default,c as Disabled,n as Error,g as FilledVariant,y as FormExample,b as FullWidth,h as Multiline,u as Number,m as Password,i as Required,f as Small,x as StandardVariant,d as Success,p as Warning,s as WithHelperText,Fe as __namedExportsOrder,Te as default};
