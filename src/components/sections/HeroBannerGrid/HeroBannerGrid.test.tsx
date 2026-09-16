import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

// jsdom doesn't implement matchMedia, and HeroBannerGrid.tsx calls
// `gsap.registerPlugin(useGSAP, ScrollTrigger)` as a MODULE-LEVEL side
// effect — ScrollTrigger's own registration synchronously calls
// `window.matchMedia()` internally, so this has to exist before the
// `import { HeroBannerGrid } ...` below even resolves, not just before the
// component mounts. `vi.hoisted()` is the only reliable way to do that: it
// runs before Vitest's own module-mocking hoist pass, ahead of all static
// imports in this file regardless of source order. A plain `beforeAll` (or
// code placed textually above the import) is too late — ESM import bodies
// still execute in dependency order first. `matches: false` is fine here;
// it only means the parallax callback itself never fires, harmless in jsdom
// where there's no real scrolling/layout to drive it anyway.
vi.hoisted(() => {
  if (!window.matchMedia) {
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  }
});

import { HeroBannerGrid } from './HeroBannerGrid';

// Mock @vimeo/player so tests control ready()/error/getDuration
// deterministically instead of hitting the network or waiting on the
// component's real 6s timeout backstop.
const vimeoPlayerMock = {
  on: vi.fn(),
  ready: vi.fn(() => new Promise(() => {})), // never resolves by default
  getDuration: vi.fn(() => Promise.resolve(30)),
  play: vi.fn(),
  pause: vi.fn(),
  destroy: vi.fn(() => Promise.resolve()),
};
vi.mock('@vimeo/player', () => ({
  default: vi.fn(() => vimeoPlayerMock),
}));

// jsdom doesn't implement real media playback — silence the "not
// implemented" console noise from the native <video> element's play()/
// pause() calls in the toggle test below.
window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = vi.fn();

describe('HeroBannerGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vimeoPlayerMock.ready.mockImplementation(() => new Promise(() => {}));
    vimeoPlayerMock.getDuration.mockResolvedValue(30);
    vimeoPlayerMock.destroy.mockResolvedValue(undefined);
  });

  it('renders title, eyebrow, and description', () => {
    render(
      <HeroBannerGrid
        eyebrow="Corporate"
        title="Whatever risk your business faces"
        description="Lorem ipsum dolor sit amet"
        disableAnimations
      />
    );

    expect(screen.getByRole('heading', { level: 1, name: /whatever risk your business faces/i })).toBeInTheDocument();
    expect(screen.getByText('Corporate')).toBeInTheDocument();
    expect(screen.getByText('Lorem ipsum dolor sit amet')).toBeInTheDocument();
  });

  it('mounts without crashing with animations enabled (default)', () => {
    // Exercises the real gsap.matchMedia() path (only skipped when
    // disableAnimations is explicitly true), guarded by the matchMedia
    // polyfill above.
    expect(() => render(<HeroBannerGrid title="Default animated mount" />)).not.toThrow();
  });

  it('fires primary and secondary CTA click handlers', () => {
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    render(
      <HeroBannerGrid
        title="Title"
        primaryCta={{ text: 'Download Report', onClick: onPrimary }}
        secondaryCta={{ text: 'Talk to Experts', onClick: onSecondary }}
        disableAnimations
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Download Report' }));
    fireEvent.click(screen.getByRole('button', { name: 'Talk to Experts' }));
    expect(onPrimary).toHaveBeenCalledTimes(1);
    expect(onSecondary).toHaveBeenCalledTimes(1);
  });

  it('renders an image when only imageSrc is provided', () => {
    render(<HeroBannerGrid title="Title" imageSrc="/images/test.jpg" imageAlt="Test" disableAnimations />);
    expect(screen.getByRole('img', { name: 'Test' })).toHaveAttribute('src', '/images/test.jpg');
  });

  it('renders a Vimeo iframe with the correct background-mode embed URL', () => {
    render(<HeroBannerGrid title="Title" vimeoId="1146072483" imageSrc="/images/fallback.jpg" disableAnimations />);
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeTruthy();
    expect(iframe?.getAttribute('src')).toContain('player.vimeo.com/video/1146072483');
    expect(iframe?.getAttribute('src')).toContain('autoplay=1');
    expect(iframe?.getAttribute('src')).toContain('background=1');
  });

  it('falls back to imageSrc when Player.js reports an error', async () => {
    render(
      <HeroBannerGrid title="Title" vimeoId="999999999999" imageSrc="/images/fallback.jpg" imageAlt="Fallback" disableAnimations />
    );
    expect(document.querySelector('iframe')).toBeTruthy();

    // Simulate the fastest of the three failure-detection layers (error
    // event) — the other two (ready()+getDuration() rejection, 6s timeout)
    // exist to catch failure modes this event alone doesn't cover.
    const errorHandler = vimeoPlayerMock.on.mock.calls.find(([event]) => event === 'error')?.[1];
    expect(errorHandler).toBeDefined();
    act(() => errorHandler());

    await waitFor(() => {
      expect(document.querySelector('iframe')).not.toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Fallback' })).toHaveAttribute('src', '/images/fallback.jpg');
    });
  });

  it('shows the play/pause control only in split layout when video/vimeo media is present', () => {
    const { rerender } = render(
      <HeroBannerGrid title="Title" layout="split" videoSrc="/video/test.mp4" disableAnimations />
    );
    expect(screen.getByRole('button', { name: /pause video/i })).toBeInTheDocument();

    rerender(<HeroBannerGrid title="Title" layout="background" videoSrc="/video/test.mp4" disableAnimations />);
    expect(screen.queryByRole('button', { name: /pause video/i })).not.toBeInTheDocument();
  });

  it('toggles the play/pause label on click for a native video source', () => {
    render(<HeroBannerGrid title="Title" layout="split" videoSrc="/video/test.mp4" disableAnimations />);
    fireEvent.click(screen.getByRole('button', { name: /pause video/i }));
    expect(screen.getByRole('button', { name: /play video/i })).toBeInTheDocument();
  });

  it('offsets the content column to start at grid column 7 when imagePosition="left"', () => {
    // Regression guard: this is the exact combination that surfaced a real
    // click-blocking bug during manual Playwright verification (the empty
    // grid tracks on the non-content side were swallowing pointer events
    // meant for the media column beneath them) — see the pointer-events
    // comments in HeroBannerGrid.module.scss's .contentContainer/.heroColumn.
    render(<HeroBannerGrid title="Title" layout="split" imagePosition="left" videoSrc="/video/test.mp4" disableAnimations />);
    const heading = screen.getByRole('heading', { level: 1 });
    const column = heading.closest('[class*="heroColumn"]');
    expect(column?.className).toMatch(/heroColumn--start7/);
  });

  it('does not offset the content column when imagePosition="right" (default)', () => {
    render(<HeroBannerGrid title="Title" layout="split" videoSrc="/video/test.mp4" disableAnimations />);
    const heading = screen.getByRole('heading', { level: 1 });
    const column = heading.closest('[class*="heroColumn"]');
    expect(column?.className).not.toMatch(/heroColumn--start7/);
  });

  it('shows over-limit CMS hint styling when showCmsHints is enabled and the title exceeds maxTitleChars', () => {
    render(
      <HeroBannerGrid
        title="A very long headline that exceeds the configured character limit"
        maxTitleChars={10}
        showCmsHints
        disableAnimations
      />
    );
    const hint = screen.getByText(/\/ 10 chars/);
    expect(hint.className).toMatch(/cmsHint--error/);
  });

  it('renders the background layout without the split-only media wrapper', () => {
    render(<HeroBannerGrid title="Title" layout="background" imageSrc="/images/bg.jpg" disableAnimations />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.closest('[class*="splitMedia"]')).toBeNull();
  });
});
