import { getPayload } from "payload";
import config from "../../payload.config";

let cached: Awaited<ReturnType<typeof getPayload>> | null = null;

/**
 * Cached Payload-Client für Server-Components und Route-Handler.
 * Verhindert, dass jede Request eine neue Payload-Instanz startet.
 */
export async function getPayloadClient() {
  if (cached) return cached;
  cached = await getPayload({ config });
  return cached;
}
