"use client"

// No MDS/Figma spec exists for this yet; built matching real shadcn/ui conventions directly.
import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Dot } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

/**
 * Design System InputOTP — shadcn/ui counterpart wrapping the `input-otp`
 * package's `OTPInput`. No MDS twin exists yet; built to match shadcn/ui's
 * reference `InputOTP` / `InputOTPGroup` / `InputOTPSlot` / `InputOTPSeparator`
 * API. `input-otp` exposes state via the `OTPInputContext` React Context
 * (not a `useOTPInputContext` hook — verified against the package's own
 * `dist/index.d.ts`), consumed here with `React.useContext`.
 */
const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      // The package renders a real <input> behind the visual slots. It is the
      // element that actually receives typing, so it needs an accessible name
      // (axe: label) — there is no visible <label> associated with it, and the
      // slots are decorative divs. Defaulted rather than required so existing
      // call sites keep working; placed before the spread so a caller's own
      // aria-label / aria-labelledby wins.
      aria-label="One-time code"
      containerClassName={cn('flex items-center gap-2 has-[:disabled]:opacity-50', containerClassName)}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  )
);
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center', className)} {...props} />
);
InputOTPGroup.displayName = 'InputOTPGroup';

export interface InputOTPSlotProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Zero-based position in the code — reads its character and active/caret state from the parent `OTPInputContext`, not from props directly. */
  index: number;
}

const InputOTPSlot = React.forwardRef<
  React.ElementRef<'div'>,
  InputOTPSlotProps
>(({ index, className, style, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext?.slots[index];
  const { char, hasFakeCaret, isActive } = slot ?? { char: null, hasFakeCaret: false, isActive: false };

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center border-y border-r font-sans-productive text-sm transition-all first:rounded-l-lg first:border-l last:rounded-r-lg',
        isActive && 'z-10 ring-2 ring-offset-0',
        className
      )}
      style={
        {
          borderColor: isActive ? getRoleColor('focus.ring') : getRoleColor('border.default'),
          color: getRoleColor('text.primary'),
          backgroundColor: getRoleColor('surface.default'),
          '--tw-ring-color': getRoleColor('focus.ring'),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="h-4 w-px animate-caret-blink"
            style={{ backgroundColor: getRoleColor('text.primary') }}
          />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot style={{ color: getRoleColor('text.secondary') }} />
    </div>
  )
);
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
