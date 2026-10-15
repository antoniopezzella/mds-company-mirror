import{a5 as t,Z as e}from"./iframe-CPBTUrEW.js";import{c as oe}from"./utils-CURkPv3a.js";import{c as We}from"./createLucideIcon-BnpAccaP.js";import"./preload-helper-PPVm8Dsz.js";const Fe=[["circle",{cx:"12.1",cy:"12.1",r:"1",key:"18d7e5"}]],Be=We("dot",Fe);var He=Object.defineProperty,$e=Object.defineProperties,Ve=Object.getOwnPropertyDescriptors,ae=Object.getOwnPropertySymbols,je=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable,be=(n,o,a)=>o in n?He(n,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[o]=a,ze=(n,o)=>{for(var a in o||(o={}))je.call(o,a)&&be(n,a,o[a]);if(ae)for(var a of ae(o))ye.call(o,a)&&be(n,a,o[a]);return n},qe=(n,o)=>$e(n,Ve(o)),Xe=(n,o)=>{var a={};for(var s in n)je.call(n,s)&&o.indexOf(s)<0&&(a[s]=n[s]);if(n!=null&&ae)for(var s of ae(n))o.indexOf(s)<0&&ye.call(n,s)&&(a[s]=n[s]);return a};function Ye(n){let o=setTimeout(n,0),a=setTimeout(n,10),s=setTimeout(n,50);return[o,a,s]}function Ze(n){let o=t.useRef();return t.useEffect(()=>{o.current=n}),o.current}var Ke=18,we=40,Je=`${we}px`,Qe=["[data-lastpass-icon-root]","com-1password-button","[data-dashlanecreated]",'[style$="2147483647 !important;"]'].join(",");function Ue({containerRef:n,inputRef:o,pushPasswordManagerStrategy:a,isFocused:s}){let[P,m]=t.useState(!1),[D,b]=t.useState(!1),[w,C]=t.useState(!1),$=t.useMemo(()=>a==="none"?!1:(a==="increase-width"||a==="experimental-no-flickering")&&P&&D,[P,D,a]),W=t.useCallback(()=>{let h=n.current,E=o.current;if(!h||!E||w||a==="none")return;let T=h,j=T.getBoundingClientRect().left+T.offsetWidth,F=T.getBoundingClientRect().top+T.offsetHeight/2,c=j-Ke,V=F;document.querySelectorAll(Qe).length===0&&document.elementFromPoint(c,V)===h||(m(!0),C(!0))},[n,o,w,a]);return t.useEffect(()=>{let h=n.current;if(!h||a==="none")return;function E(){let j=window.innerWidth-h.getBoundingClientRect().right;b(j>=we)}E();let T=setInterval(E,1e3);return()=>{clearInterval(T)}},[n,a]),t.useEffect(()=>{let h=s||document.activeElement===o.current;if(a==="none"||!h)return;let E=setTimeout(W,0),T=setTimeout(W,2e3),j=setTimeout(W,5e3),F=setTimeout(()=>{C(!0)},6e3);return()=>{clearTimeout(E),clearTimeout(T),clearTimeout(j),clearTimeout(F)}},[o,s,a,W]),{hasPWMBadge:P,willPushPWMBadge:$,PWM_BADGE_SPACE_WIDTH:Je}}var Ce=t.createContext({}),Ee=t.forwardRef((n,o)=>{var a=n,{value:s,onChange:P,maxLength:m,textAlign:D="left",pattern:b,placeholder:w,inputMode:C="numeric",onComplete:$,pushPasswordManagerStrategy:W="increase-width",pasteTransformer:h,containerClassName:E,noScriptCSSFallback:T=et,render:j,children:F}=a,c=Xe(a,["value","onChange","maxLength","textAlign","pattern","placeholder","inputMode","onComplete","pushPasswordManagerStrategy","pasteTransformer","containerClassName","noScriptCSSFallback","render","children"]),V,pe,me,xe,fe;let[ke,Re]=t.useState(typeof c.defaultValue=="string"?c.defaultValue:""),d=s??ke,G=Ze(d),z=t.useCallback(r=>{P?.(r),Re(r)},[P]),O=t.useMemo(()=>b?typeof b=="string"?new RegExp(b):b:null,[b]),p=t.useRef(null),le=t.useRef(null),ie=t.useRef({value:d,onChange:z,isIOS:typeof window<"u"&&((pe=(V=window?.CSS)==null?void 0:V.supports)==null?void 0:pe.call(V,"-webkit-touch-callout","none"))}),U=t.useRef({prev:[(me=p.current)==null?void 0:me.selectionStart,(xe=p.current)==null?void 0:xe.selectionEnd,(fe=p.current)==null?void 0:fe.selectionDirection]});t.useImperativeHandle(o,()=>p.current,[]),t.useEffect(()=>{let r=p.current,l=le.current;if(!r||!l)return;ie.current.value!==r.value&&ie.current.onChange(r.value),U.current.prev=[r.selectionStart,r.selectionEnd,r.selectionDirection];function x(){if(document.activeElement!==r){X(null),Y(null);return}let u=r.selectionStart,f=r.selectionEnd,ee=r.selectionDirection,I=r.maxLength,M=r.value,y=U.current.prev,k=-1,R=-1,N;if(M.length!==0&&u!==null&&f!==null){let Ne=u===f,Le=u===M.length&&M.length<I;if(Ne&&!Le){let L=u;if(L===0)k=0,R=1,N="forward";else if(L===I)k=L-1,R=L,N="backward";else if(I>1&&M.length>1){let ce=0;if(y[0]!==null&&y[1]!==null){N=L<y[1]?"backward":"forward";let Ae=y[0]===y[1]&&y[0]<I;N==="backward"&&!Ae&&(ce=-1)}k=ce+L,R=ce+L+1}}k!==-1&&R!==-1&&k!==R&&p.current.setSelectionRange(k,R,N)}let Oe=k!==-1?k:u,Se=R!==-1?R:f,Me=N??ee;X(Oe),Y(Se),U.current.prev=[Oe,Se,Me]}if(document.addEventListener("selectionchange",x,{capture:!0}),x(),document.activeElement===r&&se(!0),!document.getElementById("input-otp-style")){let u=document.createElement("style");if(u.id="input-otp-style",document.head.appendChild(u),u.sheet){let f="background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";Z(u.sheet,"[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"),Z(u.sheet,`[data-input-otp]:autofill { ${f} }`),Z(u.sheet,`[data-input-otp]:-webkit-autofill { ${f} }`),Z(u.sheet,"@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"),Z(u.sheet,"[data-input-otp] + * { pointer-events: all !important; }")}}let g=()=>{l&&l.style.setProperty("--root-height",`${r.clientHeight}px`)};g();let v=new ResizeObserver(g);return v.observe(r),()=>{document.removeEventListener("selectionchange",x,{capture:!0}),v.disconnect()}},[]);let[he,ge]=t.useState(!1),[q,se]=t.useState(!1),[_,X]=t.useState(null),[B,Y]=t.useState(null);t.useEffect(()=>{Ye(()=>{var r,l,x,g;(r=p.current)==null||r.dispatchEvent(new Event("input"));let v=(l=p.current)==null?void 0:l.selectionStart,u=(x=p.current)==null?void 0:x.selectionEnd,f=(g=p.current)==null?void 0:g.selectionDirection;v!==null&&u!==null&&(X(v),Y(u),U.current.prev=[v,u,f])})},[d,q]),t.useEffect(()=>{G!==void 0&&d!==G&&G.length<m&&d.length===m&&$?.(d)},[m,$,G,d]);let H=Ue({containerRef:le,inputRef:p,pushPasswordManagerStrategy:W,isFocused:q}),ve=t.useCallback(r=>{let l=r.currentTarget.value.slice(0,m);if(l.length>0&&O&&!O.test(l)){r.preventDefault();return}typeof G=="string"&&l.length<G.length&&document.dispatchEvent(new Event("selectionchange")),z(l)},[m,z,G,O]),Pe=t.useCallback(()=>{var r;if(p.current){let l=Math.min(p.current.value.length,m-1),x=p.current.value.length;(r=p.current)==null||r.setSelectionRange(l,x),X(l),Y(x)}se(!0)},[m]),Te=t.useCallback(r=>{var l,x;let g=p.current;if(!h&&(!ie.current.isIOS||!r.clipboardData||!g))return;let v=r.clipboardData.getData("text/plain"),u=h?h(v):v;r.preventDefault();let f=(l=p.current)==null?void 0:l.selectionStart,ee=(x=p.current)==null?void 0:x.selectionEnd,I=(f!==ee?d.slice(0,f)+u+d.slice(ee):d.slice(0,f)+u+d.slice(f)).slice(0,m);if(I.length>0&&O&&!O.test(I))return;g.value=I,z(I);let M=Math.min(I.length,m-1),y=I.length;g.setSelectionRange(M,y),X(M),Y(y)},[m,z,O,d]),De=t.useMemo(()=>({position:"relative",cursor:c.disabled?"default":"text",userSelect:"none",WebkitUserSelect:"none",pointerEvents:"none"}),[c.disabled]),Ie=t.useMemo(()=>({position:"absolute",inset:0,width:H.willPushPWMBadge?`calc(100% + ${H.PWM_BADGE_SPACE_WIDTH})`:"100%",clipPath:H.willPushPWMBadge?`inset(0 ${H.PWM_BADGE_SPACE_WIDTH} 0 0)`:void 0,height:"100%",display:"flex",textAlign:D,opacity:"1",color:"transparent",pointerEvents:"all",background:"transparent",caretColor:"transparent",border:"0 solid transparent",outline:"0 solid transparent",boxShadow:"none",lineHeight:"1",letterSpacing:"-.5em",fontSize:"var(--root-height)",fontFamily:"monospace",fontVariantNumeric:"tabular-nums"}),[H.PWM_BADGE_SPACE_WIDTH,H.willPushPWMBadge,D]),Ge=t.useMemo(()=>t.createElement("input",qe(ze({autoComplete:c.autoComplete||"one-time-code"},c),{"data-input-otp":!0,"data-input-otp-placeholder-shown":d.length===0||void 0,"data-input-otp-mss":_,"data-input-otp-mse":B,inputMode:C,pattern:O?.source,"aria-placeholder":w,style:Ie,maxLength:m,value:d,ref:p,onPaste:r=>{var l;Te(r),(l=c.onPaste)==null||l.call(c,r)},onChange:ve,onMouseOver:r=>{var l;ge(!0),(l=c.onMouseOver)==null||l.call(c,r)},onMouseLeave:r=>{var l;ge(!1),(l=c.onMouseLeave)==null||l.call(c,r)},onFocus:r=>{var l;Pe(),(l=c.onFocus)==null||l.call(c,r)},onBlur:r=>{var l;se(!1),(l=c.onBlur)==null||l.call(c,r)}})),[ve,Pe,Te,C,Ie,m,B,_,c,O?.source,d]),ue=t.useMemo(()=>({slots:Array.from({length:m}).map((r,l)=>{var x;let g=q&&_!==null&&B!==null&&(_===B&&l===_||l>=_&&l<B),v=d[l]!==void 0?d[l]:null,u=d[0]!==void 0?null:(x=w?.[l])!=null?x:null;return{char:v,placeholderChar:u,isActive:g,hasFakeCaret:g&&v===null}}),isFocused:q,isHovering:!c.disabled&&he}),[q,he,m,B,_,c.disabled,d]),_e=t.useMemo(()=>j?j(ue):t.createElement(Ce.Provider,{value:ue},F),[F,ue,j]);return t.createElement(t.Fragment,null,T!==null&&t.createElement("noscript",null,t.createElement("style",null,T)),t.createElement("div",{ref:le,"data-input-otp-container":!0,style:De,className:E},_e,t.createElement("div",{style:{position:"absolute",inset:0,pointerEvents:"none"}},Ge)))});Ee.displayName="Input";function Z(n,o){try{n.insertRule(o)}catch{console.error("input-otp could not insert CSS rule:",o)}}var et=`
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`,de="^\\d+$";const A=t.forwardRef(({className:n,containerClassName:o,...a},s)=>e.jsx(Ee,{ref:s,"aria-label":"One-time code",containerClassName:oe("flex items-center gap-2 has-[:disabled]:opacity-50",o),className:oe("disabled:cursor-not-allowed",n),...a}));A.displayName="InputOTP";const S=t.forwardRef(({className:n,...o},a)=>e.jsx("div",{ref:a,className:oe("flex items-center",n),...o}));S.displayName="InputOTPGroup";const i=t.forwardRef(({index:n,className:o,style:a,...s},P)=>{const D=t.useContext(Ce)?.slots[n],{char:b,hasFakeCaret:w,isActive:C}=D??{char:null,hasFakeCaret:!1,isActive:!1};return e.jsxs("div",{ref:P,className:oe("relative flex h-10 w-10 items-center justify-center border-y border-r font-sans-productive text-sm transition-all first:rounded-l-lg first:border-l last:rounded-r-lg",C&&"z-10 ring-2 ring-offset-0",o),style:{borderColor:C?"var(--role-focus-ring)":"var(--role-border-default)",color:"var(--role-text-primary)",backgroundColor:"var(--role-surface-default)","--tw-ring-color":"var(--role-focus-ring)",...a},...s,children:[b,w&&e.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center",children:e.jsx("div",{className:"h-4 w-px animate-caret-blink",style:{backgroundColor:"var(--role-text-primary)"}})})]})});i.displayName="InputOTPSlot";const Q=t.forwardRef(({...n},o)=>e.jsx("div",{ref:o,role:"separator",...n,children:e.jsx(Be,{style:{color:"var(--role-text-secondary)"}})}));Q.displayName="InputOTPSeparator";A.__docgenInfo={description:"Design System InputOTP — shadcn/ui counterpart wrapping the `input-otp`\npackage's `OTPInput`. No MDS twin exists yet; built to match shadcn/ui's\nreference `InputOTP` / `InputOTPGroup` / `InputOTPSlot` / `InputOTPSeparator`\nAPI. `input-otp` exposes state via the `OTPInputContext` React Context\n(not a `useOTPInputContext` hook — verified against the package's own\n`dist/index.d.ts`), consumed here with `React.useContext`.",methods:[],displayName:"InputOTP"};S.__docgenInfo={description:"",methods:[],displayName:"InputOTPGroup"};i.__docgenInfo={description:"",methods:[],displayName:"InputOTPSlot",props:{index:{required:!0,tsType:{name:"number"},description:"Zero-based position in the code — reads its character and active/caret state from the parent `OTPInputContext`, not from props directly."}}};Q.__docgenInfo={description:"",methods:[],displayName:"InputOTPSeparator"};const at={title:"Components/InputOTP",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Segmented input for one-time codes, PINs, and verification digits."}}}},te={render:()=>e.jsx(A,{maxLength:6,children:e.jsxs(S,{children:[e.jsx(i,{index:0}),e.jsx(i,{index:1}),e.jsx(i,{index:2}),e.jsx(i,{index:3}),e.jsx(i,{index:4}),e.jsx(i,{index:5})]})})},K={render:()=>e.jsxs(A,{maxLength:6,pattern:de,children:[e.jsxs(S,{children:[e.jsx(i,{index:0}),e.jsx(i,{index:1}),e.jsx(i,{index:2})]}),e.jsx(Q,{}),e.jsxs(S,{children:[e.jsx(i,{index:3}),e.jsx(i,{index:4}),e.jsx(i,{index:5})]})]})},ne={render:()=>e.jsx(A,{maxLength:4,pattern:de,children:e.jsxs(S,{children:[e.jsx(i,{index:0}),e.jsx(i,{index:1}),e.jsx(i,{index:2}),e.jsx(i,{index:3})]})})},re={render:()=>e.jsxs(A,{maxLength:6,disabled:!0,defaultValue:"123",children:[e.jsxs(S,{children:[e.jsx(i,{index:0}),e.jsx(i,{index:1}),e.jsx(i,{index:2})]}),e.jsx(Q,{}),e.jsxs(S,{children:[e.jsx(i,{index:3}),e.jsx(i,{index:4}),e.jsx(i,{index:5})]})]})},J={render:()=>{const[n,o]=t.useState(""),[a,s]=t.useState("idle");return e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsxs(A,{maxLength:6,pattern:de,value:n,onChange:P=>{o(P),s("idle")},onComplete:()=>s("complete"),children:[e.jsxs(S,{children:[e.jsx(i,{index:0}),e.jsx(i,{index:1}),e.jsx(i,{index:2})]}),e.jsx(Q,{}),e.jsxs(S,{children:[e.jsx(i,{index:3}),e.jsx(i,{index:4}),e.jsx(i,{index:5})]})]}),e.jsx("p",{className:"text-xs opacity-60",children:a==="complete"?"Code verified":`${n.length}/6 digits entered`})]})}},lt=["Default","TwoFactorCode","FourDigitPin","Disabled","ControlledWithCompletion"];te.parameters={...te.parameters,docs:{...te.parameters?.docs,source:{originalSource:`{
  render: () => <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...te.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...K.parameters?.docs?.source},description:{story:`A 6-digit two-factor authentication code entry, split 3-3 with a visual
separator — a common real-world OTP layout.`,...K.parameters?.docs?.description}}};ne.parameters={...ne.parameters,docs:{...ne.parameters?.docs,source:{originalSource:`{
  render: () => <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
}`,...ne.parameters?.docs?.source}}};re.parameters={...re.parameters,docs:{...re.parameters?.docs,source:{originalSource:`{
  render: () => <InputOTP maxLength={6} disabled defaultValue="123">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...re.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState<'idle' | 'complete'>('idle');
    return <div className="flex flex-col items-center gap-3">
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={value} onChange={next => {
        setValue(next);
        setStatus('idle');
      }} onComplete={() => setStatus('complete')}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-xs opacity-60">
          {status === 'complete' ? 'Code verified' : \`\${value.length}/6 digits entered\`}
        </p>
      </div>;
  }
}`,...J.parameters?.docs?.source},description:{story:`Controlled example showing the entered value echoed back, and a
completion callback firing once all digits are filled — the shape used
for a real verify-code flow guarding a policy document download.`,...J.parameters?.docs?.description}}};export{J as ControlledWithCompletion,te as Default,re as Disabled,ne as FourDigitPin,K as TwoFactorCode,lt as __namedExportsOrder,at as default};
