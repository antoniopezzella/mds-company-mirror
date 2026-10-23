import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./pagination-BZwUraNb.js";var a,o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{a=t(),r(),o=n(),s={title:`Components/Pagination`,component:i,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:'# Pagination\n\nRadix-free, `getRoleColor()`-driven counterpart to the MUI `Pagination`.\nSame `currentPage`/`totalItems`/`pageSize`/`pageSizeOptions`/`variant`/\n`onPageChange`/`onPageSizeChange` API as the MUI twin, including the\npage-size selector and jump-to-page input in `variant="advanced"`.'}}},argTypes:{variant:{control:`select`,options:[`simple`,`advanced`]},itemLabel:{control:`text`,description:`Word appended after the total count, auto-pluralized. Pass '' for MUI TablePagination's bare "1–5 of 8" convention.`},rowsLabel:{control:`text`,description:`Label before the page-size selector — pass "Rows per page:" to match MUI's wording.`}}},c={render:()=>{let[e,t]=(0,a.useState)(1),[n,r]=(0,a.useState)(10);return(0,o.jsx)(i,{currentPage:e,totalItems:237,pageSize:n,onPageChange:t,onPageSizeChange:r})}},l={render:()=>{let[e,t]=(0,a.useState)(3);return(0,o.jsx)(i,{currentPage:e,totalItems:237,pageSize:10,variant:`simple`,onPageChange:t})}},u={render:()=>{let[e,t]=(0,a.useState)(1);return(0,o.jsx)(i,{currentPage:e,totalItems:35,pageSize:10,onPageChange:t})}},d={render:()=>{let[e,t]=(0,a.useState)(42);return(0,o.jsx)(i,{currentPage:e,totalItems:5e3,pageSize:10,onPageChange:t,onPageSizeChange:()=>{}})}},f={args:{currentPage:2,totalItems:100,pageSize:10,onPageChange:()=>{},disabled:!0}},p={args:{currentPage:1,totalItems:100,pageSize:10,onPageChange:()=>{},showItemsRange:!1,showTotalItems:!1}},m=[`Advanced`,`Simple`,`FewPages`,`ManyPages`,`Disabled`,`NoItemsInfo`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return <Pagination currentPage={page} totalItems={237} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />;
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(3);
    return <Pagination currentPage={page} totalItems={237} pageSize={10} variant="simple" onPageChange={setPage} />;
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalItems={35} pageSize={10} onPageChange={setPage} />;
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(42);
    return <Pagination currentPage={page} totalItems={5000} pageSize={10} onPageChange={setPage} onPageSizeChange={() => {}} />;
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 2,
    totalItems: 100,
    pageSize: 10,
    onPageChange: () => {},
    disabled: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 1,
    totalItems: 100,
    pageSize: 10,
    onPageChange: () => {},
    showItemsRange: false,
    showTotalItems: false
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{c as Advanced,f as Disabled,u as FewPages,d as ManyPages,p as NoItemsInfo,l as Simple,m as __namedExportsOrder,s as default};