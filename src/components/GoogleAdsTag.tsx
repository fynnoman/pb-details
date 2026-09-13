/**
 * Google Ads gtag.js + Conversion-Event-Listener.
 *
 * Läuft parallel zum GoogleTagManager, hängt aber im gleichen
 * CookieYes-Consent-Gate wie GTM: das Init-Script ist mit
 * type="text/plain" und data-cookieyes="cookieyes-analytics"
 * markiert. CookieYes tauscht den Typ nach Einwilligung in
 * text/javascript um, wodurch gtag.js nachgeladen wird und
 * window.gtag erst dann existiert.
 *
 * Die Klick-/Event-Listener werden immer registriert (kein
 * Consent-Gate nötig, da sie ohne window.gtag ein No-Op sind).
 *
 * Conversion-IDs (Stand: aus Google-Ads-Konto übergeben):
 *   Basis:                AW-850199230
 *   Kontaktformular:      AW-850199230 (Custom-Event "pb:contact-form-success" + /danke)
 *   Anruf (tel:):         AW-850339404 + AW-849433151
 *   E-Mail (mailto:):     AW-850326666
 *   WhatsApp:             AW-849434126
 */

const BASE_ID = "AW-850199230";
const CONFIG_IDS = [
  "AW-850199230",
  "AW-850339404",
  "AW-850326666",
  "AW-849433151",
  "AW-849434126",
] as const;

const initScript = `
(function(w,d,s){
  var t=d.createElement(s);t.async=true;t.src='https://www.googletagmanager.com/gtag/js?id=${BASE_ID}';
  var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(t,f);
  w.dataLayer=w.dataLayer||[];
  function gtag(){w.dataLayer.push(arguments);}
  w.gtag=gtag;
  gtag('js', new Date());
  ${CONFIG_IDS.map((id) => `gtag('config','${id}');`).join("\n  ")}
})(window,document,'script');
`.trim();

const listenersScript = `
(function(){
  function fire(id){
    if (typeof window.gtag === 'function') {
      window.gtag('event','conversion',{'send_to': id});
    }
  }
  document.addEventListener('click', function(e){
    var t = e.target;
    var a = t && t.closest ? t.closest('a[href]') : null;
    if (!a) return;
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href.indexOf('tel:') === 0) {
      fire('AW-850339404');
      fire('AW-849433151');
    } else if (href.indexOf('mailto:') === 0) {
      fire('AW-850326666');
    } else if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
      fire('AW-849434126');
    }
  }, true);
  window.addEventListener('pb:contact-form-success', function(){
    fire('AW-850199230');
  });
  var p = location.pathname.replace(/\\/+$/, '') || '/';
  if (p === '/danke') {
    var tries = 0;
    (function attempt(){
      if (typeof window.gtag === 'function') { fire('AW-850199230'); return; }
      if (++tries < 20) setTimeout(attempt, 500);
    })();
  }
})();
`.trim();

export default function GoogleAdsTag() {
  return (
    <>
      <script
        type="text/plain"
        data-cookieyes="cookieyes-analytics"
        dangerouslySetInnerHTML={{ __html: initScript }}
      />
      <script dangerouslySetInnerHTML={{ __html: listenersScript }} />
    </>
  );
}
