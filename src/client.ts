import { createClient, createConfig } from "@hey-api/client-fetch";

export interface CRClientOptions {
  baseUrl?: string;
  /** Service auth — app/SSR → api (server-to-server) */
  serviceSecret?: string;
  userId?: string;
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
  const { baseUrl = "https://api.controlroom.app", serviceSecret, userId, orgId, token } = options;

  return createClient(
    createConfig({
      baseUrl,
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
