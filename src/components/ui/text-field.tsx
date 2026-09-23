"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { normalizeSize } from './prop-compat';
import { getRoleColor } from '@/theme/roles';
import { Input, type InputTone } from './input';
import { Label } from './label';
import { Textarea } from './textarea';

export interface DSTextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'tone'> {
  /** Renders a `<textarea>` instead of an `<input>` when set to 'textarea'. */
  type?: React.HTMLInputTypeAttribute | 'textarea';
  tone?: InputTone;
  size?: 'sm' | 'md' | 'small' | 'medium';
  fullWidth?: boolean;
  error?: boolean;
  label?: string;
  helperText?: React.ReactNode;
  /** Textarea-only: number of visible rows. */
  rows?: number;
  className?: string;
}

/**
 * Design System TextField — shadcn/ui counterpart for the MDS TextField.
 * Composes `Label` + `Input`/`Textarea` + helper text, matching the MUI
 * twin's `label`/`helperText`/`error`/`tone`/`size`/`fullWidth` API.
 */
export const DSTextField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, DSTextFieldProps>(
  (
    { type = 'text', tone = 'default', size = 'md', fullWidth = false, error = false, label, helperText, rows, id, className, ...rest },
    ref
  ) => {
    const generatedId = React.useId();
    const fieldId = id ?? generatedId;
    const helperId = `${fieldId}-helper`;
    const isError = error || tone === 'error';
    const effectiveTone: InputTone = isError ? 'error' : tone;

    const helperColor = isError
      ? getRoleColor('status.danger.fg')
      : tone === 'success'
        ? getRoleColor('status.success.fg')
        : tone === 'warning'
          ? getRoleColor('status.warning.fg')
          : getRoleColor('text.secondary');

    return (
      <div className={cn('inline-flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <Label htmlFor={fieldId}>
            {label}
            {rest.required && <span style={{ color: getRoleColor('status.danger.fg') }}> *</span>}
          </Label>
        )}
        {type === 'textarea' ? (
          <Textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={fieldId}
            tone={effectiveTone}
            rows={rows}
            aria-describedby={helperText ? helperId : undefined}
            aria-invalid={isError || undefined}
            className={fullWidth ? 'w-full' : undefined}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
            id={fieldId}
            type={type}
            tone={effectiveTone}
            inputSize={normalizeSize(size, 'TextField')}
            aria-describedby={helperText ? helperId : undefined}
            aria-invalid={isError || undefined}
            className={fullWidth ? 'w-full' : undefined}
            {...rest}
          />
        )}
        {helperText && (
          <span
            id={helperId}
            className="font-[var(--typo-caption-font-family,_Noto_Sans,_sans-serif)] text-xs"
            style={{ color: helperColor }}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);
DSTextField.displayName = 'DSTextField';

export default DSTextField;
