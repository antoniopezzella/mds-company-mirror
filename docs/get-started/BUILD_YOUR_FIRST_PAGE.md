# Build Your First Page

An end-to-end walkthrough: a new route, a page built from real components in
`src/components/ui/`, laid out with Tailwind grid, colored entirely through
role tokens. By the end you'll have a working `/hello` page.

If you haven't yet, read [Developer Get Started](./DEVELOPERS.md) first —
this walkthrough assumes you know the difference between the current stack
(`src/components/ui/` + Tailwind, what we're using here) and the legacy MUI
stack.

## 0. Before you start

Run `npm run dev`, then browse **`/design-system`** — check whether
something close to what you're building already exists. This walkthrough
builds a small stats page from scratch on purpose, to show the pieces; in
real work, reach for an existing component first.

## 1. Add the route

Routes live in `src/Router.tsx` as a flat list — no nested config, no route
manifest to register elsewhere. Lazy-load your page component next to the
others near the top of the file:

```tsx
const HelloPage = lazy(() => import('./pages/HelloPage'));
```

Then add a `<Route>` inside the `<Routes>` block:

```tsx
<Route path="/hello" element={<HelloPage />} />
```

## 2. Create the page file

`src/pages/HelloPage.tsx`:

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getRoleColor } from '@/theme/roles';

const stats = [
  { label: 'Active policies', value: '1,204' },
  { label: 'Open claims', value: '38' },
  { label: 'Renewals this month', value: '12' },
];

export default function HelloPage() {
  return (
    <div className="mx-auto max-w-container px-4 min-[576px]:px-6 min-[1200px]:px-12 py-12">
      <h1
        className="text-3xl font-semibold mb-6"
        style={{ color: getRoleColor('fg.primary') }}
      >
        Hello, MDS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle>{stat.value}</CardTitle>
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Get started</CardTitle>
          <CardDescription>This card and the three above it are the same component.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="primary" size="md">
            Take action
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

What each piece is doing:

- **Layout** — `grid grid-cols-1 md:grid-cols-3 gap-6`: one column on
  mobile, three from the `md` breakpoint up. Plain Tailwind, no custom CSS.
  See [Foundations/Grid](http://localhost:6006/?path=/docs/foundations-grid--docs)
  for the full utility reference.
- **Container** — `max-w-container px-4 min-[576px]:px-6 min-[1200px]:px-12`
  lines this page up with the Header/Hero content edge. See
  ["Picking the right container"](./DEVELOPERS.md#5-picking-the-right-container)
  in the Developer guide if a section needs the *other* container instead.
- **Components** — `Card`/`CardHeader`/`CardTitle`/`CardDescription`/
  `CardContent` and `Button` are imported straight from
  `@/components/ui/*`, same as any other page.
- **Color** — the one hardcoded-looking value here is `text-3xl
  font-semibold`, which is type scale and weight, not color. The heading's
  actual color comes from `getRoleColor('fg.primary')`, and `Card`/
  `Button` already resolve their own colors internally — you never see a
  hex value in this file.

## 3. Run it

```bash
npm run dev
```

Visit `http://localhost:5173/hello`. Toggle dark mode (wherever your app's
theme toggle lives) and confirm the page follows — if it doesn't, the most
likely cause is a color that bypassed `getRoleColor()`; see
[Tokens → Enforcement](../foundations/TOKENS.md#-enforcement).

## 4. Check it

```bash
npm run roles:check   # confirms no direct token/hex usage snuck in
npx tsc --noEmit       # type-check
npm run lint           # ESLint
```

## 5. Where to go from here

- Building something more real? Check `/design-system` for the component
  you actually need — this walkthrough only used `Card` and `Button` to
  keep the example short.
- Need a color, spacing, or shadow value that doesn't have a role yet? See
  [Tokens](../foundations/TOKENS.md) and the
  [token request process](../TOKEN_REQUEST_PROCESS.md).
- Adding a brand-new component to the library itself (not just a page that
  uses existing ones)? See the component checklist in the root
  [`CLAUDE.md`](../../CLAUDE.md#component-checklist-for-ai-code-generation).
