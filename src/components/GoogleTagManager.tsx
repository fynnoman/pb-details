/**
 * Google Tag Manager mit CookieYes-Consent-Gate.
 * Container-ID aus NEXT_PUBLIC_GTM_ID (Default: GTM-PM4LRKZ aus Altseite).
 *
 * Das GTM-Init-Script wird mit type="text/plain" und
 * data-cookieyes="cookieyes-analytics" markiert. CookieYes tauscht den
 * Typ automatisch auf text/javascript, sobald der Nutzer die Analytics-
 * Kategorie akzeptiert – dadurch lädt GTM erst nach Einwilligung.
 * (Auto-Blocking-Feature von CookieYes muss im Dashboard aktiv sein.)
 */
export default function GoogleTagManager() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  if (!id) return null;
  const initScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;
  return (
    <>
      <script
        type="text/plain"
        data-cookieyes="cookieyes-analytics"
        dangerouslySetInnerHTML={{ __html: initScript }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
