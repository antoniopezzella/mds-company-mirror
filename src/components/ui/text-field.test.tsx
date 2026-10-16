import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { DSTextField } from './text-field';

describe('DSTextField', () => {
  it('associates the label with the input', () => {
    render(<DSTextField label="Policy number" />);
    const input = screen.getByLabelText('Policy number');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('links helper text via aria-describedby', () => {
    render(<DSTextField label="Email" helperText="We never share it" />);
    const input = screen.getByLabelText('Email');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(screen.getByText('We never share it')).toHaveAttribute('id', describedBy!);
  });

  it('sets aria-invalid when error is true', () => {
    render(<DSTextField label="Email" error />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders a textarea when type is "textarea"', () => {
    render(<DSTextField label="Notes" type="textarea" />);
    expect(screen.getByLabelText('Notes').tagName).toBe('TEXTAREA');
  });

  it('shows a required asterisk alongside the label', () => {
    render(<DSTextField label="Name" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('forwards typed input to onChange', () => {
    const onChange = vi.fn();
    render(<DSTextField label="Search" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'auto' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('applies full width to the wrapper when fullWidth is set', () => {
    const { container } = render(<DSTextField label="Wide" fullWidth />);
    expect((container.firstElementChild as HTMLElement).className).toMatch(/\bw-full\b/);
  });
});
