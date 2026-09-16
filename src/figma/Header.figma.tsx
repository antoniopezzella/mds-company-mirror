import figma from '@figma/code-connect';
import { Header as DashboardHeader } from '../components/ui/header';
import { WebsiteHeader } from '../components/ui/website-header';

/**
 * Code Connect — Global Header (V3 Navigation). One Figma node covers both
 * real header components via its "Platform" variant: Application maps to
 * the dashboard `Header`, Marketing maps to the public-site `WebsiteHeader`
 * — the previous single mapping here targeted a generic `Header` union
 * component with `variant`/`showSearch`/`showProfile` props that matched
 * neither real component's actual API.
 */
const NODE_URL = '${LIB}?node-id=7584-36418';

figma.connect(DashboardHeader, NODE_URL, {
  variant: { Platform: 'Application' },
  example: () => <DashboardHeader sidebarOpen onToggleSidebar={() => {}} />,
});

figma.connect(WebsiteHeader, NODE_URL, {
  variant: { Platform: 'Marketing' },
  props: {
    showLanguageSelector: figma.boolean('Has Language Button'),
  },
  example: (props: any) => <WebsiteHeader showLanguageSelector={props.showLanguageSelector} />,
});
