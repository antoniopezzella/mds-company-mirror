import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,i as r,n as i,r as a,t as o}from"./bubble-2eDDXMij.js";import{a as s,i as c,n as l,o as u,r as d,s as f,t as p}from"./message-Bptnyskm.js";var m,h,g,_,v;function y(){return(y=e((()=>{n(),f(),m=t(),h={title:`Components/Message`,component:p,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`# Message

Row layout for a single chat turn — avatar, alignment (\`start\`/\`end\`),
header/footer metadata slots, and grouping. Composes with Bubble for the
actual message surface; MessageScroller for the scrollable transcript.
Pre-existing in this repo (built alongside message-scroller.tsx), had no
Storybook story until now.`}}},argTypes:{align:{control:`select`,options:[`start`,`end`]}}},g={render:()=>(0,m.jsxs)(s,{className:`max-w-lg`,children:[(0,m.jsxs)(p,{align:`start`,children:[(0,m.jsx)(l,{children:(0,m.jsx)(`div`,{className:`flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground`,children:`AI`})}),(0,m.jsxs)(d,{children:[(0,m.jsx)(u,{children:`Assistant`}),(0,m.jsx)(a,{children:(0,m.jsx)(o,{variant:`muted`,children:(0,m.jsx)(i,{children:`Hi! I can help you file a claim or check on an existing one. What do you need?`})})}),(0,m.jsx)(c,{children:`2:04 PM`})]})]}),(0,m.jsx)(p,{align:`end`,children:(0,m.jsxs)(d,{children:[(0,m.jsx)(a,{children:(0,m.jsx)(o,{children:(0,m.jsx)(i,{children:`I need to check the status of claim CLM-1042.`})})}),(0,m.jsx)(c,{children:`2:05 PM`})]})}),(0,m.jsxs)(p,{align:`start`,children:[(0,m.jsx)(l,{children:(0,m.jsx)(`div`,{className:`flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground`,children:`AI`})}),(0,m.jsx)(d,{children:(0,m.jsx)(a,{children:(0,m.jsxs)(o,{variant:`muted`,children:[(0,m.jsxs)(i,{children:[`CLM-1042 (Beacon Capital Partners, Property) is `,(0,m.jsx)(`strong`,{children:`Open`}),`, filed 2026-08-01. Want the full timeline?`]}),(0,m.jsx)(r,{children:`👍`})]})})})]})]})},_={render:()=>(0,m.jsxs)(p,{align:`start`,className:`max-w-md`,children:[(0,m.jsx)(l,{children:(0,m.jsx)(`div`,{className:`flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground`,children:`AI`})}),(0,m.jsxs)(d,{children:[(0,m.jsx)(u,{children:`Assistant`}),(0,m.jsx)(a,{children:(0,m.jsx)(o,{variant:`muted`,children:(0,m.jsx)(i,{children:`A single message row, unwrapped from a MessageGroup.`})})})]})]})},v=[`Conversation`,`SingleMessage`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <MessageGroup className="max-w-lg">
      <Message align="start">
        <MessageAvatar>
          <div className="flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground">
            AI
          </div>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Assistant</MessageHeader>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>Hi! I can help you file a claim or check on an existing one. What do you need?</BubbleContent>
            </Bubble>
          </BubbleGroup>
          <MessageFooter>2:04 PM</MessageFooter>
        </MessageContent>
      </Message>

      <Message align="end">
        <MessageContent>
          <BubbleGroup>
            <Bubble>
              <BubbleContent>I need to check the status of claim CLM-1042.</BubbleContent>
            </Bubble>
          </BubbleGroup>
          <MessageFooter>2:05 PM</MessageFooter>
        </MessageContent>
      </Message>

      <Message align="start">
        <MessageAvatar>
          <div className="flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground">
            AI
          </div>
        </MessageAvatar>
        <MessageContent>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>
                CLM-1042 (Beacon Capital Partners, Property) is <strong>Open</strong>, filed 2026-08-01. Want the full
                timeline?
              </BubbleContent>
              <BubbleReactions>👍</BubbleReactions>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
    </MessageGroup>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Message align="start" className="max-w-md">
      <MessageAvatar>
        <div className="flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground">
          AI
        </div>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Assistant</MessageHeader>
        <BubbleGroup>
          <Bubble variant="muted">
            <BubbleContent>A single message row, unwrapped from a MessageGroup.</BubbleContent>
          </Bubble>
        </BubbleGroup>
      </MessageContent>
    </Message>
}`,..._.parameters?.docs?.source}}}})))()}y();export{g as Conversation,_ as SingleMessage,v as __namedExportsOrder,h as default};