import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { getRoleColor, type RoleName } from '@/theme/roles';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
export type AvatarVariant = 'circular' | 'rounded' | 'square';
export type AvatarTone = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps {
  src?: string;
  initials?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  tone?: AvatarTone;
  alt?: string;
  onClick?: () => void;
  status?: AvatarStatus;
  badge?: React.ReactNode;
  className?: string;
}

const SIZE_PX: Record<AvatarSize, number> = {
  small: 32,
  medium: 40,
  large: 56,
  xlarge: 64,
};

const FONT_SIZE: Record<AvatarSize, string> = {
  small: '0.75rem',
  medium: '1rem',
  large: '1.25rem',
  xlarge: '1.25rem',
};

const STATUS_SIZE: Record<AvatarSize, number> = {
  small: 8,
  medium: 12,
  large: 14,
  xlarge: 14,
};

const RADIUS: Record<AvatarVariant, string> = {
  circular: '50%',
  rounded: '8px',
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
  size = 'medium',
  variant = 'circular',
  tone = 'default',
  alt = 'User Avatar',
  onClick,
  status,
  badge,
  className,
}) => {
  const sizePx = SIZE_PX[size];
  const statusPx = STATUS_SIZE[size];
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
          fontSize: FONT_SIZE[size],
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
