import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

let registered = false;

/**
 * Idempotent single registration point for the plugins the shared
 * `src/hooks/gsap` primitives depend on. `gsap.registerPlugin` is itself
 * idempotent, so this safely coexists with the per-component
 * `gsap.registerPlugin(...)` calls already scattered across the codebase
 * (e.g. PressSection.tsx) — neither needs to change.
 */
export function registerGsapPlugins(): void {
  if (registered) return;
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrollSmoother);
  registered = true;
}
