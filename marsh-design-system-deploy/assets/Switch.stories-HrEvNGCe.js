import{j as e,r as n}from"./iframe-B7__wHsY.js";import{g as l}from"./roles-DDzdIcSm.js";import{S as M}from"./Switch-BF6-uM9E.js";import{F as L}from"./FormControlLabel-cucsLgUh.js";import{S as P}from"./Stack-eFt3eo5g.js";import"./preload-helper-PPVm8Dsz.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./memoTheme-DLuuOUa1.js";import"./styled-D_MMOKXd.js";import"./generateUtilityClasses-CoM_PQv9.js";import"./useSlot-BhRWapFU.js";import"./mergeSlotProps-ylSDTTjz.js";import"./useForkRef-jYvpDqFw.js";import"./useFormControl-ywqeIzOr.js";import"./useControlled-BJ55XI38.js";import"./ButtonBase-H0aG7E_M.js";import"./useTimeout-BMcW_4Fv.js";import"./useEventCallback-CFw1AcSY.js";import"./isFocusVisible-B8k4qzLc.js";import"./Typography-CuZGjVfN.js";const t=({label:a,tone:s="default",labelPlacement:r="end",sx:c,...i})=>{const d=s==="danger"?l("interactive.danger"):l("interactive.primary"),x=l("border.default"),D=l("text.primary"),u=e.jsx(M,{sx:{"& .MuiSwitch-switchBase":{color:l("surface.default"),"&:hover":{backgroundColor:"transparent"},"&.Mui-checked":{color:d,"&:hover":{backgroundColor:"transparent"},"& + .MuiSwitch-track":{backgroundColor:d,opacity:1}},"&.Mui-disabled":{opacity:.5}},"& .MuiSwitch-track":{backgroundColor:x,opacity:1},"& .MuiSwitch-thumb":{boxShadow:"0 2px 4px rgba(0,0,0,0.2)"},...c},...i});return a?e.jsx(L,{control:u,label:a,labelPlacement:r,sx:{color:D,fontFamily:"var(--typo-body-font-family)","& .MuiFormControlLabel-label":{fontSize:"var(--typo-body-font-size)",lineHeight:"var(--typo-body-line-height)"}}}):u};t.__docgenInfo={description:`Design System Switch component built on MUI Switch.
- Uses role-based colors via getRoleColor
- Toggle control for on/off states`,methods:[],displayName:"DSSwitch",props:{tone:{defaultValue:{value:"'default'",computed:!1},required:!1},labelPlacement:{defaultValue:{value:"'end'",computed:!1},required:!1}}};const Q={title:"Components/Switch",component:t,parameters:{layout:"centered",docs:{description:{component:"Design System Switch built on MUI. Toggle control for on/off states with role-based colors."}}},argTypes:{tone:{control:"radio",options:["default","danger"]},disabled:{control:"boolean"},checked:{control:"boolean"},labelPlacement:{control:"radio",options:["end","start","top","bottom"]}}},h={args:{label:"Enable Notifications"}},m={args:{label:"Enabled Feature",checked:!0}},p={args:{label:"Disabled Switch",disabled:!0}},g={args:{label:"Disabled & On",disabled:!0,checked:!0}},b={args:{label:"Delete on Exit",tone:"danger",checked:!0}},S={args:{checked:!1}},k={args:{label:"Label on Left",labelPlacement:"start",checked:!0}},f={args:{label:"Label on Top",labelPlacement:"top"}},C={args:{label:"Label on Bottom",labelPlacement:"bottom",checked:!0}},y={render:()=>{const[a,s]=n.useState(!0),[r,c]=n.useState(!1),[i,d]=n.useState(!0),[x,D]=n.useState(!1),[u,v]=n.useState(!0);return e.jsxs(P,{spacing:2,sx:{width:400},children:[e.jsx(t,{label:"Email Notifications",checked:a,onChange:o=>s(o.target.checked)}),e.jsx(t,{label:"Dark Mode",checked:r,onChange:o=>c(o.target.checked)}),e.jsx(t,{label:"Auto-Save",checked:i,onChange:o=>d(o.target.checked)}),e.jsx(t,{label:"Public Profile",checked:x,onChange:o=>D(o.target.checked)}),e.jsx(t,{label:"Two-Factor Authentication",checked:u,onChange:o=>v(o.target.checked)})]})}},w={render:()=>{const[a,s]=n.useState({notifications:!0,autoUpdate:!1,analytics:!0,marketing:!1}),r=c=>i=>{s({...a,[c]:i.target.checked})};return e.jsxs(P,{spacing:3,sx:{width:400,p:3,bgcolor:"background.paper",borderRadius:2},children:[e.jsx("h3",{style:{margin:0,fontFamily:"var(--typo-h4-font-family)"},children:"Privacy Settings"}),e.jsxs(P,{spacing:2,children:[e.jsx(t,{label:"Push Notifications",checked:a.notifications,onChange:r("notifications")}),e.jsx(t,{label:"Automatic Updates",checked:a.autoUpdate,onChange:r("autoUpdate")}),e.jsx(t,{label:"Usage Analytics",checked:a.analytics,onChange:r("analytics")}),e.jsx(t,{label:"Marketing Communications",checked:a.marketing,onChange:r("marketing"),tone:"danger"})]})]})}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Enable Notifications'
  }
}`,...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Enabled Feature',
    checked: true
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Switch',
    disabled: true
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled & On',
    disabled: true,
    checked: true
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Delete on Exit',
    tone: 'danger',
    checked: true
  }
}`,...b.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false
  }
}`,...S.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label on Left',
    labelPlacement: 'start',
    checked: true
  }
}`,...k.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label on Top',
    labelPlacement: 'top'
  }
}`,...f.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label on Bottom',
    labelPlacement: 'bottom',
    checked: true
  }
}`,...C.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);
    const [publicProfile, setPublicProfile] = useState(false);
    const [twoFactor, setTwoFactor] = useState(true);
    return <Stack spacing={2} sx={{
      width: 400
    }}>
        <DSSwitch label="Email Notifications" checked={notifications} onChange={e => setNotifications(e.target.checked)} />
        
        <DSSwitch label="Dark Mode" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} />
        
        <DSSwitch label="Auto-Save" checked={autoSave} onChange={e => setAutoSave(e.target.checked)} />
        
        <DSSwitch label="Public Profile" checked={publicProfile} onChange={e => setPublicProfile(e.target.checked)} />
        
        <DSSwitch label="Two-Factor Authentication" checked={twoFactor} onChange={e => setTwoFactor(e.target.checked)} />
      </Stack>;
  }
}`,...y.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      autoUpdate: false,
      analytics: true,
      marketing: false
    });
    const handleChange = (key: keyof typeof settings) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({
        ...settings,
        [key]: event.target.checked
      });
    };
    return <Stack spacing={3} sx={{
      width: 400,
      p: 3,
      bgcolor: 'background.paper',
      borderRadius: 2
    }}>
        <h3 style={{
        margin: 0,
        fontFamily: 'var(--typo-h4-font-family)'
      }}>Privacy Settings</h3>
        
        <Stack spacing={2}>
          <DSSwitch label="Push Notifications" checked={settings.notifications} onChange={handleChange('notifications')} />
          
          <DSSwitch label="Automatic Updates" checked={settings.autoUpdate} onChange={handleChange('autoUpdate')} />
          
          <DSSwitch label="Usage Analytics" checked={settings.analytics} onChange={handleChange('analytics')} />
          
          <DSSwitch label="Marketing Communications" checked={settings.marketing} onChange={handleChange('marketing')} tone="danger" />
        </Stack>
      </Stack>;
  }
}`,...w.parameters?.docs?.source}}};const X=["Default","Checked","Disabled","DisabledChecked","DangerTone","WithoutLabel","LabelStart","LabelTop","LabelBottom","FormExample","SettingsPanel"];export{m as Checked,b as DangerTone,h as Default,p as Disabled,g as DisabledChecked,y as FormExample,C as LabelBottom,k as LabelStart,f as LabelTop,w as SettingsPanel,S as WithoutLabel,X as __namedExportsOrder,Q as default};
