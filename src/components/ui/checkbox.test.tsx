import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DSCheckbox } from './checkbox';

describe('DSCheckbox', () => {
  it('renders with a label', () => {
    render(<DSCheckbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('toggles checked state on click (uncontrolled)', () => {
    render(<DSCheckbox label="Subscribe" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onCheckedChange with the new value', () => {
    const onCheckedChange = vi.fn();
    render(<DSCheckbox label="Subscribe" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('renders indeterminate state', () => {
    render(<DSCheckbox label="Select all" indeterminate />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('renders helper text and wires aria-describedby', () => {
    render(<DSCheckbox label="Newsletter" helperText="You can unsubscribe anytime" />);
    const helper = screen.getByText('You can unsubscribe anytime');
    expect(helper).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-describedby', helper.closest('[id]')?.id);
  });

  it('marks helper as an alert when invalid', () => {
    render(<DSCheckbox label="Consent" invalid helperText="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('does not toggle when disabled', () => {
    const onCheckedChange = vi.fn();
    render(<DSCheckbox label="Locked" disabled onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('tracks hover interaction on the control for style resolution', () => {
    render(<DSCheckbox label="Hover me" />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.mouseEnter(checkbox);
    // Unchecked+hover per Figma spec resolves to the interactive.secondary
    // (Active Blue) border — verifying it differs from the resting border
    // color is a reasonable proxy without asserting an exact resolved value.
    const hoverBorderColor = checkbox.style.borderColor;
    fireEvent.mouseLeave(checkbox);
    const restBorderColor = checkbox.style.borderColor;
    expect(hoverBorderColor).not.toBe(restBorderColor);
  });
});
