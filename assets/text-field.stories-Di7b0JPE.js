import{a5 as b,Z as e}from"./iframe-CPBTUrEW.js";import{c as V}from"./utils-CURkPv3a.js";import{n as E}from"./prop-compat-ClktB6p5.js";import{I as j}from"./input-BSCHIFmj.js";import{L as T}from"./label-qHY30eUg.js";import{T as N}from"./textarea-UDTKAvx4.js";import"./preload-helper-PPVm8Dsz.js";import"./control-size-rvCN7ZpI.js";import"./index-DbquDQCT.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";const y=b.forwardRef(({type:a="text",tone:r="default",size:f="md",fullWidth:h=!1,error:F=!1,label:w,helperText:s,rows:C,id:D,className:L,...v},S)=>{const q=b.useId(),t=D??q,g=`${t}-helper`,l=F||r==="error",I=l?"error":r,R=l?"var(--role-status-danger-fg)":r==="success"?"var(--role-status-success-fg)":r==="warning"?"var(--role-status-warning-fg)":"var(--role-text-secondary)";return e.jsxs("div",{className:V("inline-flex flex-col gap-1.5",h&&"w-full",L),children:[w&&e.jsxs(T,{htmlFor:t,children:[w,v.required&&e.jsx("span",{style:{color:"var(--role-status-danger-fg)"},children:" *"})]}),a==="textarea"?e.jsx(N,{ref:S,id:t,tone:I,rows:C,"aria-describedby":s?g:void 0,"aria-invalid":l||void 0,className:h?"w-full":void 0,...v}):e.jsx(j,{ref:S,id:t,type:a,tone:I,inputSize:E(f),"aria-describedby":s?g:void 0,"aria-invalid":l||void 0,className:h?"w-full":void 0,...v}),s&&e.jsx("span",{id:g,className:"font-sans-productive text-xs",style:{color:R},children:s})]})});y.displayName="DSTextField";y.__docgenInfo={description:"Design System TextField — shadcn/ui counterpart for the MDS TextField.\nComposes `Label` + `Input`/`Textarea` + helper text, matching the MUI\ntwin's `label`/`helperText`/`error`/`tone`/`size`/`fullWidth` API.",methods:[],displayName:"DSTextField",props:{type:{required:!1,tsType:{name:"union",raw:"React.HTMLInputTypeAttribute | 'textarea'",elements:[{name:"ReactHTMLInputTypeAttribute",raw:"React.HTMLInputTypeAttribute"},{name:"literal",value:"'textarea'"}]},description:"Renders a `<textarea>` instead of an `<input>` when set to 'textarea'.",defaultValue:{value:"'text'",computed:!1}},tone:{required:!1,tsType:{name:"union",raw:"'default' | 'error' | 'success' | 'warning'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'error'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'small' | 'medium'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},rows:{required:!1,tsType:{name:"number"},description:"Textarea-only: number of visible rows."},className:{required:!1,tsType:{name:"string"},description:""}},composes:["Omit"]};const Z={title:"Components/TextField",component:y,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# TextField\n\n`Input`, `Textarea`, and `Label` are the primary composable primitives\n(plain, unopinionated form elements). `DSTextField` (this story's default\nexport) is a convenience wrapper matching the MUI `DSTextField`'s\n`label`/`helperText`/`error`/`tone`/`size`/`fullWidth` API — including\n`type=\"textarea\"` to swap in a `Textarea` under the hood."}}},argTypes:{tone:{control:"select",options:["default","error","success","warning"]},size:{control:"select",options:["sm","md"]}}},o={args:{label:"Email address",placeholder:"you@company.com"}},n={args:{label:"Policy number",placeholder:"POL-000000",helperText:"You'll find this on your policy document"}},i={args:{label:"Email address",defaultValue:"not-an-email",error:!0,helperText:"Enter a valid email address"}},d={args:{label:"Username",defaultValue:"jane.doe",tone:"success",helperText:"Username is available"}},c={args:{label:"Full name",required:!0,placeholder:"Jane Doe"}},u={args:{label:"Account ID",defaultValue:"ACC-9284",disabled:!0}},p={args:{label:"Claim description",type:"textarea",rows:4,placeholder:"Describe what happened...",fullWidth:!0},decorators:[a=>e.jsx("div",{className:"w-[360px]",children:e.jsx(a,{})})]},m={args:{label:"Company name",fullWidth:!0},decorators:[a=>e.jsx("div",{className:"w-[400px]",children:e.jsx(a,{})})]},x={render:()=>{const[a,r]=b.useState("");return e.jsxs("div",{className:"flex w-[320px] flex-col gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-1.5",children:[e.jsx(T,{htmlFor:"raw-input",children:"Composable Input + Label"}),e.jsx(j,{id:"raw-input",value:a,onChange:f=>r(f.target.value),placeholder:"Type here"})]}),e.jsxs("div",{className:"flex flex-col gap-1.5",children:[e.jsx(T,{htmlFor:"raw-textarea",children:"Composable Textarea"}),e.jsx(N,{id:"raw-textarea",placeholder:"Longer content...",rows:3})]})]})}},$=["Default","WithHelperText","ErrorState","SuccessTone","Required","Disabled","Textarea_","FullWidth","RawPrimitives"];o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email address',
    placeholder: 'you@company.com'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Policy number',
    placeholder: 'POL-000000',
    helperText: "You'll find this on your policy document"
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email address',
    defaultValue: 'not-an-email',
    error: true,
    helperText: 'Enter a valid email address'
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    defaultValue: 'jane.doe',
    tone: 'success',
    helperText: 'Username is available'
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'Jane Doe'
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Account ID',
    defaultValue: 'ACC-9284',
    disabled: true
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Claim description',
    type: 'textarea',
    rows: 4,
    placeholder: 'Describe what happened...',
    fullWidth: true
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Company name',
    fullWidth: true
  },
  decorators: [Story => <div className="w-[400px]"><Story /></div>]
}`,...m.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('');
    return <div className="flex w-[320px] flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="raw-input">Composable Input + Label</Label>
          <Input id="raw-input" value={value} onChange={e => setValue(e.target.value)} placeholder="Type here" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="raw-textarea">Composable Textarea</Label>
          <Textarea id="raw-textarea" placeholder="Longer content..." rows={3} />
        </div>
      </div>;
  }
}`,...x.parameters?.docs?.source}}};export{o as Default,u as Disabled,i as ErrorState,m as FullWidth,x as RawPrimitives,c as Required,d as SuccessTone,p as Textarea_,n as WithHelperText,$ as __namedExportsOrder,Z as default};
