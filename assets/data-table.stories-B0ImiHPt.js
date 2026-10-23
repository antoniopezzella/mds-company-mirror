import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./badge-BJRi19uA.js";import{n as o,t as s}from"./ellipsis-vertical-CLUt3_RB.js";import{n as c,t as l}from"./button-DatWLSj0.js";import{l as u,n as d}from"./format-D3bAQugU.js";import{l as f,u as p}from"./dialog-DF47Ek89.js";import{n as m,r as h,t as g}from"./data-table-BKV54IPo.js";import{c as ee,d as te,i as ne,r as _,t as v,u as re}from"./dropdown-menu-XOwViH9b.js";function y(e,t){return e?typeof e.disabled==`function`?e.disabled(t):!!e.disabled:!1}function ie({action:e,row:t,label:n,onClose:r}){return(0,x.jsx)(f,{open:!0,onClose:r,size:`sm`,title:e.confirmTitle??`${e.label} ${n}?`,description:e.confirmDescription??(e.destructive?`This cannot be undone.`:`This applies to ${n}.`),footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(l,{variant:`outline`,size:`sm`,onClick:r,children:`Cancel`}),(0,x.jsx)(l,{variant:`primary`,tone:e.destructive?`danger`:`default`,size:`sm`,onClick:()=>{e.onAction(t),r()},children:e.confirmLabel??e.label})]})})}function ae({row:e,primary:t,actions:n,getRowLabel:r}){let[i,a]=b.useState(null),o=r?.(e)??`this row`,c=n.filter(t=>!t.hidden?.(e)),u=t?{id:`primary`,...t}:void 0,d=t=>{t.destructive||t.confirm?a(t):t.onAction(e)};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(`div`,{className:`flex items-center justify-end gap-1`,children:[u&&(0,x.jsx)(l,{variant:`ghost`,size:`sm`,disabled:y(u,e),title:y(u,e)?u.disabledReason:void 0,"aria-label":`${u.label} ${o}`,onClick:()=>d(u),style:u.destructive?{color:`var(--role-fg-critical)`}:void 0,...u.iconOnly?{iconOnly:!0,icon:u.icon}:{},children:!u.iconOnly&&(0,x.jsxs)(x.Fragment,{children:[u.icon,u.label]})}),c.length>0&&(0,x.jsxs)(v,{children:[(0,x.jsx)(re,{asChild:!0,children:(0,x.jsx)(l,{variant:`ghost`,size:`sm`,iconOnly:!0,icon:(0,x.jsx)(s,{className:`size-4`,"aria-hidden":`true`}),"aria-label":`More actions for ${o}`})}),(0,x.jsx)(_,{align:`end`,className:`min-w-40`,children:c.map((t,n)=>{let r=y(t,e),i=t.destructive&&n>0&&!c[n-1].destructive;return(0,x.jsxs)(b.Fragment,{children:[i&&(0,x.jsx)(ee,{}),(0,x.jsxs)(ne,{disabled:r,title:r?t.disabledReason:void 0,onSelect:()=>d(t),style:t.destructive?{color:`var(--role-fg-critical)`}:void 0,children:[t.icon,t.label]})]},t.id)})})]})]}),i&&(0,x.jsx)(ie,{action:i,row:e,label:o,onClose:()=>a(null)})]})}function oe({getRowLabel:e,primary:t,actions:n=[],header:r=``}){return{id:`actions`,header:()=>r||(0,x.jsx)(`span`,{className:`sr-only`,children:`Actions`}),meta:{align:`right`},enableSorting:!1,enableHiding:!1,enableResizing:!1,cell:({row:r})=>(0,x.jsx)(ae,{row:r.original,primary:t,actions:n,getRowLabel:e})}}var b,x;function S(){return(S=t((()=>{b=e(n(),1),o(),c(),p(),te(),x=r()})))()}function se(){let[e,t]=(0,T.useState)(j),[n,r]=(0,T.useState)([]),i=[{accessorKey:`name`,header:`Policy`,enableSorting:!0,meta:{editable:!0}},M[1],{accessorKey:`premium`,header:`Premium`,enableSorting:!0,meta:{editable:!0}},{accessorKey:`renewalDate`,header:`Renewal Date`,enableSorting:!0,meta:{editable:!0}}];return(0,E.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,E.jsx)(g,{columns:i,data:e,pageSize:5,onCellEdit:({rowIndex:e,columnId:n,value:i,previousValue:a})=>{t(t=>t.map((t,r)=>r===e?{...t,[n]:i}:t)),r(e=>[`${n}: "${a}" → "${i}"`,...e].slice(0,4))}}),(0,E.jsx)(`div`,{className:`text-xs opacity-70`,children:n.length?n.map((e,t)=>(0,E.jsx)(`div`,{children:e},t)):`Double-click a Policy, Premium or Renewal Date cell — or focus one and press Enter.`})]})}function C(e){return Array.from({length:e},(e,t)=>{let n=K[t%K.length],r=[`Active`,`Active`,`Active`,`Pending`,`Expired`][t%5],i=3e3+t*733%4e4,a=String(t%12+1).padStart(2,`0`),o=String(t%27+1).padStart(2,`0`);return{id:t+1,name:`${n} #${t+1}`,status:r,premium:i,renewalDate:`2026-${a}-${o}`}})}function ce(e,t){return new Promise(n=>{setTimeout(()=>{let r=e*t;n({rows:X.slice(r,r+t),rowCount:X.length})},400)})}function w(){let[e,t]=(0,T.useState)(Y),[n,r]=(0,T.useState)([]),[i,a]=(0,T.useState)(0),[o,s]=(0,T.useState)(!0),c=(e,t)=>{s(!0),ce(e,t).then(({rows:e,rowCount:t})=>{r(e),a(t),s(!1)})};return(0,T.useEffect)(()=>{c(0,Y)},[]),(0,E.jsx)(g,{columns:M,data:n,loading:o,pageSize:e,manualPagination:!0,pageCount:Math.ceil(i/e),rowCount:i,onPaginationChange:(e,n)=>{t(n),c(e,n)}})}var T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{T=n(),h(),S(),i(),u(),c(),E=r(),{expect:D,userEvent:O,within:k}=__STORYBOOK_MODULE_TEST__,A={title:`Components/DataTable`,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`**The default table.** Pass props, get a table.

\`DataTable\` is a *preset* over [\`DataGrid\`](/docs/components-datagrid--docs) — it imports
and renders it. The two have **identical capabilities**; every grid feature is reachable
here through an \`enable*\` prop. Neither is the more powerful tier.

Reach for \`DataGrid\` only when something outside the table must read or drive its state.

See [Foundations -> Choosing a table](/docs/foundations-choosing-a-table--docs).`}}}},j=[{id:1,name:`Commercial Auto`,status:`Active`,premium:12400,renewalDate:`2026-03-14`},{id:2,name:`General Liability`,status:`Active`,premium:8200,renewalDate:`2026-05-01`},{id:3,name:`Cyber Liability`,status:`Pending`,premium:15900,renewalDate:`2026-01-22`},{id:4,name:`Property`,status:`Active`,premium:22e3,renewalDate:`2026-07-09`},{id:5,name:`Workers Comp`,status:`Expired`,premium:9600,renewalDate:`2025-11-30`},{id:6,name:`Umbrella`,status:`Active`,premium:4100,renewalDate:`2026-04-18`},{id:7,name:`Marine Cargo`,status:`Pending`,premium:11750,renewalDate:`2026-02-27`}],M=[{accessorKey:`name`,header:`Policy`,enableSorting:!0},{accessorKey:`status`,header:`Status`,cell:({getValue:e})=>{let t=e();return(0,E.jsx)(a,{variant:`soft`,tone:t===`Active`?`success`:t===`Expired`?`danger`:`default`,children:t})}},{accessorKey:`premium`,header:`Premium`,enableSorting:!0,meta:{type:`currency`},cell:({getValue:e})=>d(e(),{decimals:0})},{accessorKey:`renewalDate`,header:`Renewal Date`,enableSorting:!0}],N={render:()=>(0,E.jsx)(g,{columns:M,data:j,searchKey:`name`,searchPlaceholder:`Search policies...`,pageSize:5})},P={render:()=>(0,E.jsx)(g,{columns:[m(),...M],data:j,enableRowSelection:!0,pageSize:5})},F={render:function(){let[e,t]=(0,T.useState)(null);return(0,E.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,E.jsx)(g,{columns:[m({getRowLabel:e=>e.name}),...M],data:j,enableRowSelection:!0,selectionNoun:`policy`,selectionNounPlural:`policies`,pageSize:3,onSelectionChange:t}),(0,E.jsx)(`pre`,{className:`rounded-lg p-3 text-xs`,style:{background:`var(--role-bg-neutral-subtle)`},children:JSON.stringify({selectedRowIds:e?.selectedRowIds??[],selectedVisibleRows:e?.selectedVisibleRows??0,allFilteredRowsSelected:e?.allFilteredRowsSelected??!1,totalFilteredCount:e?.totalFilteredCount??0},null,2)})]})},play:async({canvasElement:e,step:t})=>{let n=k(e);await t(`the header checkbox says it selects the page`,async()=>{await D(n.getByRole(`checkbox`,{name:`Select all rows on this page`})).toBeInTheDocument()}),await t(`each row is named after its record, not its position`,async()=>{await D(n.getByRole(`checkbox`,{name:`Select Commercial Auto`})).toBeInTheDocument()}),await t(`escalating states the wider scope`,async()=>{await O.click(n.getByRole(`checkbox`,{name:`Select all rows on this page`}));let e=await n.findByRole(`button`,{name:/Select all \d+ results/});await O.click(e),await D(n.getByRole(`status`)).toHaveTextContent(/All \d+ policies matching/)})}},I={render:function(){let[e,t]=(0,T.useState)(`No action run yet.`);return(0,E.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,E.jsx)(g,{columns:[m({getRowLabel:e=>e.name}),...M],data:j,enableRowSelection:!0,selectionNoun:`policy`,selectionNounPlural:`policies`,pageSize:3,bulkActions:[{id:`export`,label:`Export`,onAction:e=>t(e.allFilteredRowsSelected?`Export requested for all ${e.totalFilteredCount} filtered policies (send the FILTERS to the server, not the ids).`:`Export requested for ${e.selectedRowIds.length} ids: ${e.selectedRowIds.join(`, `)}`)},{id:`assign`,label:`Assign`,onAction:e=>(t(`Assign ran against ${e.selectedRowIds.length} policies.`),{succeeded:Math.max(e.selectedRowIds.length-1,0),failed:[{id:`POL-2`,reason:`Locked by another user`}]})},{id:`delete`,label:`Delete`,destructive:!0,disabled:!0,disabledReason:`You cannot delete bound policies`,onAction:()=>{}}]}),(0,E.jsx)(`p`,{className:`text-sm text-muted-foreground`,"data-testid":`log`,children:e})]})},play:async({canvasElement:e,step:t})=>{let n=k(e);await t(`actions appear only once something is selected`,async()=>{await D(n.queryByRole(`button`,{name:`Export`})).toBeNull(),await O.click(n.getByRole(`checkbox`,{name:`Select all rows on this page`})),await D(n.getByRole(`button`,{name:`Export`})).toBeInTheDocument()}),await t(`a disabled action explains itself instead of vanishing`,async()=>{let e=n.getByRole(`button`,{name:`Delete`});await D(e).toBeDisabled(),await D(e).toHaveAttribute(`title`,`You cannot delete bound policies`)}),await t(`the handler receives the scope`,async()=>{await O.click(n.getByRole(`button`,{name:`Export`})),await D(n.getByTestId(`log`)).toHaveTextContent(/Export requested for 3 ids/)})}},L={render:function(){let[e,t]=(0,T.useState)(`No action run yet.`);return(0,E.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,E.jsx)(g,{columns:[...M,oe({getRowLabel:e=>e.name,primary:{label:`View`,onAction:e=>t(`Viewing ${e.name}`)},actions:[{id:`edit`,label:`Edit`,onAction:e=>t(`Editing ${e.name}`)},{id:`renew`,label:`Renew`,disabled:e=>e.status!==`Active`,disabledReason:`Only active policies can be renewed`,onAction:e=>t(`Renewing ${e.name}`)},{id:`delete`,label:`Delete`,destructive:!0,onAction:e=>t(`Deleted ${e.name}`)}]})],data:j,pageSize:4,onRowClick:e=>t(`Row opened: ${e.original.name} (NOT fired by the action buttons)`)}),(0,E.jsx)(`p`,{className:`text-sm text-muted-foreground`,"data-testid":`log`,children:e})]})},play:async({canvasElement:e,step:t})=>{let n=k(e);await t(`controls are named after their record`,async()=>{await D(n.getByRole(`button`,{name:`View Commercial Auto`})).toBeInTheDocument(),await D(n.getByRole(`button`,{name:`More actions for Commercial Auto`})).toBeInTheDocument()}),await t(`acting on a row does not also open the row`,async()=>{await O.click(n.getByRole(`button`,{name:`View Commercial Auto`})),await D(n.getByTestId(`log`)).toHaveTextContent(`Viewing Commercial Auto`)})}},R={render:()=>(0,E.jsx)(g,{columns:M,data:j,searchKey:`name`,enableColumnVisibility:!0,pageSize:5})},z={render:()=>(0,E.jsx)(g,{columns:[m(),...M],data:j,searchKey:`name`,searchPlaceholder:`Search policies...`,enableRowSelection:!0,enableColumnVisibility:!0,pageSize:5})},B={parameters:{docs:{description:{story:`Data has not arrived yet — renders skeleton rows matching the column count. Mirrors DataGrid's LoadingState story for parity.`}}},render:()=>(0,E.jsx)(g,{columns:M,data:[],loading:!0,pageSize:5})},V={parameters:{docs:{description:{story:"Data has arrived and there's genuinely nothing to show — rendered with the shared `Empty` component rather than a bare line of text. Mirrors DataGrid's EmptyState story for parity."}}},render:()=>(0,E.jsx)(g,{columns:M,data:[],pageSize:5})},H={parameters:{docs:{description:{story:`The other empty state: rows exist, but the current search excludes all of them. DataTable tells the two apart, so this one gets a different icon and message plus a "Clear search" action — offering that when nothing was searched would just be noise. The play function types a non-matching term to reach this state.`}}},render:()=>(0,E.jsx)(g,{columns:M,data:j,searchKey:`name`,searchPlaceholder:`Search policies...`,pageSize:5}),play:async({canvasElement:e})=>{let t=e.querySelector(`input`);await O.type(t,`zzzzz`)}},U={parameters:{docs:{description:{story:"Pass `emptyState` to replace the built-in block entirely — for cases where the table sits in a flow with its own call to action."}}},render:()=>(0,E.jsx)(g,{columns:M,data:[],pageSize:5,emptyState:(0,E.jsxs)(`div`,{className:`flex flex-col items-center gap-2 p-10 text-center`,children:[(0,E.jsx)(`span`,{className:`text-base font-medium`,children:`No policies bound yet`}),(0,E.jsx)(`span`,{className:`text-sm opacity-70`,children:`Once a quote is bound it will appear in this table.`})]})})},W={parameters:{docs:{description:{story:"The tablecn toolbar shape: search plus per-column filters on the left, Sort / Density / Export / Columns and any page actions on the right. Every trigger shares one compact dashed shape at `text-xs`, half a step tighter than a stock `sm` button — a row of filters should read as filters, not as a row of buttons — while keeping the `h-8` control height so it still lines up with the search field. Selecting a value only appends a chip: the leading icon never changes and there is no separator, so the first click does not shove the rest of the row sideways. **Status** is a faceted multi-select with per-value counts derived from the column itself, collapsing to a count past two selections. **Renewal** is a date range — a facet would list every distinct date in the data, which stops being usable the moment there are more than a handful. Reset appears whenever any filter is active and clears all of them."}}},render:()=>(0,E.jsx)(g,{columns:M,data:q,searchKey:`name`,searchPlaceholder:`Search policies...`,pageSize:8,facetedFilters:[{columnId:`status`,title:`Status`}],dateFilters:[{columnId:`renewalDate`,title:`Renewal`}],enableSortList:!0,enableColumnVisibility:!0,enableDensityToggle:!0,enableExport:!0,exportFilename:`policies`,toolbarActions:(0,E.jsx)(l,{variant:`outline`,size:`sm`,className:`px-2 text-xs font-normal`,children:`New policy`})})},G={parameters:{docs:{description:{story:"Columns marked `meta: { editable: true }` become editable in place: double-click, or focus the cell and press Enter/F2. Enter or blur commits, Escape discards. `onCellEdit` fires only when the value actually changed — DataTable keeps no copy of your data, so the handler owns persisting it (here, story state). The Status column is left non-editable to show the two side by side."}}},render:()=>(0,E.jsx)(se,{})},K=[`Commercial Auto`,`General Liability`,`Cyber Liability`,`Property`,`Workers Comp`,`Umbrella`,`Marine Cargo`,`Professional Liability`],q=C(150),J={parameters:{docs:{description:{story:`150 rows exercising the full MUI-DataGrid feature-parity set at once: drag a column border to resize (keyboard: focus the border, Left/Right, Shift for a bigger step), scroll the body to see the sticky header, switch Density, and Export CSV (exports every filtered row's raw values, not just the current page).`}}},render:()=>(0,E.jsx)(g,{columns:M,data:q,searchKey:`name`,searchPlaceholder:`Search policies...`,pageSize:10,enableColumnResizing:!0,enableExport:!0,exportFilename:`policies`,enableDensityToggle:!0,maxHeight:420})},Y=10,X=C(87),Z={parameters:{docs:{description:{story:"DataTable wired to a simulated server API — `data` is only ever the current page (87 total rows, fetched 10 at a time with a 400ms delay standing in for the network round-trip). `manualPagination` + `pageCount` + `rowCount` tell DataTable to trust the server's page count rather than slicing `data` itself; `onPaginationChange` is where a real app would call its API."}}},render:()=>(0,E.jsx)(w,{})},Q=[`Default`,`WithRowSelection`,`SelectAllResults`,`BulkActions`,`RowActions`,`WithColumnVisibility`,`FullFeatured`,`Loading`,`Empty`,`EmptyFiltered`,`EmptyCustom`,`FullToolbar`,`InlineEditing`,`LargeDataset`,`ServerSidePagination`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <DataTable columns={baseColumns} data={policyData} searchKey="name" searchPlaceholder="Search policies..." pageSize={5} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <DataTable columns={[createSelectColumn<Policy>(), ...baseColumns]} data={policyData} enableRowSelection pageSize={5} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [selection, setSelection] = useState<SelectionState | null>(null);
    return <div className="flex flex-col gap-3">
        <DataTable columns={[createSelectColumn<Policy>({
        getRowLabel: p => p.name
      }), ...baseColumns]} data={policyData} enableRowSelection selectionNoun="policy" selectionNounPlural="policies" pageSize={3} onSelectionChange={setSelection} />
        <pre className="rounded-lg p-3 text-xs" style={{
        background: 'var(--role-bg-neutral-subtle)'
      }}>
{JSON.stringify({
          selectedRowIds: selection?.selectedRowIds ?? [],
          selectedVisibleRows: selection?.selectedVisibleRows ?? 0,
          allFilteredRowsSelected: selection?.allFilteredRowsSelected ?? false,
          totalFilteredCount: selection?.totalFilteredCount ?? 0
        }, null, 2)}
        </pre>
      </div>;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the header checkbox says it selects the page', async () => {
      await expect(canvas.getByRole('checkbox', {
        name: 'Select all rows on this page'
      })).toBeInTheDocument();
    });
    await step('each row is named after its record, not its position', async () => {
      await expect(canvas.getByRole('checkbox', {
        name: 'Select Commercial Auto'
      })).toBeInTheDocument();
    });
    await step('escalating states the wider scope', async () => {
      await userEvent.click(canvas.getByRole('checkbox', {
        name: 'Select all rows on this page'
      }));
      const escalate = await canvas.findByRole('button', {
        name: /Select all \\d+ results/
      });
      await userEvent.click(escalate);
      await expect(canvas.getByRole('status')).toHaveTextContent(/All \\d+ policies matching/);
    });
  }
}`,...F.parameters?.docs?.source},description:{story:`**"Select all" must never be ambiguous.**

The header checkbox selects the PAGE — it says so, because that is what it
does. Selecting every record matching the current filters is a separate,
explicit act, and the banner states which scope is in force at all times.

This matters most in server mode: the client holds one page, so "all 1,284"
cannot be a set of selected rows — there are no row objects for the other
1,279. It is a flag about the QUERY. A bulk action must branch on
\`allFilteredRowsSelected\` and send the filter state, not \`selectedRowIds\`.

Note each checkbox is named after its record ("Select Commercial Auto"),
not its position: position changes under sorting and filtering.`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [log, setLog] = useState<string>('No action run yet.');
    return <div className="flex flex-col gap-3">
        <DataTable columns={[createSelectColumn<Policy>({
        getRowLabel: p => p.name
      }), ...baseColumns]} data={policyData} enableRowSelection selectionNoun="policy" selectionNounPlural="policies" pageSize={3} bulkActions={[{
        id: 'export',
        label: 'Export',
        onAction: s => setLog(s.allFilteredRowsSelected ? \`Export requested for all \${s.totalFilteredCount} filtered policies (send the FILTERS to the server, not the ids).\` : \`Export requested for \${s.selectedRowIds.length} ids: \${s.selectedRowIds.join(', ')}\`)
      }, {
        id: 'assign',
        label: 'Assign',
        onAction: s => {
          setLog(\`Assign ran against \${s.selectedRowIds.length} policies.\`);
          return {
            succeeded: Math.max(s.selectedRowIds.length - 1, 0),
            failed: [{
              id: 'POL-2',
              reason: 'Locked by another user'
            }]
          };
        }
      }, {
        id: 'delete',
        label: 'Delete',
        destructive: true,
        disabled: true,
        disabledReason: 'You cannot delete bound policies',
        onAction: () => {}
      }]} />
        <p className="text-sm text-muted-foreground" data-testid="log">{log}</p>
      </div>;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('actions appear only once something is selected', async () => {
      await expect(canvas.queryByRole('button', {
        name: 'Export'
      })).toBeNull();
      await userEvent.click(canvas.getByRole('checkbox', {
        name: 'Select all rows on this page'
      }));
      await expect(canvas.getByRole('button', {
        name: 'Export'
      })).toBeInTheDocument();
    });
    await step('a disabled action explains itself instead of vanishing', async () => {
      const del = canvas.getByRole('button', {
        name: 'Delete'
      });
      await expect(del).toBeDisabled();
      await expect(del).toHaveAttribute('title', 'You cannot delete bound policies');
    });
    await step('the handler receives the scope', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: 'Export'
      }));
      await expect(canvas.getByTestId('log')).toHaveTextContent(/Export requested for 3 ids/);
    });
  }
}`,...I.parameters?.docs?.source},description:{story:`**Bulk actions (§10).** Selection exists to enable an operation; until this
landed, it enabled reporting that one *could* happen.

The actions live inside the selection banner rather than a bar of their own,
because the first requirement is that the count context is not hidden from
the button that acts on it.

Three things here are easy to leave out and are why this is a component:

- **Scope in the confirmation.** Escalate to "all results" and the dialog
  changes from "Delete 3 selected policies?" to "Delete all N policies
  matching the current filters?". The copy is generated from the live
  selection, so it cannot drift from what the handler receives.
- **Partial success.** "Assign" here fails one record on purpose. Bulk
  operations half-fail routinely, and a success toast after that is a lie.
- **Permissions.** "Delete" is disabled with a reason, rather than absent.`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [log, setLog] = useState('No action run yet.');
    return <div className="flex flex-col gap-3">
        <DataTable columns={[...baseColumns, createActionsColumn<Policy>({
        getRowLabel: p => p.name,
        primary: {
          label: 'View',
          onAction: p => setLog(\`Viewing \${p.name}\`)
        },
        actions: [{
          id: 'edit',
          label: 'Edit',
          onAction: p => setLog(\`Editing \${p.name}\`)
        }, {
          id: 'renew',
          label: 'Renew',
          disabled: p => p.status !== 'Active',
          disabledReason: 'Only active policies can be renewed',
          onAction: p => setLog(\`Renewing \${p.name}\`)
        }, {
          id: 'delete',
          label: 'Delete',
          destructive: true,
          onAction: p => setLog(\`Deleted \${p.name}\`)
        }]
      })]} data={policyData} pageSize={4} onRowClick={row => setLog(\`Row opened: \${row.original.name} (NOT fired by the action buttons)\`)} />
        <p className="text-sm text-muted-foreground" data-testid="log">{log}</p>
      </div>;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('controls are named after their record', async () => {
      await expect(canvas.getByRole('button', {
        name: 'View Commercial Auto'
      })).toBeInTheDocument();
      await expect(canvas.getByRole('button', {
        name: 'More actions for Commercial Auto'
      })).toBeInTheDocument();
    });
    await step('acting on a row does not also open the row', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: 'View Commercial Auto'
      }));
      await expect(canvas.getByTestId('log')).toHaveTextContent('Viewing Commercial Auto');
    });
  }
}`,...L.parameters?.docs?.source},description:{story:`**Row actions (§11).** Most of that section is about restraint: do not
overload every row with visible buttons, promote at most one common action,
and move the rest into overflow.

So: one \`View\` button, everything else behind the menu, destructive items
separated and confirmed.

Each control is named after its record — "More actions for Commercial
Auto", not forty buttons called "More actions". And acting on a row does not
fire \`onRowClick\`: §34 lists that conflict explicitly, and this column is the
case that breaks it if the markup drifts.`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <DataTable columns={baseColumns} data={policyData} searchKey="name" enableColumnVisibility pageSize={5} />
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <DataTable columns={[createSelectColumn<Policy>(), ...baseColumns]} data={policyData} searchKey="name" searchPlaceholder="Search policies..." enableRowSelection enableColumnVisibility pageSize={5} />
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Data has not arrived yet — renders skeleton rows matching the column count. Mirrors DataGrid\\'s LoadingState story for parity.'
      }
    }
  },
  render: () => <DataTable columns={baseColumns} data={[]} loading pageSize={5} />
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Data has arrived and there\\'s genuinely nothing to show — rendered with the shared \`Empty\` component rather than a bare line of text. Mirrors DataGrid\\'s EmptyState story for parity.'
      }
    }
  },
  render: () => <DataTable columns={baseColumns} data={[]} pageSize={5} />
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The other empty state: rows exist, but the current search excludes all of them. DataTable tells the two apart, so this one gets a different icon and message plus a "Clear search" action — offering that when nothing was searched would just be noise. The play function types a non-matching term to reach this state.'
      }
    }
  },
  render: () => <DataTable columns={baseColumns} data={policyData} searchKey="name" searchPlaceholder="Search policies..." pageSize={5} />,
  play: async ({
    canvasElement
  }) => {
    const search = canvasElement.querySelector('input') as HTMLInputElement;
    await userEvent.type(search, 'zzzzz');
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Pass \`emptyState\` to replace the built-in block entirely — for cases where the table sits in a flow with its own call to action.'
      }
    }
  },
  render: () => <DataTable columns={baseColumns} data={[]} pageSize={5} emptyState={<div className="flex flex-col items-center gap-2 p-10 text-center">
          <span className="text-base font-medium">No policies bound yet</span>
          <span className="text-sm opacity-70">Once a quote is bound it will appear in this table.</span>
        </div>} />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The tablecn toolbar shape: search plus per-column filters on the left, Sort / Density / Export / Columns and any page actions on the right. Every trigger shares one compact dashed shape at \`text-xs\`, half a step tighter than a stock \`sm\` button — a row of filters should read as filters, not as a row of buttons — while keeping the \`h-8\` control height so it still lines up with the search field. Selecting a value only appends a chip: the leading icon never changes and there is no separator, so the first click does not shove the rest of the row sideways. **Status** is a faceted multi-select with per-value counts derived from the column itself, collapsing to a count past two selections. **Renewal** is a date range — a facet would list every distinct date in the data, which stops being usable the moment there are more than a handful. Reset appears whenever any filter is active and clears all of them.'
      }
    }
  },
  render: () => <DataTable columns={baseColumns} data={largePolicyData} searchKey="name" searchPlaceholder="Search policies..." pageSize={8} facetedFilters={[{
    columnId: 'status',
    title: 'Status'
  }]} dateFilters={[{
    columnId: 'renewalDate',
    title: 'Renewal'
  }]} enableSortList enableColumnVisibility enableDensityToggle enableExport exportFilename="policies" toolbarActions={<Button variant="outline" size="sm" className="px-2 text-xs font-normal">
          New policy
        </Button>} />
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Columns marked \`meta: { editable: true }\` become editable in place: double-click, or focus the cell and press Enter/F2. Enter or blur commits, Escape discards. \`onCellEdit\` fires only when the value actually changed — DataTable keeps no copy of your data, so the handler owns persisting it (here, story state). The Status column is left non-editable to show the two side by side.'
      }
    }
  },
  render: () => <InlineEditDemo />
}`,...G.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '150 rows exercising the full MUI-DataGrid feature-parity set at once: drag a column border to resize (keyboard: focus the border, Left/Right, Shift for a bigger step), scroll the body to see the sticky header, switch Density, and Export CSV (exports every filtered row\\'s raw values, not just the current page).'
      }
    }
  },
  render: () => <DataTable columns={baseColumns} data={largePolicyData} searchKey="name" searchPlaceholder="Search policies..." pageSize={10} enableColumnResizing enableExport exportFilename="policies" enableDensityToggle maxHeight={420} />
}`,...J.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    docs: {\n      description: {\n        story: 'DataTable wired to a simulated server API — `data` is only ever the current page (87 total rows, fetched 10 at a time with a 400ms delay standing in for the network round-trip). `manualPagination` + `pageCount` + `rowCount` tell DataTable to trust the server\\'s page count rather than slicing `data` itself; `onPaginationChange` is where a real app would call its API.'\n      }\n    }\n  },\n  render: () => <ServerSidePaginationDemo />\n}",...Z.parameters?.docs?.source}}}})))()}$();export{I as BulkActions,N as Default,V as Empty,U as EmptyCustom,H as EmptyFiltered,z as FullFeatured,W as FullToolbar,G as InlineEditing,J as LargeDataset,B as Loading,L as RowActions,F as SelectAllResults,Z as ServerSidePagination,R as WithColumnVisibility,P as WithRowSelection,Q as __namedExportsOrder,A as default};