import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{i,n as a}from"./roles-DNqHlq35.js";import{n as o,t as s}from"./chevron-down-CEFyREoU.js";import{n as c,t as l}from"./chevron-up-BdADd4z2.js";import{n as u,t as d}from"./triangle-alert-xZt0RFPN.js";import{n as f,t as p}from"./button-DatWLSj0.js";import{l as m,o as h,r as g,s as _,t as v}from"./sheet-CB8WOzxB.js";function y(e){return e.split(/(\$[\d,.]+[MKB]?|\b\d+\.?\d*\s*(?:km|m|K|M|B|locations?|insured|magnitude)?\b)/g).map((e,t)=>/^\$|^\d/.test(e)?(0,x.jsx)(`strong`,{children:e},t):e)}var b,x,S,C,w;function T(){return(T=t((()=>{b=e(n(),1),u(),o(),c(),a(),m(),x=r(),S=[{id:`1`,title:`Hurricane Milton`,severity:`warning`,description:`10 insured locations with total insured value $160M are in the forecast path of Hurricane Milton.`,area:`Butte County, Plumas County, CA...`,timeAgo:`2m ago`,unread:!0,actionRequired:!0,group:`Today`},{id:`2`,title:`Flood Watch`,severity:`watch`,description:`7 insured locations with total insured value $55M are in an active flood watch zone.`,area:`Butte County, Plumas County, CA...`,timeAgo:`23m ago`,unread:!0,actionRequired:!1,group:`Today`},{id:`3`,title:`Wildfire Advisory`,severity:`advisory`,description:`5 insured locations with total insured value $30M are near an active wildfire zone.`,area:`Butte County, Plumas County, CA...`,timeAgo:`32m ago`,unread:!0,actionRequired:!1,group:`Today`},{id:`4`,title:`Earthquake Magnitude 6.8`,severity:`warning`,description:`7 insured locations with total insured value $55M. Magnitude 6.8 at depth 15 km.`,area:`Butte County, Plumas County, CA...`,timeAgo:`44m ago`,unread:!0,actionRequired:!0,group:`Today`},{id:`5`,title:`POL-2024-006 Expired`,severity:`action`,description:`Retail Ventures LLC Business Interruption policy ($780K) expired on Dec 1, 2024. Renewal required immediately.`,area:`Miami-Dade County, FL`,timeAgo:`2h ago`,unread:!1,actionRequired:!0,group:`Today`},{id:`6`,title:`Severe Thunderstorm Watch`,severity:`watch`,description:`3 insured locations with total value $22M are under severe thunderstorm watch.`,area:`Harris County, TX`,timeAgo:`1d ago`,unread:!1,group:`Yesterday`},{id:`7`,title:`Hail Storm Advisory`,severity:`advisory`,description:`Hail up to 2" expected. 4 commercial property locations with value $18M at risk.`,area:`Dallas County, TX`,timeAgo:`1d ago`,unread:!1,group:`Yesterday`},{id:`8`,title:`Coastal Storm Surge Warning`,severity:`warning`,description:`2 marine cargo locations with value $12M are in coastal storm surge zone.`,area:`Galveston County, TX`,timeAgo:`2d ago`,unread:!1,actionRequired:!0,group:`This Week`}],C={warning:{label:`Warning`,fg:`fg.critical`,bg:`bg.critical.subtle`},watch:{label:`Watch`,fg:`fg.warning`,bg:`bg.warning.subtle`},advisory:{label:`Advisory`,fg:`fg.info`,bg:`bg.info.subtle`},action:{label:`Action Required`,fg:`interactive.primary`,bg:`bg.neutral.subtle`}},w=b.forwardRef(({open:e,onClose:t,notifications:n=S},r)=>{let[a,o]=b.useState(`unread`),[c,u]=b.useState({}),f=`var(--role-fg-primary)`,p=`var(--role-fg-neutral-subtle)`,m=`var(--role-border-default)`,w=`var(--role-interactive-primary)`,T=`var(--role-fg-on-interactive)`,E=n.filter(e=>e.unread).length,D=n.filter(e=>e.actionRequired).length,O=b.useMemo(()=>a===`unread`?n.filter(e=>e.unread):a===`action`?n.filter(e=>e.actionRequired):n,[a,n]),k=b.useMemo(()=>[`Today`,`Yesterday`,`This Week`].map(e=>({label:e,items:O.filter(t=>t.group===e)})).filter(e=>e.items.length>0),[O]),A=e=>u(t=>({...t,[e]:!t[e]}));return(0,x.jsx)(v,{open:e,onOpenChange:e=>!e&&t(),children:(0,x.jsxs)(g,{ref:r,side:`right`,className:`flex w-full flex-col gap-0 p-0 sm:max-w-[440px]`,children:[(0,x.jsx)(h,{className:`flex-row items-center justify-between px-6 pb-4 pt-6`,children:(0,x.jsx)(_,{className:`font-bold`,children:`Notifications`})}),(0,x.jsx)(`div`,{style:{borderTop:`1px solid ${m}`}}),(0,x.jsx)(`div`,{className:`flex gap-2 px-6 py-3.5`,children:[{key:`unread`,label:`Unread`,count:E},{key:`all`,label:`All`,count:n.length},{key:`action`,label:`Action Required`,count:D}].map(({key:e,label:t,count:n})=>{let r=a===e;return(0,x.jsxs)(`button`,{type:`button`,onClick:()=>o(e),className:`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium leading-none transition-colors`,style:{backgroundColor:r?w:`transparent`,color:r?T:f,borderColor:r?w:m},children:[t,(0,x.jsx)(`span`,{className:`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[11px] font-bold`,style:{backgroundColor:r?`color-mix(in srgb, currentColor 18%, transparent)`:`var(--role-bg-neutral-subtle)`,color:r?T:p},children:n})]},e)})}),(0,x.jsx)(`div`,{style:{borderTop:`1px solid ${m}`}}),(0,x.jsxs)(`div`,{className:`flex-1 overflow-y-auto px-4 pb-4 pt-2`,children:[k.map(({label:e,items:t})=>(0,x.jsxs)(`div`,{children:[(0,x.jsxs)(`button`,{type:`button`,onClick:()=>A(e),className:`flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left transition-colors`,style:{color:p},children:[(0,x.jsx)(`span`,{className:`text-[13px] font-semibold uppercase tracking-wider`,children:e}),c[e]?(0,x.jsx)(s,{className:`h-[18px] w-[18px]`}):(0,x.jsx)(l,{className:`h-[18px] w-[18px]`})]}),!c[e]&&(0,x.jsx)(`div`,{className:`flex flex-col gap-2 pb-2`,children:t.map(e=>{let t=C[e.severity];return(0,x.jsxs)(`div`,{className:`relative rounded-lg border p-3.5`,style:{borderColor:m,backgroundColor:e.unread?`var(--role-bg-neutral-subtle)`:`var(--role-bg-default)`},children:[(0,x.jsxs)(`div`,{className:`mb-1.5 flex items-start justify-between gap-2`,children:[(0,x.jsxs)(`div`,{className:`flex min-w-0 flex-1 items-center gap-2`,children:[(0,x.jsx)(d,{className:`h-5 w-5 shrink-0`,style:{color:`var(--role-fg-critical)`}}),(0,x.jsx)(`span`,{className:`text-sm font-bold leading-tight`,style:{color:f},children:e.title})]}),(0,x.jsxs)(`div`,{className:`flex shrink-0 items-center gap-2`,children:[(0,x.jsx)(`span`,{className:`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold`,style:{backgroundColor:i(t.bg),color:i(t.fg)},children:t.label}),e.unread&&(0,x.jsx)(`span`,{className:`h-2 w-2 shrink-0 rounded-full`,style:{backgroundColor:w}})]})]}),(0,x.jsx)(`p`,{className:`mb-1.5 text-[13px] leading-relaxed`,style:{color:f},children:y(e.description)}),(0,x.jsxs)(`p`,{className:`mb-2.5 text-xs`,style:{color:p},children:[`Area Affected: `,e.area]}),(0,x.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,x.jsx)(`button`,{type:`button`,className:`text-[13px] font-medium hover:underline`,style:{color:w},children:`View locations`}),(0,x.jsx)(`span`,{className:`text-[11px]`,style:{color:p},children:e.timeAgo})]})]},e.id)})})]},e)),k.length===0&&(0,x.jsx)(`div`,{className:`flex h-[200px] flex-col items-center justify-center`,style:{color:p},children:(0,x.jsx)(`p`,{className:`text-sm`,children:`No notifications`})})]})]})})}),w.displayName=`NotificationsDrawer`,w.__docgenInfo={description:`Forwards to the Sheet's content panel, so a consumer can focus or measure it once open.`,methods:[],displayName:`NotificationsDrawer`,props:{open:{required:!0,tsType:{name:`boolean`},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},notifications:{required:!1,tsType:{name:`Array`,elements:[{name:`RiskNotification`}],raw:`RiskNotification[]`},description:`Defaults to a built-in sample set of risk alerts — pass real data in any non-demo usage.`,defaultValue:{value:`[
  { id: '1', title: 'Hurricane Milton', severity: 'warning', description: '10 insured locations with total insured value $160M are in the forecast path of Hurricane Milton.', area: 'Butte County, Plumas County, CA...', timeAgo: '2m ago', unread: true, actionRequired: true, group: 'Today' },
  { id: '2', title: 'Flood Watch', severity: 'watch', description: '7 insured locations with total insured value $55M are in an active flood watch zone.', area: 'Butte County, Plumas County, CA...', timeAgo: '23m ago', unread: true, actionRequired: false, group: 'Today' },
  { id: '3', title: 'Wildfire Advisory', severity: 'advisory', description: '5 insured locations with total insured value $30M are near an active wildfire zone.', area: 'Butte County, Plumas County, CA...', timeAgo: '32m ago', unread: true, actionRequired: false, group: 'Today' },
  { id: '4', title: 'Earthquake Magnitude 6.8', severity: 'warning', description: '7 insured locations with total insured value $55M. Magnitude 6.8 at depth 15 km.', area: 'Butte County, Plumas County, CA...', timeAgo: '44m ago', unread: true, actionRequired: true, group: 'Today' },
  { id: '5', title: 'POL-2024-006 Expired', severity: 'action', description: 'Retail Ventures LLC Business Interruption policy ($780K) expired on Dec 1, 2024. Renewal required immediately.', area: 'Miami-Dade County, FL', timeAgo: '2h ago', unread: false, actionRequired: true, group: 'Today' },
  { id: '6', title: 'Severe Thunderstorm Watch', severity: 'watch', description: '3 insured locations with total value $22M are under severe thunderstorm watch.', area: 'Harris County, TX', timeAgo: '1d ago', unread: false, group: 'Yesterday' },
  { id: '7', title: 'Hail Storm Advisory', severity: 'advisory', description: 'Hail up to 2" expected. 4 commercial property locations with value $18M at risk.', area: 'Dallas County, TX', timeAgo: '1d ago', unread: false, group: 'Yesterday' },
  { id: '8', title: 'Coastal Storm Surge Warning', severity: 'warning', description: '2 marine cargo locations with value $12M are in coastal storm surge zone.', area: 'Galveston County, TX', timeAgo: '2d ago', unread: false, actionRequired: true, group: 'This Week' },
]`,computed:!1}}}}})))()}function E({notifications:e,startOpen:t=!0}){let[n,r]=D.useState(t);return(0,O.jsxs)(`div`,{style:{minHeight:480,padding:24},children:[(0,O.jsx)(p,{variant:`secondary`,size:`md`,onClick:()=>r(!0),children:`Open notifications`}),(0,O.jsx)(w,{open:n,onClose:()=>r(!1),notifications:e})]})}var D,O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=t((()=>{D=e(n(),1),T(),f(),O=r(),{expect:k,userEvent:A,within:j}=__STORYBOOK_MODULE_TEST__,M={title:`Components/NotificationsDrawer`,component:w,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:`A slide-over panel of risk notifications, grouped by recency (Today / Yesterday / This
Week) and filterable by Unread, All, or Action Required.

**Controlled.** It owns no open state — \`open\` in, \`onClose\` out — so the trigger can
live anywhere, typically the bell in \`Header\`. The filter tabs *are* internal state,
since nothing outside the panel needs them.

Numbers inside each description (dollar values, distances, location counts) are
emphasised automatically; the text is written as prose and the component highlights it.`}}},argTypes:{open:{description:`Whether the panel is showing. Controlled by the caller.`,control:`boolean`},onClose:{description:`Fired on Escape, the close button, or a click outside.`,table:{type:{summary:`() => void`}},action:`close`},notifications:{description:"The alerts to show. Omit to use the built-in demo set. Each carries a `group` that decides its heading and a `severity` that decides its pill.",table:{type:{summary:`RiskNotification[]`}}}}},N={render:()=>(0,O.jsx)(E,{}),play:async({canvasElement:e,step:t})=>{let n=j(e.ownerDocument.body);await t(`opens on the Unread filter`,async()=>{await k(await n.findByText(`Hurricane Milton`)).toBeInTheDocument()}),await t(`grouped by recency`,async()=>{await k(n.getByText(`Today`)).toBeInTheDocument()})}},P={render:()=>(0,O.jsx)(E,{}),play:async({canvasElement:e,step:t})=>{let n=j(e.ownerDocument.body);await t(`All reveals the read items the Unread filter hid`,async()=>{await k(n.queryByText(/Hail Storm Advisory/i)).toBeNull(),await A.click(n.getByRole(`button`,{name:/^All/i})),await k(await n.findByText(/Hail Storm Advisory/i)).toBeInTheDocument()})}},F={render:()=>(0,O.jsx)(E,{notifications:[{id:`w`,title:`Hurricane Milton`,severity:`warning`,description:`10 insured locations with total insured value $160M in the forecast path.`,area:`Butte County, CA`,timeAgo:`2m ago`,unread:!0,actionRequired:!0,group:`Today`},{id:`wa`,title:`Flood Watch`,severity:`watch`,description:`7 insured locations with total insured value $55M in an active flood watch zone.`,area:`Plumas County, CA`,timeAgo:`23m ago`,unread:!0,group:`Today`},{id:`a`,title:`Wildfire Advisory`,severity:`advisory`,description:`5 insured locations with total insured value $30M near an active wildfire zone.`,area:`Shasta County, CA`,timeAgo:`32m ago`,unread:!0,group:`Today`},{id:`ac`,title:`POL-2024-006 Expired`,severity:`action`,description:`Business Interruption policy ($780K) expired. Renewal required immediately.`,area:`Miami-Dade County, FL`,timeAgo:`2h ago`,unread:!0,actionRequired:!0,group:`Today`}]})},I={render:()=>(0,O.jsx)(E,{notifications:[]})},L={render:()=>(0,O.jsx)(E,{startOpen:!1}),play:async({canvasElement:e,step:t})=>{let n=j(e),r=j(e.ownerDocument.body);await t(`the trigger opens it`,async()=>{await A.click(n.getByRole(`button`,{name:`Open notifications`})),await k(await r.findByText(`Hurricane Milton`)).toBeInTheDocument()})}},R=[`Default`,`Filters`,`Severities`,`Empty`,`Closed`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <Host />,
  play: async ({
    canvasElement,
    step
  }) => {
    // The panel portals out of the canvas, so query the document body.
    const screen = within(canvasElement.ownerDocument.body);
    await step('opens on the Unread filter', async () => {
      // Exact, not a regex: the alert's title ALSO appears inside its own
      // description ("...forecast path of Hurricane Milton."), so /…/i
      // matches two nodes and getBy throws.
      await expect(await screen.findByText('Hurricane Milton')).toBeInTheDocument();
    });
    await step('grouped by recency', async () => {
      await expect(screen.getByText('Today')).toBeInTheDocument();
    });
  }
}`,...N.parameters?.docs?.source},description:{story:`The built-in demo set: eight alerts across all three groups.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <Host />,
  play: async ({
    canvasElement,
    step
  }) => {
    const screen = within(canvasElement.ownerDocument.body);
    await step('All reveals the read items the Unread filter hid', async () => {
      // Read + not action-required, so it is absent under both other filters.
      await expect(screen.queryByText(/Hail Storm Advisory/i)).toBeNull();
      await userEvent.click(screen.getByRole('button', {
        name: /^All/i
      }));
      await expect(await screen.findByText(/Hail Storm Advisory/i)).toBeInTheDocument();
    });
  }
}`,...P.parameters?.docs?.source},description:{story:`**Filtering.** Unread is the default; All and Action Required re-slice the
same list. This is internal state — nothing outside the panel sees it.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <Host notifications={[{
    id: 'w',
    title: 'Hurricane Milton',
    severity: 'warning',
    description: '10 insured locations with total insured value $160M in the forecast path.',
    area: 'Butte County, CA',
    timeAgo: '2m ago',
    unread: true,
    actionRequired: true,
    group: 'Today'
  }, {
    id: 'wa',
    title: 'Flood Watch',
    severity: 'watch',
    description: '7 insured locations with total insured value $55M in an active flood watch zone.',
    area: 'Plumas County, CA',
    timeAgo: '23m ago',
    unread: true,
    group: 'Today'
  }, {
    id: 'a',
    title: 'Wildfire Advisory',
    severity: 'advisory',
    description: '5 insured locations with total insured value $30M near an active wildfire zone.',
    area: 'Shasta County, CA',
    timeAgo: '32m ago',
    unread: true,
    group: 'Today'
  }, {
    id: 'ac',
    title: 'POL-2024-006 Expired',
    severity: 'action',
    description: 'Business Interruption policy ($780K) expired. Renewal required immediately.',
    area: 'Miami-Dade County, FL',
    timeAgo: '2h ago',
    unread: true,
    actionRequired: true,
    group: 'Today'
  }]} />
}`,...F.parameters?.docs?.source},description:{story:`One of each severity, to check the four pill treatments together.`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Host notifications={[]} />
}`,...I.parameters?.docs?.source},description:{story:`Nothing to show — the empty state, rather than a bare panel.`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <Host startOpen={false} />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    await step('the trigger opens it', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: 'Open notifications'
      }));
      // Exact — see the note in Default on why the regex matches twice.
      await expect(await screen.findByText('Hurricane Milton')).toBeInTheDocument();
    });
  }
}`,...L.parameters?.docs?.source},description:{story:`Closed, so the trigger is the only thing on screen.`,...L.parameters?.docs?.description}}}})))()}z();export{L as Closed,N as Default,I as Empty,P as Filters,F as Severities,R as __namedExportsOrder,M as default};