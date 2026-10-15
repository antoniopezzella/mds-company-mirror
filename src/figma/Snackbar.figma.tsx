import figma from '@figma/code-connect';
import { Toast, ToastAction, ToastProvider, ToastTitle, ToastViewport } from '../components/ui/toast';

/**
 * Code Connect — Message / Snackbar (V3 Feedback)
 *
 * Repointed from the deleted `src/components/Snackbar` (MUI) to `ui/toast`'s
 * `Toast` — the shadcn/Radix queue/viewport primitive that replaced the
 * single-instance MUI Snackbar (see the docblock at the top of `toast.tsx`).
 * `Toast` must be rendered inside a `ToastProvider` + `ToastViewport`, the
 * same wrapper `toast.test.tsx` uses to mount it.
 *
 * `status` keeps its Figma-side name but now targets `tone` (`ToastTone`):
 * its `'info'`/`'success'` values are a direct match, no remapping needed.
 * `hasActionCTA` maps to conditionally rendering a `ToastAction`. `hasBadge`
 * is dropped — `Toast` has no badge/count slot to turn on or off.
 */
const NODE_URL = '${LIB}?node-id=7584-34199';

figma.connect(Toast, NODE_URL, {
  props: {
    tone: figma.enum('Status', {
      Unread: 'info',
      Read: 'success',
    }),
    hasActionCTA: figma.boolean('Has action CTA'),
  },
  example: (props) => (
    <ToastProvider>
      <Toast open tone={props.tone}>
        <ToastTitle>Notification message</ToastTitle>
        {props.hasActionCTA && <ToastAction altText="Undo">Undo</ToastAction>}
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
});
