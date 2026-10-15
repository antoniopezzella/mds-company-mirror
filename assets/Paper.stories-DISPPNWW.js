import{Z as e,N as o}from"./iframe-CPBTUrEW.js";import{P as C}from"./Paper-Bmrvw56W.js";import{c as S}from"./createSvgIcon-sccWia23.js";import{B as n}from"./Box-DJ9yov3l.js";import{T as a}from"./Typography-B8Azb_EI.js";import{B as T}from"./Button-C7hKXtr1.js";import"./preload-helper-PPVm8Dsz.js";import"./useTheme-Cup9dysz.js";import"./styled-CijOp1BY.js";import"./memoTheme-BVzAl7br.js";import"./SvgIcon-B0F0eofH.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./ButtonBase-bvGWYjN8.js";import"./useTimeout-BkF-taVW.js";import"./useForkRef-DKrbSgSS.js";import"./useEventCallback-BK5EjOzt.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-CvjKlzvo.js";const W=i=>{switch(i){case"small":return"12px";case"medium":return"16px";case"large":return"24px";default:return"0"}},L=i=>{switch(i){case"primary":return o("interactive.primary");case"success":return o("status.success.bg");case"warning":return o("status.warning.bg");case"danger":return o("status.danger.bg");default:return o("border.default")}},r=({children:i,elevation:P=1,variant:y="elevation",square:v=!1,padding:j="medium",borderColor:b="default",hover:f=!1,sx:B})=>{const w=W(j);return e.jsx(C,{elevation:y==="elevation"?P:0,variant:y,square:v,sx:{padding:w,backgroundColor:o("surface.default"),borderRadius:v?"0":"8px",border:y==="outlined"?`1px solid ${L(b)}`:"none",transition:f?"all 0.2s ease-in-out":"none","&:hover":f?{boxShadow:`0 4px 12px ${o("border.default")}`,transform:"translateY(-2px)"}:{},...B},children:i})};r.__docgenInfo={description:`Paper Component
Surface container for content with customizable elevation, padding, and styling
Ideal for cards, panels, and elevated content areas`,methods:[],displayName:"Paper",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},elevation:{required:!1,tsType:{name:"union",raw:"0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24",elements:[{name:"literal",value:"0"},{name:"literal",value:"1"},{name:"literal",value:"2"},{name:"literal",value:"3"},{name:"literal",value:"4"},{name:"literal",value:"5"},{name:"literal",value:"6"},{name:"literal",value:"7"},{name:"literal",value:"8"},{name:"literal",value:"9"},{name:"literal",value:"10"},{name:"literal",value:"11"},{name:"literal",value:"12"},{name:"literal",value:"13"},{name:"literal",value:"14"},{name:"literal",value:"15"},{name:"literal",value:"16"},{name:"literal",value:"17"},{name:"literal",value:"18"},{name:"literal",value:"19"},{name:"literal",value:"20"},{name:"literal",value:"21"},{name:"literal",value:"22"},{name:"literal",value:"23"},{name:"literal",value:"24"}]},description:"",defaultValue:{value:"1",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'elevation' | 'outlined'",elements:[{name:"literal",value:"'elevation'"},{name:"literal",value:"'outlined'"}]},description:"",defaultValue:{value:"'elevation'",computed:!1}},square:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}},borderColor:{required:!1,tsType:{name:"union",raw:"'default' | 'primary' | 'success' | 'warning' | 'danger'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'primary'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'danger'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},hover:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},sx:{required:!1,tsType:{name:"SxProps"},description:""}}};const q=S(e.jsx("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z"})),F={title:"Legacy (MUI)/Paper",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"**Legacy (MUI).** Not the canonical Paper — new work should use `Card` from `@/components/ui/card`. Kept because code still imports this one; its stories are also its only test coverage, so they stay rather than being hidden. Container surface with elevation. Use for grouping content with visual hierarchy through shadow levels."}}},argTypes:{elevation:{control:{type:"number",min:0,max:24,step:1}},variant:{control:"radio",options:["elevation","outlined"]},square:{control:"boolean"},padding:{control:"radio",options:["none","small","medium","large"]},borderColor:{control:"radio",options:["default","primary","success","warning","danger"]},hover:{control:"boolean"},sx:{control:"object"}},args:{elevation:1,variant:"elevation",square:!1,padding:"medium",borderColor:"default",hover:!1}},t={render:i=>e.jsxs(r,{...i,children:[e.jsx(a,{variant:"h6",children:"Default Paper"}),e.jsx(a,{variant:"body2",sx:{color:"text.secondary"},children:"This is a paper container with default elevation and padding"})]})},p={render:()=>e.jsxs(n,{sx:{display:"flex",gap:"16px",flexWrap:"wrap"},children:[e.jsx(r,{elevation:0,sx:{width:"100px",height:"80px"},children:e.jsx(a,{variant:"caption",children:"Elevation 0"})}),e.jsx(r,{elevation:1,sx:{width:"100px",height:"80px"},children:e.jsx(a,{variant:"caption",children:"Elevation 1"})}),e.jsx(r,{elevation:4,sx:{width:"100px",height:"80px"},children:e.jsx(a,{variant:"caption",children:"Elevation 4"})}),e.jsx(r,{elevation:8,sx:{width:"100px",height:"80px"},children:e.jsx(a,{variant:"caption",children:"Elevation 8"})})]})},l={render:()=>e.jsxs(n,{sx:{display:"flex",gap:"16px",flexWrap:"wrap"},children:[e.jsxs(r,{variant:"elevation",elevation:1,sx:{padding:"16px",minWidth:"200px"},children:[e.jsx(a,{variant:"subtitle2",children:"Elevation Variant"}),e.jsx(a,{variant:"body2",sx:{color:"text.secondary"},children:"Uses box shadow for depth"})]}),e.jsxs(r,{variant:"outlined",sx:{padding:"16px",minWidth:"200px"},children:[e.jsx(a,{variant:"subtitle2",children:"Outlined Variant"}),e.jsx(a,{variant:"body2",sx:{color:"text.secondary"},children:"Uses border for definition"})]})]})},s={render:()=>e.jsxs(n,{sx:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(r,{padding:"none",children:e.jsx(n,{sx:{backgroundColor:"#f0f0f0",height:"60px"},children:e.jsx(a,{children:"No Padding"})})}),e.jsx(r,{padding:"small",children:e.jsx(a,{children:"Small Padding (12px)"})}),e.jsx(r,{padding:"medium",children:e.jsx(a,{children:"Medium Padding (16px)"})}),e.jsx(r,{padding:"large",children:e.jsx(a,{children:"Large Padding (24px)"})})]})},d={render:()=>e.jsxs(n,{sx:{display:"flex",gap:"16px",flexWrap:"wrap"},children:[e.jsx(r,{variant:"outlined",borderColor:"default",sx:{minWidth:"150px"},children:e.jsx(a,{variant:"caption",children:"Default Border"})}),e.jsx(r,{variant:"outlined",borderColor:"primary",sx:{minWidth:"150px"},children:e.jsx(a,{variant:"caption",children:"Primary Border"})}),e.jsx(r,{variant:"outlined",borderColor:"success",sx:{minWidth:"150px"},children:e.jsx(a,{variant:"caption",children:"Success Border"})}),e.jsx(r,{variant:"outlined",borderColor:"warning",sx:{minWidth:"150px"},children:e.jsx(a,{variant:"caption",children:"Warning Border"})}),e.jsx(r,{variant:"outlined",borderColor:"danger",sx:{minWidth:"150px"},children:e.jsx(a,{variant:"caption",children:"Danger Border"})})]})},c={render:()=>e.jsxs(r,{hover:!0,elevation:1,sx:{padding:"16px",cursor:"pointer"},children:[e.jsx(a,{variant:"h6",children:"Hover Me"}),e.jsx(a,{variant:"body2",sx:{color:"text.secondary"},children:"This paper lifts on hover"})]})},x={render:()=>e.jsxs(n,{sx:{display:"flex",gap:"16px"},children:[e.jsx(r,{square:!1,sx:{padding:"16px",width:"100px",height:"100px"},children:e.jsx(a,{variant:"caption",children:"Rounded"})}),e.jsx(r,{square:!0,sx:{padding:"16px",width:"100px",height:"100px"},children:e.jsx(a,{variant:"caption",children:"Squared"})})]})},m={render:()=>e.jsxs(r,{elevation:2,padding:"large",sx:{maxWidth:"400px"},children:[e.jsxs(n,{sx:{display:"flex",gap:"12px",marginBottom:"16px"},children:[e.jsx(q,{}),e.jsxs(n,{children:[e.jsx(a,{variant:"h6",children:"Policy #POL-2024-001"}),e.jsx(a,{variant:"caption",sx:{color:"text.secondary"},children:"Commercial Liability"})]})]}),e.jsx(a,{variant:"body2",sx:{marginBottom:"12px"},children:"Active coverage with $1,000,000 limit"}),e.jsxs(n,{sx:{display:"flex",gap:"8px"},children:[e.jsx(T,{variant:"outlined",size:"small",children:"View Details"}),e.jsx(T,{variant:"outlined",size:"small",children:"Renew"})]})]})},h={render:()=>e.jsxs(r,{variant:"outlined",borderColor:"warning",padding:"medium",children:[e.jsx(a,{variant:"subtitle1",sx:{fontWeight:600,marginBottom:"8px"},children:"Active Claim"}),e.jsx(a,{variant:"body2",sx:{marginBottom:"12px"},children:"Claim #CLM-2024-789"}),e.jsx(n,{sx:{backgroundColor:"#fafafa",padding:"8px",borderRadius:"4px"},children:e.jsx(a,{variant:"caption",children:"Status: Under Review"})})]})},u={render:()=>e.jsxs(r,{elevation:0,variant:"outlined",borderColor:"default",padding:"large",children:[e.jsx(a,{variant:"h5",sx:{marginBottom:"8px"},children:"Coverage Summary"}),e.jsx(a,{variant:"body2",sx:{color:"text.secondary",marginBottom:"16px"},children:"Updated December 22, 2024"}),e.jsxs(n,{sx:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[e.jsxs(n,{children:[e.jsx(a,{variant:"caption",sx:{color:"text.secondary"},children:"Liability Limit"}),e.jsx(a,{variant:"h6",children:"$1,000,000"})]}),e.jsxs(n,{children:[e.jsx(a,{variant:"caption",sx:{color:"text.secondary"},children:"Deductible"}),e.jsx(a,{variant:"h6",children:"$1,000"})]})]})]})},g={render:()=>e.jsxs(r,{elevation:0,padding:"large",children:[e.jsx(r,{elevation:1,padding:"medium",sx:{marginBottom:"16px"},children:e.jsx(a,{variant:"subtitle1",children:"Layer 1"})}),e.jsx(r,{elevation:2,padding:"medium",children:e.jsx(a,{variant:"subtitle1",children:"Layer 2"})})]})},G=["Default","Elevations","Variants","Padding","BorderColors","Hoverable","Squared","PolicyCard","ClaimPanel","StyledSection","LayeredPapers"];t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <Paper {...args}>
      <Typography variant="h6">Default Paper</Typography>
      <Typography variant="body2" sx={{
      color: 'text.secondary'
    }}>
        This is a paper container with default elevation and padding
      </Typography>
    </Paper>
}`,...t.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  }}>
      <Paper elevation={0} sx={{
      width: '100px',
      height: '80px'
    }}>
        <Typography variant="caption">Elevation 0</Typography>
      </Paper>
      <Paper elevation={1} sx={{
      width: '100px',
      height: '80px'
    }}>
        <Typography variant="caption">Elevation 1</Typography>
      </Paper>
      <Paper elevation={4} sx={{
      width: '100px',
      height: '80px'
    }}>
        <Typography variant="caption">Elevation 4</Typography>
      </Paper>
      <Paper elevation={8} sx={{
      width: '100px',
      height: '80px'
    }}>
        <Typography variant="caption">Elevation 8</Typography>
      </Paper>
    </Box>
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  }}>
      <Paper variant="elevation" elevation={1} sx={{
      padding: '16px',
      minWidth: '200px'
    }}>
        <Typography variant="subtitle2">Elevation Variant</Typography>
        <Typography variant="body2" sx={{
        color: 'text.secondary'
      }}>
          Uses box shadow for depth
        </Typography>
      </Paper>
      <Paper variant="outlined" sx={{
      padding: '16px',
      minWidth: '200px'
    }}>
        <Typography variant="subtitle2">Outlined Variant</Typography>
        <Typography variant="body2" sx={{
        color: 'text.secondary'
      }}>
          Uses border for definition
        </Typography>
      </Paper>
    </Box>
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Paper padding="none">
        <Box sx={{
        backgroundColor: '#f0f0f0',
        height: '60px'
      }}>
          <Typography>No Padding</Typography>
        </Box>
      </Paper>
      <Paper padding="small">
        <Typography>Small Padding (12px)</Typography>
      </Paper>
      <Paper padding="medium">
        <Typography>Medium Padding (16px)</Typography>
      </Paper>
      <Paper padding="large">
        <Typography>Large Padding (24px)</Typography>
      </Paper>
    </Box>
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  }}>
      <Paper variant="outlined" borderColor="default" sx={{
      minWidth: '150px'
    }}>
        <Typography variant="caption">Default Border</Typography>
      </Paper>
      <Paper variant="outlined" borderColor="primary" sx={{
      minWidth: '150px'
    }}>
        <Typography variant="caption">Primary Border</Typography>
      </Paper>
      <Paper variant="outlined" borderColor="success" sx={{
      minWidth: '150px'
    }}>
        <Typography variant="caption">Success Border</Typography>
      </Paper>
      <Paper variant="outlined" borderColor="warning" sx={{
      minWidth: '150px'
    }}>
        <Typography variant="caption">Warning Border</Typography>
      </Paper>
      <Paper variant="outlined" borderColor="danger" sx={{
      minWidth: '150px'
    }}>
        <Typography variant="caption">Danger Border</Typography>
      </Paper>
    </Box>
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Paper hover elevation={1} sx={{
    padding: '16px',
    cursor: 'pointer'
  }}>
      <Typography variant="h6">Hover Me</Typography>
      <Typography variant="body2" sx={{
      color: 'text.secondary'
    }}>
        This paper lifts on hover
      </Typography>
    </Paper>
}`,...c.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    gap: '16px'
  }}>
      <Paper square={false} sx={{
      padding: '16px',
      width: '100px',
      height: '100px'
    }}>
        <Typography variant="caption">Rounded</Typography>
      </Paper>
      <Paper square sx={{
      padding: '16px',
      width: '100px',
      height: '100px'
    }}>
        <Typography variant="caption">Squared</Typography>
      </Paper>
    </Box>
}`,...x.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Paper elevation={2} padding="large" sx={{
    maxWidth: '400px'
  }}>
      <Box sx={{
      display: 'flex',
      gap: '12px',
      marginBottom: '16px'
    }}>
        <PolicyIcon />
        <Box>
          <Typography variant="h6">Policy #POL-2024-001</Typography>
          <Typography variant="caption" sx={{
          color: 'text.secondary'
        }}>
            Commercial Liability
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{
      marginBottom: '12px'
    }}>
        Active coverage with $1,000,000 limit
      </Typography>
      <Box sx={{
      display: 'flex',
      gap: '8px'
    }}>
        <Button variant="outlined" size="small">
          View Details
        </Button>
        <Button variant="outlined" size="small">
          Renew
        </Button>
      </Box>
    </Paper>
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Paper variant="outlined" borderColor="warning" padding="medium">
      <Typography variant="subtitle1" sx={{
      fontWeight: 600,
      marginBottom: '8px'
    }}>
        Active Claim
      </Typography>
      <Typography variant="body2" sx={{
      marginBottom: '12px'
    }}>
        Claim #CLM-2024-789
      </Typography>
      <Box sx={{
      backgroundColor: '#fafafa',
      padding: '8px',
      borderRadius: '4px'
    }}>
        <Typography variant="caption">Status: Under Review</Typography>
      </Box>
    </Paper>
}`,...h.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Paper elevation={0} variant="outlined" borderColor="default" padding="large">
      <Typography variant="h5" sx={{
      marginBottom: '8px'
    }}>
        Coverage Summary
      </Typography>
      <Typography variant="body2" sx={{
      color: 'text.secondary',
      marginBottom: '16px'
    }}>
        Updated December 22, 2024
      </Typography>
      <Box sx={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    }}>
        <Box>
          <Typography variant="caption" sx={{
          color: 'text.secondary'
        }}>
            Liability Limit
          </Typography>
          <Typography variant="h6">$1,000,000</Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{
          color: 'text.secondary'
        }}>
            Deductible
          </Typography>
          <Typography variant="h6">$1,000</Typography>
        </Box>
      </Box>
    </Paper>
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Paper elevation={0} padding="large">
      <Paper elevation={1} padding="medium" sx={{
      marginBottom: '16px'
    }}>
        <Typography variant="subtitle1">Layer 1</Typography>
      </Paper>
      <Paper elevation={2} padding="medium">
        <Typography variant="subtitle1">Layer 2</Typography>
      </Paper>
    </Paper>
}`,...g.parameters?.docs?.source}}};export{d as BorderColors,h as ClaimPanel,t as Default,p as Elevations,c as Hoverable,g as LayeredPapers,s as Padding,m as PolicyCard,x as Squared,u as StyledSection,l as Variants,G as __namedExportsOrder,F as default};
