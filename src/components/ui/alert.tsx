"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { type RoleName, roleVar } from '@/theme/roles';
import { Icon } from './icon';
import type { IconName } from './icon-names';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

/**
 * `bg` is the pale fill (strategy A — the existing `status.{tone}.bg`), `border`
 * the full-card status border, `fg` the icon accent, `text` the body copy. fg
 * and text are the same for every severity except warning, which is the reason
 * this splits them.
 *
 * `status.warning.fg` is the burnt orange #c25600 (V3 re-sync 2026-10-10, was
 * gold #cb7623). On `status.warning.bg` (gold50, #fffcf8) it measures 4.44:1 —
 * comfortably over the 3:1 a non-text accent needs, but still a hair under the
 * 4.5:1 body text requires, so warning text still can't ride the accent.
 *
 * `text.onLight` exists for exactly this and measures 17.71:1 here;
 * check-contrast.js validates that pair. Success and danger need no equivalent:
 * their own `fg` passes on their own background (4.94:1 and 8.77:1). (A warning
 * Alert is always the pale-surface form — the dark-orange SOLID fill, where
 * white text works, is Badge's `solid` variant via text.onWarning.)
 */
function getSeverityRoles(severity: AlertSeverity): { fg: RoleName; bg: RoleName; border: RoleName; text: RoleName } {
  switch (severity) {
    case 'success':
      return { fg: 'status.success.fg', bg: 'status.success.bg', border: 'status.success.border', text: 'status.success.fg' };
    case 'warning':
      return { fg: 'status.warning.fg', bg: 'status.warning.bg', border: 'status.warning.border', text: 'text.onLight' };
    case 'error':
      return { fg: 'status.danger.fg', bg: 'status.danger.bg', border: 'status.danger.border', text: 'status.danger.fg' };
    case 'info':
    default:
      return { fg: 'status.info.fg', bg: 'status.info.bg', border: 'status.info.border', text: 'text.primary' };
  }
}

const SEVERITY_ICON: Record<AlertSeverity, IconName> = {
  success: 'check_circle',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

// Errors & warnings are disruptive (assertive), others polite — same mapping as the MUI twin.
const roleFor = (severity: AlertSeverity) => (severity === 'error' || severity === 'warning' ? 'alert' : 'status');

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Drives icon, colour and the ARIA `role` — error/warning render as `alert` (assertive), the rest as `status` (polite). */
  severity: AlertSeverity;
  /** Bold title line. Omit for a single-line alert with no heading. */
  title?: React.ReactNode;
  /** Muted timestamp rendered inline next to the title (the Figma Alert's date). Optional. */
  timestamp?: React.ReactNode;
  /** Transparent fill instead of the pale status surface; the status border stays. */
  outlined?: boolean;
  /** Renders a close button; omit to make the alert persistent (no dismiss affordance). */
  onClose?: () => void;
  /** Suppress the severity icon, e.g. when the surrounding layout already signals status. */
  hideIcon?: boolean;
}

/**
 * Design System Alert — shadcn/ui counterpart for the MDS Alert. Same
 * `severity`/`title`/`outlined`/`onClose` API as the MUI twin; `AlertTitle`/
 * `AlertDescription` are exported separately too for composable usage.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ severity, title, timestamp, outlined = false, onClose, hideIcon = false, children, className, style, ...rest }, ref) => {
    const { fg, bg, border, text } = getSeverityRoles(severity);
    const iconName = SEVERITY_ICON[severity];

    return (
      <div
        ref={ref}
        role={roleFor(severity)}
        // Figma Alert: pale status fill, a FULL 1px status border, and flat (no
        // shadow — that is the Toast). rounded-md is the 4px target placeholder
        // (DEV-6; 6px meanwhile).
        className={cn('flex items-start gap-3 rounded-md border p-4', className)}
        style={{
          // Body copy uses `text` (4.5:1); the icon keeps `fg` as the accent,
          // which only needs 3:1. See getSeverityRoles.
          color: roleVar(text),
          backgroundColor: outlined ? 'transparent' : roleVar(bg),
          borderColor: roleVar(border),
          ...style,
        }}
        {...rest}
      >
        {!hideIcon && (
          <Icon name={iconName} fill size={20} className="mt-0.5 shrink-0" style={{ color: roleVar(fg) }} />
        )}
        <div className="min-w-0 flex-1">
          {(title || timestamp) && (
            // Title and date share a baseline-aligned row — the Figma Alert
            // layout (Toast stacks the date at the foot instead).
            <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
              {title && <AlertTitle className="mb-0">{title}</AlertTitle>}
              {timestamp && <span className="font-sans-productive text-sm opacity-70">{timestamp}</span>}
            </div>
          )}
          {children && <AlertDescription>{children}</AlertDescription>}
        </div>
        {onClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="-mr-1 -mt-1 shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
            style={{ color: 'inherit' }}
          >
            <Icon name="close" size={16} />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'mb-1 font-sans-productive text-sm font-bold leading-tight',
        className
      )}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn('font-sans-productive text-sm', className)} ref={ref} {...props} />
  )
);
AlertDescription.displayName = 'AlertDescription';

export default Alert;
