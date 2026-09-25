"use client"

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { getRoleColor, type RoleName } from '@/theme/roles';
import { normalizeSize } from './prop-compat';

/**
 * Canonical size scale. The `small|medium|large|xlarge` spellings still work but
 * are deprecated — see `prop-compat.ts` for the compatibility contract.
 */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/** @deprecated since 0.6.0; remove after 0.7.0 / 2026-12-23.
   *  Use {@link AvatarSize} (`sm`/`md`/`lg`/`xl`). */
export type LegacyAvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
export type AvatarVariant = 'circular' | 'rounded' | 'square';
export type AvatarTone = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps {
  src?: string;
  initials?: string;
  size?: AvatarSize | LegacyAvatarSize;
  variant?: AvatarVariant;
  tone?: AvatarTone;
  alt?: string;
  onClick?: () => void;
  status?: AvatarStatus;
  badge?: React.ReactNode;
  className?: string;
}

const SIZE_PX: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 64,
};

const FONT_SIZE: Record<AvatarSize, string> = {
  sm: '0.75rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.25rem',
};

const STATUS_SIZE: Record<AvatarSize, number> = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 14,
};

// An inline style, so it cannot use a `rounded-*` utility — but it must still
// track the scale, or Avatar drifts every time the scale moves. `--radius-sm`
// is the same step `rounded-lg` resolves to, with the old 8px as the fallback
// for any context that has not loaded the theme layer.
const RADIUS: Record<AvatarVariant, string> = {
  circular: '50%',
  rounded: 'var(--radius-lg, 8px)',
  square: '0',
};

function getToneColors(tone: AvatarTone): { bg: RoleName; fg: RoleName } {
  switch (tone) {
    case 'primary':
      return { bg: 'surface.accent', fg: 'text.primary' };
    case 'secondary':
      return { bg: 'surface.subtle', fg: 'text.primary' };
    case 'success':
      return { bg: 'status.success.bg', fg: 'status.success.fg' };
    case 'warning':
      // warning is the exception: status.warning.fg (gold1000) on
      // status.warning.bg is 3.34:1 — fine as an accent, unreadable as text.
      // text.onLight (17.71:1) exists for exactly this. See alert.tsx.
      return { bg: 'status.warning.bg', fg: 'text.onLight' };
    case 'danger':
      return { bg: 'status.danger.bg', fg: 'status.danger.fg' };
    default:
      return { bg: 'surface.subtle', fg: 'text.primary' };
  }
}

function getStatusColor(status?: AvatarStatus): RoleName {
  switch (status) {
    case 'online':
      return 'status.success.bg';
    case 'away':
      return 'status.warning.bg';
    case 'busy':
      return 'status.danger.bg';
    default:
      return 'border.default';
  }
}

const avatarWrapperVariants = cva('relative inline-block', {
  variants: {
    clickable: {
      true: 'cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    clickable: false,
  },
});

const avatarRootVariants = cva('flex shrink-0 items-center justify-center overflow-hidden font-semibold');

/**
 * Design System Avatar — shadcn/ui/Radix counterpart for the MDS Avatar.
 * Same `src`/`initials`/`size`/`variant`/`tone`/`status`/`badge` API as the
 * MUI twin. Uses Radix Avatar for automatic image-load-failure fallback.
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  initials,
  size = 'md',
  variant = 'circular',
  tone = 'default',
  alt = 'User Avatar',
  onClick,
  status,
  badge,
  className,
}) => {
  const resolvedSize = normalizeSize(size, 'Avatar') as AvatarSize;
  const sizePx = SIZE_PX[resolvedSize];
  const statusPx = STATUS_SIZE[resolvedSize];
  const { bg, fg } = getToneColors(tone);

  return (
    <div
      className={cn(avatarWrapperVariants({ clickable: Boolean(onClick) }), className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <AvatarPrimitive.Root
        className={avatarRootVariants()}
        style={{
          width: sizePx,
          height: sizePx,
          borderRadius: RADIUS[variant],
          fontSize: FONT_SIZE[resolvedSize],
          border: `2px solid ${getRoleColor('surface.default')}`,
          boxShadow: `0 0 0 1px ${getRoleColor('border.default')}`,
        }}
      >
        {src && <AvatarPrimitive.Image src={src} alt={alt} className="h-full w-full object-cover" />}
        <AvatarPrimitive.Fallback
          delayMs={src ? 400 : undefined}
          className="flex h-full w-full items-center justify-center"
          style={{ backgroundColor: getRoleColor(bg), color: getRoleColor(fg) }}
        >
          {initials}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>

      {status && (
        <span
          className="absolute bottom-0 right-0 block rounded-full"
          style={{
            width: statusPx,
            height: statusPx,
            backgroundColor: getRoleColor(getStatusColor(status)),
            border: `2px solid ${getRoleColor('surface.default')}`,
            boxShadow: `0 0 0 1px ${getRoleColor('border.default')}`,
          }}
        />
      )}

      {badge && <span className="absolute right-0 top-0 z-10">{badge}</span>}
    </div>
  );
};

export default Avatar;
