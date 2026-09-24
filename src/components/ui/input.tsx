"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { normalizeSize } from './prop-compat';
import { getRoleColor, type RoleName } from '@/theme/roles';

/**
 * Form-field validation state — NOT action severity.
 *
 * `error` here is the state of the field's value (cf. `aria-invalid`, `:invalid`,
 * WCAG 3.3.1 "Error Identification"), which is a different axis from a Button's
 * `danger` tone meaning "this action is destructive". See prop-compat.ts.
 */
export type InputTone = 'default' | 'error' | 'success' | 'warning';

function getToneBorderRole(tone: InputTone): RoleName | null {
  switch (tone) {
    case 'error':
      return 'status.danger.fg';
    case 'success':
      return 'status.success.fg';
    case 'warning':
      return 'status.warning.fg';
    default:
      return null;
  }
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  tone?: InputTone;
  /** MUI-parity size preset */
  inputSize?: 'sm' | 'md' | 'small' | 'medium';
}

/**
 * Design System Input — shadcn/ui counterpart for the MDS TextField's input
 * mode. Same tone-driven validation coloring as the MUI twin.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, tone = 'default', inputSize = 'md', style, disabled, ...props }, ref) => {
    const resolvedSize = normalizeSize(inputSize, 'Input');
    const toneRole = getToneBorderRole(tone);
    return (
      <input
        ref={ref}
        disabled={disabled}
        className={cn(
          'flex w-full rounded-md border bg-transparent font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          resolvedSize === 'sm' ? 'h-8 px-2.5 py-1' : 'h-10 px-3 py-2',
          className
        )}
        style={
          {
            borderColor: toneRole ? getRoleColor(toneRole) : getRoleColor('border.default'),
            color: getRoleColor('text.primary'),
            backgroundColor: getRoleColor('surface.default'),
            '--tw-ring-color': toneRole ? getRoleColor(toneRole) : getRoleColor('focus.ring'),
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
