import MuiSkeleton from '@mui/material/Skeleton';
import type { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';
import { getRoleColor } from '../../theme/roles';

export interface DSSkeletonProps extends MuiSkeletonProps {
  /** Variant of the skeleton */
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
  /** Width of the skeleton */
  width?: number | string;
  /** Height of the skeleton */
  height?: number | string;
  /** Animation type */
  animation?: 'pulse' | 'wave' | false;
}

/**
 * Design System Skeleton component built on MUI.
 * - Uses role-based colors via getRoleColor
 * - Loading placeholders for content
 */
const DSSkeleton: React.FC<DSSkeletonProps> = ({
  variant = 'text',
  animation = 'pulse',
  sx,
  ...rest
}) => {
  const bgColor = getRoleColor('surface.subtle');

  return (
    <MuiSkeleton
      variant={variant}
      animation={animation}
      sx={{
        backgroundColor: bgColor,
        ...sx,
      }}
      {...rest}
    />
  );
};

export default DSSkeleton;
