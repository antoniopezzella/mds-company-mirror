/**
 * Marsh Design System — public package entry point.
 *
 * The shadcn/Radix + Tailwind component set (the actively-maintained,
 * canonical half of the system) plus the design-token and theming APIs.
 * The remaining MUI-only components are not exported here — see
 * docs/SHADCN_MIGRATION_STATUS.md for what's pending and why.
 */

// Design tokens / theme API — the governance layer components consume.
export { getRoleColor } from './theme/roles';
export type { RoleName } from './theme/roles';

// Theming providers. RoleVarsProvider publishes `var(--role-*)` for CSS/SCSS
// contexts that can't call getRoleColor(); ThemeModeProvider gives consumers a
// controlled light/dark toggle instead of the OS-preference fallback.
export { RoleVarsProvider } from './theme/RoleVarsProvider';
export type { RoleVarsProviderProps } from './theme/RoleVarsProvider';
export { ThemeModeProvider, ThemeModeContext, useThemeMode } from './theme/ThemeModeContext';
export type { ThemeMode } from './theme/ThemeModeContext';

// Data formatting. Dashboards are mostly numbers, and before this the repo had
// exactly one `Intl.*` call site — in a story — while currency was produced
// four different ways. `cn` is exported here too; it was previously
// unreachable by consumers despite being the documented way to merge classes.
export {
  formatCurrency,
  formatNumber,
  formatCompact,
  formatPercent,
  formatDelta,
  formatDate,
  formatRelative,
  formatValue,
  toFiniteNumber,
  toValidDate,
  EMPTY_VALUE,
} from './lib/format';
export type {
  Formattable,
  FormatKind,
  BaseFormatOptions,
  NumberFormatOptions,
  CurrencyFormatOptions,
  DateFormatOptions,
} from './lib/format';
export { FormatProvider, useFormat, useFormatConfig } from './lib/format-context';
export type { FormatConfig, FormatProviderProps } from './lib/format-context';
export { cn } from './lib/utils';

// Components (shadcn/Radix + Tailwind)
export * from './components/ui/accordion';
export * from './components/ui/alert';
export * from './components/ui/aspect-ratio';
export * from './components/ui/attachment';
export * from './components/ui/avatar';
export * from './components/ui/badge';
export * from './components/ui/badge-anchor';
export * from './components/ui/breadcrumbs';
export * from './components/ui/bubble';
export * from './components/ui/button';
export * from './components/ui/button-group';
export * from './components/ui/calendar';
export * from './components/ui/card';
export * from './components/ui/carousel';
export * from './components/ui/chart';
export * from './components/ui/checkbox';
export * from './components/ui/chip';
export * from './components/ui/filter-chip';
export * from './components/ui/collapsible';
export * from './components/ui/combobox';
export * from './components/ui/command';
export * from './components/ui/control-size';
export * from './components/ui/context-menu';
export * from './components/ui/data-state';
export * from './components/ui/data-table';
// The feature set + its type aliases. `DataGridColumnDef` in particular MUST
// be reachable: it is what keeps a consumer's column arrays writing two
// generic params after TanStack v9 made ColumnDef take three.
export * from './components/ui/data-grid-features';
// The composable grid. `DataTable` (above) is the batteries-included preset
// over exactly these parts; reach for them directly when you need to compose.
export * from './components/ui/data-grid';
export * from './components/ui/data-grid-table';
export * from './components/ui/data-grid-rows';
export * from './components/ui/data-grid-selection';
export * from './components/ui/data-grid-bulk-actions';
export * from './components/ui/data-grid-row-actions';
/**
 * The query system (§1-74). Exported under a namespace because several names
 * — FilterField, FilterOption — also exist on the older value-model modules
 * below, which remain until their consumers migrate.
 */
export * as FiltersQuery from './components/ui/filters';
/*
 * The flat list is the surface a consumer actually reaches for. It previously
 * promoted `FiltersRule` and `FiltersValueEditor` — internals of the bar —
 * while `useFilterQuery` and `FiltersBuilder` were namespace-only. That was
 * backwards twice over: the hook's own doc calls it "the one-line way to wire
 * filters up", and `Filters.onEditAdvanced` exists specifically to route a
 * user to the builder, so the advertised destination was not in the surface.
 *
 * It also cost the hook its lint coverage — `eslint-plugin-react-hooks` does
 * not recognise `FiltersQuery.useFilterQuery()` as a hook call, so none of
 * the rules-of-hooks checks applied to the primary entry point.
 *
 * Internals stay reachable through the namespace.
 */
export {
  Filters,
  FiltersBuilder,
  FiltersFieldPicker,
  useFilterQuery,
} from './components/ui/filters';
export * from './components/ui/filter-schema';
export * from './components/ui/filter-controls';
export * from './components/ui/filter-field-control';
export * from './components/ui/use-data-grid-table';
export * from './components/ui/data-grid-cell-selection';
export * from './components/ui/data-grid-clipboard';
export * from './components/ui/data-grid-cell-edit';
export * from './components/ui/data-grid-toolbar';
export * from './components/ui/data-grid-pagination';
export * from './components/ui/date-picker';
export * from './components/ui/dialog';
export * from './components/ui/drawer';
export * from './components/ui/dropdown-menu';
export * from './components/ui/empty';
export * from './components/ui/error-state';
export * from './components/ui/field';
export * from './components/ui/filter-bar';
export * from './components/ui/header';
export * from './components/ui/hover-card';
export * from './components/ui/icon';
export * from './components/ui/icon-names';
export * from './components/ui/image-with-fallback';
export * from './components/ui/input-group';
export * from './components/ui/input-otp';
export * from './components/ui/input';
export * from './components/ui/label';
export * from './components/ui/list';
export * from './components/ui/marker';
export * from './components/ui/mega-menu';
export * from './components/ui/menubar';
export * from './components/ui/notifications-drawer';
export * from './components/ui/message-scroller';
export * from './components/ui/message';
export * from './components/ui/metric-card';
export * from './components/ui/page-shell';
export * from './components/ui/pagination';
export * from './components/ui/popover';
export * from './components/ui/progress';
// `export *` does not re-export a default, so the `{ Circular, Linear }`
// grouping was unreachable from the package while CircularProgress and
// LinearProgress were not. Named explicitly so the published surface matches
// the module's own API.
export { default as Progress } from './components/ui/progress';
export * from './components/ui/questionnaire';
export * from './components/ui/radio-group';
export * from './components/ui/resizable';
export * from './components/ui/scroll-area';
export * from './components/ui/select';
export * from './components/ui/separator';
export * from './components/ui/sheet';
export * from './components/ui/side-navigation';
export * from './components/ui/skeleton';
export * from './components/ui/slider';
export * from './components/ui/sparkline';
export * from './components/ui/spinner';
export * from './components/ui/stack';
export * from './components/ui/stat-card';
export * from './components/ui/status-card';
export * from './components/ui/stepper';
export * from './components/ui/switch';
/**
 * The legacy table engine. Deprecated, but still the published `Table` — see
 * the note below.
 */
export * from './components/ui/table';
/**
 * The markup primitives.
 *
 * `Table` itself is NOT re-exported here: that name currently belongs to the
 * deprecated engine above, which has been a published export since 0.6.0
 * while its deprecation is dated "since 0.7.0" — a version that has never
 * shipped. No consumer has been warned yet, so taking the name now would
 * break an API nobody was told about.
 *
 * The other seven have no such conflict and are useful immediately. `Table`
 * joins them when the legacy engine is removed after 0.8.0.
 */
export {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table-primitives';
export * from './components/ui/tabs';
export * from './components/ui/taxonomy';
export * from './components/ui/z-index';
export * from './components/ui/text-field';
export * from './components/ui/textarea';
export * from './components/ui/toast';
// toast()/useToast() live here — without them Toaster ships with no way to fire it.
export * from './components/ui/use-toast';
export * from './components/ui/toaster';
export * from './components/ui/toggle-group';
export * from './components/ui/toggle';
export * from './components/ui/tooltip';
export * from './components/ui/website-header';
