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

The working arrangement is **two cover operations stacked**:

1. **Inside the iframe** — `background=1` makes Vimeo's player scale the source
   to fill the iframe and crop the excess. This is why the source's own aspect
   ratio does not matter (see §7).
2. **Outside the iframe** — the CSS below sizes that iframe to 16:9 and makes it
   larger than the container in whichever dimension falls short, centres it, and
   clips the overflow.

Remove either and non-16:9 sources letterbox.

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

```tsx
style={{
  width:  'max(100%, 177.77cqh)',
  height: 'max(56.25cqw, 100%)',
}}
```

Read it as: *be at least as wide as a 16:9 box of the container's height, and
at least as tall as a 16:9 box of the container's width — and never smaller
than the container itself.*

| number | derivation |
|---|---|
| `177.77` | 16 ÷ 9 × 100 — width needed per unit of height |
| `56.25` | 9 ÷ 16 × 100 — height needed per unit of width |

`max(…, 100%)` is the floor that guarantees coverage when the container is
already wider or taller than 16:9.

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
| `background=1` in the player URL | **Load-bearing, not cosmetic.** It is the *inner* cover: Vimeo scales the source to fill the iframe and crops. Without it a non-16:9 source letterboxes inside the iframe and no outer CSS can recover it. Also gives chrome-less rendering with `controls=0`, `title=0`, `byline=0`, `portrait=0` |
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
- **Source aspect ratio is NOT a constraint** — verified live. The constants
  describe the *iframe's* shape, not the source's. Two cover operations stack:
  Vimeo's `background=1` covers the iframe with the video, then this CSS covers
  the container with the iframe. Measured in the harness with the 960×900
  source (ID `1146072483`): split renders a **720×912 portrait** container with
  a **1621×912** iframe — exactly 16:9 — and the video fills it with no bars.
  A 4:3 or vertical source works the same way.

  The real caveat is that the **two crops compound**: a near-square source in a
  wide container is cropped by Vimeo *and* again by `.mediaCover`, so more of
  the frame is lost than either step implies. Choose sources with the subject
  away from the edges.
- **Not extracted.** The technique is duplicated at two call sites in
  `HeroBanner.tsx` (split and background) rather than shared. Any change must
  be made in both.
- **No automated test covers it.** There is no `HeroBanner.test.tsx`; the only
  coverage is 17 axe-gated stories, which do not assert geometry. Acceptance
  criteria 1–5 are currently verified by eye.
