import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./ClientPivotView-BJQjt39B.js";var r,i,a,o,s,c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{t(),{expect:r,screen:i,userEvent:a,waitFor:o,within:s}=__STORYBOOK_MODULE_TEST__,c={title:`Projects/Colleague Profile/ClientPivotView`,component:n,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"The **Client Pivot View** tab on Manage Team — the same assignments as Member View,\npivoted on the client instead of the person.\n\n**Why it is a separate view rather than a grouping toggle.** Pivoting on the client\ncrosses team boundaries: a client is served by whoever is assigned to it, and those\npeople reach it through their *own* teams. So the right-hand table legitimately lists\ncolleagues from other teams, each labelled with the team the assignment came through.\nMember View cannot show that — it is scoped to this team's roster by definition.\n\n**No new components.** `Card`, `InputGroup`, `Avatar`, `Badge`, `Button`, `Pagination`,\n`ToggleGroup`, `Table` primitives, `Empty`, `Stack`/`Inline`. The two parts that look\nbespoke are not: the selectable client card is a `Card` with a left accent border, and\nLive/History is a `ToggleGroup` — the right primitive precisely because the two options\nare *state*, not actions."}}}},l={},u={play:async({canvasElement:e})=>{let t=s(e);await r(await t.findByText(`2 members`)).toBeInTheDocument(),await a.click(t.getByRole(`button`,{name:/Cleco Corporate/i})),await r(await t.findByText(`3 members`)).toBeInTheDocument(),await r(t.getByText(`AAAA Grant C - Test`)).toBeInTheDocument()}},d={args:{defaultClientCn:`CN101374431`},play:async({canvasElement:e})=>{let t=s(e);await r(await t.findByText(`No one is assigned`)).toBeInTheDocument(),await r(t.getByText(`0 members`)).toBeInTheDocument()}},f={play:async({canvasElement:e})=>{let t=s(e),n=t.getByLabelText(`Search clients by CN or name`);await a.type(n,`CN101188148`),await r(await t.findByRole(`button`,{name:/FMC Corporation/i})).toBeInTheDocument(),await r(t.queryByRole(`button`,{name:/Centrica/i})).not.toBeInTheDocument(),await a.clear(n),await a.type(n,`no-such-client`),await r(await t.findByText(/No client matches/)).toBeInTheDocument()}},p={args:{defaultClientCn:`CN101188033`},play:async({canvasElement:e})=>{let t=s(e),n=()=>Array.from(e.querySelectorAll(`table tbody tr td:first-child`)).map(e=>(e.textContent??``).match(/[A-Z][a-z]+ [A-Z][a-z]+/)?.[0]??``);await r(await t.findByText(`3 members`)).toBeInTheDocument();let c=n();await a.click(t.getAllByRole(`button`,{name:/Team member/i})[0]),await a.click(await i.findByRole(`menuitemcheckbox`,{name:/Desc/i})),await o(()=>r(n()).toEqual([...c].reverse())),await a.keyboard(`{Escape}`),await o(()=>r(document.querySelector(`[data-aria-hidden="true"]`)).toBeNull())}},m={play:async({canvasElement:e})=>{let t=s(e);await a.click(t.getByRole(`radio`,{name:`History`})),await r(await t.findByText(`History not in this rebuild`)).toBeInTheDocument()}},h=[`Default`,`SelectingAClient`,`ClientWithNoAssignments`,`SearchingByCn`,`SortingTheAssignments`,`HistoryNotBuilt`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('2 members')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: /Cleco Corporate/i
    }));
    await expect(await canvas.findByText('3 members')).toBeInTheDocument();
    // The assignment that proves the point: a member reached through a team
    // other than the one being managed.
    await expect(canvas.getByText('AAAA Grant C - Test')).toBeInTheDocument();
  }
}`,...u.parameters?.docs?.source},description:{story:`Selecting a client repoints the right-hand panel. Cleco is served by three
colleagues across two different teams, which is the cross-team case this
view exists for.`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    defaultClientCn: 'CN101374431'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('No one is assigned')).toBeInTheDocument();
    await expect(canvas.getByText('0 members')).toBeInTheDocument();
  }
}`,...d.parameters?.docs?.source},description:{story:`A client with no one assigned. Vulcan is deliberately unassigned in the
fixture — without it this state would never be rendered, and an empty state
nobody renders is an empty state nobody has checked.`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const search = canvas.getByLabelText('Search clients by CN or name');
    await userEvent.type(search, 'CN101188148');
    await expect(await canvas.findByRole('button', {
      name: /FMC Corporation/i
    })).toBeInTheDocument();
    await expect(canvas.queryByRole('button', {
      name: /Centrica/i
    })).not.toBeInTheDocument();
    await userEvent.clear(search);
    await userEvent.type(search, 'no-such-client');
    await expect(await canvas.findByText(/No client matches/)).toBeInTheDocument();
  }
}`,...f.parameters?.docs?.source},description:{story:`Search matches CN or name, because people search by either — and the CN is
the thing they paste in from another system.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    defaultClientCn: 'CN101188033'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const names = () => Array.from(canvasElement.querySelectorAll('table tbody tr td:first-child')).map(td => (td.textContent ?? '').match(/[A-Z][a-z]+ [A-Z][a-z]+/)?.[0] ?? '');
    await expect(await canvas.findByText('3 members')).toBeInTheDocument();
    const ascending = names();
    await userEvent.click(canvas.getAllByRole('button', {
      name: /Team member/i
    })[0]);
    await userEvent.click(await screen.findByRole('menuitemcheckbox', {
      name: /Desc/i
    }));
    await waitFor(() => expect(names()).toEqual([...ascending].reverse()));

    // The menu must be dismissed before the story settles. A checkbox item
    // does NOT close a Radix dropdown, and while it is open Radix marks the
    // rest of the page \`aria-hidden\` — which the axe gate correctly fails as
    // \`aria-hidden-focus\`, because that hidden subtree still holds focusable
    // controls. Leaving it open makes a passing screen look inaccessible.
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(document.querySelector('[data-aria-hidden="true"]')).toBeNull());
  }
}`,...p.parameters?.docs?.source},description:{story:'The assignments table is `DataTable`, so its headers sort. Cleco is the\nuseful fixture: three colleagues, so an ordering is actually observable.\n\nNote the menu items are `menuitemcheckbox`, not `menuitem` — a check for\n`menuitem` matches only "Hide" and makes a working sort look broken.',...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', {
      name: 'History'
    }));
    await expect(await canvas.findByText('History not in this rebuild')).toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source},description:{story:`History is navigation that exists on the source screen but is not part of
this rebuild. It says so, rather than rendering invented revisions.`,...m.parameters?.docs?.description}}}})))()}g();export{d as ClientWithNoAssignments,l as Default,m as HistoryNotBuilt,f as SearchingByCn,u as SelectingAClient,p as SortingTheAssignments,h as __namedExportsOrder,c as default};