"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { normalizeSize } from './prop-compat';
import { CONTROL_HEIGHT, CONTROL_PX, CONTROL_RADIUS, CONTROL_TEXT, useControlSize, type ControlSize } from './control-size';
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

/**
 * There is no `startAdornment`/`endAdornment`/`InputAdornment` prop —
 * unlike the MUI TextField this wraps conceptually, this component has
 * no slot for a leading icon or trailing button. For that, compose
 * `InputGroup`/`InputGroupAddon` (see `input-group.tsx`) around a plain
 * `Input`, rather than reaching for an adornment prop that doesn't exist
 * here.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  tone?: InputTone;
  /**
   * Control size. Shares one scale with Button and every other field —
   * see control-size.ts. Omit to inherit from an enclosing
   * `InputGroup`/`ButtonGroup`, which defaults to `md`.
   */
  size?: ControlSize;
  /** @deprecated since 0.7.0; remove after 0.8.0 / 2026-12-23.
   *  Use `size`. Kept so existing call sites keep working. */
  inputSize?: ControlSize | 'small' | 'medium';
}

/**
 * Design System Input — shadcn/ui counterpart for the MDS TextField's input
 * mode. Same tone-driven validation coloring as the MUI twin.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, tone = 'default', size, inputSize, style, disabled, ...props }, ref) => {
    // `size` wins; `inputSize` is the legacy spelling. Neither set means
    // inherit from the enclosing group, then fall back to md.
    const legacy = inputSize ? (normalizeSize(inputSize, 'Input') as ControlSize) : undefined;
    const resolvedSize = useControlSize(size ?? legacy);
    const toneRole = getToneBorderRole(tone);
    return (
      <input
        ref={ref}
        disabled={disabled}
        className={cn(
          'box-border flex w-full border bg-transparent font-sans-productive shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          CONTROL_RADIUS,
          CONTROL_HEIGHT[resolvedSize],
          CONTROL_PX[resolvedSize],
          CONTROL_TEXT[resolvedSize],
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
