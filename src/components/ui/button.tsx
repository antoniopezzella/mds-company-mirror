import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Button variants using class-variance-authority
 * Maps MDS design system variants to Tailwind classes with exact Figma V3 specs
 */
const buttonVariants = cva(
  // Base styles matching MUI Button exactly
  'inline-flex items-center justify-center gap-2 whitespace-nowrap box-border relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        // PRIMARY - Midnight Blue (role: interactive.primary) - Dashboards & standard CTAs
        // bg now reads the CSS-var bridge (RoleVarsProvider), which already
        // resolves to interactivePrimary's light/dark value — no dark:bg
        // override needed. text-[#ceecff]/dark:text-[#000f47] stay literal
        // for now (they pair with the #ceecff fix, batch 3).
        primary:
          'bg-[var(--role-interactive-primary)] text-[#ceecff] shadow-none hover:bg-[#082d9e] active:bg-[#0b4bff] disabled:bg-[#ebe7e2] disabled:text-[#878580] ' +
          'dark:text-[#000f47] dark:hover:bg-[#bbe1ff] dark:active:bg-[#d8f0ff] dark:disabled:bg-[#3b3b3b] dark:disabled:text-[#878787]',

        // PRIMARY ALT - Gold (#ffbf00) - Hero/Marketing CTAs
        // brandAccent is deliberately unchanged in semanticDarkOverrides
        // ("unchanged — CTA stays") — no dark: needed for the base color.
        primaryAlt:
          'bg-[#ffbf00] text-[#000f47] shadow-none hover:bg-[#eaa501] active:bg-[#d58b02] disabled:bg-[#ebe7e2] disabled:text-[#878580] ' +
          'dark:disabled:bg-[#3b3b3b] dark:disabled:text-[#878787]',

        // SECONDARY - Outline with midnight blue border (role: interactive.primary)
        secondary:
          'bg-transparent text-[var(--role-interactive-primary)] border-2 border-[var(--role-interactive-primary)] hover:bg-[rgba(0,0,0,0.08)] hover:text-[#082d9e] hover:border-[#082d9e] active:bg-[rgba(0,0,0,0.03)] active:text-[#0b4bff] active:border-[#0b4bff] disabled:bg-transparent disabled:text-[#878580] disabled:border-[#878580] ' +
          'dark:hover:bg-[rgba(255,255,255,0.08)] dark:hover:text-[#bbe1ff] dark:hover:border-[#bbe1ff] dark:active:bg-[rgba(255,255,255,0.03)] dark:active:text-[#d8f0ff] dark:active:border-[#d8f0ff] dark:disabled:text-[#878787] dark:disabled:border-[#878787]',

        // TERTIARY - Transparent/Ghost (role: interactive.primary)
        tertiary:
          'bg-transparent text-[var(--role-interactive-primary)] border-none hover:bg-[rgba(0,0,0,0.08)] hover:text-[#082d9e] active:bg-[rgba(0,0,0,0.03)] active:text-[#0b4bff] disabled:bg-transparent disabled:text-[#878580] ' +
          'dark:hover:bg-[rgba(255,255,255,0.08)] dark:hover:text-[#bbe1ff] dark:active:bg-[rgba(255,255,255,0.03)] dark:active:text-[#d8f0ff] dark:disabled:text-[#878787]',

        // DESTRUCTIVE - Red/Danger (applied when destructive=true)
        // dark: values from semanticDarkOverrides.interactiveDanger*.
        // text uses the CSS-var bridge (text.onInteractive), not a literal —
        // statusDanger's dark value (#ff6b6b) is a light red that fails
        // contrast against a fixed white (2.78:1); the role resolves to
        // white in light mode, Midnight in dark, correctly for both (5.34/
        // 6.53:1) with no manual dark: override needed.
        destructivePrimary:
          'bg-[#c53532] text-[var(--role-text-on-interactive)] shadow-none hover:bg-[#9a1c1f] active:bg-[#691315] disabled:bg-[#ebe7e2] disabled:text-[#878580] ' +
          'dark:bg-[#ff6b6b] dark:hover:bg-[#ff9d9d] dark:active:bg-[#ffe8e8] dark:disabled:bg-[#3b3b3b] dark:disabled:text-[#878787]',

        destructiveSecondary:
          'bg-transparent text-[#9a1c1f] border-2 border-[#c53532] hover:bg-[rgba(0,0,0,0.08)] hover:text-[#9a1c1f] hover:border-[#9a1c1f] active:bg-[rgba(0,0,0,0.03)] active:text-[#691315] active:border-[#691315] disabled:bg-transparent disabled:text-[#878580] disabled:border-[#878580] ' +
          'dark:text-[#ff6b6b] dark:border-[#ff6b6b] dark:hover:bg-[rgba(255,255,255,0.08)] dark:hover:text-[#ff9d9d] dark:hover:border-[#ff9d9d] dark:active:bg-[rgba(255,255,255,0.03)] dark:active:text-[#ffe8e8] dark:active:border-[#ffe8e8] dark:disabled:text-[#878787] dark:disabled:border-[#878787]',

        destructiveTertiary:
          'bg-transparent text-[#9a1c1f] border-none hover:bg-[rgba(0,0,0,0.08)] hover:text-[#9a1c1f] active:bg-[rgba(0,0,0,0.03)] active:text-[#691315] disabled:bg-transparent disabled:text-[#878580] ' +
          'dark:text-[#ff6b6b] dark:hover:bg-[rgba(255,255,255,0.08)] dark:hover:text-[#ff9d9d] dark:active:bg-[rgba(255,255,255,0.03)] dark:active:text-[#ffe8e8] dark:disabled:text-[#878787]',
        
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
      size: {
        sm: 'h-8 text-base font-bold leading-6',      // 32px height - Figma Small
        md: 'h-12 text-base font-bold leading-6',     // 48px height - Figma Default
        lg: 'h-14 text-base font-bold leading-6',     // 56px height - Figma Large
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
  
  /** Icon-only button: renders a square button */
  iconOnly?: boolean;
  
  /** Icon node for icon-only usage */
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
    size = 'md', 
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
    
    // Map legacy size names
    const normalizedSize = 
      size === 'small' ? 'sm' 
      : size === 'large' ? 'lg' 
      : size === 'medium' ? 'md' 
      : size;
    
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
    
    // Icon-only square dimensions (static classes for Tailwind)
    const iconOnlyClasses = iconOnly
      ? normalizedSize === 'sm'
        ? 'w-8 h-8 p-0'  // 32px
        : normalizedSize === 'lg'
        ? 'w-14 h-14 p-0'  // 56px
        : 'w-12 h-12 p-0'  // 48px (default)
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
          // Typography matching MUI exactly
          'font-[var(--typo-button-font-family,_Noto_Sans,_sans-serif)]',
          'text-base font-bold leading-6 tracking-normal',
          // Border radius
          'rounded-[2px]',
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
