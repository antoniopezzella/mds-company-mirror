import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./roles-DNqHlq35.js";import{n as o,t as s}from"./badge-BJRi19uA.js";import{l as c,n as l}from"./format-D3bAQugU.js";import{r as u,t as d}from"./data-table-BKV54IPo.js";import{n as f,r as p}from"./stack-BlYcYnw2.js";import{a as m,i as h,s as g}from"./filters-field-picker-DfQfK_wx.js";import{n as _,r as v}from"./filters-operators-McHzY1C8.js";import{d as y,f as b,g as ee,h as x,i as te,l as ne,m as re,n as ie,r as S,t as C,u as w,w as ae}from"./predicate-Dn6EEYSn.js";function oe(e){return JSON.stringify(e)}function T(e,t){let n=E(e,t);return n?e.negated?`!(${n})`:n:``}function E(e,t){let n=e.combinator===`or`?`|`:`,`;return e.rules.map(e=>se(e,t)).filter(Boolean).join(n)}function se(e,t){if(ae(e)){let n=E(e,t);return n?`${e.negated?`!`:``}(${n})`:``}if(!e.operator||t&&!ee(e,e=>h(t,e)))return``;let n=`${`${e.negated?`!`:``}${e.path.join(`.`)}`}:${e.operator}`;return e.value===void 0?n:`${n}:${oe(e.value)}`}function ce(e){if(!e.startsWith(`(`)||!e.endsWith(`)`))return!1;let t=0,n=!1,r=!1;for(let i=0;i<e.length;i+=1){let a=e[i];if(n)r?r=!1:a===`\\`?r=!0:a===`"`&&(n=!1);else if(a===`"`)n=!0;else if(a===`(`)t+=1;else if(a===`)`&&(--t,t===0))return i===e.length-1}return!1}function D(e,t){let n=[],r=e.trim();if(!r)return{query:y(),dropped:n,ok:!0};try{let e=r.startsWith(`!`)&&ce(r.slice(1)),i=ue(e?r.slice(2,-1):r,t,n);return{query:e?{...i,negated:!0}:i,dropped:n,ok:n.length===0}}catch{return{query:y(),dropped:[{raw:r,reason:`malformed`}],ok:!1}}}function le(e){let t=[],n=[],r=0,i=0,a=0,o=!1,s=!1,c=0;for(let l=0;l<e.length;l+=1){let u=e[l];if(o)s?s=!1:u===`\\`?s=!0:u===`"`&&(o=!1);else if(u===`"`?o=!0:u===`(`?r+=1:u===`)`?--r:u===`{`?i+=1:u===`}`?--i:u===`[`?a+=1:u===`]`?--a:r===0&&i===0&&a===0&&(u===`,`||u===`|`)&&(t.push(e.slice(c,l)),n.push(u),c=l+1),r<0||i<0||a<0)throw Error(`unbalanced`)}if(r!==0||i!==0||a!==0||o)throw Error(`unbalanced`);return t.push(e.slice(c)),{parts:t,seps:n}}function ue(e,t,n){let{parts:r,seps:i}=le(e);if(new Set(i).size>1)throw Error(`mixed combinators`);let a=i[0]===`|`?`or`:`and`,o=[];for(let e of r){let r=de(e.trim(),t,n);r&&o.push(r)}return w(a,o)}function de(e,t,n){if(!e)throw Error(`empty node`);let r=e.startsWith(`!`),i=r?e.slice(1):e;if(i.startsWith(`(`)){if(!ce(i))throw Error(`unbalanced`);let e=ue(i.slice(1,-1),t,n);return e.rules.length?r?{...e,negated:!0}:e:null}let a=i.indexOf(`:`);if(a===-1)return n.push({raw:e,reason:`malformed`}),null;let o=i.indexOf(`:`,a+1),s=i.slice(0,a),c=o===-1?i.slice(a+1):i.slice(a+1,o),l=o===-1?void 0:i.slice(o+1),u=s.split(`.`);if(!m(t,u))return n.push({raw:e,reason:`unknown-field`}),null;if(!g(t,u))return n.push({raw:e,reason:`not-filterable`}),null;let d=h(t,u),f=c,p=d?_(d,f):void 0;if(!p)return n.push({raw:e,reason:`invalid-operator`}),null;let v;if(l!==void 0){try{v=JSON.parse(l)}catch{return n.push({raw:e,reason:`invalid-value`}),null}if(!O(v))return n.push({raw:e,reason:`invalid-value`}),null}else if(p.requiresValue)return b(u,{operator:f,...r?{negated:!0}:{}});return re(p,v)?b(u,{operator:f,value:v,...r?{negated:!0}:{}}):(n.push({raw:e,reason:`invalid-value`}),null)}function O(e){return typeof e==`number`?Number.isFinite(e):Array.isArray(e)?e.every(e=>O(e)):e&&typeof e==`object`?Object.values(e).every(e=>O(e)):!0}function fe(e,t=new URLSearchParams,n=k){let r=new URLSearchParams(t),i=T(e);return i?r.set(n,i):r.delete(n),r}var k;function A(){return(A=t((()=>{v(),x(),k=`filter`})))()}function pe(e,{fields:t,defaultQuery:n,syncToUrl:r=!1,onChange:i}){let a=typeof r==`string`?r:k,o=r!==!1,[s]=j.useState(()=>!o||typeof window>`u`?``:new URLSearchParams(window.location.search).get(a)??``),[c]=j.useState(()=>s?D(s,t):{query:n??y(),dropped:[]}),[l,u]=j.useState(c.query),[d,f]=j.useState(c.dropped),p=j.useRef(!1);j.useEffect(()=>{if(!s||p.current)return;let e=D(s,t),n=T(e.query,t);u(r=>T(r,t)===n?r:e.query),f(t=>t.length===e.dropped.length&&t.every((t,n)=>t.raw===e.dropped[n].raw&&t.reason===e.dropped[n].reason)?t:e.dropped)},[s,t]);let m=j.useMemo(()=>T(l,t),[l,t]);j.useEffect(()=>{if(!o||typeof window>`u`||!m&&s&&d.length)return;let e=new URLSearchParams(window.location.search);m?e.set(a,m):e.delete(a);let t=e.toString(),n=`${window.location.pathname}${t?`?${t}`:``}${window.location.hash}`;n!==`${window.location.pathname}${window.location.search}${window.location.hash}`&&window.history.replaceState(window.history.state,``,n)},[m,a,o,s,d]);let g=j.useRef(i);g.current=i;let _=j.useCallback((e,t)=>{p.current=!0,u(e),f(e=>e.length?[]:e),g.current?.(e,t)},[]);j.useEffect(()=>{if(!o||typeof window>`u`)return;let e=()=>{let e=D(new URLSearchParams(window.location.search).get(a)??``,t);u(e.query),f(e.dropped)};return window.addEventListener(`popstate`,e),()=>window.removeEventListener(`popstate`,e)},[o,a,t]);let v=j.useCallback(e=>h(t,e),[t]);return{query:l,setQuery:_,rows:j.useMemo(()=>C(e,l,t),[e,l,t]),count:j.useMemo(()=>ne(l,v),[l,v]),serialized:m,dropped:d,reset:j.useCallback(()=>_(y()),[_])}}var j;function M(){return(M=t((()=>{j=e(n(),1),ie(),x(),A()})))()}var N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,me;function he(){return(he=t((()=>{N=e(n(),1),te(),x(),ie(),A(),M(),i(),u(),o(),p(),c(),P=r(),{expect:F,screen:I,userEvent:L,waitFor:R,within:z}=__STORYBOOK_MODULE_TEST__,B={title:`Components/Filters`,component:S,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`A **query system**, with the filter bar as one presentation of it.

Each condition is \`FIELD → OPERATOR → VALUE\`, rendered as a **segmented button group**
where every segment is independently editable — not a pill. That is what lets a filter
say "is not", "is any of" or "between"; a single chip reading \`Status: Active\` hides the
operator behind a colon and cannot express any of them.

The empty state is one \`+ Add filter\` control and nothing else.`}}}},V=[{id:`status`,label:`Status`,type:`select`,options:[{value:`Active`,label:`Active`},{value:`Pending`,label:`Pending`},{value:`Expired`,label:`Expired`}]},{id:`premium`,label:`Premium`,type:`number`,unit:`currency`},{id:`bound`,label:`Bound`,type:`boolean`,trueLabel:`Bound`,falseLabel:`Unbound`},{id:`renewal`,label:`Renewal date`,type:`date`},{id:`location`,label:`Location`,type:`select`,fields:[{id:`country`,label:`Country`,type:`select`,options:[{value:`BR`,label:`Brazil`},{value:`MX`,label:`Mexico`},{value:`US`,label:`United States`}]},{id:`city`,label:`City`,type:`text`}]},{id:`risk`,label:`Risk`,type:`select`,fields:[{id:`cat`,label:`CAT`,type:`select`,fields:[{id:`flood`,label:`Flood`,type:`number`},{id:`wind`,label:`Wind`,type:`number`}]},{id:`casualty`,label:`Casualty`,type:`number`}]},{id:`tiv`,label:`Total insured value`,type:`number`,unit:`currency`,aliases:[`TIV`]}],H={render:()=>(0,P.jsx)(S,{fields:V}),play:async({canvasElement:e})=>{let t=z(e);await F(t.getByRole(`button`,{name:/Add filter/})).toBeInTheDocument(),await F(t.queryByRole(`group`)).toBeNull()}},U={render:()=>(0,P.jsx)(S,{fields:V,defaultQuery:y([b([`status`],{operator:`is`,value:`Active`}),b([`premium`],{operator:`gt`,value:1e4}),b([`risk`,`cat`,`flood`],{operator:`between`,value:{min:20,max:80}}),b([`bound`],{operator:`is`,value:!1})])}),play:async({canvasElement:e,step:t})=>{let n=z(e);await t(`every segment is its own control`,async()=>{let e=n.getAllByRole(`group`)[0];await F(z(e).getByRole(`button`,{name:`Field: Status`})).toBeInTheDocument(),await F(z(e).getByRole(`button`,{name:`Condition: is`})).toBeInTheDocument(),await F(z(e).getByRole(`button`,{name:`Value: Active`})).toBeInTheDocument()}),await t(`a nested field reads as its full path`,async()=>{await F(n.getByRole(`button`,{name:`Field: Risk › CAT › Flood`})).toBeInTheDocument()})}},W={render:()=>(0,P.jsx)(S,{fields:V,defaultQuery:y([b([`tiv`],{operator:`is_empty`})])})},G={render:()=>(0,P.jsx)(S,{fields:V,defaultQuery:y([b([`status`],{operator:`is`,value:`Active`}),b([`premium`])])})},K={render:()=>(0,P.jsx)(S,{fields:V,defaultQuery:y([b([`status`],{operator:`is`,value:`Active`}),w(`or`,[b([`location`,`country`],{operator:`is`,value:`BR`}),b([`location`,`country`],{operator:`is`,value:`MX`})])])})},q={render:()=>(0,P.jsx)(S,{fields:V,readOnly:!0,defaultQuery:y([b([`status`],{operator:`is`,value:`Active`})])})},J=[{id:1,name:`Commercial Auto`,status:`Active`,premium:12400,bound:!0,location:{country:`BR`,city:`Rio`}},{id:2,name:`General Liability`,status:`Active`,premium:8200,bound:!0,location:{country:`US`,city:`Boise`}},{id:3,name:`Cyber Liability`,status:`Pending`,premium:15900,bound:!1,location:{country:`MX`,city:`Leon`}},{id:4,name:`Property`,status:`Active`,premium:22e3,bound:!0,location:{country:`BR`,city:`Recife`}},{id:5,name:`Workers Comp`,status:`Expired`,premium:9600,bound:!1,location:{country:`US`,city:`Reno`}}],Y=[{accessorKey:`name`,header:`Policy`},{accessorKey:`status`,header:`Status`,cell:({getValue:e})=>{let t=e();return(0,P.jsx)(s,{tone:t===`Active`?`success`:t===`Expired`?`danger`:`warning`,size:`sm`,children:t})}},{accessorKey:`premium`,header:`Premium`,meta:{type:`currency`},cell:({getValue:e})=>l(e(),{decimals:0})},{id:`country`,accessorFn:e=>e.location.country,header:`Country`}],X={render:function(){let[e,t]=N.useState(()=>y()),n=C(J,e,V);return(0,P.jsxs)(f,{gap:4,children:[(0,P.jsx)(S,{fields:V,query:e,onQueryChange:e=>t(e)}),(0,P.jsxs)(`p`,{className:`text-sm text-muted-foreground`,"data-testid":`count`,children:[n.length,` of `,J.length,` policies`]}),(0,P.jsx)(d,{columns:Y,data:n,pageSize:5,pinFirstColumn:!1})]})},play:async({canvasElement:e,step:t})=>{let n=z(e);await t(`starts unfiltered`,async()=>{await F(n.getByTestId(`count`)).toHaveTextContent(`5 of 5 policies`)}),await t(`add a filter, and the rows follow`,async()=>{await L.click(n.getByRole(`button`,{name:/Add filter/})),await L.click(await I.findByRole(`option`,{name:`Status`})),await R(()=>F(n.getByRole(`group`)).toBeInTheDocument())})}},Z={render:function(){let[e,t]=N.useState(()=>y([b([`status`],{operator:`is`,value:`Active`})])),n=decodeURIComponent(`/policies?${fe(e).toString()}`),r=C(J,e,V);return(0,P.jsxs)(f,{gap:4,children:[(0,P.jsx)(S,{fields:V,query:e,onQueryChange:t}),(0,P.jsx)(`code`,{"data-testid":`link`,className:`block overflow-x-auto rounded-md px-3 py-2 text-xs`,style:{backgroundColor:a(`bg.neutral.subtle`),color:a(`fg.neutral.subtle`)},children:n}),(0,P.jsxs)(`p`,{className:`text-sm text-muted-foreground`,"data-testid":`count`,children:[r.length,` of `,J.length,` policies`]})]})},play:async({canvasElement:e,step:t})=>{let n=z(e);await t(`the query is in the link`,async()=>{await F(n.getByTestId(`link`)).toHaveTextContent(`status:is:"Active"`)}),await t(`clearing it removes the key rather than leaving ?filter=`,async()=>{await L.click(n.getByRole(`button`,{name:`Clear all`})),await R(()=>F(n.getByTestId(`link`)).toHaveTextContent(`/policies?`)),await F(n.getByTestId(`link`)).not.toHaveTextContent(`filter=`)})}},Q={render:function(){let e=`status:is:"Active",ghost:is:"1",premium:contains:"10"`,t=D(e,V),n=C(J,t.query,V);return(0,P.jsxs)(f,{gap:4,children:[(0,P.jsxs)(`code`,{className:`block overflow-x-auto rounded-md px-3 py-2 text-xs`,style:{backgroundColor:a(`bg.neutral.subtle`),color:a(`fg.neutral.subtle`)},children:[`?filter=`,e]}),(0,P.jsx)(S,{fields:V,defaultQuery:t.query}),!t.ok&&(0,P.jsxs)(`p`,{className:`text-sm`,"data-testid":`dropped`,style:{color:a(`fg.neutral.subtle`)},children:[t.dropped.length,` filter(s) from this link could not be applied:`,` `,t.dropped.map(e=>e.reason).join(`, `),`.`]}),(0,P.jsxs)(`p`,{className:`text-sm text-muted-foreground`,"data-testid":`count`,children:[n.length,` of `,J.length,` policies`]})]})},play:async({canvasElement:e})=>{let t=z(e);await F(t.getByRole(`group`,{name:`Status is Active`})).toBeInTheDocument(),await F(t.getByTestId(`dropped`)).toHaveTextContent(`unknown-field, invalid-operator`)}},$={render:function(){let{query:e,setQuery:t,rows:n,count:r}=pe(J,{fields:V});return(0,P.jsxs)(f,{gap:4,children:[(0,P.jsx)(d,{columns:Y,data:n,pageSize:5,pinFirstColumn:!1,filters:(0,P.jsx)(S,{fields:V,query:e,onQueryChange:t})}),(0,P.jsxs)(`p`,{className:`text-sm text-muted-foreground`,"data-testid":`count`,children:[n.length,` of `,J.length,` policies, `,r,` filter(s) applied`]})]})},play:async({canvasElement:e,step:t})=>{let n=z(e);await t(`the filter surface is in the toolbar`,async()=>{await F(n.getByRole(`button`,{name:/Add filter/})).toBeInTheDocument(),await F(n.getByTestId(`count`)).toHaveTextContent(`5 of 5 policies, 0 filter(s)`)}),await t(`adding a filter narrows the grid`,async()=>{await L.click(n.getByRole(`button`,{name:/Add filter/})),await L.click(await I.findByRole(`option`,{name:`Status`})),await R(()=>F(n.getByRole(`group`)).toBeInTheDocument())})}},me=[`Default`,`SegmentedConditions`,`ValuelessOperator`,`IncompleteRule`,`ComplexQueryIsNotFlattened`,`ReadOnly`,`WithADataTable`,`ShareableLink`,`StaleLink`,`InTheDataTableToolbar`],H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source},description:{story:`The empty state: one control (§51).`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source},description:{story:`Each condition is four joined segments. Click the field to change the field,
the operator to change the operator, the value to change the value.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <Filters fields={FIELDS} defaultQuery={createFilterQuery([createFilterRule(['tiv'], {
    operator: 'is_empty'
  })])} />
}`,...W.parameters?.docs?.source},description:{story:`A value-less operator renders no value segment at all (§9).`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <Filters fields={FIELDS} defaultQuery={createFilterQuery([createFilterRule(['status'], {
    operator: 'is',
    value: 'Active'
  }), createFilterRule(['premium'])])} />
}`,...G.parameters?.docs?.source},description:{story:`Drafts stay visible and editable, and are never styled as errors (§13).`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source},description:{story:"**The critical semantic guard (§24).** `A AND (B OR C)` shown as a flat row\nreads as `A AND B AND C` — a different query. Rather than flatten and lie,\nthe bar says so and leaves editing to the advanced builder.",...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <Filters fields={FIELDS} readOnly defaultQuery={createFilterQuery([createFilterRule(['status'], {
    operator: 'is',
    value: 'Active'
  })])} />
}`,...q.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
}`,...X.parameters?.docs?.source},description:{story:`**The whole point.** One query drives the bar and the rows, through the
pure predicate adapter (§31) — the visual layer never sees the data.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
        backgroundColor: getRoleColor('bg.neutral.subtle'),
        color: getRoleColor('fg.neutral.subtle')
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
}`,...Z.parameters?.docs?.source},description:{story:'**A filtered view you can send to someone (§37).** The query lives in the\nURL, so "look at this" is a link rather than "apply these six filters\nyourself" — which is how two people end up reading different numbers off\nthe same screen.\n\nThe structure stays readable: `,` is AND, `|` is OR, parentheses group.\nValues are JSON so a text field holding `123` comes back as the string\n`"123"` and not the number.',...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    // \`ghost\` no longer exists; \`premium\` is a number, so \`contains\` is gone.
    const incoming = 'status:is:"Active",ghost:is:"1",premium:contains:"10"';
    const parsed = parseFilterQuery(incoming, FIELDS);
    const rows = applyFilterQuery(policies, parsed.query, FIELDS);
    return <Stack gap={4}>
        <code className="block overflow-x-auto rounded-md px-3 py-2 text-xs" style={{
        backgroundColor: getRoleColor('bg.neutral.subtle'),
        color: getRoleColor('fg.neutral.subtle')
      }}>
          ?filter={incoming}
        </code>
        <Filters fields={FIELDS} defaultQuery={parsed.query} />
        {!parsed.ok && <p className="text-sm" data-testid="dropped" style={{
        color: getRoleColor('fg.neutral.subtle')
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
}`,...Q.parameters?.docs?.source},description:{story:`**A link made last quarter, opened today.** The schema moved on: one field
was removed, and one is now a number so \`contains\` no longer applies. Both
are **dropped and reported** rather than repaired — showing the recipient a
repaired query would show them different rows than the sender saw.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
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
}`,...$.parameters?.docs?.source},description:{story:"**The integration (§56).** `Filters` sits in the toolbar's `filters` slot,\nand `useFilterQuery` turns the query into the rows passed as `data` — the\nwhole wiring is two lines.\n\nA slot rather than a schema prop, because the query system owns its own\nstate, drives rows through a pure predicate and serializes to a URL. None\nof that is the grid's business, and a prop here would mean the toolbar\nre-deriving all of it from a schema it does not own.",...$.parameters?.docs?.description}}}})))()}he();export{K as ComplexQueryIsNotFlattened,H as Default,$ as InTheDataTableToolbar,G as IncompleteRule,q as ReadOnly,U as SegmentedConditions,Z as ShareableLink,Q as StaleLink,W as ValuelessOperator,X as WithADataTable,me as __namedExportsOrder,B as default};