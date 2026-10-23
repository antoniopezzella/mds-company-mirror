import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./error-state-D4Yg2Y8I.js";import{n as a,t as o}from"./data-state-BctBXKwB.js";import{r as s,t as c}from"./data-table-BKV54IPo.js";import{n as l,r as u}from"./stack-BlYcYnw2.js";import{l as d,r as f,t as p}from"./card-tXlEGCFr.js";var m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{t(),a(),r(),s(),u(),d(),m=n(),h={title:`Components/DataState`,component:o,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`One vocabulary for loading / error / empty / ready across every data surface. Use the wrapper for the empty and error branches; render loading in place when the component has a structural skeleton worth preserving.`}}}},g=({label:e,children:t})=>(0,m.jsxs)(l,{gap:2,children:[(0,m.jsx)(`span`,{className:`text-xs font-medium text-muted-foreground`,children:e}),(0,m.jsx)(p,{children:(0,m.jsx)(f,{className:`flex min-h-56 p-0`,children:t})})]}),_={render:()=>(0,m.jsxs)(`div`,{className:`grid gap-6 lg:grid-cols-2`,children:[(0,m.jsx)(g,{label:`loading`,children:(0,m.jsx)(o,{loading:!0,children:`never seen`})}),(0,m.jsx)(g,{label:`error — with retry`,children:(0,m.jsx)(o,{loadError:!0,onRetry:()=>{},children:`never seen`})}),(0,m.jsx)(g,{label:`empty — no data`,children:(0,m.jsx)(o,{isEmpty:!0,children:`never seen`})}),(0,m.jsx)(g,{label:`empty — filtered out`,children:(0,m.jsx)(o,{isEmpty:!0,emptyReason:`no-results`,onClearFilters:()=>{},children:`never seen`})})]})},v={render:()=>(0,m.jsxs)(`div`,{className:`grid gap-6 lg:grid-cols-2`,children:[(0,m.jsx)(g,{label:`no-data — nothing exists yet`,children:(0,m.jsx)(o,{isEmpty:!0,emptyTitle:`No policies yet`,emptyDescription:`Bound policies will appear here.`})}),(0,m.jsx)(g,{label:`no-results — a filter excluded everything`,children:(0,m.jsx)(o,{isEmpty:!0,emptyReason:`no-results`,onClearFilters:()=>{}})})]})},y={render:()=>(0,m.jsxs)(`div`,{className:`grid gap-6 lg:grid-cols-2`,children:[(0,m.jsx)(g,{label:`block — default`,children:(0,m.jsx)(i,{onRetry:()=>{}})}),(0,m.jsx)(g,{label:`block — with detail`,children:(0,m.jsx)(i,{title:`Could not load claims`,description:`The claims service did not respond in time.`,detail:`ref: 8f21c0`,onRetry:()=>{}})})]})},b={render:()=>{let e=[{accessorKey:`policy`,header:`Policy`},{accessorKey:`client`,header:`Client`},{accessorKey:`premium`,header:`Premium`}];return(0,m.jsxs)(l,{gap:6,children:[(0,m.jsxs)(l,{gap:2,children:[(0,m.jsx)(`span`,{className:`text-xs font-medium text-muted-foreground`,children:`loading — skeleton rows, columns preserved`}),(0,m.jsx)(c,{columns:e,data:[],loading:!0,loadingRowCount:3})]}),(0,m.jsxs)(l,{gap:2,children:[(0,m.jsx)(`span`,{className:`text-xs font-medium text-muted-foreground`,children:`loadError — previously unexpressible; this rendered as "No data yet"`}),(0,m.jsx)(c,{columns:e,data:[],loadError:!0,onRetry:()=>{}})]}),(0,m.jsxs)(l,{gap:2,children:[(0,m.jsx)(`span`,{className:`text-xs font-medium text-muted-foreground`,children:`empty`}),(0,m.jsx)(c,{columns:e,data:[]})]})]})}},x=[`AllStates`,`EmptyReasons`,`ErrorVariants`,`InDataTable`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-6 lg:grid-cols-2">
      <Frame label="loading">
        <DataState loading>never seen</DataState>
      </Frame>
      <Frame label="error — with retry">
        <DataState loadError onRetry={() => {}}>
          never seen
        </DataState>
      </Frame>
      <Frame label="empty — no data">
        <DataState isEmpty>never seen</DataState>
      </Frame>
      <Frame label="empty — filtered out">
        <DataState isEmpty emptyReason="no-results" onClearFilters={() => {}}>
          never seen
        </DataState>
      </Frame>
    </div>
}`,..._.parameters?.docs?.source},description:{story:`The four branches side by side.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-6 lg:grid-cols-2">
      <Frame label="no-data — nothing exists yet">
        <DataState isEmpty emptyTitle="No policies yet" emptyDescription="Bound policies will appear here." />
      </Frame>
      <Frame label="no-results — a filter excluded everything">
        <DataState isEmpty emptyReason="no-results" onClearFilters={() => {}} />
      </Frame>
    </div>
}`,...v.parameters?.docs?.source},description:{story:"`no-data` and `no-results` are different situations and get different\nrecovery actions. Conflating them tells a user with an over-tight filter\nthat their account is empty.",...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-6 lg:grid-cols-2">
      <Frame label="block — default">
        <DataError onRetry={() => {}} />
      </Frame>
      <Frame label="block — with detail">
        <DataError title="Could not load claims" description="The claims service did not respond in time." detail="ref: 8f21c0" onRetry={() => {}} />
      </Frame>
    </div>
}`,...y.parameters?.docs?.source},description:{story:`The error block on its own, including the technical-detail slot.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const columns = [{
      accessorKey: 'policy',
      header: 'Policy'
    }, {
      accessorKey: 'client',
      header: 'Client'
    }, {
      accessorKey: 'premium',
      header: 'Premium'
    }];
    return <Stack gap={6}>
        <Stack gap={2}>
          <span className="text-xs font-medium text-muted-foreground">loading — skeleton rows, columns preserved</span>
          <DataTable columns={columns} data={[]} loading loadingRowCount={3} />
        </Stack>
        <Stack gap={2}>
          <span className="text-xs font-medium text-muted-foreground">
            loadError — previously unexpressible; this rendered as &quot;No data yet&quot;
          </span>
          <DataTable columns={columns} data={[]} loadError onRetry={() => {}} />
        </Stack>
        <Stack gap={2}>
          <span className="text-xs font-medium text-muted-foreground">empty</span>
          <DataTable columns={columns} data={[]} />
        </Stack>
      </Stack>;
  }
}`,...b.parameters?.docs?.source},description:{story:`\`DataTable\` keeps its skeleton **rows** rather than delegating loading to
the wrapper: a centred spinner would collapse the column widths and make
the layout jump every time data lands. It delegates empty and error.`,...b.parameters?.docs?.description}}}})))()}S();export{_ as AllStates,v as EmptyReasons,y as ErrorVariants,b as InDataTable,x as __namedExportsOrder,h as default};