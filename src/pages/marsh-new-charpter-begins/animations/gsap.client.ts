import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once on client
let registered = false;
export function ensureGsapRegistered() {
  if (registered) return;
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    // Dev markers toggle via query param `st-markers=1`
    try {
      const params = new URLSearchParams(window.location.search);
      const markers = params.get('st-markers');
      if (markers === '1') {
        ScrollTrigger.defaults({ markers: true });
      }
    } catch {}
    registered = true;
  }
}

export { gsap, ScrollTrigger };
