import * as React from 'react';
import { Link } from 'react-router-dom';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';
import { categories } from './registry/categories';

const DesignSystemIndexPage: React.FC = () => {
  const { mode } = useThemeMode();
  const titleColor = getRoleColor('text.primary', { mode });
  const bodyColor = getRoleColor('text.secondary', { mode });
  const cardBg = getRoleColor('surface.subtle', { mode });
  const cardBorder = getRoleColor('border.default', { mode });
  const linkColor = getRoleColor('interactive.primary', { mode });

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: linkColor }}>
        Marsh Design System
      </p>
      <h1 className="mt-2 text-4xl font-semibold" style={{ color: titleColor }}>
        Component reference
      </h1>
      <p className="mt-4 max-w-xl text-base" style={{ color: bodyColor }}>
        Every component here is the real, live shadcn-migrated implementation — not a recreation. Each one comes
        with guidance on when to reach for it, and when a sibling component is the better fit.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className="rounded-lg border p-5 transition-colors"
            style={{ borderColor: cardBorder, backgroundColor: cardBg }}
          >
            <h2 className="text-lg font-semibold" style={{ color: titleColor }}>
              {category.label}
            </h2>
            {category.description && (
              <p className="mt-1 text-sm" style={{ color: bodyColor }}>
                {category.description}
              </p>
            )}
            <p className="mt-3 text-xs" style={{ color: bodyColor }}>
              {category.components.length} component{category.components.length === 1 ? '' : 's'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesignSystemIndexPage;
