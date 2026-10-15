import{Z as e,a5 as L}from"./iframe-CPBTUrEW.js";import{a as f}from"./filter-field-control-Bm7UZ_th.js";import{S as g}from"./stack-C88a0npI.js";import"./preload-helper-PPVm8Dsz.js";import"./input-BSCHIFmj.js";import"./utils-CURkPv3a.js";import"./prop-compat-ClktB6p5.js";import"./control-size-rvCN7ZpI.js";import"./filter-chip-CfiB6TWx.js";import"./index-Dk2lMVn3.js";import"./dropdown-menu-B-DEwsfR.js";import"./index-B2KxKFY1.js";import"./index-DTX6ga2Q.js";import"./index-D-VHP59e.js";import"./index-ydzPhmoe.js";import"./index-CQZ-MLQt.js";import"./index-DbquDQCT.js";import"./index-VWR8Du3y.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-CDKxNHGJ.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";import"./createLucideIcon-BnpAccaP.js";import"./check-KuCy08bp.js";import"./chevron-right-BXCmPxW2.js";import"./chevron-down-122XaqBk.js";import"./x-Bk_wSNf2.js";import"./button-_tNb_vhW.js";import"./label-qHY30eUg.js";import"./popover-B1Y9L4uz.js";import"./format-B1LeFV3Y.js";import"./filter-bar-B3-GivsI.js";import"./select-3H9YJY8U.js";import"./index-D17hSi50.js";import"./index-CztXHdXt.js";import"./index-DrK2s9b6.js";import"./chevron-up-CoKqbRsK.js";import"./date-picker-t-CIrsQu.js";import"./calendar-CfacuH8P.js";import"./chevron-left-N_nrbjRa.js";import"./calendar-BknvOJFQ.js";import"./search-DRVimkv9.js";const{expect:v,userEvent:B,within:T}=__STORYBOOK_MODULE_TEST__,Ce={title:"Components/FilterFieldControl",component:f,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["Renders the correct control for a `FilterField` definition — text input, single select,","multi-select, date range, number range or boolean — so a filter is described once and","reused by `DataGridToolbar`, `DataTable`, `FilterBar` and any hand-built toolbar.","","**Stateless by design.** It never stores the value; `value` in, `onValueChange` out.","Every story below owns its own `useState`, which is exactly what a consumer does."].join(`
`)}}},argTypes:{field:{description:'The filter definition. Its `type` alone decides which control renders — there is no separate "control" prop to keep in sync.',table:{type:{summary:"FilterField"}}},value:{description:"The current value, owned by the caller. Shape follows the field type: `string` for text/select, `string[]` for multi, `{from,to}` for dateRange, `{min,max}` for numberRange, `boolean` for boolean.",table:{type:{summary:"unknown"}}},onValueChange:{description:"Fired with the next value. The caller decides what it means.",table:{type:{summary:"(value: unknown) => void"}},action:"valueChange"},size:{description:"Control height, shared with Button and Input (sm 32 / md 40 / lg 48).",control:"inline-radio",options:["sm","md","lg"],table:{defaultValue:{summary:"md"}}},disabled:{description:"Disables the rendered control, whichever type it is.",control:"boolean",table:{defaultValue:{summary:"false"}}}}},b={id:"policy",label:"Policy number",type:"text",placeholder:"e.g. POL-4471"},y={id:"status",label:"Status",type:"select",options:[{value:"active",label:"Active",count:128},{value:"pending",label:"Pending",count:12},{value:"expired",label:"Expired",count:4}]},x={id:"line",label:"Line of business",type:"multi",options:[{value:"property",label:"Property"},{value:"casualty",label:"Casualty"},{value:"marine",label:"Marine"},{value:"cyber",label:"Cyber"}]},w={id:"premium",label:"Premium",type:"numberRange",unit:"currency"},E={id:"renewal",label:"Up for renewal",type:"boolean"},S={id:"inception",label:"Inception date",type:"dateRange"};function r({field:t,initial:a,...o}){const[h,C]=L.useState(a);return e.jsx(f,{field:t,value:h,onValueChange:C,...o})}const i={render:()=>e.jsx(r,{field:b,initial:""}),play:async({canvasElement:t,step:a})=>{const o=T(t);await a("typing reaches the caller, which feeds it back as the value",async()=>{const h=o.getByRole("textbox");await B.type(h,"POL-4471"),await v(h).toHaveValue("POL-4471")})}},n={render:()=>e.jsx(r,{field:y}),play:async({canvasElement:t,step:a})=>{const o=T(t);await a("the trigger is named by the field label",async()=>{await v(o.getByText(/Status/i)).toBeInTheDocument()})}},s={render:()=>e.jsx(r,{field:x,initial:["property"]})},l={render:()=>e.jsx(r,{field:w,initial:{}})},c={render:()=>e.jsx(r,{field:E})},d={name:"Date range",render:()=>e.jsx(r,{field:S,initial:{}})},p={render:()=>e.jsx(g,{gap:4,children:[b,y,x,w,E,S].map(t=>e.jsx(r,{field:t,initial:t.type==="multi"?[]:void 0},t.id))})},m={render:()=>e.jsx(g,{gap:4,children:["sm","md","lg"].map(t=>e.jsx(r,{field:y,size:t},t))})},u={render:()=>e.jsxs(g,{gap:4,children:[e.jsx(r,{field:b,initial:"POL-4471",disabled:!0}),e.jsx(r,{field:y,initial:"active",disabled:!0})]})},Le=["Text","Select","Multi","NumberRange","Boolean","DateRangeField","AllTypes","Sizes","Disabled"];i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source},description:{story:"The default: a text field. Type and the value flows back out to the caller.",...i.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source},description:{story:"Single select. Counts render right-aligned when the option carries one.",...n.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Controlled field={MULTI} initial={['property']} />
}`,...s.parameters?.docs?.source},description:{story:"Multi-select. The value is a `string[]`, not a string.",...s.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Controlled field={NUMBER} initial={{}} />
}`,...l.parameters?.docs?.source},description:{story:"Number range. `unit: 'currency'` changes how the bounds read.",...l.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Controlled field={BOOLEAN} />
}`,...c.parameters?.docs?.source},description:{story:"Boolean. A three-state toggle — true, false, or unset.",...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Date range',
  render: () => <Controlled field={DATE} initial={{}} />
}`,...d.parameters?.docs?.source},description:{story:"Date range. The value serialises as `{ from, to }` ISO strings.",...d.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={4}>
      {[TEXT, SELECT, MULTI, NUMBER, BOOLEAN, DATE].map(field => <Controlled key={field.id} field={field} initial={field.type === 'multi' ? [] : undefined} />)}
    </Stack>
}`,...p.parameters?.docs?.source},description:{story:"**Every type at once.** The point of the component: six different controls\nfrom six definitions, with no `switch` at the call site.",...p.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={4}>
      {(['sm', 'md', 'lg'] as const).map(size => <Controlled key={size} field={SELECT} size={size} />)}
    </Stack>
}`,...m.parameters?.docs?.source},description:{story:"The shared control scale — the same sm/md/lg as Button and Input.",...m.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={4}>
      <Controlled field={TEXT} initial="POL-4471" disabled />
      <Controlled field={SELECT} initial="active" disabled />
    </Stack>
}`,...u.parameters?.docs?.source},description:{story:"Disabled propagates to whichever control the field type produced.",...u.parameters?.docs?.description}}};export{p as AllTypes,c as Boolean,d as DateRangeField,u as Disabled,s as Multi,l as NumberRange,n as Select,m as Sizes,i as Text,Le as __namedExportsOrder,Ce as default};
