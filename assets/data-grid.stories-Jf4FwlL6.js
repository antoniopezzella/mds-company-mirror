import{Z as e,a5 as T}from"./iframe-CPBTUrEW.js";import{P as q,g as u,D as d,e as P,a as c,c as m,d as p,b as D,u as z,f as h}from"./data-grid-pagination-Cp-xuDk7.js";import{c as L}from"./utils-CURkPv3a.js";import{C as G}from"./chevron-right-BXCmPxW2.js";import{c as I}from"./createLucideIcon-BnpAccaP.js";import{B}from"./badge-J44eyYsr.js";import{B as M}from"./button-_tNb_vhW.js";import"./preload-helper-PPVm8Dsz.js";import"./with-selector-dQ1DtIk5.js";import"./format-B1LeFV3Y.js";import"./format-context-Caqi-Gt1.js";import"./data-state-CIGJqc-1.js";import"./empty-DcTcGUY7.js";import"./index-Dk2lMVn3.js";import"./triangle-alert-CBFJXkB-.js";import"./spinner-CUjZIesC.js";import"./search-x-BoD6M5tN.js";import"./dropdown-menu-B-DEwsfR.js";import"./index-B2KxKFY1.js";import"./index-DTX6ga2Q.js";import"./index-D-VHP59e.js";import"./index-ydzPhmoe.js";import"./index-CQZ-MLQt.js";import"./index-DbquDQCT.js";import"./index-VWR8Du3y.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-CDKxNHGJ.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";import"./check-KuCy08bp.js";import"./input-BSCHIFmj.js";import"./prop-compat-ClktB6p5.js";import"./control-size-rvCN7ZpI.js";import"./skeleton-C-ZAhKi4.js";import"./z-index-CsvJFlOP.js";import"./data-grid-cell-edit-S8aFd1vS.js";import"./textarea-UDTKAvx4.js";import"./chevron-up-CoKqbRsK.js";import"./chevron-down-122XaqBk.js";import"./chevrons-up-down-DNeGP8GW.js";import"./x-Bk_wSNf2.js";import"./chevron-left-N_nrbjRa.js";import"./command-ChJErH62.js";import"./index-BiNW7bVc.js";import"./dialog-C1dHRi-6.js";import"./search-DRVimkv9.js";import"./popover-B1Y9L4uz.js";import"./calendar-CfacuH8P.js";import"./calendar-days-BsQaueMn.js";import"./filter-field-control-Bm7UZ_th.js";import"./filter-chip-CfiB6TWx.js";import"./label-qHY30eUg.js";import"./filter-bar-B3-GivsI.js";import"./select-3H9YJY8U.js";import"./index-D17hSi50.js";import"./index-CztXHdXt.js";import"./index-DrK2s9b6.js";import"./date-picker-t-CIrsQu.js";import"./calendar-BknvOJFQ.js";import"./stack-C88a0npI.js";import"./trash-2-CHSE98No.js";import"./plus-B89lyPh-.js";import"./download-CmOKzzeV.js";import"./pagination-Dd3e6cTc.js";import"./shadows-BSmH5Lxe.js";const O=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],$=I("pin",O);function F({indent:a=20,label:t="Toggle row {row}",headerLabel:n="Expand"}={}){return{id:"expand",header:()=>e.jsx("span",{className:"sr-only",children:n}),cell:({row:r})=>{if(!r.getCanExpand())return e.jsx("span",{style:{paddingLeft:r.depth*a},"aria-hidden":"true"});const o=r.getIsExpanded();return e.jsx("button",{type:"button",onClick:r.getToggleExpandedHandler(),"aria-expanded":o,"aria-label":t.replace("{row}",String(r.index+1)),className:"flex size-6 items-center justify-center rounded-md transition-transform focus-visible:outline-hidden focus-visible:ring-2",style:{marginLeft:r.depth*a,"--tw-ring-color":"var(--role-focus-ring)"},children:e.jsx(G,{className:L("size-4 opacity-70 transition-transform",o&&"rotate-90"),"aria-hidden":"true"})})},enableSorting:!1,enableHiding:!1,size:40}}function H({pinLabel:a="Pin row {row}",unpinLabel:t="Unpin row {row}",headerLabel:n="Pin"}={}){return{id:"pin",header:()=>e.jsx("span",{className:"sr-only",children:n}),cell:({row:r})=>{if(!r.getCanPin())return null;const o=r.getIsPinned(),s=String(r.index+1);return e.jsx("button",{type:"button",onClick:()=>r.pin(o?!1:"top"),"aria-pressed":!!o,"aria-label":(o?t:a).replace("{row}",s),className:"flex size-6 items-center justify-center rounded-md opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-hidden focus-visible:ring-2",style:{"--tw-ring-color":"var(--role-focus-ring)"},children:o?e.jsx(q,{className:"size-4","aria-hidden":"true"}):e.jsx($,{className:"size-4","aria-hidden":"true"})})},enableSorting:!1,enableHiding:!1,size:40}}function N({children:a,className:t}){return e.jsx("div",{className:L("px-6 py-4 text-sm",t),style:{backgroundColor:"var(--role-surface-subtle)",color:"var(--role-text-primary)"},children:a})}N.__docgenInfo={description:"Standard padding/background for a master-detail panel, so every consumer's\n`renderDetail` doesn't re-invent the same frame.",methods:[],displayName:"DataGridDetailPanel",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"The expanded row's detail content — usually a `renderDetail` result passed straight through."},className:{required:!1,tsType:{name:"string"},description:""}}};const{expect:i}=__STORYBOOK_MODULE_TEST__,wt={title:"Components/DataGrid",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["**The same table, composed.** Reach for this when **you need the table instance** — not","when you need more features.","","[`DataTable`](/docs/components-datatable--docs) is a preset over this component and has","**identical capabilities**. What `DataGrid` adds is ownership: you hold the instance, so","anything outside the table can read its selection, filters and sorting, drive it, or","reorder and omit its parts.","","`ConsumerOwnedState` is the story that earns this API. Stories that also appear under","`DataTable` show the same behaviour through a different shape, not different behaviour.","","See [Foundations -> Choosing a table](/docs/foundations-choosing-a-table--docs)."].join(`
`)}}}},l=[{id:1,name:"Commercial Auto",status:"Active",premium:"$12,400",renewalDate:"2026-03-14"},{id:2,name:"General Liability",status:"Active",premium:"$8,200",renewalDate:"2026-05-01"},{id:3,name:"Cyber Liability",status:"Pending",premium:"$15,900",renewalDate:"2026-01-22"},{id:4,name:"Property",status:"Active",premium:"$22,000",renewalDate:"2026-07-09"},{id:5,name:"Workers Comp",status:"Expired",premium:"$9,600",renewalDate:"2025-11-30"},{id:6,name:"Umbrella",status:"Active",premium:"$4,100",renewalDate:"2026-04-18"},{id:7,name:"Marine Cargo",status:"Pending",premium:"$11,750",renewalDate:"2026-02-27"}],g=[{accessorKey:"name",header:"Policy",enableSorting:!0},{accessorKey:"status",header:"Status",cell:({getValue:a})=>{const t=a();return e.jsx(B,{variant:"soft",tone:t==="Active"?"success":t==="Expired"?"danger":"warning",children:t})}},{accessorKey:"premium",header:"Premium",enableSorting:!0},{accessorKey:"renewalDate",header:"Renewal Date",enableSorting:!0}];function R({data:a=l,loading:t=!1}){const n=z({columns:g,data:a,pageSize:5,pinFirstColumn:!1});return e.jsxs(d,{table:n,recordCount:a.length,loading:t,searchKey:"name",children:[e.jsx(P,{searchPlaceholder:"Search policies...",facetedFilters:[{columnId:"status",title:"Status"}],enableSortList:!0,enableDensityToggle:!0,enableColumnVisibility:!0,enableExport:!0,exportFilename:"policies",children:e.jsx(M,{variant:"outline",size:"sm",className:"px-2 text-xs font-normal",children:"New policy"})}),e.jsxs(c,{children:[e.jsx(m,{children:e.jsx(p,{})}),e.jsx(D,{pageSizeOptions:[5,10,25]})]})]})}const y={parameters:{docs:{description:{story:"The full composition. Note the toolbar, table and footer are siblings — nothing is nested inside a single component, so any of them can be omitted, reordered, or replaced."}}},render:()=>e.jsx(R,{})},b={parameters:{docs:{description:{story:"The grid resolves one status for the whole tree (loading > error > empty > ready), so the table renders skeletons without the toolbar needing to know."}}},render:()=>e.jsx(R,{loading:!0})},w={parameters:{docs:{description:{story:"Same four-state vocabulary as `DataTable` — the state layer is shared, not per-API. What composition adds is that the toolbar and footer are siblings of the table, so they keep rendering around an empty body instead of disappearing with it: the user can still clear the filter that emptied it."}}},render:()=>e.jsx(R,{data:[]})};function K(){const[a,t]=T.useState([{id:"premium",desc:!0}]),[n,r]=T.useState({}),o=u({features:h,columns:g,data:l,state:{sorting:a,rowSelection:n},onSortingChange:t,onRowSelectionChange:r,enableRowSelection:!0,initialState:{pagination:{pageIndex:0,pageSize:5}}});return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("p",{className:"text-sm",children:["Sorted by ",e.jsx("strong",{children:a.map(s=>`${s.id} ${s.desc?"desc":"asc"}`).join(", ")||"nothing"})," · ",e.jsx("strong",{children:Object.keys(n).length})," selected"]}),e.jsxs(d,{table:o,recordCount:l.length,children:[e.jsx(P,{enableSortList:!0}),e.jsxs(c,{children:[e.jsx(m,{children:e.jsx(p,{})}),e.jsx(D,{showSelectedCount:!0})]})]})]})}function V(){const[a,t]=T.useState([]),n=u({features:h,columns:g,data:l,state:{sorting:a},onSortingChange:t,enableColumnPinning:!0,enableColumnResizing:!0,columnResizeMode:"onChange",initialState:{pagination:{pageIndex:0,pageSize:5}}});return e.jsxs(d,{table:n,recordCount:l.length,children:[e.jsx(P,{enableColumnVisibility:!0,enableDensityToggle:!0}),e.jsxs(c,{children:[e.jsx(m,{children:e.jsx(p,{enableColumnReorder:!0})}),e.jsx(D,{})]})]})}const x={parameters:{docs:{description:{story:"Every column menu carries Pin to start / Pin to end / Unpin and Move left / Move right, plus the existing sort and hide items. **Reorder is keyboard-first on purpose**: a drag-only implementation passes axe — it cannot tell whether a div with `onPointerDown` is reachable by keyboard — and fails WCAG 2.1.1. Moves stay inside a column's own pinned region, because a start-pinned column renders before the centre ones regardless of column order; allowing the move would reorder the array, change nothing on screen, and announce success. The resize handle is a focusable `role=\"separator\"` with `aria-valuemin`/`max` from the column's own bounds."}}},render:()=>e.jsx(V,{})};function _(){const a=u({features:h,columns:[F(),H(),...g],data:l,enableRowPinning:!0,getRowCanExpand:()=>!0,initialState:{pagination:{pageIndex:0,pageSize:10}}});return e.jsx(d,{table:a,recordCount:l.length,maxHeight:320,children:e.jsxs(c,{children:[e.jsx(m,{children:e.jsx(p,{renderDetail:t=>e.jsxs(N,{children:[e.jsx("strong",{children:t.original.name})," renews ",t.original.renewalDate," at"," ",t.original.premium,". Detail panels are a real <tr> inside the table, so the panel stays associated with its row for assistive tech."]})})}),e.jsx(D,{})]})})}const f={parameters:{docs:{description:{story:"Expansion and row pinning. The chevron opens a master-detail panel; the pin keeps a row in view while the rest scrolls (the grid is height-bounded here so the sticky section has something to stick within). Pinned rows render in their own `<tbody>` rather than being reordered into the main one, which is what lets them stick without leaving the table's row structure. `renderDetail` also implies expandability — TanStack's default is \"expandable if it has subRows\", which for flat master-detail data is always false, so the toggle would never appear."}}},render:()=>e.jsx(_,{})},k=Array.from({length:2e3},(a,t)=>({id:t+1,name:`Policy ${t+1}`,status:["Active","Pending","Expired"][t%3],premium:`$${((t+1)*137).toLocaleString()}`,renewalDate:`2026-${String(t%12+1).padStart(2,"0")}-14`}));function U(){const a=u({features:h,columns:g,data:k,initialState:{pagination:{pageIndex:0,pageSize:k.length}}});return e.jsx(d,{table:a,recordCount:k.length,maxHeight:360,children:e.jsx(c,{children:e.jsx(m,{children:e.jsx(p,{enableVirtualization:!0,estimateRowSize:45,showFooter:!0,stickyFooter:!0})})})})}const S={parameters:{docs:{description:{story:"2,000 unpaginated rows, ~20 in the DOM. Implemented with **spacer rows, not a transform** — a `transform` on any ancestor creates a containing block and silently kills `position: sticky` on the header and every pinned column, which is the single most likely way to break this table. `aria-rowcount` and `aria-rowindex` carry the real totals, because otherwise a screen reader would announce the rendered window as the whole table. Capped at 2,000 rather than 50,000 deliberately: every story is axe-gated, and axe walks the rendered DOM."}}},render:()=>e.jsx(U,{}),play:async({canvasElement:a})=>{const t=a.querySelector("table"),n=a.querySelector(".overflow-auto");await new Promise(A=>setTimeout(A,400));const r=t.querySelectorAll("tbody tr:not([aria-hidden])").length;await i(r).toBeGreaterThan(0),await i(r).toBeLessThan(100),await i(t.getAttribute("aria-rowcount")).toBe(String(k.length+1)),await i(t.querySelector("tbody tr[aria-rowindex]")?.getAttribute("aria-rowindex")).toBe("2"),n.scrollTop=4e3,await new Promise(A=>setTimeout(A,300));const o=Number(t.querySelector("tbody tr[aria-rowindex]")?.getAttribute("aria-rowindex"));await i(o).toBeGreaterThan(50);const s=t.querySelector("thead");await i(getComputedStyle(s).position).toBe("sticky")}},W=[{accessorKey:"name",header:"Policy",meta:{cellEdit:{editable:!0}}},{accessorKey:"status",header:"Status",meta:{cellEdit:{editable:!0}}},{accessorKey:"premium",header:"Premium",meta:{cellEdit:{editable:!0}}},{accessorKey:"renewalDate",header:"Renewal Date"}];function X(){const[a,t]=T.useState("Select cells, then try arrows, Shift+arrows, Ctrl+A, Ctrl+C, Ctrl+D, Delete."),n=u({features:h,columns:W,data:l,enableCellSelection:!0,enableCellRangeSelection:!0,initialState:{pagination:{pageIndex:0,pageSize:10}}});return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("p",{className:"text-sm",children:a}),e.jsx(d,{table:n,recordCount:l.length,children:e.jsx(c,{children:e.jsx(m,{children:e.jsx(p,{enableCellSelection:!0,enableFillHandle:!0,onCellsChange:r=>t(`${r.source}: ${r.changes.length} changed, ${r.rejected.length} rejected`+(r.rejected.length?` (${r.rejected[0].reason})`:""))})})})})]})}const v={parameters:{docs:{description:{story:'Cell and range selection, keyboard grid navigation, and clipboard. TanStack v9 supplies the selection *model* — ranges, focus, edges, roving tabindex — and this layer adds what it deliberately does not: clipboard, fill, the keyboard map and editing.\n\n**Arrows** move · **Shift+arrows** extend · **Ctrl/Cmd+A** select all · **Ctrl/Cmd+C/X/V** copy/cut/paste · **Ctrl/Cmd+D / R** fill down/right · **Delete** clear.\n\nCtrl+D and Ctrl+R matter: without them the fill handle is mouse-only, which axe passes and WCAG 2.1.1 fails. Renewal Date is read-only, so writes across it are *reported as rejected* rather than silently skipped — otherwise a paste over a read-only column looks like it worked.\n\nThe table switches from `role="table"` to `role="grid"` only in this mode. `role=grid` promises arrow-key navigation, so claiming it on a static table is a lie to assistive tech.'}}},render:()=>e.jsx(X,{}),play:async({canvasElement:a})=>{const t=a.querySelector('[role="grid"]');await i(t.tagName).toBe("TABLE");const n=[...t.querySelectorAll('[role="gridcell"]')].filter(s=>s.getAttribute("tabindex")==="0");await i(n).toHaveLength(1),t.querySelectorAll('[role="gridcell"]')[0].dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})),await new Promise(s=>setTimeout(s,150));const o=[...t.querySelectorAll('[role="gridcell"]')].filter(s=>s.getAttribute("tabindex")==="0");await i(o).toHaveLength(1)}},C={parameters:{docs:{description:{story:"The sorting and selection state live in the story, not in the grid — so the page can render them above the table. `DataTable` keeps that state private, which is tracked as P1-5 in the production-readiness audit; this closes it."}}},render:()=>e.jsx(K,{})},E=[{id:1,name:"Commercial Auto",status:"Active",premium:12400,lossRatio:62.4,renewalDate:"2026-03-14"},{id:2,name:"General Liability",status:"Active",premium:8200,lossRatio:41.9,renewalDate:"2026-05-01"},{id:3,name:"Cyber Liability",status:"Pending",premium:15900,lossRatio:78.1,renewalDate:"2026-01-22"},{id:4,name:"Property",status:"Active",premium:22e3,lossRatio:55,renewalDate:"2026-07-09"},{id:5,name:"Workers Comp",status:"Expired",premium:9600,lossRatio:88.7,renewalDate:"2025-11-30"}],Y=[{accessorKey:"name",header:"Policy",enableSorting:!0},{accessorKey:"status",header:"Status",cell:({getValue:a})=>{const t=a();return e.jsx(B,{variant:"soft",tone:t==="Active"?"success":t==="Expired"?"danger":"warning",children:t})}},{accessorKey:"premium",header:"Premium",enableSorting:!0,meta:{type:"currency"}},{accessorKey:"lossRatio",header:"Loss ratio",enableSorting:!0,meta:{type:"percent"}},{accessorKey:"renewalDate",header:"Renewal Date",enableSorting:!0,meta:{type:"date"}}];function Z(){const a=z({columns:Y,data:E,pageSize:5,pinFirstColumn:!1});return e.jsx(d,{table:a,recordCount:E.length,children:e.jsx(c,{children:e.jsx(m,{children:e.jsx(p,{})})})})}const j={parameters:{docs:{description:{story:"Columns declare `meta: { type: 'currency' | 'percent' | 'date' }` and hold **raw** numbers and ISO strings — no `cell` renderer. The grid formats the value through `formatValue` (locale/currency from a `FormatProvider`, or `en-US`/`USD` by default), and numeric types align right automatically. The `Status` column keeps its custom `cell`, which always wins over `meta.type`."}}},render:()=>e.jsx(Z,{}),play:async({canvasElement:a})=>{const t=a.querySelector("table");await i(t.textContent).toContain("$12,400.00"),await i(t.textContent).toContain("62.4%"),await i(t.textContent).not.toContain("2026-03-14"),await i(t.textContent).toContain("Active")}},xt=["Default","Loading","Empty","ColumnControls","RowExpansionAndPinning","Virtualized","SpreadsheetSelection","ConsumerOwnedState","TypedColumnFormatting"];y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The full composition. Note the toolbar, table and footer are siblings — nothing is nested inside a single component, so any of them can be omitted, reordered, or replaced.'
      }
    }
  },
  render: () => <Composed />
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The grid resolves one status for the whole tree (loading > error > empty > ready), so the table renders skeletons without the toolbar needing to know.'
      }
    }
  },
  render: () => <Composed loading />
}`,...b.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Same four-state vocabulary as \`DataTable\` — the state layer is shared, not per-API. What composition adds is that the toolbar and footer are siblings of the table, so they keep rendering around an empty body instead of disappearing with it: the user can still clear the filter that emptied it.'
      }
    }
  },
  render: () => <Composed data={[]} />
}`,...w.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Every column menu carries Pin to start / Pin to end / Unpin and Move left / Move right, plus the existing sort and hide items. **Reorder is keyboard-first on purpose**: a drag-only implementation passes axe — it cannot tell whether a div with \`onPointerDown\` is reachable by keyboard — and fails WCAG 2.1.1. Moves stay inside a column\\'s own pinned region, because a start-pinned column renders before the centre ones regardless of column order; allowing the move would reorder the array, change nothing on screen, and announce success. The resize handle is a focusable \`role="separator"\` with \`aria-valuemin\`/\`max\` from the column\\'s own bounds.'
      }
    }
  },
  render: () => <ColumnControl />
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Expansion and row pinning. The chevron opens a master-detail panel; the pin keeps a row in view while the rest scrolls (the grid is height-bounded here so the sticky section has something to stick within). Pinned rows render in their own \`<tbody>\` rather than being reordered into the main one, which is what lets them stick without leaving the table\\'s row structure. \`renderDetail\` also implies expandability — TanStack\\'s default is "expandable if it has subRows", which for flat master-detail data is always false, so the toggle would never appear.'
      }
    }
  },
  render: () => <Rows />
}`,...f.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '2,000 unpaginated rows, ~20 in the DOM. Implemented with **spacer rows, not a transform** — a \`transform\` on any ancestor creates a containing block and silently kills \`position: sticky\` on the header and every pinned column, which is the single most likely way to break this table. \`aria-rowcount\` and \`aria-rowindex\` carry the real totals, because otherwise a screen reader would announce the rendered window as the whole table. Capped at 2,000 rather than 50,000 deliberately: every story is axe-gated, and axe walks the rendered DOM.'
      }
    }
  },
  render: () => <Virtual />,
  play: async ({
    canvasElement
  }) => {
    const table = canvasElement.querySelector('table')!;
    const scroller = canvasElement.querySelector('.overflow-auto') as HTMLElement;

    // The virtualizer measures the scroll element in an effect, so nothing is
    // rendered on the first paint — wait for the window to populate rather
    // than asserting into the gap.
    await new Promise(r => setTimeout(r, 400));

    // The whole point: the DOM holds a fraction of the data.
    const rendered = table.querySelectorAll('tbody tr:not([aria-hidden])').length;
    await expect(rendered).toBeGreaterThan(0);
    await expect(rendered).toBeLessThan(100);

    // ...while ARIA still describes all of it.
    await expect(table.getAttribute('aria-rowcount')).toBe(String(bulk.length + 1));
    await expect(table.querySelector('tbody tr[aria-rowindex]')?.getAttribute('aria-rowindex')).toBe('2');

    // Scrolling swaps the window and the indices follow the absolute position.
    scroller.scrollTop = 4000;
    await new Promise(r => setTimeout(r, 300));
    const firstIndex = Number(table.querySelector('tbody tr[aria-rowindex]')?.getAttribute('aria-rowindex'));
    await expect(firstIndex).toBeGreaterThan(50);

    // The header is still stuck — proving no ancestor transform crept in.
    const thead = table.querySelector('thead') as HTMLElement;
    await expect(getComputedStyle(thead).position).toBe('sticky');
  }
}`,...S.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Cell and range selection, keyboard grid navigation, and clipboard. TanStack v9 supplies the selection *model* — ranges, focus, edges, roving tabindex — and this layer adds what it deliberately does not: clipboard, fill, the keyboard map and editing.\\n\\n**Arrows** move · **Shift+arrows** extend · **Ctrl/Cmd+A** select all · **Ctrl/Cmd+C/X/V** copy/cut/paste · **Ctrl/Cmd+D / R** fill down/right · **Delete** clear.\\n\\nCtrl+D and Ctrl+R matter: without them the fill handle is mouse-only, which axe passes and WCAG 2.1.1 fails. Renewal Date is read-only, so writes across it are *reported as rejected* rather than silently skipped — otherwise a paste over a read-only column looks like it worked.\\n\\nThe table switches from \`role="table"\` to \`role="grid"\` only in this mode. \`role=grid\` promises arrow-key navigation, so claiming it on a static table is a lie to assistive tech.'
      }
    }
  },
  render: () => <Spreadsheet />,
  play: async ({
    canvasElement
  }) => {
    const grid = canvasElement.querySelector('[role="grid"]') as HTMLElement;
    await expect(grid.tagName).toBe('TABLE');

    // Reachable by Tab before anything is focused — otherwise a keyboard user
    // can never enter the grid.
    const tabbable = [...grid.querySelectorAll('[role="gridcell"]')].filter(c => c.getAttribute('tabindex') === '0');
    await expect(tabbable).toHaveLength(1);

    // ...and exactly one stop after focus moves, too.
    const cells = grid.querySelectorAll('[role="gridcell"]');
    (cells[0] as HTMLElement).dispatchEvent(new MouseEvent('mousedown', {
      bubbles: true
    }));
    await new Promise(r => setTimeout(r, 150));
    const after = [...grid.querySelectorAll('[role="gridcell"]')].filter(c => c.getAttribute('tabindex') === '0');
    await expect(after).toHaveLength(1);
  }
}`,...v.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The sorting and selection state live in the story, not in the grid — so the page can render them above the table. \`DataTable\` keeps that state private, which is tracked as P1-5 in the production-readiness audit; this closes it.'
      }
    }
  },
  render: () => <OwnedState />
}`,...C.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Columns declare \`meta: { type: 'currency' | 'percent' | 'date' }\` and hold **raw** numbers and ISO strings — no \`cell\` renderer. The grid formats the value through \`formatValue\` (locale/currency from a \`FormatProvider\`, or \`en-US\`/\`USD\` by default), and numeric types align right automatically. The \`Status\` column keeps its custom \`cell\`, which always wins over \`meta.type\`."
      }
    }
  },
  render: () => <TypedFormatting />,
  play: async ({
    canvasElement
  }) => {
    const table = canvasElement.querySelector('table')!;
    // Raw 12400 rendered as currency, not as "12400".
    await expect(table.textContent).toContain('$12,400.00');
    // Raw 62.4 rendered as a percentage.
    await expect(table.textContent).toContain('62.4%');
    // The ISO date is formatted away.
    await expect(table.textContent).not.toContain('2026-03-14');
    // The custom-cell Status column is untouched.
    await expect(table.textContent).toContain('Active');
  }
}`,...j.parameters?.docs?.source}}};export{x as ColumnControls,C as ConsumerOwnedState,y as Default,w as Empty,b as Loading,f as RowExpansionAndPinning,v as SpreadsheetSelection,j as TypedColumnFormatting,S as Virtualized,xt as __namedExportsOrder,wt as default};
