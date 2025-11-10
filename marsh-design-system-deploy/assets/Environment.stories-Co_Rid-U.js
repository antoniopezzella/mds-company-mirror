import{j as e,e as t}from"./iframe-B7__wHsY.js";import"./preload-helper-PPVm8Dsz.js";const o={title:"_health/Environment",tags:["hidden"],parameters:{docs:{disable:!0},chromatic:{disableSnapshot:!0},layout:"padded"}},n={render:()=>e.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:14,lineHeight:1.5},children:[e.jsx("strong",{children:"Storybook environment OK"}),e.jsxs("ul",{style:{marginTop:8,paddingLeft:18},children:[e.jsxs("li",{children:["Mode: ","production"]}),e.jsxs("li",{children:["Build Time: ",new Date().toISOString()]}),e.jsxs("li",{children:["React Version: ",t.version]})]}),e.jsx("em",{style:{display:"block",marginTop:12,opacity:.7},children:"Remove or simplify dynamic items if you need Chromatic snapshots here."})]})},i={parameters:{chromatic:{disableSnapshot:!1}},render:()=>e.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:14,lineHeight:1.5},children:[e.jsx("strong",{children:"Storybook environment OK"}),e.jsx("p",{style:{marginTop:8},children:"Static variant for potential screenshot baseline."})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    fontFamily: 'sans-serif',
    fontSize: 14,
    lineHeight: 1.5
  }}>
      <strong>Storybook environment OK</strong>
      <ul style={{
      marginTop: 8,
      paddingLeft: 18
    }}>
        <li>Mode: {import.meta.env.MODE}</li>
        <li>Build Time: {new Date().toISOString()}</li>
        <li>React Version: {(React as any).version}</li>
      </ul>
      <em style={{
      display: 'block',
      marginTop: 12,
      opacity: 0.7
    }}>Remove or simplify dynamic items if you need Chromatic snapshots here.</em>
    </div>
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    chromatic: {
      disableSnapshot: false
    }
  },
  render: () => <div style={{
    fontFamily: 'sans-serif',
    fontSize: 14,
    lineHeight: 1.5
  }}>
      <strong>Storybook environment OK</strong>
      <p style={{
      marginTop: 8
    }}>Static variant for potential screenshot baseline.</p>
    </div>
}`,...i.parameters?.docs?.source}}};const a=["Loaded","Static"];export{n as Loaded,i as Static,a as __namedExportsOrder,o as default};
