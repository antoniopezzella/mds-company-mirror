import{Z as e}from"./iframe-CPBTUrEW.js";import{T as d}from"./tabs-9gv2fRbt.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-Cq_iRV-a.js";import"./index-D8r7tS0H.js";import"./index-DTX6ga2Q.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-ydzPhmoe.js";import"./index-COhu0uIO.js";import"./index-D0Uu3jyy.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";const W={title:"Components/Tabs",component:d,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Switches between content panels via an underline-indicator tab list, with full keyboard navigation via Radix."}}},argTypes:{variant:{control:"select",options:["standard","scrollable","fullWidth"]}}},c=[{id:"overview",title:"Overview",content:e.jsx("p",{children:"Overview content goes here."})},{id:"policies",title:"Policies",content:e.jsx("p",{children:"Policies content goes here."})},{id:"claims",title:"Claims",content:e.jsx("p",{children:"Claims content goes here."})}],r={args:{tabs:c}},a={args:{tabs:c,defaultActiveId:"claims"}},s={args:{tabs:[{id:"overview",title:"Overview",content:e.jsx("p",{children:"Overview content."})},{id:"policies",title:"Policies",content:e.jsx("p",{children:"Policies content."})},{id:"archived",title:"Archived",content:e.jsx("p",{children:"Archived content."}),disabled:!0}]}},n={args:{tabs:c,variant:"fullWidth"}},o={args:{tabs:Array.from({length:8},(t,l)=>({id:`tab-${l}`,title:`Section ${l+1}`,content:e.jsxs("p",{children:["Content for section ",l+1,"."]})})),variant:"scrollable"},decorators:[t=>e.jsx("div",{className:"w-[400px]",children:e.jsx(t,{})})]},i={args:{tabs:c,onSelect:t=>console.debug("Selected tab:",t)}},D=["Default","DefaultActiveId","WithDisabledTab","FullWidth","ManyTabsScrollable","OnSelectCallback"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: basicTabs
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: basicTabs,
    defaultActiveId: 'claims'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: basicTabs,
    variant: 'fullWidth'
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: basicTabs,
    onSelect: (id: string) => console.debug('Selected tab:', id)
  }
}`,...i.parameters?.docs?.source}}};export{r as Default,a as DefaultActiveId,n as FullWidth,o as ManyTabsScrollable,i as OnSelectCallback,s as WithDisabledTab,D as __namedExportsOrder,W as default};
