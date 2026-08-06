import * as React from 'react';
import { CheckCircle2, Circle, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor, type RoleName } from '@/theme/roles';
import { Badge } from './badge';

/**
 * Design System Stepper — shadcn/ui counterpart for the MDS Stepper. Built
 * against the actual `Stepper.tsx` API (`steps: StepConfig[]` objects with
 * per-step status), not the `steps: string[]` shape shown in
 * `Stepper.figma.tsx`'s Code Connect example.
 */

export type StepStatus = 'completed' | 'active' | 'pending' | 'error';

export interface StepConfig {
  id: string;
  label: string;
  description?: string;
  content?: React.ReactNode;
  status?: StepStatus;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: StepConfig[];
  orientation?: 'vertical' | 'horizontal';
  variant?: 'default' | 'compact';
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

function getLabelRole(status?: StepStatus): RoleName {
  switch (status) {
    case 'completed':
      return 'status.success.fg';
    case 'error':
      return 'status.danger.fg';
    case 'active':
      return 'interactive.primary';
    default:
      return 'text.primary';
  }
}

function StatusIcon({ status }: { status?: StepStatus }) {
  const color =
    status === 'completed'
      ? getRoleColor('status.success.fg')
      : status === 'error'
        ? getRoleColor('status.danger.fg')
        : status === 'active'
          ? getRoleColor('interactive.primary')
          : getRoleColor('border.default');

  if (status === 'completed') return <CheckCircle2 className="h-6 w-6" style={{ color }} />;
  if (status === 'error') return <XCircle className="h-6 w-6" style={{ color }} />;
  return <Circle className="h-6 w-6" style={{ color }} fill={status === 'active' ? color : 'none'} />;
}

/**
 * Design System Stepper — same `steps`/`orientation`/`variant`/
 * `onStepClick` API as the MUI twin (MUI's `activeStep` index is implicit
 * here — drive it via each step's own `status: 'active'`).
 */
export const Stepper: React.FC<StepperProps> = ({ steps, orientation = 'vertical', variant = 'default', onStepClick, className }) => {
  const isHorizontal = orientation === 'horizontal';
  const gap = variant === 'compact' ? 'gap-2' : 'gap-4';

  return (
    <div className={cn(isHorizontal ? cn('flex items-start', gap) : cn('flex flex-col', gap), className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <div key={step.id} className={cn('flex', isHorizontal ? 'flex-1 flex-col items-center text-center' : 'gap-3')}>
            <div className={cn('flex items-center', isHorizontal ? 'w-full' : 'flex-col')}>
              <button
                type="button"
                disabled={!onStepClick}
                onClick={() => onStepClick?.(index)}
                className={cn('flex shrink-0 items-center justify-center rounded-full', onStepClick && 'cursor-pointer')}
              >
                <StatusIcon status={step.status} />
              </button>
              {!isLast && (
                <div
                  className={isHorizontal ? 'mx-2 h-[2px] flex-1' : 'my-1 w-[2px] flex-1'}
                  style={{ backgroundColor: getRoleColor('border.default'), minHeight: isHorizontal ? undefined : 24 }}
                />
              )}
            </div>

            <div className={cn(isHorizontal ? 'mt-2' : 'flex-1', variant === 'compact' ? 'pb-2' : 'pb-4')}>
              <div className={cn('flex items-center gap-2', isHorizontal && 'justify-center')}>
                <span
                  className={cn('font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)]', variant === 'compact' ? 'text-sm' : 'text-base', step.status === 'active' && 'font-semibold')}
                  style={{ color: getRoleColor(getLabelRole(step.status)) }}
                >
                  {step.label}
                </span>
                {step.status && (
                  <Badge tone={step.status === 'completed' ? 'success' : step.status === 'error' ? 'danger' : 'default'}>
                    {step.status}
                  </Badge>
                )}
              </div>
              {step.description && (
                <p className="mt-0.5 text-xs" style={{ color: getRoleColor('text.secondary') }}>
                  {step.description}
                </p>
              )}
              {step.content && !isHorizontal && (
                <div
                  className="mt-2 border-l-2 pl-4"
                  style={{ borderColor: getRoleColor('border.default'), color: getRoleColor('text.primary') }}
                >
                  {step.content}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
