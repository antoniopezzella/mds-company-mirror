import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Avatar } from './avatar';

describe('Avatar', () => {
  it('renders fallback initials', () => {
    render(<Avatar initials="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('is not focusable or button-role when no onClick is provided', () => {
    const { container } = render(<Avatar initials="AB" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).not.toHaveAttribute('role');
    expect(wrapper).not.toHaveAttribute('tabindex');
  });

  it('becomes a keyboard-operable button when onClick is provided', () => {
    const onClick = vi.fn();
    render(<Avatar initials="CD" onClick={onClick} />);
    const wrapper = screen.getByRole('button');
    expect(wrapper).toHaveAttribute('tabindex', '0');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Avatar initials="EF" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onClick when activated via Enter key', () => {
    const onClick = vi.fn();
    render(<Avatar initials="GH" onClick={onClick} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onClick when activated via Space key', () => {
    const onClick = vi.fn();
    render(<Avatar initials="IJ" onClick={onClick} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(onClick).toHaveBeenCalled();
  });

  it('does not call onClick for an unrelated key', () => {
    const onClick = vi.fn();
    render(<Avatar initials="KL" onClick={onClick} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Tab' });
    expect(onClick).not.toHaveBeenCalled();
  });
});
