import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./calendar-DsOUbIGe.js";var o,s,c,l,u,d,f;function p(){return(p=t((()=>{o=e(n(),1),i(),s=r(),c={title:`Components/Calendar`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"# Calendar\n\n`react-day-picker` v10 wrapper re-skinned to pull colors from\n`getRoleColor()` instead of the library's default `--rdp-*` CSS variables\n— selected day uses `interactive.primary`/`text.onAccent`, today gets a\n`border.default` ring, and disabled days are dimmed via `text.disabled`.\nNo MDS/Figma spec exists for this component yet."}}}},l={render:()=>{let[e,t]=o.useState(new Date);return(0,s.jsx)(`div`,{className:`rounded-lg border p-1`,children:(0,s.jsx)(a,{mode:`single`,selected:e,onSelect:t})})}},u={render:()=>{let[e,t]=o.useState(),n=new Date;return n.setHours(0,0,0,0),(0,s.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,s.jsx)(`div`,{className:`rounded-lg border p-1`,children:(0,s.jsx)(a,{mode:`single`,selected:e,onSelect:t,disabled:{before:n}})}),(0,s.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:e?`Policy effective ${e.toLocaleDateString()}`:`Select an effective date`})]})}},d={render:()=>{let[e,t]=o.useState({from:new Date,to:void 0});return(0,s.jsx)(`div`,{className:`rounded-lg border p-1`,children:(0,s.jsx)(a,{mode:`range`,required:!1,numberOfMonths:2,selected:e,onSelect:t})})}},f=[`SingleDatePicker`,`PolicyEffectiveDate`,`MultiMonthRange`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(new Date());
    return <div className="rounded-lg border p-1">
        <Calendar mode="single" selected={selected} onSelect={setSelected} />
      </div>;
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source},description:{story:`Policy-effective-date field: only today and future dates are selectable.`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: undefined
    });
    return <div className="rounded-lg border p-1">
        <Calendar mode="range" required={false} numberOfMonths={2} selected={range} onSelect={setRange} />
      </div>;
  }
}`,...d.parameters?.docs?.source}}}})))()}p();export{d as MultiMonthRange,u as PolicyEffectiveDate,l as SingleDatePicker,f as __namedExportsOrder,c as default};