import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./stack-BlYcYnw2.js";import{n as o,o as s,r as c,s as l}from"./filters-operators-McHzY1C8.js";function u({field:e,operator:t}){let[n,r]=d.useState(void 0);return(0,f.jsx)(`div`,{className:`w-fit rounded-lg border p-3`,children:(0,f.jsx)(s,{field:e,operator:t?o(e.type,t):void 0,value:n,onChange:r})})}var d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N;function P(){return(P=t((()=>{d=e(n(),1),l(),c(),a(),f=r(),{expect:p,userEvent:m,within:h}=__STORYBOOK_MODULE_TEST__,g={title:`Components/Filters Value Editor`,component:s,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`The third segment of a condition — the control a user actually types into.

Which control renders is decided by the **field type and the operator together**, not
the type alone: \`is\` on a select is one option, \`is any of\` is several, and \`between\`
on a number is two bounds rather than one. That is why this cannot be a lookup table
keyed on type.

These states had no visual surface at all until now — the editor was reachable only
by opening a popover inside another story, so its error and empty states were never
reviewable.`}}}},_={id:`premium`,label:`Premium`,type:`number`,unit:`currency`},v={id:`city`,label:`City`,type:`text`,placeholder:`e.g. Rio`},y={id:`renewal`,label:`Renewal`,type:`date`},b={id:`bound`,label:`Bound`,type:`boolean`,trueLabel:`Bound`,falseLabel:`Unbound`},x={id:`status`,label:`Status`,type:`select`,options:[{value:`A`,label:`Active`},{value:`P`,label:`Pending`},{value:`E`,label:`Expired`},{value:`X`,label:`Cancelled`,disabled:!0}]},S={id:`tags`,label:`Tags`,type:`multiselect`,options:[`Flood`,`Wind`,`Quake`,`Fire`,`Theft`,`Cyber`,`Marine`,`Aviation`,`Motor`].map(e=>({value:e.toLowerCase(),label:e}))},C={render:()=>(0,f.jsx)(u,{field:v,operator:`is`})},w={render:()=>(0,f.jsx)(u,{field:_,operator:`gt`})},T={render:()=>(0,f.jsx)(u,{field:_,operator:`between`})},E={render:()=>(0,f.jsx)(u,{field:_,operator:`between`}),play:async({canvasElement:e})=>{let t=h(e);await m.type(t.getByRole(`textbox`,{name:/Minimum/}),`90`),await m.type(t.getByRole(`textbox`,{name:/Maximum/}),`10`),await m.click(t.getByRole(`button`,{name:`Apply`}));let n=await t.findByRole(`alert`);await p(n).toHaveTextContent(/greater than or equal/i)}},D={render:()=>(0,f.jsx)(u,{field:y,operator:`between`})},O={render:()=>(0,f.jsx)(u,{field:b,operator:`is`})},k={render:()=>(0,f.jsx)(u,{field:x,operator:`is`})},A={render:()=>(0,f.jsx)(u,{field:x,operator:`any_of`})},j={render:()=>(0,f.jsx)(u,{field:S,operator:`contains_any`}),play:async({canvasElement:e})=>{let t=h(e);await p(t.getByRole(`textbox`,{name:/Search Tags options/})).toBeInTheDocument()}},M={render:()=>(0,f.jsxs)(i,{gap:4,children:[(0,f.jsx)(u,{field:v,operator:`is`}),(0,f.jsx)(u,{field:_,operator:`between`}),(0,f.jsx)(u,{field:x,operator:`any_of`}),(0,f.jsx)(u,{field:b,operator:`is`})]})},N=[`Text`,`Currency`,`NumericRange`,`RangeValidationError`,`DateRange`,`Boolean`,`SingleSelect`,`MultiSelect`,`LongListWithSearch`,`AllControls`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={city} operator="is" />
}`,...C.parameters?.docs?.source},description:{story:`Free text. Commits on Apply, never per keystroke.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={money} operator="gt" />
}`,...w.parameters?.docs?.source},description:{story:`The unit is stated, so "over 500000" cannot be read as anything else.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={money} operator="between" />
}`,...T.parameters?.docs?.source},description:{story:`**Two bounds, not one** — chosen by the operator, not the type. Either bound
may be left blank.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={money} operator="between" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox', {
      name: /Minimum/
    }), '90');
    await userEvent.type(canvas.getByRole('textbox', {
      name: /Maximum/
    }), '10');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Apply'
    }));
    const alert = await canvas.findByRole('alert');
    await expect(alert).toHaveTextContent(/greater than or equal/i);
  }
}`,...E.parameters?.docs?.source},description:{story:`**§43 in practice.** A range whose maximum is below its minimum matches
nothing, and saying so beats returning an empty table with no explanation.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={renewal} operator="between" />
}`,...D.parameters?.docs?.source},description:{story:"Stored as `YYYY-MM-DD`, never a `Date` — a Date does not survive a URL.",...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={bound} operator="is" />
}`,...O.parameters?.docs?.source},description:{story:`Domain words, not Yes and No. One tab stop; arrows move within it.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={status} operator="is" />
}`,...k.parameters?.docs?.source},description:{story:`Single select closes on choose (§26). A disabled option is shown, not hidden.`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={status} operator="any_of" />
}`,...A.parameters?.docs?.source},description:{story:`Multi-select stays open, so picking three values is not three reopens (§27).`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={tags} operator="contains_any" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox', {
      name: /Search Tags options/
    })).toBeInTheDocument();
  }
}`,...j.parameters?.docs?.source},description:{story:`Past eight options a search box appears — below that it would be clutter.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={4}>
      <Live field={city} operator="is" />
      <Live field={money} operator="between" />
      <Live field={status} operator="any_of" />
      <Live field={bound} operator="is" />
    </Stack>
}`,...M.parameters?.docs?.source},description:{story:`Every control side by side, for comparing density and alignment.`,...M.parameters?.docs?.description}}}})))()}P();export{M as AllControls,O as Boolean,w as Currency,D as DateRange,j as LongListWithSearch,A as MultiSelect,T as NumericRange,E as RangeValidationError,k as SingleSelect,C as Text,N as __namedExportsOrder,g as default};