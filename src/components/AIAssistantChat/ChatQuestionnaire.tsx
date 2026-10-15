import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  QuestionnaireRoot,
  QuestionnaireProgress,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireDescription,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireInput,
  QuestionnairePrevious,
  QuestionnaireSkip,
  QuestionnaireNext,
  QuestionnaireSubmit,
  QuestionnaireActions,
  type QuestionnaireItemDefinition,
} from '@/components/ui/questionnaire';
import { DASHBOARD_FLOW, MARKETING_FLOW, CLAIMS_FLOW, type Flow, type FlowAnswers } from './questionnaireFlows';

export interface ChatQuestionnaireProps {
  visitorType?: 'customer' | 'prospect';
  /** Called with a synthesized natural-language question once the flow is submitted. */
  onSubmitQuestion: (question: string) => void;
}

/**
 * Guided intake shown in the chat panel's empty state, in place of the flat
 * suggestion-chip list. Data-driven: each flow (dashboard, marketing,
 * claims) is a plain `Flow` object (questionnaireFlows.ts) — this component
 * just renders whichever one is active, tracking live answers so
 * `disabledWhen` can react while the user is still navigating (verified:
 * the primitive excludes a `disabled` item from its own step count, not
 * just from interaction — see questionnaireFlows.ts's CLAIMS_FLOW comment).
 */
export function ChatQuestionnaire({ visitorType, onSubmitQuestion }: ChatQuestionnaireProps) {
  const isProspect = visitorType === 'prospect';
  const [flowKey, setFlowKey] = React.useState<'dashboard' | 'claims'>('dashboard');
  const flow = isProspect ? MARKETING_FLOW : flowKey === 'claims' ? CLAIMS_FLOW : DASHBOARD_FLOW;

  return (
    <div className="flex w-full flex-col gap-3">
      {!isProspect && (
        <div className="flex gap-1.5" role="tablist" aria-label="Ask type">
          <button
            type="button"
            role="tab"
            aria-selected={flowKey === 'dashboard'}
            onClick={() => setFlowKey('dashboard')}
            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors aria-selected:border-primary aria-selected:bg-primary aria-selected:text-primary-foreground"
          >
            General question
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={flowKey === 'claims'}
            onClick={() => setFlowKey('claims')}
            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors aria-selected:border-primary aria-selected:bg-primary aria-selected:text-primary-foreground"
          >
            Report a claim
          </button>
        </div>
      )}

      {/* key={flowKey} forces a full remount on switch — resets the answers
          state below instead of carrying stale answers from one flow into
          the other's disabledWhen checks. */}
      <QuestionnaireFlowRenderer key={flowKey} flow={flow} onSubmitQuestion={onSubmitQuestion} />
    </div>
  );
}

function QuestionnaireFlowRenderer({ flow, onSubmitQuestion }: { flow: Flow; onSubmitQuestion: (q: string) => void }) {
  const [answers, setAnswers] = React.useState<FlowAnswers>({});

  const items: QuestionnaireItemDefinition[] = React.useMemo(
    () =>
      flow.items.map((item) => ({
        name: item.name,
        required: item.required,
        choices: item.choices?.map((c) => ({ value: c.value })),
        disabled: item.disabledWhen?.(answers) ?? false,
      })),
    [flow, answers]
  );

  const readAnswers = (form: HTMLFormElement): FlowAnswers => {
    const data = new FormData(form);
    const next: FlowAnswers = {};
    for (const item of flow.items) {
      const all = data.getAll(item.name).map(String);
      if (all.length === 0) continue;
      next[item.name] = item.multiple ? all : all[0];
    }
    return next;
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    setAnswers(readAnswers(event.currentTarget));
  };

  // Submit is deliberately `type="button"` + a manual FormData read here,
  // not the primitive's native `type="submit"`/`onSubmit`. Verified this
  // session: when the *active* step is optional and was left unanswered
  // (e.g. the last, freeform-or-skippable item in every flow here), the
  // primitive's own native-submit gating silently swallows the click —
  // onSubmit never fires, nothing happens, no error. Reproduced with the
  // raw primitive too, so it's real behavior, not a wrapper bug — the
  // primitive expects that step to be explicitly "settled" (answered or
  // Skipped) first. Programmatically clicking a sibling Skip button first
  // doesn't fix it either (React batches the resulting state update, so it
  // isn't reflected before the native submit fires in the same tick).
  // Reading FormData directly on a plain button click sidesteps the whole
  // native-submit path — same technique `readAnswers` already uses elsewhere.
  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const form = event.currentTarget.closest('form');
    if (!form) return;
    const question = flow.synthesize(readAnswers(form));
    if (question) onSubmitQuestion(question);
  };

  return (
    <QuestionnaireRoot items={items} defaultItem={flow.defaultItem} shortcuts="letters" onChange={handleChange}>
      <QuestionnaireProgress />

      {flow.items.map((item) => (
        // `disabled` must match the corresponding entry in the `items` array
        // above exactly — the primitive warns (and its navigation silently
        // breaks) if the declarative config and the rendered element
        // disagree, the same class of bug `required` mismatches caused
        // earlier (see questionnaire.tsx's docs).
        <QuestionnaireItem
          key={item.name}
          name={item.name}
          required={item.required}
          multiple={item.multiple}
          disabled={item.disabledWhen?.(answers) ?? false}
        >
          <QuestionnaireTitle>{item.title}</QuestionnaireTitle>
          {item.description && <QuestionnaireDescription>{item.description}</QuestionnaireDescription>}
          {item.choices && (
            <QuestionnaireChoices>
              {item.choices.map((c) => (
                <QuestionnaireChoice key={c.value} value={c.value}>
                  {c.label}
                </QuestionnaireChoice>
              ))}
            </QuestionnaireChoices>
          )}
          {item.freeform && <QuestionnaireInput placeholder={item.freeform.placeholder} aria-label={item.title} />}
        </QuestionnaireItem>
      ))}

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <div className="flex items-center gap-2">
          <QuestionnaireSkip />
          <QuestionnaireNext />
          <QuestionnaireSubmit
            render={<Button type="button" variant="primary" size="sm" />}
            onClick={handleSubmitClick}
          />
        </div>
      </QuestionnaireActions>
    </QuestionnaireRoot>
  );
}
