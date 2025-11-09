import { gsap } from 'gsap';
type GSAPTimeline = gsap.core.Timeline;

// Global registry for timelines so we can introspect and manipulate them.
// Provides helpers for dev/debug (query param driven) and future master story.

export interface RegisteredTimeline {
  id: string;
  tl: GSAPTimeline;
}

const registry = new Map<string, GSAPTimeline>();
let globalTimeScale = 1;

export function registerTimeline(id: string, tl: GSAPTimeline): GSAPTimeline {
  if (!tl) return tl;
  tl.vars.id = id; // assign id for getById lookups
  tl.smoothChildTiming = true; // keep child alignment under timeScale / seeks
  registry.set(id, tl);
  if (globalTimeScale !== 1) tl.timeScale(globalTimeScale);
  return tl;
}

export function getTimeline(id: string): GSAPTimeline | undefined {
  return registry.get(id);
}

export function listTimelines(): RegisteredTimeline[] {
  return Array.from(registry.entries()).map(([id, tl]) => ({ id, tl }));
}

export function clearTimeline(id: string) {
  const tl = registry.get(id);
  if (tl) {
    tl.clear();
    registry.delete(id);
  }
}

export function clearAll() {
  Array.from(registry.keys()).forEach(clearTimeline);
}

export function setGlobalTimeScale(scale: number) {
  const s = gsap.utils.clamp(0.0001, 3, scale);
  globalTimeScale = s;
  registry.forEach(t => t.timeScale(s));
}

export function jumpTo(id: string, labelOrTime: string | number) {
  const tl = registry.get(id);
  if (!tl) return;
  if (typeof labelOrTime === 'number') {
    tl.time(labelOrTime, false);
  } else {
    tl.seek(labelOrTime, false);
  }
}

export function debugSummary() {
  return listTimelines().map(({ id, tl }) => ({
    id,
    duration: tl.duration(),
    end: tl.endTime(),
    labels: Object.keys(tl.getLabels ? tl.getLabels() : {}),
  }));
}

// Apply query param driven debug controls (idempotent)
export function applyMotionDebugFromQuery() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const speed = params.get('motion');
  if (speed) {
    if (speed === 'slow') setGlobalTimeScale(0.5);
    else if (speed === 'fast') setGlobalTimeScale(1.6);
    else if (speed === 'freeze') setGlobalTimeScale(0.0001);
    else if (speed === 'normal') setGlobalTimeScale(1);
  }
  const skip = params.get('skipIntro');
  if (skip === '1') {
    // jump hero intro to layout label if present
    const heroIntro = getTimeline('heroIntro');
    if (heroIntro?.labels?.layout) heroIntro.seek('layout');
    // Ensure scroll hint is visible when skipping intro
    const hint = document.querySelector('[data-hero-hint]') as HTMLElement | null;
    if (hint) gsap.set(hint, { autoAlpha: 1 });
  }
}
