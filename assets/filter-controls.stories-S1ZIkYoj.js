import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./badge-BJRi19uA.js";import{n as o,t as s}from"./button-DatWLSj0.js";import{l as c,n as l}from"./format-D3bAQugU.js";import{r as u,t as d}from"./data-table-BKV54IPo.js";import{i as f,n as p,r as m}from"./filter-chip-Ehl3ue9S.js";import{a as h,i as g,o as _,r as v,s as y}from"./filter-field-control-DQ8wxZeI.js";import{n as b,r as x}from"./stack-BlYcYnw2.js";var S,C,w,T,E,D,O,k,A,j,M,N,P,F,I;function L(){return(L=t((()=>{S=e(n(),1),h(),f(),i(),o(),u(),x(),y(),c(),C=r(),{expect:w,screen:T,userEvent:E,waitFor:D,within:O}=__STORYBOOK_MODULE_TEST__,k={title:`Components/Filter controls`,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`The two filter controls the system was missing: **number range** and **boolean**.

\`inNumberRange\` had been registered on the grid the whole time with no UI able to
produce a value for it, and every product that needed a yes/no filter invented its own
two-option select.

Both are driven by a [\`FilterField\`](/docs/foundations-choosing-a-table--docs) from the
filter schema, so the control, the chip label and the row matcher cannot disagree.`}}}},A=[{id:1,name:`Commercial Auto`,status:`Active`,premium:12400,bound:!0},{id:2,name:`General Liability`,status:`Active`,premium:8200,bound:!0},{id:3,name:`Cyber Liability`,status:`Pending`,premium:15900,bound:!1},{id:4,name:`Property`,status:`Active`,premium:22e3,bound:!0},{id:5,name:`Workers Comp`,status:`Expired`,premium:9600,bound:!1},{id:6,name:`Marine Cargo`,status:`Pending`,premium:4100,bound:!1}],j=[{id:`status`,label:`Status`,type:`multi`,options:[{value:`Active`,label:`Active`,count:3},{value:`Pending`,label:`Pending`,count:2},{value:`Expired`,label:`Expired`,count:1}]},{id:`premium`,label:`Premium`,type:`numberRange`,unit:`currency`},{id:`bound`,label:`Bound`,type:`boolean`,trueLabel:`Bound`,falseLabel:`Unbound`}],M=[{accessorKey:`name`,header:`Policy`},{accessorKey:`status`,header:`Status`,cell:({getValue:e})=>{let t=e();return(0,C.jsx)(a,{tone:t===`Active`?`success`:t===`Expired`?`danger`:`warning`,size:`sm`,children:t})}},{accessorKey:`premium`,header:`Premium`,meta:{type:`currency`},cell:({getValue:e})=>l(e(),{decimals:0})},{accessorKey:`bound`,header:`Bound`,meta:{type:`boolean`},cell:({getValue:e})=>e()?`Yes`:`No`}],N={render:function(){let[e,t]=S.useState();return(0,C.jsxs)(b,{gap:3,children:[(0,C.jsx)(g,{field:j[1],value:e,onValueChange:t}),(0,C.jsx)(`p`,{className:`text-sm text-muted-foreground`,"data-testid":`value`,children:e?JSON.stringify(e):`No range applied`})]})},play:async({canvasElement:e,step:t})=>{let n=O(e);await t(`the unit is in the label, not only a placeholder`,async()=>{await E.click(n.getByRole(`button`,{name:`Premium`})),await w(await T.findByLabelText(`Minimum Premium`)).toBeInTheDocument()}),await t(`leave the UI at rest`,async()=>{await E.keyboard(`{Escape}`),await D(()=>w(T.queryByLabelText(`Minimum Premium`)).toBeNull())})}},P={name:`Boolean (tri-state)`,render:function(){let[e,t]=S.useState();return(0,C.jsxs)(b,{gap:3,children:[(0,C.jsx)(v,{field:j[2],value:e,onValueChange:t}),(0,C.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:e===void 0?`Any`:e?`Bound only`:`Unbound only`}),(0,C.jsxs)(`p`,{className:`max-w-prose text-sm text-muted-foreground`,children:[`Three states, not two. A toggle that only turns `,(0,C.jsx)(`em`,{children:`on`}),` cannot ask for the rows where the value is `,(0,C.jsx)(`code`,{children:`false`}),` — and “show unbound policies” is a real question. `,(0,C.jsx)(`code`,{children:`undefined`}),` is not the same as `,(0,C.jsx)(`code`,{children:`false`}),`.`]})]})}},F={render:function(){let[e,t]=S.useState({}),n=(e,n)=>t(t=>({...t,[e]:n})),r=_(j,e),i=A.filter(t=>{let n=e.status;if(n?.length&&!n.includes(t.status))return!1;let r=e.premium;return!(r?.min!==void 0&&t.premium<r.min||r?.max!==void 0&&t.premium>r.max||e.bound!==void 0&&t.bound!==e.bound)});return(0,C.jsxs)(b,{gap:4,children:[(0,C.jsxs)(m,{label:`Filter policies`,children:[(0,C.jsx)(p,{label:`Status`,value:e.status??[],onValueChange:e=>n(`status`,e),options:j[0].options}),(0,C.jsx)(g,{field:j[1],value:e.premium,onValueChange:e=>n(`premium`,e)}),(0,C.jsx)(v,{field:j[2],value:e.bound,onValueChange:e=>n(`bound`,e)})]}),(0,C.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3 text-sm`,children:[(0,C.jsx)(`span`,{"data-testid":`summary`,children:r.length===0?(0,C.jsxs)(C.Fragment,{children:[`Showing all `,(0,C.jsx)(`strong`,{children:A.length}),` policies`]}):(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`strong`,{children:i.length}),` of `,A.length,` policies —`,` `,r.map(e=>`${e.field.label}: ${e.description}`).join(` · `)]})}),r.length>0&&(0,C.jsx)(s,{variant:`tertiary`,size:`sm`,onClick:()=>t({}),children:`Clear all`})]}),(0,C.jsx)(d,{columns:M,data:i,pageSize:6,pinFirstColumn:!1})]})},play:async({canvasElement:e,step:t})=>{let n=O(e);await t(`the summary counts, it does not only list`,async()=>{await w(n.getByTestId(`summary`)).toHaveTextContent(`Showing all 6 policies`)}),await t(`a boolean filter can ask for the FALSE rows`,async()=>{let{screen:e}=await import(__STORYBOOK_MODULE_TEST__),t=n.getByRole(`toolbar`,{name:`Filter policies`});await E.click(O(t).getByRole(`button`,{name:`Bound`})),await E.click(await e.findByRole(`menuitemradio`,{name:`Unbound`})),await w(n.getByTestId(`summary`)).toHaveTextContent(`3 of 6 policies`),await w(n.getByTestId(`summary`)).toHaveTextContent(`Bound: Unbound`)}),await t(`leave the UI at rest`,async()=>{await D(()=>w(n.getByRole(`toolbar`,{name:`Filter policies`})).not.toHaveAttribute(`aria-hidden`))})}},I=[`NumberRange`,`Boolean_`,`WithATable`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source},description:{story:`**The whole filter row, driving a real table.**

One \`FilterField[]\` produces the controls, the applied-filter summary and the
row matching — so the chip that says “Premium: over $10,000” and the rows you
are looking at cannot disagree.

Note the summary line: chips tell you *what* is filtered, a count tells you
whether it did anything.`,...F.parameters?.docs?.description}}}})))()}L();export{P as Boolean_,N as NumberRange,F as WithATable,I as __namedExportsOrder,k as default};