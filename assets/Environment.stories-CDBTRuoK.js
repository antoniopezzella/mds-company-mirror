import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";var r,i,a,o,s;function c(){return(c=e((()=>{t(),r=n(),i={title:`_health/Environment`,tags:[`hidden`],parameters:{docs:{disable:!0},chromatic:{disableSnapshot:!0},layout:`padded`}},a={render:()=>(0,r.jsxs)(`div`,{style:{fontFamily:`sans-serif`,fontSize:14,lineHeight:1.5},children:[(0,r.jsx)(`strong`,{children:`Storybook environment OK`}),(0,r.jsxs)(`ul`,{style:{marginTop:8,paddingLeft:18},children:[(0,r.jsxs)(`li`,{children:[`Mode: `,`production`]}),(0,r.jsxs)(`li`,{children:[`Build Time: `,new Date().toISOString()]}),(0,r.jsxs)(`li`,{children:[`React Version: `,`19.1.9`]})]}),(0,r.jsx)(`em`,{style:{display:`block`,marginTop:12,opacity:.7},children:`Remove or simplify dynamic items if you need Chromatic snapshots here.`})]})},o={parameters:{chromatic:{disableSnapshot:!1}},render:()=>(0,r.jsxs)(`div`,{style:{fontFamily:`sans-serif`,fontSize:14,lineHeight:1.5},children:[(0,r.jsx)(`strong`,{children:`Storybook environment OK`}),(0,r.jsx)(`p`,{style:{marginTop:8},children:`Static variant for potential screenshot baseline.`})]})},s=[`Loaded`,`Static`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
        <li>React Version: {React.version}</li>
      </ul>
      <em style={{
      display: 'block',
      marginTop: 12,
      opacity: 0.7
    }}>Remove or simplify dynamic items if you need Chromatic snapshots here.</em>
    </div>
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}}})))()}c();export{a as Loaded,o as Static,s as __namedExportsOrder,i as default};