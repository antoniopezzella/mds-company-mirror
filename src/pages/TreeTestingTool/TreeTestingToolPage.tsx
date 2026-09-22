import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import type {
  ModeratorNote,
  TreeActor,
  TreeEvent,
  TreeEventType,
  TreeNode,
  TreeStudyConfig,
  TreeTaskResult
} from '../../features/tree-testing/types';
import { sampleTreeStudy } from '../../features/tree-testing/sampleStudy';
import {
  ROOT_STEP_ID,
  computeTreeStats,
  evaluateTaskResult,
  findNodeById,
  findPathToNode,
  getPathLabels,
  summarizeResults,
  validateStudyConfig
} from '../../features/tree-testing/treeTesting.utils';
import './TreeTestingTool.scss';

const MODERATOR_TAGS = [
  'Top-level ambiguity',
  'Label confusion',
  'Overlap',
  'Expected elsewhere',
  'Insurance jargon',
  'Hesitation'
];

function createId(prefix: string): string {
  const randomId = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 10);
  return `${prefix}-${randomId}`;
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatDuration(durationMs: number): string {
  if (durationMs < 1000) {
    return `${durationMs} ms`;
  }

  return `${(durationMs / 1000).toFixed(1)}s`;
}

function getStatusTone(status: TreeTaskResult['status']): 'success' | 'warning' | 'error' | 'default' {
  switch (status) {
    case 'correct':
      return 'success';
    case 'indirect':
      return 'warning';
    case 'incorrect':
    case 'not-found':
      return 'error';
    default:
      return 'default';
  }
}

const contrastFieldSx = {
  '& .MuiInputLabel-root': {
    color: '#314862',
    fontWeight: 600
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#0b4bff'
  },
  '& .MuiInputLabel-root.Mui-disabled': {
    color: '#5f738a'
  },
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: '16px',
    border: '1px solid rgba(12, 37, 77, 0.18)',
    backgroundColor: '#f8fbff',
    color: '#071229',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.75)',
    '&:before, &:after': {
      display: 'none'
    },
    '&:hover': {
      backgroundColor: '#ffffff',
      borderColor: 'rgba(11, 75, 255, 0.35)'
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      borderColor: '#0b4bff',
      boxShadow: '0 0 0 3px rgba(11, 75, 255, 0.16)'
    },
    '&.Mui-disabled': {
      backgroundColor: '#edf3f9',
      borderColor: 'rgba(12, 37, 77, 0.1)',
      color: '#4f6178'
    }
  },
  '& .MuiFilledInput-input': {
    color: '#071229',
    fontWeight: 500
  },
  '& .MuiFilledInput-input::placeholder': {
    color: '#5f738a',
    opacity: 1
  },
  '& .MuiFormHelperText-root': {
    color: '#42566d'
  }
} as const;

function csvCell(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }

  const stringValue =
    Array.isArray(value)
      ? value.join(' > ')
      : typeof value === 'object'
        ? JSON.stringify(value)
        : String(value);

  return `"${stringValue.replaceAll('"', '""')}"`;
}

function downloadFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function buildResponsesCsv(args: {
  config: TreeStudyConfig;
  participantLabel: string;
  moderatorLabel: string;
  sessionId: string;
  results: TreeTaskResult[];
}): string {
  const { config, participantLabel, moderatorLabel, sessionId, results } = args;
  const rows = [
    [
      'session_id',
      'participant_id',
      'moderator_id',
      'task_id',
      'prompt',
      'expected_path',
      'selected_path',
      'first_click_node_id',
      'first_click_correct',
      'final_success',
      'direct_success',
      'backtrack_count',
      'path_efficiency',
      'duration_ms',
      'confidence',
      'score',
      'rationale',
      'moderator_note',
      'moderator_tags'
    ]
  ];

  for (const result of results) {
    rows.push([
      sessionId,
      participantLabel || 'anonymous',
      moderatorLabel || 'moderator',
      result.taskId,
      result.prompt,
      getPathLabels(config.tree, result.expectedPath).join(' / '),
      getPathLabels(config.tree, result.selectedPath).join(' / '),
      result.firstClickNodeId ?? '',
      String(result.firstClickIsCorrect),
      String(result.isCorrect),
      String(result.wasDirect),
      String(result.backtrackCount),
      result.pathEfficiency.toFixed(3),
      String(result.durationMs),
      result.confidence != null ? String(result.confidence) : '',
      String(result.score),
      result.rationale,
      result.moderatorNote,
      Array.isArray(result.moderatorTags) ? result.moderatorTags.join(';') : ''
    ]);
  }

  return rows.map((row) => row.map(csvCell).join(',')).join('\n');
}

function buildEventsCsv(events: TreeEvent[]): string {
  const rows = [
    [
      'session_id',
      'task_id',
      'sequence',
      'timestamp',
      'actor',
      'event_type',
      'node_id',
      'parent_id',
      'payload'
    ]
  ];

  for (const event of events) {
    rows.push([
      event.sessionId,
      event.taskId,
      String(event.sequence),
      event.timestamp,
      event.actor,
      event.eventType,
      event.nodeId ?? '',
      event.parentId ?? '',
      event.payload != null ? JSON.stringify(event.payload) : ''
    ]);
  }

  return rows.map((row) => row.map(csvCell).join(',')).join('\n');
}

function buildExportPayload(args: {
  config: TreeStudyConfig;
  participantLabel: string;
  moderatorLabel: string;
  sessionId: string;
  results: TreeTaskResult[];
  events: TreeEvent[];
  notes: ModeratorNote[];
}) {
  const { config, participantLabel, moderatorLabel, sessionId, results, events, notes } = args;
  const summary = summarizeResults(results, config.tasks.length);

  return {
    exportedAt: new Date().toISOString(),
    session: {
      id: sessionId,
      participant: participantLabel || 'anonymous',
      moderator: moderatorLabel || 'moderator'
    },
    study: {
      title: config.title,
      description: config.description,
      rootLabel: config.rootLabel
    },
    summary: {
      ...summary,
      successRate: Number(summary.successRate.toFixed(4)),
      directnessRate: Number(summary.directnessRate.toFixed(4)),
      firstClickAccuracyRate: Number(summary.firstClickAccuracyRate.toFixed(4)),
      averageConfidence: Number(summary.averageConfidence.toFixed(4)),
      averageScore: Number(summary.averageScore.toFixed(2))
    },
    results: results.map((result) => ({
      ...result,
      expectedLabels: getPathLabels(config.tree, result.expectedPath),
      selectedLabels: getPathLabels(config.tree, result.selectedPath),
      stepLabels: getPathLabels(
        config.tree,
        result.steps.filter((step) => step !== ROOT_STEP_ID)
      )
    })),
    notes,
    events
  };
}

interface TreeNodeItemProps {
  node: TreeNode;
  depth: number;
  expandedNodeIds: string[];
  selectedNodeId: string | null;
  disabled: boolean;
  onToggle: (node: TreeNode, parentId: string | null) => void;
  onSelect: (node: TreeNode, parentId: string | null) => void;
  parentId?: string | null;
}

function TreeNodeItem(props: TreeNodeItemProps) {
  const {
    node,
    depth,
    expandedNodeIds,
    selectedNodeId,
    disabled,
    onToggle,
    onSelect,
    parentId = null
  } = props;
  const hasChildren = Boolean(node.children?.length);
  const isExpanded = expandedNodeIds.includes(node.id);
  const isSelected = selectedNodeId === node.id;

  return (
    <div className="tree-testing-tool__tree-node">
      <div
        className={[
          'tree-testing-tool__tree-row',
          isSelected ? 'tree-testing-tool__tree-row--selected' : '',
          disabled ? 'tree-testing-tool__tree-row--disabled' : ''
        ].join(' ')}
        style={{ paddingLeft: `${depth * 18}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            className="tree-testing-tool__tree-toggle"
            onClick={() => onToggle(node, parentId)}
            aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
            disabled={disabled}
          >
            {isExpanded ? '−' : '+'}
          </button>
        ) : (
          <span className="tree-testing-tool__tree-toggle tree-testing-tool__tree-toggle--placeholder" />
        )}

        <button
          type="button"
          className="tree-testing-tool__tree-label"
          onClick={() => onSelect(node, parentId)}
          disabled={disabled}
        >
          <span>{node.label}</span>
          {hasChildren ? <span className="tree-testing-tool__tree-meta">{node.children?.length} children</span> : null}
        </button>
      </div>

      {hasChildren && isExpanded ? (
        <div className="tree-testing-tool__tree-children">
          {node.children?.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedNodeIds={expandedNodeIds}
              selectedNodeId={selectedNodeId}
              disabled={disabled}
              onToggle={onToggle}
              onSelect={onSelect}
              parentId={node.id}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function TreeTestingToolPage() {
  type FlowStep = 'intro' | 'instructions' | 'session' | 'complete';

  const [studyConfig, setStudyConfig] = useState<TreeStudyConfig>(sampleTreeStudy);
  const [draftTitle, setDraftTitle] = useState(sampleTreeStudy.title);
  const [draftDescription, setDraftDescription] = useState(sampleTreeStudy.description);
  const [draftRootLabel, setDraftRootLabel] = useState(sampleTreeStudy.rootLabel);
  const [draftTreeJson, setDraftTreeJson] = useState(JSON.stringify(sampleTreeStudy.tree, null, 2));
  const [draftTasksJson, setDraftTasksJson] = useState(JSON.stringify(sampleTreeStudy.tasks, null, 2));
  const [configErrors, setConfigErrors] = useState<string[]>([]);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [flowStep, setFlowStep] = useState<FlowStep>('intro');
  const [participantLabel, setParticipantLabel] = useState('');
  const [moderatorLabel, setModeratorLabel] = useState('Moderator');
  const [sessionId, setSessionId] = useState(() => createId('session'));
  const [events, setEvents] = useState<TreeEvent[]>([]);
  const [moderatorNotes, setModeratorNotes] = useState<ModeratorNote[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [firstClickNodeId, setFirstClickNodeId] = useState<string | null>(null);
  const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>([]);
  const [startedAt, setStartedAt] = useState<number>(() => Date.now());
  const [now, setNow] = useState<number>(() => Date.now());
  const [pendingResult, setPendingResult] = useState<TreeTaskResult | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [rationale, setRationale] = useState('');
  const [moderatorNote, setModeratorNote] = useState('');
  const [moderatorTags, setModeratorTags] = useState<string[]>([]);
  const [results, setResults] = useState<TreeTaskResult[]>([]);
  const eventSequenceRef = useRef(0);

  const treeStats = useMemo(() => computeTreeStats(studyConfig.tree), [studyConfig.tree]);
  const summary = useMemo(
    () => summarizeResults(results, studyConfig.tasks.length),
    [results, studyConfig.tasks.length]
  );
  const currentTask = studyConfig.tasks[currentTaskIndex] ?? null;
  const currentPath = useMemo(
    () => (currentNodeId ? findPathToNode(studyConfig.tree, currentNodeId) ?? [] : []),
    [currentNodeId, studyConfig.tree]
  );
  const expectedPathLabels = useMemo(
    () =>
      currentTask
        ? getPathLabels(
            studyConfig.tree,
            findPathToNode(studyConfig.tree, currentTask.successNodeId)?.map((node) => node.id) ?? []
          )
        : [],
    [currentTask, studyConfig.tree]
  );
  const progressValue = studyConfig.tasks.length ? (results.length / studyConfig.tasks.length) * 100 : 0;
  const isFinished = currentTaskIndex >= studyConfig.tasks.length;
  const isSessionActive = flowStep === 'session';
  const isLiveTaskMode = isSessionActive && !isFinished && currentTask !== null;
  const currentNode = currentNodeId ? findNodeById(studyConfig.tree, currentNodeId) : null;
  const elapsedMs = pendingResult ? pendingResult.durationMs : Math.max(0, now - startedAt);

  const logEvent = useCallback((args: {
    actor: TreeActor;
    eventType: TreeEventType;
    nodeId?: string | null;
    parentId?: string | null;
    payload?: Record<string, unknown>;
  }) => {
    if (!currentTask) {
      return;
    }

    const sequence = eventSequenceRef.current + 1;
    eventSequenceRef.current = sequence;

    const nextEvent: TreeEvent = {
      id: createId('event'),
      sessionId,
      taskId: currentTask.id,
      sequence,
      timestamp: new Date().toISOString(),
      actor: args.actor,
      eventType: args.eventType,
      nodeId: args.nodeId ?? null,
      parentId: args.parentId ?? null,
      payload: args.payload
    };

    setEvents((previous) => [...previous, nextEvent]);
  }, [currentTask, sessionId]);

  useEffect(() => {
    if (!isSessionActive || !currentTask || isFinished) {
      return;
    }

    const taskStartTime = Date.now();
    setStartedAt(taskStartTime);
    setNow(taskStartTime);
    logEvent({
      actor: 'system',
      eventType: 'task_started',
      payload: {
        taskOrder: currentTaskIndex + 1,
        prompt: currentTask.prompt
      }
    });
  }, [currentTask, currentTaskIndex, isFinished, isSessionActive, sessionId, logEvent]);

  useEffect(() => {
    if (!isSessionActive || isFinished || pendingResult) {
      return;
    }

    const timerId = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timerId);
  }, [currentTaskIndex, isFinished, isSessionActive, pendingResult]);

  const clearTaskInputs = () => {
    setCurrentNodeId(null);
    setSteps([]);
    setFirstClickNodeId(null);
    setExpandedNodeIds([]);
    setPendingResult(null);
    setConfidence(null);
    setRationale('');
    setModeratorNote('');
    setModeratorTags([]);
  };

  const resetRun = () => {
    eventSequenceRef.current = 0;
    setSessionId(createId('session'));
    setEvents([]);
    setModeratorNotes([]);
    setResults([]);
    setCurrentTaskIndex(0);
    clearTaskInputs();
    setFlowStep('intro');
  };

  const applyDraftConfig = () => {
    try {
      const parsedTree = JSON.parse(draftTreeJson);
      const parsedTasks = JSON.parse(draftTasksJson);

      const nextConfig: TreeStudyConfig = {
        title: draftTitle.trim(),
        description: draftDescription.trim(),
        rootLabel: draftRootLabel.trim(),
        tree: parsedTree,
        tasks: parsedTasks
      };

      const errors = validateStudyConfig(nextConfig);
      if (errors.length) {
        setConfigErrors(errors);
        return;
      }

      setStudyConfig(nextConfig);
      setConfigErrors([]);
      resetRun();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown parsing error';
      setConfigErrors([`Could not parse the study JSON: ${message}`]);
    }
  };

  const restoreSample = () => {
    setDraftTitle(sampleTreeStudy.title);
    setDraftDescription(sampleTreeStudy.description);
    setDraftRootLabel(sampleTreeStudy.rootLabel);
    setDraftTreeJson(JSON.stringify(sampleTreeStudy.tree, null, 2));
    setDraftTasksJson(JSON.stringify(sampleTreeStudy.tasks, null, 2));
    setStudyConfig(sampleTreeStudy);
    setConfigErrors([]);
    resetRun();
  };

  const handleToggleExpansion = (node: TreeNode, parentId: string | null) => {
    if (pendingResult) {
      return;
    }

    const isExpanded = expandedNodeIds.includes(node.id);
    logEvent({
      actor: 'participant',
      eventType: isExpanded ? 'node_collapsed' : 'node_expanded',
      nodeId: node.id,
      parentId,
      payload: {
        label: node.label
      }
    });
    setExpandedNodeIds((previous) =>
      isExpanded ? previous.filter((id) => id !== node.id) : [...previous, node.id]
    );
  };

  const handleSelectNode = (node: TreeNode, parentId: string | null) => {
    if (pendingResult) {
      return;
    }

    setCurrentNodeId(node.id);
    setSteps((previous) => [...previous, node.id]);
    setFirstClickNodeId((previous) => previous ?? node.id);

    logEvent({
      actor: 'participant',
      eventType: 'node_clicked',
      nodeId: node.id,
      parentId,
      payload: {
        label: node.label,
        isFirstClick: firstClickNodeId === null
      }
    });
    logEvent({
      actor: 'participant',
      eventType: 'destination_selected',
      nodeId: node.id,
      parentId,
      payload: {
        label: node.label
      }
    });
  };

  const handleClearSelection = () => {
    setCurrentNodeId(null);
    logEvent({
      actor: 'participant',
      eventType: 'destination_cleared',
      nodeId: null
    });
  };

  const handleResetTask = () => {
    logEvent({
      actor: 'moderator',
      eventType: 'task_reset',
      nodeId: currentNodeId,
      payload: {
        previousSelection: currentNodeId,
        stepCount: steps.length
      }
    });
    clearTaskInputs();
    setStartedAt(Date.now());
    setNow(Date.now());
  };

  const handleSubmitAnswer = (selectedNodeId: string | null) => {
    if (!currentTask || pendingResult) {
      return;
    }

    const durationMs = Date.now() - startedAt;
    const result = evaluateTaskResult({
      tree: studyConfig.tree,
      task: currentTask,
      selectedNodeId,
      steps,
      firstClickNodeId,
      durationMs
    });

    setPendingResult(result);
    logEvent({
      actor: 'participant',
      eventType: 'answer_submitted',
      nodeId: selectedNodeId,
      payload: {
        durationMs,
        stepCount: steps.length
      }
    });
  };

  const handleConfidenceChange = (value: number) => {
    if (!pendingResult) {
      return;
    }

    setConfidence(value);
    logEvent({
      actor: 'participant',
      eventType: 'confidence_set',
      nodeId: pendingResult.selectedNodeId,
      payload: {
        value
      }
    });
  };

  const handleToggleTag = (tag: string) => {
    const exists = moderatorTags.includes(tag);
    logEvent({
      actor: 'moderator',
      eventType: exists ? 'tag_removed' : 'tag_added',
      nodeId: currentNodeId,
      payload: {
        tag
      }
    });
    setModeratorTags((previous) =>
      exists ? previous.filter((item) => item !== tag) : [...previous, tag]
    );
  };

  const handleCompleteTask = () => {
    if (!currentTask || !pendingResult || confidence === null) {
      return;
    }

    const finalResult = evaluateTaskResult({
      tree: studyConfig.tree,
      task: currentTask,
      selectedNodeId: pendingResult.selectedNodeId,
      steps,
      firstClickNodeId,
      durationMs: pendingResult.durationMs,
      confidence,
      rationale: rationale.trim(),
      moderatorNote: moderatorNote.trim(),
      moderatorTags
    });

    if (rationale.trim()) {
      logEvent({
        actor: 'participant',
        eventType: 'rationale_saved',
        nodeId: finalResult.selectedNodeId,
        payload: {
          charCount: rationale.trim().length
        }
      });
    }

    if (moderatorNote.trim() || moderatorTags.length > 0) {
      const note: ModeratorNote = {
        id: createId('note'),
        sessionId,
        taskId: currentTask.id,
        createdAt: new Date().toISOString(),
        text: moderatorNote.trim(),
        tags: moderatorTags
      };

      setModeratorNotes((previous) => [...previous, note]);
      logEvent({
        actor: 'moderator',
        eventType: 'moderator_note_added',
        nodeId: finalResult.selectedNodeId,
        payload: {
          noteId: note.id,
          tags: moderatorTags
        }
      });
    }

    logEvent({
      actor: 'system',
      eventType: 'task_completed',
      nodeId: finalResult.selectedNodeId,
      payload: {
        isCorrect: finalResult.isCorrect,
        wasDirect: finalResult.wasDirect,
        score: finalResult.score,
        durationMs: finalResult.durationMs
      }
    });

    setResults((previous) => [...previous, finalResult]);
    const nextTaskIndex = currentTaskIndex + 1;
    setCurrentTaskIndex(nextTaskIndex);
    clearTaskInputs();
    if (nextTaskIndex >= studyConfig.tasks.length) {
      setFlowStep('complete');
    }
  };

  const downloadJsonExport = () => {
    const payload = buildExportPayload({
      config: studyConfig,
      participantLabel,
      moderatorLabel,
      sessionId,
      results,
      events,
      notes: moderatorNotes
    });

    downloadFile(
      `${studyConfig.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'tree-test'}-session.json`,
      JSON.stringify(payload, null, 2),
      'application/json'
    );
  };

  const downloadResponsesCsv = () => {
    downloadFile(
      `${studyConfig.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'tree-test'}-responses.csv`,
      buildResponsesCsv({
        config: studyConfig,
        participantLabel,
        moderatorLabel,
        sessionId,
        results
      }),
      'text/csv;charset=utf-8'
    );
  };

  const downloadEventsCsv = () => {
    downloadFile(
      `${studyConfig.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'tree-test'}-events.csv`,
      buildEventsCsv(events),
      'text/csv;charset=utf-8'
    );
  };

  return (
    <Box className={`tree-testing-tool ${isLiveTaskMode ? 'tree-testing-tool--live' : ''}`}>
      <Box className="tree-testing-tool__shell">
        <section className={`tree-testing-tool__hero ${isLiveTaskMode ? 'tree-testing-tool__hero--compact' : ''}`}>
          <div>
            <p className="tree-testing-tool__eyebrow">Information Architecture Research</p>
            <h1 className="tree-testing-tool__hero-title">Moderated Tree Testing</h1>
            <p className="tree-testing-tool__hero-copy">
              {flowStep === 'intro'
                ? 'A guided tree-testing flow for moderated information architecture sessions.'
                : flowStep === 'instructions'
                  ? 'Review the task rules, then begin the moderated session.'
                  : isLiveTaskMode
                ? 'Live session mode keeps the prompt, tree, and moderator capture in focus.'
                : 'Run live, text-only tree tests for enterprise information architecture. The runner logs first click, full navigation path, moderator observations, and post-task confidence so each session is ready for analysis immediately.'}
            </p>
          </div>

          {!isLiveTaskMode && flowStep !== 'instructions' ? (
            <div className="tree-testing-tool__hero-stats">
              <div className="tree-testing-tool__hero-stat">
                <p className="tree-testing-tool__hero-stat-label">Study</p>
                <p className="tree-testing-tool__hero-stat-value">{studyConfig.title}</p>
                <p className="tree-testing-tool__hero-stat-helper">{studyConfig.tasks.length} moderated tasks</p>
              </div>
              <div className="tree-testing-tool__hero-stat">
                <p className="tree-testing-tool__hero-stat-label">Signal</p>
                <p className="tree-testing-tool__hero-stat-value">{formatPercent(summary.successRate)}</p>
                <p className="tree-testing-tool__hero-stat-helper">
                  {formatPercent(summary.firstClickAccuracyRate)} first-click accuracy
                </p>
              </div>
              <div className="tree-testing-tool__hero-stat">
                <p className="tree-testing-tool__hero-stat-label">Session</p>
                <p className="tree-testing-tool__hero-stat-value">{results.length}/{studyConfig.tasks.length}</p>
                <p className="tree-testing-tool__hero-stat-helper">
                  {events.length} events captured
                </p>
              </div>
            </div>
          ) : null}
        </section>

        <div className="tree-testing-tool__layout">
          <div className="tree-testing-tool__workspace">
            <Card className="tree-testing-tool__panel" elevation={0}>
              <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between">
                  <div>
                    <Typography variant="overline" sx={{ color: '#95caff', letterSpacing: '0.14em' }}>
                      Session Runner
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#fffdfb', mt: 1 }}>
                      {isFinished ? 'Session complete' : `Task ${currentTaskIndex + 1} of ${studyConfig.tasks.length}`}
                    </Typography>
                  </div>

                  <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
                    <Button variant="outlined" color="inherit" onClick={resetRun}>
                      Restart session
                    </Button>
                    {!isLiveTaskMode ? (
                      <>
                        <Button variant="outlined" color="inherit" onClick={downloadResponsesCsv} disabled={!results.length}>
                          Responses CSV
                        </Button>
                        <Button variant="outlined" color="inherit" onClick={downloadEventsCsv} disabled={!events.length}>
                          Events CSV
                        </Button>
                        <Button variant="contained" onClick={downloadJsonExport} disabled={!results.length}>
                          Session JSON
                        </Button>
                      </>
                    ) : null}
                  </Stack>
                </Stack>

                <Box sx={{ mt: 3 }}>
                  <LinearProgress
                    variant="determinate"
                    value={flowStep === 'session' || flowStep === 'complete' ? progressValue : 0}
                    sx={{
                      height: 10,
                      borderRadius: 999,
                      bgcolor: 'rgba(255,255,255,0.08)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 999,
                        background: 'linear-gradient(90deg, #95caff, #ffb700)'
                      }
                    }}
                  />
                </Box>

                {flowStep === 'intro' ? (
                  <div className="tree-testing-tool__stage-screen">
                    <div className="tree-testing-tool__stage-card tree-testing-tool__stage-card--primary">
                      <Typography variant="overline" sx={{ color: '#95caff', letterSpacing: '0.14em' }}>
                        Overview
                      </Typography>
                      <Typography variant="h3" sx={{ mt: 1.5, color: '#fffdfb' }}>
                        {studyConfig.title}
                      </Typography>
                      <Typography className="tree-testing-tool__stage-copy">
                        {studyConfig.description}
                      </Typography>

                      <div className="tree-testing-tool__summary-grid">
                        <div className="tree-testing-tool__detail-card">
                          <span className="tree-testing-tool__detail-label">Tasks</span>
                          <strong>{studyConfig.tasks.length}</strong>
                        </div>
                        <div className="tree-testing-tool__detail-card">
                          <span className="tree-testing-tool__detail-label">Nodes</span>
                          <strong>{treeStats.totalNodes}</strong>
                        </div>
                        <div className="tree-testing-tool__detail-card">
                          <span className="tree-testing-tool__detail-label">Leaf nodes</span>
                          <strong>{treeStats.leafNodes}</strong>
                        </div>
                      </div>

                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.25} sx={{ mt: 3 }}>
                        <Button variant="contained" onClick={() => setFlowStep('instructions')}>
                          Continue to instructions
                        </Button>
                      </Stack>
                    </div>

                    <div className="tree-testing-tool__stage-card">
                      <Typography variant="overline" sx={{ color: '#95caff', letterSpacing: '0.14em' }}>
                        Session setup
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 1, color: '#fffdfb' }}>
                        Moderator and participant details
                      </Typography>
                      <div className="tree-testing-tool__editor-grid" style={{ marginTop: 18 }}>
                        <TextField
                          label="Participant ID"
                          value={participantLabel}
                          onChange={(event) => setParticipantLabel(event.target.value)}
                          fullWidth
                          variant="filled"
                          sx={contrastFieldSx}
                        />
                        <TextField
                          label="Moderator"
                          value={moderatorLabel}
                          onChange={(event) => setModeratorLabel(event.target.value)}
                          fullWidth
                          variant="filled"
                          sx={contrastFieldSx}
                        />
                      </div>
                    </div>
                  </div>
                ) : flowStep === 'instructions' ? (
                  <div className="tree-testing-tool__stage-screen">
                    <div className="tree-testing-tool__stage-card tree-testing-tool__stage-card--primary">
                      <Typography variant="overline" sx={{ color: '#95caff', letterSpacing: '0.14em' }}>
                        Instructions
                      </Typography>
                      <Typography variant="h3" sx={{ mt: 1.5, color: '#fffdfb' }}>
                        How this moderated tree test works
                      </Typography>
                      <ol className="tree-testing-tool__instruction-list">
                        <li>Read one task at a time and focus only on the text hierarchy.</li>
                        <li>Expand branches and select the location you think best matches the task.</li>
                        <li>Submit your answer explicitly. Do not infer success from selection alone.</li>
                        <li>After submission, capture confidence and rationale before continuing.</li>
                      </ol>

                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.25} sx={{ mt: 3 }}>
                        <Button variant="outlined" color="inherit" onClick={() => setFlowStep('intro')}>
                          Back
                        </Button>
                        <Button variant="contained" onClick={() => setFlowStep('session')}>
                          Begin task 1
                        </Button>
                      </Stack>
                    </div>

                    <div className="tree-testing-tool__stage-card">
                      <Typography variant="overline" sx={{ color: '#95caff', letterSpacing: '0.14em' }}>
                        Active study
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 1, color: '#fffdfb' }}>
                        {studyConfig.title}
                      </Typography>
                      <Typography className="tree-testing-tool__stage-copy">
                        {studyConfig.tasks.length} tasks, {treeStats.totalNodes} nodes, root label: {studyConfig.rootLabel}.
                      </Typography>
                    </div>
                  </div>
                ) : !isFinished && currentTask ? (
                  <div className="tree-testing-tool__runner-grid">
                    <div className="tree-testing-tool__runner-main">
                      <section className="tree-testing-tool__runner-panel tree-testing-tool__runner-panel--brief">
                        <div className="tree-testing-tool__task-brief">
                          <div className="tree-testing-tool__task-copy">
                            <Typography variant="overline" sx={{ color: '#95caff', letterSpacing: '0.12em' }}>
                              Task Prompt
                            </Typography>
                            <Typography variant="h4" className="tree-testing-tool__task-title">
                              {currentTask.prompt}
                            </Typography>
                            <Typography className="tree-testing-tool__task-support">
                              Navigate the text-only tree, choose the place you believe is correct,
                              then submit your answer. Moderator capture happens after submission.
                            </Typography>
                            {currentTask.context ? (
                              <Typography className="tree-testing-tool__task-context">
                                {currentTask.context}
                              </Typography>
                            ) : null}
                          </div>

                          <div className="tree-testing-tool__detail-grid tree-testing-tool__detail-grid--brief">
                            <div className="tree-testing-tool__detail-card">
                              <span className="tree-testing-tool__detail-label">Elapsed</span>
                              <strong>{formatDuration(elapsedMs)}</strong>
                            </div>
                            <div className="tree-testing-tool__detail-card">
                              <span className="tree-testing-tool__detail-label">First click</span>
                              <strong>{firstClickNodeId ? findNodeById(studyConfig.tree, firstClickNodeId)?.label : 'Pending'}</strong>
                            </div>
                            <div className="tree-testing-tool__detail-card">
                              <span className="tree-testing-tool__detail-label">Selection</span>
                              <strong>{currentNode?.label ?? 'No destination selected'}</strong>
                            </div>
                          </div>
                        </div>

                      </section>

                      <section className="tree-testing-tool__runner-panel tree-testing-tool__runner-panel--tree">
                        <div className="tree-testing-tool__panel-heading">
                          <div>
                            <Typography variant="overline" sx={{ color: '#95caff', letterSpacing: '0.12em' }}>
                              Tree Navigation
                            </Typography>
                            <Typography className="tree-testing-tool__panel-copy">
                              Expand branches, compare sibling labels, and select the destination that best matches the task.
                            </Typography>
                          </div>
                        </div>

                        <div className="tree-testing-tool__tree">
                          {studyConfig.tree.map((node) => (
                            <TreeNodeItem
                              key={node.id}
                              node={node}
                              depth={0}
                              expandedNodeIds={expandedNodeIds}
                              selectedNodeId={currentNodeId}
                              disabled={pendingResult !== null}
                              onToggle={handleToggleExpansion}
                              onSelect={handleSelectNode}
                            />
                          ))}
                        </div>
                      </section>

                      <section className="tree-testing-tool__action-dock" aria-label="Task actions">
                        <div className="tree-testing-tool__action-dock-path">
                          <Typography variant="subtitle2" sx={{ color: '#95caff', textTransform: 'uppercase' }}>
                            Selected path
                          </Typography>
                          <div className="tree-testing-tool__breadcrumb">
                            <Chip
                              label={studyConfig.rootLabel}
                              onClick={handleClearSelection}
                              className="tree-testing-tool__step-pill"
                            />
                            {currentPath.map((node) => (
                              <Chip
                                key={node.id}
                                label={node.label}
                                onClick={() => handleSelectNode(node, null)}
                                className="tree-testing-tool__step-pill"
                              />
                            ))}
                          </div>
                        </div>

                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.25} className="tree-testing-tool__task-actions">
                          <Button
                            variant="contained"
                            onClick={() => handleSubmitAnswer(currentNodeId)}
                            disabled={currentNodeId === null || pendingResult !== null}
                          >
                            Submit answer
                          </Button>
                          <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => handleSubmitAnswer(null)}
                            disabled={pendingResult !== null}
                          >
                            Can’t find it
                          </Button>
                          <Button variant="text" color="inherit" onClick={handleResetTask}>
                            Reset task
                          </Button>
                        </Stack>
                      </section>
                    </div>

                    <section className="tree-testing-tool__runner-panel tree-testing-tool__runner-panel--moderator">
                      <Typography variant="overline" sx={{ color: '#95caff', letterSpacing: '0.12em' }}>
                        Moderator capture
                      </Typography>

                      {pendingResult ? (
                        <Alert
                          severity={pendingResult.isCorrect ? 'success' : 'warning'}
                          sx={{
                            mt: 1.5,
                            bgcolor: pendingResult.isCorrect ? 'rgba(100, 188, 48, 0.12)' : 'rgba(255, 183, 0, 0.12)',
                            color: '#fffdfb',
                            border: '1px solid rgba(255,255,255,0.12)'
                          }}
                        >
                          {pendingResult.isCorrect ? 'Answer submitted. Capture confidence and rationale before moving on.' : 'Incorrect or unresolved answer submitted. Capture why, then continue.'}
                        </Alert>
                      ) : (
                        <Alert
                          severity="info"
                          sx={{
                            mt: 1.5,
                            bgcolor: 'rgba(149, 202, 255, 0.12)',
                            color: '#eef7ff',
                            border: '1px solid rgba(149, 202, 255, 0.22)'
                          }}
                        >
                          Moderator notes and observation tags can be captured during the task. Confidence is required after answer submission.
                        </Alert>
                      )}

                      <div className="tree-testing-tool__moderator-block">
                        <Typography variant="subtitle2" sx={{ color: '#95caff', textTransform: 'uppercase' }}>
                          Observation tags
                        </Typography>
                        <div className="tree-testing-tool__tag-list">
                          {MODERATOR_TAGS.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              className={[
                                'tree-testing-tool__tag-button',
                                moderatorTags.includes(tag) ? 'tree-testing-tool__tag-button--active' : ''
                              ].join(' ')}
                              onClick={() => handleToggleTag(tag)}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      <TextField
                        label="Moderator notes"
                        value={moderatorNote}
                        onChange={(event) => setModeratorNote(event.target.value)}
                        fullWidth
                        multiline
                        minRows={5}
                        variant="filled"
                        sx={{ ...contrastFieldSx, mt: 2.25 }}
                      />

                      <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,0.08)' }} />

                      <Typography variant="subtitle2" sx={{ color: '#95caff', textTransform: 'uppercase' }}>
                        Post-task capture
                      </Typography>
                      <div className="tree-testing-tool__confidence-group">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            className={[
                              'tree-testing-tool__confidence-button',
                              confidence === value ? 'tree-testing-tool__confidence-button--active' : ''
                            ].join(' ')}
                            onClick={() => handleConfidenceChange(value)}
                            disabled={!pendingResult}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                      <Typography sx={{ mt: 1, color: 'rgba(246, 239, 231, 0.68)', fontSize: '0.92rem' }}>
                        1 = low confidence, 5 = very confident
                      </Typography>

                      <TextField
                        label="Participant rationale"
                        value={rationale}
                        onChange={(event) => setRationale(event.target.value)}
                        fullWidth
                        multiline
                        minRows={4}
                        variant="filled"
                        disabled={!pendingResult}
                        sx={{ ...contrastFieldSx, mt: 2.25 }}
                      />

                      {pendingResult ? (
                        <div className="tree-testing-tool__pending-summary">
                          <div className="tree-testing-tool__detail-card">
                            <span className="tree-testing-tool__detail-label">Outcome</span>
                            <strong>{pendingResult.status.replace('-', ' ')}</strong>
                          </div>
                          <div className="tree-testing-tool__detail-card">
                            <span className="tree-testing-tool__detail-label">Backtracks</span>
                            <strong>{pendingResult.backtrackCount}</strong>
                          </div>
                          <div className="tree-testing-tool__detail-card">
                            <span className="tree-testing-tool__detail-label">Score</span>
                            <strong>{pendingResult.score}</strong>
                          </div>
                        </div>
                      ) : null}

                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.25} sx={{ mt: 2.5 }}>
                        <Button
                          variant="contained"
                          onClick={handleCompleteTask}
                          disabled={!pendingResult || confidence === null}
                        >
                          Save and next task
                        </Button>
                      </Stack>
                    </section>
                  </div>
                ) : (
                  <div className="tree-testing-tool__finish">
                    <Alert
                      severity="success"
                      sx={{
                        bgcolor: 'rgba(100, 188, 48, 0.12)',
                        color: '#eefae8',
                        border: '1px solid rgba(100, 188, 48, 0.2)',
                        '& .MuiAlert-icon': { color: '#8dcc92' }
                      }}
                    >
                      The moderated session is complete. Review results below or export the responses
                      and event log.
                    </Alert>

                    <div className="tree-testing-tool__summary-grid">
                      <div className="tree-testing-tool__detail-card tree-testing-tool__detail-card--strong">
                        <span className="tree-testing-tool__detail-label">Success</span>
                        <strong>{formatPercent(summary.successRate)}</strong>
                      </div>
                      <div className="tree-testing-tool__detail-card tree-testing-tool__detail-card--strong">
                        <span className="tree-testing-tool__detail-label">First-click</span>
                        <strong>{formatPercent(summary.firstClickAccuracyRate)}</strong>
                      </div>
                      <div className="tree-testing-tool__detail-card tree-testing-tool__detail-card--strong">
                        <span className="tree-testing-tool__detail-label">Avg. confidence</span>
                        <strong>{summary.averageConfidence.toFixed(1)}</strong>
                      </div>
                      <div className="tree-testing-tool__detail-card tree-testing-tool__detail-card--strong">
                        <span className="tree-testing-tool__detail-label">Avg. score</span>
                        <strong>{summary.averageScore.toFixed(0)}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {!isLiveTaskMode ? (
              <Card className="tree-testing-tool__panel" elevation={0}>
                <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                  <Typography variant="overline" sx={{ color: '#95caff', letterSpacing: '0.14em' }}>
                    Task Results
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1, color: '#fffdfb' }}>
                    Response log
                  </Typography>

                  {!results.length ? (
                    <div className="tree-testing-tool__empty-state" style={{ marginTop: 20 }}>
                      No completed responses yet. The log will fill as each task is submitted and saved.
                    </div>
                  ) : (
                    <div className="tree-testing-tool__result-list">
                      {results.map((result, index) => (
                        <div key={result.taskId} className="tree-testing-tool__result-card">
                          <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={1.5}
                            justifyContent="space-between"
                            alignItems={{ xs: 'flex-start', md: 'center' }}
                          >
                            <div>
                              <Typography variant="subtitle1" sx={{ color: '#fffdfb', fontWeight: 700 }}>
                                Task {index + 1}
                              </Typography>
                              <Typography sx={{ color: 'rgba(246, 239, 231, 0.8)', mt: 0.5 }}>
                                {result.prompt}
                              </Typography>
                            </div>
                            <Chip
                              label={result.status.replace('-', ' ')}
                              color={getStatusTone(result.status)}
                              size="small"
                            />
                          </Stack>

                          <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.08)' }} />

                          <Typography className="tree-testing-tool__result-path">
                            Expected: {getPathLabels(studyConfig.tree, result.expectedPath).join(' / ')}
                          </Typography>
                          <Typography className="tree-testing-tool__result-path">
                            Selected:{' '}
                            {result.selectedNodeId
                              ? getPathLabels(studyConfig.tree, result.selectedPath).join(' / ')
                              : 'Participant could not place the item'}
                          </Typography>
                          <Typography className="tree-testing-tool__result-path">
                            First click:{' '}
                            {result.firstClickNodeId ? findNodeById(studyConfig.tree, result.firstClickNodeId)?.label : 'No click'}
                          </Typography>
                          <Typography className="tree-testing-tool__result-path">
                            Steps:{' '}
                            {getPathLabels(
                              studyConfig.tree,
                              result.steps.filter((step) => step !== ROOT_STEP_ID)
                            ).join(' / ') || 'No steps recorded'}
                          </Typography>
                          <Typography className="tree-testing-tool__result-path">
                            Score: {result.score} | Time: {formatDuration(result.durationMs)} | Backtracks: {result.backtrackCount} | Confidence: {result.confidence ?? '—'}
                          </Typography>
                          {result.moderatorTags.length > 0 ? (
                            <Typography className="tree-testing-tool__result-path">
                              Tags: {result.moderatorTags.join(', ')}
                            </Typography>
                          ) : null}
                          {result.rationale ? (
                            <Typography className="tree-testing-tool__result-path">
                              Rationale: {result.rationale}
                            </Typography>
                          ) : null}
                          {result.moderatorNote ? (
                            <Typography className="tree-testing-tool__result-path">
                              Moderator note: {result.moderatorNote}
                            </Typography>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : null}
          </div>

          {!isLiveTaskMode ? (
            <div className="tree-testing-tool__sticky-column">
            <Card className="tree-testing-tool__panel" elevation={0}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <div className="tree-testing-tool__section-header">
                  <div>
                    <Typography variant="overline" sx={{ color: '#95caff', letterSpacing: '0.14em' }}>
                      Study Setup
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, color: '#fffdfb' }}>
                      Configure the moderated study
                    </Typography>
                  </div>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => setIsSetupOpen((open) => !open)}
                    aria-expanded={isSetupOpen}
                  >
                    {isSetupOpen ? 'Hide setup' : 'Show setup'}
                  </Button>
                </div>

                <Collapse in={isSetupOpen}>
                  <div className="tree-testing-tool__editor-grid" style={{ marginTop: 18 }}>
                    <TextField
                      label="Study title"
                      value={draftTitle}
                      onChange={(event) => setDraftTitle(event.target.value)}
                      fullWidth
                      variant="filled"
                      sx={contrastFieldSx}
                    />
                    <TextField
                      label="Participant ID"
                      value={participantLabel}
                      onChange={(event) => setParticipantLabel(event.target.value)}
                      fullWidth
                      variant="filled"
                      sx={contrastFieldSx}
                    />
                    <TextField
                      label="Moderator"
                      value={moderatorLabel}
                      onChange={(event) => setModeratorLabel(event.target.value)}
                      fullWidth
                      variant="filled"
                      sx={contrastFieldSx}
                    />
                    <TextField
                      label="Root label"
                      value={draftRootLabel}
                      onChange={(event) => setDraftRootLabel(event.target.value)}
                      fullWidth
                      variant="filled"
                      sx={contrastFieldSx}
                    />
                    <TextField
                      label="Study description"
                      value={draftDescription}
                      onChange={(event) => setDraftDescription(event.target.value)}
                      fullWidth
                      multiline
                      minRows={4}
                      variant="filled"
                      sx={contrastFieldSx}
                    />
                    <TextField
                      label="Tree JSON"
                      value={draftTreeJson}
                      onChange={(event) => setDraftTreeJson(event.target.value)}
                      fullWidth
                      multiline
                      minRows={12}
                      variant="filled"
                      sx={contrastFieldSx}
                    />
                    <TextField
                      label="Tasks JSON"
                      value={draftTasksJson}
                      onChange={(event) => setDraftTasksJson(event.target.value)}
                      fullWidth
                      multiline
                      minRows={12}
                      variant="filled"
                      sx={contrastFieldSx}
                    />
                  </div>

                  <Stack direction="row" spacing={1.25} sx={{ mt: 2.5 }}>
                    <Button variant="contained" onClick={applyDraftConfig}>
                      Apply config
                    </Button>
                    <Button variant="outlined" color="inherit" onClick={restoreSample}>
                      Load sample
                    </Button>
                  </Stack>

                  {configErrors.length > 0 ? (
                    <Alert
                      severity="error"
                      sx={{
                        mt: 2,
                        bgcolor: 'rgba(229, 62, 62, 0.12)',
                        color: '#fff0f0',
                        border: '1px solid rgba(229, 62, 62, 0.24)',
                        '& .MuiAlert-icon': { color: '#ff8585' }
                      }}
                    >
                      {configErrors.join(' ')}
                    </Alert>
                  ) : null}

                  <Typography className="tree-testing-tool__export-note">
                    Keep participant-facing labels short and literal. Use `acceptableNodeIds` only when
                    you truly want more than one endpoint to count as success.
                  </Typography>
                </Collapse>
              </CardContent>
            </Card>

            <Card className="tree-testing-tool__panel" elevation={0}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography variant="overline" sx={{ color: '#95caff', letterSpacing: '0.14em' }}>
                  Readout
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, color: '#fffdfb' }}>
                  Live session diagnostics
                </Typography>

                <Stack spacing={1.35} sx={{ mt: 2 }}>
                  <Typography sx={{ color: 'rgba(246, 239, 231, 0.8)' }}>
                    Session ID: <strong>{sessionId}</strong>
                  </Typography>
                  <Typography sx={{ color: 'rgba(246, 239, 231, 0.8)' }}>
                    Nodes: <strong>{treeStats.totalNodes}</strong>
                  </Typography>
                  <Typography sx={{ color: 'rgba(246, 239, 231, 0.8)' }}>
                    Events: <strong>{events.length}</strong>
                  </Typography>
                  <Typography sx={{ color: 'rgba(246, 239, 231, 0.8)' }}>
                    Avg. score: <strong>{summary.averageScore.toFixed(0)}</strong>
                  </Typography>
                  <Typography sx={{ color: 'rgba(246, 239, 231, 0.8)' }}>
                    Avg. confidence: <strong>{summary.averageConfidence.toFixed(1)}</strong>
                  </Typography>
                </Stack>

                {currentTask ? (
                  <>
                    <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,0.08)' }} />
                    <Typography variant="subtitle2" sx={{ color: '#95caff', textTransform: 'uppercase' }}>
                      Moderator answer key
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'rgba(246, 239, 231, 0.8)', lineHeight: 1.7 }}>
                      {expectedPathLabels.join(' / ')}
                    </Typography>
                  </>
                ) : null}
              </CardContent>
            </Card>
            </div>
          ) : null}
        </div>
      </Box>
    </Box>
  );
}
