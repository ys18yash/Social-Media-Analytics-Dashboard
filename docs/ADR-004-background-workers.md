# ADR-004 — Redis Cache-Aside Strategy

**Status:** Accepted

**Date:** 2026-XX-XX

---

# Context

The dashboard is a read-heavy application.

Users repeatedly request the same analytics:

- follower counts
- engagement rates
- growth trends
- dashboard summaries
- platform statistics

Querying PostgreSQL and recomputing analytics for every request would unnecessarily increase:

- database load
- request latency
- infrastructure cost

A caching strategy was required.

---

# Decision

The platform adopts the **Cache-Aside Pattern** using Redis.

Analytics are first retrieved from Redis.

Only when cached data is unavailable does the API retrieve analytics from PostgreSQL.

The cache is refreshed by the analytics pipeline after new metrics are computed.

Redis is treated as a disposable performance layer rather than a persistent datastore.

---

# Architectural View

```text
              Dashboard Request
                      │
                      ▼
                 Express API
                      │
              Check Redis Cache
              ┌────────┴────────┐
              │                 │
         Cache Hit         Cache Miss
              │                 │
              ▼                 ▼
       Return Metrics      PostgreSQL
                                │
                                ▼
                         Refresh Redis
                                │
                                ▼
                         Return Response
```

---

# Rationale

## Low Request Latency

Frequently requested analytics are served directly from memory.

This minimizes response time and improves the perceived responsiveness of the dashboard.

---

## Reduced Database Load

Repeated requests no longer execute identical SQL queries.

PostgreSQL remains focused on persistence rather than serving every read operation.

---

## Separation of Responsibilities

PostgreSQL stores data.

Redis accelerates access to data.

Neither system attempts to perform the other's responsibility.

---

## Scalability

As dashboard traffic increases, Redis absorbs a significant portion of read requests.

This allows database resources to scale according to write and analytical workloads instead of user traffic.

---

# Consequences

## Positive

- Faster dashboard responses
- Lower database utilization
- Better horizontal scalability
- Improved user experience
- Simple recovery from cache failures

---

## Negative

- Cache invalidation becomes an operational concern.
- Cached analytics may temporarily lag behind newly processed data.
- Additional infrastructure is required.

These trade-offs are acceptable because analytics dashboards prioritize fast, consistent responses over real-time recomputation.

---

# Alternatives Considered

## Database-Only Reads

Rejected.

Every dashboard request would repeatedly execute similar queries, increasing latency and database load.

---

## Write-Through Cache

Considered.

However, analytics are generated asynchronously rather than during every write operation.

Refreshing the cache after aggregation better aligns with the system's processing pipeline.

---

## Client-Side Caching

Rejected.

Caching analytics within the browser creates inconsistent views across users and shifts cache invalidation responsibilities to client applications.

Keeping caching centralized within Redis maintains consistency across all consumers.

---

# Related Decisions

- ADR-003 — PostgreSQL as the System of Record
- ADR-005 — Queue-Based Background Processing
- ADR-009 — Asynchronous Analytics Pipeline
- ADR-010 — Separation of Request Path and Analytics Path

---

# Summary

Redis implements a cache-aside strategy that allows the API to serve frequently requested analytics with minimal latency while preserving PostgreSQL as the authoritative source of data. By treating the cache as an optimization rather than a dependency, the platform improves performance without compromising correctness or recoverability.
