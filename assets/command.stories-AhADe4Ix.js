import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./createLucideIcon-DC6xoXt7.js";import{n as a,t as o}from"./calendar-Pnht3umM.js";import{n as s,t as c}from"./credit-card-Bt5qQxhP.js";import{n as l,t as u}from"./settings-B6ZPIfMm.js";import{n as d,t as f}from"./user-NoPOQMOw.js";import{n as p,t as m}from"./button-DatWLSj0.js";import{a as h,c as g,i as _,l as v,n as y,o as b,r as x,s as S,t as C,u as w}from"./command-DWkD0EBr.js";var T,E;function D(){return(D=e((()=>{r(),T=[[`rect`,{width:`16`,height:`20`,x:`4`,y:`2`,rx:`2`,key:`1nb95v`}],[`line`,{x1:`8`,x2:`16`,y1:`6`,y2:`6`,key:`x4nwl0`}],[`line`,{x1:`16`,x2:`16`,y1:`14`,y2:`18`,key:`wjye3r`}],[`path`,{d:`M16 10h.01`,key:`1m94wz`}],[`path`,{d:`M12 10h.01`,key:`1nrarc`}],[`path`,{d:`M8 10h.01`,key:`19clt8`}],[`path`,{d:`M12 14h.01`,key:`1etili`}],[`path`,{d:`M8 14h.01`,key:`6423bh`}],[`path`,{d:`M12 18h.01`,key:`mhygvu`}],[`path`,{d:`M8 18h.01`,key:`lrp35t`}]],E=i(`calculator`,T)})))()}var O,k;function A(){return(A=e((()=>{r(),O=[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M8 14s1.5 2 4 2 4-2 4-2`,key:`1y1vjs`}],[`line`,{x1:`9`,x2:`9.01`,y1:`9`,y2:`9`,key:`yxxnd0`}],[`line`,{x1:`15`,x2:`15.01`,y1:`9`,y2:`9`,key:`1p4y9e`}]],k=i(`smile`,O)})))()}var j,M,N,P,F,I;function L(){return(L=e((()=>{p(),j=t(),D(),a(),s(),l(),A(),d(),w(),M=n(),N={title:`Components/Command`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# Command\n\nNo MDS/Figma spec exists for this component — built directly on the `cmdk` library, styled with\n`getRoleColor()`."}}}},P={render:()=>(0,M.jsxs)(C,{className:`w-[320px] rounded-lg border shadow-md`,children:[(0,M.jsx)(h,{placeholder:`Type a command or search...`}),(0,M.jsxs)(S,{children:[(0,M.jsx)(x,{children:`No results found.`}),(0,M.jsxs)(_,{heading:`Suggestions`,children:[(0,M.jsxs)(b,{children:[(0,M.jsx)(o,{className:`h-4 w-4`}),` Calendar`]}),(0,M.jsxs)(b,{children:[(0,M.jsx)(k,{className:`h-4 w-4`}),` Search Emoji`]}),(0,M.jsxs)(b,{children:[(0,M.jsx)(E,{className:`h-4 w-4`}),` Calculator`]})]}),(0,M.jsx)(g,{}),(0,M.jsxs)(_,{heading:`Settings`,children:[(0,M.jsxs)(b,{children:[(0,M.jsx)(f,{className:`h-4 w-4`}),` Profile `,(0,M.jsx)(v,{children:`⌘P`})]}),(0,M.jsxs)(b,{children:[(0,M.jsx)(c,{className:`h-4 w-4`}),` Billing `,(0,M.jsx)(v,{children:`⌘B`})]}),(0,M.jsxs)(b,{children:[(0,M.jsx)(u,{className:`h-4 w-4`}),` Settings `,(0,M.jsx)(v,{children:`⌘S`})]})]})]})]})},F={render:()=>{let[e,t]=(0,j.useState)(!1);return(0,j.useEffect)(()=>{let e=e=>{e.key===`k`&&(e.metaKey||e.ctrlKey)&&(e.preventDefault(),t(e=>!e))};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[]),(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(m,{variant:`outline`,size:`sm`,onClick:()=>t(!0),children:`Open command palette (⌘K)`}),(0,M.jsxs)(y,{open:e,onOpenChange:t,children:[(0,M.jsx)(h,{placeholder:`Type a command or search...`}),(0,M.jsxs)(S,{children:[(0,M.jsx)(x,{children:`No results found.`}),(0,M.jsxs)(_,{heading:`Navigation`,children:[(0,M.jsx)(b,{children:`Go to Dashboard`}),(0,M.jsx)(b,{children:`Go to Policies`}),(0,M.jsx)(b,{children:`Go to Claims`})]})]})]})]})}},I=[`Default`,`CommandPalette`],P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}}})))()}L();export{F as CommandPalette,P as Default,I as __namedExportsOrder,N as default};