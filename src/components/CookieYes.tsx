import Script from "next/script";

/**
 * CookieYes Consent Management Script.
 * Client-ID kommt aus NEXT_PUBLIC_COOKIEYES_ID (siehe .env.example).
 * Ohne ID wird nichts geladen – dann laufen auch keine consent-abhängigen
 * Skripte (GTM). Muss so früh wie möglich laden, damit CookieYes andere
 * Scripts noch vor der Ausführung blockieren kann.
 */
export default function CookieYes() {
  const id = process.env.NEXT_PUBLIC_COOKIEYES_ID;
  if (!id) return null;
  return (
    <Script
      id="cookieyes"
      src={`https://cdn-cookieyes.com/client_data/${id}/script.js`}
      strategy="beforeInteractive"
    />
  );
}
