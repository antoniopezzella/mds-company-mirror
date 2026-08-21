import type { Meta, StoryObj } from '@storybook/react';
import {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireRoot,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from './questionnaire';

/**
 * # Questionnaire (shadcn/ui)
 *
 * Multi-step form flow (progress, single/multi-select choices, keyboard
 * shortcuts, prev/next/submit navigation) — used for structured chat
 * intake flows. Built on `@shadcn/react`'s real form-state primitive.
 * Pre-existing in this repo (also used by AIAssistantChat's
 * ChatQuestionnaire), but had no Storybook story until now.
 */
const meta: Meta<typeof QuestionnaireRoot> = {
  title: 'shadcn-ui/Questionnaire',
  component: QuestionnaireRoot,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof QuestionnaireRoot>;

export const ClaimIntake: Story = {
  name: 'Claim intake (multi-step)',
  render: () => (
    <QuestionnaireRoot
      className="max-w-md"
      items={[
        { name: 'claimType', required: true, choices: [{ value: 'property' }, { value: 'liability' }, { value: 'cyber' }] },
        { name: 'urgency', required: true, choices: [{ value: 'standard' }, { value: 'urgent' }] },
      ]}
      onSubmit={(e) => e.preventDefault()}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="claimType">
        <QuestionnaireTitle>What type of claim is this?</QuestionnaireTitle>
        <QuestionnaireDescription>Select the coverage type that best matches the loss.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="property">Property</QuestionnaireChoice>
          <QuestionnaireChoice value="liability">Liability</QuestionnaireChoice>
          <QuestionnaireChoice value="cyber">Cyber</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="urgency">
        <QuestionnaireTitle>How urgent is this?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="standard">Standard — respond within 5 business days</QuestionnaireChoice>
          <QuestionnaireChoice value="urgent">Urgent — active loss in progress</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <div className="flex gap-2">
          <QuestionnaireNext />
          <QuestionnaireSubmit />
        </div>
      </QuestionnaireActions>
    </QuestionnaireRoot>
  ),
};
