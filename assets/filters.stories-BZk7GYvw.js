import{a5 as d,Z as s,N}from"./iframe-CPBTUrEW.js";import{i as g,h as J,j as h,l as le,m as ce,n as ue,c as H,g as de,F as w}from"./predicate-D_JAmcXY.js";import{f as pe}from"./filters-operators-CyzjlChd.js";import{g as me,i as ye,a as V}from"./filters-field-picker-DXcbmY3j.js";import{D as Y}from"./data-table-CJMjcwUZ.js";import{B as fe}from"./badge-J44eyYsr.js";import{S as _}from"./stack-C88a0npI.js";import{a as he}from"./format-B1LeFV3Y.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./button-_tNb_vhW.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./popover-B1Y9L4uz.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-ydzPhmoe.js";import"./button-group-BKSnLksy.js";import"./separator-Cz9zTVn9.js";import"./dropdown-menu-B-DEwsfR.js";import"./index-VWR8Du3y.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";import"./check-KuCy08bp.js";import"./chevron-right-BXCmPxW2.js";import"./chevron-down-122XaqBk.js";import"./ellipsis-vertical-Ci1UvJep.js";import"./x-Bk_wSNf2.js";import"./plus-B89lyPh-.js";import"./input-BSCHIFmj.js";import"./prop-compat-ClktB6p5.js";import"./label-qHY30eUg.js";import"./search-DRVimkv9.js";import"./checkbox-CNQZ_QzY.js";import"./minus-CnttpEGu.js";import"./info-XF5axP9F.js";import"./data-grid-pagination-Cp-xuDk7.js";import"./with-selector-dQ1DtIk5.js";import"./format-context-Caqi-Gt1.js";import"./data-state-CIGJqc-1.js";import"./empty-DcTcGUY7.js";import"./triangle-alert-CBFJXkB-.js";import"./spinner-CUjZIesC.js";import"./search-x-BoD6M5tN.js";import"./skeleton-C-ZAhKi4.js";import"./z-index-CsvJFlOP.js";import"./data-grid-cell-edit-S8aFd1vS.js";import"./textarea-UDTKAvx4.js";import"./chevron-up-CoKqbRsK.js";import"./chevrons-up-down-DNeGP8GW.js";import"./chevron-left-N_nrbjRa.js";import"./command-ChJErH62.js";import"./index-BiNW7bVc.js";import"./dialog-C1dHRi-6.js";import"./calendar-CfacuH8P.js";import"./calendar-days-BsQaueMn.js";import"./filter-field-control-Bm7UZ_th.js";import"./filter-chip-CfiB6TWx.js";import"./filter-bar-B3-GivsI.js";import"./select-3H9YJY8U.js";import"./index-D17hSi50.js";import"./index-CztXHdXt.js";import"./index-DrK2s9b6.js";import"./date-picker-t-CIrsQu.js";import"./calendar-BknvOJFQ.js";import"./trash-2-CHSE98No.js";import"./download-CmOKzzeV.js";import"./pagination-Dd3e6cTc.js";import"./shadows-BSmH5Lxe.js";function ge(e){return JSON.stringify(e)}function U(e,t){const n=Z(e,t);return n?e.negated?`!(${n})`:n:""}function Z(e,t){const n=e.combinator==="or"?"|":",";return e.rules.map(r=>we(r,t)).filter(Boolean).join(n)}function we(e,t){if(ce(e)){const a=Z(e,t);return a?`${e.negated?"!":""}(${a})`:""}if(!e.operator||t&&!ue(e,a=>V(t,a)))return"";const r=`${`${e.negated?"!":""}${e.path.join(".")}`}:${e.operator}`;return e.value===void 0?r:`${r}:${ge(e.value)}`}function ee(e){if(!e.startsWith("(")||!e.endsWith(")"))return!1;let t=0,n=!1,r=!1;for(let a=0;a<e.length;a+=1){const o=e[a];if(n){r?r=!1:o==="\\"?r=!0:o==='"'&&(n=!1);continue}if(o==='"')n=!0;else if(o==="(")t+=1;else if(o===")"&&(t-=1,t===0))return a===e.length-1}return!1}function z(e,t){const n=[],r=e.trim();if(!r)return{query:g(),dropped:n,ok:!0};try{const a=r.startsWith("!")&&ee(r.slice(1)),o=a?r.slice(2,-1):r,l=te(o,t,n);return{query:a?{...l,negated:!0}:l,dropped:n,ok:n.length===0}}catch{return{query:g(),dropped:[{raw:r,reason:"malformed"}],ok:!1}}}function ve(e){const t=[],n=[];let r=0,a=0,o=0,l=!1,p=!1,v=0;for(let c=0;c<e.length;c+=1){const i=e[c];if(l){p?p=!1:i==="\\"?p=!0:i==='"'&&(l=!1);continue}if(i==='"'?l=!0:i==="("?r+=1:i===")"?r-=1:i==="{"?a+=1:i==="}"?a-=1:i==="["?o+=1:i==="]"?o-=1:r===0&&a===0&&o===0&&(i===","||i==="|")&&(t.push(e.slice(v,c)),n.push(i),v=c+1),r<0||a<0||o<0)throw new Error("unbalanced")}if(r!==0||a!==0||o!==0||l)throw new Error("unbalanced");return t.push(e.slice(v)),{parts:t,seps:n}}function te(e,t,n){const{parts:r,seps:a}=ve(e);if(new Set(a).size>1)throw new Error("mixed combinators");const l=a[0]==="|"?"or":"and",p=[];for(const v of r){const c=xe(v.trim(),t,n);c&&p.push(c)}return J(l,p)}function xe(e,t,n){if(!e)throw new Error("empty node");const r=e.startsWith("!"),a=r?e.slice(1):e;if(a.startsWith("(")){if(!ee(a))throw new Error("unbalanced");const B=te(a.slice(1,-1),t,n);return B.rules.length?r?{...B,negated:!0}:B:null}const o=a.indexOf(":");if(o===-1)return n.push({raw:e,reason:"malformed"}),null;const l=a.indexOf(":",o+1),p=a.slice(0,o),v=l===-1?a.slice(o+1):a.slice(o+1,l),c=l===-1?void 0:a.slice(l+1),i=p.split(".");if(!me(t,i))return n.push({raw:e,reason:"unknown-field"}),null;if(!ye(t,i))return n.push({raw:e,reason:"not-filterable"}),null;const T=V(t,i),k=v,x=T?pe(T,k):void 0;if(!x)return n.push({raw:e,reason:"invalid-operator"}),null;let S;if(c!==void 0){try{S=JSON.parse(c)}catch{return n.push({raw:e,reason:"invalid-value"}),null}if(!M(S))return n.push({raw:e,reason:"invalid-value"}),null}else if(x.requiresValue)return h(i,{operator:k,...r?{negated:!0}:{}});return le(x,S)?h(i,{operator:k,value:S,...r?{negated:!0}:{}}):(n.push({raw:e,reason:"invalid-value"}),null)}function M(e){return typeof e=="number"?Number.isFinite(e):Array.isArray(e)?e.every(t=>M(t)):e&&typeof e=="object"?Object.values(e).every(t=>M(t)):!0}const ne="filter";function be(e,t=new URLSearchParams,n=ne){const r=new URLSearchParams(t),a=U(e);return a?r.set(n,a):r.delete(n),r}function Re(e,{fields:t,defaultQuery:n,syncToUrl:r=!1,onChange:a}){const o=typeof r=="string"?r:ne,l=r!==!1,[p]=d.useState(()=>!l||typeof window>"u"?"":new URLSearchParams(window.location.search).get(o)??""),[v]=d.useState(()=>p?z(p,t):{query:n??g(),dropped:[]}),[c,i]=d.useState(v.query),[$,T]=d.useState(v.dropped),k=d.useRef(!1);d.useEffect(()=>{if(!p||k.current)return;const u=z(p,t),R=U(u.query,t);i(y=>U(y,t)===R?y:u.query),T(y=>y.length===u.dropped.length&&y.every((K,X)=>K.raw===u.dropped[X].raw&&K.reason===u.dropped[X].reason)?y:u.dropped)},[p,t]);const x=d.useMemo(()=>U(c,t),[c,t]);d.useEffect(()=>{if(!l||typeof window>"u"||!x&&p&&$.length)return;const u=new URLSearchParams(window.location.search);x?u.set(o,x):u.delete(o);const R=u.toString(),y=`${window.location.pathname}${R?`?${R}`:""}${window.location.hash}`;y!==`${window.location.pathname}${window.location.search}${window.location.hash}`&&window.history.replaceState(window.history.state,"",y)},[x,o,l,p,$]);const S=d.useRef(a);S.current=a;const B=d.useCallback((u,R)=>{k.current=!0,i(u),T(y=>y.length?[]:y),S.current?.(u,R)},[]);d.useEffect(()=>{if(!l||typeof window>"u")return;const u=()=>{const R=new URLSearchParams(window.location.search).get(o)??"",y=z(R,t);i(y.query),T(y.dropped)};return window.addEventListener("popstate",u),()=>window.removeEventListener("popstate",u)},[l,o,t]);const G=d.useCallback(u=>V(t,u),[t]),oe=d.useMemo(()=>H(e,c,t),[e,c,t]),se=d.useMemo(()=>de(c,G),[c,G]),ie=d.useCallback(()=>B(g()),[B]);return{query:c,setQuery:B,rows:oe,count:se,serialized:x,dropped:$,reset:ie}}const{expect:m,screen:re,userEvent:O,waitFor:W,within:b}=__STORYBOOK_MODULE_TEST__,Zt={title:"Components/Filters",component:w,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["A **query system**, with the filter bar as one presentation of it.","","Each condition is `FIELD → OPERATOR → VALUE`, rendered as a **segmented button group**","where every segment is independently editable — not a pill. That is what lets a filter",'say "is not", "is any of" or "between"; a single chip reading `Status: Active` hides the',"operator behind a colon and cannot express any of them.","","The empty state is one `+ Add filter` control and nothing else."].join(`
`)}}}},f=[{id:"status",label:"Status",type:"select",options:[{value:"Active",label:"Active"},{value:"Pending",label:"Pending"},{value:"Expired",label:"Expired"}]},{id:"premium",label:"Premium",type:"number",unit:"currency"},{id:"bound",label:"Bound",type:"boolean",trueLabel:"Bound",falseLabel:"Unbound"},{id:"renewal",label:"Renewal date",type:"date"},{id:"location",label:"Location",type:"select",fields:[{id:"country",label:"Country",type:"select",options:[{value:"BR",label:"Brazil"},{value:"MX",label:"Mexico"},{value:"US",label:"United States"}]},{id:"city",label:"City",type:"text"}]},{id:"risk",label:"Risk",type:"select",fields:[{id:"cat",label:"CAT",type:"select",fields:[{id:"flood",label:"Flood",type:"number"},{id:"wind",label:"Wind",type:"number"}]},{id:"casualty",label:"Casualty",type:"number"}]},{id:"tiv",label:"Total insured value",type:"number",unit:"currency",aliases:["TIV"]}],A={render:()=>s.jsx(w,{fields:f}),play:async({canvasElement:e})=>{const t=b(e);await m(t.getByRole("button",{name:/Add filter/})).toBeInTheDocument(),await m(t.queryByRole("group")).toBeNull()}},C={render:()=>s.jsx(w,{fields:f,defaultQuery:g([h(["status"],{operator:"is",value:"Active"}),h(["premium"],{operator:"gt",value:1e4}),h(["risk","cat","flood"],{operator:"between",value:{min:20,max:80}}),h(["bound"],{operator:"is",value:!1})])}),play:async({canvasElement:e,step:t})=>{const n=b(e);await t("every segment is its own control",async()=>{const r=n.getAllByRole("group")[0];await m(b(r).getByRole("button",{name:"Field: Status"})).toBeInTheDocument(),await m(b(r).getByRole("button",{name:"Condition: is"})).toBeInTheDocument(),await m(b(r).getByRole("button",{name:"Value: Active"})).toBeInTheDocument()}),await t("a nested field reads as its full path",async()=>{await m(n.getByRole("button",{name:"Field: Risk › CAT › Flood"})).toBeInTheDocument()})}},E={render:()=>s.jsx(w,{fields:f,defaultQuery:g([h(["tiv"],{operator:"is_empty"})])})},I={render:()=>s.jsx(w,{fields:f,defaultQuery:g([h(["status"],{operator:"is",value:"Active"}),h(["premium"])])})},Q={render:()=>s.jsx(w,{fields:f,defaultQuery:g([h(["status"],{operator:"is",value:"Active"}),J("or",[h(["location","country"],{operator:"is",value:"BR"}),h(["location","country"],{operator:"is",value:"MX"})])])})},P={render:()=>s.jsx(w,{fields:f,readOnly:!0,defaultQuery:g([h(["status"],{operator:"is",value:"Active"})])})},F=[{id:1,name:"Commercial Auto",status:"Active",premium:12400,bound:!0,location:{country:"BR",city:"Rio"}},{id:2,name:"General Liability",status:"Active",premium:8200,bound:!0,location:{country:"US",city:"Boise"}},{id:3,name:"Cyber Liability",status:"Pending",premium:15900,bound:!1,location:{country:"MX",city:"Leon"}},{id:4,name:"Property",status:"Active",premium:22e3,bound:!0,location:{country:"BR",city:"Recife"}},{id:5,name:"Workers Comp",status:"Expired",premium:9600,bound:!1,location:{country:"US",city:"Reno"}}],ae=[{accessorKey:"name",header:"Policy"},{accessorKey:"status",header:"Status",cell:({getValue:e})=>{const t=e();return s.jsx(fe,{tone:t==="Active"?"success":t==="Expired"?"danger":"warning",size:"sm",children:t})}},{accessorKey:"premium",header:"Premium",meta:{type:"currency"},cell:({getValue:e})=>he(e(),{decimals:0})},{id:"country",accessorFn:e=>e.location.country,header:"Country"}],D={render:function(){const[t,n]=d.useState(()=>g()),r=H(F,t,f);return s.jsxs(_,{gap:4,children:[s.jsx(w,{fields:f,query:t,onQueryChange:a=>n(a)}),s.jsxs("p",{className:"text-sm text-muted-foreground","data-testid":"count",children:[r.length," of ",F.length," policies"]}),s.jsx(Y,{columns:ae,data:r,pageSize:5,pinFirstColumn:!1})]})},play:async({canvasElement:e,step:t})=>{const n=b(e);await t("starts unfiltered",async()=>{await m(n.getByTestId("count")).toHaveTextContent("5 of 5 policies")}),await t("add a filter, and the rows follow",async()=>{await O.click(n.getByRole("button",{name:/Add filter/})),await O.click(await re.findByRole("option",{name:"Status"})),await W(()=>m(n.getByRole("group")).toBeInTheDocument())})}},q={render:function(){const[t,n]=d.useState(()=>g([h(["status"],{operator:"is",value:"Active"})])),r=decodeURIComponent(`/policies?${be(t).toString()}`),a=H(F,t,f);return s.jsxs(_,{gap:4,children:[s.jsx(w,{fields:f,query:t,onQueryChange:n}),s.jsx("code",{"data-testid":"link",className:"block overflow-x-auto rounded-md px-3 py-2 text-xs",style:{backgroundColor:N("surface.subtle"),color:N("text.secondary")},children:r}),s.jsxs("p",{className:"text-sm text-muted-foreground","data-testid":"count",children:[a.length," of ",F.length," policies"]})]})},play:async({canvasElement:e,step:t})=>{const n=b(e);await t("the query is in the link",async()=>{await m(n.getByTestId("link")).toHaveTextContent('status:is:"Active"')}),await t("clearing it removes the key rather than leaving ?filter=",async()=>{await O.click(n.getByRole("button",{name:"Clear all"})),await W(()=>m(n.getByTestId("link")).toHaveTextContent("/policies?")),await m(n.getByTestId("link")).not.toHaveTextContent("filter=")})}},L={render:function(){const t='status:is:"Active",ghost:is:"1",premium:contains:"10"',n=z(t,f),r=H(F,n.query,f);return s.jsxs(_,{gap:4,children:[s.jsxs("code",{className:"block overflow-x-auto rounded-md px-3 py-2 text-xs",style:{backgroundColor:N("surface.subtle"),color:N("text.secondary")},children:["?filter=",t]}),s.jsx(w,{fields:f,defaultQuery:n.query}),!n.ok&&s.jsxs("p",{className:"text-sm","data-testid":"dropped",style:{color:N("text.secondary")},children:[n.dropped.length," filter(s) from this link could not be applied:"," ",n.dropped.map(a=>a.reason).join(", "),"."]}),s.jsxs("p",{className:"text-sm text-muted-foreground","data-testid":"count",children:[r.length," of ",F.length," policies"]})]})},play:async({canvasElement:e})=>{const t=b(e);await m(t.getByRole("group",{name:"Status is Active"})).toBeInTheDocument(),await m(t.getByTestId("dropped")).toHaveTextContent("unknown-field, invalid-operator")}},j={render:function(){const{query:t,setQuery:n,rows:r,count:a}=Re(F,{fields:f});return s.jsxs(_,{gap:4,children:[s.jsx(Y,{columns:ae,data:r,pageSize:5,pinFirstColumn:!1,filters:s.jsx(w,{fields:f,query:t,onQueryChange:n})}),s.jsxs("p",{className:"text-sm text-muted-foreground","data-testid":"count",children:[r.length," of ",F.length," policies, ",a," filter(s) applied"]})]})},play:async({canvasElement:e,step:t})=>{const n=b(e);await t("the filter surface is in the toolbar",async()=>{await m(n.getByRole("button",{name:/Add filter/})).toBeInTheDocument(),await m(n.getByTestId("count")).toHaveTextContent("5 of 5 policies, 0 filter(s)")}),await t("adding a filter narrows the grid",async()=>{await O.click(n.getByRole("button",{name:/Add filter/})),await O.click(await re.findByRole("option",{name:"Status"})),await W(()=>m(n.getByRole("group")).toBeInTheDocument())})}},en=["Default","SegmentedConditions","ValuelessOperator","IncompleteRule","ComplexQueryIsNotFlattened","ReadOnly","WithADataTable","ShareableLink","StaleLink","InTheDataTableToolbar"];A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Filters fields={FIELDS} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: /Add filter/
    })).toBeInTheDocument();
    await expect(canvas.queryByRole('group')).toBeNull();
  }
}`,...A.parameters?.docs?.source},description:{story:"The empty state: one control (§51).",...A.parameters?.docs?.description}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Filters fields={FIELDS} defaultQuery={createFilterQuery([createFilterRule(['status'], {
    operator: 'is',
    value: 'Active'
  }), createFilterRule(['premium'], {
    operator: 'gt',
    value: 10000
  }), createFilterRule(['risk', 'cat', 'flood'], {
    operator: 'between',
    value: {
      min: 20,
      max: 80
    }
  }), createFilterRule(['bound'], {
    operator: 'is',
    value: false
  })])} />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('every segment is its own control', async () => {
      const group = canvas.getAllByRole('group')[0];
      await expect(within(group).getByRole('button', {
        name: 'Field: Status'
      })).toBeInTheDocument();
      await expect(within(group).getByRole('button', {
        name: 'Condition: is'
      })).toBeInTheDocument();
      await expect(within(group).getByRole('button', {
        name: 'Value: Active'
      })).toBeInTheDocument();
    });
    await step('a nested field reads as its full path', async () => {
      // Exact name: the remove control also contains the path.
      await expect(canvas.getByRole('button', {
        name: 'Field: Risk › CAT › Flood'
      })).toBeInTheDocument();
    });
  }
}`,...C.parameters?.docs?.source},description:{story:`Each condition is four joined segments. Click the field to change the field,
the operator to change the operator, the value to change the value.`,...C.parameters?.docs?.description}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Filters fields={FIELDS} defaultQuery={createFilterQuery([createFilterRule(['tiv'], {
    operator: 'is_empty'
  })])} />
}`,...E.parameters?.docs?.source},description:{story:"A value-less operator renders no value segment at all (§9).",...E.parameters?.docs?.description}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Filters fields={FIELDS} defaultQuery={createFilterQuery([createFilterRule(['status'], {
    operator: 'is',
    value: 'Active'
  }), createFilterRule(['premium'])])} />
}`,...I.parameters?.docs?.source},description:{story:"Drafts stay visible and editable, and are never styled as errors (§13).",...I.parameters?.docs?.description}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <Filters fields={FIELDS} defaultQuery={createFilterQuery([createFilterRule(['status'], {
    operator: 'is',
    value: 'Active'
  }), createFilterGroup('or', [createFilterRule(['location', 'country'], {
    operator: 'is',
    value: 'BR'
  }), createFilterRule(['location', 'country'], {
    operator: 'is',
    value: 'MX'
  })])])} />
}`,...Q.parameters?.docs?.source},description:{story:"**The critical semantic guard (§24).** `A AND (B OR C)` shown as a flat row\nreads as `A AND B AND C` — a different query. Rather than flatten and lie,\nthe bar says so and leaves editing to the advanced builder.",...Q.parameters?.docs?.description}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <Filters fields={FIELDS} readOnly defaultQuery={createFilterQuery([createFilterRule(['status'], {
    operator: 'is',
    value: 'Active'
  })])} />
}`,...P.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [query, setQuery] = React.useState<FilterQuery>(() => createFilterQuery());
    const rows = applyFilterQuery(policies, query, FIELDS);
    return <Stack gap={4}>
        <Filters fields={FIELDS} query={query} onQueryChange={q => setQuery(q)} />
        <p className="text-sm text-muted-foreground" data-testid="count">
          {rows.length} of {policies.length} policies
        </p>
        <DataTable columns={columns} data={rows} pageSize={5} pinFirstColumn={false} />
      </Stack>;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('starts unfiltered', async () => {
      await expect(canvas.getByTestId('count')).toHaveTextContent('5 of 5 policies');
    });
    await step('add a filter, and the rows follow', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: /Add filter/
      }));
      await userEvent.click(await screen.findByRole('option', {
        name: 'Status'
      }));
      await waitFor(() => expect(canvas.getByRole('group')).toBeInTheDocument());
    });
  }
}`,...D.parameters?.docs?.source},description:{story:`**The whole point.** One query drives the bar and the rows, through the
pure predicate adapter (§31) — the visual layer never sees the data.`,...D.parameters?.docs?.description}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [query, setQuery] = React.useState<FilterQuery>(() => createFilterQuery([createFilterRule(['status'], {
      operator: 'is',
      value: 'Active'
    })]));
    // Shown decoded, which is what a browser puts in the address bar.
    const link = decodeURIComponent(\`/policies?\${filterQueryToSearchParams(query).toString()}\`);
    const rows = applyFilterQuery(policies, query, FIELDS);
    return <Stack gap={4}>
        <Filters fields={FIELDS} query={query} onQueryChange={setQuery} />
        <code data-testid="link" className="block overflow-x-auto rounded-md px-3 py-2 text-xs" style={{
        backgroundColor: getRoleColor('surface.subtle'),
        color: getRoleColor('text.secondary')
      }}>
          {link}
        </code>
        <p className="text-sm text-muted-foreground" data-testid="count">
          {rows.length} of {policies.length} policies
        </p>
      </Stack>;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the query is in the link', async () => {
      await expect(canvas.getByTestId('link')).toHaveTextContent('status:is:"Active"');
    });
    await step('clearing it removes the key rather than leaving ?filter=', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: 'Clear all'
      }));
      await waitFor(() => expect(canvas.getByTestId('link')).toHaveTextContent('/policies?'));
      await expect(canvas.getByTestId('link')).not.toHaveTextContent('filter=');
    });
  }
}`,...q.parameters?.docs?.source},description:{story:'**A filtered view you can send to someone (§37).** The query lives in the\nURL, so "look at this" is a link rather than "apply these six filters\nyourself" — which is how two people end up reading different numbers off\nthe same screen.\n\nThe structure stays readable: `,` is AND, `|` is OR, parentheses group.\nValues are JSON so a text field holding `123` comes back as the string\n`"123"` and not the number.',...q.parameters?.docs?.description}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    // \`ghost\` no longer exists; \`premium\` is a number, so \`contains\` is gone.
    const incoming = 'status:is:"Active",ghost:is:"1",premium:contains:"10"';
    const parsed = parseFilterQuery(incoming, FIELDS);
    const rows = applyFilterQuery(policies, parsed.query, FIELDS);
    return <Stack gap={4}>
        <code className="block overflow-x-auto rounded-md px-3 py-2 text-xs" style={{
        backgroundColor: getRoleColor('surface.subtle'),
        color: getRoleColor('text.secondary')
      }}>
          ?filter={incoming}
        </code>
        <Filters fields={FIELDS} defaultQuery={parsed.query} />
        {!parsed.ok && <p className="text-sm" data-testid="dropped" style={{
        color: getRoleColor('text.secondary')
      }}>
            {parsed.dropped.length} filter(s) from this link could not be applied:{' '}
            {parsed.dropped.map(d => d.reason).join(', ')}.
          </p>}
        <p className="text-sm text-muted-foreground" data-testid="count">
          {rows.length} of {policies.length} policies
        </p>
      </Stack>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // The good rule survives; the two stale ones are named, not silently lost.
    await expect(canvas.getByRole('group', {
      name: 'Status is Active'
    })).toBeInTheDocument();
    await expect(canvas.getByTestId('dropped')).toHaveTextContent('unknown-field, invalid-operator');
  }
}`,...L.parameters?.docs?.source},description:{story:`**A link made last quarter, opened today.** The schema moved on: one field
was removed, and one is now a number so \`contains\` no longer applies. Both
are **dropped and reported** rather than repaired — showing the recipient a
repaired query would show them different rows than the sender saw.`,...L.parameters?.docs?.description}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const {
      query,
      setQuery,
      rows,
      count
    } = useFilterQuery(policies, {
      fields: FIELDS
    });
    return <Stack gap={4}>
        <DataTable columns={columns} data={rows} pageSize={5} pinFirstColumn={false} filters={<Filters fields={FIELDS} query={query} onQueryChange={setQuery} />} />
        <p className="text-sm text-muted-foreground" data-testid="count">
          {rows.length} of {policies.length} policies, {count} filter(s) applied
        </p>
      </Stack>;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the filter surface is in the toolbar', async () => {
      await expect(canvas.getByRole('button', {
        name: /Add filter/
      })).toBeInTheDocument();
      await expect(canvas.getByTestId('count')).toHaveTextContent('5 of 5 policies, 0 filter(s)');
    });
    await step('adding a filter narrows the grid', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: /Add filter/
      }));
      await userEvent.click(await screen.findByRole('option', {
        name: 'Status'
      }));
      await waitFor(() => expect(canvas.getByRole('group')).toBeInTheDocument());
    });
  }
}`,...j.parameters?.docs?.source},description:{story:"**The integration (§56).** `Filters` sits in the toolbar's `filters` slot,\nand `useFilterQuery` turns the query into the rows passed as `data` — the\nwhole wiring is two lines.\n\nA slot rather than a schema prop, because the query system owns its own\nstate, drives rows through a pure predicate and serializes to a URL. None\nof that is the grid's business, and a prop here would mean the toolbar\nre-deriving all of it from a schema it does not own.",...j.parameters?.docs?.description}}};export{Q as ComplexQueryIsNotFlattened,A as Default,j as InTheDataTableToolbar,I as IncompleteRule,P as ReadOnly,C as SegmentedConditions,q as ShareableLink,L as StaleLink,E as ValuelessOperator,D as WithADataTable,en as __namedExportsOrder,Zt as default};
