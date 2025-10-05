import React from 'react';
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Example icon

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

const StatSection: React.FC<Stat> = ({ label, value, change }) => (
  <Box sx={{ textAlign: 'left' }}>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}
    >
      {label} <InfoOutlinedIcon fontSize="inherit" />
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
      <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
      {change && (
        <Typography
          color="success.main"
          sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
        >
          <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} /> {change}
        </Typography>
      )}
    </Box>
  </Box>
);

const Insight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mt: 2 }}>
    <CheckCircleIcon sx={{ color: 'success.main', mt: 0.5 }} />
    <Typography variant="body2" color="text.secondary">
      {children}
    </Typography>
  </Box>
);

const Card: React.FC<CardProps> = ({ title, stats, insight }) => (
  <MuiCard
    sx={{
      p: 2,
      borderRadius: 1,
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'divider',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography
        variant="h6"
        component="h3"
        sx={{ fontWeight: 'bold', mb: 2 }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          mb: 2,
        }}
      >
        {stats.map((stat) => (
          <StatSection key={stat.label} {...stat} />
        ))}
      </Box>
      <Divider />
      <Insight>{insight}</Insight>
    </CardContent>
  </MuiCard>
);

export default Card;
