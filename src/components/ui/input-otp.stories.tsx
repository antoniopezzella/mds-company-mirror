import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from './input-otp';

/**
 * # InputOTP (shadcn/ui)
 *
 * Wraps the `input-otp` package's `OTPInput`. No MDS/Figma spec exists for
 * this component yet — built to match shadcn/ui's reference implementation
 * (`InputOTP` / `InputOTPGroup` / `InputOTPSlot` / `InputOTPSeparator`)
 * directly, styled with `getRoleColor()` role tokens. Each slot reads its
 * active/filled state from `input-otp`'s `OTPInputContext` React Context and
 * reuses the `--tw-ring-color` focus-ring trick from `input.tsx`.
 */
const meta: Meta<typeof InputOTP> = {
  title: 'Components/InputOTP',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Segmented input for one-time codes, PINs, and verification digits.',
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/**
 * A 6-digit two-factor authentication code entry, split 3-3 with a visual
 * separator — a common real-world OTP layout.
 */
export const TwoFactorCode: StoryObj = {
  render: () => (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const FourDigitPin: StoryObj = {
  render: () => (
    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <InputOTP maxLength={6} disabled defaultValue="123">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/**
 * Controlled example showing the entered value echoed back, and a
 * completion callback firing once all digits are filled — the shape used
 * for a real verify-code flow guarding a policy document download.
 */
export const ControlledWithCompletion: StoryObj = {
  render: () => {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState<'idle' | 'complete'>('idle');

    return (
      <div className="flex flex-col items-center gap-3">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={value}
          onChange={(next) => {
            setValue(next);
            setStatus('idle');
          }}
          onComplete={() => setStatus('complete')}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-xs opacity-60">
          {status === 'complete' ? 'Code verified' : `${value.length}/6 digits entered`}
        </p>
      </div>
    );
  },
};
