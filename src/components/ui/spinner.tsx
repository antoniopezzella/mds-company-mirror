import * as React from "react"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Ported from shadcn/ui's "spinner" registry item
 * (apps/v4/registry/new-york-v4/ui/spinner.tsx) — needed by the
 * MessageScroller "thinking..." demo (Marker + Spinner).
 */
export interface SpinnerProps extends React.ComponentProps<"svg"> {
  /**
   * Merged with the default `size-4 animate-spin` via `cn()` — pass a
   * `size-*` utility to resize (the default is 16px) rather than a
   * `width`/`height` attribute, which `animate-spin` does not scale.
   */
  className?: string;
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, ...props }, ref) => (
    <Loader2Icon
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
)
Spinner.displayName = "Spinner"

export { Spinner }
