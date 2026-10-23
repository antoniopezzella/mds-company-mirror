import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,i as r,n as i,r as a,t as o}from"./bubble-2eDDXMij.js";var s,c,l,u,d,f;function p(){return(p=e((()=>{n(),s=t(),c={title:`Components/Bubble`,component:o,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`# Bubble

The message surface itself — 7 tone variants covering the range a real
chat needs (the user's own messages, assistant replies, quoted/ghost
content, destructive confirmations). Pre-existing in this repo, had no
Storybook story until now.`}}},argTypes:{variant:{control:`select`,options:[`default`,`secondary`,`muted`,`tinted`,`outline`,`ghost`,`destructive`]},align:{control:`select`,options:[`start`,`end`]}}},l={render:()=>(0,s.jsx)(`div`,{className:`flex max-w-md flex-col gap-3`,children:[`default`,`secondary`,`muted`,`tinted`,`outline`,`ghost`,`destructive`].map(e=>(0,s.jsx)(o,{variant:e,children:(0,s.jsxs)(i,{children:[e,` variant`]})},e))})},u={name:`User (end) vs. assistant (start)`,render:()=>(0,s.jsxs)(a,{className:`max-w-md`,children:[(0,s.jsx)(o,{variant:`muted`,align:`start`,children:(0,s.jsx)(i,{children:`Assistant messages align start and use a muted surface.`})}),(0,s.jsx)(o,{align:`end`,children:(0,s.jsx)(i,{children:`User messages align end and use the primary-filled default variant.`})})]})},d={render:()=>(0,s.jsxs)(o,{variant:`muted`,className:`max-w-md`,children:[(0,s.jsx)(i,{children:`Claim CLM-1042 has been approved.`}),(0,s.jsx)(r,{children:`🎉 2`})]})},f=[`AllVariants`,`UserVsAssistant`,`WithReactions`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex max-w-md flex-col gap-3">
      {(['default', 'secondary', 'muted', 'tinted', 'outline', 'ghost', 'destructive'] as const).map(variant => <Bubble key={variant} variant={variant}>
          <BubbleContent>{variant} variant</BubbleContent>
        </Bubble>)}
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'User (end) vs. assistant (start)',
  render: () => <BubbleGroup className="max-w-md">
      <Bubble variant="muted" align="start">
        <BubbleContent>Assistant messages align start and use a muted surface.</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>User messages align end and use the primary-filled default variant.</BubbleContent>
      </Bubble>
    </BubbleGroup>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Bubble variant="muted" className="max-w-md">
      <BubbleContent>Claim CLM-1042 has been approved.</BubbleContent>
      <BubbleReactions>🎉 2</BubbleReactions>
    </Bubble>
}`,...d.parameters?.docs?.source}}}})))()}p();export{l as AllVariants,u as UserVsAssistant,d as WithReactions,f as __namedExportsOrder,c as default};