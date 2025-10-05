import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Health/Smoke',
  parameters: {
    docs: {
      description: {
        component: 'Simple smoke test to validate Storybook story index builds correctly.'
      }
    }
  }
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => <div style={{padding:16, border:'1px solid #ddd'}}>Storybook is rendering stories (Smoke test)</div>
};