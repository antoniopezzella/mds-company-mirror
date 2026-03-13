import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DSSwitch from './Switch';

describe('DSSwitch', () => {
  it('renders with label', () => {
    render(<DSSwitch label="Enable notifications" />);
    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
  });

  it('renders without label', () => {
    const { container } = render(<DSSwitch />);
    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
  });

  it('toggles on click', () => {
    const onChange = vi.fn();
    render(<DSSwitch label="Toggle" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Toggle'));
    expect(onChange).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(<DSSwitch label="Disabled" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  it('renders with default checked', () => {
    render(<DSSwitch label="Default on" defaultChecked />);
    expect(screen.getByLabelText('Default on')).toBeChecked();
  });

  it('supports label placement', () => {
    const { container } = render(<DSSwitch label="Start label" labelPlacement="start" />);
    expect(container.querySelector('.MuiFormControlLabel-labelPlacementStart')).toBeInTheDocument();
  });
});
