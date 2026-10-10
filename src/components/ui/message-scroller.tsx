import * as React from "react"
import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller"
import { ArrowDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function MessageScrollerProvider(
  props: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>
) {
  return <MessageScrollerPrimitive.Provider {...props} />
}

const MessageScroller = React.forwardRef<
  React.ElementRef<typeof MessageScrollerPrimitive.Root>,
  React.ComponentProps<typeof MessageScrollerPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <MessageScrollerPrimitive.Root
      ref={ref}
      data-slot="message-scroller"
      className={cn(
        "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
MessageScroller.displayName = 'MessageScroller'

/**
 * Forwards to the actual scroll container — the element a consumer needs
 * to call `scrollTo`/`scrollIntoView` on, or measure scroll position.
 */
const MessageScrollerViewport = React.forwardRef<
  React.ElementRef<typeof MessageScrollerPrimitive.Viewport>,
  React.ComponentProps<typeof MessageScrollerPrimitive.Viewport>
>(({ className, ...props }, ref) => {
  return (
    <MessageScrollerPrimitive.Viewport
      ref={ref}
      data-slot="message-scroller-viewport"
      className={cn(
        "size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-none",
        className
      )}
      {...props}
    />
  )
})
MessageScrollerViewport.displayName = 'MessageScrollerViewport'

function MessageScrollerContent({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Content>) {
  return (
    <MessageScrollerPrimitive.Content
      data-slot="message-scroller-content"
      className={cn("flex h-max min-h-full flex-col gap-8", className)}
      {...props}
    />
  )
}

function MessageScrollerItem({
  className,
  scrollAnchor = false,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Item>) {
  return (
    <MessageScrollerPrimitive.Item
      data-slot="message-scroller-item"
      scrollAnchor={scrollAnchor}
      className={cn(
        "min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
        className
      )}
      {...props}
    />
  )
}

export interface MessageScrollerButtonProps
  extends React.ComponentProps<typeof MessageScrollerPrimitive.Button>,
    Pick<React.ComponentProps<typeof Button>, "variant" | "size"> {
  /**
   * Which end of the scroller this jumps to — `end` (default, "new
   * messages") or `start`. Drives the default icon rotation and position
   * as well as the auto-generated `aria-label`.
   */
  direction?: "start" | "end"
}

function MessageScrollerButton({
  direction = "end",
  className,
  children,
  render,
  variant = "secondary",
  size = "sm",
  ...props
}: MessageScrollerButtonProps) {
  return (
    <MessageScrollerPrimitive.Button
      data-slot="message-scroller-button"
      data-direction={direction}
      data-variant={variant}
      data-size={size}
      direction={direction}
      // The sr-only <span> below cannot provide this button's name: `render`
      // hands it to Button with `iconOnly`, and Button renders
      // `{iconOnly ? iconOnlyNode : children}` — so the children, sr-only span
      // included, are discarded. axe therefore saw a nameless button. An
      // explicit aria-label survives that; a caller's own still wins, since
      // ...props spreads after.
      aria-label={direction === "end" ? "Scroll to end" : "Scroll to start"}
      className={cn(
        "absolute inset-s-1/2 -translate-x-1/2 rounded-full border-border bg-background text-foreground shadow-md transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:[transition-timing-function:cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:[transition-timing-function:cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
        className
      )}
      render={render ?? <Button variant={variant} size={size} iconOnly />}
      {...props}
    >
      {children ?? (
        <>
          <ArrowDownIcon />
          <span className="sr-only">
            {direction === "end" ? "Scroll to end" : "Scroll to start"}
          </span>
        </>
      )}
    </MessageScrollerPrimitive.Button>
  )
}

export {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
}
