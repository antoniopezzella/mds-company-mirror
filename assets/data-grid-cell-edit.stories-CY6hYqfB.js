import{Z as t,a5 as p}from"./iframe-CPBTUrEW.js";import{D as u}from"./data-grid-cell-edit-S8aFd1vS.js";import{S as E}from"./stack-C88a0npI.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./input-BSCHIFmj.js";import"./prop-compat-ClktB6p5.js";import"./control-size-rvCN7ZpI.js";import"./textarea-UDTKAvx4.js";import"./index-DTX6ga2Q.js";const{expect:h,userEvent:d,within:y}=__STORYBOOK_MODULE_TEST__,H={title:"Components/DataGrid/CellEditor",component:u,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["The editor that appears inside a grid cell in spreadsheet mode.","","**The keyboard contract is the whole point:** Enter commits, Escape cancels and","restores, and neither key is allowed to reach the grid behind it — otherwise Enter","would also move the cursor down and Escape would clear the selection.","","It stores draft text only. `onCommit` hands you the raw string; parsing a number,","a date or a currency is yours, because only you know the column."].join(`
`)}}},argTypes:{value:{description:"The committed value the editor opens with. It is copied into a draft, not mutated.",control:"text"},control:{description:"`text` for a single line, `textarea` for multi-line. There is no number or date control by design — see the note above.",control:"inline-radio",options:["text","textarea"],table:{defaultValue:{summary:"text"}}},ariaLabel:{description:'Required. The editor is a bare input inside a cell, so without this a screen reader announces an unnamed textbox. Name it for the row AND column ("Premium for Commercial Auto").',control:"text"},onCommit:{description:"Fired with the RAW draft string on Enter or blur. Parse and validate here.",table:{type:{summary:"(raw: string) => void"}},action:"commit"},onCancel:{description:"Fired on Escape. The caller restores the previous value.",table:{type:{summary:"() => void"}},action:"cancel"},invalid:{description:"Marks the draft as failing validation. The caller decides what invalid means and keeps the editor open.",control:"boolean",table:{defaultValue:{summary:"false"}}}}};function m({initial:n="12400",control:o="text",invalid:a=!1}){const[e,v]=p.useState(n),[x,l]=p.useState(!0);return t.jsxs(E,{gap:3,children:[x?t.jsx(u,{value:e,control:o,invalid:a,ariaLabel:"Premium for Commercial Auto",onCommit:w=>{v(w),l(!1)},onCancel:()=>l(!1)}):t.jsxs("button",{type:"button",onClick:()=>l(!0),children:[e," (click to edit again)"]}),t.jsxs("p",{className:"text-sm","data-testid":"committed",children:["committed: ",e]})]})}const r={render:()=>t.jsx(m,{}),play:async({canvasElement:n,step:o})=>{const a=y(n);await o("Enter commits the draft to the caller",async()=>{const e=a.getByRole("textbox",{name:"Premium for Commercial Auto"});await d.clear(e),await d.type(e,"15900{Enter}"),await h(a.getByTestId("committed")).toHaveTextContent("committed: 15900")})}},i={name:"Escape cancels",render:()=>t.jsx(m,{}),play:async({canvasElement:n,step:o})=>{const a=y(n);await o("typing then Escape leaves the committed value untouched",async()=>{const e=a.getByRole("textbox",{name:"Premium for Commercial Auto"});await d.clear(e),await d.type(e,"99999"),await d.keyboard("{Escape}"),await h(a.getByTestId("committed")).toHaveTextContent("committed: 12400")})}},s={render:()=>t.jsx(m,{initial:`Renewal pending
awaiting broker`,control:"textarea"})},c={render:()=>t.jsx(m,{initial:"not-a-number",invalid:!0})},A=["Text","CancelOnEscape","Textarea","Invalid"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source},description:{story:"Single-line. Enter commits.",...r.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source},description:{story:"Escape restores — the draft is discarded, not committed.",...i.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Host initial={'Renewal pending\\nawaiting broker'} control="textarea" />
}`,...s.parameters?.docs?.source},description:{story:"Multi-line, for a notes column.",...s.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Host initial="not-a-number" invalid />
}`,...c.parameters?.docs?.source},description:{story:"`invalid` marks the draft without closing the editor.",...c.parameters?.docs?.description}}};export{i as CancelOnEscape,c as Invalid,r as Text,s as Textarea,A as __namedExportsOrder,H as default};
