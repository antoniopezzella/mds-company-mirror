# shadcn/ui migration status

Tracks the MUI → shadcn/Radix migration on `feature/shadcn-ui-migration`, specifically the 20 components that existed in both forms simultaneously. Written as part of assessing production/external-consumption readiness — see [`MAINSTREAM_REUSE_ASSESSMENT.md`](./MAINSTREAM_REUSE_ASSESSMENT.md) for the business context.

## Resolved — MUI deleted, shadcn is canonical (17)

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

**Closed in the production-readiness pass** (2026-08-27) — real feature-parity gaps closed, not just import swaps:
- **Select**: added the missing `size?: 'small' | 'medium'` prop (15 real call sites depended on `size="small"`); widened `value`/`options` to `string | number` (a real consumer passes numeric option values); mapped Radix's empty-string-value restriction to an internal sentinel (a real consumer relies on `value: ''` for an "Unassigned" placeholder). `variant` (outlined/filled/standard) was dropped — no real consumer used it.
- **Stepper**: added back `activeStep?: number` (2 real consumers depend on it), deriving each step's status by position unless the step sets its own `status` explicitly. Discovered and fixed a real accessibility gap in the same pass: only the tiny status icon was clickable, not the whole step row (MUI's version makes the whole row clickable) — restructured to a single interactive row instead of a nested button-in-div.
- **Header (WebsiteHeader)**: built from scratch — no shadcn equivalent existed. Reproduces the scroll-triggered transparent→solid background, the full nav/language/auth-actions/mobile-drawer feature set, and (per user decision) uses the existing `Sheet` primitive for the mobile drawer rather than a new one. The scrolled-solid background uses `color-mix()` on the `interactive.primary` role's CSS var instead of the MUI version's hardcoded `rgba(0,15,71,0.92)` literal.
- **Badge**: the standalone tone-pill (`ui/badge.tsx`) already existed and was correctly scoped to the Figma "Text Badge" node — but the MUI overlay/pin pattern (a badge anchored to a corner of a child element, e.g. a notification-count pin) had no shadcn equivalent. Added `BadgeAnchor`, a positioning wrapper around the existing `Badge` rather than a reimplementation, and migrated both real consumers (a demo gallery page, and `DashboardHeader`'s raw-MUI notification badge).
- **Card**: no feature work needed — the MUI "insight/stats" Card had zero real consumers, and shadcn's `ContentCard` already matched the Figma node's real shape. Repointed Code Connect and deleted the dead MUI file.

## Deliberately kept alongside shadcn — real uncommitted work, ported rather than replacing MUI (3)

**Button, Checkbox, Chip** — per an explicit user decision, the MUI versions stay in the tree for side-by-side comparison rather than being deleted, even though no consumer imports them anymore. Their real, previously-uncommitted fixes were ported into the shadcn versions using shadcn's own mechanisms (Tailwind/CSS vars), not copy-pasted:

- **Checkbox**: the shadcn version's `getControlStyle()` didn't reproduce two Figma-verified fixes from the MUI diff — unchecked hover/active now correctly turns the border+wash to `interactive.secondary` (Active Blue, nodes 7582:7776/7582:7784) instead of leaving the border unchanged; checked-disabled vs. unchecked-disabled now get their own distinct treatment (node 7582:7818) instead of one uniform disabled style.
- **Chip**: found and fixed a real dark-mode bug the MUI diff didn't have an equivalent for — the focus ring set `--tw-ring-color` but never `--tw-ring-offset-color`, so the ring's inner gap defaulted to Tailwind's hardcoded white regardless of theme. Also simplified hover from JS-tracked `useState` to a plain `hover:` Tailwind class (no behavior change, just less code and no re-render on hover).
- **Button**: audited but **not changed** — its hover/active colors for the `primary` variant are hardcoded hex (`#082d9e`/`#0b4bff` in light mode) that don't match any existing role (`interactive.primary.hover`/`.active` resolve to different colors, `#021b6c`/`#042791`), and `#082d9e` isn't a defined token at all. This isn't a code-level oversight to silently fix — the file's own comments already flag several of these as intentionally deferred pending a token request. Rewiring it either changes the button's visual hover/active color without design sign-off, or requires filing a new token request (see `docs/TOKEN_REQUEST_PROCESS.md`) to formalize the colors already in use. Left as-is; flagged here for whoever owns that decision.

A `roles:check` false positive was also fixed in this pass: the governance script's regex matched the substring `tokens.ts` inside a comment mentioning `semantic-tokens.ts`, incorrectly flagging `ui/button.tsx`. The script now strips comments before scanning.

## Real parity gaps — none remaining

All 5 previously-open gaps (Badge, Card, Header, Select, Stepper) are resolved as of 2026-08-27 (see above).
