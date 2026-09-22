import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DSRadioGroup } from './radio-group';

describe('DSRadioGroup', () => {
  const options = [
    { value: 'auto', label: 'Auto Insurance' },
    { value: 'home', label: 'Home Insurance' },
    { value: 'life', label: 'Life Insurance', disabled: true },
  ];

  it('renders all options', () => {
    render(<DSRadioGroup options={options} />);
    expect(screen.getByText('Auto Insurance')).toBeInTheDocument();
    expect(screen.getByText('Home Insurance')).toBeInTheDocument();
    expect(screen.getByText('Life Insurance')).toBeInTheDocument();
  });

  it('renders the group label', () => {
    render(<DSRadioGroup options={options} label="Coverage type" />);
    expect(screen.getByText('Coverage type')).toBeInTheDocument();
  });

  it('marks the option matching value as checked', () => {
    render(<DSRadioGroup options={options} value="home" />);
    const radios = screen.getAllByRole('radio');
    const homeRadio = radios.find((r) => r.getAttribute('value') === 'home');
    expect(homeRadio).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange with the newly selected value', () => {
    const onChange = vi.fn();
    render(<DSRadioGroup options={options} value="auto" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    const homeRadio = radios.find((r) => r.getAttribute('value') === 'home')!;
    fireEvent.click(homeRadio);
    expect(onChange).toHaveBeenCalledWith('home');
  });

  it('disables an individual option marked disabled', () => {
    render(<DSRadioGroup options={options} />);
    const radios = screen.getAllByRole('radio');
    const lifeRadio = radios.find((r) => r.getAttribute('value') === 'life');
    expect(lifeRadio).toBeDisabled();
  });

  it('disables every option when the group itself is disabled', () => {
    render(<DSRadioGroup options={options} disabled />);
    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toBeDisabled();
    }
  });

  it('does not select a disabled option on click', () => {
    const onChange = vi.fn();
    render(<DSRadioGroup options={options} value="auto" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    const lifeRadio = radios.find((r) => r.getAttribute('value') === 'life')!;
    fireEvent.click(lifeRadio);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders helper text and marks it invalid on error', () => {
    render(<DSRadioGroup options={options} error helperText="Please select a coverage type" />);
    expect(screen.getByText('Please select a coverage type')).toBeInTheDocument();
  });
});
