import{Z as e}from"./iframe-CPBTUrEW.js";import{B as t}from"./badge-J44eyYsr.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";const m={title:"Components/Badge",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Standalone tone-colored label pill — tones map to the MDS "Text Badge" Figma node (7584:27300). `default` (Neutral) and `disabled` each have one fixed visual treatment; every other tone offers three: `outline` (the default — transparent with a tonal border and tonal text), `soft` (light tint + border, Figma\'s "Soft background = Yes") and `solid` (saturated fill, Figma\'s "Soft background = No").\n\n**The default moved from `solid` to `outline`.** A solid pill repeated down every row of a table shouts; an outline annotates. Figma still documents solid as the "Soft background = No" treatment, so the Figma component needs the matching variant added — raise it before treating Figma as the source of truth for this prop.'}}},argTypes:{tone:{control:"select",options:["default","info","success","warning","danger","disabled"],description:'Figma "Type" property. Maps Neutral→default, Informative→info, Positive→success, Notice→warning, Negative→danger.'},variant:{control:"select",options:["outline","soft","solid"],description:"Visual treatment. No effect on `default` or `disabled`, which have a single fixed treatment."},soft:{control:"boolean",description:'Deprecated (removed after 0.7.0) — use `variant`. `soft` maps to `variant="soft"`, `soft={false}` to `variant="solid"`.',table:{category:"Deprecated"}},size:{control:"select",options:["md","sm"],description:"`md` (default) is the Figma spec (24px). `sm` (20px) is a non-Figma dense variant for tight rows — e.g. Stepper's per-step status pills."}}},r={args:{children:"Default",tone:"default"}},a={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(t,{tone:"default",children:"Neutral"}),e.jsx(t,{tone:"info",children:"Informative"}),e.jsx(t,{tone:"success",children:"Positive"}),e.jsx(t,{tone:"warning",children:"Notice"}),e.jsx(t,{tone:"danger",children:"Negative"}),e.jsx(t,{tone:"disabled",children:"Disabled"})]})},s={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(t,{variant:"solid",tone:"default",children:"Neutral"}),e.jsx(t,{variant:"solid",tone:"info",children:"Informative"}),e.jsx(t,{variant:"solid",tone:"success",children:"Positive"}),e.jsx(t,{variant:"solid",tone:"warning",children:"Notice"}),e.jsx(t,{variant:"solid",tone:"danger",children:"Negative"}),e.jsx(t,{variant:"solid",tone:"disabled",children:"Disabled"})]})},n={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(t,{tone:"default",soft:!0,children:"Neutral"}),e.jsx(t,{tone:"info",soft:!0,children:"Informative"}),e.jsx(t,{tone:"success",soft:!0,children:"Positive"}),e.jsx(t,{tone:"warning",soft:!0,children:"Notice"}),e.jsx(t,{tone:"danger",soft:!0,children:"Negative"}),e.jsx(t,{tone:"disabled",soft:!0,children:"Disabled"})]})},o={parameters:{docs:{description:{story:"`md` (default) is the Figma spec — 24px tall, 8px padding, 8px radius, 14px text. `sm` is a non-Figma dense variant (20px / 12px text) for tight rows, such as `Stepper`'s per-step status pills; raise a Figma-side variant request before leaning on it widely."}}},render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(t,{tone:"info",soft:!0,children:"Informative"}),e.jsx(t,{tone:"success",soft:!0,children:"Positive"}),e.jsx(t,{tone:"danger",soft:!0,children:"Negative"}),e.jsx("span",{className:"text-xs opacity-60",children:"md (Figma spec)"})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(t,{tone:"info",soft:!0,size:"sm",children:"Informative"}),e.jsx(t,{tone:"success",soft:!0,size:"sm",children:"Positive"}),e.jsx(t,{tone:"danger",soft:!0,size:"sm",children:"Negative"}),e.jsx("span",{className:"text-xs opacity-60",children:"sm (dense)"})]})]})},i={render:()=>e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("span",{children:"Policy #POL-40213"}),e.jsx(t,{tone:"success",children:"Active"})]})},f=["Default","Outline","Solid","Soft","Sizes","InContext"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Default',
    tone: 'default'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge tone="default">Neutral</Badge>
      <Badge tone="info">Informative</Badge>
      <Badge tone="success">Positive</Badge>
      <Badge tone="warning">Notice</Badge>
      <Badge tone="danger">Negative</Badge>
      <Badge tone="disabled">Disabled</Badge>
    </div>
}`,...a.parameters?.docs?.source},description:{story:"`outline` — the default. Transparent, so the badge sits on whatever surface\nit lands on (a table row, a striped row, a card) without fighting it; the\nborder carries the tone.\n\nNote `warning`'s label is not gold. `status.warning.fg` measures 3.41:1 on\nwhite — under AA — and the gold ramp has no darker step, so the text falls\nback to `text.primary` and the gold border carries the tone instead.",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge variant="solid" tone="default">Neutral</Badge>
      <Badge variant="solid" tone="info">Informative</Badge>
      <Badge variant="solid" tone="success">Positive</Badge>
      <Badge variant="solid" tone="warning">Notice</Badge>
      <Badge variant="solid" tone="danger">Negative</Badge>
      <Badge variant="solid" tone="disabled">Disabled</Badge>
    </div>
}`,...s.parameters?.docs?.source},description:{story:'`variant="solid"`: solid, saturated fill — Figma\'s "Soft background = No".',...s.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge tone="default" soft>Neutral</Badge>
      <Badge tone="info" soft>Informative</Badge>
      <Badge tone="success" soft>Positive</Badge>
      <Badge tone="warning" soft>Notice</Badge>
      <Badge tone="danger" soft>Negative</Badge>
      <Badge tone="disabled" soft>Disabled</Badge>
    </div>
}`,...n.parameters?.docs?.source},description:{story:"`soft=true`: light tint + colored border + dark text — Figma's \"Soft background = Yes\". Neutral and Disabled have no soft variant in Figma, so they're identical to Solid above.",...n.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2 text-sm">
      <span>Policy #POL-40213</span>
      <Badge tone="success">Active</Badge>
    </div>
}`,...i.parameters?.docs?.source}}};export{r as Default,i as InContext,a as Outline,o as Sizes,n as Soft,s as Solid,f as __namedExportsOrder,m as default};
