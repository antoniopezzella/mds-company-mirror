import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,r,t as i}from"./separator-BQNXKMAS.js";var a,o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{r(),a=t(),o={title:`Components/Separator`,component:i,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"# Separator / Divider\n\n`Separator` (built on `@radix-ui/react-separator`) is the primary\nprimitive. `Divider` is a convenience wrapper matching the MUI `Divider`'s\n`orientation`/`variant`/`label`/`labelPosition`/`dashed` API, including\nan optional centered/start/end label the raw Separator doesn't support."}}}},s={render:e=>(0,a.jsxs)(`div`,{className:`w-[320px]`,children:[(0,a.jsx)(`p`,{className:`text-sm`,children:`Section one`}),(0,a.jsx)(i,{...e}),(0,a.jsx)(`p`,{className:`text-sm`,children:`Section two`})]})},c={render:e=>(0,a.jsxs)(`div`,{className:`w-[320px]`,children:[(0,a.jsx)(`p`,{className:`text-sm`,children:`Section one`}),(0,a.jsx)(i,{...e,label:`OR`}),(0,a.jsx)(`p`,{className:`text-sm`,children:`Section two`})]})},l={render:e=>(0,a.jsx)(`div`,{className:`w-[320px]`,children:(0,a.jsx)(i,{...e,label:`Recent`,labelPosition:`start`})})},u={render:e=>(0,a.jsx)(`div`,{className:`w-[320px]`,children:(0,a.jsx)(i,{...e,dashed:!0})})},d={render:()=>(0,a.jsxs)(`div`,{className:`flex h-10 items-center gap-3`,children:[(0,a.jsx)(`span`,{className:`text-sm`,children:`Home`}),(0,a.jsx)(i,{orientation:`vertical`}),(0,a.jsx)(`span`,{className:`text-sm`,children:`Policies`}),(0,a.jsx)(i,{orientation:`vertical`}),(0,a.jsx)(`span`,{className:`text-sm`,children:`Claims`})]})},f={render:()=>(0,a.jsxs)(`div`,{className:`w-[320px] space-y-4`,children:[(0,a.jsx)(`p`,{className:`text-sm`,children:`Composable Separator (no label support)`}),(0,a.jsx)(n,{}),(0,a.jsx)(`p`,{className:`text-sm`,children:`Second block`})]})},p=[`Horizontal`,`WithLabel`,`LabelStart`,`Dashed`,`Vertical`,`RawSeparator`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <p className="text-sm">Section one</p>
      <Divider {...args} />
      <p className="text-sm">Section two</p>
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <p className="text-sm">Section one</p>
      <Divider {...args} label="OR" />
      <p className="text-sm">Section two</p>
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <Divider {...args} label="Recent" labelPosition="start" />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <Divider {...args} dashed />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex h-10 items-center gap-3">
      <span className="text-sm">Home</span>
      <Divider orientation="vertical" />
      <span className="text-sm">Policies</span>
      <Divider orientation="vertical" />
      <span className="text-sm">Claims</span>
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[320px] space-y-4">
      <p className="text-sm">Composable Separator (no label support)</p>
      <Separator />
      <p className="text-sm">Second block</p>
    </div>
}`,...f.parameters?.docs?.source}}}})))()}m();export{u as Dashed,s as Horizontal,l as LabelStart,f as RawSeparator,d as Vertical,c as WithLabel,p as __namedExportsOrder,o as default};