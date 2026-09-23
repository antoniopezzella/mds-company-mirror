"use client"

import * as React from 'react';

import { getRoleColor } from '@/theme/roles';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  isCurrentPage?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Design System Breadcrumbs — shadcn/ui counterpart for the MDS Breadcrumbs.
 * Same `items`/`separator`/`maxItems`/`ariaLabel` API as the MUI twin,
 * including the same first/last + ellipsis collapse behavior when the
 * item count exceeds `maxItems`.
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  maxItems = 8,
  className,
  ariaLabel = 'Breadcrumbs',
}) => {
  const linkColor = getRoleColor('interactive.primary');
  const textColor = getRoleColor('text.primary');
  const mutedColor = getRoleColor('text.secondary');

  const displayItems: (BreadcrumbItem | 'ellipsis')[] =
    items.length > maxItems && maxItems >= 2
      ? [items[0], 'ellipsis', ...items.slice(items.length - (maxItems - 1))]
      : items;

  return (
    <nav aria-label={ariaLabel} className={className}>
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
                    className="rounded transition-opacity hover:underline hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
};

export default Breadcrumbs;
