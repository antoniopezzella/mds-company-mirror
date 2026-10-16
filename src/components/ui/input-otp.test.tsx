import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from './input-otp';

// `input-otp` renders one real <input> behind the decorative slots; the slots
// read their char/active state from OTPInputContext.
function Otp({ onChange }: { onChange?: (v: string) => void } = {}) {
  return (
    <InputOTP maxLength={4} onChange={onChange}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}

describe('InputOTP', () => {
  it('gives the underlying input a default accessible name', () => {
    render(<Otp />);
    expect(screen.getByRole('textbox', { name: 'One-time code' })).toBeInTheDocument();
  });

  it('lets a caller override the default aria-label', () => {
    render(
      <InputOTP maxLength={4} aria-label="Verification code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
      </InputOTP>
    );
    expect(screen.getByRole('textbox', { name: 'Verification code' })).toBeInTheDocument();
  });

  it('fires onChange and renders typed characters into the slots', () => {
    const onChange = vi.fn();
    render(<Otp onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '12' } });
    expect(onChange).toHaveBeenCalledWith('12');
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('caps input at maxLength', () => {
    render(<Otp />);
    expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '4');
  });

  it('renders a separator with the separator role', () => {
    render(<Otp />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('forwards disabled to the input', () => {
    render(
      <InputOTP maxLength={4} disabled>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
      </InputOTP>
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
