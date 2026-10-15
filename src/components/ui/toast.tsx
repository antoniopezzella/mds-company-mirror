"use client"

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { type RoleName, roleVar } from '@/theme/roles';
import { Icon } from './icon';
import type { IconName } from './icon-names';

// ── Composable primitives (the idiomatic shadcn/ui shape) ─────────────────
// Radix Toast is a queue/viewport system, not a single controlled instance —
// multiple toasts can stack, each with its own auto-dismiss timer and swipe-
// to-dismiss gesture. That's a materially better foundation than MUI's
// Snackbar (one `open` boolean per call site), so this is the primary API;
// `showSnackbar()` at the bottom of use-toast.ts is the MUI-parity wrapper.

const ToastProvider = ToastPrimitive.Provider;

// z-[1600] = Z_INDEX.toast, deliberately ABOVE the 1500 overlay layer.
// This was z-[100], so a toast fired while a Dialog, Sheet, Drawer, Popover
// or Select was open rendered BEHIND it — confirmations and save errors
// vanished at exactly the moment they mattered. See z-index.ts.
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-0 right-0 z-[1600] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export type ToastTone = 'default' | 'success' | 'warning' | 'danger' | 'info';

// Figma Toast anatomy: a pale status fill, a FULL 1px status border (not a
// left bar), rounded-md (4px target — DEV-6; 6px meanwhile), and shadow-xl,
// which is Figma's `Elevation/Medium` to the pixel (0 20 25 -5 + 0 8 10 -6 @10%).
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-md border p-4 shadow-xl transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full'
);

/**
 * `bg` is the pale fill (strategy A — the existing `status.{tone}.bg`), `border`
 * the full-card status border, `accent` the icon colour, `text` the body copy.
 * accent and text diverge only for warning: its #c25600 accent is a legible icon
 * (4.44:1) but a hair under AA as body text, so the copy falls to text.onLight —
 * the same split Alert makes.
 */
function getToneRoles(tone: ToastTone): { bg: RoleName; border: RoleName; accent: RoleName; text: RoleName } {
  switch (tone) {
    case 'success':
      return { bg: 'status.success.bg', border: 'status.success.border', accent: 'status.success.fg', text: 'status.success.fg' };
    case 'warning':
      return { bg: 'status.warning.bg', border: 'status.warning.border', accent: 'status.warning.fg', text: 'text.onLight' };
    case 'danger':
      return { bg: 'status.danger.bg', border: 'status.danger.border', accent: 'status.danger.fg', text: 'status.danger.fg' };
    case 'info':
      return { bg: 'status.info.bg', border: 'status.info.border', accent: 'status.info.fg', text: 'text.primary' };
    default:
      return { bg: 'surface.subtle', border: 'border.default', accent: 'text.primary', text: 'text.primary' };
  }
}

const toneIcon: Partial<Record<ToastTone, IconName>> = {
  success: 'check_circle',
  warning: 'warning',
  danger: 'error',
  info: 'info',
};

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {
  /** Background/border/foreground pairing — `default`, `success`, `warning`, `danger`, `info`. */
  tone?: ToastTone;
  /** Show the tone's filled status icon. Default true; `false` for an icon-less toast. */
  showIcon?: boolean;
}

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, tone = 'default', showIcon = true, children, ...props }, ref) => {
    const { bg, border, accent, text } = getToneRoles(tone);
    const iconName = toneIcon[tone];
    return (
      <ToastPrimitive.Root
        ref={ref}
        className={cn(toastVariants(), className)}
        style={{ backgroundColor: roleVar(bg), color: roleVar(text), borderColor: roleVar(border) }}
        {...props}
      >
        {showIcon && iconName && (
          // Optional leading status icon in the accent colour (separate from the
          // body text colour — they differ for warning). Decorative: the tone is
          // already conveyed by Radix's role and the toast copy.
          <Icon name={iconName} fill size={20} className="mt-0.5 shrink-0" style={{ color: roleVar(accent) }} />
        )}
        {children}
      </ToastPrimitive.Root>
    );
  }
);
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'inline-flex shrink-0 items-center justify-center rounded-md border bg-transparent px-3 py-1.5 font-sans-productive text-sm font-semibold uppercase tracking-wide transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    style={{ borderColor: 'currentColor', color: 'inherit' }}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitive.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-hidden focus:ring-2',
      className
    )}
    style={{ color: 'inherit' }}
    toast-close=""
    {...props}
  >
    <Icon name="close" size={16} />
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('font-sans-productive text-sm font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('font-sans-productive text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

/**
 * Optional timestamp line, muted, at the foot of the toast — the Figma Toast
 * shows a date here ("May 12, 2025"). Opt-in: nothing renders it unless a
 * `timestamp` is passed to `toast()`, so existing callers are unaffected.
 */
const ToastTimestamp = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-1 font-sans-productive text-xs opacity-70', className)}
      {...props}
    />
  )
);
ToastTimestamp.displayName = 'ToastTimestamp';

export type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastTimestamp,
  ToastClose,
  ToastAction,
};
