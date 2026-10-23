import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./badge-BJRi19uA.js";import{i as o,n as s,r as c,t as l}from"./header-BY-aah5f.js";import{i as u,n as d,r as f,t as p}from"./side-navigation-C5_t79DI.js";import{n as m,t as h}from"./file-text-CBw0Jc0o.js";import{n as g,t as _}from"./stat-card-D5mE16X2.js";import{n as v,t as y}from"./users-kQ72Zrch.js";import{n as b,t as x}from"./button-DatWLSj0.js";import{n as S,t as C}from"./error-state-D4Yg2Y8I.js";import{l as w,n as T,r as E}from"./format-D3bAQugU.js";import{r as ee,t as D}from"./data-table-BKV54IPo.js";import{n as O,t as k}from"./format-context-BU5PRoLj.js";import{n as A,r as j}from"./stack-BlYcYnw2.js";import{n as M,r as N,t as P}from"./page-shell-DbkBo_3K.js";var F,I,L,R;function z(){return(z=t((()=>{o(),m(),u(),v(),F=r(),I=[{label:`Overview`,icon:(0,F.jsx)(f,{className:`size-4`}),path:`#`,active:!0},{label:`Policies`,icon:(0,F.jsx)(h,{className:`size-4`}),path:`#`},{label:`Clients`,icon:(0,F.jsx)(c,{className:`size-4`}),path:`#`},{label:`Teams`,icon:(0,F.jsx)(y,{className:`size-4`}),path:`#`}],L=[{label:`Gross written premium`,value:482e5,format:`currency`,delta:8.2,formatOptions:{decimals:0}},{label:`Active policies`,value:1284,format:`number`,delta:2.1},{label:`Renewal rate`,value:91.4,format:`percent`,delta:-.6},{label:`Clients`,value:317,format:`number`,delta:4.4}],R=[{id:`1`,reference:`MP-104882`,client:`Centrica Us Holdings Inc.`,line:`Property`,premium:124e4,renewal:`2027-01-15`},{id:`2`,reference:`MP-104901`,client:`Cleco Corporate Holdings Llc`,line:`Casualty`,premium:880500,renewal:`2026-11-30`},{id:`3`,reference:`MP-105012`,client:`FMC Corporation`,line:`Marine`,premium:211e4,renewal:`2027-03-01`},{id:`4`,reference:`MP-105044`,client:`Hilton International Co.`,line:`Property`,premium:64e4,renewal:`2026-12-12`},{id:`5`,reference:`MP-105118`,client:`Ingersoll-Rand Company`,line:`Cyber`,premium:415750,renewal:`2027-02-20`},{id:`6`,reference:`MP-105203`,client:`Kellanova Operating Co.`,line:`Casualty`,premium:1905e3,renewal:`2027-04-08`},{id:`7`,reference:`MP-105277`,client:`Nordson Corporation`,line:`Property`,premium:730250,renewal:`2026-10-29`},{id:`8`,reference:`MP-105341`,client:`Quanta Services Inc.`,line:`Construction`,premium:348e4,renewal:`2027-05-17`},{id:`9`,reference:`MP-105399`,client:`Rockwell Automation Inc.`,line:`Cyber`,premium:522e3,renewal:`2027-01-31`},{id:`10`,reference:`MP-105460`,client:`Trane Technologies Company Llc`,line:`Marine`,premium:1067400,renewal:`2026-12-03`},{id:`11`,reference:`MP-105512`,client:`Vulcan Construction Materials Llc`,line:`Construction`,premium:2240900,renewal:`2027-06-22`},{id:`12`,reference:`MP-105588`,client:`Stanley Black & Decker Inc.`,line:`Property`,premium:955e3,renewal:`2027-02-09`}]})))()}function B({locale:e=`en-US`,currency:t=`USD`,loading:n=!1,error:r=null,onRetry:i}){let[a,o]=V.useState(!1);return(0,H.jsx)(k,{locale:e,currency:t,children:(0,H.jsxs)(M,{header:(0,H.jsx)(l,{sidebarOpen:a,onToggleSidebar:()=>o(e=>!e)}),sidebar:(0,H.jsx)(p,{items:I,className:`fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto`}),sidebarOpen:a,onSidebarClose:()=>o(!1),children:[(0,H.jsx)(P,{title:`Portfolio overview`,description:`Policies, premium and upcoming renewals across your book.`,actions:(0,H.jsx)(x,{variant:`primary`,children:`New policy`})}),(0,H.jsxs)(A,{gap:6,children:[(0,H.jsxs)(`section`,{children:[(0,H.jsx)(`h2`,{className:`sr-only`,children:`Key metrics`}),(0,H.jsx)(`div`,{className:`grid gap-4 sm:grid-cols-2 lg:grid-cols-4`,children:L.map(e=>(0,H.jsx)(_,{label:e.label,value:e.value,format:e.format,formatOptions:e.formatOptions,delta:e.delta,deltaFormat:`percent`,loading:n},e.label))})]}),(0,H.jsxs)(`section`,{children:[(0,H.jsx)(`h2`,{className:`sr-only`,children:`Policies`}),r?(0,H.jsx)(C,{title:`Could not load policies`,description:r.message,onRetry:i}):(0,H.jsx)(D,{columns:U,data:R,loading:n,searchKey:`client`,searchPlaceholder:`Search by client…`,pageSize:10,enableExport:!0,exportFilename:`policies`})]})]})]})})}var V,H,U;function W(){return(W=t((()=>{V=e(n(),1),i(),b(),ee(),S(),s(),N(),d(),j(),g(),w(),O(),z(),H=r(),U=[{accessorKey:`reference`,header:`Policy`},{accessorKey:`client`,header:`Client`},{accessorKey:`line`,header:`Line of business`,cell:({row:e})=>(0,H.jsx)(a,{tone:`info`,variant:`soft`,size:`sm`,children:e.original.line})},{accessorKey:`premium`,header:`Premium`,meta:{type:`currency`},cell:({row:e})=>T(e.original.premium,{decimals:0})},{accessorKey:`renewal`,header:`Renewal`,meta:{type:`date`},cell:({row:e})=>E(e.original.renewal)}],B.__docgenInfo={description:``,methods:[],displayName:`MarshDashboard`,props:{locale:{required:!1,tsType:{name:`string`},description:"BCP-47 locale for every formatted value. Defaults to `en-US`.",defaultValue:{value:`'en-US'`,computed:!1}},currency:{required:!1,tsType:{name:`string`},description:"ISO 4217 currency for every money value. Defaults to `USD`.",defaultValue:{value:`'USD'`,computed:!1}},loading:{required:!1,tsType:{name:`boolean`},description:`Swap for your own fetch state.`,defaultValue:{value:`false`,computed:!1}},error:{required:!1,tsType:{name:`union`,raw:`Error | null`,elements:[{name:`Error`},{name:`null`}]},description:`Non-null renders the error state in place of the table.`,defaultValue:{value:`null`,computed:!1}},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{W(),{expect:G,within:K}=__STORYBOOK_MODULE_TEST__,q={title:`Blocks/Marsh Dashboard`,component:B,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:'A **block**, not a component: a whole working dashboard page you copy into your\nproject and edit. Install with `npx shadcn add marsh-dashboard`, replace `./data`,\nand it is yours — nothing is imported from a package at runtime.\n\nIt exists because two Marsh dashboards were built independently and each produced\nits own page frame. Neither was wrong; the absence of a "start here" was.\n\n### What it encodes so you do not rediscover it\n\n- **The heading ladder.** `PageHeading` renders `<h1>` and `StatCard` renders `<h3>`\n  with no way to change it, so a KPI grid placed directly under the page title skips\n  `<h2>` and fails axe `heading-order` — which breaks the build. The `<section>` with\n  a visually hidden `<h2>` is the fix.\n- **The sidebar contract.** Fixed + scrim below `lg`, static above. `PageShell` owns\n  it, but only if you pass `sidebarOpen`/`onSidebarClose`.\n- **Ambient formatting.** `FormatProvider` declares locale and currency once;\n  `StatCard` reads it via `format="currency"` instead of hand-building strings.\n- **Four states, not one.** A failed fetch renders `DataError`, not an empty table.'}}}},J={play:async({canvasElement:e})=>{let t=K(e);await G(t.getByRole(`heading`,{level:1})).toHaveTextContent(`Portfolio overview`),await G(t.getAllByRole(`heading`,{level:2}).length).toBeGreaterThanOrEqual(2),await G(await t.findByText(`$48,200,000`)).toBeInTheDocument(),await G(t.getByText(`91.4%`)).toBeInTheDocument(),await G(t.getByText(`1,284`)).toBeInTheDocument(),await G(t.getByText(/\+8%/)).toBeInTheDocument(),await G(t.getByText(/-0\.6%/)).toBeInTheDocument(),await G(t.getByText(`$1,240,000`)).toBeInTheDocument(),await G(t.queryByText(`2027-01-15`)).not.toBeInTheDocument()}},Y={args:{locale:`de-DE`,currency:`EUR`},play:async({canvasElement:e})=>{let t=K(e);await G(await t.findByText(/48\.200\.000/)).toBeInTheDocument(),await G(t.queryByText(`$48,200,000`)).not.toBeInTheDocument()}},X={args:{loading:!0}},Z={args:{error:Error(`The policy service did not respond.`)},play:async({canvasElement:e})=>{let t=K(e);await G(await t.findByText(`Could not load policies`)).toBeInTheDocument(),await G(t.getByText(/did not respond/)).toBeInTheDocument(),await G(t.queryByRole(`table`)).not.toBeInTheDocument()}},Q=[`Default`,`DifferentLocale`,`Loading`,`LoadFailed`],J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // The heading ladder this block exists to get right: exactly one h1, and
    // an h2 above the StatCards' h3s. axe checks the order; this checks the
    // structure is the intended one rather than accidentally valid.
    await expect(canvas.getByRole('heading', {
      level: 1
    })).toHaveTextContent('Portfolio overview');
    await expect(canvas.getAllByRole('heading', {
      level: 2
    }).length).toBeGreaterThanOrEqual(2);

    // ASSERT THE RENDERED STRINGS, not a substring.
    //
    // The first version of this story matched /\\$48,200,000|\\$48\\.2M/ and
    // nothing else. It passed while the renewal rate rendered \`0.9%\` instead of
    // \`91.4%\` and three of four deltas rendered \`0.0%\`, because \`data.tsx\`
    // supplied ratios to a formatter that takes percentages. A substring
    // assertion cannot see a format — that is the whole lesson.
    await expect(await canvas.findByText('$48,200,000')).toBeInTheDocument();
    await expect(canvas.getByText('91.4%')).toBeInTheDocument();
    await expect(canvas.getByText('1,284')).toBeInTheDocument();

    // Deltas, including the negative one that previously lost its sign.
    //
    // GWP renders \`+8%\`, not \`+8.2%\`: \`StatCard\` passes ONE \`formatOptions\`
    // to both the value and the delta (\`stat-card.tsx:199\` → \`formatDelta\`),
    // so the \`decimals: 0\` that drops \`.00\` from the headline also rounds the
    // delta. Worth knowing before you copy this.
    await expect(canvas.getByText(/\\+8%/)).toBeInTheDocument();
    await expect(canvas.getByText(/-0\\.6%/)).toBeInTheDocument();

    // The table formats too — a raw ISO date here is the regression to catch.
    await expect(canvas.getByText('$1,240,000')).toBeInTheDocument();
    await expect(canvas.queryByText('2027-01-15')).not.toBeInTheDocument();
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    locale: 'de-DE',
    currency: 'EUR'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText(/48\\.200\\.000/)).toBeInTheDocument();
    await expect(canvas.queryByText('$48,200,000')).not.toBeInTheDocument();
  }
}`,...Y.parameters?.docs?.source},description:{story:"The provider is not decoration. Changing `locale`/`currency` re-renders every\nformatted value — this story is what stops the provider being reinstated as a\nno-op that passes its own test.",...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...X.parameters?.docs?.source},description:{story:`Every surface in a loading state at once — skeletons, not a spinner.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    error: new Error('The policy service did not respond.')
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Could not load policies')).toBeInTheDocument();
    await expect(canvas.getByText(/did not respond/)).toBeInTheDocument();
    // The table is gone, not empty.
    await expect(canvas.queryByRole('table')).not.toBeInTheDocument();
  }
}`,...Z.parameters?.docs?.source},description:{story:`A failed fetch. The distinction this makes is the point: an empty result and
a failed request are different things, and a table that renders "no rows"
for both hides the error.`,...Z.parameters?.docs?.description}}}})))()}$();export{J as Default,Y as DifferentLocale,Z as LoadFailed,X as Loading,Q as __namedExportsOrder,q as default};