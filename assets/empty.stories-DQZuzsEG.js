import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{i as n,n as r,r as i,t as a}from"./search-x-B9j7gRg5.js";import{n as o,t as s}from"./button-DatWLSj0.js";import{a as c,i as l,n as u,o as d,r as f,s as p,t as m}from"./empty-cIdHfhKJ.js";var h,g,_,v,y;function b(){return(b=e((()=>{n(),r(),p(),o(),h=t(),g={title:`Components/Empty`,component:m,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`# Empty

General-purpose empty-state primitives — not chat-specific, but pulled
in alongside the chat components for cases like "no messages yet".
Fully self-contained, no new dependencies.`}}}},_={name:`No messages (chat use case)`,render:()=>(0,h.jsx)(m,{className:`max-w-md`,children:(0,h.jsxs)(l,{children:[(0,h.jsx)(c,{variant:`icon`,children:(0,h.jsx)(i,{})}),(0,h.jsx)(d,{children:`No messages yet`}),(0,h.jsx)(f,{children:`Start the conversation by sending a message below.`})]})})},v={render:()=>(0,h.jsxs)(m,{className:`max-w-md`,children:[(0,h.jsxs)(l,{children:[(0,h.jsx)(c,{variant:`icon`,children:(0,h.jsx)(a,{})}),(0,h.jsx)(d,{children:`No results found`}),(0,h.jsx)(f,{children:`Try adjusting your filters or search terms.`})]}),(0,h.jsx)(u,{children:(0,h.jsx)(s,{variant:`secondary`,size:`sm`,children:`Clear filters`})})]})},y=[`NoMessages`,`WithAction`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'No messages (chat use case)',
  render: () => <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>Start the conversation by sending a message below.</EmptyDescription>
      </EmptyHeader>
    </Empty>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try adjusting your filters or search terms.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="secondary" size="sm">
          Clear filters
        </Button>
      </EmptyContent>
    </Empty>
}`,...v.parameters?.docs?.source}}}})))()}b();export{_ as NoMessages,v as WithAction,y as __namedExportsOrder,g as default};