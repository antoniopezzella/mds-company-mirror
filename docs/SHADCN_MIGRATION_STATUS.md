# shadcn/ui migration status

Tracks the MUI → shadcn/Radix migration on `feature/shadcn-ui-migration`, specifically the 20 components that existed in both forms simultaneously. Written as part of assessing production/external-consumption readiness — see the "mainstream reuse" assessment for the business context.

## Resolved — MUI deleted, shadcn is canonical (12)

Confirmed real prop/feature parity, all consumers migrated, Figma Code Connect repointed, `tsc --noEmit` clean, zero remaining references to the old import paths.

**No consumers existed outside their own folder** — deleted directly: Avatar, Breadcrumbs, Pagination, Progress, Skeleton, Tooltip.

**Real consumers existed and were migrated** — Accordion, Alert, List, Switch, Table, Tabs. Several of these needed real example/prop rewrites during migration, not just an import path change — the shadcn versions have a *different* prop shape than the MUI originals despite being labeled "parity" at a glance:
- **Breadcrumbs**: `items: BreadcrumbItem[]` array, not children.
- **Pagination**: `currentPage`/`totalItems`/`pageSize`/`onPageChange` (required), not `count`/`page`.
- **Accordion**: `items: AccordionItem[]` array, not `title` + children.
- **Alert**: no `variant` (banner/toast/inline) concept at all.
- **Checkbox**: `invalid`, not `error`.
- **List**: `items: ListItemConfig[]` array, not `<List.Item>` children; no granular `spacing` scale, only boolean `dense`.
- **Table**: `data`/`columns: {key, header}`, not `rows`/`columns: {field, headerName}`.
- **Tabs**: `tabs: TabItem[]` with `{id, title, content}`, `defaultActiveId`, not `{label, value}` + controlled `value`.

## Deliberately not touched — real uncommitted work in progress (3)

**Button, Checkbox, Chip** — their MUI source files have real, substantial, coordinated uncommitted changes already in the working tree (a shared `getFocusRingSx(theme)` helper, Figma-node-referenced hover/active fixes, a documented stacking-context bug fix). This predates the migration work and wasn't discarded.

Consumers of these three *were* migrated to the shadcn versions — confirmed the shadcn side already has its own equivalent accessibility handling (Tailwind `focus-visible:ring-*`, Checkbox uses a dedicated CSS-variable focus ring), so nothing accessibility-wise regresses. But the MUI `Button.tsx`/`Checkbox.tsx`/`Chip.tsx` files themselves — uncommitted changes included — are still on disk, unused by app pages now, real work intact.

**This needs a human decision**: finish and commit that focus-ring work standalone, port the specific fixes into the shadcn versions, or consciously let it go now that nothing imports the MUI versions anymore.

## Real parity gaps — need feature work, not deletion (5)

Not cosmetic differences — the shadcn version is missing something the MUI version's real consumers actually depend on.

| Component | Gap |
|---|---|
| **Badge** | MUI's is an overlay/pin indicator anchored to a child (`variant: dot/number/text`, `overlap`, `anchorOrigin`). Shadcn's is a standalone tone-colored pill — a different pattern entirely, not a subset. |
| **Card** | MUI's is a narrow "insight/stats card" (title + stat grid + trend arrows). Shadcn's `card.tsx` deliberately didn't port that pattern (its own comment calls it redundant with `ChartMetricCard`) — no drop-in equivalent exists yet. |
| **Header** | Shadcn only implements the `DashboardHeader` equivalent. There is no shadcn `WebsiteHeader` or `LoggedOutHeader` at all, and both are in real use (`HeroBannerTest.tsx`, `HeroBannerGridTest.tsx`). |
| **Select** | Shadcn dropped `variant` (outlined/filled/standard) and `size` (small/medium) entirely. Real consumers actively pass `size="small"` (12 usages across `HeroBannerTestControls.tsx` and `PortfolioComponentGallery.tsx`). |
| **Stepper** | Shadcn dropped the explicit `activeStep?: number` index prop in favor of implicit per-step `status`. Real consumers pass `activeStep` directly and would fail type-check against the shadcn props as-is. |

Do not delete the MUI versions of these five until the shadcn side actually replicates the missing behavior.
