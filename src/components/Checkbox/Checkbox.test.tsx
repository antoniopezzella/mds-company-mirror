import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DSCheckbox, { DSCheckboxGroup } from './Checkbox';

describe('DSCheckbox', () => {
  it('renders with label', () => {
    render(<DSCheckbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('renders without label', () => {
    const { container } = render(<DSCheckbox />);
    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
  });

  it('toggles checked state', () => {
    render(<DSCheckbox label="Check me" />);
    const checkbox = screen.getByLabelText('Check me');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('supports disabled state', () => {
    render(<DSCheckbox label="Disabled" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  it('supports danger tone', () => {
    const { container } = render(<DSCheckbox label="Danger" tone="danger" />);
    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<DSCheckbox label="Email notifications" helperText="We will send updates about your account activity." />);
    expect(screen.getByText('We will send updates about your account activity.')).toBeInTheDocument();
  });

  it('links helper text to the input via aria-describedby', () => {
    render(<DSCheckbox label="Email notifications" helperText="Some hint" />);
    const checkbox = screen.getByLabelText('Email notifications');
    const helperTextEl = screen.getByText('Some hint');
    expect(checkbox.getAttribute('aria-describedby')).toBe(helperTextEl.parentElement?.id);
  });

  it('renders the helper row when hasHelper is true even without helperText', () => {
    const { container } = render(<DSCheckbox label="No text yet" hasHelper />);
    expect(container.querySelector('[id$="-helper-text"]')).toBeInTheDocument();
  });

  it('does not render a helper row when neither helperText nor hasHelper is set', () => {
    const { container } = render(<DSCheckbox label="Plain checkbox" />);
    expect(container.querySelector('[id$="-helper-text"]')).not.toBeInTheDocument();
  });

  it('renders a custom helperIcon instead of the default indicator', () => {
    render(<DSCheckbox label="With icon" helperText="Hint" helperIcon={<span data-testid="custom-icon">*</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});

describe('DSCheckboxGroup', () => {
  const options = [
    { value: 'fire', label: 'Fire' },
    { value: 'flood', label: 'Flood' },
    { value: 'wind', label: 'Wind' },
  ];

  it('renders all options', () => {
    render(<DSCheckboxGroup options={options} label="Coverage Types" />);
    expect(screen.getByText('Fire')).toBeInTheDocument();
    expect(screen.getByText('Flood')).toBeInTheDocument();
    expect(screen.getByText('Wind')).toBeInTheDocument();
  });

  it('renders group label', () => {
    render(<DSCheckboxGroup options={options} label="Coverage Types" />);
    expect(screen.getByText('Coverage Types')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<DSCheckboxGroup options={options} label="Types" helperText="Select all that apply" />);
    expect(screen.getByText('Select all that apply')).toBeInTheDocument();
  });

  it('calls onChange when option is toggled', () => {
    const onChange = vi.fn();
    render(<DSCheckboxGroup options={options} label="Types" value={[]} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Fire'));
    expect(onChange).toHaveBeenCalled();
  });

  it('supports horizontal layout', () => {
    const { container } = render(<DSCheckboxGroup options={options} label="Types" row />);
    const group = container.querySelector('.MuiFormGroup-row');
    expect(group).toBeInTheDocument();
  });
});
