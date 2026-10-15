import{Z as e}from"./iframe-CPBTUrEW.js";import{S as d}from"./stat-card-C72rmxDN.js";import{B as i,a as l}from"./bubble-Dp6O7Hty.js";import{M as o}from"./marker-QLQD5vmK.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./format-B1LeFV3Y.js";import"./format-context-Caqi-Gt1.js";import"./data-state-CIGJqc-1.js";import"./empty-DcTcGUY7.js";import"./index-Dk2lMVn3.js";import"./button-_tNb_vhW.js";import"./index-DTX6ga2Q.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./triangle-alert-CBFJXkB-.js";import"./spinner-CUjZIesC.js";import"./search-x-BoD6M5tN.js";import"./skeleton-C-ZAhKi4.js";import"./arrow-right-DRUl2urG.js";const L={title:"Health/Border Contrast",parameters:{layout:"fullscreen",a11y:{config:{rules:[{id:"scrollable-region-focusable",enabled:!1},{id:"color-contrast",enabled:!1}]}},docs:{description:{component:"# Border Contrast — health check\n\nThe shared `--border` CSS variable (src/index.css) fails WCAG\nnon-text contrast (3:1) in BOTH modes: 1.40:1 light (#dadada on white),\n1.84:1 dark (#404040 on #101010). It's the default border color for the whole primitive layer — at least 6 real components reference it\ndirectly (StatCard, Bubble, Marker, Drawer, MessageScroller,\nQuestionnaire), likely more implicitly.\n\nMDS's own `border.default` role already resolves to a working value —\n`neutral500` / `#878787`, deliberately used **unchanged in both modes**\n(marked `// pivot — unchanged` in semantic-tokens.ts: 3.59:1 light,\n5.30:1 dark). `--input`'s own code comment even says `MDS: border.default`\nalready — it was just never actually set to that role's real value. This\npage renders real components side by side: **current** (broken) vs\n**proposed** (border.default's real value) — same HSL both modes, not two\ndifferent ones. The proposed zones override `--border` locally via inline\nstyle — nothing in index.css is touched by this story."}}}},r={padding:24,minHeight:320};function c({label:a,extraClass:s=""}){return e.jsx("div",{className:`rounded border border-border bg-background p-4 text-sm text-foreground ${s}`,children:a})}function n(){return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(d,{label:"Total Revenue",value:"$1,250.00",change:"+12.5%",trend:"up",trendDescription:"Trending up this month",description:"Visitors for the last 6 months"}),e.jsx(i,{variant:"outline",align:"start",children:e.jsx(l,{children:"Outline bubble — border-border on bubble-content"})}),e.jsx("div",{className:"rounded-md border border-border bg-background p-4",children:e.jsx(o,{variant:"border",children:'Marker — variant="border" (border-b border-border)'})}),e.jsx("div",{className:"rounded-md border border-border bg-background p-4",children:e.jsx(o,{variant:"separator",children:"before/after separator"})}),e.jsx(c,{label:"Questionnaire choice pill (border border-border)"}),e.jsx("div",{className:"flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md",children:"↓"}),e.jsx("div",{className:"rounded-t-xl border-t border-border bg-background p-4 text-sm text-foreground",children:"Drawer content edge (border-border)"})]})}const t={render:()=>e.jsxs("div",{className:"grid grid-cols-1 gap-px bg-neutral-300 md:grid-cols-2",children:[e.jsxs("div",{style:r,className:"bg-white",children:[e.jsx("p",{className:"mb-4 font-mono text-xs uppercase tracking-wide text-neutral-500",children:"Light · current (--border: 0 0% 85% · #dadada · 1.40:1)"}),e.jsx(n,{})]}),e.jsxs("div",{style:{...r,"--border":"0 0% 53%"},className:"bg-white",children:[e.jsx("p",{className:"mb-4 font-mono text-xs uppercase tracking-wide text-neutral-500",children:"Light · proposed (--border: 0 0% 53% · neutral500 · #878787 · 3.59:1)"}),e.jsx(n,{})]}),e.jsxs("div",{style:r,className:"dark bg-[#101010]",children:[e.jsx("p",{className:"mb-4 font-mono text-xs uppercase tracking-wide text-neutral-400",children:"Dark · current (--border: 0 0% 25% · #404040 · 1.84:1)"}),e.jsx(n,{})]}),e.jsxs("div",{style:{...r,"--border":"0 0% 53%"},className:"dark bg-[#101010]",children:[e.jsx("p",{className:"mb-4 font-mono text-xs uppercase tracking-wide text-neutral-400",children:"Dark · proposed (--border: 0 0% 53% · neutral500, same value · #878787 · 5.30:1)"}),e.jsx(n,{})]})]})},z=["Comparison"];t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 gap-px bg-neutral-300 md:grid-cols-2">
      {/* LIGHT — current */}
      <div style={zoneBase} className="bg-white">
        <p className="mb-4 font-mono text-xs uppercase tracking-wide text-neutral-500">
          Light · current (--border: 0 0% 85% · #dadada · 1.40:1)
        </p>
        <ComponentSet />
      </div>

      {/* LIGHT — proposed: neutral500 (#878787), the SAME value border.default
          already uses successfully in both modes ("pivot — unchanged" in
          semantic-tokens.ts) — not a new color choice. */}
      <div style={{
      ...zoneBase,
      ['--border' as string]: '0 0% 53%'
    }} className="bg-white">
        <p className="mb-4 font-mono text-xs uppercase tracking-wide text-neutral-500">
          Light · proposed (--border: 0 0% 53% · neutral500 · #878787 · 3.59:1)
        </p>
        <ComponentSet />
      </div>

      {/* DARK — current */}
      <div style={zoneBase} className="dark bg-[#101010]">
        <p className="mb-4 font-mono text-xs uppercase tracking-wide text-neutral-400">
          Dark · current (--border: 0 0% 25% · #404040 · 1.84:1)
        </p>
        <ComponentSet />
      </div>

      {/* DARK — proposed: same neutral500 value as light, not a separate
          dark-mode step — border.default's own design already proved a
          single value works in both directions (3.59:1 light, 5.30:1 dark). */}
      <div style={{
      ...zoneBase,
      ['--border' as string]: '0 0% 53%'
    }} className="dark bg-[#101010]">
        <p className="mb-4 font-mono text-xs uppercase tracking-wide text-neutral-400">
          Dark · proposed (--border: 0 0% 53% · neutral500, same value · #878787 · 5.30:1)
        </p>
        <ComponentSet />
      </div>
    </div>
}`,...t.parameters?.docs?.source}}};export{t as Comparison,z as __namedExportsOrder,L as default};
