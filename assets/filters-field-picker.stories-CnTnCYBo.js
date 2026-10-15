import{Z as t,a5 as h}from"./iframe-CPBTUrEW.js";import{F as y}from"./filters-field-picker-DXcbmY3j.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./input-BSCHIFmj.js";import"./prop-compat-ClktB6p5.js";import"./control-size-rvCN7ZpI.js";import"./search-DRVimkv9.js";import"./createLucideIcon-BnpAccaP.js";import"./chevron-right-BXCmPxW2.js";const{expect:n,userEvent:u,within:p}=__STORYBOOK_MODULE_TEST__,A={title:"Components/Filters Field Picker",component:y,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["Choosing a field — two modes in one surface, because a schema can be four fields or","four hundred.","","**Browse** drills through the tree a level at a time. **Typing switches to search**,","which returns deeply nested matches without the user having to know that Flood lives","under Risk › CAT.","","**Keyboard is the primary interaction, not an afterthought** (§47.1): arrows move,","Right enters a branch, Left returns to the parent, Enter selects. Escape backs out one","level before closing — handled through a `handleEscape` handle the surrounding popover","consults, because Radix listens for Escape on `document` and a React handler cannot","veto a dismiss on its own.","","Rendered bare here. In use it sits inside a Popover, which is why none of these states","were reviewable before."].join(`
`)}}}},w=[{id:"status",label:"Status",type:"select"},{id:"premium",label:"Premium",type:"number",unit:"currency"},{id:"bound",label:"Bound",type:"boolean"},{id:"renewal",label:"Renewal date",type:"date"},{id:"location",label:"Location",type:"select",fields:[{id:"country",label:"Country",type:"select"},{id:"city",label:"City",type:"text"},{id:"postcode",label:"Postcode",type:"text"}]},{id:"risk",label:"Risk",type:"select",fields:[{id:"cat",label:"CAT",type:"select",fields:[{id:"flood",label:"Flood",type:"number"},{id:"wind",label:"Wind",type:"number"},{id:"quake",label:"Earthquake",type:"number"}]},{id:"casualty",label:"Casualty",type:"number"}]},{id:"tiv",label:"Total insured value",type:"number",unit:"currency",aliases:["TIV"]},{id:"legacy",label:"Legacy code",type:"text",disabled:!0},{id:"internal",label:"Internal score",type:"number",hidden:!0}];function o({fields:a=w}){const[e,m]=h.useState(null);return t.jsxs("div",{className:"flex flex-col gap-3",children:[t.jsx("div",{className:"w-fit rounded-lg border p-2",children:t.jsx(y,{fields:a,onSelect:m})}),t.jsx("p",{className:"text-sm text-muted-foreground","data-testid":"picked",children:e?`Selected: ${e.join(" › ")}`:"Nothing selected yet"})]})}const s={render:()=>t.jsx(o,{}),play:async({canvasElement:a})=>{const e=p(a);await n(e.queryByRole("option",{name:"Internal score"})).toBeNull(),await n(e.getByRole("option",{name:"Legacy code"})).toHaveAttribute("aria-disabled","true")}},r={render:()=>t.jsx(o,{}),play:async({canvasElement:a})=>{const e=p(a);await u.type(e.getByRole("combobox"),"flood");const m=await e.findByRole("option",{name:/Flood/});await n(m).toHaveTextContent("Risk")}},i={render:()=>t.jsx(o,{}),play:async({canvasElement:a})=>{const e=p(a);await u.type(e.getByRole("combobox"),"TIV"),await n(await e.findByRole("option",{name:/Total insured value/})).toBeInTheDocument()}},c={render:()=>t.jsx(o,{}),play:async({canvasElement:a})=>{const e=p(a);e.getByRole("combobox").focus(),await u.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowRight}"),await n(await e.findByRole("option",{name:"Postcode"})).toBeInTheDocument()}},d={render:()=>t.jsx(o,{}),play:async({canvasElement:a})=>{const e=p(a);await u.type(e.getByRole("combobox"),"zzzz"),await n(await e.findByText(/No filters found/)).toBeInTheDocument()}},l={render:()=>t.jsx(o,{fields:[{id:"status",label:"Status",type:"select"},{id:"premium",label:"Premium",type:"number"}]})},D=["Browse","DeepSearch","SearchByAlias","DrilledIn","NoMatches","SmallSchema"];s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source},description:{story:"Browsing. `Legacy code` is disabled and shown; `Internal score` is hidden\nand absent entirely — a withdrawn field should not be advertised.",...s.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source},description:{story:`**Search reaches three levels down.** Typing "flood" finds it without the
user knowing it lives under Risk › CAT, and the ancestors are shown so three
branches each holding an "Amount" stay distinguishable.`,...r.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source},description:{story:"An alias finds a field whose label contains no such word.",...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source},description:{story:"Drilled in by keyboard, with the breadcrumb showing where you are.",...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Framed />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('combobox'), 'zzzz');
    await expect(await canvas.findByText(/No filters found/)).toBeInTheDocument();
  }
}`,...d.parameters?.docs?.source},description:{story:"Nothing matched — said plainly, rather than an empty box.",...d.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Framed fields={[{
    id: 'status',
    label: 'Status',
    type: 'select'
  }, {
    id: 'premium',
    label: 'Premium',
    type: 'number'
  }]} />
}`,...l.parameters?.docs?.source},description:{story:"A schema small enough that search would be ceremony.",...l.parameters?.docs?.description}}};export{s as Browse,r as DeepSearch,c as DrilledIn,d as NoMatches,i as SearchByAlias,l as SmallSchema,D as __namedExportsOrder,A as default};
