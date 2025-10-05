import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Alert } from './Alert';

describe('Alert', () => {
  it('assigns role="alert" for error', () => {
    render(<Alert severity="error">Failure</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Failure');
  });
  it('assigns role="status" for info', () => {
    render(<Alert severity="info">Info Text</Alert>);
    expect(screen.getByRole('status')).toHaveTextContent('Info Text');
  });
  it('renders title when provided', () => {
    render(<Alert severity="warning" title="Heads Up">Body</Alert>);
    expect(screen.getByText('Heads Up')).toBeInTheDocument();
  });
});
