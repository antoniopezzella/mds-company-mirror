import{ar as i,Z as e,c as r}from"./iframe-CPBTUrEW.js";import"./preload-helper-PPVm8Dsz.js";function t(s){const n={blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Foundations/Choosing a table"}),`
`,e.jsx(n.h1,{id:"choosing-a-table",children:"Choosing a table"}),`
`,e.jsxs(n.p,{children:[`Three components render tabular data, and the difference between two of them is
`,e.jsx(n.strong,{children:"not"}),` what they can do. Reading their story lists side by side will not tell you
which to reach for, so this page does.`]}),`
`,e.jsxs("div",{style:{display:"grid",gap:16,gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",margin:"24px 0"},children:[e.jsxs("div",{style:{border:"1px solid var(--role-border-subtle, #e3e3e3)",borderRadius:12,padding:16},children:[e.jsx("h3",{style:{margin:"0 0 8px"},children:e.jsx("code",{children:"Table"})}),e.jsx("p",{style:{margin:0,fontSize:14},children:e.jsx(n.p,{children:`A simple, read-oriented table. Its own implementation — no TanStack, no shared
engine.`})}),e.jsx("p",{style:{margin:"8px 0 0",fontSize:13,opacity:.75},children:e.jsxs(n.p,{children:["Prefer ",e.jsx("code",{children:"DataTable"})," for new work. See “Table’s future” below."]})})]}),e.jsxs("div",{style:{border:"1px solid var(--role-border-subtle, #e3e3e3)",borderRadius:12,padding:16},children:[e.jsx("h3",{style:{margin:"0 0 8px"},children:e.jsx("code",{children:"DataTable"})}),e.jsx("p",{style:{margin:0,fontSize:14},children:e.jsxs(n.p,{children:[`The default choice. Pass props, get a table. Every capability the grid has is
reachable through an `,e.jsx("code",{children:"enable*"})," prop."]})})]}),e.jsxs("div",{style:{border:"1px solid var(--role-border-subtle, #e3e3e3)",borderRadius:12,padding:16},children:[e.jsx("h3",{style:{margin:"0 0 8px"},children:e.jsx("code",{children:"DataGrid"})}),e.jsx("p",{style:{margin:0,fontSize:14},children:e.jsxs(n.p,{children:["The same engine, composed. Reach for it when ",e.jsx("strong",{children:`you need the table
instance`})," — not when you need more features."]})})]})]}),`
`,e.jsx(n.h2,{id:"the-thing-that-confuses-everyone",children:"The thing that confuses everyone"}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"DataTable"})," and ",e.jsx(n.code,{children:"DataGrid"})," are the same component with two API shapes."]})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"DataTable"})," imports ",e.jsx(n.code,{children:"DataGrid"}),` and renders it. It is a preset, not a lesser tier.
There is no capability in one that is missing from the other — sorting, filtering,
selection, pinning, reordering, resizing, virtualization, inline editing, cell
ranges and clipboard are all available either way.`]}),`
`,e.jsxs(n.p,{children:["So the question is never ",e.jsx(n.em,{children:"“do I need more power?”"}),". It is:"]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Does anything outside the table need to read or drive its state?"})}),`
`]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{}),e.jsx(n.th,{children:e.jsx(n.code,{children:"DataTable"})}),e.jsx(n.th,{children:e.jsx(n.code,{children:"DataGrid"})})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"API"}),e.jsx(n.td,{children:"~28 props"}),e.jsx(n.td,{children:"composed children"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Who owns the table instance"}),e.jsx(n.td,{children:"the component"}),e.jsx(n.td,{children:e.jsx(n.strong,{children:"you"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Read selection / filters / sorting directly"}),e.jsx(n.td,{children:"no — only via callbacks"}),e.jsx(n.td,{children:"yes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Reorder, replace or omit parts"}),e.jsx(n.td,{children:"no"}),e.jsx(n.td,{children:"yes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Capabilities"}),e.jsx(n.td,{children:"identical"}),e.jsx(n.td,{children:"identical"})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsxs(n.strong,{children:["Use ",e.jsx(n.code,{children:"DataTable"})]})," unless one of these is true:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"a toolbar, header or side panel outside the table needs to read its state;"}),`
`,e.jsx(n.li,{children:"you need to drive the table from elsewhere (a saved view, a URL, another control);"}),`
`,e.jsx(n.li,{children:"you need to replace a part, or leave one out;"}),`
`,e.jsx(n.li,{children:"you want the toolbar somewhere other than above the table."}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsxs(n.strong,{children:["Then use ",e.jsx(n.code,{children:"DataGrid"})]}),", and see its ",e.jsx(n.code,{children:"ConsumerOwnedState"}),` story — that one story is the
entire reason this API exists.`]}),`
`,e.jsx(n.h2,{id:"reading-the-stories",children:"Reading the stories"}),`
`,e.jsxs(n.p,{children:[`Because the two share an engine, several stories necessarily look alike. What each
set is `,e.jsx(n.em,{children:"for"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"Components/DataTable"})}),` — the preset. Props in, table out. This is where
capabilities are demonstrated: selection, column visibility, server pagination,
inline editing, the state variants.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"Components/DataGrid"})}),` — composition. How the parts assemble, and what becomes
possible once you hold the instance.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"Components/Table"})})," — the simple table. Nothing here is unique to it."]}),`
`]}),`
`,e.jsx(n.p,{children:`A story appearing in both places is showing the same behaviour through two APIs, not
two behaviours.`}),`
`,e.jsx(n.h2,{id:"tables-future",children:"Table’s future"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"Table"}),` shares no code with the other two. Every fix has to be made twice, and its
capabilities were deliberately ported to the grid so it could be retired — see the
`,e.jsx(n.code,{children:"capabilities ported from table.tsx"})," suite in ",e.jsx(n.code,{children:"data-grid-edges.test.tsx"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"It is now deprecated"}),` — since 0.7.0, removed after 0.8.0 (2026-12-23). The last
capability it had that the grid lacked was an opening sort, now `,e.jsx(n.code,{children:"initialSorting"}),`, and as
of 2026-09-26 it has `,e.jsx(n.strong,{children:"zero consumers"}),`: the four app surfaces and the Figma Code Connect
mapping all point at `,e.jsx(n.code,{children:"DataTable"}),"."]}),`
`,e.jsxs(n.p,{children:["It is not deleted yet, deliberately. ",e.jsx(n.code,{children:"Table"}),` has been a published export since 0.6.0 while
its deprecation reads `,e.jsx(n.em,{children:'"since 0.7.0"'}),` — a version that has never shipped — so no consumer
has actually been warned. Removing it now would break an API nobody was told about. It
goes when 0.7.0 has carried the warning and 0.8.0 arrives.`]}),`
`,e.jsx(n.h3,{id:"the-markup-primitives",children:"The markup primitives"}),`
`,e.jsxs(n.p,{children:["The tier ",e.jsx(n.code,{children:"Table"})," was pretending to be. ",e.jsx(n.code,{children:"TableHeader"}),", ",e.jsx(n.code,{children:"TableBody"}),", ",e.jsx(n.code,{children:"TableFooter"}),`,
`,e.jsx(n.code,{children:"TableRow"}),", ",e.jsx(n.code,{children:"TableHead"}),", ",e.jsx(n.code,{children:"TableCell"})," and ",e.jsx(n.code,{children:"TableCaption"})," are exported now; the ",e.jsx(n.code,{children:"Table"}),` root
itself joins them when the legacy engine is removed, because it currently owns that name.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<table>
  <TableHeader>
    <TableRow><TableHead>Policy</TableHead><TableHead>Premium</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Commercial Auto</TableCell><TableCell>$12,400</TableCell></TableRow>
  </TableBody>
</table>
`})}),`
`,e.jsxs(n.p,{children:[`They carry this system's styling and nothing else — no state, no sorting, no pagination.
`,e.jsx(n.code,{children:"DataGrid"}),` is their first consumer, which is what keeps them honest: header height, cell
padding and the type scale are defined there once rather than restated in the grid.`]}),`
`,e.jsxs(n.p,{children:["The evidence that this was overdue: the ambiguous ",e.jsx(n.code,{children:'aria-label="Select all rows"'}),` and the
positional `,e.jsx(n.code,{children:"Select row N"})," were both fixed on the grid, and both still sit in ",e.jsx(n.code,{children:"table.tsx"}),`,
because nothing connects the two implementations. It also has zero tests, against roughly
ninety on the grid.`]}),`
`,e.jsx(n.p,{children:"Migrating:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:e.jsx(n.code,{children:"Table"})}),e.jsx(n.th,{children:e.jsx(n.code,{children:"DataTable"})})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:'variant="bordered"'})}),e.jsxs(n.td,{children:["the default — ",e.jsx(n.code,{children:"DataGridContainer"})," draws it"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:'variant="borderless"'})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"<DataGridContainer border={false}>"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:'variant="striped"'})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"striped"})})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:'variant="compact"'})," / ",e.jsx(n.code,{children:"size"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:'defaultDensity="compact"'})})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:"defaultSortColumn"})," + ",e.jsx(n.code,{children:"defaultSortDirection"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"initialSorting={[{ id, desc }]}"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"emptyMessage"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"emptyState"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onRowSelect"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"enableRowSelection"})," + ",e.jsx(n.code,{children:"onSelectionChange"})]})]})]})]}),`
`,e.jsxs(n.p,{children:["Two props do ",e.jsx(n.strong,{children:"not"})," carry over, deliberately: ",e.jsx(n.code,{children:"hoverable={false}"}),` (a row you can interact
with should say so) and `,e.jsx(n.code,{children:"onSort"})," (with ",e.jsx(n.code,{children:"DataGrid"}),` you hold the instance and can read
sorting directly, which is strictly more capable than a callback).`]}),`
`,e.jsx(n.h2,{id:"when-not-to-use-a-table-at-all",children:"When not to use a table at all"}),`
`,e.jsx(n.p,{children:`Tables exist so people can compare the same attributes across many records. If that
is not the task, something else is usually better:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"one record at a time → a detail view;"}),`
`,e.jsx(n.li,{children:"few comparable attributes → a list or cards;"}),`
`,e.jsx(n.li,{children:"hierarchy matters more than comparison → a tree;"}),`
`,e.jsx(n.li,{children:"trend matters more than values → a chart."}),`
`]})]})}function l(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{l as default};
