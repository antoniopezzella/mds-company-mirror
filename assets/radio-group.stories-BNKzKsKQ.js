import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{i,n as a}from"./roles-DNqHlq35.js";import{n as o,t as s}from"./dist-C2AALbSD.js";import{n as c,t as l}from"./utils-BGgJixJd.js";import{n as u,t as d}from"./circle-BSUjF2Fn.js";import{i as f,n as p,r as m,t as h}from"./dist-B4JrP7G1.js";function g(e,t){return t===`active`?`${e}.active`:t===`hover`?`${e}.hover`:e}function _({checked:e,disabled:t,invalid:n,interaction:r,style:a}){let o={"--radio-focus-ring":`var(--role-border-focus)`,"--radio-focus-inner-ring":`var(--role-bg-default)`};if(t)return{...a,...o,backgroundColor:`var(--role-bg-disabled)`,borderColor:`var(--role-fg-disabled)`,color:`var(--role-fg-disabled)`};if(e){let e=g(n?`interactive.danger`:`interactive.primary`,r);return{...a,...o,backgroundColor:`var(--role-bg-default)`,borderColor:i(e),color:i(e)}}let s=n?`border.critical`:`border.default`,c=r===`active`?`color-mix(in srgb, var(--role-bg-default) 80%, var(--role-interactive-primary) 20%)`:r===`hover`?`color-mix(in srgb, var(--role-bg-default) 90%, var(--role-interactive-primary) 10%)`:`var(--role-bg-default)`;return{...a,...o,backgroundColor:c,borderColor:i(s),color:i(n?`interactive.danger`:`interactive.primary`)}}var v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N;function P(){return(P=t((()=>{v=e(n(),1),f(),o(),u(),c(),a(),y=r(),b=v.createContext(void 0),x=s(`inline-flex flex-col gap-2`,{variants:{fullWidth:{true:`w-full`,false:``}},defaultVariants:{fullWidth:!1}}),S=s(`flex gap-2`,{variants:{row:{true:`flex-row flex-wrap gap-4`,false:`flex-col`}},defaultVariants:{row:!1}}),C=s(`inline-flex flex-col items-start`,{variants:{fullWidth:{true:`w-full`,false:``},disabled:{true:`cursor-not-allowed`,false:``}},defaultVariants:{fullWidth:!1,disabled:!1}}),w=s(`flex min-h-6 items-start gap-2`,{variants:{fullWidth:{true:`w-full`,false:``}},defaultVariants:{fullWidth:!1}}),T=s(`flex h-6 shrink-0 items-center py-0.5`),E=s(`peer flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,box-shadow,color] duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--radio-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--radio-focus-inner-ring)] disabled:pointer-events-none disabled:cursor-not-allowed`),D=s(`flex items-center justify-center`),O=s(`select-none font-sans-productive text-base font-normal leading-6 tracking-normal peer-disabled:cursor-not-allowed`),k=s(`font-sans-productive text-base font-semibold leading-6 tracking-normal`),A=s(`font-sans-productive text-sm font-normal leading-5 tracking-normal`),j=v.forwardRef(({id:e,disabled:t=!1,label:n,children:r,tone:a=`default`,invalid:o=!1,fullWidth:s=!1,className:c,controlClassName:u,labelClassName:f,style:h,value:g,onMouseEnter:x,onMouseLeave:S,onPointerDown:k,onPointerUp:A,onPointerCancel:j,onKeyDown:M,onKeyUp:N,...P},F)=>{let I=v.useId(),L=e??I,R=v.useContext(b),z=R!==void 0&&R===g,B=o||a===`danger`,V=n??r,[H,U]=v.useState(`default`),W=e=>{t||U(e)},G=i(t?`fg.disabled`:`fg.primary`),K=_({checked:z,disabled:t,invalid:B,interaction:H,style:h});return(0,y.jsx)(`div`,{className:l(C({fullWidth:s,disabled:t}),c),"data-disabled":t||void 0,children:(0,y.jsxs)(`div`,{className:l(w({fullWidth:s})),children:[(0,y.jsx)(`span`,{className:T(),children:(0,y.jsx)(m,{ref:F,id:L,value:g,disabled:t,"aria-invalid":B?!0:void 0,"data-invalid":B||void 0,className:l(E(),u),style:K,onMouseEnter:e=>{W(`hover`),x?.(e)},onMouseLeave:e=>{W(`default`),S?.(e)},onPointerDown:e=>{W(`active`),k?.(e)},onPointerUp:e=>{W(`hover`),A?.(e)},onPointerCancel:e=>{W(`default`),j?.(e)},onKeyDown:e=>{(e.key===` `||e.key===`Enter`)&&W(`active`),M?.(e)},onKeyUp:e=>{(e.key===` `||e.key===`Enter`)&&W(`default`),N?.(e)},...P,children:(0,y.jsx)(p,{className:D(),children:(0,y.jsx)(d,{"aria-hidden":`true`,className:`h-2.5 w-2.5 fill-current stroke-none`})})})}),V?(0,y.jsx)(`label`,{htmlFor:L,className:l(O(),t&&`cursor-not-allowed`,f),style:{color:G},children:V}):null]})})}),j.displayName=`DSRadio`,M=v.forwardRef(({options:e,value:t,onChange:n,label:r,helperText:i,error:a=!1,row:o=!1,disabled:s=!1,name:c,fullWidth:u=!1,className:d},f)=>{let p=v.useId(),m=c??p,g=`${m}-helper`;return(0,y.jsxs)(`div`,{ref:f,className:l(x({fullWidth:u}),d),children:[r&&(0,y.jsx)(`span`,{className:k(),style:{color:`var(--role-fg-primary)`},children:r}),(0,y.jsx)(h,{value:t,onValueChange:n,disabled:s,name:m,"aria-describedby":i?g:void 0,className:l(S({row:o})),children:(0,y.jsx)(b.Provider,{value:t,children:e.map(e=>(0,y.jsx)(j,{value:e.value,label:e.label,disabled:s||e.disabled,invalid:a},e.value))})}),i&&(0,y.jsx)(`span`,{id:g,className:A(),style:{color:a?`var(--role-fg-critical)`:`var(--role-fg-primary)`},children:i})]})}),M.displayName=`DSRadioGroup`,N=M,M.__docgenInfo={description:`Design System Radio Group — shadcn/ui/Radix counterpart for the MDS
Radio Group. Same options-array API as MUI's \`DSRadioGroup\` for drop-in
parity between the two tracks.`,methods:[],displayName:`DSRadioGroup`,props:{options:{required:!0,tsType:{name:`Array`,elements:[{name:`DSRadioGroupOption`}],raw:`DSRadioGroupOption[]`},description:`Radio options`},value:{required:!1,tsType:{name:`string`},description:`Currently selected value`},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:`Called with the newly selected value`},label:{required:!1,tsType:{name:`string`},description:`Group heading`},helperText:{required:!1,tsType:{name:`string`},description:`Helper / hint text below the group`},error:{required:!1,tsType:{name:`boolean`},description:`Validation error state — applies invalid styling to every option`,defaultValue:{value:`false`,computed:!1}},row:{required:!1,tsType:{name:`boolean`},description:`Render options in a row instead of a column`,defaultValue:{value:`false`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:`Disable all options`,defaultValue:{value:`false`,computed:!1}},name:{required:!1,tsType:{name:`string`},description:`Name for the underlying native radio inputs (form submission)`},fullWidth:{required:!1,tsType:{name:`boolean`},description:`Expands the group wrapper to fill its parent width`,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Class name applied to the group wrapper`}}},j.__docgenInfo={description:"Design System Radio option — shadcn/ui/Radix counterpart for the MDS Radio.\nMust be rendered inside a `DSRadioGroup` (or a `RadioGroupPrimitive.Root`\nwrapping a `RadioGroupValueContext.Provider`) for its checked visuals to\ntrack the group's selected value.",methods:[],displayName:`DSRadio`,props:{id:{required:!1,tsType:{name:`string`},description:`Unique id for the radio control; generated automatically when omitted.`},disabled:{required:!1,tsType:{name:`boolean`},description:`Disables this option only (the group can also disable all options at once).`,defaultValue:{value:`false`,computed:!1}},label:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Visible label content rendered to the right of the radio.`},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:"Alternative label content; used when `label` is not provided."},tone:{required:!1,tsType:{name:`union`,raw:`'default' | 'danger'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'danger'`}]},description:`Tone: danger applies red styling for destructive choices (MUI Radio parity).`,defaultValue:{value:`'default'`,computed:!1}},invalid:{required:!1,tsType:{name:`boolean`},description:'Applies invalid/error visuals (Figma `Invalid` prop); combines with `tone="danger"`.',defaultValue:{value:`false`,computed:!1}},fullWidth:{required:!1,tsType:{name:`boolean`},description:`Expands the radio option wrapper to fill its parent width.`,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Class name applied to the radio option wrapper.`},controlClassName:{required:!1,tsType:{name:`string`},description:`Class name applied to the Radix radio control.`},labelClassName:{required:!1,tsType:{name:`string`},description:`Class name applied to the label element.`},style:{required:!1,tsType:{name:`ReactCSSProperties`,raw:`React.CSSProperties`},description:`Inline style applied to the Radix radio control; role-driven color styles are enforced by the component.`}},composes:[`Omit`]}})))()}var F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=t((()=>{F=n(),P(),I=r(),L={title:`Components/RadioGroup`,component:N,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`Single-selection control for mutually exclusive options. Supports grouping, disabled states, error styling, and full keyboard navigation via Radix.`}}},argTypes:{row:{control:`boolean`},disabled:{control:`boolean`},error:{control:`boolean`}}},R=[{value:`free`,label:`Free plan`},{value:`pro`,label:`Pro plan`},{value:`enterprise`,label:`Enterprise plan`}],z={args:{label:`Plan selection`,options:R,value:`pro`,helperText:`Choose your subscription plan`}},B={args:{label:`Billing cycle`,options:[{value:`monthly`,label:`Monthly`},{value:`annual`,label:`Annual`}],value:`annual`,row:!0}},V={args:{label:`Plan selection`,options:R,value:`pro`,disabled:!0}},H={args:{label:`Plan selection`,options:[{value:`free`,label:`Free plan`},{value:`pro`,label:`Pro plan`},{value:`enterprise`,label:`Enterprise plan (contact sales)`,disabled:!0}],value:`pro`}},U={args:{label:`Choose a shipping method`,options:[{value:`standard`,label:`Standard (5-7 days)`},{value:`express`,label:`Express (2-3 days)`}],error:!0,helperText:`Selection required to continue`}},W={args:{options:R,value:`free`}},G={render:()=>{let[e,t]=(0,F.useState)(`pro`);return(0,I.jsx)(`div`,{className:`w-[360px]`,children:(0,I.jsx)(N,{label:`Subscription plan`,options:R,value:e,onChange:t,helperText:`Selected: ${e}`})})}},K=[`Default`,`Row`,`Disabled`,`WithDisabledOption`,`Invalid`,`WithoutLabel`,`FormExample`],z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Plan selection',
    options: planOptions,
    value: 'pro',
    helperText: 'Choose your subscription plan'
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Billing cycle',
    options: [{
      value: 'monthly',
      label: 'Monthly'
    }, {
      value: 'annual',
      label: 'Annual'
    }],
    value: 'annual',
    row: true
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Plan selection',
    options: planOptions,
    value: 'pro',
    disabled: true
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Plan selection',
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
    }],
    value: 'pro'
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Choose a shipping method',
    options: [{
      value: 'standard',
      label: 'Standard (5-7 days)'
    }, {
      value: 'express',
      label: 'Express (2-3 days)'
    }],
    error: true,
    helperText: 'Selection required to continue'
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    options: planOptions,
    value: 'free'
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [plan, setPlan] = useState('pro');
    return <div className="w-[360px]">
        <RadioGroup label="Subscription plan" options={planOptions} value={plan} onChange={setPlan} helperText={\`Selected: \${plan}\`} />
      </div>;
  }
}`,...G.parameters?.docs?.source}}}})))()}q();export{z as Default,V as Disabled,G as FormExample,U as Invalid,B as Row,H as WithDisabledOption,W as WithoutLabel,K as __namedExportsOrder,L as default};