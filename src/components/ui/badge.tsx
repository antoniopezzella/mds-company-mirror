"use client"

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { type RoleName, roleVar } from '@/theme/roles';

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
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap font-sans-productive font-normal transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      size: {
        /** Figma "Text Badge" spec (node-id 7584:27300): 24px tall, 8px padding, 8px radius, 14px text. */
        md: 'h-6 rounded-lg px-2 text-sm',
        /**
         * Dense contexts where a 24px pill would dominate its row — e.g. the
         * per-step status pills in `Stepper`'s `showStatusBadge` layout.
         * NOT in the Figma spec yet (Figma defines only the 24px size);
         * raise a Figma-side variant request before leaning on this widely.
         */
        sm: 'h-5 rounded-md px-1.5 text-xs',
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
  /**
   * Text for the `outline` variant, over the page rather than over a tint.
   *
   * The rule: the strongest TONAL colour that clears 4.5:1 against
   * surface.default in **both** modes; text.primary where no tonal colour can.
   * Only `warning` hits that wall — see its entry.
   */
  outlineFg: RoleName;
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
    // 18.11 light / 11.03 dark — interactive.primary is already mode-aware.
    outlineFg: 'interactive.primary',
  },
  success: {
    solidBg: 'status.success.border',
    solidFg: 'text.onSuccess', // white light / Midnight dark — dedicated on-* (was proxied via text.onInteractive)
    softBg: 'status.success.bg',
    softBorder: 'status.success.border',
    softFg: 'text.primary',
    outlineFg: 'status.success.fg', // 5.12 light / 17.85 dark
  },
  warning: {
    solidBg: 'status.warning.border',
    // Since V3's warning is a dark burnt orange (#c25600), the solid fill now
    // behaves like success/danger: text.onWarning flips white (light, 4.54:1) →
    // Midnight (dark, 13.41:1). It was the mode-invariant Midnight exception only
    // while warning was pale gold, where white failed (2.12:1).
    solidFg: 'text.onWarning',
    softBg: 'status.warning.bg',
    softBorder: 'status.warning.border',
    // Soft fill is the pale gold50 surface in both modes, so its text stays
    // mode-invariant Midnight — text.onLight carries the exact pixels
    // text.onWarning used to hold here, before it was repurposed for the
    // flipping solid case above.
    softFg: 'text.onLight',
    // status.warning.fg is now the #c25600 accent at 4.54:1 on white — legible
    // as this variant's 12px text, where the old gold1000 (3.41:1) was not and
    // forced a fall back to text.primary. Kept on the accent so the outline
    // badge reads in the warning hue.
    outlineFg: 'status.warning.fg',
  },
  danger: {
    solidBg: 'status.danger.border',
    solidFg: 'text.onDanger', // white light / Midnight dark — dedicated on-* (was proxied via text.onInteractive)
    softBg: 'status.danger.bg',
    softBorder: 'status.danger.border',
    softFg: 'text.primary',
    outlineFg: 'status.danger.fg', // 9.29 light / 16.27 dark
  },
};

export type BadgeVariant = 'outline' | 'soft' | 'solid';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Figma "Type" property — which status color the badge represents. */
  tone?: BadgeTone;
  /**
   * Visual treatment. Ignored for `default` and `disabled`, which have one
   * fixed treatment each.
   *
   * - `outline` (default) — transparent, tonal 1px border, tonal text.
   * - `soft` — light tint + tonal border + dark text (Figma "Soft background").
   * - `solid` — filled with the tone colour, light text.
   */
  variant?: BadgeVariant;
  /**
   * `@deprecated since 0.6.0; remove after 0.7.0 / 2026-12-23.` Use `variant`.
   * `soft` maps to `variant="soft"` and `soft={false}` to `variant="solid"`,
   * so existing call sites keep their exact appearance.
   */
  soft?: boolean;
  /** Pill size. `md` (default) is the Figma spec; `sm` is a non-Figma dense variant. */
  size?: 'md' | 'sm';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone = 'default', variant, soft, size = 'md', style, ...props }, ref) => {
    // An explicit legacy `soft` still wins, so every existing call site renders
    // exactly what it rendered before. Only call sites that passed NEITHER prop
    // move — which is the default change, and nothing wider than that.
    const resolved: BadgeVariant =
      variant ?? (soft === undefined ? 'outline' : soft ? 'soft' : 'solid');

    let backgroundColor: string;
    let color: string;
    let borderColor: string | undefined;

    if (tone === 'default') {
      backgroundColor = 'transparent';
      color = 'var(--role-text-primary)';
      borderColor = 'var(--role-border-default)';
    } else if (tone === 'disabled') {
      backgroundColor = 'var(--role-surface-disabled)';
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
      color = 'var(--role-text-secondary)';
      borderColor = undefined;
    } else {
      const roles = TONE_ROLES[tone];
      if (resolved === 'soft') {
        backgroundColor = roleVar(roles.softBg);
        color = roleVar(roles.softFg);
        borderColor = roleVar(roles.softBorder);
      } else if (resolved === 'outline') {
        // Transparent, not a tint: the badge sits on whatever surface it is
        // placed on — a table row, a card, a striped row — and any fixed tint
        // would fight those. The border carries the tone.
        backgroundColor = 'transparent';
        color = roleVar(roles.outlineFg);
        borderColor = roleVar(roles.softBorder);
      } else {
        backgroundColor = roles.solidBg ? roleVar(roles.solidBg) : 'transparent';
        color = roleVar(roles.solidFg);
        borderColor = undefined;
      }
    }

    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ size }),
          tone === 'default' || (tone !== 'disabled' && resolved !== 'solid') ? 'border' : '',
          className
        )}
        style={{ backgroundColor, color, borderColor, ...style }}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export default Badge;
