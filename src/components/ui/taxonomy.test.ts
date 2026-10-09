import fs from 'node:fs';
import path from 'node:path';

import {
  CODE_ONLY,
  CONTESTED,
  CONTRACTS,
  TAXONOMY,
  TIERS,
  byTier,
  contractOf,
  contractCoverage,
  figmaMappable,
  tierOf,
  type Tier,
} from './taxonomy';

/**
 * The taxonomy is only useful if it is complete and current. A manifest that
 * silently falls behind the filesystem is worse than no manifest, because
 * agents and docs will trust it. These tests are the thing that keeps it true.
 */

const UI_DIR = path.join(process.cwd(), 'src/components/ui');

/**
 * Component modules on disk.
 *
 * A component is either a `.tsx` file or a DIRECTORY with an index — the
 * latter is how a component large enough to warrant its own files ships
 * (`filters/` was the first). Counting only loose files let a whole
 * directory-shaped component escape classification entirely, which is
 * precisely what the taxonomy exists to prevent.
 */
function componentsOnDisk(): string[] {
  const entries = fs.readdirSync(UI_DIR, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && e.name.endsWith('.tsx') && !/\.(stories|test)\.tsx$/.test(e.name))
    .map((e) => e.name.replace(/\.tsx$/, ''));
  const dirs = entries
    .filter(
      (e) =>
        e.isDirectory() &&
        ['index.ts', 'index.tsx'].some((i) => fs.existsSync(path.join(UI_DIR, e.name, i)))
    )
    .map((e) => e.name);
  return [...files, ...dirs].sort();
}

describe('taxonomy', () => {
  it('classifies every component that exists on disk', () => {
    const missing = componentsOnDisk().filter((c) => !(c in TAXONOMY));
    expect(
      missing,
      `Unclassified component(s). Add them to src/components/ui/taxonomy.ts: ${missing.join(', ')}`
    ).toEqual([]);
  });

  it('does not classify components that no longer exist', () => {
    const onDisk = new Set(componentsOnDisk());
    const stale = Object.keys(TAXONOMY).filter((c) => !onDisk.has(c));
    expect(
      stale,
      `Taxonomy references missing file(s). Remove them from taxonomy.ts: ${stale.join(', ')}`
    ).toEqual([]);
  });

  it('uses only defined tiers', () => {
    const valid = new Set(Object.keys(TIERS));
    for (const [component, tier] of Object.entries(TAXONOMY)) {
      expect(valid.has(tier), `${component} has unknown tier "${tier}"`).toBe(true);
    }
  });

  it('defines every tier with a testable membership question', () => {
    for (const [tier, def] of Object.entries(TIERS)) {
      expect(def.test.length, `${tier}.test is empty`).toBeGreaterThan(20);
      expect(def.role.length, `${tier}.role is empty`).toBeGreaterThan(20);
    }
  });

  it('populates every tier', () => {
    for (const tier of Object.keys(TIERS) as Tier[]) {
      expect(byTier(tier).length, `tier "${tier}" is empty`).toBeGreaterThan(0);
    }
  });

  it('byTier returns sorted, partitioned results that sum to the whole', () => {
    const tiers = Object.keys(TIERS) as Tier[];
    const all = tiers.flatMap(byTier);
    expect(all.length).toBe(Object.keys(TAXONOMY).length);
    expect(new Set(all).size).toBe(all.length); // no component in two tiers

    for (const tier of tiers) {
      const list = byTier(tier);
      expect(list).toEqual([...list].sort());
    }
  });

  it('tierOf resolves known components and returns undefined otherwise', () => {
    expect(tierOf('button')).toBe('atom');
    expect(tierOf('data-table')).toBe('organism');
    expect(tierOf('page-shell')).toBe('template');
    expect(tierOf('definitely-not-a-component')).toBeUndefined();
  });

  it('only records contested notes for components that exist', () => {
    const unknown = Object.keys(CONTESTED).filter((c) => !(c in TAXONOMY));
    expect(unknown, `CONTESTED references unknown component(s): ${unknown.join(', ')}`).toEqual([]);
  });

  it('keeps the layout atoms and the template classified as intended', () => {
    // These are the composition entry points; if they drift tier, the docs
    // and the composition skill stop matching the library. `stack` covers
    // both Stack and Inline — the manifest is keyed by module, not by export.
    expect(tierOf('stack')).toBe('atom');
    expect(tierOf('page-shell')).toBe('template');
  });

  // ── Contracts ────────────────────────────────────────────────────────────
  // Contracts are PARTIAL by design (written only where boundaries are known),
  // so these validate integrity, not coverage. Coverage is tracked by ds:score.

  it('writes contracts only for components that exist in the taxonomy', () => {
    const orphan = Object.keys(CONTRACTS).filter((c) => !(c in TAXONOMY));
    expect(orphan, `contracts for non-existent components: ${orphan.join(', ')}`).toEqual([]);
  });

  it("every whenNotToUse `instead` names a real component", () => {
    const broken: string[] = [];
    for (const [name, c] of Object.entries(CONTRACTS)) {
      for (const alt of c.whenNotToUse ?? []) {
        if (!(alt.instead in TAXONOMY)) broken.push(`${name} → ${alt.instead}`);
      }
    }
    // A dangling pointer sends a reader (or an agent) to a component that does
    // not exist — worse than no pointer. This caught `button → link` on the
    // first run; there is no Link component.
    expect(broken, `dangling instead pointers: ${broken.join(', ')}`).toEqual([]);
  });

  it('every contract states a purpose and at least one whenToUse', () => {
    const thin = Object.entries(CONTRACTS)
      .filter(([, c]) => !c.purpose?.trim() || !(c.whenToUse?.length))
      .map(([n]) => n);
    expect(thin, `contracts missing purpose/whenToUse: ${thin.join(', ')}`).toEqual([]);
  });

  it('contractOf resolves a written contract and returns undefined otherwise', () => {
    expect(contractOf('button')?.purpose).toMatch(/action/i);
    expect(contractOf('definitely-not-a-component')).toBeUndefined();
  });

  it('contractCoverage counts only taxonomy-resident contracts', () => {
    const { withContract, total } = contractCoverage();
    expect(total).toBe(Object.keys(TAXONOMY).length);
    expect(withContract).toBe(Object.keys(CONTRACTS).filter((k) => k in TAXONOMY).length);
    expect(withContract).toBeGreaterThan(0);
  });

  // ── Code Connect mappability ───────────────────────────────────────────────
  // CODE_ONLY is the honest denominator correction: components with no Figma
  // node cannot be Code-Connected, so counting them as coverage gaps makes the
  // metric unreachable. These guard that the exclusion list stays truthful.

  it('only excludes components that exist in the taxonomy', () => {
    const orphan = Object.keys(CODE_ONLY).filter((c) => !(c in TAXONOMY));
    expect(orphan, `CODE_ONLY references non-existent components: ${orphan.join(', ')}`).toEqual([]);
  });

  it('gives every code-only exclusion a non-empty reason', () => {
    const unreasoned = Object.entries(CODE_ONLY)
      .filter(([, why]) => !why?.trim())
      .map(([n]) => n);
    // The reason is the thing that stops the list quietly growing to flatter
    // the metric — an exclusion with no stated reason is exactly that.
    expect(unreasoned, `code-only exclusions missing a reason: ${unreasoned.join(', ')}`).toEqual([]);
  });

  it('figmaMappable is taxonomy minus code-only, sorted, and non-empty', () => {
    const mappable = figmaMappable();
    expect(mappable).toEqual([...mappable].sort());
    expect(mappable.length).toBe(Object.keys(TAXONOMY).length - Object.keys(CODE_ONLY).length);
    expect(mappable.length).toBeGreaterThan(0);
    for (const c of mappable) expect(c in CODE_ONLY).toBe(false);
  });
});
