import{Z as e,a5 as p}from"./iframe-CPBTUrEW.js";import{I as l}from"./input-BSCHIFmj.js";import{T as v}from"./textarea-UDTKAvx4.js";import{D as d}from"./select-3H9YJY8U.js";import{C}from"./combobox-CPJGQGpX.js";import{D as I}from"./date-picker-t-CIrsQu.js";import{B as m}from"./button-_tNb_vhW.js";import{B as g}from"./button-group-BKSnLksy.js";import{D as B}from"./checkbox-CNQZ_QzY.js";import{S as z}from"./switch-dYPv2PNo.js";import{S as a,I as y}from"./stack-C88a0npI.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./prop-compat-ClktB6p5.js";import"./control-size-rvCN7ZpI.js";import"./index-D17hSi50.js";import"./index-B2KxKFY1.js";import"./index-D8r7tS0H.js";import"./index-D-VHP59e.js";import"./index-DTX6ga2Q.js";import"./index-COhu0uIO.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-ydzPhmoe.js";import"./index-CztXHdXt.js";import"./index-DrK2s9b6.js";import"./chevron-down-122XaqBk.js";import"./createLucideIcon-BnpAccaP.js";import"./check-KuCy08bp.js";import"./chevron-up-CoKqbRsK.js";import"./command-ChJErH62.js";import"./index-BiNW7bVc.js";import"./dialog-C1dHRi-6.js";import"./x-Bk_wSNf2.js";import"./search-DRVimkv9.js";import"./popover-B1Y9L4uz.js";import"./chevrons-up-down-DNeGP8GW.js";import"./calendar-CfacuH8P.js";import"./chevron-left-N_nrbjRa.js";import"./chevron-right-BXCmPxW2.js";import"./calendar-BknvOJFQ.js";import"./index-Dk2lMVn3.js";import"./separator-Cz9zTVn9.js";import"./minus-CnttpEGu.js";import"./info-XF5axP9F.js";const ke={title:"Components/Form Controls",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"All text-entry controls at every size, with measured heights, so cross-component inconsistency is visible rather than something you discover in a layout."}}}},h=[{value:"property",label:"Property"},{value:"liability",label:"Liability"},{value:"cyber",label:"Cyber"}],w=[{value:"beacon",label:"Beacon Capital"},{value:"northwind",label:"Northwind Logistics"}];function r({label:t,children:S}){const b=p.useRef(null),[x,j]=p.useState(null);return p.useLayoutEffect(()=>{const c=b.current?.firstElementChild;if(!c)return;const f=c.querySelector("input,textarea,button,[role=combobox]")??c;j(Math.round(f.getBoundingClientRect().height))},[]),e.jsxs(a,{gap:1,children:[e.jsxs("span",{className:"text-xs font-medium text-muted-foreground",children:[t,x!==null&&e.jsxs("span",{className:"ml-2 font-mono",children:[x,"px"]})]}),e.jsx("div",{ref:b,children:S})]})}const u=["sm","md","lg"],o={render:()=>e.jsx(a,{gap:8,children:u.map(t=>e.jsxs(a,{gap:3,children:[e.jsxs("h3",{className:"text-sm font-semibold",children:['size="',t,'"']}),e.jsxs(y,{gap:3,align:"end",wrap:!1,className:"overflow-x-auto pb-2",children:[e.jsx(r,{label:"Input",children:e.jsx(l,{size:t,placeholder:"Policy number","aria-label":"Policy number"})}),e.jsx(r,{label:"Select",children:e.jsx(d,{options:h,size:t,placeholder:"Coverage","aria-label":"Coverage type"})}),e.jsx(r,{label:"Button",children:e.jsx(m,{size:t,variant:"primary",children:"Search"})})]})]},t))})},s={render:()=>e.jsx(a,{gap:8,children:u.map(t=>e.jsxs(a,{gap:3,children:[e.jsxs("h3",{className:"text-sm font-semibold",children:['size="',t,'"']}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:[e.jsx(r,{label:"Input",children:e.jsx(l,{size:t,placeholder:"Policy number","aria-label":"Policy number"})}),e.jsx(r,{label:"Select",children:e.jsx(d,{options:h,size:t,placeholder:"Coverage","aria-label":"Coverage type"})}),e.jsx(r,{label:"Combobox",children:e.jsx(C,{options:w,size:t,placeholder:"Client","aria-label":"Client"})}),e.jsx(r,{label:"DatePicker",children:e.jsx(I,{size:t,placeholder:"Effective date"})}),e.jsx(r,{label:"Textarea",children:e.jsx(v,{size:t,placeholder:"Loss description",rows:2,"aria-label":"Loss description"})})]})]},t))})},n={render:()=>e.jsxs(a,{gap:8,children:[u.map(t=>e.jsxs(a,{gap:3,children:[e.jsxs("h3",{className:"text-sm font-semibold",children:['<ButtonGroup size="',t,'"> — children inherit']}),e.jsxs(g,{size:t,"aria-label":`Policy search, ${t}`,children:[e.jsx(l,{placeholder:"Policy number","aria-label":"Policy number"}),e.jsx(d,{options:h,placeholder:"Coverage","aria-label":"Coverage type"}),e.jsx(m,{variant:"primary",children:"Search"})]})]},t)),e.jsxs(a,{gap:1,children:[e.jsx("h3",{className:"text-sm font-semibold",children:"A child's own size still wins"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Deliberately mismatched, to show precedence: the group says"," ",e.jsx("code",{children:"sm"})," and the button overrides with ",e.jsx("code",{children:"lg"}),". This is the escape hatch, not a recommended pattern — a group normally reads as one unit."]}),e.jsxs(g,{size:"sm","aria-label":"Override example",className:"mt-2",children:[e.jsx(l,{placeholder:"Inherits sm","aria-label":"Inherits sm"}),e.jsx(m,{variant:"primary",size:"lg",children:"Explicit lg"})]})]})]})},i={render:()=>e.jsxs(y,{gap:6,align:"center",children:[e.jsx(B,{label:"Include expired"}),e.jsx(z,{label:"Auto-renew"})]})},Ne=["AgainstButton","AllControls","GroupedControls","BooleanControls"];o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={8}>
      {SIZES.map(size => <Stack key={size} gap={3}>
          <h3 className="text-sm font-semibold">
            size=&quot;{size}&quot;
          </h3>
          <Inline gap={3} align="end" wrap={false} className="overflow-x-auto pb-2">
            <Measured label="Input">
              <Input size={size} placeholder="Policy number" aria-label="Policy number" />
            </Measured>
            <Measured label="Select">
              <DSSelect options={SELECT_OPTIONS} size={size} placeholder="Coverage" aria-label="Coverage type" />
            </Measured>
            <Measured label="Button">
              <Button size={size} variant="primary">
                Search
              </Button>
            </Measured>
          </Inline>
        </Stack>)}
    </Stack>
}`,...o.parameters?.docs?.source},description:{story:`The core check: each control beside a Button of the same declared size.
Any height mismatch shows immediately as a step in the row.`,...o.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={8}>
      {SIZES.map(size => <Stack key={size} gap={3}>
          <h3 className="text-sm font-semibold">size=&quot;{size}&quot;</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Measured label="Input">
              <Input size={size} placeholder="Policy number" aria-label="Policy number" />
            </Measured>
            <Measured label="Select">
              <DSSelect options={SELECT_OPTIONS} size={size} placeholder="Coverage" aria-label="Coverage type" />
            </Measured>
            <Measured label="Combobox">
              <Combobox options={COMBOBOX_OPTIONS} size={size} placeholder="Client" aria-label="Client" />
            </Measured>
            <Measured label="DatePicker">
              <DatePicker size={size} placeholder="Effective date" />
            </Measured>
            <Measured label="Textarea">
              <Textarea size={size} placeholder="Loss description" rows={2} aria-label="Loss description" />
            </Measured>
          </div>
        </Stack>)}
    </Stack>
}`,...s.parameters?.docs?.source},description:{story:"Every text-entry control at every size, to compare padding and type scale.",...s.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={8}>
      {SIZES.map(size => <Stack key={size} gap={3}>
          <h3 className="text-sm font-semibold">
            &lt;ButtonGroup size=&quot;{size}&quot;&gt; — children inherit
          </h3>
          <ButtonGroup size={size} aria-label={\`Policy search, \${size}\`}>
            <Input placeholder="Policy number" aria-label="Policy number" />
            <DSSelect options={SELECT_OPTIONS} placeholder="Coverage" aria-label="Coverage type" />
            <Button variant="primary">Search</Button>
          </ButtonGroup>
        </Stack>)}

      <Stack gap={1}>
        <h3 className="text-sm font-semibold">
          A child&apos;s own size still wins
        </h3>
        <p className="text-sm text-muted-foreground">
          Deliberately mismatched, to show precedence: the group says{' '}
          <code>sm</code> and the button overrides with <code>lg</code>. This is
          the escape hatch, not a recommended pattern — a group normally reads
          as one unit.
        </p>
        <ButtonGroup size="sm" aria-label="Override example" className="mt-2">
          <Input placeholder="Inherits sm" aria-label="Inherits sm" />
          <Button variant="primary" size="lg">
            Explicit lg
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
}`,...n.parameters?.docs?.source},description:{story:"Grouped controls. `ButtonGroup` and `InputGroup` take a `size` and cascade\nit through context, so every child matches without the author repeating it\n— and a group with a mismatched child is not expressible by accident.\n\nThis is where a height mismatch is unmissable, because the controls share\nedges: before the shared scale, a 40px Input beside a 48px Button left a\nvisible step in something meant to read as one unit. `items-stretch` could\nnot save it, since both children set explicit heights.",...n.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <Inline gap={6} align="center">
      <DSCheckbox label="Include expired" />
      <Switch label="Auto-renew" />
    </Inline>
}`,...i.parameters?.docs?.source},description:{story:`Boolean controls sit on their own scale — they are glyphs, not text boxes,
so they do not take the text-control heights. Shown for completeness.`,...i.parameters?.docs?.description}}};export{o as AgainstButton,s as AllControls,i as BooleanControls,n as GroupedControls,Ne as __namedExportsOrder,ke as default};
