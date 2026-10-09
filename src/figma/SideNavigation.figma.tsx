import figma from '@figma/code-connect';
import { SideNavigation } from '../components/ui/side-navigation';

/**
 * Code Connect — Side Navigation (V3 Navigation)
 *
 * Repointed from the deleted `src/components/SideNavigation` (MUI) to
 * `ui/side-navigation`'s `SideNavigation`. `state` (Expanded/Collapsed) maps
 * to the boolean `collapsed` prop; `hasNeedHelp` maps to `hideSupportCta`
 * (inverted — the Figma property says whether the "Need help?" footer is
 * present, the prop says whether to hide it).
 *
 * `hasOpenClose` is dropped: this component renders no built-in expand/
 * collapse toggle button of its own — collapsing is entirely controlled by
 * the parent via `collapsed`/`onCollapsedChange` — so there is no prop for
 * "does this rail show its own open/close control" to map onto.
 */
const NODE_URL = '${LIB}?node-id=7584-41118';

figma.connect(SideNavigation, NODE_URL, {
  props: {
    state: figma.enum('State', {
      Expanded: 'expanded',
      Collapsed: 'collapsed',
    }),
    hasNeedHelp: figma.boolean('Has Need Help'),
  },
  example: (props) => (
    <SideNavigation
      collapsed={props.state === 'collapsed'}
      hideSupportCta={!props.hasNeedHelp}
      items={[
        { label: 'Dashboard', path: '/' },
        { label: 'Reports', path: '/reports' },
        { label: 'Settings', path: '/settings' },
      ]}
    />
  ),
});
