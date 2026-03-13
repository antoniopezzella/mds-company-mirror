import React from 'react';
import type { SxProps } from '@mui/material/styles';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { getRoleColor } from '../../theme/roles';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  isCurrentPage?: boolean;
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator character or element */
  separator?: React.ReactNode;
  /** Maximum number of items before collapsing */
  maxItems?: number;
  /** Custom class name */
  className?: string;
  /** Additional sx props */
  sx?: SxProps;
  /** Aria label for navigation */
  ariaLabel?: string;
}

/**
 * Breadcrumbs Component
 * Shows the hierarchical path in a navigation structure
 * 
 * @example
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Policies', href: '/policies' },
 *     { label: 'Policy Detail', isCurrentPage: true }
 *   ]}
 * />
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  maxItems = 8,
  className = '',
  sx,
  ariaLabel = 'Breadcrumbs',
}) => {
  const linkColor = getRoleColor('interactive.primary');
  const textColor = getRoleColor('text.primary');
  const disabledColor = getRoleColor('text.secondary');

  return (
    <nav aria-label={ariaLabel} className={className}>
      <MuiBreadcrumbs
        separator={separator}
        maxItems={maxItems}
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: disabledColor,
            mx: 0.5,
          },
          ...sx,
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.isCurrentPage || isLast;

          if (isCurrent) {
            return (
              <Typography
                key={index}
                sx={{
                  color: textColor,
                  fontWeight: 500,
                  fontSize: '0.875rem',
                }}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={index}
              href={item.href || '#'}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick(e);
                }
              }}
              sx={{
                color: linkColor,
                textDecoration: 'none',
                fontSize: '0.875rem',
                cursor: item.href || item.onClick ? 'pointer' : 'default',
                '&:hover': {
                  textDecoration: 'underline',
                  opacity: 0.8,
                },
                '&:focus': {
                  outline: `2px solid ${linkColor}`,
                  outlineOffset: '2px',
                  borderRadius: '2px',
                },
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </nav>
  );
};

export default Breadcrumbs;
