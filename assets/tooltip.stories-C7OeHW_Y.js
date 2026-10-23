import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./button-DatWLSj0.js";import{n as i,t as a}from"./tooltip-B--FPK2j.js";var o,s,c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{n(),i(),o=t(),s={title:`Components/Tooltip`,component:a,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`Displays contextual information on hover or focus, positioned via Radix Popper with collision-aware placement.`}}},argTypes:{placement:{control:`select`,options:[`top`,`top-start`,`top-end`,`bottom`,`bottom-start`,`bottom-end`,`left`,`left-start`,`left-end`,`right`,`right-start`,`right-end`]},size:{control:`select`,options:[`sm`,`md`,`lg`]},tone:{control:`select`,options:[`default`,`dark`,`info`,`warning`,`danger`,`success`]},arrow:{control:`boolean`}}},c={args:{title:`Save your changes`,children:(0,o.jsx)(r,{variant:`outline`,size:`sm`,children:`Hover me`})}},l={args:{title:`This action cannot be undone`,tone:`danger`,arrow:!0,children:(0,o.jsx)(r,{variant:`outline`,size:`sm`,children:`Delete`})}},u={args:{title:`Saved successfully`,tone:`success`,children:(0,o.jsx)(r,{variant:`outline`,size:`sm`,children:`Save`})}},d={args:{title:`Appears below the trigger`,placement:`bottom`,children:(0,o.jsx)(r,{variant:`outline`,size:`sm`,children:`Hover me`})}},f={args:{title:`No arrow pointer`,arrow:!1,children:(0,o.jsx)(r,{variant:`outline`,size:`sm`,children:`Hover me`})}},p={args:{title:`A larger tooltip for more prominent hints`,size:`lg`,children:(0,o.jsx)(r,{variant:`outline`,size:`sm`,children:`Hover me`})}},m={render:()=>(0,o.jsx)(`div`,{className:`grid grid-cols-3 gap-8 p-16`,children:[`top-start`,`top`,`top-end`,`left`,`right`,`bottom-start`,`bottom`,`bottom-end`].map(e=>(0,o.jsx)(a,{title:e,placement:e,children:(0,o.jsx)(r,{variant:`outline`,size:`sm`,children:e})},e))})},h=[`Default`,`DangerTone`,`SuccessTone`,`BottomPlacement`,`WithoutArrow`,`LargeSize`,`AllPlacements`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Save your changes',
    children: <Button variant="outline" size="sm">Hover me</Button>
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'This action cannot be undone',
    tone: 'danger',
    arrow: true,
    children: <Button variant="outline" size="sm">Delete</Button>
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Saved successfully',
    tone: 'success',
    children: <Button variant="outline" size="sm">Save</Button>
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Appears below the trigger',
    placement: 'bottom',
    children: <Button variant="outline" size="sm">Hover me</Button>
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'No arrow pointer',
    arrow: false,
    children: <Button variant="outline" size="sm">Hover me</Button>
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'A larger tooltip for more prominent hints',
    size: 'lg',
    children: <Button variant="outline" size="sm">Hover me</Button>
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-3 gap-8 p-16">
      {(['top-start', 'top', 'top-end', 'left', 'right', 'bottom-start', 'bottom', 'bottom-end'] as const).map(placement => <Tooltip key={placement} title={placement} placement={placement}>
            <Button variant="outline" size="sm">{placement}</Button>
          </Tooltip>)}
    </div>
}`,...m.parameters?.docs?.source}}}})))()}g();export{m as AllPlacements,d as BottomPlacement,l as DangerTone,c as Default,p as LargeSize,u as SuccessTone,f as WithoutArrow,h as __namedExportsOrder,s as default};