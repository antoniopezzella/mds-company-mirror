import{Z as e}from"./iframe-CPBTUrEW.js";import{C as d,e as c,f as l,c as m,b as g,d as h,g as p}from"./card-DdSDVEd-.js";import{B as u}from"./badge-J44eyYsr.js";import{B as C}from"./button-_tNb_vhW.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./index-Dk2lMVn3.js";import"./index-DTX6ga2Q.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";const B={title:"Components/Card",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:'# Card\n\nThe composable `Card`/`CardHeader`/`CardTitle`/`CardDescription`/\n`CardContent`/`CardFooter` primitives are the canonical primitive shape —\nthe primary API here. `ContentCard` is a convenience wrapper matching\nwhat the MDS Card\'s own Figma spec actually describes (see the note in\ncard.tsx about the existing MUI `Card.tsx` being a differently-scoped\n"insight/stats card", already covered by `metric-card`).'}}}},r={render:()=>e.jsx("div",{className:"w-[360px]",children:e.jsxs(d,{children:[e.jsxs(c,{children:[e.jsx(l,{children:"Renewal reminder"}),e.jsx(m,{children:"Your commercial auto policy renews in 14 days."})]}),e.jsx(g,{children:e.jsx("p",{className:"text-sm",children:"Review your coverage limits before the renewal date to avoid a lapse."})}),e.jsxs(h,{children:[e.jsx(C,{variant:"primary",size:"sm",children:"Review policy"}),e.jsx(C,{variant:"outline",size:"sm",children:"Dismiss"})]})]})})},s={render:()=>e.jsx("div",{className:"w-[360px]",children:e.jsx(d,{border:!1,className:"shadow-md",children:e.jsxs(c,{children:[e.jsx(l,{children:"Shadow instead of border"}),e.jsxs(m,{children:["Set border=","{false}"," and add your own className for elevation."]})]})})})},n={render:a=>e.jsx("div",{className:"w-[320px]",children:e.jsx(p,{...a})}),args:{image:"https://picsum.photos/seed/marsh1/400/240",category:"Risk Insights",date:"Jan 12, 2026",title:"How to prepare for hurricane season",description:"A practical guide to assessing exposure and reviewing coverage before peak season.",ctaLabel:"Read more",onCtaClick:()=>alert("Navigate to article")}},t={render:a=>e.jsx("div",{className:"w-[480px]",children:e.jsx(p,{...a})}),args:{orientation:"horizontal",image:"https://picsum.photos/seed/marsh2/300/300",category:"Claims",date:"Feb 3, 2026",title:"Filing a claim after a covered loss",description:"Step-by-step guidance for what to document and who to contact."}},o={render:a=>e.jsx("div",{className:"w-[320px]",children:e.jsx(p,{...a})}),args:{category:"Cyber",title:"Cyber liability checklist",description:"Twelve questions to ask before your next renewal.",ctaLabel:"View checklist",onCtaClick:()=>alert("Navigate")}},i={render:()=>e.jsx("div",{className:"grid grid-cols-3 gap-4",children:[1,2,3].map(a=>e.jsx(d,{children:e.jsxs(c,{children:[e.jsx("div",{className:"mb-1 flex items-center gap-2",children:e.jsx(u,{tone:"info",soft:!0,children:"Policy"})}),e.jsxs(l,{children:["Policy #",a]}),e.jsxs(m,{children:["Auto insurance, renews in ",30*a," days"]})]})},a))})},H=["Composable","Borderless","ContentCardVertical","ContentCardHorizontal","ContentCardNoImage","CardGrid"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[360px]">
      <Card>
        <CardHeader>
          <CardTitle>Renewal reminder</CardTitle>
          <CardDescription>Your commercial auto policy renews in 14 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Review your coverage limits before the renewal date to avoid a lapse.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">Review policy</Button>
          <Button variant="outline" size="sm">Dismiss</Button>
        </CardFooter>
      </Card>
    </div>
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[360px]">
      <Card border={false} className="shadow-md">
        <CardHeader>
          <CardTitle>Shadow instead of border</CardTitle>
          <CardDescription>Set border={'{false}'} and add your own className for elevation.</CardDescription>
        </CardHeader>
      </Card>
    </div>
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <ContentCard {...args} />
    </div>,
  args: {
    image: 'https://picsum.photos/seed/marsh1/400/240',
    category: 'Risk Insights',
    date: 'Jan 12, 2026',
    title: 'How to prepare for hurricane season',
    description: 'A practical guide to assessing exposure and reviewing coverage before peak season.',
    ctaLabel: 'Read more',
    onCtaClick: () => alert('Navigate to article')
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[480px]">
      <ContentCard {...args} />
    </div>,
  args: {
    orientation: 'horizontal',
    image: 'https://picsum.photos/seed/marsh2/300/300',
    category: 'Claims',
    date: 'Feb 3, 2026',
    title: 'Filing a claim after a covered loss',
    description: 'Step-by-step guidance for what to document and who to contact.'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[320px]">
      <ContentCard {...args} />
    </div>,
  args: {
    category: 'Cyber',
    title: 'Cyber liability checklist',
    description: 'Twelve questions to ask before your next renewal.',
    ctaLabel: 'View checklist',
    onCtaClick: () => alert('Navigate')
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map(i => <Card key={i}>
          <CardHeader>
            <div className="mb-1 flex items-center gap-2">
              <Badge tone="info" soft>
                Policy
              </Badge>
            </div>
            <CardTitle>Policy #{i}</CardTitle>
            <CardDescription>Auto insurance, renews in {30 * i} days</CardDescription>
          </CardHeader>
        </Card>)}
    </div>
}`,...i.parameters?.docs?.source}}};export{s as Borderless,i as CardGrid,r as Composable,t as ContentCardHorizontal,o as ContentCardNoImage,n as ContentCardVertical,H as __namedExportsOrder,B as default};
