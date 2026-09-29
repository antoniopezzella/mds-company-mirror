import * as React from 'react';

import { Modal } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { TeamMember } from '../data';

/**
 * Removing a member is a CHOICE, not a confirmation.
 *
 * Two outcomes, not one: take the member off the team and leave their client
 * allocations where they are, or take the allocations with them. That is why
 * this is not `createActionsColumn`'s built-in confirm — that asks "are you
 * sure?", and the question here is "which of these two things did you mean?".
 *
 * A "are you sure?" dialog in front of a decision the user has not made yet
 * would just be a speed bump before the real question.
 */

export type RemoveMemberOutcome = 'member-only' | 'member-and-assignments';

export interface RemoveMemberDialogProps {
  /** The member being removed, or null when the dialog is closed. */
  member: TeamMember | null;
  onClose: () => void;
  onRemove: (member: TeamMember, outcome: RemoveMemberOutcome) => void;
}

export function RemoveMemberDialog({ member, onClose, onRemove }: RemoveMemberDialogProps) {
  const act = (outcome: RemoveMemberOutcome) => {
    if (member) onRemove(member, outcome);
    onClose();
  };

  return (
    <Modal
      open={!!member}
      onClose={onClose}
      // `md` (512px), not `sm` (384px): three actions with labels this long
      // do not fit the narrow dialog, and `DialogFooter` now wraps rather
      // than clipping if a translation makes them longer still.
      size="md"
      title="Remove team member"
      // Both footer buttons destroy something, so the default — focus the
      // first one — would arm Enter the moment the dialog opens. Focus the
      // dialog itself instead: Escape and the X still dismiss, Tab still
      // reaches both actions, and nothing happens on a stray keypress.
      onOpenAutoFocus={(e) => {
        e.preventDefault();
        (e.currentTarget as HTMLElement).focus();
      }}
      footer={
        <>
          {/* No Cancel, per the source design. Escape and the X in the
              header both still dismiss, so there IS a way out — it is just
              not a footer button. See `onOpenAutoFocus` below for the part
              that matters once the footer is destructive-only. */}
          <Button
            variant="secondary"
            destructive
            size="md"
            onClick={() => act('member-only')}
          >
            Remove Member Only
          </Button>

          <Button
            variant="primary"
            destructive
            size="md"
            onClick={() => act('member-and-assignments')}
          >
            Remove Member and Assignments
          </Button>
        </>
      }
    >
      <p>
        Remove <strong>{member?.name}</strong> from your team. Choose whether to keep or clear
        their client allocations.
      </p>
      {/* Says what each button will actually do. "Keep or clear" names the
          choice but not the consequence, and the consequence is the part
          that differs — one of these leaves N clients unassigned. */}
      {!!member && member.clients > 0 && (
        <p className="mt-2 text-sm">
          {member.name.split(' ')[0]} currently holds{' '}
          <strong>
            {member.clients} client{member.clients === 1 ? '' : 's'}
          </strong>
          . Removing the assignments as well leaves them unallocated.
        </p>
      )}
    </Modal>
  );
}

export default RemoveMemberDialog;
