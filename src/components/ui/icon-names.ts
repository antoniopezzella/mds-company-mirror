/**
 * The blessed Material Symbols set — the single source of truth for:
 *   1. the SUBSET font (`scripts/subset-icons.mjs` ships only these glyphs, so
 *      the 4 MB full font becomes ~tens of KB),
 *   2. the `<Icon name>` TYPE (`IconName` below) — using an unlisted icon is a
 *      compile error, which is correct: the subset font would render it as an
 *      empty box,
 *   3. the Foundations/Icons gallery.
 *
 * Add an icon = add its ligature name here, then run `npm run icons:subset`
 * (and commit the regenerated woff2). Names are Material Symbols ligatures —
 * browse at fonts.google.com/icons. Keep the list CURATED: a design system
 * blesses a set, it does not ship all 3,700.
 */
export const ICON_NAMES = [
  // Status (filled) — Toast / Alert
  'info',
  'check_circle',
  'warning',
  'error',
  // Common UI
  'close',
  'search',
  'menu',
  'settings',
  'home',
  'person',
  'notifications',
  'add',
  'remove',
  'edit',
  'delete',
  'download',
  'upload',
  'content_copy',
  'arrow_back',
  'arrow_forward',
  'expand_more',
  'expand_less',
  'chevron_right',
  'check',
  'visibility',
  'visibility_off',
  'calendar_today',
  'schedule',
  'filter_list',
  'more_vert',
  'open_in_new',
  'help',
  // Data table (Figma V3 "Table New Component") — the Marsh icon set the
  // table parts are drawn with: toolbar filter, row/toolbar overflow,
  // pagination, the page-size caret and the card rating.
  'filter_alt',
  'more_horiz',
  'chevron_left',
  'first_page',
  'last_page',
  'arrow_drop_down',
  'star',
  'star_half',
  // Data table parts (component sets 17224:2211): header sort / pin / menu,
  // trend, date icon and the select editor's caret.
  'unfold_more',
  'arrow_upward',
  'arrow_downward',
  'keep',
  'keep_off',
  'trending_up',
  'trending_down',
  'calendar_month',
  'keyboard_arrow_down',
  'keyboard_arrow_up',
  // Cell state Error (alert/critical-filled is a circled cross).
  'cancel',
] as const;

export type IconName = (typeof ICON_NAMES)[number];
