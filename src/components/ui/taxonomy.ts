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
  'filter-controls': 'molecule',
  'filter-field-control': 'molecule',
  filters: 'organism',
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
  'data-grid-bulk-actions': 'molecule',
  'data-grid-row-actions': 'molecule',
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
  'table-primitives': 'atom',
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

// ─────────────────────────────────────────────────────────────────────────
// Component contracts — the "which component, when" layer
// ─────────────────────────────────────────────────────────────────────────
//
// The Storybook component manifest (features.componentsManifest) emits the
// MECHANICAL contract: props, variants, types. That tells an agent HOW to call
// a component, not WHETHER to. Research on agentic design systems is consistent
// that this second half is what tokens-plus-manifest cannot provide — "which
// component to reach for, and when NOT to use one" — and that it has to be
// machine-readable, not buried in prose.
//
// So each component gets a CONTRACT: one-line purpose, when to use it, when NOT
// to (each pointing at the right alternative), and the gotchas that surprise a
// first-time caller. An agent — or a developer — reads `contractOf('sheet')`
// and learns it is the STATIC side panel, that a swipeable one is `drawer`, and
// that it portals to document.body.
//
// This is populated incrementally and HONESTLY: a contract exists only for a
// component whose real usage boundaries are known, never fabricated to hit a
// number. `contract_coverage` in ds:score tracks the ratio so the gap is
// visible, and taxonomy.test.ts validates every contract names a real
// component for its `instead` pointers.

export interface ComponentContract {
  /** One line: what this component is for. */
  purpose: string;
  /** Situations where this is the right choice. */
  whenToUse: string[];
  /** Situations where it is the WRONG choice — each names the right component. */
  whenNotToUse?: { instead: string; because: string }[];
  /** Behaviour that surprises a first-time caller. The traps, stated plainly. */
  gotchas?: string[];
}

/**
 * Contracts, keyed like TAXONOMY (module basename). PARTIAL on purpose — only
 * components whose boundaries are genuinely understood. Add one when you know
 * the real answer, not to raise coverage.
 */
export const CONTRACTS: Record<string, ComponentContract> = {
  button: {
    purpose: 'The primary interactive action trigger.',
    whenToUse: [
      'Any click/tap action: submit, open, confirm, navigate-as-action.',
      'Pick appearance with `variant` (primary/secondary/outline/ghost) and intent with `tone` (default/danger/success) — never MUI-style `color`.',
    ],
    gotchas: [
      'For navigation to a URL use a native <a>, not a Button — there is no Link component, and a button is not a link semantically or for assistive tech.',
      '`iconOnly` renders ONLY `icon ?? startIcon ?? endIcon` and DISCARDS children. Passing an icon as a child of an iconOnly button renders an empty button. Pass it via `icon`.',
      'A text button needs no accessible-name workaround, but an `iconOnly` button needs `aria-label`.',
    ],
  },
  sheet: {
    purpose: 'A static side panel that slides in from an edge (Radix Dialog variant).',
    whenToUse: [
      'A side-anchored overlay — filters, detail, secondary nav — that opens and closes without a drag gesture.',
    ],
    whenNotToUse: [
      { instead: 'drawer', because: 'When you need swipe/drag-to-dismiss (mobile bottom-sheet behaviour). Sheet has no drag model.' },
      { instead: 'dialog', because: 'For a centred modal that is not edge-anchored.' },
    ],
    gotchas: [
      'Portals to document.body, so it sits outside a page scope. Apply typography/theme scope on the content if it needs one (notifications-drawer does).',
    ],
  },
  drawer: {
    purpose: 'A swipeable drawer with drag-to-dismiss (Base UI, not Radix).',
    whenToUse: [
      'Mobile surfaces where swipe-to-dismiss is the expected gesture — a bottom sheet you can drag closed.',
    ],
    whenNotToUse: [
      { instead: 'sheet', because: 'For a static side panel with no drag — Sheet is lighter and on Radix like the rest of the overlays.' },
    ],
    gotchas: [
      'The one component on @base-ui/react rather than Radix — intentionally, for the swipe model Radix lacks. Keep that in mind for bundle and API consistency.',
    ],
  },
  dialog: {
    purpose: 'A centred modal overlay. Exports both the composable Radix parts and an API-compatible `Modal` shim.',
    whenToUse: [
      'A focused, centred interruption: confirm, form, detail that must be dismissed before continuing.',
    ],
    whenNotToUse: [
      { instead: 'sheet', because: 'For an edge-anchored panel rather than a centred modal.' },
      { instead: 'popover', because: 'For lightweight, non-modal content anchored to a trigger.' },
    ],
    gotchas: [
      '`size` accepts sm/md/lg/fullscreen AND the legacy PascalCase (Small/Medium/…) for Code Connect parity — prefer the lowercase.',
      'For an all-destructive footer, set onOpenAutoFocus to avoid Enter firing a destructive default on open.',
    ],
  },
  'data-table': {
    purpose: 'The TanStack-based data table for sortable, filterable, paginated tabular data.',
    whenToUse: [
      'Rows of structured data needing sort, filter, pagination, selection, or custom cells.',
      'Set `meta.type` (currency/date/percent/number) for right-alignment.',
    ],
    whenNotToUse: [
      { instead: 'table', because: 'For simple static tabular layout with no sorting/filtering/pagination — table-primitives are lighter.' },
    ],
    gotchas: [
      '`meta.type` currently only drives ALIGNMENT, not formatting — the value is rendered as-is. Format in the cell or via FormatProvider.',
      'Takes `loadError`; data-grid-table does not — a failed fetch there renders like empty data.',
    ],
  },
  tooltip: {
    purpose: 'A hover/focus label anchored to a trigger (Radix, portalled).',
    whenToUse: ['A short, non-essential label or hint on hover/focus of an interactive element.'],
    whenNotToUse: [
      { instead: 'popover', because: 'For interactive or essential content — tooltips are not reachable by touch or keyboard reliably.' },
      { instead: 'hover-card', because: 'For richer preview content on hover.' },
    ],
    gotchas: [
      'Takes `title`, NOT `content` — a common mis-call from other libraries.',
    ],
  },
  alert: {
    purpose: 'An inline, persistent status message within page flow.',
    whenToUse: ['Contextual status that should stay on screen — validation summary, info banner, warning in a form.'],
    whenNotToUse: [
      { instead: 'toast', because: 'For a transient, auto-dismissing notification that floats above content.' },
      { instead: 'status-card', because: 'For a standalone status surface with title + message as a card.' },
    ],
  },
  toast: {
    purpose: 'A transient notification that floats above all overlays and auto-dismisses.',
    whenToUse: ['Brief feedback after an action — "Saved", "Copied" — that should not block.'],
    whenNotToUse: [
      { instead: 'alert', because: 'For persistent, inline status that stays until resolved.' },
    ],
    gotchas: [
      'Sits at z-index 1600, deliberately ABOVE overlays (1500), so a toast fired while a dialog is open is still visible.',
      'Render one `Toaster` near the app root; call `toast()`/`showSnackbar()` from anywhere.',
    ],
  },
  input: {
    purpose: 'A single-line text field.',
    whenToUse: ['Single-line text entry. Use `tone` (error/success/warning) for validation state.'],
    whenNotToUse: [
      { instead: 'textarea', because: 'For multi-line input.' },
      { instead: 'input-group', because: 'For an input with an adornment (icon, button, prefix) — Input has no adornment prop.' },
    ],
  },
  stack: {
    purpose: 'Vertical layout with gap on the spacing scale (also exports Inline for horizontal).',
    whenToUse: ['Stacking children vertically (`Stack`) or in a wrapping row (`Inline`). `gap` only accepts scale steps — `gap={7}` is a compile error.'],
    whenNotToUse: [
      { instead: 'page-shell', because: 'For the whole page frame — PageShell owns the min-w-0 chain and sidebar scaffold.' },
    ],
  },
  'page-shell': {
    purpose: 'The dashboard page template — header, sidebar, main, and the min-w-0 chain that stops wide tables scrolling the page.',
    whenToUse: ['Starting any dashboard page. Also provides the skip link and the dashboard typography context.'],
    gotchas: [
      'Emits an <h1> via PageHeading; a stats grid of StatCards (<h3>) placed directly under it skips <h2> and fails axe heading-order. Wrap stats in a <section> with an sr-only <h2>.',
    ],
  },
  attachment: {
    purpose: 'A file attachment chip with media, actions, and upload/processing states.',
    whenToUse: ['Showing an attached or uploading file with remove/retry actions.'],
    gotchas: [
      'AttachmentAction accepts the icon as `icon` OR as children — children are promoted to icon. (Earlier it discarded children and rendered an empty button; fixed.)',
    ],
  },
};

/** The contract for a component module, or undefined if none is written yet. */
export function contractOf(component: string): ComponentContract | undefined {
  return CONTRACTS[component];
}

/** Ratio of taxonomy'd modules that carry a contract — feeds ds:score. */
export function contractCoverage(): { withContract: number; total: number } {
  const total = Object.keys(TAXONOMY).length;
  const withContract = Object.keys(CONTRACTS).filter((k) => k in TAXONOMY).length;
  return { withContract, total };
}
