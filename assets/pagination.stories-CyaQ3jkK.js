import{a5 as t,Z as c}from"./iframe-CPBTUrEW.js";import{P as n}from"./pagination-Dd3e6cTc.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./createLucideIcon-BnpAccaP.js";import"./chevron-left-N_nrbjRa.js";import"./chevron-right-BXCmPxW2.js";const C={title:"Components/Pagination",component:n,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:'# Pagination\n\nRadix-free, `getRoleColor()`-driven counterpart to the MUI `Pagination`.\nSame `currentPage`/`totalItems`/`pageSize`/`pageSizeOptions`/`variant`/\n`onPageChange`/`onPageSizeChange` API as the MUI twin, including the\npage-size selector and jump-to-page input in `variant="advanced"`.'}}},argTypes:{variant:{control:"select",options:["simple","advanced"]},itemLabel:{control:"text",description:`Word appended after the total count, auto-pluralized. Pass '' for MUI TablePagination's bare "1–5 of 8" convention.`},rowsLabel:{control:"text",description:`Label before the page-size selector — pass "Rows per page:" to match MUI's wording.`}}},r={render:()=>{const[e,a]=t.useState(1),[m,u]=t.useState(10);return c.jsx(n,{currentPage:e,totalItems:237,pageSize:m,onPageChange:a,onPageSizeChange:u})}},s={render:()=>{const[e,a]=t.useState(3);return c.jsx(n,{currentPage:e,totalItems:237,pageSize:10,variant:"simple",onPageChange:a})}},o={render:()=>{const[e,a]=t.useState(1);return c.jsx(n,{currentPage:e,totalItems:35,pageSize:10,onPageChange:a})}},g={render:()=>{const[e,a]=t.useState(42);return c.jsx(n,{currentPage:e,totalItems:5e3,pageSize:10,onPageChange:a,onPageSizeChange:()=>{}})}},i={args:{currentPage:2,totalItems:100,pageSize:10,onPageChange:()=>{},disabled:!0}},p={args:{currentPage:1,totalItems:100,pageSize:10,onPageChange:()=>{},showItemsRange:!1,showTotalItems:!1}},f=["Advanced","Simple","FewPages","ManyPages","Disabled","NoItemsInfo"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return <Pagination currentPage={page} totalItems={237} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />;
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(3);
    return <Pagination currentPage={page} totalItems={237} pageSize={10} variant="simple" onPageChange={setPage} />;
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalItems={35} pageSize={10} onPageChange={setPage} />;
  }
}`,...o.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(42);
    return <Pagination currentPage={page} totalItems={5000} pageSize={10} onPageChange={setPage} onPageSizeChange={() => {}} />;
  }
}`,...g.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 2,
    totalItems: 100,
    pageSize: 10,
    onPageChange: () => {},
    disabled: true
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 1,
    totalItems: 100,
    pageSize: 10,
    onPageChange: () => {},
    showItemsRange: false,
    showTotalItems: false
  }
}`,...p.parameters?.docs?.source}}};export{r as Advanced,i as Disabled,o as FewPages,g as ManyPages,p as NoItemsInfo,s as Simple,f as __namedExportsOrder,C as default};
