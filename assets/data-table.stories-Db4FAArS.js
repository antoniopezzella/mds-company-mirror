import{Z as e,a5 as d}from"./iframe-CPBTUrEW.js";import{D as i,c as L}from"./data-table-CJMjcwUZ.js";import{B as v}from"./button-_tNb_vhW.js";import{M as H}from"./dialog-C1dHRi-6.js";import{D as _,h as Y,b as U,g as W,c as J}from"./dropdown-menu-B-DEwsfR.js";import{E as Z}from"./ellipsis-vertical-Ci1UvJep.js";import{B as Q}from"./badge-J44eyYsr.js";import{a as X}from"./format-B1LeFV3Y.js";import"./preload-helper-PPVm8Dsz.js";import"./checkbox-CNQZ_QzY.js";import"./index-DTX6ga2Q.js";import"./index-D-VHP59e.js";import"./index-B2KxKFY1.js";import"./index-ydzPhmoe.js";import"./index-CQZ-MLQt.js";import"./index-CNxNdWYK.js";import"./index-D0Uu3jyy.js";import"./index-DbquDQCT.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./minus-CnttpEGu.js";import"./createLucideIcon-BnpAccaP.js";import"./check-KuCy08bp.js";import"./info-XF5axP9F.js";import"./data-grid-pagination-Cp-xuDk7.js";import"./with-selector-dQ1DtIk5.js";import"./format-context-Caqi-Gt1.js";import"./data-state-CIGJqc-1.js";import"./empty-DcTcGUY7.js";import"./triangle-alert-CBFJXkB-.js";import"./spinner-CUjZIesC.js";import"./search-x-BoD6M5tN.js";import"./input-BSCHIFmj.js";import"./prop-compat-ClktB6p5.js";import"./control-size-rvCN7ZpI.js";import"./skeleton-C-ZAhKi4.js";import"./z-index-CsvJFlOP.js";import"./data-grid-cell-edit-S8aFd1vS.js";import"./textarea-UDTKAvx4.js";import"./chevron-up-CoKqbRsK.js";import"./chevron-down-122XaqBk.js";import"./chevrons-up-down-DNeGP8GW.js";import"./x-Bk_wSNf2.js";import"./chevron-left-N_nrbjRa.js";import"./chevron-right-BXCmPxW2.js";import"./command-ChJErH62.js";import"./index-BiNW7bVc.js";import"./index-209NtBVq.js";import"./index-CDKxNHGJ.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-DewG4hGn.js";import"./search-DRVimkv9.js";import"./popover-B1Y9L4uz.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./calendar-CfacuH8P.js";import"./calendar-days-BsQaueMn.js";import"./filter-field-control-Bm7UZ_th.js";import"./filter-chip-CfiB6TWx.js";import"./label-qHY30eUg.js";import"./filter-bar-B3-GivsI.js";import"./select-3H9YJY8U.js";import"./index-D17hSi50.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-CztXHdXt.js";import"./index-DrK2s9b6.js";import"./date-picker-t-CIrsQu.js";import"./calendar-BknvOJFQ.js";import"./stack-C88a0npI.js";import"./trash-2-CHSE98No.js";import"./plus-B89lyPh-.js";import"./download-CmOKzzeV.js";import"./pagination-Dd3e6cTc.js";import"./shadows-BSmH5Lxe.js";import"./index-VWR8Du3y.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";function F(n,o){return n?typeof n.disabled=="function"?n.disabled(o):!!n.disabled:!1}function ee({action:n,row:o,label:t,onClose:a}){return e.jsx(H,{open:!0,onClose:a,size:"sm",title:n.confirmTitle??`${n.label} ${t}?`,description:n.confirmDescription??(n.destructive?"This cannot be undone.":`This applies to ${t}.`),footer:e.jsxs(e.Fragment,{children:[e.jsx(v,{variant:"outline",size:"sm",onClick:a,children:"Cancel"}),e.jsx(v,{variant:"primary",tone:n.destructive?"danger":"default",size:"sm",onClick:()=>{n.onAction(o),a()},children:n.confirmLabel??n.label})]})})}function te({row:n,primary:o,actions:t,getRowLabel:a}){const[m,h]=d.useState(null),c=a?.(n)??"this row",p=t.filter(s=>!s.hidden?.(n)),r=o?{id:"primary",...o}:void 0,g=s=>{s.destructive||s.confirm?h(s):s.onAction(n)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-end gap-1",children:[r&&e.jsx(v,{variant:"ghost",size:"sm",disabled:F(r,n),title:F(r,n)?r.disabledReason:void 0,"aria-label":`${r.label} ${c}`,onClick:()=>g(r),style:r.destructive?{color:"var(--role-status-danger-fg)"}:void 0,...r.iconOnly?{iconOnly:!0,icon:r.icon}:{},children:!r.iconOnly&&e.jsxs(e.Fragment,{children:[r.icon,r.label]})}),p.length>0&&e.jsxs(_,{children:[e.jsx(Y,{asChild:!0,children:e.jsx(v,{variant:"ghost",size:"sm",iconOnly:!0,icon:e.jsx(Z,{className:"size-4","aria-hidden":"true"}),"aria-label":`More actions for ${c}`})}),e.jsx(U,{align:"end",className:"min-w-40",children:p.map((s,y)=>{const R=F(s,n),G=s.destructive&&y>0&&!p[y-1].destructive;return e.jsxs(d.Fragment,{children:[G&&e.jsx(W,{}),e.jsxs(J,{disabled:R,title:R?s.disabledReason:void 0,onSelect:()=>g(s),style:s.destructive?{color:"var(--role-status-danger-fg)"}:void 0,children:[s.icon,s.label]})]},s.id)})})]})]}),m&&e.jsx(ee,{action:m,row:n,label:c,onClose:()=>h(null)})]})}function ae({getRowLabel:n,primary:o,actions:t=[],header:a=""}){return{id:"actions",header:()=>a||e.jsx("span",{className:"sr-only",children:"Actions"}),meta:{align:"right"},enableSorting:!1,enableHiding:!1,enableResizing:!1,cell:({row:m})=>e.jsx(te,{row:m.original,primary:o,actions:t,getRowLabel:n})}}const{expect:u,userEvent:w,within:$}=__STORYBOOK_MODULE_TEST__,jt={title:"Components/DataTable",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["**The default table.** Pass props, get a table.","","`DataTable` is a *preset* over [`DataGrid`](/docs/components-datagrid--docs) — it imports","and renders it. The two have **identical capabilities**; every grid feature is reachable","here through an `enable*` prop. Neither is the more powerful tier.","","Reach for `DataGrid` only when something outside the table must read or drive its state.","","See [Foundations -> Choosing a table](/docs/foundations-choosing-a-table--docs)."].join(`
`)}}}},b=[{id:1,name:"Commercial Auto",status:"Active",premium:12400,renewalDate:"2026-03-14"},{id:2,name:"General Liability",status:"Active",premium:8200,renewalDate:"2026-05-01"},{id:3,name:"Cyber Liability",status:"Pending",premium:15900,renewalDate:"2026-01-22"},{id:4,name:"Property",status:"Active",premium:22e3,renewalDate:"2026-07-09"},{id:5,name:"Workers Comp",status:"Expired",premium:9600,renewalDate:"2025-11-30"},{id:6,name:"Umbrella",status:"Active",premium:4100,renewalDate:"2026-04-18"},{id:7,name:"Marine Cargo",status:"Pending",premium:11750,renewalDate:"2026-02-27"}],l=[{accessorKey:"name",header:"Policy",enableSorting:!0},{accessorKey:"status",header:"Status",cell:({getValue:n})=>{const o=n();return e.jsx(Q,{variant:"soft",tone:o==="Active"?"success":o==="Expired"?"danger":"default",children:o})}},{accessorKey:"premium",header:"Premium",enableSorting:!0,meta:{type:"currency"},cell:({getValue:n})=>X(n(),{decimals:0})},{accessorKey:"renewalDate",header:"Renewal Date",enableSorting:!0}],D={render:()=>e.jsx(i,{columns:l,data:b,searchKey:"name",searchPlaceholder:"Search policies...",pageSize:5})},C={render:()=>e.jsx(i,{columns:[L(),...l],data:b,enableRowSelection:!0,pageSize:5})},f={render:function(){const[o,t]=d.useState(null);return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(i,{columns:[L({getRowLabel:a=>a.name}),...l],data:b,enableRowSelection:!0,selectionNoun:"policy",selectionNounPlural:"policies",pageSize:3,onSelectionChange:t}),e.jsx("pre",{className:"rounded-lg p-3 text-xs",style:{background:"var(--role-surface-subtle)"},children:JSON.stringify({selectedRowIds:o?.selectedRowIds??[],selectedVisibleRows:o?.selectedVisibleRows??0,allFilteredRowsSelected:o?.allFilteredRowsSelected??!1,totalFilteredCount:o?.totalFilteredCount??0},null,2)})]})},play:async({canvasElement:n,step:o})=>{const t=$(n);await o("the header checkbox says it selects the page",async()=>{await u(t.getByRole("checkbox",{name:"Select all rows on this page"})).toBeInTheDocument()}),await o("each row is named after its record, not its position",async()=>{await u(t.getByRole("checkbox",{name:"Select Commercial Auto"})).toBeInTheDocument()}),await o("escalating states the wider scope",async()=>{await w.click(t.getByRole("checkbox",{name:"Select all rows on this page"}));const a=await t.findByRole("button",{name:/Select all \d+ results/});await w.click(a),await u(t.getByRole("status")).toHaveTextContent(/All \d+ policies matching/)})}},x={render:function(){const[o,t]=d.useState("No action run yet.");return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(i,{columns:[L({getRowLabel:a=>a.name}),...l],data:b,enableRowSelection:!0,selectionNoun:"policy",selectionNounPlural:"policies",pageSize:3,bulkActions:[{id:"export",label:"Export",onAction:a=>t(a.allFilteredRowsSelected?`Export requested for all ${a.totalFilteredCount} filtered policies (send the FILTERS to the server, not the ids).`:`Export requested for ${a.selectedRowIds.length} ids: ${a.selectedRowIds.join(", ")}`)},{id:"assign",label:"Assign",onAction:a=>(t(`Assign ran against ${a.selectedRowIds.length} policies.`),{succeeded:Math.max(a.selectedRowIds.length-1,0),failed:[{id:"POL-2",reason:"Locked by another user"}]})},{id:"delete",label:"Delete",destructive:!0,disabled:!0,disabledReason:"You cannot delete bound policies",onAction:()=>{}}]}),e.jsx("p",{className:"text-sm text-muted-foreground","data-testid":"log",children:o})]})},play:async({canvasElement:n,step:o})=>{const t=$(n);await o("actions appear only once something is selected",async()=>{await u(t.queryByRole("button",{name:"Export"})).toBeNull(),await w.click(t.getByRole("checkbox",{name:"Select all rows on this page"})),await u(t.getByRole("button",{name:"Export"})).toBeInTheDocument()}),await o("a disabled action explains itself instead of vanishing",async()=>{const a=t.getByRole("button",{name:"Delete"});await u(a).toBeDisabled(),await u(a).toHaveAttribute("title","You cannot delete bound policies")}),await o("the handler receives the scope",async()=>{await w.click(t.getByRole("button",{name:"Export"})),await u(t.getByTestId("log")).toHaveTextContent(/Export requested for 3 ids/)})}},S={render:function(){const[o,t]=d.useState("No action run yet.");return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(i,{columns:[...l,ae({getRowLabel:a=>a.name,primary:{label:"View",onAction:a=>t(`Viewing ${a.name}`)},actions:[{id:"edit",label:"Edit",onAction:a=>t(`Editing ${a.name}`)},{id:"renew",label:"Renew",disabled:a=>a.status!=="Active",disabledReason:"Only active policies can be renewed",onAction:a=>t(`Renewing ${a.name}`)},{id:"delete",label:"Delete",destructive:!0,onAction:a=>t(`Deleted ${a.name}`)}]})],data:b,pageSize:4,onRowClick:a=>t(`Row opened: ${a.original.name} (NOT fired by the action buttons)`)}),e.jsx("p",{className:"text-sm text-muted-foreground","data-testid":"log",children:o})]})},play:async({canvasElement:n,step:o})=>{const t=$(n);await o("controls are named after their record",async()=>{await u(t.getByRole("button",{name:"View Commercial Auto"})).toBeInTheDocument(),await u(t.getByRole("button",{name:"More actions for Commercial Auto"})).toBeInTheDocument()}),await o("acting on a row does not also open the row",async()=>{await w.click(t.getByRole("button",{name:"View Commercial Auto"})),await u(t.getByTestId("log")).toHaveTextContent("Viewing Commercial Auto")})}},E={render:()=>e.jsx(i,{columns:l,data:b,searchKey:"name",enableColumnVisibility:!0,pageSize:5})},T={render:()=>e.jsx(i,{columns:[L(),...l],data:b,searchKey:"name",searchPlaceholder:"Search policies...",enableRowSelection:!0,enableColumnVisibility:!0,pageSize:5})},A={parameters:{docs:{description:{story:"Data has not arrived yet — renders skeleton rows matching the column count. Mirrors DataGrid's LoadingState story for parity."}}},render:()=>e.jsx(i,{columns:l,data:[],loading:!0,pageSize:5})},k={parameters:{docs:{description:{story:"Data has arrived and there's genuinely nothing to show — rendered with the shared `Empty` component rather than a bare line of text. Mirrors DataGrid's EmptyState story for parity."}}},render:()=>e.jsx(i,{columns:l,data:[],pageSize:5})},P={parameters:{docs:{description:{story:'The other empty state: rows exist, but the current search excludes all of them. DataTable tells the two apart, so this one gets a different icon and message plus a "Clear search" action — offering that when nothing was searched would just be noise. The play function types a non-matching term to reach this state.'}}},render:()=>e.jsx(i,{columns:l,data:b,searchKey:"name",searchPlaceholder:"Search policies...",pageSize:5}),play:async({canvasElement:n})=>{const o=n.querySelector("input");await w.type(o,"zzzzz")}},j={parameters:{docs:{description:{story:"Pass `emptyState` to replace the built-in block entirely — for cases where the table sits in a flow with its own call to action."}}},render:()=>e.jsx(i,{columns:l,data:[],pageSize:5,emptyState:e.jsxs("div",{className:"flex flex-col items-center gap-2 p-10 text-center",children:[e.jsx("span",{className:"text-base font-medium",children:"No policies bound yet"}),e.jsx("span",{className:"text-sm opacity-70",children:"Once a quote is bound it will appear in this table."})]})})},B={parameters:{docs:{description:{story:"The tablecn toolbar shape: search plus per-column filters on the left, Sort / Density / Export / Columns and any page actions on the right. Every trigger shares one compact dashed shape at `text-xs`, half a step tighter than a stock `sm` button — a row of filters should read as filters, not as a row of buttons — while keeping the `h-8` control height so it still lines up with the search field. Selecting a value only appends a chip: the leading icon never changes and there is no separator, so the first click does not shove the rest of the row sideways. **Status** is a faceted multi-select with per-value counts derived from the column itself, collapsing to a count past two selections. **Renewal** is a date range — a facet would list every distinct date in the data, which stops being usable the moment there are more than a handful. Reset appears whenever any filter is active and clears all of them."}}},render:()=>e.jsx(i,{columns:l,data:q,searchKey:"name",searchPlaceholder:"Search policies...",pageSize:8,facetedFilters:[{columnId:"status",title:"Status"}],dateFilters:[{columnId:"renewalDate",title:"Renewal"}],enableSortList:!0,enableColumnVisibility:!0,enableDensityToggle:!0,enableExport:!0,exportFilename:"policies",toolbarActions:e.jsx(v,{variant:"outline",size:"sm",className:"px-2 text-xs font-normal",children:"New policy"})})};function ne(){const[n,o]=d.useState(b),[t,a]=d.useState([]),m=[{accessorKey:"name",header:"Policy",enableSorting:!0,meta:{editable:!0}},l[1],{accessorKey:"premium",header:"Premium",enableSorting:!0,meta:{editable:!0}},{accessorKey:"renewalDate",header:"Renewal Date",enableSorting:!0,meta:{editable:!0}}];return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(i,{columns:m,data:n,pageSize:5,onCellEdit:({rowIndex:h,columnId:c,value:p,previousValue:r})=>{o(g=>g.map((s,y)=>y===h?{...s,[c]:p}:s)),a(g=>[`${c}: "${r}" → "${p}"`,...g].slice(0,4))}}),e.jsx("div",{className:"text-xs opacity-70",children:t.length?t.map((h,c)=>e.jsx("div",{children:h},c)):"Double-click a Policy, Premium or Renewal Date cell — or focus one and press Enter."})]})}const N={parameters:{docs:{description:{story:"Columns marked `meta: { editable: true }` become editable in place: double-click, or focus the cell and press Enter/F2. Enter or blur commits, Escape discards. `onCellEdit` fires only when the value actually changed — DataTable keeps no copy of your data, so the handler owns persisting it (here, story state). The Status column is left non-editable to show the two side by side."}}},render:()=>e.jsx(ne,{})},V=["Commercial Auto","General Liability","Cyber Liability","Property","Workers Comp","Umbrella","Marine Cargo","Professional Liability"];function O(n){return Array.from({length:n},(o,t)=>{const a=V[t%V.length],m=["Active","Active","Active","Pending","Expired"][t%5],h=3e3+t*733%4e4,c=String(t%12+1).padStart(2,"0"),p=String(t%27+1).padStart(2,"0");return{id:t+1,name:`${a} #${t+1}`,status:m,premium:h,renewalDate:`2026-${c}-${p}`}})}const q=O(150),z={parameters:{docs:{description:{story:"150 rows exercising the full MUI-DataGrid feature-parity set at once: drag a column border to resize (keyboard: focus the border, Left/Right, Shift for a bigger step), scroll the body to see the sticky header, switch Density, and Export CSV (exports every filtered row's raw values, not just the current page)."}}},render:()=>e.jsx(i,{columns:l,data:q,searchKey:"name",searchPlaceholder:"Search policies...",pageSize:10,enableColumnResizing:!0,enableExport:!0,exportFilename:"policies",enableDensityToggle:!0,maxHeight:420})},M=10,K=O(87);function oe(n,o){return new Promise(t=>{setTimeout(()=>{const a=n*o;t({rows:K.slice(a,a+o),rowCount:K.length})},400)})}function se(){const[n,o]=d.useState(M),[t,a]=d.useState([]),[m,h]=d.useState(0),[c,p]=d.useState(!0),r=(g,s)=>{p(!0),oe(g,s).then(({rows:y,rowCount:R})=>{a(y),h(R),p(!1)})};return d.useEffect(()=>{r(0,M)},[]),e.jsx(i,{columns:l,data:t,loading:c,pageSize:n,manualPagination:!0,pageCount:Math.ceil(m/n),rowCount:m,onPaginationChange:(g,s)=>{o(s),r(g,s)}})}const I={parameters:{docs:{description:{story:"DataTable wired to a simulated server API — `data` is only ever the current page (87 total rows, fetched 10 at a time with a 400ms delay standing in for the network round-trip). `manualPagination` + `pageCount` + `rowCount` tell DataTable to trust the server's page count rather than slicing `data` itself; `onPaginationChange` is where a real app would call its API."}}},render:()=>e.jsx(se,{})},Bt=["Default","WithRowSelection","SelectAllResults","BulkActions","RowActions","WithColumnVisibility","FullFeatured","Loading","Empty","EmptyFiltered","EmptyCustom","FullToolbar","InlineEditing","LargeDataset","ServerSidePagination"];D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <DataTable columns={baseColumns} data={policyData} searchKey="name" searchPlaceholder="Search policies..." pageSize={5} />
}`,...D.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <DataTable columns={[createSelectColumn<Policy>(), ...baseColumns]} data={policyData} enableRowSelection pageSize={5} />
}`,...C.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [selection, setSelection] = useState<SelectionState | null>(null);
    return <div className="flex flex-col gap-3">
        <DataTable columns={[createSelectColumn<Policy>({
        getRowLabel: p => p.name
      }), ...baseColumns]} data={policyData} enableRowSelection selectionNoun="policy" selectionNounPlural="policies" pageSize={3} onSelectionChange={setSelection} />
        <pre className="rounded-lg p-3 text-xs" style={{
        background: 'var(--role-surface-subtle)'
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
}`,...f.parameters?.docs?.source},description:{story:`**"Select all" must never be ambiguous.**

The header checkbox selects the PAGE — it says so, because that is what it
does. Selecting every record matching the current filters is a separate,
explicit act, and the banner states which scope is in force at all times.

This matters most in server mode: the client holds one page, so "all 1,284"
cannot be a set of selected rows — there are no row objects for the other
1,279. It is a flag about the QUERY. A bulk action must branch on
\`allFilteredRowsSelected\` and send the filter state, not \`selectedRowIds\`.

Note each checkbox is named after its record ("Select Commercial Auto"),
not its position: position changes under sorting and filtering.`,...f.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source},description:{story:`**Bulk actions (§10).** Selection exists to enable an operation; until this
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
- **Permissions.** "Delete" is disabled with a reason, rather than absent.`,...x.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source},description:{story:`**Row actions (§11).** Most of that section is about restraint: do not
overload every row with visible buttons, promote at most one common action,
and move the rest into overflow.

So: one \`View\` button, everything else behind the menu, destructive items
separated and confirmed.

Each control is named after its record — "More actions for Commercial
Auto", not forty buttons called "More actions". And acting on a row does not
fire \`onRowClick\`: §34 lists that conflict explicitly, and this column is the
case that breaks it if the markup drifts.`,...S.parameters?.docs?.description}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <DataTable columns={baseColumns} data={policyData} searchKey="name" enableColumnVisibility pageSize={5} />
}`,...E.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <DataTable columns={[createSelectColumn<Policy>(), ...baseColumns]} data={policyData} searchKey="name" searchPlaceholder="Search policies..." enableRowSelection enableColumnVisibility pageSize={5} />
}`,...T.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Data has not arrived yet — renders skeleton rows matching the column count. Mirrors DataGrid\\'s LoadingState story for parity.'
      }
    }
  },
  render: () => <DataTable columns={baseColumns} data={[]} loading pageSize={5} />
}`,...A.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Data has arrived and there\\'s genuinely nothing to show — rendered with the shared \`Empty\` component rather than a bare line of text. Mirrors DataGrid\\'s EmptyState story for parity.'
      }
    }
  },
  render: () => <DataTable columns={baseColumns} data={[]} pageSize={5} />
}`,...k.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Columns marked \`meta: { editable: true }\` become editable in place: double-click, or focus the cell and press Enter/F2. Enter or blur commits, Escape discards. \`onCellEdit\` fires only when the value actually changed — DataTable keeps no copy of your data, so the handler owns persisting it (here, story state). The Status column is left non-editable to show the two side by side.'
      }
    }
  },
  render: () => <InlineEditDemo />
}`,...N.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '150 rows exercising the full MUI-DataGrid feature-parity set at once: drag a column border to resize (keyboard: focus the border, Left/Right, Shift for a bigger step), scroll the body to see the sticky header, switch Density, and Export CSV (exports every filtered row\\'s raw values, not just the current page).'
      }
    }
  },
  render: () => <DataTable columns={baseColumns} data={largePolicyData} searchKey="name" searchPlaceholder="Search policies..." pageSize={10} enableColumnResizing enableExport exportFilename="policies" enableDensityToggle maxHeight={420} />
}`,...z.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    docs: {\n      description: {\n        story: 'DataTable wired to a simulated server API — `data` is only ever the current page (87 total rows, fetched 10 at a time with a 400ms delay standing in for the network round-trip). `manualPagination` + `pageCount` + `rowCount` tell DataTable to trust the server\\'s page count rather than slicing `data` itself; `onPaginationChange` is where a real app would call its API.'\n      }\n    }\n  },\n  render: () => <ServerSidePaginationDemo />\n}",...I.parameters?.docs?.source}}};export{x as BulkActions,D as Default,k as Empty,j as EmptyCustom,P as EmptyFiltered,T as FullFeatured,B as FullToolbar,N as InlineEditing,z as LargeDataset,A as Loading,S as RowActions,f as SelectAllResults,I as ServerSidePagination,E as WithColumnVisibility,C as WithRowSelection,Bt as __namedExportsOrder,jt as default};
