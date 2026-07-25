import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { getRoleColor, type RoleName } from '@/theme/roles';

/**
 * Design System Badge — shadcn/ui counterpart for the MDS "Text Badge"
 * Figma node (node-id 7584:27300). NOTE: the existing MUI `Badge.tsx` is a
 * different pattern entirely (an overlay indicator pinned to a child
 * element) and is not this component — this one is the standalone
 * tone-colored label pill the Figma spec actually describes.
 *
 * Pulled directly from Figma's get_design_context output for this node:
 * - Container: 24px tall, 8px horizontal padding, 8px corner radius (not a
 *   full pill), Noto Sans 14px/20px.
 * - "Neutral" and "Disabled" each have exactly one fixed visual treatment in
 *   Figma (no soft/solid split) — the `soft` prop has no effect for those.
 * - For every other tone, `soft=false` is a SOLID fill (dark bg, light
 *   text — Notice is the one exception, which keeps dark text on its solid
 *   fill for contrast) and `soft=true` is a light tint + colored border +
 *   dark text. This is the opposite of what the previous version of this
 *   file implemented (it had no solid-fill treatment at all).
 */

export type BadgeTone = 'default' | 'info' | 'success' | 'warning' | 'danger' | 'disabled';

const badgeVariants = cva(
  'inline-flex h-6 shrink-0 items-center justify-center whitespace-nowrap rounded-lg px-2 font-[var(--typo-body-font-family,_Noto_Sans,_sans-serif)] text-sm font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
);

interface ToneRoles {
  /** null = transparent (Neutral's outline treatment) */
  solidBg: RoleName | null;
  solidFg: RoleName;
  softBg: RoleName;
  softBorder: RoleName;
  softFg: RoleName;
}

// Solid-fill colors below reuse the *.border role because it happens to
// resolve to the same brand/status color Figma uses for the solid fill
// (e.g. status.success.border === #14853d, exactly Figma's solid "Positive"
// background) — roles.ts doesn't yet have a dedicated "solid fill" role
// (today's status.*.bg roles are the light tint used for the soft variant).
// TODO(token-request): propose status.*.bg.solid roles per CLAUDE.md's
// token request process instead of reusing border-intent roles as a bg.
const TONE_ROLES: Record<Exclude<BadgeTone, 'default' | 'disabled'>, ToneRoles> = {
  info: {
    solidBg: 'interactive.primary',
    solidFg: 'text.onAccent',
    // TODO(token-request): no existing role represents a light tint of the
    // brand-primary navy Figma uses for "Informative" — surface.accent is
    // the closest already-approved role, not a semantic match.
    softBg: 'surface.accent',
    softBorder: 'interactive.primary',
    softFg: 'text.primary',
  },
  success: {
    solidBg: 'status.success.border',
    solidFg: 'text.onAccent',
    softBg: 'status.success.bg',
    softBorder: 'status.success.border',
    softFg: 'text.primary',
  },
  warning: {
    solidBg: 'status.warning.border',
    solidFg: 'text.primary', // Notice keeps dark text on its solid fill — matches Figma exactly.
    softBg: 'status.warning.bg',
    softBorder: 'status.warning.border',
    softFg: 'text.primary',
  },
  danger: {
    solidBg: 'status.danger.border',
    solidFg: 'text.onAccent',
    softBg: 'status.danger.bg',
    softBorder: 'status.danger.border',
    softFg: 'text.primary',
  },
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Figma "Type" property — which status color the badge represents. */
  tone?: BadgeTone;
  /** Figma "Soft background" property. Ignored for `default` and `disabled`, which have one fixed treatment. */
  soft?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone = 'default', soft = false, style, ...props }, ref) => {
    let backgroundColor: string;
    let color: string;
    let borderColor: string | undefined;

    if (tone === 'default') {
      backgroundColor = 'transparent';
      color = getRoleColor('text.primary');
      borderColor = getRoleColor('border.default');
    } else if (tone === 'disabled') {
      backgroundColor = getRoleColor('surface.disabled');
      color = getRoleColor('text.disabled');
      borderColor = undefined;
    } else {
      const roles = TONE_ROLES[tone];
      if (soft) {
        backgroundColor = getRoleColor(roles.softBg);
        color = getRoleColor(roles.softFg);
        borderColor = getRoleColor(roles.softBorder);
      } else {
        backgroundColor = roles.solidBg ? getRoleColor(roles.solidBg) : 'transparent';
        color = getRoleColor(roles.solidFg);
        borderColor = undefined;
      }
    }

    return (
      <span
        ref={ref}
        className={cn(badgeVariants(), tone === 'default' || (tone !== 'disabled' && soft) ? 'border' : '', className)}
        style={{ backgroundColor, color, borderColor, ...style }}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export default Badge;
