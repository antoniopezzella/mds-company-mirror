import * as React from 'react';

import { cn } from '@/lib/utils';
import { normalizeSize } from './prop-compat';
import { getRoleColor } from '@/theme/roles';
import { Badge, type BadgeTone } from './badge';

/**
 * BadgeAnchor — the overlay/pin pattern the MUI `Badge` implemented (a small
 * indicator pinned to a corner of its child — a notification count on a
 * bell icon, a status dot on an avatar), which the standalone `Badge` above
 * deliberately doesn't cover (see its own header comment: it's a different,
 * non-anchored pattern).
 *
 * Built by positioning the standalone `Badge` pill absolutely rather than
 * reimplementing tone colors — `Badge`'s `TONE_ROLES` are already the
 * contrast-checked source of truth for these tones.
 */

export interface BadgeAnchorProps {
  /** Content for `number`/`text` variants. Ignored for `dot`. */
  content?: React.ReactNode;
  variant?: 'dot' | 'number' | 'text';
  size?: 'sm' | 'md' | 'small' | 'medium';
  tone?: BadgeTone;
  /**
   * Visual nuance only in the MUI original (a few px of corner-hugging
   * difference for circular vs rectangular anchors) — both resolve to the
   * same position here; not worth a fragile Tailwind override for a
   * pixel-level difference no real consumer currently depends on.
   */
  overlap?: 'circular' | 'rectangular';
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
  invisible?: boolean;
  children: React.ReactNode;
  className?: string;
}

const POSITION_CLASSES: Record<string, string> = {
  'top-right': '-top-1 -right-1',
  'top-left': '-top-1 -left-1',
  'bottom-right': '-bottom-1 -right-1',
  'bottom-left': '-bottom-1 -left-1',
};

export const BadgeAnchor: React.FC<BadgeAnchorProps> = ({
  content,
  variant = 'dot',
  size = 'md',
  tone = 'default',
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  invisible = false,
  children,
  className,
}) => {
  const resolvedSize = normalizeSize(size, 'BadgeAnchor');
  const positionKey = `${anchorOrigin.vertical}-${anchorOrigin.horizontal}`;
  const isDot = variant === 'dot';

  return (
    <span className={cn('relative inline-flex', className)}>
      {children}
      {!invisible && (
        <Badge
          tone={tone}
          className={cn(
            'absolute z-10 flex items-center justify-center rounded-full border-2 p-0 leading-none',
            POSITION_CLASSES[positionKey],
            isDot
              ? resolvedSize === 'sm'
                ? 'h-2 w-2'
                : 'h-3 w-3'
              : resolvedSize === 'sm'
                ? 'h-5 min-w-[20px] px-1 text-[0.65rem]'
                : 'h-6 min-w-[24px] px-1 text-xs'
          )}
          style={{ borderColor: getRoleColor('surface.default') }}
        >
          {isDot ? null : content}
        </Badge>
      )}
    </span>
  );
};

export default BadgeAnchor;
