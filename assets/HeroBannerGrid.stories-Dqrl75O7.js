import{a5 as r,Z as t,p as a}from"./iframe-CPBTUrEW.js";import{a as je,u as me,g as d,S as Pe}from"./index-mcw-touw.js";import{P as Re}from"./player.es-CJFxg_-U.js";import{D as K}from"./Button-CQwjjN5c.js";import{c as pe}from"./createLucideIcon-BnpAccaP.js";import{A as ge}from"./arrow-right-DRUl2urG.js";import{D as he}from"./download-CmOKzzeV.js";import"./preload-helper-PPVm8Dsz.js";import"./useTheme-Cup9dysz.js";import"./Button-C7hKXtr1.js";import"./styled-CijOp1BY.js";import"./memoTheme-BVzAl7br.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./ButtonBase-bvGWYjN8.js";import"./useTimeout-BkF-taVW.js";import"./useForkRef-DKrbSgSS.js";import"./useEventCallback-BK5EjOzt.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-CvjKlzvo.js";const Ve=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],He=pe("pause",Ve);const Me=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],Te=pe("play",Me),Be="_heroBanner_1iydy_4208",Le="_backgroundMedia_1iydy_4228",Ae="_parallaxTarget_1iydy_4264",Ie="_splitMedia_1iydy_4272",Ne="_mediaColumn_1iydy_4308",qe="_mediaOverscan_1iydy_4322",De="_mediaFill_1iydy_4337",Ge="_mediaCover_1iydy_4343",We="_mLogoOverlay_1iydy_4364",Oe="_mLogoSvg_1iydy_4374",Fe="_mLogoPath_1iydy_4386",ze="_playPauseWrapper_1iydy_4390",Ee="_playPauseButton_1iydy_4397",Ue="_contentContainer_1iydy_4405",$e="_heroColumn_1iydy_4424",Ze="_contentInner_1iydy_4436",Ke="_eyebrow_1iydy_4473",Je="_eyebrow__dash_1iydy_4479",Qe="_eyebrow__text_1iydy_4485",Xe="_title_1iydy_4503",Ye="_title__word_1iydy_4525",et="_subtitle_1iydy_4530",tt="_description_1iydy_4553",rt="_ctaGroup_1iydy_4572",it="_ctaGroup__button_1iydy_4589",ot="_cmsHint_1iydy_4607",e={heroBanner:Be,"heroBanner--dark":"_heroBanner--dark_1iydy_4221","heroBanner--light":"_heroBanner--light_1iydy_4224",backgroundMedia:Le,parallaxTarget:Ae,splitMedia:Ie,"splitMedia--left":"_splitMedia--left_1iydy_4291","splitMedia--right":"_splitMedia--right_1iydy_4299",mediaColumn:Ne,mediaOverscan:qe,"mediaOverscan--tall":"_mediaOverscan--tall_1iydy_4332",mediaFill:De,mediaCover:Ge,mLogoOverlay:We,mLogoSvg:Oe,mLogoPath:Fe,playPauseWrapper:ze,playPauseButton:Ee,contentContainer:Ue,"contentContainer--reversed":"_contentContainer--reversed_1iydy_4420",heroColumn:$e,"heroColumn--start7":"_heroColumn--start7_1iydy_4431",contentInner:Ze,"contentInner--insetLeft":"_contentInner--insetLeft_1iydy_4453","contentInner--insetRight":"_contentInner--insetRight_1iydy_4463",eyebrow:Ke,eyebrow__dash:Je,eyebrow__text:Qe,title:Xe,"title--withSubtitle":"_title--withSubtitle_1iydy_4513","title--withDescriptionOnly":"_title--withDescriptionOnly_1iydy_4516",title__word:Ye,subtitle:et,"subtitle--withDescription":"_subtitle--withDescription_1iydy_4543",description:tt,"description--withSubtitle":"_description--withSubtitle_1iydy_4562",ctaGroup:rt,ctaGroup__button:it,cmsHint:ot,"cmsHint--success":"_cmsHint--success_1iydy_4616","cmsHint--error":"_cmsHint--error_1iydy_4619"};d.registerPlugin(me,Pe);const at="(min-width: 1024px)",ye=({eyebrow:J,title:v,subtitle:_,description:u,primaryCta:m,secondaryCta:p,vimeoId:s,videoSrc:w,videoPoster:fe,imageSrc:g,imageAlt:f="Hero background",variant:be="dark",height:ve="100vh",imagePosition:Q="right",layout:o="split",mediaObjectPosition:x="center",maxTitleChars:F,maxDescriptionChars:z,showCmsHints:X=!1,disableAnimations:k=!1,showMLogoOverlay:E=!1,titleLineHeight:Y,children:_e})=>{const ee=be==="dark",[h,te]=r.useState(!0),S=r.useRef(null),U=r.useRef(null),[re,ie]=r.useState(!1),b=r.useRef(null),[$,oe]=r.useState(null);r.useEffect(()=>{if(ie(!1),oe(null),!s||!U.current)return;const i=new Re(U.current);b.current=i;let c=!1;const y=()=>{c||(c=!0,ie(!0))};i.on("error",y),i.ready().then(()=>i.getDuration()).then(()=>(c=!0,Promise.all([i.getVideoWidth(),i.getVideoHeight()]))).then(([T,ue])=>{T>0&&ue>0&&oe(T/ue)}).catch(y);const l=window.setTimeout(y,6e3);return()=>{window.clearTimeout(l),b.current=null,i.destroy().catch(()=>{})}},[s]);const Z=r.useRef(null),C=r.useRef(null),ae=r.useRef(null),ne=r.useRef(null),se=r.useRef(null),le=r.useRef(null),j=r.useRef(null),P=r.useRef(null),R=r.useRef(null),V=r.useRef(null),H=r.useRef(null),we=v.split(/(\s+)/),xe=()=>{s&&b.current?(h?b.current.pause():b.current.play(),te(!h)):w&&S.current&&(h?S.current.pause():S.current.play(),te(!h))},ce=je();me(()=>{if(k||ce)return;const i=d.matchMedia(),c=ae.current?.querySelectorAll("[data-hero-title-word]"),y=[ne.current,se.current,le.current].filter(Boolean),l=d.timeline({defaults:{duration:.7,ease:"power3.out"}});o==="split"&&P.current&&R.current&&(d.set(P.current,{clipPath:"inset(0 0 0 100%)"}),d.set(R.current,{opacity:0}),l.to(P.current,{clipPath:"inset(0 0 0 0)",duration:1.2,ease:"power2.inOut"},0),l.to(R.current,{opacity:1,duration:.8,ease:"power2.out"},.4)),E&&V.current&&H.current&&(d.set([V.current,H.current],{transformOrigin:"50% 50%"}),l.fromTo(V.current,{x:-72,opacity:0},{x:0,opacity:1,duration:.9,ease:"power3.out"},.5),l.fromTo(H.current,{x:72,opacity:0},{x:0,opacity:1,duration:.9,ease:"power3.out"},.5)),C.current&&l.fromTo(C.current,{opacity:0,y:24},{opacity:1,y:0,clearProps:"transform,opacity"},o==="split"?.4:0),c?.length&&l.fromTo(c,{opacity:0,y:28},{opacity:1,y:0,stagger:.045,clearProps:"transform,opacity"},C.current?"-=0.35":o==="split"?.4:0),y.length>0&&l.fromTo(y,{opacity:0,y:24},{opacity:1,y:0,stagger:.12,clearProps:"transform,opacity"},"-=0.2");const T=o==="split"&&!!s;i.add(at,()=>{j.current&&!T&&d.to(j.current,{yPercent:o==="split"?13:-13,ease:"none",scrollTrigger:{trigger:Z.current,start:"top top",end:"bottom top",scrub:1}})})},{scope:Z,dependencies:[k,ce,v,o,E,s]});const M=o==="split"&&Q==="left",ke=o==="split"&&Q==="right",de=()=>s&&!re?t.jsx("div",{className:e.mediaCover,style:$?{"--vimeo-cover-w":($*100).toFixed(3),"--vimeo-cover-h":(100/$).toFixed(3)}:void 0,children:t.jsx("iframe",{ref:U,src:`https://player.vimeo.com/video/${s}?autoplay=1&loop=1&autopause=0&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&background=1`,allow:"autoplay; fullscreen; picture-in-picture",title:f,frameBorder:"0"})}):s&&re&&g?t.jsx("img",{src:g,alt:f,loading:"lazy",className:e.mediaFill,style:{objectPosition:x}}):w?t.jsxs("video",{ref:S,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,poster:fe,className:e.mediaFill,style:{objectPosition:x},"aria-label":f,children:[t.jsx("source",{src:w,type:"video/mp4"}),g&&t.jsx("img",{src:g,alt:f,className:e.mediaFill,style:{objectPosition:x}})]}):g?t.jsx("img",{src:g,alt:f,loading:"lazy",className:e.mediaFill,style:{objectPosition:x}}):null,Se=t.jsxs("div",{className:a(e.contentInner,M&&e["contentInner--insetLeft"],ke&&e["contentInner--insetRight"]),children:[J&&t.jsxs("div",{ref:C,className:e.eyebrow,children:[t.jsx("span",{className:e.eyebrow__dash}),t.jsx("span",{className:e.eyebrow__text,children:J})]}),t.jsxs("div",{children:[X&&t.jsxs("span",{className:a(e.cmsHint,v.length>(F||999)?e["cmsHint--error"]:e["cmsHint--success"]),children:[v.length," ",F?`/ ${F}`:""," chars"]}),t.jsx("h1",{ref:ae,className:a(e.title,_?e["title--withSubtitle"]:u?e["title--withDescriptionOnly"]:void 0),style:Y!==void 0?{lineHeight:Y}:void 0,children:we.map((i,c)=>i.trim()?t.jsx("span",{"data-hero-title-word":!0,className:e.title__word,children:i},`${i}-${c}`):i)})]}),_&&t.jsx("h2",{ref:ne,className:a(e.subtitle,u&&e["subtitle--withDescription"]),children:_}),u&&t.jsxs("div",{style:{maxWidth:640},children:[X&&t.jsxs("span",{className:a(e.cmsHint,u.length>(z||999)?e["cmsHint--error"]:e["cmsHint--success"]),children:[u.length," ",z?`/ ${z}`:""," chars"]}),t.jsx("p",{ref:se,className:a(e.description,_&&e["description--withSubtitle"]),children:u})]}),_e,(m||p)&&t.jsxs("div",{ref:le,className:e.ctaGroup,children:[m&&t.jsx("div",{className:e.ctaGroup__button,children:t.jsx(K,{variant:"primaryAlt",size:"lg",onClick:m.onClick,endIcon:m.icon,"aria-label":m.text,children:m.text})}),p&&t.jsx("div",{className:e.ctaGroup__button,children:t.jsx(K,{variant:"secondary",size:"lg",inverse:ee,onClick:p.onClick,endIcon:p.icon,"aria-label":p.text,children:p.text})})]})]}),Ce=t.jsxs("div",{className:e.mediaColumn,children:[t.jsx("div",{ref:j,className:a(e.mediaOverscan,!(k||s)&&e["mediaOverscan--tall"]),style:{willChange:k?"auto":"transform"},children:de()}),o==="split"&&E&&t.jsx("div",{className:e.mLogoOverlay,children:t.jsxs("svg",{className:e.mLogoSvg,viewBox:"0 0 121 124",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[t.jsx("path",{ref:V,className:e.mLogoPath,d:"M0 0V123.885H22.5715V68.0532L58.2372 85.1171H59.9602L2.23957 0H0Z"}),t.jsx("path",{ref:H,className:e.mLogoPath,d:"M118.026 0L60.3051 85.1171H62.0282L97.6938 68.0532V123.885H120.265V0H118.026Z"})]})}),o==="split"&&(s||w)&&t.jsx("div",{className:e.playPauseWrapper,children:t.jsx(K,{variant:"primary",size:"sm",iconOnly:!0,icon:h?t.jsx(He,{size:18}):t.jsx(Te,{size:18}),onClick:xe,"aria-label":h?"Pause video":"Play video",className:e.playPauseButton})})]});return t.jsxs("section",{ref:Z,className:a(e.heroBanner,ee?e["heroBanner--dark"]:e["heroBanner--light"]),style:{"--hero-height":ve},"aria-label":"Hero banner",children:[o==="background"&&t.jsx("div",{className:e.backgroundMedia,children:t.jsx("div",{ref:j,className:e.parallaxTarget,children:de()})}),o==="split"&&t.jsx("div",{ref:P,className:a(e.splitMedia,M?e["splitMedia--left"]:e["splitMedia--right"]),children:Ce}),t.jsx("div",{className:a("container",e.contentContainer,M&&e["contentContainer--reversed"]),children:t.jsx("div",{className:a("row","align-center"),style:{width:"100%",margin:0},children:t.jsx("div",{ref:R,className:a("col-12 col-lg-6",e.heroColumn,M&&e["heroColumn--start7"]),children:Se})})})]})};ye.__docgenInfo={description:"Hero Banner (Grid build) — MUI/Emotion-free rebuild of `HeroBanner`\n(src/components/sections/HeroBanner/HeroBanner.tsx), same spec/behavior,\nstyled entirely through the MDS Grid (`src/styles/_grid.scss`, Bootstrap-\nclass-compatible) plus HeroBannerGrid.module.scss — a real, standalone\nstylesheet meant to be portable/shareable on its own.\n\nProp-for-prop and behavior-for-behavior parity with `HeroBanner` is\nintentional — this is a parallel build for review, not a redesign. The two\ndeliberate differences are documented inline where they occur: the single\n`HERO_BREAKPOINT_LG` constant (see above) and the fixed `#ffb700` eyebrow\ndash color (the source `.module.scss` this was ported from had it\ntransposed to `#ffbf00`).",methods:[],displayName:"HeroBannerGrid",props:{eyebrow:{required:!1,tsType:{name:"string"},description:'Small eyebrow text above headline (e.g., "Corporate")'},title:{required:!0,tsType:{name:"string"},description:"Main H1 headline"},subtitle:{required:!1,tsType:{name:"string"},description:"Optional H2 subtitle below headline"},description:{required:!1,tsType:{name:"string"},description:"Body paragraph text"},primaryCta:{required:!1,tsType:{name:"HeroBannerGridCTA"},description:'Primary CTA button - Use variant="primaryAlt" (gold) for hero/marketing or variant="primary" (blue) for dashboards'},secondaryCta:{required:!1,tsType:{name:"HeroBannerGridCTA"},description:"Secondary CTA button (outline style)"},videoSrc:{required:!1,tsType:{name:"string"},description:"Hero video source URL (takes priority over imageSrc)"},vimeoId:{required:!1,tsType:{name:"string"},description:'Vimeo video ID (e.g., "123456789") - takes priority over videoSrc'},videoPoster:{required:!1,tsType:{name:"string"},description:"Poster image for video (shown before video loads)"},imageSrc:{required:!1,tsType:{name:"string"},description:`Hero image source URL (fallback when no video). Also the fallback shown
if a Vimeo embed fails to load (blocked/restricted/deleted video) — when
using vimeoId, always pass this too, or a failed embed renders nothing.`},imageAlt:{required:!1,tsType:{name:"string"},description:"Alt text for hero image",defaultValue:{value:"'Hero background'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'dark' | 'light'",elements:[{name:"literal",value:"'dark'"},{name:"literal",value:"'light'"}]},description:"Background variant: dark (midnight blue) or light",defaultValue:{value:"'dark'",computed:!1}},height:{required:!1,tsType:{name:"string"},description:"Custom height (default: 100vh)",defaultValue:{value:"'100vh'",computed:!1}},imagePosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"Image/Video position: 'left' | 'right' (default: 'right')",defaultValue:{value:"'right'",computed:!1}},layout:{required:!1,tsType:{name:"union",raw:"'split' | 'background'",elements:[{name:"literal",value:"'split'"},{name:"literal",value:"'background'"}]},description:"Layout style: 'split' (side-by-side) or 'background' (media spans entire background)",defaultValue:{value:"'split'",computed:!1}},mediaObjectPosition:{required:!1,tsType:{name:"string"},description:"CSS object-position for image/video cropping",defaultValue:{value:"'center'",computed:!1}},maxTitleChars:{required:!1,tsType:{name:"number"},description:"Character limit for the title (truncates with ellipsis)"},maxDescriptionChars:{required:!1,tsType:{name:"number"},description:"Character limit for the description (truncates with ellipsis)"},showCmsHints:{required:!1,tsType:{name:"boolean"},description:"Display character counts over the text (Useful for CMS preview mode)",defaultValue:{value:"false",computed:!1}},disableAnimations:{required:!1,tsType:{name:"boolean"},description:"Disable GSAP animations (for accessibility/testing)",defaultValue:{value:"false",computed:!1}},showMLogoOverlay:{required:!1,tsType:{name:"boolean"},description:`Renders the Marsh "M" mark centered over the media column (split layout
only), formed from two GSAP-animated halves sliding in from opposite
sides.`,defaultValue:{value:"false",computed:!1}},titleLineHeight:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Overrides the title's line-height (defaults to `var(--typo-hero-h1-line-height)`)."},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Extra content rendered in the content column, after the description and before CTAs."}}};const Ct={title:"Website/HeroBannerGrid",component:ye,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:"\n## Hero Banner (Grid build)\n\nMUI/Emotion-free rebuild of `HeroBanner` — same spec, same behavior, styled\nentirely through the MDS Grid (`src/styles/_grid.scss`, Bootstrap-class-\ncompatible) plus a standalone `HeroBannerGrid.module.scss`. Built for review\nagainst the original and for handoff as a portable component + stylesheet.\n\nCompare directly against `Website/HeroBanner`'s equivalent stories, and via\n`/hero-banner-test` vs `/hero-banner-grid-test` for the full media-type toggle\nmatrix (Vimeo, self-hosted video, image, broken-Vimeo fallback).\n\n### What's identical to `HeroBanner`\n- Props, layouts (`split`/`background`), GSAP entrance + parallax animation\n- Vimeo Player.js wiring: container-query (cqw/cqh) iframe sizing, the 3-layer\n  failure detector (error event → ready()+getDuration() → 6s timeout), and the\n  `imageSrc` fallback on failure\n- Split+Vimeo parallax exclusion (see the component's `skipParallax` comment)\n\n### What's deliberately different\n- Zero MUI/Emotion in this component's own source (DSButton is the one\n  transitive MUI dependency, kept for the canonical DS button styling)\n- A single `HERO_BREAKPOINT_LG` constant (1024px, matching the grid's real\n  `lg`) replaces six independently-hardcoded 992px breakpoints in the MUI\n  version — see the exported constant's doc comment for why\n        "}}},argTypes:{variant:{control:"select",options:["dark","light"],description:"Background color variant",table:{defaultValue:{summary:"dark"}}},layout:{control:"select",options:["split","background"],description:"50/50 split or full-bleed background",table:{defaultValue:{summary:"split"}}},height:{control:"text",description:"Section height (CSS value)",table:{defaultValue:{summary:"100vh"}}},imagePosition:{control:"select",options:["left","right"],description:"Image/Video column position (split layout only)",table:{defaultValue:{summary:"right"}}},disableAnimations:{control:"boolean",description:"Disable GSAP animations (for accessibility/testing)",table:{defaultValue:{summary:"false"}}},eyebrow:{control:"text"},title:{control:"text"},subtitle:{control:"text"},description:{control:"text"},vimeoId:{control:"text",description:"Vimeo video ID — takes priority over videoSrc",table:{category:"Media"}},videoSrc:{control:"text",description:"Hero video URL — takes priority over imageSrc",table:{category:"Media"}},videoPoster:{control:"text",table:{category:"Media"}},imageSrc:{control:"text",table:{category:"Media"}},imageAlt:{control:"text"}}},n={args:{eyebrow:"Eyebrow",title:"Whatever risk, workforce, or capital challenge your business faces",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",primaryCta:{text:"Download Report",onClick:()=>console.debug("Download clicked"),icon:t.jsx(he,{size:18})},secondaryCta:{text:"Talk to Our Experts",onClick:()=>console.debug("Contact clicked")},imageSrc:"/images/journey-aviation.jpg",imageAlt:"Aerial view of city intersection",variant:"dark",height:"600px",imagePosition:"right",disableAnimations:!1}},B={args:{...n.args,vimeoId:"1146072483",imageSrc:"/images/journey-aviation.jpg"},parameters:{docs:{description:{story:"Vimeo background via Player.js. Verify: no white gaps at any viewport width, play/pause actually controls the player, and the container-query (cqw/cqh) sizing fills the split column correctly (not the viewport-relative oversizing the old vw/vh approach had)."}}}},L={args:{...n.args,vimeoId:"863362136",imageSrc:"/images/journey-aviation.jpg"}},A={args:{...n.args,vimeoId:"999999999999",imageSrc:"/images/journey-aviation.jpg"},parameters:{docs:{description:{story:"Invalid Vimeo ID. Should fall back to `imageSrc` within ~6s (timeout backstop) or sooner (error event) — never a raw Vimeo error page."}}}},I={args:{...n.args,videoSrc:"/video/WebsiteHeaderVideo-960x900_V1 (1).mp4",videoPoster:"/images/journey-aviation.jpg"}},N={args:{...n.args,layout:"background",vimeoId:"1146072483"},parameters:{docs:{description:{story:"Full-bleed background layout with Vimeo — the MUI HeroBanner has no Storybook story for this layout at all today; included here for parity coverage."}}}},q={args:{...n.args,height:"100vh",title:"Four powerful brand legacies united as Marsh McLennan",subtitle:"Risk, Strategy & People"}},D={args:{eyebrow:"Solutions",title:"Innovative risk solutions for modern businesses",subtitle:"Protecting what matters most",description:"Our comprehensive suite of risk management solutions helps businesses navigate uncertainty with confidence.",primaryCta:{text:"Get Started",onClick:()=>console.debug("Get Started clicked"),icon:t.jsx(ge,{size:18})},secondaryCta:{text:"Learn More",onClick:()=>console.debug("Learn More clicked")},imageSrc:"/images/journey-aviation.jpg",imageAlt:"Business professionals collaborating",variant:"light",height:"100vh",imagePosition:"right",disableAnimations:!1}},G={args:{...n.args,imagePosition:"left",vimeoId:"1146072483",title:"Innovation meets expertise in insurance solutions"},parameters:{docs:{description:{story:'Media on the left with Vimeo — exercises the content column\'s "start at column 7" grid placement (needed because split media is absolutely positioned outside `.row`, so `.col-lg-6` alone would default to the left half regardless of imagePosition).'}}}},W={args:{eyebrow:"Corporate Solutions",title:"Whatever risk, workforce, or capital challenge your business faces",subtitle:"Risk, Strategy & People",description:"We bring together the best of Marsh, Guy Carpenter, Mercer, and Oliver Wyman to help organizations navigate an uncertain world with confidence and expertise.",primaryCta:{text:"Download Report",onClick:()=>console.debug("Download clicked"),icon:t.jsx(he,{size:18})},secondaryCta:{text:"Talk to Our Experts",onClick:()=>console.debug("Contact clicked")},imageSrc:"/images/journey-aviation.jpg",imageAlt:"Aerial city view",variant:"dark",height:"700px",imagePosition:"right"}},O={args:{eyebrow:"Accessible",title:"Hero banner with animations disabled",subtitle:"For users with motion sensitivity",description:"This variant demonstrates the hero banner with the disableAnimations prop set to true.",primaryCta:{text:"Learn More",onClick:()=>console.debug("Learn More clicked"),icon:t.jsx(ge,{size:18})},videoSrc:"/video/WebsiteHeaderVideo-960x900_V1 (1).mp4",imageSrc:"/images/journey-aviation.jpg",imageAlt:"Accessible hero banner",variant:"dark",height:"100vh",imagePosition:"right",disableAnimations:!0}},jt=["Corporate","CorporateWithVimeo","CorporateWithVimeoLandscape","VimeoFallback","CorporateWithVideo","BackgroundLayout","FullHeight","LightVariant","ImageLeft","FiftyFiftySplit","AnimationsDisabled"];n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Eyebrow',
    title: 'Whatever risk, workforce, or capital challenge your business faces',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    primaryCta: {
      text: 'Download Report',
      onClick: () => console.debug('Download clicked'),
      icon: <Download size={18} />
    },
    secondaryCta: {
      text: 'Talk to Our Experts',
      onClick: () => console.debug('Contact clicked')
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Aerial view of city intersection',
    variant: 'dark',
    height: '600px',
    imagePosition: 'right',
    disableAnimations: false
  }
}`,...n.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    vimeoId: '1146072483',
    // Canonical demo asset — see project memory / test harness
    imageSrc: '/images/journey-aviation.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Vimeo background via Player.js. Verify: no white gaps at any viewport width, play/pause actually controls the player, and the container-query (cqw/cqh) sizing fills the split column correctly (not the viewport-relative oversizing the old vw/vh approach had).'
      }
    }
  }
}`,...B.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    vimeoId: '863362136',
    imageSrc: '/images/journey-aviation.jpg'
  }
}`,...L.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    vimeoId: '999999999999',
    imageSrc: '/images/journey-aviation.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Invalid Vimeo ID. Should fall back to \`imageSrc\` within ~6s (timeout backstop) or sooner (error event) — never a raw Vimeo error page.'
      }
    }
  }
}`,...A.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    videoSrc: '/video/WebsiteHeaderVideo-960x900_V1 (1).mp4',
    videoPoster: '/images/journey-aviation.jpg'
  }
}`,...I.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    layout: 'background',
    vimeoId: '1146072483'
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-bleed background layout with Vimeo — the MUI HeroBanner has no Storybook story for this layout at all today; included here for parity coverage.'
      }
    }
  }
}`,...N.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    height: '100vh',
    title: 'Four powerful brand legacies united as Marsh McLennan',
    subtitle: 'Risk, Strategy & People'
  }
}`,...q.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Solutions',
    title: 'Innovative risk solutions for modern businesses',
    subtitle: 'Protecting what matters most',
    description: 'Our comprehensive suite of risk management solutions helps businesses navigate uncertainty with confidence.',
    primaryCta: {
      text: 'Get Started',
      onClick: () => console.debug('Get Started clicked'),
      icon: <ArrowRight size={18} />
    },
    secondaryCta: {
      text: 'Learn More',
      onClick: () => console.debug('Learn More clicked')
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Business professionals collaborating',
    variant: 'light',
    height: '100vh',
    imagePosition: 'right',
    disableAnimations: false
  }
}`,...D.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    imagePosition: 'left',
    vimeoId: '1146072483',
    title: 'Innovation meets expertise in insurance solutions'
  },
  parameters: {
    docs: {
      description: {
        story: 'Media on the left with Vimeo — exercises the content column\\'s "start at column 7" grid placement (needed because split media is absolutely positioned outside \`.row\`, so \`.col-lg-6\` alone would default to the left half regardless of imagePosition).'
      }
    }
  }
}`,...G.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Corporate Solutions',
    title: 'Whatever risk, workforce, or capital challenge your business faces',
    subtitle: 'Risk, Strategy & People',
    description: 'We bring together the best of Marsh, Guy Carpenter, Mercer, and Oliver Wyman to help organizations navigate an uncertain world with confidence and expertise.',
    primaryCta: {
      text: 'Download Report',
      onClick: () => console.debug('Download clicked'),
      icon: <Download size={18} />
    },
    secondaryCta: {
      text: 'Talk to Our Experts',
      onClick: () => console.debug('Contact clicked')
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Aerial city view',
    variant: 'dark',
    height: '700px',
    imagePosition: 'right'
  }
}`,...W.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Accessible',
    title: 'Hero banner with animations disabled',
    subtitle: 'For users with motion sensitivity',
    description: 'This variant demonstrates the hero banner with the disableAnimations prop set to true.',
    primaryCta: {
      text: 'Learn More',
      onClick: () => console.debug('Learn More clicked'),
      icon: <ArrowRight size={18} />
    },
    videoSrc: '/video/WebsiteHeaderVideo-960x900_V1 (1).mp4',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Accessible hero banner',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right',
    disableAnimations: true
  }
}`,...O.parameters?.docs?.source}}};export{O as AnimationsDisabled,N as BackgroundLayout,n as Corporate,I as CorporateWithVideo,B as CorporateWithVimeo,L as CorporateWithVimeoLandscape,W as FiftyFiftySplit,q as FullHeight,G as ImageLeft,D as LightVariant,A as VimeoFallback,jt as __namedExportsOrder,Ct as default};
