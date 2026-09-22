import * as React from "react"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Ported from shadcn/ui's "spinner" registry item
 * (apps/v4/registry/new-york-v4/ui/spinner.tsx) — needed by the
 * MessageScroller "thinking..." demo (Marker + Spinner).
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
