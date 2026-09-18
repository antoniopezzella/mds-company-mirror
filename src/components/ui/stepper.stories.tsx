import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookUser, CreditCard, Lock } from 'lucide-react';
import { Stepper, type StepConfig } from './stepper';
import { Button } from './button';

/**
 * # Stepper
 *
 * `getRoleColor()`-driven counterpart to the MUI `Stepper`. Built against
 * the real `steps: StepConfig[]` API (per-step `status`) — the
 * `Stepper.figma.tsx` mapping's `steps: string[]` example doesn't match
 * any prop the actual MUI component accepts.
 *
 * Visual language is ported from reui's Stepper
 * ([reui.io/components/stepper](https://reui.io/components/stepper)) — 24px
 * filled numbered indicators, 2px separators, `text-sm leading-none
 * font-medium` titles — with their raw upstream CSS vars mapped onto this
 * repo's role tokens. The stories below reproduce all 15 of reui's demos
 * through this component's `indicator` / `labelPlacement` / `labelAlign` /
 * `showSeparator` / `showStatusBadge` / `showStepEyebrow` / `completedTone`
 * props, and are labelled with the reui demo they mirror.
 */
const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    variant: { control: 'select', options: ['default', 'compact'] },
    indicator: {
      control: 'select',
      options: ['numbered', 'outlined', 'icon', 'bar'],
      description: 'Indicator shape: filled numbered circle, hollow ring with an active dot, icon circle, or a progress-bar segment.',
    },
    labelPlacement: {
      control: 'select',
      options: ['none', 'inline', 'below'],
      description: 'Label position relative to the indicator. Defaults to `below` for horizontal, `inline` for vertical.',
    },
    labelAlign: {
      control: 'select',
      options: ['center', 'start'],
      description: 'Label alignment when `labelPlacement="below"`.',
    },
    contentMode: {
      control: 'select',
      options: ['inline', 'active-only'],
      description: 'How step `content` is displayed: per-step inline blocks, or a single shared tabpanel for just the active step.',
    },
    completedTone: {
      control: 'select',
      options: ['primary', 'success'],
      description: 'Fill color for completed steps and their separators.',
    },
    showSeparator: { control: 'boolean', description: 'Draws the connector between steps.' },
    showStatusBadge: { control: 'boolean', description: 'Renders a status pill per step (reui demo 7).' },
    showStepEyebrow: { control: 'boolean', description: 'Renders a small uppercase "STEP N" eyebrow above the title (reui demo 7).' },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

// ── Shared fixtures ─────────────────────────────────────────────────────────

const numberedSteps: StepConfig[] = [
  { id: '1', label: 'Step 1', content: 'Step 1 content' },
  { id: '2', label: 'Step 2', content: 'Step 2 content' },
  { id: '3', label: 'Step 3', content: 'Step 3 content' },
  { id: '4', label: 'Step 4', content: 'Step 4 content' },
];

const onboardingSteps: StepConfig[] = [
  { id: 'account', label: 'Account', description: 'Create your account' },
  { id: 'profile', label: 'Profile', description: 'Set up your profile' },
  { id: 'review', label: 'Review', description: 'Confirm your details' },
];

const formSteps: StepConfig[] = [
  { id: 'user', label: 'User Details' },
  { id: 'payment', label: 'Payment Info' },
  { id: 'otp', label: 'Auth OTP' },
  { id: 'preview', label: 'Preview Form' },
];

const iconSteps: StepConfig[] = [
  { id: 'user', label: 'User Details', icon: <BookUser className="size-4" /> },
  { id: 'payment', label: 'Payment Info', icon: <CreditCard className="size-4" /> },
  { id: 'otp', label: 'Auth OTP', icon: <Lock className="size-4" /> },
];

const claimSteps: StepConfig[] = [
  { id: '1', label: 'Claim submitted', description: 'Jan 3, 2026', status: 'completed' },
  { id: '2', label: 'Under review', description: 'Adjuster assigned', status: 'active' },
  { id: '3', label: 'Decision', status: 'pending' },
  { id: '4', label: 'Payout', status: 'pending' },
];

const demo = (n: number, description: string) => ({
  docs: { description: { story: `Mirrors [reui stepper demo ${n}](https://reui.io/components/stepper) — ${description}` } },
});

// ── reui demos 1–4: horizontal, indicator-only ──────────────────────────────

export const HorizontalNumbered: Story = {
  parameters: demo(1, 'numbered indicators with connecting separators, no labels.'),
  args: {
    steps: numberedSteps,
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'none',
    contentMode: 'active-only',
  },
};

export const SuccessTone: Story = {
  parameters: demo(2, 'the same layout with completed steps and separators in the success tone instead of brand primary.'),
  args: {
    ...HorizontalNumbered.args,
    completedTone: 'success',
  },
};

export const OutlinedIndicators: Story = {
  parameters: demo(3, 'small 20px hollow ring indicators — the active step shows a filled dot, and step 2 is mid-flight (`loading`).'),
  args: {
    steps: [
      { id: '1', label: 'Step 1', content: 'Step 1 content' },
      { id: '2', label: 'Step 2', content: 'Step 2 content', loading: true },
      { id: '3', label: 'Step 3', content: 'Step 3 content' },
    ],
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'none',
    indicator: 'outlined',
    completedTone: 'success',
    contentMode: 'active-only',
  },
};

export const WithPreviousNextButtons: Story = {
  parameters: demo(4, 'driven by external Previous/Next buttons rather than clicking the steps themselves.'),
  render: (args) => {
    const [current, setCurrent] = useState(1);
    return (
      <div className="flex w-full max-w-md flex-col gap-8">
        <Stepper {...args} activeStep={current} onStepClick={setCurrent} />
        <div className="flex items-center justify-between gap-2.5">
          <Button variant="outline" onClick={() => setCurrent((p) => p - 1)} disabled={current === 0}>
            Previous
          </Button>
          <Button variant="outline" onClick={() => setCurrent((p) => p + 1)} disabled={current === numberedSteps.length - 1}>
            Next
          </Button>
        </div>
      </div>
    );
  },
  args: {
    steps: numberedSteps,
    orientation: 'horizontal',
    labelPlacement: 'none',
    completedTone: 'success',
    contentMode: 'active-only',
  },
};

// ── reui demos 5–8: horizontal with labels ──────────────────────────────────

export const LabelBelowCentered: Story = {
  parameters: demo(5, 'titles stacked under centered indicators, separators spanning the gap between them.'),
  args: {
    steps: [
      { id: '1', label: 'Step 1', content: 'Step 1 content' },
      { id: '2', label: 'Step 2', content: 'Step 2 content' },
      { id: '3', label: 'Step 3', content: 'Step 3 content' },
    ],
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'below',
    contentMode: 'active-only',
  },
};

export const LabelBelowStart: Story = {
  parameters: demo(6, 'left-aligned titles under the indicators with no separators.'),
  args: {
    steps: formSteps,
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'below',
    labelAlign: 'start',
    showSeparator: false,
  },
};

export const RichWithBadges: Story = {
  parameters: demo(7, 'the fullest variant: 32px icon indicators, a "STEP N" eyebrow, per-step status pills, success-toned completion, and external navigation.'),
  render: (args) => {
    const [current, setCurrent] = useState(1);
    return (
      <div className="flex w-full max-w-xl flex-col gap-8">
        <Stepper {...args} activeStep={current} onStepClick={setCurrent} />
        <div className="flex items-center justify-between gap-2.5">
          <Button variant="outline" onClick={() => setCurrent((p) => p - 1)} disabled={current === 0}>
            Previous
          </Button>
          <Button variant="outline" onClick={() => setCurrent((p) => p + 1)} disabled={current === iconSteps.length - 1}>
            Next
          </Button>
        </div>
      </div>
    );
  },
  args: {
    steps: iconSteps,
    orientation: 'horizontal',
    indicator: 'icon',
    labelPlacement: 'below',
    labelAlign: 'start',
    showStepEyebrow: true,
    showStatusBadge: true,
    completedTone: 'success',
  },
};

export const LabelAndDescriptionBelow: Story = {
  parameters: demo(8, 'title plus description stacked under centered indicators.'),
  args: {
    steps: onboardingSteps,
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'below',
  },
};

// ── reui demos 9–10: horizontal, inline labels ──────────────────────────────

export const InlineLabels: Story = {
  parameters: demo(9, 'indicator and title side by side, separators filling the space between steps.'),
  args: {
    steps: [
      { id: 'account', label: 'Account' },
      { id: 'profile', label: 'Profile' },
      { id: 'review', label: 'Review' },
    ],
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'inline',
  },
};

export const InlineLabelsWithDescription: Story = {
  parameters: demo(10, 'inline layout carrying a description under each title.'),
  args: {
    steps: [
      { id: '1', label: 'Step 1', description: 'Description' },
      { id: '2', label: 'Step 2', description: 'Description' },
      { id: '3', label: 'Step 3', description: 'Description' },
    ],
    activeStep: 1,
    orientation: 'horizontal',
    labelPlacement: 'inline',
  },
};

// ── reui demos 11–12: bar indicators ────────────────────────────────────────

export const BarIndicators: Story = {
  parameters: demo(11, 'the circle is replaced by a full-width progress bar per step, with the title underneath.'),
  args: {
    steps: formSteps,
    activeStep: 1,
    orientation: 'horizontal',
    indicator: 'bar',
    labelAlign: 'start',
  },
};

export const BarProgressWithCounter: Story = {
  parameters: demo(12, 'bare segmented progress bar with a Back control and an "N / total" counter — no per-step labels.'),
  render: (args) => {
    const [current, setCurrent] = useState(0);
    return (
      <div className="flex w-full max-w-md flex-col gap-4">
        <Stepper {...args} activeStep={current} />
        <div className="flex items-center justify-between gap-2.5">
          <Button variant="ghost" onClick={() => setCurrent((p) => p - 1)} disabled={current === 0}>
            Back
          </Button>
          <div className="text-sm font-medium">
            {current + 1} <span className="opacity-60">/ {numberedSteps.length}</span>
          </div>
          <Button variant="outline" onClick={() => setCurrent((p) => p + 1)} disabled={current === numberedSteps.length - 1}>
            Next
          </Button>
        </div>
      </div>
    );
  },
  args: {
    steps: numberedSteps.map(({ content: _content, ...s }) => s),
    orientation: 'horizontal',
    indicator: 'bar',
    labelPlacement: 'none',
  },
};

// ── reui demos 13–15: vertical ──────────────────────────────────────────────

export const VerticalWithDescription: Story = {
  parameters: demo(13, 'vertical rail with title and description beside each indicator.'),
  args: {
    steps: onboardingSteps,
    activeStep: 1,
    orientation: 'vertical',
    completedTone: 'success',
  },
};

export const VerticalIndicatorsOnly: Story = {
  parameters: demo(14, 'vertical rail of bare indicators, step 2 mid-flight (`loading`).'),
  args: {
    steps: [
      { id: '1', label: 'Step 1' },
      { id: '2', label: 'Step 2', loading: true },
      { id: '3', label: 'Step 3' },
    ],
    activeStep: 1,
    orientation: 'vertical',
    labelPlacement: 'none',
    completedTone: 'success',
  },
};

export const VerticalTitlesOnly: Story = {
  parameters: demo(15, 'vertical rail with titles only, no descriptions.'),
  args: {
    steps: [
      { id: 'account', label: 'Account' },
      { id: 'profile', label: 'Profile' },
      { id: 'review', label: 'Review' },
    ],
    activeStep: 1,
    orientation: 'vertical',
    completedTone: 'success',
  },
};

// ── MDS-specific states (beyond reui's demo set) ────────────────────────────

export const Compact: Story = {
  parameters: {
    docs: { description: { story: 'MDS `variant="compact"` — tighter gaps and smaller type for dense layouts.' } },
  },
  args: { steps: claimSteps, variant: 'compact' },
};

export const WithError: Story = {
  parameters: {
    docs: { description: { story: 'MDS extension — reui has no error state; a step with `status: "error"` renders a danger-toned ✕ indicator.' } },
  },
  args: {
    steps: [
      { id: '1', label: 'Application submitted', status: 'completed' },
      { id: '2', label: 'Document verification', status: 'error', description: 'Missing required document' },
      { id: '3', label: 'Approval', status: 'pending' },
    ],
  },
};

export const WithDisabledStep: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A `disabled` step is skipped by both clicks and keyboard navigation (Arrow/Home/End step over it), matching native disabled-tab behavior.',
      },
    },
  },
  args: {
    steps: [
      { id: '1', label: 'Account details', status: 'completed' },
      { id: '2', label: 'Payment method', status: 'active' },
      { id: '3', label: 'Two-factor setup', status: 'pending', disabled: true, description: 'Unavailable until payment is confirmed' },
      { id: '4', label: 'Review & submit', status: 'pending' },
    ],
    onStepClick: () => {},
  },
};

export const Clickable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive steps follow the WAI-ARIA tablist pattern: click a step, or focus one and use Arrow keys/Home/End to move between steps and Enter/Space to activate — same keyboard model as reui.',
      },
    },
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    return <Stepper {...args} activeStep={current} onStepClick={setCurrent} />;
  },
  args: {
    steps: claimSteps.map(({ status: _status, ...s }) => s),
    orientation: 'horizontal',
  },
};

export const ActiveOnlyContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`contentMode="active-only"` renders a single shared tabpanel below the step row showing just the active step\'s content — reui\'s `StepperPanel`/`StepperContent` pattern — instead of `"inline"`\'s per-step content blocks. Click a step to switch panels.',
      },
    },
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    return <Stepper {...args} activeStep={current} onStepClick={setCurrent} />;
  },
  args: {
    steps: [
      { id: '1', label: 'Account details', content: 'Jane Doe · jane@company.com' },
      { id: '2', label: 'Coverage selection', content: 'Select which policies to include: General Liability, Cyber, Property.' },
      { id: '3', label: 'Review & submit', content: 'Review your selections before submitting.' },
    ],
    orientation: 'horizontal',
    contentMode: 'active-only',
  },
};
