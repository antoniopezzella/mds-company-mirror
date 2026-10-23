import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./badge-BJRi19uA.js";import{n as i,t as a}from"./button-DatWLSj0.js";import{a as o,c as s,i as c,l,o as u,r as d,s as f,t as p}from"./card-tXlEGCFr.js";var m,h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{l(),n(),i(),m=t(),h={title:`Components/Card`,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:'# Card\n\nThe composable `Card`/`CardHeader`/`CardTitle`/`CardDescription`/\n`CardContent`/`CardFooter` primitives are the canonical primitive shape —\nthe primary API here. `ContentCard` is a convenience wrapper matching\nwhat the MDS Card\'s own Figma spec actually describes (see the note in\ncard.tsx about the existing MUI `Card.tsx` being a differently-scoped\n"insight/stats card", already covered by `metric-card`).'}}}},g={render:()=>(0,m.jsx)(`div`,{className:`w-[360px]`,children:(0,m.jsxs)(p,{children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Renewal reminder`}),(0,m.jsx)(c,{children:`Your commercial auto policy renews in 14 days.`})]}),(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{className:`text-sm`,children:`Review your coverage limits before the renewal date to avoid a lapse.`})}),(0,m.jsxs)(o,{children:[(0,m.jsx)(a,{variant:`primary`,size:`sm`,children:`Review policy`}),(0,m.jsx)(a,{variant:`outline`,size:`sm`,children:`Dismiss`})]})]})})},_={render:()=>(0,m.jsx)(`div`,{className:`w-[360px]`,children:(0,m.jsx)(p,{border:!1,className:`shadow-md`,children:(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Shadow instead of border`}),(0,m.jsxs)(c,{children:[`Set border=`,`{false}`,` and add your own className for elevation.`]})]})})})},v={render:e=>(0,m.jsx)(`div`,{className:`w-[320px]`,children:(0,m.jsx)(s,{...e})}),args:{image:`https://picsum.photos/seed/marsh1/400/240`,category:`Risk Insights`,date:`Jan 12, 2026`,title:`How to prepare for hurricane season`,description:`A practical guide to assessing exposure and reviewing coverage before peak season.`,ctaLabel:`Read more`,onCtaClick:()=>alert(`Navigate to article`)}},y={render:e=>(0,m.jsx)(`div`,{className:`w-[480px]`,children:(0,m.jsx)(s,{...e})}),args:{orientation:`horizontal`,image:`https://picsum.photos/seed/marsh2/300/300`,category:`Claims`,date:`Feb 3, 2026`,title:`Filing a claim after a covered loss`,description:`Step-by-step guidance for what to document and who to contact.`}},b={render:e=>(0,m.jsx)(`div`,{className:`w-[320px]`,children:(0,m.jsx)(s,{...e})}),args:{category:`Cyber`,title:`Cyber liability checklist`,description:`Twelve questions to ask before your next renewal.`,ctaLabel:`View checklist`,onCtaClick:()=>alert(`Navigate`)}},x={render:()=>(0,m.jsx)(`div`,{className:`grid grid-cols-3 gap-4`,children:[1,2,3].map(e=>(0,m.jsx)(p,{children:(0,m.jsxs)(u,{children:[(0,m.jsx)(`div`,{className:`mb-1 flex items-center gap-2`,children:(0,m.jsx)(r,{tone:`info`,soft:!0,children:`Policy`})}),(0,m.jsxs)(f,{children:[`Policy #`,e]}),(0,m.jsxs)(c,{children:[`Auto insurance, renews in `,30*e,` days`]})]})},e))})},S=[`Composable`,`Borderless`,`ContentCardVertical`,`ContentCardHorizontal`,`ContentCardNoImage`,`CardGrid`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[360px]">
      <Card border={false} className="shadow-md">
        <CardHeader>
          <CardTitle>Shadow instead of border</CardTitle>
          <CardDescription>Set border={'{false}'} and add your own className for elevation.</CardDescription>
        </CardHeader>
      </Card>
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}}})))()}C();export{_ as Borderless,x as CardGrid,g as Composable,y as ContentCardHorizontal,b as ContentCardNoImage,v as ContentCardVertical,S as __namedExportsOrder,h as default};