import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Alert, AlertTitle, AlertDescription } from './alert';

describe('Alert', () => {
  it('renders children content', () => {
    render(<Alert severity="info">Something happened</Alert>);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('renders a title separately from the description', () => {
    render(
      <Alert severity="success" title="Saved">
        Your changes were saved.
      </Alert>
    );
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Your changes were saved.')).toBeInTheDocument();
  });

  it('uses role="alert" for error and warning severities', () => {
    const { rerender } = render(<Alert severity="error">Error</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    rerender(<Alert severity="warning">Warning</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for info and success severities', () => {
    const { rerender } = render(<Alert severity="info">Info</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    rerender(<Alert severity="success">Success</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders a close button when onClose is provided and calls it on click', () => {
    const onClose = vi.fn();
    render(
      <Alert severity="info" onClose={onClose}>
        Dismissible
      </Alert>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('omits the close button when onClose is not provided', () => {
    render(<Alert severity="info">No close</Alert>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('exports AlertTitle and AlertDescription for standalone composable usage', () => {
    render(
      <div>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Extra detail here.</AlertDescription>
      </div>
    );
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Extra detail here.')).toBeInTheDocument();
  });
});
