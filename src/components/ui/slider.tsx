// No MDS/Figma spec exists for this yet; built matching real shadcn/ui conventions directly.
import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

type InteractionState = 'default' | 'hover' | 'active';

const sliderRootVariants = cva(
  'relative flex w-full touch-none select-none items-center data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col'
);

const sliderTrackVariants = cva(
  'relative h-1.5 w-full grow overflow-hidden rounded-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
);

const sliderRangeVariants = cva('absolute h-full data-[orientation=vertical]:w-full');

const sliderThumbVariants = cva(
  'block h-4 w-4 rounded-full border-2 shadow-[0_1px_2px_rgba(0,0,0,0.2)] ring-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--slider-focus-ring)] disabled:pointer-events-none disabled:opacity-50'
);

function getThumbColor(interaction: InteractionState): string {
  if (interaction === 'active') return getRoleColor('interactive.primary.active');
  if (interaction === 'hover') return getRoleColor('interactive.primary.hover');
  return getRoleColor('interactive.primary');
}

export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>;

/**
 * Design System Slider — shadcn/ui/Radix counterpart. No MDS twin exists yet;
 * built to match shadcn/ui's reference `Slider` API (Radix `Slider` wrapper),
 * re-skinned with `getRoleColor()` role tokens. Thumb hover/active coloring is
 * tracked via local React state, following the same pattern as `switch.tsx`
 * since the color is resolved at runtime and can't be baked into a Tailwind
 * `hover:` class.
 */
const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, disabled, onPointerEnter, onPointerLeave, onPointerDown, onPointerUp, onPointerCancel, ...props }, ref) => {
    const [interaction, setInteraction] = React.useState<InteractionState>('default');
    const setSafeInteraction = (next: InteractionState) => {
      if (!disabled) setInteraction(next);
    };

    // Radix renders one Thumb per value; support single or multi-thumb sliders.
    const values = props.value ?? props.defaultValue ?? [0];
    const thumbCount = Array.isArray(values) ? values.length : 1;

    const thumbColor = disabled ? getRoleColor('text.disabled') : getThumbColor(interaction);

    return (
      <SliderPrimitive.Root
        ref={ref}
        disabled={disabled}
        className={cn(sliderRootVariants(), className)}
        onPointerEnter={(event) => {
          setSafeInteraction('hover');
          onPointerEnter?.(event);
        }}
        onPointerLeave={(event) => {
          setSafeInteraction('default');
          onPointerLeave?.(event);
        }}
        onPointerDown={(event) => {
          setSafeInteraction('active');
          onPointerDown?.(event);
        }}
        onPointerUp={(event) => {
          setSafeInteraction('hover');
          onPointerUp?.(event);
        }}
        onPointerCancel={(event) => {
          setSafeInteraction('default');
          onPointerCancel?.(event);
        }}
        {...props}
      >
        <SliderPrimitive.Track
          className={sliderTrackVariants()}
          style={{ backgroundColor: getRoleColor('border.default') }}
        >
          <SliderPrimitive.Range
            className={sliderRangeVariants()}
            style={{ backgroundColor: disabled ? getRoleColor('text.disabled') : getRoleColor('interactive.primary') }}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }).map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className={sliderThumbVariants()}
            style={
              {
                backgroundColor: getRoleColor('surface.default'),
                borderColor: thumbColor,
                '--slider-focus-ring': getRoleColor('focus.ring'),
              } as React.CSSProperties
            }
          />
        ))}
      </SliderPrimitive.Root>
    );
  }
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
export default Slider;
