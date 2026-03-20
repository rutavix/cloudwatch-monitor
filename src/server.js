const http = require('http');
const fs = require('fs');
const path = require('path');
const { summarize } = require('./metricsService');

const metricsPath = path.join(__dirname, '..', 'data', 'metrics.sample.json');

function json(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function loadMetrics() {
  const raw = fs.readFileSync(metricsPath, 'utf8');
  return JSON.parse(raw);
}

function createServer() {
  return http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/health') {
      json(res, 200, { status: 'ok' });
      return;
    }

    if (req.method === 'GET' && req.url === '/metrics/raw') {
      json(res, 200, { data: loadMetrics() });
      return;
    }

    if (req.method === 'GET' && req.url === '/metrics/summary') {
      const summary = summarize(loadMetrics());
      json(res, 200, { data: summary });
      return;
    }

    json(res, 404, { error: 'Route not found' });
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3001);
  createServer().listen(port, () => {
    console.log(`cloudwatch-monitor listening on http://localhost:${port}`);
  });
}

module.exports = { createServer };
