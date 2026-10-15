import { useLayoutEffect } from 'react';
import { ensureGsapRegistered, gsap, ScrollTrigger } from '../gsap.client';
import { isMotionDisabled } from '../utils/DebugFlags';

interface Options {
  scope: React.RefObject<HTMLElement>;
  setup: (gsapRef: typeof gsap, st: typeof ScrollTrigger) => void | (() => void);
  disabled?: boolean;
}

// Minimal helper to ensure GSAP context & cleanup on unmount
export function useScrollTrigger({ scope, setup, disabled }: Options) {
  useLayoutEffect(() => {
    if (disabled || isMotionDisabled()) return;
    ensureGsapRegistered();
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      const maybeCleanup = setup(gsap, ScrollTrigger);
      return () => {
        if (typeof maybeCleanup === 'function') maybeCleanup();
      };
    }, scope);

    return () => ctx.revert();
  }, [scope, setup, disabled]);
}
