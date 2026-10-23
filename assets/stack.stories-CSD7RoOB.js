import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./badge-BJRi19uA.js";import{n as i,t as a}from"./button-DatWLSj0.js";import{n as o,r as s,t as c}from"./stack-BlYcYnw2.js";import{l,r as u,t as d}from"./card-tXlEGCFr.js";var f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{s(),i(),n(),l(),f=t(),p={title:`Components/Stack`,component:o,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Layout atoms that lock spacing to the DS scale. `Stack` (vertical) and `Inline` (horizontal, wrapping) add nothing but flex + gap, so they compose with anything and never fight a child's styling."}}},argTypes:{gap:{control:`select`,options:[0,1,2,3,4,5,6,8,10,12,14,16,20,24,28,32],description:`Spacing between children, on the DS scale. Off-scale values are a type error.`},align:{control:`select`,options:[void 0,`start`,`center`,`end`,`stretch`,`baseline`]},justify:{control:`select`,options:[void 0,`start`,`center`,`end`,`between`,`around`,`evenly`]}}},m=({children:e})=>(0,f.jsx)(`div`,{className:`rounded-md border border-dashed px-3 py-2 text-sm`,children:e}),h={args:{gap:4},render:e=>(0,f.jsxs)(o,{...e,children:[(0,f.jsx)(m,{children:`First`}),(0,f.jsx)(m,{children:`Second`}),(0,f.jsx)(m,{children:`Third`})]})},g={render:()=>(0,f.jsx)(o,{gap:6,children:[1,2,3,4,5,6,8].map(e=>(0,f.jsxs)(o,{gap:1,children:[(0,f.jsxs)(`span`,{className:`text-xs text-muted-foreground`,children:[`gap=`,e,` · `,e*4,`px`]}),(0,f.jsxs)(c,{gap:e,children:[(0,f.jsx)(m,{children:`A`}),(0,f.jsx)(m,{children:`B`}),(0,f.jsx)(m,{children:`C`})]})]},e))})},_={render:()=>(0,f.jsx)(`div`,{className:`max-w-sm rounded-md border p-3`,children:(0,f.jsx)(c,{gap:2,children:[`Property`,`Liability`,`Cyber`,`Marine`,`Aviation`,`Casualty`,`Motor`].map(e=>(0,f.jsx)(r,{children:e},e))})})},v={render:()=>(0,f.jsxs)(c,{gap:4,justify:`between`,className:`w-full rounded-md border p-3`,children:[(0,f.jsx)(`span`,{className:`text-sm font-semibold`,children:`Active policies`}),(0,f.jsx)(a,{variant:`outline`,size:`sm`,children:`View all`})]})},y={render:()=>(0,f.jsx)(o,{gap:4,children:[`Beacon Capital`,`Northwind Logistics`].map(e=>(0,f.jsx)(d,{children:(0,f.jsx)(u,{className:`p-4`,children:(0,f.jsxs)(c,{gap:4,justify:`between`,children:[(0,f.jsxs)(o,{gap:1,children:[(0,f.jsx)(`span`,{className:`text-sm font-semibold`,children:e}),(0,f.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`Renewal in 30 days`})]}),(0,f.jsxs)(c,{gap:2,children:[(0,f.jsx)(a,{variant:`ghost`,size:`sm`,children:`Details`}),(0,f.jsx)(a,{variant:`primary`,size:`sm`,children:`Renew`})]})]})})},e))})},b=[`Default`,`GapScale`,`InlineWrapping`,`JustifyBetween`,`Composed`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    gap: 4
  },
  render: args => <Stack {...args}>
      <Swatch>First</Swatch>
      <Swatch>Second</Swatch>
      <Swatch>Third</Swatch>
    </Stack>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source},description:{story:`Every gap step, so the scale is visible rather than described.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-sm rounded-md border p-3">
      <Inline gap={2}>
        {['Property', 'Liability', 'Cyber', 'Marine', 'Aviation', 'Casualty', 'Motor'].map(t => <Badge key={t}>{t}</Badge>)}
      </Inline>
    </div>
}`,..._.parameters?.docs?.source},description:{story:"`Inline` wraps by default — a row of filters must survive a narrow viewport.",..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Inline gap={4} justify="between" className="w-full rounded-md border p-3">
      <span className="text-sm font-semibold">Active policies</span>
      <Button variant="outline" size="sm">
        View all
      </Button>
    </Inline>
}`,...v.parameters?.docs?.source},description:{story:'`justify="between"` is the idiomatic title-row layout.',...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source},description:{story:`Nesting is the normal case: a Stack of Cards, each an Inline of controls.`,...y.parameters?.docs?.description}}}})))()}x();export{y as Composed,h as Default,g as GapScale,_ as InlineWrapping,v as JustifyBetween,b as __namedExportsOrder,p as default};