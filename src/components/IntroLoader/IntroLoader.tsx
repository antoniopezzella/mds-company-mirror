import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MARSH_LOGO from '../../assets/images/marsh.svg';
import { getRoleColor } from '../../theme/roles';

gsap.registerPlugin(useGSAP);

export interface IntroLoaderProps {
  /** Message shown under the logo while it loads, e.g. "Welcome to Marsh" */
  message?: string;
  /** Called once the exit transition finishes and the page underneath is fully revealed */
  onComplete?: () => void;
}

/**
 * Full-screen intro loader (Figma node 9412:141757) — the Marsh wordmark
 * wipes in left-to-right behind a clip-path mask, a progress bar fills along
 * the bottom edge, and a message line fades up. On exit, only the background
 * mask-wipes away (clip-path, not a transform) to reveal the page
 * underneath — the logo/message/bar don't physically move, they just fade
 * out. The page renders normally in the DOM the entire time, just hidden
 * behind this until the exit clears it. Locks body scroll while active.
 * Respects prefers-reduced-motion by skipping straight to the reveal.
 */
const IntroLoader: React.FC<IntroLoaderProps> = ({ message = 'Welcome to Marsh', onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLImageElement>(null);
  const barRef      = useRef<HTMLDivElement>(null);
  const messageRef  = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const finish = () => {
      document.body.style.overflow = prevOverflow;
      setDone(true);
      onComplete?.();
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }

    const tl = gsap.timeline({ onComplete: finish });
    tl.set(logoRef.current, { clipPath: 'inset(0 100% 0 0)' })
      .set(messageRef.current, { opacity: 0, y: 16 })
      .set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })
      // Logo wipes in left-to-right behind a clip-path mask.
      .to(logoRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut' })
      // Progress bar fills across roughly the same span as the whole reveal.
      .to(barRef.current, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0)
      .to(messageRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.5')
      // Hold, then content fades in place (no movement) while — separately —
      // the background mask-wipes away bottom-to-top via clip-path.
      .addLabel('reveal', '+=0.5')
      // Both the pointer-events lock AND the body scroll lock are released
      // here, at the start of the reveal — not just at onComplete/setDone
      // (finish(), the very end). The overlay is position:fixed + inset:0 +
      // zIndex:2000 for its entire ~3-4s life, and the page underneath is
      // genuinely visible for the last ~1.25s of that (this fade + the bg
      // wipe below). Releasing only one of the two locks isn't enough: with
      // just pointer-events released, scroll-to-element calls (e.g.
      // scrollIntoView) still silently no-op against `overflow:hidden`, so
      // anything relying on scrolling first still looks broken. Confirmed
      // via direct testing both ways — e.g. the CarouselSection carousel's
      // drag only works once both locks are cleared, not one at a time.
      .set(overlayRef.current, { pointerEvents: 'none' }, 'reveal')
      .call(() => { document.body.style.overflow = prevOverflow; }, [], 'reveal')
      .to(contentRef.current, { opacity: 0, duration: 0.35, ease: 'power2.in' }, 'reveal')
      .to(bgRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'power3.inOut' }, 'reveal');

    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  if (done) return null;

  return (
    <Box
      ref={overlayRef}
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        overflow: 'hidden',
      }}
    >
      <Box ref={bgRef} sx={{ position: 'absolute', inset: 0, backgroundColor: getRoleColor('bg.primary') }} />

      <Box
        ref={contentRef}
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          ref={logoRef}
          component="img"
          src={MARSH_LOGO}
          alt=""
          sx={{
            width: { xs: 180, md: 260 },
            // Same navy-fill SVG the header uses — recolored white for this
            // dark background (the header instead filters it to sky-blue; see
            // .websiteHeader__logo in Header.module.scss).
            filter: 'brightness(0) invert(1)',
          }}
        />

        <Typography
          ref={messageRef}
          sx={{
            position: 'absolute',
            bottom: { xs: 64, md: 128 },
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--typo-display-font-family)',
            fontWeight: 400,
            fontSize: { xs: 24, md: 32 },
            lineHeight: 1.15,
            color: '#ffffff',
            whiteSpace: 'nowrap',
          }}
        >
          {message}
        </Typography>

        {/* Progress bar — surface/tertiary-pale (#f9f5f1), not yet a synced
            DS token; matches the exact Figma value. */}
        <Box
          ref={barRef}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 4,
            backgroundColor: '#f9f5f1',
          }}
        />
      </Box>
    </Box>
  );
};

export default IntroLoader;
