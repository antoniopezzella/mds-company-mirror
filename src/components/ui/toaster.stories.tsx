import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { Toaster, showSnackbar } from './toaster';
import { toast } from './use-toast';

/**
 * # Toast
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
        <Button variant="outline" size="sm" onClick={() => toast({ tone: 'default', description: 'Default toast' })}>
          Default
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast({ tone: 'success', description: 'Saved successfully' })}>
          Success
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast({ tone: 'warning', description: 'Storage almost full' })}>
          Warning
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast({ tone: 'danger', description: 'Failed to save changes' })}>
          Danger
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast({ tone: 'info', description: 'A new version is available' })}>
          Info
        </Button>
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
      <Button variant="outline" size="sm" onClick={() => showSnackbar({ message: 'Policy saved', severity: 'success' })}>
        Save policy
      </Button>
      <Toaster />
    </>
  ),
};

export const SnackbarError: StoryObj = {
  render: () => (
    <>
      <Button variant="outline" size="sm" onClick={() => showSnackbar({ message: 'Failed to save policy', severity: 'error' })}>
        Trigger error
      </Button>
      <Toaster />
    </>
  ),
};
