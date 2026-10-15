import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HeroBanner from '../../../components/sections/HeroBanner/HeroBanner';
import { getRoleColor } from '../../../theme/roles';

export interface BrandFilmSectionProps {
  /** First clause, regular weight — e.g. "A world in motion." */
  title: string;
  /** Second clause, rendered italic — e.g. "A different way to see it." */
  titleEmphasis?: string;
  description?: string;
  /** Full-bleed background still. Required — the only asset this ships with
   * until real footage exists (see videoSrc/vimeoId below). */
  imageSrc: string;
  imageAlt?: string;
  /** Real video — once supplied, HeroBanner's own real play/pause control
   * takes over from the decorative placeholder icon. */
  videoSrc?: string;
  vimeoId?: string;
  videoPoster?: string;
  /** e.g. "0:29" */
  videoDurationLabel?: string;
  /** e.g. "Marsh brand film · Excerpt" */
  sourceLabel?: string;
  showSilentFilmBadge?: boolean;
  /** Forwarded to HeroBanner. */
  height?: string;
  disableAnimations?: boolean;
  /** Mirrors HeroBanner's own IntroLoader-gated entrance, if wired into a page that uses one. */
  play?: boolean;
}

/**
 * Brand Film Section — a cinematic, full-bleed video/media section for the
 * new brand-website component library (first entry — see
 * docs reference: 1derlab.com "component-12-4"). Built on HeroBanner's
 * `layout="background"` treatment rather than reimplementing video
 * playback, Vimeo fallback handling, or scroll parallax — see
 * HeroBanner.tsx's `showPlayButton`/`autoPlayVideo`/`mediaControlsSlot`/
 * `titleEmphasis` props, added specifically to support this component.
 */
export const BrandFilmSection: React.FC<BrandFilmSectionProps> = ({
  title,
  titleEmphasis,
  description,
  imageSrc,
  imageAlt = 'Brand film still',
  videoSrc,
  vimeoId,
  videoPoster,
  videoDurationLabel,
  sourceLabel,
  showSilentFilmBadge = true,
  height = '100vh',
  disableAnimations = false,
  play = true,
}) => {
  const hasRealVideo = Boolean(videoSrc || vimeoId);

  return (
    <HeroBanner
      layout="background"
      variant="dark"
      title={title}
      titleEmphasis={titleEmphasis}
      description={description}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      videoSrc={videoSrc}
      vimeoId={vimeoId}
      videoPoster={videoPoster}
      height={height}
      disableAnimations={disableAnimations}
      play={play}
      showPlayButton={hasRealVideo}
      autoPlayVideo={false}
      mediaControlsSlot={
        <FilmMetaRow
          showDecorativePlayIcon={!hasRealVideo}
          durationLabel={videoDurationLabel}
          sourceLabel={sourceLabel}
          showSilentFilmBadge={showSilentFilmBadge}
        />
      }
    />
  );
};

interface FilmMetaRowProps {
  showDecorativePlayIcon: boolean;
  durationLabel?: string;
  sourceLabel?: string;
  showSilentFilmBadge: boolean;
}

// Inlined rather than split into its own file — matches this folder's
// convention of inlining single-use presentational pieces (e.g.
// InsightFeatureSection's tile grid, PromoBanner's CTA row).
const FilmMetaRow: React.FC<FilmMetaRowProps> = ({
  showDecorativePlayIcon,
  durationLabel,
  sourceLabel,
  showSilentFilmBadge,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
    {showDecorativePlayIcon && (
      // Non-interactive placeholder — HeroBanner renders its own real,
      // keyboard-operable play button (via showPlayButton) once real
      // footage exists; this exact aria-hidden/pointerEvents:none/
      // tabIndex:-1 shape mirrors PromoBanner.tsx's own hasPlayButton block.
      <IconButton
        aria-hidden
        tabIndex={-1}
        sx={{
          width: 40,
          height: 40,
          backgroundColor: getRoleColor('surface.disabled'),
          color: getRoleColor('text.inverse'),
          pointerEvents: 'none',
          '&:hover': { backgroundColor: getRoleColor('surface.disabled') },
        }}
      >
        <PlayArrowIcon fontSize="small" />
      </IconButton>
    )}

    {(durationLabel || sourceLabel) && (
      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        {durationLabel && (
          <Typography
            sx={{
              fontFamily: 'var(--typo-body1-font-family)',
              fontSize: 12,
              fontWeight: 600,
              color: getRoleColor('text.inverse'),
            }}
          >
            {durationLabel}
          </Typography>
        )}
        {sourceLabel && (
          <Typography
            sx={{
              fontFamily: 'var(--typo-body1-font-family)',
              fontSize: 12,
              color: getRoleColor('text.onHero'),
              opacity: 0.85,
            }}
          >
            {sourceLabel}
          </Typography>
        )}
      </Box>
    )}

    {showSilentFilmBadge && (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
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
            fontSize: 12,
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          Silent film
        </Typography>
      </Box>
    )}
  </Box>
);

export default BrandFilmSection;
