import * as React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor, type RoleName } from '@/theme/roles';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

function getSeverityRoles(severity: AlertSeverity): { fg: RoleName; bg: RoleName } {
  switch (severity) {
    case 'success':
      return { fg: 'status.success.fg', bg: 'status.success.bg' };
    case 'warning':
      return { fg: 'status.warning.fg', bg: 'status.warning.bg' };
    case 'error':
      return { fg: 'status.danger.fg', bg: 'status.danger.bg' };
    default:
      return { fg: 'text.primary', bg: 'surface.subtle' };
  }
}

const SEVERITY_ICON: Record<AlertSeverity, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

// Errors & warnings are disruptive (assertive), others polite — same mapping as the MUI twin.
const roleFor = (severity: AlertSeverity) => (severity === 'error' || severity === 'warning' ? 'alert' : 'status');

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  severity: AlertSeverity;
  title?: React.ReactNode;
  outlined?: boolean;
  onClose?: () => void;
  hideIcon?: boolean;
}

/**
 * Design System Alert — shadcn/ui counterpart for the MDS Alert. Same
 * `severity`/`title`/`outlined`/`onClose` API as the MUI twin; `AlertTitle`/
 * `AlertDescription` are exported separately too for composable usage.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ severity, title, outlined = false, onClose, hideIcon = false, children, className, style, ...rest }, ref) => {
    const { fg, bg } = getSeverityRoles(severity);
    const Icon = SEVERITY_ICON[severity];

    return (
      <div
        ref={ref}
        role={roleFor(severity)}
        className={cn('flex items-start gap-3 rounded-lg p-4', className)}
        style={{
          color: getRoleColor(fg),
          backgroundColor: outlined ? 'transparent' : getRoleColor(bg),
          border: outlined ? `1px solid ${getRoleColor('border.default')}` : 'none',
          ...style,
        }}
        {...rest}
      >
        {!hideIcon && <Icon className="mt-0.5 h-5 w-5 shrink-0" />}
        <div className="min-w-0 flex-1">
          {title && <AlertTitle>{title}</AlertTitle>}
          {children && <AlertDescription>{children}</AlertDescription>}
        </div>
        {onClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="-mr-1 -mt-1 shrink-0 rounded p-1 opacity-70 transition-opacity hover:opacity-100"
            style={{ color: 'inherit' }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'mb-1 font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] text-sm font-bold leading-tight',
        className
      )}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn('font-[var(--typo-body2-font-family,_Noto_Sans,_sans-serif)] text-sm', className)} ref={ref} {...props} />
  )
);
AlertDescription.displayName = 'AlertDescription';

export default Alert;
