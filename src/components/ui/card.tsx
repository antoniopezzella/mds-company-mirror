"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

/**
 * Design System Card — shadcn/ui counterpart for the MDS Card.
 *
 * NOTE on scope: the existing MUI `Card.tsx` only implements a narrow
 * "insight/stats card" (title + stat grid + trend + insight line) — a
 * pattern already covered by the `metric-card`/`ChartMetricCard` pair built
 * earlier, making a straight port redundant. Its own Code Connect mapping
 * (`Card.figma.tsx`) actually describes something else entirely: a generic
 * content card with `title`/`description`/`category`/`date`/`image`/
 * `orientation`/`border`/CTA — much closer to shadcn's own canonical Card.
 * This file builds both: the composable primitives below (the real,
 * idiomatic shadcn shape, useful standalone), and `ContentCard` — a
 * convenience component matching what the Figma spec actually describes.
 */

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { border?: boolean }>(
  ({ className, border = true, style, ...props }, ref) => (
    <div
      ref={ref}
      // rounded-xl is the scale's documented slot for cards (see
      // 30-Spacing.mdx) and matches DataGridContainer, which this used to
      // disagree with — a card beside a grid had visibly different corners.
      className={cn('flex flex-col rounded-xl', border && 'border', className)}
      style={{
        backgroundColor: getRoleColor('surface.default'),
        borderColor: border ? getRoleColor('border.default') : undefined,
        ...style,
      }}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 p-6 has-[[data-slot=card-action]]:grid-cols-[1fr_auto]',
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

/**
 * Slot for a header-corner action (e.g. an icon button) — pairs with
 * CardHeader's grid layout.
 */
const CardAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
);
CardAction.displayName = 'CardAction';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    // Generic wrapper spreading ...props onto a real caller-supplied children — static analysis can't see through the spread, but every real usage passes real heading text.
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h3
      ref={ref}
      className={cn('font-[family-name:var(--typo-h6-font-family,_Noto_Sans,_sans-serif)] text-lg font-bold leading-tight', className)}
      style={{ color: getRoleColor('text.primary') }}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('font-[family-name:var(--typo-body2-font-family,_Noto_Sans,_sans-serif)] text-sm', className)}
      style={{ color: getRoleColor('text.secondary') }}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('px-6 pb-6', className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 border-t px-6 py-4', className)}
      style={{ borderColor: getRoleColor('border.default'), ...style }}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardAction, CardTitle, CardDescription, CardContent, CardFooter };

// ── ContentCard: convenience wrapper matching the actual Figma spec ────────

export interface ContentCardProps {
  title?: string;
  description?: string;
  /** Small label above the title, e.g. a topic or section name. */
  category?: string;
  date?: string;
  /** Rendered above the title/description in `vertical` orientation, to the side in `horizontal`. */
  image?: string;
  orientation?: 'vertical' | 'horizontal';
  border?: boolean;
  /** Label for the trailing call-to-action link/button. Renders nothing if omitted, even when `onCtaClick` is set. */
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  category,
  date,
  image,
  orientation = 'vertical',
  border = true,
  ctaLabel,
  onCtaClick,
  className,
}) => {
  const isHorizontal = orientation === 'horizontal';
  return (
    <Card border={border} className={cn(isHorizontal ? 'flex-row overflow-hidden' : 'overflow-hidden', className)}>
      {image && (
        <img
          src={image}
          alt={title ?? ''}
          className={cn('object-cover', isHorizontal ? 'h-auto w-48 shrink-0' : 'h-40 w-full')}
        />
      )}
      <div className="flex flex-1 flex-col">
        {(category || date) && (
          <div className="flex items-center gap-2 px-6 pt-6 text-xs" style={{ color: getRoleColor('text.secondary') }}>
            {category && <span className="font-semibold uppercase tracking-wide">{category}</span>}
            {category && date && <span>&middot;</span>}
            {date && <span>{date}</span>}
          </div>
        )}
        {title && (
          <CardHeader className={cn((category || date) && 'pt-2')}>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        {description && (
          <CardContent className={!title ? 'pt-6' : undefined}>
            <CardDescription>{description}</CardDescription>
          </CardContent>
        )}
        {ctaLabel && onCtaClick && (
          <CardFooter className="mt-auto border-t-0">
            <button
              type="button"
              onClick={onCtaClick}
              className="text-sm font-semibold hover:underline"
              style={{ color: getRoleColor('interactive.primary') }}
            >
              {ctaLabel}
            </button>
          </CardFooter>
        )}
      </div>
    </Card>
  );
};

export default Card;
