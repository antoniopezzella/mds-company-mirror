"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"

/**
 * Hand-authored against `@base-ui/react/drawer` (installed for this
 * component specifically — the first Base UI primitive in this repo,
 * alongside Radix everywhere else). shadcn's own `new-york-v4` registry
 * entry for "drawer" on GitHub is still the old `vaul`-based version; the
 * live docs (ui.shadcn.com/docs/components/base/drawer) describe the real,
 * current one — swipeDirection/snapPoints/showSwipeHandle — which only
 * makes sense on top of Base UI, so this wraps that package's actual
 * exports directly rather than copying stale source. Styled to match this
 * repo's existing Tailwind-utility-class + `data-*` selector convention
 * (same shape as the old vaul file, and sheet.tsx), not the separate
 * semantic-class ("cn-drawer") styling system shadcn's `bases/base`
 * registry variant uses — that requires its own compiled stylesheet and
 * would be inconsistent with every other component here.
 */

function Drawer(props: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger(props: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal(props: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose(props: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Backdrop>) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-backdrop"
      className={cn(
        "fixed inset-0 z-[1400] bg-black/50 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

export interface DrawerContentProps
  extends React.ComponentProps<typeof DrawerPrimitive.Popup> {
  /** Renders a visual swipe grip — only meaningful for `swipeDirection="up"|"down"`. */
  showSwipeHandle?: boolean
}

function DrawerContent({
  className,
  children,
  showSwipeHandle = true,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      {/* Required by Base UI — Popup without a Viewport ancestor logs a
          runtime warning and silently disables swipe handling and touch
          scroll locking (caught by actually opening this in Storybook,
          not just from reading the types). Viewport is a plain
          positioning container; Popup still owns all the visual/position
          styling below. */}
      <DrawerPrimitive.Viewport data-slot="drawer-viewport" className="contents">
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          className={cn(
            "group/drawer-content fixed z-[1500] flex h-auto flex-col border-border bg-background text-foreground transition-transform",
            "data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:mb-24 data-[swipe-direction=up]:max-h-[80vh] data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:border-b data-[ending-style]:data-[swipe-direction=up]:-translate-y-full data-[starting-style]:data-[swipe-direction=up]:-translate-y-full",
            "data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:mt-24 data-[swipe-direction=down]:max-h-[80vh] data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=down]:border-t data-[ending-style]:data-[swipe-direction=down]:translate-y-full data-[starting-style]:data-[swipe-direction=down]:translate-y-full",
            "data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:h-full data-[swipe-direction=left]:w-3/4 data-[swipe-direction=left]:border-r data-[swipe-direction=left]:sm:max-w-sm data-[ending-style]:data-[swipe-direction=left]:-translate-x-full data-[starting-style]:data-[swipe-direction=left]:-translate-x-full",
            "data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:h-full data-[swipe-direction=right]:w-3/4 data-[swipe-direction=right]:border-l data-[swipe-direction=right]:sm:max-w-sm data-[ending-style]:data-[swipe-direction=right]:translate-x-full data-[starting-style]:data-[swipe-direction=right]:translate-x-full",
            className
          )}
          {...props}
        >
          {showSwipeHandle && (
            <DrawerPrimitive.SwipeArea
              data-slot="drawer-swipe-area"
              className="mx-auto mt-4 hidden shrink-0 group-data-[swipe-direction=down]/drawer-content:block group-data-[swipe-direction=up]/drawer-content:block"
            >
              <div className="h-2 w-[100px] rounded-full bg-muted" />
            </DrawerPrimitive.SwipeArea>
          )}
          {children}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[swipe-direction=down]/drawer-content:text-center group-data-[swipe-direction=up]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerBackdrop,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
