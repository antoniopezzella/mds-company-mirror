import{ar as l,Z as e,c}from"./iframe-CPBTUrEW.js";import"./preload-helper-PPVm8Dsz.js";const d={atom:{test:"Renders no other MDS component. Decomposing it further would leave no meaningful UI.",role:"The smallest styled surface. Always safe to place anywhere."},molecule:{test:"Composes atoms into one unit with a single purpose, but owns no page-level or server state.",role:"The level most feature code should reach for first."},organism:{test:"Owns behaviour or state of its own (selection, pagination, open/close, portals), or occupies a whole region of a page.",role:"A self-contained section. Expect props for data in and events out."},template:{test:"Provides page structure and slots only. Contains no business data and no domain vocabulary.",role:"The scaffold a page is poured into. Layout decisions live here, not in the page."}},r={"aspect-ratio":"atom",avatar:"atom",badge:"atom","badge-anchor":"atom",button:"atom",checkbox:"atom",chip:"atom","filter-chip":"molecule","filter-controls":"molecule","filter-field-control":"molecule",filters:"organism",icon:"atom","image-with-fallback":"atom",input:"atom",label:"atom",marker:"atom",progress:"atom","scroll-area":"atom",separator:"atom",skeleton:"atom",slider:"atom",sparkline:"atom",spinner:"atom",switch:"atom",textarea:"atom",toggle:"atom",stack:"atom",accordion:"molecule",alert:"molecule",attachment:"molecule",breadcrumbs:"molecule",bubble:"molecule","button-group":"molecule",card:"molecule",collapsible:"molecule","data-state":"molecule","error-state":"molecule",combobox:"molecule",empty:"molecule",field:"molecule","filter-bar":"organism","hover-card":"molecule","input-group":"molecule","input-otp":"molecule",list:"molecule","metric-card":"molecule",pagination:"molecule",popover:"molecule","radio-group":"molecule",select:"molecule","stat-card":"molecule","status-card":"molecule",stepper:"molecule",tabs:"molecule","text-field":"molecule",toast:"molecule","toggle-group":"molecule",tooltip:"molecule",calendar:"organism",carousel:"organism",chart:"organism",command:"organism","context-menu":"organism","data-table":"organism","data-grid":"organism","data-grid-cell-edit":"atom","data-grid-pagination":"organism","data-grid-rows":"molecule","data-grid-bulk-actions":"molecule","data-grid-row-actions":"molecule","data-grid-selection":"molecule","data-grid-table":"organism","data-grid-toolbar":"organism","data-table-date-filter":"organism","data-table-faceted-filter":"organism","data-table-sort-list":"organism","date-picker":"organism",dialog:"organism",drawer:"organism","dropdown-menu":"organism",header:"organism","mega-menu":"organism",menubar:"organism",message:"organism","message-scroller":"organism","notifications-drawer":"organism",questionnaire:"organism",resizable:"organism",sheet:"organism","side-navigation":"organism",table:"organism","table-primitives":"atom",toaster:"organism","website-header":"organism","page-shell":"template"};function a(o){return Object.entries(r).filter(([,n])=>n===o).map(([n])=>n).sort()}const h={card:"Could be an atom — it is a styled box. Molecule because CardHeader/CardTitle/CardContent are a compositional unit, not one surface.",calendar:"Could be a molecule. Organism because it owns month/range/selection state and keyboard navigation.","date-picker":"Organism rather than molecule because it portals a Popover and owns open/close plus the Calendar's state.",tooltip:"Molecule despite portalling, because it holds no state a consumer reads or controls.","scroll-area":"Atom despite wrapping children — it adds a scroll surface, not composition.",table:"Organism, not molecule: `table.tsx` holds five pieces of internal state (sort, selection, pagination, ...).","radio-group":"Molecule: the group plus its items is the unit; neither half is useful alone."};function i(o){const n={code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...l(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Foundations/Composition"}),`
`,`
`,e.jsx(n.h1,{id:"composition",children:"Composition"}),`
`,e.jsx(n.p,{children:"How the 75 component modules fit together, and which one to reach for."}),`
`,e.jsx(n.h2,{id:"do-not-build-a-new-component",children:"Do not build a new component"}),`
`,e.jsxs(n.p,{children:[`The most common failure here is not bad code — it is building the 76th thing
that already existed as a prop on the 9th. Work down this ladder and `,e.jsx(n.strong,{children:`stop at
the first step that works`}),":"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Does it exist?"})," Check the tiers below, or browse ",e.jsx(n.code,{children:"/design-system"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Does a prop cover it?"})," A new ",e.jsx(n.code,{children:"variant"}),", ",e.jsx(n.code,{children:"tone"})," or ",e.jsx(n.code,{children:"size"}),` value is far
cheaper than a new component. Read the component's stories before deciding
the prop isn't there — the stories are the API documentation.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Can you compose it?"})," ",e.jsx(n.code,{children:"Card"})," + ",e.jsx(n.code,{children:"Inline"})," + ",e.jsx(n.code,{children:"Button"}),` covers most "new"
patterns with no new component code.`]}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Only then build one."})}),`
`]}),`
`,e.jsx(n.h2,{id:"the-four-tiers",children:"The four tiers"}),`
`,e.jsxs(n.p,{children:["Classification lives in ",e.jsx(n.code,{children:"src/components/ui/taxonomy.ts"})," — ",e.jsx(n.strong,{children:"not"}),` in the folder
structure. Files stay flat in `,e.jsx(n.code,{children:"src/components/ui/"}),`, the way shadcn/ui, Radix,
MUI and Polaris all do it, because the atom/molecule boundary is genuinely
contested and baking a contested answer into import paths buys nothing: what
you need is to `,e.jsx(n.em,{children:"know"})," that ",e.jsx(n.code,{children:"DataTable"}),` is an organism, not to find it at a
particular path.`]}),`
`,e.jsx("div",{style:{display:"grid",gap:16,margin:"24px 0"},children:Object.entries(d).map(([t,s])=>e.jsxs("div",{style:{border:"1px solid var(--mds-border, #dadada)",borderRadius:2,padding:16},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:12,marginBottom:8},children:[e.jsx("strong",{style:{fontSize:16,textTransform:"capitalize"},children:t}),e.jsxs("span",{style:{fontSize:12,opacity:.6},children:[a(t).length," modules"]})]}),e.jsxs("p",{style:{margin:"0 0 6px",fontSize:14},children:[e.jsx("strong",{children:"Test:"})," ",s.test]}),e.jsx("p",{style:{margin:0,fontSize:14,opacity:.8},children:s.role}),e.jsx("p",{style:{margin:"10px 0 0",fontSize:13,fontFamily:"ui-monospace, monospace",opacity:.75},children:a(t).join(" · ")})]},t))}),`
`,e.jsxs(n.p,{children:["A module may export several components, and they share its tier — ",e.jsx(n.code,{children:"stack"}),`
exports both `,e.jsx(n.code,{children:"Stack"})," and ",e.jsx(n.code,{children:"Inline"}),"; ",e.jsx(n.code,{children:"page-shell"})," exports ",e.jsx(n.code,{children:"PageShell"}),` and
`,e.jsx(n.code,{children:"PageHeading"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Start at molecule."}),` Most feature code should live there. Drop to atoms only
when you need one styled surface; reach for an organism when you need data in
and events out.`]}),`
`,e.jsx(n.h2,{id:"contested-calls",children:"Contested calls"}),`
`,e.jsx(n.p,{children:`These were genuinely arguable. The reasoning is recorded so nobody
relitigates them from scratch — and so that disagreeing means editing one
file, not one hundred.`}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{textAlign:"left"},children:"Module"}),e.jsx("th",{style:{textAlign:"left"},children:"Tier"}),e.jsx("th",{style:{textAlign:"left"},children:"Why"})]})}),e.jsx("tbody",{children:Object.entries(h).map(([t,s])=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontFamily:"ui-monospace, monospace",whiteSpace:"nowrap",verticalAlign:"top"},children:t}),e.jsx("td",{style:{verticalAlign:"top"},children:r[t]}),e.jsx("td",{style:{verticalAlign:"top"},children:s})]},t))})]}),`
`,e.jsx(n.h2,{id:"building-a-page",children:"Building a page"}),`
`,e.jsx(n.p,{children:"Start from the template — do not hand-roll the frame:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { PageShell, PageHeading, Stack, Button } from '@/components/ui';

<PageShell
  header={<Header sidebarOpen={open} onToggleSidebar={toggle} />}
  sidebar={<SideNavigation items={items} className="fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto" />}
  sidebarOpen={open}
  onSidebarClose={close}
>
  <PageHeading title="Overview" description="Your portfolio at a glance." actions={<Button>New claim</Button>} />
  <Stack gap={6}>
    {/* sections */}
  </Stack>
</PageShell>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"PageShell"}),` exists because the scaffold is easy to get subtly wrong. The
sidebar is `,e.jsx(n.code,{children:"fixed"})," with a scrim below ",e.jsx(n.code,{children:"lg"})," and ",e.jsx(n.code,{children:"static"}),` above it, and there is
a `,e.jsx(n.code,{children:"min-w-0"})," chain that must run down ",e.jsx(n.strong,{children:"every"}),` flex ancestor between the page
and a wide table — a flex item defaults to `,e.jsx(n.code,{children:"min-width: auto"}),` and refuses to
shrink below its content, so one missing link makes the whole page scroll
sideways. It presents as a table bug and isn't one.`]}),`
`,e.jsx(n.h2,{id:"choosing-a-layout-tool",children:"Choosing a layout tool"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Situation"}),e.jsx(n.th,{children:"Use"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Children in one direction, even spacing"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"<Stack>"})," / ",e.jsx(n.code,{children:"<Inline>"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Two-dimensional — reflowing columns, spans, ordering"}),e.jsxs(n.td,{children:["Grid utilities — see ",e.jsx(n.strong,{children:"Foundations → Grid"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"The page frame"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"<PageShell>"})})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"Stack"})," and ",e.jsx(n.code,{children:"Inline"})," take the spacing scale as a ",e.jsx(n.strong,{children:"type"}),": ",e.jsx(n.code,{children:"gap={7}"}),` (28px,
off-scale) is a compile error, where `,e.jsx(n.code,{children:'className="gap-7"'}),` compiles happily and
is quietly 4px wrong. Spacing rules and the CI gate that enforces them are in
`,e.jsx(n.strong,{children:"Foundations → Spacing"}),"."]}),`
`,e.jsx(n.h2,{id:"adding-a-component",children:"Adding a component"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"taxonomy.test.ts"}),` fails if a module on disk is unclassified, so a new
component means a new taxonomy entry. Also required: a `,e.jsx(n.code,{children:".stories.tsx"}),` covering
every variant, a `,e.jsx(n.code,{children:".test.tsx"}),", and a passing ",e.jsx(n.code,{children:"npm run composition:check:strict"}),`
and `,e.jsx(n.code,{children:"npm run roles:check"}),"."]}),`
`,e.jsxs(n.p,{children:["Full checklist: the ",e.jsx(n.code,{children:"composition"})," skill in ",e.jsx(n.code,{children:".claude/skills/composition/"}),"."]})]})}function g(o={}){const{wrapper:n}={...l(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(i,{...o})}):i(o)}export{g as default};
