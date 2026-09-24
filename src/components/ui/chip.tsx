"use client"

import * as React from 'react';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor, type RoleName } from '@/theme/roles';

export type ChipTone = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type ChipVariant = 'filled' | 'outlined';
export type ChipSize = 'sm' | 'md' | 'lg';

const chipVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-[var(--typo-body2-font-family,_Noto_Sans,_sans-serif)] font-medium transition-transform focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-6 px-2.5 text-xs',
        md: 'h-8 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      interactive: false,
    },
  }
);

const iconSizeClass: Record<ChipSize, string> = {
  sm: 'h-4 w-4 -ml-0.5',
  md: 'h-5 w-5 -ml-0.5',
  lg: 'h-6 w-6 -ml-1',
};

const deleteIconSizeClass: Record<ChipSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

function getToneRoles(tone: ChipTone): { bg: RoleName; fg: RoleName; border: RoleName } {
  switch (tone) {
    case 'primary':
      return { bg: 'surface.accent', fg: 'text.primary', border: 'interactive.primary' };
    case 'secondary':
      return { bg: 'surface.subtle', fg: 'text.primary', border: 'border.default' };
    case 'success':
      return { bg: 'status.success.bg', fg: 'status.success.fg', border: 'status.success.fg' };
    case 'warning':
      // fg is the label colour; the border keeps the gold accent.
      // status.warning.fg on status.warning.bg is 3.34:1 — fine for the 3:1
      // border, unreadable as text. See alert.tsx for the full reasoning.
      return { bg: 'status.warning.bg', fg: 'text.onLight', border: 'status.warning.fg' };
    case 'danger':
      return { bg: 'status.danger.bg', fg: 'status.danger.fg', border: 'status.danger.fg' };
    case 'info':
      return { bg: 'surface.accent', fg: 'text.primary', border: 'status.warning.fg' };
    default:
      return { bg: 'surface.subtle', fg: 'text.primary', border: 'border.default' };
  }
}

export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  label: React.ReactNode;
  variant?: ChipVariant;
  tone?: ChipTone;
  size?: ChipSize;
  selectable?: boolean;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Design System Chip — shadcn/ui counterpart for the MDS Chip. Same
 * `label`/`variant`/`tone`/`size`/`selectable`/`selected`/`onDelete`/`icon`
 * API as the MUI twin.
 */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    { label, variant = 'filled', tone = 'default', size = 'md', selectable = false, selected = false, onClick, onDelete, icon, disabled = false, className, style: styleProp, ...rest },
    ref
  ) => {
    const { bg, fg, border } = getToneRoles(tone);
    const isFilled = variant === 'filled' || (selectable && selected);
    const isInteractive = Boolean(selectable || onClick);

    const style: React.CSSProperties = disabled
      ? {
          backgroundColor: getRoleColor('surface.disabled'),
          color: getRoleColor('text.disabled'),
          borderColor: 'transparent',
        }
      : {
          backgroundColor: isFilled ? getRoleColor(bg) : 'transparent',
          // Text always takes `fg`; `border` is for the border only.
          //
          // Outlined chips used to render their label in the BORDER colour,
          // which is the exact trap the `warning` case in getToneRoles already
          // documents: border roles are validated at 3:1 for non-text UI, not
          // 4.5:1 for text. For `default`/`secondary` that meant `#878787` on
          // white — 3.59:1, below AA, and it failed axe the moment an outlined
          // chip was used at `size="sm"` (12px). Every tone's `fg` clears 4.5:1
          // against the page surface; the tightest is success at 5.12:1.
          color: getRoleColor(fg),
          border: variant === 'outlined' ? `1px solid ${getRoleColor(border)}` : 'none',
          boxShadow: selectable && selected ? `inset 0 0 0 2px ${getRoleColor('focus.ring')}` : undefined,
        };

    const chipClassName = cn(
      chipVariants({ size, interactive: isInteractive }),
      isInteractive && !disabled && 'hover:opacity-[0.85]',
      className
    );

    const chipStyle = {
      ...style,
      '--tw-ring-color': getRoleColor('focus.ring'),
      // Tailwind's ring-offset-2 defaults its gap color to white — wrong
      // against a dark surface. Tying it to surface.default keeps the ring's
      // inner gap correct in both modes, matching Checkbox's
      // --checkbox-focus-inner-ring pattern.
      '--tw-ring-offset-color': getRoleColor('surface.default'),
      // Caller override last, so it wins over (not replaces) the tone-based
      // style above — style was destructured out of ...rest specifically so a
      // plain spread couldn't clobber this object.
      ...styleProp,
    } as React.CSSProperties;

    const content = (
      <>
        {icon && <span className={cn('flex items-center justify-center', iconSizeClass[size])}>{icon}</span>}
        <span className="truncate">{label}</span>
      </>
    );

    // Without a delete affordance the chip is a single control, so it stays a
    // plain <button> and `ref` points at it as before.
    if (!onDelete) {
      return (
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          onClick={onClick}
          aria-pressed={selectable ? selected : undefined}
          className={chipClassName}
          style={chipStyle}
          {...rest}
        >
          {content}
        </button>
      );
    }

    // With a delete affordance there are genuinely TWO actions, so they have to
    // be two sibling controls. The previous shape nested the delete control
    // inside the chip's own <button> — invalid HTML5 (interactive content
    // cannot nest) and flagged by axe as nested-interactive. A comment here
    // already called the sibling-button redesign the correct long-term fix;
    // this is that fix.
    //
    // The visual container is now a non-interactive <span> carrying the chip
    // styling, with the body and the delete button as siblings inside it.
    // `ref` still lands on a <button> (the body) when the chip is interactive,
    // so the forwarded-ref contract is unchanged for every existing consumer —
    // none of which pass a ref today in any case.
    return (
      <span className={chipClassName} style={chipStyle}>
        {isInteractive ? (
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-pressed={selectable ? selected : undefined}
            className="inline-flex items-center gap-1.5 border-0 bg-transparent p-0 text-inherit focus-visible:outline-hidden"
            {...rest}
          >
            {content}
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5">{content}</span>
        )}
        <button
          type="button"
          aria-label="Remove"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className={cn(
            'flex items-center justify-center rounded-full border-0 bg-transparent p-0 text-inherit opacity-70 hover:opacity-100 focus-visible:outline-hidden focus-visible:ring-2',
            deleteIconSizeClass[size]
          )}
        >
          <X className="h-full w-full" />
        </button>
      </span>
    );
  }
);
Chip.displayName = 'Chip';

export default Chip;
