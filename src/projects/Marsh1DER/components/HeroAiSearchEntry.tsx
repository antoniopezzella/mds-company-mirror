import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button as DSButton } from '../../../components/ui/button';
import Chip from '../../../components/ui/chip';
import { getRoleColor } from '../../../theme/roles';

export interface HeroAiSearchEntryProps {
  placeholder?: string;
  onAsk?: (query: string) => void;
  filterChips?: string[];
  activeTag?: string;
}

/**
 * AI search entry + filter chip row for the Marsh1DER hero (V1 Figma design).
 * Lives alongside HeroBanner rather than inside it since it's specific to
 * this one hero variant's content, not a generic hero building block.
 */
export const HeroAiSearchEntry: React.FC<HeroAiSearchEntryProps> = ({
  placeholder = 'How can I help with your risk today?',
  onAsk,
  filterChips = ['Cyber risk coverage', 'Claims support', 'Employee Benefits'],
  activeTag = 'Cyber Risk Analytics',
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 712 }}>
      {/* AI entry search bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          minHeight: 64,
          width: '100%',
          p: '16px',
          borderRadius: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.79)',
          border: '1px solid rgba(235, 231, 226, 0.4)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', gap: '16px', minWidth: 0 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              px: '10px',
              py: '4px',
              borderRadius: '999px',
              backgroundColor: getRoleColor('interactive.primary.active'),
            }}
          >
            <Typography
              sx={{
                color: getRoleColor('text.inverse'),
                fontFamily: 'var(--typo-body1-font-family)',
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              ✦ Ask AI
            </Typography>
          </Box>
          <Typography
            sx={{
              flex: 1,
              minWidth: 0,
              color: getRoleColor('text.secondary'),
              fontFamily: 'var(--typo-body1-font-family)',
              fontSize: 18,
              lineHeight: '28px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {placeholder}
          </Typography>
        </Box>
        <DSButton variant="primaryAlt" size="sm" endIcon={<ArrowForwardIcon fontSize="small" />} onClick={() => onAsk?.(placeholder)}>
          Ask now
        </DSButton>
      </Box>

      {/* Filter chips */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        {filterChips.map((label) => (
          <Chip
            key={label}
            label={label}
            variant="outlined"
            size="md"
            onClick={() => onAsk?.(`Tell me more about ${label}.`)}
            style={{
              color: getRoleColor('text.inverse'),
              borderColor: 'rgba(206, 236, 255, 0.4)',
            }}
          />
        ))}
        {activeTag && (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 32,
              px: '14px',
              borderRadius: '1000px',
              backgroundColor: getRoleColor('text.inverse'),
              border: `1px solid ${getRoleColor('interactive.primary.hover')}`,
            }}
          >
            <Typography
              sx={{
                color: getRoleColor('interactive.primary'),
                fontFamily: 'var(--typo-body1-font-family)',
                fontSize: 14,
                lineHeight: '20px',
                whiteSpace: 'nowrap',
              }}
            >
              {activeTag}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HeroAiSearchEntry;
