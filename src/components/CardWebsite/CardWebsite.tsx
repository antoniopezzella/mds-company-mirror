import React, { useEffect, useRef } from 'react';
import {
  ArrowRight,
  Tv,
  Podcast,
  Video,
  Megaphone,
  Calendar,
  FileText,
  Package,
  BookOpen,
  BarChart3,
  Newspaper,
  GraduationCap,
  Award,
  Bookmark,
  Medal,
} from 'lucide-react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/gsap/useReducedMotion';
import { getRoleColor } from '../../theme/roles';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { CardContent, CardFooter } from '../ui/card';
import { cn } from '../../lib/utils';
import styles from './CardWebsite.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export type CardSurface = 'white' | 'neutral' | 'sky' | 'primary';
export type CardLayout  = 'vertical' | 'featured' | 'horizontal' | 'image-bg' | 'text-only';
export type CardAR      = '16:9' | '4:3' | '1:1';
export type CardForceState = 'hover' | 'active' | 'focus';

// Content-type taxonomy — per Figma's "Content Type icon" legend (file "Phase
// 1.5 Delivery", node 2937:7755). When `category` matches one of these
// strings exactly, its icon renders automatically (see CONTENT_TYPE_ICON_MAP
// below) unless an explicit `categoryIcon` override is passed. Arbitrary
// category text (e.g. "Insurance", a practice-area label rather than a
// content type) simply renders with no icon, same as before this lookup
// existed — fully backward compatible.
export type CardContentType =
  | 'Video'
  | 'Podcast'
  | 'Webcast'
  | 'Press Release'
  | 'Event'
  | 'Article'
  | 'Product'
  | 'Case Study'
  | 'Report'
  | 'Newsletter'
  | 'Training Programs'
  | 'Featured insight'
  | 'Featured topic'
  | 'Expertise';

const CONTENT_TYPE_ICON_MAP: Record<CardContentType, React.ReactNode> = {
  'Video':             <Tv size={20} />,
  'Podcast':           <Podcast size={20} />,
  'Webcast':           <Video size={20} />,
  'Press Release':     <Megaphone size={20} />,
  'Event':             <Calendar size={20} />,
  'Article':           <FileText size={20} />,
  'Product':           <Package size={20} />,
  'Case Study':        <BookOpen size={20} />,
  'Report':            <BarChart3 size={20} />,
  'Newsletter':        <Newspaper size={20} />,
  'Training Programs': <GraduationCap size={20} />,
  'Featured insight':  <Award size={20} />,
  'Featured topic':    <Bookmark size={20} />,
  'Expertise':         <Medal size={20} />,
};

const isContentType = (c: string | undefined): c is CardContentType =>
  Boolean(c && c in CONTENT_TYPE_ICON_MAP);

// Turned off for now — flip back to true to re-enable the auto-lookup
// everywhere at once without removing the map/feature itself. An explicit
// categoryIcon prop still always works regardless of this flag.
const CONTENT_TYPE_ICONS_ENABLED = false;

const ASPECT_CSS: Record<CardAR, string> = {
  '16:9': '16 / 9',
  '4:3':  '4 / 3',
  '1:1':  '1 / 1',
};

// ─── Surface helpers ─────────────────────────────────────────────────────────
// NOTE: light-mode only, matching every other shadcn-migrated component in
// this codebase (card.tsx, carousel.tsx, badge.tsx) — none read theme mode
// today. Dark-mode support can be revisited codebase-wide when the migration
// gets there, rather than this component alone re-introducing an MUI
// ThemeProvider dependency just to read palette.mode.

const surfaceText = (s: CardSurface): string =>
  s === 'primary' ? getRoleColor('text.onHero') : getRoleColor('text.primary');

// Active title colour per Figma: #0b4bff on light surfaces, #95caff on primary
const surfaceActiveTitle = (s: CardSurface): string =>
  s === 'primary' ? '#95caff' : '#0b4bff';

// Hover wash: the background colour that fills card + state-layer on hover
const hoverWash = (s: CardSurface): string => {
  if (s === 'primary') return getRoleColor('interactive.secondary'); // #0b4bff — Active Blue, per Figma hover-state spec
  if (s === 'sky')     return getRoleColor('surface.secondary.hover'); // #ebf7ff
  return getRoleColor('surface.secondary'); // #ceecff for white + neutral
};

// Hover state-layer border — primary (navy) and neutral (light/gold-250
// section) cards both use the bordered "state layer" treatment: a pseudo-
// element behind the card's content reveals a solid fill where the content
// zone has no opaque background of its own (the image itself stays covered).
// White/sky keep the simpler box-shadow halo instead — same behavior as
// before this consistency pass.
const hoverBorder = (s: CardSurface): string | null => {
  if (s === 'primary') return getRoleColor('interactive.secondary'); // #0b4bff — Active Blue
  if (s === 'neutral') return getRoleColor('surface.secondary');    // #ceecff — same hue as neutral's own wash, mirrors primary's identical fill/border pairing
  return null;
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
  /** Category label. When it exactly matches a known CardContentType (e.g. "Article", "Report"), its icon renders automatically unless categoryIcon overrides it. */
  category?: string;
  /** Explicit icon override — takes precedence over the category-based auto-lookup */
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

  /** Force a visual state statically — for test-page/Storybook showcases */
  forceState?: CardForceState;

  // GSAP entrance fade-up
  animate?:        boolean;
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
  forceState,
  animate        = false,
  animationDelay = 0,
}) => {
  const textColor  = surfaceText(surface);
  const activeText = surfaceActiveTitle(surface);
  const wash       = hoverWash(surface);
  const washBorder = hoverBorder(surface);
  const focusColor = getRoleColor('focus.ring');
  const arCSS      = ASPECT_CSS[aspectRatio];

  // Auto-resolved from `category` when it matches a known content type (see
  // CONTENT_TYPE_ICON_MAP above) — an explicit `categoryIcon` always wins.
  const resolvedCategoryIcon =
    categoryIcon ?? (CONTENT_TYPE_ICONS_ENABLED && isContentType(category) ? CONTENT_TYPE_ICON_MAP[category] : undefined);

  const cardRef = useRef<HTMLElement>(null);

  // GSAP entrance fade-up.
  //
  // Skipped entirely when the user has asked for reduced motion. Every hook in
  // src/hooks/gsap/ already honours that preference; this was a raw gsap call
  // in a useEffect and bypassed it, so a card faded and slid in regardless
  // (WCAG 2.3.3).
  //
  // It also made the card unreadable for the duration: the entrance starts at
  // opacity 0, and anything sampling the page mid-flight sees the text blended
  // most of the way into the background. That is what axe was reporting as
  // dozens of colour-contrast failures across CarouselSection and
  // WireframeSlide — elements declaring the correct `color: #000f47` but
  // measuring as ~#e2e3ea at 1.2:1. The colours were never wrong; the text was
  // simply still fading in.
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!animate || reducedMotion || !cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current!,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, delay: animationDelay, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    });
    return () => ctx.revert();
  }, [animate, animationDelay, reducedMotion]);

  // Bridges getRoleColor() values into CardWebsite.module.scss — keeps color
  // authority with the token system while letting both real :hover/:active
  // pseudo-classes and the data-force-state attribute (static showcases)
  // drive the same CSS rules with no inline-style-vs-stylesheet specificity
  // fight (see module comment header).
  const cssVars = {
    '--card-text-color': textColor,
    '--card-active-text': activeText,
    '--card-wash': wash,
    '--card-wash-border': washBorder ?? 'transparent',
    '--card-focus-color': focusColor,
  } as React.CSSProperties;

  // ── image-bg layout ────────────────────────────────────────────────────────
  if (layout === 'image-bg') {
    if (skeleton) {
      return (
        <article
          ref={cardRef as React.RefObject<HTMLElement>}
          data-card
          data-layout="image-bg"
          className="relative w-full overflow-hidden rounded-sm"
          style={{ aspectRatio: arCSS }}
        >
          <Skeleton variant="rectangular" width="100%" height="100%" className="absolute inset-0" />
        </article>
      );
    }
    return (
      <article
        ref={cardRef as React.RefObject<HTMLElement>}
        data-card
        data-surface={surface}
        data-layout="image-bg"
        data-force-state={forceState}
        className={cn('relative w-full overflow-hidden rounded-sm', styles.imageBgRoot, href ? 'cursor-pointer' : 'cursor-default')}
        style={{ aspectRatio: arCSS, ...cssVars }}
      >
        {/* draggable={false}: <img> is draggable by browser default. Cards
            in this component are used inside Embla carousels (see
            CarouselSection) — without this, a real click-and-drag starting
            on the photo triggers the browser's native image-drag-and-drop
            (ghost preview follows the cursor) instead of a normal mousemove
            sequence, hijacking the gesture away from Embla's pointer-based
            panning entirely. Only reproduces with a genuine physical drag;
            synthetic/automated mouse events bypass the browser's native
            drag-detection heuristic and don't trigger it. */}
        <img
          className={cn('absolute inset-0 block h-full w-full object-cover', styles.cardImg)}
          style={{ transformOrigin: 'center' }}
          src={imageSrc ?? ''}
          alt={imageAlt}
          draggable={false}
        />
        {/* Gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,15,71,0.85) 0%, rgba(0,15,71,0.45) 50%, transparent 100%)' }}
        />
        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-[1] p-[16px]">
          {hasHeader && (category || timestamp) && (
            <div className="mb-[8px] flex items-center gap-[8px]">
              {category && (
                <span style={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 14, lineHeight: '20px', color: getRoleColor('text.onHero'), opacity: 0.85 }}>
                  {category}
                </span>
              )}
              {category && timestamp && <span className="h-[12px] w-[1px] shrink-0" style={{ backgroundColor: 'rgba(206,236,255,0.4)' }} />}
              {timestamp && (
                <time
                  dateTime={datetime ?? timestamp}
                  className="shrink-0"
                  style={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 14, lineHeight: '20px', color: getRoleColor('text.onHero'), opacity: 0.85 }}
                >
                  {timestamp}
                </time>
              )}
            </div>
          )}
          {hasTitle && title && (
            <h3
              className="line-clamp-3 overflow-hidden"
              style={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 22, fontWeight: 500, lineHeight: '28px', color: '#fff' }}
            >
              {href ? (
                <a href={href} className="relative text-inherit no-underline outline-hidden after:absolute after:inset-0 after:z-[2] after:content-['']">
                  {title}
                </a>
              ) : (
                title
              )}
            </h3>
          )}
        </div>
      </article>
    );
  }

  // ── All other layouts ──────────────────────────────────────────────────────

  const isHorizontal = layout === 'horizontal';
  const isFeatured   = layout === 'featured';
  const isTextOnly   = layout === 'text-only';
  const showImage    = isTextOnly ? false : hasImage;
  const useStateLayer = washBorder !== null;

  return (
    <article
      ref={cardRef as React.RefObject<HTMLElement>}
      data-card
      data-surface={surface}
      data-layout={layout}
      data-force-state={forceState}
      className={cn(
        styles.root,
        useStateLayer ? styles.stateLayer : styles.halo,
        !isHorizontal && styles.subgrid,
        isHorizontal ? 'flex flex-row' : 'grid',
        'relative w-full rounded-sm'
      )}
      style={{ minWidth: isHorizontal ? 480 : 282, ...cssVars }}
    >
      {/* Inner content — passes the subgrid row tracks through to the
          image/content children below. */}
      <div className={cn('relative z-[1] w-full', isHorizontal ? 'flex flex-row' : cn('grid', styles.subgrid))}>
        {/* ── Image ──────────────────────────────────────────────────────── */}
        {skeleton
          ? showImage && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="auto"
                className={cn('shrink-0', isHorizontal ? 'w-[40%]' : 'w-full')}
                style={{ aspectRatio: isHorizontal ? '4 / 3' : arCSS }}
              />
            )
          : showImage &&
            imageSrc && (
              <figure className="w-full shrink-0 overflow-hidden" style={{ aspectRatio: '1 / 1', backgroundColor: getRoleColor('surface.subtle') }}>
                {/* draggable={false} — see the image-bg layout's <img> above
                    for why (native image drag hijacks Embla carousel panning). */}
                <img
                  className={cn('block h-full w-full object-cover', styles.cardImg)}
                  style={{ transformOrigin: 'center' }}
                  src={imageSrc}
                  alt={imageAlt}
                  draggable={false}
                />
              </figure>
            )}

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <CardContent
          className={cn(
            'flex flex-1 flex-col gap-[8px] p-0',
            isTextOnly ? 'pb-[16px]' : 'pb-[32px]',
            isHorizontal ? 'px-[16px]' : 'px-0',
            // Space between the image and the title/content block below it —
            // widens slightly at larger breakpoints to keep the gap feeling
            // proportional as card width grows (desktop/tablet/mobile).
            'pt-[16px] md:pt-[20px] lg:pt-[24px]'
          )}
        >
          {/* Header: category · divider · date */}
          {skeleton ? (
            <Skeleton variant="rectangular" width="60%" height={20} className="rounded-sm" />
          ) : (
            hasHeader &&
            (category || timestamp) && (
              <div className="flex items-center gap-[8px] overflow-hidden">
                {category && (
                  <div className="flex min-w-0 items-center gap-[2px]">
                    {resolvedCategoryIcon && (
                      <span className="flex h-[20px] w-[20px] shrink-0 items-center" style={{ color: textColor }}>
                        {resolvedCategoryIcon}
                      </span>
                    )}
                    <span
                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 14, lineHeight: '20px', color: textColor }}
                    >
                      {category}
                    </span>
                  </div>
                )}
                {category && timestamp && (
                  <Separator orientation="vertical" className="h-[12px] self-center" style={{ backgroundColor: textColor, opacity: 0.5 }} />
                )}
                {timestamp && (
                  <time
                    dateTime={datetime ?? timestamp}
                    className="shrink-0 whitespace-nowrap"
                    style={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 14, lineHeight: '20px', color: textColor }}
                  >
                    {timestamp}
                  </time>
                )}
              </div>
            )
          )}

          {/* Optional brand icon */}
          {!skeleton && hasIcon && icon && (
            <div className="flex h-[48px] w-[48px] items-center" style={{ color: textColor }}>
              {icon}
            </div>
          )}

          {/* Title + Description */}
          <div className={cn('flex flex-col gap-[8px]', isTextOnly ? 'pr-[20px]' : 'pr-[40px]')}>
            {skeleton ? (
              <>
                <Skeleton variant="rectangular" width="90%" height={28} className="rounded-sm" />
                <Skeleton variant="rectangular" width="75%" height={28} className="rounded-sm" />
              </>
            ) : (
              hasTitle &&
              title && (
                <h3
                  className={cn(styles.cardTitle, 'overflow-hidden')}
                  style={{
                    fontFamily: isFeatured ? 'var(--typo-display-font-family, "MMC Display", serif)' : 'var(--typo-body1-font-family)',
                    fontSize: isFeatured ? 28 : 22,
                    fontWeight: isFeatured ? 400 : 500,
                    lineHeight: isFeatured ? '36px' : '28px',
                    display: '-webkit-box',
                    WebkitLineClamp: isFeatured ? 4 : 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {href ? (
                    <a href={href} aria-label={`Read: ${title}`} className="relative text-inherit no-underline outline-hidden after:absolute after:inset-0 after:z-[1] after:content-['']">
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </h3>
              )
            )}

            {skeleton ? (
              <>
                <Skeleton variant="rectangular" width="100%" height={20} className="rounded-sm" />
                <Skeleton variant="rectangular" width="80%" height={20} className="rounded-sm" />
                <Skeleton variant="rectangular" width="60%" height={20} className="rounded-sm" />
              </>
            ) : (
              hasDescription &&
              description && (
                <p
                  className="overflow-hidden"
                  style={{
                    fontFamily: 'var(--typo-body1-font-family)',
                    fontSize: 'var(--typo-body1-font-size)',
                    lineHeight: '24px',
                    color: textColor,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {description}
                </p>
              )
            )}
          </div>

          {/* Badges */}
          {!skeleton && badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-[8px]">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex h-[24px] items-center rounded-[8px] px-[12px]"
                  style={{
                    fontFamily: 'var(--typo-body1-font-family)',
                    fontSize: 14,
                    lineHeight: '20px',
                    color: textColor,
                    border: `1px solid ${
                      // #94918c — per Figma's documented "On Neutral + White" card
                      // variant (file "Phase 1.5 Delivery", node 2534:26598); not yet
                      // a synced DS token (distinct from border.default's #878787) —
                      // same hardcoding precedent as the primary-surface override.
                      surface === 'primary' ? 'rgba(206,236,255,0.3)' : surface === 'neutral' ? '#94918c' : getRoleColor('border.default')
                    }`,
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Text-only: inline always-visible arrow */}
          {isTextOnly && !skeleton && (
            <div className="mt-auto pt-[8px]">
              <ArrowRight size={20} color={textColor} aria-hidden />
            </div>
          )}
        </CardContent>
      </div>

      {/* CTA arrow — hidden until hover (non text-only layouts) */}
      {!skeleton && hasCtaButton && !isTextOnly && (
        <CardFooter aria-hidden tabIndex={-1} className={cn(styles.cta, 'border-t-0 p-0')} style={{ color: textColor }}>
          <ArrowRight size={20} />
        </CardFooter>
      )}
    </article>
  );
};

export default CardWebsite;
