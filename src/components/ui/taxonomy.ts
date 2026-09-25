/**
 * Component taxonomy — the library's self-description.
 *
 * Why this is a manifest and not a folder structure
 * -------------------------------------------------
 * Atomic design's atom/molecule boundary is genuinely contested (is a Card an
 * atom or a molecule? is a Calendar a molecule or an organism?). Baking a
 * contested answer into *import paths* churns every file's history, breaks
 * deep imports, and buys nothing: what a consumer — human or agent — needs is
 * to KNOW that `DataTable` is an organism, not to find it at a particular
 * path. shadcn/ui, Radix, MUI and Polaris all keep a flat file layout and
 * classify in documentation for exactly this reason.
 *
 * So the files stay flat in `src/components/ui/` and the taxonomy lives here,
 * where docs, Storybook and `scripts/check-composition.js` can all read the
 * same source of truth.
 *
 * The tiers are defined by a testable question, not by vibes — see `TIERS`.
 */

export type Tier = 'atom' | 'molecule' | 'organism' | 'template';

export interface TierDefinition {
  /** The question that decides membership. Answerable by reading the file. */
  test: string;
  /** What this tier is for, in composition terms. */
  role: string;
}

export const TIERS: Record<Tier, TierDefinition> = {
  atom: {
    test: 'Renders no other MDS component. Decomposing it further would leave no meaningful UI.',
    role: 'The smallest styled surface. Always safe to place anywhere.',
  },
  molecule: {
    test: 'Composes atoms into one unit with a single purpose, but owns no page-level or server state.',
    role: 'The level most feature code should reach for first.',
  },
  organism: {
    test: 'Owns behaviour or state of its own (selection, pagination, open/close, portals), or occupies a whole region of a page.',
    role: 'A self-contained section. Expect props for data in and events out.',
  },
  template: {
    test: 'Provides page structure and slots only. Contains no business data and no domain vocabulary.',
    role: 'The scaffold a page is poured into. Layout decisions live here, not in the page.',
  },
};

/**
 * Every component module in `src/components/ui/`, keyed by file basename.
 * A module may export several components (`stack` exports `Stack` and
 * `Inline`; `page-shell` exports `PageShell` and `PageHeading`) — they share
 * the module's tier.
 *
 * Contested calls are annotated so the reasoning is reviewable rather than
 * mysterious. If you disagree with one, change it here — this file is the only
 * place the answer is recorded.
 */
export const TAXONOMY: Record<string, Tier> = {
  // ── Atoms ──────────────────────────────────────────────────────────────
  'aspect-ratio': 'atom',
  avatar: 'atom',
  badge: 'atom',
  'badge-anchor': 'atom',
  button: 'atom',
  checkbox: 'atom',
  chip: 'atom',
  'filter-chip': 'molecule',
  'image-with-fallback': 'atom',
  input: 'atom',
  label: 'atom',
  marker: 'atom',
  progress: 'atom',
  'scroll-area': 'atom',
  separator: 'atom',
  skeleton: 'atom',
  slider: 'atom',
  sparkline: 'atom',
  spinner: 'atom',
  switch: 'atom',
  textarea: 'atom',
  toggle: 'atom',

  // Layout atoms. Same tier as `button` by the test above — they render no
  // other MDS component — but they exist to be composed, never used alone.
  // `stack` covers both `Stack` and `Inline`: this manifest is keyed by
  // module, and a module may export more than one component.
  stack: 'atom',

  // ── Molecules ──────────────────────────────────────────────────────────
  accordion: 'molecule',
  alert: 'molecule',
  attachment: 'molecule',
  breadcrumbs: 'molecule',
  bubble: 'molecule',
  'button-group': 'molecule',
  card: 'molecule',
  collapsible: 'molecule',
  // The four-state contract. Molecules: they compose Empty/ErrorState/Spinner
  // into one unit, but own no page or server state of their own.
  'data-state': 'molecule',
  'error-state': 'molecule',
  combobox: 'molecule',
  empty: 'molecule',
  field: 'molecule',
  // Organism: it owns a filter row's composition and publishes a size cascade,
  // and it occupies a whole region above a data surface.
  'filter-bar': 'organism',
  'hover-card': 'molecule',
  'input-group': 'molecule',
  'input-otp': 'molecule',
  list: 'molecule',
  'metric-card': 'molecule',
  pagination: 'molecule',
  popover: 'molecule',
  'radio-group': 'molecule',
  select: 'molecule',
  'stat-card': 'molecule',
  'status-card': 'molecule',
  stepper: 'molecule',
  tabs: 'molecule',
  'text-field': 'molecule',
  toast: 'molecule',
  'toggle-group': 'molecule',
  tooltip: 'molecule',

  // ── Organisms ──────────────────────────────────────────────────────────
  calendar: 'organism',
  carousel: 'organism',
  chart: 'organism',
  command: 'organism',
  'context-menu': 'organism',
  'data-table': 'organism',
  'data-grid': 'organism',
  'data-grid-cell-edit': 'atom',
  'data-grid-pagination': 'organism',
  'data-grid-rows': 'molecule',
  'data-grid-selection': 'molecule',
  'data-grid-table': 'organism',
  'data-grid-toolbar': 'organism',
  'data-table-date-filter': 'organism',
  'data-table-faceted-filter': 'organism',
  'data-table-sort-list': 'organism',
  'date-picker': 'organism',
  dialog: 'organism',
  drawer: 'organism',
  'dropdown-menu': 'organism',
  header: 'organism',
  'mega-menu': 'organism',
  menubar: 'organism',
  message: 'organism',
  'message-scroller': 'organism',
  'notifications-drawer': 'organism',
  questionnaire: 'organism',
  resizable: 'organism',
  sheet: 'organism',
  'side-navigation': 'organism',
  table: 'organism',
  toaster: 'organism',
  'website-header': 'organism',

  // ── Templates ──────────────────────────────────────────────────────────
  'page-shell': 'template',
};

/** Components in one tier, sorted. */
export function byTier(tier: Tier): string[] {
  return Object.entries(TAXONOMY)
    .filter(([, t]) => t === tier)
    .map(([name]) => name)
    .sort();
}

/** Tier for a component file basename, or `undefined` if unclassified. */
export function tierOf(component: string): Tier | undefined {
  return TAXONOMY[component];
}

/**
 * Contested classifications, recorded so the next person doesn't relitigate
 * them from scratch. Each entry says what else it could plausibly be and why
 * the current call was made.
 */
export const CONTESTED: Record<string, string> = {
  card: "Could be an atom — it is a styled box. Molecule because CardHeader/CardTitle/CardContent are a compositional unit, not one surface.",
  calendar: "Could be a molecule. Organism because it owns month/range/selection state and keyboard navigation.",
  'date-picker': "Organism rather than molecule because it portals a Popover and owns open/close plus the Calendar's state.",
  tooltip: "Molecule despite portalling, because it holds no state a consumer reads or controls.",
  'scroll-area': 'Atom despite wrapping children — it adds a scroll surface, not composition.',
  table: "Organism, not molecule: `table.tsx` holds five pieces of internal state (sort, selection, pagination, ...).",
  'radio-group': 'Molecule: the group plus its items is the unit; neither half is useful alone.',
};
