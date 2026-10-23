import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./filters-field-picker-DfQfK_wx.js";function o({fields:e=p}){let[t,n]=s.useState(null);return(0,c.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,c.jsx)(`div`,{className:`w-fit rounded-lg border p-2`,children:(0,c.jsx)(a,{fields:e,onSelect:n})}),(0,c.jsx)(`p`,{className:`text-sm text-muted-foreground`,"data-testid":`picked`,children:t?`Selected: ${t.join(` › `)}`:`Nothing selected yet`})]})}var s,c,l,u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=t((()=>{s=e(n(),1),i(),c=r(),{expect:l,userEvent:u,within:d}=__STORYBOOK_MODULE_TEST__,f={title:`Components/Filters Field Picker`,component:a,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`Choosing a field — two modes in one surface, because a schema can be four fields or
four hundred.

**Browse** drills through the tree a level at a time. **Typing switches to search**,
which returns deeply nested matches without the user having to know that Flood lives
under Risk › CAT.

**Keyboard is the primary interaction, not an afterthought** (§47.1): arrows move,
Right enters a branch, Left returns to the parent, Enter selects. Escape backs out one
level before closing — handled through a \`handleEscape\` handle the surrounding popover
consults, because Radix listens for Escape on \`document\` and a React handler cannot
veto a dismiss on its own.

Rendered bare here. In use it sits inside a Popover, which is why none of these states
were reviewable before.`}}}},p=[{id:`status`,label:`Status`,type:`select`},{id:`premium`,label:`Premium`,type:`number`,unit:`currency`},{id:`bound`,label:`Bound`,type:`boolean`},{id:`renewal`,label:`Renewal date`,type:`date`},{id:`location`,label:`Location`,type:`select`,fields:[{id:`country`,label:`Country`,type:`select`},{id:`city`,label:`City`,type:`text`},{id:`postcode`,label:`Postcode`,type:`text`}]},{id:`risk`,label:`Risk`,type:`select`,fields:[{id:`cat`,label:`CAT`,type:`select`,fields:[{id:`flood`,label:`Flood`,type:`number`},{id:`wind`,label:`Wind`,type:`number`},{id:`quake`,label:`Earthquake`,type:`number`}]},{id:`casualty`,label:`Casualty`,type:`number`}]},{id:`tiv`,label:`Total insured value`,type:`number`,unit:`currency`,aliases:[`TIV`]},{id:`legacy`,label:`Legacy code`,type:`text`,disabled:!0},{id:`internal`,label:`Internal score`,type:`number`,hidden:!0}],m={render:()=>(0,c.jsx)(o,{}),play:async({canvasElement:e})=>{let t=d(e);await l(t.queryByRole(`option`,{name:`Internal score`})).toBeNull(),await l(t.getByRole(`option`,{name:`Legacy code`})).toHaveAttribute(`aria-disabled`,`true`)}},h={render:()=>(0,c.jsx)(o,{}),play:async({canvasElement:e})=>{let t=d(e);await u.type(t.getByRole(`combobox`),`flood`);let n=await t.findByRole(`option`,{name:/Flood/});await l(n).toHaveTextContent(`Risk`)}},g={render:()=>(0,c.jsx)(o,{}),play:async({canvasElement:e})=>{let t=d(e);await u.type(t.getByRole(`combobox`),`TIV`),await l(await t.findByRole(`option`,{name:/Total insured value/})).toBeInTheDocument()}},_={render:()=>(0,c.jsx)(o,{}),play:async({canvasElement:e})=>{let t=d(e);t.getByRole(`combobox`).focus(),await u.keyboard(`{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowRight}`),await l(await t.findByRole(`option`,{name:`Postcode`})).toBeInTheDocument()}},v={render:()=>(0,c.jsx)(o,{}),play:async({canvasElement:e})=>{let t=d(e);await u.type(t.getByRole(`combobox`),`zzzz`),await l(await t.findByText(/No filters found/)).toBeInTheDocument()}},y={render:()=>(0,c.jsx)(o,{fields:[{id:`status`,label:`Status`,type:`select`},{id:`premium`,label:`Premium`,type:`number`}]})},b=[`Browse`,`DeepSearch`,`SearchByAlias`,`DrilledIn`,`NoMatches`,`SmallSchema`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Framed />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('option', {
      name: 'Internal score'
    })).toBeNull();
    await expect(canvas.getByRole('option', {
      name: 'Legacy code'
    })).toHaveAttribute('aria-disabled', 'true');
  }
}`,...m.parameters?.docs?.source},description:{story:"Browsing. `Legacy code` is disabled and shown; `Internal score` is hidden\nand absent entirely — a withdrawn field should not be advertised.",...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Framed />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('combobox'), 'flood');
    const hit = await canvas.findByRole('option', {
      name: /Flood/
    });
    await expect(hit).toHaveTextContent('Risk');
  }
}`,...h.parameters?.docs?.source},description:{story:`**Search reaches three levels down.** Typing "flood" finds it without the
user knowing it lives under Risk › CAT, and the ancestors are shown so three
branches each holding an "Amount" stay distinguishable.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Framed />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('combobox'), 'TIV');
    await expect(await canvas.findByRole('option', {
      name: /Total insured value/
    })).toBeInTheDocument();
  }
}`,...g.parameters?.docs?.source},description:{story:`An alias finds a field whose label contains no such word.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Framed />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    input.focus();
    // Right enters a branch; five downs lands on Location.
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowRight}');
    await expect(await canvas.findByRole('option', {
      name: 'Postcode'
    })).toBeInTheDocument();
  }
}`,..._.parameters?.docs?.source},description:{story:`Drilled in by keyboard, with the breadcrumb showing where you are.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Framed />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('combobox'), 'zzzz');
    await expect(await canvas.findByText(/No filters found/)).toBeInTheDocument();
  }
}`,...v.parameters?.docs?.source},description:{story:`Nothing matched — said plainly, rather than an empty box.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Framed fields={[{
    id: 'status',
    label: 'Status',
    type: 'select'
  }, {
    id: 'premium',
    label: 'Premium',
    type: 'number'
  }]} />
}`,...y.parameters?.docs?.source},description:{story:`A schema small enough that search would be ceremony.`,...y.parameters?.docs?.description}}}})))()}x();export{m as Browse,h as DeepSearch,_ as DrilledIn,v as NoMatches,g as SearchByAlias,y as SmallSchema,b as __namedExportsOrder,f as default};