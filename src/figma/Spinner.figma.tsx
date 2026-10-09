import figma from '@figma/code-connect';
import { Spinner } from '../components/ui/spinner';

/**
 * Code Connect — Spinner
 *
 * Ported from shadcn/ui's "spinner" registry item (see spinner.tsx's own
 * docblock) — a thin `Loader2Icon` wrapper with `role="status"`. It takes no
 * props of its own beyond standard SVG attributes, so only `className` (for
 * sizing, via Tailwind's `size-*`) is exposed here.
 */
const NODE_URL = '${LIB}?node-id=7584-33082';

figma.connect(Spinner, NODE_URL, {
  example: () => <Spinner />,
});
