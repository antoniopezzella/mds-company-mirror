import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DSRadio, { DSRadioGroup } from './Radio';

describe('DSRadio', () => {
  it('renders with label', () => {
    render(<DSRadio label="Option A" value="a" />);
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
  });

  it('renders without label', () => {
    const { container } = render(<DSRadio value="a" />);
    expect(container.querySelector('input[type="radio"]')).toBeInTheDocument();
  });

  it('supports disabled state', () => {
    render(<DSRadio label="Disabled" value="a" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  it('supports danger tone', () => {
    const { container } = render(<DSRadio label="Danger" value="a" tone="danger" />);
    expect(container.querySelector('input[type="radio"]')).toBeInTheDocument();
  });
});

describe('DSRadioGroup', () => {
  const options = [
    { value: 'auto', label: 'Auto Insurance' },
    { value: 'home', label: 'Home Insurance' },
    { value: 'life', label: 'Life Insurance' },
  ];

  it('renders all options', () => {
    render(<DSRadioGroup options={options} label="Insurance Type" />);
    expect(screen.getByText('Auto Insurance')).toBeInTheDocument();
    expect(screen.getByText('Home Insurance')).toBeInTheDocument();
    expect(screen.getByText('Life Insurance')).toBeInTheDocument();
  });

  it('renders group label', () => {
    render(<DSRadioGroup options={options} label="Insurance Type" />);
    expect(screen.getByText('Insurance Type')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<DSRadioGroup options={options} label="Type" helperText="Choose one option" />);
    expect(screen.getByText('Choose one option')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<DSRadioGroup options={options} label="Type" error helperText="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const onChange = vi.fn();
    render(<DSRadioGroup options={options} label="Type" value="" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Auto Insurance'));
    expect(onChange).toHaveBeenCalled();
  });

  it('supports horizontal layout', () => {
    const { container } = render(<DSRadioGroup options={options} label="Type" row />);
    const group = container.querySelector('.MuiFormGroup-row');
    expect(group).toBeInTheDocument();
  });
});
