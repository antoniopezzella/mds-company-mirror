"use client"

// roles-allow-hex-file — and the list is now short and deliberate.
//
// This file used to carry 71 hex literals because hover/active/disabled had
// no roles. They do now (2026-09-30): the primary ramp moved to the values
// this file was already shipping, danger moved onto Figma's Traffic/Crimson
// ramp, and interactive.disabled.bg/.fg were added. Every one of those, plus
// every `dark:` colour override that existed only to hand-maintain the second
// mode, is gone — a role resolves per-mode on its own.
//
// What is left, and why each stays:
//   1. primary's `text-[#ceecff] dark:text-[#000f47]` — a genuine token gap.
//      No role flips Sky-on-Midnight to Midnight-on-Sky; see the note on the
//      variant itself.
//   2. The two `inverse*` variants — mode-INVARIANT by design (always
//      light-on-dark, for use over imagery and dark heroes). Giving them
//      roles would make them theme-responsive, which is the opposite of
//      their purpose.
//   3. `rgba(0,0,0,0.08)` / `0.03` and their white counterparts — translucent
//      washes over whatever sits behind the button, not palette values. A
//      role would have to be opaque.
//
// Removing this marker needs (1) resolved with a design decision; (2) and (3)
// are not debt and should keep an exemption whatever happens to (1).
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { CONTROL_RADIUS, useControlSize, type ControlSize } from './control-size';

/**
 * Button variants using class-variance-authority
 * Maps MDS design system variants to Tailwind classes with exact Figma V3 specs
 */
const buttonVariants = cva(
  // Base styles matching MUI Button exactly
  'inline-flex items-center justify-center gap-2 whitespace-nowrap box-border relative transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        // PRIMARY - Midnight Blue (role: interactive.primary) - Dashboards & standard CTAs
        //
        // text.onPrimary, NOT text.primary — the first is the label on a
        // primary fill (Sky, flipping to Midnight), the second is body text
        // (Midnight). Writing text.primary here renders navy on navy at
        // 1.00:1 and nothing catches it, since both are real role names.
        //
        // This pair was `text-[#ceecff] dark:text-[#000f47]` until the role
        // existed: text.onHero does not flip and text.onInteractive is white,
        // so neither could express Sky-on-Midnight. The last colour literal
        // and the last dark: override in this variant went with it.
        primary:
          'bg-[var(--role-interactive-primary)] text-[var(--role-text-onPrimary)] shadow-none hover:bg-[var(--role-interactive-primary-hover)] active:bg-[var(--role-interactive-primary-active)] disabled:bg-[var(--role-bg-disabled)] disabled:text-[var(--role-fg-disabled)]',

        // PRIMARY ALT - Gold (role: brand.accent) - Hero/Marketing CTAs
        // brandAccent and its hover/active are deliberately unchanged in
        // semanticDarkOverrides ("unchanged — CTA stays"), so the gold is
        // mode-invariant by design rather than by omission.
        primaryAlt:
          'bg-[var(--role-bg-accent)] text-[var(--role-fg-on-light)] shadow-none hover:bg-[var(--role-interactive-accent-hover)] active:bg-[var(--role-interactive-accent-active)] disabled:bg-[var(--role-bg-disabled)] disabled:text-[var(--role-fg-disabled)]',

        // SECONDARY - Outline with midnight blue border (role: interactive.primary)
        secondary:
          'bg-transparent text-[var(--role-interactive-primary)] border-2 border-[var(--role-interactive-primary)] hover:bg-[rgba(0,0,0,0.08)] hover:text-[var(--role-interactive-primary-hover)] hover:border-[var(--role-interactive-primary-hover)] active:bg-[rgba(0,0,0,0.03)] active:text-[var(--role-interactive-primary-active)] active:border-[var(--role-interactive-primary-active)] disabled:bg-transparent disabled:text-[var(--role-fg-disabled)] disabled:border-[var(--role-fg-disabled)] ' +
          // The only dark: left on this variant. These are translucent WASHES
          // over whatever is behind the button, not palette colours — a role
          // would have to be opaque, and the light/dark flip is black-vs-white
          // ink, which no single token can express.
          'dark:hover:bg-[rgba(255,255,255,0.08)] dark:active:bg-[rgba(255,255,255,0.03)]',

        // TERTIARY - Transparent/Ghost (role: interactive.primary)
        tertiary:
          'bg-transparent text-[var(--role-interactive-primary)] border-none hover:bg-[rgba(0,0,0,0.08)] hover:text-[var(--role-interactive-primary-hover)] active:bg-[rgba(0,0,0,0.03)] active:text-[var(--role-interactive-primary-active)] disabled:bg-transparent disabled:text-[var(--role-fg-disabled)] ' +
          'dark:hover:bg-[rgba(255,255,255,0.08)] dark:active:bg-[rgba(255,255,255,0.03)]',

        // DESTRUCTIVE - Traffic/Crimson (applied when destructive=true)
        //
        // NOTE the camelCase in --role-fg-on-interactive. RoleVarsProvider
        // derives var names with role.replaceAll('.', '-') and does NOT
        // kebab-case the segments. This read `--role-text-on-interactive` for
        // a while, which resolves to nothing, so the colour silently fell back
        // to inherited navy on the red fill: 3.38:1, wrong in the real app and
        // not just in tests. Same trap applies to every var below.
        //
        // text.onInteractive rather than a literal white: statusDanger's dark
        // value (#ff6b6b) is a light red that fails against fixed white
        // (2.78:1). The role gives white in light and Midnight in dark —
        // 5.34:1 and 6.53:1 — with no manual override.
        destructivePrimary:
          'bg-[var(--role-interactive-danger)] text-[var(--role-fg-on-interactive)] shadow-none hover:bg-[var(--role-interactive-danger-hover)] active:bg-[var(--role-interactive-danger-active)] disabled:bg-[var(--role-bg-disabled)] disabled:text-[var(--role-fg-disabled)]',

        destructiveSecondary:
          'bg-transparent text-[var(--role-interactive-danger-hover)] border-2 border-[var(--role-interactive-danger)] hover:bg-[rgba(0,0,0,0.08)] hover:text-[var(--role-interactive-danger-hover)] hover:border-[var(--role-interactive-danger-hover)] active:bg-[rgba(0,0,0,0.03)] active:text-[var(--role-interactive-danger-active)] active:border-[var(--role-interactive-danger-active)] disabled:bg-transparent disabled:text-[var(--role-fg-disabled)] disabled:border-[var(--role-fg-disabled)] ' +
          'dark:hover:bg-[rgba(255,255,255,0.08)] dark:active:bg-[rgba(255,255,255,0.03)]',

        destructiveTertiary:
          'bg-transparent text-[var(--role-interactive-danger-hover)] border-none hover:bg-[rgba(0,0,0,0.08)] hover:text-[var(--role-interactive-danger-hover)] active:bg-[rgba(0,0,0,0.03)] active:text-[var(--role-interactive-danger-active)] disabled:bg-transparent disabled:text-[var(--role-fg-disabled)] ' +
          'dark:hover:bg-[rgba(255,255,255,0.08)] dark:active:bg-[rgba(255,255,255,0.03)]',
        
        // INVERSE variants (for dark backgrounds)
        // text-[#000f47] here stays literal — always-navy-on-white text has
        // no role yet (textOnLight is orphaned, see semantic-tokens.ts).
        inversePrimary:
          'bg-white text-[#000f47] shadow-none hover:bg-white/90 active:bg-white/80',
        
        inverseSecondary:
          'bg-transparent text-[#ceecff] border-2 border-[#ceecff] hover:bg-[rgba(206,236,255,0.1)] active:bg-[rgba(206,236,255,0.2)]',
        
        inverseTertiary:
          'bg-transparent text-white border-none hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.2)] disabled:bg-transparent disabled:text-[#878580]',
      },
      // Heights come from the shared control scale in control-size.ts — the
      // same one Input/Select/Combobox/DatePicker/Textarea use — so a button
      // and a field declaring the same size are the same height.
      //
      // These were 32/48/56. A button and an input both at size="md" rendered
      // 48px and 40px respectively, so the button visibly towered over the
      // fields in every filter bar and search row. Nothing caught it: each
      // component was internally consistent and no story rendered them
      // together. Now 32/40/48, matching IBM Carbon.
      // Type tracks the control scale too, not just height. `text-base` at
      // every size put 16px bold button text beside a 14px input in the same
      // 32px row, which read as a mismatch even once the heights agreed.
      size: {
        sm: 'h-8 text-sm font-bold leading-5',        // 32px
        md: 'h-10 text-sm font-bold leading-5',       // 40px
        lg: 'h-12 text-base font-bold leading-6',     // 48px
      },
      // Icon-only size handled separately
      iconOnly: {
        true: '',
        false: 'px-3 sm:px-4',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
      iconOnly: false,
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'size'> {
  /** 
   * Visual style aligned to Figma V3 design system:
   * - **primary**: Midnight Blue filled (#000f47) - For dashboards & standard CTAs
   * - **primaryAlt**: Gold filled (#ffbf00) - For hero banners & marketing CTAs
   * - **secondary**: Outline with midnight blue border - Secondary actions
   * - **tertiary**: Transparent/minimal - Tertiary actions
   * 
   * Legacy aliases (backward compatible):
   * - **accent** → maps to primaryAlt
   * - **outline** → maps to secondary
   * - **ghost** → maps to tertiary
   */
  variant?: 'primary' | 'primaryAlt' | 'secondary' | 'tertiary' | 'accent' | 'outline' | 'ghost';
  
  /** Destructive/danger state - changes colors to red for ALL variants */
  destructive?: boolean;
  
  /** Legacy tone alias. `danger` maps to `destructive` */
  tone?: 'default' | 'danger' | 'success';
  
  /** Design sizes mapped to Figma: sm/small (32px), md/medium (48px), lg/large (56px) */
  size?: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
  
  /** Stretch the button to fill its container */
  fullWidth?: boolean;
  
  /**
   * Icon-only button: renders a square button showing ONLY
   * `icon ?? startIcon ?? endIcon` — `children` is discarded entirely,
   * even text. If you've passed text as `children` and it isn't
   * rendering, this is why; pass the icon via `icon`/`startIcon` instead.
   */
  iconOnly?: boolean;

  /** Icon node for icon-only usage. Required for anything to render when `iconOnly` is set and neither `startIcon` nor `endIcon` is passed. */
  icon?: React.ReactNode;
  
  /** Whether the button is in a loading state */
  loading?: boolean;
  
  /** Adjusts styling for use on dark backgrounds (e.g. Hero banners) */
  inverse?: boolean;
  
  /** Optional leading/trailing icon nodes */
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  
  /** Radix Slot composition */
  asChild?: boolean;
}

/**
 * Design System Button — Figma V3 compliant (shadcn/ui version)
 * 
 * **Exact API match with MUI Button** for seamless migration.
 * 
 * **Figma V3 Variants:**
 * - **Primary**: Midnight Blue filled (#000f47) - Dashboards & standard CTAs
 * - **Primary Alt**: Gold filled (#ffbf00) - Hero banners & marketing CTAs
 * - **Secondary**: Outline with midnight blue border - Secondary actions
 * - **Tertiary**: Transparent/ghost - Minimal actions
 * 
 * @example
 * ```tsx
 * // Primary - Midnight Blue filled
 * <Button variant="primary" size="lg">Save Changes</Button>
 * 
 * // Primary Alt - Gold CTA
 * <Button variant="primaryAlt" size="lg">Download Report</Button>
 * 
 * // Secondary - Outline
 * <Button variant="secondary">Learn More</Button>
 * 
 * // Tertiary - Ghost/minimal
 * <Button variant="tertiary">Cancel</Button>
 * 
 * // Destructive state (any variant turns red)
 * <Button variant="primary" destructive>Delete</Button>
 * 
 * // Inverse for dark backgrounds
 * <Button variant="secondary" inverse>Learn More</Button>
 * 
 * // With icons
 * <Button variant="primary" startIcon={<Plus />}>Add Item</Button>
 * 
 * // Icon only
 * <Button variant="tertiary" iconOnly icon={<X />} />
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'secondary', 
    size, 
    destructive = false,
    tone = 'default',
    iconOnly = false,
    icon,
    loading = false,
    inverse = false,
    fullWidth = false,
    startIcon, 
    endIcon, 
    asChild = false, 
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    // Map legacy variant names
    const normalizedVariant = 
      variant === 'outline' ? 'secondary' 
      : variant === 'ghost' ? 'tertiary' 
      : variant === 'accent' ? 'primaryAlt'
      : variant;
    
    // Map legacy size names, then fall back to an enclosing
    // ButtonGroup/InputGroup before defaulting to md — so a group can size
    // every child at once and a button inside one can never be the odd height
    // out. Without the `useControlSize` call this resolves to `undefined` and
    // cva's `defaultVariants.size` silently pins every button to md,
    // regardless of the group it sits in.
    const explicitSize: ControlSize | undefined =
      size === 'small' ? 'sm'
      : size === 'large' ? 'lg'
      : size === 'medium' ? 'md'
      : size;
    const normalizedSize = useControlSize(explicitSize);
    
    // Determine if destructive
    const isDestructive = destructive || tone === 'danger';
    
    // Resolve final variant based on destructive + inverse state
    const finalVariant = (() => {
      if (isDestructive) {
        if (normalizedVariant === 'primary' || normalizedVariant === 'primaryAlt') {
          return 'destructivePrimary';
        } else if (normalizedVariant === 'secondary') {
          return 'destructiveSecondary';
        } else {
          return 'destructiveTertiary';
        }
      }
      
      if (inverse) {
        if (normalizedVariant === 'primary' || normalizedVariant === 'primaryAlt') {
          return 'inversePrimary';
        } else if (normalizedVariant === 'secondary') {
          return 'inverseSecondary';
        } else {
          return 'inverseTertiary';
        }
      }
      
      return normalizedVariant as 'primary' | 'primaryAlt' | 'secondary' | 'tertiary';
    })();
    
    // Icon-only node (for iconOnly mode)
    const iconOnlyNode = icon ?? startIcon ?? endIcon;
    
    // Icon-only square dimensions (static classes for Tailwind).
    // Square, so these track the shared control heights above — an icon
    // button beside a text input must match it exactly.
    const iconOnlyClasses = iconOnly
      ? normalizedSize === 'sm'
        ? 'w-8 h-8 p-0'  // 32px
        : normalizedSize === 'lg'
        ? 'w-12 h-12 p-0'  // 48px
        : 'w-10 h-10 p-0'  // 40px (default)
      : '';
    
    const isDisabled = disabled || loading;
    
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ 
            variant: finalVariant, 
            size: normalizedSize, 
            iconOnly,
            fullWidth,
          }),
          // Icon-only square dimensions (static Tailwind classes)
          iconOnlyClasses,
          // Typography matching MUI exactly.
          //
          // Font SIZE and leading deliberately are NOT set here — they come
          // from the size variant above, so button type scales with the
          // control scale. They used to be hardcoded `text-base leading-6` on
          // this line, and because `cn()` is twMerge the later class won: the
          // size variant's `text-sm` was silently discarded and every button
          // rendered 16px regardless of size.
          'font-sans-productive',
          'font-bold tracking-normal',
          // Corner radius comes from CONTROL_RADIUS so a button and a field
          // beside it always agree. The comment here used to claim
          // `rounded-md` IS 2px on Tailwind's stock scale — it is 6px
          // (`xs` is 2, `sm` is 4, `md` is 6), so buttons shipped at more
          // than twice the intended radius for as long as that was believed.
          CONTROL_RADIUS,
          // Loading opacity
          loading && 'opacity-80',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {asChild ? (
          // Radix's Slot requires exactly one React element child — cloning
          // icon/loading wrapper spans around `children` here (as the
          // non-asChild branch below does) would pass Slot a children array
          // instead, which throws "Slot failed to slot onto its children."
          // asChild delegates entirely to the consumer's own element; icons/
          // loading aren't composed in for this branch.
          children
        ) : (
          <>
            {!iconOnly && startIcon && !loading && (
              <span className="inline-flex shrink-0">{startIcon}</span>
            )}
            {loading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
            {iconOnly ? iconOnlyNode : children}
            {!iconOnly && endIcon && !loading && (
              <span className="inline-flex shrink-0">{endIcon}</span>
            )}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button };
