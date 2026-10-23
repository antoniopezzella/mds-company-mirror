import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{F as i,R as a,i as o,n as s,t as c}from"./DefaultPropsProvider-DpSsnPPL.js";import{n as l}from"./zero-styled-Biqu5-65.js";import{a as u,i as d,o as f,r as p,t as m}from"./composeClasses-CYflYE6t.js";import{n as h,t as g}from"./clsx-DSXoiAHx.js";import{n as _,t as v}from"./useEventCallback-Bis1kuf-.js";import{n as y,t as ee}from"./useForkRef-CGPHblpK.js";import{n as te}from"./isFocusVisible-CqN4mfET.js";import{c as ne,f as re,l as b,n as x,o as S,p as C,r as ie,s as ae,u as oe}from"./useTimeout-DkV60oMp.js";var w;function T(){return(T=t((()=>{v(),w=_})))()}function se(){return D.use()}function ce(){let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}var E,D;function O(){return(O=t((()=>{E=e(n()),re(),D=class e{static create(){return new e}static use(){let t=C(e.create).current,[n,r]=E.useState(!1);return t.shouldMount=n,t.setShouldMount=r,E.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=ce(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}}})))()}function k(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function A(e,t){var n=function(e){return t&&(0,F.isValidElement)(e)?t(e):e},r=Object.create(null);return e&&F.Children.map(e,function(e){return e}).forEach(function(e){r[e.key]=n(e)}),r}function j(e,t){e||={},t||={};function n(n){return n in t?t[n]:e[n]}var r=Object.create(null),i=[];for(var a in e)a in t?i.length&&(r[a]=i,i=[]):i.push(a);var o,s={};for(var c in t){if(r[c])for(o=0;o<r[c].length;o++){var l=r[c][o];s[r[c][o]]=n(l)}s[c]=n(c)}for(o=0;o<i.length;o++)s[i[o]]=n(i[o]);return s}function M(e,t,n){return n[t]==null?e.props[t]:n[t]}function N(e,t){return A(e.children,function(n){return(0,F.cloneElement)(n,{onExited:t.bind(null,n),in:!0,appear:M(n,`appear`,e),enter:M(n,`enter`,e),exit:M(n,`exit`,e)})})}function P(e,t,n){var r=A(e.children),i=j(t,r);return Object.keys(i).forEach(function(a){var o=i[a];if((0,F.isValidElement)(o)){var s=a in t,c=a in r,l=t[a],u=(0,F.isValidElement)(l)&&!l.props.in;c&&(!s||u)?i[a]=(0,F.cloneElement)(o,{onExited:n.bind(null,o),in:!0,exit:M(o,`exit`,e),enter:M(o,`enter`,e)}):!c&&s&&!u?i[a]=(0,F.cloneElement)(o,{in:!1}):c&&s&&(0,F.isValidElement)(l)&&(i[a]=(0,F.cloneElement)(o,{onExited:n.bind(null,o),in:l.props.in,exit:M(o,`exit`,e),enter:M(o,`enter`,e)}))}}),i}var F;function I(){return(I=t((()=>{F=n()})))()}var L,R,z,B;function V(){return(V=t((()=>{b(),L=e(n()),ae(),I(),R=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},z={component:`div`,childFactory:function(e){return e}},B=function(e){ne(t,e);function t(t,n){var r=e.call(this,t,n)||this;return r.state={contextValue:{isMounting:!0},handleExited:r.handleExited.bind(k(r)),firstRender:!0},r}var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n=t.children,r=t.handleExited;return{children:t.firstRender?N(e,r):P(e,n,r),firstRender:!1}},n.handleExited=function(e,t){var n=A(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState(function(t){var n=a({},t.children);return delete n[e.key],{children:n}}))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,r=oe(e,[`component`,`childFactory`]),i=this.state.contextValue,a=R(this.state.children).map(n);return delete r.appear,delete r.enter,delete r.exit,t===null?L.createElement(S.Provider,{value:i},a):L.createElement(S.Provider,{value:i},L.createElement(t,r,a))},t}(L.Component),B.propTypes={},B.defaultProps=z})))()}function le(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:o,in:s,onExited:c,timeout:l}=e,[u,d]=H.useState(!1),f=g(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),p={width:o,height:o,top:-(o/2)+a,left:-(o/2)+i},m=g(n.child,u&&n.childLeaving,r&&n.childPulsate);return!s&&!u&&d(!0),H.useEffect(()=>{if(!s&&c!=null){let e=setTimeout(c,l);return()=>{clearTimeout(e)}}},[c,s,l]),(0,U.jsx)(`span`,{className:f,style:p,children:(0,U.jsx)(`span`,{className:m})})}var H,U;function W(){return(W=t((()=>{H=e(n()),h(),U=r()})))()}var G;function K(){return(K=t((()=>{d(),G=p(`MuiTouchRipple`,[`root`,`ripple`,`rippleVisible`,`ripplePulsate`,`child`,`childLeaving`,`childPulsate`])})))()}var q,J,Y,X,Z,ue,de,fe,pe;function me(){return(me=t((()=>{q=e(n()),V(),h(),x(),l(),c(),W(),K(),J=r(),Y=550,X=i`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,Z=i`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,ue=i`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,de=o(`span`,{name:`MuiTouchRipple`,slot:`Root`})({overflow:`hidden`,pointerEvents:`none`,position:`absolute`,zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:`inherit`}),fe=o(le,{name:`MuiTouchRipple`,slot:`Ripple`})`
  opacity: 0;
  position: absolute;

  &.${G.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${X};
    animation-duration: ${Y}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${G.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${G.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${G.childLeaving} {
    opacity: 0;
    animation-name: ${Z};
    animation-duration: ${Y}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${G.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${ue};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,pe=q.forwardRef(function(e,t){let{center:n=!1,classes:r={},className:i,...a}=s({props:e,name:`MuiTouchRipple`}),[o,c]=q.useState([]),l=q.useRef(0),u=q.useRef(null);q.useEffect(()=>{u.current&&=(u.current(),null)},[o]);let d=q.useRef(!1),f=ie(),p=q.useRef(null),m=q.useRef(null),h=q.useCallback(e=>{let{pulsate:t,rippleX:n,rippleY:i,rippleSize:a,cb:o}=e;c(e=>[...e,(0,J.jsx)(fe,{classes:{ripple:g(r.ripple,G.ripple),rippleVisible:g(r.rippleVisible,G.rippleVisible),ripplePulsate:g(r.ripplePulsate,G.ripplePulsate),child:g(r.child,G.child),childLeaving:g(r.childLeaving,G.childLeaving),childPulsate:g(r.childPulsate,G.childPulsate)},timeout:Y,pulsate:t,rippleX:n,rippleY:i,rippleSize:a},l.current)]),l.current+=1,u.current=o},[r]),_=q.useCallback((e={},t={},r=()=>{})=>{let{pulsate:i=!1,center:a=n||t.pulsate,fakeElement:o=!1}=t;if(e?.type===`mousedown`&&d.current){d.current=!1;return}e?.type===`touchstart`&&(d.current=!0);let s=o?null:m.current,c=s?s.getBoundingClientRect():{width:0,height:0,left:0,top:0},l,u,g;if(a||e===void 0||e.clientX===0&&e.clientY===0||!e.clientX&&!e.touches)l=Math.round(c.width/2),u=Math.round(c.height/2);else{let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;l=Math.round(t-c.left),u=Math.round(n-c.top)}if(a)g=Math.sqrt((2*c.width**2+c.height**2)/3),g%2==0&&(g+=1);else{let e=Math.max(Math.abs((s?s.clientWidth:0)-l),l)*2+2,t=Math.max(Math.abs((s?s.clientHeight:0)-u),u)*2+2;g=Math.sqrt(e**2+t**2)}e?.touches?p.current===null&&(p.current=()=>{h({pulsate:i,rippleX:l,rippleY:u,rippleSize:g,cb:r})},f.start(80,()=>{p.current&&=(p.current(),null)})):h({pulsate:i,rippleX:l,rippleY:u,rippleSize:g,cb:r})},[n,h,f]),v=q.useCallback(()=>{_({},{pulsate:!0})},[_]),y=q.useCallback((e,t)=>{f.clear(),e?.type===`touchend`&&p.current?(p.current(),p.current=null,f.start(0,()=>{y(e,t)})):(p.current=null,c(e=>e.length>0?e.slice(1):e),u.current=t)},[f]);return q.useImperativeHandle(t,()=>({pulsate:v,start:_,stop:y}),[v,_,y]),(0,J.jsx)(de,{className:g(G.root,r.root,i),ref:m,...a,children:(0,J.jsx)(B,{component:null,exit:!0,children:o})})})})))()}function he(e){return u(`MuiButtonBase`,e)}var ge;function _e(){return(_e=t((()=>{d(),f(),ge=p(`MuiButtonBase`,[`root`,`disabled`,`focusVisible`])})))()}function Q(e,t,n,r=!1){return w(i=>(n&&n(i),r||e[t](i),!0))}var $,ve,ye,be,xe;function Se(){return(Se=t((()=>{$=e(n()),h(),l(),c(),ee(),T(),O(),me(),_e(),ve=r(),ye=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:i}=e,a=m({root:[`root`,t&&`disabled`,n&&`focusVisible`]},he,i);return n&&r&&(a.root+=` ${r}`),a},be=o(`button`,{name:`MuiButtonBase`,slot:`Root`})({display:`inline-flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,boxSizing:`border-box`,WebkitTapHighlightColor:`transparent`,backgroundColor:`transparent`,outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:`pointer`,userSelect:`none`,verticalAlign:`middle`,MozAppearance:`none`,WebkitAppearance:`none`,textDecoration:`none`,color:`inherit`,"&::-moz-focus-inner":{borderStyle:`none`},[`&.${ge.disabled}`]:{pointerEvents:`none`,cursor:`default`},"@media print":{colorAdjust:`exact`}}),xe=$.forwardRef(function(e,t){let n=s({props:e,name:`MuiButtonBase`}),{action:r,centerRipple:i=!1,children:a,className:o,component:c=`button`,disabled:l=!1,disableRipple:u=!1,disableTouchRipple:d=!1,focusRipple:f=!1,focusVisibleClassName:p,LinkComponent:m=`a`,onBlur:h,onClick:_,onContextMenu:v,onDragLeave:ee,onFocus:ne,onFocusVisible:re,onKeyDown:b,onKeyUp:x,onMouseDown:S,onMouseLeave:C,onMouseUp:ie,onTouchEnd:ae,onTouchMove:oe,onTouchStart:T,tabIndex:ce=0,TouchRippleProps:E,touchRippleRef:D,type:O,...k}=n,A=$.useRef(null),j=se(),M=y(j.ref,D),[N,P]=$.useState(!1);l&&N&&P(!1),$.useImperativeHandle(r,()=>({focusVisible:()=>{P(!0),A.current.focus()}}),[]);let F=j.shouldMount&&!u&&!l;$.useEffect(()=>{N&&f&&!u&&j.pulsate()},[u,f,N,j]);let I=Q(j,`start`,S,d),L=Q(j,`stop`,v,d),R=Q(j,`stop`,ee,d),z=Q(j,`stop`,ie,d),B=Q(j,`stop`,e=>{N&&e.preventDefault(),C&&C(e)},d),V=Q(j,`start`,T,d),le=Q(j,`stop`,ae,d),H=Q(j,`stop`,oe,d),U=Q(j,`stop`,e=>{te(e.target)||P(!1),h&&h(e)},!1),W=w(e=>{A.current||=e.currentTarget,te(e.target)&&(P(!0),re&&re(e)),ne&&ne(e)}),G=()=>{let e=A.current;return e?e.tagName!==`BUTTON`&&!(e.tagName===`A`&&e.href):c&&c!==`button`},K=w(e=>{f&&!e.repeat&&N&&e.key===` `&&j.stop(e,()=>{j.start(e)}),e.target===e.currentTarget&&G()&&e.key===` `&&e.preventDefault(),b&&b(e),e.target===e.currentTarget&&G()&&e.key===`Enter`&&!l&&(e.preventDefault(),_&&_(e))}),q=w(e=>{f&&e.key===` `&&N&&!e.defaultPrevented&&j.stop(e,()=>{j.pulsate(e)}),x&&x(e),_&&e.target===e.currentTarget&&G()&&e.key===` `&&!e.defaultPrevented&&!l&&_(e)}),J=c;J===`button`&&(k.href||k.to)&&(J=m);let Y={};if(J===`button`){let e=!!k.formAction;Y.type=O===void 0&&!e?`button`:O,Y.disabled=l}else!k.href&&!k.to&&(Y.role=`button`),l&&(Y[`aria-disabled`]=l);let X=y(t,A),Z={...n,centerRipple:i,component:c,disabled:l,disableRipple:u,disableTouchRipple:d,focusRipple:f,tabIndex:ce,focusVisible:N},ue=ye(Z);return(0,ve.jsxs)(be,{as:J,className:g(ue.root,o),ownerState:Z,onBlur:U,onClick:_,onContextMenu:L,onFocus:W,onKeyDown:K,onKeyUp:q,onMouseDown:I,onMouseLeave:B,onMouseUp:z,onDragLeave:R,onTouchEnd:le,onTouchMove:H,onTouchStart:V,ref:X,tabIndex:l?-1:ce,type:O,...Y,...k,children:[a,F?(0,ve.jsx)(pe,{ref:M,center:i,...E}):null]})})})))()}export{w as i,Se as n,T as r,xe as t};