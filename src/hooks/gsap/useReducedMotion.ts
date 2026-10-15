import { useEffect, useState } from 'react';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !('matchMedia' in window)) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Tracks the user's `prefers-reduced-motion` setting.
 *
 * The initial value is read synchronously via a lazy `useState` initializer,
 * NOT in an effect. That distinction matters more than it looks:
 *
 * This used to start at `false` and flip in a `useEffect` after mount. For a
 * user who has asked for reduced motion, that left a window — first render
 * through first effect — in which every consumer believed motion was fine.
 * GSAP entrance animations set their "from" state during that window, so those
 * users got a flash of exactly the animation they'd opted out of before it
 * snapped to the settled state.
 *
 * It also made the accessibility tests non-deterministic. Entrance animations
 * begin at `opacity: 0`, so anything sampling the page inside that window sees
 * text blended most of the way into its background — axe reported dozens of
 * colour-contrast failures for elements whose declared colour was correct
 * (`#000f47` measuring as ~`#e2e3ea`, 1.2:1), and the exact ratios shifted from
 * run to run with machine speed. The colours were never wrong; the text was
 * still fading in.
 *
 * Reading the query during initialization removes the window entirely: the
 * first render already knows. The effect below now only handles the user
 * *changing* the setting while the page is open.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    // Re-sync in case the preference changed between initialization and mount.
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
}
