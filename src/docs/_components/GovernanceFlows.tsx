import React, { createContext, useContext, useState } from 'react';
import { getRoleColor, type RoleName } from '../../theme/roles';

// ─────────────────────────────────────────────────────────────────────────
// Primitives — a small, reusable flow-diagram kit built on role tokens, so
// every diagram on this page is theme-aware (light/dark) for free instead
// of a static, hardcoded-hex image.
//
// Each diagram carries its own local light/dark preview toggle rather than
// following Storybook's toolbar Color Mode global — that global only
// reaches content rendered through a real <Story>, via the decorator in
// .storybook/preview.tsx; content authored directly in MDX prose (like
// these diagrams) isn't wrapped by it, and Storybook's hooks (useGlobals)
// are Story-context-only and throw outside one — confirmed by hitting that
// exact error while building this. getRoleColor()'s own explicit `{ mode }`
// parameter sidesteps the whole problem, so that's what drives this instead.
// ─────────────────────────────────────────────────────────────────────────

type Tone = 'neutral' | 'brand' | 'success' | 'danger' | 'warning' | 'info';

const TONE_ROLES: Record<Tone, { bg: RoleName; border: RoleName; fg: RoleName }> = {
  neutral: { bg: 'bg.neutral.subtle', border: 'border.default', fg: 'fg.primary' },
  brand: { bg: 'bg.primary', border: 'border.strong', fg: 'fg.on-primary' },
  success: { bg: 'bg.success.subtle', border: 'border.success', fg: 'fg.success' },
  danger: { bg: 'bg.critical.subtle', border: 'border.critical', fg: 'fg.critical' },
  warning: { bg: 'bg.warning.subtle', border: 'border.warning', fg: 'fg.warning' },
  info: { bg: 'bg.info.subtle', border: 'border.info', fg: 'fg.info' },
};

const FlowModeContext = createContext<'light' | 'dark'>('light');

function toneStyle(tone: Tone, mode: 'light' | 'dark'): React.CSSProperties {
  const { bg, border, fg } = TONE_ROLES[tone];
  return {
    background: getRoleColor(bg, { mode }),
    borderColor: getRoleColor(border, { mode }),
    color: getRoleColor(fg, { mode }),
  };
}

const nodeBase: React.CSSProperties = {
  border: '1.5px solid',
  borderRadius: 10,
  padding: '10px 14px',
  fontFamily: 'var(--typo-body2-font-family, "Noto Sans", sans-serif)',
  fontSize: 13,
  lineHeight: 1.4,
  minWidth: 0,
};

interface FlowStepProps {
  title: string;
  detail?: string;
  tone?: Tone;
  shape?: 'box' | 'decision' | 'terminal';
  width?: number | string;
}

/** A single node in a flow — a step, a decision, or a start/end terminal. */
export const FlowStep: React.FC<FlowStepProps> = ({ title, detail, tone = 'neutral', shape = 'box', width }) => {
  const mode = useContext(FlowModeContext);
  const style: React.CSSProperties = {
    ...nodeBase,
    ...toneStyle(tone, mode),
    width,
    textAlign: shape === 'decision' ? 'center' : 'left',
    borderRadius: shape === 'terminal' ? 999 : shape === 'decision' ? 14 : 10,
    boxShadow: '0 1px 2px rgba(16,26,51,0.06)',
  };
  return (
    <div style={style}>
      <div style={{ fontWeight: 600 }}>{title}</div>
      {detail && (
        <div
          style={{
            marginTop: 4,
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            fontSize: 11.5,
            opacity: 0.85,
            whiteSpace: 'pre-line',
          }}
        >
          {detail}
        </div>
      )}
    </div>
  );
};

interface FlowArrowProps {
  label?: string;
  direction?: 'down' | 'right';
}

/** A connector between two steps, optionally labeled (e.g. a yes/no branch). */
export const FlowArrow: React.FC<FlowArrowProps> = ({ label, direction = 'down' }) => {
  const mode = useContext(FlowModeContext);
  const isDown = direction === 'down';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isDown ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        color: getRoleColor('fg.neutral.subtle', { mode }),
        flexShrink: 0,
        padding: isDown ? '2px 0' : '0 4px',
      }}
    >
      {label && (
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
      <span aria-hidden="true" style={{ fontSize: isDown ? 16 : 18, lineHeight: 1 }}>
        {isDown ? '↓' : '→'}
      </span>
    </div>
  );
};

/** Side-by-side columns for parallel paths / branches. Wraps on narrow viewports. */
export const FlowBranches: React.FC<{ children: React.ReactNode; align?: 'start' | 'stretch' }> = ({
  children,
  align = 'start',
}) => (
  <div
    style={{
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap',
      alignItems: align,
      justifyContent: 'center',
      width: '100%',
    }}
  >
    {children}
  </div>
);

/** A single vertical branch/column: a step, then its own arrow, then the next step, etc. */
export const FlowColumn: React.FC<{ children: React.ReactNode; width?: number | string }> = ({
  children,
  width = 220,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width, flexShrink: 0 }}>
    {children}
  </div>
);

const ToggleButton: React.FC<{ mode: 'light' | 'dark'; onToggle: () => void }> = ({ mode, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    style={{
      position: 'absolute',
      top: 12,
      right: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      border: `1px solid ${getRoleColor('border.default', { mode })}`,
      borderRadius: 999,
      background: getRoleColor('bg.neutral.subtle', { mode }),
      color: getRoleColor('fg.neutral.subtle', { mode }),
      fontSize: 11.5,
      fontWeight: 600,
      padding: '5px 12px',
      cursor: 'pointer',
      fontFamily: 'var(--typo-body2-font-family, "Noto Sans", sans-serif)',
    }}
    aria-label={`Preview this diagram in ${mode === 'light' ? 'dark' : 'light'} mode`}
  >
    <span aria-hidden="true">{mode === 'light' ? '☾' : '☀'}</span>
    Preview {mode === 'light' ? 'dark' : 'light'}
  </button>
);

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const frameStyle: React.CSSProperties = {
    position: 'relative',
    border: `1px solid ${getRoleColor('border.default', { mode })}`,
    borderRadius: 14,
    padding: '28px 20px',
    background: getRoleColor('bg.default', { mode }),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowX: 'auto',
  };
  return (
    <FlowModeContext.Provider value={mode}>
      <div style={frameStyle}>
        <ToggleButton mode={mode} onToggle={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))} />
        {children}
      </div>
    </FlowModeContext.Provider>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// 1. System map
// ─────────────────────────────────────────────────────────────────────────

export const GovernanceMap: React.FC = () => (
  <Frame>
    <FlowBranches>
      <FlowColumn width={200}>
        <FlowStep title="Token & Role" detail="getRoleColor() only" tone="info" />
      </FlowColumn>
      <FlowColumn width={200}>
        <FlowStep title="CI Quality Gates" detail="lint · types · tests" tone="brand" />
      </FlowColumn>
      <FlowColumn width={200}>
        <FlowStep title="Documentation" detail="no root-level sprawl" tone="warning" />
      </FlowColumn>
    </FlowBranches>
    <FlowArrow />
    <FlowStep title="Merged" shape="terminal" tone="success" width={160} />
  </Frame>
);

// ─────────────────────────────────────────────────────────────────────────
// 2. Token & role governance
// ─────────────────────────────────────────────────────────────────────────

export const TokenGovernanceFlow: React.FC = () => (
  <Frame>
    <FlowBranches align="stretch">
      <FlowStep title="Primitive" detail={`src/tokens.ts\nblue1000: '#000f47'`} tone="neutral" width={190} />
      <FlowArrow direction="right" />
      <FlowStep title="Semantic" detail={`src/semantic-tokens.ts\ntextPrimary: ref('blue1000')`} tone="neutral" width={210} />
      <FlowArrow direction="right" />
      <FlowStep title="Role" detail={`src/theme/roles.ts\n'fg.primary' → fgPrimary`} tone="neutral" width={190} />
      <FlowArrow direction="right" />
      <FlowStep title="Component" detail={`getRoleColor('fg.primary')`} tone="info" width={190} />
    </FlowBranches>

    <div style={{ height: 24 }} />

    <FlowStep title="Someone writes a raw hex color instead of a role" tone="warning" width={320} />
    <FlowArrow />
    <FlowStep title="npm run roles:check --strict" shape="decision" tone="neutral" width={260} />
    <FlowBranches>
      <FlowColumn width={190}>
        <FlowArrow label="violation found" />
        <FlowStep title="CI fails" detail="governance.yml" tone="danger" />
      </FlowColumn>
      <FlowColumn width={190}>
        <FlowArrow label="clean" />
        <FlowStep title="Merges" tone="success" />
      </FlowColumn>
    </FlowBranches>
  </Frame>
);

// ─────────────────────────────────────────────────────────────────────────
// 3. CI quality gates
// ─────────────────────────────────────────────────────────────────────────

export const CIGatesFlow: React.FC = () => (
  <Frame>
    <FlowStep title="git push" shape="terminal" tone="brand" width={160} />
    <FlowArrow />
    <FlowStep title="Which branch?" shape="decision" tone="neutral" width={220} />

    <div style={{ height: 20 }} />

    <FlowBranches>
      <FlowColumn width={210}>
        <FlowStep title="ci.yml" detail="any branch push, PR → main" tone="info" />
        <FlowArrow />
        <FlowStep title="docs:lint" />
        <FlowArrow />
        <FlowStep title="lint" />
        <FlowArrow />
        <FlowStep title="tokens:check" />
        <FlowArrow />
        <FlowStep title="npm test" detail="unit + storybook" />
        <FlowArrow />
        <FlowStep title="build" />
        <FlowArrow label="PR only" />
        <FlowStep title="build-storybook" detail="→ artifact" tone="neutral" />
      </FlowColumn>

      <FlowColumn width={210}>
        <FlowStep title="governance.yml" detail="any branch push, PR → main" tone="info" />
        <FlowArrow />
        <FlowStep title="governance:ci" detail="roles:check + contrast, strict" />
      </FlowColumn>

      <FlowColumn width={210}>
        <FlowStep title="contrast.yml" detail="push + PR, src/** changed" tone="info" />
        <FlowArrow />
        <FlowStep title="check-contrast.js --all" detail="fails if totalFailed > 0" />
      </FlowColumn>

      <FlowColumn width={210}>
        <FlowStep title="commitlint.yml" detail="every push" tone="info" />
        <FlowArrow />
        <FlowStep title="conventional-commit format" />
      </FlowColumn>
    </FlowBranches>

    <div style={{ height: 20 }} />
    <FlowStep title="All green?" shape="decision" tone="neutral" width={220} />
    <FlowBranches>
      <FlowColumn width={190}>
        <FlowArrow label="yes" />
        <FlowStep title="Safe to merge" shape="terminal" tone="success" />
      </FlowColumn>
      <FlowColumn width={190}>
        <FlowArrow label="no" />
        <FlowStep title="Blocked" detail="fix locally, see Foundations/Testing" tone="danger" />
      </FlowColumn>
    </FlowBranches>
  </Frame>
);

// ─────────────────────────────────────────────────────────────────────────
// 4. Documentation governance
// ─────────────────────────────────────────────────────────────────────────

export const DocPlacementFlow: React.FC = () => (
  <Frame>
    <FlowStep title="I need to write a new doc" shape="terminal" tone="brand" width={260} />
    <FlowArrow />
    <FlowStep title="Does an existing doc already cover this?" shape="decision" tone="neutral" width={280} />
    <FlowBranches>
      <FlowColumn width={220}>
        <FlowArrow label="yes" />
        <FlowStep title="Extend it" detail="a dated addition, not a new file" tone="success" />
      </FlowColumn>
      <FlowColumn width={260}>
        <FlowArrow label="no" />
        <FlowStep title="Is this a one-off report of a task just completed?" shape="decision" tone="neutral" />
        <FlowArrow label="yes" />
        <FlowStep title="Don't write a file" detail="commit message / PR description instead" tone="success" />
      </FlowColumn>
    </FlowBranches>

    <div style={{ height: 8 }} />
    <FlowArrow label="no, and not a report either" />

    <FlowStep title="Is this a living reference?" detail="process, guide, how-to, status" shape="decision" tone="neutral" width={280} />
    <FlowBranches>
      <FlowColumn width={260}>
        <FlowArrow label="yes" />
        <FlowStep title="docs/get-started, foundations, guides, tasks — or docs/ itself" detail="for cross-cutting reference" tone="success" />
      </FlowColumn>
      <FlowColumn width={220}>
        <FlowArrow label="no" />
        <FlowStep title="Genuinely repo-root material?" shape="decision" tone="neutral" />
        <FlowArrow label="yes" />
        <FlowStep title="README, CLAUDE.md, SECURITY.md, CHANGELOG.md, DESIGN.md" detail="closed list — nothing else" tone="warning" />
      </FlowColumn>
    </FlowBranches>

    <FlowArrow />
    <FlowStep title="Add it to docs/README.md" detail="so it's findable" tone="info" width={240} />
    <FlowArrow />
    <FlowStep title="Done" shape="terminal" tone="success" width={140} />
  </Frame>
);

export default GovernanceMap;
