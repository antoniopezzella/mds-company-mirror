import * as React from 'react';
import { Users } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Chip } from '@/components/ui/chip';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Inline, Stack } from '@/components/ui/stack';
import type { Team } from '../data';

/**
 * One team, as a card.
 *
 * Composed entirely from the shared set — `Card`'s own subcomponents give the
 * title/description treatment and the footer's top border, so nothing here
 * restates either.
 *
 * The screenshot renders every membership count in the same neutral pill,
 * including a team at 9 of 7. That flattens the one fact on the screen worth
 * acting on, so an over-capacity team gets the `danger` tone and says so in
 * its accessible name — the colour is the signal a sighted user gets, and the
 * text is the one everybody else gets.
 */

export interface TeamCardProps {
  team: Team;
  onManage?: (team: Team) => void;
  onTransfer?: (team: Team) => void;
}

export function TeamCard({ team, onManage, onTransfer }: TeamCardProps) {
  const overCapacity = team.members > team.capacity;
  const countLabel = `${team.members} of ${team.capacity}`;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
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
              // `outlined`, not the default `filled`: the filled tones resolve
              // to status BACKGROUND roles — #f7f8f8, #fffafa — which are
              // alert-panel tints, near-white and indistinguishable from the
              // card behind them. Measured, not guessed. The outline gives the
              // pill an edge while keeping every colour on a role.
              variant="outlined"
              tone={overCapacity ? 'danger' : 'primary'}
              icon={<Users className="size-3.5" aria-hidden="true" />}
              // Spelled out rather than left to colour alone: "9 of 7" reads
              // as an ordinary count until you notice which way round it is.
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
              // `Badge`, not `Chip`, and deliberately.
              //
              // `Chip tone="warning"` is UNREADABLE IN DARK MODE: its
              // foreground role is `text.onLight`, which stays #000f47 while
              // the page goes to #101010 — measured at 1.05:1. Every other
              // Chip tone inverts correctly, and the comment at chip.tsx:120
              // claiming all of them clear 4.5:1 is wrong for this one.
              //
              // That is a bug in a shared component, not something to paper
              // over by hand-styling here. Badge's warning tone resolves
              // correctly in both modes, so this uses the component that
              // works and the Chip bug is reported separately.
              <Badge tone="warning" variant="outline" size="sm">
                Delegated by {team.delegatedBy}
              </Badge>
            )}
          </Inline>
        </Stack>
      </CardContent>

      <CardFooter>
        {/* Named for the team, not just "Manage Team" — three identical
            "Manage Team" buttons tell a screen-reader user nothing about
            which card they are on. */}
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => onManage?.(team)}
          aria-label={`Manage ${team.name}`}
        >
          Manage Team
        </Button>

        {team.transferable && (
          <>
            <Separator orientation="vertical" className="h-4" />
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => onTransfer?.(team)}
              aria-label={`Transfer ${team.name}`}
            >
              Transfer
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default TeamCard;
