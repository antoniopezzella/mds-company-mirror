import{j as r,r as W}from"./iframe-B7__wHsY.js";import{g as t}from"./roles-DDzdIcSm.js";import{S as I}from"./Snackbar-DndMN-rY.js";import{A}from"./Alert-DN1elm6Z.js";import{S as T}from"./Stack-eFt3eo5g.js";import{B as l}from"./Button-zrpDzD2P.js";import"./preload-helper-PPVm8Dsz.js";import"./useTimeout-BMcW_4Fv.js";import"./useEventCallback-CFw1AcSY.js";import"./mergeSlotProps-ylSDTTjz.js";import"./useTheme-CSj_Q00S.js";import"./styled-D_MMOKXd.js";import"./memoTheme-DLuuOUa1.js";import"./generateUtilityClasses-CoM_PQv9.js";import"./useSlot-BhRWapFU.js";import"./useForkRef-jYvpDqFw.js";import"./getReactElementRef-BSyJ60__.js";import"./ownerDocument-DW-IO8s5.js";import"./Paper-CIHAuA3e.js";import"./Grow-CjO2AY3x.js";import"./utils-C_qPr39N.js";import"./index-CYaVcYGU.js";import"./index-DcJJ25tP.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./createSvgIcon-DOVj1Oe1.js";import"./SvgIcon-BoXwKfVN.js";import"./Close-BWQq1yq8.js";import"./IconButton-CPcl-lVA.js";import"./ButtonBase-H0aG7E_M.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-buLdZGSf.js";const y=({severity:o="info",message:a,actionText:s,onAction:n,autoHideDuration:e=6e3,vertical:i="bottom",horizontal:C="center",onClose:k,...E})=>{const c=(()=>{switch(o){case"success":return{fg:t("status.success.fg"),bg:t("status.success.bg")};case"error":return{fg:t("status.danger.fg"),bg:t("status.danger.bg")};case"warning":return{fg:t("status.warning.fg"),bg:t("status.warning.bg")};default:return{fg:t("text.primary"),bg:t("surface.subtle")}}})();return r.jsx(I,{anchorOrigin:{vertical:i,horizontal:C},autoHideDuration:e,onClose:k,...E,children:r.jsx(A,{onClose:k,severity:o,action:s&&n?r.jsx("button",{onClick:n,style:{background:"none",border:"none",color:c.fg,cursor:"pointer",fontFamily:"var(--typo-button-font-family)",fontWeight:600,textTransform:"uppercase",fontSize:14,padding:"6px 8px"},children:s}):void 0,sx:{width:"100%",color:c.fg,backgroundColor:c.bg,fontFamily:"var(--typo-body-font-family)",fontSize:"var(--typo-body-font-size)",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)","& .MuiAlert-icon":{color:c.fg},"& .MuiAlert-action .MuiIconButton-root":{color:c.fg}},children:a})})};function x(){const[o,a]=W.useState({open:!1,message:"",severity:"info"}),s=(e,i="info")=>{a({open:!0,message:e,severity:i})};return{snackbar:o,showSnackbar:s,hideSnackbar:()=>{a(e=>({...e,open:!1}))},showSuccess:e=>s(e,"success"),showError:e=>s(e,"error"),showWarning:e=>s(e,"warning"),showInfo:e=>s(e,"info")}}y.__docgenInfo={description:`Design System Snackbar/Toast notification component built on MUI.
- Uses role-based colors via getRoleColor
- Supports success, error, warning, info severities
- Auto-dismiss with customizable duration`,methods:[],displayName:"DSSnackbar",props:{severity:{defaultValue:{value:"'info'",computed:!1},required:!1},autoHideDuration:{defaultValue:{value:"6000",computed:!1},required:!1},vertical:{defaultValue:{value:"'bottom'",computed:!1},required:!1},horizontal:{defaultValue:{value:"'center'",computed:!1},required:!1}}};const ce={title:"Components/Snackbar",component:y,parameters:{layout:"centered",docs:{description:{component:"Design System Snackbar/Toast notification built on MUI. Supports auto-dismiss with customizable duration and position."}}},argTypes:{severity:{control:"radio",options:["success","error","warning","info"]},vertical:{control:"radio",options:["top","bottom"]},horizontal:{control:"radio",options:["left","center","right"]},autoHideDuration:{control:"number"}},args:{open:!0,message:"This is a notification message",severity:"info",vertical:"bottom",horizontal:"center",autoHideDuration:6e3}},u={args:{severity:"info",message:"This is an informational message"}},m={args:{severity:"success",message:"Operation completed successfully!"}},p={args:{severity:"warning",message:"Warning: Please review your input"}},g={args:{severity:"error",message:"Error: Something went wrong"}},d={args:{severity:"success",message:"File uploaded successfully",actionText:"VIEW",onAction:()=>alert("Action clicked!")}},f={args:{severity:"info",message:"Notification at top center",vertical:"top",horizontal:"center"}},h={args:{severity:"success",message:"Notification at top right",vertical:"top",horizontal:"right"}},S={args:{severity:"warning",message:"Notification at bottom left",vertical:"bottom",horizontal:"left"}},b={args:{severity:"info",message:"This will stay for 10 seconds",autoHideDuration:1e4}},v={render:()=>{const{snackbar:o,hideSnackbar:a,showSuccess:s,showError:n,showWarning:e,showInfo:i}=x();return r.jsxs(T,{spacing:2,children:[r.jsx(l,{variant:"contained",color:"success",onClick:()=>s("Operation successful!"),children:"Show Success"}),r.jsx(l,{variant:"contained",color:"error",onClick:()=>n("An error occurred!"),children:"Show Error"}),r.jsx(l,{variant:"contained",color:"warning",onClick:()=>e("Warning message!"),children:"Show Warning"}),r.jsx(l,{variant:"contained",color:"info",onClick:()=>i("Information message!"),children:"Show Info"}),r.jsx(y,{open:o.open,message:o.message,severity:o.severity,onClose:a})]})}},w={render:()=>{const{snackbar:o,hideSnackbar:a,showSnackbar:s}=x(),n=()=>{s("File uploaded successfully","success")};return r.jsxs(r.Fragment,{children:[r.jsx(l,{variant:"contained",onClick:n,children:"Upload File"}),r.jsx(y,{open:o.open,message:o.message,severity:o.severity,onClose:a,actionText:"VIEW",onAction:()=>alert("Viewing file...")})]})}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    message: 'This is an informational message'
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    message: 'Operation completed successfully!'
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    message: 'Warning: Please review your input'
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'error',
    message: 'Error: Something went wrong'
  }
}`,...g.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    message: 'File uploaded successfully',
    actionText: 'VIEW',
    onAction: () => alert('Action clicked!')
  }
}`,...d.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    message: 'Notification at top center',
    vertical: 'top',
    horizontal: 'center'
  }
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    message: 'Notification at top right',
    vertical: 'top',
    horizontal: 'right'
  }
}`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    message: 'Notification at bottom left',
    vertical: 'bottom',
    horizontal: 'left'
  }
}`,...S.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    message: 'This will stay for 10 seconds',
    autoHideDuration: 10000
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      snackbar,
      hideSnackbar,
      showSuccess,
      showError,
      showWarning,
      showInfo
    } = useSnackbar();
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

        <DSSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={hideSnackbar} />
      </Stack>;
  }
}`,...v.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      snackbar,
      hideSnackbar,
      showSnackbar
    } = useSnackbar();
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
}`,...w.parameters?.docs?.source}}};const le=["Info","Success","Warning","Error","WithAction","TopCenter","TopRight","BottomLeft","LongDuration","InteractiveExample","WithActionExample"];export{S as BottomLeft,g as Error,u as Info,v as InteractiveExample,b as LongDuration,m as Success,f as TopCenter,h as TopRight,p as Warning,d as WithAction,w as WithActionExample,le as __namedExportsOrder,ce as default};
