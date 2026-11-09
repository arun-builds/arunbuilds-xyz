export type Project = {
    title: string;
    description: string;
    href: string;
    tech: string[];
    highlights: string[];
};

export const projects: Project[] = [
    {
        title: "Exchange Backend",
        description:
            "A multi-process crypto exchange backend with a lock-free matching engine, real-time market data over WebSockets, and a TimescaleDB time-series pipeline.",
        href: "https://github.com/arun-builds/exchange-backend",
        tech: ["Go", "Gin", "Redis", "TimescaleDB", "WebSockets", "sqlc"],
        highlights: [
            "Architected a multi-process exchange backend, decoupling the stateless Gin API, matching engine, DB writer, and WebSocket gateway via Redis queues (LPUSH/BRPOP) and pub/sub with an 8s/10s timeout.",
            "Engineered a single-threaded, lock-free in-memory matching engine, serializing limit orders for deterministic partial fills, fund locking with price-improvement refunds, and 3s state snapshotting.",
            "Built a real-time WebSocket gateway (gorilla/websocket) with O(1) topic fan-out, using a reference-counted subscription manager to multiplex clients over one Redis subscription per channel.",
            "Designed a time-series pipeline using TimescaleDB (pgx/v5, sqlc, goose), ingesting trades into hypertables and refreshing 1m, 1h, and 1w OHLCV materialized views every 10s for /klines.",
        ],
    },
    {
        title: "Workflow Automation Engine",
        description:
            "A three-service automation platform with a DAG execution engine, conditional branching, and a visual React Flow editor.",
        href: "https://github.com/arun-builds/ottoflow",
        tech: ["Go", "React", "TypeScript", "PostgreSQL", "Redis Streams"],
        highlights: [
            "Architected a 3-service workflow platform (api, webhook, worker), decoupling HTTP 202 ingress from async execution via Redis Streams consumer groups (XADD/XREADGROUP/XACK).",
            "Engineered a DAG execution engine in Go using BFS traversal with visited-set deduplication, conditional branching (main/true/false), and dynamic {{path}} state interpolation.",
            "Designed a pluggable node runtime via the strategy/registry pattern across 5 handlers (webhook, if/else, HTTP, SMTP, log), persisting JSONB graphs in PostgreSQL.",
            "Built a two-level execution audit pipeline and React Flow editor, recording per-run and per-node JSONB input/output payloads, errors, and step timings.",
        ],
    },
    {
        title: "RESP Key-Value Store",
        description:
            "A concurrent in-memory Redis clone written from scratch in Go, featuring RESP parsing, AOF persistence, and kqueue-based I/O multiplexing.",
        href: "https://github.com/arun-builds/redis-scratch",
        tech: ["Go", "TCP", "RESP", "Concurrency"],
        highlights: [
            "Built a concurrent in-memory key-value store from scratch in Go with a custom wire parser and serializer for the Redis Serialization Protocol (RESP).",
            "Implemented core commands (GET, SET, DEL, EXPIRE, TTL, INCR, PING) along with pipelined command processing to minimize network round-trips.",
            "Added Append-Only File (AOF) persistence, graceful shutdown, and active/passive key expiration with multiple eviction strategies including approximated LRU.",
            "Implemented non-blocking connection handling using OS-level kqueue I/O multiplexing to serve concurrent TCP clients without per-connection thread overhead.",
        ],
    },
    {
        title: "HTTP/1.1 Server",
        description:
            "An RFC-compliant HTTP/1.1 server built directly on raw TCP sockets, with a streaming state-machine parser and chunked transfer support.",
        href: "https://github.com/arun-builds/httpfromtcp",
        tech: ["Go", "TCP"],
        highlights: [
            "Built an RFC-compliant HTTP/1.1 server directly over raw TCP sockets in Go without relying on net/http, managing connection lifecycles and keep-alive streams.",
            "Implemented a state-machine streaming parser for request lines, headers, and bodies, verified by protocol-level unit tests across arbitrary byte boundaries.",
            "Added routing abstractions, handler registration, chunked transfer encoding, and trailer headers for extensible streaming request processing.",
        ],
    },
];
