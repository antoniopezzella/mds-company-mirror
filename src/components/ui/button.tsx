import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Button variants using class-variance-authority
 * Maps MDS design system variants to Tailwind classes
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 active:bg-primary/80',
        primaryAlt:
          'bg-accent text-accent-foreground shadow hover:bg-accent/90 active:bg-accent/80',
        secondary:
          'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground active:bg-primary/90',
        tertiary:
          'bg-transparent text-primary hover:bg-primary/10 active:bg-primary/20',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-12 px-4',
        lg: 'h-14 px-5 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
  /** @deprecated Use 'destructive' variant instead */
  destructive?: boolean;
}

/**
 * MDS Button Component
 * 
 * Built on shadcn/ui + Radix UI primitives
 * Uses MDS token system via CSS variables
 * 
 * Variants:
 * - primary: Midnight Blue fill (#002c77)
 * - primaryAlt: Gold fill (#ffb700) with blue text
 * - secondary: Transparent with blue border (outline style)
 * - tertiary: Transparent with blue text only
 * - destructive: Red/danger state
 * 
 * @example
 * <Button variant="primary" size="lg">Submit</Button>
 * <Button variant="primaryAlt" size="md">Learn More</Button>
 * <Button variant="secondary">Cancel</Button>
 * <Button loading>Processing...</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, destructive, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    // Handle legacy 'destructive' prop (boolean)
    const finalVariant = destructive ? 'destructive' : variant;
    
    return (
      <Comp
        className={cn(buttonVariants({ variant: finalVariant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button };
