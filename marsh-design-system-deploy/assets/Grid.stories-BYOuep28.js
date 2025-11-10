import{j as e}from"./iframe-B7__wHsY.js";import"./preload-helper-PPVm8Dsz.js";const i={title:"_health/Grid",parameters:{layout:"fullscreen"}},t={render:()=>e.jsx("div",{className:"container",style:{padding:8},children:e.jsxs("div",{className:"row gap-2","data-testid":"row",children:[e.jsx("div",{className:"col-6",style:{background:"#eef6ff",padding:8},children:"A"}),e.jsx("div",{className:"col-6",style:{background:"#eef6ff",padding:8},children:"B"})]})}),play:async({canvasElement:a})=>{const s=a.querySelector('[data-testid="row"]');if(!s)throw new Error("row not found");const r=getComputedStyle(s);if(!r.display.includes("grid"))throw new Error(`expected display:grid, got ${r.display}`);if(!(r.gridTemplateColumns||""))throw new Error("grid-template-columns is empty")}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="container" style={{
    padding: 8
  }}>
      <div className="row gap-2" data-testid="row">
        <div className="col-6" style={{
        background: '#eef6ff',
        padding: 8
      }}>A</div>
        <div className="col-6" style={{
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
}`,...t.parameters?.docs?.source}}};const n=["GridPresent"];export{t as GridPresent,n as __namedExportsOrder,i as default};
