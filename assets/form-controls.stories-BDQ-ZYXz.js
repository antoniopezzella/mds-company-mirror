import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./checkbox-DdklOp-r.js";import{o,t as s}from"./date-picker-CALhKD7f.js";import{n as c,t as l}from"./button-DatWLSj0.js";import{n as u,t as d}from"./input-Bj4eDxQ0.js";import{n as f,t as p}from"./textarea-l8XJv4h3.js";import{t as m,u as h}from"./select-BbcdR6zw.js";import{n as g,r as _,t as v}from"./stack-BlYcYnw2.js";import{i as y,t as b}from"./button-group-DY3d43rr.js";import{n as x,t as S}from"./combobox-t_QCX9WS.js";import{n as C,t as w}from"./switch-BoGCquMa.js";function T({label:e,children:t}){let n=E.useRef(null),[r,i]=E.useState(null);return E.useLayoutEffect(()=>{let e=n.current?.firstElementChild;if(!e)return;let t=e.querySelector(`input,textarea,button,[role=combobox]`)??e;i(Math.round(t.getBoundingClientRect().height))},[]),(0,D.jsxs)(g,{gap:1,children:[(0,D.jsxs)(`span`,{className:`text-xs font-medium text-muted-foreground`,children:[e,r!==null&&(0,D.jsxs)(`span`,{className:`ml-2 font-mono`,children:[r,`px`]})]}),(0,D.jsx)(`div`,{ref:n,children:t})]})}var E,D,O,k,A,j,M,N,P,F,I;function L(){return(L=t((()=>{E=e(n(),1),u(),f(),h(),x(),o(),c(),y(),a(),C(),_(),D=r(),O={title:`Components/Form Controls`,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`All text-entry controls at every size, with measured heights, so cross-component inconsistency is visible rather than something you discover in a layout.`}}}},k=[{value:`property`,label:`Property`},{value:`liability`,label:`Liability`},{value:`cyber`,label:`Cyber`}],A=[{value:`beacon`,label:`Beacon Capital`},{value:`northwind`,label:`Northwind Logistics`}],j=[`sm`,`md`,`lg`],M={render:()=>(0,D.jsx)(g,{gap:8,children:j.map(e=>(0,D.jsxs)(g,{gap:3,children:[(0,D.jsxs)(`h3`,{className:`text-sm font-semibold`,children:[`size="`,e,`"`]}),(0,D.jsxs)(v,{gap:3,align:`end`,wrap:!1,className:`overflow-x-auto pb-2`,children:[(0,D.jsx)(T,{label:`Input`,children:(0,D.jsx)(d,{size:e,placeholder:`Policy number`,"aria-label":`Policy number`})}),(0,D.jsx)(T,{label:`Select`,children:(0,D.jsx)(m,{options:k,size:e,placeholder:`Coverage`,"aria-label":`Coverage type`})}),(0,D.jsx)(T,{label:`Button`,children:(0,D.jsx)(l,{size:e,variant:`primary`,children:`Search`})})]})]},e))})},N={render:()=>(0,D.jsx)(g,{gap:8,children:j.map(e=>(0,D.jsxs)(g,{gap:3,children:[(0,D.jsxs)(`h3`,{className:`text-sm font-semibold`,children:[`size="`,e,`"`]}),(0,D.jsxs)(`div`,{className:`grid gap-4 sm:grid-cols-2 lg:grid-cols-3`,children:[(0,D.jsx)(T,{label:`Input`,children:(0,D.jsx)(d,{size:e,placeholder:`Policy number`,"aria-label":`Policy number`})}),(0,D.jsx)(T,{label:`Select`,children:(0,D.jsx)(m,{options:k,size:e,placeholder:`Coverage`,"aria-label":`Coverage type`})}),(0,D.jsx)(T,{label:`Combobox`,children:(0,D.jsx)(S,{options:A,size:e,placeholder:`Client`,"aria-label":`Client`})}),(0,D.jsx)(T,{label:`DatePicker`,children:(0,D.jsx)(s,{size:e,placeholder:`Effective date`})}),(0,D.jsx)(T,{label:`Textarea`,children:(0,D.jsx)(p,{size:e,placeholder:`Loss description`,rows:2,"aria-label":`Loss description`})})]})]},e))})},P={render:()=>(0,D.jsxs)(g,{gap:8,children:[j.map(e=>(0,D.jsxs)(g,{gap:3,children:[(0,D.jsxs)(`h3`,{className:`text-sm font-semibold`,children:[`<ButtonGroup size="`,e,`"> — children inherit`]}),(0,D.jsxs)(b,{size:e,"aria-label":`Policy search, ${e}`,children:[(0,D.jsx)(d,{placeholder:`Policy number`,"aria-label":`Policy number`}),(0,D.jsx)(m,{options:k,placeholder:`Coverage`,"aria-label":`Coverage type`}),(0,D.jsx)(l,{variant:`primary`,children:`Search`})]})]},e)),(0,D.jsxs)(g,{gap:1,children:[(0,D.jsx)(`h3`,{className:`text-sm font-semibold`,children:`A child's own size still wins`}),(0,D.jsxs)(`p`,{className:`text-sm text-muted-foreground`,children:[`Deliberately mismatched, to show precedence: the group says`,` `,(0,D.jsx)(`code`,{children:`sm`}),` and the button overrides with `,(0,D.jsx)(`code`,{children:`lg`}),`. This is the escape hatch, not a recommended pattern — a group normally reads as one unit.`]}),(0,D.jsxs)(b,{size:`sm`,"aria-label":`Override example`,className:`mt-2`,children:[(0,D.jsx)(d,{placeholder:`Inherits sm`,"aria-label":`Inherits sm`}),(0,D.jsx)(l,{variant:`primary`,size:`lg`,children:`Explicit lg`})]})]})]})},F={render:()=>(0,D.jsxs)(v,{gap:6,align:`center`,children:[(0,D.jsx)(i,{label:`Include expired`}),(0,D.jsx)(w,{label:`Auto-renew`})]})},I=[`AgainstButton`,`AllControls`,`GroupedControls`,`BooleanControls`],M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source},description:{story:`The core check: each control beside a Button of the same declared size.
Any height mismatch shows immediately as a step in the row.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source},description:{story:`Every text-entry control at every size, to compare padding and type scale.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source},description:{story:"Grouped controls. `ButtonGroup` and `InputGroup` take a `size` and cascade\nit through context, so every child matches without the author repeating it\n— and a group with a mismatched child is not expressible by accident.\n\nThis is where a height mismatch is unmissable, because the controls share\nedges: before the shared scale, a 40px Input beside a 48px Button left a\nvisible step in something meant to read as one unit. `items-stretch` could\nnot save it, since both children set explicit heights.",...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <Inline gap={6} align="center">
      <DSCheckbox label="Include expired" />
      <Switch label="Auto-renew" />
    </Inline>
}`,...F.parameters?.docs?.source},description:{story:`Boolean controls sit on their own scale — they are glyphs, not text boxes,
so they do not take the text-control heights. Shown for completeness.`,...F.parameters?.docs?.description}}}})))()}L();export{M as AgainstButton,N as AllControls,F as BooleanControls,P as GroupedControls,I as __namedExportsOrder,O as default};