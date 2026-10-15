import{Z as e,a5 as i,N as c}from"./iframe-CPBTUrEW.js";import{D as ce}from"./Button-CQwjjN5c.js";import{a as Ze,u as De,g as a,S as Je}from"./index-mcw-touw.js";import{c as Fe}from"./createSvgIcon-sccWia23.js";import{P as Ye}from"./player.es-CJFxg_-U.js";import{B as t}from"./Box-DJ9yov3l.js";import{T as E}from"./Typography-B8Azb_EI.js";import{A as g}from"./ArrowForward-Cf21FGou.js";import{D as de}from"./Download-B5P3ssh5.js";import"./preload-helper-PPVm8Dsz.js";import"./useTheme-Cup9dysz.js";import"./Button-C7hKXtr1.js";import"./styled-CijOp1BY.js";import"./memoTheme-BVzAl7br.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./ButtonBase-bvGWYjN8.js";import"./useTimeout-BkF-taVW.js";import"./useForkRef-DKrbSgSS.js";import"./useEventCallback-BK5EjOzt.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-CvjKlzvo.js";import"./SvgIcon-B0F0eofH.js";const Xe=Fe(e.jsx("path",{d:"M8 5v14l11-7z"})),et=Fe(e.jsx("path",{d:"M6 19h4V5H6zm8-14v14h4V5z"})),tt="_mediaCover_19za1_4323",Ve={mediaCover:tt};a.registerPlugin(De,Je);const We=({eyebrow:pe,title:R,titleEmphasis:ie,subtitle:I,description:h,primaryCta:f,secondaryCta:y,vimeoId:n,videoSrc:b,videoPoster:ue,imageSrc:s,imageAlt:p="Hero background",variant:Le="dark",height:v="100vh",imagePosition:x="right",layout:r="split",mediaObjectPosition:m="center",maxTitleChars:re,maxDescriptionChars:ne,showCmsHints:me=!1,disableAnimations:V=!1,play:ge=!0,showMLogoOverlay:D=!1,titleLineHeight:qe,children:he,showPlayButton:Be=!1,autoPlayVideo:P=!0,mediaControlsSlot:fe})=>{const F=Le==="dark",[w,ye]=i.useState(P),T=i.useRef(null),W=i.useRef(null),[L,be]=i.useState(!1),H=i.useRef(null),[ae,ve]=i.useState(16/9);i.useEffect(()=>{if(be(!1),ve(16/9),!n||!W.current)return;const o=new Ye(W.current);H.current=o;let l=!1;const M=()=>{l||(l=!0,be(!0))};o.on("error",M),o.ready().then(()=>o.getDuration()).then(()=>(l=!0,Promise.all([o.getVideoWidth(),o.getVideoHeight()]))).then(([B,Ie])=>{B>0&&Ie>0&&ve(B/Ie)}).catch(M);const u=window.setTimeout(M,6e3);return()=>{window.clearTimeout(u),H.current=null,o.destroy().catch(()=>{})}},[n]);const xe=i.useMemo(()=>({position:"absolute",top:"50%",left:"50%",width:`max(100%, ${(ae*100).toFixed(3)}cqh)`,height:`max(${(100/ae).toFixed(3)}cqw, 100%)`,minHeight:"100%",minWidth:"100%",transform:"translate(-50%, -50%)",border:"none"}),[ae]),se=i.useRef(null),k=i.useRef(null),we=i.useRef(null),ke=i.useRef(null),Ce=i.useRef(null),Se=i.useRef(null),q=i.useRef(null),C=i.useRef(null),S=i.useRef(null),j=i.useRef(null),A=i.useRef(null),je=i.useRef(null),Ee=R.split(/(\s+)/),ze=ie?ie.split(/(\s+)/):[],Ae=Ze(),Ue=()=>{n&&H.current?(w?H.current.pause():H.current.play(),ye(!w)):b&&T.current&&(w?T.current.pause():T.current.play(),ye(!w))};De(()=>{if(V)return;const o=we.current?.querySelectorAll("[data-hero-title-word]"),l=[ke.current,Ce.current,je.current,Se.current].filter(Boolean);if(Ae){r==="split"&&C.current&&S.current&&(a.set(C.current,{clipPath:"inset(0 0 0 0)"}),a.set(S.current,{opacity:1})),D&&j.current&&A.current&&a.set([j.current,A.current],{x:0,opacity:1}),k.current&&a.set(k.current,{opacity:1,y:0}),o?.length&&a.set(o,{opacity:1,y:0}),l.length>0&&a.set(l,{opacity:1,y:0});return}const M=a.matchMedia(),u=a.timeline({paused:!ge,defaults:{duration:.7,ease:"power3.out"}});r==="split"&&C.current&&S.current&&(a.set(C.current,{clipPath:"inset(0 0 0 100%)"}),a.set(S.current,{opacity:0}),u.to(C.current,{clipPath:"inset(0 0 0 0)",duration:1.2,ease:"power2.inOut"},0),u.to(S.current,{opacity:1,duration:.8,ease:"power2.out"},.4)),D&&j.current&&A.current&&(a.set([j.current,A.current],{transformOrigin:"50% 50%"}),u.fromTo(j.current,{x:-72,opacity:0},{x:0,opacity:1,duration:.9,ease:"power3.out"},.5),u.fromTo(A.current,{x:72,opacity:0},{x:0,opacity:1,duration:.9,ease:"power3.out"},.5)),k.current&&u.fromTo(k.current,{opacity:0,y:24},{opacity:1,y:0,clearProps:"transform,opacity"},r==="split"?.4:0),o?.length&&u.fromTo(o,{opacity:0,y:28},{opacity:1,y:0,stagger:.045,clearProps:"transform,opacity"},k.current?"-=0.35":r==="split"?.4:0),l.length>0&&u.fromTo(l,{opacity:0,y:24},{opacity:1,y:0,stagger:.12,clearProps:"transform,opacity"},"-=0.2");const B=r==="split"&&!!n;M.add("(min-width: 992px)",()=>{q.current&&!B&&a.to(q.current,{yPercent:r==="split"?13:-13,ease:"none",scrollTrigger:{trigger:se.current,start:"top top",end:"bottom top",scrub:1}})})},{scope:se,dependencies:[V,ge,Ae,R,r,D,n]});const Oe={minHeight:v||{xs:"100vh",md:"640px"},display:"flex",flexDirection:"column",pt:{xs:"64px",md:0},backgroundColor:F?c("surface.hero"):c("surface.default"),position:"relative",overflow:"hidden","@media (min-width: 992px)":{display:"block"}},Ge={display:"flex",flexDirection:"column",justifyContent:"center",px:0,py:{xs:6,md:8},height:"100%",width:"100%",minHeight:{xs:"auto",md:v},minWidth:0},Ne={position:"relative",height:"100%",minHeight:{xs:"40vh",md:v},overflow:"hidden",display:"flex",alignItems:"stretch"},Pe=F?c("text.onHero"):c("text.primary"),Te=F?c("text.onHero"):c("text.secondary"),le=r==="split"&&x==="left",He=r==="split"&&x==="right",_e="col-12 col-lg-6",$e={px:{xs:0,md:0},"@media (min-width: 992px)":{pl:le?8:0,pr:He?8:0},"@media (min-width: 1200px)":{pl:le?10:0,pr:He?10:0}},Ke=e.jsxs(t,{sx:{...Ge,...$e},children:[pe&&e.jsxs(t,{ref:k,sx:{display:"flex",alignItems:"center",gap:1,mb:1},children:[e.jsx(t,{sx:{width:"40px",height:"2px",backgroundColor:c("brand.accent"),flexShrink:0}}),e.jsx(E,{variant:"body2",sx:{color:Te,fontSize:"16px",fontFamily:"var(--typo-body1-font-family)",fontWeight:400,lineHeight:"24px",textTransform:"none"},children:pe})]}),e.jsxs(t,{children:[me&&e.jsxs(t,{sx:{display:"inline-block",fontSize:"10px",p:"2px 6px",borderRadius:"4px",mb:.5,backgroundColor:R.length>(re||999)?"#d32f2f":"#2e7d32",color:"#fff",fontWeight:"bold"},children:[R.length," ",re?`/ ${re}`:""," chars"]}),e.jsxs(E,{ref:we,variant:"h1",component:"h1",sx:{color:Pe,mb:I?2:h?3:4,maxWidth:"640px",fontFamily:"var(--typo-hero-h1-font-family)",fontSize:"var(--typo-hero-h1-font-size)",fontWeight:"var(--typo-hero-h1-font-weight)",lineHeight:qe??"var(--typo-hero-h1-line-height)",letterSpacing:0},children:[Ee.map((o,l)=>o.trim()?e.jsx(t,{component:"span","data-hero-title-word":!0,sx:{display:"inline-block",whiteSpace:"pre"},children:o},`title-${o}-${l}`):o),ie&&" ",ze.map((o,l)=>o.trim()?e.jsx(t,{component:"span","data-hero-title-word":!0,sx:{display:"inline-block",whiteSpace:"pre",fontStyle:"italic"},children:o},`emphasis-${o}-${l}`):o)]})]}),I&&e.jsx(E,{ref:ke,variant:"h2",component:"h2",sx:{color:Pe,mb:h?1:3,fontSize:{xs:"18px",md:"22px"},fontWeight:700,lineHeight:{xs:"28px",md:"36px"},fontFamily:"var(--typo-body1-font-family)"},children:I}),h&&e.jsxs(t,{sx:{maxWidth:"640px"},children:[me&&e.jsxs(t,{sx:{display:"inline-block",fontSize:"10px",p:"2px 6px",borderRadius:"4px",mb:.5,backgroundColor:h.length>(ne||999)?"#d32f2f":"#2e7d32",color:"#fff",fontWeight:"bold"},children:[h.length," ",ne?`/ ${ne}`:""," chars"]}),e.jsx(E,{ref:Ce,variant:"body1",sx:{color:Te,mb:0,mt:h&&I?2:0,maxWidth:"640px",fontSize:{xs:"16px",md:"18px"},fontFamily:"var(--typo-body1-font-family)",lineHeight:{xs:"24px",md:"28px"},fontWeight:400},children:h})]}),he&&e.jsx(t,{ref:je,children:he}),(f||y)&&e.jsxs(t,{ref:Se,sx:{display:"flex",flexDirection:{xs:"column",lg:"row"},gap:2,flexWrap:{xs:"nowrap",lg:"wrap"},alignItems:{xs:"stretch",lg:"center"},mt:3,width:{xs:"100%",lg:"auto"}},children:[f&&e.jsx(t,{sx:{display:"block",width:{xs:"100%",lg:"auto"},"& > button":{width:{xs:"100%",lg:"auto"}}},children:e.jsx(ce,{variant:"primaryAlt",size:"lg",onClick:f.onClick,endIcon:f.icon,"aria-label":f.text,children:f.text})}),y&&e.jsx(t,{sx:{display:"block",width:{xs:"100%",lg:"auto"},"& > button":{width:{xs:"100%",lg:"auto"}}},children:e.jsx(ce,{variant:"secondary",size:"lg",inverse:F,onClick:y.onClick,endIcon:y.icon,"aria-label":y.text,children:y.text})})]})]}),Me=(r==="split"||Be)&&!!(n||b),Re=Me||!!fe?e.jsxs(t,{sx:{position:"absolute",bottom:16,right:16,zIndex:10,display:"flex",alignItems:"center",gap:1.5},children:[fe,Me&&e.jsx(ce,{variant:"primary",size:"sm",iconOnly:!0,icon:w?e.jsx(et,{}):e.jsx(Xe,{}),onClick:Ue,"aria-label":w?"Pause video":"Play video",sx:{backgroundColor:"rgba(0, 15, 71, 0.8)",backdropFilter:"blur(8px)","&:hover":{backgroundColor:"rgba(0, 15, 71, 0.95)"}}})]}):null,Qe=e.jsxs(t,{sx:Ne,children:[e.jsx(t,{ref:q,sx:{width:"100%",height:{xs:"100%",md:V||n?"100%":"115%"},minHeight:"inherit",willChange:V?"auto":"transform",overflow:"hidden",position:"absolute",bottom:0,left:0},children:n&&!L?e.jsx(t,{className:Ve.mediaCover,sx:{backgroundColor:c("surface.hero"),containerType:"size"},children:e.jsx("iframe",{ref:W,src:`https://player.vimeo.com/video/${n}?autoplay=${P?1:0}&loop=1&autopause=0&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&background=1`,style:xe,allow:"autoplay; fullscreen; picture-in-picture",title:p,frameBorder:"0"})}):n&&L&&s?e.jsx("img",{src:s,alt:p,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:m}}):b?e.jsxs("video",{ref:T,autoPlay:P,loop:!0,muted:!0,playsInline:!0,poster:ue,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:m},"aria-label":p,children:[e.jsx("source",{src:b,type:"video/mp4"}),s&&e.jsx("img",{src:s,alt:p,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:m}})]}):s?e.jsx("img",{src:s,alt:p,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:m}}):null}),r==="split"&&D&&e.jsx(t,{sx:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:5,pointerEvents:"none"},children:e.jsxs(t,{component:"svg",viewBox:"0 0 121 124",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",sx:{width:{xs:"38%",md:"40%"},height:"auto",maxWidth:329},children:[e.jsx("path",{ref:j,d:"M0 0V123.885H22.5715V68.0532L58.2372 85.1171H59.9602L2.23957 0H0Z",fill:c("text.inverse")}),e.jsx("path",{ref:A,d:"M118.026 0L60.3051 85.1171H62.0282L97.6938 68.0532V123.885H120.265V0H118.026Z",fill:c("text.inverse")})]})}),r==="split"&&Re]});return e.jsxs(t,{ref:se,component:"section",sx:Oe,"aria-label":"Hero banner",children:[r==="background"&&e.jsxs(t,{sx:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,overflow:"hidden","&::before":{content:'""',position:"absolute",inset:0,backgroundImage:{xs:"linear-gradient(0deg, rgba(10, 18, 42, 0.88) 0%, rgba(10, 18, 42, 0.5) 52%, rgba(10, 18, 42, 0.08) 100%)",lg:"linear-gradient(90deg, rgba(10, 18, 42, 0.88) 0%, rgba(10, 18, 42, 0.5) 52%, rgba(10, 18, 42, 0.08) 100%)"},zIndex:1,pointerEvents:"none"},"&::after":{content:'""',position:"absolute",inset:0,backgroundImage:{xs:"linear-gradient(0deg, #000f47 0%, rgba(0, 15, 71, 0.8) 25%, rgba(0, 15, 71, 0.6) 50%, rgba(0, 15, 71, 0) 75%, rgba(0, 15, 71, 0) 100%)",lg:"linear-gradient(90deg, #000f47 0%, rgba(0, 15, 71, 0.8) 25%, rgba(0, 15, 71, 0.6) 50%, rgba(0, 15, 71, 0) 75%, rgba(0, 15, 71, 0) 100%)"},zIndex:2,pointerEvents:"none"}},children:[e.jsx(t,{ref:q,sx:{position:"absolute",top:0,left:0,width:"100%",height:"115%"},children:n&&!L?e.jsx(t,{className:Ve.mediaCover,sx:{backgroundColor:c("surface.hero"),containerType:"size"},children:e.jsx("iframe",{ref:W,src:`https://player.vimeo.com/video/${n}?autoplay=${P?1:0}&loop=1&autopause=0&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&background=1`,style:xe,allow:"autoplay; fullscreen; picture-in-picture",title:p,frameBorder:"0"})}):n&&L&&s?e.jsx("img",{src:s,alt:p,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:m}}):b?e.jsxs("video",{ref:T,autoPlay:P,loop:!0,muted:!0,playsInline:!0,poster:ue,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:m},children:[e.jsx("source",{src:b,type:"video/mp4"}),s&&e.jsx("img",{src:s,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:m},alt:p})]}):s?e.jsx("img",{src:s,alt:p,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:m}}):null}),Re]}),r==="split"&&e.jsx(t,{ref:C,sx:{position:"relative",order:x==="left"?1:2,width:"100%",height:"40vh",minHeight:"320px",overflow:"hidden",zIndex:1,"@media (min-width: 992px)":{position:"absolute",top:0,bottom:0,left:x==="left"?0:"auto",right:x==="right"?0:"auto",width:"50vw",height:"100%",minHeight:v,order:0}},children:Qe}),e.jsx(t,{sx:{order:r==="split"&&x==="left"?2:1,minHeight:r==="background"?v:"auto",position:"relative",zIndex:2,display:"flex",alignItems:"center",width:"100%",maxWidth:"1540px",mx:"auto",px:{xs:"16px",sm:"24px",lg:"48px"},"@media (min-width: 992px)":{minHeight:v,order:0}},children:e.jsx(t,{className:"mds-legacy-row mds-legacy-align-center",sx:{width:"100%",m:0},children:e.jsx(t,{ref:S,className:_e,sx:{display:"flex",alignItems:"center",gridColumn:{xs:"span 12",lg:le?"7 / span 6":"span 6"},minWidth:0},children:Ke})})})]})};We.__docgenInfo={description:`Hero Banner Component - Full-width hero section with content + image/video split

Design Pattern:
- Full viewport height (100vh) section
- Two-column layout: Content (50%) | Media (50%)
- Supports video background OR static image
- GSAP entrance animations (fade up + stagger)
- Parallax scroll effect
- Responsive: Stacks on mobile
- Dark variant uses Marsh Midnight Blue background (#000f47)

@example
\`\`\`tsx
<HeroBanner
  eyebrow="Corporate"
  title="Four powerful brand legacies coming together"
  subtitle="Heading 2"
  description="Lorem ipsum dolor sit amet..."
  primaryCta={{ text: "Download Report", onClick: handleDownload }}
  secondaryCta={{ text: "Talk to Our Experts", onClick: handleContact }}
  vimeoId="123456789"
  imageSrc="/hero-image.jpg"
  imageAlt="Aerial city view"
  variant="dark"
  disableAnimations={false}
/>
\`\`\``,methods:[],displayName:"HeroBanner",props:{eyebrow:{required:!1,tsType:{name:"string"},description:'Small eyebrow text above headline (e.g., "Corporate")'},title:{required:!0,tsType:{name:"string"},description:"Main H1 headline"},titleEmphasis:{required:!1,tsType:{name:"string"},description:`Optional second clause, rendered italic immediately after \`title\` and
participating in the same per-word entrance stagger — matches the
"signature emphasis" pattern of the brand's newer marketing pages
(regular clause, then an italicized second clause).`},subtitle:{required:!1,tsType:{name:"string"},description:"Optional H2 subtitle below headline"},description:{required:!1,tsType:{name:"string"},description:"Body paragraph text"},primaryCta:{required:!1,tsType:{name:"HeroBannerCTA"},description:'Primary CTA button - Use variant="primaryAlt" (gold) for hero/marketing or variant="primary" (blue) for dashboards'},secondaryCta:{required:!1,tsType:{name:"HeroBannerCTA"},description:"Secondary CTA button (outline style)"},videoSrc:{required:!1,tsType:{name:"string"},description:"Hero video source URL (takes priority over imageSrc)"},vimeoId:{required:!1,tsType:{name:"string"},description:'Vimeo video ID (e.g., "123456789") - takes priority over videoSrc'},videoPoster:{required:!1,tsType:{name:"string"},description:"Poster image for video (shown before video loads)"},imageSrc:{required:!1,tsType:{name:"string"},description:`Hero image source URL (fallback when no video). Also the fallback shown
if a Vimeo embed fails to load (blocked/restricted/deleted video) — when
using vimeoId, always pass this too, or a failed embed renders nothing.`},imageAlt:{required:!1,tsType:{name:"string"},description:"Alt text for hero image",defaultValue:{value:"'Hero background'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'dark' | 'light'",elements:[{name:"literal",value:"'dark'"},{name:"literal",value:"'light'"}]},description:"Background variant: dark (midnight blue) or light",defaultValue:{value:"'dark'",computed:!1}},height:{required:!1,tsType:{name:"string"},description:"Custom height (default: 100vh)",defaultValue:{value:"'100vh'",computed:!1}},imagePosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"Image/Video position: 'left' | 'right' (default: 'right')",defaultValue:{value:"'right'",computed:!1}},layout:{required:!1,tsType:{name:"union",raw:"'split' | 'background'",elements:[{name:"literal",value:"'split'"},{name:"literal",value:"'background'"}]},description:"Layout style: 'split' (side-by-side) or 'background' (media spans entire background)",defaultValue:{value:"'split'",computed:!1}},mediaObjectPosition:{required:!1,tsType:{name:"string"},description:"CSS object-position for image/video cropping",defaultValue:{value:"'center'",computed:!1}},maxTitleChars:{required:!1,tsType:{name:"number"},description:"Character limit for the title (truncates with ellipsis)"},maxDescriptionChars:{required:!1,tsType:{name:"number"},description:"Character limit for the description (truncates with ellipsis)"},showCmsHints:{required:!1,tsType:{name:"boolean"},description:"Display character counts over the text (Useful for CMS preview mode)",defaultValue:{value:"false",computed:!1}},disableAnimations:{required:!1,tsType:{name:"boolean"},description:"Disable GSAP animations (for accessibility/testing)",defaultValue:{value:"false",computed:!1}},play:{required:!1,tsType:{name:"boolean"},description:"Gates the entrance timeline. Defaults to `true` (plays immediately on\nmount, the original behavior). Pass `false` to hold the whole entrance\n(media reveal, M-logo, eyebrow, title, subtitle, description, CTAs)\npaused at its hidden starting state, then flip to `true` once ready —\ne.g. synced to `IntroLoader`'s `onComplete`, so the entrance doesn't\nplay out invisibly behind that overlay and finish before it's ever seen.",defaultValue:{value:"true",computed:!1}},showMLogoOverlay:{required:!1,tsType:{name:"boolean"},description:'Renders the Marsh "M" mark centered over the media column (split layout\nonly), formed from two GSAP-animated halves sliding in from opposite\nsides — the same motion language as the M-forming animations elsewhere\nin the app (see `MArrowAnimationTest.tsx` / `heroIntro.ts`), adapted to\nthe single `/images/M-logo.svg` asset\'s two path subpaths instead of\ntwo separate SVG files.',defaultValue:{value:"false",computed:!1}},titleLineHeight:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Overrides the title's line-height (defaults to `var(--typo-hero-h1-line-height)`). Use for tighter display headlines without affecting the shared token's other consumers."},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Extra content rendered in the content column, after the description and before CTAs — e.g. a search bar or chip row that doesn't fit the eyebrow/title/subtitle/description/CTA slots."},showPlayButton:{required:!1,tsType:{name:"boolean"},description:'Shows the play/pause control for video/vimeo media even in `layout="background"`\n(previously `split`-only, since only split had a natural corner for it). Default `false`\n— no behavior change for existing `background`-layout callers.',defaultValue:{value:"false",computed:!1}},autoPlayVideo:{required:!1,tsType:{name:"boolean"},description:'Whether video/vimeo media autoplays on mount. Default `true` (today\'s behavior,\nunchanged for existing callers). Pass `false` for a "click to play" treatment.',defaultValue:{value:"true",computed:!1}},mediaControlsSlot:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:`Extra content rendered alongside the play/pause button (only relevant when
that button is shown) — e.g. a duration label, source attribution, or a
"Silent film" badge, without HeroBanner needing to know what those are.`}}};const jt={title:"Website/HeroBanner",component:We,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
## Hero Banner Component

Full-width, full-height hero section with content and image/video split layout.

### Features
- ✅ Full viewport height (100vh) section
- ✅ Two-column responsive layout (50/50 split)
- ✅ **Video background support** (native MP4 or **Vimeo**)
- ✅ **GSAP entrance animations** (fade up + stagger)
- ✅ **Parallax scroll effect** on video/image (desktop only)
- ✅ Supports eyebrow text, headline, subtitle, description
- ✅ Primary and secondary CTA buttons
- ✅ Dark and light variants
- ✅ Configurable image/video position (left/right)
- ✅ Accessibility: \`disableAnimations\` prop
- ✅ Mobile responsive (stacks vertically)
- ✅ Role token integration for theming

### Video Support
**Native Video (MP4):** Use \`videoSrc\` prop with path to .mp4 file  
**Vimeo:** Use \`vimeoId\` prop with Vimeo video ID (e.g., "123456789")  
**Priority:** \`vimeoId\` → \`videoSrc\` → \`imageSrc\`

Both video options include:
- Autoplay + loop + muted (for accessibility compliance)
- Same gradient overlays for text readability
- Parallax scroll effect
- Responsive behavior

### Animation Details
- **Entrance**: Content elements fade up with 0.15s stagger (eyebrow → title → subtitle → description → CTAs)
- **Scroll**: Parallax effect on media column (subtle vertical movement)
- **Performance**: Uses GSAP's useGSAP hook with proper cleanup
- **Accessibility**: Animations can be disabled via prop

### Design Pattern
Based on Marsh Corporate landing page hero section from Figma:
- Dark variant uses Midnight Blue (#000f47) background
- Typography: Marsh Serif for marketing headlines, Noto Sans for body
- Primary CTA: Gold filled button
- Secondary CTA: Outline button

### Accessibility
- Semantic HTML (\`<section>\`, \`<h1>\`, \`<h2>\`)
- Proper heading hierarchy
- ARIA labels on buttons and video
- Alt text for images
- Keyboard navigation support
- Videos auto-play muted for accessibility
- \`disableAnimations\` prop for motion-sensitive users
        `}}},argTypes:{variant:{control:"select",options:["dark","light"],description:"Background color variant",table:{defaultValue:{summary:"dark"}}},height:{control:"text",description:"Section height (CSS value)",table:{defaultValue:{summary:"100vh"}}},imagePosition:{control:"select",options:["left","right"],description:"Image/Video column position",table:{defaultValue:{summary:"right"}}},disableAnimations:{control:"boolean",description:"Disable GSAP animations (for accessibility/testing)",table:{defaultValue:{summary:"false"}}},eyebrow:{control:"text",description:"Small uppercase text above headline"},title:{control:"text",description:"Main H1 headline"},subtitle:{control:"text",description:"H2 subtitle below headline"},description:{control:"text",description:"Body paragraph text"},vimeoId:{control:"text",description:'Vimeo video ID (e.g., "123456789") - takes priority over videoSrc. Extract from vimeo.com/123456789',table:{category:"Media"}},videoSrc:{control:"text",description:"Hero video URL (takes priority over imageSrc)",table:{category:"Media"}},videoPoster:{control:"text",description:"Video poster image (shown before video loads)",table:{category:"Media"}},imageSrc:{control:"text",description:"Hero image URL (fallback when no video)",table:{category:"Media"}},imageAlt:{control:"text",description:"Image alt text for accessibility"}}},d={args:{eyebrow:"Eyebrow",title:"Whatever risk, workforce, or capital challenge your business faces",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",primaryCta:{text:"Download Report",onClick:()=>console.debug("Download clicked"),icon:e.jsx(de,{})},secondaryCta:{text:"Talk to Our Experts",onClick:()=>console.debug("Contact clicked")},imageSrc:"/images/journey-aviation.jpg",imageAlt:"Aerial view of city intersection",variant:"dark",height:"600px",imagePosition:"right",disableAnimations:!1},parameters:{docs:{description:{story:"Primary corporate hero design with gold eyebrow dash, 50/50 split layout, and dual CTAs. Matches Figma design specifications exactly."}}}},z={args:{...d.args,videoSrc:"/video/WebsiteHeaderVideo-960x900_V1 (1).mp4",videoPoster:"/images/journey-aviation.jpg"},parameters:{docs:{description:{story:"Hero banner with video background. Video autoplays muted with poster image. Falls back to static image if video fails to load. Includes subtle parallax scroll effect."}}}},U={args:{...d.args,vimeoId:"1146072483",imageSrc:"/images/journey-aviation.jpg"},parameters:{docs:{description:{story:"Hero banner with **Vimeo video background**. Uses Vimeo's background mode for seamless autoplay with no controls. \n        \n**How to use:**\n1. Upload your video to Vimeo\n2. Extract the video ID from the URL (e.g., `vimeo.com/123456789` → `123456789`)\n3. Pass the ID to the `vimeoId` prop\n\n**Features:**\n- ✅ Autoplay + Loop + Muted (background mode)\n- ✅ No player controls or Vimeo branding\n- ✅ Same gradient overlays as native video\n- ✅ Parallax scroll effect included\n- ✅ Fallback to `imageSrc` if needed\n\n**Priority:** `vimeoId` → `videoSrc` → `imageSrc`"}}}},O={args:{...d.args,height:"100vh",title:"Four powerful brand legacies united as Marsh McLennan",subtitle:"Risk, Strategy & People"},parameters:{docs:{description:{story:"Full viewport height (100vh) hero banner. Ideal for landing pages and homepage heroes."}}}},G={args:{...d.args,height:"80vh"},parameters:{docs:{description:{story:"Medium height (80vh) variant. Good balance between impact and content visibility below the fold."}}}},N={args:{...d.args,height:"500px",subtitle:void 0},parameters:{docs:{description:{story:"Compact 500px height variant without subtitle. Suitable for secondary pages or sections."}}}},_={args:{eyebrow:"Accessible",title:"Hero banner with animations disabled",subtitle:"For users with motion sensitivity",description:"This variant demonstrates the hero banner with the disableAnimations prop set to true. Content appears immediately without fade-up or parallax effects.",primaryCta:{text:"Learn More",onClick:()=>console.debug("Learn More clicked"),icon:e.jsx(g,{})},videoSrc:"/video/WebsiteHeaderVideo-960x900_V1 (1).mp4",videoPoster:"/images/journey-aviation.jpg",imageSrc:"/images/journey-aviation.jpg",imageAlt:"Accessible hero banner",variant:"dark",height:"100vh",imagePosition:"right",disableAnimations:!0},parameters:{docs:{description:{story:"Demonstrates accessibility support with animations disabled. Use this for users who prefer reduced motion or for testing static layouts."}}}},$={args:{eyebrow:"Premium",title:"Experience ultra-high definition",subtitle:"4K video background",description:"This variant uses a 4K UHD video for maximum visual impact on high-resolution displays.",primaryCta:{text:"Watch Demo",onClick:()=>console.debug("Watch Demo clicked"),icon:e.jsx(g,{})},videoSrc:"/video/2818546-uhd_3840_2160_24fps.mp4",videoPoster:"/images/journey-aviation.jpg",imageSrc:"/images/journey-aviation.jpg",imageAlt:"High quality 4K video background",variant:"dark",height:"100vh",imagePosition:"right",disableAnimations:!1},parameters:{docs:{description:{story:"4K UHD video variant (3840x2160, 24fps). Best for high-resolution displays and premium experiences. Note: Larger file size."}}}},K={args:{eyebrow:"Solutions",title:"Innovative risk solutions for modern businesses",subtitle:"Protecting what matters most",description:"Our comprehensive suite of risk management solutions helps businesses navigate uncertainty with confidence.",primaryCta:{text:"Get Started",onClick:()=>console.debug("Get Started clicked"),icon:e.jsx(g,{})},secondaryCta:{text:"Learn More",onClick:()=>console.debug("Learn More clicked")},imageSrc:"/images/journey-aviation.jpg",imageAlt:"Business professionals collaborating",variant:"light",height:"100vh",imagePosition:"right",disableAnimations:!1}},Q={args:{title:"Simple, powerful, effective",description:"Everything you need to protect and grow your business, all in one place.",primaryCta:{text:"Explore Solutions",onClick:()=>console.debug("Explore clicked"),icon:e.jsx(g,{})},imageSrc:"/images/journey-aviation.jpg",imageAlt:"Modern office building",variant:"dark",height:"100vh",imagePosition:"right"}},Z={args:{eyebrow:"Innovation",title:"Leading the future of insurance technology",subtitle:"Technology meets expertise",description:"Combining cutting-edge technology with deep industry expertise to deliver exceptional outcomes.",primaryCta:{text:"See Our Platform",onClick:()=>console.debug("Platform clicked"),icon:e.jsx(g,{})},secondaryCta:{text:"Schedule Demo",onClick:()=>console.debug("Demo clicked")},imageSrc:"/images/journey-aviation.jpg",imageAlt:"Technology dashboard interface",variant:"dark",height:"100vh",imagePosition:"left"}},J={args:{eyebrow:"Get Started",title:"Your journey to better protection starts here",description:"Join thousands of businesses who trust Marsh to protect their future.",primaryCta:{text:"Request a Quote",onClick:()=>console.debug("Quote clicked"),icon:e.jsx(g,{})},imageSrc:"/images/journey-aviation.jpg",imageAlt:"Handshake between business partners",variant:"dark",height:"100vh",imagePosition:"right"}},Y={args:{eyebrow:"About Us",title:"A legacy of trust and innovation",subtitle:"Since 1871",description:"Over 150 years of experience protecting businesses and helping them thrive.",primaryCta:{text:"Our Story",onClick:()=>console.debug("Story clicked"),icon:e.jsx(g,{})},secondaryCta:{text:"Meet the Team",onClick:()=>console.debug("Team clicked")},imageSrc:"/images/journey-aviation.jpg",imageAlt:"Historic Marsh building",variant:"dark",height:"80vh",imagePosition:"right"}},X={parameters:{a11y:{config:{rules:[{id:"scrollable-region-focusable",enabled:!1}]}}},args:{eyebrow:"Announcement",title:"Introducing Marsh One Platform",subtitle:"A new era of insurance technology",description:"Experience seamless integration across all your insurance needs with our revolutionary new platform.",imageSrc:"/images/journey-aviation.jpg",imageAlt:"Marsh One Platform interface",variant:"dark",height:"100vh",imagePosition:"right"}},ee={args:{eyebrow:"Corporate Solutions",title:"Whatever risk, workforce, or capital challenge your business faces",subtitle:"Risk, Strategy & People",description:"We bring together the best of Marsh, Guy Carpenter, Mercer, and Oliver Wyman to help organizations navigate an uncertain world with confidence and expertise.",primaryCta:{text:"Download Report",onClick:()=>console.debug("Download clicked"),icon:e.jsx(de,{})},secondaryCta:{text:"Talk to Our Experts",onClick:()=>console.debug("Contact clicked")},imageSrc:"/images/journey-aviation.jpg",imageAlt:"Aerial city view",variant:"dark",height:"700px",imagePosition:"right"},parameters:{docs:{description:{story:'50/50 split layout with subtitle. This matches the Figma "Desktop - Split - Medium" variant with full content hierarchy.'}}}},te={args:{...d.args,imagePosition:"left",title:"Innovation meets expertise in insurance solutions"},parameters:{docs:{description:{story:"Alternative layout with image/video on the left side. Useful for creating visual variety across multiple hero sections."}}}},oe={args:{eyebrow:"Featured",title:"This hero banner showcases all available props",subtitle:"With every configuration option",description:"This variant demonstrates eyebrow text, headline, subtitle, description, primary and secondary CTAs, video background, custom height, image positioning, and animation controls.",primaryCta:{text:"Primary Action",onClick:()=>console.debug("Primary clicked"),icon:e.jsx(de,{})},secondaryCta:{text:"Secondary Action",onClick:()=>console.debug("Secondary clicked"),icon:e.jsx(g,{})},videoSrc:"/video/hero-video.mp4",videoPoster:"/images/journey-aviation.jpg",imageSrc:"/images/journey-aviation.jpg",imageAlt:"Full-featured hero banner example",variant:"dark",height:"100vh",imagePosition:"right",disableAnimations:!1}},At=["Corporate","CorporateWithVideo","CorporateWithVimeo","FullHeight","MediumHeight","Compact","AnimationsDisabled","HighQualityVideo","LightVariant","Minimal","ImageLeft","SingleCTA","CustomHeight","ContentOnly","FiftyFiftySplit","AlternateLayout","AllProps"];d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Eyebrow',
    title: 'Whatever risk, workforce, or capital challenge your business faces',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    primaryCta: {
      text: 'Download Report',
      onClick: () => console.debug('Download clicked'),
      icon: <DownloadIcon />
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
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary corporate hero design with gold eyebrow dash, 50/50 split layout, and dual CTAs. Matches Figma design specifications exactly.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    videoSrc: '/video/WebsiteHeaderVideo-960x900_V1 (1).mp4',
    videoPoster: '/images/journey-aviation.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero banner with video background. Video autoplays muted with poster image. Falls back to static image if video fails to load. Includes subtle parallax scroll effect.'
      }
    }
  }
}`,...z.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    vimeoId: '1146072483',
    // Public demo video - replace with your actual video ID
    imageSrc: '/images/journey-aviation.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: \`Hero banner with **Vimeo video background**. Uses Vimeo's background mode for seamless autoplay with no controls. 
        
**How to use:**
1. Upload your video to Vimeo
2. Extract the video ID from the URL (e.g., \\\`vimeo.com/123456789\\\` → \\\`123456789\\\`)
3. Pass the ID to the \\\`vimeoId\\\` prop

**Features:**
- ✅ Autoplay + Loop + Muted (background mode)
- ✅ No player controls or Vimeo branding
- ✅ Same gradient overlays as native video
- ✅ Parallax scroll effect included
- ✅ Fallback to \\\`imageSrc\\\` if needed

**Priority:** \\\`vimeoId\\\` → \\\`videoSrc\\\` → \\\`imageSrc\\\`\`
      }
    }
  }
}`,...U.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    height: '100vh',
    title: 'Four powerful brand legacies united as Marsh McLennan',
    subtitle: 'Risk, Strategy & People'
  },
  parameters: {
    docs: {
      description: {
        story: 'Full viewport height (100vh) hero banner. Ideal for landing pages and homepage heroes.'
      }
    }
  }
}`,...O.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    height: '80vh'
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium height (80vh) variant. Good balance between impact and content visibility below the fold.'
      }
    }
  }
}`,...G.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    height: '500px',
    subtitle: undefined
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact 500px height variant without subtitle. Suitable for secondary pages or sections.'
      }
    }
  }
}`,...N.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Accessible',
    title: 'Hero banner with animations disabled',
    subtitle: 'For users with motion sensitivity',
    description: 'This variant demonstrates the hero banner with the disableAnimations prop set to true. Content appears immediately without fade-up or parallax effects.',
    primaryCta: {
      text: 'Learn More',
      onClick: () => console.debug('Learn More clicked'),
      icon: <ArrowForwardIcon />
    },
    videoSrc: '/video/WebsiteHeaderVideo-960x900_V1 (1).mp4',
    videoPoster: '/images/journey-aviation.jpg',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Accessible hero banner',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right',
    disableAnimations: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility support with animations disabled. Use this for users who prefer reduced motion or for testing static layouts.'
      }
    }
  }
}`,..._.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Premium',
    title: 'Experience ultra-high definition',
    subtitle: '4K video background',
    description: 'This variant uses a 4K UHD video for maximum visual impact on high-resolution displays.',
    primaryCta: {
      text: 'Watch Demo',
      onClick: () => console.debug('Watch Demo clicked'),
      icon: <ArrowForwardIcon />
    },
    videoSrc: '/video/2818546-uhd_3840_2160_24fps.mp4',
    videoPoster: '/images/journey-aviation.jpg',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'High quality 4K video background',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right',
    disableAnimations: false
  },
  parameters: {
    docs: {
      description: {
        story: '4K UHD video variant (3840x2160, 24fps). Best for high-resolution displays and premium experiences. Note: Larger file size.'
      }
    }
  }
}`,...$.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Solutions',
    title: 'Innovative risk solutions for modern businesses',
    subtitle: 'Protecting what matters most',
    description: 'Our comprehensive suite of risk management solutions helps businesses navigate uncertainty with confidence.',
    primaryCta: {
      text: 'Get Started',
      onClick: () => console.debug('Get Started clicked'),
      icon: <ArrowForwardIcon />
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
}`,...K.parameters?.docs?.source}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Simple, powerful, effective',
    description: 'Everything you need to protect and grow your business, all in one place.',
    primaryCta: {
      text: 'Explore Solutions',
      onClick: () => console.debug('Explore clicked'),
      icon: <ArrowForwardIcon />
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Modern office building',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right'
  }
}`,...Q.parameters?.docs?.source}}};Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Innovation',
    title: 'Leading the future of insurance technology',
    subtitle: 'Technology meets expertise',
    description: 'Combining cutting-edge technology with deep industry expertise to deliver exceptional outcomes.',
    primaryCta: {
      text: 'See Our Platform',
      onClick: () => console.debug('Platform clicked'),
      icon: <ArrowForwardIcon />
    },
    secondaryCta: {
      text: 'Schedule Demo',
      onClick: () => console.debug('Demo clicked')
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Technology dashboard interface',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'left'
  }
}`,...Z.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Get Started',
    title: 'Your journey to better protection starts here',
    description: 'Join thousands of businesses who trust Marsh to protect their future.',
    primaryCta: {
      text: 'Request a Quote',
      onClick: () => console.debug('Quote clicked'),
      icon: <ArrowForwardIcon />
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Handshake between business partners',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right'
  }
}`,...J.parameters?.docs?.source}}};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'About Us',
    title: 'A legacy of trust and innovation',
    subtitle: 'Since 1871',
    description: 'Over 150 years of experience protecting businesses and helping them thrive.',
    primaryCta: {
      text: 'Our Story',
      onClick: () => console.debug('Story clicked'),
      icon: <ArrowForwardIcon />
    },
    secondaryCta: {
      text: 'Meet the Team',
      onClick: () => console.debug('Team clicked')
    },
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Historic Marsh building',
    variant: 'dark',
    height: '80vh',
    imagePosition: 'right'
  }
}`,...Y.parameters?.docs?.source}}};X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  parameters: {
    a11y: {
      config: {
        rules: [{
          // The scrollable element axe flags is <body>: this story is a
          // full-height hero rendered deliberately WITHOUT CTAs, so by
          // definition it contains nothing focusable, and the canvas scrolls.
          // "No focusable content" is the story's whole subject.
          //
          // Scoped to this one story, not the file — every other HeroBanner
          // story has CTAs and is still checked. On a real page this hero
          // sits among headers, links and buttons.
          id: 'scrollable-region-focusable',
          enabled: false
        }]
      }
    }
  },
  args: {
    eyebrow: 'Announcement',
    title: 'Introducing Marsh One Platform',
    subtitle: 'A new era of insurance technology',
    description: 'Experience seamless integration across all your insurance needs with our revolutionary new platform.',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Marsh One Platform interface',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right'
  }
}`,...X.parameters?.docs?.source}}};ee.parameters={...ee.parameters,docs:{...ee.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Corporate Solutions',
    title: 'Whatever risk, workforce, or capital challenge your business faces',
    subtitle: 'Risk, Strategy & People',
    description: 'We bring together the best of Marsh, Guy Carpenter, Mercer, and Oliver Wyman to help organizations navigate an uncertain world with confidence and expertise.',
    primaryCta: {
      text: 'Download Report',
      onClick: () => console.debug('Download clicked'),
      icon: <DownloadIcon />
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
  },
  parameters: {
    docs: {
      description: {
        story: '50/50 split layout with subtitle. This matches the Figma "Desktop - Split - Medium" variant with full content hierarchy.'
      }
    }
  }
}`,...ee.parameters?.docs?.source}}};te.parameters={...te.parameters,docs:{...te.parameters?.docs,source:{originalSource:`{
  args: {
    ...Corporate.args,
    imagePosition: 'left',
    title: 'Innovation meets expertise in insurance solutions'
  },
  parameters: {
    docs: {
      description: {
        story: 'Alternative layout with image/video on the left side. Useful for creating visual variety across multiple hero sections.'
      }
    }
  }
}`,...te.parameters?.docs?.source}}};oe.parameters={...oe.parameters,docs:{...oe.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Featured',
    title: 'This hero banner showcases all available props',
    subtitle: 'With every configuration option',
    description: 'This variant demonstrates eyebrow text, headline, subtitle, description, primary and secondary CTAs, video background, custom height, image positioning, and animation controls.',
    primaryCta: {
      text: 'Primary Action',
      onClick: () => console.debug('Primary clicked'),
      icon: <DownloadIcon />
    },
    secondaryCta: {
      text: 'Secondary Action',
      onClick: () => console.debug('Secondary clicked'),
      icon: <ArrowForwardIcon />
    },
    videoSrc: '/video/hero-video.mp4',
    videoPoster: '/images/journey-aviation.jpg',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Full-featured hero banner example',
    variant: 'dark',
    height: '100vh',
    imagePosition: 'right',
    disableAnimations: false
  }
}`,...oe.parameters?.docs?.source}}};export{oe as AllProps,te as AlternateLayout,_ as AnimationsDisabled,N as Compact,X as ContentOnly,d as Corporate,z as CorporateWithVideo,U as CorporateWithVimeo,Y as CustomHeight,ee as FiftyFiftySplit,O as FullHeight,$ as HighQualityVideo,Z as ImageLeft,K as LightVariant,G as MediumHeight,Q as Minimal,J as SingleCTA,At as __namedExportsOrder,jt as default};
