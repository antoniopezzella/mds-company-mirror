import{Z as e,N as s,a5 as T}from"./iframe-CPBTUrEW.js";import{S as z}from"./Snackbar-BHdLdFG5.js";import{A as B}from"./Alert-DuaD7QSx.js";import{S as j}from"./Stack-DNM9s3rh.js";import{B as m}from"./Button-C7hKXtr1.js";import"./preload-helper-PPVm8Dsz.js";import"./useTimeout-BkF-taVW.js";import"./useEventCallback-BK5EjOzt.js";import"./mergeSlotProps-Cno6lv60.js";import"./useTheme-Cup9dysz.js";import"./styled-CijOp1BY.js";import"./memoTheme-BVzAl7br.js";import"./useSlot-BywkIHtH.js";import"./useForkRef-DKrbSgSS.js";import"./ClickAwayListener-WMGvOvSV.js";import"./getReactElementRef-Bahq-dSU.js";import"./ownerDocument-DW-IO8s5.js";import"./contains-DSD8CO72.js";import"./Paper-Bmrvw56W.js";import"./Grow-CYCTsW1o.js";import"./utils-cV9QVv0b.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./createSvgIcon-sccWia23.js";import"./SvgIcon-B0F0eofH.js";import"./Close-k1Kvucqx.js";import"./IconButton-h7CcnQ9M.js";import"./ButtonBase-bvGWYjN8.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-CvjKlzvo.js";import"./getThemeProps-D9sgPYYa.js";import"./useThemeProps-Cv2CqOcg.js";const C=({severity:n="info",message:t,actionText:c,onAction:l,autoHideDuration:u=6e3,vertical:a="bottom",horizontal:r="center",onClose:p,...A})=>{const i=(()=>{switch(n){case"success":return{fg:s("status.success.fg"),bg:s("status.success.bg")};case"error":return{fg:s("status.danger.fg"),bg:s("status.danger.bg")};case"warning":return{fg:s("text.onLight"),bg:s("status.warning.bg")};default:return{fg:s("text.primary"),bg:s("surface.subtle")}}})();return e.jsx(z,{anchorOrigin:{vertical:a,horizontal:r},autoHideDuration:u,onClose:p,...A,children:e.jsx(B,{onClose:p,severity:n,action:c&&l?e.jsx("button",{onClick:l,style:{background:"none",border:"none",color:i.fg,cursor:"pointer",fontFamily:"var(--typo-button-font-family)",fontWeight:600,textTransform:"uppercase",fontSize:14,padding:"6px 8px"},children:c}):void 0,sx:{width:"100%",color:i.fg,backgroundColor:i.bg,fontFamily:"var(--typo-body-font-family)",fontSize:"var(--typo-body-font-size)",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)","& .MuiAlert-icon":{color:i.fg},"& .MuiAlert-action .MuiIconButton-root":{color:i.fg}},children:t})})};C.__docgenInfo={description:`Design System Snackbar/Toast notification component built on MUI.
- Uses role-based colors via getRoleColor
- Supports success, error, warning, info severities
- Auto-dismiss with customizable duration`,methods:[],displayName:"DSSnackbar",props:{severity:{required:!1,tsType:{name:"union",raw:"'success' | 'error' | 'warning' | 'info'",elements:[{name:"literal",value:"'success'"},{name:"literal",value:"'error'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'info'"}]},description:"Severity/type of the notification",defaultValue:{value:"'info'",computed:!1}},message:{required:!0,tsType:{name:"string"},description:"Message to display"},actionText:{required:!1,tsType:{name:"string"},description:"Action button text (optional)"},onAction:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Action button callback"},autoHideDuration:{required:!1,tsType:{name:"number"},description:"Auto-hide duration in milliseconds (default 6000)",defaultValue:{value:"6000",computed:!1}},vertical:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"}]},description:"Vertical position",defaultValue:{value:"'bottom'",computed:!1}},horizontal:{required:!1,tsType:{name:"union",raw:"'left' | 'center' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'center'"},{name:"literal",value:"'right'"}]},description:"Horizontal position",defaultValue:{value:"'center'",computed:!1}}},composes:["Omit"]};const ue={title:"Legacy (MUI)/Snackbar",component:C,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"**Legacy (MUI).** Not the canonical Snackbar — new work should use `Toast` from `@/components/ui/toast`. Kept because code still imports this one; its stories are also its only test coverage, so they stay rather than being hidden. Brief notification message that appears at screen edge. Use for non-critical feedback with optional actions."}}},argTypes:{severity:{control:"radio",options:["success","error","warning","info"]},vertical:{control:"radio",options:["top","bottom"]},horizontal:{control:"radio",options:["left","center","right"]},autoHideDuration:{control:"number"}},args:{open:!0,message:"This is a notification message",severity:"info",vertical:"bottom",horizontal:"center",autoHideDuration:6e3}},g={args:{severity:"info",message:"This is an informational message"}},d={args:{severity:"info",message:"Operation completed successfully!",horizontal:"right",actionText:`test
`}},f={args:{severity:"warning",message:"Warning: Please review your input"}},h={args:{severity:"error",message:"Error: Something went wrong"}},v={args:{severity:"success",message:"File uploaded successfully",actionText:"VIEW",onAction:()=>alert("Action clicked!")}},y={args:{severity:"info",message:"Notification at top center",vertical:"top",horizontal:"center"}},S={args:{severity:"success",message:"Notification at top right",vertical:"top",horizontal:"right"}},w={args:{severity:"warning",message:"Notification at bottom left",vertical:"bottom",horizontal:"left"}},b={args:{severity:"info",message:"This will stay for 10 seconds",autoHideDuration:1e4}},k={render:()=>{const[n,t]=T.useState(!1),[c,l]=T.useState(""),[u,a]=T.useState("info"),r=(o,W)=>{a(W),l(o),t(!0)},p=o=>r(o,"success"),A=o=>r(o,"error"),E=o=>r(o,"warning"),i=o=>r(o,"info"),I=()=>t(!1);return e.jsxs(j,{spacing:2,children:[e.jsx(m,{variant:"contained",color:"success",onClick:()=>p("Operation successful!"),children:"Show Success"}),e.jsx(m,{variant:"contained",color:"error",onClick:()=>A("An error occurred!"),children:"Show Error"}),e.jsx(m,{variant:"contained",color:"warning",onClick:()=>E("Warning message!"),children:"Show Warning"}),e.jsx(m,{variant:"contained",color:"info",onClick:()=>i("Information message!"),children:"Show Info"}),e.jsx(C,{open:n,message:c,severity:u,onClose:I})]})}},x={render:()=>{const[n,t]=T.useState({open:!1,message:"",severity:"info"}),c=(a,r)=>{t({open:!0,message:a,severity:r})},l=()=>{t(a=>({...a,open:!1}))},u=()=>{c("File uploaded successfully","success")};return e.jsxs(e.Fragment,{children:[e.jsx(m,{variant:"contained",onClick:u,children:"Upload File"}),e.jsx(C,{open:n.open,message:n.message,severity:n.severity,onClose:l,actionText:"VIEW",onAction:()=>alert("Viewing file...")})]})}},me=["Info","Success","Warning","Error","WithAction","TopCenter","TopRight","BottomLeft","LongDuration","InteractiveExample","WithActionExample"];g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    message: 'This is an informational message'
  }
}`,...g.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    severity: "info",
    message: 'Operation completed successfully!',
    horizontal: "right",
    actionText: "test\\n"
  }
}`,...d.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    message: 'Warning: Please review your input'
  }
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'error',
    message: 'Error: Something went wrong'
  }
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    message: 'File uploaded successfully',
    actionText: 'VIEW',
    onAction: () => alert('Action clicked!')
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    message: 'Notification at top center',
    vertical: 'top',
    horizontal: 'center'
  }
}`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    message: 'Notification at top right',
    vertical: 'top',
    horizontal: 'right'
  }
}`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    message: 'Notification at bottom left',
    vertical: 'bottom',
    horizontal: 'left'
  }
}`,...w.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    message: 'This will stay for 10 seconds',
    autoHideDuration: 10000
  }
}`,...b.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const show = (msg: string, sev: 'success' | 'error' | 'warning' | 'info') => {
      setSeverity(sev);
      setMessage(msg);
      setOpen(true);
    };
    const showSuccess = (msg: string) => show(msg, 'success');
    const showError = (msg: string) => show(msg, 'error');
    const showWarning = (msg: string) => show(msg, 'warning');
    const showInfo = (msg: string) => show(msg, 'info');
    const hideSnackbar = () => setOpen(false);
    return <Stack spacing={2}>
        <Button variant="contained" color="success" onClick={() => showSuccess('Operation successful!')}>
          Show Success
        </Button>
        <Button variant="contained" color="error" onClick={() => showError('An error occurred!')}>
          Show Error
        </Button>
        <Button variant="contained" color="warning" onClick={() => showWarning('Warning message!')}>
          Show Warning
        </Button>
        <Button variant="contained" color="info" onClick={() => showInfo('Information message!')}>
          Show Info
        </Button>

        <DSSnackbar open={open} message={message} severity={severity} onClose={hideSnackbar} />
      </Stack>;
  }
}`,...k.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'info' as 'success' | 'error' | 'warning' | 'info'
    });
    const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
      setSnackbar({
        open: true,
        message,
        severity
      });
    };
    const hideSnackbar = () => {
      setSnackbar(prev => ({
        ...prev,
        open: false
      }));
    };
    const handleUpload = () => {
      showSnackbar('File uploaded successfully', 'success');
    };
    return <>
        <Button variant="contained" onClick={handleUpload}>
          Upload File
        </Button>

        <DSSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={hideSnackbar} actionText="VIEW" onAction={() => alert('Viewing file...')} />
      </>;
  }
}`,...x.parameters?.docs?.source}}};export{w as BottomLeft,h as Error,g as Info,k as InteractiveExample,b as LongDuration,d as Success,y as TopCenter,S as TopRight,f as Warning,v as WithAction,x as WithActionExample,me as __namedExportsOrder,ue as default};
