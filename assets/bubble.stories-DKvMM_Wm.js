import{Z as e}from"./iframe-CPBTUrEW.js";import{B as s,a as r,b as i,c as l}from"./bubble-Dp6O7Hty.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dk2lMVn3.js";import"./index-DTX6ga2Q.js";import"./utils-CURkPv3a.js";const g={title:"Components/Bubble",component:s,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`# Bubble

The message surface itself — 7 tone variants covering the range a real
chat needs (the user's own messages, assistant replies, quoted/ghost
content, destructive confirmations). Pre-existing in this repo, had no
Storybook story until now.`}}},argTypes:{variant:{control:"select",options:["default","secondary","muted","tinted","outline","ghost","destructive"]},align:{control:"select",options:["start","end"]}}},a={render:()=>e.jsx("div",{className:"flex max-w-md flex-col gap-3",children:["default","secondary","muted","tinted","outline","ghost","destructive"].map(o=>e.jsx(s,{variant:o,children:e.jsxs(r,{children:[o," variant"]})},o))})},t={name:"User (end) vs. assistant (start)",render:()=>e.jsxs(i,{className:"max-w-md",children:[e.jsx(s,{variant:"muted",align:"start",children:e.jsx(r,{children:"Assistant messages align start and use a muted surface."})}),e.jsx(s,{align:"end",children:e.jsx(r,{children:"User messages align end and use the primary-filled default variant."})})]})},n={render:()=>e.jsxs(s,{variant:"muted",className:"max-w-md",children:[e.jsx(r,{children:"Claim CLM-1042 has been approved."}),e.jsx(l,{children:"🎉 2"})]})},h=["AllVariants","UserVsAssistant","WithReactions"];a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex max-w-md flex-col gap-3">
      {(['default', 'secondary', 'muted', 'tinted', 'outline', 'ghost', 'destructive'] as const).map(variant => <Bubble key={variant} variant={variant}>
          <BubbleContent>{variant} variant</BubbleContent>
        </Bubble>)}
    </div>
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'User (end) vs. assistant (start)',
  render: () => <BubbleGroup className="max-w-md">
      <Bubble variant="muted" align="start">
        <BubbleContent>Assistant messages align start and use a muted surface.</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>User messages align end and use the primary-filled default variant.</BubbleContent>
      </Bubble>
    </BubbleGroup>
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Bubble variant="muted" className="max-w-md">
      <BubbleContent>Claim CLM-1042 has been approved.</BubbleContent>
      <BubbleReactions>🎉 2</BubbleReactions>
    </Bubble>
}`,...n.parameters?.docs?.source}}};export{a as AllVariants,t as UserVsAssistant,n as WithReactions,h as __namedExportsOrder,g as default};
