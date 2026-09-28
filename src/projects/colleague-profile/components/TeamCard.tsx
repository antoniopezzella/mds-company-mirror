import * as React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Chip } from '@/components/ui/chip';
import { Button } from '@/components/ui/button';
import { Inline, Stack } from '@/components/ui/stack';
import { cn } from '@/lib/utils';
import type { Team } from '../data';

/**
 * One team, as a card.
 *
 * Composed entirely from the shared set — `Card`'s own subcomponents give the
 * title/description treatment and the footer's top border, so nothing here
 * restates either.
 *
 * THE TOP OF THE CARD IS THE LINK. Every card led to the same place, so a
 * "Manage Team" button was a second, smaller target for what the whole card
 * already meant.
 *
 * It is a STRETCHED LINK, not a clickable card: the anchor lives on the
 * title and an `::after` covers the region above the footer. That matters
 * because a card-wide `<a>` cannot legally contain the Transfer button, and
 * a card-wide `onClick` on a div would not be a link at all — no middle
 * click, no cmd-click, no "open in new tab", and nothing for a screen reader
 * to announce as navigation. The stretch stops short of the footer, so
 * Transfer stays a real, separately-clickable control rather than something
 * fighting an overlay for the same pixels.
 *
 * The accessible name is the team's name alone, which reads correctly in a
 * links list. The rest of the card is description, not part of the label.
 */

export interface TeamCardProps {
  team: Team;
  /** Where the card leads. A route, so the link is a real link. */
  manageHref: string;
  /**
   * Shown only when the team is transferable AND the current role may
   * transfer it. Omitted entirely rather than disabled — see the note in
   * ColleagueProfile on why page-level actions hide and row-level ones don't.
   */
  onTransfer?: (team: Team) => void;
}

export function TeamCard({ team, manageHref, onTransfer }: TeamCardProps) {
  const overCapacity = team.members > team.capacity;
  const countLabel = `${team.members} of ${team.capacity}`;
  const showTransfer = !!team.transferable && !!onTransfer;

  return (
    <Card
      className={cn(
        'flex h-full flex-col transition-shadow',
        // The whole card lifts, because the whole top of it is the target.
        'hover:shadow-md',
        // The link's own ring would be trapped behind the stretched overlay,
        // so the CARD carries the focus treatment on the link's behalf.
        'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
      )}
    >
      {/* `relative` scopes the stretched ::after below to exactly this region
          — everything above the footer, and nothing of it. */}
      <div className="relative flex flex-1 flex-col">
        <CardHeader>
          <CardTitle>
            <Link
              to={manageHref}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-hidden"
            >
              {team.name}
            </Link>
          </CardTitle>
          {team.description && <CardDescription>{team.description}</CardDescription>}
        </CardHeader>

        <CardContent className="flex-1">
          <Stack gap={3}>
            {team.specialties.length > 0 && (
              <Inline gap={2} aria-label="Specialties">
                {team.specialties.map((specialty) => (
                  <Badge key={specialty} tone="info" variant="solid" size="sm">
                    {specialty}
                  </Badge>
                ))}
              </Inline>
            )}

            <Inline gap={2}>
              <Chip
                size="sm"
                // `outlined`, not the default `filled`: the filled tones
                // resolve to status BACKGROUND roles — #f7f8f8, #fffafa —
                // which are alert-panel tints, near-white and
                // indistinguishable from the card behind them.
                variant="outlined"
                tone={overCapacity ? 'danger' : 'primary'}
                icon={<Users className="size-3.5" aria-hidden="true" />}
                // Spelled out rather than left to colour alone: "9 of 7"
                // reads as an ordinary count until you notice the order.
                label={
                  <span>
                    {countLabel}
                    <span className="sr-only">
                      {overCapacity ? ' members — over capacity' : ' members'}
                    </span>
                  </span>
                }
              />

              {team.delegatedBy && (
                // `Badge`, not `Chip`: `Chip tone="warning"` is unreadable in
                // dark mode — its foreground role is `text.onLight`, which
                // stays #000f47 while the page goes to #101010 (1.05:1,
                // measured). Reported separately; Badge resolves correctly in
                // both modes.
                <Badge tone="warning" variant="outline" size="sm">
                  Delegated by {team.delegatedBy}
                </Badge>
              )}
            </Inline>
          </Stack>
        </CardContent>
      </div>

      {/* Rendered only when there is something in it. An empty CardFooter is
          a stray horizontal rule with padding under it. */}
      {showTransfer && (
        <CardFooter>
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => onTransfer?.(team)}
            // Named for the team: three "Transfer" buttons across a grid tell
            // a screen-reader user nothing about which card they are on.
            aria-label={`Transfer ${team.name}`}
          >
            Transfer
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default TeamCard;
