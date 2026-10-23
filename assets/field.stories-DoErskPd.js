import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./input-Bj4eDxQ0.js";import{a as i,c as a,i as o,l as s,n as c,o as l,r as u,s as d,t as f,u as p}from"./field-aPS_KuWD.js";var m,h,g,_,v,y;function b(){return(b=e((()=>{p(),n(),m=t(),h={title:`Components/Field`,component:f,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`# Field

General-purpose form-layout primitives — not chat-specific, but pulled
in alongside the chat components since a compose box is itself a form.
Wraps this repo's existing Label/Separator; no new dependencies.`}}},argTypes:{orientation:{control:`select`,options:[`vertical`,`horizontal`,`responsive`]}}},g={render:()=>(0,m.jsxs)(s,{className:`max-w-md`,children:[(0,m.jsx)(d,{children:`Profile information`}),(0,m.jsx)(u,{children:`Update your account details.`}),(0,m.jsxs)(i,{children:[(0,m.jsxs)(f,{children:[(0,m.jsx)(l,{htmlFor:`story-name`,children:`Full name`}),(0,m.jsx)(r,{id:`story-name`,placeholder:`Jordan Rivera`}),(0,m.jsx)(u,{children:`Your legal name.`})]}),(0,m.jsxs)(f,{"data-invalid":!0,children:[(0,m.jsx)(l,{htmlFor:`story-email`,children:`Email`}),(0,m.jsx)(r,{id:`story-email`,tone:`error`,defaultValue:`not-an-email`}),(0,m.jsx)(o,{children:`Enter a valid email address.`})]})]})]})},_={render:()=>(0,m.jsxs)(i,{className:`max-w-md gap-6`,children:[(0,m.jsxs)(f,{orientation:`vertical`,children:[(0,m.jsx)(l,{htmlFor:`story-vertical`,children:`Vertical (default)`}),(0,m.jsx)(r,{id:`story-vertical`,placeholder:`Label above the input`})]}),(0,m.jsx)(a,{}),(0,m.jsxs)(f,{orientation:`horizontal`,children:[(0,m.jsx)(l,{htmlFor:`story-horizontal`,children:`Horizontal`}),(0,m.jsx)(r,{id:`story-horizontal`,placeholder:`Label beside the input`})]})]})},v={name:`With FieldContent (title + description grouping)`,render:()=>(0,m.jsx)(f,{className:`max-w-md`,children:(0,m.jsxs)(c,{children:[(0,m.jsx)(`span`,{className:`text-sm font-medium`,children:`Notify me by email`}),(0,m.jsx)(u,{children:`Receive a summary of activity once a day.`})]})})},y=[`ProfileForm`,`Orientations`,`WithContent`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <FieldSet className="max-w-md">
      <FieldLegend>Profile information</FieldLegend>
      <FieldDescription>Update your account details.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="story-name">Full name</FieldLabel>
          <Input id="story-name" placeholder="Jordan Rivera" />
          <FieldDescription>Your legal name.</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="story-email">Email</FieldLabel>
          <Input id="story-email" tone="error" defaultValue="not-an-email" />
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
      </FieldGroup>
    </FieldSet>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <FieldGroup className="max-w-md gap-6">
      <Field orientation="vertical">
        <FieldLabel htmlFor="story-vertical">Vertical (default)</FieldLabel>
        <Input id="story-vertical" placeholder="Label above the input" />
      </Field>
      <FieldSeparator />
      <Field orientation="horizontal">
        <FieldLabel htmlFor="story-horizontal">Horizontal</FieldLabel>
        <Input id="story-horizontal" placeholder="Label beside the input" />
      </Field>
    </FieldGroup>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'With FieldContent (title + description grouping)',
  render: () => <Field className="max-w-md">
      <FieldContent>
        <span className="text-sm font-medium">Notify me by email</span>
        <FieldDescription>Receive a summary of activity once a day.</FieldDescription>
      </FieldContent>
    </Field>
}`,...v.parameters?.docs?.source}}}})))()}b();export{_ as Orientations,g as ProfileForm,v as WithContent,y as __namedExportsOrder,h as default};