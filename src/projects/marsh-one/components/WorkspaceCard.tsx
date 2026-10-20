import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { ArrowForwardRounded } from '@mui/icons-material';
import { getRoleColor } from '../../../theme/roles';

export interface WorkspaceCardProps {
  /** Primary card headline */
  title: string;
  /** Supporting copy shown beneath the headline */
  description?: string;
  /** Optional category label shown in the image hero */
  category?: string;
  /** Background image for the card */
  imageSrc: string;
  /** Alt text for the background image */
  imageAlt?: string;
  /** Primary CTA label */
  ctaLabel?: string;
  /** Primary CTA URL */
  ctaHref?: string;
  /** Optional badge labels shown below the description */
  badges?: string[];
  /** Optional footer text shown beneath the badges */
  footerNote?: string;
  /** Optional click handler for the CTA button */
  onCtaClick?: () => void;
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  title,
  description,
  category,
  imageSrc,
  imageAlt = '',
  ctaLabel = 'Explore workspace',
  ctaHref,
  badges = [],
  footerNote,
  onCtaClick,
}) => {
  const hasBadges = badges.length > 0;
  const hasCta = Boolean(ctaHref || onCtaClick);

  return (
    <Box
      component="article"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        minWidth: 0,
        backgroundColor: getRoleColor('bg.default'),
        border: `1px solid ${getRoleColor('border.default')}`,
        boxShadow: '0 24px 64px rgba(0, 15, 71, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 32px 88px rgba(0, 15, 71, 0.14)',
        },
      }}
    >
      <Box
        // A CSS-background image with no alt text is decorative, and a
        // role="img" with an empty name is worse than no role at all — axe
        // flags it (role-img-alt) and a screen reader announces an unnamed
        // image. Only claim the img role when there is something to announce.
        {...(imageAlt ? { role: 'img' as const, 'aria-label': imageAlt } : {})}
        sx={{
          position: 'relative',
          minHeight: { xs: 240, md: 320 },
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, transparent 0%, ${alpha(getRoleColor('bg.primary'), 0.88)} 65%)`,
          }}
        />

        {category && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              px: 1.5,
              py: 0.75,
              borderRadius: 1,
              backgroundColor: alpha(getRoleColor('bg.default'), 0.92),
              color: getRoleColor('fg.primary'),
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.01em',
            }}
          >
            {category}
          </Box>
        )}

        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            p: (theme) => theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            component="h3"
            sx={{
              color: getRoleColor('fg.on-primary'),
              fontFamily: "'Marsh Serif', sans-serif",
              fontWeight: 400,
              fontSize: { xs: '28px', md: '36px' },
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              mb: 0,
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          p: (theme) => theme.spacing(4),
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {description && (
          <Typography
            sx={{
              color: getRoleColor('fg.neutral.subtle'),
              fontSize: 15,
              lineHeight: 1.75,
            }}
          >
            {description}
          </Typography>
        )}

        {hasBadges && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {badges.map((badge) => (
              <Box
                key={badge}
                component="span"
                sx={{
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1,
                  backgroundColor: getRoleColor('bg.neutral.subtle'),
                  color: getRoleColor('fg.primary'),
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {badge}
              </Box>
            ))}
          </Box>
        )}

        {footerNote && (
          <Typography sx={{ color: getRoleColor('fg.neutral.subtle'), fontSize: 12, lineHeight: 1.5 }}>
            {footerNote}
          </Typography>
        )}

        {hasCta && (
          <Button
            component={ctaHref ? 'a' : 'button'}
            href={ctaHref}
            onClick={onCtaClick}
            endIcon={<ArrowForwardRounded />}
            variant="contained"
            sx={{
              alignSelf: 'flex-start',
              backgroundColor: getRoleColor('interactive.primary'),
              // text.onPrimary pairs with interactive.primary; onAccent is a
              // fixed near-white and this fill lightens in dark (1.73:1).
              color: getRoleColor('text.onPrimary'),
              textTransform: 'none',
              px: 3,
              py: 1.5,
              fontWeight: 700,
              '&:hover': {
                backgroundColor: getRoleColor('interactive.primary.hover'),
              },
            }}
          >
            {ctaLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default WorkspaceCard;
