import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{a as r,c as i,i as a,l as o,n as s,o as c,r as l,s as u,t as d,u as f}from"./select-BbcdR6zw.js";var p,m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{p=t(),f(),m=n(),h={title:`Components/Select`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# Select\n\nRadix `Select` renders a real custom-styled listbox — not a native\n`<select>` — with proper keyboard nav, typeahead, and viewport-aware\npositioning. That's a materially better foundation than MUI's Select, so\nthe composable primitives are the primary API here.\n\n`DSSelect` (bottom of this file) is a convenience wrapper matching MUI's\n`options`/`label`/`helperText`/`error`/`tone` prop shape for migration."}}}},g={render:()=>(0,m.jsxs)(s,{defaultValue:`pro`,children:[(0,m.jsx)(i,{className:`w-[220px]`,"aria-label":`Plan`,children:(0,m.jsx)(o,{placeholder:`Select a plan`})}),(0,m.jsxs)(l,{children:[(0,m.jsxs)(a,{children:[(0,m.jsx)(c,{children:`Plans`}),(0,m.jsx)(r,{value:`free`,children:`Free`}),(0,m.jsx)(r,{value:`pro`,children:`Pro`}),(0,m.jsx)(r,{value:`enterprise`,children:`Enterprise`})]}),(0,m.jsx)(u,{}),(0,m.jsxs)(a,{children:[(0,m.jsx)(c,{children:`Legacy`}),(0,m.jsx)(r,{value:`legacy`,disabled:!0,children:`Legacy (discontinued)`})]})]})]})},_=[{value:`free`,label:`Free plan`},{value:`pro`,label:`Pro plan`},{value:`enterprise`,label:`Enterprise plan`}],v={render:e=>(0,m.jsx)(d,{...e}),args:{label:`Subscription plan`,options:_,defaultValue:`pro`}},y={render:e=>(0,m.jsx)(d,{...e}),args:{label:`Subscription plan`,options:_,helperText:`You can change this anytime`}},b={render:e=>(0,m.jsx)(d,{...e}),args:{label:`Shipping method`,options:[{value:`standard`,label:`Standard`},{value:`express`,label:`Express`}],error:!0,helperText:`Selection required to continue`}},x={render:e=>(0,m.jsx)(d,{...e}),args:{label:`Subscription plan`,options:_,defaultValue:`pro`,disabled:!0}},S={render:e=>(0,m.jsx)(d,{...e}),args:{label:`Subscription plan`,options:[{value:`free`,label:`Free plan`},{value:`pro`,label:`Pro plan`},{value:`enterprise`,label:`Enterprise plan (contact sales)`,disabled:!0}]}},C={render:e=>(0,m.jsx)(`div`,{className:`w-[400px]`,children:(0,m.jsx)(d,{...e})}),args:{label:`Subscription plan`,options:_,fullWidth:!0}},w={render:()=>{let[e,t]=(0,p.useState)(`pro`);return(0,m.jsx)(d,{label:`Subscription plan`,options:_,value:e,onChange:e=>t(String(e)),helperText:`Selected: ${e}`})}},T=[`Composable`,`Default`,`WithHelperText`,`ErrorState`,`Disabled`,`WithDisabledOption`,`FullWidth`,`ControlledExample`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Select defaultValue="pro">
      {/* role="combobox" takes no name from its content, so the trigger needs
          an explicit label even though the plan name is visible inside it. */}
      <SelectTrigger className="w-[220px]" aria-label="Plan">
        <SelectValue placeholder="Select a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Plans</SelectLabel>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Legacy</SelectLabel>
          <SelectItem value="legacy" disabled>
            Legacy (discontinued)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
}`,...g.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
    options: planOptions,
    defaultValue: 'pro'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
    options: planOptions,
    helperText: 'You can change this anytime'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <DSSelect {...args} />,
  args: {
    label: 'Shipping method',
    options: [{
      value: 'standard',
      label: 'Standard'
    }, {
      value: 'express',
      label: 'Express'
    }],
    error: true,
    helperText: 'Selection required to continue'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
    options: planOptions,
    defaultValue: 'pro',
    disabled: true
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
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
    }]
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[400px]">
      <DSSelect {...args} />
    </div>,
  args: {
    label: 'Subscription plan',
    options: planOptions,
    fullWidth: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [plan, setPlan] = useState('pro');
    return <DSSelect label="Subscription plan" options={planOptions} value={plan} onChange={value => setPlan(String(value))} helperText={\`Selected: \${plan}\`} />;
  }
}`,...w.parameters?.docs?.source}}}})))()}E();export{g as Composable,w as ControlledExample,v as Default,x as Disabled,b as ErrorState,C as FullWidth,S as WithDisabledOption,y as WithHelperText,T as __namedExportsOrder,h as default};