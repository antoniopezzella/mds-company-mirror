# MDS roadmap — four goals

**Last updated:** 2026-10-06 (corrected after Run 5) · **Measured at:** `d06b80b`
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

### CORRECTED 2026-10-06 (Run 5) — the mechanism does not ship

An earlier revision of this section called the typography context "proven, in
production, and the thing to generalise". **That was wrong, and it was the
load-bearing claim of this document.** Measured at `d06b80b`:

```
mds-dashboard in dist-pkg/styles.css : 0
mds-marketing in dist-pkg/styles.css : 0
--typo-* vars shipped                : 15 of ~105 (font-family only)
.mds-marketing call sites            : 0   (and it restates :root verbatim)
portalled surfaces re-applying scope : 1 of 10
```

`src/styles.package.css` imports `typography-variables.css` — a flat, unscoped
`:root`. Only `global.scss` and `.storybook/preview.tsx` import the file that
has the scopes. So `--typo-h1-font-family` is **Marsh Serif in the app and Noto
Sans in the package**: the same variable, opposite defaults.

Three structural holes, all of which the colour conversion would inherit:

1. **It is absent from the artifact consumers install.** A consumer adding
   `className="mds-dashboard"` gets nothing; no selector matches.
2. **There is no neutral core.** `:root` *is* the marketing expression, so every
   unscoped surface is silently opted into it. Carbon Core is neutral and each
   expression layers onto it. And `.mds-marketing` is a no-op at 0 call sites —
   one expression plus a default, not two.
3. **It does not survive a portal.** 10 `ui/` modules portal to `document.body`
   and lose the scope by construction; **1** re-applies it. `CLAUDE.md:270`
   prescribes the fix and no gate enforces it.

**CORRECTED AGAIN 2026-10-06.** An earlier revision of this paragraph said to
fix typography first *because it would validate the mechanism for colour*. That
is wrong: the two need different mechanisms. Typography is 7 variants × 2
surfaces — enumerable, so explicit utility classes win. Colour is 55 roles × N
surfaces — not enumerable, so it genuinely needs scoped variables. Typography
proves nothing about colour.

Both are still worth doing; they are simply independent. See
[`tasks/typography-system.md`](./tasks/typography-system.md) for the typography
proposal. And note that with Marsh consolidating to a single brand, the colour
conversion's primary justification — serving a second brand — is weaker than
when this document was written; what remains is dark-mode maintainability (64
hand-written twins that can drift) and alpha at call sites.

> The authoring API is a separate question and remains open. An ambient context
> is invisible at the call site, which is a real objection to using it as the
> way developers write headings. The *mechanism* (scoped variables) and the
> *API* (how you ask for a heading) are independent choices; nothing here
> settles the second.

| Work | Effort | Note |
|---|---|---|
| **Fix the three typography holes first** | **S** | 15 vars, 8 call sites. Validates the mechanism before betting the colour tier on it |
| Convert `getRoleColor()` → `var(--role-*)` across 71 modules | **L** | Only after the above. Highest-traffic first; track inline styles down from 272 |
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

- **Registry is now a real install path.** 112 items, and the gate checks the
  dependency *graph*, not just the index: every internal import must resolve to
  a file the item ships or declares. That found **75 under-declared edges
  across 38 items** (`data-table` declared 7 and imported 11) and **2 files
  owned by no item**. All closed; `npm run registry:fix` re-derives edges.
  Proven by deleting an edge and an owner — exit 1 on each, naming the item.
- **First block shipped — and it ships four wrong numbers.** `marsh-dashboard`
  renders renewal rate as `0.9%` instead of `91.4%` and three deltas as `0%`,
  because `data.tsx` supplies ratios to a formatter that takes percentages.
  Three green gates missed it. See P0-B. **Fix before anyone copies it.**
- **Role-usage gate fixed and actually running.** It had been parsing 6 of 55
  role names and appearing in no workflow.
- **a11y gate self-tests — the repo's only mutation test.** It silently checked
  nothing once; a deliberate violation now has to make it go red, and that runs
  on every PR. One flaw: it matches any `/\d+ failed/` and never greps for
  `button-name`, so a compile error in the probe reads as a healthy gate. One
  line fixes it.

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
| `forwardRef` on the load-bearing modules | **M** | **30** public modules expose no ref path (Run 4 said 33; three were Radix aliases that forward natively). Peer range is `^18 \|\| ^19` |\| ^19` |
| Apply the context to the portalled surfaces + a gate | **S** | **10** portal to `document.body`; **1** re-applies it. A dialog in a dashboard renders its heading in Marsh Serif. This is typography hole #3 |

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
   alpha and per-expression blocks are all cheap *after* the 515 call sites
   move, and impossible before. **And the typography holes gate the conversion** —
   fixing them for an S is what proves the mechanism is worth the L.
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
expressions   typography: 6 context-sensitive components, ships in NOTHING  ·  colour: 2 on var(--role-*), 515 hex call sites
adoption      registry 111 items · blocks 1 · described 27/93 · argTypes 33/93 · maturity labels 0/94
job           dark failures 71 (14 shipped) · chart tokens ungoverned · meta.type aligns but does not format
survival      contributors 2 · releases 8 · gates 11 · coverage gate never run · visual regression absent
```
