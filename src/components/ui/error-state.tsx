"use client"

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Button } from './button';

/**
 * The failure state for a data surface.
 *
 * Why this exists
 * ---------------
 * **0 of 75 components could express a failed fetch.** Every `error` in the
 * component set was form validation or an icon-map key, and no dashboard page
 * in the repo had an error branch at all — so a dead API rendered as
 * "No data yet", indistinguishable from a genuinely empty result. That is the
 * worst possible failure mode for a dashboard: it looks like an answer.
 *
 * Shape mirrors `empty.tsx` slot-for-slot, because symmetry is the cheap part
 * of a design system and the slots are the escape hatch for real-world error
 * content (a correlation id, a support link, a stack trace in a Collapsible).
 *
 * But it also takes convenience props, because a pure slot API is a component
 * people route around: `empty.tsx` has exactly one production consumer, and
 * that consumer writes 20 lines of boilerplate to use it. Pass `title` /
 * `description` / `onRetry` and you get the standard composition; pass
 * children and you get full control.
 *
 * Accessibility
 * -------------
 * The root is `role="alert"`, so the failure is announced rather than silently
 * replacing content. The title is a `<div>`, **not** a heading — these blocks
 * render inside tables and cards at unpredictable depths, and an unexpected
 * heading is exactly what broke heading order when `StatCard` hardcoded `<h3>`
 * under a page `<h1>`. A state component must never introduce a heading.
 */

const errorStateVariants = cva('flex min-w-0 flex-col items-center text-center text-balance', {
  variants: {
    variant: {
      /** Full-height block, for replacing a table body or a chart. */
      block: 'flex-1 justify-center gap-6 rounded-lg p-6 md:p-12',
      /** Compact row, for inside a card or a KPI tile where a block is absurd. */
      inline: 'w-full gap-3 p-4',
    },
  },
  defaultVariants: { variant: 'block' },
});

function ErrorState({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof errorStateVariants>) {
  return (
    <div
      data-slot="error-state"
      role="alert"
      className={cn(errorStateVariants({ variant, className }))}
      {...props}
    />
  );
}

function ErrorStateHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="error-state-header"
      className={cn('flex max-w-sm flex-col items-center gap-2 text-center', className)}
      {...props}
    />
  );
}

const errorStateMediaVariants = cva(
  'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: { variant: 'icon' },
  }
);

function ErrorStateMedia({
  className,
  variant = 'icon',
  style,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof errorStateMediaVariants>) {
  return (
    <div
      data-slot="error-state-media"
      data-variant={variant}
      className={cn(errorStateMediaVariants({ variant, className }))}
      style={
        variant === 'icon'
          ? {
              backgroundColor: getRoleColor('status.danger.bg'),
              color: getRoleColor('status.danger.fg'),
              ...style,
            }
          : { color: getRoleColor('status.danger.fg'), ...style }
      }
      {...props}
    />
  );
}

function ErrorStateTitle({ className, style, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="error-state-title"
      className={cn('text-lg font-medium tracking-tight', className)}
      style={{ color: getRoleColor('text.primary'), ...style }}
      {...props}
    />
  );
}

function ErrorStateDescription({ className, style, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="error-state-description"
      className={cn('text-sm/relaxed', className)}
      style={{ color: getRoleColor('text.secondary'), ...style }}
      {...props}
    />
  );
}

function ErrorStateContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="error-state-content"
      className={cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm', className)}
      {...props}
    />
  );
}

export interface DataErrorProps
  extends Omit<React.ComponentProps<'div'>, 'title'>,
    VariantProps<typeof errorStateVariants> {
  /** Headline. Defaults to a generic, non-alarming message. */
  title?: React.ReactNode;
  /** One line on what happened or what to do. */
  description?: React.ReactNode;
  /**
   * Technical detail — a correlation id, a status code. Rendered small and
   * muted. Never put a raw stack trace here in production.
   */
  detail?: React.ReactNode;
  /** Renders a "Try again" button. Omitted entirely when absent — never disabled. */
  onRetry?: () => void;
  retryLabel?: string;
}

/**
 * The standard error composition. Use this unless you need the slots.
 *
 * An error state without a recovery action is a dead end, and in a dashboard
 * the failure is almost always transient — so `onRetry` is the prop worth
 * passing. When it is absent no button renders at all, rather than a disabled
 * one, because a disabled button reads as "you may not retry" instead of
 * "there is nothing to retry".
 */
function DataError({
  title = 'Could not load this data',
  description = 'Something went wrong on our end.',
  detail,
  onRetry,
  retryLabel = 'Try again',
  variant,
  children,
  ...props
}: DataErrorProps) {
  return (
    <ErrorState variant={variant} {...props}>
      <ErrorStateHeader>
        <ErrorStateMedia>
          <AlertTriangle aria-hidden="true" />
        </ErrorStateMedia>
        <ErrorStateTitle>{title}</ErrorStateTitle>
        {description && <ErrorStateDescription>{description}</ErrorStateDescription>}
      </ErrorStateHeader>
      {(onRetry || detail || children) && (
        <ErrorStateContent>
          {onRetry && (
            <Button variant="secondary" size="sm" onClick={onRetry}>
              {retryLabel}
            </Button>
          )}
          {detail && (
            <span className="font-mono text-xs" style={{ color: getRoleColor('text.secondary') }}>
              {detail}
            </span>
          )}
          {children}
        </ErrorStateContent>
      )}
    </ErrorState>
  );
}

export {
  DataError,
  ErrorState,
  ErrorStateHeader,
  ErrorStateMedia,
  ErrorStateTitle,
  ErrorStateDescription,
  ErrorStateContent,
};
