import{a5 as a,Z as e}from"./iframe-CPBTUrEW.js";import{R as n,T as r,C as l}from"./index-DVS6D9kq.js";import{C as i}from"./chevrons-up-down-DNeGP8GW.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-ydzPhmoe.js";import"./index-CQZ-MLQt.js";import"./index-DTX6ga2Q.js";import"./index-DbquDQCT.js";import"./index-D0Uu3jyy.js";import"./index-209NtBVq.js";import"./createLucideIcon-BnpAccaP.js";const p=n,m=r,d=l,T={title:"Components/Collapsible",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`# Collapsible

No MDS/Figma spec exists for this component — a thin, unstyled re-export
of Radix Collapsible (matching the standard convention). Compose it
with role-token-driven styles at the call site, as shown below.`}}}},s={render:()=>{const[t,o]=a.useState(!1);return e.jsxs(p,{open:t,onOpenChange:o,className:"w-[320px]",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm font-semibold",children:"3 policies"}),e.jsx(m,{asChild:!0,children:e.jsx("button",{className:"rounded p-1.5 hover:bg-gray-100","aria-label":"Toggle",children:e.jsx(i,{className:"h-4 w-4"})})})]}),e.jsx("div",{className:"rounded border px-3 py-2 text-sm",children:"Commercial Auto"}),e.jsxs(d,{className:"mt-2 flex flex-col gap-2",children:[e.jsx("div",{className:"rounded border px-3 py-2 text-sm",children:"General Liability"}),e.jsx("div",{className:"rounded border px-3 py-2 text-sm",children:"Cyber Liability"})]})]})}},O=["Default"];s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};export{s as Default,O as __namedExportsOrder,T as default};
