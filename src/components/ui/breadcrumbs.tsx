"use client"

import * as React from 'react';


export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  isCurrentPage?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Rendered between each item. Defaults to `/`. */
  separator?: React.ReactNode;
  /** Collapses the middle items into an ellipsis once `items.length` exceeds this, keeping the first and last entries visible. */
  maxItems?: number;
  className?: string;
  /** Overrides the `<nav>`'s `aria-label` — localize it when the surrounding page isn't in English. */
  ariaLabel?: string;
}

/**
 * Design System Breadcrumbs — shadcn/ui counterpart for the MDS Breadcrumbs.
 * Same `items`/`separator`/`maxItems`/`ariaLabel` API as the MUI twin,
 * including the same first/last + ellipsis collapse behavior when the
 * item count exceeds `maxItems`.
 */
/** Forwards to the `<nav>` landmark, so a consumer can scroll it into view or measure it. */
export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(({
  items,
  separator = '/',
  maxItems = 8,
  className,
  ariaLabel = 'Breadcrumbs',
}, ref) => {
  const linkColor = 'var(--role-interactive-primary)';
  const textColor = 'var(--role-fg-primary)';
  const mutedColor = 'var(--role-fg-neutral-subtle)';

  const displayItems: (BreadcrumbItem | 'ellipsis')[] =
    items.length > maxItems && maxItems >= 2
      ? [items[0], 'ellipsis', ...items.slice(items.length - (maxItems - 1))]
      : items;

  return (
    <nav ref={ref} aria-label={ariaLabel} className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;

          return (
            <React.Fragment key={item === 'ellipsis' ? `ellipsis-${index}` : `${item.label}-${index}`}>
              {index > 0 && (
                <li aria-hidden="true" className="select-none" style={{ color: mutedColor }}>
                  {separator}
                </li>
              )}
              <li className="flex items-center">
                {item === 'ellipsis' ? (
                  <span style={{ color: mutedColor }}>…</span>
                ) : item.isCurrentPage || isLast ? (
                  <span aria-current="page" className="font-medium" style={{ color: textColor }}>
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href || '#'}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick(e);
                      }
                    }}
                    className="rounded-lg transition-opacity hover:underline hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{ color: linkColor, '--tw-ring-color': linkColor } as React.CSSProperties}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
});
Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
