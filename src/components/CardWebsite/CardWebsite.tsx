import React, { useCallback, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import gsap from 'gsap';
import { getRoleColor } from '../../theme/roles';
import { Divider } from '../Divider/Divider';
import DSSkeleton from '../Skeleton/Skeleton';

// ─── Types ───────────────────────────────────────────────────────────────────

export type CardSurface = 'white' | 'neutral' | 'sky' | 'primary';
export type CardLayout  = 'vertical' | 'featured' | 'horizontal' | 'image-bg' | 'text-only';
export type CardAR      = '16:9' | '4:3' | '1:1';
type Mode = 'light' | 'dark';

const ASPECT_CSS: Record<CardAR, string> = {
  '16:9': '16 / 9',
  '4:3':  '4 / 3',
  '1:1':  '1 / 1',
};

// ─── Surface helpers ─────────────────────────────────────────────────────────

const surfaceBg = (s: CardSurface, m: Mode): string => {
  switch (s) {
    case 'sky':     return getRoleColor('surface.secondary',  { mode: m }); // #ceecff
    case 'neutral': return getRoleColor('surface.accent',     { mode: m }); // #f7f8f8
    case 'primary': return 'rgba(255,255,255,0.06)';                        // glass on navy
    default:        return getRoleColor('surface.default',    { mode: m }); // #fff
  }
};

const surfaceText = (s: CardSurface, m: Mode): string =>
  s === 'primary'
    ? getRoleColor('text.onHero',  { mode: m })
    : getRoleColor('text.primary', { mode: m });

// Active title colour per Figma: #0b4bff on light surfaces, #95caff on primary
const surfaceActiveTitle = (s: CardSurface): string =>
  s === 'primary' ? '#95caff' : '#0b4bff';

// Hover wash: the background colour that fills card + state-layer on hover
const hoverWash = (s: CardSurface, m: Mode): string => {
  if (s === 'primary') return 'rgba(255,255,255,0.10)';
  if (s === 'sky')     return getRoleColor('surface.secondary.hover', { mode: m }); // #ebf7ff
  return getRoleColor('surface.secondary', { mode: m }); // #ceecff for white + neutral
};

// ─── Props ───────────────────────────────────────────────────────────────────

export interface CardWebsiteProps {
  /** Wraps title in a stretched <a> covering the whole card */
  href?: string;
  /** Surface colour — white | neutral (warm gray) | sky (sky blue) | primary (glass on navy) */
  surface?: CardSurface;
  skeleton?: boolean;
  /** Visual layout variant */
  layout?: CardLayout;
  /** Image aspect ratio (vertical / featured layouts only) */
  aspectRatio?: CardAR;

  title?: string;
  description?: string;
  category?: string;
  categoryIcon?: React.ReactNode;
  timestamp?: string;
  /** Machine-readable datetime for <time> element */
  datetime?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Optional 48×48 brand icon rendered below header */
  icon?: React.ReactNode;
  /** Tag chips rendered below description */
  badges?: string[];

  hasImage?:       boolean;
  hasHeader?:      boolean;
  hasIcon?:        boolean;
  hasTitle?:       boolean;
  hasDescription?: boolean;
  hasCtaButton?:   boolean;

  // Force visual states — for test page static showcase
  forceHover?:  boolean;
  forceActive?: boolean;
  forceFocus?:  boolean;

  // GSAP entrance fade-up
  animate?:       boolean;
  animationDelay?: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

const CardWebsite: React.FC<CardWebsiteProps> = ({
  href,
  surface = 'white',
  skeleton = false,
  layout = 'vertical',
  aspectRatio = '4:3',
  title,
  description,
  category,
  categoryIcon,
  timestamp,
  datetime,
  imageSrc,
  imageAlt = '',
  icon,
  badges,
  hasImage       = Boolean(imageSrc),
  hasHeader      = Boolean(category || timestamp),
  hasIcon        = Boolean(icon),
  hasTitle       = Boolean(title),
  hasDescription = Boolean(description),
  hasCtaButton   = true,
  forceHover  = false,
  forceActive = false,
  forceFocus  = false,
  animate       = false,
  animationDelay = 0,
}) => {
  const theme = useTheme();
  const mode  = theme.palette.mode as Mode;

  const bg         = surfaceBg(surface, mode);
  const textColor  = surfaceText(surface, mode);
  const activeText = surfaceActiveTitle(surface);
  const wash       = hoverWash(surface, mode);
  const focusColor = getRoleColor('focus.ring', { mode });
  const arCSS      = ASPECT_CSS[aspectRatio];

  const cardRef       = useRef<HTMLElement>(null);
  const quickScaleRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  // GSAP entrance fade-up
  useEffect(() => {
    if (!animate || !cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current!,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, delay: animationDelay, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    });
    return () => ctx.revert();
  }, [animate, animationDelay]);

  // GSAP quickTo — callback ref so it always points to the current img element
  const imgCallbackRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      quickScaleRef.current = gsap.quickTo(node, 'scale', { duration: 0.3, ease: 'power2.out' });
    } else {
      quickScaleRef.current = null;
    }
  }, []);

  // Drive image scale when force props change
  useEffect(() => {
    quickScaleRef.current?.(forceHover || forceActive ? 1.04 : 1);
  }, [forceHover, forceActive]);

  const handleMouseEnter = useCallback(() => { quickScaleRef.current?.(1.04); }, []);
  const handleMouseLeave = useCallback(() => { quickScaleRef.current?.(1); },    []);

  const focusRingSx = {
    content: '""',
    position: 'absolute',
    inset: '-8px',
    borderRadius: '6px',
    border: `2px solid ${focusColor}`,
    pointerEvents: 'none',
    zIndex: 3,
  } as const;

  // ── image-bg layout ────────────────────────────────────────────────────────
  if (layout === 'image-bg') {
    if (skeleton) {
      return (
        <Box
          ref={cardRef}
          component="article"
          data-card
          data-layout="image-bg"
          sx={{ position: 'relative', width: '100%', aspectRatio: arCSS, borderRadius: '2px', overflow: 'hidden' }}
        >
          <DSSkeleton variant="rectangular" width="100%" sx={{ position: 'absolute', inset: 0, aspectRatio: arCSS, transform: 'none' }} />
        </Box>
      );
    }
    return (
      <Box
        ref={cardRef}
        component="article"
        data-card
        data-surface={surface}
        data-layout="image-bg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: arCSS,
          overflow: 'hidden',
          borderRadius: '2px',
          cursor: href ? 'pointer' : 'default',
          '&:has(:focus-visible)::after': focusRingSx,
          ...(forceFocus && { '&::after': focusRingSx }),
        }}
      >
        <Box
          ref={imgCallbackRef}
          component="img"
          src={imageSrc ?? ''}
          alt={imageAlt}
          sx={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            transformOrigin: 'center',
          }}
        />
        {/* Gradient overlay */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,15,71,0.85) 0%, rgba(0,15,71,0.45) 50%, transparent 100%)', pointerEvents: 'none' }} />
        {/* Content */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3, zIndex: 1 }}>
          {hasHeader && (category || timestamp) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              {category && (
                <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 14, lineHeight: '20px', color: 'rgba(206,236,255,0.85)' }}>
                  {category}
                </Typography>
              )}
              {category && timestamp && (
                <Box sx={{ width: 1, height: 12, bgcolor: 'rgba(206,236,255,0.4)', flexShrink: 0 }} />
              )}
              {timestamp && (
                <Typography component="time" dateTime={datetime ?? timestamp} sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 14, lineHeight: '20px', color: 'rgba(206,236,255,0.85)', flexShrink: 0 }}>
                  {timestamp}
                </Typography>
              )}
            </Box>
          )}
          {hasTitle && title && (
            <Typography component="h3" className="card-title" sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 22, fontWeight: 500, lineHeight: '28px', color: '#fff', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
              {href ? (
                <Box
                  component="a"
                  href={href}
                  sx={{ color: 'inherit', textDecoration: 'none', '&::after': { content: '""', position: 'absolute', inset: 0, zIndex: 2 }, '&:focus-visible': { outline: 'none' } }}
                >
                  {title}
                </Box>
              ) : title}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  // ── All other layouts ──────────────────────────────────────────────────────

  const isHorizontal = layout === 'horizontal';
  const isFeatured   = layout === 'featured';
  const isTextOnly   = layout === 'text-only';
  const showImage    = isTextOnly ? false : hasImage;

  return (
    <Box
      ref={cardRef}
      component="article"
      data-card
      data-surface={surface}
      data-layout={layout}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        minWidth: isHorizontal ? 480 : 282,
        width: '100%',
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        bgcolor: (forceHover || forceActive) ? wash : bg,
        color: textColor,
        ...(surface === 'primary' && { outline: '1px solid rgba(206,236,255,0.15)' }),

        '&:hover': { bgcolor: wash, '& .state-layer': { opacity: 1 }, '& .card-cta': { opacity: 1 } },
        '&:active .card-title': { color: `${activeText} !important` },

        '&:has(:focus-visible)::after': focusRingSx,
        ...(forceFocus && { '&::after': focusRingSx }),

        '@media (prefers-reduced-motion: reduce)': {
          '& .state-layer': { transition: 'none' },
          '& .card-cta':    { transition: 'none' },
        },
      }}
    >
      {/* State Layer — Figma pattern: absolute div with inset -12px, opacity transition */}
      {!skeleton && (
        <Box
          className="state-layer"
          aria-hidden
          sx={{
            position: 'absolute',
            inset: '-12px',
            borderRadius: '2px',
            backgroundColor: wash,
            opacity: (forceHover || forceActive) ? 1 : 0,
            transition: 'opacity 0.15s ease',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Inner content — zIndex: 1 to sit above state layer */}
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: isHorizontal ? 'row' : 'column', width: '100%' }}>

        {/* ── Image ──────────────────────────────────────────────────────────── */}
        {skeleton ? (
          showImage && (
            <DSSkeleton
              variant="rectangular"
              width={isHorizontal ? '40%' : '100%'}
              sx={{ aspectRatio: isHorizontal ? '4 / 3' : arCSS, transform: 'none', flexShrink: 0 }}
            />
          )
        ) : (
          showImage && imageSrc && (
            <Box
              component="figure"
              sx={{
                m: 0,
                width: isHorizontal ? '40%' : '100%',
                aspectRatio: isHorizontal ? '4 / 3' : arCSS,
                overflow: 'hidden',
                flexShrink: 0,
                bgcolor: getRoleColor('surface.subtle', { mode }),
              }}
            >
              <Box
                ref={imgCallbackRef}
                component="img"
                src={imageSrc}
                alt={imageAlt}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transformOrigin: 'center' }}
              />
            </Box>
          )
        )}

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <Box sx={{ pt: 3, pb: isTextOnly ? 3 : 6, px: isHorizontal ? 3 : 0, flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>

          {/* Header: category · divider · date */}
          {skeleton ? (
            <DSSkeleton variant="rectangular" width="60%" height={20} sx={{ transform: 'none', borderRadius: '2px' }} />
          ) : (
            hasHeader && (category || timestamp) && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, overflow: 'hidden' }}>
                {category && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
                    {categoryIcon && (
                      <Box sx={{ display: 'flex', alignItems: 'center', width: 20, height: 20, color: textColor, flexShrink: 0 }}>
                        {categoryIcon}
                      </Box>
                    )}
                    <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 'var(--typography/size/sm, 14px)', lineHeight: '20px', color: textColor, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {category}
                    </Typography>
                  </Box>
                )}
                {category && timestamp && (
                  <Divider orientation="vertical" flexItem sx={{ height: 12, alignSelf: 'center', borderColor: textColor, opacity: 0.5 }} />
                )}
                {timestamp && (
                  <Typography component="time" dateTime={datetime ?? timestamp} sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 'var(--typography/size/sm, 14px)', lineHeight: '20px', color: textColor, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {timestamp}
                  </Typography>
                )}
              </Box>
            )
          )}

          {/* Optional brand icon */}
          {!skeleton && hasIcon && icon && (
            <Box sx={{ display: 'flex', alignItems: 'center', width: 48, height: 48, color: textColor }}>
              {icon}
            </Box>
          )}

          {/* Title + Description */}
          <Box sx={{ pr: isTextOnly ? 4 : 7, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {skeleton ? (
              <>
                <DSSkeleton variant="rectangular" width="90%" height={28} sx={{ transform: 'none', borderRadius: '2px' }} />
                <DSSkeleton variant="rectangular" width="75%" height={28} sx={{ transform: 'none', borderRadius: '2px' }} />
              </>
            ) : (
              hasTitle && title && (
                <Typography
                  component="h3"
                  className="card-title"
                  sx={{
                    fontFamily: isFeatured
                      ? 'var(--typo-display-font-family, "MMC Display", serif)'
                      : 'var(--typo-body1-font-family)',
                    fontSize:   isFeatured ? 28 : 22,
                    fontWeight: isFeatured ? 400 : 500,
                    lineHeight: isFeatured ? '36px' : '28px',
                    color: forceActive ? activeText : textColor,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: isFeatured ? 4 : 3,
                    WebkitBoxOrient: 'vertical',
                    transition: 'color 0.1s ease',
                  }}
                >
                  {href && !skeleton ? (
                    <Box
                      component="a"
                      href={href}
                      sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        '&::after': { content: '""', position: 'absolute', inset: 0, zIndex: 1 },
                        '&:focus-visible': { outline: 'none' },
                      }}
                    >
                      {title}
                    </Box>
                  ) : title}
                </Typography>
              )
            )}

            {skeleton ? (
              <>
                <DSSkeleton variant="rectangular" width="100%" height={20} sx={{ transform: 'none', borderRadius: '2px' }} />
                <DSSkeleton variant="rectangular" width="80%"  height={20} sx={{ transform: 'none', borderRadius: '2px' }} />
                <DSSkeleton variant="rectangular" width="60%"  height={20} sx={{ transform: 'none', borderRadius: '2px' }} />
              </>
            ) : (
              hasDescription && description && (
                <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 'var(--typo-body1-font-size)', lineHeight: '24px', color: textColor, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                  {description}
                </Typography>
              )
            )}
          </Box>

          {/* Badges */}
          {!skeleton && badges && badges.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {badges.map((badge) => (
                <Box
                  key={badge}
                  component="span"
                  sx={{
                    display: 'inline-flex', alignItems: 'center',
                    height: 24, px: 2,
                    fontFamily: 'var(--typo-body1-font-family)',
                    fontSize: 14, lineHeight: '20px',
                    border: `1px solid ${getRoleColor('border.default', { mode })}`,
                    borderRadius: '8px',
                    color: textColor,
                    ...(surface === 'primary' && { borderColor: 'rgba(206,236,255,0.3)' }),
                  }}
                >
                  {badge}
                </Box>
              ))}
            </Box>
          )}

          {/* Text-only: inline always-visible arrow */}
          {isTextOnly && !skeleton && (
            <Box sx={{ mt: 'auto', pt: 2 }}>
              <ArrowForwardIcon sx={{ fontSize: 20, color: textColor }} aria-hidden />
            </Box>
          )}

        </Box>
      </Box>

      {/* CTA arrow — hidden until hover (non text-only layouts) */}
      {!skeleton && hasCtaButton && !isTextOnly && (
        <IconButton
          className="card-cta"
          aria-hidden
          tabIndex={-1}
          size="small"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 2,
            width: 32,
            height: 32,
            borderRadius: '2px',
            color: textColor,
            opacity: (forceHover || forceActive) ? 1 : 0,
            transition: 'opacity 0.15s ease',
            p: '6px',
            pointerEvents: 'none',
          }}
        >
          <ArrowForwardIcon sx={{ fontSize: 20 }} />
        </IconButton>
      )}
    </Box>
  );
};

export default CardWebsite;
