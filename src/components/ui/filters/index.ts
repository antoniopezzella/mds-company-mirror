/**
 * Filters — a query system, with chips as one presentation of it (§72).
 *
 * The visual layer is deliberately thin: the canonical query, the operators,
 * the pure utilities and the adapters carry the meaning, and none of them
 * import React. That is what lets the same query drive a filter bar, an
 * advanced builder, a URL and a server request.
 */
export * from './filters-types';
export * from './filters-operators';
export * from './filters-query';
export * from './filters-schema';
export * from './filters-describe';
export * from './filters-field-picker';
export * from './filters-value-editor';
export * from './filters-rule';
export * from './filters-group';
export * from './filters-builder';
export * from './filters';
export * from './adapters/predicate';
