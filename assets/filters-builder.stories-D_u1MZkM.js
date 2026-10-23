import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{i,n as a}from"./roles-DNqHlq35.js";import{n as o,t as s}from"./utils-BGgJixJd.js";import{n as c,t as l}from"./createLucideIcon-DC6xoXt7.js";import{n as u,t as d}from"./chevron-down-CEFyREoU.js";import{n as f,t as ee}from"./ellipsis-vertical-CLUt3_RB.js";import{n as p,t as te}from"./plus-DkAhYuaT.js";import{n as m,t as h}from"./button-DatWLSj0.js";import{c as g,d as _,i as v,o as y,r as b,s as x,t as S,u as C}from"./dropdown-menu-XOwViH9b.js";import{i as w,n as ne,r as re,t as ie}from"./popover-C9G4hO1p.js";import{n as T,r as E}from"./stack-BlYcYnw2.js";import{l as ae,o as D,r as O,s as k,t as A}from"./card-tXlEGCFr.js";import{i as oe,n as se,r as ce,t as le}from"./filters-field-picker-DfQfK_wx.js";import{n as ue,r as de,t as fe}from"./filters-operators-McHzY1C8.js";import{E as pe,S as me,T as he,_ as ge,a as _e,b as ve,c as ye,d as j,f as M,h as be,i as xe,l as Se,n as Ce,o as we,p as Te,r as Ee,s as De,t as Oe,u as N,v as ke,w as Ae,x as je,y as Me}from"./predicate-Dn6EEYSn.js";var Ne,Pe;function Fe(){return(Fe=t((()=>{c(),Ne=[[`path`,{d:`M12 10v6`,key:`1bos4e`}],[`path`,{d:`M9 13h6`,key:`1uhe8q`}],[`path`,{d:`M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z`,key:`1kt360`}]],Pe=l(`folder-plus`,Ne)})))()}function Ie({combinator:e,onChange:t,label:n,andLabel:r,orLabel:i}){let a=e===`and`?r:i;return(0,F.jsxs)(S,{children:[(0,F.jsx)(C,{asChild:!0,children:(0,F.jsxs)(h,{variant:`outline`,size:`sm`,"aria-label":`${n}: ${a}`,className:`w-full justify-between`,children:[a,(0,F.jsx)(d,{className:`size-3 opacity-60`,"aria-hidden":`true`})]})}),(0,F.jsx)(b,{align:`start`,className:`min-w-28`,children:(0,F.jsxs)(y,{value:e,onValueChange:e=>t(e),children:[(0,F.jsx)(x,{value:`and`,children:r}),(0,F.jsx)(x,{value:`or`,children:i})]})})]})}function Le(...e){return t=>{for(let n of e)typeof n==`function`?n(t):n&&typeof n==`object`&&(n.current=t)}}var P,F,Re,I;function ze(){return(ze=t((()=>{P=e(n(),1),u(),Fe(),f(),p(),o(),a(),m(),w(),_(),se(),pe(),F=r(),Re={where:`Where`,and:`And`,or:`Or`,addCondition:`Add condition`,addGroup:`Add group`,removeGroup:`Remove group`,duplicateGroup:`Duplicate group`,negateGroup:`Negate group`,ungroup:`Ungroup`,groupActions:`Group actions`,combinator:`How these conditions combine`,depthLimit:`Groups cannot be nested any deeper.`,ungroupUnsafe:`Ungrouping would change what this query means.`,not:`NOT`,empty:`No conditions yet.`},I=P.forwardRef(function({group:e,fields:t,addRef:n,depth:r,maxDepth:a,isRoot:o=!1,editors:c,size:l=`sm`,readOnly:u=!1,disabled:d=!1,messages:f,...p},m){let _={...Re,...f},[y,x]=P.useState(!1),w=P.useRef(null),T=u||d,E=P.useRef(null),ae=()=>requestAnimationFrame(()=>E.current?.focus()),D=e=>{p.onRemoveNode(e),ae()},O=e.combinator===`and`?_.and:_.or,k=[e.negated?_.not:null,e.combinator===`and`?`All of the following`:`Any of the following`].filter(Boolean).join(` `),A=r>=a;return(0,F.jsxs)(`div`,{ref:m,"data-slot":`filters-group`,"data-combinator":e.combinator,"data-depth":r,role:`group`,"aria-label":k,className:s(`flex flex-col gap-2`,!o&&`rounded-lg border p-3`),style:o?void 0:{borderColor:e.negated?i(`border.critical`):i(`border.subtle`),backgroundColor:i(`bg.neutral.subtle`)},children:[e.negated&&!o&&(0,F.jsx)(`p`,{className:`text-xs font-semibold tracking-wide`,style:{color:i(`fg.critical`)},children:_.not}),e.rules.length===0&&(0,F.jsx)(`p`,{className:`text-sm`,style:{color:i(`fg.neutral.subtle`)},children:_.empty}),e.rules.map((n,o)=>(0,F.jsxs)(`div`,{className:`flex items-start gap-2`,children:[(0,F.jsx)(`div`,{className:`w-20 shrink-0 pt-1`,children:o===0?(0,F.jsx)(`span`,{className:`text-sm`,style:{color:i(`fg.neutral.subtle`)},children:_.where}):o===1&&!T?(0,F.jsx)(Ie,{combinator:e.combinator,onChange:t=>p.onSetCombinator(e.id,t),label:_.combinator,andLabel:_.and,orLabel:_.or}):(0,F.jsx)(`span`,{className:`text-sm`,style:{color:i(`fg.neutral.subtle`)},"aria-hidden":`true`,children:O})}),(0,F.jsx)(`div`,{className:`min-w-0 flex-1`,children:Ae(n)?(0,F.jsx)(I,{...p,group:n,fields:t,depth:r+1,maxDepth:a,editors:c,size:l,readOnly:u,disabled:d,messages:f}):(0,F.jsx)(he,{rule:n,fields:t,editors:c,size:l,messages:f,readOnly:u,disabled:d,onChangeField:e=>p.onChangeField(n.id,e),onChangeOperator:e=>p.onChangeOperator(n.id,e),onChangeValue:e=>p.onChangeValue(n.id,e),onDuplicate:()=>p.onDuplicateNode(n.id),onNegate:()=>p.onNegateNode(n.id),onGroup:A?void 0:()=>p.onWrapInGroup(n.id),onRemove:()=>D(n.id)})})]},n.id)),!T&&(0,F.jsxs)(`div`,{className:s(`flex items-center gap-2`,o?`ps-20`:`ps-0`),children:[(0,F.jsxs)(ie,{open:y,onOpenChange:x,children:[(0,F.jsx)(re,{asChild:!0,children:(0,F.jsxs)(h,{ref:Le(E,n),variant:`tertiary`,size:l,children:[(0,F.jsx)(te,{className:`size-3.5`,"aria-hidden":`true`}),_.addCondition]})}),(0,F.jsx)(ne,{align:`start`,className:`w-auto p-2`,"aria-label":_.addCondition,onEscapeKeyDown:e=>{w.current?.handleEscape()&&e.preventDefault()},children:(0,F.jsx)(le,{fields:t,handleRef:w,searchPlaceholder:f?.searchPlaceholder,onSelect:t=>{p.onAddRule(e.id,t),x(!1)}})})]}),(0,F.jsxs)(h,{variant:`tertiary`,size:l,disabled:A,onClick:()=>p.onAddGroup(e.id),title:A?_.depthLimit:void 0,"aria-describedby":A?`depth-${e.id}`:void 0,children:[(0,F.jsx)(Pe,{className:`size-3.5`,"aria-hidden":`true`}),_.addGroup]}),A&&(0,F.jsx)(`span`,{id:`depth-${e.id}`,className:`sr-only`,children:_.depthLimit}),!o&&(0,F.jsxs)(S,{children:[(0,F.jsx)(C,{asChild:!0,children:(0,F.jsx)(h,{variant:`tertiary`,size:l,iconOnly:!0,icon:(0,F.jsx)(ee,{className:`size-3.5`,"aria-hidden":`true`}),"aria-label":_.groupActions,className:`ms-auto`})}),(0,F.jsxs)(b,{align:`start`,className:`min-w-44`,children:[(0,F.jsx)(v,{onSelect:()=>p.onDuplicateNode(e.id),children:_.duplicateGroup}),(0,F.jsx)(v,{onSelect:()=>p.onNegateNode(e.id),children:_.negateGroup}),p.canUngroup(e.id)&&(0,F.jsx)(v,{onSelect:()=>p.onUngroup(e.id),children:_.ungroup}),(0,F.jsx)(g,{}),(0,F.jsx)(v,{onSelect:()=>p.onRemoveNode(e.id),style:{color:i(`fg.critical`)},children:_.removeGroup})]})]})]})]})}),I.displayName=`FiltersGroup`,I.__docgenInfo={description:``,methods:[],displayName:`FiltersGroup`,props:{onAddRule:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(groupId: string, path: string[]) => void`,signature:{arguments:[{type:{name:`string`},name:`groupId`},{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`path`}],return:{name:`void`}}},description:``},onAddGroup:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(groupId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`groupId`}],return:{name:`void`}}},description:``},onSetCombinator:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(groupId: string, combinator: 'and' | 'or') => void`,signature:{arguments:[{type:{name:`string`},name:`groupId`},{type:{name:`union`,raw:`'and' | 'or'`,elements:[{name:`literal`,value:`'and'`},{name:`literal`,value:`'or'`}]},name:`combinator`}],return:{name:`void`}}},description:``},onRemoveNode:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},onDuplicateNode:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},onNegateNode:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},onUngroup:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},onWrapInGroup:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},onChangeField:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string, path: string[]) => void`,signature:{arguments:[{type:{name:`string`},name:`id`},{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`path`}],return:{name:`void`}}},description:``},onChangeOperator:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string, operator: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`},{type:{name:`string`},name:`operator`}],return:{name:`void`}}},description:``},onChangeValue:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string, value: unknown) => void`,signature:{arguments:[{type:{name:`string`},name:`id`},{type:{name:`unknown`},name:`value`}],return:{name:`void`}}},description:``},canUngroup:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string) => boolean`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`boolean`}}},description:`Ungroup is hidden, not broken, where it would rewrite the query (§24).`},group:{required:!0,tsType:{name:`FilterGroup`},description:``},addRef:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:`The root group forwards this so "Clear all" has somewhere to land.`},fields:{required:!0,tsType:{name:`Array`,elements:[{name:`FilterField`}],raw:`FilterField[]`},description:``},depth:{required:!0,tsType:{name:`number`},description:`1 for the root.`},maxDepth:{required:!0,tsType:{name:`number`},description:``},isRoot:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},editors:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`ReactComponentType`,raw:`React.ComponentType<FiltersValueEditorProps>`,elements:[{name:`FiltersValueEditorProps`}]}],raw:`Record<string, React.ComponentType<FiltersValueEditorProps>>`},description:"Custom value editors, keyed by a field's `editor` name (§11).\n\nThe mechanism existed in `FiltersValueEditor` and was unreachable: no\ncomponent threaded it, so `field.editor` was inert unless a consumer\nbypassed the whole component and rendered the editor themselves."},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md' | 'lg'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`},{name:`literal`,value:`'lg'`}]},description:``,defaultValue:{value:`'sm'`,computed:!1}},readOnly:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},messages:{required:!1,tsType:{name:`Partial`,elements:[{name:`intersection`,raw:`FiltersGroupMessages & NonNullable<FiltersRuleProps['messages']>`,elements:[{name:`FiltersGroupMessages`},{name:`NonNullable`,elements:[{name:`FiltersRuleProps['messages']`,raw:`FiltersRuleProps['messages']`}],raw:`NonNullable<FiltersRuleProps['messages']>`}]}],raw:`Partial<FiltersGroupMessages & NonNullable<FiltersRuleProps['messages']>>`},description:``}}}})))()}function Be(e,t){for(let n of e.rules){if(n.id===t&&n.type===`rule`)return n.path;if(n.type===`group`){let e=Be(n,t);if(e)return e}}}var L,R,Ve,z;function B(){return(B=t((()=>{L=e(n(),1),o(),a(),m(),ze(),be(),de(),R=r(),Ve={clearAll:`Clear all`,summaryOne:`1 condition`,summaryMany:`{count} conditions`,builder:`Advanced filters`},z=L.forwardRef(function({fields:e,query:t,defaultQuery:n,onQueryChange:r,maxDepth:a=3,editors:o,size:c=`sm`,readOnly:l=!1,disabled:u=!1,className:d,messages:f},ee){let p={...Ve,...f},[te,m]=L.useState(()=>n??j()),g=L.useRef(null),_=L.useRef(null),v=t!==void 0,y=v?t:te,b=L.useCallback(t=>oe(e,t),[e]),x=Se(y,b),S=e=>{g.current&&(g.current.textContent=e)},C=(e,t)=>{v||m(e),r?.(e,t)};return(0,R.jsxs)(`div`,{ref:ee,"data-slot":`filters-builder`,className:s(`flex flex-col gap-3`,d),role:`search`,"aria-label":p.builder,children:[(0,R.jsx)(`div`,{ref:g,role:`status`,"aria-live":`polite`,className:`sr-only`}),(0,R.jsx)(I,{onAddRule:(t,n)=>{let r=b(n),i=M(n,{operator:r?fe(r):void 0});C(_e(y,i,t),{reason:`add`,nodeId:i.id,fieldPath:n}),S(`Condition added: ${ce(e,n)}.`)},onAddGroup:e=>{let t=N(`or`);C(_e(y,t,e),{reason:`group-add`,nodeId:t.id}),S(`Group added.`)},onSetCombinator:(e,t)=>{C(Me(y,e,t),{reason:`combinator`,nodeId:e}),S(t===`and`?`Matching all conditions.`:`Matching any condition.`)},onRemoveNode:e=>{C(ke(y,e),{reason:`remove`,nodeId:e}),S(`Removed.`)},onDuplicateNode:e=>{C(Te(y,e),{reason:`duplicate`,nodeId:e}),S(`Duplicated.`)},onNegateNode:e=>{C(ge(y,e),{reason:`negate`,nodeId:e}),S(`Negation toggled.`)},onUngroup:e=>{C(ve(y,e),{reason:`group-remove`,nodeId:e}),S(`Group dissolved.`)},onWrapInGroup:e=>{C(me(y,e,`or`),{reason:`group-add`,nodeId:e}),S(`Condition moved into a new group.`)},onChangeField:(e,t)=>{let n=b(t);C(De(y,e,t,n??`text`),{reason:`update`,nodeId:e,fieldPath:t})},onChangeOperator:(t,n)=>{let r=Be(y,t),i=r?b(r):void 0;C(ye(y,t,n,i??`text`),{reason:`update`,nodeId:t,fieldPath:r}),r&&S(`${ce(e,r)} condition changed to ${ue(i??`text`,n)?.label??n}.`)},onChangeValue:(e,t)=>{C(je(y,e,{value:t}),{reason:`update`,nodeId:e})},canUngroup:e=>we(y,e),group:y,fields:e,addRef:_,depth:1,maxDepth:a,isRoot:!0,editors:o,size:c,readOnly:l,disabled:u,messages:f}),x>0&&(0,R.jsxs)(`div`,{className:`flex items-center justify-between gap-2`,children:[(0,R.jsx)(`p`,{className:`text-sm`,style:{color:i(`fg.neutral.subtle`)},children:x===1?p.summaryOne:p.summaryMany.replace(`{count}`,String(x))}),!l&&(0,R.jsx)(h,{variant:`tertiary`,size:c,disabled:u,onClick:()=>{C(j(),{reason:`clear`}),S(`All filters cleared.`),requestAnimationFrame(()=>_.current?.focus())},children:p.clearAll})]})]})}),z.displayName=`FiltersBuilder`,z.__docgenInfo={description:``,methods:[],displayName:`FiltersBuilder`,props:{fields:{required:!0,tsType:{name:`Array`,elements:[{name:`FilterField`}],raw:`FilterField[]`},description:``},query:{required:!1,tsType:{name:`FilterGroup`},description:`Controlled (§32).`},defaultQuery:{required:!1,tsType:{name:`FilterGroup`},description:`Uncontrolled starting point (§33).`},onQueryChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(query: FilterQuery, meta: FilterQueryChangeMeta) => void`,signature:{arguments:[{type:{name:`FilterGroup`},name:`query`},{type:{name:`FilterQueryChangeMeta`},name:`meta`}],return:{name:`void`}}},description:``},maxDepth:{required:!1,tsType:{name:`number`},description:`Nesting levels allowed, root included. Default 3.`,defaultValue:{value:`3`,computed:!1}},editors:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`ReactComponentType`,raw:`React.ComponentType<FiltersValueEditorProps>`,elements:[{name:`FiltersValueEditorProps`}]}],raw:`Record<string, React.ComponentType<FiltersValueEditorProps>>`},description:"Custom value editors, keyed by a field's `editor` name (§11).\n\nThe mechanism existed in `FiltersValueEditor` and was unreachable: no\ncomponent threaded it, so `field.editor` was inert unless a consumer\nbypassed the whole component and rendered the editor themselves."},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md' | 'lg'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`},{name:`literal`,value:`'lg'`}]},description:``,defaultValue:{value:`'sm'`,computed:!1}},readOnly:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},messages:{required:!1,tsType:{name:`Partial`,elements:[{name:`intersection`,raw:`FiltersGroupMessages &
  NonNullable<FiltersRuleProps['messages']> & {
  clearAll: string;
  summaryOne: string;
  /** \`{count}\` is substituted. */
  summaryMany: string;
  builder: string;
}`,elements:[{name:`FiltersGroupMessages`},{name:`NonNullable`,elements:[{name:`FiltersRuleProps['messages']`,raw:`FiltersRuleProps['messages']`}],raw:`NonNullable<FiltersRuleProps['messages']>`},{name:`signature`,type:`object`,raw:`{
  clearAll: string;
  summaryOne: string;
  /** \`{count}\` is substituted. */
  summaryMany: string;
  builder: string;
}`,signature:{properties:[{key:`clearAll`,value:{name:`string`,required:!0}},{key:`summaryOne`,value:{name:`string`,required:!0}},{key:`summaryMany`,value:{name:`string`,required:!0},description:"`{count}` is substituted."},{key:`builder`,value:{name:`string`,required:!0}}]}}]}],raw:`Partial<
  FiltersGroupMessages &
    NonNullable<FiltersRuleProps['messages']> & {
    clearAll: string;
    summaryOne: string;
    /** \`{count}\` is substituted. */
    summaryMany: string;
    builder: string;
  }
>`},description:``}}}})))()}var V,H,U,He,W,Ue,G,K,q,J,Y,X,Z,Q,$,We;function Ge(){return(Ge=t((()=>{V=e(n(),1),xe(),B(),be(),Ce(),ae(),E(),H=r(),{expect:U,userEvent:He,within:W}=__STORYBOOK_MODULE_TEST__,Ue={title:`Components/Filters Builder`,component:z,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`The **advanced builder** — where the flat filter bar’s refusal lands.

The bar declines to edit \`A AND (B OR C)\`, because three conditions in a row read as
\`A AND B AND C\` — a different query. That refusal is only honest if somewhere can
actually edit it. This is that somewhere, driving **the same query model**, not a second
representation that has to be kept in sync.

**The combinator belongs to the group, not to each row.** A per-row And/Or dropdown is the
common design and it misrepresents this model: it invites setting row 2 to OR and row 3 to
AND inside one group, which has no single meaning. So the control appears once, on the
second row, where the relationship it describes first exists.

**Nesting is bounded and the bound is visible.** Indentation runs out of room around four
levels, so \`Add group\` disables at the limit and says why rather than silently no-oping.`}}}},G=[{id:`status`,label:`Status`,type:`select`,options:[{value:`Active`,label:`Active`},{value:`Pending`,label:`Pending`},{value:`Expired`,label:`Expired`}]},{id:`premium`,label:`Premium`,type:`number`,unit:`currency`},{id:`tiv`,label:`Total insured value`,type:`number`,unit:`currency`,aliases:[`TIV`]},{id:`bound`,label:`Bound`,type:`boolean`,trueLabel:`Bound`,falseLabel:`Unbound`},{id:`location`,label:`Location`,type:`select`,fields:[{id:`country`,label:`Country`,type:`select`,options:[{value:`BR`,label:`Brazil`},{value:`MX`,label:`Mexico`},{value:`US`,label:`United States`}]},{id:`city`,label:`City`,type:`text`}]}],K={render:()=>(0,H.jsx)(z,{fields:G})},q={render:()=>(0,H.jsx)(z,{fields:G,defaultQuery:j([M([`status`],{operator:`is`,value:`Active`}),N(`or`,[M([`location`,`country`],{operator:`is`,value:`BR`}),M([`location`,`country`],{operator:`is`,value:`MX`})])])}),play:async({canvasElement:e,step:t})=>{let n=W(e);await t(`the OR group is nested inside the AND root`,async()=>{let e=n.getByRole(`group`,{name:`All of the following`});await U(W(e).getByRole(`group`,{name:`Any of the following`})).toBeInTheDocument()}),await t(`the count is conditions, not nodes`,async()=>{await U(n.getByText(`3 conditions`)).toBeInTheDocument()})}},J={render:function(){let[e,t]=V.useState(!1),[n,r]=V.useState(()=>j([M([`status`],{operator:`is`,value:`Active`}),N(`or`,[M([`premium`],{operator:`gt`,value:2e4}),M([`tiv`],{operator:`lt`,value:5e5})])]));return(0,H.jsxs)(T,{gap:4,children:[(0,H.jsxs)(A,{children:[(0,H.jsx)(D,{children:(0,H.jsx)(k,{children:`Filter bar`})}),(0,H.jsx)(O,{children:(0,H.jsx)(Ee,{fields:G,query:n,onQueryChange:r,onEditAdvanced:()=>t(!0)})})]}),e&&(0,H.jsxs)(A,{children:[(0,H.jsx)(D,{children:(0,H.jsx)(k,{children:`Advanced builder`})}),(0,H.jsx)(O,{children:(0,H.jsx)(z,{fields:G,query:n,onQueryChange:r})})]})]})},play:async({canvasElement:e,step:t})=>{let n=W(e);await t(`the bar refuses, and offers the route`,async()=>{await U(n.getByText(/cannot be edited here/)).toBeInTheDocument(),await He.click(n.getByRole(`button`,{name:`Edit in advanced builder`}))}),await t(`the builder edits the very same query`,async()=>{await U(n.getByRole(`group`,{name:`Any of the following`})).toBeInTheDocument()})}},Y={render:()=>(0,H.jsx)(z,{fields:G,defaultQuery:j([M([`status`],{operator:`is`,value:`Active`}),{...N(`or`,[M([`location`,`country`],{operator:`is`,value:`BR`}),M([`location`,`country`],{operator:`is`,value:`MX`})]),negated:!0}])})},X={render:()=>(0,H.jsx)(z,{fields:G,maxDepth:1}),play:async({canvasElement:e})=>{let t=W(e);await U(t.getByRole(`button`,{name:`Add group`})).toBeDisabled(),await U(t.getByText(`Groups cannot be nested any deeper.`)).toBeInTheDocument()}},Z={render:()=>(0,H.jsx)(z,{fields:G,readOnly:!0,defaultQuery:j([M([`status`],{operator:`is`,value:`Active`}),N(`or`,[M([`location`,`country`],{operator:`is`,value:`BR`}),M([`location`,`country`],{operator:`is`,value:`MX`})])])})},Q=[{id:1,name:`Commercial Auto`,status:`Active`,premium:12400,location:{country:`BR`,city:`Rio`}},{id:2,name:`General Liability`,status:`Active`,premium:8200,location:{country:`US`,city:`Boise`}},{id:3,name:`Cyber Liability`,status:`Pending`,premium:15900,location:{country:`MX`,city:`Leon`}},{id:4,name:`Property`,status:`Active`,premium:22e3,location:{country:`BR`,city:`Recife`}},{id:5,name:`Workers Comp`,status:`Expired`,premium:9600,location:{country:`US`,city:`Reno`}}],$={render:function(){let[e,t]=V.useState(()=>j([M([`status`],{operator:`is`,value:`Active`}),N(`or`,[M([`location`,`country`],{operator:`is`,value:`BR`}),M([`location`,`country`],{operator:`is`,value:`MX`})])])),n=Oe(Q,e,G);return(0,H.jsxs)(T,{gap:4,children:[(0,H.jsx)(z,{fields:G,query:e,onQueryChange:t}),(0,H.jsxs)(`p`,{className:`text-sm text-muted-foreground`,"data-testid":`count`,children:[n.length,` of `,Q.length,` policies`]}),(0,H.jsx)(`ul`,{className:`text-sm`,children:n.map(e=>(0,H.jsxs)(`li`,{children:[e.name,` — `,e.location.country]},e.id))})]})},play:async({canvasElement:e})=>{let t=W(e);await U(t.getByTestId(`count`)).toHaveTextContent(`2 of 5 policies`)}},We=[`Default`,`NestedGroup`,`TheRouteFromTheBar`,`NegatedGroup`,`DepthLimitReached`,`ReadOnly`,`GroupingChangesTheResult`],K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <FiltersBuilder fields={FIELDS} />
}`,...K.parameters?.docs?.source},description:{story:`Nothing set yet: one condition control, one group control.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <FiltersBuilder fields={FIELDS} defaultQuery={createFilterQuery([createFilterRule(['status'], {
    operator: 'is',
    value: 'Active'
  }), createFilterGroup('or', [createFilterRule(['location', 'country'], {
    operator: 'is',
    value: 'BR'
  }), createFilterRule(['location', 'country'], {
    operator: 'is',
    value: 'MX'
  })])])} />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the OR group is nested inside the AND root', async () => {
      const root = canvas.getByRole('group', {
        name: 'All of the following'
      });
      await expect(within(root).getByRole('group', {
        name: 'Any of the following'
      })).toBeInTheDocument();
    });
    await step('the count is conditions, not nodes', async () => {
      await expect(canvas.getByText('3 conditions')).toBeInTheDocument();
    });
  }
}`,...q.parameters?.docs?.source},description:{story:`**The query the flat bar cannot draw.** Active policies in Brazil *or*
Mexico — the OR is contained, and the containment is visible.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [advanced, setAdvanced] = React.useState(false);
    const [query, setQuery] = React.useState<FilterQuery>(() => createFilterQuery([createFilterRule(['status'], {
      operator: 'is',
      value: 'Active'
    }), createFilterGroup('or', [createFilterRule(['premium'], {
      operator: 'gt',
      value: 20000
    }), createFilterRule(['tiv'], {
      operator: 'lt',
      value: 500000
    })])]));
    return <Stack gap={4}>
        <Card>
          <CardHeader>
            <CardTitle>Filter bar</CardTitle>
          </CardHeader>
          <CardContent>
            <Filters fields={FIELDS} query={query} onQueryChange={setQuery} onEditAdvanced={() => setAdvanced(true)} />
          </CardContent>
        </Card>
        {advanced && <Card>
            <CardHeader>
              <CardTitle>Advanced builder</CardTitle>
            </CardHeader>
            <CardContent>
              <FiltersBuilder fields={FIELDS} query={query} onQueryChange={setQuery} />
            </CardContent>
          </Card>}
      </Stack>;
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the bar refuses, and offers the route', async () => {
      await expect(canvas.getByText(/cannot be edited here/)).toBeInTheDocument();
      await userEvent.click(canvas.getByRole('button', {
        name: 'Edit in advanced builder'
      }));
    });
    await step('the builder edits the very same query', async () => {
      await expect(canvas.getByRole('group', {
        name: 'Any of the following'
      })).toBeInTheDocument();
    });
  }
}`,...J.parameters?.docs?.source},description:{story:`**The same query, both presentations.** The bar states what it cannot safely
edit and hands over; the builder edits it. One model underneath.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <FiltersBuilder fields={FIELDS} defaultQuery={createFilterQuery([createFilterRule(['status'], {
    operator: 'is',
    value: 'Active'
  }), {
    ...createFilterGroup('or', [createFilterRule(['location', 'country'], {
      operator: 'is',
      value: 'BR'
    }), createFilterRule(['location', 'country'], {
      operator: 'is',
      value: 'MX'
    })]),
    negated: true
  }])} />
}`,...Y.parameters?.docs?.source},description:{story:`Negation applies to the whole group: *not* (Brazil or Mexico).`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <FiltersBuilder fields={FIELDS} maxDepth={1} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Add group'
    })).toBeDisabled();
    await expect(canvas.getByText('Groups cannot be nested any deeper.')).toBeInTheDocument();
  }
}`,...X.parameters?.docs?.source},description:{story:"At the limit, `Add group` is disabled and carries its reason.",...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <FiltersBuilder fields={FIELDS} readOnly defaultQuery={createFilterQuery([createFilterRule(['status'], {
    operator: 'is',
    value: 'Active'
  }), createFilterGroup('or', [createFilterRule(['location', 'country'], {
    operator: 'is',
    value: 'BR'
  }), createFilterRule(['location', 'country'], {
    operator: 'is',
    value: 'MX'
  })])])} />
}`,...Z.parameters?.docs?.source},description:{story:`The structure stays readable; every mutation control is gone (§39).`,...Z.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [query, setQuery] = React.useState<FilterQuery>(() => createFilterQuery([createFilterRule(['status'], {
      operator: 'is',
      value: 'Active'
    }), createFilterGroup('or', [createFilterRule(['location', 'country'], {
      operator: 'is',
      value: 'BR'
    }), createFilterRule(['location', 'country'], {
      operator: 'is',
      value: 'MX'
    })])]));
    const rows = applyFilterQuery(policies, query, FIELDS);
    return <Stack gap={4}>
        <FiltersBuilder fields={FIELDS} query={query} onQueryChange={setQuery} />
        <p className="text-sm text-muted-foreground" data-testid="count">
          {rows.length} of {policies.length} policies
        </p>
        <ul className="text-sm">
          {rows.map(r => <li key={r.id}>
              {r.name} — {r.location.country}
            </li>)}
        </ul>
      </Stack>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // Active AND (BR OR MX): rows 1 and 4 are Active+BR; row 3 is MX but
    // Pending, so it is correctly excluded.
    await expect(canvas.getByTestId('count')).toHaveTextContent('2 of 5 policies');
  }
}`,...$.parameters?.docs?.source},description:{story:`**Grouping changes the answer, and you can see it.** \`Active AND (Brazil OR
Mexico)\` matches three rows; the same three conditions flattened to all-AND
would match none, which is exactly why §24 refuses to flatten.`,...$.parameters?.docs?.description}}}})))()}Ge();export{K as Default,X as DepthLimitReached,$ as GroupingChangesTheResult,Y as NegatedGroup,q as NestedGroup,Z as ReadOnly,J as TheRouteFromTheBar,We as __namedExportsOrder,Ue as default};