import type { Meta, StoryObj } from '@storybook/react';
import { Stepper, type StepConfig } from './stepper';

/**
 * # Stepper (shadcn/ui)
 *
 * `getRoleColor()`-driven counterpart to the MUI `Stepper`. Built against
 * the real `steps: StepConfig[]` API (per-step `status`) — the
 * `Stepper.figma.tsx` mapping's `steps: string[]` example doesn't match
 * any prop the actual MUI component accepts.
 */
const meta: Meta<typeof Stepper> = {
  title: 'shadcn-ui/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    variant: { control: 'select', options: ['default', 'compact'] },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const claimSteps: StepConfig[] = [
  { id: '1', label: 'Claim submitted', description: 'Jan 3, 2026', status: 'completed' },
  { id: '2', label: 'Under review', description: 'Adjuster assigned', status: 'active' },
  { id: '3', label: 'Decision', status: 'pending' },
  { id: '4', label: 'Payout', status: 'pending' },
];

export const Vertical: Story = {
  args: { steps: claimSteps },
};

export const Horizontal: Story = {
  args: { steps: claimSteps, orientation: 'horizontal' },
};

export const Compact: Story = {
  args: { steps: claimSteps, variant: 'compact' },
};

export const WithError: Story = {
  args: {
    steps: [
      { id: '1', label: 'Application submitted', status: 'completed' },
      { id: '2', label: 'Document verification', status: 'error', description: 'Missing required document' },
      { id: '3', label: 'Approval', status: 'pending' },
    ],
  },
};

export const WithContent: Story = {
  args: {
    steps: [
      { id: '1', label: 'Account details', status: 'completed', content: 'Jane Doe · jane@company.com' },
      { id: '2', label: 'Coverage selection', status: 'active', content: 'Select which policies to include.' },
      { id: '3', label: 'Review & submit', status: 'pending' },
    ],
  },
};

export const Clickable: Story = {
  args: {
    steps: claimSteps,
    onStepClick: (index) => alert(`Clicked step ${index + 1}`),
  },
};
