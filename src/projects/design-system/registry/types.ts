import type React from 'react';

/** One documented component within a category. */
export interface ComponentEntry {
  /** Slug — the section anchor id AND the guidance.ts lookup key. */
  id: string;
  /** Display name, e.g. "Button". */
  title: string;
  /** One-line description shown under the title. */
  summary?: string;
  /** Display-only reference path, e.g. 'src/components/ui/button.tsx'. Not imported. */
  sourcePath: string;
  /** Hand-authored live demo — the real component, not a recreation. */
  demo: () => React.ReactNode;
}

/** One sidebar category — a group of related components sharing a route. */
export interface CategoryEntry {
  /** Slug — matches the route param, e.g. 'actions'. */
  id: string;
  /** Display name, e.g. "Actions". */
  label: string;
  /** Full route path, e.g. '/design-system/actions'. */
  path: string;
  /** One-line description shown at the top of the category page. */
  description?: string;
  components: ComponentEntry[];
}
