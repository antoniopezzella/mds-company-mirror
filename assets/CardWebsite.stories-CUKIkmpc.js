import{Z as e,N as f}from"./iframe-CPBTUrEW.js";import{C as R,a as B}from"./CarouselSection-CsocSS-r.js";import{c as b}from"./createSvgIcon-sccWia23.js";import{B as s}from"./Box-DJ9yov3l.js";import"./preload-helper-PPVm8Dsz.js";import"./ArrowForward-Cf21FGou.js";import"./index-mcw-touw.js";import"./separator-Cz9zTVn9.js";import"./index-DbquDQCT.js";import"./index-DTX6ga2Q.js";import"./utils-CURkPv3a.js";import"./skeleton-C-ZAhKi4.js";import"./index-Dk2lMVn3.js";import"./card-DdSDVEd-.js";import"./arrow-right-DRUl2urG.js";import"./createLucideIcon-BnpAccaP.js";import"./Button-CQwjjN5c.js";import"./useTheme-Cup9dysz.js";import"./Button-C7hKXtr1.js";import"./styled-CijOp1BY.js";import"./memoTheme-BVzAl7br.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./ButtonBase-bvGWYjN8.js";import"./useTimeout-BkF-taVW.js";import"./useForkRef-DKrbSgSS.js";import"./useEventCallback-BK5EjOzt.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-CvjKlzvo.js";import"./Typography-B8Azb_EI.js";import"./SvgIcon-B0F0eofH.js";const P=b([e.jsx("path",{d:"M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93 0-1.1-.9-2-2-2"},"0"),e.jsx("path",{d:"m15 9 .94-2.07L18 6l-2.06-.93L15 3l-.92 2.07L12 6l2.08.93zM3.5 11 4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9z"},"1")]),t={primary:f("surface.hero"),neutral:f("surface.accent"),sky:f("surface.secondary"),white:void 0},o=(r,C=340)=>({display:"grid",gridTemplateRows:"auto auto",width:C,...r&&{backgroundColor:r,p:3}}),sr={title:"Components/CardWebsite",component:R,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Editorial card for the Marsh One website. Supports three surface variants (Neutral, Sky Blue, Primary Blue), optional image, category header, brand icon, and a CTA arrow. Interactive states (hover wash, focus ring, active title) are CSS-driven. Vertical layout relies on a CSS Grid ancestor supplying two row tracks (image + content) via `subgrid` — matched here in each story via a wrapping grid `Box`, mirroring `CarouselSection.module.scss`'s real `.cardList` grid."}}},argTypes:{surface:{control:"select",options:["neutral","sky","primary"],description:"Background surface: Neutral (white), Sky Blue, or Primary Blue (navy)"},skeleton:{control:"boolean"},hasImage:{control:"boolean"},hasHeader:{control:"boolean"},hasIcon:{control:"boolean"},hasTitle:{control:"boolean"},hasDescription:{control:"boolean"},hasCtaButton:{control:"boolean"}},decorators:[r=>e.jsx(s,{sx:o(),children:e.jsx(r,{})})]},a={title:"Cyber Risk",description:"Navigate the evolving threat landscape with tailored cyber insurance and risk advisory.",imageSrc:"/images/journey-bloomberg.jpg",imageAlt:"Cyber Risk",layout:"vertical",aspectRatio:"1:1",href:"#"},k=a,i={args:{...a,surface:"neutral"},decorators:[r=>e.jsx(s,{sx:o(t.neutral),children:e.jsx(r,{})})]},n={args:{...a,surface:"sky"},decorators:[r=>e.jsx(s,{sx:o(t.sky),children:e.jsx(r,{})})]},c={args:{...k,surface:"primary"},decorators:[r=>e.jsx(s,{sx:o(t.primary),children:e.jsx(r,{})})]},l={name:"Primary Blue (hover state)",args:{...k,surface:"primary",forceState:"hover"},decorators:[r=>e.jsx(s,{sx:o(t.primary),children:e.jsx(r,{})})]},v=[{id:"cyber",title:"Cyber Risk",description:"Navigate the evolving threat landscape with tailored cyber insurance and risk advisory.",imageSrc:"/images/journey-bloomberg.jpg",imageAlt:"Cyber Risk",surface:"primary",layout:"vertical",category:"Insurance",aspectRatio:"1:1"},{id:"casualty",title:"Casualty",description:"Comprehensive liability solutions designed for the risks your business faces today.",imageSrc:"/images/journey-davos.jpg",imageAlt:"Casualty",surface:"primary",layout:"vertical",category:"Insurance",aspectRatio:"1:1"},{id:"multinacional",title:"Multinational",description:"Coordinated global programs that protect your operations across every jurisdiction.",imageSrc:"/images/journey-aviation.jpg",imageAlt:"Multinational",surface:"primary",layout:"vertical",category:"Solutions",aspectRatio:"1:1"},{id:"political-risk",title:"Political Risk",description:"Protect your investments and operations against political instability worldwide.",imageSrc:"/images/journey-global-risks.jpg",imageAlt:"Political Risk",surface:"primary",layout:"vertical",category:"Insurance",aspectRatio:"1:1"},{id:"risk-consulting",title:"Risk Consulting",description:"Strategic advisory to identify, quantify, and reduce risk across your enterprise.",imageSrc:"/images/journey-bloomberg.jpg",imageAlt:"Risk Consulting",surface:"primary",layout:"vertical",category:"Advisory",aspectRatio:"1:1"},{id:"global-report",title:"Global Risk Report 2026",description:"Data and insights from more than 1,300 global experts on the top risks ahead.",imageSrc:"/images/journey-global-risks.jpg",imageAlt:"Global Risk Report",surface:"primary",layout:"vertical",category:"Report",aspectRatio:"1:1"}],p={name:"Section Carousel (real production)",decorators:[],parameters:{layout:"fullscreen"},render:()=>e.jsx(B,{surface:"hero",style:"top",title:"Find the risks that matter to your business",description:"Explore Marsh solutions by risk area and sector with guidance from our specialists.",ctaLabel:"Browse all risk areas",items:v,hideCategories:!0})},d={decorators:[],render:()=>e.jsx(s,{sx:{display:"flex",gap:3,flexWrap:"wrap",maxWidth:1300},children:["neutral","sky","primary"].map(r=>e.jsx(s,{sx:o(t[r]),children:e.jsx(R,{...r==="primary"?k:a,surface:r})},r))})},m={args:{...a,skeleton:!0}},u={decorators:[],render:()=>e.jsx(s,{sx:{display:"flex",gap:3,flexWrap:"wrap",maxWidth:1200},children:["neutral","sky","primary"].map(r=>e.jsx(s,{sx:o(t[r]),children:e.jsx(R,{...a,surface:r,skeleton:!0})},r))})},g={args:{...a,surface:"neutral",icon:e.jsx(P,{sx:{fontSize:48}}),hasImage:!1}},y={args:{...a,hasImage:!1}},S={args:{...a,hasDescription:!1}},h={name:"With header row (category + date)",args:{...a,category:"Insurance",timestamp:"03/14/2026"}},x={args:{...a,hasCtaButton:!1}},or=["Neutral","SkyBlue","PrimaryBlue","PrimaryBlueHover","SectionCarousel","AllSurfaces","Skeleton","SkeletonAllSurfaces","WithBrandIcon","NoImage","NoDescription","WithHeaderRow","NoCta"];i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    surface: 'neutral'
  },
  decorators: [Story => <Box sx={cardGrid(SURFACE_BG.neutral)}><Story /></Box>]
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    surface: 'sky'
  },
  decorators: [Story => <Box sx={cardGrid(SURFACE_BG.sky)}><Story /></Box>]
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...REAL_HERO_PROPS,
    surface: 'primary'
  },
  decorators: [Story => <Box sx={cardGrid(SURFACE_BG.primary)}><Story /></Box>]
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Primary Blue (hover state)',
  args: {
    ...REAL_HERO_PROPS,
    surface: 'primary',
    forceState: 'hover'
  },
  decorators: [Story => <Box sx={cardGrid(SURFACE_BG.primary)}><Story /></Box>]
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Section Carousel (real production)',
  decorators: [],
  // full section, not a single card — no grid wrapper needed
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <CarouselSection surface="hero" style="top" title="Find the risks that matter to your business" description="Explore Marsh solutions by risk area and sector with guidance from our specialists." ctaLabel="Browse all risk areas" items={CAROUSEL_CARDS} hideCategories />
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    skeleton: true
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  decorators: [],
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
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    surface: 'neutral',
    icon: <InsightsIcon sx={{
      fontSize: 48
    }} />,
    hasImage: false
  }
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    hasImage: false
  }
}`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    hasDescription: false
  }
}`,...S.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'With header row (category + date)',
  args: {
    ...DEMO_PROPS,
    category: 'Insurance',
    timestamp: '03/14/2026'
  }
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEMO_PROPS,
    hasCtaButton: false
  }
}`,...x.parameters?.docs?.source}}};export{d as AllSurfaces,i as Neutral,x as NoCta,S as NoDescription,y as NoImage,c as PrimaryBlue,l as PrimaryBlueHover,p as SectionCarousel,m as Skeleton,u as SkeletonAllSurfaces,n as SkyBlue,g as WithBrandIcon,h as WithHeaderRow,or as __namedExportsOrder,sr as default};
