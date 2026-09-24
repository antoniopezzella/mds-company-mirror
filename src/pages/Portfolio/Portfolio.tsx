import React, { useEffect, useRef, useState } from 'react';
import styles from './Portfolio.module.scss';
import PortfolioComponentGallery from './PortfolioComponentGallery';

// ── Scroll-reveal hook ────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ── Animated number counter ───────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.5);

  useEffect(() => {
    if (!visible) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setCount(Math.floor(ease * target));
      if (t < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [visible, target]);

  return (
    <div ref={ref}>
      {count}{suffix}
    </div>
  );
}

// ── Reveal wrapper ────────────────────────────────────────────────────────
function Reveal({ children, stagger = false, delay = 0, className = '' }: {
  children: React.ReactNode;
  stagger?: boolean;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  const cls = [
    stagger ? styles.stagger : styles.fadeUp,
    visible ? styles.visible : '',
    className,
  ].join(' ');

  return (
    <div
      ref={ref}
      className={cls}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

// ── Color Palette data ────────────────────────────────────────────────────
const palettes = [
  {
    name: 'Blue', anchor: '#000f47',
    stops: ['#f5fbff','#ebf7ff','#d8f0ff','#ceecff','#95caff','#6fb4ff','#478aff','#0b4bff','#042791','#000f47'],
  },
  {
    name: 'Gold', anchor: '#ffb700',
    stops: ['#fffcf8','#fff8ed','#fff5e1','#fff2da','#ffbd84','#ff994a','#ffa02e','#ffb700','#e09015','#cb7623'],
  },
  {
    name: 'Green', anchor: '#64bc30',
    stops: ['#f8fcf7','#f2faef','#e5f5df','#def2d7','#addbae','#8dcc92','#7cc664','#64bc30','#4a9e1a','#2d6a0a'],
  },
  {
    name: 'Red', anchor: '#e53e3e',
    stops: ['#fff8f8','#ffe8e8','#ffd0d0','#ffb8b8','#ff8585','#ff5252','#ff2a2a','#e53e3e','#c0392b','#7a0000'],
  },
  {
    name: 'Purple', anchor: '#7c3aed',
    stops: ['#faf8ff','#f3eeff','#e9dcff','#ddc8ff','#c09aff','#a66eff','#8b42ff','#7c3aed','#5b21b6','#3b0a8a'],
  },
  {
    name: 'Gray', anchor: '#303c37',
    stops: ['#f9fafa','#f2f4f3','#e8ecea','#d8dcda','#b8beba','#8f9692','#686e6a','#4a524e','#303c37','#1a2420'],
  },
  {
    name: 'Neutral', anchor: '#595959',
    stops: ['#f8f8f8','#f0f0f0','#e3e3e3','#dadada','#c0c0c0','#a0a0a0','#878787','#767676','#595959','#2d2d2d'],
  },
];

// ── Semantic tokens preview ───────────────────────────────────────────────
const semanticPreview = [
  { name: 'brandPrimary', color: '#000f47', desc: 'Primary brand — Midnight Blue', hex: '#000f47' },
  { name: 'interactiveSecondary', color: '#0b4bff', desc: 'Active Blue — links & focus', hex: '#0b4bff' },
  { name: 'textSecondary', color: '#595959', desc: 'Secondary body text', hex: '#595959' },
  { name: 'surfaceSubtle', color: '#f8f8f8', desc: 'Slight elevation surface', hex: '#f8f8f8', border: true },
  { name: 'borderFocus', color: '#3d7aff', desc: 'Focus ring — WCAG 2.4.11', hex: '#3d7aff' },
  { name: 'statusSuccess', color: '#64bc30', desc: 'Success state surfaces', hex: '#64bc30' },
  { name: 'statusWarning', color: '#ffb700', desc: 'Warning state surfaces', hex: '#ffb700' },
  { name: 'statusError', color: '#e53e3e', desc: 'Error state surfaces', hex: '#e53e3e' },
];

// ── Main Portfolio Component ──────────────────────────────────────────────
const Portfolio: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [progressWidths, setProgressWidths] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setProgressWidths(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.portfolio}>

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navLogo}>Antonio Pezzella · MDS</div>
        <ul className={styles.navLinks}>
          <li><a href="#foundations">Foundations</a></li>
          <li><a href="#components">Components</a></li>
          <li><a href="#accessibility">Accessibility</a></li>
          <li><a href="#governance">Governance</a></li>
          <li><a href="#contact" className={styles.navCta}>Contact</a></li>
        </ul>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.heroContent}>
          <div className={`${styles.heroEyebrow} ${styles.fadeIn} ${styles.visible}`}>
            Design Systems Engineer
          </div>

          <h1 className={`${styles.heroTitle} ${styles.fadeUp} ${styles.visible}`}
            style={{ transitionDelay: '100ms' }}>
            Building the{' '}
            <span className={styles.heroTitleAccent}>foundation</span>
            {' '}that scales design.
          </h1>

          <p className={`${styles.heroDesc} ${styles.fadeUp} ${styles.visible}`}
            style={{ transitionDelay: '200ms' }}>
            I led the end-to-end architecture of the Marsh Design System — from
            primitive color tokens to semantic roles, accessible components,
            and governance tooling used across the Marsh McLennan group.
          </p>

          <div className={`${styles.heroCtas} ${styles.fadeUp} ${styles.visible}`}
            style={{ transitionDelay: '300ms' }}>
            <a href="#foundations" className={styles.heroBtnPrimary}>
              View the work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className={styles.heroBtnSecondary}>
              Get in touch
            </a>
          </div>

          <div className={`${styles.heroStats} ${styles.fadeUp} ${styles.visible}`}
            style={{ transitionDelay: '450ms' }}>
            <div className={styles.heroStat}>
              <div className={styles.heroStatNum}>7</div>
              <div className={styles.heroStatLabel}>Color Palettes</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.heroStatNum}>120+</div>
              <div className={styles.heroStatLabel}>Design Tokens</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.heroStatNum}>30+</div>
              <div className={styles.heroStatLabel}>Components</div>
            </div>
          </div>
        </div>

        <div className={styles.scrollCue}>
          <div className={styles.scrollCueArrow} />
          Scroll
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section className={styles.section} id="about">
        <div className={styles.aboutGrid}>
          <Reveal>
            <div className={styles.sectionEyebrow}>About the project</div>
            <h2 className={styles.sectionTitle}>Marsh Design System</h2>
            <div className={styles.aboutText}>
              <p>
                The <strong>Marsh Design System (MDS)</strong> is the single source of design truth
                for the world's leading insurance broker. I architected it from the ground up —
                designing the token taxonomy, semantic layer, component API, and governance framework.
              </p>
              <p>
                This portfolio walks through every layer: primitive color palettes, semantic tokens,
                role-based consumption, accessible components, grid system, and the tooling that
                keeps it all consistent at scale.
              </p>
            </div>
            <div className={styles.tagList}>
              {['Token Architecture','Semantic Color','WCAG 2.1 AA','Component API','Storybook','Figma Variables','Governance','React + TypeScript'].map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </Reveal>

          {/* Right: mini system diagram */}
          <Reveal delay={150}>
            <div style={{
              background: '#f7f8f8',
              borderRadius: 24,
              padding: 40,
              border: '1px solid rgba(0,15,71,0.06)'
            }}>
              {[
                { label: 'Primitive Tokens', sublabel: 'blue1000, gold750…', color: '#ceecff', text: '#000f47', pct: '100%' },
                { label: 'Semantic Tokens', sublabel: 'brandPrimary, textSecondary…', color: '#0b4bff', text: '#fff', pct: '80%' },
                { label: 'Role Layer', sublabel: 'text.primary, surface.subtle…', color: '#042791', text: '#fff', pct: '60%' },
                { label: 'Components', sublabel: 'Button, Card, TextField…', color: '#000f47', text: '#fff', pct: '40%' },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: i < 3 ? 8 : 0 }}>
                  <div style={{
                    background: item.color,
                    color: item.text,
                    borderRadius: 12,
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: `${i * 8}%`,
                    transition: 'margin-left 0.5s',
                  }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{item.label}</div>
                      <div style={{ fontSize: 11, opacity: 0.6, fontFamily: 'monospace', marginTop: 2 }}>{item.sublabel}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" opacity="0.5">
                      <path d="M8 12l-5-5 5-5M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 8 8)"/>
                    </svg>
                  </div>
                  {i < 3 && (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M2 7l4 4 4-4" stroke="#0b4bff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className={styles.divider} />

      {/* ── Foundations: Token Architecture ────────────────────────────── */}
      <section className={styles.section} id="foundations">
        <Reveal>
          <div className={styles.sectionEyebrow}>Foundations · Layer 1</div>
          <h2 className={styles.sectionTitle}>Primitive Color Tokens</h2>
          <p className={styles.sectionDesc}>
            Seven curated palettes, each with 14 perceptually-balanced stops from 50 to 1000.
            Four Figma anchor points per palette — rigorously mapped to the brand's visual language.
          </p>
        </Reveal>

        {/* Palette grid */}
        <Reveal stagger>
          <div className={styles.colorGrid}>
            {palettes.map(palette => (
              <div key={palette.name} className={styles.colorPalette}>
                <div className={styles.colorPaletteName}>{palette.name}</div>
                {palette.stops.map((color, i) => (
                  <div
                    key={i}
                    className={i === 7 ? styles.colorSwatchMain : styles.colorSwatch}
                    style={{ background: color }}
                    title={color}
                  >
                    {i === 7 && (
                      <span style={{
                        color: palette.name === 'Gold' || palette.name === 'Green' ? '#000f47' : '#ffffff',
                        fontSize: 9, fontFamily: 'monospace', fontWeight: 700
                      }}>
                        ★
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Code snippet */}
        <Reveal delay={200}>
          <div className={styles.codeBlock}>
            <pre>
              <span className={styles.codeComment}>{'// tokens.ts — Primitive color tokens'}</span>{'\n'}
              <span className={styles.codeKey}>export const tokens</span>{' = {\n'}
              {'  '}<span className={styles.codeComment}>{'// Blue palette — 14 stops, 4 Figma anchors (★)'}</span>{'\n'}
              {'  '}<span className={styles.codeKey}>blue50</span>{'  : '}<span className={styles.codeString}>'#f5fbff'</span>{',   '}<span className={styles.codeComment}>{'// interpolated'}</span>{'\n'}
              {'  '}<span className={styles.codeKey}>blue250</span>{' : '}<span className={styles.codeString}>'#ceecff'</span>{',   '}<span className={styles.codeComment}>{'// ★ anchor — Sky'}</span>{'\n'}
              {'  '}<span className={styles.codeKey}>blue750</span>{' : '}<span className={styles.codeString}>'#0b4bff'</span>{',   '}<span className={styles.codeComment}>{'// ★ anchor — Active Blue'}</span>{'\n'}
              {'  '}<span className={styles.codeKey}>blue1000</span>{': '}<span className={styles.codeString}>'#000f47'</span>{',   '}<span className={styles.codeComment}>{'// ★ anchor — Midnight'}</span>{'\n'}
              {'  ...\n'}
              {'}'}
            </pre>
          </div>
        </Reveal>
      </section>

      {/* ── Layer 2: Semantic Tokens ────────────────────────────────────── */}
      <div style={{ background: '#f7f8f8' }}>
        <section className={styles.section} id="semantic">
          <Reveal>
            <div className={styles.sectionEyebrow}>Foundations · Layer 2</div>
            <h2 className={styles.sectionTitle}>Semantic Token Mapping</h2>
            <p className={styles.sectionDesc}>
              Primitives are never used directly in components. Semantic tokens express
              <em> intent</em> — enabling theme switching, dark mode, and brand variants
              without touching component code.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className={styles.semanticTable}>
              <div className={styles.semanticRowHeader}>
                <div>Token Name</div>
                <div />
                <div>Intent</div>
                <div>Value</div>
              </div>
              {semanticPreview.map(token => (
                <div key={token.name} className={styles.semanticRow}>
                  <div className={styles.semanticTokenName}>{token.name}</div>
                  <div
                    className={styles.semanticColorDot}
                    style={{
                      background: token.color,
                      border: token.border ? '1px solid #e3e3e3' : '1px solid rgba(0,0,0,0.08)'
                    }}
                  />
                  <div className={styles.semanticDesc}>{token.desc}</div>
                  <div className={styles.semanticHex}>{token.hex}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      </div>

      {/* ── Layer 3: Role System ────────────────────────────────────────── */}
      <section className={styles.section}>
        <Reveal>
          <div className={styles.sectionEyebrow}>Foundations · Layer 3</div>
          <h2 className={styles.sectionTitle}>Role-Based Consumption</h2>
          <p className={styles.sectionDesc}>
            A third layer — <em>roles</em> — sits above semantic tokens. Components reference
            roles like <code style={{fontSize:14,background:'#f0f4ff',color:'#0b4bff',padding:'2px 8px',borderRadius:4}}>text.primary</code> or{' '}
            <code style={{fontSize:14,background:'#f0f4ff',color:'#0b4bff',padding:'2px 8px',borderRadius:4}}>surface.subtle</code>,
            never primitives. This decouples components from palette shifts and enables
            governance-enforced constraints.
          </p>
        </Reveal>

        <Reveal stagger delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 48 }}>
            {[
              { category: 'text.*', roles: ['text.primary','text.secondary','text.tertiary','text.disabled','text.onAccent'], color: '#000f47' },
              { category: 'surface.*', roles: ['surface.default','surface.subtle','surface.muted','surface.navigation','surface.hero'], color: '#0b4bff' },
              { category: 'interactive.*', roles: ['interactive.primary','interactive.primary.hover','interactive.primary.active','interactive.primary.disabled'], color: '#042791' },
            ].map(group => (
              <div key={group.category} style={{
                background: '#f7f8f8',
                borderRadius: 16,
                padding: 28,
                border: '1px solid rgba(0,15,71,0.06)'
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: group.color, marginBottom: 16
                }}>
                  {group.category}
                </div>
                {group.roles.map(role => (
                  <div key={role} style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 12,
                    color: '#595959',
                    padding: '6px 0',
                    borderBottom: '1px solid rgba(0,15,71,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span style={{ color: '#0b4bff', fontWeight: 700 }}>→</span>
                    {role}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Component Library ──────────────────────────────────────────── */}
      <div className={styles.darkSection} id="components">
        <div className={styles.darkSectionInner}>
          <Reveal>
            <div className={styles.darkEyebrow}>Component Library</div>
            <h2 className={styles.darkTitle}>30+ Production Components</h2>
            <p className={styles.darkDesc}>
              Every component is token-driven, WCAG 2.1 AA compliant,
              documented in Storybook, and tested with Vitest.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bento grid — component previews */}
      <div style={{ background: '#000f47', padding: '0 48px 120px' }}>
        <Reveal stagger>
          <div className={styles.componentBento}>

            {/* Buttons — large */}
            <div className={`${styles.bentoCard} ${styles.bentoCol7}`}>
              <div className={styles.bentoLabel}>Button · 4 variants</div>
              <div className={styles.bentoTitle}>Button System</div>
              <div className={styles.bentoDesc}>Primary, Secondary, Ghost, and Disabled states with full keyboard & focus management.</div>
              <div className={styles.miniButtons}>
                <span className={styles.miniBtnPrimary}>Primary</span>
                <span className={styles.miniBtnSecondary}>Secondary</span>
                <span className={styles.miniBtnGhost}>Ghost</span>
                <span className={styles.miniBtnDisabled}>Disabled</span>
              </div>
            </div>

            {/* Navigation */}
            <div className={`${styles.bentoCardDark} ${styles.bentoCol5}`}>
              <div className={styles.bentoLabelLight}>Navigation · Side & Header</div>
              <div className={styles.bentoTitleLight}>Navigation</div>
              <div className={styles.bentoDescLight}>Accessible nav with aria-current and keyboard traversal.</div>
              <div className={styles.miniNav}>
                <span className={styles.miniNavItemActive}>Dashboard</span>
                <span className={styles.miniNavItem}>Policies</span>
                <span className={styles.miniNavItem}>Claims</span>
                <span className={styles.miniNavItem}>Reports</span>
              </div>
            </div>

            {/* Form fields */}
            <div className={`${styles.bentoCard} ${styles.bentoCol4}`}>
              <div className={styles.bentoLabel}>Form Components</div>
              <div className={styles.bentoTitle}>TextField & Select</div>
              <div className={styles.bentoDesc}>Controlled inputs with error/helper states.</div>
              <input className={styles.miniInput} placeholder="Policy reference…" readOnly />
              <select className={styles.miniSelect}>
                <option>Marine cargo</option>
              </select>
            </div>

            {/* Alerts */}
            <div className={`${styles.bentoCard} ${styles.bentoCol8}`}>
              <div className={styles.bentoLabel}>Alert · 4 severities</div>
              <div className={styles.bentoTitle}>Alert System</div>
              <div className={styles.bentoDescLight} style={{ color: '#595959' }}>Semantic color coding with ARIA live regions.</div>
              <div className={styles.miniAlertSuccess}><span>✓</span> Policy renewal confirmed — effective 1 Jan 2026</div>
              <div className={styles.miniAlertWarning}><span>⚠</span> Certificate expires in 14 days</div>
              <div className={styles.miniAlertError}><span>✕</span> Submission failed — please review required fields</div>
              <div className={styles.miniAlertInfo}><span>ℹ</span> Market briefing available for Q1 2026</div>
            </div>

            {/* Chips */}
            <div className={`${styles.bentoCard} ${styles.bentoCol4}`}>
              <div className={styles.bentoLabel}>Chips & Badges</div>
              <div className={styles.bentoTitle}>Status Indicators</div>
              <div className={styles.miniChips}>
                <span className={styles.miniChipDefault}>All risks</span>
                <span className={styles.miniChipActive}>Marine</span>
                <span className={styles.miniChipBlue}>Aviation</span>
                <span className={styles.miniChipDefault}>Property</span>
                <span className={styles.miniChipBlue}>Financial</span>
              </div>
              <div className={styles.miniBadges} style={{ marginTop: 16 }}>
                <span className={styles.miniBadge} style={{ background: '#def2d7', color: '#1a5c0f' }}>Active</span>
                <span className={styles.miniBadge} style={{ background: '#fff2da', color: '#7a4a00' }}>Pending</span>
                <span className={styles.miniBadge} style={{ background: '#ffe8e8', color: '#7a0000' }}>Lapsed</span>
              </div>
            </div>

            {/* Progress */}
            <div className={`${styles.bentoCardDark} ${styles.bentoCol8}`}>
              <div className={styles.bentoLabelLight}>Progress & Stepper</div>
              <div className={styles.bentoTitleLight}>Progress Indicators</div>
              <div className={styles.miniProgress}>
                {[
                  { label: 'Submission', value: 100 },
                  { label: 'Underwriting', value: 78 },
                  { label: 'Binding', value: 42 },
                ].map(item => (
                  <div key={item.label}>
                    <div className="progressLabel" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden', marginBottom: 14 }}>
                      <div style={{
                        height: '100%', borderRadius: 100,
                        background: item.value === 100 ? '#64bc30' : '#6fb4ff',
                        width: progressWidths ? `${item.value}%` : '0%',
                        transition: 'width 1.8s cubic-bezier(0.16,1,0.3,1)'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Reveal>
      </div>

      {/* ── Live Component Gallery (real MDS components) ────────────────── */}
      <div className={styles.divider} />
      <PortfolioComponentGallery />
      <div className={styles.divider} />

      {/* ── Accessibility ───────────────────────────────────────────────── */}
      <section className={styles.section} id="accessibility">
        <Reveal>
          <div className={styles.sectionEyebrow}>Accessibility</div>
          <h2 className={styles.sectionTitle}>WCAG 2.1 AA — by design</h2>
          <p className={styles.sectionDesc}>
            Accessibility wasn't retrofitted. Every token pair was tested for contrast,
            every component was built with keyboard navigation and screen reader semantics from day one.
          </p>
        </Reveal>

        <Reveal stagger delay={100}>
          <div className={styles.a11yGrid}>

            <div className={styles.a11yCard}>
              <div className={styles.a11yIcon} style={{ background: '#def2d7' }}>🎨</div>
              <div className={styles.a11yTitle}>Contrast Testing</div>
              <div className={styles.a11yDesc}>All critical text/background pairs tested and documented. AA guardrails enforced via automated CI tests.</div>
              <div className={styles.contrastPairs}>
                {[
                  { bg: '#000f47', fg: '#ffffff', label: 'Text on Nav', ratio: '17.1:1' },
                  { bg: '#ffffff', fg: '#000f47', label: 'Body on White', ratio: '17.1:1' },
                  { bg: '#ffffff', fg: '#595959', label: 'Secondary Text', ratio: '7.1:1' },
                  { bg: '#0b4bff', fg: '#ffffff', label: 'Text on Blue CTA', ratio: '4.8:1' },
                ].map(pair => (
                  <div key={pair.label} className={styles.contrastPair}
                    style={{ background: pair.bg, border: pair.bg === '#ffffff' ? '1px solid #e3e3e3' : 'none' }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: pair.fg }}>{pair.label}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className={styles.contrastRatio} style={{ color: pair.fg }}>{pair.ratio}</span>
                      <span className={parseFloat(pair.ratio) >= 7 ? styles.wcagAAA : styles.wcagAA}>
                        {parseFloat(pair.ratio) >= 7 ? 'AAA' : 'AA'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.a11yCard}>
              <div className={styles.a11yIcon} style={{ background: '#ceecff' }}>⌨️</div>
              <div className={styles.a11yTitle}>Keyboard Navigation</div>
              <div className={styles.a11yDesc}>Every interactive component supports full keyboard operation. Radix primitives provide focus trapping in modals and menus, and the dashboard page template ships a skip-to-content link.</div>
              <div style={{ marginTop: 20 }}>
                {['Tab / Shift+Tab — focus traversal','Enter / Space — activate controls','Escape — dismiss modals & menus','Arrow keys — navigate within groups','Home/End — jump to first/last item'].map(k => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(0,15,71,0.06)', fontSize: 13, color: '#595959' }}>
                    <span style={{ color: '#0b4bff', fontWeight: 700 }}>→</span>
                    <code style={{ fontSize: 12, background: '#f0f4ff', padding: '2px 8px', borderRadius: 4, color: '#0b4bff' }}>{k.split(' — ')[0]}</code>
                    <span>{k.split(' — ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.a11yCard}>
              <div className={styles.a11yIcon} style={{ background: '#fff2da' }}>📋</div>
              <div className={styles.a11yTitle}>Semantic HTML & ARIA</div>
              <div className={styles.a11yDesc}>Correct HTML5 landmarks, ARIA roles, live regions, and labelling patterns. Every Storybook story is gated by axe-core at error severity — a violation fails the build.</div>
              <div style={{ marginTop: 20 }}>
                {[
                  'aria-live regions on Alerts & Snackbars',
                  'aria-current="page" on active nav items',
                  'aria-expanded on accordions & menus',
                  'aria-describedby on form fields with errors',
                  'role="dialog" + focus trap on modals',
                  'Visible focus indicators — 3px offset ring',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(0,15,71,0.06)', fontSize: 13, color: '#595959' }}>
                    <span style={{ color: '#64bc30', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Reveal>
      </section>

      {/* ── Grid & Spacing ──────────────────────────────────────────────── */}
      <div style={{ background: '#f7f8f8' }}>
        <section className={styles.section} id="grid">
          <Reveal>
            <div className={styles.sectionEyebrow}>Layout System</div>
            <h2 className={styles.sectionTitle}>12-Column Grid & Spacing Scale</h2>
            <p className={styles.sectionDesc}>
              A flexible 12-column grid with breakpoint-aware gutters (16 → 24 → 32px),
              paired with an 8pt spacing scale for consistent rhythm across all components.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className={styles.gridDemo}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#767676', marginBottom: 16 }}>
                12-Column grid · 1280px container
              </div>
              <div className={styles.gridRow}>
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className={styles.gridCol}>{i + 1}</div>
                ))}
              </div>
              {[
                { cols: [8, 4] },
                { cols: [4, 4, 4] },
                { cols: [3, 3, 3, 3] },
                { cols: [6, 6] },
              ].map((row, ri) => (
                <div key={ri} className={styles.gridRow}>
                  {row.cols.map((span, ci) => (
                    <div key={ci} style={{ gridColumn: `span ${span}` }}
                      className={styles.gridCol}>
                      {span}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 40 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#000f47', marginBottom: 20 }}>Spacing Scale (8pt base)</div>
                <div className={styles.spacingScale}>
                  {[
                    { token: 'space-1', px: 4 },
                    { token: 'space-2', px: 8 },
                    { token: 'space-3', px: 12 },
                    { token: 'space-4', px: 16 },
                    { token: 'space-6', px: 24 },
                    { token: 'space-8', px: 32 },
                    { token: 'space-12', px: 48 },
                    { token: 'space-16', px: 64 },
                  ].map(({ token, px }) => (
                    <div key={token} className={styles.spacingRow}>
                      <div className={styles.spacingLabel}>{token}</div>
                      <div className={styles.spacingBar} style={{ width: px * 2 }} />
                      <div className={styles.spacingValue}>{px}px</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#000f47', marginBottom: 20 }}>Breakpoint System</div>
                {[
                  { bp: 'xs', value: '< 480px', desc: 'Single column, 16px gutters' },
                  { bp: 'sm', value: '480–768px', desc: 'Single/double column, 16px gutters' },
                  { bp: 'md', value: '768–1024px', desc: 'Multi-column, 24px gutters' },
                  { bp: 'lg', value: '1024–1280px', desc: 'Full grid, 24px gutters' },
                  { bp: 'xl', value: '≥ 1280px', desc: 'Full grid, 32px gutters, max 1200px' },
                ].map(bp => (
                  <div key={bp.bp} style={{
                    display: 'flex', gap: 16, padding: '12px 0',
                    borderBottom: '1px solid rgba(0,15,71,0.06)',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: '#000f47', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 800, flexShrink: 0
                    }}>{bp.bp}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#000f47' }}>{bp.value}</div>
                      <div style={{ fontSize: 12, color: '#767676' }}>{bp.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      {/* ── Governance ──────────────────────────────────────────────────── */}
      <div className={styles.darkSection} id="governance">
        <div className={styles.darkSectionInner}>
          <Reveal>
            <div className={styles.darkEyebrow}>Governance & Process</div>
            <h2 className={styles.darkTitle}>Built for scale, built to last</h2>
            <p className={styles.darkDesc}>
              A design system without governance is just a component library.
              I built the full enforcement pipeline — from Figma variables to CI test suites.
            </p>
          </Reveal>

          <Reveal stagger delay={100}>
            <div className={styles.govGrid}>
              {[
                {
                  icon: '🔬',
                  title: 'Automated Testing',
                  desc: 'Vitest test suites covering token exports, contrast ratios, role mappings, and component snapshots — run on every PR.',
                  items: ['Token export integrity tests','Contrast ratio enforcement (WCAG AA)','Role-to-semantic resolution contract','Component snapshot regression tests'],
                },
                {
                  icon: '📐',
                  title: 'Token Governance',
                  desc: 'ESLint rules and custom scripts prevent components from referencing primitive tokens directly — semantic layer consumption enforced.',
                  items: ['Primitive token leak detection','Unused token reporting','Semantic-to-primitive audit trail','CI/CD token diff reports'],
                },
                {
                  icon: '📚',
                  title: 'Storybook Documentation',
                  desc: 'Every component has complete Storybook documentation with interactive controls, usage guidelines, and do/don\'t patterns.',
                  items: ['Interactive prop controls','Accessibility add-on integration','Usage guidelines per component','Auto-generated API tables'],
                },
                {
                  icon: '🎨',
                  title: 'Figma Variables Sync',
                  desc: 'Figma variables mirror the token taxonomy exactly — primitives, semantic, and modes — enabling designers to work with the same system as developers.',
                  items: ['Primitives → Figma local variables','Semantic aliases via Figma variable refs','Light / Dark mode switching','Annotation & code-connect integration'],
                },
              ].map(card => (
                <div key={card.title} className={styles.govCard}>
                  <div className={styles.govCardIcon}>{card.icon}</div>
                  <div className={styles.govCardTitle}>{card.title}</div>
                  <div className={styles.govCardDesc}>{card.desc}</div>
                  <ul className={styles.govList}>
                    {card.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Project Timeline ────────────────────────────────────────────── */}
      <section className={styles.section} id="process">
        <Reveal>
          <div className={styles.sectionEyebrow}>Process</div>
          <h2 className={styles.sectionTitle}>Design System journey</h2>
          <p className={styles.sectionDesc}>
            From research and audit through to a fully governed, production-ready system.
          </p>
        </Reveal>

        <div className={styles.timeline}>
          {[
            {
              phase: 'Phase 1 · Discovery',
              title: 'Audit & Token Architecture',
              desc: 'Audited the existing inconsistent styles across Marsh digital properties. Defined the 3-layer token taxonomy — primitives, semantic aliases, and role-based consumption — aligned with the Figma Variables API.',
              outcomes: ['7 color palettes defined','14-stop perceptual scale','Figma variable structure'],
            },
            {
              phase: 'Phase 2 · Foundation',
              title: 'Semantic Layer & Role System',
              desc: 'Built semantic-tokens.ts and roles.ts, establishing the intent-based naming convention. Implemented governance scripts to detect primitive leakage. Added contrast enforcement to CI.',
              outcomes: ['120+ semantic tokens','Role mapping contract','WCAG CI enforcement'],
            },
            {
              phase: 'Phase 3 · Components',
              title: 'Component Library Build',
              desc: 'Developed 30+ production components in React + TypeScript. Each component references only role tokens, includes full accessibility implementation, and is documented in Storybook with interactive controls.',
              outcomes: ['30+ components','100% token-driven','Storybook docs'],
            },
            {
              phase: 'Phase 4 · Integration',
              title: 'Platform Integration & Corporate LP',
              desc: 'Applied the design system across the Marsh dashboard, corporate landing page, and RESG asset management interface. Validated at scale with performance audits and accessibility reviews.',
              outcomes: ['Lighthouse 95+ scores','Screen reader validated','Multi-product deployment'],
            },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className={styles.timelineItem}>
                <div className={styles.timelinePhase}>{item.phase}</div>
                <div className={styles.timelineTitle}>{item.title}</div>
                <div className={styles.timelineDesc}>{item.desc}</div>
                <div className={styles.timelineOutcomes}>
                  {item.outcomes.map(o => (
                    <span key={o} className={styles.timelineOutcome}>
                      <span>✓</span>{o}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Metrics ─────────────────────────────────────────────────────── */}
      <div className={styles.darkSection}>
        <div className={styles.darkSectionInner}>
          <Reveal>
            <div className={styles.darkEyebrow}>Impact</div>
            <h2 className={styles.darkTitle}>System by the numbers</h2>
          </Reveal>

          <Reveal stagger delay={100}>
            <div className={styles.metricsRow}>
              {[
                { num: 7, suffix: '', label: 'Color palettes,\n14 stops each', accent: true },
                { num: 120, suffix: '+', label: 'Design tokens across\n3 abstraction layers', accent: false },
                { num: 30, suffix: '+', label: 'Production-ready\ncomponents', accent: true },
                { num: 100, suffix: '%', label: 'Components WCAG\n2.1 AA compliant', accent: false },
              ].map((m, i) => (
                <div key={i} className={styles.metricCard}>
                  <div className={m.accent ? styles.metricNumAccent : styles.metricNum}>
                    <Counter target={m.num} suffix={m.suffix} />
                  </div>
                  <div className={styles.metricLabel} style={{ whiteSpace: 'pre-line' }}>{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── CTA / Contact ────────────────────────────────────────────────── */}
      <section className={styles.ctaSection} id="contact">
        <div className={styles.ctaContent}>
          <Reveal>
            <h2 className={styles.ctaTitle}>Let's build something great together.</h2>
            <p className={styles.ctaDesc}>
              I'm open to senior design systems, UI engineering, and design engineering
              roles where I can drive system thinking at scale.
            </p>
            <div className={styles.ctaButtons}>
              <a href="mailto:antonio.pezzella@example.com" className={styles.heroBtnPrimary}>
                Get in touch
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/antoniopezzella"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroBtnSecondary}
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerText}>
          © 2025 Antonio Pezzella · Marsh Design System Portfolio
        </div>
        <div className={styles.footerLinks}>
          <a href="#about">About</a>
          <a href="#foundations">Foundations</a>
          <a href="#components">Components</a>
          <a href="#governance">Governance</a>
        </div>
      </footer>

    </div>
  );
};

export default Portfolio;
