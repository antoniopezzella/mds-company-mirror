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
        return getRoleColor('bg.secondary');
      case 'hero':
        return getRoleColor('bg.primary');
      case 'light':
      default:
        return getRoleColor('bg.default');
    }
  };

  // Only `hero` is actually a dark surface. `dark` resolves to
  // surface.secondary, which is MDS sky blue (#ceecff) — a LIGHT colour, in
  // spite of the variant's name. Both variants were being given inverse/white
  // text, so the `dark` variant rendered white on sky blue at 1.23:1 and
  // near-white (text.onAccent) at 1.17:1: effectively invisible.
  //
  // Text colour now follows the surface rather than the variant's name.
  const isDarkSurface = variant === 'hero';

  const getTextColor = () =>
    isDarkSurface ? getRoleColor('fg.on-dark') : getRoleColor('fg.primary');

  const getSecondaryColor = () =>
    isDarkSurface ? getRoleColor('fg.on-accent') : getRoleColor('fg.neutral.subtle');

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
