import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./TeamSetup-Bl1w6BCR.js";import{n as o,t as s}from"./toaster-B_DJU4uc.js";var c,l,u,d,f,p,m,h,g,_,v;function y(){return(y=t((()=>{c=e(n(),1),o(),i(),l=r(),{expect:u,userEvent:d,within:f}=__STORYBOOK_MODULE_TEST__,p={title:`Projects/Colleague Profile/TeamSetup`,component:a,tags:[`autodocs`],decorators:[e=>(0,l.jsxs)(`div`,{className:`mds-dashboard p-6`,children:[e(),(0,l.jsx)(s,{})]})],parameters:{layout:`fullscreen`,docs:{description:{component:`Team Setup — the single home for a team's fuller configuration. The Create
drawer seeds name/size/mode/description; qualifiers, roles and coverage live
here, so no field is asked twice. Rendered inside the ManageTeam "Team Setup"
tab.`}}}},m={id:`design-team`,name:`Design Team`,description:`Product Design team`,specialties:[`Construction`,`Account Management`],members:2,capacity:10,creationMode:`manual`,roles:[]},h={render:()=>{let[e,t]=c.useState(m);return(0,l.jsx)(a,{team:e,onSave:e=>t(t=>({...t,...e}))})}},g={render:()=>{let[e,t]=c.useState(m);return(0,l.jsx)(a,{team:e,onSave:e=>t(t=>({...t,...e}))})},play:async({canvasElement:e})=>{let t=f(e),n=t.getByLabelText(`Team name`);await d.type(n,` Alpha`),await d.click(t.getByRole(`button`,{name:/save all settings/i}));let r=await f(document.body).findByText(`Team settings saved`);await u(r).toBeInTheDocument()}},_={render:()=>{let[e,t]=c.useState({...m,roles:[{id:`role-account-executive`,role:`Account Executive`,coverage:[{id:`c1`,colleagueId:`1522904`,name:`Priya Raman`}]},{id:`role-claims-advisor`,role:`Claims Advisor`,coverage:[]}]});return(0,l.jsx)(a,{team:e,onSave:e=>t(t=>({...t,...e}))})}},v=[`NewTeam`,`SaveConfirmation`,`WithRoles`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [team, setTeam] = React.useState<Team>(baseTeam);
    return <TeamSetup team={team} onSave={patch => setTeam(t => ({
      ...t,
      ...patch
    }))} />;
  }
}`,...h.parameters?.docs?.source},description:{story:`A freshly-created team: config filled, no roles yet (the empty state).`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [team, setTeam] = React.useState<Team>(baseTeam);
    return <TeamSetup team={team} onSave={patch => setTeam(t => ({
      ...t,
      ...patch
    }))} />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByLabelText('Team name');
    await userEvent.type(name, ' Alpha');
    await userEvent.click(canvas.getByRole('button', {
      name: /save all settings/i
    }));
    // The toast portals to the document body, not the canvas.
    const toast = await within(document.body).findByText('Team settings saved');
    await expect(toast).toBeInTheDocument();
  }
}`,...g.parameters?.docs?.source},description:{story:`Saving a change confirms in place with a success toast and keeps the user on
the page. The play edits the name, saves, and asserts the toast appears.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [team, setTeam] = React.useState<Team>({
      ...baseTeam,
      roles: [{
        id: 'role-account-executive',
        role: 'Account Executive',
        coverage: [{
          id: 'c1',
          colleagueId: '1522904',
          name: 'Priya Raman'
        }]
      }, {
        id: 'role-claims-advisor',
        role: 'Claims Advisor',
        coverage: []
      }]
    });
    return <TeamSetup team={team} onSave={patch => setTeam(t => ({
      ...t,
      ...patch
    }))} />;
  }
}`,..._.parameters?.docs?.source},description:{story:`A configured team with roles and coverage — the populated master-detail.`,..._.parameters?.docs?.description}}}})))()}y();export{h as NewTeam,g as SaveConfirmation,_ as WithRoles,v as __namedExportsOrder,p as default};