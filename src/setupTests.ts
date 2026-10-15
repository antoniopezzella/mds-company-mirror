// The `/vitest` entry (not the bare '@testing-library/jest-dom') registers the
// same DOM matchers AND augments Vitest's `expect` directly. The bare entry's
// type definitions do `/// <reference types="jest" />`, which pulls @types/jest's
// global `expect` — typed with a single argument and returning `JestMatchers` —
// into any TypeScript program that includes this file (tsconfig.test.json). That
// shadows Vitest's own `expect`, breaking both the `expect(value, message)`
// overload and Vitest-only matchers like `toHaveBeenCalledOnce`. Runtime is
// unchanged: both entries call the identical `expect.extend(...)`.
import '@testing-library/jest-dom/vitest';

// Radix UI primitives (Select, Checkbox, etc.) call these DOM APIs during
// interaction — jsdom doesn't implement them, so tests throw without a stub.
if (typeof Element !== 'undefined') {
  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.setPointerCapture ??= () => {};
  Element.prototype.releasePointerCapture ??= () => {};
  Element.prototype.scrollIntoView ??= () => {};
}

// jsdom doesn't implement ResizeObserver — Radix components that measure
// their own content (Tooltip's Arrow via @radix-ui/react-use-size, Select's
// viewport sizing) call it unconditionally on mount and throw without a
// stub, even when the test never asserts on the measured size itself.
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
