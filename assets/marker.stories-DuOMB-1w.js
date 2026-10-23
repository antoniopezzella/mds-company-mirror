import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./info-BDKpeUaU.js";import{i,n as a,r as o,t as s}from"./marker-COe4d890.js";var c,l,u,d,f,p;function m(){return(m=e((()=>{n(),i(),c=t(),l={title:`Components/Marker`,component:s,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`# Marker

In-transcript status updates, system notes, and date/thread separators —
the smallest of the chat-components family. Pre-existing in this repo,
had no Storybook story until now.`}}},argTypes:{variant:{control:`select`,options:[`default`,`separator`,`border`]}}},u={render:()=>(0,c.jsxs)(s,{className:`max-w-md`,children:[(0,c.jsx)(o,{children:(0,c.jsx)(r,{})}),(0,c.jsx)(a,{children:`Antonio Pezzella joined the conversation.`})]})},d={name:`Separator variant`,render:()=>(0,c.jsx)(s,{variant:`separator`,className:`max-w-md`,children:(0,c.jsx)(a,{children:`Today`})})},f={name:`Border variant`,render:()=>(0,c.jsxs)(`div`,{className:`max-w-md`,children:[(0,c.jsx)(s,{variant:`border`,children:(0,c.jsx)(a,{children:`Claim CLM-1042 — Property`})}),(0,c.jsx)(`p`,{className:`pt-3 text-sm text-muted-foreground`,children:`Content following the bordered section marker.`})]})},p=[`SystemNote`,`DateSeparator`,`SectionBorder`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Marker className="max-w-md">
      <MarkerIcon>
        <InfoIcon />
      </MarkerIcon>
      <MarkerContent>Antonio Pezzella joined the conversation.</MarkerContent>
    </Marker>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Separator variant',
  render: () => <Marker variant="separator" className="max-w-md">
      <MarkerContent>Today</MarkerContent>
    </Marker>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Border variant',
  render: () => <div className="max-w-md">
      <Marker variant="border">
        <MarkerContent>Claim CLM-1042 — Property</MarkerContent>
      </Marker>
      <p className="pt-3 text-sm text-muted-foreground">Content following the bordered section marker.</p>
    </div>
}`,...f.parameters?.docs?.source}}}})))()}m();export{d as DateSeparator,f as SectionBorder,u as SystemNote,p as __namedExportsOrder,l as default};