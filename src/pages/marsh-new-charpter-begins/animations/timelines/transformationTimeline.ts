import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { durations, eases } from '../motion/tokens';

export interface TimelineOptions {
  wrapper: HTMLElement; // outer section wrapper
  scene: HTMLElement; // pinned inner container (100dvh)
  steps: HTMLElement[]; // each step panel
  progressBar?: HTMLElement | null; // inner progress bar element
}

/**
 * Initialize a pinned scrollytelling timeline:
 * - Pins `scene` and scrubs between steps as the user scrolls.
 * - Cross-fades/translate steps in/out based on progress.
 * - Updates an optional progress bar.
 */
export function initTransformationTimeline({ wrapper, scene, steps, progressBar }: TimelineOptions) {
  if (!wrapper || !scene || !steps.length) return;

  const mm = gsap.matchMedia();

  mm.add({ all: '(min-width: 0px)' }, () => {
    // Set initial state
    gsap.set(steps, { autoAlpha: 0, yPercent: 10 });
    gsap.set(steps[0], { autoAlpha: 1, yPercent: 0 });

    const stepCount = steps.length;

    const tl = gsap.timeline({ defaults: { ease: eases.none }, invalidateOnRefresh: true });

    // For n steps, create n-1 transitions across total scroll distance
    for (let i = 0; i < stepCount - 1; i++) {
      const current = steps[i];
      const next = steps[i + 1];

      tl.to(current, { autoAlpha: 0, yPercent: -10, duration: durations.sm })
        .fromTo(next, { autoAlpha: 0, yPercent: 10 }, { autoAlpha: 1, yPercent: 0, duration: durations.sm }, '<');
    }

    // Progress bar update
    if (progressBar) {
      tl.eventCallback('onUpdate', () => {
        const p = tl.progress();
        gsap.to(progressBar, { width: `${Math.round(p * 100)}%`, duration: 0.1, ease: eases.standard });
      });
    }

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: `+=${(stepCount - 1) * 120}%`, // tune scroll distance per step
      pin: scene,
      scrub: true,
      anticipatePin: 1,
      refreshPriority: 1,
    });
  });
}
