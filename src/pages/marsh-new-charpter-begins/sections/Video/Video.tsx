import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { ScrollTrigger } from '../../animations/gsap.client';

/**
 * Brand video section
 * - Sits directly below the Hero
 * - Reveals from bottom to top into a full-viewport frame
 * - Autoplays muted and loops while in view
 */
const Video: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasAnimatedRef = useRef(false);
  // Tracks whether a ScrollTrigger-driven timeline is attached for this section
  const stAttachedRef = useRef(false);
  const [canUnmute, setCanUnmute] = useState(true);
  const [showUnmutePrompt, setShowUnmutePrompt] = useState(false);
  const prefersReduced = useReducedMotion();
  const disableAnimations = useMemo(() => {
    if (typeof window === 'undefined') return prefersReduced;
    const qs = new URLSearchParams(window.location.search);
    // URL override: ?anim forces animations ON even if reduced-motion is set
    if (qs.has('anim')) return false;
    return prefersReduced || qs.has('noanim');
  }, [prefersReduced]);
  const showMarkers = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const qs = new URLSearchParams(window.location.search);
    return qs.has('st') || import.meta.env.DEV;
  }, []);

  // Behavior switches (default: no scrub, keep pin). URL overrides:
  // - ?scrub to enable scrubbing
  // - ?nopin to disable pinning
  const { scrub, pin } = useMemo(() => {
    if (typeof window === 'undefined') return { scrub: false, pin: false } as const;
    const qs = new URLSearchParams(window.location.search);
    const clipscrub = qs.has('clipscrub');
    const scrubEnabled = clipscrub || qs.has('scrub');
    // Default to no pin; allow ?pin to opt-in; auto-pin when ?clipscrub is present; still respect ?nopin if provided
    const pinEnabled = qs.has('nopin') ? false : (clipscrub ? true : (qs.has('pin') ? true : false));
    return { scrub: scrubEnabled, pin: pinEnabled } as const;
  }, []);

  const enableParallax = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const qs = new URLSearchParams(window.location.search);
    // Parallax is off by default; opt-in via ?parallax
    return qs.has('parallax');
  }, []);

  const enableBlur = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const qs = new URLSearchParams(window.location.search);
    return qs.has('blur') || qs.has('debugfade');
  }, []);

  // Optional debug: try to automatically unmute on enter (will still be blocked by browsers without a prior user gesture)
  const tryAutoUnmute = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const qs = new URLSearchParams(window.location.search);
    return qs.has('autounmute');
  }, []);

  // Simple test mode: bypass ScrollTrigger and just show the video immediately (optional short fade)
  const simpleMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const qs = new URLSearchParams(window.location.search);
    return qs.has('simple') || qs.has('simplefade');
  }, []);
  const simpleFade = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const qs = new URLSearchParams(window.location.search);
    return qs.has('simplefade');
  }, []);

  // Clip-path reveal is optional (opt-in via ?clip). Default uses overlay crossfade for robustness.
  const useClipPath = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const qs = new URLSearchParams(window.location.search);
    if (!(qs.has('clip') || qs.has('clipscrub'))) return false;
    try {
      return (window as any).CSS?.supports?.('clip-path', 'inset(50% 0 0 0)') ?? false;
    } catch {
      return false;
    }
  }, []);

  // Animate the reveal respecting reduced-motion
  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: disableAnimations || simpleMode,
    setup: (gsap, _st) => {
      if (!revealRef.current || !frameRef.current) return;
      stAttachedRef.current = true;
      if (useClipPath) {
        gsap.set(revealRef.current, {
          height: '100%',
          opacity: 1,
          willChange: 'clip-path, transform, filter',
          clipPath: 'inset(100% 0% 0% 0%)',
          WebkitClipPath: 'inset(100% 0% 0% 0%)',
          filter: enableBlur ? 'blur(6px)' : 'none',
        } as any);
      } else {
        gsap.set(revealRef.current, { height: '100%', opacity: 1, willChange: 'opacity, transform, filter', filter: enableBlur ? 'blur(6px)' : 'none' });
      }
      if (bridgeRef.current) gsap.set(bridgeRef.current, { opacity: 1, willChange: 'opacity' });

      const startPos = pin ? 'top top' : 'top 85%';
      const tl = gsap.timeline({
        trigger: frameRef.current,
        start: startPos,
        end: (scrub && pin) ? '+=300%' : '+=80%',
        scrub: scrub ? 0.5 : false,
        pin,
        pinSpacing: pin ? false : undefined,
        fastScrollEnd: true,
        anticipatePin: 1,
        markers: showMarkers ? { startColor: 'lime', endColor: 'fuchsia', indent: 20 } : false,
        onRefresh: (self: any) => {
          if (!scrub) {
            const entered = (typeof self.scroll === 'function' ? self.scroll() : 0) >= (self.start || 0) || self.isActive || self.progress > 0;
            if (entered) {
              try { (tl as any).play(0); } catch {}
            }
          }
        },
        onEnter: () => {
          hasAnimatedRef.current = true;
          try { iframeRef.current?.contentWindow?.postMessage({ method: 'play' }, '*'); } catch {}
          setShowUnmutePrompt(true);
          if (tryAutoUnmute && canUnmute) handleUnmute();
        },
        onLeave: () => {
          try { iframeRef.current?.contentWindow?.postMessage({ method: 'pause' }, '*'); } catch {}
          setShowUnmutePrompt(false);
        },
        onEnterBack: () => {
          try { iframeRef.current?.contentWindow?.postMessage({ method: 'play' }, '*'); } catch {}
          setShowUnmutePrompt(true);
        },
        onLeaveBack: () => {
          try { iframeRef.current?.contentWindow?.postMessage({ method: 'pause' }, '*'); } catch {}
          setShowUnmutePrompt(false);
        },
      });
      tl.eventCallback('onStart', () => { hasAnimatedRef.current = true; });
      if (useClipPath) {
        tl.to(revealRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          WebkitClipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.0,
          ease: scrub ? 'none' : 'power2.out',
        } as any, 0).to(revealRef.current, { filter: 'blur(0px)', duration: enableBlur ? 0.9 : 0, ease: scrub ? 'none' : 'power2.out' }, 0);
      } else if (enableBlur) {
        tl.to(revealRef.current, { filter: 'blur(0px)', duration: 0.9, ease: scrub ? 'none' : 'power2.out' }, 0);
      }
      if (bridgeRef.current) tl.to(bridgeRef.current, { opacity: 0, duration: 0.9, ease: scrub ? 'none' : 'power2.out' }, 0);
      if (enableParallax) tl.fromTo(revealRef.current, { scale: 1.03, y: 24 }, { scale: 1, y: 0, duration: 0.9, ease: scrub ? 'none' : 'power3.out' }, 0);
      return () => { try { tl.kill(); } catch {}; stAttachedRef.current = false; };
    },
  });

  // Fallback for reduced-motion or explicit no-animation: render fully visible
  useEffect(() => {
    if (disableAnimations && revealRef.current) {
      revealRef.current.style.height = '100%';
      revealRef.current.style.opacity = '1';
      revealRef.current.style.filter = 'none';
      try {
        (revealRef.current.style as any).clipPath = 'inset(0% 0% 0% 0%)';
        (revealRef.current.style as any).WebkitClipPath = 'inset(0% 0% 0% 0%)';
      } catch {}
      // Ensure the hero-colored bridge isn't covering the video in reduced-motion/static mode
      if (bridgeRef.current) bridgeRef.current.style.opacity = '0';
    }
  }, [disableAnimations]);

  // Simple mode: immediately show the video at start (optionally with a short fade) without ScrollTrigger
  useEffect(() => {
    if (!simpleMode || !revealRef.current) return;
    const el = revealRef.current;
    // Ensure wrapper dimensions and visibility
    el.style.height = '100%';
    el.style.opacity = '0';
    (el.style as any).clipPath = 'inset(0% 0% 0% 0%)';
    (el.style as any).WebkitClipPath = 'inset(0% 0% 0% 0%)';
    el.style.filter = enableBlur ? 'blur(6px)' : 'none';
    // Hide bridge immediately
    if (bridgeRef.current) bridgeRef.current.style.opacity = '0';
    // Optional short fade
    const play = () => {
      if (simpleFade) {
        el.style.transition = 'opacity 400ms ease, filter 600ms ease';
      } else {
        el.style.transition = '';
      }
      // Next tick
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        if (enableBlur) el.style.filter = 'blur(0px)';
      });
    };
    play();
    // Try to play the video
    try { iframeRef.current?.contentWindow?.postMessage({ method: 'play' }, '*'); } catch {}
  }, [simpleMode, simpleFade, enableBlur]);

  // IntersectionObserver fallback to ensure the fade plays even if ScrollTrigger misses
  useEffect(() => {
    if (disableAnimations) return;
    const el = frameRef.current;
    if (!el || !revealRef.current) return;
    // If ScrollTrigger has attached successfully, skip the IO fallback to avoid double playing
    if (stAttachedRef.current) return;
    const gsapAny: any = (window as any).gsap;
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            // One-shot reveal if GSAP timeline hasn't yet executed
            if (gsapAny?.to) {
              if (useClipPath) {
                gsapAny.set(revealRef.current, { height: '100%', opacity: 1, clipPath: 'inset(100% 0% 0% 0%)', WebkitClipPath: 'inset(100% 0% 0% 0%)', filter: enableBlur ? 'blur(6px)' : 'none' });
                gsapAny.to(revealRef.current, { clipPath: 'inset(0% 0% 0% 0%)', WebkitClipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'power2.out' });
              } else {
                gsapAny.set(revealRef.current, { height: '100%', opacity: 1, filter: enableBlur ? 'blur(6px)' : 'none' });
              }
              if (enableBlur) gsapAny.to(revealRef.current, { filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' });
              if (bridgeRef.current) gsapAny.to(bridgeRef.current, { opacity: 0, duration: 0.9, ease: 'power2.out' });
            } else {
              // Fallback without GSAP
              revealRef.current!.style.opacity = '1';
              (revealRef.current!.style as any).clipPath = 'inset(0% 0% 0% 0%)';
              (revealRef.current!.style as any).WebkitClipPath = 'inset(0% 0% 0% 0%)';
              revealRef.current!.style.filter = 'none';
              if (bridgeRef.current) bridgeRef.current.style.opacity = '0';
            }
            observer?.disconnect();
          }
        });
      }, { threshold: 0.4 });
      observer.observe(el);
    } catch {
      // no-op
    }
    return () => observer?.disconnect();
  }, [disableAnimations, enableBlur]);

  // Ensure play/pause behavior even when ScrollTrigger is disabled (reduced motion or ?simple)
  useEffect(() => {
    if (!(simpleMode || disableAnimations)) return;
    const el = frameRef.current;
    if (!el) return;
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try { iframeRef.current?.contentWindow?.postMessage({ method: 'play' }, '*'); } catch {}
            setShowUnmutePrompt(true);
          } else {
            try { iframeRef.current?.contentWindow?.postMessage({ method: 'pause' }, '*'); } catch {}
            setShowUnmutePrompt(false);
          }
        });
      }, { threshold: 0.25 });
      observer.observe(el);
    } catch {
      // no-op
    }
    return () => observer?.disconnect();
  }, [simpleMode, disableAnimations]);

  // Pause when the tab/window is hidden; resume (muted) when visible and in view
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        try { iframeRef.current?.contentWindow?.postMessage({ method: 'pause' }, '*'); } catch {}
      } else {
        // Only resume if our frame is on-screen to avoid unexpected playback
        try {
          const inView = frameRef.current && (ScrollTrigger as any)?.isInViewport?.(frameRef.current, 0.25);
          if (inView) {
            iframeRef.current?.contentWindow?.postMessage({ method: 'play' }, '*');
          }
        } catch {
          // no-op
        }
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const vimeoSrc =
    'https://player.vimeo.com/video/1132281161?autoplay=1&muted=1&background=1&controls=0&loop=1&playsinline=1&autopause=0&dnt=1&title=0&byline=0&portrait=0';

  // Lazy-load Vimeo Player API only when needed (on user click)
  const loadVimeoApi = useCallback(async () => {
    if ((window as any).Vimeo?.Player) return (window as any).Vimeo.Player;
    await new Promise<void>((resolve) => {
      const s = document.createElement('script');
      s.src = 'https://player.vimeo.com/api/player.js';
      s.async = true;
      s.onload = () => resolve();
      document.head.appendChild(s);
    });
    return (window as any).Vimeo.Player;
  }, []);

  const handleUnmute = useCallback(async () => {
    try {
      const Player = await loadVimeoApi();
      if (!iframeRef.current) return;
      const player = new Player(iframeRef.current);
      await player.setMuted(false);
      await player.setVolume(1);
      await player.play();
      setCanUnmute(false);
    } catch {
      // no-op; if blocked, leave the button visible
    }
  }, [loadVimeoApi]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Our next chapter video"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'block',
        overflow: 'hidden',
        background: getRoleColor('surface.hero'),
        padding: 0,
      }}
    >
      {/* Full-bleed inner frame centered without negative margins */}
      <Box
        ref={frameRef}
        sx={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 100,
          backgroundColor: getRoleColor('surface.hero'),
        }}
      >
        {/* Background gradient to match Hero */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background: `linear-gradient(180deg, ${getRoleColor('surface.hero')} 0%, ${getRoleColor('surface.hero')} 100%)`,
          }}
        />

        {/* Bridge overlay for smooth hero → video transition (fades out) */}
        <Box
          ref={bridgeRef}
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: `linear-gradient(180deg, ${getRoleColor('surface.hero')} 0%, ${getRoleColor('surface.hero')} 100%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Reveal wrapper */}
        {/* Mask wrapper grows from bottom to top; video inside covers without stretching */}
        <Box
          ref={revealRef}
          sx={{ position: 'absolute', inset: 0, height: '100%', overflow: 'hidden', zIndex: 2, opacity: 1, willChange: 'transform, filter' }}
        >
          {/* Responsive cover sizing wrapper ensures no white letterbox from Vimeo by emulating object-fit: cover for 16:9 */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100vw',
              height: 'calc(100vw * 9 / 16)',
              '@media (min-aspect-ratio: 16/9)': {
                width: 'calc(100vh * 16 / 9)',
                height: '100vh',
              },
            }}
          >
            <Box
              component="iframe"
              ref={iframeRef}
              src={vimeoSrc}
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0,
                display: 'block',
                backgroundColor: getRoleColor('surface.hero'),
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              onLoad={() => {
                try { ScrollTrigger.refresh(); } catch {}
              }}
              title="Our next chapter"
            />
          </Box>
          {/* Unmute control (shown until user enables sound) */}
          {canUnmute && showUnmutePrompt && (
            <Box
              component="button"
              onClick={handleUnmute}
              sx={{
                position: 'absolute',
                right: 16,
                bottom: 16,
                zIndex: 2,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: getRoleColor('text.onHero'),
                border: 0,
                borderRadius: '999px',
                padding: '8px 12px',
                cursor: 'pointer',
                font: '500 14px/1.2 system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
              }}
              aria-label="Unmute video"
            >
              Unmute
            </Box>
          )}
        </Box>
      </Box>
    </section>
  );
};

export default Video;
