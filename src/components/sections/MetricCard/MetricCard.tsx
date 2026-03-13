import { Typography } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';
import './MetricCard.scss';

export interface MetricCardProps {
  /** Large number/metric value */
  value: string;
  /** Metric label/description */
  label: string;
}

/**
 * MetricCard - Atomic component for displaying metrics
 * 
 * Design from Figma node 2885:48269
 * - Large number display (128px height in design)
 * - Label underneath
 * - Centered text
 */
export const MetricCard: React.FC<MetricCardProps> = ({ value, label }) => {
  return (
    <div className="metric-card">
      <Typography
        className="metric-card__value"
        sx={{
          color: getRoleColor('text.primary'),
          fontSize: { xs: '64px', md: '96px', lg: '112px' },
          fontWeight: 700,
          lineHeight: 1,
          textAlign: 'center',
        }}
      >
        {value}
      </Typography>
      <Typography
        variant="h6"
        className="metric-card__label"
        sx={{
          color: getRoleColor('text.secondary'),
          textAlign: 'center',
          mt: (theme) => theme.spacing(2),
        }}
      >
        {label}
      </Typography>
    </div>
  );
};
