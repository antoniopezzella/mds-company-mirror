import{Z as e}from"./iframe-CPBTUrEW.js";import{a as t,D as p}from"./data-state-CIGJqc-1.js";import{D as l}from"./data-table-CJMjcwUZ.js";import{S as m}from"./stack-C88a0npI.js";import{C as c,b as u}from"./card-DdSDVEd-.js";import"./preload-helper-PPVm8Dsz.js";import"./empty-DcTcGUY7.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./button-_tNb_vhW.js";import"./index-DTX6ga2Q.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./triangle-alert-CBFJXkB-.js";import"./spinner-CUjZIesC.js";import"./search-x-BoD6M5tN.js";import"./checkbox-CNQZ_QzY.js";import"./index-D-VHP59e.js";import"./index-B2KxKFY1.js";import"./index-ydzPhmoe.js";import"./index-CQZ-MLQt.js";import"./index-CNxNdWYK.js";import"./index-D0Uu3jyy.js";import"./index-DbquDQCT.js";import"./minus-CnttpEGu.js";import"./check-KuCy08bp.js";import"./info-XF5axP9F.js";import"./data-grid-pagination-Cp-xuDk7.js";import"./with-selector-dQ1DtIk5.js";import"./format-B1LeFV3Y.js";import"./format-context-Caqi-Gt1.js";import"./dropdown-menu-B-DEwsfR.js";import"./index-VWR8Du3y.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-CDKxNHGJ.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-DewG4hGn.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";import"./chevron-right-BXCmPxW2.js";import"./input-BSCHIFmj.js";import"./prop-compat-ClktB6p5.js";import"./skeleton-C-ZAhKi4.js";import"./z-index-CsvJFlOP.js";import"./data-grid-cell-edit-S8aFd1vS.js";import"./textarea-UDTKAvx4.js";import"./chevron-up-CoKqbRsK.js";import"./chevron-down-122XaqBk.js";import"./chevrons-up-down-DNeGP8GW.js";import"./x-Bk_wSNf2.js";import"./chevron-left-N_nrbjRa.js";import"./badge-J44eyYsr.js";import"./command-ChJErH62.js";import"./index-BiNW7bVc.js";import"./dialog-C1dHRi-6.js";import"./search-DRVimkv9.js";import"./popover-B1Y9L4uz.js";import"./calendar-CfacuH8P.js";import"./calendar-days-BsQaueMn.js";import"./filter-field-control-Bm7UZ_th.js";import"./filter-chip-CfiB6TWx.js";import"./label-qHY30eUg.js";import"./filter-bar-B3-GivsI.js";import"./select-3H9YJY8U.js";import"./index-D17hSi50.js";import"./index-CztXHdXt.js";import"./index-DrK2s9b6.js";import"./date-picker-t-CIrsQu.js";import"./calendar-BknvOJFQ.js";import"./trash-2-CHSE98No.js";import"./plus-B89lyPh-.js";import"./download-CmOKzzeV.js";import"./pagination-Dd3e6cTc.js";import"./shadows-BSmH5Lxe.js";const Ve={title:"Components/DataState",component:t,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"One vocabulary for loading / error / empty / ready across every data surface. Use the wrapper for the empty and error branches; render loading in place when the component has a structural skeleton worth preserving."}}}},r=({label:a,children:d})=>e.jsxs(m,{gap:2,children:[e.jsx("span",{className:"text-xs font-medium text-muted-foreground",children:a}),e.jsx(c,{children:e.jsx(u,{className:"flex min-h-56 p-0",children:d})})]}),o={render:()=>e.jsxs("div",{className:"grid gap-6 lg:grid-cols-2",children:[e.jsx(r,{label:"loading",children:e.jsx(t,{loading:!0,children:"never seen"})}),e.jsx(r,{label:"error — with retry",children:e.jsx(t,{loadError:!0,onRetry:()=>{},children:"never seen"})}),e.jsx(r,{label:"empty — no data",children:e.jsx(t,{isEmpty:!0,children:"never seen"})}),e.jsx(r,{label:"empty — filtered out",children:e.jsx(t,{isEmpty:!0,emptyReason:"no-results",onClearFilters:()=>{},children:"never seen"})})]})},s={render:()=>e.jsxs("div",{className:"grid gap-6 lg:grid-cols-2",children:[e.jsx(r,{label:"no-data — nothing exists yet",children:e.jsx(t,{isEmpty:!0,emptyTitle:"No policies yet",emptyDescription:"Bound policies will appear here."})}),e.jsx(r,{label:"no-results — a filter excluded everything",children:e.jsx(t,{isEmpty:!0,emptyReason:"no-results",onClearFilters:()=>{}})})]})},n={render:()=>e.jsxs("div",{className:"grid gap-6 lg:grid-cols-2",children:[e.jsx(r,{label:"block — default",children:e.jsx(p,{onRetry:()=>{}})}),e.jsx(r,{label:"block — with detail",children:e.jsx(p,{title:"Could not load claims",description:"The claims service did not respond in time.",detail:"ref: 8f21c0",onRetry:()=>{}})})]})},i={render:()=>{const a=[{accessorKey:"policy",header:"Policy"},{accessorKey:"client",header:"Client"},{accessorKey:"premium",header:"Premium"}];return e.jsxs(m,{gap:6,children:[e.jsxs(m,{gap:2,children:[e.jsx("span",{className:"text-xs font-medium text-muted-foreground",children:"loading — skeleton rows, columns preserved"}),e.jsx(l,{columns:a,data:[],loading:!0,loadingRowCount:3})]}),e.jsxs(m,{gap:2,children:[e.jsx("span",{className:"text-xs font-medium text-muted-foreground",children:'loadError — previously unexpressible; this rendered as "No data yet"'}),e.jsx(l,{columns:a,data:[],loadError:!0,onRetry:()=>{}})]}),e.jsxs(m,{gap:2,children:[e.jsx("span",{className:"text-xs font-medium text-muted-foreground",children:"empty"}),e.jsx(l,{columns:a,data:[]})]})]})}},_e=["AllStates","EmptyReasons","ErrorVariants","InDataTable"];o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source},description:{story:"The four branches side by side.",...o.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-6 lg:grid-cols-2">
      <Frame label="no-data — nothing exists yet">
        <DataState isEmpty emptyTitle="No policies yet" emptyDescription="Bound policies will appear here." />
      </Frame>
      <Frame label="no-results — a filter excluded everything">
        <DataState isEmpty emptyReason="no-results" onClearFilters={() => {}} />
      </Frame>
    </div>
}`,...s.parameters?.docs?.source},description:{story:"`no-data` and `no-results` are different situations and get different\nrecovery actions. Conflating them tells a user with an over-tight filter\nthat their account is empty.",...s.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-6 lg:grid-cols-2">
      <Frame label="block — default">
        <DataError onRetry={() => {}} />
      </Frame>
      <Frame label="block — with detail">
        <DataError title="Could not load claims" description="The claims service did not respond in time." detail="ref: 8f21c0" onRetry={() => {}} />
      </Frame>
    </div>
}`,...n.parameters?.docs?.source},description:{story:"The error block on its own, including the technical-detail slot.",...n.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source},description:{story:"`DataTable` keeps its skeleton **rows** rather than delegating loading to\nthe wrapper: a centred spinner would collapse the column widths and make\nthe layout jump every time data lands. It delegates empty and error.",...i.parameters?.docs?.description}}};export{o as AllStates,s as EmptyReasons,n as ErrorVariants,i as InDataTable,_e as __namedExportsOrder,Ve as default};
