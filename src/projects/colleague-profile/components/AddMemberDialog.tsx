import * as React from 'react';
import { Check, X } from 'lucide-react';

import { Modal } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Stack } from '@/components/ui/stack';
import { getRoleColor } from '@/theme/roles';
import { cn } from '@/lib/utils';
import { DIRECTORY, type DirectoryColleague } from '../data';

/**
 * Add colleagues to a team, from the MMC-wide Workday directory.
 *
 * Search, tick as many people as you want, review the queue, commit once.
 * Rebuilt from the live screen, with four changes — each marked below where
 * it happens:
 *
 *  1. No nested "Search Workday Directory" panel. The modal is already
 *     titled "Add team members" and the field is already labelled; a third
 *     heading in between says the same thing a third time and boxes a single
 *     input inside a dialog that is itself a box.
 *  2. Someone already on the team is SHOWN and disabled, not hidden. A
 *     directory that silently omits them looks tidier and leaves the user
 *     wondering why a colleague they can see in Workday is missing here.
 *  3. One selection indicator, not two. The live screen swaps the avatar for
 *     a tick AND ticks a checkbox — the tick costs you the initials you were
 *     using to tell two Antonios apart, to say something the checkbox
 *     already said.
 *  4. Arrow keys and Enter work. The queue count is announced.
 */

export interface AddMemberDialogProps {
  open: boolean;
  onClose: () => void;
  /** Colleague ids already on the team — shown, but not selectable. */
  existingMemberIds: string[];
  onAdd: (colleagues: DirectoryColleague[]) => void;
}

export function AddMemberDialog({ open, onClose, existingMemberIds, onAdd }: AddMemberDialogProps) {
  const [term, setTerm] = React.useState('');
  const [queued, setQueued] = React.useState<DirectoryColleague[]>([]);
  const [active, setActive] = React.useState(0);
  const listRef = React.useRef<HTMLDivElement>(null);

  // Starting fresh on each open: a queue left over from last time would be
  // committed by a user who never chose those people in this session.
  React.useEffect(() => {
    if (open) {
      setTerm('');
      setQueued([]);
      setActive(0);
    }
  }, [open]);

  const existing = React.useMemo(() => new Set(existingMemberIds), [existingMemberIds]);

  const results = React.useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return [];
    return DIRECTORY.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [term]);

  React.useEffect(() => setActive(0), [term]);

  // Scrolls the LIST, not whatever happens to be scrollable above it.
  // `scrollIntoView` walks the whole ancestor chain, so it also scrolled the
  // dialog — which was the visible half of the padding bug: it slid the
  // content sideways under the padding on every arrow key. Even with the
  // dialog no longer overflowing horizontally, it would still yank the body's
  // vertical scroll while the user is only moving a highlight.
  React.useEffect(() => {
    const list = listRef.current;
    const option = list?.querySelector<HTMLElement>(`#add-member-${active}`);
    if (!list || !option) return;
    // Rect deltas, not `offsetTop` — that is measured from the nearest
    // POSITIONED ancestor, and the list is static, so it would report
    // distances from the dialog instead.
    const listBox = list.getBoundingClientRect();
    const optionBox = option.getBoundingClientRect();
    if (optionBox.top < listBox.top) {
      list.scrollTop -= listBox.top - optionBox.top;
    } else if (optionBox.bottom > listBox.bottom) {
      list.scrollTop += optionBox.bottom - listBox.bottom;
    }
  }, [active, term]);

  const isQueued = (c: DirectoryColleague) => queued.some((q) => q.id === c.id);

  const toggle = (c: DirectoryColleague) => {
    if (existing.has(c.id)) return;
    setQueued((cur) => (cur.some((q) => q.id === c.id) ? cur.filter((q) => q.id !== c.id) : [...cur, c]));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      // Ticks the highlighted person rather than submitting: Enter in a
      // search field that commits the whole form would add whoever happened
      // to be queued, from a keystroke meant for the list.
      e.preventDefault();
      toggle(results[active]);
    }
  };

  const muted = getRoleColor('text.secondary');

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title="Add team members"
      footer={
        <Button
          variant="primary"
          size="md"
          fullWidth
          disabled={queued.length === 0}
          onClick={() => {
            onAdd(queued);
            onClose();
          }}
        >
          {/* The count is in the label, so the button says what it will do
              rather than asking the user to remember. */}
          {queued.length === 0
            ? 'Add members to team'
            : `Add ${queued.length} member${queued.length === 1 ? '' : 's'} to team`}
        </Button>
      }
    >
      <Stack gap={4}>
        <div>
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search by name or email…"
            aria-label="Search the Workday directory by name or email"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="add-member-results"
            aria-activedescendant={results.length ? `add-member-${active}` : undefined}
            aria-autocomplete="list"
          />
          <p className="mt-1.5 text-xs" style={{ color: muted }}>
            Searches Marsh, Mercer and Oliver Wyman.
          </p>
        </div>

        {/* Outside the listbox: a `role="listbox"` whose only child is a
            paragraph fails axe's aria-required-children. */}
        {term.trim() && results.length === 0 && (
          <p className="text-sm" style={{ color: muted }}>
            No colleagues found for “{term.trim()}”.
          </p>
        )}

        {results.length > 0 && (
          <div
            id="add-member-results"
            ref={listRef}
            role="listbox"
            aria-label="Directory results"
            aria-multiselectable="true"
            className="max-h-56 overflow-y-auto rounded-lg border"
            style={{ borderColor: getRoleColor('border.default') }}
          >
            {results.map((c, i) => {
              const alreadyOnTeam = existing.has(c.id);
              const selected = isQueued(c);
              return (
                <div
                  key={c.id}
                  id={`add-member-${i}`}
                  role="option"
                  // Programmatically focusable, never in the tab order: the
                  // input owns focus and moves the highlight with
                  // aria-activedescendant, so typing keeps working while the
                  // selection moves.
                  tabIndex={-1}
                  aria-selected={selected}
                  aria-disabled={alreadyOnTeam || undefined}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toggle(c);
                  }}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5',
                    alreadyOnTeam ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                  )}
                  style={{
                    backgroundColor:
                      i === active && !alreadyOnTeam
                        ? getRoleColor('surface.subtle')
                        : selected
                          ? getRoleColor('surface.accent')
                          : undefined,
                  }}
                >
                  {/* The avatar STAYS when selected. Two people called
                      Antonio are told apart by their initials and their
                      email; replacing the avatar with a tick removes one of
                      those to repeat what the checkbox already says. */}
                  <Avatar initials={c.initials} size="sm" tone={selected ? 'primary' : 'default'} alt="" />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{c.name}</span>
                    <span className="block truncate text-xs" style={{ color: muted }}>
                      {c.email}
                    </span>
                    <span className="block truncate text-xs" style={{ color: muted }}>
                      {c.jobTitle} · {c.location}
                    </span>
                  </span>

                  {alreadyOnTeam ? (
                    <span
                      className="inline-flex shrink-0 items-center gap-1 text-xs"
                      style={{ color: muted }}
                    >
                      <Check className="size-3.5" aria-hidden="true" />
                      Already a member
                    </span>
                  ) : (
                    <Checkbox
                      checked={selected}
                      // The row owns the click; this is the visual state and
                      // must not fire a second toggle on top of it.
                      tabIndex={-1}
                      aria-hidden="true"
                      className="pointer-events-none shrink-0"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {queued.length > 0 && (
          <Stack gap={2}>
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: muted }}
            >
              {queued.length} member{queued.length === 1 ? '' : 's'} queued to add
            </p>

            {queued.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 rounded-lg border px-3 py-2"
                style={{ borderColor: getRoleColor('border.subtle') }}
              >
                <Avatar initials={c.initials} size="sm" tone="primary" alt="" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{c.name}</span>
                  <span className="block truncate text-xs" style={{ color: muted }}>
                    {c.jobTitle} · {c.location}
                  </span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  // `icon`, NOT a child — Button's iconOnly branch discards
                  // children (button.tsx:343).
                  icon={<X className="size-4" aria-hidden="true" />}
                  aria-label={`Remove ${c.name} from the queue`}
                  onClick={() => toggle(c)}
                />
              </div>
            ))}
          </Stack>
        )}

        {/* Polite: the count changes while the user is still typing and
            ticking, so it must not interrupt them. */}
        <div role="status" aria-live="polite" className="sr-only">
          {queued.length
            ? `${queued.length} member${queued.length === 1 ? '' : 's'} queued to add.`
            : ''}
        </div>
      </Stack>
    </Modal>
  );
}

export default AddMemberDialog;
