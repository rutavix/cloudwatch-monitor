# cloudwatch-monitor

A compact monitoring service that exposes raw and summarized metrics.

## Features

- health endpoint for service checks
- raw metric feed endpoint
- summary endpoint with latency/error aggregates

## Endpoints

- `GET /health`
- `GET /metrics/raw`
- `GET /metrics/summary`

## Run

```bash
npm start
```

## Test

```bash
npm test
```
