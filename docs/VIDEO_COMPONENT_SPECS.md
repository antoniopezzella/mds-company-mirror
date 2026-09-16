# Video Component Specs

**Component:** `src/components/sections/HeroBanner/HeroBanner.tsx`
**Last updated:** 2026-07-31

Specs for hero and section video — covering the three layout variants the component supports, the sizing technique behind each, and production specs for creatives generating source footage.

---

## 1. Component variants

| Variant | Prop | Container | Fill technique | Notes |
|---|---|---|---|---|
| **Full-bleed hero** | `layout="background"` | 100vw × `height` (default 100vh) | Container-relative cover formula (`width: max(100%, 177.77cqh)`, `height: max(56.25cqw, 100%)`) via CSS container query units — container ≈ viewport here, so this was already correct even before the cqh/cqw fix | Dark gradient overlay via `variant="dark"`; parallax scroll effect (`yPercent: -13`) |
| **50/50 split hero** | `layout="split"` | 50% width × column height | Same container-relative formula — **fixed**, see [§3](#3-fixed-5050-split-video-sizing) | M-logo overlay + play/pause control (now via `@vimeo/player`, see [§6](#6-vimeo-player.js-integration)); parallax runs for `<video>` here, **not** for Vimeo (see §6) |
| **In-section video** | not yet built as a distinct variant | Fixed aspect box, not `100vh` | Container-relative `<video style="object-fit:cover">` (already correct for self-hosted mp4), or a standard `padding-top: 56.25%` aspect-ratio box for Vimeo | Should respect `max-width` and not bleed full-width like the hero variants |

Two media sources are supported, with `vimeoId` taking priority over `videoSrc`:
- `vimeoId` → Vimeo iframe, `background=1` embed mode (silent, autoplay, loop, no chrome), driven by `@vimeo/player`. **`imageSrc` is effectively required alongside `vimeoId`** — it's the fallback shown if the embed fails, and a failed embed with no `imageSrc` renders nothing at all.
- `videoSrc` → native `<video autoplay loop muted playsInline>`, with `imageSrc` as a fallback poster/failure image

## 2. Source format — final decision

**1920×1080 (16:9) is the default for every variant.** It's the industry-standard production format — easiest for creatives/vendors to source, and reusable across other channels (social, other pages) beyond just this component. Full-bleed/background hero: container ≈ viewport, so a 16:9 source needs minimal cropping. Confirmed via direct testing: works flush with no gaps in every layout, with correct parallax, via the self-hosted `<video>` path.

**The one carve-out — 50/50 split specifically:** that column is portrait-ish (~720×900 to 720×1200 depending on viewport), so a 16:9 source does get cropped fairly hard on the sides to fill it. **Keep key subjects centered in the middle ~40% of the frame.** The math: fitting a 16:9 source into a ~960×1012 split column requires ~839px of horizontal overscan; a near-square source (e.g. 960×900) only needs ~119px in the same container. If a campaign can afford a dedicated crop just for this placement, a near-square/portrait source preserves more of the original framing there — but it's a nice-to-have, not a requirement, since the 16:9 default still renders correctly either way (see §3 for why).

**This decision no longer depends on which resolution "works"** — both are equally safe now (see §3). The only remaining asymmetry is delivery-path, not resolution: **Vimeo videos don't get the parallax scroll effect in the split layout** (static fill only, see §6), while self-hosted `<video>` gets parallax in every layout/media combination. If parallax in the split layout matters for a given campaign, self-hosted `<video>` is the way to get it, independent of source resolution.

## 3. Fixed: 50/50 split video sizing

~~The Vimeo iframe cover formula uses viewport units (`vw`/`vh`)~~ — **fixed.** It now uses CSS **container query units** (`cqw`/`cqh`), with `containerType: 'size'` added to the wrapping `.mediaCover` `Box` in both layout branches ([HeroBanner.tsx](../src/components/sections/HeroBanner/HeroBanner.tsx), search `containerType`). Same cover-fill formula, but now correctly scoped to whichever container the iframe is actually rendered in, instead of the raw viewport. Supported in Chrome/Edge 105+, Firefox 110+, Safari 16+ — no polyfill needed.

**Verified via direct measurement** (1920×1000 viewport): the iframe now resolves to genuinely different, container-appropriate sizes per layout — 1799×1012 in the ~960×1012 split column vs. 2069×1164 in the ~1920×1164 full-bleed container — rather than the previous bug, where it rendered an *identical*, viewport-derived size (1600×1049) in both layouts regardless of which container it was actually in.

**Important nuance this surfaced:** don't expect the split-layout iframe width to ever equal the container width for a 16:9 source — the overscan in §2's math (~839px for a 960-wide column) is the *correct*, unavoidable result of covering a near-square container with a wide source, not a bug the CSS can eliminate. If a "huge iframe" is reported again, check the source video's aspect ratio against the container's aspect ratio (per the formula in this section) before assuming the CSS regressed.

The native `<video>` path never had this issue — it already used `width/height: 100%` + `object-fit: cover`, which is correctly container-relative in both layouts by construction.

## 4. Creative / production specs

| Parameter | Recommendation | Why |
|---|---|---|
| **Resolution** | 1920×1080 (16:9), for every variant | Cover-fill crops to the target box regardless of source resolution — delivering more than 1080p (e.g. 4K) adds no visible quality for a moving, compressed, mostly-cropped background element |
| **Codec** | H.264, High Profile, Level 4.2 | Universal browser support, no fallback needed |
| **Audio** | None — strip the track entirely | Always rendered `muted`; an audio stream only adds container overhead |
| **Frame rate** | 24–30fps | No perceptual benefit from 60fps on ambient/background motion |
| **Bitrate** | 2.5–4 Mbps @ 1080p, 2-pass VBR | Visually clean for typical corporate/lifestyle b-roll (no fast action) |
| **Target file size** | ~2–6MB for a 6–10s loop | See [§5](#5-existing-asset-audit) for current repo examples, good and bad |
| **Loop duration** | 6–10 seconds | Long enough the loop seam isn't jarring, short enough to stay light. Under ~4s reads as visibly repetitive; over ~15s bloats file size for something nobody watches start-to-finish |
| **Loop construction** | Must be a genuine seamless loop — first/last frame matching in composition and motion (slow pans, gentle repetitive motion, no hard cuts) | An arbitrarily trimmed clip shows a visible jump-cut every loop; request footage shot/edited specifically to loop |
| **Keyframe interval** | 2× frame rate (every ~48–60 frames) | Clean seek/loop behavior |

### Delivery path

- **Vimeo (`vimeoId`) — recommended for most cases.** Upload a 1080p master and let Vimeo's adaptive transcoding + CDN handle delivery. The existing `background=1` embed param is built exactly for this use case.
- **Self-hosted (`videoSrc`)** — run new creative through an ffmpeg pass with the settings above *before* committing to `public/video/`. Nothing in the codebase currently enforces this, so it's on whoever adds the asset.

## 5. Existing asset audit

State of `public/video/` as of this doc:

| File | Resolution | Duration | Size | Bitrate | Verdict |
|---|---|---|---|---|---|
| `WebsiteHeaderVideo-960x900_V1 (1).mp4` | 768×720 | 15.0s | 4.7MB | ~2.4 Mbps | Reasonable ballpark already — close to spec |
| `hero-video.mp4` | 960×890 | 10.6s | 19.6MB | ~14.7 Mbps | ~3–6× heavier than needed for its resolution |
| `10394868-uhd_3840_2160_30fps.mp4` | 3840×2160 | 14.6s | 46MB | ~25 Mbps | Raw 4K stock footage, not re-encoded — should be downscaled to 1080p or removed before use |
| `2818546-uhd_3840_2160_24fps.mp4` | 3840×2160 | 22.8s | 68MB | ~23.6 Mbps | Same as above — also over the recommended 6–10s loop length |

The two 4K files aren't wired into anything performance-critical yet, but shouldn't ship as-is if they get used — re-encode to the spec in §4 first.

## 6. Vimeo Player.js integration

`@vimeo/player` is attached to the *existing* iframe in both layout branches (`new Player(iframeRef.current)`), not constructed by Player.js itself — this leaves the CSS cover-fill sizing (§3) completely untouched. It replaces the old hand-rolled `postMessage` play/pause commands with the real `player.play()`/`player.pause()` API, and adds graceful error handling: a failed/restricted/nonexistent video falls back to `imageSrc` instead of leaking Vimeo's own error page into the hero.

**Detecting a real failure needs three layered checks, not just the obvious one:**
1. `player.on('error', ...)` — only fires for failures reported *after* the player shell itself loads (e.g. a genuinely restricted video that still renders a working player with its own error message).
2. `player.ready()` — only confirms the player *iframe* initialized, **not** that the specific video ID resolved. A bogus video ID can still let `ready()` resolve.
3. `player.getDuration()` after `ready()` — requires an actual valid video to succeed, so its rejection is the real "this video doesn't work" signal.
4. A 6-second `setTimeout` backstops all of the above, because some failure modes never reject at all — the promise chain just hangs forever.

**Parallax is deliberately not uniform across every layout/media combination.** The scroll-driven `yPercent: -13` parallax effect is excluded specifically for **split layout + Vimeo** — every other combination (split+`<video>`, background+`<video>`, background+Vimeo) has it. Root cause: the split layout's height resolves through a flex-stretched value rather than an explicit `vh` figure (background's chain is a clean 2-level absolute-fill of an explicit height), and the Vimeo iframe does its own independent nested percentage calc on top of that — confirmed via direct testing to reintroduce a white-gap rendering bug specifically for this one combination. If parallax is ever needed for split+Vimeo, that underlying height-chain fragility would need to be resolved first, not just re-enabled.

One implementation trap worth knowing if this code is touched again: `vimeoId` **must** be in the `useGSAP` dependency array. The parallax setup's `skipParallax` check reads `vimeoId`, but GSAP/ScrollTrigger only re-initializes when its dependency array changes — without `vimeoId` in that array, switching media type on a live page (without also changing layout/title) leaves a stale scrollTrigger from whatever `vimeoId` was set the *last* time the effect actually ran. This only shows up on a live prop change, not a fresh page load with the value pre-set — easy to miss in testing.

**Reliability lesson:** every properly-hosted/official Vimeo video used for testing this component has been rock-solid (the original `1146072483` demo asset, and `863362136` — Vimeo's own official "Inside Vimeo Staff Picks" video). Every free/community-uploaded stock clip tried instead failed unpredictably, in a different way each time (content-restricted error, stuck loading, or working — inconsistently). Don't use a random "free stock footage" Vimeo ID for anything that needs to be dependable; verify reliability across several repeated loads first, the same way `863362136` was validated (4/4 raw player loads, then a 10-second poll through the full component with no fallback ever triggering) before trusting it.
