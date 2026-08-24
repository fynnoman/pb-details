import "server-only";
import { headers } from "next/headers";
import { getPayloadClient } from "./payload-client";

/**
 * Prüft die Payload-Session anhand des Auth-Cookies.
 * Rückgabe: der User (wenn eingeloggt) oder null.
 */
export async function getEditUser() {
  const payload = await getPayloadClient();
  const h = await headers();
  const auth = await payload.auth({ headers: h as any });
  return auth?.user ?? null;
}
