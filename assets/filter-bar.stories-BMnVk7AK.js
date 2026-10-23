import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./button-DatWLSj0.js";import{a as o,i as s,n as c,o as l,r as u,s as d,t as f}from"./filter-bar-amnI7Mue.js";import{n as p,r as m}from"./stack-BlYcYnw2.js";var h,g,_,v,y,b,x,S,C,w;function T(){return(T=t((()=>{h=e(n(),1),d(),i(),m(),g=r(),_={title:`Components/FilterBar`,component:f,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`Page-level filter row with a size cascade, date-range presets, and removable active-filter chips so the user can always see what is narrowing their view.`}}}},v=[{value:`emea`,label:`EMEA`},{value:`amer`,label:`Americas`},{value:`apac`,label:`APAC`}],y=[{value:`open`,label:`Open`},{value:`review`,label:`In review`},{value:`closed`,label:`Closed`}],b={render:()=>{let[e,t]=h.useState(``),[n,r]=h.useState(),[i,a]=h.useState(),[c,d]=h.useState(),m=[e&&{id:`q`,label:`Search`,value:e},n&&{id:`region`,label:`Region`,value:v.find(e=>e.value===n).label},i&&{id:`status`,label:`Status`,value:y.find(e=>e.value===i).label},c?.from&&{id:`range`,label:`Period`,value:`Custom range`}].filter(Boolean),_=e=>{e===`q`&&t(``),e===`region`&&r(void 0),e===`status`&&a(void 0),e===`range`&&d(void 0)},b=()=>{t(``),r(void 0),a(void 0),d(void 0)};return(0,g.jsxs)(p,{gap:4,children:[(0,g.jsxs)(f,{onClearAll:b,hasActiveFilters:m.length>0,children:[(0,g.jsx)(o,{label:`Policy`,value:e,onChange:t,placeholder:`Policy number…`}),(0,g.jsx)(l,{label:`Region`,options:v,value:n,onChange:r,placeholder:`All regions`}),(0,g.jsx)(l,{label:`Status`,options:y,value:i,onChange:a,placeholder:`Any status`}),(0,g.jsx)(s,{value:c,onChange:d})]}),(0,g.jsx)(u,{filters:m,onRemove:_,onClearAll:b})]})}},x={render:()=>{let[e,t]=h.useState([{id:`region`,label:`Region`,value:`EMEA`},{id:`status`,label:`Status`,value:`Open`},{id:`period`,label:`Period`,value:`Last 30 days`}]);return(0,g.jsxs)(p,{gap:4,children:[(0,g.jsx)(u,{filters:e,onRemove:e=>t(t=>t.filter(t=>t.id!==e)),onClearAll:()=>t([])}),e.length===0&&(0,g.jsx)(a,{variant:`secondary`,size:`sm`,onClick:()=>t([{id:`region`,label:`Region`,value:`EMEA`},{id:`status`,label:`Status`,value:`Open`}]),children:`Reset the demo`})]})}},S={render:()=>{let[e,t]=h.useState();return(0,g.jsx)(s,{value:e,onChange:t})}},C={render:()=>(0,g.jsx)(p,{gap:8,children:[`sm`,`md`,`lg`].map(e=>(0,g.jsxs)(p,{gap:2,children:[(0,g.jsxs)(`span`,{className:`text-xs font-medium text-muted-foreground`,children:[`size="`,e,`"`]}),(0,g.jsxs)(f,{size:e,onClearAll:()=>{},"aria-label":`Filters, ${e}`,children:[(0,g.jsx)(o,{label:`Policy`,placeholder:`Policy number…`}),(0,g.jsx)(l,{label:`Region`,options:v,placeholder:`All regions`}),(0,g.jsx)(c,{children:(0,g.jsx)(a,{variant:`primary`,size:e,children:`Apply`})})]})]},e))})},w=[`Default`,`ActiveFilters`,`DatePresets`,`Sizes`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source},description:{story:`The whole pattern, wired up — filter, see what is applied, remove it.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source},description:{story:`The chips alone. Without them a filtered view is indistinguishable from an
empty one — which is the same "looks like an answer" problem the data
states solve for failed fetches.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    return <FilterBarDateRange value={range} onChange={setRange} />;
  }
}`,...S.parameters?.docs?.source},description:{story:`Date presets. There were none anywhere in the repo, so every "last 30 days"
view meant picking two dates from a calendar — slower, and a source of
off-by-one boundaries. Ranges here span whole days at both ends.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source},description:{story:`The row inherits one size, rather than each control being told separately.`,...C.parameters?.docs?.description}}}})))()}T();export{x as ActiveFilters,S as DatePresets,b as Default,C as Sizes,w as __namedExportsOrder,_ as default};