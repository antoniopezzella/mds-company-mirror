"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Inline, Stack } from './stack';

/**
 * PageShell — the dashboard page template.
 *
 * Extracted from `src/projects/dashboard-demo/pages/DashboardDemo.tsx`, which
 * had hand-rolled this scaffold: the `grid-rows-[auto_1fr]` full-height frame,
 * the sidebar that is `fixed` with a scrim below `lg` and `static` above it,
 * and the `min-w-0` chain that stops a wide table from blowing out the page.
 *
 * That last part is the reason this is a component rather than a doc snippet.
 * `min-w-0` has to appear on *every* flex ancestor between the page and the
 * table, because a flex item's default `min-width: auto` refuses to shrink
 * below its content. Miss one and the whole page scrolls sideways — a bug
 * that looks like a table bug and isn't. The shell gets it right once.
 *
 * Template tier: slots only. No business data, no domain vocabulary. If you
 * find yourself adding a `policies` or `claims` prop here, it belongs in the
 * page instead.
 */

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rendered above everything, full width. Typically `<Header />`. */
  header?: React.ReactNode;
  /**
   * Rendered beside the main column. Becomes an overlay drawer below `lg`,
   * where `sidebarOpen` controls it.
   */
  sidebar?: React.ReactNode;
  /** Mobile drawer state. Ignored at `lg` and above, where the sidebar is static. */
  sidebarOpen?: boolean;
  /** Called when the mobile scrim is clicked. */
  onSidebarClose?: () => void;
  /** Constrain the main column to the 1540px MDS container. Defaults to `true`. */
  contained?: boolean;
}

export const PageShell = React.forwardRef<HTMLDivElement, PageShellProps>(
  (
    {
      header,
      sidebar,
      sidebarOpen = false,
      onSidebarClose,
      contained = true,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      data-slot="page-shell"
      className={cn('mds-dashboard grid min-h-screen grid-rows-[auto_1fr]', className)}
      style={{ backgroundColor: getRoleColor('surface.default'), ...style }}
      {...props}
    >
      {header}

      <div className="flex min-w-0">
        {sidebar && (
          <>
            {/* Scrim. Only below `lg`, where the sidebar is an overlay. */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={onSidebarClose}
                aria-hidden="true"
              />
            )}
            {sidebar}
          </>
        )}

        {/*
          `min-w-0` is load-bearing, not defensive: without it this flex item
          takes `min-width: auto`, refuses to shrink below its widest child,
          and any wide table pushes the page into horizontal scroll.
        */}
        <main className="min-w-0 flex-1 px-6 py-6 md:px-8 md:py-8">
          <div className={cn('min-w-0', contained && 'mx-auto w-full max-w-container')}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
);
PageShell.displayName = 'PageShell';

// `title` is omitted from the native attributes because the DS prop is a
// ReactNode (it can carry a badge or a count), while the HTML attribute is a
// plain tooltip string. Keeping both would silently widen the tooltip type.
export interface PageHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The page title. Rendered as an `<h1>`. */
  title: React.ReactNode;
  /** Optional supporting line beneath the title. */
  description?: React.ReactNode;
  /** Actions aligned to the end of the title row — buttons, filters, a menu. */
  actions?: React.ReactNode;
}

/**
 * The title / description / actions block that opens a page.
 *
 * Uses the DS heading treatment (Noto Sans bold for dashboard h1–h6) and the
 * `text.secondary` role for the supporting line, so every page gets the same
 * hierarchy without restating it.
 */
export const PageHeading = React.forwardRef<HTMLDivElement, PageHeadingProps>(
  ({ title, description, actions, className, ...props }, ref) => (
    <Inline
      ref={ref}
      data-slot="page-heading"
      gap={4}
      align="start"
      justify="between"
      className={cn('mb-6 w-full', className)}
      {...props}
    >
      <Stack gap={1} className="min-w-0">
        <h1
          className="font-[var(--typo-h1-font-family,_Noto_Sans,_sans-serif)] text-2xl font-bold"
          style={{ color: getRoleColor('text.primary') }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-sm" style={{ color: getRoleColor('text.secondary') }}>
            {description}
          </p>
        )}
      </Stack>
      {actions && <Inline gap={2} className="shrink-0">{actions}</Inline>}
    </Inline>
  )
);
PageHeading.displayName = 'PageHeading';
