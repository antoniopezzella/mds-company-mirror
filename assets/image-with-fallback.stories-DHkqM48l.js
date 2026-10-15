import{a5 as t,Z as e}from"./iframe-CPBTUrEW.js";import{c as R}from"./utils-CURkPv3a.js";import{S as F}from"./skeleton-C-ZAhKi4.js";import{c as W}from"./createLucideIcon-BnpAccaP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dk2lMVn3.js";const q=[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M10.41 10.41a2 2 0 1 1-2.83-2.83",key:"1bzlo9"}],["line",{x1:"13.5",x2:"6",y1:"13.5",y2:"21",key:"1q0aeu"}],["line",{x1:"18",x2:"21",y1:"12",y2:"15",key:"5mozeu"}],["path",{d:"M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",key:"mmje98"}],["path",{d:"M21 15V5a2 2 0 0 0-2-2H9",key:"43el77"}]],M=W("image-off",q),E={"1:1":"aspect-square","5:4":"aspect-[5/4]","4:3":"aspect-[4/3]","3:2":"aspect-[3/2]","16:9":"aspect-video","16:10":"aspect-[16/10]","2:1":"aspect-[2/1]"},u=t.forwardRef(({src:a,alt:v,fallbackSrc:m,showSkeleton:y=!0,aspectRatio:s,className:S,style:k,...w},b)=>{const[h,d]=t.useState(!0),[g,r]=t.useState(!1),[f,x]=t.useState(a);t.useEffect(()=>{x(a),d(!0),r(!1)},[a]);const j=()=>{d(!1),r(!1)},I=()=>{d(!1),m&&f!==m?(x(m),r(!1)):r(!0)},N=s&&s!=="round"&&s!=="free"?E[s]:void 0;return e.jsxs("div",{className:R("relative flex h-full w-full items-center justify-center overflow-hidden",N,s==="round"&&"rounded-full",S),children:[h&&y&&e.jsx(F,{variant:"rectangular",className:"absolute inset-0 h-full w-full"}),g&&e.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-1",style:{backgroundColor:"var(--role-surface-subtle)",color:"var(--role-text-secondary)"},children:[e.jsx(M,{className:"h-8 w-8 opacity-40"}),e.jsx("span",{className:"text-xs opacity-60",children:"Image unavailable"})]}),!g&&e.jsx("img",{ref:b,src:f,alt:v,onLoad:j,onError:I,style:{...k,display:h?"none":"block"},className:"h-full w-full object-cover",...w})]})});u.displayName="ImageWithFallback";u.__docgenInfo={description:'Design System ImageWithFallback — shadcn/ui counterpart for the MDS\nImageWithFallback. Same `src`/`fallbackSrc`/`showSkeleton` API as the MUI\ntwin, plus `aspectRatio` — genuinely part of the Figma "Image Placeholder"\nspec (`Format`) even though the current MUI component doesn\'t expose it.\n\nForwards to the `<img>` itself — NOT the wrapper `<div>` — so a consumer\ncan read its natural dimensions or hand it to an IntersectionObserver.\nThe ref is only attached once `error` is false; the element it forwards\nto is unmounted entirely while the fallback "Image unavailable" state\nis showing.',methods:[],displayName:"ImageWithFallback",props:{fallbackSrc:{required:!1,tsType:{name:"string"},description:""},showSkeleton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},aspectRatio:{required:!1,tsType:{name:"union",raw:"'1:1' | '5:4' | '4:3' | '3:2' | '16:9' | '16:10' | '2:1' | 'round' | 'free'",elements:[{name:"literal",value:"'1:1'"},{name:"literal",value:"'5:4'"},{name:"literal",value:"'4:3'"},{name:"literal",value:"'3:2'"},{name:"literal",value:"'16:9'"},{name:"literal",value:"'16:10'"},{name:"literal",value:"'2:1'"},{name:"literal",value:"'round'"},{name:"literal",value:"'free'"}]},description:"Figma `Format` property — constrains the image box to a fixed ratio (or 'round' for a circular crop). Omit for 'free' (fills its container)."}}};const P={title:"Components/ImageWithFallback",component:u,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"# ImageWithFallback\n\n`getRoleColor()`-driven counterpart to the MUI `ImageWithFallback`. Same\n`src`/`fallbackSrc`/`showSkeleton` API as the MUI twin, plus `aspectRatio`\n— genuinely part of the Figma \"Image Placeholder\" spec's `Format`\nproperty even though the current MUI component doesn't expose it."}}},argTypes:{aspectRatio:{control:"select",options:["1:1","5:4","4:3","3:2","16:9","16:10","2:1","round","free"]}}},o={args:{src:"https://picsum.photos/seed/marsh-img/480/320",alt:"Sample image",aspectRatio:"3:2"},decorators:[a=>e.jsx("div",{className:"w-[320px]",children:e.jsx(a,{})})]},n={args:{src:"https://picsum.photos/seed/marsh-sq/400/400",alt:"Square image",aspectRatio:"1:1"},decorators:[a=>e.jsx("div",{className:"w-[240px]",children:e.jsx(a,{})})]},c={args:{src:"https://picsum.photos/seed/marsh-round/200/200",alt:"Round image",aspectRatio:"round"},decorators:[a=>e.jsx("div",{className:"w-[120px]",children:e.jsx(a,{})})]},l={args:{src:"https://picsum.photos/seed/marsh-wide/800/450",alt:"Widescreen image",aspectRatio:"16:9"},decorators:[a=>e.jsx("div",{className:"w-[400px]",children:e.jsx(a,{})})]},i={args:{src:"https://example.invalid/nonexistent.jpg",alt:"Broken image",aspectRatio:"3:2"},decorators:[a=>e.jsx("div",{className:"w-[320px]",children:e.jsx(a,{})})]},p={args:{src:"https://example.invalid/nonexistent.jpg",fallbackSrc:"https://picsum.photos/seed/marsh-fallback/480/320",alt:"Falls back to a working image",aspectRatio:"3:2"},decorators:[a=>e.jsx("div",{className:"w-[320px]",children:e.jsx(a,{})})]},U=["Default","Square","Round","Widescreen","BrokenImage","WithFallbackSrc"];o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/seed/marsh-img/480/320',
    alt: 'Sample image',
    aspectRatio: '3:2'
  },
  decorators: [Story => <div className="w-[320px]"><Story /></div>]
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/seed/marsh-sq/400/400',
    alt: 'Square image',
    aspectRatio: '1:1'
  },
  decorators: [Story => <div className="w-[240px]"><Story /></div>]
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/seed/marsh-round/200/200',
    alt: 'Round image',
    aspectRatio: 'round'
  },
  decorators: [Story => <div className="w-[120px]"><Story /></div>]
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/seed/marsh-wide/800/450',
    alt: 'Widescreen image',
    aspectRatio: '16:9'
  },
  decorators: [Story => <div className="w-[400px]"><Story /></div>]
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://example.invalid/nonexistent.jpg',
    alt: 'Broken image',
    aspectRatio: '3:2'
  },
  decorators: [Story => <div className="w-[320px]"><Story /></div>]
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://example.invalid/nonexistent.jpg',
    fallbackSrc: 'https://picsum.photos/seed/marsh-fallback/480/320',
    alt: 'Falls back to a working image',
    aspectRatio: '3:2'
  },
  decorators: [Story => <div className="w-[320px]"><Story /></div>]
}`,...p.parameters?.docs?.source}}};export{i as BrokenImage,o as Default,c as Round,n as Square,l as Widescreen,p as WithFallbackSrc,U as __namedExportsOrder,P as default};
