import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./badge-BJRi19uA.js";var i,a,o,s,c,l,u,d,f;function p(){return(p=e((()=>{n(),i=t(),a={title:`Components/Badge`,component:r,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:'Standalone tone-colored label pill — tones map to the MDS "Text Badge" Figma node (7584:27300). `default` (Neutral) and `disabled` each have one fixed visual treatment; every other tone offers three: `outline` (the default — transparent with a tonal border and tonal text), `soft` (light tint + border, Figma\'s "Soft background = Yes") and `solid` (saturated fill, Figma\'s "Soft background = No").\n\n**The default moved from `solid` to `outline`.** A solid pill repeated down every row of a table shouts; an outline annotates. Figma still documents solid as the "Soft background = No" treatment, so the Figma component needs the matching variant added — raise it before treating Figma as the source of truth for this prop.'}}},argTypes:{tone:{control:`select`,options:[`default`,`info`,`success`,`warning`,`danger`,`disabled`],description:`Figma "Type" property. Maps Neutral→default, Informative→info, Positive→success, Notice→warning, Negative→danger.`},variant:{control:`select`,options:[`outline`,`soft`,`solid`],description:"Visual treatment. No effect on `default` or `disabled`, which have a single fixed treatment."},soft:{control:`boolean`,description:'Deprecated (removed after 0.7.0) — use `variant`. `soft` maps to `variant="soft"`, `soft={false}` to `variant="solid"`.',table:{category:`Deprecated`}},size:{control:`select`,options:[`md`,`sm`],description:"`md` (default) is the Figma spec (24px). `sm` (20px) is a non-Figma dense variant for tight rows — e.g. Stepper's per-step status pills."}}},o={args:{children:`Default`,tone:`default`}},s={render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,i.jsx)(r,{tone:`default`,children:`Neutral`}),(0,i.jsx)(r,{tone:`info`,children:`Informative`}),(0,i.jsx)(r,{tone:`success`,children:`Positive`}),(0,i.jsx)(r,{tone:`warning`,children:`Notice`}),(0,i.jsx)(r,{tone:`danger`,children:`Negative`}),(0,i.jsx)(r,{tone:`disabled`,children:`Disabled`})]})},c={render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,i.jsx)(r,{variant:`solid`,tone:`default`,children:`Neutral`}),(0,i.jsx)(r,{variant:`solid`,tone:`info`,children:`Informative`}),(0,i.jsx)(r,{variant:`solid`,tone:`success`,children:`Positive`}),(0,i.jsx)(r,{variant:`solid`,tone:`warning`,children:`Notice`}),(0,i.jsx)(r,{variant:`solid`,tone:`danger`,children:`Negative`}),(0,i.jsx)(r,{variant:`solid`,tone:`disabled`,children:`Disabled`})]})},l={render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,i.jsx)(r,{tone:`default`,soft:!0,children:`Neutral`}),(0,i.jsx)(r,{tone:`info`,soft:!0,children:`Informative`}),(0,i.jsx)(r,{tone:`success`,soft:!0,children:`Positive`}),(0,i.jsx)(r,{tone:`warning`,soft:!0,children:`Notice`}),(0,i.jsx)(r,{tone:`danger`,soft:!0,children:`Negative`}),(0,i.jsx)(r,{tone:`disabled`,soft:!0,children:`Disabled`})]})},u={parameters:{docs:{description:{story:"`md` (default) is the Figma spec — 24px tall, 8px padding, 8px radius, 14px text. `sm` is a non-Figma dense variant (20px / 12px text) for tight rows, such as `Stepper`'s per-step status pills; raise a Figma-side variant request before leaning on it widely."}}},render:()=>(0,i.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,i.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,i.jsx)(r,{tone:`info`,soft:!0,children:`Informative`}),(0,i.jsx)(r,{tone:`success`,soft:!0,children:`Positive`}),(0,i.jsx)(r,{tone:`danger`,soft:!0,children:`Negative`}),(0,i.jsx)(`span`,{className:`text-xs opacity-60`,children:`md (Figma spec)`})]}),(0,i.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,i.jsx)(r,{tone:`info`,soft:!0,size:`sm`,children:`Informative`}),(0,i.jsx)(r,{tone:`success`,soft:!0,size:`sm`,children:`Positive`}),(0,i.jsx)(r,{tone:`danger`,soft:!0,size:`sm`,children:`Negative`}),(0,i.jsx)(`span`,{className:`text-xs opacity-60`,children:`sm (dense)`})]})]})},d={render:()=>(0,i.jsxs)(`div`,{className:`flex items-center gap-2 text-sm`,children:[(0,i.jsx)(`span`,{children:`Policy #POL-40213`}),(0,i.jsx)(r,{tone:`success`,children:`Active`})]})},f=[`Default`,`Outline`,`Solid`,`Soft`,`Sizes`,`InContext`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Default',
    tone: 'default'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge tone="default">Neutral</Badge>
      <Badge tone="info">Informative</Badge>
      <Badge tone="success">Positive</Badge>
      <Badge tone="warning">Notice</Badge>
      <Badge tone="danger">Negative</Badge>
      <Badge tone="disabled">Disabled</Badge>
    </div>
}`,...s.parameters?.docs?.source},description:{story:"`outline` — the default. Transparent, so the badge sits on whatever surface\nit lands on (a table row, a striped row, a card) without fighting it; the\nborder carries the tone.\n\nNote `warning`'s label is not gold. `status.warning.fg` measures 3.41:1 on\nwhite — under AA — and the gold ramp has no darker step, so the text falls\nback to `text.primary` and the gold border carries the tone instead.",...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge variant="solid" tone="default">Neutral</Badge>
      <Badge variant="solid" tone="info">Informative</Badge>
      <Badge variant="solid" tone="success">Positive</Badge>
      <Badge variant="solid" tone="warning">Notice</Badge>
      <Badge variant="solid" tone="danger">Negative</Badge>
      <Badge variant="solid" tone="disabled">Disabled</Badge>
    </div>
}`,...c.parameters?.docs?.source},description:{story:'`variant="solid"`: solid, saturated fill — Figma\'s "Soft background = No".',...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge tone="default" soft>Neutral</Badge>
      <Badge tone="info" soft>Informative</Badge>
      <Badge tone="success" soft>Positive</Badge>
      <Badge tone="warning" soft>Notice</Badge>
      <Badge tone="danger" soft>Negative</Badge>
      <Badge tone="disabled" soft>Disabled</Badge>
    </div>
}`,...l.parameters?.docs?.source},description:{story:`\`soft=true\`: light tint + colored border + dark text — Figma's "Soft background = Yes". Neutral and Disabled have no soft variant in Figma, so they're identical to Solid above.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`md\` (default) is the Figma spec — 24px tall, 8px padding, 8px radius, 14px text. \`sm\` is a non-Figma dense variant (20px / 12px text) for tight rows, such as \`Stepper\`\\'s per-step status pills; raise a Figma-side variant request before leaning on it widely.'
      }
    }
  },
  render: () => <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="info" soft>Informative</Badge>
        <Badge tone="success" soft>Positive</Badge>
        <Badge tone="danger" soft>Negative</Badge>
        <span className="text-xs opacity-60">md (Figma spec)</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="info" soft size="sm">Informative</Badge>
        <Badge tone="success" soft size="sm">Positive</Badge>
        <Badge tone="danger" soft size="sm">Negative</Badge>
        <span className="text-xs opacity-60">sm (dense)</span>
      </div>
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2 text-sm">
      <span>Policy #POL-40213</span>
      <Badge tone="success">Active</Badge>
    </div>
}`,...d.parameters?.docs?.source}}}})))()}p();export{o as Default,d as InContext,s as Outline,u as Sizes,l as Soft,c as Solid,f as __namedExportsOrder,a as default};