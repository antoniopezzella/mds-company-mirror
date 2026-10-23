import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{a as i,n as a}from"./chunk-OB3PAWPO-BIyQW01G.js";import{n as o,t as s}from"./TeamsContext-CYaLysqD.js";import{n as c,t as l}from"./CreateTeamDrawer-ejlhKcKM.js";var u,d,f,p,m;function h(){return(h=t((()=>{u=e(n(),1),i(),c(),o(),d=r(),f={title:`Projects/Colleague Profile/CreateTeamDrawer`,component:l,tags:[`autodocs`],decorators:[e=>(0,d.jsx)(a,{children:(0,d.jsx)(s,{children:(0,d.jsx)(e,{})})})],parameters:{layout:`fullscreen`,docs:{description:{component:`Create Team — a right-side drawer opened from "Create Team" on My Teams.

Improves on the UAT flow's two stacked modals: "Who is this team for?" is
folded in as a conditional first field (shown only when you hold delegated
access), the create form is kept minimal, and the fuller config lives on
Team Setup where you land on create — so nothing is asked twice.`}}}},p={render:()=>{let[e,t]=u.useState(!0);return(0,d.jsx)(`div`,{className:`mds-dashboard min-h-screen p-6`,children:(0,d.jsx)(l,{open:e,onOpenChange:t})})}},m=[`Open`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = React.useState(true);
    return <div className="mds-dashboard min-h-screen p-6">
        <CreateTeamDrawer open={open} onOpenChange={setOpen} />
      </div>;
  }
}`,...p.parameters?.docs?.source},description:{story:`Opened, so the whole form (and its a11y) is rendered for review.`,...p.parameters?.docs?.description}}}})))()}h();export{p as Open,m as __namedExportsOrder,f as default};