import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./roles-DNqHlq35.js";import{n as o,t as s}from"./createLucideIcon-DC6xoXt7.js";import{n as c,t as l}from"./plus-DkAhYuaT.js";import{n as u,t as d}from"./button-DatWLSj0.js";import{n as f,t as p}from"./input-Bj4eDxQ0.js";import{t as m,u as h}from"./select-BbcdR6zw.js";import{n as g,r as ee,t as te}from"./stack-BlYcYnw2.js";import{r as ne,t as _}from"./page-shell-DbkBo_3K.js";import{c as v,d as y}from"./data-C9EjyPFb.js";import{a as b,n as x,o as S}from"./chunk-OB3PAWPO-BIyQW01G.js";import{n as C,r as w,t as T}from"./TeamsContext-CYaLysqD.js";import{n as E,t as D}from"./CreateTeamDrawer-ejlhKcKM.js";import{n as O,t as k}from"./TeamCard-DIVaCbk2.js";import{i as A,n as j,r as re,t as ie}from"./ColleagueShell-DMCAGmVj.js";var M,N;function P(){return(P=t((()=>{o(),M=[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}],[`line`,{x1:`19`,x2:`19`,y1:`8`,y2:`14`,key:`1bvyxn`}],[`line`,{x1:`22`,x2:`16`,y1:`11`,y2:`11`,key:`1shjgl`}]],N=s(`user-plus`,M)})))()}function F(){return(0,R.jsx)(ie,{currentPath:`/colleague-profile`,children:(0,R.jsx)(I,{})})}function I(){let e=S(),{can:t}=A(),{teams:n}=w(),[r,i]=L.useState(!1),[o,s]=L.useState(`all`),[c,u]=L.useState(``),f=L.useMemo(()=>{let e=c.trim().toLowerCase();return n.filter(t=>o===`delegated`&&!t.delegatedBy||o===`owned`&&t.delegatedBy?!1:!e||t.name.toLowerCase().includes(e))},[n,c,o]),h=t=>e(`/colleague-profile/teams/${t.id}`);return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(_,{title:`My Teams`,description:`Teams you manage — ${n.length} teams`,actions:(0,R.jsxs)(R.Fragment,{children:[t(`team:delegate`)&&(0,R.jsx)(d,{variant:`secondary`,size:`md`,startIcon:(0,R.jsx)(N,{className:`size-4`}),children:`Delegate Team`}),t(`team:create`)&&(0,R.jsx)(d,{variant:`primary`,size:`md`,startIcon:(0,R.jsx)(l,{className:`size-4`}),onClick:()=>i(!0),children:`Create Team`})]})}),(0,R.jsxs)(g,{gap:6,className:`mt-6`,children:[(0,R.jsxs)(te,{gap:3,align:`end`,children:[(0,R.jsx)(p,{size:`md`,value:c,onChange:e=>u(e.target.value),placeholder:`Search by team name`,"aria-label":`Search by team name`,className:`w-64`}),(0,R.jsx)(m,{options:v,value:o,onChange:s,size:`md`,"aria-label":`Filter teams`})]}),(0,R.jsxs)(`section`,{"aria-labelledby":`teams-heading`,children:[(0,R.jsx)(`h2`,{id:`teams-heading`,className:`sr-only`,children:`Teams you manage`}),f.length===0?(0,R.jsxs)(`p`,{className:`text-sm`,style:{color:a(`fg.neutral.subtle`)},children:[`No teams match “`,c,`”.`]}):(0,R.jsx)(`ul`,{className:`grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 xl:grid-cols-3`,children:f.map(e=>(0,R.jsx)(`li`,{children:(0,R.jsx)(k,{team:e,manageHref:`/colleague-profile/teams/${e.id}`,onTransfer:t(`team:transfer`)?h:void 0})},e.id))})]})]}),(0,R.jsx)(D,{open:r,onOpenChange:i})]})}var L,R;function z(){return(z=t((()=>{L=e(n(),1),b(),c(),P(),ne(),u(),f(),h(),ee(),i(),j(),O(),E(),C(),re(),y(),R=r(),F.__docgenInfo={description:"The page renders the shell; the CONTENT reads the role.\n\n`RoleProvider` lives inside `ColleagueShell`, so anything calling\n`useColleagueRole` has to be a descendant of it — the component that\nrenders the shell is not. Splitting the body out is what puts the hook on\nthe right side of that boundary.",methods:[],displayName:`ColleagueProfile`}})))()}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{b(),z(),C(),B=r(),{expect:V,screen:H,userEvent:U,waitFor:W,within:G}=__STORYBOOK_MODULE_TEST__,K={title:`Projects/Colleague Profile/My Teams`,component:F,tags:[`autodocs`],decorators:[e=>(0,B.jsx)(x,{initialEntries:[`/colleague-profile`],children:(0,B.jsx)(T,{children:(0,B.jsx)(e,{})})})],parameters:{layout:`fullscreen`,docs:{description:{component:`The **Colleague Profile** "My Teams" screen, rebuilt from a UAT screenshot using only
the coded design system.

**The screenshot supplied the information architecture, not the visual design.** Its own
chrome — a white header with a two-line wordmark, a rail with a pinned Switch Role /
Notifications / Sign Out block — has no equivalent here, and inventing one was out of
scope. So identity, notifications and sign-out sit in the navy \`Header\`, which is where
this system already puts them, and the rail uses the sky-blue scheme.

**One honest compromise:** "Switch Role" is app-level state with nowhere to live —
neither \`Header\` nor \`SideNavigation\` exposes a slot — so it sits in the page toolbar
among the page-level filters. The fix is an actions slot on \`Header\`, deliberately not
built here.`}}}},q={play:async({canvasElement:e,step:t})=>{let n=G(e);await t(`the page states what it is and how many`,async()=>{await V(n.getByRole(`heading`,{name:`My Teams`,level:1})).toBeInTheDocument(),await V(n.getByText(/3 teams/)).toBeInTheDocument()}),await t(`all three teams render`,async()=>{let e=G(n.getByRole(`region`,{name:`Teams you manage`}));await V(e.getByText(`AAAA Grant C - Test`)).toBeInTheDocument(),await V(e.getByText(`Design Team`)).toBeInTheDocument(),await V(e.getByText(`Justin Johnson - US/C Construction`)).toBeInTheDocument()}),await t(`the over-capacity team is flagged, not just coloured`,async()=>{await V(n.getByText(/over capacity/i)).toBeInTheDocument()})}},J={play:async({canvasElement:e,step:t})=>{let n=G(e),r=n.getByRole(`textbox`,{name:`Search by team name`});await t(`narrow to one team`,async()=>{await U.type(r,`Design`);let e=G(n.getByRole(`region`,{name:`Teams you manage`}));await V(e.getByText(`Design Team`)).toBeInTheDocument(),await V(e.queryByText(`AAAA Grant C - Test`)).toBeNull()}),await t(`an empty result says so rather than showing a blank grid`,async()=>{await U.clear(r),await U.type(r,`zzzz`),await V(await n.findByText(/No teams match/)).toBeInTheDocument()})}},Y={play:async({canvasElement:e,step:t})=>{let n=G(e);await t(`the toolbar controls are all named`,async()=>{await V(n.getByRole(`textbox`,{name:`Search by team name`})).toBeInTheDocument(),await V(n.getByRole(`combobox`,{name:`Filter teams`})).toBeInTheDocument(),await V(n.queryByRole(`combobox`,{name:/Viewing as/})).toBeNull()}),await t(`each card IS the link to its team`,async()=>{await V(n.getByRole(`link`,{name:`Design Team`})).toHaveAttribute(`href`,`/colleague-profile/teams/design-team`)}),await t(`Transfer remains a separate control, not nested in the link`,async()=>{let e=n.getByRole(`link`,{name:`Design Team`}),t=n.getByRole(`button`,{name:`Transfer Design Team`});await V(e.contains(t)).toBe(!1)})}},X={play:async({canvasElement:e,step:t})=>{let n=G(e);await t(`it names the control and states the current role`,async()=>{await V(n.getByRole(`button`,{name:/Acting as Team Manager\. Switch role/})).toBeInTheDocument()}),await t(`it lists every role with what each can do`,async()=>{await U.click(n.getByRole(`button`,{name:/Switch role/}));let e=await H.findByRole(`menu`);await V(G(e).getByText(`Team Member`)).toBeInTheDocument(),await V(G(e).getByText(`Oversight Leader`)).toBeInTheDocument(),await V(G(e).getByText(/View your teams and who is on them/)).toBeInTheDocument(),await V(G(e).getByText(`⌘1`)).toBeInTheDocument()}),await t(`close it before the run ends`,async()=>{await U.keyboard(`{Escape}`),await W(()=>V(H.queryByRole(`menu`)).toBeNull())})}},Z={play:async({canvasElement:e,step:t})=>{let n=G(e);await t(`a Team Manager sees both actions`,async()=>{await V(n.getByRole(`button`,{name:`Create Team`})).toBeInTheDocument(),await V(n.getByRole(`button`,{name:`Delegate Team`})).toBeInTheDocument()}),await t(`switch to Team Member`,async()=>{await U.click(n.getByRole(`button`,{name:/Switch role/}));let e=await H.findByRole(`menu`);await U.click(G(e).getByText(`Team Member`)),await W(()=>V(H.queryByRole(`menu`)).toBeNull())}),await t(`the actions are gone, and the header agrees`,async()=>{await V(n.queryByRole(`button`,{name:`Create Team`})).toBeNull(),await V(n.queryByRole(`button`,{name:`Delegate Team`})).toBeNull(),await V(n.getByRole(`button`,{name:/Acting as Team Member/})).toBeInTheDocument()})}},Q=[`Default`,`Searching`,`KeyboardOrder`,`RoleSwitcherInRail`,`RoleGatesTheActions`],q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the page states what it is and how many', async () => {
      await expect(canvas.getByRole('heading', {
        name: 'My Teams',
        level: 1
      })).toBeInTheDocument();
      await expect(canvas.getByText(/3 teams/)).toBeInTheDocument();
    });
    await step('all three teams render', async () => {
      // Scoped to the grid: the rail's team switcher shows the current team's
      // name too, so an unscoped getByText now matches twice.
      const grid = within(canvas.getByRole('region', {
        name: 'Teams you manage'
      }));
      await expect(grid.getByText('AAAA Grant C - Test')).toBeInTheDocument();
      await expect(grid.getByText('Design Team')).toBeInTheDocument();
      await expect(grid.getByText('Justin Johnson - US/C Construction')).toBeInTheDocument();
    });
    await step('the over-capacity team is flagged, not just coloured', async () => {
      await expect(canvas.getByText(/over capacity/i)).toBeInTheDocument();
    });
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const search = canvas.getByRole('textbox', {
      name: 'Search by team name'
    });
    await step('narrow to one team', async () => {
      await userEvent.type(search, 'Design');
      const grid = within(canvas.getByRole('region', {
        name: 'Teams you manage'
      }));
      await expect(grid.getByText('Design Team')).toBeInTheDocument();
      // Scoped: the switcher still shows the ACTIVE team regardless of the
      // grid's filter, which is correct — filtering a list should not change
      // which team you are managing.
      await expect(grid.queryByText('AAAA Grant C - Test')).toBeNull();
    });
    await step('an empty result says so rather than showing a blank grid', async () => {
      await userEvent.clear(search);
      await userEvent.type(search, 'zzzz');
      await expect(await canvas.findByText(/No teams match/)).toBeInTheDocument();
    });
  }
}`,...J.parameters?.docs?.source},description:{story:`Searching narrows the grid and says so when nothing is left.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the toolbar controls are all named', async () => {
      await expect(canvas.getByRole('textbox', {
        name: 'Search by team name'
      })).toBeInTheDocument();
      // A bare DSSelect trigger is a combobox and takes no name from its
      // content, so both of these need an explicit one.
      await expect(canvas.getByRole('combobox', {
        name: 'Filter teams'
      })).toBeInTheDocument();
      // "Viewing as" is gone from the toolbar — the role switcher lives in
      // the rail now, which is where app-level state belongs.
      await expect(canvas.queryByRole('combobox', {
        name: /Viewing as/
      })).toBeNull();
    });
    await step('each card IS the link to its team', async () => {
      // Replaced the old "Manage Team" button: every card led to the same
      // place, so a button was a second, smaller target for what the whole
      // card already meant.
      await expect(canvas.getByRole('link', {
        name: 'Design Team'
      })).toHaveAttribute('href', '/colleague-profile/teams/design-team');
    });
    await step('Transfer remains a separate control, not nested in the link', async () => {
      const link = canvas.getByRole('link', {
        name: 'Design Team'
      });
      const transfer = canvas.getByRole('button', {
        name: 'Transfer Design Team'
      });
      await expect(link.contains(transfer)).toBe(false);
    });
  }
}`,...Y.parameters?.docs?.source},description:{story:`Every control reachable by keyboard, in visual order.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('it names the control and states the current role', async () => {
      await expect(canvas.getByRole('button', {
        name: /Acting as Team Manager\\. Switch role/
      })).toBeInTheDocument();
    });
    await step('it lists every role with what each can do', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: /Switch role/
      }));
      const menu = await screen.findByRole('menu');
      await expect(within(menu).getByText('Team Member')).toBeInTheDocument();
      await expect(within(menu).getByText('Oversight Leader')).toBeInTheDocument();
      // Saying what a role can do beats making the user switch to find out.
      await expect(within(menu).getByText(/View your teams and who is on them/)).toBeInTheDocument();
      await expect(within(menu).getByText('⌘1')).toBeInTheDocument();
    });
    await step('close it before the run ends', async () => {
      // An open Radix menu puts aria-hidden on the rest of the page, so a play
      // function that stops here fails axe's aria-hidden-focus.
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    });
  }
}`,...X.parameters?.docs?.source},description:{story:`The rail carries the ROLE switcher, and ⌘1…⌘3 actually switch.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('a Team Manager sees both actions', async () => {
      await expect(canvas.getByRole('button', {
        name: 'Create Team'
      })).toBeInTheDocument();
      await expect(canvas.getByRole('button', {
        name: 'Delegate Team'
      })).toBeInTheDocument();
    });
    await step('switch to Team Member', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: /Switch role/
      }));
      const menu = await screen.findByRole('menu');
      await userEvent.click(within(menu).getByText('Team Member'));
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    });
    await step('the actions are gone, and the header agrees', async () => {
      await expect(canvas.queryByRole('button', {
        name: 'Create Team'
      })).toBeNull();
      await expect(canvas.queryByRole('button', {
        name: 'Delegate Team'
      })).toBeNull();
      // The header must follow the switcher — two places disagreeing about
      // the active role would leave the user guessing which one the screen
      // is obeying.
      await expect(canvas.getByRole('button', {
        name: /Acting as Team Member/
      })).toBeInTheDocument();
    });
  }
}`,...Z.parameters?.docs?.source},description:{story:`**Switching role changes what the page offers.** A Team Member cannot
create or delegate, so those buttons are not there — hidden rather than
greyed out, because a page-level action a role can never perform is not a
locked door, it is a door that does not exist.`,...Z.parameters?.docs?.description}}}})))()}$();export{q as Default,Y as KeyboardOrder,Z as RoleGatesTheActions,X as RoleSwitcherInRail,J as Searching,Q as __namedExportsOrder,K as default};