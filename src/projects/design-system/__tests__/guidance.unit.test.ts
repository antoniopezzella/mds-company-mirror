import { describe, it, expect } from 'vitest';
import { guidance } from '../registry/guidance';
import { categories } from '../registry/categories';

describe('design-system guidance cross-links', () => {
  const allComponentIds = new Set(categories.flatMap((c) => c.components.map((entry) => entry.id)));

  it('every relatedComponentId resolves to a real component id in categories', () => {
    for (const [componentId, entry] of Object.entries(guidance)) {
      for (const avoidEntry of entry.avoid) {
        if (!avoidEntry.relatedComponentId) continue;
        expect(
          allComponentIds.has(avoidEntry.relatedComponentId),
          `guidance['${componentId}'].avoid references unknown component id '${avoidEntry.relatedComponentId}'`
        ).toBe(true);
      }
    }
  });

  it('every avoid entry with a relatedComponentId also has a relatedLabel', () => {
    for (const [componentId, entry] of Object.entries(guidance)) {
      for (const avoidEntry of entry.avoid) {
        if (!avoidEntry.relatedComponentId) continue;
        expect(avoidEntry.relatedLabel, `guidance['${componentId}'].avoid has relatedComponentId without relatedLabel`).toBeTruthy();
      }
    }
  });

  it('every guidance key corresponds to a real registered component', () => {
    for (const componentId of Object.keys(guidance)) {
      expect(allComponentIds.has(componentId), `guidance key '${componentId}' has no matching entry in categories`).toBe(true);
    }
  });
});
