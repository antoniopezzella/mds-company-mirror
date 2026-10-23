import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{r as n,t as r}from"./stack-BlYcYnw2.js";import{d as i,o as a}from"./data-C9EjyPFb.js";import{a as o,n as s}from"./chunk-OB3PAWPO-BIyQW01G.js";import{n as c,t as l}from"./TeamCard-DIVaCbk2.js";var u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{o(),c(),i(),n(),u=t(),{expect:d,within:f}=__STORYBOOK_MODULE_TEST__,p={title:`Projects/Colleague Profile/TeamCard`,component:l,tags:[`autodocs`],decorators:[e=>(0,u.jsx)(s,{children:(0,u.jsx)(e,{})})],parameters:{layout:`padded`,docs:{description:{component:'One team on the **My Teams** screen, composed entirely from the shared component set —\n`Card` and its subcomponents, `Badge`, `Chip` and `Button`. Nothing here is new; the card\nrestates neither the title treatment nor the footer border, because `CardTitle` and\n`CardFooter` already own them.\n\n**The top of the card is the link.** Every card led to the same place, so a "Manage Team"\nbutton was a second, smaller target for what the whole card already meant. It is a\n*stretched link*, not a clickable card: the anchor sits on the title and an `::after`\ncovers the region above the footer. A card-wide `<a>` could not legally contain the\nTransfer button, and a card-wide `onClick` would not be a link at all — no middle-click,\nno cmd-click, nothing announced as navigation.\n\nThe membership pill turns **danger** when a team is over capacity, and says so in its\naccessible name. The source screenshot rendered 9-of-7 in the same neutral pill as\nevery other count, which flattens the one fact on the screen worth acting on.'}}}},m=e=>`/colleague-profile/teams/${e}`,h={render:()=>(0,u.jsx)(l,{team:a[0],manageHref:m(a[0].id)}),play:async({canvasElement:e,step:t})=>{let n=f(e);await t(`the title is the link, named for the team alone`,async()=>{let e=n.getByRole(`link`,{name:`AAAA Grant C - Test`});await d(e).toHaveAttribute(`href`,m(a[0].id))}),await t(`no empty footer`,async()=>{await d(n.queryByRole(`button`)).toBeNull()})}},g={render:()=>(0,u.jsx)(l,{team:a[1],manageHref:m(a[1].id),onTransfer:()=>{}}),play:async({canvasElement:e,step:t})=>{let n=f(e);await t(`link and button coexist, neither nested in the other`,async()=>{let e=n.getByRole(`link`,{name:`Design Team`}),t=n.getByRole(`button`,{name:`Transfer Design Team`});await d(e.contains(t)).toBe(!1),await d(t.contains(e)).toBe(!1)})}},_={render:()=>(0,u.jsx)(l,{team:a[1],manageHref:m(a[1].id)}),play:async({canvasElement:e})=>{let t=f(e);await d(t.queryByRole(`button`,{name:/Transfer/})).toBeNull(),await d(t.getByRole(`link`,{name:`Design Team`})).toBeInTheDocument()}},v={render:()=>(0,u.jsx)(l,{team:a[2],manageHref:m(a[2].id)}),play:async({canvasElement:e})=>{let t=f(e);await d(t.getByText(/over capacity/i)).toBeInTheDocument()}},y={render:()=>(0,u.jsx)(r,{gap:4,align:`stretch`,wrap:!1,className:`overflow-x-auto`,children:a.map(e=>(0,u.jsx)(`div`,{className:`w-80 shrink-0`,children:(0,u.jsx)(l,{team:e,manageHref:m(e.id),onTransfer:()=>{}})},e.id))})},b=[`Delegated`,`Transferable`,`TransferNotPermitted`,`OverCapacity`,`AllThree`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <TeamCard team={TEAMS[0]} manageHref={href(TEAMS[0].id)} />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the title is the link, named for the team alone', async () => {
      // The team's name by itself reads correctly in a links list; the rest
      // of the card is description, not part of the label.
      const link = canvas.getByRole('link', {
        name: 'AAAA Grant C - Test'
      });
      await expect(link).toHaveAttribute('href', href(TEAMS[0].id));
    });
    await step('no empty footer', async () => {
      // An empty CardFooter is a stray rule with padding under it.
      await expect(canvas.queryByRole('button')).toBeNull();
    });
  }
}`,...h.parameters?.docs?.source},description:{story:`A delegated team, under capacity. No footer at all — nothing to put in it.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <TeamCard team={TEAMS[1]} manageHref={href(TEAMS[1].id)} onTransfer={() => {}} />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('link and button coexist, neither nested in the other', async () => {
      const link = canvas.getByRole('link', {
        name: 'Design Team'
      });
      const button = canvas.getByRole('button', {
        name: 'Transfer Design Team'
      });
      // The reason the stretch stops short of the footer: an <a> cannot
      // legally contain a <button>, and an overlay covering it would make
      // Transfer unclickable.
      await expect(link.contains(button)).toBe(false);
      await expect(button.contains(link)).toBe(false);
    });
  }
}`,...g.parameters?.docs?.source},description:{story:`Transferable, so the footer carries exactly one button beside the link.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <TeamCard team={TEAMS[1]} manageHref={href(TEAMS[1].id)} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('button', {
      name: /Transfer/
    })).toBeNull();
    await expect(canvas.getByRole('link', {
      name: 'Design Team'
    })).toBeInTheDocument();
  }
}`,..._.parameters?.docs?.source},description:{story:`Transferable, but the current role may not — so the footer is gone.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <TeamCard team={TEAMS[2]} manageHref={href(TEAMS[2].id)} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/over capacity/i)).toBeInTheDocument();
  }
}`,...v.parameters?.docs?.source},description:{story:`**Over capacity.** 9 members against 7 places. The count carries the danger
tone *and* spells the condition out, so it does not rely on colour alone.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Inline gap={4} align="stretch" wrap={false} className="overflow-x-auto">
      {TEAMS.map(team => <div key={team.id} className="w-80 shrink-0">
          <TeamCard team={team} manageHref={href(team.id)} onTransfer={() => {}} />
        </div>)}
    </Inline>
}`,...y.parameters?.docs?.source},description:{story:`All three side by side, at the grid width the page uses.`,...y.parameters?.docs?.description}}}})))()}x();export{y as AllThree,h as Delegated,v as OverCapacity,_ as TransferNotPermitted,g as Transferable,b as __namedExportsOrder,p as default};