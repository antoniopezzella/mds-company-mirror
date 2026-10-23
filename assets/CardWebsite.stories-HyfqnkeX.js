import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Box-BD9Vi1Pp.js";import{n as i,t as a}from"./roles-DNqHlq35.js";import{n as o,t as s}from"./createSvgIcon-B9dc8nbu.js";import{i as c,n as l,r as u,t as d}from"./CarouselSection-BrNoekeW.js";var f,p;function m(){return(m=e((()=>{o(),f=t(),p=s([(0,f.jsx)(`path`,{d:`M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93 0-1.1-.9-2-2-2`},`0`),(0,f.jsx)(`path`,{d:`m15 9 .94-2.07L18 6l-2.06-.93L15 3l-.92 2.07L12 6l2.08.93zM3.5 11 4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9z`},`1`)],`Insights`)})))()}var h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{c(),n(),m(),i(),l(),h=t(),g={primary:a(`bg.primary`),neutral:a(`bg.neutral.subtle`),sky:a(`bg.secondary`),white:void 0},_=(e,t=340)=>({display:`grid`,gridTemplateRows:`auto auto`,width:t,...e&&{backgroundColor:e,p:3}}),v={title:`Components/CardWebsite`,component:u,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Editorial card for the Marsh One website. Supports three surface variants (Neutral, Sky Blue, Primary Blue), optional image, category header, brand icon, and a CTA arrow. Interactive states (hover wash, focus ring, active title) are CSS-driven. Vertical layout relies on a CSS Grid ancestor supplying two row tracks (image + content) via `subgrid` — matched here in each story via a wrapping grid `Box`, mirroring `CarouselSection.module.scss`'s real `.cardList` grid."}}},argTypes:{surface:{control:`select`,options:[`neutral`,`sky`,`primary`],description:`Background surface: Neutral (white), Sky Blue, or Primary Blue (navy)`},skeleton:{control:`boolean`},hasImage:{control:`boolean`},hasHeader:{control:`boolean`},hasIcon:{control:`boolean`},hasTitle:{control:`boolean`},hasDescription:{control:`boolean`},hasCtaButton:{control:`boolean`}},decorators:[e=>(0,h.jsx)(r,{sx:_(),children:(0,h.jsx)(e,{})})]},y={title:`Cyber Risk`,description:`Navigate the evolving threat landscape with tailored cyber insurance and risk advisory.`,imageSrc:`/images/journey-bloomberg.jpg`,imageAlt:`Cyber Risk`,layout:`vertical`,aspectRatio:`1:1`,href:`#`},b=y,x={args:{...y,surface:`neutral`},decorators:[e=>(0,h.jsx)(r,{sx:_(g.neutral),children:(0,h.jsx)(e,{})})]},S={args:{...y,surface:`sky`},decorators:[e=>(0,h.jsx)(r,{sx:_(g.sky),children:(0,h.jsx)(e,{})})]},C={args:{...b,surface:`primary`},decorators:[e=>(0,h.jsx)(r,{sx:_(g.primary),children:(0,h.jsx)(e,{})})]},w={name:`Primary Blue (hover state)`,args:{...b,surface:`primary`,forceState:`hover`},decorators:[e=>(0,h.jsx)(r,{sx:_(g.primary),children:(0,h.jsx)(e,{})})]},T=[{id:`cyber`,title:`Cyber Risk`,description:`Navigate the evolving threat landscape with tailored cyber insurance and risk advisory.`,imageSrc:`/images/journey-bloomberg.jpg`,imageAlt:`Cyber Risk`,surface:`primary`,layout:`vertical`,category:`Insurance`,aspectRatio:`1:1`},{id:`casualty`,title:`Casualty`,description:`Comprehensive liability solutions designed for the risks your business faces today.`,imageSrc:`/images/journey-davos.jpg`,imageAlt:`Casualty`,surface:`primary`,layout:`vertical`,category:`Insurance`,aspectRatio:`1:1`},{id:`multinacional`,title:`Multinational`,description:`Coordinated global programs that protect your operations across every jurisdiction.`,imageSrc:`/images/journey-aviation.jpg`,imageAlt:`Multinational`,surface:`primary`,layout:`vertical`,category:`Solutions`,aspectRatio:`1:1`},{id:`political-risk`,title:`Political Risk`,description:`Protect your investments and operations against political instability worldwide.`,imageSrc:`/images/journey-global-risks.jpg`,imageAlt:`Political Risk`,surface:`primary`,layout:`vertical`,category:`Insurance`,aspectRatio:`1:1`},{id:`risk-consulting`,title:`Risk Consulting`,description:`Strategic advisory to identify, quantify, and reduce risk across your enterprise.`,imageSrc:`/images/journey-bloomberg.jpg`,imageAlt:`Risk Consulting`,surface:`primary`,layout:`vertical`,category:`Advisory`,aspectRatio:`1:1`},{id:`global-report`,title:`Global Risk Report 2026`,description:`Data and insights from more than 1,300 global experts on the top risks ahead.`,imageSrc:`/images/journey-global-risks.jpg`,imageAlt:`Global Risk Report`,surface:`primary`,layout:`vertical`,category:`Report`,aspectRatio:`1:1`}],E={name:`Section Carousel (real production)`,decorators:[],parameters:{layout:`fullscreen`},render:()=>(0,h.jsx)(d,{surface:`hero`,style:`top`,title:`Find the risks that matter to your business`,description:`Explore Marsh solutions by risk area and sector with guidance from our specialists.`,ctaLabel:`Browse all risk areas`,items:T,hideCategories:!0})},D={decorators:[],render:()=>(0,h.jsx)(r,{sx:{display:`flex`,gap:3,flexWrap:`wrap`,maxWidth:1300},children:[`neutral`,`sky`,`primary`].map(e=>(0,h.jsx)(r,{sx:_(g[e]),children:(0,h.jsx)(u,{...e===`primary`?b:y,surface:e})},e))})},O={args:{...y,skeleton:!0}},k={decorators:[],parameters:{a11y:{config:{rules:[{id:`scrollable-region-focusable`,enabled:!1}]}}},render:()=>(0,h.jsx)(r,{sx:{display:`flex`,gap:3,flexWrap:`wrap`,maxWidth:1200},children:[`neutral`,`sky`,`primary`].map(e=>(0,h.jsx)(r,{sx:_(g[e]),children:(0,h.jsx)(u,{...y,surface:e,skeleton:!0})},e))})},A={args:{...y,surface:`neutral`,icon:(0,h.jsx)(p,{sx:{fontSize:48}}),hasImage:!1}},j={args:{...y,hasImage:!1}},M={args:{...y,hasDescription:!1}},N={name:`With header row (category + date)`,args:{...y,category:`Insurance`,timestamp:`03/14/2026`}},P={args:{...y,hasCtaButton:!1}},F=[`Neutral`,`SkyBlue`,`PrimaryBlue`,`PrimaryBlueHover`,`SectionCarousel`,`AllSurfaces`,`Skeleton`,`SkeletonAllSurfaces`,`WithBrandIcon`,`NoImage`,`NoDescription`,`WithHeaderRow`,`NoCta`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    surface: 'neutral'
  },
  decorators: [Story => <Box sx={cardGrid(SURFACE_BG.neutral)}><Story /></Box>]
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    surface: 'sky'
  },
  decorators: [Story => <Box sx={cardGrid(SURFACE_BG.sky)}><Story /></Box>]
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...REAL_HERO_PROPS,
    surface: 'primary'
  },
  decorators: [Story => <Box sx={cardGrid(SURFACE_BG.primary)}><Story /></Box>]
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Primary Blue (hover state)',
  args: {
    ...REAL_HERO_PROPS,
    surface: 'primary',
    forceState: 'hover'
  },
  decorators: [Story => <Box sx={cardGrid(SURFACE_BG.primary)}><Story /></Box>]
}`,...w.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Section Carousel (real production)',
  decorators: [],
  // full section, not a single card — no grid wrapper needed
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <CarouselSection surface="hero" style="top" title="Find the risks that matter to your business" description="Explore Marsh solutions by risk area and sector with guidance from our specialists." ctaLabel="Browse all risk areas" items={CAROUSEL_CARDS} hideCategories />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  decorators: [],
  // override meta-level single-card wrapper — this story lays out its own grid per card
  render: () => <Box sx={{
    display: 'flex',
    gap: 3,
    flexWrap: 'wrap',
    maxWidth: 1300
  }}>
      {(['neutral', 'sky', 'primary'] as const).map(surface => <Box key={surface} sx={cardGrid(SURFACE_BG[surface])}>
          <CardWebsite {...surface === 'primary' ? REAL_HERO_PROPS : DEMO_PROPS} surface={surface} />
        </Box>)}
    </Box>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    skeleton: true
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  decorators: [],
  parameters: {
    a11y: {
      config: {
        rules: [{
          // The scrollable element axe flags here is <body> itself: three
          // skeleton cards side by side make the canvas scroll, and a
          // skeleton is a placeholder — by definition it contains no link,
          // button or control, so the whole story has nothing focusable.
          // That is a property of previewing loading state in isolation,
          // not of the component: the loaded card IS a link (\`href\`), every
          // other CardWebsite story passes this rule, and on a real page
          // the skeletons sit among a header and nav that make the body
          // scroll keyboard-reachable. Scoped to this story only, so the
          // rule still guards genuinely scrollable containers elsewhere —
          // the same reasoning as BorderContrast.stories.tsx and
          // HeroBanner's no-CTA story.
          id: 'scrollable-region-focusable',
          enabled: false
        }]
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    gap: 3,
    flexWrap: 'wrap',
    maxWidth: 1200
  }}>
      {(['neutral', 'sky', 'primary'] as const).map(surface => <Box key={surface} sx={cardGrid(SURFACE_BG[surface])}>
          <CardWebsite {...DEMO_PROPS} surface={surface} skeleton />
        </Box>)}
    </Box>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    surface: 'neutral',
    icon: <InsightsIcon sx={{
      fontSize: 48
    }} />,
    hasImage: false
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    hasImage: false
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    hasDescription: false
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'With header row (category + date)',
  args: {
    ...DEMO_PROPS,
    category: 'Insurance',
    timestamp: '03/14/2026'
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    hasCtaButton: false
  }
}`,...P.parameters?.docs?.source}}}})))()}I();export{D as AllSurfaces,x as Neutral,P as NoCta,M as NoDescription,j as NoImage,C as PrimaryBlue,w as PrimaryBlueHover,E as SectionCarousel,O as Skeleton,k as SkeletonAllSurfaces,S as SkyBlue,A as WithBrandIcon,N as WithHeaderRow,F as __namedExportsOrder,v as default};