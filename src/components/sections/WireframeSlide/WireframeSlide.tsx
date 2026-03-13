import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';
import styles from './WireframeSlide.module.scss';

export interface WireframeSlideProps {
  /** Main title for the wireframe slide */
  title: string;
  /** Description or key points */
  description: string;
  /** Optional visual placeholders (icons, small wireframe snippets, etc.) */
  placeholders?: string[];
  /** Theme variant: 'light' | 'dark' | 'hero' */
  variant?: 'light' | 'dark' | 'hero';
  /** Custom background color (overrides variant default) */
  backgroundColor?: string;
}

/**
 * WireframeSlide Component
 * A layout section designed for conceptual wireframe presentations with text and visual placeholders.
 * Adheres to MDS-Platform role-based styling and grid system.
 */
export const WireframeSlide: React.FC<WireframeSlideProps> = ({
  title,
  description,
  placeholders = ['Wireframe Visual 1', 'Wireframe Visual 2'],
  variant = 'light',
  backgroundColor,
}) => {
  const getResolvedBgColor = () => {
    if (backgroundColor) return backgroundColor;
    switch (variant) {
      case 'dark':
        return getRoleColor('surface.secondary');
      case 'hero':
        return getRoleColor('surface.hero');
      case 'light':
      default:
        return getRoleColor('surface.default');
    }
  };

  const getTextColor = () => {
    if (variant === 'dark' || variant === 'hero') {
      return getRoleColor('text.inverse');
    }
    return getRoleColor('text.primary');
  };

  const getSecondaryColor = () => {
    if (variant === 'dark' || variant === 'hero') {
      return getRoleColor('text.onAccent');
    }
    return getRoleColor('text.secondary');
  };

  const variantClass = styles[`wireframe-slide--${variant}`] ?? '';

  return (
    <Box
      component="section"
      className={`${styles['wireframe-slide']} ${variantClass}`}
      sx={{
        backgroundColor: getResolvedBgColor(),
        color: getTextColor(),
      }}
    >
      <Container maxWidth="lg">
        <Box className={styles['wireframe-slide__content']}>
          <Typography
            variant="h2"
            component="h2"
            className={styles['wireframe-slide__title']}
            sx={{ fontWeight: 'bold' }}
          >
            {title}
          </Typography>
          
          <Typography
            variant="h5"
            component="p"
            className={styles['wireframe-slide__description']}
            sx={{ color: getSecondaryColor() }}
          >
            {description}
          </Typography>

          <Box className={styles['wireframe-slide__visual-container']}>
            {placeholders.map((text, index) => (
              <Box 
                key={index} 
                className={styles['wireframe-slide__placeholder']}
              >
                <Typography variant="body2">{text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
