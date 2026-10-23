import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./stat-card-D5mE16X2.js";import{a as i,n as a,t as o}from"./bubble-2eDDXMij.js";import{i as s,t as c}from"./marker-COe4d890.js";function l({label:e,extraClass:t=``}){return(0,d.jsx)(`div`,{className:`rounded border border-border bg-background p-4 text-sm text-foreground ${t}`,children:e})}function u(){return(0,d.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,d.jsx)(r,{label:`Total Revenue`,value:`$1,250.00`,change:`+12.5%`,trend:`up`,trendDescription:`Trending up this month`,description:`Visitors for the last 6 months`}),(0,d.jsx)(o,{variant:`outline`,align:`start`,children:(0,d.jsx)(a,{children:`Outline bubble — border-border on bubble-content`})}),(0,d.jsx)(`div`,{className:`rounded-md border border-border bg-background p-4`,children:(0,d.jsx)(c,{variant:`border`,children:`Marker — variant="border" (border-b border-border)`})}),(0,d.jsx)(`div`,{className:`rounded-md border border-border bg-background p-4`,children:(0,d.jsx)(c,{variant:`separator`,children:`before/after separator`})}),(0,d.jsx)(l,{label:`Questionnaire choice pill (border border-border)`}),(0,d.jsx)(`div`,{className:`flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md`,children:`↓`}),(0,d.jsx)(`div`,{className:`rounded-t-xl border-t border-border bg-background p-4 text-sm text-foreground`,children:`Drawer content edge (border-border)`})]})}var d,f,p,m,h;function g(){return(g=e((()=>{n(),i(),s(),d=t(),f={title:`Health/Border Contrast`,parameters:{layout:`fullscreen`,a11y:{config:{rules:[{id:`scrollable-region-focusable`,enabled:!1},{id:`color-contrast`,enabled:!1}]}},docs:{description:{component:`# Border Contrast — health check

The shared \`--border\` CSS variable (src/index.css) fails WCAG
non-text contrast (3:1) in BOTH modes: 1.40:1 light (#dadada on white),
1.84:1 dark (#404040 on #101010). It's the default border color for the whole primitive layer — at least 6 real components reference it
directly (StatCard, Bubble, Marker, Drawer, MessageScroller,
Questionnaire), likely more implicitly.

MDS's own \`border.default\` role already resolves to a working value —
\`neutral500\` / \`#878787\`, deliberately used **unchanged in both modes**
(marked \`// pivot — unchanged\` in semantic-tokens.ts: 3.59:1 light,
5.30:1 dark). \`--input\`'s own code comment even says \`MDS: border.default\`
already — it was just never actually set to that role's real value. This
page renders real components side by side: **current** (broken) vs
**proposed** (border.default's real value) — same HSL both modes, not two
different ones. The proposed zones override \`--border\` locally via inline
style — nothing in index.css is touched by this story.`}}}},p={padding:24,minHeight:320},m={render:()=>(0,d.jsxs)(`div`,{className:`grid grid-cols-1 gap-px bg-neutral-300 md:grid-cols-2`,children:[(0,d.jsxs)(`div`,{style:p,className:`bg-white`,children:[(0,d.jsx)(`p`,{className:`mb-4 font-mono text-xs uppercase tracking-wide text-neutral-500`,children:`Light · current (--border: 0 0% 85% · #dadada · 1.40:1)`}),(0,d.jsx)(u,{})]}),(0,d.jsxs)(`div`,{style:{...p,"--border":`0 0% 53%`},className:`bg-white`,children:[(0,d.jsx)(`p`,{className:`mb-4 font-mono text-xs uppercase tracking-wide text-neutral-500`,children:`Light · proposed (--border: 0 0% 53% · neutral500 · #878787 · 3.59:1)`}),(0,d.jsx)(u,{})]}),(0,d.jsxs)(`div`,{style:p,className:`dark bg-[#101010]`,children:[(0,d.jsx)(`p`,{className:`mb-4 font-mono text-xs uppercase tracking-wide text-neutral-400`,children:`Dark · current (--border: 0 0% 25% · #404040 · 1.84:1)`}),(0,d.jsx)(u,{})]}),(0,d.jsxs)(`div`,{style:{...p,"--border":`0 0% 53%`},className:`dark bg-[#101010]`,children:[(0,d.jsx)(`p`,{className:`mb-4 font-mono text-xs uppercase tracking-wide text-neutral-400`,children:`Dark · proposed (--border: 0 0% 53% · neutral500, same value · #878787 · 5.30:1)`}),(0,d.jsx)(u,{})]})]})},h=[`Comparison`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}}})))()}g();export{m as Comparison,h as __namedExportsOrder,f as default};