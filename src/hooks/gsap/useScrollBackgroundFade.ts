import type { RefObject, DependencyList } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getRoleColor, type RoleName } from '../../theme/roles';
import { registerGsapPlugins } from './registerGsapPlugins';
import { useReducedMotion } from './useReducedMotion';

registerGsapPlugins();

export interface UseScrollBackgroundFadeOptions {
  /** Role resolved via getRoleColor() for the background at scroll start. */
  from: RoleName;
  /** Role resolved via getRoleColor() for the background at scroll end. */
  to: RoleName;
  /** Element whose scroll position drives the fade. Defaults to the target itself. */
  trigger?: RefObject<HTMLElement | null>;
  /** ScrollTrigger `start` position. */
  start?: string;
  /** ScrollTrigger `end` position. */
  end?: string;
  /** ScrollTrigger `scrub` value. */
  scrub?: number | boolean;
  /**
   * CSS color property to animate. Defaults to `backgroundColor`; pass
   * `color` to crossfade a text color in sync with a background fade
   * (e.g. keeping a headline readable as its section scrubs toward a
   * surface it would otherwise lose contrast against).
   */
  property?: 'backgroundColor' | 'color';
}

/**
 * Continuously interpolates a target element's background (or text) color
 * across its own scroll span — a scroll-scrubbed fade rather than a
 * discrete on/off toggle. Colors are role names resolved via
 * `getRoleColor()` (never raw hex), which auto-resolves against the
 * current light/dark mode the same way every other role consumer in this
 * codebase does.
 *
 * Respects `prefers-reduced-motion`: when reduced motion is on, the target
 * is set directly to the resolved `to` color with no scroll-linked tween.
 */
export function useScrollBackgroundFade(
  targetRef: RefObject<HTMLElement | null>,
  options: UseScrollBackgroundFadeOptions,
  dependencies: DependencyList = [],
): void {
  const {
    from,
    to,
    trigger,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
    property = 'backgroundColor',
  } = options;
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const target = targetRef.current;
      if (!target) return;

      const fromColor = getRoleColor(from);
      const toColor = getRoleColor(to);

      if (reducedMotion) {
        gsap.set(target, { [property]: toColor });
        return;
      }

      gsap.set(target, { [property]: fromColor });

      const st = ScrollTrigger.create({
        trigger: trigger?.current ?? target,
        start,
        end,
        scrub,
        onUpdate: (self) => {
          target.style[property] = gsap.utils.interpolate(fromColor, toColor, self.progress);
        },
      });

      return () => st.kill();
    },
    {
      scope: targetRef as RefObject<HTMLElement>,
      dependencies: [reducedMotion, from, to, start, end, scrub, property, ...dependencies],
    },
  );
}
