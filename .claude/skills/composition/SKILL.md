---
name: composition
description: How to build UI in this repo — choosing an existing component over a new one, the atom/molecule/organism/template taxonomy, page scaffolding with PageShell, layout with Stack/Inline/grid, and the spacing and colour rules that are enforced. Use when building a page, screen, section, layout or new component, when asked for an "atom/molecule/organism/template", or when deciding which existing component to reach for.
---

# Building UI in this repo

## Read this first: do not build a new component

73 components already exist. The most common failure mode here is not bad
code — it is building the 74th thing that already existed as a prop on the
9th. Work down this ladder and **stop at the first step that works**:

1. **Does it exist?** Check the taxonomy (below), `src/components/ui/`, or run
   `npm run dev` and browse `/design-system`.
2. **Does a prop cover it?** A new `variant`, `tone` or `size` value is far
   cheaper than a new component. Read the component's `.stories.tsx` before
   concluding the prop isn't there — the stories are the API documentation.
3. **Can you compose it?** `Card` + `Inline` + `Button` covers most "new"
   patterns with no new component code.
4. **Only then build**, following the checklist at the bottom.

## The taxonomy

Classification lives in **`src/components/ui/taxonomy.ts`**, not in the folder
structure — files stay flat, the same way shadcn/ui, Radix, MUI and Polaris
do it. Import it; don't re-derive it.

```ts
import { TAXONOMY, TIERS, byTier, tierOf, CONTESTED } from '@/components/ui/taxonomy';

tierOf('data-table');  // 'organism'
byTier('template');    // ['page-shell']
```

| Tier | The test | Reach for it when |
| --- | --- | --- |
| **atom** | Renders no other MDS component. | You need one styled surface. |
| **molecule** | Composes atoms into one unit; owns no page or server state. | **Start here.** Most feature code should live at this level. |
| **organism** | Owns its own behaviour/state, or occupies a whole page region. | You need data in and events out. |
| **template** | Structure and slots only; no business data, no domain vocabulary. | You are starting a page. |

A module may export several components and they share its tier (`stack`
exports `Stack` and `Inline`). Contested calls are recorded in `CONTESTED`
with the reasoning — read it before relitigating one.

**`taxonomy.test.ts` fails if a component on disk is unclassified**, so adding
a component means adding its tier. That is deliberate.

## Building a page

Start from the template. Do not hand-roll the frame:

```tsx
import { PageShell, PageHeading, Stack, Inline } from '@/components/ui';

<PageShell
  header={<Header sidebarOpen={open} onToggleSidebar={toggle} />}
  sidebar={<SideNavigation items={items} className="fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto" />}
  sidebarOpen={open}
  onSidebarClose={close}
>
  <PageHeading title="Overview" description="…" actions={<Button>New</Button>} />
  <Stack gap={6}>
    {/* sections */}
  </Stack>
</PageShell>
```

`PageShell` exists because the scaffold is easy to get subtly wrong: the
sidebar is `fixed` + scrim below `lg` and `static` above it, and there is a
`min-w-0` chain that must run down **every** flex ancestor between the page
and a wide table. A flex item defaults to `min-width: auto` and refuses to
shrink below its content, so one missing `min-w-0` makes the entire page
scroll sideways — presenting as a table bug that isn't one.

## Layout

| Need | Use | Not |
| --- | --- | --- |
| Things stacked vertically | `<Stack gap={n}>` | `flex flex-col gap-n` |
| Things in a row, wrapping | `<Inline gap={n}>` | `flex flex-wrap gap-n` |
| Two-dimensional layout | grid utilities — `src/docs/35-Grid.mdx` | nested Stacks |
| Page frame | `<PageShell>` | a hand-rolled grid |

`Stack`/`Inline` exist to make the spacing scale a **type**: `gap` only accepts
steps that exist in `src/spacing.ts`, so `gap={7}` (28px, off-scale) is a
compile error rather than a layout that is quietly 4px wrong.

Reach for the grid utilities, not three nested Stacks, whenever the layout is
genuinely two-dimensional — `35-Grid.mdx` has five worked patterns
(main+sidebar, auto-fit cards, variable-height dashboard, fixed sidebar,
responsive reordering).

## Spacing — enforced, not advisory

`npm run composition:check:strict` runs in CI via `governance:ci` and **fails**
on:

- **Arbitrary values.** `p-[16px]` is just `p-4` spelled so it bypasses the
  scale. `gap-[8px]` appeared five times before the gate existed.
- **Off-scale steps.** `gap-7` (28px) and `pr-9` (36px) compile fine and are
  not design system values.

Allowed: `p-[var(--x)]` — reading a token is the sanctioned use of an
arbitrary value.

Escape hatches, matching `check-role-usage.js`: `spacing-allow` on the line,
`spacing-allow-file` anywhere in the file. Use them for values derived from a
control's **geometry** (the 28px indent that aligns checkbox helper text under
its label; the 36px padding that clears a calendar icon button), not to dodge
a spacing decision — and always say which in the comment.

Other rules:

- **Prefer `gap-*` over margins** for spacing children. It cannot collapse or
  double up. Current ratio: 246 gap utilities to 108 margin ones.
- **Prefer logical properties** (`ms-`/`me-`/`ps-`/`pe-`) over physical
  (`ml-`/`mr-`/`pl-`/`pr-`) in new code. Currently 61 physical, 0 logical —
  reported by the gate as advisory. The number should shrink, not grow.
- **2px half-steps** (`gap-0.5`, `p-1.5`, `py-2.5`) are sanctioned. See
  `src/docs/30-Spacing.mdx`.

## Control sizes

One scale for buttons **and** fields, in `src/components/ui/control-size.ts`:
`sm` 32px, `md` 40px, `lg` 48px. Never write a control height inline — import
`CONTROL_HEIGHT`/`CONTROL_PX`/`CONTROL_TEXT`/`CONTROL_ICON`, or call
`controlSizeClasses(size)`.

Every control resolves its size through `useControlSize(explicit)`, which
falls back to the enclosing group and then to `md`. Reading the context by
hand is how one component ends up defaulting differently from the rest.

```tsx
// Grouped: declare once, children inherit via context.
<ButtonGroup size="sm">
  <Input placeholder="Policy number" />
  <DSSelect options={…} aria-label="Coverage" />
  <Button variant="primary">Search</Button>
</ButtonGroup>
```

`Textarea` takes padding and type but no fixed height. Checkbox/Radio/Switch
are glyphs and stay on their own scale.

Verify against **Components → Form Controls**, which renders every control at
every size with its measured height — the only place cross-component drift is
visible.

### Selects need an accessible name

Radix renders Select and Combobox triggers as `role="combobox"`, and ARIA does
**not** allow name-from-content for that role — so placeholder and
selected-value text contribute nothing to the accessible name. A label-less
`DSSelect` or `Combobox` fails axe `button-name` and breaks the build. Pass a
visible `label`, or `aria-label`/`aria-labelledby`.

## Heading order

`PageHeading` renders an `<h1>`. Several components render their own heading
at a fixed level — **`StatCard` emits an `<h3>` and offers no way to change
it** — so dropping a stats grid straight under the page title skips `<h2>` and
fails the axe `heading-order` rule, which breaks the build.

Group such cards in a `<section>` with a visually hidden heading. It costs
nothing visually and gives screen-reader users a real landmark:

```tsx
<section className="mb-8">
  <h2 className="sr-only">Key metrics</h2>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <StatCard … />
  </div>
</section>
```

This is not hypothetical — `page-shell.stories.tsx` failed exactly this way on
its first run.

## Colour

Never hardcode a colour. Two mechanisms, and the difference matters:

```tsx
// Role token — resolved at render, returns a hex string.
style={{ color: getRoleColor('text.primary') }}

// Semantic Tailwind class — resolves through a CSS variable.
className="bg-primary text-primary-foreground"
```

**58 of 73 components set colour via `getRoleColor()` in an inline style.**
`cn()` is `twMerge(clsx(...))`; it resolves conflicts *between Tailwind
classes* and is powerless against `style={{}}`. So on those components a
consumer's `className="bg-slate-800"` silently loses. If someone reports "my
className doesn't work", check for an inline style first.

`npm run roles:check` reports direct `tokens.*` / `semanticColors.*` usage
(hard failure) and hex literals (advisory).

## Where the generic shadcn skill is wrong for this repo

The bundled `shadcn` skill is the upstream vendor skill — it has zero
knowledge of Marsh, MDS, `getRoleColor` or `token-variables.css`. When it and
this file disagree, **this file wins**:

| Generic shadcn says | Here |
| --- | --- |
| Style with `className` | 54 of 73 components use inline `style={{}}`; className loses (above) |
| `rounded-md` is the default radius | `rounded-xs` = 2px is the Marsh standard; `rounded-sm` = 4px |
| `size="default"` | `sm` / `md` / `lg` / `xl`, normalised by `prop-compat.ts` |
| `variant="destructive"` for everything | Actions use `tone="danger"`; **form fields use `error`** — different axes, deliberately |
| Components are self-contained | Changing `src/components/ui/` styling requires `npm run build:css`, or consumers get unstyled markup |

Also repo-specific: Radix portals (`Dialog`, `Sheet`, `Popover`,
`DropdownMenu`, `Tooltip`) render to `document.body` and **do not inherit**
page-wrapper classes or CSS-variable scopes. Re-apply the scope on the
portaled content — `notifications-drawer.tsx` does this deliberately.

For Tailwind mechanics — v4 syntax, the `@import` ordering trap, why a class
might not exist, the package stylesheet — see the **`tailwind`** skill.

## Checklist before you call it done

1. `npx tsc -p tsconfig.app.json --noEmit` clean.
2. `npm run composition:check:strict` — spacing on scale.
3. `npm run roles:check` — no direct token usage.
4. New component? Add it to `taxonomy.ts` (the test fails otherwise), write a
   `.stories.tsx` with every variant, and a `.test.tsx`.
5. `npm test` — axe runs on every story with `a11y: { test: 'error' }`, so an
   accessibility violation breaks the build.
6. Changed `src/components/ui/` styling? `npm run build:package`.
7. Cross-cutting change? Run the visual baseline — a config change can alter
   hundreds of components with no build error:
   ```bash
   npx storybook build -o dist/storybook
   node scripts/visual-baseline.js capture <dir>
   node scripts/visual-baseline.js compare <baseline> <current>
   ```
8. Check dark mode. `darkMode: ['class']` keys off `.dark` on `<html>`, and
   only 2 of ~603 stories render dark — the axe gate will not catch a
   dark-mode regression for you.
