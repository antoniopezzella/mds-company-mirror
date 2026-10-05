# Responsive Vimeo cover — requirement and implementation

**Component:** `src/components/sections/HeroBanner/HeroBanner.tsx`
**Styles:** `src/components/sections/HeroBanner/HeroBanner.module.scss`
**Applies to:** any surface embedding a Vimeo player that must fill a box of
arbitrary shape — HeroBanner uses it twice, once per layout.

---

## 1. The requirement

A Vimeo embed must **fill its container completely, at any container shape,
without distortion and without letterboxing** — the behaviour `object-fit:
cover` gives an `<img>` or `<video>`.

It must do this in two structurally different containers:

| layout | container |
|---|---|
| `layout="background"` | full-bleed, roughly viewport-shaped |
| `layout="split"` | a ~half-width column, nothing like the viewport |

…and continue to work while a GSAP parallax translates the media box, and at
every viewport from 390px to 1600px.

## 2. Why this is not trivial

**`object-fit` does not apply to iframes.** It affects replaced content —
`<img>`, `<video>`, `<canvas>`. An `<iframe>` is not sized that way, so the
one-line answer available for a `<video>` element does not exist here.

A Vimeo iframe is also **ratio-indifferent in the wrong direction**: give it a
box of any shape and the embed simply occupies it, with the player deciding
what to do with the video inside. So sizing the iframe to the container is not
enough on its own.

**Vimeo's player never crops.** Verified by inspecting its DOM directly (not
guessable from outside — it is a cross-origin iframe): the player's internal
`<video>` uses `object-fit: contain`. Whatever box our iframe presents, the
player letterboxes or pillarboxes inside it to preserve the source's native
ratio. That is a hard external constraint — we do not own that document and no
CSS of ours can override it. `background=1` does **not** change this; it is
chrome removal and autoplay behaviour, not a cover.

So there is only **one** cover operation, and it is ours:

> Size the iframe to the **source's own aspect ratio**, scale it up until it
> overscans the container on whichever axis falls short, centre it, and clip.

Because the iframe's box then matches the video's ratio, the player's
contain-fit fills it completely by definition — zero internal letterbox — and
`overflow: hidden` on the container clips the overscanned edges. Same
undistorted crop-to-fill as `object-fit: cover` anywhere else.

**The source ratio is therefore load-bearing, and must not be hardcoded.** See
§3.3 and the regression recorded in §7.

## 3. The solution

Three layers, all three load-bearing.

### 3.1 The clipping container

```scss
/* HeroBanner.module.scss */
.mediaCover {
  position: absolute;
  inset: 0;
  overflow: hidden;              /* does the clipping */
  background-color: var(--role-surface-hero, #000f47);
}
```

```tsx
<Box className={styles.mediaCover} sx={{ containerType: 'size' }}>
```

`container-type: size` is what makes the container queryable in **both** axes,
which §3.3 depends on. Without it `cqh` resolves to zero and the technique
collapses.

### 3.2 The iframe reset

```scss
.mediaCover iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);   /* centre, so clipping is symmetrical */
  width: auto;  height: auto;
  min-width: 100%;  min-height: 100%; /* never smaller than the container */
  max-width: none;  max-height: none; /* defeat inherited caps */
  border: none;
  background-color: transparent;
}
```

`max-width: none` is defensive and deliberate. Verified against
`node_modules/tailwindcss/preflight.css`: it constrains `img, video {
max-width: 100% }` and gives `iframe` only `display: block` — so today this
line is redundant. It exists so a future reset, or a consumer's own CSS,
cannot silently cap the overscan and reintroduce letterboxing. The component
ships inside a library whose host page's CSS we do not control.

### 3.3 The sizing expression

The two constants are the **source's** ratio `R` expressed both ways — not
16:9, and not any other fixed guess:

| number | derivation |
|---|---|
| `R × 100` | width needed per unit of height |
| `100 ÷ R` | height needed per unit of width |

```tsx
width:  `max(100%, ${(R * 100).toFixed(3)}cqh)`,
height: `max(${(100 / R).toFixed(3)}cqw, 100%)`,
```

Read it as: *be at least as wide as an R-shaped box of the container's height,
and at least as tall as an R-shaped box of the container's width — and never
smaller than the container itself.* `max(…, 100%)` is the floor that guarantees
coverage when the container is already wider or taller than `R`.

**`R` is measured at runtime, never hardcoded.** The component already attaches
a Player.js instance for failure detection (§5); the same `ready()` chain asks
for the real dimensions:

```ts
player.ready()
  .then(() => player.getDuration())
  .then(() => Promise.all([player.getVideoWidth(), player.getVideoHeight()]))
  .then(([w, h]) => { if (w > 0 && h > 0) setVimeoRatio(w / h); })
  .catch(fail);
```

Until the player answers, a default renders the first paint — `16/9` in
`HeroBanner`, the current 960×900 asset's `16/15` in `HeroBannerGrid` (that one
is a SCSS fallback, overridden via the `--vimeo-cover-w` / `--vimeo-cover-h`
custom properties). The default only affects those first frames; the measured
value governs everything after.

**Do not "simplify" this back to a literal.** A hardcoded ratio works for
exactly one source and fails silently for every other — which is precisely what
happened, in both directions, in §7.

### Why oversizing alone cannot rescue a wrong ratio

Under `contain`, inflating a box whose *shape* is wrong does not shrink the
letterbox — it grows it proportionally. Measured: widening the box from 430px
to 568px at one viewport took the pillarbox from ~44px/side to ~113px/side,
with the painted video unchanged at 341×320 either way. Dropping the oversizing
entirely (plain `100%`/`100%`) stops making it worse but still leaves a visible
border wherever the container's shape differs from the source's. Only matching
the ratio removes it.

**`cqw`/`cqh`, not `vw`/`vh` — this is the part that was a bug.** The original
implementation used viewport units, which assume *container ≈ viewport*. That
holds for `layout="background"` and is **false** for `layout="split"`, where
the media column is roughly half the viewport width — it rendered a ~1.5×
oversized iframe. Container query units resolve against `.mediaCover` itself,
so the same expression is correct in both layouts.

## 4. Constraints — do not change these without re-testing both layouts

| | why |
|---|---|
| `container-type: size` on `.mediaCover` | `cqh` returns 0 without it. Note `@container` alone means `inline-size` — that is **not** sufficient |
| `overflow: hidden` on `.mediaCover` | the only thing clipping the overscan |
| `transform: translate(-50%, -50%)` | centres the overscan; without it the video crops from one edge |
| `.mediaCover iframe` as a descendant selector | the iframe is rendered by Vimeo's embed; we do not control its class |
| the iframe's ratio matches the **source's** ratio | the whole technique. The player contains rather than crops, so a mismatched iframe shape letterboxes inside the iframe and no outer CSS can recover it |
| `background=1` in the player URL | chrome-less rendering and autoplay behaviour, alongside `controls=0`, `title=0`, `byline=0`, `portrait=0`. **It is not a cover** — an earlier version of this document claimed it was, and that error is what produced the §7 regression |
| `muted=1` + `playsinline=1` | required for autoplay on iOS and by browser autoplay policy |
| Player.js attaches to the **existing** iframe | `new Player(iframeRef.current)` — constructing a player instead would let Vimeo build its own iframe and discard this sizing entirely |

### Interaction with parallax

The media box is 115% tall and anchored `bottom: 0` in split layout so the
overscan sits above the visible area. Changing either the height or the anchor
reintroduces a white gap that appears **only on scroll, only on desktop, only
with Vimeo, only in split**. Read the comment block at `HeroBanner.tsx:386-403`
before touching it.

## 5. Failure handling

A Vimeo embed can fail in ways that never raise an error — a restricted,
deleted or domain-blocked video renders Vimeo's own error page *inside* the
hero. The component detects this and swaps in `imageSrc`:

```
player.ready() → player.getDuration() → catch(fail)
window.setTimeout(fail, 6000)
```

`ready()` only confirms the player initialised, not that the video resolved —
hence `getDuration()`, which requires a real video. The **6-second timeout is a
backstop** because some failure modes never settle either promise.

**Requirement:** any caller passing `vimeoId` must also pass `imageSrc`. Without
it, a failed embed renders nothing.

## 6. Acceptance criteria

1. No letterboxing or pillarboxing at any viewport 390–1600px, in **both**
   layouts.
2. No distortion — the video's aspect ratio is preserved at all times.
3. The video is centred; cropping is symmetrical.
4. `layout="split"` shows the video at the same visual scale as
   `layout="background"` — this is the regression the viewport-unit version had.
5. No white gap appears while scrolling, in either layout.
6. A blocked or invalid `vimeoId` falls back to `imageSrc` within ~6 seconds.
7. Autoplay works on iOS Safari (muted, inline).

## 7. Known limits

- **No container-query fallback.** `container-type` is supported in all current
  evergreen browsers; there is no graceful degradation path if it is absent —
  `cqh` would resolve to 0 and the iframe would fall back to `min-height: 100%`,
  which letterboxes rather than breaking outright.
- **Corrected 2026-10-05 — source aspect ratio IS the constraint.** An earlier
  revision of this document asserted the opposite ("source aspect ratio is NOT
  a constraint — verified live"). That was wrong, and the way it was wrong is
  worth recording, because the same trap is easy to fall back into.

  The verification behind the claim was **geometric only**: it measured the
  iframe's box from the host page and confirmed it covered the container.
  Measurement from outside a cross-origin iframe cannot see what the player
  paints *inside* that box, so it could not detect the letterbox and silently
  "confirmed" a false premise.

  The symptom was reported by eye, on a device, by a human: at 768px wide,
  `HeroBanner` with the 960×900 source (ID `1146072483`) presented a 768×432
  16:9 iframe, inside which the player contained the near-square source to
  **461px wide** — pillarbox bars across the remaining 307px. Desktop split
  masked it by accident: there the contained video happened to come out wider
  than the narrow column, so it looked correct.

  Both components carried the mirror-image version of this bug at once:
  `HeroBanner` hardcoded 16:9 (correct for a 16:9 source, broken for 960×900);
  `HeroBannerGrid` hardcoded 16:15 (correct for 960×900, broken for 16:9).
  Each had been "verified" against the one asset it was tuned for. Both now
  measure the ratio at runtime (§3.3) and were re-checked across both sources
  × {390, 768, 1024, 1440} — 16 of 16 covering.

  **The compounding caveat stands and is unchanged**: the subject should sit
  away from the frame edges, because a near-square source in a wide container
  loses a lot of frame to the crop.
- **Still verified by eye, not by test.** There is no automated coverage of
  acceptance criteria 1–5. Geometry can be asserted from the host page — and
  should be, since that is what the 16-case sweep above did — but *paint*
  cannot, which is exactly the gap that let the original error stand. Treat a
  geometric pass as necessary and not sufficient; look at it on a device.
- **Not extracted across components.** `HeroBanner` and `HeroBannerGrid`
  implement the technique separately (one in `sx`, one in SCSS driven by custom
  properties). Within each component it is now shared between the two layouts,
  but a change still has to be made in both files.
- **No automated test covers it.** There is no `HeroBanner.test.tsx`; the only
  coverage is 17 axe-gated stories, which do not assert geometry. Acceptance
  criteria 1–5 are currently verified by eye.
