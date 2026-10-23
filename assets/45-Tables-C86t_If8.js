import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t,s as n}from"./blocks-GA0YWl98.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";function o(e){let t={blockquote:`blockquote`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{title:`Foundations/Choosing a table`}),`
`,(0,c.jsx)(t.h1,{id:`choosing-a-table`,children:`Choosing a table`}),`
`,(0,c.jsxs)(t.p,{children:[`Three components render tabular data, and the difference between two of them is
`,(0,c.jsx)(t.strong,{children:`not`}),` what they can do. Reading their story lists side by side will not tell you
which to reach for, so this page does.`]}),`
`,(0,c.jsxs)(`div`,{style:{display:`grid`,gap:16,gridTemplateColumns:`repeat(auto-fit, minmax(240px, 1fr))`,margin:`24px 0`},children:[(0,c.jsxs)(`div`,{style:{border:`1px solid var(--role-border-subtle, #e3e3e3)`,borderRadius:12,padding:16},children:[(0,c.jsx)(`h3`,{style:{margin:`0 0 8px`},children:(0,c.jsx)(`code`,{children:`Table`})}),(0,c.jsx)(`p`,{style:{margin:0,fontSize:14},children:(0,c.jsx)(t.p,{children:`A simple, read-oriented table. Its own implementation — no TanStack, no shared
engine.`})}),(0,c.jsx)(`p`,{style:{margin:`8px 0 0`,fontSize:13,opacity:.75},children:(0,c.jsxs)(t.p,{children:[`Prefer `,(0,c.jsx)(`code`,{children:`DataTable`}),` for new work. See “Table’s future” below.`]})})]}),(0,c.jsxs)(`div`,{style:{border:`1px solid var(--role-border-subtle, #e3e3e3)`,borderRadius:12,padding:16},children:[(0,c.jsx)(`h3`,{style:{margin:`0 0 8px`},children:(0,c.jsx)(`code`,{children:`DataTable`})}),(0,c.jsx)(`p`,{style:{margin:0,fontSize:14},children:(0,c.jsxs)(t.p,{children:[`The default choice. Pass props, get a table. Every capability the grid has is
reachable through an `,(0,c.jsx)(`code`,{children:`enable*`}),` prop.`]})})]}),(0,c.jsxs)(`div`,{style:{border:`1px solid var(--role-border-subtle, #e3e3e3)`,borderRadius:12,padding:16},children:[(0,c.jsx)(`h3`,{style:{margin:`0 0 8px`},children:(0,c.jsx)(`code`,{children:`DataGrid`})}),(0,c.jsx)(`p`,{style:{margin:0,fontSize:14},children:(0,c.jsxs)(t.p,{children:[`The same engine, composed. Reach for it when `,(0,c.jsx)(`strong`,{children:`you need the table
instance`}),` — not when you need more features.`]})})]})]}),`
`,(0,c.jsx)(t.h2,{id:`the-thing-that-confuses-everyone`,children:`The thing that confuses everyone`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsxs)(t.strong,{children:[(0,c.jsx)(t.code,{children:`DataTable`}),` and `,(0,c.jsx)(t.code,{children:`DataGrid`}),` are the same component with two API shapes.`]})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`DataTable`}),` imports `,(0,c.jsx)(t.code,{children:`DataGrid`}),` and renders it. It is a preset, not a lesser tier.
There is no capability in one that is missing from the other — sorting, filtering,
selection, pinning, reordering, resizing, virtualization, inline editing, cell
ranges and clipboard are all available either way.`]}),`
`,(0,c.jsxs)(t.p,{children:[`So the question is never `,(0,c.jsx)(t.em,{children:`“do I need more power?”`}),`. It is:`]}),`
`,(0,c.jsxs)(t.blockquote,{children:[`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Does anything outside the table need to read or drive its state?`})}),`
`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{}),(0,c.jsx)(t.th,{children:(0,c.jsx)(t.code,{children:`DataTable`})}),(0,c.jsx)(t.th,{children:(0,c.jsx)(t.code,{children:`DataGrid`})})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`API`}),(0,c.jsx)(t.td,{children:`~28 props`}),(0,c.jsx)(t.td,{children:`composed children`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Who owns the table instance`}),(0,c.jsx)(t.td,{children:`the component`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.strong,{children:`you`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Read selection / filters / sorting directly`}),(0,c.jsx)(t.td,{children:`no — only via callbacks`}),(0,c.jsx)(t.td,{children:`yes`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Reorder, replace or omit parts`}),(0,c.jsx)(t.td,{children:`no`}),(0,c.jsx)(t.td,{children:`yes`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Capabilities`}),(0,c.jsx)(t.td,{children:`identical`}),(0,c.jsx)(t.td,{children:`identical`})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[`Use `,(0,c.jsx)(t.code,{children:`DataTable`})]}),` unless one of these is true:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`a toolbar, header or side panel outside the table needs to read its state;`}),`
`,(0,c.jsx)(t.li,{children:`you need to drive the table from elsewhere (a saved view, a URL, another control);`}),`
`,(0,c.jsx)(t.li,{children:`you need to replace a part, or leave one out;`}),`
`,(0,c.jsx)(t.li,{children:`you want the toolbar somewhere other than above the table.`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[`Then use `,(0,c.jsx)(t.code,{children:`DataGrid`})]}),`, and see its `,(0,c.jsx)(t.code,{children:`ConsumerOwnedState`}),` story — that one story is the
entire reason this API exists.`]}),`
`,(0,c.jsx)(t.h2,{id:`reading-the-stories`,children:`Reading the stories`}),`
`,(0,c.jsxs)(t.p,{children:[`Because the two share an engine, several stories necessarily look alike. What each
set is `,(0,c.jsx)(t.em,{children:`for`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.code,{children:`Components/DataTable`})}),` — the preset. Props in, table out. This is where
capabilities are demonstrated: selection, column visibility, server pagination,
inline editing, the state variants.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.code,{children:`Components/DataGrid`})}),` — composition. How the parts assemble, and what becomes
possible once you hold the instance.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.code,{children:`Components/Table`})}),` — the simple table. Nothing here is unique to it.`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`A story appearing in both places is showing the same behaviour through two APIs, not
two behaviours.`}),`
`,(0,c.jsx)(t.h2,{id:`tables-future`,children:`Table’s future`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`Table`}),` shares no code with the other two. Every fix has to be made twice, and its
capabilities were deliberately ported to the grid so it could be retired — see the
`,(0,c.jsx)(t.code,{children:`capabilities ported from table.tsx`}),` suite in `,(0,c.jsx)(t.code,{children:`data-grid-edges.test.tsx`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`It is now deprecated`}),` — since 0.7.0, removed after 0.8.0 (2026-12-23). The last
capability it had that the grid lacked was an opening sort, now `,(0,c.jsx)(t.code,{children:`initialSorting`}),`, and as
of 2026-09-26 it has `,(0,c.jsx)(t.strong,{children:`zero consumers`}),`: the four app surfaces and the Figma Code Connect
mapping all point at `,(0,c.jsx)(t.code,{children:`DataTable`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[`It is not deleted yet, deliberately. `,(0,c.jsx)(t.code,{children:`Table`}),` has been a published export since 0.6.0 while
its deprecation reads `,(0,c.jsx)(t.em,{children:`"since 0.7.0"`}),` — a version that has never shipped — so no consumer
has actually been warned. Removing it now would break an API nobody was told about. It
goes when 0.7.0 has carried the warning and 0.8.0 arrives.`]}),`
`,(0,c.jsx)(t.h3,{id:`the-markup-primitives`,children:`The markup primitives`}),`
`,(0,c.jsxs)(t.p,{children:[`The tier `,(0,c.jsx)(t.code,{children:`Table`}),` was pretending to be. `,(0,c.jsx)(t.code,{children:`TableHeader`}),`, `,(0,c.jsx)(t.code,{children:`TableBody`}),`, `,(0,c.jsx)(t.code,{children:`TableFooter`}),`,
`,(0,c.jsx)(t.code,{children:`TableRow`}),`, `,(0,c.jsx)(t.code,{children:`TableHead`}),`, `,(0,c.jsx)(t.code,{children:`TableCell`}),` and `,(0,c.jsx)(t.code,{children:`TableCaption`}),` are exported now; the `,(0,c.jsx)(t.code,{children:`Table`}),` root
itself joins them when the legacy engine is removed, because it currently owns that name.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<table>
  <TableHeader>
    <TableRow><TableHead>Policy</TableHead><TableHead>Premium</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Commercial Auto</TableCell><TableCell>$12,400</TableCell></TableRow>
  </TableBody>
</table>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`They carry this system's styling and nothing else — no state, no sorting, no pagination.
`,(0,c.jsx)(t.code,{children:`DataGrid`}),` is their first consumer, which is what keeps them honest: header height, cell
padding and the type scale are defined there once rather than restated in the grid.`]}),`
`,(0,c.jsxs)(t.p,{children:[`The evidence that this was overdue: the ambiguous `,(0,c.jsx)(t.code,{children:`aria-label="Select all rows"`}),` and the
positional `,(0,c.jsx)(t.code,{children:`Select row N`}),` were both fixed on the grid, and both still sit in `,(0,c.jsx)(t.code,{children:`table.tsx`}),`,
because nothing connects the two implementations. It also has zero tests, against roughly
ninety on the grid.`]}),`
`,(0,c.jsx)(t.p,{children:`Migrating:`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:(0,c.jsx)(t.code,{children:`Table`})}),(0,c.jsx)(t.th,{children:(0,c.jsx)(t.code,{children:`DataTable`})})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`variant="bordered"`})}),(0,c.jsxs)(t.td,{children:[`the default — `,(0,c.jsx)(t.code,{children:`DataGridContainer`}),` draws it`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`variant="borderless"`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<DataGridContainer border={false}>`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`variant="striped"`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`striped`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`variant="compact"`}),` / `,(0,c.jsx)(t.code,{children:`size`})]}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`defaultDensity="compact"`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`defaultSortColumn`}),` + `,(0,c.jsx)(t.code,{children:`defaultSortDirection`})]}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`initialSorting={[{ id, desc }]}`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`emptyMessage`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`emptyState`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`onRowSelect`})}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`enableRowSelection`}),` + `,(0,c.jsx)(t.code,{children:`onSelectionChange`})]})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[`Two props do `,(0,c.jsx)(t.strong,{children:`not`}),` carry over, deliberately: `,(0,c.jsx)(t.code,{children:`hoverable={false}`}),` (a row you can interact
with should say so) and `,(0,c.jsx)(t.code,{children:`onSort`}),` (with `,(0,c.jsx)(t.code,{children:`DataGrid`}),` you hold the instance and can read
sorting directly, which is strictly more capable than a callback).`]}),`
`,(0,c.jsx)(t.h2,{id:`when-not-to-use-a-table-at-all`,children:`When not to use a table at all`}),`
`,(0,c.jsx)(t.p,{children:`Tables exist so people can compare the same attributes across many records. If that
is not the task, something else is usually better:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`one record at a time → a detail view;`}),`
`,(0,c.jsx)(t.li,{children:`few comparable attributes → a list or cards;`}),`
`,(0,c.jsx)(t.li,{children:`hierarchy matters more than comparison → a tree;`}),`
`,(0,c.jsx)(t.li,{children:`trend matters more than values → a chart.`}),`
`]})]})}function s(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),i(),t()})))()}l();export{s as default};