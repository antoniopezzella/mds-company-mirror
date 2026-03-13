import figma from '@figma/code-connect';
import { WebsiteAlertBanner } from '../components/WebsiteAlertBanner/WebsiteAlertBanner';

/**
 * Code Connect mapping for WebsiteAlertBanner
 * 
 * Maps the Figma Alert Banner component set to the React WebsiteAlertBanner component.
 * This enables design-to-code handoff and maintains sync between Figma and implementation.
 */
const NODE_URL = 'https://www.figma.com/design/WB5yvasAqHhL8RmSFfwoRF/Alert-Banner-Revised---Hand-off?node-id=3817-27466';

figma.connect(
  WebsiteAlertBanner,
  NODE_URL,
  {
    props: {
      // Map Figma Brand variants to component brand prop
      brand: figma.enum('Brand', {
        'Oliver Wyman': 'oliver-wyman',
        'Guy Carpenter': 'guy-carpenter',
        'Marsh': 'marsh',
        'Mercer': 'mercer',
        'MMA': 'mma',
      }),
      // Map Figma Property variants (Desktop/Tablet/Mobile are handled via CSS)
      variant: figma.enum('Property', {
        'Desktop': 'default',
        'Tablet': 'default', 
        'Mobile': 'default',
      }),
      // Map Figma text content to component props
      title: figma.textContent('Headline2#4276:12*'),
      // Note: Children content mapped from design specs, not dynamic Figma text
    },
    example: (props: any) => (
      <WebsiteAlertBanner
        brand={props.brand}
        variant="default"
        title={props.title || "We're evolving and building a new, expanded Marsh brand to represent all of our capabilities."}
        primaryActionLabel="Learn more"
        secondaryActionLabel="Contact us"
      >
        {props.title || "We're evolving and building a new, expanded Marsh brand to represent all of our capabilities."}
      </WebsiteAlertBanner>
    ),
  }
);