import figma from '@figma/code-connect';
import { NotificationsDrawer } from '../components/ui/notifications-drawer';

/**
 * Code Connect — NotificationsDrawer
 *
 * shadcn/Radix counterpart to the MUI `NotificationsDrawer` (see
 * notifications-drawer.tsx's own docblock) — rebuilt on `Sheet`, same risk-
 * notification content/grouping/filtering behavior. `notifications` is data,
 * not a Figma variant, so the example relies on the component's own built-in
 * sample set rather than inventing a fixture to satisfy an unused prop.
 */
const NODE_URL = '${LIB}?node-id=7584-26412';

figma.connect(NotificationsDrawer, NODE_URL, {
  example: () => <NotificationsDrawer open onClose={() => {}} />,
});
