import{Z as e,a5 as E}from"./iframe-CPBTUrEW.js";import{F as h,f as R}from"./filters-operators-CyzjlChd.js";import{S as j}from"./stack-C88a0npI.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./button-_tNb_vhW.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./input-BSCHIFmj.js";import"./prop-compat-ClktB6p5.js";import"./label-qHY30eUg.js";import"./index-DbquDQCT.js";import"./check-KuCy08bp.js";const{expect:x,userEvent:g,within:f}=__STORYBOOK_MODULE_TEST__,H={title:"Components/Filters Value Editor",component:h,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["The third segment of a condition — the control a user actually types into.","","Which control renders is decided by the **field type and the operator together**, not","the type alone: `is` on a select is one option, `is any of` is several, and `between`","on a number is two bounds rather than one. That is why this cannot be a lookup table","keyed on type.","","These states had no visual surface at all until now — the editor was reachable only","by opening a popover inside another story, so its error and empty states were never","reviewable."].join(`
`)}}}},y={id:"premium",label:"Premium",type:"number",unit:"currency"},w={id:"city",label:"City",type:"text",placeholder:"e.g. Rio"},T={id:"renewal",label:"Renewal",type:"date"},S={id:"bound",label:"Bound",type:"boolean",trueLabel:"Bound",falseLabel:"Unbound"},v={id:"status",label:"Status",type:"select",options:[{value:"A",label:"Active"},{value:"P",label:"Pending"},{value:"E",label:"Expired"},{value:"X",label:"Cancelled",disabled:!0}]},B={id:"tags",label:"Tags",type:"multiselect",options:["Flood","Wind","Quake","Fire","Theft","Cyber","Marine","Aviation","Motor"].map(r=>({value:r.toLowerCase(),label:r}))};function t({field:r,operator:o}){const[b,L]=E.useState(void 0);return e.jsx("div",{className:"w-fit rounded-lg border p-3",children:e.jsx(h,{field:r,operator:o?R(r.type,o):void 0,value:b,onChange:L})})}const a={render:()=>e.jsx(t,{field:w,operator:"is"})},n={render:()=>e.jsx(t,{field:y,operator:"gt"})},s={render:()=>e.jsx(t,{field:y,operator:"between"})},i={render:()=>e.jsx(t,{field:y,operator:"between"}),play:async({canvasElement:r})=>{const o=f(r);await g.type(o.getByRole("textbox",{name:/Minimum/}),"90"),await g.type(o.getByRole("textbox",{name:/Maximum/}),"10"),await g.click(o.getByRole("button",{name:"Apply"}));const b=await o.findByRole("alert");await x(b).toHaveTextContent(/greater than or equal/i)}},c={render:()=>e.jsx(t,{field:T,operator:"between"})},d={render:()=>e.jsx(t,{field:S,operator:"is"})},p={render:()=>e.jsx(t,{field:v,operator:"is"})},l={render:()=>e.jsx(t,{field:v,operator:"any_of"})},m={render:()=>e.jsx(t,{field:B,operator:"contains_any"}),play:async({canvasElement:r})=>{const o=f(r);await x(o.getByRole("textbox",{name:/Search Tags options/})).toBeInTheDocument()}},u={render:()=>e.jsxs(j,{gap:4,children:[e.jsx(t,{field:w,operator:"is"}),e.jsx(t,{field:y,operator:"between"}),e.jsx(t,{field:v,operator:"any_of"}),e.jsx(t,{field:S,operator:"is"})]})},I=["Text","Currency","NumericRange","RangeValidationError","DateRange","Boolean","SingleSelect","MultiSelect","LongListWithSearch","AllControls"];a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={city} operator="is" />
}`,...a.parameters?.docs?.source},description:{story:"Free text. Commits on Apply, never per keystroke.",...a.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={money} operator="gt" />
}`,...n.parameters?.docs?.source},description:{story:'The unit is stated, so "over 500000" cannot be read as anything else.',...n.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={money} operator="between" />
}`,...s.parameters?.docs?.source},description:{story:`**Two bounds, not one** — chosen by the operator, not the type. Either bound
may be left blank.`,...s.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source},description:{story:`**§43 in practice.** A range whose maximum is below its minimum matches
nothing, and saying so beats returning an empty table with no explanation.`,...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={renewal} operator="between" />
}`,...c.parameters?.docs?.source},description:{story:"Stored as `YYYY-MM-DD`, never a `Date` — a Date does not survive a URL.",...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={bound} operator="is" />
}`,...d.parameters?.docs?.source},description:{story:"Domain words, not Yes and No. One tab stop; arrows move within it.",...d.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={status} operator="is" />
}`,...p.parameters?.docs?.source},description:{story:"Single select closes on choose (§26). A disabled option is shown, not hidden.",...p.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={status} operator="any_of" />
}`,...l.parameters?.docs?.source},description:{story:"Multi-select stays open, so picking three values is not three reopens (§27).",...l.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Live field={tags} operator="contains_any" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox', {
      name: /Search Tags options/
    })).toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source},description:{story:"Past eight options a search box appears — below that it would be clutter.",...m.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={4}>
      <Live field={city} operator="is" />
      <Live field={money} operator="between" />
      <Live field={status} operator="any_of" />
      <Live field={bound} operator="is" />
    </Stack>
}`,...u.parameters?.docs?.source},description:{story:"Every control side by side, for comparing density and alignment.",...u.parameters?.docs?.description}}};export{u as AllControls,d as Boolean,n as Currency,c as DateRange,m as LongListWithSearch,l as MultiSelect,s as NumericRange,i as RangeValidationError,p as SingleSelect,a as Text,I as __namedExportsOrder,H as default};
