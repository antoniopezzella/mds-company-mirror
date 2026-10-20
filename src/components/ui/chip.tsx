"use client"

import * as React from 'react';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { type RoleName, roleVar } from '@/theme/roles';

export type ChipTone = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type ChipVariant = 'filled' | 'outlined';
export type ChipSize = 'sm' | 'md' | 'lg';

const chipVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-sans-productive font-medium transition-transform focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
  sm: 'h-4 w-4 -ms-0.5',
  md: 'h-5 w-5 -ms-0.5',
  lg: 'h-6 w-6 -ms-1',
};

const deleteIconSizeClass: Record<ChipSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

function getToneRoles(tone: ChipTone): { bg: RoleName; fg: RoleName; border: RoleName } {
  switch (tone) {
    case 'primary':
      return { bg: 'bg.neutral.subtle', fg: 'fg.primary', border: 'interactive.primary' };
    case 'secondary':
      return { bg: 'bg.neutral.subtle', fg: 'fg.primary', border: 'border.default' };
    case 'success':
      return { bg: 'bg.success.subtle', fg: 'fg.success', border: 'fg.success' };
    case 'warning':
      // fg is the label colour; the border keeps the gold accent.
      // status.warning.fg on status.warning.bg is 4.44:1 — fine for the 3:1
      // border, unreadable as text. See alert.tsx for the full reasoning.
      return { bg: 'bg.warning.subtle', fg: 'fg.on-light', border: 'fg.warning' };
    case 'danger':
      return { bg: 'bg.critical.subtle', fg: 'fg.critical', border: 'fg.critical' };
    case 'info':
      // interactive.primary, not status.warning.fg. Every other tone borders
      // in its own colour; info alone borrowed warning's GOLD, which made an
      // informational chip read as a caution. Matches Badge's info tone, which
      // already uses interactive.primary as its border.
      return { bg: 'bg.neutral.subtle', fg: 'fg.primary', border: 'interactive.primary' };
    default:
      return { bg: 'bg.neutral.subtle', fg: 'fg.primary', border: 'border.default' };
  }
}

export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  label: React.ReactNode;
  variant?: ChipVariant;
  tone?: ChipTone;
  size?: ChipSize;
  /**
   * `@deprecated since 0.6.0; remove after 0.7.0 / 2026-12-23.` Use
   * `FilterChip`, which carries selection in a checkmark and `aria-pressed`
   * rather than an inset ring, and groups into a keyboard-navigable set.
   */
  selectable?: boolean;
  /** `@deprecated since 0.6.0; remove after 0.7.0 / 2026-12-23.` Use `FilterChip`. */
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
          backgroundColor: 'var(--role-bg-disabled)',
          color: 'var(--role-fg-disabled)',
          borderColor: 'transparent',
        }
      : {
          backgroundColor: isFilled ? roleVar(bg) : 'transparent',
          // Text always takes `fg`; `border` is for the border only.
          //
          // Outlined chips used to render their label in the BORDER colour,
          // which is the exact trap the `warning` case in getToneRoles already
          // documents: border roles are validated at 3:1 for non-text UI, not
          // 4.5:1 for text. For `default`/`secondary` that meant `#878787` on
          // white — 3.59:1, below AA, and it failed axe the moment an outlined
          // chip was used at `size="sm"` (12px). Every tone's `fg` clears 4.5:1
          // against the page surface; the tightest is success at 5.12:1.
          color: roleVar(fg),
          border: variant === 'outlined' ? `1px solid ${roleVar(border)}` : 'none',
          boxShadow: selectable && selected ? `inset 0 0 0 2px ${'var(--role-border-focus)'}` : undefined,
        };

    const chipClassName = cn(
      chipVariants({ size, interactive: isInteractive }),
      isInteractive && !disabled && 'hover:opacity-[0.85]',
      className
    );

    const chipStyle = {
      ...style,
      '--tw-ring-color': 'var(--role-border-focus)',
      // Tailwind's ring-offset-2 defaults its gap color to white — wrong
      // against a dark surface. Tying it to surface.default keeps the ring's
      // inner gap correct in both modes, matching Checkbox's
      // --checkbox-focus-inner-ring pattern.
      '--tw-ring-offset-color': 'var(--role-bg-default)',
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
      // A chip with no action is NOT a control. It used to render a <button>
      // regardless, so eight call sites shipped a focusable element announced
      // as a button with nothing behind it — one of them had already been
      // patched with tabIndex={-1}, which hides the tab stop but not the
      // announcement. Static labels should move to `Badge`; until they do,
      // this at least stops them lying to assistive technology.
      // `disabled` counts as a control: WCAG 1.4.3 exempts text that is part
      // of an INACTIVE user interface component, and the muted grey relies on
      // that exemption. Demoting a disabled chip to a <span> turns it into
      // ordinary text that fails contrast — which axe caught the moment this
      // change landed.
      if (!isInteractive && !disabled) {
        return (
          <span
            className={chipClassName}
            style={chipStyle}
            {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
          >
            {content}
          </span>
        );
      }
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
