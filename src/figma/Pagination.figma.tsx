import figma from '@figma/code-connect';
import { Pagination } from '../components/ui/pagination';

/** Code Connect — Pagination (V3 Navigation) */
const NODE_URL = '${LIB}?node-id=7584-39222';

figma.connect(Pagination, NODE_URL, {
  props: {
    resultsText: figma.string('Results'),
    hasResultsDropdown: figma.boolean('Has Results Dropdown'),
    length: figma.enum('Lenght', {
      Default: 10,
      Short: 5,
      Tiny: 3,
    }),
  },
  example: (props: any) => (
    <Pagination
      currentPage={1}
      totalItems={props.length * 10}
      pageSize={10}
      onPageChange={() => {}}
    />
  ),
});
