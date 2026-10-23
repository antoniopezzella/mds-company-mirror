import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{c as n,f as r,i,l as a,m as o,n as s,o as c,p as l,r as u,s as d,t as f,u as p}from"./questionnaire-DZICKRvU.js";var m,h,g,_;function v(){return(v=e((()=>{o(),m=t(),h={title:`Components/Questionnaire`,component:p,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`# Questionnaire

Multi-step form flow (progress, single/multi-select choices, keyboard
shortcuts, prev/next/submit navigation) — used for structured chat
intake flows. Built on \`@shadcn/react\`'s real form-state primitive.
Pre-existing in this repo (also used by AIAssistantChat's
ChatQuestionnaire), but had no Storybook story until now.`}}}},g={name:`Claim intake (multi-step)`,render:()=>(0,m.jsxs)(p,{className:`max-w-md`,items:[{name:`claimType`,required:!0,choices:[{value:`property`},{value:`liability`},{value:`cyber`}]},{name:`urgency`,required:!0,choices:[{value:`standard`},{value:`urgent`}]}],onSubmit:e=>e.preventDefault(),children:[(0,m.jsx)(a,{}),(0,m.jsxs)(c,{name:`claimType`,children:[(0,m.jsx)(l,{children:`What type of claim is this?`}),(0,m.jsx)(i,{children:`Select the coverage type that best matches the loss.`}),(0,m.jsxs)(u,{children:[(0,m.jsx)(s,{value:`property`,children:`Property`}),(0,m.jsx)(s,{value:`liability`,children:`Liability`}),(0,m.jsx)(s,{value:`cyber`,children:`Cyber`})]})]}),(0,m.jsxs)(c,{name:`urgency`,children:[(0,m.jsx)(l,{children:`How urgent is this?`}),(0,m.jsxs)(u,{children:[(0,m.jsx)(s,{value:`standard`,children:`Standard — respond within 5 business days`}),(0,m.jsx)(s,{value:`urgent`,children:`Urgent — active loss in progress`})]})]}),(0,m.jsxs)(f,{children:[(0,m.jsx)(n,{}),(0,m.jsxs)(`div`,{className:`flex gap-2`,children:[(0,m.jsx)(d,{}),(0,m.jsx)(r,{})]})]})]})},_=[`ClaimIntake`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Claim intake (multi-step)',
  render: () => <QuestionnaireRoot className="max-w-md" items={[{
    name: 'claimType',
    required: true,
    choices: [{
      value: 'property'
    }, {
      value: 'liability'
    }, {
      value: 'cyber'
    }]
  }, {
    name: 'urgency',
    required: true,
    choices: [{
      value: 'standard'
    }, {
      value: 'urgent'
    }]
  }]} onSubmit={e => e.preventDefault()}>
      <QuestionnaireProgress />

      <QuestionnaireItem name="claimType">
        <QuestionnaireTitle>What type of claim is this?</QuestionnaireTitle>
        <QuestionnaireDescription>Select the coverage type that best matches the loss.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="property">Property</QuestionnaireChoice>
          <QuestionnaireChoice value="liability">Liability</QuestionnaireChoice>
          <QuestionnaireChoice value="cyber">Cyber</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="urgency">
        <QuestionnaireTitle>How urgent is this?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="standard">Standard — respond within 5 business days</QuestionnaireChoice>
          <QuestionnaireChoice value="urgent">Urgent — active loss in progress</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <div className="flex gap-2">
          <QuestionnaireNext />
          <QuestionnaireSubmit />
        </div>
      </QuestionnaireActions>
    </QuestionnaireRoot>
}`,...g.parameters?.docs?.source}}}})))()}v();export{g as ClaimIntake,_ as __namedExportsOrder,h as default};