import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DSTextField from './TextField';

describe('DSTextField', () => {
  it('renders with label', () => {
    render(<DSTextField label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<DSTextField label="Name" helperText="Enter your full name" />);
    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<DSTextField label="Email" error helperText="Invalid email" tone="error" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<DSTextField label="Field" variant="outlined" />);
    expect(screen.getByLabelText('Field')).toBeInTheDocument();
    rerender(<DSTextField label="Field" variant="filled" />);
    expect(screen.getByLabelText('Field')).toBeInTheDocument();
  });

  it('renders full width', () => {
    const { container } = render(<DSTextField label="Wide" fullWidth />);
    const root = container.querySelector('.MuiFormControl-fullWidth');
    expect(root).toBeInTheDocument();
  });

  it('renders in small size', () => {
    render(<DSTextField label="Small" size="small" />);
    expect(screen.getByLabelText('Small')).toBeInTheDocument();
  });
});
