import * as React from 'react';
import { Plus, X } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
import { Chip } from '@/components/ui/chip';
import { Label } from '@/components/ui/label';
import { Stack } from '@/components/ui/stack';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';
import { UsersRound } from 'lucide-react';

import {
  CLIENT_ROLES,
  DIRECTORY,
  type CreationMode,
  type Team,
  type TeamClientRole,
} from '../data';
import { RadioCardGroup } from './RadioCardGroup';

/**
 * Team Setup — the single home for a team's fuller configuration.
 *
 * The Create drawer seeds name / size / mode / description; everything else
 * (qualifiers, roles, coverage) lives here, so no field is asked twice. Two
 * cards, matching the source screen: Team Configuration and Team Roles.
 */

const DESCRIPTION_MAX = 225;

const CREATION_MODES = [
  { value: 'manual', title: 'Manual', description: 'Add members by searching Workday in “Manage Team”.' },
  { value: 'auto-sync', title: 'Auto-Sync', description: 'Workday direct reports sync in automatically.' },
] as const;

interface Draft {
  name: string;
  capacity: string;
  creationMode: CreationMode;
  description: string;
  qualifiers: string[];
  roles: TeamClientRole[];
}

function toDraft(team: Team): Draft {
  return {
    name: team.name,
    capacity: String(team.capacity ?? ''),
    creationMode: team.creationMode ?? 'manual',
    description: team.description ?? '',
    qualifiers: team.specialties ?? [],
    roles: team.roles ?? [],
  };
}

export interface TeamSetupProps {
  team: Team;
  onSave: (patch: Partial<Team>) => void;
}

export function TeamSetup({ team, onSave }: TeamSetupProps) {
  const [draft, setDraft] = React.useState<Draft>(() => toDraft(team));
  const set = <K extends keyof Draft>(key: K, v: Draft[K]) => setDraft((d) => ({ ...d, [key]: v }));

  // Re-seed if the team identity changes (navigating between teams).
  React.useEffect(() => setDraft(toDraft(team)), [team.id]);

  const baseline = React.useMemo(() => toDraft(team), [team]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(baseline);

  const save = () => {
    onSave({
      name: draft.name.trim() || team.name,
      capacity: Number(draft.capacity) || team.capacity,
      creationMode: draft.creationMode,
      description: draft.description.trim() || undefined,
      specialties: draft.qualifiers,
      roles: draft.roles,
    });
    // Confirm in place — the user stays on Team Setup; the store update clears
    // the dirty state so Save/Cancel disable on their own.
    toast({
      tone: 'success',
      title: 'Team settings saved',
      description: `Your changes to “${draft.name.trim() || team.name}” are live.`,
    });
  };

  return (
    <Stack gap={6}>
      <p className="text-sm" style={{ color: 'var(--role-fg-neutral-subtle)' }}>
        Configure your team settings and how members are managed in the portal.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ── Team Configuration ─────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Team configuration</CardTitle>
            <CardDescription>Name, size and how members are added.</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap={5}>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="setup-name">Team name</Label>
                <Input id="setup-name" value={draft.name} onChange={(e) => set('name', e.target.value)} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="setup-size">Target team size</Label>
                <Input
                  id="setup-size"
                  type="number"
                  min={1}
                  value={draft.capacity}
                  onChange={(e) => set('capacity', e.target.value)}
                  className="w-40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label id="setup-mode-label">Team member creation mode</Label>
                <RadioCardGroup
                  aria-labelledby="setup-mode-label"
                  value={draft.creationMode}
                  onChange={(v) => set('creationMode', v as CreationMode)}
                  options={CREATION_MODES.map((m) => ({ ...m }))}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="setup-desc">Team description</Label>
                <Textarea
                  id="setup-desc"
                  rows={3}
                  maxLength={DESCRIPTION_MAX}
                  value={draft.description}
                  onChange={(e) => set('description', e.target.value.slice(0, DESCRIPTION_MAX))}
                />
                <span className="self-end text-xs" style={{ color: 'var(--role-fg-neutral-subtle)' }}>
                  {draft.description.length}/{DESCRIPTION_MAX}
                </span>
              </div>

              <QualifiersField value={draft.qualifiers} onChange={(q) => set('qualifiers', q)} />
            </Stack>
          </CardContent>
        </Card>

        {/* ── Team Roles ─────────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Team roles ({draft.roles.length})</CardTitle>
            <CardDescription>Which client roles this team supports, and who covers each.</CardDescription>
          </CardHeader>
          <CardContent>
            <RolesEditor roles={draft.roles} onChange={(roles) => set('roles', roles)} />
          </CardContent>
        </Card>
      </div>

      {/* ── Save bar ──────────────────────────────────────────────────────── */}
      <div
        className="flex justify-end gap-2 border-t pt-4"
        style={{ borderColor: 'var(--role-border-default)' }}
      >
        <Button variant="secondary" disabled={!dirty} onClick={() => setDraft(toDraft(team))}>
          Cancel changes
        </Button>
        <Button variant="primary" disabled={!dirty} onClick={save}>
          Save all settings
        </Button>
      </div>
    </Stack>
  );
}

/** Type-and-enter qualifier tags, rendered as removable chips. */
function QualifiersField({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [term, setTerm] = React.useState('');
  const add = () => {
    const t = term.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setTerm('');
  };
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="setup-qualifiers">Team qualifiers</Label>
      <Input
        id="setup-qualifiers"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            add();
          }
        }}
        placeholder="Type a qualifier and press Enter…"
      />
      {value.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {value.map((q) => (
            <Chip key={q} label={q} onDelete={() => onChange(value.filter((x) => x !== q))} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Master-detail roles editor: add a client role, then cover it with colleagues. */
function RolesEditor({ roles, onChange }: { roles: TeamClientRole[]; onChange: (r: TeamClientRole[]) => void }) {
  const [selectedId, setSelectedId] = React.useState<string | null>(roles[0]?.id ?? null);
  const selected = roles.find((r) => r.id === selectedId) ?? null;

  const availableRoles = CLIENT_ROLES.filter((r) => !roles.some((x) => x.role === r));
  const addRole = (role: string) => {
    const id = `role-${role.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const next: TeamClientRole = { id, role, coverage: [] };
    onChange([...roles, next]);
    setSelectedId(id);
  };
  const removeRole = (id: string) => {
    onChange(roles.filter((r) => r.id !== id));
    if (selectedId === id) setSelectedId(null);
  };
  const addCoverage = (roleId: string, colleagueId: string) => {
    const c = DIRECTORY.find((d) => d.id === colleagueId);
    if (!c) return;
    onChange(
      roles.map((r) =>
        r.id === roleId && !r.coverage.some((x) => x.colleagueId === c.id)
          ? { ...r, coverage: [...r.coverage, { id: `${roleId}-${c.id}`, colleagueId: c.id, name: c.name }] }
          : r
      )
    );
  };
  const removeCoverage = (roleId: string, coverageId: string) =>
    onChange(roles.map((r) => (r.id === roleId ? { ...r, coverage: r.coverage.filter((c) => c.id !== coverageId) } : r)));

  if (roles.length === 0) {
    return (
      <Stack gap={4}>
        <Combobox
          options={availableRoles.map((r) => ({ value: r, label: r }))}
          value=""
          onChange={(v) => v && addRole(String(v))}
          placeholder="Add a role…"
          aria-label="Add a role"
        />
        <Empty className="py-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UsersRound />
            </EmptyMedia>
            <EmptyTitle>No roles yet</EmptyTitle>
            <EmptyDescription>Add a client role to start assigning coverage.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Stack>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      {/* Roles list */}
      <Stack gap={2}>
        <Combobox
          options={availableRoles.map((r) => ({ value: r, label: r }))}
          value=""
          onChange={(v) => v && addRole(String(v))}
          placeholder="Add a role…"
          aria-label="Add a role"
          disabled={availableRoles.length === 0}
        />
        <ul className="flex list-none flex-col gap-1 p-0">
          {roles.map((r) => {
            const active = r.id === selectedId;
            return (
              <li key={r.id}>
                <div
                  className="flex items-center justify-between gap-2 rounded-md border px-3 py-2"
                  style={{
                    borderColor: active ? 'var(--role-interactive-primary)' : 'var(--role-border-default)',
                    backgroundColor: active ? 'var(--role-bg-selected-subtle)' : 'transparent',
                  }}
                >
                  <button
                    type="button"
                    className="flex-1 text-left text-sm font-medium outline-none"
                    style={{ color: 'var(--role-fg-primary)' }}
                    onClick={() => setSelectedId(r.id)}
                  >
                    {r.role}
                    <span className="ml-2 text-xs font-normal" style={{ color: 'var(--role-fg-neutral-subtle)' }}>
                      {r.coverage.length} covering
                    </span>
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconOnly
                    icon={<X className="size-4" aria-hidden="true" />}
                    aria-label={`Remove role ${r.role}`}
                    onClick={() => removeRole(r.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </Stack>

      {/* Coverage detail */}
      <div
        className="rounded-md border p-4"
        style={{ borderColor: 'var(--role-border-default)' }}
      >
        {selected ? (
          <Stack gap={3}>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="add-coverage" className="text-sm font-semibold">
                Coverage · {selected.role}
              </Label>
              <Combobox
                options={DIRECTORY.filter((d) => !selected.coverage.some((c) => c.colleagueId === d.id)).map((d) => ({
                  value: d.id,
                  label: `${d.name} · ${d.jobTitle}`,
                }))}
                value=""
                onChange={(v) => v && addCoverage(selected.id, String(v))}
                placeholder="Add coverage…"
                searchPlaceholder="Search Workday…"
                aria-label="Add coverage"
              />
            </div>
            {selected.coverage.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--role-fg-neutral-subtle)' }}>
                No one covers this role yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {selected.coverage.map((c) => (
                  <Chip key={c.id} label={c.name} onDelete={() => removeCoverage(selected.id, c.id)} />
                ))}
              </div>
            )}
          </Stack>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-sm" style={{ color: 'var(--role-fg-neutral-subtle)' }}>
            Select a role to add coverage.
          </div>
        )}
      </div>
    </div>
  );
}
