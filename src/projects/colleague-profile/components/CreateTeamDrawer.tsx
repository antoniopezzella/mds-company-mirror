import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DSSelect } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FieldError } from '@/components/ui/field';
import { Stack } from '@/components/ui/stack';

import { MY_DELEGATORS, type CreationMode } from '../data';
import { useTeams } from './TeamsContext';
import { RadioCardGroup } from './RadioCardGroup';

/**
 * Create Team — a right-side drawer, so the Teams list stays in context.
 *
 * It improves on the UAT flow's two stacked modals: "Who is this team for?" is
 * folded in as a conditional first field (shown only when you hold delegated
 * access), and the form is kept to the minimum needed to spin a team up —
 * name, size, how members are added, an optional description. The fuller config
 * (qualifiers, roles, coverage) lives on Team Setup, where you land on create,
 * so nothing is asked twice.
 */

const DESCRIPTION_MAX = 225;

const CREATION_MODES: { value: CreationMode; title: string; description: string }[] = [
  {
    value: 'manual',
    title: 'Manual',
    description: 'Add members in “Manage Team” by searching and selecting colleagues from Workday.',
  },
  {
    value: 'auto-sync',
    title: 'Auto-Sync',
    description: 'Your Workday direct reports are synced into the team automatically.',
  },
];

interface Errors {
  owner?: string;
  manager?: string;
  name?: string;
  size?: string;
  mode?: string;
}

export interface CreateTeamDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTeamDrawer({ open, onOpenChange }: CreateTeamDrawerProps) {
  const navigate = useNavigate();
  const { createTeam } = useTeams();
  const hasDelegators = MY_DELEGATORS.length > 0;

  const [owner, setOwner] = React.useState<'self' | 'manager'>('self');
  const [managerId, setManagerId] = React.useState('');
  const [name, setName] = React.useState('');
  const [size, setSize] = React.useState('');
  const [mode, setMode] = React.useState<CreationMode | ''>('');
  const [description, setDescription] = React.useState('');
  const [errors, setErrors] = React.useState<Errors>({});

  // Reset everything each time the drawer opens, so a dismissed draft never
  // bleeds into the next team (the AddMemberDialog convention).
  React.useEffect(() => {
    if (open) {
      setOwner('self');
      setManagerId('');
      setName('');
      setSize('');
      setMode('');
      setDescription('');
      setErrors({});
    }
  }, [open]);

  const validate = (): Errors => {
    const next: Errors = {};
    if (owner === 'manager' && !managerId) next.manager = 'Choose the manager this team is for.';
    if (!name.trim()) next.name = 'Give the team a name.';
    const n = Number(size);
    if (!size.trim() || !Number.isInteger(n) || n < 1) next.size = 'Enter a target size of 1 or more.';
    if (!mode) next.mode = 'Choose how members are added.';
    return next;
  };

  const handleCreate = () => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const manager = MY_DELEGATORS.find((m) => m.id === managerId);
    const id = createTeam({
      name: name.trim(),
      capacity: Number(size),
      creationMode: mode as CreationMode,
      description: description.trim() || undefined,
      createdFor:
        owner === 'manager' && manager
          ? { kind: 'manager', managerId: manager.id, managerName: manager.name }
          : { kind: 'self' },
    });
    onOpenChange(false);
    navigate(`/colleague-profile/teams/${id}`);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="mds-dashboard w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Create team</SheetTitle>
          <SheetDescription>
            Name the team and choose how members are added. You can configure roles and coverage next.
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <Stack gap={5}>
            {/* "Who is this team for?" — only when you hold delegated access. */}
            {hasDelegators && (
              <div className="flex flex-col gap-1.5">
                <Label id="owner-label">Who is this team for?</Label>
                <RadioCardGroup
                  aria-labelledby="owner-label"
                  value={owner}
                  onChange={(v) => setOwner(v as 'self' | 'manager')}
                  options={[
                    { value: 'self', title: 'Myself', description: 'You are the owner of this team.' },
                    {
                      value: 'manager',
                      title: 'On a manager’s behalf',
                      description: 'Create the team under a manager who delegated access to you.',
                    },
                  ]}
                />
                {owner === 'manager' && (
                  <div className="mt-3">
                    <DSSelect
                      label="Manager"
                      placeholder="Choose a manager"
                      options={MY_DELEGATORS.map((m) => ({ value: m.id, label: m.name }))}
                      value={managerId}
                      onChange={(v) => setManagerId(String(v))}
                      error={!!errors.manager}
                      helperText={errors.manager}
                      size="md"
                      fullWidth
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="team-name">
                Team name <RequiredMark />
              </Label>
              <Input
                id="team-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. EMEA Corporate Risk"
                tone={errors.name ? 'error' : 'default'}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'team-name-error' : undefined}
              />
              <FieldError id="team-name-error">{errors.name}</FieldError>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="team-size">
                Target team size <RequiredMark />
              </Label>
              <Input
                id="team-size"
                type="number"
                min={1}
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. 10"
                className="w-40"
                tone={errors.size ? 'error' : 'default'}
                aria-invalid={!!errors.size}
                aria-describedby={errors.size ? 'team-size-error' : undefined}
              />
              <FieldError id="team-size-error">{errors.size}</FieldError>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label id="mode-label">
                Team member creation mode <RequiredMark />
              </Label>
              <RadioCardGroup
                aria-labelledby="mode-label"
                value={mode || undefined}
                onChange={(v) => setMode(v as CreationMode)}
                invalid={!!errors.mode}
                options={CREATION_MODES}
              />
              <FieldError>{errors.mode}</FieldError>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="team-description">Team description</Label>
              <Textarea
                id="team-description"
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, DESCRIPTION_MAX))}
                placeholder="Brief description…"
                rows={3}
                maxLength={DESCRIPTION_MAX}
              />
              <span className="self-end text-xs" style={{ color: 'var(--role-fg-neutral-subtle)' }}>
                {description.length}/{DESCRIPTION_MAX}
              </span>
            </div>
          </Stack>
        </div>

        <SheetFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create team
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" style={{ color: 'var(--role-fg-critical)' }}>
        *
      </span>
      <span className="sr-only">(required)</span>
    </>
  );
}
