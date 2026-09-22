export interface TreeNode {
  id: string;
  label: string;
  description?: string;
  children?: TreeNode[];
}

export interface TreeTask {
  id: string;
  prompt: string;
  context?: string;
  successNodeId: string;
  acceptableNodeIds?: string[];
}

export interface TreeStudyConfig {
  title: string;
  description: string;
  rootLabel: string;
  tree: TreeNode[];
  tasks: TreeTask[];
}

export type TreeTaskStatus = 'correct' | 'indirect' | 'incorrect' | 'not-found';

export type TreeActor = 'participant' | 'moderator' | 'system';

export type TreeEventType =
  | 'task_started'
  | 'node_expanded'
  | 'node_collapsed'
  | 'node_clicked'
  | 'destination_selected'
  | 'destination_cleared'
  | 'answer_submitted'
  | 'confidence_set'
  | 'rationale_saved'
  | 'moderator_note_added'
  | 'tag_added'
  | 'tag_removed'
  | 'task_reset'
  | 'task_completed';

export interface TreeEvent {
  id: string;
  sessionId: string;
  taskId: string;
  sequence: number;
  timestamp: string;
  actor: TreeActor;
  eventType: TreeEventType;
  nodeId?: string | null;
  parentId?: string | null;
  payload?: Record<string, unknown>;
}

export interface ModeratorNote {
  id: string;
  sessionId: string;
  taskId: string;
  createdAt: string;
  text: string;
  tags: string[];
}

export interface TreeTaskResult {
  taskId: string;
  prompt: string;
  expectedNodeId: string;
  selectedNodeId: string | null;
  expectedPath: string[];
  selectedPath: string[];
  steps: string[];
  firstClickNodeId: string | null;
  firstClickIsCorrect: boolean;
  backtrackCount: number;
  pathEfficiency: number;
  confidence: number | null;
  rationale: string;
  moderatorNote: string;
  moderatorTags: string[];
  isCorrect: boolean;
  wasDirect: boolean;
  durationMs: number;
  score: number;
  status: TreeTaskStatus;
}

export interface TreeStudySummary {
  totalTasks: number;
  completedTasks: number;
  successRate: number;
  directnessRate: number;
  firstClickAccuracyRate: number;
  averageDurationMs: number;
  averageConfidence: number;
  averageScore: number;
}

export interface TreeStats {
  totalNodes: number;
  leafNodes: number;
  maxDepth: number;
}
