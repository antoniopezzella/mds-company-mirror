"use client"

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

// ── Composable primitives (the idiomatic shadcn/ui shape) ─────────────────
// Radix Dialog is deliberately unopinionated about layout — you compose the
// header/body/footer yourself. This is more flexible than MUI's fixed
// title/content/actions slots, so it's the primary API here; `Modal` below
// is a convenience wrapper for MUI-parity migration, not the other way
// around.

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[1500] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Hides the built-in top-right close button */
  hideCloseButton?: boolean;
  /** MUI-parity size preset; ignored if you pass your own width classes via `className`. */
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
}

const SIZE_CLASSES: Record<NonNullable<DialogContentProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-3xl',
  fullscreen: 'h-screen w-screen max-w-none rounded-none',
};

const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ className, children, hideCloseButton = false, size = 'md', ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-[1500] grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg p-6 shadow-lg duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          SIZE_CLASSES[size],
          size === 'fullscreen' ? 'max-h-screen overflow-y-auto' : 'max-h-[85vh] overflow-y-auto',
          className
        )}
        style={{ backgroundColor: getRoleColor('surface.default') }}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ color: getRoleColor('text.secondary') }}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1.5 pr-8', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end', className)}
    style={{ borderColor: getRoleColor('border.default') }}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-[var(--typo-h6-font-family,_Noto_Sans,_sans-serif)] text-lg font-semibold leading-none', className)}
    style={{ color: getRoleColor('text.primary') }}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('font-[var(--typo-body2-font-family,_Noto_Sans,_sans-serif)] text-sm', className)}
    style={{ color: getRoleColor('text.secondary') }}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

// ── Modal: MUI-parity convenience wrapper ──────────────────────────────────
// Same `open`/`onClose`/`hasHeader`/`hasFooter`/`size`/`title`/`description`/
// `footer` API as the MUI twin, composed from the primitives above.

export type ModalSize = 'Small' | 'Medium' | 'Large' | 'FullScreen';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  hasHeader?: boolean;
  hasFooter?: boolean;
  size?: ModalSize;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const MODAL_SIZE_MAP: Record<ModalSize, DialogContentProps['size']> = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  FullScreen: 'fullscreen',
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  hasHeader = true,
  hasFooter = true,
  size = 'Medium',
  title,
  description,
  children,
  footer,
  className,
}) => {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent size={MODAL_SIZE_MAP[size]} className={className}>
        {hasHeader && (title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
        {hasFooter && footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
