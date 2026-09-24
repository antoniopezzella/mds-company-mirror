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
export * from './components/ui/collapsible';
export * from './components/ui/combobox';
export * from './components/ui/command';
export * from './components/ui/control-size';
export * from './components/ui/context-menu';
export * from './components/ui/data-state';
export * from './components/ui/data-table';
export * from './components/ui/date-picker';
export * from './components/ui/dialog';
export * from './components/ui/drawer';
export * from './components/ui/dropdown-menu';
export * from './components/ui/empty';
export * from './components/ui/error-state';
export * from './components/ui/field';
export * from './components/ui/header';
export * from './components/ui/hover-card';
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
export * from './components/ui/table';
export * from './components/ui/tabs';
export * from './components/ui/taxonomy';
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
