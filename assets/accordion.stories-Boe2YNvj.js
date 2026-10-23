import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./accordion-BldgA6c8.js";var i,a,o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{n(),i=t(),a={title:`Components/Accordion`,component:r,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`Collapsible sections for organizing content hierarchically. Supports single or multiple expansion, with full keyboard navigation via Radix.`}}},argTypes:{variant:{control:`select`,options:[`default`,`compact`,`elevated`]},allowMultiple:{control:`boolean`}}},o=[{id:`coverage`,title:`What does this policy cover?`,subtitle:`General liability terms`,content:(0,i.jsx)(`p`,{children:`Covers property damage, bodily injury, and legal defense costs up to the policy limit.`})},{id:`exclusions`,title:`What is excluded?`,content:(0,i.jsx)(`p`,{children:`Intentional acts, war, and nuclear incidents are excluded from coverage.`})},{id:`claims`,title:`How do I file a claim?`,content:(0,i.jsx)(`p`,{children:`Contact your broker or submit a claim through the client portal within 30 days of the incident.`})}],s={args:{items:o,defaultExpanded:[`coverage`]}},c={args:{items:o,defaultExpanded:[`coverage`,`exclusions`],allowMultiple:!0}},l={args:{items:o,variant:`compact`,defaultExpanded:[`coverage`]}},u={args:{items:o,variant:`elevated`,defaultExpanded:[`coverage`]}},d={args:{items:[...o,{id:`archived`,title:`Archived policy terms`,content:(0,i.jsx)(`p`,{children:`No longer applicable.`}),disabled:!0}]}},f={args:{items:o}},p=[`Default`,`AllowMultiple`,`Compact`,`Elevated`,`WithDisabledItem`,`NoneExpandedByDefault`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: policyItems,
    defaultExpanded: ['coverage']
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    items: policyItems,
    defaultExpanded: ['coverage', 'exclusions'],
    allowMultiple: true
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    items: policyItems,
    variant: 'compact',
    defaultExpanded: ['coverage']
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    items: policyItems,
    variant: 'elevated',
    defaultExpanded: ['coverage']
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    items: [...policyItems, {
      id: 'archived',
      title: 'Archived policy terms',
      content: <p>No longer applicable.</p>,
      disabled: true
    }]
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    items: policyItems
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{c as AllowMultiple,l as Compact,s as Default,u as Elevated,f as NoneExpandedByDefault,d as WithDisabledItem,p as __namedExportsOrder,a as default};