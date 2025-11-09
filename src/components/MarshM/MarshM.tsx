import React from 'react';
import Box from '@mui/material/Box';
import { getRoleColor } from '../../theme/roles';
import leftArrowUrl from '../../assets/m-arrow-left.svg';
import rightArrowUrl from '../../assets/m-arrow-right.svg';

export type MarshMProps = {
  width?: number | string; // total width of the composed "M"
  opacity?: number; // overall opacity for decorative use
  gap?: number; // horizontal gap/overlap between the two arrows (px). Negative values overlap
  tintRole?: Parameters<typeof getRoleColor>[0]; // optional role-based tint via CSS filters on SVGs that are strokes
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * MarshM — Decorative composed logo mark built from left/right arrow SVGs.
 * - Does not manage color of the underlying SVGs; pass assets in brand color or apply a CSS filter.
 * - Use for subtle decorative marks or pattern tiles.
 */
const MarshM: React.FC<MarshMProps> = ({
  width = 160,
  opacity = 1,
  gap = -8,
  tintRole,
  ariaLabel = 'Marsh M mark',
  className,
  style,
}) => {
  const wCss = typeof width === 'number' ? `${width}px` : width;
  const half = '50%';
  const tint = tintRole ? getRoleColor(tintRole) : undefined;

  return (
    <Box
      aria-label={ariaLabel}
      role="img"
      sx={{ position: 'relative', display: 'inline-block', width: wCss, aspectRatio: '1 / 1', opacity }}
      className={className}
      style={style}
    >
      {/* Left arrow */}
      <Box
        component="img"
        src={leftArrowUrl}
        alt=""
        aria-hidden
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: half,
          height: '100%',
          objectFit: 'contain',
          filter: tint ? `drop-shadow(0 0 0 ${tint})` : undefined,
        }}
      />
      {/* Right arrow */}
      <Box
        component="img"
        src={rightArrowUrl}
        alt=""
        aria-hidden
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: half,
          height: '100%',
          objectFit: 'contain',
          transform: gap !== 0 ? `translateX(${gap}px)` : undefined,
          filter: tint ? `drop-shadow(0 0 0 ${tint})` : undefined,
        }}
      />
    </Box>
  );
};

export default MarshM;
