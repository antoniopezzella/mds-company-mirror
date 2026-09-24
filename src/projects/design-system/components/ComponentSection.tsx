import * as React from 'react';
import { Link } from 'react-router-dom';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';
import type { ComponentEntry } from '../registry/types';
import { guidance } from '../registry/guidance';
import { findCategoryForComponent } from '../registry/categories';

export interface ComponentSectionProps {
  entry: ComponentEntry;
}

function GuidanceBlock({ componentId }: { componentId: string }) {
  const { mode } = useThemeMode();
  const entry = guidance[componentId];
  if (!entry || (entry.use.length === 0 && entry.avoid.length === 0)) return null;

  const linkColor = getRoleColor('interactive.primary', { mode });
  const textColor = getRoleColor('text.secondary', { mode });
  const headingColor = getRoleColor('text.primary', { mode });

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2">
      {entry.use.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: headingColor }}>
            Use it when
          </h4>
          <ul className="space-y-1.5 text-sm" style={{ color: textColor }}>
            {entry.use.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}
      {entry.avoid.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: headingColor }}>
            Reach for something else when
          </h4>
          <ul className="space-y-1.5 text-sm" style={{ color: textColor }}>
            {entry.avoid.map((item, i) => {
              const relatedCategory = item.relatedComponentId ? findCategoryForComponent(item.relatedComponentId) : undefined;
              return (
                <li key={i}>
                  {item.text}
                  {relatedCategory && item.relatedComponentId && item.relatedLabel && (
                    <Link to={`${relatedCategory.path}#${item.relatedComponentId}`} style={{ color: linkColor }} className="underline underline-offset-2">
                      {item.relatedLabel}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export const ComponentSection: React.FC<ComponentSectionProps> = ({ entry }) => {
  const { mode } = useThemeMode();
  const titleColor = getRoleColor('text.primary', { mode });
  const summaryColor = getRoleColor('text.secondary', { mode });
  const sourceColor = getRoleColor('text.secondary', { mode });
  const borderColor = getRoleColor('border.default', { mode });
  const demoBg = getRoleColor('surface.subtle', { mode });

  return (
    <section id={entry.id} className="scroll-mt-20 border-b py-10 first:pt-0 last:border-b-0" style={{ borderColor }}>
      <h3 className="text-2xl font-semibold" style={{ color: titleColor }}>
        {entry.title}
      </h3>
      {entry.summary && (
        <p className="mt-1 text-sm" style={{ color: summaryColor }}>
          {entry.summary}
        </p>
      )}
      <div className="mt-4 rounded-sm border p-6" style={{ borderColor, backgroundColor: demoBg }}>
        {entry.demo()}
      </div>
      <GuidanceBlock componentId={entry.id} />
      <p className="mt-4 font-mono text-xs" style={{ color: sourceColor }}>
        {entry.sourcePath}
      </p>
    </section>
  );
};

export default ComponentSection;
