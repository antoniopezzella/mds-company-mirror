import{a5 as l,k as Te,R as H,p as y,Z as j,ao as re,$ as J}from"./iframe-CPBTUrEW.js";import{b as ae,e as Q,g as ve,c as Pe}from"./styled-CijOp1BY.js";import{_ as Ve,b as Be,a as oe,u as Se,d as we}from"./useTimeout-BkF-taVW.js";import{u as ie}from"./useForkRef-DKrbSgSS.js";import{u as _}from"./useEventCallback-BK5EjOzt.js";import{i as se}from"./isFocusVisible-B8k4qzLc.js";function De(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function ee(t,e){var o=function(i){return e&&l.isValidElement(i)?e(i):i},a=Object.create(null);return t&&l.Children.map(t,function(n){return n}).forEach(function(n){a[n.key]=o(n)}),a}function Le(t,e){t=t||{},e=e||{};function o(d){return d in e?e[d]:t[d]}var a=Object.create(null),n=[];for(var i in t)i in e?n.length&&(a[i]=n,n=[]):n.push(i);var r,c={};for(var u in e){if(a[u])for(r=0;r<a[u].length;r++){var p=a[u][r];c[a[u][r]]=o(p)}c[u]=o(u)}for(r=0;r<n.length;r++)c[n[r]]=o(n[r]);return c}function k(t,e,o){return o[e]!=null?o[e]:t.props[e]}function Ne(t,e){return ee(t.children,function(o){return l.cloneElement(o,{onExited:e.bind(null,o),in:!0,appear:k(o,"appear",t),enter:k(o,"enter",t),exit:k(o,"exit",t)})})}function ke(t,e,o){var a=ee(t.children),n=Le(e,a);return Object.keys(n).forEach(function(i){var r=n[i];if(l.isValidElement(r)){var c=i in e,u=i in a,p=e[i],d=l.isValidElement(p)&&!p.props.in;u&&(!c||d)?n[i]=l.cloneElement(r,{onExited:o.bind(null,r),in:!0,exit:k(r,"exit",t),enter:k(r,"enter",t)}):!u&&c&&!d?n[i]=l.cloneElement(r,{in:!1}):u&&c&&l.isValidElement(p)&&(n[i]=l.cloneElement(r,{onExited:o.bind(null,r),in:p.props.in,exit:k(r,"exit",t),enter:k(r,"enter",t)}))}}),n}var je=Object.values||function(t){return Object.keys(t).map(function(e){return t[e]})},$e={component:"div",childFactory:function(e){return e}},te=(function(t){Ve(e,t);function e(a,n){var i;i=t.call(this,a,n)||this;var r=i.handleExited.bind(De(i));return i.state={contextValue:{isMounting:!0},handleExited:r,firstRender:!0},i}var o=e.prototype;return o.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},o.componentWillUnmount=function(){this.mounted=!1},e.getDerivedStateFromProps=function(n,i){var r=i.children,c=i.handleExited,u=i.firstRender;return{children:u?Ne(n,c):ke(n,r,c),firstRender:!1}},o.handleExited=function(n,i){var r=ee(this.props.children);n.key in r||(n.props.onExited&&n.props.onExited(i),this.mounted&&this.setState(function(c){var u=Te({},c.children);return delete u[n.key],{children:u}}))},o.render=function(){var n=this.props,i=n.component,r=n.childFactory,c=Be(n,["component","childFactory"]),u=this.state.contextValue,p=je(this.state.children).map(r);return delete c.appear,delete c.enter,delete c.exit,i===null?H.createElement(oe.Provider,{value:u},p):H.createElement(oe.Provider,{value:u},H.createElement(i,c,p))},e})(H.Component);te.propTypes={};te.defaultProps=$e;class G{static create(){return new G}static use(){const e=Se(G.create).current,[o,a]=l.useState(!1);return e.shouldMount=o,e.setShouldMount=a,l.useEffect(e.mountEffect,[o]),e}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=Ie(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}}function Fe(){return G.use()}function Ie(){let t,e;const o=new Promise((a,n)=>{t=a,e=n});return o.resolve=t,o.reject=e,o}function Ue(t){const{className:e,classes:o,pulsate:a=!1,rippleX:n,rippleY:i,rippleSize:r,in:c,onExited:u,timeout:p}=t,[d,h]=l.useState(!1),M=y(e,o.ripple,o.rippleVisible,a&&o.ripplePulsate),P={width:r,height:r,top:-(r/2)+i,left:-(r/2)+n},b=y(o.child,d&&o.childLeaving,a&&o.childPulsate);return!c&&!d&&h(!0),l.useEffect(()=>{if(!c&&u!=null){const w=setTimeout(u,p);return()=>{clearTimeout(w)}}},[u,c,p]),j.jsx("span",{className:M,style:P,children:j.jsx("span",{className:b})})}const g=ae("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),Z=550,ze=80,Oe=J`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,Ae=J`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,Xe=J`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,Ye=Q("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),Ke=Q(Ue,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${g.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${Oe};
    animation-duration: ${Z}ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
  }

  &.${g.ripplePulsate} {
    animation-duration: ${({theme:t})=>t.transitions.duration.shorter}ms;
  }

  & .${g.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${g.childLeaving} {
    opacity: 0;
    animation-name: ${Ae};
    animation-duration: ${Z}ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
  }

  & .${g.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${Xe};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,We=l.forwardRef(function(e,o){const a=re({props:e,name:"MuiTouchRipple"}),{center:n=!1,classes:i={},className:r,...c}=a,[u,p]=l.useState([]),d=l.useRef(0),h=l.useRef(null);l.useEffect(()=>{h.current&&(h.current(),h.current=null)},[u]);const M=l.useRef(!1),P=we(),b=l.useRef(null),w=l.useRef(null),C=l.useCallback(f=>{const{pulsate:E,rippleX:R,rippleY:I,rippleSize:D,cb:z}=f;p(x=>[...x,j.jsx(Ke,{classes:{ripple:y(i.ripple,g.ripple),rippleVisible:y(i.rippleVisible,g.rippleVisible),ripplePulsate:y(i.ripplePulsate,g.ripplePulsate),child:y(i.child,g.child),childLeaving:y(i.childLeaving,g.childLeaving),childPulsate:y(i.childPulsate,g.childPulsate)},timeout:Z,pulsate:E,rippleX:R,rippleY:I,rippleSize:D},d.current)]),d.current+=1,h.current=z},[i]),$=l.useCallback((f={},E={},R=()=>{})=>{const{pulsate:I=!1,center:D=n||E.pulsate,fakeElement:z=!1}=E;if(f?.type==="mousedown"&&M.current){M.current=!1;return}f?.type==="touchstart"&&(M.current=!0);const x=z?null:w.current,V=x?x.getBoundingClientRect():{width:0,height:0,left:0,top:0};let B,T,S;if(D||f===void 0||f.clientX===0&&f.clientY===0||!f.clientX&&!f.touches)B=Math.round(V.width/2),T=Math.round(V.height/2);else{const{clientX:O,clientY:L}=f.touches&&f.touches.length>0?f.touches[0]:f;B=Math.round(O-V.left),T=Math.round(L-V.top)}if(D)S=Math.sqrt((2*V.width**2+V.height**2)/3),S%2===0&&(S+=1);else{const O=Math.max(Math.abs((x?x.clientWidth:0)-B),B)*2+2,L=Math.max(Math.abs((x?x.clientHeight:0)-T),T)*2+2;S=Math.sqrt(O**2+L**2)}f?.touches?b.current===null&&(b.current=()=>{C({pulsate:I,rippleX:B,rippleY:T,rippleSize:S,cb:R})},P.start(ze,()=>{b.current&&(b.current(),b.current=null)})):C({pulsate:I,rippleX:B,rippleY:T,rippleSize:S,cb:R})},[n,C,P]),Y=l.useCallback(()=>{$({},{pulsate:!0})},[$]),F=l.useCallback((f,E)=>{if(P.clear(),f?.type==="touchend"&&b.current){b.current(),b.current=null,P.start(0,()=>{F(f,E)});return}b.current=null,p(R=>R.length>0?R.slice(1):R),h.current=E},[P]);return l.useImperativeHandle(o,()=>({pulsate:Y,start:$,stop:F}),[Y,$,F]),j.jsx(Ye,{className:y(g.root,i.root,r),ref:w,...c,children:j.jsx(te,{component:null,exit:!0,children:u})})});function He(t){return ve("MuiButtonBase",t)}const _e=ae("MuiButtonBase",["root","disabled","focusVisible"]),Ge=t=>{const{disabled:e,focusVisible:o,focusVisibleClassName:a,classes:n}=t,r=Pe({root:["root",e&&"disabled",o&&"focusVisible"]},He,n);return o&&a&&(r.root+=` ${a}`),r},qe=Q("button",{name:"MuiButtonBase",slot:"Root"})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${_e.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),ot=l.forwardRef(function(e,o){const a=re({props:e,name:"MuiButtonBase"}),{action:n,centerRipple:i=!1,children:r,className:c,component:u="button",disabled:p=!1,disableRipple:d=!1,disableTouchRipple:h=!1,focusRipple:M=!1,focusVisibleClassName:P,LinkComponent:b="a",onBlur:w,onClick:C,onContextMenu:$,onDragLeave:Y,onFocus:F,onFocusVisible:f,onKeyDown:E,onKeyUp:R,onMouseDown:I,onMouseLeave:D,onMouseUp:z,onTouchEnd:x,onTouchMove:V,onTouchStart:B,tabIndex:T=0,TouchRippleProps:S,touchRippleRef:O,type:L,...U}=a,A=l.useRef(null),m=Fe(),le=ie(m.ref,O),[N,K]=l.useState(!1);p&&N&&K(!1),l.useImperativeHandle(n,()=>({focusVisible:()=>{K(!0),A.current.focus()}}),[]);const ue=m.shouldMount&&!d&&!p;l.useEffect(()=>{N&&M&&!d&&m.pulsate()},[d,M,N,m]);const ce=v(m,"start",I,h),pe=v(m,"stop",$,h),fe=v(m,"stop",Y,h),de=v(m,"stop",z,h),he=v(m,"stop",s=>{N&&s.preventDefault(),D&&D(s)},h),me=v(m,"start",B,h),be=v(m,"stop",x,h),ge=v(m,"stop",V,h),Me=v(m,"stop",s=>{se(s.target)||K(!1),w&&w(s)},!1),Re=_(s=>{A.current||(A.current=s.currentTarget),se(s.target)&&(K(!0),f&&f(s)),F&&F(s)}),q=()=>{const s=A.current;return s?s.tagName==="BUTTON"?!1:!(s.tagName==="A"&&s.href):u&&u!=="button"},Ee=_(s=>{M&&!s.repeat&&N&&s.key===" "&&m.stop(s,()=>{m.start(s)}),s.target===s.currentTarget&&q()&&s.key===" "&&s.preventDefault(),E&&E(s),s.target===s.currentTarget&&q()&&s.key==="Enter"&&!p&&(s.preventDefault(),C&&C(s))}),xe=_(s=>{M&&s.key===" "&&N&&!s.defaultPrevented&&m.stop(s,()=>{m.pulsate(s)}),R&&R(s),C&&s.target===s.currentTarget&&q()&&s.key===" "&&!s.defaultPrevented&&!p&&C(s)});let W=u;W==="button"&&(U.href||U.to)&&(W=b);const X={};if(W==="button"){const s=!!U.formAction;X.type=L===void 0&&!s?"button":L,X.disabled=p}else!U.href&&!U.to&&(X.role="button"),p&&(X["aria-disabled"]=p);const ye=ie(o,A),ne={...a,centerRipple:i,component:u,disabled:p,disableRipple:d,disableTouchRipple:h,focusRipple:M,tabIndex:T,focusVisible:N},Ce=Ge(ne);return j.jsxs(qe,{as:W,className:y(Ce.root,c),ownerState:ne,onBlur:Me,onClick:C,onContextMenu:pe,onFocus:Re,onKeyDown:Ee,onKeyUp:xe,onMouseDown:ce,onMouseLeave:he,onMouseUp:de,onDragLeave:fe,onTouchEnd:be,onTouchMove:ge,onTouchStart:me,ref:ye,tabIndex:p?-1:T,type:L,...X,...U,children:[r,ue?j.jsx(We,{ref:le,center:i,...S}):null]})});function v(t,e,o,a=!1){return _(n=>(o&&o(n),a||t[e](n),!0))}export{ot as B};
