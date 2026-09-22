import { describe, expect, it } from 'vitest';
import { sampleTreeStudy } from './sampleStudy';
import {
  computeBacktrackCount,
  computePathEfficiency,
  computeTaskScore,
  computeTreeStats,
  evaluateTaskResult,
  findPathToNode,
  isFirstClickCorrect,
  validateStudyConfig
} from './treeTesting.utils';

describe('treeTesting utils', () => {
  it('finds the expected path for a target node', () => {
    const path = findPathToNode(sampleTreeStudy.tree, 'benchmarks')?.map((node) => node.id);
    expect(path).toEqual(['analytics', 'benchmarks']);
  });

  it('scores a direct correct answer as correct', () => {
    const result = evaluateTaskResult({
      tree: sampleTreeStudy.tree,
      task: sampleTreeStudy.tasks[0],
      selectedNodeId: 'certificates',
      steps: ['coverage', 'certificates'],
      firstClickNodeId: 'coverage',
      durationMs: 3400
    });

    expect(result.isCorrect).toBe(true);
    expect(result.wasDirect).toBe(true);
    expect(result.status).toBe('correct');
    expect(result.firstClickIsCorrect).toBe(true);
    expect(result.score).toBe(100);
  });

  it('scores a successful detour as indirect', () => {
    const result = evaluateTaskResult({
      tree: sampleTreeStudy.tree,
      task: sampleTreeStudy.tasks[0],
      selectedNodeId: 'certificates',
      steps: ['claims', 'coverage', 'certificates'],
      firstClickNodeId: 'claims',
      durationMs: 8200
    });

    expect(result.isCorrect).toBe(true);
    expect(result.wasDirect).toBe(false);
    expect(result.status).toBe('indirect');
    expect(result.backtrackCount).toBe(1);
  });

  it('detects first-click correctness from the target path', () => {
    expect(isFirstClickCorrect(sampleTreeStudy.tree, sampleTreeStudy.tasks[2], 'analytics')).toBe(true);
    expect(isFirstClickCorrect(sampleTreeStudy.tree, sampleTreeStudy.tasks[2], 'claims')).toBe(false);
  });

  it('computes backtracks and path efficiency', () => {
    expect(computeBacktrackCount(sampleTreeStudy.tree, ['claims', 'coverage', 'certificates'])).toBe(1);
    expect(computePathEfficiency(sampleTreeStudy.tree, sampleTreeStudy.tasks[0], ['coverage', 'certificates'], true)).toBe(1);
    expect(computePathEfficiency(sampleTreeStudy.tree, sampleTreeStudy.tasks[0], ['claims', 'coverage', 'certificates'], true)).toBeCloseTo(2 / 3);
  });

  it('computes weighted task scores', () => {
    expect(
      computeTaskScore({
        isCorrect: true,
        firstClickIsCorrect: true,
        wasDirect: false,
        pathEfficiency: 2 / 3
      })
    ).toBe(80);
  });

  it('reports missing task targets during validation', () => {
    const errors = validateStudyConfig({
      ...sampleTreeStudy,
      tasks: [
        {
          id: 'broken-task',
          prompt: 'Broken task',
          successNodeId: 'missing-node'
        }
      ]
    });

    expect(errors).toContain('Task "broken-task" points to missing node "missing-node".');
  });

  it('computes tree statistics', () => {
    const stats = computeTreeStats(sampleTreeStudy.tree);
    expect(stats.totalNodes).toBe(24);
    expect(stats.leafNodes).toBe(18);
    expect(stats.maxDepth).toBe(2);
  });
});
