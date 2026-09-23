"use client"

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor, type RoleName } from '@/theme/roles';

// ── Composable primitives (the idiomatic shadcn/ui shape) ─────────────────
// Radix Toast is a queue/viewport system, not a single controlled instance —
// multiple toasts can stack, each with its own auto-dismiss timer and swipe-
// to-dismiss gesture. That's a materially better foundation than MUI's
// Snackbar (one `open` boolean per call site), so this is the primary API;
// `showSnackbar()` at the bottom of use-toast.ts is the MUI-parity wrapper.

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export type ToastTone = 'default' | 'success' | 'warning' | 'danger' | 'info';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full'
);

function getToneRoles(tone: ToastTone): { bg: RoleName; fg: RoleName } {
  switch (tone) {
    case 'success':
      return { bg: 'status.success.bg', fg: 'status.success.fg' };
    case 'warning':
      // warning is the exception: status.warning.fg (gold1000) on
      // status.warning.bg is 3.34:1 — fine as an accent, unreadable as text.
      // text.onLight (17.71:1) exists for exactly this. See alert.tsx.
      return { bg: 'status.warning.bg', fg: 'text.onLight' };
    case 'danger':
      return { bg: 'status.danger.bg', fg: 'status.danger.fg' };
    case 'info':
      return { bg: 'surface.accent', fg: 'text.primary' };
    default:
      return { bg: 'surface.subtle', fg: 'text.primary' };
  }
}

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {
  tone?: ToastTone;
}

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, tone = 'default', ...props }, ref) => {
    const { bg, fg } = getToneRoles(tone);
    return (
      <ToastPrimitive.Root
        ref={ref}
        className={cn(toastVariants(), className)}
        style={{ backgroundColor: getRoleColor(bg), color: getRoleColor(fg) }}
        {...props}
      />
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
      'inline-flex shrink-0 items-center justify-center rounded-md border bg-transparent px-3 py-1.5 font-[var(--typo-button-font-family,_Noto_Sans,_sans-serif)] text-sm font-semibold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
      'absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2',
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
    className={cn('font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] text-sm font-semibold', className)}
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
    className={cn('font-[var(--typo-body2-font-family,_Noto_Sans,_sans-serif)] text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

export type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
