# Control Room TypeScript SDK

TypeScript client for the [Control Room API](https://getcontrolroom.com). Generated from `spec/openapi.yaml` using [hey-api/openapi-ts](https://heyapi.dev).

## Installation

```bash
bun add @getcontrolroom/sdk-ts
```

## Quick Start

```typescript
import { createCRClient, listBookings } from "@getcontrolroom/sdk-ts";

const client = createCRClient({
  baseUrl: "https://api.controlroom.app",
  token: "your-bearer-token",
});

const { data } = await listBookings({ client });
```

## Auth

**Service-to-service** (app → api, server-side only):

```typescript
const client = createCRClient({
  baseUrl: "https://api.controlroom.app",
  userId: "usr_...",
  serviceSecret: process.env.CR_SERVICE_SECRET,
});
```

**Bearer token** (mobile clients, user sessions):

```typescript
const client = createCRClient({
  baseUrl: "https://api.controlroom.app",
  token: "your-bearer-token",
});
```

## Timeouts

Default timeout is 30 seconds. Override with `timeoutMs`:

```typescript
const client = createCRClient({
  baseUrl: "https://api.controlroom.app",
  token: "your-token",
  timeoutMs: 10_000, // 10 seconds
});
```

## Regenerating

Requires the spec at `../spec/openapi.yaml`.

```bash
cd bedrock && make generate-ts
```

## License

MIT — see [LICENSE](LICENSE).

---

Built by [Control Room](https://getcontrolroom.com) · Developed by [Clover Labs](https://cloverlabs.io)
