import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./sparkline-DM5BoWbu.js";var i,a,o,s,c,l,u,d,f;function p(){return(p=e((()=>{n(),i=t(),a={title:`Components/Sparkline`,component:r,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# Sparkline\n\nA tiny inline trend line for KPI tiles. It is always `aria-hidden` — the\ntrend is carried by the delta text beside it, not the SVG, so it adds no\nscreen-reader noise. `sentiment` picks the stroke colour from the status\nroles (or pass an explicit `color`). Width always fills the container; set\n`height` in px. A flat series draws down the middle rather than vanishing."}}},argTypes:{sentiment:{control:`radio`,options:[`positive`,`negative`,`neutral`]},height:{control:{type:`number`}}},decorators:[e=>(0,i.jsx)(`div`,{className:`w-40`,children:(0,i.jsx)(e,{})})]},o=[4,6,5,8,7,10,9,12],s=[12,10,11,8,9,6,5,3],c={args:{data:o,sentiment:`positive`,height:40}},l={args:{data:s,sentiment:`negative`,height:40}},u={args:{data:[6,7,6,7,6,7,6,7],sentiment:`neutral`,height:40}},d={args:{data:[5,5,5,5,5],sentiment:`neutral`,height:40}},f=[`Positive`,`Negative`,`Neutral`,`Flat`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    data: rising,
    sentiment: 'positive',
    height: 40
  }
}`,...c.parameters?.docs?.source},description:{story:`An upward trend — the success role.`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    data: falling,
    sentiment: 'negative',
    height: 40
  }
}`,...l.parameters?.docs?.source},description:{story:`A downward trend — the danger role.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    data: [6, 7, 6, 7, 6, 7, 6, 7],
    sentiment: 'neutral',
    height: 40
  }
}`,...u.parameters?.docs?.source},description:{story:`No clear direction — the muted neutral role.`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    data: [5, 5, 5, 5, 5],
    sentiment: 'neutral',
    height: 40
  }
}`,...d.parameters?.docs?.source},description:{story:`A flat series still draws a line (down the middle), rather than disappearing.`,...d.parameters?.docs?.description}}}})))()}p();export{d as Flat,l as Negative,u as Neutral,c as Positive,f as __namedExportsOrder,a as default};