import React from 'react';
import type { SxProps } from '@mui/material/styles';
import { Avatar as MuiAvatar, AvatarGroup, Tooltip, Box } from '@mui/material';
import { getRoleColor } from '../../theme/roles';

export interface AvatarProps {
  src?: string;
  initials?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  variant?: 'circular' | 'rounded' | 'square';
  tone?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  alt?: string;
  onClick?: () => void;
  status?: 'online' | 'offline' | 'away' | 'busy';
  badge?: React.ReactNode;
  sx?: SxProps;
}

const getSizePixels = (size: AvatarProps['size']): number => {
  switch (size) {
    case 'small':
      return 32;
    case 'medium':
      return 40;
    case 'large':
      return 56;
    case 'xlarge':
      return 64;
    default:
      return 40;
  }
};

const getToneBgColor = (tone: AvatarProps['tone']): string => {
  switch (tone) {
    case 'primary':
      return getRoleColor('surface.accent');
    case 'secondary':
      return getRoleColor('surface.subtle');
    case 'success':
      return getRoleColor('status.success.bg');
    case 'warning':
      return getRoleColor('status.warning.bg');
    case 'danger':
      return getRoleColor('status.danger.bg');
    default:
      return getRoleColor('surface.subtle');
  }
};

const getToneTextColor = (tone: AvatarProps['tone']): string => {
  switch (tone) {
    case 'primary':
      return getRoleColor('text.inverse');
    case 'secondary':
      return getRoleColor('text.primary');
    case 'success':
      return getRoleColor('status.success.fg');
    case 'warning':
      return getRoleColor('status.warning.fg');
    case 'danger':
      return getRoleColor('status.danger.fg');
    default:
      return getRoleColor('text.primary');
  }
};

const getStatusColor = (status?: string): string => {
  switch (status) {
    case 'online':
      return getRoleColor('status.success.bg');
    case 'away':
      return getRoleColor('status.warning.bg');
    case 'busy':
      return getRoleColor('status.danger.bg');
    default:
      return getRoleColor('border.default');
  }
};

/**
 * Avatar Component
 * User profile images with fallback initials, status indicators, and grouping
 * Supports multiple sizes, tones, and status badges
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
  sx,
}) => {
  const sizePixels = getSizePixels(size);
  const statusSize = size === 'small' ? 8 : size === 'large' ? 14 : 12;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        cursor: onClick ? 'pointer' : 'default',
        ...sx,
      }}
      onClick={onClick}
    >
      <MuiAvatar
        src={src}
        alt={alt}
        sx={{
          width: sizePixels,
          height: sizePixels,
          borderRadius:
            variant === 'circular' ? '50%' : variant === 'rounded' ? '8px' : '0',
          backgroundColor: !src ? getToneBgColor(tone) : undefined,
          color: !src ? getToneTextColor(tone) : undefined,
          fontSize:
            size === 'small' ? '0.75rem' : size === 'large' ? '1.25rem' : '1rem',
          fontWeight: 600,
          border: `2px solid ${getRoleColor('surface.default')}`,
          boxShadow: `0 0 0 1px ${getRoleColor('border.default')}`,
        }}
      >
        {initials}
      </MuiAvatar>

      {status && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: statusSize,
            height: statusSize,
            borderRadius: '50%',
            backgroundColor: getStatusColor(status),
            border: `2px solid ${getRoleColor('surface.default')}`,
            boxShadow: `0 0 0 1px ${getRoleColor('border.default')}`,
          }}
        />
      )}

      {badge && (
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            right: '0',
            zIndex: 1,
          }}
        >
          {badge}
        </Box>
      )}
    </Box>
  );
};

/**
 * AvatarGroup Component
 * Display multiple avatars with overflow handling
 */
export const AvatarGroupComponent: React.FC<{
  avatars: Array<{ src?: string; initials?: string; alt?: string; name?: string }>;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps;
}> = ({ avatars, max = 3, size = 'medium', sx }) => {
  return (
    <AvatarGroup
      max={max}
      sx={{
        ...sx,
        '& .MuiAvatar-root': {
          width: getSizePixels(size),
          height: getSizePixels(size),
          fontSize: size === 'small' ? '0.75rem' : size === 'large' ? '1.25rem' : '1rem',
          border: `2px solid ${getRoleColor('surface.default')}`,
          backgroundColor: getRoleColor('surface.subtle'),
        },
      }}
    >
      {avatars.map((avatar, index) => (
        <Tooltip key={index} title={avatar.name || 'User'}>
          <MuiAvatar src={avatar.src} alt={avatar.alt || 'User'}>
            {avatar.initials}
          </MuiAvatar>
        </Tooltip>
      ))}
    </AvatarGroup>
  );
};

export default Avatar;
