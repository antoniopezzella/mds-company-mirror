import { useEffect } from 'react';
import { ScrollTrigger } from '../gsap.client';

/**
 * Calls ScrollTrigger.refresh() once fonts and window assets have settled.
 * Guards for SSR and only runs in the browser.
 */
export function useRefreshOnAssetsReady() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cancelled = false;

    const doRefresh = () => {
      if (cancelled) return;
      try {
        ScrollTrigger.refresh();
      } catch (error) {
        console.debug('Error refreshing ScrollTrigger:', error);
      }
    };

    // Refresh after fonts load
    const fontsReady = document.fonts?.ready;
    if (fontsReady && typeof fontsReady.then === 'function') {
      fontsReady.then(doRefresh);
    }

    // Refresh after window 'load' (images/css/etc.)
    if (document.readyState === 'complete') {
      doRefresh();
    } else {
      window.addEventListener('load', doRefresh, { once: true });
    }

    // Fallback timer in case neither fires (very rare)
    const t = window.setTimeout(doRefresh, 1500);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.removeEventListener('load', doRefresh);
    };
  }, []);
}
