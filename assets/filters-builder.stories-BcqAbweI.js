import{a5 as h,Z as e,N as f}from"./iframe-CPBTUrEW.js";import{m as ie,a as le,i as C,g as de,d as ue,p as ce,f as pe,e as me,w as ye,u as ge,o as he,k as fe,r as ve,s as be,b as z,j as c,h as B,c as we,F as xe}from"./predicate-D_JAmcXY.js";import{c as H}from"./utils-CURkPv3a.js";import{B as V}from"./button-_tNb_vhW.js";import{P as Fe,b as Re,a as Ce}from"./popover-B1Y9L4uz.js";import{D as ne,h as re,b as ae,c as _,g as Te,e as Ne,f as W}from"./dropdown-menu-B-DEwsfR.js";import{F as Ae,a as je,f as K}from"./filters-field-picker-DXcbmY3j.js";import{P as Be}from"./plus-B89lyPh-.js";import{c as qe}from"./createLucideIcon-BnpAccaP.js";import{E as De}from"./ellipsis-vertical-Ci1UvJep.js";import{C as Se}from"./chevron-down-122XaqBk.js";import{f as Ge,d as Ie}from"./filters-operators-CyzjlChd.js";import{C as Z,e as Y,f as J,b as ee}from"./card-DdSDVEd-.js";import{S as oe}from"./stack-C88a0npI.js";import"./preload-helper-PPVm8Dsz.js";import"./button-group-BKSnLksy.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./control-size-rvCN7ZpI.js";import"./separator-Cz9zTVn9.js";import"./index-DbquDQCT.js";import"./format-B1LeFV3Y.js";import"./x-Bk_wSNf2.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-CDKxNHGJ.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-ydzPhmoe.js";import"./index-VWR8Du3y.js";import"./index-D8r7tS0H.js";import"./index-COhu0uIO.js";import"./index-Cq_iRV-a.js";import"./circle-gG6A41nI.js";import"./check-KuCy08bp.js";import"./chevron-right-BXCmPxW2.js";import"./input-BSCHIFmj.js";import"./prop-compat-ClktB6p5.js";import"./search-DRVimkv9.js";import"./label-qHY30eUg.js";const Ee=[["path",{d:"M12 10v6",key:"1bos4e"}],["path",{d:"M9 13h6",key:"1uhe8q"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],Me=qe("folder-plus",Ee),Pe={where:"Where",and:"And",or:"Or",addCondition:"Add condition",addGroup:"Add group",removeGroup:"Remove group",duplicateGroup:"Duplicate group",negateGroup:"Negate group",ungroup:"Ungroup",groupActions:"Group actions",combinator:"How these conditions combine",depthLimit:"Groups cannot be nested any deeper.",ungroupUnsafe:"Ungrouping would change what this query means.",not:"NOT",empty:"No conditions yet."};function $({group:n,fields:r,addRef:a,depth:l,maxDepth:p,isRoot:g=!1,editors:x,size:w="sm",readOnly:N=!1,disabled:q=!1,messages:F,...s}){const i={...Pe,...F},[X,A]=h.useState(!1),D=h.useRef(null),S=N||q,d=h.useRef(null),j=()=>requestAnimationFrame(()=>d.current?.focus()),G=t=>{s.onRemoveNode(t),j()},y=n.combinator==="and"?i.and:i.or,m=[n.negated?i.not:null,n.combinator==="and"?"All of the following":"Any of the following"].filter(Boolean).join(" "),R=l>=p;return e.jsxs("div",{"data-slot":"filters-group","data-combinator":n.combinator,"data-depth":l,role:"group","aria-label":m,className:H("flex flex-col gap-2",!g&&"rounded-lg border p-3"),style:g?void 0:{borderColor:n.negated?f("status.danger.border"):f("border.subtle"),backgroundColor:f("surface.subtle")},children:[n.negated&&!g&&e.jsx("p",{className:"text-xs font-semibold tracking-wide",style:{color:f("status.danger.fg")},children:i.not}),n.rules.length===0&&e.jsx("p",{className:"text-sm",style:{color:f("text.secondary")},children:i.empty}),n.rules.map((t,o)=>e.jsxs("div",{className:"flex items-start gap-2",children:[e.jsx("div",{className:"w-20 shrink-0 pt-1",children:o===0?e.jsx("span",{className:"text-sm",style:{color:f("text.secondary")},children:i.where}):o===1&&!S?e.jsx(Oe,{combinator:n.combinator,onChange:u=>s.onSetCombinator(n.id,u),label:i.combinator,andLabel:i.and,orLabel:i.or}):e.jsx("span",{className:"text-sm",style:{color:f("text.secondary")},"aria-hidden":"true",children:y})}),e.jsx("div",{className:"min-w-0 flex-1",children:ie(t)?e.jsx($,{...s,group:t,fields:r,depth:l+1,maxDepth:p,editors:x,size:w,readOnly:N,disabled:q,messages:F}):e.jsx(le,{rule:t,fields:r,editors:x,size:w,messages:F,readOnly:N,disabled:q,onChangeField:u=>s.onChangeField(t.id,u),onChangeOperator:u=>s.onChangeOperator(t.id,u),onChangeValue:u=>s.onChangeValue(t.id,u),onDuplicate:()=>s.onDuplicateNode(t.id),onNegate:()=>s.onNegateNode(t.id),onGroup:R?void 0:()=>s.onWrapInGroup(t.id),onRemove:()=>G(t.id)})})]},t.id)),!S&&e.jsxs("div",{className:H("flex items-center gap-2",g?"ps-20":"ps-0"),children:[e.jsxs(Fe,{open:X,onOpenChange:A,children:[e.jsx(Re,{asChild:!0,children:e.jsxs(V,{ref:Qe(d,a),variant:"tertiary",size:w,children:[e.jsx(Be,{className:"size-3.5","aria-hidden":"true"}),i.addCondition]})}),e.jsx(Ce,{align:"start",className:"w-auto p-2","aria-label":i.addCondition,onEscapeKeyDown:t=>{D.current?.handleEscape()&&t.preventDefault()},children:e.jsx(Ae,{fields:r,handleRef:D,searchPlaceholder:F?.searchPlaceholder,onSelect:t=>{s.onAddRule(n.id,t),A(!1)}})})]}),e.jsxs(V,{variant:"tertiary",size:w,disabled:R,onClick:()=>s.onAddGroup(n.id),title:R?i.depthLimit:void 0,"aria-describedby":R?`depth-${n.id}`:void 0,children:[e.jsx(Me,{className:"size-3.5","aria-hidden":"true"}),i.addGroup]}),R&&e.jsx("span",{id:`depth-${n.id}`,className:"sr-only",children:i.depthLimit}),!g&&e.jsxs(ne,{children:[e.jsx(re,{asChild:!0,children:e.jsx(V,{variant:"tertiary",size:w,iconOnly:!0,icon:e.jsx(De,{className:"size-3.5","aria-hidden":"true"}),"aria-label":i.groupActions,className:"ms-auto"})}),e.jsxs(ae,{align:"start",className:"min-w-44",children:[e.jsx(_,{onSelect:()=>s.onDuplicateNode(n.id),children:i.duplicateGroup}),e.jsx(_,{onSelect:()=>s.onNegateNode(n.id),children:i.negateGroup}),s.canUngroup(n.id)&&e.jsx(_,{onSelect:()=>s.onUngroup(n.id),children:i.ungroup}),e.jsx(Te,{}),e.jsx(_,{onSelect:()=>s.onRemoveNode(n.id),style:{color:f("status.danger.fg")},children:i.removeGroup})]})]})]})]})}function Oe({combinator:n,onChange:r,label:a,andLabel:l,orLabel:p}){const g=n==="and"?l:p;return e.jsxs(ne,{children:[e.jsx(re,{asChild:!0,children:e.jsxs(V,{variant:"outline",size:"sm","aria-label":`${a}: ${g}`,className:"w-full justify-between",children:[g,e.jsx(Se,{className:"size-3 opacity-60","aria-hidden":"true"})]})}),e.jsx(ae,{align:"start",className:"min-w-28",children:e.jsxs(Ne,{value:n,onValueChange:x=>r(x),children:[e.jsx(W,{value:"and",children:l}),e.jsx(W,{value:"or",children:p})]})})]})}function Qe(...n){return r=>{for(const a of n)typeof a=="function"?a(r):a&&typeof a=="object"&&(a.current=r)}}$.__docgenInfo={description:"",methods:[],displayName:"FiltersGroup",props:{onAddRule:{required:!0,tsType:{name:"signature",type:"function",raw:"(groupId: string, path: string[]) => void",signature:{arguments:[{type:{name:"string"},name:"groupId"},{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"path"}],return:{name:"void"}}},description:""},onAddGroup:{required:!0,tsType:{name:"signature",type:"function",raw:"(groupId: string) => void",signature:{arguments:[{type:{name:"string"},name:"groupId"}],return:{name:"void"}}},description:""},onSetCombinator:{required:!0,tsType:{name:"signature",type:"function",raw:"(groupId: string, combinator: 'and' | 'or') => void",signature:{arguments:[{type:{name:"string"},name:"groupId"},{type:{name:"union",raw:"'and' | 'or'",elements:[{name:"literal",value:"'and'"},{name:"literal",value:"'or'"}]},name:"combinator"}],return:{name:"void"}}},description:""},onRemoveNode:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onDuplicateNode:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onNegateNode:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onUngroup:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onWrapInGroup:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onChangeField:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string, path: string[]) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"path"}],return:{name:"void"}}},description:""},onChangeOperator:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string, operator: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"string"},name:"operator"}],return:{name:"void"}}},description:""},onChangeValue:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string, value: unknown) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"unknown"},name:"value"}],return:{name:"void"}}},description:""},canUngroup:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => boolean",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"boolean"}}},description:"Ungroup is hidden, not broken, where it would rewrite the query (§24)."},group:{required:!0,tsType:{name:"FilterGroup"},description:""},addRef:{required:!1,tsType:{name:"ReactRef",raw:"React.Ref<HTMLButtonElement>",elements:[{name:"HTMLButtonElement"}]},description:'The root group forwards this so "Clear all" has somewhere to land.'},fields:{required:!0,tsType:{name:"Array",elements:[{name:"FilterField"}],raw:"FilterField[]"},description:""},depth:{required:!0,tsType:{name:"number"},description:"1 for the root."},maxDepth:{required:!0,tsType:{name:"number"},description:""},isRoot:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},editors:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ReactComponentType",raw:"React.ComponentType<FiltersValueEditorProps>",elements:[{name:"FiltersValueEditorProps"}]}],raw:"Record<string, React.ComponentType<FiltersValueEditorProps>>"},description:"Custom value editors, keyed by a field's `editor` name (§11).\n\nThe mechanism existed in `FiltersValueEditor` and was unreachable: no\ncomponent threaded it, so `field.editor` was inert unless a consumer\nbypassed the whole component and rendered the editor themselves."},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'sm'",computed:!1}},readOnly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},messages:{required:!1,tsType:{name:"Partial",elements:[{name:"intersection",raw:"FiltersGroupMessages & NonNullable<FiltersRuleProps['messages']>",elements:[{name:"FiltersGroupMessages"},{name:"NonNullable",elements:[{name:"FiltersRuleProps['messages']",raw:"FiltersRuleProps['messages']"}],raw:"NonNullable<FiltersRuleProps['messages']>"}]}],raw:"Partial<FiltersGroupMessages & NonNullable<FiltersRuleProps['messages']>>"},description:""}}};const ke={clearAll:"Clear all",summaryOne:"1 condition",summaryMany:"{count} conditions",builder:"Advanced filters"};function b({fields:n,query:r,defaultQuery:a,onQueryChange:l,maxDepth:p=3,editors:g,size:x="sm",readOnly:w=!1,disabled:N=!1,className:q,messages:F}){const s={...ke,...F},[i,X]=h.useState(()=>a??C()),A=h.useRef(null),D=h.useRef(null),S=r!==void 0,d=S?r:i,j=h.useCallback(t=>je(n,t),[n]),G=de(d,j),y=t=>{A.current&&(A.current.textContent=t)},m=(t,o)=>{S||X(t),l?.(t,o)},R={onAddRule:(t,o)=>{const u=j(o),I=c(o,{operator:u?Ie(u):void 0});m(z(d,I,t),{reason:"add",nodeId:I.id,fieldPath:o}),y(`Condition added: ${K(n,o)}.`)},onAddGroup:t=>{const o=B("or");m(z(d,o,t),{reason:"group-add",nodeId:o.id}),y("Group added.")},onSetCombinator:(t,o)=>{m(be(d,t,o),{reason:"combinator",nodeId:t}),y(o==="and"?"Matching all conditions.":"Matching any condition.")},onRemoveNode:t=>{m(ve(d,t),{reason:"remove",nodeId:t}),y("Removed.")},onDuplicateNode:t=>{m(fe(d,t),{reason:"duplicate",nodeId:t}),y("Duplicated.")},onNegateNode:t=>{m(he(d,t),{reason:"negate",nodeId:t}),y("Negation toggled.")},onUngroup:t=>{m(ge(d,t),{reason:"group-remove",nodeId:t}),y("Group dissolved.")},onWrapInGroup:t=>{m(ye(d,t,"or"),{reason:"group-add",nodeId:t}),y("Condition moved into a new group.")},onChangeField:(t,o)=>{const u=j(o);m(me(d,t,o,u??"text"),{reason:"update",nodeId:t,fieldPath:o})},onChangeOperator:(t,o)=>{const u=se(d,t),I=u?j(u):void 0;m(pe(d,t,o,I??"text"),{reason:"update",nodeId:t,fieldPath:u}),u&&y(`${K(n,u)} condition changed to ${Ge(I??"text",o)?.label??o}.`)},onChangeValue:(t,o)=>{m(ce(d,t,{value:o}),{reason:"update",nodeId:t})},canUngroup:t=>ue(d,t)};return e.jsxs("div",{"data-slot":"filters-builder",className:H("flex flex-col gap-3",q),role:"search","aria-label":s.builder,children:[e.jsx("div",{ref:A,role:"status","aria-live":"polite",className:"sr-only"}),e.jsx($,{...R,group:d,fields:n,addRef:D,depth:1,maxDepth:p,isRoot:!0,editors:g,size:x,readOnly:w,disabled:N,messages:F}),G>0&&e.jsxs("div",{className:"flex items-center justify-between gap-2",children:[e.jsx("p",{className:"text-sm",style:{color:f("text.secondary")},children:G===1?s.summaryOne:s.summaryMany.replace("{count}",String(G))}),!w&&e.jsx(V,{variant:"tertiary",size:x,disabled:N,onClick:()=>{m(C(),{reason:"clear"}),y("All filters cleared."),requestAnimationFrame(()=>D.current?.focus())},children:s.clearAll})]})]})}function se(n,r){for(const a of n.rules){if(a.id===r&&a.type==="rule")return a.path;if(a.type==="group"){const l=se(a,r);if(l)return l}}}b.__docgenInfo={description:"",methods:[],displayName:"FiltersBuilder",props:{fields:{required:!0,tsType:{name:"Array",elements:[{name:"FilterField"}],raw:"FilterField[]"},description:""},query:{required:!1,tsType:{name:"FilterGroup"},description:"Controlled (§32)."},defaultQuery:{required:!1,tsType:{name:"FilterGroup"},description:"Uncontrolled starting point (§33)."},onQueryChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(query: FilterQuery, meta: FilterQueryChangeMeta) => void",signature:{arguments:[{type:{name:"FilterGroup"},name:"query"},{type:{name:"FilterQueryChangeMeta"},name:"meta"}],return:{name:"void"}}},description:""},maxDepth:{required:!1,tsType:{name:"number"},description:"Nesting levels allowed, root included. Default 3.",defaultValue:{value:"3",computed:!1}},editors:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ReactComponentType",raw:"React.ComponentType<FiltersValueEditorProps>",elements:[{name:"FiltersValueEditorProps"}]}],raw:"Record<string, React.ComponentType<FiltersValueEditorProps>>"},description:"Custom value editors, keyed by a field's `editor` name (§11).\n\nThe mechanism existed in `FiltersValueEditor` and was unreachable: no\ncomponent threaded it, so `field.editor` was inert unless a consumer\nbypassed the whole component and rendered the editor themselves."},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'sm'",computed:!1}},readOnly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},messages:{required:!1,tsType:{name:"Partial",elements:[{name:"intersection",raw:`FiltersGroupMessages &
  NonNullable<FiltersRuleProps['messages']> & {
  clearAll: string;
  summaryOne: string;
  /** \`{count}\` is substituted. */
  summaryMany: string;
  builder: string;
}`,elements:[{name:"FiltersGroupMessages"},{name:"NonNullable",elements:[{name:"FiltersRuleProps['messages']",raw:"FiltersRuleProps['messages']"}],raw:"NonNullable<FiltersRuleProps['messages']>"},{name:"signature",type:"object",raw:`{
  clearAll: string;
  summaryOne: string;
  /** \`{count}\` is substituted. */
  summaryMany: string;
  builder: string;
}`,signature:{properties:[{key:"clearAll",value:{name:"string",required:!0}},{key:"summaryOne",value:{name:"string",required:!0}},{key:"summaryMany",value:{name:"string",required:!0},description:"`{count}` is substituted."},{key:"builder",value:{name:"string",required:!0}}]}}]}],raw:`Partial<
  FiltersGroupMessages &
    NonNullable<FiltersRuleProps['messages']> & {
    clearAll: string;
    summaryOne: string;
    /** \`{count}\` is substituted. */
    summaryMany: string;
    builder: string;
  }
>`},description:""}}};const{expect:T,userEvent:Le,within:U}=__STORYBOOK_MODULE_TEST__,Et={title:"Components/Filters Builder",component:b,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["The **advanced builder** — where the flat filter bar’s refusal lands.","","The bar declines to edit `A AND (B OR C)`, because three conditions in a row read as","`A AND B AND C` — a different query. That refusal is only honest if somewhere can","actually edit it. This is that somewhere, driving **the same query model**, not a second","representation that has to be kept in sync.","","**The combinator belongs to the group, not to each row.** A per-row And/Or dropdown is the","common design and it misrepresents this model: it invites setting row 2 to OR and row 3 to","AND inside one group, which has no single meaning. So the control appears once, on the","second row, where the relationship it describes first exists.","","**Nesting is bounded and the bound is visible.** Indentation runs out of room around four","levels, so `Add group` disables at the limit and says why rather than silently no-oping."].join(`
`)}}}},v=[{id:"status",label:"Status",type:"select",options:[{value:"Active",label:"Active"},{value:"Pending",label:"Pending"},{value:"Expired",label:"Expired"}]},{id:"premium",label:"Premium",type:"number",unit:"currency"},{id:"tiv",label:"Total insured value",type:"number",unit:"currency",aliases:["TIV"]},{id:"bound",label:"Bound",type:"boolean",trueLabel:"Bound",falseLabel:"Unbound"},{id:"location",label:"Location",type:"select",fields:[{id:"country",label:"Country",type:"select",options:[{value:"BR",label:"Brazil"},{value:"MX",label:"Mexico"},{value:"US",label:"United States"}]},{id:"city",label:"City",type:"text"}]}],E={render:()=>e.jsx(b,{fields:v})},M={render:()=>e.jsx(b,{fields:v,defaultQuery:C([c(["status"],{operator:"is",value:"Active"}),B("or",[c(["location","country"],{operator:"is",value:"BR"}),c(["location","country"],{operator:"is",value:"MX"})])])}),play:async({canvasElement:n,step:r})=>{const a=U(n);await r("the OR group is nested inside the AND root",async()=>{const l=a.getByRole("group",{name:"All of the following"});await T(U(l).getByRole("group",{name:"Any of the following"})).toBeInTheDocument()}),await r("the count is conditions, not nodes",async()=>{await T(a.getByText("3 conditions")).toBeInTheDocument()})}},P={render:function(){const[r,a]=h.useState(!1),[l,p]=h.useState(()=>C([c(["status"],{operator:"is",value:"Active"}),B("or",[c(["premium"],{operator:"gt",value:2e4}),c(["tiv"],{operator:"lt",value:5e5})])]));return e.jsxs(oe,{gap:4,children:[e.jsxs(Z,{children:[e.jsx(Y,{children:e.jsx(J,{children:"Filter bar"})}),e.jsx(ee,{children:e.jsx(xe,{fields:v,query:l,onQueryChange:p,onEditAdvanced:()=>a(!0)})})]}),r&&e.jsxs(Z,{children:[e.jsx(Y,{children:e.jsx(J,{children:"Advanced builder"})}),e.jsx(ee,{children:e.jsx(b,{fields:v,query:l,onQueryChange:p})})]})]})},play:async({canvasElement:n,step:r})=>{const a=U(n);await r("the bar refuses, and offers the route",async()=>{await T(a.getByText(/cannot be edited here/)).toBeInTheDocument(),await Le.click(a.getByRole("button",{name:"Edit in advanced builder"}))}),await r("the builder edits the very same query",async()=>{await T(a.getByRole("group",{name:"Any of the following"})).toBeInTheDocument()})}},O={render:()=>e.jsx(b,{fields:v,defaultQuery:C([c(["status"],{operator:"is",value:"Active"}),{...B("or",[c(["location","country"],{operator:"is",value:"BR"}),c(["location","country"],{operator:"is",value:"MX"})]),negated:!0}])})},Q={render:()=>e.jsx(b,{fields:v,maxDepth:1}),play:async({canvasElement:n})=>{const r=U(n);await T(r.getByRole("button",{name:"Add group"})).toBeDisabled(),await T(r.getByText("Groups cannot be nested any deeper.")).toBeInTheDocument()}},k={render:()=>e.jsx(b,{fields:v,readOnly:!0,defaultQuery:C([c(["status"],{operator:"is",value:"Active"}),B("or",[c(["location","country"],{operator:"is",value:"BR"}),c(["location","country"],{operator:"is",value:"MX"})])])})},te=[{id:1,name:"Commercial Auto",status:"Active",premium:12400,location:{country:"BR",city:"Rio"}},{id:2,name:"General Liability",status:"Active",premium:8200,location:{country:"US",city:"Boise"}},{id:3,name:"Cyber Liability",status:"Pending",premium:15900,location:{country:"MX",city:"Leon"}},{id:4,name:"Property",status:"Active",premium:22e3,location:{country:"BR",city:"Recife"}},{id:5,name:"Workers Comp",status:"Expired",premium:9600,location:{country:"US",city:"Reno"}}],L={render:function(){const[r,a]=h.useState(()=>C([c(["status"],{operator:"is",value:"Active"}),B("or",[c(["location","country"],{operator:"is",value:"BR"}),c(["location","country"],{operator:"is",value:"MX"})])])),l=we(te,r,v);return e.jsxs(oe,{gap:4,children:[e.jsx(b,{fields:v,query:r,onQueryChange:a}),e.jsxs("p",{className:"text-sm text-muted-foreground","data-testid":"count",children:[l.length," of ",te.length," policies"]}),e.jsx("ul",{className:"text-sm",children:l.map(p=>e.jsxs("li",{children:[p.name," — ",p.location.country]},p.id))})]})},play:async({canvasElement:n})=>{const r=U(n);await T(r.getByTestId("count")).toHaveTextContent("2 of 5 policies")}},Mt=["Default","NestedGroup","TheRouteFromTheBar","NegatedGroup","DepthLimitReached","ReadOnly","GroupingChangesTheResult"];E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <FiltersBuilder fields={FIELDS} />
}`,...E.parameters?.docs?.source},description:{story:"Nothing set yet: one condition control, one group control.",...E.parameters?.docs?.description}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source},description:{story:`**The query the flat bar cannot draw.** Active policies in Brazil *or*
Mexico — the OR is contained, and the containment is visible.`,...M.parameters?.docs?.description}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source},description:{story:`**The same query, both presentations.** The bar states what it cannot safely
edit and hands over; the builder edits it. One model underneath.`,...P.parameters?.docs?.description}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source},description:{story:"Negation applies to the whole group: *not* (Brazil or Mexico).",...O.parameters?.docs?.description}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
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
}`,...Q.parameters?.docs?.source},description:{story:"At the limit, `Add group` is disabled and carries its reason.",...Q.parameters?.docs?.description}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source},description:{story:"The structure stays readable; every mutation control is gone (§39).",...k.parameters?.docs?.description}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source},description:{story:"**Grouping changes the answer, and you can see it.** `Active AND (Brazil OR\nMexico)` matches three rows; the same three conditions flattened to all-AND\nwould match none, which is exactly why §24 refuses to flatten.",...L.parameters?.docs?.description}}};export{E as Default,Q as DepthLimitReached,L as GroupingChangesTheResult,O as NegatedGroup,M as NestedGroup,k as ReadOnly,P as TheRouteFromTheBar,Mt as __namedExportsOrder,Et as default};
