import{j as e,r as c}from"./iframe-B7__wHsY.js";import{g as u}from"./roles-DDzdIcSm.js";import{C as M}from"./CircularProgress-buLdZGSf.js";import{L as T}from"./LinearProgress-ByL1qy6i.js";import{B as a}from"./Box-O8CNm5l6.js";import{T as m}from"./Typography-CuZGjVfN.js";import{S as w}from"./Stack-eFt3eo5g.js";import"./preload-helper-PPVm8Dsz.js";import"./memoTheme-DLuuOUa1.js";import"./styled-D_MMOKXd.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./generateUtilityClasses-CoM_PQv9.js";const b=({size:r=40,tone:t="default",sx:n,...s})=>{const d=t==="danger"?u("interactive.danger"):t==="success"?u("status.success.fg"):u("interactive.primary");return e.jsx(M,{size:r,sx:{color:d,...n},...s})},o=({tone:r="default",sx:t,...n})=>{const s=r==="danger"?u("interactive.danger"):r==="success"?u("status.success.fg"):u("interactive.primary"),d=u("surface.subtle");return e.jsx(T,{sx:{backgroundColor:d,"& .MuiLinearProgress-bar":{backgroundColor:s},...t},...n})};b.__docgenInfo={description:`Design System Circular Progress component built on MUI.
- Uses role-based colors via getRoleColor
- Supports determinate and indeterminate modes`,methods:[],displayName:"DSCircularProgress",props:{size:{defaultValue:{value:"40",computed:!1},required:!1},tone:{defaultValue:{value:"'default'",computed:!1},required:!1}}};o.__docgenInfo={description:`Design System Linear Progress component built on MUI.
- Uses role-based colors via getRoleColor
- Supports determinate, indeterminate, and buffer modes`,methods:[],displayName:"DSLinearProgress",props:{tone:{defaultValue:{value:"'default'",computed:!1},required:!1}}};const F={title:"Components/Progress/Circular",component:b,parameters:{layout:"centered",docs:{description:{component:"Design System Circular Progress indicator built on MUI. Supports determinate and indeterminate modes."}}},argTypes:{tone:{control:"radio",options:["default","success","danger"]},size:{control:"number"},variant:{control:"radio",options:["determinate","indeterminate"]},value:{control:"number",min:0,max:100}}},p={args:{variant:"indeterminate"}},l={args:{size:24}},g={args:{size:64}},v={args:{tone:"success"}},x={args:{tone:"danger"}},f={args:{variant:"determinate",value:50}},S={args:{variant:"determinate",value:75,tone:"success"}},h={render:()=>{const[r,t]=c.useState(0);return c.useEffect(()=>{const n=setInterval(()=>{t(s=>s>=100?0:s+10)},800);return()=>{clearInterval(n)}},[]),e.jsxs(a,{sx:{position:"relative",display:"inline-flex"},children:[e.jsx(b,{variant:"determinate",value:r,size:80}),e.jsx(a,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(m,{variant:"caption",component:"div",color:"text.secondary",children:`${Math.round(r)}%`})})]})}},y={render:()=>e.jsx(a,{sx:{width:400},children:e.jsx(o,{})})},P={render:()=>e.jsx(a,{sx:{width:400},children:e.jsx(o,{variant:"determinate",value:50})})},D={render:()=>e.jsx(a,{sx:{width:400},children:e.jsx(o,{variant:"determinate",value:75,tone:"success"})})},j={render:()=>e.jsx(a,{sx:{width:400},children:e.jsx(o,{variant:"determinate",value:30,tone:"danger"})})},B={render:()=>{const[r,t]=c.useState(0);return c.useEffect(()=>{const n=setInterval(()=>{t(s=>{if(s===100)return 0;const d=Math.random()*10;return Math.min(s+d,100)})},500);return()=>{clearInterval(n)}},[]),e.jsxs(a,{sx:{width:400},children:[e.jsx(o,{variant:"determinate",value:r}),e.jsx(m,{variant:"body2",color:"text.secondary",align:"center",sx:{mt:1},children:`${Math.round(r)}%`})]})}},L={render:()=>{const[r,t]=c.useState(0),[n,s]=c.useState(0),[d,I]=c.useState(0);return c.useEffect(()=>{const C=setInterval(()=>{t(i=>i>=100?0:i+5),s(i=>i>=100?0:i+7),I(i=>i>=100?0:i+3)},500);return()=>clearInterval(C)},[]),e.jsxs(w,{spacing:3,sx:{width:400},children:[e.jsxs(a,{children:[e.jsx(m,{variant:"body2",gutterBottom:!0,children:"Default Progress"}),e.jsx(o,{variant:"determinate",value:r})]}),e.jsxs(a,{children:[e.jsx(m,{variant:"body2",gutterBottom:!0,children:"Success Progress"}),e.jsx(o,{variant:"determinate",value:n,tone:"success"})]}),e.jsxs(a,{children:[e.jsx(m,{variant:"body2",gutterBottom:!0,children:"Danger Progress"}),e.jsx(o,{variant:"determinate",value:d,tone:"danger"})]})]})}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'indeterminate'
  }
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: 24
  }
}`,...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    size: 64
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    tone: 'success'
  }
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    tone: 'danger'
  }
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'determinate',
    value: 50
  }
}`,...f.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'determinate',
    value: 75,
    tone: 'success'
  }
}`,...S.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress(prevProgress => prevProgress >= 100 ? 0 : prevProgress + 10);
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);
    return <Box sx={{
      position: 'relative',
      display: 'inline-flex'
    }}>
        <DSCircularProgress variant="determinate" value={progress} size={80} />
        <Box sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
          <Typography variant="caption" component="div" color="text.secondary">
            {\`\${Math.round(progress)}%\`}
          </Typography>
        </Box>
      </Box>;
  }
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    width: 400
  }}><DSLinearProgress /></Box>
}`,...y.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    width: 400
  }}>
      <DSLinearProgress variant="determinate" value={50} />
    </Box>
}`,...P.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    width: 400
  }}>
      <DSLinearProgress variant="determinate" value={75} tone="success" />
    </Box>
}`,...D.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    width: 400
  }}>
      <DSLinearProgress variant="determinate" value={30} tone="danger" />
    </Box>
}`,...j.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress(oldProgress => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
      return () => {
        clearInterval(timer);
      };
    }, []);
    return <Box sx={{
      width: 400
    }}>
        <DSLinearProgress variant="determinate" value={progress} />
        <Typography variant="body2" color="text.secondary" align="center" sx={{
        mt: 1
      }}>
          {\`\${Math.round(progress)}%\`}
        </Typography>
      </Box>;
  }
}`,...B.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress1(prev => prev >= 100 ? 0 : prev + 5);
        setProgress2(prev => prev >= 100 ? 0 : prev + 7);
        setProgress3(prev => prev >= 100 ? 0 : prev + 3);
      }, 500);
      return () => clearInterval(timer);
    }, []);
    return <Stack spacing={3} sx={{
      width: 400
    }}>
        <Box>
          <Typography variant="body2" gutterBottom>Default Progress</Typography>
          <DSLinearProgress variant="determinate" value={progress1} />
        </Box>
        <Box>
          <Typography variant="body2" gutterBottom>Success Progress</Typography>
          <DSLinearProgress variant="determinate" value={progress2} tone="success" />
        </Box>
        <Box>
          <Typography variant="body2" gutterBottom>Danger Progress</Typography>
          <DSLinearProgress variant="determinate" value={progress3} tone="danger" />
        </Box>
      </Stack>;
  }
}`,...L.parameters?.docs?.source}}};const G=["Default","Small","Large","Success","Danger","Determinate50","Determinate75","AnimatedProgress","LinearDefault","LinearDeterminate50","LinearSuccess","LinearDanger","LinearAnimated","MultipleProgress"];export{h as AnimatedProgress,x as Danger,p as Default,f as Determinate50,S as Determinate75,g as Large,B as LinearAnimated,j as LinearDanger,y as LinearDefault,P as LinearDeterminate50,D as LinearSuccess,L as MultipleProgress,l as Small,v as Success,G as __namedExportsOrder,F as default};
