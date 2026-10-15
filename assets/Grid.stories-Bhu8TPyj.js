import{Z as e}from"./iframe-CPBTUrEW.js";import"./preload-helper-PPVm8Dsz.js";const o={title:"_health/Grid",parameters:{layout:"fullscreen"}},s={render:()=>e.jsx("div",{className:"mds-legacy-container",style:{padding:8},children:e.jsxs("div",{className:"mds-legacy-row gap-2","data-testid":"row",children:[e.jsx("div",{className:"mds-legacy-col-6",style:{background:"#eef6ff",padding:8},children:"A"}),e.jsx("div",{className:"mds-legacy-col-6",style:{background:"#eef6ff",padding:8},children:"B"})]})}),play:async({canvasElement:n})=>{const r=n.querySelector('[data-testid="row"]');if(!r)throw new Error("row not found");const t=getComputedStyle(r);if(!t.display.includes("grid"))throw new Error(`expected display:grid, got ${t.display}`);if(!(t.gridTemplateColumns||""))throw new Error("grid-template-columns is empty")}},i=["GridPresent"];s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};export{s as GridPresent,i as __namedExportsOrder,o as default};
