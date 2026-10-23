import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Box-BD9Vi1Pp.js";import{n as a,t as o}from"./roles-DNqHlq35.js";import{n as s,t as c}from"./IconButton-BSL2ELJm.js";import{n as l,t as u}from"./Typography-anuSUXG9.js";import{i as d,n as f,r as p,t as m}from"./HeroBanner-BCGgMS39.js";var h,g,_;function v(){return(v=e((()=>{t(),r(),l(),s(),d(),f(),a(),h=n(),g=({title:e,titleEmphasis:t,description:n,imageSrc:r,imageAlt:i=`Brand film still`,videoSrc:a,vimeoId:o,videoPoster:s,videoDurationLabel:c,sourceLabel:l,showSilentFilmBadge:u=!0,height:d=`100vh`,disableAnimations:f=!1,play:p=!0})=>{let g=!!(a||o);return(0,h.jsx)(m,{layout:`background`,variant:`dark`,title:e,titleEmphasis:t,description:n,imageSrc:r,imageAlt:i,videoSrc:a,vimeoId:o,videoPoster:s,height:d,disableAnimations:f,play:p,showPlayButton:g,autoPlayVideo:!1,mediaControlsSlot:(0,h.jsx)(_,{showDecorativePlayIcon:!g,durationLabel:c,sourceLabel:l,showSilentFilmBadge:u})})},_=({showDecorativePlayIcon:e,durationLabel:t,sourceLabel:n,showSilentFilmBadge:r})=>(0,h.jsxs)(i,{sx:{display:`flex`,alignItems:`center`,gap:1.5},children:[e&&(0,h.jsx)(c,{"aria-hidden":!0,tabIndex:-1,sx:{width:40,height:40,backgroundColor:o(`bg.disabled`),color:o(`fg.on-dark`),pointerEvents:`none`,"&:hover":{backgroundColor:o(`bg.disabled`)}},children:(0,h.jsx)(p,{fontSize:`small`})}),(t||n)&&(0,h.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,lineHeight:1.2},children:[t&&(0,h.jsx)(u,{sx:{fontFamily:`var(--typo-body1-font-family)`,fontSize:12,fontWeight:600,color:o(`fg.on-dark`)},children:t}),n&&(0,h.jsx)(u,{sx:{fontFamily:`var(--typo-body1-font-family)`,fontSize:12,color:o(`fg.on-primary`),opacity:.85},children:n})]}),r&&(0,h.jsx)(i,{sx:{display:`inline-flex`,alignItems:`center`,px:`10px`,py:`4px`,borderRadius:`999px`,backgroundColor:o(`interactive.primary.active`)},children:(0,h.jsx)(u,{sx:{color:o(`fg.on-dark`),fontFamily:`var(--typo-body1-font-family)`,fontSize:12,fontWeight:500,whiteSpace:`nowrap`},children:`Silent film`})})]}),g.__docgenInfo={description:'Brand Film Section — a cinematic, full-bleed video/media section for the\nnew brand-website component library (first entry — see\ndocs reference: 1derlab.com "component-12-4"). Built on HeroBanner\'s\n`layout="background"` treatment rather than reimplementing video\nplayback, Vimeo fallback handling, or scroll parallax — see\nHeroBanner.tsx\'s `showPlayButton`/`autoPlayVideo`/`mediaControlsSlot`/\n`titleEmphasis` props, added specifically to support this component.',methods:[],displayName:`BrandFilmSection`,props:{title:{required:!0,tsType:{name:`string`},description:`First clause, regular weight — e.g. "A world in motion."`},titleEmphasis:{required:!1,tsType:{name:`string`},description:`Second clause, rendered italic — e.g. "A different way to see it."`},description:{required:!1,tsType:{name:`string`},description:``},imageSrc:{required:!0,tsType:{name:`string`},description:`Full-bleed background still. Required — the only asset this ships with
until real footage exists (see videoSrc/vimeoId below).`},imageAlt:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Brand film still'`,computed:!1}},videoSrc:{required:!1,tsType:{name:`string`},description:`Real video — once supplied, HeroBanner's own real play/pause control
takes over from the decorative placeholder icon.`},vimeoId:{required:!1,tsType:{name:`string`},description:``},videoPoster:{required:!1,tsType:{name:`string`},description:``},videoDurationLabel:{required:!1,tsType:{name:`string`},description:`e.g. "0:29"`},sourceLabel:{required:!1,tsType:{name:`string`},description:`e.g. "Marsh brand film · Excerpt"`},showSilentFilmBadge:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},height:{required:!1,tsType:{name:`string`},description:`Forwarded to HeroBanner.`,defaultValue:{value:`'100vh'`,computed:!1}},disableAnimations:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},play:{required:!1,tsType:{name:`boolean`},description:`Mirrors HeroBanner's own IntroLoader-gated entrance, if wired into a page that uses one.`,defaultValue:{value:`true`,computed:!1}}}}})))()}var y,b,x,S,C,w;function T(){return(T=e((()=>{v(),y={title:`Concepts/Brand Website/BrandFilmSection`,component:g,tags:[`autodocs`],parameters:{layout:`fullscreen`,a11y:{config:{rules:[{id:`scrollable-region-focusable`,enabled:!1}]}},docs:{description:{component:`
## Brand Film Section

First entry in a new "future-state brand website" component library
(\`src/projects/Marsh1DER/components/\`), inspired by
[1derlab.com's "component-12-4"](https://1derlab.com/#component-12-4) —
a cinematic, full-bleed brand-film section. Built on \`HeroBanner\`'s
\`layout="background"\` treatment (media reveal, scroll parallax, Vimeo/
video/image fallback chain) rather than reimplementing video playback —
see the \`showPlayButton\`/\`autoPlayVideo\`/\`mediaControlsSlot\`/
\`titleEmphasis\` props added to \`HeroBanner\` specifically to support
this.

Unlike \`HeroBanner\`'s other usages, video here does **not** autoplay —
matching the reference component's explicit "Silent film · Play"
pattern (a deliberate click-to-play moment, not ambient background
video).
        `}}}},b={args:{title:`A world in motion.`,titleEmphasis:`A different way to see it.`,description:`New connections. Different possibilities. Discover the perspectives that move us forward.`,imageSrc:`/images/journey-global-risks.jpg`,imageAlt:`A world in motion`,videoDurationLabel:`0:29`,sourceLabel:`Marsh brand film · Excerpt`,showSilentFilmBadge:!0},parameters:{docs:{description:{story:`Placeholder image only (no real footage yet) — shows the decorative, non-interactive play icon alongside the duration/source/"Silent film" meta row.`}}}},x={args:{...b.args,videoSrc:`/video/WebsiteHeaderVideo-960x900_V1 (1).mp4`,videoPoster:`/images/journey-global-risks.jpg`},parameters:{docs:{description:{story:`Stand-in video asset demonstrating the real, keyboard-operable play/pause control that appears once real footage exists — the decorative icon disappears, HeroBanner's own button takes over, and playback does not autoplay.`}}}},S={args:{title:`A world in motion, seen differently.`,imageSrc:`/images/journey-global-risks.jpg`,imageAlt:`A world in motion`},parameters:{docs:{description:{story:`Sanity-checks that titleEmphasis, description, and the meta row are all fully optional.`}}}},C={args:{...b.args,disableAnimations:!0},parameters:{docs:{description:{story:`Mirrors HeroBanner's own AnimationsDisabled story — content appears immediately at its fully-revealed state, no entrance tween or scroll parallax.`}}}},w=[`Default`,`WithRealVideo`,`NoEmphasis`,`ReducedMotion`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'A world in motion.',
    titleEmphasis: 'A different way to see it.',
    description: 'New connections. Different possibilities. Discover the perspectives that move us forward.',
    imageSrc: '/images/journey-global-risks.jpg',
    imageAlt: 'A world in motion',
    videoDurationLabel: '0:29',
    sourceLabel: 'Marsh brand film · Excerpt',
    showSilentFilmBadge: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Placeholder image only (no real footage yet) — shows the decorative, non-interactive play icon alongside the duration/source/"Silent film" meta row.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    videoSrc: '/video/WebsiteHeaderVideo-960x900_V1 (1).mp4',
    videoPoster: '/images/journey-global-risks.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Stand-in video asset demonstrating the real, keyboard-operable play/pause control that appears once real footage exists — the decorative icon disappears, HeroBanner\\'s own button takes over, and playback does not autoplay.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'A world in motion, seen differently.',
    imageSrc: '/images/journey-global-risks.jpg',
    imageAlt: 'A world in motion'
  },
  parameters: {
    docs: {
      description: {
        story: 'Sanity-checks that titleEmphasis, description, and the meta row are all fully optional.'
      }
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    disableAnimations: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Mirrors HeroBanner\\'s own AnimationsDisabled story — content appears immediately at its fully-revealed state, no entrance tween or scroll parallax.'
      }
    }
  }
}`,...C.parameters?.docs?.source}}}})))()}T();export{b as Default,S as NoEmphasis,C as ReducedMotion,x as WithRealVideo,w as __namedExportsOrder,y as default};