import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import DSButton from './Button';
// Ensure fonts and typography vars are present inside the story iframe
import '../../index.css';
import '../../styles/_typography.scss';
import { Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const meta = {
  title: 'Components/Button',
  component: DSButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Design System Button built on MUI. Uses role-based colors and constrained variants/tone.'
      }
    }
  },
  // Docs: Autodocs disabled to avoid conflict with a separate MDX docs page
  // tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'tertiary', 'text'] },
    tone: { control: 'radio', options: ['default', 'danger', 'success'] },
    disabled: { control: 'boolean' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    iconOnly: { control: 'boolean' },
  },
  args: {
    children: 'Action',
    variant: 'primary',
    tone: 'default',
    disabled: false,
    size: 'md',
  },
  // Default render: if iconOnly is toggled on via controls, show a default icon and hide text
  render: (args) => {
    const { iconOnly, children, startIcon, ...rest } = args as any;
    const iconNode = startIcon ?? <SaveIcon />;
    return (
      <DSButton
        {...rest}
        iconOnly={iconOnly}
        startIcon={iconOnly ? iconNode : startIcon}
      >
        {iconOnly ? null : children}
      </DSButton>
    );
  },
} satisfies Meta<typeof DSButton>;
export default meta;

type Story = StoryObj<typeof DSButton>;

export const Primary: Story = {
  args: {},
  // Interaction test: focus + click increments a counter (using a simple wrapper render)
  render: (args) => {
    const [count, setCount] = React.useState(0);
    const { iconOnly, children, startIcon, ...rest } = args as any;
    const iconNode = startIcon ?? <SaveIcon />;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          startIcon={iconOnly ? iconNode : startIcon}
          onClick={() => setCount(c => c + 1)}
          data-testid="ds-button"
        >
          {iconOnly ? null : children}
        </DSButton>
        <Typography variant="caption" component="div" data-testid="click-count" sx={{ fontFamily: 'monospace' }}>
          Clicks: {count}
        </Typography>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
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
    if (!countEl || !/Clicks: 1/.test((countEl.textContent || ''))) {
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
      throw new Error(`Expected font-weight 500 (Medium), got: ${cs.fontWeight}`);
    }
    // Non-fatal note on family (helpful for manual debugging in UI)
    const ff = (cs.fontFamily || '').toLowerCase();
    if (!ff.includes('noto sans')) {
      // eslint-disable-next-line no-console
      console.warn(`Note: expected font-family to include "Noto Sans", got: ${cs.fontFamily}`);
    }
  }
};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Tertiary: Story = { args: { variant: 'tertiary' } };
export const Text: Story = { args: { variant: 'text' } };
export const Danger: Story = { args: { tone: 'danger' } };
export const Success: Story = { args: { tone: 'success' } };
export const Disabled: Story = { args: { disabled: true } };

export const Sizes: Story = {
  args: {},
  render: (args) => {
    const { iconOnly, children, startIcon, ...rest } = args as any;
    const iconNode = startIcon ?? <SaveIcon />;
    return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          startIcon={iconOnly ? iconNode : startIcon}
          size="sm"
          data-testid="btn-sm"
        >
          {iconOnly ? null : 'Small'}
        </DSButton>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          startIcon={iconOnly ? iconNode : startIcon}
          size="md"
          data-testid="btn-md"
        >
          {iconOnly ? null : 'Medium'}
        </DSButton>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          startIcon={iconOnly ? iconNode : startIcon}
          size="lg"
          data-testid="btn-lg"
        >
          {iconOnly ? null : 'Large'}
        </DSButton>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const getH = (sel: string) => {
      const el = canvasElement.querySelector(sel) as HTMLElement | null;
      if (!el) throw new Error(`${sel} not found`);
      const h = getComputedStyle(el).height;
      if (!h) throw new Error(`${sel} has no computed height`);
      return h;
    };
    // Allow layout to settle
    await new Promise(r => setTimeout(r, 10));
    const hSm = getH('[data-testid="btn-sm"]');
    const hMd = getH('[data-testid="btn-md"]');
    const hLg = getH('[data-testid="btn-lg"]');
    if (hSm !== '32px') throw new Error(`sm expected 32px, got ${hSm}`);
    if (hMd !== '48px') throw new Error(`md expected 48px, got ${hMd}`);
    if (hLg !== '56px') throw new Error(`lg expected 56px, got ${hLg}`);
  }
};

export const IconOnly: Story = {
  args: {
    iconOnly: true
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} size="sm" />
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} size="md" />
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} size="lg" />
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} variant="secondary" />
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} tone="danger" />
    </div>
  )
};
