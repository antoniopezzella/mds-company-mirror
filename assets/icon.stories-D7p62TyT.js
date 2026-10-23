import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./icon-CUCT952Y.js";var i;function a(){return(a=e((()=>{i=`info.check_circle.warning.error.close.search.menu.settings.home.person.notifications.add.remove.edit.delete.download.upload.content_copy.arrow_back.arrow_forward.expand_more.expand_less.chevron_right.check.visibility.visibility_off.calendar_today.schedule.filter_list.more_vert.open_in_new.help`.split(`.`)})))()}var o,s,c,l,u,d,f;function p(){return(p=e((()=>{n(),a(),o=t(),s={title:`Foundations/Icons`,component:r,tags:[`autodocs`],argTypes:{name:{control:`text`,description:`Material Symbols ligature name (from the blessed set)`},size:{control:{type:`range`,min:16,max:48,step:2}},fill:{control:`boolean`,description:`FILL axis — the only variable axis in the subset`}},parameters:{docs:{description:{component:"# Icons\n\nGoogle **Material Symbols** (Outlined), self-hosted as a variable font — no\nCDN, works offline and in the published package. Pick a glyph by its\n**ligature name** (`info`, `check_circle`, `warning`); browse the full set at\n[fonts.google.com/icons](https://fonts.google.com/icons).\n\nThe icon inherits `currentColor`, so colour it on a wrapper (or via a role),\nnot on the icon. It renders decorative (`aria-hidden`) by default; pass\n`aria-label` for a standalone meaningful icon."}}}},c={args:{name:`info`,size:24,fill:!1}},l=[{tone:`informational`,name:`info`},{tone:`success`,name:`check_circle`},{tone:`warning`,name:`warning`},{tone:`error`,name:`error`}],u={render:()=>(0,o.jsx)(`div`,{className:`flex flex-wrap gap-6`,children:l.map(({tone:e,name:t})=>(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-1 text-center`,children:[(0,o.jsx)(r,{name:t,size:32,fill:!0}),(0,o.jsx)(`code`,{className:`text-xs`,children:t}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:e})]},e))})},d={render:e=>(0,o.jsx)(`div`,{className:`grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3`,children:i.map(t=>(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2 rounded-lg border p-3 text-center`,children:[(0,o.jsx)(r,{name:t,size:28,fill:e.fill}),(0,o.jsx)(`code`,{className:`truncate text-[11px] w-full`,title:t,children:t})]},t))}),args:{name:`info`,fill:!1}},f=[`Playground`,`StatusIcons`,`Gallery`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'info',
    size: 24,
    fill: false
  }
}`,...c.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}}})))()}p();export{d as Gallery,c as Playground,u as StatusIcons,f as __namedExportsOrder,s as default};