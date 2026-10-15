import{a5 as y,Z as t}from"./iframe-CPBTUrEW.js";import{F as w,b as B,c as S}from"./filter-field-control-Bm7UZ_th.js";import{b as E,a as C}from"./filter-chip-CfiB6TWx.js";import{B as R}from"./badge-J44eyYsr.js";import{B as T}from"./button-_tNb_vhW.js";import{D as j}from"./data-table-CJMjcwUZ.js";import{S as f}from"./stack-C88a0npI.js";import{a as k}from"./format-B1LeFV3Y.js";import"./preload-helper-PPVm8Dsz.js";import"./input-BSCHIFmj.js";import"./utils-CURkPv3a.js";import"./prop-compat-ClktB6p5.js";import"./control-size-rvCN7ZpI.js";import"./label-qHY30eUg.js";import"./index-DbquDQCT.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./popover-B1Y9L4uz.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-CDKxNHGJ.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-ydzPhmoe.js";import"./dropdown-menu-B-DEwsfR.js";import"./index-VWR8Du3y.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";import"./createLucideIcon-BnpAccaP.js";import"./check-KuCy08bp.js";import"./chevron-right-BXCmPxW2.js";import"./filter-bar-B3-GivsI.js";import"./select-3H9YJY8U.js";import"./index-D17hSi50.js";import"./index-CztXHdXt.js";import"./index-DrK2s9b6.js";import"./chevron-down-122XaqBk.js";import"./chevron-up-CoKqbRsK.js";import"./date-picker-t-CIrsQu.js";import"./calendar-CfacuH8P.js";import"./chevron-left-N_nrbjRa.js";import"./calendar-BknvOJFQ.js";import"./x-Bk_wSNf2.js";import"./search-DRVimkv9.js";import"./checkbox-CNQZ_QzY.js";import"./minus-CnttpEGu.js";import"./info-XF5axP9F.js";import"./data-grid-pagination-Cp-xuDk7.js";import"./with-selector-dQ1DtIk5.js";import"./format-context-Caqi-Gt1.js";import"./data-state-CIGJqc-1.js";import"./empty-DcTcGUY7.js";import"./triangle-alert-CBFJXkB-.js";import"./spinner-CUjZIesC.js";import"./search-x-BoD6M5tN.js";import"./skeleton-C-ZAhKi4.js";import"./z-index-CsvJFlOP.js";import"./data-grid-cell-edit-S8aFd1vS.js";import"./textarea-UDTKAvx4.js";import"./chevrons-up-down-DNeGP8GW.js";import"./command-ChJErH62.js";import"./index-BiNW7bVc.js";import"./dialog-C1dHRi-6.js";import"./calendar-days-BsQaueMn.js";import"./trash-2-CHSE98No.js";import"./plus-B89lyPh-.js";import"./download-CmOKzzeV.js";import"./pagination-Dd3e6cTc.js";import"./shadows-BSmH5Lxe.js";const{expect:r,screen:x,userEvent:h,waitFor:F,within:b}=__STORYBOOK_MODULE_TEST__,nt={title:"Components/Filter controls",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["The two filter controls the system was missing: **number range** and **boolean**.","","`inNumberRange` had been registered on the grid the whole time with no UI able to","produce a value for it, and every product that needed a yes/no filter invented its own","two-option select.","","Both are driven by a [`FilterField`](/docs/foundations-choosing-a-table--docs) from the","filter schema, so the control, the chip label and the row matcher cannot disagree."].join(`
`)}}}},g=[{id:1,name:"Commercial Auto",status:"Active",premium:12400,bound:!0},{id:2,name:"General Liability",status:"Active",premium:8200,bound:!0},{id:3,name:"Cyber Liability",status:"Pending",premium:15900,bound:!1},{id:4,name:"Property",status:"Active",premium:22e3,bound:!0},{id:5,name:"Workers Comp",status:"Expired",premium:9600,bound:!1},{id:6,name:"Marine Cargo",status:"Pending",premium:4100,bound:!1}],s=[{id:"status",label:"Status",type:"multi",options:[{value:"Active",label:"Active",count:3},{value:"Pending",label:"Pending",count:2},{value:"Expired",label:"Expired",count:1}]},{id:"premium",label:"Premium",type:"numberRange",unit:"currency"},{id:"bound",label:"Bound",type:"boolean",trueLabel:"Bound",falseLabel:"Unbound"}],N=[{accessorKey:"name",header:"Policy"},{accessorKey:"status",header:"Status",cell:({getValue:o})=>{const e=o();return t.jsx(R,{tone:e==="Active"?"success":e==="Expired"?"danger":"warning",size:"sm",children:e})}},{accessorKey:"premium",header:"Premium",meta:{type:"currency"},cell:({getValue:o})=>k(o(),{decimals:0})},{accessorKey:"bound",header:"Bound",meta:{type:"boolean"},cell:({getValue:o})=>o()?"Yes":"No"}],d={render:function(){const[e,a]=y.useState();return t.jsxs(f,{gap:3,children:[t.jsx(B,{field:s[1],value:e,onValueChange:a}),t.jsx("p",{className:"text-sm text-muted-foreground","data-testid":"value",children:e?JSON.stringify(e):"No range applied"})]})},play:async({canvasElement:o,step:e})=>{const a=b(o);await e("the unit is in the label, not only a placeholder",async()=>{await h.click(a.getByRole("button",{name:"Premium"})),await r(await x.findByLabelText("Minimum Premium")).toBeInTheDocument()}),await e("leave the UI at rest",async()=>{await h.keyboard("{Escape}"),await F(()=>r(x.queryByLabelText("Minimum Premium")).toBeNull())})}},p={name:"Boolean (tri-state)",render:function(){const[e,a]=y.useState();return t.jsxs(f,{gap:3,children:[t.jsx(w,{field:s[2],value:e,onValueChange:a}),t.jsx("p",{className:"text-sm text-muted-foreground",children:e===void 0?"Any":e?"Bound only":"Unbound only"}),t.jsxs("p",{className:"max-w-prose text-sm text-muted-foreground",children:["Three states, not two. A toggle that only turns ",t.jsx("em",{children:"on"})," cannot ask for the rows where the value is ",t.jsx("code",{children:"false"})," — and “show unbound policies” is a real question. ",t.jsx("code",{children:"undefined"})," is not the same as ",t.jsx("code",{children:"false"}),"."]})]})}},m={render:function(){const[e,a]=y.useState({}),l=(n,c)=>a(i=>({...i,[n]:c})),u=S(s,e),v=g.filter(n=>{const c=e.status;if(c?.length&&!c.includes(n.status))return!1;const i=e.premium;return!(i?.min!==void 0&&n.premium<i.min||i?.max!==void 0&&n.premium>i.max||e.bound!==void 0&&n.bound!==e.bound)});return t.jsxs(f,{gap:4,children:[t.jsxs(E,{label:"Filter policies",children:[t.jsx(C,{label:"Status",value:e.status??[],onValueChange:n=>l("status",n),options:s[0].options}),t.jsx(B,{field:s[1],value:e.premium,onValueChange:n=>l("premium",n)}),t.jsx(w,{field:s[2],value:e.bound,onValueChange:n=>l("bound",n)})]}),t.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-sm",children:[t.jsx("span",{"data-testid":"summary",children:u.length===0?t.jsxs(t.Fragment,{children:["Showing all ",t.jsx("strong",{children:g.length})," policies"]}):t.jsxs(t.Fragment,{children:[t.jsx("strong",{children:v.length})," of ",g.length," policies —"," ",u.map(n=>`${n.field.label}: ${n.description}`).join(" · ")]})}),u.length>0&&t.jsx(T,{variant:"tertiary",size:"sm",onClick:()=>a({}),children:"Clear all"})]}),t.jsx(j,{columns:N,data:v,pageSize:6,pinFirstColumn:!1})]})},play:async({canvasElement:o,step:e})=>{const a=b(o);await e("the summary counts, it does not only list",async()=>{await r(a.getByTestId("summary")).toHaveTextContent("Showing all 6 policies")}),await e("a boolean filter can ask for the FALSE rows",async()=>{const{screen:l}=await import(__STORYBOOK_MODULE_TEST__),u=a.getByRole("toolbar",{name:"Filter policies"});await h.click(b(u).getByRole("button",{name:"Bound"})),await h.click(await l.findByRole("menuitemradio",{name:"Unbound"})),await r(a.getByTestId("summary")).toHaveTextContent("3 of 6 policies"),await r(a.getByTestId("summary")).toHaveTextContent("Bound: Unbound")}),await e("leave the UI at rest",async()=>{await F(()=>r(a.getByRole("toolbar",{name:"Filter policies"})).not.toHaveAttribute("aria-hidden"))})}},at=["NumberRange","Boolean_","WithATable"];d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = React.useState<{
      min?: number;
      max?: number;
    } | undefined>();
    return <Stack gap={3}>
        <FilterNumberRange field={FIELDS[1] as Extract<FilterField, {
        type: 'numberRange';
      }>} value={value} onValueChange={setValue} />
        <p className="text-sm text-muted-foreground" data-testid="value">
          {value ? JSON.stringify(value) : 'No range applied'}
        </p>
      </Stack>;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the unit is in the label, not only a placeholder', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: 'Premium'
      }));
      // \`screen\`, not \`canvas\`: the popover is portalled to document.body, so
      // it is outside canvasElement entirely. A placeholder would also
      // disappear the moment the user types, taking the only statement of
      // what the number means with it — hence a real label.
      await expect(await screen.findByLabelText('Minimum Premium')).toBeInTheDocument();
    });
    await step('leave the UI at rest', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(screen.queryByLabelText('Minimum Premium')).toBeNull());
    });
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Boolean (tri-state)',
  render: function Render() {
    const [value, setValue] = React.useState<boolean | undefined>();
    return <Stack gap={3}>
        <FilterBoolean field={FIELDS[2] as Extract<FilterField, {
        type: 'boolean';
      }>} value={value} onValueChange={setValue} />
        <p className="text-sm text-muted-foreground">
          {value === undefined ? 'Any' : value ? 'Bound only' : 'Unbound only'}
        </p>
        <p className="max-w-prose text-sm text-muted-foreground">
          Three states, not two. A toggle that only turns <em>on</em> cannot ask for the
          rows where the value is <code>false</code> — and “show unbound policies” is a
          real question. <code>undefined</code> is not the same as <code>false</code>.
        </p>
      </Stack>;
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [values, setValues] = React.useState<Record<string, unknown>>({});
    const set = (id: string, v: unknown) => setValues(prev => ({
      ...prev,
      [id]: v
    }));
    const applied = collectApplied(FIELDS, values);
    const rows = policies.filter(p => {
      const status = values.status as string[] | undefined;
      if (status?.length && !status.includes(p.status)) return false;
      const premium = values.premium as {
        min?: number;
        max?: number;
      } | undefined;
      if (premium?.min !== undefined && p.premium < premium.min) return false;
      if (premium?.max !== undefined && p.premium > premium.max) return false;
      if (values.bound !== undefined && p.bound !== values.bound) return false;
      return true;
    });
    return <Stack gap={4}>
        <FilterChipSet label="Filter policies">
          <FilterChipMenu label="Status" value={values.status as string[] ?? []} onValueChange={v => set('status', v)} options={(FIELDS[0] as Extract<FilterField, {
          type: 'multi';
        }>).options} />
          <FilterNumberRange field={FIELDS[1] as Extract<FilterField, {
          type: 'numberRange';
        }>} value={values.premium as {
          min?: number;
          max?: number;
        } | undefined} onValueChange={v => set('premium', v)} />
          <FilterBoolean field={FIELDS[2] as Extract<FilterField, {
          type: 'boolean';
        }>} value={values.bound as boolean | undefined} onValueChange={v => set('bound', v)} />
        </FilterChipSet>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span data-testid="summary">
            {applied.length === 0 ? <>Showing all <strong>{policies.length}</strong> policies</> : <>
                <strong>{rows.length}</strong> of {policies.length} policies —{' '}
                {applied.map(a => \`\${a.field.label}: \${a.description}\`).join(' · ')}
              </>}
          </span>
          {applied.length > 0 && <Button variant="tertiary" size="sm" onClick={() => setValues({})}>
              Clear all
            </Button>}
        </div>

        <DataTable columns={columns} data={rows} pageSize={6} pinFirstColumn={false} />
      </Stack>;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the summary counts, it does not only list', async () => {
      await expect(canvas.getByTestId('summary')).toHaveTextContent('Showing all 6 policies');
    });
    await step('a boolean filter can ask for the FALSE rows', async () => {
      const {
        screen
      } = await import('storybook/test');
      // Scoped: the table's own "Bound" column header is a button too.
      const bar = canvas.getByRole('toolbar', {
        name: 'Filter policies'
      });
      await userEvent.click(within(bar).getByRole('button', {
        name: 'Bound'
      }));
      await userEvent.click(await screen.findByRole('menuitemradio', {
        name: 'Unbound'
      }));
      await expect(canvas.getByTestId('summary')).toHaveTextContent('3 of 6 policies');
      await expect(canvas.getByTestId('summary')).toHaveTextContent('Bound: Unbound');
    });
    await step('leave the UI at rest', async () => {
      // axe runs after the play function. While a Radix menu is open it marks
      // the rest of the page aria-hidden, and hidden content containing
      // focusable buttons is an aria-hidden-focus violation — a true
      // statement about a transient state, not a defect in the page. Waiting
      // for the overlay to clear is the play function's job.
      await waitFor(() => expect(canvas.getByRole('toolbar', {
        name: 'Filter policies'
      })).not.toHaveAttribute('aria-hidden'));
    });
  }
}`,...m.parameters?.docs?.source},description:{story:`**The whole filter row, driving a real table.**

One \`FilterField[]\` produces the controls, the applied-filter summary and the
row matching — so the chip that says “Premium: over $10,000” and the rows you
are looking at cannot disagree.

Note the summary line: chips tell you *what* is filtered, a count tells you
whether it did anything.`,...m.parameters?.docs?.description}}};export{p as Boolean_,d as NumberRange,m as WithATable,at as __namedExportsOrder,nt as default};
