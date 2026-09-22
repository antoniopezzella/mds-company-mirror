import '@testing-library/jest-dom';

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
