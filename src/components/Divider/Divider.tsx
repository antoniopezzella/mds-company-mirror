import React from 'react';
import type { SxProps } from '@mui/material/styles';
import { Divider as MuiDivider, Box } from '@mui/material';
import { getRoleColor } from '../../theme/roles';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  label?: string | React.ReactNode;
  labelPosition?: 'start' | 'center' | 'end';
  flexItem?: boolean;
  dashed?: boolean;
  sx?: SxProps;
}

/**
 * Divider Component
 * Visual separator for content sections
 * Supports horizontal/vertical, labels, and multiple styles
 */
export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'fullWidth',
  label,
  labelPosition = 'center',
  flexItem = false,
  dashed = false,
  sx,
}) => {
  const borderColor = getRoleColor('border.default');
  const textColor = getRoleColor('text.secondary');

  if (label) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: orientation === 'vertical' ? '0 12px' : '12px 0',
          ...sx,
        }}
      >
        {(labelPosition === 'start' || labelPosition === 'center') && (
          <Box
            sx={{
              flex: 1,
              height: orientation === 'vertical' ? '1px' : 'auto',
              width: orientation === 'vertical' ? 'auto' : '100%',
              borderTop: orientation === 'horizontal' ? `1px ${dashed ? 'dashed' : 'solid'} ${borderColor}` : 'none',
              borderLeft: orientation === 'vertical' ? `1px ${dashed ? 'dashed' : 'solid'} ${borderColor}` : 'none',
            }}
          />
        )}
        <Box sx={{ color: textColor, whiteSpace: 'nowrap', fontSize: '0.875rem' }}>
          {label}
        </Box>
        {(labelPosition === 'end' || labelPosition === 'center') && (
          <Box
            sx={{
              flex: 1,
              height: orientation === 'vertical' ? '1px' : 'auto',
              width: orientation === 'vertical' ? 'auto' : '100%',
              borderTop: orientation === 'horizontal' ? `1px ${dashed ? 'dashed' : 'solid'} ${borderColor}` : 'none',
              borderLeft: orientation === 'vertical' ? `1px ${dashed ? 'dashed' : 'solid'} ${borderColor}` : 'none',
            }}
          />
        )}
      </Box>
    );
  }

  return (
    <MuiDivider
      orientation={orientation}
      flexItem={flexItem}
      sx={{
        borderColor: borderColor,
        borderStyle: dashed ? 'dashed' : 'solid',
        margin: orientation === 'vertical' ? '0 12px' : '12px 0',
        ...(variant === 'inset' && {
          marginLeft: orientation === 'horizontal' ? '16px' : 'auto',
          marginRight: orientation === 'horizontal' ? '0' : 'auto',
        }),
        ...(variant === 'middle' && {
          margin: orientation === 'vertical' ? '12px' : '12px 0',
        }),
        ...sx,
      }}
    />
  );
};

export default Divider;
