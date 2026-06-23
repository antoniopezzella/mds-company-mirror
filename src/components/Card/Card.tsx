import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { getRoleColor } from '../../theme/roles';

interface Stat {
  label: string;
  value: string;
  change?: string;
}

interface CardProps {
  title: string;
  stats: Stat[];
  insight: string;
}

const getChangeColor = (change: string | undefined, mode: 'light' | 'dark') => {
  if (!change) return getRoleColor('text.secondary', { mode });
  const trimmed = change.trim();
  if (trimmed.startsWith('-')) return getRoleColor('status.danger.fg', { mode });
  if (trimmed.startsWith('+')) return getRoleColor('status.success.fg', { mode });
  return getRoleColor('text.secondary', { mode });
};

const getTrendDirection = (change?: string) => {
  if (!change) return null;
  const trimmed = change.trim();
  if (trimmed.startsWith('-')) return 'down';
  if (trimmed.startsWith('+')) return 'up';
  return null;
};

const InfoIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" width="14" height="14" style={{ display: 'inline-block', verticalAlign: '-2px' }}>
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
    <path d="M11 10h2v7h-2zM11 7h2v2h-2z" fill="currentColor" />
  </svg>
);

const TrendIcon: React.FC<{ direction: 'up' | 'down' }> = ({ direction }) => (
  <svg aria-hidden viewBox="0 0 24 24" width="16" height="16" style={{ display: 'inline-block' }}>
    {direction === 'up' ? (
      <path d="M12 4l6 6h-4v10h-4V10H6l6-6z" fill="currentColor" />
    ) : (
      <path d="M12 20l-6-6h4V4h4v10h4l-6 6z" fill="currentColor" />
    )}
  </svg>
);

const CheckIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" style={{ display: 'inline-block' }}>
    <path d="M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.5-1.5z" fill="currentColor" />
  </svg>
);

const StatSection: React.FC<Stat> = ({ label, value, change }) => {
  const theme = useTheme();
  const mode = theme.palette.mode as 'light' | 'dark';
  const trend = getTrendDirection(change);
  const changeColor = getChangeColor(change, mode);

  return (
    <Box sx={{ textAlign: 'left', minWidth: 0 }}>
      <Box
        sx={{
          color: getRoleColor('text.secondary', { mode }),
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          mb: 0.5,
          minWidth: 0,
        }}
      >
        <Typography
          noWrap
          title={label}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'inherit',
          }}
        >
          {label}
        </Typography>
        <Box component="span" aria-hidden="true" sx={{ opacity: 0.8 }}>
          <InfoIcon />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <Typography component="span" sx={{ fontWeight: 700, fontSize: 24, lineHeight: 1 }}>
          {value}
        </Typography>

        {change && (
          <Box
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: changeColor,
              fontWeight: 700,
            }}
          >
            {trend && <TrendIcon direction={trend} />}
            <Typography component="span">{change}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const Insight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const mode = theme.palette.mode as 'light' | 'dark';

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 2, color: getRoleColor('text.secondary', { mode }) }}>
      <Box component="span" sx={{ color: getRoleColor('status.success.fg', { mode }), mt: '2px' }}>
        <CheckIcon />
      </Box>
      <Typography component="div" sx={{ fontSize: 14, lineHeight: 1.5 }}>
        {children}
      </Typography>
    </Box>
  );
};

const Card: React.FC<CardProps> = ({ title, stats, insight }) => {
  const theme = useTheme();
  const mode = theme.palette.mode as 'light' | 'dark';

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: '8px',
        border: `1px solid ${getRoleColor('border.default', { mode })}`,
        bgcolor: getRoleColor('surface.default', { mode }),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          component="h3"
          sx={{ fontWeight: 700, fontSize: 18, lineHeight: 1.3, mb: 1, color: getRoleColor('text.primary', { mode }) }}
        >
          {title}
        </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 1.5, flexWrap: 'wrap' }}>
            {stats.map((stat) => (
              <StatSection key={stat.label} {...stat} />
            ))}
          </Box>

          <Divider sx={{ borderColor: getRoleColor('border.default', { mode }) }} />
          <Insight>{insight}</Insight>
        </Box>
      </Box>
    );
};

export default Card;
