function summarize(metrics) {
  const latencyValues = metrics.map((item) => item.latencyMs);
  const errorRateValues = metrics.map((item) => item.errorRate);

  const avgLatencyMs = latencyValues.reduce((sum, value) => sum + value, 0) / latencyValues.length;
  const maxLatencyMs = Math.max(...latencyValues);
  const avgErrorRate = errorRateValues.reduce((sum, value) => sum + value, 0) / errorRateValues.length;

  return {
    samples: metrics.length,
    avgLatencyMs: Number(avgLatencyMs.toFixed(2)),
    maxLatencyMs,
    avgErrorRate: Number(avgErrorRate.toFixed(4)),
    healthy: avgLatencyMs < 250 && avgErrorRate < 0.02
  };
}

module.exports = { summarize };
