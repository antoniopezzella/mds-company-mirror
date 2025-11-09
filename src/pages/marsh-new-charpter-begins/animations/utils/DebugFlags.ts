// Simple URL flag helpers to aid debugging without code changes
// Usage examples:
//  - ?disable-motion=1  -> skip all GSAP animations
//  - ?disable-lenis=1   -> skip Lenis smooth scrolling
//  - ?st-markers=1      -> enable ScrollTrigger markers (already supported in gsap.client)

function getParams(): URLSearchParams | null {
  if (typeof window === 'undefined') return null;
  try {
    return new URLSearchParams(window.location.search);
  } catch {
    return null;
  }
}

export function isMotionDisabled(): boolean {
  const p = getParams();
  if (!p) return false;
  return p.get('disable-motion') === '1' || p.get('no-motion') === '1';
}

export function isLenisDisabled(): boolean {
  const p = getParams();
  if (!p) return false;
  return p.get('disable-lenis') === '1' || isMotionDisabled();
}

export function isMarkersEnabled(): boolean {
  const p = getParams();
  if (!p) return false;
  return p.get('st-markers') === '1';
}
