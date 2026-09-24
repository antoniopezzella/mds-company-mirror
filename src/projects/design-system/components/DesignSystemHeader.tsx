import * as React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode, type ThemeMode } from '@/theme/ThemeModeContext';
import { Button } from '@/components/ui/button';

// Inferred from the locally-linked Vercel project name
// (.vercel/project.json → "marsh-design-system") and vercel.json's build
// step (`storybook build -o dist/storybook`, served at /storybook on that
// same deployment). Not independently verified against a live deployment —
// update this constant if the actual production alias differs.
const STORYBOOK_URL = 'https://marsh-design-system.vercel.app/storybook';

function ThemeModeSegment() {
  const { mode, toggleMode } = useThemeMode();
  const border = getRoleColor('border.default', { mode });
  const activeBg = getRoleColor('surface.subtle', { mode });
  const activeText = getRoleColor('text.primary', { mode });
  const inactiveText = getRoleColor('text.secondary', { mode });

  const select = (next: ThemeMode) => {
    if (next !== mode) toggleMode();
  };

  return (
    <div className="flex items-center rounded-xs border p-0.5" style={{ borderColor: border }} role="group" aria-label="Color theme">
      {(['light', 'dark'] as const).map((option) => {
        const isActive = mode === option;
        const Icon = option === 'light' ? Sun : Moon;
        return (
          <button
            key={option}
            type="button"
            onClick={() => select(option)}
            aria-pressed={isActive}
            className={cn('flex items-center gap-1.5 rounded-[4px] px-2.5 py-1.5 text-xs font-medium capitalize transition-colors', 'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2')}
            style={{ backgroundColor: isActive ? activeBg : 'transparent', color: isActive ? activeText : inactiveText }}
          >
            <Icon className="h-3.5 w-3.5" />
            {option}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Sticky top bar for the showcase — title, light/dark segmented control,
 * and a link out to the hosted Storybook. Consumes the app-wide
 * useThemeMode() directly rather than rolling local state (the mistake
 * CardTestPage/ColorSandbox each made independently).
 */
export const DesignSystemHeader: React.FC = () => {
  const { mode } = useThemeMode();
  const border = getRoleColor('border.default', { mode });
  const bg = getRoleColor('surface.default', { mode });
  const text = getRoleColor('text.primary', { mode });

  return (
    <div
      className="sticky top-0 z-10 flex items-center justify-between px-6 py-3"
      style={{ backgroundColor: bg, borderBottom: `1px solid ${border}` }}
    >
      <Link to="/design-system" className="text-sm font-semibold" style={{ color: text }}>
        Design System
      </Link>
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" asChild>
          <a href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer">
            View Storybook
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
        <ThemeModeSegment />
      </div>
    </div>
  );
};

export default DesignSystemHeader;
