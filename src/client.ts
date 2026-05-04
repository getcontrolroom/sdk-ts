import { createClient, createConfig } from "@hey-api/client-fetch";

const DEFAULT_TIMEOUT_MS = 30_000;

function isLocalUrl(url: string): boolean {
  return url.startsWith("http://localhost") || url.startsWith("http://127.0.0.1");
}

export interface CRClientOptions {
  baseUrl?: string;
  /** Request timeout in milliseconds. Default: 30 000 */
  timeoutMs?: number;
  /** Service auth — app/SSR → api (server-to-server) */
  serviceSecret?: string;
  userId?: string;
  /** org context — required for multi-org users; validated server-side */
  orgId?: string;
  /** Bearer token — mobile clients */
  token?: string;
}

/**
 * Create a configured CR API client.
 *
 * Service auth:   pass serviceSecret + userId (+ optional orgId)
 * Bearer token:   pass token
 */
export function createCRClient(options: CRClientOptions = {}) {
  const {
    baseUrl = "https://api.controlroom.app",
    timeoutMs = DEFAULT_TIMEOUT_MS,
    serviceSecret,
    userId,
    orgId,
    token,
  } = options;

  if (!baseUrl.startsWith("https://") && !isLocalUrl(baseUrl)) {
    throw new Error(
      `CRClient: baseUrl must use HTTPS. Got "${baseUrl}". ` +
        `Use http://localhost or http://127.0.0.1 only for local development.`,
    );
  }

  return createClient(
    createConfig({
      baseUrl,
      fetch: (request) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeoutMs);
        return globalThis.fetch(request, { signal: controller.signal }).finally(() =>
          clearTimeout(id),
        );
      },
      headers: () => {
        if (serviceSecret && userId) {
          return {
            "X-User-Id": userId,
            "X-Service-Secret": serviceSecret,
            ...(orgId ? { "X-Org-Id": orgId } : {}),
          };
        }
        if (token) {
          return { Authorization: `Bearer ${token}` };
        }
        return {};
      },
    }),
  );
}
