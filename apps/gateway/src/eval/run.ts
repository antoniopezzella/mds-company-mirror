import { config } from 'dotenv';
import { join } from 'node:path';
config({ path: join(process.cwd(), '../../.env') });

import { testCases } from './test-cases';
import { evaluateResponse, summarizeResults, type EvalResult } from './metrics';
import { loadDocs, retrieve } from '../rag/retriever';
import { composeAIAnswer } from '../tools/ai-answer';
import { AppConfig } from '../config/app';

async function runEvals() {
  console.log('🧪 Running AI Assistant Evaluations...\n');
  console.log(`Testing ${testCases.length} cases\n`);

  // Load documents
  const docs = loadDocs(join(process.cwd(), AppConfig.docsDir));
  console.log(`📚 Loaded ${docs.length} documents\n`);

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
      console.log(` ${status} (${latencyMs}ms)`);
    } catch (error) {
      console.log(` ❌ ERROR`);
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
  console.log('\n' + '='.repeat(60));
  console.log('📊 EVALUATION SUMMARY');
  console.log('='.repeat(60) + '\n');

  const summary = summarizeResults(results);
  
  console.log(`Total Tests:     ${summary.total}`);
  console.log(`Passed:          ${summary.passed} (${summary.passRate})`);
  console.log(`Failed:          ${summary.failed}`);
  console.log();
  console.log(`Avg Latency:     ${summary.latency.avg}ms`);
  console.log(`Min Latency:     ${summary.latency.min}ms`);
  console.log(`Max Latency:     ${summary.latency.max}ms`);
  console.log();
  console.log(`Avg Topic Coverage: ${summary.avgTopicCoverage}`);
  console.log(`Avg Citations:      ${summary.avgCitations}`);
  console.log();

  console.log('Results by Category:');
  Object.entries(summary.byCategory).forEach(([cat, stats]) => {
    const rate = ((stats.passed / stats.total) * 100).toFixed(0);
    console.log(`  ${cat}: ${stats.passed}/${stats.total} (${rate}%)`);
  });

  console.log();
  console.log(`Total Time: ${(totalTime / 1000).toFixed(1)}s`);
  console.log('='.repeat(60) + '\n');

  // Print failed test details
  const failed = results.filter(r => !r.metrics.passed);
  if (failed.length > 0) {
    console.log('❌ FAILED TESTS:\n');
    failed.forEach((result, idx) => {
      console.log(`${idx + 1}. "${result.testCase.question}"`);
      console.log(`   Category: ${result.testCase.category}`);
      console.log(`   Topic Coverage: ${(result.metrics.topicCoverage * 100).toFixed(0)}%`);
      console.log(`   Citations: ${result.metrics.citationCount}`);
      console.log(`   Latency: ${result.metrics.latencyMs}ms`);
      console.log();
    });
  }

  // Exit with appropriate code
  process.exit(summary.passed === summary.total ? 0 : 1);
}

runEvals().catch(err => {
  console.error('Fatal error running evals:', err);
  process.exit(1);
});
