import { gsap } from 'gsap';
import { durations, eases } from '../motion/tokens';
import { registerTimeline } from '../motion/controller';

export interface HeroIntroOptions {
  root: HTMLElement; // hero section
  onComplete?: () => void;
  reducedMotion?: boolean;
}

/**
 * Hero intro: two arrow halves slide inward, overlap to form the "M" silhouette, then crossfade to full Marsh logo.
 * Sequence (approx):
 * 0ms: Arrows off-screen (left/right) at slight scale.
 * 0-900ms: Slide + ease inward, slight overshoot.
 * 900-1200ms: Settle into perfect alignment.
 * 1200-1800ms: Pause holding the formed M + tagline.
 * 1800-2200ms: Crossfade M -> official logo asset; arrows fade out.
 * Then: layout shift: wordmark to left, body copy + scroll hint in.
 */
export function initHeroIntro({ root, onComplete, reducedMotion }: HeroIntroOptions) {
  if (!root) return;
  if (reducedMotion) {
    // Instantly show logo, skip animation.
    const logo = root.querySelector('[data-hero-logo]') as HTMLElement | null;
    const left = root.querySelector('[data-hero-arrow="left"]') as HTMLElement | null;
    const right = root.querySelector('[data-hero-arrow="right"]') as HTMLElement | null;
    const tagline = root.querySelector('[data-hero-tagline]') as HTMLElement | null;
    const wordmarkFinal = root.querySelector('[data-hero-wordmark]') as HTMLElement | null;
    const paragraphs = Array.from(root.querySelectorAll('[data-hero-body]')) as HTMLElement[];
    const hint = root.querySelector('[data-hero-hint]') as HTMLElement | null;
    if (logo) gsap.set(logo, { autoAlpha: 1 });
    if (left) gsap.set(left, { autoAlpha: 0 });
    if (right) gsap.set(right, { autoAlpha: 0 });
    if (tagline) gsap.set(tagline, { autoAlpha: 0 });
    if (wordmarkFinal) gsap.set(wordmarkFinal, { autoAlpha: 1 });
    if (paragraphs.length) gsap.set(paragraphs, { autoAlpha: 1, y: 0 });
    if (hint) gsap.set(hint, { autoAlpha: 1 });
    onComplete?.();
    return;
  }

  const left = root.querySelector('[data-hero-arrow="left"]') as HTMLElement | null;
  const right = root.querySelector('[data-hero-arrow="right"]') as HTMLElement | null;
  const logo = root.querySelector('[data-hero-logo]') as HTMLElement | null;
  const tagline = root.querySelector('[data-hero-tagline]') as HTMLElement | null;
  const wordmarkFinal = root.querySelector('[data-hero-wordmark]') as HTMLElement | null;
  const paragraphs = Array.from(root.querySelectorAll('[data-hero-body]')) as HTMLElement[];
  const hint = root.querySelector('[data-hero-hint]') as HTMLElement | null;
  const headlineWords = Array.from(root.querySelectorAll('[data-hero-word]')) as HTMLElement[];
  if (!left || !right || !logo) return;

  gsap.set([left, right], { autoAlpha: 1 });
  gsap.set(logo, { autoAlpha: 0, scale: 1 });
  if (wordmarkFinal) gsap.set(wordmarkFinal, { autoAlpha: 0 });
  if (hint) gsap.set(hint, { autoAlpha: 0 });
  if (paragraphs.length) gsap.set(paragraphs, { autoAlpha: 0 });
  if (headlineWords.length) gsap.set(headlineWords, { autoAlpha: 0, yPercent: 40 });

  const tl = gsap.timeline({ id: 'heroIntro', defaults: { ease: eases.emphasized }, onComplete });

  // 1. Arrows slide from edges toward center using percentage-based transforms within the same container.
  // This avoids viewport math and prevents overshoot or stretching artifacts.
  tl.from(left, {
    xPercent: -100,
    scale: 1.06,
    duration: 1.0,
    ease: 'power3.out'
  }, 0)
    .from(right, {
      xPercent: 100,
      scale: 1.06,
      duration: 1.0,
      ease: 'power3.out'
    }, 0)
    // 2. Subtle settle & seam-tighten to remove any hairline gap.
    .to([left, right], {
      xPercent: 0,
      scale: 1,
      duration: durations.sm,
      ease: eases.standard,
      onComplete: () => {
        if (left && right) {
          // Safety snap to ensure perfect join across DPRs
          gsap.set([left, right], { xPercent: 0 });
        }
      }
    }, ">-0.1")
    // 3. Hold moment as formed M (delay before morph) & bring in headline words
    .to({}, { duration: 1.0 }) // hold combined M before morph
    // 4. Crossfade arrows (M) to official logo asset
    .to([left, right], {
      autoAlpha: 0,
      duration: durations.sm,
      ease: eases.standard
    }, ">-0.1")
    .to(logo, {
      autoAlpha: 1,
      duration: durations.sm,
      ease: eases.entrance
    }, "<")
    // 5. Center logo swell & hold, then reveal headline & tagline
    .addLabel('wordmarkCenter')
    .to(logo, { scale: 1.2, duration: 0.7, ease: 'power2.inOut' }, 'wordmarkCenter')
    .to({}, { duration: 0.3 })
    .from(headlineWords, { autoAlpha: 0, yPercent: 40, duration: 0.9, stagger: 0.05, ease: 'power3.out' }, 'wordmarkCenter+=0.15')
    .from(tagline, { autoAlpha: 0, y: 12, duration: 0.5, ease: eases.entrance, id: 'taglineIn' }, 'wordmarkCenter+=0.45')
    .from(hint, { autoAlpha: 0, y: 12, duration: 0.6, ease: eases.entrance }, 'wordmarkCenter+=0.9')
    // 6. Hide tagline before layout transition (if we still perform layout shift)
    .to(tagline, { autoAlpha: 0, duration: durations.xs || 0.2, ease: eases.standard }, '>')
    // 7. Layout transition: fade center logo, reveal left-aligned wordmark + paragraphs
    .addLabel('layout')
    // fade the centered overlay logo as layout wordmark enters
    .to(logo, { autoAlpha: 0, duration: durations.sm, ease: eases.standard }, 'layout')
    .from(wordmarkFinal, { autoAlpha: 0, x: '30vw', duration: 0.8, ease: 'power2.inOut', id: 'wordmarkIn' }, 'layout')
    .from(paragraphs, { autoAlpha: 0, y: 20, duration: durations.sm, stagger: 0.12 }, 'layout+=0.3')
    // 8. (Scroll hint already revealed earlier; ensure it's visible post layout)
    .set(hint, { autoAlpha: 1 }, 'layout');

  return registerTimeline('heroIntro', tl);
}
