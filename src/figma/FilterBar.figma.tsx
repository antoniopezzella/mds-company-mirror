import figma from '@figma/code-connect';
import { FilterBar, FilterBarSearch, FilterBarSelect } from '../components/ui/filter-bar';

/**
 * Code Connect — FilterBar
 *
 * The page-level filter row (see filter-bar.tsx's own docblock on why it
 * exists — four bespoke, inconsistent filter rows previously shipped). The
 * composed fields (search/select/date-range) are children, not props, so
 * the example renders a representative row rather than a data-driven one.
 * `size` cascades to every child control via context.
 */
const NODE_URL = '${LIB}?node-id=7582-11704';

figma.connect(FilterBar, NODE_URL, {
  props: {
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
  },
  example: (props) => (
    <FilterBar size={props.size} onClearAll={() => {}}>
      <FilterBarSearch placeholder="Search…" />
      <FilterBarSelect
        label="Status"
        aria-label="Status"
        options={[
          { value: 'active', label: 'Active' },
          { value: 'pending', label: 'Pending' },
        ]}
      />
    </FilterBar>
  ),
});
