import { config } from 'dotenv';
import { join } from 'node:path';
config({ path: join(process.cwd(), '../../.env') });

import { testCases } from './test-cases';
import { evaluateResponse, summarizeResults, type EvalResult } from './metrics';
import { loadDocs, retrieve } from '../rag/retriever';
import { composeAIAnswer } from '../tools/ai-answer';
import { AppConfig } from '../config/app';

async function runEvals() {
  console.debug('🧪 Running AI Assistant Evaluations...\n');
  console.debug(`Testing ${testCases.length} cases\n`);

  // Load documents
  const docs = loadDocs(join(process.cwd(), AppConfig.docsDir));
  console.debug(`📚 Loaded ${docs.length} documents\n`);

  const results: EvalResult[] = [];
  const startTime = Date.now();

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    process.stdout.write(`[${i + 1}/${testCases.length}] Testing: "${testCase.question}"...`);

    const questionStartTime = Date.now();
    
    try {
      // Run the query
      const hits = retrieve(testCase.question, docs, 3);
      const answer = await composeAIAnswer(testCase.question, hits);
      const latencyMs = Date.now() - questionStartTime;

      // Evaluate
      const result = evaluateResponse(testCase, {
        text: answer.text,
        citations: answer.citations,
        latencyMs,
      });

      results.push(result);
      
      const status = result.metrics.passed ? '✅' : '❌';
      console.debug(` ${status} (${latencyMs}ms)`);
    } catch (error) {
      console.debug(` ❌ ERROR`);
      console.error(error);
      // Create a failed result
      results.push(
        evaluateResponse(testCase, {
          text: 'Error occurred',
          citations: [],
          latencyMs: Date.now() - questionStartTime,
        })
      );
    }
  }

  const totalTime = Date.now() - startTime;

  // Print summary
  console.debug('\n' + '='.repeat(60));
  console.debug('📊 EVALUATION SUMMARY');
  console.debug('='.repeat(60) + '\n');

  const summary = summarizeResults(results);
  
  console.debug(`Total Tests:     ${summary.total}`);
  console.debug(`Passed:          ${summary.passed} (${summary.passRate})`);
  console.debug(`Failed:          ${summary.failed}`);
  console.debug();
  console.debug(`Avg Latency:     ${summary.latency.avg}ms`);
  console.debug(`Min Latency:     ${summary.latency.min}ms`);
  console.debug(`Max Latency:     ${summary.latency.max}ms`);
  console.debug();
  console.debug(`Avg Topic Coverage: ${summary.avgTopicCoverage}`);
  console.debug(`Avg Citations:      ${summary.avgCitations}`);
  console.debug();

  console.debug('Results by Category:');
  Object.entries(summary.byCategory).forEach(([cat, stats]) => {
    const rate = ((stats.passed / stats.total) * 100).toFixed(0);
    console.debug(`  ${cat}: ${stats.passed}/${stats.total} (${rate}%)`);
  });

  console.debug();
  console.debug(`Total Time: ${(totalTime / 1000).toFixed(1)}s`);
  console.debug('='.repeat(60) + '\n');

  // Print failed test details
  const failed = results.filter(r => !r.metrics.passed);
  if (failed.length > 0) {
    console.debug('❌ FAILED TESTS:\n');
    failed.forEach((result, idx) => {
      console.debug(`${idx + 1}. "${result.testCase.question}"`);
      console.debug(`   Category: ${result.testCase.category}`);
      console.debug(`   Topic Coverage: ${(result.metrics.topicCoverage * 100).toFixed(0)}%`);
      console.debug(`   Citations: ${result.metrics.citationCount}`);
      console.debug(`   Latency: ${result.metrics.latencyMs}ms`);
      console.debug();
    });
  }

  // Exit with appropriate code
  process.exit(summary.passed === summary.total ? 0 : 1);
}

runEvals().catch(err => {
  console.error('Fatal error running evals:', err);
  process.exit(1);
});
