# Hero Banner — Creative Brief

**For:** video and image production teams creating homepage/marketing hero content
**Covers:** 2 layout variants (50/50 Split, Full Background) × 2 media types (Image, Video)
**Last updated:** 2026-07-31

This is a production brief, not a technical spec — it tells you the canvas sizes, safe zones, and delivery format for each hero variant. (Developers: the underlying implementation detail lives in `docs/VIDEO_COMPONENT_SPECS.md` — this doc is the creative-facing summary of it.)

---

## 1. The two hero variants

### 50/50 Split

Media fills the right (or left) half of the screen, at full height, with headline copy in the other half.

- **Canvas size: 960×900 px**
- **Height:** full-height (100% of the viewport)
- **Safe zone:** keep the key subject **centered in the middle ~40% of the frame width**. The edges get cropped to fill the column, and the amount of crop varies slightly by screen size — center framing protects against all of them.
- **No text overlay on this media** — headline copy lives in the other half of the screen, not on top of the image/video.
- **Motion (video only):** on scroll, the frame pans vertically by roughly 13% of its own height. **Leave breathing room at the top and bottom of your composition**, not just the sides — don't crop key elements tight against the top or bottom edge.

### Full Background

Media fills the entire screen edge-to-edge, with headline copy overlaid on top.

- **Canvas size: 1920×1080 px (16:9)**
- **Height:** full-height (100% of the viewport)
- **Safe zone:** the **left 25% of the frame is fully darkened** by a navy overlay (for text legibility), fading out by the 75% mark. **Keep key subjects in the right half of the frame** — anything in the left quarter will be effectively invisible.
- **Motion:** the same ~13% vertical pan on scroll applies here too — **and it applies to static images as well as video**, not just video. Leave the same top/bottom breathing room.

---

## 2. Format specs by media type

### Video

| Parameter | Spec |
|---|---|
| Resolution | 1920×1080 (16:9) — use this master resolution for **both** variants; the system crops it to fit, so one source works for both |
| Codec | H.264, High Profile |
| Audio | None — strip the audio track entirely (video always plays muted) |
| Frame rate | 24–30fps |
| Bitrate | 2.5–4 Mbps, 2-pass VBR |
| Target file size | ~2–6MB for a 6–10 second loop |
| Duration | **6–10 seconds**, and must be a genuine seamless loop — first and last frame matching in composition and motion. A clip that isn't shot/edited to loop will show a visible jump-cut every repeat. |
| Loop style | Slow pans, gentle repeating motion — avoid hard cuts or dramatic scene changes, which draw attention to the loop point and read as "glitchy" in an ambient background element |

### Image

| Parameter | Spec |
|---|---|
| Resolution | 1920×1080 for Full Background; 960×900 for 50/50 Split |
| Format | WebP preferred; JPG as fallback |
| Target file size | ~300–500KB after compression — these images are typically the first thing that loads on the page, so file size directly affects how fast the page feels |
| Safe zone | Same as the video guidance above, per variant |

---

## 3. Delivery checklist

Before submitting a file, confirm:

- [ ] Correct canvas size for the variant (960×900 split / 1920×1080 background)
- [ ] Key subject sits inside the safe zone for that variant
- [ ] Video: no audio track, seamless loop, 6–10 seconds
- [ ] Video: composition allows ~13% of vertical breathing room top and bottom (for scroll motion)
- [ ] Image: compressed to target file size, correct format
- [ ] Full Background only: nothing important sits in the left 25% of frame

---

## 4. Reference

- Live test page for all combinations: `/hero-banner-test` in the dev app
- Developer-facing technical spec (CSS/rendering internals): `docs/VIDEO_COMPONENT_SPECS.md`
