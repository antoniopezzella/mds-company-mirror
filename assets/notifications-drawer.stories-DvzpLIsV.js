import{a5 as c,Z as e,ad as M}from"./iframe-CPBTUrEW.js";import{S as O,b as I,e as W,f as F}from"./sheet-Cxy80Rhz.js";import{C as L}from"./chevron-down-122XaqBk.js";import{C as P}from"./chevron-up-CoKqbRsK.js";import{T as _}from"./triangle-alert-CBFJXkB-.js";import{B as z}from"./button-_tNb_vhW.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BiNW7bVc.js";import"./index-B2KxKFY1.js";import"./index-DTX6ga2Q.js";import"./index-D-VHP59e.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-ydzPhmoe.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./x-Bk_wSNf2.js";import"./createLucideIcon-BnpAccaP.js";import"./control-size-rvCN7ZpI.js";const U=[{id:"1",title:"Hurricane Milton",severity:"warning",description:"10 insured locations with total insured value $160M are in the forecast path of Hurricane Milton.",area:"Butte County, Plumas County, CA...",timeAgo:"2m ago",unread:!0,actionRequired:!0,group:"Today"},{id:"2",title:"Flood Watch",severity:"watch",description:"7 insured locations with total insured value $55M are in an active flood watch zone.",area:"Butte County, Plumas County, CA...",timeAgo:"23m ago",unread:!0,actionRequired:!1,group:"Today"},{id:"3",title:"Wildfire Advisory",severity:"advisory",description:"5 insured locations with total insured value $30M are near an active wildfire zone.",area:"Butte County, Plumas County, CA...",timeAgo:"32m ago",unread:!0,actionRequired:!1,group:"Today"},{id:"4",title:"Earthquake Magnitude 6.8",severity:"warning",description:"7 insured locations with total insured value $55M. Magnitude 6.8 at depth 15 km.",area:"Butte County, Plumas County, CA...",timeAgo:"44m ago",unread:!0,actionRequired:!0,group:"Today"},{id:"5",title:"POL-2024-006 Expired",severity:"action",description:"Retail Ventures LLC Business Interruption policy ($780K) expired on Dec 1, 2024. Renewal required immediately.",area:"Miami-Dade County, FL",timeAgo:"2h ago",unread:!1,actionRequired:!0,group:"Today"},{id:"6",title:"Severe Thunderstorm Watch",severity:"watch",description:"3 insured locations with total value $22M are under severe thunderstorm watch.",area:"Harris County, TX",timeAgo:"1d ago",unread:!1,group:"Yesterday"},{id:"7",title:"Hail Storm Advisory",severity:"advisory",description:'Hail up to 2" expected. 4 commercial property locations with value $18M at risk.',area:"Dallas County, TX",timeAgo:"1d ago",unread:!1,group:"Yesterday"},{id:"8",title:"Coastal Storm Surge Warning",severity:"warning",description:"2 marine cargo locations with value $12M are in coastal storm surge zone.",area:"Galveston County, TX",timeAgo:"2d ago",unread:!1,actionRequired:!0,group:"This Week"}],Y={warning:{label:"Warning",fg:"status.danger.fg",bg:"status.danger.bg"},watch:{label:"Watch",fg:"text.onLight",bg:"status.warning.bg"},advisory:{label:"Advisory",fg:"status.info.fg",bg:"status.info.bg"},action:{label:"Action Required",fg:"interactive.primary",bg:"surface.accent"}};function K(r){return r.split(/(\$[\d,.]+[MKB]?|\b\d+\.?\d*\s*(?:km|m|K|M|B|locations?|insured|magnitude)?\b)/g).map((a,l)=>/^\$|^\d/.test(a)?e.jsx("strong",{children:a},l):a)}const C=c.forwardRef(({open:r,onClose:i,notifications:a=U},l)=>{const[x,S]=c.useState("unread"),[A,k]=c.useState({}),T="var(--role-text-primary)",d="var(--role-text-secondary)",v="var(--role-border-default)",q="var(--role-surface-subtle)",D="var(--role-surface-default)",w="var(--role-interactive-primary)",j="var(--role-text-onInteractive)",H=a.filter(t=>t.unread).length,E=a.filter(t=>t.actionRequired).length,N=c.useMemo(()=>x==="unread"?a.filter(t=>t.unread):x==="action"?a.filter(t=>t.actionRequired):a,[x,a]),B=c.useMemo(()=>["Today","Yesterday","This Week"].map(o=>({label:o,items:N.filter(n=>n.group===o)})).filter(o=>o.items.length>0),[N]),$=t=>k(o=>({...o,[t]:!o[t]}));return e.jsx(O,{open:r,onOpenChange:t=>!t&&i(),children:e.jsxs(I,{ref:l,side:"right",className:"flex w-full flex-col gap-0 p-0 sm:max-w-[440px]",children:[e.jsx(W,{className:"flex-row items-center justify-between px-6 pb-4 pt-6",children:e.jsx(F,{className:"font-bold",children:"Notifications"})}),e.jsx("div",{style:{borderTop:`1px solid ${v}`}}),e.jsx("div",{className:"flex gap-2 px-6 py-3.5",children:[{key:"unread",label:"Unread",count:H},{key:"all",label:"All",count:a.length},{key:"action",label:"Action Required",count:E}].map(({key:t,label:o,count:n})=>{const s=x===t;return e.jsxs("button",{type:"button",onClick:()=>S(t),className:"flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium leading-none transition-colors",style:{backgroundColor:s?w:"transparent",color:s?j:T,borderColor:s?w:v},children:[o,e.jsx("span",{className:"flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[11px] font-bold",style:{backgroundColor:s?"color-mix(in srgb, currentColor 18%, transparent)":q,color:s?j:d},children:n})]},t)})}),e.jsx("div",{style:{borderTop:`1px solid ${v}`}}),e.jsxs("div",{className:"flex-1 overflow-y-auto px-4 pb-4 pt-2",children:[B.map(({label:t,items:o})=>e.jsxs("div",{children:[e.jsxs("button",{type:"button",onClick:()=>$(t),className:"flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left transition-colors",style:{color:d},children:[e.jsx("span",{className:"text-[13px] font-semibold uppercase tracking-wider",children:t}),A[t]?e.jsx(L,{className:"h-[18px] w-[18px]"}):e.jsx(P,{className:"h-[18px] w-[18px]"})]}),!A[t]&&e.jsx("div",{className:"flex flex-col gap-2 pb-2",children:o.map(n=>{const s=Y[n.severity];return e.jsxs("div",{className:"relative rounded-lg border p-3.5",style:{borderColor:v,backgroundColor:n.unread?"var(--role-surface-accent)":D},children:[e.jsxs("div",{className:"mb-1.5 flex items-start justify-between gap-2",children:[e.jsxs("div",{className:"flex min-w-0 flex-1 items-center gap-2",children:[e.jsx(_,{className:"h-5 w-5 shrink-0",style:{color:"var(--role-status-danger-fg)"}}),e.jsx("span",{className:"text-sm font-bold leading-tight",style:{color:T},children:n.title})]}),e.jsxs("div",{className:"flex shrink-0 items-center gap-2",children:[e.jsx("span",{className:"whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold",style:{backgroundColor:M(s.bg),color:M(s.fg)},children:s.label}),n.unread&&e.jsx("span",{className:"h-2 w-2 shrink-0 rounded-full",style:{backgroundColor:w}})]})]}),e.jsx("p",{className:"mb-1.5 text-[13px] leading-relaxed",style:{color:T},children:K(n.description)}),e.jsxs("p",{className:"mb-2.5 text-xs",style:{color:d},children:["Area Affected: ",n.area]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("button",{type:"button",className:"text-[13px] font-medium hover:underline",style:{color:w},children:"View locations"}),e.jsx("span",{className:"text-[11px]",style:{color:d},children:n.timeAgo})]})]},n.id)})})]},t)),B.length===0&&e.jsx("div",{className:"flex h-[200px] flex-col items-center justify-center",style:{color:d},children:e.jsx("p",{className:"text-sm",children:"No notifications"})})]})]})})});C.displayName="NotificationsDrawer";C.__docgenInfo={description:"Forwards to the Sheet's content panel, so a consumer can focus or measure it once open.",methods:[],displayName:"NotificationsDrawer",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},notifications:{required:!1,tsType:{name:"Array",elements:[{name:"RiskNotification"}],raw:"RiskNotification[]"},description:"Defaults to a built-in sample set of risk alerts — pass real data in any non-demo usage.",defaultValue:{value:`[
  { id: '1', title: 'Hurricane Milton', severity: 'warning', description: '10 insured locations with total insured value $160M are in the forecast path of Hurricane Milton.', area: 'Butte County, Plumas County, CA...', timeAgo: '2m ago', unread: true, actionRequired: true, group: 'Today' },
  { id: '2', title: 'Flood Watch', severity: 'watch', description: '7 insured locations with total insured value $55M are in an active flood watch zone.', area: 'Butte County, Plumas County, CA...', timeAgo: '23m ago', unread: true, actionRequired: false, group: 'Today' },
  { id: '3', title: 'Wildfire Advisory', severity: 'advisory', description: '5 insured locations with total insured value $30M are near an active wildfire zone.', area: 'Butte County, Plumas County, CA...', timeAgo: '32m ago', unread: true, actionRequired: false, group: 'Today' },
  { id: '4', title: 'Earthquake Magnitude 6.8', severity: 'warning', description: '7 insured locations with total insured value $55M. Magnitude 6.8 at depth 15 km.', area: 'Butte County, Plumas County, CA...', timeAgo: '44m ago', unread: true, actionRequired: true, group: 'Today' },
  { id: '5', title: 'POL-2024-006 Expired', severity: 'action', description: 'Retail Ventures LLC Business Interruption policy ($780K) expired on Dec 1, 2024. Renewal required immediately.', area: 'Miami-Dade County, FL', timeAgo: '2h ago', unread: false, actionRequired: true, group: 'Today' },
  { id: '6', title: 'Severe Thunderstorm Watch', severity: 'watch', description: '3 insured locations with total value $22M are under severe thunderstorm watch.', area: 'Harris County, TX', timeAgo: '1d ago', unread: false, group: 'Yesterday' },
  { id: '7', title: 'Hail Storm Advisory', severity: 'advisory', description: 'Hail up to 2" expected. 4 commercial property locations with value $18M at risk.', area: 'Dallas County, TX', timeAgo: '1d ago', unread: false, group: 'Yesterday' },
  { id: '8', title: 'Coastal Storm Surge Warning', severity: 'warning', description: '2 marine cargo locations with value $12M are in coastal storm surge zone.', area: 'Galveston County, TX', timeAgo: '2d ago', unread: false, actionRequired: true, group: 'This Week' },
]`,computed:!1}}}};const{expect:g,userEvent:R,within:b}=__STORYBOOK_MODULE_TEST__,ve={title:"Components/NotificationsDrawer",component:C,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:["A slide-over panel of risk notifications, grouped by recency (Today / Yesterday / This","Week) and filterable by Unread, All, or Action Required.","","**Controlled.** It owns no open state — `open` in, `onClose` out — so the trigger can","live anywhere, typically the bell in `Header`. The filter tabs *are* internal state,","since nothing outside the panel needs them.","","Numbers inside each description (dollar values, distances, location counts) are","emphasised automatically; the text is written as prose and the component highlights it."].join(`
`)}}},argTypes:{open:{description:"Whether the panel is showing. Controlled by the caller.",control:"boolean"},onClose:{description:"Fired on Escape, the close button, or a click outside.",table:{type:{summary:"() => void"}},action:"close"},notifications:{description:"The alerts to show. Omit to use the built-in demo set. Each carries a `group` that decides its heading and a `severity` that decides its pill.",table:{type:{summary:"RiskNotification[]"}}}}};function f({notifications:r,startOpen:i=!0}){const[a,l]=c.useState(i);return e.jsxs("div",{style:{minHeight:480,padding:24},children:[e.jsx(z,{variant:"secondary",size:"md",onClick:()=>l(!0),children:"Open notifications"}),e.jsx(C,{open:a,onClose:()=>l(!1),notifications:r})]})}const u={render:()=>e.jsx(f,{}),play:async({canvasElement:r,step:i})=>{const a=b(r.ownerDocument.body);await i("opens on the Unread filter",async()=>{await g(await a.findByText("Hurricane Milton")).toBeInTheDocument()}),await i("grouped by recency",async()=>{await g(a.getByText("Today")).toBeInTheDocument()})}},p={render:()=>e.jsx(f,{}),play:async({canvasElement:r,step:i})=>{const a=b(r.ownerDocument.body);await i("All reveals the read items the Unread filter hid",async()=>{await g(a.queryByText(/Hail Storm Advisory/i)).toBeNull(),await R.click(a.getByRole("button",{name:/^All/i})),await g(await a.findByText(/Hail Storm Advisory/i)).toBeInTheDocument()})}},m={render:()=>e.jsx(f,{notifications:[{id:"w",title:"Hurricane Milton",severity:"warning",description:"10 insured locations with total insured value $160M in the forecast path.",area:"Butte County, CA",timeAgo:"2m ago",unread:!0,actionRequired:!0,group:"Today"},{id:"wa",title:"Flood Watch",severity:"watch",description:"7 insured locations with total insured value $55M in an active flood watch zone.",area:"Plumas County, CA",timeAgo:"23m ago",unread:!0,group:"Today"},{id:"a",title:"Wildfire Advisory",severity:"advisory",description:"5 insured locations with total insured value $30M near an active wildfire zone.",area:"Shasta County, CA",timeAgo:"32m ago",unread:!0,group:"Today"},{id:"ac",title:"POL-2024-006 Expired",severity:"action",description:"Business Interruption policy ($780K) expired. Renewal required immediately.",area:"Miami-Dade County, FL",timeAgo:"2h ago",unread:!0,actionRequired:!0,group:"Today"}]})},y={render:()=>e.jsx(f,{notifications:[]})},h={render:()=>e.jsx(f,{startOpen:!1}),play:async({canvasElement:r,step:i})=>{const a=b(r),l=b(r.ownerDocument.body);await i("the trigger opens it",async()=>{await R.click(a.getByRole("button",{name:"Open notifications"})),await g(await l.findByText("Hurricane Milton")).toBeInTheDocument()})}},we=["Default","Filters","Severities","Empty","Closed"];u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source},description:{story:"The built-in demo set: eight alerts across all three groups.",...u.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source},description:{story:`**Filtering.** Unread is the default; All and Action Required re-slice the
same list. This is internal state — nothing outside the panel sees it.`,...p.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source},description:{story:"One of each severity, to check the four pill treatments together.",...m.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Host notifications={[]} />
}`,...y.parameters?.docs?.source},description:{story:"Nothing to show — the empty state, rather than a bare panel.",...y.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source},description:{story:"Closed, so the trigger is the only thing on screen.",...h.parameters?.docs?.description}}};export{h as Closed,u as Default,y as Empty,p as Filters,m as Severities,we as __namedExportsOrder,ve as default};
