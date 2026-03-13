import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DSSnackbar from './Snackbar';

describe('DSSnackbar', () => {
  it('renders message when open', () => {
    render(<DSSnackbar open message="Operation completed" />);
    expect(screen.getByText('Operation completed')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<DSSnackbar open={false} message="Hidden message" />);
    expect(screen.queryByText('Hidden message')).not.toBeInTheDocument();
  });

  it('renders with success severity', () => {
    render(<DSSnackbar open message="Saved" severity="success" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('renders with error severity', () => {
    render(<DSSnackbar open message="Error occurred" severity="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders with warning severity', () => {
    render(<DSSnackbar open message="Caution" severity="warning" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<DSSnackbar open message="Closable" onClose={onClose} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders action text', () => {
    const onAction = vi.fn();
    render(<DSSnackbar open message="Undoable" actionText="Undo" onAction={onAction} />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
  });
});
