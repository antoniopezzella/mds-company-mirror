import{a5 as n,Z as e}from"./iframe-CPBTUrEW.js";import{F as S,b as F,c as x,d as y,e as h,a as w}from"./filter-bar-B3-GivsI.js";import{B}from"./button-_tNb_vhW.js";import{S as u}from"./stack-C88a0npI.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./control-size-rvCN7ZpI.js";import"./filter-chip-CfiB6TWx.js";import"./index-Dk2lMVn3.js";import"./dropdown-menu-B-DEwsfR.js";import"./index-B2KxKFY1.js";import"./index-DTX6ga2Q.js";import"./index-D-VHP59e.js";import"./index-ydzPhmoe.js";import"./index-CQZ-MLQt.js";import"./index-DbquDQCT.js";import"./index-VWR8Du3y.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-CDKxNHGJ.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";import"./createLucideIcon-BnpAccaP.js";import"./check-KuCy08bp.js";import"./chevron-right-BXCmPxW2.js";import"./chevron-down-122XaqBk.js";import"./x-Bk_wSNf2.js";import"./select-3H9YJY8U.js";import"./index-D17hSi50.js";import"./index-CztXHdXt.js";import"./index-DrK2s9b6.js";import"./prop-compat-ClktB6p5.js";import"./chevron-up-CoKqbRsK.js";import"./date-picker-t-CIrsQu.js";import"./calendar-CfacuH8P.js";import"./chevron-left-N_nrbjRa.js";import"./input-BSCHIFmj.js";import"./popover-B1Y9L4uz.js";import"./calendar-BknvOJFQ.js";import"./search-DRVimkv9.js";const Fe={title:"Components/FilterBar",component:S,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Page-level filter row with a size cascade, date-range presets, and removable active-filter chips so the user can always see what is narrowing their view."}}}},v=[{value:"emea",label:"EMEA"},{value:"amer",label:"Americas"},{value:"apac",label:"APAC"}],A=[{value:"open",label:"Open"},{value:"review",label:"In review"},{value:"closed",label:"Closed"}],l={render:()=>{const[t,a]=n.useState(""),[s,i]=n.useState(),[o,m]=n.useState(),[f,g]=n.useState(),b=[t&&{id:"q",label:"Search",value:t},s&&{id:"region",label:"Region",value:v.find(r=>r.value===s).label},o&&{id:"status",label:"Status",value:A.find(r=>r.value===o).label},f?.from&&{id:"range",label:"Period",value:"Custom range"}].filter(Boolean),C=r=>{r==="q"&&a(""),r==="region"&&i(void 0),r==="status"&&m(void 0),r==="range"&&g(void 0)},R=()=>{a(""),i(void 0),m(void 0),g(void 0)};return e.jsxs(u,{gap:4,children:[e.jsxs(S,{onClearAll:R,hasActiveFilters:b.length>0,children:[e.jsx(y,{label:"Policy",value:t,onChange:a,placeholder:"Policy number…"}),e.jsx(h,{label:"Region",options:v,value:s,onChange:i,placeholder:"All regions"}),e.jsx(h,{label:"Status",options:A,value:o,onChange:m,placeholder:"Any status"}),e.jsx(x,{value:f,onChange:g})]}),e.jsx(F,{filters:b,onRemove:C,onClearAll:R})]})}},c={render:()=>{const[t,a]=n.useState([{id:"region",label:"Region",value:"EMEA"},{id:"status",label:"Status",value:"Open"},{id:"period",label:"Period",value:"Last 30 days"}]);return e.jsxs(u,{gap:4,children:[e.jsx(F,{filters:t,onRemove:s=>a(i=>i.filter(o=>o.id!==s)),onClearAll:()=>a([])}),t.length===0&&e.jsx(B,{variant:"secondary",size:"sm",onClick:()=>a([{id:"region",label:"Region",value:"EMEA"},{id:"status",label:"Status",value:"Open"}]),children:"Reset the demo"})]})}},d={render:()=>{const[t,a]=n.useState();return e.jsx(x,{value:t,onChange:a})}},p={render:()=>e.jsx(u,{gap:8,children:["sm","md","lg"].map(t=>e.jsxs(u,{gap:2,children:[e.jsxs("span",{className:"text-xs font-medium text-muted-foreground",children:['size="',t,'"']}),e.jsxs(S,{size:t,onClearAll:()=>{},"aria-label":`Filters, ${t}`,children:[e.jsx(y,{label:"Policy",placeholder:"Policy number…"}),e.jsx(h,{label:"Region",options:v,placeholder:"All regions"}),e.jsx(w,{children:e.jsx(B,{variant:"primary",size:t,children:"Apply"})})]})]},t))})},xe=["Default","ActiveFilters","DatePresets","Sizes"];l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [q, setQ] = React.useState('');
    const [region, setRegion] = React.useState<string | number | undefined>();
    const [status, setStatus] = React.useState<string | number | undefined>();
    const [range, setRange] = React.useState<DateRange | undefined>();
    const active: ActiveFilter[] = [q && {
      id: 'q',
      label: 'Search',
      value: q
    }, region && {
      id: 'region',
      label: 'Region',
      value: REGIONS.find(r => r.value === region)!.label
    }, status && {
      id: 'status',
      label: 'Status',
      value: STATUSES.find(s => s.value === status)!.label
    }, range?.from && {
      id: 'range',
      label: 'Period',
      value: 'Custom range'
    }].filter(Boolean) as ActiveFilter[];
    const clear = (id: string) => {
      if (id === 'q') setQ('');
      if (id === 'region') setRegion(undefined);
      if (id === 'status') setStatus(undefined);
      if (id === 'range') setRange(undefined);
    };
    const clearAll = () => {
      setQ('');
      setRegion(undefined);
      setStatus(undefined);
      setRange(undefined);
    };
    return <Stack gap={4}>
        <FilterBar onClearAll={clearAll} hasActiveFilters={active.length > 0}>
          <FilterBarSearch label="Policy" value={q} onChange={setQ} placeholder="Policy number…" />
          <FilterBarSelect label="Region" options={REGIONS} value={region} onChange={setRegion} placeholder="All regions" />
          <FilterBarSelect label="Status" options={STATUSES} value={status} onChange={setStatus} placeholder="Any status" />
          <FilterBarDateRange value={range} onChange={setRange} />
        </FilterBar>
        <FilterBarChips filters={active} onRemove={clear} onClearAll={clearAll} />
      </Stack>;
  }
}`,...l.parameters?.docs?.source},description:{story:"The whole pattern, wired up — filter, see what is applied, remove it.",...l.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [filters, setFilters] = React.useState<ActiveFilter[]>([{
      id: 'region',
      label: 'Region',
      value: 'EMEA'
    }, {
      id: 'status',
      label: 'Status',
      value: 'Open'
    }, {
      id: 'period',
      label: 'Period',
      value: 'Last 30 days'
    }]);
    return <Stack gap={4}>
        <FilterBarChips filters={filters} onRemove={id => setFilters(f => f.filter(x => x.id !== id))} onClearAll={() => setFilters([])} />
        {filters.length === 0 && <Button variant="secondary" size="sm" onClick={() => setFilters([{
        id: 'region',
        label: 'Region',
        value: 'EMEA'
      }, {
        id: 'status',
        label: 'Status',
        value: 'Open'
      }])}>
            Reset the demo
          </Button>}
      </Stack>;
  }
}`,...c.parameters?.docs?.source},description:{story:`The chips alone. Without them a filtered view is indistinguishable from an
empty one — which is the same "looks like an answer" problem the data
states solve for failed fetches.`,...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    return <FilterBarDateRange value={range} onChange={setRange} />;
  }
}`,...d.parameters?.docs?.source},description:{story:`Date presets. There were none anywhere in the repo, so every "last 30 days"
view meant picking two dates from a calendar — slower, and a source of
off-by-one boundaries. Ranges here span whole days at both ends.`,...d.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={8}>
      {(['sm', 'md', 'lg'] as const).map(size => <Stack key={size} gap={2}>
          <span className="text-xs font-medium text-muted-foreground">size=&quot;{size}&quot;</span>
          <FilterBar size={size} onClearAll={() => {}} aria-label={\`Filters, \${size}\`}>
            <FilterBarSearch label="Policy" placeholder="Policy number…" />
            <FilterBarSelect label="Region" options={REGIONS} placeholder="All regions" />
            <FilterBarActions>
              <Button variant="primary" size={size}>Apply</Button>
            </FilterBarActions>
          </FilterBar>
        </Stack>)}
    </Stack>
}`,...p.parameters?.docs?.source},description:{story:"The row inherits one size, rather than each control being told separately.",...p.parameters?.docs?.description}}};export{c as ActiveFilters,d as DatePresets,l as Default,p as Sizes,xe as __namedExportsOrder,Fe as default};
