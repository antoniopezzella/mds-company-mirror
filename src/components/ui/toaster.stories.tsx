import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toaster, showSnackbar } from './toaster';
import { toast } from './use-toast';

/**
 * # Toast (shadcn/ui)
 *
 * Radix `Toast` is a queue/viewport system — call `toast()` from anywhere
 * and it stacks into a shared `<Toaster />`, each with its own auto-dismiss
 * timer and swipe-to-dismiss. That's a materially better architecture than
 * MUI's `Snackbar`, which is one controlled instance per call site (no
 * stacking, `open` state managed manually everywhere it's used).
 *
 * `showSnackbar()` is a convenience wrapper matching MUI's
 * `message`/`severity`/`actionText`/`onAction`/`autoHideDuration` shape, for
 * teams migrating from `DSSnackbar` — but it still fires into the same
 * shared queue underneath.
 *
 * `<Toaster />` should be mounted once near your app root; each story below
 * mounts its own copy since Storybook stories are isolated.
 */
const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Composable: StoryObj = {
  render: () => (
    <>
      <button
        className="rounded border px-3 py-1.5 text-sm"
        onClick={() =>
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10 at 5:57 PM',
          })
        }
      >
        Show toast
      </button>
      <Toaster />
    </>
  ),
};

export const Tones: StoryObj = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <button className="rounded border px-3 py-1.5 text-sm" onClick={() => toast({ tone: 'default', description: 'Default toast' })}>
          Default
        </button>
        <button className="rounded border px-3 py-1.5 text-sm" onClick={() => toast({ tone: 'success', description: 'Saved successfully' })}>
          Success
        </button>
        <button className="rounded border px-3 py-1.5 text-sm" onClick={() => toast({ tone: 'warning', description: 'Storage almost full' })}>
          Warning
        </button>
        <button className="rounded border px-3 py-1.5 text-sm" onClick={() => toast({ tone: 'danger', description: 'Failed to save changes' })}>
          Danger
        </button>
        <button className="rounded border px-3 py-1.5 text-sm" onClick={() => toast({ tone: 'info', description: 'A new version is available' })}>
          Info
        </button>
      </div>
      <Toaster />
    </>
  ),
};

export const WithAction: StoryObj = {
  render: () => (
    <>
      <button
        className="rounded border px-3 py-1.5 text-sm"
        onClick={() => showSnackbar({ message: 'Email deleted', severity: 'info', actionText: 'Undo', onAction: () => toast({ description: 'Delete undone' }) })}
      >
        Delete email
      </button>
      <Toaster />
    </>
  ),
};

export const StackingMultiple: StoryObj = {
  render: () => (
    <>
      <button
        className="rounded border px-3 py-1.5 text-sm"
        onClick={() => {
          showSnackbar({ message: 'Upload started', severity: 'info' });
          showSnackbar({ message: 'Processing image 1 of 3', severity: 'info' });
          showSnackbar({ message: 'Upload complete', severity: 'success' });
        }}
      >
        Fire 3 toasts (stacked)
      </button>
      <Toaster />
    </>
  ),
};

// ── showSnackbar (MUI-parity convenience wrapper) ──────────────────────────

export const SnackbarSuccess: StoryObj = {
  render: () => (
    <>
      <button className="rounded border px-3 py-1.5 text-sm" onClick={() => showSnackbar({ message: 'Policy saved', severity: 'success' })}>
        Save policy
      </button>
      <Toaster />
    </>
  ),
};

export const SnackbarError: StoryObj = {
  render: () => (
    <>
      <button className="rounded border px-3 py-1.5 text-sm" onClick={() => showSnackbar({ message: 'Failed to save policy', severity: 'error' })}>
        Trigger error
      </button>
      <Toaster />
    </>
  ),
};
