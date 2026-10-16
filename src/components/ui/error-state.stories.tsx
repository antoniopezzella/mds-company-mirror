import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataError } from './error-state';

/**
 * # Error State
 *
 * The failure state for a data surface. The root is `role="alert"`, so a dead
 * fetch is *announced* rather than silently reading as "No data yet" —
 * indistinguishable from a genuinely empty result, the worst dashboard failure
 * mode. The title is a `<div>`, never a heading, so dropping one into a table
 * or card at any depth can't break heading order.
 *
 * Pass `title` / `description` / `onRetry` for the standard `DataError`
 * composition shown here; use the slot components (`ErrorStateHeader`,
 * `ErrorStateMedia`, …) when you need full control.
 */
const meta: Meta<typeof DataError> = {
  title: 'Components/Error State',
  component: DataError,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['block', 'inline'] },
  },
};
export default meta;
type Story = StoryObj<typeof DataError>;

/** The default message, with no recovery action. */
export const Default: Story = {
  args: {},
};

/**
 * With a retry action — the prop worth passing, since a dashboard failure is
 * almost always transient. When `onRetry` is absent no button renders at all,
 * rather than a disabled one.
 */
export const WithRetry: Story = {
  args: {
    title: 'Could not load claims',
    description: 'The request timed out before the server responded.',
    detail: 'trace-id: 7f3a9c2',
    onRetry: () => {},
  },
};

/** Compact row, for inside a card or KPI tile where a full block is absurd. */
export const Inline: Story = {
  args: {
    variant: 'inline',
    title: 'Failed to load',
    description: 'Retry in a moment.',
    onRetry: () => {},
  },
};
