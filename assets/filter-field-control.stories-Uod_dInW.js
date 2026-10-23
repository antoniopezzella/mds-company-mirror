import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./filter-field-control-DQ8wxZeI.js";import{n as o,r as s}from"./stack-BlYcYnw2.js";function c({field:e,initial:t,...n}){let[r,i]=l.useState(t);return(0,u.jsx)(a,{field:e,value:r,onValueChange:i,...n})}var l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=t((()=>{l=e(n(),1),i(),s(),u=r(),{expect:d,userEvent:f,within:p}=__STORYBOOK_MODULE_TEST__,m={title:`Components/FilterFieldControl`,component:a,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Renders the correct control for a `FilterField` definition — text input, single select,\nmulti-select, date range, number range or boolean — so a filter is described once and\nreused by `DataGridToolbar`, `DataTable`, `FilterBar` and any hand-built toolbar.\n\n**Stateless by design.** It never stores the value; `value` in, `onValueChange` out.\nEvery story below owns its own `useState`, which is exactly what a consumer does."}}},argTypes:{field:{description:'The filter definition. Its `type` alone decides which control renders — there is no separate "control" prop to keep in sync.',table:{type:{summary:`FilterField`}}},value:{description:"The current value, owned by the caller. Shape follows the field type: `string` for text/select, `string[]` for multi, `{from,to}` for dateRange, `{min,max}` for numberRange, `boolean` for boolean.",table:{type:{summary:`unknown`}}},onValueChange:{description:`Fired with the next value. The caller decides what it means.`,table:{type:{summary:`(value: unknown) => void`}},action:`valueChange`},size:{description:`Control height, shared with Button and Input (sm 32 / md 40 / lg 48).`,control:`inline-radio`,options:[`sm`,`md`,`lg`],table:{defaultValue:{summary:`md`}}},disabled:{description:`Disables the rendered control, whichever type it is.`,control:`boolean`,table:{defaultValue:{summary:`false`}}}}},h={id:`policy`,label:`Policy number`,type:`text`,placeholder:`e.g. POL-4471`},g={id:`status`,label:`Status`,type:`select`,options:[{value:`active`,label:`Active`,count:128},{value:`pending`,label:`Pending`,count:12},{value:`expired`,label:`Expired`,count:4}]},_={id:`line`,label:`Line of business`,type:`multi`,options:[{value:`property`,label:`Property`},{value:`casualty`,label:`Casualty`},{value:`marine`,label:`Marine`},{value:`cyber`,label:`Cyber`}]},v={id:`premium`,label:`Premium`,type:`numberRange`,unit:`currency`},y={id:`renewal`,label:`Up for renewal`,type:`boolean`},b={id:`inception`,label:`Inception date`,type:`dateRange`},x={render:()=>(0,u.jsx)(c,{field:h,initial:``}),play:async({canvasElement:e,step:t})=>{let n=p(e);await t(`typing reaches the caller, which feeds it back as the value`,async()=>{let e=n.getByRole(`textbox`);await f.type(e,`POL-4471`),await d(e).toHaveValue(`POL-4471`)})}},S={render:()=>(0,u.jsx)(c,{field:g}),play:async({canvasElement:e,step:t})=>{let n=p(e);await t(`the trigger is named by the field label`,async()=>{await d(n.getByText(/Status/i)).toBeInTheDocument()})}},C={render:()=>(0,u.jsx)(c,{field:_,initial:[`property`]})},w={render:()=>(0,u.jsx)(c,{field:v,initial:{}})},T={render:()=>(0,u.jsx)(c,{field:y})},E={name:`Date range`,render:()=>(0,u.jsx)(c,{field:b,initial:{}})},D={render:()=>(0,u.jsx)(o,{gap:4,children:[h,g,_,v,y,b].map(e=>(0,u.jsx)(c,{field:e,initial:e.type===`multi`?[]:void 0},e.id))})},O={render:()=>(0,u.jsx)(o,{gap:4,children:[`sm`,`md`,`lg`].map(e=>(0,u.jsx)(c,{field:g,size:e},e))})},k={render:()=>(0,u.jsxs)(o,{gap:4,children:[(0,u.jsx)(c,{field:h,initial:`POL-4471`,disabled:!0}),(0,u.jsx)(c,{field:g,initial:`active`,disabled:!0})]})},A=[`Text`,`Select`,`Multi`,`NumberRange`,`Boolean`,`DateRangeField`,`AllTypes`,`Sizes`,`Disabled`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Controlled field={TEXT} initial="" />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('typing reaches the caller, which feeds it back as the value', async () => {
      const input = canvas.getByRole('textbox');
      await userEvent.type(input, 'POL-4471');
      // Proves the round trip: the control is stateless, so the only reason
      // this reads back is that the caller's state updated and re-rendered it.
      await expect(input).toHaveValue('POL-4471');
    });
  }
}`,...x.parameters?.docs?.source},description:{story:`The default: a text field. Type and the value flows back out to the caller.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Controlled field={SELECT} />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the trigger is named by the field label', async () => {
      await expect(canvas.getByText(/Status/i)).toBeInTheDocument();
    });
  }
}`,...S.parameters?.docs?.source},description:{story:`Single select. Counts render right-aligned when the option carries one.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Controlled field={MULTI} initial={['property']} />
}`,...C.parameters?.docs?.source},description:{story:"Multi-select. The value is a `string[]`, not a string.",...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Controlled field={NUMBER} initial={{}} />
}`,...w.parameters?.docs?.source},description:{story:"Number range. `unit: 'currency'` changes how the bounds read.",...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Controlled field={BOOLEAN} />
}`,...T.parameters?.docs?.source},description:{story:`Boolean. A three-state toggle — true, false, or unset.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Date range',
  render: () => <Controlled field={DATE} initial={{}} />
}`,...E.parameters?.docs?.source},description:{story:"Date range. The value serialises as `{ from, to }` ISO strings.",...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={4}>
      {[TEXT, SELECT, MULTI, NUMBER, BOOLEAN, DATE].map(field => <Controlled key={field.id} field={field} initial={field.type === 'multi' ? [] : undefined} />)}
    </Stack>
}`,...D.parameters?.docs?.source},description:{story:"**Every type at once.** The point of the component: six different controls\nfrom six definitions, with no `switch` at the call site.",...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={4}>
      {(['sm', 'md', 'lg'] as const).map(size => <Controlled key={size} field={SELECT} size={size} />)}
    </Stack>
}`,...O.parameters?.docs?.source},description:{story:`The shared control scale — the same sm/md/lg as Button and Input.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={4}>
      <Controlled field={TEXT} initial="POL-4471" disabled />
      <Controlled field={SELECT} initial="active" disabled />
    </Stack>
}`,...k.parameters?.docs?.source},description:{story:`Disabled propagates to whichever control the field type produced.`,...k.parameters?.docs?.description}}}})))()}j();export{D as AllTypes,T as Boolean,E as DateRangeField,k as Disabled,C as Multi,w as NumberRange,S as Select,O as Sizes,x as Text,A as __namedExportsOrder,m as default};