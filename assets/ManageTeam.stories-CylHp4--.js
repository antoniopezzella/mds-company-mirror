import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./roles-DNqHlq35.js";import{n as o,t as s}from"./utils-BGgJixJd.js";import{n as c,t as l}from"./badge-BJRi19uA.js";import{n as u,t as ee}from"./check-D0zZFjjg.js";import{r as d,t as te}from"./checkbox-DdklOp-r.js";import{n as f,t as p}from"./ClientPivotView-BJQjt39B.js";import{n as m,t as ne}from"./plus-DkAhYuaT.js";import{n as h,t as re}from"./trash-2-DK4D1wBt.js";import{i as g,n as ie,r as ae,t as oe}from"./TeamSetup-Bl1w6BCR.js";import{n as se,t as ce}from"./x-CT1Lp-Vd.js";import{n as _,t as v}from"./button-DatWLSj0.js";import{a as le,i as ue,o as de,r as fe,s as pe,t as me}from"./empty-cIdHfhKJ.js";import{l as y,u as b}from"./dialog-DF47Ek89.js";import{r as he,t as ge}from"./data-table-BKV54IPo.js";import{n as _e,t as ve}from"./input-Bj4eDxQ0.js";import{n as x,r as S,t as C}from"./stack-BlYcYnw2.js";import{n as ye,t as w}from"./avatar-BzHOf768.js";import{r as be,t as xe}from"./page-shell-DbkBo_3K.js";import{n as Se,t as Ce}from"./tabs-sotmQBZ-.js";import{d as T,l as E,r as we,s as D}from"./data-C9EjyPFb.js";import{a as O,i as Te,n as Ee,r as De,s as Oe}from"./chunk-OB3PAWPO-BIyQW01G.js";import{n as k,r as A,t as ke}from"./TeamsContext-CYaLysqD.js";import{a as Ae,i as je,n as Me,o as Ne,r as Pe,t as Fe}from"./ColleagueShell-DMCAGmVj.js";function Ie({member:e,onClose:t,onRemove:n}){let r=r=>{e&&n(e,r),t()};return(0,j.jsxs)(y,{open:!!e,onClose:t,size:`md`,title:`Remove team member`,onOpenAutoFocus:e=>{e.preventDefault(),e.currentTarget.focus()},footer:(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(v,{variant:`secondary`,destructive:!0,size:`md`,onClick:()=>r(`member-only`),children:`Remove Member Only`}),(0,j.jsx)(v,{variant:`primary`,destructive:!0,size:`md`,onClick:()=>r(`member-and-assignments`),children:`Remove Member and Assignments`})]}),children:[(0,j.jsxs)(`p`,{children:[`Remove `,(0,j.jsx)(`strong`,{children:e?.name}),` from your team. Choose whether to keep or clear their client allocations.`]}),!!e&&e.clients>0&&(0,j.jsxs)(`p`,{className:`mt-2 text-sm`,children:[e.name.split(` `)[0],` currently holds`,` `,(0,j.jsxs)(`strong`,{children:[e.clients,` client`,e.clients===1?``:`s`]}),`. Removing the assignments as well leaves them unallocated.`]})]})}var j;function M(){return(M=t((()=>{n(),b(),_(),j=r(),Ie.__docgenInfo={description:``,methods:[],displayName:`RemoveMemberDialog`,props:{member:{required:!0,tsType:{name:`union`,raw:`TeamMember | null`,elements:[{name:`TeamMember`},{name:`null`}]},description:`The member being removed, or null when the dialog is closed.`},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRemove:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(member: TeamMember, outcome: RemoveMemberOutcome) => void`,signature:{arguments:[{type:{name:`TeamMember`},name:`member`},{type:{name:`union`,raw:`'member-only' | 'member-and-assignments'`,elements:[{name:`literal`,value:`'member-only'`},{name:`literal`,value:`'member-and-assignments'`}]},name:`outcome`}],return:{name:`void`}}},description:``}}}})))()}function N({open:e,onClose:t,existingMemberIds:n,onAdd:r}){let[i,o]=P.useState(``),[c,l]=P.useState([]),[u,d]=P.useState(0),f=P.useRef(null);P.useEffect(()=>{e&&(o(``),l([]),d(0))},[e]);let p=P.useMemo(()=>new Set(n),[n]),m=P.useMemo(()=>{let e=i.trim().toLowerCase();return e?we.filter(t=>t.name.toLowerCase().includes(e)||t.email.toLowerCase().includes(e)):[]},[i]);P.useEffect(()=>d(0),[i]),P.useEffect(()=>{let e=f.current,t=e?.querySelector(`#add-member-${u}`);if(!e||!t)return;let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.top<n.top?e.scrollTop-=n.top-r.top:r.bottom>n.bottom&&(e.scrollTop+=r.bottom-n.bottom)},[u,i]);let ne=e=>c.some(t=>t.id===e.id),h=e=>{p.has(e.id)||l(t=>t.some(t=>t.id===e.id)?t.filter(t=>t.id!==e.id):[...t,e])},re=e=>{m.length&&(e.key===`ArrowDown`?(e.preventDefault(),d(e=>(e+1)%m.length)):e.key===`ArrowUp`?(e.preventDefault(),d(e=>(e-1+m.length)%m.length)):e.key===`Enter`&&(e.preventDefault(),h(m[u])))},g=a(`fg.neutral.subtle`);return(0,F.jsx)(y,{open:e,onClose:t,size:`md`,title:`Add team members`,footer:(0,F.jsx)(v,{variant:`primary`,size:`md`,fullWidth:!0,disabled:c.length===0,onClick:()=>{r(c),t()},children:c.length===0?`Add members to team`:`Add ${c.length} member${c.length===1?``:`s`} to team`}),children:(0,F.jsxs)(x,{gap:4,children:[(0,F.jsxs)(`div`,{children:[(0,F.jsx)(ve,{value:i,onChange:e=>o(e.target.value),onKeyDown:re,placeholder:`Search by name or email…`,"aria-label":`Search the Workday directory by name or email`,role:`combobox`,"aria-expanded":m.length>0,"aria-controls":`add-member-results`,"aria-activedescendant":m.length?`add-member-${u}`:void 0,"aria-autocomplete":`list`}),(0,F.jsx)(`p`,{className:`mt-1.5 text-xs`,style:{color:g},children:`Searches Marsh, Mercer and Oliver Wyman.`})]}),i.trim()&&m.length===0&&(0,F.jsxs)(`p`,{className:`text-sm`,style:{color:g},children:[`No colleagues found for “`,i.trim(),`”.`]}),m.length>0&&(0,F.jsx)(`div`,{id:`add-member-results`,ref:f,role:`listbox`,"aria-label":`Directory results`,"aria-multiselectable":`true`,className:`max-h-56 overflow-y-auto rounded-lg border`,style:{borderColor:a(`border.default`)},children:m.map((e,t)=>{let n=p.has(e.id),r=ne(e);return(0,F.jsxs)(`div`,{id:`add-member-${t}`,role:`option`,tabIndex:-1,"aria-selected":r,"aria-disabled":n||void 0,onMouseEnter:()=>d(t),onMouseDown:t=>{t.preventDefault(),h(e)},className:s(`flex items-center gap-3 px-3 py-2.5`,n?`cursor-not-allowed opacity-60`:`cursor-pointer`),style:{backgroundColor:t===u&&!n||r?a(`bg.neutral.subtle`):void 0},children:[(0,F.jsx)(w,{initials:e.initials,size:`sm`,tone:r?`primary`:`default`,alt:``}),(0,F.jsxs)(`span`,{className:`min-w-0 flex-1`,children:[(0,F.jsx)(`span`,{className:`block truncate text-sm font-semibold`,children:e.name}),(0,F.jsx)(`span`,{className:`block truncate text-xs`,style:{color:g},children:e.email}),(0,F.jsxs)(`span`,{className:`block truncate text-xs`,style:{color:g},children:[e.jobTitle,` · `,e.location]})]}),n?(0,F.jsxs)(`span`,{className:`inline-flex shrink-0 items-center gap-1 text-xs`,style:{color:g},children:[(0,F.jsx)(ee,{className:`size-3.5`,"aria-hidden":`true`}),`Already a member`]}):(0,F.jsx)(te,{checked:r,tabIndex:-1,"aria-hidden":`true`,className:`pointer-events-none shrink-0`})]},e.id)})}),c.length>0&&(0,F.jsxs)(x,{gap:2,children:[(0,F.jsxs)(`p`,{className:`text-xs font-semibold uppercase tracking-wide`,style:{color:g},children:[c.length,` member`,c.length===1?``:`s`,` queued to add`]}),c.map(e=>(0,F.jsxs)(`div`,{className:`flex items-center gap-3 rounded-lg border px-3 py-2`,style:{borderColor:a(`border.subtle`)},children:[(0,F.jsx)(w,{initials:e.initials,size:`sm`,tone:`primary`,alt:``}),(0,F.jsxs)(`span`,{className:`min-w-0 flex-1`,children:[(0,F.jsx)(`span`,{className:`block truncate text-sm font-semibold`,children:e.name}),(0,F.jsxs)(`span`,{className:`block truncate text-xs`,style:{color:g},children:[e.jobTitle,` · `,e.location]})]}),(0,F.jsx)(v,{variant:`ghost`,size:`sm`,iconOnly:!0,icon:(0,F.jsx)(ce,{className:`size-4`,"aria-hidden":`true`}),"aria-label":`Remove ${e.name} from the queue`,onClick:()=>h(e)})]},e.id))]}),(0,F.jsx)(`div`,{role:`status`,"aria-live":`polite`,className:`sr-only`,children:c.length?`${c.length} member${c.length===1?``:`s`} queued to add.`:``})]})})}var P,F;function I(){return(I=t((()=>{P=e(n(),1),u(),se(),b(),_(),ye(),d(),_e(),S(),i(),o(),T(),F=r(),N.__docgenInfo={description:``,methods:[],displayName:`AddMemberDialog`,props:{open:{required:!0,tsType:{name:`boolean`},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},existingMemberIds:{required:!0,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Colleague ids already on the team — shown, but not selectable.`},onAdd:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(colleagues: DirectoryColleague[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`DirectoryColleague`}],raw:`DirectoryColleague[]`},name:`colleagues`}],return:{name:`void`}}},description:``}}}})))()}function Le({member:e}){return(0,z.jsxs)(C,{gap:3,wrap:!1,children:[(0,z.jsx)(w,{initials:e.initials,size:`sm`,tone:`primary`,alt:``}),(0,z.jsxs)(x,{gap:0,children:[(0,z.jsx)(`span`,{className:`font-semibold`,children:e.name}),(0,z.jsxs)(`span`,{className:`text-xs`,style:{color:a(`fg.neutral.subtle`)},children:[`ID: `,e.colleagueId]})]})]})}function Re({member:e}){if(e.roles.length===0)return(0,z.jsxs)(`span`,{style:{color:a(`fg.neutral.subtle`)},children:[(0,z.jsx)(`span`,{"aria-hidden":`true`,children:`—`}),(0,z.jsx)(`span`,{className:`sr-only`,children:`No roles assigned`})]});let t=e.roles.slice(0,B),n=e.roleCount-t.length;return(0,z.jsxs)(C,{gap:1,children:[t.map(e=>(0,z.jsx)(l,{tone:`info`,variant:`soft`,size:`sm`,children:e},e)),n>0&&(0,z.jsxs)(l,{tone:`default`,variant:`soft`,size:`sm`,children:[(0,z.jsxs)(`span`,{"aria-hidden":`true`,children:[`+`,n]}),(0,z.jsxs)(`span`,{className:`sr-only`,children:[`and `,n,` more roles`]})]})]})}function L(){let{teamId:e}=Oe(),{getTeam:t,teams:n}=A(),r=e&&t(e)||n[0];return(0,z.jsx)(Fe,{currentPath:`/colleague-profile`,children:(0,z.jsx)(ze,{team:r})})}function ze({team:e}){let{can:t}=je(),{updateTeam:n}=A(),r=t(`member:remove`),[i,o]=R.useState(null),[s,c]=R.useState(!1),l=R.useMemo(()=>[{accessorKey:`name`,header:`Team member`,cell:({row:e})=>(0,z.jsx)(Le,{member:e.original})},{accessorKey:`location`,header:`Location`,cell:({row:e})=>(0,z.jsxs)(x,{gap:0,children:[(0,z.jsx)(`span`,{children:e.original.location}),e.original.locationDetail&&(0,z.jsx)(`span`,{className:`text-xs`,style:{color:a(`fg.neutral.subtle`)},children:e.original.locationDetail})]})},{accessorKey:`jobTitle`,header:`Job title`,cell:({row:e})=>(0,z.jsxs)(x,{gap:0,children:[(0,z.jsx)(`span`,{children:e.original.jobTitle}),(0,z.jsx)(`span`,{className:`text-xs`,style:{color:a(`fg.neutral.subtle`)},children:e.original.jobCode})]})},{id:`roles`,header:`Role`,enableSorting:!1,cell:({row:e})=>(0,z.jsx)(Re,{member:e.original})},{accessorKey:`clients`,header:`Clients`,meta:{type:`number`}},{id:`actions`,header:()=>(0,z.jsx)(`span`,{className:`sr-only`,children:`Actions`}),meta:{align:`right`},enableSorting:!1,enableHiding:!1,enableResizing:!1,cell:({row:e})=>{let t=e.original;return(0,z.jsx)(v,{variant:`ghost`,size:`sm`,iconOnly:!0,icon:(0,z.jsx)(re,{className:`size-4`,"aria-hidden":`true`}),"aria-label":`Remove from team ${t.name}`,disabled:!r,title:r?void 0:Ae(`member:remove`),style:{color:a(`fg.critical`)},onClick:()=>o(t)})}}],[r]),u=[{id:`members`,title:`Member View`,content:(0,z.jsx)(ge,{columns:l,data:E,searchKey:`name`,searchPlaceholder:`Search by name, title, or location...`,enableExport:!0,exportFilename:`${e.name} members`,pinFirstColumn:!1})},{id:`clients`,title:`Client Pivot View`,content:(0,z.jsx)(p,{})},{id:`setup`,title:`Team Setup`,content:(0,z.jsx)(oe,{team:e,onSave:t=>n(e.id,t)})},{id:`delegate`,title:`Delegate`,content:((e,t)=>(0,z.jsx)(me,{className:`max-w-md`,children:(0,z.jsxs)(ue,{children:[(0,z.jsx)(le,{variant:`icon`,children:(0,z.jsx)(ae,{})}),(0,z.jsx)(de,{children:e}),(0,z.jsx)(fe,{children:t})]})}))(`Delegation not in this rebuild`,`Hand management of this team to another colleague.`)}];return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(xe,{title:e.name,description:`${E.length} active team members · ${D} Clients`,actions:t(`member:add`)?(0,z.jsx)(v,{variant:`primary`,size:`md`,startIcon:(0,z.jsx)(ne,{className:`size-4`}),onClick:()=>c(!0),children:`Add Member`}):void 0}),(0,z.jsx)(`div`,{className:`mt-6`,children:(0,z.jsx)(Ce,{tabs:u,defaultActiveId:`members`})}),(0,z.jsx)(N,{open:s,onClose:()=>c(!1),existingMemberIds:E.map(e=>e.id),onAdd:()=>void 0}),(0,z.jsx)(Ie,{member:i,onClose:()=>o(null),onRemove:()=>void 0})]})}var R,z,B;function V(){return(V=t((()=>{R=e(n(),1),O(),m(),h(),g(),be(),_(),ye(),c(),Se(),he(),pe(),S(),i(),Me(),M(),I(),f(),ie(),k(),Pe(),Ne(),T(),z=r(),B=3,L.__docgenInfo={description:`See the note in ColleagueProfile: the content must sit INSIDE the shell's
 RoleProvider, so the component that renders the shell cannot read the role.`,methods:[],displayName:`ManageTeam`}})))()}var H,U,W,G,K,q,J,Y,X,Z,Q,$,Be;function Ve(){return(Ve=t((()=>{O(),V(),T(),k(),H=r(),{expect:U,screen:W,userEvent:G,waitFor:K,within:q}=__STORYBOOK_MODULE_TEST__,J={title:`Projects/Colleague Profile/Manage Team`,component:L,tags:[`autodocs`],decorators:[e=>(0,H.jsx)(Ee,{initialEntries:[`/colleague-profile/teams/aaaa-grant-c-test`],children:(0,H.jsx)(ke,{children:(0,H.jsx)(Te,{children:(0,H.jsx)(De,{path:`/colleague-profile/teams/:teamId`,element:(0,H.jsx)(e,{})})})})})],parameters:{layout:`fullscreen`,docs:{description:{component:`A single team — where **Manage Team** goes from the My Teams grid.

The member table is \`DataTable\` doing what it already does: search, CSV export,
pagination with a page-size control, right-aligned numerics, and a row-actions column
that names each control after its row. Nothing about the table is rebuilt here — the
screen is a column definition and a tab set.

**Three of the four tabs are deliberately empty.** They exist on the source screen, so
dropping them would misrepresent the navigation — but inventing plausible content for
them would be worse than saying plainly that they are out of scope.`}}}},Y={play:async({canvasElement:e,step:t})=>{let n=q(e);await t(`the team is named, and counted`,async()=>{await U(n.getByRole(`heading`,{name:`AAAA Grant C - Test`,level:1})).toBeInTheDocument(),await U(n.getByText(`${E.length} active team members · ${D} Clients`)).toBeInTheDocument()}),await t(`every member is listed`,async()=>{await U(n.getByText(`Alison Lane`)).toBeInTheDocument(),await U(n.getByText(`Zack Zizza`)).toBeInTheDocument()}),await t(`the role overflow says what it counts`,async()=>{await U(n.getByText(`and 37 more roles`)).toBeInTheDocument()}),await t(`a member with no roles reads as such`,async()=>{await U(n.getAllByText(`No roles assigned`).length).toBeGreaterThan(0)})}},X={play:async({canvasElement:e,step:t})=>{let n=q(e);await t(`each row names its own control`,async()=>{let e=n.getByRole(`button`,{name:`Remove from team Alison Lane`});await U(e).toBeInTheDocument(),await U(e.querySelector(`svg`)).toBeInTheDocument()}),await t(`the label is announced, not printed down the column`,async()=>{let e=n.getByRole(`button`,{name:`Remove from team Alison Lane`});await U(e).not.toHaveTextContent(`Remove`)})}},Z={play:async({canvasElement:e,step:t})=>{let n=q(e);await t(`switch to Delegate`,async()=>{await G.click(n.getByRole(`tab`,{name:`Delegate`})),await U(await n.findByText(/not in this rebuild/i)).toBeInTheDocument()})}},Q={name:`Remove member dialog`,play:async({canvasElement:e,step:t})=>{let n=q(e);await t(`open it from the row`,async()=>{await G.click(n.getByRole(`button`,{name:`Remove from team Alison Lane`}))}),await t(`it names the member and offers BOTH outcomes`,async()=>{let e=await W.findByRole(`dialog`);await U(q(e).getByText(`Alison Lane`)).toBeInTheDocument(),await U(q(e).getByRole(`button`,{name:`Remove Member Only`})).toBeInTheDocument(),await U(q(e).getByRole(`button`,{name:`Remove Member and Assignments`})).toBeInTheDocument()}),await t(`Enter is not armed on open`,async()=>{let e=W.getByRole(`dialog`);await U(e).toHaveFocus(),await U(q(e).queryByRole(`button`,{name:`Cancel`})).toBeNull()}),await t(`it states the consequence, not just the choice`,async()=>{let e=W.getByRole(`dialog`);await U(q(e).getByText(/5 clients/)).toBeInTheDocument()}),await t(`Escape closes it, having done nothing`,async()=>{await G.keyboard(`{Escape}`),await K(()=>U(W.queryByRole(`dialog`)).toBeNull()),await U(n.getByText(`Alison Lane`)).toBeInTheDocument()})}},$={play:async({canvasElement:e,step:t})=>{let n=q(e);await t(`open it`,async()=>{await G.click(n.getByRole(`button`,{name:`Add Member`})),await W.findByRole(`dialog`)}),await t(`nothing is queued yet, so there is nothing to commit`,async()=>{let e=W.getByRole(`dialog`);await U(q(e).getByRole(`button`,{name:`Add members to team`})).toBeDisabled()}),await t(`searching finds people across all three firms`,async()=>{let e=W.getByRole(`dialog`);await G.type(q(e).getByRole(`combobox`),`antoni`);let t=await q(e).findByRole(`listbox`);await U(q(t).getByText(/oliverwyman\.com/)).toBeInTheDocument()}),await t(`ticking two of them queues both`,async()=>{let e=q(W.getByRole(`dialog`)).getByRole(`listbox`);await G.click(q(e).getByText(`Antonio Nicoletti`)),await G.click(q(e).getByText(`Antonio Aguilar Martin`));let t=W.getByRole(`dialog`);await U(q(t).getByText(`2 members queued to add`)).toBeInTheDocument(),await U(q(t).getByRole(`button`,{name:`Add 2 members to team`})).toBeEnabled()}),await t(`one can be taken back out of the queue`,async()=>{let e=W.getByRole(`dialog`);await G.click(q(e).getByRole(`button`,{name:`Remove Antonio Nicoletti from the queue`})),await U(q(e).getByRole(`button`,{name:`Add 1 member to team`})).toBeInTheDocument()}),await t(`someone already on the team is shown, not hidden`,async()=>{let e=W.getByRole(`dialog`),t=q(e).getByRole(`combobox`);await G.clear(t),await G.type(t,`alison`);let n=await q(e).findByRole(`listbox`);await U(q(n).getByText(`Already a member`)).toBeInTheDocument(),await U(q(n).getByRole(`option`)).toHaveAttribute(`aria-disabled`,`true`)}),await t(`close before the run ends`,async()=>{await G.keyboard(`{Escape}`),await K(()=>U(W.queryByRole(`dialog`)).toBeNull())})}},Be=[`Default`,`RowActionsAreNamed`,`UnbuiltTabs`,`RemoveMemberDialogStory`,`AddMembers`],Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('the team is named, and counted', async () => {
      await expect(canvas.getByRole('heading', {
        name: 'AAAA Grant C - Test',
        level: 1
      })).toBeInTheDocument();
      // Derived from the fixtures rather than hardcoded. The literal said
      // \`21 Clients\` while TEAM_CLIENT_COUNT was a hand-maintained constant;
      // once the count became CLIENTS.length the two disagreed, and a test
      // asserting a number the data no longer produces is a test that has to
      // be edited every time the fixture changes.
      await expect(canvas.getByText(\`\${TEAM_MEMBERS.length} active team members · \${TEAM_CLIENT_COUNT} Clients\`)).toBeInTheDocument();
    });
    await step('every member is listed', async () => {
      await expect(canvas.getByText('Alison Lane')).toBeInTheDocument();
      await expect(canvas.getByText('Zack Zizza')).toBeInTheDocument();
    });
    await step('the role overflow says what it counts', async () => {
      // "+37" beside three chips is only meaningful if you already worked out
      // what it counts.
      await expect(canvas.getByText('and 37 more roles')).toBeInTheDocument();
    });
    await step('a member with no roles reads as such', async () => {
      await expect(canvas.getAllByText('No roles assigned').length).toBeGreaterThan(0);
    });
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('each row names its own control', async () => {
      // Eight identically-named buttons would tell a screen-reader user
      // nothing about which row they are on.
      const remove = canvas.getByRole('button', {
        name: 'Remove from team Alison Lane'
      });
      await expect(remove).toBeInTheDocument();
      // The bug this story now pins: an accessible name is not evidence of a
      // visible control.
      await expect(remove.querySelector('svg')).toBeInTheDocument();
    });
    await step('the label is announced, not printed down the column', async () => {
      const remove = canvas.getByRole('button', {
        name: 'Remove from team Alison Lane'
      });
      await expect(remove).not.toHaveTextContent('Remove');
    });
  }
}`,...X.parameters?.docs?.source},description:{story:`Every row carries a visible delete control, named for its own member.

It spent a round behind an overflow menu, because \`primary\` rendered icon
AND label and printed "Remove from team" down the whole column. \`primary\`
takes \`iconOnly\` now, so the action is the trash icon the source screen
shows — and the menu trigger it replaced was rendering as an EMPTY button
anyway (see the fix in data-grid-row-actions.tsx).`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('switch to Delegate', async () => {
      await userEvent.click(canvas.getByRole('tab', {
        name: 'Delegate'
      }));
      await expect(await canvas.findByText(/not in this rebuild/i)).toBeInTheDocument();
    });
  }
}`,...Z.parameters?.docs?.source},description:{story:`The still-unbuilt tabs say so rather than showing invented content. Team
Setup has since been built (it now renders \`<TeamSetup>\`), so Delegate is the
remaining placeholder — that's what this pins.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Remove member dialog',
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('open it from the row', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: 'Remove from team Alison Lane'
      }));
    });
    await step('it names the member and offers BOTH outcomes', async () => {
      const dialog = await screen.findByRole('dialog');
      await expect(within(dialog).getByText('Alison Lane')).toBeInTheDocument();
      await expect(within(dialog).getByRole('button', {
        name: 'Remove Member Only'
      })).toBeInTheDocument();
      await expect(within(dialog).getByRole('button', {
        name: 'Remove Member and Assignments'
      })).toBeInTheDocument();
    });
    await step('Enter is not armed on open', async () => {
      const dialog = screen.getByRole('dialog');
      // Both actions destroy something, so focusing the first one by default
      // would mean a stray Enter removes the member. Focus sits on the
      // dialog instead.
      await expect(dialog).toHaveFocus();
      await expect(within(dialog).queryByRole('button', {
        name: 'Cancel'
      })).toBeNull();
    });
    await step('it states the consequence, not just the choice', async () => {
      const dialog = screen.getByRole('dialog');
      // "keep or clear" names the choice; "5 clients" names what is at stake.
      await expect(within(dialog).getByText(/5 clients/)).toBeInTheDocument();
    });
    await step('Escape closes it, having done nothing', async () => {
      // The way out, now that there is no Cancel button.
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
      await expect(canvas.getByText('Alison Lane')).toBeInTheDocument();
    });
  }
}`,...Q.parameters?.docs?.source},description:{story:`**Removing a member is a choice, not a confirmation.** Two outcomes — keep
their client allocations or clear them — so a plain "are you sure?" would
be a speed bump in front of the question that actually matters.

No Cancel button, per the design. Escape and the X still dismiss — and
because BOTH footer buttons are destructive, focus opens on the dialog
itself rather than the first action, so Enter does not destroy anything
the instant it appears.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('open it', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: 'Add Member'
      }));
      await screen.findByRole('dialog');
    });
    await step('nothing is queued yet, so there is nothing to commit', async () => {
      const dialog = screen.getByRole('dialog');
      await expect(within(dialog).getByRole('button', {
        name: 'Add members to team'
      })).toBeDisabled();
    });
    await step('searching finds people across all three firms', async () => {
      const dialog = screen.getByRole('dialog');
      await userEvent.type(within(dialog).getByRole('combobox'), 'antoni');
      const list = await within(dialog).findByRole('listbox');
      // The domain is often the fastest way to tell two Antonios apart,
      // which is why the row carries the email.
      await expect(within(list).getByText(/oliverwyman\\.com/)).toBeInTheDocument();
    });
    await step('ticking two of them queues both', async () => {
      const list = within(screen.getByRole('dialog')).getByRole('listbox');
      await userEvent.click(within(list).getByText('Antonio Nicoletti'));
      await userEvent.click(within(list).getByText('Antonio Aguilar Martin'));
      const dialog = screen.getByRole('dialog');
      await expect(within(dialog).getByText('2 members queued to add')).toBeInTheDocument();
      // The button says what it will do rather than asking you to remember.
      await expect(within(dialog).getByRole('button', {
        name: 'Add 2 members to team'
      })).toBeEnabled();
    });
    await step('one can be taken back out of the queue', async () => {
      const dialog = screen.getByRole('dialog');
      await userEvent.click(within(dialog).getByRole('button', {
        name: 'Remove Antonio Nicoletti from the queue'
      }));
      await expect(within(dialog).getByRole('button', {
        name: 'Add 1 member to team'
      })).toBeInTheDocument();
    });
    await step('someone already on the team is shown, not hidden', async () => {
      const dialog = screen.getByRole('dialog');
      const input = within(dialog).getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, 'alison');
      const list = await within(dialog).findByRole('listbox');
      // Filtering her out looks tidier and leaves the user wondering why a
      // colleague they can see in Workday is missing here.
      await expect(within(list).getByText('Already a member')).toBeInTheDocument();
      await expect(within(list).getByRole('option')).toHaveAttribute('aria-disabled', 'true');
    });
    await step('close before the run ends', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    });
  }
}`,...$.parameters?.docs?.source},description:{story:`**Add members** — search the MMC-wide directory, tick as many as you want,
review the queue, commit once.

Four changes from the live screen: no nested "Search Workday Directory"
panel (the modal title and the field label already say it twice); someone
already on the team is shown and disabled rather than hidden; one selection
indicator instead of a tick *and* a checkbox; and arrow keys work.`,...$.parameters?.docs?.description}}}})))()}Ve();export{$ as AddMembers,Y as Default,Q as RemoveMemberDialogStory,X as RowActionsAreNamed,Z as UnbuiltTabs,Be as __namedExportsOrder,J as default};