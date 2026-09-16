import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

// Minimal environment health story: validates Storybook shell, theming & addon pipeline.
// Hidden from normal browsing; disable docs & snapshots to keep it noise-free.
const meta: Meta = {
  title: '_health/Environment',
  tags: ['hidden'],
  parameters: {
    docs: { disable: true },
    chromatic: { disableSnapshot: true },
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj;

export const Loaded: Story = {
  render: () => (
    <div style={{ fontFamily: 'sans-serif', fontSize: 14, lineHeight: 1.5 }}>
      <strong>Storybook environment OK</strong>
      <ul style={{ marginTop: 8, paddingLeft: 18 }}>
        <li>Mode: {import.meta.env.MODE}</li>
        <li>Build Time: {new Date().toISOString()}</li>
        <li>React Version: {React.version}</li>
      </ul>
      <em style={{ display: 'block', marginTop: 12, opacity: 0.7 }}>Remove or simplify dynamic items if you need Chromatic snapshots here.</em>
    </div>
  )
};

// Optional static variant for visual baseline (disabled by default to avoid dynamic timestamp):
export const Static: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <div style={{ fontFamily: 'sans-serif', fontSize: 14, lineHeight: 1.5 }}>
      <strong>Storybook environment OK</strong>
      <p style={{ marginTop: 8 }}>Static variant for potential screenshot baseline.</p>
    </div>
  )
};