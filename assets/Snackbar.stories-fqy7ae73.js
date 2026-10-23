import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Stack-DKSlLpCQ.js";import{n as a,t as o}from"./roles-DNqHlq35.js";import{n as s,t as c}from"./Button-BlA5xY0Z.js";import{n as l,t as u}from"./Alert-CLBLYgyt.js";import{n as d,t as f}from"./Snackbar-CPSXbsqZ.js";var p,m;function h(){return(h=e((()=>{t(),d(),l(),a(),p=n(),m=({severity:e=`info`,message:t,actionText:n,onAction:r,autoHideDuration:i=6e3,vertical:a=`bottom`,horizontal:s=`center`,onClose:c,...l})=>{let d=(()=>{switch(e){case`success`:return{fg:o(`fg.success`),bg:o(`bg.success.subtle`)};case`error`:return{fg:o(`fg.critical`),bg:o(`bg.critical.subtle`)};case`warning`:return{fg:o(`fg.on-light`),bg:o(`bg.warning.subtle`)};default:return{fg:o(`fg.primary`),bg:o(`bg.neutral.subtle`)}}})();return(0,p.jsx)(f,{anchorOrigin:{vertical:a,horizontal:s},autoHideDuration:i,onClose:c,...l,children:(0,p.jsx)(u,{onClose:c,severity:e,action:n&&r?(0,p.jsx)(`button`,{onClick:r,style:{background:`none`,border:`none`,color:d.fg,cursor:`pointer`,fontFamily:`var(--typo-button-font-family)`,fontWeight:600,textTransform:`uppercase`,fontSize:14,padding:`6px 8px`},children:n}):void 0,sx:{width:`100%`,color:d.fg,backgroundColor:d.bg,fontFamily:`var(--typo-body-font-family)`,fontSize:`var(--typo-body-font-size)`,borderRadius:`8px`,boxShadow:`0 4px 12px rgba(0,0,0,0.15)`,"& .MuiAlert-icon":{color:d.fg},"& .MuiAlert-action .MuiIconButton-root":{color:d.fg}},children:t})})},m.__docgenInfo={description:`Design System Snackbar/Toast notification component built on MUI.
- Uses role-based colors via getRoleColor
- Supports success, error, warning, info severities
- Auto-dismiss with customizable duration`,methods:[],displayName:`DSSnackbar`,props:{severity:{required:!1,tsType:{name:`union`,raw:`'success' | 'error' | 'warning' | 'info'`,elements:[{name:`literal`,value:`'success'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'info'`}]},description:`Severity/type of the notification`,defaultValue:{value:`'info'`,computed:!1}},message:{required:!0,tsType:{name:`string`},description:`Message to display`},actionText:{required:!1,tsType:{name:`string`},description:`Action button text (optional)`},onAction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Action button callback`},autoHideDuration:{required:!1,tsType:{name:`number`},description:`Auto-hide duration in milliseconds (default 6000)`,defaultValue:{value:`6000`,computed:!1}},vertical:{required:!1,tsType:{name:`union`,raw:`'top' | 'bottom'`,elements:[{name:`literal`,value:`'top'`},{name:`literal`,value:`'bottom'`}]},description:`Vertical position`,defaultValue:{value:`'bottom'`,computed:!1}},horizontal:{required:!1,tsType:{name:`union`,raw:`'left' | 'center' | 'right'`,elements:[{name:`literal`,value:`'left'`},{name:`literal`,value:`'center'`},{name:`literal`,value:`'right'`}]},description:`Horizontal position`,defaultValue:{value:`'center'`,computed:!1}}},composes:[`Omit`]}})))()}var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{g=t(),h(),s(),r(),a(),_=n(),v={title:`Legacy (MUI)/Snackbar`,component:m,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"**Legacy (MUI).** Not the canonical Snackbar — new work should use `Toast` from `@/components/ui/toast`. Kept because code still imports this one; its stories are also its only test coverage, so they stay rather than being hidden. Brief notification message that appears at screen edge. Use for non-critical feedback with optional actions."}}},argTypes:{severity:{control:`radio`,options:[`success`,`error`,`warning`,`info`]},vertical:{control:`radio`,options:[`top`,`bottom`]},horizontal:{control:`radio`,options:[`left`,`center`,`right`]},autoHideDuration:{control:`number`}},args:{open:!0,message:`This is a notification message`,severity:`info`,vertical:`bottom`,horizontal:`center`,autoHideDuration:6e3}},y={args:{severity:`info`,message:`This is an informational message`}},b={args:{severity:`info`,message:`Operation completed successfully!`,horizontal:`right`,actionText:`test
`}},x={args:{severity:`warning`,message:`Warning: Please review your input`}},S={args:{severity:`error`,message:`Error: Something went wrong`}},C={args:{severity:`success`,message:`File uploaded successfully`,actionText:`VIEW`,onAction:()=>alert(`Action clicked!`)}},w={args:{severity:`info`,message:`Notification at top center`,vertical:`top`,horizontal:`center`}},T={args:{severity:`success`,message:`Notification at top right`,vertical:`top`,horizontal:`right`}},E={args:{severity:`warning`,message:`Notification at bottom left`,vertical:`bottom`,horizontal:`left`}},D={args:{severity:`info`,message:`This will stay for 10 seconds`,autoHideDuration:1e4}},O={render:()=>{let[e,t]=(0,g.useState)(!1),[n,r]=(0,g.useState)(``),[a,s]=(0,g.useState)(`info`),l=(e,n)=>{s(n),r(e),t(!0)},u=e=>l(e,`success`),d=e=>l(e,`error`),f=e=>l(e,`warning`),p=e=>l(e,`info`);return(0,_.jsxs)(i,{spacing:2,children:[(0,_.jsx)(c,{variant:`contained`,color:`success`,onClick:()=>u(`Operation successful!`),children:`Show Success`}),(0,_.jsx)(c,{variant:`contained`,color:`error`,onClick:()=>d(`An error occurred!`),children:`Show Error`}),(0,_.jsx)(c,{variant:`contained`,onClick:()=>f(`Warning message!`),sx:{backgroundColor:o(`bg.warning.subtle`),color:o(`fg.on-light`),"&:hover":{backgroundColor:o(`bg.warning.subtle`)}},children:`Show Warning`}),(0,_.jsx)(c,{variant:`contained`,color:`info`,onClick:()=>p(`Information message!`),children:`Show Info`}),(0,_.jsx)(m,{open:e,message:n,severity:a,onClose:()=>t(!1)})]})}},k={render:()=>{let[e,t]=(0,g.useState)({open:!1,message:``,severity:`info`}),n=(e,n)=>{t({open:!0,message:e,severity:n})};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(c,{variant:`contained`,onClick:()=>{n(`File uploaded successfully`,`success`)},children:`Upload File`}),(0,_.jsx)(m,{open:e.open,message:e.message,severity:e.severity,onClose:()=>{t(e=>({...e,open:!1}))},actionText:`VIEW`,onAction:()=>alert(`Viewing file...`)})]})}},A=[`Info`,`Success`,`Warning`,`Error`,`WithAction`,`TopCenter`,`TopRight`,`BottomLeft`,`LongDuration`,`InteractiveExample`,`WithActionExample`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    message: 'This is an informational message'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    severity: "info",
    message: 'Operation completed successfully!',
    horizontal: "right",
    actionText: "test\\n"
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    message: 'Warning: Please review your input'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'error',
    message: 'Error: Something went wrong'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    message: 'File uploaded successfully',
    actionText: 'VIEW',
    onAction: () => alert('Action clicked!')
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    message: 'Notification at top center',
    vertical: 'top',
    horizontal: 'center'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    message: 'Notification at top right',
    vertical: 'top',
    horizontal: 'right'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    message: 'Notification at bottom left',
    vertical: 'bottom',
    horizontal: 'left'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    message: 'This will stay for 10 seconds',
    autoHideDuration: 10000
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
        {/* MUI's default \`color="warning"\` is white on #ed6c02 = 3.98:1 (fails AA).
            White on the DS warning (#c25600) is still only 4.29:1, so warning takes
            the system's dark-text-on-pale pattern instead — the same treatment the
            Snackbar itself uses for the warning severity. */}
        <Button variant="contained" onClick={() => showWarning('Warning message!')} sx={{
        backgroundColor: getRoleColor('bg.warning.subtle'),
        color: getRoleColor('fg.on-light'),
        '&:hover': {
          backgroundColor: getRoleColor('bg.warning.subtle')
        }
      }}>
          Show Warning
        </Button>
        <Button variant="contained" color="info" onClick={() => showInfo('Information message!')}>
          Show Info
        </Button>

        <DSSnackbar open={open} message={message} severity={severity} onClose={hideSnackbar} />
      </Stack>;
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}}})))()}j();export{E as BottomLeft,S as Error,y as Info,O as InteractiveExample,D as LongDuration,b as Success,w as TopCenter,T as TopRight,x as Warning,C as WithAction,k as WithActionExample,A as __namedExportsOrder,v as default};