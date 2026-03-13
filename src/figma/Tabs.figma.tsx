import figma from '@figma/code-connect';
import Tabs from '../components/Tabs/Tabs';

/**
 * Code Connect mapping for Tabs component
 *
 * IMPORTANT: Replace NODE_URL below with the actual node URL for your Tabs component
 * in your published Figma design library. You can grab this from Dev Mode by selecting
 * the Tabs master component and copying the link.
 *
 * To find your Tabs component in Figma:
 * 1. Open your design system file in Figma
 * 2. Go to Dev Mode
 * 3. Select the Tabs component
 * 4. Copy the node URL from the address bar or "Copy link" option
 * 5. Paste it below (remove any runtime params like &m=dev)
 *
 * Example format: https://www.figma.com/design/YOUR_FILE_KEY?node-id=XXX-YYY
 */
const NODE_URL = 'https://www.figma.com/design/C6wGKw7jP7H4p6baq5XRJj/V2---ACTIONS-%E2%9C%93?node-id=REPLACE-WITH-TABS-NODE-ID';

// Define the Figma Code Connect mapping
figma.connect(
  Tabs,
  NODE_URL,
  {
    // Map Figma properties to Tabs props
    props: {
      // Map the variant property from Figma
      variant: figma.enum('Variant', {
        Standard: 'standard',
        Scrollable: 'scrollable',
        'Full Width': 'fullWidth',
      }),
      // Map number of tabs (you might need to adjust this based on your Figma setup)
      tabCount: figma.enum('Tabs', {
        'Two Tabs': 2,
        'Three Tabs': 3,
        'Four Tabs': 4,
        'Five Tabs': 5,
      }),
      // Map individual tab labels (adjust based on your Figma component)
      tab1Label: figma.string('Tab 1 Label'),
      tab2Label: figma.string('Tab 2 Label'),
      tab3Label: figma.string('Tab 3 Label'),
      tab4Label: figma.string('Tab 4 Label'),
    },
    // Render example using mapped props
    example: (props: any) => {
      // Build tabs array based on tab count
      const tabs = [];
      
      // Add tabs based on count
      if (props.tabCount >= 1) {
        tabs.push({
          id: 'tab1',
          title: props.tab1Label || 'Overview',
          content: (
            <div>
              <h3>Overview Content</h3>
              <p>This is the content for the overview tab.</p>
            </div>
          ),
        });
      }
      
      if (props.tabCount >= 2) {
        tabs.push({
          id: 'tab2',
          title: props.tab2Label || 'Details',
          content: (
            <div>
              <h3>Details Content</h3>
              <p>This is the content for the details tab.</p>
            </div>
          ),
        });
      }
      
      if (props.tabCount >= 3) {
        tabs.push({
          id: 'tab3',
          title: props.tab3Label || 'Analytics',
          content: (
            <div>
              <h3>Analytics Content</h3>
              <p>This is the content for the analytics tab.</p>
            </div>
          ),
        });
      }
      
      if (props.tabCount >= 4) {
        tabs.push({
          id: 'tab4',
          title: props.tab4Label || 'Settings',
          content: (
            <div>
              <h3>Settings Content</h3>
              <p>This is the content for the settings tab.</p>
            </div>
          ),
        });
      }

      return (
        <Tabs
          tabs={tabs}
          variant={props.variant}
          onSelect={(id) => console.log('Selected tab:', id)}
        />
      );
    },
  }
);
