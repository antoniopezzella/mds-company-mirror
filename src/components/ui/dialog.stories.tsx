import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Modal,
} from './dialog';

/**
 * # Dialog / Modal (shadcn/ui)
 *
 * Radix `Dialog` is composable by design — you assemble header/body/footer
 * yourself via `DialogHeader`/`DialogTitle`/`DialogDescription`/`DialogFooter`,
 * rather than being locked into MUI's fixed title/content/actions slots.
 * That's the primary, recommended API here.
 *
 * `Modal` (bottom of this file) is a thin convenience wrapper over the same
 * primitives for teams migrating from the MUI `Modal`'s
 * `open`/`onClose`/`title`/`footer` prop shape.
 */
const meta: Meta<typeof Dialog> = {
  title: 'shadcn-ui/Dialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Composable: StoryObj = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded border px-3 py-1.5 text-sm">Open dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit policy details</DialogTitle>
          <DialogDescription>Make changes to the policy here. Click save when done.</DialogDescription>
        </DialogHeader>
        <p className="text-sm">Composable body content goes here — any layout you want.</p>
        <DialogFooter>
          <DialogClose asChild>
            <button className="rounded border px-3 py-1.5 text-sm">Cancel</button>
          </DialogClose>
          <button className="rounded bg-[#000f47] px-3 py-1.5 text-sm text-white">Save changes</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const NoFooter: StoryObj = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded border px-3 py-1.5 text-sm">Open dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Heads up</DialogTitle>
        </DialogHeader>
        <p className="text-sm">A simple informational dialog with no footer actions.</p>
      </DialogContent>
    </Dialog>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex gap-2">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <button className="rounded border px-3 py-1.5 text-sm capitalize">{size}</button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{size.toUpperCase()} dialog</DialogTitle>
            </DialogHeader>
            <p className="text-sm">Content sized to the "{size}" preset.</p>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
};

// ── Modal (MUI-parity convenience wrapper) ─────────────────────────────────

export const ModalDefault: StoryObj<typeof Modal> = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button className="rounded border px-3 py-1.5 text-sm" onClick={() => setOpen(true)}>
          Open modal
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Delete policy"
          description="This action cannot be undone."
          footer={
            <>
              <button className="rounded border px-3 py-1.5 text-sm" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="rounded bg-[#c53532] px-3 py-1.5 text-sm text-white" onClick={() => setOpen(false)}>
                Delete
              </button>
            </>
          }
        >
          <p className="text-sm">Are you sure you want to delete this policy? This cannot be undone.</p>
        </Modal>
      </>
    );
  },
};

export const ModalFullScreen: StoryObj<typeof Modal> = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button className="rounded border px-3 py-1.5 text-sm" onClick={() => setOpen(true)}>
          Open fullscreen modal
        </button>
        <Modal open={open} onClose={() => setOpen(false)} title="Fullscreen review" size="FullScreen">
          <p className="text-sm">Fullscreen modals are useful for document review or complex forms.</p>
        </Modal>
      </>
    );
  },
};

export const ModalNoHeader: StoryObj<typeof Modal> = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button className="rounded border px-3 py-1.5 text-sm" onClick={() => setOpen(true)}>
          Open modal
        </button>
        <Modal open={open} onClose={() => setOpen(false)} hasHeader={false}>
          <p className="text-sm">A modal with no header — just body content.</p>
        </Modal>
      </>
    );
  },
};
