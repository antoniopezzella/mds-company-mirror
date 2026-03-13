import React, { useState } from 'react';
import type { SxProps } from '@mui/material/styles';
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getRoleColor } from '../../theme/roles';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  subtitle?: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultExpanded?: string[];
  allowMultiple?: boolean;
  variant?: 'default' | 'compact' | 'elevated';
  onChange?: (expandedIds: string[]) => void;
  sx?: SxProps;
}

/**
 * Accordion Component
 * Collapsible sections for organizing content hierarchically
 * Supports single/multiple expand, variants, and insurance domain patterns
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultExpanded = [],
  allowMultiple = false,
  variant = 'default',
  onChange,
  sx,
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded));

  const handleChange = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      if (!allowMultiple) {
        newExpanded.clear();
      }
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
    onChange?.(Array.from(newExpanded));
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          padding: '0 8px',
          gap: '4px',
        };
      case 'elevated':
        return {
          boxShadow: `0 2px 8px ${getRoleColor('surface.subtle')}`,
          borderRadius: '8px',
          overflow: 'hidden',
        };
      default:
        return {
          borderBottom: `1px solid ${getRoleColor('border.default')}`,
        };
    }
  };

  return (
    <Box sx={sx}>
      {items.map((item) => (
        <MuiAccordion
          key={item.id}
          expanded={expanded.has(item.id)}
          onChange={() => handleChange(item.id)}
          disabled={item.disabled}
          sx={{
            ...getVariantStyles(),
            backgroundColor: getRoleColor('surface.default'),
            '&.Mui-disabled': {
              backgroundColor: getRoleColor('surface.disabled'),
              opacity: 0.6,
            },
            '&.Mui-expanded': {
              backgroundColor: getRoleColor('surface.subtle'),
            },
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              padding: variant === 'compact' ? '12px 8px' : '16px',
              minHeight: variant === 'compact' ? '48px' : '64px',
              '&:hover': {
                backgroundColor: getRoleColor('surface.subtle'),
              },
              '&.Mui-disabled': {
                opacity: 0.6,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              {item.icon && <Box sx={{ display: 'flex' }}>{item.icon}</Box>}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: getRoleColor(item.disabled ? 'text.disabled' : 'text.primary'),
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </Typography>
                {item.subtitle && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: getRoleColor('text.secondary'),
                      marginTop: '4px',
                    }}
                  >
                    {item.subtitle}
                  </Typography>
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: variant === 'compact' ? '8px' : '16px',
              borderTop: `1px solid ${getRoleColor('border.default')}`,
              backgroundColor: getRoleColor('surface.default'),
            }}
          >
            <Typography sx={{ color: getRoleColor('text.primary') }}>
              {item.content}
            </Typography>
          </AccordionDetails>
        </MuiAccordion>
      ))}
    </Box>
  );
};

export default Accordion;
