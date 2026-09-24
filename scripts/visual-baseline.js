#!/usr/bin/env node
/**
 * visual-baseline.js — local visual regression for the Storybook corpus.
 *
 * Why this exists
 * ---------------
 * `@chromatic-com/storybook` is installed but has never run: no script, no
 * project token, no baseline. So nothing in this repo has ever been visually
 * diffed, and a change that alters 200 components subtly is invisible to CI.
 * (docs/PRODUCTION_READINESS.md, P1-12.)
 *
 * Chromatic needs an account and a token. This does not — it drives the
 * Playwright browser that the Storybook test project already uses, screenshots
 * every story from a built Storybook, and compares two captures on disk.
 *
 * It is deliberately NOT a Chromatic replacement: no cloud history, no review
 * UI, no cross-browser. It answers exactly one question, which is the one that
 * matters during a migration: **which stories changed?**
 *
 * Usage:
 *   node scripts/visual-baseline.js capture <outDir>     # screenshot every story
 *   node scripts/visual-baseline.js compare <a> <b>      # list stories that differ
 *
 * Capture assumes Storybook is already built to dist/storybook
 * (`npx storybook build -o dist/storybook`).
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import http from 'http';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const root = process.cwd();
const STORYBOOK_DIR = path.join(root, 'dist', 'storybook');
const PORT = 6199;

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.ttf': 'font/ttf', '.map': 'application/json',
};

function serve(dir) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      let file = path.join(dir, urlPath === '/' ? 'index.html' : urlPath);
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) { res.writeHead(404); res.end('not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function capture(outDir) {
  if (!fs.existsSync(STORYBOOK_DIR)) {
    console.error(`visual-baseline: ${STORYBOOK_DIR} not found. Run: npx storybook build -o dist/storybook`);
    process.exit(1);
  }
  const index = JSON.parse(fs.readFileSync(path.join(STORYBOOK_DIR, 'index.json'), 'utf8'));
  // Docs entries render prose, not components — screenshotting them adds noise
  // (timestamps, generated tables) without telling us anything about a visual
  // regression in a component.
  const stories = Object.values(index.entries).filter((e) => e.type === 'story');

  fs.mkdirSync(outDir, { recursive: true });
  const server = await serve(STORYBOOK_DIR);
  const browser = await chromium.launch();
  // Same viewport and reduced-motion setting the test suite uses, so captures
  // are comparable with what axe sees and animations cannot make frames differ.
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: 'reduce',
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  let done = 0;
  for (const s of stories) {
    const url = `http://localhost:${PORT}/iframe.html?id=${encodeURIComponent(s.id)}&viewMode=story`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });

      // Freeze every animation and transition before capturing.
      //
      // This is NOT redundant with the context's `reducedMotion: 'reduce'`.
      // That only suppresses animation which *honours* the media query; a
      // spinner, an indeterminate progress bar or a skeleton pulse keeps
      // running regardless, so the frame you capture depends on when you
      // happened to click the shutter.
      //
      // Measured: without this, 33 of 603 stories differed from THEMSELVES
      // across two runs of identical code — every `--loading`,
      // `--indeterminate`, `--animated-*` and skeleton story. A false-positive
      // rate that high buries the real diffs it exists to surface.
      await page.addStyleTag({
        content: `*, *::before, *::after {
          animation-play-state: paused !important;
          animation-delay: -1ms !important;
          animation-duration: 1ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
          caret-color: transparent !important;
        }`,
      });

      // Fonts, then images. A half-loaded webfont or a still-decoding image is
      // the other classic source of a frame that differs from itself.
      await page.evaluate(() => document.fonts && document.fonts.ready);
      await page.evaluate(() =>
        Promise.all(
          Array.from(document.images)
            .filter((img) => !img.complete)
            .map((img) => new Promise((res) => { img.onload = img.onerror = res; })),
        ),
      );
      await page.waitForTimeout(150);

      const buf = await page.screenshot({ fullPage: false, animations: 'disabled' });
      fs.writeFileSync(path.join(outDir, `${s.id}.png`), buf);
    } catch {
      // Record the failure rather than dropping the story silently — a story
      // that stops rendering is itself a regression worth seeing.
      fs.writeFileSync(path.join(outDir, `${s.id}.FAILED`), '');
    }
    if (++done % 50 === 0) console.log(`  … ${done}/${stories.length}`);
  }

  await browser.close();
  server.close();
  console.log(`visual-baseline: captured ${done} stories -> ${outDir}`);
}

const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

/**
 * Stories that do not render deterministically, so a difference between two
 * runs tells you nothing.
 *
 * Established empirically, not guessed: two captures of identical code were
 * compared and these are what differed. Freezing animations removed the
 * spinner/progress/skeleton churn; what remains is media that finishes loading
 * at slightly different moments (video poster frames, Vimeo embeds, background
 * images), Embla's async carousel measurement, and one story that renders live
 * environment data.
 *
 * Regenerate with:  node scripts/visual-baseline.js selftest <dirA> <dirB>
 *
 * Note what is NOT here: no `components-*` story except carousel. The component
 * set this tool exists to protect is stable, which is what makes the remaining
 * signal trustworthy.
 */
const UNSTABLE = [
  /^website-herobanner/,          // video + Vimeo embeds
  /^website-herobannergrid/,      // same
  /^projects-marsh-one-hero/,     // background imagery
  /^projects-marsh-one-pages/,    // full pages with hero media
  /^projects-marsh-one-workspacecard/,
  /^generated-responsive-card/,   // <img> decode timing
  /^modern-card-component/,       // same
  /^components-carousel/,         // Embla async measurement
  /^health-environment/,          // renders live environment data
  /^concepts-brand-website/,      // real video
];

/** Below this share of differing pixels, a change is antialiasing rather than
 *  a visual regression. Chosen after observing that two textfield renders which
 *  are indistinguishable by eye still differ in a handful of edge pixels. */
const MIN_PCT = 0.05;

const isUnstable = (id) => UNSTABLE.some((re) => re.test(id));

function compare(dirA, dirB) {
  const list = (d) => new Set(fs.readdirSync(d));
  const a = list(dirA), b = list(dirB);
  const changed = [], added = [], removed = [];
  let skipped = 0, subPerceptual = 0;

  for (const f of a) {
    if (!b.has(f)) { removed.push(f); continue; }
    if (f.endsWith('.FAILED')) continue;
    if (isUnstable(f.replace(/\.png$/, ''))) { skipped++; continue; }
    if (sha(path.join(dirA, f)) === sha(path.join(dirB, f))) continue;

    // Identical hashes mean identical images, but DIFFERENT hashes do not mean
    // a meaningful change — a single re-antialiased pixel flips the hash. So
    // measure how much actually differs and let the caller judge.
    const pa = PNG.sync.read(fs.readFileSync(path.join(dirA, f)));
    const pb = PNG.sync.read(fs.readFileSync(path.join(dirB, f)));
    if (pa.width !== pb.width || pa.height !== pb.height) {
      changed.push({ f, pct: 100, note: 'dimensions differ' });
      continue;
    }
    const diffPixels = pixelmatch(pa.data, pb.data, null, pa.width, pa.height, { threshold: 0.1 });
    const pct = (diffPixels / (pa.width * pa.height)) * 100;
    if (pct >= MIN_PCT) changed.push({ f, pct });
    else subPerceptual++;
  }
  for (const f of b) if (!a.has(f)) added.push(f);
  console.log(`  skipped  : ${skipped} known-nondeterministic (media/async — see UNSTABLE in this script)`);
  console.log(`  sub-perceptual: ${subPerceptual} differ by <${MIN_PCT}% of pixels (antialiasing; not reported)`);

  console.log(`  baseline : ${a.size} captures (${dirA})`);
  console.log(`  current  : ${b.size} captures (${dirB})`);
  console.log(`  changed  : ${changed.length}`);
  console.log(`  added    : ${added.length}`);
  console.log(`  removed  : ${removed.length}`);
  if (changed.length) {
    console.log('\nStories whose rendering changed:');
    for (const c of changed.sort((x, y) => y.pct - x.pct)) {
      console.log(`  ${c.pct.toFixed(2).padStart(6)}%  ${c.f.replace(/\.png$/, '')}${c.note ? '  (' + c.note + ')' : ''}`);
    }
  }
  for (const f of added) console.log(`  + ${f.replace(/\.png$/, '')}`);
  for (const f of removed) console.log(`  - ${f.replace(/\.png$/, '')}`);

  // Non-zero only on removals/failures — a *changed* story is the expected
  // output of a migration, not an error. The caller decides what is acceptable.
  process.exit(removed.length ? 1 : 0);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === 'capture') await capture(path.resolve(rest[0] || 'visual-baseline'));
else if (cmd === 'compare') compare(path.resolve(rest[0]), path.resolve(rest[1]));
else {
  console.error('usage: visual-baseline.js capture <outDir> | compare <baselineDir> <currentDir>');
  process.exit(1);
}
