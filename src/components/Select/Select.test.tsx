import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DSSelect from './Select';

describe('DSSelect', () => {
  const options = [
    { value: 'auto', label: 'Auto Insurance' },
    { value: 'home', label: 'Home Insurance' },
    { value: 'life', label: 'Life Insurance', disabled: true },
  ];

  it('renders with label', () => {
    render(<DSSelect options={options} label="Insurance Type" />);
    const labels = screen.getAllByText('Insurance Type');
    expect(labels.length).toBeGreaterThan(0);
  });

  it('renders helper text', () => {
    render(<DSSelect options={options} label="Type" helperText="Select a policy type" />);
    expect(screen.getByText('Select a policy type')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<DSSelect options={options} label="Type" error helperText="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('renders all options when opened', () => {
    render(<DSSelect options={options} label="Type" />);
    // Open the select
    fireEvent.mouseDown(screen.getByRole('combobox'));
    expect(screen.getByText('Auto Insurance')).toBeInTheDocument();
    expect(screen.getByText('Home Insurance')).toBeInTheDocument();
    expect(screen.getByText('Life Insurance')).toBeInTheDocument();
  });

  it('renders full width', () => {
    const { container } = render(<DSSelect options={options} label="Wide" fullWidth />);
    const control = container.querySelector('.MuiFormControl-fullWidth');
    expect(control).toBeInTheDocument();
  });
});
