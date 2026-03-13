import figma from '@figma/code-connect';
import DSButton from '../components/Button/Button';

/**
 * Code Connect mapping for DSButton
 *
 * IMPORTANT: Replace NODE_URL below with the actual node URL for your Button component
 * in your published Figma design library. You can grab this from Dev Mode by selecting
 * the Button master component and copying the link.
 *
 * Tip: If you set figma.config.json documentUrlSubstitutions.LIB to your file key,
 * you can use a shorthand like `${LIB}?node-id=...` here as well.
 */
// Use the node URL without runtime params like &m=dev
const NODE_URL = 'https://www.figma.com/design/C6wGKw7jP7H4p6baq5XRJj/V2---ACTIONS-%E2%9C%93?node-id=3372-6252';


// Define the connection
figma.connect(
  DSButton,
  NODE_URL,
  {
    // Map Figma properties to DSButton props
    props: {
      label: figma.string('Label'),
      type: figma.enum('Type', {
        Primary: 'primary',
        Secondary: 'secondary',
        Outline: 'outline',
        Ghost: 'ghost',
      }),
      size: figma.enum('Size', {
        Small: 'sm',
        Default: 'md',
        Large: 'lg',
      }),
      destructive: figma.boolean('Destructive'),
      hasLeftIcon: figma.boolean('Has Left Icon'),
      hasRightIcon: figma.boolean('Has Right Icon'),
    },
    // Render example using mapped props
  example: (props: any) => (
      <DSButton
        variant={props.type}
        size={props.size}
        tone={props.destructive ? 'danger' : 'default'}
        startIcon={props.hasLeftIcon ? (
          // Use a tiny inline chevron to avoid external dependencies in the preview
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M9.5 12L5.5 8l4-4 1 1-3 3 3 3-1 1z"/></svg>
        ) : undefined}
        endIcon={props.hasRightIcon ? (
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M6.5 4l4 4-4 4-1-1 3-3-3-3 1-1z"/></svg>
        ) : undefined}
      >
        {props.label}
      </DSButton>
    ),
  }
);
