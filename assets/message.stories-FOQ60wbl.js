import{Z as e}from"./iframe-CPBTUrEW.js";import{b as t,B as r,a as o,c as u}from"./bubble-Dp6O7Hty.js";import{M as s,d as g,a as l,b as i,e as d,c}from"./message-BUaATdhT.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dk2lMVn3.js";import"./index-DTX6ga2Q.js";import"./utils-CURkPv3a.js";const j={title:"Components/Message",component:s,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`# Message

Row layout for a single chat turn — avatar, alignment (\`start\`/\`end\`),
header/footer metadata slots, and grouping. Composes with Bubble for the
actual message surface; MessageScroller for the scrollable transcript.
Pre-existing in this repo (built alongside message-scroller.tsx), had no
Storybook story until now.`}}},argTypes:{align:{control:"select",options:["start","end"]}}},n={render:()=>e.jsxs(g,{className:"max-w-lg",children:[e.jsxs(s,{align:"start",children:[e.jsx(l,{children:e.jsx("div",{className:"flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground",children:"AI"})}),e.jsxs(i,{children:[e.jsx(d,{children:"Assistant"}),e.jsx(t,{children:e.jsx(r,{variant:"muted",children:e.jsx(o,{children:"Hi! I can help you file a claim or check on an existing one. What do you need?"})})}),e.jsx(c,{children:"2:04 PM"})]})]}),e.jsx(s,{align:"end",children:e.jsxs(i,{children:[e.jsx(t,{children:e.jsx(r,{children:e.jsx(o,{children:"I need to check the status of claim CLM-1042."})})}),e.jsx(c,{children:"2:05 PM"})]})}),e.jsxs(s,{align:"start",children:[e.jsx(l,{children:e.jsx("div",{className:"flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground",children:"AI"})}),e.jsx(i,{children:e.jsx(t,{children:e.jsxs(r,{variant:"muted",children:[e.jsxs(o,{children:["CLM-1042 (Beacon Capital Partners, Property) is ",e.jsx("strong",{children:"Open"}),", filed 2026-08-01. Want the full timeline?"]}),e.jsx(u,{children:"👍"})]})})})]})]})},a={render:()=>e.jsxs(s,{align:"start",className:"max-w-md",children:[e.jsx(l,{children:e.jsx("div",{className:"flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground",children:"AI"})}),e.jsxs(i,{children:[e.jsx(d,{children:"Assistant"}),e.jsx(t,{children:e.jsx(r,{variant:"muted",children:e.jsx(o,{children:"A single message row, unwrapped from a MessageGroup."})})})]})]})},B=["Conversation","SingleMessage"];n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};export{n as Conversation,a as SingleMessage,B as __namedExportsOrder,j as default};
