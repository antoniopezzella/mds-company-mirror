import{a5 as d,Z as e}from"./iframe-CPBTUrEW.js";import{C as o}from"./calendar-CfacuH8P.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./chevron-left-N_nrbjRa.js";import"./createLucideIcon-BnpAccaP.js";import"./chevron-right-BXCmPxW2.js";const S={title:"Components/Calendar",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"# Calendar\n\n`react-day-picker` v10 wrapper re-skinned to pull colors from\n`getRoleColor()` instead of the library's default `--rdp-*` CSS variables\n— selected day uses `interactive.primary`/`text.onAccent`, today gets a\n`border.default` ring, and disabled days are dimmed via `text.disabled`.\nNo MDS/Figma spec exists for this component yet."}}}},a={render:()=>{const[t,r]=d.useState(new Date);return e.jsx("div",{className:"rounded-lg border p-1",children:e.jsx(o,{mode:"single",selected:t,onSelect:r})})}},n={render:()=>{const[t,r]=d.useState(),c=new Date;return c.setHours(0,0,0,0),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx("div",{className:"rounded-lg border p-1",children:e.jsx(o,{mode:"single",selected:t,onSelect:r,disabled:{before:c}})}),e.jsx("p",{className:"text-sm text-muted-foreground",children:t?`Policy effective ${t.toLocaleDateString()}`:"Select an effective date"})]})}},s={render:()=>{const[t,r]=d.useState({from:new Date,to:void 0});return e.jsx("div",{className:"rounded-lg border p-1",children:e.jsx(o,{mode:"range",required:!1,numberOfMonths:2,selected:t,onSelect:r})})}},v=["SingleDatePicker","PolicyEffectiveDate","MultiMonthRange"];a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(new Date());
    return <div className="rounded-lg border p-1">
        <Calendar mode="single" selected={selected} onSelect={setSelected} />
      </div>;
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return <div className="flex flex-col items-center gap-2">
        <div className="rounded-lg border p-1">
          <Calendar mode="single" selected={selected} onSelect={setSelected} disabled={{
          before: today
        }} />
        </div>
        <p className="text-sm text-muted-foreground">
          {selected ? \`Policy effective \${selected.toLocaleDateString()}\` : 'Select an effective date'}
        </p>
      </div>;
  }
}`,...n.parameters?.docs?.source},description:{story:"Policy-effective-date field: only today and future dates are selectable.",...n.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: undefined
    });
    return <div className="rounded-lg border p-1">
        <Calendar mode="range" required={false} numberOfMonths={2} selected={range} onSelect={setRange} />
      </div>;
  }
}`,...s.parameters?.docs?.source}}};export{s as MultiMonthRange,n as PolicyEffectiveDate,a as SingleDatePicker,v as __namedExportsOrder,S as default};
