import{N as r,Z as e}from"./iframe-CPBTUrEW.js";import{u as k}from"./useTheme-Cup9dysz.js";import{T as U}from"./TextField-sP1vWyv9.js";import{c as P}from"./createSvgIcon-sccWia23.js";import{S as H}from"./Stack-DNM9s3rh.js";import{I}from"./InputAdornment-D79CQNAX.js";import"./preload-helper-PPVm8Dsz.js";import"./styled-CijOp1BY.js";import"./useSlot-BywkIHtH.js";import"./mergeSlotProps-Cno6lv60.js";import"./useForkRef-DKrbSgSS.js";import"./Select-Ci-SLhRT.js";import"./useFormControl-CYcVT8Qz.js";import"./memoTheme-BVzAl7br.js";import"./FormLabel-DBirrJdj.js";import"./isMuiElement-B1lq7zGm.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./useSlotProps-Dqfsq73M.js";import"./SelectFocusSourceContext-C9cIte2m.js";import"./ownerDocument-DW-IO8s5.js";import"./ownerWindow-HkKU3E4x.js";import"./debounce-Be36O1Ab.js";import"./Grow-CYCTsW1o.js";import"./utils-cV9QVv0b.js";import"./useTimeout-BkF-taVW.js";import"./getReactElementRef-Bahq-dSU.js";import"./mergeSlotProps-h2jc-ntv.js";import"./Modal-CFll0AVi.js";import"./useEventCallback-BK5EjOzt.js";import"./createChainedFunction-BO_9K8Jh.js";import"./Portal-C30Ho08a.js";import"./getActiveElement-BQgAPKnO.js";import"./contains-DSD8CO72.js";import"./Backdrop-BFnKBFoB.js";import"./Paper-Bmrvw56W.js";import"./List-CWUGv3Sz.js";import"./ListContext-BlcOG6Ec.js";import"./useControlled-DxV8kwvS.js";import"./FormHelperText-D-o75MZp.js";import"./SvgIcon-B0F0eofH.js";import"./getThemeProps-D9sgPYYa.js";import"./useThemeProps-Cv2CqOcg.js";import"./Typography-B8Azb_EI.js";const a=({variant:w="outlined",tone:T="default",size:j="medium",fullWidth:z=!1,error:C,sx:D,helperText:W,label:q,...N})=>{const E=k().palette.mode,A=C||T==="error",F=T==="success",M=T==="warning",t=A?r("status.danger.fg"):F?r("status.success.fg"):M?r("status.warning.fg"):null,V={"& .MuiOutlinedInput-root":{color:r("text.primary"),fontFamily:"var(--typo-body1-font-family)",fontSize:"var(--typo-body1-font-size)",lineHeight:"var(--typo-body1-line-height)","& fieldset":{borderColor:t||r("border.default"),borderWidth:"1px"},"&:hover fieldset":{borderColor:t||r("border.strong")},"&.Mui-focused fieldset":{borderColor:t||r("focus.ring",{mode:E}),borderWidth:"2px"},"&.Mui-disabled fieldset":{borderColor:r("border.default"),opacity:.5}},"& .MuiInputLabel-root":{color:r("text.secondary"),fontFamily:"var(--typo-body1-font-family)",fontSize:"var(--typo-body1-font-size)","&.Mui-focused":{color:t||r("focus.ring",{mode:E})},"&.Mui-error, &.Mui-focused.Mui-error":{color:r("status.danger.fg")},...F&&{color:`${r("status.success.fg")} !important`},...M&&{color:`${r("status.warning.fg")} !important`}},"& .MuiFormHelperText-root":{fontFamily:"var(--typo-caption-font-family)",fontSize:"var(--typo-caption-font-size)",lineHeight:"var(--typo-caption-line-height)",margin:L=>L.spacing(1,0,0,0),"&.Mui-error":{color:r("status.danger.fg")},...F&&{color:r("status.success.fg")},...M&&{color:r("text.onLight")}},"& .MuiInputBase-input::placeholder":{color:r("text.secondary"),opacity:.7},...D};return e.jsx(U,{variant:w,size:j,fullWidth:z,error:A,label:q,helperText:W,sx:V,...N})};a.__docgenInfo={description:`Design System TextField component built on MUI TextField.
- Uses role-based colors via getRoleColor
- Supports all standard input types (text, password, email, number, etc.)
- Includes error states, helper text, and labels`,methods:[],displayName:"DSTextField",props:{variant:{required:!1,tsType:{name:"union",raw:"'outlined' | 'filled' | 'standard'",elements:[{name:"literal",value:"'outlined'"},{name:"literal",value:"'filled'"},{name:"literal",value:"'standard'"}]},description:"Visual variant of the text field",defaultValue:{value:"'outlined'",computed:!1}},tone:{required:!1,tsType:{name:"union",raw:"'default' | 'error' | 'success' | 'warning'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'error'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"}]},description:"Semantic tone for validation states",defaultValue:{value:"'default'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}]},description:"Size of the text field",defaultValue:{value:"'medium'",computed:!1}},fullWidth:{required:!1,tsType:{name:"boolean"},description:"Full width",defaultValue:{value:"false",computed:!1}}},composes:["Omit"]};const R=P(e.jsx("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"})),_=P(e.jsx("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"})),B=P(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20"})),qe={title:"Legacy (MUI)/TextField",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
> **Legacy (MUI).** Not the canonical TextField — new work should use \`TextField\` from
> \`@/components/ui/text-field\`. Kept because code still imports this one, and its stories are
> also its only test coverage, so they stay visible rather than hidden.

# TextField

Standard text input component for gathering user information.

## Features
- ✅ **Validation States**: Default, Error, Success, and Warning tones.
- ✅ **Adornments**: Support for leading and trailing icons via MUI \`InputProps\`.
- ✅ **Typography**: Automatically syncs with Design System typography variables.
- ✅ **Tokens**: Strictly uses role-based colors for focused, hovered, and disabled states.
        `}}},argTypes:{variant:{control:"radio",options:["outlined","filled","standard"]},tone:{control:"radio",options:["default","error","success","warning"]},size:{control:"radio",options:["small","medium"]},type:{control:"select",options:["text","password","email","number","tel","url"]},disabled:{control:"boolean"},fullWidth:{control:"boolean"},required:{control:"boolean"},multiline:{control:"boolean"}},args:{label:"Label",variant:"outlined",tone:"default",size:"medium",fullWidth:!1,disabled:!1}},o={args:{label:"First Name",placeholder:"Enter your first name"}},s={args:{label:"Email",placeholder:"you@example.com",helperText:"We will never share your email",type:"email"}},l={args:{label:"Username",required:!0,helperText:"This field is required"}},n={args:{label:"Email",value:"invalid-email",tone:"error",helperText:"Please enter a valid email address",type:"email"}},i={args:{label:"Password",value:"SecureP@ssw0rd!",tone:"success",helperText:"Strong password",type:"password"}},d={args:{label:"Password",value:"weak",tone:"warning",helperText:"Password is too weak",type:"password"}},c={args:{label:"Disabled Field",value:"Cannot edit this",disabled:!0}},p={args:{label:"Search",placeholder:"Search for assets...",slotProps:{input:{startAdornment:e.jsx(I,{position:"start",children:e.jsx(R,{fontSize:"small"})})}}}},m={args:{label:"Email Address",type:"email",placeholder:"name@marsh.com",slotProps:{input:{startAdornment:e.jsx(I,{position:"start",children:e.jsx(B,{fontSize:"small"})})}}}},u={args:{label:"Password",type:"password",value:"********",slotProps:{input:{endAdornment:e.jsx(I,{position:"end",children:e.jsx(_,{fontSize:"small",sx:{cursor:"pointer"}})})}}}},h={decorators:[w=>e.jsx("div",{style:{width:"500px"},children:e.jsx(w,{})})],args:{label:"Company Name",fullWidth:!0,placeholder:"Enter your company name"}},g={args:{label:"Password",type:"password",placeholder:"Enter your password",helperText:"Minimum 8 characters"}},f={args:{label:"Age",type:"number",placeholder:"0",helperText:"Enter your age"}},b={args:{label:"Description",multiline:!0,rows:4,placeholder:"Enter a detailed description...",helperText:"Maximum 500 characters"}},y={args:{label:"Small Size",size:"small",placeholder:"Compact field"}},x={args:{label:"Filled Input",variant:"filled",placeholder:"Filled variant"}},S={args:{label:"Standard Input",variant:"standard",placeholder:"Standard variant"}},v={render:()=>e.jsxs(H,{spacing:3,sx:{width:400},children:[e.jsx(a,{label:"First Name",required:!0,placeholder:"John"}),e.jsx(a,{label:"Last Name",required:!0,placeholder:"Doe"}),e.jsx(a,{label:"Email",type:"email",required:!0,placeholder:"john.doe@example.com",helperText:"We'll never share your email"}),e.jsx(a,{label:"Password",type:"password",required:!0,helperText:"Minimum 8 characters"}),e.jsx(a,{label:"Phone Number",type:"tel",placeholder:"+1 (555) 123-4567"}),e.jsx(a,{label:"Bio",multiline:!0,rows:4,placeholder:"Tell us about yourself...",helperText:"Maximum 500 characters"})]})},Ne=["Default","WithHelperText","Required","Error","Success","Warning","Disabled","WithAdornments","LoginField","PasswordField","FullWidth","Password","Number","Multiline","Small","FilledVariant","StandardVariant","FormExample"];o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'First Name',
    placeholder: 'Enter your first name'
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email',
    type: 'email'
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    required: true,
    helperText: 'This field is required'
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    value: 'invalid-email',
    tone: 'error',
    helperText: 'Please enter a valid email address',
    type: 'email'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    value: 'SecureP@ssw0rd!',
    tone: 'success',
    helperText: 'Strong password',
    type: 'password'
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    value: 'weak',
    tone: 'warning',
    helperText: 'Password is too weak',
    type: 'password'
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit this',
    disabled: true
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Search',
    placeholder: 'Search for assets...',
    slotProps: {
      input: {
        startAdornment: <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
      }
    }
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'name@marsh.com',
    slotProps: {
      input: {
        startAdornment: <InputAdornment position="start">
            <AccountCircle fontSize="small" />
          </InputAdornment>
      }
    }
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    value: '********',
    slotProps: {
      input: {
        endAdornment: <InputAdornment position="end">
            <VisibilityIcon fontSize="small" sx={{
            cursor: 'pointer'
          }} />
          </InputAdornment>
      }
    }
  }
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '500px'
  }}>
        <Story />
      </div>],
  args: {
    label: 'Company Name',
    fullWidth: true,
    placeholder: 'Enter your company name'
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Minimum 8 characters'
  }
}`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '0',
    helperText: 'Enter your age'
  }
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Description',
    multiline: true,
    rows: 4,
    placeholder: 'Enter a detailed description...',
    helperText: 'Maximum 500 characters'
  }
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Small Size',
    size: 'small',
    placeholder: 'Compact field'
  }
}`,...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Filled Input',
    variant: 'filled',
    placeholder: 'Filled variant'
  }
}`,...x.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Standard Input',
    variant: 'standard',
    placeholder: 'Standard variant'
  }
}`,...S.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};export{o as Default,c as Disabled,n as Error,x as FilledVariant,v as FormExample,h as FullWidth,m as LoginField,b as Multiline,f as Number,g as Password,u as PasswordField,l as Required,y as Small,S as StandardVariant,i as Success,d as Warning,p as WithAdornments,s as WithHelperText,Ne as __namedExportsOrder,qe as default};
