import { useEffect, useState } from 'react';

/**
 * Tracks which of the given element ids is currently "active" while
 * scrolling — DOM-based (IntersectionObserver over element ids), so it
 * works even when the observed sections render in a child route via
 * <Outlet/>, one level below wherever this hook is called.
 */
export function useScrollSpy(ids: string[]): string | undefined {
  const [activeId, setActiveId] = useState<string | undefined>(ids[0]);

  useEffect(() => {
    if (ids.length === 0) {
      setActiveId(undefined);
      return;
    }
    setActiveId(ids[0]);

    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        // Prefer the first id (in registry order) currently visible, so the
        // sidebar tracks scroll position top-down rather than jumping to
        // whichever section's IntersectionObserver callback fired last.
        const firstVisible = ids.find((id) => visible.has(id));
        if (firstVisible) setActiveId(firstVisible);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  return activeId;
}
