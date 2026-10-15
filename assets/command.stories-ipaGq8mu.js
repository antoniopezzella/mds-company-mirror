import{a5 as i,Z as e}from"./iframe-CPBTUrEW.js";import{B as x}from"./button-_tNb_vhW.js";import{a as y,d as c,f as l,b as p,c as s,e as n,C as g,g as j,h as r}from"./command-ChJErH62.js";import{C as f}from"./calendar-BknvOJFQ.js";import{c as h}from"./createLucideIcon-BnpAccaP.js";import{U as S}from"./user-D5NxaQZ-.js";import{C as k}from"./credit-card-CwI8B8IA.js";import{S as w}from"./settings-NHNxKTBP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./control-size-rvCN7ZpI.js";import"./index-BiNW7bVc.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-ydzPhmoe.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./dialog-C1dHRi-6.js";import"./x-Bk_wSNf2.js";import"./search-DRVimkv9.js";const I=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]],N=h("calculator",I);const E=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]],v=h("smile",E),oe={title:"Components/Command",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# Command\n\nNo MDS/Figma spec exists for this component — built directly on the `cmdk` library, styled with\n`getRoleColor()`."}}}},m={render:()=>e.jsxs(g,{className:"w-[320px] rounded-lg border shadow-md",children:[e.jsx(c,{placeholder:"Type a command or search..."}),e.jsxs(l,{children:[e.jsx(p,{children:"No results found."}),e.jsxs(s,{heading:"Suggestions",children:[e.jsxs(n,{children:[e.jsx(f,{className:"h-4 w-4"})," Calendar"]}),e.jsxs(n,{children:[e.jsx(v,{className:"h-4 w-4"})," Search Emoji"]}),e.jsxs(n,{children:[e.jsx(N,{className:"h-4 w-4"})," Calculator"]})]}),e.jsx(j,{}),e.jsxs(s,{heading:"Settings",children:[e.jsxs(n,{children:[e.jsx(S,{className:"h-4 w-4"})," Profile ",e.jsx(r,{children:"⌘P"})]}),e.jsxs(n,{children:[e.jsx(k,{className:"h-4 w-4"})," Billing ",e.jsx(r,{children:"⌘B"})]}),e.jsxs(n,{children:[e.jsx(w,{className:"h-4 w-4"})," Settings ",e.jsx(r,{children:"⌘S"})]})]})]})]})},a={render:()=>{const[C,t]=i.useState(!1);return i.useEffect(()=>{const d=o=>{o.key==="k"&&(o.metaKey||o.ctrlKey)&&(o.preventDefault(),t(u=>!u))};return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[]),e.jsxs(e.Fragment,{children:[e.jsx(x,{variant:"outline",size:"sm",onClick:()=>t(!0),children:"Open command palette (⌘K)"}),e.jsxs(y,{open:C,onOpenChange:t,children:[e.jsx(c,{placeholder:"Type a command or search..."}),e.jsxs(l,{children:[e.jsx(p,{children:"No results found."}),e.jsxs(s,{heading:"Navigation",children:[e.jsx(n,{children:"Go to Dashboard"}),e.jsx(n,{children:"Go to Policies"}),e.jsx(n,{children:"Go to Claims"})]})]})]})]})}},me=["Default","CommandPalette"];m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Command className="w-[320px] rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem><Calendar className="h-4 w-4" /> Calendar</CommandItem>
          <CommandItem><Smile className="h-4 w-4" /> Search Emoji</CommandItem>
          <CommandItem><Calculator className="h-4 w-4" /> Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="h-4 w-4" /> Profile <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="h-4 w-4" /> Billing <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="h-4 w-4" /> Settings <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
}`,...m.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen(o => !o);
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, []);
    return <>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open command palette (⌘K)</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem>Go to Dashboard</CommandItem>
              <CommandItem>Go to Policies</CommandItem>
              <CommandItem>Go to Claims</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>;
  }
}`,...a.parameters?.docs?.source}}};export{a as CommandPalette,m as Default,me as __namedExportsOrder,oe as default};
