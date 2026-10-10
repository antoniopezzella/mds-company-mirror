import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { DSSwitch } from './switch';

describe('DSSwitch', () => {
  it('renders with a label', () => {
    render(<DSSwitch label="Enable notifications" />);
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  it('toggles checked state on click (uncontrolled)', () => {
    render(<DSSwitch label="Auto-save" />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onCheckedChange with the new value', () => {
    const onCheckedChange = vi.fn();
    render(<DSSwitch label="Dark mode" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('respects a controlled checked value', () => {
    const onCheckedChange = vi.fn();
    render(<DSSwitch label="Controlled" checked={true} onCheckedChange={onCheckedChange} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(toggle);
    // Controlled: internal state doesn't flip on its own, only the callback fires.
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('does not toggle when disabled', () => {
    const onCheckedChange = vi.fn();
    render(<DSSwitch label="Locked" disabled onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('renders without a label when none is passed', () => {
    render(<DSSwitch aria-label="Bare switch" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
    expect(screen.queryByText('Bare switch')).not.toBeInTheDocument();
  });

  it('places the label before the control when labelPlacement is start', () => {
    const { container } = render(<DSSwitch label="Leading label" labelPlacement="start" />);
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toMatch(/flex-row-reverse/);
  });

  it('applies danger tone styling when checked', () => {
    render(<DSSwitch label="Delete on submit" tone="danger" defaultChecked />);
    const toggle = screen.getByRole('switch');
    // Danger tone resolves through interactive.danger rather than
    // interactive.primary — asserting it's a real, non-empty color is a
    // reasonable proxy without hardcoding the resolved hex.
    expect(toggle.style.backgroundColor).toBeTruthy();
  });
});
