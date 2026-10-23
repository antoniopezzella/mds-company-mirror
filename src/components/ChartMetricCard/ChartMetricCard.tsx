import { Box, Typography, useTheme } from '@mui/material';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { getRoleColor } from '../../theme/roles';

export interface ChartMetricCardProps {
  /** Metric label */
  label: string;
  /** Primary metric value displayed large */
  value: string;
  /** Change text, e.g. '+8.3%' */
  change: string;
  /** Direction of the trend */
  trend: 'up' | 'down' | 'neutral';
  /** Sparkline data — array of { v: number } */
  data: { v: number }[];
  /** Optional sublabel below the value */
  sublabel?: string;
}

const getTrendColors = (mode: 'light' | 'dark') => ({
  up: getRoleColor('fg.success', { mode }),
  down: getRoleColor('fg.critical', { mode }),
  neutral: getRoleColor('fg.neutral.subtle', { mode }),
});

const getTrendBg = (mode: 'light' | 'dark') => ({
  up: getRoleColor('bg.success.subtle', { mode }),
  down: getRoleColor('bg.critical.subtle', { mode }),
  neutral: getRoleColor('bg.neutral.subtle', { mode }),
});

const TREND_ARROW: Record<ChartMetricCardProps['trend'], string> = {
  up: '↑',
  down: '↓',
  neutral: '→',
};

export const ChartMetricCard: React.FC<ChartMetricCardProps> = ({
  label,
  value,
  change,
  trend,
  data,
  sublabel,
}) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  
  const TREND_COLORS = getTrendColors(mode);
  const TREND_BG = getTrendBg(mode);

  const lineColor = trend === 'up'
    ? getRoleColor('fg.success', { mode })
    : trend === 'down'
      ? getRoleColor('fg.critical', { mode })
      : getRoleColor('interactive.primary', { mode });

  return (
    <Box
      sx={{
        bgcolor: getRoleColor('bg.neutral.subtle', { mode }),
        borderRadius: 2,
        border: `1px solid ${getRoleColor('border.default', { mode })}`,
        p: (theme) => theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        gap: (theme) => theme.spacing(2),
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header: label + trend badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          sx={{ color: getRoleColor('fg.neutral.subtle', { mode }), fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.6875rem' }}
        >
          {label}
        </Typography>
        <Box
          component="span"
          sx={{
            px: 1,
            py: 0.25,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: TREND_COLORS[trend],
            bgcolor: TREND_BG[trend],
            lineHeight: 1.5,
          }}
        >
          {TREND_ARROW[trend]} {change}
        </Box>
      </Box>

      {/* Metric value */}
      <Box>
        <Typography
          variant="h4"
          component="p"
          sx={{ color: getRoleColor('fg.primary', { mode }), fontWeight: 700, lineHeight: 1.1 }}
        >
          {value}
        </Typography>
        {sublabel && (
          <Typography variant="caption" sx={{ color: getRoleColor('fg.neutral.subtle', { mode }), mt: 0.25, display: 'block' }}>
            {sublabel}
          </Typography>
        )}
      </Box>

      {/* Sparkline */}
      <Box sx={{ height: 56, mx: -1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id={`grad-${label.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineColor} stopOpacity={0.18} />
                <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                fontSize: 12,
                padding: '4px 8px',
                border: `1px solid ${getRoleColor('border.default', { mode })}`,
                borderRadius: 6,
                backgroundColor: getRoleColor('bg.neutral.subtle', { mode }),
                color: getRoleColor('fg.primary', { mode }),
              }}
              formatter={(val) => [val ?? '', label]}
              labelFormatter={() => ''}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke={lineColor}
              strokeWidth={2}
              fill={`url(#grad-${label.replace(/\s/g, '')})`}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0, fill: lineColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
