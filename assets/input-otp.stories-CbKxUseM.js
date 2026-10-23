import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./utils-BGgJixJd.js";import{n as o,t as s}from"./createLucideIcon-DC6xoXt7.js";var c,l;function u(){return(u=t((()=>{o(),c=[[`circle`,{cx:`12.1`,cy:`12.1`,r:`1`,key:`18d7e5`}]],l=s(`dot`,c)})))()}function d(e){return[setTimeout(e,0),setTimeout(e,10),setTimeout(e,50)]}function f(e){let t=h.useRef();return h.useEffect(()=>{t.current=e}),t.current}function ee({containerRef:e,inputRef:t,pushPasswordManagerStrategy:n,isFocused:r}){let[i,a]=g.useState(!1),[o,s]=g.useState(!1),[c,l]=g.useState(!1),u=g.useMemo(()=>n!==`none`&&(n===`increase-width`||n===`experimental-no-flickering`)&&i&&o,[i,o,n]),d=g.useCallback(()=>{let r=e.current,i=t.current;if(!r||!i||c||n===`none`)return;let o=r,s=o.getBoundingClientRect().left+o.offsetWidth,u=o.getBoundingClientRect().top+o.offsetHeight/2,d=s-D,f=u;document.querySelectorAll(A).length===0&&document.elementFromPoint(d,f)===r||(a(!0),l(!0))},[e,t,c,n]);return g.useEffect(()=>{let t=e.current;if(!t||n===`none`)return;function r(){let e=window.innerWidth-t.getBoundingClientRect().right;s(e>=O)}r();let i=setInterval(r,1e3);return()=>{clearInterval(i)}},[e,n]),g.useEffect(()=>{let e=r||document.activeElement===t.current;if(n===`none`||!e)return;let i=setTimeout(d,0),a=setTimeout(d,2e3),o=setTimeout(d,5e3),s=setTimeout(()=>{l(!0)},6e3);return()=>{clearTimeout(i),clearTimeout(a),clearTimeout(o),clearTimeout(s)}},[t,r,n,d]),{hasPWMBadge:i,willPushPWMBadge:u,PWM_BADGE_SPACE_WIDTH:k}}function p(e,t){try{e.insertRule(t)}catch{console.error(`input-otp could not insert CSS rule:`,t)}}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=t((()=>{m=e(n(),1),h=e(n(),1),g=e(n(),1),_=Object.defineProperty,v=Object.defineProperties,y=Object.getOwnPropertyDescriptors,b=Object.getOwnPropertySymbols,x=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable,C=(e,t,n)=>t in e?_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,w=(e,t)=>{for(var n in t||={})x.call(t,n)&&C(e,n,t[n]);if(b)for(var n of b(t))S.call(t,n)&&C(e,n,t[n]);return e},T=(e,t)=>v(e,y(t)),E=(e,t)=>{var n={};for(var r in e)x.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&b)for(var r of b(e))t.indexOf(r)<0&&S.call(e,r)&&(n[r]=e[r]);return n},D=18,O=40,k=`${O}px`,A=`[data-lastpass-icon-root],com-1password-button,[data-dashlanecreated],[style$="2147483647 !important;"]`,j=m.createContext({}),M=m.forwardRef((e,t)=>{var n=e,{value:r,onChange:i,maxLength:a,textAlign:o=`left`,pattern:s,placeholder:c,inputMode:l=`numeric`,onComplete:u,pushPasswordManagerStrategy:h=`increase-width`,pasteTransformer:g,containerClassName:_,noScriptCSSFallback:v=N,render:y,children:b}=n,x=E(n,[`value`,`onChange`,`maxLength`,`textAlign`,`pattern`,`placeholder`,`inputMode`,`onComplete`,`pushPasswordManagerStrategy`,`pasteTransformer`,`containerClassName`,`noScriptCSSFallback`,`render`,`children`]),S;let[C,D]=m.useState(typeof x.defaultValue==`string`?x.defaultValue:``),O=r??C,k=f(O),A=m.useCallback(e=>{i?.(e),D(e)},[i]),M=m.useMemo(()=>s?typeof s==`string`?new RegExp(s):s:null,[s]),P=m.useRef(null),F=m.useRef(null),I=m.useRef({value:O,onChange:A,isIOS:typeof window<`u`&&((S=window==null?void 0:window.CSS)?.supports)?.call(S,`-webkit-touch-callout`,`none`)}),L=m.useRef({prev:[P.current?.selectionStart,P.current?.selectionEnd,P.current?.selectionDirection]});m.useImperativeHandle(t,()=>P.current,[]),m.useEffect(()=>{let e=P.current,t=F.current;if(!e||!t)return;I.current.value!==e.value&&I.current.onChange(e.value),L.current.prev=[e.selectionStart,e.selectionEnd,e.selectionDirection];function n(){if(document.activeElement!==e){U(null),G(null);return}let t=e.selectionStart,n=e.selectionEnd,r=e.selectionDirection,i=e.maxLength,a=e.value,o=L.current.prev,s=-1,c=-1,l;if(a.length!==0&&t!==null&&n!==null){let e=t===n,r=t===a.length&&a.length<i;if(e&&!r){let e=t;if(e===0)s=0,c=1,l=`forward`;else if(e===i)s=e-1,c=e,l=`backward`;else if(i>1&&a.length>1){let t=0;if(o[0]!==null&&o[1]!==null){l=e<o[1]?`backward`:`forward`;let n=o[0]===o[1]&&o[0]<i;l===`backward`&&!n&&(t=-1)}s=t+e,c=t+e+1}}s!==-1&&c!==-1&&s!==c&&P.current.setSelectionRange(s,c,l)}let u=s===-1?t:s,d=c===-1?n:c,f=l??r;U(u),G(d),L.current.prev=[u,d,f]}if(document.addEventListener(`selectionchange`,n,{capture:!0}),n(),document.activeElement===e&&V(!0),!document.getElementById(`input-otp-style`)){let e=document.createElement(`style`);if(e.id=`input-otp-style`,document.head.appendChild(e),e.sheet){let t=`background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;`;p(e.sheet,`[data-input-otp]::selection { background: transparent !important; color: transparent !important; }`),p(e.sheet,`[data-input-otp]:autofill { ${t} }`),p(e.sheet,`[data-input-otp]:-webkit-autofill { ${t} }`),p(e.sheet,`@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }`),p(e.sheet,`[data-input-otp] + * { pointer-events: all !important; }`)}}let r=()=>{t&&t.style.setProperty(`--root-height`,`${e.clientHeight}px`)};r();let i=new ResizeObserver(r);return i.observe(e),()=>{document.removeEventListener(`selectionchange`,n,{capture:!0}),i.disconnect()}},[]);let[R,z]=m.useState(!1),[B,V]=m.useState(!1),[H,U]=m.useState(null),[W,G]=m.useState(null);m.useEffect(()=>{d(()=>{var e;(e=P.current)==null||e.dispatchEvent(new Event(`input`));let t=P.current?.selectionStart,n=P.current?.selectionEnd,r=P.current?.selectionDirection;t!==null&&n!==null&&(U(t),G(n),L.current.prev=[t,n,r])})},[O,B]),m.useEffect(()=>{k!==void 0&&O!==k&&k.length<a&&O.length===a&&u?.(O)},[a,u,k,O]);let K=ee({containerRef:F,inputRef:P,pushPasswordManagerStrategy:h,isFocused:B}),q=m.useCallback(e=>{let t=e.currentTarget.value.slice(0,a);t.length>0&&M&&!M.test(t)?e.preventDefault():(typeof k==`string`&&t.length<k.length&&document.dispatchEvent(new Event(`selectionchange`)),A(t))},[a,A,k,M]),J=m.useCallback(()=>{var e;if(P.current){let t=Math.min(P.current.value.length,a-1),n=P.current.value.length;(e=P.current)==null||e.setSelectionRange(t,n),U(t),G(n)}V(!0)},[a]),Y=m.useCallback(e=>{let t=P.current;if(!g&&(!I.current.isIOS||!e.clipboardData||!t))return;let n=e.clipboardData.getData(`text/plain`),r=g?g(n):n;e.preventDefault();let i=P.current?.selectionStart,o=P.current?.selectionEnd,s=(i===o?O.slice(0,i)+r+O.slice(i):O.slice(0,i)+r+O.slice(o)).slice(0,a);if(s.length>0&&M&&!M.test(s))return;t.value=s,A(s);let c=Math.min(s.length,a-1),l=s.length;t.setSelectionRange(c,l),U(c),G(l)},[a,A,M,O]),X=m.useMemo(()=>({position:`relative`,cursor:x.disabled?`default`:`text`,userSelect:`none`,WebkitUserSelect:`none`,pointerEvents:`none`}),[x.disabled]),Z=m.useMemo(()=>({position:`absolute`,inset:0,width:K.willPushPWMBadge?`calc(100% + ${K.PWM_BADGE_SPACE_WIDTH})`:`100%`,clipPath:K.willPushPWMBadge?`inset(0 ${K.PWM_BADGE_SPACE_WIDTH} 0 0)`:void 0,height:`100%`,display:`flex`,textAlign:o,opacity:`1`,color:`transparent`,pointerEvents:`all`,background:`transparent`,caretColor:`transparent`,border:`0 solid transparent`,outline:`0 solid transparent`,boxShadow:`none`,lineHeight:`1`,letterSpacing:`-.5em`,fontSize:`var(--root-height)`,fontFamily:`monospace`,fontVariantNumeric:`tabular-nums`}),[K.PWM_BADGE_SPACE_WIDTH,K.willPushPWMBadge,o]),Q=m.useMemo(()=>m.createElement(`input`,T(w({autoComplete:x.autoComplete||`one-time-code`},x),{"data-input-otp":!0,"data-input-otp-placeholder-shown":O.length===0||void 0,"data-input-otp-mss":H,"data-input-otp-mse":W,inputMode:l,pattern:M?.source,"aria-placeholder":c,style:Z,maxLength:a,value:O,ref:P,onPaste:e=>{var t;Y(e),(t=x.onPaste)==null||t.call(x,e)},onChange:q,onMouseOver:e=>{var t;z(!0),(t=x.onMouseOver)==null||t.call(x,e)},onMouseLeave:e=>{var t;z(!1),(t=x.onMouseLeave)==null||t.call(x,e)},onFocus:e=>{var t;J(),(t=x.onFocus)==null||t.call(x,e)},onBlur:e=>{var t;V(!1),(t=x.onBlur)==null||t.call(x,e)}})),[q,J,Y,l,Z,a,W,H,x,M?.source,O]),$=m.useMemo(()=>({slots:Array.from({length:a}).map((e,t)=>{let n=B&&H!==null&&W!==null&&(H===W&&t===H||t>=H&&t<W),r=O[t]===void 0?null:O[t];return{char:r,placeholderChar:O[0]===void 0?c?.[t]??null:null,isActive:n,hasFakeCaret:n&&r===null}}),isFocused:B,isHovering:!x.disabled&&R}),[B,R,a,W,H,x.disabled,O]),te=m.useMemo(()=>y?y($):m.createElement(j.Provider,{value:$},b),[b,$,y]);return m.createElement(m.Fragment,null,v!==null&&m.createElement(`noscript`,null,m.createElement(`style`,null,v)),m.createElement(`div`,{ref:F,"data-input-otp-container":!0,style:X,className:_},te,m.createElement(`div`,{style:{position:`absolute`,inset:0,pointerEvents:`none`}},Q)))}),M.displayName=`Input`,N=`
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
}`,P=`^\\d+$`})))()}var I,L,R,z,B,V;function H(){return(H=t((()=>{I=e(n(),1),F(),u(),i(),L=r(),R=I.forwardRef(({className:e,containerClassName:t,...n},r)=>(0,L.jsx)(M,{ref:r,"aria-label":`One-time code`,containerClassName:a(`flex items-center gap-2 has-[:disabled]:opacity-50`,t),className:a(`disabled:cursor-not-allowed`,e),...n})),R.displayName=`InputOTP`,z=I.forwardRef(({className:e,...t},n)=>(0,L.jsx)(`div`,{ref:n,className:a(`flex items-center`,e),...t})),z.displayName=`InputOTPGroup`,B=I.forwardRef(({index:e,className:t,style:n,...r},i)=>{let{char:o,hasFakeCaret:s,isActive:c}=I.useContext(j)?.slots[e]??{char:null,hasFakeCaret:!1,isActive:!1};return(0,L.jsxs)(`div`,{ref:i,className:a(`relative flex h-10 w-10 items-center justify-center border-y border-r font-sans-productive text-sm transition-all first:rounded-l-lg first:border-l last:rounded-r-lg`,c&&`z-10 ring-2 ring-offset-0`,t),style:{borderColor:c?`var(--role-border-focus)`:`var(--role-border-default)`,color:`var(--role-fg-primary)`,backgroundColor:`var(--role-bg-default)`,"--tw-ring-color":`var(--role-border-focus)`,...n},...r,children:[o,s&&(0,L.jsx)(`div`,{className:`pointer-events-none absolute inset-0 flex items-center justify-center`,children:(0,L.jsx)(`div`,{className:`h-4 w-px animate-caret-blink`,style:{backgroundColor:`var(--role-fg-primary)`}})})]})}),B.displayName=`InputOTPSlot`,V=I.forwardRef(({...e},t)=>(0,L.jsx)(`div`,{ref:t,role:`separator`,...e,children:(0,L.jsx)(l,{style:{color:`var(--role-fg-neutral-subtle)`}})})),V.displayName=`InputOTPSeparator`,R.__docgenInfo={description:"Design System InputOTP — shadcn/ui counterpart wrapping the `input-otp`\npackage's `OTPInput`. No MDS twin exists yet; built to match shadcn/ui's\nreference `InputOTP` / `InputOTPGroup` / `InputOTPSlot` / `InputOTPSeparator`\nAPI. `input-otp` exposes state via the `OTPInputContext` React Context\n(not a `useOTPInputContext` hook — verified against the package's own\n`dist/index.d.ts`), consumed here with `React.useContext`.",methods:[],displayName:`InputOTP`},z.__docgenInfo={description:``,methods:[],displayName:`InputOTPGroup`},B.__docgenInfo={description:``,methods:[],displayName:`InputOTPSlot`,props:{index:{required:!0,tsType:{name:`number`},description:"Zero-based position in the code — reads its character and active/caret state from the parent `OTPInputContext`, not from props directly."}}},V.__docgenInfo={description:``,methods:[],displayName:`InputOTPSeparator`}})))()}var U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=t((()=>{U=n(),F(),H(),W=r(),G={title:`Components/InputOTP`,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`Segmented input for one-time codes, PINs, and verification digits.`}}}},K={render:()=>(0,W.jsx)(R,{maxLength:6,children:(0,W.jsxs)(z,{children:[(0,W.jsx)(B,{index:0}),(0,W.jsx)(B,{index:1}),(0,W.jsx)(B,{index:2}),(0,W.jsx)(B,{index:3}),(0,W.jsx)(B,{index:4}),(0,W.jsx)(B,{index:5})]})})},q={render:()=>(0,W.jsxs)(R,{maxLength:6,pattern:P,children:[(0,W.jsxs)(z,{children:[(0,W.jsx)(B,{index:0}),(0,W.jsx)(B,{index:1}),(0,W.jsx)(B,{index:2})]}),(0,W.jsx)(V,{}),(0,W.jsxs)(z,{children:[(0,W.jsx)(B,{index:3}),(0,W.jsx)(B,{index:4}),(0,W.jsx)(B,{index:5})]})]})},J={render:()=>(0,W.jsx)(R,{maxLength:4,pattern:P,children:(0,W.jsxs)(z,{children:[(0,W.jsx)(B,{index:0}),(0,W.jsx)(B,{index:1}),(0,W.jsx)(B,{index:2}),(0,W.jsx)(B,{index:3})]})})},Y={render:()=>(0,W.jsxs)(R,{maxLength:6,disabled:!0,defaultValue:`123`,children:[(0,W.jsxs)(z,{children:[(0,W.jsx)(B,{index:0}),(0,W.jsx)(B,{index:1}),(0,W.jsx)(B,{index:2})]}),(0,W.jsx)(V,{}),(0,W.jsxs)(z,{children:[(0,W.jsx)(B,{index:3}),(0,W.jsx)(B,{index:4}),(0,W.jsx)(B,{index:5})]})]})},X={render:()=>{let[e,t]=(0,U.useState)(``),[n,r]=(0,U.useState)(`idle`);return(0,W.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,W.jsxs)(R,{maxLength:6,pattern:P,value:e,onChange:e=>{t(e),r(`idle`)},onComplete:()=>r(`complete`),children:[(0,W.jsxs)(z,{children:[(0,W.jsx)(B,{index:0}),(0,W.jsx)(B,{index:1}),(0,W.jsx)(B,{index:2})]}),(0,W.jsx)(V,{}),(0,W.jsxs)(z,{children:[(0,W.jsx)(B,{index:3}),(0,W.jsx)(B,{index:4}),(0,W.jsx)(B,{index:5})]})]}),(0,W.jsx)(`p`,{className:`text-xs opacity-60`,children:n===`complete`?`Code verified`:`${e.length}/6 digits entered`})]})}},Z=[`Default`,`TwoFactorCode`,`FourDigitPin`,`Disabled`,`ControlledWithCompletion`],K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source},description:{story:`A 6-digit two-factor authentication code entry, split 3-3 with a visual
separator — a common real-world OTP layout.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
}`,...X.parameters?.docs?.source},description:{story:`Controlled example showing the entered value echoed back, and a
completion callback firing once all digits are filled — the shape used
for a real verify-code flow guarding a policy document download.`,...X.parameters?.docs?.description}}}})))()}Q();export{X as ControlledWithCompletion,K as Default,Y as Disabled,J as FourDigitPin,q as TwoFactorCode,Z as __namedExportsOrder,G as default};