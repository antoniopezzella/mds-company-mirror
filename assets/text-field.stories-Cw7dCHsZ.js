import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./utils-BGgJixJd.js";import{n as o,t as s}from"./prop-compat-DJoM835V.js";import{n as c,t as l}from"./input-Bj4eDxQ0.js";import{n as u,t as d}from"./textarea-l8XJv4h3.js";import{n as f,t as p}from"./label-BsfRA82G.js";var m,h,g;function _(){return(_=t((()=>{m=e(n(),1),i(),s(),c(),f(),u(),h=r(),g=m.forwardRef(({type:e=`text`,tone:t=`default`,size:n=`md`,fullWidth:r=!1,error:i=!1,label:s,helperText:c,rows:u,id:f,className:g,..._},v)=>{let y=m.useId(),b=f??y,x=`${b}-helper`,S=i||t===`error`,C=S?`error`:t,w=S?`var(--role-fg-critical)`:t===`success`?`var(--role-fg-success)`:t===`warning`?`var(--role-fg-warning)`:`var(--role-fg-neutral-subtle)`;return(0,h.jsxs)(`div`,{className:a(`inline-flex flex-col gap-1.5`,r&&`w-full`,g),children:[s&&(0,h.jsxs)(p,{htmlFor:b,children:[s,_.required&&(0,h.jsx)(`span`,{style:{color:`var(--role-fg-critical)`},children:` *`})]}),e===`textarea`?(0,h.jsx)(d,{ref:v,id:b,tone:C,rows:u,"aria-describedby":c?x:void 0,"aria-invalid":S||void 0,className:r?`w-full`:void 0,..._}):(0,h.jsx)(l,{ref:v,id:b,type:e,tone:C,inputSize:o(n,`TextField`),"aria-describedby":c?x:void 0,"aria-invalid":S||void 0,className:r?`w-full`:void 0,..._}),c&&(0,h.jsx)(`span`,{id:x,className:`font-sans-productive text-xs`,style:{color:w},children:c})]})}),g.displayName=`DSTextField`,g.__docgenInfo={description:"Design System TextField — shadcn/ui counterpart for the MDS TextField.\nComposes `Label` + `Input`/`Textarea` + helper text, matching the MUI\ntwin's `label`/`helperText`/`error`/`tone`/`size`/`fullWidth` API.",methods:[],displayName:`DSTextField`,props:{type:{required:!1,tsType:{name:`union`,raw:`React.HTMLInputTypeAttribute | 'textarea'`,elements:[{name:`ReactHTMLInputTypeAttribute`,raw:`React.HTMLInputTypeAttribute`},{name:`literal`,value:`'textarea'`}]},description:"Renders a `<textarea>` instead of an `<input>` when set to 'textarea'.",defaultValue:{value:`'text'`,computed:!1}},tone:{required:!1,tsType:{name:`union`,raw:`'default' | 'error' | 'success' | 'warning'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md' | 'small' | 'medium'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`},{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`}]},description:``,defaultValue:{value:`'md'`,computed:!1}},fullWidth:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},error:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:``},helperText:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},rows:{required:!1,tsType:{name:`number`},description:`Textarea-only: number of visible rows.`},className:{required:!1,tsType:{name:`string`},description:``}},composes:[`Omit`]}})))()}var v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=t((()=>{v=n(),_(),c(),u(),f(),y=r(),b={title:`Components/TextField`,component:g,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# TextField\n\n`Input`, `Textarea`, and `Label` are the primary composable primitives\n(plain, unopinionated form elements). `DSTextField` (this story's default\nexport) is a convenience wrapper matching the MUI `DSTextField`'s\n`label`/`helperText`/`error`/`tone`/`size`/`fullWidth` API — including\n`type=\"textarea\"` to swap in a `Textarea` under the hood."}}},argTypes:{tone:{control:`select`,options:[`default`,`error`,`success`,`warning`]},size:{control:`select`,options:[`sm`,`md`]}}},x={args:{label:`Email address`,placeholder:`you@company.com`}},S={args:{label:`Policy number`,placeholder:`POL-000000`,helperText:`You'll find this on your policy document`}},C={args:{label:`Email address`,defaultValue:`not-an-email`,error:!0,helperText:`Enter a valid email address`}},w={args:{label:`Username`,defaultValue:`jane.doe`,tone:`success`,helperText:`Username is available`}},T={args:{label:`Full name`,required:!0,placeholder:`Jane Doe`}},E={args:{label:`Account ID`,defaultValue:`ACC-9284`,disabled:!0}},D={args:{label:`Claim description`,type:`textarea`,rows:4,placeholder:`Describe what happened...`,fullWidth:!0},decorators:[e=>(0,y.jsx)(`div`,{className:`w-[360px]`,children:(0,y.jsx)(e,{})})]},O={args:{label:`Company name`,fullWidth:!0},decorators:[e=>(0,y.jsx)(`div`,{className:`w-[400px]`,children:(0,y.jsx)(e,{})})]},k={render:()=>{let[e,t]=(0,v.useState)(``);return(0,y.jsxs)(`div`,{className:`flex w-[320px] flex-col gap-4`,children:[(0,y.jsxs)(`div`,{className:`flex flex-col gap-1.5`,children:[(0,y.jsx)(p,{htmlFor:`raw-input`,children:`Composable Input + Label`}),(0,y.jsx)(l,{id:`raw-input`,value:e,onChange:e=>t(e.target.value),placeholder:`Type here`})]}),(0,y.jsxs)(`div`,{className:`flex flex-col gap-1.5`,children:[(0,y.jsx)(p,{htmlFor:`raw-textarea`,children:`Composable Textarea`}),(0,y.jsx)(d,{id:`raw-textarea`,placeholder:`Longer content...`,rows:3})]})]})}},A=[`Default`,`WithHelperText`,`ErrorState`,`SuccessTone`,`Required`,`Disabled`,`Textarea_`,`FullWidth`,`RawPrimitives`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email address',
    placeholder: 'you@company.com'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Policy number',
    placeholder: 'POL-000000',
    helperText: "You'll find this on your policy document"
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email address',
    defaultValue: 'not-an-email',
    error: true,
    helperText: 'Enter a valid email address'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    defaultValue: 'jane.doe',
    tone: 'success',
    helperText: 'Username is available'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'Jane Doe'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Account ID',
    defaultValue: 'ACC-9284',
    disabled: true
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Claim description',
    type: 'textarea',
    rows: 4,
    placeholder: 'Describe what happened...',
    fullWidth: true
  },
  decorators: [Story => <div className="w-[360px]"><Story /></div>]
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Company name',
    fullWidth: true
  },
  decorators: [Story => <div className="w-[400px]"><Story /></div>]
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}}})))()}j();export{x as Default,E as Disabled,C as ErrorState,O as FullWidth,k as RawPrimitives,T as Required,w as SuccessTone,D as Textarea_,S as WithHelperText,A as __namedExportsOrder,b as default};