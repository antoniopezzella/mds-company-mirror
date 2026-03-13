import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders when open', () => {
    render(<Modal open onClose={onClose} title="Test Modal"><p>Body</p></Modal>);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    render(<Modal open={false} onClose={onClose} title="Hidden"><p>Hidden Body</p></Modal>);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal open onClose={onClose} title="Closeable" />);
    fireEvent.click(screen.getByLabelText('close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders footer when hasFooter is true', () => {
    render(
      <Modal open onClose={onClose} hasFooter footer={<button>Save</button>}>
        Content
      </Modal>
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('hides header when hasHeader is false', () => {
    render(<Modal open onClose={onClose} hasHeader={false} title="Should Not Show" />);
    expect(screen.queryByText('Should Not Show')).not.toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Modal open onClose={onClose} title="Title" description="A description" />);
    expect(screen.getByText('A description')).toBeInTheDocument();
  });
});
