"use client"

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

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
      'fixed inset-0 z-[1400] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
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
          'box-border fixed left-1/2 top-1/2 z-[1500] grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg p-6 shadow-lg duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          // Direct children get `min-width: 0`, or ONE long unbreakable string
          // anywhere inside silently widens the whole dialog.
          //
          // Grid/flex items default to `min-width: auto`, which resolves to
          // their min-content size. A `truncate` span is `white-space: nowrap`,
          // so its min-content is the FULL text — an email, a URL, a policy
          // number. `min-w-0` on that span lets it shrink once a width is
          // known, but it does not lower its ancestors' min-content, so the
          // demand propagates all the way up and the dialog's column refuses
          // to go below it. Measured: a 464px content box forced to 508px.
          //
          // The symptom does not look like this. The dialog stays 512px, so
          // it becomes horizontally scrollable instead — and anything that
          // calls `scrollIntoView` inside it then scrolls that axis, sliding
          // the content sideways under the padding. It reads as "the modal
          // has padding issues on the left".
          '[&>*]:min-w-0',
          SIZE_CLASSES[size],
          size === 'fullscreen' ? 'max-h-screen overflow-y-auto' : 'max-h-[85vh] overflow-y-auto',
          className
        )}
        style={{ backgroundColor: 'var(--role-bg-default)' }}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close
            // `size-9` around an `h-5` icon, NOT a bare icon. The glyph alone
            // was the whole hit target — 20×20 measured, under WCAG 2.5.8's
            // 24×24 minimum, and the hardest thing on the dialog to hit on a
            // touchscreen despite being the only way out of some of them.
            //
            // `right-2` with a 36px box puts the icon's centre at 8+18=26px,
            // exactly where `right-4` with a 20px box put it — the target
            // grew, nothing moved. `DialogHeader`'s `pr-12` is the matching
            // clearance (the box now reaches 44px in).
            className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-md opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ color: 'var(--role-fg-neutral-subtle)' }}
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
  // `pr-12` clears the close button, which reaches 44px in from the right
  // edge now that it carries a real 36×36 hit target. At `pr-8` a long title
  // ran under the X.
  <div className={cn('flex flex-col gap-1.5 pr-12', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    // `flex-wrap`, and `min-w-0` on the content that feeds it: without them
    // a footer with three actions — or two long labels — is a single row
    // wider than the dialog, and everything overflows rather than wrapping.
    // The visible symptom is not the buttons: the dialog clips, so the BODY
    // TEXT gets cut off mid-sentence and the cause looks unrelated.
    // Inert when the actions already fit, which is the common case.
    className={cn(
      'flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:flex-wrap sm:justify-end',
      className
    )}
    style={{ borderColor: 'var(--role-border-default)' }}
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
    className={cn('font-sans-productive text-lg font-semibold leading-none', className)}
    style={{ color: 'var(--role-fg-primary)' }}
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
    className={cn('font-sans-productive text-sm', className)}
    style={{ color: 'var(--role-fg-neutral-subtle)' }}
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

/**
 * Modal size. Aligned with `DialogContentProps['size']` so this file no longer
 * exports two different size vocabularies for the same concept — the PascalCase
 * spellings still work but are deprecated.
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'fullscreen';

/** @deprecated since 0.6.0; remove after 0.7.0 / 2026-12-23.
   *  Use the lowercase {@link ModalSize} values. */
export type LegacyModalSize = 'Small' | 'Medium' | 'Large' | 'FullScreen';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  hasHeader?: boolean;
  hasFooter?: boolean;
  size?: ModalSize | LegacyModalSize;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  /**
   * Where focus lands when the dialog opens.
   *
   * Radix focuses the first focusable element by default, which is right
   * almost always — and wrong for a dialog whose footer is entirely
   * destructive, where it means Enter destroys something the instant the
   * dialog appears. Call `preventDefault()` and focus the content itself to
   * put the user at the top with nothing armed.
   */
  onOpenAutoFocus?: DialogContentProps['onOpenAutoFocus'];
}

/**
 * Legacy PascalCase → canonical. `normalizeSize` handles Small/Medium/Large;
 * `FullScreen` is mapped here because it is the one member with no counterpart
 * on the shared sm|md|lg|xl scale.
 */
const LEGACY_MODAL_SIZE_MAP: Record<LegacyModalSize, ModalSize> = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  FullScreen: 'fullscreen',
};

function resolveModalSize(size: ModalSize | LegacyModalSize): ModalSize {
  return LEGACY_MODAL_SIZE_MAP[size as LegacyModalSize] ?? (size as ModalSize);
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  hasHeader = true,
  hasFooter = true,
  size = 'md',
  title,
  description,
  children,
  footer,
  className,
  onOpenAutoFocus,
}) => {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        size={resolveModalSize(size)}
        // The BODY scrolls, not the dialog. `DialogContent` alone caps at
        // `max-h-[85vh] overflow-y-auto`, which scrolls the whole box — so on
        // a short viewport the title scrolls out of view and the primary
        // action ends up below the fold, on a dialog that looks complete.
        // Measured at 620px tall: the CTA sat outside the viewport entirely.
        //
        // `flex flex-col` beats the base `grid` through tailwind-merge (same
        // `display` group), and `overflow-y-hidden` beats `overflow-y-auto`
        // for the same reason — `overflow-hidden` would NOT, since tw-merge
        // files `overflow` and `overflow-y` separately and both would survive.
        className={cn('flex flex-col overflow-y-hidden', className)}
        onOpenAutoFocus={onOpenAutoFocus}
      >
        {hasHeader && (title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {/* `min-h-0` is what actually lets this shrink — a flex item's
            automatic minimum is its content, so without it the body refuses
            to shrink and pushes the footer out of the box instead. */}
        {children != null && (
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        )}
        {hasFooter && footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
