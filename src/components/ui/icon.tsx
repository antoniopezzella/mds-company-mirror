import * as React from 'react';

import { cn } from '@/lib/utils';
import type { IconName } from './icon-names';

/**
 * Icon — Google Material Symbols (Outlined), self-hosted variable font.
 *
 * The font (`material-symbols/outlined.css`) is imported once globally in
 * `src/index.css`; this component just drives its variable axes. The glyph is
 * selected by its LIGATURE name (`"info"`, `"check_circle"`, `"warning"`), so
 * there is no per-icon import and no tree-shaking question — one font covers the
 * whole set. Browse the names on the Foundations/Icons page or at
 * fonts.google.com/icons.
 *
 * Colour is `currentColor` — the icon inherits the text colour of its context,
 * so wrap it and set `color` (or a role) on the wrapper rather than here.
 *
 * Accessibility: pass `aria-label` for an icon that carries meaning on its own
 * (renders `role="img"`); omit it for a decorative icon sitting next to a text
 * label (renders `aria-hidden`), which is the common case in this library.
 *
 * `name` is typed to the blessed set (`IconName`) — the subset font only ships
 * those glyphs, so an unlisted name is a compile error rather than an empty box.
 * Weight, grade and optical-size are pinned in the subset (400 / 0 / 24); only
 * the FILL axis is variable, exposed as `fill`. Add an icon in `icon-names.ts`
 * and run `npm run icons:subset`.
 */

export interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Material Symbols ligature name, from the blessed set. */
  name: IconName;
  /** Pixel size. Default 20. */
  size?: number;
  /** Filled variant (FILL axis). The MDS status glyphs are filled. Default false. */
  fill?: boolean;
  /** Accessible name. Provide for a meaningful icon; omit for a decorative one. */
  'aria-label'?: string;
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ name, size = 20, fill = false, className, style, 'aria-label': ariaLabel, ...rest }, ref) => {
    const decorative = ariaLabel == null;
    return (
      <span
        ref={ref}
        className={cn('material-symbols-outlined', className)}
        aria-hidden={decorative || undefined}
        role={decorative ? undefined : 'img'}
        aria-label={ariaLabel}
        style={{
          fontSize: size,
          fontVariationSettings: `'FILL' ${fill ? 1 : 0}`,
          ...style,
        }}
        {...rest}
      >
        {name}
      </span>
    );
  }
);
Icon.displayName = 'Icon';

export { Icon };
