import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./utils-BGgJixJd.js";import{n as o,t as s}from"./badge-BJRi19uA.js";import{n as ee,t as te}from"./createLucideIcon-DC6xoXt7.js";import{_ as ne,a as c,c as l,d as u,f as d,g as f,h as p,i as re,l as m,m as h,n as ie,o as ae,p as g,r as _,s as oe,t as v,u as se,v as y}from"./data-grid-pagination-BrZsrNrw.js";import{n as b,t as x}from"./chevron-right-D_G3GZnD.js";import{n as S,t as C}from"./button-DatWLSj0.js";var w,T;function E(){return(E=t((()=>{ee(),w=[[`path`,{d:`M12 17v5`,key:`bb1du9`}],[`path`,{d:`M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z`,key:`1nkz8b`}]],T=te(`pin`,w)})))()}function ce({indent:e=20,label:t=`Toggle row {row}`,headerLabel:n=`Expand`}={}){return{id:`expand`,header:()=>(0,O.jsx)(`span`,{className:`sr-only`,children:n}),cell:({row:n})=>{if(!n.getCanExpand())return(0,O.jsx)(`span`,{style:{paddingLeft:n.depth*e},"aria-hidden":`true`});let r=n.getIsExpanded();return(0,O.jsx)(`button`,{type:`button`,onClick:n.getToggleExpandedHandler(),"aria-expanded":r,"aria-label":t.replace(`{row}`,String(n.index+1)),className:`flex size-6 items-center justify-center rounded-md transition-transform focus-visible:outline-hidden focus-visible:ring-2`,style:{marginLeft:n.depth*e,"--tw-ring-color":`var(--role-border-focus)`},children:(0,O.jsx)(x,{className:a(`size-4 opacity-70 transition-transform`,r&&`rotate-90`),"aria-hidden":`true`})})},enableSorting:!1,enableHiding:!1,size:40}}function le({pinLabel:e=`Pin row {row}`,unpinLabel:t=`Unpin row {row}`,headerLabel:n=`Pin`}={}){return{id:`pin`,header:()=>(0,O.jsx)(`span`,{className:`sr-only`,children:n}),cell:({row:n})=>{if(!n.getCanPin())return null;let r=n.getIsPinned(),i=String(n.index+1);return(0,O.jsx)(`button`,{type:`button`,onClick:()=>n.pin(!r&&`top`),"aria-pressed":!!r,"aria-label":(r?t:e).replace(`{row}`,i),className:`flex size-6 items-center justify-center rounded-md opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-hidden focus-visible:ring-2`,style:{"--tw-ring-color":`var(--role-border-focus)`},children:r?(0,O.jsx)(ne,{className:`size-4`,"aria-hidden":`true`}):(0,O.jsx)(T,{className:`size-4`,"aria-hidden":`true`})})},enableSorting:!1,enableHiding:!1,size:40}}var D,O,k;function A(){return(A=t((()=>{D=e(n(),1),b(),E(),y(),i(),O=r(),k=D.forwardRef(function({children:e,className:t},n){return(0,O.jsx)(`div`,{ref:n,className:a(`px-6 py-4 text-sm`,t),style:{backgroundColor:`var(--role-bg-neutral-subtle)`,color:`var(--role-fg-primary)`},children:e})}),k.displayName=`DataGridDetailPanel`,k.__docgenInfo={description:`Standard padding/background for a master-detail panel, so every consumer's
\`renderDetail\` doesn't re-invent the same frame.

The one real component in this file — the \`create*Column\` helpers above are
column-definition factories that return a plain object for TanStack and
never mount a DOM root to attach a ref to.`,methods:[],displayName:`DataGridDetailPanel`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:"The expanded row's detail content — usually a `renderDetail` result passed straight through."},className:{required:!1,tsType:{name:`string`},description:``}}}})))()}function j({data:e=L,loading:t=!1}){let n=l({columns:R,data:e,pageSize:5,pinFirstColumn:!1});return(0,P.jsxs)(g,{table:n,recordCount:e.length,loading:t,searchKey:`name`,children:[(0,P.jsx)(_,{searchPlaceholder:`Search policies...`,facetedFilters:[{columnId:`status`,title:`Status`}],enableSortList:!0,enableDensityToggle:!0,enableColumnVisibility:!0,enableExport:!0,exportFilename:`policies`,children:(0,P.jsx)(C,{variant:`outline`,size:`sm`,className:`px-2 text-xs font-normal`,children:`New policy`})}),(0,P.jsxs)(h,{children:[(0,P.jsx)(p,{children:(0,P.jsx)(c,{})}),(0,P.jsx)(v,{pageSizeOptions:[5,10,25]})]})]})}function ue(){let[e,t]=(0,N.useState)([{id:`premium`,desc:!0}]),[n,r]=(0,N.useState)({}),i=d({features:m,columns:R,data:L,state:{sorting:e,rowSelection:n},onSortingChange:t,onRowSelectionChange:r,enableRowSelection:!0,initialState:{pagination:{pageIndex:0,pageSize:5}}});return(0,P.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,P.jsxs)(`p`,{className:`text-sm`,children:[`Sorted by `,(0,P.jsx)(`strong`,{children:e.map(e=>`${e.id} ${e.desc?`desc`:`asc`}`).join(`, `)||`nothing`}),` · `,(0,P.jsx)(`strong`,{children:Object.keys(n).length}),` selected`]}),(0,P.jsxs)(g,{table:i,recordCount:L.length,children:[(0,P.jsx)(_,{enableSortList:!0}),(0,P.jsxs)(h,{children:[(0,P.jsx)(p,{children:(0,P.jsx)(c,{})}),(0,P.jsx)(v,{showSelectedCount:!0})]})]})]})}function de(){let[e,t]=(0,N.useState)([]),n=d({features:m,columns:R,data:L,state:{sorting:e},onSortingChange:t,enableColumnPinning:!0,enableColumnResizing:!0,columnResizeMode:`onChange`,initialState:{pagination:{pageIndex:0,pageSize:5}}});return(0,P.jsxs)(g,{table:n,recordCount:L.length,children:[(0,P.jsx)(_,{enableColumnVisibility:!0,enableDensityToggle:!0}),(0,P.jsxs)(h,{children:[(0,P.jsx)(p,{children:(0,P.jsx)(c,{enableColumnReorder:!0})}),(0,P.jsx)(v,{})]})]})}function fe(){let e=d({features:m,columns:[ce(),le(),...R],data:L,enableRowPinning:!0,getRowCanExpand:()=>!0,initialState:{pagination:{pageIndex:0,pageSize:10}}});return(0,P.jsx)(g,{table:e,recordCount:L.length,maxHeight:320,children:(0,P.jsxs)(h,{children:[(0,P.jsx)(p,{children:(0,P.jsx)(c,{renderDetail:e=>(0,P.jsxs)(k,{children:[(0,P.jsx)(`strong`,{children:e.original.name}),` renews `,e.original.renewalDate,` at`,` `,e.original.premium,`. Detail panels are a real <tr> inside the table, so the panel stays associated with its row for assistive tech.`]})})}),(0,P.jsx)(v,{})]})})}function pe(){let e=d({features:m,columns:R,data:W,initialState:{pagination:{pageIndex:0,pageSize:W.length}}});return(0,P.jsx)(g,{table:e,recordCount:W.length,maxHeight:360,children:(0,P.jsx)(h,{children:(0,P.jsx)(p,{children:(0,P.jsx)(c,{enableVirtualization:!0,estimateRowSize:45,showFooter:!0,stickyFooter:!0})})})})}function me(){let[e,t]=(0,N.useState)(`Select cells, then try arrows, Shift+arrows, Ctrl+A, Ctrl+C, Ctrl+D, Delete.`),n=d({features:m,columns:K,data:L,enableCellSelection:!0,enableCellRangeSelection:!0,initialState:{pagination:{pageIndex:0,pageSize:10}}});return(0,P.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,P.jsx)(`p`,{className:`text-sm`,children:e}),(0,P.jsx)(g,{table:n,recordCount:L.length,children:(0,P.jsx)(h,{children:(0,P.jsx)(p,{children:(0,P.jsx)(c,{enableCellSelection:!0,enableFillHandle:!0,onCellsChange:e=>t(`${e.source}: ${e.changes.length} changed, ${e.rejected.length} rejected`+(e.rejected.length?` (${e.rejected[0].reason})`:``))})})})})]})}function M(){let e=l({columns:X,data:Y,pageSize:5,pinFirstColumn:!1});return(0,P.jsx)(g,{table:e,recordCount:Y.length,children:(0,P.jsx)(h,{children:(0,P.jsx)(p,{children:(0,P.jsx)(c,{})})})})}var N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{N=n(),u(),f(),ae(),re(),ie(),se(),oe(),A(),o(),S(),P=r(),{expect:F}=__STORYBOOK_MODULE_TEST__,I={title:`Components/DataGrid`,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`**The same table, composed.** Reach for this when **you need the table instance** — not
when you need more features.

[\`DataTable\`](/docs/components-datatable--docs) is a preset over this component and has
**identical capabilities**. What \`DataGrid\` adds is ownership: you hold the instance, so
anything outside the table can read its selection, filters and sorting, drive it, or
reorder and omit its parts.

\`ConsumerOwnedState\` is the story that earns this API. Stories that also appear under
\`DataTable\` show the same behaviour through a different shape, not different behaviour.

See [Foundations -> Choosing a table](/docs/foundations-choosing-a-table--docs).`}}}},L=[{id:1,name:`Commercial Auto`,status:`Active`,premium:`$12,400`,renewalDate:`2026-03-14`},{id:2,name:`General Liability`,status:`Active`,premium:`$8,200`,renewalDate:`2026-05-01`},{id:3,name:`Cyber Liability`,status:`Pending`,premium:`$15,900`,renewalDate:`2026-01-22`},{id:4,name:`Property`,status:`Active`,premium:`$22,000`,renewalDate:`2026-07-09`},{id:5,name:`Workers Comp`,status:`Expired`,premium:`$9,600`,renewalDate:`2025-11-30`},{id:6,name:`Umbrella`,status:`Active`,premium:`$4,100`,renewalDate:`2026-04-18`},{id:7,name:`Marine Cargo`,status:`Pending`,premium:`$11,750`,renewalDate:`2026-02-27`}],R=[{accessorKey:`name`,header:`Policy`,enableSorting:!0},{accessorKey:`status`,header:`Status`,cell:({getValue:e})=>{let t=e();return(0,P.jsx)(s,{variant:`soft`,tone:t===`Active`?`success`:t===`Expired`?`danger`:`warning`,children:t})}},{accessorKey:`premium`,header:`Premium`,enableSorting:!0},{accessorKey:`renewalDate`,header:`Renewal Date`,enableSorting:!0}],z={parameters:{docs:{description:{story:`The full composition. Note the toolbar, table and footer are siblings — nothing is nested inside a single component, so any of them can be omitted, reordered, or replaced.`}}},render:()=>(0,P.jsx)(j,{})},B={parameters:{docs:{description:{story:`The grid resolves one status for the whole tree (loading > error > empty > ready), so the table renders skeletons without the toolbar needing to know.`}}},render:()=>(0,P.jsx)(j,{loading:!0})},V={parameters:{docs:{description:{story:"Same four-state vocabulary as `DataTable` — the state layer is shared, not per-API. What composition adds is that the toolbar and footer are siblings of the table, so they keep rendering around an empty body instead of disappearing with it: the user can still clear the filter that emptied it."}}},render:()=>(0,P.jsx)(j,{data:[]})},H={parameters:{docs:{description:{story:"Every column menu carries Pin to start / Pin to end / Unpin and Move left / Move right, plus the existing sort and hide items. **Reorder is keyboard-first on purpose**: a drag-only implementation passes axe — it cannot tell whether a div with `onPointerDown` is reachable by keyboard — and fails WCAG 2.1.1. Moves stay inside a column's own pinned region, because a start-pinned column renders before the centre ones regardless of column order; allowing the move would reorder the array, change nothing on screen, and announce success. The resize handle is a focusable `role=\"separator\"` with `aria-valuemin`/`max` from the column's own bounds."}}},render:()=>(0,P.jsx)(de,{})},U={parameters:{docs:{description:{story:"Expansion and row pinning. The chevron opens a master-detail panel; the pin keeps a row in view while the rest scrolls (the grid is height-bounded here so the sticky section has something to stick within). Pinned rows render in their own `<tbody>` rather than being reordered into the main one, which is what lets them stick without leaving the table's row structure. `renderDetail` also implies expandability — TanStack's default is \"expandable if it has subRows\", which for flat master-detail data is always false, so the toggle would never appear."}}},render:()=>(0,P.jsx)(fe,{})},W=Array.from({length:2e3},(e,t)=>({id:t+1,name:`Policy ${t+1}`,status:[`Active`,`Pending`,`Expired`][t%3],premium:`$${((t+1)*137).toLocaleString()}`,renewalDate:`2026-${String(t%12+1).padStart(2,`0`)}-14`})),G={parameters:{docs:{description:{story:"2,000 unpaginated rows, ~20 in the DOM. Implemented with **spacer rows, not a transform** — a `transform` on any ancestor creates a containing block and silently kills `position: sticky` on the header and every pinned column, which is the single most likely way to break this table. `aria-rowcount` and `aria-rowindex` carry the real totals, because otherwise a screen reader would announce the rendered window as the whole table. Capped at 2,000 rather than 50,000 deliberately: every story is axe-gated, and axe walks the rendered DOM."}}},render:()=>(0,P.jsx)(pe,{}),play:async({canvasElement:e})=>{let t=e.querySelector(`table`),n=e.querySelector(`.overflow-auto`);await new Promise(e=>setTimeout(e,400));let r=t.querySelectorAll(`tbody tr:not([aria-hidden])`).length;await F(r).toBeGreaterThan(0),await F(r).toBeLessThan(100),await F(t.getAttribute(`aria-rowcount`)).toBe(String(W.length+1)),await F(t.querySelector(`tbody tr[aria-rowindex]`)?.getAttribute(`aria-rowindex`)).toBe(`2`),n.scrollTop=4e3,await new Promise(e=>setTimeout(e,300));let i=Number(t.querySelector(`tbody tr[aria-rowindex]`)?.getAttribute(`aria-rowindex`));await F(i).toBeGreaterThan(50);let a=t.querySelector(`thead`);await F(getComputedStyle(a).position).toBe(`sticky`)}},K=[{accessorKey:`name`,header:`Policy`,meta:{cellEdit:{editable:!0}}},{accessorKey:`status`,header:`Status`,meta:{cellEdit:{editable:!0}}},{accessorKey:`premium`,header:`Premium`,meta:{cellEdit:{editable:!0}}},{accessorKey:`renewalDate`,header:`Renewal Date`}],q={parameters:{docs:{description:{story:`Cell and range selection, keyboard grid navigation, and clipboard. TanStack v9 supplies the selection *model* — ranges, focus, edges, roving tabindex — and this layer adds what it deliberately does not: clipboard, fill, the keyboard map and editing.

**Arrows** move · **Shift+arrows** extend · **Ctrl/Cmd+A** select all · **Ctrl/Cmd+C/X/V** copy/cut/paste · **Ctrl/Cmd+D / R** fill down/right · **Delete** clear.

Ctrl+D and Ctrl+R matter: without them the fill handle is mouse-only, which axe passes and WCAG 2.1.1 fails. Renewal Date is read-only, so writes across it are *reported as rejected* rather than silently skipped — otherwise a paste over a read-only column looks like it worked.

The table switches from \`role="table"\` to \`role="grid"\` only in this mode. \`role=grid\` promises arrow-key navigation, so claiming it on a static table is a lie to assistive tech.`}}},render:()=>(0,P.jsx)(me,{}),play:async({canvasElement:e})=>{let t=e.querySelector(`[role="grid"]`);await F(t.tagName).toBe(`TABLE`);let n=[...t.querySelectorAll(`[role="gridcell"]`)].filter(e=>e.getAttribute(`tabindex`)===`0`);await F(n).toHaveLength(1),t.querySelectorAll(`[role="gridcell"]`)[0].dispatchEvent(new MouseEvent(`mousedown`,{bubbles:!0})),await new Promise(e=>setTimeout(e,150));let r=[...t.querySelectorAll(`[role="gridcell"]`)].filter(e=>e.getAttribute(`tabindex`)===`0`);await F(r).toHaveLength(1)}},J={parameters:{docs:{description:{story:"The sorting and selection state live in the story, not in the grid — so the page can render them above the table. `DataTable` keeps that state private, which is tracked as P1-5 in the production-readiness audit; this closes it."}}},render:()=>(0,P.jsx)(ue,{})},Y=[{id:1,name:`Commercial Auto`,status:`Active`,premium:12400,lossRatio:62.4,renewalDate:`2026-03-14`},{id:2,name:`General Liability`,status:`Active`,premium:8200,lossRatio:41.9,renewalDate:`2026-05-01`},{id:3,name:`Cyber Liability`,status:`Pending`,premium:15900,lossRatio:78.1,renewalDate:`2026-01-22`},{id:4,name:`Property`,status:`Active`,premium:22e3,lossRatio:55,renewalDate:`2026-07-09`},{id:5,name:`Workers Comp`,status:`Expired`,premium:9600,lossRatio:88.7,renewalDate:`2025-11-30`}],X=[{accessorKey:`name`,header:`Policy`,enableSorting:!0},{accessorKey:`status`,header:`Status`,cell:({getValue:e})=>{let t=e();return(0,P.jsx)(s,{variant:`soft`,tone:t===`Active`?`success`:t===`Expired`?`danger`:`warning`,children:t})}},{accessorKey:`premium`,header:`Premium`,enableSorting:!0,meta:{type:`currency`}},{accessorKey:`lossRatio`,header:`Loss ratio`,enableSorting:!0,meta:{type:`percent`}},{accessorKey:`renewalDate`,header:`Renewal Date`,enableSorting:!0,meta:{type:`date`}}],Z={parameters:{docs:{description:{story:"Columns declare `meta: { type: 'currency' | 'percent' | 'date' }` and hold **raw** numbers and ISO strings — no `cell` renderer. The grid formats the value through `formatValue` (locale/currency from a `FormatProvider`, or `en-US`/`USD` by default), and numeric types align right automatically. The `Status` column keeps its custom `cell`, which always wins over `meta.type`."}}},render:()=>(0,P.jsx)(M,{}),play:async({canvasElement:e})=>{let t=e.querySelector(`table`);await F(t.textContent).toContain(`$12,400.00`),await F(t.textContent).toContain(`62.4%`),await F(t.textContent).not.toContain(`2026-03-14`),await F(t.textContent).toContain(`Active`)}},Q=[`Default`,`Loading`,`Empty`,`ColumnControls`,`RowExpansionAndPinning`,`Virtualized`,`SpreadsheetSelection`,`ConsumerOwnedState`,`TypedColumnFormatting`],z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The full composition. Note the toolbar, table and footer are siblings — nothing is nested inside a single component, so any of them can be omitted, reordered, or replaced.'
      }
    }
  },
  render: () => <Composed />
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The grid resolves one status for the whole tree (loading > error > empty > ready), so the table renders skeletons without the toolbar needing to know.'
      }
    }
  },
  render: () => <Composed loading />
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Same four-state vocabulary as \`DataTable\` — the state layer is shared, not per-API. What composition adds is that the toolbar and footer are siblings of the table, so they keep rendering around an empty body instead of disappearing with it: the user can still clear the filter that emptied it.'
      }
    }
  },
  render: () => <Composed data={[]} />
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Every column menu carries Pin to start / Pin to end / Unpin and Move left / Move right, plus the existing sort and hide items. **Reorder is keyboard-first on purpose**: a drag-only implementation passes axe — it cannot tell whether a div with \`onPointerDown\` is reachable by keyboard — and fails WCAG 2.1.1. Moves stay inside a column\\'s own pinned region, because a start-pinned column renders before the centre ones regardless of column order; allowing the move would reorder the array, change nothing on screen, and announce success. The resize handle is a focusable \`role="separator"\` with \`aria-valuemin\`/\`max\` from the column\\'s own bounds.'
      }
    }
  },
  render: () => <ColumnControl />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Expansion and row pinning. The chevron opens a master-detail panel; the pin keeps a row in view while the rest scrolls (the grid is height-bounded here so the sticky section has something to stick within). Pinned rows render in their own \`<tbody>\` rather than being reordered into the main one, which is what lets them stick without leaving the table\\'s row structure. \`renderDetail\` also implies expandability — TanStack\\'s default is "expandable if it has subRows", which for flat master-detail data is always false, so the toggle would never appear.'
      }
    }
  },
  render: () => <Rows />
}`,...U.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The sorting and selection state live in the story, not in the grid — so the page can render them above the table. \`DataTable\` keeps that state private, which is tracked as P1-5 in the production-readiness audit; this closes it.'
      }
    }
  },
  render: () => <OwnedState />
}`,...J.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
}`,...Z.parameters?.docs?.source}}}})))()}$();export{H as ColumnControls,J as ConsumerOwnedState,z as Default,V as Empty,B as Loading,U as RowExpansionAndPinning,q as SpreadsheetSelection,Z as TypedColumnFormatting,G as Virtualized,Q as __namedExportsOrder,I as default};