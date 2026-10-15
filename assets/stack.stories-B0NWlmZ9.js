import{Z as e}from"./iframe-CPBTUrEW.js";import{S as s,I as c}from"./stack-C88a0npI.js";import{B as p}from"./button-_tNb_vhW.js";import{B as l}from"./badge-J44eyYsr.js";import{C as m,b as h}from"./card-DdSDVEd-.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";import"./utils-CURkPv3a.js";import"./index-Dk2lMVn3.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";const B={title:"Components/Stack",component:s,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Layout atoms that lock spacing to the DS scale. `Stack` (vertical) and `Inline` (horizontal, wrapping) add nothing but flex + gap, so they compose with anything and never fight a child's styling."}}},argTypes:{gap:{control:"select",options:[0,1,2,3,4,5,6,8,10,12,14,16,20,24,28,32],description:"Spacing between children, on the DS scale. Off-scale values are a type error."},align:{control:"select",options:[void 0,"start","center","end","stretch","baseline"]},justify:{control:"select",options:[void 0,"start","center","end","between","around","evenly"]}}},n=({children:a})=>e.jsx("div",{className:"rounded-md border border-dashed px-3 py-2 text-sm",children:a}),d={args:{gap:4},render:a=>e.jsxs(s,{...a,children:[e.jsx(n,{children:"First"}),e.jsx(n,{children:"Second"}),e.jsx(n,{children:"Third"})]})},t={render:()=>e.jsx(s,{gap:6,children:[1,2,3,4,5,6,8].map(a=>e.jsxs(s,{gap:1,children:[e.jsxs("span",{className:"text-xs text-muted-foreground",children:["gap=",a," · ",a*4,"px"]}),e.jsxs(c,{gap:a,children:[e.jsx(n,{children:"A"}),e.jsx(n,{children:"B"}),e.jsx(n,{children:"C"})]})]},a))})},r={render:()=>e.jsx("div",{className:"max-w-sm rounded-md border p-3",children:e.jsx(c,{gap:2,children:["Property","Liability","Cyber","Marine","Aviation","Casualty","Motor"].map(a=>e.jsx(l,{children:a},a))})})},o={render:()=>e.jsxs(c,{gap:4,justify:"between",className:"w-full rounded-md border p-3",children:[e.jsx("span",{className:"text-sm font-semibold",children:"Active policies"}),e.jsx(p,{variant:"outline",size:"sm",children:"View all"})]})},i={render:()=>e.jsx(s,{gap:4,children:["Beacon Capital","Northwind Logistics"].map(a=>e.jsx(m,{children:e.jsx(h,{className:"p-4",children:e.jsxs(c,{gap:4,justify:"between",children:[e.jsxs(s,{gap:1,children:[e.jsx("span",{className:"text-sm font-semibold",children:a}),e.jsx("span",{className:"text-xs text-muted-foreground",children:"Renewal in 30 days"})]}),e.jsxs(c,{gap:2,children:[e.jsx(p,{variant:"ghost",size:"sm",children:"Details"}),e.jsx(p,{variant:"primary",size:"sm",children:"Renew"})]})]})})},a))})},k=["Default","GapScale","InlineWrapping","JustifyBetween","Composed"];d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    gap: 4
  },
  render: args => <Stack {...args}>
      <Swatch>First</Swatch>
      <Swatch>Second</Swatch>
      <Swatch>Third</Swatch>
    </Stack>
}`,...d.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={6}>
      {([1, 2, 3, 4, 5, 6, 8] as const).map(g => <Stack key={g} gap={1}>
          <span className="text-xs text-muted-foreground">
            gap={g} · {g * 4}px
          </span>
          <Inline gap={g}>
            <Swatch>A</Swatch>
            <Swatch>B</Swatch>
            <Swatch>C</Swatch>
          </Inline>
        </Stack>)}
    </Stack>
}`,...t.parameters?.docs?.source},description:{story:"Every gap step, so the scale is visible rather than described.",...t.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-sm rounded-md border p-3">
      <Inline gap={2}>
        {['Property', 'Liability', 'Cyber', 'Marine', 'Aviation', 'Casualty', 'Motor'].map(t => <Badge key={t}>{t}</Badge>)}
      </Inline>
    </div>
}`,...r.parameters?.docs?.source},description:{story:"`Inline` wraps by default — a row of filters must survive a narrow viewport.",...r.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Inline gap={4} justify="between" className="w-full rounded-md border p-3">
      <span className="text-sm font-semibold">Active policies</span>
      <Button variant="outline" size="sm">
        View all
      </Button>
    </Inline>
}`,...o.parameters?.docs?.source},description:{story:'`justify="between"` is the idiomatic title-row layout.',...o.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={4}>
      {['Beacon Capital', 'Northwind Logistics'].map(name => <Card key={name}>
          <CardContent className="p-4">
            <Inline gap={4} justify="between">
              <Stack gap={1}>
                <span className="text-sm font-semibold">{name}</span>
                <span className="text-xs text-muted-foreground">Renewal in 30 days</span>
              </Stack>
              <Inline gap={2}>
                <Button variant="ghost" size="sm">
                  Details
                </Button>
                <Button variant="primary" size="sm">
                  Renew
                </Button>
              </Inline>
            </Inline>
          </CardContent>
        </Card>)}
    </Stack>
}`,...i.parameters?.docs?.source},description:{story:"Nesting is the normal case: a Stack of Cards, each an Inline of controls.",...i.parameters?.docs?.description}}};export{i as Composed,d as Default,t as GapScale,r as InlineWrapping,o as JustifyBetween,k as __namedExportsOrder,B as default};
