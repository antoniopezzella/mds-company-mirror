import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t,s as n}from"./blocks-GA0YWl98.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";function o(e){return Object.entries(c).filter(([,t])=>t===e).map(([e])=>e).sort()}var s,c,l;function u(){return(u=e((()=>{s={atom:{test:`Renders no other MDS component. Decomposing it further would leave no meaningful UI.`,role:`The smallest styled surface. Always safe to place anywhere.`},molecule:{test:`Composes atoms into one unit with a single purpose, but owns no page-level or server state.`,role:`The level most feature code should reach for first.`},organism:{test:`Owns behaviour or state of its own (selection, pagination, open/close, portals), or occupies a whole region of a page.`,role:`A self-contained section. Expect props for data in and events out.`},template:{test:`Provides page structure and slots only. Contains no business data and no domain vocabulary.`,role:`The scaffold a page is poured into. Layout decisions live here, not in the page.`}},c={"aspect-ratio":`atom`,avatar:`atom`,badge:`atom`,"badge-anchor":`atom`,button:`atom`,checkbox:`atom`,chip:`atom`,"filter-chip":`molecule`,"filter-controls":`molecule`,"filter-field-control":`molecule`,filters:`organism`,icon:`atom`,"image-with-fallback":`atom`,input:`atom`,label:`atom`,marker:`atom`,progress:`atom`,"scroll-area":`atom`,separator:`atom`,skeleton:`atom`,slider:`atom`,sparkline:`atom`,spinner:`atom`,switch:`atom`,textarea:`atom`,toggle:`atom`,stack:`atom`,accordion:`molecule`,alert:`molecule`,attachment:`molecule`,breadcrumbs:`molecule`,bubble:`molecule`,"button-group":`molecule`,card:`molecule`,collapsible:`molecule`,"data-state":`molecule`,"error-state":`molecule`,combobox:`molecule`,empty:`molecule`,field:`molecule`,"filter-bar":`organism`,"hover-card":`molecule`,"input-group":`molecule`,"input-otp":`molecule`,list:`molecule`,"metric-card":`molecule`,pagination:`molecule`,popover:`molecule`,"radio-group":`molecule`,select:`molecule`,"stat-card":`molecule`,"status-card":`molecule`,stepper:`molecule`,tabs:`molecule`,"text-field":`molecule`,toast:`molecule`,"toggle-group":`molecule`,tooltip:`molecule`,calendar:`organism`,carousel:`organism`,chart:`organism`,command:`organism`,"context-menu":`organism`,"data-table":`organism`,"data-grid":`organism`,"data-grid-cell-edit":`atom`,"data-grid-pagination":`organism`,"data-grid-rows":`molecule`,"data-grid-bulk-actions":`molecule`,"data-grid-row-actions":`molecule`,"data-grid-selection":`molecule`,"data-grid-table":`organism`,"data-grid-toolbar":`organism`,"data-table-date-filter":`organism`,"data-table-faceted-filter":`organism`,"data-table-sort-list":`organism`,"date-picker":`organism`,dialog:`organism`,drawer:`organism`,"dropdown-menu":`organism`,header:`organism`,"mega-menu":`organism`,menubar:`organism`,message:`organism`,"message-scroller":`organism`,"notifications-drawer":`organism`,questionnaire:`organism`,resizable:`organism`,sheet:`organism`,"side-navigation":`organism`,table:`organism`,"table-primitives":`atom`,toaster:`organism`,"website-header":`organism`,"page-shell":`template`},l={card:`Could be an atom — it is a styled box. Molecule because CardHeader/CardTitle/CardContent are a compositional unit, not one surface.`,calendar:`Could be a molecule. Organism because it owns month/range/selection state and keyboard navigation.`,"date-picker":`Organism rather than molecule because it portals a Popover and owns open/close plus the Calendar's state.`,tooltip:`Molecule despite portalling, because it holds no state a consumer reads or controls.`,"scroll-area":`Atom despite wrapping children — it adds a scroll surface, not composition.`,table:"Organism, not molecule: `table.tsx` holds five pieces of internal state (sort, selection, pagination, ...).","radio-group":`Molecule: the group plus its items is the unit; neither half is useful alone.`}})))()}function d(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...a(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(n,{title:`Foundations/Composition`}),`
`,`
`,(0,p.jsx)(t.h1,{id:`composition`,children:`Composition`}),`
`,(0,p.jsx)(t.p,{children:`How the 75 component modules fit together, and which one to reach for.`}),`
`,(0,p.jsx)(t.h2,{id:`do-not-build-a-new-component`,children:`Do not build a new component`}),`
`,(0,p.jsxs)(t.p,{children:[`The most common failure here is not bad code — it is building the 76th thing
that already existed as a prop on the 9th. Work down this ladder and `,(0,p.jsx)(t.strong,{children:`stop at
the first step that works`}),`:`]}),`
`,(0,p.jsxs)(t.ol,{children:[`
`,(0,p.jsxs)(t.li,{children:[(0,p.jsx)(t.strong,{children:`Does it exist?`}),` Check the tiers below, or browse `,(0,p.jsx)(t.code,{children:`/design-system`}),`.`]}),`
`,(0,p.jsxs)(t.li,{children:[(0,p.jsx)(t.strong,{children:`Does a prop cover it?`}),` A new `,(0,p.jsx)(t.code,{children:`variant`}),`, `,(0,p.jsx)(t.code,{children:`tone`}),` or `,(0,p.jsx)(t.code,{children:`size`}),` value is far
cheaper than a new component. Read the component's stories before deciding
the prop isn't there — the stories are the API documentation.`]}),`
`,(0,p.jsxs)(t.li,{children:[(0,p.jsx)(t.strong,{children:`Can you compose it?`}),` `,(0,p.jsx)(t.code,{children:`Card`}),` + `,(0,p.jsx)(t.code,{children:`Inline`}),` + `,(0,p.jsx)(t.code,{children:`Button`}),` covers most "new"
patterns with no new component code.`]}),`
`,(0,p.jsx)(t.li,{children:(0,p.jsx)(t.strong,{children:`Only then build one.`})}),`
`]}),`
`,(0,p.jsx)(t.h2,{id:`the-four-tiers`,children:`The four tiers`}),`
`,(0,p.jsxs)(t.p,{children:[`Classification lives in `,(0,p.jsx)(t.code,{children:`src/components/ui/taxonomy.ts`}),` — `,(0,p.jsx)(t.strong,{children:`not`}),` in the folder
structure. Files stay flat in `,(0,p.jsx)(t.code,{children:`src/components/ui/`}),`, the way shadcn/ui, Radix,
MUI and Polaris all do it, because the atom/molecule boundary is genuinely
contested and baking a contested answer into import paths buys nothing: what
you need is to `,(0,p.jsx)(t.em,{children:`know`}),` that `,(0,p.jsx)(t.code,{children:`DataTable`}),` is an organism, not to find it at a
particular path.`]}),`
`,(0,p.jsx)(`div`,{style:{display:`grid`,gap:16,margin:`24px 0`},children:Object.entries(s).map(([e,t])=>(0,p.jsxs)(`div`,{style:{border:`1px solid var(--mds-border, #dadada)`,borderRadius:2,padding:16},children:[(0,p.jsxs)(`div`,{style:{display:`flex`,alignItems:`baseline`,gap:12,marginBottom:8},children:[(0,p.jsx)(`strong`,{style:{fontSize:16,textTransform:`capitalize`},children:e}),(0,p.jsxs)(`span`,{style:{fontSize:12,opacity:.6},children:[o(e).length,` modules`]})]}),(0,p.jsxs)(`p`,{style:{margin:`0 0 6px`,fontSize:14},children:[(0,p.jsx)(`strong`,{children:`Test:`}),` `,t.test]}),(0,p.jsx)(`p`,{style:{margin:0,fontSize:14,opacity:.8},children:t.role}),(0,p.jsx)(`p`,{style:{margin:`10px 0 0`,fontSize:13,fontFamily:`ui-monospace, monospace`,opacity:.75},children:o(e).join(` · `)})]},e))}),`
`,(0,p.jsxs)(t.p,{children:[`A module may export several components, and they share its tier — `,(0,p.jsx)(t.code,{children:`stack`}),`
exports both `,(0,p.jsx)(t.code,{children:`Stack`}),` and `,(0,p.jsx)(t.code,{children:`Inline`}),`; `,(0,p.jsx)(t.code,{children:`page-shell`}),` exports `,(0,p.jsx)(t.code,{children:`PageShell`}),` and
`,(0,p.jsx)(t.code,{children:`PageHeading`}),`.`]}),`
`,(0,p.jsxs)(t.p,{children:[(0,p.jsx)(t.strong,{children:`Start at molecule.`}),` Most feature code should live there. Drop to atoms only
when you need one styled surface; reach for an organism when you need data in
and events out.`]}),`
`,(0,p.jsx)(t.h2,{id:`contested-calls`,children:`Contested calls`}),`
`,(0,p.jsx)(t.p,{children:`These were genuinely arguable. The reasoning is recorded so nobody
relitigates them from scratch — and so that disagreeing means editing one
file, not one hundred.`}),`
`,(0,p.jsxs)(`table`,{children:[(0,p.jsx)(`thead`,{children:(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{style:{textAlign:`left`},children:`Module`}),(0,p.jsx)(`th`,{style:{textAlign:`left`},children:`Tier`}),(0,p.jsx)(`th`,{style:{textAlign:`left`},children:`Why`})]})}),(0,p.jsx)(`tbody`,{children:Object.entries(l).map(([e,t])=>(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{style:{fontFamily:`ui-monospace, monospace`,whiteSpace:`nowrap`,verticalAlign:`top`},children:e}),(0,p.jsx)(`td`,{style:{verticalAlign:`top`},children:c[e]}),(0,p.jsx)(`td`,{style:{verticalAlign:`top`},children:t})]},e))})]}),`
`,(0,p.jsx)(t.h2,{id:`building-a-page`,children:`Building a page`}),`
`,(0,p.jsx)(t.p,{children:`Start from the template — do not hand-roll the frame:`}),`
`,(0,p.jsx)(t.pre,{children:(0,p.jsx)(t.code,{className:`language-tsx`,children:`import { PageShell, PageHeading, Stack, Button } from '@/components/ui';

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
`,(0,p.jsxs)(t.p,{children:[(0,p.jsx)(t.code,{children:`PageShell`}),` exists because the scaffold is easy to get subtly wrong. The
sidebar is `,(0,p.jsx)(t.code,{children:`fixed`}),` with a scrim below `,(0,p.jsx)(t.code,{children:`lg`}),` and `,(0,p.jsx)(t.code,{children:`static`}),` above it, and there is
a `,(0,p.jsx)(t.code,{children:`min-w-0`}),` chain that must run down `,(0,p.jsx)(t.strong,{children:`every`}),` flex ancestor between the page
and a wide table — a flex item defaults to `,(0,p.jsx)(t.code,{children:`min-width: auto`}),` and refuses to
shrink below its content, so one missing link makes the whole page scroll
sideways. It presents as a table bug and isn't one.`]}),`
`,(0,p.jsx)(t.h2,{id:`choosing-a-layout-tool`,children:`Choosing a layout tool`}),`
`,(0,p.jsxs)(t.table,{children:[(0,p.jsx)(t.thead,{children:(0,p.jsxs)(t.tr,{children:[(0,p.jsx)(t.th,{children:`Situation`}),(0,p.jsx)(t.th,{children:`Use`})]})}),(0,p.jsxs)(t.tbody,{children:[(0,p.jsxs)(t.tr,{children:[(0,p.jsx)(t.td,{children:`Children in one direction, even spacing`}),(0,p.jsxs)(t.td,{children:[(0,p.jsx)(t.code,{children:`<Stack>`}),` / `,(0,p.jsx)(t.code,{children:`<Inline>`})]})]}),(0,p.jsxs)(t.tr,{children:[(0,p.jsx)(t.td,{children:`Two-dimensional — reflowing columns, spans, ordering`}),(0,p.jsxs)(t.td,{children:[`Grid utilities — see `,(0,p.jsx)(t.strong,{children:`Foundations → Grid`})]})]}),(0,p.jsxs)(t.tr,{children:[(0,p.jsx)(t.td,{children:`The page frame`}),(0,p.jsx)(t.td,{children:(0,p.jsx)(t.code,{children:`<PageShell>`})})]})]})]}),`
`,(0,p.jsxs)(t.p,{children:[(0,p.jsx)(t.code,{children:`Stack`}),` and `,(0,p.jsx)(t.code,{children:`Inline`}),` take the spacing scale as a `,(0,p.jsx)(t.strong,{children:`type`}),`: `,(0,p.jsx)(t.code,{children:`gap={7}`}),` (28px,
off-scale) is a compile error, where `,(0,p.jsx)(t.code,{children:`className="gap-7"`}),` compiles happily and
is quietly 4px wrong. Spacing rules and the CI gate that enforces them are in
`,(0,p.jsx)(t.strong,{children:`Foundations → Spacing`}),`.`]}),`
`,(0,p.jsx)(t.h2,{id:`adding-a-component`,children:`Adding a component`}),`
`,(0,p.jsxs)(t.p,{children:[(0,p.jsx)(t.code,{children:`taxonomy.test.ts`}),` fails if a module on disk is unclassified, so a new
component means a new taxonomy entry. Also required: a `,(0,p.jsx)(t.code,{children:`.stories.tsx`}),` covering
every variant, a `,(0,p.jsx)(t.code,{children:`.test.tsx`}),`, and a passing `,(0,p.jsx)(t.code,{children:`npm run composition:check:strict`}),`
and `,(0,p.jsx)(t.code,{children:`npm run roles:check`}),`.`]}),`
`,(0,p.jsxs)(t.p,{children:[`Full checklist: the `,(0,p.jsx)(t.code,{children:`composition`}),` skill in `,(0,p.jsx)(t.code,{children:`.claude/skills/composition/`}),`.`]})]})}function f(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;function m(){return(m=e((()=>{p=r(),i(),t(),u()})))()}m();export{f as default};