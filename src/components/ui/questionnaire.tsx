import * as React from "react"
import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type {
  QuestionnaireChoiceDefinition,
  QuestionnaireInputType,
  QuestionnaireItemDefinition,
  QuestionnaireItemStatus,
  QuestionnaireShortcutMode,
} from "@shadcn/react/questionnaire"

/**
 * Thin styled wrapper over `@shadcn/react/questionnaire` (the headless
 * primitives this project's other shadcn-sourced components — e.g.
 * message-scroller.tsx — pull from). shadcn's own `questionnaire.json`
 * registry item 404s at the moment (docs page is live, registry entry
 * isn't yet), so this file hand-authors the same wrapper shape directly
 * from the package's real, published API instead of waiting on it —
 * swap in the official registry file once it ships, no call-site changes
 * expected since the primitive contract (verified by rendering it once
 * against jsdom) is what both would wrap.
 */

function QuestionnaireRoot({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Root>) {
  return (
    <QuestionnairePrimitive.Root
      data-slot="questionnaire"
      className={cn("flex w-full flex-col gap-6", className)}
      {...props}
    />
  )
}

function QuestionnaireProgress({
  className,
  render,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Progress>) {
  return (
    <QuestionnairePrimitive.Progress
      data-slot="questionnaire-progress"
      render={
        render ??
        ((renderProps, state) => (
          <div {...renderProps} className={cn("flex flex-col gap-1.5", className)}>
            <span className="text-xs text-muted-foreground">
              Question {state.current} of {state.total}
            </span>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                style={{ width: `${(state.current / state.total) * 100}%` }}
              />
            </div>
          </div>
        ))
      }
      {...props}
    />
  )
}

function QuestionnaireItem({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Item>) {
  return (
    <QuestionnairePrimitive.Item
      data-slot="questionnaire-item"
      className={cn("flex flex-col gap-3 border-none p-0", className)}
      {...props}
    />
  )
}

function QuestionnaireTitle({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Title>) {
  return (
    <QuestionnairePrimitive.Title
      data-slot="questionnaire-title"
      className={cn(
        "font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] text-base font-semibold leading-6 text-foreground",
        className
      )}
      {...props}
    />
  )
}

function QuestionnaireDescription({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Description>) {
  return (
    <QuestionnairePrimitive.Description
      data-slot="questionnaire-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function QuestionnaireChoices({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choices>) {
  return (
    <QuestionnairePrimitive.Choices
      data-slot="questionnaire-choices"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

/**
 * A single choice row. Renders the native radio/checkbox input (visually
 * hidden) plus a styled indicator that tracks the real `data-checked` /
 * `data-unchecked` attributes the primitive sets on the label — confirmed
 * by rendering the primitive once against jsdom rather than assumed.
 */
function QuestionnaireChoice({
  className,
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choice>) {
  return (
    <QuestionnairePrimitive.Choice
      data-slot="questionnaire-choice"
      className={cn(
        "group/choice flex cursor-pointer items-center gap-3 rounded-md border border-border bg-background px-3.5 py-3 text-sm text-foreground transition-colors hover:bg-muted data-[checked]:border-primary data-[checked]:bg-primary/5 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <QuestionnairePrimitive.ChoiceInput className="sr-only" />
      {/* data-type is set by the primitive itself (radio for single-select
          items, checkbox when the item has `multiple`) — rounded-full for
          radio, rounded-md for checkbox, so multi-select choices actually
          look like checkboxes instead of circles pretending to be one. */}
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-transparent transition-colors group-data-[checked]/choice:border-primary group-data-[checked]/choice:bg-primary group-data-[checked]/choice:text-primary-foreground group-data-[type=checkbox]/choice:rounded-md"
        aria-hidden="true"
      >
        <CheckIcon className="h-3.5 w-3.5" />
      </span>
      <QuestionnairePrimitive.ChoiceLabel className="flex-1">
        {children}
      </QuestionnairePrimitive.ChoiceLabel>
      <QuestionnairePrimitive.ChoiceShortcut className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded border border-border px-1 font-mono text-[10px] text-muted-foreground" />
    </QuestionnairePrimitive.Choice>
  )
}

function QuestionnaireInput({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Input>) {
  return (
    <QuestionnairePrimitive.Input
      data-slot="questionnaire-input"
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function QuestionnaireError({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Error>) {
  return (
    <QuestionnairePrimitive.Error
      data-slot="questionnaire-error"
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  )
}

/**
 * Nav buttons compose directly with this project's own `Button` (not a
 * generic shadcn button) via the primitive's `render` prop, matching the
 * pattern message-scroller.tsx already uses for its scroll button — the
 * primitive owns behavior (visibility via `hidden`/`inert`, keyboard
 * shortcuts, submit type), our Button owns the visual style.
 */
function QuestionnairePrevious({
  render,
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Previous>) {
  return (
    <QuestionnairePrimitive.Previous
      data-slot="questionnaire-previous"
      render={render ?? <Button type="button" variant="tertiary" size="sm" />}
      {...props}
    >
      {children ?? "Back"}
    </QuestionnairePrimitive.Previous>
  )
}

function QuestionnaireSkip({
  render,
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Skip>) {
  return (
    <QuestionnairePrimitive.Skip
      data-slot="questionnaire-skip"
      render={render ?? <Button type="button" variant="tertiary" size="sm" />}
      {...props}
    >
      {children ?? "Skip"}
    </QuestionnairePrimitive.Skip>
  )
}

function QuestionnaireNext({
  render,
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Next>) {
  return (
    <QuestionnairePrimitive.Next
      data-slot="questionnaire-next"
      render={render ?? <Button type="button" variant="primary" size="sm" />}
      {...props}
    >
      {children ?? "Next"}
    </QuestionnairePrimitive.Next>
  )
}

function QuestionnaireSubmit({
  render,
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Submit>) {
  return (
    <QuestionnairePrimitive.Submit
      data-slot="questionnaire-submit"
      render={render ?? <Button type="submit" variant="primary" size="sm" />}
      {...props}
    >
      {children ?? "Submit"}
    </QuestionnairePrimitive.Submit>
  )
}

/** Row wrapper for the four nav buttons — matches the docs' own layout. */
function QuestionnaireActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="questionnaire-actions"
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    />
  )
}

export {
  QuestionnaireRoot,
  QuestionnaireProgress,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireDescription,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireInput,
  QuestionnaireError,
  QuestionnairePrevious,
  QuestionnaireSkip,
  QuestionnaireNext,
  QuestionnaireSubmit,
  QuestionnaireActions,
}
