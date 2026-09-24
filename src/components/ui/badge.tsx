"use client"

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
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap font-[var(--typo-body-font-family,_Noto_Sans,_sans-serif)] font-normal transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      size: {
        /** Figma "Text Badge" spec (node-id 7584:27300): 24px tall, 8px padding, 8px radius, 14px text. */
        md: 'h-6 rounded-sm px-2 text-sm',
        /**
         * Dense contexts where a 24px pill would dominate its row — e.g. the
         * per-step status pills in `Stepper`'s `showStatusBadge` layout.
         * NOT in the Figma spec yet (Figma defines only the 24px size);
         * raise a Figma-side variant request before leaning on this widely.
         */
        sm: 'h-5 rounded-xs px-1.5 text-xs',
      },
    },
    defaultVariants: { size: 'md' },
  }
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
    // text.onInteractive, not text.onAccent: interactive.primary lightens in
    // dark mode (#95caff) instead of staying dark, so a fixed white fails
    // there (1.73:1) — text.onInteractive resolves white/Midnight per mode.
    solidFg: 'text.onInteractive',
    // TODO(token-request): no existing role represents a light tint of the
    // brand-primary navy Figma uses for "Informative" — surface.accent is
    // the closest already-approved role, not a semantic match.
    softBg: 'surface.accent',
    softBorder: 'interactive.primary',
    softFg: 'text.primary',
  },
  success: {
    solidBg: 'status.success.border',
    solidFg: 'text.onInteractive', // same dark-mode-lightens shape as interactive.primary (border dark = #8dcc92)
    softBg: 'status.success.bg',
    softBorder: 'status.success.border',
    softFg: 'text.primary',
  },
  warning: {
    solidBg: 'status.warning.border',
    // text.onLight, not text.primary: text.primary flips to white in dark
    // mode (for the general dark page background), but warning's border/bg
    // stay light/mid-toned gold in BOTH modes — white text there fails
    // (2.12:1 solid, 3.41:1 soft). text.onLight is mode-invariant Midnight,
    // matching what this tone actually needs in both modes (8.55/5.31:1).
    solidFg: 'text.onLight',
    softBg: 'status.warning.bg',
    softBorder: 'status.warning.border',
    softFg: 'text.onLight',
  },
  danger: {
    solidBg: 'status.danger.border',
    solidFg: 'text.onInteractive', // same shape as interactive.danger (border dark = interactiveDanger's #ff6b6b)
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
  /** Pill size. `md` (default) is the Figma spec; `sm` is a non-Figma dense variant. */
  size?: 'md' | 'sm';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone = 'default', soft = false, size = 'md', style, ...props }, ref) => {
    let backgroundColor: string;
    let color: string;
    let borderColor: string | undefined;

    if (tone === 'default') {
      backgroundColor = 'transparent';
      color = getRoleColor('text.primary');
      borderColor = getRoleColor('border.default');
    } else if (tone === 'disabled') {
      backgroundColor = getRoleColor('surface.disabled');
      // text.secondary, not text.disabled. WCAG 1.4.3 exempts text that is part
      // of an *inactive user interface component* — but a Badge is a status
      // label, not a control the user is locked out of. "Disabled" here is a
      // visual tone describing something else; the label itself still has to be
      // read. text.disabled on surface.disabled measures 3.54:1, under AA;
      // text.secondary gives 5.46:1 while staying visibly muted.
      //
      // Deliberately scoped to the Badge rather than changing text.disabled
      // globally, where the exemption does legitimately apply (disabled inputs,
      // disabled buttons).
      color = getRoleColor('text.secondary');
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
        className={cn(badgeVariants({ size }), tone === 'default' || (tone !== 'disabled' && soft) ? 'border' : '', className)}
        style={{ backgroundColor, color, borderColor, ...style }}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export default Badge;
