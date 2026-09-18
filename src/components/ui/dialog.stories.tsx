import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
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
 * # Dialog / Modal
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
  title: 'Components/Dialog',
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
        <Button variant="outline" size="sm">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit policy details</DialogTitle>
          <DialogDescription>Make changes to the policy here. Click save when done.</DialogDescription>
        </DialogHeader>
        <p className="text-sm">Composable body content goes here — any layout you want.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </DialogClose>
          <Button variant="primary" size="sm">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const NoFooter: StoryObj = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Open dialog</Button>
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
            <Button variant="outline" size="sm" className="capitalize">{size}</Button>
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
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Delete policy"
          description="This action cannot be undone."
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" destructive size="sm" onClick={() => setOpen(false)}>
                Delete
              </Button>
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
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open fullscreen modal</Button>
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
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} hasHeader={false}>
          <p className="text-sm">A modal with no header — just body content.</p>
        </Modal>
      </>
    );
  },
};
