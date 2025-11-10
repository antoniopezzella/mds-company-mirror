import{j as e,e as v}from"./iframe-B7__wHsY.js";import{D as s}from"./Button-BS5uAqLF.js";import{c as I}from"./createSvgIcon-DOVj1Oe1.js";import{T as b}from"./Typography-CuZGjVfN.js";import"./preload-helper-PPVm8Dsz.js";import"./roles-DDzdIcSm.js";import"./Button-zrpDzD2P.js";import"./styled-D_MMOKXd.js";import"./memoTheme-DLuuOUa1.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./generateUtilityClasses-CoM_PQv9.js";import"./ButtonBase-H0aG7E_M.js";import"./useTimeout-BMcW_4Fv.js";import"./useForkRef-jYvpDqFw.js";import"./useEventCallback-CFw1AcSY.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-buLdZGSf.js";import"./SvgIcon-BoXwKfVN.js";const l=I(e.jsx("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3m3-10H5V5h10z"})),A={title:"Components/Button",component:s,parameters:{layout:"centered",docs:{description:{component:"Design System Button built on MUI. Uses role-based colors and constrained variants/tone."}}},argTypes:{variant:{control:"radio",options:["primary","secondary","tertiary","text"]},tone:{control:"radio",options:["default","danger","success"]},disabled:{control:"boolean"},size:{control:"radio",options:["sm","md","lg"]},iconOnly:{control:"boolean"}},args:{children:"Action",variant:"primary",tone:"default",disabled:!1,size:"md"},render:r=>{const{iconOnly:t,children:c,startIcon:n,...o}=r,a=n??e.jsx(l,{});return e.jsx(s,{...o,iconOnly:t,startIcon:t?a:n,children:t?null:c})}},m={args:{},render:r=>{const[t,c]=v.useState(0),{iconOnly:n,children:o,startIcon:a,...i}=r,d=a??e.jsx(l,{});return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:12},children:[e.jsx(s,{...i,iconOnly:n,startIcon:n?d:a,onClick:()=>c(w=>w+1),"data-testid":"ds-button",children:n?null:o}),e.jsxs(b,{variant:"caption",component:"div","data-testid":"click-count",sx:{fontFamily:"monospace"},children:["Clicks: ",t]})]})},play:async({canvasElement:r})=>{const t=r.querySelector('[data-testid="ds-button"]');if(!t)throw new Error("Button not found");if(t.focus(),document.activeElement!==t)throw new Error("Button did not receive focus");t.click(),await new Promise(i=>setTimeout(i,0));const c=r.querySelector('[data-testid="click-count"]');if(!c||!/Clicks: 1/.test(c.textContent||""))throw new Error("Click count did not increment");const n=()=>getComputedStyle(t);let o=n();if(o.fontWeight!=="500"&&(await new Promise(i=>setTimeout(i,50)),o=n()),o.fontWeight!=="500")throw new Error(`Expected font-weight 500 (Medium), got: ${o.fontWeight}`);(o.fontFamily||"").toLowerCase().includes("noto sans")||console.warn(`Note: expected font-family to include "Noto Sans", got: ${o.fontFamily}`)}},u={args:{variant:"secondary"}},p={args:{variant:"tertiary"}},g={args:{variant:"text"}},y={args:{tone:"danger"}},f={args:{tone:"success"}},h={args:{disabled:!0}},S={args:{},render:r=>{const{iconOnly:t,children:c,startIcon:n,...o}=r,a=n??e.jsx(l,{});return e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"},children:[e.jsx(s,{...o,iconOnly:t,startIcon:t?a:n,size:"sm","data-testid":"btn-sm",children:t?null:"Small"}),e.jsx(s,{...o,iconOnly:t,startIcon:t?a:n,size:"md","data-testid":"btn-md",children:t?null:"Medium"}),e.jsx(s,{...o,iconOnly:t,startIcon:t?a:n,size:"lg","data-testid":"btn-lg",children:t?null:"Large"})]})},play:async({canvasElement:r})=>{const t=a=>{const i=r.querySelector(a);if(!i)throw new Error(`${a} not found`);const d=getComputedStyle(i).height;if(!d)throw new Error(`${a} has no computed height`);return d};await new Promise(a=>setTimeout(a,10));const c=t('[data-testid="btn-sm"]'),n=t('[data-testid="btn-md"]'),o=t('[data-testid="btn-lg"]');if(c!=="32px")throw new Error(`sm expected 32px, got ${c}`);if(n!=="48px")throw new Error(`md expected 48px, got ${n}`);if(o!=="56px")throw new Error(`lg expected 56px, got ${o}`)}},x={args:{iconOnly:!0},render:r=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"},children:[e.jsx(s,{...r,"aria-label":"Save",iconOnly:!0,startIcon:e.jsx(l,{}),size:"sm"}),e.jsx(s,{...r,"aria-label":"Save",iconOnly:!0,startIcon:e.jsx(l,{}),size:"md"}),e.jsx(s,{...r,"aria-label":"Save",iconOnly:!0,startIcon:e.jsx(l,{}),size:"lg"}),e.jsx(s,{...r,"aria-label":"Save",iconOnly:!0,startIcon:e.jsx(l,{}),variant:"secondary"}),e.jsx(s,{...r,"aria-label":"Save",iconOnly:!0,startIcon:e.jsx(l,{}),tone:"danger"})]})};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {},
  // Interaction test: focus + click increments a counter (using a simple wrapper render)
  render: args => {
    const [count, setCount] = React.useState(0);
    const {
      iconOnly,
      children,
      startIcon,
      ...rest
    } = args as any;
    const iconNode = startIcon ?? <SaveIcon />;
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12
    }}>
        <DSButton {...rest} iconOnly={iconOnly} startIcon={iconOnly ? iconNode : startIcon} onClick={() => setCount(c => c + 1)} data-testid="ds-button">
          {iconOnly ? null : children}
        </DSButton>
        <Typography variant="caption" component="div" data-testid="click-count" sx={{
        fontFamily: 'monospace'
      }}>
          Clicks: {count}
        </Typography>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    // Minimal dependency-free interaction check:
    const btn = canvasElement.querySelector('[data-testid="ds-button"]') as HTMLButtonElement | null;
    if (!btn) throw new Error('Button not found');
    // Focus
    btn.focus();
    if (document.activeElement !== btn) throw new Error('Button did not receive focus');
    // Click
    btn.click();
    // Allow React state update
    await new Promise(r => setTimeout(r, 0));
    const countEl = canvasElement.querySelector('[data-testid="click-count"]');
    if (!countEl || !/Clicks: 1/.test(countEl.textContent || '')) {
      throw new Error('Click count did not increment');
    }

    // Typography check: verify Medium (500) weight; font-family can be flaky in headless runs
    const readStyles = () => getComputedStyle(btn);
    let cs = readStyles();
    if (cs.fontWeight !== '500') {
      // Wait a tick in case CSS variables/fonts apply slightly later
      await new Promise(r => setTimeout(r, 50));
      cs = readStyles();
    }
    if (cs.fontWeight !== '500') {
      throw new Error(\`Expected font-weight 500 (Medium), got: \${cs.fontWeight}\`);
    }
    // Non-fatal note on family (helpful for manual debugging in UI)
    const ff = (cs.fontFamily || '').toLowerCase();
    if (!ff.includes('noto sans')) {
      // eslint-disable-next-line no-console
      console.warn(\`Note: expected font-family to include "Noto Sans", got: \${cs.fontFamily}\`);
    }
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary'
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'tertiary'
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'text'
  }
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    tone: 'danger'
  }
}`,...y.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    tone: 'success'
  }
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {},
  render: args => {
    const {
      iconOnly,
      children,
      startIcon,
      ...rest
    } = args as any;
    const iconNode = startIcon ?? <SaveIcon />;
    return <div style={{
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <DSButton {...rest} iconOnly={iconOnly} startIcon={iconOnly ? iconNode : startIcon} size="sm" data-testid="btn-sm">
          {iconOnly ? null : 'Small'}
        </DSButton>
        <DSButton {...rest} iconOnly={iconOnly} startIcon={iconOnly ? iconNode : startIcon} size="md" data-testid="btn-md">
          {iconOnly ? null : 'Medium'}
        </DSButton>
        <DSButton {...rest} iconOnly={iconOnly} startIcon={iconOnly ? iconNode : startIcon} size="lg" data-testid="btn-lg">
          {iconOnly ? null : 'Large'}
        </DSButton>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const getH = (sel: string) => {
      const el = canvasElement.querySelector(sel) as HTMLElement | null;
      if (!el) throw new Error(\`\${sel} not found\`);
      const h = getComputedStyle(el).height;
      if (!h) throw new Error(\`\${sel} has no computed height\`);
      return h;
    };
    // Allow layout to settle
    await new Promise(r => setTimeout(r, 10));
    const hSm = getH('[data-testid="btn-sm"]');
    const hMd = getH('[data-testid="btn-md"]');
    const hLg = getH('[data-testid="btn-lg"]');
    if (hSm !== '32px') throw new Error(\`sm expected 32px, got \${hSm}\`);
    if (hMd !== '48px') throw new Error(\`md expected 48px, got \${hMd}\`);
    if (hLg !== '56px') throw new Error(\`lg expected 56px, got \${hLg}\`);
  }
}`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    iconOnly: true
  },
  render: args => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} size="sm" />
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} size="md" />
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} size="lg" />
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} variant="secondary" />
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} tone="danger" />
    </div>
}`,...x.parameters?.docs?.source}}};const R=["Primary","Secondary","Tertiary","Text","Danger","Success","Disabled","Sizes","IconOnly"];export{y as Danger,h as Disabled,x as IconOnly,m as Primary,u as Secondary,S as Sizes,f as Success,p as Tertiary,g as Text,R as __namedExportsOrder,A as default};
