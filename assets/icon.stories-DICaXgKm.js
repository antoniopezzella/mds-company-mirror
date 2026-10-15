import{Z as e}from"./iframe-CPBTUrEW.js";import{I as t}from"./icon-DHMG4hzi.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";const l=["info","check_circle","warning","error","close","search","menu","settings","home","person","notifications","add","remove","edit","delete","download","upload","content_copy","arrow_back","arrow_forward","expand_more","expand_less","chevron_right","check","visibility","visibility_off","calendar_today","schedule","filter_list","more_vert","open_in_new","help"],f={title:"Foundations/Icons",component:t,tags:["autodocs"],argTypes:{name:{control:"text",description:"Material Symbols ligature name (from the blessed set)"},size:{control:{type:"range",min:16,max:48,step:2}},fill:{control:"boolean",description:"FILL axis — the only variable axis in the subset"}},parameters:{docs:{description:{component:"# Icons\n\nGoogle **Material Symbols** (Outlined), self-hosted as a variable font — no\nCDN, works offline and in the published package. Pick a glyph by its\n**ligature name** (`info`, `check_circle`, `warning`); browse the full set at\n[fonts.google.com/icons](https://fonts.google.com/icons).\n\nThe icon inherits `currentColor`, so colour it on a wrapper (or via a role),\nnot on the icon. It renders decorative (`aria-hidden`) by default; pass\n`aria-label` for a standalone meaningful icon."}}}},r={args:{name:"info",size:24,fill:!1}},i=[{tone:"informational",name:"info"},{tone:"success",name:"check_circle"},{tone:"warning",name:"warning"},{tone:"error",name:"error"}],s={render:()=>e.jsx("div",{className:"flex flex-wrap gap-6",children:i.map(({tone:a,name:n})=>e.jsxs("div",{className:"flex flex-col items-center gap-1 text-center",children:[e.jsx(t,{name:n,size:32,fill:!0}),e.jsx("code",{className:"text-xs",children:n}),e.jsx("span",{className:"text-xs text-muted-foreground",children:a})]},a))})},o={render:a=>e.jsx("div",{className:"grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3",children:l.map(n=>e.jsxs("div",{className:"flex flex-col items-center gap-2 rounded-lg border p-3 text-center",children:[e.jsx(t,{name:n,size:28,fill:a.fill}),e.jsx("code",{className:"truncate text-[11px] w-full",title:n,children:n})]},n))}),args:{name:"info",fill:!1}},x=["Playground","StatusIcons","Gallery"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'info',
    size: 24,
    fill: false
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-6">
      {STATUS.map(({
      tone,
      name
    }) => <div key={tone} className="flex flex-col items-center gap-1 text-center">
          <Icon name={name} size={32} fill />
          <code className="text-xs">{name}</code>
          <span className="text-xs text-muted-foreground">{tone}</span>
        </div>)}
    </div>
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: (args: IconProps) => <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
      {ICON_NAMES.map(name => <div key={name} className="flex flex-col items-center gap-2 rounded-lg border p-3 text-center">
          <Icon name={name} size={28} fill={args.fill} />
          <code className="truncate text-[11px] w-full" title={name}>{name}</code>
        </div>)}
    </div>,
  args: {
    name: 'info',
    fill: false
  }
}`,...o.parameters?.docs?.source}}};export{o as Gallery,r as Playground,s as StatusIcons,x as __namedExportsOrder,f as default};
