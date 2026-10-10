import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from '@radix-ui/react-slot'

import { cn } from "@/lib/utils"

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      // `w-full` is load-bearing, and only became so under Tailwind v4.
      //
      // MessageContent carries `group-data-[align=end]/message:*:data-slot:self-end`
      // (message.tsx). Both `*:` and the bare `data-slot` variant are v4-only
      // syntax, so under v3 that rule compiled to nothing and this group simply
      // stretched to the full message row (a column flex container defaults to
      // `align-items: stretch`).
      //
      // In v4 the rule compiles, so on a right-aligned message this group gets
      // `align-self: flex-end` and collapses to shrink-to-fit. That silently
      // changes what `max-w-[80%]` on the Bubble below is a percentage *of*:
      // it stops meaning "80% of the message row" and starts meaning "80% of
      // the bubble's own content width" — a self-referential clamp that shrank
      // every user-side bubble to 80% of its natural width (measured: 307px ->
      // 246px) and wrapped text that used to fit one line.
      //
      // Setting the width explicitly restores the stretch geometry for both
      // alignments while leaving `self-end` to do its actual job on the Bubble,
      // which already declares it.
      className={cn("flex w-full min-w-0 flex-col gap-2", className)}
      {...props}
    />
  )
}

const bubbleVariants = cva(
  // `max-w-[80%]` is a percentage of BubbleGroup, so BubbleGroup must have a
  // stretched width for it to mean "80% of the message row" — see the comment
  // on BubbleGroup above.
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      // `[&>[data-slot=X]]:` (explicit child-combinator arbitrary variant),
      // not the `*:data-[slot=X]:` shorthand upstream uses — confirmed via
      // this project's actual compiled Tailwind 3.4.19 CSS that the
      // shorthand generates a broken selector when stacked with an
      // arbitrary data-attribute variant: `.class[data-slot="X"] > *`
      // instead of `.class > [data-slot="X"]`, i.e. it requires the
      // *Bubble* element itself to carry `data-slot="bubble-content"` —
      // which it never does (only BubbleContent does) — so every variant's
      // background/text color was silently inert. The `[&>[data-slot=X]]:`
      // form used here for the hover states already compiled correctly, so
      // reusing that same syntax for the base colors too.
      variant: {
        default:
          "[&>[data-slot=bubble-content]]:bg-primary [&>[data-slot=bubble-content]]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/80",
        secondary:
          "[&>[data-slot=bubble-content]]:bg-secondary [&>[data-slot=bubble-content]]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
        muted:
          "[&>[data-slot=bubble-content]]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)]",
        tinted:
          "[&>[data-slot=bubble-content]]:bg-[oklch(from_var(--primary)_0.93_calc(c*0.4)_h)] [&>[data-slot=bubble-content]]:text-foreground dark:[&>[data-slot=bubble-content]]:bg-[oklch(from_var(--primary)_0.3_calc(c*0.4)_h)] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.88_calc(c*0.5)_h)] dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.35_calc(c*0.5)_h)]",
        outline:
          "[&>[data-slot=bubble-content]]:border-border [&>[data-slot=bubble-content]]:bg-background [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/30",
        ghost:
          "border-none [&>[data-slot=bubble-content]]:rounded-none [&>[data-slot=bubble-content]]:bg-transparent [&>[data-slot=bubble-content]]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50",
        destructive:
          "[&>[data-slot=bubble-content]]:bg-destructive/10 [&>[data-slot=bubble-content]]:text-destructive dark:[&>[data-slot=bubble-content]]:bg-destructive/20 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BubbleProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof bubbleVariants> {
  /** `end` right-aligns the bubble (the local user's own messages); `start` is the default, left-aligned side. */
  align?: "start" | "end"
}

/** Forwards to the bubble's own `<div>`, so a consumer can scroll a specific message into view (e.g. "jump to this reply"). */
const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  ({ variant = "default", align = "start", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="bubble"
        data-variant={variant}
        data-align={align}
        className={cn(bubbleVariants({ variant }), className)}
        {...props}
      />
    )
  }
);
Bubble.displayName = "Bubble";

function BubbleContent({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="bubble-content"
      className={cn(
        "w-fit max-w-full min-w-0 overflow-hidden rounded-2xl border border-transparent px-3 py-2 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-hidden [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}

const bubbleReactionsVariants = cva(
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
)

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end"
  side?: "top" | "bottom"
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  )
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions }
