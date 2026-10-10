// Registers Vitest's ambient globals (`describe`, `it`, `expect`, `vi`, …) for
// the test type-check project (tsconfig.test.json), matching `globals: true` in
// vitest.config.ts. 59 test files import these from 'vitest' explicitly; the
// rest rely on them being global.
//
// Vitest's jest-dom matchers (`toBeInTheDocument`, …) are NOT referenced here:
// src/setupTests.ts imports '@testing-library/jest-dom/vitest', whose
// `declare module 'vitest'` augmentation applies across the whole program.
//
// Kept outside src/ so tsconfig.app.json's `include: ["src"]` does not pick it
// up and leak Vitest globals into the application type-check.
/// <reference types="vitest/globals" />
