import * as React from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';

import { type RoleName, roleVar } from '@/theme/roles';

export type StatusCardStatus = 'success' | 'warning' | 'error' | 'info';

const ICONS: Record<StatusCardStatus, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

function getRoles(status: StatusCardStatus): { bg: RoleName; fg: RoleName; border: RoleName } {
  switch (status) {
    case 'success':
      return { bg: 'status.success.bg', fg: 'status.success.fg', border: 'status.success.border' };
    case 'warning':
      // fg is applied to the title and body copy, so it must clear 4.5:1;
      // status.warning.fg (#c25600) manages 4.44:1 on this background — over 3:1 as an accent, under 4.5 as text.
      return { bg: 'status.warning.bg', fg: 'text.onLight', border: 'status.warning.border' };
    case 'error':
      return { bg: 'status.danger.bg', fg: 'status.danger.fg', border: 'status.danger.border' };
    default:
      return { bg: 'status.info.bg', fg: 'status.info.fg', border: 'status.info.border' };
  }
}

export interface StatusCardProps {
  /** Drives the border/background colour and the default icon. */
  status: StatusCardStatus;
  title: string;
  message: string;
  /** Overrides the status's default icon. */
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Design System StatusCard — shadcn/ui counterpart for the MDS StatusCard.
 * Same `status`/`title`/`message`/`icon` API as the MUI twin.
 */
export const StatusCard: React.FC<StatusCardProps> = ({ status, title, message, icon, className }) => {
  const { bg, fg, border } = getRoles(status);
  const Icon = ICONS[status];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={className}
      style={{
        width: 360,
        minHeight: 110,
        borderRadius: 8,
        border: `1px solid ${roleVar(border)}`,
        backgroundColor: roleVar(bg),
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center" style={{ color: roleVar(fg) }}>
          {icon ?? <Icon className="h-6 w-6" />}
        </span>
        <h3
          className="m-0 font-sans-productive text-base font-semibold leading-normal"
          style={{ color: roleVar(fg) }}
        >
          {title}
        </h3>
      </div>
      <p className="m-0 font-sans-productive text-sm leading-5" style={{ color: roleVar(fg) }}>
        {message}
      </p>
    </div>
  );
};

export default StatusCard;
