import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./chevrons-up-down-C6VVTDSD.js";import{a,n as o,r as s,t as c}from"./dist-DSWH_plZ.js";var l,u,d;function f(){return(f=e((()=>{a(),l=o,u=s,d=c})))()}var p,m,h,g,_;function v(){return(v=e((()=>{p=t(),r(),f(),m=n(),h={title:`Components/Collapsible`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`# Collapsible

No MDS/Figma spec exists for this component — a thin, unstyled re-export
of Radix Collapsible (matching the standard convention). Compose it
with role-token-driven styles at the call site, as shown below.`}}}},g={render:()=>{let[e,t]=(0,p.useState)(!1);return(0,m.jsxs)(l,{open:e,onOpenChange:t,className:`w-[320px]`,children:[(0,m.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,m.jsx)(`span`,{className:`text-sm font-semibold`,children:`3 policies`}),(0,m.jsx)(u,{asChild:!0,children:(0,m.jsx)(`button`,{className:`rounded p-1.5 hover:bg-gray-100`,"aria-label":`Toggle`,children:(0,m.jsx)(i,{className:`h-4 w-4`})})})]}),(0,m.jsx)(`div`,{className:`rounded border px-3 py-2 text-sm`,children:`Commercial Auto`}),(0,m.jsxs)(d,{className:`mt-2 flex flex-col gap-2`,children:[(0,m.jsx)(`div`,{className:`rounded border px-3 py-2 text-sm`,children:`General Liability`}),(0,m.jsx)(`div`,{className:`rounded border px-3 py-2 text-sm`,children:`Cyber Liability`})]})]})}},_=[`Default`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <Collapsible open={open} onOpenChange={setOpen} className="w-[320px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">3 policies</span>
          <CollapsibleTrigger asChild>
            <button className="rounded p-1.5 hover:bg-gray-100" aria-label="Toggle">
              <ChevronsUpDown className="h-4 w-4" />
            </button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded border px-3 py-2 text-sm">Commercial Auto</div>
        <CollapsibleContent className="mt-2 flex flex-col gap-2">
          <div className="rounded border px-3 py-2 text-sm">General Liability</div>
          <div className="rounded border px-3 py-2 text-sm">Cyber Liability</div>
        </CollapsibleContent>
      </Collapsible>;
  }
}`,...g.parameters?.docs?.source}}}})))()}v();export{g as Default,_ as __namedExportsOrder,h as default};