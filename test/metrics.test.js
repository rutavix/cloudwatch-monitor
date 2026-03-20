const test = require('node:test');
const assert = require('node:assert/strict');
const { summarize } = require('../src/metricsService');

test('summarize returns expected aggregate metrics', () => {
  const result = summarize([
    { latencyMs: 100, errorRate: 0.005 },
    { latencyMs: 200, errorRate: 0.01 },
    { latencyMs: 300, errorRate: 0.02 }
  ]);

  assert.equal(result.samples, 3);
  assert.equal(result.avgLatencyMs, 200);
  assert.equal(result.maxLatencyMs, 300);
  assert.equal(result.avgErrorRate, 0.0117);
  assert.equal(result.healthy, true);
});
