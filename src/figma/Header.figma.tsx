import figma from '@figma/code-connect';
import Header from '../components/Header/Header';

/** Code Connect — Global Header (V3 Navigation) */
const NODE_URL = '${LIB}?node-id=7584-36418';

figma.connect(Header, NODE_URL, {
  props: {
    hasSearch: figma.boolean('Has Search'),
    hasUserProfile: figma.boolean('Has user profile'),
    hasLanguageButton: figma.boolean('Has Language Button'),
    hasBackground: figma.boolean('Has background color'),
    platform: figma.enum('Platform', {
      Application: 'application',
      Marketing: 'marketing',
    }),
  },
  example: (props: any) => (
    <Header
      variant={props.platform}
      showSearch={props.hasSearch}
      showProfile={props.hasUserProfile}
    />
  ),
});
