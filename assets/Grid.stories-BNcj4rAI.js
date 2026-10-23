import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";var n,r,i,a;function o(){return(o=e((()=>{n=t(),r={title:`_health/Grid`,parameters:{layout:`fullscreen`}},i={render:()=>(0,n.jsx)(`div`,{className:`mds-legacy-container`,style:{padding:8},children:(0,n.jsxs)(`div`,{className:`mds-legacy-row gap-2`,"data-testid":`row`,children:[(0,n.jsx)(`div`,{className:`mds-legacy-col-6`,style:{background:`#eef6ff`,padding:8},children:`A`}),(0,n.jsx)(`div`,{className:`mds-legacy-col-6`,style:{background:`#eef6ff`,padding:8},children:`B`})]})}),play:async({canvasElement:e})=>{let t=e.querySelector(`[data-testid="row"]`);if(!t)throw Error(`row not found`);let n=getComputedStyle(t);if(!n.display.includes(`grid`))throw Error(`expected display:grid, got ${n.display}`);if(!n.gridTemplateColumns)throw Error(`grid-template-columns is empty`)}},a=[`GridPresent`],i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="mds-legacy-container" style={{
    padding: 8
  }}>
      <div className="mds-legacy-row gap-2" data-testid="row">
        <div className="mds-legacy-col-6" style={{
        background: '#eef6ff',
        padding: 8
      }}>A</div>
        <div className="mds-legacy-col-6" style={{
        background: '#eef6ff',
        padding: 8
      }}>B</div>
      </div>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const row = canvasElement.querySelector('[data-testid="row"]') as HTMLElement | null;
    if (!row) throw new Error('row not found');
    const styles = getComputedStyle(row);
    if (!styles.display.includes('grid')) {
      throw new Error(\`expected display:grid, got \${styles.display}\`);
    }
    const template = styles.gridTemplateColumns || '';
    if (!template) {
      throw new Error('grid-template-columns is empty');
    }
  }
}`,...i.parameters?.docs?.source}}}})))()}o();export{i as GridPresent,a as __namedExportsOrder,r as default};