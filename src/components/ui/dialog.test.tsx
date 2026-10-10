import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Dialog, DialogContent, DialogTitle, DialogDescription, Modal } from './dialog';

// Radix Dialog's open state is fully controllable via `open`/`onOpenChange`,
// so unlike the trigger-click-driven Select/DropdownMenu/Popover cases,
// these tests can render it already open without simulating pointer
// interaction on a trigger.
describe('Dialog / Modal', () => {
  it('renders content when open', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Confirm deletion</DialogTitle>
          <DialogDescription>This cannot be undone.</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Confirm deletion')).toBeInTheDocument();
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
  });

  it('renders nothing when closed', () => {
    render(
      <Dialog open={false}>
        <DialogContent>
          <DialogTitle>Hidden title</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(screen.queryByText('Hidden title')).not.toBeInTheDocument();
  });

  it('calls onOpenChange(false) when the built-in close button is clicked', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Closable</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('hides the close button when hideCloseButton is set', () => {
    render(
      <Dialog open>
        <DialogContent hideCloseButton>
          <DialogTitle>No close button</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  describe('Modal (MUI-parity wrapper)', () => {
    it('renders title, description, children, and footer when open', () => {
      render(
        <Modal open onClose={() => {}} title="Delete item" description="Are you sure?" footer={<button>Confirm</button>}>
          <p>Body content</p>
        </Modal>
      );
      expect(screen.getByText('Delete item')).toBeInTheDocument();
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
      expect(screen.getByText('Body content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });

    it('renders nothing when open is false', () => {
      render(
        <Modal open={false} onClose={() => {}} title="Should not render">
          <p>Body</p>
        </Modal>
      );
      expect(screen.queryByText('Should not render')).not.toBeInTheDocument();
    });

    it('calls onClose when dismissed', () => {
      const onClose = vi.fn();
      render(
        <Modal open onClose={onClose} title="Dismissible">
          <p>Body</p>
        </Modal>
      );
      fireEvent.click(screen.getByRole('button', { name: 'Close' }));
      expect(onClose).toHaveBeenCalled();
    });

    it('omits the header when hasHeader is false even with a title passed', () => {
      render(
        <Modal open onClose={() => {}} title="Should be hidden" hasHeader={false}>
          <p>Body</p>
        </Modal>
      );
      expect(screen.queryByText('Should be hidden')).not.toBeInTheDocument();
    });

    it('omits the footer when hasFooter is false even with footer content passed', () => {
      render(
        <Modal open onClose={() => {}} hasFooter={false} footer={<button>Should be hidden</button>}>
          <p>Body</p>
        </Modal>
      );
      expect(screen.queryByRole('button', { name: 'Should be hidden' })).not.toBeInTheDocument();
    });
  });
});
