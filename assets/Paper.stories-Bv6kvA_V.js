import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DWVlIg87.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Box-BD9Vi1Pp.js";import{n as a,t as o}from"./roles-DNqHlq35.js";import{n as s,t as c}from"./Button-BlA5xY0Z.js";import{n as l,t as u}from"./Paper-ZV50H5HY.js";import{n as d,t as f}from"./Typography-anuSUXG9.js";import{n as p,t as m}from"./Description-JzLfd6pv.js";var h,g,_,v;function y(){return(y=e((()=>{t(),l(),a(),h=n(),g=e=>{switch(e){case`small`:return`12px`;case`medium`:return`16px`;case`large`:return`24px`;default:return`0`}},_=e=>{switch(e){case`primary`:return o(`interactive.primary`);case`success`:return o(`bg.success.subtle`);case`warning`:return o(`bg.warning.subtle`);case`danger`:return o(`bg.critical.subtle`);default:return o(`border.default`)}},v=({children:e,elevation:t=1,variant:n=`elevation`,square:r=!1,padding:i=`medium`,borderColor:a=`default`,hover:s=!1,sx:c})=>{let l=g(i);return(0,h.jsx)(u,{elevation:n===`elevation`?t:0,variant:n,square:r,sx:{padding:l,backgroundColor:o(`bg.default`),borderRadius:r?`0`:`8px`,border:n===`outlined`?`1px solid ${_(a)}`:`none`,transition:s?`all 0.2s ease-in-out`:`none`,"&:hover":s?{boxShadow:`0 4px 12px ${o(`border.default`)}`,transform:`translateY(-2px)`}:{},...c},children:e})},v.__docgenInfo={description:`Paper Component
Surface container for content with customizable elevation, padding, and styling
Ideal for cards, panels, and elevated content areas`,methods:[],displayName:`Paper`,props:{children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},elevation:{required:!1,tsType:{name:`union`,raw:`0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`},{name:`literal`,value:`7`},{name:`literal`,value:`8`},{name:`literal`,value:`9`},{name:`literal`,value:`10`},{name:`literal`,value:`11`},{name:`literal`,value:`12`},{name:`literal`,value:`13`},{name:`literal`,value:`14`},{name:`literal`,value:`15`},{name:`literal`,value:`16`},{name:`literal`,value:`17`},{name:`literal`,value:`18`},{name:`literal`,value:`19`},{name:`literal`,value:`20`},{name:`literal`,value:`21`},{name:`literal`,value:`22`},{name:`literal`,value:`23`},{name:`literal`,value:`24`}]},description:``,defaultValue:{value:`1`,computed:!1}},variant:{required:!1,tsType:{name:`union`,raw:`'elevation' | 'outlined'`,elements:[{name:`literal`,value:`'elevation'`},{name:`literal`,value:`'outlined'`}]},description:``,defaultValue:{value:`'elevation'`,computed:!1}},square:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},padding:{required:!1,tsType:{name:`union`,raw:`'none' | 'small' | 'medium' | 'large'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'large'`}]},description:``,defaultValue:{value:`'medium'`,computed:!1}},borderColor:{required:!1,tsType:{name:`union`,raw:`'default' | 'primary' | 'success' | 'warning' | 'danger'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'primary'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'danger'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}},hover:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},sx:{required:!1,tsType:{name:`SxProps`},description:``}}}})))()}var b,x,S,C,w,T,E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{t(),y(),r(),d(),s(),p(),b=n(),x={title:`Legacy (MUI)/Paper`,component:v,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"**Legacy (MUI).** Not the canonical Paper — new work should use `Card` from `@/components/ui/card`. Kept because code still imports this one; its stories are also its only test coverage, so they stay rather than being hidden. Container surface with elevation. Use for grouping content with visual hierarchy through shadow levels."}}},argTypes:{elevation:{control:{type:`number`,min:0,max:24,step:1}},variant:{control:`radio`,options:[`elevation`,`outlined`]},square:{control:`boolean`},padding:{control:`radio`,options:[`none`,`small`,`medium`,`large`]},borderColor:{control:`radio`,options:[`default`,`primary`,`success`,`warning`,`danger`]},hover:{control:`boolean`},sx:{control:`object`}},args:{elevation:1,variant:`elevation`,square:!1,padding:`medium`,borderColor:`default`,hover:!1}},S={render:e=>(0,b.jsxs)(v,{...e,children:[(0,b.jsx)(f,{variant:`h6`,children:`Default Paper`}),(0,b.jsx)(f,{variant:`body2`,sx:{color:`fg.neutral.subtle`},children:`This is a paper container with default elevation and padding`})]})},C={render:()=>(0,b.jsxs)(i,{sx:{display:`flex`,gap:`16px`,flexWrap:`wrap`},children:[(0,b.jsx)(v,{elevation:0,sx:{width:`100px`,height:`80px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Elevation 0`})}),(0,b.jsx)(v,{elevation:1,sx:{width:`100px`,height:`80px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Elevation 1`})}),(0,b.jsx)(v,{elevation:4,sx:{width:`100px`,height:`80px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Elevation 4`})}),(0,b.jsx)(v,{elevation:8,sx:{width:`100px`,height:`80px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Elevation 8`})})]})},w={render:()=>(0,b.jsxs)(i,{sx:{display:`flex`,gap:`16px`,flexWrap:`wrap`},children:[(0,b.jsxs)(v,{variant:`elevation`,elevation:1,sx:{padding:`16px`,minWidth:`200px`},children:[(0,b.jsx)(f,{variant:`subtitle2`,children:`Elevation Variant`}),(0,b.jsx)(f,{variant:`body2`,sx:{color:`fg.neutral.subtle`},children:`Uses box shadow for depth`})]}),(0,b.jsxs)(v,{variant:`outlined`,sx:{padding:`16px`,minWidth:`200px`},children:[(0,b.jsx)(f,{variant:`subtitle2`,children:`Outlined Variant`}),(0,b.jsx)(f,{variant:`body2`,sx:{color:`fg.neutral.subtle`},children:`Uses border for definition`})]})]})},T={render:()=>(0,b.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,b.jsx)(v,{padding:`none`,children:(0,b.jsx)(i,{sx:{backgroundColor:`#f0f0f0`,height:`60px`},children:(0,b.jsx)(f,{children:`No Padding`})})}),(0,b.jsx)(v,{padding:`small`,children:(0,b.jsx)(f,{children:`Small Padding (12px)`})}),(0,b.jsx)(v,{padding:`medium`,children:(0,b.jsx)(f,{children:`Medium Padding (16px)`})}),(0,b.jsx)(v,{padding:`large`,children:(0,b.jsx)(f,{children:`Large Padding (24px)`})})]})},E={render:()=>(0,b.jsxs)(i,{sx:{display:`flex`,gap:`16px`,flexWrap:`wrap`},children:[(0,b.jsx)(v,{variant:`outlined`,borderColor:`default`,sx:{minWidth:`150px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Default Border`})}),(0,b.jsx)(v,{variant:`outlined`,borderColor:`primary`,sx:{minWidth:`150px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Primary Border`})}),(0,b.jsx)(v,{variant:`outlined`,borderColor:`success`,sx:{minWidth:`150px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Success Border`})}),(0,b.jsx)(v,{variant:`outlined`,borderColor:`warning`,sx:{minWidth:`150px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Warning Border`})}),(0,b.jsx)(v,{variant:`outlined`,borderColor:`danger`,sx:{minWidth:`150px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Danger Border`})})]})},D={render:()=>(0,b.jsxs)(v,{hover:!0,elevation:1,sx:{padding:`16px`,cursor:`pointer`},children:[(0,b.jsx)(f,{variant:`h6`,children:`Hover Me`}),(0,b.jsx)(f,{variant:`body2`,sx:{color:`fg.neutral.subtle`},children:`This paper lifts on hover`})]})},O={render:()=>(0,b.jsxs)(i,{sx:{display:`flex`,gap:`16px`},children:[(0,b.jsx)(v,{square:!1,sx:{padding:`16px`,width:`100px`,height:`100px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Rounded`})}),(0,b.jsx)(v,{square:!0,sx:{padding:`16px`,width:`100px`,height:`100px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Squared`})})]})},k={render:()=>(0,b.jsxs)(v,{elevation:2,padding:`large`,sx:{maxWidth:`400px`},children:[(0,b.jsxs)(i,{sx:{display:`flex`,gap:`12px`,marginBottom:`16px`},children:[(0,b.jsx)(m,{}),(0,b.jsxs)(i,{children:[(0,b.jsx)(f,{variant:`h6`,children:`Policy #POL-2024-001`}),(0,b.jsx)(f,{variant:`caption`,sx:{color:`fg.neutral.subtle`},children:`Commercial Liability`})]})]}),(0,b.jsx)(f,{variant:`body2`,sx:{marginBottom:`12px`},children:`Active coverage with $1,000,000 limit`}),(0,b.jsxs)(i,{sx:{display:`flex`,gap:`8px`},children:[(0,b.jsx)(c,{variant:`outlined`,size:`small`,children:`View Details`}),(0,b.jsx)(c,{variant:`outlined`,size:`small`,children:`Renew`})]})]})},A={render:()=>(0,b.jsxs)(v,{variant:`outlined`,borderColor:`warning`,padding:`medium`,children:[(0,b.jsx)(f,{variant:`subtitle1`,sx:{fontWeight:600,marginBottom:`8px`},children:`Active Claim`}),(0,b.jsx)(f,{variant:`body2`,sx:{marginBottom:`12px`},children:`Claim #CLM-2024-789`}),(0,b.jsx)(i,{sx:{backgroundColor:`#fafafa`,padding:`8px`,borderRadius:`4px`},children:(0,b.jsx)(f,{variant:`caption`,children:`Status: Under Review`})})]})},j={render:()=>(0,b.jsxs)(v,{elevation:0,variant:`outlined`,borderColor:`default`,padding:`large`,children:[(0,b.jsx)(f,{variant:`h5`,sx:{marginBottom:`8px`},children:`Coverage Summary`}),(0,b.jsx)(f,{variant:`body2`,sx:{color:`fg.neutral.subtle`,marginBottom:`16px`},children:`Updated December 22, 2024`}),(0,b.jsxs)(i,{sx:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`16px`},children:[(0,b.jsxs)(i,{children:[(0,b.jsx)(f,{variant:`caption`,sx:{color:`fg.neutral.subtle`},children:`Liability Limit`}),(0,b.jsx)(f,{variant:`h6`,children:`$1,000,000`})]}),(0,b.jsxs)(i,{children:[(0,b.jsx)(f,{variant:`caption`,sx:{color:`fg.neutral.subtle`},children:`Deductible`}),(0,b.jsx)(f,{variant:`h6`,children:`$1,000`})]})]})]})},M={render:()=>(0,b.jsxs)(v,{elevation:0,padding:`large`,children:[(0,b.jsx)(v,{elevation:1,padding:`medium`,sx:{marginBottom:`16px`},children:(0,b.jsx)(f,{variant:`subtitle1`,children:`Layer 1`})}),(0,b.jsx)(v,{elevation:2,padding:`medium`,children:(0,b.jsx)(f,{variant:`subtitle1`,children:`Layer 2`})})]})},N=[`Default`,`Elevations`,`Variants`,`Padding`,`BorderColors`,`Hoverable`,`Squared`,`PolicyCard`,`ClaimPanel`,`StyledSection`,`LayeredPapers`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <Paper {...args}>
      <Typography variant="h6">Default Paper</Typography>
      <Typography variant="body2" sx={{
      color: 'fg.neutral.subtle'
    }}>
        This is a paper container with default elevation and padding
      </Typography>
    </Paper>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
        color: 'fg.neutral.subtle'
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
        color: 'fg.neutral.subtle'
      }}>
          Uses border for definition
        </Typography>
      </Paper>
    </Box>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Paper hover elevation={1} sx={{
    padding: '16px',
    cursor: 'pointer'
  }}>
      <Typography variant="h6">Hover Me</Typography>
      <Typography variant="body2" sx={{
      color: 'fg.neutral.subtle'
    }}>
        This paper lifts on hover
      </Typography>
    </Paper>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
          color: 'fg.neutral.subtle'
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <Paper elevation={0} variant="outlined" borderColor="default" padding="large">
      <Typography variant="h5" sx={{
      marginBottom: '8px'
    }}>
        Coverage Summary
      </Typography>
      <Typography variant="body2" sx={{
      color: 'fg.neutral.subtle',
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
          color: 'fg.neutral.subtle'
        }}>
            Liability Limit
          </Typography>
          <Typography variant="h6">$1,000,000</Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{
          color: 'fg.neutral.subtle'
        }}>
            Deductible
          </Typography>
          <Typography variant="h6">$1,000</Typography>
        </Box>
      </Box>
    </Paper>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}}})))()}P();export{E as BorderColors,A as ClaimPanel,S as Default,C as Elevations,D as Hoverable,M as LayeredPapers,T as Padding,k as PolicyCard,O as Squared,j as StyledSection,w as Variants,N as __namedExportsOrder,x as default};