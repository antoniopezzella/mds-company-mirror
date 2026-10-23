import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./data-grid-cell-edit-hvFfb23J.js";import{n as o,r as s}from"./stack-BlYcYnw2.js";function c({initial:e=`12400`,control:t=`text`,invalid:n=!1}){let[r,i]=l.useState(e),[s,c]=l.useState(!0);return(0,u.jsxs)(o,{gap:3,children:[s?(0,u.jsx)(a,{value:r,control:t,invalid:n,ariaLabel:`Premium for Commercial Auto`,onCommit:e=>{i(e),c(!1)},onCancel:()=>c(!1)}):(0,u.jsxs)(`button`,{type:`button`,onClick:()=>c(!0),children:[r,` (click to edit again)`]}),(0,u.jsxs)(`p`,{className:`text-sm`,"data-testid":`committed`,children:[`committed: `,r]})]})}var l,u,d,f,p,m,h,g,_,v,y;function b(){return(b=t((()=>{l=e(n(),1),i(),s(),u=r(),{expect:d,userEvent:f,within:p}=__STORYBOOK_MODULE_TEST__,m={title:`Components/DataGrid/CellEditor`,component:a,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`The editor that appears inside a grid cell in spreadsheet mode.

**The keyboard contract is the whole point:** Enter commits, Escape cancels and
restores, and neither key is allowed to reach the grid behind it — otherwise Enter
would also move the cursor down and Escape would clear the selection.

It stores draft text only. \`onCommit\` hands you the raw string; parsing a number,
a date or a currency is yours, because only you know the column.`}}},argTypes:{value:{description:`The committed value the editor opens with. It is copied into a draft, not mutated.`,control:`text`},control:{description:"`text` for a single line, `textarea` for multi-line. There is no number or date control by design — see the note above.",control:`inline-radio`,options:[`text`,`textarea`],table:{defaultValue:{summary:`text`}}},ariaLabel:{description:`Required. The editor is a bare input inside a cell, so without this a screen reader announces an unnamed textbox. Name it for the row AND column ("Premium for Commercial Auto").`,control:`text`},onCommit:{description:`Fired with the RAW draft string on Enter or blur. Parse and validate here.`,table:{type:{summary:`(raw: string) => void`}},action:`commit`},onCancel:{description:`Fired on Escape. The caller restores the previous value.`,table:{type:{summary:`() => void`}},action:`cancel`},invalid:{description:`Marks the draft as failing validation. The caller decides what invalid means and keeps the editor open.`,control:`boolean`,table:{defaultValue:{summary:`false`}}}}},h={render:()=>(0,u.jsx)(c,{}),play:async({canvasElement:e,step:t})=>{let n=p(e);await t(`Enter commits the draft to the caller`,async()=>{let e=n.getByRole(`textbox`,{name:`Premium for Commercial Auto`});await f.clear(e),await f.type(e,`15900{Enter}`),await d(n.getByTestId(`committed`)).toHaveTextContent(`committed: 15900`)})}},g={name:`Escape cancels`,render:()=>(0,u.jsx)(c,{}),play:async({canvasElement:e,step:t})=>{let n=p(e);await t(`typing then Escape leaves the committed value untouched`,async()=>{let e=n.getByRole(`textbox`,{name:`Premium for Commercial Auto`});await f.clear(e),await f.type(e,`99999`),await f.keyboard(`{Escape}`),await d(n.getByTestId(`committed`)).toHaveTextContent(`committed: 12400`)})}},_={render:()=>(0,u.jsx)(c,{initial:`Renewal pending
awaiting broker`,control:`textarea`})},v={render:()=>(0,u.jsx)(c,{initial:`not-a-number`,invalid:!0})},y=[`Text`,`CancelOnEscape`,`Textarea`,`Invalid`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Host />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Enter commits the draft to the caller', async () => {
      const input = canvas.getByRole('textbox', {
        name: 'Premium for Commercial Auto'
      });
      await userEvent.clear(input);
      await userEvent.type(input, '15900{Enter}');
      await expect(canvas.getByTestId('committed')).toHaveTextContent('committed: 15900');
    });
  }
}`,...h.parameters?.docs?.source},description:{story:`Single-line. Enter commits.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Escape cancels',
  render: () => <Host />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('typing then Escape leaves the committed value untouched', async () => {
      const input = canvas.getByRole('textbox', {
        name: 'Premium for Commercial Auto'
      });
      await userEvent.clear(input);
      await userEvent.type(input, '99999');
      await userEvent.keyboard('{Escape}');
      // The value the caller holds never changed — that is the contract.
      await expect(canvas.getByTestId('committed')).toHaveTextContent('committed: 12400');
    });
  }
}`,...g.parameters?.docs?.source},description:{story:`Escape restores — the draft is discarded, not committed.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Host initial={'Renewal pending\\nawaiting broker'} control="textarea" />
}`,..._.parameters?.docs?.source},description:{story:`Multi-line, for a notes column.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Host initial="not-a-number" invalid />
}`,...v.parameters?.docs?.source},description:{story:"`invalid` marks the draft without closing the editor.",...v.parameters?.docs?.description}}}})))()}b();export{g as CancelOnEscape,v as Invalid,h as Text,_ as Textarea,y as __namedExportsOrder,m as default};