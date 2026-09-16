/**
 * Navigator.deviceMemory (Device Memory API) — not in TS's default DOM lib
 * since it's still non-standard/Chromium-only. Used by the low-end-device
 * detection heuristics in this animations subtree.
 */
export {};

declare global {
  interface Navigator {
    /** Approximate device RAM in GiB, rounded to a power of two. Undefined where unsupported (Safari, Firefox). */
    readonly deviceMemory?: number;
  }
}
