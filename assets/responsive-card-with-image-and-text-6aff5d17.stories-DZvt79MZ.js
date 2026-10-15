import{a5 as S,ao as B,Z as n,p as M}from"./iframe-CPBTUrEW.js";import{C as c,a as l}from"./CardContent-DBXQ_p0m.js";import{S as E}from"./Stack-DNM9s3rh.js";import{g as A,b as k,c as T,e as W}from"./styled-CijOp1BY.js";import{T as o}from"./Typography-B8Azb_EI.js";import{B as i}from"./Button-C7hKXtr1.js";import{B as H}from"./Box-DJ9yov3l.js";import"./preload-helper-PPVm8Dsz.js";import"./Paper-Bmrvw56W.js";import"./useTheme-Cup9dysz.js";import"./memoTheme-BVzAl7br.js";import"./getThemeProps-D9sgPYYa.js";import"./useThemeProps-Cv2CqOcg.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./ButtonBase-bvGWYjN8.js";import"./useTimeout-BkF-taVW.js";import"./useForkRef-DKrbSgSS.js";import"./useEventCallback-BK5EjOzt.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-CvjKlzvo.js";function F(e){return A("MuiCardActions",e)}k("MuiCardActions",["root","spacing"]);const I=e=>{const{classes:t,disableSpacing:a}=e;return T({root:["root",!a&&"spacing"]},F,t)},L=W("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,!a.disableSpacing&&t.spacing]}})({display:"flex",alignItems:"center",padding:8,variants:[{props:{disableSpacing:!1},style:{"& > :not(style) ~ :not(style)":{marginLeft:8}}}]}),f=S.forwardRef(function(t,a){const r=B({props:t,name:"MuiCardActions"}),{disableSpacing:d=!1,className:C,...p}=r,s={...r,disableSpacing:d},b=I(s);return n.jsx(L,{className:M(b.root,C),ownerState:s,ref:a,...p})});function N(e){return A("MuiCardMedia",e)}k("MuiCardMedia",["root","media","img"]);const G=e=>{const{classes:t,isMediaComponent:a,isImageComponent:r}=e;return T({root:["root",a&&"media",r&&"img"]},N,t)},U=W("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e,{isMediaComponent:r,isImageComponent:d}=a;return[t.root,r&&t.media,d&&t.img]}})({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",variants:[{props:{isMediaComponent:!0},style:{width:"100%"}},{props:{isImageComponent:!0},style:{objectFit:"cover"}}]}),O=["video","audio","picture","iframe","img"],P=["picture","img"],m=S.forwardRef(function(t,a){const r=B({props:t,name:"MuiCardMedia"}),{children:d,className:C,component:p="div",image:s,src:b,style:w,...R}=r,x=O.includes(p),z=!x&&s?{backgroundImage:`url("${s}")`,...w}:w,j={...r,component:p,isMediaComponent:x,isImageComponent:P.includes(p)},D=G(j);return n.jsx(U,{className:M(D.root,C),as:p,role:!x&&s?"img":void 0,ref:a,style:z,ownerState:j,src:x?s||b:void 0,...R,children:d})}),ln={title:"Generated/Responsive Card with Image and Text",component:c,parameters:{layout:"centered",docs:{description:{component:"A responsive card component featuring an image, title, description, and optional action buttons. Adapts gracefully across different screen sizes."}}},tags:["autodocs"]},h={render:()=>n.jsx("div",{style:{padding:"24px"},children:n.jsxs(c,{sx:{maxWidth:360,borderRadius:2,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.12)"},children:[n.jsx(m,{component:"img",height:"200",image:"https://picsum.photos/360/200?random=1",alt:"Card cover image"}),n.jsxs(l,{sx:{padding:"20px"},children:[n.jsx(o,{variant:"h6",component:"h2",gutterBottom:!0,sx:{fontWeight:600,marginBottom:"8px"},children:"Explore the Mountains"}),n.jsx(o,{variant:"body2",color:"text.secondary",sx:{lineHeight:1.6},children:"Discover breathtaking mountain landscapes and hidden trails that lead to some of nature's most stunning vistas. Perfect for adventurers and nature lovers alike."})]}),n.jsxs(f,{sx:{padding:"8px 20px 20px"},children:[n.jsx(i,{size:"small",variant:"contained",children:"Explore"}),n.jsx(i,{size:"small",variant:"text",children:"Learn More"})]})]})})},g={render:()=>n.jsx("div",{style:{padding:"24px"},children:n.jsxs(c,{sx:{maxWidth:360,borderRadius:2,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.12)"},children:[n.jsx(m,{component:"img",height:"200",image:"https://picsum.photos/360/200?random=2",alt:"Cityscape at night"}),n.jsxs(l,{sx:{padding:"20px"},children:[n.jsx(o,{variant:"h6",component:"h2",gutterBottom:!0,sx:{fontWeight:600,marginBottom:"8px"},children:"Urban Architecture & Design"}),n.jsx(o,{variant:"body2",color:"text.secondary",sx:{lineHeight:1.6},children:"A deep dive into modern urban architecture, exploring how cities are reshaping their skylines with bold, sustainable designs. From glass towers to repurposed industrial spaces, the urban landscape is constantly evolving to meet the needs of a growing population."})]}),n.jsxs(f,{sx:{padding:"8px 20px 20px"},children:[n.jsx(i,{size:"small",variant:"contained",children:"Read Article"}),n.jsx(i,{size:"small",variant:"text",children:"Save"})]})]})})},u={render:()=>n.jsx("div",{style:{padding:"24px"},children:n.jsxs(c,{sx:{display:"flex",maxWidth:560,borderRadius:2,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.12)"},children:[n.jsx(m,{component:"img",sx:{width:160,flexShrink:0,objectFit:"cover"},image:"https://picsum.photos/160/200?random=3",alt:"Ocean view"}),n.jsxs(H,{sx:{display:"flex",flexDirection:"column",flex:1},children:[n.jsxs(l,{sx:{padding:"20px",flex:1},children:[n.jsx(o,{variant:"h6",component:"h2",gutterBottom:!0,sx:{fontWeight:600,marginBottom:"8px"},children:"Coastal Getaways"}),n.jsx(o,{variant:"body2",color:"text.secondary",sx:{lineHeight:1.6},children:"Escape to serene coastal destinations where the sound of waves meets golden sand. Ideal for a refreshing retreat."})]}),n.jsx(f,{sx:{padding:"0 20px 16px"},children:n.jsx(i,{size:"small",variant:"contained",children:"Book Now"})})]})]})})},y={render:()=>n.jsx("div",{style:{padding:"24px"},children:n.jsx(E,{direction:"row",spacing:3,flexWrap:"wrap",useFlexGap:!0,children:[{id:1,image:"https://picsum.photos/320/180?random=4",alt:"Forest trail",title:"Forest Adventures",description:"Wander through ancient forests filled with towering trees and peaceful streams."},{id:2,image:"https://picsum.photos/320/180?random=5",alt:"Desert landscape",title:"Desert Horizons",description:"Experience the vast, silent beauty of desert landscapes at sunrise and sunset."},{id:3,image:"https://picsum.photos/320/180?random=6",alt:"Lake reflection",title:"Lakeside Serenity",description:"Relax by tranquil lakes that mirror the sky and surrounding mountain peaks."}].map(e=>n.jsxs(c,{sx:{width:300,borderRadius:2,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.12)",transition:"transform 0.2s, box-shadow 0.2s","&:hover":{transform:"translateY(-4px)",boxShadow:"0 6px 20px rgba(0,0,0,0.18)"}},children:[n.jsx(m,{component:"img",height:"180",image:e.image,alt:e.alt}),n.jsxs(l,{sx:{padding:"16px 20px"},children:[n.jsx(o,{variant:"h6",component:"h2",gutterBottom:!0,sx:{fontWeight:600,fontSize:"1rem",marginBottom:"8px"},children:e.title}),n.jsx(o,{variant:"body2",color:"text.secondary",sx:{lineHeight:1.6},children:e.description})]}),n.jsxs(f,{sx:{padding:"0 20px 16px"},children:[n.jsx(i,{size:"small",variant:"contained",children:"Discover"}),n.jsx(i,{size:"small",variant:"outlined",children:"Save"})]})]},e.id))})})},v={render:()=>n.jsx("div",{style:{padding:"24px"},children:n.jsxs(c,{sx:{maxWidth:340,borderRadius:2,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.08)"},children:[n.jsx(m,{component:"img",height:"180",image:"https://picsum.photos/340/180?random=7",alt:"Abstract art"}),n.jsxs(l,{sx:{padding:"20px"},children:[n.jsx(o,{variant:"overline",color:"primary",display:"block",sx:{marginBottom:"4px",fontWeight:600,letterSpacing:1},children:"Design"}),n.jsx(o,{variant:"h6",component:"h2",sx:{fontWeight:700,marginBottom:"12px"},children:"The Art of Minimalism"}),n.jsx(o,{variant:"body2",color:"text.secondary",sx:{lineHeight:1.7},children:"Less is more. Explore how minimalist design principles can create powerful, focused experiences."})]})]})})},mn=["Default","WithLongContent","HorizontalCard","CardGrid","MinimalCard"];h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px'
  }}>
      <Card sx={{
      maxWidth: 360,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
    }}>
        <CardMedia component="img" height="200" image="https://picsum.photos/360/200?random=1" alt="Card cover image" />
        <CardContent sx={{
        padding: '20px'
      }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{
          fontWeight: 600,
          marginBottom: '8px'
        }}>
            Explore the Mountains
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
          lineHeight: 1.6
        }}>
            Discover breathtaking mountain landscapes and hidden trails that lead to some of nature's most stunning vistas. Perfect for adventurers and nature lovers alike.
          </Typography>
        </CardContent>
        <CardActions sx={{
        padding: '8px 20px 20px'
      }}>
          <Button size="small" variant="contained">Explore</Button>
          <Button size="small" variant="text">Learn More</Button>
        </CardActions>
      </Card>
    </div>
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px'
  }}>
      <Card sx={{
      maxWidth: 360,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
    }}>
        <CardMedia component="img" height="200" image="https://picsum.photos/360/200?random=2" alt="Cityscape at night" />
        <CardContent sx={{
        padding: '20px'
      }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{
          fontWeight: 600,
          marginBottom: '8px'
        }}>
            Urban Architecture & Design
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
          lineHeight: 1.6
        }}>
            A deep dive into modern urban architecture, exploring how cities are reshaping their skylines with bold, sustainable designs. From glass towers to repurposed industrial spaces, the urban landscape is constantly evolving to meet the needs of a growing population.
          </Typography>
        </CardContent>
        <CardActions sx={{
        padding: '8px 20px 20px'
      }}>
          <Button size="small" variant="contained">Read Article</Button>
          <Button size="small" variant="text">Save</Button>
        </CardActions>
      </Card>
    </div>
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px'
  }}>
      <Card sx={{
      display: 'flex',
      maxWidth: 560,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
    }}>
        <CardMedia component="img" sx={{
        width: 160,
        flexShrink: 0,
        objectFit: 'cover'
      }} image="https://picsum.photos/160/200?random=3" alt="Ocean view" />
        <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
          <CardContent sx={{
          padding: '20px',
          flex: 1
        }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{
            fontWeight: 600,
            marginBottom: '8px'
          }}>
              Coastal Getaways
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
            lineHeight: 1.6
          }}>
              Escape to serene coastal destinations where the sound of waves meets golden sand. Ideal for a refreshing retreat.
            </Typography>
          </CardContent>
          <CardActions sx={{
          padding: '0 20px 16px'
        }}>
            <Button size="small" variant="contained">Book Now</Button>
          </CardActions>
        </Box>
      </Card>
    </div>
}`,...u.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px'
  }}>
      <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
        {[{
        id: 1,
        image: 'https://picsum.photos/320/180?random=4',
        alt: 'Forest trail',
        title: 'Forest Adventures',
        description: 'Wander through ancient forests filled with towering trees and peaceful streams.'
      }, {
        id: 2,
        image: 'https://picsum.photos/320/180?random=5',
        alt: 'Desert landscape',
        title: 'Desert Horizons',
        description: 'Experience the vast, silent beauty of desert landscapes at sunrise and sunset.'
      }, {
        id: 3,
        image: 'https://picsum.photos/320/180?random=6',
        alt: 'Lake reflection',
        title: 'Lakeside Serenity',
        description: 'Relax by tranquil lakes that mirror the sky and surrounding mountain peaks.'
      }].map(card => <Card key={card.id} sx={{
        width: 300,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.18)'
        }
      }}>
            <CardMedia component="img" height="180" image={card.image} alt={card.alt} />
            <CardContent sx={{
          padding: '16px 20px'
        }}>
              <Typography variant="h6" component="h2" gutterBottom sx={{
            fontWeight: 600,
            fontSize: '1rem',
            marginBottom: '8px'
          }}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{
            lineHeight: 1.6
          }}>
                {card.description}
              </Typography>
            </CardContent>
            <CardActions sx={{
          padding: '0 20px 16px'
        }}>
              <Button size="small" variant="contained">Discover</Button>
              <Button size="small" variant="outlined">Save</Button>
            </CardActions>
          </Card>)}
      </Stack>
    </div>
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px'
  }}>
      <Card sx={{
      maxWidth: 340,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
    }}>
        <CardMedia component="img" height="180" image="https://picsum.photos/340/180?random=7" alt="Abstract art" />
        <CardContent sx={{
        padding: '20px'
      }}>
          <Typography variant="overline" color="primary" display="block" sx={{
          marginBottom: '4px',
          fontWeight: 600,
          letterSpacing: 1
        }}>
            Design
          </Typography>
          <Typography variant="h6" component="h2" sx={{
          fontWeight: 700,
          marginBottom: '12px'
        }}>
            The Art of Minimalism
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
          lineHeight: 1.7
        }}>
            Less is more. Explore how minimalist design principles can create powerful, focused experiences.
          </Typography>
        </CardContent>
      </Card>
    </div>
}`,...v.parameters?.docs?.source}}};export{y as CardGrid,h as Default,u as HorizontalCard,v as MinimalCard,g as WithLongContent,mn as __namedExportsOrder,ln as default};
