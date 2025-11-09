import MuiSwitch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import { getRoleColor } from '../../theme/roles';

export interface DSSwitchProps extends Omit<MuiSwitchProps, 'color'> {
  /** Label for the switch */
  label?: string;
  /** Tone for the switch color */
  tone?: 'default' | 'danger';
  /** Label placement */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

/**
 * Design System Switch component built on MUI Switch.
 * - Uses role-based colors via getRoleColor
 * - Toggle control for on/off states
 */
const DSSwitch: React.FC<DSSwitchProps> = ({
  label,
  tone = 'default',
  labelPlacement = 'end',
  sx,
  ...rest
}) => {
  const checkedColor = tone === 'danger' 
    ? getRoleColor('interactive.danger') 
    : getRoleColor('interactive.primary');
  const trackColor = getRoleColor('border.default');
  const textColor = getRoleColor('text.primary');

  const switchElement = (
    <MuiSwitch
      sx={{
        '& .MuiSwitch-switchBase': {
          color: getRoleColor('surface.default'),
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-checked': {
            color: checkedColor,
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '& + .MuiSwitch-track': {
              backgroundColor: checkedColor,
              opacity: 1,
            },
          },
          '&.Mui-disabled': {
            opacity: 0.5,
          },
        },
        '& .MuiSwitch-track': {
          backgroundColor: trackColor,
          opacity: 1,
        },
        '& .MuiSwitch-thumb': {
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        ...sx,
      }}
      {...rest}
    />
  );

  if (label) {
    return (
      <FormControlLabel
        control={switchElement}
        label={label}
        labelPlacement={labelPlacement}
        sx={{
          color: textColor,
          fontFamily: 'var(--typo-body-font-family)',
          '& .MuiFormControlLabel-label': {
            fontSize: 'var(--typo-body-font-size)',
            lineHeight: 'var(--typo-body-line-height)',
          },
        }}
      />
    );
  }

  return switchElement;
};

export default DSSwitch;
