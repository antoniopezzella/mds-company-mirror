import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{F as i,N as a,i as o,n as s,t as c}from"./DefaultPropsProvider-DpSsnPPL.js";import{n as l}from"./zero-styled-Biqu5-65.js";import{a as u,i as d,o as f,r as p,t as m}from"./composeClasses-CYflYE6t.js";import{n as h,t as g}from"./clsx-DSXoiAHx.js";import{n as _,t as v}from"./memoTheme-ks68kOrQ.js";import{n as y,t as b}from"./capitalize-DjBYixTq.js";import{n as x,t as S}from"./createSimplePaletteValueFilter-DP55OMRj.js";function C(e){return u(`MuiCircularProgress`,e)}function w(){return(w=t((()=>{d(),f(),p(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDeterminate`,`circleIndeterminate`,`circleDisableShrink`])})))()}var T,E,D,O,k,A,j,M,N,P,F,I,L;function R(){return(R=t((()=>{T=e(n()),h(),l(),v(),c(),y(),x(),w(),E=r(),D=44,O=i`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,k=i`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,A=typeof O==`string`?null:a`
        animation: ${O} 1.4s linear infinite;
      `,j=typeof k==`string`?null:a`
        animation: ${k} 1.4s ease-in-out infinite;
      `,M=e=>{let{classes:t,variant:n,color:r,disableShrink:i}=e,a={root:[`root`,n,`color${b(r)}`],svg:[`svg`],track:[`track`],circle:[`circle`,`circle${b(n)}`,i&&`circleDisableShrink`]};return m(a,C,t)},N=o(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${b(n.color)}`]]}})(_(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:A||{animation:`${O} 1.4s linear infinite`}},...Object.entries(e.palette).filter(S()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),P=o(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),F=o(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,t[`circle${b(n.variant)}`],n.disableShrink&&t.circleDisableShrink]}})(_(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:j||{animation:`${k} 1.4s ease-in-out infinite`}}]}))),I=o(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(_(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),L=T.forwardRef(function(e,t){let n=s({props:e,name:`MuiCircularProgress`}),{className:r,color:i=`primary`,disableShrink:a=!1,enableTrackSlot:o=!1,size:c=40,style:l,thickness:u=3.6,value:d=0,variant:f=`indeterminate`,...p}=n,m={...n,color:i,disableShrink:a,size:c,thickness:u,value:d,variant:f,enableTrackSlot:o},h=M(m),_={},v={},y={};if(f===`determinate`){let e=2*Math.PI*((D-u)/2);_.strokeDasharray=e.toFixed(3),y[`aria-valuenow`]=Math.round(d),_.strokeDashoffset=`${((100-d)/100*e).toFixed(3)}px`,v.transform=`rotate(-90deg)`}return(0,E.jsx)(N,{className:g(h.root,r),style:{width:c,height:c,...v,...l},ownerState:m,ref:t,role:`progressbar`,...y,...p,children:(0,E.jsxs)(P,{className:h.svg,ownerState:m,viewBox:`${D/2} ${D/2} ${D} ${D}`,children:[o?(0,E.jsx)(I,{className:h.track,ownerState:m,cx:D,cy:D,r:(D-u)/2,fill:`none`,strokeWidth:u,"aria-hidden":`true`}):null,(0,E.jsx)(F,{className:h.circle,style:_,ownerState:m,cx:D,cy:D,r:(D-u)/2,fill:`none`,strokeWidth:u})]})})})})))()}export{R as n,L as t};