import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./error-state-D4Yg2Y8I.js";var r,i,a,o,s;function c(){return(c=e((()=>{t(),r={title:`Components/Error State`,component:n,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:'# Error State\n\nThe failure state for a data surface. The root is `role="alert"`, so a dead\nfetch is *announced* rather than silently reading as "No data yet" —\nindistinguishable from a genuinely empty result, the worst dashboard failure\nmode. The title is a `<div>`, never a heading, so dropping one into a table\nor card at any depth can\'t break heading order.\n\nPass `title` / `description` / `onRetry` for the standard `DataError`\ncomposition shown here; use the slot components (`ErrorStateHeader`,\n`ErrorStateMedia`, …) when you need full control.'}}},argTypes:{variant:{control:`radio`,options:[`block`,`inline`]}}},i={args:{}},a={args:{title:`Could not load claims`,description:`The request timed out before the server responded.`,detail:`trace-id: 7f3a9c2`,onRetry:()=>{}}},o={args:{variant:`inline`,title:`Failed to load`,description:`Retry in a moment.`,onRetry:()=>{}}},s=[`Default`,`WithRetry`,`Inline`],i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...i.parameters?.docs?.source},description:{story:`The default message, with no recovery action.`,...i.parameters?.docs?.description}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Could not load claims',
    description: 'The request timed out before the server responded.',
    detail: 'trace-id: 7f3a9c2',
    onRetry: () => {}
  }
}`,...a.parameters?.docs?.source},description:{story:`With a retry action — the prop worth passing, since a dashboard failure is
almost always transient. When \`onRetry\` is absent no button renders at all,
rather than a disabled one.`,...a.parameters?.docs?.description}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'inline',
    title: 'Failed to load',
    description: 'Retry in a moment.',
    onRetry: () => {}
  }
}`,...o.parameters?.docs?.source},description:{story:`Compact row, for inside a card or KPI tile where a full block is absurd.`,...o.parameters?.docs?.description}}}})))()}c();export{i as Default,o as Inline,a as WithRetry,s as __namedExportsOrder,r as default};