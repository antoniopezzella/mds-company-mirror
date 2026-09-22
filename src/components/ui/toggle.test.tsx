import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Toggle } from './toggle';

describe('Toggle', () => {
  it('renders its children', () => {
    render(<Toggle>Bold</Toggle>);
    expect(screen.getByText('Bold')).toBeInTheDocument();
  });

  it('starts unpressed by default (uncontrolled)', () => {
    render(<Toggle>Italic</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles pressed state on click (uncontrolled)', () => {
    render(<Toggle>Underline</Toggle>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onPressedChange with the new pressed value', () => {
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Strike</Toggle>);
    fireEvent.click(screen.getByRole('button'));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('respects a controlled pressed value', () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle pressed={true} onPressedChange={onPressedChange}>
        Controlled
      </Toggle>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(button);
    // Controlled: doesn't flip on its own, only the callback fires.
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(onPressedChange).toHaveBeenCalledWith(false);
  });

  it('honors defaultPressed for the initial uncontrolled state', () => {
    render(<Toggle defaultPressed>Pre-pressed</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('does not toggle when disabled', () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle disabled onPressedChange={onPressedChange}>
        Locked
      </Toggle>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onPressedChange).not.toHaveBeenCalled();
  });
});
