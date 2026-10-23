import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./utils-BGgJixJd.js";import{n as o,t as s}from"./createLucideIcon-DC6xoXt7.js";import{n as c,t as l}from"./skeleton-BSqvLcKJ.js";var u,d;function f(){return(f=t((()=>{o(),u=[[`line`,{x1:`2`,x2:`22`,y1:`2`,y2:`22`,key:`a6p6uj`}],[`path`,{d:`M10.41 10.41a2 2 0 1 1-2.83-2.83`,key:`1bzlo9`}],[`line`,{x1:`13.5`,x2:`6`,y1:`13.5`,y2:`21`,key:`1q0aeu`}],[`line`,{x1:`18`,x2:`21`,y1:`12`,y2:`15`,key:`5mozeu`}],[`path`,{d:`M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59`,key:`mmje98`}],[`path`,{d:`M21 15V5a2 2 0 0 0-2-2H9`,key:`43el77`}]],d=s(`image-off`,u)})))()}var p,m,h,g;function _(){return(_=t((()=>{p=e(n(),1),f(),i(),c(),m=r(),h={"1:1":`aspect-square`,"5:4":`aspect-[5/4]`,"4:3":`aspect-[4/3]`,"3:2":`aspect-[3/2]`,"16:9":`aspect-video`,"16:10":`aspect-[16/10]`,"2:1":`aspect-[2/1]`},g=p.forwardRef(({src:e,alt:t,fallbackSrc:n,showSkeleton:r=!0,aspectRatio:i,className:o,style:s,...c},u)=>{let[f,g]=p.useState(!0),[_,v]=p.useState(!1),[y,b]=p.useState(e);p.useEffect(()=>{b(e),g(!0),v(!1)},[e]);let x=()=>{g(!1),v(!1)},S=()=>{g(!1),n&&y!==n?(b(n),v(!1)):v(!0)},C=i&&i!==`round`&&i!==`free`?h[i]:void 0;return(0,m.jsxs)(`div`,{className:a(`relative flex h-full w-full items-center justify-center overflow-hidden`,C,i===`round`&&`rounded-full`,o),children:[f&&r&&(0,m.jsx)(l,{variant:`rectangular`,className:`absolute inset-0 h-full w-full`}),_&&(0,m.jsxs)(`div`,{className:`absolute inset-0 flex flex-col items-center justify-center gap-1`,style:{backgroundColor:`var(--role-bg-neutral-subtle)`,color:`var(--role-fg-neutral-subtle)`},children:[(0,m.jsx)(d,{className:`h-8 w-8 opacity-40`}),(0,m.jsx)(`span`,{className:`text-xs opacity-60`,children:`Image unavailable`})]}),!_&&(0,m.jsx)(`img`,{ref:u,src:y,alt:t,onLoad:x,onError:S,style:{...s,display:f?`none`:`block`},className:`h-full w-full object-cover`,...c})]})}),g.displayName=`ImageWithFallback`,g.__docgenInfo={description:'Design System ImageWithFallback — shadcn/ui counterpart for the MDS\nImageWithFallback. Same `src`/`fallbackSrc`/`showSkeleton` API as the MUI\ntwin, plus `aspectRatio` — genuinely part of the Figma "Image Placeholder"\nspec (`Format`) even though the current MUI component doesn\'t expose it.\n\nForwards to the `<img>` itself — NOT the wrapper `<div>` — so a consumer\ncan read its natural dimensions or hand it to an IntersectionObserver.\nThe ref is only attached once `error` is false; the element it forwards\nto is unmounted entirely while the fallback "Image unavailable" state\nis showing.',methods:[],displayName:`ImageWithFallback`,props:{fallbackSrc:{required:!1,tsType:{name:`string`},description:``},showSkeleton:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},aspectRatio:{required:!1,tsType:{name:`union`,raw:`'1:1' | '5:4' | '4:3' | '3:2' | '16:9' | '16:10' | '2:1' | 'round' | 'free'`,elements:[{name:`literal`,value:`'1:1'`},{name:`literal`,value:`'5:4'`},{name:`literal`,value:`'4:3'`},{name:`literal`,value:`'3:2'`},{name:`literal`,value:`'16:9'`},{name:`literal`,value:`'16:10'`},{name:`literal`,value:`'2:1'`},{name:`literal`,value:`'round'`},{name:`literal`,value:`'free'`}]},description:"Figma `Format` property — constrains the image box to a fixed ratio (or 'round' for a circular crop). Omit for 'free' (fills its container)."}}}})))()}var v,y,b,x,S,C,w,T,E;function D(){return(D=t((()=>{_(),v=r(),y={title:`Components/ImageWithFallback`,component:g,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"# ImageWithFallback\n\n`getRoleColor()`-driven counterpart to the MUI `ImageWithFallback`. Same\n`src`/`fallbackSrc`/`showSkeleton` API as the MUI twin, plus `aspectRatio`\n— genuinely part of the Figma \"Image Placeholder\" spec's `Format`\nproperty even though the current MUI component doesn't expose it."}}},argTypes:{aspectRatio:{control:`select`,options:[`1:1`,`5:4`,`4:3`,`3:2`,`16:9`,`16:10`,`2:1`,`round`,`free`]}}},b={args:{src:`https://picsum.photos/seed/marsh-img/480/320`,alt:`Sample image`,aspectRatio:`3:2`},decorators:[e=>(0,v.jsx)(`div`,{className:`w-[320px]`,children:(0,v.jsx)(e,{})})]},x={args:{src:`https://picsum.photos/seed/marsh-sq/400/400`,alt:`Square image`,aspectRatio:`1:1`},decorators:[e=>(0,v.jsx)(`div`,{className:`w-[240px]`,children:(0,v.jsx)(e,{})})]},S={args:{src:`https://picsum.photos/seed/marsh-round/200/200`,alt:`Round image`,aspectRatio:`round`},decorators:[e=>(0,v.jsx)(`div`,{className:`w-[120px]`,children:(0,v.jsx)(e,{})})]},C={args:{src:`https://picsum.photos/seed/marsh-wide/800/450`,alt:`Widescreen image`,aspectRatio:`16:9`},decorators:[e=>(0,v.jsx)(`div`,{className:`w-[400px]`,children:(0,v.jsx)(e,{})})]},w={args:{src:`https://example.invalid/nonexistent.jpg`,alt:`Broken image`,aspectRatio:`3:2`},decorators:[e=>(0,v.jsx)(`div`,{className:`w-[320px]`,children:(0,v.jsx)(e,{})})]},T={args:{src:`https://example.invalid/nonexistent.jpg`,fallbackSrc:`https://picsum.photos/seed/marsh-fallback/480/320`,alt:`Falls back to a working image`,aspectRatio:`3:2`},decorators:[e=>(0,v.jsx)(`div`,{className:`w-[320px]`,children:(0,v.jsx)(e,{})})]},E=[`Default`,`Square`,`Round`,`Widescreen`,`BrokenImage`,`WithFallbackSrc`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/seed/marsh-img/480/320',
    alt: 'Sample image',
    aspectRatio: '3:2'
  },
  decorators: [Story => <div className="w-[320px]"><Story /></div>]
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/seed/marsh-sq/400/400',
    alt: 'Square image',
    aspectRatio: '1:1'
  },
  decorators: [Story => <div className="w-[240px]"><Story /></div>]
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/seed/marsh-round/200/200',
    alt: 'Round image',
    aspectRatio: 'round'
  },
  decorators: [Story => <div className="w-[120px]"><Story /></div>]
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/seed/marsh-wide/800/450',
    alt: 'Widescreen image',
    aspectRatio: '16:9'
  },
  decorators: [Story => <div className="w-[400px]"><Story /></div>]
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://example.invalid/nonexistent.jpg',
    alt: 'Broken image',
    aspectRatio: '3:2'
  },
  decorators: [Story => <div className="w-[320px]"><Story /></div>]
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://example.invalid/nonexistent.jpg',
    fallbackSrc: 'https://picsum.photos/seed/marsh-fallback/480/320',
    alt: 'Falls back to a working image',
    aspectRatio: '3:2'
  },
  decorators: [Story => <div className="w-[320px]"><Story /></div>]
}`,...T.parameters?.docs?.source}}}})))()}D();export{w as BrokenImage,b as Default,S as Round,x as Square,C as Widescreen,T as WithFallbackSrc,E as __namedExportsOrder,y as default};