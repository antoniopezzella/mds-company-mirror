"use client"

import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, type ToastTone } from './toast';
import { toast, useToast } from './use-toast';

/**
 * Mount once near the root of your app. `useToast()`'s state (or the
 * imperative `toast()` / `showSnackbar()` functions) queue toasts here —
 * multiple can stack, each with its own timer, matching real shadcn/ui
 * behavior rather than MUI Snackbar's one-open-instance-at-a-time model.
 */
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={5000}>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid flex-1 gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

// ── showSnackbar: MUI-parity convenience wrapper ────────────────────────────
// Same `message`/`severity`/`actionText`/`onAction`/`autoHideDuration` shape
// as the MUI `DSSnackbar` twin, but fires into the shared toast queue above
// instead of needing its own `open` state — call it from anywhere.

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

const SEVERITY_TO_TONE: Record<SnackbarSeverity, ToastTone> = {
  success: 'success',
  error: 'danger',
  warning: 'warning',
  info: 'info',
};

export interface ShowSnackbarOptions {
  message: string;
  severity?: SnackbarSeverity;
  actionText?: string;
  onAction?: () => void;
  autoHideDuration?: number;
}

export function showSnackbar({
  message,
  severity = 'info',
  actionText,
  onAction,
  autoHideDuration,
}: ShowSnackbarOptions) {
  return toast({
    tone: SEVERITY_TO_TONE[severity],
    description: message,
    duration: autoHideDuration,
    action:
      actionText && onAction ? (
        <ToastAction altText={actionText} onClick={onAction}>
          {actionText}
        </ToastAction>
      ) : undefined,
  });
}
