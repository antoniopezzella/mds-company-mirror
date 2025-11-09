import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ensureGsapRegistered, gsap, ScrollTrigger } from '../gsap.client';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { isLenisDisabled } from '../utils/DebugFlags';

/**
 * Initialize Lenis smooth scrolling for this page and keep ScrollTrigger in sync.
 * - No scrollerProxy needed since Lenis drives the native window scroll.
 * - Disabled automatically when prefers-reduced-motion is enabled.
 */
export function useLenisSmooth() {
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (prefersReduced || isLenisDisabled()) return; // honor reduced motion or debug flag

    ensureGsapRegistered();

    const lenis = new Lenis({
      lerp: 0.1, // ~duration; lower = snappier
      wheelMultiplier: 1,
      smoothWheel: true,
      // smoothTouch was removed in newer Lenis types; default behavior is fine
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const ticker = (time: number) => {
      // gsap.ticker gives seconds; Lenis expects ms
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);

    // Kick the first frame
    requestAnimationFrame((t) => lenis.raf(t));

    return () => {
      try { lenis.off('scroll', onScroll); } catch {}
      try { gsap.ticker.remove(ticker); } catch {}
      try { lenis.destroy(); } catch {}
      lenisRef.current = null;
    };
  }, [prefersReduced]);
}
