import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{F as i,N as a,i as o,n as s,t as c}from"./DefaultPropsProvider-DpSsnPPL.js";import{n as l}from"./zero-styled-Biqu5-65.js";import{a as u,i as d,o as f,r as p,t as m}from"./composeClasses-CYflYE6t.js";import{n as h,t as g}from"./clsx-DSXoiAHx.js";import{n as _,t as v}from"./memoTheme-ks68kOrQ.js";function y(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||``}function b(e){return parseFloat(e)}function x(e){return u(`MuiSkeleton`,e)}function S(){return(S=t((()=>{d(),f(),p(`MuiSkeleton`,[`root`,`text`,`rectangular`,`rounded`,`circular`,`pulse`,`wave`,`withChildren`,`fitContent`,`heightAuto`])})))()}var C,w,T,E,D,O,k,A,j;function M(){return(M=t((()=>{C=e(n()),h(),l(),v(),c(),S(),w=r(),T=e=>{let{classes:t,variant:n,animation:r,hasChildren:i,width:a,height:o}=e;return m({root:[`root`,n,r,i&&`withChildren`,i&&!a&&`fitContent`,i&&!o&&`heightAuto`]},x,t)},E=i`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,D=i`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,O=typeof E==`string`?null:a`
        animation: ${E} 2s ease-in-out 0.5s infinite;
      `,k=typeof D==`string`?null:a`
        &::after {
          animation: ${D} 2s linear 0.5s infinite;
        }
      `,A=o(`span`,{name:`MuiSkeleton`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],n.animation!==!1&&t[n.animation],n.hasChildren&&t.withChildren,n.hasChildren&&!n.width&&t.fitContent,n.hasChildren&&!n.height&&t.heightAuto]}})(_(({theme:e})=>{let t=y(e.shape.borderRadius)||`px`,n=b(e.shape.borderRadius);return{display:`block`,backgroundColor:e.vars?e.vars.palette.Skeleton.bg:e.alpha(e.palette.text.primary,e.palette.mode===`light`?.11:.13),height:`1.2em`,variants:[{props:{variant:`text`},style:{marginTop:0,marginBottom:0,height:`auto`,transformOrigin:`0 55%`,transform:`scale(1, 0.60)`,borderRadius:`${n}${t}/${Math.round(n/.6*10)/10}${t}`,"&:empty:before":{content:`"\\00a0"`}}},{props:{variant:`circular`},style:{borderRadius:`50%`}},{props:{variant:`rounded`},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:({ownerState:e})=>e.hasChildren,style:{"& > *":{visibility:`hidden`}}},{props:({ownerState:e})=>e.hasChildren&&!e.width,style:{maxWidth:`fit-content`}},{props:({ownerState:e})=>e.hasChildren&&!e.height,style:{height:`auto`}},{props:{animation:`pulse`},style:O||{animation:`${E} 2s ease-in-out 0.5s infinite`}},{props:{animation:`wave`},style:{position:`relative`,overflow:`hidden`,WebkitMaskImage:`-webkit-radial-gradient(white, black)`,"&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(e.vars||e).palette.action.hover},
                transparent
              )`,content:`""`,position:`absolute`,transform:`translateX(-100%)`,bottom:0,left:0,right:0,top:0}}},{props:{animation:`wave`},style:k||{"&::after":{animation:`${D} 2s linear 0.5s infinite`}}}]}})),j=C.forwardRef(function(e,t){let n=s({props:e,name:`MuiSkeleton`}),{animation:r=`pulse`,className:i,component:a=`span`,height:o,style:c,variant:l=`text`,width:u,...d}=n,f={...n,animation:r,component:a,variant:l,hasChildren:!!d.children},p=T(f);return(0,w.jsx)(A,{as:a,ref:t,className:g(p.root,i),ownerState:f,...d,style:{width:u,height:o,...c}})})})))()}export{M as n,j as t};