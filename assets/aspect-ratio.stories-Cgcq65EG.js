import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{r as i,t as a}from"./dist-DFd1iIkj.js";var o,s,c,l,u,d;function f(){return(f=t((()=>{o=e(n(),1),i(),s=r(),c=Object.defineProperty,l=(e,t)=>c(e,`name`,{value:t,configurable:!0}),u=o.forwardRef(l(function(e,t){let{ratio:n=1,style:r,...i}=e;return(0,s.jsx)(`div`,{style:{position:`relative`,width:`100%`,paddingBottom:`${100/n}%`},"data-radix-aspect-ratio-wrapper":``,children:(0,s.jsx)(a.div,{...i,ref:t,style:{...r,position:`absolute`,top:0,right:0,bottom:0,left:0}})})},`AspectRatio`)),d=u})))()}var p;function m(){return(m=t((()=>{f(),p=d})))()}var h,g,_,v,y;function b(){return(b=t((()=>{m(),h=r(),g={title:`Components/AspectRatio`,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`# AspectRatio

No MDS/Figma spec exists for this component — a thin re-export of Radix
AspectRatio (matching the standard convention; it's a layout
primitive with no visual styling of its own). For a styled MDS image box
with fixed ratios, see \`ImageWithFallback\`'s \`aspectRatio\` prop instead.`}}}},_={render:()=>(0,h.jsx)(`div`,{className:`w-[320px]`,children:(0,h.jsx)(p,{ratio:16/9,children:(0,h.jsx)(`img`,{src:`https://picsum.photos/seed/aspect1/640/360`,alt:`16:9`,className:`h-full w-full rounded-md object-cover`})})})},v={render:()=>(0,h.jsx)(`div`,{className:`w-[240px]`,children:(0,h.jsx)(p,{ratio:1,children:(0,h.jsx)(`img`,{src:`https://picsum.photos/seed/aspect2/400/400`,alt:`1:1`,className:`h-full w-full rounded-md object-cover`})})})},y=[`Default`,`Square`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[320px]">
      <AspectRatio ratio={16 / 9}>
        <img src="https://picsum.photos/seed/aspect1/640/360" alt="16:9" className="h-full w-full rounded-md object-cover" />
      </AspectRatio>
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[240px]">
      <AspectRatio ratio={1}>
        <img src="https://picsum.photos/seed/aspect2/400/400" alt="1:1" className="h-full w-full rounded-md object-cover" />
      </AspectRatio>
    </div>
}`,...v.parameters?.docs?.source}}}})))()}b();export{_ as Default,v as Square,y as __namedExportsOrder,g as default};