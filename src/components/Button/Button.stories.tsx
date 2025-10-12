import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DSButton from './Button';

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
    variant: { control: 'radio', options: ['primary', 'secondary', 'text'] },
    tone: { control: 'radio', options: ['default', 'danger', 'success'] },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Action',
    variant: 'primary',
    tone: 'default',
    disabled: false,
  },
} satisfies Meta<typeof DSButton>;
export default meta;

type Story = StoryObj<typeof DSButton>;

export const Primary: Story = {
  args: {},
  // Interaction test: focus + click increments a counter (using a simple wrapper render)
  render: (args) => {
    const [count, setCount] = React.useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <DSButton {...args} onClick={() => setCount(c => c + 1)} data-testid="ds-button" />
        <div data-testid="click-count" style={{ fontFamily: 'monospace', fontSize: 12 }}>Clicks: {count}</div>
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
  }
};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Text: Story = { args: { variant: 'text' } };
export const Danger: Story = { args: { tone: 'danger' } };
export const Success: Story = { args: { tone: 'success' } };
export const Disabled: Story = { args: { disabled: true } };
