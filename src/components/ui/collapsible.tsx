import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

/**
 * Collapsible — no MDS/Figma spec exists for this yet; a thin, unstyled
 * re-export of Radix Collapsible (shadcn/ui's own convention — this
 * primitive has no default visual styling to begin with). Compose it with
 * role-token-driven classNames at the call site, same as real shadcn/ui.
 */

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
const CollapsibleContent = CollapsiblePrimitive.Content;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
