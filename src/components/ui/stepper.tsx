"use client"

import * as React from 'react';
import { Check, Loader2, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { type RoleName, roleVar } from '@/theme/roles';
import { Badge } from './badge';

/**
 * Design System Stepper — shadcn/ui counterpart for the MDS Stepper. Built
 * against the actual `Stepper.tsx` API (`steps: StepConfig[]` objects with
 * per-step status), not the `steps: string[]` shape shown in
 * `Stepper.figma.tsx`'s Code Connect example.
 *
 * Visual language is ported 1:1 from reui's Stepper (reui.io/components/stepper)
 * — 24px filled numbered indicators, 2px `rounded-md` separators, `text-sm
 * leading-none font-medium` titles — with reui's raw shadcn CSS vars mapped
 * onto this repo's role tokens (`bg-primary` → `interactive.primary`,
 * `bg-muted` → `border.default`, `text-muted-foreground` → `text.secondary`,
 * `bg-success` → `status.success.fg`). Kept as ONE declarative
 * `steps`-array component rather than reui's compound
 * `Stepper`/`StepperItem`/`StepperTrigger`/… tree, so the existing MUI-parity
 * call sites keep working; every layout their 15 demos cover is reachable
 * through the `indicator`/`labelPlacement`/`labelAlign`/`showSeparator`/
 * `showStatusBadge`/`showStepEyebrow`/`completedTone` props below.
 *
 * Accessibility follows the WAI-ARIA tablist pattern when interactive
 * (`onStepClick` provided): the step row gets `role="tablist"`, each step
 * `role="tab"` with roving `tabIndex` + full arrow/Home/End keyboard nav,
 * matching reui. A non-interactive stepper (no `onStepClick` — the common
 * "progress indicator" use) stays presentational with no tab semantics,
 * since there's nothing to navigate to.
 */

export type StepStatus = 'completed' | 'active' | 'pending' | 'error';

/** Indicator shape. Mirrors the four distinct treatments across reui's demos. */
export type StepIndicatorStyle =
  /** 24px filled circle with the step number (reui demos 1/2/4/5/8/9/10/13/14/15). */
  | 'numbered'
  /** 20px 2px-bordered circle, filled dot when active (reui demo 3). */
  | 'outlined'
  /** 32px circle holding the step's own `icon` (reui demo 7). */
  | 'icon'
  /** Full-width progress bar segment instead of a circle (reui demos 11/12). */
  | 'bar';

/** Where the label/description sits relative to the indicator. */
export type StepLabelPlacement =
  /** Indicator only (reui demos 1/2/3/4/12/14). */
  | 'none'
  /** Beside the indicator (reui demos 9/10/13/15). */
  | 'inline'
  /** Stacked under the indicator (reui demos 5/6/8/11). */
  | 'below';

export interface StepConfig {
  id: string;
  label: string;
  description?: string;
  content?: React.ReactNode;
  status?: StepStatus;
  /** Shown inside the indicator when `indicator="icon"`. */
  icon?: React.ReactNode;
  /** Shows a spinner in place of the indicator's contents — e.g. an async step in progress. */
  loading?: boolean;
  /** Excludes this step from clicks and keyboard navigation. */
  disabled?: boolean;
}

export interface StepperProps {
  steps: StepConfig[];
  /**
   * Index of the active step (MUI-parity API). When provided, drives each
   * step's completed/active/pending status by position — a step's own
   * explicit `status` still wins if set, so both APIs compose.
   */
  activeStep?: number;
  orientation?: 'vertical' | 'horizontal';
  variant?: 'default' | 'compact';
  onStepClick?: (stepIndex: number) => void;
  /**
   * How step `content` is displayed. `'inline'` (default) renders every
   * step's content under that step. `'active-only'` renders a single shared
   * panel below the step row showing just the active step's content
   * (reui's `StepperPanel`/`StepperContent` pattern), in either orientation.
   */
  contentMode?: 'inline' | 'active-only';
  /** Indicator shape — see `StepIndicatorStyle`. Defaults to `'numbered'`. */
  indicator?: StepIndicatorStyle;
  /**
   * Label position. Defaults to `'below'` for horizontal and `'inline'` for
   * vertical — the two layouts reui's demos actually use per orientation.
   * `indicator="bar"` always stacks labels below the bar.
   */
  labelPlacement?: StepLabelPlacement;
  /** Label alignment for `labelPlacement="below"`. Defaults to `'center'`. */
  labelAlign?: 'center' | 'start';
  /** Draws the connector between steps. On by default; reui demos 6/11/12 turn it off. */
  showSeparator?: boolean;
  /** Renders a status pill per step (reui demo 7's In Progress/Completed/Pending). Off by default. */
  showStatusBadge?: boolean;
  /** Renders a small uppercase "STEP N" eyebrow above the title (reui demo 7). Off by default. */
  showStepEyebrow?: boolean;
  /** Fill color for completed steps. reui's demos use both. Defaults to `'primary'`. */
  completedTone?: 'primary' | 'success';
  className?: string;
}

function resolveStatus(step: StepConfig, index: number, activeStep?: number): StepStatus | undefined {
  if (step.status) return step.status;
  if (activeStep === undefined) return undefined;
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'pending';
}

function getLabelRole(status?: StepStatus): RoleName {
  switch (status) {
    case 'completed':
    case 'active':
      return 'fg.primary';
    case 'error':
      return 'fg.critical';
    default:
      return 'fg.neutral.subtle';
  }
}

/** Pixel sizes lifted from reui's own indicator classes (`size-6`/`size-5`/`size-8`). */
const INDICATOR_SIZE: Record<Exclude<StepIndicatorStyle, 'bar'>, number> = {
  numbered: 24,
  outlined: 20,
  icon: 32,
};

interface IndicatorColors {
  bg: string;
  fg: string;
  border: string;
}

function indicatorColors(status: StepStatus | undefined, completedTone: 'primary' | 'success'): IndicatorColors {
  const primary = 'var(--role-interactive-primary)';
  const onInteractive = 'var(--role-fg-on-interactive)';

  switch (status) {
    case 'completed': {
      const bg = completedTone === 'success' ? 'var(--role-fg-success)' : primary;
      return { bg, fg: 'var(--role-fg-on-dark)', border: bg };
    }
    case 'active':
      return { bg: primary, fg: onInteractive, border: primary };
    case 'error': {
      const bg = 'var(--role-fg-critical)';
      return { bg, fg: 'var(--role-fg-on-critical)', border: bg };
    }
    default:
      // reui's inactive indicator is `bg-accent` — a neutral muted fill. The
      // literal role-token equivalent here would be `surface.secondary`, but
      // that maps to brand Sky Blue and reads as a *state*, not a resting
      // step; `surface.disabled` is this system's neutral gray at the same
      // visual weight.
      return { bg: 'var(--role-bg-disabled)', fg: 'var(--role-fg-neutral-subtle)', border: 'var(--role-border-default)' };
  }
}

interface StepIndicatorProps {
  step: StepConfig;
  index: number;
  status?: StepStatus;
  indicator: StepIndicatorStyle;
  completedTone: 'primary' | 'success';
}

function StepIndicator({ step, index, status, indicator, completedTone }: StepIndicatorProps) {
  const colors = indicatorColors(status, completedTone);

  // Bar indicators (reui demos 11/12) drop the circle entirely: the track
  // itself carries the state, so it only ever reads as filled or not.
  if (indicator === 'bar') {
    const filled = status === 'completed' || status === 'active';
    return (
      <div
        className="h-1 w-full shrink-0 rounded-full"
        style={{ backgroundColor: status === 'error' ? 'var(--role-fg-critical)' : filled ? colors.bg : 'var(--role-border-default)' }}
      >
        <span className="sr-only">{step.label}</span>
      </div>
    );
  }

  const size = INDICATOR_SIZE[indicator];
  const isOutlined = indicator === 'outlined';

  // reui's outlined variant (demo 3) is a hollow ring: the fill only ever
  // shows through as a small centered dot on the active step.
  const background = isOutlined && status !== 'completed' && status !== 'error' ? 'transparent' : colors.bg;
  const foreground = isOutlined && status !== 'completed' && status !== 'error' ? colors.border : colors.fg;

  const body = (() => {
    if (step.loading) return <Loader2 className="animate-spin" style={{ width: size * 0.58, height: size * 0.58 }} />;
    if (status === 'error') return <X style={{ width: size * 0.58, height: size * 0.58 }} strokeWidth={3} />;
    if (status === 'completed') return <Check style={{ width: size * 0.58, height: size * 0.58 }} strokeWidth={3} />;
    if (indicator === 'icon') return step.icon ?? <span className="text-xs font-medium">{index + 1}</span>;
    if (isOutlined) {
      return status === 'active' ? <span className="block size-1.5 rounded-full" style={{ backgroundColor: colors.bg }} /> : null;
    }
    return <span className="text-xs font-medium">{index + 1}</span>;
  })();

  return (
    <div
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: background,
        color: foreground,
        border: isOutlined || indicator === 'icon' ? `2px solid ${colors.border}` : undefined,
      }}
    >
      {body}
    </div>
  );
}

function badgeToneFor(status?: StepStatus) {
  if (status === 'completed') return 'success' as const;
  if (status === 'error') return 'danger' as const;
  return 'default' as const;
}

function badgeLabelFor(status?: StepStatus) {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'active':
      return 'In Progress';
    case 'error':
      return 'Error';
    default:
      return 'Pending';
  }
}

/**
 * Forwards to the outer wrapper `<div>` — individual step triggers already
 * manage their own focus internally (see `triggerRefs` below); this ref is
 * for measuring/scrolling the whole stepper, e.g. into view on step change.
 */
export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(({
  steps,
  activeStep,
  orientation = 'vertical',
  variant = 'default',
  onStepClick,
  contentMode = 'inline',
  indicator = 'numbered',
  labelPlacement,
  labelAlign = 'center',
  showSeparator = true,
  showStatusBadge = false,
  showStepEyebrow = false,
  completedTone = 'primary',
  className,
}, ref) => {
  const isHorizontal = orientation === 'horizontal';
  const isBar = indicator === 'bar';
  // Bar indicators only make sense with the label stacked underneath —
  // there's no circle to sit beside.
  const placement: StepLabelPlacement = isBar ? 'below' : (labelPlacement ?? (isHorizontal ? 'below' : 'inline'));
  const isInteractive = !!onStepClick;
  const triggerRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const statuses = steps.map((step, index) => resolveStatus(step, index, activeStep));
  const selectedIndex = activeStep ?? statuses.findIndex((s) => s === 'active');

  // Keyboard nav skips disabled steps — same as a native disabled tab.
  const focusableIndices = steps.reduce<number[]>((acc, step, index) => {
    if (!step.disabled) acc.push(index);
    return acc;
  }, []);

  const focusStep = (index: number) => triggerRefs.current[index]?.focus();

  const focusRelative = (fromIndex: number, direction: 1 | -1) => {
    if (focusableIndices.length === 0) return;
    const pos = focusableIndices.indexOf(fromIndex);
    const nextPos = (pos === -1 ? 0 : pos + direction + focusableIndices.length) % focusableIndices.length;
    focusStep(focusableIndices[nextPos]);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        focusRelative(index, 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        focusRelative(index, -1);
        break;
      case 'Home':
        e.preventDefault();
        if (focusableIndices.length) focusStep(focusableIndices[0]);
        break;
      case 'End':
        e.preventDefault();
        if (focusableIndices.length) focusStep(focusableIndices[focusableIndices.length - 1]);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onStepClick?.(index);
        break;
    }
  };

  const separatorColor = 'var(--role-border-default)';
  const completedSeparatorColor = completedTone === 'success' ? 'var(--role-fg-success)' : 'var(--role-interactive-primary)';
  const indicatorSize = isBar ? 0 : INDICATOR_SIZE[indicator];
  const navGap = variant === 'compact' ? 8 : 12;

  const activeStepConfig = contentMode === 'active-only' && selectedIndex >= 0 ? steps[selectedIndex] : undefined;

  const renderLabels = (step: StepConfig, index: number, status: StepStatus | undefined, align: 'center' | 'start') => {
    if (placement === 'none') return null;
    return (
      <div className={cn('flex flex-col', align === 'center' ? 'items-center text-center' : 'items-start text-left', step.description || showStatusBadge ? 'gap-1' : 'gap-0.5')}>
        {showStepEyebrow && (
          <span className="text-[10px] font-semibold uppercase leading-none" style={{ color: 'var(--role-fg-neutral-subtle)' }}>
            Step {index + 1}
          </span>
        )}
        <span
          className={cn('font-medium', variant === 'compact' ? 'text-xs' : 'text-sm')}
          // lineHeight is set here rather than via `leading-none`: Tailwind v4's
          // `text-sm` carries its own line-height, so the two collapse into one
          // twMerge group and the utility class silently loses.
          style={{ color: roleVar(getLabelRole(status)), lineHeight: 1 }}
        >
          {step.label}
        </span>
        {step.description && (
          <span className={cn('leading-snug', variant === 'compact' ? 'text-[11px]' : 'text-sm')} style={{ color: 'var(--role-fg-neutral-subtle)' }}>
            {step.description}
          </span>
        )}
        {showStatusBadge && status && (
          <span className="mt-0.5">
            <Badge tone={badgeToneFor(status)} soft size="sm">
              {badgeLabelFor(status)}
            </Badge>
          </span>
        )}
      </div>
    );
  };

  const renderStep = (step: StepConfig, index: number) => {
    const isLast = index === steps.length - 1;
    const status = statuses[index];
    const isSelected = index === selectedIndex;
    const isDisabled = !!step.disabled;
    const showsOwnPanel = contentMode === 'active-only' && !!step.content;
    const sepColor = status === 'completed' ? completedSeparatorColor : separatorColor;
    const drawSeparator = showSeparator && !isLast && !isBar;

    const tabProps = {
      role: isInteractive ? 'tab' : undefined,
      id: isInteractive ? `stepper-tab-${step.id}` : undefined,
      'aria-selected': isInteractive ? isSelected : undefined,
      'aria-disabled': isInteractive && isDisabled ? true : undefined,
      'aria-controls': isInteractive && showsOwnPanel ? `stepper-panel-${step.id}` : undefined,
      tabIndex: isInteractive ? (isDisabled ? -1 : isSelected || (selectedIndex === -1 && index === 0) ? 0 : -1) : undefined,
      onClick: isInteractive && !isDisabled ? () => onStepClick?.(index) : undefined,
      onKeyDown: isInteractive && !isDisabled ? (e: React.KeyboardEvent) => handleKeyDown(e, index) : undefined,
      ref: (node: HTMLDivElement | null) => {
        triggerRefs.current[index] = node;
      },
    };

    const interactionClass = cn(
      isInteractive && !isDisabled && 'cursor-pointer rounded-md focus-visible:outline-hidden focus-visible:ring-2',
      isInteractive && isDisabled && 'cursor-not-allowed opacity-50'
    );
    const focusStyle = isInteractive ? ({ '--tw-ring-color': 'var(--role-border-focus)' } as React.CSSProperties) : undefined;

    // ── Horizontal, labels stacked below (reui demos 5/6/8/11) ──────────
    // The separator can't be a flex sibling here: it has to span the gap
    // between two indicator centers while the labels below stay full-width,
    // so it's absolutely positioned off the item box, exactly as reui does.
    if (isHorizontal && placement === 'below') {
      const halfIndicator = indicatorSize / 2;
      const sepLeft = labelAlign === 'center' ? `calc(50% + ${halfIndicator + 4}px)` : `${indicatorSize + 8}px`;
      const sepWidth = `calc(100% - ${indicatorSize + 8}px)`;
      return (
        <div key={step.id} className="relative flex flex-1 flex-col">
          <div
            {...tabProps}
            className={cn('flex flex-col', labelAlign === 'center' ? 'items-center' : 'items-start', isBar ? 'gap-3.5' : 'gap-2.5', interactionClass)}
            style={focusStyle}
          >
            <div className={cn(isBar ? 'w-full' : 'flex justify-center')} style={isBar ? undefined : { width: indicatorSize }}>
              <StepIndicator step={step} index={index} status={status} indicator={indicator} completedTone={completedTone} />
            </div>
            {renderLabels(step, index, status, labelAlign)}
          </div>
          {drawSeparator && (
            <div
              aria-hidden
              className="absolute h-0.5 rounded-md"
              style={{ top: halfIndicator - 1, left: sepLeft, width: sepWidth, backgroundColor: sepColor }}
            />
          )}
        </div>
      );
    }

    // ── Horizontal, inline or indicator-only (reui demos 1/2/3/4/9/10) ──
    if (isHorizontal) {
      return (
        <div key={step.id} className={cn('flex items-center', !isLast && 'flex-1')}>
          <div {...tabProps} className={cn('inline-flex items-center gap-2.5', interactionClass)} style={focusStyle}>
            <StepIndicator step={step} index={index} status={status} indicator={indicator} completedTone={completedTone} />
            {renderLabels(step, index, status, 'start')}
          </div>
          {drawSeparator && <div aria-hidden className="mx-2.5 h-0.5 flex-1 rounded-md" style={{ backgroundColor: sepColor }} />}
        </div>
      );
    }

    // ── Vertical, indicator-only (reui demo 14) ─────────────────────────
    if (placement === 'none') {
      return (
        <div key={step.id} className="flex flex-col items-center">
          <div {...tabProps} className={cn('inline-flex', interactionClass)} style={focusStyle}>
            <StepIndicator step={step} index={index} status={status} indicator={indicator} completedTone={completedTone} />
          </div>
          {drawSeparator && <div aria-hidden className="my-1.5 w-0.5 rounded-md" style={{ height: 48, backgroundColor: sepColor }} />}
        </div>
      );
    }

    // ── Vertical, labels beside the indicator (reui demos 13/15) ────────
    // Same absolute-positioning reason as the horizontal 'below' case: the
    // rail has to run from under this indicator down to the next one,
    // independent of how tall this step's label block happens to be.
    return (
      <div key={step.id} className={cn('relative flex', !isLast && 'flex-1')}>
        <div
          {...tabProps}
          className={cn('inline-flex items-start gap-2.5', interactionClass, !isLast && (variant === 'compact' ? 'pb-6' : 'pb-10'))}
          style={focusStyle}
        >
          <StepIndicator step={step} index={index} status={status} indicator={indicator} completedTone={completedTone} />
          <div className="mt-0.5 flex flex-col gap-2">
            {renderLabels(step, index, status, 'start')}
            {step.content && contentMode === 'inline' && (
              <div className="text-sm" style={{ color: 'var(--role-fg-primary)' }}>
                {step.content}
              </div>
            )}
          </div>
        </div>
        {drawSeparator && (
          <div
            aria-hidden
            className="absolute w-0.5 rounded-md"
            style={{
              left: indicatorSize / 2 - 1,
              top: indicatorSize + 4,
              height: `calc(100% - ${indicatorSize + 8}px)`,
              backgroundColor: sepColor,
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div ref={ref} className={cn('flex w-full flex-col', className)} style={{ gap: variant === 'compact' ? 16 : 24 }}>
      <div
        role={isInteractive ? 'tablist' : undefined}
        aria-orientation={isInteractive ? orientation : undefined}
        className={cn('flex', isHorizontal ? 'w-full flex-row items-start' : 'flex-col')}
        // Only the "stacked below" horizontal layouts need a gap between
        // items — every other layout spaces itself via the separator
        // (horizontal inline) or the trigger's own bottom padding (vertical).
        style={isHorizontal && placement === 'below' ? { gap: navGap } : undefined}
      >
        {steps.map(renderStep)}
      </div>

      {activeStepConfig?.content && (
        <div
          role={isInteractive ? 'tabpanel' : undefined}
          id={`stepper-panel-${activeStepConfig.id}`}
          aria-labelledby={isInteractive ? `stepper-tab-${activeStepConfig.id}` : undefined}
          className="text-sm"
          style={{ color: 'var(--role-fg-primary)' }}
        >
          {activeStepConfig.content}
        </div>
      )}
    </div>
  );
});
Stepper.displayName = 'Stepper';

export default Stepper;
