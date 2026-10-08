"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { CONTROL_PX, CONTROL_PY, CONTROL_RADIUS, CONTROL_TEXT, useControlSize, type ControlSize } from './control-size';
import { getRoleColor, type RoleName } from '@/theme/roles';
import type { InputTone } from './input';

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

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  tone?: InputTone;
  /**
   * Control size. Shares the scale with Input and Button, but applies only
   * padding and type — a textarea's height is set by its content and `rows`,
   * so it deliberately takes no fixed height from the scale.
   */
  size?: ControlSize;
}

/**
 * Design System Textarea — shadcn/ui counterpart for the MDS TextField's
 * `type="textarea"` mode. Same tone-driven validation coloring as Input.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, tone = 'default', size, style, disabled, ...props }, ref) => {
    const resolvedSize = useControlSize(size);
    const toneRole = getToneBorderRole(tone);
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          'box-border flex min-h-[80px] w-full border bg-transparent font-sans-productive shadow-xs transition-colors placeholder:opacity-70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          CONTROL_RADIUS,
          CONTROL_PX[resolvedSize],
          CONTROL_PY[resolvedSize],
          CONTROL_TEXT[resolvedSize],
          className
        )}
        style={
          {
            borderColor: toneRole ? getRoleColor(toneRole) : 'var(--role-border-default)',
            color: 'var(--role-text-primary)',
            backgroundColor: 'var(--role-surface-default)',
            '--tw-ring-color': toneRole ? getRoleColor(toneRole) : 'var(--role-focus-ring)',
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
