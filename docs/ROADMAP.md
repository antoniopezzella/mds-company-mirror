# MDS roadmap — four goals

**Last updated:** 2026-10-06 · **Measured at:** `4343b98`
**Supersedes:** the 30/60/90 list in [`PRODUCTION_READINESS.md`](./PRODUCTION_READINESS.md) §(d), which is now a pointer here. That document is the **audit** — what is true today, scored. This one is the **plan** — what we are doing about it, and why.

Every open item from Run 4 of the audit maps to exactly one of the four goals
below. If a piece of work does not map to one, it is not on the roadmap.

**The strategic target:** Carbon's model — *one core, several expressions*.
Carbon ships Carbon Core plus For Products, For Cloud and For AEM: the same
tokens and components, different surface, audience and platform. The Marsh
equivalent is one core serving dashboards, marketing, and AEM-delivered
surfaces. Goal 1 is the only thing standing between here and that.

---

## Goal 1 — One core, several expressions

**Done means:** a second expression exists, built by changing scoped CSS
variables, with zero component edits.

### The thing almost nobody notices: this already works, for typography

`src/styles/_typography.scss` is Carbon's model, implemented and shipping:
`:root` carries the core, `.mds-dashboard` redefines **15 variables**, and
**25 components** read `var(--typo-*)` without knowing which context they are
in. Marsh Serif headings in marketing, Noto Sans 700 in product — one
component set, two expressions, selected by a class on a subtree.

**That is the whole mechanism.** It is proven, in production, and it is the
thing to generalise.

### Why colour cannot do the same thing today

| | typography | colour |
|---|---:|---:|
| variables published | 15 per context | **110** (55 roles × light/dark) |
| components reading the variable | **25** | **3** |
| components resolving a value instead | — | **115** |
| call sites resolving to hex | — | **580** |

`getRoleColor()` returns a resolved hex string into an inline `style={{}}`.
An inline style outranks every stylesheet, so **no scope can override it** —
not `.mds-dashboard`, not `.dark`, not a brand class. The role tier already
publishes all 55 roles statically in both modes; almost nothing consumes them
that way.

So the work is **unwinding, not inventing**. `button.tsx` is the worked
example and the conversion is mechanical.

| Work | Effort | Note |
|---|---|---|
| Convert `getRoleColor()` → `var(--role-*)` across 115 components | **L** | Highest-traffic first. Track the inline-style count down from 580 |
| Define what a Marsh "expression" is, and name the first two | **S** | A decision, not code. Is AEM an expression or a delivery target? |
| Add an expression scope (`.mds-<expression>`) redefining role vars | **S** | Trivial *after* the conversion; impossible before it |
| A gate that fails on a new `getRoleColor()` in an inline style | **S** | Stops the hole being re-dug while it is being filled |
| Alpha at call sites via Tailwind's `/N` | **S** | Free once components use classes. Needs `@theme inline`; see note below |
| Per-expression blocks | **M** | `marsh-dashboard` exists; marketing and AEM follow |

> **`@theme inline` is mandatory for the alpha work.** Registering roles as
> `--color-role-*` makes `bg-role-surface-hero/10` work via `color-mix(in
> oklab, …)`. Non-inline `@theme` resolves the `var()` at `:root` and silently
> breaks dark mode — measured: dark rendered the light value.

---

## Goal 2 — Another team can adopt it

**Done means:** a team outside this repo installs it, finds what exists, and
trusts the docs — without asking the maintainer.

### Done since the audit

- **Registry is a real install path.** It listed 71 of 94 components, and the
  eleven shared modules a copied component needs — `data-grid-features.ts`
  among them — were absent entirely, so `npx shadcn add data-table` produced
  code that did not compile. Now 111 items, every dependency resolving, gated
  by `npm run registry:check` on every PR.
- **First block shipped.** `marsh-dashboard` — a whole page you copy and edit.
- **Role-usage gate fixed and actually running.** It had been parsing 6 of 55
  role names and appearing in no workflow.
- **a11y gate self-tests.** It silently checked nothing once; now a deliberate
  violation must make it go red.

| Work | Effort | Note |
|---|---|---|
| Document props on the 15 most-used components | **M** | 27 of 93 have a description; 33 have argTypes, so the Controls panel works for a third of the library. `avatar` is 19/19 undocumented |
| `marsh-detail` block (master/detail) | **M** | Client Pivot View and RESG ClientSummary are already this shape — extraction, not invention |
| Maturity labels | **S** | 0 of 94. A consumer cannot tell experimental from stable |
| Pick an import convention and lint it | **S** | Colleague Profile uses 47 alias imports; RESG uses 11 relative. Nothing enforces either |
| Move repo + package to a Marsh org | **L** | Organisational. See Goal 4 |

---

## Goal 3 — It does the dashboard job properly

**Done means:** the defects a consuming team would hit in week one are gone.

| Work | Effort | Note |
|---|---|---|
| **Wire `formatValue` into the grid behind `meta.type`** | **M** | `meta.type` accepts `currency`/`date`/`percent` and only **right-aligns**. Declare a column `currency`, render `137000`. Closes the audit's P0-12 **and** gives `FormatProvider` its adoption — the reason dashboard readiness has not moved in two runs |
| Clear the 14 `ui/` dark-mode failures, then gate `test:dark` on that subset | **M** | 71 failures total; 14 are in shipped components, the rest legacy MUI |
| Bring chart colours into the token pipeline | **M** | 10 hand-written values outside it; `grep -c chart dist/tokens.json` → 0. Series colour is exactly what needs contrast validation |
| Warn when `pageSize` is large and `maxHeight` absent | **S** | Virtualization is opt-in: `<DataTable pageSize={1000}/>` silently gives 5,062 DOM nodes and a 222 ms sort |
| `forwardRef` on the load-bearing modules | **M** | 33 public modules expose no ref path; 14 more only under React 19, while the peer range is `^18 \|\| ^19` |
| Apply `.mds-dashboard` to the 11 portalled surfaces + a gate | **S** | 12 portal to `document.body`; 1 re-applies the context. A dialog in a dashboard renders its heading in Marsh Serif |

---

## Goal 4 — It survives its maintainer

**Done means:** someone other than the author can review, release and answer
for it.

| Work | Effort | Note |
|---|---|---|
| Repo + package to a Marsh-owned org, team CODEOWNERS, branch protection | **L** | 357 of 358 commits by one author; all 11 CODEOWNERS entries one person; install needs a personal-account PAT. **Whether any green gate is required to merge is unverified** — `gh` was unavailable to the audit |
| State a conformance level | **M** | No WCAG level claimed, no VPAT, no screen-reader artefact — while Carbon states WCAG 2.1 AA / Section 508 / EN 301 549. Our automated testing is ahead of our claims, which is the rare direction |
| Make `test:coverage` run, then gate it | **S** | It crashes, so thresholds have **never once** been evaluated |
| Stand up visual regression | **M** | Two mechanisms installed and dormant: `scripts/visual-baseline.js` has no npm script, `@chromatic-com/storybook` is unregistered |
| A contribution path that works from outside this repo | **M** | Carbon's model is "users are also its makers". Ours has no external path |

---

## Sequencing

Goals are not phases — Goal 3 can run in parallel with anything. But two
orderings are forced:

1. **Goal 1's conversion gates Goal 1's everything else.** Expression scopes,
   alpha and per-expression blocks are all cheap *after* the 580 call sites
   move, and impossible before.
2. **Goal 4's org move gates Goal 2's adoption.** A team can evaluate the
   system now; it cannot depend on it until distribution leaves a personal
   account.

Suggested order if one person is doing this:

| | |
|---|---|
| **Now** | Goal 3's grid formatting (closes a P0 and an adoption gap in one change) |
| **Next** | Start Goal 1's conversion on the highest-traffic components, with the gate in place first so the hole stops being re-dug |
| **In parallel** | Goal 2's documentation — it needs no code and benefits every other goal |
| **Needs a decision, not a sprint** | Goal 4's org move. Start the conversation now; it has the longest lead time and blocks the most |

---

## Tracking

Re-run `/audit` to re-measure. The numbers in this document are the baseline:

```
expressions   typography: 25 components on var(--typo-*)  ·  colour: 3 on var(--role-*), 580 hex call sites
adoption      registry 111 items · blocks 1 · described 27/93 · argTypes 33/93 · maturity labels 0/94
job           dark failures 71 (14 shipped) · chart tokens ungoverned · meta.type aligns but does not format
survival      contributors 2 · releases 8 · gates 11 · coverage gate never run · visual regression absent
```
