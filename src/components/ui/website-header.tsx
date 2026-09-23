"use client"

import * as React from 'react';
import { ChevronDown, Globe, Menu, Search } from 'lucide-react';

import MARSH_LOGO from '../../assets/images/marsh.svg';
import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Button } from './button';
import { Sheet, SheetContent } from './sheet';

/**
 * Inline (not <img src={MARSH_LOGO}>) so `fill="currentColor"` can pick up
 * a role token via the wrapping element's `color`. marsh.svg itself is
 * baked with a fixed navy (#000F47) fill, and CSS `mask-image` against the
 * bundled asset URL proved unreliable (rendered as a solid color block,
 * no shape) — currentColor on an inline SVG is the robust way to recolor it.
 */
const MarshLogoMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 691 151" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Marsh Logo" className={className}>
    <path d="M0 0V148.529H27.0448V81.6086L69.8085 102.062H71.8677L2.67702 0H0ZM230.567 1.23545L299.552 148.529H269.624L257.475 121.28H198.443L186.362 148.529H159.111L228.096 1.23545H230.567ZM247.865 99.7973L227.821 54.9091L207.915 99.7973H247.865ZM395.719 88.335C403.201 84.6973 409.172 79.5495 413.497 72.9604C417.821 66.3714 420.018 58.7527 420.018 50.2418C420.018 41.0445 417.821 32.9455 413.428 26.0818C409.035 19.2182 402.995 13.7959 395.238 9.88364C387.55 5.97136 378.764 3.98091 369.017 3.98091H314.447V148.598H342.521V28.2782H365.86C373.273 28.2782 379.519 30.2686 384.53 34.1809C389.541 38.0932 392.081 43.4468 392.081 50.1732C392.081 56.8995 389.541 62.3218 384.53 66.3714C379.519 70.4209 373.273 72.48 365.86 72.48H346.846V72.6859L392.081 148.529H423.656L388.237 91.2177C390.845 90.4627 393.316 89.4332 395.65 88.335H395.719ZM529.364 76.4609C525.039 73.5782 520.235 71.2445 515.018 69.5286C509.801 67.8127 504.516 66.3027 499.23 65.0673C493.945 63.8318 489.14 62.3904 484.747 60.8118C480.422 59.2332 476.922 57.1055 474.245 54.4286C471.568 51.7518 470.195 48.1141 470.195 43.5841C470.195 38.0932 472.666 33.4945 477.539 29.8568C482.413 26.2191 488.453 24.3659 495.592 24.3659C503.692 24.3659 511.243 25.7386 518.107 28.4155C524.971 31.0923 530.668 34.73 535.061 39.26H535.267V10.0895C529.364 7.06955 523.049 4.87318 516.459 3.56909C509.87 2.265 502.868 1.57864 495.592 1.57864C485.708 1.57864 476.784 3.43182 468.822 7.06954C460.928 10.7073 454.613 15.855 449.946 22.5814C445.278 29.2391 442.944 37.0636 442.944 46.055C442.944 53.7423 444.317 60.1254 446.994 65.0673C449.671 70.0091 453.172 73.99 457.496 77.0786C461.821 80.1673 466.625 82.5009 471.98 84.2854C477.265 86.07 482.55 87.6486 487.767 88.9527C492.984 90.2568 497.789 91.6982 502.113 93.2082C506.438 94.7182 509.938 96.7086 512.615 99.1795C515.292 101.65 516.665 104.945 516.665 109.063C516.665 114.554 514.125 119.153 509.115 122.79C504.104 126.428 497.789 128.281 490.238 128.281C481.04 128.281 472.46 126.634 464.498 123.408C456.604 120.182 449.946 115.79 444.592 110.299H444.386V140.842C450.975 144.411 458.183 147.019 466.008 148.598C473.764 150.176 481.864 151 490.307 151C500.466 151 509.595 149.147 517.695 145.509C525.794 141.871 532.178 136.724 536.914 129.997C541.651 123.34 544.053 115.515 544.053 106.524C544.053 98.9736 542.68 92.7277 540.003 87.9232C537.326 83.1186 533.826 79.275 529.501 76.3236L529.364 76.4609ZM662.528 3.91227V63.6259H597.868V3.91227H569.794V148.529H597.868V87.9918H662.528V148.529H690.603V3.91227H662.528ZM141.539 0L72.3482 102.062H74.4075L117.171 81.6086V148.529H144.216V0H141.539Z" />
  </svg>
);

/**
 * Design System WebsiteHeader — shadcn/ui/Tailwind counterpart for the MUI
 * `WebsiteHeader`. Same nav/scroll-transition/drawer/prop API as the MUI
 * twin. The scroll-triggered background swap needs none of the MUI
 * version's CSS-Module-vs-Emotion workaround (see its own comment) —
 * Tailwind classes don't compete with a separate runtime styling engine, so
 * a plain conditional class/style is enough here.
 *
 * The scrolled-solid background is `interactive.primary` at 92% opacity via
 * `color-mix()` on the role's own CSS var, not a hardcoded rgba(0,15,71,…)
 * literal — it stays correct if the role's underlying color ever changes,
 * and already resolves per light/dark mode through the CSS-var bridge.
 */

export interface WebsiteHeaderNavItem {
  label: string;
  href?: string;
  hasMenu?: boolean;
}

export interface WebsiteHeaderProps {
  navItems?: WebsiteHeaderNavItem[];
  activeNavLabel?: string;
  languageLabel?: string;
  signInLabel?: string;
  contactLabel?: string;
  signInHref?: string;
  contactHref?: string;
  offsetTop?: number;
  position?: 'fixed' | 'sticky' | 'static';
  /**
   * Scroll distance (px) after which the header switches from transparent to
   * a solid primary-blue background. Defaults to half the viewport height,
   * matching the default 100vh hero used on most pages.
   */
  scrollThreshold?: number;
  onSearchClick?: () => void;
  onContactClick?: () => void;
  onSignInClick?: () => void;
  /** Whether the language selector renders on desktop. Default true. */
  showLanguageSelector?: boolean;
  /** Whether the Sign in / Contact us buttons render on desktop. Default true. */
  showAuthActions?: boolean;
  /** Whether the hamburger menu button is hidden at desktop widths (xl:, 1280px). Default false. */
  hideMenuButtonOnDesktop?: boolean;
  className?: string;
}

const defaultNavItems: WebsiteHeaderNavItem[] = [
  { label: 'Solutions', href: '#solutions', hasMenu: true },
  { label: 'Who we are', href: '#who-we-are', hasMenu: true },
  { label: 'Ai Hub', href: '#ai-hub', hasMenu: true },
  { label: 'Insights', href: '#insights', hasMenu: true },
  { label: 'Shop', href: '#shop', hasMenu: true },
];

export const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({
  navItems = defaultNavItems,
  activeNavLabel = 'Solutions',
  languageLabel = 'English (US)',
  signInLabel = 'Sign in',
  contactLabel = 'Contact us',
  signInHref,
  contactHref,
  offsetTop = 0,
  position = 'fixed',
  scrollThreshold,
  onSearchClick,
  onContactClick,
  onSignInClick,
  showLanguageSelector = true,
  showAuthActions = true,
  hideMenuButtonOnDesktop = false,
  className,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const threshold = scrollThreshold ?? window.innerHeight * 0.5;
    let ticking = false;

    const update = () => {
      setScrolled(window.scrollY > threshold);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollThreshold]);

  const handleSignIn = () => {
    if (onSignInClick) {
      onSignInClick();
      return;
    }
    if (signInHref) window.location.href = signInHref;
  };
  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
      return;
    }
    if (contactHref) window.location.href = contactHref;
  };

  const onHero: React.CSSProperties = { color: getRoleColor('text.onHero') };

  return (
    <>
      <header
        className={cn(
          'z-40 w-full isolate overflow-hidden',
          position === 'fixed' && 'fixed left-0',
          position === 'sticky' && 'sticky',
          position === 'static' && 'static',
          className
        )}
        style={{
          top: position !== 'static' ? offsetTop : undefined,
          backgroundColor: scrolled ? 'color-mix(in srgb, var(--role-interactive-primary) 92%, transparent)' : 'transparent',
          borderBottom: '1px solid rgba(255, 255, 255, 0.32)',
          backdropFilter: scrolled ? 'blur(10px) saturate(1.1)' : undefined,
          WebkitBackdropFilter: scrolled ? 'blur(10px) saturate(1.1)' : undefined,
          transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease',
        }}
      >
        {/*
          Stand-in for the MUI WebsiteHeader's `::before` overlay: pre-scroll,
          this dark blurred gradient darkens/blurs whatever hero content sits
          behind the (otherwise transparent) header so light nav text stays
          legible. It fades out once `scrolled` is true, when the header's own
          solid-ish background + backdrop blur (set above) take over instead.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 transition-opacity [transition-duration:0.35s] ease-in-out"
          style={{
            opacity: scrolled ? 0 : 1,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.32) 58%, rgba(0,0,0,0.08) 100%)',
            backdropFilter: 'blur(14px) saturate(1.12)',
            WebkitBackdropFilter: 'blur(14px) saturate(1.12)',
          }}
        />

        {/*
          Deliberately not the generic `container` utility (16/24/32px @
          768/1024) — this mirrors HeroBanner.tsx's own comment: Hero copies
          the header's bespoke padding steps (16/24/48px @ 576/1200, see
          Header.module.scss's .websiteHeader__toolbar) instead of the
          generic MDS grid, specifically so the header's content edge lines
          up with Hero's at every width. Keep these two in sync.
        */}
        <div className="relative z-10 mx-auto flex h-16 w-full max-w-container items-center justify-between px-4 min-[576px]:px-6 min-[1200px]:px-12">
          <div className="flex items-center gap-8">
            <a href="/" aria-label="Marsh home" style={onHero}>
              {/* Sky Blue (text.onHero → blue250 #ceecff) — same token driving the nav text color above. */}
              <MarshLogoMark className="h-8 w-auto" />
            </a>

            <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
              {navItems.map((item) => {
                const isActive = item.label === activeNavLabel;
                return (
                  <a
                    key={item.label}
                    href={item.href ?? '#'}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-1 border-b-2 py-1 text-sm font-medium transition-colors',
                      isActive ? 'border-current' : 'border-transparent'
                    )}
                    style={onHero}
                  >
                    <span>{item.label}</span>
                    {item.hasMenu && <ChevronDown className="h-4 w-4" aria-hidden />}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              inverse
              size="sm"
              iconOnly
              icon={<Search className="h-4 w-4" />}
              aria-label="Search"
              onClick={onSearchClick}
            />

            {showLanguageSelector && (
              <Button
                variant="ghost"
                inverse
                size="sm"
                className="hidden xl:inline-flex"
                startIcon={<Globe className="h-4 w-4" />}
                endIcon={<ChevronDown className="h-4 w-4" />}
                aria-label={`Language: ${languageLabel}`}
              >
                {languageLabel}
              </Button>
            )}

            {showAuthActions && (
              <div className="hidden items-center gap-2 lg:flex">
                <Button variant="ghost" inverse size="sm" onClick={handleSignIn}>
                  {signInLabel}
                </Button>
                <Button variant="secondary" inverse size="sm" onClick={handleContact}>
                  {contactLabel}
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              inverse
              size="sm"
              iconOnly
              icon={<Menu className="h-4 w-4" />}
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
              className={hideMenuButtonOnDesktop ? 'xl:hidden' : undefined}
            />
          </div>
        </div>
      </header>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="flex w-3/4 flex-col gap-6 sm:max-w-sm">
          <img src={MARSH_LOGO} alt="Marsh Logo" className="h-8 w-auto" />

          <nav className="flex flex-col gap-1" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href ?? '#'}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-md px-2 py-3 text-sm font-medium"
                style={{ color: getRoleColor('text.primary') }}
              >
                {item.label}
                {item.hasMenu && <ChevronDown className="h-4 w-4" aria-hidden />}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-2">
            <Button variant="ghost" size="md" startIcon={<Globe className="h-4 w-4" />}>
              {languageLabel}
            </Button>
            <Button variant="ghost" size="md" onClick={handleSignIn}>
              {signInLabel}
            </Button>
            <Button variant="secondary" size="md" onClick={handleContact}>
              {contactLabel}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default WebsiteHeader;
