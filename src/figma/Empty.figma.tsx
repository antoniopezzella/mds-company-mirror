import figma from '@figma/code-connect';
import { InboxIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../components/ui/empty';

/**
 * Code Connect — Empty
 *
 * General-purpose empty-state primitives (see empty.tsx's own docblock).
 * `hasMedia`/`hasAction` gate the optional `EmptyMedia` icon slot and the
 * `EmptyContent` action button; title/description are always rendered since
 * neither is individually optional in the node.
 */
const NODE_URL = '${LIB}?node-id=7584-26186';

figma.connect(Empty, NODE_URL, {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
    hasMedia: figma.boolean('Has Media'),
    hasAction: figma.boolean('Has Action'),
  },
  example: (props) => (
    <Empty className="max-w-md">
      <EmptyHeader>
        {props.hasMedia && (
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
        )}
        <EmptyTitle>{props.title}</EmptyTitle>
        <EmptyDescription>{props.description}</EmptyDescription>
      </EmptyHeader>
      {props.hasAction && (
        <EmptyContent>
          <Button variant="secondary" size="sm">
            Clear filters
          </Button>
        </EmptyContent>
      )}
    </Empty>
  ),
});
