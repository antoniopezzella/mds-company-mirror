import figma from '@figma/code-connect';
import SideNavigation from '../components/SideNavigation/SideNavigation';

/** Code Connect — Side Navigation (V3 Navigation) */
const NODE_URL = '${LIB}?node-id=7584-41118';

figma.connect(SideNavigation, NODE_URL, {
  props: {
    state: figma.enum('State', {
      Expanded: 'expanded',
      Collapsed: 'collapsed',
    }),
    hasNeedHelp: figma.boolean('Has Need Help'),
    hasOpenClose: figma.boolean('Has Open/Close'),
  },
  example: (props: any) => (
    <SideNavigation
      collapsed={props.state === 'collapsed'}
      items={[
        { label: 'Dashboard', icon: 'home', href: '/' },
        { label: 'Reports', icon: 'chart', href: '/reports' },
        { label: 'Settings', icon: 'settings', href: '/settings' },
      ]}
    />
  ),
});
