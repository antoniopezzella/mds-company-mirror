"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
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
}

/**
 * Design System Textarea — shadcn/ui counterpart for the MDS TextField's
 * `type="textarea"` mode. Same tone-driven validation coloring as Input.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, tone = 'default', style, disabled, ...props }, ref) => {
    const toneRole = getToneBorderRole(tone);
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          'flex min-h-[80px] w-full rounded-xs border bg-transparent px-3 py-2 font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] text-sm shadow-xs transition-colors placeholder:opacity-70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
Textarea.displayName = 'Textarea';

export { Textarea };
