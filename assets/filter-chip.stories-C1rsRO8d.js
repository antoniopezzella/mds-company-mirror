import{Z as e,a5 as d}from"./iframe-CPBTUrEW.js";import{F as r,b as m,a as k}from"./filter-chip-CfiB6TWx.js";import{B as j}from"./badge-J44eyYsr.js";import{B}from"./button-_tNb_vhW.js";import{S as o}from"./stack-C88a0npI.js";import{G as T}from"./globe-oRqhZ2w4.js";import{c as M}from"./createLucideIcon-BnpAccaP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./dropdown-menu-B-DEwsfR.js";import"./index-B2KxKFY1.js";import"./index-DTX6ga2Q.js";import"./index-D-VHP59e.js";import"./index-ydzPhmoe.js";import"./index-CQZ-MLQt.js";import"./index-DbquDQCT.js";import"./index-VWR8Du3y.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-CDKxNHGJ.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";import"./check-KuCy08bp.js";import"./chevron-right-BXCmPxW2.js";import"./chevron-down-122XaqBk.js";import"./x-Bk_wSNf2.js";import"./control-size-rvCN7ZpI.js";const P=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],F=M("briefcase",P),{expect:c,screen:E,userEvent:v,within:C}=__STORYBOOK_MODULE_TEST__,xe={title:"Components/FilterChip",component:r,tags:["autodocs"],parameters:{docs:{description:{component:["A toggleable control that **filters content**. Selection is its whole purpose —","anything without it is a [`Badge`](/docs/components-badge--docs).","","Material names four chip types and separates them by *purpose*, not appearance:","**assist** (a contextual action), **filter** (filters content), **input** (something","the person entered) and **suggestion** (a system-generated hint). Only filter chips","carry selection state. Collapsing all four into one component is what led eight call","sites in this repo to use a chip as a static label — each shipping a focusable","`<button>` announced as a button with no action behind it.","","**Selection is carried by a checkmark and `aria-pressed`, never by colour alone.**","Group chips in a `FilterChipSet` so the row costs one tab stop rather than one per chip."].join(`
`)}}},argTypes:{selected:{control:"boolean",description:"Whether the filter is applied. Drives the checkmark and `aria-pressed`."},hasMenu:{control:"boolean",description:"Trailing chevron for a chip that opens a menu of values."},size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"}}},R=["Active","Pending","Expired","Cancelled"],A={args:{label:"Active",selected:!1}},u={render:function(){const[t,s]=d.useState(["Active"]),i=(n,a)=>s(p=>a?[...p,n]:p.filter(S=>S!==n));return e.jsxs(o,{gap:3,children:[e.jsxs(m,{label:"Filter policies by status",children:[R.map(n=>e.jsx(r,{label:n,selected:t.includes(n),onSelectedChange:a=>i(n,a)},n)),e.jsx(r,{label:"Region: EMEA",hasMenu:!0,icon:e.jsx(T,{})})]}),e.jsx("p",{className:"text-sm text-muted-foreground",children:t.length===0?"Showing all 128 policies":`Showing policies matching ${t.length} filter${t.length===1?"":"s"}`}),t.length>0&&e.jsx("div",{children:e.jsx(B,{variant:"tertiary",size:"sm",onClick:()=>s([]),children:"Clear all"})})]})}},h={render:()=>e.jsxs(o,{gap:4,children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsx(r,{label:"Unselected",selected:!1}),e.jsx(r,{label:"Selected",selected:!0}),e.jsx(r,{label:"Unselected, icon",icon:e.jsx(F,{})}),e.jsx(r,{label:"Selected, icon",icon:e.jsx(F,{}),selected:!0})]}),e.jsx("p",{className:"max-w-prose text-sm text-muted-foreground",children:"The leading icon slot is shared: when a chip is selected the checkmark takes it, because the selection state matters more than the category icon and two leading glyphs read as clutter."})]})},g={render:function(){const[t,s]=d.useState(["emea"]),[i,n]=d.useState([]);return e.jsxs(m,{label:"Filter by attribute",children:[e.jsx(k,{label:"Region",value:t,onValueChange:s,options:[{value:"emea",label:"EMEA",count:48},{value:"amer",label:"Americas",count:62},{value:"apac",label:"APAC",count:18}]}),e.jsx(k,{label:"Line of business",value:i,onValueChange:n,options:[{value:"property",label:"Property",count:31},{value:"casualty",label:"Casualty",count:44},{value:"cyber",label:"Cyber",count:12},{value:"marine",label:"Marine",disabled:!0}]})]})},play:async({canvasElement:l,step:t})=>{const s=C(l);await t("the chip summarises what is applied without being opened",async()=>{await c(s.getByRole("button",{name:/Region: EMEA/})).toBeInTheDocument()}),await t("it actually opens, and multi-select keeps it open",async()=>{await v.click(s.getByRole("button",{name:/Region: EMEA/}));const i=await E.findByRole("menuitemcheckbox",{name:/Americas/});await v.click(i),await c(E.getByRole("menuitemcheckbox",{name:/APAC/})).toBeInTheDocument()}),await t("Escape closes it, and the label reports what is applied",async()=>{await v.keyboard("{Escape}"),await c(await s.findByRole("button",{name:/Region: 2/})).toBeInTheDocument()})}},b={render:function(){const[t,s]=d.useState([{id:"r",label:"Region: EMEA"},{id:"l",label:"Line: Property"},{id:"p",label:"Premium > $10k"}]);return e.jsxs(o,{gap:3,children:[e.jsx(m,{label:"Applied filters",children:t.map(i=>e.jsx(r,{label:i.label,selected:!0,onRemove:()=>s(n=>n.filter(a=>a.id!==i.id))},i.id))}),t.length===0&&e.jsx("p",{className:"text-sm text-muted-foreground",children:"No filters applied."})]})}},x={render:()=>e.jsx(o,{gap:5,children:["sm","md","lg"].map(l=>e.jsxs(o,{gap:2,children:[e.jsx("span",{className:"text-xs font-medium uppercase tracking-wide text-muted-foreground",children:l}),e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsx(r,{size:l,label:"Enabled"}),e.jsx(r,{size:l,label:"Selected",selected:!0}),e.jsx(r,{size:l,label:"With menu",hasMenu:!0}),e.jsx(r,{size:l,label:"Removable",selected:!0,onRemove:()=>{}}),e.jsx(r,{size:l,label:"Disabled",disabled:!0}),e.jsx(r,{size:l,label:"Disabled selected",selected:!0,disabled:!0})]})]},l))})},y={render:()=>e.jsxs(o,{gap:5,children:[e.jsxs(o,{gap:2,children:[e.jsx("span",{className:"text-sm font-medium",children:"Badge — a fact about a row"}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(j,{tone:"success",children:"Active"}),e.jsx(j,{tone:"warning",children:"Pending"}),e.jsx(j,{tone:"danger",children:"Expired"})]}),e.jsx("p",{className:"max-w-prose text-sm text-muted-foreground",children:"Not focusable, not clickable. A screen reader reads it as text."})]}),e.jsxs(o,{gap:2,children:[e.jsx("span",{className:"text-sm font-medium",children:"FilterChip — a control that changes the results"}),e.jsxs(m,{label:"Filter by status",children:[e.jsx(r,{label:"Active",selected:!0}),e.jsx(r,{label:"Pending"}),e.jsx(r,{label:"Expired"})]}),e.jsx("p",{className:"max-w-prose text-sm text-muted-foreground",children:"Focusable, toggleable, announced as a pressed or unpressed button."})]})]})},f={render:function(){const[t,s]=d.useState([]);return e.jsxs(o,{gap:3,children:[e.jsx(m,{label:"Filter policies by status",children:R.map(i=>e.jsx(r,{label:i,selected:t.includes(i),onSelectedChange:n=>s(a=>n?[...a,i]:a.filter(p=>p!==i))},i))}),e.jsxs("p",{"data-testid":"applied",className:"text-sm text-muted-foreground",children:["Applied: ",t.length?t.join(", "):"none"]})]})},play:async({canvasElement:l,step:t})=>{const s=C(l),i=s.getByRole("toolbar",{name:"Filter policies by status"}),n=C(i).getAllByRole("button");await t("the whole set is a single tab stop",async()=>{await c(n.filter(a=>a.tabIndex===0)).toHaveLength(1)}),await t("arrows move between chips",async()=>{n[0].focus(),await v.keyboard("{ArrowRight}{ArrowRight}"),await c(document.activeElement).toBe(n[2])}),await t("Space applies the focused filter",async()=>{await v.keyboard(" "),await c(s.getByTestId("applied")).toHaveTextContent("Applied: Expired"),await c(n[2]).toHaveAttribute("aria-pressed","true")})}},w={render:function(){const t=[{id:1,policy:"Commercial Auto",status:"Active",premium:"$12,400"},{id:2,policy:"General Liability",status:"Active",premium:"$8,200"},{id:3,policy:"Cyber Liability",status:"Pending",premium:"$15,900"},{id:4,policy:"Workers Comp",status:"Expired",premium:"$9,600"}],[s,i]=d.useState([]),n=s.length?t.filter(a=>s.includes(a.status)):t;return e.jsxs(o,{gap:3,children:[e.jsx(m,{label:"Filter policies by status",children:["Active","Pending","Expired"].map(a=>e.jsx(r,{label:a,selected:s.includes(a),onSelectedChange:p=>i(S=>p?[...S,a]:S.filter(N=>N!==a))},a))}),e.jsxs("table",{className:"w-full border-collapse text-sm",children:[e.jsx("caption",{className:"sr-only",children:"Policies"}),e.jsx("thead",{children:e.jsxs("tr",{className:"border-b text-left",children:[e.jsx("th",{scope:"col",className:"py-2 font-medium",children:"Policy"}),e.jsx("th",{scope:"col",className:"py-2 font-medium",children:"Status"}),e.jsx("th",{scope:"col",className:"py-2 text-right font-medium",children:"Premium"})]})}),e.jsx("tbody",{children:n.map(a=>e.jsxs("tr",{className:"border-b",children:[e.jsx("td",{className:"py-2",children:a.policy}),e.jsx("td",{className:"py-2",children:e.jsx(j,{tone:a.status==="Active"?"success":a.status==="Expired"?"danger":"warning",size:"sm",children:a.status})}),e.jsx("td",{className:"py-2 text-right tabular-nums",children:a.premium})]},a.id))})]}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:[n.length," of ",t.length," policies"]})]})}},ye=["Default","FilterBar","SelectionIsObvious","WithValueMenu","RemovableFilters","AllStates","NotABadge","KeyboardOnly","InAGridToolbar"];A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Active',
    selected: false
  }
}`,...A.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [applied, setApplied] = React.useState<string[]>(['Active']);
    const toggle = (s: string, on: boolean) => setApplied(prev => on ? [...prev, s] : prev.filter(p => p !== s));
    return <Stack gap={3}>
        <FilterChipSet label="Filter policies by status">
          {STATUSES.map(s => <FilterChip key={s} label={s} selected={applied.includes(s)} onSelectedChange={on => toggle(s, on)} />)}
          <FilterChip label="Region: EMEA" hasMenu icon={<Globe />} />
        </FilterChipSet>
        <p className="text-sm text-muted-foreground">
          {applied.length === 0 ? 'Showing all 128 policies' : \`Showing policies matching \${applied.length} filter\${applied.length === 1 ? '' : 's'}\`}
        </p>
        {applied.length > 0 && <div>
            <Button variant="tertiary" size="sm" onClick={() => setApplied([])}>
              Clear all
            </Button>
          </div>}
      </Stack>;
  }
}`,...u.parameters?.docs?.source},description:{story:`The canonical case: a row of filters over a dataset, with the applied count
and a way out. The whole row is **one tab stop** — arrows move between chips.`,...u.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={4}>
      <div className="flex flex-wrap items-center gap-3">
        <FilterChip label="Unselected" selected={false} />
        <FilterChip label="Selected" selected />
        <FilterChip label="Unselected, icon" icon={<Briefcase />} />
        <FilterChip label="Selected, icon" icon={<Briefcase />} selected />
      </div>
      <p className="max-w-prose text-sm text-muted-foreground">
        The leading icon slot is shared: when a chip is selected the checkmark
        takes it, because the selection state matters more than the category
        icon and two leading glyphs read as clutter.
      </p>
    </Stack>
}`,...h.parameters?.docs?.source},description:{story:`Selection must survive without colour. A selected chip gains a **checkmark**
and \`aria-pressed="true"\`; the fill is reinforcement, not the signal.

This is the story that would have caught the previous implementation, whose
selected state was a 2px inset ring — visually indistinguishable from focus,
and invisible to assistive technology.`,...h.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [region, setRegion] = React.useState<string[]>(['emea']);
    const [line, setLine] = React.useState<string[]>([]);
    return <FilterChipSet label="Filter by attribute">
        <FilterChipMenu label="Region" value={region} onValueChange={setRegion} options={[{
        value: 'emea',
        label: 'EMEA',
        count: 48
      }, {
        value: 'amer',
        label: 'Americas',
        count: 62
      }, {
        value: 'apac',
        label: 'APAC',
        count: 18
      }]} />
        <FilterChipMenu label="Line of business" value={line} onValueChange={setLine} options={[{
        value: 'property',
        label: 'Property',
        count: 31
      }, {
        value: 'casualty',
        label: 'Casualty',
        count: 44
      }, {
        value: 'cyber',
        label: 'Cyber',
        count: 12
      }, {
        value: 'marine',
        label: 'Marine',
        disabled: true
      }]} />
      </FilterChipSet>;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the chip summarises what is applied without being opened', async () => {
      await expect(canvas.getByRole('button', {
        name: /Region: EMEA/
      })).toBeInTheDocument();
    });
    await step('it actually opens, and multi-select keeps it open', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: /Region: EMEA/
      }));
      const amer = await screen.findByRole('menuitemcheckbox', {
        name: /Americas/
      });
      await userEvent.click(amer);
      // Still open — picking three values must not mean reopening three times.
      await expect(screen.getByRole('menuitemcheckbox', {
        name: /APAC/
      })).toBeInTheDocument();
    });
    await step('Escape closes it, and the label reports what is applied', async () => {
      // The trigger is deliberately unreachable while the menu is open: Radix
      // marks the rest of the page aria-hidden, which is correct and is why
      // this assertion has to come after the menu closes.
      await userEvent.keyboard('{Escape}');
      await expect(await canvas.findByRole('button', {
        name: /Region: 2/
      })).toBeInTheDocument();
    });
  }
}`,...g.parameters?.docs?.source},description:{story:`A chip that opens a **real menu** of values rather than toggling on and off.

\`hasMenu\` on its own only draws the chevron — it opens nothing. That is a
promise the control cannot keep, so the common case is wrapped up in
\`FilterChipMenu\`, which composes the existing \`DropdownMenu\` (inheriting its
focus trapping, type-ahead and Escape handling) with the chip as trigger.

The chip's label summarises what is applied — "Region" when nothing is,
"Region: EMEA" for one value, "Region: 3" beyond that — so the user never
has to open it to find out what it is doing.`,...g.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [filters, setFilters] = React.useState([{
      id: 'r',
      label: 'Region: EMEA'
    }, {
      id: 'l',
      label: 'Line: Property'
    }, {
      id: 'p',
      label: 'Premium > $10k'
    }]);
    return <Stack gap={3}>
        <FilterChipSet label="Applied filters">
          {filters.map(f => <FilterChip key={f.id} label={f.label} selected onRemove={() => setFilters(prev => prev.filter(p => p.id !== f.id))} />)}
        </FilterChipSet>
        {filters.length === 0 && <p className="text-sm text-muted-foreground">No filters applied.</p>}
      </Stack>;
  }
}`,...b.parameters?.docs?.source},description:{story:"The applied-filters row. The `×` is a **sibling** control, not nested —\ninteractive content cannot nest in HTML, and axe flags it as\n`nested-interactive`.",...b.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={5}>
      {(['sm', 'md', 'lg'] as const).map(size => <Stack gap={2} key={size}>
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{size}</span>
          <div className="flex flex-wrap items-center gap-3">
            <FilterChip size={size} label="Enabled" />
            <FilterChip size={size} label="Selected" selected />
            <FilterChip size={size} label="With menu" hasMenu />
            <FilterChip size={size} label="Removable" selected onRemove={() => {}} />
            <FilterChip size={size} label="Disabled" disabled />
            <FilterChip size={size} label="Disabled selected" selected disabled />
          </div>
        </Stack>)}
    </Stack>
}`,...x.parameters?.docs?.source},description:{story:"Every state, in the size scale this system uses.",...x.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={5}>
      <Stack gap={2}>
        <span className="text-sm font-medium">Badge — a fact about a row</span>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="success">Active</Badge>
          <Badge tone="warning">Pending</Badge>
          <Badge tone="danger">Expired</Badge>
        </div>
        <p className="max-w-prose text-sm text-muted-foreground">
          Not focusable, not clickable. A screen reader reads it as text.
        </p>
      </Stack>
      <Stack gap={2}>
        <span className="text-sm font-medium">FilterChip — a control that changes the results</span>
        <FilterChipSet label="Filter by status">
          <FilterChip label="Active" selected />
          <FilterChip label="Pending" />
          <FilterChip label="Expired" />
        </FilterChipSet>
        <p className="max-w-prose text-sm text-muted-foreground">
          Focusable, toggleable, announced as a pressed or unpressed button.
        </p>
      </Stack>
    </Stack>
}`,...y.parameters?.docs?.source},description:{story:`**FilterChip is not a Badge.** They look similar and mean opposite things.

| | Badge | FilterChip |
| --- | --- | --- |
| element | \`<span>\` — never focusable | \`<button>\` with \`aria-pressed\` |
| job | states a fact | changes what you are looking at |
| user can act on it | no | yes |

If it does not filter something, it is a Badge. This distinction is the
reason this component exists.`,...y.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [applied, setApplied] = React.useState<string[]>([]);
    return <Stack gap={3}>
        <FilterChipSet label="Filter policies by status">
          {STATUSES.map(s => <FilterChip key={s} label={s} selected={applied.includes(s)} onSelectedChange={on => setApplied(prev => on ? [...prev, s] : prev.filter(p => p !== s))} />)}
        </FilterChipSet>
        <p data-testid="applied" className="text-sm text-muted-foreground">
          Applied: {applied.length ? applied.join(', ') : 'none'}
        </p>
      </Stack>;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const toolbar = canvas.getByRole('toolbar', {
      name: 'Filter policies by status'
    });
    const chips = within(toolbar).getAllByRole('button');
    await step('the whole set is a single tab stop', async () => {
      await expect(chips.filter(c => c.tabIndex === 0)).toHaveLength(1);
    });
    await step('arrows move between chips', async () => {
      chips[0].focus();
      await userEvent.keyboard('{ArrowRight}{ArrowRight}');
      await expect(document.activeElement).toBe(chips[2]);
    });
    await step('Space applies the focused filter', async () => {
      await userEvent.keyboard(' ');
      await expect(canvas.getByTestId('applied')).toHaveTextContent('Applied: Expired');
      await expect(chips[2]).toHaveAttribute('aria-pressed', 'true');
    });
  }
}`,...f.parameters?.docs?.source},description:{story:'Keyboard-only operation, asserted rather than described.\n\nA filter bar with fifteen chips must not cost fifteen Tab presses to skip.\n`FilterChipSet` is a `role="toolbar"` with roving focus: Tab enters at the\nactive chip, arrows move within, Tab leaves.',...f.parameters?.docs?.description}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const rows = [{
      id: 1,
      policy: 'Commercial Auto',
      status: 'Active',
      premium: '$12,400'
    }, {
      id: 2,
      policy: 'General Liability',
      status: 'Active',
      premium: '$8,200'
    }, {
      id: 3,
      policy: 'Cyber Liability',
      status: 'Pending',
      premium: '$15,900'
    }, {
      id: 4,
      policy: 'Workers Comp',
      status: 'Expired',
      premium: '$9,600'
    }];
    const [applied, setApplied] = React.useState<string[]>([]);
    const visible = applied.length ? rows.filter(r => applied.includes(r.status)) : rows;
    return <Stack gap={3}>
        <FilterChipSet label="Filter policies by status">
          {['Active', 'Pending', 'Expired'].map(s => <FilterChip key={s} label={s} selected={applied.includes(s)} onSelectedChange={on => setApplied(prev => on ? [...prev, s] : prev.filter(p => p !== s))} />)}
        </FilterChipSet>
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">Policies</caption>
          <thead>
            <tr className="border-b text-left">
              <th scope="col" className="py-2 font-medium">Policy</th>
              <th scope="col" className="py-2 font-medium">Status</th>
              <th scope="col" className="py-2 text-right font-medium">Premium</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(r => <tr key={r.id} className="border-b">
                <td className="py-2">{r.policy}</td>
                <td className="py-2">
                  <Badge tone={r.status === 'Active' ? 'success' : r.status === 'Expired' ? 'danger' : 'warning'} size="sm">
                    {r.status}
                  </Badge>
                </td>
                <td className="py-2 text-right tabular-nums">{r.premium}</td>
              </tr>)}
          </tbody>
        </table>
        <p className="text-sm text-muted-foreground">
          {visible.length} of {rows.length} policies
        </p>
      </Stack>;
  }
}`,...w.parameters?.docs?.source},description:{story:"Filter chips in the place they actually live — above a table they drive.",...w.parameters?.docs?.description}}};export{x as AllStates,A as Default,u as FilterBar,w as InAGridToolbar,f as KeyboardOnly,y as NotABadge,b as RemovableFilters,h as SelectionIsObvious,g as WithValueMenu,ye as __namedExportsOrder,xe as default};
