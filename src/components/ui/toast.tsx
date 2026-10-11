"use client"

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { type RoleName, roleVar } from '@/theme/roles';

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

// shadow-md (not shadow-lg) is Figma's `Elevation/Small` to the pixel:
// 0 4 6 -1 + 0 2 4 -2 at black@10%. The left accent bar (border-l-4) is drawn
// per tone in the Toast component, matching the Figma Toast anatomy.
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border-l-4 p-4 shadow-md transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full'
);

/**
 * `bg` is the pale fill, `accent` the saturated status colour (icon + left
 * bar), `text` the body copy. accent and text diverge only for warning: its
 * #c25600 accent is a legible icon (4.44:1) but a hair under AA as body text,
 * so the copy falls to text.onLight — same split Alert makes.
 */
function getToneRoles(tone: ToastTone): { bg: RoleName; accent: RoleName; text: RoleName } {
  switch (tone) {
    case 'success':
      return { bg: 'status.success.bg', accent: 'status.success.fg', text: 'status.success.fg' };
    case 'warning':
      return { bg: 'status.warning.bg', accent: 'status.warning.fg', text: 'text.onLight' };
    case 'danger':
      return { bg: 'status.danger.bg', accent: 'status.danger.fg', text: 'status.danger.fg' };
    case 'info':
      return { bg: 'surface.accent', accent: 'text.primary', text: 'text.primary' };
    default:
      return { bg: 'surface.subtle', accent: 'text.primary', text: 'text.primary' };
  }
}

const toneIcon: Partial<
  Record<ToastTone, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>
> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
  info: Info,
};

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {
  /** Background/foreground pairing — `default`, `success`, `warning`, `danger`, etc. */
  tone?: ToastTone;
}

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, tone = 'default', children, ...props }, ref) => {
    const { bg, accent, text } = getToneRoles(tone);
    const Icon = toneIcon[tone];
    return (
      <ToastPrimitive.Root
        ref={ref}
        className={cn(toastVariants(), className)}
        style={{ backgroundColor: roleVar(bg), color: roleVar(text), borderLeftColor: roleVar(accent) }}
        {...props}
      >
        {Icon && (
          // Leading status icon in the accent colour, separate from the body
          // text colour (they differ for warning). aria-hidden: the tone is
          // already conveyed by Radix's role and the toast copy.
          <Icon className="mt-0.5 size-5 shrink-0" style={{ color: roleVar(accent) }} aria-hidden="true" />
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
    <X className="h-4 w-4" />
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
