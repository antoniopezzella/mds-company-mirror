import type {
  TreeNode,
  TreeStats,
  TreeStudyConfig,
  TreeStudySummary,
  TreeTask,
  TreeTaskResult
} from './types';

export const ROOT_STEP_ID = '__root__';

export function findNodeById(tree: TreeNode[], nodeId: string): TreeNode | null {
  for (const node of tree) {
    if (node.id === nodeId) {
      return node;
    }

    const found = node.children ? findNodeById(node.children, nodeId) : null;
    if (found) {
      return found;
    }
  }

  return null;
}

export function findPathToNode(tree: TreeNode[], nodeId: string): TreeNode[] | null {
  for (const node of tree) {
    if (node.id === nodeId) {
      return [node];
    }

    if (node.children) {
      const childPath = findPathToNode(node.children, nodeId);
      if (childPath) {
        return [node, ...childPath];
      }
    }
  }

  return null;
}

export function getChildNodes(tree: TreeNode[], nodeId: string | null): TreeNode[] {
  if (nodeId === null) {
    return tree;
  }

  const node = findNodeById(tree, nodeId);
  return node?.children ?? [];
}

export function getPathLabels(tree: TreeNode[], nodeIds: string[]): string[] {
  return nodeIds
    .map((nodeId) => findNodeById(tree, nodeId)?.label)
    .filter((label): label is string => Boolean(label));
}

export function getAcceptedPaths(tree: TreeNode[], task: TreeTask): string[][] {
  const targetIds = [task.successNodeId, ...(task.acceptableNodeIds ?? [])];
  return targetIds
    .map((nodeId) => findPathToNode(tree, nodeId)?.map((node) => node.id) ?? [])
    .filter((path) => path.length > 0);
}

export function computeTreeStats(tree: TreeNode[]): TreeStats {
  let totalNodes = 0;
  let leafNodes = 0;
  let maxDepth = 0;

  const walk = (nodes: TreeNode[], depth: number) => {
    for (const node of nodes) {
      totalNodes += 1;
      maxDepth = Math.max(maxDepth, depth);

      if (node.children?.length) {
        walk(node.children, depth + 1);
      } else {
        leafNodes += 1;
      }
    }
  };

  walk(tree, 1);

  return {
    totalNodes,
    leafNodes,
    maxDepth
  };
}

export function validateStudyConfig(config: TreeStudyConfig): string[] {
  const errors: string[] = [];
  const seenNodeIds = new Set<string>();

  if (!config.title.trim()) {
    errors.push('Study title is required.');
  }

  if (!config.rootLabel.trim()) {
    errors.push('Root label is required.');
  }

  if (!config.tree.length) {
    errors.push('The IA tree must contain at least one top-level node.');
  }

  if (!config.tasks.length) {
    errors.push('Add at least one task to run a tree test.');
  }

  const walk = (nodes: TreeNode[]) => {
    for (const node of nodes) {
      if (!node.id.trim()) {
        errors.push(`A node is missing an id under "${node.label || 'Untitled'}".`);
      }

      if (!node.label.trim()) {
        errors.push(`Node "${node.id || 'unknown'}" is missing a label.`);
      }

      if (seenNodeIds.has(node.id)) {
        errors.push(`Duplicate node id "${node.id}" found in the tree.`);
      }

      seenNodeIds.add(node.id);

      if (node.children?.length) {
        walk(node.children);
      }
    }
  };

  walk(config.tree);

  const taskIds = new Set<string>();
  for (const task of config.tasks) {
    if (!task.id.trim()) {
      errors.push('Every task needs an id.');
    } else if (taskIds.has(task.id)) {
      errors.push(`Duplicate task id "${task.id}" found.`);
    }

    taskIds.add(task.id);

    if (!task.prompt.trim()) {
      errors.push(`Task "${task.id || 'unknown'}" is missing its prompt.`);
    }

    const validTargets = [task.successNodeId, ...(task.acceptableNodeIds ?? [])];
    for (const nodeId of validTargets) {
      if (!findNodeById(config.tree, nodeId)) {
        errors.push(`Task "${task.id}" points to missing node "${nodeId}".`);
      }
    }
  }

  return errors;
}

export function isFirstClickCorrect(tree: TreeNode[], task: TreeTask, firstClickNodeId: string | null): boolean {
  if (!firstClickNodeId) {
    return false;
  }

  return getAcceptedPaths(tree, task).some((path) => path.includes(firstClickNodeId));
}

export function computeBacktrackCount(tree: TreeNode[], steps: string[]): number {
  const filteredSteps = steps.filter((step) => step !== ROOT_STEP_ID);
  let backtracks = 0;

  for (let index = 1; index < filteredSteps.length; index += 1) {
    const previousPath = findPathToNode(tree, filteredSteps[index - 1])?.map((node) => node.id) ?? [];
    const currentPath = findPathToNode(tree, filteredSteps[index])?.map((node) => node.id) ?? [];

    if (!isPrefix(previousPath, currentPath)) {
      backtracks += 1;
    }
  }

  return backtracks;
}

export function computePathEfficiency(tree: TreeNode[], task: TreeTask, steps: string[], isCorrect: boolean): number {
  if (!isCorrect) {
    return 0;
  }

  const optimalLength = findPathToNode(tree, task.successNodeId)?.length ?? 0;
  const actualLength = steps.filter((step) => step !== ROOT_STEP_ID).length;

  if (!optimalLength || !actualLength) {
    return 0;
  }

  return Math.min(1, optimalLength / actualLength);
}

export function computeTaskScore(args: {
  isCorrect: boolean;
  firstClickIsCorrect: boolean;
  wasDirect: boolean;
  pathEfficiency: number;
}): number {
  const { isCorrect, firstClickIsCorrect, wasDirect, pathEfficiency } = args;

  const rawScore =
    (isCorrect ? 0.5 : 0) +
    (firstClickIsCorrect ? 0.2 : 0) +
    (wasDirect ? 0.15 : 0) +
    0.15 * pathEfficiency;

  return Math.round(rawScore * 100);
}

export function evaluateTaskResult(args: {
  tree: TreeNode[];
  task: TreeTask;
  selectedNodeId: string | null;
  steps: string[];
  firstClickNodeId: string | null;
  durationMs: number;
  confidence?: number | null;
  rationale?: string;
  moderatorNote?: string;
  moderatorTags?: string[];
}): TreeTaskResult {
  const {
    tree,
    task,
    selectedNodeId,
    steps,
    firstClickNodeId,
    durationMs,
    confidence = null,
    rationale = '',
    moderatorNote = '',
    moderatorTags = []
  } = args;
  const expectedPath = findPathToNode(tree, task.successNodeId)?.map((node) => node.id) ?? [];
  const selectedPath = selectedNodeId
    ? findPathToNode(tree, selectedNodeId)?.map((node) => node.id) ?? []
    : [];
  const validTargets = new Set([task.successNodeId, ...(task.acceptableNodeIds ?? [])]);
  const isCorrect = selectedNodeId ? validTargets.has(selectedNodeId) : false;
  const firstClickIsCorrect = isFirstClickCorrect(tree, task, firstClickNodeId);
  const filteredSteps = steps.filter((step) => step !== ROOT_STEP_ID);
  const backtrackCount = computeBacktrackCount(tree, steps);
  const wasDirect = isCorrect && backtrackCount === 0 && arrayEquals(filteredSteps, selectedPath);
  const pathEfficiency = computePathEfficiency(tree, task, steps, isCorrect);
  const score = computeTaskScore({
    isCorrect,
    firstClickIsCorrect,
    wasDirect,
    pathEfficiency
  });

  let status: TreeTaskResult['status'];
  if (!selectedNodeId) {
    status = 'not-found';
  } else if (isCorrect && wasDirect) {
    status = 'correct';
  } else if (isCorrect) {
    status = 'indirect';
  } else {
    status = 'incorrect';
  }

  return {
    taskId: task.id,
    prompt: task.prompt,
    expectedNodeId: task.successNodeId,
    selectedNodeId,
    expectedPath,
    selectedPath,
    steps,
    firstClickNodeId,
    firstClickIsCorrect,
    backtrackCount,
    pathEfficiency,
    confidence,
    rationale,
    moderatorNote,
    moderatorTags,
    isCorrect,
    wasDirect,
    durationMs,
    score,
    status
  };
}

export function summarizeResults(results: TreeTaskResult[], totalTasks = results.length): TreeStudySummary {
  const completedTasks = results.length;
  const successCount = results.filter((result) => result.isCorrect).length;
  const directCount = results.filter((result) => result.wasDirect).length;
  const firstClickCount = results.filter((result) => result.firstClickIsCorrect).length;
  const averageDurationMs = completedTasks
    ? results.reduce((total, result) => total + result.durationMs, 0) / completedTasks
    : 0;
  const confidenceResults = results.filter((result) => result.confidence !== null);
  const averageConfidence = confidenceResults.length
    ? confidenceResults.reduce((total, result) => total + (result.confidence ?? 0), 0) / confidenceResults.length
    : 0;
  const averageScore = completedTasks
    ? results.reduce((total, result) => total + result.score, 0) / completedTasks
    : 0;

  return {
    totalTasks,
    completedTasks,
    successRate: completedTasks ? successCount / completedTasks : 0,
    directnessRate: completedTasks ? directCount / completedTasks : 0,
    firstClickAccuracyRate: completedTasks ? firstClickCount / completedTasks : 0,
    averageDurationMs,
    averageConfidence,
    averageScore
  };
}

function arrayEquals(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((value, index) => value === right[index]);
}

function isPrefix(prefix: string[], target: string[]): boolean {
  if (prefix.length > target.length) {
    return false;
  }

  return prefix.every((value, index) => value === target[index]);
}
