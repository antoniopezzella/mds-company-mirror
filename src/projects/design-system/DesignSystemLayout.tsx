import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';
import { Toaster } from '@/components/ui/toaster';
import { SideNavigation, type SideNavItem } from '@/components/ui/side-navigation';
import { DesignSystemHeader } from './components/DesignSystemHeader';
import { categories } from './registry/categories';
import { useScrollSpy } from './hooks/useScrollSpy';

const DesignSystemLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode } = useThemeMode();

  const currentCategory = categories.find((c) => location.pathname === c.path);
  const componentIds = React.useMemo(() => currentCategory?.components.map((c) => c.id) ?? [], [currentCategory]);
  // DOM-based (IntersectionObserver over element ids), so this works even
  // though the observed sections render one level below in <Outlet/>.
  const activeComponentId = useScrollSpy(componentIds);

  const handleNavigate = (path: string) => {
    const [routePath, hash] = path.split('#');
    navigate(hash ? `${routePath}#${hash}` : routePath);
  };

  // Real src/components/ui/side-navigation.tsx, not a bespoke sidebar —
  // driven with defaultOpenAll/navigateOnGroupClick (new, additive,
  // opt-in props; every existing consumer's behavior is unchanged) so
  // every category stays expanded and its header still navigates, and
  // each component's `active` state is computed here from scroll-spy
  // rather than left to the component's own path-only default.
  const items: SideNavItem[] = categories.map((category) => ({
    label: category.label,
    path: category.path,
    subItems: category.components.map((component) => ({
      label: component.title,
      path: `${category.path}#${component.id}`,
      active: category.id === currentCategory?.id && component.id === activeComponentId,
    })),
  }));

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: getRoleColor('surface.default', { mode }) }}>
      <aside className="sticky top-0 h-screen w-64 flex-shrink-0">
        <SideNavigation
          items={items}
          currentPath={location.pathname}
          onNavigate={handleNavigate}
          ariaLabel="Design system components"
          variant="light"
          defaultOpenAll
          navigateOnGroupClick
          hideSupportCta
        />
      </aside>
      <div className="min-w-0 flex-1">
        <DesignSystemHeader />
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default DesignSystemLayout;
