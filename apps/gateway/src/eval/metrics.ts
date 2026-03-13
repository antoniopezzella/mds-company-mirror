import type { TestCase } from './test-cases';

export type EvalResult = {
  testCase: TestCase;
  response: {
    text: string;
    citations: { title: string; url: string }[];
    latencyMs: number;
  };
  metrics: {
    hasCitations: boolean;
    citationCount: number;
    topicCoverage: number; // 0-1: % of expected topics found
    responseLength: number;
    latencyMs: number;
    passed: boolean;
  };
};

/**
 * Evaluate a single response against a test case
 */
export function evaluateResponse(
  testCase: TestCase,
  response: { text: string; citations: { title: string; url: string }[]; latencyMs: number }
): EvalResult {
  const text = response.text.toLowerCase();
  
  // Check citation requirements
  const hasCitations = response.citations.length > 0;
  const citationCount = response.citations.length;

  // Calculate topic coverage
  const topicsFound = testCase.expectedTopics.filter(topic => 
    text.includes(topic.toLowerCase())
  );
  const topicCoverage = testCase.expectedTopics.length > 0 
    ? topicsFound.length / testCase.expectedTopics.length 
    : 1;

  // Determine if test passed
  const citationCheck = testCase.shouldHaveCitations ? hasCitations : true;
  const topicCheck = topicCoverage >= 0.5; // At least 50% of topics covered
  const latencyCheck = response.latencyMs < 5000; // Under 5 seconds
  const passed = citationCheck && topicCheck && latencyCheck;

  return {
    testCase,
    response,
    metrics: {
      hasCitations,
      citationCount,
      topicCoverage,
      responseLength: response.text.length,
      latencyMs: response.latencyMs,
      passed,
    },
  };
}

/**
 * Generate summary statistics from eval results
 */
export function summarizeResults(results: EvalResult[]) {
  const total = results.length;
  const passed = results.filter(r => r.metrics.passed).length;
  const passRate = (passed / total) * 100;

  const avgLatency = results.reduce((sum, r) => sum + r.metrics.latencyMs, 0) / total;
  const maxLatency = Math.max(...results.map(r => r.metrics.latencyMs));
  const minLatency = Math.min(...results.map(r => r.metrics.latencyMs));

  const avgTopicCoverage = results.reduce((sum, r) => sum + r.metrics.topicCoverage, 0) / total;
  const avgCitations = results.reduce((sum, r) => sum + r.metrics.citationCount, 0) / total;

  const byCategory = results.reduce((acc, r) => {
    const cat = r.testCase.category;
    if (!acc[cat]) acc[cat] = { total: 0, passed: 0 };
    acc[cat].total++;
    if (r.metrics.passed) acc[cat].passed++;
    return acc;
  }, {} as Record<string, { total: number; passed: number }>);

  return {
    total,
    passed,
    failed: total - passed,
    passRate: passRate.toFixed(1) + '%',
    latency: {
      avg: Math.round(avgLatency),
      min: Math.round(minLatency),
      max: Math.round(maxLatency),
    },
    avgTopicCoverage: (avgTopicCoverage * 100).toFixed(1) + '%',
    avgCitations: avgCitations.toFixed(1),
    byCategory,
  };
}
