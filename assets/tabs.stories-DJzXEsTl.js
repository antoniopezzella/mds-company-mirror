import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./tabs-sotmQBZ-.js";var i,a,o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{n(),i=t(),a={title:`Components/Tabs`,component:r,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`Switches between content panels via an underline-indicator tab list, with full keyboard navigation via Radix.`}}},argTypes:{variant:{control:`select`,options:[`standard`,`scrollable`,`fullWidth`]}}},o=[{id:`overview`,title:`Overview`,content:(0,i.jsx)(`p`,{children:`Overview content goes here.`})},{id:`policies`,title:`Policies`,content:(0,i.jsx)(`p`,{children:`Policies content goes here.`})},{id:`claims`,title:`Claims`,content:(0,i.jsx)(`p`,{children:`Claims content goes here.`})}],s={args:{tabs:o}},c={args:{tabs:o,defaultActiveId:`claims`}},l={args:{tabs:[{id:`overview`,title:`Overview`,content:(0,i.jsx)(`p`,{children:`Overview content.`})},{id:`policies`,title:`Policies`,content:(0,i.jsx)(`p`,{children:`Policies content.`})},{id:`archived`,title:`Archived`,content:(0,i.jsx)(`p`,{children:`Archived content.`}),disabled:!0}]}},u={args:{tabs:o,variant:`fullWidth`}},d={args:{tabs:Array.from({length:8},(e,t)=>({id:`tab-${t}`,title:`Section ${t+1}`,content:(0,i.jsxs)(`p`,{children:[`Content for section `,t+1,`.`]})})),variant:`scrollable`},decorators:[e=>(0,i.jsx)(`div`,{className:`w-[400px]`,children:(0,i.jsx)(e,{})})]},f={args:{tabs:o,onSelect:e=>console.debug(`Selected tab:`,e)}},p=[`Default`,`DefaultActiveId`,`WithDisabledTab`,`FullWidth`,`ManyTabsScrollable`,`OnSelectCallback`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: basicTabs
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: basicTabs,
    defaultActiveId: 'claims'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: [{
      id: 'overview',
      title: 'Overview',
      content: <p>Overview content.</p>
    }, {
      id: 'policies',
      title: 'Policies',
      content: <p>Policies content.</p>
    }, {
      id: 'archived',
      title: 'Archived',
      content: <p>Archived content.</p>,
      disabled: true
    }]
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: basicTabs,
    variant: 'fullWidth'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: Array.from({
      length: 8
    }, (_, i) => ({
      id: \`tab-\${i}\`,
      title: \`Section \${i + 1}\`,
      content: <p>Content for section {i + 1}.</p>
    })),
    variant: 'scrollable'
  },
  decorators: [Story => <div className="w-[400px]">
        <Story />
      </div>]
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: basicTabs,
    onSelect: (id: string) => console.debug('Selected tab:', id)
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{s as Default,c as DefaultActiveId,u as FullWidth,d as ManyTabsScrollable,f as OnSelectCallback,l as WithDisabledTab,p as __namedExportsOrder,a as default};