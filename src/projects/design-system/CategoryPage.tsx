import * as React from 'react';
import { useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';
import { categories } from './registry/categories';
import { ComponentSection } from './components/ComponentSection';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { hash, pathname } = useLocation();
  const { mode } = useThemeMode();
  const category = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    if (!hash) return;
    // BrowserRouter doesn't auto-scroll to location.hash on navigation the
    // way a plain same-page <a href="#x"> does — this is what makes a
    // guidance cross-link (e.g. /design-system/forms#textarea) actually
    // land on the right section after a route change.
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [pathname, hash]);

  if (!category) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-lg font-semibold" style={{ color: getRoleColor('fg.primary', { mode }) }}>
          Category not found
        </p>
        <Link to="/design-system" className="mt-2 inline-block text-sm underline" style={{ color: getRoleColor('interactive.primary', { mode }) }}>
          Back to Design System
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h2 className="text-3xl font-semibold" style={{ color: getRoleColor('fg.primary', { mode }) }}>
        {category.label}
      </h2>
      {category.description && (
        <p className="mt-2 text-base" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
          {category.description}
        </p>
      )}
      <div className="mt-8">
        {category.components.map((entry) => (
          <ComponentSection key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
