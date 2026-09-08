import * as React from 'react';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor, type RoleName } from '@/theme/roles';

export type ChipTone = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type ChipVariant = 'filled' | 'outlined';
export type ChipSize = 'sm' | 'md' | 'lg';

const chipVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-[var(--typo-body2-font-family,_Noto_Sans,_sans-serif)] font-medium transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-6 px-2.5 text-xs',
        md: 'h-8 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      interactive: false,
    },
  }
);

const iconSizeClass: Record<ChipSize, string> = {
  sm: 'h-4 w-4 -ml-0.5',
  md: 'h-5 w-5 -ml-0.5',
  lg: 'h-6 w-6 -ml-1',
};

const deleteIconSizeClass: Record<ChipSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

function getToneRoles(tone: ChipTone): { bg: RoleName; fg: RoleName; border: RoleName } {
  switch (tone) {
    case 'primary':
      return { bg: 'surface.accent', fg: 'text.inverse', border: 'interactive.primary' };
    case 'secondary':
      return { bg: 'surface.subtle', fg: 'text.primary', border: 'border.default' };
    case 'success':
      return { bg: 'status.success.bg', fg: 'status.success.fg', border: 'status.success.fg' };
    case 'warning':
      return { bg: 'status.warning.bg', fg: 'status.warning.fg', border: 'status.warning.fg' };
    case 'danger':
      return { bg: 'status.danger.bg', fg: 'status.danger.fg', border: 'status.danger.fg' };
    case 'info':
      return { bg: 'surface.accent', fg: 'text.primary', border: 'status.warning.fg' };
    default:
      return { bg: 'surface.subtle', fg: 'text.primary', border: 'border.default' };
  }
}

export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  label: React.ReactNode;
  variant?: ChipVariant;
  tone?: ChipTone;
  size?: ChipSize;
  selectable?: boolean;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Design System Chip — shadcn/ui counterpart for the MDS Chip. Same
 * `label`/`variant`/`tone`/`size`/`selectable`/`selected`/`onDelete`/`icon`
 * API as the MUI twin.
 */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    { label, variant = 'filled', tone = 'default', size = 'md', selectable = false, selected = false, onClick, onDelete, icon, disabled = false, className, ...rest },
    ref
  ) => {
    const [hover, setHover] = React.useState(false);
    const { bg, fg, border } = getToneRoles(tone);
    const isFilled = variant === 'filled' || (selectable && selected);
    const isInteractive = Boolean(selectable || onClick);

    const style: React.CSSProperties = disabled
      ? {
          backgroundColor: getRoleColor('surface.disabled'),
          color: getRoleColor('text.disabled'),
          borderColor: 'transparent',
        }
      : {
          backgroundColor: isFilled ? getRoleColor(bg) : 'transparent',
          color: isFilled ? getRoleColor(fg) : getRoleColor(border),
          border: variant === 'outlined' ? `1px solid ${getRoleColor(border)}` : 'none',
          opacity: hover && isInteractive ? 0.85 : 1,
          boxShadow: selectable && selected ? `inset 0 0 0 2px ${getRoleColor('focus.ring')}` : undefined,
        };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-pressed={selectable ? selected : undefined}
        className={cn(chipVariants({ size, interactive: isInteractive }), className)}
        style={{ ...style, '--tw-ring-color': getRoleColor('focus.ring') } as React.CSSProperties}
        {...rest}
      >
        {icon && <span className={cn('flex items-center justify-center', iconSizeClass[size])}>{icon}</span>}
        <span className="truncate">{label}</span>
        {onDelete && (
          // Nested inside the outer <button> — invalid HTML5 (interactive
          // content can't nest) that predates this fix; browsers/AT tolerate
          // it in practice but a real redesign (delete as a true sibling
          // button, chip body as a non-button wrapper) is the correct
          // long-term fix. Scoped here to just closing the concrete
          // keyboard-operability gap: was tabIndex={-1} with no key handler,
          // meaning the delete action was mouse-only.
          <span
            role="button"
            aria-label="Remove"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onDelete();
              }
            }}
            className={cn('flex items-center justify-center rounded-full opacity-70 hover:opacity-100', deleteIconSizeClass[size])}
          >
            <X className="h-full w-full" />
          </span>
        )}
      </button>
    );
  }
);
Chip.displayName = 'Chip';

export default Chip;
