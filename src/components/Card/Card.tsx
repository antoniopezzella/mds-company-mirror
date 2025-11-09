import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
//
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

const InfoIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" width="14" height="14" style={{ display: 'inline-block', verticalAlign: '-2px' }}>
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
    <path d="M11 10h2v7h-2zM11 7h2v2h-2z" fill="currentColor" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" width="16" height="16" style={{ display: 'inline-block' }}>
    <path d="M12 4l6 6h-4v10h-4V10H6l6-6z" fill="currentColor" />
  </svg>
);

const CheckIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" style={{ display: 'inline-block' }}>
    <path d="M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.5-1.5z" fill="currentColor" />
  </svg>
);

const StatSection: React.FC<Stat> = ({ label, value, change }) => (
  <Box sx={{ textAlign: 'left', minWidth: 0 }}>
    <Box sx={{ color: getRoleColor('text.secondary'), fontSize: 12, display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5, minWidth: 0 }}>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={label}>{label}</span>
      <span style={{ opacity: 0.8 }}><InfoIcon /></span>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
      <span style={{ fontWeight: 700, fontSize: 24 }}>{value}</span>
      {change && (
        <span style={{ color: getRoleColor('status.success.fg'), fontWeight: 700, display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: 4 }}><ArrowUpIcon /></span> {change}
        </span>
      )}
    </Box>
  </Box>
);

const Insight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 2, color: getRoleColor('text.secondary') }}>
    <span style={{ color: getRoleColor('status.success.fg'), marginTop: 2 }}><CheckIcon /></span>
    <div style={{ fontSize: 14 }}>{children}</div>
  </Box>
);

const Card: React.FC<CardProps> = ({ title, stats, insight }) => (
  <Box sx={{
    p: 2,
    borderRadius: '8px',
    border: `1px solid ${getRoleColor('border.default')}`,
    bgcolor: getRoleColor('surface.default'),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }}>
    <Box sx={{ flex: 1 }}>
      <h3 style={{ fontWeight: 700, fontSize: 18, margin: 0, marginBottom: 8 }}>{title}</h3>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 1.5, flexWrap: 'wrap' }}>
        {stats.map((stat) => (
          <StatSection key={stat.label} {...stat} />
        ))}
      </Box>
      <Divider sx={{ borderColor: getRoleColor('border.default') }} />
      <Insight>{insight}</Insight>
    </Box>
  </Box>
);

export default Card;
