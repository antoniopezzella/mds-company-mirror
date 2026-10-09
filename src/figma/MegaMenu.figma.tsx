import figma from '@figma/code-connect';
import { MegaMenu } from '../components/ui/mega-menu';

/**
 * Code Connect — Mega Menu (V3 Navigation)
 *
 * Repointed from the deleted `src/components/MegaMenu` (MUI) to
 * `ui/mega-menu`'s `MegaMenu` — note this is NOT an API-compatible shim like
 * most of the other repoints in this set. The old overlay was imperative
 * (`isOpen`/`onClose`/`offsetTop`, manual `createPortal`); the new one is a
 * Radix `NavigationMenu` driven entirely by a declarative `items[]` array of
 * hover/focus-activated panels (see its own docblock). There is no
 * `isOpen`/`onClose` on the new component — this mapping does not try to
 * paper over that, it switches the example to the real `items` shape.
 *
 * Only `description`/`hasDescription` have a genuine target on the new shape
 * (`MegaMenuItem.description`). `hasSidePanel`, `hasFeaturedArticles`, and
 * `hasTitle` describe affordances the new component does not have: no side-
 * panel slot, no "featured articles" toggle (that would just be caller-
 * supplied `sections` data, not a flag), and the item `label` is always
 * rendered (no optional-title toggle) — so those three are dropped rather
 * than forced onto an unrelated prop. If Figma needs to keep representing a
 * side-panel or featured-articles variant, `ui/mega-menu` would need new
 * props added for them first.
 */
const NODE_URL = '${LIB}?node-id=7584-37445';

figma.connect(MegaMenu, NODE_URL, {
  props: {
    description: figma.string('Description'),
    hasDescription: figma.boolean('Has Description'),
  },
  example: (props) => (
    <MegaMenu
      items={[
        {
          label: 'Solutions',
          description: props.hasDescription ? props.description : undefined,
          sections: [
            {
              title: 'Featured',
              items: [
                { label: 'Overview', href: '#' },
                { label: 'Pricing', href: '#' },
              ],
            },
          ],
        },
      ]}
    />
  ),
});
