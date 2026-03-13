import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register plugins once on client
let registered = false;
export function ensureGsapRegistered() {
  if (registered) return;
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    // Dev markers toggle via query param `st-markers=1`
    try {
      const params = new URLSearchParams(window.location.search);
      const markers = params.get('st-markers');
      if (markers === '1') {
        ScrollTrigger.defaults({ markers: true });
      }
    } catch (error) {
      // Ignore URL parsing errors in development
      console.debug('Failed to parse URL parameters:', error);
    }
    registered = true;
  }
}

export { gsap, ScrollTrigger };
